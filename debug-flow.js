// Test to understand the authentication flow
console.log('Testing authentication flow...')

// Simulate the issue
const testFlow = async () => {
  console.log('1. User signs up with: cephasgokula@gmail.com')
  // This creates a user in the users array
  
  console.log('2. User tries to login with same credentials')
  // authenticateUser calls initializeDemoData()
  // But initializeDemoData checks if users.length === 0
  // Since signup created a user, users.length > 0
  // So demo data is NOT initialized
  
  console.log('3. findByEmail looks for cephasgokula@gmail.com')
  // But the user was created successfully, so it should be found
  
  console.log('4. Password verification should work')
  // bcrypt.compare should work with the hashed password
  
  console.log('Conclusion: The issue might be elsewhere...')
}

testFlow()