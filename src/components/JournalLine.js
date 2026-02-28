// src/components/JournalLine.js
import React, { useState, useEffect, memo, useRef } from 'react';

const JournalLine = ({ line, index, updateLine, deleteLine }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const accountInputRef = useRef(null);
  const debitInputRef = useRef(null);
  const creditInputRef = useRef(null);
  
  // Define standard account names for prepaid and accrual scenarios
  const getAccountOptions = () => {
    return [
      // Assets
      'Cash',
      'Accounts Receivable',
      'Prepaid Insurance',
      'Prepaid Rent',
      'Prepaid Equipment Service',
      'Office Supplies',
      'Factory Supplies',
      'Raw Materials Inventory',
      
      // Liabilities
      'Accounts Payable',
      'Wages Payable',
      'Salary Payable',
      'Interest Payable',
      'Unearned Revenue',
      
      // Expenses
      'Wages Expense',
      'Salary Expense',
      'Insurance Expense',
      'Rent Expense',
      'Equipment Service Expense',
      'Office Supplies Expense',
      'Factory Supplies Expense',
      'Materials Expense',
      'Interest Expense',
      
      // Revenues
      'Revenue'
    ];
  };

  // Filter suggestions based on input
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Strip numeric characters from the input
    const nonNumericValue = value.replace(/[0-9]/g, '');
    updateLine(line.id, 'account', nonNumericValue);
    
    if (nonNumericValue.length > 0) {
      const filteredSuggestions = getAccountOptions().filter(
        option => option.toLowerCase().includes(nonNumericValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
      setSelectedIndex(0); // Select first suggestion by default
    } else {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !showSuggestions) {
      e.preventDefault();
      debitInputRef.current.focus();
    }
    if (!showSuggestions) return;

    switch (e.key) {
      case 'Tab':
        e.preventDefault();
        if (suggestions.length > 0) {
          selectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (suggestions.length > 0) {
          selectSuggestion(suggestions[selectedIndex]);
        }
        break;
      default:
        break;
    }
  };

  const handleAmountKeyDown = (e, currentField, nextFieldRef) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      nextFieldRef.current.focus();
    }
  };

  // Select a suggestion
  const selectSuggestion = (suggestion) => {
    updateLine(line.id, 'account', suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <tr className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
      <td>
        <div className="account-input-container">
          <input
            className="journal-input"
            placeholder="Enter account name"
            type="text"
            value={line.account}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            autoComplete="off"
            ref={accountInputRef}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, i) => (
                <li
                  key={i}
                  onClick={() => selectSuggestion(suggestion)}
                  className={`suggestion-item ${i === selectedIndex ? 'selected' : ''}`}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </td>
      <td>
        <div className="amount-input-container">
          <span className="currency-symbol">$</span>
          <input
            className="amount-input"
            placeholder="0"
            type="number"
            value={line.debit}
            onChange={(e) => updateLine(line.id, 'debit', e.target.value)}
            onKeyDown={(e) => handleAmountKeyDown(e, 'debit', creditInputRef)}
            disabled={!!line.credit}
            ref={debitInputRef}
          />
        </div>
      </td>
      <td>
        <div className="amount-input-container">
          <span className="currency-symbol">$</span>
          <input
            className="amount-input"
            placeholder="0"
            type="number"
            value={line.credit}
            onChange={(e) => updateLine(line.id, 'credit', e.target.value)}
            disabled={!!line.debit}
            ref={creditInputRef}
          />
        </div>
      </td>
      <td>
        <button
          onClick={() => deleteLine(line.id)}
          className="delete-line-button"
          title="Delete this line"
        >
          &times;
        </button>
      </td>
    </tr>
  );
};

// Memoize the component to prevent re-renders unless props change
const areEqual = (prevProps, nextProps) => {
  // Only re-render if the line data has changed
  return (
    prevProps.line.account === nextProps.line.account &&
    prevProps.line.debit === nextProps.line.debit &&
    prevProps.line.credit === nextProps.line.credit &&
    prevProps.index === nextProps.index
  );
};

export default memo(JournalLine, areEqual);