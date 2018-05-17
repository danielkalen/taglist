import DOM from 'quickdom'

export addButton = DOM.template(
	['div'
		ref: 'addButton'
		style:
			position: 'relative'
			display: 'inline-block'
			verticalAlign: 'top'
			height: '28px'
			width: '28px'
			boxSizing: 'border-box'

		['div'
			style: 
				# display: 'inline-block'
				# verticalAlign: 'top'
				height: '100%'
				width: '100%'
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

	]
)



export default DOM.template(
	['div'
		ref: 'TagList'
		style:
			position: 'relative'
			textAlign: 'left'
			fontFamily: (taglist)-> taglist.settings.fontFamily

		addButton
	]
)

