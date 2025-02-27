export const handleDates = (date) => {
  const newDate = new Date(date);
  return newDate
    .toLocaleString("en-EG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    .replace(",", "");
};
// Other way to write the function
// {
//  return new Intl.DateTimeFormat("en-EG", {year: "numeric",month: "2-digit", day: "2-digit",
//   hour: "2-digit",minute: "2-digit",second: "2-digit",hour12: true,timeZone: "Africa/Cairo",
//  }).format(newDate).replace(",", "");
// }
