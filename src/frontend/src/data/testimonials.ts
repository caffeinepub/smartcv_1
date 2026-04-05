export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  content: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "Google",
    rating: 5,
    content:
      "SmartCV completely transformed my job search. The ATS-optimized templates helped me get past automated screening, and the AI suggestions polished my experience section tremendously. I went from zero callbacks to landing my dream role at Google in under 6 weeks.",
    avatar: "SC",
  },
  {
    id: 2,
    name: "Marcus Williams",
    role: "Product Manager",
    company: "Shopify",
    rating: 5,
    content:
      "I was skeptical about resume builders, but SmartCV is genuinely different. The real-time preview saved me so much back-and-forth with formatting. The cover letter templates are professional and the AI writing assistance gave me language I never would have thought of on my own.",
    avatar: "MW",
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "UX Designer",
    company: "Adobe",
    rating: 5,
    content:
      "As a designer, I'm extremely picky about aesthetics. The Premium templates in SmartCV actually impressed me — particularly the Visionary and Aurora templates. Clean, modern, ATS-friendly. I designed my own resume for years but SmartCV saved me hours.",
    avatar: "PN",
  },
  {
    id: 4,
    name: "James Okafor",
    role: "Recent Graduate",
    company: "Deloitte",
    rating: 4,
    content:
      "Just graduated and was completely lost on how to write a professional resume. The step-by-step wizard guided me through every section and the suggestions for new grads were spot-on. Got my first big-four offer within 2 months of using SmartCV!",
    avatar: "JO",
  },
  {
    id: 5,
    name: "Elena Vasquez",
    role: "Marketing Director",
    company: "HubSpot",
    rating: 5,
    content:
      "I've recommended SmartCV to my entire team. The job board integration is fantastic — being able to see real listings and tailor my resume to specific roles is a huge time saver. The PDF export quality is genuinely print-ready, which matters for senior-level applications.",
    avatar: "EV",
  },
  {
    id: 6,
    name: "David Kim",
    role: "Data Scientist",
    company: "Netflix",
    rating: 5,
    content:
      "The data science template specifically is excellent — it highlights the right technical skills without looking cluttered. The drag-and-drop section reordering let me customize exactly which projects to feature for each application. Worth every penny of the Pro plan.",
    avatar: "DK",
  },
];
