import firebase from '../db/firebase';

const createFirebaseUser = async (
  email: string,
  password: string,
  uid: string
) => {
  const user = await firebase.auth().createUser({ email, password, uid });

  return user;
};

export default createFirebaseUser;
