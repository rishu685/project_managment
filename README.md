# Project Camp Backend 🏕️

A comprehensive RESTful API for collaborative project management built with Node.js, Express.js, and MongoDB. This backend service enables teams to organize projects, manage tasks with subtasks, maintain project notes, and handle user authentication with role-based access control.

## 🚀 Features

### 🔐 Authentication & Authorization
- **User Registration** with email verification
- **Secure Login** with JWT tokens
- **Password Management** (change, forgot/reset password)
- **Token Refresh** mechanism
- **Role-Based Access Control** (Admin, Project Admin, Member)

### 📋 Project Management
- **Create & Manage Projects** with descriptions
- **Team Member Management** with role assignment
- **Project Access Control** based on user roles
- **Project Statistics** with member counts

### ✅ Task Management
- **Hierarchical Task Structure** (Tasks → Subtasks)
- **Task Assignment** to team members
- **Status Tracking** (Todo, In Progress, Done)
- **File Attachments** support for tasks
- **Role-based Task Permissions**

### 📝 Project Notes
- **Create & Manage Notes** for projects
- **Admin-only Note Management** for important information
- **Project Documentation** capabilities

### 🔧 System Features
- **Health Check** endpoint for monitoring
- **File Upload** support with Multer
- **Email Notifications** for verification and password reset
- **Input Validation** on all endpoints
- **CORS Configuration** for cross-origin requests

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **File Upload:** Multer
- **Email Service:** Nodemailer with Mailgen
- **Validation:** Express Validator
- **Development:** Nodemon

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/project-management.git
   cd project-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/projectcamp
   JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
   JWT_ACCESS_TOKEN_EXPIRY=1d
   JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret
   JWT_REFRESH_TOKEN_EXPIRY=10d
   
   # Email Configuration
   MAILTRAP_SMTP_HOST=smtp.mailtrap.io
   MAILTRAP_SMTP_PORT=2525
   MAILTRAP_SMTP_USER=your_mailtrap_user
   MAILTRAP_SMTP_PASS=your_mailtrap_password
   
   # Frontend URL (for email links)
   CLIENT_SSR_BASE_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   Or for production:
   ```bash
   npm start
   ```

## 🗂️ Project Structure

```
project-management/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── index.js              # Server entry point
│   ├── controllers/          # Request handlers
│   │   ├── auth.controllers.js
│   │   ├── project.controllers.js
│   │   ├── task.controllers.js
│   │   └── healthcheck.controllers.js
│   ├── models/               # Database schemas
│   │   ├── user.models.js
│   │   ├── project.models.js
│   │   ├── task.models.js
│   │   ├── subtask.models.js
│   │   ├── note.models.js
│   │   └── projectmember.models.js
│   ├── routes/               # API routes
│   │   ├── auth.routes.js
│   │   ├── project.routes.js
│   │   └── healthcheck.routes.js
│   ├── middlewares/          # Custom middleware
│   │   ├── auth.middleware.js
│   │   ├── multer.middleware.js
│   │   └── validator.middleware.js
│   ├── utils/                # Utility functions
│   │   ├── api-error.js
│   │   ├── api-response.js
│   │   ├── async-handler.js
│   │   ├── constants.js
│   │   └── mail.js
│   ├── validators/           # Input validation schemas
│   └── db/                   # Database connection
├── public/                   # Static files
│   └── images/              # Uploaded files
├── package.json
├── PRD.md                   # Product Requirements Document
└── README.md
```

## 🔌 API Endpoints

### Authentication Routes (`/api/v1/auth/`)
- `POST /register` - User registration
- `POST /login` - User authentication
- `POST /logout` - User logout (secured)
- `GET /current-user` - Get current user info (secured)
- `POST /change-password` - Change user password (secured)
- `POST /refresh-token` - Refresh access token
- `GET /verify-email/:verificationToken` - Email verification
- `POST /forgot-password` - Request password reset
- `POST /reset-password/:resetToken` - Reset forgotten password
- `POST /resend-email-verification` - Resend verification email (secured)

