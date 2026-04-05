import { Heart, Lightbulb, Target, Users } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const TEAM = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former Google PM with 10 years in career tech. Passionate about democratizing access to career tools.",
    avatar: "SC",
  },
  {
    name: "Marcus Williams",
    role: "CTO & Co-Founder",
    bio: "ex-Stripe engineer, Stanford CS. Built SmartCV's AI infrastructure from the ground up.",
    avatar: "MW",
  },
  {
    name: "Priya Nair",
    role: "Head of Design",
    bio: "Award-winning UX designer from IDEO. Believes great design can transform how people present themselves.",
    avatar: "PN",
  },
  {
    name: "James Okafor",
    role: "Head of Growth",
    bio: "Growth expert with experience at Duolingo and Notion. Loves helping job seekers find their next opportunity.",
    avatar: "JO",
  },
];

const VALUES = [
  {
    icon: Heart,
    title: "User First",
    desc: "Every decision starts with the question: does this make our users' career journeys easier?",
  },
  {
    icon: Target,
    title: "Quality Over Quantity",
    desc: "We craft every template and feature with meticulous attention to detail and ATS compatibility.",
  },
  {
    icon: Users,
    title: "Inclusivity",
    desc: "Career opportunities should be accessible to everyone, regardless of background or experience.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Innovation",
    desc: "We continuously integrate the latest AI and design research to keep SmartCV ahead of the curve.",
  },
];

const currentYear = new Date().getFullYear();

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: "oklch(0.52 0.13 195)" }}
            >
              S
            </div>
            <span className="font-bold">
              Smart<span style={{ color: "oklch(0.52 0.13 195)" }}>CV</span>
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="text-muted-foreground hover:text-foreground"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        className="py-20 px-6 text-center"
        style={{ background: "linear-gradient(135deg, #203244, #2B3F52)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">About SmartCV</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            We're on a mission to democratize access to professional career
            tools and help millions of people land their dream jobs.
          </p>
        </motion.div>
      </section>

      {/* Story */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Our Story</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              SmartCV was founded in 2022 by Sarah Chen and Marcus Williams
              after a shared frustration: why are professional career tools
              either ugly, expensive, or too complicated?
            </p>
            <p>
              Sarah had spent years as a Product Manager at Google, watching
              talented candidates get filtered out by ATS systems simply because
              of poor resume formatting. Marcus, a senior engineer at Stripe,
              saw the same problem from the technical side — parsing algorithms
              rejecting perfectly qualified candidates over formatting issues.
            </p>
            <p>
              Together, they built SmartCV: a platform that combines beautiful
              design, ATS optimization, AI writing assistance, and an intuitive
              interface. What started as a side project has grown to help over
              50,000 job seekers worldwide.
            </p>
            <p>
              Today, SmartCV is used by everyone from recent graduates to
              Fortune 500 executives. Our templates have been vetted by HR
              professionals and tested against the world's leading ATS systems
              to ensure maximum compatibility.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "oklch(0.52 0.13 195 / 0.1)" }}
                >
                  <v.icon size={20} style={{ color: "oklch(0.52 0.13 195)" }} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-card border border-border rounded-xl p-6 text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4"
                  style={{ backgroundColor: "oklch(0.52 0.13 195)" }}
                >
                  {member.avatar}
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 text-center">
        <p className="text-xs text-muted-foreground">
          &copy; {currentYear}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
