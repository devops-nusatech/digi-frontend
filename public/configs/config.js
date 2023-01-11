'use strict';
(location => {
   const { hostname, search, origin, pathname, replace } = location;

   // const hostUrl = hostname === 'localhost' ? 'http://localhost:9002' : origin;
   const hostUrl = 'https://www.heavenexchange.io';
   const fetchConfig = new XMLHttpRequest();
   fetchConfig.open('GET', `${hostUrl}/api/v2/sonic/public/config`, false);
   fetchConfig.send(null);

   const unavailableServerError = new Set([472, 503, 513]);
   const urlParam = new URLSearchParams(search);
   const token = urlParam.get('token');

   if (pathname === '/magic-link') {
      if (token) {
         const sendAccessToken = new XMLHttpRequest();
         sendAccessToken.open('POST', `${hostUrl}/api/v2/account/identity/users/access`, false);
         sendAccessToken.setRequestHeader('Content-Type', 'application/json: charset=utf-8');
         sendAccessToken.send(JSON.stringify({ whitelink_token: token }));
      } else {
         replace(origin);
      }
   } else {
      if (fetchConfig.status === 200) {
         window.env = JSON.parse(fetchConfig.responseText);
         if (['/restriction', '/maintenance'].includes(pathname)) {
            replace(`${origin}/`);
         }
      } else if (fetchConfig.status === 471 && pathname !== '/restriction') {
         replace(`${origin}/restriction`);
      } else if (unavailableServerError.has(fetchConfig.status) && pathname !== '/maintenance') {
         replace(`${origin}/maintenance`);
      }
   }
})(window.location);
