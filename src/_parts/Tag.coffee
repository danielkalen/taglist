Tag = (@list, @options, @data={}, popupContent)->
	@applyStyles = applyStyles.bind(@)
	@removeStyles = removeStyles.bind(@)
	@name = @options.name
	@label = @options.label
	@value = @options.default or ''
	@els = {}
	@els.container = $(markup.tag.container()).data('Tag', @)
	@els.text = $(markup.tag.text()).appendTo(@els.container)
	@els.removeButton = $(markup.tag.removeButton()).appendTo(@els.container)
	@popup = new Popup(@list, @els.container, @options.popup)

	if popupContent
		$(popupContent).appendTo(@popup.els.content)
	else
		$(@options.content(@data)).appendTo(@popup.els.content)

	@attachBindings()
	@appendToDOM()
	return @



Tag::appendToDOM = ()->
	@applyStyles(@els.container, TagList.style.tag.container)
	@applyStyles(@els.text, TagList.style.tag.text)
	@applyStyles(@els.removeButton, TagList.style.tag.removeButton)

	@els.container.insertBefore(@list.els.addButton)



Tag::attachBindings = ()->
	SimplyBind('label').of(@)
		.to('textContent.label').of(@els.text)
			.transform (label)=> if @options.labelFormatter then @options.labelFormatter(label) else label
	
	SimplyBind('value').of(@)
		.to('textContent.value').of(@els.text)
			.transform (value)=> if @options.valueFormatter then @options.valueFormatter(value) else value

	SimplyBind('event:click').of(@els.removeButton)
		.to (event)=> @list.remove(@); event.stopPropagation()

	SimplyBind('event:click').of(@els.container)
		.to (event)=> @popup.open()

	SimplyBind('value', updateOnBind:!!@data.value).of(@data)
		.to('value').of(@)















