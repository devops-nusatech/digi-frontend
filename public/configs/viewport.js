'use strict';
(doc => {
   let viewportMeta = doc.querySelector('meta[name="viewport"]');
   if (viewportMeta) {
      if (screen.width < 375) {
         let newScale = screen.width / 375;
         viewportMeta.content = 'width=375, minimum-scale=' + newScale + ', maximum-scale=1.0, user-scalable=no, initial-scale=' + newScale + '';
      } else {
         viewportMeta.content = 'width=device-width, maximum-scale=1.0, initial-scale=1.0';
      }
   }
   return viewportMeta;
})(document);
