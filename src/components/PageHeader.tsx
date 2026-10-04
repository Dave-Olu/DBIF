import logoUrl from "@/app/gallery/Logo.jpeg";
import { Container } from "@/components/Container";

export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="grain-panel text-paper">
      <Container className="py-16 sm:py-20">
        <img src={logoUrl.src} alt="Destiny Builders International Fellowship logo" className="h-20 w-auto object-contain" />
        <h1 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">
          {title}
        </h1>
        {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-paper/75">{intro}</p>}
      </Container>
    </section>
  );
}
