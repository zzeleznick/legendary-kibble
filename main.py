import os

SOURCE = "test.applescript"
DEST = "out.applescript"
SCRIPT = "main.js"

with open(SCRIPT) as data_file:
	content = data_file.readlines()
	text = ";".join(content)

with open(SOURCE) as infile:
	source_text = infile.read()
	dest_text = source_text.replace("alert('found')", text)

with open(DEST, "w") as outfile:
	outfile.write(dest_text)

print(dest_text)

os.system("osascript {}".format(DEST))

