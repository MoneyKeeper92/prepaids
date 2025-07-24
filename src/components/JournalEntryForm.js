// src/components/JournalEntryForm.js
import React, { useState, useEffect, useRef } from 'react';
import JournalTable from './JournalTable';
import { formatCurrency } from '../utils/formatUtils';
import '../styles/JournalEntry.css';

const JournalEntryForm = ({ 
  scenario, 
  onCheck, 
  toggleSolution, 
  showSolution,
  isCorrect,
  onAdvance,
  onPrevious,
  isFirstScenario,
  isLastScenario
}) => {
  // Initialize with the exact number of lines needed based on solution
  const [journalLines, setJournalLines] = useState(() => {
    return scenario.solution.entry.map((_, index) => ({
      id: index + 1,
      account: '',
      debit: '',
      credit: ''
    }));
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [lastScenarioId, setLastScenarioId] = useState(scenario.id);
  const successDialogRef = useRef(null);

  // Reset form only when scenario changes
  useEffect(() => {
    if (scenario.id !== lastScenarioId) {
      setJournalLines(scenario.solution.entry.map((_, index) => ({
        id: index + 1,
        account: '',
        debit: '',
        credit: ''
      })));
      setLastScenarioId(scenario.id);
      onCheck(null);
      setErrorMessage('');
    }
  }, [scenario.id, scenario.solution.entry, onCheck, lastScenarioId]);

  // Scroll to success dialog when it appears
  useEffect(() => {
    if (showSuccessDialog && successDialogRef.current) {
      // Use a small timeout to ensure the element is rendered before scrolling
      const timer = setTimeout(() => {
        successDialogRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showSuccessDialog]);

  const checkAgainstSolution = (userEntries, solution) => {
    console.log("Running checkAgainstSolution");
    // First, check if the number of entries matches the solution
    if (userEntries.length !== solution.length) {
      console.log("Number of entries doesn't match", userEntries.length, solution.length);
      return false;
    }
    
    // Create maps for better comparison
    const solutionMap = {};
    solution.forEach(item => {
      solutionMap[item.account.toLowerCase()] = {
        debit: item.debit,
        credit: item.credit
      };
    });
    
    console.log("Solution map:", solutionMap);
    
    // Check each user entry against the solution, ignoring order
    for (const entry of userEntries) {
      // Normalize account name for comparison (case-insensitive)
      const accountName = entry.account.toLowerCase().trim();
      console.log("Checking account:", accountName);
      
      // Check if the account exists in the solution
      if (!solutionMap[accountName]) {
        console.log("Account doesn't exist in solution:", accountName);
        return false; // Account doesn't exist in solution
      }
      
      const solutionEntry = solutionMap[accountName];
      
      // Check if the debit/credit values match
      const userDebit = parseFloat(entry.debit) || 0;
      const userCredit = parseFloat(entry.credit) || 0;
      const solutionDebit = solutionEntry.debit || 0;
      const solutionCredit = solutionEntry.credit || 0;
      
      console.log("Comparing values:", 
        "userDebit:", userDebit, "solutionDebit:", solutionDebit,
        "userCredit:", userCredit, "solutionCredit:", solutionCredit
      );
      
      // Allow a small rounding error tolerance (0.01)
      if (Math.abs(userDebit - solutionDebit) > 0.01 || 
          Math.abs(userCredit - solutionCredit) > 0.01) {
        console.log("Values don't match");
        return false;
      }
    }
    
    console.log("All checks passed, entry is correct");
    return true;
  };

  const updateLine = (id, field, value) => {
    setJournalLines(journalLines.map(line => {
      if (line.id === id) {
        // If setting a debit, clear the credit and vice versa
        if (field === 'debit' && value) {
          return { ...line, [field]: value, credit: '' };
        } else if (field === 'credit' && value) {
          return { ...line, [field]: value, debit: '' };
        }
        return { ...line, [field]: value };
      }
      return line;
    }));
  };

  const checkAnswer = () => {
    console.log("Check Answer button clicked");
    
    // Validate the journal entry
    const filledLines = journalLines.filter(
      line => line.account && (line.debit || line.credit)
    );
    
    console.log("Filled lines:", filledLines);
    
    if (filledLines.length === 0) {
      console.log("No entries found");
      setErrorMessage('Please enter at least one journal entry line.');
      onCheck(false);
      return;
    }
    
    // Calculate totals
    const totalDebit = filledLines.reduce(
      (sum, line) => sum + (parseFloat(line.debit) || 0), 0
    );
    const totalCredit = filledLines.reduce(
      (sum, line) => sum + (parseFloat(line.credit) || 0), 0
    );
    
    console.log("Total debit:", totalDebit, "Total credit:", totalCredit);
    
    // Check if debits equal credits
    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      console.log("Debits don't equal credits");
      setErrorMessage(`Debits (${formatCurrency(totalDebit)}) don't equal credits (${formatCurrency(totalCredit)})`);
      onCheck(false);
      return;
    }
    
    // Check against solution
    console.log("Checking against solution:", scenario.solution.entry);
    const isCorrect = checkAgainstSolution(filledLines, scenario.solution.entry);
    console.log("Is correct:", isCorrect);
    onCheck(isCorrect);
    
    if (isCorrect) {
      setErrorMessage('');
      setShowSuccessDialog(true);
    } else {
      setErrorMessage('Your journal entry isn\'t quite right. Try again or check the solution.');
    }
  };

  const handleNext = () => {
    setShowSuccessDialog(false);
    onAdvance();
  };

  return (
    <div className="journal-form-container">
      <h2 className="journal-heading">
        Record Your Journal Entry
      </h2>
      
      <JournalTable 
        journalLines={journalLines}
        updateLine={updateLine}
      />
      
      <div className="journal-button-container">
        <button 
          className="check-answer-button"
          onClick={checkAnswer}
          type="button"
        >
          Check My Answer
        </button>
        
        <button
          className="toggle-solution-button"
          onClick={toggleSolution}
          type="button"
        >
          {showSolution ? 'Hide Solution' : 'Show Solution'}
        </button>
      </div>
      
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      <div className="navigation-controls">
        <button 
          disabled={isFirstScenario}
          className="btn-secondary"
          onClick={onPrevious}
          type="button"
        >
          Previous
        </button>
        <button 
          className="btn-primary"
          onClick={onAdvance}
          type="button"
        >
          Next
        </button>
      </div>

      {showSuccessDialog && (
        <div className="success-dialog" ref={successDialogRef}>
          <div className="success-message">
            Correct! Well done on this prepaid and accrual scenario.
          </div>
          <div className="next-button-container">
            <button 
              className="next-button"
              onClick={handleNext}
            >
              Continue to Next Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalEntryForm;