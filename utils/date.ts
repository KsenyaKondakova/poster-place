export function convertISOToCustomFormat(isoDate: string) {
  const dateObj = new Date(isoDate);
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${day}.${month}.${year}`;
}
export function convertDatesToISO(date: any) {
  if (date && /^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
    const [day, month, year] = date.split('.');
    return new Date(`${year}-${month}-${day}`).toISOString();
  } else {
    console.error('Некорректный формат даты:', date);
  }
}
