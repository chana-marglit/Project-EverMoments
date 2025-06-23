
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

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Button, Upload, Typography, Modal, message, Spin, Empty, Input, Tag, Tooltip } from "antd"
import {
  UploadOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EyeOutlined,
  SearchOutlined,
  TagsOutlined,
  CloseCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons"
import { fetchAlbumImages, searchImages, deleteImage, updateImageTags, getStoredUser } from "../api/api"
import { apiClient } from "../api/api"
import axios from "axios"

const { Title, Text } = Typography
const { Search } = Input

interface ImageItem {
  id: number
  fileUrl: string
  fileName?: string
  fileType?: string
  tags?: string
}

const AlbumView: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [images, setImages] = useState<ImageItem[]>([])
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
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
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState("")
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
<<<<<<< HEAD

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
      setSearchTerm("")
      setIsSearching(false)

      try {
        const albumImages = await fetchAlbumImages(Number.parseInt(id))
        setImages(albumImages || [])
      } catch (err: any) {
        if (err.response && err.response.status === 404) {
          console.log("נקודת הקצה /images/album/{id} לא קיימת. משתמש במערך ריק.")
          setImages([])
        } else {
          throw err
        }
      }
    } catch (error) {
      console.error("שגיאה בטעינת תמונות:", error)
      setError("לא ניתן לטעון את התמונות. ייתכן שהשרת לא מגדיר את נקודת הקצה הנדרשת.")
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
  const handleSearch = async (value: string) => {
    if (!id) return

    try {
      setLoading(true)
      setError(null)
      setSearchTerm(value)

      if (!value.trim()) {
        // אם החיפוש ריק, טען את כל התמונות
        await loadImages()
        setIsSearching(false)
        return
      }

      setIsSearching(true)
      const searchResults = await searchImages(Number.parseInt(id), value)
      setImages(searchResults || [])
    } catch (error) {
      console.error("שגיאה בחיפוש תמונות:", error)
      setError("שגיאה בחיפוש תמונות. נסה שוב מאוחר יותר.")
    } finally {
      setLoading(false)
    }
  }

  const clearSearch = async () => {
    setSearchTerm("")
    await loadImages()
  }

  // שימוש בגישה ישירה להעלאת קבצים במקום pre-signed URL
  const handleUpload = async (file: File) => {
    const user = getStoredUser();
    if (!id) return false

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
      const { data } = await apiClient.get("/upload/generate-url", {
        params: {
          fileName: file.name,
          contentType: file.type
        }
      })
      const { url, key } = data 
      await axios.put(url, file, {
        headers: {
          "Content-Type": file.type
        }
      })

      // שלב 3: שמירת Metadata בשרת
      await apiClient.post("/images/save-metadata", {
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
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
        tags: "", // תגיות ריקות בהתחלה
      })

      // רענון רשימת התמונות
      if (isSearching && searchTerm) {
        await handleSearch(searchTerm)
      } else {
        await loadImages()
      }

      message.success("התמונה הועלתה בהצלחה!")
    } catch (error: any) {
      console.error("שגיאה בהעלאה:", error)
      setError("שגיאה בהעלאה")
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
      // רענון רשימת התמונות
      if (isSearching && searchTerm) {
        await handleSearch(searchTerm)
      } else {
        await loadImages()
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
  const handleDownload = (image: ImageItem) => {
    const link = document.createElement("a")
    link.href = image.fileUrl
    link.download = image.fileName || `image-${Date.now()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const startEditTags = (image: ImageItem) => {
    setEditingTags({ id: image.id, tags: image.tags || "" })
  }

  const handleTagsChange = async () => {

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
      await updateImageTags(editingTags.id, editingTags.tags)

      // עדכון התמונה ברשימה המקומית
      setImages((prevImages) =>
        prevImages.map((img) => (img.id === editingTags.id ? { ...img, tags: editingTags.tags } : img)),
      )

      message.success("התגיות עודכנו בהצלחה")
      setEditingTags(null)
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
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
  const handleShareImage = async (imageId: number, userIds: number[]) => {
    try {
      await shareImageWithUsers(imageId, userIds)
      message.success(`התמונה שותפה בהצלחה עם ${userIds.length} משתמשים!`)
      setSelectedUserIds([])
      setIsShareModalOpen(false)
    } catch (error) {
      console.error("שגיאה בשיתוף תמונה:", error)
      message.error("שגיאה בשיתוף התמונה. נסה שוב מאוחר יותר.")
  const handleTagInputConfirm = () => {
    if (inputValue && editingTags) {
      const tags = editingTags.tags.split(",").filter((tag) => tag.trim() !== "")
      if (!tags.includes(inputValue.trim())) {
        const newTags = [...tags, inputValue.trim()].join(",")
        setEditingTags({ ...editingTags, tags: newTags })
      }
      setInputVisible(false)
      setInputValue("")
    }
  }

  const handleTagClose = (removedTag: string) => {
    if (editingTags) {
      const tags = editingTags.tags
        .split(",")
        .filter((tag) => tag.trim() !== "" && tag.trim() !== removedTag.trim())
        .join(",")
      setEditingTags({ ...editingTags, tags })
    }
  }

  const renderTagsEditor = () => {
    if (!editingTags) return null
    return <TagsEditor tags={editingTags.tags} onSave={handleSaveTags} onCancel={() => setEditingTags(null)} />
  }

  if (!id) {
    return <div className="error-message">מזהה אלבום לא תקין</div>
=======

    const tagList = editingTags.tags
      .split(",")
      .filter((tag) => tag.trim() !== "")
      .map((tag) => tag.trim())

    return (
      <div className="tags-editor">
        <div className="tags-container">
          {tagList.map((tag, index) => (
            <Tag key={index} closable onClose={() => handleTagClose(tag)} style={{ margin: "5px" }}>
              {tag}
            </Tag>
          ))}
          {inputVisible ? (
            <Input
              type="text"
              size="small"
              style={{ width: 78, marginRight: 8 }}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleTagInputConfirm}
              onPressEnter={handleTagInputConfirm}
              autoFocus
            />
          ) : (
            <Tag onClick={() => setInputVisible(true)} style={{ borderStyle: "dashed", cursor: "pointer" }}>
              <PlusOutlined /> הוסף תגית
            </Tag>
          )}
        </div>
        <div className="tags-actions">
          <Button type="primary" size="small" onClick={handleTagsChange}>
            שמור
          </Button>
          <Button size="small" onClick={() => setEditingTags(null)}>
            ביטול
          </Button>
        </div>
      </div>
    )
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
      <Title level={2} className="page-title">
        📷 אלבום {id}
      </Title>

      <div className="actions-container">
        <div className="upload-section">
          <Upload showUploadList={false} beforeUpload={handleUpload} disabled={uploading}>
            <Button icon={<UploadOutlined />} loading={uploading} type="primary" className="upload-btn">
              העלה תמונה
            </Button>
          </Upload>
        </div>

        <div className="search-section">
          <Search
            placeholder="חפש לפי שם או תגיות"
            allowClear
            enterButton={<SearchOutlined />}
            size="middle"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearch={handleSearch}
            style={{ width: 250 }}
          />
          {isSearching && (
            <Button icon={<CloseCircleOutlined />} onClick={clearSearch} size="middle" style={{ marginRight: 8 }}>
              נקה חיפוש
            </Button>
          )}
        </div>
      </div>

      {isSearching && (
        <div className="search-results-info">
          <Text>
            {images.length === 0 ? "לא נמצאו תוצאות עבור " : `נמצאו ${images.length} תוצאות עבור `}
            <Text strong>{searchTerm}</Text>
          </Text>
        </div>
      )}
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
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
          <p>טוען תמונות...</p>
        </div>
      ) : images.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span>
              {isSearching ? "לא נמצאו תמונות התואמות לחיפוש שלך" : "אין תמונות באלבום זה. העלה את התמונה הראשונה!"}
            </span>
          }
          className="empty-album"
        />
      ) : (
        <div className="image-grid">
          {images.map((image) => (
            <div key={image.id} className="image-card">
              <div
                className="image-preview"
                onClick={() => setPreviewImage(image.fileUrl)}
                style={{ backgroundImage: `url(${image.fileUrl})` }}
              />
              <div className="image-info">
                <Tooltip title={image.fileName}>
                  <div className="image-filename">{image.fileName}</div>
                </Tooltip>

                {editingTags && editingTags.id === image.id ? (
                  renderTagsEditor()
                ) : (
                  <div className="image-tags">
                    {image.tags ? (
                      <>
                        <TagsOutlined style={{ marginLeft: 5 }} />
                        {image.tags
                          .split(",")
                          .filter((tag) => tag.trim() !== "")
                          .map((tag, index) => (
                            <Tag key={index} style={{ margin: "2px" }}>
                              {tag.trim()}
                            </Tag>
                          ))}
                      </>
                    ) : (
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        אין תגיות
                      </Text>
                    )}
                    <Button
                      type="link"
                      size="small"
                      icon={<TagsOutlined />}
                      onClick={() => startEditTags(image)}
                      style={{ padding: 0, marginRight: 5 }}
                    >
                      ערוך תגיות
                    </Button>
                  </div>
                )}
              </div>
              <div className="image-actions">
                <Button icon={<EyeOutlined />} onClick={() => setPreviewImage(image.fileUrl)} className="action-btn" />
                <Button icon={<DownloadOutlined />} onClick={() => handleDownload(image)} className="action-btn" />
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleDelete(image.id)}
                  className="action-btn"
                />
              </div>
            </div>
          ))}
        </div>
      )}
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
        width="80%"
        centered
        className="image-preview-modal"
      >
        <img alt="Preview" style={{ width: "100%" }} src={previewImage || ""} />
      </Modal>
    </div>
  )
}

export default AlbumView
