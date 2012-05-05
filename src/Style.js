var Style = (function() {
  return _class("Style", {
    props: {
      fill: null,
      stroke: null
    },

    methods: {
      init: function Style_init() {
        switch (arguments.length) {
        case 0:
          break;
        case 1:
          var arg = arguments[0];
          if (typeof arg == 'string' || arg instanceof String) {
            this.initWithString.apply(this, arguments);
          } else if (typeof arg == 'object') {
            if (arg instanceof Stroke)
              this.stroke = arg;
            else if (arg instanceof Fill)
              this.fill = arg;
            else
              this.initWithObject.apply(this, arguments);
          } else {
            throw new ArgumentError("Invalid argument: " + arg);
          }
          break;
        default:
          this.initWithArguments.apply(this, arguments);
          break;
        }
      },

      initWithArguments: function Style_initWithArguments() {
        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (arg instanceof Stroke)
            this.stroke = arg;
          else if (arg instanceof Fill)
            this.fill = arg;
          else
            throw new ArgumentError("Invalid type for argument #" + i);
        }
      },

      initWithString: function Style_initWithString(str) {
        var rules = _parseCSSRules(str);
        var fill = null, stroke = null;
        if (rules['fill'] !== void(0)) {
          fill = new FloodFill(new Color(rules['fill'][0]));
        }
        if (rules['fill-opacity'] !== void(0)) {
          if (!fill)
            fill = new FloodFill(new Color(0, 0, 0));
          fill.color.a = 0|(255 * rules['fill-opacity']);
        }
        if (rules['stroke'] !== void(0)) {
          stroke = new Stroke(new Color(rules['stroke'][0]), 1);
        }
        if (rules['stroke-width'] !== void(0)) {
          if (!stroke)
            stroke = new Stroke(new Color(0, 0, 0), 1);
          stroke.width = rules['stroke-width'][0];
        }
        if (rules['stroke-opacity'] !== void(0)) {
          if (!stroke)
            stroke = new Stroke(new Color(0, 0, 0));
          stroke.color.a = 0|(255 * rules['stroke-opacity']);
        }
        this.fill = fill;
        this.stroke = stroke;
      },

      initWithObject: function Style_initWithObject(obj) {
        do {
          if (typeof obj.stroke == 'object') {
            if (obj.stroke === null || obj.stroke instanceof Stroke) {
              this.stroke = obj.stroke;
              break;
            }
          }
          throw new ArgumentError("Property 'stroke' in " + obj + " does not give a Stroke object");
        } while (0);

        do {
          if (typeof obj.fill == 'object') {
            if (obj.fill === null || obj.fill instanceof Fill) {
              this.fill = obj.fill;
              break;
            }
          }
          throw new ArgumentError("Property 'fill' in " + obj + " does not give a Fill object");
        } while (0);
      }
    }
  });
})();
/*
 * vim: sts=2 sw=2 ts=2 et
 */
