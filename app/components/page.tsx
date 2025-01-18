import { Divider } from "@/components/divider";
import { ProgressBar } from "@/components/progress-bar";

export default async function Components() {
  return (
    <div className="flex flex-col h-full">
      <Divider> </Divider>
      <Divider variant="sm"> </Divider>
      <Divider variant="md"> </Divider>
      <ProgressBar colorVariant="primary" />
    </div>
  );
}
