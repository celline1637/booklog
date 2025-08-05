import type { READ_STATUS } from "@/config/read-status";

export type ReadStatus =
  (typeof READ_STATUS)[keyof typeof READ_STATUS]["value"];
