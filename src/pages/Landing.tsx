import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  HardHat, Star, Shield, Zap, Users, CheckCircle2, ArrowRight,
  Building2, Hammer, Wrench, PaintBucket, ChevronDown, Play,
  TrendingUp, Award, Clock, MapPin, Phone, Mail, Menu, X,
  Home, Layers, BarChart3, Sparkles, Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: "Sarah Mitchell", role: "Homeowner, Nairobi", text: "Found my contractor in under 10 minutes. The project was done on time and on budget — I couldn't be happier.", rating: 5, avatar: "SM" },
  { name: "James Odhiambo", role: "Contractor, Mombasa", text: "BuildHub tripled my monthly bookings. The platform is slick and clients actually show up — huge upgrade from referrals.", rating: 5, avatar: "JO" },
  { name: "Priya Nair", role: "Property Developer, Kisumu", text: "Managing 6 active projects simultaneously is finally manageable. The design gallery alone is worth the subscription.", rating: 5, avatar: "PN" },
  { name: "David Kamau", role: "Homeowner, Eldoret", text: "I used 3 other platforms before this. Nothing comes close — the vetted reviews give me real confidence.", rating: 5, avatar: "DK" },
];

// ── Stats ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "12,400+", label: "Vetted contractors" },
  { value: "98%", label: "Client satisfaction" },
  { value: "48h", label: "Avg. first booking" },
  { value: "KSh 2.4B+", label: "Projects completed" },
];

// ── Services ──────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: Home, title: "Residential", desc: "Extensions, renovations, new builds, interior fit-outs." },
  { icon: Building2, title: "Commercial", desc: "Office fit-outs, warehouse construction, retail spaces." },
  { icon: Hammer, title: "Structural", desc: "Foundation work, steel framing, concrete specialists." },
  { icon: PaintBucket, title: "Finishing", desc: "Painting, tiling, plastering, carpentry & joinery." },
  { icon: Wrench, title: "MEP", desc: "Electrical, plumbing, HVAC — certified & insured." },
  { icon: Layers, title: "Design & Build", desc: "Architecture, interior design, 3D visualization." },
];

