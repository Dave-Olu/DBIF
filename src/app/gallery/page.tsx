import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { GalleryGrid } from "@/components/GalleryGrid";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and videos from DBIF programs, services, and community life.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader title="Gallery" intro="Moments from services, programs, and community life." />
      <Container className="py-16 sm:py-20">
        <GalleryGrid images={galleryImages} />
      </Container>
    </>
  );
}
