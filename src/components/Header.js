// src/components/Header.js
import React, { useState, useEffect, useRef } from 'react';
import { formatPercentage } from '../utils/formatUtils';
import '../styles/Header.css';

const Header = ({
  completedCount,
  resetProgress,
  masteryLevel
}) => {
  const totalScenariosInApp = 19; // Total number of scenarios in the app
  const [showTooltip, setShowTooltip] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const confirmDialogRef = useRef(null);
  const resetButtonRef = useRef(null);
  
  const milestones = [25, 50, 75, 100];
  const getMilestoneMessage = (percentage) => {
    if (percentage >= 100) return "Completed!";
    if (percentage >= 75) return "Almost there!";
    if (percentage >= 50) return "Halfway there!";
    if (percentage >= 25) return "Nice start!";
    return "";
  };

  const handleResetClick = () => {
    setShowResetConfirm(true);
  };

  const handleConfirmReset = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  const handleCancelReset = () => {
    setShowResetConfirm(false);
  };

  useEffect(() => {
    if (showResetConfirm) {
      const focusableElements = confirmDialogRef.current.querySelectorAll('button');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      firstElement.focus();

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          handleCancelReset();
          resetButtonRef.current.focus();
        }

        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      const dialog = confirmDialogRef.current;
      dialog.addEventListener('keydown', handleKeyDown);

      return () => {
        dialog.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [showResetConfirm]);

  const masteryPercentage = masteryLevel * 100;

  return (
    <header className="header">
      <div className="header-content">
        <div className="progress-info">
          <div className="progress-text">
            Progress: {completedCount}/{totalScenariosInApp} Scenarios
          </div>
          <div 
            className="progress-container"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {/* Milestone markers */}
            <div className="milestone-markers">
              {milestones.map(milestone => (
                <div 
                  key={milestone}
                  className="milestone-marker"
                  style={{ left: `${milestone}%` }}
                >
                  <div className="milestone-label">{milestone}%</div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="progress-bar">
              <div 
                className={`progress-fill`}
                style={{ width: `${masteryPercentage}%` }}
              />
            </div>

            {/* Tooltip */}
            {showTooltip && (
              <div className="progress-tooltip">
                <div>Mastery: {formatPercentage(masteryLevel)}</div>
                <div className="milestone-message">
                  {getMilestoneMessage(masteryPercentage)}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="performance-metrics">
          <div className="mastery-level">
            Mastery: {formatPercentage(masteryLevel)}
          </div>
          <button 
            className="reset-button"
            onClick={handleResetClick}
            ref={resetButtonRef}
          >
            Reset Progress
          </button>
        </div>
      </div>

      {showResetConfirm && (
        <div className="reset-confirm-overlay">
          <div 
            className="reset-confirm-dialog" 
            ref={confirmDialogRef}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="reset-dialog-title"
          >
            <h3 id="reset-dialog-title">Confirm Reset</h3>
            <p>Are you sure you want to reset all your progress? This action cannot be undone.</p>
            <div className="dialog-buttons">
              <button onClick={handleConfirmReset}>Yes, Reset</button>
              <button onClick={handleCancelReset}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;