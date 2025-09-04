## Run locally

### 1) backend
cd backend
cp .env.example .env.local  # then paste real values
npm i
npm run dev                 # runs on http://localhost:3000

# Seed demo data (one-time)
npm run seed:js
npm run test:smoke

### 2) frontend
cd ../frontend
cp .env.example .env.local  # set VITE_BACKEND_URL=http://localhost:3000 and VITE_API_KEY
npm i
npm run dev                 # http://localhost:5173
# Enterprise HRMS Portal

A comprehensive Human Resource Management System with role-based access control, dark theme support, and modern UI/UX.

## Features

### 🔐 Authentication & Authorization
- **Password-protected login** with role-based access
- **Three user roles**: Employee, HR Manager, Admin
- **Protected routes** with automatic redirects
- **Session management** with localStorage persistence

### 🎨 Modern UI/UX
- **Dark/Light theme** with smooth transitions
- **Responsive design** for all devices
- **Animated components** with Framer Motion
- **Tailwind CSS** for consistent styling
- **Custom CSS variables** for theme management

### 📋 Core Modules

#### Leave Management
- Submit leave requests with different types (annual, sick, unpaid, etc.)
- Track request status and approval workflow
- View leave balances and history
- Export data for HR managers

#### Asset Management
- Request company assets (laptops, monitors, etc.)
- Track asset assignments and inventory
- View asset guidelines and policies
- Manage asset lifecycle

#### Policy Center
- Search company policies with AI-powered queries
- Access policy documents and guidelines
- Submit policy-related questions
- View FAQ and support information

#### Onboarding Tasks
- Complete onboarding checklist
- Track task progress and completion
- HR managers can monitor team progress
- Bulk task management for admins

#### Admin Dashboard
- SLA monitoring and escalation
- System health overview
- User management
- Analytics and reporting

### 🔧 Technical Stack

**Frontend:**
- React 18 with Vite
- React Router for navigation
- Context API for state management
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons

**Backend:**
- Node.js with Express
- Supabase for database
- API key authentication
- SLA monitoring system

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd hrms-mvp
```

2. **Install dependencies**
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. **Environment Setup**

Create `frontend/.env.local`:
```env
VITE_BACKEND_URL=https://5cd15fbc-dd1c-4346-bf1b-5ab4b0c2432c-00-3ddii694nkbdz.sisko.replit.dev:3000
VITE_API_KEY=23brs1204
VITE_HRIS_BASE_URL=
```

Create `backend/.env`:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
INTERNAL_API_KEY=23brs1204
SLA_INTERVAL_MIN=15
SLA_HOURS=24
SLACK_WEBHOOK_URL=your_slack_webhook
PORT=3000
```

4. **Start the applications**

```bash
# Backend (from backend directory)
npm run dev

# Frontend (from frontend directory)
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Demo Credentials

### Employee Access
- **Email**: employee@company.com
- **Password**: emp123
- **Features**: Leave requests, asset requests, policy search, onboarding tasks

### HR Manager Access
- **Email**: hr@company.com
- **Password**: hr123
- **Features**: All employee features + approval workflows, team management

### Admin Access
- **Email**: admin@company.com
- **Password**: admin123
- **Features**: All features + system administration, SLA monitoring

## API Endpoints

### Authentication
- All API calls require the `x-api-key` header
- Key: `23brs1204`

### Leave Management
- `POST /api/leaves/create` - Create leave request
- `POST /api/leaves/{id}/approve` - Approve leave request

### Asset Management
- `POST /api/assets/request` - Request asset

### Policy Center
- `POST /api/policies/query` - Search policies

### Onboarding
- `GET /api/onboarding/tasks?email={email}` - Get user tasks
- `POST /api/onboarding/create-default` - Create default tasks
- `POST /api/onboarding/complete` - Mark task complete

### Admin
- `POST /admin/run-sla` - Trigger SLA check

## Project Structure

```
hrms-mvp/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # Reusable UI components
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── dashboard/    # Dashboard page
│   │   │   ├── leave-management/
│   │   │   ├── asset-management/
│   │   │   ├── policy-center/
│   │   │   ├── onboarding-tasks/
│   │   │   └── login/
│   │   ├── contexts/        # React contexts
│   │   ├── lib/            # Utilities and API helpers
│   │   ├── hooks/          # Custom hooks
│   │   └── styles/         # CSS files
│   ├── public/
│   └── package.json
├── backend/
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   ├── services/          # Business logic
│   ├── agents/            # Background tasks
│   └── index.js
└── README.md
```

## Development

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use TypeScript-like prop validation
- Consistent naming conventions

### State Management
- Context API for global state (auth, theme)
- Local state for component-specific data
- API calls through centralized helper

### Styling
- Tailwind CSS for utility classes
- CSS variables for theme colors
- Responsive design principles
- Dark mode support

## Deployment

### Frontend
- Build with `npm run build`
- Deploy to any static hosting service
- Environment variables must be set

### Backend
- Deploy to Node.js hosting (Heroku, Railway, etc.)
- Set environment variables
- Ensure database connection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: support@company.com
- Documentation: [Link to docs]
- Issues: [GitHub Issues]
