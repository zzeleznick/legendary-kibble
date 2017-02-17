var system = Application('System Events')
var app = Application("Chrome")

const sendMessage = function(tab) {
	var inner = (message) => () => {
		console.log(`Going to send message: ${message}`);
		var TOKEN = "G1yW9dji3VYP85fJosl5r8zoPsHNb8aF1TBYJgMh"
		var USER = "4764446"
		var http = new XMLHttpRequest();
		var url = `https://api.hipchat.com/v2/user/${USER}/message?auth_token=${TOKEN}`
		var params = {"message": message, "message_format": "text"}
		http.open("POST", url, true);
		//Send the proper header information along with the request
		http.setRequestHeader("Content-type", "application/json");
		// http.setRequestHeader("Authorization", `Bearer ${TOKEN}`);
		http.onreadystatechange = function() { //Call a function when the state changes.
		    console.log("State changed", http.readyState, http.status);
		    // No Response expected; thus no responseText
		    if(http.readyState == 4 && http.status == 204) {
		        console.log("Completed");
		        return "Success"
		    }
		}
		console.log(`Sending message`);
		http.send(JSON.stringify(params));
	}
	var message = "testing 3"
	console.log(`Going to send message: ${message}`);
	var snippet =`eval(${inner.toString()})("${message}")()`
	var result = app.execute(tab,  {javascript: snippet})
	console.log(`Received result: ${result}`);
};

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
	sendMessage(tab);
} else {
	var newTab = app.Tab()
	newTab.url = dest
	app.windows[0].tabs.push(newTab)
}