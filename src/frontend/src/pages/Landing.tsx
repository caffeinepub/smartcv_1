import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Award,
  Briefcase,
  Check,
  Download,
  FileText,
  Mail,
  Shield,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import TemplateCard from "../components/templates/TemplateCard";
import StarRating from "../components/ui/StarRating";
import { useAuth } from "../context/AuthContext";
import { templates } from "../data/templates";
import { testimonials } from "../data/testimonials";

const STATS = [
  { label: "Resumes Created", value: "50K+", icon: FileText },
  { label: "Templates", value: "40+", icon: Award },
  { label: "Success Rate", value: "95%", icon: TrendingUp },
  { label: "User Rating", value: "4.9/5", icon: Star },
];

const FEATURES = [
  {
    icon: FileText,
    title: "Resume Builder",
    desc: "Step-by-step wizard with real-time preview. Build a professional resume in minutes.",
  },
  {
    icon: Mail,
    title: "Cover Letters",
    desc: "Pre-designed templates with AI writing assistance for every job application.",
  },
  {
    icon: Zap,
    title: "AI-Powered",
    desc: "Grammar correction, phrasing suggestions, and content improvements powered by AI.",
  },
  {
    icon: Download,
    title: "PDF Export",
    desc: "Download print-ready, high-quality PDFs of your resume and cover letter instantly.",
  },
  {
    icon: Briefcase,
    title: "Job Board",
    desc: "Search and filter thousands of job listings and bookmark your favorites.",
  },
  {
    icon: Shield,
    title: "ATS Optimized",
    desc: "All templates scored and optimized for applicant tracking systems.",
  },
];

const PRICING = [
  {
    name: "Free",
    price: { monthly: "$0", annual: "$0" },
    desc: "Perfect for getting started",
    features: [
      "15 free templates",
      "1 resume",
      "1 cover letter",
      "Basic PDF export",
      "Job board browsing",
    ],
    cta: "Get Started Free",
    highlight: false,
    plan: "free" as const,
  },
  {
    name: "Pro",
    price: { monthly: "$12", annual: "$9" },
    desc: "For serious job seekers",
    features: [
      "All paid templates (30+)",
      "Unlimited resumes",
      "Unlimited cover letters",
      "High-quality PDF export",
      "AI writing suggestions",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    highlight: true,
    plan: "paid" as const,
  },
  {
    name: "Premium",
    price: { monthly: "$29", annual: "$22" },
    desc: "For power users and executives",
    features: [
      "All 40 templates",
      "Advanced AI features",
      "Custom branding",
      "Job board full access",
      "Resume analytics",
      "24/7 priority support",
    ],
    cta: "Go Premium",
    highlight: false,
    plan: "premium" as const,
  },
];

const currentYear = new Date().getFullYear();

const FOOTER_LINKS = {
  Product: [
    { label: "Resume Builder", to: "/resume/new" },
    { label: "Cover Letters", to: "/cover-letter/new" },
    { label: "Templates", to: "/templates" },
    { label: "Job Board", to: "/jobs" },
    { label: "Pricing", to: "/pricing" },
  ],
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Service", to: "/terms" },
  ],
};

