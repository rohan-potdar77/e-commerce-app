import { pbkdf2, timingSafeEqual } from 'crypto';
import jwt from 'jsonwebtoken';
import configuration from './configuration.js';

const { expiresIn, secret, salt } = configuration;

/**
 * @param {string} data The data to be hashed.
 * @returns {Promise<string>} A promise that resolves to an hash string.
 * @throws {Error} If an error occurs during hashing.
 */
const generateHash = async (data) => {
  return new Promise((resolve, reject) => {
    pbkdf2(data, salt, 1000, 64, 'sha512', (error, hash) => {
      if (error) reject(error);
      else resolve(hash.toString('hex'));
    });
  });
};

/**
 * @param {string} data The data to be verified.
 * @param {string} existingHashedData The hash to compare against.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the hash matches or `false` otherwise.
 * @throws {Error} If an error occurs during the hash verification.
 */
const verifyHash = async (data, existingHashedData) => {
  return new Promise((resolve, reject) => {
    pbkdf2(data, salt, 1000, 64, 'sha512', (error, hash) => {
      if (error) reject(error);
      else {
        const hashBuffer = Buffer.from(existingHashedData, 'hex');
        const providedHashBuffer = Buffer.from(hash.toString('hex'), 'hex');
        const isMatch = timingSafeEqual(hashBuffer, providedHashBuffer);
        resolve(isMatch);
      }
    });
  });
};

/**
 * @param {string} message Error message.
 * @param {number} status HTTP status code.
 * @returns {Error} New Error.
 */
const createError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

/**
 * @param {string | Buffer | object} payload The data to be encoded.
 * @returns {Promise<string | undefined>} New token.
 * @throws {Error} Error occured while generating token.
 */
const generateToken = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn }, (error, encoded) => {
      if (error) reject(error);
      else resolve(encoded);
    });
  });
};

/**
 * @param {string} token Token to be verified.
 * @returns {string | Buffer | object} Decoded payload.
 * @throws {Error} Error while verifying token.
 */
const verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) reject(error);
      else resolve(decoded);
    });
  });
};

export default {
  generateHash,
  verifyHash,
  createError,
  generateToken,
  verifyToken,
};
