import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import snapshotToArray from '../helpers/snapshotToArray';

const firebaseConfig = {
  apiKey: 'AIzaSyAhrxwXhnDqin5HaQiEdXXKjMhV8GwAm4s',
  authDomain: 'levisisk-4dc04.firebaseapp.com',
  projectId: 'levisisk-4dc04',
  storageBucket: 'levisisk-4dc04.appspot.com',
  messagingSenderId: '40982031246',
  appId: '1:40982031246:web:c19e0165a504c3c80192df',
  measurementId: 'G-5DK5PVCRVY',
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const authContext = createContext();

// Provider component to wrap app and make auth object available to any child
// that calls useAuth().
// is exported
const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

// Hook for children to get the auth object and re-render when it changes
// is exported
const useAuth = () => useContext(authContext);

// Provider hook - creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  // firebase auth methods
  const signIn = (email, password) =>
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setUser(user);
        return user;
      });

  const signUp = (email, password) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setUser(user);
        return user;
      })
      .catch((error) => {
        console.log('signup error code:', error.code);
        console.log('signup error message:', error.message);
      });

  const signOut = () =>
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });

  const sendPasswordResetEmail = (email) =>
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => true);

  const confirmPasswordReset = (code, password) =>
    firebase
      .auth()
      .confirmPasswordReset(code, newPassword)
      .then(() => true);

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any component that
  // utilizes this hook to re-render with the latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    user,
    signIn,
    signUp,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}

const useFirestore = () => {
  const db = firebase.firestore(app);

  const getDocument = (documentPath, onUpdate) => {
    firebase.firestore().doc(documentPath).onSnapshot(onUpdate);
  };

  const savePhoto = async (document) => {
    console.log('saving document');
    return db.collection('photos').add({
      ...document,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const getAllPhotos = () =>
    db
      .collection('photos')
      .get()
      .then((snapshot) => snapshotToArray(snapshot));

  return { getDocument, savePhoto, getAllPhotos, db };
};

export { useFirestore, ProvideAuth, useAuth };
