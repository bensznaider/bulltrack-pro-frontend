"use client";
import { BullsProvider } from "@/features/dashboard/BullsContext";
import DashboardLayout from "@/features/dashboard/DashboardLayout";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BullsProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </BullsProvider>
  );
}
