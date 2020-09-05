export const setCookie = (secret) => {
  if (secret) {
    document.cookie = `user=${secret}; expires=${new Date(Date.now() + 86400000).toUTCString()}`
  }
}

export const parseCookie = () => {
  const userCookie = document
    .cookie
    .split(' ')
    .find(i => i.includes('user'))
    .replace(';', '')

  return userCookie
    ? userCookie.split('=')[1]
    : userCookie
}