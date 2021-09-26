import axios from 'axios';

const generateFirebaseToken = async (
  email: string,
  password: string,
  key: string
) => {
  const {
    data: { idToken }
  } = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      email,
      password,
      returnSecureToken: true
    }
  );

  return idToken;
};

export default generateFirebaseToken;
