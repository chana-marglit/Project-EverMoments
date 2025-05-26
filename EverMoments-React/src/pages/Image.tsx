// import { useParams } from 'react-router-dom';
// import { useState } from 'react';
// import { Button, Upload, List, Typography, Modal, message } from 'antd';
// import { UploadOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
// import axios from 'axios';

// const { Title } = Typography;

// const AlbumView: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [images, setImages] = useState<string[]>([]);
//   const [previewImage, setPreviewImage] = useState<string | null>(null);

//   const handleUpload = async (file: File) => {
//     try {
//       const fileName = encodeURIComponent(file.name);
//       const apiBase = import.meta.env.VITE_API_BASE;

//       const res = await axios.get(`${apiBase}/api/upload/generate-url?fileName=${fileName}`);
//       console.log('URL Response:', res.data);

//       const { url, key } = res.data;

//       await axios.put(url, file, {
//         headers: { 'Content-Type': file.type },
//       });
    

//       const fileUrl = `https://${import.meta.env.VITE_S3_BUCKET}.s3.amazonaws.com/${key}`;

//       await axios.post(`${apiBase}/api/image/save`, {
//         fileUrl,
//         albumId: id,
//       });

//       setImages([...images, fileUrl]);
//       message.success('התמונה הועלתה בהצלחה!');
//     } catch (err) {
//       console.error(err);
//       message.error('העלאת התמונה נכשלה');
//     }

//     return false;
//   };

//   const handleDelete = (index: number) => {
//     setImages(images.filter((_, i) => i !== index));
//   };

//   const handleDownload = (image: string) => {
//     const link = document.createElement('a');
//     link.href = image;
//     link.download = `image-${Date.now()}.jpg`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         padding: '20px',
//         height: '100vh',
//         backgroundImage: `url("/image/1.jpg")`,
//         backgroundSize: 'cover',
//       }}
//     >
//       <Title style={{ color: '#00F5D4' }}>📷 אלבום {id}</Title>

//       <Upload showUploadList={false} beforeUpload={handleUpload}>
//         <Button icon={<UploadOutlined />}>📤 העלה תמונה ל-S3</Button>
//       </Upload>

//       <List
//         style={{ width: '400px', marginTop: '20px' }}
//         bordered
//         dataSource={images}
//         renderItem={(image, index) => (
//           <List.Item
//             actions={[
//               <Button icon={<DownloadOutlined />} onClick={() => handleDownload(image)} />,
//               <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(index)} />,
//             ]}
//           >
//             <img
//               src={image}
//               alt={`Uploaded ${index}`}
//               style={{ width: '100px', height: '100px', cursor: 'pointer' }}
//               onClick={() => setPreviewImage(image)}
//             />
//           </List.Item>
//         )}
//       />

//       <Modal open={!!previewImage} footer={null} onCancel={() => setPreviewImage(null)}>
//         <img alt="Preview" style={{ width: '100%' }} src={previewImage || ''} />
//       </Modal>
//     </div>
//   );
// };

// export default AlbumView;
// "use client"

// import type React from "react"

// import { useParams } from "react-router-dom"
// import { useState, useEffect } from "react"
// import { Button, Upload, Typography, Modal, message, Spin, Empty } from "antd"
// import { UploadOutlined, DeleteOutlined, DownloadOutlined, EyeOutlined } from "@ant-design/icons"
// import { fetchAlbumImages, deleteImage } from "../api/api"
// import { apiClient } from "../api/api"
// import axios from "axios"

// const { Title } = Typography

// interface ImageItem {
//   id: number
//   fileUrl: string
//   fileName?: string
//   fileType?: string
// }

// const AlbumView: React.FC = () => {
//   const { id } = useParams<{ id: string }>()
//   const [images, setImages] = useState<ImageItem[]>([])
//   const [previewImage, setPreviewImage] = useState<string | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [uploading, setUploading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     if (id) {
//       loadImages()
//     }
//   }, [id])

//   const loadImages = async () => {
//     if (!id) return

//     try {
//       setLoading(true)
//       setError(null)

//       try {
//         // שימוש בנתיב הנכון - images במקום image
//         const albumImages = await fetchAlbumImages(Number.parseInt(id))
//         setImages(albumImages || [])
//       } catch (err: any) {
//         if (err.response && err.response.status === 404) {
//           console.log("נקודת הקצה /images/album/{id} לא קיימת. משתמש במערך ריק.")
//           setImages([])
//         } else {
//           throw err
//         }
//       }
//     } catch (error) {
//       console.error("שגיאה בטעינת תמונות:", error)
//       setError("לא ניתן לטעון את התמונות. ייתכן שהשרת לא מגדיר את נקודת הקצה הנדרשת.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // שימוש בגישה ישירה להעלאת קבצים במקום pre-signed URL
//   const handleUpload = async (file: File) => {
//     if (!id) return false;
  
