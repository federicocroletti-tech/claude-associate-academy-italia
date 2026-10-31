import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = Number(process.env.PORT ?? 3000);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distRoot = path.resolve(
  __dirname,
  "..",
  "claude-associate-academy-italia",
  "browser",
);

export { app };

app.use(express.static(distRoot));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "claude-associate-academy-italia" });
});

app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }

  return res.sendFile(path.join(distRoot, "index.html"));
});

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  app.listen(port, () => {
    console.log(`Claude Academy app listening on http://localhost:${port}`);
  });
}
