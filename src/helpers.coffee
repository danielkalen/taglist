export toArray = (object)->
	if Array.isArray(object)
		return object
	else
		{name,value} for name,value of object

