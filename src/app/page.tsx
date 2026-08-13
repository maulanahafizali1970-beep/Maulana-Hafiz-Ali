import Link from 'next/link';
import { Heart, HeartHandshake, Users, Home, HeartOff, Shield, Scale, Sparkles, Coins, Briefcase, ShieldAlert, CheckCircle, ChevronLeft, PhoneCall, BookOpen } from 'lucide-react';
import { services } from '@/data/services';
import { testimonials } from '@/data/testimonials';
import { faqs } from '@/data/faqs';
import { countries } from '@/data/countries';
import { blogPosts } from '@/data/blog';
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
  { title: 'Wazifa', slug: '/wazifa', icon: Heart },
  { title: 'Vashikaran', slug: '/vashikaran', icon: Sparkles },
  { title: 'Court Case Solutions', slug: '/court-case-solutions', icon: Scale },
  { title: 'Buried Wealth', slug: '/buried-wealth', icon: Coins },
  { title: 'Business Obstacles', slug: '/business-obstacles', icon: Briefcase },
  { title: 'Jobs and Children Problems', slug: '/jobs-child-problems', icon: Briefcase },
];

const trustItems = [
  { title: 'Confidential Consultation', description: 'Your privacy is respected. All discussions remain completely confidential.', icon: Shield },
  { title: 'Personalized Guidance', description: 'Every situation is unique. Guidance is tailored to your specific circumstances.', icon: Heart },
  { title: 'Arabic & English Support', description: 'Consultations available in both Arabic and English for your convenience.', icon: Users },
  { title: 'Worldwide Online Service', description: 'Get work done from any corner of the world — find a solution for every problem.', icon: Home },
];

const problemsList = [
  'Court cases and legal disputes',
  'Vashikaran-related concerns',
  'Buried wealth and hidden treasure',
  'Domestic peace and family stability',
  'Business obstacles and growth',
  'Jobs and career difficulties',
  'Children problems',
  'Freedom from enemies and protection',
  'Family dispute resolution',
  'Property and inheritance disputes',
  'Misunderstandings between partners',
  'Husband-wife disagreements',
  'Family opposition to marriage',
  'Separation and divorce concerns',
  'Trust and jealousy concerns',
  'Emotional healing after rejection',
  'Fear of envy or evil eye',
  'Long-distance relationship difficulties',
];

const whyChoosePoints = [
  'Only you will get the solution to your problems over a phone call',
  'Get work done from any corner of the world',
  'A problem of any kind is rooted out in just three hours',
  'Disappointed from Tantriks? Try once for sure',
  'Confidential, respectful and personalized guidance',
];

