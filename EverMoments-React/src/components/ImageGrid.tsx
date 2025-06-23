import type React from "react"
import { Button, Tag, Tooltip, Empty, Spin } from "antd"
import { DeleteOutlined, DownloadOutlined, EyeOutlined, TagsOutlined, ShareAltOutlined } from "@ant-design/icons"
import type { ImageItem } from "../types" // ✅ ייבוא מהקובץ המרכזי

interface ImageGridProps {
  images: ImageItem[]
  loading: boolean
  isSearching: boolean
  searchTerm: string
  editingTags: { id: number; tags: string } | null
  onPreviewImage: (url: string) => void
  onDownload: (image: ImageItem) => void
  onDelete: (id: number) => void
  onEditTags: (image: ImageItem) => void
  onAnalyzeImage: (id: number) => void
  onShareImage: (id: number) => void
  renderTagsEditor: () => React.ReactNode
}

const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  loading,
  isSearching,
  searchTerm,
  editingTags,
  onPreviewImage,
  onDownload,
  onDelete,
  onEditTags,
  onAnalyzeImage,
  onShareImage,
  renderTagsEditor,
}) => {
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <p>טוען תמונות...</p>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <span>
            {isSearching
              ? `לא נמצאו תמונות התואמות לחיפוש "${searchTerm}"`
              : "אין תמונות באלבום זה. העלה את התמונה הראשונה!"}
          </span>
        }
        className="empty-album"
      />
    )
  }

  return (
    <>
      {isSearching && (
        <div className="search-results-info">
          <span>
            נמצאו {images.length} תוצאות עבור <strong>"{searchTerm}"</strong>
          </span>
        </div>
      )}

      <div className="image-grid">
        {images.map((image) => (
          <div key={image.id} className="image-card">
            <div
              className="image-preview"
              onClick={() => onPreviewImage(image.fileUrl)}
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
                    <span className="no-tags-text">אין תגיות</span>
                  )}
                  <Button
                    type="link"
                    size="small"
                    icon={<TagsOutlined />}
                    onClick={() => onEditTags(image)}
                    className="edit-tags-btn"
                  >
                    ערוך תגיות
                  </Button>
                </div>
              )}
            </div>

            <div className="image-actions">
              <Button
                icon={<EyeOutlined />}
                onClick={() => onPreviewImage(image.fileUrl)}
                className="action-btn"
                title="הצג תמונה"
              />
              <Button
                icon={<DownloadOutlined />}
                onClick={() => onDownload(image)}
                className="action-btn"
                title="הורד תמונה"
              />
              <Button
                type="dashed"
                onClick={() => onAnalyzeImage(image.id)}
                className="action-btn ai-btn"
                title="נתח תמונה עם AI"
              >
                AI
              </Button>
              <Button
                icon={<ShareAltOutlined />}
                onClick={() => onShareImage(image.id)}
                className="action-btn"
                title="שתף תמונה"
              />
              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={() => onDelete(image.id)}
                className="action-btn"
                title="מחק תמונה"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ImageGrid
