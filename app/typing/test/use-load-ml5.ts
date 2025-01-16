import { useEffect } from "react";

// loads ml5 onto the Window Object
declare global {
  interface Window {
    ml5: any;
  }
}

/** Load ml5 module */
export function useLoadMl5() {
  useEffect(() => {
    if (document.getElementById("ml5-script")) return;
    if (window.ml5) return;

    const ml5Script = document.createElement("script");
    ml5Script.src = "https://unpkg.com/ml5@1/dist/ml5.js";
    ml5Script.id = "ml5-script";
    ml5Script.async = true;
    document.head.appendChild(ml5Script);
  }, []);
}
