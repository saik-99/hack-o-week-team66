import { FAQRule } from './types';

export const INSTITUTE_NAME = "TechFlow Academy";

// The strict rule-based knowledge base
export const FAQ_DATABASE: FAQRule[] = [
  {
    id: 'courses',
    category: 'Academics',
    keywords: ['course', 'program', 'degree', 'class', 'learn', 'subject', 'offer'],
    answer: "We offer three main tracks: 1. Full Stack Web Development (React/Node), 2. Data Science & AI (Python/Gemini), and 3. Cloud Computing (AWS/GCP). All courses are 6 months long."
  },
  {
    id: 'fees',
    category: 'Admissions',
    keywords: ['fee', 'cost', 'price', 'tuition', 'money', 'pay', 'expensive'],
    answer: "Our tuition fees are $2,500 per semester. We also offer monthly installment plans and merit-based scholarships for qualifying students."
  },
  {
    id: 'timings',
    category: 'General',
    keywords: ['time', 'hour', 'open', 'close', 'schedule', 'when'],
    answer: " The institute is open Monday to Saturday, from 9:00 AM to 6:00 PM. Classes are scheduled in two shifts: Morning (10 AM - 1 PM) and Afternoon (2 PM - 5 PM)."
  },
  {
    id: 'contact',
    category: 'Contact',
    keywords: ['contact', 'phone', 'email', 'call', 'reach', 'number', 'address'],
    answer: "You can reach us at saikonde03@gmail.com or call +917972253404. Our campus is located at 123 Innovation Drive, Tech Park, NY."
  },
  {
    id: 'placement',
    category: 'Career',
    keywords: ['job', 'placement', 'work', 'hire', 'salary', 'career', 'internship'],
    answer: "We provide 100% placement assistance. Our graduates have been hired by top tech companies like Google, Microsoft, and Amazon."
  },
  {
    id: 'admission',
    category: 'Admissions',
    keywords: ['admission', 'apply', 'enroll', 'join', 'register', 'deadline'],
    answer: "Admissions are open for the upcoming batch starting next month. You can apply online via our website or visit the admission office with your ID proof."
  },
  {
    id: 'certification',
    category: 'Academics',
    keywords: ['certificate', 'diploma', 'degree', 'certified', 'exam'],
    answer: "Yes, you will receive an industry-recognized certification upon successful completion of the course and the final capstone project."
  },
  {
    id: 'prerequisites',
    category: 'Academics',
    keywords: ['pre', 'require', 'eligib', 'background', 'skill', 'need'],
    answer: "No prior coding experience is required for our beginner modules. However, basic computer literacy and logical thinking skills are recommended."
  },
];

export const QUICK_REPLIES = [
  "What courses do you offer?",
  "What are the fees?",
  "Class timings?",
  "Contact information",
  "Placement support"
];

// System instruction for the Gemini Fallback
export const GEMINI_SYSTEM_INSTRUCTION = `
You are the helpful AI assistant for ${INSTITUTE_NAME}.
Your goal is to answer visitor questions based on the following knowledge base.
If the answer is not explicitly in the knowledge base, provide a polite, professional answer inferred from general educational institute context, but mention that they should contact support for specifics.
Keep answers concise (under 50 words) and friendly.

Knowledge Base:
${FAQ_DATABASE.map(rule => `- Q: [${rule.keywords.join(', ')}] -> A: ${rule.answer}`).join('\n')}
`;