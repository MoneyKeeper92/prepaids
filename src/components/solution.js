// Create this file at: src/components/solution.js
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { formatCurrency } from '../utils/formatUtils';
import '../styles/Solution.css';

const Solution = ({ scenario }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate totals of the solution
  const totalDebit = scenario.solution.entry.reduce(
    (sum, line) => sum + (line.debit || 0), 0
  );
  
  const totalCredit = scenario.solution.entry.reduce(
    (sum, line) => sum + (line.credit || 0), 0
  );
  
  return (
    <div className="solution-container">
      <h3 className="solution-heading">Solution:</h3>
      
      <table className="solution-table">
        <thead>
          <tr>
            <th>Account</th>
            <th>Debit</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          {scenario.solution.entry.map((line, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td>{line.account}</td>
              <td>{line.debit ? formatCurrency(line.debit) : ''}</td>
              <td>{line.credit ? formatCurrency(line.credit) : ''}</td>
            </tr>
          ))}
          
          {/* Totals row */}
          <tr className="solution-table-totals">
            <td>Total</td>
            <td>{formatCurrency(totalDebit)}</td>
            <td>{formatCurrency(totalCredit)}</td>
          </tr>
        </tbody>
      </table>
      
      {scenario.explanation && (
        <div className="explanation-container">
          <div className="explanation-header">
            <h4 className="explanation-heading">Explanation:</h4>
            <button 
              className="expand-collapse-button"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </button>
          </div>
          {isExpanded && (
            <div className="explanation-content">
              <ReactMarkdown>{scenario.explanation}</ReactMarkdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Solution;