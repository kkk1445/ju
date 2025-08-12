import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase 설정 - Firebase 콘솔에서 가져온 실제 설정
const firebaseConfig = {
  apiKey: "AIzaSyAABNN1POZHRNO0f9Sy3FHAEtZ_x9yoyEA",
  authDomain: "juju-a1b91.firebaseapp.com",
  projectId: "juju-a1b91",
  storageBucket: "juju-a1b91.firebasestorage.app",
  messagingSenderId: "340004659888",
  appId: "1:340004659888:web:929a4591e67ab05ce79175",
  measurementId: "G-1HG395M82R"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase 서비스 내보내기
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
