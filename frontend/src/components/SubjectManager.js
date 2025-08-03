import React, { useState } from 'react';
import { authAPI } from '../services/api';
import timetableData from '../data/timetableSlots.json';

const SubjectManager = () => {
  const [subjectCode, setSubjectCode] = useState('');
  const [selectedSlots, setSelectedSlots] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSlotToggle = (slot) => {
    setSelectedSlots(prev => {
      const newSet = new Set(prev);
      if (newSet.has(slot)) {
        newSet.delete(slot);
      } else {
        newSet.add(slot);
      }
      return newSet;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!subjectCode.trim()) {
      setError('Please enter a subject code');
      return;
    }

    if (selectedSlots.size === 0) {
      setError('Please select at least one time slot');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Add subject for each selected slot
      for (const slot of selectedSlots) {
        await authAPI.addSubject(subjectCode, slot);
      }
      
      setSuccess(`Subject "${subjectCode}" added successfully with ${selectedSlots.size} time slot(s)!`);
      setSubjectCode('');
      setSelectedSlots(new Set());
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add subject. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubjectCode('');
    setSelectedSlots(new Set());
    setError('');
    setSuccess('');
  };

  return (
    <div className="container">
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: 'white', fontSize: '28px', fontWeight: '700', marginBottom: '10px' }}>
            📚 Add New Subject
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px' }}>
            Create a new subject and assign time slots
          </p>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="subjectCode">Subject Code</label>
            <input
              type="text"
              id="subjectCode"
              className="form-control"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value.toUpperCase())}
              placeholder="e.g., MATH101, CS201"
              required
            />
          </div>

          <div className="form-group">
            <label>Select Time Slots</label>
            <div style={{ 
              marginTop: '10px',
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                gap: '10px',
                maxHeight: '300px',
                overflowY: 'auto'
              }}>
                {timetableData.slotCodes.map((slot) => (
                  <label
                    key={slot}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px',
                      background: selectedSlots.has(slot) 
                        ? 'rgba(76, 175, 80, 0.2)' 
                        : 'rgba(255, 255, 255, 0.05)',
                      border: selectedSlots.has(slot)
                        ? '2px solid rgba(76, 175, 80, 0.5)'
                        : '2px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                    onMouseEnter={(e) => {
                      if (!selectedSlots.has(slot)) {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!selectedSlots.has(slot)) {
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSlots.has(slot)}
                      onChange={() => handleSlotToggle(slot)}
                      style={{ display: 'none' }}
                    />
                    <span style={{ 
                      width: '16px', 
                      height: '16px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '3px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: selectedSlots.has(slot) ? '#4CAF50' : 'transparent',
                      transition: 'all 0.3s ease'
                    }}>
                      {selectedSlots.has(slot) && (
                        <span style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>✓</span>
                      )}
                    </span>
                    {slot}
                  </label>
                ))}
              </div>
              
              <div style={{ 
                marginTop: '15px',
                padding: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.7)'
              }}>
                <strong>Selected:</strong> {selectedSlots.size} slot{selectedSlots.size !== 1 ? 's' : ''}
                {selectedSlots.size > 0 && (
                  <span style={{ marginLeft: '10px' }}>
                    ({Array.from(selectedSlots).join(', ')})
                  </span>
                )}
              </div>
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '15px', 
            marginTop: '30px',
            justifyContent: 'center'
          }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <span>Adding subject...</span>
                </div>
              ) : (
                'Add Subject'
              )}
            </button>
          </div>
        </form>

        <div style={{ 
          marginTop: '30px',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h4 style={{ color: 'white', marginBottom: '10px' }}>💡 How to use:</h4>
          <ul style={{ 
            color: 'rgba(255, 255, 255, 0.8)', 
            fontSize: '14px',
            lineHeight: '1.6',
            paddingLeft: '20px'
          }}>
            <li>Enter a unique subject code (e.g., MATH101, CS201)</li>
            <li>Select the time slots when this subject occurs</li>
            <li>Each slot represents a specific day and time</li>
            <li>You can select multiple slots for the same subject</li>
            <li>Click "Add Subject" to save your configuration</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubjectManager; 