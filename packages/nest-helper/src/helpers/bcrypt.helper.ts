import bcrypt from 'bcryptjs';

export const hashPassword = async (
  password: string,
  salt: number,
): Promise<string> => {
  return await bcrypt.hash(password, salt);
};
export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
