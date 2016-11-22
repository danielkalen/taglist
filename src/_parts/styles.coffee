# ==== General =================================================================================
styles = {} 
styles.container =
	position: 'relative'
	textAlign: 'left'

styles.overlay =
	position: 'fixed'
	zIndex: 200
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
	height: '28px'
	width: '28px'
	border: '2px dashed'
	borderRadius: '5px'
	boxSizing: 'border-box'
	cursor: 'pointer'
	userSelect: 'none'
	opacity: 0.35
	# backgroundColor: (tagList)-> tagList.options.tagBGColor
	color: (tagList)-> tagList.options.tagTextColor

styles.addButton.text = 
	position: 'absolute'
	left: 0
	right: 0
	top: '55%'
	transform: ()-> genTransformStyle('0, -50%')
	width: '100%'
	lineHeight: 1
	textAlign: 'center'
	fontSize: '23px'
	fontWeight: 600



# ==== Tag =================================================================================
styles.tag = {}
styles.tag.container =
	position: 'relative'
	float: 'left'
	display: 'block'
	height: '28px'
	marginRight: '10px'
	padding: '0 25px 0 10px'
	borderRadius: '4px'
	textAlign: 'center'
	boxSizing: 'border-box'
	cursor: 'pointer'
	userSelect: 'none'
	backgroundColor: (tag)-> tag.list.options.tagBGColor
	color: (tag)-> tag.list.options.tagTextColor


styles.tag.text = 
	position: 'relative'
	top: '9px'
	fontSize: '13.2px'
	lineHeight: 1


styles.tag.removeButton =
	position: 'absolute'
	right: '8px'
	top: '55%'
	transform: ()-> genTransformStyle('0, -50%')
	fontSize: '17px'
	lineHeight: 1
	opacity: 0.4
	fontWeight: 600






# ==== Popup =================================================================================
styles.popup = {}
styles.popup.container = 
	position: 'fixed'
	zIndex: 201
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
	borderRadius: '0 0 5px 5px'
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
	transform: ()-> genTransformStyle('0, -50%')
	display: 'block'
	width: '100%'
	fontSize: '16px'
	lineHeight: 1
	fontWeight: 500
	textAlign: 'center'
	textTransform: 'uppercase'
	letterSpacing: '1.5px'


styles.popup.selectWrapper = 
	position: 'relative'
	width: '100%'
	height: '55px'
	borderBottom: '1px solid #ddd'

styles.popup.selectArrow = 
	position: 'absolute'
	zIndex: 2
	right: '15px'
	top: '54%'
	transform: ()-> genTransformStyle('0, -50%')
	width: '17px'
	height: '17px'
	backgroundSize: '100%'
	backgroundImage: "url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMwOS4xNTYgMzA5LjE1NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzA5LjE1NiAzMDkuMTU2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPGc+CgkJPHBvbHlnb24gcG9pbnRzPSIyODguNDYxLDY0LjkyOSAxNTQuNTg5LDIwMi43NjYgMjAuNzIzLDY0Ljk0IDAsODUuMDcgMTU0LjU4OSwyNDQuMjI4IDMwOS4xNTYsODUuMDcgICAiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K)"
	opacity: 0.5


styles.popup.selectFake = 
	position: 'absolute'
	zIndex: 1
	left: 0
	top: '53%'
	transform: ()-> genTransformStyle('0, -50%')
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

styles.popup.selectFake.hasColor = 
	opacity: 1


styles.popup.selectInput = 
	position: 'absolute'
	zIndex: 3
	top: 0
	left: 0
	width: '100%'
	height: '100%'
	opacity: 0









