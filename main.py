

from http.server import HTTPServer,BaseHTTPRequestHandler


HOST = "localhost"
PORT = 8080

class Serv(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/': 
            self.path = '/index.html' 
        try:

            #             self.send_header("content-type", "text/html")
#             self.send_header("content-type", "text/javascript")
#             self.send_header("content-type", "text/css")
            file_to_open = open(self.path[1:]).read() 
            self.send_response(200) 
        except:
            file_to_open = "File not found =("
            self.send_response(404) 
        self.end_headers()
        self.wfile.write(bytes(file_to_open, 'utf-8')) 



httpd = HTTPServer((HOST, PORT), Serv)
print("server running...")
httpd.serve_forever()
print("server Stopped")
