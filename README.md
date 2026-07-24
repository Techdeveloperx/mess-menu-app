# 🍽️ LPU Mess Menu App

A web-based mess management system developed using **React.js**, **Flask**, and **PostgreSQL**. This application allows students to view the mess menu, rate food, and helps management analyze feedback.

---

## 📌 Features

- 🍳 View Today's Mess Menu
- 📅 View Weekly Menu
- ⭐ Rate Food
- 🏆 Top Rated Dishes
- 📉 Lowest Rated Dishes
- 🔍 Search Student Ratings
- 📊 Dashboard Statistics
- 📈 Rating Chart
- 🌙 Dark / Light Mode
- 📥 Download Ratings Report (CSV)

---

## 🛠️ Technologies Used

### Frontend
- React.js
- HTML
- CSS
- JavaScript
- Chart.js

### Backend
- Python
- Flask
- Flask-CORS

### Database
- PostgreSQL

---

## 📂 Project Structure

```
LPU-Mess-Menu/
│
├── mess-menu-frontend/
│   ├── src/
│   ├── components/
│   ├── App.jsx
│   └── App.css
│
├── backend/
│   ├── api.py
│   ├── db.py
│   └── database.sql
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/Techdeveloperx/mess-menu-app.git
```

### Frontend

```bash
cd mess-menu-frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install flask flask-cors psycopg2
python api.py
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Today's Menu |
| GET | `/menu/<day>` | Weekly Menu |
| POST | `/rate` | Submit Food Rating |
| GET | `/top-dishes` | Top Rated Dishes |
| GET | `/bottom-dishes` | Lowest Rated Dishes |
| GET | `/stats` | Dashboard Statistics |
| GET | `/student/<regno>` | Search Student Ratings |

---

## 💾 Database Tables

### Menu
- id
- day
- meal_type
- dish

### Ratings
- id
- student_name
- registration_number
- dish_name
- rating

---

## 🎯 Future Enhancements

- Student Login System
- QR Code Integration
- Push Notifications
- Mobile Application
- Food Images
- Admin Dashboard

---

## 👩‍💻 Developer

**Manisha**

---

## 📄 License

This project is created for educational purposes.