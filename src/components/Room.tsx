"use client";

import { ReactNode, useMemo } from "react";
import { RoomProvider } from "@liveblocks/react/suspense";
import { useSearchParams } from "next/navigation";
import { ClientSideSuspense } from "@liveblocks/react";
import { LoaderCircle } from "lucide-react";

export function Room({ children }: { children: ReactNode }) {
  const roomId = useExampleRoomId("liveblocks:examples:nextjs-yjs-blocknote");

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null
      }}>
      <ClientSideSuspense
        fallback={
          <div className="absolute w-screen h-screen flex items-center justify-center">
            <LoaderCircle className="w-16 h-16 animate-spin" />
          </div>
        }>
        {children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}

/**
 * This function is used when deploying an example on liveblocks.io.
 * You can ignore it completely if you run the example locally.
 */
function useExampleRoomId(roomId: string) {
  const params = useSearchParams();
  const exampleId = params?.get("exampleId");

  const exampleRoomId = useMemo(() => {
    return exampleId ? `${roomId}-${exampleId}` : roomId;
  }, [roomId, exampleId]);

  return exampleRoomId;
}
