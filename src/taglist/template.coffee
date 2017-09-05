DOM = import 'quickdom'

export container = DOM.template(
	['div'
		ref: 'container'
		style:
			position: 'relative'
			textAlign: 'left'

		computers: _init: ()->
			addButton.spawn(null, {@relatedInstance}).appendTo(@)
	]
)

export overlay = DOM.template(
	['div'
		ref: 'overlay'
		style:
			position: 'fixed'
			zIndex: 2000
			top: 0
			left: 0
			width: '100vw'
			height: '100vh'
			visibility: 'hidden'
			$isRevealed:
				visibility: 'visible'
	]
)

export addButton = DOM.template(
	['div'
		ref: 'addButton'
		style:
			position: 'relative'
			display: 'inline-block'
			verticalAlign: 'top'
			height: '28px'
			width: '28px'
			border: '2px dashed'
			borderRadius: '5px'
			boxSizing: 'border-box'
			cursor: 'pointer'
			userSelect: 'none'
			opacity: 0.35
			color: '#181818'

		['div'
			ref: 'TagListButtonText'
			style:
				position: 'absolute'
				left: 0
				right: 0
				top: '55%'
				transform: 'translate(0, -50%)'
				width: '100%'
				lineHeight: 1
				textAlign: 'center'
				fontSize: '23px'
				fontWeight: 600
		'+']
	]
)




