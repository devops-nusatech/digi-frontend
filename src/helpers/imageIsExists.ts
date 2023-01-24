export const imageIsExists = (url: string) => {
   const http = new XMLHttpRequest();
   http.open('HEAD', url, false);
   http.send(null);

   return http.status !== 404;
}