//     try {
//       setUploading(true);
//       setError(null);
  
//       // שלב 1: קבלי Presigned URL מהשרת (שלחי רק את שם הקובץ)
//       const { data } = await apiClient.get("/upload/generate-url", {
//         params: { fileName: file.name }
//       });
  
//       const { url, key } = data;
  
//       // שלב 2: העלאה ישירה ל-S3
//       await axios.put(url, file, {
//         headers: {
//           "Content-Type": file.type
//         }
//       });
  
//       // שלב 3: שמירת Metadata בשרת
//       await apiClient.post("/images/save-metadata", {
//         fileName: file.name,
//         fileType: file.type,
//         fileSize: file.size,
//         albumId: id,
//         s3Key: key
//       });
  
//       message.success("התמונה הועלתה בהצלחה!");
//       await loadImages();
//     } catch (error: any) {
//       console.error("שגיאה בהעלאה:", error);
//       setError("שגיאה בהעלאה");
//     } finally {
//       setUploading(false);
//     }
  
//     return false;
//   };
  

//   const handleDelete = async (imageId: number) => {
//     try {
//       setLoading(true)
//       await deleteImage(imageId)
//       await loadImages()
//       message.success("התמונה נמחקה בהצלחה")
//     } catch (error) {
//       console.error("שגיאה במחיקת תמונה:", error)
//       message.error("מחיקת התמונה נכשלה")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleDownload = (image: ImageItem) => {
//     const link = document.createElement("a")
//     link.href = image.fileUrl
//     link.download = image.fileName || `image-${Date.now()}.jpg`
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   return (
//     <div className="album-view-container">
//       <Title level={2} className="page-title">
//         📷 אלבום {id}
//       </Title>

//       <div className="upload-section">
//         <Upload showUploadList={false} beforeUpload={handleUpload} disabled={uploading}>
//           <Button icon={<UploadOutlined />} loading={uploading} type="primary" className="upload-btn">
//             העלה תמונה
//           </Button>
//         </Upload>
//       </div>

//       {error && (
//         <div className="error-message">
//           <p>{error}</p>
//         </div>
//       )}

//       {loading ? (
//         <div className="loading-container">
//           <Spin size="large" />
//           <p>טוען תמונות...</p>
//         </div>
//       ) : images.length === 0 ? (
//         <Empty
//           image={Empty.PRESENTED_IMAGE_SIMPLE}
//           description={<span>אין תמונות באלבום זה. העלה את התמונה הראשונה!</span>}
//           className="empty-album"
//         />
//       ) : (
//         <div className="image-grid">
//           {images.map((image) => (
//             <div key={image.id} className="image-card">
//               <div
//                 className="image-preview"
//                 onClick={() => setPreviewImage(image.fileUrl)}
//                 style={{ backgroundImage: `url(${image.fileUrl})` }}
//               />
//               <div className="image-actions">
//                 <Button icon={<EyeOutlined />} onClick={() => setPreviewImage(image.fileUrl)} className="action-btn" />
//                 <Button icon={<DownloadOutlined />} onClick={() => handleDownload(image)} className="action-btn" />
//                 <Button
//                   icon={<DeleteOutlined />}
//                   danger
//                   onClick={() => handleDelete(image.id)}
//                   className="action-btn"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <Modal
//         open={!!previewImage}
//         footer={null}
//         onCancel={() => setPreviewImage(null)}
//         width="80%"
//         centered
//         className="image-preview-modal"
//       >
//         <img alt="Preview" style={{ width: "100%" }} src={previewImage || ""} />
//       </Modal>
//     </div>
//   )
// }

// export default AlbumView
"use client"

import type React from "react"

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
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isSearching, setIsSearching] = useState(false)
  const [editingTags, setEditingTags] = useState<{ id: number; tags: string } | null>(null)
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
      setError(null)
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
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        albumId: id,
        s3Key: key,
        userId: user.id,
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

  const handleDelete = async (imageId: number) => {
    try {
      setLoading(true)
      await deleteImage(imageId)

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
      await updateImageTags(editingTags.id, editingTags.tags)

      // עדכון התמונה ברשימה המקומית
      setImages((prevImages) =>
        prevImages.map((img) => (img.id === editingTags.id ? { ...img, tags: editingTags.tags } : img)),
      )

      message.success("התגיות עודכנו בהצלחה")
      setEditingTags(null)
    } catch (error) {
      console.error("שגיאה בעדכון תגיות:", error)
      message.error("עדכון התגיות נכשל")
    } finally {
      setLoading(false)
    }
  }

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
