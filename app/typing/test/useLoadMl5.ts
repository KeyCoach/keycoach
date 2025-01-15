import { useEffect } from "react";
import { Element } from "p5";

// loads ml5 and p5 onto the Window Object
declare global {
  interface Window {
    ml5: any;
    video: Element;
  }
}

export function useLoadMl5() {
  useEffect(() => {
    const ml5Script = document.createElement("script");
    ml5Script.src = "https://unpkg.com/ml5@1/dist/ml5.js";
    ml5Script.async = true;
    document.body.appendChild(ml5Script);

    return () => {
      document.body.removeChild(ml5Script);
    };
  }, []);
}
