"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "@/lib/api";
import { Loader } from "@/components/Loader";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const data = await loginUser(email, password);
      document.cookie = `access_token=${encodeURIComponent(data.access_token)}; path=/;`;
      router.replace("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-[#111714]">
      <div className="w-full max-w-sm space-y-4 bg-white p-6 rounded-lg shadow-lg">
        <span className="flex flex-col gap-2 items-center">
          <h1 className="text-2xl font-semibold">Bulltrack Pro</h1>
          <h2 className="text-xl">Login</h2>
        </span>
        <form
        className="flex flex-col gap-3"
          onSubmit={onLogin}
        >
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded">
              {error}
            </div>
          )}

          <input
            className="w-full border rounded px-3 py-2"
            type="email"
            id="email"
            name="email"
            placeholder="ejemplo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            type="password"
            id="password"
            name="password"
            placeholder="Ingresá tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <button type="submit" className="w-full rounded bg-black text-white py-2 cursor-pointer hover:bg-gray-800 transition disabled:bg-gray-400 flex items-center justify-center" disabled={isLoading}>
            {isLoading ? <Loader width="1.5rem" height="1.5rem" fill="white" /> : "Ingresar"}
          </button>
        </form>

        <p className="text-sm">
          Todavía no tenés una cuenta?{" "}
          <a className="underline" href="/signup">
            Registrate
          </a>
        </p>
      </div>
    </main>
  );
}
