import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formExercises } from "./_ex";

export default function FormPage() {
  return (
    <div>
      <ExerciseTabs />
    </div>
  );
}

export function ExerciseTabs() {
  return (
    <Tabs defaultValue={formExercises[0].label} className="w-full ">
      <TabsList className="mb-6">
        {formExercises.map(({ label }) => (
          <TabsTrigger key={label} value={label} className="capitalize px-4">
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {formExercises.map(({ label, component }) => (
        <TabsContent key={label} value={label} className=" w-fit mx-auto">
          {component}
        </TabsContent>
      ))}
    </Tabs>
  );
}
