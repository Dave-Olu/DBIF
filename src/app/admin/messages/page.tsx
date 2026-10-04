import { requireRole } from "@/lib/auth";
import { readJson } from "@/lib/store";
import type { Message } from "@/app/api/contact/route";

export default async function MessagesAdmin() {
  await requireRole("super");
  const list = await readJson<Message[]>("messages", () => []);
  return (
    <>
      <h1 className="font-display text-3xl font-medium text-ink">Messages</h1>
      <ul className="mt-6 space-y-3">
        {list.map((m) => (
          <li key={m.id} className="border border-ink/12 bg-paper p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-medium text-ink">{m.name} <span className="font-normal text-ink/50">&lt;{m.email}&gt;</span></p>
              <p className="text-xs text-ink/50">{m.createdAt.slice(0, 16).replace("T", " ")} UTC · {m.reason}</p>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ink/80">{m.message}</p>
          </li>
        ))}
        {list.length === 0 && <li className="text-ink/60">No messages yet.</li>}
      </ul>
    </>
  );
}
