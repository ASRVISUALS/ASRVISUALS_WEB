import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirebaseStorage, isFirebaseConfigured } from './firebase';

const safeName = (name = 'file') =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_.-]+/g, '-')
    .replace(/-+/g, '-');

export const uploadFileToFirebase = async (file, folder = 'portfolio') => {
  if (!file) {
    throw new Error('No file selected.');
  }

  if (!isFirebaseConfigured()) {
    throw new Error('Firebase is not configured. Add Firebase env vars first.');
  }

  const storage = getFirebaseStorage();
  if (!storage) {
    throw new Error('Firebase storage is not available.');
  }

  const fileName = `${Date.now()}-${safeName(file.name)}`;
  const fileRef = ref(storage, `${folder}/${fileName}`);

  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
};

export const fetchYouTubeOEmbed = async (videoUrl) => {
  if (!videoUrl) {
    throw new Error('Video URL is required.');
  }

  const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error('Could not fetch YouTube metadata for this URL.');
  }

  return response.json();
};
