// import React, { useEffect, useState } from 'react';
// import { Button, Input, List, Typography, Popconfirm } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import { getStoredUser, addAlbum, fetchAlbums, updateAlbum, deleteAlbum } from '../api/api';

// const { Title, Paragraph } = Typography;

// interface Album {
//   id: number;
//   name: string;
//   description?: string;
// }

// const Albums: React.FC = () => {
//   const navigate = useNavigate();
//   const [albums, setAlbums] = useState<Album[]>([]);
//   const [newAlbum, setNewAlbum] = useState('');
//   const [descriptionAlbum, setDescriptionAlbum] = useState('');
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [editingName, setEditingName] = useState('');
//   const user = getStoredUser();

//   useEffect(() => {
//     if (!user || !user.id) {
//       navigate('/login');
//       return;
//     }

//     const loadAlbums = async () => {
//       const data = await fetchAlbums(user.id);
//       setAlbums(data);
//     };
//     loadAlbums();
//   }, [user, navigate]);

//   const handleAddAlbum = async () => {
//     if (!newAlbum.trim()) return;

//     const newAlbumObj = {
//       name: newAlbum,
//       Description: descriptionAlbum,
//       userId: user.id,
//     };

//     try {
//       const created = await addAlbum(newAlbumObj);
//       setAlbums([...albums, created]);
//       setNewAlbum('');
//       setDescriptionAlbum('');
//     } catch (error) {
//       console.error('שגיאה בהוספת אלבום:', error);
//     }
//   };

//   const handleUpdateAlbum = async (id: number) => {
//     try {
//       await updateAlbum(id, editingName);
//       setAlbums(albums.map((a) => (a.id === id ? { ...a, name: editingName } : a)));
//       setEditingId(null);
//       setEditingName('');
//     } catch (error) {
//       console.error('שגיאה בעדכון אלבום:', error);
//     }
//   };

//   const handleDeleteAlbum = async (id: number) => {
//     try {
//       await deleteAlbum(id);
//       setAlbums(albums.filter((a) => a.id !== id));
//     } catch (error) {
//       console.error('שגיאה במחיקת אלבום:', error);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
//       <Title level={2}>📁 ניהול אלבומים</Title>

//       <Input
//         placeholder="שם האלבום"
//         value={newAlbum}
//         onChange={(e) => setNewAlbum(e.target.value)}
//         style={{ marginBottom: 10 }}
//       />

//       <Input
//         placeholder="תיאור האלבום"
//         value={descriptionAlbum}
//         onChange={(e) => setDescriptionAlbum(e.target.value)}
//         style={{ marginBottom: 10 }}
//       />

//       <Button type="primary" onClick={handleAddAlbum} block>
//         ➕ הוסף אלבום
//       </Button>

//       <List
//         bordered
//         style={{ marginTop: 20 }}
//         dataSource={albums}
//         renderItem={(album) => (
//           <List.Item
//             key={album.id}
//             actions={[
//               editingId === album.id ? (
//                 <>
//                   <Button type="link" onClick={() => handleUpdateAlbum(album.id)}>
//                     שמור
//                   </Button>
//                   <Button type="link" danger onClick={() => setEditingId(null)}>
//                     ביטול
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Button
//                     type="link"
//                     onClick={() => {
//                       setEditingId(album.id);
//                       setEditingName(album.name);
//                     }}
//                   >
//                     ✏️ ערוך
//                   </Button>
//                   <Popconfirm
//                     title="האם את בטוחה שתרצי למחוק?"
//                     onConfirm={() => handleDeleteAlbum(album.id)}
//                   >
//                     <Button type="link" danger>
//                       🗑️ מחק
//                     </Button>
//                   </Popconfirm>
//                 </>
//               ),
//             ]}
//           >
//             <div
//               onClick={() => navigate(`/albums/${album.id}`)}
//               style={{ cursor: 'pointer', width: '100%' }}
//             >
//               <Title level={5} style={{ margin: 0 }}>
//                 {editingId === album.id ? (
//                   <Input
//                     value={editingName}
//                     onChange={(e) => setEditingName(e.target.value)}
//                   />
//                 ) : (
//                   album.name
//                 )}
//               </Title>
//               {album.description && (
//                 <Paragraph style={{ margin: 0, color: '#888' }}>{album.description}</Paragraph>
//               )}
//             </div>
//           </List.Item>
//         )}
//       />
//     </div>
//   );
// };

// export default Albums;
// import React, { useEffect, useState } from 'react';
// import { Button, Input, List, Typography, Popconfirm } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/store';
// import { addAlbum, fetchAlbums, updateAlbum, deleteAlbum } from '../api/api';

// const { Title, Paragraph } = Typography;

// interface Album {
//   id: number;
//   name: string;
//   description?: string;
// }

