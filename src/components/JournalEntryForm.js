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

  const addLine = () => {
    setJournalLines([...journalLines, { id: journalLines.length + 1, account: '', debit: '', credit: '' }]);
  };

  const getAccountAliases = () => {
    return {
      'revenue': ['revenue', 'service revenue', 'consulting revenue', 'rent revenue'],
      'unearned revenue': ['unearned revenue', 'unearned service revenue'],
      'prepaid insurance': ['prepaid insurance', 'prepaid expenses'],
      'insurance expense': ['insurance expense'],
      'wages expense': ['wages expense', 'salary expense'],
      'wages payable': ['wages payable', 'salary payable'],
      'accounts receivable': ['accounts receivable'],
      'interest expense': ['interest expense'],
      'interest payable': ['interest payable'],
      'prepaid rent': ['prepaid rent'],
      'rent expense': ['rent expense'],
      'factory supplies': ['factory supplies', 'office supplies'],
      'factory supplies expense': ['factory supplies expense', 'office supplies expense'],
      'raw materials inventory': ['raw materials inventory'],
      'materials expense': ['materials expense'],
      'equipment service expense': ['equipment service expense'],
      'prepaid equipment service': ['prepaid equipment service'],
    };
  };

  const getCanonicalAccount = (accountName, aliases) => {
    const normalizedAccount = accountName.toLowerCase().trim();
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
    const solutionMap = new Map();

    solution.forEach(item => {
      const canonicalAccount = getCanonicalAccount(item.account, aliases);
      solutionMap.set(canonicalAccount, {
        debit: item.debit,
        credit: item.credit
      });
    });

    for (const entry of userEntries) {
      const canonicalAccount = getCanonicalAccount(entry.account, aliases);
      if (!solutionMap.has(canonicalAccount)) {
        return false;
      }

      const solutionEntry = solutionMap.get(canonicalAccount);
      const userDebit = parseFloat(entry.debit) || 0;
      const userCredit = parseFloat(entry.credit) || 0;
      const solutionDebit = solutionEntry.debit || 0;
      const solutionCredit = solutionEntry.credit || 0;

      if (Math.abs(userDebit - solutionDebit) > 0.01 ||
          Math.abs(userCredit - solutionCredit) > 0.01) {
        return false;
      }
      
      solutionMap.delete(canonicalAccount);
    }

    return solutionMap.size === 0;
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
      setErrorMessage(`Your entry is unbalanced. Debits: ${formatCurrency(totalDebit)}, Credits: ${formatCurrency(totalCredit)}`);
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