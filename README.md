# Student Attendance Dashboard - Frontend

A modern, responsive Student Attendance Dashboard built with React.js, Redux Toolkit, Tailwind CSS, and Recharts. This frontend application provides teachers with an intuitive interface to manage student attendance and view detailed analytics.

## 🚀 Features

- **Authentication System**: Secure login with demo credentials
- **Student Management**: View and manage student lists with attendance toggles
- **Real-time Attendance**: Mark attendance with intuitive toggle switches
- **Analytics Dashboard**: Comprehensive charts and statistics using Recharts
- **Responsive Design**: Mobile-first design that works on all devices
- **State Management**: Redux Toolkit for efficient state management
- **Reusable Components**: Modular UI components for consistency

## 🛠️ Tech Stack

- **Frontend**: React.js 18 with Hooks
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd student-attendance-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔐 Demo Credentials

For testing purposes, use these credentials:
- **Email**: `teacher@school.com`
- **Password**: `password123`

## 📱 Pages & Features

### 1. Login Page (`/login`)
- Clean, modern login interface
- Form validation and error handling
- Demo credentials display
- Responsive design

### 2. Dashboard (`/`)
- Welcome message with teacher name
- Quick stats overview
- Quick action buttons
- Recent activity feed
- Responsive grid layout

### 3. Student List (`/students`)
- Complete student list
- Individual attendance toggles
- Real-time attendance counter
- Submit attendance functionality
- Responsive table design

### 4. Attendance Summary (`/summary`)
- Interactive charts (Pie, Bar, Line)
- Multiple time period views (Today, Week, Month)
- Detailed statistics cards
- Attendance percentage calculations
- Export-ready data visualization

## 🎨 UI Components

The application includes reusable UI components:

- **Button**: Multiple variants (primary, secondary, success, danger, outline)
- **Input**: Form inputs with validation states
- **Card**: Content containers with optional titles
- **ToggleButton**: Custom attendance toggle switches
- **Alert**: Success, error, warning, and info messages
- **LoadingSpinner**: Loading states with different sizes

## 🎯 Key Features

### Authentication
- Protected routes
- Automatic redirect after login
- Secure logout functionality

### State Management
- Redux Toolkit slices for:
  - Authentication state
  - Student data management
  - Attendance tracking
- Error handling and loading states

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes

## 🚀 Getting Started

1. **Start the application**
   ```bash
   npm run dev
   ```

2. **Login with demo credentials**
   - Email: `teacher@school.com`
   - Password: `password123`

3. **Explore the features**
   - Navigate through different pages
   - Mark attendance for students
   - View analytics and charts
   - Test responsive design on different screen sizes

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Future Enhancements

- Backend API integration
- Real-time data synchronization
- Advanced filtering and search
- Export functionality
- Multi-class support
- Student profile management
- Attendance history tracking
- Push notifications

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request