(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports,require('quickdom'),require('popper.js'),require('error-ex')):typeof define==='function'&&define.amd?define(['exports','quickdom','popper.js','error-ex'],f):(g=g||self,f(g.taglist={},g.DOM$1,g.Popper,g.errorEx));}(this,function(exports, DOM$1, Popper, errorEx){'use strict';DOM$1=DOM$1&&DOM$1.hasOwnProperty('default')?DOM$1['default']:DOM$1;Popper=Popper&&Popper.hasOwnProperty('default')?Popper['default']:Popper;errorEx=errorEx&&errorEx.hasOwnProperty('default')?errorEx['default']:errorEx;var defaults = {
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
};var ValidationError = errorEx('ValidationError');var arrowDown = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMwOS4xNTYgMzA5LjE1NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzA5LjE1NiAzMDkuMTU2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPGc+CgkJPHBvbHlnb24gcG9pbnRzPSIyODguNDYxLDY0LjkyOSAxNTQuNTg5LDIwMi43NjYgMjAuNzIzLDY0Ljk0IDAsODUuMDcgMTU0LjU4OSwyNDQuMjI4IDMwOS4xNTYsODUuMDcgICAiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"; // exports.checkmark = """
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

var BufferTag$1 = BufferTag;var Tag;

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

var Tag$1 = Tag;var toArray = function (object) {
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

var extend = TagList;var version = "3.0.1";exports.Popup=Popup$1;exports.Tag=Tag$1;exports.default=extend;exports.version=version;Object.defineProperty(exports,'__esModule',{value:true});}));//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnbGlzdC5kZWJ1Zy5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL3RhZ2xpc3QvZGVmYXVsdHMuY29mZmVlIiwiLi4vc3JjL3RhZ2xpc3QvdGVtcGxhdGUuY29mZmVlIiwiLi4vc3JjL3BvcHVwL3RlbXBsYXRlLmNvZmZlZSIsIi4uL3NyYy9wb3B1cC9pbmRleC5jb2ZmZWUiLCIuLi9zcmMvdGFnL3N0cmluZ2lmeS5jb2ZmZWUiLCIuLi9zcmMvdGFnL3VwZGF0ZXIuY29mZmVlIiwiLi4vc3JjL3RhZy90ZW1wbGF0ZS5jb2ZmZWUiLCIuLi9zcmMvdGFnL2RlZmF1bHRzLmNvZmZlZSIsIi4uL3NyYy9lcnJvcnMuY29mZmVlIiwiLi4vc3JjL3N2Zy5jb2ZmZWUiLCIuLi9zcmMvc2VsZWN0RmllbGQvdGVtcGxhdGUuY29mZmVlIiwiLi4vc3JjL3NlbGVjdEZpZWxkL2luZGV4LmNvZmZlZSIsIi4uL3NyYy90YWcvYnVmZmVyLmNvZmZlZSIsIi4uL3NyYy90YWcvaW5kZXguY29mZmVlIiwiLi4vc3JjL2hlbHBlcnMuY29mZmVlIiwiLi4vc3JjL3RhZ2xpc3QvaW5kZXguY29mZmVlIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0XG5cdGJvdW5kaW5nRWw6IGRvY3VtZW50LmJvZHlcblx0dGFnTGFiZWw6ICdPcHRpb24nXG5cdHJlcXVpcmVEZWZhdWx0czogZmFsc2Vcblx0dGVtcGxhdGVzOiBudWxsXG5cdGRlZmF1bHRzOiBudWxsXG5cdHRhZ3M6IG51bGxcblx0Zm9udEZhbWlseTogJ2luaGVyaXQnXG5cdGJ1dHRvbjpcblx0XHRiZ0NvbG9yOiAnI2Y3NDQyNSdcblx0XHR0ZXh0Q29sb3I6ICcjZmZmJyIsImltcG9ydCBET00gZnJvbSAncXVpY2tkb20nXG5cbmV4cG9ydCBhZGRCdXR0b24gPSBET00udGVtcGxhdGUoXG5cdFsnZGl2J1xuXHRcdHJlZjogJ2FkZEJ1dHRvbidcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnXG5cdFx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuXHRcdFx0dmVydGljYWxBbGlnbjogJ3RvcCdcblx0XHRcdGhlaWdodDogJzI4cHgnXG5cdFx0XHR3aWR0aDogJzI4cHgnXG5cdFx0XHRib3hTaXppbmc6ICdib3JkZXItYm94J1xuXG5cdFx0WydkaXYnXG5cdFx0XHRzdHlsZTogXG5cdFx0XHRcdCMgZGlzcGxheTogJ2lubGluZS1ibG9jaydcblx0XHRcdFx0IyB2ZXJ0aWNhbEFsaWduOiAndG9wJ1xuXHRcdFx0XHRoZWlnaHQ6ICcxMDAlJ1xuXHRcdFx0XHR3aWR0aDogJzEwMCUnXG5cdFx0XHRcdGJvcmRlcjogJzJweCBkYXNoZWQnXG5cdFx0XHRcdGJvcmRlclJhZGl1czogJzVweCdcblx0XHRcdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCdcblx0XHRcdFx0Y3Vyc29yOiAncG9pbnRlcidcblx0XHRcdFx0dXNlclNlbGVjdDogJ25vbmUnXG5cdFx0XHRcdG9wYWNpdHk6IDAuMzVcblx0XHRcdFx0Y29sb3I6ICcjMTgxODE4J1xuXHRcdFx0XG5cdFx0XHRbJ2Rpdidcblx0XHRcdFx0cmVmOiAnVGFnTGlzdEJ1dHRvblRleHQnXG5cdFx0XHRcdHN0eWxlOlxuXHRcdFx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXG5cdFx0XHRcdFx0bGVmdDogMFxuXHRcdFx0XHRcdHJpZ2h0OiAwXG5cdFx0XHRcdFx0dG9wOiAnNTUlJ1xuXHRcdFx0XHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwLCAtNTAlKSdcblx0XHRcdFx0XHR3aWR0aDogJzEwMCUnXG5cdFx0XHRcdFx0bGluZUhlaWdodDogMVxuXHRcdFx0XHRcdHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRcdFx0XHRmb250U2l6ZTogJzIzcHgnXG5cdFx0XHRcdFx0Zm9udFdlaWdodDogNjAwXG5cdFx0XHQnKyddXG5cdFx0XVxuXG5cdF1cbilcblxuXG5cbmV4cG9ydCBkZWZhdWx0IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAnVGFnTGlzdCdcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnXG5cdFx0XHR0ZXh0QWxpZ246ICdsZWZ0J1xuXHRcdFx0Zm9udEZhbWlseTogKHRhZ2xpc3QpLT4gdGFnbGlzdC5zZXR0aW5ncy5mb250RmFtaWx5XG5cblx0XHRhZGRCdXR0b25cblx0XVxuKVxuXG4iLCJpbXBvcnQgRE9NIGZyb20gJ3F1aWNrZG9tJ1xuXG5leHBvcnQgYnV0dG9uID0gRE9NLnRlbXBsYXRlKFxuXHRbJ2Rpdidcblx0XHRyZWY6ICdidXR0b24nXG5cdFx0c3R5bGU6XG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuXHRcdFx0aGVpZ2h0OiA1MFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAnMCAwIDVweCA1cHgnXG5cdFx0XHRib3hTaXppbmc6ICdib3JkZXItYm94J1xuXHRcdFx0Y3Vyc29yOiAncG9pbnRlcidcblx0XHRcdHVzZXJTZWxlY3Q6ICdub25lJ1xuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAoaSktPiBpLnNldHRpbmdzLmJ1dHRvbi5iZ0NvbG9yXG5cdFx0XHRjb2xvcjogKGkpLT4gaS5zZXR0aW5ncy5idXR0b24udGV4dENvbG9yXG5cdFx0Y29tcHV0ZXJzOlxuXHRcdFx0aGVpZ2h0OiAoaGVpZ2h0KS0+IEBzdHlsZSB7aGVpZ2h0fVxuXG5cblx0XHRbJ2Rpdidcblx0XHRcdHJlZjogJ2J1dHRvblRleHQnXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZSdcblx0XHRcdFx0dG9wOiAnNTMlJ1xuXHRcdFx0XHR0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDAsIC01MCUpXCJcblx0XHRcdFx0ZGlzcGxheTogJ2Jsb2NrJ1xuXHRcdFx0XHR3aWR0aDogJzEwMCUnXG5cdFx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0XHRsaW5lSGVpZ2h0OiAxXG5cdFx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0XHR0ZXh0QWxpZ246ICdjZW50ZXInXG5cdFx0XHRcdHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnXG5cdFx0XHRcdGxldHRlclNwYWNpbmc6ICcxLjVweCdcblx0XHRcdGNvbXB1dGVyczpcblx0XHRcdFx0dGV4dDogKHRleHQpLT4gQHRleHQgPSB0ZXh0XG5cdFx0XHRcdHNpemU6IChmb250U2l6ZSktPiBAc3R5bGUge2ZvbnRTaXplfVxuXHRcdFx0XHRmb250OiAoZm9udEZhbWlseSktPiBAc3R5bGUge2ZvbnRGYW1pbHl9XG5cdFx0XVxuXHRdXG4pXG5cbmV4cG9ydCBkZWZhdWx0IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAnVGFnTGlzdC1Qb3B1cCdcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnXG5cdFx0XHR6SW5kZXg6IDIwMDFcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3doaXRlJ1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiAnNXB4J1xuXHRcdFx0Ym94U2hhZG93OiAnMHB4IDNweCAxOHB4IHJnYmEoMCwwLDAsMC4yNCknXG5cdFx0XHRib3hTaXppbmc6ICdib3JkZXItYm94J1xuXHRcdFx0Zm9udEZhbWlseTogKHBvcHVwKS0+IHBvcHVwLnNldHRpbmdzLmZvbnRGYW1pbHlcblx0XHRcblx0XHRbJ2Rpdidcblx0XHRcdHJlZjogJ2NvbnRlbnQnXG5cdFx0XVxuXHRdXG4pXG5cblxuIiwiaW1wb3J0IFBvcHBlciBmcm9tICdwb3BwZXIuanMnXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi90ZW1wbGF0ZSdcbmltcG9ydCBET00gZnJvbSAncXVpY2tkb20nXG5cbmNsYXNzIFBvcHVwIGV4dGVuZHMgcmVxdWlyZSgnZXZlbnQtbGl0ZScpXG5cdGNvbnN0cnVjdG9yOiAoQHBhcmVudCwgQHNldHRpbmdzLCBib3VuZGluZ0VsKS0+XG5cdFx0c3VwZXIoKVxuXHRcdEBzdGF0ZSA9IG9wZW46ZmFsc2Vcblx0XHRAZWwgPSB0ZW1wbGF0ZS5zcGF3bihudWxsLCB7cmVsYXRlZEluc3RhbmNlOkB9KVxuXG5cdFx0QGVsLmhpZGUoKS5hcHBlbmRUbyhAcGFyZW50KVxuXHRcdEBwb3BwZXIgPSBuZXcgUG9wcGVyIEBwYXJlbnRbMF0sIEBlbFswXSxcblx0XHRcdHBsYWNlbWVudDogJ2JvdHRvbSdcblx0XHRcdHRyaWdnZXI6ICdtYW51YWwnXG5cdFx0XHRtb2RpZmllcnM6XG5cdFx0XHRcdG9mZnNldDpcblx0XHRcdFx0XHRlbmFibGVkOiB0cnVlXG5cdFx0XHRcdFx0b2Zmc2V0OiAnNXB4J1xuXHRcdFx0XHRwcmV2ZW50T3ZlcmZsb3c6XG5cdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZVxuXHRcdFx0XHRcdGJvdW5kcmllc0VsZW1lbnQ6IGJvdW5kaW5nRWxbMF0gb3IgYm91bmRpbmdFbFxuXG5cdF9hdHRhY2hPdXRlckNsaWNrTGlzdGVuZXI6ICgpLT5cblx0XHRET00oZG9jdW1lbnQpLm9uICdjbGljay5vdXRlckNsaWNrJywgKGV2ZW50KT0+XG5cdFx0XHR0YXJnZXRQYXJlbnRzID0gRE9NKGV2ZW50LnRhcmdldCkucGFyZW50c1xuXHRcdFx0aWYgbm90IHRhcmdldFBhcmVudHMuaW5jbHVkZXMoQHBhcmVudClcblx0XHRcdFx0QGNsb3NlKClcblx0XHRcdFx0QGVtaXQgJ2JsdXInXG5cblx0X2RldGFjaE91dGVyQ2xpY2tMaXN0ZW5lcjogKCktPlxuXHRcdERPTShkb2N1bWVudCkub2ZmICdjbGljay5vdXRlckNsaWNrJ1xuXG5cblx0b3BlbjogKCktPlxuXHRcdHJldHVybiBpZiBAc3RhdGUub3BlblxuXHRcdEBlbWl0ICdiZWZvcmVvcGVuJ1xuXHRcdEBzdGF0ZS5vcGVuID0gdHJ1ZVxuXHRcdEBlbC5zaG93KClcblx0XHRAcG9wcGVyLnVwZGF0ZSgpXG5cdFx0QF9hdHRhY2hPdXRlckNsaWNrTGlzdGVuZXIoKVxuXHRcdEBlbWl0ICdvcGVuJ1xuXHRcdHJldHVybiBAXG5cblx0Y2xvc2U6ICgpLT5cblx0XHRyZXR1cm4gaWYgbm90IEBzdGF0ZS5vcGVuXG5cdFx0QGVtaXQgJ2JlZm9yZWNsb3NlJ1xuXHRcdEBzdGF0ZS5vcGVuID0gZmFsc2Vcblx0XHRAZWwuaGlkZSgpXG5cdFx0QF9kZXRhY2hPdXRlckNsaWNrTGlzdGVuZXIoKVxuXHRcdEBlbWl0ICdjbG9zZSdcblx0XHRyZXR1cm4gQFxuXG5cdHNldENvbnRlbnQ6IChjb250ZW50KS0+XG5cdFx0QGVscy5jb250ZW50LmVtcHR5KClcblx0XHRAZWxzLmNvbnRlbnQuYXBwZW5kIGNvbnRlbnQgaWYgY29udGVudFxuXG5cblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyBAOjosXG5cdFx0J2Vscyc6IGdldDogKCktPiBAZWwuY2hpbGRcblxuXG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwIiwiZXhwb3J0IGRlZmF1bHQgKHZhbHVlLCBmb3JtYXR0ZXIpLT4gc3dpdGNoXG5cdHdoZW4gdHlwZW9mIGZvcm1hdHRlciBpcyAndW5kZWZpbmVkJ1xuXHRcdHJldHVybiB2YWx1ZVxuXHRcblx0d2hlbiB0eXBlb2YgZm9ybWF0dGVyIGlzICdmdW5jdGlvbidcblx0XHRyZXR1cm4gZm9ybWF0dGVyKHZhbHVlKVxuXG5cdHdoZW4gQXJyYXkuaXNBcnJheShmb3JtYXR0ZXIpXG5cdFx0YWxpYXMgPSBmb3JtYXR0ZXIuZmluZCAoY2FuZGlkYXRlKS0+IGNhbmRpZGF0ZS52YWx1ZSBpcyB2YWx1ZVxuXHRcdGlmIGFsaWFzXG5cdFx0XHRyZXR1cm4gYWxpYXMubGFiZWwgb3IgYWxpYXMubmFtZVxuXHRcdGVsc2Vcblx0XHRcdHJldHVybiB2YWx1ZVxuXG5cdHdoZW4gdHlwZW9mIGZvcm1hdHRlciBpcyAnb2JqZWN0JyBhbmQgZm9ybWF0dGVyXG5cdFx0cmV0dXJuIGZvcm1hdHRlclt2YWx1ZV0gb3IgdmFsdWUiLCJleHBvcnQgZGVmYXVsdCAodGFnKS0+XG5cdHVwZGF0ZXIgPSAobmV3VmFsdWUpLT5cblx0XHR1cGRhdGVyLnRhZy5fdXBkYXRlRnJvbUZpZWxkKG5ld1ZhbHVlKVxuXG5cdHVwZGF0ZXIudGFnID0gdGFnXG5cdHJldHVybiB1cGRhdGVyIiwiaW1wb3J0IERPTSBmcm9tICdxdWlja2RvbSdcbmltcG9ydCB7YnV0dG9uIGFzIGJ1dHRvbl99IGZyb20gJy4uL3BvcHVwL3RlbXBsYXRlJ1xuXG5leHBvcnQgYnV0dG9uID0gRE9NLnRlbXBsYXRlKFxuXHRbJ2Rpdidcblx0XHRyZWY6ICdidXR0b24nXG5cdFx0WydkaXYnXG5cdFx0XHRyZWY6ICdlcnJvck1lc3NhZ2UnXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCdcblx0XHRcdFx0ZGlzcGxheTogJ25vbmUnXG5cdFx0XHRcdHBhZGRpbmc6ICcxMHB4IDE1cHgnXG5cdFx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdFx0Y29sb3I6ICcjZjc0NDI1J1xuXG5cdFx0XHRtZXRob2RzOlxuXHRcdFx0XHRzZXQ6IChtZXNzYWdlKS0+XG5cdFx0XHRcdFx0QGh0bWwgPSBtZXNzYWdlXG5cdFx0XHRcdFx0QHNob3coKVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGNsZWFyVGltZW91dChAX3RpbWVvdXQpXG5cdFx0XHRcdFx0QF90aW1lb3V0ID0gc2V0VGltZW91dCAoKT0+XG5cdFx0XHRcdFx0XHRAY2xlYXIoKVxuXHRcdFx0XHRcdCwgODAwMFxuXHRcdFx0XHRcblx0XHRcdFx0Y2xlYXI6ICgpLT5cblx0XHRcdFx0XHRAdGV4dCA9ICcnXG5cdFx0XHRcdFx0QGhpZGUoKVxuXHRcdF1cblx0XHRcblx0XHRidXR0b25fLmV4dGVuZChcblx0XHRcdHJlZjogJ2J1dHRvbl8nXG5cdFx0XHRbJ2Rpdidcblx0XHRcdFx0c3R5bGU6XG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiAnI2Q0ZDRkNCdcblx0XHRcdFx0XHQkaG92ZXI6XG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IChpKS0+IGkuc2V0dGluZ3MuYnV0dG9uLmJnQ29sb3Jcblx0XHRcdF1cblx0XHQpXG5cdF1cbilcblxuZXhwb3J0IHJlbW92ZUJ1dHRvbiA9IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAncmVtb3ZlQnV0dG9uJ1xuXHRcdHN0eWxlOlxuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZSdcblx0XHRcdHJpZ2h0OiAnOHB4J1xuXHRcdFx0dG9wOiAnNTUlJ1xuXHRcdFx0dHJhbnNmb3JtOiBcInRyYW5zbGF0ZSgwLCAtNTAlKVwiXG5cdFx0XHRmb250U2l6ZTogJzE3cHgnXG5cdFx0XHRsaW5lSGVpZ2h0OiAxXG5cdFx0XHRvcGFjaXR5OiAwLjRcblx0XHRcdGZvbnRXZWlnaHQ6IDYwMFxuXHQnw5cnXVxuKVxuXG5leHBvcnQgdGV4dCA9IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAndGV4dCdcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnXG5cdFx0XHR0b3A6ICc5cHgnXG5cdFx0XHRmb250U2l6ZTogJzEzLjJweCdcblx0XHRcdGxpbmVIZWlnaHQ6IDFcblxuXHRcdFsnc3Bhbidcblx0XHRcdHJlZjogJ2xhYmVsJ1xuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdGZvbnRXZWlnaHQ6IDYwMFxuXHRcdF1cblxuXHRcdFsnc3Bhbidcblx0XHRcdHJlZjogJ3ZhbHVlJ1xuXHRcdF1cblx0XVxuKVxuXG5leHBvcnQgY29udGVudCA9IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAndGFnQ29udGVudCdcblx0XHRzdHlsZTpcblx0XHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnXG5cdFx0XHRwYWRkaW5nOiAoaSktPiBcIiN7aS5zZXR0aW5ncy5wYWRkaW5nfXB4XCJcblx0XHRcdG1heFdpZHRoOiAoaSktPiBcIiN7aS5zZXR0aW5ncy5tYXhXaWR0aH1weFwiXG5cdF1cbilcblxuXG5leHBvcnQgZGVmYXVsdCBET00udGVtcGxhdGUoXG5cdFsnZGl2J1xuXHRcdHJlZjogJ3RhZydcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnXG5cdFx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuXHRcdFx0dmVydGljYWxBbGlnbjogJ3RvcCdcblx0XHRcdGhlaWdodDogJzI4cHgnXG5cdFx0XHRtYXJnaW5SaWdodDogJzEwcHgnXG5cdFx0XHRtYXJnaW5Cb3R0b206ICc2cHgnXG5cdFx0XHRwYWRkaW5nOiAnMCAyNXB4IDAgMTBweCdcblx0XHRcdGJvcmRlclJhZGl1czogJzRweCdcblx0XHRcdHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnXG5cdFx0XHRjdXJzb3I6ICdwb2ludGVyJ1xuXHRcdFx0dXNlclNlbGVjdDogJ25vbmUnXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICh0YWcpLT4gdGFnLnNldHRpbmdzLmJnQ29sb3Jcblx0XHRcdGNvbG9yOiAodGFnKS0+IHRhZy5zZXR0aW5ncy50ZXh0Q29sb3Jcblx0XHRcdGZvbnRGYW1pbHk6ICh0YWcpLT4gdGFnLnNldHRpbmdzLmZvbnRGYW1pbHlcblxuXHRcdHRleHRcblx0XHRyZW1vdmVCdXR0b25cblx0XVxuKVxuXG4iLCJleHBvcnQgc2V0dGluZ3MgPVxuXHRiZ0NvbG9yOiAnI2NjYydcblx0dGV4dENvbG9yOiAnIzE4MTgxOCdcblx0dXBkYXRlV2hlbjogJ2FwcGxpZWQnICMgfHwgJ2NoYW5nZWQnXG5cdGhpZGVMYWJlbDogZmFsc2Vcblx0cGFkZGluZzogMjBcblx0bWF4V2lkdGg6IDM1MFxuXG5cbmV4cG9ydCBvcHRpb24gPVxuXHRnZXR0ZXI6ICgpLT4gQGZpZWxkLnZhbHVlXG5cdHNldHRlcjogKHZhbHVlKS0+IEBmaWVsZC52YWx1ZSA9IHZhbHVlXG5cdHZhbGlkYXRlOiAodmFsdWUpLT4gdmFsdWU/XG5cblxuIiwiaW1wb3J0IGVycm9yRXggZnJvbSAnZXJyb3ItZXgnXG5cbmV4cG9ydCBWYWxpZGF0aW9uRXJyb3IgPSBlcnJvckV4KCdWYWxpZGF0aW9uRXJyb3InKVxuIiwiZXhwb3J0cy5hcnJvd0Rvd24gPSBcIlwiXCJcblx0ZGF0YTppbWFnZS9zdmcreG1sO3V0Zjg7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlhWE52TFRnNE5Ua3RNU0kvUGdvOElTMHRJRWRsYm1WeVlYUnZjam9nUVdSdlltVWdTV3hzZFhOMGNtRjBiM0lnTVRndU1TNHhMQ0JUVmtjZ1JYaHdiM0owSUZCc2RXY3RTVzRnTGlCVFZrY2dWbVZ5YzJsdmJqb2dOaTR3TUNCQ2RXbHNaQ0F3S1NBZ0xTMCtDanh6ZG1jZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWlCNGJXeHVjenA0YkdsdWF6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M5NGJHbHVheUlnZG1WeWMybHZiajBpTVM0eElpQnBaRDBpUTJGd1lWOHhJaUI0UFNJd2NIZ2lJSGs5SWpCd2VDSWdkbWxsZDBKdmVEMGlNQ0F3SURNd09TNHhOVFlnTXpBNUxqRTFOaUlnYzNSNWJHVTlJbVZ1WVdKc1pTMWlZV05yWjNKdmRXNWtPbTVsZHlBd0lEQWdNekE1TGpFMU5pQXpNRGt1TVRVMk95SWdlRzFzT25Od1lXTmxQU0p3Y21WelpYSjJaU0lnZDJsa2RHZzlJalkwY0hnaUlHaGxhV2RvZEQwaU5qUndlQ0krQ2p4blBnb0pQR2MrQ2drSlBIQnZiSGxuYjI0Z2NHOXBiblJ6UFNJeU9EZ3VORFl4TERZMExqa3lPU0F4TlRRdU5UZzVMREl3TWk0M05qWWdNakF1TnpJekxEWTBMamswSURBc09EVXVNRGNnTVRVMExqVTRPU3d5TkRRdU1qSTRJRE13T1M0eE5UWXNPRFV1TURjZ0lDQWlJR1pwYkd3OUlpTXdNREF3TURBaUx6NEtDVHd2Wno0S1BDOW5QZ284Wno0S1BDOW5QZ284Wno0S1BDOW5QZ284Wno0S1BDOW5QZ284Wno0S1BDOW5QZ284Wno0S1BDOW5QZ284Wno0S1BDOW5QZ284Wno0S1BDOW5QZ284Wno0S1BDOW5QZ284Wno0S1BDOW5QZ284Wno0S1BDOW5QZ284Wno0S1BDOW5QZ284Wno0S1BDOW5QZ284Wno0S1BDOW5QZ284Wno0S1BDOW5QZ284Wno0S1BDOW5QZ284TDNOMlp6NEtcblwiXCJcIlxuXG4jIGV4cG9ydHMuY2hlY2ttYXJrID0gXCJcIlwiXG4jIFx0ZGF0YTppbWFnZS9zdmcreG1sO3V0Zjg7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlhWE52TFRnNE5Ua3RNU0kvUGdvOElTMHRJRWRsYm1WeVlYUnZjam9nUVdSdlltVWdTV3hzZFhOMGNtRjBiM0lnTVRZdU1DNHdMQ0JUVmtjZ1JYaHdiM0owSUZCc2RXY3RTVzRnTGlCVFZrY2dWbVZ5YzJsdmJqb2dOaTR3TUNCQ2RXbHNaQ0F3S1NBZ0xTMCtDandoUkU5RFZGbFFSU0J6ZG1jZ1VGVkNURWxESUNJdEx5OVhNME12TDBSVVJDQlRWa2NnTVM0eEx5OUZUaUlnSW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTDBkeVlYQm9hV056TDFOV1J5OHhMakV2UkZSRUwzTjJaekV4TG1SMFpDSStDanh6ZG1jZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWlCNGJXeHVjenA0YkdsdWF6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M5NGJHbHVheUlnZG1WeWMybHZiajBpTVM0eElpQnBaRDBpUTJGd1lWOHhJaUI0UFNJd2NIZ2lJSGs5SWpCd2VDSWdkMmxrZEdnOUlqWTBjSGdpSUdobGFXZG9kRDBpTmpSd2VDSWdkbWxsZDBKdmVEMGlNQ0F3SURZeE1pNHdNRFVnTmpFeUxqQXdOU0lnYzNSNWJHVTlJbVZ1WVdKc1pTMWlZV05yWjNKdmRXNWtPbTVsZHlBd0lEQWdOakV5TGpBd05TQTJNVEl1TURBMU95SWdlRzFzT25Od1lXTmxQU0p3Y21WelpYSjJaU0krQ2p4blBnb0pQR2NnYVdROUluUnBZMnNpUGdvSkNUeG5QZ29KQ1FrOGNHRjBhQ0JrUFNKTk5UazFMall3TVN3NE1TNDFOVE5qTFRJeExqZzVNaTB5TVM0NE9URXROVGN1TXpZeUxUSXhMamc1TVMwM09TNHlOVE1zTUV3eE9ETXVNRE1zTkRFMExqZzNiQzA0T0M0Mk1qa3ROell1TVRNeklDQWdJQ0JqTFRJeExqVTVNaTB5TVM0MU9UTXROVFl1TlRrMkxUSXhMalU1TXkwM09DNHlNRGNzTUdNdE1qRXVOVGt5TERJeExqVTVNaTB5TVM0MU9USXNOVFl1TmpFMExEQXNOemd1TWpBMmJERXpNaTQwTVRJc01URXpMamN6TXlBZ0lDQWdZekl4TGpVNU1pd3lNUzQxT1RNc05UWXVOVGsyTERJeExqVTVNeXczT0M0eU1EY3NNR015TGpFMk55MHlMakUyTml3ekxqazNPUzAwTGpVM05pdzFMamN4TmkwMkxqazROV013TGpNeE55MHdMakk1T1N3d0xqWTNNaTB3TGpVd05Td3dMams1TFRBdU9EQTBiRE0yTWk0d09ETXRNell5TGpFd01TQWdJQ0FnUXpZeE55NDBOek1zTVRNNExqa3hOQ3cyTVRjdU5EY3pMREV3TXk0ME1qVXNOVGsxTGpZd01TdzRNUzQxTlRONklpQm1hV3hzUFNJak1EQXdNREF3SWk4K0Nna0pQQzluUGdvSlBDOW5QZ284TDJjK0NqeG5QZ284TDJjK0NqeG5QZ284TDJjK0NqeG5QZ284TDJjK0NqeG5QZ284TDJjK0NqeG5QZ284TDJjK0NqeG5QZ284TDJjK0NqeG5QZ284TDJjK0NqeG5QZ284TDJjK0NqeG5QZ284TDJjK0NqeG5QZ284TDJjK0NqeG5QZ284TDJjK0NqeG5QZ284TDJjK0NqeG5QZ284TDJjK0NqeG5QZ284TDJjK0NqeG5QZ284TDJjK0Nqd3ZjM1puUGdvPVxuIyBcIlwiXCIiLCJpbXBvcnQgRE9NIGZyb20gJ3F1aWNrZG9tJ1xuaW1wb3J0ICogYXMgU1ZHIGZyb20gJy4uL3N2ZydcbmltcG9ydCB7YnV0dG9uIGFzIGJ1dHRvbl99IGZyb20gJy4uL3BvcHVwL3RlbXBsYXRlJ1xuXG5leHBvcnQgYnV0dG9uID0gYnV0dG9uXy5leHRlbmQoXG5cdFsnZGl2J1xuXHRcdGNvbXB1dGVyczogX2luaXQ6ICgpLT5cblx0XHRcdEBhcHBseURhdGEgdGV4dDpcIkFkZCAje0ByZWxhdGVkLnNldHRpbmdzLml0ZW1MYWJlbH1cIlxuXHRdXG4pXG5cbmV4cG9ydCBhcnJvdyA9IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAnYXJyb3cnXG5cdFx0c3R5bGU6XG5cdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJ1xuXHRcdFx0ekluZGV4OiAyXG5cdFx0XHRyaWdodDogJzE1cHgnXG5cdFx0XHR0b3A6ICc1NCUnXG5cdFx0XHR0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDAsIC01MCUpXCJcblx0XHRcdHdpZHRoOiAnMTdweCdcblx0XHRcdGhlaWdodDogJzE3cHgnXG5cdFx0XHRiYWNrZ3JvdW5kU2l6ZTogJzEwMCUnXG5cdFx0XHRiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKCN7U1ZHLmFycm93RG93bn0pXCJcblx0XHRcdG9wYWNpdHk6IDAuNVxuXHRdXG4pXG5cbmV4cG9ydCBmYWtlID0gRE9NLnRlbXBsYXRlKFxuXHRbJ2Rpdidcblx0XHRyZWY6ICdmYWtlJ1xuXHRcdHN0eWxlOlxuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZSdcblx0XHRcdHpJbmRleDogMVxuXHRcdFx0bGVmdDogMFxuXHRcdFx0dG9wOiAnNTMlJ1xuXHRcdFx0dHJhbnNmb3JtOiBcInRyYW5zbGF0ZSgwLCAtNTAlKVwiXG5cdFx0XHRoZWlnaHQ6ICcxNnB4J1xuXHRcdFx0cGFkZGluZzogJzAgMTVweCdcblx0XHRcdGZvbnRTaXplOiAnMTZweCdcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0bGluZUhlaWdodDogMVxuXHRcdFx0dGV4dEFsaWduOiAnbGVmdCdcblx0XHRcdHVzZXJTZWxlY3Q6ICdub25lJ1xuXHRcdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCdcblx0XHRcdGNvbG9yOiAnIzE4MTgxOCdcblx0XHRcdG9wYWNpdHk6IDAuNlxuXHRcdFx0JGhhc0NvbnRlbnQ6XG5cdFx0XHRcdG9wYWNpdHk6IDFcblx0XVxuKVxuXG5leHBvcnQgaW5wdXQgPSBET00udGVtcGxhdGUoXG5cdFsnc2VsZWN0J1xuXHRcdHJlZjogJ2lucHV0J1xuXHRcdGZvcmNlU3R5bGU6IHRydWVcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXG5cdFx0XHR6SW5kZXg6IDNcblx0XHRcdHRvcDogMFxuXHRcdFx0bGVmdDogMFxuXHRcdFx0d2lkdGg6ICcxMDAlJ1xuXHRcdFx0aGVpZ2h0OiAnMTAwJSdcblx0XHRcdG9wYWNpdHk6IDBcblxuXHRcdGNvbXB1dGVyczogX2luaXQ6ICgpLT5cblx0XHRcdERPTS5vcHRpb24ocHJvcHM6e3ZhbHVlOicnfSwgXCJTZWxlY3QgI3tAcmVsYXRlZC5zZXR0aW5ncy50YWdMYWJlbH1cIikuYXBwZW5kVG8oQClcblxuXHRcdG1ldGhvZHM6XG5cdFx0XHRsYWJlbDogZ2V0OiAoKS0+XG5cdFx0XHRcdHNlbGVjdGVkID0gQHJhdy5zZWxlY3RlZEluZGV4IG9yIDBcblx0XHRcdFx0cmV0dXJuIEByYXcub3B0aW9uc1tzZWxlY3RlZF0/LmxhYmVsXG5cdFx0XHRcblx0XHRcdHZhbHVlOlxuXHRcdFx0XHRnZXQ6ICgpLT4gQHJhdy52YWx1ZVxuXHRcdFx0XHRzZXQ6ICh2YWx1ZSktPiBAcmF3LnZhbHVlID0gdmFsdWVcblx0XVxuKVxuXG5leHBvcnQgZmllbGQgPSBET00udGVtcGxhdGUoXG5cdFsnZGl2J1xuXHRcdHJlZjogJ3NlbGVjdEZpZWxkJ1xuXHRcdHN0eWxlOlxuXHRcdFx0cG9zaXRpb246ICdyZWxhdGl2ZSdcblx0XHRcdCMgd2lkdGg6ICcxMDAlJ1xuXHRcdFx0bWluV2lkdGg6IDIzMFxuXHRcdFx0aGVpZ2h0OiAnNTVweCdcblx0XHRcdGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCAjZGRkJ1xuXG5cdFx0YXJyb3dcblx0XHRmYWtlXG5cdFx0aW5wdXRcblx0XVxuKVxuXG5cblxuIiwiaW1wb3J0IERPTSBmcm9tICdxdWlja2RvbSdcbmltcG9ydCAqIGFzIHRlbXBsYXRlIGZyb20gJy4vdGVtcGxhdGUnXG5cbmNsYXNzIFNlbGVjdEZpZWxkIGV4dGVuZHMgcmVxdWlyZSgnZXZlbnQtbGl0ZScpXG5cdGNvbnN0cnVjdG9yOiAoQHNldHRpbmdzKS0+XG5cdFx0c3VwZXIoKVxuXHRcdEBmaWVsZCA9IHRlbXBsYXRlLmZpZWxkLnNwYXduKG51bGwsIHtyZWxhdGVkSW5zdGFuY2U6QH0pXG5cdFx0QGlucHV0ID0gQGZpZWxkLmNoaWxkLmlucHV0XG5cdFx0QF9hdHRhY2hCaW5kaW5ncygpXG5cdFx0QF9zZXRVaUxhYmVsKEBsYWJlbClcblxuXHRfYXR0YWNoQmluZGluZ3M6ICgpLT5cblx0XHRAZmllbGQub24gJ2lucHV0JywgKCk9PlxuXHRcdFx0QGVtaXQgJ2NoYW5nZScsIHtAbGFiZWwsIEB2YWx1ZX1cblxuXHRcdEBvbiAnY2hhbmdlJywgKHtsYWJlbH0pLT5cblx0XHRcdEBfc2V0VWlMYWJlbChsYWJlbClcblxuXHRfc2V0VWlMYWJlbDogKGxhYmVsKS0+XG5cdFx0QGZpZWxkLmNoaWxkLmZha2UuaHRtbCA9IGxhYmVsXG5cblx0X3NldFZhbHVlOiAodmFsdWUpLT5cblx0XHRAaW5wdXQudmFsdWUgPSB2YWx1ZVxuXHRcdEBfc2V0VWlMYWJlbChAbGFiZWwpXG5cblx0c2V0T3B0aW9uczogKG9wdGlvbnMpLT5cblx0XHRwcmV2T3B0aW9ucyA9IEBpbnB1dC5jaGlsZHJlbi5zbGljZSgxKVxuXHRcdERPTS5iYXRjaChwcmV2T3B0aW9ucykucmVtb3ZlKCkgaWYgcHJldk9wdGlvbnMubGVuZ3RoXG5cblx0XHRmb3Ige25hbWUsbGFiZWx9IGluIG9wdGlvbnNcblx0XHRcdEBpbnB1dC5hcHBlbmQgRE9NLm9wdGlvbih7cHJvcHM6dmFsdWU6bmFtZX0sIGxhYmVsKVxuXHRcdHJldHVyblxuXG5cblx0aW5zZXJ0QmVmb3JlOiAodGFyZ2V0KS0+XG5cdFx0QGZpZWxkLmluc2VydEJlZm9yZSh0YXJnZXQpXG5cblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyBAOjosXG5cdFx0bGFiZWw6XG5cdFx0XHRnZXQ6ICgpLT4gQGlucHV0LmxhYmVsXG5cdFx0dmFsdWU6XG5cdFx0XHRnZXQ6ICgpLT4gQGlucHV0LnZhbHVlXG5cdFx0XHRzZXQ6ICh2YWx1ZSktPiBAX3NldFZhbHVlKHZhbHVlKVxuXG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdEZpZWxkIiwiaW1wb3J0IGV4dGVuZCBmcm9tICdzbWFydC1leHRlbmQnXG5pbXBvcnQgU2VsZWN0RmllbGQgZnJvbSAnLi4vc2VsZWN0RmllbGQnXG5pbXBvcnQgVGFnIGZyb20gJy4vJ1xuaW1wb3J0IFBvcHVwIGZyb20gJy4uL3BvcHVwJ1xuaW1wb3J0ICogYXMgZGVmYXVsdHMgZnJvbSAnLi9kZWZhdWx0cydcbmltcG9ydCB7Y29udGVudCwgYnV0dG9ufSBmcm9tICcuL3RlbXBsYXRlJ1xuXG5jbGFzcyBCdWZmZXJUYWcgZXh0ZW5kcyByZXF1aXJlKCdldmVudC1saXRlJylcblx0Y29uc3RydWN0b3I6IChAbGlzdCktPlxuXHRcdHN1cGVyKClcblx0XHR7QHNldHRpbmdzfSA9IEBsaXN0XG5cdFx0QGNvbnRlbnQgPSBjb250ZW50LnNwYXduKG51bGwsIHJlbGF0ZWRJbnN0YW5jZTpAKVxuXHRcdEBzdGF0ZSA9IHt9XG5cdFx0QGFwcGx5QnV0dG9uID0gQGJ1dHRvbiA9IGJ1dHRvbi5zcGF3bih7ZGF0YTp0ZXh0OlwiQWRkICN7QHNldHRpbmdzLnRhZ0xhYmVsfVwifSwgcmVsYXRlZEluc3RhbmNlOkApXG5cdFx0QGFkZEJ1dHRvbiA9IEBsaXN0LmVscy5hZGRCdXR0b25cblx0XHRAcG9wdXAgPSBuZXcgUG9wdXAoQGFkZEJ1dHRvbiwgQHNldHRpbmdzLCBAc2V0dGluZ3MuYm91bmRpbmdFbClcblx0XHRAc2VsZWN0RmllbGQgPSBuZXcgU2VsZWN0RmllbGQoQHNldHRpbmdzKVxuXHRcdFxuXHRcdEBjb250ZW50XyA9IERPTS5kaXYobnVsbCwgQGNvbnRlbnQpXG5cdFx0QHNlbGVjdEZpZWxkLmluc2VydEJlZm9yZShAY29udGVudClcblx0XHRAYXBwbHlCdXR0b24uaW5zZXJ0QWZ0ZXIoQGNvbnRlbnQpXG5cdFx0QHBvcHVwLnNldENvbnRlbnQoQGNvbnRlbnRfKVxuXHRcdEBfc2V0dXAoKVxuXG5cdF9zZXR1cDogKCktPlxuXHRcdEBhcHBseUJ1dHRvbi5vbiAnY2xpY2snLCAoKT0+XG5cdFx0XHRAX2FwcGx5Q2hhbmdlcygpIGlmIEBfdmFsaWRhdGVIYXNGaWVsZCgpXG5cblx0XHRAYWRkQnV0dG9uLm9uICdjbGljaycsICgpPT5cblx0XHRcdEBwb3B1cC5vcGVuKClcblxuXHRcdEBzZWxlY3RGaWVsZC5vbiAnY2hhbmdlJywgKHt2YWx1ZX0pPT5cblx0XHRcdEBfc2V0Q3VycmVudCh2YWx1ZSlcblxuXHRfc2V0Q3VycmVudDogKG5hbWUpLT5cblx0XHRAY29udGVudC5lbXB0eSgpXG5cdFx0QG9wdGlvbiA9IEBsaXN0Ll9maW5kT3B0aW9uKG5hbWUpXG5cblx0XHRpZiBAb3B0aW9uXG5cdFx0XHRAb3B0aW9uID0gZXh0ZW5kLmNsb25lKGRlZmF1bHRzLm9wdGlvbiwgQG9wdGlvbilcblx0XHRcdEBfaW5pdEZpZWxkKClcblx0XHRlbHNlXG5cdFx0XHRAZmllbGQgPSBudWxsXG5cblx0XHRAc2VsZWN0RmllbGQudmFsdWUgPSBuYW1lIHVubGVzcyBAc2VsZWN0RmllbGQudmFsdWUgaXMgbmFtZVxuXG5cblx0X3ZhbGlkYXRlSGFzRmllbGQ6ICgpLT5cblx0XHRpZiBAZmllbGRcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0ZWxzZVxuXHRcdFx0QGJ1dHRvbi5jaGlsZC5lcnJvck1lc3NhZ2Uuc2V0KCdZb3UgbXVzdCBzZWxlY3QgYSBmaWVsZCBmaXJzdCcpXG5cdFx0XHRyZXR1cm4gZmFsc2VcblxuXHRfdXBkYXRlU2VsZWN0YWJsZTogKCktPlxuXHRcdGlmIEBzZXR0aW5ncy5yZXBlYXRhYmxlVmFsdWVzXG5cdFx0XHRvcHRpb25zID0gQGxpc3Qub3B0aW9uc1xuXHRcdGVsc2Vcblx0XHRcdG9wdGlvbnMgPSBAbGlzdC5vcHRpb25zLmZpbHRlciAoe25hbWV9KT0+IEBsaXN0Ll9maW5kVGFnKG5hbWUpXG5cdFx0XG5cdFx0QHNlbGVjdEZpZWxkLnNldE9wdGlvbnMob3B0aW9ucylcblx0XG5cdF9ub3RpZnlDaGFuZ2U6ICgpLT5cblx0XHRAZW1pdCAnY2hhbmdlJywgQG9wdGlvbiwgQHZhbHVlXG5cdFx0QF9yZXNldCgpXG5cblx0X3VwZGF0ZUZyb21Vc2VyOiAodmFsdWUpLT5cblx0XHRAb3B0aW9uLnNldHRlci5jYWxsKEAsIHZhbHVlKVxuXG5cdF91cGRhdGVGcm9tRmllbGQ6ICh2YWx1ZSktPlxuXHRcdDtcblxuXHRfcmVzZXQ6ICgpLT5cblx0XHRAX3NldEN1cnJlbnQoJycpXG5cdFx0QHBvcHVwLmNsb3NlKClcblx0XG5cdGdldDogVGFnOjpnZXRcblx0c2V0OiBUYWc6OnNldFxuXHR2YWxpZGF0ZTogVGFnOjp2YWxpZGF0ZVxuXHRfaW5pdEZpZWxkOiBUYWc6Ol9pbml0RmllbGRcblx0X2FwcGx5Q2hhbmdlczogVGFnOjpfYXBwbHlDaGFuZ2VzXG5cdFxuXHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyBAOjosXG5cdFx0ZWxzOiBnZXQ6ICgpLT4gQGVsLmNoaWxkXG5cdFx0dmFsdWU6IGdldDogKCktPiBAZ2V0KClcblxuXG5leHBvcnQgZGVmYXVsdCBCdWZmZXJUYWciLCJpbXBvcnQgRE9NIGZyb20gJ3F1aWNrZG9tJ1xuaW1wb3J0IGV4dGVuZCBmcm9tICdzbWFydC1leHRlbmQnXG5pbXBvcnQgUG9wdXAgZnJvbSAnLi4vcG9wdXAnXG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJy4vc3RyaW5naWZ5J1xuaW1wb3J0IHVwZGF0ZXIgZnJvbSAnLi91cGRhdGVyJ1xuaW1wb3J0IHRlbXBsYXRlLCB7Y29udGVudCwgYnV0dG9ufSBmcm9tICcuL3RlbXBsYXRlJ1xuaW1wb3J0ICogYXMgZGVmYXVsdHMgZnJvbSAnLi9kZWZhdWx0cydcbmltcG9ydCB7VmFsaWRhdGlvbkVycm9yfSBmcm9tICcuLi9lcnJvcnMnXG5cbmNsYXNzIFRhZyBleHRlbmRzIHJlcXVpcmUoJ2V2ZW50LWxpdGUnKVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbiwgbGlzdFNldHRpbmdzKS0+XG5cdFx0c3VwZXIoKVxuXHRcdHNldHRpbmdzMSA9IGV4dGVuZC5rZXlzKFsnYnV0dG9uJywnZm9udEZhbWlseSddKS5jbG9uZShsaXN0U2V0dGluZ3MpXG5cdFx0c2V0dGluZ3MyID0gZXh0ZW5kLmtleXMoWydwYWRkaW5nJywgJ21heFdpZHRoJ10pLmNsb25lKG9wdGlvbilcblx0XHRAc2V0dGluZ3MgPSBleHRlbmQuY2xvbmUoZGVmYXVsdHMuc2V0dGluZ3MsIGxpc3RTZXR0aW5ncy50YWcsIHNldHRpbmdzMSwgc2V0dGluZ3MyKVxuXHRcdEBvcHRpb24gPSBleHRlbmQuY2xvbmUoZGVmYXVsdHMub3B0aW9uLCBvcHRpb24pXG5cdFx0QG9wdGlvbi5wb3B1cCA9IGV4dGVuZC5jbG9uZShsaXN0U2V0dGluZ3MucG9wdXAsIEBvcHRpb24ucG9wdXApXG5cdFx0QHN0YXRlID0ge31cblx0XHRAbmFtZSA9IEBvcHRpb24ubmFtZVxuXHRcdEBsYWJlbCA9IEBvcHRpb24ubGFiZWxcblx0XHRAZWwgPSB0ZW1wbGF0ZS5zcGF3bihudWxsLCByZWxhdGVkSW5zdGFuY2U6QClcblx0XHRAY29udGVudCA9IGNvbnRlbnQuc3Bhd24obnVsbCwgcmVsYXRlZEluc3RhbmNlOkApXG5cdFx0QGJ1dHRvbiA9IGJ1dHRvbi5zcGF3bih7ZGF0YTp0ZXh0OidBcHBseSd9LCByZWxhdGVkSW5zdGFuY2U6QClcblx0XHRAcG9wdXAgPSBuZXcgUG9wdXAoQGVsLCBsaXN0U2V0dGluZ3MsIGxpc3RTZXR0aW5ncy5ib3VuZGluZ0VsKVxuXHRcdEBwb3B1cC5zZXRDb250ZW50KEBjb250ZW50KVxuXHRcdEBidXR0b24uaW5zZXJ0QWZ0ZXIoQGNvbnRlbnQpIGlmIEBzZXR0aW5ncy51cGRhdGVXaGVuIGlzICdhcHBsaWVkJ1xuXG5cdFx0QF9zZXR1cCgpXG5cdFx0QF9hdHRhY2hCaW5kaW5ncygpXG5cdFxuXG5cdF9zZXR1cDogKCktPlxuXHRcdGlmIEBvcHRpb24uaGlkZUxhYmVsXG5cdFx0XHRAZWxzLmxhYmVsLmhpZGUoKVxuXHRcdGVsc2Vcblx0XHRcdEBlbHMubGFiZWwuaHRtbCA9IFwiI3tAb3B0aW9uLmxhYmVsfTogXCJcblxuXHRfYXR0YWNoQmluZGluZ3M6ICgpLT5cdFx0XG5cdFx0QGVscy5yZW1vdmVCdXR0b24ub24gJ2NsaWNrJywgKGV2ZW50KT0+XG5cdFx0XHRAZW1pdCAncmVtb3ZlJzsgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuXHRcdEBlbC5vbiAnY2xpY2snLCAoKT0+XG5cdFx0XHRAcG9wdXAub3BlbigpXG5cblx0XHRAYnV0dG9uLm9uICdjbGljaycsIChlKT0+XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0XHRAcG9wdXAuY2xvc2UoKSBpZiBAX2FwcGx5Q2hhbmdlcygpXG5cblx0XHRpZiBAc2V0dGluZ3MudXBkYXRlV2hlbiBpcyAnYXBwbGllZCdcblx0XHRcdEBwb3B1cC5vbiAnb3BlbicsICgpPT4gQHN0YXRlLnZhbHVlT25Gb2N1cyA/PSBAdmFsdWVcblx0XHRcdEBwb3B1cC5vbiAnYmx1cicsICgpPT4gaWYgQHZhbHVlIGlzbnQgQHN0YXRlLnZhbHVlT25Gb2N1c1xuXHRcdFx0XHRpZiBub3QgQF9hcHBseUNoYW5nZXMoKVxuXHRcdFx0XHRcdGNvbnNvbGUubG9nICdvcGVuaW5nJ1xuXHRcdFx0XHRcdEBwb3B1cC5vcGVuKClcblx0XG5cdF9pbml0RmllbGQ6ICgpLT5cblx0XHRAZmllbGQgPSBAb3B0aW9uLmZpZWxkLmNhbGwoQCwgQGNvbnRlbnQucmF3LCB1cGRhdGVyKEApKVxuXHRcdEBzZXQoQG9wdGlvbi5kZWZhdWx0LCB0cnVlKSBpZiBAb3B0aW9uLmRlZmF1bHRcblxuXHRfZG9tSW5zZXJ0OiAobWV0aG9kLCB0YXJnZXQpLT5cblx0XHRAZWxbbWV0aG9kXSh0YXJnZXQpXG5cdFx0QF9pbml0RmllbGQoKVxuXHRcdHJldHVybiBAXG5cblx0X25vdGlmeUNoYW5nZTogKCktPlxuXHRcdEBlbWl0ICdjaGFuZ2UnLCBAdmFsdWVcblxuXHRfdXBkYXRlVGV4dDogKHZhbHVlKS0+XG5cdFx0QGVscy52YWx1ZS50ZXh0ID0gc3RyaW5naWZ5KHZhbHVlLCBAb3B0aW9uLmZvcm1hdHRlcilcblxuXHRfdXBkYXRlRnJvbVVzZXI6ICh2YWx1ZSwgU0lMRU5UKS0+XG5cdFx0QF91cGRhdGVUZXh0KHZhbHVlKVxuXHRcdEBvcHRpb24uc2V0dGVyLmNhbGwoQCwgdmFsdWUpXG5cdFx0QF9ub3RpZnlDaGFuZ2UoKSB1bmxlc3MgU0lMRU5UXG5cblx0X3VwZGF0ZUZyb21GaWVsZDogKHZhbHVlKS0+XG5cdFx0QF91cGRhdGVUZXh0KHZhbHVlKVxuXHRcdEBfbm90aWZ5Q2hhbmdlKCkgdW5sZXNzIEBzZXR0aW5ncy51cGRhdGVXaGVuIGlzICdhcHBsaWVkJ1xuXG5cdF9hcHBseUNoYW5nZXM6ICgpLT5cblx0XHR2YWxpZGF0aW9uID0gQHZhbGlkYXRlKClcblx0XHRpZiB2YWxpZGF0aW9uIGlzIHRydWVcblx0XHRcdEBzdGF0ZS52YWx1ZU9uRm9jdXMgPSBudWxsXG5cdFx0XHRAX25vdGlmeUNoYW5nZSgpXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFxuXHRcdGVsc2UgaWYgdmFsaWRhdGlvbiBpbnN0YW5jZW9mIEVycm9yXG5cdFx0XHRAYnV0dG9uLmNoaWxkLmVycm9yTWVzc2FnZS5zZXQodmFsaWRhdGlvbi5tZXNzYWdlKVxuXHRcdFx0QGVtaXQgJ2Vycm9yJywgdmFsaWRhdGlvblxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cblx0Z2V0OiAoc2tpcFRyYW5zZm9ybSktPlxuXHRcdHZhbHVlID0gQG9wdGlvbi5nZXR0ZXIuY2FsbChAKVxuXHRcdHZhbHVlID0gQG9wdGlvbi50cmFuc2Zvcm1PdXRwdXQodmFsdWUpIGlmIEBvcHRpb24udHJhbnNmb3JtT3V0cHV0IGFuZCBub3Qgc2tpcFRyYW5zZm9ybVxuXHRcdHJldHVybiB2YWx1ZVxuXHRcblx0c2V0OiAodmFsdWUsIFNJTEVOVCktPlxuXHRcdHZhbHVlID0gdmFsdWUoKSBpZiB0eXBlb2YgdmFsdWUgaXMgJ2Z1bmN0aW9uJ1xuXHRcdHZhbHVlID0gQG9wdGlvbi50cmFuc2Zvcm1JbnB1dCh2YWx1ZSkgaWYgQG9wdGlvbi50cmFuc2Zvcm1JbnB1dFxuXHRcdEBfdXBkYXRlRnJvbVVzZXIodmFsdWUsIFNJTEVOVClcblxuXHR2YWxpZGF0ZTogKCktPlxuXHRcdHJldHVybiB0cnVlIGlmIG5vdCBAb3B0aW9uLnZhbGlkYXRlXG5cdFx0dHJ5XG5cdFx0XHRyZXN1bHQgPSBAb3B0aW9uLnZhbGlkYXRlLmNhbGwoQCwgQHZhbHVlKVxuXHRcdGNhdGNoIGVyclxuXHRcdFx0cmVzdWx0ID0gZXJyXG5cblx0XHRzd2l0Y2hcblx0XHRcdHdoZW4gcmVzdWx0IGlzIHRydWUgdGhlbiB0cnVlXG5cdFx0XHR3aGVuIHJlc3VsdCBpcyBmYWxzZSB0aGVuIG5ldyBWYWxpZGF0aW9uRXJyb3IoXCJ2YWxpZGF0aW9uIGZhaWxlZFwiKVxuXHRcdFx0d2hlbiB0eXBlb2YgcmVzdWx0IGlzICdzdHJpbmcnIHRoZW4gbmV3IFZhbGlkYXRpb25FcnJvcihyZXN1bHQpXG5cdFx0XHR3aGVuIHJlc3VsdCBpbnN0YW5jZW9mIEVycm9yIHRoZW4gcmVzdWx0XG5cblx0XG5cblx0YXBwZW5kVG86ICh0YXJnZXQpLT4gQF9kb21JbnNlcnQgJ2FwcGVuZFRvJywgdGFyZ2V0XG5cdHByZXBlbmRUbzogKHRhcmdldCktPiBAX2RvbUluc2VydCAncHJlcGVuZFRvJywgdGFyZ2V0XG5cdGluc2VydEJlZm9yZTogKHRhcmdldCktPiBAX2RvbUluc2VydCAnaW5zZXJ0QmVmb3JlJywgdGFyZ2V0XG5cdGluc2VydEFmdGVyOiAodGFyZ2V0KS0+IEBfZG9tSW5zZXJ0ICdpbnNlcnRBZnRlcicsIHRhcmdldFxuXHRcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyBAOjosXG5cdFx0ZWxzOiBnZXQ6ICgpLT4gQGVsLmNoaWxkXG5cdFx0dmFsdWU6IGdldDogKCktPiBAZ2V0KClcblx0XHRyYXdWYWx1ZTogZ2V0OiAoKS0+IEBnZXQodHJ1ZSlcblxuXG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IFRhZ1xuZXhwb3J0IHtkZWZhdWx0IGFzIEJ1ZmZlclRhZ30gZnJvbSAnLi9idWZmZXInIiwiZXhwb3J0IHRvQXJyYXkgPSAob2JqZWN0KS0+XG5cdGlmIEFycmF5LmlzQXJyYXkob2JqZWN0KVxuXHRcdHJldHVybiBvYmplY3Rcblx0ZWxzZVxuXHRcdHtuYW1lLHZhbHVlfSBmb3IgbmFtZSx2YWx1ZSBvZiBvYmplY3RcblxuIiwiaW1wb3J0IGV4dGVuZCBmcm9tICdzbWFydC1leHRlbmQnXG5pbXBvcnQgRE9NIGZyb20gJ3F1aWNrZG9tJ1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMnXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi90ZW1wbGF0ZSdcbmltcG9ydCBUYWcsIHtCdWZmZXJUYWd9IGZyb20gJy4uL3RhZydcbmltcG9ydCBQb3B1cCBmcm9tICcuLi9wb3B1cCdcbmltcG9ydCB7dG9BcnJheX0gZnJvbSAnLi4vaGVscGVycydcblxuY2xhc3MgVGFnTGlzdCBleHRlbmRzIHJlcXVpcmUoJ2V2ZW50LWxpdGUnKVxuXHRjb25zdHJ1Y3RvcjogKEB0YXJnZXRDb250YWluZXIsIEBvcHRpb25zPVtdLCBzZXR0aW5ncyktPlxuXHRcdHN1cGVyKClcblx0XHRAc2V0dGluZ3MgPSBleHRlbmQuZGVlcE9ubHkoJ2J1dHRvbicpLmNsb25lKGRlZmF1bHRzLCBzZXR0aW5ncylcblx0XHRAc2V0dGluZ3MuYm91bmRpbmdFbCA9IERPTShAc2V0dGluZ3MuYm91bmRpbmdFbClcblx0XHRAc2V0dGluZ3MuZGVmYXVsdHMgPSB0b0FycmF5KEBzZXR0aW5ncy5kZWZhdWx0cyBvciBbXSlcblx0XHRAdGFncyA9IFtdXG5cdFx0QGVsID0gdGVtcGxhdGUuc3Bhd24obnVsbCwgcmVsYXRlZEluc3RhbmNlOkApXG5cdFx0QGJ1ZmZlciA9IG5ldyBCdWZmZXJUYWcoQClcblx0XHRvcHRpb24ubmFtZSA/PSBvcHRpb24ubGFiZWwgZm9yIG9wdGlvbiBpbiBAb3B0aW9uc1xuXHRcdFxuXHRcdEBfYXBwbHlEZWZhdWx0cyhAc2V0dGluZ3MuZGVmYXVsdHMpXG5cdFx0QF9hdHRhY2hCaW5kaW5ncygpXG5cdFx0QGVsLmFwcGVuZFRvKEB0YXJnZXRDb250YWluZXIpXG5cdFx0QGJ1ZmZlci5fdXBkYXRlU2VsZWN0YWJsZSgpXG5cblxuXHRfYXR0YWNoQmluZGluZ3M6ICgpLT5cblx0XHRAYnVmZmVyLm9uICdjaGFuZ2UnLCAob3B0aW9uLCB2YWx1ZSk9PlxuXHRcdFx0QGFkZChvcHRpb24sIHZhbHVlKVxuXHRcdFx0QF9ub3RpZnlDaGFuZ2UoKVxuXHRcdFxuXHRcdEBidWZmZXIucG9wdXAub24gJ2JlZm9yZW9wZW4nLCAoKT0+XG5cdFx0XHRAY2xvc2VBbGxQb3B1cHMoKVxuXHRcdFxuXHRcdEBvbiAnY2hhbmdlJywgKCk9PlxuXHRcdFx0QGJ1ZmZlci5fdXBkYXRlU2VsZWN0YWJsZSgpXG5cblx0XHRpZiBAc2V0dGluZ3Mub25DaGFuZ2Vcblx0XHRcdEBvbiAnY2hhbmdlJywgQHNldHRpbmdzLm9uQ2hhbmdlXG5cblx0XG5cdF9hcHBseURlZmF1bHRzOiAoZGVmYXVsdHMpLT5cblx0XHRkZWZhdWx0cyA9IHRvQXJyYXkoZGVmYXVsdHMpXG5cblx0XHRmb3Ige25hbWUsIHZhbHVlfSBpbiBkZWZhdWx0cyB3aGVuIHZhbHVlXG5cdFx0XHRvcHRpb24gPSBAX2ZpbmRPcHRpb24obmFtZSlcblx0XHRcdHZhbHVlID0gdmFsdWUoKSBpZiB0eXBlb2YgdmFsdWUgaXMgJ2Z1bmN0aW9uJ1xuXHRcdFx0QGFkZChvcHRpb24sIHZhbHVlKVxuXHRcdHJldHVyblxuXG5cdF9ub3RpZnlDaGFuZ2U6IChTSUxFTlQpLT4gdW5sZXNzIFNJTEVOVFxuXHRcdEBlbWl0ICdjaGFuZ2UnLCBAZ2V0VmFsdWVzKHRydWUpXG5cblx0X2ZpbmRPcHRpb246IChuYW1lLCBjb2xsZWN0aW9uPUBvcHRpb25zKS0+XG5cdFx0cmV0dXJuIGNvbGxlY3Rpb24uZmluZCAob3B0aW9uKS0+IG9wdGlvbi5uYW1lIGlzIG5hbWVcblx0XG5cdF9maW5kVGFnOiAobmFtZSwgY29sbGVjdGlvbj1AdGFncyktPlxuXHRcdHJldHVybiBjb2xsZWN0aW9uLmZpbmQgKHRhZyktPiB0YWcubmFtZSBpcyBuYW1lXG5cdFxuXHRfZmluZERlZmF1bHQ6IChuYW1lKS0+XG5cdFx0cmV0dXJuIEBzZXR0aW5ncy5kZWZhdWx0cy5maW5kIChkZWZhdWx0XyktPiBkZWZhdWx0Xy5uYW1lIGlzIG5hbWVcblxuXHRhZGRPcHRpb246IChvcHRpb24pLT5cblx0XHR1bmxlc3MgQF9maW5kT3B0aW9uKG9wdGlvbi5uYW1lKVxuXHRcdFx0QG9wdGlvbnMucHVzaChvcHRpb24pXG5cblx0YWRkOiAob3B0aW9uLCB2YWx1ZSktPlxuXHRcdG9wdGlvbiA9IEBfZmluZE9wdGlvbihvcHRpb24pIGlmIHR5cGVvZiBvcHRpb24gaXMgJ3N0cmluZydcblx0XHR0YWcgPSBuZXcgVGFnKG9wdGlvbiwgQHNldHRpbmdzKVxuXG5cdFx0dGFnLmluc2VydEJlZm9yZSBAZWxzLmFkZEJ1dHRvblxuXHRcdHRhZy5zZXQodmFsdWUsIHRydWUpIGlmIHZhbHVlP1xuXHRcdHRhZy5vbmNlICdyZW1vdmUnLCAoKT0+IEByZW1vdmUodGFnKVxuXHRcdHRhZy5vbiAnY2hhbmdlJywgKCk9PiBAX25vdGlmeUNoYW5nZSgpXG5cdFx0dGFnLnBvcHVwLm9uICdiZWZvcmVvcGVuJywgKCk9PiBAY2xvc2VBbGxQb3B1cHMoKVxuXHRcdFxuXHRcdEB0YWdzLnB1c2godGFnKVxuXG5cdHJlbW92ZTogKHRhZywgU0lMRU5UKS0+XG5cdFx0dGFnID0gQHRhZ3NCeU5hbWVbdGFnXSBpZiB0eXBlb2YgdGFnIGlzICdzdHJpbmcnXG5cdFx0dGFnLnBvcHVwLmNsb3NlKClcblx0XHR0YWdJbmRleCA9IEB0YWdzLmluZGV4T2YodGFnKVxuXG5cdFx0aWYgQHNldHRpbmdzLnJlcXVpcmVEZWZhdWx0cyBhbmQgQF9maW5kRGVmYXVsdCh0YWcubmFtZSlcblx0XHRcdHRhZy5zZXQoQF9maW5kRGVmYXVsdCh0YWcubmFtZSksIHRydWUpXG5cdFx0XHRAdGFncy5zcGxpY2UgdGFnSW5kZXgsIDEsIHRhZ1xuXHRcdGVsc2Vcblx0XHRcdHRhZy5lbC5yZW1vdmUoKVxuXHRcdFx0QHRhZ3Muc3BsaWNlIHRhZ0luZGV4LCAxXG5cblx0XHRAX25vdGlmeUNoYW5nZShTSUxFTlQpXG5cdFx0cmV0dXJuXG5cblx0cmVtb3ZlQWxsOiAoU0lMRU5UKS0+XG5cdFx0QHJlbW92ZSh0YWcsIHRydWUpIGZvciB0YWcgaW4gQHRhZ3Muc2xpY2UoKVxuXHRcdEBfbm90aWZ5Q2hhbmdlKFNJTEVOVClcblx0XHRyZXR1cm5cblxuXHRzZXRWYWx1ZXM6ICh2YWx1ZXMsIFNJTEVOVCktPlx0XHRcblx0XHRmb3Ige25hbWUsdmFsdWV9LGluZGV4IGluIHRvQXJyYXkodmFsdWVzKVxuXHRcdFx0QHNldFZhbHVlKG5hbWUsIHZhbHVlLCB0cnVlLCBpbmRleClcblx0XHRcblx0XHRAX25vdGlmeUNoYW5nZShTSUxFTlQpXG5cblx0c2V0VmFsdWU6IChuYW1lLCB2YWx1ZSwgU0lMRU5ULCBmcm9tSW5kZXgpLT5cblx0XHRjb2xsZWN0aW9uID0gaWYgZnJvbUluZGV4IHRoZW4gQHRhZ3Muc2xpY2UoZnJvbUluZGV4KSBlbHNlIEB0YWdzXG5cdFx0ZXhpc3RpbmcgPSBAX2ZpbmRUYWcobmFtZSwgY29sbGVjdGlvbilcblx0XHRcblx0XHRpZiBleGlzdGluZ1xuXHRcdFx0ZXhpc3Rpbmcuc2V0KHZhbHVlLCB0cnVlKVxuXHRcdFxuXHRcdGVsc2UgaWYgQF9maW5kT3B0aW9uKG5hbWUpXG5cdFx0XHRAYWRkKG5hbWUsIHZhbHVlKVxuXG5cdFx0QF9ub3RpZnlDaGFuZ2UoU0lMRU5UKVxuXG5cdHJlcGxhY2VWYWx1ZXM6ICh2YWx1ZXMsIFNJTEVOVCktPlxuXHRcdEByZW1vdmVBbGwodHJ1ZSlcblx0XHRAc2V0VmFsdWVzKHZhbHVlcywgdHJ1ZSlcblx0XHRAX25vdGlmeUNoYW5nZShTSUxFTlQpXG5cblx0Z2V0VmFsdWVzOiAoKS0+XG5cdFx0QHRhZ3MubWFwICh0YWcpLT5cblx0XHRcdG5hbWU6IHRhZy5uYW1lXG5cdFx0XHR2YWx1ZTogdGFnLnZhbHVlXG5cblxuXHRjbG9zZUFsbFBvcHVwczogKCktPlxuXHRcdEBidWZmZXIucG9wdXAuY2xvc2UoKVxuXHRcdHRhZy5wb3B1cC5jbG9zZSgpIGZvciB0YWcgaW4gQHRhZ3Ncblx0XHRyZXR1cm5cblxuXHRkZXN0cm95OiAoKS0+XG5cdFx0QGNsb3NlQWxsUG9wdXBzKClcblx0XHRAZWwucmVtb3ZlKClcblx0XHRAZW1pdCAnZGVzdHJveSdcblx0XHRyZXR1cm5cblx0XG5cblxuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIEA6Oixcblx0XHQnZWxzJzogZ2V0OiAoKS0+IEBlbC5jaGlsZFxuXHRcdCd0YWdzQnlOYW1lJzogZ2V0OiAoKS0+XG5cdFx0XHR0YWdzID0gQHRhZ3Ncblx0XHRcdG5ldyAoKS0+IEBbdGFnLm5hbWVdID0gdGFnIGZvciB0YWcgaW4gdGFnczsgQFxuXG5cblxuZXhwb3J0IGRlZmF1bHQgVGFnTGlzdCJdLCJuYW1lcyI6WyJib3VuZGluZ0VsIiwiZG9jdW1lbnQiLCJib2R5IiwidGFnTGFiZWwiLCJyZXF1aXJlRGVmYXVsdHMiLCJ0ZW1wbGF0ZXMiLCJkZWZhdWx0cyIsInRhZ3MiLCJmb250RmFtaWx5IiwiYnV0dG9uIiwiYmdDb2xvciIsInRleHRDb2xvciIsImFkZEJ1dHRvbiIsIkRPTSIsInRlbXBsYXRlIiwicmVmIiwic3R5bGUiLCJwb3NpdGlvbiIsImRpc3BsYXkiLCJ2ZXJ0aWNhbEFsaWduIiwiaGVpZ2h0Iiwid2lkdGgiLCJib3hTaXppbmciLCJib3JkZXIiLCJib3JkZXJSYWRpdXMiLCJjdXJzb3IiLCJ1c2VyU2VsZWN0Iiwib3BhY2l0eSIsImNvbG9yIiwibGVmdCIsInJpZ2h0IiwidG9wIiwidHJhbnNmb3JtIiwibGluZUhlaWdodCIsInRleHRBbGlnbiIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsInRhZ2xpc3QiLCJzZXR0aW5ncyIsImJhY2tncm91bmRDb2xvciIsImkiLCJjb21wdXRlcnMiLCJ0ZXh0VHJhbnNmb3JtIiwibGV0dGVyU3BhY2luZyIsInRleHQiLCJzaXplIiwiZm9udCIsInpJbmRleCIsImJveFNoYWRvdyIsInBvcHVwIiwiUG9wdXAiLCJyZXF1aXJlIiwiY29uc3RydWN0b3IiLCJwYXJlbnQiLCJzdGF0ZSIsIm9wZW4iLCJlbCIsInNwYXduIiwicmVsYXRlZEluc3RhbmNlIiwiaGlkZSIsImFwcGVuZFRvIiwicG9wcGVyIiwiUG9wcGVyIiwicGxhY2VtZW50IiwidHJpZ2dlciIsIm1vZGlmaWVycyIsIm9mZnNldCIsImVuYWJsZWQiLCJwcmV2ZW50T3ZlcmZsb3ciLCJib3VuZHJpZXNFbGVtZW50IiwiX2F0dGFjaE91dGVyQ2xpY2tMaXN0ZW5lciIsIm9uIiwiZXZlbnQiLCJ0YXJnZXRQYXJlbnRzIiwidGFyZ2V0IiwicGFyZW50cyIsImluY2x1ZGVzIiwiY2xvc2UiLCJlbWl0IiwiX2RldGFjaE91dGVyQ2xpY2tMaXN0ZW5lciIsIm9mZiIsInNob3ciLCJ1cGRhdGUiLCJzZXRDb250ZW50IiwiY29udGVudCIsImVscyIsImVtcHR5IiwiYXBwZW5kIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydGllcyIsInByb3RvdHlwZSIsImdldCIsImNoaWxkIiwidmFsdWUiLCJmb3JtYXR0ZXIiLCJhbGlhcyIsIkFycmF5IiwiaXNBcnJheSIsImZpbmQiLCJjYW5kaWRhdGUiLCJsYWJlbCIsIm5hbWUiLCJ0YWciLCJ1cGRhdGVyIiwibmV3VmFsdWUiLCJfdXBkYXRlRnJvbUZpZWxkIiwicGFkZGluZyIsIm1ldGhvZHMiLCJzZXQiLCJtZXNzYWdlIiwiaHRtbCIsImNsZWFyVGltZW91dCIsIl90aW1lb3V0Iiwic2V0VGltZW91dCIsImNsZWFyIiwiYnV0dG9uXyIsImV4dGVuZCIsIiRob3ZlciIsInJlbW92ZUJ1dHRvbiIsIm1heFdpZHRoIiwibWFyZ2luUmlnaHQiLCJtYXJnaW5Cb3R0b20iLCJ1cGRhdGVXaGVuIiwiaGlkZUxhYmVsIiwib3B0aW9uIiwiZ2V0dGVyIiwiZmllbGQiLCJzZXR0ZXIiLCJ2YWxpZGF0ZSIsIlZhbGlkYXRpb25FcnJvciIsImVycm9yRXgiLCJfaW5pdCIsImFwcGx5RGF0YSIsInJlbGF0ZWQiLCJpdGVtTGFiZWwiLCJhcnJvdyIsImJhY2tncm91bmRTaXplIiwiYmFja2dyb3VuZEltYWdlIiwiU1ZHIiwiZmFrZSIsIiRoYXNDb250ZW50IiwiaW5wdXQiLCJmb3JjZVN0eWxlIiwicHJvcHMiLCJzZWxlY3RlZCIsInJhdyIsInNlbGVjdGVkSW5kZXgiLCJtaW5XaWR0aCIsImJvcmRlckJvdHRvbSIsIlNlbGVjdEZpZWxkIiwiX2F0dGFjaEJpbmRpbmdzIiwiX3NldFVpTGFiZWwiLCJfc2V0VmFsdWUiLCJzZXRPcHRpb25zIiwib3B0aW9ucyIsImxlbiIsInByZXZPcHRpb25zIiwiY2hpbGRyZW4iLCJzbGljZSIsImxlbmd0aCIsImJhdGNoIiwicmVtb3ZlIiwiaW5zZXJ0QmVmb3JlIiwiQnVmZmVyVGFnIiwibGlzdCIsImFwcGx5QnV0dG9uIiwiZGF0YSIsInNlbGVjdEZpZWxkIiwiY29udGVudF8iLCJkaXYiLCJpbnNlcnRBZnRlciIsIl9zZXR1cCIsIl92YWxpZGF0ZUhhc0ZpZWxkIiwiX2FwcGx5Q2hhbmdlcyIsIl9zZXRDdXJyZW50IiwiX2ZpbmRPcHRpb24iLCJjbG9uZSIsIl9pbml0RmllbGQiLCJlcnJvck1lc3NhZ2UiLCJfdXBkYXRlU2VsZWN0YWJsZSIsInJlcGVhdGFibGVWYWx1ZXMiLCJmaWx0ZXIiLCJfZmluZFRhZyIsIl9ub3RpZnlDaGFuZ2UiLCJfcmVzZXQiLCJfdXBkYXRlRnJvbVVzZXIiLCJjYWxsIiwiVGFnIiwibGlzdFNldHRpbmdzIiwic2V0dGluZ3MxIiwic2V0dGluZ3MyIiwia2V5cyIsInN0b3BQcm9wYWdhdGlvbiIsImUiLCJiYXNlIiwidmFsdWVPbkZvY3VzIiwiY29uc29sZSIsImxvZyIsImRlZmF1bHQiLCJfZG9tSW5zZXJ0IiwibWV0aG9kIiwiX3VwZGF0ZVRleHQiLCJzdHJpbmdpZnkiLCJTSUxFTlQiLCJ2YWxpZGF0aW9uIiwiRXJyb3IiLCJza2lwVHJhbnNmb3JtIiwidHJhbnNmb3JtT3V0cHV0IiwidHJhbnNmb3JtSW5wdXQiLCJlcnIiLCJyZXN1bHQiLCJwcmVwZW5kVG8iLCJyYXdWYWx1ZSIsInRvQXJyYXkiLCJvYmplY3QiLCJyZXN1bHRzIiwiVGFnTGlzdCIsInRhcmdldENvbnRhaW5lciIsImRlZXBPbmx5IiwiYnVmZmVyIiwiX2FwcGx5RGVmYXVsdHMiLCJhZGQiLCJjbG9zZUFsbFBvcHVwcyIsIm9uQ2hhbmdlIiwiZ2V0VmFsdWVzIiwiY29sbGVjdGlvbiIsIl9maW5kRGVmYXVsdCIsImRlZmF1bHRfIiwiYWRkT3B0aW9uIiwicHVzaCIsIm9uY2UiLCJ0YWdJbmRleCIsInRhZ3NCeU5hbWUiLCJpbmRleE9mIiwic3BsaWNlIiwicmVtb3ZlQWxsIiwic2V0VmFsdWVzIiwidmFsdWVzIiwiaW5kZXgiLCJzZXRWYWx1ZSIsImZyb21JbmRleCIsImV4aXN0aW5nIiwicmVwbGFjZVZhbHVlcyIsIm1hcCIsImRlc3Ryb3kiXSwibWFwcGluZ3MiOiI2akJBQUEsZUFDQztFQUFBQSxVQUFBLEVBQVlDLFFBQVEsQ0FBQ0MsSUFBckI7RUFDQUMsUUFBQSxFQUFVLFFBRFY7RUFFQUMsZUFBQSxFQUFpQixLQUZqQjtFQUdBQyxTQUFBLEVBQVcsSUFIWDtFQUlBQyxRQUFBLEVBQVUsSUFKVjtFQUtBQyxJQUFBLEVBQU0sSUFMTjtFQU1BQyxVQUFBLEVBQVksU0FOWjtFQU9BQyxNQUFBLEVBQ0M7SUFBQUMsT0FBQSxFQUFTLFNBQVQ7SUFDQUMsU0FBQSxFQUFXOztDQVZiLENDRUEsSUFBT0MsU0FBUCxHQUFtQkMsS0FBRyxDQUFDQyxRQUFKLENBQ2xCLENBQUMsS0FBRCxFQUNDO0VBQUFDLEdBQUEsRUFBSyxXQUFMO0VBQ0FDLEtBQUEsRUFDQztJQUFBQyxRQUFBLEVBQVUsVUFBVjtJQUNBQyxPQUFBLEVBQVMsY0FEVDtJQUVBQyxhQUFBLEVBQWUsS0FGZjtJQUdBQyxNQUFBLEVBQVEsTUFIUjtJQUlBQyxLQUFBLEVBQU8sTUFKUDtJQUtBQyxTQUFBLEVBQVc7O0NBUmIsRUFVQyxDQUFD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