// const Albums: React.FC = () => {
//   const navigate = useNavigate();
//   const userId = useSelector((state: RootState) => state.auth.userId); // 🧠 Redux
//   const [albums, setAlbums] = useState<Album[]>([]);
//   const [newAlbum, setNewAlbum] = useState('');
//   const [descriptionAlbum, setDescriptionAlbum] = useState('');
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [editingName, setEditingName] = useState('');

//   useEffect(() => {
//     if (!userId) {
//       navigate('/login');
//       return;
//     }

//     const loadAlbums = async () => {
//       try {
//         const data = await fetchAlbums(userId); // ✅ משתמש ב־Redux
//         setAlbums(data);
//       } catch (error) {
//         console.error('שגיאה בטעינת אלבומים:', error);
//       }
//     };

//     loadAlbums();
//   }, [userId, navigate]);

//   const handleAddAlbum = async () => {
//     if (!newAlbum.trim() || !userId) return;

//     const newAlbumObj = {
//       name: newAlbum,
//       Description: descriptionAlbum,
//       userId,
//     };

//     try {
//       const created = await addAlbum(newAlbumObj);
//       setAlbums([...albums, created]);
//       setNewAlbum('');
//       setDescriptionAlbum('');
//     } catch (error) {
//       console.error('שגיאה בהוספת אלבום:', error);
//     }
//   };

//   const handleUpdateAlbum = async (id: number) => {
//     try {
//       await updateAlbum(id, editingName);
//       setAlbums(albums.map((a) => (a.id === id ? { ...a, name: editingName } : a)));
//       setEditingId(null);
//       setEditingName('');
//     } catch (error) {
//       console.error('שגיאה בעדכון אלבום:', error);
//     }
//   };

//   const handleDeleteAlbum = async (id: number) => {
//     try {
//       await deleteAlbum(id);
//       setAlbums(albums.filter((a) => a.id !== id));
//     } catch (error) {
//       console.error('שגיאה במחיקת אלבום:', error);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
//       <Title level={2}>📁 ניהול אלבומים</Title>

//       <Input
//         placeholder="שם האלבום"
//         value={newAlbum}
//         onChange={(e) => setNewAlbum(e.target.value)}
//         style={{ marginBottom: 10 }}
//       />

//       <Input
//         placeholder="תיאור האלבום"
//         value={descriptionAlbum}
//         onChange={(e) => setDescriptionAlbum(e.target.value)}
//         style={{ marginBottom: 10 }}
//       />

//       <Button type="primary" onClick={handleAddAlbum} block>
//         ➕ הוסף אלבום
//       </Button>

//       <List
//         bordered
//         style={{ marginTop: 20 }}
//         dataSource={albums}
//         renderItem={(album) => (
//           <List.Item
//             key={album.id}
//             actions={[
//               editingId === album.id ? (
//                 <>
//                   <Button type="link" onClick={() => handleUpdateAlbum(album.id)}>שמור</Button>
//                   <Button type="link" danger onClick={() => setEditingId(null)}>ביטול</Button>
//                 </>
//               ) : (
//                 <>
//                   <Button
//                     type="link"
//                     onClick={() => {
//                       setEditingId(album.id);
//                       setEditingName(album.name);
//                     }}
//                   >
//                     ✏️ ערוך
//                   </Button>
//                   <Popconfirm
//                     title="האם את בטוחה שתרצי למחוק?"
//                     onConfirm={() => handleDeleteAlbum(album.id)}
//                   >
//                     <Button type="link" danger>🗑️ מחק</Button>
//                   </Popconfirm>
//                 </>
//               ),
//             ]}
//           >
//             <div
//               onClick={() => navigate(`/albums/${album.id}`)}
//               style={{ cursor: 'pointer', width: '100%' }}
//             >
//               <Title level={5} style={{ margin: 0 }}>
//                 {editingId === album.id ? (
//                   <Input
//                     value={editingName}
//                     onChange={(e) => setEditingName(e.target.value)}
//                   />
//                 ) : (
//                   album.name
//                 )}
//               </Title>
//               {album.description && (
//                 <Paragraph style={{ margin: 0, color: '#888' }}>
//                   {album.description}
//                 </Paragraph>
//               )}
//             </div>
//           </List.Item>
//         )}
//       />
//     </div>
//   );
// };

// export default Albums;
"use client"

import React, { useEffect, useState } from "react"
import { Button, Input, List, Typography, Popconfirm, message } from "antd"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { addAlbum, fetchAlbums, updateAlbum, deleteAlbum } from "../api/api"

const { Title, Paragraph } = Typography

interface Album {
  id: number
  name: string
  description?: string
}