// ── Pricing ───────────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: "Homeowner",
    price: "Free",
    sub: "forever",
    cta: "Get started",
    features: ["Post unlimited projects", "Browse & compare contractors", "Secure booking system", "In-app messaging", "Review & rating access"],
    highlight: false,
  },
  {
    name: "Pro Contractor",
    price: "KSh 2,999",
    sub: "/ month",
    cta: "Start free trial",
    features: ["Featured profile listing", "Unlimited bid submissions", "Portfolio showcase (50 photos)", "Analytics dashboard", "Priority support", "Verified badge"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    sub: "pricing",
    cta: "Contact sales",
    features: ["Multi-contractor management", "White-label option", "API access", "Dedicated account manager", "Custom integrations", "SLA guarantee"],
    highlight: false,
  },
];

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "How are contractors vetted?", a: "Every contractor undergoes ID verification, certificate checks, reference interviews, and a background check before appearing on the platform." },
  { q: "Is there a fee to post a project?", a: "Posting is completely free for homeowners. We charge contractors a subscription fee to access bids and leads." },
  { q: "Can I get a refund if work is unsatisfactory?", a: "Yes — our Escrow Payment system holds funds until you approve milestone completion. Disputes are handled by our resolution team." },
  { q: "How quickly can I get matched?", a: "Most homeowners receive 3–5 contractor proposals within 24 hours of posting. Urgent jobs are typically matched within 2 hours." },
  { q: "Do contractors carry insurance?", a: "All Pro-tier contractors are required to provide proof of public liability insurance before activation." },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-card/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-gradient-accent flex items-center justify-center shadow-md">
              <Building2 className="h-4 w-4 text-white" />
            </div>
            <span className={cn("text-base font-bold tracking-tight transition-colors", scrolled ? "text-foreground" : "text-white")}>
              BuildHub
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {["Services","How it works","Pricing","FAQ"].map((label) => (
              <a key={label} href={`#${label.toLowerCase().replace(/\s+/g,"-")}`}
                className={cn("text-sm font-medium transition-colors hover:text-accent", scrolled ? "text-muted-foreground" : "text-white/80")}>
                {label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className={cn(scrolled ? "" : "text-white/80 hover:text-white hover:bg-white/10")}>
              <Link to="/auth/login">Log in</Link>
            </Button>
            <Button asChild size="sm" className="bg-accent hover:bg-accent-hover text-white shadow-md">
              <Link to="/auth/register">Get started free</Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button className={cn("md:hidden p-2 rounded-lg", scrolled ? "text-foreground" : "text-white")}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-b border-border px-4 py-4 space-y-3 animate-slide-up">
            {["Services","How it works","Pricing","FAQ"].map((label) => (
              <a key={label} href={`#${label.toLowerCase().replace(/\s+/g,"-")}`}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}>
                {label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link to="/auth/login">Log in</Link>
              </Button>
              <Button asChild size="sm" className="flex-1 bg-accent hover:bg-accent-hover text-white">
                <Link to="/auth/register">Sign up free</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden noise-overlay">
        {/* Animated grid */}
        <div className="pointer-events-none absolute inset-0 opacity-10"
          style={{ backgroundImage: "linear-gradient(hsl(0 0% 100% / 0.08) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.08) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Floating orbs */}
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-pulse" />
        <div className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-primary/40 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8 animate-slide-up">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-medium text-white/90">Kenya's #1 Construction Marketplace</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6 animate-slide-up" style={{ animationDelay: "0.05s" }}>
            Build your vision<br />
            <span className="text-gradient-accent">with confidence</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Connect with vetted contractors, manage projects end-to-end, and bring
            your construction dreams to life — all in one platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14 animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <Button asChild size="lg" className="bg-accent hover:bg-accent-hover text-white shadow-elegant gap-2 h-12 px-8 text-base">
              <Link to="/auth/register">
                Start for free <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white bg-white/10 hover:bg-white/20 h-12 px-8 text-base gap-2 backdrop-blur-sm">
              <Link to="/auth/login">
                <Play className="h-4 w-4" /> View demo
              </Link>
            </Button>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            {[
              { icon: Shield, text: "Verified contractors" },
              { icon: Star, text: "4.9/5 avg rating" },
              { icon: Zap, text: "Match in 24h" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-white/70">
                <Icon className="h-4 w-4 text-accent" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 animate-bounce">
          <ChevronDown className="h-5 w-5" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-primary py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{value}</div>
                <div className="text-sm text-white/60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">How it works</Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-4">From idea to completed project</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Three simple steps separate you from a world-class build.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            {[
              { step: "01", icon: Layers, title: "Post your project", desc: "Describe your project, set your timeline, and post it to our network instantly — no account needed to browse." },
              { step: "02", icon: Users, title: "Compare proposals", desc: "Receive tailored proposals from vetted contractors. Compare profiles, portfolios, ratings, and prices side-by-side." },
              { step: "03", icon: CheckCircle2, title: "Build with confidence", desc: "Book your contractor, track milestones, and release payments only when you're satisfied." },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="relative flex flex-col items-center text-center p-8 rounded-2xl border border-border/60 bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-white shadow-md">
                  {step}
                </div>
                <div className="mt-4 h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Services</Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Every trade, covered</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Specialists for every phase of your build, all in one marketplace.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group p-6 rounded-2xl border border-border/60 bg-card hover:border-accent/40 hover:shadow-md transition-all cursor-default">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:from-accent/20 group-hover:to-amber-500/10 transition-colors">
                  <Icon className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-semibold mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF / TESTIMONIALS ── */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Testimonials</Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Trusted by thousands</h2>
          </div>

          {/* Featured testimonial */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative p-8 rounded-3xl border border-border/60 bg-card shadow-elegant">
              <Quote className="absolute top-6 left-6 h-8 w-8 text-accent/30" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: TESTIMONIALS[activeTestimonial].rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-lg text-foreground leading-relaxed mb-6 pl-4">
                "{TESTIMONIALS[activeTestimonial].text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-white">
                  {TESTIMONIALS[activeTestimonial].avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold">{TESTIMONIALS[activeTestimonial].name}</div>
                  <div className="text-xs text-muted-foreground">{TESTIMONIALS[activeTestimonial].role}</div>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  className={cn("h-2 rounded-full transition-all", i === activeTestimonial ? "w-6 bg-accent" : "w-2 bg-border")} />
              ))}
            </div>
          </div>

          {/* Mini testimonials */}
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {TESTIMONIALS.filter((_, i) => i !== activeTestimonial).slice(0, 2).map((t) => (
              <div key={t.name} className="p-5 rounded-2xl border border-border/50 bg-card/50">
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-accent text-accent" />)}
                </div>
                <p className="text-sm text-muted-foreground mb-3">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-gradient-primary flex items-center justify-center text-[10px] font-bold text-white">{t.avatar}</div>
                  <span className="text-xs font-medium">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Pricing</Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Start free. Upgrade when you're ready to scale.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {PLANS.map((plan) => (
              <div key={plan.name} className={cn(
                "relative p-8 rounded-2xl border transition-shadow",
                plan.highlight
                  ? "border-accent bg-gradient-to-br from-primary to-primary/90 text-white shadow-elegant scale-[1.03]"
                  : "border-border/60 bg-card shadow-sm hover:shadow-md"
              )}>
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-white shadow-md px-3">Most popular</Badge>
                  </div>
                )}
                <div className={cn("text-xs font-semibold uppercase tracking-widest mb-2", plan.highlight ? "text-white/60" : "text-muted-foreground")}>{plan.name}</div>
                <div className="mb-1">
                  <span className={cn("text-4xl font-bold", plan.highlight ? "text-white" : "text-foreground")}>{plan.price}</span>
                  <span className={cn("text-sm ml-1", plan.highlight ? "text-white/60" : "text-muted-foreground")}>{plan.sub}</span>
                </div>
                <div className="my-6 space-y-3">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle2 className={cn("h-4 w-4 shrink-0", plan.highlight ? "text-accent" : "text-success")} />
                      <span className={plan.highlight ? "text-white/90" : "text-foreground"}>{f}</span>
                    </div>
                  ))}
                </div>
                <Button asChild size="sm" className={cn("w-full", plan.highlight ? "bg-accent hover:bg-accent-hover text-white" : "")}>
                  <Link to="/auth/register">{plan.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden noise-overlay">
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <TrendingUp className="h-10 w-10 text-accent mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">Ready to build something great?</h2>
          <p className="text-white/70 text-lg mb-8">Join 12,000+ homeowners and contractors already growing on BuildHub.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent-hover text-white h-12 px-8 text-base gap-2">
              <Link to="/auth/register">Create free account <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white bg-white/10 hover:bg-white/20 h-12 px-8 text-base backdrop-blur-sm">
              <Link to="/auth/login">Log in</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">FAQ</Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Questions & answers</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <div key={q} className="border border-border/60 rounded-xl overflow-hidden bg-card">
                <button className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-medium hover:bg-muted/40 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{q}</span>
                  <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", openFaq === i && "rotate-180")} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3 animate-slide-up">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-primary text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-8 w-8 rounded-xl bg-gradient-accent flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-lg">BuildHub</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Kenya's most trusted construction marketplace — connecting homeowners with world-class contractors.
              </p>
              <div className="flex gap-4 mt-6">
                {[{ icon: Phone, text: "+254 700 000 000" }, { icon: Mail, text: "hello@buildhub.co.ke" }].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5 text-xs text-white/60">
                    <Icon className="h-3.5 w-3.5" />{text}
                  </div>
                ))}
              </div>
            </div>
            {[
              { heading: "Platform", links: ["Browse contractors", "Post a project", "Design gallery", "Pricing"] },
              { heading: "Company", links: ["About us", "Blog", "Careers", "Privacy policy"] },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{heading}</div>
                <ul className="space-y-2.5">
                  {links.map((l) => (
                    <li key={l}><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <span>© {new Date().getFullYear()} BuildHub Kenya. All rights reserved.</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              <span>Nairobi, Kenya</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
