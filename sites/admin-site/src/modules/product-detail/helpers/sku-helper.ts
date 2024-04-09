export const generateSku = () => {
  // generate sku by time stamp, max 8 digits
  const date = new Date();
  const year = date.getFullYear().toString().slice(2);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const minute = date.getMinutes();
  const millisecond = date.getMilliseconds();

  const sku = `${year}${month}${day}${minute}${millisecond}`;
  return sku;
};
