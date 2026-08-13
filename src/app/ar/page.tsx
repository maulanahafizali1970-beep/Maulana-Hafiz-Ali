import Link from 'next/link';
import { Heart, HeartHandshake, Users, Home, HeartOff, Shield, Scale, Sparkles, Coins, Briefcase, CheckCircle, ChevronLeft, PhoneCall, BookOpen } from 'lucide-react';
import { services } from '@/data/services';
import { testimonials } from '@/data/testimonials';
import { faqs } from '@/data/faqs';
import { blogPosts } from '@/data/blog';
import { countries } from '@/data/countries';
import HeroSection from '@/components/HeroSection';
import ServiceCard from '@/components/ServiceCard';
import TrustCard from '@/components/TrustCard';
import AboutSection from '@/components/AboutSection';
import ConsultationSteps from '@/components/ConsultationSteps';
import TestimonialCard from '@/components/TestimonialCard';
import BlogCard from '@/components/BlogCard';
import FAQAccordion from '@/components/FAQAccordion';
import CTASection from '@/components/CTASection';

const quickServices = [
  { title: 'وظيفة', slug: '/wazifa', icon: Heart },
  { title: 'فاشيكران', slug: '/vashikaran', icon: Sparkles },
  { title: 'حلول القضايا القانونية', slug: '/court-case-solutions', icon: Scale },
  { title: 'الكنوز المدفونة', slug: '/buried-wealth', icon: Coins },
  { title: 'عوائق الأعمال', slug: '/business-obstacles', icon: Briefcase },
  { title: 'مشاكل العمل والأبناء', slug: '/jobs-child-problems', icon: Briefcase },
];

const trustItems = [
  { title: 'استشارة سرية', description: 'خصوصيتك محترمة. جميع المناقشات تبقى سرية تماماً.', icon: Shield },
  { title: 'إرشاد شخصي', description: 'كل حالة فريدة. يتم تخصيص الإرشاد حسب ظروفك الخاصة.', icon: Heart },
  { title: 'دعم بالعربية والإنجليزية', description: 'الاستشارات متاحة باللغتين العربية والإنجليزية لراحتك.', icon: Users },
  { title: 'خدمة عالمية عبر الإنترنت', description: 'أنجز أعمالك من أي مكان في العالم — حل لكل مشكلة.', icon: Home },
];

const problemsList = [
  'قضايا المحاكم والنزاعات القانونية',
  'مخاوف تتعلق بالفاشيكران',
  'الكنوز المدفونة والثروات المخفية',
  'السلام المنزلي واستقرار الأسرة',
  'عوائق الأعمال والنمو',
  'الوظائف وصعوبات المسار المهني',
  'مشاكل الأبناء',
  'التخلص من الأعداء والحماية',
  'حل النزاعات العائلية',
  'نزاعات الممتلكات والميراث',
  'سوء الفهم بين الشريكين',
  'خلافات الزوجين',
  'معارضة الأسرة للزواج',
  'مخاوف الانفصال والطلاق',
  'مخاوف الثقة والغيرة',
  'الشفاء العاطفي بعد الرفض',
  'الخوف من الحسد أو العين',
  'صعوبات العلاقات عن بعد',
];

const whyChoosePoints = [
  'فقط أنت ستحصل على حل مشاكلك عبر مكالمة هاتفية',
  'أنجز أعمالك من أي مكان في العالم',
  'أي نوع من المشاكل يُستأصل حله خلال ثلاث ساعات',
  'خاب أملكم من التانترا؟ جرب مرة واحدة بالتأكيد',
  'إرشاد سري ومحترم ومخصص',
];

const consultationSteps = [
  { title: 'أرسل تفاصيلك', description: 'املأ نموذج تفاصيل الاتصال في هذه الصفحة.' },
  { title: 'اختر لغتك', description: 'اختر العربية أو الإنجليزية لاستشارتك.' },
  { title: 'استلم المكالمة', description: 'سيتم التواصل معك عبر مكالمة هاتفية لفهم مشكلتك.' },
  { title: 'احصل على الحل', description: 'أي نوع من المشاكل يُستأصل حله خلال ثلاث ساعات.' },
];

