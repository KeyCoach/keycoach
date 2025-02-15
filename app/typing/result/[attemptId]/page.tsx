import { Link } from "@/components/link";
import { H1 } from "@/components";
import { Button } from "@/components";
import { GetAttemptById } from "@/service-interfaces/dynamo-db";
import { AuthenticateUser } from "@/utils/authenticate-user";
import { type Attempt } from "@/app/lib/types";


export default async function TestResult({ params }: { params: Promise<{ attemptId: string }> }) {
 const user = await AuthenticateUser();
 const email = user?.email || null;
 const attemptId = (await params).attemptId;


 const attempt = await GetAttemptById(attemptId, email);
 return (
   <div className="min-h-screen w-full flex items-center bg-white dark:bg-slate-950 p-6">
     <div className="max-w-4xl mx-auto">
       <H1 className="text-slate-900 dark:text-slate-50 mb-6">Typing Results</H1>


       <div className="flex gap-4 mb-8">
             <Button colorTheme="cerulean" variant="previous-nav">
               <Link className="w-40 block text-slate-50 no-underline" href="/typing/test">
                 Take another Test
               </Link>
             </Button>
             <Button colorTheme="cerulean">
               <Link className="w-40 block text-slate-50 no-underline" href="/lesson">
                 Continue Learning
               </Link>
             </Button>
       </div>


       {attempt ? <Attempt attempt={attempt} /> : <p>No test found</p>}
     </div>
   </div>
 );
}


function Attempt({ attempt }: { attempt: Attempt }) {
 const formatDate = (date: string | number) => {
   const dateObj = typeof date === 'string' ? new Date(date) : new Date(Number(date));
   return dateObj.toLocaleString(undefined, {
     weekday: 'long',
     year: 'numeric',
     month: 'long',
     day: 'numeric',
     hour: '2-digit',
     minute: '2-digit'
   });
 };


 return (
   <div className="space-y-6">
     {/* Main Stats Card */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
       <div className="bg-green-200 dark:bg-green-800 p-6 rounded-xl shadow-lg">
         <h2 className="text-green-700 dark:text-green-300 text-sm font-medium mb-1">WPM</h2>
         <p className="text-4xl font-bold text-green-800 dark:text-green-200">{Math.round(attempt.wpm)}</p>
       </div>
       <div className="bg-cerulean-200 dark:bg-cerulean-800 p-6 rounded-xl shadow-lg">
         <h2 className="text-cerulean-700 dark:text-cerulean-300 text-sm font-medium mb-1">Accuracy</h2>
         <p className="text-4xl font-bold text-cerulean-800 dark:text-cerulean-200">{(attempt.accuracy * 100).toFixed(1)}%</p>
       </div>
       <div className="bg-amber-200 dark:bg-amber-800 p-6 rounded-xl shadow-lg">
         <h2 className="text-amber-700 dark:text-amber-300 text-sm font-medium mb-1">Finger Accuracy</h2>
         <p className="text-4xl font-bold text-amber-800 dark:text-amber-200">{(attempt.fingerAccuracy * 100).toFixed(1)}%</p>
       </div>
     </div>


     {/* Test Details */}
     <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 shadow-lg">
       <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Test Details</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700 dark:text-slate-300">
         <div>
           <p className="mb-2">
             <span className="font-medium">Duration:</span> {(attempt.duration / 1000).toFixed(1)}s
           </p>
           <p className="mb-2">
             <span className="font-medium">Mistakes:</span> {attempt.mistakesCount}
           </p>
           <p className="mb-2">
             <span className="font-medium">Date:</span> {formatDate(attempt.date)}
           </p>
         </div>
         <div>
           <p className="mb-2">
             <span className="font-medium">Author:</span> {attempt.test.author}
           </p>
           <p className="mb-2">
             <span className="font-medium">Difficulty:</span> {attempt.test.difficulty}
           </p>
           <p className="mb-2">
             <span className="font-medium">Word Count:</span> {attempt.test.wordCount}
           </p>
         </div>
       </div>
     </div>


     {/* Test Text */}
     <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 shadow-lg">
       <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Test Text</h2>
       <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
         {attempt.test.textBody}
       </p>
     </div>


     {attempt.keyStrokes && (
       <div>
         <p>Key Strokes</p>
         <ul>
           {attempt.keyStrokes.map((stroke) => (
             <li key={stroke.time}>
               {stroke.correctFinger} {stroke.pressedFinger} {stroke.correctLetter}{" "}
               {stroke.pressedLetter} {stroke.modelConfidence}
             </li>
           ))}
         </ul>
       </div>
     )}
   </div>
 );
}
