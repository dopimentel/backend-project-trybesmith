export default function joiErrorMap(joiErrorType: string): number {
  const statusHTTPMap: Record<string, number> = {
    'any.required': 400,
    'string.empty': 400,
    'string.min': 422,
    'string.required': 400,
    'string.base': 422,
    'number.base': 422,
    'array.base': 422,
    'array.empty': 422,
    'array.min': 422,

  };
  return statusHTTPMap[joiErrorType] || 500;
}
