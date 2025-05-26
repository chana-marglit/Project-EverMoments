// import { useParams } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { Button, Upload, List, Typography, Modal } from 'antd';
// import { UploadOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';

// const { Title } = Typography;

// const AlbumView: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [images, setImages] = useState<string[]>([]);
//   const [previewImage, setPreviewImage] = useState<string | null>(null);

//   // הדמיה של טעינת תמונות – בהמשך תחליפי ל־API
//   useEffect(() => {
//     console.log("Album ID:", id);
//   }, [id]);

//   const handleUpload = (file: File) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       if (e.target?.result) {
//         setImages([...images, e.target.result as string]);
//       }
//     };
//     reader.readAsDataURL(file);
//     return false; // כדי למנוע העלאה אוטומטית
//   };

//   const handleDelete = (index: number) => {
//     setImages(images.filter((_, i) => i !== index));
//   };

//   const handleDownload = (image: string) => {
//     const link = document.createElement('a');
//     link.href = image;
//     link.download = `image-${Date.now()}.png`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <Title level={3}>📷 אלבום מספר {id}</Title>

//       <Upload showUploadList={false} beforeUpload={handleUpload}>
//         <Button icon={<UploadOutlined />}>העלה תמונה</Button>
//       </Upload>

//       <List
//         style={{ marginTop: 20 }}
//         bordered
//         dataSource={images}
//         renderItem={(img, index) => (
//           <List.Item
//             actions={[
//               <Button icon={<DownloadOutlined />} onClick={() => handleDownload(img)}>📥</Button>,
//               <Button icon={<DeleteOutlined />} onClick={() => handleDelete(index)} danger>🗑️</Button>,
//             ]}
//           >
//             <img src={img} alt="תמונה" style={{ width: 100, height: 100, cursor: 'pointer' }} onClick={() => setPreviewImage(img)} />
//           </List.Item>
//         )}
//       />

//       <Modal visible={!!previewImage} footer={null} onCancel={() => setPreviewImage(null)}>
//         <img alt="תצוגה" style={{ width: '100%' }} src={previewImage || ''} />
//       </Modal>
//     </div>
//   );
// };

// export default AlbumView;
