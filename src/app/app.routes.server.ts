import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'admin/consultants/:consultantId/leads',
    renderMode: RenderMode.Server
  },
  {
    path: 'admin/consultants/:consultantId/attendance',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
