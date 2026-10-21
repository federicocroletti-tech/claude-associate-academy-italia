import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT ?? 3000);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distRoot = path.resolve(__dirname, '..', 'claude-associate-academy-italia', 'browser');

app.use(express.json());
app.use(express.static(distRoot));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'claude-associate-academy-italia' });
});

app.get('/api/progress', (_req, res) => {
  res.json({ completedModuleIds: [] });
});

app.post('/api/progress', (req, res) => {
  const payload = req.body as { completedModuleIds?: string[] };
  res.json({ completedModuleIds: Array.isArray(payload.completedModuleIds) ? payload.completedModuleIds : [] });
});

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }

  return res.sendFile(path.join(distRoot, 'index.html'));
});

app.listen(port, () => {
  console.log(`Claude Academy app listening on http://localhost:${port}`);
});
