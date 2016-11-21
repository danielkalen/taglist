Popup = (@list, @parent, @hasSelect)->
	@applyStyles = applyStyles.bind(@)
	@removeStyles = removeStyles.bind(@)
	@els = {}
	@els.container = $(markup.popup.container())
	@els.content = $(markup.popup.content()).appendTo(@els.container)
	if @hasSelect
		@els.selectWrapper = $(markup.popup.selectWrapper()).insertBefore(@els.content)
		@els.selectFake = $(markup.popup.selectFake()).appendTo(@els.selectWrapper)
		@els.selectInput = $(markup.popup.selectInput @parentList.options.itemLabel).appendTo(@els.selectWrapper)

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

	@els.container.appendTo(@parent)





Popup::attachBindings = ()->
	SimplyBind('tagOptions').of(@list)
		.to('innerHTML.options').of(@els.selectInput)
			.transform (options)->
				output = ''
				output += "<option>#{option.label}</option>" for option in options
				return output

	SimplyBind('value').of(@els.selectInput)
		.to('innerHTML').of(@els.selectFake)
		.and.to (selectedOption)=>
			styleMethod = if selectedOption then 'applyStyles' else 'removeStyles'
			@[styleMethod](@els.selectFake, TagList.style.popup.selectFake.hasColor)
			@[styleMethod](@els.content, TagList.style.popup.content.isRevealed)

	SimplyBind('windowScroll').of(Popup)
		.to ()=> @setPosition()




SimplyBind(0).ofEvent('scroll').of(window)
	.to('windowScroll').of(Popup)

SimplyBind(0).ofEvent('resize').of(window)
	.to ()->
		Popup.windowHeight = window.innerHeight
		Popup.windowWidth = window.innerWidth


Popup.windowScroll = window.scrollY
Popup.windowHeight = window.innerHeight
Popup.windowWidth = window.innerWidth







