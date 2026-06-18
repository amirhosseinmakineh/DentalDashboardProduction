import express from 'express';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

import type { Request, Response, NextFunction } from 'express';
import { AngularNodeAppEngine, isMainModule } from '@angular/ssr/node';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const browserDistFolder = join(__dirname, '../browser');

const angularApp = new AngularNodeAppEngine();

/** static */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

/** SSR - SIMPLE & SAFE */
app.use((req, res, next) => {
  angularApp.handle(req as any).catch(next);
});

/** start */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = Number(process.env['PORT'] || 4000);

  app.listen(port, () => {
    console.log(`SSR running on http://localhost:${port}`);
  });
}
