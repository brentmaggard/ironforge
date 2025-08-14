import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import SignOutButton from "./signout-button";

export default async function AccountPage() {
  const supabase = createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Optionally load profile data
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Account</h1>

      <div className="bg-white border rounded-xl p-4">
        <div className="text-sm text-gray-600">Signed in as</div>
        <div className="text-lg font-medium text-gray-900">{user.email}</div>

        {profile?.display_name && (
          <div className="mt-2 text-gray-700">Name: {profile.display_name}</div>
        )}
      </div>

      <SignOutButton />
    </div>
  );
}