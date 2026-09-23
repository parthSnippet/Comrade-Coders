import { useState, type ReactNode } from "react";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#111827] dark:bg-[#080b10] dark:text-white">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
      />

      <div className="min-h-screen lg:pl-[252px]">
        <AdminHeader onMenuClick={handleOpenSidebar} />

        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}