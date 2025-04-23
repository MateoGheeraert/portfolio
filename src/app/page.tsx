"use server";

import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

export default async function Home() {
  redirect(`/${defaultLocale}`);
}
