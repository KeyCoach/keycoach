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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <div className="flex flex-row h-1/2 flex-wrap items-start">
              <Button onClick={() => setIsModalOpen(true)} colorTheme="cerulean">
                Open Modal
              </Button>
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
