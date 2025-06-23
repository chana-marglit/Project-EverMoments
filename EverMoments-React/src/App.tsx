import type React from "react"
import { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Avatar, Spin, Layout, Menu, Dropdown } from "antd"
import { UserOutlined, LogoutOutlined, HomeOutlined, PictureOutlined, ShareAltOutlined } from "@ant-design/icons"
import type { RootState } from "./store/store"
import { login, logout, setLoading } from "./store/authSlice"
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
import SharedImages from "./pages/SharedImages"
import { getStoredUser } from "./api/auth"

// ✅ ייבוא הסגנונות - עכשיו הקבצים קיימים
import "./styles/album-view.css"
import "./styles/shared-images.css"


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
            <Menu.Item key="/shared-images" icon={<ShareAltOutlined />} onClick={() => navigate("/shared-images")}>
              תמונות משותפות
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
            <Route path="/shared-images" element={<SharedImages />} />
          </Route>
        </Routes>
      </div>
      <style>{`
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
