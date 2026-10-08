import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { GiveForm } from "@/components/GiveForm";
import { givingEnabled } from "@/lib/paystack";
import { givingAccounts, givingPurposes } from "@/data/site";

export const metadata: Metadata = { title: "Give", description: "Give or support the work of DBIF online." };
export const dynamic = "force-dynamic";

export default function GivePage() {
  return (
    <>
      <PageHeader title="Give / Support" intro="Your gift helps DBIF build people and communities." />
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-2">
        <section aria-labelledby="bank-transfer-heading">
          <h2 id="bank-transfer-heading" className="font-display text-2xl font-medium text-ink">
            Give by bank transfer
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/65">
            Choose the account that matches your gift.
          </p>
          <div className="mt-6 grid gap-4">
            {givingAccounts.map((account) => (
              <article key={account.accountNumber} className="border border-ink/10 bg-paper-dim p-5 sm:p-6">
                <h3 className="font-display text-lg font-medium text-ink">{account.title}</h3>
                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-[8rem_1fr]">
                  <dt className="text-ink/55">Bank</dt>
                  <dd className="font-medium text-ink">{account.bank}</dd>
                  <dt className="text-ink/55">Account number</dt>
                  <dd className="font-semibold tracking-wide text-ink">{account.accountNumber}</dd>
                  <dt className="text-ink/55">Account name</dt>
                  <dd className="font-medium text-ink">{account.accountName}</dd>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="online-giving-heading">
          <h2 id="online-giving-heading" className="font-display text-2xl font-medium text-ink">
            Give online
          </h2>
          <div className="mt-6 border border-ink/10 bg-paper p-5 sm:p-6">
            {givingEnabled() ? (
              <GiveForm purposes={givingPurposes} />
            ) : (
              <p className="text-base leading-relaxed text-ink/70">
                Online giving by card is not open yet. You can give by bank transfer using the account details provided.
              </p>
            )}
          </div>
        </section>
      </Container>
    </>
  );
}
