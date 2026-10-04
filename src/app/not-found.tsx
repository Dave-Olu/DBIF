import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Keystone } from "@/components/Keystone";

export default function NotFound() {
  return (
    <Container narrow className="flex min-h-[60vh] flex-col items-center justify-center text-center py-20">
      <Keystone />
      <h1 className="mt-4 font-display text-3xl font-medium text-ink">Page not found</h1>
      <p className="mt-3 text-ink/60">
        The page you&apos;re looking for doesn&apos;t exist, or may have moved.
      </p>
      <Button href="/" className="mt-8">
        Back to home
      </Button>
    </Container>
  );
}
