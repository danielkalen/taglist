markup = 
	container: ()->
		"<div class='TagList'></div>"
	overlay: ()->
		"<div class='TagList-overlay'></div>"
	addButton: ()-> "
		<div class='TagList-addButton'>
			<div class='TagList-addButton-icon'>&#43;</div>
		</div>
	"


	tag:
		container: ()->
			"<div class='TagList-Tag'></div>"
		removeButton: ()->
			"<div class='TagList-Tag-removeButton'>×</div>"
		text: ()-> "
			<div class='TagList-Tag-text'>
				<b>{{label}}</b>: {{value}}
			</div>
		"

	popup:
		container: ()->
			"<div class='TagList-Popup'></div>"
		selectWrapper: ()->
			"<div class='TagList-Popup-selectField'></div>"
		selectArrow: ()->
			"<div class='TagList-Popup-selectField-arrow'></div>"
		selectFake: ()->
			"<div class='TagList-Popup-selectField-fake'></div>"
		selectInput: (itemLabel)-> "
			<select class='TagList-Popup-selectField-input'>
				<option value=''>Select #{itemLabel}...</option>
				{{options}}
			</select>
		"
		content: ()->
			"<div class='TagList-Popup-content'></div>"
		button: (itemLabel)-> "
			<div class='TagList-Popup-button'>
				<div class='TagList-Tag-button-text'>Add #{itemLabel}</div>
			</div>
		"