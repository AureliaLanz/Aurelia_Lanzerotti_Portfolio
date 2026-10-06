export function createSsoRedirect(loginUrl: string) {
  let isRedirecting = false

  return function redirectToSso() {
    if (isRedirecting) {
      return
    }

    isRedirecting = true
    window.location.replace(loginUrl)
  }
}
