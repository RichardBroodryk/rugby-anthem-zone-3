/* ==================================================
   RAZ SYSTEM — QUALIFICATION RULES
   ================================================== */

export type QualificationRule = {
  qualified: number;

  label: string;
};

export const competitionQualification: Record<
  string,
  QualificationRule
> = {
  "urc-men": {
    qualified: 8,
    label: "Top 8 qualify for playoffs",
  },

  "premiership-men": {
    qualified: 4,
    label: "Top 4 qualify for playoffs",
  },

  "top14-men": {
    qualified: 6,
    label: "Top 6 qualify for playoffs",
  },

  "super-men": {
    qualified: 6,
    label: "Top 6 qualify for quarter-finals",
  },

  "japan-men": {
    qualified: 6,
    label: "Top 6 qualify for playoffs",
  },
};