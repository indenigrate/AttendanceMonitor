import React, { useState, useEffect } from 'react';
import { timetableAPI } from '../services/api';

const DebugTimetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const testTimetable = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await timetableAPI.getWeeklyTimetable();
      console.log('Timetable API result:', result);
      setTimetable(result.timetable || []);
    } catch (err) {
      console.error('Timetable API error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testTimetable();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Debug Timetable</h2>
      
      <button 
        onClick={testTimetable} 
        disabled={loading}
        style={{ marginBottom: '20px', padding: '10px 20px' }}
      >
        {loading ? 'Loading...' : 'Refresh Timetable'}
      </button>

      {error && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          Error: {error}
        </div>
      )}

      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '5px', 
        padding: '15px',
        backgroundColor: '#f9f9f9'
      }}>
        <h3>Timetable Data ({timetable.length} entries):</h3>
        {timetable.length === 0 ? (
          <p style={{ color: '#666' }}>No timetable entries found.</p>
        ) : (
          <div>
            {timetable.map((entry, index) => (
              <div 
                key={index} 
                style={{ 
                  marginBottom: '10px',
                  padding: '8px',
                  backgroundColor: 'white',
                  borderRadius: '3px',
                  border: '1px solid #e9ecef'
                }}
              >
                <strong>Subject:</strong> {entry.subject_code} | 
                <strong>Slot:</strong> "{entry.slot}" | 
                <strong>Slot Length:</strong> {entry.slot.length} characters
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '5px' }}>
        <h4>Expected Slot Values:</h4>
        <ul>
          <li>A2 (2 characters)</li>
          <li>C2 (2 characters)</li>
          <li>B3 (2 characters)</li>
          <li>D3 (2 characters)</li>
        </ul>
        <p>If the slot values have extra spaces, the timetable won't display correctly.</p>
      </div>
    </div>
  );
};

export default DebugTimetable; 