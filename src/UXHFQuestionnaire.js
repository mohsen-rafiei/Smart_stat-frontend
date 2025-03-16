import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://fastapi-backend-pg6y.onrender.com/analyze";

const questions = [
  { "question": "What is the type of your study?", "options": ["Experimental", "Observational", "Not applicable / Unsure"] },
  { "question": "What is your research design?", "options": ["Between-subjects", "Within-subjects (Repeated measures)", "Mixed design", "Not applicable / Unsure"] },
  { "question": "Is your data collection longitudinal or cross-sectional?", "options": ["Longitudinal", "Cross-sectional", "Not applicable / Unsure"] },
  { "question": "How did you sample your participants?", "options": ["Random sampling", "Stratified sampling", "Convenience sampling", "Other / Unsure"] },
  { "question": "What is your approximate sample size?", "options": ["Small (<30)", "Medium (30–100)", "Large (>100)"] },
  { "question": "Are observations independent, or are they nested/clustered/repeated within subjects?", "options": ["Independent observations", "Nested or clustered", "Repeated measures", "Not applicable / Unsure"] },
  { "question": "What types of dependent variables do you have?", "options": ["Continuous", "Categorical nominal", "Categorical ordinal", "Binary", "Count data (Poisson)", "Textual data"] },
  { "question": "What types of independent variables do you have?", "options": ["Continuous", "Categorical", "Binary"] },
  { "question": "Are your groups balanced or unbalanced in size?", "options": ["Balanced", "Unbalanced", "Not applicable"] },
  { "question": "Do you have missing data?", "options": ["Minimal (<5%)", "Moderate (5–15%)", "High (>15%)"] },
  { "question": "How do you plan to handle missing data?", "options": ["Ignore", "Impute (Mean/Median)", "Use Model-Based Imputation", "Unsure"] },
  { "question": "Is your data approximately normally distributed?", "options": ["Approximately normal", "Mildly skewed", "Severely skewed", "Unknown"] },
  { "question": "Do your variables meet the assumption of homogeneity of variances?", "options": ["Yes", "No", "Unknown", "Not applicable"] },
  { "question": "Are linear relationships expected between your variables?", "options": ["Yes", "No", "Unknown / Unsure"] },
  { "question": "Does your data closely match any known statistical distribution?", "options": ["Normal", "Binomial", "Poisson", "Unknown", "Unsure"] },
  { "question": "Is multicollinearity likely?", "options": ["Yes", "No", "Not applicable", "Unsure"] },
  { "question": "Do you have substantial outliers that could influence the analysis?", "options": ["Yes", "No", "Unknown"] },
  { "question": "What is your primary analytical goal?", "options": ["Hypothesis testing", "Parameter estimation", "Predictive accuracy", "Exploratory analysis"] },
  { "question": "Do you need explicit quantification of uncertainty?", "options": ["Yes", "No", "Unsure"] },
  { "question": "Do you have prior knowledge or research findings to incorporate into the analysis?", "options": ["Yes, explicit priors", "Yes, vague priors", "No", "Unsure"] },
  { "question": "What is your data size for predictive modeling purposes?", "options": ["Small (<100)", "Medium (100–1000)", "Large (>1000)"] },
  { "question": "Which matters more in your analysis: interpretability or predictive accuracy?", "options": ["Predictive accuracy", "Interpretability", "Both equally", "Unsure"] },
  { "question": "Will you be able to validate your models using new or held-out data?", "options": ["Yes", "No", "No validation feasible", "Unsure"] },
  { "question": "Do you plan to use clustering methods or unsupervised learning techniques?", "options": ["Yes", "No", "Maybe/Unsure"] },
  { "question": "Is your data structured as a time series?", "options": ["Yes", "No", "Unsure"] },
  { "question": "Is your data spatial or geographic?", "options": ["Yes", "No", "Unsure"] },
  { "question": "Do you have high-dimensional data?", "options": ["Yes", "No", "Unsure"] },
  { "question": "Do you have sufficient computational resources?", "options": ["High", "Moderate", "Low"] },
  { "question": "Do you require real-time results?", "options": ["Yes", "No"] },
  { "question": "Does your study involve physiological data (EEG, GSR, HRV, Pupil Dilation)?", "options": ["Yes", "No"] },
  { "question": "Do you need to analyze eye-tracking or gaze data?", "options": ["Yes", "No"] },
  { "question": "Are you analyzing textual data (reviews, surveys, chat logs)?", "options": ["Yes", "No"] },
  { "question": "What is your goal for textual data analysis?", "options": ["Sentiment Analysis", "Topic Modeling", "Named Entity Recognition", "Dependency Parsing", "Unsure"] },
  { "question": "What kind of insights are you trying to extract from textual data?", "options": ["Trends over time", "User sentiment", "Common topics", "Keyword extraction", "Unsure"] }
];

export default function UXHFQuestionnaire() {
  const [answers, setAnswers] = useState({});
  const [recommendation, setRecommendation] = useState(null);
  const [rCode, setRCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleChange = (question, option) => {
    setAnswers(prev => ({ ...prev, [question]: option }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setShowResults(false);
    try {
      const response = await axios.post(API_URL, { answers }, {
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
    <div className="qualtrics-container">
      <h1 className="qualtrics-title">Stat Compass</h1>
      <p className="qualtrics-description">Answer 34 questions to determine the best statistical method for your data.</p>
      <p className="qualtrics-credits">Designed by <strong>Mohsen Rafiei, Ph.D.</strong> & <strong>Bahareh Jozranjbar, Ph.D.</strong></p>
      <p className="qualtrics-contact">Moo.rafiei@gmail.com</p>
      <div className="qualtrics-questionnaire">
        {questions.map((q, index) => (
          <div key={index} className="qualtrics-question-card">
            <h3 className="qualtrics-question-text">{q.question}</h3>
            <div className="qualtrics-options">
              {q.options.map(option => (
                <label key={option} className="qualtrics-option-label">
                  <input
                    type="radio"
                    name={q.question}
                    value={option}
                    checked={answers[q.question] === option}
                    onChange={() => handleChange(q.question, option)}
                  />
                  <span className="radio-spacing"></span>
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="qualtrics-submit-button" onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Submit"}
      </button>
      {showResults && (
        <div className="qualtrics-result">
          <h2 className="qualtrics-result-title">Recommendation</h2>
          <p className="qualtrics-response-box">{recommendation}</p>
          <pre className="qualtrics-code-box"><code>{rCode}</code></pre>
        </div>
      )}
    </div>
  );
}

// CSS styles for Qualtrics-like appearance
const styles = `
  .qualtrics-container {
    max-width: 800px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    background: #f4f4f4;
    padding: 20px;
    border-radius: 8px;
  }
  .qualtrics-title {
    text-align: center;
    font-size: 28px;
    color: #333;
    margin-bottom: 15px;
  }
  .qualtrics-description, .qualtrics-credits, .qualtrics-contact {
    text-align: center;
    font-size: 16px;
    margin-bottom: 15px;
  }
  .qualtrics-question-card {
    background: white;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .qualtrics-options label {
    display: flex;
    align-items: center;
    padding: 8px 5px;
    cursor: pointer;
  }
  .radio-spacing {
    width: 10px;
    display: inline-block;
  }
  .qualtrics-submit-button {
    display: block;
    width: 100%;
    padding: 10px;
    background: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .qualtrics-submit-button:disabled {
    background: #ccc;
  }
  .qualtrics-result {
    margin-top: 20px;
    background: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
