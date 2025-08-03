# Attendance Monitor Frontend

A modern React-based frontend for the Attendance Monitor system that allows users to view their timetable, mark attendance, and track their attendance statistics.

## Features

- **User Authentication**: Login and signup functionality with JWT token management
- **Weekly Timetable View**: Interactive timetable showing classes for the entire week
- **Attendance Tracking**: Checkboxes to mark attendance for today's classes
- **Attendance Statistics**: Visual representation of attendance percentages with progress bars
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Real-time Updates**: Automatic data refresh after marking attendance

## Time Slots

The system uses 70 unique slot codes (7 days × 10 classes per day) from 8 AM to 6 PM:

### Monday (A1-A10)
- **A1**: 08:00-09:00
- **A2**: 09:00-10:00
- **A3**: 10:00-11:00
- **A4**: 11:00-12:00
- **A5**: 12:00-13:00
- **A6**: 13:00-14:00
- **A7**: 14:00-15:00
- **A8**: 15:00-16:00
- **A9**: 16:00-17:00
- **A10**: 17:00-18:00

### Tuesday (B1-B10)
- **B1**: 08:00-09:00
- **B2**: 09:00-10:00
- **B3**: 10:00-11:00
- **B4**: 11:00-12:00
- **B5**: 12:00-13:00
- **B6**: 13:00-14:00
- **B7**: 14:00-15:00
- **B8**: 15:00-16:00
- **B9**: 16:00-17:00
- **B10**: 17:00-18:00

### Wednesday (C1-C10)
- **C1**: 08:00-09:00
- **C2**: 09:00-10:00
- **C3**: 10:00-11:00
- **C4**: 11:00-12:00
- **C5**: 12:00-13:00
- **C6**: 13:00-14:00
- **C7**: 14:00-15:00
- **C8**: 15:00-16:00
- **C9**: 16:00-17:00
- **C10**: 17:00-18:00

### Thursday (D1-D10)
- **D1**: 08:00-09:00
- **D2**: 09:00-10:00
- **D3**: 10:00-11:00
- **D4**: 11:00-12:00
- **D5**: 12:00-13:00
- **D6**: 13:00-14:00
- **D7**: 14:00-15:00
- **D8**: 15:00-16:00
- **D9**: 16:00-17:00
- **D10**: 17:00-18:00

### Friday (E1-E10)
- **E1**: 08:00-09:00
- **E2**: 09:00-10:00
- **E3**: 10:00-11:00
- **E4**: 11:00-12:00
- **E5**: 12:00-13:00
- **E6**: 13:00-14:00
- **E7**: 14:00-15:00
- **E8**: 15:00-16:00
- **E9**: 16:00-17:00
- **E10**: 17:00-18:00

### Saturday (F1-F10)
- **F1**: 08:00-09:00
- **F2**: 09:00-10:00
- **F3**: 10:00-11:00
- **F4**: 11:00-12:00
- **F5**: 12:00-13:00
- **F6**: 13:00-14:00
- **F7**: 14:00-15:00
- **F8**: 15:00-16:00
- **F9**: 16:00-17:00
- **F10**: 17:00-18:00

### Sunday (G1-G10)
- **G1**: 08:00-09:00
- **G2**: 09:00-10:00
- **G3**: 10:00-11:00
- **G4**: 11:00-12:00
- **G5**: 12:00-13:00
- **G6**: 13:00-14:00
- **G7**: 14:00-15:00
- **G8**: 15:00-16:00
- **G9**: 16:00-17:00
- **G10**: 17:00-18:00

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will open at `http://localhost:3000`

## Configuration

The frontend is configured to connect to the backend API at `http://localhost:8080/api` by default. You can change this by setting the `REACT_APP_API_URL` environment variable.

## Usage

### Authentication
1. Create a new account using the signup form
2. Login with your credentials
3. The JWT token will be automatically stored and used for API requests

### Timetable View
- The timetable shows the current week starting from Monday
- Today's date is highlighted in blue
- Subject codes are displayed in each time slot
- Empty slots show "No class"

### Marking Attendance
- Only today's classes show attendance checkboxes
- Check the box to mark yourself as present
- Uncheck to mark as absent
- Changes are automatically saved to the backend

### Attendance Statistics
- Overall attendance percentage is shown at the top
- Individual subject statistics are displayed below
- Color-coded progress bars:
  - Green: ≥80% attendance
  - Yellow: 60-79% attendance
  - Red: <60% attendance

## API Endpoints Used

- `POST /api/login` - User authentication
- `POST /api/signup` - User registration
- `GET /api/get-weekly-timetable` - Fetch user's timetable
- `GET /api/get-attendance-stats` - Fetch attendance statistics
- `POST /api/mark-attendance` - Mark attendance for a class

## Technologies Used

- **React 18** - Frontend framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **date-fns** - Date manipulation utilities
- **CSS3** - Styling with modern CSS features

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── Dashboard.js
│   │   ├── Timetable.js
│   │   ├── AttendanceStats.js
│   │   └── Navbar.js
│   ├── services/
│   │   └── api.js
│   ├── data/
│   │   └── timetableSlots.json
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Environment Variables

- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:8080/api)

## Browser Support

The application supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Attendance Monitor system. 