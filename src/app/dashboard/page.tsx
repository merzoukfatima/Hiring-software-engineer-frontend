"use client";
import supabase from "../utils/supabase/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
    const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error retrieving session:", error.message);
        router.replace("/"); // Redirect to home or login on failure
      } else {
        console.log("Session retrieved:", data.session);
        router.replace("/dashboard"); // Redirect to the actual dashboard
      }
    };

    handleRedirect();
  }, [router]);
  return <div>Welcome!</div>;
}
