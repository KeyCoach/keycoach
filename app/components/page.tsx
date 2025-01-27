"use client";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { Button } from "@/components/button";
import { TextInput } from "@/components/inputs/text-input";
import { TextArea } from "@/components/inputs/text-area";
import { TextInputWithAddon } from "@/components/inputs/text-input-with-addon";
import { Modal } from "@/components/modal";

export default function Components() {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isNonFormModalOpen, setNonIsFormModalOpen] = useState(false);
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [modalEmail, setModalEmail] = useState("");
  const [modalUsername, setModalUsername] = useState("");

  return (
    <div>
      <div className="h-screen w-screen grid grid-cols-3 auto-rows-auto">
        <div id="centered-button" className="w-full flex flex-row flex-wrap items-start gap-4">
          <h1 className="text-3xl">Buttons</h1>
          <Button colorTheme="cerulean">
            <span>cerulean button</span>
          </Button>
          <Button colorTheme="obsidian">
            <span>obsidian button</span>
          </Button>
          <Button colorTheme="red">
            <span>red button</span>
          </Button>
          <Button colorTheme="amber">
            <span>amber button</span>
          </Button>
          <Button colorTheme="green">
            <span>green button</span>
          </Button>
          <Button variant="previous-nav">
            <span className="ml-auto">previous</span>
          </Button>
          <Button variant="next-nav">
            <span className="mr-auto">next</span>
          </Button>
        </div>
        <div id="inputs" className="flex flex-col items-center gap-8">
          <h1 className="text-3xl">Inputs</h1>
          <TextInput
            label="Regular Text Input (vertical label)"
            id="regular-text-input"
            type="text"
            placeholder="Type here"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <TextInput
            label="Regular Text Input"
            id="regular-text-input"
            type="text"
            placeholder="Type here"
            onChange={(e) => setText(e.target.value)}
            value={text}
            labelSetting="horizontal"
          />
          <TextInput
            label="Email (vertical label)"
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextInput
            label="Password (vertical label)"
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <TextInput
            label="Email"
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            labelSetting="horizontal"
          />
          <TextInput
            label="Password"
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            labelSetting="horizontal"
          />
          <TextArea
            label="Description"
            id="text-area"
            placeholder="Type a description here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <TextInputWithAddon
            label="Text Input with Addon"
            id="text-input-with-addon"
            type="text"
            placeholder="Type here"
            onChange={(e) => setText(e.target.value)}
            value={text}
            addon="$"
            addonPosition="right"
          />
        </div>
        <div id="modals" className="">
          <div id="centered-button" className="flex flex-col justify-center items-center">
            <h1 className="text-3xl mb-8">Modals/Dialogues</h1>
            <div className="flex flex-row h-1/2 gap-4 flex-wrap items-start">
              <Button onClick={() => setIsFormModalOpen(true)} colorTheme="cerulean">
                Open Modal with Form
              </Button>
              <Button onClick={() => setNonIsFormModalOpen(true)} colorTheme="cerulean">
                Open Modal without Form
              </Button>
              <Button onClick={() => setIsDialogueOpen(true)} colorTheme="obsidian">
                Open Dialogue
              </Button>
              <Modal
                modalTitle={"Example Modal with Form"}
                modalDescription={
                  "This is an example of a modal. There are many components to be added as children, such as inputs or buttons."
                }
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                confirmButtonFunction={() => setIsFormModalOpen(false)}
                form={true}
              >
                <div className="flex flex-col gap-4">
                  <TextInput
                    id="modal-input-email"
                    label="Email"
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setModalEmail(e.target.value)}
                    value={modalEmail}
                  />
                  <TextInputWithAddon
                    label="Username"
                    id="modal-input-username"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setModalUsername(e.target.value)}
                    value={modalUsername}
                    addon="@"
                    addonPosition="left"
                  />
                </div>
              </Modal>
              <Modal
                modalTitle={"Example Modal without a Form"}
                modalDescription={
                  "This is an example of a modal. There are many components to be added as children, such as inputs or buttons."
                }
                isOpen={isNonFormModalOpen}
                onClose={() => setNonIsFormModalOpen(false)}
                confirmButtonFunction={() => setNonIsFormModalOpen(false)}
                form={false}
              >
                <img
                  src="https://images.unsplash.com/photo-1734784547207-7ad9f04c1f0a?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="example image"
                  className="w-full rounded-lg"
                />
              </Modal>
              <Modal
                modalTitle={"Example Dialogue"}
                modalDescription={
                  "This dialogue is to be used as a confirmation for the user. It can be used for deleting an item, or confirming a choice."
                }
                isOpen={isDialogueOpen}
                onClose={() => setIsDialogueOpen(false)}
                confirmButtonFunction={() => setIsDialogueOpen(false)}
                dialogue={true}
              ></Modal>
            </div>
          </div>
        </div>
      </div>

      <div className="h-screen grid grid-cols-3 grid-rows-3 py-12">
        <div id="card"></div>
        <div id="modal"></div>
        <div id="icons" className="grid grid-cols-8 auto-rows-auto">
          <Icon src="icons/check.svg" alt="checkmark icon" w={24} h={24} />
          <Icon src="icons/bookmark.svg" alt="bookmark icon" w={24} h={24} />
          <Icon src="icons/error.svg" alt="error icon" w={24} h={24} />
          <Icon src="icons/escape.svg" alt="escape icon" w={24} h={24} />
          <Icon src="icons/more.svg" alt="more icon" w={24} h={24} />
          <Icon src="icons/remove.svg" alt="remove icon" w={24} h={24} />
          <Icon src="icons/stop.svg" alt="stop icon" w={24} h={24} />
          <Icon src="icons/chevron-left.svg" alt="chevron left icon" w={24} h={24} />
          <Icon src="icons/chevron-right.svg" alt="chevron right icon" w={24} h={24} />
          <Icon
            src="icons/button-vertical-divider.svg"
            alt="button vertical divider icon"
            w={6}
            h={24}
          />
        </div>
      </div>
    </div>
  );
}
