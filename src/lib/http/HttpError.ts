export class HttpError extends Error {
  readonly body: unknown
  readonly status: number
  readonly statusText: string
  readonly url: string

  constructor(response: Response, body: unknown) {
    super(`Request failed with ${response.status} ${response.statusText}`)
    this.name = 'HttpError'
    this.body = body
    this.status = response.status
    this.statusText = response.statusText
    this.url = response.url
  }
}
