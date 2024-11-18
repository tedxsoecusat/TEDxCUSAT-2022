import { errorLogger } from "src/common/utils";
import { storage } from ".";

export const uploadFile = async (
  fileId: string,
  userId: string,
  file: File
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const uploadTask = storage.ref(`${fileId}/${userId}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => errorLogger(error, "uploadFile()"),
      async () => {
        const imageURL = await uploadTask.snapshot.ref.getDownloadURL();
        resolve(imageURL);
      }
    );
  });
};
