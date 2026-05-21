export type Job = {
  slug:             string;
  title:            string;
  type:             string;
  experience:       string;
  locations:        string[];
  overview:         string;
  responsibilities: string[];
  requirements:     string[];
  noticePeriod?:    string;
  shift?:           string;
  education?:       string;
  wpJobId:          string;
};

export const jobs: Job[] = [
  {
    slug:         "oracle-technical-scm",
    title:        "Oracle Technical Requirement with SCM Modules",
    type:         "Full Time",
    experience:   "8+ Years",
    noticePeriod: "Immediate Joiner – 15 Days",
    locations:    [
      "Chennai",
      "Hyderabad",
      "Bangalore",
      // "Pune",
    ],
    wpJobId:      "226650",  

    overview:
      "We are looking for an experienced Oracle Technical professional with strong SCM domain knowledge.",

    responsibilities: [
      "Oracle Forms, Reports, PL/SQL, PO, OM, Inventory – SCM is required",
      "Experience in SCM Domain (PO, OM, INV)",
      "Oracle Workflow / OAF / Apex experience mandatory",
      "Ability to work with business analysts",
      "Strong communication and client interaction skills",
    ],

    requirements: [
      "EBS R12, R11 preferred. Not Fusion Cloud",
      "Team player willing to work in shifts",
      "US client experience is an added advantage",
    ],
  },

  {
    slug:       "rag-system-expert",
    title:      "RAG System Expert for AI/ML Chatbot Development",
    type:       "Full Time",
    experience: "5+ Years",
    locations:  ["Bangalore", "Chennai"],
    wpJobId:    "228087",  

    overview:
      "We are seeking a highly skilled AI/ML developer with expertise in Retrieval Augmented Generation (RAG) systems, particularly in multi-modal and non-text-based RAG applications.",

    responsibilities: [
      "Design, develop, and deploy RAG-based chatbots using Python and OpenAI APIs.",
      "Integrate various data formats (text, images, relational tables) into the RAG framework.",
      "Optimize and maintain RAG systems for high performance and accuracy.",
    ],

    requirements: [
      "Strong expertise in RAG systems (multi-modal preferred).",
      "Minimum 5 years of experience in Python development.",
      "Work experience in AI/ML development.",
      "Hands-on experience with OpenAI APIs.",
    ],
  },

  {
    slug:       "dotnet-developer",
    title:      ".NET Developer",
    type:       "Full Time",
    experience: "1 to 3 Years",
    shift:      "9:30 AM IST to 6:30 PM IST",
    education:  "Computer Science Graduate / Degree / Engineering",
    locations:  ["Chennai", "Trichy", "India"],
    wpJobId:    "226649",

    overview:
      "We are looking for a Software Developer with 1 to 3 years of experience to join our team and contribute to enterprise application development.",

    responsibilities: [
      "Develop and maintain web applications using C#, ASP.NET, MVC.",
      "Build and integrate Web Services and Web APIs.",
      "Collaborate using tools like Microsoft OneNote and SharePoint 2019.",
    ],

    requirements: [
      "Strong experience in C#, ASP.NET, MVC, Web Services, Web API, Entity Framework.",
      "Hands-on experience with RDBMS such as SQL Server, Oracle, MySQL.",
      "Strong understanding of OOPS concepts.",
      "Experience with WCF, design patterns, jQuery, and JavaScript is a plus.",
      "CAMSTAR MES experience is a plus but not mandatory.",
      "Excellent written and verbal communication skills.",
    ],
  },
];
