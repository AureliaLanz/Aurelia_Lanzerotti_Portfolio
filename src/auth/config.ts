const apiUrl = import.meta.env.VITE_API_URL?.trim()

export const authConfig = {
  currentUserPath: apiUrl ? '/auth/me' : '/auth.json',
  loginUrl:
    import.meta.env.VITE_SSO_LOGIN_URL?.trim() ||
    'https://sso.apsoprojects.org/auth/login',
}
