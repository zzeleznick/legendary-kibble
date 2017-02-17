import os
import argparse

SCRIPT = "test.js"

os.system("osascript -l JavaScript {}".format(SCRIPT))