export default function ArabicHomePage() {
  return (
    <>
      <HeroSection lang="ar" />

      <section className="bg-white border-y border-light-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickServices.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.slug}
                  href={item.slug}
                  className="flex flex-col items-center gap-3 p-4 border border-light-border rounded-lg hover:border-subtle-gold hover:bg-soft-cream transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-deep-emerald/10 flex items-center justify-center group-hover:bg-deep-emerald/20 transition-colors">
                    <Icon className="w-6 h-6 text-deep-emerald" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-dark-text text-center leading-tight">
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <AboutSection
        heading="تعرف على مولانا حافظ علي"
        content="يقدم مولانا حافظ علي إرشاداً روحياً سرياً للأفراد والعائلات الذين يمرون بظروف صعبة. تركز استشاراته على الإيمان والصبر والفهم العاطفي والتواصل المحترم والخطوات العملية نحو الحل. يتم التعامل مع كل حالة على حدة وبسرية تامة. فقط أنت ستحصل على حل مشاكلك عبر مكالمة هاتفية."
        points={[
          'استشارة فردية سرية',
          'إرشاد متاح بالعربية والإنجليزية',
          'دعم للعملاء في جميع أنحاء العالم',
          'تواصل محترم وغير متحيز',
          'إرشاد شخصي لكل حالة',
        ]}
      />

      <section className="bg-soft-cream py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-10">
            لماذا يثق الناس بمولانا حافظ علي
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {trustItems.map((item) => (
              <TrustCard
                key={item.title}
                icon={
                  <item.icon className="w-8 h-8 text-deep-emerald" />
                }
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-ivory py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-4">
            إرشاد لكل نوع من المشاكل
          </h2>
          <p className="text-dark-text/70 text-center max-w-2xl mx-auto mb-10">
            أي نوع من المشاكل يُستأصل حله خلال ثلاث ساعات
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service) => (
              <ServiceCard
                key={service.id}
                title={service.titleAr}
                description={service.descriptionAr}
                excerpt={service.excerptAr}
                slug={service.slug}
                iconName={service.icon}
                image={service.image}
                disclaimer={service.disclaimer}
                featured={service.featured}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/ar/services"
              className="inline-flex items-center gap-2 text-subtle-gold hover:text-deep-emerald font-medium transition-colors"
            >
              عرض جميع الخدمات
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-soft-cream py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-8">
              السعي للمصالحة بعد الانفصال
            </h2>
            <div className="prose prose-lg max-w-none text-dark-text/80 space-y-4">
              <p>
                المصالحة بعد الانفصال عملية دقيقة تتطلب الصبر والتأمل الذاتي والاحترام المتبادل. غالباً ما ينهار التواصل عندما تتفاقم سوء الفهم أو تسيطر العواطف أو تتصاعد الضغوط الخارجية.
              </p>
              <p>
                يمكن لتوقعات الأسرة والاختلافات الثقافية وعدم الأمان الشخصي أن تساهم جميعها في صعوبات العلاقة. بعد الانفصال، من الطبيعي أن تمر بمجموعة من المشاعر بما في ذلك الحزن والأمل والارتباك والندم.
              </p>
              <p>
                أخذ الوقت لمعالجة هذه المشاعر أمر ضروري قبل اتخاذ أي قرارات. يمكن للتأمل القائم على الإيمان أن يوفر الراحة والمنظور خلال هذا الوقت العصيب.
              </p>
              <p>
                إذا كان الطرفان منفتحين على التواصل، فيجب أن يبدأ بالصدق والاحترام والاستعداد للاستماع. ومع ذلك، من المهم أن ندرك أن المصالحة يجب أن تكون مبنية على الرغبة المتبادلة والأمان والاحترام.
              </p>
              <p className="text-dark-text/60 italic">
                لا يمكن لأي استشارة روحية أن تضمن أو تجبر قرار شخص آخر.
              </p>
            </div>
            <div className="bg-subtle-gold/10 border-r-4 border-subtle-gold p-4 md:p-6 rounded-l-lg mt-8">
              <p className="text-dark-text text-sm md:text-base italic">
                يجب أن تكون المصالحة مبنية على الرغبة المتبادلة والأمان والاحترام. لا يمكن لأي استشارة روحية أن تضمن أو تجبر قرار شخص آخر.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-8 justify-center">
              <Link
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-deep-emerald hover:bg-dark-forest text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <PhoneCall className="w-5 h-5" />
                أرسل تفاصيلك
              </Link>
              <Link
                href="/ar/services"
                className="inline-flex items-center gap-2 border-2 border-deep-emerald text-deep-emerald hover:bg-deep-emerald hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                عرض جميع الخدمات
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm-ivory py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-10">
            كيف تعمل استشارتك الخاصة
          </h2>
          <ConsultationSteps
            steps={consultationSteps}
            note="يجب شرح الرسوم ومدة الاستشارة وتفاصيل الخدمة قبل الدفع. لا تطلب أبداً كلمات مرور مصرفية حساسة أو رموز تحقق أو وثائق خاصة غير ضرورية."
          />
        </div>
      </section>

      <section className="bg-soft-cream py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-10">
            المشاكل التي نساعد فيها
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-3">
              {problemsList.map((problem) => (
                <div key={problem} className="flex items-start gap-3 p-3">
                  <CheckCircle className="w-5 h-5 text-medium-green flex-shrink-0 mt-0.5" />
                  <span className="text-dark-text/80">{problem}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Promises Banner */}
      <section className="bg-deep-emerald py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { title: 'الحل عبر مكالمة هاتفية', description: 'فقط أنت ستحصل على حل مشاكلك عبر مكالمة هاتفية' },
              { title: 'من أي مكان في العالم', description: 'أنجز أعمالك من أي مكان في العالم — حل لكل مشكلة' },
              { title: 'خلال ثلاث ساعات فقط', description: 'أي نوع من المشاكل يُستأصل حله خلال ثلاث ساعات' },
              { title: 'خاب أملكم من التانترا؟', description: 'جرب مرة واحدة بالتأكيد — شارك مشكلتك واحصل على الإرشاد' },
            ].map((promise) => (
              <div key={promise.title} className="p-4 border border-[#C5A253]/30 rounded-lg bg-[#0B5D3B]">
                <h3 className="text-[#C5A253] font-bold mb-2">{promise.title}</h3>
                <p className="text-white/80 text-sm">{promise.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wazifa Highlight */}
      <section className="relative bg-deep-emerald overflow-hidden py-16">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.06) 15px, rgba(255,255,255,0.06) 30px)`,
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="inline-block bg-subtle-gold text-dark-forest font-bold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full">
                ★ الخدمة الأكثر ثقة
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                الوظيفة — قوة الدعاء المقدس لكل مشاكلك
              </h2>
              <p className="text-white/80 leading-relaxed">
                الوظيفة هي خدمتنا الأكثر طلباً. من خلال الأدعية المقدسة يتم تقديم الإرشاد لكل نوع
                من الصعوبات — قضايا المحاكم وعوائق الأعمال والنزاعات العائلية ومشاكل العلاقات
                والمزيد. فقط أنت ستحصل على حل مشاكلك عبر مكالمة هاتفية.
              </p>
              <ul className="space-y-2">
                {[
                  'أي نوع من المشاكل يُستأصل حله خلال ثلاث ساعات',
                  'أنجز أعمالك من أي مكان في العالم',
                  'خاب أملكم من التانترا؟ جرب مرة واحدة بالتأكيد',
                  'إرشاد سري بالعربية والإنجليزية',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-white/80">
                    <svg className="w-5 h-5 text-subtle-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/wazifa"
                  className="inline-flex items-center gap-2 bg-subtle-gold hover:bg-amber-600 text-dark-forest px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  تعرف على الوظيفة
                </Link>
                <Link
                  href="#contact-form"
                  className="inline-flex items-center gap-2 border-2 border-white/50 text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  أرسل تفاصيلك
                </Link>
              </div>
            </div>
            <div className="space-y-5">
              <div className="bg-[#0B5D3B] border border-subtle-gold/40 rounded-2xl p-8 text-center shadow-xl">
                <div className="w-20 h-20 mx-auto rounded-full bg-subtle-gold/15 flex items-center justify-center mb-5">
                  <BookOpen className="w-10 h-10 text-subtle-gold" />
                </div>
                <h3 className="text-subtle-gold font-bold text-xl mb-3">استشارة الوظيفة</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  شارك مشكلتك واحصل على إرشاد وظيفة شخصي عبر مكالمة هاتفية سرية — حل يُستأصل
                  خلال ثلاث ساعات فقط.
                </p>
                <div className="mt-6">
                  <Link
                    href="/wazifa"
                    className="inline-flex items-center justify-center w-full bg-white text-deep-emerald hover:bg-soft-cream px-6 py-3 rounded-lg font-bold transition-colors"
                  >
                    ابدأ وظيفتك
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-soft-cream py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-4">
            لماذا يثق الناس بمولانا حافظ علي
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {whyChoosePoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 border border-light-border rounded-lg bg-white">
                <div className="w-10 h-10 rounded-full bg-deep-emerald/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-subtle-gold font-bold">{idx + 1}</span>
                </div>
                <p className="text-dark-text/80">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-soft-cream py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-4">
            استشارة أونلاين متاحة عالمياً
          </h2>
          <p className="text-dark-text/70 text-center max-w-2xl mx-auto mb-10">
            نخدم العملاء في جميع أنحاء الشرق الأوسط وآسيا وأوروبا وأمريكا الشمالية وما بعدها
          </p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {countries.slice(0, 15).map((country, i) => (
              <div
                key={country.id}
                className="flex flex-col items-center gap-2 p-3 border border-light-border rounded-lg bg-white hover:border-subtle-gold transition-colors"
              >
                <span className={`text-2xl flag-wave flag-delay-${(i % 5) + 1}`}>{country.flag}</span>
                <span className="text-xs md:text-sm text-dark-text text-center font-medium">{country.nameAr}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-ivory py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-4">
            تجارب العملاء
          </h2>
          <p className="text-dark-text/60 text-center text-sm mb-8">
            شهادة نموذجية - استبدل بتعليقات العملاء الموثقة قبل النشر.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard
                key={t.id}
                name={t.nameAr || t.name}
                location={t.locationAr || t.location}
                text={t.textAr || t.text}
                isSample={t.isSample}
              />
            ))}
          </div>
          <p className="text-dark-text/50 text-center text-xs mt-6">
            تختلف التجارب الفردية. الشهادات لا تضمن نتائج مماثلة.
          </p>
          <div className="text-center mt-6">
            <Link
              href="/ar/testimonials"
              className="text-subtle-gold hover:text-deep-emerald font-medium transition-colors"
            >
              عرض جميع الشهادات
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-soft-cream py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-10">
            الأسئلة المتكررة
          </h2>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={faqs.slice(0, 6).map((f) => ({ id: f.id, question: f.questionAr, answer: f.answerAr }))} />
            <div className="text-center mt-6">
              <Link
                href="/ar/faq"
                className="text-subtle-gold hover:text-deep-emerald font-medium transition-colors"
              >
                عرض جميع الأسئلة
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm-ivory py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-10">
            أحدث التوجيهات والمقالات
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 6).map((post) => (
              <BlogCard
                key={post.id}
                title={post.titleAr || post.title}
                slug={post.slug}
                excerpt={post.excerptAr || post.excerpt}
                category={post.categoryAr || post.category}
                image={post.image}
                date={post.date}
                readTime={post.readTime}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/ar/blog"
              className="inline-flex items-center gap-2 bg-deep-emerald hover:bg-dark-forest text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              عرض جميع المقالات
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        heading="ناقش وضعك بخصوصية"
        text="فقط أنت ستحصل على حل مشاكلك عبر مكالمة هاتفية. أرسل تفاصيلك وسيتم التواصل معك من أي مكان في العالم."
        availability="الاستشارات متاحة بالعربية والإنجليزية."
      />
    </>
  );
}
