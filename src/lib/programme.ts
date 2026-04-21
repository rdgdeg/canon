/** Bloc structuré pour repas / menu (affichage multi-lignes + tél. séparé). */
export type MealBlock = {
  menu: string[];
  prices?: string;
  /** Numéro affiché tel quel (ex. 0478/91.03.68) */
  reservation?: string;
  note?: string;
};

export type ProgrammeItem = {
  time: string;
  title: string;
  description?: string;
  details?: string;
  startDateTime: string;
  endDateTime: string;
  badge?: "gratuit" | "repas" | "brocante" | "course";
  meal?: MealBlock;
};

export type ProgrammeDay = {
  key: "ven" | "sam" | "dim" | "lun";
  label: string;
  dateLabel: string;
  items: ProgrammeItem[];
};

export const CONTACTS = {
  reservations: "0478/91.03.68",
  brocante: "0473/31.80.09",
} as const;

export const PAYMENT_IBAN = "BE04 0683 2999 7131";

export const PAYMENT_CONFIRMATION_NOTE =
  "Le paiement sur le compte BE04 0683 2999 7131 fera office de confirmation pour les repas de samedi soir et dimanche midi.";

export const PROGRAMME: ProgrammeDay[] = [
  {
    key: "ven",
    label: "Vendredi",
    dateLabel: "10 juillet 2026",
    items: [
      {
        time: "18h00",
        title:
          "Salve d'honneur du Canon pour l'ouverture de la Ducasse",
        description:
          "Le coup d'envoi officiel des festivités avec la traditionnelle salve du Canon.",
        startDateTime: "2026-07-10T18:00:00",
        endDateTime: "2026-07-10T18:30:00",
      },
      {
        time: "20h00",
        title: "Soirée HOLIDAY'S NIGHT",
        description: "Ambiance festive, musique et ouverture en beauté du week-end.",
        details: "Entrée gratuite.",
        startDateTime: "2026-07-10T20:00:00",
        endDateTime: "2026-07-11T02:00:00",
        badge: "gratuit",
      },
      {
        time: "21h00 → 23h00",
        title: "LAURENT BAERT en live",
        description:
          "Concert de Laurent Baert pour rythmer la soirée d'ouverture.",
        details: "Entrée gratuite.",
        startDateTime: "2026-07-10T21:00:00",
        endDateTime: "2026-07-10T23:00:00",
        badge: "gratuit",
      },
    ],
  },
  {
    key: "sam",
    label: "Samedi",
    dateLabel: "11 juillet 2026",
    items: [
      {
        time: "13h30",
        title:
          "Sortie des géants et du groupe du canon dans les rues du faubourg",
        description:
          "Départ du cortège dans le quartier, un moment familial emblématique de la Ducasse.",
        startDateTime: "2026-07-11T13:30:00",
        endDateTime: "2026-07-11T15:30:00",
      },
      {
        time: "19h00",
        title: "Souper animé par FRISKO et Jordan Emile DUBOIS",
        description:
          "Soirée repas et animation musicale, idéale pour se retrouver entre amis et en famille.",
        startDateTime: "2026-07-11T19:00:00",
        endDateTime: "2026-07-11T20:30:00",
        badge: "repas",
        meal: {
          menu: [
            "Filet pur de porc (sauce archiduc ou blackwell), frites, salade composée",
            "Américain, frites, salade composée",
          ],
          prices: "Adultes 18 € · Enfants 12 €",
          reservation: CONTACTS.reservations,
          note: PAYMENT_CONFIRMATION_NOTE,
        },
      },
      {
        time: "20h30",
        title: "SOIRÉE BINGO !",
        description:
          "Animation conviviale ouverte à tous, avec de nombreuses manches dans la soirée.",
        details:
          "Nombreux lots à gagner, dont un séjour à Disney et 2 abonnements à Pairi Daiza.",
        startDateTime: "2026-07-11T20:30:00",
        endDateTime: "2026-07-11T23:45:00",
      },
    ],
  },
  {
    key: "dim",
    label: "Dimanche",
    dateLabel: "12 juillet 2026",
    items: [
      {
        time: "08h00 → 16h00",
        title: "Brocante",
        description: "Toute la journée dans le faubourg.",
        details: "Inscriptions : 0473/31.80.09",
        startDateTime: "2026-07-12T08:00:00",
        endDateTime: "2026-07-12T16:00:00",
        badge: "brocante",
      },
      {
        time: "11h00",
        title:
          "Concert apéritif par la ROYALE FANFARE UNION ST MARTIN",
        description: "Concert en live pour lancer la journée du dimanche.",
        details: "Entrée gratuite.",
        startDateTime: "2026-07-12T11:00:00",
        endDateTime: "2026-07-12T12:00:00",
        badge: "gratuit",
      },
      {
        time: "12h00",
        title: "Repas sous chapiteau",
        description: "Repas convivial du midi sous chapiteau.",
        startDateTime: "2026-07-12T12:00:00",
        endDateTime: "2026-07-12T14:00:00",
        badge: "repas",
        meal: {
          menu: ["Assiette froide avec frites"],
          prices: "13 €",
          reservation: CONTACTS.reservations,
          note: PAYMENT_CONFIRMATION_NOTE,
        },
      },
      {
        time: "15h00",
        title: "Cortège folklorique dans les rues du Faubourg",
        description: "Le grand rendez-vous traditionnel de l'après-midi.",
        startDateTime: "2026-07-12T15:00:00",
        endDateTime: "2026-07-12T19:00:00",
      },
      {
        time: "Vers 19h30",
        title: "Rondeau final",
        description: "Final folklorique et rassemblement festif.",
        startDateTime: "2026-07-12T19:30:00",
        endDateTime: "2026-07-12T20:00:00",
      },
      {
        time: "20h00",
        title: "Soirée ambiance ducasse by FRISKO",
        description: "Clôture du dimanche en musique.",
        startDateTime: "2026-07-12T20:00:00",
        endDateTime: "2026-07-13T00:30:00",
      },
    ],
  },
  {
    key: "lun",
    label: "Lundi",
    dateLabel: "13 juillet 2026",
    items: [
      {
        time: "19h00",
        title:
          "Soirée de clôture avec Alain DENIS, Claudia SILVA et Frisko",
        description:
          "Dernière soirée de la Ducasse avec un plateau d'artistes et une ambiance de clôture.",
        details: "Entrée gratuite.",
        startDateTime: "2026-07-13T19:00:00",
        endDateTime: "2026-07-13T23:30:00",
        badge: "gratuit",
      },
    ],
  },
];

/** Texte détaillé pour export agenda (Google / .ics). */
export function programmeItemDetailsForCalendar(
  item: ProgrammeItem,
): string | undefined {
  if (item.meal) {
    const parts: string[] = [];
    if (item.meal.note) parts.push(item.meal.note);
    parts.push(...item.meal.menu);
    if (item.meal.prices) parts.push(item.meal.prices);
    if (item.meal.reservation) {
      parts.push(`Réservations : ${item.meal.reservation}`);
    }
    return parts.join("\n");
  }
  return item.details;
}

