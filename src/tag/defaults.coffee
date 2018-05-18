export settings =
	bgColor: '#ccc'
	textColor: '#181818'
	updateWhen: 'applied' # || 'changed'
	hideLabel: false
	padding: 20
	maxWidth: 350


export option =
	getter: ()-> @field.value
	setter: (value)-> @field.value = value
	validate: ()-> true


