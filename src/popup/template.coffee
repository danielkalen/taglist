DOM = import 'quickdom'
svg = import '../svg'
ease = 'cubic-bezier(0.785, 0.135, 0.15, 0.86)'

export container = DOM.template(
	['div'
		ref: 'TagList-Popup'
		style:
			position: 'relative'
			# position: 'fixed'
			zIndex: 2001
			backgroundColor: 'white'
			borderRadius: '5px'
			boxShadow: '0px 3px 18px rgba(0,0,0,0.24)'
			# opacity: 0
			boxSizing: 'border-box'
			fontFamily: (popup)-> popup.list.settings.fontFamily
			$animating:
				transition: (popup)->
					speed = popup.settings.animationSpeed
					"opacity #{speed}ms #{ease}, transform #{speed}ms #{ease}, -webkit-transform #{speed}ms #{ease}"
		
		['div'
			ref: 'content'
			style:
				display: 'none'
				boxSizing: 'border-box'
				padding: (popup)-> "#{popup.settings.padding}px"
				$hasContent:
					display: 'block'
		]
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
			backgroundColor: (popup)-> popup.list.settings.button.bgColor
			color: (popup)-> popup.list.settings.button.textColor
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

export select = DOM.template(
	['div'
		ref: 'selectWrapper'
		style:
			position: 'relative'
			# width: '100%'
			minWidth: 250
			height: '55px'
			borderBottom: '1px solid #ddd'

		['div'
			ref: 'selectArrow'
			style:
				position: 'absolute'
				zIndex: 2
				right: '15px'
				top: '54%'
				transform: "translate(0, -50%)"
				width: '17px'
				height: '17px'
				backgroundSize: '100%'
				backgroundImage: "url(#{svg.arrowDown})"
				opacity: 0.5
		]
		
		['div'
			ref: 'selectFake'
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
		
		['select'
			ref: 'selectInput'
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
				
				value: get: ()->
					return @raw.value
		]
	]
)


