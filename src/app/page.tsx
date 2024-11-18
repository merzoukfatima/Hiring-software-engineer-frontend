// import { redirect } from "next/navigation";
// import { auth } from "./api/auth/callback";
// import { DASHBOARD_URL } from "@/constants";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomeLayout } from "@/layouts/Home";

export default async function Home() {
  // const session = await auth();
  // console.log("session", session);

  // if (session) {
  //   redirect(DASHBOARD_URL);
  // }

  return (
    <HomeLayout>
    <div className="mt-20 mb-20 mx-auto max-w-5xl px-8">
      <div className="mb-12">
        <h1 className="max-w-md mb-9 text-5xl font-extrabold leading-tight ">
          Kickstart your collaborative&nbsp;app
        </h1>
        <p className="max-w-[460px] text-gray-500 text-xl">
          Use the Liveblocks Starter Kit to build your document-based
          collaborative app in&nbsp;minutes.
        </p>
      </div>

      <div className="flex gap-6">
        <Link href="/login">
          <Button>
            <LogIn className="text-xl stroke-3" />
            Sign in
          </Button>
        </Link>
      </div>
    </div>
    </HomeLayout>
  );
}
