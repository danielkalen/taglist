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
};var ValidationError = errorEx('ValidationError');var Tag;

Tag = function () {
  class Tag extends require('event-lite') {
    constructor(option$1, listSettings) {
      var settings1, settings2;
      super();
      settings1 = extender.keys(['button', 'fontFamily']).clone(listSettings);
      settings2 = extender.keys(['padding', 'maxWidth']).clone(option$1);
      this.settings = extender.clone(settings, listSettings.tag, settings1, settings2);
      this.option = extender.clone(option, option$1);
      this.option.popup = extender.clone(listSettings.popup, this.option.popup);
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
        this.option = extender.clone(option, this.option);

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
      this.settings = extender.deepOnly('button').clone(defaults, settings);
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

var extender = TagList;var version = "3.0.4";exports.BufferTag=BufferTag$1;exports.Popup=Popup$1;exports.Tag=Tag$1;exports.default=extender;exports.version=version;Object.defineProperty(exports,'__esModule',{value:true});}));//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnbGlzdC5kZWJ1Zy5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL3RhZ2xpc3QvZGVmYXVsdHMuY29mZmVlIiwiLi4vc3JjL3RhZ2xpc3QvdGVtcGxhdGUuY29mZmVlIiwiLi4vc3JjL3BvcHVwL3RlbXBsYXRlLmNvZmZlZSIsIi4uL3NyYy9wb3B1cC9pbmRleC5jb2ZmZWUiLCIuLi9zcmMvdGFnL3N0cmluZ2lmeS5jb2ZmZWUiLCIuLi9zcmMvdGFnL3VwZGF0ZXIuY29mZmVlIiwiLi4vc3JjL3RhZy90ZW1wbGF0ZS5jb2ZmZWUiLCIuLi9zcmMvdGFnL2RlZmF1bHRzLmNvZmZlZSIsIi4uL3NyYy9lcnJvcnMuY29mZmVlIiwiLi4vc3JjL3RhZy9pbmRleC5jb2ZmZWUiLCIuLi9zcmMvc3ZnLmNvZmZlZSIsIi4uL3NyYy9zZWxlY3RGaWVsZC90ZW1wbGF0ZS5jb2ZmZWUiLCIuLi9zcmMvc2VsZWN0RmllbGQvaW5kZXguY29mZmVlIiwiLi4vc3JjL3RhZy9idWZmZXIuY29mZmVlIiwiLi4vc3JjL2hlbHBlcnMuY29mZmVlIiwiLi4vc3JjL3RhZ2xpc3QvaW5kZXguY29mZmVlIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0XG5cdGJvdW5kaW5nRWw6IGRvY3VtZW50LmJvZHlcblx0dGFnTGFiZWw6ICdPcHRpb24nXG5cdHJlcXVpcmVEZWZhdWx0czogZmFsc2Vcblx0dGVtcGxhdGVzOiBudWxsXG5cdGRlZmF1bHRzOiBudWxsXG5cdHRhZ3M6IG51bGxcblx0Zm9udEZhbWlseTogJ2luaGVyaXQnXG5cdGJ1dHRvbjpcblx0XHRiZ0NvbG9yOiAnI2Y3NDQyNSdcblx0XHR0ZXh0Q29sb3I6ICcjZmZmJyIsImltcG9ydCBET00gZnJvbSAncXVpY2tkb20nXG5cbmV4cG9ydCBhZGRCdXR0b24gPSBET00udGVtcGxhdGUoXG5cdFsnZGl2J1xuXHRcdHJlZjogJ2FkZEJ1dHRvbidcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnXG5cdFx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuXHRcdFx0dmVydGljYWxBbGlnbjogJ3RvcCdcblx0XHRcdGhlaWdodDogJzI4cHgnXG5cdFx0XHR3aWR0aDogJzI4cHgnXG5cdFx0XHRib3hTaXppbmc6ICdib3JkZXItYm94J1xuXG5cdFx0WydkaXYnXG5cdFx0XHRzdHlsZTogXG5cdFx0XHRcdCMgZGlzcGxheTogJ2lubGluZS1ibG9jaydcblx0XHRcdFx0IyB2ZXJ0aWNhbEFsaWduOiAndG9wJ1xuXHRcdFx0XHRoZWlnaHQ6ICcxMDAlJ1xuXHRcdFx0XHR3aWR0aDogJzEwMCUnXG5cdFx0XHRcdGJvcmRlcjogJzJweCBkYXNoZWQnXG5cdFx0XHRcdGJvcmRlclJhZGl1czogJzVweCdcblx0XHRcdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCdcblx0XHRcdFx0Y3Vyc29yOiAncG9pbnRlcidcblx0XHRcdFx0dXNlclNlbGVjdDogJ25vbmUnXG5cdFx0XHRcdG9wYWNpdHk6IDAuMzVcblx0XHRcdFx0Y29sb3I6ICcjMTgxODE4J1xuXHRcdFx0XG5cdFx0XHRbJ2Rpdidcblx0XHRcdFx0cmVmOiAnVGFnTGlzdEJ1dHRvblRleHQnXG5cdFx0XHRcdHN0eWxlOlxuXHRcdFx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXG5cdFx0XHRcdFx0bGVmdDogMFxuXHRcdFx0XHRcdHJpZ2h0OiAwXG5cdFx0XHRcdFx0dG9wOiAnNTUlJ1xuXHRcdFx0XHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwLCAtNTAlKSdcblx0XHRcdFx0XHR3aWR0aDogJzEwMCUnXG5cdFx0XHRcdFx0bGluZUhlaWdodDogMVxuXHRcdFx0XHRcdHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRcdFx0XHRmb250U2l6ZTogJzIzcHgnXG5cdFx0XHRcdFx0Zm9udFdlaWdodDogNjAwXG5cdFx0XHQnKyddXG5cdFx0XVxuXG5cdF1cbilcblxuXG5cbmV4cG9ydCBkZWZhdWx0IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAnVGFnTGlzdCdcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnXG5cdFx0XHR0ZXh0QWxpZ246ICdsZWZ0J1xuXHRcdFx0Zm9udEZhbWlseTogKHRhZ2xpc3QpLT4gdGFnbGlzdC5zZXR0aW5ncy5mb250RmFtaWx5XG5cblx0XHRhZGRCdXR0b25cblx0XVxuKVxuXG4iLCJpbXBvcnQgRE9NIGZyb20gJ3F1aWNrZG9tJ1xuXG5leHBvcnQgYnV0dG9uID0gRE9NLnRlbXBsYXRlKFxuXHRbJ2Rpdidcblx0XHRyZWY6ICdidXR0b24nXG5cdFx0c3R5bGU6XG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuXHRcdFx0aGVpZ2h0OiA1MFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAnMCAwIDVweCA1cHgnXG5cdFx0XHRib3hTaXppbmc6ICdib3JkZXItYm94J1xuXHRcdFx0Y3Vyc29yOiAncG9pbnRlcidcblx0XHRcdHVzZXJTZWxlY3Q6ICdub25lJ1xuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAoaSktPiBpLnNldHRpbmdzLmJ1dHRvbi5iZ0NvbG9yXG5cdFx0XHRjb2xvcjogKGkpLT4gaS5zZXR0aW5ncy5idXR0b24udGV4dENvbG9yXG5cdFx0Y29tcHV0ZXJzOlxuXHRcdFx0aGVpZ2h0OiAoaGVpZ2h0KS0+IEBzdHlsZSB7aGVpZ2h0fVxuXG5cblx0XHRbJ2Rpdidcblx0XHRcdHJlZjogJ2J1dHRvblRleHQnXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZSdcblx0XHRcdFx0dG9wOiAnNTMlJ1xuXHRcdFx0XHR0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDAsIC01MCUpXCJcblx0XHRcdFx0ZGlzcGxheTogJ2Jsb2NrJ1xuXHRcdFx0XHR3aWR0aDogJzEwMCUnXG5cdFx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0XHRsaW5lSGVpZ2h0OiAxXG5cdFx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0XHR0ZXh0QWxpZ246ICdjZW50ZXInXG5cdFx0XHRcdHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnXG5cdFx0XHRcdGxldHRlclNwYWNpbmc6ICcxLjVweCdcblx0XHRcdGNvbXB1dGVyczpcblx0XHRcdFx0dGV4dDogKHRleHQpLT4gQHRleHQgPSB0ZXh0XG5cdFx0XHRcdHNpemU6IChmb250U2l6ZSktPiBAc3R5bGUge2ZvbnRTaXplfVxuXHRcdFx0XHRmb250OiAoZm9udEZhbWlseSktPiBAc3R5bGUge2ZvbnRGYW1pbHl9XG5cdFx0XVxuXHRdXG4pXG5cbmV4cG9ydCBkZWZhdWx0IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAnVGFnTGlzdC1Qb3B1cCdcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnXG5cdFx0XHR6SW5kZXg6IDIwMDFcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3doaXRlJ1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiAnNXB4J1xuXHRcdFx0Ym94U2hhZG93OiAnMHB4IDNweCAxOHB4IHJnYmEoMCwwLDAsMC4yNCknXG5cdFx0XHRib3hTaXppbmc6ICdib3JkZXItYm94J1xuXHRcdFx0Zm9udEZhbWlseTogKHBvcHVwKS0+IHBvcHVwLnNldHRpbmdzLmZvbnRGYW1pbHlcblx0XHRcblx0XHRbJ2Rpdidcblx0XHRcdHJlZjogJ2NvbnRlbnQnXG5cdFx0XVxuXHRdXG4pXG5cblxuIiwiaW1wb3J0IFBvcHBlciBmcm9tICdwb3BwZXIuanMnXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi90ZW1wbGF0ZSdcbmltcG9ydCBET00gZnJvbSAncXVpY2tkb20nXG5cbmNsYXNzIFBvcHVwIGV4dGVuZHMgcmVxdWlyZSgnZXZlbnQtbGl0ZScpXG5cdGNvbnN0cnVjdG9yOiAoQHBhcmVudCwgQHNldHRpbmdzLCBib3VuZGluZ0VsKS0+XG5cdFx0c3VwZXIoKVxuXHRcdEBzdGF0ZSA9IG9wZW46ZmFsc2Vcblx0XHRAZWwgPSB0ZW1wbGF0ZS5zcGF3bihudWxsLCB7cmVsYXRlZEluc3RhbmNlOkB9KVxuXG5cdFx0QGVsLmhpZGUoKS5hcHBlbmRUbyhAcGFyZW50KVxuXHRcdEBwb3BwZXIgPSBuZXcgUG9wcGVyIEBwYXJlbnRbMF0sIEBlbFswXSxcblx0XHRcdHBsYWNlbWVudDogJ2JvdHRvbSdcblx0XHRcdHRyaWdnZXI6ICdtYW51YWwnXG5cdFx0XHRtb2RpZmllcnM6XG5cdFx0XHRcdG9mZnNldDpcblx0XHRcdFx0XHRlbmFibGVkOiB0cnVlXG5cdFx0XHRcdFx0b2Zmc2V0OiAnNXB4J1xuXHRcdFx0XHRwcmV2ZW50T3ZlcmZsb3c6XG5cdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZVxuXHRcdFx0XHRcdGJvdW5kcmllc0VsZW1lbnQ6IGJvdW5kaW5nRWxbMF0gb3IgYm91bmRpbmdFbFxuXG5cdF9hdHRhY2hPdXRlckNsaWNrTGlzdGVuZXI6ICgpLT5cblx0XHRET00oZG9jdW1lbnQpLm9uICdjbGljay5vdXRlckNsaWNrJywgKGV2ZW50KT0+XG5cdFx0XHR0YXJnZXRQYXJlbnRzID0gRE9NKGV2ZW50LnRhcmdldCkucGFyZW50c1xuXHRcdFx0aWYgbm90IHRhcmdldFBhcmVudHMuaW5jbHVkZXMoQHBhcmVudClcblx0XHRcdFx0QGNsb3NlKClcblx0XHRcdFx0QGVtaXQgJ2JsdXInXG5cblx0X2RldGFjaE91dGVyQ2xpY2tMaXN0ZW5lcjogKCktPlxuXHRcdERPTShkb2N1bWVudCkub2ZmICdjbGljay5vdXRlckNsaWNrJ1xuXG5cblx0b3BlbjogKCktPlxuXHRcdHJldHVybiBpZiBAc3RhdGUub3BlblxuXHRcdEBlbWl0ICdiZWZvcmVvcGVuJ1xuXHRcdEBzdGF0ZS5vcGVuID0gdHJ1ZVxuXHRcdEBlbC5zaG93KClcblx0XHRAcG9wcGVyLnVwZGF0ZSgpXG5cdFx0QF9hdHRhY2hPdXRlckNsaWNrTGlzdGVuZXIoKVxuXHRcdEBlbWl0ICdvcGVuJ1xuXHRcdHJldHVybiBAXG5cblx0Y2xvc2U6ICgpLT5cblx0XHRyZXR1cm4gaWYgbm90IEBzdGF0ZS5vcGVuXG5cdFx0QGVtaXQgJ2JlZm9yZWNsb3NlJ1xuXHRcdEBzdGF0ZS5vcGVuID0gZmFsc2Vcblx0XHRAZWwuaGlkZSgpXG5cdFx0QF9kZXRhY2hPdXRlckNsaWNrTGlzdGVuZXIoKVxuXHRcdEBlbWl0ICdjbG9zZSdcblx0XHRyZXR1cm4gQFxuXG5cdHNldENvbnRlbnQ6IChjb250ZW50KS0+XG5cdFx0QGVscy5jb250ZW50LmVtcHR5KClcblx0XHRAZWxzLmNvbnRlbnQuYXBwZW5kIGNvbnRlbnQgaWYgY29udGVudFxuXG5cblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyBAOjosXG5cdFx0J2Vscyc6IGdldDogKCktPiBAZWwuY2hpbGRcblxuXG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwIiwiZXhwb3J0IGRlZmF1bHQgKHZhbHVlLCBmb3JtYXR0ZXIpLT4gc3dpdGNoXG5cdHdoZW4gdHlwZW9mIGZvcm1hdHRlciBpcyAndW5kZWZpbmVkJ1xuXHRcdHJldHVybiB2YWx1ZVxuXHRcblx0d2hlbiB0eXBlb2YgZm9ybWF0dGVyIGlzICdmdW5jdGlvbidcblx0XHRyZXR1cm4gZm9ybWF0dGVyKHZhbHVlKVxuXG5cdHdoZW4gQXJyYXkuaXNBcnJheShmb3JtYXR0ZXIpXG5cdFx0YWxpYXMgPSBmb3JtYXR0ZXIuZmluZCAoY2FuZGlkYXRlKS0+IGNhbmRpZGF0ZS52YWx1ZSBpcyB2YWx1ZVxuXHRcdGlmIGFsaWFzXG5cdFx0XHRyZXR1cm4gYWxpYXMubGFiZWwgb3IgYWxpYXMubmFtZVxuXHRcdGVsc2Vcblx0XHRcdHJldHVybiB2YWx1ZVxuXG5cdHdoZW4gdHlwZW9mIGZvcm1hdHRlciBpcyAnb2JqZWN0JyBhbmQgZm9ybWF0dGVyXG5cdFx0cmV0dXJuIGZvcm1hdHRlclt2YWx1ZV0gb3IgdmFsdWUiLCJleHBvcnQgZGVmYXVsdCAodGFnKS0+XG5cdHVwZGF0ZXIgPSAobmV3VmFsdWUpLT5cblx0XHR1cGRhdGVyLnRhZy5fdXBkYXRlRnJvbUZpZWxkKG5ld1ZhbHVlKVxuXG5cdHVwZGF0ZXIudGFnID0gdGFnXG5cdHJldHVybiB1cGRhdGVyIiwiaW1wb3J0IERPTSBmcm9tICdxdWlja2RvbSdcbmltcG9ydCB7YnV0dG9uIGFzIGJ1dHRvbl99IGZyb20gJy4uL3BvcHVwL3RlbXBsYXRlJ1xuXG5leHBvcnQgYnV0dG9uID0gRE9NLnRlbXBsYXRlKFxuXHRbJ2Rpdidcblx0XHRyZWY6ICdidXR0b24nXG5cdFx0WydkaXYnXG5cdFx0XHRyZWY6ICdlcnJvck1lc3NhZ2UnXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCdcblx0XHRcdFx0ZGlzcGxheTogJ25vbmUnXG5cdFx0XHRcdHBhZGRpbmc6ICcxMHB4IDE1cHgnXG5cdFx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdFx0Y29sb3I6ICcjZjc0NDI1J1xuXG5cdFx0XHRtZXRob2RzOlxuXHRcdFx0XHRzZXQ6IChtZXNzYWdlKS0+XG5cdFx0XHRcdFx0QGh0bWwgPSBtZXNzYWdlXG5cdFx0XHRcdFx0QHNob3coKVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGNsZWFyVGltZW91dChAX3RpbWVvdXQpXG5cdFx0XHRcdFx0QF90aW1lb3V0ID0gc2V0VGltZW91dCAoKT0+XG5cdFx0XHRcdFx0XHRAY2xlYXIoKVxuXHRcdFx0XHRcdCwgODAwMFxuXHRcdFx0XHRcblx0XHRcdFx0Y2xlYXI6ICgpLT5cblx0XHRcdFx0XHRAdGV4dCA9ICcnXG5cdFx0XHRcdFx0QGhpZGUoKVxuXHRcdF1cblx0XHRcblx0XHRidXR0b25fLmV4dGVuZChcblx0XHRcdHJlZjogJ2J1dHRvbl8nXG5cdFx0XHRbJ2Rpdidcblx0XHRcdFx0c3R5bGU6XG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiAnI2Q0ZDRkNCdcblx0XHRcdFx0XHQkaG92ZXI6XG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IChpKS0+IGkuc2V0dGluZ3MuYnV0dG9uLmJnQ29sb3Jcblx0XHRcdF1cblx0XHQpXG5cdF1cbilcblxuZXhwb3J0IHJlbW92ZUJ1dHRvbiA9IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAncmVtb3ZlQnV0dG9uJ1xuXHRcdHN0eWxlOlxuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZSdcblx0XHRcdHJpZ2h0OiAnOHB4J1xuXHRcdFx0dG9wOiAnNTUlJ1xuXHRcdFx0dHJhbnNmb3JtOiBcInRyYW5zbGF0ZSgwLCAtNTAlKVwiXG5cdFx0XHRmb250U2l6ZTogJzE3cHgnXG5cdFx0XHRsaW5lSGVpZ2h0OiAxXG5cdFx0XHRvcGFjaXR5OiAwLjRcblx0XHRcdGZvbnRXZWlnaHQ6IDYwMFxuXHQnw5cnXVxuKVxuXG5leHBvcnQgdGV4dCA9IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAndGV4dCdcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnXG5cdFx0XHR0b3A6ICc5cHgnXG5cdFx0XHRmb250U2l6ZTogJzEzLjJweCdcblx0XHRcdGxpbmVIZWlnaHQ6IDFcblxuXHRcdFsnc3Bhbidcblx0XHRcdHJlZjogJ2xhYmVsJ1xuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdGZvbnRXZWlnaHQ6IDYwMFxuXHRcdF1cblxuXHRcdFsnc3Bhbidcblx0XHRcdHJlZjogJ3ZhbHVlJ1xuXHRcdF1cblx0XVxuKVxuXG5leHBvcnQgY29udGVudCA9IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAndGFnQ29udGVudCdcblx0XHRzdHlsZTpcblx0XHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnXG5cdFx0XHRwYWRkaW5nOiAoaSktPiBcIiN7aS5zZXR0aW5ncy5wYWRkaW5nfXB4XCJcblx0XHRcdG1heFdpZHRoOiAoaSktPiBcIiN7aS5zZXR0aW5ncy5tYXhXaWR0aH1weFwiXG5cdF1cbilcblxuXG5leHBvcnQgZGVmYXVsdCBET00udGVtcGxhdGUoXG5cdFsnZGl2J1xuXHRcdHJlZjogJ3RhZydcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnXG5cdFx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuXHRcdFx0dmVydGljYWxBbGlnbjogJ3RvcCdcblx0XHRcdGhlaWdodDogJzI4cHgnXG5cdFx0XHRtYXJnaW5SaWdodDogJzEwcHgnXG5cdFx0XHRtYXJnaW5Cb3R0b206ICc2cHgnXG5cdFx0XHRwYWRkaW5nOiAnMCAyNXB4IDAgMTBweCdcblx0XHRcdGJvcmRlclJhZGl1czogJzRweCdcblx0XHRcdHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnXG5cdFx0XHRjdXJzb3I6ICdwb2ludGVyJ1xuXHRcdFx0dXNlclNlbGVjdDogJ25vbmUnXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICh0YWcpLT4gdGFnLnNldHRpbmdzLmJnQ29sb3Jcblx0XHRcdGNvbG9yOiAodGFnKS0+IHRhZy5zZXR0aW5ncy50ZXh0Q29sb3Jcblx0XHRcdGZvbnRGYW1pbHk6ICh0YWcpLT4gdGFnLnNldHRpbmdzLmZvbnRGYW1pbHlcblxuXHRcdHRleHRcblx0XHRyZW1vdmVCdXR0b25cblx0XVxuKVxuXG4iLCJleHBvcnQgc2V0dGluZ3MgPVxuXHRiZ0NvbG9yOiAnI2NjYydcblx0dGV4dENvbG9yOiAnIzE4MTgxOCdcblx0dXBkYXRlV2hlbjogJ2FwcGxpZWQnICMgfHwgJ2NoYW5nZWQnXG5cdGhpZGVMYWJlbDogZmFsc2Vcblx0cGFkZGluZzogMjBcblx0bWF4V2lkdGg6IDM1MFxuXG5cbmV4cG9ydCBvcHRpb24gPVxuXHRnZXR0ZXI6ICgpLT4gQGZpZWxkLnZhbHVlXG5cdHNldHRlcjogKHZhbHVlKS0+IEBmaWVsZC52YWx1ZSA9IHZhbHVlXG5cdHZhbGlkYXRlOiAodmFsdWUpLT4gdmFsdWU/XG5cblxuIiwiaW1wb3J0IGVycm9yRXggZnJvbSAnZXJyb3ItZXgnXG5cbmV4cG9ydCBWYWxpZGF0aW9uRXJyb3IgPSBlcnJvckV4KCdWYWxpZGF0aW9uRXJyb3InKVxuIiwiaW1wb3J0IERPTSBmcm9tICdxdWlja2RvbSdcbmltcG9ydCBleHRlbmRlciBmcm9tICdzbWFydC1leHRlbmQnXG5pbXBvcnQgUG9wdXAgZnJvbSAnLi4vcG9wdXAnXG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJy4vc3RyaW5naWZ5J1xuaW1wb3J0IHVwZGF0ZXIgZnJvbSAnLi91cGRhdGVyJ1xuaW1wb3J0IHRlbXBsYXRlLCB7Y29udGVudCwgYnV0dG9ufSBmcm9tICcuL3RlbXBsYXRlJ1xuaW1wb3J0ICogYXMgZGVmYXVsdHMgZnJvbSAnLi9kZWZhdWx0cydcbmltcG9ydCB7VmFsaWRhdGlvbkVycm9yfSBmcm9tICcuLi9lcnJvcnMnXG5cbmNsYXNzIFRhZyBleHRlbmRzIHJlcXVpcmUoJ2V2ZW50LWxpdGUnKVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbiwgbGlzdFNldHRpbmdzKS0+XG5cdFx0c3VwZXIoKVxuXHRcdHNldHRpbmdzMSA9IGV4dGVuZGVyLmtleXMoWydidXR0b24nLCdmb250RmFtaWx5J10pLmNsb25lKGxpc3RTZXR0aW5ncylcblx0XHRzZXR0aW5nczIgPSBleHRlbmRlci5rZXlzKFsncGFkZGluZycsICdtYXhXaWR0aCddKS5jbG9uZShvcHRpb24pXG5cdFx0QHNldHRpbmdzID0gZXh0ZW5kZXIuY2xvbmUoZGVmYXVsdHMuc2V0dGluZ3MsIGxpc3RTZXR0aW5ncy50YWcsIHNldHRpbmdzMSwgc2V0dGluZ3MyKVxuXHRcdEBvcHRpb24gPSBleHRlbmRlci5jbG9uZShkZWZhdWx0cy5vcHRpb24sIG9wdGlvbilcblx0XHRAb3B0aW9uLnBvcHVwID0gZXh0ZW5kZXIuY2xvbmUobGlzdFNldHRpbmdzLnBvcHVwLCBAb3B0aW9uLnBvcHVwKVxuXHRcdEBzdGF0ZSA9IHt9XG5cdFx0QG5hbWUgPSBAb3B0aW9uLm5hbWVcblx0XHRAbGFiZWwgPSBAb3B0aW9uLmxhYmVsXG5cdFx0QGVsID0gdGVtcGxhdGUuc3Bhd24obnVsbCwgcmVsYXRlZEluc3RhbmNlOkApXG5cdFx0QGNvbnRlbnQgPSBjb250ZW50LnNwYXduKG51bGwsIHJlbGF0ZWRJbnN0YW5jZTpAKVxuXHRcdEBidXR0b24gPSBidXR0b24uc3Bhd24oe2RhdGE6dGV4dDonQXBwbHknfSwgcmVsYXRlZEluc3RhbmNlOkApXG5cdFx0QHBvcHVwID0gbmV3IFBvcHVwKEBlbCwgbGlzdFNldHRpbmdzLCBsaXN0U2V0dGluZ3MuYm91bmRpbmdFbClcblx0XHRAcG9wdXAuc2V0Q29udGVudChAY29udGVudClcblx0XHRAYnV0dG9uLmluc2VydEFmdGVyKEBjb250ZW50KSBpZiBAc2V0dGluZ3MudXBkYXRlV2hlbiBpcyAnYXBwbGllZCdcblxuXHRcdEBfc2V0dXAoKVxuXHRcdEBfYXR0YWNoQmluZGluZ3MoKVxuXHRcblxuXHRfc2V0dXA6ICgpLT5cblx0XHRpZiBAb3B0aW9uLmhpZGVMYWJlbFxuXHRcdFx0QGVscy5sYWJlbC5oaWRlKClcblx0XHRlbHNlXG5cdFx0XHRAZWxzLmxhYmVsLmh0bWwgPSBcIiN7QG9wdGlvbi5sYWJlbH06IFwiXG5cblx0X2F0dGFjaEJpbmRpbmdzOiAoKS0+XHRcdFxuXHRcdEBlbHMucmVtb3ZlQnV0dG9uLm9uICdjbGljaycsIChldmVudCk9PlxuXHRcdFx0QGVtaXQgJ3JlbW92ZSc7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cblx0XHRAZWwub24gJ2NsaWNrJywgKCk9PlxuXHRcdFx0QHBvcHVwLm9wZW4oKVxuXG5cdFx0QGJ1dHRvbi5vbiAnY2xpY2snLCAoZSk9PlxuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKVxuXHRcdFx0QHBvcHVwLmNsb3NlKCkgaWYgQF9hcHBseUNoYW5nZXMoKVxuXG5cdFx0aWYgQHNldHRpbmdzLnVwZGF0ZVdoZW4gaXMgJ2FwcGxpZWQnXG5cdFx0XHRAcG9wdXAub24gJ29wZW4nLCAoKT0+IEBzdGF0ZS52YWx1ZU9uRm9jdXMgPz0gQHZhbHVlXG5cdFx0XHRAcG9wdXAub24gJ2JsdXInLCAoKT0+IGlmIEB2YWx1ZSBpc250IEBzdGF0ZS52YWx1ZU9uRm9jdXNcblx0XHRcdFx0aWYgbm90IEBfYXBwbHlDaGFuZ2VzKClcblx0XHRcdFx0XHRjb25zb2xlLmxvZyAnb3BlbmluZydcblx0XHRcdFx0XHRAcG9wdXAub3BlbigpXG5cdFxuXHRfaW5pdEZpZWxkOiAoKS0+XG5cdFx0QGZpZWxkID0gQG9wdGlvbi5maWVsZC5jYWxsKEAsIEBjb250ZW50LnJhdywgdXBkYXRlcihAKSlcblx0XHRAc2V0KEBvcHRpb24uZGVmYXVsdCwgdHJ1ZSkgaWYgQG9wdGlvbi5kZWZhdWx0XG5cblx0X2RvbUluc2VydDogKG1ldGhvZCwgdGFyZ2V0KS0+XG5cdFx0QGVsW21ldGhvZF0odGFyZ2V0KVxuXHRcdEBfaW5pdEZpZWxkKClcblx0XHRyZXR1cm4gQFxuXG5cdF9ub3RpZnlDaGFuZ2U6ICgpLT5cblx0XHRAZW1pdCAnY2hhbmdlJywgQHZhbHVlXG5cblx0X3VwZGF0ZVRleHQ6ICh2YWx1ZSktPlxuXHRcdEBlbHMudmFsdWUudGV4dCA9IHN0cmluZ2lmeSh2YWx1ZSwgQG9wdGlvbi5mb3JtYXR0ZXIpXG5cblx0X3VwZGF0ZUZyb21Vc2VyOiAodmFsdWUsIFNJTEVOVCktPlxuXHRcdEBfdXBkYXRlVGV4dCh2YWx1ZSlcblx0XHRAb3B0aW9uLnNldHRlci5jYWxsKEAsIHZhbHVlKVxuXHRcdEBfbm90aWZ5Q2hhbmdlKCkgdW5sZXNzIFNJTEVOVFxuXG5cdF91cGRhdGVGcm9tRmllbGQ6ICh2YWx1ZSktPlxuXHRcdEBfdXBkYXRlVGV4dCh2YWx1ZSlcblx0XHRAX25vdGlmeUNoYW5nZSgpIHVubGVzcyBAc2V0dGluZ3MudXBkYXRlV2hlbiBpcyAnYXBwbGllZCdcblxuXHRfYXBwbHlDaGFuZ2VzOiAoKS0+XG5cdFx0dmFsaWRhdGlvbiA9IEB2YWxpZGF0ZSgpXG5cdFx0aWYgdmFsaWRhdGlvbiBpcyB0cnVlXG5cdFx0XHRAc3RhdGUudmFsdWVPbkZvY3VzID0gbnVsbFxuXHRcdFx0QF9ub3RpZnlDaGFuZ2UoKVxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHRcblx0XHRlbHNlIGlmIHZhbGlkYXRpb24gaW5zdGFuY2VvZiBFcnJvclxuXHRcdFx0QGJ1dHRvbi5jaGlsZC5lcnJvck1lc3NhZ2Uuc2V0KHZhbGlkYXRpb24ubWVzc2FnZSlcblx0XHRcdEBlbWl0ICdlcnJvcicsIHZhbGlkYXRpb25cblx0XHRcdHJldHVybiBmYWxzZVxuXG5cdGdldDogKHNraXBUcmFuc2Zvcm0pLT5cblx0XHR2YWx1ZSA9IEBvcHRpb24uZ2V0dGVyLmNhbGwoQClcblx0XHR2YWx1ZSA9IEBvcHRpb24udHJhbnNmb3JtT3V0cHV0KHZhbHVlKSBpZiBAb3B0aW9uLnRyYW5zZm9ybU91dHB1dCBhbmQgbm90IHNraXBUcmFuc2Zvcm1cblx0XHRyZXR1cm4gdmFsdWVcblx0XG5cdHNldDogKHZhbHVlLCBTSUxFTlQpLT5cblx0XHR2YWx1ZSA9IHZhbHVlKCkgaWYgdHlwZW9mIHZhbHVlIGlzICdmdW5jdGlvbidcblx0XHR2YWx1ZSA9IEBvcHRpb24udHJhbnNmb3JtSW5wdXQodmFsdWUpIGlmIEBvcHRpb24udHJhbnNmb3JtSW5wdXRcblx0XHRAX3VwZGF0ZUZyb21Vc2VyKHZhbHVlLCBTSUxFTlQpXG5cblx0dmFsaWRhdGU6ICgpLT5cblx0XHRyZXR1cm4gdHJ1ZSBpZiBub3QgQG9wdGlvbi52YWxpZGF0ZVxuXHRcdHRyeVxuXHRcdFx0cmVzdWx0ID0gQG9wdGlvbi52YWxpZGF0ZS5jYWxsKEAsIEB2YWx1ZSlcblx0XHRjYXRjaCBlcnJcblx0XHRcdHJlc3VsdCA9IGVyclxuXG5cdFx0c3dpdGNoXG5cdFx0XHR3aGVuIHJlc3VsdCBpcyB0cnVlIHRoZW4gdHJ1ZVxuXHRcdFx0d2hlbiByZXN1bHQgaXMgZmFsc2UgdGhlbiBuZXcgVmFsaWRhdGlvbkVycm9yKFwidmFsaWRhdGlvbiBmYWlsZWRcIilcblx0XHRcdHdoZW4gdHlwZW9mIHJlc3VsdCBpcyAnc3RyaW5nJyB0aGVuIG5ldyBWYWxpZGF0aW9uRXJyb3IocmVzdWx0KVxuXHRcdFx0d2hlbiByZXN1bHQgaW5zdGFuY2VvZiBFcnJvciB0aGVuIHJlc3VsdFxuXG5cdFxuXG5cdGFwcGVuZFRvOiAodGFyZ2V0KS0+IEBfZG9tSW5zZXJ0ICdhcHBlbmRUbycsIHRhcmdldFxuXHRwcmVwZW5kVG86ICh0YXJnZXQpLT4gQF9kb21JbnNlcnQgJ3ByZXBlbmRUbycsIHRhcmdldFxuXHRpbnNlcnRCZWZvcmU6ICh0YXJnZXQpLT4gQF9kb21JbnNlcnQgJ2luc2VydEJlZm9yZScsIHRhcmdldFxuXHRpbnNlcnRBZnRlcjogKHRhcmdldCktPiBAX2RvbUluc2VydCAnaW5zZXJ0QWZ0ZXInLCB0YXJnZXRcblx0XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMgQDo6LFxuXHRcdGVsczogZ2V0OiAoKS0+IEBlbC5jaGlsZFxuXHRcdHZhbHVlOiBnZXQ6ICgpLT4gQGdldCgpXG5cdFx0cmF3VmFsdWU6IGdldDogKCktPiBAZ2V0KHRydWUpXG5cblxuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBUYWciLCJleHBvcnRzLmFycm93RG93biA9IFwiXCJcIlxuXHRkYXRhOmltYWdlL3N2Zyt4bWw7dXRmODtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaWFYTnZMVGc0TlRrdE1TSS9QZ284SVMwdElFZGxibVZ5WVhSdmNqb2dRV1J2WW1VZ1NXeHNkWE4wY21GMGIzSWdNVGd1TVM0eExDQlRWa2NnUlhod2IzSjBJRkJzZFdjdFNXNGdMaUJUVmtjZ1ZtVnljMmx2YmpvZ05pNHdNQ0JDZFdsc1pDQXdLU0FnTFMwK0NqeHpkbWNnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUI0Yld4dWN6cDRiR2x1YXowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1UazVPUzk0YkdsdWF5SWdkbVZ5YzJsdmJqMGlNUzR4SWlCcFpEMGlRMkZ3WVY4eElpQjRQU0l3Y0hnaUlIazlJakJ3ZUNJZ2RtbGxkMEp2ZUQwaU1DQXdJRE13T1M0eE5UWWdNekE1TGpFMU5pSWdjM1I1YkdVOUltVnVZV0pzWlMxaVlXTnJaM0p2ZFc1a09tNWxkeUF3SURBZ016QTVMakUxTmlBek1Ea3VNVFUyT3lJZ2VHMXNPbk53WVdObFBTSndjbVZ6WlhKMlpTSWdkMmxrZEdnOUlqWTBjSGdpSUdobGFXZG9kRDBpTmpSd2VDSStDanhuUGdvSlBHYytDZ2tKUEhCdmJIbG5iMjRnY0c5cGJuUnpQU0l5T0RndU5EWXhMRFkwTGpreU9TQXhOVFF1TlRnNUxESXdNaTQzTmpZZ01qQXVOekl6TERZMExqazBJREFzT0RVdU1EY2dNVFUwTGpVNE9Td3lORFF1TWpJNElETXdPUzR4TlRZc09EVXVNRGNnSUNBaUlHWnBiR3c5SWlNd01EQXdNREFpTHo0S0NUd3ZaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhMM04yWno0S1xuXCJcIlwiXG5cbiMgZXhwb3J0cy5jaGVja21hcmsgPSBcIlwiXCJcbiMgXHRkYXRhOmltYWdlL3N2Zyt4bWw7dXRmODtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaWFYTnZMVGc0TlRrdE1TSS9QZ284SVMwdElFZGxibVZ5WVhSdmNqb2dRV1J2WW1VZ1NXeHNkWE4wY21GMGIzSWdNVFl1TUM0d0xDQlRWa2NnUlhod2IzSjBJRkJzZFdjdFNXNGdMaUJUVmtjZ1ZtVnljMmx2YmpvZ05pNHdNQ0JDZFdsc1pDQXdLU0FnTFMwK0Nqd2hSRTlEVkZsUVJTQnpkbWNnVUZWQ1RFbERJQ0l0THk5WE0wTXZMMFJVUkNCVFZrY2dNUzR4THk5RlRpSWdJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5MMGR5WVhCb2FXTnpMMU5XUnk4eExqRXZSRlJFTDNOMlp6RXhMbVIwWkNJK0NqeHpkbWNnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUI0Yld4dWN6cDRiR2x1YXowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1UazVPUzk0YkdsdWF5SWdkbVZ5YzJsdmJqMGlNUzR4SWlCcFpEMGlRMkZ3WVY4eElpQjRQU0l3Y0hnaUlIazlJakJ3ZUNJZ2QybGtkR2c5SWpZMGNIZ2lJR2hsYVdkb2REMGlOalJ3ZUNJZ2RtbGxkMEp2ZUQwaU1DQXdJRFl4TWk0d01EVWdOakV5TGpBd05TSWdjM1I1YkdVOUltVnVZV0pzWlMxaVlXTnJaM0p2ZFc1a09tNWxkeUF3SURBZ05qRXlMakF3TlNBMk1USXVNREExT3lJZ2VHMXNPbk53WVdObFBTSndjbVZ6WlhKMlpTSStDanhuUGdvSlBHY2dhV1E5SW5ScFkyc2lQZ29KQ1R4blBnb0pDUWs4Y0dGMGFDQmtQU0pOTlRrMUxqWXdNU3c0TVM0MU5UTmpMVEl4TGpnNU1pMHlNUzQ0T1RFdE5UY3VNell5TFRJeExqZzVNUzAzT1M0eU5UTXNNRXd4T0RNdU1ETXNOREUwTGpnM2JDMDRPQzQyTWprdE56WXVNVE16SUNBZ0lDQmpMVEl4TGpVNU1pMHlNUzQxT1RNdE5UWXVOVGsyTFRJeExqVTVNeTAzT0M0eU1EY3NNR010TWpFdU5Ua3lMREl4TGpVNU1pMHlNUzQxT1RJc05UWXVOakUwTERBc056Z3VNakEyYkRFek1pNDBNVElzTVRFekxqY3pNeUFnSUNBZ1l6SXhMalU1TWl3eU1TNDFPVE1zTlRZdU5UazJMREl4TGpVNU15dzNPQzR5TURjc01HTXlMakUyTnkweUxqRTJOaXd6TGprM09TMDBMalUzTml3MUxqY3hOaTAyTGprNE5XTXdMak14Tnkwd0xqSTVPU3d3TGpZM01pMHdMalV3TlN3d0xqazVMVEF1T0RBMGJETTJNaTR3T0RNdE16WXlMakV3TVNBZ0lDQWdRell4Tnk0ME56TXNNVE00TGpreE5DdzJNVGN1TkRjekxERXdNeTQwTWpVc05UazFMall3TVN3NE1TNDFOVE42SWlCbWFXeHNQU0lqTURBd01EQXdJaTgrQ2drSlBDOW5QZ29KUEM5blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p4blBnbzhMMmMrQ2p3dmMzWm5QZ289XG4jIFwiXCJcIiIsImltcG9ydCBET00gZnJvbSAncXVpY2tkb20nXG5pbXBvcnQgKiBhcyBTVkcgZnJvbSAnLi4vc3ZnJ1xuaW1wb3J0IHtidXR0b24gYXMgYnV0dG9uX30gZnJvbSAnLi4vcG9wdXAvdGVtcGxhdGUnXG5cbmV4cG9ydCBidXR0b24gPSBidXR0b25fLmV4dGVuZChcblx0WydkaXYnXG5cdFx0Y29tcHV0ZXJzOiBfaW5pdDogKCktPlxuXHRcdFx0QGFwcGx5RGF0YSB0ZXh0OlwiQWRkICN7QHJlbGF0ZWQuc2V0dGluZ3MuaXRlbUxhYmVsfVwiXG5cdF1cbilcblxuZXhwb3J0IGFycm93ID0gRE9NLnRlbXBsYXRlKFxuXHRbJ2Rpdidcblx0XHRyZWY6ICdhcnJvdydcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXG5cdFx0XHR6SW5kZXg6IDJcblx0XHRcdHJpZ2h0OiAnMTVweCdcblx0XHRcdHRvcDogJzU0JSdcblx0XHRcdHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUoMCwgLTUwJSlcIlxuXHRcdFx0d2lkdGg6ICcxN3B4J1xuXHRcdFx0aGVpZ2h0OiAnMTdweCdcblx0XHRcdGJhY2tncm91bmRTaXplOiAnMTAwJSdcblx0XHRcdGJhY2tncm91bmRJbWFnZTogXCJ1cmwoI3tTVkcuYXJyb3dEb3dufSlcIlxuXHRcdFx0b3BhY2l0eTogMC41XG5cdF1cbilcblxuZXhwb3J0IGZha2UgPSBET00udGVtcGxhdGUoXG5cdFsnZGl2J1xuXHRcdHJlZjogJ2Zha2UnXG5cdFx0c3R5bGU6XG5cdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJ1xuXHRcdFx0ekluZGV4OiAxXG5cdFx0XHRsZWZ0OiAwXG5cdFx0XHR0b3A6ICc1MyUnXG5cdFx0XHR0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDAsIC01MCUpXCJcblx0XHRcdGhlaWdodDogJzE2cHgnXG5cdFx0XHRwYWRkaW5nOiAnMCAxNXB4J1xuXHRcdFx0Zm9udFNpemU6ICcxNnB4J1xuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxXG5cdFx0XHR0ZXh0QWxpZ246ICdsZWZ0J1xuXHRcdFx0dXNlclNlbGVjdDogJ25vbmUnXG5cdFx0XHRib3hTaXppbmc6ICdib3JkZXItYm94J1xuXHRcdFx0Y29sb3I6ICcjMTgxODE4J1xuXHRcdFx0b3BhY2l0eTogMC42XG5cdFx0XHQkaGFzQ29udGVudDpcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRdXG4pXG5cbmV4cG9ydCBpbnB1dCA9IERPTS50ZW1wbGF0ZShcblx0WydzZWxlY3QnXG5cdFx0cmVmOiAnaW5wdXQnXG5cdFx0Zm9yY2VTdHlsZTogdHJ1ZVxuXHRcdHN0eWxlOlxuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZSdcblx0XHRcdHpJbmRleDogM1xuXHRcdFx0dG9wOiAwXG5cdFx0XHRsZWZ0OiAwXG5cdFx0XHR3aWR0aDogJzEwMCUnXG5cdFx0XHRoZWlnaHQ6ICcxMDAlJ1xuXHRcdFx0b3BhY2l0eTogMFxuXG5cdFx0Y29tcHV0ZXJzOiBfaW5pdDogKCktPlxuXHRcdFx0RE9NLm9wdGlvbihwcm9wczp7dmFsdWU6Jyd9LCBcIlNlbGVjdCAje0ByZWxhdGVkLnNldHRpbmdzLnRhZ0xhYmVsfVwiKS5hcHBlbmRUbyhAKVxuXG5cdFx0bWV0aG9kczpcblx0XHRcdGxhYmVsOiBnZXQ6ICgpLT5cblx0XHRcdFx0c2VsZWN0ZWQgPSBAcmF3LnNlbGVjdGVkSW5kZXggb3IgMFxuXHRcdFx0XHRyZXR1cm4gQHJhdy5vcHRpb25zW3NlbGVjdGVkXT8ubGFiZWxcblx0XHRcdFxuXHRcdFx0dmFsdWU6XG5cdFx0XHRcdGdldDogKCktPiBAcmF3LnZhbHVlXG5cdFx0XHRcdHNldDogKHZhbHVlKS0+IEByYXcudmFsdWUgPSB2YWx1ZVxuXHRdXG4pXG5cbmV4cG9ydCBmaWVsZCA9IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAnc2VsZWN0RmllbGQnXG5cdFx0c3R5bGU6XG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuXHRcdFx0IyB3aWR0aDogJzEwMCUnXG5cdFx0XHRtaW5XaWR0aDogMjMwXG5cdFx0XHRoZWlnaHQ6ICc1NXB4J1xuXHRcdFx0Ym9yZGVyQm90dG9tOiAnMXB4IHNvbGlkICNkZGQnXG5cblx0XHRhcnJvd1xuXHRcdGZha2Vcblx0XHRpbnB1dFxuXHRdXG4pXG5cblxuXG4iLCJpbXBvcnQgRE9NIGZyb20gJ3F1aWNrZG9tJ1xuaW1wb3J0ICogYXMgdGVtcGxhdGUgZnJvbSAnLi90ZW1wbGF0ZSdcblxuY2xhc3MgU2VsZWN0RmllbGQgZXh0ZW5kcyByZXF1aXJlKCdldmVudC1saXRlJylcblx0Y29uc3RydWN0b3I6IChAc2V0dGluZ3MpLT5cblx0XHRzdXBlcigpXG5cdFx0QGZpZWxkID0gdGVtcGxhdGUuZmllbGQuc3Bhd24obnVsbCwge3JlbGF0ZWRJbnN0YW5jZTpAfSlcblx0XHRAaW5wdXQgPSBAZmllbGQuY2hpbGQuaW5wdXRcblx0XHRAX2F0dGFjaEJpbmRpbmdzKClcblx0XHRAX3NldFVpTGFiZWwoQGxhYmVsKVxuXG5cdF9hdHRhY2hCaW5kaW5nczogKCktPlxuXHRcdEBmaWVsZC5vbiAnaW5wdXQnLCAoKT0+XG5cdFx0XHRAZW1pdCAnY2hhbmdlJywge0BsYWJlbCwgQHZhbHVlfVxuXG5cdFx0QG9uICdjaGFuZ2UnLCAoe2xhYmVsfSktPlxuXHRcdFx0QF9zZXRVaUxhYmVsKGxhYmVsKVxuXG5cdF9zZXRVaUxhYmVsOiAobGFiZWwpLT5cblx0XHRAZmllbGQuY2hpbGQuZmFrZS5odG1sID0gbGFiZWxcblxuXHRfc2V0VmFsdWU6ICh2YWx1ZSktPlxuXHRcdEBpbnB1dC52YWx1ZSA9IHZhbHVlXG5cdFx0QF9zZXRVaUxhYmVsKEBsYWJlbClcblxuXHRzZXRPcHRpb25zOiAob3B0aW9ucyktPlxuXHRcdHByZXZPcHRpb25zID0gQGlucHV0LmNoaWxkcmVuLnNsaWNlKDEpXG5cdFx0RE9NLmJhdGNoKHByZXZPcHRpb25zKS5yZW1vdmUoKSBpZiBwcmV2T3B0aW9ucy5sZW5ndGhcblxuXHRcdGZvciB7bmFtZSxsYWJlbH0gaW4gb3B0aW9uc1xuXHRcdFx0QGlucHV0LmFwcGVuZCBET00ub3B0aW9uKHtwcm9wczp2YWx1ZTpuYW1lfSwgbGFiZWwpXG5cdFx0cmV0dXJuXG5cblxuXHRpbnNlcnRCZWZvcmU6ICh0YXJnZXQpLT5cblx0XHRAZmllbGQuaW5zZXJ0QmVmb3JlKHRhcmdldClcblxuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIEA6Oixcblx0XHRsYWJlbDpcblx0XHRcdGdldDogKCktPiBAaW5wdXQubGFiZWxcblx0XHR2YWx1ZTpcblx0XHRcdGdldDogKCktPiBAaW5wdXQudmFsdWVcblx0XHRcdHNldDogKHZhbHVlKS0+IEBfc2V0VmFsdWUodmFsdWUpXG5cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0RmllbGQiLCJpbXBvcnQgZXh0ZW5kZXIgZnJvbSAnc21hcnQtZXh0ZW5kJ1xuaW1wb3J0IFNlbGVjdEZpZWxkIGZyb20gJy4uL3NlbGVjdEZpZWxkJ1xuaW1wb3J0IFRhZyBmcm9tICcuLydcbmltcG9ydCBQb3B1cCBmcm9tICcuLi9wb3B1cCdcbmltcG9ydCAqIGFzIGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMnXG5pbXBvcnQge2NvbnRlbnQsIGJ1dHRvbn0gZnJvbSAnLi90ZW1wbGF0ZSdcblxuY2xhc3MgQnVmZmVyVGFnIGV4dGVuZHMgcmVxdWlyZSgnZXZlbnQtbGl0ZScpXG5cdGNvbnN0cnVjdG9yOiAoQGxpc3QpLT5cblx0XHRzdXBlcigpXG5cdFx0e0BzZXR0aW5nc30gPSBAbGlzdFxuXHRcdEBjb250ZW50ID0gY29udGVudC5zcGF3bihudWxsLCByZWxhdGVkSW5zdGFuY2U6QClcblx0XHRAc3RhdGUgPSB7fVxuXHRcdEBhcHBseUJ1dHRvbiA9IEBidXR0b24gPSBidXR0b24uc3Bhd24oe2RhdGE6dGV4dDpcIkFkZCAje0BzZXR0aW5ncy50YWdMYWJlbH1cIn0sIHJlbGF0ZWRJbnN0YW5jZTpAKVxuXHRcdEBhZGRCdXR0b24gPSBAbGlzdC5lbHMuYWRkQnV0dG9uXG5cdFx0QHBvcHVwID0gbmV3IFBvcHVwKEBhZGRCdXR0b24sIEBzZXR0aW5ncywgQHNldHRpbmdzLmJvdW5kaW5nRWwpXG5cdFx0QHNlbGVjdEZpZWxkID0gbmV3IFNlbGVjdEZpZWxkKEBzZXR0aW5ncylcblx0XHRcblx0XHRAY29udGVudF8gPSBET00uZGl2KG51bGwsIEBjb250ZW50KVxuXHRcdEBzZWxlY3RGaWVsZC5pbnNlcnRCZWZvcmUoQGNvbnRlbnQpXG5cdFx0QGFwcGx5QnV0dG9uLmluc2VydEFmdGVyKEBjb250ZW50KVxuXHRcdEBwb3B1cC5zZXRDb250ZW50KEBjb250ZW50Xylcblx0XHRAX3NldHVwKClcblxuXHRfc2V0dXA6ICgpLT5cblx0XHRAYXBwbHlCdXR0b24ub24gJ2NsaWNrJywgKCk9PlxuXHRcdFx0QF9hcHBseUNoYW5nZXMoKSBpZiBAX3ZhbGlkYXRlSGFzRmllbGQoKVxuXG5cdFx0QGFkZEJ1dHRvbi5vbiAnY2xpY2snLCAoKT0+XG5cdFx0XHRAcG9wdXAub3BlbigpXG5cblx0XHRAc2VsZWN0RmllbGQub24gJ2NoYW5nZScsICh7dmFsdWV9KT0+XG5cdFx0XHRAX3NldEN1cnJlbnQodmFsdWUpXG5cblx0X3NldEN1cnJlbnQ6IChuYW1lKS0+XG5cdFx0QGNvbnRlbnQuZW1wdHkoKVxuXHRcdEBvcHRpb24gPSBAbGlzdC5fZmluZE9wdGlvbihuYW1lKVxuXG5cdFx0aWYgQG9wdGlvblxuXHRcdFx0QG9wdGlvbiA9IGV4dGVuZGVyLmNsb25lKGRlZmF1bHRzLm9wdGlvbiwgQG9wdGlvbilcblx0XHRcdEBfaW5pdEZpZWxkKClcblx0XHRlbHNlXG5cdFx0XHRAZmllbGQgPSBudWxsXG5cblx0XHRAc2VsZWN0RmllbGQudmFsdWUgPSBuYW1lIHVubGVzcyBAc2VsZWN0RmllbGQudmFsdWUgaXMgbmFtZVxuXG5cblx0X3ZhbGlkYXRlSGFzRmllbGQ6ICgpLT5cblx0XHRpZiBAZmllbGRcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0ZWxzZVxuXHRcdFx0QGJ1dHRvbi5jaGlsZC5lcnJvck1lc3NhZ2Uuc2V0KCdZb3UgbXVzdCBzZWxlY3QgYSBmaWVsZCBmaXJzdCcpXG5cdFx0XHRyZXR1cm4gZmFsc2VcblxuXHRfdXBkYXRlU2VsZWN0YWJsZTogKCktPlxuXHRcdGlmIEBzZXR0aW5ncy5yZXBlYXRhYmxlVmFsdWVzXG5cdFx0XHRvcHRpb25zID0gQGxpc3Qub3B0aW9uc1xuXHRcdGVsc2Vcblx0XHRcdG9wdGlvbnMgPSBAbGlzdC5vcHRpb25zLmZpbHRlciAoe25hbWV9KT0+IEBsaXN0Ll9maW5kVGFnKG5hbWUpXG5cdFx0XG5cdFx0QHNlbGVjdEZpZWxkLnNldE9wdGlvbnMob3B0aW9ucylcblx0XG5cdF9ub3RpZnlDaGFuZ2U6ICgpLT5cblx0XHRAZW1pdCAnY2hhbmdlJywgQG9wdGlvbiwgQHZhbHVlXG5cdFx0QF9yZXNldCgpXG5cblx0X3VwZGF0ZUZyb21Vc2VyOiAodmFsdWUpLT5cblx0XHRAb3B0aW9uLnNldHRlci5jYWxsKEAsIHZhbHVlKVxuXG5cdF91cGRhdGVGcm9tRmllbGQ6ICh2YWx1ZSktPlxuXHRcdDtcblxuXHRfcmVzZXQ6ICgpLT5cblx0XHRAX3NldEN1cnJlbnQoJycpXG5cdFx0QHBvcHVwLmNsb3NlKClcblx0XG5cdGdldDogVGFnOjpnZXRcblx0c2V0OiBUYWc6OnNldFxuXHR2YWxpZGF0ZTogVGFnOjp2YWxpZGF0ZVxuXHRfaW5pdEZpZWxkOiBUYWc6Ol9pbml0RmllbGRcblx0X2FwcGx5Q2hhbmdlczogVGFnOjpfYXBwbHlDaGFuZ2VzXG5cdFxuXHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyBAOjosXG5cdFx0ZWxzOiBnZXQ6ICgpLT4gQGVsLmNoaWxkXG5cdFx0dmFsdWU6IGdldDogKCktPiBAZ2V0KClcblxuXG5leHBvcnQgZGVmYXVsdCBCdWZmZXJUYWciLCJleHBvcnQgdG9BcnJheSA9IChvYmplY3QpLT5cblx0aWYgQXJyYXkuaXNBcnJheShvYmplY3QpXG5cdFx0cmV0dXJuIG9iamVjdFxuXHRlbHNlXG5cdFx0e25hbWUsdmFsdWV9IGZvciBuYW1lLHZhbHVlIG9mIG9iamVjdFxuXG4iLCJpbXBvcnQgZXh0ZW5kZXIgZnJvbSAnc21hcnQtZXh0ZW5kJ1xuaW1wb3J0IERPTSBmcm9tICdxdWlja2RvbSdcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2RlZmF1bHRzJ1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vdGVtcGxhdGUnXG5pbXBvcnQgVGFnIGZyb20gJy4uL3RhZydcbmltcG9ydCBCdWZmZXJUYWcgZnJvbSAnLi4vdGFnL2J1ZmZlcidcbmltcG9ydCBQb3B1cCBmcm9tICcuLi9wb3B1cCdcbmltcG9ydCB7dG9BcnJheX0gZnJvbSAnLi4vaGVscGVycydcblxuY2xhc3MgVGFnTGlzdCBleHRlbmRzIHJlcXVpcmUoJ2V2ZW50LWxpdGUnKVxuXHRjb25zdHJ1Y3RvcjogKEB0YXJnZXRDb250YWluZXIsIEBvcHRpb25zPVtdLCBzZXR0aW5ncyktPlxuXHRcdHN1cGVyKClcblx0XHRAc2V0dGluZ3MgPSBleHRlbmRlci5kZWVwT25seSgnYnV0dG9uJykuY2xvbmUoZGVmYXVsdHMsIHNldHRpbmdzKVxuXHRcdEBzZXR0aW5ncy5ib3VuZGluZ0VsID0gRE9NKEBzZXR0aW5ncy5ib3VuZGluZ0VsKVxuXHRcdEBzZXR0aW5ncy5kZWZhdWx0cyA9IHRvQXJyYXkoQHNldHRpbmdzLmRlZmF1bHRzIG9yIFtdKVxuXHRcdEB0YWdzID0gW11cblx0XHRAZWwgPSB0ZW1wbGF0ZS5zcGF3bihudWxsLCByZWxhdGVkSW5zdGFuY2U6QClcblx0XHRAYnVmZmVyID0gbmV3IEJ1ZmZlclRhZyhAKVxuXHRcdG9wdGlvbi5uYW1lID89IG9wdGlvbi5sYWJlbCBmb3Igb3B0aW9uIGluIEBvcHRpb25zXG5cdFx0XG5cdFx0QF9hcHBseURlZmF1bHRzKEBzZXR0aW5ncy5kZWZhdWx0cylcblx0XHRAX2F0dGFjaEJpbmRpbmdzKClcblx0XHRAZWwuYXBwZW5kVG8oQHRhcmdldENvbnRhaW5lcilcblx0XHRAYnVmZmVyLl91cGRhdGVTZWxlY3RhYmxlKClcblxuXG5cdF9hdHRhY2hCaW5kaW5nczogKCktPlxuXHRcdEBidWZmZXIub24gJ2NoYW5nZScsIChvcHRpb24sIHZhbHVlKT0+XG5cdFx0XHRAYWRkKG9wdGlvbiwgdmFsdWUpXG5cdFx0XHRAX25vdGlmeUNoYW5nZSgpXG5cdFx0XG5cdFx0QGJ1ZmZlci5wb3B1cC5vbiAnYmVmb3Jlb3BlbicsICgpPT5cblx0XHRcdEBjbG9zZUFsbFBvcHVwcygpXG5cdFx0XG5cdFx0QG9uICdjaGFuZ2UnLCAoKT0+XG5cdFx0XHRAYnVmZmVyLl91cGRhdGVTZWxlY3RhYmxlKClcblxuXHRcdGlmIEBzZXR0aW5ncy5vbkNoYW5nZVxuXHRcdFx0QG9uICdjaGFuZ2UnLCBAc2V0dGluZ3Mub25DaGFuZ2VcblxuXHRcblx0X2FwcGx5RGVmYXVsdHM6IChkZWZhdWx0cyktPlxuXHRcdGRlZmF1bHRzID0gdG9BcnJheShkZWZhdWx0cylcblxuXHRcdGZvciB7bmFtZSwgdmFsdWV9IGluIGRlZmF1bHRzIHdoZW4gdmFsdWVcblx0XHRcdG9wdGlvbiA9IEBfZmluZE9wdGlvbihuYW1lKVxuXHRcdFx0dmFsdWUgPSB2YWx1ZSgpIGlmIHR5cGVvZiB2YWx1ZSBpcyAnZnVuY3Rpb24nXG5cdFx0XHRAYWRkKG9wdGlvbiwgdmFsdWUpXG5cdFx0cmV0dXJuXG5cblx0X25vdGlmeUNoYW5nZTogKFNJTEVOVCktPiB1bmxlc3MgU0lMRU5UXG5cdFx0QGVtaXQgJ2NoYW5nZScsIEBnZXRWYWx1ZXModHJ1ZSlcblxuXHRfZmluZE9wdGlvbjogKG5hbWUsIGNvbGxlY3Rpb249QG9wdGlvbnMpLT5cblx0XHRyZXR1cm4gY29sbGVjdGlvbi5maW5kIChvcHRpb24pLT4gb3B0aW9uLm5hbWUgaXMgbmFtZVxuXHRcblx0X2ZpbmRUYWc6IChuYW1lLCBjb2xsZWN0aW9uPUB0YWdzKS0+XG5cdFx0cmV0dXJuIGNvbGxlY3Rpb24uZmluZCAodGFnKS0+IHRhZy5uYW1lIGlzIG5hbWVcblx0XG5cdF9maW5kRGVmYXVsdDogKG5hbWUpLT5cblx0XHRyZXR1cm4gQHNldHRpbmdzLmRlZmF1bHRzLmZpbmQgKGRlZmF1bHRfKS0+IGRlZmF1bHRfLm5hbWUgaXMgbmFtZVxuXG5cdGFkZE9wdGlvbjogKG9wdGlvbiktPlxuXHRcdHVubGVzcyBAX2ZpbmRPcHRpb24ob3B0aW9uLm5hbWUpXG5cdFx0XHRAb3B0aW9ucy5wdXNoKG9wdGlvbilcblxuXHRhZGQ6IChvcHRpb24sIHZhbHVlKS0+XG5cdFx0b3B0aW9uID0gQF9maW5kT3B0aW9uKG9wdGlvbikgaWYgdHlwZW9mIG9wdGlvbiBpcyAnc3RyaW5nJ1xuXHRcdHRhZyA9IG5ldyBUYWcob3B0aW9uLCBAc2V0dGluZ3MpXG5cblx0XHR0YWcuaW5zZXJ0QmVmb3JlIEBlbHMuYWRkQnV0dG9uXG5cdFx0dGFnLnNldCh2YWx1ZSwgdHJ1ZSkgaWYgdmFsdWU/XG5cdFx0dGFnLm9uY2UgJ3JlbW92ZScsICgpPT4gQHJlbW92ZSh0YWcpXG5cdFx0dGFnLm9uICdjaGFuZ2UnLCAoKT0+IEBfbm90aWZ5Q2hhbmdlKClcblx0XHR0YWcucG9wdXAub24gJ2JlZm9yZW9wZW4nLCAoKT0+IEBjbG9zZUFsbFBvcHVwcygpXG5cdFx0XG5cdFx0QHRhZ3MucHVzaCh0YWcpXG5cblx0cmVtb3ZlOiAodGFnLCBTSUxFTlQpLT5cblx0XHR0YWcgPSBAdGFnc0J5TmFtZVt0YWddIGlmIHR5cGVvZiB0YWcgaXMgJ3N0cmluZydcblx0XHR0YWcucG9wdXAuY2xvc2UoKVxuXHRcdHRhZ0luZGV4ID0gQHRhZ3MuaW5kZXhPZih0YWcpXG5cblx0XHRpZiBAc2V0dGluZ3MucmVxdWlyZURlZmF1bHRzIGFuZCBAX2ZpbmREZWZhdWx0KHRhZy5uYW1lKVxuXHRcdFx0dGFnLnNldChAX2ZpbmREZWZhdWx0KHRhZy5uYW1lKSwgdHJ1ZSlcblx0XHRcdEB0YWdzLnNwbGljZSB0YWdJbmRleCwgMSwgdGFnXG5cdFx0ZWxzZVxuXHRcdFx0dGFnLmVsLnJlbW92ZSgpXG5cdFx0XHRAdGFncy5zcGxpY2UgdGFnSW5kZXgsIDFcblxuXHRcdEBfbm90aWZ5Q2hhbmdlKFNJTEVOVClcblx0XHRyZXR1cm5cblxuXHRyZW1vdmVBbGw6IChTSUxFTlQpLT5cblx0XHRAcmVtb3ZlKHRhZywgdHJ1ZSkgZm9yIHRhZyBpbiBAdGFncy5zbGljZSgpXG5cdFx0QF9ub3RpZnlDaGFuZ2UoU0lMRU5UKVxuXHRcdHJldHVyblxuXG5cdHNldFZhbHVlczogKHZhbHVlcywgU0lMRU5UKS0+XHRcdFxuXHRcdGZvciB7bmFtZSx2YWx1ZX0saW5kZXggaW4gdG9BcnJheSh2YWx1ZXMpXG5cdFx0XHRAc2V0VmFsdWUobmFtZSwgdmFsdWUsIHRydWUsIGluZGV4KVxuXHRcdFxuXHRcdEBfbm90aWZ5Q2hhbmdlKFNJTEVOVClcblxuXHRzZXRWYWx1ZTogKG5hbWUsIHZhbHVlLCBTSUxFTlQsIGZyb21JbmRleCktPlxuXHRcdGNvbGxlY3Rpb24gPSBpZiBmcm9tSW5kZXggdGhlbiBAdGFncy5zbGljZShmcm9tSW5kZXgpIGVsc2UgQHRhZ3Ncblx0XHRleGlzdGluZyA9IEBfZmluZFRhZyhuYW1lLCBjb2xsZWN0aW9uKVxuXHRcdFxuXHRcdGlmIGV4aXN0aW5nXG5cdFx0XHRleGlzdGluZy5zZXQodmFsdWUsIHRydWUpXG5cdFx0XG5cdFx0ZWxzZSBpZiBAX2ZpbmRPcHRpb24obmFtZSlcblx0XHRcdEBhZGQobmFtZSwgdmFsdWUpXG5cblx0XHRAX25vdGlmeUNoYW5nZShTSUxFTlQpXG5cblx0cmVwbGFjZVZhbHVlczogKHZhbHVlcywgU0lMRU5UKS0+XG5cdFx0QHJlbW92ZUFsbCh0cnVlKVxuXHRcdEBzZXRWYWx1ZXModmFsdWVzLCB0cnVlKVxuXHRcdEBfbm90aWZ5Q2hhbmdlKFNJTEVOVClcblxuXHRnZXRWYWx1ZXM6ICgpLT5cblx0XHRAdGFncy5tYXAgKHRhZyktPlxuXHRcdFx0bmFtZTogdGFnLm5hbWVcblx0XHRcdHZhbHVlOiB0YWcudmFsdWVcblxuXG5cdGNsb3NlQWxsUG9wdXBzOiAoKS0+XG5cdFx0QGJ1ZmZlci5wb3B1cC5jbG9zZSgpXG5cdFx0dGFnLnBvcHVwLmNsb3NlKCkgZm9yIHRhZyBpbiBAdGFnc1xuXHRcdHJldHVyblxuXG5cdGRlc3Ryb3k6ICgpLT5cblx0XHRAY2xvc2VBbGxQb3B1cHMoKVxuXHRcdEBlbC5yZW1vdmUoKVxuXHRcdEBlbWl0ICdkZXN0cm95J1xuXHRcdHJldHVyblxuXHRcblxuXG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMgQDo6LFxuXHRcdCdlbHMnOiBnZXQ6ICgpLT4gQGVsLmNoaWxkXG5cdFx0J3RhZ3NCeU5hbWUnOiBnZXQ6ICgpLT5cblx0XHRcdHRhZ3MgPSBAdGFnc1xuXHRcdFx0bmV3ICgpLT4gQFt0YWcubmFtZV0gPSB0YWcgZm9yIHRhZyBpbiB0YWdzOyBAXG5cblxuXG5leHBvcnQgZGVmYXVsdCBUYWdMaXN0Il0sIm5hbWVzIjpbImJvdW5kaW5nRWwiLCJkb2N1bWVudCIsImJvZHkiLCJ0YWdMYWJlbCIsInJlcXVpcmVEZWZhdWx0cyIsInRlbXBsYXRlcyIsImRlZmF1bHRzIiwidGFncyIsImZvbnRGYW1pbHkiLCJidXR0b24iLCJiZ0NvbG9yIiwidGV4dENvbG9yIiwiYWRkQnV0dG9uIiwiRE9NIiwidGVtcGxhdGUiLCJyZWYiLCJzdHlsZSIsInBvc2l0aW9uIiwiZGlzcGxheSIsInZlcnRpY2FsQWxpZ24iLCJoZWlnaHQiLCJ3aWR0aCIsImJveFNpemluZyIsImJvcmRlciIsImJvcmRlclJhZGl1cyIsImN1cnNvciIsInVzZXJTZWxlY3QiLCJvcGFjaXR5IiwiY29sb3IiLCJsZWZ0IiwicmlnaHQiLCJ0b3AiLCJ0cmFuc2Zvcm0iLCJsaW5lSGVpZ2h0IiwidGV4dEFsaWduIiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwidGFnbGlzdCIsInNldHRpbmdzIiwiYmFja2dyb3VuZENvbG9yIiwiaSIsImNvbXB1dGVycyIsInRleHRUcmFuc2Zvcm0iLCJsZXR0ZXJTcGFjaW5nIiwidGV4dCIsInNpemUiLCJmb250IiwiekluZGV4IiwiYm94U2hhZG93IiwicG9wdXAiLCJQb3B1cCIsInJlcXVpcmUiLCJjb25zdHJ1Y3RvciIsInBhcmVudCIsInN0YXRlIiwib3BlbiIsImVsIiwic3Bhd24iLCJyZWxhdGVkSW5zdGFuY2UiLCJoaWRlIiwiYXBwZW5kVG8iLCJwb3BwZXIiLCJQb3BwZXIiLCJwbGFjZW1lbnQiLCJ0cmlnZ2VyIiwibW9kaWZpZXJzIiwib2Zmc2V0IiwiZW5hYmxlZCIsInByZXZlbnRPdmVyZmxvdyIsImJvdW5kcmllc0VsZW1lbnQiLCJfYXR0YWNoT3V0ZXJDbGlja0xpc3RlbmVyIiwib24iLCJldmVudCIsInRhcmdldFBhcmVudHMiLCJ0YXJnZXQiLCJwYXJlbnRzIiwiaW5jbHVkZXMiLCJjbG9zZSIsImVtaXQiLCJfZGV0YWNoT3V0ZXJDbGlja0xpc3RlbmVyIiwib2ZmIiwic2hvdyIsInVwZGF0ZSIsInNldENvbnRlbnQiLCJjb250ZW50IiwiZWxzIiwiZW1wdHkiLCJhcHBlbmQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0aWVzIiwicHJvdG90eXBlIiwiZ2V0IiwiY2hpbGQiLCJ2YWx1ZSIsImZvcm1hdHRlciIsImFsaWFzIiwiQXJyYXkiLCJpc0FycmF5IiwiZmluZCIsImNhbmRpZGF0ZSIsImxhYmVsIiwibmFtZSIsInRhZyIsInVwZGF0ZXIiLCJuZXdWYWx1ZSIsIl91cGRhdGVGcm9tRmllbGQiLCJwYWRkaW5nIiwibWV0aG9kcyIsInNldCIsIm1lc3NhZ2UiLCJodG1sIiwiY2xlYXJUaW1lb3V0IiwiX3RpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2xlYXIiLCJidXR0b25fIiwiZXh0ZW5kIiwiJGhvdmVyIiwicmVtb3ZlQnV0dG9uIiwibWF4V2lkdGgiLCJtYXJnaW5SaWdodCIsIm1hcmdpbkJvdHRvbSIsInVwZGF0ZVdoZW4iLCJoaWRlTGFiZWwiLCJvcHRpb24iLCJnZXR0ZXIiLCJmaWVsZCIsInNldHRlciIsInZhbGlkYXRlIiwiVmFsaWRhdGlvbkVycm9yIiwiZXJyb3JFeCIsIlRhZyIsImxpc3RTZXR0aW5ncyIsInNldHRpbmdzMSIsInNldHRpbmdzMiIsImV4dGVuZGVyIiwia2V5cyIsImNsb25lIiwiZGF0YSIsImluc2VydEFmdGVyIiwiX3NldHVwIiwiX2F0dGFjaEJpbmRpbmdzIiwic3RvcFByb3BhZ2F0aW9uIiwiZSIsIl9hcHBseUNoYW5nZXMiLCJiYXNlIiwidmFsdWVPbkZvY3VzIiwiY29uc29sZSIsImxvZyIsIl9pbml0RmllbGQiLCJjYWxsIiwicmF3IiwiZGVmYXVsdCIsIl9kb21JbnNlcnQiLCJtZXRob2QiLCJfbm90aWZ5Q2hhbmdlIiwiX3VwZGF0ZVRleHQiLCJzdHJpbmdpZnkiLCJfdXBkYXRlRnJvbVVzZXIiLCJTSUxFTlQiLCJ2YWxpZGF0aW9uIiwiRXJyb3IiLCJlcnJvck1lc3NhZ2UiLCJza2lwVHJhbnNmb3JtIiwidHJhbnNmb3JtT3V0cHV0IiwidHJhbnNmb3JtSW5wdXQiLCJlcnIiLCJyZXN1bHQiLCJwcmVwZW5kVG8iLCJpbnNlcnRCZWZvcmUiLCJyYXdWYWx1ZSIsIl9pbml0IiwiYXBwbHlEYXRhIiwicmVsYXRlZCIsIml0ZW1MYWJlbCIsImFycm93IiwiYmFja2dyb3VuZFNpemUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJTVkciLCJmYWtlIiwiJGhhc0NvbnRlbnQiLCJpbnB1dCIsImZvcmNlU3R5bGUiLCJwcm9wcyIsInNlbGVjdGVkIiwic2VsZWN0ZWRJbmRleCIsIm1pbldpZHRoIiwiYm9yZGVyQm90dG9tIiwiU2VsZWN0RmllbGQiLCJfc2V0VWlMYWJlbCIsIl9zZXRWYWx1ZSIsInNldE9wdGlvbnMiLCJvcHRpb25zIiwibGVuIiwicHJldk9wdGlvbnMiLCJjaGlsZHJlbiIsInNsaWNlIiwibGVuZ3RoIiwiYmF0Y2giLCJyZW1vdmUiLCJCdWZmZXJUYWciLCJsaXN0IiwiYXBwbHlCdXR0b24iLCJzZWxlY3RGaWVsZCIsImNvbnRlbnRfIiwiZGl2IiwiX3ZhbGlkYXRlSGFzRmllbGQiLCJfc2V0Q3VycmVudCIsIl9maW5kT3B0aW9uIiwiX3VwZGF0ZVNlbGVjdGFibGUiLCJyZXBlYXRhYmxlVmFsdWVzIiwiZmlsdGVyIiwiX2ZpbmRUYWciLCJfcmVzZXQiLCJ0b0FycmF5Iiwib2JqZWN0IiwicmVzdWx0cyIsIlRhZ0xpc3QiLCJ0YXJnZXRDb250YWluZXIiLCJkZWVwT25seSIsImJ1ZmZlciIsIl9hcHBseURlZmF1bHRzIiwiYWRkIiwiY2xvc2VBbGxQb3B1cHMiLCJvbkNoYW5nZSIsImdldFZhbHVlcyIsImNvbGxlY3Rpb24iLCJfZmluZERlZmF1bHQiLCJkZWZhdWx0XyIsImFkZE9wdGlvbiIsInB1c2giLCJvbmNlIiwidGFnSW5kZXgiLCJ0YWdzQnlOYW1lIiwiaW5kZXhPZiIsInNwbGljZSIsInJlbW92ZUFsbCIsInNldFZhbHVlcyIsInZhbHVlcyIsImluZGV4Iiwic2V0VmFsdWUiLCJmcm9tSW5kZXgiLCJleGlzdGluZyIsInJlcGxhY2VWYWx1ZXMiLCJtYXAiLCJkZXN0cm95Il0sIm1hcHBpbmdzIjoiNmpCQUFBLGVBQ0M7RUFBQUEsVUFBQSxFQUFZQyxRQUFRLENBQUNDLElBQXJCO0VBQ0FDLFFBQUEsRUFBVSxRQURWO0VBRUFDLGVBQUEsRUFBaUIsS0FGakI7RUFHQUMsU0FBQSxFQUFXLElBSFg7RUFJQUMsUUFBQSxFQUFVLElBSlY7RUFLQUMsSUFBQSxFQUFNLElBTE47RUFNQUMsVUFBQSxFQUFZLFNBTlo7RUFPQUMsTUFBQSxFQUNDO0lBQUFDLE9BQUEsRUFBUyxTQUFUO0lBQ0FDLFNBQUEsRUFBVzs7Q0FWYixDQ0VBLElBQU9DLFNBQVAsR0FBbUJDLEtBQUcsQ0FBQ0MsUUFBSixDQUNsQixDQUFDLEtBQUQsRUFDQztFQUFBQyxHQUFBLEVBQUssV0FBTDtFQUNBQyxLQUFBLEVBQ0M7SUFBQUMsUUFBQSxFQUFVLFVBQVY7SUFDQUMsT0FBQSxFQUFTLGNBRFQ7SUFFQUMsYUFBQSxFQUFlLEtBRmY7SUFHQUMsTUFBQSxFQUFRLE1BSFI7SUFJQUMsS0FBQSxFQUFPLE1BSlA7SUFLQUMsU0FBQSxFQUFXOztDQVJiLEVBVUMsQ0FBQyxLQUFELEVBQ0M7RUFBQU4sS0FBQSxFQUdDOzs7SUFBQUksTUFBQSxFQUFRLE1BQVI7SUFDQUMsS0FBQSxFQUFPLE1BRFA7SUFFQUUsTUFBQSxFQUFRLFlBRlI7SUFHQUMsWUFBQSxFQUFjLEtBSGQ7SUFJQUYsU0FBQSxFQUFXLFlBSlg7SUFLQUcsTUFBQSxFQUFRLFNBTFI7SUFNQUMsVUFBQSxFQUFZLE1BTlo7SUFPQUMsT0FBQSxFQUFTLElBUFQ7SUFRQUMsS0FBQSxFQUFPOztDQVpULEVBY0MsQ0FBQyxLQUFELEVBQ0M7RUFBQWIsR0FBQSxFQUFLLG1CQUFMO0VBQ0FDLEtBQUEsRUFDQztJQUFBQyxRQUFBLEVBQVUsVUFBVjtJQUNBWSxJQUFBLEVBQU0sQ0FETjtJQUVBQyxLQUFBLEVBQU8sQ0FGUDtJQUdBQyxHQUFBLEVBQUssS0FITDtJQUlBQyxTQUFBLEVBQVcsb0JBSlg7SUFLQVgsS0FBQSxFQUFPLE1BTFA7SUFNQVksVUFBQSxFQUFZLENBTlo7SUFPQUMsU0FBQSxFQUFXLFFBUFg7SUFRQUMsUUFBQSxFQUFVLE1BUlY7SUFTQUMsVUFBQSxFQUFZOztDQVpkLEVBYUEsR0FiQSxDQWRELENBVkQsQ0FEa0IsQ0FBbkI7QUE4Q0EsZUFBZXZCLEtBQUcsQ0FBQ0MsUUFBSixDQUNkLENBQUMsS0FBRCxFQUNDO0VBQUFDLEdBQUEsRUFBSyxTQUFMO0VBQ0FDLEtBQUEsRUFDQztJQUFBQyxRQUFBLEVBQVUsVUFBVjtJQUNBaUIsU0FBQSxFQUFXLE1BRFg7SUFFQTFCLFVBQUEsRUFBWSxVQUFDNkIsT0FBRDthQUFZQSxPQUFPLENBQUNDLFFBQVIsQ0FBaUI5Qjs7O0NBTDNDLEVBT0NJLFNBUEQsQ0FEYyxDQUFmLENDOUNBLElBQU9ILE1BQVAsR0FBZ0JJLEtBQUcsQ0FBQ0MsUUFBSixDQUNmLENBQUMsS0FBRCxFQUNDO0VBQUFDLEdBQUEsRUFBSyxRQUFMO0VBQ0FDLEtBQUEsRUFDQztJQUFBQyxRQUFBLEVBQVUsVUFBVjtJQUNBRyxNQUFBLEVBQVEsRUFEUjtJQUVBSSxZQUFBLEVBQWMsYUFGZDtJQUdBRixTQUFBLEVBQVcsWUFIWDtJQUlBRyxNQUFBLEVBQVEsU0FKUjtJQUtBQyxVQUFBLEVBQVksTUFMWjtJQU1BYSxlQUFBLEVBQWlCLFVBQUNDLENBQUQ7YUFBTUEsQ0FBQyxDQUFDRixRQUFGLENBQVc3QixNQUFYLENBQWtCQztLQU56QztJQU9Ba0IsS0FBQSxFQUFPLFVBQUNZLENBQUQ7YUFBTUEsQ0FBQyxDQUFDRixRQUFGLENBQVc3QixNQUFYLENBQWtCRTs7R0FUaEM7RUFVQThCLFNBQUEsRUFDQztJQUFBckIsTUFBQSxFQUFRLFVBQUNBLE1BQUQ7YUFBVyxLQUFDSixLQUFELENBQU87UUFBQ0k7T0FBUjs7O0NBWnJCLEVBZUMsQ0FBQyxLQUFELEVBQ0M7RUFBQUwsR0FBQSxFQUFLLFlBQUw7RUFDQUMsS0FBQSxFQUNDO0lBQUFDLFFBQUEsRUFBVSxVQUFWO0lBQ0FjLEdBQUEsRUFBSyxLQURMO0lBRUFDLFNBQUEsRUFBVyxvQkFGWDtJQUdBZCxPQUFBLEVBQVMsT0FIVDtJQUlBRyxLQUFBLEVBQU8sTUFKUDtJQUtBYyxRQUFBLEVBQVUsRUFMVjtJQU1BRixVQUFBLEVBQVksQ0FOWjtJQU9BRyxVQUFBLEVBQVksR0FQWjtJQVFBRixTQUFBLEVBQVcsUUFSWDtJQVNBUSxhQUFBLEVBQWUsV0FUZjtJQVVBQyxhQUFBLEVBQWU7R0FaaEI7RUFhQUYsU0FBQSxFQUNDO0lBQUFHLElBQUEsRUFBTSxVQUFDQSxJQUFEO2FBQVMsS0FBQ0EsSUFBRCxHQUFRQTtLQUF2QjtJQUNBQyxJQUFBLEVBQU0sVUFBQ1YsUUFBRDthQUFhLEtBQUNuQixLQUFELENBQU87UUFBQ21CO09BQVI7S0FEbkI7SUFFQVcsSUFBQSxFQUFNLFVBQUN0QyxVQUFEO2FBQWUsS0FBQ1EsS0FBRCxDQUFPO1FBQUNSO09BQVI7OztDQWpCdkIsQ0FmRCxDQURlLENBQWhCO0FBc0NBLGlCQUFlSyxLQUFHLENBQUNDLFFBQUosQ0FDZCxDQUFDLEtBQUQsRUFDQztFQUFBQyxHQUFBLEVBQUssZUFBTDtFQUNBQyxLQUFBLEVBQ0M7SUFBQUMsUUFBQSxFQUFVLFVBQVY7SUFDQThCLE1BQUEsRUFBUSxJQURSO0lBRUFSLGVBQUEsRUFBaUIsT0FGakI7SUFHQWYsWUFBQSxFQUFjLEtBSGQ7SUFJQXdCLFNBQUEsRUFBVywrQkFKWDtJQUtBMUIsU0FBQSxFQUFXLFlBTFg7SUFNQWQsVUFBQSxFQUFZLFVBQUN5QyxLQUFEO2FBQVVBLEtBQUssQ0FBQ1gsUUFBTixDQUFlOUI7OztDQVR2QyxFQVdDLENBQUMsS0FBRCxFQUNDO0VBQUFPLEdBQUEsRUFBSztDQUROLENBWEQsQ0FEYyxDQUFmLENDeENBLElBQUFtQyxLQUFBO0FBQUE7QUFJTUE7UUFBTkEsS0FBQSxTQUFvQkMsT0FBQSxDQUFRLFlBQVIsQ0FBcEIsQ0FBQTtJQUNDQyxXQUFhLE9BQUEsVUFBQSxFQUFxQnBELFVBQXJCOztXQUFFcUQsTUFBRCxTQUFBO1dBQVVmLFFBQUQsV0FBQTtXQUVyQmdCLEtBQUQsR0FBUztRQUFBQyxJQUFBLEVBQUs7T0FBZDtXQUNDQyxFQUFELEdBQU0xQyxVQUFRLENBQUMyQyxLQUFULENBQWUsSUFBZixFQUFxQjtRQUFDQyxlQUFBLEVBQWdCO09BQXRDLENBQU47V0FFQ0YsRUFBRCxDQUFJRyxJQUFKLEdBQVdDLFFBQVgsQ0FBb0IsS0FBQ1AsTUFBckI7V0FDQ1EsTUFBRCxHQUFVLElBQUlDLE1BQUosQ0FBVyxLQUFDVCxNQUFELENBQVEsQ0FBUixDQUFYLEVBQXVCLEtBQUNHLEVBQUQsQ0FBSSxDQUFKLENBQXZCLEVBQ1Q7UUFBQU8sU0FBQSxFQUFXLFFBQVg7UUFDQUMsT0FBQSxFQUFTLFFBRFQ7UUFFQUMsU0FBQSxFQUNDO1VBQUFDLE1BQUEsRUFDQztZQUFBQyxPQUFBLEVBQVMsSUFBVDtZQUNBRCxNQUFBLEVBQVE7V0FGVDtVQUdBRSxlQUFBLEVBQ0M7WUFBQUQsT0FBQSxFQUFTLElBQVQ7WUFDQUUsZ0JBQUEsRUFBa0JyRSxVQUFXLENBQUEsQ0FBQSxDQUFYLElBQWlCQTs7O09BVDVCLENBQVY7OztJQVdEc0UseUJBQTJCO2FBQzFCekQsS0FBQSxDQUFJWixRQUFKLENBQUEsQ0FBY3NFLEVBQWQsQ0FBaUIsa0JBQWpCLEVBQXNDQyxLQUFEO1lBQ3BDQztRQUFBQSxhQUFBLEdBQWdCNUQsS0FBQSxDQUFJMkQsS0FBSyxDQUFDRSxNQUFWLENBQUEsQ0FBa0JDLE9BQWxDOztZQUNHLENBQUlGLGFBQWEsQ0FBQ0csUUFBZCxDQUF1QixLQUFDdkIsTUFBeEIsQ0FBUDtlQUNFd0IsS0FBRDtpQkFDQSxLQUFDQyxJQUFELENBQU0sTUFBTjs7T0FKRjs7O0lBTURDLHlCQUEyQjthQUMxQmxFLEtBQUEsQ0FBSVosUUFBSixDQUFBLENBQWMrRSxHQUFkLENBQWtCLGtCQUFsQjs7O0lBR0R6QixJQUFNO1VBQ0ssS0FBQ0QsS0FBRCxDQUFPQyxJQUFqQjs7OztXQUNDdUIsSUFBRCxDQUFNLFlBQU47V0FDQ3hCLEtBQUQsQ0FBT0MsSUFBUCxHQUFjLElBQWQ7V0FDQ0MsRUFBRCxDQUFJeUIsSUFBSjtXQUNDcEIsTUFBRCxDQUFRcUIsTUFBUjs7V0FDQ1oseUJBQUQ7O1dBQ0NRLElBQUQsQ0FBTSxNQUFOO2FBQ087OztJQUVSRCxLQUFPO1VBQ0ksQ0FBSSxLQUFDdkIsS0FBRCxDQUFPQyxJQUFyQjs7OztXQUNDdUIsSUFBRCxDQUFNLGFBQU47V0FDQ3hCLEtBQUQsQ0FBT0MsSUFBUCxHQUFjLEtBQWQ7V0FDQ0MsRUFBRCxDQUFJRyxJQUFKOztXQUNDb0IseUJBQUQ7O1dBQ0NELElBQUQsQ0FBTSxPQUFOO2FBQ087OztJQUVSSyxVQUFZLENBQUNDLE9BQUQ7V0FDVkMsR0FBRCxDQUFLRCxPQUFMLENBQWFFLEtBQWI7O1VBQytCRixPQUEvQjtlQUFBLEtBQUNDLEdBQUQsQ0FBS0QsT0FBTCxDQUFhRyxNQUFiLENBQW9CSCxPQUFwQjs7Ozs7QUFJREksRUFBQUEsTUFBTSxDQUFDQyxnQkFBUCxDQUF3QnZDLEtBQUMsQ0FBQXdDLFNBQXpCLEVBQ0M7V0FBTztNQUFBQyxHQUFBLEVBQUs7ZUFBSyxLQUFDbkMsRUFBRCxDQUFJb0M7OztHQUR0Qjs7aUJBdERLOztBQTJETixjQUFlMUMsS0FBZixDQy9EZSxvQkFBQzJDLEtBQUQsRUFBUUMsU0FBUjtNQUFxQkM7O1VBQUE7U0FDOUIsT0FBT0QsU0FBUCxLQUFvQjthQUNqQkQ7O1NBRUgsT0FBT0MsU0FBUCxLQUFvQjthQUNqQkEsU0FBQSxDQUFVRCxLQUFWOztVQUVIRyxLQUFLLENBQUNDLE9BQU4sQ0FBY0gsU0FBZDtNQUNKQyxLQUFBLEdBQVFELFNBQVMsQ0FBQ0ksSUFBVixDQUFlLFVBQUNDLFNBQUQ7ZUFBY0EsU0FBUyxDQUFDTixLQUFWLEtBQW1CQTtPQUFoRCxDQUFSOztVQUNHRSxLQUFIO2VBQ1FBLEtBQUssQ0FBQ0ssS0FBTixJQUFlTCxLQUFLLENBQUNNO09BRDdCLE1BQUE7ZUFHUVI7Ozs7O1dBRUosT0FBT0MsU0FBUCxLQUFvQixRQUFwQixJQUFpQ0E7YUFDOUJBLFNBQVUsQ0FBQUQsS0FBQSxDQUFWLElBQW9CQTs7Q0NmZCxrQkFBQ1MsR0FBRDtNQUNkQzs7RUFBQUEsT0FBQSxHQUFVLFVBQUNDLFFBQUQ7V0FDVEQsT0FBTyxDQUFDRCxHQUFSLENBQVlHLGdCQUFaLENBQTZCRCxRQUE3QjtHQUREOztFQUdBRCxPQUFPLENBQUNELEdBQVIsR0FBY0EsR0FBZDtTQUNPQztDQ0ZSLElBQU85RixRQUFQLEdBQWdCSSxLQUFHLENBQUNDLFFBQUosQ0FDZixDQUFDLEtBQUQsRUFDQztFQUFBQyxHQUFBLEVBQUs7Q0FETixFQUVDLENBQUMsS0FBRCxFQUNDO0VBQUFBLEdBQUEsRUFBSyxjQUFMO0VBQ0FDLEtBQUEsRUFDQztJQUFBTSxTQUFBLEVBQVcsWUFBWDtJQUNBSixPQUFBLEVBQVMsTUFEVDtJQUVBd0YsT0FBQSxFQUFTLFdBRlQ7SUFHQXZFLFFBQUEsRUFBVSxFQUhWO0lBSUFDLFVBQUEsRUFBWSxHQUpaO0lBS0FSLEtBQUEsRUFBTztHQVBSO0VBU0ErRSxPQUFBLEVBQ0M7SUFBQUMsR0FBQSxFQUFLLFVBQUNDLE9BQUQ7V0FDSEMsSUFBRCxHQUFRRCxPQUFSO1dBQ0M1QixJQUFEO01BRUE4QixZQUFBLENBQWEsS0FBQ0MsUUFBZCxDQUFBO2FBQ0EsS0FBQ0EsUUFBRCxHQUFZQyxVQUFBLENBQVc7ZUFDdEIsS0FBQ0MsS0FBRDtPQURXLEVBRVYsSUFGVTtLQUxiO0lBU0FBLEtBQUEsRUFBTztXQUNMdEUsSUFBRCxHQUFRLEVBQVI7YUFDQSxLQUFDZSxJQUFEOzs7Q0F0QkgsQ0FGRCxFQTJCQ3dELE1BQU8sQ0FBQ0MsTUFBUixDQUNDO0VBQUFyRyxHQUFBLEVBQUs7Q0FETixFQUVDLENBQUMsS0FBRCxFQUNDO0VBQUFDLEtBQUEsRUFDQztJQUFBdUIsZUFBQSxFQUFpQixTQUFqQjtJQUNBOEUsTUFBQSxFQUNDO01BQUE5RSxlQUFBLEVBQWlCLFVBQUNDLENBQUQ7ZUFBTUEsQ0FBQyxDQUFDRixRQUFGLENBQVc3QixNQUFYLENBQWtCQzs7OztDQUo1QyxDQUZELENBM0JELENBRGUsQ0FBaEI7QUF3Q0EsQUFBQSxJQUFPNEcsWUFBUCxHQUFzQnpHLEtBQUcsQ0FBQ0MsUUFBSixDQUNyQixDQUFDLEtBQUQsRUFDQztFQUFBQyxHQUFBLEVBQUssY0FBTDtFQUNBQyxLQUFBLEVBQ0M7SUFBQUMsUUFBQSxFQUFVLFVBQVY7SUFDQWEsS0FBQSxFQUFPLEtBRFA7SUFFQUMsR0FBQSxFQUFLLEtBRkw7SUFHQUMsU0FBQSxFQUFXLG9CQUhYO0lBSUFHLFFBQUEsRUFBVSxNQUpWO0lBS0FGLFVBQUEsRUFBWSxDQUxaO0lBTUFOLE9BQUEsRUFBUyxHQU5UO0lBT0FTLFVBQUEsRUFBWTs7Q0FWZCxFQVdBLEdBWEEsQ0FEcUIsQ0FBdEI7QUFlQSxBQUFBLElBQU9RLElBQVAsR0FBYy9CLEtBQUcsQ0FBQ0MsUUFBSixDQUNiLENBQUMsS0FBRCxFQUNDO0VBQUFDLEdBQUEsRUFBSyxNQUFMO0VBQ0FDLEtBQUEsRUFDQztJQUFBQyxRQUFBLEVBQVUsVUFBVjtJQUNBYyxHQUFBLEVBQUssS0FETDtJQUVBSSxRQUFBLEVBQVUsUUFGVjtJQUdBRixVQUFBLEVBQVk7O0NBTmQsRUFRQyxDQUFDLE1BQUQsRUFDQztFQUFBbEIsR0FBQSxFQUFLLE9BQUw7RUFDQUMsS0FBQSxFQUNDO0lBQUFvQixVQUFBLEVBQVk7O0NBSGQsQ0FSRCxFQWNDLENBQUMsTUFBRCxFQUNDO0VBQUFyQixHQUFBLEVBQUs7Q0FETixDQWRELENBRGEsQ0FBZDtBQXFCQSxBQUFBLElBQU9xRSxPQUFQLEdBQWlCdkUsS0FBRyxDQUFDQyxRQUFKLENBQ2hCLENBQUMsS0FBRCxFQUNDO0VBQUFDLEdBQUEsRUFBSyxZQUFMO0VBQ0FDLEtBQUEsRUFDQztJQUFBTSxTQUFBLEVBQVcsWUFBWDtJQUNBb0YsT0FBQSxFQUFTLFVBQUNsRSxDQUFEO2FBQU0sR0FBR0EsQ0FBQyxDQUFDRixRQUFGLENBQVdvRSxPQUFRO0tBRHJDO0lBRUFhLFFBQUEsRUFBVSxVQUFDL0UsQ0FBRDthQUFNLEdBQUdBLENBQUMsQ0FBQ0YsUUFBRixDQUFXaUYsUUFBUzs7O0NBTHpDLENBRGdCLENBQWpCO0FBV0EsaUJBQWUxRyxLQUFHLENBQUNDLFFBQUosQ0FDZCxDQUFDLEtBQUQsRUFDQztFQUFBQyxHQUFBLEVBQUssS0FBTDtFQUNBQyxLQUFBLEVBQ0M7SUFBQUMsUUFBQSxFQUFVLFVBQVY7SUFDQUMsT0FBQSxFQUFTLGNBRFQ7SUFFQUMsYUFBQSxFQUFlLEtBRmY7SUFHQUMsTUFBQSxFQUFRLE1BSFI7SUFJQW9HLFdBQUEsRUFBYSxNQUpiO0lBS0FDLFlBQUEsRUFBYyxLQUxkO0lBTUFmLE9BQUEsRUFBUyxlQU5UO0lBT0FsRixZQUFBLEVBQWMsS0FQZDtJQVFBVSxTQUFBLEVBQVcsUUFSWDtJQVNBWixTQUFBLEVBQVcsWUFUWDtJQVVBRyxNQUFBLEVBQVEsU0FWUjtJQVdBQyxVQUFBLEVBQVksTUFYWjtJQVlBYSxlQUFBLEVBQWlCLFVBQUMrRCxHQUFEO2FBQVFBLEdBQUcsQ0FBQ2hFLFFBQUosQ0FBYTVCO0tBWnRDO0lBYUFrQixLQUFBLEVBQU8sVUFBQzBFLEdBQUQ7YUFBUUEsR0FBRyxDQUFDaEUsUUFBSixDQUFhM0I7S0FiNUI7SUFjQUgsVUFBQSxFQUFZLFVBQUM4RixHQUFEO2FBQVFBLEdBQUcsQ0FBQ2hFLFFBQUosQ0FBYTlCOzs7Q0FqQm5DLEVBbUJDb0MsSUFuQkQsRUFvQkMwRSxZQXBCRCxDQURjLENBQWYsQ0MxRkEsSUFBT2hGLFFBQVAsR0FDQztFQUFBNUIsT0FBQSxFQUFTLE1BQVQ7RUFDQUMsU0FBQSxFQUFXLFNBRFg7RUFFQStHLFVBQUEsRUFBWSxTQUZaOztFQUdBQyxTQUFBLEVBQVcsS0FIWDtFQUlBakIsT0FBQSxFQUFTLEVBSlQ7RUFLQWEsUUFBQSxFQUFVO0NBTlg7QUFTQSxBQUFBLElBQU9LLE1BQVAsR0FDQztFQUFBQyxNQUFBLEVBQVE7V0FBSyxLQUFDQyxLQUFELENBQU9qQztHQUFwQjtFQUNBa0MsTUFBQSxFQUFRLFVBQUNsQyxLQUFEO1dBQVUsS0FBQ2lDLEtBQUQsQ0FBT2pDLEtBQVAsR0FBZUE7R0FEakM7RUFFQW1DLFFBQUEsRUFBVSxVQUFDbkMsS0FBRDtXQUFVQTs7Q0FIckIsQ0NQQSxJQUFPb0MsZUFBUCxHQUF5QkMsT0FBQSxDQUFRLGlCQUFSLENBQXpCLENDRkEsSUFBQUMsR0FBQTtBQUFBO0FBU01BO1FBQU5BLEdBQUEsU0FBa0JoRixPQUFBLENBQVEsWUFBUixDQUFsQixDQUFBO0lBQ0NDLFdBQWEsQ0FBQ3dFLFFBQUQsRUFBU1EsWUFBVDtVQUNaQyxXQUFBQzs7TUFDQUQsU0FBQSxHQUFZRSxRQUFRLENBQUNDLElBQVQsQ0FBYyxDQUFDLFFBQUQsRUFBVSxZQUFWLENBQWQsRUFBdUNDLEtBQXZDLENBQTZDTCxZQUE3QyxDQUFaO01BQ0FFLFNBQUEsR0FBWUMsUUFBUSxDQUFDQyxJQUFULENBQWMsQ0FBQyxTQUFELEVBQVksVUFBWixDQUFkLEVBQXVDQyxLQUF2QyxDQUE2Q2IsUUFBN0MsQ0FBWjtXQUNDdEYsUUFBRCxHQUFZaUcsUUFBUSxDQUFDRSxLQUFULENBQWVuSSxRQUFmLEVBQWtDOEgsWUFBWSxDQUFDOUIsR0FBL0MsRUFBb0QrQixTQUFwRCxFQUErREMsU0FBL0QsQ0FBWjtXQUNDVixNQUFELEdBQVVXLFFBQVEsQ0FBQ0UsS0FBVCxDQUFlbkksTUFBZixFQUFnQ3NILFFBQWhDLENBQVY7V0FDQ0EsTUFBRCxDQUFRM0UsS0FBUixHQUFnQnNGLFFBQVEsQ0FBQ0UsS0FBVCxDQUFlTCxZQUFZLENBQUNuRixLQUE1QixFQUFtQyxLQUFDMkUsTUFBRCxDQUFRM0UsS0FBM0MsQ0FBaEI7V0FDQ0ssS0FBRCxHQUFTLEVBQVQ7V0FDQytDLElBQUQsR0FBUSxLQUFDdUIsTUFBRCxDQUFRdkIsSUFBaEI7V0FDQ0QsS0FBRCxHQUFTLEtBQUN3QixNQUFELENBQVF4QixLQUFqQjtXQUNDNUMsRUFBRCxHQUFNMUMsVUFBUSxDQUFDMkMsS0FBVCxDQUFlLElBQWYsRUFBcUI7UUFBQUMsZUFBQSxFQUFnQjtPQUFyQyxDQUFOO1dBQ0MwQixPQUFELEdBQVdBLE9BQU8sQ0FBQzNCLEtBQVIsQ0FBYyxJQUFkLEVBQW9CO1FBQUFDLGVBQUEsRUFBZ0I7T0FBcEMsQ0FBWDtXQUNDakQsTUFBRCxHQUFVQSxRQUFNLENBQUNnRCxLQUFQLENBQWE7UUFBQ2lGLElBQUEsRUFBSztVQUFBOUYsSUFBQSxFQUFLOztPQUF4QixFQUFrQztRQUFBYyxlQUFBLEVBQWdCO09BQWxELENBQVY7V0FDQ1QsS0FBRCxHQUFTLElBQUlDLE9BQUosQ0FBVSxLQUFDTSxFQUFYLEVBQWU0RSxZQUFmLEVBQTZCQSxZQUFZLENBQUNwSSxVQUExQyxDQUFUO1dBQ0NpRCxLQUFELENBQU9rQyxVQUFQLENBQWtCLEtBQUNDLE9BQW5COztVQUNpQyxLQUFDOUMsUUFBRCxDQUFVb0YsVUFBVixLQUF3QixTQUF6RDthQUFDakgsTUFBRCxDQUFRa0ksV0FBUixDQUFvQixLQUFDdkQsT0FBckI7OztXQUVDd0QsTUFBRDs7V0FDQ0MsZUFBRDs7O0lBR0RELE1BQVE7VUFDSixLQUFDaEIsTUFBRCxDQUFRRCxTQUFYO2VBQ0MsS0FBQ3RDLEdBQUQsQ0FBS2UsS0FBTCxDQUFXekMsSUFBWDtPQURELE1BQUE7ZUFHQyxLQUFDMEIsR0FBRCxDQUFLZSxLQUFMLENBQVdVLElBQVgsR0FBa0IsR0FBRyxLQUFDYyxNQUFELENBQVF4QixLQUFNOzs7O0lBRXJDeUMsZUFBaUI7V0FDZnhELEdBQUQsQ0FBS2lDLFlBQUwsQ0FBa0IvQyxFQUFsQixDQUFxQixPQUFyQixFQUErQkMsS0FBRDthQUM1Qk0sSUFBRCxDQUFNLFFBQU47ZUFBZ0JOLEtBQUssQ0FBQ3NFLGVBQU47T0FEakI7V0FHQ3RGLEVBQUQsQ0FBSWUsRUFBSixDQUFPLE9BQVAsRUFBZ0I7ZUFDZixLQUFDdEIsS0FBRCxDQUFPTSxJQUFQO09BREQ7V0FHQzlDLE1BQUQsQ0FBUThELEVBQVIsQ0FBVyxPQUFYLEVBQXFCd0UsQ0FBRDtRQUNuQkEsQ0FBQyxDQUFDRCxlQUFGOztZQUNrQixLQUFDRSxhQUFELEVBQWxCO2lCQUFBLEtBQUMvRixLQUFELENBQU80QixLQUFQOztPQUZEOztVQUlHLEtBQUN2QyxRQUFELENBQVVvRixVQUFWLEtBQXdCLFNBQTNCO2FBQ0V6RSxLQUFELENBQU9zQixFQUFQLENBQVUsTUFBVixFQUFrQjtjQUFLMEU7Z0VBQU0sQ0FBQ0MsbUJBQUQsQ0FBQ0EsZUFBZ0IsS0FBQ3JEO1NBQS9DO2VBQ0EsS0FBQzVDLEtBQUQsQ0FBT3NCLEVBQVAsQ0FBVSxNQUFWLEVBQWtCO2NBQVEsS0FBQ3NCLEtBQUQsS0FBWSxLQUFDdkMsS0FBRCxDQUFPNEYsWUFBdEI7Z0JBQ25CLENBQUksS0FBQ0YsYUFBRCxFQUFQO2NBQ0NHLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFNBQVo7cUJBQ0EsS0FBQ25HLEtBQUQsQ0FBT00sSUFBUDs7O1NBSEY7Ozs7SUFLRjhGLFVBQVk7V0FDVnZCLEtBQUQsR0FBUyxLQUFDRixNQUFELENBQVFFLEtBQVIsQ0FBY3dCLElBQWQsQ0FBbUIsSUFBbkIsRUFBc0IsS0FBQ2xFLE9BQUQsQ0FBU21FLEdBQS9CLEVBQW9DaEQsT0FBQSxDQUFRLElBQVIsQ0FBcEMsQ0FBVDs7VUFDK0IsS0FBQ3FCLE1BQUQsQ0FBUTRCLE9BQXZDO2VBQUEsS0FBQzVDLEdBQUQsQ0FBSyxLQUFDZ0IsTUFBRCxDQUFRNEIsT0FBYixFQUFzQixJQUF0Qjs7OztJQUVEQyxVQUFZLENBQUNDLE1BQUQsRUFBU2hGLE1BQVQ7V0FDVmxCLEVBQUQsQ0FBSWtHLE1BQUosRUFBWWhGLE1BQVo7O1dBQ0MyRSxVQUFEOzthQUNPOzs7SUFFUk0sYUFBZTthQUNkLEtBQUM3RSxJQUFELENBQU0sUUFBTixFQUFnQixLQUFDZSxLQUFqQjs7O0lBRUQrRCxXQUFhLENBQUMvRCxLQUFEO2FBQ1osS0FBQ1IsR0FBRCxDQUFLUSxLQUFMLENBQVdqRCxJQUFYLEdBQWtCaUgsU0FBQSxDQUFVaEUsS0FBVixFQUFpQixLQUFDK0IsTUFBRCxDQUFROUIsU0FBekI7OztJQUVuQmdFLGVBQWlCLENBQUNqRSxLQUFELEVBQVFrRSxNQUFSO1dBQ2ZILFdBQUQsQ0FBYS9ELEtBQWI7O1dBQ0MrQixNQUFELENBQVFHLE1BQVIsQ0FBZXVCLElBQWYsQ0FBb0IsSUFBcEIsRUFBdUJ6RCxLQUF2Qjs7VUFDQSxDQUF3QmtFLE1BQXhCO2VBQUEsS0FBQ0osYUFBRDs7OztJQUVEbEQsZ0JBQWtCLENBQUNaLEtBQUQ7V0FDaEIrRCxXQUFELENBQWEvRCxLQUFiOztVQUN3QixLQUFDdkQsUUFBRCxDQUFVb0YsVUFBVixLQUF3QixTQUFoRDtlQUFBLEtBQUNpQyxhQUFEOzs7O0lBRURYLGFBQWU7VUFDZGdCO01BQUFBLFVBQUEsR0FBYSxLQUFDaEMsUUFBRCxFQUFiOztVQUNHZ0MsVUFBQSxLQUFjLElBQWpCO2FBQ0UxRyxLQUFELENBQU80RixZQUFQLEdBQXNCLElBQXRCOzthQUNDUyxhQUFEOztlQUNPO09BSFIsTUFLSyxJQUFHSyxVQUFBLFlBQXNCQyxLQUF6QjthQUNIeEosTUFBRCxDQUFRbUYsS0FBUixDQUFjc0UsWUFBZCxDQUEyQnRELEdBQTNCLENBQStCb0QsVUFBVSxDQUFDbkQsT0FBMUM7YUFDQy9CLElBQUQsQ0FBTSxPQUFOLEVBQWVrRixVQUFmO2VBQ087Ozs7SUFFVHJFLEdBQUssQ0FBQ3dFLGFBQUQ7VUFDSnRFO01BQUFBLEtBQUEsR0FBUSxLQUFDK0IsTUFBRCxDQUFRQyxNQUFSLENBQWV5QixJQUFmLENBQW9CLElBQXBCLENBQVI7O1VBQzBDLEtBQUMxQixNQUFELENBQVF3QyxlQUFSLElBQTRCLENBQUlELGFBQTFFO1FBQUF0RSxLQUFBLEdBQVEsS0FBQytCLE1BQUQsQ0FBUXdDLGVBQVIsQ0FBd0J2RSxLQUF4QixDQUFSOzs7YUFDT0E7OztJQUVSZSxHQUFLLENBQUNmLEtBQUQsRUFBUWtFLE1BQVI7VUFDZSxPQUFPbEUsS0FBUCxLQUFnQixVQUFuQztRQUFBQSxLQUFBLEdBQVFBLEtBQUEsRUFBUjs7O1VBQ3lDLEtBQUMrQixNQUFELENBQVF5QyxjQUFqRDtRQUFBeEUsS0FBQSxHQUFRLEtBQUMrQixNQUFELENBQVF5QyxjQUFSLENBQXVCeEUsS0FBdkIsQ0FBUjs7O2FBQ0EsS0FBQ2lFLGVBQUQsQ0FBaUJqRSxLQUFqQixFQUF3QmtFLE1BQXhCOzs7SUFFRC9CLFFBQVU7VUFDVHNDLEtBQUFDOztVQUFlLENBQUksS0FBQzNDLE1BQUQsQ0FBUUksUUFBM0I7ZUFBTzs7OztRQUVOdUMsTUFBQSxHQUFTLEtBQUMzQyxNQUFELENBQVFJLFFBQVIsQ0FBaUJzQixJQUFqQixDQUFzQixJQUF0QixFQUF5QixLQUFDekQsS0FBMUIsQ0FBVDs7UUFDS3lFLFdBQUE7UUFDTEMsTUFBQSxHQUFTRCxHQUFUOzs7Y0FFRDthQUNNQyxNQUFBLEtBQVU7aUJBQVU7O2FBQ3BCQSxNQUFBLEtBQVU7aUJBQVcsSUFBSXRDLGVBQUosQ0FBb0IsbUJBQXBCOzthQUNyQixPQUFPc0MsTUFBUCxLQUFpQjtpQkFBYyxJQUFJdEMsZUFBSixDQUFvQnNDLE1BQXBCOztlQUMvQkEsTUFBQSxZQUFrQk47aUJBQVdNOzs7O0lBSXBDM0csUUFBVSxDQUFDYyxNQUFEO2FBQVcsS0FBQytFLFVBQUQsQ0FBWSxVQUFaLEVBQXdCL0UsTUFBeEI7OztJQUNyQjhGLFNBQVcsQ0FBQzlGLE1BQUQ7YUFBVyxLQUFDK0UsVUFBRCxDQUFZLFdBQVosRUFBeUIvRSxNQUF6Qjs7O0lBQ3RCK0YsWUFBYyxDQUFDL0YsTUFBRDthQUFXLEtBQUMrRSxVQUFELENBQVksY0FBWixFQUE0Qi9FLE1BQTVCOzs7SUFDekJpRSxXQUFhLENBQUNqRSxNQUFEO2FBQVcsS0FBQytFLFVBQUQsQ0FBWSxhQUFaLEVBQTJCL0UsTUFBM0I7Ozs7QUFHeEJjLEVBQUFBLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IwQyxHQUFDLENBQUF6QyxTQUF6QixFQUNDO0lBQUFMLEdBQUEsRUFBSztNQUFBTSxHQUFBLEVBQUs7ZUFBSyxLQUFDbkMsRUFBRCxDQUFJb0M7O0tBQW5CO0lBQ0FDLEtBQUEsRUFBTztNQUFBRixHQUFBLEVBQUs7ZUFBSyxLQUFDQSxHQUFEOztLQURqQjtJQUVBK0UsUUFBQSxFQUFVO01BQUEvRSxHQUFBLEVBQUs7ZUFBSyxLQUFDQSxHQUFELENBQUssSUFBTDs7O0dBSHJCOztpQkFqSEs7O0FBMkhOLFlBQWV3QyxHQUFmLENDcElBLGFBQUEsR0FBb0IseTZCQUFwQjtBQ0lBLElBQU8xSCxRQUFQLEdBQWdCMEcsTUFBTyxDQUFDQyxNQUFSLENBQ2YsQ0FBQyxLQUFELEVBQ0M7RUFBQTNFLFNBQUEsRUFBVztJQUFBa0ksS0FBQSxFQUFPO2FBQ2pCLEtBQUNDLFNBQUQsQ0FBVztRQUFBaEksSUFBQSxFQUFLLE9BQU8sS0FBQ2lJLE9BQUQsQ0FBU3ZJLFFBQVQsQ0FBa0J3SSxTQUF6QjtPQUFoQjs7O0NBRkYsQ0FEZSxDQUFoQjtBQU9BLEFBQUEsSUFBT0MsS0FBUCxHQUFlbEssS0FBRyxDQUFDQyxRQUFKLENBQ2QsQ0FBQyxLQUFELEVBQ0M7RUFBQUMsR0FBQSxFQUFLLE9BQUw7RUFDQUMsS0FBQSxFQUNDO0lBQUFDLFFBQUEsRUFBVSxVQUFWO0lBQ0E4QixNQUFBLEVBQVEsQ0FEUjtJQUVBakIsS0FBQSxFQUFPLE1BRlA7SUFHQUMsR0FBQSxFQUFLLEtBSEw7SUFJQUMsU0FBQSxFQUFXLG9CQUpYO0lBS0FYLEtBQUEsRUFBTyxNQUxQO0lBTUFELE1BQUEsRUFBUSxNQU5SO0lBT0E0SixjQUFBLEVBQWdCLE1BUGhCO0lBUUFDLGVBQUEsRUFBaUIsT0FBT0MsU0FBYyxHQVJ0QztJQVNBdkosT0FBQSxFQUFTOztDQVpYLENBRGMsQ0FBZjtBQWlCQSxBQUFBLElBQU93SixJQUFQLEdBQWN0SyxLQUFHLENBQUNDLFFBQUosQ0FDYixDQUFDLEtBQUQsRUFDQztFQUFBQyxHQUFBLEVBQUssTUFBTDtFQUNBQyxLQUFBLEVBQ0M7SUFBQUMsUUFBQSxFQUFVLFVBQVY7SUFDQThCLE1BQUEsRUFBUSxDQURSO0lBRUFsQixJQUFBLEVBQU0sQ0FGTjtJQUdBRSxHQUFBLEVBQUssS0FITDtJQUlBQyxTQUFBLEVBQVcsb0JBSlg7SUFLQVosTUFBQSxFQUFRLE1BTFI7SUFNQXNGLE9BQUEsRUFBUyxRQU5UO0lBT0F2RSxRQUFBLEVBQVUsTUFQVjtJQVFBQyxVQUFBLEVBQVksR0FSWjtJQVNBSCxVQUFBLEVBQVksQ0FUWjtJQVVBQyxTQUFBLEVBQVcsTUFWWDtJQVdBUixVQUFBLEVBQVksTUFYWjtJQVlBSixTQUFBLEVBQVcsWUFaWDtJQWFBTSxLQUFBLEVBQU8sU0FiUDtJQWNBRCxPQUFBLEVBQVMsR0FkVDtJQWVBeUosV0FBQSxFQUNDO01BQUF6SixPQUFBLEVBQVM7OztDQW5CWixDQURhLENBQWQ7QUF3QkEsQUFBQSxJQUFPMEosS0FBUCxHQUFleEssS0FBRyxDQUFDQyxRQUFKLENBQ2QsQ0FBQyxRQUFELEVBQ0M7RUFBQUMsR0FBQSxFQUFLLE9BQUw7RUFDQXVLLFVBQUEsRUFBWSxJQURaO0VBRUF0SyxLQUFBLEVBQ0M7SUFBQUMsUUFBQSxFQUFVLFVBQVY7SUFDQThCLE1BQUEsRUFBUSxDQURSO0lBRUFoQixHQUFBLEVBQUssQ0FGTDtJQUdBRixJQUFBLEVBQU0sQ0FITjtJQUlBUixLQUFBLEVBQU8sTUFKUDtJQUtBRCxNQUFBLEVBQVEsTUFMUjtJQU1BTyxPQUFBLEVBQVM7R0FUVjtFQVdBYyxTQUFBLEVBQVc7SUFBQWtJLEtBQUEsRUFBTzthQUNqQjlKLEtBQUcsQ0FBQytHLE1BQUosQ0FBVztRQUFBMkQsS0FBQSxFQUFNO1VBQUMxRixLQUFBLEVBQU07O09BQXhCLEVBQTZCLFVBQVUsS0FBQ2dGLE9BQUQsQ0FBU3ZJLFFBQVQsQ0FBa0JuQyxRQUE1QixFQUE3QixFQUFxRXlELFFBQXJFLENBQThFLElBQTlFOztHQVpEO0VBY0ErQyxPQUFBLEVBQ0M7SUFBQVAsS0FBQSxFQUFPO01BQUFULEdBQUEsRUFBSztZQUNYNUUsS0FBQXlLO1FBQUFBLFFBQUEsR0FBVyxLQUFDakMsR0FBRCxDQUFLa0MsYUFBTCxJQUFzQixDQUFqQzsrREFDNkIsQ0FBRXJGOztLQUZoQztJQUlBUCxLQUFBLEVBQ0M7TUFBQUYsR0FBQSxFQUFLO2VBQUssS0FBQzRELEdBQUQsQ0FBSzFEO09BQWY7TUFDQWUsR0FBQSxFQUFLLFVBQUNmLEtBQUQ7ZUFBVSxLQUFDMEQsR0FBRCxDQUFLMUQsS0FBTCxHQUFhQTs7OztDQXRCL0IsQ0FEYyxDQUFmO0FBMkJBLEFBQUEsSUFBT2lDLEtBQVAsR0FBZWpILEtBQUcsQ0FBQ0MsUUFBSixDQUNkLENBQUMsS0FBRCxFQUNDO0VBQUFDLEdBQUEsRUFBSyxhQUFMO0VBQ0FDLEtBQUEsRUFDQztJQUFBQyxRQUFBLEVBQVUsVUFBVjs7SUFFQXlLLFFBQUEsRUFBVSxHQUZWO0lBR0F0SyxNQUFBLEVBQVEsTUFIUjtJQUlBdUssWUFBQSxFQUFjOztDQVBoQixFQVNDWixLQVRELEVBVUNJLElBVkQsRUFXQ0UsS0FYRCxDQURjLENBQWYsQ0MvRUEsSUFBQU8sV0FBQTtBQUFBO0FBR01BO1FBQU5BLFdBQUEsU0FBMEJ6SSxPQUFBLENBQVEsWUFBUixDQUExQixDQUFBO0lBQ0NDLFdBQWEsU0FBQTs7V0FBRWQsUUFBRCxXQUFBO1dBRVp3RixLQUFELEdBQVNoSCxLQUFBLENBQWUyQyxLQUFmLENBQXFCLElBQXJCLEVBQTJCO1FBQUNDLGVBQUEsRUFBZ0I7T0FBNUMsQ0FBVDtXQUNDMkgsS0FBRCxHQUFTLEtBQUN2RCxLQUFELENBQU9sQyxLQUFQLENBQWF5RixLQUF0Qjs7V0FDQ3hDLGVBQUQ7O1dBQ0NnRCxXQUFELENBQWEsS0FBQ3pGLEtBQWQ7OztJQUVEeUMsZUFBaUI7V0FDZmYsS0FBRCxDQUFPdkQsRUFBUCxDQUFVLE9BQVYsRUFBbUI7ZUFDbEIsS0FBQ08sSUFBRCxDQUFNLFFBQU4sRUFBZ0I7VUFBRXNCLE9BQUQsS0FBQ0EsS0FBRjtVQUFVUCxPQUFELEtBQUNBO1NBQTFCO09BREQ7YUFHQSxLQUFDdEIsRUFBRCxDQUFJLFFBQUosRUFBYyxVQUFDO1FBQUM2QjtPQUFGO2VBQ2IsS0FBQ3lGLFdBQUQsQ0FBYXpGLEtBQWI7T0FERDs7O0lBR0R5RixXQUFhLENBQUN6RixLQUFEO2FBQ1osS0FBQzBCLEtBQUQsQ0FBT2xDLEtBQVAsQ0FBYXVGLElBQWIsQ0FBa0JyRSxJQUFsQixHQUF5QlY7OztJQUUxQjBGLFNBQVcsQ0FBQ2pHLEtBQUQ7V0FDVHdGLEtBQUQsQ0FBT3hGLEtBQVAsR0FBZUEsS0FBZjthQUNBLEtBQUNnRyxXQUFELENBQWEsS0FBQ3pGLEtBQWQ7OztJQUVEMkYsVUFBWSxDQUFDQyxPQUFEO1VBQ1h4SixHQUFBNEQsT0FBQTZGLEtBQUE1RixNQUFBNkY7TUFBQUEsV0FBQSxHQUFjLEtBQUNiLEtBQUQsQ0FBT2MsUUFBUCxDQUFnQkMsS0FBaEIsQ0FBc0IsQ0FBdEIsQ0FBZDs7VUFDbUNGLFdBQVcsQ0FBQ0csTUFBL0M7UUFBQXhMLEtBQUcsQ0FBQ3lMLEtBQUosQ0FBVUosV0FBVixFQUF1QkssTUFBdkI7OztXQUVBL0osS0FBQSxzQkFBQSxTQUFBLEtBQUE7U0FBSTtVQUFDNkQsSUFBRDtVQUFNRDs7YUFDUmlGLEtBQUQsQ0FBTzlGLE1BQVAsQ0FBYzFFLEtBQUcsQ0FBQytHLE1BQUosQ0FBVztVQUFDMkQsS0FBQSxFQUFNO1lBQUExRixLQUFBLEVBQU1ROztTQUF4QixFQUErQkQsS0FBL0IsQ0FBZDs7OztJQUlGcUUsWUFBYyxDQUFDL0YsTUFBRDthQUNiLEtBQUNvRCxLQUFELENBQU8yQyxZQUFQLENBQW9CL0YsTUFBcEI7Ozs7QUFHRGMsRUFBQUEsTUFBTSxDQUFDQyxnQkFBUCxDQUF3Qm1HLFdBQUMsQ0FBQWxHLFNBQXpCLEVBQ0M7SUFBQVUsS0FBQSxFQUNDO01BQUFULEdBQUEsRUFBSztlQUFLLEtBQUMwRixLQUFELENBQU9qRjs7S0FEbEI7SUFFQVAsS0FBQSxFQUNDO01BQUFGLEdBQUEsRUFBSztlQUFLLEtBQUMwRixLQUFELENBQU94RjtPQUFqQjtNQUNBZSxHQUFBLEVBQUssVUFBQ2YsS0FBRDtlQUFVLEtBQUNpRyxTQUFELENBQVdqRyxLQUFYOzs7R0FMakI7O2lCQW5DSzs7QUEyQ04sb0JBQWUrRixXQUFmLENDOUNBLElBQUFZLFNBQUE7QUFBQTtBQU9NQTtRQUFOQSxTQUFBLFNBQXdCckosT0FBQSxDQUFRLFlBQVIsQ0FBeEIsQ0FBQTtJQUNDQyxXQUFhLEtBQUE7O1dBQUVxSixJQUFELE9BQUE7T0FFYjtRQUFFbkssVUFBRCxLQUFDQTtVQUFZLEtBQUNtSyxJQUFmO1dBQ0NySCxPQUFELEdBQVdBLE9BQU8sQ0FBQzNCLEtBQVIsQ0FBYyxJQUFkLEVBQW9CO1FBQUFDLGVBQUEsRUFBZ0I7T0FBcEMsQ0FBWDtXQUNDSixLQUFELEdBQVMsRUFBVDtXQUNDb0osV0FBRCxHQUFlLEtBQUNqTSxNQUFELEdBQVVBLFFBQU0sQ0FBQ2dELEtBQVAsQ0FBYTtRQUFDaUYsSUFBQSxFQUFLO1VBQUE5RixJQUFBLEVBQUssT0FBTyxLQUFDTixRQUFELENBQVVuQyxRQUFqQjs7T0FBeEIsRUFBc0Q7UUFBQXVELGVBQUEsRUFBZ0I7T0FBdEUsQ0FBekI7V0FDQzlDLFNBQUQsR0FBYSxLQUFDNkwsSUFBRCxDQUFNcEgsR0FBTixDQUFVekUsU0FBdkI7V0FDQ3FDLEtBQUQsR0FBUyxJQUFJQyxPQUFKLENBQVUsS0FBQ3RDLFNBQVgsRUFBc0IsS0FBQzBCLFFBQXZCLEVBQWlDLEtBQUNBLFFBQUQsQ0FBVXRDLFVBQTNDLENBQVQ7V0FDQzJNLFdBQUQsR0FBZSxJQUFJZixhQUFKLENBQWdCLEtBQUN0SixRQUFqQixDQUFmO1dBRUNzSyxRQUFELEdBQVkvTCxHQUFHLENBQUNnTSxHQUFKLENBQVEsSUFBUixFQUFjLEtBQUN6SCxPQUFmLENBQVo7V0FDQ3VILFdBQUQsQ0FBYWxDLFlBQWIsQ0FBMEIsS0FBQ3JGLE9BQTNCO1dBQ0NzSCxXQUFELENBQWEvRCxXQUFiLENBQXlCLEtBQUN2RCxPQUExQjtXQUNDbkMsS0FBRCxDQUFPa0MsVUFBUCxDQUFrQixLQUFDeUgsUUFBbkI7O1dBQ0NoRSxNQUFEOzs7SUFFREEsTUFBUTtXQUNOOEQsV0FBRCxDQUFhbkksRUFBYixDQUFnQixPQUFoQixFQUF5QjtZQUNKLEtBQUN1SSxpQkFBRCxFQUFwQjtpQkFBQSxLQUFDOUQsYUFBRDs7T0FERDtXQUdDcEksU0FBRCxDQUFXMkQsRUFBWCxDQUFjLE9BQWQsRUFBdUI7ZUFDdEIsS0FBQ3RCLEtBQUQsQ0FBT00sSUFBUDtPQUREO2FBR0EsS0FBQ29KLFdBQUQsQ0FBYXBJLEVBQWIsQ0FBZ0IsUUFBaEIsRUFBMEIsQ0FBQztRQUFDc0I7T0FBRjtlQUN6QixLQUFDa0gsV0FBRCxDQUFhbEgsS0FBYjtPQUREOzs7SUFHRGtILFdBQWEsQ0FBQzFHLElBQUQ7V0FDWGpCLE9BQUQsQ0FBU0UsS0FBVDtXQUNDc0MsTUFBRCxHQUFVLEtBQUM2RSxJQUFELENBQU1PLFdBQU4sQ0FBa0IzRyxJQUFsQixDQUFWOztVQUVHLEtBQUN1QixNQUFKO2FBQ0VBLE1BQUQsR0FBVVcsUUFBUSxDQUFDRSxLQUFULENBQWVuSSxNQUFmLEVBQWdDLEtBQUNzSCxNQUFqQyxDQUFWOzthQUNDeUIsVUFBRDtPQUZELE1BQUE7YUFJRXZCLEtBQUQsR0FBUyxJQUFUOzs7VUFFZ0MsS0FBQzZFLFdBQUQsQ0FBYTlHLEtBQWIsS0FBc0JRLElBQXZEO2VBQUEsS0FBQ3NHLFdBQUQsQ0FBYTlHLEtBQWIsR0FBcUJROzs7O0lBR3RCeUcsaUJBQW1CO1VBQ2YsS0FBQ2hGLEtBQUo7ZUFDUTtPQURSLE1BQUE7YUFHRXJILE1BQUQsQ0FBUW1GLEtBQVIsQ0FBY3NFLFlBQWQsQ0FBMkJ0RCxHQUEzQixDQUErQiwrQkFBL0I7ZUFDTzs7OztJQUVUcUcsaUJBQW1CO1VBQ2xCakI7O1VBQUcsS0FBQzFKLFFBQUQsQ0FBVTRLLGdCQUFiO1FBQ0NsQixPQUFBLEdBQVUsS0FBQ1MsSUFBRCxDQUFNVCxPQUFoQjtPQURELE1BQUE7UUFHQ0EsT0FBQSxHQUFVLEtBQUNTLElBQUQsQ0FBTVQsT0FBTixDQUFjbUIsTUFBZCxDQUFxQixDQUFDO1VBQUM5RztTQUFGO2lCQUFXLEtBQUNvRyxJQUFELENBQU1XLFFBQU4sQ0FBZS9HLElBQWY7U0FBaEMsQ0FBVjs7O2FBRUQsS0FBQ3NHLFdBQUQsQ0FBYVosVUFBYixDQUF3QkMsT0FBeEI7OztJQUVEckMsYUFBZTtXQUNiN0UsSUFBRCxDQUFNLFFBQU4sRUFBZ0IsS0FBQzhDLE1BQWpCLEVBQXlCLEtBQUMvQixLQUExQjthQUNBLEtBQUN3SCxNQUFEOzs7SUFFRHZELGVBQWlCLENBQUNqRSxLQUFEO2FBQ2hCLEtBQUMrQixNQUFELENBQVFHLE1BQVIsQ0FBZXVCLElBQWYsQ0FBb0IsSUFBcEIsRUFBdUJ6RCxLQUF2Qjs7O0lBRURZLGdCQUFrQixDQUFDWixLQUFEOztJQUdsQndILE1BQVE7V0FDTk4sV0FBRCxDQUFhLEVBQWI7O2FBQ0EsS0FBQzlKLEtBQUQsQ0FBTzRCLEtBQVA7Ozs7c0JBRURjLE1BQUt3QyxLQUFHLENBQUF6QyxTQUFILENBQUtDO3NCQUNWaUIsTUFBS3VCLEtBQUcsQ0FBQXpDLFNBQUgsQ0FBS2tCO3NCQUNWb0IsV0FBVUcsS0FBRyxDQUFBekMsU0FBSCxDQUFLc0M7c0JBQ2ZxQixhQUFZbEIsS0FBRyxDQUFBekMsU0FBSCxDQUFLMkQ7c0JBQ2pCTCxnQkFBZWIsS0FBRyxDQUFBekMsU0FBSCxDQUFLc0Q7RUFFcEJ4RCxNQUFNLENBQUNDLGdCQUFQLENBQXdCK0csU0FBQyxDQUFBOUcsU0FBekIsRUFDQztJQUFBTCxHQUFBLEVBQUs7TUFBQU0sR0FBQSxFQUFLO2VBQUssS0FBQ25DLEVBQUQsQ0FBSW9DOztLQUFuQjtJQUNBQyxLQUFBLEVBQU87TUFBQUYsR0FBQSxFQUFLO2VBQUssS0FBQ0EsR0FBRDs7O0dBRmxCOztpQkEzRUs7O0FBZ0ZOLGtCQUFlNkcsU0FBZixDQ3ZGQSxJQUFPYyxPQUFQLEdBQWlCLFVBQUNDLE1BQUQ7TUFDaEJsSCxNQUFBbUgsU0FBQTNIOztNQUFHRyxLQUFLLENBQUNDLE9BQU4sQ0FBY3NILE1BQWQsQ0FBSDtXQUNRQTtHQURSLE1BQUE7OztTQUdjbEgsSUFBQSxVQUFBOzttQkFBYjtRQUFDQSxJQUFEO1FBQU1SOzs7Ozs7Q0FKUixDQ0FBLElBQUE0SCxPQUFBO0FBQUE7QUFTTUE7UUFBTkEsT0FBQSxTQUFzQnRLLE9BQUEsQ0FBUSxZQUFSLENBQXRCLENBQUE7SUFDQ0MsV0FBYSxnQkFBQSxZQUE0QixFQUE1QixFQUFnQ2QsUUFBaEM7VUFDWkUsR0FBQXlKLEtBQUFyRSxRQUFBN0c7O1dBRGMyTSxlQUFELGtCQUFBO1dBQW1CMUIsT0FBRCxVQUFBO1dBRTlCMUosUUFBRCxHQUFZaUcsUUFBUSxDQUFDb0YsUUFBVCxDQUFrQixRQUFsQixFQUE0QmxGLEtBQTVCLENBQWtDbkksUUFBbEMsRUFBNENnQyxRQUE1QyxDQUFaO1dBQ0NBLFFBQUQsQ0FBVXRDLFVBQVYsR0FBdUJhLEtBQUEsQ0FBSSxLQUFDeUIsUUFBRCxDQUFVdEMsVUFBZCxDQUF2QjtXQUNDc0MsUUFBRCxDQUFVaEMsUUFBVixHQUFxQmdOLE9BQUEsQ0FBUSxLQUFDaEwsUUFBRCxDQUFVaEMsUUFBVixJQUFzQixFQUE5QixDQUFyQjtXQUNDQyxJQUFELEdBQVEsRUFBUjtXQUNDaUQsRUFBRCxHQUFNMUMsUUFBUSxDQUFDMkMsS0FBVCxDQUFlLElBQWYsRUFBcUI7UUFBQUMsZUFBQSxFQUFnQjtPQUFyQyxDQUFOO1dBQ0NrSyxNQUFELEdBQVUsSUFBSXBCLFdBQUosQ0FBYyxJQUFkLENBQVY7OztXQUM0QmhLLEtBQUEsa0JBQUEsU0FBQSxLQUFBOzs7O1VBQTVCb0YsTUFBTSxDQUFDdkIsSUFBUCxHQUFldUIsTUFBTSxDQUFDeEIsS0FBdEI7Ozs7V0FFQ3lILGNBQUQsQ0FBZ0IsS0FBQ3ZMLFFBQUQsQ0FBVWhDLFFBQTFCOztXQUNDdUksZUFBRDs7V0FDQ3JGLEVBQUQsQ0FBSUksUUFBSixDQUFhLEtBQUM4SixlQUFkOztXQUNDRSxNQUFELENBQVFYLGlCQUFSOzs7SUFHRHBFLGVBQWlCO1dBQ2YrRSxNQUFELENBQVFySixFQUFSLENBQVcsUUFBWCxFQUFxQixDQUFDcUQsTUFBRCxFQUFTL0IsS0FBVDthQUNuQmlJLEdBQUQsQ0FBS2xHLE1BQUwsRUFBYS9CLEtBQWI7ZUFDQSxLQUFDOEQsYUFBRDtPQUZEO1dBSUNpRSxNQUFELENBQVEzSyxLQUFSLENBQWNzQixFQUFkLENBQWlCLFlBQWpCLEVBQStCO2VBQzlCLEtBQUN3SixjQUFEO09BREQ7V0FHQ3hKLEVBQUQsQ0FBSSxRQUFKLEVBQWM7ZUFDYixLQUFDcUosTUFBRCxDQUFRWCxpQkFBUjtPQUREOztVQUdHLEtBQUMzSyxRQUFELENBQVUwTCxRQUFiO2VBQ0MsS0FBQ3pKLEVBQUQsQ0FBSSxRQUFKLEVBQWMsS0FBQ2pDLFFBQUQsQ0FBVTBMLFFBQXhCOzs7O0lBR0ZILGNBQWdCLENBQUN2TixRQUFEO1VBQ2ZrQyxHQUFBeUosS0FBQTVGLE1BQUF1QixRQUFBL0I7TUFBQXZGLFFBQUEsR0FBV2dOLE9BQUEsQ0FBUWhOLFFBQVIsQ0FBWDs7V0FFQWtDLEtBQUEsdUJBQUEsU0FBQSxLQUFBO1NBQUk7VUFBQzZELElBQUQ7VUFBT1I7OzthQUF3QkE7Ozs7UUFDbEMrQixNQUFBLEdBQVMsS0FBQ29GLFdBQUQsQ0FBYTNHLElBQWIsQ0FBVDs7WUFDbUIsT0FBT1IsS0FBUCxLQUFnQixVQUFuQztVQUFBQSxLQUFBLEdBQVFBLEtBQUEsRUFBUjs7O2FBQ0NpSSxHQUFELENBQUtsRyxNQUFMLEVBQWEvQixLQUFiOzs7O0lBR0Y4RCxhQUFlLENBQUNJLE1BQUQ7VUFBVyxDQUFPQSxNQUFQO2VBQ3pCLEtBQUNqRixJQUFELENBQU0sUUFBTixFQUFnQixLQUFDbUosU0FBRCxDQUFXLElBQVgsQ0FBaEI7Ozs7SUFFRGpCLFdBQWEsQ0FBQzNHLElBQUQsRUFBTzZILGFBQVcsS0FBQ2xDLE9BQW5CO2FBQ0xrQyxVQUFVLENBQUNoSSxJQUFYLENBQWdCLFVBQUMwQixNQUFEO2VBQVdBLE1BQU0sQ0FBQ3ZCLElBQVAsS0FBZUE7T0FBMUM7OztJQUVSK0csUUFBVSxDQUFDL0csSUFBRCxFQUFPNkgsYUFBVyxLQUFDM04sSUFBbkI7YUFDRjJOLFVBQVUsQ0FBQ2hJLElBQVgsQ0FBZ0IsVUFBQ0ksR0FBRDtlQUFRQSxHQUFHLENBQUNELElBQUosS0FBWUE7T0FBcEM7OztJQUVSOEgsWUFBYyxDQUFDOUgsSUFBRDthQUNOLEtBQUMvRCxRQUFELENBQVVoQyxRQUFWLENBQW1CNEYsSUFBbkIsQ0FBd0IsVUFBQ2tJLFFBQUQ7ZUFBYUEsUUFBUSxDQUFDL0gsSUFBVCxLQUFpQkE7T0FBdEQ7OztJQUVSZ0ksU0FBVyxDQUFDekcsTUFBRDtVQUNWLENBQU8sS0FBQ29GLFdBQUQsQ0FBYXBGLE1BQU0sQ0FBQ3ZCLElBQXBCLENBQVA7ZUFDQyxLQUFDMkYsT0FBRCxDQUFTc0MsSUFBVCxDQUFjMUcsTUFBZDs7OztJQUVGa0csR0FBSyxDQUFDbEcsTUFBRCxFQUFTL0IsS0FBVDtVQUNKUzs7VUFBaUMsT0FBT3NCLE1BQVAsS0FBaUIsUUFBbEQ7UUFBQUEsTUFBQSxHQUFTLEtBQUNvRixXQUFELENBQWFwRixNQUFiLENBQVQ7OztNQUNBdEIsR0FBQSxHQUFNLElBQUk2QixLQUFKLENBQVFQLE1BQVIsRUFBZ0IsS0FBQ3RGLFFBQWpCLENBQU47TUFFQWdFLEdBQUcsQ0FBQ21FLFlBQUosQ0FBaUIsS0FBQ3BGLEdBQUQsQ0FBS3pFLFNBQXRCOztVQUN3QmlGLGFBQXhCO1FBQUFTLEdBQUcsQ0FBQ00sR0FBSixDQUFRZixLQUFSLEVBQWUsSUFBZjs7O01BQ0FTLEdBQUcsQ0FBQ2lJLElBQUosQ0FBUyxRQUFULEVBQW1CO2VBQUssS0FBQ2hDLE1BQUQsQ0FBUWpHLEdBQVI7T0FBeEI7TUFDQUEsR0FBRyxDQUFDL0IsRUFBSixDQUFPLFFBQVAsRUFBaUI7ZUFBSyxLQUFDb0YsYUFBRDtPQUF0QjtNQUNBckQsR0FBRyxDQUFDckQsS0FBSixDQUFVc0IsRUFBVixDQUFhLFlBQWIsRUFBMkI7ZUFBSyxLQUFDd0osY0FBRDtPQUFoQzthQUVBLEtBQUN4TixJQUFELENBQU0rTixJQUFOLENBQVdoSSxHQUFYOzs7SUFFRGlHLE1BQVEsQ0FBQ2pHLEdBQUQsRUFBTXlELE1BQU47VUFDUHlFOztVQUEwQixPQUFPbEksR0FBUCxLQUFjLFFBQXhDO1FBQUFBLEdBQUEsR0FBTSxLQUFDbUksVUFBRCxDQUFZbkksR0FBWixDQUFOOzs7TUFDQUEsR0FBRyxDQUFDckQsS0FBSixDQUFVNEIsS0FBVjtNQUNBMkosUUFBQSxHQUFXLEtBQUNqTyxJQUFELENBQU1tTyxPQUFOLENBQWNwSSxHQUFkLENBQVg7O1VBRUcsS0FBQ2hFLFFBQUQsQ0FBVWxDLGVBQVYsSUFBOEIsS0FBQytOLFlBQUQsQ0FBYzdILEdBQUcsQ0FBQ0QsSUFBbEIsQ0FBakM7UUFDQ0MsR0FBRyxDQUFDTSxHQUFKLENBQVEsS0FBQ3VILFlBQUQsQ0FBYzdILEdBQUcsQ0FBQ0QsSUFBbEIsQ0FBUixFQUFpQyxJQUFqQzthQUNDOUYsSUFBRCxDQUFNb08sTUFBTixDQUFhSCxRQUFiLEVBQXVCLENBQXZCLEVBQTBCbEksR0FBMUI7T0FGRCxNQUFBO1FBSUNBLEdBQUcsQ0FBQzlDLEVBQUosQ0FBTytJLE1BQVA7YUFDQ2hNLElBQUQsQ0FBTW9PLE1BQU4sQ0FBYUgsUUFBYixFQUF1QixDQUF2Qjs7O1dBRUE3RSxhQUFELENBQWVJLE1BQWY7OztJQUdENkUsU0FBVyxDQUFDN0UsTUFBRDtVQUNWdkgsR0FBQXlKLEtBQUFsTCxLQUFBdUY7OztXQUFtQjlELEtBQUEsa0JBQUEsU0FBQSxLQUFBOzthQUFsQitKLE1BQUQsQ0FBUWpHLEdBQVIsRUFBYSxJQUFiOzs7V0FDQ3FELGFBQUQsQ0FBZUksTUFBZjs7O0lBR0Q4RSxTQUFXLENBQUNDLE1BQUQsRUFBUy9FLE1BQVQ7VUFDVnZILEdBQUF1TSxPQUFBOUMsS0FBQTVGLE1BQUF0RixLQUFBOEU7OztXQUFBa0osYUFBQSxrQkFBQSxTQUFBLGFBQUE7U0FBSTtVQUFDMUksSUFBRDtVQUFNUjs7YUFDUm1KLFFBQUQsQ0FBVTNJLElBQVYsRUFBZ0JSLEtBQWhCLEVBQXVCLElBQXZCLEVBQTZCa0osS0FBN0I7OzthQUVELEtBQUNwRixhQUFELENBQWVJLE1BQWY7OztJQUVEaUYsUUFBVSxDQUFDM0ksSUFBRCxFQUFPUixLQUFQLEVBQWNrRSxNQUFkLEVBQXNCa0YsU0FBdEI7VUFDVGYsWUFBQWdCO01BQUFoQixVQUFBLEdBQWdCZSxTQUFILEdBQWtCLEtBQUMxTyxJQUFELENBQU02TCxLQUFOLENBQVk2QyxTQUFaLENBQWxCLEdBQThDLEtBQUMxTyxJQUE1RDtNQUNBMk8sUUFBQSxHQUFXLEtBQUM5QixRQUFELENBQVUvRyxJQUFWLEVBQWdCNkgsVUFBaEIsQ0FBWDs7VUFFR2dCLFFBQUg7UUFDQ0EsUUFBUSxDQUFDdEksR0FBVCxDQUFhZixLQUFiLEVBQW9CLElBQXBCO09BREQsTUFHSyxJQUFHLEtBQUNtSCxXQUFELENBQWEzRyxJQUFiLENBQUg7YUFDSHlILEdBQUQsQ0FBS3pILElBQUwsRUFBV1IsS0FBWDs7O2FBRUQsS0FBQzhELGFBQUQsQ0FBZUksTUFBZjs7O0lBRURvRixhQUFlLENBQUNMLE1BQUQsRUFBUy9FLE1BQVQ7V0FDYjZFLFNBQUQsQ0FBVyxJQUFYO1dBQ0NDLFNBQUQsQ0FBV0MsTUFBWCxFQUFtQixJQUFuQjthQUNBLEtBQUNuRixhQUFELENBQWVJLE1BQWY7OztJQUVEa0UsU0FBVzthQUNWLEtBQUMxTixJQUFELENBQU02TyxHQUFOLENBQVUsVUFBQzlJLEdBQUQ7ZUFDVDtVQUFBRCxJQUFBLEVBQU1DLEdBQUcsQ0FBQ0QsSUFBVjtVQUNBUixLQUFBLEVBQU9TLEdBQUcsQ0FBQ1Q7O09BRlo7OztJQUtEa0ksY0FBZ0I7VUFDZnZMLEdBQUF5SixLQUFBbEwsS0FBQXVGO1dBQUNzSCxNQUFELENBQVEzSyxLQUFSLENBQWM0QixLQUFkOzs7V0FDa0JyQyxLQUFBLGtCQUFBLFNBQUEsS0FBQTs7UUFBbEI4RCxHQUFHLENBQUNyRCxLQUFKLENBQVU0QixLQUFWOzs7O0lBR0R3SyxPQUFTO1dBQ1B0QixjQUFEO1dBQ0N2SyxFQUFELENBQUkrSSxNQUFKO1dBQ0N6SCxJQUFELENBQU0sU0FBTjs7OztBQU1EVSxFQUFBQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCZ0ksT0FBQyxDQUFBL0gsU0FBekIsRUFDQztXQUFPO01BQUFDLEdBQUEsRUFBSztlQUFLLEtBQUNuQyxFQUFELENBQUlvQzs7S0FBckI7a0JBQ2M7TUFBQUQsR0FBQSxFQUFLO1lBQ2xCcEY7UUFBQUEsSUFBQSxHQUFPLEtBQUNBLElBQVI7ZUFDQSxJQUFJO2NBQUtpQyxHQUFBeUosS0FBQTNGOztlQUFrQjlELEtBQUEsbUJBQUEsU0FBQSxLQUFBOztpQkFBaEI4RCxHQUFHLENBQUNELElBQU4sSUFBY0MsR0FBZDs7O2lCQUFtQztTQUE1Qzs7O0dBSkY7O2lCQXBJSzs7QUE0SU4sZUFBZW1ILE9BQWYifQ==
