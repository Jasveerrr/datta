"use client";

import { io } from "socket.io-client";

// Initialize socket connection
// autoConnect is false by default so we can control when it connects (e.g. after login or on specific pages)
export const socket = io(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000", {
  autoConnect: false,
});
