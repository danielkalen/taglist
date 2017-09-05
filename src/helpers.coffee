extend = import 'smart-extend'
defaultDimensions = 
	'maxWidth': 350
	'leftPadding': 20
	'rightPadding': 20
	'offset': 25

exports.getDefaultDimensions = (bounding)->
	output = extend.clone(defaultDimensions)
	output.leftPadding += bounding.x
	output.rightPadding += (import './popup').windowWidth - (bounding.x + bounding.width)
	return output


exports.getElDimensions = (el, leftPadding=0)->
	dimensions = extend.clone DOM(el).rect
	dimensions.x = dimensions.left - leftPadding
	dimensions.y = dimensions.top
	dimensions.centerLeft = dimensions.left + dimensions.width/2
	return dimensions