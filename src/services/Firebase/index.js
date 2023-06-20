import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";

export const app = initializeApp({
  databaseURL: process.env.REACT_APP_FIREBASE_URL,
});
export const database = getDatabase(app);

export const fetchValue = async (path) => {
  try {
    const snapshot = await get(ref(database, path));
    return snapshot.val();
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

export const saveValue = async (path, value) => {
  try {
    await set(ref(database, path), value);
  } catch (err) {
    console.error("Error saving data:", err);
  }
};
