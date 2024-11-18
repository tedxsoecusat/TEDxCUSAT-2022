export const errorLogger = (err: Error, fnName: string) => {
  console.log(`[ERROR]: @ ${fnName}`, err);
};

export const logger = (message: string, fnName: string, data: any = {}) => {
  console.log(`[LOG]: @ ${fnName} `, message, data);
};
