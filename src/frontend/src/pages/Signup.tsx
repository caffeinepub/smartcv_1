import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { SiGoogle } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

const BENEFITS = [
  "15 free ATS-optimized templates",
  "Step-by-step resume wizard",
  "AI-powered writing suggestions",
  "Instant PDF export",
];

export default function Signup() {
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signup(name, email, password);
    setLoading(false);
    toast.success("Account created! Welcome to SmartCV.");
    navigate("/dashboard");
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await loginWithGoogle();
    setGoogleLoading(false);
    toast.success("Signed up with Google!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div
        className="hidden lg:flex w-1/2 items-center justify-center p-12"
        style={{ background: "linear-gradient(135deg, #203244, #0E7C86)" }}
      >
        <div className="text-white max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-bold mx-auto mb-6">
            S
          </div>
          <h2 className="text-3xl font-bold mb-4">Start your career journey</h2>
          <p className="text-white/80 mb-6">
            Everything you need to create a standout resume and land your dream
            job.
          </p>
          <ul className="space-y-3">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Check size={12} />
                </div>
                <span className="text-sm text-white/90">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: "oklch(0.52 0.13 195)" }}
              >
                S
              </div>
              <span className="font-bold text-lg">
                Smart<span style={{ color: "oklch(0.52 0.13 195)" }}>CV</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">
              Create your account
            </h1>
            <p className="text-muted-foreground mt-1">
              Free forever. No credit card required.
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full mb-4 gap-2"
            onClick={handleGoogle}
            disabled={googleLoading}
            data-ocid="signup.google.button"
          >
            {googleLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <SiGoogle size={14} />
            )}
            Sign up with Google
          </Button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative text-center">
              <span className="bg-background px-2 text-xs text-muted-foreground">
                or
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Johnson"
                className="mt-1"
                required
                data-ocid="signup.name.input"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="mt-1"
                required
                data-ocid="signup.email.input"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 8 characters"
                className="mt-1"
                required
                minLength={8}
                data-ocid="signup.password.input"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              data-ocid="signup.submit_button"
            >
              {loading ? (
                <Loader2 size={16} className="mr-2 animate-spin" />
              ) : null}
              {loading ? "Creating account..." : "Create Free Account"}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-4">
            By signing up you agree to our{" "}
            <Link to="/terms" className="underline hover:text-foreground">
              Terms
            </Link>{" "}
            &{" "}
            <Link to="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
          </p>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline"
              data-ocid="signup.login.link"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
