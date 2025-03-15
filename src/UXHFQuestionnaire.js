import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://backend-smart.vercel.app/analyze";

const questions = [
  { question: "1/30 - What is the type of your study?", options: ["Experimental", "Observational", "Not applicable / Unsure"] },
  { question: "2/30 - What is your research design?", options: ["Between-subjects", "Within-subjects (Repeated measures)", "Mixed design", "Not applicable / Unsure"] },
  { question: "3/30 - Is your data collection longitudinal or cross-sectional?", options: ["Longitudinal", "Cross-sectional", "Not applicable / Unsure"] },
  { question: "4/30 - How did you sample your participants?", options: ["Random sampling", "Stratified sampling", "Convenience sampling", "Other / Unsure"] },
  { question: "5/30 - What is your approximate sample size?", options: ["Small (<30)", "Medium (30–100)", "Large (>100)"] },
  { question: "6/30 - Are observations independent, or are they nested/clustered/repeated within subjects?", options: ["Independent observations", "Nested or clustered", "Repeated measures", "Not applicable / Unsure"] },
  { question: "7/30 - What types of dependent variables do you have?", options: ["Continuous", "Categorical nominal", "Categorical ordinal", "Binary", "Count data (Poisson)"] },
  { question: "8/30 - What types of independent variables do you have?", options: ["Continuous", "Categorical", "Binary"] },
  { question: "9/30 - Are your groups balanced or unbalanced in size?", options: ["Balanced", "Unbalanced", "Not applicable"] },
  { question: "10/30 - Do you have missing data?", options: ["Minimal (<5%)", "Moderate (5–15%)", "High (>15%)"] },
  { question: "11/30 - Is your data approximately normally distributed?", options: ["Approximately normal", "Mildly skewed", "Severely skewed", "Unknown"] },
  { question: "12/30 - Do your variables meet the assumption of homogeneity of variances?", options: ["Yes", "No", "Unknown", "Not applicable"] },
  { question: "13/30 - Are linear relationships expected between your variables?", options: ["Yes", "No", "Unknown / Unsure"] },
  { question: "14/30 - Does your data closely match any known statistical distribution?", options: ["Normal", "Binomial", "Poisson", "Unknown", "Unsure"] },
  { question: "15/30 - Is multicollinearity likely?", options: ["Yes", "No", "Not applicable", "Unsure"] },
  { question: "16/30 - Do you have substantial outliers that could influence the analysis?", options: ["Yes", "No", "Unknown"] },
  { question: "17/30 - What is your primary analytical goal?", options: ["Hypothesis testing", "Parameter estimation", "Predictive accuracy", "Exploratory analysis"] },
  { question: "18/30 - How critical is interpretability of your results?", options: ["Very critical", "Moderately important", "Not critical"] },
  { question: "19/30 - Do you need explicit quantification of uncertainty?", options: ["Yes", "No", "Unsure"] },
  { question: "20/30 - Do you have prior knowledge or research findings to incorporate into the analysis?", options: ["Yes, explicit priors", "Yes, vague priors", "No", "Unsure"] },
  { question: "21/30 - What is your data size for predictive modeling purposes?", options: ["Small (<100)", "Medium (100–1000)", "Large (>1000)"] },
  { question: "22/30 - Which matters more in your analysis: interpretability or predictive accuracy?", options: ["Predictive accuracy", "Interpretability", "Both equally", "Unsure"] },
  { question: "23/30 - Will you be able to validate your models using new or held-out data?", options: ["Yes", "No", "No validation feasible", "Unsure"] },
  { question: "24/30 - Do you plan to use clustering methods or unsupervised learning techniques?", options: ["Yes", "No", "Maybe/Unsure"] },
  { question: "25/30 - Is your data structured as a time series?", options: ["Yes", "No", "Unsure"] },
  { question: "26/30 - Is your data spatial or geographic?", options: ["Yes", "No", "Unsure"] },
  { question: "27/30 - Do you have high-dimensional data?", options: ["Yes", "No", "Unsure"] },
  { question: "28/30 - Do you have sufficient computational resources?", options: ["High", "Moderate", "Low"] },
  { question: "29/30 - Do you require real-time results?", options: ["Yes", "No"] },
  { question: "30/30 - Do you have strict ethical or regulatory standards?", options: ["Yes, very strict", "Moderate", "Flexible or none"] }
];

export default function UXHFQuestionnaire() {
  const [step, setStep] = useState(-1);

  const handleStart = () => {
    setStep(0);
  };

return (
    <div className="container">
      <div className="card">
        {loading ? (
          <div className="loading-message">🔄 Please wait for the response...</div>
        ) : showResults ? (
          <div className="result">
            <h2>AI-Generated Recommendation</h2>
            <p className="response-box">{detailedExplanation}</p>
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
    </div>
  );
}
