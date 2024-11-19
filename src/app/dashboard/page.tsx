"use client";
import supabase from "../utils/supabase/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense
} from "@liveblocks/react/suspense";
import { Room } from "@/components/Room";
import { CollaborativeEditor } from "@/components/CollaborativeEditor";
import { Providers } from "@/components/Providers";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();

  // Function to handle sign-out
  const handleSignOut = async () => {
    await supabase.auth.signOut({ scope: "global" }); // Sign out the user
    router.push("/"); // Redirect to home page after sign-out
  };

  useEffect(() => {
    const handleRedirect = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error retrieving session:", error.message);
        router.replace("/"); // Redirect to home or login on failure
      } else {
        router.replace("/dashboard"); // Redirect to the actual dashboard
      }
    };

    handleRedirect();
  }, [router]);

  return (
    <Providers>
      <Room>
        <CollaborativeEditor />
        <Button>Save</Button>
        <div className="flex">
          <Button onClick={handleSignOut}>Log Out</Button>{" "}
          {/* Use handleSignOut here */}
        </div>
      </Room>
    </Providers>
  );
}
