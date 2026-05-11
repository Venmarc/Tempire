import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FAQAccordion } from '@/components/marketplace/FAQAccordion';

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section (Laws 1, 2, 3, 17) */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden flex flex-col items-center text-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-800/40 via-zinc-950 to-zinc-950 -z-10" />

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Tempire v2.0 is Live
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tighter max-w-5xl mb-8 leading-[0.95] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
                    Build your empire,<br />one template at a time.
                </h1>

                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    Discover high-quality code templates, UI kits, and design resources to accelerate your next project. Pay once, own forever.
                </p>

                <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
                    <Link href="/browse">
                        <Button size="lg" className="h-14 px-8 text-lg rounded-full font-bold bg-white text-black hover:bg-zinc-200 transition-all hover:scale-105">
                            Explore the Marketplace
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Social Proof Bar (Laws 4, 24) */}
            <section className="py-10 border-y border-white/5 bg-zinc-950/50">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-70">
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-950 flex items-center justify-center text-[10px] text-zinc-500 font-bold overflow-hidden">
                                    {/* Placeholder avatar */}
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                        </div>
                        <span className="text-sm font-semibold tracking-wide ml-2">Join 10,000+ creators building the future.</span>
                    </div>
                    <div className="hidden md:block w-px h-8 bg-white/10" />
                    <div className="flex items-center gap-4">
                        <div className="flex items-center text-amber-500">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-4 h-4 fill-current" />
                            ))}
                        </div>
                        <span className="text-sm font-semibold tracking-wide">4.9/5 Average Rating</span>
                    </div>
                </div>
            </section>

            {/* The Tempire Standard (Value Prop Expansion) */}
            <section className="py-24 px-6 border-b border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Vetted Excellence</h3>
                            <p className="text-zinc-400 leading-relaxed">
                                Every asset on Tempire adheres to the Tempire Standard. We verify code performance, design accessibility, and documentation clarity so you can build with confidence.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                <Star className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Lifetime Ownership</h3>
                            <p className="text-zinc-400 leading-relaxed">
                                No recurring subscriptions or hidden fees. Pay once for any digital product and receive lifetime access to the source files, including all future updates and patches.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Production Ready</h3>
                            <p className="text-zinc-400 leading-relaxed">
                                Our templates are built using the modern stack: Next.js 16, Tailwind CSS 4, and TypeScript. They aren't just demos—they are production-ready engines for your business.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works (Law 22: Exactly 3 Steps) */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">From idea to launch in minutes.</h2>
                        <p className="text-zinc-400 text-lg">A simple, transparent process designed for speed.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

                        {[
                            { step: '01', title: 'Discover Premium Assets', desc: 'Browse our curated catalog of high-fidelity templates, UI kits, and code boilerplates.' },
                            { step: '02', title: 'Secure, One-Time Payment', desc: 'No subscriptions. Purchase your asset securely and get instant access to the source files.' },
                            { step: '03', title: 'Instant Lifetime Access', desc: 'Download immediately and use the assets in your personal and commercial projects forever.' }
                        ].map((item, index) => (
                            <div key={index} className="relative flex flex-col items-center text-center group">
                                <div className="w-24 h-24 rounded-3xl bg-zinc-900 border border-white/5 flex items-center justify-center text-3xl font-black text-white/20 mb-8 group-hover:bg-zinc-800 group-hover:text-white transition-all duration-500 relative z-10">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Showcase (Law 10: Actual Screenshots) */}
            <section className="py-24 px-6 bg-zinc-900/30">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Built by pros. <br />For pros.</h2>
                            <p className="text-zinc-400 text-lg max-w-md">Every asset on Tempire is vetted for quality, performance, and design excellence.</p>
                        </div>
                        <Link href="/browse">
                            <Button variant="outline" className="rounded-full border-white/10 hover:bg-white hover:text-black">
                                View Full Catalog
                            </Button>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Placeholder for actual product screenshot 1 */}
                        <div className="group rounded-3xl bg-zinc-900 border border-white/5 overflow-hidden aspect-4/3 relative flex flex-col items-center justify-center text-zinc-500 hover:border-white/20 transition-all">
                            <div className="absolute inset-x-0 top-0 h-12 border-b border-white/5 flex items-center px-4 gap-2 bg-black/40 backdrop-blur-sm z-20">
                                <div className="w-3 h-3 rounded-full bg-red-500/40" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/40" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/40" />
                            </div>
                            <Image src="/images/mockups/saas-dashboard.png" alt="SaaS Dashboard Mockup" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8 z-20">
                                <div>
                                    <h4 className="text-white font-bold text-xl">SaaS Dashboard Kit</h4>
                                    <p className="text-zinc-300">Figma & React Components</p>
                                </div>
                            </div>
                        </div>

                        {/* Placeholder for actual product screenshot 2 */}
                        <div className="group rounded-3xl bg-zinc-900 border border-white/5 overflow-hidden aspect-4/3 relative flex flex-col items-center justify-center text-zinc-500 hover:border-white/20 transition-all md:translate-y-12">
                            <div className="absolute inset-x-0 top-0 h-12 border-b border-white/5 flex items-center px-4 gap-2 bg-black/40 backdrop-blur-sm z-20">
                                <div className="w-3 h-3 rounded-full bg-red-500/40" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/40" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/40" />
                            </div>
                            <Image src="/images/mockups/nextjs-starter.png" alt="Next.js Boilerplate Mockup" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8 z-20">
                                <div>
                                    <h4 className="text-white font-bold text-xl">Next.js Supabase Starter</h4>
                                    <p className="text-zinc-300">Full-stack production ready</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fuel for the Creator Economy (Long-form SEO Text) */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                            Fueling the next generation of digital builders.
                        </h2>
                        <div className="prose prose-invert prose-zinc max-w-none text-zinc-400 text-lg leading-relaxed space-y-6">
                            <p>
                                The digital landscape is evolving at a breakneck pace. For developers, designers, and entrepreneurs, the biggest bottleneck isn't a lack of ideas—it's the time required to build the foundational infrastructure for every new project. From setting up authentication and database schemas to crafting accessible UI components, the "pre-work" can often kill momentum before the first line of business logic is even written.
                            </p>
                            <p>
                                <strong>Tempire was born to solve this.</strong> We believe that creators should spend their time on what makes their project unique, not on reinventing the wheel. By providing a curated marketplace of high-fidelity digital assets, we enable a "Lego-style" approach to development.
                            </p>
                            <p>
                                Whether you're a freelancer looking to deliver client work 5x faster, or a founder aiming to launch a MVP in a weekend, our library of Next.js templates, Tailwind UI kits, and AI prompt engineering resources are designed to be the architectural bedrock of your success.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories of Excellence (Asset Breakdown) */}
            <section className="py-32 px-6 bg-white/2 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">A Universe of Assets</h2>
                        <p className="text-zinc-400 text-lg">Every niche, every stack, every tool you need.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'SaaS Boilerplates', desc: 'Full-stack Next.js 16 starters with built-in auth, Stripe, and Supabase integrations.' },
                            { title: 'UI & Design Kits', desc: 'Premium Figma files and React component libraries designed with a focus on high-fidelity aesthetics.' },
                            { title: 'AI & Data Tools', desc: 'Expertly crafted prompt engineering libraries and data visualization templates for modern AI apps.' },
                            { title: 'Niche Templates', desc: 'Specialized resources for Notion, Framer, and Webflow to power your content and operations.' }
                        ].map((cat, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-zinc-900 border border-white/5 hover:border-white/20 transition-all group">
                                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">{cat.title}</h4>
                                <p className="text-sm text-zinc-500 leading-relaxed">{cat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial (Law 11) */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-zinc-800 border-4 border-zinc-900 shadow-2xl mb-8 flex items-center justify-center text-2xl font-bold text-zinc-500">
                        {/* Placeholder Avatar */}
                        JD
                    </div>
                    <h3 className="text-2xl md:text-4xl font-semibold tracking-tight leading-relaxed mb-8">
                        "The quality of assets on Tempire is unmatched. I saved over 40 hours of development time on my last client project just by grabbing a UI kit from here. It paid for itself 10x over."
                    </h3>
                    <div className="font-bold text-lg">John Doe</div>
                    <div className="text-zinc-500">Senior Frontend Engineer</div>
                </div>
            </section>

            {/* Bottom CTA & Trust Badges (Law 37) */}
            <section className="py-32 px-6 border-t border-white/5 bg-zinc-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950 to-zinc-950 -z-10" />
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">Ready to elevate your work?</h2>
                    <Link href="/browse">
                        <Button size="lg" className="h-16 px-10 text-xl rounded-full font-bold bg-white text-black hover:bg-zinc-200 transition-all hover:scale-105 mb-8">
                            Get Started Now
                        </Button>
                    </Link>

                    <div className="flex items-center justify-center gap-6 text-sm font-medium text-zinc-500">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            Instant Delivery
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            🔒 Secured with SSL
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section (SEO Keywords) */}
            <section className="py-24 px-6 bg-zinc-950">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-center mb-16">Frequently Asked Questions</h2>
                    <FAQAccordion />
                </div>
            </section>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@graph': [
                            {
                                '@type': 'Organization',
                                '@id': 'https://tempire.xyz/#organization',
                                'name': 'Tempire',
                                'url': 'https://tempire.xyz',
                                'logo': 'https://tempire.xyz/logo.svg',
                                'sameAs': [
                                    'https://twitter.com/tempire_xyz',
                                    'https://github.com/tempire'
                                ]
                            },
                            {
                                '@type': 'WebSite',
                                '@id': 'https://tempire.xyz/#website',
                                'url': 'https://tempire.xyz',
                                'name': 'Tempire',
                                'description': 'Build your empire, one template at a time.',
                                'publisher': { '@id': 'https://tempire.xyz/#organization' },
                                'potentialAction': [
                                    {
                                        '@type': 'SearchAction',
                                        'target': 'https://tempire.xyz/browse?q={search_term_string}',
                                        'query-input': 'required name=search_term_string'
                                    }
                                ]
                            },
                            {
                                '@type': 'FAQPage',
                                'mainEntity': [
                                    {
                                        '@type': 'Question',
                                        'name': 'What exactly is a digital asset marketplace?',
                                        'acceptedAnswer': {
                                            '@type': 'Answer',
                                            'text': 'A digital asset marketplace like Tempire is a curated platform where creators can buy and sell professional resources like code templates, UI kits, and design files to accelerate their creative workflows.'
                                        }
                                    },
                                    {
                                        '@type': 'Question',
                                        'name': 'Can I use these assets for commercial projects?',
                                        'acceptedAnswer': {
                                            '@type': 'Answer',
                                            'text': 'Absolutely. Every purchase on Tempire comes with a commercial license that allows you to use the assets in an unlimited number of personal and client projects without attribution.'
                                        }
                                    },
                                    {
                                        '@type': 'Question',
                                        'name': 'What technology stack do the templates use?',
                                        'acceptedAnswer': {
                                            '@type': 'Answer',
                                            'text': 'We focus on the modern web stack. Most of our code assets are built with Next.js 16, TypeScript, Tailwind CSS, and Supabase to ensure they are production-ready from day one.'
                                        }
                                    },
                                    {
                                        '@type': 'Question',
                                        'name': 'How do I receive my purchase?',
                                        'acceptedAnswer': {
                                            '@type': 'Answer',
                                            'text': 'Upon successful checkout, your assets are instantly added to your personal Library. You receive secure, lifetime access to download the source files whenever you need them.'
                                        }
                                    }
                                ]
                            }
                        ]
                    })
                }}
            />
        </div>
    );
}
