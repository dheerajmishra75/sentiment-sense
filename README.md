# Sentiment Sense

FINAL ONE-SHOT BUILD — SENTIMENT ANALYSIS WEBSITE

Build the complete Sentiment Analysis website in this single task.

I have attached my original `Sentiment Analysis(1).ipynb`. Use it as the source of truth for the sentiment-analysis methodology.

IMPORTANT:

The `Reviews.csv` dataset is NOT the product.

Do not make the website depend on the dataset for user predictions.

The final website must allow ANY user to paste ANY NEW TEXT from anywhere and immediately analyze its sentiment.

==================================================

CORE PURPOSE

==================================================

Website name:

SENTIMENT ANALYSIS

Main purpose:

A user can paste any text, review, comment, message, feedback, social-media text, or other written content and get:

POSITIVE

NEUTRAL

or

NEGATIVE

with the actual model confidence/probabilities.

The text does NOT need to exist in the original dataset.

User flow:

PASTE ANY TEXT

→ ANALYZE SENTIMENT

→ REAL MODEL ANALYSIS

→ POSITIVE / NEUTRAL / NEGATIVE

→ CONFIDENCE

==================================================

ORIGINAL NOTEBOOK

==================================================

Use my attached notebook to preserve the actual sentiment-analysis approach.

The notebook uses:

- NLTK VADER SentimentIntensityAnalyzer

- VADER polarity scores

- CardiffNLP `cardiffnlp/twitter-roberta-base-sentiment`

- Hugging Face tokenizer/model

- RoBERTa sentiment probabilities

Keep this methodology.

Use RoBERTa as the primary sentiment result and VADER as supporting analysis.

Do NOT replace this with:

- keyword matching

- hard-coded sentiment

- random results

- mock predictions

- a completely unrelated model

==================================================

NEW USER TEXT

==================================================

This is the most important requirement.

The user can enter text that was NEVER present in the original dataset.

Examples:

"I absolutely loved this product."

"This movie was okay."

"The service was terrible."

"I am really excited about tomorrow."

"The experience was disappointing but the staff were helpful."

The system must analyze the actual submitted text using the trained/pretrained sentiment models.

Do NOT compare the text against the dataset.

Do NOT search the dataset for similar sentences.

Do NOT require `Reviews.csv` at runtime.

The dataset is only reference/training/evaluation material from the original project.

==================================================

REAL SENTIMENT OUTPUT

==================================================

The final result must be:

POSITIVE

NEUTRAL

or

NEGATIVE

Use the actual RoBERTa probabilities.

Show:

Overall Sentiment

Confidence

Positive %

Neutral %

Negative %

Also show VADER results as supporting information:

Positive

Neutral

Negative

Compound

Do not fabricate confidence.

==================================================

MAIN ANALYZER

==================================================

Create the main page:

/analyze

Large input area:

"Paste or type anything here..."

Primary button:

ANALYZE SENTIMENT

Also include:

- character counter

- clear button

- example text buttons

- loading state

- validation

- responsive design

Loading:

"Analyzing sentiment..."

After analysis, show the result clearly.

==================================================

USER-FRIENDLY HOMEPAGE

==================================================

The homepage should immediately explain the product.

Headline:

"Understand the sentiment behind any text."

Supporting text:

"Paste a review, comment, message, feedback, or any text and instantly analyze whether its sentiment is positive, neutral, or negative."

Primary CTA:

ANALYZE SENTIMENT

Add a few clickable example texts so users can understand the product immediately.

==================================================

DESIGN — VERY IMPORTANT

==================================================

Make the website look like a NORMAL PROFESSIONAL WEBSITE.

It must NOT look AI-generated.

Use a simple design similar in spirit to a clean professional information/product website.

Use:

- normal white/light background

- dark text

- subtle grey borders

- simple restrained accent colour

- clean typography

- normal buttons

- professional cards

- good spacing

- subtle hover effects

- minimal animations

The design should feel like a real website made by a developer/designer.

DO NOT use:

- neon colours

- glowing effects

- futuristic AI graphics

- robot illustrations

- excessive gradients

- excessive glassmorphism

- giant decorative AI elements

- overly animated backgrounds

Keep it simple, trustworthy and professional.

==================================================

PAGES

==================================================

Create:

Home

Analyze

How It Works

About

Navigation should be simple.

The Analyze page must be the main focus.

==================================================

HOW IT WORKS

==================================================

Explain simply:

USER TEXT

↓

VADER + RoBERTa

↓

SENTIMENT PROBABILITIES

↓

FINAL SENTIMENT

Explain that the system analyzes linguistic patterns and produces a sentiment classification.

Keep technical details understandable.

==================================================

RESULT EXPERIENCE

==================================================

Make the result visually clear.

Example:

SENTIMENT

POSITIVE

Confidence

94%

Positive 94%

Neutral 4%

Negative 2%

Supporting Analysis

VADER Compound: 0.89

[ ANALYZE ANOTHER TEXT ]

Use the actual values returned by the models.

==================================================

IMPORTANT ACCURACY RULE

==================================================

Do not promise 100% accuracy.

Do not manually force sentiment based on individual keywords.

The model should determine sentiment from the complete submitted text.

A completely new sentence must be processed normally.

==================================================

BACKEND

==================================================

If required, create a clean Python FastAPI inference backend using:

- Python

- FastAPI

- NLTK

- Transformers

- PyTorch

- Hugging Face CardiffNLP RoBERTa

Create:

POST /api/analyze

Request:

{

  "text": "user text"

}

Return the actual:

- sentiment

- confidence

- positive probability

- neutral probability

- negative probability

- VADER scores

The frontend must use the real API.

Do not use mock API responses.

==================================================

PRODUCTION

==================================================

The website must not depend on localhost in production.

Use:

VITE_API_URL

for the backend URL.

Handle backend errors gracefully.

Never show Python errors, stack traces, localhost URLs, model paths, or developer debugging information to normal users.

==================================================

HISTORY

==================================================

Add a simple Recent Analyses section using localStorage.

Store:

- text preview

- sentiment

- confidence

- timestamp

Allow the user to clear history.

No login required.

==================================================

RESPONSIVE

==================================================

The website must work properly on:

- mobile

- tablet

- laptop

- desktop

A user should be able to open the website on their phone, paste any text, and analyze it easily.

==================================================

FINAL TEST

==================================================

Before finishing, test the REAL visible Analyzer with:

- clearly positive text

- clearly negative text

- neutral text

- completely new text

- short text

- long text

- review

- casual message

Verify that the displayed sentiment and confidence come from the actual model outputs.

==================================================

ABSOLUTE REQUIREMENTS

==================================================

Do NOT ask me to upload `Reviews.csv`.

Do NOT make users provide the dataset.

Do NOT compare user text with the dataset.

Do NOT use mock results.

Do NOT use hard-coded sentiment.

Do NOT use keyword-only sentiment detection.

Do NOT replace the original notebook methodology with an unrelated approach.

Do NOT create a separate demo-only analyzer.

The user must be able to paste ANY NEW TEXT and get the real model's sentiment analysis.

Do not ask me for another prompt.

Do not give me a TODO list.

Do not stop after creating only the frontend.

Build, connect, test and finish the complete Sentiment Analysis website in this one task.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6f8df3ac-1e3e-4e4c-a2d2-390cd59bd8f9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
