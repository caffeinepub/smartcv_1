export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  salary: string;
  skills: string[];
  description: string;
  postedDate: string;
  promoted: boolean;
  companyColor: string;
  companyInitials: string;
}

export const mockJobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Frontend Engineer",
    company: "Stripe",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$150k – $200k",
    skills: ["React", "TypeScript", "Next.js"],
    description:
      "Join Stripe's frontend team to build the future of payments infrastructure. You'll work on high-impact products used by millions of developers worldwide.",
    postedDate: "2 days ago",
    promoted: true,
    companyColor: "#635bff",
    companyInitials: "ST",
  },
  {
    id: "job-2",
    title: "Full Stack Developer",
    company: "Notion",
    location: "Remote",
    type: "Remote",
    salary: "$120k – $160k",
    skills: ["Node.js", "React", "PostgreSQL"],
    description:
      "Help build and scale Notion's collaboration platform. You'll own features end-to-end and collaborate closely with design and product teams.",
    postedDate: "3 days ago",
    promoted: false,
    companyColor: "#000000",
    companyInitials: "NO",
  },
  {
    id: "job-3",
    title: "UX/UI Designer",
    company: "Figma",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130k – $170k",
    skills: ["Figma", "Prototyping", "User Research"],
    description:
      "Shape the future of design tooling at Figma. Work alongside world-class designers to create intuitive, beautiful, and powerful UI experiences.",
    postedDate: "1 week ago",
    promoted: true,
    companyColor: "#f24e1e",
    companyInitials: "FG",
  },
  {
    id: "job-4",
    title: "Data Scientist",
    company: "OpenAI",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$160k – $220k",
    skills: ["Python", "ML", "PyTorch"],
    description:
      "Work on cutting-edge AI research at OpenAI. Apply machine learning techniques to advance the state of AI safety and capabilities research.",
    postedDate: "4 days ago",
    promoted: false,
    companyColor: "#10a37f",
    companyInitials: "OA",
  },
  {
    id: "job-5",
    title: "Product Manager",
    company: "Linear",
    location: "Remote",
    type: "Remote",
    salary: "$140k – $180k",
    skills: ["Product Strategy", "Agile", "Analytics"],
    description:
      "Drive product vision and roadmap at Linear. Work closely with engineering and design to ship features that delight developers and teams worldwide.",
    postedDate: "5 days ago",
    promoted: false,
    companyColor: "#5e6ad2",
    companyInitials: "LN",
  },
  {
    id: "job-6",
    title: "Marketing Manager",
    company: "HubSpot",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$90k – $120k",
    skills: ["SEO", "Content Marketing", "Analytics"],
    description:
      "Lead growth marketing initiatives at HubSpot. Create campaigns that drive acquisition, activation, and retention across our suite of marketing tools.",
    postedDate: "1 week ago",
    promoted: true,
    companyColor: "#ff7a59",
    companyInitials: "HS",
  },
  {
    id: "job-7",
    title: "Backend Engineer",
    company: "PlanetScale",
    location: "Remote",
    type: "Remote",
    salary: "$130k – $175k",
    skills: ["Go", "MySQL", "Kubernetes"],
    description:
      "Build the database infrastructure powering the next generation of applications at PlanetScale. Work on distributed systems at massive scale.",
    postedDate: "3 days ago",
    promoted: false,
    companyColor: "#000000",
    companyInitials: "PS",
  },
  {
    id: "job-8",
    title: "DevOps Engineer",
    company: "Vercel",
    location: "Remote",
    type: "Remote",
    salary: "$125k – $165k",
    skills: ["AWS", "Terraform", "Docker"],
    description:
      "Own and improve Vercel's deployment infrastructure used by millions of developers. Build reliable, scalable systems that developers love.",
    postedDate: "6 days ago",
    promoted: false,
    companyColor: "#000000",
    companyInitials: "VC",
  },
  {
    id: "job-9",
    title: "Content Strategist",
    company: "Mailchimp",
    location: "Atlanta, GA",
    type: "Full-time",
    salary: "$80k – $105k",
    skills: ["Copywriting", "Brand Strategy", "Email Marketing"],
    description:
      "Craft compelling content strategies for Mailchimp's diverse customer base. Help small businesses tell their stories and grow their audiences.",
    postedDate: "2 weeks ago",
    promoted: false,
    companyColor: "#ffe01b",
    companyInitials: "MC",
  },
  {
    id: "job-10",
    title: "iOS Developer",
    company: "Spotify",
    location: "Stockholm, Sweden",
    type: "Full-time",
    salary: "€80k – €110k",
    skills: ["Swift", "SwiftUI", "Xcode"],
    description:
      "Build world-class music experiences on iOS at Spotify. Shape how 600M+ listeners discover and enjoy music every single day.",
    postedDate: "4 days ago",
    promoted: true,
    companyColor: "#1db954",
    companyInitials: "SP",
  },
  {
    id: "job-11",
    title: "Security Engineer",
    company: "Cloudflare",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$140k – $190k",
    skills: ["Security", "Rust", "Network Protocols"],
    description:
      "Protect the Internet at Cloudflare. Work on cutting-edge security systems that defend against threats and protect millions of websites globally.",
    postedDate: "1 week ago",
    promoted: false,
    companyColor: "#f38020",
    companyInitials: "CF",
  },
  {
    id: "job-12",
    title: "Growth Engineer",
    company: "Loom",
    location: "Remote",
    type: "Remote",
    salary: "$120k – $155k",
    skills: ["React", "A/B Testing", "Analytics"],
    description:
      "Drive Loom's growth engine through data-driven experiments and high-velocity product iterations. Bridge engineering and marketing to accelerate growth.",
    postedDate: "5 days ago",
    promoted: false,
    companyColor: "#625df5",
    companyInitials: "LM",
  },
];
