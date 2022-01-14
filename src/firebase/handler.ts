import {
    getStorage,
    ref,
    uploadBytes,
    uploadString,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./secrets";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage();

export const uploadImage = async (image: File | Blob, filename: string) => {
    const storageRef = ref(storage, filename);
    try {
        await uploadBytes(storageRef, image);
        return await downloadImageURL(filename);
    } catch (err) {
        return "failed";
    }
}

export const uploadDataURLImage = async (image: string, filename: string) => {
    const storageRef = ref(storage, filename);
    try {
        await uploadString(storageRef, image, "data_url");
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

export const deleteImage = async (filename: string) => {
    const storageRef = ref(storage, filename);
    try {
        await deleteObject(storageRef);
        return true;
    } catch (err) {
        return false;
    }
}