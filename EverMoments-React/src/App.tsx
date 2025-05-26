// // // // src/App.tsx
// // // import React, { useState } from 'react';
// // // import { Route, Routes } from 'react-router-dom';
// // // import { Avatar } from 'antd';
// // // import HomePage from './pages/HomePage';
// // // import Login from './pages/Login';
// // // import Register from './pages/Register';
// // // import Albums from './pages/Albums';

// // // const App: React.FC = () => {
// // //   const [user, setUser] = useState<{ fullName: string } | null>(null);

// // //   const handleLogin = (userData: { fullName: string }) => {
// // //     console.log('User data received:', userData); // בדוק את הנתונים
// // //     setUser(userData);
// // //   };

// // //   return (
// // //     <div>
// // //       {user && user.fullName ? (
// // //         <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
// // //           <Avatar>{user.fullName.charAt(0).toUpperCase()}</Avatar>
// // //           <span style={{ marginLeft: '10px' }}>{user.fullName}</span>
// // //         </div>
// // //       ) : (
// // //         <span>לא מחובר</span> // הודעה אם לא מחובר
// // //       )}
// // //       <Routes>
// // //         <Route path="/" element={<HomePage />} />
// // //         <Route path="/login" element={<Login onLogin={handleLogin} />} />
// // //         <Route path="/register" element={<Register />} />
// // //         <Route path="/albums" element={<Albums />} />
// // //       </Routes>
// // //     </div>
// // //   );
// // // };

// // // export default App;
// // // src/App.tsx
// // import React, { useEffect } from 'react';
// // import { Routes, Route, useNavigate } from 'react-router-dom';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { Avatar } from 'antd';
// // import { RootState } from './store/store';
// // import { login } from './store/authSlice';
// // import { getStoredUser } from './api/api';
// // import HomePage from './pages/HomePage';
// // import Login from './pages/Login';
// // import Register from './pages/Register';
// // import Albums from './pages/Albums';
// // import PrivateRoute from './routes/PrivateRoute';
// // import AlbumView from './pages/AlbumView';

// // const App: React.FC = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
// //   const token = useSelector((state: RootState) => state.auth.token);

// //   // טוען משתמש מה-localStorage כשהאפליקציה נפתחת
// //   useEffect(() => {
// //     const user = getStoredUser();
// //     if (user && user.token) {
// //       dispatch(login(user.token));
// //     }
// //   }, [dispatch]);

// //   const user = getStoredUser();

// //   return (
// //     <div style={{ padding: '10px' }}>
// //       {isAuthenticated && user?.fullName ? (
// //         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
// //           <Avatar>{user.fullName.charAt(0).toUpperCase()}</Avatar>
// //           <span style={{ marginLeft: '10px' }}>{user.fullName}</span>
// //         </div>
// //       ) : (
// //         <span style={{ marginBottom: '10px', display: 'block' }}>לא מחובר</span>
// //       )}

      
// //       <Routes>
// //         <Route path="/" element={<HomePage />} />
// //         <Route path="/login" element={<Login onLogin={() => navigate('/albums')} />} />
// //         <Route path="/register" element={<Register />} />
// //         {/* נתיב מוגן */}
// //         <Route element={<PrivateRoute />}>
// //           <Route path="/albums" element={<Albums />} />
// //         </Route>
// //         <Route path="/albums/:id" element={<AlbumView />} />
// //       </Routes>
// //     </div>
// //   );
// // };

// // export default App;


// import React, { useEffect } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { Avatar, Button } from 'antd';
// import { RootState } from './store/store';
// import { login, logout } from './store/authSlice';
// import { getStoredUser } from './api/api';
// import HomePage from './pages/HomePage';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Albums from './pages/Albums';
// import PrivateRoute from './routes/PrivateRoute';
// import AlbumView from './pages/AlbumView';

// const App: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, token, fullName } = useSelector((state: RootState) => state.auth);


//   useEffect(() => {
//     const storedUser = getStoredUser();
//     if (storedUser?.token) {
//       dispatch(login(storedUser.token));
//     }
//   }, [dispatch]);

//   const user = getStoredUser();

//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.clear();
//     navigate('/login');
//   };

//   return (
//     <div style={{ padding: '10px' }}>
//       {isAuthenticated && user?.fullName ? (
//         <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
//           <Avatar>{user.fullName.charAt(0).toUpperCase()}</Avatar>
//           <span>{user.fullName}</span>
//           <Button onClick={handleLogout}>🔓 התנתק</Button>
//         </div>
//       ) : (
//         <span style={{ marginBottom: '10px', display: 'block' }}>לא מחובר</span>
//       )}

