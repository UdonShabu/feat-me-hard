import { redirect } from "next/navigation";

export default function ExercisesPage() {
  redirect("/exercises/form");

  return null;
}
