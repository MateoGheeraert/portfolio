import { getProfileSettings } from "@/dal/profile";
import { ProfileSettingsForm } from "./ProfileSettingsForm";

export default async function ProfileSettingsPage() {
  const settings = await getProfileSettings();
  return <ProfileSettingsForm initial={settings} />;
}
