import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // your main server entry
  outDir: "dist/server",
  target: "node24", // or node20 depending on your runtime
  format: ["esm"], // Express apps usually use CommonJS
  splitting: false, // disable for Node apps
  sourcemap: true,
  clean: true,
  minify: false, // keep readable for debugging
  dts: false, // no need unless you're publishing a library
  external: [
    "express", // don't bundle dependencies
  ],
  noExternal: [], // bundle everything else
});