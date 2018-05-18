export default (tag)->
	updater = (newValue)->
		updater.tag._updateFromField(newValue)

	updater.tag = tag
	return updater