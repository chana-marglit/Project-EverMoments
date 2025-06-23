import type React from "react"
import { useParams } from "react-router-dom"
import { useState, useEffect, useCallback } from "react"
import { Modal, message } from "antd"
import axios from "axios"

// API imports - ייבוא ספציפי כדי למנוע קונפליקטים
import {
  fetchAlbumImages,
  searchImages,
  deleteImage,
  updateImageTags,
  getStoredUser,
  getUsersList,
  getUploadUrl,
  saveImageMetadata,
  analyzeImage,
} from "../api"

// Share imports - ייבוא נפרד לשיתוף
import { shareImageWithUsers } from "../api/share"

// Types imports
import type { ImageItem, User } from "../types"

// Components
import AlbumHeader from "../components/AlbumHeader"
import ImageGrid from "../components/ImageGrid"
import TagsEditor from "../components/TagsEditor"
import ShareModal from "../components/ShareModal"

const AlbumView: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  // State
  const [images, setImages] = useState<ImageItem[]>([])
  const [allImages, setAllImages] = useState<ImageItem[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isSearching, setIsSearching] = useState(false)
  const [editingTags, setEditingTags] = useState<{ id: number; tags: string } | null>(null)

  // Share modal state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null)
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([])
  const [userList, setUserList] = useState<User[]>([])

  // Load images on component mount
  useEffect(() => {
    if (id) {
      loadImages()
    }
  }, [id])

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        performSearch(searchTerm)
      } else {
        clearSearch()
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  const loadImages = async () => {
    if (!id) return

    try {
      setLoading(true)
      setError(null)

      const albumImages = await fetchAlbumImages(Number.parseInt(id))
      const imageList = albumImages || []

      setAllImages(imageList)
      setImages(imageList)
      setIsSearching(false)
    } catch (error: any) {
      console.error("שגיאה בטעינת תמונות:", error)
      if (error.response?.status === 404) {
        setImages([])
        setAllImages([])
      } else {
        setError("לא ניתן לטעון את התמונות. נסה לרענן את הדף.")
      }
    } finally {
      setLoading(false)
    }
  }

  const performSearch = useCallback(
    async (searchValue: string) => {
      if (!id || !searchValue.trim()) return

      try {
        setLoading(true)
        setError(null)
        setIsSearching(true)

        // חיפוש מקומי ראשון
        const localResults = allImages.filter(
          (image) =>
            image.fileName?.toLowerCase().includes(searchValue.toLowerCase()) ||
            image.tags?.toLowerCase().includes(searchValue.toLowerCase()),
        )

        if (localResults.length > 0) {
          setImages(localResults)
          setLoading(false)
          return
        }

        // חיפוש בשרת אם אין תוצאות מקומיות
        try {
          const serverResults = await searchImages(Number.parseInt(id), searchValue)
          setImages(serverResults || [])
        } catch (serverError) {
          console.warn("חיפוש בשרת נכשל, משתמש בתוצאות מקומיות:", serverError)
          setImages(localResults)
        }
      } catch (error) {
        console.error("שגיאה בחיפוש תמונות:", error)
        setError("שגיאה בחיפוש. נסה שוב מאוחר יותר.")
      } finally {
        setLoading(false)
      }
    },
    [id, allImages],
  )

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const clearSearch = () => {
    setSearchTerm("")
    setImages(allImages)
    setIsSearching(false)
  }

  const handleUpload = async (file: File) => {
    const user = getStoredUser()
    if (!id || !user) {
      message.error("שגיאה: לא ניתן לזהות משתמש")
      return false
    }

    try {
      setUploading(true)
      setError(null)

      const { url, key } = await getUploadUrl(file.name, file.type)

      await axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
      })

      await saveImageMetadata({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        albumId: id,
        s3Key: key,
        userId: user.id,
        tags: "",
      })

      await loadImages()
      message.success("התמונה הועלתה בהצלחה!")
    } catch (error: any) {
      console.error("שגיאה בהעלאה:", error)
      message.error("שגיאה בהעלאת התמונה. נסה שוב מאוחר יותר.")
    } finally {
      setUploading(false)
    }

    return false
  }

  const handleDownload = (image: ImageItem) => {
    const link = document.createElement("a")
    link.href = image.fileUrl
    link.download = image.fileName || `image-${Date.now()}.jpg`
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDelete = async (imageId: number) => {
    try {
      setLoading(true)
      await deleteImage(imageId)

      const updatedImages = allImages.filter((img) => img.id !== imageId)
      setAllImages(updatedImages)

      if (isSearching) {
        setImages(images.filter((img) => img.id !== imageId))
      } else {
        setImages(updatedImages)
      }

      message.success("התמונה נמחקה בהצלחה")
    } catch (error) {
      console.error("שגיאה במחיקת תמונה:", error)
      message.error("מחיקת התמונה נכשלה")
    } finally {
      setLoading(false)
    }
  }

  const handleEditTags = (image: ImageItem) => {
    setEditingTags({ id: image.id, tags: image.tags || "" })
  }

  const handleSaveTags = async (tags: string) => {
    if (!editingTags) return

    try {
      setLoading(true)
      await updateImageTags(editingTags.id, tags)

      const updateImageInList = (imageList: ImageItem[]) =>
        imageList.map((img) => (img.id === editingTags.id ? { ...img, tags } : img))

      setAllImages(updateImageInList)
      setImages(updateImageInList)
      setEditingTags(null)

      message.success("התגיות עודכנו בהצלחה")
    } catch (error) {
      console.error("שגיאה בעדכון תגיות:", error)
      message.error("עדכון התגיות נכשל")
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyzeImage = async (imageId: number) => {
    try {
      setLoading(true)
      const tags = await analyzeImage(imageId)

      const updateImageInList = (imageList: ImageItem[]) =>
        imageList.map((img) => (img.id === imageId ? { ...img, tags: tags.join(",") } : img))

      setAllImages(updateImageInList)
      setImages(updateImageInList)

      message.success("הניתוח הושלם בהצלחה! נוספו תגיות חדשות.")
    } catch (error) {
      console.error("שגיאה בניתוח תמונה:", error)
      message.error("הניתוח נכשל. נסה שוב מאוחר יותר.")
    } finally {
      setLoading(false)
    }
  }

  // ✅ פונקציית פתיחת מודל השיתוף
  const handleOpenShareModal = async (imageId: number) => {
    setSelectedImageId(imageId)
    setIsShareModalOpen(true)
    setSelectedUserIds([]) // איפוס הבחירה

    try {
      const users = await getUsersList()
      setUserList(users)
    } catch (error) {
      console.error("שגיאה בטעינת המשתמשים:", error)
      message.error("שגיאה בטעינת רשימת המשתמשים")
    }
  }

  // ✅ פונקציית השיתוף עצמה
  const handleShareImage = async (imageId: number, userIds: number[]) => {
    try {
      await shareImageWithUsers(imageId, userIds)
      message.success(`התמונה שותפה בהצלחה עם ${userIds.length} משתמשים!`)
      setSelectedUserIds([])
      setIsShareModalOpen(false)
    } catch (error) {
      console.error("שגיאה בשיתוף תמונה:", error)
      message.error("שגיאה בשיתוף התמונה. נסה שוב מאוחר יותר.")
    }
  }

  const renderTagsEditor = () => {
    if (!editingTags) return null
    return <TagsEditor tags={editingTags.tags} onSave={handleSaveTags} onCancel={() => setEditingTags(null)} />
  }

  if (!id) {
    return <div className="error-message">מזהה אלבום לא תקין</div>
  }

  return (
    <div className="album-view-container">
      <AlbumHeader
        albumId={id}
        searchTerm={searchTerm}
        isSearching={isSearching}
        uploading={uploading}
        onUpload={handleUpload}
        onSearch={handleSearch}
        onClearSearch={clearSearch}
        onSearchTermChange={setSearchTerm}
      />

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={loadImages} className="retry-btn">
            נסה שוב
          </button>
        </div>
      )}

      <ImageGrid
        images={images}
        loading={loading}
        isSearching={isSearching}
        searchTerm={searchTerm}
        editingTags={editingTags}
        onPreviewImage={setPreviewImage}
        onDownload={handleDownload}
        onDelete={handleDelete}
        onEditTags={handleEditTags}
        onAnalyzeImage={handleAnalyzeImage}
        onShareImage={handleOpenShareModal} // ✅ מעביר את הפונקציה לפתיחת המודל
        renderTagsEditor={renderTagsEditor}
      />

      <Modal
        open={!!previewImage}
        footer={null}
        onCancel={() => setPreviewImage(null)}
        width="90%"
        centered
        className="image-preview-modal"
      >
        <img
          alt="Preview"
          style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
          src={previewImage || ""}
        />
      </Modal>

      {/* ✅ מודל השיתוף */}
      <ShareModal
        isOpen={isShareModalOpen}
        imageId={selectedImageId}
        userList={userList}
        selectedUserIds={selectedUserIds}
        onClose={() => {
          setIsShareModalOpen(false)
          setSelectedUserIds([])
          setSelectedImageId(null)
        }}
        onShare={handleShareImage}
        onUserSelectionChange={setSelectedUserIds}
      />
    </div>
  )
}

export default AlbumView
