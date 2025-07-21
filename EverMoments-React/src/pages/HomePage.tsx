// "use client"

import type React from "react"
import logo from '../assets/logo.png';

import { Button, Typography } from "antd"
import { useNavigate } from "react-router-dom"

const { Title, Paragraph } = Typography

const HomePage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="logo-container">
          <img src={logo} alt="EverMoments Logo" className="logo" />
        </div>
        <Title className="title">EverMoments</Title>
        <Paragraph className="subtitle">רגעים שנשארים לנצח</Paragraph>

        <div className="buttons-container">
          <Button type="primary" size="large" className="login-btn" onClick={() => navigate("/login")}>
            התחבר
          </Button>

          <Button type="primary" size="large" className="register-btn" onClick={() => navigate("/register")}>
            הירשם
          </Button>
        </div>
      </div>

      <div className="features-section">
        <Title level={2} className="features-title">
          למה לבחור ב-EverMoments?
        </Title>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📁</div>
            <Title level={4}>ארגון חכם</Title>
            <Paragraph>ארגן את התמונות שלך באלבומים, עם תיוג אוטומטי וזיהוי פנים בעזרת בינה מלאכותית.</Paragraph>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <Title level={4}>חיפוש מתקדם</Title>
            <Paragraph>מצא תמונות בקלות לפי תגיות, אנשים, תאריכים ומיקום.</Paragraph>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <Title level={4}>שיתוף קל</Title>
            <Paragraph>שתף אלבומים עם משפחה וחברים בקלות, עם אפשרויות פרטיות מתקדמות.</Paragraph>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <Title level={2}>מוכנים להתחיל?</Title>
        <Paragraph className="cta-text">
          הצטרפו לאלפי משפחות שכבר משתמשות ב-EverMoments כדי לשמור ולשתף את הזכרונות היקרים להם.
        </Paragraph>
        <Button type="primary" size="large" className="cta-btn" onClick={() => navigate("/register")}>
          הרשמה חינם
        </Button>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo} alt="EverMoments Logo" className="footer-logo-img" />
            <span className="footer-logo-text">EverMoments</span>
          </div>

          <div className="footer-links">
            <a href="#about">אודות</a>
            <a href="#privacy">פרטיות</a>
            <a href="#terms">תנאי שימוש</a>
            <a href="#contact">צור קשר</a>
          </div>
        </div>

        <div className="footer-copyright">&copy; {new Date().getFullYear()} EverMoments. כל הזכויות שמורות.</div>
      </footer>

      <style >{`
        .home-container {
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .hero-section {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-image: url('../assets/11.jpg');
          background-size: cover;
          background-position: center;
          color: white;
          text-align: center;
          position: relative;
        }
        
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 1;
        }
        
        .logo-container, .title, .subtitle, .buttons-container {
          position: relative;
          z-index: 2;
        }
        
        .logo {
          width: 150px;
          height: auto;
          filter: drop-shadow(0 0 15px #00F5D4);
          margin-bottom: 20px;
        }
        
        .title {
          font-size: 4rem !important;
          color: #00F5D4 !important;
          margin: 0 !important;
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
        
        .subtitle {
          font-size: 1.5rem !important;
          color: white !important;
          margin-bottom: 40px !important;
        }
        
        .buttons-container {
          display: flex;
          gap: 20px;
        }
        
        .login-btn {
          background-color: #00F5D4 !important;
          border-color: #00F5D4 !important;
        }
        
        .register-btn {
          background-color: #FFD700 !important;
          border-color: #FFD700 !important;
        }
        
        .features-section {
          padding: 80px 20px;
          background-color: #f8f9fa;
          text-align: center;
        }
        
        .features-title {
          color: #00a896 !important;
          margin-bottom: 60px !important;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .feature-card {
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-10px);
        }
        
        .feature-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }
        
        .cta-section {
          padding: 80px 20px;
          text-align: center;
          background-color: #e6f7f5;
        }
        
        .cta-text {
          max-width: 600px;
          margin: 20px auto 40px !important;
          font-size: 1.1rem !important;
        }
        
        .cta-btn {
          background-color: #00a896 !important;
          border-color: #00a896 !important;
          height: 50px !important;
          font-size: 1.1rem !important;
          padding: 0 30px !important;
        }
        
        .footer {
          background-color: #333;
          color: white;
          padding: 40px 20px 20px;
        }
        
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .footer-logo-img {
          width: 40px;
          height: auto;
        }
        
        .footer-logo-text {
          font-size: 1.5rem;
          font-weight: bold;
        }
        
        .footer-links {
          display: flex;
          gap: 20px;
        }
        
        .footer-links a {
          color: white;
          text-decoration: none;
        }
        
        .footer-links a:hover {
          text-decoration: underline;
        }
        
        .footer-copyright {
          text-align: center;
          margin-top: 40px;
          color: #aaa;
          font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
          .title {
            font-size: 3rem !important;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .footer-content {
            flex-direction: column;
            text-align: center;
          }
          
          .footer-links {
            margin-top: 20px;
          }
        }
      `}</style>
    </div>
  )
}

export default HomePage
