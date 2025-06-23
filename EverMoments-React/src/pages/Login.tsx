
// import React from 'react';
// import { Button, Form, Input, Typography } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../api/api';

// const { Title } = Typography;

// interface LoginProps {
//   onLogin: (userData: { fullName: string }) => void;
// }

// const Login: React.FC<LoginProps> = ({ onLogin }) => {
//   const navigate = useNavigate();

//   const onFinish = async (values: { email: string; password: string }) => {
//     try {
//       const user = await loginUser(values.email, values.password);
//       onLogin({ fullName: user.fullName });
//       navigate('/albums');
//     } catch (error) {
//       console.error('שגיאת התחברות:', error);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
//       <Title level={2}>התחברות</Title>
//       <Form layout="vertical" onFinish={onFinish}>
//         <Form.Item label="אימייל" name="email" rules={[{ required: true, type: 'email' }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item label="סיסמה" name="password" rules={[{ required: true }]}>
//           <Input.Password />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit" block>
//             התחבר
//           </Button>
//         </Form.Item>
//         <Button type="link" onClick={() => navigate('/register')}>
//           אין לך חשבון? הירשם כאן
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default Login;

// import React from 'react';
// import { Button, Form, Input, Typography } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../api/api';
// import { useDispatch } from 'react-redux';
// import { login } from '../store/authSlice';

