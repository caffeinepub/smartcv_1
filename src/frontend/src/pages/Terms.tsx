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

export default function Terms() {
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
              Terms of Service
            </h1>
            <p className="text-muted-foreground">Last updated: April 1, 2026</p>
          </div>

          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using SmartCV (the “Service”) operated by SmartCV,
              Inc., you agree to be bound by these Terms of Service. If you do
              not agree to these terms, please do not use the Service.
            </p>
          </Section>

          <Section title="2. Description of Service">
            <p>
              SmartCV provides a web-based platform for creating, editing, and
              exporting resumes and cover letters. We offer both free and paid
              subscription tiers with varying levels of access to templates, AI
              features, and export options.
            </p>
          </Section>

          <Section title="3. User Accounts">
            <p>
              You must provide accurate and complete information when creating
              an account. You are responsible for maintaining the
              confidentiality of your credentials and for all activities that
              occur under your account. You must notify us immediately of any
              unauthorized use.
            </p>
          </Section>

          <Section title="4. Acceptable Use">
            <p>
              You agree not to: use the Service for any illegal purpose; upload
              malicious code or content; attempt to reverse-engineer the
              platform; resell or redistribute our templates without permission;
              impersonate other users or entities; or interfere with the
              Service's normal operation.
            </p>
          </Section>

          <Section title="5. Intellectual Property">
            <p>
              <strong className="text-foreground">Your Content:</strong> You
              retain all rights to the resume content you create. By using the
              Service, you grant us a limited license to process and store your
              content to provide the Service.
            </p>
            <p>
              <strong className="text-foreground">Our Content:</strong> The
              SmartCV platform, templates, and software are owned by SmartCV,
              Inc. and protected by copyright. Templates may not be used outside
              the platform without explicit written permission.
            </p>
          </Section>

          <Section title="6. Subscription and Billing">
            <p>
              Free plan users have access to core features as described on our
              Pricing page. Paid subscriptions are billed in advance on a
              monthly or annual basis. You may cancel at any time; cancellation
              takes effect at the end of the current billing period. Refunds are
              subject to our 14-day money-back guarantee policy.
            </p>
          </Section>

          <Section title="7. Disclaimers">
            <p>
              The Service is provided “as is” without warranties of any kind.
              SmartCV does not guarantee that the Service will be uninterrupted,
              error-free, or that resumes created using the Service will result
              in job offers or interviews.
            </p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, SmartCV shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages arising from your use of the Service. Our total
              liability shall not exceed the amount paid by you in the 12 months
              preceding the claim.
            </p>
          </Section>

          <Section title="9. Termination">
            <p>
              We reserve the right to terminate or suspend your account at our
              discretion if you violate these Terms. You may terminate your
              account at any time by contacting support. Upon termination, your
              right to use the Service ceases immediately.
            </p>
          </Section>

          <Section title="10. Governing Law">
            <p>
              These Terms are governed by the laws of the State of California,
              USA, without regard to conflict of law principles. Any disputes
              shall be resolved in the courts of San Francisco County,
              California.
            </p>
          </Section>

          <Section title="11. Changes to Terms">
            <p>
              We may modify these Terms at any time. Continued use of the
              Service after changes constitutes acceptance. We will provide at
              least 14 days' notice of material changes via email.
            </p>
          </Section>

          <Section title="12. Contact">
            <p>
              For questions about these Terms, contact us at legal@smartcv.app
              or SmartCV, Inc., 340 Pine Street, San Francisco, CA 94104.
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
