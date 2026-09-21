import { Factory, GraduationCap, HeartPulse, type LucideIcon, ShoppingBag, Truck, Utensils, UsersRound, WalletCards } from "lucide-react";

export interface IndustryItem {
  slug: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  desc: string;
  challenges: string[];
  solutions: string[];
  useCases: { title: string; desc: string }[];
}

export const industries: IndustryItem[] = [
  {
    slug: "manufacturing",
    icon: Factory,
    title: "Manufacturing",
    tagline: "Connected operations for modern production teams.",
    desc: "We help manufacturers bring production, inventory, procurement, and reporting into connected digital workflows that make decisions faster.",
    challenges: ["Disconnected plant and office data", "Manual inventory and approval workflows", "Limited production visibility", "Slow reporting and decision cycles"],
    solutions: ["Production dashboards and portals", "Inventory and warehouse systems", "Workflow automation and alerts", "ERP and third-party integrations"],
    useCases: [{ title: "Plant dashboards", desc: "Give teams a real-time view of production performance and bottlenecks." }, { title: "Inventory control", desc: "Track stock, movement, and reorder signals across locations." }, { title: "Vendor portals", desc: "Make procurement and supplier communication easier to manage." }, { title: "Quality workflows", desc: "Digitize inspections, approvals, and issue resolution." }],
  },
  {
    slug: "e-consultancy",
    icon: ShoppingBag,
    title: "E-Consultancy",
    tagline: "Digital systems that turn expertise into growth.",
    desc: "We build polished client experiences and internal systems for consultancy businesses that need to sell expertise, manage delivery, and scale relationships.",
    challenges: ["Manual lead and client onboarding", "Scattered project knowledge", "Inconsistent client communication", "Limited visibility into delivery"],
    solutions: ["Lead and client portals", "Proposal and onboarding workflows", "Knowledge and document systems", "CRM and calendar integrations"],
    useCases: [{ title: "Client portals", desc: "Give clients a clear, professional space to track work and documents." }, { title: "Lead qualification", desc: "Automate the journey from enquiry to a high-quality consultation." }, { title: "Knowledge hubs", desc: "Organize expertise so teams can find and reuse it quickly." }, { title: "Delivery dashboards", desc: "See project health, capacity, and client milestones in one view." }],
  },
  {
    slug: "healthcare",
    icon: HeartPulse,
    title: "Healthcare",
    tagline: "Reliable digital experiences for better care operations.",
    desc: "We design secure, accessible healthcare workflows that reduce administrative friction for providers and make experiences clearer for patients.",
    challenges: ["Appointment and patient coordination", "Paper-heavy administration", "Data spread across tools", "Demand for secure patient experiences"],
    solutions: ["Booking and patient portals", "Care team dashboards", "Secure workflow automation", "Reporting and system integrations"],
    useCases: [{ title: "Patient booking", desc: "Make appointments, reminders, and follow-ups easier to manage." }, { title: "Provider dashboards", desc: "Give care teams the information they need without tool-hopping." }, { title: "Patient portals", desc: "Create clearer digital touchpoints for communication and records." }, { title: "Operations reporting", desc: "Turn service data into practical insights for better planning." }],
  },
  {
    slug: "food-ordering",
    icon: Utensils,
    title: "Food Ordering",
    tagline: "Fast ordering experiences built for busy customers.",
    desc: "From discovery to delivery, we build food ordering products that keep menus, payments, kitchens, and customers connected.",
    challenges: ["Order volume and peak-time pressure", "Menu and availability updates", "Delivery coordination", "Customer retention and repeat orders"],
    solutions: ["Ordering platforms and apps", "Kitchen and delivery dashboards", "Payment and notification flows", "Loyalty and customer automation"],
    useCases: [{ title: "Online ordering", desc: "Create a frictionless ordering journey across web and mobile." }, { title: "Kitchen displays", desc: "Keep preparation teams aligned with live order information." }, { title: "Delivery tracking", desc: "Connect customers and delivery teams with timely updates." }, { title: "Restaurant analytics", desc: "Understand demand, menus, and repeat customer behavior." }],
  },
  {
    slug: "social-networking",
    icon: UsersRound,
    title: "Social Networking",
    tagline: "Community products designed for meaningful connection.",
    desc: "We build community platforms with thoughtful onboarding, content flows, moderation, and scalable infrastructure at their core.",
    challenges: ["Building trust and healthy communities", "High-volume content and activity", "Retention and user engagement", "Moderation and privacy requirements"],
    solutions: ["Community platforms and feeds", "Profiles, messaging, and groups", "Moderation workflows", "Analytics and engagement systems"],
    useCases: [{ title: "Community hubs", desc: "Bring members, conversations, and resources into one place." }, { title: "Creator platforms", desc: "Give creators better tools to publish and grow their audience." }, { title: "Private networks", desc: "Build focused, permission-based spaces for teams or members." }, { title: "Engagement analytics", desc: "Understand what keeps your community active and valuable." }],
  },
  {
    slug: "logistics",
    icon: Truck,
    title: "Logistics",
    tagline: "Visibility and automation across every movement.",
    desc: "We connect logistics workflows so teams can coordinate shipments, inventory, drivers, and customers with less manual effort.",
    challenges: ["Limited shipment visibility", "Manual dispatch and status updates", "Multiple systems and stakeholders", "Cost and capacity pressure"],
    solutions: ["Fleet and dispatch dashboards", "Shipment tracking portals", "Automated status workflows", "Maps, APIs, and system integrations"],
    useCases: [{ title: "Dispatch control", desc: "Coordinate routes, drivers, and delivery priorities in one view." }, { title: "Shipment tracking", desc: "Give teams and customers clearer delivery visibility." }, { title: "Warehouse workflows", desc: "Connect stock movement with operational reporting." }, { title: "Carrier integrations", desc: "Sync essential data across logistics partners and tools." }],
  },
  {
    slug: "education",
    icon: GraduationCap,
    title: "Education",
    tagline: "Better digital journeys for learning communities.",
    desc: "We create accessible education platforms that connect learners, educators, content, and administration in one dependable experience.",
    challenges: ["Fragmented learning tools", "Manual student administration", "Content discovery and engagement", "Communication across stakeholders"],
    solutions: ["Learning portals and dashboards", "Course and content management", "Student and parent workflows", "Assessments and reporting"],
    useCases: [{ title: "Learning platforms", desc: "Give learners a focused home for courses, progress, and resources." }, { title: "Admin systems", desc: "Reduce repetitive work across enrollment and student operations." }, { title: "Live class tools", desc: "Support scheduling, communication, and learning delivery." }, { title: "Progress reporting", desc: "Make outcomes easier to understand for educators and families." }],
  },
  {
    slug: "accounting",
    icon: WalletCards,
    title: "Accounting",
    tagline: "Clearer financial workflows for growing businesses.",
    desc: "We build finance tools that reduce repetitive administration and give teams a more reliable view of billing, expenses, and performance.",
    challenges: ["Spreadsheet-heavy processes", "Delayed financial visibility", "Invoice and payment follow-ups", "Manual reconciliation and approvals"],
    solutions: ["Finance dashboards and portals", "Invoice and expense workflows", "Payment and accounting integrations", "Approval automation and reports"],
    useCases: [{ title: "Invoice automation", desc: "Create, track, and follow up on invoices with less manual work." }, { title: "Expense management", desc: "Make submissions, approvals, and reporting easier for teams." }, { title: "Finance dashboards", desc: "See cash flow, outstanding payments, and key trends clearly." }, { title: "Client billing portals", desc: "Give customers a simple way to view invoices and payment status." }],
  },
];

export function getIndustryBySlug(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
