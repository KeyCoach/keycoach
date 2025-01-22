import { Icon } from "@/components/icon";
import { Button } from "@/components/button";
import { TextInput } from "@/components/inputs/text-input";

export default async function Components() {
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
        <div id="inputs" className="grid place-items-center">
          <h1 className="text-3xl">Inputs</h1>
          <TextInput
            label="Email"
            id="email"
            type="email"
            placeholder="Email"
            value=""
          />
          <TextInput
            label="Password"
            id="password"
            type="password"
            placeholder="Password"
            value=""
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
