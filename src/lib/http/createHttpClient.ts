import { HttpError } from './HttpError'

type HttpClientOptions = {
  baseUrl: string
  credentials?: RequestCredentials
  headers?: HeadersInit
  onUnauthorized?: () => void
}

type RequestOptions = Omit<RequestInit, 'body' | 'method'>

function joinUrl(baseUrl: string, path: string) {
  return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

async function parseResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return undefined
  }

  const text = await response.text()

  if (!text) {
    return undefined
  }

  const contentType = response.headers.get('content-type')

  if (contentType?.includes('application/json')) {
    return JSON.parse(text) as unknown
  }

  return text
}

export function createHttpClient(options: HttpClientOptions) {
  async function request<ResponseBody>(path: string, init: RequestInit) {
    const headers = new Headers(options.headers)

    new Headers(init.headers).forEach((value, key) => {
      headers.set(key, value)
    })

    headers.set('Accept', 'application/json')

    const response = await fetch(joinUrl(options.baseUrl, path), {
      ...init,
      credentials: init.credentials ?? options.credentials,
      headers,
    })
    const body = await parseResponseBody(response)

    if (!response.ok) {
      const error = new HttpError(response, body)

      if (response.status === 401) {
        options.onUnauthorized?.()
      }

      throw error
    }

    return body as ResponseBody
  }

  return {
    get<ResponseBody>(path: string, requestOptions: RequestOptions = {}) {
      return request<ResponseBody>(path, {
        ...requestOptions,
        method: 'GET',
      })
    },

    post<ResponseBody, RequestBody = undefined>(
      path: string,
      body?: RequestBody,
      requestOptions: RequestOptions = {},
    ) {
      const headers = new Headers(requestOptions.headers)

      if (body !== undefined) {
        headers.set('Content-Type', 'application/json')
      }

      return request<ResponseBody>(path, {
        ...requestOptions,
        body: body === undefined ? undefined : JSON.stringify(body),
        headers,
        method: 'POST',
      })
    },
  }
}
