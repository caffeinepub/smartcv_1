import { Link } from "react-router-dom";

const currentYear = new Date().getFullYear();

function Section({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-foreground mb-3">{title}</h2>
      <div className="space-y-3 text-muted-foreground leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
        </div>
      </header>
      <main className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">Last updated: April 1, 2026</p>
          </div>

          <Section title="1. Introduction">
            <p>
              SmartCV, Inc. (“SmartCV,” “we,” “our,” or “us”) operates the
              SmartCV platform and website at smartcv.app (the “Service”). This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our Service.
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing or using
              our Service, you agree to the terms of this Privacy Policy.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>
              <strong className="text-foreground">Account Information:</strong>{" "}
              When you create an account, we collect your name, email address,
              and password (stored as a cryptographic hash).
            </p>
            <p>
              <strong className="text-foreground">
                Resume & Document Data:
              </strong>{" "}
              We store the resume content, cover letters, and document
              preferences you create using our Service.
            </p>
            <p>
              <strong className="text-foreground">Usage Data:</strong> We
              collect information about how you interact with our Service,
              including pages visited, features used, and time spent on the
              platform.
            </p>
            <p>
              <strong className="text-foreground">Payment Information:</strong>{" "}
              Billing information is processed by our payment provider (Stripe)
              and is not stored on our servers.
            </p>
            <p>
              <strong className="text-foreground">Device & Log Data:</strong> We
              automatically collect IP addresses, browser type, operating
              system, referring URLs, and other technical information.
            </p>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>
              We use the information we collect to: provide, maintain, and
              improve the Service; process transactions; send transactional and
              promotional emails; respond to customer support inquiries; analyze
              usage trends; and comply with legal obligations.
            </p>
          </Section>

          <Section title="4. How We Share Your Information">
            <p>
              We do not sell your personal data. We may share your information
              with: service providers who help us operate the platform (under
              strict confidentiality agreements); analytics partners (in
              anonymized, aggregated form); legal authorities when required by
              law; and business successors in the event of a merger or
              acquisition.
            </p>
          </Section>

          <Section title="5. Data Security">
            <p>
              We implement industry-standard security measures including TLS
              encryption, encrypted storage, and regular security audits.
              However, no method of transmission over the Internet is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="6. Data Retention">
            <p>
              We retain your account data for as long as your account is active
              or as necessary to provide you the Service. You may delete your
              account at any time, which will remove your personal data within
              30 days.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <p>
              Depending on your jurisdiction, you may have rights to: access,
              correct, or delete your personal data; restrict or object to
              processing; data portability; and lodge a complaint with a
              supervisory authority. To exercise these rights, contact us at
              privacy@smartcv.app.
            </p>
          </Section>

          <Section title="8. Cookies">
            <p>
              We use cookies and similar tracking technologies to enhance your
              experience. You can control cookie settings through your browser,
              though this may affect Service functionality.
            </p>
          </Section>

          <Section title="9. Children's Privacy">
            <p>
              Our Service is not directed to individuals under 16 years of age.
              We do not knowingly collect personal information from children
              under 16.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of significant changes via email or prominent notice on
              our website. Continued use of the Service after such notification
              constitutes acceptance of the updated policy.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>
              If you have questions about this Privacy Policy, please contact us
              at: SmartCV, Inc., 340 Pine Street, San Francisco, CA 94104 |
              privacy@smartcv.app | +1 (888) 555-0199.
            </p>
          </Section>
        </div>
      </main>
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
