import Popper from 'popper.js'
import template from './template'
import DOM from 'quickdom'

class Popup extends require('event-lite')
	constructor: (@parent, @settings, boundingEl)->
		super()
		@state = open:false
		@el = template.spawn(null, {relatedInstance:@})

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
			if not targetParents.includes(@parent)
				@close()
				@emit 'blur'

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

	setContent: (content)->
		@els.content.empty()
		@els.content.append content if content



	Object.defineProperties @::,
		'els': get: ()-> @el.child



export default Popup