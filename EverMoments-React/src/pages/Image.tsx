<<<<<<< HEAD

// import type React from "react"
// import { useParams } from "react-router-dom"
// import { useState, useEffect } from "react"
// import { Button, Upload, Typography, Modal, message, Spin, Empty, Input, Tag, Tooltip } from "antd"
// import {
//   UploadOutlined,
//   DeleteOutlined,
//   DownloadOutlined,
//   EyeOutlined,
//   SearchOutlined,
//   TagsOutlined,
//   CloseCircleOutlined,
//   PlusOutlined,
//   ShareAltOutlined,
// } from "@ant-design/icons"
// import { fetchAlbumImages, searchImages, deleteImage, updateImageTags, getStoredUser } from "../api/api"
// import { apiClient } from "../api/api"
// import axios from "axios"
// import { Select } from "antd"

// const { Title, Text } = Typography
// const { Search } = Input
=======
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
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611

// interface ImageItem {
//   id: number
//   fileUrl: string
//   fileName?: string
//   fileType?: string
<<<<<<< HEAD
//   tags?: string
=======
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
// }

// const AlbumView: React.FC = () => {
//   const { id } = useParams<{ id: string }>()
//   const [images, setImages] = useState<ImageItem[]>([])
//   const [previewImage, setPreviewImage] = useState<string | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [uploading, setUploading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
<<<<<<< HEAD
//   const [searchTerm, setSearchTerm] = useState<string>("")
//   const [isSearching, setIsSearching] = useState(false)
//   const [editingTags, setEditingTags] = useState<{ id: number; tags: string } | null>(null)
//   const [inputVisible, setInputVisible] = useState(false)
//   const [inputValue, setInputValue] = useState("")
//   const [isShareModalOpen, setIsShareModalOpen] = useState(false)
//   const [selectedImageId, setSelectedImageId] = useState<number | null>(null)
//   const [selectedUserIds, setSelectedUserIds] = useState<number[]>([])
//   const [userList, setUserList] = useState<{ id: number; fullName: string }[]>([])
=======
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611

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
<<<<<<< HEAD
//       setSearchTerm("")
//       setIsSearching(false)

//       try {
=======

//       try {
//         // שימוש בנתיב הנכון - images במקום image
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
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

<<<<<<< HEAD
//   const handleSearch = async (value: string) => {
//     if (!id) return

//     try {
//       setLoading(true)
//       setError(null)
//       setSearchTerm(value)

//       if (!value.trim()) {
//         // אם החיפוש ריק, טען את כל התמונות
//         await loadImages()
//         setIsSearching(false)
//         return
//       }

//       setIsSearching(true)
//       const searchResults = await searchImages(Number.parseInt(id), value)
//       setImages(searchResults || [])
//     } catch (error) {
//       console.error("שגיאה בחיפוש תמונות:", error)
//       setError("שגיאה בחיפוש תמונות. נסה שוב מאוחר יותר.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const clearSearch = async () => {
//     setSearchTerm("")
//     await loadImages()
//   }

//   // שימוש בגישה ישירה להעלאת קבצים במקום pre-signed URL
//   const handleUpload = async (file: File) => {
//     const user = getStoredUser();
//     if (!id) return false

//     try {
//       setUploading(true)
//       setError(null)
//       const { data } = await apiClient.get("/upload/generate-url", {
//         params: {
//           fileName: file.name,
//           contentType: file.type
//         }
//       })

//       const { url, key } = data

=======
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
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
//       await axios.put(url, file, {
//         headers: {
//           "Content-Type": file.type
//         }
<<<<<<< HEAD
//       })

=======
//       });
  
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
//       // שלב 3: שמירת Metadata בשרת
//       await apiClient.post("/images/save-metadata", {
//         fileName: file.name,
//         fileType: file.type,
//         fileSize: file.size,
//         albumId: id,
<<<<<<< HEAD
//         s3Key: key,
//         userId: user.id,
//         tags: "", // תגיות ריקות בהתחלה
//       })

//       // רענון רשימת התמונות
//       if (isSearching && searchTerm) {
//         await handleSearch(searchTerm)
//       } else {
//         await loadImages()
//       }

//       message.success("התמונה הועלתה בהצלחה!")
//     } catch (error: any) {
//       console.error("שגיאה בהעלאה:", error)
//       setError("שגיאה בהעלאה")
//     } finally {
//       setUploading(false)
//     }

