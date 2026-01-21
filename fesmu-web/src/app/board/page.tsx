export default function page() {
  return <div>page</div>;
}

// "use client";

// import { PromButton, PromFrom, PromInput } from "prom-pal-ui";
// import z from "zod";

// export default function BoardPage() {
//   const handle = async () => {
//     try {
//       const res = await fetch("/kk");

//       if (!res.ok) {
//         throw new Error(JSON.stringify({ error: "олдоалво" }));
//       }

//       console.log(res);
//     } catch (error) {
//       console.log("!!!!!");
//       throw error;
//     }
//   };

//   const schema = z.object({
//     text: z
//       .string()
//       .min(2, { message: "Трахну тебя в сраку, пиши более 2 букв пидор" }),
//   });

//   return (
//     <section>
//       <PromFrom
//         defaultValues={{
//           text: "",
//         }}
//         schema={schema}
//         onSubmit={handle}
//         render={({ serverError }) => (
//           <section className="container space-y-4">
//             <PromInput label="ЖОпа" name="text" />
//             <PromButton>fdsfd</PromButton>

//             {serverError && (
//               <pre className="mt-2 rounded-lg bg-red-200 px-3 py-1 text-red-500">
//                 {JSON.parse(serverError).error}
//               </pre>
//             )}
//           </section>
//         )}
//       />
//     </section>
//   );
// }
