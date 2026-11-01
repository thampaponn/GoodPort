import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../config/firebase";

export type PickedFile = { uri: string; name: string };

export const pickImage = async (): Promise<string | null> => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.9,
  });
  return result.canceled ? null : result.assets[0].uri;
};

export const pickPdf = async (): Promise<PickedFile | null> => {
  const result = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
  if (result.canceled) {
    return null;
  }
  const { uri, name } = result.assets[0];
  return { uri, name };
};

const readBlob = (uri: string) =>
  new Promise<Blob>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => resolve(xhr.response as Blob);
    xhr.onerror = () => reject(new TypeError("Network request failed"));
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

const storageName = (uri: string, name?: string) => {
  const base = name ?? uri.substring(uri.lastIndexOf("/") + 1);
  return `${Date.now()}-${base.replace(/[^\w.-]/g, "_")}`;
};

export const uploadFile = async (uri: string, name?: string) => {
  const blob = await readBlob(uri);
  const ref = firebase.storage().ref().child(storageName(uri, name));
  await ref.put(blob);
  return ref.getDownloadURL() as Promise<string>;
};

const isRemote = (uri: string) => /^https?:\/\//.test(uri);

// Form images are either already hosted (editing) or a fresh local pick.
export const resolveImageUrl = async (uri: string | null) => {
  if (!uri) {
    return "";
  }
  return isRemote(uri) ? uri : uploadFile(uri);
};
