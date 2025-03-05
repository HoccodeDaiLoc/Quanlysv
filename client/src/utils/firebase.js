import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVi_q_Vzi2P_St628brEF9lUMWEmCT2jY",

  authDomain: "pbl5image.firebaseapp.com",

  projectId: "pbl5image",

  storageBucket: "pbl5image.appspot.com",

  messagingSenderId: "333723619045",

  appId: "1:333723619045:web:3d59d0b48455b2344d0e0c",
};
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
