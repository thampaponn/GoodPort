export const fullName = (person?: { fname?: string; lname?: string }) =>
  [person?.fname, person?.lname].filter(Boolean).join(" ");

export const formatDate = (value?: string) => {
  if (!value) {
    return "";
  }
  return new Date(value).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