const SOCIAL_LINKS = [
  { Icon: SiX, label: "X (Twitter)", href: "https://x.com" },
  { Icon: SiLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { Icon: SiGithub, label: "GitHub", href: "https://github.com" },
];

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [billing, setBilling] = React.useState<"monthly" | "annual">("monthly");

  const previewTemplates = templates.slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar — sticky, stays on top of everything including the hero */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm bg-primary">
              S
            </div>
            <span className="font-bold text-lg">
              Smart<span className="text-primary">CV</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              to="/templates"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="nav.templates.link"
            >
              Templates
            </Link>
            <Link
              to="/pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="nav.pricing.link"
            >
              Pricing
            </Link>
            <Link
              to="/jobs"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="nav.jobs.link"
            >
              Jobs
            </Link>
            <Link
              to="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="nav.about.link"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Button
                onClick={() => navigate("/dashboard")}
                data-ocid="nav.dashboard.button"
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    data-ocid="nav.login.button"
                  >
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" data-ocid="nav.signup.button">
                    Get Started Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ───────────────── HERO ─────────────────
          Deep vibrant blue gradient background, all text white.
          The 3-D depth comes from the layered radial glow overlay.
      ────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 px-6"
        style={{
          background:
            "linear-gradient(135deg, #0a1628 0%, #1a3a8f 40%, #0d5bb5 70%, #0a2d6e 100%)",
        }}
      >
        {/* Glow overlay for 3-D / depth effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 60% 40%, rgba(99,179,237,0.18) 0%, rgba(26,58,143,0.10) 50%, transparent 100%)",
          }}
        />
        {/* Subtle bottom fade to merge into the next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(10,22,40,0.35))",
          }}
        />

        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge — white border variant so it pops on blue */}
              <Badge
                className="mb-4 border-white/40 text-white bg-white/10 hover:bg-white/20"
                variant="outline"
              >
                ✨ 40+ ATS-Optimized Templates
              </Badge>

              {/* Main headline — white text, accent word in bright cyan */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Build Your <span className="text-cyan-300">Dream CV</span> with
                SmartCV
              </h1>

              {/* Subtext — soft white */}
              <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto lg:mx-0">
                Create professional resumes and cover letters with AI
                assistance, 40+ premium templates, and real-time PDF export. Get
                hired faster.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={() =>
                    navigate(isAuthenticated ? "/dashboard" : "/signup")
                  }
                  className="gap-2 bg-white text-blue-900 hover:bg-blue-50 font-semibold shadow-lg shadow-black/20"
                  data-ocid="hero.cta.primary_button"
                >
                  Get Started Free <ArrowRight size={18} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/templates")}
                  className="border-white/50 text-white hover:bg-white/10 hover:border-white"
                  data-ocid="hero.cta.secondary_button"
                >
                  View Templates
                </Button>
              </div>

              {/* Fine print — muted white */}
              <p className="text-xs text-white/60 mt-4">
                No credit card required · Free forever plan
              </p>
            </motion.div>

            <motion.div
              className="flex-1 w-full max-w-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                <div className="h-8 bg-blue-950/70 flex items-center px-3 gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="bg-blue-950/60 p-4">
                  <div
                    className="rounded-lg p-4 text-white text-xs"
                    style={{
                      background:
                        "linear-gradient(135deg, #0a1628 0%, #1a3a8f 100%)",
                      minHeight: "200px",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded flex items-center justify-center text-blue-900 font-bold text-xs bg-cyan-300">
                        S
                      </div>
                      <span className="font-bold">
                        Smart
                        <span className="text-cyan-300">CV</span>
                      </span>
                    </div>
                    <p className="text-white/70 text-xs mb-2">Dashboard</p>
                    <p className="font-bold text-sm mb-3">
                      Welcome Back, Alex!
                    </p>
                    <div className="bg-white/10 rounded-lg p-3 mb-3">
                      <p className="text-white/80 text-xs mb-1">
                        Alex's Tech Resume
                      </p>
                      <div className="w-full bg-white/20 rounded-full h-1.5">
                        <div
                          className="h-full rounded-full bg-cyan-300"
                          style={{ width: "72%" }}
                        />
                      </div>
                      <p className="text-right text-xs text-white/60 mt-0.5">
                        72%
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {["Modern", "Executive", "Tech"].map((t) => (
                        <div
                          key={t}
                          className="bg-white/10 rounded p-2 text-center"
                        >
                          <div className="h-8 bg-white/20 rounded mb-1" />
                          <p className="text-xs text-white/70">{t}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 border-y border-border bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <stat.icon size={24} className="mx-auto mb-2 text-primary" />
                <div className="text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything you need to land the job
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              SmartCV combines AI writing assistance, beautiful templates, and
              smart tools to give you the edge in any job market.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                className="p-6 bg-card border border-border rounded-xl hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-primary/10">
                  <f.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Preview */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Featured Templates
              </h2>
              <p className="text-muted-foreground">
                Choose from 40 professionally designed templates.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/templates")}
              data-ocid="landing.view_all_templates.button"
            >
              View All 40 <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {previewTemplates.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                compact
                onUse={() => navigate("/resume/new")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground mb-6">
              Start free, upgrade when you need more.
            </p>
            <div className="inline-flex items-center gap-1 p-1 bg-muted rounded-lg">
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  billing === "monthly"
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground"
                }`}
                data-ocid="pricing.monthly.toggle"
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling("annual")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  billing === "annual"
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground"
                }`}
                data-ocid="pricing.annual.toggle"
              >
                Annual <span className="text-xs text-green-600 ml-1">-25%</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map((tier) => (
              <div
                key={tier.name}
                className={`p-6 rounded-2xl border ${
                  tier.highlight
                    ? "border-primary shadow-lg shadow-primary/10 relative"
                    : "border-border bg-card"
                }`}
                style={
                  tier.highlight
                    ? { background: "oklch(0.28 0.04 252 / 0.04)" }
                    : {}
                }
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="font-bold text-lg text-foreground mb-1">
                  {tier.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {tier.desc}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">
                    {tier.price[billing]}
                  </span>
                  {tier.price.monthly !== "$0" && (
                    <span className="text-muted-foreground text-sm">/mo</span>
                  )}
                </div>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check size={14} className="text-primary shrink-0" />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={tier.highlight ? "default" : "outline"}
                  onClick={() =>
                    navigate(isAuthenticated ? "/pricing" : "/signup")
                  }
                  data-ocid={`pricing.${tier.plan}.cta.button`}
                >
                  {tier.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Trusted by Job Seekers Worldwide
            </h2>
            <p className="text-muted-foreground">
              Real reviews from real users who landed their dream jobs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                className="bg-card border border-border rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <StarRating rating={t.rating} className="mb-3" />
                <p className="text-sm text-foreground leading-relaxed mb-4">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold bg-primary">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.role} at {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-6">
        <div
          className="max-w-4xl mx-auto rounded-2xl p-10 text-center text-white"
          style={{ background: "linear-gradient(135deg, #0f1b40, #1a3a8f)" }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Build your dream CV with SmartCV
          </h2>
          <p className="text-white/80 mb-8">
            Join over 50,000 job seekers who've landed their dream jobs using
            SmartCV.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-900 hover:bg-blue-50 font-semibold"
            onClick={() => navigate(isAuthenticated ? "/dashboard" : "/signup")}
            data-ocid="landing.cta_banner.primary_button"
          >
            Get Started Free — It's Free Forever
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded flex items-center justify-center text-white font-bold text-sm bg-primary">
                  S
                </div>
                <span className="font-bold">
                  Smart<span className="text-primary">CV</span>
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Build professional resumes and cover letters with AI-powered
                tools and 40+ templates.
              </p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <h4 className="font-semibold text-sm text-foreground mb-3">
                  {section}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
            <p>
              &copy; {currentYear}. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
