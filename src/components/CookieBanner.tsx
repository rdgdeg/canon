"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "canon_cookie_choice";

type CookieChoice = "accepted" | "rejected" | "custom";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      setVisible(true);
    }
  }, []);

  function saveChoice(choice: CookieChoice) {
    window.localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 px-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl shadow-slate-900/10 backdrop-blur sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-base font-bold text-slate-900">
            Ce site utilise des cookies
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Nous utilisons des cookies pour mesurer l'audience et améliorer
            l'expérience utilisateur. Tu peux accepter, refuser ou personnaliser.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => saveChoice("rejected")}
            className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-200"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => saveChoice("custom")}
            className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-300 transition hover:bg-slate-50"
          >
            Personnaliser
          </button>
          <button
            type="button"
            onClick={() => saveChoice("accepted")}
            className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1.5 text-sm font-semibold text-white transition hover:brightness-105"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}

