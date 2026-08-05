export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  category: string;
  readTime: string;
  heroImage: string;
  content: {
    intro: string[];
    sections: {
      id: string;
      title: string;
      paragraphs: string[];
      bullets?: string[];
      highlightBox?: {
        title: string;
        text: string;
      };
    }[];
    webinarCallout?: {
      title: string;
      description: string;
      date: string;
      speakers: string[];
      link: string;
    };
    conclusion: string[];
  };
  tableOfContents: {
    id: string;
    text: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const articles: Article[] = [
  {
    slug: "shop-floor-mobility-accelerator-real-time-data-capture",
    title: "Athena Technology's Shop Floor Mobility Accelerator: Real-Time Data Capture for the Factory Floor",
    subtitle: "How handheld mobile workflows eliminate fixed PC bottlenecks, lower hardware maintenance costs, and synchronize shop floor transactions directly into your MES.",
    excerpt: "Walk any manufacturing floor and you'll notice operators making constant trips back and forth to fixed PC workstations. Athena Technology's Shop Floor Mobility Accelerator puts the entire workstation into operators' hands using rugged Zebra devices, delivering real-time MES data capture and eliminating lost labor time.",
    date: "July 30, 2026",
    author: {
      name: "Athena Technology Operations Team",
      role: "Manufacturing Solutions & MES Practice",
      avatar: "/assets/images/logo.webp"
    },
    category: "Shop Floor Mobility & MES",
    readTime: "6 min read",
    heroImage: "/assets/images/shopfloor-mobility.webp",
    tableOfContents: [
      { id: "the-problem", text: "The Problem: Fixed Workstations Slow Down Data Capture" },
      { id: "the-solution", text: "The Solution: One Handheld Device Instead of Four Fixed Assets" },
      { id: "financial-case", text: "The Financial Case: Why This Affects the P&L, Not Just the Floor" },
      { id: "rollout-path", text: "The Rollout Path: From Pilot to Floor-Wide Standard" },
      { id: "where-to-learn-more", text: "Where to Learn More" }
    ],
    content: {
      intro: [
        "Walk any manufacturing floor and you'll notice the same pattern repeating itself. An operator finishes a task, walks across the room to a fixed PC workstation to log what just happened, then walks back. Multiply that trip by every lot, every shift, every operator on the floor, and the amount of time spent moving to and from a terminal, rather than doing the work itself, becomes significant.",
        "This is the problem Athena addresses through its Shop Floor Mobility Accelerator. Manufacturers have invested years and real budget into their MES platforms, expecting those systems to deliver the visibility that drives faster, better-informed decisions. But an MES is only as good as the data feeding it. When that data arrives late, gets entered twice, or picks up errors along the way, the system ends up reflecting yesterday's operations instead of today's."
      ],
      sections: [
        {
          id: "the-problem",
          title: "The Problem: Fixed Workstations Slow Down Data Capture",
          paragraphs: [
            "Every workstation on a traditional factory floor needs a desktop PC, a monitor, a keyboard, a mouse, and a wired barcode scanner. That's five pieces of hardware, five cables, and five devices IT has to maintain, all fixed to one spot. Operators, meanwhile, are not fixed to one spot. They move between lines, cells, and staging areas throughout the shift, and every trip back to a terminal is time not spent on the work in front of them.",
            "Across a large facility running multiple shifts, this adds up to a meaningful amount of lost labor time. It rarely shows up as a single line item on a budget, which is part of why it persists year after year. No one flags five minutes here or three minutes there. But a floor full of operators making that same walk dozens of times a day translates into real cost, and a real lag between when transactions happen and when the MES knows about it."
          ]
        },
        {
          id: "the-solution",
          title: "The Solution: One Handheld Device Instead of Four Fixed Assets",
          paragraphs: [
            "Athena Technology's approach is to put the entire workstation in the operator's hand. The Shopfloor Mobility Accelerator runs on rugged Zebra devices already common on manufacturing floors, so there's no unfamiliar hardware to introduce and no retraining operators on equipment they haven't used before.",
            "The Accelerator is built on a purpose-built React web application that gives operators a focused, task-oriented interface designed for gloved hands and fast decisions on the floor. That interface connects to a .NET (C#) API layer, which handles the business logic and transaction processing, and that layer connects directly into the MES. One integrated device, with its own scanner, screen, and input, replaces the desktop PC, the wired scanner, the keyboard, and the mouse. Four pieces of equipment per station become one device that travels with the person doing the work.",
            "That consolidation shows up beyond the hardware budget. Fewer fixed workstations means fewer cables across the floor, less equipment for IT to maintain, and floor space returned to production and material flow instead of a PC station. For plant operations leaders managing capital requests, this is a change that reduces cost on more than one line.",
            "An important point for any manufacturer evaluating this: the Athena Shop Floor Mobility Accelerator is designed to work with a wide range of MES platforms already in use, so a plant doesn't need to replace or reconfigure its existing system to adopt it. The integration happens at the API layer, which means the Accelerator adapts to the MES a manufacturer already has, rather than requiring the manufacturer to adapt to it.",
            "Real-time MES synchronization: The more significant change is what happens the moment an operator scans a barcode. Instead of a batch upload or a nightly sync, the transaction posts to the MES immediately through the API layer. Starting a lot, completing it, placing it on hold, or moving it to the next stage all update the system of record right away, not twenty minutes or two hours later. In addition to material movement, the Accelerator can be used for capturing equipment status, adding another layer of functionality.",
            "This is where visibility becomes concrete rather than aspirational. A plant manager watching the MES sees what is happening on the floor as it happens, not a record of what happened earlier. If a lot needs to be rerouted, or an exception needs attention, that decision can be made and acted on at the source, rather than waiting until someone gets back to a terminal to report it.",
            "There is also a direct accuracy benefit. Barcode-driven entry removes the manual keying step that has long been a source of transcription errors on the floor. Every scan comes from the label itself, not from someone recalling what the label said at the last station. Fewer errors at the point of capture means less rework downstream, and it means the reports and dashboards built on that MES data are actually reliable.",
            "Coverage extends across the entire floor rather than stopping at a workstation's cabling. One handheld travels with the operator across lines, cells, and stations, so scanning and transacting can happen at the equipment itself, at the WIP cart, or in the staging area, not only at whichever terminal happens to be free. For plants where the layout has grown and changed over the years, that kind of coverage matters."
          ]
        },
        {
          id: "financial-case",
          title: "The Financial Case: Why This Affects the P&L, Not Just the Floor",
          paragraphs: [
            "It's easy to file mobile data collection under 'IT modernization' and move on, but the dollar impact is broader than that framing suggests. Removing paper-based or double-entry workflows cuts printing, storage, and re-keying costs that accumulate across teams and locations.",
            "Faster data turnaround means managers can act on a problem the day it occurs instead of a week later, which matters when the issue is a stalled line or a quality exception that is still cost-effective to fix. Operators freed from paperwork and station trips spend more of their shift on work that actually adds value, and none of this requires proportionally more infrastructure as the operation scales. A plant adding a second shift or a new line doesn't need to buy, cable, and mount a full new set of workstations to keep pace.",
            "None of this requires a redesign of existing systems. The Shop Floor Mobility Accelerator is built to plug into the MES platforms manufacturers already run, so there's no rip-and-replace project attached to it. Improved visibility, reduced manual process, and stronger traceability arrive without asking a plant to abandon the infrastructure it has already invested in.",
            "Every plant's numbers will look different depending on shift patterns, floor size, and how manual the current process is today. Athena Technology is clear that the results observed so far reflect pilot deployment conditions, with formal ROI validation planned as the rollout expands. That level of transparency is worth noting in a market where vendors often promise sweeping savings before a contract is even signed."
          ]
        },
        {
          id: "rollout-path",
          title: "The Rollout Path: From Pilot to Floor-Wide Standard",
          paragraphs: [
            "Athena's rollout plan follows a staged progression rather than an all-at-once switch. The React and .NET application will be loaded onto Zebra handhelds, integrated with MES for lot scans and process transactions. The next stage extends the tool to every shift and line, incorporating operator feedback into the interface and workflow along the way. After that, legacy PC workstations are retired wherever the handheld now covers that ground, making the device the primary interface for factory floor work. As the application scales, additional MES transactions, such as quality checks, material moves, and downtime capture, get added to the same device, so operators aren't switching between multiple tools for different parts of their job.",
            "This staged approach matters for anyone evaluating whether to bring the Athena Shop Floor Mobility Accelerator into their own operation. No one is being asked to replace their MES or retrain an entire workforce overnight. The path runs through a pilot, then broader adoption, then standardization, with each stage building evidence for the next."
          ]
        },
        {
          id: "where-to-learn-more",
          title: "Where to Learn More",
          paragraphs: [
            "Manufacturing, plant operations, digital transformation, and enterprise technology leaders who want a closer look at how this works in practice can join Athena Technology's executive webinar on July 30 at 9:00 AM PST. Naveen Sedhuraman and Maryanne Steidinger will walk through how connected handheld technology is helping manufacturers modernize production data capture and get more value out of the MES platforms they already run, without changing those systems.",
            "The underlying premise is straightforward. You can't act on information you don't have, and real-time visibility only happens when data capture itself happens in real time. Scanning a barcode should do more than identify a product moving through the line. It should track progress, strengthen traceability, and keep operations moving, without requiring an operator to leave the work in order to report on it. That is the gap the Athena Shop Floor Mobility Accelerator is built to close."
          ]
        }
      ],
      webinarCallout: {
        title: "Executive Webinar: Modernizing Production Data Capture",
        description: "Watch Naveen Sedhuraman and Maryanne Steidinger as they walk through how connected handheld technology helps manufacturers modernize production data capture and derive maximum value from existing MES platforms.",
        date: "July 30 at 9:00 AM PST",
        speakers: ["Naveen Sedhuraman", "Maryanne Steidinger"],
        link: "https://zoom.us/rec/share/y6Ui13CpwzzKD8OylANK0nCXgwg11W_yUGS_h3-B_k7mE41u31Xizw-vY7gCk6xF.O28Z1Ror_FLK0Wlm?startTime=1785426013000"
      },
      conclusion: [
        // "Athena Technology has already piloted and deployed this setup with factory floor operators using Zebra handhelds, and the validation took place in a live production environment."
      ]
    },
    faqs: []
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((art) => art.slug === slug);
}
