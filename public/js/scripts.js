/*
   Testing read more/see more functionality, not working yet
*/
window.document.addEventListener("DOMContentLoaded", () => {
   if (document.body.contains(document.getElementsByClassName('description')[0])) {

      const manyDesc = document.getElementsByClassName('description')

      for (let i = 0; i < manyDesc.length; i++) {
         const splitDesc = manyDesc[i].textContent.slice(0, 150);
         console.log(splitDesc)
      };
   }
})