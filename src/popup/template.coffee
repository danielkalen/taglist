import DOM from 'quickdom'

export button = DOM.template(
	['div'
		ref: 'button'
		style:
			position: 'relative'
			height: 50
			borderRadius: '0 0 5px 5px'
			boxSizing: 'border-box'
			cursor: 'pointer'
			userSelect: 'none'
			backgroundColor: (i)-> i.settings.button.bgColor
			color: (i)-> i.settings.button.textColor
		computers:
			height: (height)-> @style {height}


		['div'
			ref: 'buttonText'
			style:
				position: 'absolute'
				top: '53%'
				transform: "translate(0, -50%)"
				display: 'block'
				width: '100%'
				fontSize: 14
				lineHeight: 1
				fontWeight: 400
				textAlign: 'center'
				textTransform: 'uppercase'
				letterSpacing: '1.5px'
			computers:
				text: (text)-> @text = text
				size: (fontSize)-> @style {fontSize}
				font: (fontFamily)-> @style {fontFamily}
		]
	]
)

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
			fontFamily: (popup)-> popup.settings.fontFamily
		
		['div'
			ref: 'content'
		]
	]
)


