import os
import argparse

SCRIPT = "show_unread.js"

os.system("osascript -l JavaScript {}".format(SCRIPT))

