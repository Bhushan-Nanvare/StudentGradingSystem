import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { User, Lock, Loader2 } from "lucide-react";

import { loginSchema, type LoginFormValues } from "@/schemas/loginSchema";
import { useLogin } from "@/hooks/useLogin";
import { getErrorMessage } from "@/utils/error";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending } = useLogin();

  const handleSubmit = (data: LoginFormValues) => {
    mutate(data, {
      onSuccess: (response) => {
        toast.success("Login successful");

        login(
          response.accessToken,
          response.refreshToken,
          response.username,
          response.role,
        );

        if (response.role === "Admin") {
          navigate("/admin/dashboard");
        } else if (response.role === "Faculty") {
          navigate("/teacher/dashboard");
        } else if (response.role === "Student") {
          navigate("/student/dashboard");
        } else {
          navigate("/login");
        }
      },

      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Username
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            {...form.register("username")}
            disabled={isPending}
            placeholder="Enter your username"
            className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.06] pl-10 pr-4 text-sm text-white placeholder:text-slate-500 transition-all duration-200 focus:border-blue-500/50 focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
          />
        </div>
        {form.formState.errors.username && (
          <p className="mt-1.5 text-xs text-red-400">
            {form.formState.errors.username.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="password"
            {...form.register("password")}
            disabled={isPending}
            placeholder="Enter your password"
            className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.06] pl-10 pr-4 text-sm text-white placeholder:text-slate-500 transition-all duration-200 focus:border-blue-500/50 focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
          />
        </div>
        {form.formState.errors.password && (
          <p className="mt-1.5 text-xs text-red-400">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <Button
        className="w-full h-11 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-lg transition-all duration-200 hover:from-blue-500 hover:to-violet-500 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] disabled:opacity-60"
        type="submit"
        disabled={isPending}
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing In...
          </span>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}
