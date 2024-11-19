import { redirect } from "next/navigation"; // Importing the redirect function to programmatically navigate.
import { DASHBOARD_URL } from "@/constants"; // Importing the dashboard URL from constants.
import { LogIn } from "lucide-react"; // Importing the LogIn icon from the Lucide React library.
import { Button } from "@/components/ui/button"; // Importing a Button component from the UI components.
import Link from "next/link"; // Importing Link for client-side navigation in Next.js.
import { HomeLayout } from "@/layouts/Home"; // Importing the HomeLayout component to wrap the content layout.
import supabase from "./utils/supabase/supabase"; // Importing Supabase client for authentication and database management.

export default async function Home() {
  // Retrieve the current session from Supabase
  const {
    data: { session }
  } = await supabase.auth.getSession();

  // If the user is already logged in (session exists), redirect to the dashboard URL
  if (session) {
    redirect(DASHBOARD_URL);
  }

  // Render the homepage layout if the user is not logged in
  return (
    <HomeLayout>
      <div className="mt-20 mb-20 mx-auto max-w-5xl px-8">
        {/* Main container for the content with margin and width styling */}
        <div className="mb-12">
          {/* Section for the title and description */}
          <h1 className="max-w-md mb-9 text-5xl font-extrabold leading-tight ">
            Real-Time Document&nbsp;Collaboration
            {/* Heading text with custom styling and non-breaking spaces */}
          </h1>
          <p className="max-w-[460px] text-gray-500 text-xl">
            Empowering teams to work together effortlessly with&nbsp;real-time
            updates, seamless&nbsp;collaboration, and shared&nbsp;creativity, no
            matter where they&nbsp;are.
            {/* Paragraph text for the subheading with non-breaking spaces */}
          </p>
        </div>

        <div className="flex gap-6">
          {/* Container for the Sign Up button */}
          <Link href="/login">
            {/* Navigation to the login page */}
            <Button>
              {/* Button component with the LogIn icon */}
              <LogIn className="text-xl stroke-3" />
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}