//     return false
//   }
=======
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
  
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611

//   const handleDelete = async (imageId: number) => {
//     try {
//       setLoading(true)
//       await deleteImage(imageId)
<<<<<<< HEAD

//       // רענון רשימת התמונות
//       if (isSearching && searchTerm) {
//         await handleSearch(searchTerm)
//       } else {
//         await loadImages()
//       }

=======
//       await loadImages()
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
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

<<<<<<< HEAD
//   const startEditTags = (image: ImageItem) => {
//     setEditingTags({ id: image.id, tags: image.tags || "" })
//   }

//   const handleTagsChange = async () => {
//     if (!editingTags) return

//     try {
//       setLoading(true)
//       await updateImageTags(editingTags.id, editingTags.tags)

//       // עדכון התמונה ברשימה המקומית
//       setImages((prevImages) =>
//         prevImages.map((img) => (img.id === editingTags.id ? { ...img, tags: editingTags.tags } : img)),
//       )

//       message.success("התגיות עודכנו בהצלחה")
//       setEditingTags(null)
//     } catch (error) {
//       console.error("שגיאה בעדכון תגיות:", error)
//       message.error("עדכון התגיות נכשל")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleTagInputConfirm = () => {
//     if (inputValue && editingTags) {
//       const tags = editingTags.tags.split(",").filter((tag) => tag.trim() !== "")
//       if (!tags.includes(inputValue.trim())) {
//         const newTags = [...tags, inputValue.trim()].join(",")
//         setEditingTags({ ...editingTags, tags: newTags })
//       }
//       setInputVisible(false)
//       setInputValue("")
//     }
//   }

//   const analyzeImage = async (imageId: number) => {
//     try {
//       setLoading(true)
//       setError(null)

//       const response = await apiClient.post<string[]>(`/images/analyze/${imageId}`)
//       const tags = response.data

//       // עדכון התמונה עם התגיות שחזרו מה-AI
//       setImages((prevImages) =>
//         prevImages.map((img) =>
//           img.id === imageId ? { ...img, tags: tags.join(",") } : img
//         )
//       )

//       message.success("הניתוח הושלם בהצלחה")
//     } catch (error) {
//       console.error("שגיאה בניתוח תמונה:", error)
//       message.error("הניתוח נכשל")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleTagClose = (removedTag: string) => {
//     if (editingTags) {
//       const tags = editingTags.tags
//         .split(",")
//         .filter((tag) => tag.trim() !== "" && tag.trim() !== removedTag.trim())
//         .join(",")
//       setEditingTags({ ...editingTags, tags })
//     }
//   }

//   const renderTagsEditor = () => {
//     if (!editingTags) return null

//     const tagList = editingTags.tags
//       .split(",")
//       .filter((tag) => tag.trim() !== "")
//       .map((tag) => tag.trim())

