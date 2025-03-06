"use client";

import { Card, Badge } from "@/components";

export default function Components() {
  return (
    <div>
      <div className="h-page grid w-screen auto-rows-auto grid-cols-3 gap-6 p-8">
        <div className="col-span-3">
          <h1 className="text-3xl font-bold">Badges</h1>
        </div>

        <div className="flex flex-col items-start gap-4">
          <Badge icon="check" colorTheme="green" />
          <Badge icon="escape" colorTheme="red" />
          <Badge icon="more" colorTheme="cerulean" />
          <Badge icon="remove" colorTheme="amber" />
          <Badge icon="error" colorTheme="red" />
          <Badge icon="bookmark" colorTheme="green" />
          <Badge icon="stop" colorTheme="red" />
        </div>

        <div className="flex flex-col items-start gap-4">
          <Badge icon="check" colorTheme="green" label="Complete" />
          <Badge icon="escape" colorTheme="red" label="Wrong" />
          <Badge icon="more" colorTheme="cerulean" label="In Progress" />
          <Badge icon="remove" colorTheme="amber" label="Not Started" />
          <Badge icon="error" colorTheme="red" label="Error" />
          <Badge icon="bookmark" colorTheme="green" label="Save" />
          <Badge icon="stop" colorTheme="red" label="Help" />
        </div>
      </div>
      <div className="h-page flex w-screen flex-col gap-6 p-8">
        <h1 className="text-3xl font-bold">Cards</h1>

        <div className="grid auto-rows-auto grid-cols-1 items-start gap-4 md:grid-cols-2">
          <Card
            title="Home Row"
            subtitle="Begin learning the Home Row"
            badgeIcon="check"
            badgeTheme="green"
            buttonText="Relearn"
            onButtonClick={() => alert("Relearn clicked!")}
            imageUrl="https://typing-background-images.s3.us-east-1.amazonaws.com/card/keys.jpg"
            imageAlt="Practice"
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
