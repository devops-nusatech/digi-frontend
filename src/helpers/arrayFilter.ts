export var arrayFilter = (arrays: Array<any>, search: string) => (
   arrays.filter(array => (
      Object.keys(array).reduce((acc, curr) => (
         acc || array[curr]
            ?.toString()
            ?.toLowerCase()
            ?.match(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').toLowerCase())
            ?.includes(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').toLowerCase())
      ), false)
   ))
);
