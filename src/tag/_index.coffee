DOM = import 'quickdom'
extend = import 'smart-extend'
Popup = import '../popup'
defaults = import './defaults'
template = import './template'


class Tag
	Object.defineProperties @::,
		'els': get: ()-> @el.child

	constructor: (@list, @config, @data={}, popupContent)->
		@settings = extend.clone(defaults, @list.settings.tag)
		@name = @config.name
		@label = @config.label
		@value = @config.default or @data.value or ''
		@el = template.container.spawn(@settings.templates?.container, relatedInstance:@)
		@popup = new Popup(@list, @el, @config.popup)

		@_attachBindings()
		@el.insertBefore(@list.els.addButton)
		@popup.els.content.append(if popupContent then popupContent else @config.content.call(@, @data))


	_attachBindings: ()->
		SimplyBind('label').of(@)
			.to('textContent.label').of(@els.text.raw)
			.transform (label)=> if @config.labelFormatter then @config.labelFormatter(label) else label
		
		SimplyBind('value').of(@)
			.to('textContent.value').of(@els.text.raw)
			.transform (value)=> if @config.valueFormatter then @config.valueFormatter(value) else value

		SimplyBind('event:click').of(@els.removeButton)
			.to (event)=> @list.remove(@); event.stopPropagation()

		SimplyBind('event:click').of(@el)
			.to (event)=> @popup.open()

		SimplyBind('array:value', updateOnBind:false).of(@data)
			.to('value').of(@)


	getValue: (applyTransforms=true)->
		if applyTransforms and @config.valueTransform
			return @config.valueTransform(@value)
		else
			return @value

	setValue: (value)->
		@data.value = value






module.exports = Tag