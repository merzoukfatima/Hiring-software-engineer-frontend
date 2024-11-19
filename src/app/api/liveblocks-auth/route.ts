import { createClient } from "@/app/utils/supabase/server";
import { USER_INFO } from "@/constants";
import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";

/**
 * Authenticating your Liveblocks application
 * https://liveblocks.io/docs/authentication
 */

const liveblocks = new Liveblocks({
  secret: process.env.NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY!
});

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // Get the current user from Supabase
  const {
    data: { session },
    error
  } = await supabase.auth.getSession();
  if (error || !session) {
    console.error("Session not found:", error);
    return new Response("Session not found", { status: 401 });
  }
  console.log("Session:", session);

  console.log("Authenticated user:", session.user);
  const user = session.user;
  // Get random user info
  const randomUserInfo =
    USER_INFO[Math.floor(Math.random() * USER_INFO.length)];

  // Prepare Liveblocks session
  const sessionLiveblocks = await liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.email!, // Using email as the name
      color: randomUserInfo.color,
      picture: randomUserInfo.picture
    }
  });

  // Allow access to rooms with a wildcard
  sessionLiveblocks.allow(
    `liveblocks:examples:*`,
    sessionLiveblocks.FULL_ACCESS
  );

  // Authorize the user and return the result
  try {
    const { body, status } = await sessionLiveblocks.authorize();

    if (status !== 200) {
      console.error("Liveblocks authorization failed:", body);
      return new Response("Authorization failed", { status });
    }

    return new Response(body, { status });
  } catch (err) {
    console.error("Liveblocks authorization error:", err);
    return new Response("Authorization error", { status: 500 });
  }
}

