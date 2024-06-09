import type { Datum } from "./Datum";

export interface Section {
  type: string;
  data: Datum[];
  index: number;
  group?: string;
  count?: number;
  page?: number;
  displaytype?: string;
  playmode?: string;
  show_recommendations?: number;
  top?: number;
  sectionid?: number;
  "preview-url"?: string;
  title?: string;
  initialNumItems?: number;
  alltitle?: string;
}
