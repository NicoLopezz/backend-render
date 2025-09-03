import axios from 'axios';

const testRegistration = async () => {
  try {
    const payload = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      country: "United States",
      companyName: "Test Company",
      affiliateCode: "123456"
    };

    console.log('Testing registration with payload:', payload);

    const response = await axios.post('http://localhost:10001/register', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Registration successful!');
    console.log('Response:', response.data);
    
    if (response.data.success) {
      console.log('✅ Frontend should redirect to /post-register');
    } else {
      console.log('❌ Frontend should show error message');
    }

  } catch (error) {
    console.log('❌ Registration failed!');
    if (error.response) {
      console.log('Error response:', error.response.data);
      console.log('Status:', error.response.status);
    } else {
      console.log('Error:', error.message);
    }
  }
};

testRegistration();

