import { colors } from './consts';

export function formatDate(dateValue: Date) {
  const date = new Date(dateValue);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const formattedTime = `${hours}:${minutes} ${ampm}`;

  return `${day} ${month} ${year}, ${formattedTime}`;
}

export function getRandomColor() {
  if (colors.length === 0) {
    return undefined; // or handle the empty array case as needed
  }
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
