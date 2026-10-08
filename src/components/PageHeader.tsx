import Image from "next/image";
import logoUrl from "@/app/gallery/Logo.png";
import { Container } from "@/components/Container";

export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="grain-panel text-paper">
      <Container className="py-16 sm:py-20">
        <div className="relative h-20 w-20 overflow-hidden">
          <Image src={logoUrl} alt="Destiny Builders International Fellowship logo" className="object-contain" fill sizes="80px" />
        </div>
        <h1 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">
          {title}
        </h1>
        {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-paper/75">{intro}</p>}
      </Container>
    </section>
  );
}
