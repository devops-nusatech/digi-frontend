export const arrayFilterKey = (key: string, search: string): string =>
   key
      .toLowerCase()
      .replace(/\s+/g, '')
      .includes(search.toLowerCase().replace(/\s+/g, ''))
      .toString();
