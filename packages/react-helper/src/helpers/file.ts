export const fileToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) reject('File not found');
    const reader = new FileReader();

    // Set up the callback for when the file is loaded
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reader.onload = function (event: any) {
      const base64String = event.target.result;
      resolve(base64String);
    };

    // Set up the callback for when an error occurs during file reading
    reader.onerror = function (error) {
      reject(error);
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
  });
};
