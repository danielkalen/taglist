import extend from 'smart-extend'
import DOM from 'quickdom'
import defaults from './defaults'
import template from './template'
import Tag from '../tag'
import Popup from '../popup'
import SelectField from '../selectField'
import {toArray} from '../helpers'

class TagList extends require('event-lite')
	constructor: (@targetContainer, @options=[], settings)->
		super
		@settings = extend.deepOnly('button').clone(defaults, settings)
		@settings.boundingEl = DOM(@settings.boundingEl)
		@settings.defaults = toArray(@settings.defaults or [])
		@tags = []
		@current = {}
		@el = template.spawn(null, relatedInstance:@)
		@popup = new Popup(@, @els.addButton, @settings.popup, @settings.boundingEl)
		@selectField = new SelectField(@popup.els.content, @settings)
		option.name ?= option.label for option in @options
		
		@_applyDefaults(@settings.defaults)
		@_attachBindings()
		@_updateSelectable()
		@el.appendTo(@targetContainer)


	_attachBindings: ()->
		@els.addButton.on 'click', ()=>
			@popup.open()
		
		@selectField.on 'apply', ()=>
			@add(@current.option, @current.data, @current.content)
			@popup.close()
			@_setCurrent('')

		@selectField.on 'change', ({value})=>
			@_setCurrent(value)

		# SimplyBind('array:tags', updateOnBind:false).of(@).to ()=> @_notifyChange()

		@popup.on 'beforeopen', ()=>
			@closeAllPopups()
		
		@on 'change', ()=>
			@_updateSelectable()

		if @settings.onChange
			@on 'change', @settings.onChange

	_setCurrent: (name)->
		data = {value:null}
		option = @_findOption(name)
		content = DOM(option.content(data)) if option

		@current = {data, option, content}
		@selectField.value = name unless @selectField.value is name
		
		@popup.els.content.empty()
		@popup.els.content.append(content) if content

	
	_updateSelectable: ()->
		if @settings.repeatableValues
			options = @options
		else
			options = @options.filter ({name})=> @_findTag(name)
		
		@selectField.setOptions(options)

	_applyDefaults: (defaults)->
		defaults = toArray(defaults)

		for {name, value} in defaults when value
			option = @_findOption(name)
			value = value() if typeof value is 'function'
			@add(option, {value})
		return

	_notifyChange: (SILENT)-> unless SILENT
		@emit 'change', @getValues(true)

	_findOption: (name)->
		return @options.find (option)-> option.name is name
	
	_findTag: (name)->
		return @tags.find (tag)-> tag.name is name
	
	_findDefault: (name)->
		return @defaults.find (default_)-> default_.name is name

	addOption: (option)->
		unless @_findOption(option.name)
			@options.push(option)

	add: (option, data, content)->
		option = @_findOption(option) if typeof option is 'string'
		tag = new Tag(option, data, content, @settings)

		tag.insertBefore els.addButton
		tag.once 'remove', ()=> @remove(tag)
		tag.on 'change', ()=> @_notifyChange()
		tag.popup.on 'beforeopen', ()=> @closeAllPopups()
		
		@tags.push(tag)

	remove: (tag, SILENT)->
		tag = @tagsByName[tag] if typeof tag is 'string'
		tag.popup.close()
		tagIndex = @tags.indexOf(tag)

		if @settings.requireDefaults and @_findDefault(tag.name)
			tag.setValue(@_findDefault(tag.name))
			@tags.splice tagIndex, 1, tag
		else
			tag.el.remove()
			@tags.splice tagIndex, 1

		@_notifyChange(SILENT)
		return

	removeAll: (SILENT)->
		@remove(tag, true) for tag in @tags.slice()
		@_notifyChange(SILENT)
		return

	setValues: (values, SILENT)->
		for {name,value} in toArray(values)			
			@setValue(name, value, true)
		
		@_notifyChange(SILENT)

	setValue: (name, value, SILENT)->
		existing = @_findTag(name)
		
		if existing
			existing.setValue(value)
		
		else if @_findOption(name)
			@add(name, {value})

		@_notifyChange(SILENT)

	replaceValues: (values, SILENT)->
		@removeAll(true)
		@setValues(values, true)
		@_notifyChange(SILENT)

	getValues: (applyTransforms=true)->
		@tags.map (tag)->
			name: tag.name
			value: tag.getValue(applyTransforms)


	closeAllPopups: ()->
		@popup.close()
		tag.popup.close() for tag in @tags
		return

	destroy: ()->
		@closeAllPopups()
		@el.remove()
		@emit 'destroy'
		return
	



	Object.defineProperties @::,
		'els': get: ()-> @el.child
		'tagsByName': get: ()->
			tags = @tags
			new ()-> @[tag.name] = tag for tag in tags; @



export default TagList