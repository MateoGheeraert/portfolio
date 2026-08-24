import { getAllAboutContent } from "@/dal/about";
import { AboutEditor } from "./AboutEditor";

export default async function AdminAboutPage() {
  const content = await getAllAboutContent();
  return <AboutEditor initial={content} />;
}
