# empirasAcademy


Install tailwind : npm install tailwindcss @tailwindcss/postcss postcss

Install flowbite : npm install flowbite
## Local testing

To run a quick local HTTP server (needed for ES module imports), from the project root run one of the commands below.

- Python 3 (recommended):

```powershell
python -m http.server 8000
```

- Node (http-server):

```powershell
npm install -g http-server
http-server -p 8000
```

Testing `academics.html` with Firestore

- Open `http://localhost:8000/academics.html` in a browser after starting the local server.
- The page already contains your Firebase config; Firestore reads will run when served over HTTP/HTTPS.
- If nothing appears, open browser devtools console for errors and check Firestore rules/collections.

Optional real-time upgrade

- To show live updates, replace `getDocs(...)` with `onSnapshot(...)` from the Firestore SDK and update the DOM when snapshots change.

