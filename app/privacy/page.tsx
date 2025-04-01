import { H1 } from "@/components";

export default function SamplePage() {
  return (
    <div className="max-w-2xl mx-auto mt-5 px-4">
      <H1 className="mb-10 text-center">KeyCoach Privacy Policy</H1>
      
      <div className="prose max-w-full">
        <h2 className="text-xl font-bold mb-6">Your privacy is our top priority.</h2>
        
        <p>At KeyCoach, we are committed to ensuring that your data stays secure and private.</p>
        
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Local Video Processing:</strong> When you enable your camera for hand tracking, 
            the video feed is processed entirely on your device. It is never transmitted over the 
            internet, stored, or shared with any third parties.
          </li>
          <li>
            <strong>No Data Collection:</strong> KeyCoach does not record or save any video footage. 
            Your camera is used solely for real-time finger tracking to improve your typing technique.
          </li>
          <li>
            <strong>Secure Experience:</strong> We do not collect, sell, or share personal data 
            related to your typing sessions. All processing happens on your local machine, ensuring 
            your privacy is protected at all times.
          </li>
        </ul>
        
        <p className="mt-6">We value your trust and are committed to maintaining a secure and private learning environment.</p>
      </div>
    </div>
  );
}