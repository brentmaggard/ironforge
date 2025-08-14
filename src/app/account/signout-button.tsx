"use client";

import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <button
      onClick={signOut}
      className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium
                 border border-red-600 text-red-600 hover:bg-red-50"
    >
      Sign out
    </button>
  );
}