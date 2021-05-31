;(function (win, doc) {
  
  if (!('requestAnimationFrame' in win)) {
    win.requestAnimationFrame = (function () {
      return win.webkitRequestAnimationFrame
          || win.mozRequestAnimationFrame
          || win.oRequestAnimationFrame
          || win.msRequestAnimationFrame
          || function (callback) { return win.setTimeout(callback, 1000/60) };
    })();
  }
  
  if (!('cancelAnimationFrame' in win)) {
    win.cancelAnimationFrame = (function () {
      return win.webkitCancelAnimationFrame
          || win.mozCancelAnimationFrame
          || win.oCancelAnimationFrame
          || win.msCancelAnimationFrame
          || function (id) { return win.cancelTimeout(id) };
    })();
  }
  
  win.toad = {
    startListening: start
  };
  
  function addEventHandler (ev, h) {
    win.addEventListener ?
      win.addEventListener(ev, h, !1) : 
        win.attachEvent ? 
          win.attachEvent('on' + ev, h) : 
            win['on' + ev] = h;
  }
  
  function removeEventHandler (ev, h) {
    win.removeEventListener ?
      win.removeEventListener(ev, h, !1) : 
        win.detachEvent ? 
          win.detachEvent('on' + ev, h) : 
            win['on' + ev] = null;
  }

  function isInViewport (r) {
    return r.left >= 0 && r.top <= win.innerHeight; // r.top >= 0 && r.left >= 0 && r.top <= win.innerHeight
  }

  function rebounce (f) {
    var scheduled;
    var context; 
    var args;
    var len;
    var i;
    return function () {
      context = this; 
      args = [];
      len = arguments.length; 
      i = 0;
      
      for (;i < len; ++i) {
        args[i] = arguments[i];
      }
      
      if (!!scheduled) {
        win.cancelAnimationFrame(scheduled);
      }
      
      scheduled = win.requestAnimationFrame(function () {
        f.apply(context, args); 
        scheduled = null;
      });
    }
  }

  function toad () {
    images();
    botbackgrounds();
  }

  function images() {
    var elements = doc.querySelectorAll('[data-src]') || [];
    var len = elements.length;
    var j = 0;
    var this_el;

    for (; j < len; ++j) {
      this_el = elements[j];
      if (!this_el.getAttribute('data-src') || !isInViewport(this_el.getBoundingClientRect())) {
        return;
      }

      if (!this_el.getAttribute('data-src') || !isInViewport(this_el.getBoundingClientRect())) {
        return;
      }
      
      if (!!this_el.getAttribute('data-src') && isInViewport(this_el.getBoundingClientRect())) {
        if ('img' === this_el.tagName.toLowerCase()) {
          this_el.src = this_el.getAttribute('data-src');
          this_el.removeAttribute('data-src');
          
        } else {
          this_el.style.backgroundImage = 'url(' + this_el.getAttribute('data-src') + ')';
          this_el.removeAttribute('data-src');
        } 
      }
    }
  }

  function botbackgrounds() {
    
      var elements = doc.querySelectorAll('[data-bot-src]') || [];
      var len = elements.length;
      var j = 0;
      var this_el;

      for (; j < len; ++j) {
        this_el = elements[j];
        if (!this_el.getAttribute('data-bot-src') || !isInViewport(this_el.getBoundingClientRect())) {
          return;
        }

        if (!!this_el.getAttribute('data-bot-src') && isInViewport(this_el.getBoundingClientRect())) {
          this_el.style = this_el.getAttribute('data-bot-src');
          this_el.removeAttribute('data-bot-src');
        }
      }
    
  }

  function start() {
    // console.log('Started Toad Loading') // Debug
    // addEventHandler('DOMContentLoaded', rebounce(toad));
    rebounce(toad)
    addEventHandler('load', rebounce(toad));
    addEventHandler('scroll', rebounce(toad));
    addEventHandler('resize', rebounce(toad));
  }


})(window, window.document);