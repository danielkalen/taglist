import extend from 'smart-extend'
import DOM from 'quickdom'
import defaults from './defaults'
import template from './template'
import Tag, {PseudoTag} from '../tag'
import Popup from '../popup'
import {toArray} from '../helpers'

class TagList extends require('event-lite')
	constructor: (@targetContainer, @options=[], settings)->
		super
		@settings = extend.deepOnly('button').clone(defaults, settings)
		@settings.boundingEl = DOM(@settings.boundingEl)
		@settings.defaults = toArray(@settings.defaults or [])
		@tags = []
		@el = template.spawn(null, relatedInstance:@)
		@pseudoTag = new PseudoTag(@)
		option.name ?= option.label for option in @options
		
		@_applyDefaults(@settings.defaults)
		@_attachBindings()
		@el.appendTo(@targetContainer)
		@pseudoTag._updateSelectable()


	_attachBindings: ()->
		@pseudoTag.on 'change', (option, value)=>
			@add(option, value)
		
		@pseudoTag.popup.on 'beforeopen', ()=>
			@closeAllPopups()
		
		@on 'change', ()=>
			@pseudoTag._updateSelectable()

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

	_findOption: (name)->
		return @options.find (option)-> option.name is name
	
	_findTag: (name)->
		return @tags.find (tag)-> tag.name is name
	
	_findDefault: (name)->
		return @defaults.find (default_)-> default_.name is name

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
		encounted = {}
		
		for {name,value} in toArray(values)
			@setValue(name, value, true, encounted[name]?)
			encounted[name] = 1
		
		@_notifyChange(SILENT)

	setValue: (name, value, SILENT, skipExisting)->
		existing = not skipExisting and @_findTag(name)
		
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
		@pseudoTag.popup.close()
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