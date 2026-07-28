import Link from 'next/link';
import { Heart, HeartHandshake, Users, Home, HeartOff, Shield, MessageCircle, Phone, CheckCircle, ChevronLeft } from 'lucide-react';
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
import { getWhatsAppUrl, getServiceMessage } from '@/lib/whatsapp';

const quickServices = [
  { title: 'Love Problem Guidance', slug: '/love-problem-guidance', icon: Heart },
  { title: 'Lost Love and Reconciliation', slug: '/lost-love-reconciliation', icon: HeartHandshake },
  { title: 'Husband and Wife Problems', slug: '/husband-wife-problems', icon: Users },
  { title: 'Marriage and Family Approval', slug: '/marriage-family-approval', icon: Home },
  { title: 'Separation Guidance', slug: '/separation-divorce-guidance', icon: HeartOff },
  { title: 'Spiritual Protection', slug: '/evil-eye-spiritual-protection', icon: Shield },
];

const trustItems = [
  { title: 'Confidential Consultation', description: 'Your privacy is respected. All discussions remain completely confidential.', icon: Shield },
  { title: 'Personalized Guidance', description: 'Every situation is unique. Guidance is tailored to your specific circumstances.', icon: MessageCircle },
  { title: 'Arabic & English Support', description: 'Consultations available in both Arabic and English for your convenience.', icon: Heart },
  { title: 'Worldwide Online Service', description: 'Connect from anywhere in the world through WhatsApp, phone or online form.', icon: Users },
];

const problemsList = [
  'Misunderstandings between partners',
  'Breakup and loss of communication',
  'Husband-wife disagreements',
  'Family opposition to marriage',
  'Trust and jealousy concerns',
  'Emotional distance',
  'Intercultural marriage difficulties',
  'Delayed marriage discussions',
  'Separation and divorce concerns',
  'One-sided attachment',
  'Family conflict',
  'Fear of envy or evil eye',
  'Emotional healing after rejection',
  'Decision-making before marriage',
  'Long-distance relationship difficulties',
];

const whyChoosePoints = [
  'Confidential and respectful communication',
  'Guidance based on each person\'s circumstances',
  'Arabic and English consultation',
  'Convenient WhatsApp and phone support',
  'Combination of spiritual reflection and practical advice',
];

const consultationSteps = [
  { title: 'Share Your Situation', description: 'Complete the form or send a private WhatsApp message.' },
  { title: 'Choose Your Language', description: 'Select English or Arabic for your consultation.' },
  { title: 'Receive Personalized Guidance', description: 'Your situation will be reviewed privately before guidance is provided.' },
  { title: 'Take Practical and Spiritual Steps', description: 'Follow respectful recommendations based on your circumstances.' },
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

      {/* About Section */}
      <AboutSection
        heading="Meet Maulana Hafiz Ali"
        content="Maulana Hafiz Ali offers confidential spiritual and relationship guidance to individuals and families experiencing difficult circumstances. His consultations focus on faith, patience, emotional understanding, respectful communication and practical steps toward reconciliation. Every situation is treated privately and individually. The purpose of the consultation is not to control another person, but to help clients understand their circumstances, seek a lawful path and make thoughtful decisions for their future."
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
            Guidance for Love, Marriage and Personal Problems
          </h2>
          <p className="text-dark-text/70 text-center max-w-2xl mx-auto mb-10">
            Confidential support for a wide range of relationship and personal concerns
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
                disclaimer={service.disclaimer}
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
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-deep-emerald hover:bg-dark-forest text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Talk Privately on WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-deep-emerald text-deep-emerald hover:bg-deep-emerald hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Phone className="w-5 h-5" />
                Request a Consultation
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
            {countries.slice(0, 15).map((country) => (
              <div
                key={country.id}
                className="flex flex-col items-center gap-2 p-3 border border-light-border rounded-lg bg-white hover:border-subtle-gold transition-colors"
              >
                <span className="text-2xl">{country.flag}</span>
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
        text="Speak with Maulana Hafiz Ali about your relationship, marriage, family or spiritual concerns through a confidential online consultation."
        availability="Arabic and English consultations available."
      />
    </>
  );
}
