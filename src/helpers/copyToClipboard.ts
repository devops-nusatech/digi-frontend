export const copyToClipboard = (text: string): void => {
   const listener = (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/plain', text);
      e.preventDefault();
      document.removeEventListener('copy', listener);
   };
   document.addEventListener('copy', listener);
   document.execCommand('copy');
}
