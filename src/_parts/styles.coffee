# ==== General =================================================================================
styles = {} 
styles.container =
	position: 'relative'
	textAlign: 'left'

styles.overlay =
	position: 'fixed'
	top: 0
	left: 0
	width: '100vw'
	height: '100vh'
	visibility: 'hidden'

styles.overlay.isRevealed =
	visibility: 'visible'


styles.addButton = 
	position: 'relative'
	display: 'inline-block'
	padding: '0 5px'
	border: '2px dashed'
	fontSize: '23px'
	textAlign: 'center'
	lineHeight: '22px'
	boxSizing: 'border-box'
	cursor: 'pointer'
	userSelect: 'none'
	color: (tag)-> tag.list.options.tagTextColor




# ==== Tag =================================================================================
styles.tag = {}
styles.tag.container =
	position: 'relative'
	display: 'inline-block'
	height: '28px'
	marginRight: '10px'
	padding: '0 20px 0 5px'
	fontSize: '13.2px'
	lineHeight: '28px'
	textAlign: 'center'
	boxSizing: 'border-box'
	cursor: 'pointer'
	userSelect: 'none'
	backgroundColor: (tag)-> tag.list.options.tagBGColor
	color: (tag)-> tag.list.options.tagTextColor

styles.tag.removeButton =
	position: 'absolute'
	right: '5px'
	top: '50%'
	transform: genTransformStyle('0 -50%')
	fontSize: '17px'
	lineHeight: 1
	opacity: 0.6






# ==== Popup =================================================================================
styles.popup = {}
styles.popup.container = 
	position: 'fixed'
	backgroundColor: 'white'
	borderRadius: '5px'
	boxShadow: '0px 3px 18px rgba(0,0,0,0.24)'
	opacity: 0
	boxSizing: 'border-box'

styles.popup.container.transition =
	transition: 'transform 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86), -webkit-transform 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86), opacity 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86)'


styles.popup.content = 
	display: 'none'
	padding: '20px'
	boxSizing: 'border-box'

styles.popup.content.isRevealed = 
	display: 'block'


styles.popup.button = 
	position: 'relative'
	display: 'none'
	height: '50px'
	boxSizing: 'border-box'
	cursor: 'pointer'
	userSelect: 'none'
	backgroundColor: (popup)-> popup.list.options.buttonBGColor
	color: (popup)-> popup.list.options.buttonTextColor

styles.popup.button.isRevealed = 
	display: 'block'


styles.popup.button.text = 
	position: 'absolute'
	top: '53%'
	transform: genTransformStyle('0 -50%')
	display: 'block'
	width: '100%'
	fontSize: '16px'
	lineHeight: 1
	fontWeight: 500
	textAlign: 'center'
	textTransform: 'uppercase'
	letterSpacing: '0.3px'


styles.popup.selectWrapper = 
	position: 'relative'
	width: '100%'
	height: '55px'
	borderBottom: '1px solid #ddd'

styles.popup.selectFake = 
	position: 'absolute'
	zIndex: 1
	left: 0
	top: '53%'
	transform: genTransformStyle('0 -50%')
	height: '16px'
	padding: '0 15px'
	fontSize: '16px'
	lineHeight: 1
	textAlign: 'left'
	opacity: 0.6
	userSelect: 'none'
	boxSizing: 'border-box'

styles.popup.selectFake.hasColor = 
	opacity: 1


styles.popup.selectInput = 
	position: 'absolute'
	zIndex: 2
	width: '100%'
	height: '100%'
	opacity: 0











