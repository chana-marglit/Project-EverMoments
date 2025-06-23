import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import {
  Button,
  Upload,
  Typography,
  Modal,
  message,
  Spin,
  Empty,
  Input,
  Tag,
  Tooltip,
} from "antd"
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
import axios from "axios"
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
  apiClient,
} from "../api/api"
import { shareImageWithUsers } from "../api/share"
import type { ImageItem, User } from "../types"
import AlbumHeader from "../components/AlbumHeader"
import ImageGrid from "../components/ImageGrid"
import TagsEditor from "../components/TagsEditor"
import ShareModal from "../components/ShareModal"

const { Title, Text } = Typography
const { Search } = Input

const AlbumView: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [images, setImages] = useState<ImageItem[]>([])
  const [allImages, setAllImages] = useState<ImageItem[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [editingTags, setEditingTags] = useState<{ id: number; tags: string } | null>(null)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null)
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([])
  const [userList, setUserList] = useState<User[]>([])
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    if (id) {
      loadImages()
    }
  }, [id])

  const loadImages = async () => {
    if (!id) return

    try {
      setLoading(true)
      const albumImages = await fetchAlbumImages(Number(id))
      setAllImages(albumImages || [])
      setImages(albumImages || [])
      setIsSearching(false)
    } catch (err: any) {
      console.error("שגיאה בטעינת התמונות:", err)
      setError("לא ניתן לטעון את התמונות")
      setImages([])
      setAllImages([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (value: string) => {
    if (!id) return

    setSearchTerm(value)
    if (!value.trim()) {
      await loadImages()
      return
    }

    try {
      setLoading(true)
      setIsSearching(true)
      const results = await searchImages(Number(id), value)
      setImages(results || [])
    } catch (err) {
      console.error("שגיאה בחיפוש:", err)
      setError("שגיאה בביצוע חיפוש")
    } finally {
      setLoading(false)
    }
  }

  const clearSearch = async () => {
    setSearchTerm("")
    await loadImages()
  }

  const handleUpload = async (file: File) => {
    if (!id) return false
    const user = getStoredUser()
    if (!user) {
      message.error("משתמש לא מזוהה")
      return false
    }

    try {
      setUploading(true)
      const { url, key } = await getUploadUrl(file.name, file.type)

      await axios.put(url, file, {
        headers: { "Content-Type": file.type },
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
      message.success("העלאה הצליחה")
    } catch (err) {
      console.error("שגיאה בהעלאה:", err)
      message.error("שגיאה בהעלאה")
    } finally {
      setUploading(false)
    }

    return false
  }

  const handleDownload = (image: ImageItem) => {
    const link = document.createElement("a")
    link.href = image.fileUrl
    link.download = image.fileName || "image.jpg"
    link.click()
  }

  const handleDelete = async (imageId: number) => {
    try {
      setLoading(true)
      await deleteImage(imageId)
      await loadImages()
      message.success("נמחק בהצלחה")
    } catch (err) {
      console.error("שגיאה במחיקה:", err)
      message.error("שגיאה במחיקת תמונה")
    } finally {
      setLoading(false)
    }
  }

  const startEditTags = (image: ImageItem) => {
    setEditingTags({ id: image.id, tags: image.tags || "" })
  }

  const handleTagsChange = async () => {
    if (!editingTags) return
    try {
      setLoading(true)
      await updateImageTags(editingTags.id, editingTags.tags)
      await loadImages()
      setEditingTags(null)
      message.success("תגיות עודכנו")
    } catch (err) {
      console.error("שגיאה בעדכון תגיות:", err)
      message.error("שגיאה בעדכון תגיות")
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyzeImage = async (imageId: number) => {
    try {
      setLoading(true)
      const tags = await analyzeImage(imageId)
      await updateImageTags(imageId, tags.join(","))
      await loadImages()
      message.success("ניתוח הצליח")
    } catch (err) {
      console.error("שגיאה בניתוח תמונה:", err)
      message.error("שגיאה בניתוח")
    } finally {
      setLoading(false)
    }
  }

  const handleOpenShareModal = async (imageId: number) => {
    setSelectedImageId(imageId)
    setIsShareModalOpen(true)
    try {
      const users = await getUsersList()
      setUserList(users)
    } catch (err) {
      console.error("שגיאה בטעינת משתמשים:", err)
      message.error("שגיאה בטעינת משתמשים")
    }
  }

  const handleShareImage = async (imageId: number, userIds: number[]) => {
    try {
      await shareImageWithUsers(imageId, userIds)
      message.success("שיתוף בוצע בהצלחה")
      setIsShareModalOpen(false)
      setSelectedUserIds([])
    } catch (err) {
      console.error("שגיאה בשיתוף:", err)
      message.error("שגיאה בשיתוף")
    }
  }

  const handleTagInputConfirm = () => {
    if (inputValue && editingTags) {
      const tags = editingTags.tags.split(",").map((t) => t.trim())
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
        .filter((tag) => tag.trim() !== removedTag.trim())
        .join(",")
      setEditingTags({ ...editingTags, tags })
    }
  }

  const renderTagsEditor = () => {
    if (!editingTags) return null
    return (
      <TagsEditor
        tags={editingTags.tags}
        onSave={handleTagsChange}
        onCancel={() => setEditingTags(null)}
      />
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

      <Title level={2}>📷 אלבום {id}</Title>

      {error && <p className="error-message">{error}</p>}

      <ImageGrid
        images={images}
        loading={loading}
        isSearching={isSearching}
        searchTerm={searchTerm}
        editingTags={editingTags}
        onPreviewImage={setPreviewImage}
        onDownload={handleDownload}
        onDelete={handleDelete}
        onEditTags={startEditTags}
        onAnalyzeImage={handleAnalyzeImage}
        onShareImage={handleOpenShareModal}
        renderTagsEditor={renderTagsEditor}
      />

      <Modal
        open={!!previewImage}
        footer={null}
        onCancel={() => setPreviewImage(null)}
        width="90%"
        centered
      >
        <img
          alt="תצוגה מקדימה"
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
    </div>
  )
}

export default AlbumView
