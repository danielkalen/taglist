applyStyles = (el, styleObject, additional)->
	styleObject = $.extend {}, styleObject, additional if additional
	target = (el[0] or el)
	
	for key,value of styleObject
		switch typeof value
			when 'object'
				@applyStyles(target, value)

			when 'function'
				returnedValue = value(@)
				if typeof returnedValue is 'object'
					@applyStyles(target, returnedValue)
				else
					target.style[key] = returnedValue
			
			else
				target.style[key] = value

	return el


removeStyles = (el, styleObject, stylesToReinstate)->
	stylesToRemove = new ()-> @[key]='' for key of styleObject; @

	@applyStyles(el, stylesToRemove, stylesToReinstate)



genTransformStyle = (value, scaleValue)->
	scale = if scaleValue? then "scale(scaleValue)" else ''
	translate = "translate(#{value})"
	transformString = "#{translate} #{scale}"

	webkitTransform: transformString
	mozTransform: transformString
	msTransform: transformString
	oTransform: transformString
	transform: transformString



genTransformOriginStyle = (xValue)->
	webkitTransformOrigin: "#{xValue} 0%"
	mozTransformOrigin: "#{xValue} 0%"
	msTransformOrigin: "#{xValue} 0%"
	oTransformOrigin: "#{xValue} 0%"
	transformOrigin: "#{xValue} 0%"



regExMatrixValues = /matrix3?d?\((.+)\)/
regExCommaList = /,\s*/
getCurrentTranslation = (subnotice)->
	computedStyle = window.getComputedStyle(subnotice.els.subnotice[0])
	matrix = computedStyle.transform or computedStyle.webkitTransform or computedStyle.mozTransform
	
	if matrix?.length and matrix isnt 'none'
		values = matrix.match(regExMatrixValues)[1]
		translateY = values.split(regExCommaList).slice(-1)[0]
	else
		translateY = 0
	
	return parseFloat(translateY)