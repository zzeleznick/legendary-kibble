var system = Application('System Events')
var app = Application("Chrome")
var Tab = app.Tab

const getCurrentUser = function(tab) {
	var inner = () => { 
		var user = document.querySelector('.hc-priv-chat > div > h3'); 
		return user.innerText;
	}
	var snippet =`eval(${inner.toString()})()`
	var result = app.execute(tab,  {javascript: snippet})
	console.log(`Current Active User: ${result}`)
};

const getUnreadCount = (tab) => {
	var inner = () => {
		const badges = Array.prototype.slice.call(document.querySelectorAll('.hc-mention')) || []
		const counts = badges.map ( (el) => parseInt(el.innerText))
		console.log(`Unread Chats: ${badges.length}`)
		//  e = new CustomEvent("test")
		//  dispatchEvent(e)
		const senders = badges.map( (el) => {
			// console.log(el.parentNode); 
			return el.parentNode.getAttribute("aria-label")
		})
		var zip = (a, b) => {
			return a.map( (e, i) => [e, b[i]] )
		}
		zip(senders, counts).map( (arr) => {
			const [sender, count] = arr;
			console.log(`${sender}: ${count}`)
		})
		return {unread: badges.length, senders: senders, counts: counts}
	};
	var snippet =`eval(${inner.toString()})()`
	var result = app.execute(tab,  {javascript: snippet})
	// var result = tab.execute({javascript: script});
	var zip = (a, b) => {
			return a.map( (e, i) => [e, b[i]] )
		}
	var {unread, senders, counts} = result;
	console.log(`\nUnread Chats: ${unread}`)
	zip(senders, counts).map( (arr) => {
		const [sender, count] = arr;
		console.log(`${sender}: ${count}`)
	})
	// console.log(result);
}

app.activate()
var windows = app.windows()
console.log(`Found ${windows.length} open windows`)
//  addEventListener("test", () => console.log("event received"))

var tabs = [].concat.apply( [], windows.map((w) => w.tabs() ))
var urls = tabs.map ((t) => t.url())
var dest = "https://snapchat.hipchat.com/chat/"
var tab_idx = urls.findIndex( (el) => el.startsWith(dest))
var is_open = tab_idx !== -1
var message = is_open ? "Hipchat found" : "Will open Hipchat"
console.log(message, "\n")
if (is_open) {
	var tab = tabs[tab_idx]
	getCurrentUser(tab);
	getUnreadCount(tab);
} else {
	var newTab = app.Tab()
	newTab.url = dest
	app.windows[0].tabs.push(newTab)
}