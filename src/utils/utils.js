export const setCookie = (secret) => {
  if (secret) {
    document.cookie = `user=${secret}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`
  }
}

export const deleteCookie = () => {
  document.cookie = 'user=null'
}

export const parseCookie = () => {
  if (document.cookie) {
    const userCookie = document
      .cookie
      .split(' ')
      .find(i => i.includes('user'))
    if(userCookie) {
      if (userCookie.includes('null')) return false
      
      return userCookie
      ? userCookie.replace(';', '').split('=')[1]
      : userCookie
    }
  }
}