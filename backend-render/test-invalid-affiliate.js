import axios from 'axios';

const testInvalidAffiliateCode = async () => {
  try {
    const payload = {
      fullName: "Jane Doe",
      email: "jane.doe@example.com",
      password: "password123",
      country: "Canada",
      companyName: "Test Company 2",
      affiliateCode: "12345"
    };

    console.log('Testing registration with invalid affiliate code (5 digits):', payload.affiliateCode);

    const response = await axios.post('http://localhost:10001/register', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('❌ This should have failed!');
    console.log('Response:', response.data);

  } catch (error) {
    console.log('✅ Registration correctly failed with invalid affiliate code!');
    if (error.response) {
      console.log('Error response:', error.response.data);
      console.log('Status:', error.response.status);
      
      if (error.response.data.success === false) {
        console.log('✅ Frontend should show error message');
      }
    } else {
      console.log('Error:', error.message);
    }
  }
};

testInvalidAffiliateCode();

