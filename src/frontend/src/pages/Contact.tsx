import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: "support@smartcv.app" },
  { icon: Phone, label: "Phone", value: "+1 (888) 555-0199" },
  {
    icon: MapPin,
    label: "Address",
    value: "340 Pine Street, San Francisco, CA 94104",
  },
  { icon: Clock, label: "Hours", value: "Mon–Fri, 9am–6pm PST" },
];

const FAQ = [
  {
    id: "faq-pdf",
    q: "How do I download my resume as PDF?",
    a: "Open your resume in the editor, click the 'Export PDF' button in the top right. Your download will start immediately.",
  },
  {
    id: "faq-free",
    q: "Can I use SmartCV for free?",
    a: "Yes! SmartCV offers a generous free plan with 15 templates, 1 resume, and 1 cover letter. No credit card required.",
  },
  {
    id: "faq-ats",
    q: "Are the templates ATS compatible?",
    a: "All our templates are rigorously tested against leading ATS systems. Each template shows an ATS compatibility score.",
  },
  {
    id: "faq-ai",
    q: "How does the AI writing feature work?",
    a: "Our AI analyzes your content and suggests improved phrasing, stronger action verbs, and quantifiable achievements.",
  },
];

const currentYear = new Date().getFullYear();

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    toast.success("Message sent! We'll respond within 24 hours.");
  };

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
          <nav className="flex items-center gap-4 text-sm">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
          </nav>
        </div>
      </header>

      <main className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-3">
              Get in Touch
            </h1>
            <p className="text-muted-foreground">
              We'd love to hear from you. Our team typically responds within 24
              hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {CONTACT_INFO.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: "oklch(0.52 0.13 195 / 0.1)",
                        }}
                      >
                        <item.icon
                          size={15}
                          style={{ color: "oklch(0.52 0.13 195)" }}
                        />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="text-sm text-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {FAQ.map((faq) => (
                    <div key={faq.id}>
                      <p className="text-sm font-medium text-foreground mb-1">
                        {faq.q}
                      </p>
                      <p className="text-xs text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-card border border-border rounded-xl p-8">
              {sent ? (
                <div
                  className="text-center py-12"
                  data-ocid="contact.success_state"
                >
                  <CheckCircle
                    size={48}
                    className="mx-auto mb-4 text-green-500"
                  />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground">
                    Thanks for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                  <Button
                    className="mt-6"
                    variant="outline"
                    onClick={() => setSent(false)}
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="Alex Johnson"
                        className="mt-1"
                        required
                        data-ocid="contact.name.input"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        placeholder="alex@example.com"
                        className="mt-1"
                        required
                        data-ocid="contact.email.input"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Subject</Label>
                    <Select
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, subject: v }))
                      }
                    >
                      <SelectTrigger
                        className="mt-1"
                        data-ocid="contact.subject.select"
                      >
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="billing">
                          Billing &amp; Plans
                        </SelectItem>
                        <SelectItem value="technical">
                          Technical Support
                        </SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Message</Label>
                    <Textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      placeholder="Describe your question or issue in detail..."
                      rows={6}
                      className="mt-1"
                      required
                      data-ocid="contact.message.textarea"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={sending}
                    data-ocid="contact.submit_button"
                  >
                    {sending ? (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    ) : null}
                    {sending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
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
