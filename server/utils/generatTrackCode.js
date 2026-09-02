import crypto from 'crypto';

const generateDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const date = `${year}${month}${day}`;
  return date
};

const generateCode = () => {
    const randomCode = crypto.randomBytes(2).toString('hex').toUpperCase();
    return randomCode
}

export const generateTracking = () => {
    return `ENV-${generateDate()}-${generateCode()}`
}


