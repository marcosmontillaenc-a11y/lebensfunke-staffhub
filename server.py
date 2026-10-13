#!/usr/bin/env python3
"""
Lebensfunke Heim Egerkingen — StaffHub Server
Serves static PWA files and provides a shared JSON state API (/api/state)
so damage reports and tasks synchronize in real-time across all devices anywhere.
"""

import http.server
import socketserver
import os
import json
import sys

PORT = int(os.environ.get("PORT", 8080))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(DIRECTORY, "database.json")

class StaffHubHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Allow cross-origin requests & disable caching for live assets
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        if self.path.endswith((".html", ".js", ".css", ".json")):
            self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_GET(self):
        if self.path == "/api/state":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            if os.path.exists(DB_FILE):
                try:
                    with open(DB_FILE, "r", encoding="utf-8") as f:
                        data = f.read()
                    self.wfile.write(data.encode("utf-8"))
                    return
                except Exception as e:
                    print(f"Error reading DB: {e}")
            self.wfile.write(json.dumps({"empty": True}).encode("utf-8"))
            return

        super().do_GET()

    def do_POST(self):
        if self.path == "/api/state":
            try:
                length = int(self.headers.get("Content-Length", 0))
                body = self.rfile.read(length).decode("utf-8")
                payload = json.loads(body)

                temp_file = DB_FILE + ".tmp"
                with open(temp_file, "w", encoding="utf-8") as f:
                    json.dump(payload, f, ensure_ascii=False, indent=2)
                
                # Replace atomically
                if os.path.exists(DB_FILE):
                    os.replace(temp_file, DB_FILE)
                else:
                    os.rename(temp_file, DB_FILE)

                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"ok": True}).encode("utf-8"))
                print(">> State synchronized successfully to database.json")
                return
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
                return

        self.send_response(404)
        self.end_headers()

def run():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("0.0.0.0", PORT), StaffHubHandler) as httpd:
        print(f"=======================================================")
        print(f" Lebensfunke StaffHub Server running on port {PORT}")
        print(f" Local URL:   http://localhost:{PORT}")
        print(f" Shared API:  http://localhost:{PORT}/api/state")
        print(f"=======================================================")
        sys.stdout.flush()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")

if __name__ == "__main__":
    run()
