import DOM from 'quickdom'
import extend from 'smart-extend'
import Popup from '../popup'
import defaults from './defaults'
import template from './template'
import stringify from './stringify'


class Tag extends require('event-lite')
	constructor: (@config, @data, @content, listSettings)->
		super()
		@settings = extend.clone(defaults, listSettings.tag)
		@config.popup = extend.clone(listSettings.popup, @config.popup)
		@data ?= {}
		@name = @config.name
		@label = @config.label
		@el = template.spawn(null, relatedInstance:@)
		@content ?= DOM(@config.content.call(@, @data))
		@popup = new Popup(@el, @config.popup, listSettings.boundingEl)
		@popup.els.content.append(@content)

		@_setup()
		@_attachBindings()
	

	_setup: ()->
		if @config.hideLabel
			@els.label.hide()
		else
			label = if @config.labelFormatter then @config.labelFormatter(@config.label) else @config.label
			@els.label.html = "#{label}: "

	_attachBindings: ()->		
		@els.removeButton.on 'click', (event)=>
			@emit 'remove'; event.stopPropagation()

		@el.on 'click', ()=>
			@popup.open()
	
	_initContent: ()->
		@field = @config.content.call(@, @el.child.content.raw)
		@set(@config.default, false, false) if @config.default

	_domInsert: (method, target)->
		@el[method](target)
		@_initContent()
		return @

	_updateText: (value)->
		@els.value.text = stringify(value, @config.formatter)

	get: ()->
		@config.getter.call(@)
	
	set: (value, fromField, skipChangeEvent)->
		@_updateText(value)
		@config.setter.call(@, value) unless fromField
		@emit 'change', value unless skipChangeEvent

	validate: ()->
		return true if not @config.validate
		try
			result = @config.validate.call(@)
		catch err
			result = err

		switch
			when result is true then true
			when result is false then new errors.NotAcceptable("validation failed")
			when typeof result is 'string' then new errors.NotAcceptable(result)
			when result instanceof Error then result



	getValue: (applyTransforms=true)->
		if applyTransforms and @config.transformOutput
			return @config.transformOutput(@value)
		else
			return @value

	setValue: (value, applyTransforms=true)->
		if applyTransforms and @config.transformInput
			value = @config.transformInput(value)
		
		@data.value = value
		@emit 'change', value
		return value


	

	appendTo: (target)-> @_domInsert 'appendTo', target
	prependTo: (target)-> @_domInsert 'prependTo', target
	insertBefore: (target)-> @_domInsert 'insertBefore', target
	insertAfter: (target)-> @_domInsert 'insertAfter', target
	

	Object.defineProperties @::,
		els: get: ()-> @el.child
		value: get: ()-> @get()






export default Tag