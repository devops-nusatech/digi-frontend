export const scrollTo = (top?: number, left?: number, behavior: ScrollBehavior = 'smooth') => {
   window.scrollTo({
      top,
      left,
      behavior,
   });
}
