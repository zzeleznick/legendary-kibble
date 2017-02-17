-- Opens Hipchat
tell application "Google Chrome"
    activate
    set dest to "https://snapchat.hipchat.com/chat/"
    set found to false
    repeat with w in (windows)
        repeat with t in (tabs of w)-- first window)
            set my_url to URL of t        
            if (my_url starts with dest) is true then
                execute front window's active tab javascript "alert('hipchat found')"
                set found to true
            end if
        end repeat
    end repeat
    if found
        execute front window's active tab javascript "alert('js found');
;var user = document.querySelector('.hc-priv-chat > div > h3')
;console.log(`User is ${user.innerText}`)"
    else
        execute front window's active tab javascript "alert('not found')"
       --  execute open tab with URL "https://snapchat.hipchat.com/chat/"
        set myTab to make new tab at end of tabs of first window
        set URL of myTab to dest
    end if
end tell
