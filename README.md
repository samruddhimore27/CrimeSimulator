# Interactive Crime Investigation Simulator 🔍

A fully playable detective game built for a hackathon in **84 hours**.

## 🎮 Gameplay

1. Select one of 3 crime cases
2. A 15–20 min timer starts
3. Explore evidence (photos, documents, timeline, suspects) in the Evidence Hub
4. Pin clues to the Investigation Board and draw connections
5. Analyse suspect profiles for alibi contradictions
6. Accuse the culprit before time runs out
7. See your verdict, grade (S→F), and score breakdown

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 (Vite) | UI Framework |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animations |
| Zustand | State Management |
| Lucide React | Icons |

## 📁 Project Structure

```
src/
├── App.jsx                   # Main router (phase-based)
├── main.jsx                  # Entry point
├── index.css                 # Global dark theme + animations
├── pages/
│   ├── HomePage.jsx          # Case selection
│   └── GamePage.jsx          # 3-panel game screen
├── components/
│   ├── CaseOverview.jsx      # Briefing modal
│   ├── EvidenceHub.jsx       # Tabbed evidence panel
│   ├── EvidenceBoardCanvas.jsx  # Drag-drop canvas with SVG connections
│   ├── SuspectPanel.jsx      # Suspect profiles + contradiction detection
│   ├── DecisionModal.jsx     # Accusation dialog
│   ├── ResultsScreen.jsx     # Verdict + score + grade
│   └── Shared/               # Button, Card, Timer, ProgressBar, Loading
├── store/
│   └── gameStore.js          # Zustand global state
├── data/
│   └── cases.js              # 3 crime cases with suspects + evidence
├── hooks/
│   ├── useTimer.js
│   ├── useGameLogic.js
│   └── useEvidenceConnections.js
└── utils/
    ├── scoring.js
    ├── validators.js
    └── helpers.js
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🧩 Cases

| Case | Difficulty | Time |
|------|-----------|------|
| The Midnight Poisoning | Beginner | 15 min |
| Silicon Valley Murder | Intermediate | 17.5 min |
| The Vanishing Artist | Hard | 20 min |

## 👥 Team

Built by a team of 5 for the hackathon.

## 📄 License

MIT
