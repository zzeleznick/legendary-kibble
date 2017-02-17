#!/usr/bin/env osascript -l JavaScript

// ObjC.import('Foundation')
// var env = $.NSProcessInfo.processInfo.environment // -[[NSProcessInfo processInfo] environment]
// env = ObjC.unwrap(env)
// for (var k in env) {
//     console.log('"' + k + '": ' + ObjC.unwrap(env[k]))
// }

ObjC.import('Foundation')

var args = $.NSProcessInfo.processInfo.arguments

// Build the normal argv/argc
var argv = []
var argc = args.count // -[NSArray count]

for (var i = 0; i < argc; i++) {
    argv.push( ObjC.unwrap( args.objectAtIndex(i) ) ) // -[NSArray objectAtIndex:]
}
console.log(argv)