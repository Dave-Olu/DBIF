/**
 * Sends email through Resend's REST API when RESEND_API_KEY and MAIL_FROM are
 * set; otherwise logs and skips. Failures never break the calling request.
 * Swap the provider here if DBIF prefers another one.
 */
export async function sendMail(opts: { to: string; subject: string; text: string; replyTo?: string }): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (!key || !from) {
    console.info(`[mail skipped: RESEND_API_KEY/MAIL_FROM not set] to=${opts.to} subject="${opts.subject}"`);
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: opts.to, subject: opts.subject, text: opts.text, reply_to: opts.replyTo }),
    });
    if (!res.ok) console.error("[mail failed]", res.status, await res.text());
    return res.ok;
  } catch (e) {
    console.error("[mail error]", e);
    return false;
  }
}
