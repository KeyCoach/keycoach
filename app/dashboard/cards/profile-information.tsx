"use client";

import { HasPasswordError } from "@/utils/has-password-error";
import { useUser } from "@/app/user-context";
import { Button, LoadingOverlay, Modal, TextInput } from "@/components";
import axios from "axios";
import { useState } from "react";
import { TrashFill } from "react-bootstrap-icons";

export default function ProfileInformation() {
  const [edittingSettings, setEdittingSettings] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  if (edittingSettings) {
    return (
      <EditProfileInformation
        setEdittingSettings={setEdittingSettings}
        setSuccessMessage={setSuccessMessage}
      />
    );
  } else if (changingPassword) {
    return (
      <ChangePassword
        setChangingPassword={setChangingPassword}
        setSuccessMessage={setSuccessMessage}
      />
    );
  } else {
    return (
      <DisplayProfileInformation
        setEdittingSettings={setEdittingSettings}
        setChangingPassword={setChangingPassword}
        successMessage={successMessage}
      />
    );
  }
}

function ChangePassword({
  setChangingPassword,
  setSuccessMessage,
}: {
  setChangingPassword: (value: boolean) => void;
  setSuccessMessage: (value: string) => void;
}) {
  const [error, setError] = useState("");
  const { user } = useUser();
  const [sentChangePasswordReq, setSentChangePasswordReq] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (data["password"] !== data["confirm-password"]) {
      setError("Passwords do not match");
      return;
    }

    const passwordError = HasPasswordError(data["password"] as string);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setSentChangePasswordReq(true);
    await axios
      .patch("/api/user/password", data)
      .then(() => {
        setChangingPassword(false);
        setSentChangePasswordReq(false);
        setSuccessMessage("Password changed successfully.");
      })
      .catch((err) => {
        setSentChangePasswordReq(false);
        setError("An unknown error occurred. Please try again.");
        console.error(err);
      });
  }

  async function cancelEdit(e: any) {
    e.preventDefault();
    setChangingPassword(false);
  }

  if (!user) return;
  return (
    <div className="rounded-xl bg-slate-50 p-6 shadow dark:bg-slate-800">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextInput
            label="New Password"
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
            required
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="Confirm New Password"
            type="password"
            id="confirm-password"
            name="confirm-password"
            autoComplete="new-password"
            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
            required
          />
        </div>
        {error && <p className="mb-3 text-red-600 dark:text-red-400">{error}</p>}

        <div className="flex gap-3">
          <Button type="submit" className="w-full" colorTheme="cerulean">
            Save Changes
          </Button>
          <Button colorTheme="gray" onClick={cancelEdit} className="flex-shrink-0 bg-slate-200">
            <div className="flex items-center justify-center gap-1">Cancel </div>
          </Button>
        </div>
      </form>
      <LoadingOverlay show={sentChangePasswordReq} message="Changing Password..." />
    </div>
  );
}

function EditProfileInformation({
  setEdittingSettings,
  setSuccessMessage,
}: {
  setEdittingSettings: (value: boolean) => void;
  setSuccessMessage: (value: string) => void;
}) {
  const { user, setUser } = useUser();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sentDeleteReq, setSentDeleteReq] = useState(false);
  const [error, setError] = useState("");
  const [sentUpdateReq, setSentUpdateReq] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    setSentUpdateReq(true);

    await axios
      .patch("/api/user/name", data)
      .then((res) => {
        setUser(res.data.user);
        setEdittingSettings(false);
        setSuccessMessage("Profile information updated successfully.");
      })
      .catch((err) => {
        console.error(err);
        setError("An unknown error occurred. Please try again.");
      })
      .finally(() => {
        setSentUpdateReq(false);
      });
  }

  async function startDeleteAccount(e: any) {
    e.preventDefault();
    setShowDeleteModal(true);
  }

  async function deleteAccount() {
    setSentDeleteReq(true);
    setShowDeleteModal(false);
    await axios
      .delete("/api/user")
      .then(() => {
        window.location.href = "/";
      })
      .catch((err) => {
        setSentDeleteReq(false);
        console.error(err);
      });
  }

  async function cancelEdit(e: any) {
    e.preventDefault();
    setEdittingSettings(false);
  }

  if (!user) return;
  return (
    <div className="rounded-xl bg-slate-50 p-6 shadow dark:bg-slate-800">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <TextInput label="First Name" name="fname" defaultValue={user.fname} />
        </div>
        <div className="mb-3">
          <TextInput label="Last Name" name="lname" defaultValue={user.lname} />
        </div>
        {error && <p className="mb-3 text-red-600 dark:text-red-400">{error}</p>}
        <div className="flex gap-3">
          <Button type="submit" className="w-full" colorTheme="cerulean">
            Save Changes
          </Button>

          <Button colorTheme="gray" onClick={cancelEdit} className="flex-shrink-0 bg-slate-200">
            <div className="flex items-center justify-center gap-1">Cancel </div>
          </Button>

          <Button colorTheme="red" onClick={startDeleteAccount} className="flex-shrink-0">
            <div className="flex items-center justify-center gap-1">
              <TrashFill />
              Delete Account
            </div>
          </Button>
        </div>
      </form>
      <LoadingOverlay show={sentDeleteReq} message="Deleting account..." />
      <LoadingOverlay show={sentUpdateReq} message="Updating Profile" />
      <Modal
        modalTitle={"We're sorry to see you go."}
        modalDescription={
          "Are you sure you want to delete your account? This action cannot be undone and all data will be lost permanently."
        }
        isOpen={showDeleteModal}
        onCloseAction={() => setShowDeleteModal(false)}
        confirmButtonAction={deleteAccount}
        dialogue={true}
      ></Modal>
    </div>
  );
}

function DisplayProfileInformation({
  setEdittingSettings,
  setChangingPassword,
  successMessage,
}: {
  setEdittingSettings: (value: boolean) => void;
  setChangingPassword: (value: boolean) => void;
  successMessage: string;
}) {
  const { user } = useUser();

  if (!user) return;
  return (
    <div className="rounded-xl bg-slate-50 p-6 shadow dark:bg-slate-800">
      <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
        Profile Information
      </h2>
      <div className="text-slate-700 dark:text-slate-300">
        <p className="mb-2">
          First Name: <span className="font-medium">{user.fname || "Not set"}</span>
        </p>
        <p className="mb-2">
          Last Name: <span className="font-medium">{user.lname || "Not set"}</span>
        </p>
        <p className="mb-2">
          Email: <span className="font-medium">{user.email}</span>
        </p>
      </div>

      {successMessage && (
        <p className="mt-4 text-green-600 dark:text-green-400">{successMessage}</p>
      )}
      <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
        <div
          onClick={() => setEdittingSettings(true)}
          className="cursor-pointer text-sm text-cerulean-600 hover:underline dark:text-cerulean-400"
        >
          Edit profile settings
        </div>

        <div
          onClick={() => setChangingPassword(true)}
          className="cursor-pointer text-sm text-cerulean-600 hover:underline dark:text-cerulean-400"
        >
          Change password
        </div>
      </div>
    </div>
  );
}
