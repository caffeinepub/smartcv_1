import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  fullWidth?: boolean;
}

export default function Layout({ children, title, fullWidth }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col min-h-screen">
        <Header title={title} />
        <main className={`flex-1 ${fullWidth ? "" : "p-6"}`}>{children}</main>
      </div>
    </div>
  );
}
