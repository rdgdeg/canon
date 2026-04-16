"use client";

import Image from "next/image";
import type { ProgrammeDay } from "@/lib/programme";
import { CONTACTS, PROGRAMME } from "@/lib/programme";

function toTel(value: string) {
  return value.replace(/\D/g, "");
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
    <section id="programme" className="scroll-mt-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900">
            Programme
          </h2>
          <p className="text-sm text-slate-600">
            10 → 13 juillet 2026 — ATH (Faubourg de Tournai)
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Programme complet jour par jour. Les horaires sont mis en avant pour
            te permettre de repérer rapidement les moments forts.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:min-w-[440px]">
          {PROGRAMME.map((d) => (
            <a
              key={d.key}
              href={`#jour-${d.key}`}
              className={[
                "group rounded-2xl px-3 py-2 text-left ring-1 transition duration-200",
                "bg-white text-slate-700 ring-slate-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900",
              ].join(" ")}
            >
              <span className="flex items-center justify-between">
                <span className="text-sm font-semibold">{d.label}</span>
                <span className={["inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-r", dayAccent(d.key)].join(" ")} />
              </span>
              <span className="mt-0.5 block text-xs text-slate-500">
                {d.dateLabel}
              </span>
              <span className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                {d.items.length} événement{d.items.length > 1 ? "s" : ""}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-4">
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
                    <li key={`${day.key}-${idx}`} className="px-5 py-4">
                      <div className="grid gap-3 sm:grid-cols-[112px_1fr]">
                        <div className="sm:pt-0.5">
                          <span
                            className={[
                              "inline-flex w-fit min-w-[94px] items-center justify-center rounded-xl bg-gradient-to-r px-3 py-2 text-sm font-extrabold tracking-wide text-white shadow-sm",
                              theme.chip,
                            ].join(" ")}
                          >
                            {it.time}
                          </span>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-500 shadow-[0_0_0_4px_rgba(6,182,212,0.15)]" />
                          <div className="w-full">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-base font-semibold text-slate-900">
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
                            {it.details ? (
                              <p className="mt-1 text-sm leading-6 text-slate-600">
                                {renderTextWithPhones(it.details)}
                              </p>
                            ) : null}

                            {day.key === "sam" &&
                            it.title.includes("Souper animé") ? (
                              <div className="mt-3 rounded-xl bg-amber-50 p-3 ring-1 ring-amber-200">
                                <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                                  Menu du souper
                                </p>
                                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                                  <li>
                                    <span className="font-semibold">Option 1 :</span> Filet pur
                                    de porc (sauce archiduc ou blackwell) + frites + salade
                                    composée
                                  </li>
                                  <li>
                                    <span className="font-semibold">Option 2 :</span> Américain +
                                    frites + salade composée
                                  </li>
                                  <li>
                                    <span className="font-semibold">Tarifs :</span> Adultes 18 €
                                    · Enfants 12 €
                                  </li>
                                </ul>
                              </div>
                            ) : null}

                            {day.key === "dim" &&
                            it.title === "Repas sous chapiteau" ? (
                              <div className="mt-3 rounded-xl bg-amber-50 p-3 ring-1 ring-amber-200">
                                <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                                  Menu du chapiteau
                                </p>
                                <p className="mt-2 text-sm text-slate-700">
                                  Assiette froide + frites
                                </p>
                                <p className="text-sm font-semibold text-slate-900">13 €</p>
                              </div>
                            ) : null}

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

                            {(it.title.includes("FRISKO") ||
                              it.title.toLowerCase().includes("frisko")) &&
                            it.title !== "Soirée HOLIDAY'S NIGHT" ? (
                              <div className="mt-3 max-w-[220px] overflow-hidden rounded-xl bg-white ring-1 ring-sky-100">
                                <Image
                                  src="/dj-frisko.png"
                                  alt="Photo de DJ Frisko"
                                  width={1024}
                                  height={1024}
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

        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
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
              Zoom sur le Bingo
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Le bingo est une animation participative où chacun peut jouer et
              tenter de compléter ses grilles au fil des tirages.
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              De nombreux lots seront remportés pendant la soirée du samedi :
              venez tôt pour profiter pleinement de l'ambiance.
            </p>
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

