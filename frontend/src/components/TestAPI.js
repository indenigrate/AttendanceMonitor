import React, { useState } from 'react';
import { authAPI } from '../services/api';

const TestAPI = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message, type = 'info') => {
    setTestResults(prev => [...prev, { message, type, timestamp: new Date().toLocaleTimeString() }]);
  };

  const testSignup = async () => {
    setLoading(true);
    addResult('Testing signup...', 'info');
    
    try {
      const testUsername = `testuser_${Date.now()}`;
      const result = await authAPI.signup(testUsername, 'testpass123');
      addResult(`Signup successful: ${JSON.stringify(result)}`, 'success');
    } catch (error) {
      addResult(`Signup failed: ${error.message}`, 'error');
      if (error.response) {
        addResult(`Response status: ${error.response.status}`, 'error');
        addResult(`Response data: ${JSON.stringify(error.response.data)}`, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    addResult('Testing login...', 'info');
    
    try {
      const result = await authAPI.login('testuser', 'testpass123');
      addResult(`Login successful: ${JSON.stringify(result)}`, 'success');
    } catch (error) {
      addResult(`Login failed: ${error.message}`, 'error');
      if (error.response) {
        addResult(`Response status: ${error.response.status}`, 'error');
        addResult(`Response data: ${JSON.stringify(error.response.data)}`, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>API Test Component</h2>
      <p>Use this component to test API connectivity and debug issues.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={testSignup} 
          disabled={loading}
          style={{ marginRight: '10px', padding: '10px 20px' }}
        >
          {loading ? 'Testing...' : 'Test Signup'}
        </button>
        <button 
          onClick={testLogin} 
          disabled={loading}
          style={{ marginRight: '10px', padding: '10px 20px' }}
        >
          {loading ? 'Testing...' : 'Test Login'}
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
        <h4>Debugging Tips:</h4>
        <ul>
          <li>Check the browser's developer console (F12) for additional error messages</li>
          <li>Verify that the backend server is running on port 8080</li>
          <li>Check if there are any CORS errors in the console</li>
          <li>Try refreshing the page if the proxy isn't working</li>
        </ul>
      </div>
    </div>
  );
};

export default TestAPI; 