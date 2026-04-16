"use client";

import Image from "next/image";
import { AddToCalendarButtons } from "@/components/AddToCalendarButtons";
import type { MealBlock, ProgrammeDay } from "@/lib/programme";
import {
  CONTACTS,
  PROGRAMME,
  programmeItemDetailsForCalendar,
} from "@/lib/programme";

function toTel(value: string) {
  return value.replace(/\D/g, "");
}

function IconUtensils({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MealDetailsCard({ meal }: { meal: MealBlock }) {
  return (
    <div className="mt-3 max-w-full overflow-hidden rounded-2xl bg-white shadow-md shadow-slate-900/[0.06] ring-1 ring-slate-200/90 sm:max-w-xl">
      <div
        className="h-1 w-full bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500"
        aria-hidden
      />
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-teal-50 text-teal-700 ring-1 ring-teal-100">
            <IconUtensils className="text-teal-700/90" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-semibold tracking-tight text-slate-900">
              Menu et tarifs
            </p>
          </div>
        </div>

        {meal.note ? (
          <p className="mt-4 text-sm leading-relaxed text-slate-600">{meal.note}</p>
        ) : null}

        <ul className="mt-4 space-y-3">
          {meal.menu.map((line, i) => (
            <li key={i} className="flex gap-3">
              <span
                className={[
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-sm",
                  "bg-gradient-to-br from-cyan-500 to-teal-600 ring-1 ring-white/30",
                ].join(" ")}
              >
                {meal.menu.length > 1 ? i + 1 : "1"}
              </span>
              <p className="min-w-0 pt-1 text-sm leading-relaxed text-slate-700">{line}</p>
            </li>
          ))}
        </ul>

        {meal.prices ? (
          <div className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-xl bg-slate-50/90 px-3.5 py-2.5 ring-1 ring-slate-100">
            <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Tarifs
            </span>
            <span className="font-display text-sm font-semibold tabular-nums text-slate-900">
              {meal.prices}
            </span>
          </div>
        ) : null}

        {meal.reservation ? (
          <div className="mt-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/70 p-3.5 ring-1 ring-slate-200/80">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Réservations
            </p>
            <a
              href={`tel:${toTel(meal.reservation)}`}
              className="group mt-2 inline-flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-base font-semibold tabular-nums tracking-tight text-slate-900 transition hover:bg-white/80 hover:text-teal-800"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-teal-600 shadow-sm ring-1 ring-slate-200/80">
                <IconPhone className="text-teal-600" />
              </span>
              <span className="border-b border-transparent pb-px transition group-hover:border-teal-400">
                {meal.reservation}
              </span>
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function renderTextWithPhones(text: string) {
  const phoneRegex = /(\d{4}\/\d{2}\.\d{2}\.\d{2}|\d{4}\/\d{2}\.\d{2}\.\d{2})/g;
  const parts = text.split(phoneRegex);
  return parts.map((part, i) => {
    if (/^\d{4}\/\d{2}\.\d{2}\.\d{2}$/.test(part)) {
      return (
        <a
          key={`${part}-${i}`}
          href={`tel:${toTel(part)}`}
          className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-700"
        >
          {part}
        </a>
      );
    }
    return <span key={`${part}-${i}`}>{part}</span>;
  });
}

function badgeClasses(badge: ProgrammeDay["items"][number]["badge"]) {
  switch (badge) {
    case "gratuit":
      return "bg-emerald-500/10 text-emerald-700 ring-emerald-200";
    case "repas":
      return "bg-amber-500/10 text-amber-700 ring-amber-200";
    case "brocante":
      return "bg-cyan-500/10 text-cyan-700 ring-cyan-200";
    case "course":
      return "bg-fuchsia-500/10 text-fuchsia-700 ring-fuchsia-200";
    default:
      return "bg-slate-100 text-slate-700 ring-slate-200";
  }
}

function badgeLabel(badge: ProgrammeDay["items"][number]["badge"]) {
  switch (badge) {
    case "gratuit":
      return "Entrée gratuite";
    case "repas":
      return "Repas";
    case "brocante":
      return "Brocante";
    case "course":
      return "Course";
    default:
      return "Info";
  }
}

function dayAccent(dayKey: ProgrammeDay["key"]) {
  switch (dayKey) {
    case "ven":
      return "from-indigo-500 to-fuchsia-500";
    case "sam":
      return "from-cyan-500 to-blue-500";
    case "dim":
      return "from-emerald-500 to-teal-500";
    case "lun":
      return "from-amber-500 to-orange-500";
    default:
      return "from-slate-500 to-slate-700";
  }
}

function dayTheme(dayKey: ProgrammeDay["key"]) {
  switch (dayKey) {
    case "ven":
      return {
        section: "from-indigo-50 to-fuchsia-50 ring-indigo-100",
        chip: "from-indigo-500 to-fuchsia-500",
      };
    case "sam":
      return {
        section: "from-cyan-50 to-blue-50 ring-cyan-100",
        chip: "from-cyan-500 to-blue-500",
      };
    case "dim":
      return {
        section: "from-emerald-50 to-teal-50 ring-emerald-100",
        chip: "from-emerald-500 to-teal-500",
      };
    case "lun":
      return {
        section: "from-amber-50 to-orange-50 ring-amber-100",
        chip: "from-amber-500 to-orange-500",
      };
    default:
      return {
        section: "from-slate-50 to-slate-100 ring-slate-200",
        chip: "from-slate-500 to-slate-700",
      };
  }
}

export function Programme() {

  return (
    <section id="programme" className="min-w-0 scroll-mt-24">
      <div>
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900">
          Programme
        </h2>
        <p className="text-sm text-slate-600">
          10 → 13 juillet 2026 — ATH (Faubourg de Tournai)
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Programme complet jour par jour. Les horaires sont mis en avant pour te
          permettre de repérer rapidement les moments forts.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {PROGRAMME.map((d) => (
            <a
              key={d.key}
              href={`#jour-${d.key}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-xs text-slate-600 ring-1 ring-slate-200 transition hover:bg-white hover:text-slate-900"
            >
              <span
                className={[
                  "inline-flex h-2 w-2 rounded-full bg-gradient-to-r",
                  dayAccent(d.key),
                ].join(" ")}
              />
              <span>{d.dateLabel}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="min-w-0 space-y-4">
          {PROGRAMME.map((day) => {
            const theme = dayTheme(day.key);
            return (
              <section
                key={day.key}
                id={`jour-${day.key}`}
                className={[
                  "scroll-mt-24 overflow-hidden rounded-2xl bg-gradient-to-br ring-1",
                  theme.section,
                ].join(" ")}
              >
                <div className="border-b border-slate-200/70 bg-white/70 px-5 py-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    {day.label}
                  </p>
                  <p className="font-display text-xl font-bold text-slate-900">
                    {day.dateLabel}
                  </p>
                </div>

                <ol className="divide-y divide-slate-200/70 bg-white/65">
                  {day.items.map((it, idx) => (
                    <li
                      key={`${day.key}-${idx}`}
                      className={[
                        "px-5 py-4",
                        it.meal
                          ? "bg-gradient-to-r from-sky-50/50 via-white to-transparent"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <div className="grid min-w-0 gap-3 sm:grid-cols-[112px_1fr]">
                        <div className="min-w-0 sm:pt-0.5">
                          <span
                            className={[
                              "inline-flex w-fit min-w-[94px] items-center justify-center rounded-xl bg-gradient-to-r px-3 py-2 text-sm font-extrabold tracking-wide text-white shadow-sm",
                              theme.chip,
                            ].join(" ")}
                          >
                            {it.time}
                          </span>
                        </div>

                        <div className="flex min-w-0 items-start gap-3">
                          <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-500 shadow-[0_0_0_4px_rgba(6,182,212,0.15)]" />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="min-w-0 break-words text-base font-semibold text-slate-900">
                                {it.title}
                              </p>
                              {it.badge ? (
                                <span
                                  className={[
                                    "rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
                                    badgeClasses(it.badge),
                                  ].join(" ")}
                                >
                                  {badgeLabel(it.badge)}
                                </span>
                              ) : null}
                            </div>
                            {it.description ? (
                              <p className="mt-1 text-sm leading-6 text-slate-700">
                                {it.description}
                              </p>
                            ) : null}
                            {it.meal ? (
                              <MealDetailsCard meal={it.meal} />
                            ) : it.details ? (
                              <p className="mt-1 text-sm leading-6 text-slate-600">
                                {renderTextWithPhones(it.details)}
                              </p>
                            ) : null}
                            <AddToCalendarButtons
                              title={it.title}
                              description={it.description}
                              details={programmeItemDetailsForCalendar(it)}
                              startDateTime={it.startDateTime}
                              endDateTime={it.endDateTime}
                              location="ATH — Faubourg de Tournai"
                            />

                            {day.key === "ven" &&
                            it.title === "Soirée HOLIDAY'S NIGHT" ? (
                              <div className="mt-3 max-w-sm overflow-hidden rounded-xl bg-white ring-1 ring-sky-100">
                                <Image
                                  src="/holidays-night.png"
                                  alt="Affiche de la soirée Holiday's Night du vendredi"
                                  width={1200}
                                  height={1800}
                                  className="h-auto w-full"
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}
        </div>

        <aside className="flex min-w-0 flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <div
            id="infos"
            className="scroll-mt-24 rounded-2xl bg-white/85 p-5 ring-1 ring-slate-200 backdrop-blur"
          >
            <h3 className="text-base font-semibold text-slate-900">Infos utiles</h3>
            <div className="mt-3 grid gap-3 text-sm text-slate-700">
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Réservations repas
                </p>
                <a
                  href={`tel:${toTel(CONTACTS.reservations)}`}
                  className="mt-1 inline-flex items-center gap-2 text-slate-900 hover:underline"
                >
                  {CONTACTS.reservations}
                </a>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Inscriptions brocante
                </p>
                <a
                  href={`tel:${toTel(CONTACTS.brocante)}`}
                  className="mt-1 inline-flex items-center gap-2 text-slate-900 hover:underline"
                >
                  {CONTACTS.brocante}
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 p-5 ring-1 ring-sky-100 backdrop-blur">
            <h3 className="text-base font-semibold text-slate-900">
              À ne pas rater
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-sky-100">
                <span>Soirée HOLIDAY&apos;S NIGHT</span>
                <span className="text-slate-900">Ven 20h00</span>
              </li>
              <li className="flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-sky-100">
                <span>Souper animé</span>
                <span className="text-slate-900">Sam 19h00</span>
              </li>
              <li className="flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-sky-100">
                <span>Bingo (nombreux lots)</span>
                <span className="text-slate-900">Sam 20h30</span>
              </li>
              <li className="flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-sky-100">
                <span>Cortège + rondeau</span>
                <span className="text-slate-900">Dim 15h00</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

