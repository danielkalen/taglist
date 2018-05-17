import DOM from 'quickdom'

export default DOM.template(
	['div'
		ref: 'TagList-Popup'
		style:
			position: 'relative'
			zIndex: 2001
			backgroundColor: 'white'
			borderRadius: '5px'
			boxShadow: '0px 3px 18px rgba(0,0,0,0.24)'
			boxSizing: 'border-box'
			fontFamily: (popup)-> popup.list.settings.fontFamily
		
		['div'
			ref: 'content'
			style:
				boxSizing: 'border-box'
				padding: (popup)-> "#{popup.settings.padding}px"
		]
	]
)


