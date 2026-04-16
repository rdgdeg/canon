import Image from "next/image";
import { BackToTopButton } from "@/components/BackToTopButton";
import { CookieBanner } from "@/components/CookieBanner";
import { Programme } from "@/components/Programme";
import { PROGRAMME } from "@/lib/programme";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#f6fbff] text-slate-900">
      <div className="bg-blobs" aria-hidden="true">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
      </div>

      <header className="sticky top-0 z-20 border-b border-sky-100/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#" className="group inline-flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-sky-200">
              <Image
                src="/logo-les-francs.png"
                alt="Logo Les Francs de Bruges"
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold">
                Ducasse du Canon
              </span>
              <span className="block text-xs text-slate-500">
                ATH · Faubourg de Tournai
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-2 sm:flex">
            <a
              href="#programme"
              className="rounded-full px-3 py-1.5 text-sm text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Programme
            </a>
            <a
              href="#affiche"
              className="rounded-full px-3 py-1.5 text-sm text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Affiche
            </a>
            <a
              href="#infos"
              className="rounded-full px-3 py-1.5 text-sm text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Contacts
            </a>
          </nav>

          <a
            href="#programme"
            className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:translate-y-[-1px] hover:brightness-105"
          >
            Voir le programme
          </a>
        </div>
      </header>

      <main className="relative">
        <section className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 sm:pt-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-700 ring-1 ring-sky-100">
                10 · 11 · 12 · 13 juillet 2026
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                Entrées gratuites sur plusieurs activités
              </p>

              <h1 className="font-display mt-5 text-balance text-4xl font-bold tracking-tight sm:text-6xl">
                113ème Ducasse du Canon
              </h1>
              <p className="mt-3 max-w-2xl text-pretty text-base leading-7 text-slate-700 sm:text-lg">
                Quatre jours de festivités au Faubourg de Tournai (Ath) : soirées,
                souper animé, brocante, cortège folklorique, rondeau final et
                course des vétérans.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#programme"
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
                >
                  Programme complet
                </a>
                <a
                  href="#infos"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-50"
                >
                  Réservations & contacts
                </a>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {PROGRAMME.map((day) => (
                  <a
                    key={day.key}
                    href={`#jour-${day.key}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-50"
                  >
                    <span>{day.label}</span>
                    <span className="text-slate-500">· {day.dateLabel}</span>
                  </a>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-sky-100 backdrop-blur">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Lieu
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    ATH — Faubourg de Tournai
                  </p>
                </div>
                <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-sky-100 backdrop-blur">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Point fort
                  </p>
                  <p className="mt-1 text-sm font-semibold">Cortège + rondeau</p>
                </div>
                <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-sky-100 backdrop-blur">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Ambiance
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    Soirées & animations
                  </p>
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-3 rounded-2xl bg-white/85 p-3 ring-1 ring-sky-100">
                <Image
                  src="/logo-les-francs.png"
                  alt="Logo Société Royale Les Francs de Bruges"
                  width={96}
                  height={96}
                  className="h-16 w-16 rounded-lg object-cover ring-1 ring-slate-200"
                />
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Organisé par
                  </p>
                  <p className="font-display text-lg font-bold text-slate-900">
                    Les Francs de Bruges
                  </p>
                </div>
              </div>
            </div>

            <div
              id="affiche"
              className="scroll-mt-24 rounded-3xl bg-white/85 p-4 ring-1 ring-sky-100 backdrop-blur"
            >
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-sky-100">
                <Image
                  src="/affiche.png"
                  alt="Affiche de la Ducasse du Canon"
                  width={1200}
                  height={1600}
                  priority
                  className="h-auto w-full"
                />
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Astuce : partage ce lien, tout le programme est ici.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <a
              href="#programme"
              className="group rounded-2xl bg-white/85 p-4 ring-1 ring-sky-100 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-100/40"
            >
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Vendredi 10
              </p>
              <p className="mt-1 text-base font-semibold text-slate-900">
                Holiday&apos;s Night
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Ouverture festive + entrée gratuite.
              </p>
            </a>
            <a
              href="#programme"
              className="group rounded-2xl bg-white/85 p-4 ring-1 ring-sky-100 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-100/40"
            >
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Samedi 11
              </p>
              <p className="mt-1 text-base font-semibold text-slate-900">
                Souper + Bingo
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Soirée animée, nombreux lots à gagner.
              </p>
            </a>
            <a
              href="#programme"
              className="group rounded-2xl bg-white/85 p-4 ring-1 ring-sky-100 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-100/40"
            >
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Dimanche & Lundi
              </p>
              <p className="mt-1 text-base font-semibold text-slate-900">
                Tradition & clôture
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Cortège, rondeau final et soirée de clôture.
              </p>
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <Programme />
        </section>

        <footer className="border-t border-slate-200 bg-white/75">
          <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500 sm:px-6">
            <p>© {new Date().getFullYear()} — Ducasse du Canon (ATH).</p>
          </div>
        </footer>
      </main>
      <BackToTopButton />
      <CookieBanner />
    </div>
  );
}
