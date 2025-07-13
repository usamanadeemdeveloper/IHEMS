"use client";
import { SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { MdClose, MdLogin, MdMenu } from "react-icons/md";
import { NAV_LINKS } from "../lib/navigationLinks";
import Button from "./ui/Button";

const DrawerComponent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isSignedIn } = useUser();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      {/* Button to open drawer */}
      <div className="text-start">
        <Button
          type="button"
          variant="ghost"
          onClick={toggleDrawer}
          icon={<MdMenu className="w-7 h-7" />}
          aria-label="Toggle navigation"
        ></Button>
      </div>

      {/* Drawer component */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen w-64 overflow-y-auto transition-transform duration-300
    ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
    bg-white border-r border-gray-200 shadow-lg`}
        aria-labelledby="drawer-navigation-label"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <h5 className="text-base font-semibold uppercase text-black">Menu</h5>
          <Button
            type="button"
            onClick={toggleDrawer}
            variant="ghost"
            icon={<MdClose className="w-5 h-5" />}
          >
            <span className="sr-only">Close menu</span>
          </Button>
        </div>

        {/* Body */}
        <div className="py-4 px-4">
          {isSignedIn ? (
            <ul className="space-y-2">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="flex items-center gap-3 text-black hover:bg-green-100 px-3 py-2 rounded transition hover:font-medium"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" className="border w-full">
                  <MdLogin size={18} />
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrawerComponent;
