import firebase from 'firebase';

export default () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'your_api_key',
      authDomain: 'your_auth_domain',
      databaseURL: 'your_database_url',
      projectId: 'your_project_id',
      storageBucket: '',
      messagingSenderId: 'your_messaging_sender_id',
    });
  }
};
