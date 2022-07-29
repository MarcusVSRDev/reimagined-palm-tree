const Token_key = 'ExpInToken';

export const isAutenticated = () => localStorage.getItem(Token_key) !== null;
export const getToken = () => localStorage.getItem(Token_key);
export const login = (token) => localStorage.setItem(Token_key, token);
export const logout = () => localStorage.removeItem(Token_key);
