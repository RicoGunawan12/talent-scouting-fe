import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxCustom({ text }: { text: string }) {
  return (
    <div className="flex items-center space-x-2 my-4 px-2">
      <Checkbox id={text} className="bg-white" />
      <label
        htmlFor={text}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {text}
      </label>
    </div>
  );
}
