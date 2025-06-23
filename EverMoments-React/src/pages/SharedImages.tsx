"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Modal, Empty, Spin, Card, Avatar, Tag, Tooltip } from "antd"
import { EyeOutlined, DownloadOutlined, UserOutlined, CalendarOutlined } from "@ant-design/icons"
import { getMySharedImages, getStoredUser } from "../api"
import type { ImageItem } from "../types"

interface SharedImageWithDetails extends ImageItem {
  sharedByUserName?: string
  sharedAt?: string
}

const SharedImages: React.FC = () => {
  const [sharedImages, setSharedImages] = useState<SharedImageWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  useEffect(() => {
    loadSharedImages()
  }, [])

  const loadSharedImages = async () => {
    const user = getStoredUser()
    if (!user) {
      setError("משתמש לא מחובר")
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const images = await getMySharedImages()
      setSharedImages(images)
    } catch (error: any) {
      console.error("שגיאה בטעינת תמונות משותפות:", error)
      setError("לא ניתן לטעון את התמונות המשותפות. נסה לרענן את הדף.")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (image: ImageItem) => {
    const link = document.createElement("a")
    link.href = image.fileUrl
    link.download = image.fileName || `shared-image-${Date.now()}.jpg`
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("he-IL", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return "תאריך לא זמין"
    }
  }

  if (loading) {
    return (
      <div className="shared-images-container">
        <div className="loading-container">
          <Spin size="large" />
          <p>טוען תמונות משותפות...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="shared-images-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={loadSharedImages} className="retry-btn">
            נסה שוב
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="shared-images-container">
      <div className="page-header">
        <h1 className="page-title">🤝 תמונות ששותפו איתי</h1>
        <p className="page-description">כאן תוכל לראות את כל התמונות שמשתמשים אחרים שיתפו איתך</p>
      </div>

      {sharedImages.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div>
              <p>אין תמונות משותפות</p>
              <p style={{ color: "#999", fontSize: "14px" }}>כאשר משתמשים ישתפו איתך תמונות, הן יופיעו כאן</p>
            </div>
          }
          className="empty-shared-images"
        />
      ) : (
        <>
          <div className="shared-images-stats">
            <Tag color="blue" style={{ fontSize: "14px", padding: "4px 12px" }}>
              {sharedImages.length} תמונות משותפות
            </Tag>
          </div>

          <div className="shared-images-grid">
            {sharedImages.map((image) => (
              <Card
                key={image.id}
                className="shared-image-card"
                cover={
                  <div
                    className="shared-image-preview"
                    onClick={() => setPreviewImage(image.fileUrl)}
                    style={{ backgroundImage: `url(${image.fileUrl})` }}
                  />
                }
                actions={[
                  <Tooltip title="הצג תמונה" key="view">
                    <EyeOutlined onClick={() => setPreviewImage(image.fileUrl)} />
                  </Tooltip>,
                  <Tooltip title="הורד תמונה" key="download">
                    <DownloadOutlined onClick={() => handleDownload(image)} />
                  </Tooltip>,
                ]}
              >
                <Card.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={
                    <Tooltip title={image.fileName}>
                      <div className="image-filename">{image.fileName}</div>
                    </Tooltip>
                  }
                  description={
                    <div className="shared-image-details">
                      {image.sharedByUserName && (
                        <div className="shared-by">
                          <UserOutlined style={{ marginLeft: 4 }} />
                          שותף על ידי: {image.sharedByUserName}
                        </div>
                      )}
                      {image.sharedAt && (
                        <div className="shared-date">
                          <CalendarOutlined style={{ marginLeft: 4 }} />
                          {formatDate(image.sharedAt)}
                        </div>
                      )}
                      {image.tags && (
                        <div className="image-tags">
                          {image.tags
                            .split(",")
                            .filter((tag) => tag.trim() !== "")
                            .slice(0, 3)
                            .map((tag, index) => (
                              <Tag key={index}>
                                {tag.trim()}
                              </Tag>
                            ))}
                          {image.tags.split(",").filter((tag) => tag.trim() !== "").length > 3 && (
                            <Tag >+{image.tags.split(",").length - 3}</Tag>
                          )}
                        </div>
                      )}
                    </div>
                  }
                />
              </Card>
            ))}
          </div>
        </>
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
    </div>
  )
}

export default SharedImages
