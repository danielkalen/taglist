import Popper from 'popper.js'
DOM = import 'quickdom'
extend = import 'smart-extend'
defaults = import './defaults'
template = import './template'
helpers = import '../helpers'

class Popup
	Object.defineProperties @::,
		'els': get: ()-> @el.child
	
	constructor: (@list, @parent, settings, @hasSelect)->
		@settings = extend.clone(defaults, @list.settings.popup, settings)
		@state = open:false, offset:{x:0, y:0, scale:0}
		@el = template.container.spawn(@settings.templates?.container, {relatedInstance:@})

		if @hasSelect
			template.select.spawn(@settings.templates?.select, {relatedInstance:@}).insertBefore(@els.content)
			template.button.spawn(@settings.templates?.button, {relatedInstance:@}).appendTo(@el)
			refreshChildren = @el.childf

		@_attachBindings()
		@el.hide().appendTo(@parent)
		@popper = new Popper @parent[0], @el[0],
			placement: 'bottom'
			trigger: 'manual'
			modifiers:
				offset:
					enabled: true
					offset: '5px'
				preventOverflow:
					enabled: true
					boundriesElement: @list.settings.boundingEl[0] or @list.settings.boundingEl


	_attachBindings: ()->
		if not @hasSelect
			SimplyBind('open').of(@state)
				.to (open)=> @el.state 'hasContent', open
		else
			SimplyBind('array:tags').of(@list).to ()=>
				prevOptions = @els.selectInput.children.slice(1)
				DOM.batch(prevOptions).remove() if prevOptions.length
				usedTags = @list.tagsByName

				for option in @list.tagOptions
					if not usedTags[option.name] or @settings.repeatableValues
						DOM.option({props:value:option.name}, option.label).appendTo(@els.selectInput)
				return

			SimplyBind('value').of(@els.selectInput.raw)
				.to('innerHTML').of(@els.selectFake.raw)
					.transform ()=> @els.selectInput.label
				.and.to (selectedOption)=>
					@el.state 'hasContent', selectedOption


	_attachOuterClickListener: ()->
		DOM(document).on 'click.outerClick', (event)=>
			targetParents = DOM(event.target).parents
			@close() if not targetParents.includes(@parent)

	_detachOuterClickListener: ()->
		DOM(document).off 'click.outerClick'


	open: ()->
		return if @state.open
		@list.closeAllPopups()
		@state.open = true
		@el.show()
		@popper.update()
		@_attachOuterClickListener()
		return @

	close: ()->
		return if not @state.open
		@state.open = false
		@el.hide()
		@_detachOuterClickListener()
		return @



module.exports = Popup