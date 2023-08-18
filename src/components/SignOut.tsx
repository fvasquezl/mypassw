"use client";
import React from "react";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <div>
      <button
        className="bg-orange-300 rounded-md p-2"
        onClick={() =>
          signOut({
            callbackUrl: "/login",
            redirect: true,
          })
        }
      >
        SignOut
      </button>
    </div>
  );
};

export default SignOutButton;
