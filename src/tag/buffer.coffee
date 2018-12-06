import extend from 'smart-extend'
import SelectField from '../selectField'
import Tag from './'
import Popup from '../popup'
import * as defaults from './defaults'
import {content, button} from './template'

class BufferTag extends require('event-lite')
	constructor: (@list)->
		super()
		{@settings} = @list
		@content = content.spawn(null, relatedInstance:@)
		@state = {}
		@applyButton = @button = button.spawn({data:text:"Add #{@settings.tagLabel}"}, relatedInstance:@)
		@addButton = @list.els.addButton
		@popup = new Popup(@addButton, @settings, @settings.boundingEl)
		@selectField = new SelectField(@settings)
		
		@content_ = DOM.div(null, @content)
		@selectField.insertBefore(@content)
		@applyButton.insertAfter(@content)
		@popup.setContent(@content_)
		@_setup()

	_setup: ()->
		@applyButton.on 'click', ()=>
			@_applyChanges() if @_validateHasField()

		@addButton.on 'click', ()=>
			@popup.open()

		@selectField.on 'change', ({value})=>
			@_setCurrent(value)

	_setCurrent: (name)->
		@content.empty()
		@option = @list._findOption(name)

		if @option
			@option = extend.clone(defaults.option, @option)
			@_initField()
		else
			@field = null

		@selectField.value = name unless @selectField.value is name


	_validateHasField: ()->
		if @field
			return true
		else
			@button.child.errorMessage.set('You must select a field first')
			return false

	_updateSelectable: ()->
		if @settings.repeatableValues
			options = @list.options
		else
			options = @list.options.filter ({name})=> @list._findTag(name)
		
		@selectField.setOptions(options)
	
	_notifyChange: ()->
		@emit 'change', @option, @value
		@_reset()

	_updateFromUser: (value)->
		@option.setter.call(@, value)

	_updateFromField: (value)->
		;

	_reset: ()->
		@_setCurrent('')
		@popup.close()
	
	get: Tag::get
	set: Tag::set
	validate: Tag::validate
	_initField: Tag::_initField
	_applyChanges: Tag::_applyChanges
	
	Object.defineProperties @::,
		els: get: ()-> @el.child
		value: get: ()-> @get()
