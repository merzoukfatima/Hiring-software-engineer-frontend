// app/dashboard/page.tsx
import supabase from "../utils/supabase/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies(); // Get cookies
  const accessToken = cookieStore.get("sb-access-token")?.value;

  if (!accessToken) {
    redirect("/login"); // Redirect if no token is found
  }

  const {
    data: { user },
    error
  } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    redirect("/login");
  }

  return <div>Welcome, {user.email}!</div>;
}
