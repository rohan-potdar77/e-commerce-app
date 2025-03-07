const secret = import.meta.env.VITE_SECRET_KEY as string;
const cache = new Map<string, string | null>();

const stringToArrayBuffer = (str: string) => {
	const encoder = new TextEncoder();
	return encoder.encode(str);
};

const arrayBufferToString = (buffer: ArrayBuffer) => {
	const decoder = new TextDecoder();
	return decoder.decode(buffer);
};

const deriveKey = async (password: string) => {
	const encoder = new TextEncoder();
	const keyMaterial = await window.crypto.subtle.importKey(
		'raw',
		encoder.encode(password),
		{ name: 'PBKDF2' },
		false,
		['deriveKey']
	);

	return window.crypto.subtle.deriveKey(
		{
			name: 'PBKDF2',
			salt: new Uint8Array(16),
			iterations: 100000,
			hash: 'SHA-256',
		},
		keyMaterial,
		{ name: 'AES-GCM', length: 256 },
		false,
		['encrypt', 'decrypt']
	);
};

export const encryptData = async (dataToBeEncrypted: string) => {
	const key = await deriveKey(secret);

	const iv = window.crypto.getRandomValues(new Uint8Array(12));
	const encodedData = stringToArrayBuffer(dataToBeEncrypted);

	const encryptedData = await window.crypto.subtle.encrypt(
		{ name: 'AES-GCM', iv },
		key,
		encodedData
	);

	const encryptedBase64 = arrayBufferToString(encryptedData);
	cache.set(encryptedBase64, dataToBeEncrypted);

	return encryptedBase64;
};

export const decryptData = async (dataToBeDecrypted: string) => {
	const cachedData = cache.get(dataToBeDecrypted);
	if (cachedData) return cachedData;

	const key = await deriveKey(secret);

	const iv = new Uint8Array(12);
	const encryptedBuffer = stringToArrayBuffer(dataToBeDecrypted);

	const decryptedData = await window.crypto.subtle.decrypt(
		{ name: 'AES-GCM', iv },
		key,
		encryptedBuffer
	);

	return arrayBufferToString(decryptedData);
};

export const encryptedAndSave = async (key: string, value: string) => {
	const encryptedValue = await encryptData(value);
	localStorage.setItem(key, encryptedValue);
	return encryptedValue;
};

export const decryptedAndGet = async (key: string) => {
	const encryptedValue = localStorage.getItem(key);
	if (encryptedValue) return await decryptData(encryptedValue);
	return null;
};

export const removeFromStorage = (key: string) => {
	localStorage.removeItem(key);
};

export const clearStorage = () => {
	localStorage.clear();
};
