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

  return Array.from(map.values())
    .sort((a, b) =>
      a.year !== b.year
        ? a.year - b.year
        : a.month - b.month
    )
    .map((group) => ({
      ...group,
      matches: group.matches.sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      ),
    }));
}