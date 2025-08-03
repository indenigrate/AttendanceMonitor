import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (username, password) => {
    try {
      console.log('Attempting login for:', username);
      const response = await api.post('/login', { username, password });
      console.log('Login successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  signup: async (username, password) => {
    try {
      console.log('Attempting signup for:', username);
      const response = await api.post('/signup', { username, password });
      console.log('Signup successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      throw error;
    }
  },

  addSubject: async (subjectCode, slot) => {
    try {
      console.log('Adding subject:', subjectCode, 'to slot:', slot);
      const response = await api.post('/add-subject', { 
        subject_code: subjectCode, 
        slot: slot 
      });
      console.log('Subject added successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Add subject error:', error.response?.data || error.message);
      throw error;
    }
  },
};

export const timetableAPI = {
  getWeeklyTimetable: async () => {
    const response = await api.get('/get-weekly-timetable');
    return response.data;
  },
};

export const attendanceAPI = {
  getAttendanceStats: async () => {
    const response = await api.get('/get-attendance-stats');
    return response.data;
  },

  markAttendance: async (subjectCode, slot, date, attended) => {
    // The backend expects arrays of attended and missed subject codes
    // We'll need to track all changes and send them together
    // For now, we'll send a single subject code in the appropriate array
    const requestBody = {
      attended: attended ? [subjectCode] : [],
      missed: attended ? [] : [subjectCode]
    };
    
    const response = await api.post('/mark-attendance', requestBody);
    return response.data;
  },
};

export default api; 