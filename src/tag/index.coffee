import DOM from 'quickdom'
import extend from 'smart-extend'
import Popup from '../popup'
import stringify from './stringify'
import updater from './updater'
import template, {content, button} from './template'
import * as defaults from './defaults'
import {ValidationError} from '../errors'

class Tag extends require('event-lite')
	constructor: (option, listSettings)->
		super()
		settings1 = extend.keys(['button','fontFamily']).clone(listSettings)
		settings2 = extend.keys(['padding', 'maxWidth']).clone(option)
		@settings = extend.clone(defaults.settings, listSettings.tag, settings1, settings2)
		@option = extend.clone(defaults.option, option)
		@option.popup = extend.clone(listSettings.popup, @option.popup)
		@state = {}
		@name = @option.name
		@label = @option.label
		@el = template.spawn(null, relatedInstance:@)
		@content = content.spawn(null, relatedInstance:@)
		@button = button.spawn({data:text:'Apply'}, relatedInstance:@)
		@popup = new Popup(@el, listSettings, listSettings.boundingEl)
		@popup.setContent(@content)
		@button.insertAfter(@content) if @settings.updateWhen is 'applied'

		@_setup()
		@_attachBindings()
	

	_setup: ()->
		if @option.hideLabel
			@els.label.hide()
		else
			@els.label.html = "#{@option.label}: "

	_attachBindings: ()->		
		@els.removeButton.on 'click', (event)=>
			@emit 'remove'; event.stopPropagation()

		@el.on 'click', ()=>
			@popup.open()

		@button.on 'click', (e)=>
			e.stopPropagation()
			@popup.close() if @_applyChanges()

		if @settings.updateWhen is 'applied'
			@popup.on 'open', ()=> @state.valueOnFocus ?= @value
			@popup.on 'blur', ()=> if @value isnt @state.valueOnFocus
				if not @_applyChanges()
					console.log 'opening'
					@popup.open()
	
	_initField: ()->
		@field = @option.field.call(@, @content.raw, updater(@))
		@set(@option.default, true) if @option.default

	_domInsert: (method, target)->
		@el[method](target)
		@_initField()
		return @

	_notifyChange: ()->
		@emit 'change', @value

	_updateText: (value)->
		@els.value.text = stringify(value, @option.formatter)

	_updateFromUser: (value, SILENT)->
		@_updateText(value)
		@option.setter.call(@, value)
		@_notifyChange() unless SILENT

	_updateFromField: (value)->
		@_updateText(value)
		@_notifyChange() unless @settings.updateWhen is 'applied'

	_applyChanges: ()->
		validation = @validate()
		if validation is true
			@state.valueOnFocus = null
			@_notifyChange()
			return true
		
		else if validation instanceof Error
			@button.child.errorMessage.set(validation.message)
			@emit 'error', validation
			return false

	get: (skipTransform)->
		value = @option.getter.call(@)
		value = @option.transformOutput(value) if @option.transformOutput and not skipTransform
		return value
	
	set: (value, SILENT)->
		value = value() if typeof value is 'function'
		value = @option.transformInput(value) if @option.transformInput
		@_updateFromUser(value, SILENT)

	validate: ()->
		return true if not @option.validate
		try
			result = @option.validate.call(@, @value)
		catch err
			result = err

		switch
			when result is true then true
			when result is false then new ValidationError("validation failed")
			when typeof result is 'string' then new ValidationError(result)
			when result instanceof Error then result

	

	appendTo: (target)-> @_domInsert 'appendTo', target
	prependTo: (target)-> @_domInsert 'prependTo', target
	insertBefore: (target)-> @_domInsert 'insertBefore', target
	insertAfter: (target)-> @_domInsert 'insertAfter', target
	

	Object.defineProperties @::,
		els: get: ()-> @el.child
		value: get: ()-> @get()
		rawValue: get: ()-> @get(true)






export default Tag