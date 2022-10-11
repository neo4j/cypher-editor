/// <reference types="svelte" />
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_NEO4J_PASSWORD: string;
  readonly VITE_NEO4J_USERNAME: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
