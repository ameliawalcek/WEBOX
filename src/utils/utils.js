export const setCookie = (secret) => {
  if (secret) {
    document.cookie = `user=${secret}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`
  }
}

export const parseCookie = () => {
  const userCookie = document
    .cookie
    .split(' ')
    .find(i => i.includes('user'))

  return userCookie
    ? userCookie.replace(';', '').split('=')[1]
    : userCookie
}