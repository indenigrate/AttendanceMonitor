import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { timetableAPI, attendanceAPI } from '../services/api';
import timetableData from '../data/timetableSlots.json';
import Timetable from './Timetable';
import AttendanceStats from './AttendanceStats';

const Dashboard = ({ token }) => {
  const [timetable, setTimetable] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentDate] = useState(new Date());

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [timetableResponse, statsResponse] = await Promise.all([
        timetableAPI.getWeeklyTimetable(),
        attendanceAPI.getAttendanceStats()
      ]);
      
      setTimetable(timetableResponse.timetable || []);
      setAttendanceStats(statsResponse.attendance || []);
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceToggle = async (attended, missed) => {
    try {
      await attendanceAPI.markAttendance(attended, missed);
      // Refresh data after marking attendance
      fetchData();
    } catch (err) {
      setError('Failed to update attendance. Please try again.');
      console.error('Error updating attendance:', err);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <div className="loading">
            Loading your attendance data...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">📊 Attendance Dashboard</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginTop: '5px', fontSize: '16px' }}>
            {format(currentDate, 'EEEE, MMMM do, yyyy')}
          </p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={fetchData}
          disabled={loading}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            fontSize: '14px',
            padding: '12px 20px'
          }}
        >
          {loading ? (
            <>
              <span>Refreshing...</span>
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
            </>
          ) : (
            <>
              <span>🔄</span>
              <span>Refresh Data</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{error}</span>
            <button 
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'inherit',
                fontSize: '18px',
                cursor: 'pointer',
                padding: '0',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setError('')}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <Timetable 
        timetable={timetable}
        timetableData={timetableData}
        currentDate={currentDate}
        onAttendanceToggle={handleAttendanceToggle}
      />

      <AttendanceStats stats={attendanceStats} />
    </div>
  );
};

export default Dashboard; 