import firebase, { ServiceAccount } from 'firebase-admin';

// const serviceAccount = {
//   type: 'service_account',
// ....
// };

// firebase.initializeApp({
//   credential: firebase.credential.cert(serviceAccount as ServiceAccount)
// });
// export default firebase.app();

// Used to test on Firebase Emulator
firebase.initializeApp({
  projectId:"osmosis-test"
});
export default firebase.app();
