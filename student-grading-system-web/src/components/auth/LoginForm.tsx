import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium">Username</label>

        <Input {...form.register("username")} disabled={isPending} />

        <p className="mt-1 text-sm text-red-500">
          {form.formState.errors.username?.message}
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Password</label>

        <Input
          type="password"
          {...form.register("password")}
          disabled={isPending}
        />

        <p className="mt-1 text-sm text-red-500">
          {form.formState.errors.password?.message}
        </p>
      </div>

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
}
