"use client";

import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { useEffect, useState } from "react";
import { Toolbar } from "@/components/Toolbar";
import styles from "./CollaborativeEditor.module.css";
import { Avatars } from "@/components/Avatars";
import supabase from "@/app/utils/supabase/supabase";
import { USER_INFO } from "@/constants";
import { LoaderCircle } from "lucide-react";

// Collaborative text editor with simple rich text, live cursors, and live avatars
export function CollaborativeEditor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  // Set up Liveblocks Yjs provider and fetch session
  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();
      if (error || !session) {
        console.error("Session not found:", error);
        return;
      }
      setUser(session.user);
    };

    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    fetchSession();

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider || !user) {
    return (
      <div className="absolute w-screen h-screen flex items-center justify-center">
        <LoaderCircle className="w-16 h-16 animate-spin" />
      </div>
    );
  }

  return <BlockNote doc={doc} provider={provider} user={user} />;
}

type EditorProps = {
  doc: Y.Doc;
  provider: any;
  user: any;
};

function BlockNote({ doc, provider, user }: EditorProps) {
  // Get random user color
  const randomUserInfo =
    USER_INFO[Math.floor(Math.random() * USER_INFO.length)];
  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: user.email!, // Using email as the name
        color: randomUserInfo.color
      }
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.editorHeader}>
        <Toolbar editor={editor} />
        <Avatars />
      </div>
      {/* In the code below, we disabled BlockNote's built-in menus and toolbars to get a plain editor. */}
      {/* Simply use <BlockNoteView editor={editor} className={styles.editorContainer} /> if you want a full-fledged editor experience. */}
      <BlockNoteView
        editor={editor}
        className={styles.editorContainer}
        theme="light"
        formattingToolbar={false}
        linkToolbar={false}
        sideMenu={false}
        slashMenu={false}
        filePanel={false}
        tableHandles={false}
      />
    </div>
  );
}
