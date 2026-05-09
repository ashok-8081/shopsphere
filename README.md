# ShopSphere — Full Stack E-Commerce Platform

A production-ready e-commerce application built with the MERN stack featuring real-time notifications, secure payments, and a complete admin dashboard.

## 🌐 Live Demo

- **Frontend:** https://shopsphere-frontend-puce.vercel.app
- **Backend API:** https://shopsphere-backend-ljzg.onrender.com

## ✨ Features

### Customer Features
- Browse and search products
- Product detail pages with stock management
- Shopping cart with quantity controls
- Secure checkout with Razorpay payment gateway
- Order history and order tracking
- Real-time delivery notifications via Socket.io

### Admin Features
- Admin dashboard with analytics
- Revenue, orders, and product statistics
- Manage all orders and mark as delivered
- Add, edit, and delete products
- Real-time notification push to users

### Authentication
- JWT-based authentication with refresh logic
- Google OAuth 2.0 integration ready
- Protected routes on both frontend and backend
- Role-based access control (Admin / User)

## 🛠️ Tech Stack

### Frontend
- React 19 + Vite
- Redux Toolkit (global state)
- React Router v7 (nested routing)
- Tailwind CSS (utility-first styling)
- Axios (API calls)
- Socket.io Client (real-time)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Socket.io (WebSockets)
- Razorpay Payment Gateway
- bcryptjs (password hashing)

### DevOps
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

## 📁 Project Structure

```
shopsphere/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   │   └── admin/      # Admin pages
│   │   ├── redux/          # Redux store and slices
│   │   ├── hooks/          # Custom hooks
│   │   └── utils/          # Axios instance, socket
└── server/                 # Express backend
    ├── controllers/        # Business logic
    ├── models/             # Mongoose schemas
    ├── routes/             # API routes
    ├── middleware/         # Auth middleware
    └── config/             # Database config
```

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Razorpay account (test mode)

### Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/shopsphere.git
cd shopsphere
```

### Setup Backend
```bash
cd server
npm install
```

Create `server/.env`:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

```bash
npm run dev
```

### Setup Frontend
```bash
cd client
npm install
```

Create `client/.env`:
```
VITE_RAZORPAY_KEY_ID=your_razorpay_key
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

## 🔑 Test Credentials

```
Email: rahul@gmail.com
Password: 123456
```

For admin access — set `isAdmin: true` in MongoDB for your user.

### Test Payment
```
Card: 4111 1111 1111 1111
Expiry: 12/26
CVV: 123
OTP: 1234
```

## 📸 Screenshots

> Add screenshots here after deployment

## 🤝 Connect

Built by **Ashok Kumar Dubey**

- GitHub: your_github_profile
- LinkedIn: your_linkedin_profile

## 📝 License

MIT License