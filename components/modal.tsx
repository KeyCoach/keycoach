import { useState } from "react";
import { Button } from "@/components/button";

export function Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-slate-800">Edit profile</h2>
        <p className="text-sm text-slate-600 mt-1">
          Make changes to your profile here. Click save when you're done.
        </p>
        <form className="mt-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Email"
              className="w-full mt-1 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-700">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center bg-slate-100 border-2 border-slate-300 px-3 text-slate-500 box-border">
                @
              </span>
              <input
                id="username"
                type="text"
                placeholder="pduarte"
                className="w-full pl-14 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={onClose} className="mr-2" colorTheme="obsidian">
              Cancel
            </Button>
            <Button colorTheme="cerulean">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
