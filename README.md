# Sentiment Sense — Sentiment Analysis

Sentiment Sense is an interactive sentiment analysis application that analyzes text and classifies it as **Positive, Neutral, or Negative** using a pretrained **CardiffNLP RoBERTa sentiment model**, with **VADER** providing additional sentiment analysis.

The project takes sentiment analysis beyond a notebook by providing an interactive web interface where users can enter completely new text and receive model-based sentiment predictions, confidence scores, probability distribution, and supporting VADER scores.

## Live Demo

🌐 **Live Website:**  
https://sentiment-sense-ten.vercel.app/

💻 **GitHub Repository:**  
https://github.com/dheerajmishra75/sentiment-sense

## Overview

Sentiment Sense combines two different sentiment analysis approaches:

- **RoBERTa** — Primary sentiment classification model
- **VADER** — Supporting rule-based sentiment analysis

The application accepts arbitrary user text and processes it directly through the sentiment models. The runtime application does not require the Amazon Reviews dataset for making predictions.

## Features

- Analyze completely new text
- Positive, Neutral, and Negative classification
- RoBERTa-based sentiment prediction
- Confidence score for the predicted sentiment
- Full probability distribution
- VADER sentiment scores for supporting analysis
- Example text inputs
- Recent analysis history
- Clear history functionality
- Loading and validation states
- Responsive user interface
- Browser-based model inference

## Sentiment Analysis Pipeline

```text
User Input
    ↓
Text Tokenization
    ↓
CardiffNLP RoBERTa Model
    ↓
Negative / Neutral / Positive Probabilities
    ↓
Predicted Sentiment + Confidence

        +

User Input
    ↓
VADER Sentiment Analyzer
    ↓
Positive / Neutral / Negative / Compound Scores
    ↓
Supporting Sentiment Analysis
Models Used
CardiffNLP RoBERTa

The primary sentiment classifier uses:

cardiffnlp/twitter-roberta-base-sentiment

The model produces probabilities for:

Negative
Neutral
Positive

The highest probability is used as the primary predicted sentiment.

VADER

VADER is used as a supporting sentiment analyzer through:

SentimentIntensityAnalyzer()

It provides:

Positive score
Neutral score
Negative score
Compound score

Using both approaches provides additional context around the sentiment prediction instead of relying on a single sentiment signal.

How It Works
1. Enter Text

The user enters any text they want to analyze.

Example:

I really enjoyed this product. The quality is excellent.
2. Tokenization

The input text is processed using the tokenizer associated with the CardiffNLP RoBERTa model.

3. RoBERTa Prediction

The tokenized input is passed to the pretrained RoBERTa sentiment model.

The model returns probabilities for the three sentiment classes.

4. Sentiment Classification

The highest probability determines the primary sentiment:

Negative
Neutral
Positive
5. Supporting VADER Analysis

The same text is also analyzed using VADER to provide additional sentiment scores.

6. Result

The application displays:

Predicted sentiment
Confidence
Positive probability
Neutral probability
Negative probability
VADER sentiment scores
Application Pages
Home

Introduces Sentiment Sense and the purpose of the application.

Analyze

The main sentiment analysis interface where users can:

Enter text
Use example inputs
Run sentiment analysis
View prediction results
View probability distribution
View VADER scores
Access recent analysis history
How It Works

Explains the sentiment analysis workflow, models, and prediction process.

About

Provides information about the project and the technologies used.

Dataset

The project notebook references the Amazon Reviews dataset (Reviews.csv) for sentiment-analysis experimentation and analysis.

The deployed application does not require the dataset to perform runtime predictions because sentiment inference is performed using the pretrained sentiment model.

Technology Stack
Category	Technology
Programming	Python, JavaScript
NLP	Natural Language Processing
Primary Model	CardiffNLP RoBERTa
Supporting Model	VADER
Transformers	Hugging Face Transformers
Model Inference	Browser-based
Storage	Local Storage
Frontend	React
Development	Vite
Example
Input
This movie was absolutely amazing. I loved every minute of it.
Output
Sentiment: Positive
Confidence: Model-generated probability

Positive: ...
Neutral: ...
Negative: ...

VADER:
Positive: ...
Neutral: ...
Negative: ...
Compound: ...

The exact probabilities depend on the model's inference for the provided text.

Project Objective

The goal of Sentiment Sense is to demonstrate how pretrained NLP models can be integrated into an interactive application for practical text analysis.

The project focuses on the complete workflow:

Text Input
    ↓
NLP Processing
    ↓
Transformer Model
    ↓
Probability Distribution
    ↓
Sentiment Classification
    ↓
Supporting VADER Analysis
    ↓
Interactive Result
Screenshots
Home

Analyze

How It Works

About

Getting Started

Clone the repository:

git clone https://github.com/dheerajmishra75/sentiment-sense.git

Navigate to the project:

cd sentiment-sense

Install dependencies:

npm install

Start the development server:

npm run dev

Open the local development URL provided by Vite in your browser.

Important Note

The CardiffNLP RoBERTa model is loaded for browser-based inference. The initial analysis may take longer while the required model resources are downloaded and initialized.

Subsequent analyses can run after the model has been loaded.

Limitations
Sentiment predictions are model-based estimates and should not be treated as absolute judgments.
Prediction quality depends on the language, context, and type of text provided.
The pretrained RoBERTa model is not retrained specifically for this project.
Initial browser-based model loading may take some time.
VADER provides complementary sentiment scores rather than replacing the primary transformer-based prediction.
Future Improvements
Add multilingual sentiment analysis
Support batch text analysis
Add CSV upload for large-scale sentiment analysis
Add sentiment visualization dashboards
Add downloadable analysis reports
Compare additional pretrained transformer models
Add domain-specific sentiment models
Author

Dheeraj Mishra

B.Tech CSE Student | Data Science & Machine Learning Enthusiast

GitHub:
https://github.com/dheerajmishra75

Disclaimer

Sentiment Sense provides machine-learning-based sentiment estimates for the text provided by the user. Predictions can vary depending on language, context, and model limitations and should not be treated as definitive interpretations of human emotion.
