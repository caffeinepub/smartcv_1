import type { Job } from "./jobs";

// ---------------------------------------------------------------------------
// Pakistan & South Asia Job Database
// A curated, realistic set of jobs across all major categories in Pakistan
// (Karachi, Lahore, Islamabad, Rawalpindi, remote) + Gulf/Middle East for
// Pakistani diaspora. These supplement the Remotive API results so Pakistan
// jobs ALWAYS appear when filtering by location or searching Pakistani roles.
// ---------------------------------------------------------------------------

function pkJob(
  id: string,
  title: string,
  company: string,
  location: string,
  type: "Full-time" | "Part-time" | "Contract" | "Remote",
  salary: string,
  skills: string[],
  description: string,
  applyUrl: string,
  color: string,
): Job {
  const initials = company
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return {
    id,
    title,
    company,
    location,
    type,
    salary,
    skills,
    description,
    postedDate: "Recently",
    promoted: false,
    companyColor: color,
    companyInitials: initials,
    applyUrl,
  };
}

export const pakistanJobs: Job[] = [
  // ---- DATA ENTRY ----
  pkJob(
    "pk-de-1",
    "Data Entry Operator",
    "TechSol Pakistan",
    "Lahore, Pakistan",
    "Full-time",
    "PKR 30,000–45,000/mo",
    ["MS Excel", "Data Entry", "Typing"],
    "Enter and maintain records in Excel and internal systems. Minimum 40 WPM typing speed required.",
    "https://www.rozee.pk",
    "#1a3a8f",
  ),
  pkJob(
    "pk-de-2",
    "Data Entry Specialist",
    "InfoTech Solutions",
    "Karachi, Pakistan",
    "Full-time",
    "PKR 35,000–50,000/mo",
    ["Data Entry", "MS Office", "Accuracy"],
    "Process and verify data for our finance department. Excellent attention to detail required.",
    "https://www.rozee.pk",
    "#0e6b8f",
  ),
  pkJob(
    "pk-de-3",
    "Online Data Entry Clerk",
    "Digital Work PK",
    "Islamabad, Pakistan",
    "Remote",
    "PKR 25,000–40,000/mo",
    ["Data Entry", "Internet", "Google Sheets"],
    "Remote data entry work. Flexible hours. Laptop and internet connection required.",
    "https://www.mustakbil.com",
    "#1a7a4a",
  ),
  pkJob(
    "pk-de-4",
    "Data Entry Executive",
    "Al-Fatah Group",
    "Rawalpindi, Pakistan",
    "Full-time",
    "PKR 28,000–38,000/mo",
    ["Data Entry", "Typing", "MS Word"],
    "Manage product catalog data, pricing updates, and inventory records for our retail chain.",
    "https://www.rozee.pk",
    "#6b3fa0",
  ),
  pkJob(
    "pk-de-5",
    "Data Entry Officer",
    "National Bank of Pakistan",
    "Lahore, Pakistan",
    "Full-time",
    "PKR 40,000–55,000/mo",
    ["Banking", "Data Entry", "MS Excel"],
    "Enter and verify customer account data, transactions and KYC documentation.",
    "https://www.nbp.com.pk",
    "#b5451b",
  ),
  pkJob(
    "pk-de-6",
    "Freelance Data Entry",
    "Upwork / Fiverr",
    "Remote – Pakistan",
    "Remote",
    "$3–$8/hour",
    ["Data Entry", "Web Research", "Excel"],
    "Multiple clients seeking Pakistani freelancers for data entry, copy-paste, and web research tasks.",
    "https://www.upwork.com",
    "#1b5e7a",
  ),

  // ---- TEACHING / EDUCATION ----
  pkJob(
    "pk-edu-1",
    "School Teacher (Science)",
    "City School Network",
    "Lahore, Pakistan",
    "Full-time",
    "PKR 45,000–70,000/mo",
    ["Teaching", "Science", "Curriculum"],
    "Teach O-Level and Matric science subjects. B.Sc. and B.Ed. required.",
    "https://www.thecityschool.edu.pk",
    "#2c5f2e",
  ),
  pkJob(
    "pk-edu-2",
    "Online Tutor (Maths)",
    "Sabaq Foundation",
    "Remote – Pakistan",
    "Remote",
    "PKR 20,000–40,000/mo",
    ["Mathematics", "Online Teaching", "Zoom"],
    "Deliver live online math classes for Grades 6–10. Flexible schedule.",
    "https://www.sabaq.pk",
    "#8b2252",
  ),

  // ---- SALES / MARKETING ----
  pkJob(
    "pk-sales-1",
    "Sales Executive",
    "Telenor Pakistan",
    "Karachi, Pakistan",
    "Full-time",
    "PKR 40,000 + commission",
    ["Sales", "Telecom", "Customer Handling"],
    "Drive SIM and data package sales in assigned territory. Strong communication skills needed.",
    "https://www.telenor.com.pk/careers",
    "#2d6a8a",
  ),
  pkJob(
    "pk-sales-2",
    "Digital Marketing Executive",
    "Inbox Business Technologies",
    "Islamabad, Pakistan",
    "Full-time",
    "PKR 50,000–75,000/mo",
    ["SEO", "Social Media", "Google Ads"],
    "Plan and execute digital campaigns across social and search. Google Ads certification preferred.",
    "https://www.inbox.com.pk",
    "#4a5568",
  ),

  // ---- ACCOUNTING / FINANCE ----
  pkJob(
    "pk-acc-1",
    "Accountant",
    "Packages Limited",
    "Lahore, Pakistan",
    "Full-time",
    "PKR 60,000–90,000/mo",
    ["Accounting", "QuickBooks", "ACCA"],
    "Manage accounts payable/receivable, prepare financial statements and tax returns.",
    "https://www.packages.com.pk",
    "#1a3a8f",
  ),
  pkJob(
    "pk-acc-2",
    "Finance Officer",
    "Habib Bank Limited",
    "Karachi, Pakistan",
    "Full-time",
    "PKR 70,000–100,000/mo",
    ["Finance", "Banking", "Excel"],
    "Monitor budgets, prepare MIS reports, and support audit processes for regional branches.",
    "https://www.hbl.com/careers",
    "#0e6b8f",
  ),

  // ---- IT / SOFTWARE ----
  pkJob(
    "pk-it-1",
    "Web Developer",
    "Systems Limited",
    "Lahore, Pakistan",
    "Full-time",
    "PKR 80,000–130,000/mo",
    ["React", "Node.js", "JavaScript"],
    "Build scalable web applications. 2+ years experience with React and REST APIs required.",
    "https://www.systemsltd.com/careers",
    "#1a7a4a",
  ),
  pkJob(
    "pk-it-2",
    "Mobile App Developer (Flutter)",
    "Arbisoft",
    "Lahore, Pakistan",
    "Full-time",
    "PKR 100,000–170,000/mo",
    ["Flutter", "Dart", "Firebase"],
    "Develop cross-platform mobile apps. Portfolio of published apps preferred.",
    "https://arbisoft.com/careers",
    "#6b3fa0",
  ),
  pkJob(
    "pk-it-3",
    "Junior Software Engineer",
    "10Pearls",
    "Islamabad, Pakistan",
    "Full-time",
    "PKR 70,000–100,000/mo",
    ["Python", "Django", "SQL"],
    "Work on backend APIs and database optimization for enterprise clients in the US market.",
    "https://www.10pearls.com/careers",
    "#b5451b",
  ),

  // ---- HEALTHCARE ----
  pkJob(
    "pk-health-1",
    "Medical Officer",
    "Shaukat Khanum Hospital",
    "Lahore, Pakistan",
    "Full-time",
    "PKR 120,000–180,000/mo",
    ["MBBS", "Clinical", "Patient Care"],
    "Provide out-patient consultations and support oncology ward. MBBS with PMDC registration required.",
    "https://www.skmch.org/careers",
    "#1b5e7a",
  ),
  pkJob(
    "pk-health-2",
    "Pharmacist",
    "Aga Khan University Hospital",
    "Karachi, Pakistan",
    "Full-time",
    "PKR 80,000–110,000/mo",
    ["Pharmacy", "Dispensing", "Patient Counselling"],
    "Dispense medications, counsel patients, and support clinical pharmacy services.",
    "https://www.aku.edu/hr",
    "#2c5f2e",
  ),

  // ---- CUSTOMER SERVICE / BPO ----
  pkJob(
    "pk-bpo-1",
    "Customer Service Representative",
    "TRG Pakistan",
    "Karachi, Pakistan",
    "Full-time",
    "PKR 35,000–55,000/mo",
    ["Customer Service", "English", "CRM"],
    "Handle inbound calls and emails for US/UK clients. Excellent English communication required. Night shift.",
    "https://www.trg.com.pk/careers",
    "#8b2252",
  ),
  pkJob(
    "pk-bpo-2",
    "Call Center Agent",
    "Ibex Global",
    "Islamabad, Pakistan",
    "Full-time",
    "PKR 32,000–50,000/mo",
    ["Customer Support", "English", "Chat Support"],
    "Provide customer support via phone and chat for international telecom clients. Rotational shifts.",
    "https://www.ibex.com/careers",
    "#4a5568",
  ),

  // ---- LOGISTICS / DELIVERY ----
  pkJob(
    "pk-log-1",
    "Delivery Rider",
    "Foodpanda Pakistan",
    "Lahore, Pakistan",
    "Full-time",
    "PKR 25,000–40,000/mo + tips",
    ["Driving", "Navigation", "Time Management"],
    "Deliver food orders on motorcycle in Lahore. Bike required. Flexible working hours available.",
    "https://www.foodpanda.pk",
    "#b5451b",
  ),
  pkJob(
    "pk-log-2",
    "Warehouse Associate",
    "Daraz Pakistan",
    "Karachi, Pakistan",
    "Full-time",
    "PKR 28,000–38,000/mo",
    ["Warehousing", "Inventory", "Physical"],
    "Receive, pick, pack and dispatch orders in our main fulfillment center. Physical work required.",
    "https://careers.daraz.com",
    "#2d6a8a",
  ),

  // ---- GULF / MIDDLE EAST for Pakistani workers ----
  pkJob(
    "pk-gulf-1",
    "Construction Worker",
    "Saudi Binladin Group",
    "Riyadh, Saudi Arabia",
    "Contract",
    "SAR 1,200–1,800/mo",
    ["Construction", "Physical Labour", "Safety"],
    "Skilled and unskilled construction workers needed for mega projects in Saudi Arabia. Visa provided.",
    "https://www.sbg.com.sa",
    "#1a7a4a",
  ),
  pkJob(
    "pk-gulf-2",
    "Security Guard",
    "G4S Gulf",
    "Dubai, UAE",
    "Full-time",
    "AED 1,500–2,000/mo",
    ["Security", "Surveillance", "English"],
    "Provide site security services in Dubai. Training provided. Pakistani applicants welcome.",
    "https://www.g4s.com/careers",
    "#6b3fa0",
  ),
  pkJob(
    "pk-gulf-3",
    "Driver / Chauffeur",
    "Al Futtaim Group",
    "Dubai, UAE",
    "Full-time",
    "AED 2,000–2,800/mo",
    ["Driving", "UAE License", "English"],
    "Professional driver for corporate fleet. Valid UAE or convertible driving license required.",
    "https://www.alfuttaim.com/careers",
    "#0e6b8f",
  ),
];

// ---------------------------------------------------------------------------
// Search helper: filter local Pakistan jobs by a search query
// ---------------------------------------------------------------------------
export function searchPakistanJobs(query: string): Job[] {
  if (!query.trim()) return pakistanJobs;
  const q = query.toLowerCase();
  return pakistanJobs.filter(
    (j) =>
      j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      j.location.toLowerCase().includes(q) ||
      j.skills.some((s) => s.toLowerCase().includes(q)) ||
      j.description.toLowerCase().includes(q),
  );
}
