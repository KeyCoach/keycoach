import { H3 } from "./headers";

export function LoadingSpinner({ size = "w-10 h-10", className = "" }) {
  return (
    <div
      className={`${size} inline-block animate-spin rounded-full border-4 border-blue-500 border-t-transparent ${className}`}
    ></div>
  );
}

export function LoadingOverlay({ show = true, message = "Loading..." }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex animate-modalBackground items-center justify-center bg-slate-500 bg-opacity-40">
      <div className="min-w-80 max-w-md animate-fadeInUp rounded-lg bg-white p-10 shadow-lg dark:bg-slate-600">
        <div className="text-center">
          <H3 className="pb-5">{message}</H3>
          <div>
            <LoadingSpinner size="w-20 h-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
