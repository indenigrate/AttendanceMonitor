import React from 'react';

const AttendanceStats = ({ stats }) => {
  if (!stats || stats.length === 0) {
    return (
      <div className="attendance-stats">
        <div className="stat-card">
          <div className="stat-title">No Subjects Found</div>
          <div className="stat-value" style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.6)' }}>
            Add subjects to see your attendance statistics
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="attendance-stats">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-title">
            📚 {stat.subject_code}
          </div>
          <div className="stat-value">
            {stat.attended_classes}/{stat.total_classes}
          </div>
          <div className="stat-percentage">
            {stat.percentage}% attendance
          </div>
          <div style={{ 
            marginTop: '10px',
            height: '6px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              background: `linear-gradient(90deg, ${
                stat.percentage >= 80 ? '#4CAF50' : 
                stat.percentage >= 60 ? '#FF9800' : '#f44336'
              } 0%, ${
                stat.percentage >= 80 ? '#45a049' : 
                stat.percentage >= 60 ? '#F57C00' : '#d32f2f'
              } 100%)`,
              width: `${stat.percentage}%`,
              transition: 'width 0.8s ease',
              borderRadius: '3px'
            }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceStats; 