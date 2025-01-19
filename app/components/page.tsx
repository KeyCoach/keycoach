import { Icon } from "@/components/icon";
import { Button } from "@/components/button";

export default async function Components() {
  return (
    <div>
      <div className="h-screen w-screen grid grid-cols-3 auto-rows-auto">
        <div id="centered-button" className="grid place-items-center">
          <Button variant="centered" children={<span>first button</span>} />
          <Button
            variant="centered"
            className="bg-obsidian-200"
            children={<span>first button</span>}
          />
        </div>
        <div id="previous-button" className="grid place-items-center"></div>
        <div id="next-button" className="grid place-items-center"></div>
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
        </div>
      </div>
    </div>
  );
}
