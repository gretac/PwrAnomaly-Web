import sys
import httplib
import mimetypes

HOST = "localhost"
PORT = "3002"
ENDPOINT = "/api/upload"

def post_multipart(host, port, endpoint, files):
    content_type, body = encode_multipart_formdata(files)

    h = httplib.HTTP(host, port)
    h.putrequest('POST', endpoint)
    h.putheader('content-type', content_type)
    h.putheader('content-length', str(len(body)))
    h.endheaders()
    h.send(body)
    errcode, errmsg, headers = h.getreply()
    return h.file.read()

def encode_multipart_formdata(files):
    LIMIT = '----------lImIt_of_THE_fIle_eW_$'
    CRLF = '\r\n'
    L = []
    # for (key, value) in fields:
    #     L.append('--' + LIMIT)
    #     L.append('Content-Disposition: form-data; name="%s"' % key)
    #     L.append('')
    #     L.append(value)
    for (key, filename, value) in files:
        L.append('--' + LIMIT)
        L.append('Content-Disposition: form-data; name="%s"; filename="%s"' % (key, filename))
        L.append('Content-Type: %s' % get_content_type(filename))
        L.append('')
        L.append(value)
    L.append('--' + LIMIT + '--')
    L.append('')
    body = CRLF.join(L)
    content_type = 'multipart/form-data; boundary=%s' % LIMIT
    return content_type, body

def get_content_type(filename):
    return mimetypes.guess_type(filename)[0] or 'application/octet-stream'

if len(sys.argv) <= 1: sys.exit(1)

if sys.argv[1] == "-h":
    print "Default Usage: python update.python filePath"
    sys.exit(0)

filePath = sys.argv[1]
f = open(filePath, 'rb')
fileContent = f.read()
f.close()

files = [("traceFile", filePath, fileContent)]
post_multipart(HOST, PORT, ENDPOINT, files)
