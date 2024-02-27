export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function convertToDate(dateString: string): Date {
  const [day, month, year] = dateString.split('/');
  const formattedDate = `${Number(year)}-${Number(month)}-${Number(day)}`;
  return new Date(formattedDate);
}