### Project Routes (`/api/v1/projects/`)
- `GET /` - List user projects (secured)
- `POST /` - Create project (secured)
- `GET /:projectId` - Get project details (secured, role-based)
- `PUT /:projectId` - Update project (secured, Admin only)
- `DELETE /:projectId` - Delete project (secured, Admin only)
- `GET /:projectId/members` - List project members (secured)
- `POST /:projectId/members` - Add project member (secured, Admin only)
- `PUT /:projectId/members/:userId` - Update member role (secured, Admin only)
- `DELETE /:projectId/members/:userId` - Remove member (secured, Admin only)

### Task Routes (`/api/v1/tasks/`)
- `GET /:projectId` - List project tasks (secured, role-based)
- `POST /:projectId` - Create task (secured, Admin/Project Admin)
- `GET /:projectId/t/:taskId` - Get task details (secured, role-based)
- `PUT /:projectId/t/:taskId` - Update task (secured, Admin/Project Admin)
- `DELETE /:projectId/t/:taskId` - Delete task (secured, Admin/Project Admin)
- `POST /:projectId/t/:taskId/subtasks` - Create subtask (secured, Admin/Project Admin)
- `PUT /:projectId/st/:subTaskId` - Update subtask (secured, role-based)
- `DELETE /:projectId/st/:subTaskId` - Delete subtask (secured, Admin/Project Admin)

### Note Routes (`/api/v1/notes/`)
- `GET /:projectId` - List project notes (secured, role-based)
- `POST /:projectId` - Create note (secured, Admin only)
- `GET /:projectId/n/:noteId` - Get note details (secured, role-based)
- `PUT /:projectId/n/:noteId` - Update note (secured, Admin only)
- `DELETE /:projectId/n/:noteId` - Delete note (secured, Admin only)

### Health Check (`/api/v1/healthcheck/`)
- `GET /` - System health status

## 👥 User Roles & Permissions

| Feature                    | Admin | Project Admin | Member |
| -------------------------- | ----- | ------------- | ------ |
| Create Project             | ✓     | ✗             | ✗      |
| Update/Delete Project      | ✓     | ✗             | ✗      |
| Manage Project Members     | ✓     | ✗             | ✗      |
| Create/Update/Delete Tasks | ✓     | ✓             | ✗      |
| View Tasks                 | ✓     | ✓             | ✓      |
| Update Subtask Status      | ✓     | ✓             | ✓      |
| Create/Delete Subtasks     | ✓     | ✓             | ✗      |
| Create/Update/Delete Notes | ✓     | ✗             | ✗      |
| View Notes                 | ✓     | ✓             | ✓      |

## 🔒 Security Features

- **JWT Authentication** with access and refresh tokens
- **Role-based Authorization** middleware
- **Input Validation** using Express Validator
- **Password Hashing** with bcrypt
- **Email Verification** for account security
- **Secure File Upload** handling
- **CORS Protection** for cross-origin requests

## 🧪 API Testing

You can test the API endpoints using tools like:
- **Postman** - Import the API collection
- **Thunder Client** (VS Code extension)
- **curl** commands
- **Insomnia**

Example health check:
```bash
curl http://localhost:3000/api/v1/healthcheck
```

## 📚 Documentation

For detailed API documentation and business requirements, see:
- [Product Requirements Document (PRD.md)](./PRD.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## 🏗️ Development Status

This project is actively being developed. Current features include:
- ✅ User authentication and authorization
- ✅ Project management with role-based access
- ✅ Task and subtask management
- ✅ File upload capabilities
- ✅ Email notifications
- ✅ Project notes system

## 🐛 Known Issues

- File cleanup for deleted tasks needs implementation
- Rate limiting not yet implemented
- Advanced search functionality pending

## 🔮 Future Enhancements

- [ ] Real-time notifications with WebSocket
- [ ] Advanced search and filtering
- [ ] Task due dates and reminders
- [ ] Time tracking for tasks
- [ ] Project templates
- [ ] Activity logs and audit trails
- [ ] Mobile app API extensions
- [ ] Integration with third-party services

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the [PRD.md](./PRD.md) for detailed specifications
- Review the API endpoints documentation above

---

**Built with ❤️ for efficient project management**
