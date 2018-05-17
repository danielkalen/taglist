DOM = import 'quickdom'
SVG = import '../svg'

export arrow = DOM.template(
	['div'
		ref: 'arrow'
		style:
			position: 'absolute'
			zIndex: 2
			right: '15px'
			top: '54%'
			transform: "translate(0, -50%)"
			width: '17px'
			height: '17px'
			backgroundSize: '100%'
			backgroundImage: "url(#{SVG.arrowDown})"
			opacity: 0.5
	]
)

export fake = DOM.template(
	['div'
		ref: 'fake'
		style:
			position: 'absolute'
			zIndex: 1
			left: 0
			top: '53%'
			transform: "translate(0, -50%)"
			height: '16px'
			padding: '0 15px'
			fontSize: '16px'
			fontWeight: 500
			lineHeight: 1
			textAlign: 'left'
			userSelect: 'none'
			boxSizing: 'border-box'
			color: '#181818'
			opacity: 0.6
			$hasContent:
				opacity: 1
	]
)

export input = DOM.template(
	['select'
		ref: 'input'
		forceStyle: true
		style:
			position: 'absolute'
			zIndex: 3
			top: 0
			left: 0
			width: '100%'
			height: '100%'
			opacity: 0

		computers: _init: ()->
			DOM.option(props:{value:''}, "Add #{@related.list.settings.itemLabel}").appendTo(@)

		methods:
			label: get: ()->
				selected = @raw.selectedIndex or 0
				return @raw.options[selected]?.label
			
			value:
				get: ()-> @raw.value
				set: (value)-> @raw.value = value
	]
)

export field = DOM.template(
	['div'
		ref: 'selectField'
		style:
			position: 'relative'
			# width: '100%'
			minWidth: 250
			height: '55px'
			borderBottom: '1px solid #ddd'

		arrow
		fake
		input
	]
)


export button = DOM.template(
	['div'
		ref: 'button'
		style:
			position: 'relative'
			display: 'none'
			height: 50
			borderRadius: '0 0 5px 5px'
			boxSizing: 'border-box'
			cursor: 'pointer'
			userSelect: 'none'
			backgroundColor: (i)-> i.settings.button.bgColor
			color: (i)-> i.settings.button.textColor
			$hasContent:
				display: 'block'

		['div'
			ref: 'buttonText'
			style:
				position: 'absolute'
				top: '53%'
				transform: "translate(0, -50%)"
				display: 'block'
				width: '100%'
				fontSize: 16
				lineHeight: 1
				fontWeight: 500
				textAlign: 'center'
				textTransform: 'uppercase'
				letterSpacing: '1.5px'
			
			computers: _init: ()->
				@text = "Add #{@related.list.settings.itemLabel}"
		]
	]
)




