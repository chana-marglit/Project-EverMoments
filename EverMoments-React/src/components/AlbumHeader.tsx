
import type React from "react"
import { Button, Upload, Input, Typography } from "antd"
import { UploadOutlined, SearchOutlined, CloseCircleOutlined } from "@ant-design/icons"

const { Title } = Typography
const { Search } = Input

interface AlbumHeaderProps {
  albumId: string
  searchTerm: string
  isSearching: boolean
  uploading: boolean
  onUpload: (file: File) => Promise<boolean>
  onSearch: (value: string) => void
  onClearSearch: () => void
  onSearchTermChange: (value: string) => void
}

const AlbumHeader: React.FC<AlbumHeaderProps> = ({
  albumId,
  searchTerm,
  isSearching,
  uploading,
  onUpload,
  onSearch,
  onClearSearch,
  onSearchTermChange,
}) => {
  return (
    <div className="album-header">
      <Title level={2} className="page-title">
        📷 אלבום {albumId}
      </Title>

      <div className="actions-container">
        <div className="upload-section">
          <Upload showUploadList={false} beforeUpload={onUpload} disabled={uploading} accept="image/*" multiple={false}>
            <Button icon={<UploadOutlined />} loading={uploading} type="primary" className="upload-btn" size="large">
              {uploading ? "מעלה..." : "העלה תמונה"}
            </Button>
          </Upload>
        </div>

        <div className="search-section">
          <Search
            placeholder="חפש לפי שם קובץ או תגיות..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            onSearch={onSearch}
            style={{ width: 300 }}
            className="search-input"
          />
          {isSearching && (
            <Button icon={<CloseCircleOutlined />} onClick={onClearSearch} size="large" className="clear-search-btn">
              נקה חיפוש
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AlbumHeader
