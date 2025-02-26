/*eslint-disable*/
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidPhone = (phone) => phone.trim().length >= 10;
export const isValidPassword = (password) => password.trim().length >= 6;
