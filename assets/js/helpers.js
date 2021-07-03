import $ from 'jquery';
const easeOutCubic = (t, b, c, d) => c * ((t = t/d - 1) * t * t + 1) + b;

export const smoothScrollTo = (top, scrollDuration) => {
  let abort = false;
  const finalY = Math.min(Math.round(top), document.documentElement.scrollHeight - window.innerHeight);
  const originalY = Math.round(window.scrollY);
  const offset = Math.round(finalY - originalY);
  const initialTimestamp = performance.now();
  const step = (newTimestamp) => {
    window.scrollTo(0, Math.round(easeOutCubic(newTimestamp - initialTimestamp, originalY, offset, scrollDuration)));
    if (abort || (window.scrollY >= finalY - 1 && window.scrollY <= finalY + 1)) return;
    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
  return () => { 
    abort = true;
  };
};

export const getDevice = () => {
  let device;
  const width = $(window).width();
  if (width > 1440) device = 'desktop';
  else if (width > 1024) device = 'laptop';
  else if (width > 767) device = 'tablet';
  else device = 'phone';
  return device;
};

export const watchIfVisible = (element, callback) => {
  execIfVisible(element, callback);
  const handleScroll = () => {
    if(execIfVisible(element, callback))
      $(window).off('scroll', handleScroll);
  };
  $(window).on('scroll', handleScroll);
};

export const execIfVisible = (element, callback) => {
  const rect = element.get(0).getBoundingClientRect();
  if (rect.top > -rect.height && rect.top < window.innerHeight) {
    callback();
    return true;
  }
};

export const listenMediaChange = (rule, callback) => {
  const match = window.matchMedia(rule);
  if (match.addEventListener) {
    match.addEventListener('change', callback);
  } else if (match.addListener) {
    match.addListener(callback);
  }
};