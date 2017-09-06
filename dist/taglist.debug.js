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
module.exports = require(1);

module.exports.Popup = require(2);

module.exports.Tag = require(3);

module.exports.version = "2.0.0";

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsSUFBQSxDQUFLLFdBQUw7O0FBQ2pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBZixHQUF1QixJQUFBLENBQUssU0FBTDs7QUFDdkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFmLEdBQXFCLElBQUEsQ0FBSyxPQUFMOztBQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQWYsR0FBeUIsSUFBQSxDQUFLLDJCQUFMIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfJHNtKCcuL3RhZ2xpc3QnIClcbm1vZHVsZS5leHBvcnRzLlBvcHVwID0gXyRzbSgnLi9wb3B1cCcgKVxubW9kdWxlLmV4cG9ydHMuVGFnID0gXyRzbSgnLi90YWcnIClcbm1vZHVsZS5leHBvcnRzLnZlcnNpb24gPSBfJHNtKCcuLi9wYWNrYWdlLmpzb24gJCB2ZXJzaW9uJyApIl19
;
return module.exports;
},
1: function (require, module, exports) {
var DOM, Popup, Tag, TagList, defaults, extend, template;

extend = require(5);

DOM = require(6);

Tag = require(3);

Popup = require(2);

defaults = require(7);

template = require(8);

TagList = (function() {
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

  function TagList(targetContainer, tagOptions, settings) {
    var base, i, len, name, option, ref, ref1, ref2, ref3, tagOption, value;
    this.targetContainer = targetContainer;
    this.tagOptions = tagOptions != null ? tagOptions : [];
    this.settings = extend.deepOnly('button').clone(defaults, settings);
    this.settings.boundingEl = DOM(this.settings.boundingEl);
    if ((base = this.settings).defaults == null) {
      base.defaults = Object.create(null);
    }
    this.tags = [];
    this.current = Object.create(null);
    this.el = template.container.spawn((ref = this.settings.templates) != null ? ref.container : void 0, {
      relatedInstance: this
    });
    this.overlay = template.overlay.spawn((ref1 = this.settings.templates) != null ? ref1.overlay : void 0, {
      relatedInstance: this
    }).prependTo(document.body);
    this.popup = new Popup(this, this.els.addButton, null, true);
    ref2 = this.tagOptions;
    for (i = 0, len = ref2.length; i < len; i++) {
      tagOption = ref2[i];
      if (tagOption.name == null) {
        tagOption.name = tagOption.label;
      }
    }
    ref3 = this.settings.defaults;
    for (name in ref3) {
      value = ref3[name];
      if (!(value)) {
        continue;
      }
      option = this._getOptionByName(name);
      if (typeof value === 'function') {
        value = value();
      }
      this.add(option, {
        value: value
      });
    }
    this._attachBindings();
    this.el.appendTo(this.targetContainer);
  }

  TagList.prototype._attachBindings = function() {
    SimplyBind('event:click').of(this.els.addButton).to((function(_this) {
      return function() {
        return _this.popup.open();
      };
    })(this));
    SimplyBind('event:click').of(this.popup.els.button).to((function(_this) {
      return function() {
        _this.add(_this.current.tagOption, _this.current.data, _this.current.contentElement);
        return _this.popup.close().then(function() {
          return _this.selectedTag = '';
        });
      };
    })(this));
    SimplyBind('value').of(this.popup.els.selectInput.raw).to('selectedTag').of(this).bothWays().pipe((function(_this) {
      return function(selectedTag) {
        if (selectedTag) {
          _this.current.data = {
            value: null
          };
          _this.current.tagOption = _this._getOptionByName(selectedTag);
          _this.current.contentElement = DOM(_this.current.tagOption.content(_this.current.data));
          return _this.popup.els.content.empty().append(_this.current.contentElement);
        }
      };
    })(this));
    return SimplyBind('array:tags', {
      updateOnBind: false
    }).of(this).to((function(_this) {
      return function() {
        return _this._notifyChange();
      };
    })(this));
  };

  TagList.prototype._notifyChange = function() {
    var base;
    return typeof (base = this.settings).onChange === "function" ? base.onChange(this.getValues(), this) : void 0;
  };

  TagList.prototype._getOptionByName = function(name) {
    return this.tagOptions.find(function(tag) {
      return tag.name === name;
    });
  };

  TagList.prototype.destroy = function() {
    this.closeAllPopups();
    this.el.remove();
    this.overlay.remove();
  };

  TagList.prototype.addOption = function(option) {
    if (!this._getOptionByName(option.name)) {
      return this.tagOptions.push(option);
    }
  };

  TagList.prototype.add = function(option, data, popupContent) {
    var tag;
    if (typeof option === 'string') {
      option = this._getOptionByName(option);
    }
    this.tags.push(tag = new Tag(this, option, data, popupContent));
    return SimplyBind('value', {
      updateOnBind: false
    }).of(tag).to((function(_this) {
      return function() {
        return _this._notifyChange();
      };
    })(this));
  };

  TagList.prototype.remove = function(tag) {
    var tagIndex;
    if (typeof tag === 'string') {
      tag = this.tagsByName[tag];
    }
    tag.popup.close();
    tagIndex = this.tags.indexOf(tag);
    if (this.settings.requireDefaults && tag.name in this.settings.defaults) {
      tag.setValue(this.settings.defaults[tag.name]);
      this.tags.splice(tagIndex, 1, tag);
    } else {
      tag.el.remove();
      this.tags.splice(tagIndex, 1);
    }
  };

  TagList.prototype.closeAllPopups = function() {
    var i, len, ref, tag;
    this.popup.close();
    ref = this.tags;
    for (i = 0, len = ref.length; i < len; i++) {
      tag = ref[i];
      tag.popup.close();
    }
  };

  TagList.prototype.getValues = function(applyTransforms) {
    var i, len, ref, tag, values;
    if (applyTransforms == null) {
      applyTransforms = true;
    }
    values = {};
    ref = this.tags;
    for (i = 0, len = ref.length; i < len; i++) {
      tag = ref[i];
      values[tag.name] = tag.getValue(applyTransforms);
    }
    return values;
  };

  TagList.prototype.setValues = function(values) {
    var name, tags, value;
    tags = this.tagsByName;
    for (name in values) {
      value = values[name];
      if (tags[name]) {
        tags[name].setValue(value);
      } else if (this._getOptionByName(name)) {
        this.add(name, {
          value: value
        });
      }
    }
  };

  return TagList;

})();

module.exports = TagList;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2luZGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiX2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE1BQUEsR0FBUyxJQUFBLENBQUssY0FBTDs7QUFDVCxHQUFBLEdBQU0sSUFBQSxDQUFLLFVBQUw7O0FBQ04sR0FBQSxHQUFNLElBQUEsQ0FBSyxRQUFMOztBQUNOLEtBQUEsR0FBUSxJQUFBLENBQUssVUFBTDs7QUFDUixRQUFBLEdBQVcsSUFBQSxDQUFLLFlBQUw7O0FBQ1gsUUFBQSxHQUFXLElBQUEsQ0FBSyxZQUFMOztBQUVMO0VBQ0wsTUFBTSxDQUFDLGdCQUFQLENBQXdCLE9BQUMsQ0FBQSxTQUF6QixFQUNDO0lBQUEsS0FBQSxFQUFPO01BQUEsR0FBQSxFQUFLLFNBQUE7ZUFBSyxJQUFDLENBQUEsRUFBRSxDQUFDO01BQVQsQ0FBTDtLQUFQO0lBQ0EsWUFBQSxFQUFjO01BQUEsR0FBQSxFQUFLLFNBQUE7QUFDbEIsWUFBQTtRQUFBLElBQUEsR0FBTyxJQUFDLENBQUE7ZUFDUixJQUFJLFNBQUE7QUFBSyxjQUFBO0FBQUEsZUFBQSxzQ0FBQTs7WUFBQSxJQUFFLENBQUEsR0FBRyxDQUFDLElBQUosQ0FBRixHQUFjO0FBQWQ7aUJBQW1DO1FBQXhDO01BRmMsQ0FBTDtLQURkO0dBREQ7O0VBTWEsaUJBQUMsZUFBRCxFQUFtQixVQUFuQixFQUFtQyxRQUFuQztBQUNaLFFBQUE7SUFEYSxJQUFDLENBQUEsa0JBQUQ7SUFBa0IsSUFBQyxDQUFBLGtDQUFELGFBQVk7SUFDM0MsSUFBQyxDQUFBLFFBQUQsR0FBWSxNQUFNLENBQUMsUUFBUCxDQUFnQixRQUFoQixDQUF5QixDQUFDLEtBQTFCLENBQWdDLFFBQWhDLEVBQTBDLFFBQTFDO0lBQ1osSUFBQyxDQUFBLFFBQVEsQ0FBQyxVQUFWLEdBQXVCLEdBQUEsQ0FBSSxJQUFDLENBQUEsUUFBUSxDQUFDLFVBQWQ7O1VBQ2QsQ0FBQyxXQUFZLE1BQU0s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QUFOLENBQWEsUUFBYixFQUF1QixDQUF2QixFQUxEOztFQUxPOztvQkFlUixjQUFBLEdBQWdCLFNBQUE7QUFDZixRQUFBO0lBQUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFQLENBQUE7QUFDQTtBQUFBLFNBQUEscUNBQUE7O01BQUEsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFWLENBQUE7QUFBQTtFQUZlOztvQkFLaEIsU0FBQSxHQUFXLFNBQUMsZUFBRDtBQUNWLFFBQUE7O01BRFcsa0JBQWdCOztJQUMzQixNQUFBLEdBQVM7QUFDVDtBQUFBLFNBQUEscUNBQUE7O01BQ0MsTUFBTyxDQUFBLEdBQUcsQ0FBQyxJQUFKLENBQVAsR0FBbUIsR0FBRyxDQUFDLFFBQUosQ0FBYSxlQUFiO0FBRHBCO0FBRUEsV0FBTztFQUpHOztvQkFNWCxTQUFBLEdBQVcsU0FBQyxNQUFEO0FBQ1YsUUFBQTtJQUFBLElBQUEsR0FBTyxJQUFDLENBQUE7QUFDUixTQUFBLGNBQUE7O01BQ0MsSUFBRyxJQUFLLENBQUEsSUFBQSxDQUFSO1FBQ0MsSUFBSyxDQUFBLElBQUEsQ0FBSyxDQUFDLFFBQVgsQ0FBb0IsS0FBcEIsRUFERDtPQUFBLE1BR0ssSUFBRyxJQUFDLENBQUEsZ0JBQUQsQ0FBa0IsSUFBbEIsQ0FBSDtRQUNKLElBQUMsQ0FBQSxHQUFELENBQUssSUFBTCxFQUFXO1VBQUMsT0FBQSxLQUFEO1NBQVgsRUFESTs7QUFKTjtFQUZVOzs7Ozs7QUFhWixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImV4dGVuZCA9IF8kc20oJ3NtYXJ0LWV4dGVuZCcgKVxuRE9NID0gXyRzbSgncXVpY2tkb20nIClcblRhZyA9IF8kc20oJy4uL3RhZycgKVxuUG9wdXAgPSBfJHNtKCcuLi9wb3B1cCcgKVxuZGVmYXVsdHMgPSBfJHNtKCcuL2RlZmF1bHRzJyApXG50ZW1wbGF0ZSA9IF8kc20oJy4vdGVtcGxhdGUnIClcblxuY2xhc3MgVGFnTGlzdFxuXHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyBAOjosXG5cdFx0J2Vscyc6IGdldDogKCktPiBAZWwuY2hpbGRcblx0XHQndGFnc0J5TmFtZSc6IGdldDogKCktPlxuXHRcdFx0dGFncyA9IEB0YWdzXG5cdFx0XHRuZXcgKCktPiBAW3RhZy5uYW1lXSA9IHRhZyBmb3IgdGFnIGluIHRhZ3M7IEBcblx0XG5cdGNvbnN0cnVjdG9yOiAoQHRhcmdldENvbnRhaW5lciwgQHRhZ09wdGlvbnM9W10sIHNldHRpbmdzKS0+XG5cdFx0QHNldHRpbmdzID0gZXh0ZW5kLmRlZXBPbmx5KCdidXR0b24nKS5jbG9uZShkZWZhdWx0cywgc2V0dGluZ3MpXG5cdFx0QHNldHRpbmdzLmJvdW5kaW5nRWwgPSBET00oQHNldHRpbmdzLmJvdW5kaW5nRWwpXG5cdFx0QHNldHRpbmdzLmRlZmF1bHRzID89IE9iamVjdC5jcmVhdGUobnVsbClcblx0XHRAdGFncyA9IFtdXG5cdFx0QGN1cnJlbnQgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cdFx0QGVsID0gdGVtcGxhdGUuY29udGFpbmVyLnNwYXduKEBzZXR0aW5ncy50ZW1wbGF0ZXM/LmNvbnRhaW5lciwgcmVsYXRlZEluc3RhbmNlOkApXG5cdFx0QG92ZXJsYXkgPSB0ZW1wbGF0ZS5vdmVybGF5LnNwYXduKEBzZXR0aW5ncy50ZW1wbGF0ZXM/Lm92ZXJsYXksIHJlbGF0ZWRJbnN0YW5jZTpAKS5wcmVwZW5kVG8oZG9jdW1lbnQuYm9keSlcblx0XHRAcG9wdXAgPSBuZXcgUG9wdXAoQCwgQGVscy5hZGRCdXR0b24sIG51bGwsIHRydWUpXG5cblx0XHR0YWdPcHRpb24ubmFtZSA/PSB0YWdPcHRpb24ubGFiZWwgZm9yIHRhZ09wdGlvbiBpbiBAdGFnT3B0aW9uc1xuXHRcdFxuXHRcdGZvciBuYW1lLHZhbHVlIG9mIEBzZXR0aW5ncy5kZWZhdWx0cyB3aGVuIHZhbHVlXG5cdFx0XHRvcHRpb24gPSBAX2dldE9wdGlvbkJ5TmFtZShuYW1lKVxuXHRcdFx0dmFsdWUgPSB2YWx1ZSgpIGlmIHR5cGVvZiB2YWx1ZSBpcyAnZnVuY3Rpb24nXG5cdFx0XHRAYWRkKG9wdGlvbiwge3ZhbHVlfSlcblxuXHRcdEBfYXR0YWNoQmluZGluZ3MoKVxuXHRcdEBlbC5hcHBlbmRUbyhAdGFyZ2V0Q29udGFpbmVyKVxuXG5cblx0X2F0dGFjaEJpbmRpbmdzOiAoKS0+XG5cdFx0U2ltcGx5QmluZCgnZXZlbnQ6Y2xpY2snKS5vZihAZWxzLmFkZEJ1dHRvbikudG8gKCk9PlxuXHRcdFx0QHBvcHVwLm9wZW4oKVxuXG5cdFx0U2ltcGx5QmluZCgnZXZlbnQ6Y2xpY2snKS5vZihAcG9wdXAuZWxzLmJ1dHRvbikudG8gKCk9PlxuXHRcdFx0QGFkZChAY3VycmVudC50YWdPcHRpb24sIEBjdXJyZW50LmRhdGEsIEBjdXJyZW50LmNvbnRlbnRFbGVtZW50KVxuXHRcdFx0QHBvcHVwLmNsb3NlKCkudGhlbiAoKT0+IEBzZWxlY3RlZFRhZyA9ICcnXG5cblx0XHRTaW1wbHlCaW5kKCd2YWx1ZScpLm9mKEBwb3B1cC5lbHMuc2VsZWN0SW5wdXQucmF3KVxuXHRcdFx0LnRvKCdzZWxlY3RlZFRhZycpLm9mKEApLmJvdGhXYXlzKClcblx0XHRcdC5waXBlIChzZWxlY3RlZFRhZyk9PiBpZiBzZWxlY3RlZFRhZ1xuXHRcdFx0XHRAY3VycmVudC5kYXRhID0ge3ZhbHVlOm51bGx9XG5cdFx0XHRcdEBjdXJyZW50LnRhZ09wdGlvbiA9IEBfZ2V0T3B0aW9uQnlOYW1lKHNlbGVjdGVkVGFnKVxuXHRcdFx0XHRAY3VycmVudC5jb250ZW50RWxlbWVudCA9IERPTShAY3VycmVudC50YWdPcHRpb24uY29udGVudChAY3VycmVudC5kYXRhKSlcblx0XHRcdFx0QHBvcHVwLmVscy5jb250ZW50LmVtcHR5KCkuYXBwZW5kKEBjdXJyZW50LmNvbnRlbnRFbGVtZW50KVxuXG5cdFx0U2ltcGx5QmluZCgnYXJyYXk6dGFncycsIHVwZGF0ZU9uQmluZDpmYWxzZSkub2YoQCkudG8gKCk9PiBAX25vdGlmeUNoYW5nZSgpXG5cblxuXHRfbm90aWZ5Q2hhbmdlOiAoKS0+XG5cdFx0QHNldHRpbmdzLm9uQ2hhbmdlPyhAZ2V0VmFsdWVzKCksIEApXG5cblx0X2dldE9wdGlvbkJ5TmFtZTogKG5hbWUpLT5cblx0XHRyZXR1cm4gQHRhZ09wdGlvbnMuZmluZCAodGFnKS0+IHRhZy5uYW1lIGlzIG5hbWVcblxuXHRkZXN0cm95OiAoKS0+XG5cdFx0QGNsb3NlQWxsUG9wdXBzKClcblx0XHRAZWwucmVtb3ZlKClcblx0XHRAb3ZlcmxheS5yZW1vdmUoKVxuXHRcdHJldHVyblxuXG5cdGFkZE9wdGlvbjogKG9wdGlvbiktPlxuXHRcdHVubGVzcyBAX2dldE9wdGlvbkJ5TmFtZShvcHRpb24ubmFtZSlcblx0XHRcdEB0YWdPcHRpb25zLnB1c2gob3B0aW9uKVxuXG5cdGFkZDogKG9wdGlvbiwgZGF0YSwgcG9wdXBDb250ZW50KS0+XG5cdFx0b3B0aW9uID0gQF9nZXRPcHRpb25CeU5hbWUob3B0aW9uKSBpZiB0eXBlb2Ygb3B0aW9uIGlzICdzdHJpbmcnXG5cdFx0QHRhZ3MucHVzaCB0YWcgPSBuZXcgVGFnKEAsIG9wdGlvbiwgZGF0YSwgcG9wdXBDb250ZW50KVxuXHRcdFxuXHRcdFNpbXBseUJpbmQoJ3ZhbHVlJywgdXBkYXRlT25CaW5kOmZhbHNlKS5vZih0YWcpXG5cdFx0XHQudG8gKCk9PiBAX25vdGlmeUNoYW5nZSgpXG5cblx0cmVtb3ZlOiAodGFnKS0+XG5cdFx0dGFnID0gQHRhZ3NCeU5hbWVbdGFnXSBpZiB0eXBlb2YgdGFnIGlzICdzdHJpbmcnXG5cdFx0dGFnLnBvcHVwLmNsb3NlKClcblx0XHR0YWdJbmRleCA9IEB0YWdzLmluZGV4T2YodGFnKVxuXG5cdFx0aWYgQHNldHRpbmdzLnJlcXVpcmVEZWZhdWx0cyBhbmQgdGFnLm5hbWUgb2YgQHNldHRpbmdzLmRlZmF1bHRzXG5cdFx0XHR0YWcuc2V0VmFsdWUoQHNldHRpbmdzLmRlZmF1bHRzW3RhZy5uYW1lXSlcblx0XHRcdEB0YWdzLnNwbGljZSB0YWdJbmRleCwgMSwgdGFnXG5cdFx0ZWxzZVxuXHRcdFx0dGFnLmVsLnJlbW92ZSgpXG5cdFx0XHRAdGFncy5zcGxpY2UgdGFnSW5kZXgsIDFcblxuXHRcdHJldHVyblxuXG5cblx0Y2xvc2VBbGxQb3B1cHM6ICgpLT5cblx0XHRAcG9wdXAuY2xvc2UoKVxuXHRcdHRhZy5wb3B1cC5jbG9zZSgpIGZvciB0YWcgaW4gQHRhZ3Ncblx0XHRyZXR1cm5cblxuXHRnZXRWYWx1ZXM6IChhcHBseVRyYW5zZm9ybXM9dHJ1ZSktPlxuXHRcdHZhbHVlcyA9IHt9XG5cdFx0Zm9yIHRhZyBpbiBAdGFnc1xuXHRcdFx0dmFsdWVzW3RhZy5uYW1lXSA9IHRhZy5nZXRWYWx1ZShhcHBseVRyYW5zZm9ybXMpXG5cdFx0cmV0dXJuIHZhbHVlc1xuXG5cdHNldFZhbHVlczogKHZhbHVlcyktPlxuXHRcdHRhZ3MgPSBAdGFnc0J5TmFtZVxuXHRcdGZvciBuYW1lLHZhbHVlIG9mIHZhbHVlc1xuXHRcdFx0aWYgdGFnc1tuYW1lXVxuXHRcdFx0XHR0YWdzW25hbWVdLnNldFZhbHVlKHZhbHVlKVxuXHRcdFx0XG5cdFx0XHRlbHNlIGlmIEBfZ2V0T3B0aW9uQnlOYW1lKG5hbWUpXG5cdFx0XHRcdEBhZGQobmFtZSwge3ZhbHVlfSlcblx0XHRcblx0XHRyZXR1cm5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gVGFnTGlzdCJdfQ==
;
return module.exports;
},
2: function (require, module, exports) {
var DOM, Popup, defaults, extend, helpers, template;

DOM = require(6);

extend = require(5);

defaults = require(9);

template = require(10);

helpers = require(11);

Popup = (function() {
  Object.defineProperties(Popup.prototype, {
    'els': {
      get: function() {
        return this.el.child;
      }
    }
  });

  function Popup(list, parent, settings, hasSelect) {
    var ref, ref1, ref2, refreshChildren;
    this.list = list;
    this.parent = parent;
    this.hasSelect = hasSelect;
    this.settings = extend.clone(defaults, this.list.settings.popup, settings);
    this.state = {
      open: false,
      offset: {
        x: 0,
        y: 0,
        scale: 0
      }
    };
    this.el = template.container.spawn((ref = this.settings.templates) != null ? ref.container : void 0, {
      relatedInstance: this
    });
    if (this.hasSelect) {
      template.select.spawn((ref1 = this.settings.templates) != null ? ref1.select : void 0, {
        relatedInstance: this
      }).insertBefore(this.els.content);
      template.button.spawn((ref2 = this.settings.templates) != null ? ref2.button : void 0, {
        relatedInstance: this
      }).appendTo(this.el);
      refreshChildren = this.el.childf;
    }
    this._attachBindings();
    this.el.appendTo(this.parent);
  }

  Popup.prototype._attachBindings = function() {
    var isOpen;
    isOpen = (function(_this) {
      return function() {
        return _this.state.open;
      };
    })(this);
    SimplyBind('windowScrollY', {
      updateOnBind: false
    }).of(Popup).to((function(_this) {
      return function(newScroll, prevScroll) {
        return _this.resetYPosition(newScroll, prevScroll);
      };
    })(this)).condition(isOpen);
    SimplyBind('windowScrollX', {
      updateOnBind: false
    }).of(Popup).to((function(_this) {
      return function(newScroll, prevScroll) {
        return _this.resetXPosition(newScroll, prevScroll);
      };
    })(this)).condition(isOpen);
    SimplyBind('windowWidth', {
      updateOnBind: false
    }).of(Popup).to((function(_this) {
      return function(newWidth, prevWidth) {
        return _this.resetWidth(newWidth, prevWidth);
      };
    })(this)).condition(isOpen);
    SimplyBind('offset').of(this.state).to((function(_this) {
      return function(offset) {
        return _this.el.style('transform', "translate(" + offset.x + "px, " + offset.y + "px) scale(" + offset.scale + ")");
      };
    })(this));
    SimplyBind('event:click').of(this.list.overlay).to((function(_this) {
      return function() {
        return _this.close();
      };
    })(this));
    if (!this.hasSelect) {
      return SimplyBind('open').of(this.state).to((function(_this) {
        return function(open) {
          return _this.el.state('hasContent', open);
        };
      })(this));
    } else {
      SimplyBind('array:tags').of(this.list).to((function(_this) {
        return function() {
          var i, len, option, prevOptions, ref, usedTags;
          prevOptions = _this.els.selectInput.children.slice(1);
          if (prevOptions.length) {
            DOM.batch(prevOptions).remove();
          }
          usedTags = _this.list.tagsByName;
          ref = _this.list.tagOptions;
          for (i = 0, len = ref.length; i < len; i++) {
            option = ref[i];
            if (!usedTags[option.name]) {
              DOM.option({
                props: {
                  value: option.name
                }
              }, option.label).appendTo(_this.els.selectInput);
            }
          }
        };
      })(this));
      return SimplyBind('value').of(this.els.selectInput.raw).to('innerHTML').of(this.els.selectFake.raw).transform((function(_this) {
        return function() {
          return _this.els.selectInput.label;
        };
      })(this)).and.to((function(_this) {
        return function(selectedOption) {
          return _this.el.state('hasContent', selectedOption);
        };
      })(this));
    }
  };

  Popup.prototype.open = function() {
    return new Promise((function(_this) {
      return function(resolve) {
        var DIMENSIONS, boundingElDimensions, centerDiff, parentDimensions, targetDimensions, windowWidth;
        if (_this.state.open) {
          return resolve();
        }
        _this.list.closeAllPopups();
        _this.state.open = true;
        boundingElDimensions = helpers.getElDimensions(_this.list.settings.boundingEl);
        DIMENSIONS = helpers.getDefaultDimensions(boundingElDimensions);
        windowWidth = Popup.windowWidth - DIMENSIONS.leftPadding - DIMENSIONS.rightPadding;
        parentDimensions = helpers.getElDimensions(_this.parent, DIMENSIONS.leftPadding);
        targetDimensions = {
          'y': parentDimensions.y + parentDimensions.height + DIMENSIONS.offset
        };
        if (windowWidth > _this.settings.maxWidth + (DIMENSIONS.leftPadding + DIMENSIONS.rightPadding)) {
          targetDimensions.width = _this.settings.maxWidth;
        } else {
          targetDimensions.width = windowWidth - (DIMENSIONS.leftPadding + DIMENSIONS.rightPadding);
          targetDimensions.x = DIMENSIONS.leftPadding;
        }
        if (!targetDimensions.x) {
          targetDimensions.x = parentDimensions.centerLeft - targetDimensions.width / 2;
          if (targetDimensions.x < DIMENSIONS.leftPadding) {
            targetDimensions.x = DIMENSIONS.leftPadding;
          } else if (targetDimensions.x + targetDimensions.width + DIMENSIONS.rightPadding > windowWidth) {
            targetDimensions.x = windowWidth - targetDimensions.width;
          }
        }
        centerDiff = parentDimensions.centerLeft - (targetDimensions.x + targetDimensions.width / 2);
        targetDimensions.scaleOrigin = targetDimensions.width / 2 + centerDiff;
        _this.el.insertAfter(_this.list.overlay);
        return setTimeout(function() {
          _this.list.overlay.state('isRevealed', true);
          _this.el.state('animating', true).style({
            top: targetDimensions.y + "px",
            left: targetDimensions.x + "px",
            width: targetDimensions.width + "px",
            transformOrigin: targetDimensions.scaleOrigin + "px 0% 0px",
            opacity: 1
          });
          _this.state.offset = {
            x: 0,
            y: 0,
            scale: 1
          };
          return setTimeout(function() {
            return resolve(_this.el.state('animating', false));
          }, _this.settings.animationSpeed + 25);
        }, 50);
      };
    })(this));
  };

  Popup.prototype.close = function() {
    var animation;
    return animation = new Promise((function(_this) {
      return function(resolve) {
        if (!_this.state.open) {
          return resolve();
        }
        _this.state.open = false;
        _this.list.overlay.state('isRevealed', false);
        _this.el.style('opacity', null);
        _this.state.offset = extend.clone(_this.state.offset, {
          scale: 0
        });
        return setTimeout(function() {
          return resolve(_this.el.appendTo(_this.parent));
        }, _this.list.settings.animationSpeed + 25);
      };
    })(this));
  };

  Popup.prototype.resetYPosition = function(newScrollY, prevScrollY) {
    var yChange;
    if (prevScrollY == null) {
      prevScrollY = 0;
    }
    yChange = newScrollY - prevScrollY;
    return this.state.offset = extend.clone(this.state.offset, {
      y: this.state.offset.y - yChange
    });
  };

  Popup.prototype.resetXPosition = function(newScrollX, prevScrollX) {
    var xChange;
    if (prevScrollX == null) {
      prevScrollX = 0;
    }
    xChange = newScrollX + prevScrollX;
    return this.state.offset = extend.clone(this.state.offset, {
      x: this.state.offset.x - xChange
    });
  };

  Popup.prototype.resetWidth = function(newWidth) {
    var DIMENSIONS, boundingElDimensions, windowWidth;
    boundingElDimensions = helpers.getElDimensions(this.list.settings.boundingEl);
    DIMENSIONS = helpers.getDefaultDimensions(boundingElDimensions);
    windowWidth = Popup.windowWidth - DIMENSIONS.leftPadding - DIMENSIONS.rightPadding;
    if (windowWidth > this.settings.maxWidth + (DIMENSIONS.leftPadding + DIMENSIONS.rightPadding)) {
      return this.el.width = this.settings.maxWidth;
    } else {
      return this.el.width = windowWidth - (DIMENSIONS.leftPadding + DIMENSIONS.rightPadding);
    }
  };

  return Popup;

})();

SimplyBind(function() {
  Popup.windowScrollY = window.scrollY;
  return Popup.windowScrollX = window.scrollX;
}).updateOn('event:scroll').of(window);

SimplyBind(function() {
  Popup.windowHeight = window.innerHeight;
  return Popup.windowWidth = window.innerWidth;
}).updateOn('event:resize').of(window);

module.exports = Popup;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2luZGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiX2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLEdBQUEsR0FBTSxJQUFBLENBQUssVUFBTDs7QUFDTixNQUFBLEdBQVMsSUFBQSxDQUFLLGNBQUw7O0FBQ1QsUUFBQSxHQUFXLElBQUEsQ0FBSyxZQUFMOztBQUNYLFFBQUEsR0FBVyxJQUFBLENBQUssWUFBTDs7QUFDWCxPQUFBLEdBQVUsSUFBQSxDQUFLLFlBQUw7O0FBRUo7RUFDTCxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsS0FBQyxDQUFBLFNBQXpCLEVBQ0M7SUFBQSxLQUFBLEVBQU87TUFBQSxHQUFBLEVBQUssU0FBQTtlQUFLLElBQUMsQ0FBQSxFQUFFLENBQUM7TUFBVCxDQUFMO0tBQVA7R0FERDs7RUFHYSxlQUFDLElBQUQsRUFBUSxNQUFSLEVBQWlCLFFBQWpCLEVBQTJCLFNBQTNCO0FBQ1osUUFBQTtJQURhLElBQUMsQ0FBQSxPQUFEO0lBQU8sSUFBQyxDQUFBLFNBQUQ7SUFBbUIsSUFBQyxDQUFBLFlBQUQ7SUFDdkMsSUFBQyxDQUFBLFFBQUQsR0FBWSxNQUFNLENBQUMsS0FBUCxDQUFhLFFBQWIsRUFBdUIsSUFBQyxDQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBdEMsRUFBNkMsUUFBN0M7SUFDWixJQUFDLENBQUEsS0FBRCxHQUFTO01BQUEsSUFBQSxFQUFLLEtBQUw7TUFBWSxNQUFBLEVBQU87UUFBQyxDQUFBLEVBQUUsQ0FBSDtRQUFNLENBQUEsRUFBRSxDQUFSO1FBQVcsS0FBQSxFQUFNLENBQWpCO09BQW5COztJQUNULElBQUMsQ0FBQSxFQUFELEdBQU0sUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFuQiw4Q0FBNEMsQ0FBRSxrQkFBOUMsRUFBeUQ7TUFBQyxlQUFBLEVBQWdCLElBQWpCO0tBQXpEO0lBRU4sSUFBRyxJQUFDLENBQUEsU0FBSjtNQUNDLFFBQVEsQ0FBQyxNQUFN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QUF2QztJQUN2QixVQUFBLEdBQWEsT0FBTyxDQUFDLG9CQUFSLENBQTZCLG9CQUE3QjtJQUNiLFdBQUEsR0FBYyxLQUFLLENBQUMsV0FBTixHQUFvQixVQUFVLENBQUMsV0FBL0IsR0FBNkMsVUFBVSxDQUFDO0lBRXRFLElBQUcsV0FBQSxHQUFjLElBQUMsQ0FBQSxRQUFRLENBQUMsUUFBVixHQUFtQixDQUFDLFVBQVUsQ0FBQyxXQUFYLEdBQXVCLFVBQVUsQ0FBQyxZQUFuQyxDQUFwQzthQUNDLElBQUMsQ0FBQSxFQUFFLENBQUMsS0FBSixHQUFZLElBQUMsQ0FBQSxRQUFRLENBQUMsU0FEdkI7S0FBQSxNQUFBO2FBR0MsSUFBQyxDQUFBLEVBQUUsQ0FBQyxLQUFKLEdBQVksV0FBQSxHQUFZLENBQUMsVUFBVSxDQUFDLFdBQVgsR0FBdUIsVUFBVSxDQUFDLFlBQW5DLEVBSHpCOztFQUxXOzs7Ozs7QUFhYixVQUFBLENBQVcsU0FBQTtFQUNWLEtBQUssQ0FBQyxhQUFOLEdBQXNCLE1BQU0sQ0FBQztTQUM3QixLQUFLLENBQUMsYUFBTixHQUFzQixNQUFNLENBQUM7QUFGbkIsQ0FBWCxDQUdDLENBQUMsUUFIRixDQUdXLGNBSFgsQ0FHMEIsQ0FBQyxFQUgzQixDQUc4QixNQUg5Qjs7QUFNQSxVQUFBLENBQVcsU0FBQTtFQUNWLEtBQUssQ0FBQyxZQUFOLEdBQXFCLE1BQU0sQ0FBQztTQUM1QixLQUFLLENBQUMsV0FBTixHQUFvQixNQUFNLENBQUM7QUFGakIsQ0FBWCxDQUdDLENBQUMsUUFIRixDQUdXLGNBSFgsQ0FHMEIsQ0FBQyxFQUgzQixDQUc4QixNQUg5Qjs7QUFZQSxNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkRPTSA9IF8kc20oJ3F1aWNrZG9tJyApXG5leHRlbmQgPSBfJHNtKCdzbWFydC1leHRlbmQnIClcbmRlZmF1bHRzID0gXyRzbSgnLi9kZWZhdWx0cycgKVxudGVtcGxhdGUgPSBfJHNtKCcuL3RlbXBsYXRlJyApXG5oZWxwZXJzID0gXyRzbSgnLi4vaGVscGVycycgKVxuXG5jbGFzcyBQb3B1cFxuXHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyBAOjosXG5cdFx0J2Vscyc6IGdldDogKCktPiBAZWwuY2hpbGRcblx0XG5cdGNvbnN0cnVjdG9yOiAoQGxpc3QsIEBwYXJlbnQsIHNldHRpbmdzLCBAaGFzU2VsZWN0KS0+XG5cdFx0QHNldHRpbmdzID0gZXh0ZW5kLmNsb25lKGRlZmF1bHRzLCBAbGlzdC5zZXR0aW5ncy5wb3B1cCwgc2V0dGluZ3MpXG5cdFx0QHN0YXRlID0gb3BlbjpmYWxzZSwgb2Zmc2V0Ont4OjAsIHk6MCwgc2NhbGU6MH1cblx0XHRAZWwgPSB0ZW1wbGF0ZS5jb250YWluZXIuc3Bhd24oQHNldHRpbmdzLnRlbXBsYXRlcz8uY29udGFpbmVyLCB7cmVsYXRlZEluc3RhbmNlOkB9KVxuXG5cdFx0aWYgQGhhc1NlbGVjdFxuXHRcdFx0dGVtcGxhdGUuc2VsZWN0LnNwYXduKEBzZXR0aW5ncy50ZW1wbGF0ZXM/LnNlbGVjdCwge3JlbGF0ZWRJbnN0YW5jZTpAfSkuaW5zZXJ0QmVmb3JlKEBlbHMuY29udGVudClcblx0XHRcdHRlbXBsYXRlLmJ1dHRvbi5zcGF3bihAc2V0dGluZ3MudGVtcGxhdGVzPy5idXR0b24sIHtyZWxhdGVkSW5zdGFuY2U6QH0pLmFwcGVuZFRvKEBlbClcblx0XHRcdHJlZnJlc2hDaGlsZHJlbiA9IEBlbC5jaGlsZGZcblxuXHRcdEBfYXR0YWNoQmluZGluZ3MoKVxuXHRcdEBlbC5hcHBlbmRUbyhAcGFyZW50KVxuXG5cblx0X2F0dGFjaEJpbmRpbmdzOiAoKS0+XG5cdFx0aXNPcGVuID0gKCk9PiBAc3RhdGUub3BlblxuXHRcdFxuXHRcdFNpbXBseUJpbmQoJ3dpbmRvd1Njcm9sbFknLCB1cGRhdGVPbkJpbmQ6ZmFsc2UpLm9mKFBvcHVwKVxuXHRcdFx0LnRvIChuZXdTY3JvbGwsIHByZXZTY3JvbGwpPT4gQHJlc2V0WVBvc2l0aW9uKG5ld1Njcm9sbCwgcHJldlNjcm9sbClcblx0XHRcdC5jb25kaXRpb24oaXNPcGVuKVxuXHRcdFxuXHRcdFNpbXBseUJpbmQoJ3dpbmRvd1Njcm9sbFgnLCB1cGRhdGVPbkJpbmQ6ZmFsc2UpLm9mKFBvcHVwKVxuXHRcdFx0LnRvIChuZXdTY3JvbGwsIHByZXZTY3JvbGwpPT4gQHJlc2V0WFBvc2l0aW9uKG5ld1Njcm9sbCwgcHJldlNjcm9sbClcblx0XHRcdC5jb25kaXRpb24oaXNPcGVuKVxuXHRcdFxuXHRcdFNpbXBseUJpbmQoJ3dpbmRvd1dpZHRoJywgdXBkYXRlT25CaW5kOmZhbHNlKS5vZihQb3B1cClcblx0XHRcdC50byAobmV3V2lkdGgsIHByZXZXaWR0aCk9PiBAcmVzZXRXaWR0aChuZXdXaWR0aCwgcHJldldpZHRoKVxuXHRcdFx0LmNvbmRpdGlvbihpc09wZW4pXG5cblx0XHRTaW1wbHlCaW5kKCdvZmZzZXQnKS5vZihAc3RhdGUpXG5cdFx0XHQudG8gKG9mZnNldCk9PiBAZWwuc3R5bGUgJ3RyYW5zZm9ybScsIFwidHJhbnNsYXRlKCN7b2Zmc2V0Lnh9cHgsICN7b2Zmc2V0Lnl9cHgpIHNjYWxlKCN7b2Zmc2V0LnNjYWxlfSlcIlxuXG5cdFx0U2ltcGx5QmluZCgnZXZlbnQ6Y2xpY2snKS5vZihAbGlzdC5vdmVybGF5KVxuXHRcdFx0LnRvICgpPT4gQGNsb3NlKClcblxuXHRcdGlmIG5vdCBAaGFzU2VsZWN0XG5cdFx0XHRTaW1wbHlCaW5kKCdvcGVuJykub2YoQHN0YXRlKVxuXHRcdFx0XHQudG8gKG9wZW4pPT4gQGVsLnN0YXRlICdoYXNDb250ZW50Jywgb3BlblxuXHRcdGVsc2Vcblx0XHRcdFNpbXBseUJpbmQoJ2FycmF5OnRhZ3MnKS5vZihAbGlzdCkudG8gKCk9PlxuXHRcdFx0XHRwcmV2T3B0aW9ucyA9IEBlbHMuc2VsZWN0SW5wdXQuY2hpbGRyZW4uc2xpY2UoMSlcblx0XHRcdFx0RE9NLmJhdGNoKHByZXZPcHRpb25zKS5yZW1vdmUoKSBpZiBwcmV2T3B0aW9ucy5sZW5ndGhcblx0XHRcdFx0dXNlZFRhZ3MgPSBAbGlzdC50YWdzQnlOYW1lXG5cdFx0XHRcdFxuXHRcdFx0XHRmb3Igb3B0aW9uIGluIEBsaXN0LnRhZ09wdGlvbnMgd2hlbiBub3QgdXNlZFRhZ3Nbb3B0aW9uLm5hbWVdXG5cdFx0XHRcdFx0RE9NLm9wdGlvbih7cHJvcHM6dmFsdWU6b3B0aW9uLm5hbWV9LCBvcHRpb24ubGFiZWwpLmFwcGVuZFRvKEBlbHMuc2VsZWN0SW5wdXQpXG5cdFx0XHRcdHJldHVyblxuXG5cdFx0XHRTaW1wbHlCaW5kKCd2YWx1ZScpLm9mKEBlbHMuc2VsZWN0SW5wdXQucmF3KVxuXHRcdFx0XHQudG8oJ2lubmVySFRNTCcpLm9mKEBlbHMuc2VsZWN0RmFrZS5yYXcpXG5cdFx0XHRcdFx0LnRyYW5zZm9ybSAoKT0+IEBlbHMuc2VsZWN0SW5wdXQubGFiZWxcblx0XHRcdFx0LmFuZC50byAoc2VsZWN0ZWRPcHRpb24pPT5cblx0XHRcdFx0XHRAZWwuc3RhdGUgJ2hhc0NvbnRlbnQnLCBzZWxlY3RlZE9wdGlvblxuXG5cblxuXHRvcGVuOiAoKS0+IG5ldyBQcm9taXNlIChyZXNvbHZlKT0+XG5cdFx0cmV0dXJuIHJlc29sdmUoKSBpZiBAc3RhdGUub3BlblxuXHRcdEBsaXN0LmNsb3NlQWxsUG9wdXBzKClcblx0XHRAc3RhdGUub3BlbiA9IHRydWVcblxuXHRcdGJvdW5kaW5nRWxEaW1lbnNpb25zID0gaGVscGVycy5nZXRFbERpbWVuc2lvbnMoQGxpc3Quc2V0dGluZ3MuYm91bmRpbmdFbClcblx0XHRESU1FTlNJT05TID0gaGVscGVycy5nZXREZWZhdWx0RGltZW5zaW9ucyhib3VuZGluZ0VsRGltZW5zaW9ucylcblx0XHR3aW5kb3dXaWR0aCA9IFBvcHVwLndpbmRvd1dpZHRoIC0gRElNRU5TSU9OUy5sZWZ0UGFkZGluZyAtIERJTUVOU0lPTlMucmlnaHRQYWRkaW5nXG5cdFx0cGFyZW50RGltZW5zaW9ucyA9IGhlbHBlcnMuZ2V0RWxEaW1lbnNpb25zKEBwYXJlbnQsIERJTUVOU0lPTlMubGVmdFBhZGRpbmcpXG5cdFx0dGFyZ2V0RGltZW5zaW9ucyA9ICd5JzogcGFyZW50RGltZW5zaW9ucy55K3BhcmVudERpbWVuc2lvbnMuaGVpZ2h0K0RJTUVOU0lPTlMub2Zmc2V0XG5cdFx0XG5cblx0XHRpZiB3aW5kb3dXaWR0aCA+IEBzZXR0aW5ncy5tYXhXaWR0aCsoRElNRU5TSU9OUy5sZWZ0UGFkZGluZytESU1FTlNJT05TLnJpZ2h0UGFkZGluZylcblx0XHRcdHRhcmdldERpbWVuc2lvbnMud2lkdGggPSBAc2V0dGluZ3MubWF4V2lkdGhcblx0XHRlbHNlXG5cdFx0XHR0YXJnZXREaW1lbnNpb25zLndpZHRoID0gd2luZG93V2lkdGgtKERJTUVOU0lPTlMubGVmdFBhZGRpbmcrRElNRU5TSU9OUy5yaWdodFBhZGRpbmcpXG5cdFx0XHR0YXJnZXREaW1lbnNpb25zLnggPSBESU1FTlNJT05TLmxlZnRQYWRkaW5nXG5cblx0XHRcblx0XHRpZiBub3QgdGFyZ2V0RGltZW5zaW9ucy54ICMgaWYgeCB3YXNuJ3QgZGVmaW5lZCB5ZXRcblx0XHRcdHRhcmdldERpbWVuc2lvbnMueCA9IChwYXJlbnREaW1lbnNpb25zLmNlbnRlckxlZnQgLSB0YXJnZXREaW1lbnNpb25zLndpZHRoLzIpXG5cblx0XHRcdGlmIHRhcmdldERpbWVuc2lvbnMueCA8IERJTUVOU0lPTlMubGVmdFBhZGRpbmcgIyBJZiBpcyBvdmVyZmxvd2luZyBsZWZ0IHNpZGUgb2Ygd2luZG93XG5cdFx0XHRcdHRhcmdldERpbWVuc2lvbnMueCA9IERJTUVOU0lPTlMubGVmdFBhZGRpbmdcblxuXHRcdFx0ZWxzZSBpZiB0YXJnZXREaW1lbnNpb25zLnggKyB0YXJnZXREaW1lbnNpb25zLndpZHRoICsgRElNRU5TSU9OUy5yaWdodFBhZGRpbmcgPiB3aW5kb3dXaWR0aCAjIElmIGlzIG92ZXJmbG93aW5nIHJpZ2h0IHNpZGUgb2Ygd2luZG93XG5cdFx0XHRcdHRhcmdldERpbWVuc2lvbnMueCA9IHdpbmRvd1dpZHRoIC0gdGFyZ2V0RGltZW5zaW9ucy53aWR0aFxuXG5cblx0XHRjZW50ZXJEaWZmID0gcGFyZW50RGltZW5zaW9ucy5jZW50ZXJMZWZ0IC0gKHRhcmdldERpbWVuc2lvbnMueCArIHRhcmdldERpbWVuc2lvbnMud2lkdGgvMilcblx0XHR0YXJnZXREaW1lbnNpb25zLnNjYWxlT3JpZ2luID0gdGFyZ2V0RGltZW5zaW9ucy53aWR0aC8yICsgY2VudGVyRGlmZlxuXHRcdFxuXG5cdFx0QGVsLmluc2VydEFmdGVyKEBsaXN0Lm92ZXJsYXkpXG5cdFx0c2V0VGltZW91dCAoKT0+XG5cdFx0XHRAbGlzdC5vdmVybGF5LnN0YXRlICdpc1JldmVhbGVkJywgb25cblx0XHRcdEBlbC5zdGF0ZSgnYW5pbWF0aW5nJyxvbikuc3R5bGVcblx0XHRcdFx0dG9wOiBcIiN7dGFyZ2V0RGltZW5zaW9ucy55fXB4XCJcblx0XHRcdFx0bGVmdDogXCIje3RhcmdldERpbWVuc2lvbnMueH1weFwiXG5cdFx0XHRcdHdpZHRoOiBcIiN7dGFyZ2V0RGltZW5zaW9ucy53aWR0aH1weFwiXG5cdFx0XHRcdHRyYW5zZm9ybU9yaWdpbjogXCIje3RhcmdldERpbWVuc2lvbnMuc2NhbGVPcmlnaW59cHggMCUgMHB4XCJcblx0XHRcdFx0b3BhY2l0eTogMVxuXG5cdFx0XHRAc3RhdGUub2Zmc2V0ID0geDowLCB5OjAsIHNjYWxlOjFcblx0XHRcdHNldFRpbWVvdXQgKCk9PlxuXHRcdFx0XHRyZXNvbHZlIEBlbC5zdGF0ZSgnYW5pbWF0aW5nJyxvZmYpXG5cdFx0XHQsIEBzZXR0aW5ncy5hbmltYXRpb25TcGVlZCsyNVxuXHRcdCwgNTBcblxuXG5cblxuXG5cblx0Y2xvc2U6ICgpLT4gYW5pbWF0aW9uID0gbmV3IFByb21pc2UgKHJlc29sdmUpPT5cblx0XHRyZXR1cm4gcmVzb2x2ZSgpIGlmIG5vdCBAc3RhdGUub3BlblxuXHRcdEBzdGF0ZS5vcGVuID0gZmFsc2Vcblx0XHRAbGlzdC5vdmVybGF5LnN0YXRlICdpc1JldmVhbGVkJywgb2ZmXG5cdFx0QGVsLnN0eWxlICdvcGFjaXR5JywgbnVsbFxuXHRcdEBzdGF0ZS5vZmZzZXQgPSBleHRlbmQuY2xvbmUoQHN0YXRlLm9mZnNldCwge3NjYWxlOjB9KVxuXG5cdFx0c2V0VGltZW91dCAoKT0+XG5cdFx0XHRyZXNvbHZlKEBlbC5hcHBlbmRUbyhAcGFyZW50KSlcblx0XHQsIEBsaXN0LnNldHRpbmdzLmFuaW1hdGlvblNwZWVkKzI1XG5cblxuXG5cdHJlc2V0WVBvc2l0aW9uOiAobmV3U2Nyb2xsWSwgcHJldlNjcm9sbFk9MCktPlxuXHRcdHlDaGFuZ2UgPSBuZXdTY3JvbGxZLXByZXZTY3JvbGxZXG5cdFx0QHN0YXRlLm9mZnNldCA9IGV4dGVuZC5jbG9uZShAc3RhdGUub2Zmc2V0LCB5OkBzdGF0ZS5vZmZzZXQueS15Q2hhbmdlKVxuXG5cblx0cmVzZXRYUG9zaXRpb246IChuZXdTY3JvbGxYLCBwcmV2U2Nyb2xsWD0wKS0+XG5cdFx0eENoYW5nZSA9IG5ld1Njcm9sbFgrcHJldlNjcm9sbFhcblx0XHRAc3RhdGUub2Zmc2V0ID0gZXh0ZW5kLmNsb25lKEBzdGF0ZS5vZmZzZXQsIHg6QHN0YXRlLm9mZnNldC54LXhDaGFuZ2UpXG5cblxuXG5cdHJlc2V0V2lkdGg6IChuZXdXaWR0aCktPlxuXHRcdGJvdW5kaW5nRWxEaW1lbnNpb25zID0gaGVscGVycy5nZXRFbERpbWVuc2lvbnMoQGxpc3Quc2V0dGluZ3MuYm91bmRpbmdFbClcblx0XHRESU1FTlNJT05TID0gaGVscGVycy5nZXREZWZhdWx0RGltZW5zaW9ucyhib3VuZGluZ0VsRGltZW5zaW9ucylcblx0XHR3aW5kb3dXaWR0aCA9IFBvcHVwLndpbmRvd1dpZHRoIC0gRElNRU5TSU9OUy5sZWZ0UGFkZGluZyAtIERJTUVOU0lPTlMucmlnaHRQYWRkaW5nXG5cdFx0XG5cdFx0aWYgd2luZG93V2lkdGggPiBAc2V0dGluZ3MubWF4V2lkdGgrKERJTUVOU0lPTlMubGVmdFBhZGRpbmcrRElNRU5TSU9OUy5yaWdodFBhZGRpbmcpXG5cdFx0XHRAZWwud2lkdGggPSBAc2V0dGluZ3MubWF4V2lkdGhcblx0XHRlbHNlXG5cdFx0XHRAZWwud2lkdGggPSB3aW5kb3dXaWR0aC0oRElNRU5TSU9OUy5sZWZ0UGFkZGluZytESU1FTlNJT05TLnJpZ2h0UGFkZGluZylcblxuXG5cblxuU2ltcGx5QmluZCgoKS0+XG5cdFBvcHVwLndpbmRvd1Njcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWVxuXHRQb3B1cC53aW5kb3dTY3JvbGxYID0gd2luZG93LnNjcm9sbFhcbikudXBkYXRlT24oJ2V2ZW50OnNjcm9sbCcpLm9mKHdpbmRvdylcblxuXG5TaW1wbHlCaW5kKCgpLT5cblx0UG9wdXAud2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG5cdFBvcHVwLndpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbikudXBkYXRlT24oJ2V2ZW50OnJlc2l6ZScpLm9mKHdpbmRvdylcblxuXG5cblxuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFBvcHVwIl19
;
return module.exports;
},
3: function (require, module, exports) {
var DOM, Popup, Tag, defaults, extend, template;

DOM = require(6);

extend = require(5);

Popup = require(2);

defaults = require(12);

template = require(13);

Tag = (function() {
  Object.defineProperties(Tag.prototype, {
    'els': {
      get: function() {
        return this.el.child;
      }
    }
  });

  function Tag(list, config, data, popupContent) {
    var ref;
    this.list = list;
    this.config = config;
    this.data = data != null ? data : {};
    this.settings = extend.clone(defaults, this.list.settings.tag);
    this.name = this.config.name;
    this.label = this.config.label;
    this.value = this.config["default"] || this.data.value || '';
    this.el = template.container.spawn((ref = this.settings.templates) != null ? ref.container : void 0, {
      relatedInstance: this
    });
    this.popup = new Popup(this.list, this.el, this.config.popup);
    this._attachBindings();
    this.el.insertBefore(this.list.els.addButton);
    this.popup.els.content.append(popupContent ? popupContent : this.config.content.call(this, this.data));
  }

  Tag.prototype._attachBindings = function() {
    SimplyBind('label').of(this).to('textContent.label').of(this.els.text.raw).transform((function(_this) {
      return function(label) {
        if (_this.config.labelFormatter) {
          return _this.config.labelFormatter(label);
        } else {
          return label;
        }
      };
    })(this));
    SimplyBind('value').of(this).to('textContent.value').of(this.els.text.raw).transform((function(_this) {
      return function(value) {
        if (_this.config.valueFormatter) {
          return _this.config.valueFormatter(value);
        } else {
          return value;
        }
      };
    })(this));
    SimplyBind('event:click').of(this.els.removeButton).to((function(_this) {
      return function(event) {
        _this.list.remove(_this);
        return event.stopPropagation();
      };
    })(this));
    SimplyBind('event:click').of(this.el).to((function(_this) {
      return function(event) {
        return _this.popup.open();
      };
    })(this));
    return SimplyBind('array:value', {
      updateOnBind: false
    }).of(this.data).to('value').of(this);
  };

  Tag.prototype.getValue = function(applyTransforms) {
    if (applyTransforms == null) {
      applyTransforms = true;
    }
    if (applyTransforms && this.config.valueTransform) {
      return this.config.valueTransform(this.value);
    } else {
      return this.value;
    }
  };

  Tag.prototype.setValue = function(value) {
    return this.data.value = value;
  };

  return Tag;

})();

module.exports = Tag;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2luZGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiX2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLEdBQUEsR0FBTSxJQUFBLENBQUssVUFBTDs7QUFDTixNQUFBLEdBQVMsSUFBQSxDQUFLLGNBQUw7O0FBQ1QsS0FBQSxHQUFRLElBQUEsQ0FBSyxVQUFMOztBQUNSLFFBQUEsR0FBVyxJQUFBLENBQUssWUFBTDs7QUFDWCxRQUFBLEdBQVcsSUFBQSxDQUFLLFlBQUw7O0FBR0w7RUFDTCxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsR0FBQyxDQUFBLFNBQXpCLEVBQ0M7SUFBQSxLQUFBLEVBQU87TUFBQSxHQUFBLEVBQUssU0FBQTtlQUFLLElBQUMsQ0FBQSxFQUFFLENBQUM7TUFBVCxDQUFMO0tBQVA7R0FERDs7RUFHYSxhQUFDLElBQUQsRUFBUSxNQUFSLEVBQWlCLElBQWpCLEVBQTJCLFlBQTNCO0FBQ1osUUFBQTtJQURhLElBQUMsQ0FBQSxPQUFEO0lBQU8sSUFBQyxDQUFBLFNBQUQ7SUFBUyxJQUFDLENBQUEsc0JBQUQsT0FBTTtJQUNuQyxJQUFDLENBQUEsUUFBRCxHQUFZLE1BQU0sQ0FBQyxLQUFQLENBQWEsUUFBYixFQUF1QixJQUFDLENBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUF0QztJQUNaLElBQUMsQ0FBQSxJQUFELEdBQVEsSUFBQyxDQUFBLE1BQU0sQ0FBQztJQUNoQixJQUFDLENBQUEsS0FBRCxHQUFTLElBQUMsQ0FBQSxNQUFNLENBQUM7SUFDakIsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFDLENBQUEsTUFBTSxFQUFDLE9BQUQsRUFBUCxJQUFtQixJQUFDLENBQUEsSUFBSSxDQUFDLEtBQXpCLElBQWtDO0lBQzNDLElBQUMsQ0FBQSxFQUFELEdBQU0sUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFuQiw4Q0FBNEMsQ0FBRSxrQkFBOUMsRUFBeUQ7TUFBQSxlQUFBLEVBQWdCLElBQWhC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QU1WLFFBQUEsR0FBVSxTQUFDLEtBQUQ7V0FDVCxJQUFDLENBQUEsSUFBSSxDQUFDLEtBQU4sR0FBYztFQURMOzs7Ozs7QUFRWCxNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkRPTSA9IF8kc20oJ3F1aWNrZG9tJyApXG5leHRlbmQgPSBfJHNtKCdzbWFydC1leHRlbmQnIClcblBvcHVwID0gXyRzbSgnLi4vcG9wdXAnIClcbmRlZmF1bHRzID0gXyRzbSgnLi9kZWZhdWx0cycgKVxudGVtcGxhdGUgPSBfJHNtKCcuL3RlbXBsYXRlJyApXG5cblxuY2xhc3MgVGFnXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIEA6Oixcblx0XHQnZWxzJzogZ2V0OiAoKS0+IEBlbC5jaGlsZFxuXG5cdGNvbnN0cnVjdG9yOiAoQGxpc3QsIEBjb25maWcsIEBkYXRhPXt9LCBwb3B1cENvbnRlbnQpLT5cblx0XHRAc2V0dGluZ3MgPSBleHRlbmQuY2xvbmUoZGVmYXVsdHMsIEBsaXN0LnNldHRpbmdzLnRhZylcblx0XHRAbmFtZSA9IEBjb25maWcubmFtZVxuXHRcdEBsYWJlbCA9IEBjb25maWcubGFiZWxcblx0XHRAdmFsdWUgPSBAY29uZmlnLmRlZmF1bHQgb3IgQGRhdGEudmFsdWUgb3IgJydcblx0XHRAZWwgPSB0ZW1wbGF0ZS5jb250YWluZXIuc3Bhd24oQHNldHRpbmdzLnRlbXBsYXRlcz8uY29udGFpbmVyLCByZWxhdGVkSW5zdGFuY2U6QClcblx0XHRAcG9wdXAgPSBuZXcgUG9wdXAoQGxpc3QsIEBlbCwgQGNvbmZpZy5wb3B1cClcblxuXHRcdEBfYXR0YWNoQmluZGluZ3MoKVxuXHRcdEBlbC5pbnNlcnRCZWZvcmUoQGxpc3QuZWxzLmFkZEJ1dHRvbilcblx0XHRAcG9wdXAuZWxzLmNvbnRlbnQuYXBwZW5kKGlmIHBvcHVwQ29udGVudCB0aGVuIHBvcHVwQ29udGVudCBlbHNlIEBjb25maWcuY29udGVudC5jYWxsKEAsIEBkYXRhKSlcblxuXG5cdF9hdHRhY2hCaW5kaW5nczogKCktPlxuXHRcdFNpbXBseUJpbmQoJ2xhYmVsJykub2YoQClcblx0XHRcdC50bygndGV4dENvbnRlbnQubGFiZWwnKS5vZihAZWxzLnRleHQucmF3KVxuXHRcdFx0LnRyYW5zZm9ybSAobGFiZWwpPT4gaWYgQGNvbmZpZy5sYWJlbEZvcm1hdHRlciB0aGVuIEBjb25maWcubGFiZWxGb3JtYXR0ZXIobGFiZWwpIGVsc2UgbGFiZWxcblx0XHRcblx0XHRTaW1wbHlCaW5kKCd2YWx1ZScpLm9mKEApXG5cdFx0XHQudG8oJ3RleHRDb250ZW50LnZhbHVlJykub2YoQGVscy50ZXh0LnJhdylcblx0XHRcdC50cmFuc2Zvcm0gKHZhbHVlKT0+IGlmIEBjb25maWcudmFsdWVGb3JtYXR0ZXIgdGhlbiBAY29uZmlnLnZhbHVlRm9ybWF0dGVyKHZhbHVlKSBlbHNlIHZhbHVlXG5cblx0XHRTaW1wbHlCaW5kKCdldmVudDpjbGljaycpLm9mKEBlbHMucmVtb3ZlQnV0dG9uKVxuXHRcdFx0LnRvIChldmVudCk9PiBAbGlzdC5yZW1vdmUoQCk7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cblx0XHRTaW1wbHlCaW5kKCdldmVudDpjbGljaycpLm9mKEBlbClcblx0XHRcdC50byAoZXZlbnQpPT4gQHBvcHVwLm9wZW4oKVxuXG5cdFx0U2ltcGx5QmluZCgnYXJyYXk6dmFsdWUnLCB1cGRhdGVPbkJpbmQ6ZmFsc2UpLm9mKEBkYXRhKVxuXHRcdFx0LnRvKCd2YWx1ZScpLm9mKEApXG5cblxuXHRnZXRWYWx1ZTogKGFwcGx5VHJhbnNmb3Jtcz10cnVlKS0+XG5cdFx0aWYgYXBwbHlUcmFuc2Zvcm1zIGFuZCBAY29uZmlnLnZhbHVlVHJhbnNmb3JtXG5cdFx0XHRyZXR1cm4gQGNvbmZpZy52YWx1ZVRyYW5zZm9ybShAdmFsdWUpXG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIEB2YWx1ZVxuXG5cdHNldFZhbHVlOiAodmFsdWUpLT5cblx0XHRAZGF0YS52YWx1ZSA9IHZhbHVlXG5cblxuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFRhZyJdfQ==
;
return module.exports;
},
5: function (require, module, exports) {
var exports, extend, modifiers, newBuilder, normalizeKeys;

extend = require(14);

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
var QuickDom, svgNamespace;

svgNamespace = 'http://www.w3.org/2000/svg';


/* istanbul ignore next */

var CSS = require(16);


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

IS = require(31);

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

var QuickElement;

QuickElement = (function() {
  function QuickElement(type, options) {
    this.type = type;
    this.options = options;
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

var _getChildRefs, _getIndexByProp, _getParents;

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
  'prev': {
    get: function() {
      return QuickDom(this.el.previousSibling);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhdmVyc2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRyYXZlcnNpbmcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsWUFBWSxDQUFBLFNBQUUsQ0FBQSxZQUFkLEdBQTZCLFNBQUMsTUFBRDtTQUM1QixXQUFBLENBQVksSUFBWixFQUFlLE1BQWY7QUFENEI7O0FBRzdCLFlBQVksQ0FBQSxTQUFFLENBQUEsY0FBZCxHQUErQixTQUFDLE1BQUQ7QUFDOUIsTUFBQTtFQUFBLElBQUcsRUFBRSxFQUFDLFFBQUQsRUFBRixDQUFZLE1BQVosQ0FBQSxJQUF1QixDQUFBLEtBQUEsR0FBTSxFQUFFLENBQUMsTUFBSCxDQUFVLE1BQVYsQ0FBTixDQUExQjtJQUNDLFVBQUEsR0FBYSxJQUFDLENBQUE7QUFDZCxXQUFNLFVBQU47TUFDQyxJQUFHLEtBQUg7UUFDQyxJQUFxQixVQUFVLENBQUMsR0FBWCxLQUFrQixNQUF2QztBQUFBLGlCQUFPLFdBQVA7U0FERDtPQUFBLE1BQUE7UUFHQyxJQUFxQixNQUFBLENBQU8sVUFBUCxDQUFyQjtBQUFBLGlCQUFPLFdBQVA7U0FIRDs7TUFLQSxVQUFBLEdBQWEsVUFBVSxDQUFDO0lBTnpCLENBRkQ7O0FBRDhCOztBQWEvQixZQUFZLENBQUEsU0FBRSxDQUFBLEtBQWQsR0FBc0IsU0FBQyxRQUFEO1NBQ3JCLFFBQUEsQ0FBUyxJQUFDLENBQUEsR0FBRyxDQUFDLGFBQUwsQ0FBbUIsUUFBbkIsQ0FBVDtBQURxQjs7QUFHdEIsWUFBWSxDQUFBLFNBQUUsQ0FBQSxRQUFkLEdBQXlCLFNBQUMsUUFBRDtBQUN4QixNQUFBO0VBQUEsTUFBQSxHQUFTLElBQUMsQ0FBQSxHQUFHLENBQUMsZ0JBQUwsQ0FBc0IsUUFBdEI7RUFDVCxNQUFBLEdBQVM7QUFBSSxPQUFBLHdDQUFBOztJQUFBLE1BQU0sQ0FBQyxJQUFQLENBQVksSUFBWjtBQUFBO0FBQ2IsU0FBTyxJQUFJLFVBQUosQ0FBZSxN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TE47QUFRQSxTQUFPO0FBWk07O0FBZWQsYUFBQSxHQUFnQixTQUFDLE1BQUQsRUFBUyxTQUFUO0FBQ2YsTUFBQTtFQUFBLElBQTBCLFNBQUEsSUFBYSxDQUFJLE1BQU0sQ0FBQyxVQUFsRDtJQUFBLE1BQU0sQ0FBQyxVQUFQLEdBQW9CLEdBQXBCOztFQUNBLElBQUEsR0FBTyxNQUFNLENBQUM7RUFDZCxJQUE2QixNQUFNLENBQUMsR0FBcEM7SUFBQSxJQUFLLENBQUEsTUFBTSxDQUFDLEdBQVAsQ0FBTCxHQUFtQixPQUFuQjs7RUFDQSxRQUFBLEdBQVcsTUFBTSxDQUFDO0VBRWxCLElBQUcsUUFBUSxDQUFDLE1BQVo7QUFDQyxTQUFBLDBDQUFBOztNQUNDLFNBQUEsR0FBWSxhQUFBLENBQWMsS0FBZCxFQUFxQixTQUFyQjtBQUNaLFdBQUEsZ0JBQUE7O1FBQUEsSUFBSyxDQUFBLEdBQUEsTUFBTCxJQUFLLENBQUEsR0FBQSxJQUFTO0FBQWQ7QUFGRCxLQUREOztBQUtBLFNBQU87QUFYUTs7QUFjaEIsZUFBQSxHQUFrQixTQUFDLElBQUQsRUFBTyxJQUFQO0FBQ2pCLE1BQUE7RUFBQSxJQUFHLENBQUksQ0FBQSxNQUFBLEdBQU8sSUFBSSxDQUFDLE1BQVosQ0FBUDtBQUNDLFdBQU8sS0FEUjtHQUFBLE1BQUE7V0FHQyxNQUFNLENBQUMsUUFDTixDQUFDLE1BREYsQ0FDUyxTQUFDLEtBQUQ7YUFBVSxLQUFNLENBQUEsSUFBQSxDQUFOLEtBQWUsSUFBSyxDQUFBLElBQUE7SUFBOUIsQ0FEVCxDQUVDLENBQUMsT0FGRixDQUVVLElBRlYsRUFIRDs7QUFEaUIiLCJzb3VyY2VzQ29udGVudCI6WyJRdWlja0VsZW1lbnQ6OnBhcmVudHNVbnRpbCA9IChmaWx0ZXIpLT5cblx0X2dldFBhcmVudHMoQCwgZmlsdGVyKVxuXG5RdWlja0VsZW1lbnQ6OnBhcmVudE1hdGNoaW5nID0gKGZpbHRlciktPlxuXHRpZiBJUy5mdW5jdGlvbihmaWx0ZXIpIG9yIGlzUmVmPUlTLnN0cmluZyhmaWx0ZXIpXG5cdFx0bmV4dFBhcmVudCA9IEBwYXJlbnRcblx0XHR3aGlsZSBuZXh0UGFyZW50XG5cdFx0XHRpZiBpc1JlZlxuXHRcdFx0XHRyZXR1cm4gbmV4dFBhcmVudCBpZiBuZXh0UGFyZW50LnJlZiBpcyBmaWx0ZXJcblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0dXJuIG5leHRQYXJlbnQgaWYgZmlsdGVyKG5leHRQYXJlbnQpXG5cblx0XHRcdG5leHRQYXJlbnQgPSBuZXh0UGFyZW50LnBhcmVudFxuXHRcdFxuXHRyZXR1cm5cblxuUXVpY2tFbGVtZW50OjpxdWVyeSA9IChzZWxlY3RvciktPlxuXHRRdWlja0RvbSBAcmF3LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG5cblF1aWNrRWxlbWVudDo6cXVlcnlBbGwgPSAoc2VsZWN0b3IpLT5cblx0cmVzdWx0ID0gQHJhdy5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuXHRvdXRwdXQgPSBbXTsgb3V0cHV0LnB1c2goaXRlbSkgZm9yIGl0ZW0gaW4gcmVzdWx0XG5cdHJldHVybiBuZXcgUXVpY2tCYXRjaChvdXRwdXQpXG5cblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyBRdWlja0VsZW1lbnQ6Oixcblx0J2NoaWxkcmVuJzogZ2V0OiAoKS0+XG5cdFx0aWYgQGVsLmNoaWxkTm9kZXMubGVuZ3RoIGlzbnQgQF9jaGlsZHJlbi5sZW5ndGggIyBSZS1jb2xsZWN0IGNoaWxkcmVuXHRcblx0XHRcdEBfY2hpbGRyZW4ubGVuZ3RoID0gMCAjIEVtcHR5IG91dCBjaGlsZHJlbiBhcnJheVxuXHRcdFx0QF9jaGlsZHJlbi5wdXNoKFF1aWNrRG9tKGNoaWxkKSkgZm9yIGNoaWxkIGluIEBlbC5jaGlsZE5vZGVzIHdoZW4gY2hpbGQubm9kZVR5cGUgPCA0XG5cblx0XHRyZXR1cm4gQF9jaGlsZHJlblxuXG5cdCdwYXJlbnQnOiBnZXQ6ICgpLT5cblx0XHRpZiAobm90IEBfcGFyZW50IG9yIEBfcGFyZW50LmVsIGlzbnQgQGVsLnBhcmVudE5vZGUpIGFuZCBub3QgSVMuZG9tRG9jKEBlbC5wYXJlbnROb2RlKVxuXHRcdFx0QF9wYXJlbnQgPSBRdWlja0RvbShAZWwucGFyZW50Tm9kZSlcblxuXHRcdHJldHVybiBAX3BhcmVudFxuXG5cblx0J3BhcmVudHMnOiBnZXQ6ICgpLT5cblx0XHRfZ2V0UGFyZW50cyhAKVxuXG5cdCduZXh0JzogZ2V0OiAoKS0+XG5cdFx0UXVpY2tEb20oQGVsLm5leHRTaWJsaW5nKVxuXG5cdCdwcmV2JzogZ2V0OiAoKS0+XG5cdFx0UXVpY2tEb20oQGVsLnByZXZpb3VzU2libGluZylcblxuXHQnbmV4dEFsbCc6IGdldDogKCktPlxuXHRcdHNpYmxpbmdzID0gW11cblx0XHRuZXh0U2libGluZyA9IFF1aWNrRG9tKEBlbC5uZXh0U2libGluZylcblx0XHR3aGlsZSBuZXh0U2libGluZ1xuXHRcdFx0c2libGluZ3MucHVzaChuZXh0U2libGluZylcblx0XHRcdG5leHRTaWJsaW5nID0gbmV4dFNpYmxpbmcubmV4dFxuXG5cdFx0cmV0dXJuIHNpYmxpbmdzXG5cblx0J3ByZXZBbGwnOiBnZXQ6ICgpLT5cblx0XHRzaWJsaW5ncyA9IFtdXG5cdFx0cHJldlNpYmxpbmcgPSBRdWlja0RvbShAZWwucHJldmlvdXNTaWJsaW5nKVxuXHRcdHdoaWxlIHByZXZTaWJsaW5nXG5cdFx0XHRzaWJsaW5ncy5wdXNoKHByZXZTaWJsaW5nKVxuXHRcdFx0cHJldlNpYmxpbmcgPSBwcmV2U2libGluZy5wcmV2XG5cblx0XHRyZXR1cm4gc2libGluZ3NcblxuXHQnc2libGluZ3MnOiBnZXQ6ICgpLT5cblx0XHRAcHJldkFsbC5yZXZlcnNlKCkuY29uY2F0KEBuZXh0QWxsKVxuXHRcblx0J2NoaWxkJzogZ2V0OiAoKS0+XG5cdFx0QF9jaGlsZFJlZnMgb3IgX2dldENoaWxkUmVmcyhAKVxuXG5cdCdjaGlsZGYnOiBnZXQ6ICgpLT5cblx0XHRfZ2V0Q2hpbGRSZWZzKEAsIHRydWUpXG5cblx0J2ZpcnN0Q2hpbGQnOiBnZXQ6ICgpLT5cblx0XHRAY2hpbGRyZW5bMF1cblxuXHQnbGFzdENoaWxkJzogZ2V0OiAoKS0+XG5cdFx0Y2hpbGRyZW4gPSBAY2hpbGRyZW5cblx0XHRjaGlsZHJlbltjaGlsZHJlbi5sZW5ndGgtMV1cblxuXHQnaW5kZXgnOiBnZXQ6ICgpLT5cblx0XHRpZiBub3QgcGFyZW50PUBwYXJlbnRcblx0XHRcdHJldHVybiBudWxsXG5cdFx0ZWxzZVxuXHRcdFx0cGFyZW50LmNoaWxkcmVuLmluZGV4T2YoQClcblxuXHQnaW5kZXhUeXBlJzogZ2V0OiAoKS0+XG5cdFx0X2dldEluZGV4QnlQcm9wKEAsICd0eXBlJylcblxuXHQnaW5kZXhSZWYnOiBnZXQ6ICgpLT5cblx0XHRfZ2V0SW5kZXhCeVByb3AoQCwgJ3JlZicpXG5cblxuXG5fZ2V0UGFyZW50cyA9ICh0YXJnZXRFbCwgZmlsdGVyKS0+XG5cdGZpbHRlciA9IHVuZGVmaW5lZCBpZiBub3QgSVMuZnVuY3Rpb24oZmlsdGVyKSBhbmQgbm90IGlzUmVmPUlTLnN0cmluZyhmaWx0ZXIpXG5cdHBhcmVudHMgPSBbXVxuXHRuZXh0UGFyZW50ID0gdGFyZ2V0RWwucGFyZW50XG5cdHdoaWxlIG5leHRQYXJlbnRcblx0XHRwYXJlbnRzLnB1c2gobmV4dFBhcmVudClcblx0XHRuZXh0UGFyZW50ID0gbmV4dFBhcmVudC5wYXJlbnRcblx0XHRpZiBpc1JlZlxuXHRcdFx0bmV4dFBhcmVudCA9IG51bGwgaWYgbmV4dFBhcmVudCBhbmQgbmV4dFBhcmVudC5yZWYgaXMgZmlsdGVyXG5cdFx0ZWxzZSBpZiBmaWx0ZXJcblx0XHRcdG5leHRQYXJlbnQgPSBudWxsIGlmIGZpbHRlcihuZXh0UGFyZW50KVxuXG5cdHJldHVybiBwYXJlbnRzXG5cblxuX2dldENoaWxkUmVmcyA9ICh0YXJnZXQsIGZyZXNoQ29weSktPlxuXHR0YXJnZXQuX2NoaWxkUmVmcyA9IHt9IGlmIGZyZXNoQ29weSBvciBub3QgdGFyZ2V0Ll9jaGlsZFJlZnNcblx0cmVmcyA9IHRhcmdldC5fY2hpbGRSZWZzXG5cdHJlZnNbdGFyZ2V0LnJlZl0gPSB0YXJnZXQgaWYgdGFyZ2V0LnJlZlxuXHRjaGlsZHJlbiA9IHRhcmdldC5jaGlsZHJlblxuXG5cdGlmIGNoaWxkcmVuLmxlbmd0aFxuXHRcdGZvciBjaGlsZCBpbiBjaGlsZHJlblxuXHRcdFx0Y2hpbGRSZWZzID0gX2dldENoaWxkUmVmcyhjaGlsZCwgZnJlc2hDb3B5KVxuXHRcdFx0cmVmc1tyZWZdIHx8PSBlbCBmb3IgcmVmLGVsIG9mIGNoaWxkUmVmc1xuXG5cdHJldHVybiByZWZzXG5cblxuX2dldEluZGV4QnlQcm9wID0gKG1haW4sIHByb3ApLT5cblx0aWYgbm90IHBhcmVudD1tYWluLnBhcmVudFxuXHRcdHJldHVybiBudWxsXG5cdGVsc2Vcblx0XHRwYXJlbnQuY2hpbGRyZW5cblx0XHRcdC5maWx0ZXIgKGNoaWxkKS0+IGNoaWxkW3Byb3BdIGlzIG1haW5bcHJvcF1cblx0XHRcdC5pbmRleE9mKG1haW4pXG5cblxuXG5cblxuIl19
;

var baseStateTriggers;

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
  var base1, base2, base3;
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
          stateChain = new (require(46))(chain);
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
  var event, handler, key, method, ref, ref1, ref2, ref3, ref4, value;
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
    ref1 = this.options.props;
    for (key in ref1) {
      value = ref1[key];
      this.prop(key, value);
    }
  }
  if (this.options.attrs) {
    ref2 = this.options.attrs;
    for (key in ref2) {
      value = ref2[key];
      this.attr(key, value);
    }
  }
  this._applyRegisteredStyle(this._styles.base, null, null, this.options.styleAfterInsert);
  if (this._texts) {
    this.text = this._texts.base;
  }
  this.on('inserted', function() {
    var _, mediaStates;
    if (this.options.styleAfterInsert) {
      this.recalcStyle();
    }
    _ = this._inserted = this;
    if ((mediaStates = this._mediaStates) && this._mediaStates.length) {
      return this._mediaStates = new function() {
        var i, len, queryString;
        for (i = 0, len = mediaStates.length; i < len; i++) {
          queryString = mediaStates[i];
          this[queryString] = MediaQuery.register(_, queryString);
        }
        return this;
      };
    }
  }, false, true);
  if (this.options.recalcOnResize) {
    window.addEventListener('resize', (function(_this) {
      return function() {
        return _this.recalcStyle();
      };
    })(this));
  }
  if (this.options.events) {
    ref3 = this.options.events;
    for (event in ref3) {
      handler = ref3[event];
      this.on(event, handler);
    }
  }
  if (this.options.methods) {
    ref4 = this.options.methods;
    for (method in ref4) {
      value = ref4[method];
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
};

QuickElement.prototype._attachStateEvents = function(force) {
  var fn, ref1, state, trigger;
  ref1 = this.options.stateTriggers;
  fn = (function(_this) {
    return function(state, trigger) {
      var disabler, enabler;
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
  })(this);
  for (state in ref1) {
    trigger = ref1[state];
    fn(state, trigger);
  }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsaUJBQUEsR0FDQztFQUFBLE9BQUEsRUFBUztJQUFDLEVBQUEsRUFBRyxZQUFKO0lBQWtCLEdBQUEsRUFBSSxZQUF0QjtJQUFvQyxPQUFBLEVBQVEsSUFBNUM7R0FBVDtFQUNBLE9BQUEsRUFBUztJQUFDLEVBQUEsRUFBRyxPQUFKO0lBQWEsR0FBQSxFQUFJLE1BQWpCO0lBQXlCLE9BQUEsRUFBUSxJQUFqQztHQURUOzs7QUFJRCxZQUFZLENBQUEsU0FBRSxDQUFBLGlCQUFkLEdBQWtDLFNBQUE7QUFDakMsTUFBQTtFQUFBLElBQXVDLElBQUMsQ0FBQSxPQUFPLEVBQUMsS0FBRCxFQUEvQztJQUFBLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBVCxHQUFxQixJQUFDLENBQUEsT0FBTyxFQUFDLEtBQUQsR0FBN0I7O0VBQ0EsSUFBZ0MsSUFBQyxDQUFBLE9BQU8sQ0FBQyxHQUF6QztJQUFBLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxHQUFnQixJQUFDLENBQUEsT0FBTyxDQUFDLElBQXpCOztFQUNBLElBQUMsQ0FBQSxPQUFELHlEQUFtQixDQUFDLHVCQUFELENBQUMsa0JBQW1COztTQUMvQixDQUFDLG1CQUFvQjs7O1NBQ3JCLENBQUMsc0JBQXVCOztFQUNoQyxJQUFDLENBQUEsT0FBTyxDQUFDLGFBQVQsR0FDSSxJQUFDLENBQUEsT0FBTyxDQUFDLGFBQVosR0FDQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQWIsQ0FBa0IsaUJBQWxCLEVBQXFDLElBQUMsQ0FBQSxPQUFPLENBQUMsYUFBOUMsQ0FERCxHQUdDO0VBRUYsSUFBRyxJQUFDLENBQUEsSUFBRCxLQUFTLE1BQVo7SUFDQyxNQUFBLENBQU8sSUFBUCxFQUFVLElBQUMsQ0FBQSxXQUFELENBQWEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUF0QixFQUE0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QUFVLFVBQVYsRUFBc0IsQ0FBQSxTQUFBLEtBQUE7bUJBQUEsU0FBQTtjQUNyQixJQUE4QixNQUFBLEtBQVUsU0FBeEM7dUJBQUEsS0FBQyxDQUFBLGNBQUQsQ0FBZ0IsU0FBaEIsRUFBQTs7WUFEcUI7VUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXRCLEVBSEQ7U0FGa0I7O0lBQWQsQ0FETDtHQUREO0FBRjRCOztBQWM3QixZQUFZLENBQUEsU0FBRSxDQUFBLGNBQWQsR0FBK0IsU0FBQyxTQUFEO0VBQzlCLE9BQU8sSUFBQyxDQUFBO0VBQ1IsSUFBQyxDQUFBLE9BQUQsR0FBVztFQUNYLElBQUMsQ0FBQSxXQUFELENBQWEsVUFBYixFQUF5QixTQUF6QjtBQUg4QiIsInNvdXJjZXNDb250ZW50IjpbImJhc2VTdGF0ZVRyaWdnZXJzID1cblx0J2hvdmVyJzoge29uOidtb3VzZWVudGVyJywgb2ZmOidtb3VzZWxlYXZlJywgYnViYmxlczp0cnVlfVxuXHQnZm9jdXMnOiB7b246J2ZvY3VzJywgb2ZmOidibHVyJywgYnViYmxlczp0cnVlfVxuXG5cblF1aWNrRWxlbWVudDo6X25vcm1hbGl6ZU9wdGlvbnMgPSAoKS0+XG5cdEBvcHRpb25zLmNsYXNzTmFtZSA9IEBvcHRpb25zLmNsYXNzIGlmIEBvcHRpb25zLmNsYXNzXG5cdEBvcHRpb25zLmhyZWYgPSBAb3B0aW9ucy51cmwgaWYgQG9wdGlvbnMudXJsXG5cdEByZWxhdGVkID0gQG9wdGlvbnMucmVsYXRlZEluc3RhbmNlID89IEBcblx0QG9wdGlvbnMudW5wYXNzYWJsZVN0YXRlcyA/PSBbXVxuXHRAb3B0aW9ucy5wYXNzU3RhdGVUb0NoaWxkcmVuID89IHRydWVcblx0QG9wdGlvbnMuc3RhdGVUcmlnZ2VycyA9XG5cdFx0aWYgQG9wdGlvbnMuc3RhdGVUcmlnZ2Vyc1xuXHRcdFx0ZXh0ZW5kLmNsb25lLmRlZXAoYmFzZVN0YXRlVHJpZ2dlcnMsIEBvcHRpb25zLnN0YXRlVHJpZ2dlcnMpXG5cdFx0ZWxzZVxuXHRcdFx0YmFzZVN0YXRlVHJpZ2dlcnNcblx0XG5cdGlmIEB0eXBlIGlzICd0ZXh0J1xuXHRcdGV4dGVuZCBALCBAX3BhcnNlVGV4dHMoQG9wdGlvbnMudGV4dCwgQF90ZXh0cylcblx0ZWxzZVxuXHRcdGV4dGVuZCBALCBAX3BhcnNlU3R5bGVzKEBvcHRpb25zLnN0eWxlLCBAX3N0eWxlcylcblx0XG5cdHJldHVyblxuXG5cblF1aWNrRWxlbWVudDo6X3BhcnNlU3R5bGVzID0gKHN0eWxlcywgc3RvcmUpLT5cblx0cmV0dXJuIGlmIG5vdCBJUy5vYmplY3RQbGFpbihzdHlsZXMpXG5cdGtleXMgPSBPYmplY3Qua2V5cyhzdHlsZXMpXG5cdHN0YXRlcyA9IGtleXMuZmlsdGVyIChrZXkpLT4gaGVscGVycy5pc1N0YXRlU3R5bGUoa2V5KVxuXHRzcGVjaWFsU3RhdGVzID0gaGVscGVycy5yZW1vdmVJdGVtKHN0YXRlcy5zbGljZSgpLCAnJGJhc2UnKVxuXHRfbWVkaWFTdGF0ZXMgPSBzdGF0ZXMuZmlsdGVyKChrZXkpLT4ga2V5WzBdIGlzICdAJykubWFwIChzdGF0ZSktPiBzdGF0ZS5zbGljZSgxKVxuXHRfcHJvdmlkZWRTdGF0ZXMgPSBzdGF0ZXMubWFwIChzdGF0ZSktPiBzdGF0ZS5zbGljZSgxKSAjIFJlbW92ZSAnJCcgcHJlZml4XG5cdF9zdHlsZXMgPSBzdG9yZSBvciB7fVxuXHRfc3RhdGVTaGFyZWQgPSBfcHJvdmlkZWRTdGF0ZXNTaGFyZWQgPSB1bmRlZmluZWRcblxuXHRiYXNlID0gaWYgbm90IGhlbHBlcnMuaW5jbHVkZXMoc3RhdGVzLCAnJGJhc2UnKSB0aGVuIHN0eWxlcyBlbHNlIHN0eWxlcy4kYmFzZVxuXHRfc3R5bGVzLmJhc2UgPSBoZWxwZXJzLnJlZ2lzdGVyU3R5bGUoYmFzZSwgMCwgZm9yY2VTdHlsZT1Ab3B0aW9ucy5mb3JjZVN0eWxlKVxuXG5cblx0aWYgc3BlY2lhbFN0YXRlcy5sZW5ndGhcblx0XHRmbGF0dGVuTmVzdGVkU3RhdGVzID0gKHN0eWxlT2JqZWN0LCBjaGFpbiwgbGV2ZWwpLT5cblx0XHRcdHN0eWxlS2V5cyA9IE9iamVjdC5rZXlzKHN0eWxlT2JqZWN0KVxuXHRcdFx0b3V0cHV0ID0ge31cblx0XHRcdGhhc05vblN0YXRlUHJvcHMgPSBmYWxzZVxuXHRcdFx0XG5cdFx0XHRmb3Igc3RhdGUgaW4gc3R5bGVLZXlzXG5cdFx0XHRcdGlmIG5vdCBoZWxwZXJzLmlzU3RhdGVTdHlsZShzdGF0ZSlcblx0XHRcdFx0XHRoYXNOb25TdGF0ZVByb3BzID0gdHJ1ZVxuXHRcdFx0XHRcdG91dHB1dFtzdGF0ZV0gPSBzdHlsZU9iamVjdFtzdGF0ZV1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGNoYWluLnB1c2goc3RhdGVfID0gc3RhdGUuc2xpY2UoMSkpXG5cdFx0XHRcdFx0c3RhdGVDaGFpbiA9IG5ldyAoXyRzbSgnLi9zdGF0ZUNoYWluJyApKShjaGFpbilcblx0XHRcdFx0XHRfc3RhdGVTaGFyZWQgPz0gW11cblx0XHRcdFx0XHRfcHJvdmlkZWRTdGF0ZXNTaGFyZWQgPz0gW11cblx0XHRcdFx0XHRfcHJvdmlkZWRTdGF0ZXNTaGFyZWQucHVzaChzdGF0ZUNoYWluKVxuXHRcdFx0XHRcdF9tZWRpYVN0YXRlcy5wdXNoKHN0YXRlXykgaWYgc3RhdGVbMF0gaXMgJ0AnXG5cdFx0XHRcdFx0X3N0eWxlc1tzdGF0ZUNoYWluLnN0cmluZ10gPSBoZWxwZXJzLnJlZ2lzdGVyU3R5bGUgZmxhdHRlbk5lc3RlZFN0YXRlcyhzdHlsZU9iamVjdFtzdGF0ZV0sIGNoYWluLCBsZXZlbCsxKSwgbGV2ZWwrMSwgZm9yY2VTdHlsZVxuXHRcdFx0XG5cdFx0XHRyZXR1cm4gaWYgaGFzTm9uU3RhdGVQcm9wcyB0aGVuIG91dHB1dFxuXG5cdFx0Zm9yIHN0YXRlIGluIHNwZWNpYWxTdGF0ZXNcblx0XHRcdHN0YXRlXyA9IHN0YXRlLnNsaWNlKDEpXG5cdFx0XHRcblx0XHRcdHN0YXRlU3R5bGVzID0gZmxhdHRlbk5lc3RlZFN0YXRlcyhzdHlsZXNbc3RhdGVdLCBbc3RhdGVfXSwgMSlcblx0XHRcdF9zdHlsZXNbc3RhdGVfXSA9IGhlbHBlcnMucmVnaXN0ZXJTdHlsZShzdGF0ZVN0eWxlcywgMSkgaWYgc3RhdGVTdHlsZXNcblxuXG5cdHJldHVybiB7X3N0eWxlcywgX21lZGlhU3RhdGVzLCBfc3RhdGVTaGFyZWQsIF9wcm92aWRlZFN0YXRlcywgX3Byb3ZpZGVkU3RhdGVzU2hhcmVkfVxuXG5cblxuUXVpY2tFbGVtZW50OjpfcGFyc2VUZXh0cyA9ICh0ZXh0cywgc3RvcmUpLT5cblx0cmV0dXJuIGlmIG5vdCBJUy5vYmplY3RQbGFpbih0ZXh0cylcblx0c3RhdGVzID0gT2JqZWN0LmtleXModGV4dHMpLm1hcCAoc3RhdGUpLT4gc3RhdGUuc2xpY2UoMSlcblx0X3Byb3ZpZGVkU3RhdGVzID0gc3RhdGVzLmZpbHRlciAoc3RhdGUpLT4gc3RhdGUgaXNudCAnYmFzZSdcblx0X3RleHRzID0gc3RvcmUgb3Ige31cblx0X3RleHRzID0gYmFzZTonJ1xuXHRfdGV4dHNbc3RhdGVdID0gdGV4dHNbJyQnK3N0YXRlXSBmb3Igc3RhdGUgaW4gc3RhdGVzXG5cdFxuXHRyZXR1cm4ge190ZXh0cywgX3Byb3ZpZGVkU3RhdGVzfVxuXG5cblF1aWNrRWxlbWVudDo6X2FwcGx5T3B0aW9ucyA9ICgpLT5cblx0aWYgcmVmPShAb3B0aW9ucy5pZCBvciBAb3B0aW9ucy5yZWYpIHRoZW4gQGF0dHIoJ2RhdGEtcmVmJywgQHJlZj1yZWYpXG5cdGlmIEBvcHRpb25zLmlkIHRoZW4gQGVsLmlkID0gQG9wdGlvbnMuaWRcblx0aWYgQG9wdGlvbnMuY2xhc3NOYW1lIHRoZW4gQGVsLmNsYXNzTmFtZSA9IEBvcHRpb25zLmNsYXNzTmFtZVxuXHRpZiBAb3B0aW9ucy5zcmMgdGhlbiBAZWwuc3JjID0gQG9wdGlvbnMuc3JjXG5cdGlmIEBvcHRpb25zLmhyZWYgdGhlbiBAZWwuaHJlZiA9IEBvcHRpb25zLmhyZWZcblx0aWYgQG9wdGlvbnMudHlwZSB0aGVuIEBlbC50eXBlID0gQG9wdGlvbnMudHlwZVxuXHRpZiBAb3B0aW9ucy5uYW1lIHRoZW4gQGVsLm5hbWUgPSBAb3B0aW9ucy5uYW1lXG5cdGlmIEBvcHRpb25zLnZhbHVlIHRoZW4gQGVsLnZhbHVlID0gQG9wdGlvbnMudmFsdWVcblx0aWYgQG9wdGlvbnMuc2VsZWN0ZWQgdGhlbiBAZWwuc2VsZWN0ZWQgPSBAb3B0aW9ucy5zZWxlY3RlZFxuXHRpZiBAb3B0aW9ucy5jaGVja2VkIHRoZW4gQGVsLmNoZWNrZWQgPSBAb3B0aW9ucy5jaGVja2VkXG5cdGlmIEBvcHRpb25zLnByb3BzIHRoZW4gQHByb3Aoa2V5LHZhbHVlKSBmb3Iga2V5LHZhbHVlIG9mIEBvcHRpb25zLnByb3BzXG5cdGlmIEBvcHRpb25zLmF0dHJzIHRoZW4gQGF0dHIoa2V5LHZhbHVlKSBmb3Iga2V5LHZhbHVlIG9mIEBvcHRpb25zLmF0dHJzXG5cdEBfYXBwbHlSZWdpc3RlcmVkU3R5bGUoQF9zdHlsZXMuYmFzZSwgbnVsbCwgbnVsbCwgQG9wdGlvbnMuc3R5bGVBZnRlckluc2VydClcblx0QHRleHQgPSBAX3RleHRzLmJhc2UgaWYgQF90ZXh0c1xuXG5cdEBvbiAnaW5zZXJ0ZWQnLCAoKS0+XG5cdFx0aWYgQG9wdGlvbnMuc3R5bGVBZnRlckluc2VydFxuXHRcdFx0QHJlY2FsY1N0eWxlKClcblxuXHRcdF8gPSBAX2luc2VydGVkID0gQFxuXG5cdFx0aWYgKG1lZGlhU3RhdGVzPUBfbWVkaWFTdGF0ZXMpIGFuZCBAX21lZGlhU3RhdGVzLmxlbmd0aFxuXHRcdFx0QF9tZWRpYVN0YXRlcyA9IG5ldyAoKS0+XG5cdFx0XHRcdGZvciBxdWVyeVN0cmluZyBpbiBtZWRpYVN0YXRlc1xuXHRcdFx0XHRcdEBbcXVlcnlTdHJpbmddID0gTWVkaWFRdWVyeS5yZWdpc3RlcihfLCBxdWVyeVN0cmluZylcblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiBAXG5cdCwgZmFsc2UsIHRydWVcblxuXHRpZiBAb3B0aW9ucy5yZWNhbGNPblJlc2l6ZVxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyICdyZXNpemUnLCAoKT0+IEByZWNhbGNTdHlsZSgpXG5cblx0aWYgQG9wdGlvbnMuZXZlbnRzXG5cdFx0QG9uKGV2ZW50LCBoYW5kbGVyKSBmb3IgZXZlbnQsaGFuZGxlciBvZiBAb3B0aW9ucy5ldmVudHNcblxuXHRpZiBAb3B0aW9ucy5tZXRob2RzXG5cdFx0Zm9yIG1ldGhvZCx2YWx1ZSBvZiBAb3B0aW9ucy5tZXRob2RzIHdoZW4gbm90IEBbbWV0aG9kXVxuXHRcdFx0aWYgSVMuZnVuY3Rpb24odmFsdWUpXG5cdFx0XHRcdEBbbWV0aG9kXSA9IHZhbHVlXG5cdFx0XHRlbHNlIGlmIElTLm9iamVjdCh2YWx1ZSlcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIG1ldGhvZCwge2NvbmZpZ3VyYWJsZTp0cnVlLCBnZXQ6dmFsdWUuZ2V0LCBzZXQ6dmFsdWUuc2V0fVxuXG5cdHJldHVyblxuXG5cblF1aWNrRWxlbWVudDo6X2F0dGFjaFN0YXRlRXZlbnRzID0gKGZvcmNlKS0+XG5cdGZvciBzdGF0ZSx0cmlnZ2VyIG9mIEBvcHRpb25zLnN0YXRlVHJpZ2dlcnMgdGhlbiBkbyAoc3RhdGUsdHJpZ2dlcik9PlxuXHRcdHJldHVybiBpZiBub3QgaGVscGVycy5pbmNsdWRlcyhAX3Byb3ZpZGVkU3RhdGVzLCBzdGF0ZSkgYW5kIG5vdCBmb3JjZSBhbmQgbm90IHRyaWdnZXIuZm9yY2Vcblx0XHRlbmFibGVyID0gaWYgSVMuc3RyaW5nKHRyaWdnZXIpIHRoZW4gdHJpZ2dlciBlbHNlIHRyaWdnZXIub25cblx0XHRkaXNhYmxlciA9IHRyaWdnZXIub2ZmIGlmIElTLm9iamVjdCh0cmlnZ2VyKVxuXG5cdFx0QF9saXN0ZW5UbyBlbmFibGVyLCAoKT0+IEBzdGF0ZShzdGF0ZSwgb24sIHRyaWdnZXIuYnViYmxlcylcblx0XHRpZiBkaXNhYmxlciB0aGVuIEBfbGlzdGVuVG8gZGlzYWJsZXIsICgpPT4gQHN0YXRlKHN0YXRlLCBvZmYsIHRyaWdnZXIuYnViYmxlcylcblx0XG5cdHJldHVyblxuXG5cblxuUXVpY2tFbGVtZW50OjpfcHJveHlQYXJlbnQgPSAoKS0+XG5cdHBhcmVudCA9IHVuZGVmaW5lZFxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgJ19wYXJlbnQnLFxuXHRcdGdldDogKCktPiBwYXJlbnRcblx0XHRzZXQ6IChuZXdQYXJlbnQpLT4gaWYgcGFyZW50PW5ld1BhcmVudFxuXHRcdFx0bGFzdFBhcmVudCA9IEBwYXJlbnRzLnNsaWNlKC0xKVswXVxuXHRcdFx0aWYgbGFzdFBhcmVudC5yYXcgaXMgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG5cdFx0XHRcdEBfdW5wcm94eVBhcmVudChuZXdQYXJlbnQpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHBhcmVudC5vbiAnaW5zZXJ0ZWQnLCAoKT0+XG5cdFx0XHRcdFx0QF91bnByb3h5UGFyZW50KG5ld1BhcmVudCkgaWYgcGFyZW50IGlzIG5ld1BhcmVudFxuXHRcdFx0cmV0dXJuXG5cblxuUXVpY2tFbGVtZW50OjpfdW5wcm94eVBhcmVudCA9IChuZXdQYXJlbnQpLT5cblx0ZGVsZXRlIEBfcGFyZW50XG5cdEBfcGFyZW50ID0gbmV3UGFyZW50XG5cdEBlbWl0UHJpdmF0ZSgnaW5zZXJ0ZWQnLCBuZXdQYXJlbnQpXG5cdHJldHVyblxuXG5cblxuXG4iXX0=
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

QuickElement.prototype.emit = function(eventName, bubbles, cancelable) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXZlbnRzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLGVBQUEsR0FBa0I7O0FBRWxCLFlBQVksQ0FBQSxTQUFFLENBQUEsRUFBZCxHQUFtQixTQUFDLFVBQUQsRUFBYSxRQUFiLEVBQXVCLFVBQXZCLEVBQW1DLFNBQW5DO0FBQ2xCLE1BQUE7O0lBQUEsSUFBQyxDQUFBLGtCQUFtQjtNQUFDLE1BQUEsRUFBTyxFQUFSOzs7RUFFcEIsSUFBRyxFQUFFLENBQUMsTUFBSCxDQUFVLFVBQVYsQ0FBQSxJQUEwQixFQUFFLEVBQUMsUUFBRCxFQUFGLENBQVksUUFBWixDQUE3QjtJQUNDLEtBQUEsR0FBUSxVQUFVLENBQUMsS0FBWCxDQUFpQixHQUFqQjtJQUNSLFdBQUEsR0FBYyxLQUFNLENBQUEsQ0FBQTtJQUNwQixVQUFBLEdBQWEsS0FBTSxDQUFBLENBQUE7SUFFbkIsSUFBRyxVQUFBLEtBQWMsVUFBZCxJQUE2QixJQUFDLENBQUEsU0FBakM7TUFDQyxRQUFRLENBQUMsSUFBVCxDQUFjLElBQWQsRUFBaUIsSUFBQyxDQUFBLE9BQWxCO0FBQ0EsYUFBTyxLQUZSOztJQUlBLFVBQVUsQ0FBQyxLQUFYLENBQWlCLGVBQWpCLENBQWlDLENBQUMsT0FBbEMsQ0FBMEMsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLFNBQUQ7UUFDekMsSUFBRyxDQUFJLEtBQUMsQ0FBQSxlQUFnQixDQUFBLFNBQUEsQ0FBeEI7VUFDQyxLQUFDLENBQUEsZUFBZ0IsQ0FBQSxTQUFBLENBQWpCLEdBQThCO1VBRTlCLElBQUEsQ0FBTyxTQUFQO1lBQXNCLEtBQUMsQ0FBQSxTQUFELENBQVcsU0FBWCxFQUFzQixTQUFDLEtBQUQ7cUJBQzNDLEtBQUMsQ0FBQSxlQUFELENBQWlCLFNBQWpCLEVBQTRCLEtBQTVCO1lBRDJDLENBQXRCLEVBRXBCLFVBRm9CLEVBQXRCO1dBSEQ7O1FBT0EsSUFB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Q0MsSUFBQyxDQUFBLGVBQUQsQ0FBaUIsU0FBakIsRUFBNEIsR0FBNUIsRUFERDs7QUFHQSxTQUFPO0FBSm9COztBQVE1QixZQUFZLENBQUEsU0FBRSxDQUFBLGVBQWQsR0FBZ0MsU0FBQyxTQUFELEVBQVksR0FBWjtBQUMvQixNQUFBO0VBQUEsU0FBQSxHQUFZLElBQUMsQ0FBQSxlQUFnQixDQUFBLFNBQUEsQ0FBVSxDQUFDLEtBQTVCLENBQUE7QUFDWixPQUFBLDJDQUFBOztJQUFBLEVBQUUsQ0FBQyxJQUFILENBQVEsSUFBUixFQUFXLEdBQVg7QUFBQTtBQUYrQjs7O0FBTWhDOztBQUNBLFlBQVksQ0FBQSxTQUFFLENBQUEsU0FBZCxHQUEwQixTQUFDLFNBQUQsRUFBWSxRQUFaLEVBQXNCLFVBQXRCO0FBQ3pCLE1BQUE7RUFBQSxZQUFBLEdBQWtCLElBQUMsQ0FBQSxFQUFFLENBQUMsZ0JBQVAsR0FBNkIsa0JBQTdCLEdBQXFEO0VBQ3BFLG9CQUFBLEdBQTBCLElBQUMsQ0FBQSxFQUFFLENBQUMsZ0JBQVAsR0FBNkIsU0FBN0IsR0FBNEMsSUFBQSxHQUFLO0VBRXhFLElBQUMsQ0FBQSxFQUFHLENBQUEsWUFBQSxDQUFKLENBQWtCLG9CQUFsQixFQUF3QyxRQUF4QyxFQUFrRCxVQUFsRDtBQUNBLFNBQU87QUFMa0IiLCJzb3VyY2VzQ29udGVudCI6WyJyZWdleFdoaXRlc3BhY2UgPSAvXFxzKy9cblxuUXVpY2tFbGVtZW50OjpvbiA9IChldmVudE5hbWVzLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSwgaXNQcml2YXRlKS0+XG5cdEBfZXZlbnRDYWxsYmFja3MgPz0ge19fcmVmczp7fX1cblx0XG5cdGlmIElTLnN0cmluZyhldmVudE5hbWVzKSBhbmQgSVMuZnVuY3Rpb24oY2FsbGJhY2spXG5cdFx0c3BsaXQgPSBldmVudE5hbWVzLnNwbGl0KCcuJylcblx0XHRjYWxsYmFja1JlZiA9IHNwbGl0WzFdXG5cdFx0ZXZlbnROYW1lcyA9IHNwbGl0WzBdXG5cdFx0XG5cdFx0aWYgZXZlbnROYW1lcyBpcyAnaW5zZXJ0ZWQnIGFuZCBAX2luc2VydGVkXG5cdFx0XHRjYWxsYmFjay5jYWxsKEAsIEBfcGFyZW50KVxuXHRcdFx0cmV0dXJuIEBcblx0XHRcblx0XHRldmVudE5hbWVzLnNwbGl0KHJlZ2V4V2hpdGVzcGFjZSkuZm9yRWFjaCAoZXZlbnROYW1lKT0+XG5cdFx0XHRpZiBub3QgQF9ldmVudENhbGxiYWNrc1tldmVudE5hbWVdXG5cdFx0XHRcdEBfZXZlbnRDYWxsYmFja3NbZXZlbnROYW1lXSA9IFtdXHRcdFxuXHRcdFx0XHRcblx0XHRcdFx0dW5sZXNzIGlzUHJpdmF0ZSB0aGVuIEBfbGlzdGVuVG8gZXZlbnROYW1lLCAoZXZlbnQpPT5cblx0XHRcdFx0XHRAX2ludm9rZUhhbmRsZXJzKGV2ZW50TmFtZSwgZXZlbnQpXG5cdFx0XHRcdCwgdXNlQ2FwdHVyZVxuXG5cdFx0XHRAX2V2ZW50Q2FsbGJhY2tzLl9fcmVmc1tjYWxsYmFja1JlZl0gPSBjYWxsYmFjayBpZiBjYWxsYmFja1JlZlxuXHRcdFx0QF9ldmVudENhbGxiYWNrc1tldmVudE5hbWVdLnB1c2goY2FsbGJhY2spXG5cblx0cmV0dXJuIEBcblxuXG5RdWlja0VsZW1lbnQ6Om9uY2UgPSAoZXZlbnROYW1lcywgY2FsbGJhY2spLT5cblx0aWYgSVMuc3RyaW5nKGV2ZW50TmFtZXMpIGFuZCBJUy5mdW5jdGlvbihjYWxsYmFjaylcblx0XHRAb24gZXZlbnROYW1lcywgb25jZUNhbGxiYWNrPShldmVudCk9PlxuXHRcdFx0QG9mZihldmVudE5hbWVzLCBvbmNlQ2FsbGJhY2spXG5cdFx0XHRjYWxsYmFjay5jYWxsKEAsIGV2ZW50KVxuXHRcblx0cmV0dXJuIEBcblxuXG5cblF1aWNrRWxlbWVudDo6b2ZmID0gKGV2ZW50TmFtZXMsIGNhbGxiYWNrKS0+XG5cdEBfZXZlbnRDYWxsYmFja3MgPz0ge19fcmVmczp7fX1cblx0aWYgbm90IElTLnN0cmluZyhldmVudE5hbWVzKVxuXHRcdEBvZmYoZXZlbnROYW1lKSBmb3IgZXZlbnROYW1lIG9mIEBfZXZlbnRDYWxsYmFja3Ncblx0XG5cdGVsc2Vcblx0XHRzcGxpdCA9IGV2ZW50TmFtZXMuc3BsaXQoJy4nKVxuXHRcdGNhbGxiYWNrUmVmID0gc3BsaXRbMV1cblx0XHRldmVudE5hbWVzID0gc3BsaXRbMF1cblx0XHRldmVudE5hbWVzLnNwbGl0KHJlZ2V4V2hpdGVzcGFjZSkuZm9yRWFjaCAoZXZlbnROYW1lKT0+XG5cdFx0XHRpZiBAX2V2ZW50Q2FsbGJhY2tzW2V2ZW50TmFtZV1cblx0XHRcdFx0Y2FsbGJhY2sgPz0gQF9ldmVudENhbGxiYWNrcy5fX3JlZnNbY2FsbGJhY2tSZWZdXG5cblx0XHRcdFx0aWYgSVMuZnVuY3Rpb24oY2FsbGJhY2spXG5cdFx0XHRcdFx0aGVscGVycy5yZW1vdmVJdGVtKEBfZXZlbnRDYWxsYmFja3NbZXZlbnROYW1lXSwgY2FsbGJhY2spXG5cdFx0XHRcdGVsc2UgaWYgbm90IGNhbGxiYWNrUmVmXG5cdFx0XHRcdFx0QF9ldmVudENhbGxiYWNrc1tldmVudE5hbWVdLmxlbmd0aCA9IDBcblxuXHRyZXR1cm4gQFxuXG5cblxuUXVpY2tFbGVtZW50OjplbWl0ID0gKGV2ZW50TmFtZSwgYnViYmxlcz10cnVlLCBjYW5jZWxhYmxlPXRydWUpLT5cblx0aWYgZXZlbnROYW1lIGFuZCBJUy5zdHJpbmcoZXZlbnROYW1lKVxuXHRcdGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jylcblx0XHRldmVudC5pbml0RXZlbnQoZXZlbnROYW1lLCBidWJibGVzLCBjYW5jZWxhYmxlKVxuXHRcdEBlbC5kaXNwYXRjaEV2ZW50KGV2ZW50KVxuXG5cdHJldHVybiBAXG5cblxuUXVpY2tFbGVtZW50OjplbWl0UHJpdmF0ZSA9IChldmVudE5hbWUsIGFyZyktPlxuXHRpZiBldmVudE5hbWUgYW5kIElTLnN0cmluZyhldmVudE5hbWUpIGFuZCBAX2V2ZW50Q2FsbGJhY2tzP1tldmVudE5hbWVdXG5cdFx0QF9pbnZva2VIYW5kbGVycyhldmVudE5hbWUsIGFyZylcblx0XG5cdHJldHVybiBAXG5cblxuXG5RdWlja0VsZW1lbnQ6Ol9pbnZva2VIYW5kbGVycyA9IChldmVudE5hbWUsIGFyZyktPlxuXHRjYWxsYmFja3MgPSBAX2V2ZW50Q2FsbGJhY2tzW2V2ZW50TmFtZV0uc2xpY2UoKVxuXHRjYi5jYWxsKEAsIGFyZykgZm9yIGNiIGluIGNhbGxiYWNrc1xuXHRyZXR1cm5cblxuXG4jIyMgaXN0YW5idWwgaWdub3JlIG5leHQgIyMjXG5RdWlja0VsZW1lbnQ6Ol9saXN0ZW5UbyA9IChldmVudE5hbWUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKS0+XG5cdGxpc3Rlbk1ldGhvZCA9IGlmIEBlbC5hZGRFdmVudExpc3RlbmVyIHRoZW4gJ2FkZEV2ZW50TGlzdGVuZXInIGVsc2UgJ2F0dGFjaEV2ZW50J1xuXHRldmVudE5hbWVUb0xpc3RlbkZvciA9IGlmIEBlbC5hZGRFdmVudExpc3RlbmVyIHRoZW4gZXZlbnROYW1lIGVsc2UgXCJvbiN7ZXZlbnROYW1lfVwiXG5cdFxuXHRAZWxbbGlzdGVuTWV0aG9kXShldmVudE5hbWVUb0xpc3RlbkZvciwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpXG5cdHJldHVybiBAXG5cblxuXG5cbiJdfQ==
;

var DUMMY_ARRAY;

DUMMY_ARRAY = [];

QuickElement.prototype.state = function(targetState, value, bubbles, source) {
  var activeStates, child, desiredValue, i, j, key, keys, len, prop, ref, toggle;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0ZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxXQUFBLEdBQWM7O0FBR2QsWUFBWSxDQUFBLFNBQUUsQ0FBQSxLQUFkLEdBQXNCLFNBQUMsV0FBRCxFQUFjLEtBQWQsRUFBcUIsT0FBckIsRUFBOEIsTUFBOUI7QUFDckIsTUFBQTtFQUFBLElBQUcsU0FBUyxDQUFDLE1BQVYsS0FBb0IsQ0FBdkI7SUFDQyxJQUFHLEVBQUUsQ0FBQyxNQUFILENBQVUsV0FBVixDQUFIO0FBQ0MsYUFBTyxPQUFPLENBQUMsUUFBUixDQUFpQixJQUFDLENBQUEsTUFBbEIsRUFBMEIsV0FBMUIsRUFEUjtLQUFBLE1BR0ssSUFBRyxFQUFFLENBQUMsTUFBSCxDQUFVLFdBQVYsQ0FBSDtNQUNKLElBQUEsR0FBTyxNQUFNLENBQUMsSUFBUCxDQUFZLFdBQVo7TUFDUCxDQUFBLEdBQUksQ0FBQztBQUN5QixhQUFNLEdBQUEsR0FBSSxJQUFLLENBQUEsRUFBRSxDQUFGLENBQWY7UUFBOUIsSUFBQyxDQUFBLEtBQUQsQ0FBTyxHQUFQLEVBQVksV0FBWSxDQUFBLEdBQUEsQ0FBeEI7TUFBOEI7QUFDOUIsYUFBTyxLQUpIO0tBSk47R0FBQSxNQVVLLElBQUcsSUFBQyxDQUFBLGdCQUFELElBQXNCLE1BQUEsS0FBWSxJQUFyQztJQUNKLElBQUMsQ0FBQSxnQkFBZ0IsQ0FBQyxLQUFsQixDQUF3QixXQUF4QixFQUFxQyxLQUFyQyxFQUE0QyxPQUE1QyxFQUFxRCxJQUFyRDtBQUNBLFdBQU8sS0FGSDtHQUFBLE1BSUEsSUFBRyxFQUFFLENBQUMsTUFBSCxDQUFVLFdBQVYsQ0FBSDtJQUNKLElBQXNDLFdBQVksQ0FBQSxDQUFBLENBQVosS0FBa0IsR0FBeEQ7TUFBQSxXQUFBLEdBQWMsV0FBVyxDQUFDLEtBQVosQ0FBa0IsQ0FBbEIsRUFBZDs7SUFDQSxJQUFZLFdBQUEsS0FBZSxNQUEz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LEVBQXFDLFlBQXJDLENBQXRFO01BQUEsWUFBWSxDQUFDLElBQWIsQ0FBa0IsVUFBbEIsRUFBQTs7QUFERDtBQUdBLFNBQU87QUFQeUI7O0FBVWpDLFlBQVksQ0FBQSxTQUFFLENBQUEsZ0JBQWQsR0FBaUMsU0FBQyxNQUFELEVBQVMsV0FBVDtBQUNoQyxNQUFBO0VBQUEsSUFBb0MsV0FBcEM7SUFBQSxNQUFBLEdBQVMsQ0FBQyxNQUFELENBQVEsQ0FBQyxNQUFULENBQWdCLE1BQWhCLEVBQVQ7O0VBQ0EsTUFBQSxHQUFTO0FBRVQsT0FBQSx3Q0FBQTs7UUFBeUIsSUFBQyxDQUFBLE9BQVEsQ0FBQSxLQUFBLENBQVQsSUFBb0IsSUFBQyxDQUFBLE9BQVEsQ0FBQSxLQUFBLENBQU0sQ0FBQyxHQUFHLENBQUM7QUFDaEU7QUFBQSxXQUFBLHVDQUFBOztRQUFBLE1BQU8sQ0FBQSxLQUFNLENBQUEsQ0FBQSxDQUFOLENBQVAsR0FBbUIsS0FBTSxDQUFBLENBQUE7QUFBekI7O0FBREQ7QUFHQSxTQUFPO0FBUHlCIiwic291cmNlc0NvbnRlbnQiOlsiRFVNTVlfQVJSQVkgPSBbXVxuXG5cblF1aWNrRWxlbWVudDo6c3RhdGUgPSAodGFyZ2V0U3RhdGUsIHZhbHVlLCBidWJibGVzLCBzb3VyY2UpLT5cblx0aWYgYXJndW1lbnRzLmxlbmd0aCBpcyAxXG5cdFx0aWYgSVMuc3RyaW5nKHRhcmdldFN0YXRlKVxuXHRcdFx0cmV0dXJuIGhlbHBlcnMuaW5jbHVkZXMoQF9zdGF0ZSwgdGFyZ2V0U3RhdGUpXG5cdFx0XG5cdFx0ZWxzZSBpZiBJUy5vYmplY3QodGFyZ2V0U3RhdGUpXG5cdFx0XHRrZXlzID0gT2JqZWN0LmtleXModGFyZ2V0U3RhdGUpXG5cdFx0XHRpID0gLTFcblx0XHRcdEBzdGF0ZShrZXksIHRhcmdldFN0YXRlW2tleV0pIHdoaWxlIGtleT1rZXlzWysraV1cblx0XHRcdHJldHVybiBAXG5cblx0ZWxzZSBpZiBAX3N0YXRlUGlwZVRhcmdldCBhbmQgc291cmNlIGlzbnQgQFxuXHRcdEBfc3RhdGVQaXBlVGFyZ2V0LnN0YXRlKHRhcmdldFN0YXRlLCB2YWx1ZSwgYnViYmxlcywgQClcblx0XHRyZXR1cm4gQFxuXHRcblx0ZWxzZSBpZiBJUy5zdHJpbmcodGFyZ2V0U3RhdGUpXG5cdFx0dGFyZ2V0U3RhdGUgPSB0YXJnZXRTdGF0ZS5zbGljZSgxKSBpZiB0YXJnZXRTdGF0ZVswXSBpcyAnJCdcblx0XHRyZXR1cm4gQCBpZiB0YXJnZXRTdGF0ZSBpcyAnYmFzZSdcblx0XHRkZXNpcmVkVmFsdWUgPSAhIXZhbHVlICMgQ29udmVydCB0aGUgdmFsdWUgdG8gYSBib29sZWFuXG5cdFx0YWN0aXZlU3RhdGVzID0gQF9nZXRBY3RpdmVTdGF0ZXModGFyZ2V0U3RhdGUsIGZhbHNlKVxuXHRcdFxuXHRcdCMgPT09PSBUb2dnbGUgc3R5bGVzIGZvciB0aGlzIHN0YXRlID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRcdGlmIEBzdGF0ZSh0YXJnZXRTdGF0ZSkgaXNudCBkZXNpcmVkVmFsdWVcblx0XHRcdHByb3AgPSBpZiBAdHlwZSBpcyAndGV4dCcgdGhlbiAnVGV4dCcgZWxzZSAnU3R5bGUnXG5cdFx0XG5cdFx0XHRpZiBkZXNpcmVkVmFsdWUgI2lzIG9uXG5cdFx0XHRcdEBfc3RhdGUucHVzaCh0YXJnZXRTdGF0ZSlcblx0XHRcdFx0dG9nZ2xlID0gJ09OJ1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRoZWxwZXJzLnJlbW92ZUl0ZW0oQF9zdGF0ZSwgdGFyZ2V0U3RhdGUpXG5cdFx0XHRcdHRvZ2dsZSA9ICdPRkYnXG5cdFx0XHRcblx0XHRcdEBbJ190dXJuJytwcm9wK3RvZ2dsZV0odGFyZ2V0U3RhdGUsIGFjdGl2ZVN0YXRlcylcblx0XHRcdEBlbWl0UHJpdmF0ZSBcInN0YXRlQ2hhbmdlOiN7dGFyZ2V0U3RhdGV9XCIsIGRlc2lyZWRWYWx1ZVxuXG5cblx0XHQjID09PT0gUGFzcyBzdGF0ZSB0byBwYXJlbnQvY2hpbGRyZW4gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdFx0aWYgbm90IGhlbHBlcnMuaW5jbHVkZXMoQG9wdGlvbnMudW5wYXNzYWJsZVN0YXRlcywgdGFyZ2V0U3RhdGUpXG5cdFx0XHRpZiBidWJibGVzXG5cdFx0XHRcdEBfcGFyZW50LnN0YXRlKHRhcmdldFN0YXRlLCB2YWx1ZSwgdHJ1ZSwgc291cmNlIG9yIEApIGlmIEBwYXJlbnRcblx0XHRcdGVsc2UgaWYgQG9wdGlvbnMucGFzc1N0YXRlVG9DaGlsZHJlblxuXHRcdFx0XHRjaGlsZC5zdGF0ZSh0YXJnZXRTdGF0ZSwgdmFsdWUsIGZhbHNlLCBzb3VyY2Ugb3IgQCkgZm9yIGNoaWxkIGluIEBfY2hpbGRyZW5cblx0XHRcblx0XHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6cmVzZXRTdGF0ZSA9ICgpLT5cblx0Zm9yIGFjdGl2ZVN0YXRlIGluIEBfc3RhdGUuc2xpY2UoKVxuXHRcdEBzdGF0ZShhY3RpdmVTdGF0ZSwgb2ZmKVxuXG5cdHJldHVybiBAXG5cblxuUXVpY2tFbGVtZW50OjpwaXBlU3RhdGUgPSAodGFyZ2V0RWwpLT5cblx0aWYgdGFyZ2V0RWxcblx0XHR0YXJnZXRFbCA9IGhlbHBlcnMubm9ybWFsaXplR2l2ZW5FbCh0YXJnZXRFbClcblxuXHRcdGlmIElTLnF1aWNrRG9tRWwodGFyZ2V0RWwpIGFuZCB0YXJnZXRFbCBpc250IEBcblx0XHRcdEBfc3RhdGVQaXBlVGFyZ2V0ID0gdGFyZ2V0RWxcblx0XHRcdHRhcmdldEVsLnN0YXRlKGFjdGl2ZVN0YXRlLCBvbikgZm9yIGFjdGl2ZVN0YXRlIGluIEBfc3RhdGVcblxuXHRlbHNlIGlmIHRhcmdldEVsIGlzIGZhbHNlXG5cdFx0ZGVsZXRlIEBfc3RhdGVQaXBlVGFyZ2V0XG5cblx0cmV0dXJuIEBcblxuXG5cblxuUXVpY2tFbGVtZW50OjpfYXBwbHlSZWdpc3RlcmVkU3R5bGUgPSAodGFyZ2V0U3R5bGUsIHN1cGVyaW9yU3RhdGVzLCBpbmNsdWRlQmFzZSwgc2tpcEZucyktPiBpZiB0YXJnZXRTdHlsZVxuXHRAYWRkQ2xhc3MoY2xhc3NOYW1lKSBmb3IgY2xhc3NOYW1lIGluIHRhcmdldFN0eWxlLmNsYXNzTmFtZVxuXHRcblx0aWYgdGFyZ2V0U3R5bGUuZm5zLmxlbmd0aCBhbmQgbm90IHNraXBGbnNcblx0XHRzdXBlcmlvclN0eWxlcyA9IEBfcmVzb2x2ZUZuU3R5bGVzKHN1cGVyaW9yU3RhdGVzLCBpbmNsdWRlQmFzZSkgaWYgc3VwZXJpb3JTdGF0ZXNcblx0XHRcblx0XHRmb3IgZW50cnkgaW4gdGFyZ2V0U3R5bGUuZm5zXG5cdFx0XHRAc3R5bGUoZW50cnlbMF0sIGVudHJ5WzFdKSB1bmxlc3Mgc3VwZXJpb3JTdHlsZXMgYW5kIHN1cGVyaW9yU3R5bGVzW2VudHJ5WzBdXVxuXHRcblx0cmV0dXJuXG5cblxuUXVpY2tFbGVtZW50OjpfcmVtb3ZlUmVnaXN0ZXJlZFN0eWxlID0gKHRhcmdldFN0eWxlLCBzdXBlcmlvclN0YXRlcywgaW5jbHVkZUJhc2UpLT5cblx0QHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkgZm9yIGNsYXNzTmFtZSBpbiB0YXJnZXRTdHlsZS5jbGFzc05hbWVcblxuXHRpZiB0YXJnZXRTdHlsZS5mbnMubGVuZ3RoXG5cdFx0c3VwZXJpb3JTdHlsZXMgPSBAX3Jlc29sdmVGblN0eWxlcyhzdXBlcmlvclN0YXRlcywgaW5jbHVkZUJhc2UpIGlmIHN1cGVyaW9yU3RhdGVzXG5cdFx0XG5cdFx0Zm9yIGVudHJ5IGluIHRhcmdldFN0eWxlLmZuc1xuXHRcdFx0cmVzZXRWYWx1ZSA9IHN1cGVyaW9yU3R5bGVzIGFuZCBzdXBlcmlvclN0eWxlc1tlbnRyeVswXV0gb3IgbnVsbFxuXHRcdFx0QHN0eWxlKGVudHJ5WzBdLCByZXNldFZhbHVlKVxuXG5cdHJldHVyblxuXG5cblxuXG5RdWlja0VsZW1lbnQ6Ol90dXJuU3R5bGVPTiA9ICh0YXJnZXRTdGF0ZSwgYWN0aXZlU3RhdGVzKS0+XG5cdHNraXBGbnMgPSBAb3B0aW9ucy5zdHlsZUFmdGVySW5zZXJ0IGFuZCBub3QgQF9pbnNlcnRlZFxuXHRpZiBAX3N0eWxlc1t0YXJnZXRTdGF0ZV1cblx0XHRAX2FwcGx5UmVnaXN0ZXJlZFN0eWxlKEBfc3R5bGVzW3RhcmdldFN0YXRlXSwgQF9nZXRTdXBlcmlvclN0YXRlcyh0YXJnZXRTdGF0ZSwgYWN0aXZlU3RhdGVzKSwgZmFsc2UsIHNraXBGbnMpXG5cblxuXHRpZiBAX3Byb3ZpZGVkU3RhdGVzU2hhcmVkXG5cdFx0c2hhcmVkU3RhdGVzID0gQF9nZXRTaGFyZWRTdGF0ZXModGFyZ2V0U3RhdGUpXG5cdFx0XG5cdFx0Zm9yIHN0YXRlQ2hhaW4gaW4gc2hhcmVkU3RhdGVzXG5cdFx0XHRAX3N0YXRlU2hhcmVkLnB1c2goc3RhdGVDaGFpbi5zdHJpbmcpIHVubGVzcyBoZWxwZXJzLmluY2x1ZGVzKEBfc3RhdGVTaGFyZWQsIHN0YXRlQ2hhaW4uc3RyaW5nKVxuXHRcdFx0QF9hcHBseVJlZ2lzdGVyZWRTdHlsZShAX3N0eWxlc1tzdGF0ZUNoYWluLnN0cmluZ10sIG51bGwsIG51bGwsIHNraXBGbnMpXG5cblx0cmV0dXJuXG5cblxuUXVpY2tFbGVtZW50OjpfdHVyblN0eWxlT0ZGID0gKHRhcmdldFN0YXRlLCBhY3RpdmVTdGF0ZXMpLT5cblx0aWYgQF9zdHlsZXNbdGFyZ2V0U3RhdGVdXG5cdFx0QF9yZW1vdmVSZWdpc3RlcmVkU3R5bGUoQF9zdHlsZXNbdGFyZ2V0U3RhdGVdLCBhY3RpdmVTdGF0ZXMsIHRydWUpXG5cblx0aWYgQF9wcm92aWRlZFN0YXRlc1NoYXJlZFxuXHRcdHNoYXJlZFN0YXRlcyA9IEBfZ2V0U2hhcmVkU3RhdGVzKHRhcmdldFN0YXRlKVxuXHRcdHJldHVybiBpZiBzaGFyZWRTdGF0ZXMubGVuZ3RoIGlzIDBcblxuXHRcdGZvciBzdGF0ZUNoYWluIGluIHNoYXJlZFN0YXRlc1xuXHRcdFx0aGVscGVycy5yZW1vdmVJdGVtKEBfc3RhdGVTaGFyZWQsIHN0YXRlQ2hhaW4uc3RyaW5nKVxuXHRcdFx0dGFyZ2V0U3R5bGUgPSBAX3N0eWxlc1tzdGF0ZUNoYWluLnN0cmluZ11cblx0XHRcdFxuXHRcdFx0aWYgdGFyZ2V0U3R5bGUuZm5zLmxlbmd0aCBhbmQgQF9zdGF0ZVNoYXJlZC5sZW5ndGggYW5kIG5vdCBhY3RpdmVTaGFyZWRTdGF0ZXNcblx0XHRcdFx0YWN0aXZlU2hhcmVkU3RhdGVzID0gQF9zdGF0ZVNoYXJlZC5maWx0ZXIgKHN0YXRlKS0+IG5vdCBoZWxwZXJzLmluY2x1ZGVzKHN0YXRlLCB0YXJnZXRTdGF0ZSlcblx0XHRcdFx0YWN0aXZlU3RhdGVzID0gYWN0aXZlU3RhdGVzLmNvbmNhdChhY3RpdmVTaGFyZWRTdGF0ZXMpXG5cdFx0XHRcblx0XHRcdEBfcmVtb3ZlUmVnaXN0ZXJlZFN0eWxlKHRhcmdldFN0eWxlLCBhY3RpdmVTdGF0ZXMsIHRydWUpXG5cblx0cmV0dXJuXG5cblxuXG5RdWlja0VsZW1lbnQ6Ol90dXJuVGV4dE9OID0gKHRhcmdldFN0YXRlLCBhY3RpdmVTdGF0ZXMpLT5cblx0aWYgQF90ZXh0cyBhbmQgSVMuc3RyaW5nKHRhcmdldFRleHQgPSBAX3RleHRzW3RhcmdldFN0YXRlXSlcblx0XHRzdXBlcmlvclN0YXRlcyA9IEBfZ2V0U3VwZXJpb3JTdGF0ZXModGFyZ2V0U3RhdGUsIGFjdGl2ZVN0YXRlcylcblx0XHRcblx0XHRAdGV4dCA9IHRhcmdldFRleHQgdW5sZXNzIHN1cGVyaW9yU3RhdGVzLmxlbmd0aFxuXHRyZXR1cm5cblxuXG5RdWlja0VsZW1lbnQ6Ol90dXJuVGV4dE9GRiA9ICh0YXJnZXRTdGF0ZSwgYWN0aXZlU3RhdGVzKS0+XG5cdGlmIEBfdGV4dHMgYW5kIElTLnN0cmluZyh0YXJnZXRUZXh0ID0gQF90ZXh0c1t0YXJnZXRTdGF0ZV0pXG5cdFx0YWN0aXZlU3RhdGVzID0gYWN0aXZlU3RhdGVzLmZpbHRlciAoc3RhdGUpLT4gc3RhdGUgaXNudCB0YXJnZXRTdGF0ZVxuXHRcdHRhcmdldFRleHQgPSBAX3RleHRzW2FjdGl2ZVN0YXRlc1thY3RpdmVTdGF0ZXMubGVuZ3RoLTFdXVxuXHRcdHRhcmdldFRleHQgPz0gQF90ZXh0cy5iYXNlXG5cdFx0XG5cdFx0QHRleHQgPSB0YXJnZXRUZXh0XG5cdHJldHVyblxuXG5cblxuXG5cdFxuXG5cblxuXG5RdWlja0VsZW1lbnQ6Ol9nZXRBY3RpdmVTdGF0ZXMgPSAoc3RhdGVUb0V4Y2x1ZGUsIGluY2x1ZGVTaGFyZWRTdGF0ZXM9dHJ1ZSktPlxuXHRyZXR1cm4gRFVNTVlfQVJSQVkgaWYgbm90IEBfcHJvdmlkZWRTdGF0ZXNcblx0YWN0aXZlU3RhdGVzID0gcGxhaW5TdGF0ZXMgPSBAX3N0YXRlXG5cdGlmIHN0YXRlVG9FeGNsdWRlXG5cdFx0cGxhaW5TdGF0ZXMgPSBbXVxuXHRcdHBsYWluU3RhdGVzLnB1c2goc3RhdGUpIGZvciBzdGF0ZSBpbiBhY3RpdmVTdGF0ZXMgd2hlbiBzdGF0ZSBpc250IHN0YXRlVG9FeGNsdWRlXG5cdFxuXHRpZiBub3QgaW5jbHVkZVNoYXJlZFN0YXRlcyBvciBub3QgQF9wcm92aWRlZFN0YXRlc1NoYXJlZFxuXHRcdHJldHVybiBwbGFpblN0YXRlc1xuXHRlbHNlXG5cdFx0cmV0dXJuIHBsYWluU3RhdGVzLmNvbmNhdChAX3N0YXRlU2hhcmVkKVxuXG5cblF1aWNrRWxlbWVudDo6X2dldFN1cGVyaW9yU3RhdGVzID0gKHRhcmdldFN0YXRlLCBhY3RpdmVTdGF0ZXMpLT5cblx0dGFyZ2V0U3RhdGVJbmRleCA9IEBfcHJvdmlkZWRTdGF0ZXMuaW5kZXhPZih0YXJnZXRTdGF0ZSlcblx0cmV0dXJuIERVTU1ZX0FSUkFZIGlmIHRhcmdldFN0YXRlSW5kZXggaXMgQF9wcm92aWRlZFN0YXRlcy5sZW5ndGggLSAxXG5cdFxuXHRzdXBlcmlvciA9IFtdXG5cdGZvciBjYW5kaWRhdGUgaW4gYWN0aXZlU3RhdGVzXG5cdFx0c3VwZXJpb3IucHVzaChjYW5kaWRhdGUpIGlmIEBfcHJvdmlkZWRTdGF0ZXMuaW5kZXhPZihjYW5kaWRhdGUpID4gdGFyZ2V0U3RhdGVJbmRleFxuXG5cdHJldHVybiBzdXBlcmlvclxuXG5cblF1aWNrRWxlbWVudDo6X2dldFNoYXJlZFN0YXRlcyA9ICh0YXJnZXRTdGF0ZSktPlxuXHRhY3RpdmVTdGF0ZXMgPSBAX3N0YXRlXG5cdHNoYXJlZFN0YXRlcyA9IFtdXG5cblx0Zm9yIHN0YXRlQ2hhaW4gaW4gQF9wcm92aWRlZFN0YXRlc1NoYXJlZFxuXHRcdHNoYXJlZFN0YXRlcy5wdXNoKHN0YXRlQ2hhaW4pIGlmIHN0YXRlQ2hhaW4uaW5jbHVkZXModGFyZ2V0U3RhdGUpIGFuZCBzdGF0ZUNoYWluLmlzQXBwbGljYWJsZSh0YXJnZXRTdGF0ZSwgYWN0aXZlU3RhdGVzKVxuXG5cdHJldHVybiBzaGFyZWRTdGF0ZXNcblxuXG5RdWlja0VsZW1lbnQ6Ol9yZXNvbHZlRm5TdHlsZXMgPSAoc3RhdGVzLCBpbmNsdWRlQmFzZSktPlxuXHRzdGF0ZXMgPSBbJ2Jhc2UnXS5jb25jYXQoc3RhdGVzKSBpZiBpbmNsdWRlQmFzZVxuXHRvdXRwdXQgPSB7fVxuXHRcblx0Zm9yIHN0YXRlIGluIHN0YXRlcyB3aGVuIEBfc3R5bGVzW3N0YXRlXSBhbmQgQF9zdHlsZXNbc3RhdGVdLmZucy5sZW5ndGhcblx0XHRvdXRwdXRbZW50cnlbMF1dID0gZW50cnlbMV0gZm9yIGVudHJ5IGluIEBfc3R5bGVzW3N0YXRlXS5mbnNcblxuXHRyZXR1cm4gb3V0cHV0XG5cblxuXG5cblxuXG5cblxuXG4iXX0=
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHlsZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7QUFBQSxJQUFBOztBQVNBLFlBQVksQ0FBQSxTQUFFLENBQUEsS0FBZCxHQUFzQixTQUFDLFFBQUQ7QUFDckIsTUFBQTtFQUFBLElBQVUsSUFBQyxDQUFBLElBQUQsS0FBUyxNQUFuQjtBQUFBLFdBQUE7O0VBQ0EsSUFBQSxHQUFPO0VBRVAsSUFBRyxFQUFFLENBQUMsTUFBSCxDQUFVLFFBQVYsQ0FBSDtJQUNDLEtBQUEsR0FBVyxPQUFPLElBQUssQ0FBQSxDQUFBLENBQVosS0FBa0IsVUFBckIsR0FBcUMsSUFBSyxDQUFBLENBQUEsQ0FBRSxDQUFDLElBQVIsQ0FBYSxJQUFiLEVBQWdCLElBQUMsQ0FBQSxPQUFqQixDQUFyQyxHQUFvRSxJQUFLLENBQUEsQ0FBQTtJQUNqRixJQUFxQixJQUFLLENBQUEsQ0FBQSxDQUFMLEtBQVcsSUFBWCxJQUFvQixFQUFFLENBQUMsT0FBSCxDQUFXLElBQUMsQ0FBQSxpQkFBRCxDQUFtQixRQUFuQixDQUFYLENBQXBCLElBQWlFLENBQUksRUFBRSxFQUFDLFFBQUQsRUFBRixDQUFZLElBQUMsQ0FBQSxpQkFBRCxDQUFtQixRQUFuQixDQUFaLENBQTFGO01BQUEsS0FBQSxHQUFRLEdBQUcsQ0FBQyxNQUFaOztJQUNBLE1BQUEsR0FBUyxHQUFBLENBQUksSUFBQyxDQUFBLEVBQUwsRUFBUyxRQUFULEVBQW1CLEtBQW5CLEVBQTBCLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBbkM7SUFFVCxJQUFHLElBQUksQ0FBQyxNQUFMLEtBQWUsQ0FBbEI7O0FBQ0M7TUFDTyxJQUFHLElBQUMsQ0FBQSxTQUFKO2VBQW1CLE9BQW5CO09BQUEsTUFBK0IsSUFBRyxDQUFJLE1BQVA7ZUFBbUIsT0FBbkI7T0FBQSxNQUFBO2VBQStCLEdBQS9CO09BRnZDO0tBTEQ7R0FBQSxNQVNLLElBQUcsRUFBRSxDQUFDLE1BQUgsQ0FBVSxRQUFWLENBQUg7SUFDSixJQUFBLEdBQU8sTUFBTSxDQUFDLElBQVAsQ0FBWSxRQUFaO0lBQXVCLENBQUEsR0FBSSxDQUFDO0FBQ1IsV0FBTSxHQUFBLEdBQUksSUFBSyxDQUFBLEVBQUUsQ0FBRixDQUFmO01BQTNCLElBQUMsQ0FBQSxLQUFELENBQU8sR0FBUCxFQUFZLFFBQVMsQ0FBQSxHQUFBLENBQXJCO0lBQTJCLENBRnZCOztBQUlMLFNBQU87QUFqQmM7OztBQW9CdEI7Ozs7Ozs7O0FBT0EsWUFBWSxDQUFBLFNBQUUsQ0FBQSxTQUFkLEdBQTBCLFNBQUMsUUFBRCxFQUFXLFlBQVg7QUFDekIsTUFBQTtFQUFBLElBQVUsSUFBQyxDQUFBLElBQUQsS0FBUyxNQUFuQjtBQUFBLFdBQUE7O0VBQ0EsTUFBQSxHQUFTLElBQUMsQ0FBQSxFQUFFLENBQUMsS0FBTSxDQUFBLFFBQUE7RUFFbkIsSUFBRyxFQUFFLENBQUMsTUFBSCxDQUFVLE1BQVYsQ0FBQSxJQUFxQixFQUFFLENBQUMsTUFBSCxDQUFVLE1BQVYsQ0FBeEI7SUFDQyxRQUFBLEdBQWMsWUFBSCxHQUFxQixDQUFyQixHQUE0QixJQUFDLENBQUEsS0FBRCxDQUFPLFFBQVA7SUFDdkMsTUFBQSxHQUFTLFFBQUEsSUFBWSxJQUFDLENBQUEsRUFBRSxDQUFDLEtBQU0sQ0FBQSxRQUFBLENBQXRCLElBQW1DLElBQUMsQ0FBQSxpQkFBRCxDQUFtQixRQUFuQixDQUFuQyxJQUFtRTtJQUNyRSxJQUFHLE9BQU8sTUFBUCxLQUFpQixVQUFwQjthQUFvQyxNQUFNLENBQUMsSUFBUCxDQUFZLElBQVosRUFBZSxJQUFDLENBQUEsT0FBaEIsRUFBcEM7S0FBQSxNQUFBO2FBQWtFLE9BQWxFO0tBSFI7O0FBS0EsU0FBTztBQVRrQjs7QUFZMUIsWUFBWSxDQUFBLFNBQUUsQ0FBQSxXQUFkLEdBQTRCLFNBQUMsUUFBRCxFQUFXLFlBQVg7U0FDM0IsVUFBQSxDQUFXLElBQUMsQ0FBQSxTQUFELENBQVcsUUFBWCxFQUFxQixZQUFyQixDQUFYO0FBRDJCOztBQUk1QixZQUFZLENBQUEsU0FBRSxDQUFBLFdBQWQsR0FBNEIsU0FBQyxjQUFEO0FBQzNCLE1BQUE7RUFBQSxZQUFBLEdBQWUsSUFBQyxDQUFBLGdCQUFELENBQWtCLElBQUMsQ0FBQSxnQkFBRCxDQUFBLENBQWxCLEVBQXVDLElBQXZDO0VBRWYsSUFBQyxDQUFBLEtBQUQsQ0FBTyxZQUFQO0VBRUEsSUFBRyxjQUFIO0FBQ0M7QUFBQSxTQUFBLHFDQUFBOztNQUFBLEtBQUssQ0FBQyxXQUFOLENBQUE7QUFBQSxLQUREOztBQUdBLFNBQU87QUFSb0I7O0FBVzVCLFlBQVksQ0FBQSxTQUFFLENBQUEsaUJBQWQsR0FBa0MsU0FBQyxRQUFEO0FBQWEsTUFBQTtFQUFBLElBQUcsUUFBSDtJQUM5QyxJQUFHLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBWDtNQUNDLE1BQUEsR0FBUyxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQVIsQ0FBQTtNQUNULElBQWlDLElBQUMsQ0FBQSxZQUFELElBQWtCLElBQUMsQ0FBQSxZQUFZLENBQUMsTUFBakU7UUFBQSxNQUFNLENBQUMsSUFBUCxlQUFZLElBQUMsQ0FBQSxZQUFiLEVBQUE7O01BQ0EsQ0FBQSxHQUFJLE1BQU0sQ0FBQztBQUNYLGFBQU0sS0FBQSxHQUFRLE1BQU8sQ0FBQSxFQUFFLENBQUYsQ0FBckI7UUFDQyxJQUF5QyxJQUFDLENBQUEsT0FBUSxDQUFBLEtBQUEsQ0FBVCxJQUFvQixFQUFFLENBQUMsT0FBSCxDQUFXLElBQUMsQ0FBQSxPQUFRLENBQUEsS0FBQSxDQUFNLENBQUMsSUFBSyxDQUFBLFFBQUEsQ0FBaEMsQ0FBN0Q7QUFBQSxpQkFBTyxJQUFDLENBQUEsT0FBUSxDQUFBLEtBQUEsQ0FBTSxDQUFDLElBQUssQ0FBQSxRQUFBLEVBQTVCOztNQURELENBSkQ7O0lBT0EsSUFBdUMsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFoRDtBQUFBLGFBQU8sSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSyxDQUFBLFFBQUEsRUFBMUI7S0FSOEM7O0FBQWI7O0FBV2xDLFlBQVksQ0FBQSxTQUFFLENBQUEsSUFBZCxHQUFxQixTQUFBO1NBQ3BCLElBQUMsQ0FBQSxLQUFELENBQU8sU0FBUCxFQUFrQixNQUFsQjtBQURvQjs7QUFJckIsWUFBWSxDQUFBLFNBQUUsQ0FBQSxJQUFkLEdBQXFCLFNBQUMsT0FBRDtBQUNwQixNQUFBO0VBQUEsSUFBRyxDQUFJLE9BQVA7SUFDQyxPQUFBLEdBQVUsSUFBQyxDQUFBLGlCQUFELENBQW1CLFNBQW5CO0lBQ1YsSUFBcUIsT0FBQSxLQUFXLE1BQVgsSUFBcUIsQ0FBSSxPQUE5QztNQUFBLE9BQUEsR0FBVSxRQUFWO0tBRkQ7OztJQUlBLGtEQUF3QixDQUFFLGlCQUFmLElBQTBCOztTQUNyQyxJQUFDLENBQUEsS0FBRCxDQUFPLFNBQVAsRUFBa0IsT0FBbEI7QUFOb0I7O0FBVXJCLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixZQUFZLENBQUEsU0FBcEMsRUFDQztFQUFBLGFBQUEsRUFBZSxpQkFBQSxHQUFvQjtJQUFBLEdBQUEsRUFBSyxTQUFBO01BQUssSUFBRyxJQUFDLENBQUEsS0FBRCxHQUFTLElBQUMsQ0FBQSxNQUFiO2VBQXlCLFlBQXpCO09BQUEsTUFBQTtlQUEwQyxXQUExQzs7SUFBTCxDQUFMO0dBQW5DO0VBQ0EsYUFBQSxFQUFlLGlCQUFBLEdBQW9CO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBSyxJQUFDLENBQUEsS0FBRCxHQUFPLElBQUMsQ0FBQTtJQUFiLENBQUw7R0FEbkM7RUFFQSxNQUFBLEVBQVE7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFLLElBQUMsQ0FBQSxFQUFFLENBQUMscUJBQUosQ0FBQTtJQUFMLENBQUw7R0FGUjtFQUdBLE9BQUEsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUssVUFBQSxDQUFXLElBQUMsQ0FBQSxLQUFELENBQU8sT0FBUCxDQUFYO0lBQUwsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVSxJQUFDLENBQUEsS0FBRCxDQUFPLE9BQVAsRUFBZ0IsS0FBaEI7SUFBVixDQURMO0dBSkQ7RUFNQSxRQUFBLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFLLFVBQUEsQ0FBVyxJQUFDLENBQUEsS0FBRCxDQUFPLFFBQVAsQ0FBWDtJQUFMLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVUsSUFBQyxDQUFBLEtBQUQsQ0FBTyxRQUFQLEVBQWlCLEtBQWpCO0lBQVYsQ0FETDtHQVBEO0NBREQiLCJzb3VyY2VzQ29udGVudCI6WyIjIyMqXG4gKiBTZXRzL2dldHMgdGhlIHZhbHVlIG9mIGEgc3R5bGUgcHJvcGVydHkuIEluIGdldHRlciBtb2RlIHRoZSBjb21wdXRlZCBwcm9wZXJ0eSBvZlxuICogdGhlIHN0eWxlIHdpbGwgYmUgcmV0dXJuZWQgdW5sZXNzIHRoZSBlbGVtZW50IGlzIG5vdCBpbnNlcnRlZCBpbnRvIHRoZSBET00uIEluXG4gKiB3ZWJraXQgYnJvd3NlcnMgYWxsIGNvbXB1dGVkIHByb3BlcnRpZXMgb2YgYSBkZXRhY2hlZCBub2RlIGFyZSBhbHdheXMgYW4gZW1wdHlcbiAqIHN0cmluZyBidXQgaW4gZ2Vja28gdGhleSByZWZsZWN0IG9uIHRoZSBhY3R1YWwgY29tcHV0ZWQgdmFsdWUsIGhlbmNlIHdlIG5lZWRcbiAqIHRvIFwibm9ybWFsaXplXCIgdGhpcyBiZWhhdmlvciBhbmQgbWFrZSBzdXJlIHRoYXQgZXZlbiBvbiBnZWNrbyBhbiBlbXB0eSBzdHJpbmdcbiAqIGlzIHJldHVybmVkXG4gKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cbiMjI1xuUXVpY2tFbGVtZW50OjpzdHlsZSA9IChwcm9wZXJ0eSktPlxuXHRyZXR1cm4gaWYgQHR5cGUgaXMgJ3RleHQnXG5cdGFyZ3MgPSBhcmd1bWVudHNcblx0XG5cdGlmIElTLnN0cmluZyhwcm9wZXJ0eSlcblx0XHR2YWx1ZSA9IGlmIHR5cGVvZiBhcmdzWzFdIGlzICdmdW5jdGlvbicgdGhlbiBhcmdzWzFdLmNhbGwoQCwgQHJlbGF0ZWQpIGVsc2UgYXJnc1sxXVxuXHRcdHZhbHVlID0gQ1NTLlVOU0VUIGlmIGFyZ3NbMV0gaXMgbnVsbCBhbmQgSVMuZGVmaW5lZChAY3VycmVudFN0YXRlU3R5bGUocHJvcGVydHkpKSBhbmQgbm90IElTLmZ1bmN0aW9uKEBjdXJyZW50U3RhdGVTdHlsZShwcm9wZXJ0eSkpXG5cdFx0cmVzdWx0ID0gQ1NTKEBlbCwgcHJvcGVydHksIHZhbHVlLCBAb3B0aW9ucy5mb3JjZVN0eWxlKVxuXHRcdFxuXHRcdGlmIGFyZ3MubGVuZ3RoIGlzIDFcblx0XHRcdCMjIyBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAjIyNcblx0XHRcdHJldHVybiBpZiBAX2luc2VydGVkIHRoZW4gcmVzdWx0IGVsc2UgaWYgbm90IHJlc3VsdCB0aGVuIHJlc3VsdCBlbHNlICcnXG5cblx0ZWxzZSBpZiBJUy5vYmplY3QocHJvcGVydHkpXG5cdFx0a2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnR5KTsgaSA9IC0xXG5cdFx0QHN0eWxlKGtleSwgcHJvcGVydHlba2V5XSkgd2hpbGUga2V5PWtleXNbKytpXVxuXG5cdHJldHVybiBAXG5cblxuIyMjKlxuICogQXR0ZW1wdHMgdG8gcmVzb2x2ZSB0aGUgdmFsdWUgZm9yIGEgZ2l2ZW4gcHJvcGVydHkgaW4gdGhlIGZvbGxvd2luZyBvcmRlciBpZiBlYWNoIG9uZSBpc24ndCBhIHZhbGlkIHZhbHVlOlxuICogMS4gZnJvbSBjb21wdXRlZCBzdHlsZSAoZm9yIGRvbS1pbnNlcnRlZCBlbHMpXG4gKiAyLiBmcm9tIERPTUVsZW1lbnQuc3R5bGUgb2JqZWN0IChmb3Igbm9uLWluc2VydGVkIGVsczsgaWYgb3B0aW9ucy5zdHlsZUFmdGVySW5zZXJ0LCB3aWxsIG9ubHkgaGF2ZSBzdGF0ZSBzdHlsZXMpXG4gKiAzLiBmcm9tIHByb3ZpZGVkIHN0eWxlIG9wdGlvbnNcbiAqIChmb3Igbm9uLWluc2VydGVkIGVsczsgY2hlY2tpbmcgb25seSAkYmFzZSBzaW5jZSBzdGF0ZSBzdHlsZXMgd2lsbCBhbHdheXMgYmUgYXBwbGllZCB0byB0aGUgc3R5bGUgb2JqZWN0IGV2ZW4gZm9yIG5vbi1pbnNlcnRlZClcbiMjI1xuUXVpY2tFbGVtZW50OjpzdHlsZVNhZmUgPSAocHJvcGVydHksIHNraXBDb21wdXRlZCktPlxuXHRyZXR1cm4gaWYgQHR5cGUgaXMgJ3RleHQnXG5cdHNhbXBsZSA9IEBlbC5zdHlsZVtwcm9wZXJ0eV1cblxuXHRpZiBJUy5zdHJpbmcoc2FtcGxlKSBvciBJUy5udW1iZXIoc2FtcGxlKVxuXHRcdGNvbXB1dGVkID0gaWYgc2tpcENvbXB1dGVkIHRoZW4gMCBlbHNlIEBzdHlsZShwcm9wZXJ0eSlcblx0XHRyZXN1bHQgPSBjb21wdXRlZCBvciBAZWwuc3R5bGVbcHJvcGVydHldIG9yIEBjdXJyZW50U3RhdGVTdHlsZShwcm9wZXJ0eSkgb3IgJydcblx0XHRyZXR1cm4gaWYgdHlwZW9mIHJlc3VsdCBpcyAnZnVuY3Rpb24nIHRoZW4gcmVzdWx0LmNhbGwoQCwgQHJlbGF0ZWQpIGVsc2UgcmVzdWx0XG5cblx0cmV0dXJuIEBcblxuXG5RdWlja0VsZW1lbnQ6OnN0eWxlUGFyc2VkID0gKHByb3BlcnR5LCBza2lwQ29tcHV0ZWQpLT5cblx0cGFyc2VGbG9hdCBAc3R5bGVTYWZlKHByb3BlcnR5LCBza2lwQ29tcHV0ZWQpXG5cblxuUXVpY2tFbGVtZW50OjpyZWNhbGNTdHlsZSA9IChyZWNhbGNDaGlsZHJlbiktPlxuXHR0YXJnZXRTdHlsZXMgPSBAX3Jlc29sdmVGblN0eWxlcyhAX2dldEFjdGl2ZVN0YXRlcygpLCB0cnVlKVxuXG5cdEBzdHlsZSh0YXJnZXRTdHlsZXMpXG5cdFxuXHRpZiByZWNhbGNDaGlsZHJlblxuXHRcdGNoaWxkLnJlY2FsY1N0eWxlKCkgZm9yIGNoaWxkIGluIEBfY2hpbGRyZW5cblx0XG5cdHJldHVybiBAXG5cblxuUXVpY2tFbGVtZW50OjpjdXJyZW50U3RhdGVTdHlsZSA9IChwcm9wZXJ0eSktPiBpZiBwcm9wZXJ0eVxuXHRpZiBAX3N0YXRlLmxlbmd0aFxuXHRcdHN0YXRlcyA9IEBfc3RhdGUuc2xpY2UoKVxuXHRcdHN0YXRlcy5wdXNoKEBfc3RhdGVTaGFyZWQuLi4pIGlmIEBfc3RhdGVTaGFyZWQgYW5kIEBfc3RhdGVTaGFyZWQubGVuZ3RoXG5cdFx0aSA9IHN0YXRlcy5sZW5ndGhcblx0XHR3aGlsZSBzdGF0ZSA9IHN0YXRlc1stLWldXG5cdFx0XHRyZXR1cm4gQF9zdHlsZXNbc3RhdGVdLnJ1bGVbcHJvcGVydHldIGlmIEBfc3R5bGVzW3N0YXRlXSBhbmQgSVMuZGVmaW5lZChAX3N0eWxlc1tzdGF0ZV0ucnVsZVtwcm9wZXJ0eV0pXG5cblx0cmV0dXJuIEBfc3R5bGVzLmJhc2UucnVsZVtwcm9wZXJ0eV0gaWYgQF9zdHlsZXMuYmFzZVxuXG5cblF1aWNrRWxlbWVudDo6aGlkZSA9ICgpLT5cblx0QHN0eWxlICdkaXNwbGF5JywgJ25vbmUnXG5cblxuUXVpY2tFbGVtZW50OjpzaG93ID0gKGRpc3BsYXkpLT5cblx0aWYgbm90IGRpc3BsYXlcblx0XHRkaXNwbGF5ID0gQGN1cnJlbnRTdGF0ZVN0eWxlKCdkaXNwbGF5Jylcblx0XHRkaXNwbGF5ID0gJ2Jsb2NrJyBpZiBkaXNwbGF5IGlzICdub25lJyBvciBub3QgZGlzcGxheVxuXHRcblx0ZGlzcGxheSA/PSBAX3N0eWxlcy5iYXNlPy5kaXNwbGF5IG9yICdibG9jaydcblx0QHN0eWxlICdkaXNwbGF5JywgZGlzcGxheVxuXG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgUXVpY2tFbGVtZW50OjosXG5cdCdvcmllbnRhdGlvbic6IG9yaWVudGF0aW9uR2V0dGVyID0gZ2V0OiAoKS0+IGlmIEB3aWR0aCA+IEBoZWlnaHQgdGhlbiAnbGFuZHNjYXBlJyBlbHNlICdwb3J0cmFpdCdcblx0J2FzcGVjdFJhdGlvJzogYXNwZWN0UmF0aW9HZXR0ZXIgPSBnZXQ6ICgpLT4gQHdpZHRoL0BoZWlnaHRcblx0J3JlY3QnOiBnZXQ6ICgpLT4gQGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cdCd3aWR0aCc6XG5cdFx0Z2V0OiAoKS0+IHBhcnNlRmxvYXQgQHN0eWxlKCd3aWR0aCcpXG5cdFx0c2V0OiAodmFsdWUpLT4gQHN0eWxlICd3aWR0aCcsIHZhbHVlXG5cdCdoZWlnaHQnOlxuXHRcdGdldDogKCktPiBwYXJzZUZsb2F0IEBzdHlsZSgnaGVpZ2h0Jylcblx0XHRzZXQ6ICh2YWx1ZSktPiBAc3R5bGUgJ2hlaWdodCcsIHZhbHVlXG5cblxuIl19
;

QuickElement.prototype.attr = function(attrName, newValue) {
  switch (newValue) {
    case void 0:
      return this.el.getAttribute(attrName);
    case null:
      return this.el.removeAttribute(attrName);
    default:
      this.el.setAttribute(attrName, newValue);
      return this;
  }
};

QuickElement.prototype.prop = function(propName, newValue) {
  switch (newValue) {
    case void 0:
      return this.el[propName];
    default:
      this.el[propName] = newValue;
      return this;
  }
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlcy1hbmQtcHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF0dHJpYnV0ZXMtYW5kLXByb3BlcnRpZXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQSxTQUFFLENBQUEsSUFBZCxHQUFxQixTQUFDLFFBQUQsRUFBVyxRQUFYO0FBQXVCLFVBQU8sUUFBUDtBQUFBLFNBQ3RDLE1BRHNDO2FBQ3ZCLElBQUMsQ0FBQSxFQUFFLENBQUMsWUFBSixDQUFpQixRQUFqQjtBQUR1QixTQUV0QyxJQUZzQzthQUU1QixJQUFDLENBQUEsRUFBRSxDQUFDLGVBQUosQ0FBb0IsUUFBcEI7QUFGNEI7TUFJMUMsSUFBQyxDQUFBLEVBQUUsQ0FBQyxZQUFKLENBQWlCLFFBQWpCLEVBQTJCLFFBQTNCO0FBQ0EsYUFBTztBQUxtQztBQUF2Qjs7QUFTckIsWUFBWSxDQUFBLFNBQUUsQ0FBQSxJQUFkLEdBQXFCLFNBQUMsUUFBRCxFQUFXLFFBQVg7QUFBdUIsVUFBTyxRQUFQO0FBQUEsU0FDdEMsTUFEc0M7YUFDdkIsSUFBQyxDQUFBLEVBQUcsQ0FBQSxRQUFBO0FBRG1CO01BRzFDLElBQUMsQ0FBQSxFQUFHLENBQUEsUUFBQSxDQUFKLEdBQWdCO0FBQ2hCLGFBQU87QUFKbUM7QUFBdkIiLCJzb3VyY2VzQ29udGVudCI6WyJRdWlja0VsZW1lbnQ6OmF0dHIgPSAoYXR0ck5hbWUsIG5ld1ZhbHVlKS0+IHN3aXRjaCBuZXdWYWx1ZVxuXHR3aGVuIHVuZGVmaW5lZCB0aGVuIEBlbC5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpXG5cdHdoZW4gbnVsbCB0aGVuIEBlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpXG5cdGVsc2Vcblx0XHRAZWwuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBuZXdWYWx1ZSlcblx0XHRyZXR1cm4gQFxuXG5cblxuUXVpY2tFbGVtZW50Ojpwcm9wID0gKHByb3BOYW1lLCBuZXdWYWx1ZSktPiBzd2l0Y2ggbmV3VmFsdWVcblx0d2hlbiB1bmRlZmluZWQgdGhlbiBAZWxbcHJvcE5hbWVdXG5cdGVsc2Vcblx0XHRAZWxbcHJvcE5hbWVdID0gbmV3VmFsdWVcblx0XHRyZXR1cm4gQCJdfQ==
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuaXB1bGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFuaXB1bGF0aW9uLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUEsU0FBRSxDQUFBLFVBQWQsR0FBMkIsU0FBQTtTQUMxQixRQUFRLENBQUMsUUFBVCxDQUFrQixJQUFsQjtBQUQwQjs7QUFJM0IsWUFBWSxDQUFBLFNBQUUsQ0FBQSxLQUFkLEdBQXNCLFNBQUE7QUFDckIsTUFBQTtFQUFBLE9BQUEsR0FBVSxJQUFDLENBQUEsRUFBRSxDQUFDLFNBQUosQ0FBYyxLQUFkO0VBQ1YsT0FBQSxHQUFVLE1BQU0sQ0FBQyxLQUFQLENBQWEsSUFBQyxDQUFBLE9BQWQsRUFBdUI7SUFBQyxRQUFBLEVBQVMsT0FBVjtHQUF2QjtFQUVWLEtBQUEsR0FBUSxJQUFJLFlBQUosQ0FBaUIsSUFBQyxDQUFBLElBQWxCLEVBQXdCLE9BQXhCO0FBQ1I7QUFBQSxPQUFBLHFDQUFBOztJQUFBLEtBQUssQ0FBQyxLQUFOLENBQVksV0FBWixFQUF5QixJQUF6QjtBQUFBO0FBQ0E7QUFBQSxPQUFBLHdDQUFBOztJQUFBLEtBQUssQ0FBQyxNQUFOLENBQWEsS0FBSyxDQUFDLEtBQU4sQ0FBQSxDQUFiO0FBQUE7QUFDQTtBQUFBLE9BQUEsaUJBQUE7O0FBQ0MsU0FBQSw2Q0FBQTs7TUFBQSxLQUFLLENBQUMsRUFBTixDQUFTLFNBQVQsRUFBb0IsUUFBcEI7QUFBQTtBQUREO0FBR0EsU0FBTztBQVZjOztBQWF0QixZQUFZLENBQUEsU0FBRSxDQUFBLE1BQWQsR0FBdUIsU0FBQyxRQUFEO0FBQ3RCLE1BQUE7RUFBQSxJQUFHLFFBQUg7SUFDQyxRQUFBLEdBQVcsT0FBTyxDQUFDLGdCQUFSLENBQXlCLFFBQXpCO0lBRVgsSUFBRyxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQWQsQ0FBSDtNQUNDLFVBQUEsR0FBYSxRQUFRLENBQUM7TUFDdEIsSUFBcUMsVUFBckM7UUFBQSxVQUFVLENB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dGUgPSAoKS0+XG5cdFF1aWNrRG9tLnRlbXBsYXRlKEApXG5cblxuUXVpY2tFbGVtZW50OjpjbG9uZSA9ICgpLT5cblx0ZWxDbG9uZSA9IEBlbC5jbG9uZU5vZGUoZmFsc2UpXG5cdG9wdGlvbnMgPSBleHRlbmQuY2xvbmUoQG9wdGlvbnMsIHtleGlzdGluZzplbENsb25lfSlcblx0XG5cdG5ld0VsID0gbmV3IFF1aWNrRWxlbWVudChAdHlwZSwgb3B0aW9ucylcblx0bmV3RWwuc3RhdGUoYWN0aXZlU3RhdGUsIG9uKSBmb3IgYWN0aXZlU3RhdGUgaW4gQF9zdGF0ZVxuXHRuZXdFbC5hcHBlbmQoY2hpbGQuY2xvbmUoKSkgZm9yIGNoaWxkIGluIEBjaGlsZHJlblxuXHRmb3IgZXZlbnROYW1lLCBjYWxsYmFja3Mgb2YgQF9ldmVudENhbGxiYWNrc1xuXHRcdG5ld0VsLm9uKGV2ZW50TmFtZSwgY2FsbGJhY2spIGZvciBjYWxsYmFjayBpbiBjYWxsYmFja3Ncblx0XG5cdHJldHVybiBuZXdFbFxuXG5cblF1aWNrRWxlbWVudDo6YXBwZW5kID0gKHRhcmdldEVsKS0+XG5cdGlmIHRhcmdldEVsXG5cdFx0dGFyZ2V0RWwgPSBoZWxwZXJzLm5vcm1hbGl6ZUdpdmVuRWwodGFyZ2V0RWwpXG5cdFx0XG5cdFx0aWYgSVMucXVpY2tEb21FbCh0YXJnZXRFbClcblx0XHRcdHByZXZQYXJlbnQgPSB0YXJnZXRFbC5wYXJlbnRcblx0XHRcdHByZXZQYXJlbnQuX3JlbW92ZUNoaWxkKHRhcmdldEVsKSBpZiBwcmV2UGFyZW50XG5cdFx0XHRAX2NoaWxkcmVuLnB1c2godGFyZ2V0RWwpXG5cdFx0XHRAZWwuYXBwZW5kQ2hpbGQodGFyZ2V0RWwuZWwpXG5cdFx0XHR0YXJnZXRFbC5fcmVmcmVzaFBhcmVudCgpICMgRm9yY2UgcmUtZnJlc2ggdGFyZ2V0RWwuX3BhcmVudCB2YWx1ZSB0byB0cmlnZ2VyIGluc2VydGVkIGNhbGxiYWNrXG5cblx0cmV0dXJuIEBcblxuXG5RdWlja0VsZW1lbnQ6OmFwcGVuZFRvID0gKHRhcmdldEVsKS0+XG5cdGlmIHRhcmdldEVsXG5cdFx0dGFyZ2V0RWwgPSBoZWxwZXJzLm5vcm1hbGl6ZUdpdmVuRWwodGFyZ2V0RWwpXG5cdFx0XG5cdFx0aWYgSVMucXVpY2tEb21FbCh0YXJnZXRFbClcblx0XHRcdHRhcmdldEVsLmFwcGVuZChAKVxuXHRcblx0cmV0dXJuIEBcblxuXG5RdWlja0VsZW1lbnQ6OnByZXBlbmQgPSAodGFyZ2V0RWwpLT5cblx0aWYgdGFyZ2V0RWxcblx0XHR0YXJnZXRFbCA9IGhlbHBlcnMubm9ybWFsaXplR2l2ZW5FbCh0YXJnZXRFbClcblx0XHRcblx0XHRpZiBJUy5xdWlja0RvbUVsKHRhcmdldEVsKVxuXHRcdFx0cHJldlBhcmVudCA9IHRhcmdldEVsLnBhcmVudFxuXHRcdFx0cHJldlBhcmVudC5fcmVtb3ZlQ2hpbGQodGFyZ2V0RWwpIGlmIHByZXZQYXJlbnRcblx0XHRcdEBfY2hpbGRyZW4udW5zaGlmdCh0YXJnZXRFbClcblx0XHRcdEBlbC5pbnNlcnRCZWZvcmUodGFyZ2V0RWwuZWwsIEBlbC5maXJzdENoaWxkKVxuXHRcdFx0dGFyZ2V0RWwuX3JlZnJlc2hQYXJlbnQoKSAjIEZvcmNlIHJlLWZyZXNoIHRhcmdldEVsLl9wYXJlbnQgdmFsdWUgdG8gdHJpZ2dlciBpbnNlcnRlZCBjYWxsYmFja1xuXHRcblx0cmV0dXJuIEBcblxuXG5RdWlja0VsZW1lbnQ6OnByZXBlbmRUbyA9ICh0YXJnZXRFbCktPlxuXHRpZiB0YXJnZXRFbFxuXHRcdHRhcmdldEVsID0gaGVscGVycy5ub3JtYWxpemVHaXZlbkVsKHRhcmdldEVsKVxuXHRcdFxuXHRcdGlmIElTLnF1aWNrRG9tRWwodGFyZ2V0RWwpXG5cdFx0XHR0YXJnZXRFbC5wcmVwZW5kKEApXG5cblx0cmV0dXJuIEBcblxuXG5RdWlja0VsZW1lbnQ6OmFmdGVyID0gKHRhcmdldEVsKS0+XG5cdGlmIHRhcmdldEVsIGFuZCBAcGFyZW50XG5cdFx0dGFyZ2V0RWwgPSBoZWxwZXJzLm5vcm1hbGl6ZUdpdmVuRWwodGFyZ2V0RWwpXG5cblx0XHRpZiBJUy5xdWlja0RvbUVsKHRhcmdldEVsKVxuXHRcdFx0bXlJbmRleCA9IEBwYXJlbnQuX2NoaWxkcmVuLmluZGV4T2YoQClcblx0XHRcdEBwYXJlbnQuX2NoaWxkcmVuLnNwbGljZShteUluZGV4KzEsIDAsIHRhcmdldEVsKVxuXHRcdFx0QGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRhcmdldEVsLmVsLCBAZWwubmV4dFNpYmxpbmcpXG5cdFx0XHR0YXJnZXRFbC5fcmVmcmVzaFBhcmVudCgpICMgRm9yY2UgcmUtZnJlc2ggdGFyZ2V0RWwuX3BhcmVudCB2YWx1ZSB0byB0cmlnZ2VyIGluc2VydGVkIGNhbGxiYWNrXG5cblx0cmV0dXJuIEBcblxuXG5RdWlja0VsZW1lbnQ6Omluc2VydEFmdGVyID0gKHRhcmdldEVsKS0+XG5cdGlmIHRhcmdldEVsXG5cdFx0dGFyZ2V0RWwgPSBoZWxwZXJzLm5vcm1hbGl6ZUdpdmVuRWwodGFyZ2V0RWwpXG5cdFx0XG5cdFx0aWYgSVMucXVpY2tEb21FbCh0YXJnZXRFbClcblx0XHRcdHRhcmdldEVsLmFmdGVyKEApXG5cdFxuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6YmVmb3JlID0gKHRhcmdldEVsKS0+XG5cdGlmIHRhcmdldEVsIGFuZCBAcGFyZW50XG5cdFx0dGFyZ2V0RWwgPSBoZWxwZXJzLm5vcm1hbGl6ZUdpdmVuRWwodGFyZ2V0RWwpXG5cblx0XHRpZiBJUy5xdWlja0RvbUVsKHRhcmdldEVsKVxuXHRcdFx0bXlJbmRleCA9IEBwYXJlbnQuX2NoaWxkcmVuLmluZGV4T2YoQClcblx0XHRcdEBwYXJlbnQuX2NoaWxkcmVuLnNwbGljZShteUluZGV4LCAwLCB0YXJnZXRFbClcblx0XHRcdEBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0YXJnZXRFbC5lbCwgQGVsKVxuXHRcdFx0dGFyZ2V0RWwuX3JlZnJlc2hQYXJlbnQoKSAjIEZvcmNlIHJlLWZyZXNoIHRhcmdldEVsLl9wYXJlbnQgdmFsdWUgdG8gdHJpZ2dlciBpbnNlcnRlZCBjYWxsYmFja1xuXG5cdHJldHVybiBAXG5cblxuUXVpY2tFbGVtZW50OjppbnNlcnRCZWZvcmUgPSAodGFyZ2V0RWwpLT5cblx0aWYgdGFyZ2V0RWxcblx0XHR0YXJnZXRFbCA9IGhlbHBlcnMubm9ybWFsaXplR2l2ZW5FbCh0YXJnZXRFbClcblx0XHRcblx0XHRpZiBJUy5xdWlja0RvbUVsKHRhcmdldEVsKVxuXHRcdFx0dGFyZ2V0RWwuYmVmb3JlKEApXG5cdFxuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6ZGV0YWNoID0gKCktPlxuXHRAcGFyZW50Py5fcmVtb3ZlQ2hpbGQoQClcblx0cmV0dXJuIEBcblxuXG5RdWlja0VsZW1lbnQ6OnJlbW92ZSA9ICgpLT5cblx0QGRldGFjaCgpXG5cdEByZXNldFN0YXRlKClcblx0aWYgQF9ldmVudENhbGxiYWNrc1xuXHRcdEBfZXZlbnRDYWxsYmFja3NbZXZlbnROYW1lXS5sZW5ndGggPSAwIGZvciBldmVudE5hbWUgb2YgQF9ldmVudENhbGxiYWNrc1xuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6ZW1wdHkgPSAoKS0+XG5cdEBfcmVtb3ZlQ2hpbGQoY2hpbGQpIGZvciBjaGlsZCBpbiBAY2hpbGRyZW4uc2xpY2UoKVxuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6d3JhcCA9ICh0YXJnZXRFbCktPlxuXHRpZiB0YXJnZXRFbFxuXHRcdHRhcmdldEVsID0gaGVscGVycy5ub3JtYWxpemVHaXZlbkVsKHRhcmdldEVsKVxuXHRcdGN1cnJlbnRQYXJlbnQgPSBAcGFyZW50XG5cblx0XHRpZiBJUy5xdWlja0RvbUVsKHRhcmdldEVsKSBhbmQgdGFyZ2V0RWwgaXNudCBAIGFuZCB0YXJnZXRFbCBpc250IEBwYXJlbnRcblx0XHRcdGlmIGN1cnJlbnRQYXJlbnRcblx0XHRcdFx0Y3VycmVudFBhcmVudC5fcmVtb3ZlQ2hpbGQoQCwgaWYgbm90IHRhcmdldEVsLnBhcmVudCB0aGVuIHRhcmdldEVsKVxuXHRcdFx0XG5cdFx0XHR0YXJnZXRFbC5hcHBlbmQoQClcblxuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6dW53cmFwID0gKCktPlxuXHRwYXJlbnQgPSBAcGFyZW50XG5cdGlmIHBhcmVudFxuXHRcdHBhcmVudENoaWxkcmVuID0gUXVpY2tEb20uYmF0Y2gocGFyZW50LmNoaWxkcmVuKVxuXHRcdHBhcmVudFNpYmxpbmcgPSBwYXJlbnQubmV4dFxuXHRcdGdyYW5kUGFyZW50ID0gcGFyZW50LnBhcmVudFxuXHRcdGlmIGdyYW5kUGFyZW50XG5cdFx0XHRwYXJlbnQuZGV0YWNoKClcblxuXHRcdFx0aWYgcGFyZW50U2libGluZ1xuXHRcdFx0XHRwYXJlbnRDaGlsZHJlbi5pbnNlcnRCZWZvcmUocGFyZW50U2libGluZylcblx0XHRcdGVsc2Vcblx0XHRcdFx0cGFyZW50Q2hpbGRyZW4uYXBwZW5kVG8oZ3JhbmRQYXJlbnQpXG5cdFxuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6cmVwbGFjZSA9ICh0YXJnZXRFbCktPlxuXHRpZiB0YXJnZXRFbFxuXHRcdHRhcmdldEVsID0gaGVscGVycy5ub3JtYWxpemVHaXZlbkVsKHRhcmdldEVsKVxuXHRcblx0XHRpZiBJUy5xdWlja0RvbUVsKHRhcmdldEVsKSBhbmQgdGFyZ2V0RWwgaXNudCBAXG5cdFx0XHR0YXJnZXRFbC5kZXRhY2goKVxuXHRcdFx0QHBhcmVudD8uX3JlbW92ZUNoaWxkKEAsIHRhcmdldEVsKVxuXHRcdFx0dGFyZ2V0RWwuX3JlZnJlc2hQYXJlbnQoKSAjIEZvcmNlIHJlLWZyZXNoIHRhcmdldEVsLl9wYXJlbnQgdmFsdWUgdG8gdHJpZ2dlciBpbnNlcnRlZCBjYWxsYmFja1xuXHRcblx0cmV0dXJuIEBcblxuXG5RdWlja0VsZW1lbnQ6Omhhc0NsYXNzID0gKHRhcmdldCktPlxuXHRoZWxwZXJzLmluY2x1ZGVzKEBjbGFzc0xpc3QsIHRhcmdldClcblxuXG5RdWlja0VsZW1lbnQ6OmFkZENsYXNzID0gKHRhcmdldCktPlxuXHRjbGFzc0xpc3QgPSBAY2xhc3NMaXN0XG5cdHRhcmdldEluZGV4ID0gY2xhc3NMaXN0LmluZGV4T2YodGFyZ2V0KVxuXG5cdGlmIHRhcmdldEluZGV4IGlzIC0xXG5cdFx0Y2xhc3NMaXN0LnB1c2godGFyZ2V0KVxuXHRcdEBjbGFzc05hbWUgPSBpZiBjbGFzc0xpc3QubGVuZ3RoID4gMSB0aGVuIGNsYXNzTGlzdC5qb2luKCcgJykgZWxzZSBjbGFzc0xpc3RbMF1cblxuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6cmVtb3ZlQ2xhc3MgPSAodGFyZ2V0KS0+XG5cdGNsYXNzTGlzdCA9IEBjbGFzc0xpc3Rcblx0dGFyZ2V0SW5kZXggPSBjbGFzc0xpc3QuaW5kZXhPZih0YXJnZXQpXG5cdFxuXHRpZiB0YXJnZXRJbmRleCBpc250IC0xXG5cdFx0Y2xhc3NMaXN0LnNwbGljZSh0YXJnZXRJbmRleCwgMSlcblx0XHRAY2xhc3NOYW1lID0gaWYgY2xhc3NMaXN0Lmxlbmd0aCB0aGVuIGNsYXNzTGlzdC5qb2luKCcgJykgZWxzZSAnJ1xuXG5cdHJldHVybiBAXG5cblxuUXVpY2tFbGVtZW50Ojp0b2dnbGVDbGFzcyA9ICh0YXJnZXQpLT5cblx0aWYgQGhhc0NsYXNzKHRhcmdldClcblx0XHRAcmVtb3ZlQ2xhc3ModGFyZ2V0KVxuXHRlbHNlXG5cdFx0QGFkZENsYXNzKHRhcmdldClcblxuXHRyZXR1cm4gQFxuXG5cblF1aWNrRWxlbWVudDo6X3JlZnJlc2hQYXJlbnQgPSAoKS0+XG5cdEBwYXJlbnRcblxuXG5RdWlja0VsZW1lbnQ6Ol9yZW1vdmVDaGlsZCA9ICh0YXJnZXRDaGlsZCwgcmVwbGFjZW1lbnRDaGlsZCktPlxuXHRpbmRleE9mQ2hpbGQgPSBAY2hpbGRyZW4uaW5kZXhPZih0YXJnZXRDaGlsZClcblx0aWYgaW5kZXhPZkNoaWxkIGlzbnQgLTFcblx0XHRpZiByZXBsYWNlbWVudENoaWxkXG5cdFx0XHRAZWwucmVwbGFjZUNoaWxkKHJlcGxhY2VtZW50Q2hpbGQuZWwsIHRhcmdldENoaWxkLmVsKVxuXHRcdFx0QF9jaGlsZHJlbi5zcGxpY2UoaW5kZXhPZkNoaWxkLCAxLCByZXBsYWNlbWVudENoaWxkKVxuXHRcdGVsc2Vcblx0XHRcdEBlbC5yZW1vdmVDaGlsZCh0YXJnZXRDaGlsZC5lbClcblx0XHRcdEBfY2hpbGRyZW4uc3BsaWNlKGluZGV4T2ZDaGlsZCwgMSlcblx0XHRcblxuXHRyZXR1cm4gQFxuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIFF1aWNrRWxlbWVudDo6LFxuXHQnaHRtbCc6XG5cdFx0Z2V0OiAoKS0+IEBlbC5pbm5lckhUTUxcblx0XHRzZXQ6IChuZXdWYWx1ZSktPiBAZWwuaW5uZXJIVE1MID0gbmV3VmFsdWVcblx0XG5cdCd0ZXh0Jzpcblx0XHRnZXQ6ICgpLT4gQGVsLnRleHRDb250ZW50XG5cdFx0c2V0OiAobmV3VmFsdWUpLT4gQGVsLnRleHRDb250ZW50ID0gbmV3VmFsdWVcblxuXHQnY2xhc3NOYW1lJzpcblx0XHRnZXQ6ICgpLT4gaWYgQHN2ZyB0aGVuIChAYXR0cignY2xhc3MnKSBvciAnJykgZWxzZSBAcmF3LmNsYXNzTmFtZVxuXHRcdHNldDogKG5ld1ZhbHVlKS0+IGlmIEBzdmcgdGhlbiBAYXR0cignY2xhc3MnLCBuZXdWYWx1ZSkgZWxzZSBAcmF3LmNsYXNzTmFtZSA9IG5ld1ZhbHVlXG5cblx0J2NsYXNzTGlzdCc6XG5cdFx0Z2V0OiAoKS0+XG5cdFx0XHRsaXN0ID0gQGNsYXNzTmFtZS5zcGxpdCgvXFxzKy8pXG5cdFx0XHRsaXN0LnBvcCgpIGlmIGxpc3RbbGlzdC5sZW5ndGgtMV0gaXMgJydcblx0XHRcdGxpc3Quc2hpZnQoKSBpZiBsaXN0WzBdIGlzICcnXG5cdFx0XHRyZXR1cm4gbGlzdFxuXG5cblxuXG5cblxuXG4iXX0=
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

QuickElement.prototype.applyData = function(data) {
  var child, computers, defaults, i, j, key, keys, len, len1, ref;
  if (computers = this.options.computers) {
    defaults = this.options.defaults;
    keys = Object.keys(computers);
    for (i = 0, len = keys.length; i < len; i++) {
      key = keys[i];
      if (data && data.hasOwnProperty(key)) {
        this._runComputer(key, data[key]);
      } else if (defaults && defaults.hasOwnProperty(key)) {
        this._runComputer(key, defaults[key]);
      }
    }
  }
  ref = this._children;
  for (j = 0, len1 = ref.length; j < len1; j++) {
    child = ref[j];
    child.applyData(data);
  }
};

QuickElement.prototype._runComputer = function(computer, arg) {
  return this.options.computers[computer].call(this, arg);
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHBsaWNhdGlvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFBLFNBQUUsQ0FBQSxhQUFkLEdBQThCLFNBQUMsT0FBRDtFQUM3QixJQUFHLEVBQUUsQ0FBQyxNQUFILENBQVUsT0FBVixDQUFIO0lBQ0MsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUNYLElBQUMsQ0FBQSxpQkFBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLGFBQUQsQ0FBZSxJQUFDLENBQUEsT0FBaEIsRUFIRDs7QUFLQSxTQUFPO0FBTnNCOztBQVM5QixZQUFZLENBQUEsU0FBRSxDQUFBLGlCQUFkLEdBQWtDLFNBQUMsTUFBRDtBQUNqQyxNQUFBO0VBQUEsSUFBRyxFQUFFLENBQUMsV0FBSCxDQUFlLE1BQWYsQ0FBSDtJQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBWixDQUFtQixJQUFuQixFQUFzQixNQUFBLEdBQVMsSUFBQyxDQUFBLFlBQUQsQ0FBYyxNQUFkLENBQS9CO0lBRUEsSUFBRyxNQUFNLENBQUMsT0FBVjtNQUNDLGFBQUEsR0FBZ0IsTUFBTSxDQUFDLElBQVAsQ0FBWSxNQUFNLENBQUMsT0FBbkI7QUFFaEIsV0FBQSwrQ0FBQTs7WUFBZ0MsSUFBQyxDQUFBLEtBQUQsQ0FBTyxLQUFQLENBQUEsSUFBaUIsS0FBQSxLQUFTO1VBQ3pELElBQUMsQ0FBQSxxQkFBRCxDQUF1QixJQUFDLENBQUEsT0FBUSxDQUFBLEtBQUEsQ0FBaEMsRUFBd0MsSUFBQyxDQUFBLGdCQUFELENBQWtCLEtBQWxCLENBQXhDLEVBQWtFLEtBQWxFOztBQURELE9BSEQ7S0FIRDs7QUFTQSxTQUFPO0FBVjBCOztBQWFsQyxZQUFZLENBQUEsU0FBRSxDQUFBLGdCQUFkLEdBQWlDLFNBQUMsS0FBRDtBQUNoQyxNQUFBO0VBQUEsSUFBRyxFQUFFLENBQUMsV0FBSCxDQUFlLEtBQWYsQ0FBSDtJQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBWixDQUFtQixJQUFuQixFQUFzQixNQUFBLEdBQVMsSUFBQyxDQUFBLFdBQUQsQ0FBYSxLQUFiLENBQS9CLEVBREQ7O0FBR0EsU0FBTztBQUp5Qjs7QUFRakMsWUFBWSxDQUFBLFNBQUUsQ0FBQSxTQUFkLEdBQTBCLFNBQUMsSUFBRDtBQUN6QixNQUFBO0VBQUEsSUFBRyxTQUFBLEdBQVksSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUF4QjtJQUNDLFFBQUEsR0FBVyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQ3BCLElBQUEsR0FBTyxNQUFNLENBQUMsSUFBUCxDQUFZLFNBQVo7QUFFUCxTQUFBLHNDQUFBOztNQUNDLElBQUcsSUFBQSxJQUFTLElBQUksQ0FBQyxjQUFMLENBQW9CLEdBQXBCLENBQVo7UUFDQyxJQUFDLENBQUEsWUFBRCxDQUFjLEdBQWQsRUFBbUIsSUFBSyxDQUFBLEdBQUEsQ0FBeEIsRUFERDtPQUFBLE1BR0ssSUFBRyxRQUFBLElBQWEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsR0FBeEIsQ0FBaEI7UUFDSixJQUFDLENBQUEsWUFBRCxDQUFjLEdBQWQsRUFBbUIsUUFBUyxDQUFBLEdBQUEsQ0FBNUIsRUFESTs7QUFKTixLQUpEOztBQVlBO0FBQUEsT0FBQSx1Q0FBQTs7SUFBQSxLQUFLLENBQUMsU0FBTixDQUFnQixJQUFoQjtBQUFBO0FBYnlCOztBQWlCMUIsWUFBWSxDQUFBLFNBQUUsQ0FBQSxZQUFkLEdBQTZCLFNBQUMsUUFBRCxFQUFXLEdBQVg7U0FDNUIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFVLENBQUEsUUFBQSxDQUFTLENBQUMsSUFBN0IsQ0FBa0MsSUFBbEMsRUFBcUMsR0FBckM7QUFENEIiLCJzb3VyY2VzQ29udGVudCI6WyJRdWlja0VsZW1lbnQ6OnVwZGF0ZU9wdGlvbnMgPSAob3B0aW9ucyktPlxuXHRpZiBJUy5vYmplY3Qob3B0aW9ucykgXG5cdFx0QG9wdGlvbnMgPSBvcHRpb25zXG5cdFx0QF9ub3JtYWxpemVPcHRpb25zKClcblx0XHRAX2FwcGx5T3B0aW9ucyhAb3B0aW9ucylcblx0XG5cdHJldHVybiBAXG5cblxuUXVpY2tFbGVtZW50Ojp1cGRhdGVTdGF0ZVN0eWxlcyA9IChzdHlsZXMpLT5cblx0aWYgSVMub2JqZWN0UGxhaW4oc3R5bGVzKVxuXHRcdGV4dGVuZC5kZWVwLmNvbmNhdCBALCBwYXJzZWQgPSBAX3BhcnNlU3R5bGVzKHN0eWxlcylcblxuXHRcdGlmIHBhcnNlZC5fc3R5bGVzXG5cdFx0XHR1cGRhdGVkU3RhdGVzID0gT2JqZWN0LmtleXMocGFyc2VkLl9zdHlsZXMpXG5cdFx0XHRcblx0XHRcdGZvciBzdGF0ZSBpbiB1cGRhdGVkU3RhdGVzIHdoZW4gQHN0YXRlKHN0YXRlKSBvciBzdGF0ZSBpcyAnYmFzZSdcblx0XHRcdFx0QF9hcHBseVJlZ2lzdGVyZWRTdHlsZShAX3N0eWxlc1tzdGF0ZV0sIEBfZ2V0QWN0aXZlU3RhdGVzKHN0YXRlKSwgZmFsc2UpXG5cdFx0XG5cdHJldHVybiBAXG5cblxuUXVpY2tFbGVtZW50Ojp1cGRhdGVTdGF0ZVRleHRzID0gKHRleHRzKS0+XG5cdGlmIElTLm9iamVjdFBsYWluKHRleHRzKVxuXHRcdGV4dGVuZC5kZWVwLmNvbmNhdCBALCBwYXJzZWQgPSBAX3BhcnNlVGV4dHModGV4dHMpXG5cdFxuXHRyZXR1cm4gQFxuXG5cblxuUXVpY2tFbGVtZW50OjphcHBseURhdGEgPSAoZGF0YSktPlxuXHRpZiBjb21wdXRlcnMgPSBAb3B0aW9ucy5jb21wdXRlcnNcblx0XHRkZWZhdWx0cyA9IEBvcHRpb25zLmRlZmF1bHRzXG5cdFx0a2V5cyA9IE9iamVjdC5rZXlzKGNvbXB1dGVycylcblx0XHRcblx0XHRmb3Iga2V5IGluIGtleXNcblx0XHRcdGlmIGRhdGEgYW5kIGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KVxuXHRcdFx0XHRAX3J1bkNvbXB1dGVyKGtleSwgZGF0YVtrZXldKVxuXHRcdFx0XG5cdFx0XHRlbHNlIGlmIGRlZmF1bHRzIGFuZCBkZWZhdWx0cy5oYXNPd25Qcm9wZXJ0eShrZXkpXG5cdFx0XHRcdEBfcnVuQ29tcHV0ZXIoa2V5LCBkZWZhdWx0c1trZXldKVxuXG5cblx0Y2hpbGQuYXBwbHlEYXRhKGRhdGEpIGZvciBjaGlsZCBpbiBAX2NoaWxkcmVuXG5cdHJldHVyblxuXG5cblF1aWNrRWxlbWVudDo6X3J1bkNvbXB1dGVyID0gKGNvbXB1dGVyLCBhcmcpLT5cblx0QG9wdGlvbnMuY29tcHV0ZXJzW2NvbXB1dGVyXS5jYWxsKEAsIGFyZylcblxuXG5cblxuXG5cbiJdfQ==
;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBTTtFQUNRLHNCQUFDLElBQUQsRUFBUSxPQUFSO0lBQUMsSUFBQyxDQUFBLE9BQUQ7SUFBTyxJQUFDLENBQUEsVUFBRDtJQUNwQixJQUFlLElBQUMsQ0FBQSxJQUFLLENBQUEsQ0FBQSxDQUFOLEtBQVksR0FBM0I7TUFBQSxJQUFDLENBQUEsR0FBRCxHQUFPLEtBQVA7O0lBQ0EsSUFBQyxDQUFBLEVBQUQsR0FBTSxJQUFDLENBQUEsT0FBTyxDQUFDLFFBQVQsSUFDTCxDQUFHLElBQUMsQ0FBQSxJQUFELEtBQVMsTUFBWixHQUF3QixRQUFRLENBQUMsY0FBVCxDQUEyQixPQUFPLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBaEIsS0FBd0IsUUFBM0IsR0FBeUMsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFsRCxHQUE0RCxFQUFwRixDQUF4QixHQUNRLElBQUMsQ0FBQSxHQUFKLEdBQWEsUUFBUSxDQUFDLGVBQVQsQ0FBeUIsWUFBekIsRUFBdUMsSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFOLENBQVksQ0FBWixDQUF2QyxDQUFiLEdBQ0EsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBQyxDQUFBLElBQXhCLENBRkw7SUFJRCxJQUFHLElBQUMsQ0FBQSxJQUFELEtBQVMsTUFBWjtNQUNDLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFDLENBQUEsSUFBRCxHQUFRLFNBQUEsR0FBQSxFQUQ5Qjs7SUFJQSxJQUFDLENBQUEsT0FBRCxHQUFXO0lBQ1gsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUNYLElBQUMsQ0FBQSxNQUFELEdBQVU7SUFDVixJQUFDLENBQUEsU0FBRCxHQUFhO0lBS2IsSUFBQyxDQUFBLGlCQUFELENBQUE7SUFDQSxJQUFDLENBQUEsYUFBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLGtCQUFELENBQUE7SUFDQSxJQUFDLENBQUEsWUFBRCxDQUFBO0lBQ0EsSUFBcUIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxRQUE5QjtNQUFBLElBQUMsQ0FBQSxjQUFELENBQUEsRUFBQTs7SUFDQSxJQUFDLENBQUEsRUFBRSxDQUFDLGFBQUosR0FBb0I7RUF4QlI7O3lCQTJCYixNQUFBLEdBQVEsU0FBQTtBQUNQLFFBQUE7SUFBQSxNQUFBLEdBQVMsQ0FBQyxJQUFDLENBQUEsSUFBRixFQUFRLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBYixDQUFrQixjQUFsQixDQUFBLENBQWtDLElBQUMsQ0FBQSxPQUFuQyxDQUFSO0lBQ1QsUUFBQSxHQUFXLElBQUMsQ0FBQTtBQUNaLFNBQUEsMENBQUE7O01BQUEsTUFBTSxDQUFDLElBQVAsQ0FBWSxLQUFLLENBQUMsTUFBTixDQUFBLENBQVo7QUFBQTtBQUNBLFdBQU87RUFKQTs7Ozs7OztBQU1UOzs7RUFDQSxZQUFZLENBQUMsT0FBUTs7O0FBRXJCLElBQUEsQ0FBSyxXQUFMOztBQUNBLElBQUEsQ0FBSyxjQUFMOztBQUNBLElBQUEsQ0FBSyxRQUFMOztBQUNBLElBQUEsQ0FBSyxVQUFMOztBQUNBLElBQUEsQ0FBSyxTQUFMOztBQUNBLElBQUEsQ0FBSyxTQUFMOztBQUNBLElBQUEsQ0FBSyw2QkFBTDs7QUFDQSxJQUFBLENBQUssZ0JBQUw7O0FBQ0EsSUFBQSxDQUFLLGVBQUwiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBRdWlja0VsZW1lbnRcblx0Y29uc3RydWN0b3I6IChAdHlwZSwgQG9wdGlvbnMpLT5cblx0XHRAc3ZnID0gdHJ1ZSBpZiBAdHlwZVswXSBpcyAnKidcblx0XHRAZWwgPSBAb3B0aW9ucy5leGlzdGluZyBvclxuXHRcdFx0aWYgQHR5cGUgaXMgJ3RleHQnIHRoZW4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaWYgdHlwZW9mIEBvcHRpb25zLnRleHQgaXMgJ3N0cmluZycgdGhlbiBAb3B0aW9ucy50ZXh0IGVsc2UgJycpXG5cdFx0XHRlbHNlIGlmIEBzdmcgdGhlbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnTmFtZXNwYWNlLCBAdHlwZS5zbGljZSgxKSlcblx0XHRcdGVsc2UgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChAdHlwZSlcblxuXHRcdGlmIEB0eXBlIGlzICd0ZXh0J1xuXHRcdFx0QGFwcGVuZCA9IEBwcmVwZW5kID0gQGF0dHIgPSAoKS0+XG5cdFx0XHQjIEBfdGV4dHMgPSB7fSAjIGRlZmluZWQgY29uZGl0aW9uYWxseVxuXG5cdFx0QF9wYXJlbnQgPSBudWxsXG5cdFx0QF9zdHlsZXMgPSB7fVxuXHRcdEBfc3RhdGUgPSBbXVxuXHRcdEBfY2hpbGRyZW4gPSBbXVxuXHRcdCMgQF9wcm92aWRlZFN0YXRlcyA9IFtdXHRcdFx0XHQjIGRlZmluZWQgY29uZGl0aW9uYWxseVxuXHRcdCMgQF9wcm92aWRlZFN0YXRlc1NoYXJlZCA9IFtdXHRcdCMgZGVmaW5lZCBjb25kaXRpb25hbGx5XG5cdFx0IyBAX2V2ZW50Q2FsbGJhY2tzID0ge19fcmVmczp7fX1cdCMgZGVmaW5lZCBjb25kaXRpb25hbGx5XG5cdFx0XG5cdFx0QF9ub3JtYWxpemVPcHRpb25zKClcblx0XHRAX2FwcGx5T3B0aW9ucygpXG5cdFx0QF9hdHRhY2hTdGF0ZUV2ZW50cygpXG5cdFx0QF9wcm94eVBhcmVudCgpXG5cdFx0QF9yZWZyZXNoUGFyZW50KCkgaWYgQG9wdGlvbnMuZXhpc3Rpbmdcblx0XHRAZWwuX3F1aWNrRWxlbWVudCA9IEBcblxuXG5cdHRvSlNPTjogKCktPlxuXHRcdG91dHB1dCA9IFtAdHlwZSwgZXh0ZW5kLmNsb25lLmtleXMoYWxsb3dlZE9wdGlvbnMpKEBvcHRpb25zKV1cblx0XHRjaGlsZHJlbiA9IEBjaGlsZHJlblxuXHRcdG91dHB1dC5wdXNoKGNoaWxkLnRvSlNPTigpKSBmb3IgY2hpbGQgaW4gY2hpbGRyZW5cblx0XHRyZXR1cm4gb3V0cHV0XG5cbiMjIyBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAjIyNcblF1aWNrRWxlbWVudC5uYW1lID89ICdRdWlja0VsZW1lbnQnXG5cbl8kc20oJy4vYWxpYXNlcycgKVxuXyRzbSgnLi90cmF2ZXJzaW5nJyApXG5fJHNtKCcuL2luaXQnIClcbl8kc20oJy4vZXZlbnRzJyApXG5fJHNtKCcuL3N0YXRlJyApXG5fJHNtKCcuL3N0eWxlJyApXG5fJHNtKCcuL2F0dHJpYnV0ZXMtYW5kLXByb3BlcnRpZXMnIClcbl8kc20oJy4vbWFuaXB1bGF0aW9uJyApXG5fJHNtKCcuL2FwcGxpY2F0aW9uJyApXG4iXX0=
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
  var args, argsLength, child, children, element, i, j, len, options, type;
  args = arguments;
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
        children = [];
        i = 1;
        argsLength = args.length;
        while (++i < argsLength) {
          children.push(args[i]);
        }
        for (j = 0, len = children.length; j < len; j++) {
          child = children[j];
          if (IS.string(child)) {
            child = QuickDom.text(child);
          }
          if (IS.template(child)) {
            child = child.spawn(false);
          }
          if (IS.array(child)) {
            child = QuickDom.apply(null, child);
          }
          if (IS.quickDomEl(child)) {
            child.appendTo(element);
          }
        }
      }
      return element;
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

var QuickTemplate,
  slice = [].slice;

var extendByRef, extendTemplate;

extendTemplate = function(currentOpts, newOpts, globalOpts) {
  var currentChild, currentChildren, globalOptsTransform, i, index, needsTemplateWrap, newChild, newChildProcessed, newChildren, noChanges, output, ref, ref1, remainingNewChildren;
  if (globalOpts) {
    globalOptsTransform = {
      options: function(opts) {
        return extend(opts, globalOpts);
      }
    };
  }
  if (IS.array(newOpts)) {
    newOpts = parseTree(newOpts, false);
  }
  output = extend.deep.nullDeletes.notKeys('children').notDeep(['relatedInstance', 'data']).transform(globalOptsTransform).clone(currentOpts, newOpts);
  currentChildren = currentOpts.children;
  newChildren = (newOpts != null ? newOpts.children : void 0) || [];
  output.children = [];

  /* istanbul ignore next */
  if (IS.array(newChildren)) {
    for (index = i = 0, ref1 = Math.max(currentChildren.length, newChildren.length); 0 <= ref1 ? i < ref1 : i > ref1; index = 0 <= ref1 ? ++i : --i) {
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
        newChildProcessed = currentChild ? currentChild.extend(newChildProcessed, globalOpts) : new QuickTemplate(extend.deep.clone(schema, newChildProcessed));
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kVGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHRlbmRUZW1wbGF0ZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxjQUFBLEdBQWlCLFNBQUMsV0FBRCxFQUFjLE9BQWQsRUFBdUIsVUFBdkI7QUFDaEIsTUFBQTtFQUFBLElBQUcsVUFBSDtJQUFtQixtQkFBQSxHQUFzQjtNQUFBLE9BQUEsRUFBUyxTQUFDLElBQUQ7ZUFBUyxNQUFBLENBQU8sSUFBUCxFQUFhLFVBQWI7TUFBVCxDQUFUO01BQXpDOztFQUNBLElBQXVDLEVBQUUsQ0FBQyxLQUFILENBQVMsT0FBVCxDQUF2QztJQUFBLE9BQUEsR0FBVSxTQUFBLENBQVUsT0FBVixFQUFtQixLQUFuQixFQUFWOztFQUVBLE1BQUEsR0FBUyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUF4QixDQUFnQyxVQUFoQyxDQUEyQyxDQUFDLE9BQTVDLENBQW9ELENBQUMsaUJBQUQsRUFBbUIsTUFBbkIsQ0FBcEQsQ0FBK0UsQ0FBQyxTQUFoRixDQUEwRixtQkFBMUYsQ0FBOEcsQ0FBQyxLQUEvRyxDQUFxSCxXQUFySCxFQUFrSSxPQUFsSTtFQUNULGVBQUEsR0FBa0IsV0FBVyxDQUFDO0VBQzlCLFdBQUEsc0JBQWMsT0FBTyxDQUFFLGtCQUFULElBQXFCO0VBQ25DLE1BQU0sQ0FBQyxRQUFQLEdBQWtCOztBQUVsQjtFQUNBLElBQUcsRUFBRSxDQUFDLEtBQUgsQ0FBUyxXQUFULENBQUg7QUFDQyxTQUFhLDBJQUFiO01BQ0MsaUJBQUEsR0FBb0IsU0FBQSxHQUFZO01BQ2hDLFlBQUEsR0FBZSxlQUFnQixDQUFBLEtBQUE7TUFDL0IsUUFBQSxHQUFXLFdBQVksQ0FBQSxLQUFBO01BQ3ZCLGlCQUFBO0FBQW9CLGdCQUFBLEtBQUE7QUFBQSxnQkFDZCxFQUFFLENBQUMsUUFBSCxDQUFZLFFBQVosQ0FEYzttQkFDYTtBQURiLGdCQUVkLEVBQUUsQ0FBQyxLQUFILENBQVMsUUFBVCxDQUZjO21CQUVVLGlCQUFBLEdBQW9CLFNBQUEsQ0FBVSxRQUFWO0FBRjlCLGdCQUdkLEVBQUUsQ0FBQyxNQUFILENBQVUsUUFBVixDQUhjO21CQUdXLGlCQUFBLEdBQW9CO2NBQUMsSUFBQSxFQUFLLE1BQU47Y0FBYyxPQUFBLEVBQVE7Z0JBQUMsSUFBQSxFQUFLLFFBQU47ZUFBdEI7O0FBSC9CLGlCQUlkLENBQUksUUFBSixJQUFpQixDQUFJLFdBSlA7bUJBSXVCLFNBQUEsR0FBWTtBQUpuQzttQkFLZCxpQkFBQSxHQUFvQixRQUFBLElBQVk7QUFMbEI7O01BUXBCLElBQUcsU0FBSDtRQUNDLGlCQUFBLEdBQW9CLGFBRHJCO09BQUEsTUFHSyxJQUFHLGlCQUFIO1FBQ0osaUJBQUEsR0FDSSxZQUFILEdBQ0MsWUFBWSxDQUFDLE1BQWIsQ0FBb0IsaUJBQXBCLEVBQXVDLFVBQXZDLENBREQsR0FHQyxJQUFJLGFBQUosQ0FBa0IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFaLENBQWtCLE1BQWxCLEVBQTBCLGlCQUExQixDQUFsQixFQUxFOztNQU9MLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBaEIsQ0FBcUIsaUJBQXJCO0FBdEJELEtBREQ7R0FBQSxNQTBCSyxJQUFHLEVBQUUsQ0FBQyxNQUFILENBQVUsV0FBVixDQUFIO0lBQ0osV0FBQSxHQUFjLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBakIsQ0FBdUIsV0FBdkI7SUFDZCxNQUFNLENBQUMsUUFBUCxHQUFrQixXQUFBLENBQVksV0FBWixFQUF5QixlQUF6QixFQUEwQyxVQUExQztJQUNsQixvQkFBQSxHQUF1QjtBQUV2QixTQUFBLDJCQUFBOztNQUNDLGlCQUFBLEdBQXVCLEVBQUUsQ0FBQyxXQUFILENBQWUsUUFBZixDQUFBLElBQTZCLENBQUksRUFBRSxDQUFDLFFBQUgsQ0FBWSxRQUFaLENBQXBDLEdBQStELFFBQS9ELEdBQTZFLFNBQUEsQ0FBVSxRQUFWO01BQ2pHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBaEIsQ0FBcUIsSUFBSSxhQUFKLENBQWtCLGlCQUFsQixDQUFyQjtNQUNBLE9BQU8sb0JBQXFCLENBQUEsR0FBQTtBQUg3QixLQUxJOztBQVdMLFNBQU87QUEvQ1M7O0FBb0RqQixXQUFBLEdBQWMsU0FBQyxlQUFELEVBQWtCLGVBQWxCLEVBQW1DLFVBQW5DO0FBQWlELE1BQUE7RUFBQSxJQUFHLENBQUksZUFBZSxDQUFDLE1BQXZCO1dBQW1DLGdCQUFuQztHQUFBLE1BQUE7SUFDOUQsTUFBQSxHQUFTO0FBRVQsU0FBQSxpREFBQTs7TUFDQyxRQUFBLEdBQVcsZUFBZ0IsQ0FBQSxZQUFZLENBQUMsR0FBYjtNQUMzQixJQUFHLFFBQUg7UUFDQyxpQkFBQSxHQUFvQixZQUFZLENBQUMsTUFBYixDQUFvQixRQUFwQixFQUE4QixVQUE5QjtRQUNwQixPQUFPLGVBQWdCLENBQUEsWUFBWSxDQUFDLEdBQWIsRUFGeEI7T0FBQSxNQUlLLElBQUcsUUFBQSxLQUFZLElBQWY7UUFDSixPQUFPLGVBQWdCLENBQUEsWUFBWSxDQUFDLEdBQWI7QUFDdkIsaUJBRkk7T0FBQSxNQUFBO1FBS0osaUJBQUE7QUFBb0Isa0JBQUEsS0FBQTtBQUFBLGtCQUNkLFVBRGM7cUJBQ0UsWUFBWSxDQUFDLE1BQWIsQ0FBb0IsSUFBcEIsRUFBMEIsVUFBMUI7QUFERixrQkFFZCxNQUFNLENBQUMsSUFBUCxDQUFZLGVBQVosQ0FBNEIsQ0FBQyxNQUZmO3FCQUUyQixZQUFZLENBQUMsTUFBYixDQUFBO0FBRjNCO3FCQUdkO0FBSGM7YUFMaEI7O01BVUwsaUJBQWlCLENBQUMsUUFBbEIsR0FBNkIsV0FBQSxDQUFZLGVBQVosRUFBNkIsaUJBQWlCLENBQUMsUUFBL0M7TUFDN0IsTUFBTSxDQUFDLElBQVAsQ0FBWSxpQkFBWjtBQWpCRDtBQW1CQSxXQUFPLE9BdEJ1RDs7QUFBakQiLCJzb3VyY2VzQ29udGVudCI6WyJleHRlbmRUZW1wbGF0ZSA9IChjdXJyZW50T3B0cywgbmV3T3B0cywgZ2xvYmFsT3B0cyktPlxuXHRpZiBnbG9iYWxPcHRzIHRoZW4gZ2xvYmFsT3B0c1RyYW5zZm9ybSA9IG9wdGlvbnM6IChvcHRzKS0+IGV4dGVuZChvcHRzLCBnbG9iYWxPcHRzKVxuXHRuZXdPcHRzID0gcGFyc2VUcmVlKG5ld09wdHMsIGZhbHNlKSBpZiBJUy5hcnJheShuZXdPcHRzKVxuXG5cdG91dHB1dCA9IGV4dGVuZC5kZWVwLm51bGxEZWxldGVzLm5vdEtleXMoJ2NoaWxkcmVuJykubm90RGVlcChbJ3JlbGF0ZWRJbnN0YW5jZScsJ2RhdGEnXSkudHJhbnNmb3JtKGdsb2JhbE9wdHNUcmFuc2Zvcm0pLmNsb25lKGN1cnJlbnRPcHRzLCBuZXdPcHRzKVxuXHRjdXJyZW50Q2hpbGRyZW4gPSBjdXJyZW50T3B0cy5jaGlsZHJlblxuXHRuZXdDaGlsZHJlbiA9IG5ld09wdHM/LmNoaWxkcmVuIG9yIFtdXG5cdG91dHB1dC5jaGlsZHJlbiA9IFtdXG5cblx0IyMjIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICMjI1xuXHRpZiBJUy5hcnJheShuZXdDaGlsZHJlbilcblx0XHRmb3IgaW5kZXggaW4gWzAuLi5NYXRoLm1heChjdXJyZW50Q2hpbGRyZW4ubGVuZ3RoLCBuZXdDaGlsZHJlbi5sZW5ndGgpXVxuXHRcdFx0bmVlZHNUZW1wbGF0ZVdyYXAgPSBub0NoYW5nZXMgPSBmYWxzZVxuXHRcdFx0Y3VycmVudENoaWxkID0gY3VycmVudENoaWxkcmVuW2luZGV4XVxuXHRcdFx0bmV3Q2hpbGQgPSBuZXdDaGlsZHJlbltpbmRleF1cblx0XHRcdG5ld0NoaWxkUHJvY2Vzc2VkID0gc3dpdGNoXG5cdFx0XHRcdHdoZW4gSVMudGVtcGxhdGUobmV3Q2hpbGQpIHRoZW4gbmV3Q2hpbGRcblx0XHRcdFx0d2hlbiBJUy5hcnJheShuZXdDaGlsZCkgdGhlbiBuZWVkc1RlbXBsYXRlV3JhcCA9IHBhcnNlVHJlZShuZXdDaGlsZClcblx0XHRcdFx0d2hlbiBJUy5zdHJpbmcobmV3Q2hpbGQpIHRoZW4gbmVlZHNUZW1wbGF0ZVdyYXAgPSB7dHlwZTondGV4dCcsIG9wdGlvbnM6e3RleHQ6bmV3Q2hpbGR9fVxuXHRcdFx0XHR3aGVuIG5vdCBuZXdDaGlsZCBhbmQgbm90IGdsb2JhbE9wdHMgdGhlbiBub0NoYW5nZXMgPSB0cnVlXG5cdFx0XHRcdGVsc2UgbmVlZHNUZW1wbGF0ZVdyYXAgPSBuZXdDaGlsZCBvciB0cnVlXG5cblxuXHRcdFx0aWYgbm9DaGFuZ2VzXG5cdFx0XHRcdG5ld0NoaWxkUHJvY2Vzc2VkID0gY3VycmVudENoaWxkXG5cdFx0XHRcblx0XHRcdGVsc2UgaWYgbmVlZHNUZW1wbGF0ZVdyYXBcblx0XHRcdFx0bmV3Q2hpbGRQcm9jZXNzZWQgPSBcblx0XHRcdFx0XHRpZiBjdXJyZW50Q2hpbGRcblx0XHRcdFx0XHRcdGN1cnJlbnRDaGlsZC5leHRlbmQobmV3Q2hpbGRQcm9jZXNzZWQsIGdsb2JhbE9wdHMpXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0bmV3IFF1aWNrVGVtcGxhdGUoZXh0ZW5kLmRlZXAuY2xvbmUoc2NoZW1hLCBuZXdDaGlsZFByb2Nlc3NlZCkpXG5cblx0XHRcdG91dHB1dC5jaGlsZHJlbi5wdXNoIG5ld0NoaWxkUHJvY2Vzc2VkXG5cdFxuXHRcblx0ZWxzZSBpZiBJUy5vYmplY3QobmV3Q2hpbGRyZW4pXG5cdFx0bmV3Q2hpbGRyZW4gPSBleHRlbmQuYWxsb3dOdWxsLmNsb25lIG5ld0NoaWxkcmVuXG5cdFx0b3V0cHV0LmNoaWxkcmVuID0gZXh0ZW5kQnlSZWYobmV3Q2hpbGRyZW4sIGN1cnJlbnRDaGlsZHJlbiwgZ2xvYmFsT3B0cylcblx0XHRyZW1haW5pbmdOZXdDaGlsZHJlbiA9IG5ld0NoaWxkcmVuXG5cdFx0XG5cdFx0Zm9yIHJlZixuZXdDaGlsZCBvZiByZW1haW5pbmdOZXdDaGlsZHJlblxuXHRcdFx0bmV3Q2hpbGRQcm9jZXNzZWQgPSBpZiBJUy5vYmplY3RQbGFpbihuZXdDaGlsZCkgYW5kIG5vdCBJUy50ZW1wbGF0ZShuZXdDaGlsZCkgdGhlbiBuZXdDaGlsZCBlbHNlIHBhcnNlVHJlZShuZXdDaGlsZClcblx0XHRcdG91dHB1dC5jaGlsZHJlbi5wdXNoIG5ldyBRdWlja1RlbXBsYXRlIG5ld0NoaWxkUHJvY2Vzc2VkXG5cdFx0XHRkZWxldGUgcmVtYWluaW5nTmV3Q2hpbGRyZW5bcmVmXVxuXG5cblx0cmV0dXJuIG91dHB1dFxuXG5cblxuXG5leHRlbmRCeVJlZiA9IChuZXdDaGlsZHJlblJlZnMsIGN1cnJlbnRDaGlsZHJlbiwgZ2xvYmFsT3B0cyktPiBpZiBub3QgY3VycmVudENoaWxkcmVuLmxlbmd0aCB0aGVuIGN1cnJlbnRDaGlsZHJlbiBlbHNlXG5cdG91dHB1dCA9IFtdXG5cdFxuXHRmb3IgY3VycmVudENoaWxkIGluIGN1cnJlbnRDaGlsZHJlblxuXHRcdG5ld0NoaWxkID0gbmV3Q2hpbGRyZW5SZWZzW2N1cnJlbnRDaGlsZC5yZWZdXG5cdFx0aWYgbmV3Q2hpbGRcblx0XHRcdG5ld0NoaWxkUHJvY2Vzc2VkID0gY3VycmVudENoaWxkLmV4dGVuZChuZXdDaGlsZCwgZ2xvYmFsT3B0cylcblx0XHRcdGRlbGV0ZSBuZXdDaGlsZHJlblJlZnNbY3VycmVudENoaWxkLnJlZl1cblx0XHRcblx0XHRlbHNlIGlmIG5ld0NoaWxkIGlzIG51bGxcblx0XHRcdGRlbGV0ZSBuZXdDaGlsZHJlblJlZnNbY3VycmVudENoaWxkLnJlZl1cblx0XHRcdGNvbnRpbnVlXG5cdFx0XG5cdFx0ZWxzZVxuXHRcdFx0bmV3Q2hpbGRQcm9jZXNzZWQgPSBzd2l0Y2hcblx0XHRcdFx0d2hlbiBnbG9iYWxPcHRzIHRoZW4gY3VycmVudENoaWxkLmV4dGVuZChudWxsLCBnbG9iYWxPcHRzKVxuXHRcdFx0XHR3aGVuIE9iamVjdC5rZXlzKG5ld0NoaWxkcmVuUmVmcykubGVuZ3RoIHRoZW4gY3VycmVudENoaWxkLmV4dGVuZCgpXG5cdFx0XHRcdGVsc2UgY3VycmVudENoaWxkXG5cblx0XHRuZXdDaGlsZFByb2Nlc3NlZC5jaGlsZHJlbiA9IGV4dGVuZEJ5UmVmKG5ld0NoaWxkcmVuUmVmcywgbmV3Q2hpbGRQcm9jZXNzZWQuY2hpbGRyZW4pXG5cdFx0b3V0cHV0LnB1c2gobmV3Q2hpbGRQcm9jZXNzZWQpXG5cblx0cmV0dXJuIG91dHB1dFxuXG5cblxuXG4iXX0=
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

var schema;

schema = {
  type: 'div',
  ref: void 0,
  options: {},
  children: []
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2NoZW1hLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE1BQUEsR0FDQztFQUFBLElBQUEsRUFBTSxLQUFOO0VBQ0EsR0FBQSxFQUFLLE1BREw7RUFFQSxPQUFBLEVBQVMsRUFGVDtFQUdBLFFBQUEsRUFBVSxFQUhWIiwic291cmNlc0NvbnRlbnQiOlsic2NoZW1hID0gXG5cdHR5cGU6ICdkaXYnXG5cdHJlZjogdW5kZWZpbmVkXG5cdG9wdGlvbnM6IHt9XG5cdGNoaWxkcmVuOiBbXSJdfQ==
;

QuickTemplate = (function() {
  function QuickTemplate(config, isTree) {
    var child, i, len, ref;
    if (IS.template(config)) {
      return config;
    }
    config = isTree ? parseTree(config) : config;
    extend(this, config);
    this._hasComputers = !!this.options.computers;
    if (!this._hasComputers && this.children.length) {
      ref = this.children;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        if (!(child._hasComputers || child.options.computers)) {
          continue;
        }
        this._hasComputers = true;
        break;
      }
    }
  }

  QuickTemplate.prototype.extend = function(newValues, globalOpts) {
    return new QuickTemplate(extendTemplate(this, newValues, globalOpts));
  };

  QuickTemplate.prototype.spawn = function(newValues, globalOpts) {
    var data, element, opts, ref;
    if (newValues && newValues.data) {
      data = newValues.data;
      if (Object.keys(newValues).length === 1) {
        newValues = null;
      }
    }
    if (newValues || globalOpts) {
      opts = extendTemplate(this, newValues, globalOpts);
    } else {
      opts = extend.clone(this);
      opts.options = extend.clone(opts.options);
    }
    element = QuickDom.apply(null, [opts.type, opts.options].concat(slice.call(opts.children)));
    if (this._hasComputers) {
      if (newValues !== false) {
        element.applyData(data);
      }
      if ((ref = element.options.computers) != null ? ref._init : void 0) {
        element._runComputer('_init', data);
      }
    }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxhQUFBO0VBQUE7O0FBQUEsSUFBQSxDQUFLLGtCQUFMOztBQUNBLElBQUEsQ0FBSyxhQUFMOztBQUNBLElBQUEsQ0FBSyxVQUFMOztBQUVNO0VBQ1EsdUJBQUMsTUFBRCxFQUFTLE1BQVQ7QUFDWixRQUFBO0lBQUEsSUFBaUIsRUFBRSxDQUFDLFFBQUgsQ0FBWSxNQUFaLENBQWpCO0FBQUEsYUFBTyxPQUFQOztJQUNBLE1BQUEsR0FBWSxNQUFILEdBQWUsU0FBQSxDQUFVLE1BQVYsQ0FBZixHQUFzQztJQUMvQyxNQUFBLENBQU8sSUFBUCxFQUFVLE1BQVY7SUFDQSxJQUFDLENBQUEsYUFBRCxHQUFpQixDQUFDLENBQUMsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUU1QixJQUFHLENBQUksSUFBQyxDQUFBLGFBQUwsSUFBdUIsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFwQztBQUNDO0FBQUEsV0FBQSxxQ0FBQTs7Y0FBNEIsS0FBSyxDQUFDLGFBQU4sSUFBdUIsS0FBSyxDQUFDLE9BQU8sQ0FBQzs7O1FBQ2hFLElBQUMsQ0FBQSxhQUFELEdBQWlCO0FBQ2pCO0FBRkQsT0FERDs7RUFOWTs7MEJBV2IsTUFBQSxHQUFRLFNBQUMsU0FBRCxFQUFZLFVBQVo7V0FDUCxJQUFJLGFBQUosQ0FBa0IsY0FBQSxDQUFlLElBQWYsRUFBa0IsU0FBbEIsRUFBNkIsVUFBN0IsQ0FBbEI7RUFETzs7MEJBR1IsS0FBQSxHQUFPLFNBQUMsU0FBRCxFQUFZLFVBQVo7QUFDTixRQUFBO0lBQUEsSUFBRyxTQUFBLElBQWMsU0FBUyxDQUFDLElBQTNCO01BQ0MsSUFBQSxHQUFPLFNBQVMsQ0FBQztNQUNqQixJQUFvQixNQUFNLENBQUMsSUFBUCxDQUFZLFNBQVosQ0FBc0IsQ0FBQyxNQUF2QixLQUFpQyxDQUFyRDtRQUFBLFNBQUEsR0FBWSxLQUFaO09BRkQ7O0lBSUEsSUFBRyxTQUFBLElBQWEsVUFBaEI7TUFDQyxJQUFBLEdBQU8sY0FBQSxDQUFlLElBQWYsRUFBa0IsU0FBbEIsRUFBNkIsVUFBN0IsRUFEUjtLQUFBLE1BQUE7TUFHQyxJQUFBLEdBQU8sTUFBTSxDQUFDLEtBQVAsQ0FBYSxJQUFiO01BQ1AsSUFBSSxDQUFDLE9BQUwsR0FBZSxNQUFNLENBQUMsS0FBUCxDQUFhLElBQUksQ0FBQyxPQUFsQixFQUpoQjs7SUFPQSxPQUFBLEdBQVUsUUFBQSxhQUFTLENBQUEsSUFBSSxDQUFDLElBQUwsRUFBVyxJQUFJLENBQUMsT0FBUyxTQUFBLFdBQUEsSUFBSSxDQUFDLFFBQUwsQ0FBQSxDQUFsQztJQUVWLElBQUcsSUFBQyxDQUFBLGFBQUo7TUFDQyxJQUFHLFNBQUEsS0FBZSxLQUFsQjtRQUNDLE9BQU8sQ0FBQyxTQUFSLENBQWtCLElBQWxCLEVBREQ7O01BRUEsbURBQTRCLENBQUUsY0FBOUI7UUFDQyxPQUFPLENBQUMsWUFBUixDQUFxQixPQUFyQixFQUE4QixJQUE5QixFQUREO09BSEQ7O0FBTUEsV0FBTztFQXBCRDs7Ozs7OztBQXVCUjs7O0VBQ0EsYUFBYSxDQUFDLE9BQVE7OztBQUd0QixNQUFNLENBQUMsY0FBUCxDQUFzQixhQUFhLENBQUEsU0FBbkMsRUFBdUMsT0FBdkMsRUFBZ0Q7RUFBQSxHQUFBLEVBQUssU0FBQTtXQUNwRCxJQUFDLENBQUEsVUFBRCxJQUFlLGFBQUEsQ0FBYyxJQUFkO0VBRHFDLENBQUw7Q0FBaEQiLCJzb3VyY2VzQ29udGVudCI6WyJfJHNtKCcuL2V4dGVuZFRlbXBsYXRlJyApXG5fJHNtKCcuL3BhcnNlVHJlZScgKVxuXyRzbSgnLi9zY2hlbWEnIClcblxuY2xhc3MgUXVpY2tUZW1wbGF0ZVxuXHRjb25zdHJ1Y3RvcjogKGNvbmZpZywgaXNUcmVlKS0+XG5cdFx0cmV0dXJuIGNvbmZpZyBpZiBJUy50ZW1wbGF0ZShjb25maWcpXG5cdFx0Y29uZmlnID0gaWYgaXNUcmVlIHRoZW4gcGFyc2VUcmVlKGNvbmZpZykgZWxzZSBjb25maWdcblx0XHRleHRlbmQgQCwgY29uZmlnXG5cdFx0QF9oYXNDb21wdXRlcnMgPSAhIUBvcHRpb25zLmNvbXB1dGVyc1xuXG5cdFx0aWYgbm90IEBfaGFzQ29tcHV0ZXJzIGFuZCBAY2hpbGRyZW4ubGVuZ3RoXG5cdFx0XHRmb3IgY2hpbGQgaW4gQGNoaWxkcmVuIHdoZW4gY2hpbGQuX2hhc0NvbXB1dGVycyBvciBjaGlsZC5vcHRpb25zLmNvbXB1dGVyc1xuXHRcdFx0XHRAX2hhc0NvbXB1dGVycyA9IHRydWVcblx0XHRcdFx0YnJlYWtcblx0XG5cdGV4dGVuZDogKG5ld1ZhbHVlcywgZ2xvYmFsT3B0cyktPlxuXHRcdG5ldyBRdWlja1RlbXBsYXRlIGV4dGVuZFRlbXBsYXRlKEAsIG5ld1ZhbHVlcywgZ2xvYmFsT3B0cylcblxuXHRzcGF3bjogKG5ld1ZhbHVlcywgZ2xvYmFsT3B0cyktPlxuXHRcdGlmIG5ld1ZhbHVlcyBhbmQgbmV3VmFsdWVzLmRhdGFcblx0XHRcdGRhdGEgPSBuZXdWYWx1ZXMuZGF0YVxuXHRcdFx0bmV3VmFsdWVzID0gbnVsbCBpZiBPYmplY3Qua2V5cyhuZXdWYWx1ZXMpLmxlbmd0aCBpcyAxXG5cdFx0XG5cdFx0aWYgbmV3VmFsdWVzIG9yIGdsb2JhbE9wdHNcblx0XHRcdG9wdHMgPSBleHRlbmRUZW1wbGF0ZShALCBuZXdWYWx1ZXMsIGdsb2JhbE9wdHMpXG5cdFx0ZWxzZVxuXHRcdFx0b3B0cyA9IGV4dGVuZC5jbG9uZShAKVxuXHRcdFx0b3B0cy5vcHRpb25zID0gZXh0ZW5kLmNsb25lKG9wdHMub3B0aW9ucylcblx0XG5cblx0XHRlbGVtZW50ID0gUXVpY2tEb20ob3B0cy50eXBlLCBvcHRzLm9wdGlvbnMsIG9wdHMuY2hpbGRyZW4uLi4pXG5cblx0XHRpZiBAX2hhc0NvbXB1dGVyc1xuXHRcdFx0aWYgbmV3VmFsdWVzIGlzbnQgZmFsc2Vcblx0XHRcdFx0ZWxlbWVudC5hcHBseURhdGEoZGF0YSlcblx0XHRcdGlmIGVsZW1lbnQub3B0aW9ucy5jb21wdXRlcnM/Ll9pbml0XG5cdFx0XHRcdGVsZW1lbnQuX3J1bkNvbXB1dGVyKCdfaW5pdCcsIGRhdGEpXG5cblx0XHRyZXR1cm4gZWxlbWVudFxuXG5cbiMjIyBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAjIyNcblF1aWNrVGVtcGxhdGUubmFtZSA/PSAnUXVpY2tUZW1wbGF0ZSdcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkgUXVpY2tUZW1wbGF0ZTo6LCAnY2hpbGQnLCBnZXQ6ICgpLT5cblx0QF9jaGlsZFJlZnMgb3IgX2dldENoaWxkUmVmcyhAKSAjIHNvdXJjZSBpbiAvc3JjL3BhcnRzL2VsZW1lbnQvdHJhdmVyc2luZy5jb2ZmZWVcblxuXG5cblxuXG5cblxuXG4iXX0=
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

QuickDom.version = "1.0.75";

QuickDom.CSS = CSS;

module.exports = QuickDom;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxZQUFBLEdBQWU7OztBQUNmOztBQUNBLElBQUEsQ0FBSyxVQUFMLEVBQWdCLFVBQWhCOzs7QUFDQTs7QUFDQSxJQUFBLENBQUssY0FBTCxFQUFvQixhQUFwQjs7QUFDQSxJQUFBLENBQUssd0JBQUw7O0FBQ0EsSUFBQSxDQUFLLGlCQUFMOztBQUNBLElBQUEsQ0FBSyxnQkFBTDs7QUFDQSxJQUFBLENBQUssaUJBQUw7O0FBQ0EsSUFBQSxDQUFLLGdCQUFMOztBQUNBLElBQUEsQ0FBSyxvQkFBTDs7QUFFQSxRQUFBLEdBQVcsU0FBQTtBQUFLLE1BQUE7RUFBQSxJQUFBLEdBQUs7QUFBVyxVQUFBLEtBQUE7QUFBQSxVQUMxQixFQUFFLENBQUMsS0FBSCxDQUFTLElBQUssQ0FBQSxDQUFBLENBQWQsQ0FEMEI7QUFFOUIsYUFBTyxRQUFBLGFBQVMsSUFBSyxDQUFBLENBQUEsQ0FBZDtBQUZ1QixVQUkxQixFQUFFLENBQUMsUUFBSCxDQUFZLElBQUssQ0FBQSxDQUFBLENBQWpCLENBSjBCO0FBSzlCLGFBQU8sSUFBSyxDQUFBLENBQUEsQ0FBRSxDQUFDLEtBQVIsQ0FBQTtBQUx1QixVQU8xQixFQUFFLENBQUMsVUFBSCxDQUFjLElBQUssQ0FBQSxDQUFBLENBQW5CLENBUDBCO01BUXZCLElBQUcsSUFBSyxDQUFBLENBQUEsQ0FBUjtlQUFnQixJQUFLLENBQUEsQ0FBQSxDQUFFLENBQUMsYUFBUixDQUFzQixJQUFLLENBQUEsQ0FBQSxDQUEzQixFQUFoQjtPQUFBLE1BQUE7ZUFBb0QsSUFBSyxDQUFBLENBQUEsRUFBekQ7O0FBUnVCLFdBVTFCLEVBQUUsQ0FBQyxPQUFILENBQVcsSUFBSyxDQUFBLENBQUEsQ0FBaEIsQ0FBQSxJQUF1QixFQUFFLENBQUMsTUFBSCxDQUFVLElBQUssQ0FBQSxDQUFBLENBQWYs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QUFULEdBQW9CLFNBQUMsTUFBRDtTQUNuQixRQUFBLENBQVMsUUFBVCxDQUFrQixDQUFDLFFBQW5CLENBQTRCLE1BQTVCO0FBRG1COztBQUdwQixRQUFRLENBQUMsVUFBVCxHQUFzQixTQUFDLE1BQUQ7U0FDckIsRUFBRSxDQUFDLFFBQUgsQ0FBWSxNQUFaO0FBRHFCOztBQUd0QixRQUFRLENBQUMsU0FBVCxHQUFxQixTQUFDLE1BQUQ7U0FDcEIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxNQUFkO0FBRG9COztBQUdyQixRQUFRLENBQUMsSUFBVCxHQUFnQixTQUFDLE1BQUQ7U0FDZixFQUFFLENBQUMsS0FBSCxDQUFTLE1BQVQ7QUFEZTs7QUFPaEIsSUFBQSxDQUFLLGVBQUw7O0FBQ0EsSUFBQSxDQUFLLGtCQUFMOztBQUNBLElBQUEsQ0FBSyxtQkFBTDs7QUFDQSxRQUFRLENBQUMsT0FBVCxHQUFtQixJQUFBLENBQUssMkJBQUw7O0FBQ25CLFFBQVEsQ0FBQyxHQUFULEdBQWU7O0FBQ2YsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJzdmdOYW1lc3BhY2UgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnXG4jIyMgaXN0YW5idWwgaWdub3JlIG5leHQgIyMjXG5fJHNtKCdxdWlja2NzcycsJyogYXMgQ1NTJyAgICApXG4jIyMgaXN0YW5idWwgaWdub3JlIG5leHQgIyMjXG5fJHNtKCdzbWFydC1leHRlbmQnLCcqIGFzIGV4dGVuZCcgICAgKVxuXyRzbSgnLi9wYXJ0cy9hbGxvd2VkT3B0aW9ucycgKVxuXyRzbSgnLi9wYXJ0cy9oZWxwZXJzJyApXG5fJHNtKCcuL3BhcnRzL2NoZWNrcycgKVxuXyRzbSgnLi9wYXJ0cy9lbGVtZW50JyApXG5fJHNtKCcuL3BhcnRzL3dpbmRvdycgKVxuXyRzbSgnLi9wYXJ0cy9tZWRpYVF1ZXJ5JyApXG5cblF1aWNrRG9tID0gKCktPiBhcmdzPWFyZ3VtZW50czsgc3dpdGNoXG5cdHdoZW4gSVMuYXJyYXkoYXJnc1swXSlcblx0XHRyZXR1cm4gUXVpY2tEb20oYXJnc1swXS4uLilcblx0XG5cdHdoZW4gSVMudGVtcGxhdGUoYXJnc1swXSlcblx0XHRyZXR1cm4gYXJnc1swXS5zcGF3bigpXG5cdFxuXHR3aGVuIElTLnF1aWNrRG9tRWwoYXJnc1swXSlcblx0XHRyZXR1cm4gaWYgYXJnc1sxXSB0aGVuIGFyZ3NbMF0udXBkYXRlT3B0aW9ucyhhcmdzWzFdKSBlbHNlIGFyZ3NbMF1cblx0XG5cdHdoZW4gSVMuZG9tTm9kZShhcmdzWzBdKSBvciBJUy5kb21Eb2MoYXJnc1swXSlcblx0XHRpZiBhcmdzWzBdLl9xdWlja0VsZW1lbnRcblx0XHRcdHJldHVybiBhcmdzWzBdLl9xdWlja0VsZW1lbnRcblx0XHRcblx0XHR0eXBlID0gYXJnc1swXS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJyMnLCAnJylcblx0XHRvcHRpb25zID0gYXJnc1sxXSBvciB7fVxuXHRcdG9wdGlvbnMuZXhpc3RpbmcgPSBhcmdzWzBdXG5cdFx0cmV0dXJuIG5ldyBRdWlja0VsZW1lbnQodHlwZSwgb3B0aW9ucylcblxuXHR3aGVuIGFyZ3NbMF0gaXMgd2luZG93XG5cdFx0cmV0dXJuIFF1aWNrV2luZG93XG5cblx0d2hlbiBJUy5zdHJpbmcoYXJnc1swXSlcdFx0XHRcblx0XHR0eXBlID0gYXJnc1swXS50b0xvd2VyQ2FzZSgpXG5cdFx0aWYgdHlwZSBpcyAndGV4dCdcblx0XHRcdG9wdGlvbnMgPSBpZiBJUy5vYmplY3QoYXJnc1sxXSkgdGhlbiBhcmdzWzFdIGVsc2Uge3RleHQ6YXJnc1sxXSBvciAnJ31cblx0XHRlbHNlXG5cdFx0XHRvcHRpb25zID0gaWYgSVMub2JqZWN0KGFyZ3NbMV0pIHRoZW4gYXJnc1sxXSBlbHNlIHt9XG5cdFx0XG5cdFx0ZWxlbWVudCA9IG5ldyBRdWlja0VsZW1lbnQodHlwZSwgb3B0aW9ucylcblx0XHRpZiBhcmdzLmxlbmd0aCA+IDJcblx0XHRcdGNoaWxkcmVuID0gW107IGkgPSAxOyBhcmdzTGVuZ3RoID0gYXJncy5sZW5ndGg7IGNoaWxkcmVuLnB1c2goYXJnc1tpXSkgd2hpbGUgKytpIDwgYXJnc0xlbmd0aFxuXG5cdFx0XHRmb3IgY2hpbGQgaW4gY2hpbGRyZW5cblx0XHRcdFx0Y2hpbGQgPSBRdWlja0RvbS50ZXh0KGNoaWxkKSBpZiBJUy5zdHJpbmcoY2hpbGQpXG5cdFx0XHRcdGNoaWxkID0gY2hpbGQuc3Bhd24oZmFsc2UpIGlmIElTLnRlbXBsYXRlKGNoaWxkKVxuXHRcdFx0XHRjaGlsZCA9IFF1aWNrRG9tKGNoaWxkLi4uKSBpZiBJUy5hcnJheShjaGlsZClcblx0XHRcdFx0Y2hpbGQuYXBwZW5kVG8oZWxlbWVudCkgaWYgSVMucXVpY2tEb21FbChjaGlsZClcblxuXHRcdHJldHVybiBlbGVtZW50XG5cblxuUXVpY2tEb20udGVtcGxhdGUgPSAodHJlZSktPlxuXHRuZXcgUXVpY2tUZW1wbGF0ZSh0cmVlLCB0cnVlKVxuXG5cblF1aWNrRG9tLmh0bWwgPSAoaW5uZXJIVE1MKS0+XG5cdGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdGNvbnRhaW5lci5pbm5lckhUTUwgPSBpbm5lckhUTUxcblx0Y2hpbGRyZW4gPSBBcnJheTo6c2xpY2UuY2FsbCBjb250YWluZXIuY2hpbGROb2Rlc1xuXG5cdHJldHVybiBRdWlja0RvbS5iYXRjaChjaGlsZHJlbilcblxuUXVpY2tEb20ucXVlcnkgPSAodGFyZ2V0KS0+XG5cdFF1aWNrRG9tKGRvY3VtZW50KS5xdWVyeSh0YXJnZXQpXG5cblF1aWNrRG9tLnF1ZXJ5QWxsID0gKHRhcmdldCktPlxuXHRRdWlja0RvbShkb2N1bWVudCkucXVlcnlBbGwodGFyZ2V0KVxuXG5RdWlja0RvbS5pc1RlbXBsYXRlID0gKHRhcmdldCktPlxuXHRJUy50ZW1wbGF0ZSh0YXJnZXQpXG5cblF1aWNrRG9tLmlzUXVpY2tFbCA9ICh0YXJnZXQpLT5cblx0SVMucXVpY2tEb21FbCh0YXJnZXQpXG5cblF1aWNrRG9tLmlzRWwgPSAodGFyZ2V0KS0+XG5cdElTLmRvbUVsKHRhcmdldClcblxuXG5cblxuXG5fJHNtKCcuL3BhcnRzL2JhdGNoJyApXG5fJHNtKCcuL3BhcnRzL3RlbXBsYXRlJyApXG5fJHNtKCcuL3BhcnRzL3Nob3J0Y3V0cycgKVxuUXVpY2tEb20udmVyc2lvbiA9IF8kc20oJy4uL3BhY2thZ2UuanNvbiAkIHZlcnNpb24nIClcblF1aWNrRG9tLkNTUyA9IENTU1xubW9kdWxlLmV4cG9ydHMgPSBRdWlja0RvbVxuXG5cblxuIl19
;
return module.exports;
},
7: function (require, module, exports) {
module.exports = {
  boundingEl: document.body,
  itemLabel: 'Option',
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWZhdWx0cy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQVAsR0FDQztFQUFBLFVBQUEsRUFBWSxRQUFRLENBQUMsSUFBckI7RUFDQSxTQUFBLEVBQVcsUUFEWDtFQUVBLGVBQUEsRUFBaUIsS0FGakI7RUFHQSxTQUFBLEVBQVcsSUFIWDtFQUlBLFFBQUEsRUFBVSxJQUpWO0VBS0EsSUFBQSxFQUFNLElBTE47RUFNQSxVQUFBLEVBQVksU0FOWjtFQU9BLE1BQUEsRUFDQztJQUFBLE9BQUEsRUFBUyxTQUFUO0lBQ0EsU0FBQSxFQUFXLE1BRFg7R0FSRCIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID1cblx0Ym91bmRpbmdFbDogZG9jdW1lbnQuYm9keVxuXHRpdGVtTGFiZWw6ICdPcHRpb24nXG5cdHJlcXVpcmVEZWZhdWx0czogZmFsc2Vcblx0dGVtcGxhdGVzOiBudWxsXG5cdGRlZmF1bHRzOiBudWxsXG5cdHRhZ3M6IG51bGxcblx0Zm9udEZhbWlseTogJ2luaGVyaXQnXG5cdGJ1dHRvbjpcblx0XHRiZ0NvbG9yOiAnI2Y3NDQyNSdcblx0XHR0ZXh0Q29sb3I6ICcjZmZmJyJdfQ==
;
return module.exports;
},
8: function (require, module, exports) {
var DOM;

DOM = require(6);

var container = DOM.template([
  'div', {
    ref: 'TagList',
    style: {
      position: 'relative',
      textAlign: 'left',
      fontFamily: function(taglist) {
        return taglist.settings.fontFamily;
      }
    },
    computers: {
      _init: function() {
        return addButton.spawn(null, {
          relatedInstance: this.relatedInstance
        }).appendTo(this);
      }
    }
  }
]);
exports.container = container; 

var overlay = DOM.template([
  'div', {
    ref: 'overlay',
    style: {
      position: 'fixed',
      zIndex: 2000,
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      visibility: 'hidden',
      $isRevealed: {
        visibility: 'visible'
      }
    }
  }
]);
exports.overlay = overlay; 

var addButton = DOM.template([
  'div', {
    ref: 'addButton',
    style: {
      position: 'relative',
      display: 'inline-block',
      verticalAlign: 'top',
      height: '28px',
      width: '28px',
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
]);
exports.addButton = addButton; 

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZW1wbGF0ZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxHQUFBLEdBQU0sSUFBQSxDQUFLLFVBQUw7O0FBRU4sT0FBQSxJQUFPLFNBQVAsR0FBbUIsR0FBRyxDQUFDLFFBQUosQ0FDbEI7RUFBQyxLQUFELEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBTDtJQUNBLEtBQUEsRUFDQztNQUFBLFFBQUEsRUFBVSxVQUFWO01BQ0EsU0FBQSxFQUFXLE1BRFg7TUFFQSxVQUFBLEVBQVksU0FBQyxPQUFEO2VBQVksT0FBTyxDQUFDLFFBQVEsQ0FBQztNQUE3QixDQUZaO0tBRkQ7SUFNQSxTQUFBLEVBQVc7TUFBQSxLQUFBLEVBQU8sU0FBQTtlQUNqQixTQUFTLENBQUMsS0FBVixDQUFnQixJQUFoQixFQUFzQjtVQUFFLGlCQUFELElBQUMsQ0FBQSxlQUFGO1NBQXRCLENBQXlDLENBQUMsUUFBMUMsQ0FBbUQsSUFBbkQ7TUFEaUIsQ0FBUDtLQU5YO0dBREQ7Q0FEa0I7O0FBYW5CLE9BQUEsSUFBTyxPQUFQLEdBQWlCLEdBQUcsQ0FBQyxRQUFKLENBQ2hCO0VBQUMsS0FBRCxFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUw7SUFDQSxLQUFBLEVBQ0M7TUFBQSxRQUFBLEVBQVUsT0FBVjtNQUNBLE1BQUEsRUFBUSxJQURSO01BRUEsR0FBQSxFQUFLLENBRkw7TUFHQSxJQUFBLEVBQU0sQ0FITjtNQUlBLEtBQUEsRUFBTyxPQUpQO01BS0EsTUFBQSxFQUFRLE9BTFI7TUFNQSxVQUFBLEVBQVksUUFOWjtNQU9BLFdBQUEsRUFDQztRQUFBLFVBQUEsRUFBWSxTQUFaO09BUkQ7S0FGRDtHQUREO0NBRGdCOztBQWdCakIsT0FBQSxJQUFPLFNBQVAsR0FBbUIsR0FBRyxDQUFDLFFBQUosQ0FDbEI7RUFBQyxLQUFELEVBQ0M7SUFBQSxHQUFBLEVBQUssV0FBTDtJQUNBLEtBQUEsRUFDQztNQUFBLFFBQUEsRUFBVSxVQUFWO01BQ0EsT0FBQSxFQUFTLGNBRFQ7TUFFQSxhQUFBLEVBQWUsS0FGZjtNQUdBLE1BQUEsRUFBUSxNQUhSO01BSUEsS0FBQSxFQUFPLE1BSlA7TUFLQSxNQUFBLEVBQVEsWUFMUjtNQU1BLFlBQUEsRUFBYyxLQU5kO01BT0EsU0FBQSxFQUFXLFlBUFg7TUFRQSxNQUFBLEVBQVEsU0FSUjtNQVNBLFVBQUEsRUFBWSxNQVRaO01BVUEsT0FBQSxFQUFTLElBVlQ7TUFXQSxLQUFBLEVBQU8sU0FYUDtLQUZEO0dBREQsRUFnQkM7SUFBQyxLQUFELEVBQ0M7TUFBQSxHQUFBLEVBQUssbUJBQUw7TUFDQSxLQUFBLEVBQ0M7UUFBQSxRQUFBLEVBQVUsVUFBVjtRQUNBLElBQUEsRUFBTSxDQUROO1FBRUEsS0FBQSxFQUFPLENBRlA7UUFHQSxHQUFBLEVBQUssS0FITDtRQUlBLFNBQUEsRUFBVyxvQkFKWDtRQUtBLEtBQUEsRUFBTyxNQUxQO1FBTUEsVUFBQSxFQUFZLENBTlo7UUFPQSxTQUFBLEVBQVcsUUFQWDtRQVFBLFFBQUEsRUFBVSxNQVJWO1FBU0EsVUFBQSxFQUFZLEdBVFo7T0FGRDtLQURELEVBYUEsR0FiQTtHQWhCRDtDQURrQiIsInNvdXJjZXNDb250ZW50IjpbIkRPTSA9IF8kc20oJ3F1aWNrZG9tJyApXG5cbmV4cG9ydCBjb250YWluZXIgPSBET00udGVtcGxhdGUoXG5cdFsnZGl2J1xuXHRcdHJlZjogJ1RhZ0xpc3QnXG5cdFx0c3R5bGU6XG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuXHRcdFx0dGV4dEFsaWduOiAnbGVmdCdcblx0XHRcdGZvbnRGYW1pbHk6ICh0YWdsaXN0KS0+IHRhZ2xpc3Quc2V0dGluZ3MuZm9udEZhbWlseVxuXG5cdFx0Y29tcHV0ZXJzOiBfaW5pdDogKCktPlxuXHRcdFx0YWRkQnV0dG9uLnNwYXduKG51bGwsIHtAcmVsYXRlZEluc3RhbmNlfSkuYXBwZW5kVG8oQClcblx0XVxuKVxuXG5leHBvcnQgb3ZlcmxheSA9IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAnb3ZlcmxheSdcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAnZml4ZWQnXG5cdFx0XHR6SW5kZXg6IDIwMDBcblx0XHRcdHRvcDogMFxuXHRcdFx0bGVmdDogMFxuXHRcdFx0d2lkdGg6ICcxMDB2dydcblx0XHRcdGhlaWdodDogJzEwMHZoJ1xuXHRcdFx0dmlzaWJpbGl0eTogJ2hpZGRlbidcblx0XHRcdCRpc1JldmVhbGVkOlxuXHRcdFx0XHR2aXNpYmlsaXR5OiAndmlzaWJsZSdcblx0XVxuKVxuXG5leHBvcnQgYWRkQnV0dG9uID0gRE9NLnRlbXBsYXRlKFxuXHRbJ2Rpdidcblx0XHRyZWY6ICdhZGRCdXR0b24nXG5cdFx0c3R5bGU6XG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuXHRcdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaydcblx0XHRcdHZlcnRpY2FsQWxpZ246ICd0b3AnXG5cdFx0XHRoZWlnaHQ6ICcyOHB4J1xuXHRcdFx0d2lkdGg6ICcyOHB4J1xuXHRcdFx0Ym9yZGVyOiAnMnB4IGRhc2hlZCdcblx0XHRcdGJvcmRlclJhZGl1czogJzVweCdcblx0XHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnXG5cdFx0XHRjdXJzb3I6ICdwb2ludGVyJ1xuXHRcdFx0dXNlclNlbGVjdDogJ25vbmUnXG5cdFx0XHRvcGFjaXR5OiAwLjM1XG5cdFx0XHRjb2xvcjogJyMxODE4MTgnXG5cblx0XHRbJ2Rpdidcblx0XHRcdHJlZjogJ1RhZ0xpc3RCdXR0b25UZXh0J1xuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXG5cdFx0XHRcdGxlZnQ6IDBcblx0XHRcdFx0cmlnaHQ6IDBcblx0XHRcdFx0dG9wOiAnNTUlJ1xuXHRcdFx0XHR0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMCwgLTUwJSknXG5cdFx0XHRcdHdpZHRoOiAnMTAwJSdcblx0XHRcdFx0bGluZUhlaWdodDogMVxuXHRcdFx0XHR0ZXh0QWxpZ246ICdjZW50ZXInXG5cdFx0XHRcdGZvbnRTaXplOiAnMjNweCdcblx0XHRcdFx0Zm9udFdlaWdodDogNjAwXG5cdFx0JysnXVxuXHRdXG4pXG5cblxuXG5cbiJdfQ==
;
return module.exports;
},
9: function (require, module, exports) {
module.exports = {
  maxWidth: 350,
  padding: 20,
  animationSpeed: 300
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWZhdWx0cy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQVAsR0FDQztFQUFBLFFBQUEsRUFBVSxHQUFWO0VBQ0EsT0FBQSxFQUFTLEVBRFQ7RUFFQSxjQUFBLEVBQWdCLEdBRmhCIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcblx0bWF4V2lkdGg6IDM1MFxuXHRwYWRkaW5nOiAyMFxuXHRhbmltYXRpb25TcGVlZDogMzAwIl19
;
return module.exports;
},
10: function (require, module, exports) {
var DOM, ease, svg;

DOM = require(6);

svg = require(27);

ease = 'cubic-bezier(0.785, 0.135, 0.15, 0.86)';

var container = DOM.template([
  'div', {
    ref: 'TagList-Popup',
    style: {
      position: 'fixed',
      zIndex: 2001,
      backgroundColor: 'white',
      borderRadius: '5px',
      boxShadow: '0px 3px 18px rgba(0,0,0,0.24)',
      opacity: 0,
      boxSizing: 'border-box',
      fontFamily: function(popup) {
        return popup.list.settings.fontFamily;
      },
      $animating: {
        transition: function(popup) {
          var speed;
          speed = popup.settings.animationSpeed;
          return "opacity " + speed + "ms " + ease + ", transform " + speed + "ms " + ease + ", -webkit-transform " + speed + "ms " + ease;
        }
      }
    }
  }, [
    'div', {
      ref: 'content',
      style: {
        display: 'none',
        boxSizing: 'border-box',
        padding: function(popup) {
          return popup.settings.padding + "px";
        },
        $hasContent: {
          display: 'block'
        }
      }
    }
  ]
]);
exports.container = container; 

var button = DOM.template([
   'div', {
     ref: 'button',
     style: {
       position: 'relative',
       display: 'none',
       height: 50,
       borderRadius: '0 0 5px 5px',
       boxSizing: 'border-box',
       cursor: 'pointer',
       userSelect: 'none',
       backgroundColor: function(popup) {
         return popup.list.settings.button.bgColor;
       },
       color: function(popup) {
         return popup.list.settings.button.textColor;
       },
       $hasContent: {
         display: 'block'
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
         fontSize: 16,
         lineHeight: 1,
         fontWeight: 500,
         textAlign: 'center',
         textTransform: 'uppercase',
         letterSpacing: '1.5px'
       },
       computers: {
         _init: function() {
           return this.text = "Add " + this.related.list.settings.itemLabel;
         }
       }
     }
   ]
 ]);
 exports.button = button; 

var select = DOM.template([
  'div', {
    ref: 'selectWrapper',
    style: {
      position: 'relative',
      width: '100%',
      height: '55px',
      borderBottom: '1px solid #ddd'
    }
  }, [
    'div', {
      ref: 'selectArrow',
      style: {
        position: 'absolute',
        zIndex: 2,
        right: '15px',
        top: '54%',
        transform: "translate(0, -50%)",
        width: '17px',
        height: '17px',
        backgroundSize: '100%',
        backgroundImage: "url(" + svg.arrowDown + ")",
        opacity: 0.5
      }
    }
  ], [
    'div', {
      ref: 'selectFake',
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
  ], [
    'select', {
      ref: 'selectInput',
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
          }, "Add " + this.related.list.settings.itemLabel).appendTo(this);
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
          }
        }
      }
    }
  ]
]);
exports.select = select; 

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZW1wbGF0ZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxHQUFBLEdBQU0sSUFBQSxDQUFLLFVBQUw7O0FBQ04sR0FBQSxHQUFNLElBQUEsQ0FBSyxRQUFMOztBQUNOLElBQUEsR0FBTzs7QUFFUCxPQUFBLElBQU8sU0FBUCxHQUFtQixHQUFHLENBQUMsUUFBSixDQUNsQjtFQUFDLEtBQUQsRUFDQztJQUFBLEdBQUEsRUFBSyxlQUFMO0lBQ0EsS0FBQSxFQUNDO01BQUEsUUFBQSxFQUFVLE9BQVY7TUFDQSxNQUFBLEVBQVEsSUFEUjtNQUVBLGVBQUEsRUFBaUIsT0FGakI7TUFHQSxZQUFBLEVBQWMsS0FIZDtNQUlBLFNBQUEsRUFBVywrQkFKWDtNQUtBLE9BQUEsRUFBUyxDQUxUO01BTUEsU0FBQSxFQUFXLFlBTlg7TUFPQSxVQUFBLEVBQVksU0FBQyxLQUFEO2VBQVUsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7TUFBOUIsQ0FQWjtNQVFBLFVBQUEsRUFDQztRQUFBLFVBQUEsRUFBWSxTQUFDLEtBQUQ7QUFDWCxjQUFBO1VBQUEsS0FBQSxHQUFRLEtBQUssQ0FBQyxRQUFRLENBQUM7aUJBQ3ZCLFVBQUEsR0FBVyxLQUFYLEdBQWlCLEtBQWpCLEdBQXNCLElBQXRCLEdBQTJCLGNBQTNCLEdBQXlDLEtBQXpDLEdBQStDLEtBQS9DLEdBQW9ELElBQXBELEdBQXlELHNCQUF6RCxHQUErRSxLQUEvRSxHQUFxRixLQUFyRixHQUEwRjtRQUYvRSxDQUFaO09BVEQ7S0FGRDtHQURELEVBZ0JDO0lBQUMsS0FBRCxFQUNDO01BQUEsR0FBQSxFQUFLLFNBQUw7TUFDQSxLQUFBLEVBQ0M7UUFBQSxPQUFBLEVBQVMsTUFBVDtRQUNBLFNBQUEsRUFBVyxZQURYO1FBRUEsT0FBQSxFQUFTLFNBQUMsS0FBRDtpQkFBYSxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQWhCLEdBQXdCO1FBQXBDLENBRlQ7UUFHQSxXQUFBLEVBQ0M7VUFBQSxPQUFBLEVBQVMsT0FBVDtTQUpEO09BRkQ7S0FERDtHQWhCRDtDQURrQjs7QUE4Qm5CLE9BQUEsSUFBTyxNQUFQLEdBQWdCLEdBQUcsQ0FBQyxRQUFKLENBQ2Y7RUFBQyxLQUFELEVBQ0M7SUFBQSxHQUFBLEVBQUssUUFBTDtJQUNBLEtBQUEsRUFDQztNQUFBLFFBQUEsRUFBVSxVQUFWO01BQ0EsT0FBQSxFQUFTLE1BRFQ7TUFFQSxNQUFBLEVBQVEsRUFGUjtNQUdBLFlBQUEsRUFBYyxhQUhkO01BSUEsU0FBQSxFQUFXLFlBSlg7TUFLQSxNQUFBLEVBQVEsU0FMUjtNQU1BLFVBQUEsRUFBWSxNQU5aO01BT0EsZUFBQSxFQUFpQixTQUFDLEtBQUQ7ZUFBVSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7TUFBckMsQ0FQakI7TUFRQSxLQUFBLEVBQU8sU0FBQyxLQUFEO2VBQVUsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO01BQXJDLENBUlA7TUFTQSxXQUFBLEVBQ0M7UUFBQSxPQUFBLEVBQVMsT0FBVDtPQVZEO0tBRkQ7R0FERCxFQWVDO0lBQUMsS0FBRCxFQUNDO01BQUEsR0FBQSxFQUFLLFlBQUw7TUFDQSxLQUFBLEVBQ0M7UUFBQSxRQUFBLEVBQVUsVUFBVjtRQUNBLEdBQUEsRUFBSyxLQURMO1FBRUEsU0FBQSxFQUFXLG9CQUZYO1FBR0EsT0FBQSxFQUFTLE9BSFQ7UUFJQSxLQUFBLEVBQU8sTUFKUDtRQUtBLFFBQUEsRUFBVSxFQUxWO1FBTUEsVUFBQSxFQUFZLENBTlo7UUFPQSxVQUFBLEVBQVksR0FQWjtRQVFBLFNBQUEsRUFBVyxRQVJYO1FBU0EsYUFBQSxFQUFlLFdBVGY7UUFVQSxhQUFBLEVBQWUsT0FWZjtPQUZEO01BY0EsU0FBQSxFQUFXO1FBQUEsS0FBQSxFQUFPLFNBQUE7aUJBQ2pCLElBQUMsQ0FBQSxJQUFELEdBQVEsTUFBQSxHQUFPLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQURyQixDQUFQO09BZFg7S0FERDtHQWZEO0NBRGU7O0FBcUNoQixPQUFBLElBQU8sTUFBUCxHQUFnQixHQUFHLENBQUMsUUFBSixDQUNmO0VBQUMsS0FBRCxFQUNDO0lBQUEsR0FBQSxFQUFLLGVBQUw7SUFDQSxLQUFBLEVBQ0M7TUFBQSxRQUFBLEVBQVUsVUFBVjtNQUNBLEtBQUEsRUFBTyxNQURQO01BRUEsTUFBQSxFQUFRLE1BRlI7TUFHQSxZQUFBLEVBQWMsZ0JBSGQ7S0FGRDtHQURELEVBUUM7SUFBQyxLQUFELEVBQ0M7TUFBQSxHQUFBLEVBQUssYUFBTDtNQUNBLEtBQUEsRUFDQztRQUFBLFFBQUEsRUFBVSxVQUFWO1FBQ0EsTUFBQSxFQUFRLENBRFI7UUFFQSxLQUFBLEVBQU8sTUFGUDtRQUdBLEdBQUEsRUFBSyxLQUhMO1FBSUEsU0FBQSxFQUFXLG9CQUpYO1FBS0EsS0FBQSxFQUFPLE1BTFA7UUFNQSxNQUFBLEVBQVEsTUFOUjtRQU9BLGNBQUEsRUFBZ0IsTUFQaEI7UUFRQSxlQUFBLEVBQWlCLE1BQUEsR0FBTyxHQUFHLENBQUMsU0FBWCxHQUFxQixHQVJ0QztRQVNBLE9BQUEsRUFBUyxHQVRUO09BRkQ7S0FERDtHQVJELEVBdUJDO0lBQUMsS0FBRCxFQUNDO01BQUEsR0FBQSxFQUFLLFlBQUw7TUFDQSxLQUFBLEVBQ0M7UUFBQSxRQUFBLEVBQVUsVUFBVjtRQUNBLE1BQUEsRUFBUSxDQURSO1FBRUEsSUFBQSxFQUFNLENBRk47UUFHQSxHQUFBLEVBQUssS0FITDtRQUlBLFNBQUEsRUFBVyxvQkFKWDtRQUtBLE1BQUEsRUFBUSxNQUxSO1FBTUEsT0FBQSxFQUFTLFFBTlQ7UUFPQSxRQUFBLEVBQVUsTUFQVjtRQVFBLFVBQUEsRUFBWSxHQVJaO1FBU0EsVUFBQSxFQUFZLENBVFo7UUFVQSxTQUFBLEVBQVcsTUFWWDtRQVdBLFVBQUEsRUFBWSxNQVhaO1FBWUEsU0FBQSxFQUFXLFlBWlg7UUFhQSxLQUFBLEVBQU8sU0FiUDtRQWNBLE9BQUEsRUFBUyxHQWRUO1FBZUEsV0FBQSxFQUNDO1VBQUEsT0FBQSxFQUFTLENBQVQ7U0FoQkQ7T0FGRDtLQUREO0dBdkJELEVBNkNDO0lBQUMsUUFBRCxFQUNDO01BQUEsR0FBQSxFQUFLLGFBQUw7TUFDQSxLQUFBLEVBQ0M7UUFBQSxRQUFBLEVBQVUsVUFBVjtRQUNBLE1BQUEsRUFBUSxDQURSO1FBRUEsR0FBQSxFQUFLLENBRkw7UUFHQSxJQUFBLEVBQU0sQ0FITjtRQUlBLEtBQUEsRUFBTyxNQUpQO1FBS0EsTUFBQSxFQUFRLE1BTFI7UUFNQSxPQUFBLEVBQVMsQ0FOVDtPQUZEO01BVUEsU0FBQSxFQUFXO1FBQUEsS0FBQSxFQUFPLFNBQUE7aUJBQ2pCLEdBQUcsQ0FBQyxNQUFKLENBQVc7WUFBQSxLQUFBLEVBQU07Y0FBQyxLQUFBLEVBQU0sRUFBUDthQUFOO1dBQVgsRUFBNkIsTUFBQSxHQUFPLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUEzRCxDQUF1RSxDQUFDLFFBQXhFLENBQWlGLElBQWpGO1FBRGlCLENBQVA7T0FWWDtNQWFBLE9BQUEsRUFDQztRQUFBLEtBQUEsRUFBTztVQUFBLEdBQUEsRUFBSyxTQUFBO0FBQ1gsZ0JBQUE7WUFBQSxRQUFBLEdBQVcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxhQUFMLElBQXNCO0FBQ2pDLG1FQUE2QixDQUFFO1VBRnBCLENBQUw7U0FBUDtRQUlBLEtBQUEsRUFBTztVQUFBLEdBQUEsRUFBSyxTQUFBO0FBQ1gsbUJBQU8sSUFBQyxDQUFBLEdBQUcsQ0FBQztVQURELENBQUw7U0FKUDtPQWREO0tBREQ7R0E3Q0Q7Q0FEZSIsInNvdXJjZXNDb250ZW50IjpbIkRPTSA9IF8kc20oJ3F1aWNrZG9tJyApXG5zdmcgPSBfJHNtKCcuLi9zdmcnIClcbmVhc2UgPSAnY3ViaWMtYmV6aWVyKDAuNzg1LCAwLjEzNSwgMC4xNSwgMC44NiknXG5cbmV4cG9ydCBjb250YWluZXIgPSBET00udGVtcGxhdGUoXG5cdFsnZGl2J1xuXHRcdHJlZjogJ1RhZ0xpc3QtUG9wdXAnXG5cdFx0c3R5bGU6XG5cdFx0XHRwb3NpdGlvbjogJ2ZpeGVkJ1xuXHRcdFx0ekluZGV4OiAyMDAxXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZSdcblx0XHRcdGJvcmRlclJhZGl1czogJzVweCdcblx0XHRcdGJveFNoYWRvdzogJzBweCAzcHggMThweCByZ2JhKDAsMCwwLDAuMjQpJ1xuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCdcblx0XHRcdGZvbnRGYW1pbHk6IChwb3B1cCktPiBwb3B1cC5saXN0LnNldHRpbmdzLmZvbnRGYW1pbHlcblx0XHRcdCRhbmltYXRpbmc6XG5cdFx0XHRcdHRyYW5zaXRpb246IChwb3B1cCktPlxuXHRcdFx0XHRcdHNwZWVkID0gcG9wdXAuc2V0dGluZ3MuYW5pbWF0aW9uU3BlZWRcblx0XHRcdFx0XHRcIm9wYWNpdHkgI3tzcGVlZH1tcyAje2Vhc2V9LCB0cmFuc2Zvcm0gI3tzcGVlZH1tcyAje2Vhc2V9LCAtd2Via2l0LXRyYW5zZm9ybSAje3NwZWVkfW1zICN7ZWFzZX1cIlxuXHRcdFxuXHRcdFsnZGl2J1xuXHRcdFx0cmVmOiAnY29udGVudCdcblx0XHRcdHN0eWxlOlxuXHRcdFx0XHRkaXNwbGF5OiAnbm9uZSdcblx0XHRcdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCdcblx0XHRcdFx0cGFkZGluZzogKHBvcHVwKS0+IFwiI3twb3B1cC5zZXR0aW5ncy5wYWRkaW5nfXB4XCJcblx0XHRcdFx0JGhhc0NvbnRlbnQ6XG5cdFx0XHRcdFx0ZGlzcGxheTogJ2Jsb2NrJ1xuXHRcdF1cblx0XVxuKVxuXG5cbmV4cG9ydCBidXR0b24gPSBET00udGVtcGxhdGUoXG5cdFsnZGl2J1xuXHRcdHJlZjogJ2J1dHRvbidcblx0XHRzdHlsZTpcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnXG5cdFx0XHRkaXNwbGF5OiAnbm9uZSdcblx0XHRcdGhlaWdodDogNTBcblx0XHRcdGJvcmRlclJhZGl1czogJzAgMCA1cHggNXB4J1xuXHRcdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCdcblx0XHRcdGN1cnNvcjogJ3BvaW50ZXInXG5cdFx0XHR1c2VyU2VsZWN0OiAnbm9uZSdcblx0XHRcdGJhY2tncm91bmRDb2xvcjogKHBvcHVwKS0+IHBvcHVwLmxpc3Quc2V0dGluZ3MuYnV0dG9uLmJnQ29sb3Jcblx0XHRcdGNvbG9yOiAocG9wdXApLT4gcG9wdXAubGlzdC5zZXR0aW5ncy5idXR0b24udGV4dENvbG9yXG5cdFx0XHQkaGFzQ29udGVudDpcblx0XHRcdFx0ZGlzcGxheTogJ2Jsb2NrJ1xuXG5cdFx0WydkaXYnXG5cdFx0XHRyZWY6ICdidXR0b25UZXh0J1xuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXG5cdFx0XHRcdHRvcDogJzUzJSdcblx0XHRcdFx0dHJhbnNmb3JtOiBcInRyYW5zbGF0ZSgwLCAtNTAlKVwiXG5cdFx0XHRcdGRpc3BsYXk6ICdibG9jaydcblx0XHRcdFx0d2lkdGg6ICcxMDAlJ1xuXHRcdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdFx0bGluZUhlaWdodDogMVxuXHRcdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdFx0dGV4dEFsaWduOiAnY2VudGVyJ1xuXHRcdFx0XHR0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJ1xuXHRcdFx0XHRsZXR0ZXJTcGFjaW5nOiAnMS41cHgnXG5cdFx0XHRcblx0XHRcdGNvbXB1dGVyczogX2luaXQ6ICgpLT5cblx0XHRcdFx0QHRleHQgPSBcIkFkZCAje0ByZWxhdGVkLmxpc3Quc2V0dGluZ3MuaXRlbUxhYmVsfVwiXG5cdFx0XVxuXHRdXG4pXG5cbmV4cG9ydCBzZWxlY3QgPSBET00udGVtcGxhdGUoXG5cdFsnZGl2J1xuXHRcdHJlZjogJ3NlbGVjdFdyYXBwZXInXG5cdFx0c3R5bGU6XG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuXHRcdFx0d2lkdGg6ICcxMDAlJ1xuXHRcdFx0aGVpZ2h0OiAnNTVweCdcblx0XHRcdGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCAjZGRkJ1xuXG5cdFx0WydkaXYnXG5cdFx0XHRyZWY6ICdzZWxlY3RBcnJvdydcblx0XHRcdHN0eWxlOlxuXHRcdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJ1xuXHRcdFx0XHR6SW5kZXg6IDJcblx0XHRcdFx0cmlnaHQ6ICcxNXB4J1xuXHRcdFx0XHR0b3A6ICc1NCUnXG5cdFx0XHRcdHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUoMCwgLTUwJSlcIlxuXHRcdFx0XHR3aWR0aDogJzE3cHgnXG5cdFx0XHRcdGhlaWdodDogJzE3cHgnXG5cdFx0XHRcdGJhY2tncm91bmRTaXplOiAnMTAwJSdcblx0XHRcdFx0YmFja2dyb3VuZEltYWdlOiBcInVybCgje3N2Zy5hcnJvd0Rvd259KVwiXG5cdFx0XHRcdG9wYWNpdHk6IDAuNVxuXHRcdF1cblx0XHRcblx0XHRbJ2Rpdidcblx0XHRcdHJlZjogJ3NlbGVjdEZha2UnXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZSdcblx0XHRcdFx0ekluZGV4OiAxXG5cdFx0XHRcdGxlZnQ6IDBcblx0XHRcdFx0dG9wOiAnNTMlJ1xuXHRcdFx0XHR0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDAsIC01MCUpXCJcblx0XHRcdFx0aGVpZ2h0OiAnMTZweCdcblx0XHRcdFx0cGFkZGluZzogJzAgMTVweCdcblx0XHRcdFx0Zm9udFNpemU6ICcxNnB4J1xuXHRcdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdFx0bGluZUhlaWdodDogMVxuXHRcdFx0XHR0ZXh0QWxpZ246ICdsZWZ0J1xuXHRcdFx0XHR1c2VyU2VsZWN0OiAnbm9uZSdcblx0XHRcdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCdcblx0XHRcdFx0Y29sb3I6ICcjMTgxODE4J1xuXHRcdFx0XHRvcGFjaXR5OiAwLjZcblx0XHRcdFx0JGhhc0NvbnRlbnQ6XG5cdFx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdF1cblx0XHRcblx0XHRbJ3NlbGVjdCdcblx0XHRcdHJlZjogJ3NlbGVjdElucHV0J1xuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXG5cdFx0XHRcdHpJbmRleDogM1xuXHRcdFx0XHR0b3A6IDBcblx0XHRcdFx0bGVmdDogMFxuXHRcdFx0XHR3aWR0aDogJzEwMCUnXG5cdFx0XHRcdGhlaWdodDogJzEwMCUnXG5cdFx0XHRcdG9wYWNpdHk6IDBcblxuXHRcdFx0Y29tcHV0ZXJzOiBfaW5pdDogKCktPlxuXHRcdFx0XHRET00ub3B0aW9uKHByb3BzOnt2YWx1ZTonJ30sIFwiQWRkICN7QHJlbGF0ZWQubGlzdC5zZXR0aW5ncy5pdGVtTGFiZWx9XCIpLmFwcGVuZFRvKEApXG5cblx0XHRcdG1ldGhvZHM6XG5cdFx0XHRcdGxhYmVsOiBnZXQ6ICgpLT5cblx0XHRcdFx0XHRzZWxlY3RlZCA9IEByYXcuc2VsZWN0ZWRJbmRleCBvciAwXG5cdFx0XHRcdFx0cmV0dXJuIEByYXcub3B0aW9uc1tzZWxlY3RlZF0/LmxhYmVsXG5cdFx0XHRcdFxuXHRcdFx0XHR2YWx1ZTogZ2V0OiAoKS0+XG5cdFx0XHRcdFx0cmV0dXJuIEByYXcudmFsdWVcblx0XHRdXG5cdF1cbilcblxuXG4iXX0=
;
return module.exports;
},
11: function (require, module, exports) {
var defaultDimensions, extend;

extend = require(5);

defaultDimensions = {
  'maxWidth': 350,
  'leftPadding': 20,
  'rightPadding': 20,
  'offset': 25
};

exports.getDefaultDimensions = function(bounding) {
  var output;
  output = extend.clone(defaultDimensions);
  output.leftPadding += bounding.x;
  output.rightPadding += (require(2)).windowWidth - (bounding.x + bounding.width);
  return output;
};

exports.getElDimensions = function(el, leftPadding) {
  var dimensions;
  if (leftPadding == null) {
    leftPadding = 0;
  }
  dimensions = extend.clone(DOM(el).rect);
  dimensions.x = dimensions.left - leftPadding;
  dimensions.y = dimensions.top;
  dimensions.centerLeft = dimensions.left + dimensions.width / 2;
  return dimensions;
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlbHBlcnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsTUFBQSxHQUFTLElBQUEsQ0FBSyxjQUFMOztBQUNULGlCQUFBLEdBQ0M7RUFBQSxVQUFBLEVBQVksR0FBWjtFQUNBLGFBQUEsRUFBZSxFQURmO0VBRUEsY0FBQSxFQUFnQixFQUZoQjtFQUdBLFFBQUEsRUFBVSxFQUhWOzs7QUFLRCxPQUFPLENBQUMsb0JBQVIsR0FBK0IsU0FBQyxRQUFEO0FBQzlCLE1BQUE7RUFBQSxNQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxpQkFBYjtFQUNULE1BQU0sQ0FBQyxXQUFQLElBQXNCLFFBQVEsQ0FBQztFQUMvQixNQUFNLENBQUMsWUFBUCxJQUF1QixDQUFDLElBQUEsQ0FBSyxTQUFMLENBQUQsQ0FBa0IsQ0FBQyxXQUFuQixHQUFpQyxDQUFDLFFBQVEsQ0FBQyxDQUFULEdBQWEsUUFBUSxDQUFDLEtBQXZCO0FBQ3hELFNBQU87QUFKdUI7O0FBTy9CLE9BQU8sQ0FBQyxlQUFSLEdBQTBCLFNBQUMsRUFBRCxFQUFLLFdBQUw7QUFDekIsTUFBQTs7SUFEOEIsY0FBWTs7RUFDMUMsVUFBQSxHQUFhLE1BQU0sQ0FBQyxLQUFQLENBQWEsR0FBQSxDQUFJLEVBQUosQ0FBTyxDQUFDLElBQXJCO0VBQ2IsVUFBVSxDQUFDLENBQVgsR0FBZSxVQUFVLENBQUMsSUFBWCxHQUFrQjtFQUNqQyxVQUFVLENBQUMsQ0FBWCxHQUFlLFVBQVUsQ0FBQztFQUMxQixVQUFVLENBQUMsVUFBWCxHQUF3QixVQUFVLENBQUMsSUFBWCxHQUFrQixVQUFVLENBQUMsS0FBWCxHQUFpQjtBQUMzRCxTQUFPO0FBTGtCIiwic291cmNlc0NvbnRlbnQiOlsiZXh0ZW5kID0gXyRzbSgnc21hcnQtZXh0ZW5kJyApXG5kZWZhdWx0RGltZW5zaW9ucyA9IFxuXHQnbWF4V2lkdGgnOiAzNTBcblx0J2xlZnRQYWRkaW5nJzogMjBcblx0J3JpZ2h0UGFkZGluZyc6IDIwXG5cdCdvZmZzZXQnOiAyNVxuXG5leHBvcnRzLmdldERlZmF1bHREaW1lbnNpb25zID0gKGJvdW5kaW5nKS0+XG5cdG91dHB1dCA9IGV4dGVuZC5jbG9uZShkZWZhdWx0RGltZW5zaW9ucylcblx0b3V0cHV0LmxlZnRQYWRkaW5nICs9IGJvdW5kaW5nLnhcblx0b3V0cHV0LnJpZ2h0UGFkZGluZyArPSAoXyRzbSgnLi9wb3B1cCcgKSkud2luZG93V2lkdGggLSAoYm91bmRpbmcueCArIGJvdW5kaW5nLndpZHRoKVxuXHRyZXR1cm4gb3V0cHV0XG5cblxuZXhwb3J0cy5nZXRFbERpbWVuc2lvbnMgPSAoZWwsIGxlZnRQYWRkaW5nPTApLT5cblx0ZGltZW5zaW9ucyA9IGV4dGVuZC5jbG9uZSBET00oZWwpLnJlY3Rcblx0ZGltZW5zaW9ucy54ID0gZGltZW5zaW9ucy5sZWZ0IC0gbGVmdFBhZGRpbmdcblx0ZGltZW5zaW9ucy55ID0gZGltZW5zaW9ucy50b3Bcblx0ZGltZW5zaW9ucy5jZW50ZXJMZWZ0ID0gZGltZW5zaW9ucy5sZWZ0ICsgZGltZW5zaW9ucy53aWR0aC8yXG5cdHJldHVybiBkaW1lbnNpb25zIl19
;
return module.exports;
},
12: function (require, module, exports) {
module.exports = {
  bgColor: '#ccc',
  textColor: '#181818'
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWZhdWx0cy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQVAsR0FDQztFQUFBLE9BQUEsRUFBUyxNQUFUO0VBQ0EsU0FBQSxFQUFXLFNBRFgiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFxuXHRiZ0NvbG9yOiAnI2NjYydcblx0dGV4dENvbG9yOiAnIzE4MTgxOCciXX0=
;
return module.exports;
},
13: function (require, module, exports) {
var DOM;

DOM = require(6);

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
    props: {
      innerHTML: '<b>{{label}}</b>: {{value}}'
    },
    style: {
      position: 'relative',
      top: '9px',
      fontSize: '13.2px',
      lineHeight: 1
    }
  }
]);
exports.text = text; 

var container = DOM.template([
  'div', {
    ref: 'TagList-Tag',
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
        return tag.list.settings.fontFamily;
      }
    }
  }, text, removeButton
]);
exports.container = container; 

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZW1wbGF0ZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxHQUFBLEdBQU0sSUFBQSxDQUFLLFVBQUw7O0FBR04sT0FBQSxJQUFPLFlBQVAsR0FBc0IsR0FBRyxDQUFDLFFBQUosQ0FDckI7RUFBQyxLQUFELEVBQ0M7SUFBQSxHQUFBLEVBQUssY0FBTDtJQUNBLEtBQUEsRUFDQztNQUFBLFFBQUEsRUFBVSxVQUFWO01BQ0EsS0FBQSxFQUFPLEtBRFA7TUFFQSxHQUFBLEVBQUssS0FGTDtNQUdBLFNBQUEsRUFBVyxvQkFIWDtNQUlBLFFBQUEsRUFBVSxNQUpWO01BS0EsVUFBQSxFQUFZLENBTFo7TUFNQSxPQUFBLEVBQVMsR0FOVDtNQU9BLFVBQUEsRUFBWSxHQVBaO0tBRkQ7R0FERCxFQVdBLEdBWEE7Q0FEcUI7O0FBZXRCLE9BQUEsSUFBTyxJQUFQLEdBQWMsR0FBRyxDQUFDLFFBQUosQ0FDYjtFQUFDLEtBQUQsRUFDQztJQUFBLEdBQUEsRUFBSyxNQUFMO0lBQ0EsS0FBQSxFQUFPO01BQUEsU0FBQSxFQUFXLDZCQUFYO0tBRFA7SUFFQSxLQUFBLEVBQ0M7TUFBQSxRQUFBLEVBQVUsVUFBVjtNQUNBLEdBQUEsRUFBSyxLQURMO01BRUEsUUFBQSxFQUFVLFFBRlY7TUFHQSxVQUFBLEVBQVksQ0FIWjtLQUhEO0dBREQ7Q0FEYTs7QUFhZCxPQUFBLElBQU8sU0FBUCxHQUFtQixHQUFHLENBQUMsUUFBSixDQUNsQjtFQUFDLEtBQUQsRUFDQztJQUFBLEdBQUEsRUFBSyxhQUFMO0lBQ0EsS0FBQSxFQUNDO01BQUEsUUFBQSxFQUFVLFVBQVY7TUFDQSxPQUFBLEVBQVMsY0FEVDtNQUVBLGFBQUEsRUFBZSxLQUZmO01BR0EsTUFBQSxFQUFRLE1BSFI7TUFJQSxXQUFBLEVBQWEsTUFKYjtNQUtBLFlBQUEsRUFBYyxLQUxkO01BTUEsT0FBQSxFQUFTLGVBTlQ7TUFPQSxZQUFBLEVBQWMsS0FQZDtNQVFBLFNBQUEsRUFBVyxRQVJYO01BU0EsU0FBQSxFQUFXLFlBVFg7TUFVQSxNQUFBLEVBQVEsU0FWUjtNQVdBLFVBQUEsRUFBWSxNQVhaO01BWUEsZUFBQSxFQUFpQixTQUFDLEdBQUQ7ZUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDO01BQXJCLENBWmpCO01BYUEsS0FBQSxFQUFPLFNBQUMsR0FBRDtlQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUM7TUFBckIsQ0FiUDtNQWNBLFVBQUEsRUFBWSxTQUFDLEdBQUQ7ZUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztNQUExQixDQWRaO0tBRkQ7R0FERCxFQW1CQyxJQW5CRCxFQW9CQyxZQXBCRDtDQURrQiIsInNvdXJjZXNDb250ZW50IjpbIkRPTSA9IF8kc20oJ3F1aWNrZG9tJyApXG5cblxuZXhwb3J0IHJlbW92ZUJ1dHRvbiA9IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAncmVtb3ZlQnV0dG9uJ1xuXHRcdHN0eWxlOlxuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZSdcblx0XHRcdHJpZ2h0OiAnOHB4J1xuXHRcdFx0dG9wOiAnNTUlJ1xuXHRcdFx0dHJhbnNmb3JtOiBcInRyYW5zbGF0ZSgwLCAtNTAlKVwiXG5cdFx0XHRmb250U2l6ZTogJzE3cHgnXG5cdFx0XHRsaW5lSGVpZ2h0OiAxXG5cdFx0XHRvcGFjaXR5OiAwLjRcblx0XHRcdGZvbnRXZWlnaHQ6IDYwMFxuXHQnw5cnXVxuKVxuXG5leHBvcnQgdGV4dCA9IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAndGV4dCdcblx0XHRwcm9wczogaW5uZXJIVE1MOiAnPGI+e3tsYWJlbH19PC9iPjoge3t2YWx1ZX19J1xuXHRcdHN0eWxlOlxuXHRcdFx0cG9zaXRpb246ICdyZWxhdGl2ZSdcblx0XHRcdHRvcDogJzlweCdcblx0XHRcdGZvbnRTaXplOiAnMTMuMnB4J1xuXHRcdFx0bGluZUhlaWdodDogMVxuXHRdXG4pXG5cblxuZXhwb3J0IGNvbnRhaW5lciA9IERPTS50ZW1wbGF0ZShcblx0WydkaXYnXG5cdFx0cmVmOiAnVGFnTGlzdC1UYWcnXG5cdFx0c3R5bGU6XG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuXHRcdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaydcblx0XHRcdHZlcnRpY2FsQWxpZ246ICd0b3AnXG5cdFx0XHRoZWlnaHQ6ICcyOHB4J1xuXHRcdFx0bWFyZ2luUmlnaHQ6ICcxMHB4J1xuXHRcdFx0bWFyZ2luQm90dG9tOiAnNnB4J1xuXHRcdFx0cGFkZGluZzogJzAgMjVweCAwIDEwcHgnXG5cdFx0XHRib3JkZXJSYWRpdXM6ICc0cHgnXG5cdFx0XHR0ZXh0QWxpZ246ICdjZW50ZXInXG5cdFx0XHRib3hTaXppbmc6ICdib3JkZXItYm94J1xuXHRcdFx0Y3Vyc29yOiAncG9pbnRlcidcblx0XHRcdHVzZXJTZWxlY3Q6ICdub25lJ1xuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAodGFnKS0+IHRhZy5zZXR0aW5ncy5iZ0NvbG9yXG5cdFx0XHRjb2xvcjogKHRhZyktPiB0YWcuc2V0dGluZ3MudGV4dENvbG9yXG5cdFx0XHRmb250RmFtaWx5OiAodGFnKS0+IHRhZy5saXN0LnNldHRpbmdzLmZvbnRGYW1pbHlcblxuXHRcdHRleHQsXG5cdFx0cmVtb3ZlQnV0dG9uXG5cdF1cbilcblxuIl19
;
return module.exports;
},
14: function (require, module, exports) {
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
16: function (require, module, exports) {
var QuickCSS, constants, helpers;

constants = require(28);

helpers = require(29);

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
27: function (require, module, exports) {
exports.arrowDown = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMwOS4xNTYgMzA5LjE1NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzA5LjE1NiAzMDkuMTU2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPGc+CgkJPHBvbHlnb24gcG9pbnRzPSIyODguNDYxLDY0LjkyOSAxNTQuNTg5LDIwMi43NjYgMjAuNzIzLDY0Ljk0IDAsODUuMDcgMTU0LjU4OSwyNDQuMjI4IDMwOS4xNTYsODUuMDcgICAiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K";

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3ZnLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLENBQUMsU0FBUixHQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMuYXJyb3dEb3duID0gXCJcIlwiXG5cdGRhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4O2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpYVhOdkxUZzROVGt0TVNJL1BnbzhJUzB0SUVkbGJtVnlZWFJ2Y2pvZ1FXUnZZbVVnU1d4c2RYTjBjbUYwYjNJZ01UZ3VNUzR4TENCVFZrY2dSWGh3YjNKMElGQnNkV2N0U1c0Z0xpQlRWa2NnVm1WeWMybHZiam9nTmk0d01DQkNkV2xzWkNBd0tTQWdMUzArQ2p4emRtY2dlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQjRiV3h1Y3pwNGJHbHVhejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TVRrNU9TOTRiR2x1YXlJZ2RtVnljMmx2YmowaU1TNHhJaUJwWkQwaVEyRndZVjh4SWlCNFBTSXdjSGdpSUhrOUlqQndlQ0lnZG1sbGQwSnZlRDBpTUNBd0lETXdPUzR4TlRZZ016QTVMakUxTmlJZ2MzUjViR1U5SW1WdVlXSnNaUzFpWVdOclozSnZkVzVrT201bGR5QXdJREFnTXpBNUxqRTFOaUF6TURrdU1UVTJPeUlnZUcxc09uTndZV05sUFNKd2NtVnpaWEoyWlNJZ2QybGtkR2c5SWpZMGNIZ2lJR2hsYVdkb2REMGlOalJ3ZUNJK0NqeG5QZ29KUEdjK0Nna0pQSEJ2YkhsbmIyNGdjRzlwYm5SelBTSXlPRGd1TkRZeExEWTBMamt5T1NBeE5UUXVOVGc1TERJd01pNDNOallnTWpBdU56SXpMRFkwTGprMElEQXNPRFV1TURjZ01UVTBMalU0T1N3eU5EUXVNakk0SURNd09TNHhOVFlzT0RVdU1EY2dJQ0FpSUdacGJHdzlJaU13TURBd01EQWlMejRLQ1R3dlp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOEwzTjJaejRLXG5cIlwiXCIiXX0=
;
return module.exports;
},
28: function (require, module, exports) {
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
29: function (require, module, exports) {
var constants, helpers, sampleStyle, styleConfig;

constants = require(28);

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
31: function (require, module, exports) {
var Checks, availSets;

availSets = {
  natives: require(44),
  dom: require(45)
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
44: function (require, module, exports) {
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
45: function (require, module, exports) {
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
46: function (require, module, exports) {
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
