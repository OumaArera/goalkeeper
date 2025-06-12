import encryptionService from '../services/Encryption';

export const isLoggedIn = async () => {
  const token = localStorage.getItem('encryptedSpecialToken');
  if (!token) return false;

  const decryptedToken = await encryptionService.decrypt(token);

  try {
    const payloadBase64 = decryptedToken.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    const currentTime = Math.floor(Date.now() / 1000);

    if (payload.exp && currentTime < payload.exp) return true;

    return false;
  } catch (err) {
    console.error("Invalid token format", err);
    return false;
  }
}