//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<Login onLogin={() => navigate('/albums')} />} />
//         <Route path="/register" element={<Register />} />
//         <Route element={<PrivateRoute />}>
//           <Route path="/albums" element={<Albums />} />
//           <Route path="/albums/:id" element={<AlbumView />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// };

// export default App;

// src/App.tsx
// import React, { useEffect } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { Avatar, Button } from 'antd';
// import { RootState } from './store/store';
// import { login, logout } from './store/authSlice';
// import { getStoredUser } from './api/api';
// import HomePage from './pages/HomePage';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Albums from './pages/Albums';
// import PrivateRoute from './routes/PrivateRoute';
// import AlbumView from './pages/AlbumView';

// const App: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated } = useSelector((state: RootState) => state.auth);
//   const user = getStoredUser();

//   // // בודק אם יש טוקן בשמירה ומבצע התחברות אוטומטית
//   // useEffect(() => {
//   //   if (user?.token) {
//   //     dispatch(login(user.token));
//   //   }
//   // }, [dispatch]);

//   useEffect(() => {
//     const storedUser = getStoredUser();
//     if (storedUser?.token && storedUser?.fullName) {
//       dispatch(login({
//         token: storedUser.token,
//         fullName: storedUser.fullName
//       }));
//     }
//   }, [dispatch]);

//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.clear();
//     navigate('/login');
//   };

//   return (
//     <div style={{ padding: '10px' }}>
//       {isAuthenticated && user?.fullName ? (
//         <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
//           <Avatar>{user.fullName.charAt(0).toUpperCase()}</Avatar>
//           <span>{user.fullName}</span>
//           <Button onClick={handleLogout}>🔓 התנתק</Button>
//         </div>
//       ) : (
//         <span style={{ marginBottom: '10px', display: 'block' }}>לא מחובר</span>
//       )}

//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route element={<PrivateRoute />}>
//           <Route path="/albums" element={<Albums />} />
//           <Route path="/albums/:id" element={<AlbumView />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// };

// export default App;
// import React, { useEffect, useState } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { Avatar, Button, Spin } from 'antd';
// import { RootState } from './store/store';
// import { login, logout } from './store/authSlice';
// import { getStoredUser } from './api/api';
// import HomePage from './pages/HomePage';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Albums from './pages/Albums';
// import PrivateRoute from './routes/PrivateRoute';
// import AlbumView from './pages/AlbumView';

// const App: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, fullName } = useSelector((state: RootState) => state.auth);
//   const [loading, setLoading] = useState(true); // ניהול טעינה ראשונית

//   useEffect(() => {
//     const storedUser = getStoredUser();
//     if (storedUser?.token && storedUser?.fullName) {
//       dispatch(login({
//         token: storedUser.token,
//         fullName: storedUser.fullName
//       }));
//     }
//     setLoading(false); // סיום טעינה
//   }, [dispatch]);

//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.clear();
//     navigate('/login');
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: 'center', marginTop: '50px' }}>
//         <Spin size="large" tip="טוען את המידע..." />
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: '10px' }}>
//       {isAuthenticated && fullName ? (
//         <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
//           <Avatar>{fullName.charAt(0).toUpperCase()}</Avatar>
//           <span>{fullName}</span>
//           <Button onClick={handleLogout}>🔓 התנתק</Button>
//         </div>
//       ) : (
//         <span style={{ marginBottom: '10px', display: 'block' }}>לא מחובר</span>
//       )}

//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route element={<PrivateRoute />}>
//           <Route path="/albums" element={<Albums />} />
//           <Route path="/albums/:id" element={<AlbumView />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// };

// export default App;

// import React, { useEffect } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { Avatar, Button, Spin } from 'antd';
// import { RootState } from './store/store';
// import { login, logout, setLoading } from './store/authSlice';
// import { getStoredUser } from './api/api';
// import HomePage from './pages/HomePage';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Albums from './pages/Albums';
// import PrivateRoute from './routes/PrivateRoute';

// import UploadImage from './pages/UploadImage';
// import AlbumView from './pages/Image';

// const App: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, fullName, loading } = useSelector((state: RootState) => state.auth);

//   useEffect(() => {
//     dispatch(setLoading(true));
//     const storedUser = getStoredUser();
  
