interface ImportMetaEnv {
	readonly VITE_GC_AUTH_SERVER: string;
	readonly VITE_GC_CLIENT_ID: string;

}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}