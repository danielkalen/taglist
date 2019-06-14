import DOM from 'quickdom'
import * as template from './template'

class SelectField extends require('event-lite')
	constructor: (@settings)->
		super()
		@field = template.field.spawn(null, {relatedInstance:@})
		@input = @field.child.input
		@_attachBindings()
		@_setUiLabel(@label)

	_attachBindings: ()->
		@field.on 'input', ()=>
			@emit 'change', {@label, @value}

		@on 'change', ({label})->
			@_setUiLabel(label)

	_setUiLabel: (label)->
		@field.child.fake.html = label

	_setValue: (value)->
		@input.value = value
		@_setUiLabel(@label)

	setOptions: (options)->
		prevOptions = @input.children.slice(1)
		DOM.batch(prevOptions).remove() if prevOptions.length

		for {name,label} in options
			@input.append DOM.option({props:value:name}, label)
		return


	insertBefore: (target)->
		@field.insertBefore(target)


	Object.defineProperties @::,
		label:
			get: ()-> @input.label
		value:
			get: ()-> @input.value
			set: (value)-> @_setValue(value)


export default SelectField