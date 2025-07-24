// src/components/JournalLine.js
import React, { useState, useEffect } from 'react';

const JournalLine = ({ line, index, updateLine }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
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
    updateLine(line.id, 'account', value);
    
    if (value.length > 0) {
      const filteredSuggestions = getAccountOptions().filter(
        option => option.toLowerCase().includes(value.toLowerCase())
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
            disabled={!!line.credit}
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
          />
        </div>
      </td>
    </tr>
  );
};

export default JournalLine;