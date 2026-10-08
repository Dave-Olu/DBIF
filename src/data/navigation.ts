// PRD §8: Proposed Website Sitemap
export const primaryNav = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about/history" },
      { label: "Vision & Mission", href: "/about/vision-mission" },
      { label: "Core Values", href: "/about/core-values" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Ministry Focus", href: "/about/ministry-focus" },
    ],
  },
  { label: "Locations", href: "/locations" },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  {
    label: "Sermons",
    href: "/sermons",
    children: [
      { label: "Marriage", href: "/sermons#marriage" },
      { label: "Finance/Business", href: "/sermons#finance-business" },
      { label: "Leadership", href: "/sermons#leadership" },
      { label: "Deliverance", href: "/sermons#deliverance" },
    ],
  },
  { label: "Testimonies", href: "/testimonies" },
  { label: "Gallery", href: "/gallery" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = [
  { label: "About DBIF", href: "/about" },
  { label: "Locations", href: "/locations" },
  { label: "Events", href: "/events" },
  { label: "Sermons & Resources", href: "/sermons" },
  { label: "Contact Us", href: "/contact" },
];
