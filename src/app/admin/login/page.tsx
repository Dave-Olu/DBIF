export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  const input = "w-full border border-ink/20 bg-paper px-3 py-2.5 text-ink outline-none focus-visible:border-gold";
  return (
    <div className="mx-auto max-w-sm py-10">
      <h1 className="font-display text-3xl font-medium text-ink">Admin sign in</h1>
      <form action="/api/admin/login" method="post" className="mt-8 space-y-5">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-ink/70">Email</label>
          <input id="email" name="email" type="email" required autoComplete="username" className={input} />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm text-ink/70">Password</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" className={input} />
        </div>
        {searchParams.error && (
          <p role="alert" className="text-sm text-red-700">
            {searchParams.error === "rate" ? "Too many attempts. Try again in a few minutes." : "Email or password is incorrect."}
          </p>
        )}
        <button type="submit" className="w-full rounded-sm bg-ink px-6 py-2.5 text-sm font-medium text-paper hover:bg-ink-light">Sign in</button>
      </form>
    </div>
  );
}
