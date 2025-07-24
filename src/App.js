// src/App.js
import React, { useState, useEffect, useRef } from 'react';
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
    // Ensure saved data is in the new format { attempts, isCorrect }
    const initialData = saved ? JSON.parse(saved) : {};
    for (const id in initialData) {
      if (typeof initialData[id] !== 'object') {
        initialData[id] = { attempts: 1, isCorrect: !!initialData[id] };
      }
    }
    return initialData;
  });

  // UI states
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Ref for the solution component to enable auto-scrolling
  const solutionRef = useRef(null);

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

  // Scroll to solution when it appears
  useEffect(() => {
    if (showSolution && solutionRef.current) {
      solutionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showSolution]);

  // Navigation functions
  const nextScenario = () => {
    const nextIndex = (currentIndex + 1) % sortedScenarios.length;
    const nextScenario = sortedScenarios[nextIndex];
    if (nextScenario) {
      setCurrentId(nextScenario.id);
      setShowSolution(false);
      setIsCorrect(null);
      setShowFeedback(false);
    }
  };

  const previousScenario = () => {
    const prevIndex = (currentIndex - 1 + sortedScenarios.length) % sortedScenarios.length;
    const previousScenario = sortedScenarios[prevIndex];
    if (previousScenario) {
      setCurrentId(previousScenario.id);
      setShowSolution(false);
      setIsCorrect(null);
      setShowFeedback(false);
    }
  };

  const randomScenario = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * sortedScenarios.length);
    } while (randomIndex === currentIndex);
    
    const randomScenario = sortedScenarios[randomIndex];
    if (randomScenario) {
      setCurrentId(randomScenario.id);
      setShowSolution(false);
      setIsCorrect(null);
      setShowFeedback(false);
    }
  };

  // Mark current scenario as completed and update performance
  const markCompleted = (isCorrect = true) => {
    const scenarioId = currentScenario.id;
    
    setCompletedScenarios(prev => {
      const currentAttempts = prev[scenarioId]?.attempts || 0;
      return {
        ...prev,
        [scenarioId]: {
          attempts: currentAttempts + 1,
          isCorrect: isCorrect
        }
      };
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
          setShowFeedback(false);
          nextScenario();
        }
      }, 2000);
    } else {
      setFeedbackMessage('Keep practicing! You\'ll get better with each attempt.');
      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
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
  const correctlyCompletedCount = Object.values(completedScenarios).filter(isCorrect => isCorrect).length;
  const progressPercentage = Math.round((correctlyCompletedCount / sortedScenarios.length) * 100);

  const onCheck = (result) => {
    setIsCorrect(result);
    if (!result) {
      // Mark an incorrect attempt
      const scenarioId = currentScenario.id;
      setCompletedScenarios(prev => {
        const currentAttempts = prev[scenarioId]?.attempts || 0;
        return {
          ...prev,
          [scenarioId]: {
            attempts: currentAttempts + 1,
            isCorrect: false
          }
        };
      });
    }
  };

  return (
    <div className="app-container">
      <Header 
        currentIndex={currentIndex}
        totalScenarios={sortedScenarios.length}
        progressPercentage={progressPercentage}
        completedCount={correctlyCompletedCount}
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
              onCheck={onCheck}
              toggleSolution={toggleSolution}
              showSolution={showSolution}
              isCorrect={isCorrect}
              onAdvance={() => {
                markCompleted(true);
                nextScenario();
              }}
              onPrevious={previousScenario}
              onRandom={randomScenario}
              isFirstScenario={isFirstScenario}
              isLastScenario={isLastScenario}
              attempts={completedScenarios[currentId]?.attempts || 0}
            />
            
            {showSolution && (
              <div ref={solutionRef}>
                <Solution scenario={currentScenario} />
              </div>
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