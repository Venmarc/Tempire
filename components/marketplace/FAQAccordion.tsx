'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  { q: "What exactly is a digital asset marketplace?", a: "A digital asset marketplace like Tempire is a curated platform where creators can buy and sell professional resources like code templates, UI kits, and design files to accelerate their creative workflows." },
  { q: "Can I use these assets for commercial projects?", a: "Absolutely. Every purchase on Tempire comes with a commercial license that allows you to use the assets in an unlimited number of personal and client projects without attribution." },
  { q: "What technology stack do the templates use?", a: "We focus on the modern web stack. Most of our code assets are built with Next.js 16, TypeScript, Tailwind CSS, and Supabase to ensure they are production-ready from day one." },
  { q: "How do I receive my purchase?", a: "Upon successful checkout, your assets are instantly added to your personal Library. You receive secure, lifetime access to download the source files whenever you need them." },
  { q: "Do you offer refunds?", a: "Due to the digital nature of our products (source code access), we generally don't offer refunds. However, if an asset is technically broken or mis-represented, our support team will make it right." }
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div 
          key={i} 
          className={cn(
            "rounded-3xl border transition-all duration-300 overflow-hidden",
            openIndex === i 
              ? "bg-zinc-900 border-white/20 shadow-2xl shadow-black/40" 
              : "bg-zinc-900/50 border-white/5 hover:border-white/10"
          )}
        >
          <button
            onClick={() => toggle(i)}
            className="w-full flex items-center justify-between p-6 text-left group"
          >
            <span className={cn(
              "text-lg font-bold transition-colors",
              openIndex === i ? "text-white" : "text-zinc-300 group-hover:text-white"
            )}>
              {faq.q}
            </span>
            <ChevronDown className={cn(
              "w-5 h-5 text-zinc-500 transition-transform duration-500",
              openIndex === i && "rotate-180 text-emerald-500"
            )} />
          </button>
          
          <div 
            className={cn(
              "grid transition-all duration-500 ease-in-out",
              openIndex === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div className="p-6 pt-0 text-zinc-400 text-sm leading-relaxed max-w-2xl">
                {faq.a}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
