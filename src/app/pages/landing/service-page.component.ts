import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

const serviceTitles: Record<string, string> = {
  laminate: 'لمینت سرامیکی', composite: 'کامپوزیت ونیر', 'smile-design': 'طراحی لبخند', implant: 'ایمپلنت دندان', 'digital-implant': 'ایمپلنت دیجیتال', 'immediate-implant': 'ایمپلنت فوری', 'all-on-4-6': 'All on 4 / All on 6', bleaching: 'بلیچینگ', orthodontics: 'ارتودنسی', 'root-canal': 'درمان ریشه', restoration: 'ترمیم دندان', scaling: 'جرم‌گیری', 'wisdom-surgery': 'جراحی دندان عقل', 'gum-surgery': 'جراحی لثه', 'kids-dentistry': 'دندانپزشکی کودکان', 'oral-surgery': 'جراحی دندان'
};

@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="clinic-site service-detail" dir="rtl">
      <section class="service-hero apple-screen reveal-section">
        <div class="service-hero-inner">
          <a routerLink="/" class="back-link">← بازگشت به خانه</a>
          <span class="eyebrow">Dental Service</span>
          <h1>{{ title() }}</h1>
          <p>لندینگ اختصاصی {{ title() }} با ساختار Apple-style، تصویر بزرگ، توضیحات شفاف و CTA رزرو نوبت.</p>
          <div class="hero-actions"><a class="premium-btn primary" href="#service-booking">رزرو نوبت</a><a class="premium-btn glass" href="#faq">سوالات متداول</a></div>
        </div>
      </section>

      <section class="service-content-grid reveal-section">
        <article><span class="eyebrow">معرفی خدمت</span><h2>{{ title() }} چیست؟</h2><p>{{ title() }} با معاینه دقیق، عکاسی، اسکن دیجیتال و طراحی درمان اختصاصی انجام می‌شود تا نتیجه طبیعی، ایمن و ماندگار باشد.</p></article>
        <article><span class="eyebrow">مناسب چه افرادی است؟</span><h2>کاندیدهای مناسب</h2><ul><li>افرادی که به دنبال زیبایی طبیعی و مینیمال هستند.</li><li>بیمارانی که درمان دقیق و قابل برنامه‌ریزی می‌خواهند.</li><li>افرادی که تجربه‌ای آرام، سریع و لوکس را ترجیح می‌دهند.</li></ul></article>
      </section>

      <section class="premium-section reveal-section"><div class="section-heading"><span class="eyebrow">Treatment Journey</span><h2>مراحل درمان</h2><p>مسیر درمان کوتاه، قابل فهم و بدون شلوغی طراحی شده است.</p></div><div class="steps-grid"><div *ngFor="let step of steps; let i = index"><strong>0{{ i + 1 }}</strong><h3>{{ step }}</h3><p>هر مرحله با توضیح کامل، کنترل کیفیت و هماهنگی تیم درمان انجام می‌شود.</p></div></div></section>

      <section class="service-content-grid reveal-section"><article><span class="eyebrow">مزایا</span><h2>چرا در کلینیک دکتر مقدم؟</h2><ul><li>طراحی دیجیتال و نتیجه قابل پیش‌بینی</li><li>مواد و تجهیزات باکیفیت</li><li>فضای سفید، کرم، مینیمال و آرام</li><li>پیگیری بعد از درمان</li></ul></article><article><span class="eyebrow">نمونه‌کارها</span><h2>نتایج واقعی</h2><p>گالری قبل و بعد درمان‌ها با تمرکز بر طبیعی بودن فرم لبخند، رنگ و هماهنگی صورت طراحی شده است.</p><a class="premium-btn glass" routerLink="/" fragment="portfolio">مشاهده نمونه‌کارها</a></article></section>

      <section id="faq" class="premium-section reveal-section"><div class="section-heading"><span class="eyebrow">FAQ</span><h2>سوالات متداول</h2></div><div class="faq-list"><details *ngFor="let faq of faqs"><summary>{{ faq.q }}</summary><p>{{ faq.a }}</p></details></div></section>

      <section id="service-booking" class="final-cta reveal-section"><span class="eyebrow">رزرو مشاوره</span><h2>رزرو نوبت {{ title() }}</h2><p>برای دریافت برنامه درمانی اختصاصی، مشاوره خود را ثبت کنید.</p><div class="hero-actions"><a class="premium-btn primary" href="tel:+982100000000">رزرو نوبت</a><a class="premium-btn glass" href="tel:+982100000000">تماس با کلینیک</a><a class="premium-btn glass" routerLink="/">ورود به پرتال بیماران</a></div></section>

      <nav class="mobile-clinic-nav" aria-label="ناوبری موبایل"><a routerLink="/">⌂<span>خانه</span></a><a routerLink="/" fragment="services" class="active">✦<span>خدمات</span></a><a href="#service-booking">＋<span>رزرو</span></a><a routerLink="/">◌<span>پرتال</span></a><a href="tel:+982100000000">☏<span>تماس</span></a></nav>
    </main>
  `
})
export class ServicePageComponent {
  private readonly slug = signal('laminate');
  readonly title = computed(() => serviceTitles[this.slug()] ?? 'خدمات دندانپزشکی');
  readonly steps = ['مشاوره و اسکن دیجیتال', 'طراحی طرح درمان', 'اجرای درمان با کنترل کیفیت', 'تحویل نتیجه و مراقبت'];
  readonly faqs = [{ q: 'آیا درمان درد دارد؟', a: 'با بی‌حسی و تکنیک‌های مدرن، درمان تا حد امکان آرام و بدون استرس انجام می‌شود.' }, { q: 'مدت درمان چقدر است؟', a: 'بسته به نوع خدمت از یک جلسه تا چند مرحله برنامه‌ریزی می‌شود.' }, { q: 'آیا امکان پرداخت مرحله‌ای وجود دارد؟', a: 'در جلسه مشاوره، گزینه‌های پرداخت متناسب با درمان توضیح داده می‌شود.' }];
  constructor(route: ActivatedRoute) { route.paramMap.subscribe(params => this.slug.set(params.get('slug') ?? 'laminate')); }
}
