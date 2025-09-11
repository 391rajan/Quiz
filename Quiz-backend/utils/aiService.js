// File: backend/utils/aiService.js
const fetch = require('node-fetch');

// Custom error for AI service failures
class AIError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.name = 'AIError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

const generateQuizQuestions = async (topic, difficulty, numQuestions) => {
  console.log('--- generateQuizQuestions function called ---');
  console.log(`Topic: ${topic}, Difficulty: ${difficulty}, NumQuestions: ${numQuestions}`);

  const prompt = `Generate ${numQuestions} multiple-choice quiz questions about "${topic}" with a difficulty level of "${difficulty}".
  
  For each question, you MUST provide:
  1. The question text.
  2. Exactly 4 distinct options (labeled A, B, C, D).
  3. The single correct answer (e.g., "A").
  4. A comprehensive and detailed explanation (at least 2-3 sentences) for *why* the chosen correct option is right, and briefly explaining why the other options are incorrect or less suitable.

  Format the output strictly as a JSON array of objects. Each object must have these keys: 'questionText' (string), 'options' (array of 4 strings), 'correctAnswer' (string, e.g., "A"), and 'explanation' (string).`;

  const payload = {
    model: "deepseek/deepseek-chat-v3.1:free",
    messages: [{ role: "user", content: prompt }],
    response_format: { "type": "json_object" }
  };

  const apiKey = process.env.OPENROUTER_API_KEY;
  const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

  if (!apiKey) {
    throw new AIError('OpenRouter API key is not configured.', 500);
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'http://localhost:3000', // Recommended by OpenRouter
        'X-Title': 'Quiz App' // Recommended by OpenRouter
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('OpenRouter API request failed:', response.status, errorBody);
      throw new AIError(`Failed to fetch from AI service. Status: ${response.status}`, response.status, errorBody);
    }

    const result = await response.json();

    if (result.error) {
      console.error('Error from OpenRouter API:', result.error.message);
      throw new AIError('AI service returned an error.', 500, result.error);
    }

    if (!result.choices || result.choices.length === 0 || !result.choices[0].message.content) {
      console.error('Invalid response structure from OpenRouter API:', JSON.stringify(result, null, 2));
      throw new AIError('Invalid response structure from AI service.', 500, result);
    }

    let jsonString = result.choices[0].message.content;

    // The model sometimes wraps the JSON in markdown, so we need to extract the raw JSON string.
    if (jsonString.startsWith('```json')) {
        jsonString = jsonString.substring(7, jsonString.length - 3).trim();
    }
    
    const startIndex = jsonString.indexOf('[');
    const endIndex = jsonString.lastIndexOf(']');

    if (startIndex === -1 || endIndex === -1) {
        console.error('Could not find JSON array in the AI response:', jsonString);
        throw new AIError('Could not parse quiz data from AI response: No JSON array found.');
    }
    
    jsonString = jsonString.substring(startIndex, endIndex + 1);

    try {
      return JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Failed to parse JSON from AI response:', parseError, jsonString);
      throw new AIError('Could not parse quiz data from AI response.', 500, parseError.message);
    }

  } catch (error) {
    if (error instanceof AIError) {
      throw error; // Re-throw custom errors
    }
    console.error('Error calling OpenRouter API:', error);
    throw new AIError('An unexpected error occurred while communicating with the AI service.', 500, error.message);
  }
};

module.exports = { generateQuizQuestions, AIError };