const consultationSteps = [
  { title: 'Submit Your Details', description: 'Fill out the contact details form on this page.' },
  { title: 'Choose Your Language', description: 'Select English or Arabic for your consultation.' },
  { title: 'Receive a Call', description: 'You will be contacted over a phone call to understand your problem.' },
  { title: 'Get Your Solution', description: 'A problem of any kind is rooted out in just three hours.' },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Quick Service Strip */}
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

      {/* Key Promises Banner */}
      <section className="bg-deep-emerald py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { title: 'Solution Over a Phone Call', description: 'Only you will get the solution to your problems over a phone call' },
              { title: 'From Any Corner of the World', description: 'Get work done from any corner of the world — find a solution for every problem' },
              { title: 'Just Three Hours', description: 'A problem of any kind is rooted out in just three hours' },
              { title: 'Disappointed from Tantriks?', description: 'Try once for sure — share your problem and get guidance' },
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
                ★ Most Trusted Service
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Wazifa — The Power of Sacred Prayer for Your Every Problem
              </h2>
              <p className="text-white/80 leading-relaxed">
                Wazifa is our most requested service. Through sacred prayers and dua, guidance is
                provided for every kind of difficulty — court cases, business obstacles, family
                disputes, relationship problems and more. Only you will get the solution to your
                problems over a phone call.
              </p>
              <ul className="space-y-2">
                {[
                  'A problem of any kind is rooted out in just three hours',
                  'Get work done from any corner of the world',
                  'Disappointed from Tantriks? Try once for sure',
                  'Confidential guidance in English and Arabic',
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
                  Learn About Wazifa
                </Link>
                <Link
                  href="#contact-form"
                  className="inline-flex items-center gap-2 border-2 border-white/50 text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Submit Your Details
                </Link>
              </div>
            </div>
            <div className="space-y-5">
              <div className="bg-[#0B5D3B] border border-subtle-gold/40 rounded-2xl p-8 text-center shadow-xl">
                <div className="w-20 h-20 mx-auto rounded-full bg-subtle-gold/15 flex items-center justify-center mb-5">
                  <BookOpen className="w-10 h-10 text-subtle-gold" />
                </div>
                <h3 className="text-subtle-gold font-bold text-xl mb-3">Wazifa Consultation</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Share your problem and receive personalized wazifa guidance over a confidential
                  phone call — a solution rooted out in just three hours.
                </p>
                <div className="mt-6">
                  <Link
                    href="/wazifa"
                    className="inline-flex items-center justify-center w-full bg-white text-deep-emerald hover:bg-soft-cream px-6 py-3 rounded-lg font-bold transition-colors"
                  >
                    Start Your Wazifa
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection
        heading="Meet Maulana Hafiz Ali"
        content="Maulana Hafiz Ali offers confidential spiritual guidance to individuals and families experiencing difficult circumstances. His consultations focus on faith, patience, emotional understanding, respectful communication and practical steps toward a solution. Every situation is treated privately and individually. Only you will get the solution to your problems over a phone call."
        points={[
          'Confidential one-to-one consultation',
          'Guidance available in English and Arabic',
          'Support for clients worldwide',
          'Respectful and non-judgmental communication',
          'Personalized guidance for every situation',
        ]}
      />

      {/* Trust Indicators */}
      <section className="bg-soft-cream py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-10">
            Why People Trust Maulana Hafiz Ali
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

      {/* Main Services */}
      <section className="bg-warm-ivory py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-4">
            Guidance for Every Kind of Problem
          </h2>
          <p className="text-dark-text/70 text-center max-w-2xl mx-auto mb-10">
            A problem of any kind is rooted out in just three hours
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                excerpt={service.excerpt}
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
              href="/services"
              className="inline-flex items-center gap-2 text-subtle-gold hover:text-deep-emerald font-medium transition-colors"
            >
              View All Services
              <ChevronLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reconciliation Section */}
      <section className="bg-soft-cream py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-8">
              Seeking Reconciliation After a Breakup
            </h2>
            <div className="prose prose-lg max-w-none text-dark-text/80 space-y-4">
              <p>
                Reconciliation after separation is a delicate process that requires patience, self-reflection
                and mutual respect. Communication often breaks down when misunderstandings grow, emotions
                take over or external pressures mount.
              </p>
              <p>
                Family expectations, cultural differences and personal insecurities can all contribute to
                relationship difficulties. After a separation, it is natural to experience a range of emotions
                including sadness, hope, confusion and regret.
              </p>
              <p>
                Taking time to process these feelings is essential before making any decisions. Faith-based
                reflection can provide comfort and perspective during this difficult time.
              </p>
              <p>
                If both parties are open to communication, it should begin with honesty, respect and a
                willingness to listen. However, it is important to recognize that reconciliation must be
                based on mutual willingness, safety and respect.
              </p>
              <p className="text-dark-text/60 italic">
                No spiritual consultation can guarantee or force another person's decision.
              </p>
            </div>
            <div className="bg-subtle-gold/10 border-l-4 border-subtle-gold p-4 md:p-6 rounded-r-lg mt-8">
              <p className="text-dark-text text-sm md:text-base italic">
                Reconciliation should be based on mutual willingness, safety and respect. No spiritual
                consultation can guarantee or force another person's decision.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-8 justify-center">
              <Link
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-deep-emerald hover:bg-dark-forest text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <PhoneCall className="w-5 h-5" />
                Submit Your Details
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 border-2 border-deep-emerald text-deep-emerald hover:bg-deep-emerald hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How Consultation Works */}
      <section className="bg-warm-ivory py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-10">
            How Your Private Consultation Works
          </h2>
          <ConsultationSteps
            steps={consultationSteps}
            note="Fees, consultation duration and service details should be explained before payment. Never request sensitive banking passwords, verification codes or unnecessary private documents."
          />
        </div>
      </section>

      {/* Problems Covered */}
      <section className="bg-soft-cream py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-10">
            Problems We Help With
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

      {/* Why Choose */}
      <section className="bg-warm-ivory py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-10">
            Why People Seek Guidance from Maulana Hafiz Ali
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

      {/* Countries */}
      <section className="bg-soft-cream py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-4">
            Online Consultation Available Worldwide
          </h2>
          <p className="text-dark-text/70 text-center max-w-2xl mx-auto mb-10">
            Serving clients across the Middle East, Asia, Europe, North America and beyond
          </p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {countries.slice(0, 15).map((country, i) => (
              <div
                key={country.id}
                className="flex flex-col items-center gap-2 p-3 border border-light-border rounded-lg bg-white hover:border-subtle-gold transition-colors"
              >
                <span className={`text-2xl flag-wave flag-delay-${(i % 5) + 1}`}>{country.flag}</span>
                <span className="text-xs md:text-sm text-dark-text text-center font-medium">{country.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-warm-ivory py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-4">
            Client Experiences
          </h2>
          <p className="text-dark-text/60 text-center text-sm mb-8">
            Sample testimonial — replace with verified client feedback before publication.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard
                key={t.id}
                name={t.name}
                location={t.location}
                text={t.text}
                isSample={t.isSample}
              />
            ))}
          </div>
          <p className="text-dark-text/50 text-center text-xs mt-6">
            Individual experiences differ. Testimonials do not guarantee similar outcomes.
          </p>
          <div className="text-center mt-6">
            <Link
              href="/testimonials"
              className="text-subtle-gold hover:text-deep-emerald font-medium transition-colors"
            >
              View All Testimonials
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-soft-cream py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={faqs.slice(0, 6)} />
            <div className="text-center mt-6">
              <Link
                href="/faq"
                className="text-subtle-gold hover:text-deep-emerald font-medium transition-colors"
              >
                View All FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="bg-warm-ivory py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-10">
            Latest Guidance and Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 6).map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                category={post.category}
                image={post.image}
                date={post.date}
                readTime={post.readTime}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-deep-emerald hover:bg-dark-forest text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        heading="Discuss Your Situation Privately"
        text="Only you will get the solution to your problems over a phone call. Submit your details and be contacted from any corner of the world."
        availability="Arabic and English consultations available."
      />
    </>
  );
}
