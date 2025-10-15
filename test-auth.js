// Test script to debug authentication
const bcrypt = require('bcryptjs');

async function testAuth() {
  console.log('Testing authentication logic...');
  
  // Test password hashing
  const password = 'admin123';
  const hash = await bcrypt.hash(password, 12);
  console.log('Generated hash:', hash);
  
  // Test password verification
  const isValid = await bcrypt.compare(password, hash);
  console.log('Password verification:', isValid);
  
  // Test with an example hash (similar to what's in the demo data)
  const testHash = await bcrypt.hash('admin123', 12);
  const testVerify = await bcrypt.compare('admin123', testHash);
  console.log('Test hash verification:', testVerify);
}

testAuth().catch(console.error);