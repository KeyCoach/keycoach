import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/button";
import { TextInput } from "@/components/inputs/text-input";
import { TextInputWithAddon } from "@/components/inputs/text-input-with-addon";

export function Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside the modal content
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-500 bg-opacity-40">
      <div ref={modalRef} className="max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-slate-800">Edit profile</h2>
        <p className="text-sm text-slate-600 mt-1">
          Make changes to your profile here. Click save when you're done.
        </p>
        <form className="mt-4 space-y-4">
          <TextInput
            id="modal-input-email"
            label="Email"
            type="text"
            placeholder="Email"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextInputWithAddon
            label="Username"
            id="modal-input-username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            addon="@"
            addonPosition="left"
          />
          <div className="flex justify-end">
            <Button colorTheme="obsidian" onClick={onClose} className="mr-2">
              Cancel
            </Button>
            <Button colorTheme="cerulean">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
