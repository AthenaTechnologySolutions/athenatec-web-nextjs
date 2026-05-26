// export type FaqItem = {
//   question: string;
//   answer: string;
// };

// type FaqSectionProps = {
//   title?: string;
//   intro?: string;
//   faqs: FaqItem[];
// };

// export default function FaqSection({
//   title = "Frequently Asked Questions",
//   intro,
//   faqs,
// }: FaqSectionProps) {
//   return (
//     <section className="bg-white py-16 sm:py-20" id="faqs">
//       <div className="container">
//         <div className="mx-auto max-w-3xl text-center">
//           <h2 className="text-3xl font-bold text-[#15356e] sm:text-4xl">
//             {title}
//           </h2>
//           {intro && (
//             <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
//               {intro}
//             </p>
//           )}
//         </div>

//         <div className="mx-auto mt-10 grid max-w-5xl gap-4">
//           {faqs.map((faq) => (
//             <details
//               className="group rounded-lg border border-[#dbe9f3] bg-[#f8fbfd] p-5 open:bg-white open:shadow-[0_12px_32px_rgba(28,69,132,0.08)]"
//               key={faq.question}
//             >
//               <summary className="cursor-pointer list-none text-lg font-semibold text-[#1c4584] marker:hidden">
//                 <span className="flex items-start justify-between gap-4">
//                   {faq.question}
//                   <span className="mt-1 text-xl leading-none text-[#17ace4] group-open:hidden">
//                     +
//                   </span>
//                   <span className="mt-1 hidden text-xl leading-none text-[#17ace4] group-open:inline">
//                     -
//                   </span>
//                 </span>
//               </summary>
//               <p className="mt-4 text-base leading-7 text-gray-700">
//                 {faq.answer}
//               </p>
//             </details>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
