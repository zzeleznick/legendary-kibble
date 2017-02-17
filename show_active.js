var system = Application('System Events')
var app = Application("Chrome")
ObjC.import('Cocoa');

const getActiveUsers = function(tab) {
	var inner = () => {
		var elements = Array.prototype.slice.call(document.querySelectorAll('.room-name'));
		var names = elements.filter( (el) => el.getAttribute('data-reactid').match("PersonItem") !== null)
							 .map( (el) => el.innerText);
		var statusElements = names.map( (name) => document.querySelector(`[aria-label*="${name}"]`))
		var parseUser = (el) => {
			var name = el.getAttribute("aria-label")
			var icon = el.querySelector('.hc-status-icon')
			var uid = icon.getAttribute("data-uid")
			var cstring = icon.classList.value
			// -1: ???
			//  0: OFFLINE
			//  1: ONLINE
			//  2: AWAY
			//  3: BUSY
			//  4: MOBILE
			var statuses = ["icon-unavailable", "icon-chat", "icon-away", "icon-busy", "icon-mobile"]
			var status = statuses.map ( (s) => cstring.match(s) !== null).findIndex((el) => el === true)
			return {uid: uid, name: name, status: status}
		}
		$('.date-block').bind("DOMNodeInserted",function(){
		    console.log("new message in current chat");
		})
		var users = statusElements.map ( (el) => parseUser(el) )
		return users;
	}
	var snippet =`eval(${inner.toString()})()`
	var results = app.execute(tab,  {javascript: snippet})
	var parseStatus = (idx) => {
		var values = {"-1": "???", "0": "OFFLINE", "1": "ONLINE", "2": "AWAY", "3": "BUSY", "4": "MOBILE"}
		return values[idx]
	}
	var text = []
	for (var i = 0; i < results.length; i++) {
		const {uid, name, status } = results[i];
		var statusText = parseStatus(status)
		var msg = `[${i}] ${name}: ${statusText}`
		text.push(msg)
		console.log(msg)
	}
	var str = $.NSString.alloc.initWithUTF8String(text.join("\n"));
	str.writeToFileAtomically('hipchat.txt', true);
};

var injectListener = () => {
  var inner = () => {
	  console.log("Going to inject new XMLHttpRequest")
	  var oldXHR, stateChangeHandler, prop;

	  oldXHR = window.XMLHttpRequest;

	  stateChangeHandler = function (evt) {
	    switch (this.readyState) {
	      case oldXHR.OPENED:
	        console.log('Request was made', this, evt);
	        break;
	      case oldXHR.DONE:
	        console.log('Request finished', this, evt);
	        break;
	    }
	  };

	  function newXHR() {
	  	console.log("New XHR created");
	    var xhr = new oldXHR();
	    xhr.addEventListener('readystatechange', stateChangeHandler);
	    return xhr;
	  }

	  // Copy original states and toString
	  for (prop in oldXHR)
	    newXHR[prop] = oldXHR[prop];

	  window.XMLHttpRequest = newXHR;
	}
	var snippet =`eval(${inner.toString()})()`
	app.execute(tab,  {javascript: snippet})
}

app.activate()
var windows = app.windows()
console.log(`Found ${windows.length} open windows`)
var tabs = [].concat.apply( [], windows.map((w) => w.tabs() ))
var urls = tabs.map ((t) => t.url())
var dest = "https://snapchat.hipchat.com/chat/"
var tab_idx = urls.findIndex( (el) => el.startsWith(dest))
var is_open = tab_idx !== -1
var message = is_open ? "Hipchat found" : "Will open Hipchat"
console.log(message, "\n")
if (is_open) {
	var tab = tabs[tab_idx]
	getActiveUsers(tab);
	injectListener(tab);
} else {
	var newTab = app.Tab()
	newTab.url = dest
	app.windows[0].tabs.push(newTab)
}