import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://fastapi-backend-pg6y.onrender.com/analyze";

const questions = [
  { "question": "1/34 - What is the type of your study?", "options": ["Experimental", "Observational", "Not applicable / Unsure"] },
  { "question": "2/34 - What is your research design?", "options": ["Between-subjects", "Within-subjects (Repeated measures)", "Mixed design", "Not applicable / Unsure"] },
  { "question": "3/34 - Is your data collection longitudinal or cross-sectional?", "options": ["Longitudinal", "Cross-sectional", "Not applicable / Unsure"] },
  { "question": "4/34 - How did you sample your participants?", "options": ["Random sampling", "Stratified sampling", "Convenience sampling", "Other / Unsure"] },
  { "question": "5/34 - What is your approximate sample size?", "options": ["Small (<30)", "Medium (30–100)", "Large (>100)"] },
  { "question": "6/34 - Are observations independent, or are they nested/clustered/repeated within subjects?", "options": ["Independent observations", "Nested or clustered", "Repeated measures", "Not applicable / Unsure"] },
  { "question": "7/34 - What types of dependent variables do you have?", "options": ["Continuous", "Categorical nominal", "Categorical ordinal", "Binary", "Count data (Poisson)", "Textual data"] },
  { "question": "8/34 - What types of independent variables do you have?", "options": ["Continuous", "Categorical", "Binary"] },
  { "question": "9/34 - Are your groups balanced or unbalanced in size?", "options": ["Balanced", "Unbalanced", "Not applicable"] },
  { "question": "10/34 - Do you have missing data?", "options": ["Minimal (<5%)", "Moderate (5–15%)", "High (>15%)"] },
  { "question": "11/34 - How do you plan to handle missing data?", "options": ["Ignore", "Impute (Mean/Median)", "Use Model-Based Imputation", "Unsure"] },
  { "question": "12/34 - Is your data approximately normally distributed?", "options": ["Approximately normal", "Mildly skewed", "Severely skewed", "Unknown"] },
  { "question": "13/34 - Do your variables meet the assumption of homogeneity of variances?", "options": ["Yes", "No", "Unknown", "Not applicable"] },
  { "question": "14/34 - Are linear relationships expected between your variables?", "options": ["Yes", "No", "Unknown / Unsure"] },
  { "question": "15/34 - Does your data closely match any known statistical distribution?", "options": ["Normal", "Binomial", "Poisson", "Unknown", "Unsure"] },
  { "question": "16/34 - Is multicollinearity likely?", "options": ["Yes", "No", "Not applicable", "Unsure"] },
  { "question": "17/34 - Do you have substantial outliers that could influence the analysis?", "options": ["Yes", "No", "Unknown"] },
  { "question": "18/34 - What is your primary analytical goal?", "options": ["Hypothesis testing", "Parameter estimation", "Predictive accuracy", "Exploratory analysis"] },
  { "question": "19/34 - Do you need explicit quantification of uncertainty?", "options": ["Yes", "No", "Unsure"] },
  { "question": "20/34 - Do you have prior knowledge or research findings to incorporate into the analysis?", "options": ["Yes, explicit priors", "Yes, vague priors", "No", "Unsure"] },
  { "question": "21/34 - What is your data size for predictive modeling purposes?", "options": ["Small (<100)", "Medium (100–1000)", "Large (>1000)"] },
  { "question": "22/34 - Which matters more in your analysis: interpretability or predictive accuracy?", "options": ["Predictive accuracy", "Interpretability", "Both equally", "Unsure"] },
  { "question": "23/34 - Will you be able to validate your models using new or held-out data?", "options": ["Yes", "No", "No validation feasible", "Unsure"] },
  { "question": "24/34 - Do you plan to use clustering methods or unsupervised learning techniques?", "options": ["Yes", "No", "Maybe/Unsure"] },
  { "question": "25/34 - Is your data structured as a time series?", "options": ["Yes", "No", "Unsure"] },
  { "question": "26/34 - Is your data spatial or geographic?", "options": ["Yes", "No", "Unsure"] },
  { "question": "27/34 - Do you have high-dimensional data?", "options": ["Yes", "No", "Unsure"] },
  { "question": "28/34 - Do you have sufficient computational resources?", "options": ["High", "Moderate", "Low"] },
  { "question": "29/34 - Do you require real-time results?", "options": ["Yes", "No"] },
  { "question": "30/34 - Does your study involve physiological data (EEG, GSR, HRV, Pupil Dilation)?", "options": ["Yes", "No"] },
  { "question": "31/34 - Do you need to analyze eye-tracking or gaze data?", "options": ["Yes", "No"] },
  { "question": "32/34 - Are you analyzing textual data (reviews, surveys, chat logs)?", "options": ["Yes", "No"] },
  { "question": "33/34 - What is your goal for textual data analysis?", "options": ["Sentiment Analysis", "Topic Modeling", "Named Entity Recognition", "Dependency Parsing", "Unsure"] },
  { "question": "34/34 - What kind of insights are you trying to extract from textual data?", "options": ["Trends over time", "User sentiment", "Common topics", "Keyword extraction", "Unsure"] }
]

export default function UXHFQuestionnaire() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [recommendation, setRecommendation] = useState(null);
  const [rCode, setRCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const startQuiz = () => {
    setStep(0);
  };

  const handleNext = async (option) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers, [questions[step].question]: option };

      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        sendToBackend(updatedAnswers);
      }

      return updatedAnswers;
    });
  };

  const sendToBackend = async (finalAnswers) => {
    setLoading(true);
    setShowResults(false);
    try {
      const response = await axios.post(API_URL, { answers: finalAnswers }, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("API Response:", response.data);

      setRecommendation(response.data.recommendation || "No recommendation found.");
      setRCode(response.data.r_code || "No R code available.");
      setShowResults(true);
    } catch (error) {
      console.error("API Error:", error);
      setRecommendation("Failed to fetch recommendation. Please try again.");
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {step === -1 ? (
        <div className="front-page">
          <h1>Stat Compass v1</h1>
          <p>You will answer 34 questions to determine the best statistical method for your data.</p>
          <p className="credits">Designed and developed by Mohsen Rafiei, Ph.D. and Bahareh Jozranjbar, Ph.D.</p>
          <p className="credits">Moo.rafiei@gmail.com</p>
          <button className="start-button" onClick={startQuiz}>Start</button>
        </div>
      ) : (
        <div className="card">
          {loading ? (
            <div className="loading-message">Processing...</div>
          ) : showResults ? (
            <div className="result">
              <h2>Recommendation</h2>
              <p className="response-box">{recommendation}</p>
              <pre className="code-box"><code>{rCode}</code></pre>
            </div>
          ) : (
            <div className="question-container">
              <h2>{questions[step].question}</h2>
              <div className="button-container">
                {questions[step].options.map((option) => (
                  <button key={option} className="option-button" onClick={() => handleNext(option)}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
