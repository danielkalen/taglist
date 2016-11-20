if exports?.module?
	module.exports = TagList
else if typeof define is 'function' and define.amd
	define ['TagList'], ()-> TagList
else
	window.TagList = TagList