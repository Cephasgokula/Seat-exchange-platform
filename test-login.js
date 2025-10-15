// Test the login API directly
async function testLogin() {
  try {
    console.log('Testing login API...')
    
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'admin@university.edu',
        password: 'admin123'
      })
    })
    
    const data = await response.json()
    console.log('Response status:', response.status)
    console.log('Response data:', data)
    
  } catch (error) {
    console.error('Error:', error)
  }
}

testLogin()