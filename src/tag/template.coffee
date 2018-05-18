import DOM from 'quickdom'
import {button as button_} from '../popup/template'

export button = DOM.template(
	['div'
		ref: 'button'
		['div'
			ref: 'errorMessage'
			style:
				boxSizing: 'border-box'
				display: 'none'
				padding: '10px 15px'
				fontSize: 12
				fontWeight: 500
				color: '#f74425'

			methods:
				set: (message)->
					@html = message
					@show()
					
					clearTimeout(@_timeout)
					@_timeout = setTimeout ()=>
						@clear()
					, 8000
				
				clear: ()->
					@text = ''
					@hide()
		]
		
		button_.extend(
			ref: 'button_'
			['div'
				style:
					backgroundColor: '#d4d4d4'
					$hover:
						backgroundColor: (i)-> i.settings.button.bgColor
			]
		)
	]
)

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
		style:
			position: 'relative'
			top: '9px'
			fontSize: '13.2px'
			lineHeight: 1

		['span'
			ref: 'label'
			style:
				fontWeight: 600
		]

		['span'
			ref: 'value'
		]
	]
)

export content = DOM.template(
	['div'
		ref: 'tagContent'
		style:
			boxSizing: 'border-box'
			padding: (i)-> "#{i.settings.padding}px"
			maxWidth: (i)-> "#{i.settings.maxWidth}px"
	]
)


export default DOM.template(
	['div'
		ref: 'tag'
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
			fontFamily: (tag)-> tag.settings.fontFamily

		text
		removeButton
	]
)

