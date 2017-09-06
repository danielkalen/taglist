DOM = import 'quickdom'


export removeButton = DOM.template(
	['div'
		ref: 'removeButton'
		style:
			position: 'absolute'
			right: '8px'
			top: '55%'
			transform: "translate(0, -50%)"
			fontSize: '17px'
			lineHeight: 1
			opacity: 0.4
			fontWeight: 600
	'×']
)

export text = DOM.template(
	['div'
		ref: 'text'
		props: innerHTML: '<b>{{label}}</b>: {{value}}'
		style:
			position: 'relative'
			top: '9px'
			fontSize: '13.2px'
			lineHeight: 1
	]
)


export container = DOM.template(
	['div'
		ref: 'TagList-Tag'
		style:
			position: 'relative'
			display: 'inline-block'
			verticalAlign: 'top'
			height: '28px'
			marginRight: '10px'
			marginBottom: '6px'
			padding: '0 25px 0 10px'
			borderRadius: '4px'
			textAlign: 'center'
			boxSizing: 'border-box'
			cursor: 'pointer'
			userSelect: 'none'
			backgroundColor: (tag)-> tag.settings.bgColor
			color: (tag)-> tag.settings.textColor
			fontFamily: (tag)-> tag.list.settings.fontFamily

		text,
		removeButton
	]
)

