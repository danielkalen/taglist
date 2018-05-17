import DOM from 'quickdom'
import * as template from './template'

class SelectField extends require('event-lite')
	constructor: (contentEl, @settings)->
		super()
		@field = template.field.spawn(null, {relatedInstance:@}).insertBefore contentEl
		@button = template.button.spawn(null, {relatedInstance:@}).insertAfter contentEl
		@_attachBindings()

	_attachBindings: ()->
		@field.on 'input', ()->
			@emit 'change', {@label, @value}
		
		@button.on 'click', ()->
			@emit 'apply'

		@on 'change', ({label, value})->
			@field.child.fake.html = label

	
	setOptions: (options)->
		prevOptions = @field.child.input.children.slice(1)
		DOM.batch(prevOptions).remove() if prevOptions.length

		for {name,label} in options
			@field.chlld.input.append DOM.option({props:value:name}, label)
		return


	Object.defineProperties @::,
		label:
			get: ()-> @field.child.input.label
		value:
			get: ()-> @field.child.input.value
			set: (value)-> @field.child.input.value = value


export default SelectField