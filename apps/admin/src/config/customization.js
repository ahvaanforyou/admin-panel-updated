// =============================================================================
// AHVAAN ADMIN PANEL — CUSTOMIZATION CONFIGURATION
// =============================================================================
export const CUSTOMIZATION = {
  // ── Branding & Labels ──────────────────────────────────────────────────────
  brand: {
    name: "AHVAAN",
    subName: "FOR YOU",
    tagline: "Bespoke Wedding Invitations & Operations",
  },

  // ── Currency ───────────────────────────────────────────────────────────────
  currency: {
    symbol: "₹",
    code: "INR",
    locale: "en-IN",
  },

  // ── Shared Admin Credentials ───────────────────────────────────────────────
  sharedAdmin: {
    email: "ahvaanforyou@gmail.com",
    name: "Ahvaan Admin",
  },
  admins: [
    { email: "ahvaanforyou@gmail.com", name: "Ahvaan Admin", role: "Admin" }
  ],

  // ── Team Members (Thanu, Chaitu, Farru) ────────────────────────────────────
  teamMembers: [
    { id: "thanu", name: "Thanu", role: "UI/UX Designer" },
    { id: "chaitu", name: "Chaitu", role: "Operations & Creative" },
    { id: "farru", name: "Farru", role: "Frontend & Deliverables" },
  ],

  // ── Event Types (Used in Add Client) ───────────────────────────────────────
  eventTypes: [
    { id: "Wedding", label: "Wedding", desc: "Main wedding ceremony & reception" },
    { id: "Engagement", label: "Engagement", desc: "Ring ceremony & celebration" },
    { id: "Sangeet", label: "Sangeet", desc: "Music night & dance party" },
    { id: "Baby Shower", label: "Baby Shower", desc: "Celebration for upcoming baby" },
    { id: "House Opening", label: "House Opening", desc: "House warming / Griha Pravesh" },
    { id: "Other", label: "Other", desc: "Custom private or corporate event" },
  ],

  // ── Task Priorities & Colors (Red: High/Urgent, Yellow: Medium, Green: Low) ──
  taskPriorities: [
    { id: "Urgent", label: "Urgent", bg: "bg-red-50 text-red-600 border border-red-200", dot: "bg-[#EF4444]", pin: "text-red-500" },
    { id: "High", label: "High", bg: "bg-red-50 text-red-600 border border-red-200", dot: "bg-[#EF4444]", pin: "text-red-500" },
    { id: "Medium", label: "Medium", bg: "bg-amber-50 text-amber-700 border border-amber-200", dot: "bg-[#F59E0B]", pin: "text-amber-500" },
    { id: "Low", label: "Low", bg: "bg-emerald-50 text-emerald-700 border border-emerald-200", dot: "bg-[#10B981]", pin: "text-emerald-500" },
  ],

  taskLabels: [
    "Design",
    "Development",
    "Invitation",
    "Bug",
    "Content",
    "Research",
    "New Template",
    "Customization",
    "Revision",
    "Others",
  ],

  // ── Template Categories ────────────────────────────────────────────────────
  templateCategories: [
    "Wedding",
    "House Warming",
    "Birthday",
    "Baby Shower",
    "Other",
  ],

  templateSubCategories: [
    "Traditional",
    "Modern",
    "Minimal",
    "Gold Foil",
    "Floral",
    "Royal",
    "Animated Video",
    "Other",
  ],

  // ── Expense Categories (Matching Supabase database check constraint) ──────
  expenseCategories: [
    "Marketing",
    "Tools",
    "Other",
  ],

  // ── Payment Methods ────────────────────────────────────────────────────────
  paymentMethods: [
    "UPI",
    "Bank Transfer",
    "Cash",
    "Credit Card",
    "Cheque",
  ],

  // ── Client Workflow Statuses ───────────────────────────────────────────────
  clientStatuses: [
    { id: "In Progress", label: "In Progress" },
    { id: "In Review", label: "In Review" },
    { id: "Completed", label: "Completed" },
    { id: "Template Chosen", label: "Template Chosen" },
    { id: "On Hold", label: "On Hold" },
  ],

  referenceSources: [
    "Instagram",
    "Word of Mouth",
    "Google Search",
    "Friend / Family Referral",
    "Returning Client",
    "Wedding Planner",
    "Other",
  ],
};

export function formatCurrency(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return `${CUSTOMIZATION.currency.symbol}0`;
  return `${CUSTOMIZATION.currency.symbol}${Number(amount).toLocaleString(CUSTOMIZATION.currency.locale)}`;
}
