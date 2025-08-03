# Troubleshooting Guide

## Login/Signup Issues

If you're experiencing login or signup failures, follow these steps to diagnose and fix the issue:

### 1. Check Backend Server Status

First, ensure your Go backend server is running:

```bash
# Check if the server is running
ps aux | grep "go run"

# If not running, start it from the project root
cd /path/to/AttendanceMonitor
go run .
```

### 2. Test API Endpoints Directly

Test the backend API endpoints using curl:

```bash
# Test health endpoint
curl http://localhost:8080/api/healthz

# Test signup
curl -X POST http://localhost:8080/api/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'

# Test login
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```

### 3. Test Frontend Proxy

Test if the frontend proxy is working:

```bash
# Test through the React development server proxy
curl http://localhost:3000/api/healthz
```

### 4. Use the Test Component

1. Open your browser and go to `http://localhost:3000/test`
2. Click the "Test Signup" and "Test Login" buttons
3. Check the results for detailed error messages
4. Open browser developer console (F12) for additional error details

### 5. Common Issues and Solutions

#### Issue: CORS Errors
**Symptoms**: Browser console shows CORS policy errors
**Solution**: The backend now has CORS configured. Restart the backend server:
```bash
pkill -f "go run ."
go run .
```

#### Issue: Network Error
**Symptoms**: "Network Error" or "Failed to fetch" messages
**Solution**: 
- Check if backend is running on port 8080
- Check if frontend is running on port 3000
- Try refreshing the browser page

#### Issue: 404 Not Found
**Symptoms**: API endpoints return 404
**Solution**: 
- Verify the backend routes are correctly configured
- Check if the server is running on the correct port
- Ensure the API base URL is correct

#### Issue: 500 Internal Server Error
**Symptoms**: Backend returns 500 errors
**Solution**:
- Check backend server logs for detailed error messages
- Verify database connection
- Check if all required tables exist

#### Issue: Invalid Credentials
**Symptoms**: Login fails with "Invalid credentials"
**Solution**:
- Ensure the user exists (try signup first)
- Check password spelling
- Verify the user was created successfully

### 6. Browser Developer Tools

1. **Open Developer Console** (F12)
2. **Check Network Tab**:
   - Look for failed requests
   - Check request/response details
   - Verify request headers and body
3. **Check Console Tab**:
   - Look for JavaScript errors
   - Check for CORS errors
   - Look for API error messages

### 7. Database Issues

If you're getting database-related errors:

```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Check database connection
psql -h localhost -U your_username -d your_database_name
```

### 8. Environment Variables

Ensure your environment is properly configured:

```bash
# Check if required environment variables are set
echo $DATABASE_URL
echo $JWT_SECRET
```

### 9. Port Conflicts

Check if ports are already in use:

```bash
# Check port 8080
netstat -tulpn | grep :8080

# Check port 3000
netstat -tulpn | grep :3000
```

### 10. Reset and Restart

If all else fails, try a complete reset:

```bash
# Stop all servers
pkill -f "go run"
pkill -f "react-scripts"

# Restart backend
cd /path/to/AttendanceMonitor
go run .

# Restart frontend (in another terminal)
cd /path/to/AttendanceMonitor/frontend
npm start
```

### 11. Test with Different Browser

Sometimes browser cache or extensions can cause issues:
- Try using an incognito/private window
- Try a different browser
- Clear browser cache and cookies

### 12. Check Logs

Look at the server logs for detailed error information:

```bash
# Backend logs (in the terminal where you ran go run .)
# Frontend logs (in the terminal where you ran npm start)
```

## Still Having Issues?

If you're still experiencing problems:

1. **Check the test component** at `http://localhost:3000/test`
2. **Share the error messages** from the browser console
3. **Share the server logs** from both frontend and backend
4. **Check if the issue is reproducible** with different usernames/passwords

The test component will help identify exactly where the problem is occurring and provide detailed error information to help resolve the issue. 