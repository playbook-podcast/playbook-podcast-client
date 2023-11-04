export const transformRouteId = (
  template: string,
  values: Record<string, string | number>,
): string => {
  for (const key in values) {
    if (Object.hasOwnProperty.call(values, key)) {
      template = template.replace(`:${key}`, String(values[key]));
    }
  }
  return template;
};
