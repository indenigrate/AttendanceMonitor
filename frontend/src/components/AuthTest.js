import React, { useState, useEffect } from 'react';
import { timetableAPI, attendanceAPI } from '../services/api';

const AuthTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message, type = 'info') => {
    setTestResults(prev => [...prev, { message, type, timestamp: new Date().toLocaleTimeString() }]);
  };

  const testTimetable = async () => {
    setLoading(true);
    addResult('Testing get-weekly-timetable...', 'info');
    
    try {
      const result = await timetableAPI.getWeeklyTimetable();
      addResult(`Timetable API successful: ${JSON.stringify(result)}`, 'success');
    } catch (error) {
      addResult(`Timetable API failed: ${error.message}`, 'error');
      if (error.response) {
        addResult(`Response status: ${error.response.status}`, 'error');
        addResult(`Response data: ${JSON.stringify(error.response.data)}`, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const testAttendanceStats = async () => {
    setLoading(true);
    addResult('Testing get-attendance-stats...', 'info');
    
    try {
      const result = await attendanceAPI.getAttendanceStats();
      addResult(`Attendance Stats API successful: ${JSON.stringify(result)}`, 'success');
    } catch (error) {
      addResult(`Attendance Stats API failed: ${error.message}`, 'error');
      if (error.response) {
        addResult(`Response status: ${error.response.status}`, 'error');
        addResult(`Response data: ${JSON.stringify(error.response.data)}`, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      addResult(`Token found: ${token.substring(0, 50)}...`, 'success');
    } else {
      addResult('No token found in localStorage', 'error');
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Authentication & API Test</h2>
      <p>Use this component to test authentication and API connectivity.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={checkToken} 
          style={{ marginRight: '10px', padding: '10px 20px' }}
        >
          Check Token
        </button>
        <button 
          onClick={testTimetable} 
          disabled={loading}
          style={{ marginRight: '10px', padding: '10px 20px' }}
        >
          {loading ? 'Testing...' : 'Test Timetable API'}
        </button>
        <button 
          onClick={testAttendanceStats} 
          disabled={loading}
          style={{ marginRight: '10px', padding: '10px 20px' }}
        >
          {loading ? 'Testing...' : 'Test Attendance Stats API'}
        </button>
        <button 
          onClick={clearResults}
          style={{ padding: '10px 20px' }}
        >
          Clear Results
        </button>
      </div>

      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '5px', 
        padding: '15px',
        backgroundColor: '#f9f9f9',
        maxHeight: '400px',
        overflowY: 'auto'
      }}>
        <h3>Test Results:</h3>
        {testResults.length === 0 ? (
          <p style={{ color: '#666' }}>No test results yet. Click a test button above.</p>
        ) : (
          testResults.map((result, index) => (
            <div 
              key={index} 
              style={{ 
                marginBottom: '10px',
                padding: '8px',
                borderRadius: '3px',
                backgroundColor: result.type === 'error' ? '#f8d7da' : 
                                result.type === 'success' ? '#d4edda' : '#d1ecf1',
                color: result.type === 'error' ? '#721c24' : 
                       result.type === 'success' ? '#155724' : '#0c5460',
                border: `1px solid ${result.type === 'error' ? '#f5c6cb' : 
                                   result.type === 'success' ? '#c3e6cb' : '#bee5eb'}`
              }}
            >
              <strong>[{result.timestamp}]</strong> {result.message}
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '5px' }}>
        <h4>Debugging Steps:</h4>
        <ol>
          <li>First, check if you have a valid token</li>
          <li>Test the timetable API to see if it returns subjects</li>
          <li>Test the attendance stats API</li>
          <li>If APIs fail, check the browser console for CORS errors</li>
          <li>Make sure you're logged in before testing</li>
        </ol>
      </div>
    </div>
  );
};

export default AuthTest; 