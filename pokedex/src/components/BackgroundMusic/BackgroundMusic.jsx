"use client";

import styles from "./BackgroundMusic.module.css";
import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  const [muted, setMuted] = useState(false);

  useEffect(() => {
    audioRef.current.volume = 0.1;

    audioRef.current.play();
  }, []);

  function toggleMusic() {
    if (muted) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    setMuted(!muted);
  }

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/audio/pokemon-theme.mp3" type="audio/mpeg" />
      </audio>

      <button onClick={toggleMusic} className={styles.musicButton}>
        <div className={muted ? styles.centerOff : styles.centerOn} />
      </button>
    </>
  );
}
