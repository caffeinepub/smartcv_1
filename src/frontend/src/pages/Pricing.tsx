import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/AuthContext";

const PLANS = [
  {
    name: "Free",
    price: { monthly: "$0", annual: "$0" },
    desc: "Perfect for getting started",
    plan: "free" as const,
    features: [
      "15 free ATS-optimized templates",
      "1 resume document",
      "1 cover letter",
      "Basic PDF export",
      "Job board browsing",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: { monthly: "$12", annual: "$9" },
    desc: "For serious job seekers",
    plan: "paid" as const,
    features: [
      "30+ paid & free templates",
      "Unlimited resumes",
      "Unlimited cover letters",
      "High-quality PDF export",
      "AI writing suggestions",
      "Job bookmarks & alerts",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: { monthly: "$29", annual: "$22" },
    desc: "For executives & power users",
    plan: "premium" as const,
    features: [
      "All 40 templates",
      "Advanced AI features",
      "Custom branding",
      "Full job board access",
      "Resume analytics & insights",
      "White-glove support",
      "Team collaboration",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  const { user, updatePlan } = useAuth();
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const handleUpgrade = (plan: "free" | "paid" | "premium") => {
    updatePlan(plan);
    toast.success(
      `Upgraded to ${plan === "paid" ? "Pro" : plan === "premium" ? "Premium" : "Free"} plan!`,
    );
  };

  return (
    <Layout title="Pricing">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Choose Your Plan
          </h2>
          <p className="text-muted-foreground mb-6">
            Start free. Upgrade when you're ready to unlock more templates, AI
            features, and unlimited exports.
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
              Annual{" "}
              <span className="text-xs text-green-600 ml-1 font-normal">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((tier) => {
            const isCurrent = user?.plan === tier.plan;
            return (
              <div
                key={tier.name}
                className={`p-6 rounded-2xl border transition-all ${
                  tier.highlight
                    ? "border-primary shadow-xl shadow-primary/10"
                    : "border-border bg-card"
                }`}
                style={
                  tier.highlight
                    ? { background: "oklch(0.52 0.13 195 / 0.04)" }
                    : {}
                }
                data-ocid={`pricing.${tier.plan}.card`}
              >
                {tier.highlight && (
                  <div className="text-center mb-3">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      <Zap size={10} className="inline mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-foreground">
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
                    <span className="text-muted-foreground">/mo</span>
                  )}
                  {billing === "annual" && tier.price.monthly !== "$0" && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Billed annually
                    </p>
                  )}
                </div>
                <ul className="space-y-2.5 mb-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check
                        size={14}
                        className="text-primary shrink-0 mt-0.5"
                      />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={
                    tier.highlight
                      ? "default"
                      : isCurrent
                        ? "outline"
                        : "outline"
                  }
                  disabled={isCurrent}
                  onClick={() => handleUpgrade(tier.plan)}
                  data-ocid={`pricing.${tier.plan}.cta.button`}
                >
                  {isCurrent ? "Current Plan" : `Get ${tier.name}`}
                </Button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          All plans include a 14-day money-back guarantee. No questions asked.
        </p>
      </div>
    </Layout>
  );
}
