request = require 'request'

request
	.post
		url: "https://saucelabs.com/rest/v1/quickdom/js-tests",
		json:
			name: "QuickDom Test Suite"
			build: require('../package.json').version
			framework: "mocha"
			url: "http://localhost:9202/test/testrunner.html?purgeCache=#{Math.random()*100000000}"
			platforms: [
				["OS X 10.12", "chrome", "57"]
				["OS X 10.12", "chrome", "50"] # key platform
				["OS X 10.12", "chrome", "40"]
				["OS X 10.12", "chrome", "31"]
				["OS X 10.12", "firefox", "52"]
				["OS X 10.12", "firefox", "40"] # key platform
				["OS X 10.12", "firefox", "33"]
				["OS X 10.12", "firefox", "23"]
				["OS X 10.12", "safari", "10"]
				["OS X 10.11", "safari", "9"]
				["OS X 10.10", "safari", "8"] # key platform
				["OS X 10.9", "safari", "7"]
				["OS X 10.8", "safari", "6"]
				["Windows 10", "microsoftedge", "14"] # key platform
				["Windows 10", "microsoftedge", "13"]
				["Windows 7", "internet explorer", "11"]
				["Windows 7", "internet explorer", "10"] # key platform
				["Windows 7", "internet explorer", "9"]
				["iOS", "iphone", "10.2"]
				["iOS", "iphone", "10"]
				["iOS", "iphone", "9.3"]
				["iOS", "iphone", "9.0"]
				["iOS", "iphone", "8.1"]
				["Linux", "android", "6.0"]
				["Linux", "android", "5.1"]
				["Linux", "android", "4.4"]
			]
	
	.auth "quickdom", "0c7a6cc2-ed14-4f08-b48d-e46c74905b6a"
