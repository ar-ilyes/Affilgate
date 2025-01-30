import {api} from "boot/axios";

export async function getAuthenticatedUser() {
  const {status, data, error} = await api.get("me")
  return {status, data, error}
}

export async function logout() {
  const {status, data, error} = await api.post('auth/logout');
  return {status, data, error}
}


export async function login(credential) {
  const {status, data, error} = await api.post('auth/login', credential);
  return {status, data, error}
}

export async function register(credential) {
  const {status, data, error} = await api.post('auth/register', credential);
  return {status, data, error}
}

export async function refreshToken(credential) {
  const {status, data, error} = await api.post('auth/refresh-tokens', credential);
  return {status, data, error}
}

export async function resentEmailVerification() {
  const {status, data, error} = await api.post('email/verification-notification');
  return {status, data, error}
}

export async function forgotPasswordLink(credential) {
  const {status, data, error} = await api.post('auth/forgot-password', credential);
  return {status, data, error}
}

export async function resetPassword(credential) {
  const {status, data, error} = await api.post('auth/reset-password', credential);
  return {status, data, error}
}
