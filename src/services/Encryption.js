const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;
const IV_LENGTH = Number(import.meta.env.VITE_IV_LENGTH);

if (!ENCRYPTION_KEY || typeof ENCRYPTION_KEY !== 'string') {
  throw new Error('VITE_ENCRYPTION_KEY must be defined in your environment');
}

if (isNaN(IV_LENGTH) || IV_LENGTH <= 0) {
  throw new Error('VITE_IV_LENGTH must be a valid positive number');
}

// Convert hex string to Uint8Array
function hexToUint8Array(hex) {
  if (hex.length % 2 !== 0) throw new Error("Invalid hex string");
  const array = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    array[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return array;
}

class EncryptionService {
  constructor() {
    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
  }

  async getKey() {
    const rawKey = hexToUint8Array(ENCRYPTION_KEY);
    return await crypto.subtle.importKey(
      'raw',
      rawKey,
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async encrypt(plainText) {
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
    const key = await this.getKey();

    const encodedText = this.encoder.encode(plainText);

    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
        tagLength: 128 // Required to ensure 16-byte authTag
      },
      key,
      encodedText
    );

    const cipherArray = new Uint8Array(encryptedBuffer);
    const authTag = cipherArray.slice(cipherArray.length - 16);
    const ciphertext = cipherArray.slice(0, cipherArray.length - 16);

    // Construct payload: [iv][authTag][ciphertext]
    const fullData = new Uint8Array(iv.length + authTag.length + ciphertext.length);
    fullData.set(iv, 0);
    fullData.set(authTag, iv.length);
    fullData.set(ciphertext, iv.length + authTag.length);

    return btoa(String.fromCharCode(...fullData));
  }

  async decrypt(base64Payload) {
    const binary = atob(base64Payload);
    const data = Uint8Array.from(binary, c => c.charCodeAt(0));

    const iv = data.subarray(0, IV_LENGTH);
    const authTag = data.subarray(IV_LENGTH, IV_LENGTH + 16);
    const ciphertext = data.subarray(IV_LENGTH + 16);

    // Reattach authTag to the end of ciphertext (as expected by Web Crypto)
    const encryptedData = new Uint8Array(ciphertext.length + authTag.length);
    encryptedData.set(ciphertext, 0);
    encryptedData.set(authTag, ciphertext.length);

    const key = await this.getKey();

    try {
      const decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv,
          tagLength: 128
        },
        key,
        encryptedData
      );

      return this.decoder.decode(decryptedBuffer);
    } catch (error) {
      console.error("Decryption failed:", error);
      throw new Error('Decryption failed: ' + error.message);
    }
  }
}

export default new EncryptionService();
