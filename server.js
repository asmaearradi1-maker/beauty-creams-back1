const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors()); // nécessaire si front hébergé ailleurs
app.use(express.json());

// Données simulées (peut être remplacé par DB plus tard)
const data = [
  {
    id: "creme-hydratante",
    titre: "Crème Hydratante",
    produits: [
      "Active Derm – Elastine Bost",
      "Micro Hydra"
    ]
  },
  {
    id: "serum-argan",
    titre: "Sérum Argan",
    produits: [
      "Argan Sérum",
      "Eclat Argan"
    ]
  },
  {
    id: "masque-naturel",
    titre: "Masque Naturel",
    produits: [
      "Masque Eclat",
      "Masque miel vitA"
    ]
  }
];

// Route health check (important pour Azure)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "API NaturaGlow running",
    version: "1.0.0"
  });
});

// 🔹 Liste des rubriques
app.get("/api/rubriques", (req, res) => {
  res.json(data.map(r => ({
    id: r.id,
    titre: r.titre
  })));
});

// 🔹 Détail d'une rubrique
app.get("/api/rubriques/:id", (req, res) => {
  const rubrique = data.find(r => r.id === req.params.id);

  if (!rubrique) {
    return res.status(404).json({
      message: "Rubrique non trouvée"
    });
  }

  res.json(rubrique);
});

// 🔹 404 global
app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint non trouvé"
  });
});

// Lancement serveur
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
