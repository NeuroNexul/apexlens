"use client";

import React from "react";
import { Button } from "./button";
import style from "./theme_toggle_icon.module.css";
import { getCookie, setCookie } from "@/lib/cookie";

type Props = {};

export default function ThemeToggleButton({}: Props) {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    setIsDark(getCookie("theme") === "dark");
  }, []);

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    setCookie(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light",
      15
    );
    setIsDark(document.documentElement.classList.contains("dark"));
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="overflow-hidden aspect-square"
      onClick={toggleTheme}
    >
      <ThemeToggleIcon isDark={isDark} />
    </Button>
  );
}

export function ThemeToggleIcon({ isDark }: { isDark: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      data-theme={isDark ? "dark" : "light"}
      className={`${style.icon}`}
    >
      <mask id="moon" className={`${style.icon} ${style.moon}`}>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="white"
          className={`${style.icon}`}
        ></rect>
        <circle
          cx="40"
          cy="8"
          r="11"
          fill="black"
          className={`${style.icon}`}
        ></circle>
      </mask>
      <circle
        id="sun"
        cx="12"
        cy="12"
        r="11"
        mask="url(#moon)"
        className={`${style.icon} ${style.sun}`}
      ></circle>
      <g id="sun-beams" className={`${style.icon} ${style.sunBeams}`}>
        <line x1="12" y1="1" x2="12" y2="3" className={`${style.icon}`}></line>
        <line
          x1="12"
          y1="21"
          x2="12"
          y2="23"
          className={`${style.icon}`}
        ></line>
        <line
          x1="4.22"
          y1="4.22"
          x2="5.64"
          y2="5.64"
          className={`${style.icon}`}
        ></line>
        <line
          x1="18.36"
          y1="18.36"
          x2="19.78"
          y2="19.78"
          className={`${style.icon}`}
        ></line>
        <line x1="1" y1="12" x2="3" y2="12" className={`${style.icon}`}></line>
        <line
          x1="21"
          y1="12"
          x2="23"
          y2="12"
          className={`${style.icon}`}
        ></line>
        <line
          x1="4.22"
          y1="19.78"
          x2="5.64"
          y2="18.36"
          className={`${style.icon}`}
        ></line>
        <line
          x1="18.36"
          y1="5.64"
          x2="19.78"
          y2="4.22"
          className={`${style.icon}`}
        ></line>
      </g>
    </svg>
  );
}
