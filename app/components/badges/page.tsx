import { Badge } from "@/components/badges";
import { Card } from "@/components/card";

export default async function Components() {
  return (
    <div>
      <div className="h-screen w-screen grid grid-cols-3 auto-rows-auto p-8 gap-6">
        <div className="col-span-3">
          <h1 className="text-3xl font-bold">Badges</h1>
        </div>

        <div className="flex flex-col gap-4 items-start">
          <Badge icon="check" colorTheme="green" />
          <Badge icon="escape" colorTheme="red" />
          <Badge icon="more" colorTheme="cerulean" />
          <Badge icon="remove" colorTheme="amber" />
          <Badge icon="error" colorTheme="red" />
          <Badge icon="bookmark" colorTheme="green" />
          <Badge icon="stop" colorTheme="red" />
        </div>

        <div className="flex flex-col gap-4 items-start">
          <Badge icon="check" colorTheme="green" label="Complete" />
          <Badge icon="escape" colorTheme="red" label="Wrong" />
          <Badge icon="more" colorTheme="cerulean" label="In Progress" />
          <Badge icon="remove" colorTheme="amber" label="Not Started" />
          <Badge icon="error" colorTheme="red" label="Error" />
          <Badge icon="bookmark" colorTheme="green" label="Save" />
          <Badge icon="stop" colorTheme="red" label="Help" />
        </div>
        
      </div>
        <div className="h-screen w-screen flex flex-col gap-6 p-8">
        <h1 className="text-3xl font-bold">Cards</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            title="Home Row"
            subtitle="Begin learning the Home Row"
            badgeIcon="check"
            badgeTheme="green"
            buttonText="Relearn"
            onButtonClick={() => alert("Relearn clicked!")}
          />
          <Card
            title="Typing Test"
            subtitle="Test your typing skills"
            badgeIcon="escape"
            badgeTheme="red"
            buttonText="Start"
            onButtonClick={() => alert("Start clicked!")}
          />
        </div>
      </div>
    </div>
  );
}





