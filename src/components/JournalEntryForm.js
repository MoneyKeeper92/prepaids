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
  onRandom,
  isFirstScenario,
  isLastScenario,
  attempts
}) => {
  // Initialize state based on the scenario prop.
  // Since the component is re-keyed, this will run on each new scenario.
  const [journalLines, setJournalLines] = useState(() =>
    scenario.solution.entry.map((_, index) => ({
      id: index + 1,
      account: '',
      debit: '',
      credit: '',
    }))
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [hint, setHint] = useState('');
  const successDialogRef = useRef(null);

  // Show a hint after the second incorrect attempt
  useEffect(() => {
    if (attempts >= 2) {
      const solutionAccounts = scenario.solution.entry.map(e => e.account);
      const randomAccount = solutionAccounts[Math.floor(Math.random() * solutionAccounts.length)];
      setHint(`Having trouble? Try using an account like "${randomAccount}".`);
    }
  }, [attempts, scenario.solution.entry]);

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

  const addLine = () => {
    setJournalLines([...journalLines, { id: journalLines.length + 1, account: '', debit: '', credit: '' }]);
  };

  const deleteLine = (idToDelete) => {
    setJournalLines((prevLines) => prevLines.filter((line) => line.id !== idToDelete));
  };

  const getAccountAliases = () => {
    return {
      // Canonical Name: [alias1, alias2, ...]
      'revenue': ['revenue', 'service revenue', 'consulting revenue', 'rent revenue', 'engineering fees revenue'],
      'unearned revenue': ['unearned revenue', 'unearned service revenue', 'unearned consulting revenue', 'unearned rent revenue'],
      'prepaid insurance': ['prepaid insurance', 'prepaid expenses'], // Grouping general "prepaid expenses"
      'insurance expense': ['insurance expense'],
      'wages expense': ['wages expense', 'salary expense'],
      'wages payable': ['wages payable', 'salary payable'],
      'accounts receivable': ['accounts receivable', 'a/r'],
      'accounts payable': ['accounts payable', 'a/p'],
      'interest expense': ['interest expense'],
      'interest payable': ['interest payable'],
      'prepaid rent': ['prepaid rent'],
      'rent expense': ['rent expense'],
      'office supplies': ['office supplies', 'supplies'],
      'office supplies expense': ['office supplies expense', 'supplies expense'],
      'factory supplies': ['factory supplies'],
      'factory supplies expense': ['factory supplies expense'],
      'raw materials inventory': ['raw materials inventory', 'materials inventory', 'inventory'],
      'materials expense': ['materials expense'],
      'equipment service expense': ['equipment service expense', 'service expense'],
      'prepaid equipment service': ['prepaid equipment service', 'prepaid service'],
    };
  };

  const getCanonicalAccount = (accountName, aliases) => {
    const normalizedAccount = accountName.toLowerCase().trim().replace(/\s+/g, ' ');
    for (const canonical in aliases) {
      if (aliases[canonical].includes(normalizedAccount)) {
        return canonical;
      }
    }
    return normalizedAccount;
  };

  const checkAgainstSolution = (userEntries, solution) => {
    console.log("Running checkAgainstSolution");
    if (userEntries.length !== solution.length) {
      return false;
    }

    const aliases = getAccountAliases();
    
    // Create sorted, comparable strings for both user and solution entries
    const formatEntry = (entry) => {
      const canonicalAccount = getCanonicalAccount(entry.account, aliases);
      const debit = parseFloat(entry.debit) || 0;
      const credit = parseFloat(entry.credit) || 0;
      return `${canonicalAccount}|${debit.toFixed(2)}|${credit.toFixed(2)}`;
    };

    const sortedUserEntries = userEntries.map(formatEntry).sort();
    const sortedSolutionEntries = solution.map(formatEntry).sort();

    // Compare the sorted arrays
    if (sortedUserEntries.length !== sortedSolutionEntries.length) return false;
    
    for (let i = 0; i < sortedUserEntries.length; i++) {
      if (sortedUserEntries[i] !== sortedSolutionEntries[i]) {
        return false;
      }
    }

    return true;
  };

  const updateLine = (id, field, value) => {
    setJournalLines(currentLines => {
      const newLines = [...currentLines];
      const lineIndex = newLines.findIndex(line => line.id === id);
      if (lineIndex === -1) return currentLines;
  
      const updatedLine = { ...newLines[lineIndex] };
  
      if (field === 'debit') {
        updatedLine.debit = value;
        if (value) updatedLine.credit = '';
      } else if (field === 'credit') {
        updatedLine.credit = value;
        if (value) updatedLine.debit = '';
      } else {
        updatedLine[field] = value;
      }
  
      newLines[lineIndex] = updatedLine;
      return newLines;
    });
  };

  const checkAnswer = () => {
    // Validate the journal entry
    const filledLines = journalLines.filter(
      line => line.account && (line.debit || line.credit)
    );

    if (filledLines.length === 0) {
      setErrorMessage('Please make a valid journal entry.');
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

    // Check if debits equal credits
    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      const difference = formatCurrency(Math.abs(totalDebit - totalCredit));
      let unbalancedMessage = `Your entry is unbalanced by ${difference}. `;
      if (totalDebit > totalCredit) {
        unbalancedMessage += 'Debits are higher than credits.';
      } else {
        unbalancedMessage += 'Credits are higher than debits.';
      }
      setErrorMessage(unbalancedMessage);
      onCheck(false);
      return;
    }

    // Check against solution
    const isCorrect = checkAgainstSolution(filledLines, scenario.solution.entry);
    onCheck(isCorrect);

    if (isCorrect) {
      setErrorMessage('');
      setShowSuccessDialog(true);
    } else {
      setErrorMessage('Your journal entry is balanced, but not correct. Please review it or check the solution.');
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
        deleteLine={deleteLine}
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
          className="add-line-button"
          onClick={addLine}
          type="button"
        >
          Add Another Line
        </button>

        <button
          className="toggle-solution-button"
          onClick={toggleSolution}
          type="button"
        >
          {showSolution ? 'Hide Solution' : 'Show Solution'}
        </button>
      </div>
      
      {hint && (
        <div className="hint-message">
          {hint}
        </div>
      )}
      
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
          className="btn-secondary"
          onClick={onRandom}
          type="button"
        >
          Random Scenario
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