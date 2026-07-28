'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const isOpen = openIds.has(faq.id);
        return (
          <div
            key={faq.id}
            className="border border-light-border rounded-xl bg-warm-ivory overflow-hidden"
          >
            <button
              onClick={() => toggle(faq.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${faq.id}`}
              className="flex items-center justify-between w-full px-5 py-4 text-left text-dark-text font-medium hover:bg-soft-cream transition-colors"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-subtle-gold shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              id={`faq-answer-${faq.id}`}
              role="region"
              style={{ maxHeight: isOpen ? '500px' : '0' }}
              className="transition-[max-height] duration-300 ease-in-out overflow-hidden"
            >
              <div className="px-5 pb-4 text-sm text-dark-text/70 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
