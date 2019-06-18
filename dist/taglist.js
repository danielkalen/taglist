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

var extender = TagList;var version = "3.0.4";exports.BufferTag=BufferTag$1;exports.Popup=Popup$1;exports.Tag=Tag$1;exports.default=extender;exports.version=version;Object.defineProperty(exports,'__esModule',{value:true});}));