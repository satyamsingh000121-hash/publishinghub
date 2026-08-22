export interface LeagueRoleData {
  slug: string;
  name: string;
  singularName: string;
  pluralName: string;
  badge: string;
  description: string;
  highlights: string[];
}
    
export const LEAGUE_ROLES: Record<string, LeagueRoleData> = {
  author: {
    slug: "author",
    name: "Author",
    singularName: "Author",
    pluralName: "Authors",
    badge: "CREATIVE ORIGINATOR",
    description:
      "An author is a person who creates written work, such as books, articles, essays, poems, or scripts. Authors can work in various genres and forms, from fiction and non-fiction to academic writing, journalism, and screenwriting. The term “author” typically implies someone who is not only a writer but also the originator or creator of the content.",
    highlights: [
      "Publishing distribution to 400,000+ avid readers across libraries & bookstores",
      "Global rights representation & royalty management",
      "Keynote speaking and author spotlight promotional tours",
    ],
  },
  publisher: {
    slug: "publisher",
    name: "Publisher",
    singularName: "Publisher",
    pluralName: "Publishers",
    badge: "LITERARY PRODUCTION",
    description:
      "A publisher is a company or individual responsible for producing and distributing books, magazines, newspapers, or other written content. Publishers work with authors to bring their work to the public, handling everything from the editing and design process to printing, marketing, and distribution.",
    highlights: [
      "Co-publishing ventures & joint distribution networks",
      "International rights exchange & global catalog syndication",
      "Archival edition manufacturing with premier foil-stamped craftsmanship",
    ],
  },
  distributor: {
    slug: "distributor",
    name: "Distributor",
    singularName: "Distributor",
    pluralName: "Distributors",
    badge: "GLOBAL LOGISTICS",
    description:
      "A book distributor plays a crucial role in the publishing industry, serving as an intermediary between publishers and retailers.",
    highlights: [
      "Extensive wholesale channel networks & automated replenishment",
      "Real-time supply chain analytics and inventory tracking",
      "Seamless import/export fulfillment across the UK, Europe, & USA",
    ],
  },
  "literary-agent": {
    slug: "literary-agent",
    name: "Literary Agent",
    singularName: "Literary Agent",
    pluralName: "Literary Agents",
    badge: "TALENT & RIGHTS",
    description:
      "A Thought Leader is someone recognized as an authority in a specific field or industry. Thought leaders are known for their expertise, innovative ideas, and ability to influence others through their insights. They often share their knowledge through speaking engagements, publications, social media, and other platforms, helping to shape opinions, trends, and best practices in their area of expertise.",
    highlights: [
      "High-value publishing deal curation & translation rights",
      "Film and television adaptation representation",
      "Career management and long-term royalty maximization",
    ],
  },
  speaker: {
    slug: "speaker",
    name: "Speaker",
    singularName: "Speaker",
    pluralName: "Speakers",
    badge: "ORATORY & KEYNOTE",
    description:
      "A “speaker” is an individual who delivers speeches or presentations to an audience, often at conferences, seminars, workshops, or other events. Speakers are typically experts in a particular subject, and they use their platform to educate, inspire, motivate, or persuade their audience.",
    highlights: [
      "Exclusive bookings at prestigious literary festivals & summits",
      "Executive workshop facilitation and masterclasses",
      "Media appearances and podcast feature syndication",
    ],
  },
  "thought-leader": {
    slug: "thought-leader",
    name: "Thought Leader",
    singularName: "Thought Leader",
    pluralName: "Thought Leaders",
    badge: "VISIONARY LEADERSHIP",
    description:
      "A Thought Leader is someone recognized as an authority in a specific field or industry. Thought leaders are known for their expertise, innovative ideas, and ability to influence others through their insights. They often share their knowledge through speaking engagements, publications, social media, and other platforms, helping to shape opinions, trends, and best practices in their area of expertise.",
    highlights: [
      "Monograph and editorial publishing series sponsorship",
      "Roundtable leadership with literary and academic pioneers",
      "Global think-tank collaboration and policy advisory platforms",
    ],
  },
  printer: {
    slug: "printer",
    name: "Printer",
    singularName: "Printer",
    pluralName: "Printers",
    badge: "CRAFT & PRODUCTION",
    description:
      "A book Print plays a crucial role in the publishing industry, serving as an intermediary between publishers and retailers.",
    highlights: [
      "Sustainable FSC-certified archival printing and binding",
      "Custom foil stamping, edge guilding, and slipcase fabrication",
      "High-volume commercial and limited luxury collector print runs",
    ],
  },
};
