import { AfterViewInit, Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const target = document.querySelector(link.getAttribute('href') || '');
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          document.querySelector('.nav-links')?.classList.remove('open');
          document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
        }
      });
    });

    const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
    const menu = document.querySelector('.nav-links');
    menuButton?.addEventListener('click', () => {
      const isOpen = menu?.classList.toggle('open') ?? false;
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll<HTMLElement>('[data-comparison]').forEach((comparison) => {
      const range = comparison.querySelector<HTMLInputElement>('input[type="range"]');
      const after = comparison.querySelector<HTMLElement>('.after');
      const update = () => {
        const value = range?.value || '50';
        after?.style.setProperty('width', `${value}%`);
        comparison.querySelector<HTMLElement>('.handle')?.style.setProperty('left', `${value}%`);
      };
      range?.addEventListener('input', update);
      update();
    });

    document.querySelectorAll<HTMLButtonElement>('[data-slide]').forEach((button) => {
      button.addEventListener('click', () => {
        const railName = button.dataset['slide'];
        const direction = Number(button.dataset['dir'] || '1');
        const rail = document.querySelector<HTMLElement>(`[data-rail="${railName}"]`);
        rail?.scrollBy({ left: direction * 320, behavior: 'smooth' });
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  }
}
