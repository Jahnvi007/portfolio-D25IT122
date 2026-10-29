const express = require('express');
const authenticate = require('../middleware/auth');

const router = express.Router();

// One request per user per 60 seconds.
const RATE_LIMIT_MS = 60 * 1000;
const lastRequestByUser = new Map();

const FALLBACK_MESSAGE =
  'AI generation is temporarily unavailable. You can write or edit the description manually.';

function createFallbackDescription(title) {
  return `Complete the task "${title}" by identifying the required steps, carrying out the work, and reviewing the result.`;
}

router.post('/generate-description', authenticate, async (req, res) => {
  const { title } = req.body || {};

  // Validate the task title.
  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      error: 'A task title is required.'
    });
  }

  if (title.trim().length > 150) {
    return res.status(400).json({
      error: 'The task title must be 150 characters or fewer.'
    });
  }

  // Identify the authenticated user.
  const userId =
  req.user.id ||
  req.user.userId ||
  req.user._id ||
  req.user.email ||
  req.ip;

const rateLimitKey = `${String(userId)}:${title.trim().toLowerCase()}`;

const now = Date.now();
const lastRequest = lastRequestByUser.get(rateLimitKey);

  if (lastRequest && now - lastRequest < RATE_LIMIT_MS) {
    const retryAfter = Math.ceil(
      (RATE_LIMIT_MS - (now - lastRequest)) / 1000
    );

    res.set('Retry-After', String(retryAfter));

    return res.status(429).json({
      error: 'Please wait before generating another description.',
      retryAfter
    });
  }

  // Record the request before contacting the AI service.
 lastRequestByUser.set(rateLimitKey, now);

  // Keep the in-memory rate-limit map reasonably small.
  if (lastRequestByUser.size > 1000) {
    for (const [key, timestamp] of lastRequestByUser) {
      if (now - timestamp >= RATE_LIMIT_MS) {
        lastRequestByUser.delete(key);
      }
    }
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(200).json({
      description: createFallbackDescription(title.trim()),
      fallback: true,
      message: FALLBACK_MESSAGE
    });
  }

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text:
                    'Write a concise, practical task description in 2 to 4 sentences. ' +
                    'Describe the work and expected outcome. Do not invent personal details. ' +
                    'Return only the description, without headings or quotation marks. ' +
                    'Task title: ' +
                    title.trim()
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 160
          }
        }),
        signal: AbortSignal.timeout(15000)
      }
    );

    if (!response.ok) {
      // Do not send provider error details or credentials to the client.
      console.error('Gemini API request failed with status:', response.status);

      return res.status(200).json({
        description: createFallbackDescription(title.trim()),
        fallback: true,
        message: FALLBACK_MESSAGE
      });
    }

    const data = await response.json();

    const description = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim();

    if (!description) {
      return res.status(200).json({
        description: createFallbackDescription(title.trim()),
        fallback: true,
        message: FALLBACK_MESSAGE
      });
    }

    return res.status(200).json({
      description,
      fallback: false,
      message: 'AI-generated content. Review and edit it before saving.'
    });
  } catch (error) {
    // Handles network failures and timeouts without crashing the server.
    console.error(
      'Gemini request failed:',
      error.name === 'TimeoutError' ? 'Request timed out' : 'Network or response error'
    );

    return res.status(200).json({
      description: createFallbackDescription(title.trim()),
      fallback: true,
      message: FALLBACK_MESSAGE
    });
  }
});

module.exports = router;