var Base = _class("Base", {

  props: {
    impl: null,
    _position: {x:0, y:0},
    _size: {width:0, height:0},
    _transform: {},
    _style: {}
  },

  methods: {
    position: function(d)
    {
      if (d) {
        var x = d.x, y = d.y;
        this._position.x = x;
        this._position.y = y;
        this.impl.position(x, y, this._size.width, this._size.height);
      }
      return {x: this._position.x, y: this._position.y};
    },

    size: function(d)
    {
      if (d) {
        var width = d.width, height = d.height;
        this._size.width = width;
        this._size.height = height;
        this.impl.size(width, height);
      }
      return {width: this._size.width, height: this._size.height};
    },

    transform: function()
    {
      var l;

      if ((l = arguments.length) > 0) {

        var scale, rotate, translate, tr, j, i;
        var pos = this.position();
        var x = pos.x, y = pos.y;
        // console.log(x, y);
        var m = new Util.Matrix();

        for (j=0; j<l; j++) {

          tr = arguments[j];

          for (i in tr) {
            if (tr.hasOwnProperty(i)) {
              switch(i) {
              case 'scale':
                scale = tr[i];
                if (scale.x === undefined || scale.y === undefined) _error("Less parameters Error.", "transform() scale needs x, y parameters at least.");
                if (scale.cx === undefined) scale.cx = x;
                if (scale.cy === undefined) scale.cy = y;
                this._transform.scale = scale;
                break;

              case 'rotate':
                rotate = tr[i];
                if (rotate.angle === undefined) _error("Less parameters Error.", "transform() rotate needs angle parameter at least.");
                if (rotate.x === undefined) rotate.x = x;
                if (rotate.y === undefined) rotate.y = y;
                this._transform.rotate = rotate;
                break;

              case 'translate':
                translate = tr[i];
                if (translate.x === undefined || translate.y === undefined) _error("Less parameters Error.", "transform() translate needs x, y parameters at least.");
                this._transform.translate = translate;
                break;

              default:
                _error('Invalid property Error.', "transform() expects 'translate', 'scale', 'rotate', but given '" + i + "'.");

              }
            }
          }
          m.set(tr);
        }

        this.impl.transform(m);
      }

      return ({
        scale:     this._transform.scale,
        rotate:    this._transform.rotate,
        translate: this._transform.translate
      });

    },

    addTransform: function()
    {
    },

    resetTransform: function()
    {
      this._transform = {};
      this.impl.resetTransform();
    },

    style: function(st)
    {
      if (st !== undefined) {
        var i;
        var stroke={ none: true },
        visibility=true,
        fill={ color: [0,0,0,255], rule: 'nonzero' },
        cursor='default',
        zIndex=0;

        for (i in st) {
          if (st.hasOwnProperty(i)) {
            switch(i) {
            case 'stroke':
              stroke = _clone(st[i]);
              break;
            case 'visibility':
              visibility = st[i];
              break;
            case 'fill':
              fill = _clone(st[i]);
              break;
            case 'cursor':
              cursor = st[i];
              break;
            case 'zIndex':
              zIndex = st[i];
              break;
            }
          }
        }


        this._style = {
          stroke: stroke,
          visibility: visibility,
          fill: fill,
          cursor: cursor,
          zIndex: zIndex
        };

        this.impl.style(this._style);

      }

      return this._style;
    },

    addStyle: function()
    {
    },

    resetStyle: function()
    {
      this._style = {};
      this.impl.resetStyle();
    },

    addEvent: function(evt)
    {
      this.impl.addEvent(evt);
    },
    removeEvent: function(evt)
    {
      this.impl.removeEvent(evt);
    }
  }
});