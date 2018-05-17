export default (value, formatter)-> switch
	when typeof formatter is 'undefined'
		return value
	
	when typeof formatter is 'function'
		return formatter(value)

	when Array.isArray(formatter)
		alias = formatter.find (candidate)-> candidate.value is value
		if alias
			return alias.label or alias.name
		else
			return value

	when typeof formatter is 'object' and formatter
		return formatter[value] or value