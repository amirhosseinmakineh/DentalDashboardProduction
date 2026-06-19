import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ClinicService {
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
      <section id="home" class="clinic-hero apple-screen reveal-section">
        <div class="hero-media-card">
          <img [src]="heroImage" alt="کلینیک دندانپزشکی مدرن و لوکس" fetchpriority="high" />
          <div class="hero-glass-panel">
            <span class="eyebrow">کلینیک دندانپزشکی دکتر سعید مقدم</span>
            <h1>لبخندی آرام، دقیق و ماندگار</h1>
            <p>دندانپزشکی زیبایی، ایمپلنت دیجیتال و درمان‌های تخصصی در فضایی مدرن و آرام.</p>
            <div class="hero-actions">
              <a class="premium-btn primary" href="#booking">رزرو نوبت</a>
              <a class="premium-btn glass" href="#services">مشاهده خدمات</a>
            </div>
          </div>
          <div class="hero-stat-card"><strong>Digital Smile</strong><span>طراحی درمان اختصاصی، دقیق و کم‌استرس</span></div>
        </div>
      </section>

      <section class="trust-strip" aria-label="ویژگی‌های کلینیک">
        <span>مشاوره شفاف</span>
        <span>تصویربرداری دیجیتال</span>
        <span>مواد باکیفیت</span>
        <span>پیگیری پس از درمان</span>
      </section>

      <section id="doctor" class="doctor-showcase reveal-section">
        <div class="doctor-portrait">
          <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=72" alt="تصویر حرفه‌ای دکتر سعید مقدم" loading="lazy" />
        </div>
        <div class="doctor-copy">
          <span class="eyebrow">درباره دکتر</span>
          <h2>دکتر سعید مقدم</h2>
          <p>رویکرد درمانی دکتر مقدم بر پایه تشخیص دقیق، طراحی دیجیتال، حفظ زیبایی طبیعی لبخند و تجربه‌ای آرام برای بیمار شکل گرفته است.</p>
          <div class="feature-grid">
            <span>درمان‌های زیبایی و تخصصی</span>
            <span>رویکرد دیجیتال</span>
            <span>تجربه آرام برای بیمار</span>
            <span>برنامه درمان اختصاصی</span>
          </div>
        </div>
      </section>

      <section id="services" class="premium-section reveal-section">
        <div class="section-heading">
          <span class="eyebrow">خدمات کلینیک</span>
          <h2>کارت‌های Apple Style برای انتخاب درمان</h2>
          <p>در دسکتاپ یک اسلایدر افقی تمیز و در موبایل یک تجربه Swipe بزرگ و لمسی دارید.</p>
          <div class="slider-controls" aria-hidden="true"><span>←</span><span>→</span></div>
        </div>
        <div class="service-rail" aria-label="اسلایدر خدمات کلینیک">
          <a class="lux-service-card" *ngFor="let service of services" [routerLink]="['/services', service.slug]">
            <img [src]="service.image" [alt]="service.title" loading="lazy" />
            <div>
              <small>خدمت تخصصی</small>
              <h3>{{ service.title }}</h3>
              <p>{{ service.subtitle }}</p>
            </div>
          </a>
        </div>
      </section>

      <section id="portfolio" class="premium-section reveal-section">
        <div class="section-heading">
          <span class="eyebrow">Before / After</span>
          <h2>نمونه‌کارهای قبل و بعد</h2>
          <p>مقایسه تصویری درمان‌های زیبایی با تمرکز بر طبیعی بودن رنگ، فرم و هماهنگی لبخند.</p>
        </div>
        <div class="case-layout">
          <article class="before-after-card">
            <img class="before-img" src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1100&q=70" alt="قبل از درمان زیبایی دندان" loading="lazy" />
            <div class="after-layer"><img src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1100&q=70" alt="بعد از درمان زیبایی دندان" loading="lazy" /></div>
            <span class="drag-pill">قبل / بعد</span>
          </article>
          <article class="case-copy">
            <span class="eyebrow">نمونه منتخب</span>
            <h3>طراحی لبخند و اصلاح رنگ</h3>
            <p>برنامه‌ریزی دیجیتال، انتخاب رنگ طبیعی و اصلاح فرم دندان‌ها با حفظ هماهنگی صورت.</p>
            <a class="premium-btn glass" href="#portfolio">مشاهده نمونه‌کارها</a>
          </article>
        </div>
      </section>

      <section id="technology" class="premium-section reveal-section">
        <div class="section-heading">
          <span class="eyebrow">تکنولوژی کلینیک</span>
          <h2>دقت دیجیتال در فضایی آرام</h2>
        </div>
        <div class="tech-product-grid">
          <article *ngFor="let item of technologies">
            <img [src]="item.image" [alt]="item.title" loading="lazy" />
            <div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div>
          </article>
        </div>
      </section>

      <section class="premium-section reveal-section">
        <div class="section-heading">
          <span class="eyebrow">تجربه بیماران</span>
          <h2>آرام، شفاف و حرفه‌ای</h2>
        </div>
        <div class="testimonial-grid">
          <article *ngFor="let quote of testimonials"><div class="rating">★★★★★</div><p>«{{ quote.text }}»</p><strong>{{ quote.name }}</strong></article>
        </div>
      </section>

      <section id="articles" class="premium-section reveal-section">
        <div class="section-heading"><span class="eyebrow">مقالات</span><h2>راهنمای کوتاه قبل از درمان</h2></div>
        <div class="article-grid">
          <article><span>01</span><h3>قبل از ایمپلنت دیجیتال چه بدانیم؟</h3><p>مسیر معاینه، تصویربرداری و انتخاب طرح درمان.</p></article>
          <article><span>02</span><h3>لمینت طبیعی چه ویژگی‌هایی دارد؟</h3><p>هماهنگی رنگ، فرم و ضخامت با صورت بیمار.</p></article>
          <article><span>03</span><h3>مراقبت بعد از بلیچینگ</h3><p>نکات ساده برای ماندگاری رنگ و سلامت مینای دندان.</p></article>
        </div>
      </section>

      <section id="booking" class="final-cta reveal-section">
        <span class="eyebrow">شروع مسیر درمان</span>
        <h2>برای شروع درمان لبخندتان آماده‌اید؟</h2>
        <p>یک مشاوره دقیق، آرام و شفاف برای انتخاب بهترین مسیر درمانی شما.</p>
        <div class="hero-actions"><a class="premium-btn primary" href="tel:+982100000000">رزرو نوبت</a><a class="premium-btn glass" href="tel:+982100000000">تماس با کلینیک</a><a class="premium-btn glass" href="#home">ورود به پرتال بیماران</a></div>
      </section>

      <footer id="contact" class="clinic-footer">
        <div><strong>کلینیک دندانپزشکی دکتر سعید مقدم</strong><p>تجربه‌ای آرام، دقیق و دیجیتال برای درمان‌های زیبایی و تخصصی دندانپزشکی.</p></div>
        <nav aria-label="لینک‌های فوتر"><a href="#services">خدمات</a><a href="#portfolio">نمونه‌کارها</a><a href="#technology">تکنولوژی</a><a href="tel:+982100000000">تماس</a></nav>
      </footer>

      <nav class="mobile-clinic-nav" aria-label="ناوبری موبایل">
        <a href="#home" class="active">⌂<span>خانه</span></a><a href="#services">✦<span>خدمات</span></a><a href="#booking">＋<span>رزرو</span></a><a href="#home">◌<span>پرتال</span></a><a href="tel:+982100000000">☏<span>تماس</span></a>
      </nav>
    </main>
  `
})
export class LandingComponent {
  readonly heroImage = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1800&q=72';
  readonly services: ClinicService[] = [
    { slug: 'laminate', title: 'لمینت سرامیکی', subtitle: 'پوسته‌های سرامیکی ظریف با رنگ طبیعی و ماندگار.', image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=70' },
    { slug: 'composite', title: 'کامپوزیت ونیر', subtitle: 'اصلاح فرم، فاصله و رنگ دندان‌ها با حداقل تراش.', image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=70' },
    { slug: 'smile-design', title: 'طراحی لبخند', subtitle: 'تحلیل دیجیتال صورت، لب و دندان برای لبخندی هماهنگ.', image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=900&q=70' },
    { slug: 'implant', title: 'ایمپلنت دندان', subtitle: 'جایگزینی پایدار دندان از دست رفته با برنامه‌ریزی دقیق.', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=70' },
    { slug: 'digital-implant', title: 'ایمپلنت دیجیتال', subtitle: 'کاشت دقیق‌تر با تصویربرداری و راهنمای دیجیتال.', image: 'https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=900&q=70' },
    { slug: 'immediate-implant', title: 'ایمپلنت فوری', subtitle: 'کاهش زمان درمان در شرایط مناسب بالینی.', image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=70' },
    { slug: 'bleaching', title: 'بلیچینگ', subtitle: 'سفیدسازی کنترل‌شده و ایمن برای روشن‌تر شدن لبخند.', image: 'https://images.unsplash.com/photo-1445527815219-ecbfec67492e?auto=format&fit=crop&w=900&q=70' },
    { slug: 'orthodontics', title: 'ارتودنسی', subtitle: 'مرتب‌سازی دندان‌ها با تمرکز بر سلامت و زیبایی.', image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=70' },
    { slug: 'root-canal', title: 'درمان ریشه', subtitle: 'درمان درد و عفونت با حفظ دندان طبیعی.', image: 'https://images.unsplash.com/photo-1629909615957-be5d5b203c45?auto=format&fit=crop&w=900&q=70' },
    { slug: 'restoration', title: 'ترمیم دندان', subtitle: 'بازسازی ساختار دندان با مواد زیبا و مقاوم.', image: 'https://images.unsplash.com/photo-1629909615757-300b7f0a6b9f?auto=format&fit=crop&w=900&q=70' },
    { slug: 'scaling', title: 'جرم‌گیری', subtitle: 'پاکسازی تخصصی برای سلامت لثه و شفافیت لبخند.', image: 'https://images.unsplash.com/photo-1606811842243-7ff0c9dba71e?auto=format&fit=crop&w=900&q=70' },
    { slug: 'wisdom-surgery', title: 'جراحی دندان عقل', subtitle: 'جراحی دقیق با کنترل درد، التهاب و استرس بیمار.', image: 'https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=900&q=70' },
    { slug: 'gum-surgery', title: 'جراحی لثه', subtitle: 'اصلاح سلامت و فرم لثه برای نتیجه‌ای طبیعی‌تر.', image: 'https://images.unsplash.com/photo-1629909613789-77a8b032d9d7?auto=format&fit=crop&w=900&q=70' },
    { slug: 'kids-dentistry', title: 'دندانپزشکی کودکان', subtitle: 'فضای آرام، مهربان و بدون ترس برای کودکان.', image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=70' }
  ];
  readonly technologies = [
    { title: 'اسکن دیجیتال', text: 'قالب‌گیری سریع و راحت بدون تجربه ناخوشایند قالب سنتی.', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=70' },
    { title: 'طراحی دیجیتال لبخند', text: 'مشاهده مسیر درمان و هماهنگی فرم لبخند قبل از شروع.', image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1000&q=70' },
    { title: 'تصویربرداری پیشرفته', text: 'تشخیص دقیق‌تر برای ایمپلنت، جراحی و درمان‌های تخصصی.', image: 'https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=1000&q=70' },
    { title: 'درمان کم‌درد و دقیق', text: 'تمرکز بر آرامش بیمار، کنترل درد و اجرای مرحله‌به‌مرحله.', image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=70' }
  ];
  readonly testimonials = [
    { name: 'مریم رضایی', text: 'از لحظه ورود همه چیز آرام، تمیز و حرفه‌ای بود؛ نتیجه درمان کاملاً طبیعی شد.' },
    { name: 'آرش کریمی', text: 'توضیحات درمان شفاف بود و برای ایمپلنت هیچ سردرگمی نداشتم.' },
    { name: 'سارا احمدی', text: 'رزرو، مشاوره و پیگیری بعد از درمان خیلی منظم و محترمانه انجام شد.' }
  ];
}
