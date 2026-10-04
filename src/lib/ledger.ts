import { readJson, updateJson } from "@/lib/store";

export interface Donation {
  reference: string;
  name: string | null;
  email: string;
  purpose: string;
  amountKobo: number;
  currency: "NGN";
  status: "pending" | "success" | "failed";
  note?: string;
  channel?: string;
  createdAt: string;
  paidAt?: string;
}

const seed = (): Donation[] => [];

export const listDonations = () => readJson<Donation[]>("donations", seed);

export async function getDonation(reference: string) {
  return (await listDonations()).find((d) => d.reference === reference);
}

export const addDonation = (d: Donation) =>
  updateJson<Donation[]>("donations", seed, (list) => [...list, d]);

/** Applies `fn` to one record atomically; returns the updated record and the previous status. */
export async function patchDonation(
  reference: string,
  fn: (d: Donation) => Donation,
): Promise<{ record: Donation; before: Donation["status"] } | null> {
  let result: { record: Donation; before: Donation["status"] } | null = null;
  await updateJson<Donation[]>("donations", seed, (list) =>
    list.map((d) => {
      if (d.reference !== reference) return d;
      const updated = fn({ ...d });
      result = { record: updated, before: d.status };
      return updated;
    }),
  );
  return result;
}
