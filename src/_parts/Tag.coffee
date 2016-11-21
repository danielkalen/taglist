Tag = (@list, @options)->
	@value = @options.default or ''
	@applyStyles = applyStyles.bind(@)
	@removeStyles = removeStyles.bind(@)
	@els = {}
	@els.container = $(markup.tag.container()).data('Tag', @)
	@els.text = $(markup.tag.text()).appendTo(@els.container)
	@els.closeButton = $(markup.tag.closeButton()).appendTo(@els.container)
	@popup = new Popup(@list, @els.container)

	@attachBindings()
	@appendToDOM()
	return @



Tag::appendToDOM = ()->
	@applyStyles(@els.container, TagList.style.tag.container)
	@applyStyles(@els.text, TagList.style.tag.text)
	@applyStyles(@els.closeButton, TagList.style.tag.closeButton)

	@els.container.appendTo(@list.els.container)



Tag::attachBindings = ()->
	SimplyBind('tagOptions').of(@list)
		.to('innerHTML').of(@els.popup)



















