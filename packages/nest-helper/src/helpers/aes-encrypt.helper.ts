import crypto from 'node:crypto';

const encMethod = 'aes-256-cbc';

export const encodeKey = (rawKey: string): string => {
  return crypto
    .createHash('sha512')
    .update(rawKey)
    .digest('hex')
    .substring(0, 32);
};

export const encodeIv = (rawKey: string): string => {
  return crypto
    .createHash('sha512')
    .update(rawKey)
    .digest('hex')
    .substring(0, 16);
};

export const encryptData = (
  data: string,
  key: string,
  encIv: string,
): string => {
  const cipher = crypto.createCipheriv(encMethod, key, encIv);
  const encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
  return Buffer.from(encrypted).toString('base64');
};

export const decryptData = (
  encryptedData: string,
  key: string,
  encIv: string,
): string => {
  const buff = Buffer.from(encryptedData, 'base64');
  encryptedData = buff.toString('utf-8');
  const decipher = crypto.createDecipheriv(encMethod, key, encIv);
  return decipher.update(encryptedData, 'hex', 'utf8') + decipher.final('utf8');
};
