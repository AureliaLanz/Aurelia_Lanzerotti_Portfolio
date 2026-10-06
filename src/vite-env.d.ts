interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_SSO_LOGIN_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
