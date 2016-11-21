Popup = (@list, @parent, @hasSelect)->
	@applyStyles = applyStyles.bind(@)
	@removeStyles = removeStyles.bind(@)
	@isOpen = false
	@currentOffset = x:0, y:0, scale:0
	@els = {}
	@els.container = $(markup.popup.container())
	@els.content = $(markup.popup.content()).appendTo(@els.container)
	if @hasSelect
		@els.selectWrapper = $(markup.popup.selectWrapper()).insertBefore(@els.content)
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
		@applyStyles(@els.selectFake, TagList.style.popup.selectFake)
		@applyStyles(@els.selectInput, TagList.style.popup.selectInput)
		@applyStyles(@els.button, TagList.style.popup.button)
		@applyStyles(@els.button.children(), TagList.style.popup.buttonText)

	@els.container.appendTo(@parent)





Popup::attachBindings = ()->
	SimplyBind('windowScrollY').of(Popup)
		.to (newScroll, prevScroll)=> @resetYPosition(newScroll, prevScroll)
		.condition (newScroll, prevScroll)=> @isOpen and prevScroll?
	
	SimplyBind('windowScrollX').of(Popup)
		.to (newScroll, prevScroll)=> @resetXPosition(newScroll, prevScroll)
		.condition (newScroll, prevScroll)=> @isOpen and prevScroll?
	
	SimplyBind('windowWidth').of(Popup)
		.to (newWidth, prevWidth)=> @resetWidth(newWidth, prevWidth)
		.condition ()=> @isOpen

	SimplyBind('currentOffset', updateOnBind:false).of(@)
		.to (offset)=> @applyStyles @els.container, genTransformStyle("#{offset.x}px #{offset.y}px", offset.scale)

	SimplyBind(0).ofEvent('click').of(@list.els.overlay)
		.to ()=> @close()

	if @hasSelect
		SimplyBind('tagOptions').of(@list)
			.to('innerHTML.options').of(@els.selectInput)
				.transform (options)->
					output = ''
					output += "<option value='#{option.name}'>#{option.label}</option>" for option in options
					return output

		SimplyBind('value').of(@els.selectInput)
			.to('innerHTML').of(@els.selectFake)
			.and.to (selectedOption)=>
				styleMethod = if selectedOption then 'applyStyles' else 'removeStyles'
				@[styleMethod](@els.selectFake, TagList.style.popup.selectFake.hasColor)
				@[styleMethod](@els.content, TagList.style.popup.content.isRevealed)
				@[styleMethod](@els.button, TagList.style.popup.button.isRevealed)




DIMENSIONS = 
	'maxWidth': 350
	'padding': 20
	'offset': 25

Popup::open = ()-> animation = new Promise (resolve)=>
	return resolve() if @isOpen

	@list.closeAllPopups()
	@isOpen = true
	parentDimensions = @parent[0].getBoundingClientRect()
	parentDimensions.x = parentDimensions.left
	parentDimensions.y = parentDimensions.top
	parentDimensions.centerLeft = parentDimensions.x + parentDimensions.width/2
	targetDimensions = {}
	targetDimensions.y = parentDimensions.y+parentDimensions.height+DIMENSIONS.offset
	
	if Popup.windowWidth > DIMENSIONS.maxWidth+DIMENSIONS.padding*2
		targetDimensions.width = DIMENSIONS.maxWidth
	else
		targetDimensions.width = Popup.windowWidth-DIMENSIONS.padding*2
		targetDimensions.x = DIMENSIONS.padding

	
	if not targetDimensions.x # if x wasn't defined yet
		targetDimensions.x = (parentDimensions.centerLeft - targetDimensions.width/2) + DIMENSIONS.padding

		if targetDimensions.x < DIMENSIONS.padding # If is overflowing left side of window
			targetDimensions.x = DIMENSIONS.padding

		else if targetDimensions.x + targetDimensions.width + DIMENSIONS.padding > Popup.windowWidth - DIMENSIONS.padding # If is overflowing right side of window
			targetDimensions.x = Popup.windowWidth - DIMENSIONS.padding - targetDimensions.width


	centerDiff = parentDimensions.centerLeft - (targetDimensions.x + targetDimensions.width/2)
	targetDimensions.scaleOrigin = targetDimensions.width/2 + centerDiff
	

	@els.container.insertAfter(@list.els.overlay)
	@applyStyles @list.els.overlay, TagList.style.overlay.isRevealed
	@applyStyles @els.container, TagList.style.popup.container.transition,
		top: "#{targetDimensions.y}px"
		left: "#{targetDimensions.x}px"
		width: "#{targetDimensions.width}px"
		opacity: 1
		transformOrigin: genTransformOriginStyle("#{targetDimensions.scaleOrigin}px")

	@currentOffset = x:0, y:0, scale:1
	setTimeout resolve, 325
	animation.then ()=> @removeStyles @els.container, TagList.style.popup.container.transition



Popup::close = ()-> animation = new Promise (resolve)=>
	return resolve() if not @isOpen
	@isOpen = false

	@applyStyles @list.els.overlay, TagList.style.overlay
	@applyStyles @els.container, TagList.style.popup.container.transition, opacity:0
	@currentOffset = $.extend {}, @currentOffset, scale:0
	setTimeout resolve, 325
	animation.then ()=> @removeStyles @els.container, TagList.style.popup.container.transition




Popup::resetYPosition = (newScrollY, prevScrollY)->
	yChange = newScrollY+prevScrollY
	@currentOffset = $.extend {}, @currentOffset, y:@currentOffset+yChange


Popup::resetXPosition = (newScrollX, prevScrollX)->
	xChange = newScrollX+prevScrollX
	@currentOffset = $.extend {}, @currentOffset, x:@currentOffset+xChange




Popup::resetWidth = (newWidth)->
	if Popup.windowWidth > DIMENSIONS.maxWidth+DIMENSIONS.padding*2
		targetDimensions.width = DIMENSIONS.maxWidth
	else
		targetDimensions.width = Popup.windowWidth-DIMENSIONS.padding*2		




SimplyBind(0).ofEvent('scroll').of(window)
	.to ()->
		Popup.windowScrollY = window.scrollY
		Popup.windowScrollX = window.scrollX

SimplyBind(0).ofEvent('resize').of(window)
	.to ()->
		Popup.windowHeight = window.innerHeight
		Popup.windowWidth = window.innerWidth


Popup.windowScroll = window.scrollY
Popup.windowHeight = window.innerHeight
Popup.windowWidth = window.innerWidth







