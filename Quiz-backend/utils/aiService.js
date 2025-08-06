// File: backend/utils/aiService.js

const fetch = require('node-fetch');

const generateQuizQuestions = async (topic, difficulty, numQuestions) => {
  const prompt = `Generate ${numQuestions} multiple-choice quiz questions about "${topic}" with a difficulty level of "${difficulty}". For each question, you MUST provide:
  1. The question text.
  2. Exactly 4 distinct options (labeled A, B, C, D).
  3. The single correct answer (e.g., "A").
  4. A comprehensive and detailed explanation (at least 2-3 sentences) for *why* the chosen correct option is right, and briefly explaining why the other options are incorrect or less suitable.

  Ensure the questions are clear, the options are distinct, and the explanation is informative. Format the output strictly as a JSON array of objects. Each object must have 'questionText' (string), 'options' (array of 4 strings), 'correctAnswer' (string, e.g., "A"), and 'explanation' (string).`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            "questionText": { "type": "STRING" },
            "options": {
              "type": "ARRAY",
              "items": { "type": "STRING" }
            },
            "correctAnswer": { "type": "STRING" },
            "explanation": { "type": "STRING" }
          },
          "propertyOrdering": ["questionText", "options", "correctAnswer", "explanation"]
        }
      }
    }
  };

  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    const jsonString = result.candidates[0].content.parts[0].text;
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return null;
  }
};

module.exports = { generateQuizQuestions };