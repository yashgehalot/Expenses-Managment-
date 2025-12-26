# Expense Management App

A full-stack expense tracking application with user authentication and product catalog integration.

## 🚀 Features

- **User Authentication**: Register and login functionality
- **Expense Management**: Add, view, and delete expenses
- **Product Catalog**: Browse grocery items and add them to expenses
- **Responsive Design**: Modern UI with Bootstrap styling
- **Cloud Database**: MongoDB Atlas integration
- **Real-time Updates**: Instant UI updates for all operations

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **React Router** - Client-side routing
- **Bootstrap 5** - Responsive UI components
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
expense-management-app/
├── Frontend 1/           # React frontend
│   ├── src/
│   │   ├── Components/   # React components
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # App entry point
│   ├── package.json
│   └── vite.config.js
├── Backend1/             # Node.js backend
│   ├── Config/
│   │   └── db.js         # Database connection
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── server.js        # Main server file
│   ├── package.json
│   └── .env             # Environment variables
├── package.json         # Root package.json
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yashgehalot/Expenses-Managment-.git
   cd expense-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install  # Installs both frontend and backend dependencies
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env` in Backend1 folder
   - Add your MongoDB Atlas connection string
   - Set PORT=3000

4. **Start development servers**
   ```bash
   # Start both frontend and backend
   npm run dev

   # Or start separately:
   npm run dev-backend    # Backend on port 3000
   npm run dev-frontend   # Frontend on port 5173
   ```

## 🚀 Deployment

### Render.com Deployment

1. **Connect GitHub Repository**
   - Link your GitHub repo to Render
   - Set build command: `npm run build`
   - Set start command: `npm start`

2. **Environment Variables**
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `PORT`: 10000 (Render's default)
   - `JWT_SECRET`: Random secret string

3. **Deploy**
   - Push changes to main branch
   - Render will auto-deploy

## 📱 Usage

1. **Register/Login**: Create account or sign in
2. **Browse Products**: Check out grocery items in "New Product" section
3. **Add Expenses**: Use "Add Item" to track expenses manually
4. **Quick Add**: Click "Add to Expense" on products to auto-fill expense form
5. **Manage Expenses**: View and delete expenses in the list

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation
- Secure API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Yash Gehlot**
- GitHub: [@yashgehalot](https://github.com/yashgehalot)

---

⭐ Star this repo if you found it helpful!
