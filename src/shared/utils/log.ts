const textStyle = "color: #FFFFFF; font-size: 12px; padding: 5px;";

const logStyles = {
  info: `background: #5DADE2; ${textStyle}`,
  warn: `background: #FF8C00; ${textStyle}`,
  success: `background: #008000; ${textStyle}`,
  error: `background: #da4040; ${textStyle}`,
};

export const log = {
  info: (msg: string) => {
    console.log(`%c${msg}`, logStyles.info);
  },
  warn: (msg: string) => {
    console.log(`%c${msg}`, logStyles.warn);
  },
  success: (msg: string) => {
    console.log(`%c${msg}`, logStyles.success);
  },
  error: (msg: string) => {
    console.log(`%c${msg}`, logStyles.error);
  },
};

export const logGroup = {
  info: (msg: string, logs: () => void) => {
    console.group(`%c${msg}`, logStyles.info);
    logs();
    console.groupEnd();
  },
  warn: (msg: string, logs: () => void) => {
    console.group(`%c${msg}`, logStyles.warn);
    logs();
    console.groupEnd();
  },
  success: (msg: string, logs: () => void) => {
    console.group(`%c${msg}`, logStyles.success);
    logs();
    console.groupEnd();
  },
  error: (msg: string, logs: () => void) => {
    console.group(`%c${msg}`, logStyles.error);
    logs();
    console.groupEnd();
  },
};
