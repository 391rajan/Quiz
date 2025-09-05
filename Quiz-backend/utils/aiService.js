// File: backend/utils/aiService.js
const fetch = require('node-fetch');

const generateQuizQuestions = async (topic, difficulty, numQuestions) => {
  console.log('--- generateQuizQuestions function called ---');
  console.log(`Topic: ${topic}, Difficulty: ${difficulty}, NumQuestions: ${numQuestions}`);
  // The prompt remains largely the same, but we'll add a direct instruction for JSON output
  // as OpenRouter's JSON mode is slightly different from Gemini's native JSON mode.
  const prompt = `Generate ${numQuestions} multiple-choice quiz questions about "${topic}" with a difficulty level of "${difficulty}".
  
  For each question, you MUST provide:
  1. The question text.
  2. Exactly 4 distinct options (labeled A, B, C, D).
  3. The single correct answer (e.g., "A").
  4. A comprehensive and detailed explanation (at least 2-3 sentences) for *why* the chosen correct option is right, and briefly explaining why the other options are incorrect or less suitable.

  Format the output strictly as a JSON array of objects. Each object must have these keys: 'questionText' (string), 'options' (array of 4 strings), 'correctAnswer' (string, e.g., "A"), and 'explanation' (string).`;

  // Switched to OpenRouter's OpenAI-compatible payload structure
  const payload = {
    model: "deepseek/deepseek-chat-v3.1:free", // Specify the model on OpenRouter
    messages: [
      { role: "user", content: prompt }
    ],
    response_format: { "type": "json_object" } // Request JSON output
  };

  const apiKey = process.env.OPENROUTER_API_KEY; // Use OpenRouter API key
  const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`, // Use Bearer token for auth
        'HTTP-Referer': 'http://localhost:3000', // Recommended by OpenRouter
        'X-Title': 'Quiz App' // Recommended by OpenRouter
      },
      body: JSON.stringify(payload)
    });
    const result = await response.json();

    // Handle potential errors from OpenRouter
    if (result.error) {
      console.error('Error calling OpenRouter API:', result.error.message);
      return null;
    }

    if (!result.choices || result.choices.length === 0) {
      console.error('Error calling OpenRouter API: Invalid response', JSON.stringify(result, null, 2));
      return null;
    }

    // Adapt to OpenRouter's response structure
    let jsonString = result.choices[0].message.content;

    // The model sometimes wraps the JSON in markdown, so we need to extract the raw JSON string.
    const startIndex = jsonString.indexOf('[');
    const endIndex = jsonString.lastIndexOf(']');

    if (startIndex !== -1 && endIndex !== -1) {
      jsonString = jsonString.substring(startIndex, endIndex + 1);
    }

    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    return null;
  }
};

module.exports = { generateQuizQuestions };
