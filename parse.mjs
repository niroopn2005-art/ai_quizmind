import fs from 'fs';
import path from 'path';

function parseQuestions(text) {
  const blocks = text.split(/(?=Q\d+\.)/);
  const questions = [];
  let currentSubject = "Biology";
  let currentTopic = "";

  for (const line of blocks[0].split('\n')) {
    if (line.match(/CLASS \d+ (BIOLOGY|CHEMISTRY|PHYSICS)/i)) {
      const match = line.match(/(BIOLOGY|CHEMISTRY|PHYSICS)/i);
      currentSubject = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
    }
    const chapterMatch = line.match(/Chapter \d+:\s*(.*)/i);
    if (chapterMatch) {
      currentTopic = chapterMatch[1].trim();
    }
  }

  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i].trim();
    const chapterMatch = block.match(/Chapter \d+:\s*(.*?)(?=\n|\|)/i);
    if (chapterMatch) {
      currentTopic = chapterMatch[1].trim();
    }

    try {
      const qMatch = block.match(/Q\d+\.\s*(.*?)(?:\s*\[NEET\s*(\d{4})\])?(?:\n|$)/);
      if (!qMatch) continue;

      const questionText = qMatch[1].trim();
      const neetYear = qMatch[2] ? qMatch[2].trim() : null;

      const optAMatch = block.match(/\(A\)\s*(.+)/);
      const optBMatch = block.match(/\(B\)\s*(.+)/);
      const optCMatch = block.match(/\(C\)\s*(.+)/);
      const optDMatch = block.match(/\(D\)\s*(.+)/);

      if (!optAMatch || !optBMatch || !optCMatch || !optDMatch) {
        continue;
      }

      const options = [
        optAMatch[1].trim(),
        optBMatch[1].trim(),
        optCMatch[1].trim(),
        optDMatch[1].trim()
      ];

      const answerMatch = block.match(/[✓✅]\s*Answer:\s*\([A-D]\)\s*(.+)/);
      let answer = options[0];
      if (answerMatch) {
        answer = answerMatch[1].trim();
      } else {
        const altAnswerMatch = block.match(/Answer:\s*\([A-D]\)\s*(.+)/);
        if (altAnswerMatch) answer = altAnswerMatch[1].trim();
      }

      const expMatch = block.match(/(?:🌿|💡)?\s*Simple Explanation:\s*([\s\S]*)/);
      let explanation = "Correct answer.";
      if (expMatch) {
        explanation = expMatch[1]
          .replace(/[🌿💡]/g, '')
          .replace(/CLASS 10.*Solutions/ig, '')
          .replace(/©.*Page/ig, '')
          .replace(/\n\s*\n/g, ' ')
          .replace(/\r/g, '')
          .replace(/\n/g, ' ')
          .trim();
      }

      questions.push({
        id: "",
        subject: currentSubject,
        topic: currentTopic || "General Topic",
        question: questionText,
        options,
        answer,
        explanation,
        difficulty: neetYear ? "hard" : "medium",
        neetYear: neetYear || undefined
      });
    } catch (err) {
      // ignore
    }
  }
  return questions;
}

function run() {
  const inputPath = path.resolve('raw_questions.txt');
  if (!fs.existsSync(inputPath)) {
    console.error("raw_questions.txt not found! Please create it and paste all your 300+ questions inside.");
    process.exit(1);
  }

  const text = fs.readFileSync(inputPath, 'utf8');
  console.log("Parsing your questions from raw text now...");
  const allQuestions = parseQuestions(text);
  const subjects = {};

  allQuestions.forEach(q => {
    if (!subjects[q.subject]) subjects[q.subject] = [];
    subjects[q.subject].push(q);
  });

  Object.keys(subjects).forEach(sub => {
    subjects[sub].forEach((q, idx) => { q.id = idx + 1; });

    const outDir = path.resolve('src', 'data');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const outPath = path.join(outDir, sub.toLowerCase() + '.json');
    fs.writeFileSync(outPath, JSON.stringify(subjects[sub], null, 2));
    console.log("Successfully saved " + subjects[sub].length + " " + sub + " questions to " + outPath);
  });
}

run();
