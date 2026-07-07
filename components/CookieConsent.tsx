"use client";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => { if (!localStorage.getItem("cookie-consent")) setShow(true); }, []);
  if (!show) return null;
  const decide = (v: string) => {
    localStorage.setItem("cookie-consent", v);
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: v }));
    setShow(false);
  };
  return (
    <div role="dialog" aria-label="Cookie consent" className="card fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl p-4 shadow-xl">
      <p className="text-sm">We use cookies for analytics and advertising. Tools themselves run fully in your browser and never send your data anywhere.</p>
      <div className="mt-3 flex gap-2">
        <button className="btn-primary" onClick={() => decide("accepted")}>Accept</button>
        <button className="btn-ghost" onClick={() => decide("rejected")}>Reject non-essential</button>
      </div>
    </div>
  );
}