//     return (
//       <div className="tags-editor">
//         <div className="tags-container">
//           {tagList.map((tag, index) => (
//             <Tag key={index} closable onClose={() => handleTagClose(tag)} style={{ margin: "5px" }}>
//               {tag}
//             </Tag>
//           ))}
//           {inputVisible ? (
//             <Input
//               type="text"
//               size="small"
//               style={{ width: 78, marginRight: 8 }}
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               onBlur={handleTagInputConfirm}
//               onPressEnter={handleTagInputConfirm}
//               autoFocus
//             />
//           ) : (
//             <Tag onClick={() => setInputVisible(true)} style={{ borderStyle: "dashed", cursor: "pointer" }}>
//               <PlusOutlined /> הוסף תגית
//             </Tag>
//           )}
//         </div>
//         <div className="tags-actions">
//           <Button type="primary" size="small" onClick={handleTagsChange}>
//             שמור
//           </Button>
//           <Button size="small" onClick={() => setEditingTags(null)}>
//             ביטול
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   const openShareModal = async (imageId: number) => {
//     setSelectedImageId(imageId)
//     setIsShareModalOpen(true)

//     try {
//       const res = await apiClient.get("/users")
//       setUserList(res.data)
//     } catch (error) {
//       console.error("שגיאה בטעינת המשתמשים:", error)
//       message.error("שגיאה בטעינת המשתמשים")
//     }
//   }

//   const handleShareSubmit = async () => {
//     if (!selectedImageId || selectedUserIds.length === 0) {
//       message.warning("נא לבחור משתמשים לשיתוף")
//       return
//     }

//     try {
//       await apiClient.post(`/images/share/${selectedImageId}`, selectedUserIds)
//       message.success("התמונה שותפה בהצלחה")
//       setIsShareModalOpen(false)
//       setSelectedUserIds([])
//     } catch (error) {
//       console.error("שגיאה בשיתוף תמונה:", error)
//       message.error("שגיאה בשיתוף תמונה")
//     }
//   }

=======
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
//   return (
//     <div className="album-view-container">
//       <Title level={2} className="page-title">
//         📷 אלבום {id}
//       </Title>

<<<<<<< HEAD
//       <div className="actions-container">
//         <div className="upload-section">
//           <Upload showUploadList={false} beforeUpload={handleUpload} disabled={uploading}>
//             <Button icon={<UploadOutlined />} loading={uploading} type="primary" className="upload-btn">
//               העלה תמונה
//             </Button>
//           </Upload>
//         </div>

//         <div className="search-section">
//           <Search
//             placeholder="חפש לפי שם או תגיות"
//             allowClear
//             enterButton={<SearchOutlined />}
//             size="middle"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onSearch={handleSearch}
//             style={{ width: 250 }}
//           />
//           {isSearching && (
//             <Button icon={<CloseCircleOutlined />} onClick={clearSearch} size="middle" style={{ marginRight: 8 }}>
//               נקה חיפוש
//             </Button>
//           )}
//         </div>
//       </div>

//       {isSearching && (
//         <div className="search-results-info">
//           <Text>
//             {images.length === 0 ? "לא נמצאו תוצאות עבור " : `נמצאו ${images.length} תוצאות עבור `}
//             <Text strong>{searchTerm}</Text>
//           </Text>
//         </div>
//       )}

=======
//       <div className="upload-section">
//         <Upload showUploadList={false} beforeUpload={handleUpload} disabled={uploading}>
//           <Button icon={<UploadOutlined />} loading={uploading} type="primary" className="upload-btn">
//             העלה תמונה
//           </Button>
//         </Upload>
//       </div>

>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
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
<<<<<<< HEAD
//           description={
//             <span>
//               {isSearching ? "לא נמצאו תמונות התואמות לחיפוש שלך" : "אין תמונות באלבום זה. העלה את התמונה הראשונה!"}
//             </span>
//           }
=======
//           description={<span>אין תמונות באלבום זה. העלה את התמונה הראשונה!</span>}
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
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
<<<<<<< HEAD
//               <div className="image-info">
//                 <Tooltip title={image.fileName}>
//                   <div className="image-filename">{image.fileName}</div>
//                 </Tooltip>

//                 {editingTags && editingTags.id === image.id ? (
//                   renderTagsEditor()
//                 ) : (
//                   <div className="image-tags">
//                     {image.tags ? (
//                       <>
//                         <TagsOutlined style={{ marginLeft: 5 }} />
//                         {image.tags
//                           .split(",")
//                           .filter((tag) => tag.trim() !== "")
//                           .map((tag, index) => (
//                             <Tag key={index} style={{ margin: "2px" }}>
//                               {tag.trim()}
//                             </Tag>
//                           ))}
//                       </>
//                     ) : (
//                       <Text type="secondary" style={{ fontSize: "12px" }}>
//                         אין תגיות
//                       </Text>
//                     )}
//                     <Button
//                       type="link"
//                       size="small"
//                       icon={<TagsOutlined />}
//                       onClick={() => startEditTags(image)}
//                       style={{ padding: 0, marginRight: 5 }}
//                     >
//                       ערוך תגיות
//                     </Button>
//                   </div>
//                 )}
//               </div>
=======
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
//               <div className="image-actions">
//                 <Button icon={<EyeOutlined />} onClick={() => setPreviewImage(image.fileUrl)} className="action-btn" />
//                 <Button icon={<DownloadOutlined />} onClick={() => handleDownload(image)} className="action-btn" />
//                 <Button
<<<<<<< HEAD
//                   type="dashed"
//                   onClick={() => analyzeImage(image.id)}
//                   className="action-btn"
//                 >
//                   AI
//                 </Button>
//                 <Button
//                   icon={<ShareAltOutlined />}
//                   onClick={() => openShareModal(image.id)}
//                   className="action-btn"
//                 >
//                 </Button>

//                 <Button
=======
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
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
<<<<<<< HEAD

//       </Modal>

//       <Modal
//         title="שתף תמונה עם משתמשים"
//         open={isShareModalOpen}
//         onCancel={() => setIsShareModalOpen(false)}
//         onOk={handleShareSubmit}
//       >
//         <Select
//           mode="multiple"
//           placeholder="בחרי משתמשים"
//           style={{ width: '100%' }}
//           value={selectedUserIds}
//           onChange={(value) => setSelectedUserIds(value)}
//           options={userList.map((u) => ({ label: u.fullName, value: u.id }))}
//         />
//       </Modal>


=======
//       </Modal>
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
//     </div>
//   )
// }

// export default AlbumView
"use client"

import type React from "react"
<<<<<<< HEAD
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
=======

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
<<<<<<< HEAD

  // Share modal state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null)
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([])
  const [userList, setUserList] = useState<User[]>([])

  // Load images on component mount
=======
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState("")

>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
  useEffect(() => {
    if (id) {
      loadImages()
    }
  }, [id])

<<<<<<< HEAD
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

=======
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
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
=======
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
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
    } finally {
      setLoading(false)
    }
  }

