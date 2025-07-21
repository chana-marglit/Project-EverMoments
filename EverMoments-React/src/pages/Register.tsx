"use client"

import type React from "react"
import { useState } from "react"
import { Button, Form, Input, Typography, Alert } from "antd"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { registerUser } from "../api/api"
import { login } from "../store/authSlice"
import logo from '../assets/logo.png';


const { Title, Paragraph } = Typography

const Register: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const onFinish = async (values: {
    firstName: string
    lastName: string
    address: string
    phone: string
    email: string
    password: string
    confirmPassword: string
  }) => {
    if (values.password !== values.confirmPassword) {
      setError("הסיסמאות אינן תואמות")
      return
    }

    try {
      setLoading(true)
      setError("")

      const fullName = `${values.firstName} ${values.lastName}`
      const userData = {
        fullName,
        address: values.address,
        phone: values.phone,
        email: values.email,
        password: values.password,
      }

      await registerUser(userData)

      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const parsed = JSON.parse(storedUser)
        dispatch(
          login({
            token: parsed.token,
            fullName: parsed.fullName,
            userId: parsed.id,
          }),
        )
      }

      navigate("/albums")
    } catch (error) {
      console.error("שגיאת הרשמה:", error)
      setError("שגיאה בהרשמה. אנא נסה שנית.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-logo">
          <img src={logo} alt="EverMoments Logo" className="logo-image" />
        </div>

        <Title level={2} className="register-title">
          הרשמה ל-EverMoments
        </Title>
        <Paragraph className="register-subtitle">צור חשבון חדש כדי להתחיל לשמור את הרגעים שלך</Paragraph>

        {error && <Alert message={error} type="error" showIcon className="register-error" />}

        <Form layout="vertical" onFinish={onFinish} className="register-form">
          <div className="form-row">
            <Form.Item
              label="שם פרטי"
              name="firstName"
              rules={[{ required: true, message: "אנא הזן שם פרטי" }]}
              className="form-col"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="שם משפחה"
              name="lastName"
              rules={[{ required: true, message: "אנא הזן שם משפחה" }]}
              className="form-col"
            >
              <Input />
            </Form.Item>
          </div>

          <Form.Item label="כתובת" name="address" rules={[{ required: true, message: "אנא הזן כתובת" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="טלפון" name="phone" rules={[{ required: true, message: "אנא הזן מספר טלפון" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="אימייל"
            name="email"
            rules={[{ required: true, type: "email", message: "אנא הזן כתובת אימייל תקינה" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="סיסמה" name="password" rules={[{ required: true, message: "אנא הזן סיסמה" }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="אימות סיסמה"
            name="confirmPassword"
            rules={[{ required: true, message: "אנא אמת את הסיסמה" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="register-button" block>
              {loading ? "מבצע הרשמה..." : "הירשם"}
            </Button>
          </Form.Item>

          <div className="register-footer">
            <Button type="link" onClick={() => navigate("/login")} className="login-link">
              כבר יש לך חשבון? התחבר כאן
            </Button>
          </div>
        </Form>
      </div>

      <style>{`
        .register-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: linear-gradient(135deg, #e0f7fa 0%, #80deea 100%);
          padding: 20px;
        }
        
        .register-card {
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 40px;
          width: 100%;
          max-width: 550px;
        }
        
        .register-logo {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        
        .logo-image {
          width: 80px;
          height: auto;
        }
        
        .register-title {
          text-align: center;
          color: #00a896 !important;
          margin-bottom: 5px !important;
        }
        
        .register-subtitle {
          text-align: center;
          color: #666 !important;
          margin-bottom: 30px !important;
        }
        
        .register-error {
          margin-bottom: 20px;
        }
        
        .register-form {
          margin-bottom: 20px;
        }
        
        .form-row {
          display: flex;
          gap: 16px;
        }
        
        .form-col {
          flex: 1;
        }
        
        .register-button {
          background-color: #00a896 !important;
          border-color: #00a896 !important;
          height: 45px !important;
        }
        
        .register-button:hover {
          background-color: #028090 !important;
          border-color: #028090 !important;
        }
        
        .register-footer {
          text-align: center;
          margin-top: 20px;
        }
        
        .login-link {
          color: #00a896 !important;
        }
        
        .login-link:hover {
          color: #028090 !important;
        }
        
        @media (max-width: 576px) {
          .form-row {
            flex-direction: column;
            gap: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default Register
