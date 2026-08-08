import LoginForm from "@/components/auth/LoginForm";
import { GraduationCap } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-900">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, #1e40af 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, #7c3aed 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, #0891b2 0%, transparent 50%)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl animate-pulse [animation-delay:1s]" />

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Glass card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-xl">
          {/* Branding */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/25">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white">
              Student Grading System
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Sign in to your account to continue
            </p>
          </div>

          <LoginForm />

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500">
              SGS ERP &middot; University Management Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}