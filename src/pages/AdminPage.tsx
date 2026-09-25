import { FormEvent, useEffect, useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import useAPI from "../../hook/useAPI";
import apiConfig from "../../config/global.json";

interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    username: string;
    email: string;
    is_staff: boolean;
    is_superuser: boolean;
  };
}

export default function AdminPage() {
  const navigate = useNavigate();

  // Clear any stale tokens when landing on login page
  useEffect(() => {
    sessionStorage.removeItem("admin_access_token");
    sessionStorage.removeItem("admin_refresh_token");
    sessionStorage.removeItem("admin_user");
  }, []);

  const { loading, error, request } = useAPI<LoginResponse>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoginError("");

    if (!username.trim() || !password) {
      setLoginError("Please enter your username and password.");
      return;
    }

    const response = await request(
      apiConfig.api.endpoints.authLogin,
      "POST",
      {
        username: username.trim(),
        password,
      }
    );

    if (!response) {
      return;
    }

    sessionStorage.setItem("admin_access_token", response.access);
    sessionStorage.setItem("admin_refresh_token", response.refresh);
    sessionStorage.setItem(
      "admin_user",
      JSON.stringify(response.user)
    );

    navigate("/admin/dashboard");
  };

  const displayError = loginError || error;

  return (
    <div className="min-h-screen bg-[#05070b] text-white">
      <div className="relative flex min-h-screen overflow-hidden">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-[#2f8fe6]/10 blur-[120px]" />
          <div className="absolute bottom-[-220px] right-[-160px] h-[500px] w-[500px] rounded-full bg-[#58adff]/10 blur-[130px]" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />
        </div>

        {/* Left branding panel */}
        <div className="relative hidden w-1/2 flex-col justify-between border-r border-white/[0.07] p-10 lg:flex xl:p-14">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2f8fe6] text-sm font-bold shadow-[0_8px_30px_rgba(47,143,230,0.25)]">
                CC
              </div>

              <div>
                <p className="text-sm font-bold tracking-[-0.03em]">
                  Comerade <span className="text-[#58adff]">Coders</span>
                </p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-white/35">
                  Admin workspace
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-xl">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#58adff]/20 bg-[#58adff]/10 text-[#58adff]">
              <ShieldCheck size={23} strokeWidth={1.7} />
            </div>

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#58adff]">
              Secure administration
            </p>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.06em] xl:text-6xl">
              Manage your
              <br />
              digital presence.
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/45">
              Manage services, industries, projects, blogs, inquiries and
              website content from one centralized workspace.
            </p>
          </div>

          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-white/25">
            <span>Comerade Coders</span>
            <span>Technology That Moves Business Forward.</span>
          </div>
        </div>

        {/* Login section */}
        <div className="relative flex w-full items-center justify-center px-5 py-10 sm:px-8 lg:w-1/2 lg:px-12">
          <div className="w-full max-w-[430px]">
            {/* Mobile branding */}
            <div className="mb-12 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2f8fe6] text-sm font-bold">
                CC
              </div>

              <div>
                <p className="text-sm font-bold tracking-[-0.03em]">
                  Comerade <span className="text-[#58adff]">Coders</span>
                </p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-white/35">
                  Admin workspace
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#58adff]">
                Welcome back
              </p>

              <h2 className="text-3xl font-bold tracking-[-0.05em] sm:text-4xl">
                Admin login
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/40">
                Sign in to access the Comerade Coders administration panel.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Username */}
              <div>
                <label
                  htmlFor="admin-username"
                  className="mb-2 block text-xs font-semibold text-white/60"
                >
                  Username
                </label>

                <div className="relative">
                  <UserRound
                    size={17}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                  />

                  <input
                    id="admin-username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Enter your username"
                    autoComplete="username"
                    disabled={loading}
                    className="h-13 w-full rounded-xl border border-white/[0.10] bg-white/[0.04] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/[0.16] focus:border-[#58adff]/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-[#58adff]/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="admin-password"
                    className="block text-xs font-semibold text-white/60"
                  >
                    Password
                  </label>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={17}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                  />

                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={loading}
                    className="h-13 w-full rounded-xl border border-white/[0.10] bg-white/[0.04] pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/[0.16] focus:border-[#58adff]/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-[#58adff]/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    disabled={loading}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-2 text-white/30 transition hover:bg-white/[0.05] hover:text-white/70 disabled:cursor-not-allowed"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {displayError && (
                <div className="rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-xs leading-5 text-red-300">
                  {displayError}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#2f8fe6] text-sm font-semibold text-white shadow-[0_10px_30px_rgba(47,143,230,0.20)] transition duration-200 hover:bg-[#3d9bf0] hover:shadow-[0_14px_35px_rgba(47,143,230,0.28)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-white/25">
              <ShieldCheck size={13} />
              <span>Protected admin access</span>
            </div>

            <p className="mt-5 text-center text-[10px] text-white/20">
              © {new Date().getFullYear()} Comerade Coders
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}