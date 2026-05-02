export const translateEnum = (t: any, type: string, value?: string) => {
  if (!value) return "-";

  return t(`enums.${type}.${value}`, value);
};