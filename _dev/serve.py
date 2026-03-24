#!/usr/bin/env python3
import http.server
import socketserver
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", 8080), Handler) as httpd:
    print("Serving at http://localhost:8080")
    httpd.serve_forever()
