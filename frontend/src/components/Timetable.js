import React, { useState } from 'react';
import { format, startOfWeek, addDays, isToday } from 'date-fns';

const Timetable = ({ timetable, timetableData, currentDate, onAttendanceToggle }) => {
  const [selectedSlots, setSelectedSlots] = useState(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // Generate week dates
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday start
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Create a map of timetable entries for easy lookup
  const timetableMap = {};
  timetable.forEach(entry => {
    // Trim whitespace from slot to handle database whitespace issue
    const cleanSlot = entry.slot.trim();
    if (!timetableMap[cleanSlot]) {
      timetableMap[cleanSlot] = [];
    }
    timetableMap[cleanSlot].push(entry.subject_code);
  });

  // Get slot codes for each day
  const getDaySlots = (dayIndex) => {
    const dayName = format(weekDays[dayIndex], 'EEEE');
    return timetableData.daySlotMapping[dayName] || [];
  };

  const handleSlotClick = (subjectCode, slot, dayIndex) => {
    const day = weekDays[dayIndex];
    const key = `${subjectCode}-${slot}-${format(day, 'yyyy-MM-dd')}`;
    
    setSelectedSlots(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const handleConfirmSelection = () => {
    const attended = [];
    const missed = [];
    
    selectedSlots.forEach(key => {
      const [subjectCode, slot, date] = key.split('-');
      attended.push(subjectCode);
    });

    if (attended.length > 0) {
      onAttendanceToggle(attended, missed);
      setSelectedSlots(new Set());
      setIsSelectionMode(false);
    }
  };

  const handleCancelSelection = () => {
    setSelectedSlots(new Set());
    setIsSelectionMode(false);
  };

  const isCurrentDay = (dayIndex) => {
    return isToday(weekDays[dayIndex]);
  };

  const getAttendanceKey = (subjectCode, slot, dayIndex) => {
    const day = weekDays[dayIndex];
    return `${subjectCode}-${slot}-${format(day, 'yyyy-MM-dd')}`;
  };

  const isSlotSelected = (subjectCode, slot, dayIndex) => {
    const key = getAttendanceKey(subjectCode, slot, dayIndex);
    return selectedSlots.has(key);
  };

  return (
    <div className="timetable-container">
      <div className="timetable-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Weekly Timetable</span>
          {isCurrentDay(0) || isCurrentDay(1) || isCurrentDay(2) || isCurrentDay(3) || isCurrentDay(4) || isCurrentDay(5) || isCurrentDay(6) ? (
            <button 
              className={`btn ${isSelectionMode ? 'btn-danger' : 'btn-success'}`}
              onClick={() => setIsSelectionMode(!isSelectionMode)}
              style={{ fontSize: '14px', padding: '8px 16px' }}
            >
              {isSelectionMode ? 'Cancel Selection' : 'Mark Attendance'}
            </button>
          ) : null}
        </div>
      </div>
      
      <div className="timetable-grid">
        {/* Header row with days */}
        <div className="timetable-cell header">Time</div>
        {weekDays.map((day, index) => (
          <div 
            key={index} 
            className={`timetable-cell header ${isCurrentDay(index) ? 'current-day' : ''}`}
            style={isCurrentDay(index) ? { backgroundColor: 'rgba(102, 126, 234, 0.3)' } : {}}
          >
            <div>{format(day, 'EEE')}</div>
            <div style={{ fontSize: '10px', marginTop: '2px' }}>
              {format(day, 'MMM d')}
            </div>
          </div>
        ))}

        {/* Time slots */}
        {timetableData.timeSlots.map((timeSlot, timeIndex) => (
          <React.Fragment key={timeSlot.slot}>
            {/* Time column */}
            <div className="timetable-cell time">
              {timeSlot.time}
            </div>
            
            {/* Day columns */}
            {weekDays.map((day, dayIndex) => {
              const daySlots = getDaySlots(dayIndex);
              const currentSlot = daySlots[timeIndex];
              const subjects = timetableMap[currentSlot] || [];
              const isToday = isCurrentDay(dayIndex);
              
              return (
                <div 
                  key={dayIndex} 
                  className={`timetable-cell ${isToday ? 'current-day' : ''}`}
                  style={isToday ? { backgroundColor: 'rgba(102, 126, 234, 0.1)' } : {}}
                >
                  {subjects.map((subjectCode, subjectIndex) => {
                    const isSelected = isSlotSelected(subjectCode, currentSlot, dayIndex);
                    const canSelect = isToday && isSelectionMode;
                    
                    return (
                      <div 
                        key={subjectIndex} 
                        style={{ 
                          marginBottom: '5px',
                          cursor: canSelect ? 'pointer' : 'default',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => {
                          if (canSelect) {
                            handleSlotClick(subjectCode, currentSlot, dayIndex);
                          }
                        }}
                      >
                        <div 
                          className={`subject-code ${isSelected ? 'selected' : ''}`}
                          style={{
                            padding: '8px',
                            borderRadius: '8px',
                            background: isSelected ? 'rgba(76, 175, 80, 0.3)' : 'transparent',
                            border: isSelected ? '2px solid rgba(76, 175, 80, 0.5)' : '2px solid transparent',
                            transition: 'all 0.3s ease',
                            transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: isSelected ? '0 4px 15px rgba(76, 175, 80, 0.3)' : 'none'
                          }}
                        >
                          {subjectCode}
                          {isSelected && (
                            <span style={{ 
                              marginLeft: '8px', 
                              fontSize: '12px',
                              color: '#4CAF50',
                              fontWeight: 'bold'
                            }}>
                              ✓
                            </span>
                          )}
                        </div>
                        {isToday && !isSelectionMode && (
                          <div style={{ 
                            fontSize: '11px', 
                            color: 'rgba(255, 255, 255, 0.7)',
                            marginTop: '4px'
                          }}>
                            Click "Mark Attendance" to select
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {subjects.length === 0 && (
                    <div style={{ 
                      color: 'rgba(255, 255, 255, 0.4)', 
                      fontSize: '10px',
                      fontStyle: 'italic'
                    }}>
                      No class
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      
      {/* Selection Controls */}
      {isSelectionMode && selectedSlots.size > 0 && (
        <div style={{ 
          padding: '20px 30px', 
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          borderTop: '1px solid rgba(76, 175, 80, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ color: 'white', fontSize: '14px' }}>
            <strong>{selectedSlots.size}</strong> class{selectedSlots.size !== 1 ? 'es' : ''} selected
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="btn btn-secondary"
              onClick={handleCancelSelection}
              style={{ fontSize: '14px', padding: '8px 16px' }}
            >
              Cancel
            </button>
            <button 
              className="btn btn-success"
              onClick={handleConfirmSelection}
              style={{ fontSize: '14px', padding: '8px 16px' }}
            >
              Mark as Present ({selectedSlots.size})
            </button>
          </div>
        </div>
      )}
      
      <div style={{ 
        padding: '15px 20px', 
        backgroundColor: 'rgba(255, 255, 255, 0.05)', 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.7)'
      }}>
        💡 Tip: Click "Mark Attendance" to select multiple classes, then confirm your selection. You can only mark attendance for today's classes.
      </div>
    </div>
  );
};

export default Timetable; 