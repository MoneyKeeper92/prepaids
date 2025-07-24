// src/components/ScenarioDetails.js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../styles/ScenarioDetails.css';

const ScenarioDetails = ({ scenario, attempts }) => {
  return (
    <div className="scenario-details">
      <div className="scenario-content">
        <div className="scenario-info">
          <div className="task">
            <ReactMarkdown>{scenario.task}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioDetails;