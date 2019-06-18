(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports,require('quickdom'),require('smart-extend'),require('popper.js'),require('error-ex')):typeof define==='function'&&define.amd?define(['exports','quickdom','smart-extend','popper.js','error-ex'],f):(g=g||self,f(g.taglist={},g.DOM$1,g.extend,g.Popper,g.errorEx));}(this,function(exports, DOM$1, extend, Popper, errorEx){'use strict';DOM$1=DOM$1&&DOM$1.hasOwnProperty('default')?DOM$1['default']:DOM$1;extend=extend&&extend.hasOwnProperty('default')?extend['default']:extend;Popper=Popper&&Popper.hasOwnProperty('default')?Popper['default']:Popper;errorEx=errorEx&&errorEx.hasOwnProperty('default')?errorEx['default']:errorEx;var defaults = {
  boundingEl: document.body,
  tagLabel: 'Option',
  requireDefaults: false,
  templates: null,
  defaults: null,
  tags: null,
  fontFamily: 'inherit',
  button: {
    bgColor: '#f74425',
    textColor: '#fff'
  }
};var addButton = DOM$1.template(['div', {
  ref: 'addButton',
  style: {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'top',
    height: '28px',
    width: '28px',
    boxSizing: 'border-box'
  }
}, ['div', {
  style: {
    // display: 'inline-block'
    // verticalAlign: 'top'
    height: '100%',
    width: '100%',
    border: '2px dashed',
    borderRadius: '5px',
    boxSizing: 'border-box',
    cursor: 'pointer',
    userSelect: 'none',
    opacity: 0.35,
    color: '#181818'
  }
}, ['div', {
  ref: 'TagListButtonText',
  style: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '55%',
    transform: 'translate(0, -50%)',
    width: '100%',
    lineHeight: 1,
    textAlign: 'center',
    fontSize: '23px',
    fontWeight: 600
  }
}, '+']]]);
var template = DOM$1.template(['div', {
  ref: 'TagList',
  style: {
    position: 'relative',
    textAlign: 'left',
    fontFamily: function (taglist) {
      return taglist.settings.fontFamily;
    }
  }
}, addButton]);var button = DOM$1.template(['div', {
  ref: 'button',
  style: {
    position: 'relative',
    height: 50,
    borderRadius: '0 0 5px 5px',
    boxSizing: 'border-box',
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: function (i) {
      return i.settings.button.bgColor;
    },
    color: function (i) {
      return i.settings.button.textColor;
    }
  },
  computers: {
    height: function (height) {
      return this.style({
        height
      });
    }
  }
}, ['div', {
  ref: 'buttonText',
  style: {
    position: 'absolute',
    top: '53%',
    transform: "translate(0, -50%)",
    display: 'block',
    width: '100%',
    fontSize: 14,
    lineHeight: 1,
    fontWeight: 400,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '1.5px'
  },
  computers: {
    text: function (text) {
      return this.text = text;
    },
    size: function (fontSize) {
      return this.style({
        fontSize
      });
    },
    font: function (fontFamily) {
      return this.style({
        fontFamily
      });
    }
  }
}]]);
var template$1 = DOM$1.template(['div', {
  ref: 'TagList-Popup',
  style: {
    position: 'relative',
    zIndex: 2001,
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '0px 3px 18px rgba(0,0,0,0.24)',
    boxSizing: 'border-box',
    fontFamily: function (popup) {
      return popup.settings.fontFamily;
    }
  }
}, ['div', {
  ref: 'content'
}]]);var Popup;

Popup = function () {
  class Popup extends require('event-lite') {
    constructor(parent, settings, boundingEl) {
      super();
      this.parent = parent;
      this.settings = settings;
      this.state = {
        open: false
      };
      this.el = template$1.spawn(null, {
        relatedInstance: this
      });
      this.el.hide().appendTo(this.parent);
      this.popper = new Popper(this.parent[0], this.el[0], {
        placement: 'bottom',
        trigger: 'manual',
        modifiers: {
          offset: {
            enabled: true,
            offset: '5px'
          },
          preventOverflow: {
            enabled: true,
            boundriesElement: boundingEl[0] || boundingEl
          }
        }
      });
    }

    _attachOuterClickListener() {
      return DOM$1(document).on('click.outerClick', event => {
        var targetParents;
        targetParents = DOM$1(event.target).parents;

        if (!targetParents.includes(this.parent)) {
          this.close();
          return this.emit('blur');
        }
      });
    }

    _detachOuterClickListener() {
      return DOM$1(document).off('click.outerClick');
    }

    open() {
      if (this.state.open) {
        return;
      }

      this.emit('beforeopen');
      this.state.open = true;
      this.el.show();
      this.popper.update();

      this._attachOuterClickListener();

      this.emit('open');
      return this;
    }

    close() {
      if (!this.state.open) {
        return;
      }

      this.emit('beforeclose');
      this.state.open = false;
      this.el.hide();

      this._detachOuterClickListener();

      this.emit('close');
      return this;
    }

    setContent(content) {
      this.els.content.empty();

      if (content) {
        return this.els.content.append(content);
      }
    }

  }
  Object.defineProperties(Popup.prototype, {
    'els': {
      get: function () {
        return this.el.child;
      }
    }
  });
  return Popup;
}.call(undefined);

var Popup$1 = Popup;function stringify (value, formatter) {
  var alias;

  switch (false) {
    case typeof formatter !== 'undefined':
      return value;

    case typeof formatter !== 'function':
      return formatter(value);

    case !Array.isArray(formatter):
      alias = formatter.find(function (candidate) {
        return candidate.value === value;
      });

      if (alias) {
        return alias.label || alias.name;
      } else {
        return value;
      }

      break;

    case !(typeof formatter === 'object' && formatter):
      return formatter[value] || value;
  }
}function updater (tag) {
  var updater;

  updater = function (newValue) {
    return updater.tag._updateFromField(newValue);
  };

  updater.tag = tag;
  return updater;
}var button$1 = DOM$1.template(['div', {
  ref: 'button'
}, ['div', {
  ref: 'errorMessage',
  style: {
    boxSizing: 'border-box',
    display: 'none',
    padding: '10px 15px',
    fontSize: 12,
    fontWeight: 500,
    color: '#f74425'
  },
  methods: {
    set: function (message) {
      this.html = message;
      this.show();
      clearTimeout(this._timeout);
      return this._timeout = setTimeout(() => {
        return this.clear();
      }, 8000);
    },
    clear: function () {
      this.text = '';
      return this.hide();
    }
  }
}], button.extend({
  ref: 'button_'
}, ['div', {
  style: {
    backgroundColor: '#d4d4d4',
    $hover: {
      backgroundColor: function (i) {
        return i.settings.button.bgColor;
      }
    }
  }
}])]);
var removeButton = DOM$1.template(['div', {
  ref: 'removeButton',
  style: {
    position: 'absolute',
    right: '8px',
    top: '55%',
    transform: "translate(0, -50%)",
    fontSize: '17px',
    lineHeight: 1,
    opacity: 0.4,
    fontWeight: 600
  }
}, '×']);
var text = DOM$1.template(['div', {
  ref: 'text',
  style: {
    position: 'relative',
    top: '9px',
    fontSize: '13.2px',
    lineHeight: 1
  }
}, ['span', {
  ref: 'label',
  style: {
    fontWeight: 600
  }
}], ['span', {
  ref: 'value'
}]]);
var content = DOM$1.template(['div', {
  ref: 'tagContent',
  style: {
    boxSizing: 'border-box',
    padding: function (i) {
      return `${i.settings.padding}px`;
    },
    maxWidth: function (i) {
      return `${i.settings.maxWidth}px`;
    }
  }
}]);
var template$2 = DOM$1.template(['div', {
  ref: 'tag',
  style: {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'top',
    height: '28px',
    marginRight: '10px',
    marginBottom: '6px',
    padding: '0 25px 0 10px',
    borderRadius: '4px',
    textAlign: 'center',
    boxSizing: 'border-box',
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: function (tag) {
      return tag.settings.bgColor;
    },
    color: function (tag) {
      return tag.settings.textColor;
    },
    fontFamily: function (tag) {
      return tag.settings.fontFamily;
    }
  }
}, text, removeButton]);var settings = {
  bgColor: '#ccc',
  textColor: '#181818',
  updateWhen: 'applied',
  // || 'changed'
  hideLabel: false,
  padding: 20,
  maxWidth: 350
};
var option = {
  getter: function () {
    return this.field.value;
  },
  setter: function (value) {
    return this.field.value = value;
  },
  validate: function (value) {
    return value != null;
  }
};var ValidationError = errorEx('ValidationError');var Tag;

Tag = function () {
  class Tag extends require('event-lite') {
    constructor(option$1, listSettings) {
      var settings1, settings2;
      super();
      settings1 = extend.keys(['button', 'fontFamily']).clone(listSettings);
      settings2 = extend.keys(['padding', 'maxWidth']).clone(option$1);
      this.settings = extend.clone(settings, listSettings.tag, settings1, settings2);
      this.option = extend.clone(option, option$1);
      this.option.popup = extend.clone(listSettings.popup, this.option.popup);
      this.state = {};
      this.name = this.option.name;
      this.label = this.option.label;
      this.el = template$2.spawn(null, {
        relatedInstance: this
      });
      this.content = content.spawn(null, {
        relatedInstance: this
      });
      this.button = button$1.spawn({
        data: {
          text: 'Apply'
        }
      }, {
        relatedInstance: this
      });
      this.popup = new Popup$1(this.el, listSettings, listSettings.boundingEl);
      this.popup.setContent(this.content);

      if (this.settings.updateWhen === 'applied') {
        this.button.insertAfter(this.content);
      }

      this._setup();

      this._attachBindings();
    }

    _setup() {
      if (this.option.hideLabel) {
        return this.els.label.hide();
      } else {
        return this.els.label.html = `${this.option.label}: `;
      }
    }

    _attachBindings() {
      this.els.removeButton.on('click', event => {
        this.emit('remove');
        return event.stopPropagation();
      });
      this.el.on('click', () => {
        return this.popup.open();
      });
      this.button.on('click', e => {
        e.stopPropagation();

        if (this._applyChanges()) {
          return this.popup.close();
        }
      });

      if (this.settings.updateWhen === 'applied') {
        this.popup.on('open', () => {
          var base;
          return (base = this.state).valueOnFocus != null ? base.valueOnFocus : base.valueOnFocus = this.value;
        });
        return this.popup.on('blur', () => {
          if (this.value !== this.state.valueOnFocus) {
            if (!this._applyChanges()) {
              console.log('opening');
              return this.popup.open();
            }
          }
        });
      }
    }

    _initField() {
      this.field = this.option.field.call(this, this.content.raw, updater(this));

      if (this.option.default) {
        return this.set(this.option.default, true);
      }
    }

    _domInsert(method, target) {
      this.el[method](target);

      this._initField();

      return this;
    }

    _notifyChange() {
      return this.emit('change', this.value);
    }

    _updateText(value) {
      return this.els.value.text = stringify(value, this.option.formatter);
    }

    _updateFromUser(value, SILENT) {
      this._updateText(value);

      this.option.setter.call(this, value);

      if (!SILENT) {
        return this._notifyChange();
      }
    }

    _updateFromField(value) {
      this._updateText(value);

      if (this.settings.updateWhen !== 'applied') {
        return this._notifyChange();
      }
    }

    _applyChanges() {
      var validation;
      validation = this.validate();

      if (validation === true) {
        this.state.valueOnFocus = null;

        this._notifyChange();

        return true;
      } else if (validation instanceof Error) {
        this.button.child.errorMessage.set(validation.message);
        this.emit('error', validation);
        return false;
      }
    }

    get(skipTransform) {
      var value;
      value = this.option.getter.call(this);

      if (this.option.transformOutput && !skipTransform) {
        value = this.option.transformOutput(value);
      }

      return value;
    }

    set(value, SILENT) {
      if (typeof value === 'function') {
        value = value();
      }

      if (this.option.transformInput) {
        value = this.option.transformInput(value);
      }

      return this._updateFromUser(value, SILENT);
    }

    validate() {
      var err, result;

      if (!this.option.validate) {
        return true;
      }

      try {
        result = this.option.validate.call(this, this.value);
      } catch (error) {
        err = error;
        result = err;
      }

      switch (false) {
        case result !== true:
          return true;

        case result !== false:
          return new ValidationError("validation failed");

        case typeof result !== 'string':
          return new ValidationError(result);

        case !(result instanceof Error):
          return result;
      }
    }

    appendTo(target) {
      return this._domInsert('appendTo', target);
    }

    prependTo(target) {
      return this._domInsert('prependTo', target);
    }

    insertBefore(target) {
      return this._domInsert('insertBefore', target);
    }

    insertAfter(target) {
      return this._domInsert('insertAfter', target);
    }

  }
  Object.defineProperties(Tag.prototype, {
    els: {
      get: function () {
        return this.el.child;
      }
    },
    value: {
      get: function () {
        return this.get();
      }
    },
    rawValue: {
      get: function () {
        return this.get(true);
      }
    }
  });
  return Tag;
}.call(undefined);

var Tag$1 = Tag;var arrowDown = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMwOS4xNTYgMzA5LjE1NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzA5LjE1NiAzMDkuMTU2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPGc+CgkJPHBvbHlnb24gcG9pbnRzPSIyODguNDYxLDY0LjkyOSAxNTQuNTg5LDIwMi43NjYgMjAuNzIzLDY0Ljk0IDAsODUuMDcgMTU0LjU4OSwyNDQuMjI4IDMwOS4xNTYsODUuMDcgICAiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"; // exports.checkmark = """
var button$2 = button.extend(['div', {
  computers: {
    _init: function () {
      return this.applyData({
        text: `Add ${this.related.settings.itemLabel}`
      });
    }
  }
}]);
var arrow = DOM$1.template(['div', {
  ref: 'arrow',
  style: {
    position: 'absolute',
    zIndex: 2,
    right: '15px',
    top: '54%',
    transform: "translate(0, -50%)",
    width: '17px',
    height: '17px',
    backgroundSize: '100%',
    backgroundImage: `url(${arrowDown})`,
    opacity: 0.5
  }
}]);
var fake = DOM$1.template(['div', {
  ref: 'fake',
  style: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: '53%',
    transform: "translate(0, -50%)",
    height: '16px',
    padding: '0 15px',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: 1,
    textAlign: 'left',
    userSelect: 'none',
    boxSizing: 'border-box',
    color: '#181818',
    opacity: 0.6,
    $hasContent: {
      opacity: 1
    }
  }
}]);
var input = DOM$1.template(['select', {
  ref: 'input',
  forceStyle: true,
  style: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0
  },
  computers: {
    _init: function () {
      return DOM$1.option({
        props: {
          value: ''
        }
      }, `Select ${this.related.settings.tagLabel}`).appendTo(this);
    }
  },
  methods: {
    label: {
      get: function () {
        var ref, selected;
        selected = this.raw.selectedIndex || 0;
        return (ref = this.raw.options[selected]) != null ? ref.label : void 0;
      }
    },
    value: {
      get: function () {
        return this.raw.value;
      },
      set: function (value) {
        return this.raw.value = value;
      }
    }
  }
}]);
var field = DOM$1.template(['div', {
  ref: 'selectField',
  style: {
    position: 'relative',
    // width: '100%'
    minWidth: 230,
    height: '55px',
    borderBottom: '1px solid #ddd'
  }
}, arrow, fake, input]);var SelectField;

SelectField = function () {
  class SelectField extends require('event-lite') {
    constructor(settings) {
      super();
      this.settings = settings;
      this.field = field.spawn(null, {
        relatedInstance: this
      });
      this.input = this.field.child.input;

      this._attachBindings();

      this._setUiLabel(this.label);
    }

    _attachBindings() {
      this.field.on('input', () => {
        return this.emit('change', {
          label: this.label,
          value: this.value
        });
      });
      return this.on('change', function ({
        label
      }) {
        return this._setUiLabel(label);
      });
    }

    _setUiLabel(label) {
      return this.field.child.fake.html = label;
    }

    _setValue(value) {
      this.input.value = value;
      return this._setUiLabel(this.label);
    }

    setOptions(options) {
      var i, label, len, name, prevOptions;
      prevOptions = this.input.children.slice(1);

      if (prevOptions.length) {
        DOM$1.batch(prevOptions).remove();
      }

      for (i = 0, len = options.length; i < len; i++) {
        ({
          name,
          label
        } = options[i]);
        this.input.append(DOM$1.option({
          props: {
            value: name
          }
        }, label));
      }
    }

    insertBefore(target) {
      return this.field.insertBefore(target);
    }

  }
  Object.defineProperties(SelectField.prototype, {
    label: {
      get: function () {
        return this.input.label;
      }
    },
    value: {
      get: function () {
        return this.input.value;
      },
      set: function (value) {
        return this._setValue(value);
      }
    }
  });
  return SelectField;
}.call(undefined);

var SelectField$1 = SelectField;var BufferTag;

BufferTag = function () {
  class BufferTag extends require('event-lite') {
    constructor(list) {
      super();
      this.list = list;
      ({
        settings: this.settings
      } = this.list);
      this.content = content.spawn(null, {
        relatedInstance: this
      });
      this.state = {};
      this.applyButton = this.button = button$1.spawn({
        data: {
          text: `Add ${this.settings.tagLabel}`
        }
      }, {
        relatedInstance: this
      });
      this.addButton = this.list.els.addButton;
      this.popup = new Popup$1(this.addButton, this.settings, this.settings.boundingEl);
      this.selectField = new SelectField$1(this.settings);
      this.content_ = DOM.div(null, this.content);
      this.selectField.insertBefore(this.content);
      this.applyButton.insertAfter(this.content);
      this.popup.setContent(this.content_);

      this._setup();
    }

    _setup() {
      this.applyButton.on('click', () => {
        if (this._validateHasField()) {
          return this._applyChanges();
        }
      });
      this.addButton.on('click', () => {
        return this.popup.open();
      });
      return this.selectField.on('change', ({
        value
      }) => {
        return this._setCurrent(value);
      });
    }

    _setCurrent(name) {
      this.content.empty();
      this.option = this.list._findOption(name);

      if (this.option) {
        this.option = extend.clone(option, this.option);

        this._initField();
      } else {
        this.field = null;
      }

      if (this.selectField.value !== name) {
        return this.selectField.value = name;
      }
    }

    _validateHasField() {
      if (this.field) {
        return true;
      } else {
        this.button.child.errorMessage.set('You must select a field first');
        return false;
      }
    }

    _updateSelectable() {
      var options;

      if (this.settings.repeatableValues) {
        options = this.list.options;
      } else {
        options = this.list.options.filter(({
          name
        }) => {
          return this.list._findTag(name);
        });
      }

      return this.selectField.setOptions(options);
    }

    _notifyChange() {
      this.emit('change', this.option, this.value);
      return this._reset();
    }

    _updateFromUser(value) {
      return this.option.setter.call(this, value);
    }

    _updateFromField(value) {}

    _reset() {
      this._setCurrent('');

      return this.popup.close();
    }

  }
  BufferTag.prototype.get = Tag$1.prototype.get;
  BufferTag.prototype.set = Tag$1.prototype.set;
  BufferTag.prototype.validate = Tag$1.prototype.validate;
  BufferTag.prototype._initField = Tag$1.prototype._initField;
  BufferTag.prototype._applyChanges = Tag$1.prototype._applyChanges;
  Object.defineProperties(BufferTag.prototype, {
    els: {
      get: function () {
        return this.el.child;
      }
    },
    value: {
      get: function () {
        return this.get();
      }
    }
  });
  return BufferTag;
}.call(undefined);

var BufferTag$1 = BufferTag;var toArray = function (object) {
  var name, results, value;

  if (Array.isArray(object)) {
    return object;
  } else {
    results = [];

    for (name in object) {
      value = object[name];
      results.push({
        name,
        value
      });
    }

    return results;
  }
};var TagList;

TagList = function () {
  class TagList extends require('event-lite') {
    constructor(targetContainer, options = [], settings) {
      var i, len, option, ref;
      super();
      this.targetContainer = targetContainer;
      this.options = options;
      this.settings = extend.deepOnly('button').clone(defaults, settings);
      this.settings.boundingEl = DOM$1(this.settings.boundingEl);
      this.settings.defaults = toArray(this.settings.defaults || []);
      this.tags = [];
      this.el = template.spawn(null, {
        relatedInstance: this
      });
      this.buffer = new BufferTag$1(this);
      ref = this.options;

      for (i = 0, len = ref.length; i < len; i++) {
        option = ref[i];

        if (option.name == null) {
          option.name = option.label;
        }
      }

      this._applyDefaults(this.settings.defaults);

      this._attachBindings();

      this.el.appendTo(this.targetContainer);

      this.buffer._updateSelectable();
    }

    _attachBindings() {
      this.buffer.on('change', (option, value) => {
        this.add(option, value);
        return this._notifyChange();
      });
      this.buffer.popup.on('beforeopen', () => {
        return this.closeAllPopups();
      });
      this.on('change', () => {
        return this.buffer._updateSelectable();
      });

      if (this.settings.onChange) {
        return this.on('change', this.settings.onChange);
      }
    }

    _applyDefaults(defaults) {
      var i, len, name, option, value;
      defaults = toArray(defaults);

      for (i = 0, len = defaults.length; i < len; i++) {
        ({
          name,
          value
        } = defaults[i]);

        if (!value) {
          continue;
        }

        option = this._findOption(name);

        if (typeof value === 'function') {
          value = value();
        }

        this.add(option, value);
      }
    }

    _notifyChange(SILENT) {
      if (!SILENT) {
        return this.emit('change', this.getValues(true));
      }
    }

    _findOption(name, collection = this.options) {
      return collection.find(function (option) {
        return option.name === name;
      });
    }

    _findTag(name, collection = this.tags) {
      return collection.find(function (tag) {
        return tag.name === name;
      });
    }

    _findDefault(name) {
      return this.settings.defaults.find(function (default_) {
        return default_.name === name;
      });
    }

    addOption(option) {
      if (!this._findOption(option.name)) {
        return this.options.push(option);
      }
    }

    add(option, value) {
      var tag;

      if (typeof option === 'string') {
        option = this._findOption(option);
      }

      tag = new Tag$1(option, this.settings);
      tag.insertBefore(this.els.addButton);

      if (value != null) {
        tag.set(value, true);
      }

      tag.once('remove', () => {
        return this.remove(tag);
      });
      tag.on('change', () => {
        return this._notifyChange();
      });
      tag.popup.on('beforeopen', () => {
        return this.closeAllPopups();
      });
      return this.tags.push(tag);
    }

    remove(tag, SILENT) {
      var tagIndex;

      if (typeof tag === 'string') {
        tag = this.tagsByName[tag];
      }

      tag.popup.close();
      tagIndex = this.tags.indexOf(tag);

      if (this.settings.requireDefaults && this._findDefault(tag.name)) {
        tag.set(this._findDefault(tag.name), true);
        this.tags.splice(tagIndex, 1, tag);
      } else {
        tag.el.remove();
        this.tags.splice(tagIndex, 1);
      }

      this._notifyChange(SILENT);
    }

    removeAll(SILENT) {
      var i, len, ref, tag;
      ref = this.tags.slice();

      for (i = 0, len = ref.length; i < len; i++) {
        tag = ref[i];
        this.remove(tag, true);
      }

      this._notifyChange(SILENT);
    }

    setValues(values, SILENT) {
      var i, index, len, name, ref, value;
      ref = toArray(values);

      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        ({
          name,
          value
        } = ref[index]);
        this.setValue(name, value, true, index);
      }

      return this._notifyChange(SILENT);
    }

    setValue(name, value, SILENT, fromIndex) {
      var collection, existing;
      collection = fromIndex ? this.tags.slice(fromIndex) : this.tags;
      existing = this._findTag(name, collection);

      if (existing) {
        existing.set(value, true);
      } else if (this._findOption(name)) {
        this.add(name, value);
      }

      return this._notifyChange(SILENT);
    }

    replaceValues(values, SILENT) {
      this.removeAll(true);
      this.setValues(values, true);
      return this._notifyChange(SILENT);
    }

    getValues() {
      return this.tags.map(function (tag) {
        return {
          name: tag.name,
          value: tag.value
        };
      });
    }

    closeAllPopups() {
      var i, len, ref, tag;
      this.buffer.popup.close();
      ref = this.tags;

      for (i = 0, len = ref.length; i < len; i++) {
        tag = ref[i];
        tag.popup.close();
      }
    }

    destroy() {
      this.closeAllPopups();
      this.el.remove();
      this.emit('destroy');
    }

  }
  Object.defineProperties(TagList.prototype, {
    'els': {
      get: function () {
        return this.el.child;
      }
    },
    'tagsByName': {
      get: function () {
        var tags;
        tags = this.tags;
        return new function () {
          var i, len, tag;

          for (i = 0, len = tags.length; i < len; i++) {
            tag = tags[i];
            this[tag.name] = tag;
          }

          return this;
        }();
      }
    }
  });
  return TagList;
}.call(undefined);

var TagList$1 = TagList;var version = "3.0.5";exports.BufferTag=BufferTag$1;exports.Popup=Popup$1;exports.Tag=Tag$1;exports.default=TagList$1;exports.version=version;Object.defineProperty(exports,'__esModule',{value:true});}));//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnbGlzdC5kZWJ1Zy5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL3RhZ2xpc3QvZGVmYXVsdHMuY29mZmVlIiwiLi4vc3JjL3RhZ2xpc3QvdGVtcGxhdGUuY29mZmVlIiwiLi4vc3JjL3BvcHVwL3RlbXBsYXRlLmNvZmZlZSIsIi4uL3NyYy9wb3B1cC9pbmRleC5jb2ZmZWUiLCIuLi9zcmMvdGFnL3N0cmluZ2lmeS5jb2ZmZWUiLCIuLi9zcmMvdGFnL3VwZGF0ZXIuY29mZmVlIiwiLi4vc3JjL3RhZy90ZW1wbGF0ZS5jb2ZmZWUiLCIuLi9zcmMvdGFnL2RlZmF1bHRzLmNvZmZlZSIsIi4uL3NyYy9lcnJvcnMuY29mZmVlIiwiLi4vc3JjL3RhZy9pbmRleC5jb2ZmZWUiLCIuLi9zcmMvc3ZnLmNvZmZlZSIsIi4uL3NyYy9zZWxlY3RGaWVsZC90ZW1wbGF0ZS5jb2ZmZWUiLCIuLi9zcmMvc2VsZWN0RmllbGQvaW5kZXguY29mZmVlIiwiLi4vc3JjL3RhZy9idWZmZXIuY29mZmVlIiwiLi4vc3JjL2hlbHBlcnMuY29mZmVlIiwiLi4vc3JjL3RhZ2xpc3QvaW5kZXguY29mZmVlIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0XG5cdGJvdW5kaW5nRWw6IGRvY3VtZW50LmJvZHlcblx0dGFnTGFiZWw6ICdPcHRpb24nXG5cdHJlcXVpcmVEZWZhdWx0czogZmFsc2Vcblx0dGVtcGxhdGVzOiBudWxsXG5cdGRlZmF1bHRzOiBudWxsXG5cdHRhZ3M6IG51bGxcblx0Zm9udEZhbWlseTogJ2luaGVyaXQnXG5cdGJ1dHRvbjpcblx0XHRiZ0NvbG9yOiAnI2Y3NDQyNSdcblx0XHR0ZXh0Q29sb3I6ICcjZmZmJyIsImltcG9ydCBET00gZnJvbSAncXVpY2tkb20nXG5cbmV4cG9ydCBhZGRCdXR0b24gPSBET00udGVtcGxhdGUoXG5cdFsnZGl2J1xuXHRcdHJlZjogJ2FkZEJ1dHRvbidcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnXG5cdFx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuXHRcdFx0dmVydGljYWxBbGlnbjogJ3RvcCdcblx0XHRcdGhlaWdodDogJzI4cHgnXG5cdFx0XHR3aWR0aDogJzI4cHgnXG5cdFx0XHRib3hTaXppbmc6ICdib3JkZXItYm94J1xuXG5cdFx0WydkaXYnXG5cdFx0XHRzdHlsZTogXG5cdFx0XHRcdCMgZGlzcGxheTogJ2lubGluZS1ibG9jaydcblx0XHRcdFx0IyB2ZXJ0aWNhbEFsaWduOiAndG9wJ1xuXHRcdFx0XHRoZWlnaHQ6ICcxMDAlJ1xuXHRcdFx0XHR3aWR0aDogJzEwMCUnXG5cdFx0XHRcdGJvcmRlcjogJzJweCBkYXNoZWQnXG5cdFx0XHRcdGJvcmRlclJhZGl1czogJzVweCdcblx0XHRcdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCdcblx0XHRcdFx0Y3Vyc29yOiAncG9pbnRlcidcblx0XHRcdFx0dXNlclNlbGVjdDogJ25vbmUnXG5cdFx0XHRcdG9wYWNpdHk6IDAuMzVcblx0XHRcdFx0Y29sb3I6ICcjMTgxODE4J1xuXHRcdFx0XG5cdFx0XHRbJ2Rpdidcblx0XHRcdFx0cmVmOiAnVGFnTGlzdEJ1dHRvblRleHQnXG5cdFx0XHRcdHN0eWxlOlxuXHRcdFx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXG5cdFx0XHRcdFx0bGVmdDogMFxuXHRcdFx0XHRcdHJpZ2h0OiAwXG5cdFx0XHRcdFx0dG9wOiAnNTUlJ1xuXHRcdFx0XHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwLCAtNTAlKSdcblx0XHRcdFx0XHR3aWR0aDogJzEwMCUnXG5cdFx0XHRcdFx0bGluZUhlaWdodDogMVxuXHRcdFx0XHRcdHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRcdFx0XHRmb250U2l6ZTogJzIzcHgnXG5cdFx0XHRcdFx0Zm9udFdlaWdodDogNjAwXG5cdFx0XHQnKyddXG5cdFx0XVxuXG5cdF1cbilcblxuXG5cbmV4cG9ydCBkZWZhdWx0IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAnVGFnTGlzdCdcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnXG5cdFx0XHR0ZXh0QWxpZ246ICdsZWZ0J1xuXHRcdFx0Zm9udEZhbWlseTogKHRhZ2xpc3QpLT4gdGFnbGlzdC5zZXR0aW5ncy5mb250RmFtaWx5XG5cblx0XHRhZGRCdXR0b25cblx0XVxuKVxuXG4iLCJpbXBvcnQgRE9NIGZyb20gJ3F1aWNrZG9tJ1xuXG5leHBvcnQgYnV0dG9uID0gRE9NLnRlbXBsYXRlKFxuXHRbJ2Rpdidcblx0XHRyZWY6ICdidXR0b24nXG5cdFx0c3R5bGU6XG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuXHRcdFx0aGVpZ2h0OiA1MFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAnMCAwIDVweCA1cHgnXG5cdFx0XHRib3hTaXppbmc6ICdib3JkZXItYm94J1xuXHRcdFx0Y3Vyc29yOiAncG9pbnRlcidcblx0XHRcdHVzZXJTZWxlY3Q6ICdub25lJ1xuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAoaSktPiBpLnNldHRpbmdzLmJ1dHRvbi5iZ0NvbG9yXG5cdFx0XHRjb2xvcjogKGkpLT4gaS5zZXR0aW5ncy5idXR0b24udGV4dENvbG9yXG5cdFx0Y29tcHV0ZXJzOlxuXHRcdFx0aGVpZ2h0OiAoaGVpZ2h0KS0+IEBzdHlsZSB7aGVpZ2h0fVxuXG5cblx0XHRbJ2Rpdidcblx0XHRcdHJlZjogJ2J1dHRvblRleHQnXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZSdcblx0XHRcdFx0dG9wOiAnNTMlJ1xuXHRcdFx0XHR0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDAsIC01MCUpXCJcblx0XHRcdFx0ZGlzcGxheTogJ2Jsb2NrJ1xuXHRcdFx0XHR3aWR0aDogJzEwMCUnXG5cdFx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0XHRsaW5lSGVpZ2h0OiAxXG5cdFx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0XHR0ZXh0QWxpZ246ICdjZW50ZXInXG5cdFx0XHRcdHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnXG5cdFx0XHRcdGxldHRlclNwYWNpbmc6ICcxLjVweCdcblx0XHRcdGNvbXB1dGVyczpcblx0XHRcdFx0dGV4dDogKHRleHQpLT4gQHRleHQgPSB0ZXh0XG5cdFx0XHRcdHNpemU6IChmb250U2l6ZSktPiBAc3R5bGUge2ZvbnRTaXplfVxuXHRcdFx0XHRmb250OiAoZm9udEZhbWlseSktPiBAc3R5bGUge2ZvbnRGYW1pbHl9XG5cdFx0XVxuXHRdXG4pXG5cbmV4cG9ydCBkZWZhdWx0IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAnVGFnTGlzdC1Qb3B1cCdcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnXG5cdFx0XHR6SW5kZXg6IDIwMDFcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3doaXRlJ1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiAnNXB4J1xuXHRcdFx0Ym94U2hhZG93OiAnMHB4IDNweCAxOHB4IHJnYmEoMCwwLDAsMC4yNCknXG5cdFx0XHRib3hTaXppbmc6ICdib3JkZXItYm94J1xuXHRcdFx0Zm9udEZhbWlseTogKHBvcHVwKS0+IHBvcHVwLnNldHRpbmdzLmZvbnRGYW1pbHlcblx0XHRcblx0XHRbJ2Rpdidcblx0XHRcdHJlZjogJ2NvbnRlbnQnXG5cdFx0XVxuXHRdXG4pXG5cblxuIiwiaW1wb3J0IFBvcHBlciBmcm9tICdwb3BwZXIuanMnXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi90ZW1wbGF0ZSdcbmltcG9ydCBET00gZnJvbSAncXVpY2tkb20nXG5cbmNsYXNzIFBvcHVwIGV4dGVuZHMgcmVxdWlyZSgnZXZlbnQtbGl0ZScpXG5cdGNvbnN0cnVjdG9yOiAoQHBhcmVudCwgQHNldHRpbmdzLCBib3VuZGluZ0VsKS0+XG5cdFx0c3VwZXIoKVxuXHRcdEBzdGF0ZSA9IG9wZW46ZmFsc2Vcblx0XHRAZWwgPSB0ZW1wbGF0ZS5zcGF3bihudWxsLCB7cmVsYXRlZEluc3RhbmNlOkB9KVxuXG5cdFx0QGVsLmhpZGUoKS5hcHBlbmRUbyhAcGFyZW50KVxuXHRcdEBwb3BwZXIgPSBuZXcgUG9wcGVyIEBwYXJlbnRbMF0sIEBlbFswXSxcblx0XHRcdHBsYWNlbWVudDogJ2JvdHRvbSdcblx0XHRcdHRyaWdnZXI6ICdtYW51YWwnXG5cdFx0XHRtb2RpZmllcnM6XG5cdFx0XHRcdG9mZnNldDpcblx0XHRcdFx0XHRlbmFibGVkOiB0cnVlXG5cdFx0XHRcdFx0b2Zmc2V0OiAnNXB4J1xuXHRcdFx0XHRwcmV2ZW50T3ZlcmZsb3c6XG5cdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZVxuXHRcdFx0XHRcdGJvdW5kcmllc0VsZW1lbnQ6IGJvdW5kaW5nRWxbMF0gb3IgYm91bmRpbmdFbFxuXG5cdF9hdHRhY2hPdXRlckNsaWNrTGlzdGVuZXI6ICgpLT5cblx0XHRET00oZG9jdW1lbnQpLm9uICdjbGljay5vdXRlckNsaWNrJywgKGV2ZW50KT0+XG5cdFx0XHR0YXJnZXRQYXJlbnRzID0gRE9NKGV2ZW50LnRhcmdldCkucGFyZW50c1xuXHRcdFx0aWYgbm90IHRhcmdldFBhcmVudHMuaW5jbHVkZXMoQHBhcmVudClcblx0XHRcdFx0QGNsb3NlKClcblx0XHRcdFx0QGVtaXQgJ2JsdXInXG5cblx0X2RldGFjaE91dGVyQ2xpY2tMaXN0ZW5lcjogKCktPlxuXHRcdERPTShkb2N1bWVudCkub2ZmICdjbGljay5vdXRlckNsaWNrJ1xuXG5cblx0b3BlbjogKCktPlxuXHRcdHJldHVybiBpZiBAc3RhdGUub3BlblxuXHRcdEBlbWl0ICdiZWZvcmVvcGVuJ1xuXHRcdEBzdGF0ZS5vcGVuID0gdHJ1ZVxuXHRcdEBlbC5zaG93KClcblx0XHRAcG9wcGVyLnVwZGF0ZSgpXG5cdFx0QF9hdHRhY2hPdXRlckNsaWNrTGlzdGVuZXIoKVxuXHRcdEBlbWl0ICdvcGVuJ1xuXHRcdHJldHVybiBAXG5cblx0Y2xvc2U6ICgpLT5cblx0XHRyZXR1cm4gaWYgbm90IEBzdGF0ZS5vcGVuXG5cdFx0QGVtaXQgJ2JlZm9yZWNsb3NlJ1xuXHRcdEBzdGF0ZS5vcGVuID0gZmFsc2Vcblx0XHRAZWwuaGlkZSgpXG5cdFx0QF9kZXRhY2hPdXRlckNsaWNrTGlzdGVuZXIoKVxuXHRcdEBlbWl0ICdjbG9zZSdcblx0XHRyZXR1cm4gQFxuXG5cdHNldENvbnRlbnQ6IChjb250ZW50KS0+XG5cdFx0QGVscy5jb250ZW50LmVtcHR5KClcblx0XHRAZWxzLmNvbnRlbnQuYXBwZW5kIGNvbnRlbnQgaWYgY29udGVudFxuXG5cblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyBAOjosXG5cdFx0J2Vscyc6IGdldDogKCktPiBAZWwuY2hpbGRcblxuXG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwIiwiZXhwb3J0IGRlZmF1bHQgKHZhbHVlLCBmb3JtYXR0ZXIpLT4gc3dpdGNoXG5cdHdoZW4gdHlwZW9mIGZvcm1hdHRlciBpcyAndW5kZWZpbmVkJ1xuXHRcdHJldHVybiB2YWx1ZVxuXHRcblx0d2hlbiB0eXBlb2YgZm9ybWF0dGVyIGlzICdmdW5jdGlvbidcblx0XHRyZXR1cm4gZm9ybWF0dGVyKHZhbHVlKVxuXG5cdHdoZW4gQXJyYXkuaXNBcnJheShmb3JtYXR0ZXIpXG5cdFx0YWxpYXMgPSBmb3JtYXR0ZXIuZmluZCAoY2FuZGlkYXRlKS0+IGNhbmRpZGF0ZS52YWx1ZSBpcyB2YWx1ZVxuXHRcdGlmIGFsaWFzXG5cdFx0XHRyZXR1cm4gYWxpYXMubGFiZWwgb3IgYWxpYXMubmFtZVxuXHRcdGVsc2Vcblx0XHRcdHJldHVybiB2YWx1ZVxuXG5cdHdoZW4gdHlwZW9mIGZvcm1hdHRlciBpcyAnb2JqZWN0JyBhbmQgZm9ybWF0dGVyXG5cdFx0cmV0dXJuIGZvcm1hdHRlclt2YWx1ZV0gb3IgdmFsdWUiLCJleHBvcnQgZGVmYXVsdCAodGFnKS0+XG5cdHVwZGF0ZXIgPSAobmV3VmFsdWUpLT5cblx0XHR1cGRhdGVyLnRhZy5fdXBkYXRlRnJvbUZpZWxkKG5ld1ZhbHVlKVxuXG5cdHVwZGF0ZXIudGFnID0gdGFnXG5cdHJldHVybiB1cGRhdGVyIiwiaW1wb3J0IERPTSBmcm9tICdxdWlja2RvbSdcbmltcG9ydCB7YnV0dG9uIGFzIGJ1dHRvbl99IGZyb20gJy4uL3BvcHVwL3RlbXBsYXRlJ1xuXG5leHBvcnQgYnV0dG9uID0gRE9NLnRlbXBsYXRlKFxuXHRbJ2Rpdidcblx0XHRyZWY6ICdidXR0b24nXG5cdFx0WydkaXYnXG5cdFx0XHRyZWY6ICdlcnJvck1lc3NhZ2UnXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCdcblx0XHRcdFx0ZGlzcGxheTogJ25vbmUnXG5cdFx0XHRcdHBhZGRpbmc6ICcxMHB4IDE1cHgnXG5cdFx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdFx0Y29sb3I6ICcjZjc0NDI1J1xuXG5cdFx0XHRtZXRob2RzOlxuXHRcdFx0XHRzZXQ6IChtZXNzYWdlKS0+XG5cdFx0XHRcdFx0QGh0bWwgPSBtZXNzYWdlXG5cdFx0XHRcdFx0QHNob3coKVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGNsZWFyVGltZW91dChAX3RpbWVvdXQpXG5cdFx0XHRcdFx0QF90aW1lb3V0ID0gc2V0VGltZW91dCAoKT0+XG5cdFx0XHRcdFx0XHRAY2xlYXIoKVxuXHRcdFx0XHRcdCwgODAwMFxuXHRcdFx0XHRcblx0XHRcdFx0Y2xlYXI6ICgpLT5cblx0XHRcdFx0XHRAdGV4dCA9ICcnXG5cdFx0XHRcdFx0QGhpZGUoKVxuXHRcdF1cblx0XHRcblx0XHRidXR0b25fLmV4dGVuZChcblx0XHRcdHJlZjogJ2J1dHRvbl8nXG5cdFx0XHRbJ2Rpdidcblx0XHRcdFx0c3R5bGU6XG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiAnI2Q0ZDRkNCdcblx0XHRcdFx0XHQkaG92ZXI6XG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IChpKS0+IGkuc2V0dGluZ3MuYnV0dG9uLmJnQ29sb3Jcblx0XHRcdF1cblx0XHQpXG5cdF1cbilcblxuZXhwb3J0IHJlbW92ZUJ1dHRvbiA9IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAncmVtb3ZlQnV0dG9uJ1xuXHRcdHN0eWxlOlxuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZSdcblx0XHRcdHJpZ2h0OiAnOHB4J1xuXHRcdFx0dG9wOiAnNTUlJ1xuXHRcdFx0dHJhbnNmb3JtOiBcInRyYW5zbGF0ZSgwLCAtNTAlKVwiXG5cdFx0XHRmb250U2l6ZTogJzE3cHgnXG5cdFx0XHRsaW5lSGVpZ2h0OiAxXG5cdFx0XHRvcGFjaXR5OiAwLjRcblx0XHRcdGZvbnRXZWlnaHQ6IDYwMFxuXHQnw5cnXVxuKVxuXG5leHBvcnQgdGV4dCA9IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAndGV4dCdcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnXG5cdFx0XHR0b3A6ICc5cHgnXG5cdFx0XHRmb250U2l6ZTogJzEzLjJweCdcblx0XHRcdGxpbmVIZWlnaHQ6IDFcblxuXHRcdFsnc3Bhbidcblx0XHRcdHJlZjogJ2xhYmVsJ1xuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdGZvbnRXZWlnaHQ6IDYwMFxuXHRcdF1cblxuXHRcdFsnc3Bhbidcblx0XHRcdHJlZjogJ3ZhbHVlJ1xuXHRcdF1cblx0XVxuKVxuXG5leHBvcnQgY29udGVudCA9IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAndGFnQ29udGVudCdcblx0XHRzdHlsZTpcblx0XHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnXG5cdFx0XHRwYWRkaW5nOiAoaSktPiBcIiN7aS5zZXR0aW5ncy5wYWRkaW5nfXB4XCJcblx0XHRcdG1heFdpZHRoOiAoaSktPiBcIiN7aS5zZXR0aW5ncy5tYXhXaWR0aH1weFwiXG5cdF1cbilcblxuXG5leHBvcnQgZGVmYXVsdCBET00udGVtcGxhdGUoXG5cdFsnZGl2J1xuXHRcdHJlZjogJ3RhZydcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnXG5cdFx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuXHRcdFx0dmVydGljYWxBbGlnbjogJ3RvcCdcblx0XHRcdGhlaWdodDogJzI4cHgnXG5cdFx0XHRtYXJnaW5SaWdodDogJzEwcHgnXG5cdFx0XHRtYXJnaW5Cb3R0b206ICc2cHgnXG5cdFx0XHRwYWRkaW5nOiAnMCAyNXB4IDAgMTBweCdcblx0XHRcdGJvcmRlclJhZGl1czogJzRweCdcblx0XHRcdHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnXG5cdFx0XHRjdXJzb3I6ICdwb2ludGVyJ1xuXHRcdFx0dXNlclNlbGVjdDogJ25vbmUnXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICh0YWcpLT4gdGFnLnNldHRpbmdzLmJnQ29sb3Jcblx0XHRcdGNvbG9yOiAodGFnKS0+IHRhZy5zZXR0aW5ncy50ZXh0Q29sb3Jcblx0XHRcdGZvbnRGYW1pbHk6ICh0YWcpLT4gdGFnLnNldHRpbmdzLmZvbnRGYW1pbHlcblxuXHRcdHRleHRcblx0XHRyZW1vdmVCdXR0b25cblx0XVxuKVxuXG4iLCJleHBvcnQgc2V0dGluZ3MgPVxuXHRiZ0NvbG9yOiAnI2NjYydcblx0dGV4dENvbG9yOiAnIzE4MTgxOCdcblx0dXBkYXRlV2hlbjogJ2FwcGxpZWQnICMgfHwgJ2NoYW5nZWQnXG5cdGhpZGVMYWJlbDogZmFsc2Vcblx0cGFkZGluZzogMjBcblx0bWF4V2lkdGg6IDM1MFxuXG5cbmV4cG9ydCBvcHRpb24gPVxuXHRnZXR0ZXI6ICgpLT4gQGZpZWxkLnZhbHVlXG5cdHNldHRlcjogKHZhbHVlKS0+IEBmaWVsZC52YWx1ZSA9IHZhbHVlXG5cdHZhbGlkYXRlOiAodmFsdWUpLT4gdmFsdWU/XG5cblxuIiwiaW1wb3J0IGVycm9yRXggZnJvbSAnZXJyb3ItZXgnXG5cbmV4cG9ydCBWYWxpZGF0aW9uRXJyb3IgPSBlcnJvckV4KCdWYWxpZGF0aW9uRXJyb3InKVxuIiwiaW1wb3J0IERPTSBmcm9tICdxdWlja2RvbSdcbmltcG9ydCBleHRlbmQgZnJvbSAnc21hcnQtZXh0ZW5kJ1xuaW1wb3J0IFBvcHVwIGZyb20gJy4uL3BvcHVwJ1xuaW1wb3J0IHN0cmluZ2lmeSBmcm9tICcuL3N0cmluZ2lmeSdcbmltcG9ydCB1cGRhdGVyIGZyb20gJy4vdXBkYXRlcidcbmltcG9ydCB0ZW1wbGF0ZSwge2NvbnRlbnQsIGJ1dHRvbn0gZnJvbSAnLi90ZW1wbGF0ZSdcbmltcG9ydCAqIGFzIGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMnXG5pbXBvcnQge1ZhbGlkYXRpb25FcnJvcn0gZnJvbSAnLi4vZXJyb3JzJ1xuXG5jbGFzcyBUYWcgZXh0ZW5kcyByZXF1aXJlKCdldmVudC1saXRlJylcblx0Y29uc3RydWN0b3I6IChvcHRpb24sIGxpc3RTZXR0aW5ncyktPlxuXHRcdHN1cGVyKClcblx0XHRzZXR0aW5nczEgPSBleHRlbmQua2V5cyhbJ2J1dHRvbicsJ2ZvbnRGYW1pbHknXSkuY2xvbmUobGlzdFNldHRpbmdzKVxuXHRcdHNldHRpbmdzMiA9IGV4dGVuZC5rZXlzKFsncGFkZGluZycsICdtYXhXaWR0aCddKS5jbG9uZShvcHRpb24pXG5cdFx0QHNldHRpbmdzID0gZXh0ZW5kLmNsb25lKGRlZmF1bHRzLnNldHRpbmdzLCBsaXN0U2V0dGluZ3MudGFnLCBzZXR0aW5nczEsIHNldHRpbmdzMilcblx0XHRAb3B0aW9uID0gZXh0ZW5kLmNsb25lKGRlZmF1bHRzLm9wdGlvbiwgb3B0aW9uKVxuXHRcdEBvcHRpb24ucG9wdXAgPSBleHRlbmQuY2xvbmUobGlzdFNldHRpbmdzLnBvcHVwLCBAb3B0aW9uLnBvcHVwKVxuXHRcdEBzdGF0ZSA9IHt9XG5cdFx0QG5hbWUgPSBAb3B0aW9uLm5hbWVcblx0XHRAbGFiZWwgPSBAb3B0aW9uLmxhYmVsXG5cdFx0QGVsID0gdGVtcGxhdGUuc3Bhd24obnVsbCwgcmVsYXRlZEluc3RhbmNlOkApXG5cdFx0QGNvbnRlbnQgPSBjb250ZW50LnNwYXduKG51bGwsIHJlbGF0ZWRJbnN0YW5jZTpAKVxuXHRcdEBidXR0b24gPSBidXR0b24uc3Bhd24oe2RhdGE6dGV4dDonQXBwbHknfSwgcmVsYXRlZEluc3RhbmNlOkApXG5cdFx0QHBvcHVwID0gbmV3IFBvcHVwKEBlbCwgbGlzdFNldHRpbmdzLCBsaXN0U2V0dGluZ3MuYm91bmRpbmdFbClcblx0XHRAcG9wdXAuc2V0Q29udGVudChAY29udGVudClcblx0XHRAYnV0dG9uLmluc2VydEFmdGVyKEBjb250ZW50KSBpZiBAc2V0dGluZ3MudXBkYXRlV2hlbiBpcyAnYXBwbGllZCdcblxuXHRcdEBfc2V0dXAoKVxuXHRcdEBfYXR0YWNoQmluZGluZ3MoKVxuXHRcblxuXHRfc2V0dXA6ICgpLT5cblx0XHRpZiBAb3B0aW9uLmhpZGVMYWJlbFxuXHRcdFx0QGVscy5sYWJlbC5oaWRlKClcblx0XHRlbHNlXG5cdFx0XHRAZWxzLmxhYmVsLmh0bWwgPSBcIiN7QG9wdGlvbi5sYWJlbH06IFwiXG5cblx0X2F0dGFjaEJpbmRpbmdzOiAoKS0+XHRcdFxuXHRcdEBlbHMucmVtb3ZlQnV0dG9uLm9uICdjbGljaycsIChldmVudCk9PlxuXHRcdFx0QGVtaXQgJ3JlbW92ZSc7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cblx0XHRAZWwub24gJ2NsaWNrJywgKCk9PlxuXHRcdFx0QHBvcHVwLm9wZW4oKVxuXG5cdFx0QGJ1dHRvbi5vbiAnY2xpY2snLCAoZSk9PlxuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKVxuXHRcdFx0QHBvcHVwLmNsb3NlKCkgaWYgQF9hcHBseUNoYW5nZXMoKVxuXG5cdFx0aWYgQHNldHRpbmdzLnVwZGF0ZVdoZW4gaXMgJ2FwcGxpZWQnXG5cdFx0XHRAcG9wdXAub24gJ29wZW4nLCAoKT0+IEBzdGF0ZS52YWx1ZU9uRm9jdXMgPz0gQHZhbHVlXG5cdFx0XHRAcG9wdXAub24gJ2JsdXInLCAoKT0+IGlmIEB2YWx1ZSBpc250IEBzdGF0ZS52YWx1ZU9uRm9jdXNcblx0XHRcdFx0aWYgbm90IEBfYXBwbHlDaGFuZ2VzKClcblx0XHRcdFx0XHRjb25zb2xlLmxvZyAnb3BlbmluZydcblx0XHRcdFx0XHRAcG9wdXAub3BlbigpXG5cdFxuXHRfaW5pdEZpZWxkOiAoKS0+XG5cdFx0QGZpZWxkID0gQG9wdGlvbi5maWVsZC5jYWxsKEAsIEBjb250ZW50LnJhdywgdXBkYXRlcihAKSlcblx0XHRAc2V0KEBvcHRpb24uZGVmYXVsdCwgdHJ1ZSkgaWYgQG9wdGlvbi5kZWZhdWx0XG5cblx0X2RvbUluc2VydDogKG1ldGhvZCwgdGFyZ2V0KS0+XG5cdFx0QGVsW21ldGhvZF0odGFyZ2V0KVxuXHRcdEBfaW5pdEZpZWxkKClcblx0XHRyZXR1cm4gQFxuXG5cdF9ub3RpZnlDaGFuZ2U6ICgpLT5cblx0XHRAZW1pdCAnY2hhbmdlJywgQHZhbHVlXG5cblx0X3VwZGF0ZVRleHQ6ICh2YWx1ZSktPlxuXHRcdEBlbHMudmFsdWUudGV4dCA9IHN0cmluZ2lmeSh2YWx1ZSwgQG9wdGlvbi5mb3JtYXR0ZXIpXG5cblx0X3VwZGF0ZUZyb21Vc2VyOiAodmFsdWUsIFNJTEVOVCktPlxuXHRcdEBfdXBkYXRlVGV4dCh2YWx1ZSlcblx0XHRAb3B0aW9uLnNldHRlci5jYWxsKEAsIHZhbHVlKVxuXHRcdEBfbm90aWZ5Q2hhbmdlKCkgdW5sZXNzIFNJTEVOVFxuXG5cdF91cGRhdGVGcm9tRmllbGQ6ICh2YWx1ZSktPlxuXHRcdEBfdXBkYXRlVGV4dCh2YWx1ZSlcblx0XHRAX25vdGlmeUNoYW5nZSgpIHVubGVzcyBAc2V0dGluZ3MudXBkYXRlV2hlbiBpcyAnYXBwbGllZCdcblxuXHRfYXBwbHlDaGFuZ2VzOiAoKS0+XG5cdFx0dmFsaWRhdGlvbiA9IEB2YWxpZGF0ZSgpXG5cdFx0aWYgdmFsaWRhdGlvbiBpcyB0cnVlXG5cdFx0XHRAc3RhdGUudmFsdWVPbkZvY3VzID0gbnVsbFxuXHRcdFx0QF9ub3RpZnlDaGFuZ2UoKVxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHRcblx0XHRlbHNlIGlmIHZhbGlkYXRpb24gaW5zdGFuY2VvZiBFcnJvclxuXHRcdFx0QGJ1dHRvbi5jaGlsZC5lcnJvck1lc3NhZ2Uuc2V0KHZhbGlkYXRpb24ubWVzc2FnZSlcblx0XHRcdEBlbWl0ICdlcnJvcicsIHZhbGlkYXRpb25cblx0XHRcdHJldHVybiBmYWxzZVxuXG5cdGdldDogKHNraXBUcmFuc2Zvcm0pLT5cblx0XHR2YWx1ZSA9IEBvcHRpb24uZ2V0dGVyLmNhbGwoQClcblx0XHR2YWx1ZSA9IEBvcHRpb24udHJhbnNmb3JtT3V0cHV0KHZhbHVlKSBpZiBAb3B0aW9uLnRyYW5zZm9ybU91dHB1dCBhbmQgbm90IHNraXBUcmFuc2Zvcm1cblx0XHRyZXR1cm4gdmFsdWVcblx0XG5cdHNldDogKHZhbHVlLCBTSUxFTlQpLT5cblx0XHR2YWx1ZSA9IHZhbHVlKCkgaWYgdHlwZW9mIHZhbHVlIGlzICdmdW5jdGlvbidcblx0XHR2YWx1ZSA9IEBvcHRpb24udHJhbnNmb3JtSW5wdXQodmFsdWUpIGlmIEBvcHRpb24udHJhbnNmb3JtSW5wdXRcblx0XHRAX3VwZGF0ZUZyb21Vc2VyKHZhbHVlLCBTSUxFTlQpXG5cblx0dmFsaWRhdGU6ICgpLT5cblx0XHRyZXR1cm4gdHJ1ZSBpZiBub3QgQG9wdGlvbi52YWxpZGF0ZVxuXHRcdHRyeVxuXHRcdFx0cmVzdWx0ID0gQG9wdGlvbi52YWxpZGF0ZS5jYWxsKEAsIEB2YWx1ZSlcblx0XHRjYXRjaCBlcnJcblx0XHRcdHJlc3VsdCA9IGVyclxuXG5cdFx0c3dpdGNoXG5cdFx0XHR3aGVuIHJlc3VsdCBpcyB0cnVlIHRoZW4gdHJ1ZVxuXHRcdFx0d2hlbiByZXN1bHQgaXMgZmFsc2UgdGhlbiBuZXcgVmFsaWRhdGlvbkVycm9yKFwidmFsaWRhdGlvbiBmYWlsZWRcIilcblx0XHRcdHdoZW4gdHlwZW9mIHJlc3VsdCBpcyAnc3RyaW5nJyB0aGVuIG5ldyBWYWxpZGF0aW9uRXJyb3IocmVzdWx0KVxuXHRcdFx0d2hlbiByZXN1bHQgaW5zdGFuY2VvZiBFcnJvciB0aGVuIHJlc3VsdFxuXG5cdFxuXG5cdGFwcGVuZFRvOiAodGFyZ2V0KS0+IEBfZG9tSW5zZXJ0ICdhcHBlbmRUbycsIHRhcmdldFxuXHRwcmVwZW5kVG86ICh0YXJnZXQpLT4gQF9kb21JbnNlcnQgJ3ByZXBlbmRUbycsIHRhcmdldFxuXHRpbnNlcnRCZWZvcmU6ICh0YXJnZXQpLT4gQF9kb21JbnNlcnQgJ2luc2VydEJlZm9yZScsIHRhcmdldFxuXHRpbnNlcnRBZnRlcjogKHRhcmdldCktPiBAX2RvbUluc2VydCAnaW5zZXJ0QWZ0ZXInLCB0YXJnZXRcblx0XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMgQDo6LFxuXHRcdGVsczogZ2V0OiAoKS0+IEBlbC5jaGlsZFxuXHRcdHZhbHVlOiBnZXQ6ICgpLT4gQGdldCgpXG5cdFx0cmF3VmFsdWU6IGdldDogKCktPiBAZ2V0KHRydWUpXG5cblxuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBUYWciLCJleHBvcnRzLmFycm93RG93biA9IFwiXCJcIlxuXHRkYXRhOmltYWdlL3N2Zyt4bWw7dXRmODtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaWFYTnZMVGc0TlRrdE1TSS9QZ284SVMwdElFZGxibVZ5WVhSdmNqb2dRV1J2WW1VZ1NXeHNkWE4wY21GMGIzSWdNVGd1TVM0eExDQlRWa2NnUlhod2IzSjBJRkJzZFdjdFNXNGdMaUJUVmtjZ1ZtVnljMmx2YmpvZ05pNHdNQ0JDZFdsc1pDQXdLU0FnTFMwK0NqeHpkbWNnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUI0Yld4dWN6cDRiR2x1YXowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1UazVPUzk0YkdsdWF5SWdkbVZ5YzJsdmJqMGlNUzR4SWlCcFpEMGlRMkZ3WVY4eElpQjRQU0l3Y0hnaUlIazlJakJ3ZUNJZ2RtbGxkMEp2ZUQwaU1DQXdJRE13T1M0eE5UWWdNekE1TGpFMU5pSWdjM1I1YkdVOUltVnVZV0pzWlMxaVlXTnJaM0p2ZFc1a09tNWxkeUF3SURBZ016QTVMakUxTmlBek1Ea3VNVFUyT3lJZ2VHMXNPbk53WVdObFBTSndjbVZ6WlhKMlpTSWdkMmxrZEdnOUlqWTBjSGdpSUdobGFXZG9kRDBpTmpSd2VDSStDanhuUGdvSlBHYytDZ2tKUEhCdmJIbG5iMjRnY0c5cGJuUnpQU0l5T0RndU5EWXhMRFkwTGpreU9TQXhOVFF1TlRnNUxESXdNaTQzTmpZZ01qQXVOekl6TERZMExqazBJREFzT0RVdU1EY2dNVFUwTGpVNE9Td3lORFF1TWpJNElETXdPUzR4TlRZc09EVXVNRGNnSUNBaUlHWnBiR3c5SWlNd01EQXdNREFpTHo0S0NUd3ZaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhMM04yWno0S1xuXCJcIlwiXG5cbiMgZXhwb3J0cy5jaGVja21hcmsgPSBcIlwiXCJcbiMgXHRkYXRhOmltYWdlL3N2Zyt4bWw7dXRmODtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaWFYTnZMVGc0TlRrdE1TSS9QZ284SVMwdElFZGxibVZ5WVhSdmNqb2dRV1J2WW1VZ1NXeHNkWE4wY21GMGIzSWdNVFl1TUM0d0xDQlRWa2NnUlhod2IzSjBJRkJzZFdjdFNXNGdMaUJUVmtjZ1ZtVnljMmx2YmpvZ05pNHdNQ0JDZFdsc1pDQXdLU0FnTFMwK0Nqd2hSRTlEVkZsUVJTQnpkbWNnVUZWQ1RFbERJQ0l0THk5WE0wTXZMMFJVUkNCVFZrY2dNUzR4THk5RlRpSWdJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5MMGR5WVhCb2FXTnpMMU5XUnk4eExqRXZSRlJFTDNOMlp6RXhMbVIwWkNJK0NqeHpkbWNnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUI0Yld4dWN6cDRiR2x1YXowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1UazVPUzk0YkdsdWF5SWdkbVZ5YzJsdmJqMGlNUzR4SWlCcFpEMGlRMkZ3WVY4eElpQjRQU0l3Y0hnaUlIazlJakJ3ZUNJZ2QybGtkR2c5SWpZMGNIZ2lJR2hsYVdkb2REMGlOalJ3ZUNJZ2RtbGxkMEp2ZUQwaU1DQXdJRFl4TWk0d01EVWdOakV5TGpBd05TSWdjM1I1YkdVOUltVnVZV0pzWlMxaVlXTnJaM0p2ZFc1a09tNWxkeUF3SURBZ05qRXlMakF3TlNBMk1USXVNREExT3lJZ2VHMXNPbk53WVdObFBTSndjbVZ6WlhKMlpTSStDanhuUGdvSlBHY2dhV1E5SW5ScFkyc2lQZ29KQ1R4blBnb0pDUWs4Y0dGMGFDQmtQU0pOTlRrMUxqWXdNU3c0TVM0MU5UTmpMVEl4TGpnNU1pMHlNUzQ0T1RFdE5UY3VNell5TFRJeExqZzVNUzAzT1M0eU5UTXNNRXd4T0RNdU1ETXNOREUwTGpnM2JDMDRPQzQyTWprdE56WXVNVE16SUNBZ0lDQmpMVEl4TGpVNU1pMHlNUzQxT1RNdE5UWXVOVGsyTFRJeExqVTVNeTAzT0M0eU1EY3NNR010TWpFdU5Ua3lMREl4TGpVNU1pMHlNUzQxT1RJc05UWXVOakUwTERBc056Z3VNakEyYkRFek1pNDBNVElzTVRFekxqY3pNeUFnSUNBZ1l6SXhMalU1TWl3eU1TNDFPVE1zTlRZdU5UazJMREl4TGpVNU15dzNPQzR5TURjc01HTXlMakUyTnkweUxqRTJOaXd6TGprM09TMDBMalUzTml3MUxqY3hOaTAyTGprNE5XTXdMak14Tnkwd0xqSTVPU3d3TGpZM01pMHdMalV3TlN3d0xqazVMVEF1T0RBMGJETTJNaTR3T0RNdE16WXlMakV3TVNBZ0lDQWdRell4Tnk0ME56TXNNVE00TGpreE5DdzJNVGN1TkRjekxERXdNeTQwTWpVc05UazFMall3TVN3NE1TNDFOVE42SWlCbWFXeHNQU0lqTURBd01EQXdJaTgrQ2drSlBDOW5QZ29KUEM5blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p3dmMzWm5QZ289XG4jIFwiXCJcIiIsImltcG9ydCBET00gZnJvbSAncXVpY2tkb20nXG5pbXBvcnQgKiBhcyBTVkcgZnJvbSAnLi4vc3ZnJ1xuaW1wb3J0IHtidXR0b24gYXMgYnV0dG9uX30gZnJvbSAnLi4vcG9wdXAvdGVtcGxhdGUnXG5cbmV4cG9ydCBidXR0b24gPSBidXR0b25fLmV4dGVuZChcblx0WydkaXYnXG5cdFx0Y29tcHV0ZXJzOiBfaW5pdDogKCktPlxuXHRcdFx0QGFwcGx5RGF0YSB0ZXh0OlwiQWRkICN7QHJlbGF0ZWQuc2V0dGluZ3MuaXRlbUxhYmVsfVwiXG5cdF1cbilcblxuZXhwb3J0IGFycm93ID0gRE9NLnRlbXBsYXRlKFxuXHRbJ2Rpdidcblx0XHRyZWY6ICdhcnJvdydcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXG5cdFx0XHR6SW5kZXg6IDJcblx0XHRcdHJpZ2h0OiAnMTVweCdcblx0XHRcdHRvcDogJzU0JSdcblx0XHRcdHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUoMCwgLTUwJSlcIlxuXHRcdFx0d2lkdGg6ICcxN3B4J1xuXHRcdFx0aGVpZ2h0OiAnMTdweCdcblx0XHRcdGJhY2tncm91bmRTaXplOiAnMTAwJSdcblx0XHRcdGJhY2tncm91bmRJbWFnZTogXCJ1cmwoI3tTVkcuYXJyb3dEb3dufSlcIlxuXHRcdFx0b3BhY2l0eTogMC41XG5cdF1cbilcblxuZXhwb3J0IGZha2UgPSBET00udGVtcGxhdGUoXG5cdFsnZGl2J1xuXHRcdHJlZjogJ2Zha2UnXG5cdFx0c3R5bGU6XG5cdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJ1xuXHRcdFx0ekluZGV4OiAxXG5cdFx0XHRsZWZ0OiAwXG5cdFx0XHR0b3A6ICc1MyUnXG5cdFx0XHR0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDAsIC01MCUpXCJcblx0XHRcdGhlaWdodDogJzE2cHgnXG5cdFx0XHRwYWRkaW5nOiAnMCAxNXB4J1xuXHRcdFx0Zm9udFNpemU6ICcxNnB4J1xuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxXG5cdFx0XHR0ZXh0QWxpZ246ICdsZWZ0J1xuXHRcdFx0dXNlclNlbGVjdDogJ25vbmUnXG5cdFx0XHRib3hTaXppbmc6ICdib3JkZXItYm94J1xuXHRcdFx0Y29sb3I6ICcjMTgxODE4J1xuXHRcdFx0b3BhY2l0eTogMC42XG5cdFx0XHQkaGFzQ29udGVudDpcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRdXG4pXG5cbmV4cG9ydCBpbnB1dCA9IERPTS50ZW1wbGF0ZShcblx0WydzZWxlY3QnXG5cdFx0cmVmOiAnaW5wdXQnXG5cdFx0Zm9yY2VTdHlsZTogdHJ1ZVxuXHRcdHN0eWxlOlxuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZSdcblx0XHRcdHpJbmRleDogM1xuXHRcdFx0dG9wOiAwXG5cdFx0XHRsZWZ0OiAwXG5cdFx0XHR3aWR0aDogJzEwMCUnXG5cdFx0XHRoZWlnaHQ6ICcxMDAlJ1xuXHRcdFx0b3BhY2l0eTogMFxuXG5cdFx0Y29tcHV0ZXJzOiBfaW5pdDogKCktPlxuXHRcdFx0RE9NLm9wdGlvbihwcm9wczp7dmFsdWU6Jyd9LCBcIlNlbGVjdCAje0ByZWxhdGVkLnNldHRpbmdzLnRhZ0xhYmVsfVwiKS5hcHBlbmRUbyhAKVxuXG5cdFx0bWV0aG9kczpcblx0XHRcdGxhYmVsOiBnZXQ6ICgpLT5cblx0XHRcdFx0c2VsZWN0ZWQgPSBAcmF3LnNlbGVjdGVkSW5kZXggb3IgMFxuXHRcdFx0XHRyZXR1cm4gQHJhdy5vcHRpb25zW3NlbGVjdGVkXT8ubGFiZWxcblx0XHRcdFxuXHRcdFx0dmFsdWU6XG5cdFx0XHRcdGdldDogKCktPiBAcmF3LnZhbHVlXG5cdFx0XHRcdHNldDogKHZhbHVlKS0+IEByYXcudmFsdWUgPSB2YWx1ZVxuXHRdXG4pXG5cbmV4cG9ydCBmaWVsZCA9IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAnc2VsZWN0RmllbGQnXG5cdFx0c3R5bGU6XG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuXHRcdFx0IyB3aWR0aDogJzEwMCUnXG5cdFx0XHRtaW5XaWR0aDogMjMwXG5cdFx0XHRoZWlnaHQ6ICc1NXB4J1xuXHRcdFx0Ym9yZGVyQm90dG9tOiAnMXB4IHNvbGlkICNkZGQnXG5cblx0XHRhcnJvd1xuXHRcdGZha2Vcblx0XHRpbnB1dFxuXHRdXG4pXG5cblxuXG4iLCJpbXBvcnQgRE9NIGZyb20gJ3F1aWNrZG9tJ1xuaW1wb3J0ICogYXMgdGVtcGxhdGUgZnJvbSAnLi90ZW1wbGF0ZSdcblxuY2xhc3MgU2VsZWN0RmllbGQgZXh0ZW5kcyByZXF1aXJlKCdldmVudC1saXRlJylcblx0Y29uc3RydWN0b3I6IChAc2V0dGluZ3MpLT5cblx0XHRzdXBlcigpXG5cdFx0QGZpZWxkID0gdGVtcGxhdGUuZmllbGQuc3Bhd24obnVsbCwge3JlbGF0ZWRJbnN0YW5jZTpAfSlcblx0XHRAaW5wdXQgPSBAZmllbGQuY2hpbGQuaW5wdXRcblx0XHRAX2F0dGFjaEJpbmRpbmdzKClcblx0XHRAX3NldFVpTGFiZWwoQGxhYmVsKVxuXG5cdF9hdHRhY2hCaW5kaW5nczogKCktPlxuXHRcdEBmaWVsZC5vbiAnaW5wdXQnLCAoKT0+XG5cdFx0XHRAZW1pdCAnY2hhbmdlJywge0BsYWJlbCwgQHZhbHVlfVxuXG5cdFx0QG9uICdjaGFuZ2UnLCAoe2xhYmVsfSktPlxuXHRcdFx0QF9zZXRVaUxhYmVsKGxhYmVsKVxuXG5cdF9zZXRVaUxhYmVsOiAobGFiZWwpLT5cblx0XHRAZmllbGQuY2hpbGQuZmFrZS5odG1sID0gbGFiZWxcblxuXHRfc2V0VmFsdWU6ICh2YWx1ZSktPlxuXHRcdEBpbnB1dC52YWx1ZSA9IHZhbHVlXG5cdFx0QF9zZXRVaUxhYmVsKEBsYWJlbClcblxuXHRzZXRPcHRpb25zOiAob3B0aW9ucyktPlxuXHRcdHByZXZPcHRpb25zID0gQGlucHV0LmNoaWxkcmVuLnNsaWNlKDEpXG5cdFx0RE9NLmJhdGNoKHByZXZPcHRpb25zKS5yZW1vdmUoKSBpZiBwcmV2T3B0aW9ucy5sZW5ndGhcblxuXHRcdGZvciB7bmFtZSxsYWJlbH0gaW4gb3B0aW9uc1xuXHRcdFx0QGlucHV0LmFwcGVuZCBET00ub3B0aW9uKHtwcm9wczp2YWx1ZTpuYW1lfSwgbGFiZWwpXG5cdFx0cmV0dXJuXG5cblxuXHRpbnNlcnRCZWZvcmU6ICh0YXJnZXQpLT5cblx0XHRAZmllbGQuaW5zZXJ0QmVmb3JlKHRhcmdldClcblxuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIEA6Oixcblx0XHRsYWJlbDpcblx0XHRcdGdldDogKCktPiBAaW5wdXQubGFiZWxcblx0XHR2YWx1ZTpcblx0XHRcdGdldDogKCktPiBAaW5wdXQudmFsdWVcblx0XHRcdHNldDogKHZhbHVlKS0+IEBfc2V0VmFsdWUodmFsdWUpXG5cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0RmllbGQiLCJpbXBvcnQgZXh0ZW5kIGZyb20gJ3NtYXJ0LWV4dGVuZCdcbmltcG9ydCBTZWxlY3RGaWVsZCBmcm9tICcuLi9zZWxlY3RGaWVsZCdcbmltcG9ydCBUYWcgZnJvbSAnLi8nXG5pbXBvcnQgUG9wdXAgZnJvbSAnLi4vcG9wdXAnXG5pbXBvcnQgKiBhcyBkZWZhdWx0cyBmcm9tICcuL2RlZmF1bHRzJ1xuaW1wb3J0IHtjb250ZW50LCBidXR0b259IGZyb20gJy4vdGVtcGxhdGUnXG5cbmNsYXNzIEJ1ZmZlclRhZyBleHRlbmRzIHJlcXVpcmUoJ2V2ZW50LWxpdGUnKVxuXHRjb25zdHJ1Y3RvcjogKEBsaXN0KS0+XG5cdFx0c3VwZXIoKVxuXHRcdHtAc2V0dGluZ3N9ID0gQGxpc3Rcblx0XHRAY29udGVudCA9IGNvbnRlbnQuc3Bhd24obnVsbCwgcmVsYXRlZEluc3RhbmNlOkApXG5cdFx0QHN0YXRlID0ge31cblx0XHRAYXBwbHlCdXR0b24gPSBAYnV0dG9uID0gYnV0dG9uLnNwYXduKHtkYXRhOnRleHQ6XCJBZGQgI3tAc2V0dGluZ3MudGFnTGFiZWx9XCJ9LCByZWxhdGVkSW5zdGFuY2U6QClcblx0XHRAYWRkQnV0dG9uID0gQGxpc3QuZWxzLmFkZEJ1dHRvblxuXHRcdEBwb3B1cCA9IG5ldyBQb3B1cChAYWRkQnV0dG9uLCBAc2V0dGluZ3MsIEBzZXR0aW5ncy5ib3VuZGluZ0VsKVxuXHRcdEBzZWxlY3RGaWVsZCA9IG5ldyBTZWxlY3RGaWVsZChAc2V0dGluZ3MpXG5cdFx0XG5cdFx0QGNvbnRlbnRfID0gRE9NLmRpdihudWxsLCBAY29udGVudClcblx0XHRAc2VsZWN0RmllbGQuaW5zZXJ0QmVmb3JlKEBjb250ZW50KVxuXHRcdEBhcHBseUJ1dHRvbi5pbnNlcnRBZnRlcihAY29udGVudClcblx0XHRAcG9wdXAuc2V0Q29udGVudChAY29udGVudF8pXG5cdFx0QF9zZXR1cCgpXG5cblx0X3NldHVwOiAoKS0+XG5cdFx0QGFwcGx5QnV0dG9uLm9uICdjbGljaycsICgpPT5cblx0XHRcdEBfYXBwbHlDaGFuZ2VzKCkgaWYgQF92YWxpZGF0ZUhhc0ZpZWxkKClcblxuXHRcdEBhZGRCdXR0b24ub24gJ2NsaWNrJywgKCk9PlxuXHRcdFx0QHBvcHVwLm9wZW4oKVxuXG5cdFx0QHNlbGVjdEZpZWxkLm9uICdjaGFuZ2UnLCAoe3ZhbHVlfSk9PlxuXHRcdFx0QF9zZXRDdXJyZW50KHZhbHVlKVxuXG5cdF9zZXRDdXJyZW50OiAobmFtZSktPlxuXHRcdEBjb250ZW50LmVtcHR5KClcblx0XHRAb3B0aW9uID0gQGxpc3QuX2ZpbmRPcHRpb24obmFtZSlcblxuXHRcdGlmIEBvcHRpb25cblx0XHRcdEBvcHRpb24gPSBleHRlbmQuY2xvbmUoZGVmYXVsdHMub3B0aW9uLCBAb3B0aW9uKVxuXHRcdFx0QF9pbml0RmllbGQoKVxuXHRcdGVsc2Vcblx0XHRcdEBmaWVsZCA9IG51bGxcblxuXHRcdEBzZWxlY3RGaWVsZC52YWx1ZSA9IG5hbWUgdW5sZXNzIEBzZWxlY3RGaWVsZC52YWx1ZSBpcyBuYW1lXG5cblxuXHRfdmFsaWRhdGVIYXNGaWVsZDogKCktPlxuXHRcdGlmIEBmaWVsZFxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHRlbHNlXG5cdFx0XHRAYnV0dG9uLmNoaWxkLmVycm9yTWVzc2FnZS5zZXQoJ1lvdSBtdXN0IHNlbGVjdCBhIGZpZWxkIGZpcnN0Jylcblx0XHRcdHJldHVybiBmYWxzZVxuXG5cdF91cGRhdGVTZWxlY3RhYmxlOiAoKS0+XG5cdFx0aWYgQHNldHRpbmdzLnJlcGVhdGFibGVWYWx1ZXNcblx0XHRcdG9wdGlvbnMgPSBAbGlzdC5vcHRpb25zXG5cdFx0ZWxzZVxuXHRcdFx0b3B0aW9ucyA9IEBsaXN0Lm9wdGlvbnMuZmlsdGVyICh7bmFtZX0pPT4gQGxpc3QuX2ZpbmRUYWcobmFtZSlcblx0XHRcblx0XHRAc2VsZWN0RmllbGQuc2V0T3B0aW9ucyhvcHRpb25zKVxuXHRcblx0X25vdGlmeUNoYW5nZTogKCktPlxuXHRcdEBlbWl0ICdjaGFuZ2UnLCBAb3B0aW9uLCBAdmFsdWVcblx0XHRAX3Jlc2V0KClcblxuXHRfdXBkYXRlRnJvbVVzZXI6ICh2YWx1ZSktPlxuXHRcdEBvcHRpb24uc2V0dGVyLmNhbGwoQCwgdmFsdWUpXG5cblx0X3VwZGF0ZUZyb21GaWVsZDogKHZhbHVlKS0+XG5cdFx0O1xuXG5cdF9yZXNldDogKCktPlxuXHRcdEBfc2V0Q3VycmVudCgnJylcblx0XHRAcG9wdXAuY2xvc2UoKVxuXHRcblx0Z2V0OiBUYWc6OmdldFxuXHRzZXQ6IFRhZzo6c2V0XG5cdHZhbGlkYXRlOiBUYWc6OnZhbGlkYXRlXG5cdF9pbml0RmllbGQ6IFRhZzo6X2luaXRGaWVsZFxuXHRfYXBwbHlDaGFuZ2VzOiBUYWc6Ol9hcHBseUNoYW5nZXNcblx0XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIEA6Oixcblx0XHRlbHM6IGdldDogKCktPiBAZWwuY2hpbGRcblx0XHR2YWx1ZTogZ2V0OiAoKS0+IEBnZXQoKVxuXG5cbmV4cG9ydCBkZWZhdWx0IEJ1ZmZlclRhZyIsImV4cG9ydCB0b0FycmF5ID0gKG9iamVjdCktPlxuXHRpZiBBcnJheS5pc0FycmF5KG9iamVjdClcblx0XHRyZXR1cm4gb2JqZWN0XG5cdGVsc2Vcblx0XHR7bmFtZSx2YWx1ZX0gZm9yIG5hbWUsdmFsdWUgb2Ygb2JqZWN0XG5cbiIsImltcG9ydCBET00gZnJvbSAncXVpY2tkb20nXG5pbXBvcnQgZXh0ZW5kIGZyb20gJ3NtYXJ0LWV4dGVuZCdcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2RlZmF1bHRzJ1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vdGVtcGxhdGUnXG5pbXBvcnQgVGFnIGZyb20gJy4uL3RhZydcbmltcG9ydCBCdWZmZXJUYWcgZnJvbSAnLi4vdGFnL2J1ZmZlcidcbmltcG9ydCBQb3B1cCBmcm9tICcuLi9wb3B1cCdcbmltcG9ydCB7dG9BcnJheX0gZnJvbSAnLi4vaGVscGVycydcblxuY2xhc3MgVGFnTGlzdCBleHRlbmRzIHJlcXVpcmUoJ2V2ZW50LWxpdGUnKVxuXHRjb25zdHJ1Y3RvcjogKEB0YXJnZXRDb250YWluZXIsIEBvcHRpb25zPVtdLCBzZXR0aW5ncyktPlxuXHRcdHN1cGVyKClcblx0XHRAc2V0dGluZ3MgPSBleHRlbmQuZGVlcE9ubHkoJ2J1dHRvbicpLmNsb25lKGRlZmF1bHRzLCBzZXR0aW5ncylcblx0XHRAc2V0dGluZ3MuYm91bmRpbmdFbCA9IERPTShAc2V0dGluZ3MuYm91bmRpbmdFbClcblx0XHRAc2V0dGluZ3MuZGVmYXVsdHMgPSB0b0FycmF5KEBzZXR0aW5ncy5kZWZhdWx0cyBvciBbXSlcblx0XHRAdGFncyA9IFtdXG5cdFx0QGVsID0gdGVtcGxhdGUuc3Bhd24obnVsbCwgcmVsYXRlZEluc3RhbmNlOkApXG5cdFx0QGJ1ZmZlciA9IG5ldyBCdWZmZXJUYWcoQClcblx0XHRvcHRpb24ubmFtZSA/PSBvcHRpb24ubGFiZWwgZm9yIG9wdGlvbiBpbiBAb3B0aW9uc1xuXHRcdFxuXHRcdEBfYXBwbHlEZWZhdWx0cyhAc2V0dGluZ3MuZGVmYXVsdHMpXG5cdFx0QF9hdHRhY2hCaW5kaW5ncygpXG5cdFx0QGVsLmFwcGVuZFRvKEB0YXJnZXRDb250YWluZXIpXG5cdFx0QGJ1ZmZlci5fdXBkYXRlU2VsZWN0YWJsZSgpXG5cblxuXHRfYXR0YWNoQmluZGluZ3M6ICgpLT5cblx0XHRAYnVmZmVyLm9uICdjaGFuZ2UnLCAob3B0aW9uLCB2YWx1ZSk9PlxuXHRcdFx0QGFkZChvcHRpb24sIHZhbHVlKVxuXHRcdFx0QF9ub3RpZnlDaGFuZ2UoKVxuXHRcdFxuXHRcdEBidWZmZXIucG9wdXAub24gJ2JlZm9yZW9wZW4nLCAoKT0+XG5cdFx0XHRAY2xvc2VBbGxQb3B1cHMoKVxuXHRcdFxuXHRcdEBvbiAnY2hhbmdlJywgKCk9PlxuXHRcdFx0QGJ1ZmZlci5fdXBkYXRlU2VsZWN0YWJsZSgpXG5cblx0XHRpZiBAc2V0dGluZ3Mub25DaGFuZ2Vcblx0XHRcdEBvbiAnY2hhbmdlJywgQHNldHRpbmdzLm9uQ2hhbmdlXG5cblx0XG5cdF9hcHBseURlZmF1bHRzOiAoZGVmYXVsdHMpLT5cblx0XHRkZWZhdWx0cyA9IHRvQXJyYXkoZGVmYXVsdHMpXG5cblx0XHRmb3Ige25hbWUsIHZhbHVlfSBpbiBkZWZhdWx0cyB3aGVuIHZhbHVlXG5cdFx0XHRvcHRpb24gPSBAX2ZpbmRPcHRpb24obmFtZSlcblx0XHRcdHZhbHVlID0gdmFsdWUoKSBpZiB0eXBlb2YgdmFsdWUgaXMgJ2Z1bmN0aW9uJ1xuXHRcdFx0QGFkZChvcHRpb24sIHZhbHVlKVxuXHRcdHJldHVyblxuXG5cdF9ub3RpZnlDaGFuZ2U6IChTSUxFTlQpLT4gdW5sZXNzIFNJTEVOVFxuXHRcdEBlbWl0ICdjaGFuZ2UnLCBAZ2V0VmFsdWVzKHRydWUpXG5cblx0X2ZpbmRPcHRpb246IChuYW1lLCBjb2xsZWN0aW9uPUBvcHRpb25zKS0+XG5cdFx0cmV0dXJuIGNvbGxlY3Rpb24uZmluZCAob3B0aW9uKS0+IG9wdGlvbi5uYW1lIGlzIG5hbWVcblx0XG5cdF9maW5kVGFnOiAobmFtZSwgY29sbGVjdGlvbj1AdGFncyktPlxuXHRcdHJldHVybiBjb2xsZWN0aW9uLmZpbmQgKHRhZyktPiB0YWcubmFtZSBpcyBuYW1lXG5cdFxuXHRfZmluZERlZmF1bHQ6IChuYW1lKS0+XG5cdFx0cmV0dXJuIEBzZXR0aW5ncy5kZWZhdWx0cy5maW5kIChkZWZhdWx0XyktPiBkZWZhdWx0Xy5uYW1lIGlzIG5hbWVcblxuXHRhZGRPcHRpb246IChvcHRpb24pLT5cblx0XHR1bmxlc3MgQF9maW5kT3B0aW9uKG9wdGlvbi5uYW1lKVxuXHRcdFx0QG9wdGlvbnMucHVzaChvcHRpb24pXG5cblx0YWRkOiAob3B0aW9uLCB2YWx1ZSktPlxuXHRcdG9wdGlvbiA9IEBfZmluZE9wdGlvbihvcHRpb24pIGlmIHR5cGVvZiBvcHRpb24gaXMgJ3N0cmluZydcblx0XHR0YWcgPSBuZXcgVGFnKG9wdGlvbiwgQHNldHRpbmdzKVxuXG5cdFx0dGFnLmluc2VydEJlZm9yZSBAZWxzLmFkZEJ1dHRvblxuXHRcdHRhZy5zZXQodmFsdWUsIHRydWUpIGlmIHZhbHVlP1xuXHRcdHRhZy5vbmNlICdyZW1vdmUnLCAoKT0+IEByZW1vdmUodGFnKVxuXHRcdHRhZy5vbiAnY2hhbmdlJywgKCk9PiBAX25vdGlmeUNoYW5nZSgpXG5cdFx0dGFnLnBvcHVwLm9uICdiZWZvcmVvcGVuJywgKCk9PiBAY2xvc2VBbGxQb3B1cHMoKVxuXHRcdFxuXHRcdEB0YWdzLnB1c2godGFnKVxuXG5cdHJlbW92ZTogKHRhZywgU0lMRU5UKS0+XG5cdFx0dGFnID0gQHRhZ3NCeU5hbWVbdGFnXSBpZiB0eXBlb2YgdGFnIGlzICdzdHJpbmcnXG5cdFx0dGFnLnBvcHVwLmNsb3NlKClcblx0XHR0YWdJbmRleCA9IEB0YWdzLmluZGV4T2YodGFnKVxuXG5cdFx0aWYgQHNldHRpbmdzLnJlcXVpcmVEZWZhdWx0cyBhbmQgQF9maW5kRGVmYXVsdCh0YWcubmFtZSlcblx0XHRcdHRhZy5zZXQoQF9maW5kRGVmYXVsdCh0YWcubmFtZSksIHRydWUpXG5cdFx0XHRAdGFncy5zcGxpY2UgdGFnSW5kZXgsIDEsIHRhZ1xuXHRcdGVsc2Vcblx0XHRcdHRhZy5lbC5yZW1vdmUoKVxuXHRcdFx0QHRhZ3Muc3BsaWNlIHRhZ0luZGV4LCAxXG5cblx0XHRAX25vdGlmeUNoYW5nZShTSUxFTlQpXG5cdFx0cmV0dXJuXG5cblx0cmVtb3ZlQWxsOiAoU0lMRU5UKS0+XG5cdFx0QHJlbW92ZSh0YWcsIHRydWUpIGZvciB0YWcgaW4gQHRhZ3Muc2xpY2UoKVxuXHRcdEBfbm90aWZ5Q2hhbmdlKFNJTEVOVClcblx0XHRyZXR1cm5cblxuXHRzZXRWYWx1ZXM6ICh2YWx1ZXMsIFNJTEVOVCktPlx0XHRcblx0XHRmb3Ige25hbWUsdmFsdWV9LGluZGV4IGluIHRvQXJyYXkodmFsdWVzKVxuXHRcdFx0QHNldFZhbHVlKG5hbWUsIHZhbHVlLCB0cnVlLCBpbmRleClcblx0XHRcblx0XHRAX25vdGlmeUNoYW5nZShTSUxFTlQpXG5cblx0c2V0VmFsdWU6IChuYW1lLCB2YWx1ZSwgU0lMRU5ULCBmcm9tSW5kZXgpLT5cblx0XHRjb2xsZWN0aW9uID0gaWYgZnJvbUluZGV4IHRoZW4gQHRhZ3Muc2xpY2UoZnJvbUluZGV4KSBlbHNlIEB0YWdzXG5cdFx0ZXhpc3RpbmcgPSBAX2ZpbmRUYWcobmFtZSwgY29sbGVjdGlvbilcblx0XHRcblx0XHRpZiBleGlzdGluZ1xuXHRcdFx0ZXhpc3Rpbmcuc2V0KHZhbHVlLCB0cnVlKVxuXHRcdFxuXHRcdGVsc2UgaWYgQF9maW5kT3B0aW9uKG5hbWUpXG5cdFx0XHRAYWRkKG5hbWUsIHZhbHVlKVxuXG5cdFx0QF9ub3RpZnlDaGFuZ2UoU0lMRU5UKVxuXG5cdHJlcGxhY2VWYWx1ZXM6ICh2YWx1ZXMsIFNJTEVOVCktPlxuXHRcdEByZW1vdmVBbGwodHJ1ZSlcblx0XHRAc2V0VmFsdWVzKHZhbHVlcywgdHJ1ZSlcblx0XHRAX25vdGlmeUNoYW5nZShTSUxFTlQpXG5cblx0Z2V0VmFsdWVzOiAoKS0+XG5cdFx0QHRhZ3MubWFwICh0YWcpLT5cblx0XHRcdG5hbWU6IHRhZy5uYW1lXG5cdFx0XHR2YWx1ZTogdGFnLnZhbHVlXG5cblxuXHRjbG9zZUFsbFBvcHVwczogKCktPlxuXHRcdEBidWZmZXIucG9wdXAuY2xvc2UoKVxuXHRcdHRhZy5wb3B1cC5jbG9zZSgpIGZvciB0YWcgaW4gQHRhZ3Ncblx0XHRyZXR1cm5cblxuXHRkZXN0cm95OiAoKS0+XG5cdFx0QGNsb3NlQWxsUG9wdXBzKClcblx0XHRAZWwucmVtb3ZlKClcblx0XHRAZW1pdCAnZGVzdHJveSdcblx0XHRyZXR1cm5cblx0XG5cblxuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIEA6Oixcblx0XHQnZWxzJzogZ2V0OiAoKS0+IEBlbC5jaGlsZFxuXHRcdCd0YWdzQnlOYW1lJzogZ2V0OiAoKS0+XG5cdFx0XHR0YWdzID0gQHRhZ3Ncblx0XHRcdG5ldyAoKS0+IEBbdGFnLm5hbWVdID0gdGFnIGZvciB0YWcgaW4gdGFnczsgQFxuXG5cblxuZXhwb3J0IGRlZmF1bHQgVGFnTGlzdCJdLCJuYW1lcyI6WyJib3VuZGluZ0VsIiwiZG9jdW1lbnQiLCJib2R5IiwidGFnTGFiZWwiLCJyZXF1aXJlRGVmYXVsdHMiLCJ0ZW1wbGF0ZXMiLCJkZWZhdWx0cyIsInRhZ3MiLCJmb250RmFtaWx5IiwiYnV0dG9uIiwiYmdDb2xvciIsInRleHRDb2xvciIsImFkZEJ1dHRvbiIsIkRPTSIsInRlbXBsYXRlIiwicmVmIiwic3R5bGUiLCJwb3NpdGlvbiIsImRpc3BsYXkiLCJ2ZXJ0aWNhbEFsaWduIiwiaGVpZ2h0Iiwid2lkdGgiLCJib3hTaXppbmciLCJib3JkZXIiLCJib3JkZXJSYWRpdXMiLCJjdXJzb3IiLCJ1c2VyU2VsZWN0Iiwib3BhY2l0eSIsImNvbG9yIiwibGVmdCIsInJpZ2h0IiwidG9wIiwidHJhbnNmb3JtIiwibGluZUhlaWdodCIsInRleHRBbGlnbiIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsInRhZ2xpc3QiLCJzZXR0aW5ncyIsImJhY2tncm91bmRDb2xvciIsImkiLCJjb21wdXRlcnMiLCJ0ZXh0VHJhbnNmb3JtIiwibGV0dGVyU3BhY2luZyIsInRleHQiLCJzaXplIiwiZm9udCIsInpJbmRleCIsImJveFNoYWRvdyIsInBvcHVwIiwiUG9wdXAiLCJyZXF1aXJlIiwiY29uc3RydWN0b3IiLCJwYXJlbnQiLCJzdGF0ZSIsIm9wZW4iLCJlbCIsInNwYXduIiwicmVsYXRlZEluc3RhbmNlIiwiaGlkZSIsImFwcGVuZFRvIiwicG9wcGVyIiwiUG9wcGVyIiwicGxhY2VtZW50IiwidHJpZ2dlciIsIm1vZGlmaWVycyIsIm9mZnNldCIsImVuYWJsZWQiLCJwcmV2ZW50T3ZlcmZsb3ciLCJib3VuZHJpZXNFbGVtZW50IiwiX2F0dGFjaE91dGVyQ2xpY2tMaXN0ZW5lciIsIm9uIiwiZXZlbnQiLCJ0YXJnZXRQYXJlbnRzIiwidGFyZ2V0IiwicGFyZW50cyIsImluY2x1ZGVzIiwiY2xvc2UiLCJlbWl0IiwiX2RldGFjaE91dGVyQ2xpY2tMaXN0ZW5lciIsIm9mZiIsInNob3ciLCJ1cGRhdGUiLCJzZXRDb250ZW50IiwiY29udGVudCIsImVscyIsImVtcHR5IiwiYXBwZW5kIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydGllcyIsInByb3RvdHlwZSIsImdldCIsImNoaWxkIiwidmFsdWUiLCJmb3JtYXR0ZXIiLCJhbGlhcyIsIkFycmF5IiwiaXNBcnJheSIsImZpbmQiLCJjYW5kaWRhdGUiLCJsYWJlbCIsIm5hbWUiLCJ0YWciLCJ1cGRhdGVyIiwibmV3VmFsdWUiLCJfdXBkYXRlRnJvbUZpZWxkIiwicGFkZGluZyIsIm1ldGhvZHMiLCJzZXQiLCJtZXNzYWdlIiwiaHRtbCIsImNsZWFyVGltZW91dCIsIl90aW1lb3V0Iiwic2V0VGltZW91dCIsImNsZWFyIiwiYnV0dG9uXyIsImV4dGVuZCIsIiRob3ZlciIsInJlbW92ZUJ1dHRvbiIsIm1heFdpZHRoIiwibWFyZ2luUmlnaHQiLCJtYXJnaW5Cb3R0b20iLCJ1cGRhdGVXaGVuIiwiaGlkZUxhYmVsIiwib3B0aW9uIiwiZ2V0dGVyIiwiZmllbGQiLCJzZXR0ZXIiLCJ2YWxpZGF0ZSIsIlZhbGlkYXRpb25FcnJvciIsImVycm9yRXgiLCJUYWciLCJsaXN0U2V0dGluZ3MiLCJzZXR0aW5nczEiLCJzZXR0aW5nczIiLCJrZXlzIiwiY2xvbmUiLCJkYXRhIiwiaW5zZXJ0QWZ0ZXIiLCJfc2V0dXAiLCJfYXR0YWNoQmluZGluZ3MiLCJzdG9wUHJvcGFnYXRpb24iLCJlIiwiX2FwcGx5Q2hhbmdlcyIsImJhc2UiLCJ2YWx1ZU9uRm9jdXMiLCJjb25zb2xlIiwibG9nIiwiX2luaXRGaWVsZCIsImNhbGwiLCJyYXciLCJkZWZhdWx0IiwiX2RvbUluc2VydCIsIm1ldGhvZCIsIl9ub3RpZnlDaGFuZ2UiLCJfdXBkYXRlVGV4dCIsInN0cmluZ2lmeSIsIl91cGRhdGVGcm9tVXNlciIsIlNJTEVOVCIsInZhbGlkYXRpb24iLCJFcnJvciIsImVycm9yTWVzc2FnZSIsInNraXBUcmFuc2Zvcm0iLCJ0cmFuc2Zvcm1PdXRwdXQiLCJ0cmFuc2Zvcm1JbnB1dCIsImVyciIsInJlc3VsdCIsInByZXBlbmRUbyIsImluc2VydEJlZm9yZSIsInJhd1ZhbHVlIiwiX2luaXQiLCJhcHBseURhdGEiLCJyZWxhdGVkIiwiaXRlbUxhYmVsIiwiYXJyb3ciLCJiYWNrZ3JvdW5kU2l6ZSIsImJhY2tncm91bmRJbWFnZSIsIlNWRyIsImZha2UiLCIkaGFzQ29udGVudCIsImlucHV0IiwiZm9yY2VTdHlsZSIsInByb3BzIiwic2VsZWN0ZWQiLCJzZWxlY3RlZEluZGV4IiwibWluV2lkdGgiLCJib3JkZXJCb3R0b20iLCJTZWxlY3RGaWVsZCIsIl9zZXRVaUxhYmVsIiwiX3NldFZhbHVlIiwic2V0T3B0aW9ucyIsIm9wdGlvbnMiLCJsZW4iLCJwcmV2T3B0aW9ucyIsImNoaWxkcmVuIiwic2xpY2UiLCJsZW5ndGgiLCJiYXRjaCIsInJlbW92ZSIsIkJ1ZmZlclRhZyIsImxpc3QiLCJhcHBseUJ1dHRvbiIsInNlbGVjdEZpZWxkIiwiY29udGVudF8iLCJkaXYiLCJfdmFsaWRhdGVIYXNGaWVsZCIsIl9zZXRDdXJyZW50IiwiX2ZpbmRPcHRpb24iLCJfdXBkYXRlU2VsZWN0YWJsZSIsInJlcGVhdGFibGVWYWx1ZXMiLCJmaWx0ZXIiLCJfZmluZFRhZyIsIl9yZXNldCIsInRvQXJyYXkiLCJvYmplY3QiLCJyZXN1bHRzIiwiVGFnTGlzdCIsInRhcmdldENvbnRhaW5lciIsImRlZXBPbmx5IiwiYnVmZmVyIiwiX2FwcGx5RGVmYXVsdHMiLCJhZGQiLCJjbG9zZUFsbFBvcHVwcyIsIm9uQ2hhbmdlIiwiZ2V0VmFsdWVzIiwiY29sbGVjdGlvbiIsIl9maW5kRGVmYXVsdCIsImRlZmF1bHRfIiwiYWRkT3B0aW9uIiwicHVzaCIsIm9uY2UiLCJ0YWdJbmRleCIsInRhZ3NCeU5hbWUiLCJpbmRleE9mIiwic3BsaWNlIiwicmVtb3ZlQWxsIiwic2V0VmFsdWVzIiwidmFsdWVzIiwiaW5kZXgiLCJzZXRWYWx1ZSIsImZyb21JbmRleCIsImV4aXN0aW5nIiwicmVwbGFjZVZhbHVlcyIsIm1hcCIsImRlc3Ryb3kiXSwibWFwcGluZ3MiOiI4ckJBQUEsZUFDQztFQUFBQSxVQUFBLEVBQVlDLFFBQVEsQ0FBQ0MsSUFBckI7RUFDQUMsUUFBQSxFQUFVLFFBRFY7RUFFQUMsZUFBQSxFQUFpQixLQUZqQjtFQUdBQyxTQUFBLEVBQVcsSUFIWDtFQUlBQyxRQUFBLEVBQVUsSUFKVjtFQUtBQyxJQUFBLEVBQU0sSUFMTjtFQU1BQyxVQUFBLEVBQVksU0FOWjtFQU9BQyxNQUFBLEVBQ0M7SUFBQUMsT0FBQSxFQUFTLFNBQVQ7SUFDQUMsU0FBQSxFQUFXOztDQVZiLENDRUEsSUFBT0MsU0FBUCxHQUFtQkMsS0FBRyxDQUFDQyxRQUFKLENBQ2xCLENBQUMsS0FBRCxFQUNDO0VBQUFDLEdBQUEsRUFBSyxXQUFMO0VBQ0FDLEtBQUEsRUFDQztJQUFBQyxRQUFBLEVBQVUsVUFBVjtJQUNBQyxPQUFBLEVBQVMsY0FEVDtJQUVBQyxhQUFBLEVBQWUsS0FGZjtJQUdBQyxNQUFBLEVBQVEsTUFIUjtJQUlBQyxLQUFBLEVBQU8sTUFKUDtJQUtBQyxTQUFBLEVBQVc7O0NBUmIsRUFVQyxDQUFDLEtBQUQsRUFDQztFQUFBTixLQUFB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
