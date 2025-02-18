export function response(message: string, data: any, statusCode: number) {
  return {
    message,
    data,
    statusCode,
  };
}
