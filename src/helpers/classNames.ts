export const classNames = (className: string): string =>
   className
      .replace(/\s+/gm, ' ')
      .split(' ')
      .filter(count => typeof count === 'string')
      .join(' ')
      .trim();
