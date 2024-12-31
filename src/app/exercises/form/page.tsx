import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formExercises } from "./_ex";

export default function FormPage() {
  return (
    <div>
      <TabsDemo />
    </div>
  );
}

export function TabsDemo() {
  return (
    <Tabs defaultValue={formExercises[0].label} className="w-fit">
      <TabsList className="flex">
        {formExercises.map(({ label }) => (
          <TabsTrigger key={label} value={label} className="capitalize px-4">
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {formExercises.map(({ label, component }) => (
        <TabsContent value={label}>{component}</TabsContent>
      ))}
    </Tabs>
  );
}
