function notilert(text, cclass, autohide) {
  var ccclass = cclass.toUpperCase();
  Toast.create(`Alert`, text, TOAST_STATUS.ccclass, 5000);
}
eval(atob('aWYoIXdpbmRvdy5sb2NhdGlvbi5vcmlnaW4uaW5jbHVkZXMoYXRvYignZG05cFpHSnZkSE11Ym1WMCcpKSkgeyBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9ICdJdCBzZWVtcyB0aGlzIHNpdGUgd2FzIHN0b2xlbiBmcm9tIHZvaWRib3RzLm5ldCc7IHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYGh0dHBzOi8vJHthdG9iKCdkbTlwWkdKdmRITXVibVYwJyl9P3V0bV9zb3VyY2U9JHtlbmNvZGVVUklDb21wb25lbnQod2luZG93LmxvY2F0aW9uLm9yaWdpbil9JmNvZGU9c3RvbGVuYDsgfQ=='))
$(window).on("load",function(){
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
    .replace(/(^|[\s\xA0])[^\s\xA0]/g, function(s){ return s.toUpperCase(); });
};