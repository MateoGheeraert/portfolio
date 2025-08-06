"use client";

import { useState, useEffect } from "react";

interface TypewriterEffectProps {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  cursorChar?: string;
  startDelay?: number;
}

export default function TypewriterEffect({
  text,
  speed = 100,
  className = "",
  showCursor = true,
  cursorChar = "|",
  startDelay = 500,
}: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursorBlink, setShowCursorBlink] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(
        () => {
          setDisplayText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        },
        currentIndex === 0 ? startDelay : speed
      );

      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentIndex, text, speed, startDelay]);

  // Cursor blinking effect
  useEffect(() => {
    if (isTypingComplete && showCursor) {
      const cursorInterval = setInterval(() => {
        setShowCursorBlink((prev) => !prev);
      }, 500);

      return () => clearInterval(cursorInterval);
    }
  }, [isTypingComplete, showCursor]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span
          className={`inline-block transition-opacity duration-100 ${
            showCursorBlink || !isTypingComplete ? "opacity-100" : "opacity-0"
          }`}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}
