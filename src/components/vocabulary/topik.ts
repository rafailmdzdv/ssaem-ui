import { type TopikLevel } from "@/lib/types";

export const TOPIK_LEVEL_ITEMS: {
  value: TopikLevel;
  label: string;
}[] = [
  { value: "topik1", label: "TOPIK I" },
  { value: "topik2", label: "TOPIK II" },
  { value: "none", label: "-" },
];

export const topikLevelLabel = (level: TopikLevel): string =>
  TOPIK_LEVEL_ITEMS.find((item) => item.value === level)?.label ?? "-";
