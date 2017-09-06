extend = import 'smart-extend'
DOM = import 'quickdom'
Tag = import '../tag'
Popup = import '../popup'
defaults = import './defaults'
template = import './template'

class TagList
	Object.defineProperties @::,
		'els': get: ()-> @el.child
		'tagsByName': get: ()->
			tags = @tags
			new ()-> @[tag.name] = tag for tag in tags; @
	
	constructor: (@targetContainer, @tagOptions=[], settings)->
		@settings = extend.clone(defaults, settings)
		@settings.boundingEl = DOM(@settings.boundingEl)
		@settings.defaults ?= Object.create(null)
		@tags = []
		@current = Object.create(null)
		@el = template.container.spawn(@settings.templates?.container, relatedInstance:@)
		@overlay = template.overlay.spawn(@settings.templates?.overlay, relatedInstance:@).prependTo(document.body)
		@popup = new Popup(@, @els.addButton, null, true)

		tagOption.name ?= tagOption.label for tagOption in @tagOptions
		
		for name,value of @settings.default when value
			option = @_getOptionByName(name)
			value = value() if typeof value is 'function'
			@add(option, {value})

		@_attachBindings()
		@el.appendTo(@targetContainer)


	_attachBindings: ()->
		SimplyBind('event:click').of(@els.addButton).to ()=>
			@popup.open()

		SimplyBind('event:click').of(@popup.els.button).to ()=>
			@add(@current.tagOption, @current.data, @current.contentElement)
			@popup.close().then ()=> @selectedTag = ''

		SimplyBind('value').of(@popup.els.selectInput.raw)
			.to('selectedTag').of(@).bothWays()
			.pipe (selectedTag)=> if selectedTag
				@current.data = {value:null}
				@current.tagOption = @_getOptionByName(selectedTag)
				@current.contentElement = DOM(@current.tagOption.content(@current.data))
				@popup.els.content.empty().append(@current.contentElement)

		SimplyBind('array:tags', updateOnBind:false).of(@).to ()=> @_notifyChange()


	_notifyChange: ()->
		@settings.onChange?(@getValues(), @)

	_getOptionByName: (name)->
		return @tagOptions.find (tag)-> tag.name is name

	destroy: ()->
		@closeAllPopups()
		@el.remove()
		@overlay.remove()
		return

	addOption: (option)->
		unless @_getOptionByName(option.name)
			@tagOptions.push(option)

	add: (option, data, popupContent)->
		option = @_getOptionByName(option) if typeof option is 'string'
		@tags.push tag = new Tag(@, option, data, popupContent)
		
		SimplyBind('value', updateOnBind:false).of(tag)
			.to ()=> @_notifyChange()

	remove: (tag)->
		tag = @tagsByName[tag] if typeof tag is 'string'
		tag.popup.close()
		tagIndex = @tags.indexOf(tag)

		if @settings.requireDefaults and tag.name of @settings.defaults
			tag.setValue(@settings.defaults[tag.name])
			@tags.splice tagIndex, 1, tag
		else
			tag.el.remove()
			@tags.splice tagIndex, 1

		return


	closeAllPopups: ()->
		@popup.close()
		tag.popup.close() for tag in @tags
		return

	getValues: (applyTransforms=true)->
		values = {}
		for tag in @tags
			values[tag.name] = tag.getValue(applyTransforms)
		return values

	setValues: (values)->
		tags = @tagsByName
		for name,value of values
			if tags[name]
				tags[name].setValue(value)
			
			else if @_getOptionByName(name)
				@add(name, {value})
		
		return



module.exports = TagList