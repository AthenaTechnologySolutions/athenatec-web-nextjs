export type LeaderProfile = {
  id: string;
  slug: string;
  name: string;
  designation: string;
  shortBio: string;
  fullBio: string[];
  profileImage: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  achievements?: string[];
  expertise?: string[];
  yearsExperience?: number;
  quote?: string;
  philosophy?: string;
  milestones?: string[];
  group: "leadership" | "advisory" | "collaborator";
  photoWidth?: string;
  photoAspect?: string;
  photoObjectPosition?: string;
};

export const leadershipProfiles: LeaderProfile[] = [
  {
    id: "senthil-ranganathan",
    slug: "senthil-ranganathan",
    name: "Senthil Ranganathan",
    designation: "Founder & CEO",
    shortBio:
      "Senthil Ranganathan is the CEO and Founder of Athena Technology Solutions and a seasoned manufacturing technology leader with extensive experience driving digital transformation initiatives across global manufacturing organizations. Prior to founding Athena, Senthil worked with leading manufacturing companies including Seagate Technology and Solyndra, where he gained deep exposure to large-scale manufacturing operations, engineering processes, and enterprise manufacturing systems.",
    fullBio: [
      "Senthil Ranganathan is the CEO and Founder of Athena Technology Solutions and a seasoned manufacturing technology leader with extensive experience driving digital transformation initiatives across global manufacturing organizations. Prior to founding Athena, Senthil worked with leading manufacturing companies including Seagate Technology and Solyndra, where he gained deep exposure to large-scale manufacturing operations, engineering processes, and enterprise manufacturing systems.",
      "Over the years, he has helped semiconductor, medical device, electronics, and discrete manufacturing organizations modernize their manufacturing ecosystems through scalable MES strategies, operational digitalization, and connected enterprise initiatives. Under his leadership, Athena has grown into a trusted manufacturing technology partner focused on delivering practical, scalable, and business-driven transformation programs.",
       "Senthil is also leading Athena’s vision around AI-powered orchestration and connected manufacturing intelligence, helping organizations move toward smarter, more connected, and data-driven manufacturing operations. His leadership combines strong industry knowledge, customer-focused execution, and a passion for advancing the future of digital manufacturing.",
    ],
    profileImage: "/assets/images/Senthil.webp",
    linkedinUrl: "https://www.linkedin.com/in/senthil-ranganathan-6168406/",
    yearsExperience: 25,
    
    group: "leadership",
    photoWidth: "265px",
    photoAspect: "583 / 700",
  },
  {
    id: "peter-nakaso",
    slug: "peter-nakaso",
    name: "Peter Nakaso",
    designation: "VP of Sales",
    shortBio:
      "Peter Nakaso is an accomplished commercial and technical leader specializing in MES services strategy and enterprise‑scale manufacturing transformation. As VP of Sales at Athena Technology, he leads organizations through the full MES lifecycle from early discovery and solution architecture to implementation, optimization, and long-term operational support.",
    fullBio: [
      "Peter Nakaso is an accomplished commercial and technical leader specializing in MES services strategy and enterprise‑scale manufacturing transformation. As VP of Sales at Athena Technology, he leads organizations through the full MES lifecycle from early discovery and solution architecture to implementation, optimization, and long-term operational support.",
      "With more than 30 years of experience across manufacturing systems, automation, enterprise integrations, production implementations, and multi‑site MES rollouts, Peter brings a blend of strategic insight and operational expertise. His work spans high‑precision and regulated sectors focusing on electronics, semiconductor, and medical device manufacturing, where compliance, scalability, and execution excellence are essential.",
      "Peter partners with executive teams to modernize production, strengthen digital capabilities, and deliver measurable operational outcomes in complex, highly regulated environments.",
    ],
    profileImage: "/assets/images/Peter-Picture.webp",
    linkedinUrl: "https://www.linkedin.com/in/peter-nakaso-b242631/",
    yearsExperience: 30,
    
    group: "leadership",
    photoWidth: "265px",
    photoAspect: "683 / 800",
  },

  
  {
    id: "sachi-javli",
    slug: "sachi-javli",
    name: "Sachi Javli",
    designation: "Managing Director & Global Delivery",
    shortBio:
      "Sachi Javli is a seasoned IT Services & cybersecurity leader and Managing Director at Athena Technology Solutions, with 30+ years of IT and security leadership experience across leading organizations including TCS, NIIT, Infosys, Accenture, PwC, and Standard Chartered. He previously served as SVP & Head of Application Security Services at Standard Chartered GBS India and Director, Cyber Security Advisory at PwC India and held key strategic roles such as Head of Security CoE at Infosys and creator of Accenture’s Application Security Liquid Studio. Currently manages Athena India Delivery and Operations.",
    fullBio: [
      "Sachi Javli is a seasoned IT Services & cybersecurity leader and Managing Director at Athena Technology Solutions, with 30+ years of IT and security leadership experience across leading organizations including TCS, NIIT, Infosys, Accenture, PwC, and Standard Chartered. He previously served as SVP & Head of Application Security Services at Standard Chartered GBS India and Director, Cyber Security Advisory at PwC India and held key strategic roles such as Head of Security CoE at Infosys and creator of Accenture’s Application Security Liquid Studio. Currently manages Athena India Delivery and Operations.",
      "Widely recognized as a thought leader in application and cyber security, Sachi has delivered 50+ industry sessions, served as a keynote speaker, panellist, and invited speaker at prominent forums including NASSCOM-DSCI, NULLCON, ISACA, and major global security conferences. He is also a strong advocate for diversity in cybersecurity, having built one of the first all-women certified ethical hacking teams at Infosys.",
      "Beyond technology, he is deeply committed to social impact, rural education, environmental conservation, and mentoring, bringing passion, leadership, and community focus to both professional and social initiatives. He holds a Master’s in Energy Engineering & Management from Anna University and a bachelor’s in mechanical engineering from University Visvesvaraya College of Engineering.",
    ],
    profileImage: "/assets/images/Sachii.webp",
    linkedinUrl: "https://www.linkedin.com/in/sachi-javli-b6b01523/",
    yearsExperience: 30,
    
    group: "leadership",
    photoWidth: "310px",
    photoAspect: "1 / 1",
  },
  {
    id: "chaitra-raviprakash",
    slug: "chaitra-raviprakash",
    name: "Chaitra Raviprakash",
    designation: "Director of Manufacturing Systems (Opcenter COE) & Site Head",
    shortBio:
      "Chaitra Raviprakash is the Director of Manufacturing Systems and leads the Opcenter Center of Excellence at Athena Technology Solutions. With over 18 years of experience in Manufacturing Execution Systems (MES) and digital manufacturing transformation, she has successfully led and delivered large-scale manufacturing programs across semiconductor, medical device, electronics, battery, solar, and discrete manufacturing industries.",
    fullBio: [
      "Chaitra Raviprakash is the Director of Manufacturing Systems and leads the Opcenter Center of Excellence at Athena Technology Solutions. With over 18 years of experience in Manufacturing Execution Systems (MES) and digital manufacturing transformation, she has successfully led and delivered large-scale manufacturing programs across semiconductor, medical device, electronics, battery, solar, and discrete manufacturing industries.",
      "She brings deep expertise in Siemens Opcenter MES solutions and previously Camstar MES platforms, with extensive experience in MES implementations, upgrades, manufacturing process digitalization, enterprise integrations, and multi-site deployment strategies. Throughout her career, Chaitra has worked closely with global manufacturers to modernize manufacturing operations, improve operational visibility, and accelerate digital transformation initiatives across complex manufacturing environments.",
      "At Athena, Chaitra has played a key role in building and expanding the company’s Opcenter practice and delivery capabilities. She also architected several of Athena’s purpose-built MES accelerators focused on engineering change management, master data synchronization, automated testing, and intelligent manufacturing workflows designed to help customers accelerate implementations, reduce operational complexity, and improve scalability. Known for her strong industry knowledge and practical execution approach, she actively collaborates with customers and technology partners to drive scalable and connected manufacturing transformation initiatives.",
    ],
    profileImage: "/assets/images/Media1.webp",
    linkedinUrl: "https://www.linkedin.com/in/chaitra-raviprakash-21464217/",
    yearsExperience: 18,
    
    group: "leadership",
    photoWidth: "280px",
    photoAspect: "832 / 921",
  },
  {
    id: "jothi-periasamy",
    slug: "jothi-periasamy",
    name: "Jothi Periasamy",
    designation: "Chief Agentic AI Architect",
    shortBio:
      "Jothi Periasamy is Chief Agentic AI Architect for the State of California and creator of the AAMVA-awarded California DMV Personalized License Plate machine learning algorithm. He leads Agentic AI deployments across the California DMV, Caltrans, EDD, and other state agencies, is the founder of the multi-agent orchestration platform LLM at Scale.AI, and has trained over 300,000 professionals worldwide.",
    fullBio: [
      "Jothi Periasamy is Chief Agentic AI Architect for the State of California and creator of the AAMVA-awarded California DMV Personalized License Plate machine learning algorithm. He leads Agentic AI deployments across the California DMV, Caltrans, EDD, and other state agencies, is the founder of the multi-agent orchestration platform LLM at Scale.AI, and has trained over 300,000 professionals worldwide.",
      "He has advised the Prime Minister's Offices of Dubai and Malaysia on adopting AI in public services, facilitated AI for Executives at the Massachusetts Institute of Technology (MIT), and taught data science at UC Davis. He designed and delivered the nation's first after-school Agentic AI program for middle and high school students with SMUD and the City of Rancho Cordova.",
      "A published author and global speaker, Jothi holds a Master's in Data Science from Harvard University.",
    ],
    profileImage: "/assets/images/Jothi.webp",
        linkedinUrl: "https://www.linkedin.com/in/jothiperiasamy/",
    group: "collaborator",
    photoWidth: "310px",
    photoAspect: "2756 / 3543",
    photoObjectPosition: "center 8%",
  },
 
  {
    id: "maryanne-steidinger",
    slug: "maryanne-steidinger",
    name: "Maryanne Steidinger",
    designation: "Advisor",
    shortBio:
      "Advises on partner strategy, go-to-market positioning, alliances, and operational software ecosystems.",
    fullBio: [
      "Maryanne Steidinger is a member of Athena's Advisory Board, where she concentrates on partner strategy, go-to-market planning, strategic alliances, marketing, and positioning.",
      "Maryanne has a strong background in operational software and industrial controls, with more than 35 years in marketing and partner management.",
      "Her experience includes leadership roles and ecosystem work with companies including Siemens, Rockwell, and Schneider Electric, giving Athena valuable perspective on industrial technology partnerships and market alignment.",
    ],
    profileImage: "/assets/images/mary.png",
    achievements: [
      "35+ years across operational software and industrial controls",
      "Built partner and alliance strategies with major industrial technology companies",
      "Advises Athena on positioning, ecosystem strategy, and go-to-market execution",
    ],
    expertise: ["Partner strategy", "Strategic alliances", "Industrial software", "Go-to-market"],
    yearsExperience: 35,
    philosophy:
      "Maryanne brings a market-aware advisory style that connects strong positioning with meaningful partner ecosystems.",
    milestones: [
      "Led marketing and partner management initiatives across industrial software",
      "Worked with Siemens, Rockwell, and Schneider Electric ecosystems",
      "Joined Athena's Advisory Board to guide growth and alliance strategy",
    ],
    group: "advisory",
    photoWidth: "310px",
    photoAspect: "827 / 1162",
    photoObjectPosition: "center 18%",
  },
  {
    id: "ed-mathias",
    slug: "ed-mathias",
    name: "ED Mathias",
    designation: "Advisor",
    shortBio:
      "Guides strategic initiatives with deep manufacturing operations, systems integration, and lean execution insight.",
    fullBio: [
      "Ed Mathias is an Advisor at Athena Technology Solutions, bringing decades of leadership experience in manufacturing operations and systems integration.",
      "Since joining Athena in 2017, Ed has played a key role in guiding strategic initiatives and ensuring operational alignment with customer expectations.",
      "With a strong focus on lean principles and data-driven decision-making, Ed helps Athena maintain transparency and efficiency across delivery processes.",
    ],
    profileImage: "/assets/images/ED.webp",
    achievements: [
      "Joined Athena as an Advisor in 2017",
      "Guided strategic initiatives and operational alignment",
      "Supported lean, transparent, data-driven delivery practices",
    ],
    expertise: ["Manufacturing operations", "Systems integration", "Lean principles", "Operational strategy"],
    yearsExperience: 30,
    philosophy:
      "Ed's advisory approach emphasizes operational clarity, lean execution, and decisions grounded in evidence.",
    milestones: [
      "Built decades of manufacturing operations and systems integration leadership",
      "Joined Athena's advisory team in 2017",
      "Helped align strategic initiatives with customer delivery expectations",
    ],
    group: "advisory",
    photoWidth: "310px",
    photoAspect: "827 / 1162",
    photoObjectPosition: "center 12%",
  },
];

export const leadershipTeam = leadershipProfiles.filter(
  (leader) => leader.group === "leadership",
);

export const advisoryBoard = leadershipProfiles.filter(
  (leader) => leader.group === "advisory",
);

export const strategicCollaborators = leadershipProfiles.filter(
  (leader) => leader.group === "collaborator",
);

export function getLeaderBySlug(slug: string) {
  return leadershipProfiles.find((leader) => leader.slug === slug);
}

export function getAdjacentLeaders(slug: string) {
  const currentLeader = getLeaderBySlug(slug);

  if (!currentLeader) {
    return { previous: undefined, next: undefined };
  }

  const groupProfiles = leadershipProfiles.filter(
    (leader) => leader.group === currentLeader.group,
  );
  const currentIndex = groupProfiles.findIndex((leader) => leader.slug === slug);

  if (currentIndex === -1 || groupProfiles.length < 2) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous:
      currentIndex > 0 ? groupProfiles[currentIndex - 1] : groupProfiles.at(-1),
    next:
      currentIndex < groupProfiles.length - 1
        ? groupProfiles[currentIndex + 1]
        : groupProfiles[0],
  };
}
