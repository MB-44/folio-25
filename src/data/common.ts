import { title } from "process";

// Main Page Content
export const Home = {
  description: "I craft web experiences where beauty meets function — turning ideas into intuitive interfaces that come alive.",
};

// Footer Content
export const Footer = {
  description: "I don’t just design — I help shape brands and products that feel real, work beautifully, and grow with you."
}
// Social Media links & content
export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/mb-44",
    icon: "github",
    visible: true,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/menath.b?igsh=eDJ1NXZ4NXk5M3I5",
    icon: "instagram",
    visible: true,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/menathbaddegama/",
    icon: "linkedin",
    visible: true,
  },
  {
    name: "Twitter / X",
    url: "https://twitter.com/yourusername",
    icon: "twitter",
    visible: true,
  },
];

// About Page Content
export const About = {
  hero: {
    title: "About me",
    leftTitle: "Meet Menath",
    middleDescription: "I've always wanted to make work I'm proud of. Every project is a chance to do something different, something we actually care about.",
    profile: {
      src: "images/profile/profile-img.png",
      alt: "Menath Baddegama",
      name: "Menath Baddegama",
      role: "Creative Developer"
    },
    rightTexts: [
      "Koktò is a family-run studio — just the two of us, designing together and caring about every detail like it's our own. No middle layers. You talk to the people who actually do the work.",
      "Every project starts with the same questions: What's the goal? Who is it for? Then we mix research, strategy, and a bit of taste to make it work — and make it yours."
    ]
  },
  approach: {
    title: "Approach",
    paragraphs: [
      "Every project starts with listening: to the users, the business, the pain points. Then we dig in with research, ideas, and sketches — shaping thoughtful, beautiful experiences with purpose behind every pixel.",
      "We treat design like songwriting: You start with a problem, add structure, emotion, and just enough weirdness to make it memorable. No copy-paste. No templates. Just clear thinking and good taste."
    ]
  },
  drives: {
    title: "What drives me",
    paragraphs: [
      "Our work is shaped by what we live and love — family, art, skateboarding, loud music, and quiet moments.",
      "We believe good taste comes from culture, curiosity, and care. That’s what we bring into every project — not just design skills, but soul."
    ]
  }
};

// Contact Page Content
export const contactContent = {
  heroTitle: "Let's talk",
  heroSubtitle: "Whether it's a new project or a quick question, I'm here to connect.",
  profile: {
    imageSrc: "images/profile/profile-img.png",
    imageAlt: "Menath Lakvindu",
    name: "Menath Lakvindu",
    role: "Creative Developer"
  },
  email: {
    display: "hello@menath",
    href: "#",
    ctaLabel: "Instagram"
  },
  form: {
    placeholders: {
      name: "Name *",
      email: "E-mail *",
      message: "Message (Tell us about your project)"
    },
    submitLabel: "Get in touch"
  },
  links: [
    { href: "#", label: "Instagram" }
  ],
  faqHeader: {
    title: "FAQ",
    subtitle: "We've heard it all. Here's everything you need to know before working with us.",
    askLabel: "Ask a question"
  },
  faq: [
    {
      question: "What's your process for Brand Identity?",
      answer:
        "We start by understanding the problem and how you solve it. Then define what makes your brand unique — its values, vision, and positioning. From there, we shape the identity: voice and tone, visual direction, trademark, brand colors, and typography. After that, we design social media guidelines, identity assets, and a full design system. The result? A brandbook your whole team can use — so no one's ever guessing the logo or forgetting the brand's purpose."
    },
    {
      question: "What's included in your UX/UI process?",
      answer:
        "We start with research: interviews, BI data, competitor and support analysis — to define the problem and plan the project. Then we move to structure: user flows, low-fidelity wireframes, and quick sketches. From there, we build full product flows, UI in high fidelity, content guides, and run usability tests. Next comes visual design: direction, UI, animations, and a scalable design system. After launch, we don't disappear — we validate with real users, analyze feedback, test, and improve."
    },
    {
      question: "Can I come back for updates after launch?",
      answer:
        "Absolutely. Most clients stay in touch, and we're happy to help with iterations, improvements, and new features as your product grows."
    },
    {
      question: "What if I just need a logo?",
      answer:
        "We don't do \"just logos.\" We build identities that work — and that means research, context, and strategy. If you want something fast and generic, we might not be the right fit."
    },
    {
      question: "What kind of research do you use?",
      answer:
        "Depending on the project, we combine user interviews, competitor analysis, BI data, support insights, and testing sessions to shape the right solution."
    },
    {
      question: "Do you design fast MVPs?",
      answer:
        "Yes — but still with purpose. Even if we move fast, we validate core assumptions and design around real needs, not guesswork."
    }
  ]
}