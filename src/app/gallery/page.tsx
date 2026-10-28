import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PreviewNotice } from "@/components/PreviewNotice";
import { getGalleryImages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and videos from DBIF programs, services, and community life.",
};

export default async function GalleryPage() {
  const galleryImages = await getGalleryImages();
  return (
    <>
      <PageHeader title="Gallery" intro="Moments from services, programs, and community life." />
      <Container className="py-16 sm:py-20">
        <PreviewNotice
          title="Gallery preview"
          message="The gallery currently shows sample visuals to demonstrate the website layout. Final photographs and media permissions are still pending confirmation."
        />
        <GalleryGrid images={galleryImages} />
      </Container>
    </>
  );
}
