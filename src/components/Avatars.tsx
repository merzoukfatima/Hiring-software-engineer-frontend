import { useOthers, useSelf } from "@liveblocks/react/suspense";
import styles from "./Avatars.module.css";
import { USER_INFO } from "@/constants";

export function Avatars() {
  const currentUser = USER_INFO[Math.floor(Math.random() * USER_INFO.length)];
  return (
    <div className={styles.avatars}>
      {currentUser && (
        <div className="relative ml-8 first:ml-0">
          <Avatar picture={currentUser.picture} color={currentUser.color} />
        </div>
      )}
    </div>
  );
}

export function Avatar({ picture, color }: { picture: string; color: string }) {
  return (
    <div className={styles.avatar} data-tooltip={color}>
      <img
        src={picture}
        className={styles.avatar_picture}
        data-tooltip={color}
      />
    </div>
  );
}
