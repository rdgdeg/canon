"use client";

type AddToCalendarButtonsProps = {
  title: string;
  description?: string;
  details?: string;
  startDateTime: string;
  endDateTime: string;
  location?: string;
};

function IconGoogleCalendar({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={14}
      height={14}
      aria-hidden
    >
      <path
        fill="#4285F4"
        d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"
      />
      <path fill="#fff" d="M18 6v2H6V6h12Z" opacity={0.25} />
      <path
        fill="#fff"
        d="M8 2v4M16 2v4M4 10h16"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <rect x={7} y={12} width={3} height={3} rx={0.5} fill="#EA4335" />
      <rect x={11} y={12} width={3} height={3} rx={0.5} fill="#FBBC04" />
      <rect x={15} y={12} width={2} height={3} rx={0.5} fill="#34A853" />
    </svg>
  );
}

function IconCalendarPlus({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={14}
      height={14}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.85}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x={3} y={4} width={18} height={18} rx={2} />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="M12 14v6M9 17h6" />
    </svg>
  );
}

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

  const btnBase =
    "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium leading-tight ring-1 transition hover:bg-slate-50";

  return (
    <div className="mt-1.5 flex flex-wrap gap-1.5">
      <a
        href={googleUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ajouter à Google Agenda"
        title="Ajouter à Google Agenda"
        className={`${btnBase} bg-white text-slate-700 ring-slate-200 hover:ring-slate-300`}
      >
        <IconGoogleCalendar className="shrink-0" />
        <span>Google</span>
      </a>
      <button
        type="button"
        onClick={onDownloadIcs}
        aria-label="Télécharger le fichier calendrier .ics pour Apple ou Outlook"
        title="Télécharger le fichier .ics (Apple Calendar, Outlook, etc.)"
        className={`${btnBase} bg-white text-slate-700 ring-slate-200 hover:ring-slate-300`}
      >
        <IconCalendarPlus className="shrink-0 text-slate-500" />
        <span>.ics</span>
      </button>
    </div>
  );
}
