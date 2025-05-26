// import React, { useState } from 'react';
// import axios from 'axios';

// interface Props {
//   albumId: string;
//   onUploadComplete?: () => void;
// }

// const ImageUploader: React.FC<Props> = ({ albumId, onUploadComplete }) => {
//   const [file, setFile] = useState<File | null>(null);
//   const [progress, setProgress] = useState(0);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     try {
//       const { data } = await axios.get('/api/upload/presigned-url', {
//         params: { fileName: file.name },
//       });

//       const presignedUrl = data.url;
//       const s3Url = presignedUrl.split('?')[0]; // לשמירה במסד הנתונים

//       await axios.put(presignedUrl, file, {
//         headers: { 'Content-Type': file.type },
//         onUploadProgress: (e) => {
//           setProgress(Math.round((e.loaded * 100) / (e.total || 1)));
//         },
//       });

//       await axios.post(`/api/albums/${albumId}/images`, {
//         imageUrl: s3Url,
//       });

//       alert('תמונה הועלתה!');
//       setFile(null);
//       setProgress(0);
//       onUploadComplete?.();
//     } catch (err) {
//       console.error('שגיאה בהעלאה:', err);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={!file}>העלה תמונה</button>
//       {progress > 0 && <div>התקדמות: {progress}%</div>}
//     </div>
//   );
// };

// export default ImageUploader;

import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const fileName = encodeURIComponent(file.name);
    const res = await axios.get(`/api/upload/generate-url?fileName=${fileName}`);

    const { url, key } = res.data;

    await axios.put(url, file, {
      headers: {
        'Content-Type': file.type
      }
    });

    // לאחר העלאה - שליחת URL לשרת
    const fileUrl = `https://${process.env.REACT_APP_S3_BUCKET}.s3.amazonaws.com/${key}`;

    await axios.post('/api/image/save', {
      fileUrl,
      albumId: 1 // לדוגמה – בהמשך נשלב דינמי לפי בחירת אלבום
    });

    alert('הקובץ עלה ונשמר בהצלחה');
  };

  return (
    <div>
      <h2>העלאת תמונה</h2>
      <input type="file" onChange={handleFileChange} />
      {preview && <img src={preview} alt="preview" style={{ width: 200, marginTop: 10 }} />}
      <br />
      <button onClick={handleUpload} disabled={!file}>העלה</button>
    </div>
  );
};

export default ImageUploader;
