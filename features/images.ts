export default function readImage(file: File): Promise<String> {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = error => {
      reject(error);
    };
  });
}
