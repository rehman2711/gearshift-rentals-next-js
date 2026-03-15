import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTxqq0E_-ExaJC6guUr07VdtlTmEtxz1E",
  authDomain: "gearshift-rentals-62220.firebaseapp.com",
  projectId: "gearshift-rentals-62220",
  storageBucket: "gearshift-rentals-62220.firebasestorage.app",
  messagingSenderId: "747145785022",
  appId: "1:747145785022:web:ed52c36b40f632145b78ef",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
