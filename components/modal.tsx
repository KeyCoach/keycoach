import { useRef, useEffect } from "react";
import { Button } from "@/components/old-button";

export function Modal({
  modalTitle,
  modalDescription,
  isOpen,
  onClose,
  confirmButtonFunction,
  form = false,
  dialogue = false,
  children,
}: {
  modalTitle?: string;
  modalDescription?: string;
  isOpen: boolean;
  onClose: () => void;
  confirmButtonFunction: () => void;
  form?: boolean;
  dialogue?: boolean;
  children?: React.ReactNode; // Dynamic content for modal body
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Ensure the modal is closed if the isOpen prop is false
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-500 bg-opacity-40 animate-modalBackground">
      <div ref={modalRef} className="max-w-md bg-white rounded-lg shadow-lg animate-fadeInUp">
        {modalTitle && (
          <div className="bg-slate-200 pt-4 pb-2 px-6 rounded-t-lg shadow-button-shadow">
            <h2 className="text-xl font-semibold text-slate-800">{modalTitle}</h2>
          </div>
        )}
        {modalDescription && <p className="mt-4 mx-6 text-md text-slate-600">{modalDescription}</p>}

        {form && (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                confirmButtonFunction();
              }}
              className="mt-4 mx-6"
            >
              {children}
            </form>

            <div className="flex justify-end my-6 mr-4">
              <Button colorTheme="obsidian" onClick={onClose} className="mr-2">
                Cancel
              </Button>
              <Button colorTheme="cerulean" onClick={confirmButtonFunction}>
                Confirm
              </Button>
            </div>
          </>
        )}

        {!form && !dialogue && (
          <>
            <div className="mt-4 px-6">{children}</div>
            <div className="flex justify-end my-6 mr-4">
              <Button colorTheme="obsidian" onClick={onClose}>
                close
              </Button>
            </div>
          </>
        )}

        {dialogue && (
          <>
            <div className="mt-4 px-6">{children}</div>
            <div className="flex justify-end my-6 mr-4">
              <Button colorTheme="obsidian" onClick={onClose} className="mr-2">
                Cancel
              </Button>
              <Button colorTheme="cerulean" onClick={confirmButtonFunction}>
                Confirm
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
