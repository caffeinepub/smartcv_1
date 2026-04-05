import { cn } from "@/lib/utils";
import {
  Briefcase,
  ChevronRight,
  FileEdit,
  FileText,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  Mail,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

interface NavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: "Resumes",
    icon: <FileText size={18} />,
    children: [
      { label: "Templates", href: "/templates" },
      { label: "Editor", href: "/resume/new" },
    ],
  },
  {
    label: "Cover Letters",
    icon: <Mail size={18} />,
    children: [{ label: "Editor", href: "/cover-letter/new" }],
  },
  { label: "Job Listings", href: "/jobs", icon: <Briefcase size={18} /> },
  { label: "Settings", href: "/settings", icon: <Settings size={18} /> },
  { label: "Account", href: "/account", icon: <User size={18} /> },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [expanded, setExpanded] = useState<string[]>([
    "Resumes",
    "Cover Letters",
  ]);

  const isActive = (href: string) => location.pathname === href;

  const toggleExpanded = (label: string) => {
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[260px] z-50 flex flex-col"
      style={{
        background: "linear-gradient(180deg, #203244 0%, #2B3F52 100%)",
      }}
    >
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-3 border-b border-white/10">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-lg"
          style={{ backgroundColor: "oklch(0.52 0.13 195)" }}
        >
          S
        </div>
        <span className="text-white font-bold text-xl">
          Smart<span style={{ color: "oklch(0.65 0.14 195)" }}>CV</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {navItems.map((item) => {
          const isExp = item.children && expanded.includes(item.label);
          const isAnyChildActive = item.children?.some((c) => isActive(c.href));
          const isItemActive = item.href
            ? isActive(item.href)
            : isAnyChildActive;

          if (item.children) {
            return (
              <div key={item.label} className="mb-1">
                <button
                  type="button"
                  onClick={() => toggleExpanded(item.label)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200",
                    isItemActive
                      ? "text-white bg-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/8",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="opacity-80">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight
                    size={14}
                    className={cn(
                      "transition-transform duration-200",
                      isExp && "rotate-90",
                    )}
                  />
                </button>
                {isExp && (
                  <div className="ml-7 mt-1 space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        data-ocid={`nav.${child.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all",
                          isActive(child.href)
                            ? "text-white bg-white/15 font-medium"
                            : "text-white/60 hover:text-white hover:bg-white/8",
                        )}
                      >
                        <FileEdit size={13} />
                        {child.label}
                        {isActive(child.href) && (
                          <span
                            className="ml-auto text-xs px-1.5 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: "oklch(0.52 0.13 195)" }}
                          >
                            Active
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.href!}
              data-ocid={`nav.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 mb-1",
                isItemActive
                  ? "text-white bg-white/15 font-medium"
                  : "text-white/70 hover:text-white hover:bg-white/8",
              )}
            >
              <div className="flex items-center gap-3">
                <span className="opacity-80">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {isItemActive && (
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: "oklch(0.52 0.13 195)" }}
                >
                  Active
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <button
          type="button"
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/8 text-sm transition-all"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>

        {user && (
          <div className="px-3 py-2 rounded-lg bg-white/8">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: "oklch(0.52 0.13 195)" }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">
                  {user.name}
                </p>
                <p className="text-white/50 text-xs truncate">
                  {user.plan.toUpperCase()}
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="text-white/50 hover:text-white/90 transition-colors"
                title="Logout"
              >
                <LogOut size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
