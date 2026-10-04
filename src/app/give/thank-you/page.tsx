import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { confirmPayment } from "@/lib/paystack";
import { formatNaira } from "@/lib/utils";

export const metadata: Metadata = { title: "Payment status", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function ThankYouPage({ searchParams }: { searchParams: { reference?: string; trxref?: string } }) {
  const ref = searchParams.reference ?? searchParams.trxref ?? "";
  let donation = null;
  let problem = false;
  if (/^dbif_[a-f0-9]{24}$/.test(ref)) {
    try { donation = await confirmPayment(ref); } catch (e) { console.error(e); problem = true; }
  }

  let title = "We could not find that payment";
  let body = "If you were charged, please contact us with your Paystack receipt and we will sort it out.";
  let retry = true;
  if (problem) {
    title = "We are still confirming your payment";
    body = "We could not reach Paystack just now. If you were charged, your gift will be recorded shortly. You do not need to pay again.";
    retry = false;
  } else if (donation?.status === "success") {
    title = "Thank you for your gift";
    body = `We received ${formatNaira(donation.amountKobo)}. Please keep this reference for your records: ${donation.reference}`;
    retry = false;
  } else if (donation?.status === "pending") {
    title = "Your payment is being confirmed";
    body = "This can take a minute. Refresh this page shortly. You do not need to pay again.";
    retry = false;
  } else if (donation?.status === "failed") {
    title = "The payment did not go through";
    body = "You have not been charged for this attempt. You are welcome to try again.";
  }

  return (
    <>
      <PageHeader title={title} />
      <Container narrow className="py-16 sm:py-20">
        <p className="text-lg leading-relaxed text-ink/80">{body}</p>
        <div className="mt-8 flex gap-3">
          {retry && <Button href="/give">Try again</Button>}
          <Button href="/" variant="secondary">Back to home</Button>
        </div>
      </Container>
    </>
  );
}