<<<<<<< HEAD
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
=======
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
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611

    try {
      setUploading(true)
      setError(null)
<<<<<<< HEAD

      const { url, key } = await getUploadUrl(file.name, file.type)

      await axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
      })

      await saveImageMetadata({
=======
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
<<<<<<< HEAD
        tags: "",
      })

      await loadImages()
      message.success("התמונה הועלתה בהצלחה!")
    } catch (error: any) {
      console.error("שגיאה בהעלאה:", error)
      message.error("שגיאה בהעלאת התמונה. נסה שוב מאוחר יותר.")
=======
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
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
    } finally {
      setUploading(false)
    }

    return false
  }

<<<<<<< HEAD
  const handleDownload = (image: ImageItem) => {
    const link = document.createElement("a")
    link.href = image.fileUrl
    link.download = image.fileName || `image-${Date.now()}.jpg`
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

=======
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
  const handleDelete = async (imageId: number) => {
    try {
      setLoading(true)
      await deleteImage(imageId)

<<<<<<< HEAD
      const updatedImages = allImages.filter((img) => img.id !== imageId)
      setAllImages(updatedImages)

      if (isSearching) {
        setImages(images.filter((img) => img.id !== imageId))
      } else {
        setImages(updatedImages)
=======
      // רענון רשימת התמונות
      if (isSearching && searchTerm) {
        await handleSearch(searchTerm)
      } else {
        await loadImages()
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
      }

      message.success("התמונה נמחקה בהצלחה")
    } catch (error) {
      console.error("שגיאה במחיקת תמונה:", error)
      message.error("מחיקת התמונה נכשלה")
    } finally {
      setLoading(false)
    }
  }

<<<<<<< HEAD
  const handleEditTags = (image: ImageItem) => {
    setEditingTags({ id: image.id, tags: image.tags || "" })
  }

  const handleSaveTags = async (tags: string) => {
=======
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
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
    if (!editingTags) return

    try {
      setLoading(true)
<<<<<<< HEAD
      await updateImageTags(editingTags.id, tags)

      const updateImageInList = (imageList: ImageItem[]) =>
        imageList.map((img) => (img.id === editingTags.id ? { ...img, tags } : img))

      setAllImages(updateImageInList)
      setImages(updateImageInList)
      setEditingTags(null)

      message.success("התגיות עודכנו בהצלחה")
=======
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

<<<<<<< HEAD
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
=======
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
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
    }
  }

  const renderTagsEditor = () => {
    if (!editingTags) return null
<<<<<<< HEAD
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
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
  }

  return (
    <div className="album-view-container">
<<<<<<< HEAD
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
=======
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
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611

      {error && (
        <div className="error-message">
          <p>{error}</p>
<<<<<<< HEAD
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
=======
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
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611

      <Modal
        open={!!previewImage}
        footer={null}
        onCancel={() => setPreviewImage(null)}
<<<<<<< HEAD
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
=======
        width="80%"
        centered
        className="image-preview-modal"
      >
        <img alt="Preview" style={{ width: "100%" }} src={previewImage || ""} />
      </Modal>
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
    </div>
  )
}

export default AlbumView
