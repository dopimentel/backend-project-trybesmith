export default function joiErrorMap(joiErrorType: string): number {
  const statusHTTPMap: Record<string, number> = {
    'any.required': 400,
    'string.empty': 400,
    'string.min': 422,
    'string.required': 400,
    'string.base': 422,

  };
  return statusHTTPMap[joiErrorType] || 500;
}
