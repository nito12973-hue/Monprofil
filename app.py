from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).parent
HOST = "127.0.0.1"
PORT = 8000


class PortfolioHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main():
    server = ThreadingHTTPServer((HOST, PORT), PortfolioHandler)
    print(f"Portfolio de Mamadou Coulibaly: http://{HOST}:{PORT}")
    print("Appuyez sur Ctrl+C pour arreter le serveur.")
    server.serve_forever()


if __name__ == "__main__":
    main()