const Albums: React.FC = () => {
  const navigate = useNavigate()
  const userId = useSelector((state: RootState) => state.auth.userId)
  const [albums, setAlbums] = useState<Album[]>([])
  const [newAlbum, setNewAlbum] = useState("")
  const [descriptionAlbum, setDescriptionAlbum] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState("")
  const [editingDescription, setEditingDescription] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!userId) {
      navigate("/login")
      return
    }

    const loadAlbums = async () => {
      try {
        setLoading(true)
        const data = await fetchAlbums(userId)
        setAlbums(data)
      } catch (error) {
        console.error("שגיאה בטעינת אלבומים:", error)
        message.error("לא ניתן לטעון את האלבומים")
      } finally {
        setLoading(false)
      }
    }

    loadAlbums()
  }, [userId, navigate])

  const handleAddAlbum = async () => {
    if (!newAlbum.trim() || !userId) return

    try {
      setLoading(true)
      const newAlbumObj = {
        name: newAlbum,
        Description: descriptionAlbum,
        userId,
      }

      const created = await addAlbum(newAlbumObj)
      setAlbums([...albums, created])
      setNewAlbum("")
      setDescriptionAlbum("")
      message.success("האלבום נוצר בהצלחה")
    } catch (error) {
      console.error("שגיאה בהוספת אלבום:", error)
      message.error("לא ניתן ליצור אלבום")
    } finally {
      setLoading(false)
    }
  }

  // פונקציה חדשה להתחלת עריכה
  const startEditing = (album: Album) => {
    setEditingId(album.id)
    setEditingName(album.name)
    setEditingDescription(album.description || "")
  }

  const handleUpdateAlbum = async (id: number) => {
    if (!editingName.trim()) return

    try {
      setLoading(true)
      // שימוש בפונקציה המעודכנת עם תיאור
      await updateAlbum(id, editingName, editingDescription)

      setAlbums(albums.map((a) => (a.id === id ? { ...a, name: editingName, description: editingDescription } : a)))

      setEditingId(null)
      setEditingName("")
      setEditingDescription("")
      message.success("האלבום עודכן בהצלחה")
    } catch (error) {
      console.error("שגיאה בעדכון אלבום:", error)
      message.error("לא ניתן לעדכן את האלבום")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAlbum = async (id: number) => {
    try {
      setLoading(true)
      await deleteAlbum(id)
      setAlbums(albums.filter((a) => a.id !== id))
      message.success("האלבום נמחק בהצלחה")
    } catch (error) {
      console.error("שגיאה במחיקת אלבום:", error)
      message.error("לא ניתן למחוק את האלבום")
    } finally {
      setLoading(false)
    }
  }

  // מניעת ניווט בעת לחיצה על שדות הקלט
  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="albums-container">
      <Title level={2} className="page-title">
        📁 ניהול אלבומים
      </Title>

      <div className="album-form">
        <Input
          placeholder="שם האלבום"
          value={newAlbum}
          onChange={(e) => setNewAlbum(e.target.value)}
          className="album-input"
        />

        <Input
          placeholder="תיאור האלבום"
          value={descriptionAlbum}
          onChange={(e) => setDescriptionAlbum(e.target.value)}
          className="album-input"
        />

        <Button type="primary" onClick={handleAddAlbum} loading={loading} className="add-album-btn">
          ➕ הוסף אלבום
        </Button>
      </div>

      <List
        loading={loading}
        className="albums-list"
        bordered
        dataSource={albums}
        renderItem={(album) => (
          <List.Item
            key={album.id}
            className="album-item"
            actions={[
              editingId === album.id ? (
                <React.Fragment key={`edit-actions-${album.id}`}>
                  <Button type="primary" onClick={() => handleUpdateAlbum(album.id)}>
                    שמור
                  </Button>
                  <Button danger onClick={() => setEditingId(null)}>
                    ביטול
                  </Button>
                </React.Fragment>
              ) : (
                <React.Fragment key={`view-actions-${album.id}`}>
                  <Button type="link" onClick={(e) => { e.stopPropagation(); startEditing(album); }} className="edit-btn">
                    ✏️ ערוך
                  </Button>
                  <Popconfirm
                    title="האם את בטוחה שתרצי למחוק?"
                    onConfirm={(e) => { e?.stopPropagation(); handleDeleteAlbum(album.id); }}
                    okText="כן"
                    cancelText="לא"
                    onCancel={(e) => e?.stopPropagation()}
                  >
                    <Button type="link" danger className="delete-btn" onClick={(e) => e.stopPropagation()}>
                      🗑️ מחק
                    </Button>
                  </Popconfirm>
                </React.Fragment>
              ),
            ]}
          >
            <div onClick={() => navigate(`/albums/${album.id}`)} className="album-content">
              <Title level={5} className="album-title">
                {editingId === album.id ? (
                  <Input 
                    value={editingName} 
                    onChange={(e) => setEditingName(e.target.value)} 
                    placeholder="שם האלבום" 
                    onClick={handleInputClick}
                    className="edit-input"
                  />
                ) : (
                  album.name
                )}
              </Title>
              {editingId === album.id ? (
                <Input
                  value={editingDescription}
                  onChange={(e) => setEditingDescription(e.target.value)}
                  placeholder="תיאור האלבום"
                  onClick={handleInputClick}
                  className="edit-input"
                />
              ) : (
                album.description && <Paragraph className="album-description">{album.description}</Paragraph>
              )}
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default Albums
