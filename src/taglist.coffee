do ($=jQuery)->
	import _parts/helpers.coffee
	import _parts/styles.coffee
	import _parts/markup.coffee
	import _parts/defaults.coffee
	import _parts/Popup.coffee
	import _parts/Tag.coffee
	
	TagList = (@targetContainer, @tagOptions=[], options)->
		@applyStyles = applyStyles.bind(@)
		@removeStyles = removeStyles.bind(@)
		@options = $.extend(true, {}, defaultOptions, options)
		@tags = []
		@current = {}
		@els = {}
		@els.container = $(markup.container()).data('TagList', @)
		@els.overlay = $(markup.overlay()).prependTo(document.body)
		@els.addButton = $(markup.addButton(@options.itemLabel)).appendTo(@els.container)
		@popup = new Popup(@, @els.addButton)

		tagOption.name ?= tagOption.label for tagOption in @tagOptions
		for defaultTagName,defaultTagValue of @options.default
			tagOption = @tagOptions.find (tagOption)-> tagOption.name is defaultTagName
			@add(value:defaultTagValue, tagOption)

		@attachBindings()
		@appendToDOM()
		return @



	TagList::addTagOption = (tagOption)->
		@tagOptions.push tagOption


	TagList::add = (tagData, tagOption, popupContent)->
		@tags.push tagObj = new Tag(@, tagOption, tagData, popupContent)
		
		SimplyBind('value', updateOnBind:false).of(tagObj)
			.to ()=> @triggerChange()



	TagList::appendToDOM = ()->
		@applyStyles(@els.container, TagList.style.container)
		@applyStyles(@els.overlay, TagList.style.overlay)
		@applyStyles(@els.addButton, TagList.style.addButton)

		@els.container.appendTo(@targetContainer)



	TagList::attachBindings = ()->
		SimplyBind(0).ofEvent('click').of(@els.addButton)
			.to ()=> @openPopup()

		SimplyBind(0).ofEvent('click').of(@popup.els.button)
			.to ()=>
				@add(@current.dataObj, @current.tagOption, @current.contentElement)
				@popup.close().then ()=> @selectedTag = ''

		SimplyBind('value').of(@popup.els.selectInput)
			.to('selectedTag').of(@).bothWays()
			.chainTo (selectedTag)=> if selectedTag
				@current.dataObj = {value:null}
				@current.tagOption = @tagOptions.find (tagOption)-> tagOption.name is selectedTag
				@current.contentElement = $(tagOption.content(@current.dataObj)).appendTo()



	TagList::closeAllPopups = ()->
		@popup.close()
		tag.popup.close() for tag in @tags



	TagList::triggerChange = ()->
		tags = @tags
		values = new ()-> @[tag.name] = tag.value for tag in tags
		
		@options.onChange?(values, @)


	TagList::getTagOptionByName = (targetName)->
		@tagOptions.find (tagOption)-> tagOption.name is targetName













	TagList.style = styles
	TagList.tagBGColor = '#bebebe'
	TagList.tagTextColor = '#000'
	TagList.version = import ../.version.coffee
	import [windowExport] _parts/export.window.coffee
	import [umdExport] _parts/export.umd.coffee	