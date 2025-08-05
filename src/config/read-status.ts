export const READ_STATUS = {
  TODO: { value: "TODO", label: "읽고 싶은 책", color: "default" },
  PROGRESS: { value: "PROGRESS", label: "읽는 중", color: "info" },
  DONE: { value: "DONE", label: "읽음", color: "warn" },
  HOLD: { value: "HOLD", label: "보류 중", color: "default" },
} as const;
