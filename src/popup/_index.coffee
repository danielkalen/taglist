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
		@el.appendTo(@parent)


	_attachBindings: ()->
		isOpen = ()=> @state.open
		
		SimplyBind('windowScrollY', updateOnBind:false).of(Popup)
			.to (newScroll, prevScroll)=> @resetYPosition(newScroll, prevScroll)
			.condition(isOpen)
		
		SimplyBind('windowScrollX', updateOnBind:false).of(Popup)
			.to (newScroll, prevScroll)=> @resetXPosition(newScroll, prevScroll)
			.condition(isOpen)
		
		SimplyBind('windowWidth', updateOnBind:false).of(Popup)
			.to (newWidth, prevWidth)=> @resetWidth(newWidth, prevWidth)
			.condition(isOpen)

		SimplyBind('offset').of(@state)
			.to (offset)=> @el.style 'transform', "translate(#{offset.x}px, #{offset.y}px) scale(#{offset.scale})"

		SimplyBind('event:click').of(@list.overlay)
			.to ()=> @close()

		if not @hasSelect
			SimplyBind('open').of(@state)
				.to (open)=> @el.state 'hasContent', open
		else
			SimplyBind('array:tags').of(@list).to ()=>
				prevOptions = @els.selectInput.children.slice(1)
				DOM.batch(prevOptions).remove() if prevOptions.length
				usedTags = @list.tagsByName
				
				for option in @list.tagOptions when not usedTags[option.name]
					DOM.option({props:value:option.name}, option.label).appendTo(@els.selectInput)
				return

			SimplyBind('value').of(@els.selectInput.raw)
				.to('innerHTML').of(@els.selectFake.raw)
					.transform ()=> @els.selectInput.label
				.and.to (selectedOption)=>
					@el.state 'hasContent', selectedOption



	open: ()-> new Promise (resolve)=>
		return resolve() if @state.open
		@list.closeAllPopups()
		@state.open = true

		boundingElDimensions = helpers.getElDimensions(@list.settings.boundingEl)
		DIMENSIONS = helpers.getDefaultDimensions(boundingElDimensions)
		windowWidth = Popup.windowWidth - DIMENSIONS.leftPadding - DIMENSIONS.rightPadding
		parentDimensions = helpers.getElDimensions(@parent, DIMENSIONS.leftPadding)
		targetDimensions = 'y': parentDimensions.y+parentDimensions.height+DIMENSIONS.offset
		

		if windowWidth > @settings.maxWidth+(DIMENSIONS.leftPadding+DIMENSIONS.rightPadding)
			targetDimensions.width = @settings.maxWidth
		else
			targetDimensions.width = windowWidth-(DIMENSIONS.leftPadding+DIMENSIONS.rightPadding)
			targetDimensions.x = DIMENSIONS.leftPadding

		
		if not targetDimensions.x # if x wasn't defined yet
			targetDimensions.x = (parentDimensions.centerLeft - targetDimensions.width/2)

			if targetDimensions.x < DIMENSIONS.leftPadding # If is overflowing left side of window
				targetDimensions.x = DIMENSIONS.leftPadding

			else if targetDimensions.x + targetDimensions.width + DIMENSIONS.rightPadding > windowWidth # If is overflowing right side of window
				targetDimensions.x = windowWidth - targetDimensions.width


		centerDiff = parentDimensions.centerLeft - (targetDimensions.x + targetDimensions.width/2)
		targetDimensions.scaleOrigin = targetDimensions.width/2 + centerDiff
		

		@el.insertAfter(@list.overlay)
		setTimeout ()=>
			@list.overlay.state 'isRevealed', on
			@el.style
				top: "#{targetDimensions.y}px"
				left: "#{targetDimensions.x}px"
				width: "#{targetDimensions.width}px"
				transformOrigin: "#{targetDimensions.scaleOrigin}px 0% 0px"
				opacity: 1

			@state.offset = x:0, y:0, scale:1
			setTimeout resolve, @list.settings.animationSpeed+25
		, 50






	close: ()-> animation = new Promise (resolve)=>
		return resolve() if not @state.open
		@state.open = false
		@list.overlay.state 'isRevealed', off
		@el.style 'opacity', null
		@state.offset = extend.clone(@state.offset, {scale:0})

		setTimeout ()=>
			resolve(@el.appendTo(@parent))
		, @list.settings.animationSpeed+25



	resetYPosition: (newScrollY, prevScrollY=0)->
		yChange = newScrollY-prevScrollY
		@state.offset = extend.clone(@state.offset, y:@state.offset.y-yChange)


	resetXPosition: (newScrollX, prevScrollX=0)->
		xChange = newScrollX+prevScrollX
		@state.offset = extend.clone(@state.offset, x:@state.offset.x-xChange)



	resetWidth: (newWidth)->
		boundingElDimensions = helpers.getElDimensions(@list.settings.boundingEl)
		DIMENSIONS = helpers.getDefaultDimensions(boundingElDimensions)
		windowWidth = Popup.windowWidth - DIMENSIONS.leftPadding - DIMENSIONS.rightPadding
		
		if windowWidth > @settings.maxWidth+(DIMENSIONS.leftPadding+DIMENSIONS.rightPadding)
			@el.width = @settings.maxWidth
		else
			@el.width = windowWidth-(DIMENSIONS.leftPadding+DIMENSIONS.rightPadding)




SimplyBind(()->
	Popup.windowScrollY = window.scrollY
	Popup.windowScrollX = window.scrollX
).updateOn('event:scroll').of(window)


SimplyBind(()->
	Popup.windowHeight = window.innerHeight
	Popup.windowWidth = window.innerWidth
).updateOn('event:resize').of(window)








module.exports = Popup