//     if (storedUser?.token && storedUser?.fullName && storedUser?.id) {
//       dispatch(login({
//         token: storedUser.token,
//         fullName: storedUser.fullName,
//         userId: storedUser.id, 
//       }));
//     } else {
//       dispatch(setLoading(false));
//     }
//   }, [dispatch]);

//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.clear();
//     navigate('/login');
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: 'center', marginTop: '50px' }}>
//         <Spin size="large" tip="טוען..." />
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: '10px' }}>
//       {isAuthenticated && fullName ? (
//         <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
//           <Avatar>{fullName.charAt(0).toUpperCase()}</Avatar>
//           <span>{fullName}</span>
//           <Button onClick={handleLogout}>🔓 התנתק</Button>
//         </div>
//       ) : (
//         <span style={{ marginBottom: '10px', display: 'block' }}>לא מחובר</span>
//       )}

//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route element={<PrivateRoute />}>
//           <Route path="/albums" element={<Albums />} />
//           <Route path="/albums/:id" element={<AlbumView />} />
//         </Route>
//         <Route path="/upload" element={<UploadImage />} /> 
//       </Routes>
//     </div>
//   );
// };

// export default App;
"use client"

import type React from "react"
import { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Avatar, Spin, Layout, Menu, Dropdown } from "antd"
import { UserOutlined, LogoutOutlined, HomeOutlined, PictureOutlined } from "@ant-design/icons"
import type { RootState } from "./store/store"
import { login, logout, setLoading } from "./store/authSlice"
import { getStoredUser } from "./api/api"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Albums from "./pages/Albums"
import PrivateRoute from "./routes/PrivateRoute"
import AlbumView from "./pages/Image"

const { Header } = Layout

const App: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, fullName, loading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(setLoading(true))
    const storedUser = getStoredUser()

    if (storedUser?.token && storedUser?.fullName && storedUser?.id) {
      dispatch(
        login({
          token: storedUser.token,
          fullName: storedUser.fullName,
          userId: storedUser.id,
        }),
      )
    } else {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
    localStorage.clear()
    navigate("/login")
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <Spin size="large" tip="טוען..." />
      </div>
    )
  }

  return (
    <Layout className="app-layout">
      {isAuthenticated && (
        <Header className="app-header">
          <div className="header-logo" onClick={() => navigate("/albums")}>
            <img src="/image/logo.png" alt="Logo" className="header-logo-img" />
            <span className="header-logo-text">EverMoments</span>
          </div>

          <Menu mode="horizontal" className="header-menu" selectedKeys={[window.location.pathname]}>
            <Menu.Item key="/albums" icon={<PictureOutlined />} onClick={() => navigate("/albums")}>
              האלבומים שלי
            </Menu.Item>
            <Menu.Item key="/" icon={<HomeOutlined />} onClick={() => navigate("/")}>
              דף הבית
            </Menu.Item>
          </Menu>

          <div className="header-user">
            <Dropdown
              menu={{
                items: [
                  {
                    key: "profile",
                    icon: <UserOutlined />,
                    label: "פרופיל",
                  },
                  {
                    key: "logout",
                    icon: <LogoutOutlined />,
                    label: "התנתק",
                    onClick: handleLogout,
                  },
                ],
              }}
              placement="bottomRight"
            >
              <div className="user-info">
                <span className="user-name">{fullName}</span>
                <Avatar className="user-avatar">{fullName?.charAt(0).toUpperCase()}</Avatar>
              </div>
            </Dropdown>
          </div>
        </Header>
      )}

      <div className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/albums" element={<Albums />} />
            <Route path="/albums/:id" element={<AlbumView />} />
          </Route>
        </Routes>
      </div>

      <style >{`
        .app-layout {
          min-height: 100vh;
        }
        
        .loading-screen {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f2f5;
        }
        
        .app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          padding: 0 20px;
          height: 64px;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        
        .header-logo {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        
        .header-logo-img {
          height: 40px;
          width: auto;
          margin-right: 10px;
        }
        
        .header-logo-text {
          font-size: 1.2rem;
          font-weight: bold;
          color: #00a896;
        }
        
        .header-menu {
          flex: 1;
          display: flex;
          justify-content: center;
          border-bottom: none;
          background-color: transparent;
        }
        
        .header-user {
          display: flex;
          align-items: center;
        }
        
        .user-info {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        
        .user-name {
          margin-right: 10px;
          font-weight: 500;
        }
        
        .user-avatar {
          background-color: #00a896;
        }
        
        .app-content {
          min-height: calc(100vh - 64px);
        }
      `}</style>
    </Layout>
  )
}

export default App
