Popup = (@list, @parent, options={}, @hasSelect)->
	@applyStyles = applyStyles.bind(@)
	@removeStyles = removeStyles.bind(@)
	@options = $.extend {}, defaultPopupOptions, options
	@isOpen = false
	@currentOffset = x:0, y:0, scale:0
	@els = {}
	@els.container = $(markup.popup.container()).data('Popup', @)
	@els.content = $(markup.popup.content()).appendTo(@els.container)
	if @hasSelect
		@els.selectWrapper = $(markup.popup.selectWrapper()).insertBefore(@els.content)
		@els.selectArrow = $(markup.popup.selectArrow()).appendTo(@els.selectWrapper)
		@els.selectFake = $(markup.popup.selectFake()).appendTo(@els.selectWrapper)
		@els.selectInput = $(markup.popup.selectInput @list.options.itemLabel).appendTo(@els.selectWrapper)
		@els.button = $(markup.popup.button @list.options.itemLabel).appendTo(@els.container)

	@attachBindings()
	@appendToDOM()
	return @




Popup::appendToDOM = ()->
	@applyStyles(@els.container, TagList.style.popup.container)
	@applyStyles(@els.content, TagList.style.popup.content)
	if @hasSelect
		@applyStyles(@els.selectWrapper, TagList.style.popup.selectWrapper)
		@applyStyles(@els.selectArrow, TagList.style.popup.selectArrow)
		@applyStyles(@els.selectFake, TagList.style.popup.selectFake)
		@applyStyles(@els.selectInput, TagList.style.popup.selectInput)
		@applyStyles(@els.button, TagList.style.popup.button)
		@applyStyles(@els.button.children(), TagList.style.popup.button.text)

	@els.container.appendTo(@parent)





Popup::attachBindings = ()->
	SimplyBind('windowScrollY', updateOnBind:false).of(Popup)
		.to (newScroll, prevScroll)=> @resetYPosition(newScroll, prevScroll)
		.condition (newScroll, prevScroll)=> @isOpen
	
	SimplyBind('windowScrollX', updateOnBind:false).of(Popup)
		.to (newScroll, prevScroll)=> @resetXPosition(newScroll, prevScroll)
		.condition (newScroll, prevScroll)=> @isOpen
	
	SimplyBind('windowWidth', updateOnBind:false).of(Popup)
		.to (newWidth, prevWidth)=> @resetWidth(newWidth, prevWidth)
		.condition ()=> @isOpen

	SimplyBind('currentOffset').of(@)
		.to (offset)=> @applyStyles @els.container, genTransformStyle("#{offset.x}px, #{offset.y}px", offset.scale)

	SimplyBind('event:click').of(@list.els.overlay)
		.to ()=> @close()

	if not @hasSelect
		SimplyBind('isOpen').of(@)
			.to (isOpen)=> @applyStyles(@els.content, TagList.style.popup.content.isRevealed) if isOpen
	else
		SimplyBind(@list.tagOptionsAvailable, trackArrayChildren:false)
			.to('innerHTML.options').of(@els.selectInput)
				.transform (options)->
					output = ''
					output += "<option>#{option.label}</option>" for option in options
					return output

		SimplyBind('value').of(@els.selectInput)
			.to('innerHTML').of(@els.selectFake)
				.transform (value)=> if value then value else @els.selectInput[0].options[0].innerHTML
			.and.to (selectedOption)=>
				if selectedOption
					@applyStyles(@els.selectFake, TagList.style.popup.selectFake.hasColor)
					@applyStyles(@els.content, TagList.style.popup.content.isRevealed)
					@applyStyles(@els.button, TagList.style.popup.button.isRevealed)
				else
					@applyStyles(@els.selectFake, TagList.style.popup.selectFake)
					@applyStyles(@els.content, TagList.style.popup.content)
					@applyStyles(@els.button, TagList.style.popup.button)




Popup::open = ()-> new Promise (resolve)=>
	return resolve() if @isOpen
	@list.closeAllPopups()
	@isOpen = true

	boundingElDimensions = getElDimensions(@list.options.boundingEl[0])
	DIMENSIONS = getDefaultDimensions(boundingElDimensions)
	windowWidth = Popup.windowWidth - DIMENSIONS.leftPadding - DIMENSIONS.rightPadding
	parentDimensions = getElDimensions(@parent[0], DIMENSIONS.leftPadding)
	targetDimensions = 'y': parentDimensions.y+parentDimensions.height+DIMENSIONS.offset
	

	if windowWidth > @options.maxWidth+(DIMENSIONS.leftPadding+DIMENSIONS.rightPadding)
		targetDimensions.width = @options.maxWidth
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
	

	@els.container.insertAfter(@list.els.overlay)
	setTimeout ()=>
		@applyStyles @list.els.overlay, TagList.style.overlay.isRevealed
		@applyStyles @els.container, TagList.style.popup.container.transition
		@applyStyles @els.container,
			top: "#{targetDimensions.y}px"
			left: "#{targetDimensions.x}px"
			width: "#{targetDimensions.width}px"
			opacity: 1
			transformOrigin: ()-> genTransformOriginStyle("#{targetDimensions.scaleOrigin}px")

		@currentOffset = x:0, y:0, scale:1
		setTimeout ()=>
			@removeStyles @els.container, TagList.style.popup.container.transition
			resolve()
		, 325
	, 50






Popup::close = ()-> animation = new Promise (resolve)=>
	return resolve() if not @isOpen
	@isOpen = false

	@applyStyles @list.els.overlay, TagList.style.overlay
	@applyStyles @els.container, TagList.style.popup.container.transition, opacity:0
	@currentOffset = $.extend {}, @currentOffset, scale:0

	setTimeout ()=>
		@removeStyles @els.container, TagList.style.popup.container.transition
		@els.container.appendTo(@parent)
		resolve()
	, 325




Popup::resetYPosition = (newScrollY, prevScrollY=0)->
	yChange = newScrollY-prevScrollY
	@currentOffset = $.extend {}, @currentOffset, y:@currentOffset.y-yChange


Popup::resetXPosition = (newScrollX, prevScrollX=0)->
	xChange = newScrollX+prevScrollX
	@currentOffset = $.extend {}, @currentOffset, x:@currentOffset.x-xChange




Popup::resetWidth = (newWidth)->
	boundingElDimensions = getElDimensions(@list.options.boundingEl[0])
	DIMENSIONS = getDefaultDimensions(boundingElDimensions)
	windowWidth = Popup.windowWidth - DIMENSIONS.leftPadding - DIMENSIONS.rightPadding
	
	if windowWidth > @options.maxWidth+(DIMENSIONS.leftPadding+DIMENSIONS.rightPadding)
		targetWidth = @options.maxWidth
	else
		targetWidth = windowWidth-(DIMENSIONS.leftPadding+DIMENSIONS.rightPadding)

	@applyStyles @els.container, width:"#{targetWidth}px"




SimplyBind('event:scroll').of(window)
	.to ()->
		Popup.windowScrollY = window.scrollY
		Popup.windowScrollX = window.scrollX

SimplyBind('event:resize').of(window)
	.to ()->
		Popup.windowHeight = window.innerHeight
		Popup.windowWidth = window.innerWidth


Popup.windowScroll = window.scrollY
Popup.windowHeight = window.innerHeight
Popup.windowWidth = window.innerWidth







