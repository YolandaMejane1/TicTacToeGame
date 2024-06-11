const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const scoresFile = './scores.json';

const readScores = () => {
  if (!fs.existsSync(scoresFile)) {
    return [];
  }
  const data = fs.readFileSync(scoresFile);
  return JSON.parse(data);
};

const writeScores = (scores) => {
  fs.writeFileSync(scoresFile, JSON.stringify(scores, null, 2));
};

app.get('/scores', (req, res) => {
  const scores = readScores();
  res.json(scores);
});

app.post('/scores', (req, res) => {
  const newScore = req.body;
  const scores = readScores();
  scores.push(newScore);
  writeScores(scores);
  res.status(201).json(newScore);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
