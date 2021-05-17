function notilert(text, cclass, autohide) {
  var ccclass = cclass.toUpperCase();
  Toast.create(`Alert`, text, TOAST_STATUS.ccclass, 5000);
}

$(window).on("load", function() {
  $(".loader-wrapper").fadeOut(250);
  $(".mini-loader").fadeOut(400);
});

$(window).on('beforeunload', function() {

});

function gay() {
  Toast.create("Danger!", "Thats pretty gay", TOAST_STATUS.DANGER, 10000)
}
String.prototype.toProperCase = function(opt_lowerCaseTheRest) {
  return (opt_lowerCaseTheRest ? this.toLowerCase() : this)
    .replace(/(^|[\s\xA0])[^\s\xA0]/g, function(s) { return s.toUpperCase(); });
};

// function maintronPlusRandomBg() {
//   const bgurls = [
//     'http://discord.mx/cDVOj9BDiE.svg', 
//     'http://discord.mx/Z1LfxBWGKC.svg', 
//     'http://discord.mx/x6cwHvo3OC.svg', 
//     'http://discord.mx/KFn0rB6WM0.svg', 
//     'http://discord.mx/7j4fkWdwWA.svg',
//     'http://discord.mx/Uf1ORFuAjL.svg',
//     'http://discord.mx/g5iUH4qNiY.svg',
//     'http://discord.mx/SNKxqDTXWw.svg',
//     'http://discord.mx/d2P9KH0M3k.svg'
//   ];
//   function randomURL(bgurls) {
//     return bgurls[Math.floor(Math.random() * bgurls.length)];
//   }

//   $("head").append(`
//   <style type="text/css">
//     .maintron-plus {
//       background:linear-gradient(70deg, rgba(23, 23, 23, 1) 60%, rgba(23, 23, 23, 0.2) 70%), url('${randomURL(bgurls)}');
//       background-color:#171717;
//     }
//   </style>`);
// }
// $(document).ready(function(){
//   $(window).scroll(function() {
//     if ($(document).scrollTop() > 23) {
//       $(".mainnav").css("background", "#363536");
//     } else {
//       $(".mainnav").css("background", "#2b2b2b");
//     }
//   });
// });