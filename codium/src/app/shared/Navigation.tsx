"use client";

import { useState } from "react";
import Topbar from "./Topbar";
import MainDrawer from "./MainDrawer";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Topbar menuButtonCallback={() => setOpen(true)} />
      <MainDrawer
        state={open}
        setState={setOpen}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
}