// const { Title } = Typography;

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const onFinish = async (values: { email: string; password: string }) => {
//     try {
//       // שליחת בקשת התחברות
//       const user = await loginUser(values.email, values.password);

//       // שמירת נתוני המשתמש ל־Redux
//       dispatch(login({ token: user.token, fullName: user.fullName }));

//       // שמירה ל-localStorage (אם לא נשמר עדיין)
//       localStorage.setItem('token', user.token);
//       localStorage.setItem('user', JSON.stringify(user));

//       // ניתוב לאלבומים
//       navigate('/albums');
//     } catch (error) {
//       console.error('שגיאת התחברות:', error);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
//       <Title level={2}>התחברות</Title>
//       <Form layout="vertical" onFinish={onFinish}>
//         <Form.Item label="אימייל" name="email" rules={[{ required: true, type: 'email' }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item label="סיסמה" name="password" rules={[{ required: true }]}>
//           <Input.Password />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit" block>
//             התחבר
//           </Button>
//         </Form.Item>
//         <Button type="link" onClick={() => navigate('/register')}>
//           אין לך חשבון? הירשם כאן
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default Login;

// src/pages/Login.tsx
// import React from 'react';
// import { Button, Form, Input, Typography } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../api/api';
// import { useDispatch } from 'react-redux';
// import { login } from '../store/authSlice';

// const { Title } = Typography;

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const onFinish = async (values: { email: string; password: string }) => {
//     try {
//       const user = await loginUser(values.email, values.password);
//       localStorage.setItem('user', JSON.stringify(user));
//       localStorage.setItem('token', user.token);
//       dispatch(login(user.token)); // שמירה ל־Redux
//       navigate('/albums'); // מעבר לדף אלבומים
//     } catch (error) {
//       console.error('שגיאת התחברות:', error);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
//       <Title level={2}>התחברות</Title>
//       <Form layout="vertical" onFinish={onFinish}>
//         <Form.Item label="אימייל" name="email" rules={[{ required: true, type: 'email' }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item label="סיסמה" name="password" rules={[{ required: true }]}>
//           <Input.Password />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit" block>
//             התחבר
//           </Button>
//         </Form.Item>
//         <Button type="link" onClick={() => navigate('/register')}>
//           אין לך חשבון? הירשם כאן
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default Login;
// import React from 'react';
// import { Button, Form, Input, Typography } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../api/api';
// import { login } from '../store/authSlice';

// const { Title } = Typography;

// const Login: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const onFinish = async (values: { email: string; password: string }) => {
//     try {
//       const user = await loginUser(values.email, values.password);
//       dispatch(login({
//         token: user.token,
//         fullName: user.fullName,
//         userId: user.id
//       }));
//       navigate('/albums');
//     } catch (error) {
//       console.error('שגיאת התחברות:', error);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
//       <Title level={2}>התחברות</Title>
//       <Form layout="vertical" onFinish={onFinish}>
//         <Form.Item label="אימייל" name="email" rules={[{ required: true, type: 'email' }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item label="סיסמה" name="password" rules={[{ required: true }]}>
//           <Input.Password />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit" block>התחבר</Button>
//         </Form.Item>
//         <Button type="link" onClick={() => navigate('/register')}>אין לך חשבון? הירשם כאן</Button>
//       </Form>
//     </div>
//   );
// };

// export default Login;
"use client"

import type React from "react"
import { useState } from "react"
import { Button, Form, Input, Typography, Alert } from "antd"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginUser } from "../api/api"
import { login } from "../store/authSlice"

const { Title, Paragraph } = Typography

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      setLoading(true)
      setError("")
      const user = await loginUser(values.email, values.password)
      dispatch(
        login({
          token: user.token,
          fullName: user.fullName,
          userId: user.id,
        }),
      )
      navigate("/albums")
    } catch (error) {
      console.error("שגיאת התחברות:", error)
      setError("שגיאה בהתחברות. אנא בדוק את פרטי ההתחברות שלך.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <img src="/image/logo.png" alt="EverMoments Logo" className="logo-image" />
        </div>

        <Title level={2} className="login-title">
          ברוכים השבים
        </Title>
        <Paragraph className="login-subtitle">התחבר כדי לנהל את האלבומים שלך</Paragraph>

        {error && <Alert message={error} type="error" showIcon className="login-error" />}

        <Form layout="vertical" onFinish={onFinish} className="login-form">
          <Form.Item
            label="אימייל"
            name="email"
            rules={[{ required: true, type: "email", message: "אנא הזן כתובת אימייל תקינה" }]}
          >
            <Input size="large" placeholder="your@email.com" />
          </Form.Item>

          <Form.Item label="סיסמה" name="password" rules={[{ required: true, message: "אנא הזן סיסמה" }]}>
            <Input.Password size="large" placeholder="הזן את הסיסמה שלך" />
          </Form.Item>

          <Form.Item className="login-actions">
            <Button type="primary" htmlType="submit" loading={loading} className="login-button" size="large" block>
              {loading ? "מתחבר..." : "התחבר"}
            </Button>
          </Form.Item>

          <div className="login-footer">
            <Button type="link" onClick={() => navigate("/register")} className="register-link">
              אין לך חשבון? הירשם כאן
            </Button>
          </div>
        </Form>
      </div>

      <style >{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: linear-gradient(135deg, #e0f7fa 0%, #80deea 100%);
          padding: 20px;
        }
        
        .login-card {
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 40px;
          width: 100%;
          max-width: 450px;
        }
        
        .login-logo {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        
        .logo-image {
          width: 80px;
          height: auto;
        }
        
        .login-title {
          text-align: center;
          color: #00a896 !important;
          margin-bottom: 5px !important;
        }
        
        .login-subtitle {
          text-align: center;
          color: #666 !important;
          margin-bottom: 30px !important;
        }
        
        .login-error {
          margin-bottom: 20px;
        }
        
        .login-form {
          margin-bottom: 20px;
        }
        
        .login-button {
          background-color: #00a896 !important;
          border-color: #00a896 !important;
          height: 45px !important;
        }
        
        .login-button:hover {
          background-color: #028090 !important;
          border-color: #028090 !important;
        }
        
        .login-footer {
          text-align: center;
          margin-top: 20px;
        }
        
        .register-link {
          color: #00a896 !important;
        }
        
        .register-link:hover {
          color: #028090 !important;
        }
      `}</style>
    </div>
  )
}

export default Login
