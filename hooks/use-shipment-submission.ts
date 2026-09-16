"use client";

import { useRef } from "react";

// Preserve the key after network/server errors; edited details are a new request.
export function useShipmentSubmission() {
  const pending = useRef(false);
  const submission = useRef<{ payload: string; key: string } | null>(null);
  return {
    begin(payload: unknown) {
      if (pending.current) return null;
      const serialized = JSON.stringify(payload);
      if (submission.current?.payload !== serialized) {
        submission.current = { payload: serialized, key: crypto.randomUUID() };
      }
      pending.current = true;
      return submission.current.key;
    },
    finish() { pending.current = false; },
  };
}
