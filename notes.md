# https://www.macstories.net/tutorials/getting-started-with-javascript-for-automation-on-yosemite/

> osascript -il JavaScript

# https://developer.apple.com/library/content/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html

# https://developer.apple.com/library/content/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/ReadandWriteFiles.html

# https://github.com/dtinth/JXA-Cookbook

[
  "https://www.hipchat.com/atlassian-connect/all.js"
].forEach(function(src) {
  var script = document.createElement('script');
  script.onload = () => {console.log('loaded')}
  script.src = src;
  script.async = false;
  document.head.appendChild(script);
});


window.HC.AppDispatcher.on("message-received", function(data) {console.log(data)})
window.HC.AppDispatcher.register({"message-received": function(data) {console.log(data)}})

# Works!
// window.HC.AppDispatcher._events
// window.HC.AppDispatcher.listenerCount("message-received")

// window.HC.ApplicationStore.data // .config
window.HC.AppDispatcher.register({"chat-is-scrolling": function() {console.log("scroll")}})

r = HC.ApplicationStore.data.activeRooms[HC.ApplicationStore.data.active_chat]
r = window.HC.api.getActiveChat()

$(document).bind("DOMNodeInserted", function(e){
    console.log("new dom node", e);
    window.last = e
    var badges = Array.prototype.slice.call(document.querySelectorAll('.hc-mention')) || []
    console.log("Badges", badges.length)
})
// examine target
$('.date-block').bind("DOMNodeInserted",function(){
            console.log("new message in current chat");
})

key: '_checkOrigin',
        value: function _checkOrigin(event, reg) {
          var no_source_types = ['init', 'event_query'];
          var isNoSourceType = reg && !reg.source && no_source_types.indexOf(event.data.type) > -1;
          var sourceTypeMatches = reg && event.source === reg.source;
          var hasExtensionUrl = reg && reg.extension.url.indexOf(event.origin) === 0;
          var isValidOrigin = hasExtensionUrl && (isNoSourceType || sourceTypeMatches);
          if (!isValidOrigin) {
            _util2.default.warn("Failed to validate origin: " + event.origin);
          }
          return isValidOrigin;
        }