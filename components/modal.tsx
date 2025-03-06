"use client";
import { useRef, useEffect } from "react";
import { Button } from "@/components";

export function Modal({
  modalTitle,
  modalDescription,
  isOpen,
  onCloseAction,
  confirmButtonAction,
  form = false,
  dialogue = false,
  children,
  maxWidth = "max-w-md",
  showCloseButton = true,
}: {
  modalTitle?: string;
  modalDescription?: string;
  isOpen: boolean;
  onCloseAction: () => void;
  confirmButtonAction: () => void;
  form?: boolean;
  dialogue?: boolean;
  children?: React.ReactNode; // Dynamic content for modal body
  maxWidth?: string;
  showCloseButton?: boolean;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onCloseAction();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onCloseAction]);

  // Ensure the modal is closed if the isOpen prop is false
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex animate-modalBackground items-center justify-center bg-slate-500 bg-opacity-40">
      <div
        ref={modalRef}
        className={`${maxWidth} animate-fadeInUp rounded-lg bg-white shadow-lg dark:bg-slate-950`}
      >
        {modalTitle && (
          <div className="rounded-t-lg bg-slate-200 px-6 pb-2 pt-4 shadow-button-shadow dark:bg-slate-800">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              {modalTitle}
            </h2>
          </div>
        )}
        {modalDescription && <p className="text-md mx-6 mt-4 text-slate-600">{modalDescription}</p>}

        {form && (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                confirmButtonAction();
              }}
              className="mx-6 mt-4"
            >
              {children}
            </form>

            {showCloseButton && (
              <div className="my-6 mr-4 flex justify-end">
                <Button colorTheme="obsidian" onClick={onCloseAction} className="mr-2">
                  Cancel
                </Button>
                <Button colorTheme="cerulean" onClick={confirmButtonAction}>
                  Confirm
                </Button>
              </div>
            )}
          </>
        )}

        {!form && !dialogue && (
          <>
            <div className="mt-4 px-6">{children}</div>
            {showCloseButton && (
              <div className="my-6 mr-4 flex justify-end">
                <Button colorTheme="obsidian" onClick={onCloseAction}>
                  close
                </Button>
              </div>
            )}
          </>
        )}

        {dialogue && (
          <>
            <div className="mt-4 px-6">{children}</div>
            {showCloseButton && (
              <div className="my-6 mr-4 flex justify-end">
                <Button colorTheme="obsidian" onClick={onCloseAction} className="mr-2">
                  Cancel
                </Button>
                <Button colorTheme="cerulean" onClick={confirmButtonAction}>
                  Confirm
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
