function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

(function (require, global) {
  require = function (cache, modules, cx) {
    var loader = function loader(r) {
      if (!modules[r]) throw new Error(r + ' is not a module');
      return cache[r] ? cache[r].exports : (cache[r] = {
        exports: {}
      }, cache[r].exports = modules[r].call(cx, require, cache[r], cache[r].exports));
    };

    loader.modules = modules;
    return loader;
  }({}, {
    0: function _(require, module, exports) {
      var ___index7 = require(1);

      var ___index8 = require(2);

      var ___index9 = require(3);

      exports.default = ___index7.default;
      var Popup = exports.Popup = ___index8.default;
      var Tag = exports.Tag = ___index9.default;
      var version = exports.version = "3.0.1";
      return module.exports;
    },
    1: function _(require, module, exports) {
      var TagList;

      var __index5 = require(5),
          extend = __index5;

      var __index6 = require(6),
          DOM = __index6;

      var __defaults = require(7);

      var __template3 = require(8);

      var ___index = require(3);

      var ___index2 = require(2);

      var __helpers = require(9);

      TagList = function () {
        var TagList =
        /*#__PURE__*/
        function (_require) {
          _inherits(TagList, _require);

          function TagList(targetContainer) {
            var _this2;

            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var settings = arguments.length > 2 ? arguments[2] : undefined;

            _classCallCheck(this, TagList);

            var i, len, option, ref;
            _this2 = _possibleConstructorReturn(this, _getPrototypeOf(TagList).call(this));
            _this2.targetContainer = targetContainer;
            _this2.options = options;
            _this2.settings = extend.deepOnly('button').clone(__defaults.default, settings);
            _this2.settings.boundingEl = DOM(_this2.settings.boundingEl);
            _this2.settings.defaults = __helpers.toArray(_this2.settings.defaults || []);
            _this2.tags = [];
            _this2.el = __template3.default.spawn(null, {
              relatedInstance: _assertThisInitialized(_assertThisInitialized(_this2))
            });
            _this2.buffer = new ___index.BufferTag(_assertThisInitialized(_assertThisInitialized(_this2)));
            ref = _this2.options;

            for (i = 0, len = ref.length; i < len; i++) {
              option = ref[i];

              if (option.name == null) {
                option.name = option.label;
              }
            }

            _this2._applyDefaults(_this2.settings.defaults);

            _this2._attachBindings();

            _this2.el.appendTo(_this2.targetContainer);

            _this2.buffer._updateSelectable();

            return _this2;
          }

          _createClass(TagList, [{
            key: "_attachBindings",
            value: function _attachBindings() {
              var _this3 = this;

              this.buffer.on('change', function (option, value) {
                _this3.add(option, value);

                return _this3._notifyChange();
              });
              this.buffer.popup.on('beforeopen', function () {
                return _this3.closeAllPopups();
              });
              this.on('change', function () {
                return _this3.buffer._updateSelectable();
              });

              if (this.settings.onChange) {
                return this.on('change', this.settings.onChange);
              }
            }
          }, {
            key: "_applyDefaults",
            value: function _applyDefaults(defaults) {
              var i, len, name, option, value;
              defaults = __helpers.toArray(defaults);

              for (i = 0, len = defaults.length; i < len; i++) {
                var _defaults$i = defaults[i];
                name = _defaults$i.name;
                value = _defaults$i.value;

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
          }, {
            key: "_notifyChange",
            value: function _notifyChange(SILENT) {
              if (!SILENT) {
                return this.emit('change', this.getValues(true));
              }
            }
          }, {
            key: "_findOption",
            value: function _findOption(name) {
              var collection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.options;
              return collection.find(function (option) {
                return option.name === name;
              });
            }
          }, {
            key: "_findTag",
            value: function _findTag(name) {
              var collection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.tags;
              return collection.find(function (tag) {
                return tag.name === name;
              });
            }
          }, {
            key: "_findDefault",
            value: function _findDefault(name) {
              return this.settings.defaults.find(function (default_) {
                return default_.name === name;
              });
            }
          }, {
            key: "addOption",
            value: function addOption(option) {
              if (!this._findOption(option.name)) {
                return this.options.push(option);
              }
            }
          }, {
            key: "add",
            value: function add(option, value) {
              var _this4 = this;

              var tag;

              if (typeof option === 'string') {
                option = this._findOption(option);
              }

              tag = new ___index.default(option, this.settings);
              tag.insertBefore(this.els.addButton);

              if (value != null) {
                tag.set(value, true);
              }

              tag.once('remove', function () {
                return _this4.remove(tag);
              });
              tag.on('change', function () {
                return _this4._notifyChange();
              });
              tag.popup.on('beforeopen', function () {
                return _this4.closeAllPopups();
              });
              return this.tags.push(tag);
            }
          }, {
            key: "remove",
            value: function remove(tag, SILENT) {
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
          }, {
            key: "removeAll",
            value: function removeAll(SILENT) {
              var i, len, ref, tag;
              ref = this.tags.slice();

              for (i = 0, len = ref.length; i < len; i++) {
                tag = ref[i];
                this.remove(tag, true);
              }

              this._notifyChange(SILENT);
            }
          }, {
            key: "setValues",
            value: function setValues(values, SILENT) {
              var i, index, len, name, ref, value;
              ref = __helpers.toArray(values);

              for (index = i = 0, len = ref.length; i < len; index = ++i) {
                var _ref$index = ref[index];
                name = _ref$index.name;
                value = _ref$index.value;
                this.setValue(name, value, true, index);
              }

              return this._notifyChange(SILENT);
            }
          }, {
            key: "setValue",
            value: function setValue(name, value, SILENT, fromIndex) {
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
          }, {
            key: "replaceValues",
            value: function replaceValues(values, SILENT) {
              this.removeAll(true);
              this.setValues(values, true);
              return this._notifyChange(SILENT);
            }
          }, {
            key: "getValues",
            value: function getValues() {
              return this.tags.map(function (tag) {
                return {
                  name: tag.name,
                  value: tag.value
                };
              });
            }
          }, {
            key: "closeAllPopups",
            value: function closeAllPopups() {
              var i, len, ref, tag;
              this.buffer.popup.close();
              ref = this.tags;

              for (i = 0, len = ref.length; i < len; i++) {
                tag = ref[i];
                tag.popup.close();
              }
            }
          }, {
            key: "destroy",
            value: function destroy() {
              this.closeAllPopups();
              this.el.remove();
              this.emit('destroy');
            }
          }]);

          return TagList;
        }(require(10));

        ;
        Object.defineProperties(TagList.prototype, {
          'els': {
            get: function get() {
              return this.el.child;
            }
          },
          'tagsByName': {
            get: function get() {
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
      }.call(this);

      exports.default = TagList;
      return module.exports;
    },
    2: function _(require, module, exports) {
      var Popup;

      var __popper = require(11),
          Popper = __popper;

      var __template2 = require(12);

      var __index4 = require(6),
          DOM = __index4;

      Popup = function () {
        var Popup =
        /*#__PURE__*/
        function (_require2) {
          _inherits(Popup, _require2);

          function Popup(parent, settings, boundingEl) {
            var _this5;

            _classCallCheck(this, Popup);

            _this5 = _possibleConstructorReturn(this, _getPrototypeOf(Popup).call(this));
            _this5.parent = parent;
            _this5.settings = settings;
            _this5.state = {
              open: false
            };
            _this5.el = __template2.default.spawn(null, {
              relatedInstance: _assertThisInitialized(_assertThisInitialized(_this5))
            });

            _this5.el.hide().appendTo(_this5.parent);

            _this5.popper = new Popper(_this5.parent[0], _this5.el[0], {
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
            return _this5;
          }

          _createClass(Popup, [{
            key: "_attachOuterClickListener",
            value: function _attachOuterClickListener() {
              var _this6 = this;

              return DOM(document).on('click.outerClick', function (event) {
                var targetParents;
                targetParents = DOM(event.target).parents;

                if (!targetParents.includes(_this6.parent)) {
                  _this6.close();

                  return _this6.emit('blur');
                }
              });
            }
          }, {
            key: "_detachOuterClickListener",
            value: function _detachOuterClickListener() {
              return DOM(document).off('click.outerClick');
            }
          }, {
            key: "open",
            value: function open() {
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
          }, {
            key: "close",
            value: function close() {
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
          }, {
            key: "setContent",
            value: function setContent(content) {
              this.els.content.empty();

              if (content) {
                return this.els.content.append(content);
              }
            }
          }]);

          return Popup;
        }(require(10));

        ;
        Object.defineProperties(Popup.prototype, {
          'els': {
            get: function get() {
              return this.el.child;
            }
          }
        });
        return Popup;
      }.call(this);

      exports.default = Popup;
      return module.exports;
    },
    3: function _(require, module, exports) {
      var Tag;

      var __index11 = require(6),
          DOM = __index11;

      var __index12 = require(5),
          extend = __index12;

      var ___index6 = require(2);

      var __stringify = require(13);

      var __updater = require(14);

      var __template6 = require(15);

      var defaults = require(16);

      var __errors = require(17);

      Tag = function () {
        var Tag =
        /*#__PURE__*/
        function (_require3) {
          _inherits(Tag, _require3);

          function Tag(option, listSettings) {
            var _this7;

            _classCallCheck(this, Tag);

            var settings1, settings2;
            _this7 = _possibleConstructorReturn(this, _getPrototypeOf(Tag).call(this));
            settings1 = extend.keys(['button', 'fontFamily']).clone(listSettings);
            settings2 = extend.keys(['padding', 'maxWidth']).clone(option);
            _this7.settings = extend.clone(defaults.settings, listSettings.tag, settings1, settings2);
            _this7.option = extend.clone(defaults.option, option);
            _this7.option.popup = extend.clone(listSettings.popup, _this7.option.popup);
            _this7.state = {};
            _this7.name = _this7.option.name;
            _this7.label = _this7.option.label;
            _this7.el = __template6.default.spawn(null, {
              relatedInstance: _assertThisInitialized(_assertThisInitialized(_this7))
            });
            _this7.content = __template6.content.spawn(null, {
              relatedInstance: _assertThisInitialized(_assertThisInitialized(_this7))
            });
            _this7.button = __template6.button.spawn({
              data: {
                text: 'Apply'
              }
            }, {
              relatedInstance: _assertThisInitialized(_assertThisInitialized(_this7))
            });
            _this7.popup = new ___index6.default(_this7.el, listSettings, listSettings.boundingEl);

            _this7.popup.setContent(_this7.content);

            if (_this7.settings.updateWhen === 'applied') {
              _this7.button.insertAfter(_this7.content);
            }

            _this7._setup();

            _this7._attachBindings();

            return _this7;
          }

          _createClass(Tag, [{
            key: "_setup",
            value: function _setup() {
              if (this.option.hideLabel) {
                return this.els.label.hide();
              } else {
                return this.els.label.html = "".concat(this.option.label, ": ");
              }
            }
          }, {
            key: "_attachBindings",
            value: function _attachBindings() {
              var _this8 = this;

              this.els.removeButton.on('click', function (event) {
                _this8.emit('remove');

                return event.stopPropagation();
              });
              this.el.on('click', function () {
                return _this8.popup.open();
              });
              this.button.on('click', function (e) {
                e.stopPropagation();

                if (_this8._applyChanges()) {
                  return _this8.popup.close();
                }
              });

              if (this.settings.updateWhen === 'applied') {
                this.popup.on('open', function () {
                  var base;
                  return (base = _this8.state).valueOnFocus != null ? base.valueOnFocus : base.valueOnFocus = _this8.value;
                });
                return this.popup.on('blur', function () {
                  if (_this8.value !== _this8.state.valueOnFocus) {
                    if (!_this8._applyChanges()) {
                      console.log('opening');
                      return _this8.popup.open();
                    }
                  }
                });
              }
            }
          }, {
            key: "_initField",
            value: function _initField() {
              this.field = this.option.field.call(this, this.content.raw, __updater.default(this));

              if (this.option.default) {
                return this.set(this.option.default, true);
              }
            }
          }, {
            key: "_domInsert",
            value: function _domInsert(method, target) {
              this.el[method](target);

              this._initField();

              return this;
            }
          }, {
            key: "_notifyChange",
            value: function _notifyChange() {
              return this.emit('change', this.value);
            }
          }, {
            key: "_updateText",
            value: function _updateText(value) {
              return this.els.value.text = __stringify.default(value, this.option.formatter);
            }
          }, {
            key: "_updateFromUser",
            value: function _updateFromUser(value, SILENT) {
              this._updateText(value);

              this.option.setter.call(this, value);

              if (!SILENT) {
                return this._notifyChange();
              }
            }
          }, {
            key: "_updateFromField",
            value: function _updateFromField(value) {
              this._updateText(value);

              if (this.settings.updateWhen !== 'applied') {
                return this._notifyChange();
              }
            }
          }, {
            key: "_applyChanges",
            value: function _applyChanges() {
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
          }, {
            key: "get",
            value: function get(skipTransform) {
              var value;
              value = this.option.getter.call(this);

              if (this.option.transformOutput && !skipTransform) {
                value = this.option.transformOutput(value);
              }

              return value;
            }
          }, {
            key: "set",
            value: function set(value, SILENT) {
              if (typeof value === 'function') {
                value = value();
              }

              if (this.option.transformInput) {
                value = this.option.transformInput(value);
              }

              return this._updateFromUser(value, SILENT);
            }
          }, {
            key: "validate",
            value: function validate() {
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
                  return new __errors.ValidationError("validation failed");

                case typeof result !== 'string':
                  return new __errors.ValidationError(result);

                case !(result instanceof Error):
                  return result;
              }
            }
          }, {
            key: "appendTo",
            value: function appendTo(target) {
              return this._domInsert('appendTo', target);
            }
          }, {
            key: "prependTo",
            value: function prependTo(target) {
              return this._domInsert('prependTo', target);
            }
          }, {
            key: "insertBefore",
            value: function insertBefore(target) {
              return this._domInsert('insertBefore', target);
            }
          }, {
            key: "insertAfter",
            value: function insertAfter(target) {
              return this._domInsert('insertAfter', target);
            }
          }]);

          return Tag;
        }(require(10));

        ;
        Object.defineProperties(Tag.prototype, {
          els: {
            get: function get() {
              return this.el.child;
            }
          },
          value: {
            get: function get() {
              return this.get();
            }
          },
          rawValue: {
            get: function get() {
              return this.get(true);
            }
          }
        });
        return Tag;
      }.call(this);

      exports.default = Tag;

      var BufferTag = exports.BufferTag = require(18);

      return module.exports;
    },
    5: function _(require, module, exports) {
      var exports, extend, modifiers, newBuilder, normalizeKeys;
      extend = require(19);

      normalizeKeys = function normalizeKeys(keys) {
        var i, key, len, output;

        if (keys) {
          output = {};

          if (_typeof(keys) !== 'object') {
            output[keys] = true;
          } else {
            if (!Array.isArray(keys)) {
              keys = Object.keys(keys);
            }

            for (i = 0, len = keys.length; i < len; i++) {
              key = keys[i];
              output[key] = true;
            }
          }

          return output;
        }
      };

      newBuilder = function newBuilder(isBase) {
        var _builder;

        _builder = function builder(target) {
          var theTarget;
          var $_len = arguments.length,
              $_i = -1,
              sources = new Array($_len);

          while (++$_i < $_len) {
            sources[$_i] = arguments[$_i];
          }

          if (_builder.options.target) {
            theTarget = _builder.options.target;
          } else {
            theTarget = target;
            sources.shift();
          }

          return extend(_builder.options, theTarget, sources);
        };

        if (isBase) {
          _builder.isBase = true;
        }

        _builder.options = {};
        Object.defineProperties(_builder, modifiers);
        return _builder;
      };

      modifiers = {
        'deep': {
          get: function get() {
            var _;

            _ = this.isBase ? newBuilder() : this;
            _.options.deep = true;
            return _;
          }
        },
        'own': {
          get: function get() {
            var _;

            _ = this.isBase ? newBuilder() : this;
            _.options.own = true;
            return _;
          }
        },
        'allowNull': {
          get: function get() {
            var _;

            _ = this.isBase ? newBuilder() : this;
            _.options.allowNull = true;
            return _;
          }
        },
        'nullDeletes': {
          get: function get() {
            var _;

            _ = this.isBase ? newBuilder() : this;
            _.options.nullDeletes = true;
            return _;
          }
        },
        'concat': {
          get: function get() {
            var _;

            _ = this.isBase ? newBuilder() : this;
            _.options.concat = true;
            return _;
          }
        },
        'clone': {
          get: function get() {
            var _;

            _ = this.isBase ? newBuilder() : this;
            _.options.target = {};
            return _;
          }
        },
        'notDeep': {
          get: function get() {
            var _;

            _ = this.isBase ? newBuilder() : this;
            return function (keys) {
              _.options.notDeep = normalizeKeys(keys);
              return _;
            };
          }
        },
        'deepOnly': {
          get: function get() {
            var _;

            _ = this.isBase ? newBuilder() : this;
            return function (keys) {
              _.options.deepOnly = normalizeKeys(keys);
              return _;
            };
          }
        },
        'keys': {
          get: function get() {
            var _;

            _ = this.isBase ? newBuilder() : this;
            return function (keys) {
              _.options.keys = normalizeKeys(keys);
              return _;
            };
          }
        },
        'notKeys': {
          get: function get() {
            var _;

            _ = this.isBase ? newBuilder() : this;
            return function (keys) {
              _.options.notKeys = normalizeKeys(keys);
              return _;
            };
          }
        },
        'transform': {
          get: function get() {
            var _;

            _ = this.isBase ? newBuilder() : this;
            return function (transform) {
              if (typeof transform === 'function') {
                _.options.globalTransform = transform;
              } else if (transform && _typeof(transform) === 'object') {
                _.options.transforms = transform;
              }

              return _;
            };
          }
        },
        'filter': {
          get: function get() {
            var _;

            _ = this.isBase ? newBuilder() : this;
            return function (filter) {
              if (typeof filter === 'function') {
                _.options.globalFilter = filter;
              } else if (filter && _typeof(filter) === 'object') {
                _.options.filters = filter;
              }

              return _;
            };
          }
        }
      };
      module.exports = exports = newBuilder(true);
      exports.version = "1.7.3";
      return module.exports;
    },
    6: function _(require, module, exports) {
      var _QuickDom;

      var CSS = require(21);

      var extend = require(5);

      var allowedOptions, allowedTemplateOptions;
      allowedTemplateOptions = ['id', 'name', 'type', 'href', 'selected', 'checked', 'className']; // To copy from DOM Elements

      allowedOptions = ['id', 'ref', 'type', 'name', 'text', 'style', 'class', 'className', 'url', 'href', 'selected', 'checked', 'props', 'attrs', 'passStateToChildren', 'stateTriggers']; // Used in QuickElement::toJSON
      // 'relatedInstance'

      ;
      var helpers, styleCache;
      helpers = {};

      helpers.includes = function (target, item) {
        return target && target.indexOf(item) !== -1;
      };

      helpers.removeItem = function (target, item) {
        var itemIndex;
        itemIndex = target.indexOf(item);

        if (itemIndex !== -1) {
          target.splice(itemIndex, 1);
        }

        return target;
      };

      helpers.normalizeGivenEl = function (targetEl) {
        switch (false) {
          case !IS.string(targetEl):
            return _QuickDom.text(targetEl);

          case !IS.domNode(targetEl):
            return _QuickDom(targetEl);

          case !IS.template(targetEl):
            return targetEl.spawn();

          default:
            return targetEl;
        }
      };

      helpers.isStateStyle = function (string) {
        return string[0] === '$' || string[0] === '@';
      };

      helpers.registerStyle = function (rule, level, important) {
        var cached, i, len, output, prop, props;
        level || (level = 0);
        cached = styleCache.get(rule, level);

        if (cached) {
          return cached;
        }

        output = {
          className: [CSS.register(rule, level, important)],
          fns: [],
          rule: rule
        };
        props = Object.keys(rule);

        for (i = 0, len = props.length; i < len; i++) {
          prop = props[i];

          if (typeof rule[prop] === 'function') {
            output.fns.push([prop, rule[prop]]);
          }
        }

        return styleCache.set(rule, output, level);
      };

      styleCache = new (
      /*#__PURE__*/
      function () {
        function _class() {
          _classCallCheck(this, _class);

          this.keys = Object.create(null);
          this.values = Object.create(null);
        }

        _createClass(_class, [{
          key: "get",
          value: function get(key, level) {
            var index;

            if (this.keys[level]) {
              index = this.keys[level].indexOf(key);

              if (index !== -1) {
                return this.values[level][index];
              }
            }
          }
        }, {
          key: "set",
          value: function set(key, value, level) {
            if (!this.keys[level]) {
              this.keys[level] = [];
              this.values[level] = [];
            }

            this.keys[level].push(key);
            this.values[level].push(value);
            return value;
          }
        }]);

        return _class;
      }())();
      ;
      var IS;
      IS = require(37);
      IS = IS.create('natives', 'dom');
      IS.load({
        quickDomEl: function quickDomEl(subject) {
          return subject && subject.constructor.name === QuickElement.name;
        },
        template: function template(subject) {
          return subject && subject.constructor.name === QuickTemplate.name;
        }
      });
      ;
      var QuickElement, svgNamespace;
      svgNamespace = 'http://www.w3.org/2000/svg';

      QuickElement = function () {
        var QuickElement =
        /*#__PURE__*/
        function () {
          function QuickElement(type, options) {
            _classCallCheck(this, QuickElement);

            this.type = type;
            this.options = options;
            QuickElement.count++;

            if (this.type[0] === '*') {
              this.svg = true;
            }

            this.el = this.options.existing || (this.type === 'text' ? document.createTextNode(typeof this.options.text === 'string' ? this.options.text : '') : this.svg ? document.createElementNS(svgNamespace, this.type.slice(1)) : document.createElement(this.type));

            if (this.type === 'text') {
              this.append = this.prepend = this.attr = function () {};
            }

            this._parent = null;
            this._styles = {};
            this._state = [];
            this._children = [];

            this._normalizeOptions();

            this._applyOptions();

            this._attachStateEvents();

            this._proxyParent();

            if (this.options.existing) {
              this._refreshParent();
            }

            this.el._quickElement = this;
          }

          _createClass(QuickElement, [{
            key: "toJSON",
            value: function toJSON() {
              var child, children, i, len, output;
              output = [this.type, extend.clone.keys(allowedOptions)(this.options)];
              children = this.children;

              for (i = 0, len = children.length; i < len; i++) {
                child = children[i];
                output.push(child.toJSON());
              }

              return output;
            }
          }]);

          return QuickElement;
        }();

        ;
        QuickElement.count = 0;
        return QuickElement;
      }.call(this);

      if (QuickElement.name == null) {
        QuickElement.name = 'QuickElement';
      }

      Object.defineProperties(QuickElement.prototype, {
        'raw': {
          get: function get() {
            return this.el;
          }
        },
        '0': {
          get: function get() {
            return this.el;
          }
        },
        'css': {
          get: function get() {
            return this.style;
          }
        },
        'replaceWith': {
          get: function get() {
            return this.replace;
          }
        },
        'removeListener': {
          get: function get() {
            return this.off;
          }
        }
      });
      ;

      var _filterElements, _getChildRefs2, _getIndexByProp, _getParents;

      QuickElement.prototype.parentsUntil = function (filter) {
        return _getParents(this, filter);
      };

      QuickElement.prototype.parentMatching = function (filter) {
        var isRef, nextParent;

        if (IS.function(filter) || (isRef = IS.string(filter))) {
          nextParent = this.parent;

          while (nextParent) {
            if (isRef) {
              if (nextParent.ref === filter) {
                return nextParent;
              }
            } else {
              if (filter(nextParent)) {
                return nextParent;
              }
            }

            nextParent = nextParent.parent;
          }
        }
      };

      QuickElement.prototype.query = function (selector) {
        return _QuickDom(this.raw.querySelector(selector));
      };

      QuickElement.prototype.queryAll = function (selector) {
        var i, item, len, output, result;
        result = this.raw.querySelectorAll(selector);
        output = [];

        for (i = 0, len = result.length; i < len; i++) {
          item = result[i];
          output.push(item);
        }

        return new QuickBatch(output);
      };

      Object.defineProperties(QuickElement.prototype, {
        'children': {
          get: function get() {
            var child, i, len, ref1;

            if (this.el.childNodes.length !== this._children.length) {
              // Re-collect children	
              this._children.length = 0; // Empty out children array

              ref1 = this.el.childNodes;

              for (i = 0, len = ref1.length; i < len; i++) {
                child = ref1[i];

                if (child.nodeType < 4) {
                  this._children.push(_QuickDom(child));
                }
              }
            }

            return this._children;
          }
        },
        'elementChildren': {
          get: function get() {
            return _filterElements(this.children);
          }
        },
        'parent': {
          get: function get() {
            if ((!this._parent || this._parent.el !== this.el.parentNode) && !IS.domDoc(this.el.parentNode)) {
              this._parent = _QuickDom(this.el.parentNode);
            }

            return this._parent;
          }
        },
        'parents': {
          get: function get() {
            return _getParents(this);
          }
        },
        'next': {
          get: function get() {
            return _QuickDom(this.el.nextSibling);
          }
        },
        'nextEl': {
          get: function get() {
            return _QuickDom(this.el.nextElementSibling);
          }
        },
        'nextElAll': {
          get: function get() {
            return _filterElements(this.nextAll);
          }
        },
        'nextAll': {
          get: function get() {
            var nextSibling, siblings;
            siblings = [];
            nextSibling = _QuickDom(this.el.nextSibling);

            while (nextSibling) {
              siblings.push(nextSibling);
              nextSibling = nextSibling.next;
            }

            return siblings;
          }
        },
        'prev': {
          get: function get() {
            return _QuickDom(this.el.previousSibling);
          }
        },
        'prevEl': {
          get: function get() {
            return _QuickDom(this.el.previousElementSibling);
          }
        },
        'prevElAll': {
          get: function get() {
            return _filterElements(this.prevAll);
          }
        },
        'prevAll': {
          get: function get() {
            var prevSibling, siblings;
            siblings = [];
            prevSibling = _QuickDom(this.el.previousSibling);

            while (prevSibling) {
              siblings.push(prevSibling);
              prevSibling = prevSibling.prev;
            }

            return siblings;
          }
        },
        'siblings': {
          get: function get() {
            return this.prevAll.reverse().concat(this.nextAll);
          }
        },
        'elementSiblings': {
          get: function get() {
            return _filterElements(this.siblings);
          }
        },
        'child': {
          get: function get() {
            return this._childRefs || _getChildRefs2(this);
          }
        },
        'childf': {
          get: function get() {
            return _getChildRefs2(this, true);
          }
        },
        'firstChild': {
          get: function get() {
            return this.children[0];
          }
        },
        'lastChild': {
          get: function get() {
            var children;
            children = this.children;
            return children[children.length - 1];
          }
        },
        'index': {
          get: function get() {
            var parent;

            if (!(parent = this.parent)) {
              return null;
            } else {
              return parent.children.indexOf(this);
            }
          }
        },
        'indexType': {
          get: function get() {
            return _getIndexByProp(this, 'type');
          }
        },
        'indexRef': {
          get: function get() {
            return _getIndexByProp(this, 'ref');
          }
        }
      });

      _getParents = function _getParents(targetEl, filter) {
        var isRef, nextParent, parents;

        if (!IS.function(filter) && !(isRef = IS.string(filter))) {
          filter = void 0;
        }

        parents = [];
        nextParent = targetEl.parent;

        while (nextParent) {
          parents.push(nextParent);
          nextParent = nextParent.parent;

          if (isRef) {
            if (nextParent && nextParent.ref === filter) {
              nextParent = null;
            }
          } else if (filter) {
            if (filter(nextParent)) {
              nextParent = null;
            }
          }
        }

        return parents;
      };

      _getChildRefs2 = function _getChildRefs(target, freshCopy) {
        var child, childRefs, children, el, i, len, ref, refs;

        if (freshCopy || !target._childRefs) {
          target._childRefs = {};
        }

        refs = target._childRefs;

        if (target.ref) {
          refs[target.ref] = target;
        }

        children = target.children;

        if (children.length) {
          for (i = 0, len = children.length; i < len; i++) {
            child = children[i];
            childRefs = _getChildRefs2(child, freshCopy);

            for (ref in childRefs) {
              el = childRefs[ref];
              refs[ref] || (refs[ref] = el);
            }
          }
        }

        return refs;
      };

      _getIndexByProp = function _getIndexByProp(main, prop) {
        var parent;

        if (!(parent = main.parent)) {
          return null;
        } else {
          return parent.children.filter(function (child) {
            return child[prop] === main[prop];
          }).indexOf(main);
        }
      };

      _filterElements = function _filterElements(array) {
        var i, item, len, output;

        if (!array.length) {
          return array;
        } else {
          output = [];

          for (i = 0, len = array.length; i < len; i++) {
            item = array[i];

            if (item.type !== 'text') {
              output.push(item);
            }
          }

          return output;
        }
      };

      ;
      var CACHED_FN_INSERTED, baseStateTriggers;
      baseStateTriggers = {
        'hover': {
          on: 'mouseenter',
          off: 'mouseleave',
          bubbles: true
        },
        'focus': {
          on: 'focus',
          off: 'blur',
          bubbles: true
        }
      };

      QuickElement.prototype._normalizeOptions = function () {
        var base1, base2, base3, base4;

        if (this.options.class) {
          this.options.className = this.options.class;
        }

        if (this.options.url) {
          this.options.href = this.options.url;
        }

        this.related = (base1 = this.options).relatedInstance != null ? base1.relatedInstance : base1.relatedInstance = this;

        if ((base2 = this.options).unpassableStates == null) {
          base2.unpassableStates = [];
        }

        if ((base3 = this.options).passStateToChildren == null) {
          base3.passStateToChildren = true;
        }

        if ((base4 = this.options).passDataToChildren == null) {
          base4.passDataToChildren = true;
        }

        this.options.stateTriggers = this.options.stateTriggers ? extend.clone.deep(baseStateTriggers, this.options.stateTriggers) : baseStateTriggers;

        if (this.type === 'text') {
          extend(this, this._parseTexts(this.options.text, this._texts));
        } else {
          extend(this, this._parseStyles(this.options.style, this._styles));
        }
      };

      QuickElement.prototype._parseStyles = function (styles, store) {
        var _mediaStates, _providedStates, _providedStatesShared, _stateShared, _styles, base, _flattenNestedStates, forceStyle, i, keys, len, specialStates, state, stateStyles, state_, states;

        if (!IS.objectPlain(styles)) {
          return;
        }

        keys = Object.keys(styles);
        states = keys.filter(function (key) {
          return helpers.isStateStyle(key);
        });
        specialStates = helpers.removeItem(states.slice(), '$base');
        _mediaStates = states.filter(function (key) {
          return key[0] === '@';
        }).map(function (state) {
          return state.slice(1);
        });
        _providedStates = states.map(function (state) {
          return state.slice(1);
        });
        _styles = store || {};
        _stateShared = _providedStatesShared = void 0;
        base = !helpers.includes(states, '$base') ? styles : styles.$base;
        _styles.base = helpers.registerStyle(base, 0, forceStyle = this.options.forceStyle);

        if (specialStates.length) {
          _flattenNestedStates = function flattenNestedStates(styleObject, chain, level) {
            var hasNonStateProps, i, len, output, state, stateChain, state_, styleKeys;
            styleKeys = Object.keys(styleObject);
            output = {};
            hasNonStateProps = false;

            for (i = 0, len = styleKeys.length; i < len; i++) {
              state = styleKeys[i];

              if (!helpers.isStateStyle(state)) {
                hasNonStateProps = true;
                output[state] = styleObject[state];
              } else {
                chain.push(state_ = state.slice(1));
                stateChain = new (require(55))(chain);

                if (_stateShared == null) {
                  _stateShared = [];
                }

                if (_providedStatesShared == null) {
                  _providedStatesShared = [];
                }

                _providedStatesShared.push(stateChain);

                if (state[0] === '@') {
                  _mediaStates.push(state_);
                }

                _styles[stateChain.string] = helpers.registerStyle(_flattenNestedStates(styleObject[state], chain, level + 1), level + 1, forceStyle);
              }
            }

            if (hasNonStateProps) {
              return output;
            }
          };

          for (i = 0, len = specialStates.length; i < len; i++) {
            state = specialStates[i];
            state_ = state.slice(1);
            stateStyles = _flattenNestedStates(styles[state], [state_], 1);

            if (stateStyles) {
              _styles[state_] = helpers.registerStyle(stateStyles, 1);
            }
          }
        }

        return {
          _styles: _styles,
          _mediaStates: _mediaStates,
          _stateShared: _stateShared,
          _providedStates: _providedStates,
          _providedStatesShared: _providedStatesShared
        };
      };

      QuickElement.prototype._parseTexts = function (texts, store) {
        var _providedStates, _texts, i, len, state, states;

        if (!IS.objectPlain(texts)) {
          return;
        }

        states = Object.keys(texts).map(function (state) {
          return state.slice(1);
        });
        _providedStates = states.filter(function (state) {
          return state !== 'base';
        });
        _texts = store || {};
        _texts = {
          base: ''
        };

        for (i = 0, len = states.length; i < len; i++) {
          state = states[i];
          _texts[state] = texts['$' + state];
        }

        return {
          _texts: _texts,
          _providedStates: _providedStates
        };
      };

      QuickElement.prototype._applyOptions = function () {
        var _this9 = this;

        var event, handler, method, ref, ref1, ref2, value;

        if (ref = this.options.id || this.options.ref) {
          this.attr('data-ref', this.ref = ref);
        }

        if (this.options.id) {
          this.el.id = this.options.id;
        }

        if (this.options.className) {
          this.el.className = this.options.className;
        }

        if (this.options.src) {
          this.el.src = this.options.src;
        }

        if (this.options.href) {
          this.el.href = this.options.href;
        }

        if (this.options.type) {
          this.el.type = this.options.type;
        }

        if (this.options.name) {
          this.el.name = this.options.name;
        }

        if (this.options.value) {
          this.el.value = this.options.value;
        }

        if (this.options.selected) {
          this.el.selected = this.options.selected;
        }

        if (this.options.checked) {
          this.el.checked = this.options.checked;
        }

        if (this.options.props) {
          this.prop(this.options.props);
        }

        if (this.options.attrs) {
          this.attr(this.options.attrs);
        }

        this._applyRegisteredStyle(this._styles.base, null, null, this.options.styleAfterInsert);

        if (this._texts) {
          this.text = this._texts.base;
        }

        this.on('inserted', CACHED_FN_INSERTED, false, true);

        if (this.options.invokeComputersOnce) {
          this._invokedComputers = {};
        }

        if (this.options.recalcOnResize) {
          window.addEventListener('resize', function () {
            return _this9.recalcStyle();
          });
        }

        if (this.options.events) {
          ref1 = this.options.events;

          for (event in ref1) {
            handler = ref1[event];
            this.on(event, handler);
          }
        }

        if (this.options.methods) {
          ref2 = this.options.methods;

          for (method in ref2) {
            value = ref2[method];

            if (!this[method]) {
              if (IS.function(value)) {
                this[method] = value;
              } else if (IS.object(value)) {
                Object.defineProperty(this, method, {
                  configurable: true,
                  get: value.get,
                  set: value.set
                });
              }
            }
          }
        }

        if (this.type !== 'text' && IS.object(this.options.text)) {
          this.append(_QuickDom('text', {
            text: this.options.text
          }));
        }
      };

      QuickElement.prototype._postCreation = function (data) {
        if (this.options.computers) {
          if (data && this.options.data) {
            data = extend.clone(this.options.data, data);
          }

          data || (data = this.options.data);
          this.applyData(data, false);

          if (this.options.computers._init) {
            this._runComputer('_init', data);
          }
        }

        if (this.options.state) {
          this.state(this.options.state);
        }
      };

      QuickElement.prototype._attachStateEvents = function (force) {
        var _this10 = this;

        var states;
        states = Object.keys(this.options.stateTriggers);
        states.forEach(function (state) {
          var disabler, enabler, trigger;
          trigger = _this10.options.stateTriggers[state];

          if (!helpers.includes(_this10._providedStates, state) && !force && !trigger.force) {
            return;
          }

          enabler = IS.string(trigger) ? trigger : trigger.on;

          if (IS.object(trigger)) {
            disabler = trigger.off;
          }

          _this10._listenTo(enabler, function () {
            return _this10.state(state, true, trigger.bubbles);
          });

          if (disabler) {
            return _this10._listenTo(disabler, function () {
              return _this10.state(state, false, trigger.bubbles);
            });
          }
        });
      };

      QuickElement.prototype._proxyParent = function () {
        var parent;
        parent = void 0;
        return Object.defineProperty(this, '_parent', {
          get: function get() {
            return parent;
          },
          set: function set(newParent) {
            var _this11 = this;

            var lastParent;

            if (parent = newParent) {
              lastParent = this.parents.slice(-1)[0];

              if (lastParent.raw === document.documentElement) {
                this._unproxyParent(newParent);
              } else {
                parent.on('inserted', function () {
                  if (parent === newParent) {
                    return _this11._unproxyParent(newParent);
                  }
                });
              }
            }
          }
        });
      };

      QuickElement.prototype._unproxyParent = function (newParent) {
        delete this._parent;
        this._parent = newParent;
        this.emitPrivate('inserted', newParent);
      };

      CACHED_FN_INSERTED = function CACHED_FN_INSERTED() {
        var i, len, mediaStates, queryString, results;
        this._inserted = this;

        if (this.options.styleAfterInsert) {
          this.recalcStyle();
        }

        if ((mediaStates = this._mediaStates) && this._mediaStates.length) {
          this._mediaStates = Object.create(null);
          results = [];

          for (i = 0, len = mediaStates.length; i < len; i++) {
            queryString = mediaStates[i];
            results.push(this._mediaStates[queryString] = MediaQuery.register(this, queryString));
          }

          return results;
        }
      };

      ;
      var regexWhitespace;
      regexWhitespace = /\s+/;

      QuickElement.prototype.on = function (eventNames, callback, useCapture, isPrivate) {
        var _this12 = this;

        var callbackRef, split;

        if (this._eventCallbacks == null) {
          this._eventCallbacks = {
            __refs: {}
          };
        }

        if (IS.string(eventNames) && IS.function(callback)) {
          split = eventNames.split('.');
          callbackRef = split[1];
          eventNames = split[0];

          if (eventNames === 'inserted' && this._inserted) {
            callback.call(this, this._parent);
            return this;
          }

          eventNames.split(regexWhitespace).forEach(function (eventName) {
            if (!_this12._eventCallbacks[eventName]) {
              _this12._eventCallbacks[eventName] = [];

              if (!isPrivate) {
                _this12._listenTo(eventName, function (event) {
                  return _this12._invokeHandlers(eventName, event);
                }, useCapture);
              }
            }

            if (callbackRef) {
              _this12._eventCallbacks.__refs[callbackRef] = callback;
            }

            return _this12._eventCallbacks[eventName].push(callback);
          });
        }

        return this;
      };

      QuickElement.prototype.once = function (eventNames, callback) {
        var _this13 = this;

        var _onceCallback;

        if (IS.string(eventNames) && IS.function(callback)) {
          this.on(eventNames, _onceCallback = function onceCallback(event) {
            _this13.off(eventNames, _onceCallback);

            return callback.call(_this13, event);
          });
        }

        return this;
      };

      QuickElement.prototype.off = function (eventNames, callback) {
        var _this14 = this;

        var callbackRef, eventName, split;

        if (this._eventCallbacks == null) {
          this._eventCallbacks = {
            __refs: {}
          };
        }

        if (!IS.string(eventNames)) {
          for (eventName in this._eventCallbacks) {
            this.off(eventName);
          }
        } else {
          split = eventNames.split('.');
          callbackRef = split[1];
          eventNames = split[0];
          eventNames.split(regexWhitespace).forEach(function (eventName) {
            if (_this14._eventCallbacks[eventName]) {
              if (callback == null) {
                callback = _this14._eventCallbacks.__refs[callbackRef];
              }

              if (IS.function(callback)) {
                return helpers.removeItem(_this14._eventCallbacks[eventName], callback);
              } else if (!callbackRef) {
                return _this14._eventCallbacks[eventName].length = 0;
              }
            }
          });
        }

        return this;
      };

      QuickElement.prototype.emit = function (eventName) {
        var bubbles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var cancelable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var data = arguments.length > 3 ? arguments[3] : undefined;
        var event;

        if (eventName && IS.string(eventName)) {
          event = document.createEvent('Event');
          event.initEvent(eventName, bubbles, cancelable);

          if (data && _typeof(data) === 'object') {
            extend(event, data);
          }

          this.el.dispatchEvent(event);
        }

        return this;
      };

      QuickElement.prototype.emitPrivate = function (eventName, arg) {
        var ref;

        if (eventName && IS.string(eventName) && ((ref = this._eventCallbacks) != null ? ref[eventName] : void 0)) {
          this._invokeHandlers(eventName, arg);
        }

        return this;
      };

      QuickElement.prototype._invokeHandlers = function (eventName, arg) {
        var callbacks, cb, i, len;
        callbacks = this._eventCallbacks[eventName].slice();

        for (i = 0, len = callbacks.length; i < len; i++) {
          cb = callbacks[i];
          cb.call(this, arg);
        }
      };
      /* istanbul ignore next */


      QuickElement.prototype._listenTo = function (eventName, callback, useCapture) {
        var eventNameToListenFor, listenMethod;
        listenMethod = this.el.addEventListener ? 'addEventListener' : 'attachEvent';
        eventNameToListenFor = this.el.addEventListener ? eventName : "on".concat(eventName);
        this.el[listenMethod](eventNameToListenFor, callback, useCapture);
        return this;
      };

      ;
      var DUMMY_ARRAY;
      DUMMY_ARRAY = [];

      QuickElement.prototype.state = function (targetState, value, bubbles, source) {
        var activeStates, child, desiredValue, i, j, key, keys, len, prop, ref, toggle;

        if (arguments.length === 0) {
          return this._state.slice();
        }

        if (arguments.length === 1) {
          if (IS.string(targetState)) {
            return helpers.includes(this._state, targetState);
          } else if (IS.object(targetState)) {
            keys = Object.keys(targetState);
            i = -1;

            while (key = keys[++i]) {
              this.state(key, targetState[key]);
            }

            return this;
          }
        } else if (this._statePipeTarget && source !== this) {
          this._statePipeTarget.state(targetState, value, bubbles, this);

          return this;
        } else if (IS.string(targetState)) {
          if (targetState[0] === '$') {
            targetState = targetState.slice(1);
          }

          if (targetState === 'base') {
            return this;
          }

          desiredValue = !!value; // Convert the value to a boolean

          activeStates = this._getActiveStates(targetState, false); // ==== Toggle styles for this state =================================================================================

          if (this.state(targetState) !== desiredValue) {
            prop = this.type === 'text' ? 'Text' : 'Style';

            if (desiredValue) {
              //is on
              this._state.push(targetState);

              toggle = 'ON';
            } else {
              helpers.removeItem(this._state, targetState);
              toggle = 'OFF';
            }

            this['_turn' + prop + toggle](targetState, activeStates);
            this.emitPrivate("stateChange:".concat(targetState), desiredValue);
          } // ==== Pass state to parent/children =================================================================================


          if (!helpers.includes(this.options.unpassableStates, targetState)) {
            if (bubbles) {
              if (this.parent) {
                this._parent.state(targetState, value, true, source || this);
              }
            } else if (this.options.passStateToChildren) {
              ref = this._children;

              for (j = 0, len = ref.length; j < len; j++) {
                child = ref[j];
                child.state(targetState, value, false, source || this);
              }
            }
          }

          return this;
        }
      };

      QuickElement.prototype.toggleState = function (targetState) {
        return this.state(targetState, !this.state(targetState));
      };

      QuickElement.prototype.resetState = function () {
        var activeState, j, len, ref;
        ref = this._state.slice();

        for (j = 0, len = ref.length; j < len; j++) {
          activeState = ref[j];
          this.state(activeState, false);
        }

        return this;
      };

      QuickElement.prototype.pipeState = function (targetEl) {
        var activeState, j, len, ref;

        if (targetEl) {
          targetEl = helpers.normalizeGivenEl(targetEl);

          if (IS.quickDomEl(targetEl) && targetEl !== this) {
            this._statePipeTarget = targetEl;
            ref = this._state;

            for (j = 0, len = ref.length; j < len; j++) {
              activeState = ref[j];
              targetEl.state(activeState, true);
            }
          }
        } else if (targetEl === false) {
          delete this._statePipeTarget;
        }

        return this;
      };

      QuickElement.prototype._applyRegisteredStyle = function (targetStyle, superiorStates, includeBase, skipFns) {
        var className, entry, j, k, len, len1, ref, ref1, superiorStyles;

        if (targetStyle) {
          ref = targetStyle.className;

          for (j = 0, len = ref.length; j < len; j++) {
            className = ref[j];
            this.addClass(className);
          }

          if (targetStyle.fns.length && !skipFns) {
            if (superiorStates) {
              superiorStyles = this._resolveFnStyles(superiorStates, includeBase);
            }

            ref1 = targetStyle.fns;

            for (k = 0, len1 = ref1.length; k < len1; k++) {
              entry = ref1[k];

              if (!(superiorStyles && superiorStyles[entry[0]])) {
                this.style(entry[0], entry[1]);
              }
            }
          }
        }
      };

      QuickElement.prototype._removeRegisteredStyle = function (targetStyle, superiorStates, includeBase) {
        var className, entry, j, k, len, len1, ref, ref1, resetValue, superiorStyles;
        ref = targetStyle.className;

        for (j = 0, len = ref.length; j < len; j++) {
          className = ref[j];
          this.removeClass(className);
        }

        if (targetStyle.fns.length) {
          if (superiorStates) {
            superiorStyles = this._resolveFnStyles(superiorStates, includeBase);
          }

          ref1 = targetStyle.fns;

          for (k = 0, len1 = ref1.length; k < len1; k++) {
            entry = ref1[k];
            resetValue = superiorStyles && superiorStyles[entry[0]] || null;
            this.style(entry[0], resetValue);
          }
        }
      };

      QuickElement.prototype._turnStyleON = function (targetState, activeStates) {
        var j, len, sharedStates, skipFns, stateChain;
        skipFns = this.options.styleAfterInsert && !this._inserted;

        if (this._styles[targetState]) {
          this._applyRegisteredStyle(this._styles[targetState], this._getSuperiorStates(targetState, activeStates), false, skipFns);
        }

        if (this._providedStatesShared) {
          sharedStates = this._getSharedStates(targetState);

          for (j = 0, len = sharedStates.length; j < len; j++) {
            stateChain = sharedStates[j];

            if (!helpers.includes(this._stateShared, stateChain.string)) {
              this._stateShared.push(stateChain.string);
            }

            this._applyRegisteredStyle(this._styles[stateChain.string], null, null, skipFns);
          }
        }
      };

      QuickElement.prototype._turnStyleOFF = function (targetState, activeStates) {
        var activeSharedStates, j, len, sharedStates, stateChain, targetStyle;

        if (this._styles[targetState]) {
          this._removeRegisteredStyle(this._styles[targetState], activeStates, true);
        }

        if (this._providedStatesShared) {
          sharedStates = this._getSharedStates(targetState);

          if (sharedStates.length === 0) {
            return;
          }

          for (j = 0, len = sharedStates.length; j < len; j++) {
            stateChain = sharedStates[j];
            helpers.removeItem(this._stateShared, stateChain.string);
            targetStyle = this._styles[stateChain.string];

            if (targetStyle.fns.length && this._stateShared.length && !activeSharedStates) {
              activeSharedStates = this._stateShared.filter(function (state) {
                return !helpers.includes(state, targetState);
              });
              activeStates = activeStates.concat(activeSharedStates);
            }

            this._removeRegisteredStyle(targetStyle, activeStates, true);
          }
        }
      };

      QuickElement.prototype._turnTextON = function (targetState, activeStates) {
        var superiorStates, targetText;

        if (this._texts && IS.string(targetText = this._texts[targetState])) {
          superiorStates = this._getSuperiorStates(targetState, activeStates);

          if (!superiorStates.length) {
            this.text = targetText;
          }
        }
      };

      QuickElement.prototype._turnTextOFF = function (targetState, activeStates) {
        var targetText;

        if (this._texts && IS.string(targetText = this._texts[targetState])) {
          activeStates = activeStates.filter(function (state) {
            return state !== targetState;
          });
          targetText = this._texts[activeStates[activeStates.length - 1]];

          if (targetText == null) {
            targetText = this._texts.base;
          }

          this.text = targetText;
        }
      };

      QuickElement.prototype._getActiveStates = function (stateToExclude) {
        var includeSharedStates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var activeStates, j, len, plainStates, state;

        if (!this._providedStates) {
          return DUMMY_ARRAY;
        }

        activeStates = plainStates = this._state;

        if (stateToExclude) {
          plainStates = [];

          for (j = 0, len = activeStates.length; j < len; j++) {
            state = activeStates[j];

            if (state !== stateToExclude) {
              plainStates.push(state);
            }
          }
        }

        if (!includeSharedStates || !this._providedStatesShared) {
          return plainStates;
        } else {
          return plainStates.concat(this._stateShared);
        }
      };

      QuickElement.prototype._getSuperiorStates = function (targetState, activeStates) {
        var candidate, j, len, superior, targetStateIndex;
        targetStateIndex = this._providedStates.indexOf(targetState);

        if (targetStateIndex === this._providedStates.length - 1) {
          return DUMMY_ARRAY;
        }

        superior = [];

        for (j = 0, len = activeStates.length; j < len; j++) {
          candidate = activeStates[j];

          if (this._providedStates.indexOf(candidate) > targetStateIndex) {
            superior.push(candidate);
          }
        }

        return superior;
      };

      QuickElement.prototype._getSharedStates = function (targetState) {
        var activeStates, j, len, ref, sharedStates, stateChain;
        activeStates = this._state;
        sharedStates = [];
        ref = this._providedStatesShared;

        for (j = 0, len = ref.length; j < len; j++) {
          stateChain = ref[j];

          if (stateChain.includes(targetState) && stateChain.isApplicable(targetState, activeStates)) {
            sharedStates.push(stateChain);
          }
        }

        return sharedStates;
      };

      QuickElement.prototype._resolveFnStyles = function (states, includeBase) {
        var entry, j, k, len, len1, output, ref, state;

        if (includeBase) {
          states = ['base'].concat(states);
        }

        output = {};

        for (j = 0, len = states.length; j < len; j++) {
          state = states[j];

          if (this._styles[state] && this._styles[state].fns.length) {
            ref = this._styles[state].fns;

            for (k = 0, len1 = ref.length; k < len1; k++) {
              entry = ref[k];
              output[entry[0]] = entry[1];
            }
          }
        }

        return output;
      };

      ;
      /**
       * Sets/gets the value of a style property. In getter mode the computed property of
       * the style will be returned unless the element is not inserted into the DOM. In
       * webkit browsers all computed properties of a detached node are always an empty
       * string but in gecko they reflect on the actual computed value, hence we need
       * to "normalize" this behavior and make sure that even on gecko an empty string
       * is returned
       * @return {[type]} [description]
       */

      var aspectRatioGetter, orientationGetter;

      QuickElement.prototype.style = function (property) {
        var args, i, key, keys, result, value;

        if (this.type === 'text') {
          return;
        }

        args = arguments;

        if (IS.string(property)) {
          value = typeof args[1] === 'function' ? args[1].call(this, this.related) : args[1];

          if (args[1] === null && IS.defined(this.currentStateStyle(property)) && !IS.function(this.currentStateStyle(property))) {
            value = CSS.UNSET;
          }

          result = CSS(this.el, property, value, this.options.forceStyle);

          if (args.length === 1) {
            /* istanbul ignore next */
            if (this._inserted) {
              return result;
            } else if (!result) {
              return result;
            } else {
              return '';
            }
          }
        } else if (IS.object(property)) {
          keys = Object.keys(property);
          i = -1;

          while (key = keys[++i]) {
            this.style(key, property[key]);
          }
        }

        return this;
      };
      /**
      * Attempts to resolve the value for a given property in the following order if each one isn't a valid value:
      * 1. from computed style (for dom-inserted els)
      * 2. from DOMElement.style object (for non-inserted els; if options.styleAfterInsert, will only have state styles)
      * 3. from provided style options
      * (for non-inserted els; checking only $base since state styles will always be applied to the style object even for non-inserted)
       */


      QuickElement.prototype.styleSafe = function (property, skipComputed) {
        var computed, result, sample;

        if (this.type === 'text') {
          return;
        }

        sample = this.el.style[property];

        if (IS.string(sample) || IS.number(sample)) {
          computed = skipComputed ? 0 : this.style(property);
          result = computed || this.el.style[property] || this.currentStateStyle(property) || '';

          if (typeof result === 'function') {
            return result.call(this, this.related);
          } else {
            return result;
          }
        }

        return this;
      };

      QuickElement.prototype.styleParsed = function (property, skipComputed) {
        return parseFloat(this.styleSafe(property, skipComputed));
      };

      QuickElement.prototype.recalcStyle = function (recalcChildren) {
        var child, j, len, ref, targetStyles;
        targetStyles = this._resolveFnStyles(this._getActiveStates(), true);
        this.style(targetStyles);

        if (recalcChildren) {
          ref = this._children;

          for (j = 0, len = ref.length; j < len; j++) {
            child = ref[j];
            child.recalcStyle();
          }
        }

        return this;
      };

      QuickElement.prototype.currentStateStyle = function (property) {
        var i, state, states;

        if (property) {
          if (this._state.length) {
            states = this._state.slice();

            if (this._stateShared && this._stateShared.length) {
              var _states;

              (_states = states).push.apply(_states, _toConsumableArray(this._stateShared));
            }

            i = states.length;

            while (state = states[--i]) {
              if (this._styles[state] && IS.defined(this._styles[state].rule[property])) {
                return this._styles[state].rule[property];
              }
            }
          }

          if (this._styles.base) {
            return this._styles.base.rule[property];
          }
        }
      };

      QuickElement.prototype.hide = function () {
        return this.style('display', 'none');
      };

      QuickElement.prototype.show = function (display) {
        var ref;

        if (!display) {
          display = this.currentStateStyle('display');

          if (display === 'none' || !display) {
            display = 'block';
          }
        }

        if (display == null) {
          display = ((ref = this._styles.base) != null ? ref.display : void 0) || 'block';
        }

        return this.style('display', display);
      };

      Object.defineProperties(QuickElement.prototype, {
        'orientation': orientationGetter = {
          get: function get() {
            if (this.width > this.height) {
              return 'landscape';
            } else {
              return 'portrait';
            }
          }
        },
        'aspectRatio': aspectRatioGetter = {
          get: function get() {
            return this.width / this.height;
          }
        },
        'rect': {
          get: function get() {
            return this.el.getBoundingClientRect();
          }
        },
        'width': {
          get: function get() {
            return parseFloat(this.style('width'));
          },
          set: function set(value) {
            return this.style('width', value);
          }
        },
        'height': {
          get: function get() {
            return parseFloat(this.style('height'));
          },
          set: function set(value) {
            return this.style('height', value);
          }
        }
      });
      ;

      QuickElement.prototype.attr = function (target, newValue) {
        var i, key, keys;

        if (arguments.length === 1) {
          if (typeof target === 'string') {
            return this.el.getAttribute(target);
          }

          if (IS.object(target)) {
            keys = Object.keys(target);
            i = -1;

            while (key = keys[++i]) {
              this.attr(key, target[key]);
            }
          }
        } else if (newValue === null) {
          return this.el.removeAttribute(target);
        } else {
          this.el.setAttribute(target, newValue);
        }

        return this;
      };

      QuickElement.prototype.prop = function (target, newValue) {
        var i, key, keys;

        if (arguments.length === 1) {
          if (typeof target === 'string') {
            return this.el[target];
          }

          if (IS.object(target)) {
            keys = Object.keys(target);
            i = -1;

            while (key = keys[++i]) {
              this.prop(key, target[key]);
            }
          }
        } else {
          this.el[target] = newValue;
        }

        return this;
      };

      ;

      QuickElement.prototype.toTemplate = function () {
        return _QuickDom.template(this);
      };

      QuickElement.prototype.clone = function () {
        var activeState, callback, callbacks, child, elClone, eventName, i, j, k, len, len1, len2, newEl, options, ref, ref1, ref2;
        elClone = this.el.cloneNode(false);
        options = extend.clone(this.options, {
          existing: elClone
        });
        newEl = new QuickElement(this.type, options);
        ref = this._state;

        for (i = 0, len = ref.length; i < len; i++) {
          activeState = ref[i];
          newEl.state(activeState, true);
        }

        ref1 = this.children;

        for (j = 0, len1 = ref1.length; j < len1; j++) {
          child = ref1[j];
          newEl.append(child.clone());
        }

        ref2 = this._eventCallbacks;

        for (eventName in ref2) {
          callbacks = ref2[eventName];

          for (k = 0, len2 = callbacks.length; k < len2; k++) {
            callback = callbacks[k];
            newEl.on(eventName, callback);
          }
        }

        return newEl;
      };

      QuickElement.prototype.append = function (targetEl) {
        var prevParent;

        if (targetEl) {
          targetEl = helpers.normalizeGivenEl(targetEl);

          if (IS.quickDomEl(targetEl)) {
            prevParent = targetEl.parent;

            if (prevParent) {
              prevParent._removeChild(targetEl);
            }

            this._children.push(targetEl);

            this.el.appendChild(targetEl.el);

            targetEl._refreshParent(); // Force re-fresh targetEl._parent value to trigger inserted callback

          }
        }

        return this;
      };

      QuickElement.prototype.appendTo = function (targetEl) {
        if (targetEl) {
          targetEl = helpers.normalizeGivenEl(targetEl);

          if (IS.quickDomEl(targetEl)) {
            targetEl.append(this);
          }
        }

        return this;
      };

      QuickElement.prototype.prepend = function (targetEl) {
        var prevParent;

        if (targetEl) {
          targetEl = helpers.normalizeGivenEl(targetEl);

          if (IS.quickDomEl(targetEl)) {
            prevParent = targetEl.parent;

            if (prevParent) {
              prevParent._removeChild(targetEl);
            }

            this._children.unshift(targetEl);

            this.el.insertBefore(targetEl.el, this.el.firstChild);

            targetEl._refreshParent(); // Force re-fresh targetEl._parent value to trigger inserted callback

          }
        }

        return this;
      };

      QuickElement.prototype.prependTo = function (targetEl) {
        if (targetEl) {
          targetEl = helpers.normalizeGivenEl(targetEl);

          if (IS.quickDomEl(targetEl)) {
            targetEl.prepend(this);
          }
        }

        return this;
      };

      QuickElement.prototype.after = function (targetEl) {
        var myIndex;

        if (targetEl && this.parent) {
          targetEl = helpers.normalizeGivenEl(targetEl);

          if (IS.quickDomEl(targetEl)) {
            myIndex = this.parent._children.indexOf(this);

            this.parent._children.splice(myIndex + 1, 0, targetEl);

            this.el.parentNode.insertBefore(targetEl.el, this.el.nextSibling);

            targetEl._refreshParent(); // Force re-fresh targetEl._parent value to trigger inserted callback

          }
        }

        return this;
      };

      QuickElement.prototype.insertAfter = function (targetEl) {
        if (targetEl) {
          targetEl = helpers.normalizeGivenEl(targetEl);

          if (IS.quickDomEl(targetEl)) {
            targetEl.after(this);
          }
        }

        return this;
      };

      QuickElement.prototype.before = function (targetEl) {
        var myIndex;

        if (targetEl && this.parent) {
          targetEl = helpers.normalizeGivenEl(targetEl);

          if (IS.quickDomEl(targetEl)) {
            myIndex = this.parent._children.indexOf(this);

            this.parent._children.splice(myIndex, 0, targetEl);

            this.el.parentNode.insertBefore(targetEl.el, this.el);

            targetEl._refreshParent(); // Force re-fresh targetEl._parent value to trigger inserted callback

          }
        }

        return this;
      };

      QuickElement.prototype.insertBefore = function (targetEl) {
        if (targetEl) {
          targetEl = helpers.normalizeGivenEl(targetEl);

          if (IS.quickDomEl(targetEl)) {
            targetEl.before(this);
          }
        }

        return this;
      };

      QuickElement.prototype.detach = function () {
        var ref;

        if ((ref = this.parent) != null) {
          ref._removeChild(this);
        }

        return this;
      };

      QuickElement.prototype.remove = function () {
        var eventName;
        this.detach();
        this.resetState();

        if (this._eventCallbacks) {
          for (eventName in this._eventCallbacks) {
            this._eventCallbacks[eventName].length = 0;
          }
        }

        return this;
      };

      QuickElement.prototype.empty = function () {
        var child, i, len, ref;
        ref = this.children.slice();

        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];

          this._removeChild(child);
        }

        return this;
      };

      QuickElement.prototype.wrap = function (targetEl) {
        var currentParent;

        if (targetEl) {
          targetEl = helpers.normalizeGivenEl(targetEl);
          currentParent = this.parent;

          if (IS.quickDomEl(targetEl) && targetEl !== this && targetEl !== this.parent) {
            if (currentParent) {
              currentParent._removeChild(this, !targetEl.parent ? targetEl : void 0);
            }

            targetEl.append(this);
          }
        }

        return this;
      };

      QuickElement.prototype.unwrap = function () {
        var grandParent, parent, parentChildren, parentSibling;
        parent = this.parent;

        if (parent) {
          parentChildren = _QuickDom.batch(parent.children);
          parentSibling = parent.next;
          grandParent = parent.parent;

          if (grandParent) {
            parent.detach();

            if (parentSibling) {
              parentChildren.insertBefore(parentSibling);
            } else {
              parentChildren.appendTo(grandParent);
            }
          }
        }

        return this;
      };

      QuickElement.prototype.replace = function (targetEl) {
        var ref;

        if (targetEl) {
          targetEl = helpers.normalizeGivenEl(targetEl);

          if (IS.quickDomEl(targetEl) && targetEl !== this) {
            targetEl.detach();

            if ((ref = this.parent) != null) {
              ref._removeChild(this, targetEl);
            }

            targetEl._refreshParent(); // Force re-fresh targetEl._parent value to trigger inserted callback

          }
        }

        return this;
      };

      QuickElement.prototype.hasClass = function (target) {
        return helpers.includes(this.classList, target);
      };

      QuickElement.prototype.addClass = function (target) {
        var classList, targetIndex;
        classList = this.classList;
        targetIndex = classList.indexOf(target);

        if (targetIndex === -1) {
          classList.push(target);
          this.className = classList.length > 1 ? classList.join(' ') : classList[0];
        }

        return this;
      };

      QuickElement.prototype.removeClass = function (target) {
        var classList, targetIndex;
        classList = this.classList;
        targetIndex = classList.indexOf(target);

        if (targetIndex !== -1) {
          classList.splice(targetIndex, 1);
          this.className = classList.length ? classList.join(' ') : '';
        }

        return this;
      };

      QuickElement.prototype.toggleClass = function (target) {
        if (this.hasClass(target)) {
          this.removeClass(target);
        } else {
          this.addClass(target);
        }

        return this;
      };

      QuickElement.prototype.setRef = function (target) {
        this.ref = this.options.ref = target;
        this.attr('data-ref', target);
        return this;
      };

      QuickElement.prototype._refreshParent = function () {
        return this.parent;
      };

      QuickElement.prototype._removeChild = function (targetChild, replacementChild) {
        var indexOfChild;
        indexOfChild = this.children.indexOf(targetChild);

        if (indexOfChild !== -1) {
          if (replacementChild) {
            this.el.replaceChild(replacementChild.el, targetChild.el);

            this._children.splice(indexOfChild, 1, replacementChild);
          } else {
            this.el.removeChild(targetChild.el);

            this._children.splice(indexOfChild, 1);
          }
        }

        return this;
      };

      Object.defineProperties(QuickElement.prototype, {
        'html': {
          get: function get() {
            return this.el.innerHTML;
          },
          set: function set(newValue) {
            return this.el.innerHTML = newValue;
          }
        },
        'text': {
          get: function get() {
            return this.el.textContent;
          },
          set: function set(newValue) {
            return this.el.textContent = newValue;
          }
        },
        'className': {
          get: function get() {
            if (this.svg) {
              return this.attr('class') || '';
            } else {
              return this.raw.className;
            }
          },
          set: function set(newValue) {
            if (this.svg) {
              return this.attr('class', newValue);
            } else {
              return this.raw.className = newValue;
            }
          }
        },
        'classList': {
          get: function get() {
            var list;
            list = this.className.split(/\s+/);

            if (list[list.length - 1] === '') {
              list.pop();
            }

            if (list[0] === '') {
              list.shift();
            }

            return list;
          }
        }
      });
      ;

      QuickElement.prototype.updateOptions = function (options) {
        if (IS.object(options)) {
          this.options = options;

          this._normalizeOptions();

          this._applyOptions(this.options);
        }

        return this;
      };

      QuickElement.prototype.updateStateStyles = function (styles) {
        var i, len, parsed, state, updatedStates;

        if (IS.objectPlain(styles)) {
          extend.deep.concat(this, parsed = this._parseStyles(styles));

          if (parsed._styles) {
            updatedStates = Object.keys(parsed._styles);

            for (i = 0, len = updatedStates.length; i < len; i++) {
              state = updatedStates[i];

              if (this.state(state) || state === 'base') {
                this._applyRegisteredStyle(this._styles[state], this._getActiveStates(state), false);
              }
            }
          }
        }

        return this;
      };

      QuickElement.prototype.updateStateTexts = function (texts) {
        var parsed;

        if (IS.objectPlain(texts)) {
          extend.deep.concat(this, parsed = this._parseTexts(texts));
        }

        return this;
      };

      QuickElement.prototype.applyData = function (data, passThrough) {
        var child, computers, defaults, i, j, key, keys, len, len1, ref;

        if (this.options.passDataToChildren && this._children.length && (passThrough != null ? passThrough : passThrough = true)) {
          ref = this._children;

          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            child.applyData(data);
          }
        }

        if (computers = this.options.computers) {
          defaults = this.options.defaults;
          keys = Object.keys(computers);

          for (j = 0, len1 = keys.length; j < len1; j++) {
            key = keys[j];

            if (this.options.invokeComputersOnce) {
              if (this._invokedComputers[key]) {
                continue;
              }

              this._invokedComputers[key] = 1;
            }

            if (data && data.hasOwnProperty(key)) {
              this._runComputer(key, data[key]);
            } else if (defaults && defaults.hasOwnProperty(key)) {
              this._runComputer(key, defaults[key]);
            }
          }
        }

        return this;
      };

      QuickElement.prototype._runComputer = function (computer, arg) {
        return this.options.computers[computer].call(this, arg);
      };

      ;
      ;
      var QuickWindow;
      QuickWindow = {
        type: 'window',
        el: window,
        raw: window,
        _eventCallbacks: {
          __refs: {}
        }
      };
      QuickWindow.on = QuickElement.prototype.on;
      QuickWindow.off = QuickElement.prototype.off;
      QuickWindow.emit = QuickElement.prototype.emit;
      QuickWindow.emitPrivate = QuickElement.prototype.emitPrivate;
      QuickWindow._listenTo = QuickElement.prototype._listenTo;
      QuickWindow._invokeHandlers = QuickElement.prototype._invokeHandlers;
      Object.defineProperties(QuickWindow, {
        'width': {
          get: function get() {
            return window.innerWidth;
          }
        },
        'height': {
          get: function get() {
            return window.innerHeight;
          }
        },
        'orientation': orientationGetter,
        'aspectRatio': aspectRatioGetter
      });
      ;
      var MediaQuery, ruleDelimiter;
      MediaQuery = new function () {
        var callbacks, testRule;
        callbacks = [];
        window.addEventListener('resize', function () {
          var callback, i, len;

          for (i = 0, len = callbacks.length; i < len; i++) {
            callback = callbacks[i];
            callback();
          }
        });

        this.parseQuery = function (target, queryString) {
          var querySplit, rules, source;
          querySplit = queryString.split('(');
          source = querySplit[0];

          source = function () {
            switch (source) {
              case 'window':
                return QuickWindow;

              case 'parent':
                return target.parent;

              case 'self':
                return target;

              default:
                return target.parentMatching(function (parent) {
                  return parent.ref === source.slice(1);
                });
            }
          }();

          rules = querySplit[1].slice(0, -1).split(ruleDelimiter).map(function (rule) {
            var getter, key, keyPrefix, max, min, split, value;
            split = rule.split(':');
            value = parseFloat(split[1]);

            if (isNaN(value)) {
              value = split[1];
            }

            key = split[0];
            keyPrefix = key.slice(0, 4);
            max = keyPrefix === 'max-';
            min = !max && keyPrefix === 'min-';

            if (max || min) {
              key = key.slice(4);
            }

            getter = function () {
              switch (key) {
                case 'orientation':
                  return function () {
                    return source.orientation;
                  };

                case 'aspect-ratio':
                  return function () {
                    return source.aspectRatio;
                  };

                case 'width':
                case 'height':
                  return function () {
                    return source[key];
                  };

                default:
                  return function () {
                    var parsedValue, stringValue;
                    stringValue = source.style(key);
                    parsedValue = parseFloat(stringValue);

                    if (isNaN(parsedValue)) {
                      return stringValue;
                    } else {
                      return parsedValue;
                    }
                  };
              }
            }();

            return {
              key: key,
              value: value,
              min: min,
              max: max,
              getter: getter
            };
          });
          return {
            source: source,
            rules: rules
          };
        };

        this.register = function (target, queryString) {
          var callback, query;
          query = this.parseQuery(target, queryString);

          if (query.source) {
            callbacks.push(callback = function callback() {
              return testRule(target, query, queryString);
            });
            callback();
          }

          return query;
        };

        testRule = function testRule(target, query, queryString) {
          var currentValue, i, len, passed, ref, rule;
          passed = true;
          ref = query.rules;

          for (i = 0, len = ref.length; i < len; i++) {
            rule = ref[i];
            currentValue = rule.getter();

            passed = function () {
              switch (false) {
                case !rule.min:
                  return currentValue >= rule.value;

                case !rule.max:
                  return currentValue <= rule.value;

                default:
                  return currentValue === rule.value;
              }
            }();

            if (!passed) {
              break;
            }
          }

          return target.state(queryString, passed);
        };

        return this;
      }();
      ruleDelimiter = /,\s*/;
      ;

      _QuickDom = function QuickDom() {
        var arg, args, element, i, j, len, prevCount;
        args = new Array(arguments.length);

        for (i = j = 0, len = arguments.length; j < len; i = ++j) {
          arg = arguments[i];
          args[i] = arg;
        }

        prevCount = QuickElement.count;
        element = _QuickDom.create(args);

        if (element && element._postCreation && QuickElement.count !== prevCount) {
          element._postCreation();
        }

        return element;
      };

      _QuickDom.create = function (args) {
        var argsLength, child, children, element, i, j, len, options, type;

        switch (false) {
          case !IS.array(args[0]):
            return _QuickDom.apply(void 0, _toConsumableArray(args[0]));

          case !IS.template(args[0]):
            return args[0].spawn();

          case !IS.quickDomEl(args[0]):
            if (args[1]) {
              return args[0].updateOptions(args[1]);
            } else {
              return args[0];
            }

          case !(IS.domNode(args[0]) || IS.domDoc(args[0])):
            if (args[0]._quickElement) {
              return args[0]._quickElement;
            }

            type = args[0].nodeName.toLowerCase().replace('#', '');
            options = args[1] || {};
            options.existing = args[0];
            return new QuickElement(type, options);

          case args[0] !== window:
            return QuickWindow;

          case !IS.string(args[0]):
            type = args[0].toLowerCase();

            if (type === 'text') {
              options = IS.object(args[1]) ? args[1] : {
                text: args[1] || ''
              };
            } else {
              options = IS.object(args[1]) ? args[1] : {};
            }

            element = new QuickElement(type, options);

            if (args.length > 2) {
              children = new Array(argsLength = args.length);
              i = 1;

              while (++i < argsLength) {
                children[i + 1] = args[i];
              }

              for (j = 0, len = children.length; j < len; j++) {
                child = children[j];

                if (IS.string(child)) {
                  child = _QuickDom.text(child);
                }

                if (IS.array(child)) {
                  child = _QuickDom.apply(void 0, _toConsumableArray(child));
                }

                if (IS.quickDomEl(child)) {
                  element.append(child);
                }
              }
            }

            return element;

          case !(args[0] && (IS.domNode(args[0][0]) || IS.domDoc(args[0][0]))):
            return _QuickDom(args[0][0]);
        }
      };

      _QuickDom.template = function (tree) {
        return new QuickTemplate(tree, true);
      };

      _QuickDom.html = function (innerHTML) {
        var children, container;
        container = document.createElement('div');
        container.innerHTML = innerHTML;
        children = Array.prototype.slice.call(container.childNodes);
        return _QuickDom.batch(children);
      };

      _QuickDom.query = function (target) {
        return _QuickDom(document).query(target);
      };

      _QuickDom.queryAll = function (target) {
        return _QuickDom(document).queryAll(target);
      };

      _QuickDom.isTemplate = function (target) {
        return IS.template(target);
      };

      _QuickDom.isQuickEl = function (target) {
        return IS.quickDomEl(target);
      };

      _QuickDom.isEl = function (target) {
        return IS.domEl(target);
      };

      var QuickBatch;

      QuickBatch =
      /*#__PURE__*/
      function () {
        function QuickBatch(elements, returnResults1) {
          _classCallCheck(this, QuickBatch);

          this.returnResults = returnResults1;
          this.elements = elements.map(function (el) {
            return _QuickDom(el);
          });
        }

        _createClass(QuickBatch, [{
          key: "reverse",
          value: function reverse() {
            this.elements = this.elements.reverse();
            return this;
          }
        }, {
          key: "return",
          value: function _return(returnNext) {
            if (returnNext) {
              this.returnResults = true;
              return this;
            } else {
              return this.lastResults;
            }
          }
        }]);

        return QuickBatch;
      }();
      /* istanbul ignore next */


      if (QuickBatch.name == null) {
        QuickBatch.name = 'QuickBatch';
      }

      Object.keys(QuickElement.prototype).concat('css', 'replaceWith', 'html', 'text').forEach(function (method) {
        return QuickBatch.prototype[method] = function (newValue) {
          var element, results;

          results = this.lastResults = function () {
            var i, len, ref, results1;
            ref = this.elements;
            results1 = [];

            for (i = 0, len = ref.length; i < len; i++) {
              element = ref[i];

              if (method === 'html' || method === 'text') {
                if (newValue) {
                  results1.push(element[method] = newValue);
                } else {
                  results1.push(element[method]);
                }
              } else {
                var _element;

                results1.push((_element = element)[method].apply(_element, arguments));
              }
            }

            return results1;
          }.apply(this, arguments);

          if (this.returnResults) {
            return results;
          } else {
            return this;
          }
        };
      });

      _QuickDom.batch = function (elements, returnResults) {
        if (!IS.iterable(elements)) {
          throw new Error("Batch: expected an iterable, got ".concat(String(elements)));
        } else if (!elements.length) {
          throw new Error("Batch: expected a non-empty element collection");
        }

        return new QuickBatch(elements, returnResults);
      };

      ;
      var QuickTemplate;

      var _extendByRef, extendTemplate, notDeepKeys, notKeys;

      notDeepKeys = ['relatedInstance', 'data'];
      notKeys = ['children', '_childRefs'];

      extendTemplate = function extendTemplate(currentOpts, newOpts, globalOpts) {
        var currentChild, currentChildren, globalOptsTransform, index, maxLength, needsTemplateWrap, newChild, newChildProcessed, newChildren, noChanges, output, ref, remainingNewChildren;

        if (globalOpts) {
          globalOptsTransform = {
            options: function options(opts) {
              return extend(opts, globalOpts);
            }
          };
        }

        if (IS.array(newOpts)) {
          newOpts = parseTree(newOpts, false);
        } else if (newOpts && !matchesSchema(newOpts)) {
          newOpts = {
            options: newOpts
          };
        }

        output = extend.deep.nullDeletes.notKeys(notKeys).notDeep(notDeepKeys).transform(globalOptsTransform).clone(currentOpts, newOpts);
        currentChildren = currentOpts.children;
        newChildren = (newOpts != null ? newOpts.children : void 0) || [];
        output.children = [];
        /* istanbul ignore next */

        if (IS.array(newChildren)) {
          maxLength = Math.max(currentChildren.length, newChildren.length);
          index = -1;

          while (++index !== maxLength) {
            needsTemplateWrap = noChanges = false;
            currentChild = currentChildren[index];
            newChild = newChildren[index];

            newChildProcessed = function () {
              switch (false) {
                case !IS.template(newChild):
                  return newChild;

                case !IS.array(newChild):
                  return needsTemplateWrap = parseTree(newChild);

                case !IS.string(newChild):
                  return needsTemplateWrap = {
                    type: 'text',
                    options: {
                      text: newChild
                    }
                  };

                case !(!newChild && !globalOpts):
                  return noChanges = true;

                default:
                  return needsTemplateWrap = newChild || true;
              }
            }();

            if (noChanges) {
              newChildProcessed = currentChild;
            } else if (needsTemplateWrap) {
              newChildProcessed = currentChild ? currentChild.extend(newChildProcessed, globalOpts) : new QuickTemplate(extend.clone(schema, newChildProcessed));
            }

            output.children.push(newChildProcessed);
          }
        } else if (IS.object(newChildren)) {
          newChildren = extend.allowNull.clone(newChildren);
          output.children = _extendByRef(newChildren, currentChildren, globalOpts);
          remainingNewChildren = newChildren;

          for (ref in remainingNewChildren) {
            newChild = remainingNewChildren[ref];
            newChildProcessed = IS.objectPlain(newChild) && !IS.template(newChild) ? newChild : parseTree(newChild);
            output.children.push(new QuickTemplate(newChildProcessed));
            delete remainingNewChildren[ref];
          }
        }

        return output;
      };

      _extendByRef = function extendByRef(newChildrenRefs, currentChildren, globalOpts) {
        var currentChild, i, len, newChild, newChildProcessed, output;

        if (!currentChildren.length) {
          return currentChildren;
        } else {
          output = [];

          for (i = 0, len = currentChildren.length; i < len; i++) {
            currentChild = currentChildren[i];
            newChild = newChildrenRefs[currentChild.ref];

            if (newChild) {
              newChildProcessed = currentChild.extend(newChild, globalOpts);
              delete newChildrenRefs[currentChild.ref];
            } else if (newChild === null) {
              delete newChildrenRefs[currentChild.ref];
              continue;
            } else {
              newChildProcessed = function () {
                switch (false) {
                  case !globalOpts:
                    return currentChild.extend(null, globalOpts);

                  case !Object.keys(newChildrenRefs).length:
                    return currentChild.extend();

                  default:
                    return currentChild;
                }
              }();
            }

            newChildProcessed.children = _extendByRef(newChildrenRefs, newChildProcessed.children);
            output.push(newChildProcessed);
          }

          return output;
        }
      };

      ;
      var parseErrorPrefix, parseTree;

      parseTree = function parseTree(tree, parseChildren) {
        var output;

        switch (false) {
          case !IS.array(tree):
            output = {};

            if (!IS.string(tree[0])) {
              throw new Error("".concat(parseErrorPrefix, " string for 'type', got '").concat(String(tree[0]), "'"));
            } else {
              output.type = tree[0];
            }

            if (tree.length > 1 && !IS.object(tree[1]) && tree[1] !== null) {
              throw new Error("".concat(parseErrorPrefix, " object for 'options', got '").concat(String(tree[1]), "'"));
            } else {
              output.options = tree[1] ? extend.deep.clone(tree[1]) : schema.options;

              if (tree[1]) {
                output.ref = tree[1].id || tree[1].ref;
              }
            }

            output.children = tree.slice(2);

            if (parseChildren === false) {
              if (tree.length === 3 && IS.objectPlain(tree[2]) && !IS.template(tree[2])) {
                output.children = tree[2];
              }
            } else {
              output.children = output.children.map(_QuickDom.template);
            }

            return output;

          case !(IS.string(tree) || IS.domText(tree)):
            return {
              type: 'text',
              options: {
                text: tree.textContent || tree
              },
              children: schema.children
            };

          case !IS.domEl(tree):
            return {
              type: tree.nodeName.toLowerCase(),
              ref: tree.id,
              options: extend.clone.keys(allowedTemplateOptions)(tree),
              children: schema.children.map.call(tree.childNodes, _QuickDom.template)
            };

          case !IS.quickDomEl(tree):
            return {
              type: tree.type,
              ref: tree.ref,
              options: extend.clone.deep.notKeys('relatedInstance')(tree.options),
              children: tree.children.map(_QuickDom.template)
            };

          case !IS.template(tree):
            return tree;

          default:
            throw new Error("".concat(parseErrorPrefix, " (array || string || domEl || quickDomEl || template), got ").concat(String(tree)));
        }
      };

      parseErrorPrefix = 'Template Parse Error: expected';
      ;
      var matchesSchema, schema;
      schema = {
        type: 'div',
        ref: void 0,
        options: {},
        children: []
      };

      matchesSchema = function matchesSchema(object) {
        return typeof object.type !== 'undefined' || typeof object.ref !== 'undefined' || typeof object.options !== 'undefined' || typeof object.children !== 'undefined';
      };

      ;

      QuickTemplate =
      /*#__PURE__*/
      function () {
        function QuickTemplate(config, isTree) {
          _classCallCheck(this, QuickTemplate);

          if (IS.template(config)) {
            return config;
          }

          config = isTree ? parseTree(config) : config;
          extend(this, config);
        }

        _createClass(QuickTemplate, [{
          key: "extend",
          value: function extend(newValues, globalOpts) {
            return new QuickTemplate(extendTemplate(this, newValues, globalOpts));
          }
        }, {
          key: "spawn",
          value: function spawn(newValues, globalOpts, data) {
            var child, childData, children, element, i, len, options, type;

            if (newValues && newValues.data) {
              data = newValues.data;

              if (Object.keys(newValues).length === 1) {
                newValues = null;
              }
            }

            if (newValues || globalOpts) {
              var _extendTemplate = extendTemplate(this, newValues, globalOpts);

              options = _extendTemplate.options;
              children = _extendTemplate.children;
              type = _extendTemplate.type;
            } else {
              options = this.options;
              children = this.children;
              type = this.type;
              options = extend.clone(options);
            }

            element = _QuickDom.create([type, options]);

            if (children) {
              childData = options.passDataToChildren ? data || options.data : void 0;

              for (i = 0, len = children.length; i < len; i++) {
                child = children[i];
                element.append(child.spawn(null, null, childData));
              }
            }

            element._postCreation(data);

            return element;
          }
        }]);

        return QuickTemplate;
      }();

      if (QuickTemplate.name == null) {
        QuickTemplate.name = 'QuickTemplate';
      }

      Object.defineProperty(QuickTemplate.prototype, 'child', {
        get: function get() {
          return this._childRefs || _getChildRefs2(this);
        }
      });
      ;
      var i, len, shortcut, shortcuts;
      shortcuts = ['link:a', 'anchor:a', 'a', 'text', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'footer', 'section', 'button', 'br', 'ul', 'ol', 'li', 'fieldset', 'input', 'textarea', 'select', 'option', 'form', 'frame', 'hr', 'iframe', 'img', 'picture', 'main', 'nav', 'meta', 'object', 'pre', 'style', 'table', 'tbody', 'th', 'tr', 'td', 'tfoot', // 'template'
      'video'];

      for (i = 0, len = shortcuts.length; i < len; i++) {
        shortcut = shortcuts[i];

        (function (shortcut) {
          var prop, split, type;
          prop = type = shortcut;

          if (helpers.includes(shortcut, ':')) {
            split = shortcut.split(':');
            prop = split[0];
            type = split[1];
          }

          return _QuickDom[prop] = function () {
            return _QuickDom.apply(void 0, [type].concat(Array.prototype.slice.call(arguments)));
          };
        })(shortcut);
      }

      ;
      _QuickDom.version = "1.0.86";
      _QuickDom.CSS = CSS;
      module.exports = _QuickDom;
      return module.exports;
    },
    7: function _(require, module, exports) {
      exports.default = {
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
      };
      return module.exports;
    },
    8: function _(require, module, exports) {
      var __index = require(6),
          DOM = __index;

      var addButton = exports.addButton = DOM.template(['div', {
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
      exports.default = DOM.template(['div', {
        ref: 'TagList',
        style: {
          position: 'relative',
          textAlign: 'left',
          fontFamily: function fontFamily(taglist) {
            return taglist.settings.fontFamily;
          }
        }
      }, addButton]);
      return module.exports;
    },
    9: function _(require, module, exports) {
      var toArray = exports.toArray = function toArray(object) {
        var name, results, value;

        if (Array.isArray(object)) {
          return object;
        } else {
          results = [];

          for (name in object) {
            value = object[name];
            results.push({
              name: name,
              value: value
            });
          }

          return results;
        }
      };

      return module.exports;
    },
    10: function _(require, module, exports) {
      function EventLite() {
        if (!(this instanceof EventLite)) return new EventLite();
      }

      (function (EventLite) {
        if ("undefined" !== typeof module) module.exports = EventLite;
        var LISTENERS = "listeners";
        var methods = {
          on: on,
          once: once,
          off: off,
          emit: emit
        };
        mixin(EventLite.prototype);
        EventLite.mixin = mixin;

        function mixin(target) {
          for (var key in methods) {
            target[key] = methods[key];
          }

          return target;
        }

        function on(type, func) {
          getListeners(this, type).push(func);
          return this;
        }

        function once(type, func) {
          var that = this;
          wrap.originalListener = func;
          getListeners(that, type).push(wrap);
          return that;

          function wrap() {
            off.call(that, type, wrap);
            func.apply(this, arguments);
          }
        }

        function off(type, func) {
          var that = this;
          var listners;

          if (!arguments.length) {
            delete that[LISTENERS];
          } else if (!func) {
            listners = that[LISTENERS];

            if (listners) {
              delete listners[type];
              if (!Object.keys(listners).length) return off.call(that);
            }
          } else {
            listners = getListeners(that, type, true);

            if (listners) {
              listners = listners.filter(ne);
              if (!listners.length) return off.call(that, type);
              that[LISTENERS][type] = listners;
            }
          }

          return that;

          function ne(test) {
            return test !== func && test.originalListener !== func;
          }
        }

        function emit(type, value) {
          var that = this;
          var listeners = getListeners(that, type, true);
          if (!listeners) return false;
          var arglen = arguments.length;

          if (arglen === 1) {
            listeners.forEach(zeroarg);
          } else if (arglen === 2) {
            listeners.forEach(onearg);
          } else {
            var args = Array.prototype.slice.call(arguments, 1);
            listeners.forEach(moreargs);
          }

          return !!listeners.length;

          function zeroarg(func) {
            func.call(that);
          }

          function onearg(func) {
            func.call(that, value);
          }

          function moreargs(func) {
            func.apply(that, args);
          }
        }

        function getListeners(that, type, readonly) {
          if (readonly && !that[LISTENERS]) return;
          var listeners = that[LISTENERS] || (that[LISTENERS] = {});
          return listeners[type] || (listeners[type] = []);
        }
      })(EventLite);

      return module.exports;
    },
    11: function _(require, module, exports) {
      (function (global, factory) {
        _typeof(exports) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Popper = factory();
      })(this, function () {
        'use strict';

        var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
        var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
        var timeoutDuration = 0;

        for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
          if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
            timeoutDuration = 1;
            break;
          }
        }

        function microtaskDebounce(fn) {
          var called = false;
          return function () {
            if (called) {
              return;
            }

            called = true;
            window.Promise.resolve().then(function () {
              called = false;
              fn();
            });
          };
        }

        function taskDebounce(fn) {
          var scheduled = false;
          return function () {
            if (!scheduled) {
              scheduled = true;
              setTimeout(function () {
                scheduled = false;
                fn();
              }, timeoutDuration);
            }
          };
        }

        var supportsMicroTasks = isBrowser && window.Promise;
        var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

        function isFunction(functionToCheck) {
          var getType = {};
          return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        }

        function getStyleComputedProperty(element, property) {
          if (element.nodeType !== 1) {
            return [];
          }

          var css = getComputedStyle(element, null);
          return property ? css[property] : css;
        }

        function getParentNode(element) {
          if (element.nodeName === 'HTML') {
            return element;
          }

          return element.parentNode || element.host;
        }

        function getScrollParent(element) {
          if (!element) {
            return document.body;
          }

          switch (element.nodeName) {
            case 'HTML':
            case 'BODY':
              return element.ownerDocument.body;

            case '#document':
              return element.body;
          }

          var _getStyleComputedProp = getStyleComputedProperty(element),
              overflow = _getStyleComputedProp.overflow,
              overflowX = _getStyleComputedProp.overflowX,
              overflowY = _getStyleComputedProp.overflowY;

          if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
            return element;
          }

          return getScrollParent(getParentNode(element));
        }

        var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
        var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

        function isIE(version) {
          if (version === 11) {
            return isIE11;
          }

          if (version === 10) {
            return isIE10;
          }

          return isIE11 || isIE10;
        }

        function getOffsetParent(element) {
          if (!element) {
            return document.documentElement;
          }

          var noOffsetParent = isIE(10) ? document.body : null;
          var offsetParent = element.offsetParent;

          while (offsetParent === noOffsetParent && element.nextElementSibling) {
            offsetParent = (element = element.nextElementSibling).offsetParent;
          }

          var nodeName = offsetParent && offsetParent.nodeName;

          if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
            return element ? element.ownerDocument.documentElement : document.documentElement;
          }

          if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
            return getOffsetParent(offsetParent);
          }

          return offsetParent;
        }

        function isOffsetContainer(element) {
          var nodeName = element.nodeName;

          if (nodeName === 'BODY') {
            return false;
          }

          return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
        }

        function getRoot(node) {
          if (node.parentNode !== null) {
            return getRoot(node.parentNode);
          }

          return node;
        }

        function findCommonOffsetParent(element1, element2) {
          if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
            return document.documentElement;
          }

          var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
          var start = order ? element1 : element2;
          var end = order ? element2 : element1;
          var range = document.createRange();
          range.setStart(start, 0);
          range.setEnd(end, 0);
          var commonAncestorContainer = range.commonAncestorContainer;

          if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
            if (isOffsetContainer(commonAncestorContainer)) {
              return commonAncestorContainer;
            }

            return getOffsetParent(commonAncestorContainer);
          }

          var element1root = getRoot(element1);

          if (element1root.host) {
            return findCommonOffsetParent(element1root.host, element2);
          } else {
            return findCommonOffsetParent(element1, getRoot(element2).host);
          }
        }

        function getScroll(element) {
          var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
          var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
          var nodeName = element.nodeName;

          if (nodeName === 'BODY' || nodeName === 'HTML') {
            var html = element.ownerDocument.documentElement;
            var scrollingElement = element.ownerDocument.scrollingElement || html;
            return scrollingElement[upperSide];
          }

          return element[upperSide];
        }

        function includeScroll(rect, element) {
          var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var scrollTop = getScroll(element, 'top');
          var scrollLeft = getScroll(element, 'left');
          var modifier = subtract ? -1 : 1;
          rect.top += scrollTop * modifier;
          rect.bottom += scrollTop * modifier;
          rect.left += scrollLeft * modifier;
          rect.right += scrollLeft * modifier;
          return rect;
        }

        function getBordersSize(styles, axis) {
          var sideA = axis === 'x' ? 'Left' : 'Top';
          var sideB = sideA === 'Left' ? 'Right' : 'Bottom';
          return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
        }

        function getSize(axis, body, html, computedStyle) {
          return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
        }

        function getWindowSizes() {
          var body = document.body;
          var html = document.documentElement;
          var computedStyle = isIE(10) && getComputedStyle(html);
          return {
            height: getSize('Height', body, html, computedStyle),
            width: getSize('Width', body, html, computedStyle)
          };
        }

        var classCallCheck = function classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        };

        var createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var defineProperty = function defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        };

        var _extends = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        function getClientRect(offsets) {
          return _extends({}, offsets, {
            right: offsets.left + offsets.width,
            bottom: offsets.top + offsets.height
          });
        }

        function getBoundingClientRect(element) {
          var rect = {};

          try {
            if (isIE(10)) {
              rect = element.getBoundingClientRect();
              var scrollTop = getScroll(element, 'top');
              var scrollLeft = getScroll(element, 'left');
              rect.top += scrollTop;
              rect.left += scrollLeft;
              rect.bottom += scrollTop;
              rect.right += scrollLeft;
            } else {
              rect = element.getBoundingClientRect();
            }
          } catch (e) {}

          var result = {
            left: rect.left,
            top: rect.top,
            width: rect.right - rect.left,
            height: rect.bottom - rect.top
          };
          var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
          var width = sizes.width || element.clientWidth || result.right - result.left;
          var height = sizes.height || element.clientHeight || result.bottom - result.top;
          var horizScrollbar = element.offsetWidth - width;
          var vertScrollbar = element.offsetHeight - height;

          if (horizScrollbar || vertScrollbar) {
            var styles = getStyleComputedProperty(element);
            horizScrollbar -= getBordersSize(styles, 'x');
            vertScrollbar -= getBordersSize(styles, 'y');
            result.width -= horizScrollbar;
            result.height -= vertScrollbar;
          }

          return getClientRect(result);
        }

        function getOffsetRectRelativeToArbitraryNode(children, parent) {
          var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var isIE10 = isIE(10);
          var isHTML = parent.nodeName === 'HTML';
          var childrenRect = getBoundingClientRect(children);
          var parentRect = getBoundingClientRect(parent);
          var scrollParent = getScrollParent(children);
          var styles = getStyleComputedProperty(parent);
          var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
          var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

          if (fixedPosition && parent.nodeName === 'HTML') {
            parentRect.top = Math.max(parentRect.top, 0);
            parentRect.left = Math.max(parentRect.left, 0);
          }

          var offsets = getClientRect({
            top: childrenRect.top - parentRect.top - borderTopWidth,
            left: childrenRect.left - parentRect.left - borderLeftWidth,
            width: childrenRect.width,
            height: childrenRect.height
          });
          offsets.marginTop = 0;
          offsets.marginLeft = 0;

          if (!isIE10 && isHTML) {
            var marginTop = parseFloat(styles.marginTop, 10);
            var marginLeft = parseFloat(styles.marginLeft, 10);
            offsets.top -= borderTopWidth - marginTop;
            offsets.bottom -= borderTopWidth - marginTop;
            offsets.left -= borderLeftWidth - marginLeft;
            offsets.right -= borderLeftWidth - marginLeft;
            offsets.marginTop = marginTop;
            offsets.marginLeft = marginLeft;
          }

          if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
            offsets = includeScroll(offsets, parent);
          }

          return offsets;
        }

        function getViewportOffsetRectRelativeToArtbitraryNode(element) {
          var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var html = element.ownerDocument.documentElement;
          var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
          var width = Math.max(html.clientWidth, window.innerWidth || 0);
          var height = Math.max(html.clientHeight, window.innerHeight || 0);
          var scrollTop = !excludeScroll ? getScroll(html) : 0;
          var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;
          var offset = {
            top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
            left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
            width: width,
            height: height
          };
          return getClientRect(offset);
        }

        function isFixed(element) {
          var nodeName = element.nodeName;

          if (nodeName === 'BODY' || nodeName === 'HTML') {
            return false;
          }

          if (getStyleComputedProperty(element, 'position') === 'fixed') {
            return true;
          }

          return isFixed(getParentNode(element));
        }

        function getFixedPositionOffsetParent(element) {
          if (!element || !element.parentElement || isIE()) {
            return document.documentElement;
          }

          var el = element.parentElement;

          while (el && getStyleComputedProperty(el, 'transform') === 'none') {
            el = el.parentElement;
          }

          return el || document.documentElement;
        }

        function getBoundaries(popper, reference, padding, boundariesElement) {
          var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
          var boundaries = {
            top: 0,
            left: 0
          };
          var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

          if (boundariesElement === 'viewport') {
            boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
          } else {
            var boundariesNode = void 0;

            if (boundariesElement === 'scrollParent') {
              boundariesNode = getScrollParent(getParentNode(reference));

              if (boundariesNode.nodeName === 'BODY') {
                boundariesNode = popper.ownerDocument.documentElement;
              }
            } else if (boundariesElement === 'window') {
              boundariesNode = popper.ownerDocument.documentElement;
            } else {
              boundariesNode = boundariesElement;
            }

            var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

            if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
              var _getWindowSizes = getWindowSizes(),
                  height = _getWindowSizes.height,
                  width = _getWindowSizes.width;

              boundaries.top += offsets.top - offsets.marginTop;
              boundaries.bottom = height + offsets.top;
              boundaries.left += offsets.left - offsets.marginLeft;
              boundaries.right = width + offsets.left;
            } else {
              boundaries = offsets;
            }
          }

          boundaries.left += padding;
          boundaries.top += padding;
          boundaries.right -= padding;
          boundaries.bottom -= padding;
          return boundaries;
        }

        function getArea(_ref) {
          var width = _ref.width,
              height = _ref.height;
          return width * height;
        }

        function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
          var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

          if (placement.indexOf('auto') === -1) {
            return placement;
          }

          var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
          var rects = {
            top: {
              width: boundaries.width,
              height: refRect.top - boundaries.top
            },
            right: {
              width: boundaries.right - refRect.right,
              height: boundaries.height
            },
            bottom: {
              width: boundaries.width,
              height: boundaries.bottom - refRect.bottom
            },
            left: {
              width: refRect.left - boundaries.left,
              height: boundaries.height
            }
          };
          var sortedAreas = Object.keys(rects).map(function (key) {
            return _extends({
              key: key
            }, rects[key], {
              area: getArea(rects[key])
            });
          }).sort(function (a, b) {
            return b.area - a.area;
          });
          var filteredAreas = sortedAreas.filter(function (_ref2) {
            var width = _ref2.width,
                height = _ref2.height;
            return width >= popper.clientWidth && height >= popper.clientHeight;
          });
          var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
          var variation = placement.split('-')[1];
          return computedPlacement + (variation ? '-' + variation : '');
        }

        function getReferenceOffsets(state, popper, reference) {
          var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
          var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
          return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
        }

        function getOuterSizes(element) {
          var styles = getComputedStyle(element);
          var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
          var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
          var result = {
            width: element.offsetWidth + y,
            height: element.offsetHeight + x
          };
          return result;
        }

        function getOppositePlacement(placement) {
          var hash = {
            left: 'right',
            right: 'left',
            bottom: 'top',
            top: 'bottom'
          };
          return placement.replace(/left|right|bottom|top/g, function (matched) {
            return hash[matched];
          });
        }

        function getPopperOffsets(popper, referenceOffsets, placement) {
          placement = placement.split('-')[0];
          var popperRect = getOuterSizes(popper);
          var popperOffsets = {
            width: popperRect.width,
            height: popperRect.height
          };
          var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
          var mainSide = isHoriz ? 'top' : 'left';
          var secondarySide = isHoriz ? 'left' : 'top';
          var measurement = isHoriz ? 'height' : 'width';
          var secondaryMeasurement = !isHoriz ? 'height' : 'width';
          popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;

          if (placement === secondarySide) {
            popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
          } else {
            popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
          }

          return popperOffsets;
        }

        function find(arr, check) {
          if (Array.prototype.find) {
            return arr.find(check);
          }

          return arr.filter(check)[0];
        }

        function findIndex(arr, prop, value) {
          if (Array.prototype.findIndex) {
            return arr.findIndex(function (cur) {
              return cur[prop] === value;
            });
          }

          var match = find(arr, function (obj) {
            return obj[prop] === value;
          });
          return arr.indexOf(match);
        }

        function runModifiers(modifiers, data, ends) {
          var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));
          modifiersToRun.forEach(function (modifier) {
            if (modifier['function']) {
              console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
            }

            var fn = modifier['function'] || modifier.fn;

            if (modifier.enabled && isFunction(fn)) {
              data.offsets.popper = getClientRect(data.offsets.popper);
              data.offsets.reference = getClientRect(data.offsets.reference);
              data = fn(data, modifier);
            }
          });
          return data;
        }

        function update() {
          if (this.state.isDestroyed) {
            return;
          }

          var data = {
            instance: this,
            styles: {},
            arrowStyles: {},
            attributes: {},
            flipped: false,
            offsets: {}
          };
          data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);
          data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);
          data.originalPlacement = data.placement;
          data.positionFixed = this.options.positionFixed;
          data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
          data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';
          data = runModifiers(this.modifiers, data);

          if (!this.state.isCreated) {
            this.state.isCreated = true;
            this.options.onCreate(data);
          } else {
            this.options.onUpdate(data);
          }
        }

        function isModifierEnabled(modifiers, modifierName) {
          return modifiers.some(function (_ref) {
            var name = _ref.name,
                enabled = _ref.enabled;
            return enabled && name === modifierName;
          });
        }

        function getSupportedPropertyName(property) {
          var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
          var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

          for (var i = 0; i < prefixes.length; i++) {
            var prefix = prefixes[i];
            var toCheck = prefix ? '' + prefix + upperProp : property;

            if (typeof document.body.style[toCheck] !== 'undefined') {
              return toCheck;
            }
          }

          return null;
        }

        function destroy() {
          this.state.isDestroyed = true;

          if (isModifierEnabled(this.modifiers, 'applyStyle')) {
            this.popper.removeAttribute('x-placement');
            this.popper.style.position = '';
            this.popper.style.top = '';
            this.popper.style.left = '';
            this.popper.style.right = '';
            this.popper.style.bottom = '';
            this.popper.style.willChange = '';
            this.popper.style[getSupportedPropertyName('transform')] = '';
          }

          this.disableEventListeners();

          if (this.options.removeOnDestroy) {
            this.popper.parentNode.removeChild(this.popper);
          }

          return this;
        }

        function getWindow(element) {
          var ownerDocument = element.ownerDocument;
          return ownerDocument ? ownerDocument.defaultView : window;
        }

        function attachToScrollParents(scrollParent, event, callback, scrollParents) {
          var isBody = scrollParent.nodeName === 'BODY';
          var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
          target.addEventListener(event, callback, {
            passive: true
          });

          if (!isBody) {
            attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
          }

          scrollParents.push(target);
        }

        function setupEventListeners(reference, options, state, updateBound) {
          state.updateBound = updateBound;
          getWindow(reference).addEventListener('resize', state.updateBound, {
            passive: true
          });
          var scrollElement = getScrollParent(reference);
          attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
          state.scrollElement = scrollElement;
          state.eventsEnabled = true;
          return state;
        }

        function enableEventListeners() {
          if (!this.state.eventsEnabled) {
            this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
          }
        }

        function removeEventListeners(reference, state) {
          getWindow(reference).removeEventListener('resize', state.updateBound);
          state.scrollParents.forEach(function (target) {
            target.removeEventListener('scroll', state.updateBound);
          });
          state.updateBound = null;
          state.scrollParents = [];
          state.scrollElement = null;
          state.eventsEnabled = false;
          return state;
        }

        function disableEventListeners() {
          if (this.state.eventsEnabled) {
            cancelAnimationFrame(this.scheduleUpdate);
            this.state = removeEventListeners(this.reference, this.state);
          }
        }

        function isNumeric(n) {
          return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
        }

        function setStyles(element, styles) {
          Object.keys(styles).forEach(function (prop) {
            var unit = '';

            if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
              unit = 'px';
            }

            element.style[prop] = styles[prop] + unit;
          });
        }

        function setAttributes(element, attributes) {
          Object.keys(attributes).forEach(function (prop) {
            var value = attributes[prop];

            if (value !== false) {
              element.setAttribute(prop, attributes[prop]);
            } else {
              element.removeAttribute(prop);
            }
          });
        }

        function applyStyle(data) {
          setStyles(data.instance.popper, data.styles);
          setAttributes(data.instance.popper, data.attributes);

          if (data.arrowElement && Object.keys(data.arrowStyles).length) {
            setStyles(data.arrowElement, data.arrowStyles);
          }

          return data;
        }

        function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
          var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);
          var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
          popper.setAttribute('x-placement', placement);
          setStyles(popper, {
            position: options.positionFixed ? 'fixed' : 'absolute'
          });
          return options;
        }

        function computeStyle(data, options) {
          var x = options.x,
              y = options.y;
          var popper = data.offsets.popper;
          var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
            return modifier.name === 'applyStyle';
          }).gpuAcceleration;

          if (legacyGpuAccelerationOption !== undefined) {
            console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
          }

          var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;
          var offsetParent = getOffsetParent(data.instance.popper);
          var offsetParentRect = getBoundingClientRect(offsetParent);
          var styles = {
            position: popper.position
          };
          var offsets = {
            left: Math.floor(popper.left),
            top: Math.round(popper.top),
            bottom: Math.round(popper.bottom),
            right: Math.floor(popper.right)
          };
          var sideA = x === 'bottom' ? 'top' : 'bottom';
          var sideB = y === 'right' ? 'left' : 'right';
          var prefixedProperty = getSupportedPropertyName('transform');
          var left = void 0,
              top = void 0;

          if (sideA === 'bottom') {
            top = -offsetParentRect.height + offsets.bottom;
          } else {
            top = offsets.top;
          }

          if (sideB === 'right') {
            left = -offsetParentRect.width + offsets.right;
          } else {
            left = offsets.left;
          }

          if (gpuAcceleration && prefixedProperty) {
            styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
            styles[sideA] = 0;
            styles[sideB] = 0;
            styles.willChange = 'transform';
          } else {
            var invertTop = sideA === 'bottom' ? -1 : 1;
            var invertLeft = sideB === 'right' ? -1 : 1;
            styles[sideA] = top * invertTop;
            styles[sideB] = left * invertLeft;
            styles.willChange = sideA + ', ' + sideB;
          }

          var attributes = {
            'x-placement': data.placement
          };
          data.attributes = _extends({}, attributes, data.attributes);
          data.styles = _extends({}, styles, data.styles);
          data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);
          return data;
        }

        function isModifierRequired(modifiers, requestingName, requestedName) {
          var requesting = find(modifiers, function (_ref) {
            var name = _ref.name;
            return name === requestingName;
          });
          var isRequired = !!requesting && modifiers.some(function (modifier) {
            return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
          });

          if (!isRequired) {
            var _requesting = '`' + requestingName + '`';

            var requested = '`' + requestedName + '`';
            console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
          }

          return isRequired;
        }

        function arrow(data, options) {
          var _data$offsets$arrow;

          if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
            return data;
          }

          var arrowElement = options.element;

          if (typeof arrowElement === 'string') {
            arrowElement = data.instance.popper.querySelector(arrowElement);

            if (!arrowElement) {
              return data;
            }
          } else {
            if (!data.instance.popper.contains(arrowElement)) {
              console.warn('WARNING: `arrow.element` must be child of its popper element!');
              return data;
            }
          }

          var placement = data.placement.split('-')[0];
          var _data$offsets = data.offsets,
              popper = _data$offsets.popper,
              reference = _data$offsets.reference;
          var isVertical = ['left', 'right'].indexOf(placement) !== -1;
          var len = isVertical ? 'height' : 'width';
          var sideCapitalized = isVertical ? 'Top' : 'Left';
          var side = sideCapitalized.toLowerCase();
          var altSide = isVertical ? 'left' : 'top';
          var opSide = isVertical ? 'bottom' : 'right';
          var arrowElementSize = getOuterSizes(arrowElement)[len];

          if (reference[opSide] - arrowElementSize < popper[side]) {
            data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
          }

          if (reference[side] + arrowElementSize > popper[opSide]) {
            data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
          }

          data.offsets.popper = getClientRect(data.offsets.popper);
          var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;
          var css = getStyleComputedProperty(data.instance.popper);
          var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
          var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
          var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;
          sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
          data.arrowElement = arrowElement;
          data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);
          return data;
        }

        function getOppositeVariation(variation) {
          if (variation === 'end') {
            return 'start';
          } else if (variation === 'start') {
            return 'end';
          }

          return variation;
        }

        var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];
        var validPlacements = placements.slice(3);

        function clockwise(placement) {
          var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var index = validPlacements.indexOf(placement);
          var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
          return counter ? arr.reverse() : arr;
        }

        var BEHAVIORS = {
          FLIP: 'flip',
          CLOCKWISE: 'clockwise',
          COUNTERCLOCKWISE: 'counterclockwise'
        };

        function flip(data, options) {
          if (isModifierEnabled(data.instance.modifiers, 'inner')) {
            return data;
          }

          if (data.flipped && data.placement === data.originalPlacement) {
            return data;
          }

          var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);
          var placement = data.placement.split('-')[0];
          var placementOpposite = getOppositePlacement(placement);
          var variation = data.placement.split('-')[1] || '';
          var flipOrder = [];

          switch (options.behavior) {
            case BEHAVIORS.FLIP:
              flipOrder = [placement, placementOpposite];
              break;

            case BEHAVIORS.CLOCKWISE:
              flipOrder = clockwise(placement);
              break;

            case BEHAVIORS.COUNTERCLOCKWISE:
              flipOrder = clockwise(placement, true);
              break;

            default:
              flipOrder = options.behavior;
          }

          flipOrder.forEach(function (step, index) {
            if (placement !== step || flipOrder.length === index + 1) {
              return data;
            }

            placement = data.placement.split('-')[0];
            placementOpposite = getOppositePlacement(placement);
            var popperOffsets = data.offsets.popper;
            var refOffsets = data.offsets.reference;
            var floor = Math.floor;
            var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);
            var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
            var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
            var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
            var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
            var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;
            var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
            var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

            if (overlapsRef || overflowsBoundaries || flippedVariation) {
              data.flipped = true;

              if (overlapsRef || overflowsBoundaries) {
                placement = flipOrder[index + 1];
              }

              if (flippedVariation) {
                variation = getOppositeVariation(variation);
              }

              data.placement = placement + (variation ? '-' + variation : '');
              data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
              data = runModifiers(data.instance.modifiers, data, 'flip');
            }
          });
          return data;
        }

        function keepTogether(data) {
          var _data$offsets = data.offsets,
              popper = _data$offsets.popper,
              reference = _data$offsets.reference;
          var placement = data.placement.split('-')[0];
          var floor = Math.floor;
          var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
          var side = isVertical ? 'right' : 'bottom';
          var opSide = isVertical ? 'left' : 'top';
          var measurement = isVertical ? 'width' : 'height';

          if (popper[side] < floor(reference[opSide])) {
            data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
          }

          if (popper[opSide] > floor(reference[side])) {
            data.offsets.popper[opSide] = floor(reference[side]);
          }

          return data;
        }

        function toValue(str, measurement, popperOffsets, referenceOffsets) {
          var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
          var value = +split[1];
          var unit = split[2];

          if (!value) {
            return str;
          }

          if (unit.indexOf('%') === 0) {
            var element = void 0;

            switch (unit) {
              case '%p':
                element = popperOffsets;
                break;

              case '%':
              case '%r':
              default:
                element = referenceOffsets;
            }

            var rect = getClientRect(element);
            return rect[measurement] / 100 * value;
          } else if (unit === 'vh' || unit === 'vw') {
            var size = void 0;

            if (unit === 'vh') {
              size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            } else {
              size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            }

            return size / 100 * value;
          } else {
            return value;
          }
        }

        function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
          var offsets = [0, 0];
          var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;
          var fragments = offset.split(/(\+|\-)/).map(function (frag) {
            return frag.trim();
          });
          var divider = fragments.indexOf(find(fragments, function (frag) {
            return frag.search(/,|\s/) !== -1;
          }));

          if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
            console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
          }

          var splitRegex = /\s*,\s*|\s+/;
          var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];
          ops = ops.map(function (op, index) {
            var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
            var mergeWithPrevious = false;
            return op.reduce(function (a, b) {
              if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
                a[a.length - 1] = b;
                mergeWithPrevious = true;
                return a;
              } else if (mergeWithPrevious) {
                a[a.length - 1] += b;
                mergeWithPrevious = false;
                return a;
              } else {
                return a.concat(b);
              }
            }, []).map(function (str) {
              return toValue(str, measurement, popperOffsets, referenceOffsets);
            });
          });
          ops.forEach(function (op, index) {
            op.forEach(function (frag, index2) {
              if (isNumeric(frag)) {
                offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
              }
            });
          });
          return offsets;
        }

        function offset(data, _ref) {
          var offset = _ref.offset;
          var placement = data.placement,
              _data$offsets = data.offsets,
              popper = _data$offsets.popper,
              reference = _data$offsets.reference;
          var basePlacement = placement.split('-')[0];
          var offsets = void 0;

          if (isNumeric(+offset)) {
            offsets = [+offset, 0];
          } else {
            offsets = parseOffset(offset, popper, reference, basePlacement);
          }

          if (basePlacement === 'left') {
            popper.top += offsets[0];
            popper.left -= offsets[1];
          } else if (basePlacement === 'right') {
            popper.top += offsets[0];
            popper.left += offsets[1];
          } else if (basePlacement === 'top') {
            popper.left += offsets[0];
            popper.top -= offsets[1];
          } else if (basePlacement === 'bottom') {
            popper.left += offsets[0];
            popper.top += offsets[1];
          }

          data.popper = popper;
          return data;
        }

        function preventOverflow(data, options) {
          var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

          if (data.instance.reference === boundariesElement) {
            boundariesElement = getOffsetParent(boundariesElement);
          }

          var transformProp = getSupportedPropertyName('transform');
          var popperStyles = data.instance.popper.style;
          var top = popperStyles.top,
              left = popperStyles.left,
              transform = popperStyles[transformProp];
          popperStyles.top = '';
          popperStyles.left = '';
          popperStyles[transformProp] = '';
          var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);
          popperStyles.top = top;
          popperStyles.left = left;
          popperStyles[transformProp] = transform;
          options.boundaries = boundaries;
          var order = options.priority;
          var popper = data.offsets.popper;
          var check = {
            primary: function primary(placement) {
              var value = popper[placement];

              if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
                value = Math.max(popper[placement], boundaries[placement]);
              }

              return defineProperty({}, placement, value);
            },
            secondary: function secondary(placement) {
              var mainSide = placement === 'right' ? 'left' : 'top';
              var value = popper[mainSide];

              if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
                value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
              }

              return defineProperty({}, mainSide, value);
            }
          };
          order.forEach(function (placement) {
            var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
            popper = _extends({}, popper, check[side](placement));
          });
          data.offsets.popper = popper;
          return data;
        }

        function shift(data) {
          var placement = data.placement;
          var basePlacement = placement.split('-')[0];
          var shiftvariation = placement.split('-')[1];

          if (shiftvariation) {
            var _data$offsets = data.offsets,
                reference = _data$offsets.reference,
                popper = _data$offsets.popper;
            var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
            var side = isVertical ? 'left' : 'top';
            var measurement = isVertical ? 'width' : 'height';
            var shiftOffsets = {
              start: defineProperty({}, side, reference[side]),
              end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
            };
            data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
          }

          return data;
        }

        function hide(data) {
          if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
            return data;
          }

          var refRect = data.offsets.reference;
          var bound = find(data.instance.modifiers, function (modifier) {
            return modifier.name === 'preventOverflow';
          }).boundaries;

          if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
            if (data.hide === true) {
              return data;
            }

            data.hide = true;
            data.attributes['x-out-of-boundaries'] = '';
          } else {
            if (data.hide === false) {
              return data;
            }

            data.hide = false;
            data.attributes['x-out-of-boundaries'] = false;
          }

          return data;
        }

        function inner(data) {
          var placement = data.placement;
          var basePlacement = placement.split('-')[0];
          var _data$offsets = data.offsets,
              popper = _data$offsets.popper,
              reference = _data$offsets.reference;
          var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;
          var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;
          popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);
          data.placement = getOppositePlacement(placement);
          data.offsets.popper = getClientRect(popper);
          return data;
        }

        var modifiers = {
          shift: {
            order: 100,
            enabled: true,
            fn: shift
          },
          offset: {
            order: 200,
            enabled: true,
            fn: offset,
            offset: 0
          },
          preventOverflow: {
            order: 300,
            enabled: true,
            fn: preventOverflow,
            priority: ['left', 'right', 'top', 'bottom'],
            padding: 5,
            boundariesElement: 'scrollParent'
          },
          keepTogether: {
            order: 400,
            enabled: true,
            fn: keepTogether
          },
          arrow: {
            order: 500,
            enabled: true,
            fn: arrow,
            element: '[x-arrow]'
          },
          flip: {
            order: 600,
            enabled: true,
            fn: flip,
            behavior: 'flip',
            padding: 5,
            boundariesElement: 'viewport'
          },
          inner: {
            order: 700,
            enabled: false,
            fn: inner
          },
          hide: {
            order: 800,
            enabled: true,
            fn: hide
          },
          computeStyle: {
            order: 850,
            enabled: true,
            fn: computeStyle,
            gpuAcceleration: true,
            x: 'bottom',
            y: 'right'
          },
          applyStyle: {
            order: 900,
            enabled: true,
            fn: applyStyle,
            onLoad: applyStyleOnLoad,
            gpuAcceleration: undefined
          }
        };
        var Defaults = {
          placement: 'bottom',
          positionFixed: false,
          eventsEnabled: true,
          removeOnDestroy: false,
          onCreate: function onCreate() {},
          onUpdate: function onUpdate() {},
          modifiers: modifiers
        };

        var Popper = function () {
          function Popper(reference, popper) {
            var _this = this;

            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            classCallCheck(this, Popper);

            this.scheduleUpdate = function () {
              return requestAnimationFrame(_this.update);
            };

            this.update = debounce(this.update.bind(this));
            this.options = _extends({}, Popper.Defaults, options);
            this.state = {
              isDestroyed: false,
              isCreated: false,
              scrollParents: []
            };
            this.reference = reference && reference.jquery ? reference[0] : reference;
            this.popper = popper && popper.jquery ? popper[0] : popper;
            this.options.modifiers = {};
            Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
              _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
            });
            this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
              return _extends({
                name: name
              }, _this.options.modifiers[name]);
            }).sort(function (a, b) {
              return a.order - b.order;
            });
            this.modifiers.forEach(function (modifierOptions) {
              if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
                modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
              }
            });
            this.update();
            var eventsEnabled = this.options.eventsEnabled;

            if (eventsEnabled) {
              this.enableEventListeners();
            }

            this.state.eventsEnabled = eventsEnabled;
          }

          createClass(Popper, [{
            key: 'update',
            value: function update$$1() {
              return update.call(this);
            }
          }, {
            key: 'destroy',
            value: function destroy$$1() {
              return destroy.call(this);
            }
          }, {
            key: 'enableEventListeners',
            value: function enableEventListeners$$1() {
              return enableEventListeners.call(this);
            }
          }, {
            key: 'disableEventListeners',
            value: function disableEventListeners$$1() {
              return disableEventListeners.call(this);
            }
          }]);
          return Popper;
        }();

        Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
        Popper.placements = placements;
        Popper.Defaults = Defaults;
        return Popper;
      });

      return module.exports;
    },
    12: function _(require, module, exports) {
      var __index2 = require(6),
          DOM = __index2;

      var button = exports.button = DOM.template(['div', {
        ref: 'button',
        style: {
          position: 'relative',
          height: 50,
          borderRadius: '0 0 5px 5px',
          boxSizing: 'border-box',
          cursor: 'pointer',
          userSelect: 'none',
          backgroundColor: function backgroundColor(i) {
            return i.settings.button.bgColor;
          },
          color: function color(i) {
            return i.settings.button.textColor;
          }
        },
        computers: {
          height: function height(_height) {
            return this.style({
              height: _height
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
          text: function text(_text) {
            return this.text = _text;
          },
          size: function size(fontSize) {
            return this.style({
              fontSize: fontSize
            });
          },
          font: function font(fontFamily) {
            return this.style({
              fontFamily: fontFamily
            });
          }
        }
      }]]);
      exports.default = DOM.template(['div', {
        ref: 'TagList-Popup',
        style: {
          position: 'relative',
          zIndex: 2001,
          backgroundColor: 'white',
          borderRadius: '5px',
          boxShadow: '0px 3px 18px rgba(0,0,0,0.24)',
          boxSizing: 'border-box',
          fontFamily: function fontFamily(popup) {
            return popup.settings.fontFamily;
          }
        }
      }, ['div', {
        ref: 'content'
      }]]);
      return module.exports;
    },
    13: function _(require, module, exports) {
      exports.default = function (value, formatter) {
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

          case !(_typeof(formatter) === 'object' && formatter):
            return formatter[value] || value;
        }
      };

      ;
      return module.exports;
    },
    14: function _(require, module, exports) {
      exports.default = function (tag) {
        var _updater;

        _updater = function updater(newValue) {
          return _updater.tag._updateFromField(newValue);
        };

        _updater.tag = tag;
        return _updater;
      };

      ;
      return module.exports;
    },
    15: function _(require, module, exports) {
      var __index3 = require(6),
          DOM = __index3;

      var __template = require(12);

      var button = exports.button = DOM.template(['div', {
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
          set: function set(message) {
            var _this15 = this;

            this.html = message;
            this.show();
            clearTimeout(this._timeout);
            return this._timeout = setTimeout(function () {
              return _this15.clear();
            }, 8000);
          },
          clear: function clear() {
            this.text = '';
            return this.hide();
          }
        }
      }], __template.button.extend({
        ref: 'button_'
      }, ['div', {
        style: {
          backgroundColor: '#d4d4d4',
          $hover: {
            backgroundColor: function backgroundColor(i) {
              return i.settings.button.bgColor;
            }
          }
        }
      }])]);
      var removeButton = exports.removeButton = DOM.template(['div', {
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
      var text = exports.text = DOM.template(['div', {
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
      var content = exports.content = DOM.template(['div', {
        ref: 'tagContent',
        style: {
          boxSizing: 'border-box',
          padding: function padding(i) {
            return "".concat(i.settings.padding, "px");
          },
          maxWidth: function maxWidth(i) {
            return "".concat(i.settings.maxWidth, "px");
          }
        }
      }]);
      exports.default = DOM.template(['div', {
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
          backgroundColor: function backgroundColor(tag) {
            return tag.settings.bgColor;
          },
          color: function color(tag) {
            return tag.settings.textColor;
          },
          fontFamily: function fontFamily(tag) {
            return tag.settings.fontFamily;
          }
        }
      }, text, removeButton]);
      return module.exports;
    },
    16: function _(require, module, exports) {
      var settings = exports.settings = {
        bgColor: '#ccc',
        textColor: '#181818',
        updateWhen: 'applied',
        hideLabel: false,
        padding: 20,
        maxWidth: 350
      };
      var option = exports.option = {
        getter: function getter() {
          return this.field.value;
        },
        setter: function setter(value) {
          return this.field.value = value;
        },
        validate: function validate(value) {
          return value != null;
        }
      };
      return module.exports;
    },
    17: function _(require, module, exports) {
      var __index7 = require(32),
          errorEx = __index7;

      var ValidationError = exports.ValidationError = errorEx('ValidationError');
      return module.exports;
    },
    18: function _(require, module, exports) {
      var BufferTag;

      var __index10 = require(5),
          extend = __index10;

      var ___index3 = require(33);

      var ___index4 = require(3);

      var ___index5 = require(2);

      var defaults = require(16);

      var __template5 = require(15);

      module.exports = BufferTag = function () {
        var BufferTag =
        /*#__PURE__*/
        function (_require4) {
          _inherits(BufferTag, _require4);

          function BufferTag(list) {
            var _this16;

            _classCallCheck(this, BufferTag);

            _this16 = _possibleConstructorReturn(this, _getPrototypeOf(BufferTag).call(this));
            _this16.list = list;
            _this16.settings = _this16.list.settings;
            _this16.content = __template5.content.spawn(null, {
              relatedInstance: _assertThisInitialized(_assertThisInitialized(_this16))
            });
            _this16.state = {};
            _this16.applyButton = _this16.button = __template5.button.spawn({
              data: {
                text: "Add ".concat(_this16.settings.tagLabel)
              }
            }, {
              relatedInstance: _assertThisInitialized(_assertThisInitialized(_this16))
            });
            _this16.addButton = _this16.list.els.addButton;
            _this16.popup = new ___index5.default(_this16.addButton, _this16.settings, _this16.settings.boundingEl);
            _this16.selectField = new ___index3.default(_this16.settings);
            _this16.content_ = DOM.div(null, _this16.content);

            _this16.selectField.insertBefore(_this16.content);

            _this16.applyButton.insertAfter(_this16.content);

            _this16.popup.setContent(_this16.content_);

            _this16._setup();

            return _this16;
          }

          _createClass(BufferTag, [{
            key: "_setup",
            value: function _setup() {
              var _this17 = this;

              this.applyButton.on('click', function () {
                if (_this17._validateHasField()) {
                  return _this17._applyChanges();
                }
              });
              this.addButton.on('click', function () {
                return _this17.popup.open();
              });
              return this.selectField.on('change', function (_ref3) {
                var value = _ref3.value;
                return _this17._setCurrent(value);
              });
            }
          }, {
            key: "_setCurrent",
            value: function _setCurrent(name) {
              this.content.empty();
              this.option = this.list._findOption(name);

              if (this.option) {
                this.option = extend.clone(defaults.option, this.option);

                this._initField();
              } else {
                this.field = null;
              }

              if (this.selectField.value !== name) {
                return this.selectField.value = name;
              }
            }
          }, {
            key: "_validateHasField",
            value: function _validateHasField() {
              if (this.field) {
                return true;
              } else {
                this.button.child.errorMessage.set('You must select a field first');
                return false;
              }
            }
          }, {
            key: "_updateSelectable",
            value: function _updateSelectable() {
              var _this18 = this;

              var options;

              if (this.settings.repeatableValues) {
                options = this.list.options;
              } else {
                options = this.list.options.filter(function (_ref4) {
                  var name = _ref4.name;
                  return _this18.list._findTag(name);
                });
              }

              return this.selectField.setOptions(options);
            }
          }, {
            key: "_notifyChange",
            value: function _notifyChange() {
              this.emit('change', this.option, this.value);
              return this._reset();
            }
          }, {
            key: "_updateFromUser",
            value: function _updateFromUser(value) {
              return this.option.setter.call(this, value);
            }
          }, {
            key: "_updateFromField",
            value: function _updateFromField(value) {}
          }, {
            key: "_reset",
            value: function _reset() {
              this._setCurrent('');

              return this.popup.close();
            }
          }]);

          return BufferTag;
        }(require(10));

        ;
        BufferTag.prototype.get = ___index4.default.prototype.get;
        BufferTag.prototype.set = ___index4.default.prototype.set;
        BufferTag.prototype.validate = ___index4.default.prototype.validate;
        BufferTag.prototype._initField = ___index4.default.prototype._initField;
        BufferTag.prototype._applyChanges = ___index4.default.prototype._applyChanges;
        Object.defineProperties(BufferTag.prototype, {
          els: {
            get: function get() {
              return this.el.child;
            }
          },
          value: {
            get: function get() {
              return this.get();
            }
          }
        });
        return BufferTag;
      }.call(this);

      return module.exports;
    },
    19: function _(require, module, exports) {
      var _extend, isArray, isObject, _shouldDeepExtend;

      isArray = function isArray(target) {
        return Array.isArray(target);
      };

      isObject = function isObject(target) {
        return target && Object.prototype.toString.call(target) === '[object Object]' || isArray(target);
      };

      _shouldDeepExtend = function shouldDeepExtend(options, target, parentKey) {
        if (options.deep) {
          if (options.notDeep) {
            return !options.notDeep[target];
          } else {
            return true;
          }
        } else if (options.deepOnly) {
          return options.deepOnly[target] || parentKey && _shouldDeepExtend(options, parentKey);
        }
      };

      module.exports = _extend = function extend(options, target, sources, parentKey) {
        var i, key, len, source, sourceValue, subTarget, targetValue;

        if (!target || _typeof(target) !== 'object' && typeof target !== 'function') {
          target = {};
        }

        for (i = 0, len = sources.length; i < len; i++) {
          source = sources[i];

          if (source != null) {
            for (key in source) {
              sourceValue = source[key];
              targetValue = target[key];

              if (sourceValue === target || sourceValue === void 0 || sourceValue === null && !options.allowNull && !options.nullDeletes || options.keys && !options.keys[key] || options.notKeys && options.notKeys[key] || options.own && !source.hasOwnProperty(key) || options.globalFilter && !options.globalFilter(sourceValue, key, source) || options.filters && options.filters[key] && !options.filters[key](sourceValue, key, source)) {
                continue;
              }

              if (sourceValue === null && options.nullDeletes) {
                delete target[key];
                continue;
              }

              if (options.globalTransform) {
                sourceValue = options.globalTransform(sourceValue, key, source);
              }

              if (options.transforms && options.transforms[key]) {
                sourceValue = options.transforms[key](sourceValue, key, source);
              }

              switch (false) {
                case !(options.concat && isArray(sourceValue) && isArray(targetValue)):
                  target[key] = targetValue.concat(sourceValue);
                  break;

                case !(_shouldDeepExtend(options, key, parentKey) && isObject(sourceValue)):
                  subTarget = isObject(targetValue) ? targetValue : isArray(sourceValue) ? [] : {};
                  target[key] = _extend(options, subTarget, [sourceValue], key);
                  break;

                default:
                  target[key] = sourceValue;
              }
            }
          }
        }

        return target;
      };

      return module.exports;
    },
    21: function _(require, module, exports) {
      var _QuickCSS, constants, helpers;

      constants = require(34);
      helpers = require(35);

      _QuickCSS = function QuickCSS(targetEl, property, value, important) {
        var computedStyle, i, len, subEl, subProperty, subValue;

        if (helpers.isIterable(targetEl)) {
          for (i = 0, len = targetEl.length; i < len; i++) {
            subEl = targetEl[i];

            _QuickCSS(subEl, property, value);
          }
        } else if (_typeof(property) === 'object') {
          for (subProperty in property) {
            subValue = property[subProperty];

            _QuickCSS(targetEl, subProperty, subValue);
          }
        } else {
          property = helpers.normalizeProperty(property);

          if (typeof value === 'undefined') {
            computedStyle = targetEl._computedStyle || (targetEl._computedStyle = getComputedStyle(targetEl));
            return computedStyle[property];
          } else if (property) {
            targetEl.style.setProperty(property, helpers.normalizeValue(property, value), important ? constants.IMPORTANT : void 0);
          }
        }
      };

      _QuickCSS.animation = function (name, frames) {
        var frame, generated, prefix, rules;

        if (name && typeof name === 'string' && frames && _typeof(frames) === 'object') {
          prefix = helpers.getPrefix('animation');
          generated = '';

          for (frame in frames) {
            rules = frames[frame];
            generated += "".concat(frame, " {").concat(helpers.ruleToString(rules), "}");
          }

          generated = "@".concat(prefix, "keyframes ").concat(name, " {").concat(generated, "}");
          return helpers.inlineStyle(generated, true, 0);
        }
      };

      _QuickCSS.register = function (rule, level, important) {
        var className, ref, style;

        if (rule && _typeof(rule) === 'object') {
          level || (level = 0);
          rule = helpers.ruleToString(rule, important);

          if (!(className = (ref = helpers.inlineStyleConfig[level]) != null ? ref[rule] : void 0)) {
            className = helpers.hash(rule);
            style = ".".concat(className, " {").concat(rule, "}");
            helpers.inlineStyle(style, className, level);
          }

          return className;
        }
      };

      _QuickCSS.clearRegistered = function (level) {
        return helpers.clearInlineStyle(level || 0);
      };

      _QuickCSS.UNSET = function () {
        switch (false) {
          case !helpers.isValueSupported('display', 'unset'):
            return 'unset';

          case !helpers.isValueSupported('display', 'initial'):
            return 'initial';

          case !helpers.isValueSupported('display', 'inherit'):
            return 'inherit';
        }
      }();

      _QuickCSS.supports = helpers.isValueSupported;
      _QuickCSS.supportsProperty = helpers.isPropSupported;
      _QuickCSS.normalizeProperty = helpers.normalizeProperty;
      _QuickCSS.normalizeValue = helpers.normalizeValue;
      _QuickCSS.version = "1.3.4";
      module.exports = _QuickCSS;
      return module.exports;
    },
    32: function _(require, module, exports) {
      'use strict';

      var util = require(50);

      var isArrayish = require(51);

      var errorEx = function errorEx(name, properties) {
        if (!name || name.constructor !== String) {
          properties = name || {};
          name = Error.name;
        }

        var errorExError = function ErrorEXError(message) {
          if (!this) {
            return new ErrorEXError(message);
          }

          message = message instanceof Error ? message.message : message || this.message;
          Error.call(this, message);
          Error.captureStackTrace(this, errorExError);
          this.name = name;
          Object.defineProperty(this, 'message', {
            configurable: true,
            enumerable: false,
            get: function get() {
              var newMessage = message.split(/\r?\n/g);

              for (var key in properties) {
                if (!properties.hasOwnProperty(key)) {
                  continue;
                }

                var modifier = properties[key];

                if ('message' in modifier) {
                  newMessage = modifier.message(this[key], newMessage) || newMessage;

                  if (!isArrayish(newMessage)) {
                    newMessage = [newMessage];
                  }
                }
              }

              return newMessage.join('\n');
            },
            set: function set(v) {
              message = v;
            }
          });
          var stackDescriptor = Object.getOwnPropertyDescriptor(this, 'stack');
          var stackGetter = stackDescriptor.get;
          var stackValue = stackDescriptor.value;
          delete stackDescriptor.value;
          delete stackDescriptor.writable;

          stackDescriptor.get = function () {
            var stack = stackGetter ? stackGetter.call(this).split(/\r?\n+/g) : stackValue.split(/\r?\n+/g);
            stack[0] = this.name + ': ' + this.message;
            var lineCount = 1;

            for (var key in properties) {
              if (!properties.hasOwnProperty(key)) {
                continue;
              }

              var modifier = properties[key];

              if ('line' in modifier) {
                var line = modifier.line(this[key]);

                if (line) {
                  stack.splice(lineCount++, 0, '    ' + line);
                }
              }

              if ('stack' in modifier) {
                modifier.stack(this[key], stack);
              }
            }

            return stack.join('\n');
          };

          Object.defineProperty(this, 'stack', stackDescriptor);
        };

        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(errorExError.prototype, Error.prototype);
          Object.setPrototypeOf(errorExError, Error);
        } else {
          util.inherits(errorExError, Error);
        }

        return errorExError;
      };

      errorEx.append = function (str, def) {
        return {
          message: function message(v, _message) {
            v = v || def;

            if (v) {
              _message[0] += ' ' + str.replace('%s', v.toString());
            }

            return _message;
          }
        };
      };

      errorEx.line = function (str, def) {
        return {
          line: function line(v) {
            v = v || def;

            if (v) {
              return str.replace('%s', v.toString());
            }

            return null;
          }
        };
      };

      module.exports = errorEx;
      return module.exports;
    },
    33: function _(require, module, exports) {
      var SelectField;

      var __index9 = require(6),
          DOM = __index9;

      var template = require(52);

      SelectField = function () {
        var SelectField =
        /*#__PURE__*/
        function (_require5) {
          _inherits(SelectField, _require5);

          function SelectField(settings) {
            var _this19;

            _classCallCheck(this, SelectField);

            _this19 = _possibleConstructorReturn(this, _getPrototypeOf(SelectField).call(this));
            _this19.settings = settings;
            _this19.field = template.field.spawn(null, {
              relatedInstance: _assertThisInitialized(_assertThisInitialized(_this19))
            });
            _this19.input = _this19.field.child.input;

            _this19._attachBindings();

            _this19._setUiLabel(_this19.label);

            return _this19;
          }

          _createClass(SelectField, [{
            key: "_attachBindings",
            value: function _attachBindings() {
              var _this20 = this;

              this.field.on('input', function () {
                return _this20.emit('change', {
                  label: _this20.label,
                  value: _this20.value
                });
              });
              return this.on('change', function (_ref5) {
                var label = _ref5.label;
                return this._setUiLabel(label);
              });
            }
          }, {
            key: "_setUiLabel",
            value: function _setUiLabel(label) {
              return this.field.child.fake.html = label;
            }
          }, {
            key: "_setValue",
            value: function _setValue(value) {
              this.input.value = value;
              return this._setUiLabel(this.label);
            }
          }, {
            key: "setOptions",
            value: function setOptions(options) {
              var i, label, len, name, prevOptions;
              prevOptions = this.input.children.slice(1);

              if (prevOptions.length) {
                DOM.batch(prevOptions).remove();
              }

              for (i = 0, len = options.length; i < len; i++) {
                var _options$i = options[i];
                name = _options$i.name;
                label = _options$i.label;
                this.input.append(DOM.option({
                  props: {
                    value: name
                  }
                }, label));
              }
            }
          }, {
            key: "insertBefore",
            value: function insertBefore(target) {
              return this.field.insertBefore(target);
            }
          }]);

          return SelectField;
        }(require(10));

        ;
        Object.defineProperties(SelectField.prototype, {
          label: {
            get: function get() {
              return this.input.label;
            }
          },
          value: {
            get: function get() {
              return this.input.value;
            },
            set: function set(value) {
              return this._setValue(value);
            }
          }
        });
        return SelectField;
      }.call(this);

      exports.default = SelectField;
      return module.exports;
    },
    34: function _(require, module, exports) {
      exports.REGEX_LEN_VAL = /^\d+(?:[a-z]|\%)+$/i;
      exports.REGEX_DIGITS = /\d+$/;
      exports.REGEX_SPACE = /\s/;
      exports.REGEX_KEBAB = /([A-Z])+/g;
      exports.IMPORTANT = 'important';
      exports.POSSIBLE_PREFIXES = ['webkit', 'moz', 'ms', 'o'];
      exports.REQUIRES_UNIT_VALUE = ['background-position-x', 'background-position-y', 'block-size', 'border-width', 'columnRule-width', 'cx', 'cy', 'font-size', 'grid-column-gap', 'grid-row-gap', 'height', 'inline-size', 'line-height', 'minBlock-size', 'min-height', 'min-inline-size', 'min-width', 'max-height', 'max-width', 'outline-offset', 'outline-width', 'perspective', 'shape-margin', 'stroke-dashoffset', 'stroke-width', 'text-indent', 'width', 'word-spacing', 'top', 'bottom', 'left', 'right', 'x', 'y'];
      exports.QUAD_SHORTHANDS = ['margin', 'padding', 'border', 'border-radius'];
      exports.DIRECTIONS = ['top', 'bottom', 'left', 'right'];
      exports.QUAD_SHORTHANDS.forEach(function (property) {
        var direction, i, len, ref;
        exports.REQUIRES_UNIT_VALUE.push(property);
        ref = exports.DIRECTIONS;

        for (i = 0, len = ref.length; i < len; i++) {
          direction = ref[i];
          exports.REQUIRES_UNIT_VALUE.push(property + '-' + direction);
        }
      });
      return module.exports;
    },
    35: function _(require, module, exports) {
      var constants, helpers, sampleStyle, styleConfig;
      constants = require(34);
      sampleStyle = document.createElement('div').style;
      helpers = exports;

      helpers.includes = function (target, item) {
        return target && target.indexOf(item) !== -1;
      };

      helpers.isIterable = function (target) {
        return target && _typeof(target) === 'object' && typeof target.length === 'number' && !target.nodeType;
      };

      helpers.toKebabCase = function (string) {
        return string.replace(constants.REGEX_KEBAB, function (e, letter) {
          return "-".concat(letter.toLowerCase());
        });
      };

      helpers.isPropSupported = function (property) {
        return typeof sampleStyle[property] !== 'undefined';
      };

      helpers.isValueSupported = function (property, value) {
        if (window.CSS && window.CSS.supports) {
          return window.CSS.supports(property, value);
        } else {
          sampleStyle[property] = value;
          return sampleStyle[property] === '' + value;
        }
      };

      helpers.getPrefix = function (property, skipInitialCheck) {
        var j, len1, prefix, ref;

        if (skipInitialCheck || !helpers.isPropSupported(property)) {
          ref = constants.POSSIBLE_PREFIXES;

          for (j = 0, len1 = ref.length; j < len1; j++) {
            prefix = ref[j];

            if (helpers.isPropSupported("-".concat(prefix, "-").concat(property))) {
              return "-".concat(prefix, "-");
            }
          }
        }

        return '';
      };

      helpers.normalizeProperty = function (property) {
        property = helpers.toKebabCase(property);

        if (helpers.isPropSupported(property)) {
          return property;
        } else {
          return "".concat(helpers.getPrefix(property, true)).concat(property);
        }
      };

      helpers.normalizeValue = function (property, value) {
        if (helpers.includes(constants.REQUIRES_UNIT_VALUE, property) && value !== null) {
          value = '' + value;

          if (constants.REGEX_DIGITS.test(value) && !constants.REGEX_LEN_VAL.test(value) && !constants.REGEX_SPACE.test(value)) {
            value += property === 'line-height' ? 'em' : 'px';
          }
        }

        return value;
      };

      helpers.sort = function (array) {
        var great, i, len, less, pivot;

        if (array.length < 2) {
          return array;
        } else {
          pivot = array[0];
          less = [];
          great = [];
          len = array.length;
          i = 0;

          while (++i !== len) {
            if (array[i] <= pivot) {
              less.push(array[i]);
            } else {
              great.push(array[i]);
            }
          }

          return helpers.sort(less).concat(pivot, helpers.sort(great));
        }
      };

      helpers.hash = function (string) {
        var hash, i, length;
        hash = 5381;
        i = -1;
        length = string.length;

        while (++i !== string.length) {
          hash = (hash << 5) - hash + string.charCodeAt(i);
          hash |= 0;
        }

        return '_' + (hash < 0 ? hash * -2 : hash);
      };

      helpers.ruleToString = function (rule, important) {
        var j, len1, output, prop, property, props, value;
        output = '';
        props = helpers.sort(Object.keys(rule));

        for (j = 0, len1 = props.length; j < len1; j++) {
          prop = props[j];

          if (typeof rule[prop] === 'string' || typeof rule[prop] === 'number') {
            property = helpers.normalizeProperty(prop);
            value = helpers.normalizeValue(property, rule[prop]);

            if (important) {
              value += " !important";
            }

            output += "".concat(property, ":").concat(value, ";");
          }
        }

        return output;
      };

      helpers.inlineStyleConfig = styleConfig = Object.create(null);

      helpers.inlineStyle = function (rule, valueToStore, level) {
        var config, styleEl;

        if (!(config = styleConfig[level])) {
          styleEl = document.createElement('style');
          styleEl.id = "quickcss".concat(level || '');
          document.head.appendChild(styleEl);
          styleConfig[level] = config = {
            el: styleEl,
            content: '',
            cache: Object.create(null)
          };
        }

        if (!config.cache[rule]) {
          config.cache[rule] = valueToStore || true;
          config.el.textContent = config.content += rule;
        }
      };

      helpers.clearInlineStyle = function (level) {
        var config, j, key, keys, len1;

        if (config = styleConfig[level]) {
          if (!config.content) {
            return;
          }

          config.el.textContent = config.content = '';
          keys = Object.keys(config.cache);

          for (j = 0, len1 = keys.length; j < len1; j++) {
            key = keys[j];
            config.cache[key] = null;
          }
        }
      };

      return module.exports;
    },
    37: function _(require, module, exports) {
      var Checks, availSets;
      availSets = {
        natives: require(53),
        dom: require(54)
      };

      Checks =
      /*#__PURE__*/
      function () {
        _createClass(Checks, [{
          key: "create",
          value: function create() {
            var args;

            if (arguments.length) {
              args = Array.prototype.slice.call(arguments);
            }

            return new Checks(args);
          }
        }]);

        function Checks(sets) {
          _classCallCheck(this, Checks);

          var i, len, set;

          if (sets == null) {
            sets = ['natives'];
          }

          for (i = 0, len = sets.length; i < len; i++) {
            set = sets[i];

            if (availSets[set]) {
              this.load(availSets[set]);
            }
          }
        }

        _createClass(Checks, [{
          key: "load",
          value: function load(set) {
            var key, value;

            if (availSets.natives.string(set)) {
              set = availSets[set];
            }

            if (!availSets.natives.objectPlain(set)) {
              return;
            }

            for (key in set) {
              value = set[key];
              this[key] = value;
            }
          }
        }]);

        return Checks;
      }();

      module.exports = Checks.prototype.create();
      return module.exports;
    },
    50: function _(require, module, exports) {
      var process = require(56);

      var formatRegExp = /%[sdj%]/g;

      exports.format = function (f) {
        if (!isString(f)) {
          var objects = [];

          for (var i = 0; i < arguments.length; i++) {
            objects.push(inspect(arguments[i]));
          }

          return objects.join(' ');
        }

        var i = 1;
        var args = arguments;
        var len = args.length;
        var str = String(f).replace(formatRegExp, function (x) {
          if (x === '%%') return '%';
          if (i >= len) return x;

          switch (x) {
            case '%s':
              return String(args[i++]);

            case '%d':
              return Number(args[i++]);

            case '%j':
              try {
                return JSON.stringify(args[i++]);
              } catch (_) {
                return '[Circular]';
              }

            default:
              return x;
          }
        });

        for (var x = args[i]; i < len; x = args[++i]) {
          if (isNull(x) || !isObject(x)) {
            str += ' ' + x;
          } else {
            str += ' ' + inspect(x);
          }
        }

        return str;
      };

      exports.deprecate = function (fn, msg) {
        if (isUndefined(global.process)) {
          return function () {
            return exports.deprecate(fn, msg).apply(this, arguments);
          };
        }

        if (process.noDeprecation === true) {
          return fn;
        }

        var warned = false;

        function deprecated() {
          if (!warned) {
            if (process.throwDeprecation) {
              throw new Error(msg);
            } else if (process.traceDeprecation) {
              console.trace(msg);
            } else {
              console.error(msg);
            }

            warned = true;
          }

          return fn.apply(this, arguments);
        }

        return deprecated;
      };

      var debugs = {};
      var debugEnviron;

      exports.debuglog = function (set) {
        if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
        set = set.toUpperCase();

        if (!debugs[set]) {
          if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
            var pid = process.pid;

            debugs[set] = function () {
              var msg = exports.format.apply(exports, arguments);
              console.error('%s %d: %s', set, pid, msg);
            };
          } else {
            debugs[set] = function () {};
          }
        }

        return debugs[set];
      };

      function inspect(obj, opts) {
        var ctx = {
          seen: [],
          stylize: stylizeNoColor
        };
        if (arguments.length >= 3) ctx.depth = arguments[2];
        if (arguments.length >= 4) ctx.colors = arguments[3];

        if (isBoolean(opts)) {
          ctx.showHidden = opts;
        } else if (opts) {
          exports._extend(ctx, opts);
        }

        if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
        if (isUndefined(ctx.depth)) ctx.depth = 2;
        if (isUndefined(ctx.colors)) ctx.colors = false;
        if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
        if (ctx.colors) ctx.stylize = stylizeWithColor;
        return formatValue(ctx, obj, ctx.depth);
      }

      exports.inspect = inspect;
      inspect.colors = {
        'bold': [1, 22],
        'italic': [3, 23],
        'underline': [4, 24],
        'inverse': [7, 27],
        'white': [37, 39],
        'grey': [90, 39],
        'black': [30, 39],
        'blue': [34, 39],
        'cyan': [36, 39],
        'green': [32, 39],
        'magenta': [35, 39],
        'red': [31, 39],
        'yellow': [33, 39]
      };
      inspect.styles = {
        'special': 'cyan',
        'number': 'yellow',
        'boolean': 'yellow',
        'undefined': 'grey',
        'null': 'bold',
        'string': 'green',
        'date': 'magenta',
        'regexp': 'red'
      };

      function stylizeWithColor(str, styleType) {
        var style = inspect.styles[styleType];

        if (style) {
          return "\x1B[" + inspect.colors[style][0] + 'm' + str + "\x1B[" + inspect.colors[style][1] + 'm';
        } else {
          return str;
        }
      }

      function stylizeNoColor(str, styleType) {
        return str;
      }

      function arrayToHash(array) {
        var hash = {};
        array.forEach(function (val, idx) {
          hash[val] = true;
        });
        return hash;
      }

      function formatValue(ctx, value, recurseTimes) {
        if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
          var ret = value.inspect(recurseTimes, ctx);

          if (!isString(ret)) {
            ret = formatValue(ctx, ret, recurseTimes);
          }

          return ret;
        }

        var primitive = formatPrimitive(ctx, value);

        if (primitive) {
          return primitive;
        }

        var keys = Object.keys(value);
        var visibleKeys = arrayToHash(keys);

        if (ctx.showHidden) {
          keys = Object.getOwnPropertyNames(value);
        }

        if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
          return formatError(value);
        }

        if (keys.length === 0) {
          if (isFunction(value)) {
            var name = value.name ? ': ' + value.name : '';
            return ctx.stylize('[Function' + name + ']', 'special');
          }

          if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
          }

          if (isDate(value)) {
            return ctx.stylize(Date.prototype.toString.call(value), 'date');
          }

          if (isError(value)) {
            return formatError(value);
          }
        }

        var base = '',
            array = false,
            braces = ['{', '}'];

        if (isArray(value)) {
          array = true;
          braces = ['[', ']'];
        }

        if (isFunction(value)) {
          var n = value.name ? ': ' + value.name : '';
          base = ' [Function' + n + ']';
        }

        if (isRegExp(value)) {
          base = ' ' + RegExp.prototype.toString.call(value);
        }

        if (isDate(value)) {
          base = ' ' + Date.prototype.toUTCString.call(value);
        }

        if (isError(value)) {
          base = ' ' + formatError(value);
        }

        if (keys.length === 0 && (!array || value.length == 0)) {
          return braces[0] + base + braces[1];
        }

        if (recurseTimes < 0) {
          if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
          } else {
            return ctx.stylize('[Object]', 'special');
          }
        }

        ctx.seen.push(value);
        var output;

        if (array) {
          output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
        } else {
          output = keys.map(function (key) {
            return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
          });
        }

        ctx.seen.pop();
        return reduceToSingleString(output, base, braces);
      }

      function formatPrimitive(ctx, value) {
        if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');

        if (isString(value)) {
          var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
          return ctx.stylize(simple, 'string');
        }

        if (isNumber(value)) return ctx.stylize('' + value, 'number');
        if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
        if (isNull(value)) return ctx.stylize('null', 'null');
      }

      function formatError(value) {
        return '[' + Error.prototype.toString.call(value) + ']';
      }

      function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
        var output = [];

        for (var i = 0, l = value.length; i < l; ++i) {
          if (hasOwnProperty(value, String(i))) {
            output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
          } else {
            output.push('');
          }
        }

        keys.forEach(function (key) {
          if (!key.match(/^\d+$/)) {
            output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
          }
        });
        return output;
      }

      function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
        var name, str, desc;
        desc = Object.getOwnPropertyDescriptor(value, key) || {
          value: value[key]
        };

        if (desc.get) {
          if (desc.set) {
            str = ctx.stylize('[Getter/Setter]', 'special');
          } else {
            str = ctx.stylize('[Getter]', 'special');
          }
        } else {
          if (desc.set) {
            str = ctx.stylize('[Setter]', 'special');
          }
        }

        if (!hasOwnProperty(visibleKeys, key)) {
          name = '[' + key + ']';
        }

        if (!str) {
          if (ctx.seen.indexOf(desc.value) < 0) {
            if (isNull(recurseTimes)) {
              str = formatValue(ctx, desc.value, null);
            } else {
              str = formatValue(ctx, desc.value, recurseTimes - 1);
            }

            if (str.indexOf('\n') > -1) {
              if (array) {
                str = str.split('\n').map(function (line) {
                  return '  ' + line;
                }).join('\n').substr(2);
              } else {
                str = '\n' + str.split('\n').map(function (line) {
                  return '   ' + line;
                }).join('\n');
              }
            }
          } else {
            str = ctx.stylize('[Circular]', 'special');
          }
        }

        if (isUndefined(name)) {
          if (array && key.match(/^\d+$/)) {
            return str;
          }

          name = JSON.stringify('' + key);

          if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
            name = name.substr(1, name.length - 2);
            name = ctx.stylize(name, 'name');
          } else {
            name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
            name = ctx.stylize(name, 'string');
          }
        }

        return name + ': ' + str;
      }

      function reduceToSingleString(output, base, braces) {
        var numLinesEst = 0;
        var length = output.reduce(function (prev, cur) {
          numLinesEst++;
          if (cur.indexOf('\n') >= 0) numLinesEst++;
          return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
        }, 0);

        if (length > 60) {
          return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
        }

        return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
      }

      function isArray(ar) {
        return Array.isArray(ar);
      }

      exports.isArray = isArray;

      function isBoolean(arg) {
        return typeof arg === 'boolean';
      }

      exports.isBoolean = isBoolean;

      function isNull(arg) {
        return arg === null;
      }

      exports.isNull = isNull;

      function isNullOrUndefined(arg) {
        return arg == null;
      }

      exports.isNullOrUndefined = isNullOrUndefined;

      function isNumber(arg) {
        return typeof arg === 'number';
      }

      exports.isNumber = isNumber;

      function isString(arg) {
        return typeof arg === 'string';
      }

      exports.isString = isString;

      function isSymbol(arg) {
        return _typeof(arg) === 'symbol';
      }

      exports.isSymbol = isSymbol;

      function isUndefined(arg) {
        return arg === void 0;
      }

      exports.isUndefined = isUndefined;

      function isRegExp(re) {
        return isObject(re) && objectToString(re) === '[object RegExp]';
      }

      exports.isRegExp = isRegExp;

      function isObject(arg) {
        return _typeof(arg) === 'object' && arg !== null;
      }

      exports.isObject = isObject;

      function isDate(d) {
        return isObject(d) && objectToString(d) === '[object Date]';
      }

      exports.isDate = isDate;

      function isError(e) {
        return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
      }

      exports.isError = isError;

      function isFunction(arg) {
        return typeof arg === 'function';
      }

      exports.isFunction = isFunction;

      function isPrimitive(arg) {
        return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || _typeof(arg) === 'symbol' || typeof arg === 'undefined';
      }

      exports.isPrimitive = isPrimitive;
      exports.isBuffer = require(57);

      function objectToString(o) {
        return Object.prototype.toString.call(o);
      }

      function pad(n) {
        return n < 10 ? '0' + n.toString(10) : n.toString(10);
      }

      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      function timestamp() {
        var d = new Date();
        var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
        return [d.getDate(), months[d.getMonth()], time].join(' ');
      }

      exports.log = function () {
        console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
      };

      exports.inherits = require(58);

      exports._extend = function (origin, add) {
        if (!add || !isObject(add)) return origin;
        var keys = Object.keys(add);
        var i = keys.length;

        while (i--) {
          origin[keys[i]] = add[keys[i]];
        }

        return origin;
      };

      function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }

      return module.exports;
    },
    51: function _(require, module, exports) {
      'use strict';

      module.exports = function isArrayish(obj) {
        if (!obj) {
          return false;
        }

        return obj instanceof Array || Array.isArray(obj) || obj.length >= 0 && obj.splice instanceof Function;
      };

      return module.exports;
    },
    52: function _(require, module, exports) {
      var __index8 = require(6),
          DOM = __index8;

      var SVG = require(59);

      var __template4 = require(12);

      var button = exports.button = __template4.button.extend(['div', {
        computers: {
          _init: function _init() {
            return this.applyData({
              text: "Add ".concat(this.related.settings.itemLabel)
            });
          }
        }
      }]);

      var arrow = exports.arrow = DOM.template(['div', {
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
          backgroundImage: "url(".concat(SVG.arrowDown, ")"),
          opacity: 0.5
        }
      }]);
      var fake = exports.fake = DOM.template(['div', {
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
      var input = exports.input = DOM.template(['select', {
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
          _init: function _init() {
            return DOM.option({
              props: {
                value: ''
              }
            }, "Select ".concat(this.related.settings.tagLabel)).appendTo(this);
          }
        },
        methods: {
          label: {
            get: function get() {
              var ref, selected;
              selected = this.raw.selectedIndex || 0;
              return (ref = this.raw.options[selected]) != null ? ref.label : void 0;
            }
          },
          value: {
            get: function get() {
              return this.raw.value;
            },
            set: function set(value) {
              return this.raw.value = value;
            }
          }
        }
      }]);
      var field = exports.field = DOM.template(['div', {
        ref: 'selectField',
        style: {
          position: 'relative',
          minWidth: 230,
          height: '55px',
          borderBottom: '1px solid #ddd'
        }
      }, arrow, fake, input]);
      return module.exports;
    },
    53: function _(require, module, exports) {
      var exports;
      module.exports = exports = {
        defined: function defined(subject) {
          return subject !== void 0;
        },
        array: function array(subject) {
          return subject instanceof Array;
        },
        object: function object(subject) {
          return _typeof(subject) === 'object' && subject;
        },
        objectPlain: function objectPlain(subject) {
          return exports.object(subject) && Object.prototype.toString.call(subject) === '[object Object]' && subject.constructor === Object;
        },
        string: function string(subject) {
          return typeof subject === 'string';
        },
        number: function number(subject) {
          return typeof subject === 'number' && !isNaN(subject);
        },
        numberLoose: function numberLoose(subject) {
          return exports.number(subject) || exports.string(subject) && exports.number(Number(subject));
        },
        function: function _function(subject) {
          return typeof subject === 'function';
        },
        iterable: function iterable(subject) {
          return exports.object(subject) && exports.number(subject.length);
        }
      };
      return module.exports;
    },
    54: function _(require, module, exports) {
      var exports;
      module.exports = exports = {
        domDoc: function domDoc(subject) {
          return subject && subject.nodeType === 9;
        },
        domEl: function domEl(subject) {
          return subject && subject.nodeType === 1;
        },
        domText: function domText(subject) {
          return subject && subject.nodeType === 3;
        },
        domNode: function domNode(subject) {
          return exports.domEl(subject) || exports.domText(subject);
        },
        domTextarea: function domTextarea(subject) {
          return subject && subject.nodeName === 'TEXTAREA';
        },
        domInput: function domInput(subject) {
          return subject && subject.nodeName === 'INPUT';
        },
        domSelect: function domSelect(subject) {
          return subject && subject.nodeName === 'SELECT';
        },
        domField: function domField(subject) {
          return exports.domInput(subject) || exports.domTextarea(subject) || exports.domSelect(subject);
        }
      };
      return module.exports;
    },
    55: function _(require, module, exports) {
      var StateChain;

      module.exports = StateChain =
      /*#__PURE__*/
      function () {
        function StateChain(states) {
          _classCallCheck(this, StateChain);

          this.string = states.join('+');
          this.array = states.slice();
          this.length = states.length;
        }

        _createClass(StateChain, [{
          key: "includes",
          value: function includes(target) {
            var i, len, ref, state;
            ref = this.array;

            for (i = 0, len = ref.length; i < len; i++) {
              state = ref[i];

              if (state === target) {
                return true;
              }
            }

            return false;
          }
        }, {
          key: "without",
          value: function without(target) {
            return this.array.filter(function (state) {
              return state !== target;
            }).join('+');
          }
        }, {
          key: "isApplicable",
          value: function isApplicable(target, otherActive) {
            var active;
            active = this.array.filter(function (state) {
              return state === target || otherActive.indexOf(state) !== -1;
            });
            return active.length === this.array.length;
          }
        }]);

        return StateChain;
      }();

      return module.exports;
    },
    56: function _(require, module, exports) {
      var process = module.exports = {};
      var cachedSetTimeout;
      var cachedClearTimeout;

      function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
      }

      function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
      }

      (function () {
        try {
          if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }

        try {
          if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();

      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          return setTimeout(fun, 0);
        }

        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }

        try {
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e) {
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }

      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          return clearTimeout(marker);
        }

        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }

        try {
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            return cachedClearTimeout.call(null, marker);
          } catch (e) {
            return cachedClearTimeout.call(this, marker);
          }
        }
      }

      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;

      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }

        draining = false;

        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }

        if (queue.length) {
          drainQueue();
        }
      }

      function drainQueue() {
        if (draining) {
          return;
        }

        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
        var len = queue.length;

        while (len) {
          currentQueue = queue;
          queue = [];

          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }

          queueIndex = -1;
          len = queue.length;
        }

        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }

      process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);

        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }

        queue.push(new Item(fun, args));

        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };

      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }

      Item.prototype.run = function () {
        this.fun.apply(null, this.array);
      };

      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = '';
      process.versions = {};

      function noop() {}

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.prependListener = noop;
      process.prependOnceListener = noop;

      process.listeners = function (name) {
        return [];
      };

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };

      process.cwd = function () {
        return '/';
      };

      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };

      process.umask = function () {
        return 0;
      };

      return module.exports;
    },
    57: function _(require, module, exports) {
      module.exports = function isBuffer(arg) {
        return arg && _typeof(arg) === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
      };

      return module.exports;
    },
    58: function _(require, module, exports) {
      if (typeof Object.create === 'function') {
        module.exports = function inherits(ctor, superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        };
      } else {
        module.exports = function inherits(ctor, superCtor) {
          ctor.super_ = superCtor;

          var TempCtor = function TempCtor() {};

          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        };
      }

      return module.exports;
    },
    59: function _(require, module, exports) {
      exports.arrowDown = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMwOS4xNTYgMzA5LjE1NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzA5LjE1NiAzMDkuMTU2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPGc+CgkJPHBvbHlnb24gcG9pbnRzPSIyODguNDYxLDY0LjkyOSAxNTQuNTg5LDIwMi43NjYgMjAuNzIzLDY0Ljk0IDAsODUuMDcgMTU0LjU4OSwyNDQuMjI4IDMwOS4xNTYsODUuMDcgICAiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K";
      return module.exports;
    }
  }, this);

  if (typeof define === 'function' && define.umd) {
    define(function () {
      return require(0);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module.exports) {
    module.exports = require(0);
  } else {
    return this['TagList'] = require(0);
  }
}).call(this, null, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : this);
