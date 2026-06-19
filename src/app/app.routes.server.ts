import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'services/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return ['laminate', 'composite', 'smile-design', 'implant', 'digital-implant', 'immediate-implant', 'all-on-4-6', 'bleaching', 'orthodontics', 'root-canal', 'restoration', 'scaling', 'wisdom-surgery', 'gum-surgery', 'kids-dentistry'].map(slug => ({ slug }));
    }
  },
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
