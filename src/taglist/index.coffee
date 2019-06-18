import extender from 'smart-extend'
import DOM from 'quickdom'
import defaults from './defaults'
import template from './template'
import Tag from '../tag'
import BufferTag from '../tag/buffer'
import Popup from '../popup'
import {toArray} from '../helpers'

class TagList extends require('event-lite')
	constructor: (@targetContainer, @options=[], settings)->
		super()
		@settings = extender.deepOnly('button').clone(defaults, settings)
		@settings.boundingEl = DOM(@settings.boundingEl)
		@settings.defaults = toArray(@settings.defaults or [])
		@tags = []
		@el = template.spawn(null, relatedInstance:@)
		@buffer = new BufferTag(@)
		option.name ?= option.label for option in @options
		
		@_applyDefaults(@settings.defaults)
		@_attachBindings()
		@el.appendTo(@targetContainer)
		@buffer._updateSelectable()


	_attachBindings: ()->
		@buffer.on 'change', (option, value)=>
			@add(option, value)
			@_notifyChange()
		
		@buffer.popup.on 'beforeopen', ()=>
			@closeAllPopups()
		
		@on 'change', ()=>
			@buffer._updateSelectable()

		if @settings.onChange
			@on 'change', @settings.onChange

	
	_applyDefaults: (defaults)->
		defaults = toArray(defaults)

		for {name, value} in defaults when value
			option = @_findOption(name)
			value = value() if typeof value is 'function'
			@add(option, value)
		return

	_notifyChange: (SILENT)-> unless SILENT
		@emit 'change', @getValues(true)

	_findOption: (name, collection=@options)->
		return collection.find (option)-> option.name is name
	
	_findTag: (name, collection=@tags)->
		return collection.find (tag)-> tag.name is name
	
	_findDefault: (name)->
		return @settings.defaults.find (default_)-> default_.name is name

	addOption: (option)->
		unless @_findOption(option.name)
			@options.push(option)

	add: (option, value)->
		option = @_findOption(option) if typeof option is 'string'
		tag = new Tag(option, @settings)

		tag.insertBefore @els.addButton
		tag.set(value, true) if value?
		tag.once 'remove', ()=> @remove(tag)
		tag.on 'change', ()=> @_notifyChange()
		tag.popup.on 'beforeopen', ()=> @closeAllPopups()
		
		@tags.push(tag)

	remove: (tag, SILENT)->
		tag = @tagsByName[tag] if typeof tag is 'string'
		tag.popup.close()
		tagIndex = @tags.indexOf(tag)

		if @settings.requireDefaults and @_findDefault(tag.name)
			tag.set(@_findDefault(tag.name), true)
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
		for {name,value},index in toArray(values)
			@setValue(name, value, true, index)
		
		@_notifyChange(SILENT)

	setValue: (name, value, SILENT, fromIndex)->
		collection = if fromIndex then @tags.slice(fromIndex) else @tags
		existing = @_findTag(name, collection)
		
		if existing
			existing.set(value, true)
		
		else if @_findOption(name)
			@add(name, value)

		@_notifyChange(SILENT)

	replaceValues: (values, SILENT)->
		@removeAll(true)
		@setValues(values, true)
		@_notifyChange(SILENT)

	getValues: ()->
		@tags.map (tag)->
			name: tag.name
			value: tag.value


	closeAllPopups: ()->
		@buffer.popup.close()
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