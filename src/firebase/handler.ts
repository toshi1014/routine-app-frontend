import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./secrets";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage();

export const uploadImage = async (image: File, filename: string) => {
    const storageRef = ref(storage, filename);
    try {
        await uploadBytes(storageRef, image);
        return await downloadImageURL(filename);
    } catch (err) {
        return "failed";
    }
}

export const downloadImageURL = async (filename: string) => {
    const pathReference = ref(storage, filename);
    try {
        return await getDownloadURL(pathReference);
    } catch (err) {
        return "broken";
    }
}