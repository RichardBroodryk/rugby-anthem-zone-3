import { CalendarMatch } from "./calendarTypes";

export type CalendarMonthGroup = {
  year: number;
  month: number; // 0–11
  label: string;
  matches: CalendarMatch[];
};

function isValidDate(d: Date) {
  return d instanceof Date && !isNaN(d.getTime());
}

export function groupMatchesByMonth(
  matches: CalendarMatch[]
): CalendarMonthGroup[] {
  const map = new Map<string, CalendarMonthGroup>();

  matches.forEach((match) => {
    // ✅ CRITICAL FIX
    const safeDate = isValidDate(match.date)
      ? match.date
      : new Date(match.isoDate);

    if (!isValidDate(safeDate)) return; // skip broken entries

    const year = safeDate.getFullYear();
    const month = safeDate.getMonth();
    const key = `${year}-${month}`;

    if (!map.has(key)) {
      map.set(key, {
        year,
        month,
        label: safeDate.toLocaleString("en-GB", {
          month: "long",
          year: "numeric",
        }),
        matches: [],
      });
    }

    map.get(key)!.matches.push({
      ...match,
      date: safeDate, // ensure consistency
    });
  });

 const now = new Date();

const currentYear = now.getFullYear();
const currentMonth = now.getMonth();

const groups = Array.from(map.values());

groups.sort((a, b) => {
  const aPast =
    a.year < currentYear ||
    (a.year === currentYear &&
      a.month < currentMonth);

  const bPast =
    b.year < currentYear ||
    (b.year === currentYear &&
      b.month < currentMonth);

  /* Future/current months first */
  if (aPast !== bPast) {
    return aPast ? 1 : -1;
  }

  /* Future months ascending */
  if (!aPast && !bPast) {
    return a.year !== b.year
      ? a.year - b.year
      : a.month - b.month;
  }

  /* Past months descending */
  return a.year !== b.year
    ? b.year - a.year
    : b.month - a.month;
});

return groups.map((group) => ({
  ...group,
  matches: group.matches.sort(
    (a, b) =>
      a.date.getTime() -
      b.date.getTime()
  ),
}));
}