import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SiGoogle } from "react-icons/si";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname || "/dashboard";

  const [email, setEmail] = useState("demo@smartcv.app");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } else {
      setError(result.error || "Login failed");
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await loginWithGoogle();
    setGoogleLoading(false);
    toast.success("Signed in with Google!");
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div
        className="hidden lg:flex w-1/2 items-center justify-center p-12"
        style={{ background: "linear-gradient(135deg, #203244, #0E7C86)" }}
      >
        <div className="text-white text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-bold mx-auto mb-6">
            S
          </div>
          <h2 className="text-3xl font-bold mb-4">Welcome to SmartCV</h2>
          <p className="text-white/80">
            Build professional resumes and cover letters with AI-powered tools
            and 40+ templates.
          </p>
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
              Sign in to your account
            </h1>
            <p className="text-muted-foreground mt-1">
              Or use the demo credentials pre-filled below
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full mb-4 gap-2"
            onClick={handleGoogle}
            disabled={googleLoading}
            data-ocid="login.google.button"
          >
            {googleLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <SiGoogle size={14} />
            )}
            Continue with Google
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                required
                data-ocid="login.email.input"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/contact"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                required
                data-ocid="login.password.input"
              />
            </div>
            {error && (
              <p
                className="text-sm text-destructive"
                data-ocid="login.error_state"
              >
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              data-ocid="login.submit_button"
            >
              {loading ? (
                <Loader2 size={16} className="mr-2 animate-spin" />
              ) : null}
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary hover:underline"
              data-ocid="login.signup.link"
            >
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
