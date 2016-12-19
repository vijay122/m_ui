function getUserAgentString() {
  return (navigator.userAgent || navigator.vendor || navigator["opera"]);
}

export function isMobile() {
  return (isMob() && !isIPad() || isPortrait());
}

function isMob() {
  return /Mobi/.test(getUserAgentString());
}

function isPortrait() {
  return ((isAndroid() || isIOS()) && getOrientation() === "portrait" );
}

function isAndroid() {
  return getCurrentHostDevice() === "Android";
}
function isIOS() {
  return getCurrentHostDevice() === "iOS";
}

function getOrientation(): string {
  let orientation;
  if (window.matchMedia("(orientation: portrait)").matches) {
    orientation = "portrait";
  }

  if (window.matchMedia("(orientation: landscape)").matches) {
    orientation = "landscape";
  }
  return orientation;
}

function isIPad() {
  return /iPad/.test(getUserAgentString());
}

function getCurrentHostDevice() {
  var ua = getUserAgentString();

  if (/android/i.test(ua))
    return "Android";

  if (/iPad|iPhone|iPod/.test(ua) && !window["MSStream"])
    return "iOS";
}