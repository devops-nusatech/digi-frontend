export const removeClass = (target: string) =>
   document.getElementsByClassName(target)[0]?.classList.remove(target);
export const removeElement = (target: string) =>
   document.getElementsByClassName(target)[0]?.remove();
