import sys
import requests

len(sys.argv)
str(sys.argv)

if len(sys.argv) <= 1: sys.exit(1)

if sys.argv[1] == "-h":
    print "Default Usage: python update.python filePath"
    sys.exit(0)

filePath = sys.argv[1]
f = open(filePath, 'rb')
fileContent = f.read()
f.close()

HOST = "localhost"
PORT = "3002"
ENDPOINT = "/api/upload"

url = 'http://' + HOST + ":" + PORT + ENDPOINT
files = { 'traceFile': open(filePath, 'rb') }

r = requests.post(url, files=files)
r.text
