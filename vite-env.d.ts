interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_AUTH_SECRET:string;
  // add more env variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
