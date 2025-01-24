"use client"
import { useState } from "react";
import { Icon } from "@/components/icon";
import { Button } from "@/components/button";
import { TextInput } from "@/components/inputs/text-input";

export default function Components() {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div className="h-screen w-screen grid grid-cols-3 auto-rows-auto">
        <div id="centered-button" className="w-full flex flex-row flex-wrap items-start gap-4">
          <h1 className="text-3xl">Buttons</h1>
          <Button
            colorTheme="cerulean"
            children={<span>cerulean button</span>}
          />
          <Button
            colorTheme="obsidian"
            children={<span>obsidian button</span>}
          />
          <Button
            colorTheme="red"
            children={<span>red button</span>}
          />
          <Button
            colorTheme="amber"
            children={<span>amber button</span>}
          />
          <Button
            colorTheme="green"
            children={<span>green button</span>}
          />
          <Button variant="previous-nav" children={<span className="ml-auto">previous</span>} />
          <Button variant="next-nav" children={<span className="mr-auto">next</span>} />
        </div>
        <div id="inputs" className="grid place-items-center">
          <h1 className="text-3xl">Inputs</h1>
          <TextInput
            label="Regular Text Input"
            id="regular-text-input"
            type="text"
            placeholder="Type here"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <TextInput
            label="Email"
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextInput
            label="Password"
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div id="modals" className="grid place-items-center">
        </div>
      </div>

      <div className="h-screen w-screen grid grid-cols-3 grid-rows-3">
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
