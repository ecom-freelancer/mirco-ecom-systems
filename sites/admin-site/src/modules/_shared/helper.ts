export function stringToSlug(str: string) {
  return str
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '')
    .replace('đ', 'd') // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, '-');
}

/**
 * if different from now < 1 minute => show just now
 * if different from now < 1 hour => show x minutes ago
 * if different from now < 1 day => show x hours ago
 * if different from now < 1 week => show x days ago
 * else show time format day/month/year
 */
export function getTime(time?: string) {
  if (!time) return '';
  const now = new Date();
  const date = new Date(time);
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return 'just now';
  }
  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }
  if (hours < 24) {
    return `${hours} hours ago`;
  }
  if (days < 7) {
    return `${days} days ago`;
  }
  return date.toLocaleDateString('en-GB', {});
}
