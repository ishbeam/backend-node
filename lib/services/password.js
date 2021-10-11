import bcrypt from 'bcrypt';

const SALT_FACTOR = 10;

export async function hash(plaintext) {
    const salt = await bcrypt.genSalt(SALT_FACTOR);
    return await bcrypt.hash(plaintext, salt);
}

export async function comparePassword(plaintext, password) {
  return await bcrypt.compare(plaintext, password);
}