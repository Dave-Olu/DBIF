/**
 * Site-wide configuration.
 *
 * Values marked `null` correspond to PRD §22 "Open Items Requiring
 * Confirmation" and should be filled in once DBIF leadership approves them.
 * Do not replace a `null` with invented text — replace it with the real
 * confirmed value.
 */
const normalizedSiteUrl = (() => {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return value && /^https?:\/\//i.test(value) ? value : "https://www.dbif.example";
})();

export const site = {
  name: "Destiny Builders International Fellowship",
  shortName: "DBIF",
  formerName: "The Visionaries International Fellowship (VIF)",
  foundedYear: 2019,
  tagline: "Helping you build your God-given destiny.",
  announcement: "Website preview — official content and details are still being finalized with DBIF leadership.",
  description:
    "DBIF is a Christian fellowship and ministry with a growing presence across Southwestern Nigeria and Kwara State, and an online community across Nigeria and the diaspora.",

  // §22: confirm CAC registration date and number
  cacRegistrationNumber: null as string | null,
  cacRegistrationDate: null as string | null,

  // §22: confirm founder/General Overseer's official name and title
  founderName: null as string | null,
  founderTitle: null as string | null,

  contact: {
    // §22: confirm official phone, WhatsApp, email, social handles
    phone: "+2348035553669",
    whatsapp: "https://wa.me/2348035553669",
    email: "juliusaawoniyi@gmail.com",
    address: null as string | null, // headquarters/central office, if distinct from branches
  },

  social: {
    facebook: "https://www.facebook.com/share/1Er5QbSUUP/",
    instagram: null as string | null,
    youtube: "https://youtube.com/@juliusa.awoniyi1958",
    tiktok: null as string | null,
    x: null as string | null,
  },

  // §22: preferred domain name — update once confirmed and set NEXT_PUBLIC_SITE_URL accordingly
  url: normalizedSiteUrl,
};

export const biblicalFoundation = {
  passages: [
    {
      reference: "Isaiah 58:12",
      text:
        "And they that shall be of thee shall build the old waste places: thou shalt raise up the foundations of many generations; and thou shalt be called, The repairer of the breach, The restorer of paths to dwell in.",
    },
    {
      reference: "Isaiah 61:4",
      text:
        "And they shall build the old wastes, they shall raise up the former desolations, and they shall repair the waste cities, the desolations of many generations.",
    },
  ],
};

export const visionMission = {
  vision:
    "Empowering individuals to build strong relationships, thrive in financial stewardship, and lead with purpose, all rooted in faith, to create a community that reflects the light of salvation and inspires a journey toward eternal fulfillment.",

  mission:
    "At Destiny Builders' Int'l Fellowship, we are dedicated to equipping individuals with the knowledge and tools to cultivate meaningful relationships, achieve financial freedom, and develop impactful leadership skills. Through teachings grounded in biblical principles and the transformative power of salvation, we guide our community toward a life of purpose, unity, and an eternal destiny in Heaven.",
  coreValues: [
    {
      title: "Faith in Christ",
      description:
        "We ground our lives and service in biblical principles and the transforming power of salvation.",
    },
    {
      title: "Purposeful Growth",
      description:
        "We help people discover their God-given potential and develop the wisdom and skills to fulfil it.",
    },
    {
      title: "Meaningful Relationships",
      description:
        "We build relationships marked by love, respect, unity, and a commitment to one another's growth.",
    },
    {
      title: "Faithful Stewardship",
      description:
        "We encourage wise, responsible stewardship of the resources, opportunities, and responsibilities entrusted to us.",
    },
    {
      title: "Servant Leadership",
      description:
        "We lead with humility and integrity, using our gifts to equip others and serve our communities.",
    },
    {
      title: "Impactful Service",
      description:
        "We put faith into action by serving others and making a purposeful, lasting contribution.",
    },
  ],
};

export const organizationalHistory = {
  // §15 / §22: official history and approved biography.
  // The PRD-supplied background (name transition VIF -> DBIF, 2021 Ibadan
  // expansion) is public-record narrative already in the PRD, not invented,
  // so it is used as-is in About > Our Story. The prose paragraphs live in
  // src/app/about/history/page.tsx and should be reviewed against the final
  // leadership-approved history before launch.
  nameChangeReason:
    "The fellowship began as The Visionaries International Fellowship (VIF). While preparing for registration with the Corporate Affairs Commission, it adopted the name Destiny Builders International Fellowship, both because another organization held a similar name and because the new name better expresses the ministry's mandate: helping people discover, develop, and fulfil their God-given destinies.",
  expansionNote:
    "On 29 January 2021, the fellowship expanded into Ibadan, and its presence has since grown across Southwestern Nigeria and beyond.",
};

export const aboutAuthor = {
  name: "Julius A. Awoniyi",
  title: "Visionary Prolocutor of Destiny Builders’ International Fellowship",
  bio: [
    "Julius A. Awoniyi, an unflagging and insightful leader, speaker, author, farmer, fellowship set man, life coach, technical personnel, husband and father is the multi-talented, multi-tasking, multi-dynamic, visionary prolocutor of Destiny Builders’ International Fellowship (DBIF), Sunrise Success Strategy, DBIF Billionaires’ Club, Mentor-Mentee Group, The Singles’ Forum, and The Couples’ Forum; just to mention but a few.",
    "His approaches to life’s situations are simple, pragmatic and unambiguous. As an inspirational speaker, he has been to distinctive places addressing people on the subject of panoramic success and the results have been paradigmatic progress and increase.",
    "He can be contacted via various social media and written to through his email address: juliusaawoniyi@gmail.com or through his direct line +2348035553669.",
  ],
};

/**
 * Purposes shown on the giving form. PRD does not list any, so this holds one
 * neutral default until leadership confirms the real list (open item: giving
 * purposes and suggested amounts). The form shows a selector only when there
 * is more than one.
 */
export const givingPurposes: string[] = ["General giving"];

export const givingAccounts = [
  {
    title: "Fellowship tithes, offerings & special donations",
    bank: "UBA",
    accountNumber: "1030273262",
    accountName: "Destiny Builders' Int'l Fellowship",
  },

  {
    title: "Pastor's offering",
    bank: "Zenith Bank Plc",
    accountNumber: "2252420205",
    accountName: "Julius A. Awoniyi",
  },
];
