do ($=jQuery)->
	import _parts/helpers.coffee
	import _parts/styles.coffee
	import _parts/markup.coffee
	import _parts/defaults.coffee
	import _parts/Popup.coffee
	import _parts/Tag.coffee
	
	TagList = (@targetContainer, @tagOptions=[], options)->
		@options = $.extend(true, {}, defaultOptions, options)
		@applyStyles = applyStyles.bind(@)
		@removeStyles = removeStyles.bind(@)
		@tags = []
		@els = {}
		@els.container = $(markup.container()).data('TagList', @)
		@els.overlay = $(markup.overlay()).prependTo(document.body)
		@els.addButton = $(markup.addButton(@options.itemLabel)).appendTo(@els.container)
		@popup = new Popup(@, @els.addButton)

		@add(defaultTag) for defaultTag in @options.default

		@attachBindings()
		@appendToDOM()
		return @



	TagList::addTagOption = (tagOption)->
		@tagOptions.push tagOption
		return tagObj


	TagList::add = (tagData)->
		@tags.push tagObj = new Tag(@, tagData)


	TagList::appendToDOM = ()->
		@applyStyles(@els.container, TagList.style.container)
		@applyStyles(@els.overlay, TagList.style.overlay)
		@applyStyles(@els.addButton, TagList.style.addButton)

		@els.container.appendTo(@targetContainer)



	TagList::attachBindings = ()->
		SimplyBind(0).ofEvent('click').of(@els.addButton)
			.to ()=> @popup.open()














	TagList.style = styles
	TagList.tagBGColor = '#bebebe'
	TagList.tagTextColor = '#000'
	TagList.version = import ../.version.coffee
	import [windowExport] _parts/export.window.coffee
	import [umdExport] _parts/export.umd.coffee	