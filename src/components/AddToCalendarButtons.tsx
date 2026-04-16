"use client";

type AddToCalendarButtonsProps = {
  title: string;
  description?: string;
  details?: string;
  startDateTime: string;
  endDateTime: string;
  location?: string;
};

function formatGoogleDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  return `${y}${m}${d}T${h}${min}${s}`;
}

function formatIcsDate(date: Date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  const h = String(date.getUTCHours()).padStart(2, "0");
  const min = String(date.getUTCMinutes()).padStart(2, "0");
  const s = String(date.getUTCSeconds()).padStart(2, "0");
  return `${y}${m}${d}T${h}${min}${s}Z`;
}

function toSafeFileName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

export function AddToCalendarButtons({
  title,
  description,
  details,
  startDateTime,
  endDateTime,
  location = "ATH — Faubourg de Tournai",
}: AddToCalendarButtonsProps) {
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);
  const fullDescription = [description, details].filter(Boolean).join(" ");

  const googleUrl = (() => {
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      dates: `${formatGoogleDate(start)}/${formatGoogleDate(end)}`,
      details: fullDescription,
      location,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  })();

  const onDownloadIcs = () => {
    const now = new Date();
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ducasse du Canon//Event Calendar//FR",
      "BEGIN:VEVENT",
      `UID:${toSafeFileName(title)}-${start.getTime()}@ducasseducanon.local`,
      `DTSTAMP:${formatIcsDate(now)}`,
      `DTSTART:${formatIcsDate(start)}`,
      `DTEND:${formatIcsDate(end)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${fullDescription.replace(/\n/g, "\\n")}`,
      `LOCATION:${location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${toSafeFileName(title)}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <a
        href={googleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-300 transition hover:bg-slate-50"
      >
        Ajouter Google
      </a>
      <button
        type="button"
        onClick={onDownloadIcs}
        className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-300 transition hover:bg-slate-200"
      >
        Ajouter Apple / Outlook
      </button>
    </div>
  );
}

