(function (require, global) {
require = (function (cache, modules, cx) {
return function (r) {
if (!modules[r]) throw new Error(r + ' is not a module');
return cache[r] ? cache[r].exports : ((cache[r] = {
exports: {}
}, cache[r].exports = modules[r].call(cx, require, cache[r], cache[r].exports)));
};
})({}, {
0: function (require, module, exports) {
var __1 = require(1), TagList = __1.default;;

var __2 = require(2), Popup_ = __2.default;;

var __3 = require(3), Tag_ = __3.default;;

exports.default = TagList;

var Popup = Popup_;
exports.Popup = Popup; 

var Tag = Tag_;
exports.Tag = Tag; 

var version = import "3.0.0"ts.version = version; 

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxDQUFLLFdBQUwsRUFBaUIsU0FBakI7O0FBQ0EsSUFBQSxDQUFLLFNBQUwsRUFBZSxRQUFmOztBQUNBLElBQUEsQ0FBSyxPQUFMLEVBQWEsTUFBYjs7QUFFQSxPQUFBLFFBQWU7O0FBQ2YsT0FBQSxJQUFPLEtBQVAsR0FBZTs7QUFDZixPQUFBLElBQU8sR0FBUCxHQUFhOztBQUNiLE9BQUEsSUFBTyxPQUFQLEdBQWlCLElBQUEsQ0FBSywyQkFBTCIsInNvdXJjZXNDb250ZW50IjpbIl8kc20oJy4vdGFnbGlzdCcsJ1RhZ0xpc3QnICAgIClcbl8kc20oJy4vcG9wdXAnLCdQb3B1cF8nICAgIClcbl8kc20oJy4vdGFnJywnVGFnXycgICAgKVxuXG5leHBvcnQgZGVmYXVsdCBUYWdMaXN0XG5leHBvcnQgUG9wdXAgPSBQb3B1cF9cbmV4cG9ydCBUYWcgPSBUYWdfXG5leHBvcnQgdmVyc2lvbiA9IF8kc20oJy4uL3BhY2thZ2UuanNvbiAkIHZlcnNpb24nICkiXX0=
;
return module.exports;
},
1: function (require, module, exports) {
var TagList,
  extend1 = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

var __5 = require(5), extend = __5.default;;

var __6 = require(6), DOM = __6.default;;

var __7 = require(7), defaults = __7.default;;

var __8 = require(8), template = __8.default;;

var __32 = require(3), Tag = __32.default, BufferTag = __32.BufferTag;;

var __22 = require(2), Popup = __22.default;;

var __9 = require(9), toArray = __9.toArray;;

TagList = (function(superClass) {
  extend1(TagList, superClass);

  function TagList(targetContainer, options, settings) {
    var i, len, option, ref;
    this.targetContainer = targetContainer;
    this.options = options != null ? options : [];
    TagList.__super__.constructor.apply(this, arguments);
    this.settings = extend.deepOnly('button').clone(defaults, settings);
    this.settings.boundingEl = DOM(this.settings.boundingEl);
    this.settings.defaults = toArray(this.settings.defaults || []);
    this.tags = [];
    this.el = template.spawn(null, {
      relatedInstance: this
    });
    this.buffer = new BufferTag(this);
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

  TagList.prototype._attachBindings = function() {
    this.buffer.on('change', (function(_this) {
      return function(option, value) {
        _this.add(option, value);
        return _this._notifyChange();
      };
    })(this));
    this.buffer.popup.on('beforeopen', (function(_this) {
      return function() {
        return _this.closeAllPopups();
      };
    })(this));
    this.on('change', (function(_this) {
      return function() {
        return _this.buffer._updateSelectable();
      };
    })(this));
    if (this.settings.onChange) {
      return this.on('change', this.settings.onChange);
    }
  };

  TagList.prototype._applyDefaults = function(defaults) {
    var i, len, name, option, ref, value;
    defaults = toArray(defaults);
    for (i = 0, len = defaults.length; i < len; i++) {
      ref = defaults[i], name = ref.name, value = ref.value;
      if (!(value)) {
        continue;
      }
      option = this._findOption(name);
      if (typeof value === 'function') {
        value = value();
      }
      this.add(option, value);
    }
  };

  TagList.prototype._notifyChange = function(SILENT) {
    if (!SILENT) {
      return this.emit('change', this.getValues(true));
    }
  };

  TagList.prototype._findOption = function(name, collection) {
    if (collection == null) {
      collection = this.options;
    }
    return collection.find(function(option) {
      return option.name === name;
    });
  };

  TagList.prototype._findTag = function(name, collection) {
    if (collection == null) {
      collection = this.tags;
    }
    return collection.find(function(tag) {
      return tag.name === name;
    });
  };

  TagList.prototype._findDefault = function(name) {
    return this.settings.defaults.find(function(default_) {
      return default_.name === name;
    });
  };

  TagList.prototype.addOption = function(option) {
    if (!this._findOption(option.name)) {
      return this.options.push(option);
    }
  };

  TagList.prototype.add = function(option, value) {
    var tag;
    if (typeof option === 'string') {
      option = this._findOption(option);
    }
    tag = new Tag(option, this.settings);
    tag.insertBefore(this.els.addButton);
    if (value != null) {
      tag.set(value, true);
    }
    tag.once('remove', (function(_this) {
      return function() {
        return _this.remove(tag);
      };
    })(this));
    tag.on('change', (function(_this) {
      return function() {
        return _this._notifyChange();
      };
    })(this));
    tag.popup.on('beforeopen', (function(_this) {
      return function() {
        return _this.closeAllPopups();
      };
    })(this));
    return this.tags.push(tag);
  };

  TagList.prototype.remove = function(tag, SILENT) {
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
  };

  TagList.prototype.removeAll = function(SILENT) {
    var i, len, ref, tag;
    ref = this.tags.slice();
    for (i = 0, len = ref.length; i < len; i++) {
      tag = ref[i];
      this.remove(tag, true);
    }
    this._notifyChange(SILENT);
  };

  TagList.prototype.setValues = function(values, SILENT) {
    var i, index, len, name, ref, ref1, value;
    ref = toArray(values);
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      ref1 = ref[index], name = ref1.name, value = ref1.value;
      this.setValue(name, value, true, index);
    }
    return this._notifyChange(SILENT);
  };

  TagList.prototype.setValue = function(name, value, SILENT, fromIndex) {
    var collection, existing;
    collection = fromIndex ? this.tags.slice(fromIndex) : this.tags;
    existing = this._findTag(name, collection);
    if (existing) {
      existing.set(value, true);
    } else if (this._findOption(name)) {
      this.add(name, value);
    }
    return this._notifyChange(SILENT);
  };

  TagList.prototype.replaceValues = function(values, SILENT) {
    this.removeAll(true);
    this.setValues(values, true);
    return this._notifyChange(SILENT);
  };

  TagList.prototype.getValues = function() {
    return this.tags.map(function(tag) {
      return {
        name: tag.name,
        value: tag.value
      };
    });
  };

  TagList.prototype.closeAllPopups = function() {
    var i, len, ref, tag;
    this.buffer.popup.close();
    ref = this.tags;
    for (i = 0, len = ref.length; i < len; i++) {
      tag = ref[i];
      tag.popup.close();
    }
  };

  TagList.prototype.destroy = function() {
    this.closeAllPopups();
    this.el.remove();
    this.emit('destroy');
  };

  Object.defineProperties(TagList.prototype, {
    'els': {
      get: function() {
        return this.el.child;
      }
    },
    'tagsByName': {
      get: function() {
        var tags;
        tags = this.tags;
        return new function() {
          var i, len, tag;
          for (i = 0, len = tags.length; i < len; i++) {
            tag = tags[i];
            this[tag.name] = tag;
          }
          return this;
        };
      }
    }
  });

  return TagList;

})(require(10));

exports.default = TagList;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2luZGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiX2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLE9BQUE7RUFBQTs7O0FBQUEsSUFBQSxDQUFLLGNBQUwsRUFBb0IsUUFBcEI7O0FBQ0EsSUFBQSxDQUFLLFVBQUwsRUFBZ0IsS0FBaEI7O0FBQ0EsSUFBQSxDQUFLLFlBQUwsRUFBa0IsVUFBbEI7O0FBQ0EsSUFBQSxDQUFLLFlBQUwsRUFBa0IsVUFBbEI7O0FBQ0EsSUFBQSxDQUFLLFFBQUwsRUFBYyxrQkFBZDs7QUFDQSxJQUFBLENBQUssVUFBTCxFQUFnQixPQUFoQjs7QUFDQSxJQUFBLENBQUssWUFBTCxFQUFrQixXQUFsQjs7QUFFTTs7O0VBQ1EsaUJBQUMsZUFBRCxFQUFtQixPQUFuQixFQUFnQyxRQUFoQztBQUNaLFFBQUE7SUFEYSxJQUFDLENBQUEsa0JBQUQ7SUFBa0IsSUFBQyxDQUFBLDRCQUFELFVBQVM7SUFDeEMsMENBQUEsU0FBQTtJQUNBLElBQUMsQ0FBQSxRQUFELEdBQVksTUFBTSxDQUFDLFFBQVAsQ0FBZ0IsUUFBaEIsQ0FBeUIsQ0FBQyxLQUExQixDQUFnQyxRQUFoQyxFQUEwQyxRQUExQztJQUNaLElBQUMsQ0FBQSxRQUFRLENBQUMsVUFBVixHQUF1QixHQUFBLENBQUksSUFBQyxDQUFBLFFBQVEsQ0FBQyxVQUFkO0lBQ3ZCLElBQUMsQ0FBQSxRQUFRLENBQUMsUUFBVixHQUFxQixPQUFBLENBQVEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxRQUFWLElBQXNCLEVBQTlCO0lBQ3JCLElBQUMsQ0FBQSxJQUFELEdBQVE7SUFDUixJQUFDLENBQUEsRUFBRCxHQUFNLFFBQVEsQ0FBQyxLQUFULENBQWUsSUFBZixFQUFxQjtNQUFBLGVBQUEsRUFBZ0IsSUFBaEI7S0FBckI7SUFDTixJQUFDLENBQUEsTUFBRCxHQUFVLElBQUksU0FBSixDQUFjLElBQWQ7QUFDVjtBQUFBLFNBQUEscUNBQUE7OztR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R0FBTyxJQUFDLENBQUE7ZUFDUixJQUFJLFNBQUE7QUFBSyxjQUFBO0FBQUEsZUFBQSxzQ0FBQTs7WUFBQSxJQUFFLENBQUEsR0FBRyxDQUFDLElBQUosQ0FBRixHQUFjO0FBQWQ7aUJBQW1DO1FBQXhDO01BRmMsQ0FBTDtLQURkO0dBREQ7Ozs7R0FwSXFCLE9BQUEsQ0FBUSxZQUFSOztBQTRJdEIsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiXyRzbSgnc21hcnQtZXh0ZW5kJywnZXh0ZW5kJyAgICApXG5fJHNtKCdxdWlja2RvbScsJ0RPTScgICAgKVxuXyRzbSgnLi9kZWZhdWx0cycsJ2RlZmF1bHRzJyAgICApXG5fJHNtKCcuL3RlbXBsYXRlJywndGVtcGxhdGUnICAgIClcbl8kc20oJy4uL3RhZycsJ1RhZywge0J1ZmZlclRhZ30nICAgIClcbl8kc20oJy4uL3BvcHVwJywnUG9wdXAnICAgIClcbl8kc20oJy4uL2hlbHBlcnMnLCd7dG9BcnJheX0nICAgIClcblxuY2xhc3MgVGFnTGlzdCBleHRlbmRzIHJlcXVpcmUoJ2V2ZW50LWxpdGUnKVxuXHRjb25zdHJ1Y3RvcjogKEB0YXJnZXRDb250YWluZXIsIEBvcHRpb25zPVtdLCBzZXR0aW5ncyktPlxuXHRcdHN1cGVyXG5cdFx0QHNldHRpbmdzID0gZXh0ZW5kLmRlZXBPbmx5KCdidXR0b24nKS5jbG9uZShkZWZhdWx0cywgc2V0dGluZ3MpXG5cdFx0QHNldHRpbmdzLmJvdW5kaW5nRWwgPSBET00oQHNldHRpbmdzLmJvdW5kaW5nRWwpXG5cdFx0QHNldHRpbmdzLmRlZmF1bHRzID0gdG9BcnJheShAc2V0dGluZ3MuZGVmYXVsdHMgb3IgW10pXG5cdFx0QHRhZ3MgPSBbXVxuXHRcdEBlbCA9IHRlbXBsYXRlLnNwYXduKG51bGwsIHJlbGF0ZWRJbnN0YW5jZTpAKVxuXHRcdEBidWZmZXIgPSBuZXcgQnVmZmVyVGFnKEApXG5cdFx0b3B0aW9uLm5hbWUgPz0gb3B0aW9uLmxhYmVsIGZvciBvcHRpb24gaW4gQG9wdGlvbnNcblx0XHRcblx0XHRAX2FwcGx5RGVmYXVsdHMoQHNldHRpbmdzLmRlZmF1bHRzKVxuXHRcdEBfYXR0YWNoQmluZGluZ3MoKVxuXHRcdEBlbC5hcHBlbmRUbyhAdGFyZ2V0Q29udGFpbmVyKVxuXHRcdEBidWZmZXIuX3VwZGF0ZVNlbGVjdGFibGUoKVxuXG5cblx0X2F0dGFjaEJpbmRpbmdzOiAoKS0+XG5cdFx0QGJ1ZmZlci5vbiAnY2hhbmdlJywgKG9wdGlvbiwgdmFsdWUpPT5cblx0XHRcdEBhZGQob3B0aW9uLCB2YWx1ZSlcblx0XHRcdEBfbm90aWZ5Q2hhbmdlKClcblx0XHRcblx0XHRAYnVmZmVyLnBvcHVwLm9uICdiZWZvcmVvcGVuJywgKCk9PlxuXHRcdFx0QGNsb3NlQWxsUG9wdXBzKClcblx0XHRcblx0XHRAb24gJ2NoYW5nZScsICgpPT5cblx0XHRcdEBidWZmZXIuX3VwZGF0ZVNlbGVjdGFibGUoKVxuXG5cdFx0aWYgQHNldHRpbmdzLm9uQ2hhbmdlXG5cdFx0XHRAb24gJ2NoYW5nZScsIEBzZXR0aW5ncy5vbkNoYW5nZVxuXG5cdFxuXHRfYXBwbHlEZWZhdWx0czogKGRlZmF1bHRzKS0+XG5cdFx0ZGVmYXVsdHMgPSB0b0FycmF5KGRlZmF1bHRzKVxuXG5cdFx0Zm9yIHtuYW1lLCB2YWx1ZX0gaW4gZGVmYXVsdHMgd2hlbiB2YWx1ZVxuXHRcdFx0b3B0aW9uID0gQF9maW5kT3B0aW9uKG5hbWUpXG5cdFx0XHR2YWx1ZSA9IHZhbHVlKCkgaWYgdHlwZW9mIHZhbHVlIGlzICdmdW5jdGlvbidcblx0XHRcdEBhZGQob3B0aW9uLCB2YWx1ZSlcblx0XHRyZXR1cm5cblxuXHRfbm90aWZ5Q2hhbmdlOiAoU0lMRU5UKS0+IHVubGVzcyBTSUxFTlRcblx0XHRAZW1pdCAnY2hhbmdlJywgQGdldFZhbHVlcyh0cnVlKVxuXG5cdF9maW5kT3B0aW9uOiAobmFtZSwgY29sbGVjdGlvbj1Ab3B0aW9ucyktPlxuXHRcdHJldHVybiBjb2xsZWN0aW9uLmZpbmQgKG9wdGlvbiktPiBvcHRpb24ubmFtZSBpcyBuYW1lXG5cdFxuXHRfZmluZFRhZzogKG5hbWUsIGNvbGxlY3Rpb249QHRhZ3MpLT5cblx0XHRyZXR1cm4gY29sbGVjdGlvbi5maW5kICh0YWcpLT4gdGFnLm5hbWUgaXMgbmFtZVxuXHRcblx0X2ZpbmREZWZhdWx0OiAobmFtZSktPlxuXHRcdHJldHVybiBAc2V0dGluZ3MuZGVmYXVsdHMuZmluZCAoZGVmYXVsdF8pLT4gZGVmYXVsdF8ubmFtZSBpcyBuYW1lXG5cblx0YWRkT3B0aW9uOiAob3B0aW9uKS0+XG5cdFx0dW5sZXNzIEBfZmluZE9wdGlvbihvcHRpb24ubmFtZSlcblx0XHRcdEBvcHRpb25zLnB1c2gob3B0aW9uKVxuXG5cdGFkZDogKG9wdGlvbiwgdmFsdWUpLT5cblx0XHRvcHRpb24gPSBAX2ZpbmRPcHRpb24ob3B0aW9uKSBpZiB0eXBlb2Ygb3B0aW9uIGlzICdzdHJpbmcnXG5cdFx0dGFnID0gbmV3IFRhZyhvcHRpb24sIEBzZXR0aW5ncylcblxuXHRcdHRhZy5pbnNlcnRCZWZvcmUgQGVscy5hZGRCdXR0b25cblx0XHR0YWcuc2V0KHZhbHVlLCB0cnVlKSBpZiB2YWx1ZT9cblx0XHR0YWcub25jZSAncmVtb3ZlJywgKCk9PiBAcmVtb3ZlKHRhZylcblx0XHR0YWcub24gJ2NoYW5nZScsICgpPT4gQF9ub3RpZnlDaGFuZ2UoKVxuXHRcdHRhZy5wb3B1cC5vbiAnYmVmb3Jlb3BlbicsICgpPT4gQGNsb3NlQWxsUG9wdXBzKClcblx0XHRcblx0XHRAdGFncy5wdXNoKHRhZylcblxuXHRyZW1vdmU6ICh0YWcsIFNJTEVOVCktPlxuXHRcdHRhZyA9IEB0YWdzQnlOYW1lW3RhZ10gaWYgdHlwZW9mIHRhZyBpcyAnc3RyaW5nJ1xuXHRcdHRhZy5wb3B1cC5jbG9zZSgpXG5cdFx0dGFnSW5kZXggPSBAdGFncy5pbmRleE9mKHRhZylcblxuXHRcdGlmIEBzZXR0aW5ncy5yZXF1aXJlRGVmYXVsdHMgYW5kIEBfZmluZERlZmF1bHQodGFnLm5hbWUpXG5cdFx0XHR0YWcuc2V0KEBfZmluZERlZmF1bHQodGFnLm5hbWUpLCB0cnVlKVxuXHRcdFx0QHRhZ3Muc3BsaWNlIHRhZ0luZGV4LCAxLCB0YWdcblx0XHRlbHNlXG5cdFx0XHR0YWcuZWwucmVtb3ZlKClcblx0XHRcdEB0YWdzLnNwbGljZSB0YWdJbmRleCwgMVxuXG5cdFx0QF9ub3RpZnlDaGFuZ2UoU0lMRU5UKVxuXHRcdHJldHVyblxuXG5cdHJlbW92ZUFsbDogKFNJTEVOVCktPlxuXHRcdEByZW1vdmUodGFnLCB0cnVlKSBmb3IgdGFnIGluIEB0YWdzLnNsaWNlKClcblx0XHRAX25vdGlmeUNoYW5nZShTSUxFTlQpXG5cdFx0cmV0dXJuXG5cblx0c2V0VmFsdWVzOiAodmFsdWVzLCBTSUxFTlQpLT5cdFx0XG5cdFx0Zm9yIHtuYW1lLHZhbHVlfSxpbmRleCBpbiB0b0FycmF5KHZhbHVlcylcblx0XHRcdEBzZXRWYWx1ZShuYW1lLCB2YWx1ZSwgdHJ1ZSwgaW5kZXgpXG5cdFx0XG5cdFx0QF9ub3RpZnlDaGFuZ2UoU0lMRU5UKVxuXG5cdHNldFZhbHVlOiAobmFtZSwgdmFsdWUsIFNJTEVOVCwgZnJvbUluZGV4KS0+XG5cdFx0Y29sbGVjdGlvbiA9IGlmIGZyb21JbmRleCB0aGVuIEB0YWdzLnNsaWNlKGZyb21JbmRleCkgZWxzZSBAdGFnc1xuXHRcdGV4aXN0aW5nID0gQF9maW5kVGFnKG5hbWUsIGNvbGxlY3Rpb24pXG5cdFx0XG5cdFx0aWYgZXhpc3Rpbmdcblx0XHRcdGV4aXN0aW5nLnNldCh2YWx1ZSwgdHJ1ZSlcblx0XHRcblx0XHRlbHNlIGlmIEBfZmluZE9wdGlvbihuYW1lKVxuXHRcdFx0QGFkZChuYW1lLCB2YWx1ZSlcblxuXHRcdEBfbm90aWZ5Q2hhbmdlKFNJTEVOVClcblxuXHRyZXBsYWNlVmFsdWVzOiAodmFsdWVzLCBTSUxFTlQpLT5cblx0XHRAcmVtb3ZlQWxsKHRydWUpXG5cdFx0QHNldFZhbHVlcyh2YWx1ZXMsIHRydWUpXG5cdFx0QF9ub3RpZnlDaGFuZ2UoU0lMRU5UKVxuXG5cdGdldFZhbHVlczogKCktPlxuXHRcdEB0YWdzLm1hcCAodGFnKS0+XG5cdFx0XHRuYW1lOiB0YWcubmFtZVxuXHRcdFx0dmFsdWU6IHRhZy52YWx1ZVxuXG5cblx0Y2xvc2VBbGxQb3B1cHM6ICgpLT5cblx0XHRAYnVmZmVyLnBvcHVwLmNsb3NlKClcblx0XHR0YWcucG9wdXAuY2xvc2UoKSBmb3IgdGFnIGluIEB0YWdzXG5cdFx0cmV0dXJuXG5cblx0ZGVzdHJveTogKCktPlxuXHRcdEBjbG9zZUFsbFBvcHVwcygpXG5cdFx0QGVsLnJlbW92ZSgpXG5cdFx0QGVtaXQgJ2Rlc3Ryb3knXG5cdFx0cmV0dXJuXG5cdFxuXG5cblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyBAOjosXG5cdFx0J2Vscyc6IGdldDogKCktPiBAZWwuY2hpbGRcblx0XHQndGFnc0J5TmFtZSc6IGdldDogKCktPlxuXHRcdFx0dGFncyA9IEB0YWdzXG5cdFx0XHRuZXcgKCktPiBAW3RhZy5uYW1lXSA9IHRhZyBmb3IgdGFnIGluIHRhZ3M7IEBcblxuXG5cbmV4cG9ydCBkZWZhdWx0IFRhZ0xpc3QiXX0=
;
return module.exports;
},
2: function (require, module, exports) {
var Popup,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

var __11 = require(11), Popper = __11.default;;

var __12 = require(12), template = __12.default;;

var __62 = require(6), DOM = __62.default;;

Popup = (function(superClass) {
  extend(Popup, superClass);

  function Popup(parent, settings, boundingEl) {
    this.parent = parent;
    this.settings = settings;
    Popup.__super__.constructor.call(this);
    this.state = {
      open: false
    };
    this.el = template.spawn(null, {
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

  Popup.prototype._attachOuterClickListener = function() {
    return DOM(document).on('click.outerClick', (function(_this) {
      return function(event) {
        var targetParents;
        targetParents = DOM(event.target).parents;
        if (!targetParents.includes(_this.parent)) {
          _this.close();
          return _this.emit('blur');
        }
      };
    })(this));
  };

  Popup.prototype._detachOuterClickListener = function() {
    return DOM(document).off('click.outerClick');
  };

  Popup.prototype.open = function() {
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
  };

  Popup.prototype.close = function() {
    if (!this.state.open) {
      return;
    }
    this.emit('beforeclose');
    this.state.open = false;
    this.el.hide();
    this._detachOuterClickListener();
    this.emit('close');
    return this;
  };

  Popup.prototype.setContent = function(content) {
    this.els.content.empty();
    if (content) {
      return this.els.content.append(content);
    }
  };

  Object.defineProperties(Popup.prototype, {
    'els': {
      get: function() {
        return this.el.child;
      }
    }
  });

  return Popup;

})(require(10));

exports.default = Popup;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2luZGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiX2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLEtBQUE7RUFBQTs7O0FBQUEsSUFBQSxDQUFLLFdBQUwsRUFBaUIsUUFBakI7O0FBQ0EsSUFBQSxDQUFLLFlBQUwsRUFBa0IsVUFBbEI7O0FBQ0EsSUFBQSxDQUFLLFVBQUwsRUFBZ0IsS0FBaEI7O0FBRU07OztFQUNRLGVBQUMsTUFBRCxFQUFVLFFBQVYsRUFBcUIsVUFBckI7SUFBQyxJQUFDLENBQUEsU0FBRDtJQUFTLElBQUMsQ0FBQSxXQUFEO0lBQ3RCLHFDQUFBO0lBQ0EsSUFBQyxDQUFBLEtBQUQsR0FBUztNQUFBLElBQUEsRUFBSyxLQUFMOztJQUNULElBQUMsQ0FBQSxFQUFELEdBQU0sUUFBUSxDQUFDLEtBQVQsQ0FBZSxJQUFmLEVBQXFCO01BQUMsZUFBQSxFQUFnQixJQUFqQjtLQUFyQjtJQUVOLElBQUMsQ0FBQSxFQUFFLENBQUMsSUFBSixDQUFBLENBQVUsQ0FBQyxRQUFYLENBQW9CLElBQUMsQ0FBQSxNQUFyQjtJQUNBLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBSSxNQUFKLENBQVcsSUFBQyxDQUFBLE1BQU8sQ0FBQSxDQUFBLENBQW5CLEVBQXVCLElBQUMsQ0FBQSxFQUFHLENBQUEsQ0FBQSxDQUEzQixFQUNUO01BQUEsU0FBQSxFQUFXLFFBQVg7TUFDQSxPQUFBLEVBQVMsUUFEVDtNQUVBLFNBQUEsRUFDQztRQUFBLE1BQUEsRUFDQztVQUFBLE9BQUEsRUFBUyxJQUFUO1VBQ0EsTUFBQSxFQUFRLEtBRFI7U0FERDtRQUdBLGVBQUEsRUFDQztVQUFBLE9BQUEsRUFBUyxJQUFUO1VBQ0EsZ0JBQUEsRUFBa0IsVUFBVyxDQUFBLENBQUEsQ0FBWCxJQUFpQixVQURuQztTQUpEO09BSEQ7S0FEUztFQU5FOztrQkFpQmIseUJBQUEsR0FBMkIsU0FBQTtXQUMxQixHQUFBLENBQUksUUFBSixDQUFhLENBQUMsRUFBZCxDQUFpQixrQkFBakIsRUFBcUMsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLEtBQUQ7QUFDcEMsWUFBQTtRQUFBLGFBQUEsR0FBZ0IsR0FBQSxDQUFJLEtBQUssQ0FBQyxNQUFWLENBQWlCLENBQUM7UUFDbEMsSUFBRyxDQUFJLGFBQWEsQ0FBQyxRQUFkLENBQXVCLEtBQUMsQ0FBQSxNQUF4QixDQUFQO1VBQ0MsS0FBQyxDQUFBLEtBQUQsQ0FBQTtpQkFDQSxLQUFDLENBQUEsSUFBRCxDQUFNLE1BQU4sRUFGRDs7TUFGb0M7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXJDO0VBRDBCOztrQkFPM0IseUJBQUEsR0FBMkIsU0FBQTtXQUMxQixHQUFBLENBQUksUUFBSixDQUFhLENBQUMsR0FBZCxDQUFrQixrQkFBbEI7RUFEMEI7O2tCQUkzQixJQUFBLEdBQU0sU0FBQTtJQUNMLElBQVUsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFqQjtBQUFBLGFBQUE7O0lBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxZQUFOO0lBQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLEdBQWM7SUFDZCxJQUFDLENBQUEsRUFBRSxDQUFDLElBQUosQ0FBQTtJQUNBLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBUixDQUFBO0lBQ0EsSUFBQyxDQUFBLHlCQUFELENBQUE7SUFDQSxJQUFDLENBQUEsSUFBRCxDQUFNLE1BQU47QUFDQSxXQUFPO0VBUkY7O2tCQVVOLEtBQUEsR0FBTyxTQUFBO0lBQ04sSUFBVSxDQUFJLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBckI7QUFBQSxhQUFBOztJQUNBLElBQUMsQ0FBQSxJQUFELENBQU0sYUFBTjtJQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxHQUFjO0lBQ2QsSUFBQyxDQUFBLEVBQUUsQ0FBQyxJQUFKLENBQUE7SUFDQSxJQUFDLENBQUEseUJBQUQsQ0FBQTtJQUNBLElBQUMsQ0FBQSxJQUFELENBQU0sT0FBTjtBQUNBLFdBQU87RUFQRDs7a0JBU1AsVUFBQSxHQUFZLFNBQUMsT0FBRDtJQUNYLElBQUMsQ0FBQSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQWIsQ0FBQTtJQUNBLElBQStCLE9BQS9CO2FBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBYixDQUFvQixPQUFwQixFQUFBOztFQUZXOztFQU1aLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixLQUFDLENBQUEsU0FBekIsRUFDQztJQUFBLEtBQUEsRUFBTztNQUFBLEdBQUEsRUFBSyxTQUFBO2VBQUssSUFBQyxDQUFBLEVBQUUsQ0FBQztNQUFULENBQUw7S0FBUDtHQUREOzs7O0dBdERtQixPQUFBLENBQVEsWUFBUjs7QUEyRHBCLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbIl8kc20oJ3BvcHBlci5qcycsJ1BvcHBlcicgICAgKVxuXyRzbSgnLi90ZW1wbGF0ZScsJ3RlbXBsYXRlJyAgICApXG5fJHNtKCdxdWlja2RvbScsJ0RPTScgICAgKVxuXG5jbGFzcyBQb3B1cCBleHRlbmRzIHJlcXVpcmUoJ2V2ZW50LWxpdGUnKVxuXHRjb25zdHJ1Y3RvcjogKEBwYXJlbnQsIEBzZXR0aW5ncywgYm91bmRpbmdFbCktPlxuXHRcdHN1cGVyKClcblx0XHRAc3RhdGUgPSBvcGVuOmZhbHNlXG5cdFx0QGVsID0gdGVtcGxhdGUuc3Bhd24obnVsbCwge3JlbGF0ZWRJbnN0YW5jZTpAfSlcblxuXHRcdEBlbC5oaWRlKCkuYXBwZW5kVG8oQHBhcmVudClcblx0XHRAcG9wcGVyID0gbmV3IFBvcHBlciBAcGFyZW50WzBdLCBAZWxbMF0sXG5cdFx0XHRwbGFjZW1lbnQ6ICdib3R0b20nXG5cdFx0XHR0cmlnZ2VyOiAnbWFudWFsJ1xuXHRcdFx0bW9kaWZpZXJzOlxuXHRcdFx0XHRvZmZzZXQ6XG5cdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZVxuXHRcdFx0XHRcdG9mZnNldDogJzVweCdcblx0XHRcdFx0cHJldmVudE92ZXJmbG93OlxuXHRcdFx0XHRcdGVuYWJsZWQ6IHRydWVcblx0XHRcdFx0XHRib3VuZHJpZXNFbGVtZW50OiBib3VuZGluZ0VsWzBdIG9yIGJvdW5kaW5nRWxcblxuXHRfYXR0YWNoT3V0ZXJDbGlja0xpc3RlbmVyOiAoKS0+XG5cdFx0RE9NKGRvY3VtZW50KS5vbiAnY2xpY2sub3V0ZXJDbGljaycsIChldmVudCk9PlxuXHRcdFx0dGFyZ2V0UGFyZW50cyA9IERPTShldmVudC50YXJnZXQpLnBhcmVudHNcblx0XHRcdGlmIG5vdCB0YXJnZXRQYXJlbnRzLmluY2x1ZGVzKEBwYXJlbnQpXG5cdFx0XHRcdEBjbG9zZSgpXG5cdFx0XHRcdEBlbWl0ICdibHVyJ1xuXG5cdF9kZXRhY2hPdXRlckNsaWNrTGlzdGVuZXI6ICgpLT5cblx0XHRET00oZG9jdW1lbnQpLm9mZiAnY2xpY2sub3V0ZXJDbGljaydcblxuXG5cdG9wZW46ICgpLT5cblx0XHRyZXR1cm4gaWYgQHN0YXRlLm9wZW5cblx0XHRAZW1pdCAnYmVmb3Jlb3Blbidcblx0XHRAc3RhdGUub3BlbiA9IHRydWVcblx0XHRAZWwuc2hvdygpXG5cdFx0QHBvcHBlci51cGRhdGUoKVxuXHRcdEBfYXR0YWNoT3V0ZXJDbGlja0xpc3RlbmVyKClcblx0XHRAZW1pdCAnb3Blbidcblx0XHRyZXR1cm4gQFxuXG5cdGNsb3NlOiAoKS0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAc3RhdGUub3BlblxuXHRcdEBlbWl0ICdiZWZvcmVjbG9zZSdcblx0XHRAc3RhdGUub3BlbiA9IGZhbHNlXG5cdFx0QGVsLmhpZGUoKVxuXHRcdEBfZGV0YWNoT3V0ZXJDbGlja0xpc3RlbmVyKClcblx0XHRAZW1pdCAnY2xvc2UnXG5cdFx0cmV0dXJuIEBcblxuXHRzZXRDb250ZW50OiAoY29udGVudCktPlxuXHRcdEBlbHMuY29udGVudC5lbXB0eSgpXG5cdFx0QGVscy5jb250ZW50LmFwcGVuZCBjb250ZW50IGlmIGNvbnRlbnRcblxuXG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMgQDo6LFxuXHRcdCdlbHMnOiBnZXQ6ICgpLT4gQGVsLmNoaWxkXG5cblxuXG5leHBvcnQgZGVmYXVsdCBQb3B1cCJdfQ==
;
return module.exports;
},
3: function (require, module, exports) {
var Tag,
  extend1 = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

var __63 = require(6), DOM = __63.default;;

var __52 = require(5), extend = __52.default;;

var __23 = require(2), Popup = __23.default;;

var __13 = require(13), stringify = __13.default;;

var __14 = require(14), updater = __14.default;;

var __15 = require(15), template = __15.default, content = __15.content, button = __15.button;;

var defaults = require(16);

var __17 = require(17), ValidationError = __17.ValidationError;;

Tag = (function(superClass) {
  extend1(Tag, superClass);

  function Tag(option, listSettings) {
    var settings1, settings2;
    Tag.__super__.constructor.call(this);
    settings1 = extend.keys(['button', 'fontFamily']).clone(listSettings);
    settings2 = extend.keys(['padding', 'maxWidth']).clone(option);
    this.settings = extend.clone(defaults.settings, listSettings.tag, settings1, settings2);
    this.option = extend.clone(defaults.option, option);
    this.option.popup = extend.clone(listSettings.popup, this.option.popup);
    this.state = {};
    this.name = this.option.name;
    this.label = this.option.label;
    this.el = template.spawn(null, {
      relatedInstance: this
    });
    this.content = content.spawn(null, {
      relatedInstance: this
    });
    this.button = button.spawn({
      data: {
        text: 'Apply'
      }
    }, {
      relatedInstance: this
    });
    this.popup = new Popup(this.el, listSettings, listSettings.boundingEl);
    this.popup.setContent(this.content);
    if (this.settings.updateWhen === 'applied') {
      this.button.insertAfter(this.content);
    }
    this._setup();
    this._attachBindings();
  }

  Tag.prototype._setup = function() {
    if (this.option.hideLabel) {
      return this.els.label.hide();
    } else {
      return this.els.label.html = this.option.label + ": ";
    }
  };

  Tag.prototype._attachBindings = function() {
    this.els.removeButton.on('click', (function(_this) {
      return function(event) {
        _this.emit('remove');
        return event.stopPropagation();
      };
    })(this));
    this.el.on('click', (function(_this) {
      return function() {
        return _this.popup.open();
      };
    })(this));
    this.button.on('click', (function(_this) {
      return function(e) {
        e.stopPropagation();
        if (_this._applyChanges()) {
          return _this.popup.close();
        }
      };
    })(this));
    if (this.settings.updateWhen === 'applied') {
      this.popup.on('open', (function(_this) {
        return function() {
          var base;
          return (base = _this.state).valueOnFocus != null ? base.valueOnFocus : base.valueOnFocus = _this.value;
        };
      })(this));
      return this.popup.on('blur', (function(_this) {
        return function() {
          if (_this.value !== _this.state.valueOnFocus) {
            if (!_this._applyChanges()) {
              console.log('opening');
              return _this.popup.open();
            }
          }
        };
      })(this));
    }
  };

  Tag.prototype._initField = function() {
    this.field = this.option.field.call(this, this.content.raw, updater(this));
    if (this.option["default"]) {
      return this.set(this.option["default"], true);
    }
  };

  Tag.prototype._domInsert = function(method, target) {
    this.el[method](target);
    this._initField();
    return this;
  };

  Tag.prototype._notifyChange = function() {
    return this.emit('change', this.value);
  };

  Tag.prototype._updateText = function(value) {
    return this.els.value.text = stringify(value, this.option.formatter);
  };

  Tag.prototype._updateFromUser = function(value, SILENT) {
    this._updateText(value);
    this.option.setter.call(this, value);
    if (!SILENT) {
      return this._notifyChange();
    }
  };

  Tag.prototype._updateFromField = function(value) {
    this._updateText(value);
    if (this.settings.updateWhen !== 'applied') {
      return this._notifyChange();
    }
  };

  Tag.prototype._applyChanges = function() {
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
  };

  Tag.prototype.get = function(skipTransform) {
    var value;
    value = this.option.getter.call(this);
    if (this.option.transformOutput && !skipTransform) {
      value = this.option.transformOutput(value);
    }
    return value;
  };

  Tag.prototype.set = function(value, SILENT) {
    if (typeof value === 'function') {
      value = value();
    }
    if (this.option.transformInput) {
      value = this.option.transformInput(value);
    }
    return this._updateFromUser(value, SILENT);
  };

  Tag.prototype.validate = function() {
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
  };

  Tag.prototype.appendTo = function(target) {
    return this._domInsert('appendTo', target);
  };

  Tag.prototype.prependTo = function(target) {
    return this._domInsert('prependTo', target);
  };

  Tag.prototype.insertBefore = function(target) {
    return this._domInsert('insertBefore', target);
  };

  Tag.prototype.insertAfter = function(target) {
    return this._domInsert('insertAfter', target);
  };

  Object.defineProperties(Tag.prototype, {
    els: {
      get: function() {
        return this.el.child;
      }
    },
    value: {
      get: function() {
        return this.get();
      }
    },
    rawValue: {
      get: function() {
        return this.get(true);
      }
    }
  });

  return Tag;

})(require(10));

exports.default = Tag;

var BufferTag = import './buffer';
exports.BufferTag = BufferTag; sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2luZGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiX2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLEdBQUE7RUFBQTs7O0FBQUEsSUFBQSxDQUFLLFVBQUwsRUFBZ0IsS0FBaEI7O0FBQ0EsSUFBQSxDQUFLLGNBQUwsRUFBb0IsUUFBcEI7O0FBQ0EsSUFBQSxDQUFLLFVBQUwsRUFBZ0IsT0FBaEI7O0FBQ0EsSUFBQSxDQUFLLGFBQUwsRUFBbUIsV0FBbkI7O0FBQ0EsSUFBQSxDQUFLLFdBQUwsRUFBaUIsU0FBakI7O0FBQ0EsSUFBQSxDQUFLLFlBQUwsRUFBa0IsNkJBQWxCOztBQUNBLElBQUEsQ0FBSyxZQUFMLEVBQWtCLGVBQWxCOztBQUNBLElBQUEsQ0FBSyxXQUFMLEVBQWlCLG1CQUFqQjs7QUFHTTs7O0VBQ1EsYUFBQyxNQUFELEVBQVMsWUFBVDtBQUNaLFFBQUE7SUFBQSxtQ0FBQTtJQUNBLFNBQUEsR0FBWSxNQUFNLENBQUMsSUFBUCxDQUFZLENBQUMsUUFBRCxFQUFVLFlBQVYsQ0FBWixDQUFvQyxDQUFDLEtBQXJDLENBQTJDLFlBQTNDO0lBQ1osU0FBQSxHQUFZLE1BQU0sQ0FBQyxJQUFQLENBQVksQ0FBQyxTQUFELEVBQVksVUFBWixDQUFaLENBQW9DLENBQUMsS0FBckMsQ0FBMkMsTUFBM0M7SUFDWixJQUFDLENBQUEsUUFBRCxHQUFZLE1BQU0sQ0FBQyxLQUFQLENBQWEsUUFBUSxDQUFDLFFBQXRCLEVBQWdDLFlBQVksQ0FBQyxHQUE3QyxFQUFrRCxTQUFsRCxFQUE2RCxTQUE3RDtJQUNaLElBQUMsQ0FBQSxNQUFELEdBQVUsTUFBTSxDQUFDLEtBQVAsQ0FBYSxRQUFRLENBQUMsTUFBdEIsRUFBOEIsTUFBOUI7SUFDVixJQUFDLENBQUEsTUFBTSxDQUFDLEtBQVIsR0FBZ0IsTUFBTSxDQUFDLEtBQVAsQ0FBYSxZQUFZLENBQUMsS0FBMUIsRUFBaUMsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUF6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QztJQUFBLEdBQUEsRUFBSztNQUFBLEdBQUEsRUFBSyxTQUFBO2VBQUssSUFBQyxDQUFBLEVBQUUsQ0FBQztNQUFULENBQUw7S0FBTDtJQUNBLEtBQUEsRUFBTztNQUFBLEdBQUEsRUFBSyxTQUFBO2VBQUssSUFBQyxDQUFBLEdBQUQsQ0FBQTtNQUFMLENBQUw7S0FEUDtJQUVBLFFBQUEsRUFBVTtNQUFBLEdBQUEsRUFBSyxTQUFBO2VBQUssSUFBQyxDQUFBLEdBQUQsQ0FBSyxJQUFMO01BQUwsQ0FBTDtLQUZWO0dBREQ7Ozs7R0FqSGlCLE9BQUEsQ0FBUSxZQUFSOztBQTJIbEIsT0FBQSxRQUFlOztBQUNmLE9BQUEsSUFBTyxTQUFQLEdBQW1CLElBQUEsQ0FBSyxVQUFMIiwic291cmNlc0NvbnRlbnQiOlsiXyRzbSgncXVpY2tkb20nLCdET00nICAgIClcbl8kc20oJ3NtYXJ0LWV4dGVuZCcsJ2V4dGVuZCcgICAgKVxuXyRzbSgnLi4vcG9wdXAnLCdQb3B1cCcgICAgKVxuXyRzbSgnLi9zdHJpbmdpZnknLCdzdHJpbmdpZnknICAgIClcbl8kc20oJy4vdXBkYXRlcicsJ3VwZGF0ZXInICAgIClcbl8kc20oJy4vdGVtcGxhdGUnLCd0ZW1wbGF0ZSwge2NvbnRlbnQsIGJ1dHRvbn0nICAgIClcbl8kc20oJy4vZGVmYXVsdHMnLCcqIGFzIGRlZmF1bHRzJyAgICApXG5fJHNtKCcuLi9lcnJvcnMnLCd7VmFsaWRhdGlvbkVycm9yfScgICAgKVxuXG5cbmNsYXNzIFRhZyBleHRlbmRzIHJlcXVpcmUoJ2V2ZW50LWxpdGUnKVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbiwgbGlzdFNldHRpbmdzKS0+XG5cdFx0c3VwZXIoKVxuXHRcdHNldHRpbmdzMSA9IGV4dGVuZC5rZXlzKFsnYnV0dG9uJywnZm9udEZhbWlseSddKS5jbG9uZShsaXN0U2V0dGluZ3MpXG5cdFx0c2V0dGluZ3MyID0gZXh0ZW5kLmtleXMoWydwYWRkaW5nJywgJ21heFdpZHRoJ10pLmNsb25lKG9wdGlvbilcblx0XHRAc2V0dGluZ3MgPSBleHRlbmQuY2xvbmUoZGVmYXVsdHMuc2V0dGluZ3MsIGxpc3RTZXR0aW5ncy50YWcsIHNldHRpbmdzMSwgc2V0dGluZ3MyKVxuXHRcdEBvcHRpb24gPSBleHRlbmQuY2xvbmUoZGVmYXVsdHMub3B0aW9uLCBvcHRpb24pXG5cdFx0QG9wdGlvbi5wb3B1cCA9IGV4dGVuZC5jbG9uZShsaXN0U2V0dGluZ3MucG9wdXAsIEBvcHRpb24ucG9wdXApXG5cdFx0QHN0YXRlID0ge31cblx0XHRAbmFtZSA9IEBvcHRpb24ubmFtZVxuXHRcdEBsYWJlbCA9IEBvcHRpb24ubGFiZWxcblx0XHRAZWwgPSB0ZW1wbGF0ZS5zcGF3bihudWxsLCByZWxhdGVkSW5zdGFuY2U6QClcblx0XHRAY29udGVudCA9IGNvbnRlbnQuc3Bhd24obnVsbCwgcmVsYXRlZEluc3RhbmNlOkApXG5cdFx0QGJ1dHRvbiA9IGJ1dHRvbi5zcGF3bih7ZGF0YTp0ZXh0OidBcHBseSd9LCByZWxhdGVkSW5zdGFuY2U6QClcblx0XHRAcG9wdXAgPSBuZXcgUG9wdXAoQGVsLCBsaXN0U2V0dGluZ3MsIGxpc3RTZXR0aW5ncy5ib3VuZGluZ0VsKVxuXHRcdEBwb3B1cC5zZXRDb250ZW50KEBjb250ZW50KVxuXHRcdEBidXR0b24uaW5zZXJ0QWZ0ZXIoQGNvbnRlbnQpIGlmIEBzZXR0aW5ncy51cGRhdGVXaGVuIGlzICdhcHBsaWVkJ1xuXG5cdFx0QF9zZXR1cCgpXG5cdFx0QF9hdHRhY2hCaW5kaW5ncygpXG5cdFxuXG5cdF9zZXR1cDogKCktPlxuXHRcdGlmIEBvcHRpb24uaGlkZUxhYmVsXG5cdFx0XHRAZWxzLmxhYmVsLmhpZGUoKVxuXHRcdGVsc2Vcblx0XHRcdEBlbHMubGFiZWwuaHRtbCA9IFwiI3tAb3B0aW9uLmxhYmVsfTogXCJcblxuXHRfYXR0YWNoQmluZGluZ3M6ICgpLT5cdFx0XG5cdFx0QGVscy5yZW1vdmVCdXR0b24ub24gJ2NsaWNrJywgKGV2ZW50KT0+XG5cdFx0XHRAZW1pdCAncmVtb3ZlJzsgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuXHRcdEBlbC5vbiAnY2xpY2snLCAoKT0+XG5cdFx0XHRAcG9wdXAub3BlbigpXG5cblx0XHRAYnV0dG9uLm9uICdjbGljaycsIChlKT0+XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0XHRAcG9wdXAuY2xvc2UoKSBpZiBAX2FwcGx5Q2hhbmdlcygpXG5cblx0XHRpZiBAc2V0dGluZ3MudXBkYXRlV2hlbiBpcyAnYXBwbGllZCdcblx0XHRcdEBwb3B1cC5vbiAnb3BlbicsICgpPT4gQHN0YXRlLnZhbHVlT25Gb2N1cyA/PSBAdmFsdWVcblx0XHRcdEBwb3B1cC5vbiAnYmx1cicsICgpPT4gaWYgQHZhbHVlIGlzbnQgQHN0YXRlLnZhbHVlT25Gb2N1c1xuXHRcdFx0XHRpZiBub3QgQF9hcHBseUNoYW5nZXMoKVxuXHRcdFx0XHRcdGNvbnNvbGUubG9nICdvcGVuaW5nJ1xuXHRcdFx0XHRcdEBwb3B1cC5vcGVuKClcblx0XG5cdF9pbml0RmllbGQ6ICgpLT5cblx0XHRAZmllbGQgPSBAb3B0aW9uLmZpZWxkLmNhbGwoQCwgQGNvbnRlbnQucmF3LCB1cGRhdGVyKEApKVxuXHRcdEBzZXQoQG9wdGlvbi5kZWZhdWx0LCB0cnVlKSBpZiBAb3B0aW9uLmRlZmF1bHRcblxuXHRfZG9tSW5zZXJ0OiAobWV0aG9kLCB0YXJnZXQpLT5cblx0XHRAZWxbbWV0aG9kXSh0YXJnZXQpXG5cdFx0QF9pbml0RmllbGQoKVxuXHRcdHJldHVybiBAXG5cblx0X25vdGlmeUNoYW5nZTogKCktPlxuXHRcdEBlbWl0ICdjaGFuZ2UnLCBAdmFsdWVcblxuXHRfdXBkYXRlVGV4dDogKHZhbHVlKS0+XG5cdFx0QGVscy52YWx1ZS50ZXh0ID0gc3RyaW5naWZ5KHZhbHVlLCBAb3B0aW9uLmZvcm1hdHRlcilcblxuXHRfdXBkYXRlRnJvbVVzZXI6ICh2YWx1ZSwgU0lMRU5UKS0+XG5cdFx0QF91cGRhdGVUZXh0KHZhbHVlKVxuXHRcdEBvcHRpb24uc2V0dGVyLmNhbGwoQCwgdmFsdWUpXG5cdFx0QF9ub3RpZnlDaGFuZ2UoKSB1bmxlc3MgU0lMRU5UXG5cblx0X3VwZGF0ZUZyb21GaWVsZDogKHZhbHVlKS0+XG5cdFx0QF91cGRhdGVUZXh0KHZhbHVlKVxuXHRcdEBfbm90aWZ5Q2hhbmdlKCkgdW5sZXNzIEBzZXR0aW5ncy51cGRhdGVXaGVuIGlzICdhcHBsaWVkJ1xuXG5cdF9hcHBseUNoYW5nZXM6ICgpLT5cblx0XHR2YWxpZGF0aW9uID0gQHZhbGlkYXRlKClcblx0XHRpZiB2YWxpZGF0aW9uIGlzIHRydWVcblx0XHRcdEBzdGF0ZS52YWx1ZU9uRm9jdXMgPSBudWxsXG5cdFx0XHRAX25vdGlmeUNoYW5nZSgpXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFxuXHRcdGVsc2UgaWYgdmFsaWRhdGlvbiBpbnN0YW5jZW9mIEVycm9yXG5cdFx0XHRAYnV0dG9uLmNoaWxkLmVycm9yTWVzc2FnZS5zZXQodmFsaWRhdGlvbi5tZXNzYWdlKVxuXHRcdFx0QGVtaXQgJ2Vycm9yJywgdmFsaWRhdGlvblxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cblx0Z2V0OiAoc2tpcFRyYW5zZm9ybSktPlxuXHRcdHZhbHVlID0gQG9wdGlvbi5nZXR0ZXIuY2FsbChAKVxuXHRcdHZhbHVlID0gQG9wdGlvbi50cmFuc2Zvcm1PdXRwdXQodmFsdWUpIGlmIEBvcHRpb24udHJhbnNmb3JtT3V0cHV0IGFuZCBub3Qgc2tpcFRyYW5zZm9ybVxuXHRcdHJldHVybiB2YWx1ZVxuXHRcblx0c2V0OiAodmFsdWUsIFNJTEVOVCktPlxuXHRcdHZhbHVlID0gdmFsdWUoKSBpZiB0eXBlb2YgdmFsdWUgaXMgJ2Z1bmN0aW9uJ1xuXHRcdHZhbHVlID0gQG9wdGlvbi50cmFuc2Zvcm1JbnB1dCh2YWx1ZSkgaWYgQG9wdGlvbi50cmFuc2Zvcm1JbnB1dFxuXHRcdEBfdXBkYXRlRnJvbVVzZXIodmFsdWUsIFNJTEVOVClcblxuXHR2YWxpZGF0ZTogKCktPlxuXHRcdHJldHVybiB0cnVlIGlmIG5vdCBAb3B0aW9uLnZhbGlkYXRlXG5cdFx0dHJ5XG5cdFx0XHRyZXN1bHQgPSBAb3B0aW9uLnZhbGlkYXRlLmNhbGwoQCwgQHZhbHVlKVxuXHRcdGNhdGNoIGVyclxuXHRcdFx0cmVzdWx0ID0gZXJyXG5cblx0XHRzd2l0Y2hcblx0XHRcdHdoZW4gcmVzdWx0IGlzIHRydWUgdGhlbiB0cnVlXG5cdFx0XHR3aGVuIHJlc3VsdCBpcyBmYWxzZSB0aGVuIG5ldyBWYWxpZGF0aW9uRXJyb3IoXCJ2YWxpZGF0aW9uIGZhaWxlZFwiKVxuXHRcdFx0d2hlbiB0eXBlb2YgcmVzdWx0IGlzICdzdHJpbmcnIHRoZW4gbmV3IFZhbGlkYXRpb25FcnJvcihyZXN1bHQpXG5cdFx0XHR3aGVuIHJlc3VsdCBpbnN0YW5jZW9mIEVycm9yIHRoZW4gcmVzdWx0XG5cblx0XG5cblx0YXBwZW5kVG86ICh0YXJnZXQpLT4gQF9kb21JbnNlcnQgJ2FwcGVuZFRvJywgdGFyZ2V0XG5cdHByZXBlbmRUbzogKHRhcmdldCktPiBAX2RvbUluc2VydCAncHJlcGVuZFRvJywgdGFyZ2V0XG5cdGluc2VydEJlZm9yZTogKHRhcmdldCktPiBAX2RvbUluc2VydCAnaW5zZXJ0QmVmb3JlJywgdGFyZ2V0XG5cdGluc2VydEFmdGVyOiAodGFyZ2V0KS0+IEBfZG9tSW5zZXJ0ICdpbnNlcnRBZnRlcicsIHRhcmdldFxuXHRcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyBAOjosXG5cdFx0ZWxzOiBnZXQ6ICgpLT4gQGVsLmNoaWxkXG5cdFx0dmFsdWU6IGdldDogKCktPiBAZ2V0KClcblx0XHRyYXdWYWx1ZTogZ2V0OiAoKS0+IEBnZXQodHJ1ZSlcblxuXG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IFRhZ1xuZXhwb3J0IEJ1ZmZlclRhZyA9IF8kc20oJy4vYnVmZmVyJyApIl19
;
return module.exports;
},
5: function (require, module, exports) {
var exports, extend, modifiers, newBuilder, normalizeKeys;

extend = require(19);

normalizeKeys = function(keys) {
  var i, key, len, output;
  if (keys) {
    output = {};
    if (typeof keys !== 'object') {
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

newBuilder = function(isBase) {
  var builder;
  builder = function(target) {
    var theTarget;
    var $_len = arguments.length, $_i = -1, sources = new Array($_len); while (++$_i < $_len) sources[$_i] = arguments[$_i];
    if (builder.options.target) {
      theTarget = builder.options.target;
    } else {
      theTarget = target;
      sources.shift();
    }
    return extend(builder.options, theTarget, sources);
  };
  if (isBase) {
    builder.isBase = true;
  }
  builder.options = {};
  Object.defineProperties(builder, modifiers);
  return builder;
};

modifiers = {
  'deep': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      _.options.deep = true;
      return _;
    }
  },
  'own': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      _.options.own = true;
      return _;
    }
  },
  'allowNull': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      _.options.allowNull = true;
      return _;
    }
  },
  'nullDeletes': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      _.options.nullDeletes = true;
      return _;
    }
  },
  'concat': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      _.options.concat = true;
      return _;
    }
  },
  'clone': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      _.options.target = {};
      return _;
    }
  },
  'notDeep': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      return function(keys) {
        _.options.notDeep = normalizeKeys(keys);
        return _;
      };
    }
  },
  'deepOnly': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      return function(keys) {
        _.options.deepOnly = normalizeKeys(keys);
        return _;
      };
    }
  },
  'keys': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      return function(keys) {
        _.options.keys = normalizeKeys(keys);
        return _;
      };
    }
  },
  'notKeys': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      return function(keys) {
        _.options.notKeys = normalizeKeys(keys);
        return _;
      };
    }
  },
  'transform': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      return function(transform) {
        if (typeof transform === 'function') {
          _.options.globalTransform = transform;
        } else if (transform && typeof transform === 'object') {
          _.options.transforms = transform;
        }
        return _;
      };
    }
  },
  'filter': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      return function(filter) {
        if (typeof filter === 'function') {
          _.options.globalFilter = filter;
        } else if (filter && typeof filter === 'object') {
          _.options.filters = filter;
        }
        return _;
      };
    }
  }
};

module.exports = exports = newBuilder(true);

exports.version = "1.7.3";

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLFVBQVI7O0FBRVQsYUFBQSxHQUFnQixTQUFDLElBQUQ7QUFBUyxNQUFBO0VBQUEsSUFBRyxJQUFIO0lBQ3hCLE1BQUEsR0FBUztJQUNULElBQUcsT0FBTyxJQUFQLEtBQWlCLFFBQXBCO01BQ0MsTUFBTyxDQUFBLElBQUEsQ0FBUCxHQUFlLEtBRGhCO0tBQUEsTUFBQTtNQUdDLElBQTRCLENBQUksS0FBSyxDQUFDLE9BQU4sQ0FBYyxJQUFkLENBQWhDO1FBQUEsSUFBQSxHQUFPLE1BQU0sQ0FBQyxJQUFQLENBQVksSUFBWixFQUFQOztBQUNBLFdBQUEsc0NBQUE7O1FBQUEsTUFBTyxDQUFBLEdBQUEsQ0FBUCxHQUFjO0FBQWQsT0FKRDs7QUFNQSxXQUFPLE9BUmlCOztBQUFUOztBQVdoQixVQUFBLEdBQWEsU0FBQyxNQUFEO0FBQ1osTUFBQTtFQUFBLE9BQUEsR0FBVSxTQUFDLE1BQUQ7QUFDVCxRQUFBO0lBQUEsZ0JBQUEsQ0FBaUIsT0FBakI7SUFDQSxJQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBbkI7TUFDQyxTQUFBLEdBQVksT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUQ3QjtLQUFBLE1BQUE7TUFHQyxTQUFBLEdBQVk7TUFDWixPQUFPLENBQUMsS0FBUixDQUFBLEVBSkQ7O1dBTUEsTUFBQSxDQUFPLE9BQU8sQ0FBQyxPQUFmLEVBQXdCLFNBQXhCLEVBQW1DLE9BQW5DO0VBUlM7RUFVVixJQUF5QixNQUF6QjtJQUFBLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLEtBQWpCOztFQUNBLE9BQU8sQ0FBQyxPQUFSLEdBQWtCO0VBQ2xCLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxTQUFqQztBQUNBLFNBQU87QUFkSzs7QUFpQmIsU0FBQSxHQUNDO0VB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O0FBQ3BCLGVBQU87TUFGRDtJQUZRLENBQUw7R0FoRFg7RUFzREEsV0FBQSxFQUFhO0lBQUEsR0FBQSxFQUFLLFNBQUE7QUFDakIsVUFBQTtNQUFBLENBQUEsR0FBTyxJQUFDLENBQUEsTUFBSixHQUFnQixVQUFBLENBQUEsQ0FBaEIsR0FBa0M7QUFDdEMsYUFBTyxTQUFDLFNBQUQ7UUFDTixJQUFHLE9BQU8sU0FBUCxLQUFvQixVQUF2QjtVQUNDLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBVixHQUE0QixVQUQ3QjtTQUFBLE1BRUssSUFBRyxTQUFBLElBQWMsT0FBTyxTQUFQLEtBQW9CLFFBQXJDO1VBQ0osQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFWLEdBQXVCLFVBRG5COztBQUdMLGVBQU87TUFORDtJQUZVLENBQUw7R0F0RGI7RUFpRUEsUUFBQSxFQUFVO0lBQUEsR0FBQSxFQUFLLFNBQUE7QUFDZCxVQUFBO01BQUEsQ0FBQSxHQUFPLElBQUMsQ0FBQSxNQUFKLEdBQWdCLFVBQUEsQ0FBQSxDQUFoQixHQUFrQztBQUN0QyxhQUFPLFNBQUMsTUFBRDtRQUNOLElBQUcsT0FBTyxNQUFQLEtBQWlCLFVBQXBCO1VBQ0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFWLEdBQXlCLE9BRDFCO1NBQUEsTUFFSyxJQUFHLE1BQUEsSUFBVyxPQUFPLE1BQVAsS0FBaUIsUUFBL0I7VUFDSixDQUFDLENBQUMsT0FBTyxDQUFDLE9BQVYsR0FBb0IsT0FEaEI7O0FBR0wsZUFBTztNQU5EO0lBRk8sQ0FBTDtHQWpFVjs7O0FBNkVELE1BQU0sQ0FBQyxPQUFQLEdBQWlCLE9BQUEsR0FBVSxVQUFBLENBQVcsSUFBWDs7QUFDM0IsT0FBTyxDQUFDLE9BQVIsR0FBa0IsSUFBQSxDQUFLLDJCQUFMIiwic291cmNlc0NvbnRlbnQiOlsiZXh0ZW5kID0gcmVxdWlyZSAnLi9leHRlbmQnXG5cbm5vcm1hbGl6ZUtleXMgPSAoa2V5cyktPiBpZiBrZXlzXG5cdG91dHB1dCA9IHt9XG5cdGlmIHR5cGVvZiBrZXlzIGlzbnQgJ29iamVjdCdcblx0XHRvdXRwdXRba2V5c10gPSB0cnVlXG5cdGVsc2Vcblx0XHRrZXlzID0gT2JqZWN0LmtleXMoa2V5cykgaWYgbm90IEFycmF5LmlzQXJyYXkoa2V5cylcblx0XHRvdXRwdXRba2V5XSA9IHRydWUgZm9yIGtleSBpbiBrZXlzXG5cblx0cmV0dXJuIG91dHB1dFxuXG5cbm5ld0J1aWxkZXIgPSAoaXNCYXNlKS0+XG5cdGJ1aWxkZXIgPSAodGFyZ2V0KS0+XG5cdFx0RVhQQU5EX0FSR1VNRU5UUyhzb3VyY2VzKVxuXHRcdGlmIGJ1aWxkZXIub3B0aW9ucy50YXJnZXRcblx0XHRcdHRoZVRhcmdldCA9IGJ1aWxkZXIub3B0aW9ucy50YXJnZXRcblx0XHRlbHNlXG5cdFx0XHR0aGVUYXJnZXQgPSB0YXJnZXRcblx0XHRcdHNvdXJjZXMuc2hpZnQoKVxuXHRcdFxuXHRcdGV4dGVuZChidWlsZGVyLm9wdGlvbnMsIHRoZVRhcmdldCwgc291cmNlcylcblx0XG5cdGJ1aWxkZXIuaXNCYXNlID0gdHJ1ZSBpZiBpc0Jhc2Vcblx0YnVpbGRlci5vcHRpb25zID0ge31cblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoYnVpbGRlciwgbW9kaWZpZXJzKVxuXHRyZXR1cm4gYnVpbGRlclxuXG5cbm1vZGlmaWVycyA9IFxuXHQnZGVlcCc6IGdldDogKCktPlxuXHRcdF8gPSBpZiBAaXNCYXNlIHRoZW4gbmV3QnVpbGRlcigpIGVsc2UgQFxuXHRcdF8ub3B0aW9ucy5kZWVwID0gdHJ1ZVxuXHRcdHJldHVybiBfXG5cblx0J293bic6IGdldDogKCktPlxuXHRcdF8gPSBpZiBAaXNCYXNlIHRoZW4gbmV3QnVpbGRlcigpIGVsc2UgQFxuXHRcdF8ub3B0aW9ucy5vd24gPSB0cnVlXG5cdFx0cmV0dXJuIF9cblxuXHQnYWxsb3dOdWxsJzogZ2V0OiAoKS0+XG5cdFx0XyA9IGlmIEBpc0Jhc2UgdGhlbiBuZXdCdWlsZGVyKCkgZWxzZSBAXG5cdFx0Xy5vcHRpb25zLmFsbG93TnVsbCA9IHRydWVcblx0XHRyZXR1cm4gX1xuXG5cdCdudWxsRGVsZXRlcyc6IGdldDogKCktPlxuXHRcdF8gPSBpZiBAaXNCYXNlIHRoZW4gbmV3QnVpbGRlcigpIGVsc2UgQFxuXHRcdF8ub3B0aW9ucy5udWxsRGVsZXRlcyA9IHRydWVcblx0XHRyZXR1cm4gX1xuXG5cdCdjb25jYXQnOiBnZXQ6ICgpLT5cblx0XHRfID0gaWYgQGlzQmFzZSB0aGVuIG5ld0J1aWxkZXIoKSBlbHNlIEBcblx0XHRfLm9wdGlvbnMuY29uY2F0ID0gdHJ1ZVxuXHRcdHJldHVybiBfXG5cblx0J2Nsb25lJzogZ2V0OiAoKS0+XG5cdFx0XyA9IGlmIEBpc0Jhc2UgdGhlbiBuZXdCdWlsZGVyKCkgZWxzZSBAXG5cdFx0Xy5vcHRpb25zLnRhcmdldCA9IHt9XG5cdFx0cmV0dXJuIF9cblxuXHQnbm90RGVlcCc6IGdldDogKCktPlxuXHRcdF8gPSBpZiBAaXNCYXNlIHRoZW4gbmV3QnVpbGRlcigpIGVsc2UgQFxuXHRcdHJldHVybiAoa2V5cyktPlxuXHRcdFx0Xy5vcHRpb25zLm5vdERlZXAgPSBub3JtYWxpemVLZXlzKGtleXMpXHRcdFx0XG5cdFx0XHRyZXR1cm4gX1xuXG5cdCdkZWVwT25seSc6IGdldDogKCktPlxuXHRcdF8gPSBpZiBAaXNCYXNlIHRoZW4gbmV3QnVpbGRlcigpIGVsc2UgQFxuXHRcdHJldHVybiAoa2V5cyktPlxuXHRcdFx0Xy5vcHRpb25zLmRlZXBPbmx5ID0gbm9ybWFsaXplS2V5cyhrZXlzKVx0XHRcdFxuXHRcdFx0cmV0dXJuIF9cblxuXHQna2V5cyc6IGdldDogKCktPlxuXHRcdF8gPSBpZiBAaXNCYXNlIHRoZW4gbmV3QnVpbGRlcigpIGVsc2UgQFxuXHRcdHJldHVybiAoa2V5cyktPlxuXHRcdFx0Xy5vcHRpb25zLmtleXMgPSBub3JtYWxpemVLZXlzKGtleXMpXHRcdFx0XG5cdFx0XHRyZXR1cm4gX1xuXG5cdCdub3RLZXlzJzogZ2V0OiAoKS0+XG5cdFx0XyA9IGlmIEBpc0Jhc2UgdGhlbiBuZXdCdWlsZGVyKCkgZWxzZSBAXG5cdFx0cmV0dXJuIChrZXlzKS0+XG5cdFx0XHRfLm9wdGlvbnMubm90S2V5cyA9IG5vcm1hbGl6ZUtleXMoa2V5cylcdFx0XHRcblx0XHRcdHJldHVybiBfXG5cblx0J3RyYW5zZm9ybSc6IGdldDogKCktPlxuXHRcdF8gPSBpZiBAaXNCYXNlIHRoZW4gbmV3QnVpbGRlcigpIGVsc2UgQFxuXHRcdHJldHVybiAodHJhbnNmb3JtKS0+XG5cdFx0XHRpZiB0eXBlb2YgdHJhbnNmb3JtIGlzICdmdW5jdGlvbidcblx0XHRcdFx0Xy5vcHRpb25zLmdsb2JhbFRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuXHRcdFx0ZWxzZSBpZiB0cmFuc2Zvcm0gYW5kIHR5cGVvZiB0cmFuc2Zvcm0gaXMgJ29iamVjdCdcblx0XHRcdFx0Xy5vcHRpb25zLnRyYW5zZm9ybXMgPSB0cmFuc2Zvcm1cblx0XHRcdFxuXHRcdFx0cmV0dXJuIF9cblxuXG5cdCdmaWx0ZXInOiBnZXQ6ICgpLT5cblx0XHRfID0gaWYgQGlzQmFzZSB0aGVuIG5ld0J1aWxkZXIoKSBlbHNlIEBcblx0XHRyZXR1cm4gKGZpbHRlciktPlxuXHRcdFx0aWYgdHlwZW9mIGZpbHRlciBpcyAnZnVuY3Rpb24nXG5cdFx0XHRcdF8ub3B0aW9ucy5nbG9iYWxGaWx0ZXIgPSBmaWx0ZXJcblx0XHRcdGVsc2UgaWYgZmlsdGVyIGFuZCB0eXBlb2YgZmlsdGVyIGlzICdvYmplY3QnXG5cdFx0XHRcdF8ub3B0aW9ucy5maWx0ZXJzID0gZmlsdGVyXG5cdFx0XHRcblx0XHRcdHJldHVybiBfXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBuZXdCdWlsZGVyKHRydWUpXG5leHBvcnRzLnZlcnNpb24gPSBfJHNtKCcuLi9wYWNrYWdlLmpzb24gJCB2ZXJzaW9uJyApIl19
;
return module.exports;
},
6: function (require, module, exports) {

/* istanbul ignore next */
var QuickDom;

var CSS = require(21);


/* istanbul ignore next */

var extend = require(5);

var allowedOptions, allowedTemplateOptions;

allowedTemplateOptions = ['id', 'name', 'type', 'href', 'selected', 'checked', 'className'];

allowedOptions = ['id', 'ref', 'type', 'name', 'text', 'style', 'class', 'className', 'url', 'href', 'selected', 'checked', 'props', 'attrs', 'passStateToChildren', 'stateTriggers'];

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsb3dlZE9wdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbGxvd2VkT3B0aW9ucy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxzQkFBQSxHQUF5QixDQUN4QixJQUR3QixFQUV4QixNQUZ3QixFQUd4QixNQUh3QixFQUl4QixNQUp3QixFQUt4QixVQUx3QixFQU14QixTQU53QixFQU94QixXQVB3Qjs7QUFVekIsY0FBQSxHQUFpQixDQUNoQixJQURnQixFQUVoQixLQUZnQixFQUdoQixNQUhnQixFQUloQixNQUpnQixFQUtoQixNQUxnQixFQU1oQixPQU5nQixFQU9oQixPQVBnQixFQVFoQixXQVJnQixFQVNoQixLQVRnQixFQVVoQixNQVZnQixFQVdoQixVQVhnQixFQVloQixTQVpnQixFQWFoQixPQWJnQixFQWNoQixPQWRnQixFQWVoQixxQkFmZ0IsRUFnQmhCLGVBaEJnQiIsInNvdXJjZXNDb250ZW50IjpbImFsbG93ZWRUZW1wbGF0ZU9wdGlvbnMgPSBbICMgVG8gY29weSBmcm9tIERPTSBFbGVtZW50c1xuXHQnaWQnXG5cdCduYW1lJ1xuXHQndHlwZSdcblx0J2hyZWYnXG5cdCdzZWxlY3RlZCdcblx0J2NoZWNrZWQnXG5cdCdjbGFzc05hbWUnXG5dXG5cbmFsbG93ZWRPcHRpb25zID0gWyAjIFVzZWQgaW4gUXVpY2tFbGVtZW50Ojp0b0pTT05cblx0J2lkJ1xuXHQncmVmJ1xuXHQndHlwZSdcblx0J25hbWUnXG5cdCd0ZXh0J1xuXHQnc3R5bGUnXG5cdCdjbGFzcydcblx0J2NsYXNzTmFtZSdcblx0J3VybCdcblx0J2hyZWYnXG5cdCdzZWxlY3RlZCdcblx0J2NoZWNrZWQnXG5cdCdwcm9wcydcblx0J2F0dHJzJ1xuXHQncGFzc1N0YXRlVG9DaGlsZHJlbidcblx0J3N0YXRlVHJpZ2dlcnMnXG5cdCMgJ3JlbGF0ZWRJbnN0YW5jZSdcbl0iXX0=
;

var helpers, styleCache;

helpers = {};

helpers.includes = function(target, item) {
  return target && target.indexOf(item) !== -1;
};

helpers.removeItem = function(target, item) {
  var itemIndex;
  itemIndex = target.indexOf(item);
  if (itemIndex !== -1) {
    target.splice(itemIndex, 1);
  }
  return target;
};

helpers.normalizeGivenEl = function(targetEl) {
  switch (false) {
    case !IS.string(targetEl):
      return QuickDom.text(targetEl);
    case !IS.domNode(targetEl):
      return QuickDom(targetEl);
    case !IS.template(targetEl):
      return targetEl.spawn();
    default:
      return targetEl;
  }
};

helpers.isStateStyle = function(string) {
  return string[0] === '$' || string[0] === '@';
};

helpers.registerStyle = function(rule, level, important) {
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

styleCache = new ((function() {
  function _Class() {
    this.keys = Object.create(null);
    this.values = Object.create(null);
  }

  _Class.prototype.get = function(key, level) {
    var index;
    if (this.keys[level]) {
      index = this.keys[level].indexOf(key);
      if (index !== -1) {
        return this.values[level][index];
      }
    }
  };

  _Class.prototype.set = function(key, value, level) {
    if (!this.keys[level]) {
      this.keys[level] = [];
      this.values[level] = [];
    }
    this.keys[level].push(key);
    this.values[level].push(value);
    return value;
  };

  return _Class;

})());

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlbHBlcnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBQSxHQUFVOztBQUVWLE9BQU8sQ0FBQyxRQUFSLEdBQW1CLFNBQUMsTUFBRCxFQUFTLElBQVQ7U0FDbEIsTUFBQSxJQUFXLE1BQU0sQ0FBQyxPQUFQLENBQWUsSUFBZixDQUFBLEtBQTBCLENBQUM7QUFEcEI7O0FBR25CLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUMsTUFBRCxFQUFTLElBQVQ7QUFDcEIsTUFBQTtFQUFBLFNBQUEsR0FBWSxNQUFNLENBQUMsT0FBUCxDQUFlLElBQWY7RUFDWixJQUFnQyxTQUFBLEtBQWUsQ0FBQyxDQUFoRDtJQUFBLE1BQU0sQ0FBQyxNQUFQLENBQWMsU0FBZCxFQUF5QixDQUF6QixFQUFBOztBQUNBLFNBQU87QUFIYTs7QUFLckIsT0FBTyxDQUFDLGdCQUFSLEdBQTJCLFNBQUMsUUFBRDtBQUFhLFVBQUEsS0FBQTtBQUFBLFVBQ2xDLEVBQUUsQ0FBQyxNQUFILENBQVUsUUFBVixDQURrQzthQUNULFFBQVEsQ0FBQyxJQUFULENBQWMsUUFBZDtBQURTLFVBRWxDLEVBQUUsQ0FBQyxPQUFILENBQVcsUUFBWCxDQUZrQzthQUVSLFFBQUEsQ0FBUyxRQUFUO0FBRlEsVUFHbEMsRUFBRSxDQUFDLFFBQUgsQ0FBWSxRQUFaLENBSGtDO2FBR1AsUUFBUSxDQUFDLEtBQVQsQ0FBQTtBQUhPO2FBSWxDO0FBSmtDO0FBQWI7O0FBTzNCLE9BQU8sQ0FBQyxZQUFSLEdBQXVCLFNBQUMsTUFBRDtTQUN0QixNQUFPLENBQUEsQ0FBQSxDQUFQLEtBQWEsR0FBYixJQUFvQixNQUFPLENBQUEsQ0FBQSxDQUFQLEtBQWE7QUFEWDs7QUFJdkIsT0FBTyxDQUFDLGFBQVIsR0FBd0IsU0FBQyxJQUFELEVBQU8sS0FBUCxFQUFjLFNBQWQ7QUFDdkIsTUFBQTtFQUFBLFVBQUEsUUFBVTtFQUNWLE1BQUEsR0FBUyxVQUFVLENBQUMsR0FBWCxDQUFlLElBQWYsRUFBcUIsS0FBckI7RUFDVCxJQUFpQixNQUFqQjtBQUFBLFdBQU8sT0FBUDs7RUFDQSxNQUFBLEdBQVM7SUFBQyxTQUFBLEVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBSixDQUFhLElBQWIsRUFBbUIsS0FBbkIsRUFBMEIsU0FBMUIsQ0FBRCxDQUFYO0lBQW1ELEdBQUEsRUFBSSxFQUF2RDtJQUEyRCxNQUFBLElBQTNEOztFQUNULEtBQUEsR0FBUSxNQUFNLENBQUMsSUFBUCxDQUFZLElBQVo7QUFFUixPQUFBLHVDQUFBOztRQUF1QixPQUFPLElBQUssQ0FBQSxJQUFBLENBQVosS0FBcUI7TUFDM0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFYLENBQWdCLENBQUMsSUFBRCxFQUFPLElBQUssQ0FBQSxJQUFBLENBQVosQ0FBaEI7O0FBREQ7QUFHQSxTQUFPLFVBQVUsQ0FBQyxHQUFYLENBQWUsSUFBZixFQUFxQixNQUFyQixFQUE2QixLQUE3QjtBQVZnQjs7QUFheEIsVUFBQSxHQUFhO0VBQ0MsZ0JBQUE7SUFDWixJQUFDLENBQUEsSUFBRCxHQUFRLE1BQU0sQ0FBQyxNQUFQLENBQWMsSUFBZDtJQUNSLElBQUMsQ0FBQSxNQUFELEdBQVUsTUFBTSxDQUFDLE1BQVAsQ0FBYyxJQUFkO0VBRkU7O21CQUliLEdBQUEsR0FBSyxTQUFDLEdBQUQsRUFBTSxLQUFOO0FBQWUsUUFBQTtJQUFBLElBQUcsSUFBQyxDQUFBLElBQUssQ0FBQSxLQUFBLENBQVQ7TUFDbkIsS0FBQSxHQUFRLElBQUMsQ0FBQSxJQUFLLENBQUEsS0FBQSxDQUFNLENBQUMsT0FBYixDQUFxQixHQUFyQjtNQUNSLElBQWdDLEtBQUEsS0FBVyxDQUFDLENBQTVDO0FBQUEsZUFBTyxJQUFDLENBQUEsTUFBTyxDQUFBLEtBQUEsQ0FBTyxDQUFBLEtBQUEsRUFBdEI7T0FGbUI7O0VBQWY7O21CQUlMLEdBQUEsR0FBSyxTQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWEsS0FBYjtJQUNKLElBQUcsQ0FBSSxJQUFDLENBQUEsSUFBSyxDQUFBLEtBQUEsQ0FBYjtNQUNDLElBQUMsQ0FBQSxJQUFLLENBQUEsS0FBQSxDQUFOLEdBQWU7TUFDZixJQUFDLENBQUEsTUFBTyxDQUFBLEtBQUEsQ0FBUixHQUFpQixHQUZsQjs7SUFJQSxJQUFDLENBQUEsSUFBSyxDQUFBLEtBQUEsQ0FBTSxDQUFDLElBQWIsQ0FBa0IsR0FBbEI7SUFDQSxJQUFDLENBQUEsTUFBTyxDQUFBLEtBQUEsQ0FBTSxDQUFDLElBQWYsQ0FBb0IsS0FBcEI7QUFDQSxXQUFPO0VBUEgiLCJzb3VyY2VzQ29udGVudCI6WyJoZWxwZXJzID0ge31cblxuaGVscGVycy5pbmNsdWRlcyA9ICh0YXJnZXQsIGl0ZW0pLT5cblx0dGFyZ2V0IGFuZCB0YXJnZXQuaW5kZXhPZihpdGVtKSBpc250IC0xXG5cbmhlbHBlcnMucmVtb3ZlSXRlbSA9ICh0YXJnZXQsIGl0ZW0pLT5cblx0aXRlbUluZGV4ID0gdGFyZ2V0LmluZGV4T2YoaXRlbSlcblx0dGFyZ2V0LnNwbGljZShpdGVtSW5kZXgsIDEpICBpZiBpdGVtSW5kZXggaXNudCAtMVxuXHRyZXR1cm4gdGFyZ2V0XG5cbmhlbHBlcnMubm9ybWFsaXplR2l2ZW5FbCA9ICh0YXJnZXRFbCktPiBzd2l0Y2hcblx0d2hlbiBJUy5zdHJpbmcodGFyZ2V0RWwpIHRoZW4gUXVpY2tEb20udGV4dCh0YXJnZXRFbClcblx0d2hlbiBJUy5kb21Ob2RlKHRhcmdldEVsKSB0aGVuIFF1aWNrRG9tKHRhcmdldEVsKVxuXHR3aGVuIElTLnRlbXBsYXRlKHRhcmdldEVsKSB0aGVuIHRhcmdldEVsLnNwYXduKClcblx0ZWxzZSB0YXJnZXRFbFxuXG5cbmhlbHBlcnMuaXNTdGF0ZVN0eWxlID0gKHN0cmluZyktPlxuXHRzdHJpbmdbMF0gaXMgJyQnIG9yIHN0cmluZ1swXSBpcyAnQCdcblxuXG5oZWxwZXJzLnJlZ2lzdGVyU3R5bGUgPSAocnVsZSwgbGV2ZWwsIGltcG9ydGFudCktPlxuXHRsZXZlbCB8fD0gMFxuXHRjYWNoZWQgPSBzdHlsZUNhY2hlLmdldChydWxlLCBsZXZlbClcblx0cmV0dXJuIGNhY2hlZCBpZiBjYWNoZWRcblx0b3V0cHV0ID0ge2NsYXNzTmFtZTpbQ1NTLnJlZ2lzdGVyKHJ1bGUsIGxldmVsLCBpbXBvcnRhbnQpXSwgZm5zOltdLCBydWxlfVxuXHRwcm9wcyA9IE9iamVjdC5rZXlzKHJ1bGUpXG5cdFxuXHRmb3IgcHJvcCBpbiBwcm9wcyB3aGVuIHR5cGVvZiBydWxlW3Byb3BdIGlzICdmdW5jdGlvbidcblx0XHRvdXRwdXQuZm5zLnB1c2ggW3Byb3AsIHJ1bGVbcHJvcF1dXG5cblx0cmV0dXJuIHN0eWxlQ2FjaGUuc2V0KHJ1bGUsIG91dHB1dCwgbGV2ZWwpXG5cblxuc3R5bGVDYWNoZSA9IG5ldyBjbGFzc1xuXHRjb25zdHJ1Y3RvcjogKCktPlxuXHRcdEBrZXlzID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXHRcdEB2YWx1ZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cblx0Z2V0OiAoa2V5LCBsZXZlbCktPiBpZiBAa2V5c1tsZXZlbF1cblx0XHRpbmRleCA9IEBrZXlzW2xldmVsXS5pbmRleE9mKGtleSlcblx0XHRyZXR1cm4gQHZhbHVlc1tsZXZlbF1baW5kZXhdIGlmIGluZGV4IGlzbnQgLTFcblxuXHRzZXQ6IChrZXksIHZhbHVlLCBsZXZlbCktPlxuXHRcdGlmIG5vdCBAa2V5c1tsZXZlbF1cblx0XHRcdEBrZXlzW2xldmVsXSA9IFtdXG5cdFx0XHRAdmFsdWVzW2xldmVsXSA9IFtdXG5cblx0XHRAa2V5c1tsZXZlbF0ucHVzaCBrZXlcblx0XHRAdmFsdWVzW2xldmVsXS5wdXNoIHZhbHVlXG5cdFx0cmV0dXJuIHZhbHVlXG5cbiJdfQ==
;

var IS;

IS = require(37);

IS = IS.create('natives', 'dom');

IS.load({
  quickDomEl: function(subject) {
    return subject && subject.constructor.name === QuickElement.name;
  },
  template: function(subject) {
    return subject && subject.constructor.name === QuickTemplate.name;
  }
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hlY2tzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLEVBQUEsR0FBSyxJQUFBLENBQUssaUJBQUw7O0FBQ0wsRUFBQSxHQUFLLEVBQUUsQ0FBQyxNQUFILENBQVUsU0FBVixFQUFvQixLQUFwQjs7QUFDTCxFQUFFLENBQUMsSUFBSCxDQUNDO0VBQUEsVUFBQSxFQUFZLFNBQUMsT0FBRDtXQUFZLE9BQUEsSUFBWSxPQUFPLENBQUMsV0FBVyxDQUFDLElBQXBCLEtBQTRCLFlBQVksQ0FBQztFQUFqRSxDQUFaO0VBRUEsUUFBQSxFQUFVLFNBQUMsT0FBRDtXQUFZLE9BQUEsSUFBWSxPQUFPLENBQUMsV0FBVyxDQUFDLElBQXBCLEtBQTRCLGFBQWEsQ0FBQztFQUFsRSxDQUZWO0NBREQiLCJzb3VyY2VzQ29udGVudCI6WyJJUyA9IF8kc20oJ0BkYW5pZWxrYWxlbi9pcycgKVxuSVMgPSBJUy5jcmVhdGUoJ25hdGl2ZXMnLCdkb20nKVxuSVMubG9hZFx0XG5cdHF1aWNrRG9tRWw6IChzdWJqZWN0KS0+IHN1YmplY3QgYW5kIHN1YmplY3QuY29uc3RydWN0b3IubmFtZSBpcyBRdWlja0VsZW1lbnQubmFtZVxuXHRcblx0dGVtcGxhdGU6IChzdWJqZWN0KS0+IHN1YmplY3QgYW5kIHN1YmplY3QuY29uc3RydWN0b3IubmFtZSBpcyBRdWlja1RlbXBsYXRlLm5hbWVcblx0XG5cdCMgYmF0Y2g6IChzdWJqZWN0KS0+IHN1YmplY3QgYW5kIHN1YmplY3QuY29uc3RydWN0b3IubmFtZSBpcyAnUXVpY2tCYXRjaCdcblxuIl19
;

var QuickElement, svgNamespace;

svgNamespace = 'http://www.w3.org/2000/svg';

QuickElement = (function() {
  QuickElement.count = 0;

  function QuickElement(type, options) {
    this.type = type;
    this.options = options;
    QuickElement.count++;
    if (this.type[0] === '*') {
      this.svg = true;
    }
    this.el = this.options.existing || (this.type === 'text' ? document.createTextNode(typeof this.options.text === 'string' ? this.options.text : '') : this.svg ? document.createElementNS(svgNamespace, this.type.slice(1)) : document.createElement(this.type));
    if (this.type === 'text') {
      this.append = this.prepend = this.attr = function() {};
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

  QuickElement.prototype.toJSON = function() {
    var child, children, i, len, output;
    output = [this.type, extend.clone.keys(allowedOptions)(this.options)];
    children = this.children;
    for (i = 0, len = children.length; i < len; i++) {
      child = children[i];
      output.push(child.toJSON());
    }
    return output;
  };

  return QuickElement;

})();


/* istanbul ignore next */

if (QuickElement.name == null) {
  QuickElement.name = 'QuickElement';
}

Object.defineProperties(QuickElement.prototype, {
  'raw': {
    get: function() {
      return this.el;
    }
  },
  '0': {
    get: function() {
      return this.el;
    }
  },
  'css': {
    get: function() {
      return this.style;
    }
  },
  'replaceWith': {
    get: function() {
      return this.replace;
    }
  },
  'removeListener': {
    get: function() {
      return this.off;
    }
  }
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFsaWFzZXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixZQUFZLENBQUEsU0FBcEMsRUFDQztFQUFBLEtBQUEsRUFBTztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUssSUFBQyxDQUFBO0lBQU4sQ0FBTDtHQUFQO0VBQ0EsR0FBQSxFQUFLO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBSyxJQUFDLENBQUE7SUFBTixDQUFMO0dBREw7RUFFQSxLQUFBLEVBQU87SUFBQSxHQUFBLEVBQUssU0FBQTthQUFLLElBQUMsQ0FBQTtJQUFOLENBQUw7R0FGUDtFQUdBLGFBQUEsRUFBZTtJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUssSUFBQyxDQUFBO0lBQU4sQ0FBTDtHQUhmO0VBSUEsZ0JBQUEsRUFBa0I7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFLLElBQUMsQ0FBQTtJQUFOLENBQUw7R0FKbEI7Q0FERCIsInNvdXJjZXNDb250ZW50IjpbIk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIFF1aWNrRWxlbWVudDo6LFxuXHQncmF3JzogZ2V0OiAoKS0+IEBlbFxuXHQnMCc6IGdldDogKCktPiBAZWxcblx0J2Nzcyc6IGdldDogKCktPiBAc3R5bGVcblx0J3JlcGxhY2VXaXRoJzogZ2V0OiAoKS0+IEByZXBsYWNlXG5cdCdyZW1vdmVMaXN0ZW5lcic6IGdldDogKCktPiBAb2ZmXG5cbiJdfQ==
;

var _filterElements, _getChildRefs, _getIndexByProp, _getParents;

QuickElement.prototype.parentsUntil = function(filter) {
  return _getParents(this, filter);
};

QuickElement.prototype.parentMatching = function(filter) {
  var isRef, nextParent;
  if (IS["function"](filter) || (isRef = IS.string(filter))) {
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

QuickElement.prototype.query = function(selector) {
  return QuickDom(this.raw.querySelector(selector));
};

QuickElement.prototype.queryAll = function(selector) {
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
    get: function() {
      var child, i, len, ref1;
      if (this.el.childNodes.length !== this._children.length) {
        this._children.length = 0;
        ref1 = this.el.childNodes;
        for (i = 0, len = ref1.length; i < len; i++) {
          child = ref1[i];
          if (child.nodeType < 4) {
            this._children.push(QuickDom(child));
          }
        }
      }
      return this._children;
    }
  },
  'elementChildren': {
    get: function() {
      return _filterElements(this.children);
    }
  },
  'parent': {
    get: function() {
      if ((!this._parent || this._parent.el !== this.el.parentNode) && !IS.domDoc(this.el.parentNode)) {
        this._parent = QuickDom(this.el.parentNode);
      }
      return this._parent;
    }
  },
  'parents': {
    get: function() {
      return _getParents(this);
    }
  },
  'next': {
    get: function() {
      return QuickDom(this.el.nextSibling);
    }
  },
  'nextEl': {
    get: function() {
      return QuickDom(this.el.nextElementSibling);
    }
  },
  'nextElAll': {
    get: function() {
      return _filterElements(this.nextAll);
    }
  },
  'nextAll': {
    get: function() {
      var nextSibling, siblings;
      siblings = [];
      nextSibling = QuickDom(this.el.nextSibling);
      while (nextSibling) {
        siblings.push(nextSibling);
        nextSibling = nextSibling.next;
      }
      return siblings;
    }
  },
  'prev': {
    get: function() {
      return QuickDom(this.el.previousSibling);
    }
  },
  'prevEl': {
    get: function() {
      return QuickDom(this.el.previousElementSibling);
    }
  },
  'prevElAll': {
    get: function() {
      return _filterElements(this.prevAll);
    }
  },
  'prevAll': {
    get: function() {
      var prevSibling, siblings;
      siblings = [];
      prevSibling = QuickDom(this.el.previousSibling);
      while (prevSibling) {
        siblings.push(prevSibling);
        prevSibling = prevSibling.prev;
      }
      return siblings;
    }
  },
  'siblings': {
    get: function() {
      return this.prevAll.reverse().concat(this.nextAll);
    }
  },
  'elementSiblings': {
    get: function() {
      return _filterElements(this.siblings);
    }
  },
  'child': {
    get: function() {
      return this._childRefs || _getChildRefs(this);
    }
  },
  'childf': {
    get: function() {
      return _getChildRefs(this, true);
    }
  },
  'firstChild': {
    get: function() {
      return this.children[0];
    }
  },
  'lastChild': {
    get: function() {
      var children;
      children = this.children;
      return children[children.length - 1];
    }
  },
  'index': {
    get: function() {
      var parent;
      if (!(parent = this.parent)) {
        return null;
      } else {
        return parent.children.indexOf(this);
      }
    }
  },
  'indexType': {
    get: function() {
      return _getIndexByProp(this, 'type');
    }
  },
  'indexRef': {
    get: function() {
      return _getIndexByProp(this, 'ref');
    }
  }
});

_getParents = function(targetEl, filter) {
  var isRef, nextParent, parents;
  if (!IS["function"](filter) && !(isRef = IS.string(filter))) {
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

_getChildRefs = function(target, freshCopy) {
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
      childRefs = _getChildRefs(child, freshCopy);
      for (ref in childRefs) {
        el = childRefs[ref];
        refs[ref] || (refs[ref] = el);
      }
    }
  }
  return refs;
};

_getIndexByProp = function(main, prop) {
  var parent;
  if (!(parent = main.parent)) {
    return null;
  } else {
    return parent.children.filter(function(child) {
      return child[prop] === main[prop];
    }).indexOf(main);
  }
};

_filterElements = function(array) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhdmVyc2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRyYXZlcnNpbmcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsWUFBWSxDQUFBLFNBQUUsQ0FBQSxZQUFkLEdBQTZCLFNBQUMsTUFBRDtTQUM1QixXQUFBLENBQVksSUFBWixFQUFlLE1BQWY7QUFENEI7O0FBRzdCLFlBQVksQ0FBQSxTQUFFLENBQUEsY0FBZCxHQUErQixTQUFDLE1BQUQ7QUFDOUIsTUFBQTtFQUFBLElBQUcsRUFBRSxFQUFDLFFBQUQsRUFBRixDQUFZLE1BQVosQ0FBQSxJQUF1QixDQUFBLEtBQUEsR0FBTSxFQUFFLENBQUMsTUFBSCxDQUFVLE1BQVYsQ0FBTixDQUExQjtJQUNDLFVBQUEsR0FBYSxJQUFDLENBQUE7QUFDZCxXQUFNLFVBQU47TUFDQyxJQUFHLEtBQUg7UUFDQyxJQUFxQixVQUFVLENBQUMsR0FBWCxLQUFrQixNQUF2QztBQUFBLGlCQUFPLFdBQVA7U0FERDtPQUFBLE1BQUE7UUFHQyxJQUFxQixNQUFBLENBQU8sVUFBUCxDQUFyQjtBQUFBLGlCQUFPLFdBQVA7U0FIRDs7TUFLQSxVQUFBLEdBQWEsVUFBVSxDQUFDO0lBTnpCLENBRkQ7O0FBRDhCOztBQWEvQixZQUFZLENBQUEsU0FBRSxDQUFBLEtBQWQsR0FBc0IsU0FBQyxRQUFEO1NBQ3JCLFFBQUEsQ0FBUyxJQUFDLENBQUEsR0FBRyxDQUFDLGFBQUwsQ0FBbUIsUUFBbkIsQ0FBVDtBQURxQjs7QUFHdEIsWUFBWSxDQUFBLFNBQUUsQ0FBQSxRQUFkLEdBQXlCLFNBQUMsUUFBRDtBQUN4QixNQUFBO0VBQUEsTUFBQSxHQUFTLElBQUMsQ0FBQSxHQUFHLENBQUMsZ0JBQUwsQ0FBc0IsUUFBdEI7RUFDVCxNQUFBLEdBQVM7QUFBSSxPQUFBLHdDQUFBOztJQUFBLE1BQU0sQ0FBQyxJQUFQLENBQVksSUFBWjtBQUFBO0FBQ2IsU0FBTyxJQUFJLFVBQUosQ0FBZSxN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QTs7UUFBQSxJQUFLLENBQUEsR0FBQSxNQUFMLElBQUssQ0FBQSxHQUFBLElBQVM7QUFBZDtBQUZELEtBREQ7O0FBS0EsU0FBTztBQVhROztBQWNoQixlQUFBLEdBQWtCLFNBQUMsSUFBRCxFQUFPLElBQVA7QUFDakIsTUFBQTtFQUFBLElBQUcsQ0FBSSxDQUFBLE1BQUEsR0FBTyxJQUFJLENBQUMsTUFBWixDQUFQO0FBQ0MsV0FBTyxLQURSO0dBQUEsTUFBQTtXQUdDLE1BQU0sQ0FBQyxRQUNOLENBQUMsTUFERixDQUNTLFNBQUMsS0FBRDthQUFVLEtBQU0sQ0FBQSxJQUFBLENBQU4sS0FBZSxJQUFLLENBQUEsSUFBQTtJQUE5QixDQURULENBRUMsQ0FBQyxPQUZGLENBRVUsSUFGVixFQUhEOztBQURpQjs7QUFTbEIsZUFBQSxHQUFrQixTQUFDLEtBQUQ7QUFDakIsTUFBQTtFQUFBLElBQUcsQ0FBSSxLQUFLLENBQUMsTUFBYjtBQUNDLFdBQU8sTUFEUjtHQUFBLE1BQUE7SUFHQyxNQUFBLEdBQVM7QUFDVCxTQUFBLHVDQUFBOztVQUF5QyxJQUFJLENBQUMsSUFBTCxLQUFlO1FBQXhELE1BQU0sQ0FBQyxJQUFQLENBQVksSUFBWjs7QUFBQTtBQUNBLFdBQU8sT0FMUjs7QUFEaUIiLCJzb3VyY2VzQ29udGVudCI6WyJRdWlja0VsZW1lbnQ6OnBhcmVudHNVbnRpbCA9IChmaWx0ZXIpLT5cblx0X2dldFBhcmVudHMoQCwgZmlsdGVyKVxuXG5RdWlja0VsZW1lbnQ6OnBhcmVudE1hdGNoaW5nID0gKGZpbHRlciktPlxuXHRpZiBJUy5mdW5jdGlvbihmaWx0ZXIpIG9yIGlzUmVmPUlTLnN0cmluZyhmaWx0ZXIpXG5cdFx0bmV4dFBhcmVudCA9IEBwYXJlbnRcblx0XHR3aGlsZSBuZXh0UGFyZW50XG5cdFx0XHRpZiBpc1JlZlxuXHRcdFx0XHRyZXR1cm4gbmV4dFBhcmVudCBpZiBuZXh0UGFyZW50LnJlZiBpcyBmaWx0ZXJcblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0dXJuIG5leHRQYXJlbnQgaWYgZmlsdGVyKG5leHRQYXJlbnQpXG5cblx0XHRcdG5leHRQYXJlbnQgPSBuZXh0UGFyZW50LnBhcmVudFxuXHRcdFxuXHRyZXR1cm5cblxuUXVpY2tFbGVtZW50OjpxdWVyeSA9IChzZWxlY3RvciktPlxuXHRRdWlja0RvbSBAcmF3LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG5cblF1aWNrRWxlbWVudDo6cXVlcnlBbGwgPSAoc2VsZWN0b3IpLT5cblx0cmVzdWx0ID0gQHJhdy5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuXHRvdXRwdXQgPSBbXTsgb3V0cHV0LnB1c2goaXRlbSkgZm9yIGl0ZW0gaW4gcmVzdWx0XG5cdHJldHVybiBuZXcgUXVpY2tCYXRjaChvdXRwdXQpXG5cblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyBRdWlja0VsZW1lbnQ6Oixcblx0J2NoaWxkcmVuJzogZ2V0OiAoKS0+XG5cdFx0aWYgQGVsLmNoaWxkTm9kZXMubGVuZ3RoIGlzbnQgQF9jaGlsZHJlbi5sZW5ndGggIyBSZS1jb2xsZWN0IGNoaWxkcmVuXHRcblx0XHRcdEBfY2hpbGRyZW4ubGVuZ3RoID0gMCAjIEVtcHR5IG91dCBjaGlsZHJlbiBhcnJheVxuXHRcdFx0QF9jaGlsZHJlbi5wdXNoKFF1aWNrRG9tKGNoaWxkKSkgZm9yIGNoaWxkIGluIEBlbC5jaGlsZE5vZGVzIHdoZW4gY2hpbGQubm9kZVR5cGUgPCA0XG5cblx0XHRyZXR1cm4gQF9jaGlsZHJlblxuXG5cdCdlbGVtZW50Q2hpbGRyZW4nOiBnZXQ6ICgpLT5cblx0XHRfZmlsdGVyRWxlbWVudHMoQGNoaWxkcmVuKVxuXG5cdCdwYXJlbnQnOiBnZXQ6ICgpLT5cblx0XHRpZiAobm90IEBfcGFyZW50IG9yIEBfcGFyZW50LmVsIGlzbnQgQGVsLnBhcmVudE5vZGUpIGFuZCBub3QgSVMuZG9tRG9jKEBlbC5wYXJlbnROb2RlKVxuXHRcdFx0QF9wYXJlbnQgPSBRdWlja0RvbShAZWwucGFyZW50Tm9kZSlcblxuXHRcdHJldHVybiBAX3BhcmVudFxuXG5cblx0J3BhcmVudHMnOiBnZXQ6ICgpLT5cblx0XHRfZ2V0UGFyZW50cyhAKVxuXG5cdCduZXh0JzogZ2V0OiAoKS0+XG5cdFx0UXVpY2tEb20oQGVsLm5leHRTaWJsaW5nKVxuXHRcblx0J25leHRFbCc6IGdldDogKCktPlxuXHRcdFF1aWNrRG9tKEBlbC5uZXh0RWxlbWVudFNpYmxpbmcpXG5cdFxuXHQnbmV4dEVsQWxsJzogZ2V0OiAoKS0+XG5cdFx0X2ZpbHRlckVsZW1lbnRzKEBuZXh0QWxsKVxuXG5cdCduZXh0QWxsJzogZ2V0OiAoKS0+XG5cdFx0c2libGluZ3MgPSBbXVxuXHRcdG5leHRTaWJsaW5nID0gUXVpY2tEb20oQGVsLm5leHRTaWJsaW5nKVxuXHRcdHdoaWxlIG5leHRTaWJsaW5nXG5cdFx0XHRzaWJsaW5ncy5wdXNoKG5leHRTaWJsaW5nKVxuXHRcdFx0bmV4dFNpYmxpbmcgPSBuZXh0U2libGluZy5uZXh0XG5cblx0XHRyZXR1cm4gc2libGluZ3NcblxuXHQncHJldic6IGdldDogKCktPlxuXHRcdFF1aWNrRG9tKEBlbC5wcmV2aW91c1NpYmxpbmcpXG5cdFxuXHQncHJldkVsJzogZ2V0OiAoKS0+XG5cdFx0UXVpY2tEb20oQGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpXG5cdFxuXHQncHJldkVsQWxsJzogZ2V0OiAoKS0+XG5cdFx0X2ZpbHRlckVsZW1lbnRzKEBwcmV2QWxsKVxuXG5cdCdwcmV2QWxsJzogZ2V0OiAoKS0+XG5cdFx0c2libGluZ3MgPSBbXVxuXHRcdHByZXZTaWJsaW5nID0gUXVpY2tEb20oQGVsLnByZXZpb3VzU2libGluZylcblx0XHR3aGlsZSBwcmV2U2libGluZ1xuXHRcdFx0c2libGluZ3MucHVzaChwcmV2U2libGluZylcblx0XHRcdHByZXZTaWJsaW5nID0gcHJldlNpYmxpbmcucHJldlxuXG5cdFx0cmV0dXJuIHNpYmxpbmdzXG5cblx0J3NpYmxpbmdzJzogZ2V0OiAoKS0+XG5cdFx0QHByZXZBbGwucmV2ZXJzZSgpLmNvbmNhdChAbmV4dEFsbClcblxuXHQnZWxlbWVudFNpYmxpbmdzJzogZ2V0OiAoKS0+XG5cdFx0X2ZpbHRlckVsZW1lbnRzKEBzaWJsaW5ncylcblx0XG5cdCdjaGlsZCc6IGdldDogKCktPlxuXHRcdEBfY2hpbGRSZWZzIG9yIF9nZXRDaGlsZFJlZnMoQClcblxuXHQnY2hpbGRmJzogZ2V0OiAoKS0+XG5cdFx0X2dldENoaWxkUmVmcyhALCB0cnVlKVxuXG5cdCdmaXJzdENoaWxkJzogZ2V0OiAoKS0+XG5cdFx0QGNoaWxkcmVuWzBdXG5cblx0J2xhc3RDaGlsZCc6IGdldDogKCktPlxuXHRcdGNoaWxkcmVuID0gQGNoaWxkcmVuXG5cdFx0Y2hpbGRyZW5bY2hpbGRyZW4ubGVuZ3RoLTFdXG5cblx0J2luZGV4JzogZ2V0OiAoKS0+XG5cdFx0aWYgbm90IHBhcmVudD1AcGFyZW50XG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdGVsc2Vcblx0XHRcdHBhcmVudC5jaGlsZHJlbi5pbmRleE9mKEApXG5cblx0J2luZGV4VHlwZSc6IGdldDogKCktPlxuXHRcdF9nZXRJbmRleEJ5UHJvcChALCAndHlwZScpXG5cblx0J2luZGV4UmVmJzogZ2V0OiAoKS0+XG5cdFx0X2dldEluZGV4QnlQcm9wKEAsICdyZWYnKVxuXG5cblxuX2dldFBhcmVudHMgPSAodGFyZ2V0RWwsIGZpbHRlciktPlxuXHRmaWx0ZXIgPSB1bmRlZmluZWQgaWYgbm90IElTLmZ1bmN0aW9uKGZpbHRlcikgYW5kIG5vdCBpc1JlZj1JUy5zdHJpbmcoZmlsdGVyKVxuXHRwYXJlbnRzID0gW11cblx0bmV4dFBhcmVudCA9IHRhcmdldEVsLnBhcmVudFxuXHR3aGlsZSBuZXh0UGFyZW50XG5cdFx0cGFyZW50cy5wdXNoKG5leHRQYXJlbnQpXG5cdFx0bmV4dFBhcmVudCA9IG5leHRQYXJlbnQucGFyZW50XG5cdFx0aWYgaXNSZWZcblx0XHRcdG5leHRQYXJlbnQgPSBudWxsIGlmIG5leHRQYXJlbnQgYW5kIG5leHRQYXJlbnQucmVmIGlzIGZpbHRlclxuXHRcdGVsc2UgaWYgZmlsdGVyXG5cdFx0XHRuZXh0UGFyZW50ID0gbnVsbCBpZiBmaWx0ZXIobmV4dFBhcmVudClcblxuXHRyZXR1cm4gcGFyZW50c1xuXG5cbl9nZXRDaGlsZFJlZnMgPSAodGFyZ2V0LCBmcmVzaENvcHkpLT5cblx0dGFyZ2V0Ll9jaGlsZFJlZnMgPSB7fSBpZiBmcmVzaENvcHkgb3Igbm90IHRhcmdldC5fY2hpbGRSZWZzXG5cdHJlZnMgPSB0YXJnZXQuX2NoaWxkUmVmc1xuXHRyZWZzW3RhcmdldC5yZWZdID0gdGFyZ2V0IGlmIHRhcmdldC5yZWZcblx0Y2hpbGRyZW4gPSB0YXJnZXQuY2hpbGRyZW5cblxuXHRpZiBjaGlsZHJlbi5sZW5ndGhcblx0XHRmb3IgY2hpbGQgaW4gY2hpbGRyZW5cblx0XHRcdGNoaWxkUmVmcyA9IF9nZXRDaGlsZFJlZnMoY2hpbGQsIGZyZXNoQ29weSlcblx0XHRcdHJlZnNbcmVmXSB8fD0gZWwgZm9yIHJlZixlbCBvZiBjaGlsZFJlZnNcblxuXHRyZXR1cm4gcmVmc1xuXG5cbl9nZXRJbmRleEJ5UHJvcCA9IChtYWluLCBwcm9wKS0+XG5cdGlmIG5vdCBwYXJlbnQ9bWFpbi5wYXJlbnRcblx0XHRyZXR1cm4gbnVsbFxuXHRlbHNlXG5cdFx0cGFyZW50LmNoaWxkcmVuXG5cdFx0XHQuZmlsdGVyIChjaGlsZCktPiBjaGlsZFtwcm9wXSBpcyBtYWluW3Byb3BdXG5cdFx0XHQuaW5kZXhPZihtYWluKVxuXG5cbl9maWx0ZXJFbGVtZW50cyA9IChhcnJheSktPlxuXHRpZiBub3QgYXJyYXkubGVuZ3RoXG5cdFx0cmV0dXJuIGFycmF5XG5cdGVsc2Vcblx0XHRvdXRwdXQgPSBbXVxuXHRcdG91dHB1dC5wdXNoKGl0ZW0pIGZvciBpdGVtIGluIGFycmF5IHdoZW4gaXRlbS50eXBlIGlzbnQgJ3RleHQnXG5cdFx0cmV0dXJuIG91dHB1dFxuXG5cblxuIl19
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

QuickElement.prototype._normalizeOptions = function() {
  var base1, base2, base3, base4;
  if (this.options["class"]) {
    this.options.className = this.options["class"];
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

QuickElement.prototype._parseStyles = function(styles, store) {
  var _mediaStates, _providedStates, _providedStatesShared, _stateShared, _styles, base, flattenNestedStates, forceStyle, i, keys, len, specialStates, state, stateStyles, state_, states;
  if (!IS.objectPlain(styles)) {
    return;
  }
  keys = Object.keys(styles);
  states = keys.filter(function(key) {
    return helpers.isStateStyle(key);
  });
  specialStates = helpers.removeItem(states.slice(), '$base');
  _mediaStates = states.filter(function(key) {
    return key[0] === '@';
  }).map(function(state) {
    return state.slice(1);
  });
  _providedStates = states.map(function(state) {
    return state.slice(1);
  });
  _styles = store || {};
  _stateShared = _providedStatesShared = void 0;
  base = !helpers.includes(states, '$base') ? styles : styles.$base;
  _styles.base = helpers.registerStyle(base, 0, forceStyle = this.options.forceStyle);
  if (specialStates.length) {
    flattenNestedStates = function(styleObject, chain, level) {
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
          _styles[stateChain.string] = helpers.registerStyle(flattenNestedStates(styleObject[state], chain, level + 1), level + 1, forceStyle);
        }
      }
      if (hasNonStateProps) {
        return output;
      }
    };
    for (i = 0, len = specialStates.length; i < len; i++) {
      state = specialStates[i];
      state_ = state.slice(1);
      stateStyles = flattenNestedStates(styles[state], [state_], 1);
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

QuickElement.prototype._parseTexts = function(texts, store) {
  var _providedStates, _texts, i, len, state, states;
  if (!IS.objectPlain(texts)) {
    return;
  }
  states = Object.keys(texts).map(function(state) {
    return state.slice(1);
  });
  _providedStates = states.filter(function(state) {
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

QuickElement.prototype._applyOptions = function() {
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
    window.addEventListener('resize', (function(_this) {
      return function() {
        return _this.recalcStyle();
      };
    })(this));
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
        if (IS["function"](value)) {
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
    this.append(QuickDom('text', {
      text: this.options.text
    }));
  }
};

QuickElement.prototype._postCreation = function(data) {
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

QuickElement.prototype._attachStateEvents = function(force) {
  var states;
  states = Object.keys(this.options.stateTriggers);
  states.forEach((function(_this) {
    return function(state) {
      var disabler, enabler, trigger;
      trigger = _this.options.stateTriggers[state];
      if (!helpers.includes(_this._providedStates, state) && !force && !trigger.force) {
        return;
      }
      enabler = IS.string(trigger) ? trigger : trigger.on;
      if (IS.object(trigger)) {
        disabler = trigger.off;
      }
      _this._listenTo(enabler, function() {
        return _this.state(state, true, trigger.bubbles);
      });
      if (disabler) {
        return _this._listenTo(disabler, function() {
          return _this.state(state, false, trigger.bubbles);
        });
      }
    };
  })(this));
};

QuickElement.prototype._proxyParent = function() {
  var parent;
  parent = void 0;
  return Object.defineProperty(this, '_parent', {
    get: function() {
      return parent;
    },
    set: function(newParent) {
      var lastParent;
      if (parent = newParent) {
        lastParent = this.parents.slice(-1)[0];
        if (lastParent.raw === document.documentElement) {
          this._unproxyParent(newParent);
        } else {
          parent.on('inserted', (function(_this) {
            return function() {
              if (parent === newParent) {
                return _this._unproxyParent(newParent);
              }
            };
          })(this));
        }
      }
    }
  });
};

QuickElement.prototype._unproxyParent = function(newParent) {
  delete this._parent;
  this._parent = newParent;
  this.emitPrivate('inserted', newParent);
};

CACHED_FN_INSERTED = function() {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsaUJBQUEsR0FDQztFQUFBLE9BQUEsRUFBUztJQUFDLEVBQUEsRUFBRyxZQUFKO0lBQWtCLEdBQUEsRUFBSSxZQUF0QjtJQUFvQyxPQUFBLEVBQVEsSUFBNUM7R0FBVDtFQUNBLE9BQUEsRUFBUztJQUFDLEVBQUEsRUFBRyxPQUFKO0lBQWEsR0FBQSxFQUFJLE1BQWpCO0lBQXlCLE9BQUEsRUFBUSxJQUFqQztHQURUOzs7QUFJRCxZQUFZLENBQUEsU0FBRSxDQUFBLGlCQUFkLEdBQWtDLFNBQUE7QUFDakMsTUFBQTtFQUFBLElBQXVDLElBQUMsQ0FBQSxPQUFPLEVBQUMsS0FBRCxFQUEvQztJQUFBLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBVCxHQUFxQixJQUFDLENBQUEsT0FBTyxFQUFDLEtBQUQsR0FBN0I7O0VBQ0EsSUFBZ0MsSUFBQyxDQUFBLE9BQU8sQ0FBQyxHQUF6QztJQUFBLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxHQUFnQixJQUFDLENBQUEsT0FBTyxDQUFDLElBQXpCOztFQUNBLElBQUMsQ0FBQSxPQUFELHlEQUFtQixDQUFDLHVCQUFELENBQUMsa0JBQW1COztTQUMvQixDQUFDLG1CQUFvQjs7O1NBQ3JCLENBQUMsc0JBQXVCOzs7U0FDeEIsQ0FBQyxxQkFBc0I7O0VBQy9CLElBQUMsQ0FBQSxPQUFPLENBQUMsYUFBVCxHQUNJLElBQUMsQ0FBQSxPQUFPLENBQUMsYUFBWixHQUNDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBYixDQUFrQixpQkFBbEIsRUFBcUMsSUFBQyxDQUFBLE9BQU8sQ0FBQyxhQUE5QyxDQURELEdBR0M7RUFFRixJQUFHLElBQUMsQ0FBQSxJQUFELEtBQVMsTUFBWjtJQUNDLE1BQUEsQ0FBTyxJQUFQLEVBQVUsSUFBQyxDQUFBLFdBQUQsQ0FBYSxJQUFDLENBQUEs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V0FBRCxDQUFBLEVBQUE7O0VBRUEsSUFBRyxDQUFDLFdBQUEsR0FBWSxJQUFDLENBQUEsWUFBZCxDQUFBLElBQWdDLElBQUMsQ0FBQSxZQUFZLENBQUMsTUFBakQ7SUFDQyxJQUFDLENBQUEsWUFBRCxHQUFnQixNQUFNLENBQUMsTUFBUCxDQUFjLElBQWQ7QUFFaEI7U0FBQSw2Q0FBQTs7bUJBQ0MsSUFBQyxDQUFBLFlBQWEsQ0FBQSxXQUFBLENBQWQsR0FBNkIsVUFBVSxDQUFDLFFBQVgsQ0FBb0IsSUFBcEIsRUFBdUIsV0FBdkI7QUFEOUI7bUJBSEQ7O0FBSm9CIiwic291cmNlc0NvbnRlbnQiOlsiYmFzZVN0YXRlVHJpZ2dlcnMgPVxuXHQnaG92ZXInOiB7b246J21vdXNlZW50ZXInLCBvZmY6J21vdXNlbGVhdmUnLCBidWJibGVzOnRydWV9XG5cdCdmb2N1cyc6IHtvbjonZm9jdXMnLCBvZmY6J2JsdXInLCBidWJibGVzOnRydWV9XG5cblxuUXVpY2tFbGVtZW50Ojpfbm9ybWFsaXplT3B0aW9ucyA9ICgpLT5cblx0QG9wdGlvbnMuY2xhc3NOYW1lID0gQG9wdGlvbnMuY2xhc3MgaWYgQG9wdGlvbnMuY2xhc3Ncblx0QG9wdGlvbnMuaHJlZiA9IEBvcHRpb25zLnVybCBpZiBAb3B0aW9ucy51cmxcblx0QHJlbGF0ZWQgPSBAb3B0aW9ucy5yZWxhdGVkSW5zdGFuY2UgPz0gQFxuXHRAb3B0aW9ucy51bnBhc3NhYmxlU3RhdGVzID89IFtdXG5cdEBvcHRpb25zLnBhc3NTdGF0ZVRvQ2hpbGRyZW4gPz0gdHJ1ZVxuXHRAb3B0aW9ucy5wYXNzRGF0YVRvQ2hpbGRyZW4gPz0gdHJ1ZVxuXHRAb3B0aW9ucy5zdGF0ZVRyaWdnZXJzID1cblx0XHRpZiBAb3B0aW9ucy5zdGF0ZVRyaWdnZXJzXG5cdFx0XHRleHRlbmQuY2xvbmUuZGVlcChiYXNlU3RhdGVUcmlnZ2VycywgQG9wdGlvbnMuc3RhdGVUcmlnZ2Vycylcblx0XHRlbHNlXG5cdFx0XHRiYXNlU3RhdGVUcmlnZ2Vyc1xuXHRcblx0aWYgQHR5cGUgaXMgJ3RleHQnXG5cdFx0ZXh0ZW5kIEAsIEBfcGFyc2VUZXh0cyhAb3B0aW9ucy50ZXh0LCBAX3RleHRzKVxuXHRlbHNlXG5cdFx0ZXh0ZW5kIEAsIEBfcGFyc2VTdHlsZXMoQG9wdGlvbnMuc3R5bGUsIEBfc3R5bGVzKVxuXHRcblx0cmV0dXJuXG5cblxuUXVpY2tFbGVtZW50OjpfcGFyc2VTdHlsZXMgPSAoc3R5bGVzLCBzdG9yZSktPlxuXHRyZXR1cm4gaWYgbm90IElTLm9iamVjdFBsYWluKHN0eWxlcylcblx0a2V5cyA9IE9iamVjdC5rZXlzKHN0eWxlcylcblx0c3RhdGVzID0ga2V5cy5maWx0ZXIgKGtleSktPiBoZWxwZXJzLmlzU3RhdGVTdHlsZShrZXkpXG5cdHNwZWNpYWxTdGF0ZXMgPSBoZWxwZXJzLnJlbW92ZUl0ZW0oc3RhdGVzLnNsaWNlKCksICckYmFzZScpXG5cdF9tZWRpYVN0YXRlcyA9IHN0YXRlcy5maWx0ZXIoKGtleSktPiBrZXlbMF0gaXMgJ0AnKS5tYXAgKHN0YXRlKS0+IHN0YXRlLnNsaWNlKDEpXG5cdF9wcm92aWRlZFN0YXRlcyA9IHN0YXRlcy5tYXAgKHN0YXRlKS0+IHN0YXRlLnNsaWNlKDEpICMgUmVtb3ZlICckJyBwcmVmaXhcblx0X3N0eWxlcyA9IHN0b3JlIG9yIHt9XG5cdF9zdGF0ZVNoYXJlZCA9IF9wcm92aWRlZFN0YXRlc1NoYXJlZCA9IHVuZGVmaW5lZFxuXG5cdGJhc2UgPSBpZiBub3QgaGVscGVycy5pbmNsdWRlcyhzdGF0ZXMsICckYmFzZScpIHRoZW4gc3R5bGVzIGVsc2Ugc3R5bGVzLiRiYXNlXG5cdF9zdHlsZXMuYmFzZSA9IGhlbHBlcnMucmVnaXN0ZXJTdHlsZShiYXNlLCAwLCBmb3JjZVN0eWxlPUBvcHRpb25zLmZvcmNlU3R5bGUpXG5cblxuXHRpZiBzcGVjaWFsU3RhdGVzLmxlbmd0aFxuXHRcdGZsYXR0ZW5OZXN0ZWRTdGF0ZXMgPSAoc3R5bGVPYmplY3QsIGNoYWluLCBsZXZlbCktPlxuXHRcdFx0c3R5bGVLZXlzID0gT2JqZWN0LmtleXMoc3R5bGVPYmplY3QpXG5cdFx0XHRvdXRwdXQgPSB7fVxuXHRcdFx0aGFzTm9uU3RhdGVQcm9wcyA9IGZhbHNlXG5cdFx0XHRcblx0XHRcdGZvciBzdGF0ZSBpbiBzdHlsZUtleXNcblx0XHRcdFx0aWYgbm90IGhlbHBlcnMuaXNTdGF0ZVN0eWxlKHN0YXRlKVxuXHRcdFx0XHRcdGhhc05vblN0YXRlUHJvcHMgPSB0cnVlXG5cdFx0XHRcdFx0b3V0cHV0W3N0YXRlXSA9IHN0eWxlT2JqZWN0W3N0YXRlXVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0Y2hhaW4ucHVzaChzdGF0ZV8gPSBzdGF0ZS5zbGljZSgxKSlcblx0XHRcdFx0XHRzdGF0ZUNoYWluID0gbmV3IChfJHNtKCcuL3N0YXRlQ2hhaW4nICkpKGNoYWluKVxuXHRcdFx0XHRcdF9zdGF0ZVNoYXJlZCA/PSBbXVxuXHRcdFx0XHRcdF9wcm92aWRlZFN0YXRlc1NoYXJlZCA/PSBbXVxuXHRcdFx0XHRcdF9wcm92aWRlZFN0YXRlc1NoYXJlZC5wdXNoKHN0YXRlQ2hhaW4pXG5cdFx0XHRcdFx0X21lZGlhU3RhdGVzLnB1c2goc3RhdGVfKSBpZiBzdGF0ZVswXSBpcyAnQCdcblx0XHRcdFx0XHRfc3R5bGVzW3N0YXRlQ2hhaW4uc3RyaW5nXSA9IGhlbHBlcnMucmVnaXN0ZXJTdHlsZSBmbGF0dGVuTmVzdGVkU3RhdGVzKHN0eWxlT2JqZWN0W3N0YXRlXSwgY2hhaW4sIGxldmVsKzEpLCBsZXZlbCsxLCBmb3JjZVN0eWxlXG5cdFx0XHRcblx0XHRcdHJldHVybiBpZiBoYXNOb25TdGF0ZVByb3BzIHRoZW4gb3V0cHV0XG5cblx0XHRmb3Igc3RhdGUgaW4gc3BlY2lhbFN0YXRlc1xuXHRcdFx0c3RhdGVfID0gc3RhdGUuc2xpY2UoMSlcblx0XHRcdFxuXHRcdFx0c3RhdGVTdHlsZXMgPSBmbGF0dGVuTmVzdGVkU3RhdGVzKHN0eWxlc1tzdGF0ZV0sIFtzdGF0ZV9dLCAxKVxuXHRcdFx0X3N0eWxlc1tzdGF0ZV9dID0gaGVscGVycy5yZWdpc3RlclN0eWxlKHN0YXRlU3R5bGVzLCAxKSBpZiBzdGF0ZVN0eWxlc1xuXG5cblx0cmV0dXJuIHtfc3R5bGVzLCBfbWVkaWFTdGF0ZXMsIF9zdGF0ZVNoYXJlZCwgX3Byb3ZpZGVkU3RhdGVzLCBfcHJvdmlkZWRTdGF0ZXNTaGFyZWR9XG5cblxuXG5RdWlja0VsZW1lbnQ6Ol9wYXJzZVRleHRzID0gKHRleHRzLCBzdG9yZSktPlxuXHRyZXR1cm4gaWYgbm90IElTLm9iamVjdFBsYWluKHRleHRzKVxuXHRzdGF0ZXMgPSBPYmplY3Qua2V5cyh0ZXh0cykubWFwIChzdGF0ZSktPiBzdGF0ZS5zbGljZSgxKVxuXHRfcHJvdmlkZWRTdGF0ZXMgPSBzdGF0ZXMuZmlsdGVyIChzdGF0ZSktPiBzdGF0ZSBpc250ICdiYXNlJ1xuXHRfdGV4dHMgPSBzdG9yZSBvciB7fVxuXHRfdGV4dHMgPSBiYXNlOicnXG5cdF90ZXh0c1tzdGF0ZV0gPSB0ZXh0c1snJCcrc3RhdGVdIGZvciBzdGF0ZSBpbiBzdGF0ZXNcblx0XG5cdHJldHVybiB7X3RleHRzLCBfcHJvdmlkZWRTdGF0ZXN9XG5cblxuUXVpY2tFbGVtZW50OjpfYXBwbHlPcHRpb25zID0gKCktPlxuXHRpZiByZWY9KEBvcHRpb25zLmlkIG9yIEBvcHRpb25zLnJlZikgdGhlbiBAYXR0cignZGF0YS1yZWYnLCBAcmVmPXJlZilcblx0aWYgQG9wdGlvbnMuaWQgdGhlbiBAZWwuaWQgPSBAb3B0aW9ucy5pZFxuXHRpZiBAb3B0aW9ucy5jbGFzc05hbWUgdGhlbiBAZWwuY2xhc3NOYW1lID0gQG9wdGlvbnMuY2xhc3NOYW1lXG5cdGlmIEBvcHRpb25zLnNyYyB0aGVuIEBlbC5zcmMgPSBAb3B0aW9ucy5zcmNcblx0aWYgQG9wdGlvbnMuaHJlZiB0aGVuIEBlbC5ocmVmID0gQG9wdGlvbnMuaHJlZlxuXHRpZiBAb3B0aW9ucy50eXBlIHRoZW4gQGVsLnR5cGUgPSBAb3B0aW9ucy50eXBlXG5cdGlmIEBvcHRpb25zLm5hbWUgdGhlbiBAZWwubmFtZSA9IEBvcHRpb25zLm5hbWVcblx0aWYgQG9wdGlvbnMudmFsdWUgdGhlbiBAZWwudmFsdWUgPSBAb3B0aW9ucy52YWx1ZVxuXHRpZiBAb3B0aW9ucy5zZWxlY3RlZCB0aGVuIEBlbC5zZWxlY3RlZCA9IEBvcHRpb25zLnNlbGVjdGVkXG5cdGlmIEBvcHRpb25zLmNoZWNrZWQgdGhlbiBAZWwuY2hlY2tlZCA9IEBvcHRpb25zLmNoZWNrZWRcblx0aWYgQG9wdGlvbnMucHJvcHMgdGhlbiBAcHJvcChAb3B0aW9ucy5wcm9wcylcblx0aWYgQG9wdGlvbnMuYXR0cnMgdGhlbiBAYXR0cihAb3B0aW9ucy5hdHRycylcblx0QF9hcHBseVJlZ2lzdGVyZWRTdHlsZShAX3N0eWxlcy5iYXNlLCBudWxsLCBudWxsLCBAb3B0aW9ucy5zdHlsZUFmdGVySW5zZXJ0KVxuXHRAdGV4dCA9IEBfdGV4dHMuYmFzZSBpZiBAX3RleHRzXG5cblx0QG9uKCdpbnNlcnRlZCcsIENBQ0hFRF9GTl9JTlNFUlRFRCwgZmFsc2UsIHRydWUpXG5cblx0aWYgQG9wdGlvbnMuaW52b2tlQ29tcHV0ZXJzT25jZVxuXHRcdEBfaW52b2tlZENvbXB1dGVycyA9IHt9XG5cdFxuXHRpZiBAb3B0aW9ucy5yZWNhbGNPblJlc2l6ZVxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyICdyZXNpemUnLCAoKT0+IEByZWNhbGNTdHlsZSgpXG5cblx0aWYgQG9wdGlvbnMuZXZlbnRzXG5cdFx0QG9uKGV2ZW50LCBoYW5kbGVyKSBmb3IgZXZlbnQsaGFuZGxlciBvZiBAb3B0aW9ucy5ldmVudHNcblxuXHRpZiBAb3B0aW9ucy5tZXRob2RzXG5cdFx0Zm9yIG1ldGhvZCx2YWx1ZSBvZiBAb3B0aW9ucy5tZXRob2RzIHdoZW4gbm90IEBbbWV0aG9kXVxuXHRcdFx0aWYgSVMuZnVuY3Rpb24odmFsdWUpXG5cdFx0XHRcdEBbbWV0aG9kXSA9IHZhbHVlXG5cdFx0XHRlbHNlIGlmIElTLm9iamVjdCh2YWx1ZSlcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIG1ldGhvZCwge2NvbmZpZ3VyYWJsZTp0cnVlLCBnZXQ6dmFsdWUuZ2V0LCBzZXQ6dmFsdWUuc2V0fVxuXG5cdGlmIEB0eXBlIGlzbnQgJ3RleHQnIGFuZCBJUy5vYmplY3QoQG9wdGlvbnMudGV4dClcblx0XHRAYXBwZW5kIFF1aWNrRG9tKCd0ZXh0JywgdGV4dDpAb3B0aW9ucy50ZXh0KVxuXHRyZXR1cm5cblxuXG5RdWlja0VsZW1lbnQ6Ol9wb3N0Q3JlYXRpb24gPSAoZGF0YSktPlxuXHRpZiBAb3B0aW9ucy5jb21wdXRlcnNcblx0XHRkYXRhID0gZXh0ZW5kLmNsb25lKEBvcHRpb25zLmRhdGEsIGRhdGEpIGlmIGRhdGEgYW5kIEBvcHRpb25zLmRhdGFcblx0XHRkYXRhIHx8PSBAb3B0aW9ucy5kYXRhXG5cdFx0QGFwcGx5RGF0YShkYXRhLCBmYWxzZSlcblx0XHRcblx0XHRpZiBAb3B0aW9ucy5jb21wdXRlcnMuX2luaXRcblx0XHRcdEBfcnVuQ29tcHV0ZXIoJ19pbml0JywgZGF0YSlcblxuXHRpZiBAb3B0aW9ucy5zdGF0ZVxuXHRcdEBzdGF0ZShAb3B0aW9ucy5zdGF0ZSlcblx0XG5cdHJldHVyblxuXG5cblF1aWNrRWxlbWVudDo6X2F0dGFjaFN0YXRlRXZlbnRzID0gKGZvcmNlKS0+XG5cdHN0YXRlcyA9IE9iamVjdC5rZXlzKEBvcHRpb25zLnN0YXRlVHJpZ2dlcnMpXG5cdHN0YXRlcy5mb3JFYWNoIChzdGF0ZSk9PlxuXHRcdHRyaWdnZXIgPSBAb3B0aW9ucy5zdGF0ZVRyaWdnZXJzW3N0YXRlXVx0XG5cdFx0cmV0dXJuIGlmIG5vdCBoZWxwZXJzLmluY2x1ZGVzKEBfcHJvdmlkZWRTdGF0ZXMsIHN0YXRlKSBhbmQgbm90IGZvcmNlIGFuZCBub3QgdHJpZ2dlci5mb3JjZVxuXHRcdGVuYWJsZXIgPSBpZiBJUy5zdHJpbmcodHJpZ2dlcikgdGhlbiB0cmlnZ2VyIGVsc2UgdHJpZ2dlci5vblxuXHRcdGRpc2FibGVyID0gdHJpZ2dlci5vZmYgaWYgSVMub2JqZWN0KHRyaWdnZXIpXG5cblx0XHRAX2xpc3RlblRvIGVuYWJsZXIsICgpPT4gQHN0YXRlKHN0YXRlLCBvbiwgdHJpZ2dlci5idWJibGVzKVxuXHRcdGlmIGRpc2FibGVyIHRoZW4gQF9saXN0ZW5UbyBkaXNhYmxlciwgKCk9PiBAc3RhdGUoc3RhdGUsIG9mZiwgdHJpZ2dlci5idWJibGVzKVxuXHRcblx0cmV0dXJuXG5cblxuXG5RdWlja0VsZW1lbnQ6Ol9wcm94eVBhcmVudCA9ICgpLT5cblx0cGFyZW50ID0gdW5kZWZpbmVkXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCAnX3BhcmVudCcsXG5cdFx0Z2V0OiAoKS0+IHBhcmVudFxuXHRcdHNldDogKG5ld1BhcmVudCktPiBpZiBwYXJlbnQ9bmV3UGFyZW50XG5cdFx0XHRsYXN0UGFyZW50ID0gQHBhcmVudHMuc2xpY2UoLTEpWzBdXG5cdFx0XHRpZiBsYXN0UGFyZW50LnJhdyBpcyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcblx0XHRcdFx0QF91bnByb3h5UGFyZW50KG5ld1BhcmVudClcblx0XHRcdGVsc2Vcblx0XHRcdFx0cGFyZW50Lm9uICdpbnNlcnRlZCcsICgpPT5cblx0XHRcdFx0XHRAX3VucHJveHlQYXJlbnQobmV3UGFyZW50KSBpZiBwYXJlbnQgaXMgbmV3UGFyZW50XG5cdFx0XHRyZXR1cm5cblxuXG5RdWlja0VsZW1lbnQ6Ol91bnByb3h5UGFyZW50ID0gKG5ld1BhcmVudCktPlxuXHRkZWxldGUgQF9wYXJlbnRcblx0QF9wYXJlbnQgPSBuZXdQYXJlbnRcblx0QGVtaXRQcml2YXRlKCdpbnNlcnRlZCcsIG5ld1BhcmVudClcblx0cmV0dXJuXG5cblxuXG5DQUNIRURfRk5fSU5TRVJURUQgPSAoKS0+XG5cdEBfaW5zZXJ0ZWQgPSBAXG5cdEByZWNhbGNTdHlsZSgpIGlmIEBvcHRpb25zLnN0eWxlQWZ0ZXJJbnNlcnRcblxuXHRpZiAobWVkaWFTdGF0ZXM9QF9tZWRpYVN0YXRlcykgYW5kIEBfbWVkaWFTdGF0ZXMubGVuZ3RoXG5cdFx0QF9tZWRpYVN0YXRlcyA9IE9iamVjdC5jcmVhdGUobnVsbClcblx0XHRcblx0XHRmb3IgcXVlcnlTdHJpbmcgaW4gbWVkaWFTdGF0ZXNcblx0XHRcdEBfbWVkaWFTdGF0ZXNbcXVlcnlTdHJpbmddID0gTWVkaWFRdWVyeS5yZWdpc3RlcihALCBxdWVyeVN0cmluZylcblxuXG5cblxuXG5cblxuXG4iXX0=
;

var regexWhitespace;

regexWhitespace = /\s+/;

QuickElement.prototype.on = function(eventNames, callback, useCapture, isPrivate) {
  var callbackRef, split;
  if (this._eventCallbacks == null) {
    this._eventCallbacks = {
      __refs: {}
    };
  }
  if (IS.string(eventNames) && IS["function"](callback)) {
    split = eventNames.split('.');
    callbackRef = split[1];
    eventNames = split[0];
    if (eventNames === 'inserted' && this._inserted) {
      callback.call(this, this._parent);
      return this;
    }
    eventNames.split(regexWhitespace).forEach((function(_this) {
      return function(eventName) {
        if (!_this._eventCallbacks[eventName]) {
          _this._eventCallbacks[eventName] = [];
          if (!isPrivate) {
            _this._listenTo(eventName, function(event) {
              return _this._invokeHandlers(eventName, event);
            }, useCapture);
          }
        }
        if (callbackRef) {
          _this._eventCallbacks.__refs[callbackRef] = callback;
        }
        return _this._eventCallbacks[eventName].push(callback);
      };
    })(this));
  }
  return this;
};

QuickElement.prototype.once = function(eventNames, callback) {
  var onceCallback;
  if (IS.string(eventNames) && IS["function"](callback)) {
    this.on(eventNames, onceCallback = (function(_this) {
      return function(event) {
        _this.off(eventNames, onceCallback);
        return callback.call(_this, event);
      };
    })(this));
  }
  return this;
};

QuickElement.prototype.off = function(eventNames, callback) {
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
    eventNames.split(regexWhitespace).forEach((function(_this) {
      return function(eventName) {
        if (_this._eventCallbacks[eventName]) {
          if (callback == null) {
            callback = _this._eventCallbacks.__refs[callbackRef];
          }
          if (IS["function"](callback)) {
            return helpers.removeItem(_this._eventCallbacks[eventName], callback);
          } else if (!callbackRef) {
            return _this._eventCallbacks[eventName].length = 0;
          }
        }
      };
    })(this));
  }
  return this;
};

QuickElement.prototype.emit = function(eventName, bubbles, cancelable, data) {
  var event;
  if (bubbles == null) {
    bubbles = true;
  }
  if (cancelable == null) {
    cancelable = true;
  }
  if (eventName && IS.string(eventName)) {
    event = document.createEvent('Event');
    event.initEvent(eventName, bubbles, cancelable);
    if (data && typeof data === 'object') {
      extend(event, data);
    }
    this.el.dispatchEvent(event);
  }
  return this;
};

QuickElement.prototype.emitPrivate = function(eventName, arg) {
  var ref;
  if (eventName && IS.string(eventName) && ((ref = this._eventCallbacks) != null ? ref[eventName] : void 0)) {
    this._invokeHandlers(eventName, arg);
  }
  return this;
};

QuickElement.prototype._invokeHandlers = function(eventName, arg) {
  var callbacks, cb, i, len;
  callbacks = this._eventCallbacks[eventName].slice();
  for (i = 0, len = callbacks.length; i < len; i++) {
    cb = callbacks[i];
    cb.call(this, arg);
  }
};


/* istanbul ignore next */

QuickElement.prototype._listenTo = function(eventName, callback, useCapture) {
  var eventNameToListenFor, listenMethod;
  listenMethod = this.el.addEventListener ? 'addEventListener' : 'attachEvent';
  eventNameToListenFor = this.el.addEventListener ? eventName : "on" + eventName;
  this.el[listenMethod](eventNameToListenFor, callback, useCapture);
  return this;
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXZlbnRzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLGVBQUEsR0FBa0I7O0FBRWxCLFlBQVksQ0FBQSxTQUFFLENBQUEsRUFBZCxHQUFtQixTQUFDLFVBQUQsRUFBYSxRQUFiLEVBQXVCLFVBQXZCLEVBQW1DLFNBQW5DO0FBQ2xCLE1BQUE7O0lBQUEsSUFBQyxDQUFBLGtCQUFtQjtNQUFDLE1BQUEsRUFBTyxFQUFSOzs7RUFFcEIsSUFBRyxFQUFFLENBQUMsTUFBSCxDQUFVLFVBQVYsQ0FBQSxJQUEwQixFQUFFLEVBQUMsUUFBRCxFQUFGLENBQVksUUFBWixDQUE3QjtJQUNDLEtBQUEsR0FBUSxVQUFVLENBQUMsS0FBWCxDQUFpQixHQUFqQjtJQUNSLFdBQUEsR0FBYyxLQUFNLENBQUEsQ0FBQTtJQUNwQixVQUFBLEdBQWEsS0FBTSxDQUFBLENBQUE7SUFFbkIsSUFBRyxVQUFBLEtBQWMsVUFBZCxJQUE2QixJQUFDLENBQUEsU0FBakM7TUFDQyxRQUFRLENBQUMsSUFBVCxDQUFjLElBQWQsRUFBaUIsSUFBQyxDQUFBLE9BQWxCO0FBQ0EsYUFBTyxLQUZSOztJQUlBLFVBQVUsQ0FBQyxLQUFYLENBQWlCLGVBQWpCLENBQWlDLENBQUMsT0FBbEMsQ0FBMEMsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLFNBQUQ7UUFDekMsSUFBRyxDQUFJLEtBQUMsQ0FBQSxlQUFnQixDQUFBLFNBQUEsQ0FBeEI7VUFDQyxLQUFDLENBQUEsZUFBZ0IsQ0FBQSxTQUFBLENBQWpCLEdBQThCO1VBRTlCLElBQUEsQ0FBTyxTQUFQO1lBQXNCLEtBQUMsQ0FBQSxTQUFELENBQVcsU0FBWCxFQUFzQixTQUFDLEtBQUQ7cUJBQzNDLEtBQUMsQ0FBQSxlQUFELENBQWlCLFNBQWpCLEVBQTRCLEtBQTVCO1lBRDJDLENBQXRCLEVBRXBCLFVBRm9CLEVBQXRCO1dBSEQ7O1FBT0EsSUFB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QUFaO0FBQzNCLE1BQUE7RUFBQSxJQUFHLFNBQUEsSUFBYyxFQUFFLENBQUMsTUFBSCxDQUFVLFNBQVYsQ0FBZCwrQ0FBeUQsQ0FBQSxTQUFBLFdBQTVEO0lBQ0MsSUFBQyxDQUFBLGVBQUQsQ0FBaUIsU0FBakIsRUFBNEIsR0FBNUIsRUFERDs7QUFHQSxTQUFPO0FBSm9COztBQVE1QixZQUFZLENBQUEsU0FBRSxDQUFBLGVBQWQsR0FBZ0MsU0FBQyxTQUFELEVBQVksR0FBWjtBQUMvQixNQUFBO0VBQUEsU0FBQSxHQUFZLElBQUMsQ0FBQSxlQUFnQixDQUFBLFNBQUEsQ0FBVSxDQUFDLEtBQTVCLENBQUE7QUFDWixPQUFBLDJDQUFBOztJQUFBLEVBQUUsQ0FBQyxJQUFILENBQVEsSUFBUixFQUFXLEdBQVg7QUFBQTtBQUYrQjs7O0FBTWhDOztBQUNBLFlBQVksQ0FBQSxTQUFFLENBQUEsU0FBZCxHQUEwQixTQUFDLFNBQUQsRUFBWSxRQUFaLEVBQXNCLFVBQXRCO0FBQ3pCLE1BQUE7RUFBQSxZQUFBLEdBQWtCLElBQUMsQ0FBQSxFQUFFLENBQUMsZ0JBQVAsR0FBNkIsa0JBQTdCLEdBQXFEO0VBQ3BFLG9CQUFBLEdBQTBCLElBQUMsQ0FBQSxFQUFFLENBQUMsZ0JBQVAsR0FBNkIsU0FBN0IsR0FBNEMsSUFBQSxHQUFLO0VBRXhFLElBQUMsQ0FBQSxFQUFHLENBQUEsWUFBQSxDQUFKLENBQWtCLG9CQUFsQixFQUF3QyxRQUF4QyxFQUFrRCxVQUFsRDtBQUNBLFNBQU87QUFMa0IiLCJzb3VyY2VzQ29udGVudCI6WyJyZWdleFdoaXRlc3BhY2UgPSAvXFxzKy9cblxuUXVpY2tFbGVtZW50OjpvbiA9IChldmVudE5hbWVzLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSwgaXNQcml2YXRlKS0+XG5cdEBfZXZlbnRDYWxsYmFja3MgPz0ge19fcmVmczp7fX1cblx0XG5cdGlmIElTLnN0cmluZyhldmVudE5hbWVzKSBhbmQgSVMuZnVuY3Rpb24oY2FsbGJhY2spXG5cdFx0c3BsaXQgPSBldmVudE5hbWVzLnNwbGl0KCcuJylcblx0XHRjYWxsYmFja1JlZiA9IHNwbGl0WzFdXG5cdFx0ZXZlbnROYW1lcyA9IHNwbGl0WzBdXG5cdFx0XG5cdFx0aWYgZXZlbnROYW1lcyBpcyAnaW5zZXJ0ZWQnIGFuZCBAX2luc2VydGVkXG5cdFx0XHRjYWxsYmFjay5jYWxsKEAsIEBfcGFyZW50KVxuXHRcdFx0cmV0dXJuIEBcblx0XHRcblx0XHRldmVudE5hbWVzLnNwbGl0KHJlZ2V4V2hpdGVzcGFjZSkuZm9yRWFjaCAoZXZlbnROYW1lKT0+XG5cdFx0XHRpZiBub3QgQF9ldmVudENhbGxiYWNrc1tldmVudE5hbWVdXG5cdFx0XHRcdEBfZXZlbnRDYWxsYmFja3NbZXZlbnROYW1lXSA9IFtdXHRcdFxuXHRcdFx0XHRcblx0XHRcdFx0dW5sZXNzIGlzUHJpdmF0ZSB0aGVuIEBfbGlzdGVuVG8gZXZlbnROYW1lLCAoZXZlbnQpPT5cblx0XHRcdFx0XHRAX2ludm9rZUhhbmRsZXJzKGV2ZW50TmFtZSwgZXZlbnQpXG5cdFx0XHRcdCwgdXNlQ2FwdHVyZVxuXG5cdFx0XHRAX2V2ZW50Q2FsbGJhY2tzLl9fcmVmc1tjYWxsYmFja1JlZl0gPSBjYWxsYmFjayBpZiBjYWxsYmFja1JlZlxuXHRcdFx0QF9ldmVudENhbGxiYWNrc1tldmVudE5hbWVdLnB1c2goY2FsbGJhY2spXG5cblx0cmV0dXJuIEBcblxuXG5RdWlja0VsZW1lbnQ6Om9uY2UgPSAoZXZlbnROYW1lcywgY2FsbGJhY2spLT5cblx0aWYgSVMuc3RyaW5nKGV2ZW50TmFtZXMpIGFuZCBJUy5mdW5jdGlvbihjYWxsYmFjaylcblx0XHRAb24gZXZlbnROYW1lcywgb25jZUNhbGxiYWNrPShldmVudCk9PlxuXHRcdFx0QG9mZihldmVudE5hbWVzLCBvbmNlQ2FsbGJhY2spXG5cdFx0XHRjYWxsYmFjay5jYWxsKEAsIGV2ZW50KVxuXHRcblx0cmV0dXJuIEBcblxuXG5cblF1aWNrRWxlbWVudDo6b2ZmID0gKGV2ZW50TmFtZXMsIGNhbGxiYWNrKS0+XG5cdEBfZXZlbnRDYWxsYmFja3MgPz0ge19fcmVmczp7fX1cblx0aWYgbm90IElTLnN0cmluZyhldmVudE5hbWVzKVxuXHRcdEBvZmYoZXZlbnROYW1lKSBmb3IgZXZlbnROYW1lIG9mIEBfZXZlbnRDYWxsYmFja3Ncblx0XG5cdGVsc2Vcblx0XHRzcGxpdCA9IGV2ZW50TmFtZXMuc3BsaXQoJy4nKVxuXHRcdGNhbGxiYWNrUmVmID0gc3BsaXRbMV1cblx0XHRldmVudE5hbWVzID0gc3BsaXRbMF1cblx0XHRldmVudE5hbWVzLnNwbGl0KHJlZ2V4V2hpdGVzcGFjZSkuZm9yRWFjaCAoZXZlbnROYW1lKT0+XG5cdFx0XHRpZiBAX2V2ZW50Q2FsbGJhY2tzW2V2ZW50TmFtZV1cblx0XHRcdFx0Y2FsbGJhY2sgPz0gQF9ldmVudENhbGxiYWNrcy5fX3JlZnNbY2FsbGJhY2tSZWZdXG5cblx0XHRcdFx0aWYgSVMuZnVuY3Rpb24oY2FsbGJhY2spXG5cdFx0XHRcdFx0aGVscGVycy5yZW1vdmVJdGVtKEBfZXZlbnRDYWxsYmFja3NbZXZlbnROYW1lXSwgY2FsbGJhY2spXG5cdFx0XHRcdGVsc2UgaWYgbm90IGNhbGxiYWNrUmVmXG5cdFx0XHRcdFx0QF9ldmVudENhbGxiYWNrc1tldmVudE5hbWVdLmxlbmd0aCA9IDBcblxuXHRyZXR1cm4gQFxuXG5cblxuUXVpY2tFbGVtZW50OjplbWl0ID0gKGV2ZW50TmFtZSwgYnViYmxlcz10cnVlLCBjYW5jZWxhYmxlPXRydWUsIGRhdGEpLT5cblx0aWYgZXZlbnROYW1lIGFuZCBJUy5zdHJpbmcoZXZlbnROYW1lKVxuXHRcdGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jylcblx0XHRldmVudC5pbml0RXZlbnQoZXZlbnROYW1lLCBidWJibGVzLCBjYW5jZWxhYmxlKVxuXHRcdGV4dGVuZChldmVudCwgZGF0YSkgaWYgZGF0YSBhbmQgdHlwZW9mIGRhdGEgaXMgJ29iamVjdCdcblx0XHRAZWwuZGlzcGF0Y2hFdmVudChldmVudClcblxuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6ZW1pdFByaXZhdGUgPSAoZXZlbnROYW1lLCBhcmcpLT5cblx0aWYgZXZlbnROYW1lIGFuZCBJUy5zdHJpbmcoZXZlbnROYW1lKSBhbmQgQF9ldmVudENhbGxiYWNrcz9bZXZlbnROYW1lXVxuXHRcdEBfaW52b2tlSGFuZGxlcnMoZXZlbnROYW1lLCBhcmcpXG5cdFxuXHRyZXR1cm4gQFxuXG5cblxuUXVpY2tFbGVtZW50OjpfaW52b2tlSGFuZGxlcnMgPSAoZXZlbnROYW1lLCBhcmcpLT5cblx0Y2FsbGJhY2tzID0gQF9ldmVudENhbGxiYWNrc1tldmVudE5hbWVdLnNsaWNlKClcblx0Y2IuY2FsbChALCBhcmcpIGZvciBjYiBpbiBjYWxsYmFja3Ncblx0cmV0dXJuXG5cblxuIyMjIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICMjI1xuUXVpY2tFbGVtZW50OjpfbGlzdGVuVG8gPSAoZXZlbnROYW1lLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSktPlxuXHRsaXN0ZW5NZXRob2QgPSBpZiBAZWwuYWRkRXZlbnRMaXN0ZW5lciB0aGVuICdhZGRFdmVudExpc3RlbmVyJyBlbHNlICdhdHRhY2hFdmVudCdcblx0ZXZlbnROYW1lVG9MaXN0ZW5Gb3IgPSBpZiBAZWwuYWRkRXZlbnRMaXN0ZW5lciB0aGVuIGV2ZW50TmFtZSBlbHNlIFwib24je2V2ZW50TmFtZX1cIlxuXHRcblx0QGVsW2xpc3Rlbk1ldGhvZF0oZXZlbnROYW1lVG9MaXN0ZW5Gb3IsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKVxuXHRyZXR1cm4gQFxuXG5cblxuXG4iXX0=
;

var DUMMY_ARRAY;

DUMMY_ARRAY = [];

QuickElement.prototype.state = function(targetState, value, bubbles, source) {
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
    desiredValue = !!value;
    activeStates = this._getActiveStates(targetState, false);
    if (this.state(targetState) !== desiredValue) {
      prop = this.type === 'text' ? 'Text' : 'Style';
      if (desiredValue) {
        this._state.push(targetState);
        toggle = 'ON';
      } else {
        helpers.removeItem(this._state, targetState);
        toggle = 'OFF';
      }
      this['_turn' + prop + toggle](targetState, activeStates);
      this.emitPrivate("stateChange:" + targetState, desiredValue);
    }
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

QuickElement.prototype.toggleState = function(targetState) {
  return this.state(targetState, !this.state(targetState));
};

QuickElement.prototype.resetState = function() {
  var activeState, j, len, ref;
  ref = this._state.slice();
  for (j = 0, len = ref.length; j < len; j++) {
    activeState = ref[j];
    this.state(activeState, false);
  }
  return this;
};

QuickElement.prototype.pipeState = function(targetEl) {
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

QuickElement.prototype._applyRegisteredStyle = function(targetStyle, superiorStates, includeBase, skipFns) {
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

QuickElement.prototype._removeRegisteredStyle = function(targetStyle, superiorStates, includeBase) {
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

QuickElement.prototype._turnStyleON = function(targetState, activeStates) {
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

QuickElement.prototype._turnStyleOFF = function(targetState, activeStates) {
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
        activeSharedStates = this._stateShared.filter(function(state) {
          return !helpers.includes(state, targetState);
        });
        activeStates = activeStates.concat(activeSharedStates);
      }
      this._removeRegisteredStyle(targetStyle, activeStates, true);
    }
  }
};

QuickElement.prototype._turnTextON = function(targetState, activeStates) {
  var superiorStates, targetText;
  if (this._texts && IS.string(targetText = this._texts[targetState])) {
    superiorStates = this._getSuperiorStates(targetState, activeStates);
    if (!superiorStates.length) {
      this.text = targetText;
    }
  }
};

QuickElement.prototype._turnTextOFF = function(targetState, activeStates) {
  var targetText;
  if (this._texts && IS.string(targetText = this._texts[targetState])) {
    activeStates = activeStates.filter(function(state) {
      return state !== targetState;
    });
    targetText = this._texts[activeStates[activeStates.length - 1]];
    if (targetText == null) {
      targetText = this._texts.base;
    }
    this.text = targetText;
  }
};

QuickElement.prototype._getActiveStates = function(stateToExclude, includeSharedStates) {
  var activeStates, j, len, plainStates, state;
  if (includeSharedStates == null) {
    includeSharedStates = true;
  }
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

QuickElement.prototype._getSuperiorStates = function(targetState, activeStates) {
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

QuickElement.prototype._getSharedStates = function(targetState) {
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

QuickElement.prototype._resolveFnStyles = function(states, includeBase) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0ZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxXQUFBLEdBQWM7O0FBR2QsWUFBWSxDQUFBLFNBQUUsQ0FBQSxLQUFkLEdBQXNCLFNBQUMsV0FBRCxFQUFjLEtBQWQsRUFBcUIsT0FBckIsRUFBOEIsTUFBOUI7QUFDckIsTUFBQTtFQUFBLElBQUcsU0FBUyxDQUFDLE1BQVYsS0FBb0IsQ0FBdkI7QUFDQyxXQUFPLElBQUMsQ0FBQSxNQUFNLENBQUMsS0FBUixDQUFBLEVBRFI7O0VBR0EsSUFBRyxTQUFTLENBQUMsTUFBVixLQUFvQixDQUF2QjtJQUNDLElBQUcsRUFBRSxDQUFDLE1BQUgsQ0FBVSxXQUFWLENBQUg7QUFDQyxhQUFPLE9BQU8sQ0FBQyxRQUFSLENBQWlCLElBQUMsQ0FBQSxNQUFsQixFQUEwQixXQUExQixFQURSO0tBQUEsTUFHSyxJQUFHLEVBQUUsQ0FBQyxNQUFILENBQVUsV0FBVixDQUFIO01BQ0osSUFBQSxHQUFPLE1BQU0sQ0FBQyxJQUFQLENBQVksV0FBWjtNQUNQLENBQUEsR0FBSSxDQUFDO0FBQ3lCLGFBQU0sR0FBQSxHQUFJLElBQUssQ0FBQSxFQUFFLENBQUYsQ0FBZjtRQUE5QixJQUFDLENBQUEsS0FBRCxDQUFPLEdBQVAsRUFBWSxXQUFZLENBQUEsR0FBQSxDQUF4QjtNQUE4QjtBQUM5QixhQUFPLEtBSkg7S0FKTjtHQUFBLE1BVUssSUFBRyxJQUFDLENBQUEsZ0JBQUQsSUFBc0IsTUFBQSxLQUFZLElBQXJDO0lBQ0osSUFBQyxDQUFBLGdCQUFnQixDQUFDLEtBQWxCLENBQXdCLFdBQXhCLEVBQXFDLEtBQXJDLEVBQTRDLE9BQTVDLEVBQXFELElBQXJEO0FBQ0EsV0FBTyxLQUZIO0dBQUEsTUFJQSxJQUFHLEVBQUUsQ0FBQyxNQUFILENBQVUsV0FBVixDQUFIO0lBQ0osSUFBc0MsV0FBWSxDQUFBLENBQUEsQ0FBWixL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QSxTQUFPO0FBUjJCOztBQVduQyxZQUFZLENBQUEsU0FBRSxDQUFBLGdCQUFkLEdBQWlDLFNBQUMsV0FBRDtBQUNoQyxNQUFBO0VBQUEsWUFBQSxHQUFlLElBQUMsQ0FBQTtFQUNoQixZQUFBLEdBQWU7QUFFZjtBQUFBLE9BQUEscUNBQUE7O0lBQ0MsSUFBaUMsVUFBVSxDQUFDLFFBQVgsQ0FBb0IsV0FBcEIsQ0FBQSxJQUFxQyxVQUFVLENBQUMsWUFBWCxDQUF3QixXQUF4QixFQUFxQyxZQUFyQyxDQUF0RTtNQUFBLFlBQVksQ0FBQyxJQUFiLENBQWtCLFVBQWxCLEVBQUE7O0FBREQ7QUFHQSxTQUFPO0FBUHlCOztBQVVqQyxZQUFZLENBQUEsU0FBRSxDQUFBLGdCQUFkLEdBQWlDLFNBQUMsTUFBRCxFQUFTLFdBQVQ7QUFDaEMsTUFBQTtFQUFBLElBQW9DLFdBQXBDO0lBQUEsTUFBQSxHQUFTLENBQUMsTUFBRCxDQUFRLENBQUMsTUFBVCxDQUFnQixNQUFoQixFQUFUOztFQUNBLE1BQUEsR0FBUztBQUVULE9BQUEsd0NBQUE7O1FBQXlCLElBQUMsQ0FBQSxPQUFRLENBQUEsS0FBQSxDQUFULElBQW9CLElBQUMsQ0FBQSxPQUFRLENBQUEsS0FBQSxDQUFNLENBQUMsR0FBRyxDQUFDO0FBQ2hFO0FBQUEsV0FBQSx1Q0FBQTs7UUFBQSxNQUFPLENBQUEsS0FBTSxDQUFBLENBQUEsQ0FBTixDQUFQLEdBQW1CLEtBQU0sQ0FBQSxDQUFBO0FBQXpCOztBQUREO0FBR0EsU0FBTztBQVB5QiIsInNvdXJjZXNDb250ZW50IjpbIkRVTU1ZX0FSUkFZID0gW11cblxuXG5RdWlja0VsZW1lbnQ6OnN0YXRlID0gKHRhcmdldFN0YXRlLCB2YWx1ZSwgYnViYmxlcywgc291cmNlKS0+XG5cdGlmIGFyZ3VtZW50cy5sZW5ndGggaXMgMFxuXHRcdHJldHVybiBAX3N0YXRlLnNsaWNlKClcblx0XG5cdGlmIGFyZ3VtZW50cy5sZW5ndGggaXMgMVxuXHRcdGlmIElTLnN0cmluZyh0YXJnZXRTdGF0ZSlcblx0XHRcdHJldHVybiBoZWxwZXJzLmluY2x1ZGVzKEBfc3RhdGUsIHRhcmdldFN0YXRlKVxuXHRcdFxuXHRcdGVsc2UgaWYgSVMub2JqZWN0KHRhcmdldFN0YXRlKVxuXHRcdFx0a2V5cyA9IE9iamVjdC5rZXlzKHRhcmdldFN0YXRlKVxuXHRcdFx0aSA9IC0xXG5cdFx0XHRAc3RhdGUoa2V5LCB0YXJnZXRTdGF0ZVtrZXldKSB3aGlsZSBrZXk9a2V5c1srK2ldXG5cdFx0XHRyZXR1cm4gQFxuXG5cdGVsc2UgaWYgQF9zdGF0ZVBpcGVUYXJnZXQgYW5kIHNvdXJjZSBpc250IEBcblx0XHRAX3N0YXRlUGlwZVRhcmdldC5zdGF0ZSh0YXJnZXRTdGF0ZSwgdmFsdWUsIGJ1YmJsZXMsIEApXG5cdFx0cmV0dXJuIEBcblx0XG5cdGVsc2UgaWYgSVMuc3RyaW5nKHRhcmdldFN0YXRlKVxuXHRcdHRhcmdldFN0YXRlID0gdGFyZ2V0U3RhdGUuc2xpY2UoMSkgaWYgdGFyZ2V0U3RhdGVbMF0gaXMgJyQnXG5cdFx0cmV0dXJuIEAgaWYgdGFyZ2V0U3RhdGUgaXMgJ2Jhc2UnXG5cdFx0ZGVzaXJlZFZhbHVlID0gISF2YWx1ZSAjIENvbnZlcnQgdGhlIHZhbHVlIHRvIGEgYm9vbGVhblxuXHRcdGFjdGl2ZVN0YXRlcyA9IEBfZ2V0QWN0aXZlU3RhdGVzKHRhcmdldFN0YXRlLCBmYWxzZSlcblx0XHRcblx0XHQjID09PT0gVG9nZ2xlIHN0eWxlcyBmb3IgdGhpcyBzdGF0ZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0XHRpZiBAc3RhdGUodGFyZ2V0U3RhdGUpIGlzbnQgZGVzaXJlZFZhbHVlXG5cdFx0XHRwcm9wID0gaWYgQHR5cGUgaXMgJ3RleHQnIHRoZW4gJ1RleHQnIGVsc2UgJ1N0eWxlJ1xuXHRcdFxuXHRcdFx0aWYgZGVzaXJlZFZhbHVlICNpcyBvblxuXHRcdFx0XHRAX3N0YXRlLnB1c2godGFyZ2V0U3RhdGUpXG5cdFx0XHRcdHRvZ2dsZSA9ICdPTidcblx0XHRcdGVsc2Vcblx0XHRcdFx0aGVscGVycy5yZW1vdmVJdGVtKEBfc3RhdGUsIHRhcmdldFN0YXRlKVxuXHRcdFx0XHR0b2dnbGUgPSAnT0ZGJ1xuXHRcdFx0XG5cdFx0XHRAWydfdHVybicrcHJvcCt0b2dnbGVdKHRhcmdldFN0YXRlLCBhY3RpdmVTdGF0ZXMpXG5cdFx0XHRAZW1pdFByaXZhdGUgXCJzdGF0ZUNoYW5nZToje3RhcmdldFN0YXRlfVwiLCBkZXNpcmVkVmFsdWVcblxuXG5cdFx0IyA9PT09IFBhc3Mgc3RhdGUgdG8gcGFyZW50L2NoaWxkcmVuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRcdGlmIG5vdCBoZWxwZXJzLmluY2x1ZGVzKEBvcHRpb25zLnVucGFzc2FibGVTdGF0ZXMsIHRhcmdldFN0YXRlKVxuXHRcdFx0aWYgYnViYmxlc1xuXHRcdFx0XHRAX3BhcmVudC5zdGF0ZSh0YXJnZXRTdGF0ZSwgdmFsdWUsIHRydWUsIHNvdXJjZSBvciBAKSBpZiBAcGFyZW50XG5cdFx0XHRlbHNlIGlmIEBvcHRpb25zLnBhc3NTdGF0ZVRvQ2hpbGRyZW5cblx0XHRcdFx0Y2hpbGQuc3RhdGUodGFyZ2V0U3RhdGUsIHZhbHVlLCBmYWxzZSwgc291cmNlIG9yIEApIGZvciBjaGlsZCBpbiBAX2NoaWxkcmVuXG5cdFx0XG5cdFx0cmV0dXJuIEBcblxuXG5RdWlja0VsZW1lbnQ6OnRvZ2dsZVN0YXRlID0gKHRhcmdldFN0YXRlKS0+XG5cdEBzdGF0ZSh0YXJnZXRTdGF0ZSwgIUBzdGF0ZSh0YXJnZXRTdGF0ZSkpXG5cblxuUXVpY2tFbGVtZW50OjpyZXNldFN0YXRlID0gKCktPlxuXHRmb3IgYWN0aXZlU3RhdGUgaW4gQF9zdGF0ZS5zbGljZSgpXG5cdFx0QHN0YXRlKGFjdGl2ZVN0YXRlLCBvZmYpXG5cblx0cmV0dXJuIEBcblxuXG5RdWlja0VsZW1lbnQ6OnBpcGVTdGF0ZSA9ICh0YXJnZXRFbCktPlxuXHRpZiB0YXJnZXRFbFxuXHRcdHRhcmdldEVsID0gaGVscGVycy5ub3JtYWxpemVHaXZlbkVsKHRhcmdldEVsKVxuXG5cdFx0aWYgSVMucXVpY2tEb21FbCh0YXJnZXRFbCkgYW5kIHRhcmdldEVsIGlzbnQgQFxuXHRcdFx0QF9zdGF0ZVBpcGVUYXJnZXQgPSB0YXJnZXRFbFxuXHRcdFx0dGFyZ2V0RWwuc3RhdGUoYWN0aXZlU3RhdGUsIG9uKSBmb3IgYWN0aXZlU3RhdGUgaW4gQF9zdGF0ZVxuXG5cdGVsc2UgaWYgdGFyZ2V0RWwgaXMgZmFsc2Vcblx0XHRkZWxldGUgQF9zdGF0ZVBpcGVUYXJnZXRcblxuXHRyZXR1cm4gQFxuXG5cblxuXG5RdWlja0VsZW1lbnQ6Ol9hcHBseVJlZ2lzdGVyZWRTdHlsZSA9ICh0YXJnZXRTdHlsZSwgc3VwZXJpb3JTdGF0ZXMsIGluY2x1ZGVCYXNlLCBza2lwRm5zKS0+IGlmIHRhcmdldFN0eWxlXG5cdEBhZGRDbGFzcyhjbGFzc05hbWUpIGZvciBjbGFzc05hbWUgaW4gdGFyZ2V0U3R5bGUuY2xhc3NOYW1lXG5cdFxuXHRpZiB0YXJnZXRTdHlsZS5mbnMubGVuZ3RoIGFuZCBub3Qgc2tpcEZuc1xuXHRcdHN1cGVyaW9yU3R5bGVzID0gQF9yZXNvbHZlRm5TdHlsZXMoc3VwZXJpb3JTdGF0ZXMsIGluY2x1ZGVCYXNlKSBpZiBzdXBlcmlvclN0YXRlc1xuXHRcdFxuXHRcdGZvciBlbnRyeSBpbiB0YXJnZXRTdHlsZS5mbnNcblx0XHRcdEBzdHlsZShlbnRyeVswXSwgZW50cnlbMV0pIHVubGVzcyBzdXBlcmlvclN0eWxlcyBhbmQgc3VwZXJpb3JTdHlsZXNbZW50cnlbMF1dXG5cdFxuXHRyZXR1cm5cblxuXG5RdWlja0VsZW1lbnQ6Ol9yZW1vdmVSZWdpc3RlcmVkU3R5bGUgPSAodGFyZ2V0U3R5bGUsIHN1cGVyaW9yU3RhdGVzLCBpbmNsdWRlQmFzZSktPlxuXHRAcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSBmb3IgY2xhc3NOYW1lIGluIHRhcmdldFN0eWxlLmNsYXNzTmFtZVxuXG5cdGlmIHRhcmdldFN0eWxlLmZucy5sZW5ndGhcblx0XHRzdXBlcmlvclN0eWxlcyA9IEBfcmVzb2x2ZUZuU3R5bGVzKHN1cGVyaW9yU3RhdGVzLCBpbmNsdWRlQmFzZSkgaWYgc3VwZXJpb3JTdGF0ZXNcblx0XHRcblx0XHRmb3IgZW50cnkgaW4gdGFyZ2V0U3R5bGUuZm5zXG5cdFx0XHRyZXNldFZhbHVlID0gc3VwZXJpb3JTdHlsZXMgYW5kIHN1cGVyaW9yU3R5bGVzW2VudHJ5WzBdXSBvciBudWxsXG5cdFx0XHRAc3R5bGUoZW50cnlbMF0sIHJlc2V0VmFsdWUpXG5cblx0cmV0dXJuXG5cblxuXG5cblF1aWNrRWxlbWVudDo6X3R1cm5TdHlsZU9OID0gKHRhcmdldFN0YXRlLCBhY3RpdmVTdGF0ZXMpLT5cblx0c2tpcEZucyA9IEBvcHRpb25zLnN0eWxlQWZ0ZXJJbnNlcnQgYW5kIG5vdCBAX2luc2VydGVkXG5cdGlmIEBfc3R5bGVzW3RhcmdldFN0YXRlXVxuXHRcdEBfYXBwbHlSZWdpc3RlcmVkU3R5bGUoQF9zdHlsZXNbdGFyZ2V0U3RhdGVdLCBAX2dldFN1cGVyaW9yU3RhdGVzKHRhcmdldFN0YXRlLCBhY3RpdmVTdGF0ZXMpLCBmYWxzZSwgc2tpcEZucylcblxuXG5cdGlmIEBfcHJvdmlkZWRTdGF0ZXNTaGFyZWRcblx0XHRzaGFyZWRTdGF0ZXMgPSBAX2dldFNoYXJlZFN0YXRlcyh0YXJnZXRTdGF0ZSlcblx0XHRcblx0XHRmb3Igc3RhdGVDaGFpbiBpbiBzaGFyZWRTdGF0ZXNcblx0XHRcdEBfc3RhdGVTaGFyZWQucHVzaChzdGF0ZUNoYWluLnN0cmluZykgdW5sZXNzIGhlbHBlcnMuaW5jbHVkZXMoQF9zdGF0ZVNoYXJlZCwgc3RhdGVDaGFpbi5zdHJpbmcpXG5cdFx0XHRAX2FwcGx5UmVnaXN0ZXJlZFN0eWxlKEBfc3R5bGVzW3N0YXRlQ2hhaW4uc3RyaW5nXSwgbnVsbCwgbnVsbCwgc2tpcEZucylcblxuXHRyZXR1cm5cblxuXG5RdWlja0VsZW1lbnQ6Ol90dXJuU3R5bGVPRkYgPSAodGFyZ2V0U3RhdGUsIGFjdGl2ZVN0YXRlcyktPlxuXHRpZiBAX3N0eWxlc1t0YXJnZXRTdGF0ZV1cblx0XHRAX3JlbW92ZVJlZ2lzdGVyZWRTdHlsZShAX3N0eWxlc1t0YXJnZXRTdGF0ZV0sIGFjdGl2ZVN0YXRlcywgdHJ1ZSlcblxuXHRpZiBAX3Byb3ZpZGVkU3RhdGVzU2hhcmVkXG5cdFx0c2hhcmVkU3RhdGVzID0gQF9nZXRTaGFyZWRTdGF0ZXModGFyZ2V0U3RhdGUpXG5cdFx0cmV0dXJuIGlmIHNoYXJlZFN0YXRlcy5sZW5ndGggaXMgMFxuXG5cdFx0Zm9yIHN0YXRlQ2hhaW4gaW4gc2hhcmVkU3RhdGVzXG5cdFx0XHRoZWxwZXJzLnJlbW92ZUl0ZW0oQF9zdGF0ZVNoYXJlZCwgc3RhdGVDaGFpbi5zdHJpbmcpXG5cdFx0XHR0YXJnZXRTdHlsZSA9IEBfc3R5bGVzW3N0YXRlQ2hhaW4uc3RyaW5nXVxuXHRcdFx0XG5cdFx0XHRpZiB0YXJnZXRTdHlsZS5mbnMubGVuZ3RoIGFuZCBAX3N0YXRlU2hhcmVkLmxlbmd0aCBhbmQgbm90IGFjdGl2ZVNoYXJlZFN0YXRlc1xuXHRcdFx0XHRhY3RpdmVTaGFyZWRTdGF0ZXMgPSBAX3N0YXRlU2hhcmVkLmZpbHRlciAoc3RhdGUpLT4gbm90IGhlbHBlcnMuaW5jbHVkZXMoc3RhdGUsIHRhcmdldFN0YXRlKVxuXHRcdFx0XHRhY3RpdmVTdGF0ZXMgPSBhY3RpdmVTdGF0ZXMuY29uY2F0KGFjdGl2ZVNoYXJlZFN0YXRlcylcblx0XHRcdFxuXHRcdFx0QF9yZW1vdmVSZWdpc3RlcmVkU3R5bGUodGFyZ2V0U3R5bGUsIGFjdGl2ZVN0YXRlcywgdHJ1ZSlcblxuXHRyZXR1cm5cblxuXG5cblF1aWNrRWxlbWVudDo6X3R1cm5UZXh0T04gPSAodGFyZ2V0U3RhdGUsIGFjdGl2ZVN0YXRlcyktPlxuXHRpZiBAX3RleHRzIGFuZCBJUy5zdHJpbmcodGFyZ2V0VGV4dCA9IEBfdGV4dHNbdGFyZ2V0U3RhdGVdKVxuXHRcdHN1cGVyaW9yU3RhdGVzID0gQF9nZXRTdXBlcmlvclN0YXRlcyh0YXJnZXRTdGF0ZSwgYWN0aXZlU3RhdGVzKVxuXHRcdFxuXHRcdEB0ZXh0ID0gdGFyZ2V0VGV4dCB1bmxlc3Mgc3VwZXJpb3JTdGF0ZXMubGVuZ3RoXG5cdHJldHVyblxuXG5cblF1aWNrRWxlbWVudDo6X3R1cm5UZXh0T0ZGID0gKHRhcmdldFN0YXRlLCBhY3RpdmVTdGF0ZXMpLT5cblx0aWYgQF90ZXh0cyBhbmQgSVMuc3RyaW5nKHRhcmdldFRleHQgPSBAX3RleHRzW3RhcmdldFN0YXRlXSlcblx0XHRhY3RpdmVTdGF0ZXMgPSBhY3RpdmVTdGF0ZXMuZmlsdGVyIChzdGF0ZSktPiBzdGF0ZSBpc250IHRhcmdldFN0YXRlXG5cdFx0dGFyZ2V0VGV4dCA9IEBfdGV4dHNbYWN0aXZlU3RhdGVzW2FjdGl2ZVN0YXRlcy5sZW5ndGgtMV1dXG5cdFx0dGFyZ2V0VGV4dCA/PSBAX3RleHRzLmJhc2Vcblx0XHRcblx0XHRAdGV4dCA9IHRhcmdldFRleHRcblx0cmV0dXJuXG5cblxuXG5cblx0XG5cblxuXG5cblF1aWNrRWxlbWVudDo6X2dldEFjdGl2ZVN0YXRlcyA9IChzdGF0ZVRvRXhjbHVkZSwgaW5jbHVkZVNoYXJlZFN0YXRlcz10cnVlKS0+XG5cdHJldHVybiBEVU1NWV9BUlJBWSBpZiBub3QgQF9wcm92aWRlZFN0YXRlc1xuXHRhY3RpdmVTdGF0ZXMgPSBwbGFpblN0YXRlcyA9IEBfc3RhdGVcblx0aWYgc3RhdGVUb0V4Y2x1ZGVcblx0XHRwbGFpblN0YXRlcyA9IFtdXG5cdFx0cGxhaW5TdGF0ZXMucHVzaChzdGF0ZSkgZm9yIHN0YXRlIGluIGFjdGl2ZVN0YXRlcyB3aGVuIHN0YXRlIGlzbnQgc3RhdGVUb0V4Y2x1ZGVcblx0XG5cdGlmIG5vdCBpbmNsdWRlU2hhcmVkU3RhdGVzIG9yIG5vdCBAX3Byb3ZpZGVkU3RhdGVzU2hhcmVkXG5cdFx0cmV0dXJuIHBsYWluU3RhdGVzXG5cdGVsc2Vcblx0XHRyZXR1cm4gcGxhaW5TdGF0ZXMuY29uY2F0KEBfc3RhdGVTaGFyZWQpXG5cblxuUXVpY2tFbGVtZW50OjpfZ2V0U3VwZXJpb3JTdGF0ZXMgPSAodGFyZ2V0U3RhdGUsIGFjdGl2ZVN0YXRlcyktPlxuXHR0YXJnZXRTdGF0ZUluZGV4ID0gQF9wcm92aWRlZFN0YXRlcy5pbmRleE9mKHRhcmdldFN0YXRlKVxuXHRyZXR1cm4gRFVNTVlfQVJSQVkgaWYgdGFyZ2V0U3RhdGVJbmRleCBpcyBAX3Byb3ZpZGVkU3RhdGVzLmxlbmd0aCAtIDFcblx0XG5cdHN1cGVyaW9yID0gW11cblx0Zm9yIGNhbmRpZGF0ZSBpbiBhY3RpdmVTdGF0ZXNcblx0XHRzdXBlcmlvci5wdXNoKGNhbmRpZGF0ZSkgaWYgQF9wcm92aWRlZFN0YXRlcy5pbmRleE9mKGNhbmRpZGF0ZSkgPiB0YXJnZXRTdGF0ZUluZGV4XG5cblx0cmV0dXJuIHN1cGVyaW9yXG5cblxuUXVpY2tFbGVtZW50OjpfZ2V0U2hhcmVkU3RhdGVzID0gKHRhcmdldFN0YXRlKS0+XG5cdGFjdGl2ZVN0YXRlcyA9IEBfc3RhdGVcblx0c2hhcmVkU3RhdGVzID0gW11cblxuXHRmb3Igc3RhdGVDaGFpbiBpbiBAX3Byb3ZpZGVkU3RhdGVzU2hhcmVkXG5cdFx0c2hhcmVkU3RhdGVzLnB1c2goc3RhdGVDaGFpbikgaWYgc3RhdGVDaGFpbi5pbmNsdWRlcyh0YXJnZXRTdGF0ZSkgYW5kIHN0YXRlQ2hhaW4uaXNBcHBsaWNhYmxlKHRhcmdldFN0YXRlLCBhY3RpdmVTdGF0ZXMpXG5cblx0cmV0dXJuIHNoYXJlZFN0YXRlc1xuXG5cblF1aWNrRWxlbWVudDo6X3Jlc29sdmVGblN0eWxlcyA9IChzdGF0ZXMsIGluY2x1ZGVCYXNlKS0+XG5cdHN0YXRlcyA9IFsnYmFzZSddLmNvbmNhdChzdGF0ZXMpIGlmIGluY2x1ZGVCYXNlXG5cdG91dHB1dCA9IHt9XG5cdFxuXHRmb3Igc3RhdGUgaW4gc3RhdGVzIHdoZW4gQF9zdHlsZXNbc3RhdGVdIGFuZCBAX3N0eWxlc1tzdGF0ZV0uZm5zLmxlbmd0aFxuXHRcdG91dHB1dFtlbnRyeVswXV0gPSBlbnRyeVsxXSBmb3IgZW50cnkgaW4gQF9zdHlsZXNbc3RhdGVdLmZuc1xuXG5cdHJldHVybiBvdXRwdXRcblxuXG5cblxuXG5cblxuXG5cbiJdfQ==
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

QuickElement.prototype.style = function(property) {
  var args, i, key, keys, result, value;
  if (this.type === 'text') {
    return;
  }
  args = arguments;
  if (IS.string(property)) {
    value = typeof args[1] === 'function' ? args[1].call(this, this.related) : args[1];
    if (args[1] === null && IS.defined(this.currentStateStyle(property)) && !IS["function"](this.currentStateStyle(property))) {
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

QuickElement.prototype.styleSafe = function(property, skipComputed) {
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

QuickElement.prototype.styleParsed = function(property, skipComputed) {
  return parseFloat(this.styleSafe(property, skipComputed));
};

QuickElement.prototype.recalcStyle = function(recalcChildren) {
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

QuickElement.prototype.currentStateStyle = function(property) {
  var i, state, states;
  if (property) {
    if (this._state.length) {
      states = this._state.slice();
      if (this._stateShared && this._stateShared.length) {
        states.push.apply(states, this._stateShared);
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

QuickElement.prototype.hide = function() {
  return this.style('display', 'none');
};

QuickElement.prototype.show = function(display) {
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
    get: function() {
      if (this.width > this.height) {
        return 'landscape';
      } else {
        return 'portrait';
      }
    }
  },
  'aspectRatio': aspectRatioGetter = {
    get: function() {
      return this.width / this.height;
    }
  },
  'rect': {
    get: function() {
      return this.el.getBoundingClientRect();
    }
  },
  'width': {
    get: function() {
      return parseFloat(this.style('width'));
    },
    set: function(value) {
      return this.style('width', value);
    }
  },
  'height': {
    get: function() {
      return parseFloat(this.style('height'));
    },
    set: function(value) {
      return this.style('height', value);
    }
  }
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHlsZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7QUFBQSxJQUFBOztBQVNBLFlBQVksQ0FBQSxTQUFFLENBQUEsS0FBZCxHQUFzQixTQUFDLFFBQUQ7QUFDckIsTUFBQTtFQUFBLElBQVUsSUFBQyxDQUFBLElBQUQsS0FBUyxNQUFuQjtBQUFBLFdBQUE7O0VBQ0EsSUFBQSxHQUFPO0VBRVAsSUFBRyxFQUFFLENBQUMsTUFBSCxDQUFVLFFBQVYsQ0FBSDtJQUNDLEtBQUEsR0FBVyxPQUFPLElBQUssQ0FBQSxDQUFBLENBQVosS0FBa0IsVUFBckIsR0FBcUMsSUFBSyxDQUFBLENBQUEsQ0FBRSxDQUFDLElBQVIsQ0FBYSxJQUFiLEVBQWdCLElBQUMsQ0FBQSxPQUFqQixDQUFyQyxHQUFvRSxJQUFLLENBQUEsQ0FBQTtJQUNqRixJQUFxQixJQUFLLENBQUEsQ0FBQSxDQUFMLEtBQVcsSUFBWCxJQUFvQixFQUFFLENBQUMsT0FBSCxDQUFXLElBQUMsQ0FBQSxpQkFBRCxDQUFtQixRQUFuQixDQUFYLENBQXBCLElBQWlFLENBQUksRUFBRSxFQUFDLFFBQUQsRUFBRixDQUFZLElBQUMsQ0FBQSxpQkFBRCxDQUFtQixRQUFuQixDQUFaLENBQTFGO01BQUEsS0FBQSxHQUFRLEdBQUcsQ0FBQyxNQUFaOztJQUNBLE1BQUEsR0FBUyxHQUFBLENBQUksSUFBQyxDQUFBLEVBQUwsRUFBUyxRQUFULEVBQW1CLEtBQW5CLEVBQTBCLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBbkM7SUFFVCxJQUFHLElBQUksQ0FBQyxNQUFMLEtBQWUsQ0FBbEI7O0FBQ0M7TUFDTyxJQUFHLElBQUMsQ0FBQSxTQUFKO2VBQW1CLE9BQW5CO09BQUEsTUFBK0IsSUFBRyxDQUFJLE1BQVA7ZUFBbUIsT0FBbkI7T0FBQSxNQUFBO2VBQStCLEdBQS9CO09BRnZDO0tBTEQ7R0FBQSxNQVNLLElBQUcs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RUFBZ0IsS0FBaEI7SUFBVixDQURMO0dBSkQ7RUFNQSxRQUFBLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFLLFVBQUEsQ0FBVyxJQUFDLENBQUEsS0FBRCxDQUFPLFFBQVAsQ0FBWDtJQUFMLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVUsSUFBQyxDQUFBLEtBQUQsQ0FBTyxRQUFQLEVBQWlCLEtBQWpCO0lBQVYsQ0FETDtHQVBEO0NBREQiLCJzb3VyY2VzQ29udGVudCI6WyIjIyMqXG4gKiBTZXRzL2dldHMgdGhlIHZhbHVlIG9mIGEgc3R5bGUgcHJvcGVydHkuIEluIGdldHRlciBtb2RlIHRoZSBjb21wdXRlZCBwcm9wZXJ0eSBvZlxuICogdGhlIHN0eWxlIHdpbGwgYmUgcmV0dXJuZWQgdW5sZXNzIHRoZSBlbGVtZW50IGlzIG5vdCBpbnNlcnRlZCBpbnRvIHRoZSBET00uIEluXG4gKiB3ZWJraXQgYnJvd3NlcnMgYWxsIGNvbXB1dGVkIHByb3BlcnRpZXMgb2YgYSBkZXRhY2hlZCBub2RlIGFyZSBhbHdheXMgYW4gZW1wdHlcbiAqIHN0cmluZyBidXQgaW4gZ2Vja28gdGhleSByZWZsZWN0IG9uIHRoZSBhY3R1YWwgY29tcHV0ZWQgdmFsdWUsIGhlbmNlIHdlIG5lZWRcbiAqIHRvIFwibm9ybWFsaXplXCIgdGhpcyBiZWhhdmlvciBhbmQgbWFrZSBzdXJlIHRoYXQgZXZlbiBvbiBnZWNrbyBhbiBlbXB0eSBzdHJpbmdcbiAqIGlzIHJldHVybmVkXG4gKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cbiMjI1xuUXVpY2tFbGVtZW50OjpzdHlsZSA9IChwcm9wZXJ0eSktPlxuXHRyZXR1cm4gaWYgQHR5cGUgaXMgJ3RleHQnXG5cdGFyZ3MgPSBhcmd1bWVudHNcblx0XG5cdGlmIElTLnN0cmluZyhwcm9wZXJ0eSlcblx0XHR2YWx1ZSA9IGlmIHR5cGVvZiBhcmdzWzFdIGlzICdmdW5jdGlvbicgdGhlbiBhcmdzWzFdLmNhbGwoQCwgQHJlbGF0ZWQpIGVsc2UgYXJnc1sxXVxuXHRcdHZhbHVlID0gQ1NTLlVOU0VUIGlmIGFyZ3NbMV0gaXMgbnVsbCBhbmQgSVMuZGVmaW5lZChAY3VycmVudFN0YXRlU3R5bGUocHJvcGVydHkpKSBhbmQgbm90IElTLmZ1bmN0aW9uKEBjdXJyZW50U3RhdGVTdHlsZShwcm9wZXJ0eSkpXG5cdFx0cmVzdWx0ID0gQ1NTKEBlbCwgcHJvcGVydHksIHZhbHVlLCBAb3B0aW9ucy5mb3JjZVN0eWxlKVxuXHRcdFxuXHRcdGlmIGFyZ3MubGVuZ3RoIGlzIDFcblx0XHRcdCMjIyBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAjIyNcblx0XHRcdHJldHVybiBpZiBAX2luc2VydGVkIHRoZW4gcmVzdWx0IGVsc2UgaWYgbm90IHJlc3VsdCB0aGVuIHJlc3VsdCBlbHNlICcnXG5cblx0ZWxzZSBpZiBJUy5vYmplY3QocHJvcGVydHkpXG5cdFx0a2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnR5KTsgaSA9IC0xXG5cdFx0QHN0eWxlKGtleSwgcHJvcGVydHlba2V5XSkgd2hpbGUga2V5PWtleXNbKytpXVxuXG5cdHJldHVybiBAXG5cblxuIyMjKlxuICogQXR0ZW1wdHMgdG8gcmVzb2x2ZSB0aGUgdmFsdWUgZm9yIGEgZ2l2ZW4gcHJvcGVydHkgaW4gdGhlIGZvbGxvd2luZyBvcmRlciBpZiBlYWNoIG9uZSBpc24ndCBhIHZhbGlkIHZhbHVlOlxuICogMS4gZnJvbSBjb21wdXRlZCBzdHlsZSAoZm9yIGRvbS1pbnNlcnRlZCBlbHMpXG4gKiAyLiBmcm9tIERPTUVsZW1lbnQuc3R5bGUgb2JqZWN0IChmb3Igbm9uLWluc2VydGVkIGVsczsgaWYgb3B0aW9ucy5zdHlsZUFmdGVySW5zZXJ0LCB3aWxsIG9ubHkgaGF2ZSBzdGF0ZSBzdHlsZXMpXG4gKiAzLiBmcm9tIHByb3ZpZGVkIHN0eWxlIG9wdGlvbnNcbiAqIChmb3Igbm9uLWluc2VydGVkIGVsczsgY2hlY2tpbmcgb25seSAkYmFzZSBzaW5jZSBzdGF0ZSBzdHlsZXMgd2lsbCBhbHdheXMgYmUgYXBwbGllZCB0byB0aGUgc3R5bGUgb2JqZWN0IGV2ZW4gZm9yIG5vbi1pbnNlcnRlZClcbiMjI1xuUXVpY2tFbGVtZW50OjpzdHlsZVNhZmUgPSAocHJvcGVydHksIHNraXBDb21wdXRlZCktPlxuXHRyZXR1cm4gaWYgQHR5cGUgaXMgJ3RleHQnXG5cdHNhbXBsZSA9IEBlbC5zdHlsZVtwcm9wZXJ0eV1cblxuXHRpZiBJUy5zdHJpbmcoc2FtcGxlKSBvciBJUy5udW1iZXIoc2FtcGxlKVxuXHRcdGNvbXB1dGVkID0gaWYgc2tpcENvbXB1dGVkIHRoZW4gMCBlbHNlIEBzdHlsZShwcm9wZXJ0eSlcblx0XHRyZXN1bHQgPSBjb21wdXRlZCBvciBAZWwuc3R5bGVbcHJvcGVydHldIG9yIEBjdXJyZW50U3RhdGVTdHlsZShwcm9wZXJ0eSkgb3IgJydcblx0XHRyZXR1cm4gaWYgdHlwZW9mIHJlc3VsdCBpcyAnZnVuY3Rpb24nIHRoZW4gcmVzdWx0LmNhbGwoQCwgQHJlbGF0ZWQpIGVsc2UgcmVzdWx0XG5cblx0cmV0dXJuIEBcblxuXG5RdWlja0VsZW1lbnQ6OnN0eWxlUGFyc2VkID0gKHByb3BlcnR5LCBza2lwQ29tcHV0ZWQpLT5cblx0cGFyc2VGbG9hdCBAc3R5bGVTYWZlKHByb3BlcnR5LCBza2lwQ29tcHV0ZWQpXG5cblxuUXVpY2tFbGVtZW50OjpyZWNhbGNTdHlsZSA9IChyZWNhbGNDaGlsZHJlbiktPlxuXHR0YXJnZXRTdHlsZXMgPSBAX3Jlc29sdmVGblN0eWxlcyhAX2dldEFjdGl2ZVN0YXRlcygpLCB0cnVlKVxuXG5cdEBzdHlsZSh0YXJnZXRTdHlsZXMpXG5cdFxuXHRpZiByZWNhbGNDaGlsZHJlblxuXHRcdGNoaWxkLnJlY2FsY1N0eWxlKCkgZm9yIGNoaWxkIGluIEBfY2hpbGRyZW5cblx0XG5cdHJldHVybiBAXG5cblxuUXVpY2tFbGVtZW50OjpjdXJyZW50U3RhdGVTdHlsZSA9IChwcm9wZXJ0eSktPiBpZiBwcm9wZXJ0eVxuXHRpZiBAX3N0YXRlLmxlbmd0aFxuXHRcdHN0YXRlcyA9IEBfc3RhdGUuc2xpY2UoKVxuXHRcdHN0YXRlcy5wdXNoKEBfc3RhdGVTaGFyZWQuLi4pIGlmIEBfc3RhdGVTaGFyZWQgYW5kIEBfc3RhdGVTaGFyZWQubGVuZ3RoXG5cdFx0aSA9IHN0YXRlcy5sZW5ndGhcblx0XHR3aGlsZSBzdGF0ZSA9IHN0YXRlc1stLWldXG5cdFx0XHRyZXR1cm4gQF9zdHlsZXNbc3RhdGVdLnJ1bGVbcHJvcGVydHldIGlmIEBfc3R5bGVzW3N0YXRlXSBhbmQgSVMuZGVmaW5lZChAX3N0eWxlc1tzdGF0ZV0ucnVsZVtwcm9wZXJ0eV0pXG5cblx0cmV0dXJuIEBfc3R5bGVzLmJhc2UucnVsZVtwcm9wZXJ0eV0gaWYgQF9zdHlsZXMuYmFzZVxuXG5cblF1aWNrRWxlbWVudDo6aGlkZSA9ICgpLT5cblx0QHN0eWxlICdkaXNwbGF5JywgJ25vbmUnXG5cblxuUXVpY2tFbGVtZW50OjpzaG93ID0gKGRpc3BsYXkpLT5cblx0aWYgbm90IGRpc3BsYXlcblx0XHRkaXNwbGF5ID0gQGN1cnJlbnRTdGF0ZVN0eWxlKCdkaXNwbGF5Jylcblx0XHRkaXNwbGF5ID0gJ2Jsb2NrJyBpZiBkaXNwbGF5IGlzICdub25lJyBvciBub3QgZGlzcGxheVxuXHRcblx0ZGlzcGxheSA/PSBAX3N0eWxlcy5iYXNlPy5kaXNwbGF5IG9yICdibG9jaydcblx0QHN0eWxlICdkaXNwbGF5JywgZGlzcGxheVxuXG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgUXVpY2tFbGVtZW50OjosXG5cdCdvcmllbnRhdGlvbic6IG9yaWVudGF0aW9uR2V0dGVyID0gZ2V0OiAoKS0+IGlmIEB3aWR0aCA+IEBoZWlnaHQgdGhlbiAnbGFuZHNjYXBlJyBlbHNlICdwb3J0cmFpdCdcblx0J2FzcGVjdFJhdGlvJzogYXNwZWN0UmF0aW9HZXR0ZXIgPSBnZXQ6ICgpLT4gQHdpZHRoL0BoZWlnaHRcblx0J3JlY3QnOiBnZXQ6ICgpLT4gQGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cdCd3aWR0aCc6XG5cdFx0Z2V0OiAoKS0+IHBhcnNlRmxvYXQgQHN0eWxlKCd3aWR0aCcpXG5cdFx0c2V0OiAodmFsdWUpLT4gQHN0eWxlICd3aWR0aCcsIHZhbHVlXG5cdCdoZWlnaHQnOlxuXHRcdGdldDogKCktPiBwYXJzZUZsb2F0IEBzdHlsZSgnaGVpZ2h0Jylcblx0XHRzZXQ6ICh2YWx1ZSktPiBAc3R5bGUgJ2hlaWdodCcsIHZhbHVlXG5cblxuIl19
;

QuickElement.prototype.attr = function(target, newValue) {
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

QuickElement.prototype.prop = function(target, newValue) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlcy1hbmQtcHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF0dHJpYnV0ZXMtYW5kLXByb3BlcnRpZXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQSxTQUFFLENBQUEsSUFBZCxHQUFxQixTQUFDLE1BQUQsRUFBUyxRQUFUO0FBQ3BCLE1BQUE7RUFBQSxJQUFHLFNBQVMsQ0FBQyxNQUFWLEtBQW9CLENBQXZCO0lBQ0MsSUFBRyxPQUFPLE1BQVAsS0FBaUIsUUFBcEI7QUFDQyxhQUFPLElBQUMsQ0FBQSxFQUFFLENBQUMsWUFBSixDQUFpQixNQUFqQixFQURSOztJQUdBLElBQUcsRUFBRSxDQUFDLE1BQUgsQ0FBVSxNQUFWLENBQUg7TUFDQyxJQUFBLEdBQU8sTUFBTSxDQUFDLElBQVAsQ0FBWSxNQUFaO01BQXFCLENBQUEsR0FBSSxDQUFDO0FBQ1QsYUFBTSxHQUFBLEdBQUksSUFBSyxDQUFBLEVBQUUsQ0FBRixDQUFmO1FBQXhCLElBQUMsQ0FBQSxJQUFELENBQU0sR0FBTixFQUFXLE1BQU8sQ0FBQSxHQUFBLENBQWxCO01BQXdCLENBRnpCO0tBSkQ7R0FBQSxNQVFLLElBQUcsUUFBQSxLQUFZLElBQWY7QUFDSixXQUFPLElBQUMsQ0FBQSxFQUFFLENBQUMsZUFBSixDQUFvQixNQUFwQixFQURIO0dBQUEsTUFBQTtJQUlKLElBQUMsQ0FBQSxFQUFFLENBQUMsWUFBSixDQUFpQixNQUFqQixFQUF5QixRQUF6QixFQUpJOztBQU1MLFNBQU87QUFmYTs7QUFtQnJCLFlBQVksQ0FBQSxTQUFFLENBQUEsSUFBZCxHQUFxQixTQUFDLE1BQUQsRUFBUyxRQUFUO0FBQ3BCLE1BQUE7RUFBQSxJQUFHLFNBQVMsQ0FBQyxNQUFWLEtBQW9CLENBQXZCO0lBQ0MsSUFBRyxPQUFPLE1BQVAsS0FBaUIsUUFBcEI7QUFDQyxhQUFPLElBQUMsQ0FBQSxFQUFHLENBQUEsTUFBQSxFQURaOztJQUdBLElBQUcsRUFBRSxDQUFDLE1BQUgsQ0FBVSxNQUFWLENBQUg7TUFDQyxJQUFBLEdBQU8sTUFBTSxDQUFDLElBQVAsQ0FBWSxNQUFaO01BQXFCLENBQUEsR0FBSSxDQUFDO0FBQ1QsYUFBTSxHQUFBLEdBQUksSUFBSyxDQUFBLEVBQUUsQ0FBRixDQUFmO1FBQXhCLElBQUMsQ0FBQSxJQUFELENBQU0sR0FBTixFQUFXLE1BQU8sQ0FBQSxHQUFBLENBQWxCO01BQXdCLENBRnpCO0tBSkQ7R0FBQSxNQUFBO0lBU0MsSUFBQyxDQUFBLEVBQUcsQ0FBQSxNQUFBLENBQUosR0FBYyxTQVRmOztBQVdBLFNBQU87QUFaYSIsInNvdXJjZXNDb250ZW50IjpbIlF1aWNrRWxlbWVudDo6YXR0ciA9ICh0YXJnZXQsIG5ld1ZhbHVlKS0+XG5cdGlmIGFyZ3VtZW50cy5sZW5ndGggaXMgMVxuXHRcdGlmIHR5cGVvZiB0YXJnZXQgaXMgJ3N0cmluZydcblx0XHRcdHJldHVybiBAZWwuZ2V0QXR0cmlidXRlKHRhcmdldClcblx0XG5cdFx0aWYgSVMub2JqZWN0KHRhcmdldClcblx0XHRcdGtleXMgPSBPYmplY3Qua2V5cyh0YXJnZXQpOyBpID0gLTFcblx0XHRcdEBhdHRyKGtleSwgdGFyZ2V0W2tleV0pIHdoaWxlIGtleT1rZXlzWysraV1cblxuXHRlbHNlIGlmIG5ld1ZhbHVlIGlzIG51bGxcblx0XHRyZXR1cm4gQGVsLnJlbW92ZUF0dHJpYnV0ZSh0YXJnZXQpXG5cblx0ZWxzZVxuXHRcdEBlbC5zZXRBdHRyaWJ1dGUodGFyZ2V0LCBuZXdWYWx1ZSlcblx0XG5cdHJldHVybiBAXG5cblxuXG5RdWlja0VsZW1lbnQ6OnByb3AgPSAodGFyZ2V0LCBuZXdWYWx1ZSktPlxuXHRpZiBhcmd1bWVudHMubGVuZ3RoIGlzIDFcblx0XHRpZiB0eXBlb2YgdGFyZ2V0IGlzICdzdHJpbmcnXG5cdFx0XHRyZXR1cm4gQGVsW3RhcmdldF1cblx0XG5cdFx0aWYgSVMub2JqZWN0KHRhcmdldClcblx0XHRcdGtleXMgPSBPYmplY3Qua2V5cyh0YXJnZXQpOyBpID0gLTFcblx0XHRcdEBwcm9wKGtleSwgdGFyZ2V0W2tleV0pIHdoaWxlIGtleT1rZXlzWysraV1cblx0XG5cdGVsc2Vcblx0XHRAZWxbdGFyZ2V0XSA9IG5ld1ZhbHVlXG5cdFx0XG5cdHJldHVybiBAIl19
;

QuickElement.prototype.toTemplate = function() {
  return QuickDom.template(this);
};

QuickElement.prototype.clone = function() {
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

QuickElement.prototype.append = function(targetEl) {
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
      targetEl._refreshParent();
    }
  }
  return this;
};

QuickElement.prototype.appendTo = function(targetEl) {
  if (targetEl) {
    targetEl = helpers.normalizeGivenEl(targetEl);
    if (IS.quickDomEl(targetEl)) {
      targetEl.append(this);
    }
  }
  return this;
};

QuickElement.prototype.prepend = function(targetEl) {
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
      targetEl._refreshParent();
    }
  }
  return this;
};

QuickElement.prototype.prependTo = function(targetEl) {
  if (targetEl) {
    targetEl = helpers.normalizeGivenEl(targetEl);
    if (IS.quickDomEl(targetEl)) {
      targetEl.prepend(this);
    }
  }
  return this;
};

QuickElement.prototype.after = function(targetEl) {
  var myIndex;
  if (targetEl && this.parent) {
    targetEl = helpers.normalizeGivenEl(targetEl);
    if (IS.quickDomEl(targetEl)) {
      myIndex = this.parent._children.indexOf(this);
      this.parent._children.splice(myIndex + 1, 0, targetEl);
      this.el.parentNode.insertBefore(targetEl.el, this.el.nextSibling);
      targetEl._refreshParent();
    }
  }
  return this;
};

QuickElement.prototype.insertAfter = function(targetEl) {
  if (targetEl) {
    targetEl = helpers.normalizeGivenEl(targetEl);
    if (IS.quickDomEl(targetEl)) {
      targetEl.after(this);
    }
  }
  return this;
};

QuickElement.prototype.before = function(targetEl) {
  var myIndex;
  if (targetEl && this.parent) {
    targetEl = helpers.normalizeGivenEl(targetEl);
    if (IS.quickDomEl(targetEl)) {
      myIndex = this.parent._children.indexOf(this);
      this.parent._children.splice(myIndex, 0, targetEl);
      this.el.parentNode.insertBefore(targetEl.el, this.el);
      targetEl._refreshParent();
    }
  }
  return this;
};

QuickElement.prototype.insertBefore = function(targetEl) {
  if (targetEl) {
    targetEl = helpers.normalizeGivenEl(targetEl);
    if (IS.quickDomEl(targetEl)) {
      targetEl.before(this);
    }
  }
  return this;
};

QuickElement.prototype.detach = function() {
  var ref;
  if ((ref = this.parent) != null) {
    ref._removeChild(this);
  }
  return this;
};

QuickElement.prototype.remove = function() {
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

QuickElement.prototype.empty = function() {
  var child, i, len, ref;
  ref = this.children.slice();
  for (i = 0, len = ref.length; i < len; i++) {
    child = ref[i];
    this._removeChild(child);
  }
  return this;
};

QuickElement.prototype.wrap = function(targetEl) {
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

QuickElement.prototype.unwrap = function() {
  var grandParent, parent, parentChildren, parentSibling;
  parent = this.parent;
  if (parent) {
    parentChildren = QuickDom.batch(parent.children);
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

QuickElement.prototype.replace = function(targetEl) {
  var ref;
  if (targetEl) {
    targetEl = helpers.normalizeGivenEl(targetEl);
    if (IS.quickDomEl(targetEl) && targetEl !== this) {
      targetEl.detach();
      if ((ref = this.parent) != null) {
        ref._removeChild(this, targetEl);
      }
      targetEl._refreshParent();
    }
  }
  return this;
};

QuickElement.prototype.hasClass = function(target) {
  return helpers.includes(this.classList, target);
};

QuickElement.prototype.addClass = function(target) {
  var classList, targetIndex;
  classList = this.classList;
  targetIndex = classList.indexOf(target);
  if (targetIndex === -1) {
    classList.push(target);
    this.className = classList.length > 1 ? classList.join(' ') : classList[0];
  }
  return this;
};

QuickElement.prototype.removeClass = function(target) {
  var classList, targetIndex;
  classList = this.classList;
  targetIndex = classList.indexOf(target);
  if (targetIndex !== -1) {
    classList.splice(targetIndex, 1);
    this.className = classList.length ? classList.join(' ') : '';
  }
  return this;
};

QuickElement.prototype.toggleClass = function(target) {
  if (this.hasClass(target)) {
    this.removeClass(target);
  } else {
    this.addClass(target);
  }
  return this;
};

QuickElement.prototype.setRef = function(target) {
  this.ref = this.options.ref = target;
  this.attr('data-ref', target);
  return this;
};

QuickElement.prototype._refreshParent = function() {
  return this.parent;
};

QuickElement.prototype._removeChild = function(targetChild, replacementChild) {
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
    get: function() {
      return this.el.innerHTML;
    },
    set: function(newValue) {
      return this.el.innerHTML = newValue;
    }
  },
  'text': {
    get: function() {
      return this.el.textContent;
    },
    set: function(newValue) {
      return this.el.textContent = newValue;
    }
  },
  'className': {
    get: function() {
      if (this.svg) {
        return this.attr('class') || '';
      } else {
        return this.raw.className;
      }
    },
    set: function(newValue) {
      if (this.svg) {
        return this.attr('class', newValue);
      } else {
        return this.raw.className = newValue;
      }
    }
  },
  'classList': {
    get: function() {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuaXB1bGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFuaXB1bGF0aW9uLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUEsU0FBRSxDQUFBLFVBQWQsR0FBMkIsU0FBQTtTQUMxQixRQUFRLENBQUMsUUFBVCxDQUFrQixJQUFsQjtBQUQwQjs7QUFJM0IsWUFBWSxDQUFBLFNBQUUsQ0FBQSxLQUFkLEdBQXNCLFNBQUE7QUFDckIsTUFBQTtFQUFBLE9BQUEsR0FBVSxJQUFDLENBQUEsRUFBRSxDQUFDLFNBQUosQ0FBYyxLQUFkO0VBQ1YsT0FBQSxHQUFVLE1BQU0sQ0FBQyxLQUFQLENBQWEsSUFBQyxDQUFBLE9BQWQsRUFBdUI7SUFBQyxRQUFBLEVBQVMsT0FBVjtHQUF2QjtFQUVWLEtBQUEsR0FBUSxJQUFJLFlBQUosQ0FBaUIsSUFBQyxDQUFBLElBQWxCLEVBQXdCLE9BQXhCO0FBQ1I7QUFBQSxPQUFBLHFDQUFBOztJQUFBLEtBQUssQ0FBQyxLQUFOLENBQVksV0FBWixFQUF5QixJQUF6QjtBQUFBO0FBQ0E7QUFBQSxPQUFBLHdDQUFBOztJQUFBLEtBQUssQ0FBQyxNQUFOLENBQWEsS0FBSyxDQUFDLEtBQU4sQ0FBQSxDQUFiO0FBQUE7QUFDQTtBQUFBLE9BQUEsaUJBQUE7O0FBQ0MsU0FBQSw2Q0FBQTs7TUFBQSxLQUFLLENBQUMsRUFBTixDQUFTLFNBQVQsRUFBb0IsUUFBcEI7QUFBQTtBQUREO0FBR0EsU0FBTztBQVZjOztBQWF0QixZQUFZLENBQUEsU0FBRSxDQUFBLE1BQWQsR0FBdUIsU0FBQyxRQUFEO0FBQ3RCLE1BQUE7RUFBQSxJQUFHLFFBQUg7SUFDQyxRQUFBLEdBQVcsT0FBTyxDQUFDLGdCQUFSLENBQXlCLFFBQXpCO0lBRVgsSUFBRyxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQWQsQ0FBSDtNQUNDLFVBQUEsR0FBYSxRQUFRLENBQUM7TUFDdEIsSUFBcUMsVUFBckM7UUFBQSxVQUFVLENB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LEdBQUwsQ0FBQSxFQUFBOztNQUNBLElBQWdCLElBQUssQ0FBQSxDQUFBLENBQUwsS0FBVyxFQUEzQjtRQUFBLElBQUksQ0FBQyxLQUFMLENBQUEsRUFBQTs7QUFDQSxhQUFPO0lBSkgsQ0FBTDtHQWJEO0NBREQiLCJzb3VyY2VzQ29udGVudCI6WyJRdWlja0VsZW1lbnQ6OnRvVGVtcGxhdGUgPSAoKS0+XG5cdFF1aWNrRG9tLnRlbXBsYXRlKEApXG5cblxuUXVpY2tFbGVtZW50OjpjbG9uZSA9ICgpLT5cblx0ZWxDbG9uZSA9IEBlbC5jbG9uZU5vZGUoZmFsc2UpXG5cdG9wdGlvbnMgPSBleHRlbmQuY2xvbmUoQG9wdGlvbnMsIHtleGlzdGluZzplbENsb25lfSlcblx0XG5cdG5ld0VsID0gbmV3IFF1aWNrRWxlbWVudChAdHlwZSwgb3B0aW9ucylcblx0bmV3RWwuc3RhdGUoYWN0aXZlU3RhdGUsIG9uKSBmb3IgYWN0aXZlU3RhdGUgaW4gQF9zdGF0ZVxuXHRuZXdFbC5hcHBlbmQoY2hpbGQuY2xvbmUoKSkgZm9yIGNoaWxkIGluIEBjaGlsZHJlblxuXHRmb3IgZXZlbnROYW1lLCBjYWxsYmFja3Mgb2YgQF9ldmVudENhbGxiYWNrc1xuXHRcdG5ld0VsLm9uKGV2ZW50TmFtZSwgY2FsbGJhY2spIGZvciBjYWxsYmFjayBpbiBjYWxsYmFja3Ncblx0XG5cdHJldHVybiBuZXdFbFxuXG5cblF1aWNrRWxlbWVudDo6YXBwZW5kID0gKHRhcmdldEVsKS0+XG5cdGlmIHRhcmdldEVsXG5cdFx0dGFyZ2V0RWwgPSBoZWxwZXJzLm5vcm1hbGl6ZUdpdmVuRWwodGFyZ2V0RWwpXG5cdFx0XG5cdFx0aWYgSVMucXVpY2tEb21FbCh0YXJnZXRFbClcblx0XHRcdHByZXZQYXJlbnQgPSB0YXJnZXRFbC5wYXJlbnRcblx0XHRcdHByZXZQYXJlbnQuX3JlbW92ZUNoaWxkKHRhcmdldEVsKSBpZiBwcmV2UGFyZW50XG5cdFx0XHRAX2NoaWxkcmVuLnB1c2godGFyZ2V0RWwpXG5cdFx0XHRAZWwuYXBwZW5kQ2hpbGQodGFyZ2V0RWwuZWwpXG5cdFx0XHR0YXJnZXRFbC5fcmVmcmVzaFBhcmVudCgpICMgRm9yY2UgcmUtZnJlc2ggdGFyZ2V0RWwuX3BhcmVudCB2YWx1ZSB0byB0cmlnZ2VyIGluc2VydGVkIGNhbGxiYWNrXG5cblx0cmV0dXJuIEBcblxuXG5RdWlja0VsZW1lbnQ6OmFwcGVuZFRvID0gKHRhcmdldEVsKS0+XG5cdGlmIHRhcmdldEVsXG5cdFx0dGFyZ2V0RWwgPSBoZWxwZXJzLm5vcm1hbGl6ZUdpdmVuRWwodGFyZ2V0RWwpXG5cdFx0XG5cdFx0aWYgSVMucXVpY2tEb21FbCh0YXJnZXRFbClcblx0XHRcdHRhcmdldEVsLmFwcGVuZChAKVxuXHRcblx0cmV0dXJuIEBcblxuXG5RdWlja0VsZW1lbnQ6OnByZXBlbmQgPSAodGFyZ2V0RWwpLT5cblx0aWYgdGFyZ2V0RWxcblx0XHR0YXJnZXRFbCA9IGhlbHBlcnMubm9ybWFsaXplR2l2ZW5FbCh0YXJnZXRFbClcblx0XHRcblx0XHRpZiBJUy5xdWlja0RvbUVsKHRhcmdldEVsKVxuXHRcdFx0cHJldlBhcmVudCA9IHRhcmdldEVsLnBhcmVudFxuXHRcdFx0cHJldlBhcmVudC5fcmVtb3ZlQ2hpbGQodGFyZ2V0RWwpIGlmIHByZXZQYXJlbnRcblx0XHRcdEBfY2hpbGRyZW4udW5zaGlmdCh0YXJnZXRFbClcblx0XHRcdEBlbC5pbnNlcnRCZWZvcmUodGFyZ2V0RWwuZWwsIEBlbC5maXJzdENoaWxkKVxuXHRcdFx0dGFyZ2V0RWwuX3JlZnJlc2hQYXJlbnQoKSAjIEZvcmNlIHJlLWZyZXNoIHRhcmdldEVsLl9wYXJlbnQgdmFsdWUgdG8gdHJpZ2dlciBpbnNlcnRlZCBjYWxsYmFja1xuXHRcblx0cmV0dXJuIEBcblxuXG5RdWlja0VsZW1lbnQ6OnByZXBlbmRUbyA9ICh0YXJnZXRFbCktPlxuXHRpZiB0YXJnZXRFbFxuXHRcdHRhcmdldEVsID0gaGVscGVycy5ub3JtYWxpemVHaXZlbkVsKHRhcmdldEVsKVxuXHRcdFxuXHRcdGlmIElTLnF1aWNrRG9tRWwodGFyZ2V0RWwpXG5cdFx0XHR0YXJnZXRFbC5wcmVwZW5kKEApXG5cblx0cmV0dXJuIEBcblxuXG5RdWlja0VsZW1lbnQ6OmFmdGVyID0gKHRhcmdldEVsKS0+XG5cdGlmIHRhcmdldEVsIGFuZCBAcGFyZW50XG5cdFx0dGFyZ2V0RWwgPSBoZWxwZXJzLm5vcm1hbGl6ZUdpdmVuRWwodGFyZ2V0RWwpXG5cblx0XHRpZiBJUy5xdWlja0RvbUVsKHRhcmdldEVsKVxuXHRcdFx0bXlJbmRleCA9IEBwYXJlbnQuX2NoaWxkcmVuLmluZGV4T2YoQClcblx0XHRcdEBwYXJlbnQuX2NoaWxkcmVuLnNwbGljZShteUluZGV4KzEsIDAsIHRhcmdldEVsKVxuXHRcdFx0QGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRhcmdldEVsLmVsLCBAZWwubmV4dFNpYmxpbmcpXG5cdFx0XHR0YXJnZXRFbC5fcmVmcmVzaFBhcmVudCgpICMgRm9yY2UgcmUtZnJlc2ggdGFyZ2V0RWwuX3BhcmVudCB2YWx1ZSB0byB0cmlnZ2VyIGluc2VydGVkIGNhbGxiYWNrXG5cblx0cmV0dXJuIEBcblxuXG5RdWlja0VsZW1lbnQ6Omluc2VydEFmdGVyID0gKHRhcmdldEVsKS0+XG5cdGlmIHRhcmdldEVsXG5cdFx0dGFyZ2V0RWwgPSBoZWxwZXJzLm5vcm1hbGl6ZUdpdmVuRWwodGFyZ2V0RWwpXG5cdFx0XG5cdFx0aWYgSVMucXVpY2tEb21FbCh0YXJnZXRFbClcblx0XHRcdHRhcmdldEVsLmFmdGVyKEApXG5cdFxuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6YmVmb3JlID0gKHRhcmdldEVsKS0+XG5cdGlmIHRhcmdldEVsIGFuZCBAcGFyZW50XG5cdFx0dGFyZ2V0RWwgPSBoZWxwZXJzLm5vcm1hbGl6ZUdpdmVuRWwodGFyZ2V0RWwpXG5cblx0XHRpZiBJUy5xdWlja0RvbUVsKHRhcmdldEVsKVxuXHRcdFx0bXlJbmRleCA9IEBwYXJlbnQuX2NoaWxkcmVuLmluZGV4T2YoQClcblx0XHRcdEBwYXJlbnQuX2NoaWxkcmVuLnNwbGljZShteUluZGV4LCAwLCB0YXJnZXRFbClcblx0XHRcdEBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0YXJnZXRFbC5lbCwgQGVsKVxuXHRcdFx0dGFyZ2V0RWwuX3JlZnJlc2hQYXJlbnQoKSAjIEZvcmNlIHJlLWZyZXNoIHRhcmdldEVsLl9wYXJlbnQgdmFsdWUgdG8gdHJpZ2dlciBpbnNlcnRlZCBjYWxsYmFja1xuXG5cdHJldHVybiBAXG5cblxuUXVpY2tFbGVtZW50OjppbnNlcnRCZWZvcmUgPSAodGFyZ2V0RWwpLT5cblx0aWYgdGFyZ2V0RWxcblx0XHR0YXJnZXRFbCA9IGhlbHBlcnMubm9ybWFsaXplR2l2ZW5FbCh0YXJnZXRFbClcblx0XHRcblx0XHRpZiBJUy5xdWlja0RvbUVsKHRhcmdldEVsKVxuXHRcdFx0dGFyZ2V0RWwuYmVmb3JlKEApXG5cdFxuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6ZGV0YWNoID0gKCktPlxuXHRAcGFyZW50Py5fcmVtb3ZlQ2hpbGQoQClcblx0cmV0dXJuIEBcblxuXG5RdWlja0VsZW1lbnQ6OnJlbW92ZSA9ICgpLT5cblx0QGRldGFjaCgpXG5cdEByZXNldFN0YXRlKClcblx0aWYgQF9ldmVudENhbGxiYWNrc1xuXHRcdEBfZXZlbnRDYWxsYmFja3NbZXZlbnROYW1lXS5sZW5ndGggPSAwIGZvciBldmVudE5hbWUgb2YgQF9ldmVudENhbGxiYWNrc1xuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6ZW1wdHkgPSAoKS0+XG5cdEBfcmVtb3ZlQ2hpbGQoY2hpbGQpIGZvciBjaGlsZCBpbiBAY2hpbGRyZW4uc2xpY2UoKVxuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6d3JhcCA9ICh0YXJnZXRFbCktPlxuXHRpZiB0YXJnZXRFbFxuXHRcdHRhcmdldEVsID0gaGVscGVycy5ub3JtYWxpemVHaXZlbkVsKHRhcmdldEVsKVxuXHRcdGN1cnJlbnRQYXJlbnQgPSBAcGFyZW50XG5cblx0XHRpZiBJUy5xdWlja0RvbUVsKHRhcmdldEVsKSBhbmQgdGFyZ2V0RWwgaXNudCBAIGFuZCB0YXJnZXRFbCBpc250IEBwYXJlbnRcblx0XHRcdGlmIGN1cnJlbnRQYXJlbnRcblx0XHRcdFx0Y3VycmVudFBhcmVudC5fcmVtb3ZlQ2hpbGQoQCwgaWYgbm90IHRhcmdldEVsLnBhcmVudCB0aGVuIHRhcmdldEVsKVxuXHRcdFx0XG5cdFx0XHR0YXJnZXRFbC5hcHBlbmQoQClcblxuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6dW53cmFwID0gKCktPlxuXHRwYXJlbnQgPSBAcGFyZW50XG5cdGlmIHBhcmVudFxuXHRcdHBhcmVudENoaWxkcmVuID0gUXVpY2tEb20uYmF0Y2gocGFyZW50LmNoaWxkcmVuKVxuXHRcdHBhcmVudFNpYmxpbmcgPSBwYXJlbnQubmV4dFxuXHRcdGdyYW5kUGFyZW50ID0gcGFyZW50LnBhcmVudFxuXHRcdGlmIGdyYW5kUGFyZW50XG5cdFx0XHRwYXJlbnQuZGV0YWNoKClcblxuXHRcdFx0aWYgcGFyZW50U2libGluZ1xuXHRcdFx0XHRwYXJlbnRDaGlsZHJlbi5pbnNlcnRCZWZvcmUocGFyZW50U2libGluZylcblx0XHRcdGVsc2Vcblx0XHRcdFx0cGFyZW50Q2hpbGRyZW4uYXBwZW5kVG8oZ3JhbmRQYXJlbnQpXG5cdFxuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6cmVwbGFjZSA9ICh0YXJnZXRFbCktPlxuXHRpZiB0YXJnZXRFbFxuXHRcdHRhcmdldEVsID0gaGVscGVycy5ub3JtYWxpemVHaXZlbkVsKHRhcmdldEVsKVxuXHRcblx0XHRpZiBJUy5xdWlja0RvbUVsKHRhcmdldEVsKSBhbmQgdGFyZ2V0RWwgaXNudCBAXG5cdFx0XHR0YXJnZXRFbC5kZXRhY2goKVxuXHRcdFx0QHBhcmVudD8uX3JlbW92ZUNoaWxkKEAsIHRhcmdldEVsKVxuXHRcdFx0dGFyZ2V0RWwuX3JlZnJlc2hQYXJlbnQoKSAjIEZvcmNlIHJlLWZyZXNoIHRhcmdldEVsLl9wYXJlbnQgdmFsdWUgdG8gdHJpZ2dlciBpbnNlcnRlZCBjYWxsYmFja1xuXHRcblx0cmV0dXJuIEBcblxuXG5RdWlja0VsZW1lbnQ6Omhhc0NsYXNzID0gKHRhcmdldCktPlxuXHRoZWxwZXJzLmluY2x1ZGVzKEBjbGFzc0xpc3QsIHRhcmdldClcblxuXG5RdWlja0VsZW1lbnQ6OmFkZENsYXNzID0gKHRhcmdldCktPlxuXHRjbGFzc0xpc3QgPSBAY2xhc3NMaXN0XG5cdHRhcmdldEluZGV4ID0gY2xhc3NMaXN0LmluZGV4T2YodGFyZ2V0KVxuXG5cdGlmIHRhcmdldEluZGV4IGlzIC0xXG5cdFx0Y2xhc3NMaXN0LnB1c2godGFyZ2V0KVxuXHRcdEBjbGFzc05hbWUgPSBpZiBjbGFzc0xpc3QubGVuZ3RoID4gMSB0aGVuIGNsYXNzTGlzdC5qb2luKCcgJykgZWxzZSBjbGFzc0xpc3RbMF1cblxuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6cmVtb3ZlQ2xhc3MgPSAodGFyZ2V0KS0+XG5cdGNsYXNzTGlzdCA9IEBjbGFzc0xpc3Rcblx0dGFyZ2V0SW5kZXggPSBjbGFzc0xpc3QuaW5kZXhPZih0YXJnZXQpXG5cdFxuXHRpZiB0YXJnZXRJbmRleCBpc250IC0xXG5cdFx0Y2xhc3NMaXN0LnNwbGljZSh0YXJnZXRJbmRleCwgMSlcblx0XHRAY2xhc3NOYW1lID0gaWYgY2xhc3NMaXN0Lmxlbmd0aCB0aGVuIGNsYXNzTGlzdC5qb2luKCcgJykgZWxzZSAnJ1xuXG5cdHJldHVybiBAXG5cblxuUXVpY2tFbGVtZW50Ojp0b2dnbGVDbGFzcyA9ICh0YXJnZXQpLT5cblx0aWYgQGhhc0NsYXNzKHRhcmdldClcblx0XHRAcmVtb3ZlQ2xhc3ModGFyZ2V0KVxuXHRlbHNlXG5cdFx0QGFkZENsYXNzKHRhcmdldClcblxuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6c2V0UmVmID0gKHRhcmdldCktPlxuXHRAcmVmID0gQG9wdGlvbnMucmVmID0gdGFyZ2V0XG5cdEBhdHRyICdkYXRhLXJlZicsIHRhcmdldFxuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6X3JlZnJlc2hQYXJlbnQgPSAoKS0+XG5cdEBwYXJlbnRcblxuXG5RdWlja0VsZW1lbnQ6Ol9yZW1vdmVDaGlsZCA9ICh0YXJnZXRDaGlsZCwgcmVwbGFjZW1lbnRDaGlsZCktPlxuXHRpbmRleE9mQ2hpbGQgPSBAY2hpbGRyZW4uaW5kZXhPZih0YXJnZXRDaGlsZClcblx0aWYgaW5kZXhPZkNoaWxkIGlzbnQgLTFcblx0XHRpZiByZXBsYWNlbWVudENoaWxkXG5cdFx0XHRAZWwucmVwbGFjZUNoaWxkKHJlcGxhY2VtZW50Q2hpbGQuZWwsIHRhcmdldENoaWxkLmVsKVxuXHRcdFx0QF9jaGlsZHJlbi5zcGxpY2UoaW5kZXhPZkNoaWxkLCAxLCByZXBsYWNlbWVudENoaWxkKVxuXHRcdGVsc2Vcblx0XHRcdEBlbC5yZW1vdmVDaGlsZCh0YXJnZXRDaGlsZC5lbClcblx0XHRcdEBfY2hpbGRyZW4uc3BsaWNlKGluZGV4T2ZDaGlsZCwgMSlcblx0XHRcblxuXHRyZXR1cm4gQFxuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIFF1aWNrRWxlbWVudDo6LFxuXHQnaHRtbCc6XG5cdFx0Z2V0OiAoKS0+IEBlbC5pbm5lckhUTUxcblx0XHRzZXQ6IChuZXdWYWx1ZSktPiBAZWwuaW5uZXJIVE1MID0gbmV3VmFsdWVcblx0XG5cdCd0ZXh0Jzpcblx0XHRnZXQ6ICgpLT4gQGVsLnRleHRDb250ZW50XG5cdFx0c2V0OiAobmV3VmFsdWUpLT4gQGVsLnRleHRDb250ZW50ID0gbmV3VmFsdWVcblxuXHQnY2xhc3NOYW1lJzpcblx0XHRnZXQ6ICgpLT4gaWYgQHN2ZyB0aGVuIChAYXR0cignY2xhc3MnKSBvciAnJykgZWxzZSBAcmF3LmNsYXNzTmFtZVxuXHRcdHNldDogKG5ld1ZhbHVlKS0+IGlmIEBzdmcgdGhlbiBAYXR0cignY2xhc3MnLCBuZXdWYWx1ZSkgZWxzZSBAcmF3LmNsYXNzTmFtZSA9IG5ld1ZhbHVlXG5cblx0J2NsYXNzTGlzdCc6XG5cdFx0Z2V0OiAoKS0+XG5cdFx0XHRsaXN0ID0gQGNsYXNzTmFtZS5zcGxpdCgvXFxzKy8pXG5cdFx0XHRsaXN0LnBvcCgpIGlmIGxpc3RbbGlzdC5sZW5ndGgtMV0gaXMgJydcblx0XHRcdGxpc3Quc2hpZnQoKSBpZiBsaXN0WzBdIGlzICcnXG5cdFx0XHRyZXR1cm4gbGlzdFxuXG5cblxuXG5cblxuXG4iXX0=
;

QuickElement.prototype.updateOptions = function(options) {
  if (IS.object(options)) {
    this.options = options;
    this._normalizeOptions();
    this._applyOptions(this.options);
  }
  return this;
};

QuickElement.prototype.updateStateStyles = function(styles) {
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

QuickElement.prototype.updateStateTexts = function(texts) {
  var parsed;
  if (IS.objectPlain(texts)) {
    extend.deep.concat(this, parsed = this._parseTexts(texts));
  }
  return this;
};

QuickElement.prototype.applyData = function(data, passThrough) {
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

QuickElement.prototype._runComputer = function(computer, arg) {
  return this.options.computers[computer].call(this, arg);
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHBsaWNhdGlvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFBLFNBQUUsQ0FBQSxhQUFkLEdBQThCLFNBQUMsT0FBRDtFQUM3QixJQUFHLEVBQUUsQ0FBQyxNQUFILENBQVUsT0FBVixDQUFIO0lBQ0MsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUNYLElBQUMsQ0FBQSxpQkFBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLGFBQUQsQ0FBZSxJQUFDLENBQUEsT0FBaEIsRUFIRDs7QUFLQSxTQUFPO0FBTnNCOztBQVM5QixZQUFZLENBQUEsU0FBRSxDQUFBLGlCQUFkLEdBQWtDLFNBQUMsTUFBRDtBQUNqQyxNQUFBO0VBQUEsSUFBRyxFQUFFLENBQUMsV0FBSCxDQUFlLE1BQWYsQ0FBSDtJQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBWixDQUFtQixJQUFuQixFQUFzQixNQUFBLEdBQVMsSUFBQyxDQUFBLFlBQUQsQ0FBYyxNQUFkLENBQS9CO0lBRUEsSUFBRyxNQUFNLENBQUMsT0FBVjtNQUNDLGFBQUEsR0FBZ0IsTUFBTSxDQUFDLElBQVAsQ0FBWSxNQUFNLENBQUMsT0FBbkI7QUFFaEIsV0FBQSwrQ0FBQTs7WUFBZ0MsSUFBQyxDQUFBLEtBQUQsQ0FBTyxLQUFQLENBQUEsSUFBaUIsS0FBQSxLQUFTO1VBQ3pELElBQUMsQ0FBQSxxQkFBRCxDQUF1QixJQUFDLENBQUEsT0FBUSxDQUFBLEtBQUEsQ0FBaEMsRUFBd0MsSUFBQyxDQUFBLGdCQUFELENBQWtCLEtBQWxCLENBQXhDLEVBQWtFLEtBQWxFOztBQURELE9BSEQ7S0FIRDs7QUFTQSxTQUFPO0FBVjBCOztBQWFsQyxZQUFZLENBQUEsU0FBRSxDQUFBLGdCQUFkLEdBQWlDLFNBQUMsS0FBRDtBQUNoQyxNQUFBO0VBQUEsSUFBRyxFQUFFLENBQUMsV0FBSCxDQUFlLEtBQWYsQ0FBSDtJQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBWixDQUFtQixJQUFuQixFQUFzQixNQUFBLEdBQVMsSUFBQyxDQUFBLFdBQUQsQ0FBYSxLQUFiLENBQS9CLEVBREQ7O0FBR0EsU0FBTztBQUp5Qjs7QUFRakMsWUFBWSxDQUFBLFNBQUUsQ0FBQSxTQUFkLEdBQTBCLFNBQUMsSUFBRCxFQUFPLFdBQVA7QUFDekIsTUFBQTtFQUFBLElBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxrQkFBVCxJQUFnQyxJQUFDLENBQUEsU0FBUyxDQUFDLE1BQTNDLElBQXNELHVCQUFDLGNBQUEsY0FBZSxJQUFoQixDQUF6RDtBQUNDO0FBQUEsU0FBQSxxQ0FBQTs7TUFBQSxLQUFLLENBQUMsU0FBTixDQUFnQixJQUFoQjtBQUFBLEtBREQ7O0VBR0EsSUFBRyxTQUFBLEdBQVksSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUF4QjtJQUNDLFFBQUEsR0FBVyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQ3BCLElBQUEsR0FBTyxNQUFNLENBQUMsSUFBUCxDQUFZLFNBQVo7QUFFUCxTQUFBLHdDQUFBOztNQUNDLElBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxtQkFBWjtRQUNDLElBQVksSUFBQyxDQUFBLGlCQUFrQixDQUFBLEdBQUEsQ0FBL0I7QUFBQSxtQkFBQTs7UUFDQSxJQUFDLENBQUEsaUJBQWtCLENBQUEsR0FBQSxDQUFuQixHQUEwQixFQUYzQjs7TUFJQSxJQUFHLElBQUEsSUFBUyxJQUFJLENBQUMsY0FBTCxDQUFvQixHQUFwQixDQUFaO1FBQ0MsSUFBQyxDQUFBLFlBQUQsQ0FBYyxHQUFkLEVBQW1CLElBQUssQ0FBQSxHQUFBLENBQXhCLEVBREQ7T0FBQSxNQUdLLElBQUcsUUFBQSxJQUFhLFFBQVEsQ0FBQyxjQUFULENBQXdCLEdBQXhCLENBQWhCO1FBQ0osSUFBQyxDQUFBLFlBQUQsQ0FBYyxHQUFkLEVBQW1CLFFBQVMsQ0FBQSxHQUFBLENBQTVCLEVBREk7O0FBUk4sS0FKRDs7QUFlQSxTQUFPO0FBbkJrQjs7QUFzQjFCLFlBQVksQ0FBQSxTQUFFLENBQUEsWUFBZCxHQUE2QixTQUFDLFFBQUQsRUFBVyxHQUFYO1NBQzVCLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBVSxDQUFBLFFBQUEsQ0FBUyxDQUFDLElBQTdCLENBQWtDLElBQWxDLEVBQXFDLEdBQXJDO0FBRDRCIiwic291cmNlc0NvbnRlbnQiOlsiUXVpY2tFbGVtZW50Ojp1cGRhdGVPcHRpb25zID0gKG9wdGlvbnMpLT5cblx0aWYgSVMub2JqZWN0KG9wdGlvbnMpIFxuXHRcdEBvcHRpb25zID0gb3B0aW9uc1xuXHRcdEBfbm9ybWFsaXplT3B0aW9ucygpXG5cdFx0QF9hcHBseU9wdGlvbnMoQG9wdGlvbnMpXG5cdFxuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6dXBkYXRlU3RhdGVTdHlsZXMgPSAoc3R5bGVzKS0+XG5cdGlmIElTLm9iamVjdFBsYWluKHN0eWxlcylcblx0XHRleHRlbmQuZGVlcC5jb25jYXQgQCwgcGFyc2VkID0gQF9wYXJzZVN0eWxlcyhzdHlsZXMpXG5cblx0XHRpZiBwYXJzZWQuX3N0eWxlc1xuXHRcdFx0dXBkYXRlZFN0YXRlcyA9IE9iamVjdC5rZXlzKHBhcnNlZC5fc3R5bGVzKVxuXHRcdFx0XG5cdFx0XHRmb3Igc3RhdGUgaW4gdXBkYXRlZFN0YXRlcyB3aGVuIEBzdGF0ZShzdGF0ZSkgb3Igc3RhdGUgaXMgJ2Jhc2UnXG5cdFx0XHRcdEBfYXBwbHlSZWdpc3RlcmVkU3R5bGUoQF9zdHlsZXNbc3RhdGVdLCBAX2dldEFjdGl2ZVN0YXRlcyhzdGF0ZSksIGZhbHNlKVxuXHRcdFxuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6dXBkYXRlU3RhdGVUZXh0cyA9ICh0ZXh0cyktPlxuXHRpZiBJUy5vYmplY3RQbGFpbih0ZXh0cylcblx0XHRleHRlbmQuZGVlcC5jb25jYXQgQCwgcGFyc2VkID0gQF9wYXJzZVRleHRzKHRleHRzKVxuXHRcblx0cmV0dXJuIEBcblxuXG5cblF1aWNrRWxlbWVudDo6YXBwbHlEYXRhID0gKGRhdGEsIHBhc3NUaHJvdWdoKS0+XG5cdGlmIEBvcHRpb25zLnBhc3NEYXRhVG9DaGlsZHJlbiBhbmQgQF9jaGlsZHJlbi5sZW5ndGggYW5kIChwYXNzVGhyb3VnaCA/PSB0cnVlKVxuXHRcdGNoaWxkLmFwcGx5RGF0YShkYXRhKSBmb3IgY2hpbGQgaW4gQF9jaGlsZHJlblxuXG5cdGlmIGNvbXB1dGVycyA9IEBvcHRpb25zLmNvbXB1dGVyc1xuXHRcdGRlZmF1bHRzID0gQG9wdGlvbnMuZGVmYXVsdHNcblx0XHRrZXlzID0gT2JqZWN0LmtleXMoY29tcHV0ZXJzKVxuXHRcdFxuXHRcdGZvciBrZXkgaW4ga2V5c1xuXHRcdFx0aWYgQG9wdGlvbnMuaW52b2tlQ29tcHV0ZXJzT25jZVxuXHRcdFx0XHRjb250aW51ZSBpZiBAX2ludm9rZWRDb21wdXRlcnNba2V5XVxuXHRcdFx0XHRAX2ludm9rZWRDb21wdXRlcnNba2V5XSA9IDFcblx0XHRcdFxuXHRcdFx0aWYgZGF0YSBhbmQgZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpXG5cdFx0XHRcdEBfcnVuQ29tcHV0ZXIoa2V5LCBkYXRhW2tleV0pXG5cdFx0XHRcblx0XHRcdGVsc2UgaWYgZGVmYXVsdHMgYW5kIGRlZmF1bHRzLmhhc093blByb3BlcnR5KGtleSlcblx0XHRcdFx0QF9ydW5Db21wdXRlcihrZXksIGRlZmF1bHRzW2tleV0pXG5cdFxuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6X3J1bkNvbXB1dGVyID0gKGNvbXB1dGVyLCBhcmcpLT5cblx0QG9wdGlvbnMuY29tcHV0ZXJzW2NvbXB1dGVyXS5jYWxsKEAsIGFyZylcblxuXG5cblxuXG5cbiJdfQ==
;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxZQUFBLEdBQWU7O0FBRVQ7RUFDTCxZQUFDLENBQUEsS0FBRCxHQUFTOztFQUNJLHNCQUFDLElBQUQsRUFBUSxPQUFSO0lBQUMsSUFBQyxDQUFBLE9BQUQ7SUFBTyxJQUFDLENBQUEsVUFBRDtJQUNwQixZQUFZLENBQUMsS0FBYjtJQUNBLElBQWUsSUFBQyxDQUFBLElBQUssQ0FBQSxDQUFBLENBQU4sS0FBWSxHQUEzQjtNQUFBLElBQUMsQ0FBQSxHQUFELEdBQU8sS0FBUDs7SUFDQSxJQUFDLENBQUEsRUFBRCxHQUFNLElBQUMsQ0FBQSxPQUFPLENBQUMsUUFBVCxJQUNMLENBQUcsSUFBQyxDQUFBLElBQUQsS0FBUyxNQUFaLEdBQXdCLFFBQVEsQ0FBQyxjQUFULENBQTJCLE9BQU8sSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFoQixLQUF3QixRQUEzQixHQUF5QyxJQUFDLENBQUEsT0FBTyxDQUFDLElBQWxELEdBQTRELEVBQXBGLENBQXhCLEdBQ1EsSUFBQyxDQUFBLEdBQUosR0FBYSxRQUFRLENBQUMsZUFBVCxDQUF5QixZQUF6QixFQUF1QyxJQUFDLENBQUEsSUFBSSxDQUFDLEtBQU4sQ0FBWSxDQUFaLENBQXZDLENBQWIsR0FDQSxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUFDLENBQUEsSUFBeEIsQ0FGTDtJQUlELElBQUcsSUFBQyxDQUFBLElBQUQsS0FBUyxNQUFaO01BQ0MsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxJQUFELEdBQVEsU0FBQSxHQUFBLEVBRDlCOztJQUlBLElBQUMsQ0FBQSxPQUFELEdBQVc7SUFDWCxJQUFDLENBQUEsT0FBRCxHQUFXO0lBQ1gsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQUNWLElBQUMsQ0FBQSxTQUFELEdBQWE7SUFLYixJQUFDLENBQUEsaUJBQUQsQ0FBQTtJQUNBLElBQUMsQ0FBQSxhQUFELENBQUE7SUFDQSxJQUFDLENBQUEsa0JBQUQsQ0FBQTtJQUNBLElBQUMsQ0FBQSxZQUFELENBQUE7SUFDQSxJQUFxQixJQUFDLENBQUEsT0FBTyxDQUFDLFFBQTlCO01BQUEsSUFBQyxDQUFBLGNBQUQsQ0FBQSxFQUFBOztJQUNBLElBQUMsQ0FBQSxFQUFFLENBQUMsYUFBSixHQUFvQjtFQXpCUjs7eUJBNEJiLE1BQUEsR0FBUSxTQUFBO0FBQ1AsUUFBQTtJQUFBLE1BQUEsR0FBUyxDQUFDLElBQUMsQ0FBQSxJQUFGLEVBQVEsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFiLENBQWtCLGNBQWxCLENBQUEsQ0FBa0MsSUFBQyxDQUFBLE9BQW5DLENBQVI7SUFDVCxRQUFBLEdBQVcsSUFBQyxDQUFBO0FBQ1osU0FBQSwwQ0FBQTs7TUFBQSxNQUFNLENBQUMsSUFBUCxDQUFZLEtBQUssQ0FBQyxNQUFOLENBQUEsQ0FBWjtBQUFBO0FBQ0EsV0FBTztFQUpBOzs7Ozs7O0FBTVQ7OztFQUNBLFlBQVksQ0FBQyxPQUFROzs7QUFFckIsSUFBQSxDQUFLLFdBQUw7O0FBQ0EsSUFBQSxDQUFLLGNBQUw7O0FBQ0EsSUFBQSxDQUFLLFFBQUw7O0FBQ0EsSUFBQSxDQUFLLFVBQUw7O0FBQ0EsSUFBQSxDQUFLLFNBQUw7O0FBQ0EsSUFBQSxDQUFLLFNBQUw7O0FBQ0EsSUFBQSxDQUFLLDZCQUFMOztBQUNBLElBQUEsQ0FBSyxnQkFBTDs7QUFDQSxJQUFBLENBQUssZUFBTCIsInNvdXJjZXNDb250ZW50IjpbInN2Z05hbWVzcGFjZSA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZydcblxuY2xhc3MgUXVpY2tFbGVtZW50XG5cdEBjb3VudCA9IDBcblx0Y29uc3RydWN0b3I6IChAdHlwZSwgQG9wdGlvbnMpLT5cblx0XHRRdWlja0VsZW1lbnQuY291bnQrK1xuXHRcdEBzdmcgPSB0cnVlIGlmIEB0eXBlWzBdIGlzICcqJ1xuXHRcdEBlbCA9IEBvcHRpb25zLmV4aXN0aW5nIG9yXG5cdFx0XHRpZiBAdHlwZSBpcyAndGV4dCcgdGhlbiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpZiB0eXBlb2YgQG9wdGlvbnMudGV4dCBpcyAnc3RyaW5nJyB0aGVuIEBvcHRpb25zLnRleHQgZWxzZSAnJylcblx0XHRcdGVsc2UgaWYgQHN2ZyB0aGVuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhzdmdOYW1lc3BhY2UsIEB0eXBlLnNsaWNlKDEpKVxuXHRcdFx0ZWxzZSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KEB0eXBlKVxuXG5cdFx0aWYgQHR5cGUgaXMgJ3RleHQnXG5cdFx0XHRAYXBwZW5kID0gQHByZXBlbmQgPSBAYXR0ciA9ICgpLT5cblx0XHRcdCMgQF90ZXh0cyA9IHt9ICMgZGVmaW5lZCBjb25kaXRpb25hbGx5XG5cblx0XHRAX3BhcmVudCA9IG51bGxcblx0XHRAX3N0eWxlcyA9IHt9XG5cdFx0QF9zdGF0ZSA9IFtdXG5cdFx0QF9jaGlsZHJlbiA9IFtdXG5cdFx0IyBAX3Byb3ZpZGVkU3RhdGVzID0gW11cdFx0XHRcdCMgZGVmaW5lZCBjb25kaXRpb25hbGx5XG5cdFx0IyBAX3Byb3ZpZGVkU3RhdGVzU2hhcmVkID0gW11cdFx0IyBkZWZpbmVkIGNvbmRpdGlvbmFsbHlcblx0XHQjIEBfZXZlbnRDYWxsYmFja3MgPSB7X19yZWZzOnt9fVx0IyBkZWZpbmVkIGNvbmRpdGlvbmFsbHlcblx0XHRcblx0XHRAX25vcm1hbGl6ZU9wdGlvbnMoKVxuXHRcdEBfYXBwbHlPcHRpb25zKClcblx0XHRAX2F0dGFjaFN0YXRlRXZlbnRzKClcblx0XHRAX3Byb3h5UGFyZW50KClcblx0XHRAX3JlZnJlc2hQYXJlbnQoKSBpZiBAb3B0aW9ucy5leGlzdGluZ1xuXHRcdEBlbC5fcXVpY2tFbGVtZW50ID0gQFxuXG5cblx0dG9KU09OOiAoKS0+XG5cdFx0b3V0cHV0ID0gW0B0eXBlLCBleHRlbmQuY2xvbmUua2V5cyhhbGxvd2VkT3B0aW9ucykoQG9wdGlvbnMpXVxuXHRcdGNoaWxkcmVuID0gQGNoaWxkcmVuXG5cdFx0b3V0cHV0LnB1c2goY2hpbGQudG9KU09OKCkpIGZvciBjaGlsZCBpbiBjaGlsZHJlblxuXHRcdHJldHVybiBvdXRwdXRcblxuIyMjIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICMjI1xuUXVpY2tFbGVtZW50Lm5hbWUgPz0gJ1F1aWNrRWxlbWVudCdcblxuXyRzbSgnLi9hbGlhc2VzJyApXG5fJHNtKCcuL3RyYXZlcnNpbmcnIClcbl8kc20oJy4vaW5pdCcgKVxuXyRzbSgnLi9ldmVudHMnIClcbl8kc20oJy4vc3RhdGUnIClcbl8kc20oJy4vc3R5bGUnIClcbl8kc20oJy4vYXR0cmlidXRlcy1hbmQtcHJvcGVydGllcycgKVxuXyRzbSgnLi9tYW5pcHVsYXRpb24nIClcbl8kc20oJy4vYXBwbGljYXRpb24nIClcbiJdfQ==
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
    get: function() {
      return window.innerWidth;
    }
  },
  'height': {
    get: function() {
      return window.innerHeight;
    }
  },
  'orientation': orientationGetter,
  'aspectRatio': aspectRatioGetter
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2luZG93LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLFdBQUEsR0FDQztFQUFBLElBQUEsRUFBTSxRQUFOO0VBQ0EsRUFBQSxFQUFJLE1BREo7RUFFQSxHQUFBLEVBQUssTUFGTDtFQUdBLGVBQUEsRUFBaUI7SUFBQyxNQUFBLEVBQU8sRUFBUjtHQUhqQjs7O0FBTUQsV0FBVyxDQUFDLEVBQVosR0FBa0IsWUFBWSxDQUFBLFNBQUUsQ0FBQTs7QUFDaEMsV0FBVyxDQUFDLEdBQVosR0FBbUIsWUFBWSxDQUFBLFNBQUUsQ0FBQTs7QUFDakMsV0FBVyxDQUFDLElBQVosR0FBb0IsWUFBWSxDQUFBLFNBQUUsQ0FBQTs7QUFDbEMsV0FBVyxDQUFDLFdBQVosR0FBMkIsWUFBWSxDQUFBLFNBQUUsQ0FBQTs7QUFDekMsV0FBVyxDQUFDLFNBQVosR0FBeUIsWUFBWSxDQUFBLFNBQUUsQ0FBQTs7QUFDdkMsV0FBVyxDQUFDLGVBQVosR0FBK0IsWUFBWSxDQUFBLFNBQUUsQ0FBQTs7QUFDN0MsTUFBTSxDQUFDLGdCQUFQLENBQXdCLFdBQXhCLEVBQ0M7RUFBQSxPQUFBLEVBQVM7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFLLE1BQU0sQ0FBQztJQUFaLENBQUw7R0FBVDtFQUNBLFFBQUEsRUFBVTtJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUssTUFBTSxDQUFDO0lBQVosQ0FBTDtHQURWO0VBRUEsYUFBQSxFQUFlLGlCQUZmO0VBR0EsYUFBQSxFQUFlLGlCQUhmO0NBREQiLCJzb3VyY2VzQ29udGVudCI6WyJRdWlja1dpbmRvdyA9IFxuXHR0eXBlOiAnd2luZG93J1xuXHRlbDogd2luZG93XG5cdHJhdzogd2luZG93XG5cdF9ldmVudENhbGxiYWNrczoge19fcmVmczp7fX1cblx0XG5cblF1aWNrV2luZG93Lm9uID0gIFF1aWNrRWxlbWVudDo6b25cblF1aWNrV2luZG93Lm9mZiA9ICBRdWlja0VsZW1lbnQ6Om9mZlxuUXVpY2tXaW5kb3cuZW1pdCA9ICBRdWlja0VsZW1lbnQ6OmVtaXRcblF1aWNrV2luZG93LmVtaXRQcml2YXRlID0gIFF1aWNrRWxlbWVudDo6ZW1pdFByaXZhdGVcblF1aWNrV2luZG93Ll9saXN0ZW5UbyA9ICBRdWlja0VsZW1lbnQ6Ol9saXN0ZW5Ub1xuUXVpY2tXaW5kb3cuX2ludm9rZUhhbmRsZXJzID0gIFF1aWNrRWxlbWVudDo6X2ludm9rZUhhbmRsZXJzXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyBRdWlja1dpbmRvdyxcblx0J3dpZHRoJzogZ2V0OiAoKS0+IHdpbmRvdy5pbm5lcldpZHRoXG5cdCdoZWlnaHQnOiBnZXQ6ICgpLT4gd2luZG93LmlubmVySGVpZ2h0XG5cdCdvcmllbnRhdGlvbic6IG9yaWVudGF0aW9uR2V0dGVyXG5cdCdhc3BlY3RSYXRpbyc6IGFzcGVjdFJhdGlvR2V0dGVyXG5cbiJdfQ==
;

var MediaQuery, ruleDelimiter;

MediaQuery = new function() {
  var callbacks, testRule;
  callbacks = [];
  window.addEventListener('resize', function() {
    var callback, i, len;
    for (i = 0, len = callbacks.length; i < len; i++) {
      callback = callbacks[i];
      callback();
    }
  });
  this.parseQuery = function(target, queryString) {
    var querySplit, rules, source;
    querySplit = queryString.split('(');
    source = querySplit[0];
    source = (function() {
      switch (source) {
        case 'window':
          return QuickWindow;
        case 'parent':
          return target.parent;
        case 'self':
          return target;
        default:
          return target.parentMatching(function(parent) {
            return parent.ref === source.slice(1);
          });
      }
    })();
    rules = querySplit[1].slice(0, -1).split(ruleDelimiter).map(function(rule) {
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
      getter = (function() {
        switch (key) {
          case 'orientation':
            return function() {
              return source.orientation;
            };
          case 'aspect-ratio':
            return function() {
              return source.aspectRatio;
            };
          case 'width':
          case 'height':
            return function() {
              return source[key];
            };
          default:
            return function() {
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
      })();
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
  this.register = function(target, queryString) {
    var callback, query;
    query = this.parseQuery(target, queryString);
    if (query.source) {
      callbacks.push(callback = function() {
        return testRule(target, query, queryString);
      });
      callback();
    }
    return query;
  };
  testRule = function(target, query, queryString) {
    var currentValue, i, len, passed, ref, rule;
    passed = true;
    ref = query.rules;
    for (i = 0, len = ref.length; i < len; i++) {
      rule = ref[i];
      currentValue = rule.getter();
      passed = (function() {
        switch (false) {
          case !rule.min:
            return currentValue >= rule.value;
          case !rule.max:
            return currentValue <= rule.value;
          default:
            return currentValue === rule.value;
        }
      })();
      if (!passed) {
        break;
      }
    }
    return target.state(queryString, passed);
  };
  return this;
};

ruleDelimiter = /,\s*/;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWFRdWVyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lZGlhUXVlcnkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsVUFBQSxHQUFhLElBQUksU0FBQTtBQUNoQixNQUFBO0VBQUEsU0FBQSxHQUFZO0VBRVosTUFBTSxDQUFDLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFNBQUE7QUFDakMsUUFBQTtBQUFBLFNBQUEsMkNBQUE7O01BQUEsUUFBQSxDQUFBO0FBQUE7RUFEaUMsQ0FBbEM7RUFJQSxJQUFDLENBQUEsVUFBRCxHQUFjLFNBQUMsTUFBRCxFQUFTLFdBQVQ7QUFDYixRQUFBO0lBQUEsVUFBQSxHQUFhLFdBQVcsQ0FBQyxLQUFaLENBQWtCLEdBQWxCO0lBQ2IsTUFBQSxHQUFTLFVBQVcsQ0FBQSxDQUFBO0lBQ3BCLE1BQUE7QUFBUyxjQUFPLE1BQVA7QUFBQSxhQUNILFFBREc7aUJBQ1c7QUFEWCxhQUVILFFBRkc7aUJBRVcsTUFBTSxDQUFDO0FBRmxCLGFBR0gsTUFIRztpQkFHUztBQUhUO2lCQUlILE1BQU0sQ0FBQyxjQUFQLENBQXNCLFNBQUMsTUFBRDttQkFBVyxNQUFNLENBQUMsR0FBUCxLQUFjLE1BQU0sQ0FBQyxLQUFQLENBQWEsQ0FBYjtVQUF6QixDQUF0QjtBQUpHOztJQU1ULEtBQUEsR0FBUSxVQUFXLENBQUEsQ0FBQSxDQUNsQixDQUFDLEtBRE0sQ0FDQSxDQURBLEVBQ0UsQ0FBQyxDQURILENBRVAsQ0FBQyxLQUZNLENBRUEsYUFGQSxDQUdQLENBQUMsR0FITSxDQUdGLFNBQUMsSUFBRDtBQUNKLFVBQUE7TUFBQSxLQUFBLEdBQVEsSUFBSSxDQUFDLEtBQUwsQ0FBVyxHQUFYO01BQ1IsS0FBQSxHQUFRLFVBQUEsQ0FBVyxLQUFNLENBQUEsQ0FBQSxDQUFqQjtNQUNSLElBQW9CLEtBQUEsQ0FBTSxLQUFOLENBQXBCO1FBQUEsS0FBQSxHQUFRLEtBQU0sQ0FBQSxDQUFBLEVBQWQ7O01BQ0EsR0FBQSxHQUFNLEtBQU0sQ0FBQSxDQUFBO01BQ1osU0FBQSxHQUFZLEdBQUcsQ0FBQyxLQUFKLENBQVUsQ0FBVixFQUFZLENBQVo7TUFDWixHQUFBLEdBQU0sU0FBQSxLQUFhO01BQ25CLEdBQUEsR0FBTSxDQUFJLEdBQUosSUFBWSxTQUFBLEtBQWE7TUFDL0IsSUFBc0IsR0FBQSxJQUFPLEdBQTdCO1FBQUEsR0FBQSxHQUFNLEdBQUcsQ0FBQyxLQUFKLENBQVUsQ0FBVixFQUFOOztNQUNBLE1BQUE7QUFBUyxnQkFBTyxHQUFQO0FBQUEsZUFDSCxhQURHO21CQUNnQixTQUFBO3FCQUFLLE1BQU0sQ0FBQztZQUFaO0FBRGhCLGVBRUgsY0FGRzttQkFFaUIsU0FBQTtxQkFBSyxNQUFNLENBQUM7WUFBWjtBQUZqQixlQUdILE9BSEc7QUFBQSxlQUdLLFFBSEw7bUJBR21CLFNBQUE7cUJBQUssTUFBTyxDQUFBLEdBQUE7WUFBWjtBQUhuQjttQkFJSCxTQUFBO0FBQ0osa0JBQUE7Y0FBQSxXQUFBLEdBQWMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxHQUFiO2NBQ2QsV0FBQSxHQUFjLFVBQUEsQ0FBVyxXQUFYO2NBQ1AsSUFBRyxLQUFBLENBQU0sV0FBTixDQUFIO3VCQUEyQixZQUEzQjtlQUFBLE1BQUE7dUJBQTRDLFlBQTVDOztZQUhIO0FBSkc7O0FBU1QsYUFBTztRQUFDLEtBQUEsR0FBRDtRQUFLLE9BQUEsS0FBTDtRQUFXLEtBQUEsR0FBWDtRQUFlLEtBQUEsR0FBZjtRQUFtQixRQUFBLE1BQW5COztJQWxCSCxDQUhFO0FBdUJSLFdBQU87TUFBQyxRQUFBLE1BQUQ7TUFBUyxPQUFBLEtBQVQ7O0VBaENNO0VBbUNkLElBQUMsQ0FBQSxRQUFELEdBQVksU0FBQyxNQUFELEVBQVMsV0FBVDtBQUNYLFFBQUE7SUFBQSxLQUFBLEdBQVEsSUFBQyxDQUFBLFVBQUQsQ0FBWSxNQUFaLEVBQW9CLFdBQXBCO0lBQ1IsSUFBRyxLQUFLLENBQUMsTUFBVDtNQUNDLFNBQVMsQ0FBQyxJQUFWLENBQWUsUUFBQSxHQUFXLFNBQUE7ZUFBSyxRQUFBLENBQVMsTUFBVCxFQUFpQixLQUFqQixFQUF3QixXQUF4QjtNQUFMLENBQTFCO01BQ0EsUUFBQSxDQUFBLEVBRkQ7O0FBR0EsV0FBTztFQUxJO0VBUVosUUFBQSxHQUFXLFNBQUMsTUFBRCxFQUFTLEtBQVQsRUFBZ0IsV0FBaEI7QUFDVixRQUFBO0lBQUEsTUFBQSxHQUFTO0FBRVQ7QUFBQSxTQUFBLHFDQUFBOztNQUNDLFlBQUEsR0FBZSxJQUFJLENBQUMsTUFBTCxDQUFBO01BQ2YsTUFBQTtBQUFTLGdCQUFBLEtBQUE7QUFBQSxnQkFDSCxJQUFJLENBQUMsR0FERjttQkFDVyxZQUFBLElBQWdCLElBQUksQ0FBQztBQURoQyxnQkFFSCxJQUFJLENBQUMsR0FGRjttQkFFVyxZQUFBLElBQWdCLElBQUksQ0FBQztBQUZoQzttQkFHSCxZQUFBLEtBQWdCLElBQUksQ0FBQztBQUhsQjs7TUFLVCxJQUFTLENBQUksTUFBYjtBQUFBLGNBQUE7O0FBUEQ7V0FTQSxNQUFNLENBQUMsS0FBUCxDQUFhLFdBQWIsRUFBMEIsTUFBMUI7RUFaVTtBQWNYLFNBQU87QUFoRVM7O0FBcUVqQixhQUFBLEdBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiTWVkaWFRdWVyeSA9IG5ldyAoKS0+XG5cdGNhbGxiYWNrcyA9IFtdXG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIgJ3Jlc2l6ZScsICgpLT5cblx0XHRjYWxsYmFjaygpIGZvciBjYWxsYmFjayBpbiBjYWxsYmFja3Ncblx0XHRyZXR1cm5cblxuXHRAcGFyc2VRdWVyeSA9ICh0YXJnZXQsIHF1ZXJ5U3RyaW5nKS0+XG5cdFx0cXVlcnlTcGxpdCA9IHF1ZXJ5U3RyaW5nLnNwbGl0KCcoJylcblx0XHRzb3VyY2UgPSBxdWVyeVNwbGl0WzBdXG5cdFx0c291cmNlID0gc3dpdGNoIHNvdXJjZVxuXHRcdFx0d2hlbiAnd2luZG93JyB0aGVuIFF1aWNrV2luZG93XG5cdFx0XHR3aGVuICdwYXJlbnQnIHRoZW4gdGFyZ2V0LnBhcmVudFxuXHRcdFx0d2hlbiAnc2VsZicgdGhlbiB0YXJnZXRcblx0XHRcdGVsc2UgdGFyZ2V0LnBhcmVudE1hdGNoaW5nIChwYXJlbnQpLT4gcGFyZW50LnJlZiBpcyBzb3VyY2Uuc2xpY2UoMSlcblxuXHRcdHJ1bGVzID0gcXVlcnlTcGxpdFsxXVxuXHRcdFx0LnNsaWNlKDAsLTEpXG5cdFx0XHQuc3BsaXQocnVsZURlbGltaXRlcilcblx0XHRcdC5tYXAgKHJ1bGUpLT4gXG5cdFx0XHRcdHNwbGl0ID0gcnVsZS5zcGxpdCgnOicpXG5cdFx0XHRcdHZhbHVlID0gcGFyc2VGbG9hdChzcGxpdFsxXSlcblx0XHRcdFx0dmFsdWUgPSBzcGxpdFsxXSBpZiBpc05hTih2YWx1ZSlcblx0XHRcdFx0a2V5ID0gc3BsaXRbMF1cblx0XHRcdFx0a2V5UHJlZml4ID0ga2V5LnNsaWNlKDAsNClcblx0XHRcdFx0bWF4ID0ga2V5UHJlZml4IGlzICdtYXgtJ1xuXHRcdFx0XHRtaW4gPSBub3QgbWF4IGFuZCBrZXlQcmVmaXggaXMgJ21pbi0nXG5cdFx0XHRcdGtleSA9IGtleS5zbGljZSg0KSBpZiBtYXggb3IgbWluXG5cdFx0XHRcdGdldHRlciA9IHN3aXRjaCBrZXlcblx0XHRcdFx0XHR3aGVuICdvcmllbnRhdGlvbicgdGhlbiAoKS0+IHNvdXJjZS5vcmllbnRhdGlvblxuXHRcdFx0XHRcdHdoZW4gJ2FzcGVjdC1yYXRpbycgdGhlbiAoKS0+IHNvdXJjZS5hc3BlY3RSYXRpb1xuXHRcdFx0XHRcdHdoZW4gJ3dpZHRoJywnaGVpZ2h0JyB0aGVuICgpLT4gc291cmNlW2tleV1cblx0XHRcdFx0XHRlbHNlICgpLT5cblx0XHRcdFx0XHRcdHN0cmluZ1ZhbHVlID0gc291cmNlLnN0eWxlKGtleSlcblx0XHRcdFx0XHRcdHBhcnNlZFZhbHVlID0gcGFyc2VGbG9hdCBzdHJpbmdWYWx1ZVxuXHRcdFx0XHRcdFx0cmV0dXJuIGlmIGlzTmFOKHBhcnNlZFZhbHVlKSB0aGVuIHN0cmluZ1ZhbHVlIGVsc2UgcGFyc2VkVmFsdWVcblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiB7a2V5LHZhbHVlLG1pbixtYXgsZ2V0dGVyfVxuXG5cdFx0cmV0dXJuIHtzb3VyY2UsIHJ1bGVzfVxuXG5cblx0QHJlZ2lzdGVyID0gKHRhcmdldCwgcXVlcnlTdHJpbmcpLT5cblx0XHRxdWVyeSA9IEBwYXJzZVF1ZXJ5KHRhcmdldCwgcXVlcnlTdHJpbmcpXG5cdFx0aWYgcXVlcnkuc291cmNlXG5cdFx0XHRjYWxsYmFja3MucHVzaCBjYWxsYmFjayA9ICgpLT4gdGVzdFJ1bGUodGFyZ2V0LCBxdWVyeSwgcXVlcnlTdHJpbmcpXG5cdFx0XHRjYWxsYmFjaygpXG5cdFx0cmV0dXJuIHF1ZXJ5XG5cblxuXHR0ZXN0UnVsZSA9ICh0YXJnZXQsIHF1ZXJ5LCBxdWVyeVN0cmluZyktPlxuXHRcdHBhc3NlZCA9IHRydWVcblxuXHRcdGZvciBydWxlIGluIHF1ZXJ5LnJ1bGVzXG5cdFx0XHRjdXJyZW50VmFsdWUgPSBydWxlLmdldHRlcigpXG5cdFx0XHRwYXNzZWQgPSBzd2l0Y2hcblx0XHRcdFx0d2hlbiBydWxlLm1pbiB0aGVuIGN1cnJlbnRWYWx1ZSA+PSBydWxlLnZhbHVlXG5cdFx0XHRcdHdoZW4gcnVsZS5tYXggdGhlbiBjdXJyZW50VmFsdWUgPD0gcnVsZS52YWx1ZVxuXHRcdFx0XHRlbHNlIGN1cnJlbnRWYWx1ZSBpcyBydWxlLnZhbHVlXG5cblx0XHRcdGJyZWFrIGlmIG5vdCBwYXNzZWRcdFx0XG5cdFx0XG5cdFx0dGFyZ2V0LnN0YXRlKHF1ZXJ5U3RyaW5nLCBwYXNzZWQpXG5cblx0cmV0dXJuIEBcblxuXG5cblxucnVsZURlbGltaXRlciA9IC8sXFxzKi9cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiJdfQ==
;

QuickDom = function() {
  var arg, args, element, i, j, len, prevCount;
  args = new Array(arguments.length);
  for (i = j = 0, len = arguments.length; j < len; i = ++j) {
    arg = arguments[i];
    args[i] = arg;
  }
  prevCount = QuickElement.count;
  element = QuickDom.create(args);
  if (element && element._postCreation && QuickElement.count !== prevCount) {
    element._postCreation();
  }
  return element;
};

QuickDom.create = function(args) {
  var argsLength, child, children, element, i, j, len, options, type;
  switch (false) {
    case !IS.array(args[0]):
      return QuickDom.apply(null, args[0]);
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
            child = QuickDom.text(child);
          }
          if (IS.array(child)) {
            child = QuickDom.apply(null, child);
          }
          if (IS.quickDomEl(child)) {
            element.append(child);
          }
        }
      }
      return element;
    case !(args[0] && (IS.domNode(args[0][0]) || IS.domDoc(args[0][0]))):
      return QuickDom(args[0][0]);
  }
};

QuickDom.template = function(tree) {
  return new QuickTemplate(tree, true);
};

QuickDom.html = function(innerHTML) {
  var children, container;
  container = document.createElement('div');
  container.innerHTML = innerHTML;
  children = Array.prototype.slice.call(container.childNodes);
  return QuickDom.batch(children);
};

QuickDom.query = function(target) {
  return QuickDom(document).query(target);
};

QuickDom.queryAll = function(target) {
  return QuickDom(document).queryAll(target);
};

QuickDom.isTemplate = function(target) {
  return IS.template(target);
};

QuickDom.isQuickEl = function(target) {
  return IS.quickDomEl(target);
};

QuickDom.isEl = function(target) {
  return IS.domEl(target);
};

var QuickBatch;

QuickBatch = (function() {
  function QuickBatch(elements, returnResults1) {
    this.returnResults = returnResults1;
    this.elements = elements.map(function(el) {
      return QuickDom(el);
    });
  }

  QuickBatch.prototype.reverse = function() {
    this.elements = this.elements.reverse();
    return this;
  };

  QuickBatch.prototype["return"] = function(returnNext) {
    if (returnNext) {
      this.returnResults = true;
      return this;
    } else {
      return this.lastResults;
    }
  };

  return QuickBatch;

})();


/* istanbul ignore next */

if (QuickBatch.name == null) {
  QuickBatch.name = 'QuickBatch';
}

Object.keys(QuickElement.prototype).concat('css', 'replaceWith', 'html', 'text').forEach(function(method) {
  return QuickBatch.prototype[method] = function(newValue) {
    var element, results;
    results = this.lastResults = (function() {
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
          results1.push(element[method].apply(element, arguments));
        }
      }
      return results1;
    }).apply(this, arguments);
    if (this.returnResults) {
      return results;
    } else {
      return this;
    }
  };
});

QuickDom.batch = function(elements, returnResults) {
  if (!IS.iterable(elements)) {
    throw new Error("Batch: expected an iterable, got " + (String(elements)));
  } else if (!elements.length) {
    throw new Error("Batch: expected a non-empty element collection");
  }
  return new QuickBatch(elements, returnResults);
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmF0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBTTtFQUNRLG9CQUFDLFFBQUQsRUFBVyxjQUFYO0lBQVcsSUFBQyxDQUFBLGdCQUFEO0lBQ3ZCLElBQUMsQ0FBQSxRQUFELEdBQVksUUFBUSxDQUFDLEdBQVQsQ0FBYSxTQUFDLEVBQUQ7YUFBTyxRQUFBLENBQVMsRUFBVDtJQUFQLENBQWI7RUFEQTs7dUJBR2IsT0FBQSxHQUFTLFNBQUE7SUFDUixJQUFDLENBQUEsUUFBRCxHQUFZLElBQUMsQ0FBQSxRQUFRLENBQUMsT0FBVixDQUFBO0FBQ1osV0FBTztFQUZDOzt3QkFJVCxRQUFBLEdBQVEsU0FBQyxVQUFEO0lBQ1AsSUFBRyxVQUFIO01BQ0MsSUFBQyxDQUFBLGFBQUQsR0FBaUI7QUFDakIsYUFBTyxLQUZSO0tBQUEsTUFBQTtBQUlDLGFBQU8sSUFBQyxDQUFBLFlBSlQ7O0VBRE87Ozs7Ozs7QUFPVDs7O0VBQ0EsVUFBVSxDQUFDLE9BQVE7OztBQUluQixNQUFNLENBQUMsSUFBUCxDQUFZLFlBQVksQ0FBQSxTQUF4QixDQUEyQixDQUFDLE1BQTVCLENBQW1DLEtBQW5DLEVBQTBDLGFBQTFDLEVBQXlELE1BQXpELEVBQWlFLE1BQWpFLENBQXdFLENBQUMsT0FBekUsQ0FBaUYsU0FBQyxNQUFEO1NBQ2hGLFVBQVUsQ0FBQSxTQUFHLENBQUEsTUFBQSxDQUFiLEdBQXVCLFNBQUMsUUFBRDtBQUN0QixRQUFBO0lBQUEsT0FBQSxHQUFVLElBQUMsQ0FBQSxXQUFEOztBQUFlO0FBQUE7V0FBQSxxQ0FBQTs7UUFDeEIsSUFBRyxNQUFBLEtBQVUsTUFBVixJQUFvQixNQUFBLEtBQVUsTUFBakM7VUFDQyxJQUFHLFFBQUg7MEJBQWlCLE9BQVEsQ0FBQSxNQUFBLENBQVIsR0FBa0IsVUFBbkM7V0FBQSxNQUFBOzBCQUFpRCxPQUFRLENBQUEsTUFBQSxHQUF6RDtXQUREO1NBQUEsTUFBQTt3QkFHQyxPQUFRLENBQUEsTUFBQSxDQUFSLGdCQUFnQixTQUFoQixHQUhEOztBQUR3Qjs7O0lBTWxCLElBQUcsSUFBQyxDQUFBLGFBQUo7YUFBdUIsUUFBdkI7S0FBQSxNQUFBO2FBQW9DLEtBQXBDOztFQVBlO0FBRHlELENBQWpGOztBQVdBLFFBQVEsQ0FBQyxLQUFULEdBQWlCLFNBQUMsUUFBRCxFQUFXLGFBQVg7RUFDaEIsSUFBRyxDQUFJLEVBQUUsQ0FBQyxRQUFILENBQVksUUFBWixDQUFQO0FBQ0MsVUFBTSxJQUFJLEtBQUosQ0FBVSxtQ0FBQSxHQUFtQyxDQUFDLE1BQUEsQ0FBTyxRQUFQLENBQUQsQ0FBN0MsRUFEUDtHQUFBLE1BRUssSUFBRyxDQUFJLFFBQVEsQ0FBQyxNQUFoQjtBQUNKLFVBQU0sSUFBSSxLQUFKLENBQVUsZ0RBQVYsRUFERjs7QUFHTCxTQUFPLElBQUksVUFBSixDQUFlLFFBQWYsRUFBeUIsYUFBekI7QUFOUyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFF1aWNrQmF0Y2hcblx0Y29uc3RydWN0b3I6IChlbGVtZW50cywgQHJldHVyblJlc3VsdHMpLT5cblx0XHRAZWxlbWVudHMgPSBlbGVtZW50cy5tYXAgKGVsKS0+IFF1aWNrRG9tKGVsKVxuXG5cdHJldmVyc2U6ICgpLT5cblx0XHRAZWxlbWVudHMgPSBAZWxlbWVudHMucmV2ZXJzZSgpXG5cdFx0cmV0dXJuIEBcblxuXHRyZXR1cm46IChyZXR1cm5OZXh0KS0+XG5cdFx0aWYgcmV0dXJuTmV4dFxuXHRcdFx0QHJldHVyblJlc3VsdHMgPSB0cnVlXG5cdFx0XHRyZXR1cm4gQFxuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBAbGFzdFJlc3VsdHNcblxuIyMjIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICMjI1xuUXVpY2tCYXRjaC5uYW1lID89ICdRdWlja0JhdGNoJ1xuXG5cblxuT2JqZWN0LmtleXMoUXVpY2tFbGVtZW50OjopLmNvbmNhdCgnY3NzJywgJ3JlcGxhY2VXaXRoJywgJ2h0bWwnLCAndGV4dCcpLmZvckVhY2ggKG1ldGhvZCktPlxuXHRRdWlja0JhdGNoOjpbbWV0aG9kXSA9IChuZXdWYWx1ZSktPlxuXHRcdHJlc3VsdHMgPSBAbGFzdFJlc3VsdHMgPSBmb3IgZWxlbWVudCBpbiBAZWxlbWVudHNcblx0XHRcdGlmIG1ldGhvZCBpcyAnaHRtbCcgb3IgbWV0aG9kIGlzICd0ZXh0J1xuXHRcdFx0XHRpZiBuZXdWYWx1ZSB0aGVuIGVsZW1lbnRbbWV0aG9kXSA9IG5ld1ZhbHVlIGVsc2UgZWxlbWVudFttZXRob2RdXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGVsZW1lbnRbbWV0aG9kXShhcmd1bWVudHMuLi4pXG5cdFx0XG5cdFx0cmV0dXJuIGlmIEByZXR1cm5SZXN1bHRzIHRoZW4gcmVzdWx0cyBlbHNlIEBcblxuXG5RdWlja0RvbS5iYXRjaCA9IChlbGVtZW50cywgcmV0dXJuUmVzdWx0cyktPlxuXHRpZiBub3QgSVMuaXRlcmFibGUoZWxlbWVudHMpXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQmF0Y2g6IGV4cGVjdGVkIGFuIGl0ZXJhYmxlLCBnb3QgI3tTdHJpbmcoZWxlbWVudHMpfVwiKVxuXHRlbHNlIGlmIG5vdCBlbGVtZW50cy5sZW5ndGhcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJCYXRjaDogZXhwZWN0ZWQgYSBub24tZW1wdHkgZWxlbWVudCBjb2xsZWN0aW9uXCIpXG5cblx0cmV0dXJuIG5ldyBRdWlja0JhdGNoKGVsZW1lbnRzLCByZXR1cm5SZXN1bHRzKVxuXG5cbiJdfQ==
;

var QuickTemplate;

var extendByRef, extendTemplate, notDeepKeys, notKeys;

notDeepKeys = ['relatedInstance', 'data'];

notKeys = ['children', '_childRefs'];

extendTemplate = function(currentOpts, newOpts, globalOpts) {
  var currentChild, currentChildren, globalOptsTransform, index, maxLength, needsTemplateWrap, newChild, newChildProcessed, newChildren, noChanges, output, ref, remainingNewChildren;
  if (globalOpts) {
    globalOptsTransform = {
      options: function(opts) {
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
      newChildProcessed = (function() {
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
      })();
      if (noChanges) {
        newChildProcessed = currentChild;
      } else if (needsTemplateWrap) {
        newChildProcessed = currentChild ? currentChild.extend(newChildProcessed, globalOpts) : new QuickTemplate(extend.clone(schema, newChildProcessed));
      }
      output.children.push(newChildProcessed);
    }
  } else if (IS.object(newChildren)) {
    newChildren = extend.allowNull.clone(newChildren);
    output.children = extendByRef(newChildren, currentChildren, globalOpts);
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

extendByRef = function(newChildrenRefs, currentChildren, globalOpts) {
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
        newChildProcessed = (function() {
          switch (false) {
            case !globalOpts:
              return currentChild.extend(null, globalOpts);
            case !Object.keys(newChildrenRefs).length:
              return currentChild.extend();
            default:
              return currentChild;
          }
        })();
      }
      newChildProcessed.children = extendByRef(newChildrenRefs, newChildProcessed.children);
      output.push(newChildProcessed);
    }
    return output;
  }
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kVGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHRlbmRUZW1wbGF0ZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxXQUFBLEdBQWMsQ0FBQyxpQkFBRCxFQUFtQixNQUFuQjs7QUFDZCxPQUFBLEdBQVUsQ0FBQyxVQUFELEVBQVksWUFBWjs7QUFFVixjQUFBLEdBQWlCLFNBQUMsV0FBRCxFQUFjLE9BQWQsRUFBdUIsVUFBdkI7QUFDaEIsTUFBQTtFQUFBLElBQUcsVUFBSDtJQUFtQixtQkFBQSxHQUFzQjtNQUFBLE9BQUEsRUFBUyxTQUFDLElBQUQ7ZUFBUyxNQUFBLENBQU8sSUFBUCxFQUFhLFVBQWI7TUFBVCxDQUFUO01BQXpDOztFQUNBLElBQUcsRUFBRSxDQUFDLEtBQUgsQ0FBUyxPQUFULENBQUg7SUFDQyxPQUFBLEdBQVUsU0FBQSxDQUFVLE9BQVYsRUFBbUIsS0FBbkIsRUFEWDtHQUFBLE1BRUssSUFBRyxPQUFBLElBQVksQ0FBSSxhQUFBLENBQWMsT0FBZCxDQUFuQjtJQUNKLE9BQUEsR0FBVTtNQUFBLE9BQUEsRUFBUSxPQUFSO01BRE47O0VBSUwsTUFBQSxHQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQXhCLENBQWdDLE9BQWhDLENBQXdDLENBQUMsT0FBekMsQ0FBaUQsV0FBakQsQ0FBNkQsQ0FBQyxTQUE5RCxDQUF3RSxtQkFBeEUsQ0FBNEYsQ0FBQyxLQUE3RixDQUFtRyxXQUFuRyxFQUFnSCxPQUFoSDtFQUNULGVBQUEsR0FBa0IsV0FBVyxDQUFDO0VBQzlCLFdBQUEsc0JBQWMsT0FBTyxDQUFFLGtCQUFULElBQXFCO0VBQ25DLE1BQU0sQ0FBQyxRQUFQLEdBQWtCOztBQUVsQjtFQUNBLElBQUcsRUFBRSxDQUFDLEtBQUgsQ0FBUyxXQUFULENBQUg7SUFDQyxTQUFBLEdBQVksSUFBSSxDQUFDLEdBQUwsQ0FBUyxlQUFlLENBQUMsTUFBekIsRUFB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QUdkO0FBSGM7YUFMaEI7O01BVUwsaUJBQWlCLENBQUMsUUFBbEIsR0FBNkIsV0FBQSxDQUFZLGVBQVosRUFBNkIsaUJBQWlCLENBQUMsUUFBL0M7TUFDN0IsTUFBTSxDQUFDLElBQVAsQ0FBWSxpQkFBWjtBQWpCRDtBQW1CQSxXQUFPLE9BdEJ1RDs7QUFBakQiLCJzb3VyY2VzQ29udGVudCI6WyJub3REZWVwS2V5cyA9IFsncmVsYXRlZEluc3RhbmNlJywnZGF0YSddXG5ub3RLZXlzID0gWydjaGlsZHJlbicsJ19jaGlsZFJlZnMnXVxuXG5leHRlbmRUZW1wbGF0ZSA9IChjdXJyZW50T3B0cywgbmV3T3B0cywgZ2xvYmFsT3B0cyktPlxuXHRpZiBnbG9iYWxPcHRzIHRoZW4gZ2xvYmFsT3B0c1RyYW5zZm9ybSA9IG9wdGlvbnM6IChvcHRzKS0+IGV4dGVuZChvcHRzLCBnbG9iYWxPcHRzKVxuXHRpZiBJUy5hcnJheShuZXdPcHRzKVxuXHRcdG5ld09wdHMgPSBwYXJzZVRyZWUobmV3T3B0cywgZmFsc2UpXG5cdGVsc2UgaWYgbmV3T3B0cyBhbmQgbm90IG1hdGNoZXNTY2hlbWEobmV3T3B0cylcblx0XHRuZXdPcHRzID0gb3B0aW9uczpuZXdPcHRzXG5cblxuXHRvdXRwdXQgPSBleHRlbmQuZGVlcC5udWxsRGVsZXRlcy5ub3RLZXlzKG5vdEtleXMpLm5vdERlZXAobm90RGVlcEtleXMpLnRyYW5zZm9ybShnbG9iYWxPcHRzVHJhbnNmb3JtKS5jbG9uZShjdXJyZW50T3B0cywgbmV3T3B0cylcblx0Y3VycmVudENoaWxkcmVuID0gY3VycmVudE9wdHMuY2hpbGRyZW5cblx0bmV3Q2hpbGRyZW4gPSBuZXdPcHRzPy5jaGlsZHJlbiBvciBbXVxuXHRvdXRwdXQuY2hpbGRyZW4gPSBbXVxuXG5cdCMjIyBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAjIyNcblx0aWYgSVMuYXJyYXkobmV3Q2hpbGRyZW4pXG5cdFx0bWF4TGVuZ3RoID0gTWF0aC5tYXgoY3VycmVudENoaWxkcmVuLmxlbmd0aCwgbmV3Q2hpbGRyZW4ubGVuZ3RoKVxuXHRcdGluZGV4ID0gLTFcblx0XHR3aGlsZSArK2luZGV4IGlzbnQgbWF4TGVuZ3RoXG5cdFx0XHRuZWVkc1RlbXBsYXRlV3JhcCA9IG5vQ2hhbmdlcyA9IGZhbHNlXG5cdFx0XHRjdXJyZW50Q2hpbGQgPSBjdXJyZW50Q2hpbGRyZW5baW5kZXhdXG5cdFx0XHRuZXdDaGlsZCA9IG5ld0NoaWxkcmVuW2luZGV4XVxuXHRcdFx0bmV3Q2hpbGRQcm9jZXNzZWQgPSBzd2l0Y2hcblx0XHRcdFx0d2hlbiBJUy50ZW1wbGF0ZShuZXdDaGlsZCkgdGhlbiBuZXdDaGlsZFxuXHRcdFx0XHR3aGVuIElTLmFycmF5KG5ld0NoaWxkKSB0aGVuIG5lZWRzVGVtcGxhdGVXcmFwID0gcGFyc2VUcmVlKG5ld0NoaWxkKVxuXHRcdFx0XHR3aGVuIElTLnN0cmluZyhuZXdDaGlsZCkgdGhlbiBuZWVkc1RlbXBsYXRlV3JhcCA9IHt0eXBlOid0ZXh0Jywgb3B0aW9uczp7dGV4dDpuZXdDaGlsZH19XG5cdFx0XHRcdHdoZW4gbm90IG5ld0NoaWxkIGFuZCBub3QgZ2xvYmFsT3B0cyB0aGVuIG5vQ2hhbmdlcyA9IHRydWVcblx0XHRcdFx0ZWxzZSBuZWVkc1RlbXBsYXRlV3JhcCA9IG5ld0NoaWxkIG9yIHRydWVcblxuXG5cdFx0XHRpZiBub0NoYW5nZXNcblx0XHRcdFx0bmV3Q2hpbGRQcm9jZXNzZWQgPSBjdXJyZW50Q2hpbGRcblx0XHRcdFxuXHRcdFx0ZWxzZSBpZiBuZWVkc1RlbXBsYXRlV3JhcFxuXHRcdFx0XHRuZXdDaGlsZFByb2Nlc3NlZCA9IFxuXHRcdFx0XHRcdGlmIGN1cnJlbnRDaGlsZFxuXHRcdFx0XHRcdFx0Y3VycmVudENoaWxkLmV4dGVuZChuZXdDaGlsZFByb2Nlc3NlZCwgZ2xvYmFsT3B0cylcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRuZXcgUXVpY2tUZW1wbGF0ZShleHRlbmQuY2xvbmUoc2NoZW1hLCBuZXdDaGlsZFByb2Nlc3NlZCkpXG5cblx0XHRcdG91dHB1dC5jaGlsZHJlbi5wdXNoIG5ld0NoaWxkUHJvY2Vzc2VkXG5cdFxuXHRcblx0ZWxzZSBpZiBJUy5vYmplY3QobmV3Q2hpbGRyZW4pXG5cdFx0bmV3Q2hpbGRyZW4gPSBleHRlbmQuYWxsb3dOdWxsLmNsb25lIG5ld0NoaWxkcmVuXG5cdFx0b3V0cHV0LmNoaWxkcmVuID0gZXh0ZW5kQnlSZWYobmV3Q2hpbGRyZW4sIGN1cnJlbnRDaGlsZHJlbiwgZ2xvYmFsT3B0cylcblx0XHRyZW1haW5pbmdOZXdDaGlsZHJlbiA9IG5ld0NoaWxkcmVuXG5cdFx0XG5cdFx0Zm9yIHJlZixuZXdDaGlsZCBvZiByZW1haW5pbmdOZXdDaGlsZHJlblxuXHRcdFx0bmV3Q2hpbGRQcm9jZXNzZWQgPSBpZiBJUy5vYmplY3RQbGFpbihuZXdDaGlsZCkgYW5kIG5vdCBJUy50ZW1wbGF0ZShuZXdDaGlsZCkgdGhlbiBuZXdDaGlsZCBlbHNlIHBhcnNlVHJlZShuZXdDaGlsZClcblx0XHRcdG91dHB1dC5jaGlsZHJlbi5wdXNoIG5ldyBRdWlja1RlbXBsYXRlIG5ld0NoaWxkUHJvY2Vzc2VkXG5cdFx0XHRkZWxldGUgcmVtYWluaW5nTmV3Q2hpbGRyZW5bcmVmXVxuXG5cblx0cmV0dXJuIG91dHB1dFxuXG5cblxuXG5leHRlbmRCeVJlZiA9IChuZXdDaGlsZHJlblJlZnMsIGN1cnJlbnRDaGlsZHJlbiwgZ2xvYmFsT3B0cyktPiBpZiBub3QgY3VycmVudENoaWxkcmVuLmxlbmd0aCB0aGVuIGN1cnJlbnRDaGlsZHJlbiBlbHNlXG5cdG91dHB1dCA9IFtdXG5cdFxuXHRmb3IgY3VycmVudENoaWxkIGluIGN1cnJlbnRDaGlsZHJlblxuXHRcdG5ld0NoaWxkID0gbmV3Q2hpbGRyZW5SZWZzW2N1cnJlbnRDaGlsZC5yZWZdXG5cdFx0aWYgbmV3Q2hpbGRcblx0XHRcdG5ld0NoaWxkUHJvY2Vzc2VkID0gY3VycmVudENoaWxkLmV4dGVuZChuZXdDaGlsZCwgZ2xvYmFsT3B0cylcblx0XHRcdGRlbGV0ZSBuZXdDaGlsZHJlblJlZnNbY3VycmVudENoaWxkLnJlZl1cblx0XHRcblx0XHRlbHNlIGlmIG5ld0NoaWxkIGlzIG51bGxcblx0XHRcdGRlbGV0ZSBuZXdDaGlsZHJlblJlZnNbY3VycmVudENoaWxkLnJlZl1cblx0XHRcdGNvbnRpbnVlXG5cdFx0XG5cdFx0ZWxzZVxuXHRcdFx0bmV3Q2hpbGRQcm9jZXNzZWQgPSBzd2l0Y2hcblx0XHRcdFx0d2hlbiBnbG9iYWxPcHRzIHRoZW4gY3VycmVudENoaWxkLmV4dGVuZChudWxsLCBnbG9iYWxPcHRzKVxuXHRcdFx0XHR3aGVuIE9iamVjdC5rZXlzKG5ld0NoaWxkcmVuUmVmcykubGVuZ3RoIHRoZW4gY3VycmVudENoaWxkLmV4dGVuZCgpXG5cdFx0XHRcdGVsc2UgY3VycmVudENoaWxkXG5cblx0XHRuZXdDaGlsZFByb2Nlc3NlZC5jaGlsZHJlbiA9IGV4dGVuZEJ5UmVmKG5ld0NoaWxkcmVuUmVmcywgbmV3Q2hpbGRQcm9jZXNzZWQuY2hpbGRyZW4pXG5cdFx0b3V0cHV0LnB1c2gobmV3Q2hpbGRQcm9jZXNzZWQpXG5cblx0cmV0dXJuIG91dHB1dFxuXG5cblxuXG4iXX0=
;

var parseErrorPrefix, parseTree;

parseTree = function(tree, parseChildren) {
  var output;
  switch (false) {
    case !IS.array(tree):
      output = {};
      if (!IS.string(tree[0])) {
        throw new Error(parseErrorPrefix + " string for 'type', got '" + (String(tree[0])) + "'");
      } else {
        output.type = tree[0];
      }
      if (tree.length > 1 && !IS.object(tree[1]) && tree[1] !== null) {
        throw new Error(parseErrorPrefix + " object for 'options', got '" + (String(tree[1])) + "'");
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
        output.children = output.children.map(QuickDom.template);
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
        children: schema.children.map.call(tree.childNodes, QuickDom.template)
      };
    case !IS.quickDomEl(tree):
      return {
        type: tree.type,
        ref: tree.ref,
        options: extend.clone.deep.notKeys('relatedInstance')(tree.options),
        children: tree.children.map(QuickDom.template)
      };
    case !IS.template(tree):
      return tree;
    default:
      throw new Error(parseErrorPrefix + " (array || string || domEl || quickDomEl || template), got " + (String(tree)));
  }
};

parseErrorPrefix = 'Template Parse Error: expected';

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VUcmVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VUcmVlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLFNBQUEsR0FBWSxTQUFDLElBQUQsRUFBTyxhQUFQO0FBQXdCLE1BQUE7QUFBQSxVQUFBLEtBQUE7QUFBQSxVQUM5QixFQUFFLENBQUMsS0FBSCxDQUFTLElBQVQsQ0FEOEI7TUFFbEMsTUFBQSxHQUFTO01BRVQsSUFBRyxDQUFJLEVBQUUsQ0FBQyxNQUFILENBQVUsSUFBSyxDQUFBLENBQUEsQ0FBZixDQUFQO0FBQ0MsY0FBTSxJQUFJLEtBQUosQ0FBYSxnQkFBRCxHQUFrQiwyQkFBbEIsR0FBNEMsQ0FBQyxNQUFBLENBQU8sSUFBSyxDQUFBLENBQUEsQ0FBWixDQUFELENBQTVDLEdBQTZELEdBQXpFLEVBRFA7T0FBQSxNQUFBO1FBR0MsTUFBTSxDQUFDLElBQVAsR0FBYyxJQUFLLENBQUEsQ0FBQSxFQUhwQjs7TUFLQSxJQUFHLElBQUksQ0FBQyxNQUFMLEdBQWMsQ0FBZCxJQUFvQixDQUFJLEVBQUUsQ0FBQyxNQUFILENBQVUsSUFBSyxDQUFBLENBQUEsQ0FBZixDQUF4QixJQUErQyxJQUFLLENBQUEsQ0FBQSxDQUFMLEtBQWEsSUFBL0Q7QUFDQyxjQUFNLElBQUksS0FBSixDQUFhLGdCQUFELEdBQWtCLDhCQUFsQixHQUErQyxDQUFDLE1BQUEsQ0FBTyxJQUFLLENBQUEsQ0FBQSxDQUFaLENBQUQsQ0FBL0MsR0FBZ0UsR0FBNUUsRUFEUDtPQUFBLE1BQUE7UUFHQyxNQUFNLENBQUMsT0FBUCxHQUFvQixJQUFLLENBQUEsQ0FBQSxDQUFSLEdBQWdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBWixDQUFrQixJQUFLLENBQUEsQ0FBQSxDQUF2QixDQUFoQixHQUFnRCxNQUFNLENBQUM7UUFDeEUsSUFBMEMsSUFBSyxDQUFBLENBQUEsQ0FBL0M7VUFBQSxNQUFNLENBQUMsR0FBUCxHQUFhLElBQUssQ0FBQSxDQUFBLENBQUUsQ0FBQyxFQUFSLElBQWMsSUFBSyxDQUFBLENBQUEsQ0FBRSxDQUFDLElBQW5DO1NBSkQ7O01BTUEsTUFBTSxDQUFDLFFBQVAsR0FBa0IsSUFBSSxDQUFDLEtBQUwsQ0FBVyxDQUFYO01BQ2xCLElBQUcsYUFBQSxLQUFpQixLQUFwQjtRQUNDLElBQTZCLElBQUksQ0FBQyxNQUFMLEtBQWUsQ0FBZixJQUFxQixFQUFFLENBQUMsV0FBSCxDQUFlLElBQUssQ0FBQSxDQUFBLENBQXBCLENBQXJCLElBQWlELENBQUksRUFBRSxDQUFDLFFBQUgsQ0FBWSxJQUFLLENBQUEsQ0FBQSxDQUFqQixDQUFsRjtVQUFBLE1BQU0sQ0FBQyxRQUFQLEdBQWtCLElBQUssQ0FBQSxDQUFBLEVBQXZCO1NBREQ7T0FBQSxNQUFBO1FBR0MsTUFBTSxDQUFDLFFBQVAsR0FBa0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFoQixDQUFvQixRQUFRLENBQUMsUUFBN0IsRUFIbkI7O0FBSUEsYUFBTztBQXBCMkIsV0F1QjlCLEVBQUUsQ0FBQyxNQUFILENBQVUsSUFBVixDQUFBLElBQW1CLEVBQUUsQ0FBQyxPQUFILENBQVcsSUFBWCxFQXZCVzthQXdCbEM7UUFBQSxJQUFBLEVBQUssTUFBTDtRQUFhLE9BQUEsRUFBUTtVQUFDLElBQUEsRUFBTSxJQUFJLENBQUMsV0FBTCxJQUFvQixJQUEzQjtTQUFyQjtRQUF1RCxRQUFBLEVBQVMsTUFBTSxDQUFDLFFBQXZFOztBQXhCa0MsVUEwQjlCLEVBQUUsQ0FBQyxLQUFILENBQVMsSUFBVCxDQTFCOEI7YUEyQmxDO1FBQUEsSUFBQSxFQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBZCxDQUFBLENBQU47UUFDQSxHQUFBLEVBQUssSUFBSSxDQUFDLEVBRFY7UUFFQSxPQUFBLEVBQVMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFiLENBQWtCLHNCQUFsQixDQUFBLENBQTBDLElBQTFDLENBRlQ7UUFHQSxRQUFBLEVBQVUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBcEIsQ0FBeUIsSUFBSSxDQUFDLFVBQTlCLEVBQTBDLFFBQVEsQ0FBQyxRQUFuRCxDQUhWOztBQTNCa0MsVUFnQzlCLEVBQUUsQ0FBQyxVQUFILENBQWMsSUFBZCxDQWhDOEI7YUFpQ2xDO1FBQUEsSUFBQSxFQUFNLElBQUksQ0FBQyxJQUFYO1FBQ0EsR0FBQSxFQUFLLElBQUksQ0FBQyxHQURWO1FBRUEsT0FBQSxFQUFTLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQWxCLENBQTBCLGlCQUExQixDQUFBLENBQTZDLElBQUksQ0FBQyxPQUFsRCxDQUZUO1FBR0EsUUFBQSxFQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixRQUFRLENBQUMsUUFBM0IsQ0FIVjs7QUFqQ2tDLFVBc0M5QixFQUFFLENBQUMsUUFBSCxDQUFZLElBQVosQ0F0QzhCO0FBdUNsQyxhQUFPO0FBdkMyQjtBQTBDbEMsWUFBTSxJQUFJLEtBQUosQ0FBYSxnQkFBRCxHQUFrQiw2REFBbEIsR0FBOEUsQ0FBQyxNQUFBLENBQU8sSUFBUCxDQUFELENBQTFGO0FBMUM0QjtBQUF4Qjs7QUErQ1osZ0JBQUEsR0FBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJwYXJzZVRyZWUgPSAodHJlZSwgcGFyc2VDaGlsZHJlbiktPiBzd2l0Y2hcblx0d2hlbiBJUy5hcnJheSh0cmVlKVxuXHRcdG91dHB1dCA9IHt9XG5cblx0XHRpZiBub3QgSVMuc3RyaW5nKHRyZWVbMF0pXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IgXCIje3BhcnNlRXJyb3JQcmVmaXh9IHN0cmluZyBmb3IgJ3R5cGUnLCBnb3QgJyN7U3RyaW5nKHRyZWVbMF0pfSdcIlxuXHRcdGVsc2Vcblx0XHRcdG91dHB1dC50eXBlID0gdHJlZVswXVxuXHRcdFxuXHRcdGlmIHRyZWUubGVuZ3RoID4gMSBhbmQgbm90IElTLm9iamVjdCh0cmVlWzFdKSBhbmQgdHJlZVsxXSBpc250IG51bGxcblx0XHRcdHRocm93IG5ldyBFcnJvciBcIiN7cGFyc2VFcnJvclByZWZpeH0gb2JqZWN0IGZvciAnb3B0aW9ucycsIGdvdCAnI3tTdHJpbmcodHJlZVsxXSl9J1wiXG5cdFx0ZWxzZVxuXHRcdFx0b3V0cHV0Lm9wdGlvbnMgPSBpZiB0cmVlWzFdIHRoZW4gZXh0ZW5kLmRlZXAuY2xvbmUodHJlZVsxXSkgZWxzZSBzY2hlbWEub3B0aW9uc1xuXHRcdFx0b3V0cHV0LnJlZiA9IHRyZWVbMV0uaWQgb3IgdHJlZVsxXS5yZWYgaWYgdHJlZVsxXVxuXG5cdFx0b3V0cHV0LmNoaWxkcmVuID0gdHJlZS5zbGljZSgyKVxuXHRcdGlmIHBhcnNlQ2hpbGRyZW4gaXMgZmFsc2Vcblx0XHRcdG91dHB1dC5jaGlsZHJlbiA9IHRyZWVbMl0gaWYgdHJlZS5sZW5ndGggaXMgMyBhbmQgSVMub2JqZWN0UGxhaW4odHJlZVsyXSkgYW5kIG5vdCBJUy50ZW1wbGF0ZSh0cmVlWzJdKVxuXHRcdGVsc2Vcblx0XHRcdG91dHB1dC5jaGlsZHJlbiA9IG91dHB1dC5jaGlsZHJlbi5tYXAoUXVpY2tEb20udGVtcGxhdGUpXG5cdFx0cmV0dXJuIG91dHB1dFxuXG5cblx0d2hlbiBJUy5zdHJpbmcodHJlZSkgb3IgSVMuZG9tVGV4dCh0cmVlKVxuXHRcdHR5cGU6J3RleHQnLCBvcHRpb25zOnt0ZXh0OiB0cmVlLnRleHRDb250ZW50IG9yIHRyZWV9LCBjaGlsZHJlbjpzY2hlbWEuY2hpbGRyZW5cblxuXHR3aGVuIElTLmRvbUVsKHRyZWUpXG5cdFx0dHlwZTogdHJlZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpXG5cdFx0cmVmOiB0cmVlLmlkXG5cdFx0b3B0aW9uczogZXh0ZW5kLmNsb25lLmtleXMoYWxsb3dlZFRlbXBsYXRlT3B0aW9ucykodHJlZSlcblx0XHRjaGlsZHJlbjogc2NoZW1hLmNoaWxkcmVuLm1hcC5jYWxsKHRyZWUuY2hpbGROb2RlcywgUXVpY2tEb20udGVtcGxhdGUpXG5cblx0d2hlbiBJUy5xdWlja0RvbUVsKHRyZWUpXG5cdFx0dHlwZTogdHJlZS50eXBlXG5cdFx0cmVmOiB0cmVlLnJlZlxuXHRcdG9wdGlvbnM6IGV4dGVuZC5jbG9uZS5kZWVwLm5vdEtleXMoJ3JlbGF0ZWRJbnN0YW5jZScpKHRyZWUub3B0aW9ucylcblx0XHRjaGlsZHJlbjogdHJlZS5jaGlsZHJlbi5tYXAoUXVpY2tEb20udGVtcGxhdGUpXG5cblx0d2hlbiBJUy50ZW1wbGF0ZSh0cmVlKVxuXHRcdHJldHVybiB0cmVlXG5cblx0ZWxzZVxuXHRcdHRocm93IG5ldyBFcnJvciBcIiN7cGFyc2VFcnJvclByZWZpeH0gKGFycmF5IHx8IHN0cmluZyB8fCBkb21FbCB8fCBxdWlja0RvbUVsIHx8IHRlbXBsYXRlKSwgZ290ICN7U3RyaW5nKHRyZWUpfVwiXG5cblxuXG5cbnBhcnNlRXJyb3JQcmVmaXggPSAnVGVtcGxhdGUgUGFyc2UgRXJyb3I6IGV4cGVjdGVkJyJdfQ==
;

var matchesSchema, schema;

schema = {
  type: 'div',
  ref: void 0,
  options: {},
  children: []
};

matchesSchema = function(object) {
  return typeof object.type !== 'undefined' || typeof object.ref !== 'undefined' || typeof object.options !== 'undefined' || typeof object.children !== 'undefined';
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2NoZW1hLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE1BQUEsR0FDQztFQUFBLElBQUEsRUFBTSxLQUFOO0VBQ0EsR0FBQSxFQUFLLE1BREw7RUFFQSxPQUFBLEVBQVMsRUFGVDtFQUdBLFFBQUEsRUFBVSxFQUhWOzs7QUFNRCxhQUFBLEdBQWdCLFNBQUMsTUFBRDtTQUNmLE9BQU8sTUFBTSxDQUFDLElBQWQsS0FBd0IsV0FBeEIsSUFDQSxPQUFPLE1BQU0sQ0FBQyxHQUFkLEtBQXVCLFdBRHZCLElBRUEsT0FBTyxNQUFNLENBQUMsT0FBZCxLQUEyQixXQUYzQixJQUdBLE9BQU8sTUFBTSxDQUFDLFFBQWQsS0FBNEI7QUFKYiIsInNvdXJjZXNDb250ZW50IjpbInNjaGVtYSA9IFxuXHR0eXBlOiAnZGl2J1xuXHRyZWY6IHVuZGVmaW5lZFxuXHRvcHRpb25zOiB7fVxuXHRjaGlsZHJlbjogW11cblxuXG5tYXRjaGVzU2NoZW1hID0gKG9iamVjdCktPlxuXHR0eXBlb2Ygb2JqZWN0LnR5cGUgaXNudCAndW5kZWZpbmVkJyBvclxuXHR0eXBlb2Ygb2JqZWN0LnJlZiBpc250ICd1bmRlZmluZWQnIG9yXG5cdHR5cGVvZiBvYmplY3Qub3B0aW9ucyBpc250ICd1bmRlZmluZWQnIG9yXG5cdHR5cGVvZiBvYmplY3QuY2hpbGRyZW4gaXNudCAndW5kZWZpbmVkJ1xuXG5cblxuIl19
;

QuickTemplate = (function() {
  function QuickTemplate(config, isTree) {
    if (IS.template(config)) {
      return config;
    }
    config = isTree ? parseTree(config) : config;
    extend(this, config);
  }

  QuickTemplate.prototype.extend = function(newValues, globalOpts) {
    return new QuickTemplate(extendTemplate(this, newValues, globalOpts));
  };

  QuickTemplate.prototype.spawn = function(newValues, globalOpts, data) {
    var child, childData, children, element, i, len, options, ref, ref1, type;
    if (newValues && newValues.data) {
      data = newValues.data;
      if (Object.keys(newValues).length === 1) {
        newValues = null;
      }
    }
    if (newValues || globalOpts) {
      ref = extendTemplate(this, newValues, globalOpts), options = ref.options, children = ref.children, type = ref.type;
    } else {
      ref1 = this, options = ref1.options, children = ref1.children, type = ref1.type;
      options = extend.clone(options);
    }
    element = QuickDom.create([type, options]);
    if (children) {
      childData = options.passDataToChildren ? data || options.data : void 0;
      for (i = 0, len = children.length; i < len; i++) {
        child = children[i];
        element.append(child.spawn(null, null, childData));
      }
    }
    element._postCreation(data);
    return element;
  };

  return QuickTemplate;

})();


/* istanbul ignore next */

if (QuickTemplate.name == null) {
  QuickTemplate.name = 'QuickTemplate';
}

Object.defineProperty(QuickTemplate.prototype, 'child', {
  get: function() {
    return this._childRefs || _getChildRefs(this);
  }
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxJQUFBLENBQUssa0JBQUw7O0FBQ0EsSUFBQSxDQUFLLGFBQUw7O0FBQ0EsSUFBQSxDQUFLLFVBQUw7O0FBRU07RUFDUSx1QkFBQyxNQUFELEVBQVMsTUFBVDtJQUNaLElBQWlCLEVBQUUsQ0FBQyxRQUFILENBQVksTUFBWixDQUFqQjtBQUFBLGFBQU8sT0FBUDs7SUFDQSxNQUFBLEdBQVksTUFBSCxHQUFlLFNBQUEsQ0FBVSxNQUFWLENBQWYsR0FBc0M7SUFDL0MsTUFBQSxDQUFPLElBQVAsRUFBVSxNQUFWO0VBSFk7OzBCQUtiLE1BQUEsR0FBUSxTQUFDLFNBQUQsRUFBWSxVQUFaO1dBQ1AsSUFBSSxhQUFKLENBQWtCLGNBQUEsQ0FBZSxJQUFmLEVBQWtCLFNBQWxCLEVBQTZCLFVBQTdCLENBQWxCO0VBRE87OzBCQUdSLEtBQUEsR0FBTyxTQUFDLFNBQUQsRUFBWSxVQUFaLEVBQXdCLElBQXhCO0FBQ04sUUFBQTtJQUFBLElBQUcsU0FBQSxJQUFjLFNBQVMsQ0FBQyxJQUEzQjtNQUNDLElBQUEsR0FBTyxTQUFTLENBQUM7TUFDakIsSUFBb0IsTUFBTSxDQUFDLElBQVAsQ0FBWSxTQUFaLENBQXNCLENBQUMsTUFBdkIsS0FBaUMsQ0FBckQ7UUFBQSxTQUFBLEdBQVksS0FBWjtPQUZEOztJQUlBLElBQUcsU0FBQSxJQUFhLFVBQWhCO01BQ0MsTUFBNEIsY0FBQSxDQUFlLElBQWYsRUFBa0IsU0FBbEIsRUFBNkIsVUFBN0IsQ0FBNUIsRUFBQyxxQkFBRCxFQUFVLHVCQUFWLEVBQW9CLGdCQURyQjtLQUFBLE1BQUE7TUFHQyxPQUE0QixJQUE1QixFQUFDLHNCQUFELEVBQVUsd0JBQVYsRUFBb0I7TUFDcEIsT0FBQSxHQUFVLE1BQU0sQ0FBQyxLQUFQLENBQWEsT0FBYixFQUpYOztJQU9BLE9BQUEsR0FBVSxRQUFRLENBQUMsTUFBVCxDQUFnQixDQUFDLElBQUQsRUFBTyxPQUFQLENBQWhCO0lBRVYsSUFBRyxRQUFIO01BQ0MsU0FBQSxHQUFlLE9BQU8sQ0FBQyxrQkFBWCxHQUFtQyxJQUFBLElBQVEsT0FBTyxDQUFDLElBQW5ELEdBQUE7QUFDWixXQUFBLDBDQUFBOztRQUNDLE9BQU8sQ0FBQyxNQUFSLENBQWUsS0FBSyxDQUFDLEtBQU4sQ0FBWSxJQUFaLEVBQWtCLElBQWxCLEVBQXdCLFNBQXhCLENBQWY7QUFERCxPQUZEOztJQUtBLE9BQU8sQ0FBQyxhQUFSLENBQXNCLElBQXRCO0FBQ0EsV0FBTztFQXBCRDs7Ozs7OztBQXVCUjs7O0VBQ0EsYUFBYSxDQUFDLE9BQVE7OztBQUd0QixNQUFNLENBQUMsY0FBUCxDQUFzQixhQUFhLENBQUEsU0FBbkMsRUFBdUMsT0FBdkMsRUFBZ0Q7RUFBQSxHQUFBLEVBQUssU0FBQTtXQUNwRCxJQUFDLENBQUEsVUFBRCxJQUFlLGFBQUEsQ0FBYyxJQUFkO0VBRHFDLENBQUw7Q0FBaEQiLCJzb3VyY2VzQ29udGVudCI6WyJfJHNtKCcuL2V4dGVuZFRlbXBsYXRlJyApXG5fJHNtKCcuL3BhcnNlVHJlZScgKVxuXyRzbSgnLi9zY2hlbWEnIClcblxuY2xhc3MgUXVpY2tUZW1wbGF0ZVxuXHRjb25zdHJ1Y3RvcjogKGNvbmZpZywgaXNUcmVlKS0+XG5cdFx0cmV0dXJuIGNvbmZpZyBpZiBJUy50ZW1wbGF0ZShjb25maWcpXG5cdFx0Y29uZmlnID0gaWYgaXNUcmVlIHRoZW4gcGFyc2VUcmVlKGNvbmZpZykgZWxzZSBjb25maWdcblx0XHRleHRlbmQgQCwgY29uZmlnXG5cdFxuXHRleHRlbmQ6IChuZXdWYWx1ZXMsIGdsb2JhbE9wdHMpLT5cblx0XHRuZXcgUXVpY2tUZW1wbGF0ZSBleHRlbmRUZW1wbGF0ZShALCBuZXdWYWx1ZXMsIGdsb2JhbE9wdHMpXG5cblx0c3Bhd246IChuZXdWYWx1ZXMsIGdsb2JhbE9wdHMsIGRhdGEpLT5cblx0XHRpZiBuZXdWYWx1ZXMgYW5kIG5ld1ZhbHVlcy5kYXRhXG5cdFx0XHRkYXRhID0gbmV3VmFsdWVzLmRhdGFcblx0XHRcdG5ld1ZhbHVlcyA9IG51bGwgaWYgT2JqZWN0LmtleXMobmV3VmFsdWVzKS5sZW5ndGggaXMgMVxuXHRcdFxuXHRcdGlmIG5ld1ZhbHVlcyBvciBnbG9iYWxPcHRzXG5cdFx0XHR7b3B0aW9ucywgY2hpbGRyZW4sIHR5cGV9ID0gZXh0ZW5kVGVtcGxhdGUoQCwgbmV3VmFsdWVzLCBnbG9iYWxPcHRzKVxuXHRcdGVsc2Vcblx0XHRcdHtvcHRpb25zLCBjaGlsZHJlbiwgdHlwZX0gPSBAXG5cdFx0XHRvcHRpb25zID0gZXh0ZW5kLmNsb25lKG9wdGlvbnMpXG5cblx0XHRcblx0XHRlbGVtZW50ID0gUXVpY2tEb20uY3JlYXRlKFt0eXBlLCBvcHRpb25zXSlcblx0XHRcblx0XHRpZiBjaGlsZHJlblxuXHRcdFx0Y2hpbGREYXRhID0gaWYgb3B0aW9ucy5wYXNzRGF0YVRvQ2hpbGRyZW4gdGhlbiBkYXRhIG9yIG9wdGlvbnMuZGF0YVxuXHRcdFx0Zm9yIGNoaWxkIGluIGNoaWxkcmVuXG5cdFx0XHRcdGVsZW1lbnQuYXBwZW5kIGNoaWxkLnNwYXduKG51bGwsIG51bGwsIGNoaWxkRGF0YSlcblxuXHRcdGVsZW1lbnQuX3Bvc3RDcmVhdGlvbihkYXRhKVxuXHRcdHJldHVybiBlbGVtZW50XG5cblxuIyMjIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICMjI1xuUXVpY2tUZW1wbGF0ZS5uYW1lID89ICdRdWlja1RlbXBsYXRlJ1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eSBRdWlja1RlbXBsYXRlOjosICdjaGlsZCcsIGdldDogKCktPlxuXHRAX2NoaWxkUmVmcyBvciBfZ2V0Q2hpbGRSZWZzKEApICMgc291cmNlIGluIC9zcmMvcGFydHMvZWxlbWVudC90cmF2ZXJzaW5nLmNvZmZlZVxuXG5cblxuXG5cblxuXG5cbiJdfQ==
;

var fn, i, len, shortcut, shortcuts,
  slice = [].slice;

shortcuts = ['link:a', 'anchor:a', 'a', 'text', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'footer', 'section', 'button', 'br', 'ul', 'ol', 'li', 'fieldset', 'input', 'textarea', 'select', 'option', 'form', 'frame', 'hr', 'iframe', 'img', 'picture', 'main', 'nav', 'meta', 'object', 'pre', 'style', 'table', 'tbody', 'th', 'tr', 'td', 'tfoot', 'video'];

fn = function(shortcut) {
  var prop, split, type;
  prop = type = shortcut;
  if (helpers.includes(shortcut, ':')) {
    split = shortcut.split(':');
    prop = split[0];
    type = split[1];
  }
  return QuickDom[prop] = function() {
    return QuickDom.apply(null, [type].concat(slice.call(arguments)));
  };
};
for (i = 0, len = shortcuts.length; i < len; i++) {
  shortcut = shortcuts[i];
  fn(shortcut);
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcnRjdXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hvcnRjdXRzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLCtCQUFBO0VBQUE7O0FBQUEsU0FBQSxHQUFZLENBQ1gsUUFEVyxFQUVYLFVBRlcsRUFHWCxHQUhXLEVBSVgsTUFKVyxFQUtYLEtBTFcsRUFNWCxNQU5XLEVBT1gsSUFQVyxFQVFYLElBUlcsRUFTWCxJQVRXLEVBVVgsSUFWVyxFQVdYLElBWFcsRUFZWCxJQVpXLEVBYVgsUUFiVyxFQWNYLFFBZFcsRUFlWCxTQWZXLEVBZ0JYLFFBaEJXLEVBaUJYLElBakJXLEVBa0JYLElBbEJXLEVBbUJYLElBbkJXLEVBb0JYLElBcEJXLEVBcUJYLFVBckJXLEVBc0JYLE9BdEJXLEVBdUJYLFVBdkJXLEVBd0JYLFFBeEJXLEVBeUJYLFFBekJXLEVBMEJYLE1BMUJXLEVBMkJYLE9BM0JXLEVBNEJYLElBNUJXLEVBNkJYLFFBN0JXLEVBOEJYLEtBOUJXLEVBK0JYLFNBL0JXLEVBZ0NYLE1BaENXLEVBaUNYLEtBakNXLEVBa0NYLE1BbENXLEVBbUNYLFFBbkNXLEVBb0NYLEtBcENXLEVBcUNYLE9BckNXLEVBc0NYLE9BdENXLEVBdUNYLE9BdkNXLEVBd0NYLElBeENXLEVBeUNYLElBekNXLEVBMENYLElBMUNXLEVBMkNYLE9BM0NXLEVBNkNYLE9BN0NXOztLQWlEc0IsU0FBQyxRQUFEO0FBQ2pDLE1BQUE7RUFBQSxJQUFBLEdBQU8sSUFBQSxHQUFPO0VBQ2QsSUFBRyxPQUFPLENBQUMsUUFBUixDQUFpQixRQUFqQixFQUEyQixHQUEzQixDQUFIO0lBQ0MsS0FBQSxHQUFRLFFBQVEsQ0FBQyxLQUFULENBQWUsR0FBZjtJQUNSLElBQUEsR0FBTyxLQUFNLENBQUEsQ0FBQTtJQUNiLElBQUEsR0FBTyxLQUFNLENBQUEsQ0FBQSxFQUhkOztTQUtBLFFBQVMsQ0FBQSxJQUFBLENBQVQsR0FBaUIsU0FBQTtXQUFLLFFBQUEsYUFBUyxDQUFBLElBQU0sU0FBQSxXQUFBLFNBQUEsQ0FBQSxDQUFmO0VBQUw7QUFQZ0I7QUFBbEMsS0FBQSwyQ0FBQTs7S0FBbUM7QUFBbkMiLCJzb3VyY2VzQ29udGVudCI6WyJzaG9ydGN1dHMgPSBbXG5cdCdsaW5rOmEnXG5cdCdhbmNob3I6YSdcblx0J2EnXG5cdCd0ZXh0J1xuXHQnZGl2J1xuXHQnc3Bhbidcblx0J2gxJ1xuXHQnaDInXG5cdCdoMydcblx0J2g0J1xuXHQnaDUnXG5cdCdoNidcblx0J2hlYWRlcidcblx0J2Zvb3Rlcidcblx0J3NlY3Rpb24nXG5cdCdidXR0b24nXG5cdCdicidcblx0J3VsJ1xuXHQnb2wnXG5cdCdsaSdcblx0J2ZpZWxkc2V0J1xuXHQnaW5wdXQnXG5cdCd0ZXh0YXJlYSdcblx0J3NlbGVjdCdcblx0J29wdGlvbidcblx0J2Zvcm0nXG5cdCdmcmFtZSdcblx0J2hyJ1xuXHQnaWZyYW1lJ1xuXHQnaW1nJ1xuXHQncGljdHVyZSdcblx0J21haW4nXG5cdCduYXYnXG5cdCdtZXRhJ1xuXHQnb2JqZWN0J1xuXHQncHJlJ1xuXHQnc3R5bGUnXG5cdCd0YWJsZSdcblx0J3Rib2R5J1xuXHQndGgnXG5cdCd0cidcblx0J3RkJ1xuXHQndGZvb3QnXG5cdCMgJ3RlbXBsYXRlJ1xuXHQndmlkZW8nXG5dXG5cblxuZm9yIHNob3J0Y3V0IGluIHNob3J0Y3V0cyB0aGVuIGRvIChzaG9ydGN1dCktPlxuXHRwcm9wID0gdHlwZSA9IHNob3J0Y3V0XG5cdGlmIGhlbHBlcnMuaW5jbHVkZXMoc2hvcnRjdXQsICc6Jylcblx0XHRzcGxpdCA9IHNob3J0Y3V0LnNwbGl0KCc6Jylcblx0XHRwcm9wID0gc3BsaXRbMF1cblx0XHR0eXBlID0gc3BsaXRbMV1cblxuXHRRdWlja0RvbVtwcm9wXSA9ICgpLT4gUXVpY2tEb20odHlwZSwgYXJndW1lbnRzLi4uKVxuIl19
;

QuickDom.version = "1.0.86";

QuickDom.CSS = CSS;

module.exports = QuickDom;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQUEsSUFBQTs7QUFDQSxJQUFBLENBQUssVUFBTCxFQUFnQixVQUFoQjs7O0FBQ0E7O0FBQ0EsSUFBQSxDQUFLLGNBQUwsRUFBb0IsYUFBcEI7O0FBQ0EsSUFBQSxDQUFLLHdCQUFMOztBQUNBLElBQUEsQ0FBSyxpQkFBTDs7QUFDQSxJQUFBLENBQUssZ0JBQUw7O0FBQ0EsSUFBQSxDQUFLLGlCQUFMOztBQUNBLElBQUEsQ0FBSyxnQkFBTDs7QUFDQSxJQUFBLENBQUssb0JBQUw7O0FBRUEsUUFBQSxHQUFXLFNBQUE7QUFDVixNQUFBO0VBQUEsSUFBQSxHQUFPLElBQUksS0FBSixDQUFVLFNBQVMsQ0FBQyxNQUFwQjtBQUNQLE9BQUEsbURBQUE7O0lBQUEsSUFBSyxDQUFBLENBQUEsQ0FBTCxHQUFVO0FBQVY7RUFDQSxTQUFBLEdBQVksWUFBWSxDQUFDO0VBQ3pCLE9BQUEsR0FBVSxRQUFRLENBQUMsTUFBVCxDQUFnQixJQUFoQjtFQUNWLElBQTJCLE9BQUEsSUFBWSxPQUFPLENBQUMsYUFBcEIsSUFBc0MsWUFBWSxDQUFDLEtBQWIsS0FBd0IsU0FBekY7SUFBQSxPQUFPLENBQUMsYUFBUixDQUFBLEVBQUE7O0FBQ0EsU0FBTztBQU5HOztBQVFYLFFBQVEsQ0FBQyxNQUFULEdBQWtCLFNBQUMsSUFBRDtBQUFTLE1BQUE7QUFBQSxVQUFBLEtBQUE7QUFBQSxVQUNyQixFQUFFLENBQUMsS0FBSCxDQUFTLElBQUssQ0FBQSxDQUFBLENBQWQsQ0FEcUI7QUFFekIsYUFBTyxRQUFBLGFBQVMsSUFBSyxDQUFBLENBQUEsQ0FBZDtBQUZrQixVQUlyQixFQUFFLENBQUMsUUFBSCxDQUFZLElBQUssQ0FBQSxDQUFBLENBQWpCLENBSnFCO0FBS3pCLGFBQU8sSUFBSyxDQUFBLENBQUEsQ0FBRSxDQUFDLEtBQVIsQ0FBQTtBQUxr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VCxHQUFlOztBQUNmLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiIyMjIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICMjI1xuXyRzbSgncXVpY2tjc3MnLCcqIGFzIENTUycgICAgKVxuIyMjIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICMjI1xuXyRzbSgnc21hcnQtZXh0ZW5kJywnKiBhcyBleHRlbmQnICAgIClcbl8kc20oJy4vcGFydHMvYWxsb3dlZE9wdGlvbnMnIClcbl8kc20oJy4vcGFydHMvaGVscGVycycgKVxuXyRzbSgnLi9wYXJ0cy9jaGVja3MnIClcbl8kc20oJy4vcGFydHMvZWxlbWVudCcgKVxuXyRzbSgnLi9wYXJ0cy93aW5kb3cnIClcbl8kc20oJy4vcGFydHMvbWVkaWFRdWVyeScgKVxuXG5RdWlja0RvbSA9ICgpLT5cblx0YXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKVxuXHRhcmdzW2ldID0gYXJnIGZvciBhcmcsaSBpbiBhcmd1bWVudHNcblx0cHJldkNvdW50ID0gUXVpY2tFbGVtZW50LmNvdW50XG5cdGVsZW1lbnQgPSBRdWlja0RvbS5jcmVhdGUoYXJncylcblx0ZWxlbWVudC5fcG9zdENyZWF0aW9uKCkgaWYgZWxlbWVudCBhbmQgZWxlbWVudC5fcG9zdENyZWF0aW9uIGFuZCBRdWlja0VsZW1lbnQuY291bnQgaXNudCBwcmV2Q291bnRcblx0cmV0dXJuIGVsZW1lbnRcblxuUXVpY2tEb20uY3JlYXRlID0gKGFyZ3MpLT4gc3dpdGNoXG5cdHdoZW4gSVMuYXJyYXkoYXJnc1swXSlcblx0XHRyZXR1cm4gUXVpY2tEb20oYXJnc1swXS4uLilcblx0XG5cdHdoZW4gSVMudGVtcGxhdGUoYXJnc1swXSlcblx0XHRyZXR1cm4gYXJnc1swXS5zcGF3bigpXG5cdFxuXHR3aGVuIElTLnF1aWNrRG9tRWwoYXJnc1swXSlcblx0XHRyZXR1cm4gaWYgYXJnc1sxXSB0aGVuIGFyZ3NbMF0udXBkYXRlT3B0aW9ucyhhcmdzWzFdKSBlbHNlIGFyZ3NbMF1cblx0XG5cdHdoZW4gSVMuZG9tTm9kZShhcmdzWzBdKSBvciBJUy5kb21Eb2MoYXJnc1swXSlcblx0XHRpZiBhcmdzWzBdLl9xdWlja0VsZW1lbnRcblx0XHRcdHJldHVybiBhcmdzWzBdLl9xdWlja0VsZW1lbnRcblx0XHRcblx0XHR0eXBlID0gYXJnc1swXS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJyMnLCAnJylcblx0XHRvcHRpb25zID0gYXJnc1sxXSBvciB7fVxuXHRcdG9wdGlvbnMuZXhpc3RpbmcgPSBhcmdzWzBdXG5cdFx0cmV0dXJuIG5ldyBRdWlja0VsZW1lbnQodHlwZSwgb3B0aW9ucylcblxuXHR3aGVuIGFyZ3NbMF0gaXMgd2luZG93XG5cdFx0cmV0dXJuIFF1aWNrV2luZG93XG5cblx0d2hlbiBJUy5zdHJpbmcoYXJnc1swXSlcdFx0XHRcblx0XHR0eXBlID0gYXJnc1swXS50b0xvd2VyQ2FzZSgpXG5cdFx0aWYgdHlwZSBpcyAndGV4dCdcblx0XHRcdG9wdGlvbnMgPSBpZiBJUy5vYmplY3QoYXJnc1sxXSkgdGhlbiBhcmdzWzFdIGVsc2Uge3RleHQ6YXJnc1sxXSBvciAnJ31cblx0XHRlbHNlXG5cdFx0XHRvcHRpb25zID0gaWYgSVMub2JqZWN0KGFyZ3NbMV0pIHRoZW4gYXJnc1sxXSBlbHNlIHt9XG5cdFx0XG5cdFx0ZWxlbWVudCA9IG5ldyBRdWlja0VsZW1lbnQodHlwZSwgb3B0aW9ucylcblx0XHRpZiBhcmdzLmxlbmd0aCA+IDJcblx0XHRcdGNoaWxkcmVuID0gbmV3IEFycmF5KGFyZ3NMZW5ndGggPSBhcmdzLmxlbmd0aCk7IGkgPSAxO1xuXHRcdFx0Y2hpbGRyZW5baSsxXSA9IGFyZ3NbaV0gd2hpbGUgKytpIDwgYXJnc0xlbmd0aFxuXG5cdFx0XHRmb3IgY2hpbGQgaW4gY2hpbGRyZW5cblx0XHRcdFx0Y2hpbGQgPSBRdWlja0RvbS50ZXh0KGNoaWxkKSBpZiBJUy5zdHJpbmcoY2hpbGQpXG5cdFx0XHRcdGNoaWxkID0gUXVpY2tEb20oY2hpbGQuLi4pIGlmIElTLmFycmF5KGNoaWxkKVxuXHRcdFx0XHRlbGVtZW50LmFwcGVuZChjaGlsZCkgaWYgSVMucXVpY2tEb21FbChjaGlsZClcblxuXHRcdHJldHVybiBlbGVtZW50XG5cblx0d2hlbiBhcmdzWzBdIGFuZCAoSVMuZG9tTm9kZShhcmdzWzBdWzBdKSBvciBJUy5kb21Eb2MoYXJnc1swXVswXSkpXG5cdFx0cmV0dXJuIFF1aWNrRG9tKGFyZ3NbMF1bMF0pXG5cblxuUXVpY2tEb20udGVtcGxhdGUgPSAodHJlZSktPlxuXHRuZXcgUXVpY2tUZW1wbGF0ZSh0cmVlLCB0cnVlKVxuXG5cblF1aWNrRG9tLmh0bWwgPSAoaW5uZXJIVE1MKS0+XG5cdGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdGNvbnRhaW5lci5pbm5lckhUTUwgPSBpbm5lckhUTUxcblx0Y2hpbGRyZW4gPSBBcnJheTo6c2xpY2UuY2FsbCBjb250YWluZXIuY2hpbGROb2Rlc1xuXG5cdHJldHVybiBRdWlja0RvbS5iYXRjaChjaGlsZHJlbilcblxuUXVpY2tEb20ucXVlcnkgPSAodGFyZ2V0KS0+XG5cdFF1aWNrRG9tKGRvY3VtZW50KS5xdWVyeSh0YXJnZXQpXG5cblF1aWNrRG9tLnF1ZXJ5QWxsID0gKHRhcmdldCktPlxuXHRRdWlja0RvbShkb2N1bWVudCkucXVlcnlBbGwodGFyZ2V0KVxuXG5RdWlja0RvbS5pc1RlbXBsYXRlID0gKHRhcmdldCktPlxuXHRJUy50ZW1wbGF0ZSh0YXJnZXQpXG5cblF1aWNrRG9tLmlzUXVpY2tFbCA9ICh0YXJnZXQpLT5cblx0SVMucXVpY2tEb21FbCh0YXJnZXQpXG5cblF1aWNrRG9tLmlzRWwgPSAodGFyZ2V0KS0+XG5cdElTLmRvbUVsKHRhcmdldClcblxuXG5cblxuXyRzbSgnLi9wYXJ0cy9iYXRjaCcgKVxuXyRzbSgnLi9wYXJ0cy90ZW1wbGF0ZScgKVxuXyRzbSgnLi9wYXJ0cy9zaG9ydGN1dHMnIClcblF1aWNrRG9tLnZlcnNpb24gPSBfJHNtKCcuLi9wYWNrYWdlLmpzb24gJCB2ZXJzaW9uJyApXG5RdWlja0RvbS5DU1MgPSBDU1Ncbm1vZHVsZS5leHBvcnRzID0gUXVpY2tEb21cblxuXG5cbiJdfQ==
;
return module.exports;
},
7: function (require, module, exports) {
exports.default =  {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWZhdWx0cy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBQSxRQUNDO0VBQUEsVUFBQSxFQUFZLFFBQVEsQ0FBQyxJQUFyQjtFQUNBLFFBQUEsRUFBVSxRQURWO0VBRUEsZUFBQSxFQUFpQixLQUZqQjtFQUdBLFNBQUEsRUFBVyxJQUhYO0VBSUEsUUFBQSxFQUFVLElBSlY7RUFLQSxJQUFBLEVBQU0sSUFMTjtFQU1BLFVBQUEsRUFBWSxTQU5aO0VBT0EsTUFBQSxFQUNDO0lBQUEsT0FBQSxFQUFTLFNBQVQ7SUFDQSxTQUFBLEVBQVcsTUFEWDtHQVJEIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHRcblx0Ym91bmRpbmdFbDogZG9jdW1lbnQuYm9keVxuXHR0YWdMYWJlbDogJ09wdGlvbidcblx0cmVxdWlyZURlZmF1bHRzOiBmYWxzZVxuXHR0ZW1wbGF0ZXM6IG51bGxcblx0ZGVmYXVsdHM6IG51bGxcblx0dGFnczogbnVsbFxuXHRmb250RmFtaWx5OiAnaW5oZXJpdCdcblx0YnV0dG9uOlxuXHRcdGJnQ29sb3I6ICcjZjc0NDI1J1xuXHRcdHRleHRDb2xvcjogJyNmZmYnIl19
;
return module.exports;
},
8: function (require, module, exports) {
var __64 = require(6), DOM = __64.default;;

var addButton = DOM.template([
  'div', {
    ref: 'addButton',
    style: {
      position: 'relative',
      display: 'inline-block',
      verticalAlign: 'top',
      height: '28px',
      width: '28px',
      boxSizing: 'border-box'
    }
  }, [
    'div', {
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
    }, [
      'div', {
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
      }, '+'
    ]
  ]
]);
exports.addButton = addButton; 

exports.default = DOM.template([
  'div', {
    ref: 'TagList',
    style: {
      position: 'relative',
      textAlign: 'left',
      fontFamily: function(taglist) {
        return taglist.settings.fontFamily;
      }
    }
  }, addButton
]);

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZW1wbGF0ZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxDQUFLLFVBQUwsRUFBZ0IsS0FBaEI7O0FBRUEsT0FBQSxJQUFPLFNBQVAsR0FBbUIsR0FBRyxDQUFDLFFBQUosQ0FDbEI7RUFBQyxLQUFELEVBQ0M7SUFBQSxHQUFBLEVBQUssV0FBTDtJQUNBLEtBQUEsRUFDQztNQUFBLFFBQUEsRUFBVSxVQUFWO01BQ0EsT0FBQSxFQUFTLGNBRFQ7TUFFQSxhQUFBLEVBQWUsS0FGZjtNQUdBLE1BQUEsRUFBUSxNQUhSO01BSUEsS0FBQSxFQUFPLE1BSlA7TUFLQSxTQUFBLEVBQVcsWUFMWDtLQUZEO0dBREQsRUFVQztJQUFDLEtBQUQsRUFDQztNQUFBLEtBQUEsRUFHQztRQUFBLE1BQUEsRUFBUSxNQUFSO1FBQ0EsS0FBQSxFQUFPLE1BRFA7UUFFQSxNQUFBLEVBQVEsWUFGUjtRQUdBLFlBQUEsRUFBYyxLQUhkO1FBSUEsU0FBQSxFQUFXLFlBSlg7UUFLQSxNQUFBLEVBQVEsU0FMUjtRQU1BLFVBQUEsRUFBWSxNQU5aO1FBT0EsT0FBQSxFQUFTLElBUFQ7UUFRQSxLQUFBLEVBQU8sU0FSUDtPQUhEO0tBREQsRUFjQztNQUFDLEtBQUQsRUFDQztRQUFBLEdBQUEsRUFBSyxtQkFBTDtRQUNBLEtBQUEsRUFDQztVQUFBLFFBQUEsRUFBVSxVQUFWO1VBQ0EsSUFBQSxFQUFNLENBRE47VUFFQSxLQUFBLEVBQU8sQ0FGUDtVQUdBLEdBQUEsRUFBSyxLQUhMO1VBSUEsU0FBQSxFQUFXLG9CQUpYO1VBS0EsS0FBQSxFQUFPLE1BTFA7VUFNQSxVQUFBLEVBQVksQ0FOWjtVQU9BLFNBQUEsRUFBVyxRQVBYO1VBUUEsUUFBQSxFQUFVLE1BUlY7VUFTQSxVQUFBLEVBQVksR0FUWjtTQUZEO09BREQsRUFhQSxHQWJBO0tBZEQ7R0FWRDtDQURrQjs7QUE4Q25CLE9BQUEsUUFBZSxHQUFHLENBQUMsUUFBSixDQUNkO0VBQUMsS0FBRCxFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUw7SUFDQSxLQUFBLEVBQ0M7TUFBQSxRQUFBLEVBQVUsVUFBVjtNQUNBLFNBQUEsRUFBVyxNQURYO01BRUEsVUFBQSxFQUFZLFNBQUMsT0FBRDtlQUFZLE9BQU8sQ0FBQyxRQUFRLENBQUM7TUFBN0IsQ0FGWjtLQUZEO0dBREQsRUFPQyxTQVBEO0NBRGMiLCJzb3VyY2VzQ29udGVudCI6WyJfJHNtKCdxdWlja2RvbScsJ0RPTScgICAgKVxuXG5leHBvcnQgYWRkQnV0dG9uID0gRE9NLnRlbXBsYXRlKFxuXHRbJ2Rpdidcblx0XHRyZWY6ICdhZGRCdXR0b24nXG5cdFx0c3R5bGU6XG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuXHRcdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaydcblx0XHRcdHZlcnRpY2FsQWxpZ246ICd0b3AnXG5cdFx0XHRoZWlnaHQ6ICcyOHB4J1xuXHRcdFx0d2lkdGg6ICcyOHB4J1xuXHRcdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCdcblxuXHRcdFsnZGl2J1xuXHRcdFx0c3R5bGU6IFxuXHRcdFx0XHQjIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG5cdFx0XHRcdCMgdmVydGljYWxBbGlnbjogJ3RvcCdcblx0XHRcdFx0aGVpZ2h0OiAnMTAwJSdcblx0XHRcdFx0d2lkdGg6ICcxMDAlJ1xuXHRcdFx0XHRib3JkZXI6ICcycHggZGFzaGVkJ1xuXHRcdFx0XHRib3JkZXJSYWRpdXM6ICc1cHgnXG5cdFx0XHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnXG5cdFx0XHRcdGN1cnNvcjogJ3BvaW50ZXInXG5cdFx0XHRcdHVzZXJTZWxlY3Q6ICdub25lJ1xuXHRcdFx0XHRvcGFjaXR5OiAwLjM1XG5cdFx0XHRcdGNvbG9yOiAnIzE4MTgxOCdcblx0XHRcdFxuXHRcdFx0WydkaXYnXG5cdFx0XHRcdHJlZjogJ1RhZ0xpc3RCdXR0b25UZXh0J1xuXHRcdFx0XHRzdHlsZTpcblx0XHRcdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJ1xuXHRcdFx0XHRcdGxlZnQ6IDBcblx0XHRcdFx0XHRyaWdodDogMFxuXHRcdFx0XHRcdHRvcDogJzU1JSdcblx0XHRcdFx0XHR0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMCwgLTUwJSknXG5cdFx0XHRcdFx0d2lkdGg6ICcxMDAlJ1xuXHRcdFx0XHRcdGxpbmVIZWlnaHQ6IDFcblx0XHRcdFx0XHR0ZXh0QWxpZ246ICdjZW50ZXInXG5cdFx0XHRcdFx0Zm9udFNpemU6ICcyM3B4J1xuXHRcdFx0XHRcdGZvbnRXZWlnaHQ6IDYwMFxuXHRcdFx0JysnXVxuXHRcdF1cblxuXHRdXG4pXG5cblxuXG5leHBvcnQgZGVmYXVsdCBET00udGVtcGxhdGUoXG5cdFsnZGl2J1xuXHRcdHJlZjogJ1RhZ0xpc3QnXG5cdFx0c3R5bGU6XG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuXHRcdFx0dGV4dEFsaWduOiAnbGVmdCdcblx0XHRcdGZvbnRGYW1pbHk6ICh0YWdsaXN0KS0+IHRhZ2xpc3Quc2V0dGluZ3MuZm9udEZhbWlseVxuXG5cdFx0YWRkQnV0dG9uXG5cdF1cbilcblxuIl19
;
return module.exports;
},
9: function (require, module, exports) {
var toArray = function(object) {
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
exports.toArray = toArray; 

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlbHBlcnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQUEsSUFBTyxPQUFQLEdBQWlCLFNBQUMsTUFBRDtBQUNoQixNQUFBO0VBQUEsSUFBRyxLQUFLLENBQUMsT0FBTixDQUFjLE1BQWQsQ0FBSDtBQUNDLFdBQU8sT0FEUjtHQUFBLE1BQUE7QUFHQztTQUFBLGNBQUE7O21CQUFBO1FBQUMsTUFBQSxJQUFEO1FBQU0sT0FBQSxLQUFOOztBQUFBO21CQUhEOztBQURnQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0b0FycmF5ID0gKG9iamVjdCktPlxuXHRpZiBBcnJheS5pc0FycmF5KG9iamVjdClcblx0XHRyZXR1cm4gb2JqZWN0XG5cdGVsc2Vcblx0XHR7bmFtZSx2YWx1ZX0gZm9yIG5hbWUsdmFsdWUgb2Ygb2JqZWN0XG5cbiJdfQ==
;
return module.exports;
},
10: function (require, module, exports) {
/**
 * event-lite.js - Light-weight EventEmitter (less than 1KB when gzipped)
 *
 * @copyright Yusuke Kawasaki
 * @license MIT
 * @constructor
 * @see https://github.com/kawanet/event-lite
 * @see http://kawanet.github.io/event-lite/EventLite.html
 * @example
 * var EventLite = require("event-lite");
 *
 * function MyClass() {...}             // your class
 *
 * EventLite.mixin(MyClass.prototype);  // import event methods
 *
 * var obj = new MyClass();
 * obj.on("foo", function() {...});     // add event listener
 * obj.once("bar", function() {...});   // add one-time event listener
 * obj.emit("foo");                     // dispatch event
 * obj.emit("bar");                     // dispatch another event
 * obj.off("foo");                      // remove event listener
 */

function EventLite() {
  if (!(this instanceof EventLite)) return new EventLite();
}

(function(EventLite) {
  // export the class for node.js
  if ("undefined" !== typeof module) module.exports = EventLite;

  // property name to hold listeners
  var LISTENERS = "listeners";

  // methods to export
  var methods = {
    on: on,
    once: once,
    off: off,
    emit: emit
  };

  // mixin to self
  mixin(EventLite.prototype);

  // export mixin function
  EventLite.mixin = mixin;

  /**
   * Import on(), once(), off() and emit() methods into target object.
   *
   * @function EventLite.mixin
   * @param target {Prototype}
   */

  function mixin(target) {
    for (var key in methods) {
      target[key] = methods[key];
    }
    return target;
  }

  /**
   * Add an event listener.
   *
   * @function EventLite.prototype.on
   * @param type {string}
   * @param func {Function}
   * @returns {EventLite} Self for method chaining
   */

  function on(type, func) {
    getListeners(this, type).push(func);
    return this;
  }

  /**
   * Add one-time event listener.
   *
   * @function EventLite.prototype.once
   * @param type {string}
   * @param func {Function}
   * @returns {EventLite} Self for method chaining
   */

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

  /**
   * Remove an event listener.
   *
   * @function EventLite.prototype.off
   * @param [type] {string}
   * @param [func] {Function}
   * @returns {EventLite} Self for method chaining
   */

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

  /**
   * Dispatch (trigger) an event.
   *
   * @function EventLite.prototype.emit
   * @param type {string}
   * @param [value] {*}
   * @returns {boolean} True when a listener received the event
   */

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

  /**
   * @ignore
   */

  function getListeners(that, type, readonly) {
    if (readonly && !that[LISTENERS]) return;
    var listeners = that[LISTENERS] || (that[LISTENERS] = {});
    return listeners[type] || (listeners[type] = []);
  }

})(EventLite);
;
return module.exports;
},
11: function (require, module, exports) {
/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.14.3
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Popper = factory());
}(this, (function () { 'use strict';

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

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var css = getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
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

  // Firefox want us to check `-x` and `-y` variations as well

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

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TD or TABLE in case
  // no offsetParent is present, I hate this job...
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

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
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

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
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

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

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

var classCallCheck = function (instance, Constructor) {
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





var defineProperty = function (obj, key, value) {
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

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
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

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
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

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
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

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop, 10);
    var marginLeft = parseFloat(styles.marginLeft, 10);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
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

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
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

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
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

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
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

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
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

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
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

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
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

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
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

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
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

/**
 * Destroy the popper
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
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

  // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger onUpdate callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
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

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  // Avoid blurry text by using full pixel integers.
  // For pixel-perfect positioning, top/bottom prefers rounded
  // values, while left/right prefers floored values.
  var offsets = {
    left: Math.floor(popper.left),
    top: Math.round(popper.top),
    bottom: Math.round(popper.bottom),
    right: Math.floor(popper.right)
  };

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
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
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
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

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
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

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjuction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-right` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
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

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
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

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
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

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
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
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
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
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
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

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
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

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
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

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
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

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unitless, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the height.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * An scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper this makes sure the popper has always a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier, can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near eachothers
   * without leaving any gap between the two. Expecially useful when the arrow is
   * enabled and you want to assure it to point to its reference element.
   * It cares only about the first axis, you can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjuction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations).
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position,
     * the popper will never be placed outside of the defined boundaries
     * (except if keepTogether is enabled)
     */
    boundariesElement: 'viewport'
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define you own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the informations used by Popper.js
 * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overriden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass as 3rd argument an object with the same
 * structure of this object, example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated, this callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Create a new Popper.js instance
   * @class Popper
   * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper.
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


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

    /**
     * Schedule an update, it will run on the next UI update available
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

return Popper;

})));
//# sourceMappingURL=popper.js.map
;
return module.exports;
},
12: function (require, module, exports) {
var __65 = require(6), DOM = __65.default;;

var button = DOM.template([
  'div', {
    ref: 'button',
    style: {
      position: 'relative',
      height: 50,
      borderRadius: '0 0 5px 5px',
      boxSizing: 'border-box',
      cursor: 'pointer',
      userSelect: 'none',
      backgroundColor: function(i) {
        return i.settings.button.bgColor;
      },
      color: function(i) {
        return i.settings.button.textColor;
      }
    },
    computers: {
      height: function(height) {
        return this.style({
          height: height
        });
      }
    }
  }, [
    'div', {
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
        text: function(text) {
          return this.text = text;
        },
        size: function(fontSize) {
          return this.style({
            fontSize: fontSize
          });
        },
        font: function(fontFamily) {
          return this.style({
            fontFamily: fontFamily
          });
        }
      }
    }
  ]
]);
exports.button = button; 

exports.default = DOM.template([
  'div', {
    ref: 'TagList-Popup',
    style: {
      position: 'relative',
      zIndex: 2001,
      backgroundColor: 'white',
      borderRadius: '5px',
      boxShadow: '0px 3px 18px rgba(0,0,0,0.24)',
      boxSizing: 'border-box',
      fontFamily: function(popup) {
        return popup.settings.fontFamily;
      }
    }
  }, [
    'div', {
      ref: 'content'
    }
  ]
]);

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZW1wbGF0ZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxDQUFLLFVBQUwsRUFBZ0IsS0FBaEI7O0FBRUEsT0FBQSxJQUFPLE1BQVAsR0FBZ0IsR0FBRyxDQUFDLFFBQUosQ0FDZjtFQUFDLEtBQUQsRUFDQztJQUFBLEdBQUEsRUFBSyxRQUFMO0lBQ0EsS0FBQSxFQUNDO01BQUEsUUFBQSxFQUFVLFVBQVY7TUFDQSxNQUFBLEVBQVEsRUFEUjtNQUVBLFlBQUEsRUFBYyxhQUZkO01BR0EsU0FBQSxFQUFXLFlBSFg7TUFJQSxNQUFBLEVBQVEsU0FKUjtNQUtBLFVBQUEsRUFBWSxNQUxaO01BTUEsZUFBQSxFQUFpQixTQUFDLENBQUQ7ZUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztNQUF4QixDQU5qQjtNQU9BLEtBQUEsRUFBTyxTQUFDLENBQUQ7ZUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztNQUF4QixDQVBQO0tBRkQ7SUFVQSxTQUFBLEVBQ0M7TUFBQSxNQUFBLEVBQVEsU0FBQyxNQUFEO2VBQVcsSUFBQyxDQUFBLEtBQUQsQ0FBTztVQUFDLFFBQUEsTUFBRDtTQUFQO01BQVgsQ0FBUjtLQVhEO0dBREQsRUFlQztJQUFDLEtBQUQsRUFDQztNQUFBLEdBQUEsRUFBSyxZQUFMO01BQ0EsS0FBQSxFQUNDO1FBQUEsUUFBQSxFQUFVLFVBQVY7UUFDQSxHQUFBLEVBQUssS0FETDtRQUVBLFNBQUEsRUFBVyxvQkFGWDtRQUdBLE9BQUEsRUFBUyxPQUhUO1FBSUEsS0FBQSxFQUFPLE1BSlA7UUFLQSxRQUFBLEVBQVUsRUFMVjtRQU1BLFVBQUEsRUFBWSxDQU5aO1FBT0EsVUFBQSxFQUFZLEdBUFo7UUFRQSxTQUFBLEVBQVcsUUFSWDtRQVNBLGFBQUEsRUFBZSxXQVRmO1FBVUEsYUFBQSxFQUFlLE9BVmY7T0FGRDtNQWFBLFNBQUEsRUFDQztRQUFBLElBQUEsRUFBTSxTQUFDLElBQUQ7aUJBQVMsSUFBQyxDQUFBLElBQUQsR0FBUTtRQUFqQixDQUFOO1FBQ0EsSUFBQSxFQUFNLFNBQUMsUUFBRDtpQkFBYSxJQUFDLENBQUEsS0FBRCxDQUFPO1lBQUMsVUFBQSxRQUFEO1dBQVA7UUFBYixDQUROO1FBRUEsSUFBQSxFQUFNLFNBQUMsVUFBRDtpQkFBZSxJQUFDLENBQUEsS0FBRCxDQUFPO1lBQUMsWUFBQSxVQUFEO1dBQVA7UUFBZixDQUZOO09BZEQ7S0FERDtHQWZEO0NBRGU7O0FBc0NoQixPQUFBLFFBQWUsR0FBRyxDQUFDLFFBQUosQ0FDZDtFQUFDLEtBQUQsRUFDQztJQUFBLEdBQUEsRUFBSyxlQUFMO0lBQ0EsS0FBQSxFQUNDO01BQUEsUUFBQSxFQUFVLFVBQVY7TUFDQSxNQUFBLEVBQVEsSUFEUjtNQUVBLGVBQUEsRUFBaUIsT0FGakI7TUFHQSxZQUFBLEVBQWMsS0FIZDtNQUlBLFNBQUEsRUFBVywrQkFKWDtNQUtBLFNBQUEsRUFBVyxZQUxYO01BTUEsVUFBQSxFQUFZLFNBQUMsS0FBRDtlQUFVLEtBQUssQ0FBQyxRQUFRLENBQUM7TUFBekIsQ0FOWjtLQUZEO0dBREQsRUFXQztJQUFDLEtBQUQsRUFDQztNQUFBLEdBQUEsRUFBSyxTQUFMO0tBREQ7R0FYRDtDQURjIiwic291cmNlc0NvbnRlbnQiOlsiXyRzbSgncXVpY2tkb20nLCdET00nICAgIClcblxuZXhwb3J0IGJ1dHRvbiA9IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAnYnV0dG9uJ1xuXHRcdHN0eWxlOlxuXHRcdFx0cG9zaXRpb246ICdyZWxhdGl2ZSdcblx0XHRcdGhlaWdodDogNTBcblx0XHRcdGJvcmRlclJhZGl1czogJzAgMCA1cHggNXB4J1xuXHRcdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCdcblx0XHRcdGN1cnNvcjogJ3BvaW50ZXInXG5cdFx0XHR1c2VyU2VsZWN0OiAnbm9uZSdcblx0XHRcdGJhY2tncm91bmRDb2xvcjogKGkpLT4gaS5zZXR0aW5ncy5idXR0b24uYmdDb2xvclxuXHRcdFx0Y29sb3I6IChpKS0+IGkuc2V0dGluZ3MuYnV0dG9uLnRleHRDb2xvclxuXHRcdGNvbXB1dGVyczpcblx0XHRcdGhlaWdodDogKGhlaWdodCktPiBAc3R5bGUge2hlaWdodH1cblxuXG5cdFx0WydkaXYnXG5cdFx0XHRyZWY6ICdidXR0b25UZXh0J1xuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXG5cdFx0XHRcdHRvcDogJzUzJSdcblx0XHRcdFx0dHJhbnNmb3JtOiBcInRyYW5zbGF0ZSgwLCAtNTAlKVwiXG5cdFx0XHRcdGRpc3BsYXk6ICdibG9jaydcblx0XHRcdFx0d2lkdGg6ICcxMDAlJ1xuXHRcdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdFx0bGluZUhlaWdodDogMVxuXHRcdFx0XHRmb250V2VpZ2h0OiA0MDBcblx0XHRcdFx0dGV4dEFsaWduOiAnY2VudGVyJ1xuXHRcdFx0XHR0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJ1xuXHRcdFx0XHRsZXR0ZXJTcGFjaW5nOiAnMS41cHgnXG5cdFx0XHRjb21wdXRlcnM6XG5cdFx0XHRcdHRleHQ6ICh0ZXh0KS0+IEB0ZXh0ID0gdGV4dFxuXHRcdFx0XHRzaXplOiAoZm9udFNpemUpLT4gQHN0eWxlIHtmb250U2l6ZX1cblx0XHRcdFx0Zm9udDogKGZvbnRGYW1pbHkpLT4gQHN0eWxlIHtmb250RmFtaWx5fVxuXHRcdF1cblx0XVxuKVxuXG5leHBvcnQgZGVmYXVsdCBET00udGVtcGxhdGUoXG5cdFsnZGl2J1xuXHRcdHJlZjogJ1RhZ0xpc3QtUG9wdXAnXG5cdFx0c3R5bGU6XG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuXHRcdFx0ekluZGV4OiAyMDAxXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZSdcblx0XHRcdGJvcmRlclJhZGl1czogJzVweCdcblx0XHRcdGJveFNoYWRvdzogJzBweCAzcHggMThweCByZ2JhKDAsMCwwLDAuMjQpJ1xuXHRcdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCdcblx0XHRcdGZvbnRGYW1pbHk6IChwb3B1cCktPiBwb3B1cC5zZXR0aW5ncy5mb250RmFtaWx5XG5cdFx0XG5cdFx0WydkaXYnXG5cdFx0XHRyZWY6ICdjb250ZW50J1xuXHRcdF1cblx0XVxuKVxuXG5cbiJdfQ==
;
return module.exports;
},
13: function (require, module, exports) {
exports.default = function (value, formatter) {
  var alias;
  switch (false) {
    case typeof formatter !== 'undefined':
      return value;
    case typeof formatter !== 'function':
      return formatter(value);
    case !Array.isArray(formatter):
      alias = formatter.find(function(candidate) {
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
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5naWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RyaW5naWZ5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFBLFFBQWUsU0FBQyxLQUFELEVBQVEsU0FBUjtBQUFxQixNQUFBO0FBQUEsVUFBQSxLQUFBO0FBQUEsU0FDOUIsT0FBTyxTQUFQLEtBQW9CLFdBRFU7QUFFbEMsYUFBTztBQUYyQixTQUk5QixPQUFPLFNBQVAsS0FBb0IsVUFKVTtBQUtsQyxhQUFPLFNBQUEsQ0FBVSxLQUFWO0FBTDJCLFVBTzlCLEtBQUssQ0FBQyxPQUFOLENBQWMsU0FBZCxDQVA4QjtNQVFsQyxLQUFBLEdBQVEsU0FBUyxDQUFDLElBQVYsQ0FBZSxTQUFDLFNBQUQ7ZUFBYyxTQUFTLENBQUMsS0FBVixLQUFtQjtNQUFqQyxDQUFmO01BQ1IsSUFBRyxLQUFIO0FBQ0MsZUFBTyxLQUFLLENBQUMsS0FBTixJQUFlLEtBQUssQ0FBQyxLQUQ3QjtPQUFBLE1BQUE7QUFHQyxlQUFPLE1BSFI7OztBQVRrQyxXQWM5QixPQUFPLFNBQVAsS0FBb0IsUUFBcEIsSUFBaUMsVUFkSDtBQWVsQyxhQUFPLFNBQVUsQ0FBQSxLQUFBLENBQVYsSUFBb0I7QUFmTztBQUFyQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0ICh2YWx1ZSwgZm9ybWF0dGVyKS0+IHN3aXRjaFxuXHR3aGVuIHR5cGVvZiBmb3JtYXR0ZXIgaXMgJ3VuZGVmaW5lZCdcblx0XHRyZXR1cm4gdmFsdWVcblx0XG5cdHdoZW4gdHlwZW9mIGZvcm1hdHRlciBpcyAnZnVuY3Rpb24nXG5cdFx0cmV0dXJuIGZvcm1hdHRlcih2YWx1ZSlcblxuXHR3aGVuIEFycmF5LmlzQXJyYXkoZm9ybWF0dGVyKVxuXHRcdGFsaWFzID0gZm9ybWF0dGVyLmZpbmQgKGNhbmRpZGF0ZSktPiBjYW5kaWRhdGUudmFsdWUgaXMgdmFsdWVcblx0XHRpZiBhbGlhc1xuXHRcdFx0cmV0dXJuIGFsaWFzLmxhYmVsIG9yIGFsaWFzLm5hbWVcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdmFsdWVcblxuXHR3aGVuIHR5cGVvZiBmb3JtYXR0ZXIgaXMgJ29iamVjdCcgYW5kIGZvcm1hdHRlclxuXHRcdHJldHVybiBmb3JtYXR0ZXJbdmFsdWVdIG9yIHZhbHVlIl19
;
return module.exports;
},
14: function (require, module, exports) {
exports.default = function (tag) {
  var updater;
  updater = function(newValue) {
    return updater.tag._updateFromField(newValue);
  };
  updater.tag = tag;
  return updater;
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVwZGF0ZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQUEsUUFBZSxTQUFDLEdBQUQ7QUFDZCxNQUFBO0VBQUEsT0FBQSxHQUFVLFNBQUMsUUFBRDtXQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQVosQ0FBNkIsUUFBN0I7RUFEUztFQUdWLE9BQU8sQ0FBQyxHQUFSLEdBQWM7QUFDZCxTQUFPO0FBTE8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAodGFnKS0+XG5cdHVwZGF0ZXIgPSAobmV3VmFsdWUpLT5cblx0XHR1cGRhdGVyLnRhZy5fdXBkYXRlRnJvbUZpZWxkKG5ld1ZhbHVlKVxuXG5cdHVwZGF0ZXIudGFnID0gdGFnXG5cdHJldHVybiB1cGRhdGVyIl19
;
return module.exports;
},
15: function (require, module, exports) {
var __66 = require(6), DOM = __66.default;;

var __122 = require(12), button_ = __122.button;;

var button = DOM.template([
  'div', {
    ref: 'button'
  }, [
    'div', {
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
        set: function(message) {
          this.html = message;
          this.show();
          clearTimeout(this._timeout);
          return this._timeout = setTimeout((function(_this) {
            return function() {
              return _this.clear();
            };
          })(this), 8000);
        },
        clear: function() {
          this.text = '';
          return this.hide();
        }
      }
    }
  ], button_.extend({
    ref: 'button_'
  }, [
    'div', {
      style: {
        backgroundColor: '#d4d4d4',
        $hover: {
          backgroundColor: function(i) {
            return i.settings.button.bgColor;
          }
        }
      }
    }
  ])
]);
exports.button = button; 

var removeButton = DOM.template([
  'div', {
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
  }, '×'
]);
exports.removeButton = removeButton; 

var text = DOM.template([
   'div', {
     ref: 'text',
     style: {
       position: 'relative',
       top: '9px',
       fontSize: '13.2px',
       lineHeight: 1
     }
   }, [
     'span', {
       ref: 'label',
       style: {
         fontWeight: 600
       }
     }
   ], [
     'span', {
       ref: 'value'
     }
   ]
 ]);
 exports.text = text; 

var content = DOM.template([
         'div', {
           ref: 'tagContent',
           style: {
             boxSizing: 'border-box',
             padding: function(i) {
               return i.settings.padding + "px";
             },
             maxWidth: function(i) {
               return i.settings.maxWidth + "px";
             }
           }
         }
       ]);
       exports.content = content; 

exports.default = DOM.template([
  'div', {
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
      backgroundColor: function(tag) {
        return tag.settings.bgColor;
      },
      color: function(tag) {
        return tag.settings.textColor;
      },
      fontFamily: function(tag) {
        return tag.settings.fontFamily;
      }
    }
  }, text, removeButton
]);

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZW1wbGF0ZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxDQUFLLFVBQUwsRUFBZ0IsS0FBaEI7O0FBQ0EsSUFBQSxDQUFLLG1CQUFMLEVBQXlCLHFCQUF6Qjs7QUFFQSxPQUFBLElBQU8sTUFBUCxHQUFnQixHQUFHLENBQUMsUUFBSixDQUNmO0VBQUMsS0FBRCxFQUNDO0lBQUEsR0FBQSxFQUFLLFFBQUw7R0FERCxFQUVDO0lBQUMsS0FBRCxFQUNDO01BQUEsR0FBQSxFQUFLLGNBQUw7TUFDQSxLQUFBLEVBQ0M7UUFBQSxTQUFBLEVBQVcsWUFBWDtRQUNBLE9BQUEsRUFBUyxNQURUO1FBRUEsT0FBQSxFQUFTLFdBRlQ7UUFHQSxRQUFBLEVBQVUsRUFIVjtRQUlBLFVBQUEsRUFBWSxHQUpaO1FBS0EsS0FBQSxFQUFPLFNBTFA7T0FGRDtNQVNBLE9BQUEsRUFDQztRQUFBLEdBQUEsRUFBSyxTQUFDLE9BQUQ7VUFDSixJQUFDLENBQUEsSUFBRCxHQUFRO1VBQ1IsSUFBQyxDQUFBLElBQUQsQ0FBQTtVQUVBLFlBQUEsQ0FBYSxJQUFDLENBQUEsUUFBZDtpQkFDQSxJQUFDLENBQUEsUUFBRCxHQUFZLFVBQUEsQ0FBVyxDQUFBLFNBQUEsS0FBQTttQkFBQSxTQUFBO3FCQUN0QixLQUFDLENBQUEsS0FBRCxDQUFBO1lBRHNCO1VBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFYLEVBRVYsSUFGVTtRQUxSLENBQUw7UUFTQSxLQUFBLEVBQU8sU0FBQTtVQUNOLElBQUMsQ0FBQSxJQUFELEdBQVE7aUJBQ1IsSUFBQyxDQUFBLElBQUQsQ0FBQTtRQUZNLENBVFA7T0FWRDtLQUREO0dBRkQsRUEyQkMsT0FBTyxDQUFDLE1BQVIsQ0FDQztJQUFBLEdBQUEsRUFBSyxTQUFMO0dBREQsRUFFQztJQUFDLEtBQUQsRUFDQztNQUFBLEtBQUEsRUFDQztRQUFBLGVBQUEsRUFBaUIsU0FBakI7UUFDQSxNQUFBLEVBQ0M7VUFBQSxlQUFBLEVBQWlCLFNBQUMsQ0FBRDttQkFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztVQUF4QixDQUFqQjtTQUZEO09BREQ7S0FERDtHQUZELENBM0JEO0NBRGU7O0FBd0NoQixPQUFBLElBQU8sWUFBUCxHQUFzQixHQUFHLENBQUMsUUFBSixDQUNyQjtFQUFDLEtBQUQsRUFDQztJQUFBLEdBQUEsRUFBSyxjQUFMO0lBQ0EsS0FBQSxFQUNDO01BQUEsUUFBQSxFQUFVLFVBQVY7TUFDQSxLQUFBLEVBQU8sS0FEUDtNQUVBLEdBQUEsRUFBSyxLQUZMO01BR0EsU0FBQSxFQUFXLG9CQUhYO01BSUEsUUFBQSxFQUFVLE1BSlY7TUFLQSxVQUFBLEVBQVksQ0FMWjtNQU1BLE9BQUEsRUFBUyxHQU5UO01BT0EsVUFBQSxFQUFZLEdBUFo7S0FGRDtHQURELEVBV0EsR0FYQTtDQURxQjs7QUFldEIsT0FBQSxJQUFPLElBQVAsR0FBYyxHQUFHLENBQUMsUUFBSixDQUNiO0VBQUMsS0FBRCxFQUNDO0lBQUEsR0FBQSxFQUFLLE1BQUw7SUFDQSxLQUFBLEVBQ0M7TUFBQSxRQUFBLEVBQVUsVUFBVjtNQUNBLEdBQUEsRUFBSyxLQURMO01BRUEsUUFBQSxFQUFVLFFBRlY7TUFHQSxVQUFBLEVBQVksQ0FIWjtLQUZEO0dBREQsRUFRQztJQUFDLE1BQUQsRUFDQztNQUFBLEdBQUEsRUFBSyxPQUFMO01BQ0EsS0FBQSxFQUNDO1FBQUEsVUFBQSxFQUFZLEdBQVo7T0FGRDtLQUREO0dBUkQsRUFjQztJQUFDLE1BQUQsRUFDQztNQUFBLEdBQUEsRUFBSyxPQUFMO0tBREQ7R0FkRDtDQURhOztBQXFCZCxPQUFBLElBQU8sT0FBUCxHQUFpQixHQUFHLENBQUMsUUFBSixDQUNoQjtFQUFDLEtBQUQsRUFDQztJQUFBLEdBQUEsRUFBSyxZQUFMO0lBQ0EsS0FBQSxFQUNDO01BQUEsU0FBQSxFQUFXLFlBQVg7TUFDQSxPQUFBLEVBQVMsU0FBQyxDQUFEO2VBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFaLEdBQW9CO01BQTVCLENBRFQ7TUFFQSxRQUFBLEVBQVUsU0FBQyxDQUFEO2VBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFaLEdBQXFCO01BQTdCLENBRlY7S0FGRDtHQUREO0NBRGdCOztBQVdqQixPQUFBLFFBQWUsR0FBRyxDQUFDLFFBQUosQ0FDZDtFQUFDLEtBQUQsRUFDQztJQUFBLEdBQUEsRUFBSyxLQUFMO0lBQ0EsS0FBQSxFQUNDO01BQUEsUUFBQSxFQUFVLFVBQVY7TUFDQSxPQUFBLEVBQVMsY0FEVDtNQUVBLGFBQUEsRUFBZSxLQUZmO01BR0EsTUFBQSxFQUFRLE1BSFI7TUFJQSxXQUFBLEVBQWEsTUFKYjtNQUtBLFlBQUEsRUFBYyxLQUxkO01BTUEsT0FBQSxFQUFTLGVBTlQ7TUFPQSxZQUFBLEVBQWMsS0FQZDtNQVFBLFNBQUEsRUFBVyxRQVJYO01BU0EsU0FBQSxFQUFXLFlBVFg7TUFVQSxNQUFBLEVBQVEsU0FWUjtNQVdBLFVBQUEsRUFBWSxNQVhaO01BWUEsZUFBQSxFQUFpQixTQUFDLEdBQUQ7ZUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDO01BQXJCLENBWmpCO01BYUEsS0FBQSxFQUFPLFNBQUMsR0FBRDtlQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUM7TUFBckIsQ0FiUDtNQWNBLFVBQUEsRUFBWSxTQUFDLEdBQUQ7ZUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDO01BQXJCLENBZFo7S0FGRDtHQURELEVBbUJDLElBbkJELEVBb0JDLFlBcEJEO0NBRGMiLCJzb3VyY2VzQ29udGVudCI6WyJfJHNtKCdxdWlja2RvbScsJ0RPTScgICAgKVxuXyRzbSgnLi4vcG9wdXAvdGVtcGxhdGUnLCd7YnV0dG9uIGFzIGJ1dHRvbl99JyAgICApXG5cbmV4cG9ydCBidXR0b24gPSBET00udGVtcGxhdGUoXG5cdFsnZGl2J1xuXHRcdHJlZjogJ2J1dHRvbidcblx0XHRbJ2Rpdidcblx0XHRcdHJlZjogJ2Vycm9yTWVzc2FnZSdcblx0XHRcdHN0eWxlOlxuXHRcdFx0XHRib3hTaXppbmc6ICdib3JkZXItYm94J1xuXHRcdFx0XHRkaXNwbGF5OiAnbm9uZSdcblx0XHRcdFx0cGFkZGluZzogJzEwcHggMTVweCdcblx0XHRcdFx0Zm9udFNpemU6IDEyXG5cdFx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0XHRjb2xvcjogJyNmNzQ0MjUnXG5cblx0XHRcdG1ldGhvZHM6XG5cdFx0XHRcdHNldDogKG1lc3NhZ2UpLT5cblx0XHRcdFx0XHRAaHRtbCA9IG1lc3NhZ2Vcblx0XHRcdFx0XHRAc2hvdygpXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KEBfdGltZW91dClcblx0XHRcdFx0XHRAX3RpbWVvdXQgPSBzZXRUaW1lb3V0ICgpPT5cblx0XHRcdFx0XHRcdEBjbGVhcigpXG5cdFx0XHRcdFx0LCA4MDAwXG5cdFx0XHRcdFxuXHRcdFx0XHRjbGVhcjogKCktPlxuXHRcdFx0XHRcdEB0ZXh0ID0gJydcblx0XHRcdFx0XHRAaGlkZSgpXG5cdFx0XVxuXHRcdFxuXHRcdGJ1dHRvbl8uZXh0ZW5kKFxuXHRcdFx0cmVmOiAnYnV0dG9uXydcblx0XHRcdFsnZGl2J1xuXHRcdFx0XHRzdHlsZTpcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjZDRkNGQ0J1xuXHRcdFx0XHRcdCRob3Zlcjpcblx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogKGkpLT4gaS5zZXR0aW5ncy5idXR0b24uYmdDb2xvclxuXHRcdFx0XVxuXHRcdClcblx0XVxuKVxuXG5leHBvcnQgcmVtb3ZlQnV0dG9uID0gRE9NLnRlbXBsYXRlKFxuXHRbJ2Rpdidcblx0XHRyZWY6ICdyZW1vdmVCdXR0b24nXG5cdFx0c3R5bGU6XG5cdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJ1xuXHRcdFx0cmlnaHQ6ICc4cHgnXG5cdFx0XHR0b3A6ICc1NSUnXG5cdFx0XHR0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDAsIC01MCUpXCJcblx0XHRcdGZvbnRTaXplOiAnMTdweCdcblx0XHRcdGxpbmVIZWlnaHQ6IDFcblx0XHRcdG9wYWNpdHk6IDAuNFxuXHRcdFx0Zm9udFdlaWdodDogNjAwXG5cdCfDlyddXG4pXG5cbmV4cG9ydCB0ZXh0ID0gRE9NLnRlbXBsYXRlKFxuXHRbJ2Rpdidcblx0XHRyZWY6ICd0ZXh0J1xuXHRcdHN0eWxlOlxuXHRcdFx0cG9zaXRpb246ICdyZWxhdGl2ZSdcblx0XHRcdHRvcDogJzlweCdcblx0XHRcdGZvbnRTaXplOiAnMTMuMnB4J1xuXHRcdFx0bGluZUhlaWdodDogMVxuXG5cdFx0WydzcGFuJ1xuXHRcdFx0cmVmOiAnbGFiZWwnXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0Zm9udFdlaWdodDogNjAwXG5cdFx0XVxuXG5cdFx0WydzcGFuJ1xuXHRcdFx0cmVmOiAndmFsdWUnXG5cdFx0XVxuXHRdXG4pXG5cbmV4cG9ydCBjb250ZW50ID0gRE9NLnRlbXBsYXRlKFxuXHRbJ2Rpdidcblx0XHRyZWY6ICd0YWdDb250ZW50J1xuXHRcdHN0eWxlOlxuXHRcdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCdcblx0XHRcdHBhZGRpbmc6IChpKS0+IFwiI3tpLnNldHRpbmdzLnBhZGRpbmd9cHhcIlxuXHRcdFx0bWF4V2lkdGg6IChpKS0+IFwiI3tpLnNldHRpbmdzLm1heFdpZHRofXB4XCJcblx0XVxuKVxuXG5cbmV4cG9ydCBkZWZhdWx0IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAndGFnJ1xuXHRcdHN0eWxlOlxuXHRcdFx0cG9zaXRpb246ICdyZWxhdGl2ZSdcblx0XHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG5cdFx0XHR2ZXJ0aWNhbEFsaWduOiAndG9wJ1xuXHRcdFx0aGVpZ2h0OiAnMjhweCdcblx0XHRcdG1hcmdpblJpZ2h0OiAnMTBweCdcblx0XHRcdG1hcmdpbkJvdHRvbTogJzZweCdcblx0XHRcdHBhZGRpbmc6ICcwIDI1cHggMCAxMHB4J1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiAnNHB4J1xuXHRcdFx0dGV4dEFsaWduOiAnY2VudGVyJ1xuXHRcdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCdcblx0XHRcdGN1cnNvcjogJ3BvaW50ZXInXG5cdFx0XHR1c2VyU2VsZWN0OiAnbm9uZSdcblx0XHRcdGJhY2tncm91bmRDb2xvcjogKHRhZyktPiB0YWcuc2V0dGluZ3MuYmdDb2xvclxuXHRcdFx0Y29sb3I6ICh0YWcpLT4gdGFnLnNldHRpbmdzLnRleHRDb2xvclxuXHRcdFx0Zm9udEZhbWlseTogKHRhZyktPiB0YWcuc2V0dGluZ3MuZm9udEZhbWlseVxuXG5cdFx0dGV4dFxuXHRcdHJlbW92ZUJ1dHRvblxuXHRdXG4pXG5cbiJdfQ==
;
return module.exports;
},
16: function (require, module, exports) {
var settings = {
  bgColor: '#ccc',
  textColor: '#181818',
  updateWhen: 'applied',
  hideLabel: false,
  padding: 20,
  maxWidth: 350
};
exports.settings = settings; 

var option = {
  getter: function() {
    return this.field.value;
  },
  setter: function(value) {
    return this.field.value = value;
  },
  validate: function(value) {
    return value != null;
  }
};
exports.option = option; 

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWZhdWx0cy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBQSxJQUFPLFFBQVAsR0FDQztFQUFBLE9BQUEsRUFBUyxNQUFUO0VBQ0EsU0FBQSxFQUFXLFNBRFg7RUFFQSxVQUFBLEVBQVksU0FGWjtFQUdBLFNBQUEsRUFBVyxLQUhYO0VBSUEsT0FBQSxFQUFTLEVBSlQ7RUFLQSxRQUFBLEVBQVUsR0FMVjs7O0FBUUQsT0FBQSxJQUFPLE1BQVAsR0FDQztFQUFBLE1BQUEsRUFBUSxTQUFBO1dBQUssSUFBQyxDQUFBLEtBQUssQ0FBQztFQUFaLENBQVI7RUFDQSxNQUFBLEVBQVEsU0FBQyxLQUFEO1dBQVUsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFQLEdBQWU7RUFBekIsQ0FEUjtFQUVBLFFBQUEsRUFBVSxTQUFDLEtBQUQ7V0FBVTtFQUFWLENBRlYiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgc2V0dGluZ3MgPVxuXHRiZ0NvbG9yOiAnI2NjYydcblx0dGV4dENvbG9yOiAnIzE4MTgxOCdcblx0dXBkYXRlV2hlbjogJ2FwcGxpZWQnICMgfHwgJ2NoYW5nZWQnXG5cdGhpZGVMYWJlbDogZmFsc2Vcblx0cGFkZGluZzogMjBcblx0bWF4V2lkdGg6IDM1MFxuXG5cbmV4cG9ydCBvcHRpb24gPVxuXHRnZXR0ZXI6ICgpLT4gQGZpZWxkLnZhbHVlXG5cdHNldHRlcjogKHZhbHVlKS0+IEBmaWVsZC52YWx1ZSA9IHZhbHVlXG5cdHZhbGlkYXRlOiAodmFsdWUpLT4gdmFsdWU/XG5cblxuIl19
;
return module.exports;
},
17: function (require, module, exports) {
var __32 = require(32), errorEx = __32.default;;

var ValidationError = errorEx('ValidationError');
 exports.ValidationError = ValidationError; 

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXJyb3JzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLENBQUssVUFBTCxFQUFnQixTQUFoQjs7QUFFQSxPQUFBLElBQU8sZUFBUCxHQUF5QixPQUFBLENBQVEsaUJBQVIiLCJzb3VyY2VzQ29udGVudCI6WyJfJHNtKCdlcnJvci1leCcsJ2Vycm9yRXgnICAgIClcblxuZXhwb3J0IFZhbGlkYXRpb25FcnJvciA9IGVycm9yRXgoJ1ZhbGlkYXRpb25FcnJvcicpXG4iXX0=
;
return module.exports;
},
18: function (require, module, exports) {
var BufferTag,
  extend1 = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

var __53 = require(5), extend = __53.default;;

var __33 = require(33), SelectField = __33.default;;

var __33 = require(3), Tag = __33.default;;

var __24 = require(2), Popup = __24.default;;

var defaults = require(16);

var __152 = require(15), content = __152.content, button = __152.button;;

module.exports = BufferTag = (function(superClass) {
  extend1(BufferTag, superClass);

  function BufferTag(list) {
    this.list = list;
    this.settings = this.list.settings;
    this.content = content.spawn(null, {
      relatedInstance: this
    });
    this.state = {};
    this.applyButton = this.button = button.spawn({
      data: {
        text: "Add " + this.settings.tagLabel
      }
    }, {
      relatedInstance: this
    });
    this.addButton = this.list.els.addButton;
    this.popup = new Popup(this.addButton, this.settings, this.settings.boundingEl);
    this.selectField = new SelectField(this.settings);
    this.content_ = DOM.div(null, this.content);
    this.selectField.insertBefore(this.content);
    this.applyButton.insertAfter(this.content);
    this.popup.setContent(this.content_);
    this._setup();
  }

  BufferTag.prototype._setup = function() {
    this.applyButton.on('click', (function(_this) {
      return function() {
        if (_this._validateHasField()) {
          return _this._applyChanges();
        }
      };
    })(this));
    this.addButton.on('click', (function(_this) {
      return function() {
        return _this.popup.open();
      };
    })(this));
    return this.selectField.on('change', (function(_this) {
      return function(arg) {
        var value;
        value = arg.value;
        return _this._setCurrent(value);
      };
    })(this));
  };

  BufferTag.prototype._setCurrent = function(name) {
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
  };

  BufferTag.prototype._validateHasField = function() {
    if (this.field) {
      return true;
    } else {
      this.button.child.errorMessage.set('You must select a field first');
      return false;
    }
  };

  BufferTag.prototype._updateSelectable = function() {
    var options;
    if (this.settings.repeatableValues) {
      options = this.list.options;
    } else {
      options = this.list.options.filter((function(_this) {
        return function(arg) {
          var name;
          name = arg.name;
          return _this.list._findTag(name);
        };
      })(this));
    }
    return this.selectField.setOptions(options);
  };

  BufferTag.prototype._notifyChange = function() {
    this.emit('change', this.option, this.value);
    return this._reset();
  };

  BufferTag.prototype._updateFromUser = function(value) {
    return this.option.setter.call(this, value);
  };

  BufferTag.prototype._updateFromField = function(value) {};

  BufferTag.prototype._reset = function() {
    this._setCurrent('');
    return this.popup.close();
  };

  BufferTag.prototype.get = Tag.prototype.get;

  BufferTag.prototype.set = Tag.prototype.set;

  BufferTag.prototype.validate = Tag.prototype.validate;

  BufferTag.prototype._initField = Tag.prototype._initField;

  BufferTag.prototype._applyChanges = Tag.prototype._applyChanges;

  Object.defineProperties(BufferTag.prototype, {
    els: {
      get: function() {
        return this.el.child;
      }
    },
    value: {
      get: function() {
        return this.get();
      }
    }
  });

  return BufferTag;

})(require(10));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVmZmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVmZmVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFNBQUE7RUFBQTs7O0FBQUEsSUFBQSxDQUFLLGNBQUwsRUFBb0IsUUFBcEI7O0FBQ0EsSUFBQSxDQUFLLGdCQUFMLEVBQXNCLGFBQXRCOztBQUNBLElBQUEsQ0FBSyxJQUFMLEVBQVUsS0FBVjs7QUFDQSxJQUFBLENBQUssVUFBTCxFQUFnQixPQUFoQjs7QUFDQSxJQUFBLENBQUssWUFBTCxFQUFrQixlQUFsQjs7QUFDQSxJQUFBLENBQUssWUFBTCxFQUFrQixtQkFBbEI7O0FBRU07OztFQUNRLG1CQUFDLElBQUQ7SUFBQyxJQUFDLENBQUEsT0FBRDtJQUNaLElBQUMsQ0FBQSxXQUFZLElBQUMsQ0FBQSxLQUFiO0lBQ0YsSUFBQyxDQUFBLE9BQUQsR0FBVyxPQUFPLENBQUMsS0FBUixDQUFjLElBQWQsRUFBb0I7TUFBQSxlQUFBLEVBQWdCLElBQWhCO0tBQXBCO0lBQ1gsSUFBQyxDQUFBLEtBQUQsR0FBUztJQUNULElBQUMsQ0FBQSxXQUFELEdBQWUsSUFBQyxDQUFBLE1BQUQsR0FBVSxNQUFNLENBQUMsS0FBUCxDQUFhO01BQUMsSUFBQSxFQUFLO1FBQUEsSUFBQSxFQUFLLE1BQUEsR0FBTyxJQUFDLENBQUEsUUFBUSxDQUFDLFFBQXRCO09BQU47S0FBYixFQUFzRDtNQUFBLGVBQUEsRUFBZ0IsSUFBaEI7S0FBdEQ7SUFDekIsSUFBQyxDQUFBLFNBQUQsR0FBYSxJQUFDLENBQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUN2QixJQUFDLENBQUEsS0FBRCxHQUFTLElBQUksS0FBSixDQUFVLElBQUMsQ0FBQSxTQUFYLEVBQXNCLElBQUMsQ0FBQSxRQUF2QixFQUFpQyxJQUFDLENBQUEsUUFBUSxDQUFDLFVBQTNDO0lBQ1QsSUFBQyxDQUFBLFdBQUQsR0FBZSxJQUFJLFdBQUosQ0FBZ0IsSUFBQyxDQUFBLFFBQWpCO0lBRWYsSUFBQyxDQUFBLFFBQUQsR0FBWSxHQUFHLENBQUMsR0FBSixDQUFRLElBQVIsRUFBYyxJQUFDLENBQUEsT0FBZjtJQUNaLElBQUMsQ0FBQSxXQUFXLENBQUMsWUFBYixDQUEwQixJQUFDLENBQUEsT0FBM0I7SUFDQSxJQUFDLENBQUEsV0FBVyxDQUFDLFdBQWIsQ0FBeUIsSUFBQyxDQUFBLE9BQTFCO0lBQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxVQUFQLENBQWtCLElBQUMsQ0FBQSxRQUFuQjtJQUNBLElBQUMsQ0FBQSxNQUFELENBQUE7RUFiWTs7c0JBZWIsTUFBQSxHQUFRLFNBQUE7SUFDUCxJQUFDLENBQUEsV0FBVyxDQUFDLEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO1FBQ3hCLElBQW9CLEtBQUMsQ0FBQSxpQkFBRCxDQUFBLENBQXBCO2lCQUFBLEtBQUMsQ0FBQSxhQUFELENBQUEsRUFBQTs7TUFEd0I7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXpCO0lBR0EsSUFBQyxDQUFBLFNBQVMsQ0FBQyxFQUFYLENBQWMsT0FBZCxFQUF1QixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7ZUFDdEIsS0FBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLENBQUE7TUFEc0I7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXZCO1dBR0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxFQUFiLENBQWdCLFFBQWhCLEVBQTBCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQyxHQUFEO0FBQ3pCLFlBQUE7UUFEMkIsUUFBRDtlQUMxQixLQUFDLENBQUEsV0FBRCxDQUFhLEtBQWI7TUFEeUI7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTFCO0VBUE87O3NCQVVSLFdBQUEsR0FBYSxTQUFDLElBQUQ7SUFDWixJQUFDLENBQUEsT0FBTyxDQUFDLEtBQVQsQ0FBQTtJQUNBLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBLElBQUksQ0FBQyxXQUFOLENBQWtCLElBQWxCO0lBRVYsSUFBRyxJQUFDLENBQUEsTUFBSjtNQUNDLElBQUMsQ0FBQSxNQUFELEdBQVUsTUFBTSxDQUFDLEtBQVAsQ0FBYSxRQUFRLENBQUMsTUFBdEIsRUFBOEIsSUFBQyxDQUFBLE1BQS9CO01BQ1YsSUFBQyxDQUFBLFVBQUQsQ0FBQSxFQUZEO0tBQUEsTUFBQTtNQUlDLElBQUMsQ0FBQSxLQUFELEdBQVMsS0FKVjs7SUFNQSxJQUFpQyxJQUFDLENBQUEsV0FBVyxDQUFDLEtBQWIsS0FBc0IsSUFBdkQ7YUFBQSxJQUFDLENBQUEsV0FBVyxDQUFDLEtBQWIsR0FBcUIsS0FBckI7O0VBVlk7O3NCQWFiLGlCQUFBLEdBQW1CLFNBQUE7SUFDbEIsSUFBRyxJQUFDLENBQUEsS0FBSjtBQUNDLGFBQU8sS0FEUjtLQUFBLE1BQUE7TUFHQyxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBM0IsQ0FBK0IsK0JBQS9CO0FBQ0EsYUFBTyxNQUpSOztFQURrQjs7c0JBT25CLGlCQUFBLEdBQW1CLFNBQUE7QUFDbEIsUUFBQTtJQUFBLElBQUcsSUFBQyxDQUFBLFFBQVEsQ0FBQyxnQkFBYjtNQUNDLE9BQUEsR0FBVSxJQUFDLENBQUEsSUFBSSxDQUFDLFFBRGpCO0tBQUEsTUFBQTtNQUdDLE9BQUEsR0FBVSxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFkLENBQXFCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxHQUFEO0FBQVcsY0FBQTtVQUFULE9BQUQ7aUJBQVUsS0FBQyxDQUFBLElBQUksQ0FBQyxRQUFOLENBQWUsSUFBZjtRQUFYO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFyQixFQUhYOztXQUtBLElBQUMsQ0FBQSxXQUFXLENBQUMsVUFBYixDQUF3QixPQUF4QjtFQU5rQjs7c0JBUW5CLGFBQUEsR0FBZSxTQUFBO0lBQ2QsSUFBQyxDQUFBLElBQUQsQ0FBTSxRQUFOLEVBQWdCLElBQUMsQ0FBQSxNQUFqQixFQUF5QixJQUFDLENBQUEsS0FBMUI7V0FDQSxJQUFDLENBQUEsTUFBRCxDQUFBO0VBRmM7O3NCQUlmLGVBQUEsR0FBaUIsU0FBQyxLQUFEO1dBQ2hCLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQWYsQ0FBb0IsSUFBcEIsRUFBdUIsS0FBdkI7RUFEZ0I7O3NCQUdqQixnQkFBQSxHQUFrQixTQUFDLEtBQUQsR0FBQTs7c0JBR2xCLE1BQUEsR0FBUSxTQUFBO0lBQ1AsSUFBQyxDQUFBLFdBQUQsQ0FBYSxFQUFiO1dBQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFQLENBQUE7RUFGTzs7c0JBSVIsR0FBQSxHQUFLLEdBQUcsQ0FBQSxTQUFFLENBQUE7O3NCQUNWLEdBQUEsR0FBSyxHQUFHLENBQUEsU0FBRSxDQUFBOztzQkFDVixRQUFBLEdBQVUsR0FBRyxDQUFBLFNBQUUsQ0FBQTs7c0JBQ2YsVUFBQSxHQUFZLEdBQUcsQ0FBQSxTQUFFLENBQUE7O3NCQUNqQixhQUFBLEdBQWUsR0FBRyxDQUFBLFNBQUUsQ0FBQTs7RUFFcEIsTUFBTSxDQUFDLGdCQUFQLENBQXdCLFNBQUMsQ0FBQSxTQUF6QixFQUNDO0lBQUEsR0FBQSxFQUFLO01BQUEsR0FBQSxFQUFLLFNBQUE7ZUFBSyxJQUFDLENBQUEsRUFBRSxDQUFDO01BQVQsQ0FBTDtLQUFMO0lBQ0EsS0FBQSxFQUFPO01BQUEsR0FBQSxFQUFLLFNBQUE7ZUFBSyxJQUFDLENBQUEsR0FBRCxDQUFBO01BQUwsQ0FBTDtLQURQO0dBREQ7Ozs7R0ExRXVCLE9BQUEsQ0FBUSxZQUFSIiwic291cmNlc0NvbnRlbnQiOlsiXyRzbSgnc21hcnQtZXh0ZW5kJywnZXh0ZW5kJyAgICApXG5fJHNtKCcuLi9zZWxlY3RGaWVsZCcsJ1NlbGVjdEZpZWxkJyAgICApXG5fJHNtKCcuLycsJ1RhZycgICAgKVxuXyRzbSgnLi4vcG9wdXAnLCdQb3B1cCcgICAgKVxuXyRzbSgnLi9kZWZhdWx0cycsJyogYXMgZGVmYXVsdHMnICAgIClcbl8kc20oJy4vdGVtcGxhdGUnLCd7Y29udGVudCwgYnV0dG9ufScgICAgKVxuXG5jbGFzcyBCdWZmZXJUYWcgZXh0ZW5kcyByZXF1aXJlKCdldmVudC1saXRlJylcblx0Y29uc3RydWN0b3I6IChAbGlzdCktPlxuXHRcdHtAc2V0dGluZ3N9ID0gQGxpc3Rcblx0XHRAY29udGVudCA9IGNvbnRlbnQuc3Bhd24obnVsbCwgcmVsYXRlZEluc3RhbmNlOkApXG5cdFx0QHN0YXRlID0ge31cblx0XHRAYXBwbHlCdXR0b24gPSBAYnV0dG9uID0gYnV0dG9uLnNwYXduKHtkYXRhOnRleHQ6XCJBZGQgI3tAc2V0dGluZ3MudGFnTGFiZWx9XCJ9LCByZWxhdGVkSW5zdGFuY2U6QClcblx0XHRAYWRkQnV0dG9uID0gQGxpc3QuZWxzLmFkZEJ1dHRvblxuXHRcdEBwb3B1cCA9IG5ldyBQb3B1cChAYWRkQnV0dG9uLCBAc2V0dGluZ3MsIEBzZXR0aW5ncy5ib3VuZGluZ0VsKVxuXHRcdEBzZWxlY3RGaWVsZCA9IG5ldyBTZWxlY3RGaWVsZChAc2V0dGluZ3MpXG5cdFx0XG5cdFx0QGNvbnRlbnRfID0gRE9NLmRpdihudWxsLCBAY29udGVudClcblx0XHRAc2VsZWN0RmllbGQuaW5zZXJ0QmVmb3JlKEBjb250ZW50KVxuXHRcdEBhcHBseUJ1dHRvbi5pbnNlcnRBZnRlcihAY29udGVudClcblx0XHRAcG9wdXAuc2V0Q29udGVudChAY29udGVudF8pXG5cdFx0QF9zZXR1cCgpXG5cblx0X3NldHVwOiAoKS0+XG5cdFx0QGFwcGx5QnV0dG9uLm9uICdjbGljaycsICgpPT5cblx0XHRcdEBfYXBwbHlDaGFuZ2VzKCkgaWYgQF92YWxpZGF0ZUhhc0ZpZWxkKClcblxuXHRcdEBhZGRCdXR0b24ub24gJ2NsaWNrJywgKCk9PlxuXHRcdFx0QHBvcHVwLm9wZW4oKVxuXG5cdFx0QHNlbGVjdEZpZWxkLm9uICdjaGFuZ2UnLCAoe3ZhbHVlfSk9PlxuXHRcdFx0QF9zZXRDdXJyZW50KHZhbHVlKVxuXG5cdF9zZXRDdXJyZW50OiAobmFtZSktPlxuXHRcdEBjb250ZW50LmVtcHR5KClcblx0XHRAb3B0aW9uID0gQGxpc3QuX2ZpbmRPcHRpb24obmFtZSlcblxuXHRcdGlmIEBvcHRpb25cblx0XHRcdEBvcHRpb24gPSBleHRlbmQuY2xvbmUoZGVmYXVsdHMub3B0aW9uLCBAb3B0aW9uKVxuXHRcdFx0QF9pbml0RmllbGQoKVxuXHRcdGVsc2Vcblx0XHRcdEBmaWVsZCA9IG51bGxcblxuXHRcdEBzZWxlY3RGaWVsZC52YWx1ZSA9IG5hbWUgdW5sZXNzIEBzZWxlY3RGaWVsZC52YWx1ZSBpcyBuYW1lXG5cblxuXHRfdmFsaWRhdGVIYXNGaWVsZDogKCktPlxuXHRcdGlmIEBmaWVsZFxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHRlbHNlXG5cdFx0XHRAYnV0dG9uLmNoaWxkLmVycm9yTWVzc2FnZS5zZXQoJ1lvdSBtdXN0IHNlbGVjdCBhIGZpZWxkIGZpcnN0Jylcblx0XHRcdHJldHVybiBmYWxzZVxuXG5cdF91cGRhdGVTZWxlY3RhYmxlOiAoKS0+XG5cdFx0aWYgQHNldHRpbmdzLnJlcGVhdGFibGVWYWx1ZXNcblx0XHRcdG9wdGlvbnMgPSBAbGlzdC5vcHRpb25zXG5cdFx0ZWxzZVxuXHRcdFx0b3B0aW9ucyA9IEBsaXN0Lm9wdGlvbnMuZmlsdGVyICh7bmFtZX0pPT4gQGxpc3QuX2ZpbmRUYWcobmFtZSlcblx0XHRcblx0XHRAc2VsZWN0RmllbGQuc2V0T3B0aW9ucyhvcHRpb25zKVxuXHRcblx0X25vdGlmeUNoYW5nZTogKCktPlxuXHRcdEBlbWl0ICdjaGFuZ2UnLCBAb3B0aW9uLCBAdmFsdWVcblx0XHRAX3Jlc2V0KClcblxuXHRfdXBkYXRlRnJvbVVzZXI6ICh2YWx1ZSktPlxuXHRcdEBvcHRpb24uc2V0dGVyLmNhbGwoQCwgdmFsdWUpXG5cblx0X3VwZGF0ZUZyb21GaWVsZDogKHZhbHVlKS0+XG5cdFx0O1xuXG5cdF9yZXNldDogKCktPlxuXHRcdEBfc2V0Q3VycmVudCgnJylcblx0XHRAcG9wdXAuY2xvc2UoKVxuXHRcblx0Z2V0OiBUYWc6OmdldFxuXHRzZXQ6IFRhZzo6c2V0XG5cdHZhbGlkYXRlOiBUYWc6OnZhbGlkYXRlXG5cdF9pbml0RmllbGQ6IFRhZzo6X2luaXRGaWVsZFxuXHRfYXBwbHlDaGFuZ2VzOiBUYWc6Ol9hcHBseUNoYW5nZXNcblx0XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIEA6Oixcblx0XHRlbHM6IGdldDogKCktPiBAZWwuY2hpbGRcblx0XHR2YWx1ZTogZ2V0OiAoKS0+IEBnZXQoKVxuIl19
;
return module.exports;
},
19: function (require, module, exports) {
var extend, isArray, isObject, shouldDeepExtend;

isArray = function(target) {
  return Array.isArray(target);
};

isObject = function(target) {
  return target && Object.prototype.toString.call(target) === '[object Object]' || isArray(target);
};

shouldDeepExtend = function(options, target, parentKey) {
  if (options.deep) {
    if (options.notDeep) {
      return !options.notDeep[target];
    } else {
      return true;
    }
  } else if (options.deepOnly) {
    return options.deepOnly[target] || parentKey && shouldDeepExtend(options, parentKey);
  }
};

module.exports = extend = function(options, target, sources, parentKey) {
  var i, key, len, source, sourceValue, subTarget, targetValue;
  if (!target || typeof target !== 'object' && typeof target !== 'function') {
    target = {};
  }
  for (i = 0, len = sources.length; i < len; i++) {
    source = sources[i];
    if (source != null) {
      for (key in source) {
        sourceValue = source[key];
        targetValue = target[key];
        if (sourceValue === target || sourceValue === void 0 || (sourceValue === null && !options.allowNull && !options.nullDeletes) || (options.keys && !options.keys[key]) || (options.notKeys && options.notKeys[key]) || (options.own && !source.hasOwnProperty(key)) || (options.globalFilter && !options.globalFilter(sourceValue, key, source)) || (options.filters && options.filters[key] && !options.filters[key](sourceValue, key, source))) {
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
          case !(shouldDeepExtend(options, key, parentKey) && isObject(sourceValue)):
            subTarget = isObject(targetValue) ? targetValue : isArray(sourceValue) ? [] : {};
            target[key] = extend(options, subTarget, [sourceValue], key);
            break;
          default:
            target[key] = sourceValue;
        }
      }
    }
  }
  return target;
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXh0ZW5kLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQUEsR0FBVSxTQUFDLE1BQUQ7U0FDVCxLQUFLLENBQUMsT0FBTixDQUFjLE1BQWQ7QUFEUzs7QUFHVixRQUFBLEdBQVcsU0FBQyxNQUFEO1NBQ1YsTUFBQSxJQUFXLE1BQU0sQ0FBQSxTQUFFLENBQUEsUUFBUSxDQUFDLElBQWpCLENBQXNCLE1BQXRCLENBQUEsS0FBaUMsaUJBQTVDLElBQWlFLE9BQUEsQ0FBUSxNQUFSO0FBRHZEOztBQUdYLGdCQUFBLEdBQW1CLFNBQUMsT0FBRCxFQUFVLE1BQVYsRUFBa0IsU0FBbEI7RUFDbEIsSUFBRyxPQUFPLENBQUMsSUFBWDtJQUNDLElBQUcsT0FBTyxDQUFDLE9BQVg7YUFBd0IsQ0FBSSxPQUFPLENBQUMsT0FBUSxDQUFBLE1BQUEsRUFBNUM7S0FBQSxNQUFBO2FBQXlELEtBQXpEO0tBREQ7R0FBQSxNQUdLLElBQUcsT0FBTyxDQUFDLFFBQVg7V0FDSixPQUFPLENBQUMsUUFBUyxDQUFBLE1BQUEsQ0FBakIsSUFBNEIsU0FBQSxJQUFjLGdCQUFBLENBQWlCLE9BQWpCLEVBQTBCLFNBQTFCLEVBRHRDOztBQUphOztBQVVuQixNQUFNLENBQUMsT0FBUCxHQUFpQixNQUFBLEdBQVMsU0FBQyxPQUFELEVBQVUsTUFBVixFQUFrQixPQUFsQixFQUEyQixTQUEzQjtBQUN6QixNQUFBO0VBQUEsSUFBZSxDQUFJLE1BQUosSUFBYyxPQUFPLE1BQVAsS0FBbUIsUUFBbkIsSUFBZ0MsT0FBTyxNQUFQLEtBQW1CLFVBQWhGO0lBQUEsTUFBQSxHQUFTLEdBQVQ7O0FBRUEsT0FBQSx5Q0FBQTs7UUFBMkI7QUFDMUIsV0FBQSxhQUFBO1FBQ0MsV0FBQSxHQUFjLE1BQU8sQ0FBQSxHQUFBO1FBQ3JCLFdBQUEsR0FBYyxNQUFPLENBQUEsR0FBQTtRQUVyQixJQUFZLFdBQUEsS0FBZSxNQUFmLElBQ1QsV0FBQSxLQUFlLE1BRE4sSUFFVCxDQUFDLFdBQUEsS0FBZSxJQUFmLElBQXdCLENBQUksT0FBTyxDQUFDLFNBQXBDLElBQWtELENBQUksT0FBTyxDQUFDLFdBQS9ELENBRlMsSUFHVCxDQUFDLE9BQU8sQ0FBQyxJQUFSLElBQWlCLENBQUksT0FBTyxDQUFDLElBQUssQ0FBQSxHQUFBLENBQW5DLENBSFMsSUFJVCxDQUFDLE9BQU8sQ0FBQyxPQUFSLElBQW9CLE9BQU8sQ0FBQyxPQUFRLENBQUEsR0FBQSxDQUFyQyxDQUpTLElBS1QsQ0FBQyxPQUFPLENBQUMsR0FBUixJQUFnQixDQUFJLE1BQU0sQ0FBQyxjQUFQLENBQXNCLEdBQXRCLENBQXJCLENBTFMsSUFNVCxDQUFDLE9BQU8sQ0FBQyxZQUFSLElBQXlCLENBQUksT0FBTyxDQUFDLFlBQVIsQ0FBcUIsV0FBckIsRUFBa0MsR0FBbEMsRUFBdUMsTUFBdkMsQ0FBOUIsQ0FOUyxJQU9ULENBQUMsT0FBTyxDQUFDLE9BQVIsSUFBb0IsT0FBTyxDQUFDLE9BQVEsQ0FBQSxHQUFBLENBQXBDLElBQTZDLENBQUksT0FBTyxDQUFDLE9BQVEsQ0FBQSxHQUFBLENBQWhCLENBQXFCLFdBQXJCLEVBQWtDLEdBQWxDLEVBQXVDLE1BQXZDLENBQWxELENBUEg7QUFBQSxtQkFBQTs7UUFTQSxJQUFHLFdBQUEsS0FBZSxJQUFmLElBQXdCLE9BQU8sQ0FBQyxXQUFuQztVQUNDLE9BQU8sTUFBTyxDQUFBLEdBQUE7QUFDZCxtQkFGRDs7UUFHQSxJQUFHLE9BQU8sQ0FBQyxlQUFYO1VBQ0MsV0FBQSxHQUFjLE9BQU8sQ0FBQyxlQUFSLENBQXdCLFdBQXhCLEVBQXFDLEdBQXJDLEVBQTBDLE1BQTFDLEVBRGY7O1FBRUEsSUFBRyxPQUFPLENBQUMsVUFBUixJQUF1QixPQUFPLENBQUMsVUFBVyxDQUFBLEdBQUEsQ0FBN0M7VUFDQyxXQUFBLEdBQWMsT0FBTyxDQUFDLFVBQVcsQ0FBQSxHQUFBLENBQW5CLENBQXdCLFdBQXhCLEVBQXFDLEdBQXJDLEVBQTBDLE1BQTFDLEVBRGY7O0FBR0EsZ0JBQUEsS0FBQTtBQUFBLGlCQUNNLE9BQU8sQ0FBQyxNQUFSLElBQW1CLE9BQUEsQ0FBUSxXQUFSLENBQW5CLElBQTRDLE9BQUEsQ0FBUSxXQUFSLEVBRGxEO1lBRUUsTUFBTyxDQUFBLEdBQUEsQ0FBUCxHQUFjLFdBQVcsQ0FBQyxNQUFaLENBQW1CLFdBQW5COztBQUZoQixpQkFJTSxnQkFBQSxDQUFpQixPQUFqQixFQUEwQixHQUExQixFQUErQixTQUEvQixDQUFBLElBQThDLFFBQUEsQ0FBUyxXQUFULEVBSnBEO1lBS0UsU0FBQSxHQUFlLFFBQUEsQ0FBUyxXQUFULENBQUgsR0FBOEIsV0FBOUIsR0FBa0QsT0FBQSxDQUFRLFdBQVIsQ0FBSCxHQUE2QixFQUE3QixHQUFxQztZQUNoRyxNQUFPLENBQUEsR0FBQSxDQUFQLEdBQWMsTUFBQSxDQUFPLE9BQVAsRUFBZ0IsU0FBaEIsRUFBMkIsQ0FBQyxXQUFELENBQTNCLEVBQTBDLEdBQTFDOztBQU5oQjtZQVNFLE1BQU8sQ0FBQSxHQUFBLENBQVAsR0FBYztBQVRoQjtBQXJCRDs7QUFERDtBQWtDQSxTQUFPO0FBckNrQiIsInNvdXJjZXNDb250ZW50IjpbImlzQXJyYXkgPSAodGFyZ2V0KS0+XG5cdEFycmF5LmlzQXJyYXkodGFyZ2V0KVxuXG5pc09iamVjdCA9ICh0YXJnZXQpLT5cblx0dGFyZ2V0IGFuZCBPYmplY3Q6OnRvU3RyaW5nLmNhbGwodGFyZ2V0KSBpcyAnW29iamVjdCBPYmplY3RdJyBvciBpc0FycmF5KHRhcmdldClcblxuc2hvdWxkRGVlcEV4dGVuZCA9IChvcHRpb25zLCB0YXJnZXQsIHBhcmVudEtleSktPlxuXHRpZiBvcHRpb25zLmRlZXBcblx0XHRpZiBvcHRpb25zLm5vdERlZXAgdGhlbiBub3Qgb3B0aW9ucy5ub3REZWVwW3RhcmdldF0gZWxzZSB0cnVlXG5cblx0ZWxzZSBpZiBvcHRpb25zLmRlZXBPbmx5XG5cdFx0b3B0aW9ucy5kZWVwT25seVt0YXJnZXRdIG9yIHBhcmVudEtleSBhbmQgc2hvdWxkRGVlcEV4dGVuZChvcHRpb25zLCBwYXJlbnRLZXkpXG5cblx0IyBlbHNlIGZhbHNlXG5cblxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQgPSAob3B0aW9ucywgdGFyZ2V0LCBzb3VyY2VzLCBwYXJlbnRLZXkpLT5cblx0dGFyZ2V0ID0ge30gaWYgbm90IHRhcmdldCBvciB0eXBlb2YgdGFyZ2V0IGlzbnQgJ29iamVjdCcgYW5kIHR5cGVvZiB0YXJnZXQgaXNudCAnZnVuY3Rpb24nXG5cblx0Zm9yIHNvdXJjZSBpbiBzb3VyY2VzIHdoZW4gc291cmNlP1xuXHRcdGZvciBrZXkgb2Ygc291cmNlXG5cdFx0XHRzb3VyY2VWYWx1ZSA9IHNvdXJjZVtrZXldXG5cdFx0XHR0YXJnZXRWYWx1ZSA9IHRhcmdldFtrZXldXG5cdFx0XHRcblx0XHRcdGNvbnRpbnVlIGlmIHNvdXJjZVZhbHVlIGlzIHRhcmdldCBvclxuXHRcdFx0XHRcdFx0c291cmNlVmFsdWUgaXMgdW5kZWZpbmVkIG9yXG5cdFx0XHRcdFx0XHQoc291cmNlVmFsdWUgaXMgbnVsbCBhbmQgbm90IG9wdGlvbnMuYWxsb3dOdWxsIGFuZCBub3Qgb3B0aW9ucy5udWxsRGVsZXRlcykgb3Jcblx0XHRcdFx0XHRcdChvcHRpb25zLmtleXMgYW5kIG5vdCBvcHRpb25zLmtleXNba2V5XSkgb3Jcblx0XHRcdFx0XHRcdChvcHRpb25zLm5vdEtleXMgYW5kIG9wdGlvbnMubm90S2V5c1trZXldKSBvclxuXHRcdFx0XHRcdFx0KG9wdGlvbnMub3duIGFuZCBub3Qgc291cmNlLmhhc093blByb3BlcnR5KGtleSkpIG9yXG5cdFx0XHRcdFx0XHQob3B0aW9ucy5nbG9iYWxGaWx0ZXIgYW5kIG5vdCBvcHRpb25zLmdsb2JhbEZpbHRlcihzb3VyY2VWYWx1ZSwga2V5LCBzb3VyY2UpKSBvclxuXHRcdFx0XHRcdFx0KG9wdGlvbnMuZmlsdGVycyBhbmQgb3B0aW9ucy5maWx0ZXJzW2tleV0gYW5kIG5vdCBvcHRpb25zLmZpbHRlcnNba2V5XShzb3VyY2VWYWx1ZSwga2V5LCBzb3VyY2UpKVxuXHRcdFx0XG5cdFx0XHRpZiBzb3VyY2VWYWx1ZSBpcyBudWxsIGFuZCBvcHRpb25zLm51bGxEZWxldGVzXG5cdFx0XHRcdGRlbGV0ZSB0YXJnZXRba2V5XVxuXHRcdFx0XHRjb250aW51ZVxuXHRcdFx0aWYgb3B0aW9ucy5nbG9iYWxUcmFuc2Zvcm1cblx0XHRcdFx0c291cmNlVmFsdWUgPSBvcHRpb25zLmdsb2JhbFRyYW5zZm9ybShzb3VyY2VWYWx1ZSwga2V5LCBzb3VyY2UpXG5cdFx0XHRpZiBvcHRpb25zLnRyYW5zZm9ybXMgYW5kIG9wdGlvbnMudHJhbnNmb3Jtc1trZXldXG5cdFx0XHRcdHNvdXJjZVZhbHVlID0gb3B0aW9ucy50cmFuc2Zvcm1zW2tleV0oc291cmNlVmFsdWUsIGtleSwgc291cmNlKVxuXHRcblx0XHRcdHN3aXRjaFxuXHRcdFx0XHR3aGVuIG9wdGlvbnMuY29uY2F0IGFuZCBpc0FycmF5KHNvdXJjZVZhbHVlKSBhbmQgaXNBcnJheSh0YXJnZXRWYWx1ZSlcblx0XHRcdFx0XHR0YXJnZXRba2V5XSA9IHRhcmdldFZhbHVlLmNvbmNhdChzb3VyY2VWYWx1ZSlcblx0XHRcdFx0XG5cdFx0XHRcdHdoZW4gc2hvdWxkRGVlcEV4dGVuZChvcHRpb25zLCBrZXksIHBhcmVudEtleSkgYW5kIGlzT2JqZWN0KHNvdXJjZVZhbHVlKVxuXHRcdFx0XHRcdHN1YlRhcmdldCA9IGlmIGlzT2JqZWN0KHRhcmdldFZhbHVlKSB0aGVuIHRhcmdldFZhbHVlIGVsc2UgaWYgaXNBcnJheShzb3VyY2VWYWx1ZSkgdGhlbiBbXSBlbHNlIHt9XG5cdFx0XHRcdFx0dGFyZ2V0W2tleV0gPSBleHRlbmQob3B0aW9ucywgc3ViVGFyZ2V0LCBbc291cmNlVmFsdWVdLCBrZXkpXG5cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHRhcmdldFtrZXldID0gc291cmNlVmFsdWVcblxuXG5cdHJldHVybiB0YXJnZXRcblxuXG5cblxuXG5cblxuIl19
;
return module.exports;
},
21: function (require, module, exports) {
var QuickCSS, constants, helpers;

constants = require(34);

helpers = require(35);

QuickCSS = function(targetEl, property, value, important) {
  var computedStyle, i, len, subEl, subProperty, subValue;
  if (helpers.isIterable(targetEl)) {
    for (i = 0, len = targetEl.length; i < len; i++) {
      subEl = targetEl[i];
      QuickCSS(subEl, property, value);
    }
  } else if (typeof property === 'object') {
    for (subProperty in property) {
      subValue = property[subProperty];
      QuickCSS(targetEl, subProperty, subValue);
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

QuickCSS.animation = function(name, frames) {
  var frame, generated, prefix, rules;
  if (name && typeof name === 'string' && frames && typeof frames === 'object') {
    prefix = helpers.getPrefix('animation');
    generated = '';
    for (frame in frames) {
      rules = frames[frame];
      generated += frame + " {" + (helpers.ruleToString(rules)) + "}";
    }
    generated = "@" + prefix + "keyframes " + name + " {" + generated + "}";
    return helpers.inlineStyle(generated, true, 0);
  }
};

QuickCSS.register = function(rule, level, important) {
  var className, ref, style;
  if (rule && typeof rule === 'object') {
    level || (level = 0);
    rule = helpers.ruleToString(rule, important);
    if (!(className = (ref = helpers.inlineStyleConfig[level]) != null ? ref[rule] : void 0)) {
      className = helpers.hash(rule);
      style = "." + className + " {" + rule + "}";
      helpers.inlineStyle(style, className, level);
    }
    return className;
  }
};

QuickCSS.clearRegistered = function(level) {
  return helpers.clearInlineStyle(level || 0);
};


/* istanbul ignore next */

QuickCSS.UNSET = (function() {
  switch (false) {
    case !helpers.isValueSupported('display', 'unset'):
      return 'unset';
    case !helpers.isValueSupported('display', 'initial'):
      return 'initial';
    case !helpers.isValueSupported('display', 'inherit'):
      return 'inherit';
  }
})();

QuickCSS.supports = helpers.isValueSupported;

QuickCSS.supportsProperty = helpers.isPropSupported;

QuickCSS.normalizeProperty = helpers.normalizeProperty;

QuickCSS.normalizeValue = helpers.normalizeValue;

QuickCSS.version = "1.3.4";

module.exports = QuickCSS;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxTQUFBLEdBQVksSUFBQSxDQUFLLGFBQUw7O0FBQ1osT0FBQSxHQUFVLElBQUEsQ0FBSyxXQUFMOztBQUVWLFFBQUEsR0FBVyxTQUFDLFFBQUQsRUFBVyxRQUFYLEVBQXFCLEtBQXJCLEVBQTRCLFNBQTVCO0FBQ1YsTUFBQTtFQUFBLElBQUcsT0FBTyxDQUFDLFVBQVIsQ0FBbUIsUUFBbkIsQ0FBSDtBQUNDLFNBQUEsMENBQUE7O01BQUEsUUFBQSxDQUFTLEtBQVQsRUFBZ0IsUUFBaEIsRUFBMEIsS0FBMUI7QUFBQSxLQUREO0dBQUEsTUFHSyxJQUFHLE9BQU8sUUFBUCxLQUFtQixRQUF0QjtBQUNKLFNBQUEsdUJBQUE7O01BQUEsUUFBQSxDQUFTLFFBQVQsRUFBbUIsV0FBbkIsRUFBZ0MsUUFBaEM7QUFBQSxLQURJO0dBQUEsTUFBQTtJQUlKLFFBQUEsR0FBVyxPQUFPLENBQUMsaUJBQVIsQ0FBMEIsUUFBMUI7SUFDWCxJQUFHLE9BQU8sS0FBUCxLQUFnQixXQUFuQjtNQUNDLGFBQUEsR0FBZ0IsUUFBUSxDQUFDLG1CQUFULFFBQVEsQ0FBQyxpQkFBbUIsZ0JBQUEsQ0FBaUIsUUFBakI7QUFDNUMsYUFBTyxhQUFjLENBQUEsUUFBQSxFQUZ0QjtLQUFBLE1BSUssSUFBRyxRQUFIO01BQ0osUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFmLENBQTJCLFFBQTNCLEVBQXFDLE9BQU8sQ0FBQyxjQUFSLENBQXVCLFFBQXZCLEVBQWlDLEtBQWpDLENBQXJDLEVBQXFHLFNBQXZCLEdBQUEsU0FBUyxDQUFDLFNBQVYsR0FBQSxNQUE5RSxFQURJO0tBVEQ7O0FBSks7O0FBbUJYLFFBQVEsQ0FBQyxTQUFULEdBQXFCLFNBQUMsSUFBRCxFQUFPLE1BQVA7QUFBaUIsTUFBQTtFQUFBLElBQUcsSUFBQSxJQUFTLE9BQU8sSUFBUCxLQUFlLFFBQXhCLElBQXFDLE1BQXJDLElBQWdELE9BQU8sTUFBUCxLQUFpQixRQUFwRTtJQUNyQyxNQUFBLEdBQVMsT0FBTyxDQUFDLFNBQVIsQ0FBa0IsV0FBbEI7SUFDVCxTQUFBLEdBQVk7QUFFWixTQUFBLGVBQUE7O01BQ0MsU0FBQSxJQUFnQixLQUFELEdBQU8sSUFBUCxHQUFVLENBQUMsT0FBTyxDQUFDLFlBQVIsQ0FBcUIsS0FBckIsQ0FBRCxDQUFWLEdBQXVDO0FBRHZEO0lBR0EsU0FBQSxHQUFZLEdBQUEsR0FBSSxNQUFKLEdBQVcsWUFBWCxHQUF1QixJQUF2QixHQUE0QixJQUE1QixHQUFnQyxTQUFoQyxHQUEwQztXQUN0RCxPQUFPLENBQUMsV0FBUixDQUFvQixTQUFwQixFQUErQixJQUEvQixFQUFxQyxDQUFyQyxFQVJxQzs7QUFBakI7O0FBV3JCLFFBQVEsQ0FBQyxRQUFULEdBQW9CLFNBQUMsSUFBRCxFQUFPLEtBQVAsRUFBYyxTQUFkO0FBQTJCLE1BQUE7RUFBQSxJQUFHLElBQUEsSUFBUyxPQUFPLElBQVAsS0FBZSxRQUEzQjtJQUM5QyxVQUFBLFFBQVU7SUFDVixJQUFBLEdBQU8sT0FBTyxDQUFDLFlBQVIsQ0FBcUIsSUFBckIsRUFBMkIsU0FBM0I7SUFFUCxJQUFBLENBQU8sQ0FBQSxTQUFBLHlEQUE4QyxDQUFBLElBQUEsVUFBOUMsQ0FBUDtNQUNDLFNBQUEsR0FBWSxPQUFPLENBQUMsSUFBUixDQUFhLElBQWI7TUFDWixLQUFBLEdBQVEsR0FBQSxHQUFJLFNBQUosR0FBYyxJQUFkLEdBQWtCLElBQWxCLEdBQXVCO01BQy9CLE9BQU8sQ0FBQyxXQUFSLENBQW9CLEtBQXBCLEVBQTJCLFNBQTNCLEVBQXNDLEtBQXRDLEVBSEQ7O0FBS0EsV0FBTyxVQVR1Qzs7QUFBM0I7O0FBWXBCLFFBQVEsQ0FBQyxlQUFULEdBQTJCLFNBQUMsS0FBRDtTQUMxQixPQUFPLENBQUMsZ0JBQVIsQ0FBeUIsS0FBQSxJQUFTLENBQWxDO0FBRDBCOzs7QUFJM0I7O0FBQ0EsUUFBUSxDQUFDLEtBQVQ7QUFBaUIsVUFBQSxLQUFBO0FBQUEsVUFDWCxPQUFPLENBQUMsZ0JBQVIsQ0FBeUIsU0FBekIsRUFBbUMsT0FBbkMsQ0FEVzthQUNzQztBQUR0QyxVQUVYLE9BQU8sQ0FBQyxnQkFBUixDQUF5QixTQUF6QixFQUFtQyxTQUFuQyxDQUZXO2FBRXdDO0FBRnhDLFVBR1gsT0FBTyxDQUFDLGdCQUFSLENBQXlCLFNBQXpCLEVBQW1DLFNBQW5DLENBSFc7YUFHd0M7QUFIeEM7OztBQUtqQixRQUFRLENBQUMsUUFBVCxHQUFvQixPQUFPLENBQUM7O0FBQzVCLFFBQVEsQ0FBQyxnQkFBVCxHQUE0QixPQUFPLENBQUM7O0FBQ3BDLFFBQVEsQ0FBQyxpQkFBVCxHQUE2QixPQUFPLENBQUM7O0FBQ3JDLFFBQVEsQ0FBQyxjQUFULEdBQTBCLE9BQU8sQ0FBQzs7QUFDbEMsUUFBUSxDQUFDLE9BQVQsR0FBbUIsSUFBQSxDQUFLLDJCQUFMOztBQUNuQixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0YW50cyA9IF8kc20oJy4vY29uc3RhbnRzJyApXG5oZWxwZXJzID0gXyRzbSgnLi9oZWxwZXJzJyApXG5cblF1aWNrQ1NTID0gKHRhcmdldEVsLCBwcm9wZXJ0eSwgdmFsdWUsIGltcG9ydGFudCktPlxuXHRpZiBoZWxwZXJzLmlzSXRlcmFibGUodGFyZ2V0RWwpXG5cdFx0UXVpY2tDU1Moc3ViRWwsIHByb3BlcnR5LCB2YWx1ZSkgZm9yIHN1YkVsIGluIHRhcmdldEVsXG5cdFxuXHRlbHNlIGlmIHR5cGVvZiBwcm9wZXJ0eSBpcyAnb2JqZWN0JyAjIFBhc3NlZCBhIHN0eWxlIG1hcFxuXHRcdFF1aWNrQ1NTKHRhcmdldEVsLCBzdWJQcm9wZXJ0eSwgc3ViVmFsdWUpIGZvciBzdWJQcm9wZXJ0eSxzdWJWYWx1ZSBvZiBwcm9wZXJ0eVxuXHRcblx0ZWxzZVxuXHRcdHByb3BlcnR5ID0gaGVscGVycy5ub3JtYWxpemVQcm9wZXJ0eShwcm9wZXJ0eSlcblx0XHRpZiB0eXBlb2YgdmFsdWUgaXMgJ3VuZGVmaW5lZCdcblx0XHRcdGNvbXB1dGVkU3R5bGUgPSB0YXJnZXRFbC5fY29tcHV0ZWRTdHlsZSB8fD0gZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXRFbClcblx0XHRcdHJldHVybiBjb21wdXRlZFN0eWxlW3Byb3BlcnR5XVxuXHRcdFxuXHRcdGVsc2UgaWYgcHJvcGVydHlcblx0XHRcdHRhcmdldEVsLnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5LCBoZWxwZXJzLm5vcm1hbGl6ZVZhbHVlKHByb3BlcnR5LCB2YWx1ZSksIGNvbnN0YW50cy5JTVBPUlRBTlQgaWYgaW1wb3J0YW50KVxuXG5cdHJldHVyblxuXG5cblF1aWNrQ1NTLmFuaW1hdGlvbiA9IChuYW1lLCBmcmFtZXMpLT4gaWYgbmFtZSBhbmQgdHlwZW9mIG5hbWUgaXMgJ3N0cmluZycgYW5kIGZyYW1lcyBhbmQgdHlwZW9mIGZyYW1lcyBpcyAnb2JqZWN0J1xuXHRwcmVmaXggPSBoZWxwZXJzLmdldFByZWZpeCgnYW5pbWF0aW9uJylcblx0Z2VuZXJhdGVkID0gJydcblx0XG5cdGZvciBmcmFtZSxydWxlcyBvZiBmcmFtZXNcblx0XHRnZW5lcmF0ZWQgKz0gXCIje2ZyYW1lfSB7I3toZWxwZXJzLnJ1bGVUb1N0cmluZyhydWxlcyl9fVwiXG5cblx0Z2VuZXJhdGVkID0gXCJAI3twcmVmaXh9a2V5ZnJhbWVzICN7bmFtZX0geyN7Z2VuZXJhdGVkfX1cIlxuXHRoZWxwZXJzLmlubGluZVN0eWxlKGdlbmVyYXRlZCwgdHJ1ZSwgMClcblxuXG5RdWlja0NTUy5yZWdpc3RlciA9IChydWxlLCBsZXZlbCwgaW1wb3J0YW50KS0+IGlmIHJ1bGUgYW5kIHR5cGVvZiBydWxlIGlzICdvYmplY3QnXG5cdGxldmVsIHx8PSAwXG5cdHJ1bGUgPSBoZWxwZXJzLnJ1bGVUb1N0cmluZyhydWxlLCBpbXBvcnRhbnQpXG5cdFxuXHR1bmxlc3MgY2xhc3NOYW1lID0gaGVscGVycy5pbmxpbmVTdHlsZUNvbmZpZ1tsZXZlbF0/W3J1bGVdXG5cdFx0Y2xhc3NOYW1lID0gaGVscGVycy5oYXNoKHJ1bGUpXG5cdFx0c3R5bGUgPSBcIi4je2NsYXNzTmFtZX0geyN7cnVsZX19XCJcblx0XHRoZWxwZXJzLmlubGluZVN0eWxlKHN0eWxlLCBjbGFzc05hbWUsIGxldmVsKVxuXG5cdHJldHVybiBjbGFzc05hbWVcblxuXG5RdWlja0NTUy5jbGVhclJlZ2lzdGVyZWQgPSAobGV2ZWwpLT5cblx0aGVscGVycy5jbGVhcklubGluZVN0eWxlKGxldmVsIG9yIDApXG5cblxuIyMjIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICMjI1xuUXVpY2tDU1MuVU5TRVQgPSBzd2l0Y2hcblx0d2hlbiBoZWxwZXJzLmlzVmFsdWVTdXBwb3J0ZWQoJ2Rpc3BsYXknLCd1bnNldCcpIHRoZW4gJ3Vuc2V0J1xuXHR3aGVuIGhlbHBlcnMuaXNWYWx1ZVN1cHBvcnRlZCgnZGlzcGxheScsJ2luaXRpYWwnKSB0aGVuICdpbml0aWFsJ1xuXHR3aGVuIGhlbHBlcnMuaXNWYWx1ZVN1cHBvcnRlZCgnZGlzcGxheScsJ2luaGVyaXQnKSB0aGVuICdpbmhlcml0J1xuXG5RdWlja0NTUy5zdXBwb3J0cyA9IGhlbHBlcnMuaXNWYWx1ZVN1cHBvcnRlZFxuUXVpY2tDU1Muc3VwcG9ydHNQcm9wZXJ0eSA9IGhlbHBlcnMuaXNQcm9wU3VwcG9ydGVkXG5RdWlja0NTUy5ub3JtYWxpemVQcm9wZXJ0eSA9IGhlbHBlcnMubm9ybWFsaXplUHJvcGVydHlcblF1aWNrQ1NTLm5vcm1hbGl6ZVZhbHVlID0gaGVscGVycy5ub3JtYWxpemVWYWx1ZVxuUXVpY2tDU1MudmVyc2lvbiA9IF8kc20oJy4uL3BhY2thZ2UuanNvbiAkIHZlcnNpb24nIClcbm1vZHVsZS5leHBvcnRzID0gUXVpY2tDU1MiXX0=
;
return module.exports;
},
32: function (require, module, exports) {
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

		message = message instanceof Error
			? message.message
			: (message || this.message);

		Error.call(this, message);
		Error.captureStackTrace(this, errorExError);

		this.name = name;

		Object.defineProperty(this, 'message', {
			configurable: true,
			enumerable: false,
			get: function () {
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
			set: function (v) {
				message = v;
			}
		});

		var stackDescriptor = Object.getOwnPropertyDescriptor(this, 'stack');
		var stackGetter = stackDescriptor.get;
		var stackValue = stackDescriptor.value;
		delete stackDescriptor.value;
		delete stackDescriptor.writable;

		stackDescriptor.get = function () {
			var stack = (stackGetter)
				? stackGetter.call(this).split(/\r?\n+/g)
				: stackValue.split(/\r?\n+/g);

			// starting in Node 7, the stack builder caches the message.
			// just replace it.
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
		message: function (v, message) {
			v = v || def;

			if (v) {
				message[0] += ' ' + str.replace('%s', v.toString());
			}

			return message;
		}
	};
};

errorEx.line = function (str, def) {
	return {
		line: function (v) {
			v = v || def;

			if (v) {
				return str.replace('%s', v.toString());
			}

			return null;
		}
	};
};

module.exports = errorEx;
;
return module.exports;
},
33: function (require, module, exports) {
var SelectField,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

var __67 = require(6), DOM = __67.default;;

var template = require(52);

SelectField = (function(superClass) {
  extend(SelectField, superClass);

  function SelectField(settings) {
    this.settings = settings;
    SelectField.__super__.constructor.call(this);
    this.field = template.field.spawn(null, {
      relatedInstance: this
    });
    this.input = this.field.child.input;
    this._attachBindings();
    this._setUiLabel(this.label);
  }

  SelectField.prototype._attachBindings = function() {
    this.field.on('input', (function(_this) {
      return function() {
        return _this.emit('change', {
          label: _this.label,
          value: _this.value
        });
      };
    })(this));
    return this.on('change', function(arg) {
      var label;
      label = arg.label;
      return this._setUiLabel(label);
    });
  };

  SelectField.prototype._setUiLabel = function(label) {
    return this.field.child.fake.html = label;
  };

  SelectField.prototype._setValue = function(value) {
    this.input.value = value;
    return this._setUiLabel(this.label);
  };

  SelectField.prototype.setOptions = function(options) {
    var i, label, len, name, prevOptions, ref;
    prevOptions = this.input.children.slice(1);
    if (prevOptions.length) {
      DOM.batch(prevOptions).remove();
    }
    for (i = 0, len = options.length; i < len; i++) {
      ref = options[i], name = ref.name, label = ref.label;
      this.input.append(DOM.option({
        props: {
          value: name
        }
      }, label));
    }
  };

  SelectField.prototype.insertBefore = function(target) {
    return this.field.insertBefore(target);
  };

  Object.defineProperties(SelectField.prototype, {
    label: {
      get: function() {
        return this.input.label;
      }
    },
    value: {
      get: function() {
        return this.input.value;
      },
      set: function(value) {
        return this._setValue(value);
      }
    }
  });

  return SelectField;

})(require(10));

exports.default = SelectField;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2luZGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiX2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUE7RUFBQTs7O0FBQUEsSUFBQSxDQUFLLFVBQUwsRUFBZ0IsS0FBaEI7O0FBQ0EsSUFBQSxDQUFLLFlBQUwsRUFBa0IsZUFBbEI7O0FBRU07OztFQUNRLHFCQUFDLFFBQUQ7SUFBQyxJQUFDLENBQUEsV0FBRDtJQUNiLDJDQUFBO0lBQ0EsSUFBQyxDQUFBLEtBQUQsR0FBUyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQWYsQ0FBcUIsSUFBckIsRUFBMkI7TUFBQyxlQUFBLEVBQWdCLElBQWpCO0tBQTNCO0lBQ1QsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFDLENBQUEsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUN0QixJQUFDLENBQUEsZUFBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLFdBQUQsQ0FBYSxJQUFDLENBQUEsS0FBZDtFQUxZOzt3QkFPYixlQUFBLEdBQWlCLFNBQUE7SUFDaEIsSUFBQyxDQUFBLEtBQUssQ0FBQyxFQUFQLENBQVUsT0FBVixFQUFtQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7ZUFDbEIsS0FBQyxDQUFBLElBQUQsQ0FBTSxRQUFOLEVBQWdCO1VBQUUsT0FBRCxLQUFDLENBQUEsS0FBRjtVQUFVLE9BQUQsS0FBQyxDQUFBLEtBQVY7U0FBaEI7TUFEa0I7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQW5CO1dBR0EsSUFBQyxDQUFBLEVBQUQsQ0FBSSxRQUFKLEVBQWMsU0FBQyxHQUFEO0FBQ2IsVUFBQTtNQURlLFFBQUQ7YUFDZCxJQUFDLENBQUEsV0FBRCxDQUFhLEtBQWI7SUFEYSxDQUFkO0VBSmdCOzt3QkFPakIsV0FBQSxHQUFhLFNBQUMsS0FBRDtXQUNaLElBQUMsQ0FBQSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFsQixHQUF5QjtFQURiOzt3QkFHYixTQUFBLEdBQVcsU0FBQyxLQUFEO0lBQ1YsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFQLEdBQWU7V0FDZixJQUFDLENBQUEsV0FBRCxDQUFhLElBQUMsQ0FBQSxLQUFkO0VBRlU7O3dCQUlYLFVBQUEsR0FBWSxTQUFDLE9BQUQ7QUFDWCxRQUFBO0lBQUEsV0FBQSxHQUFjLElBQUMsQ0FBQSxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQWhCLENBQXNCLENBQXRCO0lBQ2QsSUFBbUMsV0FBVyxDQUFDLE1BQS9DO01BQUEsR0FBRyxDQUFDLEtBQUosQ0FBVSxXQUFWLENBQXNCLENBQUMsTUFBdkIsQ0FBQSxFQUFBOztBQUVBLFNBQUEseUNBQUE7d0JBQUssaUJBQUs7TUFDVCxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQVAsQ0FBYyxHQUFHLENBQUMsTUFBSixDQUFXO1FBQUMsS0FBQSxFQUFNO1VBQUEsS0FBQSxFQUFNLElBQU47U0FBUDtPQUFYLEVBQStCLEtBQS9CLENBQWQ7QUFERDtFQUpXOzt3QkFTWixZQUFBLEdBQWMsU0FBQyxNQUFEO1dBQ2IsSUFBQyxDQUFBLEtBQUssQ0FBQyxZQUFQLENBQW9CLE1BQXBCO0VBRGE7O0VBSWQsTUFBTSxDQUFDLGdCQUFQLENBQXdCLFdBQUMsQ0FBQSxTQUF6QixFQUNDO0lBQUEsS0FBQSxFQUNDO01BQUEsR0FBQSxFQUFLLFNBQUE7ZUFBSyxJQUFDLENBQUEsS0FBSyxDQUFDO01BQVosQ0FBTDtLQUREO0lBRUEsS0FBQSxFQUNDO01BQUEsR0FBQSxFQUFLLFNBQUE7ZUFBSyxJQUFDLENBQUEsS0FBSyxDQUFDO01BQVosQ0FBTDtNQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7ZUFBVSxJQUFDLENBQUEsU0FBRCxDQUFXLEtBQVg7TUFBVixDQURMO0tBSEQ7R0FERDs7OztHQW5DeUIsT0FBQSxDQUFRLFlBQVI7O0FBMkMxQixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJfJHNtKCdxdWlja2RvbScsJ0RPTScgICAgKVxuXyRzbSgnLi90ZW1wbGF0ZScsJyogYXMgdGVtcGxhdGUnICAgIClcblxuY2xhc3MgU2VsZWN0RmllbGQgZXh0ZW5kcyByZXF1aXJlKCdldmVudC1saXRlJylcblx0Y29uc3RydWN0b3I6IChAc2V0dGluZ3MpLT5cblx0XHRzdXBlcigpXG5cdFx0QGZpZWxkID0gdGVtcGxhdGUuZmllbGQuc3Bhd24obnVsbCwge3JlbGF0ZWRJbnN0YW5jZTpAfSlcblx0XHRAaW5wdXQgPSBAZmllbGQuY2hpbGQuaW5wdXRcblx0XHRAX2F0dGFjaEJpbmRpbmdzKClcblx0XHRAX3NldFVpTGFiZWwoQGxhYmVsKVxuXG5cdF9hdHRhY2hCaW5kaW5nczogKCktPlxuXHRcdEBmaWVsZC5vbiAnaW5wdXQnLCAoKT0+XG5cdFx0XHRAZW1pdCAnY2hhbmdlJywge0BsYWJlbCwgQHZhbHVlfVxuXG5cdFx0QG9uICdjaGFuZ2UnLCAoe2xhYmVsfSktPlxuXHRcdFx0QF9zZXRVaUxhYmVsKGxhYmVsKVxuXG5cdF9zZXRVaUxhYmVsOiAobGFiZWwpLT5cblx0XHRAZmllbGQuY2hpbGQuZmFrZS5odG1sID0gbGFiZWxcblxuXHRfc2V0VmFsdWU6ICh2YWx1ZSktPlxuXHRcdEBpbnB1dC52YWx1ZSA9IHZhbHVlXG5cdFx0QF9zZXRVaUxhYmVsKEBsYWJlbClcblxuXHRzZXRPcHRpb25zOiAob3B0aW9ucyktPlxuXHRcdHByZXZPcHRpb25zID0gQGlucHV0LmNoaWxkcmVuLnNsaWNlKDEpXG5cdFx0RE9NLmJhdGNoKHByZXZPcHRpb25zKS5yZW1vdmUoKSBpZiBwcmV2T3B0aW9ucy5sZW5ndGhcblxuXHRcdGZvciB7bmFtZSxsYWJlbH0gaW4gb3B0aW9uc1xuXHRcdFx0QGlucHV0LmFwcGVuZCBET00ub3B0aW9uKHtwcm9wczp2YWx1ZTpuYW1lfSwgbGFiZWwpXG5cdFx0cmV0dXJuXG5cblxuXHRpbnNlcnRCZWZvcmU6ICh0YXJnZXQpLT5cblx0XHRAZmllbGQuaW5zZXJ0QmVmb3JlKHRhcmdldClcblxuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIEA6Oixcblx0XHRsYWJlbDpcblx0XHRcdGdldDogKCktPiBAaW5wdXQubGFiZWxcblx0XHR2YWx1ZTpcblx0XHRcdGdldDogKCktPiBAaW5wdXQudmFsdWVcblx0XHRcdHNldDogKHZhbHVlKS0+IEBfc2V0VmFsdWUodmFsdWUpXG5cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0RmllbGQiXX0=
;
return module.exports;
},
34: function (require, module, exports) {
exports.REGEX_LEN_VAL = /^\d+(?:[a-z]|\%)+$/i;

exports.REGEX_DIGITS = /\d+$/;

exports.REGEX_SPACE = /\s/;

exports.REGEX_KEBAB = /([A-Z])+/g;

exports.IMPORTANT = 'important';

exports.POSSIBLE_PREFIXES = ['webkit', 'moz', 'ms', 'o'];

exports.REQUIRES_UNIT_VALUE = ['background-position-x', 'background-position-y', 'block-size', 'border-width', 'columnRule-width', 'cx', 'cy', 'font-size', 'grid-column-gap', 'grid-row-gap', 'height', 'inline-size', 'line-height', 'minBlock-size', 'min-height', 'min-inline-size', 'min-width', 'max-height', 'max-width', 'outline-offset', 'outline-width', 'perspective', 'shape-margin', 'stroke-dashoffset', 'stroke-width', 'text-indent', 'width', 'word-spacing', 'top', 'bottom', 'left', 'right', 'x', 'y'];

exports.QUAD_SHORTHANDS = ['margin', 'padding', 'border', 'border-radius'];

exports.DIRECTIONS = ['top', 'bottom', 'left', 'right'];

exports.QUAD_SHORTHANDS.forEach(function(property) {
  var direction, i, len, ref;
  exports.REQUIRES_UNIT_VALUE.push(property);
  ref = exports.DIRECTIONS;
  for (i = 0, len = ref.length; i < len; i++) {
    direction = ref[i];
    exports.REQUIRES_UNIT_VALUE.push(property + '-' + direction);
  }
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uc3RhbnRzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLENBQUMsYUFBUixHQUF3Qjs7QUFDeEIsT0FBTyxDQUFDLFlBQVIsR0FBdUI7O0FBQ3ZCLE9BQU8sQ0FBQyxXQUFSLEdBQXNCOztBQUN0QixPQUFPLENBQUMsV0FBUixHQUFzQjs7QUFDdEIsT0FBTyxDQUFDLFNBQVIsR0FBb0I7O0FBRXBCLE9BQU8sQ0FBQyxpQkFBUixHQUE0QixDQUMzQixRQUQyQixFQUUzQixLQUYyQixFQUczQixJQUgyQixFQUkzQixHQUoyQjs7QUFNNUIsT0FBTyxDQUFDLG1CQUFSLEdBQThCLENBQzdCLHVCQUQ2QixFQUU3Qix1QkFGNkIsRUFHN0IsWUFINkIsRUFJN0IsY0FKNkIsRUFLN0Isa0JBTDZCLEVBTTdCLElBTjZCLEVBTzdCLElBUDZCLEVBUTdCLFdBUjZCLEVBUzdCLGlCQVQ2QixFQVU3QixjQVY2QixFQVc3QixRQVg2QixFQVk3QixhQVo2QixFQWE3QixhQWI2QixFQWM3QixlQWQ2QixFQWU3QixZQWY2QixFQWdCN0IsaUJBaEI2QixFQWlCN0IsV0FqQjZCLEVBa0I3QixZQWxCNkIsRUFtQjdCLFdBbkI2QixFQW9CN0IsZ0JBcEI2QixFQXFCN0IsZUFyQjZCLEVBc0I3QixhQXRCNkIsRUF1QjdCLGNBdkI2QixFQXdCN0IsbUJBeEI2QixFQXlCN0IsY0F6QjZCLEVBMEI3QixhQTFCNkIsRUEyQjdCLE9BM0I2QixFQTRCN0IsY0E1QjZCLEVBNkI3QixLQTdCNkIsRUE4QjdCLFFBOUI2QixFQStCN0IsTUEvQjZCLEVBZ0M3QixPQWhDNkIsRUFpQzdCLEdBakM2QixFQWtDN0IsR0FsQzZCOztBQXFDOUIsT0FBTyxDQUFDLGVBQVIsR0FBMEIsQ0FDekIsUUFEeUIsRUFFekIsU0FGeUIsRUFHekIsUUFIeUIsRUFJekIsZUFKeUI7O0FBTTFCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLENBQUMsS0FBRCxFQUFPLFFBQVAsRUFBZ0IsTUFBaEIsRUFBdUIsT0FBdkI7O0FBRXJCLE9BQU8sQ0FBQyxlQUFlLENBQUMsT0FBeEIsQ0FBZ0MsU0FBQyxRQUFEO0FBQy9CLE1BQUE7RUFBQSxPQUFPLENBQUMsbUJBQW1CLENBQUMsSUFBNUIsQ0FBaUMsUUFBakM7QUFDQTtBQUFBLE9BQUEscUNBQUE7O0lBQ0MsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQTVCLENBQWlDLFFBQUEsR0FBUyxHQUFULEdBQWEsU0FBOUM7QUFERDtBQUYrQixDQUFoQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMuUkVHRVhfTEVOX1ZBTCA9IC9eXFxkKyg/OlthLXpdfFxcJSkrJC9pXG5leHBvcnRzLlJFR0VYX0RJR0lUUyA9IC9cXGQrJC9cbmV4cG9ydHMuUkVHRVhfU1BBQ0UgPSAvXFxzL1xuZXhwb3J0cy5SRUdFWF9LRUJBQiA9IC8oW0EtWl0pKy9nXG5leHBvcnRzLklNUE9SVEFOVCA9ICdpbXBvcnRhbnQnXG5cbmV4cG9ydHMuUE9TU0lCTEVfUFJFRklYRVMgPSBbXG5cdCd3ZWJraXQnXG5cdCdtb3onXG5cdCdtcydcblx0J28nXG5dXG5leHBvcnRzLlJFUVVJUkVTX1VOSVRfVkFMVUUgPSBbXG5cdCdiYWNrZ3JvdW5kLXBvc2l0aW9uLXgnXG5cdCdiYWNrZ3JvdW5kLXBvc2l0aW9uLXknXG5cdCdibG9jay1zaXplJ1xuXHQnYm9yZGVyLXdpZHRoJ1xuXHQnY29sdW1uUnVsZS13aWR0aCdcblx0J2N4J1xuXHQnY3knXG5cdCdmb250LXNpemUnXG5cdCdncmlkLWNvbHVtbi1nYXAnXG5cdCdncmlkLXJvdy1nYXAnXG5cdCdoZWlnaHQnXG5cdCdpbmxpbmUtc2l6ZSdcblx0J2xpbmUtaGVpZ2h0J1xuXHQnbWluQmxvY2stc2l6ZSdcblx0J21pbi1oZWlnaHQnXG5cdCdtaW4taW5saW5lLXNpemUnXG5cdCdtaW4td2lkdGgnXG5cdCdtYXgtaGVpZ2h0J1xuXHQnbWF4LXdpZHRoJ1xuXHQnb3V0bGluZS1vZmZzZXQnXG5cdCdvdXRsaW5lLXdpZHRoJ1xuXHQncGVyc3BlY3RpdmUnXG5cdCdzaGFwZS1tYXJnaW4nXG5cdCdzdHJva2UtZGFzaG9mZnNldCdcblx0J3N0cm9rZS13aWR0aCdcblx0J3RleHQtaW5kZW50J1xuXHQnd2lkdGgnXG5cdCd3b3JkLXNwYWNpbmcnXG5cdCd0b3AnXG5cdCdib3R0b20nXG5cdCdsZWZ0J1xuXHQncmlnaHQnXG5cdCd4J1xuXHQneSdcbl1cblxuZXhwb3J0cy5RVUFEX1NIT1JUSEFORFMgPSBbXG5cdCdtYXJnaW4nXG5cdCdwYWRkaW5nJ1xuXHQnYm9yZGVyJ1xuXHQnYm9yZGVyLXJhZGl1cydcbl1cbmV4cG9ydHMuRElSRUNUSU9OUyA9IFsndG9wJywnYm90dG9tJywnbGVmdCcsJ3JpZ2h0J11cblxuZXhwb3J0cy5RVUFEX1NIT1JUSEFORFMuZm9yRWFjaCAocHJvcGVydHkpLT5cblx0ZXhwb3J0cy5SRVFVSVJFU19VTklUX1ZBTFVFLnB1c2ggcHJvcGVydHlcblx0Zm9yIGRpcmVjdGlvbiBpbiBleHBvcnRzLkRJUkVDVElPTlNcblx0XHRleHBvcnRzLlJFUVVJUkVTX1VOSVRfVkFMVUUucHVzaCBwcm9wZXJ0eSsnLScrZGlyZWN0aW9uXG5cdHJldHVyblxuXG5cblxuXG5cbiJdfQ==
;
return module.exports;
},
35: function (require, module, exports) {
var constants, helpers, sampleStyle, styleConfig;

constants = require(34);

sampleStyle = document.createElement('div').style;

helpers = exports;

helpers.includes = function(target, item) {
  return target && target.indexOf(item) !== -1;
};

helpers.isIterable = function(target) {
  return target && typeof target === 'object' && typeof target.length === 'number' && !target.nodeType;
};

helpers.toKebabCase = function(string) {
  return string.replace(constants.REGEX_KEBAB, function(e, letter) {
    return "-" + (letter.toLowerCase());
  });
};

helpers.isPropSupported = function(property) {
  return typeof sampleStyle[property] !== 'undefined';
};

helpers.isValueSupported = function(property, value) {
  if (window.CSS && window.CSS.supports) {
    return window.CSS.supports(property, value);
  } else {
    sampleStyle[property] = value;
    return sampleStyle[property] === '' + value;
  }
};

helpers.getPrefix = function(property, skipInitialCheck) {
  var j, len1, prefix, ref;
  if (skipInitialCheck || !helpers.isPropSupported(property)) {
    ref = constants.POSSIBLE_PREFIXES;
    for (j = 0, len1 = ref.length; j < len1; j++) {
      prefix = ref[j];

      /* istanbul ignore next */
      if (helpers.isPropSupported("-" + prefix + "-" + property)) {
        return "-" + prefix + "-";
      }
    }
  }
  return '';
};

helpers.normalizeProperty = function(property) {
  property = helpers.toKebabCase(property);
  if (helpers.isPropSupported(property)) {
    return property;
  } else {
    return "" + (helpers.getPrefix(property, true)) + property;
  }
};

helpers.normalizeValue = function(property, value) {
  if (helpers.includes(constants.REQUIRES_UNIT_VALUE, property) && value !== null) {
    value = '' + value;
    if (constants.REGEX_DIGITS.test(value) && !constants.REGEX_LEN_VAL.test(value) && !constants.REGEX_SPACE.test(value)) {
      value += property === 'line-height' ? 'em' : 'px';
    }
  }
  return value;
};

helpers.sort = function(array) {
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

helpers.hash = function(string) {
  var hash, i, length;
  hash = 5381;
  i = -1;
  length = string.length;
  while (++i !== string.length) {
    hash = ((hash << 5) - hash) + string.charCodeAt(i);
    hash |= 0;
  }
  return '_' + (hash < 0 ? hash * -2 : hash);
};

helpers.ruleToString = function(rule, important) {
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
      output += property + ":" + value + ";";
    }
  }
  return output;
};

helpers.inlineStyleConfig = styleConfig = Object.create(null);

helpers.inlineStyle = function(rule, valueToStore, level) {
  var config, styleEl;
  if (!(config = styleConfig[level])) {
    styleEl = document.createElement('style');
    styleEl.id = "quickcss" + (level || '');
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

helpers.clearInlineStyle = function(level) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlbHBlcnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsU0FBQSxHQUFZLElBQUEsQ0FBSyxhQUFMOztBQUNaLFdBQUEsR0FBYyxRQUFRLENBQUMsYUFBVCxDQUF1QixLQUF2QixDQUE2QixDQUFDOztBQUU1QyxPQUFBLEdBQVU7O0FBRVYsT0FBTyxDQUFDLFFBQVIsR0FBbUIsU0FBQyxNQUFELEVBQVMsSUFBVDtTQUNsQixNQUFBLElBQVcsTUFBTSxDQUFDLE9BQVAsQ0FBZSxJQUFmLENBQUEsS0FBMEIsQ0FBQztBQURwQjs7QUFHbkIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQyxNQUFEO1NBQ3BCLE1BQUEsSUFDQSxPQUFPLE1BQVAsS0FBaUIsUUFEakIsSUFFQSxPQUFPLE1BQU0sQ0FBQyxNQUFkLEtBQXdCLFFBRnhCLElBR0EsQ0FBSSxNQUFNLENBQUM7QUFKUzs7QUFNckIsT0FBTyxDQUFDLFdBQVIsR0FBc0IsU0FBQyxNQUFEO1NBQ3JCLE1BQU0sQ0FBQyxPQUFQLENBQWUsU0FBUyxDQUFDLFdBQXpCLEVBQXNDLFNBQUMsQ0FBRCxFQUFHLE1BQUg7V0FBYSxHQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBUCxDQUFBLENBQUQ7RUFBaEIsQ0FBdEM7QUFEcUI7O0FBR3RCLE9BQU8sQ0FBQyxlQUFSLEdBQTBCLFNBQUMsUUFBRDtTQUN6QixPQUFPLFdBQVksQ0FBQSxRQUFBLENBQW5CLEtBQWtDO0FBRFQ7O0FBRzFCLE9BQU8sQ0FBQyxnQkFBUixHQUEyQixTQUFDLFFBQUQsRUFBVyxLQUFYO0VBQzFCLElBQUcsTUFBTSxDQUFDLEdBQVAsSUFBZSxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQTdCO0FBQ0MsV0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVgsQ0FBb0IsUUFBcEIsRUFBOEIsS0FBOUIsRUFEUjtHQUFBLE1BQUE7SUFHQyxXQUFZ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TUFBQSxFQUFBLEVBQUcsT0FBSDtNQUFZLE9BQUEsRUFBUSxFQUFwQjtNQUF3QixLQUFBLEVBQU0sTUFBTSxDQUFDLE1BQVAsQ0FBYyxJQUFkLENBQTlCO01BSi9COztFQU1BLElBQUEsQ0FBTyxNQUFNLENBQUMsS0FBTSxDQUFBLElBQUEsQ0FBcEI7SUFDQyxNQUFNLENBQUMsS0FBTSxDQUFBLElBQUEsQ0FBYixHQUFxQixZQUFBLElBQWdCO0lBQ3JDLE1BQU0sQ0FBQyxFQUFFLENBQUMsV0FBVixHQUF3QixNQUFNLENBQUMsT0FBUCxJQUFrQixLQUYzQzs7QUFQcUI7O0FBY3RCLE9BQU8sQ0FBQyxnQkFBUixHQUEyQixTQUFDLEtBQUQ7QUFBVSxNQUFBO0VBQUEsSUFBRyxNQUFBLEdBQVMsV0FBWSxDQUFBLEtBQUEsQ0FBeEI7SUFDcEMsSUFBVSxDQUFJLE1BQU0sQ0FBQyxPQUFyQjtBQUFBLGFBQUE7O0lBQ0EsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFWLEdBQXdCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0lBQ3pDLElBQUEsR0FBTyxNQUFNLENBQUMsSUFBUCxDQUFZLE1BQU0sQ0FBQyxLQUFuQjtBQUNQLFNBQUEsd0NBQUE7O01BQUEsTUFBTSxDQUFDLEtBQU0sQ0FBQSxHQUFBLENBQWIsR0FBb0I7QUFBcEIsS0FKb0M7O0FBQVYiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdGFudHMgPSBfJHNtKCcuL2NvbnN0YW50cycgKVxuc2FtcGxlU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS5zdHlsZVxuXG5oZWxwZXJzID0gZXhwb3J0c1xuXG5oZWxwZXJzLmluY2x1ZGVzID0gKHRhcmdldCwgaXRlbSktPlxuXHR0YXJnZXQgYW5kIHRhcmdldC5pbmRleE9mKGl0ZW0pIGlzbnQgLTFcblxuaGVscGVycy5pc0l0ZXJhYmxlID0gKHRhcmdldCktPlxuXHR0YXJnZXQgYW5kXG5cdHR5cGVvZiB0YXJnZXQgaXMgJ29iamVjdCcgYW5kXG5cdHR5cGVvZiB0YXJnZXQubGVuZ3RoIGlzICdudW1iZXInIGFuZFxuXHRub3QgdGFyZ2V0Lm5vZGVUeXBlXG5cbmhlbHBlcnMudG9LZWJhYkNhc2UgPSAoc3RyaW5nKS0+XG5cdHN0cmluZy5yZXBsYWNlIGNvbnN0YW50cy5SRUdFWF9LRUJBQiwgKGUsbGV0dGVyKS0+IFwiLSN7bGV0dGVyLnRvTG93ZXJDYXNlKCl9XCJcblxuaGVscGVycy5pc1Byb3BTdXBwb3J0ZWQgPSAocHJvcGVydHkpLT5cblx0dHlwZW9mIHNhbXBsZVN0eWxlW3Byb3BlcnR5XSBpc250ICd1bmRlZmluZWQnXG5cbmhlbHBlcnMuaXNWYWx1ZVN1cHBvcnRlZCA9IChwcm9wZXJ0eSwgdmFsdWUpLT5cblx0aWYgd2luZG93LkNTUyBhbmQgd2luZG93LkNTUy5zdXBwb3J0c1xuXHRcdHJldHVybiB3aW5kb3cuQ1NTLnN1cHBvcnRzKHByb3BlcnR5LCB2YWx1ZSlcblx0ZWxzZVxuXHRcdHNhbXBsZVN0eWxlW3Byb3BlcnR5XSA9IHZhbHVlXG5cdFx0cmV0dXJuIHNhbXBsZVN0eWxlW3Byb3BlcnR5XSBpcyAnJyt2YWx1ZVxuXG5oZWxwZXJzLmdldFByZWZpeCA9IChwcm9wZXJ0eSwgc2tpcEluaXRpYWxDaGVjayktPlxuXHRpZiBza2lwSW5pdGlhbENoZWNrIG9yIG5vdCBoZWxwZXJzLmlzUHJvcFN1cHBvcnRlZChwcm9wZXJ0eSlcblx0XHRmb3IgcHJlZml4IGluIGNvbnN0YW50cy5QT1NTSUJMRV9QUkVGSVhFU1xuXHRcdFx0IyMjIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICMjI1xuXHRcdFx0cmV0dXJuIFwiLSN7cHJlZml4fS1cIiBpZiBoZWxwZXJzLmlzUHJvcFN1cHBvcnRlZChcIi0je3ByZWZpeH0tI3twcm9wZXJ0eX1cIilcblx0XG5cdHJldHVybiAnJ1xuXG5oZWxwZXJzLm5vcm1hbGl6ZVByb3BlcnR5ID0gKHByb3BlcnR5KS0+XHRcblx0cHJvcGVydHkgPSBoZWxwZXJzLnRvS2ViYWJDYXNlKHByb3BlcnR5KVxuXHRcblx0aWYgaGVscGVycy5pc1Byb3BTdXBwb3J0ZWQocHJvcGVydHkpXG5cdFx0cmV0dXJuIHByb3BlcnR5XG5cdGVsc2Vcblx0XHRyZXR1cm4gXCIje2hlbHBlcnMuZ2V0UHJlZml4KHByb3BlcnR5LHRydWUpfSN7cHJvcGVydHl9XCJcblxuaGVscGVycy5ub3JtYWxpemVWYWx1ZSA9IChwcm9wZXJ0eSwgdmFsdWUpLT5cblx0aWYgaGVscGVycy5pbmNsdWRlcyhjb25zdGFudHMuUkVRVUlSRVNfVU5JVF9WQUxVRSwgcHJvcGVydHkpIGFuZCB2YWx1ZSBpc250IG51bGxcblx0XHR2YWx1ZSA9ICcnK3ZhbHVlXG5cdFx0aWYgIGNvbnN0YW50cy5SRUdFWF9ESUdJVFMudGVzdCh2YWx1ZSkgYW5kXG5cdFx0XHRub3QgY29uc3RhbnRzLlJFR0VYX0xFTl9WQUwudGVzdCh2YWx1ZSkgYW5kXG5cdFx0XHRub3QgY29uc3RhbnRzLlJFR0VYX1NQQUNFLnRlc3QodmFsdWUpXG5cdFx0XHRcdHZhbHVlICs9IGlmIHByb3BlcnR5IGlzICdsaW5lLWhlaWdodCcgdGhlbiAnZW0nIGVsc2UgJ3B4J1xuXG5cdHJldHVybiB2YWx1ZVxuXG5cbmhlbHBlcnMuc29ydCA9IChhcnJheSktPlxuXHRpZiBhcnJheS5sZW5ndGggPCAyXG5cdFx0cmV0dXJuIGFycmF5XG5cdGVsc2Vcblx0XHRwaXZvdCA9IGFycmF5WzBdOyBsZXNzID0gW107IGdyZWF0ID0gW107IGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA9IDA7XG5cdFx0XG5cdFx0d2hpbGUgKytpIGlzbnQgbGVuXG5cdFx0XHRpZiBhcnJheVtpXSA8PSBwaXZvdFxuXHRcdFx0XHRsZXNzLnB1c2goYXJyYXlbaV0pXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGdyZWF0LnB1c2goYXJyYXlbaV0pXG5cblx0XHRyZXR1cm4gaGVscGVycy5zb3J0KGxlc3MpLmNvbmNhdChwaXZvdCwgaGVscGVycy5zb3J0KGdyZWF0KSlcblxuXG5oZWxwZXJzLmhhc2ggPSAoc3RyaW5nKS0+XG5cdGhhc2ggPSA1MzgxOyBpID0gLTE7IGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcblx0XG5cdHdoaWxlICsraSBpc250IHN0cmluZy5sZW5ndGhcblx0XHRoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBzdHJpbmcuY2hhckNvZGVBdChpKVxuXHRcdGhhc2ggfD0gMFxuXG5cdHJldHVybiAnXycrKGlmIGhhc2ggPCAwIHRoZW4gaGFzaCAqIC0yIGVsc2UgaGFzaClcblxuXG5oZWxwZXJzLnJ1bGVUb1N0cmluZyA9IChydWxlLCBpbXBvcnRhbnQpLT5cblx0b3V0cHV0ID0gJydcblx0cHJvcHMgPSBoZWxwZXJzLnNvcnQoT2JqZWN0LmtleXMocnVsZSkpXG5cdFxuXHRmb3IgcHJvcCBpbiBwcm9wc1xuXHRcdGlmIHR5cGVvZiBydWxlW3Byb3BdIGlzICdzdHJpbmcnIG9yIHR5cGVvZiBydWxlW3Byb3BdIGlzICdudW1iZXInXG5cdFx0XHRwcm9wZXJ0eSA9IGhlbHBlcnMubm9ybWFsaXplUHJvcGVydHkocHJvcClcblx0XHRcdHZhbHVlID0gaGVscGVycy5ub3JtYWxpemVWYWx1ZShwcm9wZXJ0eSwgcnVsZVtwcm9wXSlcblx0XHRcdHZhbHVlICs9IFwiICFpbXBvcnRhbnRcIiBpZiBpbXBvcnRhbnRcblx0XHRcdG91dHB1dCArPSBcIiN7cHJvcGVydHl9OiN7dmFsdWV9O1wiXG5cdFxuXHRyZXR1cm4gb3V0cHV0XG5cbmhlbHBlcnMuaW5saW5lU3R5bGVDb25maWcgPSBzdHlsZUNvbmZpZyA9IE9iamVjdC5jcmVhdGUobnVsbClcbmhlbHBlcnMuaW5saW5lU3R5bGUgPSAocnVsZSwgdmFsdWVUb1N0b3JlLCBsZXZlbCktPlxuXHRpZiBub3QgY29uZmlnPXN0eWxlQ29uZmlnW2xldmVsXVxuXHRcdHN0eWxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG5cdFx0c3R5bGVFbC5pZCA9IFwicXVpY2tjc3Mje2xldmVsIG9yICcnfVwiXG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsKVxuXHRcdHN0eWxlQ29uZmlnW2xldmVsXSA9IGNvbmZpZyA9IGVsOnN0eWxlRWwsIGNvbnRlbnQ6JycsIGNhY2hlOk9iamVjdC5jcmVhdGUobnVsbClcblx0XG5cdHVubGVzcyBjb25maWcuY2FjaGVbcnVsZV1cblx0XHRjb25maWcuY2FjaGVbcnVsZV0gPSB2YWx1ZVRvU3RvcmUgb3IgdHJ1ZVxuXHRcdGNvbmZpZy5lbC50ZXh0Q29udGVudCA9IGNvbmZpZy5jb250ZW50ICs9IHJ1bGVcblx0XG5cdHJldHVyblxuXG5cbmhlbHBlcnMuY2xlYXJJbmxpbmVTdHlsZSA9IChsZXZlbCktPiBpZiBjb25maWcgPSBzdHlsZUNvbmZpZ1tsZXZlbF1cblx0cmV0dXJuIGlmIG5vdCBjb25maWcuY29udGVudFxuXHRjb25maWcuZWwudGV4dENvbnRlbnQgPSBjb25maWcuY29udGVudCA9ICcnXG5cdGtleXMgPSBPYmplY3Qua2V5cyhjb25maWcuY2FjaGUpXG5cdGNvbmZpZy5jYWNoZVtrZXldID0gbnVsbCBmb3Iga2V5IGluIGtleXNcblx0cmV0dXJuXG5cblxuXG5cblxuIl19
;
return module.exports;
},
37: function (require, module, exports) {
var Checks, availSets;

availSets = {
  natives: require(53),
  dom: require(54)
};

Checks = (function() {
  Checks.prototype.create = function() {
    var args;
    if (arguments.length) {
      args = Array.prototype.slice.call(arguments);
    }
    return new Checks(args);
  };

  function Checks(sets) {
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

  Checks.prototype.load = function(set) {
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
  };

  return Checks;

})();

module.exports = Checks.prototype.create();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxTQUFBLEdBQ0M7RUFBQSxPQUFBLEVBQVMsSUFBQSxDQUFLLFdBQUwsQ0FBVDtFQUNBLEdBQUEsRUFBSyxJQUFBLENBQUssT0FBTCxDQURMOzs7QUFHSzttQkFDTCxNQUFBLEdBQVEsU0FBQTtBQUNQLFFBQUE7SUFBQSxJQUF1QyxTQUFTLENBQUMsTUFBakQ7TUFBQSxJQUFBLEdBQU8sS0FBSyxDQUFBLFNBQUUsQ0FBQSxLQUFLLENBQUMsSUFBYixDQUFrQixTQUFsQixFQUFQOztXQUNBLElBQUksTUFBSixDQUFXLElBQVg7RUFGTzs7RUFLSyxnQkFBQyxJQUFEO0FBQ1osUUFBQTs7TUFBQSxPQUFRLENBQUMsU0FBRDs7QUFFUixTQUFBLHNDQUFBOztNQUNDLElBQXlCLFNBQVUsQ0FBQSxHQUFBLENBQW5DO1FBQUEsSUFBQyxDQUFBLElBQUQsQ0FBTSxTQUFVLENBQUEsR0FBQSxDQUFoQixFQUFBOztBQUREO0VBSFk7O21CQU9iLElBQUEsR0FBTSxTQUFDLEdBQUQ7QUFDTCxRQUFBO0lBQUEsSUFBd0IsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFsQixDQUF5QixHQUF6QixDQUF4QjtNQUFBLEdBQUEsR0FBTSxTQUFVLENBQUEsR0FBQSxFQUFoQjs7SUFDQSxJQUFVLENBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFsQixDQUE4QixHQUE5QixDQUFkO0FBQUEsYUFBQTs7QUFFQSxTQUFBLFVBQUE7O01BQ0MsSUFBRSxDQUFBLEdBQUEsQ0FBRixHQUFTO0FBRFY7RUFKSzs7Ozs7O0FBVVAsTUFBTSxDQUFDLE9BQVAsR0FBaUIsTUFBTSxDQUFBLFNBQUUsQ0FBQSxNQUFSLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJhdmFpbFNldHMgPSBcblx0bmF0aXZlczogXyRzbSgnLi9uYXRpdmVzJyApXG5cdGRvbTogXyRzbSgnLi9kb20nIClcblxuY2xhc3MgQ2hlY2tzXG5cdGNyZWF0ZTogKCktPlxuXHRcdGFyZ3MgPSBBcnJheTo6c2xpY2UuY2FsbChhcmd1bWVudHMpIGlmIGFyZ3VtZW50cy5sZW5ndGhcblx0XHRuZXcgQ2hlY2tzKGFyZ3MpXG5cdFxuXG5cdGNvbnN0cnVjdG9yOiAoc2V0cyktPlxuXHRcdHNldHMgPz0gWyduYXRpdmVzJ11cblx0XHRcblx0XHRmb3Igc2V0IGluIHNldHNcblx0XHRcdEBsb2FkKGF2YWlsU2V0c1tzZXRdKSBpZiBhdmFpbFNldHNbc2V0XVxuXG5cblx0bG9hZDogKHNldCktPlxuXHRcdHNldCA9IGF2YWlsU2V0c1tzZXRdIGlmIGF2YWlsU2V0cy5uYXRpdmVzLnN0cmluZyhzZXQpXG5cdFx0cmV0dXJuIGlmIG5vdCBhdmFpbFNldHMubmF0aXZlcy5vYmplY3RQbGFpbihzZXQpXG5cdFx0XG5cdFx0Zm9yIGtleSx2YWx1ZSBvZiBzZXRcblx0XHRcdEBba2V5XSA9IHZhbHVlXG5cdFx0XG5cdFx0cmV0dXJuXG5cdFxuXHRcbm1vZHVsZS5leHBvcnRzID0gQ2hlY2tzOjpjcmVhdGUoKSJdfQ==
;
return module.exports;
},
50: function (require, module, exports) {
(function () {
var process = require(56);
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
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
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
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


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
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
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
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

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
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
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
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
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
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
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
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
  return typeof arg === 'symbol';
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
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require(57);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require(58);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
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

}).call(this);
return module.exports;
},
51: function (require, module, exports) {
'use strict';

module.exports = function isArrayish(obj) {
	if (!obj) {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && obj.splice instanceof Function);
};
;
return module.exports;
},
52: function (require, module, exports) {
var __68 = require(6), DOM = __68.default;;

var SVG = require(59);

var __123 = require(12), button_ = __123.button;;

var button = button_.extend([
  'div', {
    computers: {
      _init: function() {
        return this.applyData({
          text: "Add " + this.related.settings.itemLabel
        });
      }
    }
  }
]);
exports.button = button; 

var arrow = DOM.template([
  'div', {
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
      backgroundImage: "url(" + SVG.arrowDown + ")",
      opacity: 0.5
    }
  }
]);
exports.arrow = arrow; 

var fake = DOM.template([
  'div', {
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
  }
]);
exports.fake = fake; 

var input = DOM.template([
  'select', {
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
      _init: function() {
        return DOM.option({
          props: {
            value: ''
          }
        }, "Select " + this.related.settings.tagLabel).appendTo(this);
      }
    },
    methods: {
      label: {
        get: function() {
          var ref, selected;
          selected = this.raw.selectedIndex || 0;
          return (ref = this.raw.options[selected]) != null ? ref.label : void 0;
        }
      },
      value: {
        get: function() {
          return this.raw.value;
        },
        set: function(value) {
          return this.raw.value = value;
        }
      }
    }
  }
]);
exports.input = input; 

var field = DOM.template([
  'div', {
    ref: 'selectField',
    style: {
      position: 'relative',
      minWidth: 230,
      height: '55px',
      borderBottom: '1px solid #ddd'
    }
  }, arrow, fake, input
]);
exports.field = field; 

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZW1wbGF0ZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxDQUFLLFVBQUwsRUFBZ0IsS0FBaEI7O0FBQ0EsSUFBQSxDQUFLLFFBQUwsRUFBYyxVQUFkOztBQUNBLElBQUEsQ0FBSyxtQkFBTCxFQUF5QixxQkFBekI7O0FBRUEsT0FBQSxJQUFPLE1BQVAsR0FBZ0IsT0FBTyxDQUFDLE1BQVIsQ0FDZjtFQUFDLEtBQUQsRUFDQztJQUFBLFNBQUEsRUFBVztNQUFBLEtBQUEsRUFBTyxTQUFBO2VBQ2pCLElBQUMsQ0FBQSxTQUFELENBQVc7VUFBQSxJQUFBLEVBQUssTUFBQSxHQUFPLElBQUMsQ0FBQSxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQTlCO1NBQVg7TUFEaUIsQ0FBUDtLQUFYO0dBREQ7Q0FEZTs7QUFPaEIsT0FBQSxJQUFPLEtBQVAsR0FBZSxHQUFHLENBQUMsUUFBSixDQUNkO0VBQUMsS0FBRCxFQUNDO0lBQUEsR0FBQSxFQUFLLE9BQUw7SUFDQSxLQUFBLEVBQ0M7TUFBQSxRQUFBLEVBQVUsVUFBVjtNQUNBLE1BQUEsRUFBUSxDQURSO01BRUEsS0FBQSxFQUFPLE1BRlA7TUFHQSxHQUFBLEVBQUssS0FITDtNQUlBLFNBQUEsRUFBVyxvQkFKWDtNQUtBLEtBQUEsRUFBTyxNQUxQO01BTUEsTUFBQSxFQUFRLE1BTlI7TUFPQSxjQUFBLEVBQWdCLE1BUGhCO01BUUEsZUFBQSxFQUFpQixNQUFBLEdBQU8sR0FBRyxDQUFDLFNBQVgsR0FBcUIsR0FSdEM7TUFTQSxPQUFBLEVBQVMsR0FUVDtLQUZEO0dBREQ7Q0FEYzs7QUFpQmYsT0FBQSxJQUFPLElBQVAsR0FBYyxHQUFHLENBQUMsUUFBSixDQUNiO0VBQUMsS0FBRCxFQUNDO0lBQUEsR0FBQSxFQUFLLE1BQUw7SUFDQSxLQUFBLEVBQ0M7TUFBQSxRQUFBLEVBQVUsVUFBVjtNQUNBLE1BQUEsRUFBUSxDQURSO01BRUEsSUFBQSxFQUFNLENBRk47TUFHQSxHQUFBLEVBQUssS0FITDtNQUlBLFNBQUEsRUFBVyxvQkFKWDtNQUtBLE1BQUEsRUFBUSxNQUxSO01BTUEsT0FBQSxFQUFTLFFBTlQ7TUFPQSxRQUFBLEVBQVUsTUFQVjtNQVFBLFVBQUEsRUFBWSxHQVJaO01BU0EsVUFBQSxFQUFZLENBVFo7TUFVQSxTQUFBLEVBQVcsTUFWWDtNQVdBLFVBQUEsRUFBWSxNQVhaO01BWUEsU0FBQSxFQUFXLFlBWlg7TUFhQSxLQUFBLEVBQU8sU0FiUDtNQWNBLE9BQUEsRUFBUyxHQWRUO01BZUEsV0FBQSxFQUNDO1FBQUEsT0FBQSxFQUFTLENBQVQ7T0FoQkQ7S0FGRDtHQUREO0NBRGE7O0FBd0JkLE9BQUEsSUFBTyxLQUFQLEdBQWUsR0FBRyxDQUFDLFFBQUosQ0FDZDtFQUFDLFFBQUQsRUFDQztJQUFBLEdBQUEsRUFBSyxPQUFMO0lBQ0EsVUFBQSxFQUFZLElBRFo7SUFFQSxLQUFBLEVBQ0M7TUFBQSxRQUFBLEVBQVUsVUFBVjtNQUNBLE1BQUEsRUFBUSxDQURSO01BRUEsR0FBQSxFQUFLLENBRkw7TUFHQSxJQUFBLEVBQU0sQ0FITjtNQUlBLEtBQUEsRUFBTyxNQUpQO01BS0EsTUFBQSxFQUFRLE1BTFI7TUFNQSxPQUFBLEVBQVMsQ0FOVDtLQUhEO0lBV0EsU0FBQSxFQUFXO01BQUEsS0FBQSxFQUFPLFNBQUE7ZUFDakIsR0FBRyxDQUFDLE1BQUosQ0FBVztVQUFBLEtBQUEsRUFBTTtZQUFDLEtBQUEsRUFBTSxFQUFQO1dBQU47U0FBWCxFQUE2QixTQUFBLEdBQVUsSUFBQyxDQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBekQsQ0FBb0UsQ0FBQyxRQUFyRSxDQUE4RSxJQUE5RTtNQURpQixDQUFQO0tBWFg7SUFjQSxPQUFBLEVBQ0M7TUFBQSxLQUFBLEVBQU87UUFBQSxHQUFBLEVBQUssU0FBQTtBQUNYLGNBQUE7VUFBQSxRQUFBLEdBQVcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxhQUFMLElBQXNCO0FBQ2pDLGlFQUE2QixDQUFFO1FBRnBCLENBQUw7T0FBUDtNQUlBLEtBQUEsRUFDQztRQUFBLEdBQUEsRUFBSyxTQUFBO2lCQUFLLElBQUMsQ0FBQSxHQUFHLENBQUM7UUFBVixDQUFMO1FBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtpQkFBVSxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsR0FBYTtRQUF2QixDQURMO09BTEQ7S0FmRDtHQUREO0NBRGM7O0FBMkJmLE9BQUEsSUFBTyxLQUFQLEdBQWUsR0FBRyxDQUFDLFFBQUosQ0FDZDtFQUFDLEtBQUQsRUFDQztJQUFBLEdBQUEsRUFBSyxhQUFMO0lBQ0EsS0FBQSxFQUNDO01BQUEsUUFBQSxFQUFVLFVBQVY7TUFFQSxRQUFBLEVBQVUsR0FGVjtNQUdBLE1BQUEsRUFBUSxNQUhSO01BSUEsWUFBQSxFQUFjLGdCQUpkO0tBRkQ7R0FERCxFQVNDLEtBVEQsRUFVQyxJQVZELEVBV0MsS0FYRDtDQURjIiwic291cmNlc0NvbnRlbnQiOlsiXyRzbSgncXVpY2tkb20nLCdET00nICAgIClcbl8kc20oJy4uL3N2ZycsJyogYXMgU1ZHJyAgICApXG5fJHNtKCcuLi9wb3B1cC90ZW1wbGF0ZScsJ3tidXR0b24gYXMgYnV0dG9uX30nICAgIClcblxuZXhwb3J0IGJ1dHRvbiA9IGJ1dHRvbl8uZXh0ZW5kKFxuXHRbJ2Rpdidcblx0XHRjb21wdXRlcnM6IF9pbml0OiAoKS0+XG5cdFx0XHRAYXBwbHlEYXRhIHRleHQ6XCJBZGQgI3tAcmVsYXRlZC5zZXR0aW5ncy5pdGVtTGFiZWx9XCJcblx0XVxuKVxuXG5leHBvcnQgYXJyb3cgPSBET00udGVtcGxhdGUoXG5cdFsnZGl2J1xuXHRcdHJlZjogJ2Fycm93J1xuXHRcdHN0eWxlOlxuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZSdcblx0XHRcdHpJbmRleDogMlxuXHRcdFx0cmlnaHQ6ICcxNXB4J1xuXHRcdFx0dG9wOiAnNTQlJ1xuXHRcdFx0dHJhbnNmb3JtOiBcInRyYW5zbGF0ZSgwLCAtNTAlKVwiXG5cdFx0XHR3aWR0aDogJzE3cHgnXG5cdFx0XHRoZWlnaHQ6ICcxN3B4J1xuXHRcdFx0YmFja2dyb3VuZFNpemU6ICcxMDAlJ1xuXHRcdFx0YmFja2dyb3VuZEltYWdlOiBcInVybCgje1NWRy5hcnJvd0Rvd259KVwiXG5cdFx0XHRvcGFjaXR5OiAwLjVcblx0XVxuKVxuXG5leHBvcnQgZmFrZSA9IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAnZmFrZSdcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXG5cdFx0XHR6SW5kZXg6IDFcblx0XHRcdGxlZnQ6IDBcblx0XHRcdHRvcDogJzUzJSdcblx0XHRcdHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUoMCwgLTUwJSlcIlxuXHRcdFx0aGVpZ2h0OiAnMTZweCdcblx0XHRcdHBhZGRpbmc6ICcwIDE1cHgnXG5cdFx0XHRmb250U2l6ZTogJzE2cHgnXG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDFcblx0XHRcdHRleHRBbGlnbjogJ2xlZnQnXG5cdFx0XHR1c2VyU2VsZWN0OiAnbm9uZSdcblx0XHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnXG5cdFx0XHRjb2xvcjogJyMxODE4MTgnXG5cdFx0XHRvcGFjaXR5OiAwLjZcblx0XHRcdCRoYXNDb250ZW50OlxuXHRcdFx0XHRvcGFjaXR5OiAxXG5cdF1cbilcblxuZXhwb3J0IGlucHV0ID0gRE9NLnRlbXBsYXRlKFxuXHRbJ3NlbGVjdCdcblx0XHRyZWY6ICdpbnB1dCdcblx0XHRmb3JjZVN0eWxlOiB0cnVlXG5cdFx0c3R5bGU6XG5cdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJ1xuXHRcdFx0ekluZGV4OiAzXG5cdFx0XHR0b3A6IDBcblx0XHRcdGxlZnQ6IDBcblx0XHRcdHdpZHRoOiAnMTAwJSdcblx0XHRcdGhlaWdodDogJzEwMCUnXG5cdFx0XHRvcGFjaXR5OiAwXG5cblx0XHRjb21wdXRlcnM6IF9pbml0OiAoKS0+XG5cdFx0XHRET00ub3B0aW9uKHByb3BzOnt2YWx1ZTonJ30sIFwiU2VsZWN0ICN7QHJlbGF0ZWQuc2V0dGluZ3MudGFnTGFiZWx9XCIpLmFwcGVuZFRvKEApXG5cblx0XHRtZXRob2RzOlxuXHRcdFx0bGFiZWw6IGdldDogKCktPlxuXHRcdFx0XHRzZWxlY3RlZCA9IEByYXcuc2VsZWN0ZWRJbmRleCBvciAwXG5cdFx0XHRcdHJldHVybiBAcmF3Lm9wdGlvbnNbc2VsZWN0ZWRdPy5sYWJlbFxuXHRcdFx0XG5cdFx0XHR2YWx1ZTpcblx0XHRcdFx0Z2V0OiAoKS0+IEByYXcudmFsdWVcblx0XHRcdFx0c2V0OiAodmFsdWUpLT4gQHJhdy52YWx1ZSA9IHZhbHVlXG5cdF1cbilcblxuZXhwb3J0IGZpZWxkID0gRE9NLnRlbXBsYXRlKFxuXHRbJ2Rpdidcblx0XHRyZWY6ICdzZWxlY3RGaWVsZCdcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnXG5cdFx0XHQjIHdpZHRoOiAnMTAwJSdcblx0XHRcdG1pbldpZHRoOiAyMzBcblx0XHRcdGhlaWdodDogJzU1cHgnXG5cdFx0XHRib3JkZXJCb3R0b206ICcxcHggc29saWQgI2RkZCdcblxuXHRcdGFycm93XG5cdFx0ZmFrZVxuXHRcdGlucHV0XG5cdF1cbilcblxuXG5cbiJdfQ==
;
return module.exports;
},
53: function (require, module, exports) {
var exports;

module.exports = exports = {
  defined: function(subject) {
    return subject !== void 0;
  },
  array: function(subject) {
    return subject instanceof Array;
  },
  object: function(subject) {
    return typeof subject === 'object' && subject;
  },
  objectPlain: function(subject) {
    return exports.object(subject) && Object.prototype.toString.call(subject) === '[object Object]' && subject.constructor === Object;
  },
  string: function(subject) {
    return typeof subject === 'string';
  },
  number: function(subject) {
    return typeof subject === 'number' && !isNaN(subject);
  },
  numberLoose: function(subject) {
    return exports.number(subject) || exports.string(subject) && exports.number(Number(subject));
  },
  "function": function(subject) {
    return typeof subject === 'function';
  },
  iterable: function(subject) {
    return exports.object(subject) && exports.number(subject.length);
  }
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5hdGl2ZXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsT0FBQSxHQUNoQjtFQUFBLE9BQUEsRUFBUyxTQUFDLE9BQUQ7V0FBWSxPQUFBLEtBQWE7RUFBekIsQ0FBVDtFQUVBLEtBQUEsRUFBTyxTQUFDLE9BQUQ7V0FBWSxPQUFBLFlBQW1CO0VBQS9CLENBRlA7RUFJQSxNQUFBLEVBQVEsU0FBQyxPQUFEO1dBQVksT0FBTyxPQUFQLEtBQWtCLFFBQWxCLElBQStCO0VBQTNDLENBSlI7RUFNQSxXQUFBLEVBQWEsU0FBQyxPQUFEO1dBQVksT0FBTyxDQUFDLE1BQVIsQ0FBZSxPQUFmLENBQUEsSUFBNEIsTUFBTSxDQUFBLFNBQUUsQ0FBQSxRQUFRLENBQUMsSUFBakIsQ0FBc0IsT0FBdEIsQ0FBQSxLQUFrQyxpQkFBOUQsSUFBb0YsT0FBTyxDQUFDLFdBQVIsS0FBdUI7RUFBdkgsQ0FOYjtFQVFBLE1BQUEsRUFBUSxTQUFDLE9BQUQ7V0FBWSxPQUFPLE9BQVAsS0FBa0I7RUFBOUIsQ0FSUjtFQVVBLE1BQUEsRUFBUSxTQUFDLE9BQUQ7V0FBWSxPQUFPLE9BQVAsS0FBa0IsUUFBbEIsSUFBK0IsQ0FBSSxLQUFBLENBQU0sT0FBTjtFQUEvQyxDQVZSO0VBWUEsV0FBQSxFQUFhLFNBQUMsT0FBRDtXQUFZLE9BQU8sQ0FBQyxNQUFSLENBQWUsT0FBZixDQUFBLElBQTJCLE9BQU8sQ0FBQyxNQUFSLENBQWUsT0FBZixDQUFBLElBQTRCLE9BQU8sQ0FBQyxNQUFSLENBQWUsTUFBQSxDQUFPLE9BQVAsQ0FBZjtFQUFuRSxDQVpiO0VBY0EsQ0FBQSxRQUFBLENBQUEsRUFBVSxTQUFDLE9BQUQ7V0FBWSxPQUFPLE9BQVAsS0FBa0I7RUFBOUIsQ0FkVjtFQWdCQSxRQUFBLEVBQVUsU0FBQyxPQUFEO1dBQVksT0FBTyxDQUFDLE1BQVIsQ0FBZSxPQUFmLENBQUEsSUFBNEIsT0FBTyxDQUFDLE1BQVIsQ0FBZSxPQUFPLENBQUMsTUFBdkI7RUFBeEMsQ0FoQlYiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPVxuXHRkZWZpbmVkOiAoc3ViamVjdCktPiBzdWJqZWN0IGlzbnQgdW5kZWZpbmVkXG5cdFxuXHRhcnJheTogKHN1YmplY3QpLT4gc3ViamVjdCBpbnN0YW5jZW9mIEFycmF5XG5cdFxuXHRvYmplY3Q6IChzdWJqZWN0KS0+IHR5cGVvZiBzdWJqZWN0IGlzICdvYmplY3QnIGFuZCBzdWJqZWN0ICMgMm5kIGNoZWNrIGlzIHRvIHRlc3QgYWdhaW5zdCAnbnVsbCcgdmFsdWVzXG5cblx0b2JqZWN0UGxhaW46IChzdWJqZWN0KS0+IGV4cG9ydHMub2JqZWN0KHN1YmplY3QpIGFuZCBPYmplY3Q6OnRvU3RyaW5nLmNhbGwoc3ViamVjdCkgaXMgJ1tvYmplY3QgT2JqZWN0XScgYW5kIHN1YmplY3QuY29uc3RydWN0b3IgaXMgT2JqZWN0XG5cblx0c3RyaW5nOiAoc3ViamVjdCktPiB0eXBlb2Ygc3ViamVjdCBpcyAnc3RyaW5nJ1xuXHRcblx0bnVtYmVyOiAoc3ViamVjdCktPiB0eXBlb2Ygc3ViamVjdCBpcyAnbnVtYmVyJyBhbmQgbm90IGlzTmFOKHN1YmplY3QpXG5cblx0bnVtYmVyTG9vc2U6IChzdWJqZWN0KS0+IGV4cG9ydHMubnVtYmVyKHN1YmplY3QpIG9yIGV4cG9ydHMuc3RyaW5nKHN1YmplY3QpIGFuZCBleHBvcnRzLm51bWJlcihOdW1iZXIgc3ViamVjdClcblx0XG5cdGZ1bmN0aW9uOiAoc3ViamVjdCktPiB0eXBlb2Ygc3ViamVjdCBpcyAnZnVuY3Rpb24nXG5cblx0aXRlcmFibGU6IChzdWJqZWN0KS0+IGV4cG9ydHMub2JqZWN0KHN1YmplY3QpIGFuZCBleHBvcnRzLm51bWJlcihzdWJqZWN0Lmxlbmd0aCkiXX0=
;
return module.exports;
},
54: function (require, module, exports) {
var exports;

module.exports = exports = {
  domDoc: function(subject) {
    return subject && subject.nodeType === 9;
  },
  domEl: function(subject) {
    return subject && subject.nodeType === 1;
  },
  domText: function(subject) {
    return subject && subject.nodeType === 3;
  },
  domNode: function(subject) {
    return exports.domEl(subject) || exports.domText(subject);
  },
  domTextarea: function(subject) {
    return subject && subject.nodeName === 'TEXTAREA';
  },
  domInput: function(subject) {
    return subject && subject.nodeName === 'INPUT';
  },
  domSelect: function(subject) {
    return subject && subject.nodeName === 'SELECT';
  },
  domField: function(subject) {
    return exports.domInput(subject) || exports.domTextarea(subject) || exports.domSelect(subject);
  }
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9tLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLE9BQUEsR0FDaEI7RUFBQSxNQUFBLEVBQVEsU0FBQyxPQUFEO1dBQVksT0FBQSxJQUFZLE9BQU8sQ0FBQyxRQUFSLEtBQW9CO0VBQTVDLENBQVI7RUFFQSxLQUFBLEVBQU8sU0FBQyxPQUFEO1dBQVksT0FBQSxJQUFZLE9BQU8sQ0FBQyxRQUFSLEtBQW9CO0VBQTVDLENBRlA7RUFJQSxPQUFBLEVBQVMsU0FBQyxPQUFEO1dBQVksT0FBQSxJQUFZLE9BQU8sQ0FBQyxRQUFSLEtBQW9CO0VBQTVDLENBSlQ7RUFNQSxPQUFBLEVBQVMsU0FBQyxPQUFEO1dBQVksT0FBTyxDQUFDLEtBQVIsQ0FBYyxPQUFkLENBQUEsSUFBMEIsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsT0FBaEI7RUFBdEMsQ0FOVDtFQVFBLFdBQUEsRUFBYSxTQUFDLE9BQUQ7V0FBWSxPQUFBLElBQVksT0FBTyxDQUFDLFFBQVIsS0FBb0I7RUFBNUMsQ0FSYjtFQVVBLFFBQUEsRUFBVSxTQUFDLE9BQUQ7V0FBWSxPQUFBLElBQVksT0FBTyxDQUFDLFFBQVIsS0FBb0I7RUFBNUMsQ0FWVjtFQVlBLFNBQUEsRUFBVyxTQUFDLE9BQUQ7V0FBWSxPQUFBLElBQVksT0FBTyxDQUFDLFFBQVIsS0FBb0I7RUFBNUMsQ0FaWDtFQWNBLFFBQUEsRUFBVSxTQUFDLE9BQUQ7V0FBWSxPQUFPLENBQUMsUUFBUixDQUFpQixPQUFqQixDQUFBLElBQTZCLE9BQU8sQ0FBQyxXQUFSLENBQW9CLE9BQXBCLENBQTdCLElBQTZELE9BQU8sQ0FBQyxTQUFSLENBQWtCLE9BQWxCO0VBQXpFLENBZFYiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBcblx0ZG9tRG9jOiAoc3ViamVjdCktPiBzdWJqZWN0IGFuZCBzdWJqZWN0Lm5vZGVUeXBlIGlzIDlcblxuXHRkb21FbDogKHN1YmplY3QpLT4gc3ViamVjdCBhbmQgc3ViamVjdC5ub2RlVHlwZSBpcyAxXG5cblx0ZG9tVGV4dDogKHN1YmplY3QpLT4gc3ViamVjdCBhbmQgc3ViamVjdC5ub2RlVHlwZSBpcyAzXG5cblx0ZG9tTm9kZTogKHN1YmplY3QpLT4gZXhwb3J0cy5kb21FbChzdWJqZWN0KSBvciBleHBvcnRzLmRvbVRleHQoc3ViamVjdClcblxuXHRkb21UZXh0YXJlYTogKHN1YmplY3QpLT4gc3ViamVjdCBhbmQgc3ViamVjdC5ub2RlTmFtZSBpcyAnVEVYVEFSRUEnXG5cdFxuXHRkb21JbnB1dDogKHN1YmplY3QpLT4gc3ViamVjdCBhbmQgc3ViamVjdC5ub2RlTmFtZSBpcyAnSU5QVVQnXG5cdFxuXHRkb21TZWxlY3Q6IChzdWJqZWN0KS0+IHN1YmplY3QgYW5kIHN1YmplY3Qubm9kZU5hbWUgaXMgJ1NFTEVDVCdcblx0XG5cdGRvbUZpZWxkOiAoc3ViamVjdCktPiBleHBvcnRzLmRvbUlucHV0KHN1YmplY3QpIG9yIGV4cG9ydHMuZG9tVGV4dGFyZWEoc3ViamVjdCkgb3IgZXhwb3J0cy5kb21TZWxlY3Qoc3ViamVjdCkiXX0=
;
return module.exports;
},
55: function (require, module, exports) {
var StateChain;

module.exports = StateChain = (function() {
  function StateChain(states) {
    this.string = states.join('+');
    this.array = states.slice();
    this.length = states.length;
  }

  StateChain.prototype.includes = function(target) {
    var i, len, ref, state;
    ref = this.array;
    for (i = 0, len = ref.length; i < len; i++) {
      state = ref[i];
      if (state === target) {
        return true;
      }
    }
    return false;
  };

  StateChain.prototype.without = function(target) {
    return this.array.filter(function(state) {
      return state !== target;
    }).join('+');
  };

  StateChain.prototype.isApplicable = function(target, otherActive) {
    var active;
    active = this.array.filter(function(state) {
      return state === target || otherActive.indexOf(state) !== -1;
    });
    return active.length === this.array.length;
  };

  return StateChain;

})();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVDaGFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0YXRlQ2hhaW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsTUFBTSxDQUFDLE9BQVAsR0FBdUI7RUFDVCxvQkFBQyxNQUFEO0lBQ1osSUFBQyxDQUFBLE1BQUQsR0FBVSxNQUFNLENBQUMsSUFBUCxDQUFZLEdBQVo7SUFDVixJQUFDLENBQUEsS0FBRCxHQUFTLE1BQU0sQ0FBQyxLQUFQLENBQUE7SUFDVCxJQUFDLENBQUEsTUFBRCxHQUFVLE1BQU0sQ0FBQztFQUhMOzt1QkFLYixRQUFBLEdBQVUsU0FBQyxNQUFEO0FBQ1QsUUFBQTtBQUFBO0FBQUEsU0FBQSxxQ0FBQTs7TUFDQyxJQUFlLEtBQUEsS0FBUyxNQUF4QjtBQUFBLGVBQU8sS0FBUDs7QUFERDtBQUdBLFdBQU87RUFKRTs7dUJBTVYsT0FBQSxHQUFTLFNBQUMsTUFBRDtXQUNSLElBQUMsQ0FBQSxLQUNBLENBQUMsTUFERixDQUNTLFNBQUMsS0FBRDthQUFVLEtBQUEsS0FBVztJQUFyQixDQURULENBRUMsQ0FBQyxJQUZGLENBRU8sR0FGUDtFQURROzt1QkFNVCxZQUFBLEdBQWMsU0FBQyxNQUFELEVBQVMsV0FBVDtBQUNiLFFBQUE7SUFBQSxNQUFBLEdBQVMsSUFBQyxDQUFBLEtBQUssQ0FBQyxNQUFQLENBQWMsU0FBQyxLQUFEO2FBQ3RCLEtBQUEsS0FBUyxNQUFULElBQ0EsV0FBVyxDQUFDLE9BQVosQ0FBb0IsS0FBcEIsQ0FBQSxLQUFnQyxDQUFDO0lBRlgsQ0FBZDtBQUlULFdBQU8sTUFBTSxDQUFDLE1BQVAsS0FBaUIsSUFBQyxDQUFBLEtBQUssQ0FBQztFQUxsQiIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gY2xhc3MgU3RhdGVDaGFpblxuXHRjb25zdHJ1Y3RvcjogKHN0YXRlcyktPlxuXHRcdEBzdHJpbmcgPSBzdGF0ZXMuam9pbignKycpXG5cdFx0QGFycmF5ID0gc3RhdGVzLnNsaWNlKClcblx0XHRAbGVuZ3RoID0gc3RhdGVzLmxlbmd0aFxuXG5cdGluY2x1ZGVzOiAodGFyZ2V0KS0+XG5cdFx0Zm9yIHN0YXRlIGluIEBhcnJheVxuXHRcdFx0cmV0dXJuIHRydWUgaWYgc3RhdGUgaXMgdGFyZ2V0XG5cblx0XHRyZXR1cm4gZmFsc2VcblxuXHR3aXRob3V0OiAodGFyZ2V0KS0+XG5cdFx0QGFycmF5XG5cdFx0XHQuZmlsdGVyIChzdGF0ZSktPiBzdGF0ZSBpc250IHRhcmdldFxuXHRcdFx0LmpvaW4gJysnXG5cblxuXHRpc0FwcGxpY2FibGU6ICh0YXJnZXQsIG90aGVyQWN0aXZlKS0+XG5cdFx0YWN0aXZlID0gQGFycmF5LmZpbHRlciAoc3RhdGUpLT5cblx0XHRcdHN0YXRlIGlzIHRhcmdldCBvclxuXHRcdFx0b3RoZXJBY3RpdmUuaW5kZXhPZihzdGF0ZSkgaXNudCAtMVxuXG5cdFx0cmV0dXJuIGFjdGl2ZS5sZW5ndGggaXMgQGFycmF5Lmxlbmd0aCJdfQ==
;
return module.exports;
},
56: function (require, module, exports) {
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
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
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
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
    while(len) {
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

// v8 likes predictible objects
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
process.version = ''; // empty string to avoid regexp issues
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

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };
;
return module.exports;
},
57: function (require, module, exports) {
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
};
return module.exports;
},
58: function (require, module, exports) {
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
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
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}
;
return module.exports;
},
59: function (require, module, exports) {
exports.arrowDown = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMwOS4xNTYgMzA5LjE1NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzA5LjE1NiAzMDkuMTU2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPGc+CgkJPHBvbHlnb24gcG9pbnRzPSIyODguNDYxLDY0LjkyOSAxNTQuNTg5LDIwMi43NjYgMjAuNzIzLDY0Ljk0IDAsODUuMDcgMTU0LjU4OSwyNDQuMjI4IDMwOS4xNTYsODUuMDcgICAiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K";

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3ZnLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLENBQUMsU0FBUixHQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMuYXJyb3dEb3duID0gXCJcIlwiXG5cdGRhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4O2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpYVhOdkxUZzROVGt0TVNJL1BnbzhJUzB0SUVkbGJtVnlZWFJ2Y2pvZ1FXUnZZbVVnU1d4c2RYTjBjbUYwYjNJZ01UZ3VNUzR4TENCVFZrY2dSWGh3YjNKMElGQnNkV2N0U1c0Z0xpQlRWa2NnVm1WeWMybHZiam9nTmk0d01DQkNkV2xzWkNBd0tTQWdMUzArQ2p4emRtY2dlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQjRiV3h1Y3pwNGJHbHVhejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TVRrNU9TOTRiR2x1YXlJZ2RtVnljMmx2YmowaU1TNHhJaUJwWkQwaVEyRndZVjh4SWlCNFBTSXdjSGdpSUhrOUlqQndlQ0lnZG1sbGQwSnZlRDBpTUNBd0lETXdPUzR4TlRZZ016QTVMakUxTmlJZ2MzUjViR1U5SW1WdVlXSnNaUzFpWVdOclozSnZkVzVrT201bGR5QXdJREFnTXpBNUxqRTFOaUF6TURrdU1UVTJPeUlnZUcxc09uTndZV05sUFNKd2NtVnpaWEoyWlNJZ2QybGtkR2c5SWpZMGNIZ2lJR2hsYVdkb2REMGlOalJ3ZUNJK0NqeG5QZ29KUEdjK0Nna0pQSEJ2YkhsbmIyNGdjRzlwYm5SelBTSXlPRGd1TkRZeExEWTBMamt5T1NBeE5UUXVOVGc1TERJd01pNDNOallnTWpBdU56SXpMRFkwTGprMElEQXNPRFV1TURjZ01UVTBMalU0T1N3eU5EUXVNakk0SURNd09TNHhOVFlzT0RVdU1EY2dJQ0FpSUdacGJHdzlJaU13TURBd01EQWlMejRLQ1R3dlp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOEwzTjJaejRLXG5cIlwiXCJcblxuIyBleHBvcnRzLmNoZWNrbWFyayA9IFwiXCJcIlxuIyBcdGRhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4O2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpYVhOdkxUZzROVGt0TVNJL1BnbzhJUzB0SUVkbGJtVnlZWFJ2Y2pvZ1FXUnZZbVVnU1d4c2RYTjBjbUYwYjNJZ01UWXVNQzR3TENCVFZrY2dSWGh3YjNKMElGQnNkV2N0U1c0Z0xpQlRWa2NnVm1WeWMybHZiam9nTmk0d01DQkNkV2xzWkNBd0tTQWdMUzArQ2p3aFJFOURWRmxRUlNCemRtY2dVRlZDVEVsRElDSXRMeTlYTTBNdkwwUlVSQ0JUVmtjZ01TNHhMeTlGVGlJZ0ltaDBkSEE2THk5M2QzY3Vkek11YjNKbkwwZHlZWEJvYVdOekwxTldSeTh4TGpFdlJGUkVMM04yWnpFeExtUjBaQ0krQ2p4emRtY2dlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQjRiV3h1Y3pwNGJHbHVhejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TVRrNU9TOTRiR2x1YXlJZ2RtVnljMmx2YmowaU1TNHhJaUJwWkQwaVEyRndZVjh4SWlCNFBTSXdjSGdpSUhrOUlqQndlQ0lnZDJsa2RHZzlJalkwY0hnaUlHaGxhV2RvZEQwaU5qUndlQ0lnZG1sbGQwSnZlRDBpTUNBd0lEWXhNaTR3TURVZ05qRXlMakF3TlNJZ2MzUjViR1U5SW1WdVlXSnNaUzFpWVdOclozSnZkVzVrT201bGR5QXdJREFnTmpFeUxqQXdOU0EyTVRJdU1EQTFPeUlnZUcxc09uTndZV05sUFNKd2NtVnpaWEoyWlNJK0NqeG5QZ29KUEdjZ2FXUTlJblJwWTJzaVBnb0pDVHhuUGdvSkNRazhjR0YwYUNCa1BTSk5OVGsxTGpZd01TdzRNUzQxTlROakxUSXhMamc1TWkweU1TNDRPVEV0TlRjdU16WXlMVEl4TGpnNU1TMDNPUzR5TlRNc01Fd3hPRE11TURNc05ERTBMamczYkMwNE9DNDJNamt0TnpZdU1UTXpJQ0FnSUNCakxUSXhMalU1TWkweU1TNDFPVE10TlRZdU5UazJMVEl4TGpVNU15MDNPQzR5TURjc01HTXRNakV1TlRreUxESXhMalU1TWkweU1TNDFPVElzTlRZdU5qRTBMREFzTnpndU1qQTJiREV6TWk0ME1USXNNVEV6TGpjek15QWdJQ0FnWXpJeExqVTVNaXd5TVM0MU9UTXNOVFl1TlRrMkxESXhMalU1TXl3M09DNHlNRGNzTUdNeUxqRTJOeTB5TGpFMk5pd3pMamszT1MwMExqVTNOaXcxTGpjeE5pMDJMams0TldNd0xqTXhOeTB3TGpJNU9Td3dMalkzTWkwd0xqVXdOU3d3TGprNUxUQXVPREEwYkRNMk1pNHdPRE10TXpZeUxqRXdNU0FnSUNBZ1F6WXhOeTQwTnpNc01UTTRMamt4TkN3Mk1UY3VORGN6TERFd015NDBNalVzTlRrMUxqWXdNU3c0TVM0MU5UTjZJaUJtYVd4c1BTSWpNREF3TURBd0lpOCtDZ2tKUEM5blBnb0pQQzluUGdvOEwyYytDanhuUGdvOEwyYytDanhuUGdvOEwyYytDanhuUGdvOEwyYytDanhuUGdvOEwyYytDanhuUGdvOEwyYytDanhuUGdvOEwyYytDanhuUGdvOEwyYytDanhuUGdvOEwyYytDanhuUGdvOEwyYytDanhuUGdvOEwyYytDanhuUGdvOEwyYytDanhuUGdvOEwyYytDanhuUGdvOEwyYytDanhuUGdvOEwyYytDanhuUGdvOEwyYytDand2YzNablBnbz1cbiMgXCJcIlwiIl19
;
return module.exports;
}
}, this);
if (typeof define === 'function' && define.umd) {
define(function () {
return require(0);
});
} else if (typeof module === 'object' && module.exports) {
module.exports = require(0);
} else {
return this['TagList'] = require(0);
}
}).call(this, null, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : this);
