import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { todoExercises } from "./_ex";

export default function TodoPage() {
  return (
    <div>
      {" "}
      <ExerciseTabs />
    </div>
  );
}

export function ExerciseTabs() {
  return (
    <Tabs defaultValue={todoExercises[0].label} className="w-full ">
      <TabsList className="mb-6">
        {todoExercises.map(({ label }) => (
          <TabsTrigger key={label} value={label} className="capitalize px-4">
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {todoExercises.map(({ label, component }) => (
        <TabsContent key={label} value={label} className=" w-fit mx-auto">
          {component}
        </TabsContent>
      ))}
    </Tabs>
  );
}
