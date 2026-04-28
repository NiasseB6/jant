export type Epreuve = {
  id: string;
  nom: string;
  emoji: string;
  lieu: string;
  date: string;
};

export const epreuves: Epreuve[] = [
  { id: "1", nom: "Athlétisme", emoji: "🏃", lieu: "Stade Iba Mar Diop", date: "1 Nov" },
  { id: "2", nom: "Basketball 3x3", emoji: "🏀", lieu: "Dakar Arena", date: "2 Nov" },
  { id: "3", nom: "Lutte Olympique", emoji: "🤼", lieu: "Arène Nationale", date: "3 Nov" },
  { id: "4", nom: "Natation", emoji: "🏊", lieu: "Piscine Olympique", date: "4 Nov" },
  { id: "5", nom: "Taekwondo", emoji: "🥋", lieu: "Dakar Arena", date: "5 Nov" },
  { id: "6", nom: "Cyclisme", emoji: "🚴", lieu: "Diamniadio", date: "6 Nov" },
  { id: "7", nom: "Football", emoji: "⚽", lieu: "Stade Léopold Senghor", date: "7 Nov" },
  { id: "8", nom: "Judo", emoji: "🥷", lieu: "Dakar Arena", date: "8 Nov" },
];
