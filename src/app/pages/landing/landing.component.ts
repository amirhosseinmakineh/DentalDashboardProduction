import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ServicePage {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="clinic-site" dir="rtl">
      <section id="home" class="clinic-hero reveal-section">
        <div class="hero-backdrop" [style.backgroundImage]="'linear-gradient(180deg, rgba(255,255,255,.1), rgba(255,255,255,.86)), url(' + heroImage + ')'">
          <div class="hero-copy">
            <span class="eyebrow">کلینیک دندانپزشکی دکتر سعید مقدم</span>
            <h1>لبخندی آرام، دقیق و ماندگار با تجربه‌ای در سطح Apple.</h1>
            <p>طراحی لبخند، ایمپلنت دیجیتال و درمان‌های زیبایی در فضایی مینیمال، لوکس و مجهز به فناوری‌های روز.</p>
            <div class="hero-actions">
              <a class="premium-btn primary" href="#booking">رزرو نوبت</a>
              <a class="premium-btn glass" href="#services">مشاهده خدمات</a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" class="premium-section reveal-section">
        <div class="section-heading">
          <span class="eyebrow">Signature Treatments</span>
          <h2>خدمات اصلی کلینیک</h2>
          <p>کارت‌های بزرگ، قابل لمس و مناسب Swipe در موبایل برای انتخاب سریع درمان.</p>
        </div>
        <div class="service-rail" aria-label="اسلایدر خدمات اصلی">
          <a class="lux-service-card" *ngFor="let service of featuredServices" [routerLink]="['/services', service.slug]">
            <img [src]="service.image" [alt]="service.title" loading="lazy" />
            <div>
              <h3>{{ service.title }}</h3>
              <p>{{ service.subtitle }}</p>
            </div>
          </a>
        </div>
      </section>

      <section id="doctor" class="doctor-section reveal-section">
        <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=85" alt="پرتره حرفه‌ای دکتر سعید مقدم" loading="lazy" />
        <div class="doctor-copy">
          <span class="eyebrow">Dr. Saeed Moghadam</span>
          <h2>دقت درمانی، زیبایی طبیعی و برنامه‌ریزی دیجیتال.</h2>
          <p>دکتر سعید مقدم با تمرکز بر دندانپزشکی زیبایی، ایمپلنت و طراحی لبخند، مسیر درمان را شفاف، آرام و شخصی‌سازی‌شده پیش می‌برد.</p>
          <a class="premium-btn glass" href="#booking">مشاهده بیشتر و رزرو مشاوره</a>
        </div>
      </section>

      <section id="cases" class="premium-section reveal-section">
        <div class="section-heading"><span class="eyebrow">Before / After</span><h2>نمونه‌کارهای قبل و بعد</h2></div>
        <div class="before-after-card">
          <img class="before-img" src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1100&q=82" alt="قبل درمان" />
          <div class="after-layer"><img src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1100&q=82" alt="بعد درمان" /></div>
          <input type="range" min="22" max="78" value="52" aria-label="مقایسه قبل و بعد" />
          <span class="drag-pill">Drag</span>
        </div>
      </section>

      <section class="premium-section reveal-section">
        <div class="section-heading"><span class="eyebrow">Digital Clinic</span><h2>تکنولوژی کلینیک</h2></div>
        <div class="tech-grid">
          <article *ngFor="let item of technologies"><img [src]="item.image" [alt]="item.title" loading="lazy" /><h3>{{ item.title }}</h3><p>{{ item.text }}</p></article>
        </div>
      </section>

      <section class="premium-section reveal-section">
        <div class="section-heading"><span class="eyebrow">Patient Experience</span><h2>تجربه بیماران</h2></div>
        <div class="testimonial-grid">
          <article *ngFor="let quote of testimonials"><div class="play-dot">▶</div><p>«{{ quote.text }}»</p><strong>{{ quote.name }}</strong></article>
        </div>
      </section>

      <section id="booking" class="final-cta reveal-section">
        <span class="eyebrow">Start Today</span>
        <h2>برای لبخند جدیدتان آماده‌اید؟</h2>
        <p>رزرو نوبت، تماس مستقیم یا پیام واتساپ؛ همیشه در دسترس.</p>
        <div class="hero-actions"><a class="premium-btn primary" href="tel:+982100000000">تماس</a><a class="premium-btn glass" href="https://wa.me/989120000000">واتساپ</a></div>
      </section>

      <nav class="mobile-clinic-nav" aria-label="ناوبری موبایل">
        <a href="#home" class="active">⌂<span>خانه</span></a><a href="#services">✦<span>خدمات</span></a><a href="#cases">◐<span>نمونه‌کارها</span></a><a href="#booking">＋<span>رزرو</span></a><a href="tel:+982100000000">☏<span>تماس</span></a>
      </nav>
    </main>
  `
})
export class LandingComponent {
  readonly heroImage = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2200&q=88';
  readonly featuredServices: ServicePage[] = [
    ['laminate','لمینت','پوسته‌های سرامیکی ظریف و طبیعی'], ['composite','کامپوزیت','اصلاح فرم و رنگ در یک جلسه'], ['implant','ایمپلنت','جایگزینی دقیق و ماندگار دندان'], ['smile-design','طراحی لبخند','تحلیل دیجیتال فرم صورت و لبخند'], ['orthodontics','ارتودنسی','مرتب‌سازی اصولی و زیبا'], ['bleaching','بلیچینگ','سفیدسازی کنترل‌شده و ایمن'], ['root-canal','درمان ریشه','درمان درد با حفظ دندان'], ['oral-surgery','جراحی دندان','جراحی دقیق و کم‌استرس'], ['kids-dentistry','دندانپزشکی کودکان','فضای آرام و کودک‌پسند']
  ].map(([slug,title,subtitle]) => ({ slug, title, subtitle, image: `https://source.unsplash.com/900x1100/?dentistry,${slug}` }));
  readonly technologies = [
    { title: 'اسکنر داخل دهانی', text: 'قالب‌گیری دیجیتال بدون ناراحتی.', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=82' },
    { title: 'تصویربرداری سه‌بعدی', text: 'برنامه‌ریزی دقیق ایمپلنت و جراحی.', image: 'https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=900&q=82' },
    { title: 'طراحی لبخند دیجیتال', text: 'پیش‌نمایش نتیجه قبل از شروع درمان.', image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=900&q=82' }
  ];
  readonly testimonials = [{ name: 'مریم رضایی', text: 'همه چیز آرام، شفاف و بسیار حرفه‌ای بود.' }, { name: 'آرش کریمی', text: 'نتیجه ایمپلنت دقیقاً همان چیزی شد که انتظار داشتم.' }, { name: 'سارا احمدی', text: 'نسخه موبایل سایت مثل اپلیکیشن حس می‌شود.' }];
}
