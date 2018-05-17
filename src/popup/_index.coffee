import Popper from 'popper.js'
import template from './template'
import DOM from 'quickdom'
import extend from 'smart-extend'
import * as defaults from './defaults'

class Popup extends require('event-lite')
	constructor: (@parent, settings, boundingEl)->
		super()
		@settings = extend.clone(defaults, settings)
		@state = open:false
		@el = template.spawn(null, {relatedInstance:@})

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
					boundriesElement: boundingEl[0] or boundingEl

	_attachOuterClickListener: ()->
		DOM(document).on 'click.outerClick', (event)=>
			targetParents = DOM(event.target).parents
			@close() if not targetParents.includes(@parent)

	_detachOuterClickListener: ()->
		DOM(document).off 'click.outerClick'


	open: ()->
		return if @state.open
		@emit 'beforeopen'
		@state.open = true
		@el.show()
		@popper.update()
		@_attachOuterClickListener()
		@emit 'open'
		return @

	close: ()->
		return if not @state.open
		@emit 'beforeclose'
		@state.open = false
		@el.hide()
		@_detachOuterClickListener()
		@emit 'close'
		return @



	Object.defineProperties @::,
		'els': get: ()-> @el.child



module.exports = Popup