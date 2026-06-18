import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const LOCAL_DEFAULT_PORT = 31843; // instead of default 3000

const args = process.argv.slice(2);
const portIndex = args.indexOf("--port");

const PORT =
  portIndex !== -1 && args[portIndex + 1] ? Number(args[portIndex + 1]) : LOCAL_DEFAULT_PORT;

if (Number.isNaN(PORT)) {
  console.error("Invalid port number");
  process.exit(1);
}

// Needed to resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from /public
app.use(express.static(path.join(__dirname, "../client")));

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
