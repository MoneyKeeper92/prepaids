// src/App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ScenarioDetails from './components/ScenarioDetails';
import JournalEntryForm from './components/JournalEntryForm';
import Solution from './components/solution';
import prepaidAccrualScenarios from './data/prepaid_accrual_scenarios';
import { getCookie, setCookie, clearAllCookies } from './utils/cookieManager';
import './styles/App.css';

// Sort scenarios by ID
const sortedScenarios = [...prepaidAccrualScenarios].sort((a, b) => a.id.localeCompare(b.id));

// Calculate mastery level based on completed scenarios
const calculateMasteryLevel = (completedScenarios) => {
  const totalScenarios = sortedScenarios.length;
  const correctlyCompletedScenarios = Object.entries(completedScenarios)
    .filter(([_, isCorrect]) => isCorrect)
    .length;
  return correctlyCompletedScenarios / totalScenarios;
};

function App() {
  // Current scenario ID (not index)
  const [currentId, setCurrentId] = useState(() => {
    const savedId = getCookie('currentScenarioId');
    return savedId ? savedId : sortedScenarios[0]?.id;
  });

  // Completed scenarios tracking
  const [completedScenarios, setCompletedScenarios] = useState(() => {
    const saved = getCookie('completedScenarios');
    return saved ? JSON.parse(saved) : {};
  });

  // UI states
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Get current scenario by ID
  const currentScenario = sortedScenarios.find(s => s.id === currentId);

  // Check if we're on first or last scenario
  const currentIndex = sortedScenarios.findIndex(s => s.id === currentId);
  const isFirstScenario = currentIndex === 0;
  const isLastScenario = currentIndex === sortedScenarios.length - 1;

  // Save current ID to cookie when it changes
  useEffect(() => {
    setCookie('currentScenarioId', currentId, 30);
  }, [currentId]);

  // Save completed scenarios to cookie when they change
  useEffect(() => {
    setCookie('completedScenarios', JSON.stringify(completedScenarios), 30);
  }, [completedScenarios]);

  // Navigation functions
  const nextScenario = () => {
    // Find the next scenario ID
    const nextScenario = sortedScenarios[currentIndex + 1];
    if (nextScenario) {
      setCurrentId(nextScenario.id);
      setShowSolution(false);
      setIsCorrect(null);
      setShowFeedback(false);
    } else {
      setFeedbackMessage('Congratulations! You have finished all the prepaid and accrual journal entries in this app!');
      setShowFeedback(true);
    }
  };

  const previousScenario = () => {
    // Find the previous scenario ID
    const previousScenario = sortedScenarios[currentIndex - 1];
    if (previousScenario) {
      setCurrentId(previousScenario.id);
      setShowSolution(false);
      setIsCorrect(null);
      setShowFeedback(false);
    }
  };

  // Mark current scenario as completed and update performance
  const markCompleted = (isCorrect = true) => {
    const scenarioId = currentScenario.id;
    
    // Update completed scenarios
    setCompletedScenarios(prev => {
      const newCompleted = {
        ...prev,
        [scenarioId]: isCorrect
      };
      return newCompleted;
    });

    // Provide feedback based on performance
    if (isCorrect) {
      // Check if this is the last scenario
      const isLastScenario = currentIndex === sortedScenarios.length - 1;
      setFeedbackMessage(isLastScenario 
        ? 'Congratulations! You have finished all the prepaid and accrual journal entries in this app!'
        : 'Great job! You\'re making progress!');
      setShowFeedback(true);
      setTimeout(() => {
        if (!isLastScenario) {
          nextScenario();
          setShowFeedback(false);
        }
      }, 4000);
    } else {
      setFeedbackMessage('Keep practicing! You\'ll get better with each attempt.');
      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
      }, 4000);
    }
  };

  // Toggle solution visibility
  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };

  // Reset progress (clear cookies)
  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
      clearAllCookies();
      setCompletedScenarios({});
      setCurrentId(sortedScenarios[0].id); // Reset to first scenario
      setShowSolution(false);
      setIsCorrect(null);
      setShowFeedback(false);
    }
  };

  // Calculate progress percentage
  const progressPercentage = Math.round((Object.keys(completedScenarios).length / sortedScenarios.length) * 100);

  return (
    <div className="app-container">
      <Header 
        currentIndex={currentIndex}
        totalScenarios={sortedScenarios.length}
        progressPercentage={progressPercentage}
        completedCount={Object.keys(completedScenarios).length}
        resetProgress={resetProgress}
        masteryLevel={calculateMasteryLevel(completedScenarios)}
      />
      
      <div className="container">
        {currentScenario && (
          <>
            <ScenarioDetails 
              scenario={currentScenario}
              attempts={completedScenarios[currentScenario.id] ? 1 : 0}
            />
            
            <JournalEntryForm
              scenario={currentScenario}
              onCheck={(result) => {
                setIsCorrect(result);
                if (result) {
                  markCompleted(true);
                }
              }}
              toggleSolution={toggleSolution}
              showSolution={showSolution}
              isCorrect={isCorrect}
              onAdvance={nextScenario}
              onPrevious={previousScenario}
              isFirstScenario={isFirstScenario}
              isLastScenario={isLastScenario}
            />
            
            {showSolution && (
              <Solution scenario={currentScenario} />
            )}

            {showFeedback && (
              <div className={`feedback-message ${isCorrect ? 'success' : 'error'}`}>
                {feedbackMessage}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;