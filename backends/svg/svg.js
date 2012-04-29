var SVG = (function() {
  // checking browser.
  if ((BROWSER.identifier === 'ie' && BROWSER.version < 9)) return null;

  var SVG_NAMESPACE = "http://www.w3.org/2000/svg";

  function newNode(element_name) {
    return document.createElementNS(SVG_NAMESPACE, element_name);
  }

  include("Util.js");

  include("Base.js");
  include("Circle.js");
  include("Rect.js");
  include("Path.js");
  include("Text.js");
  include("DefsManager.js");
  include("Drawable.js");

  return {
    Util     : Util,
    Circle   : Circle,
    Rect     : Rect,
    Path     : Path,
    Text     : Text,
    Drawable : Drawable
  };
})();

/*
 * vim: sts=2 sw=2 ts=2 et
 */
