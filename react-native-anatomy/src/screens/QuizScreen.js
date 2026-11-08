import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { QUIZ_QUESTIONS } from '../data/anatomyData';

export default function QuizScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = QUIZ_QUESTIONS && QUIZ_QUESTIONS.length > 0 ? QUIZ_QUESTIONS : [
    {
      target: 'Heart',
      prompt: 'Which organ pumps oxygenated blood through the aorta to the systemic tissues?',
      options: ['Heart', 'Lungs (Pulmonary Lobes)', 'Liver', 'Kidneys'],
      explanation: 'The heart acts as the muscular motor pump providing perfusion pressure to vital tissues.'
    },
    {
      target: 'Brain (Cerebrum & Cortex)',
      prompt: 'Which structure contains approximately 86 billion neurons and controls conscious thought?',
      options: ['Brain (Cerebrum & Cortex)', 'Thyroid Gland', 'Pancreas', 'Spleen'],
      explanation: 'The cerebrum and cerebral cortex form the central control center of human thought and memory.'
    },
    {
      target: 'Kidneys',
      prompt: 'Which organ filters approximately 180 liters of blood daily to excrete metabolic waste as urine?',
      options: ['Kidneys', 'Stomach', 'Gallbladder', 'Femur'],
      explanation: 'Kidneys maintain systemic fluid balance, electrolyte equilibrium, and blood pressure via renin.'
    }
  ];

  const currentQ = questions[currentIndex];

  const handleSelectAnswer = (option) => {
    if (selectedOption !== null) return; // prevent changing
    setSelectedOption(option);
    setShowExplanation(true);
    if (option === currentQ.target) {
      setScore((prev) => prev + 10);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Anatomy Quiz Challenge</Text>
        <Text style={styles.subtitle}>Test your clinical and anatomical knowledge</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {!quizFinished ? (
          <>
            {/* Score & Progress */}
            <View style={styles.statusBar}>
              <Text style={styles.progressText}>
                Question {currentIndex + 1} of {questions.length}
              </Text>
              <View style={styles.scorePill}>
                <Text style={styles.scoreText}>🏆 {score} PTS</Text>
              </View>
            </View>

            {/* Question Card */}
            <View style={styles.questionCard}>
              <Text style={styles.questionBadge}>QUESTION</Text>
              <Text style={styles.promptText}>{currentQ.prompt}</Text>
            </View>

            {/* Options */}
            <View style={styles.optionsList}>
              {(currentQ.options || [currentQ.target, 'Liver', 'Lungs', 'Stomach']).map((opt, idx) => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === currentQ.target;

                let optStyle = styles.optionBtn;
                let textStyle = styles.optionText;

                if (selectedOption !== null) {
                  if (isCorrect) {
                    optStyle = [styles.optionBtn, styles.optionCorrect];
                    textStyle = [styles.optionText, styles.textCorrect];
                  } else if (isSelected && !isCorrect) {
                    optStyle = [styles.optionBtn, styles.optionIncorrect];
                    textStyle = [styles.optionText, styles.textIncorrect];
                  }
                }

                return (
                  <TouchableOpacity
                    key={idx}
                    style={optStyle}
                    activeOpacity={0.7}
                    onPress={() => handleSelectAnswer(opt)}
                    disabled={selectedOption !== null}
                  >
                    <Text style={styles.optionLetter}>
                      {String.fromCharCode(65 + idx)}
                    </Text>
                    <Text style={textStyle}>{opt}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Explanation Callout */}
            {showExplanation && (
              <View style={styles.explanationBox}>
                <Text style={styles.explanationTitle}>
                  {selectedOption === currentQ.target ? '✅ Correct Answer!' : '❌ Incorrect'}
                </Text>
                <Text style={styles.explanationText}>
                  {currentQ.explanation || 'Review the anatomical systems dossier for detailed organ insights.'}
                </Text>

                <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                  <Text style={styles.nextBtnText}>
                    {currentIndex < questions.length - 1 ? 'Next Question ➔' : 'Finish Quiz 🏁'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          /* Finished State */
          <View style={styles.finishCard}>
            <Text style={styles.finishTrophy}>🏆</Text>
            <Text style={styles.finishTitle}>Quiz Complete!</Text>
            <Text style={styles.finishScore}>Final Score: {score} / {questions.length * 10}</Text>
            <Text style={styles.finishSub}>
              {score >= questions.length * 7
                ? 'Outstanding! Excellent clinical and anatomical knowledge.'
                : 'Good effort! Review the 3D model and organ dossiers to improve.'}
            </Text>

            <TouchableOpacity style={styles.restartBtn} onPress={handleRestart}>
              <Text style={styles.restartBtnText}>Take Quiz Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 13,
    marginTop: 2,
  },
  content: {
    padding: 16,
    gap: 14,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '600',
  },
  scorePill: {
    backgroundColor: 'rgba(14, 165, 233, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#0284c7',
  },
  scoreText: {
    color: '#38bdf8',
    fontWeight: '700',
    fontSize: 13,
  },
  questionCard: {
    backgroundColor: '#0f172a',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  questionBadge: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 6,
  },
  promptText: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  optionsList: {
    gap: 10,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#334155',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '700',
    fontSize: 13,
    marginRight: 12,
  },
  optionText: {
    color: '#e2e8f0',
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  optionCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderColor: '#22c55e',
  },
  textCorrect: {
    color: '#4ade80',
    fontWeight: '700',
  },
  optionIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderColor: '#ef4444',
  },
  textIncorrect: {
    color: '#f87171',
    fontWeight: '700',
  },
  explanationBox: {
    backgroundColor: '#0f172a',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginTop: 6,
  },
  explanationTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 6,
  },
  explanationText: {
    color: '#cbd5e1',
    fontSize: 13.5,
    lineHeight: 20,
    marginBottom: 14,
  },
  nextBtn: {
    backgroundColor: '#0284c7',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  finishCard: {
    backgroundColor: '#0f172a',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginTop: 20,
  },
  finishTrophy: {
    fontSize: 48,
    marginBottom: 12,
  },
  finishTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
  },
  finishScore: {
    color: '#38bdf8',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  finishSub: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  restartBtn: {
    backgroundColor: '#0284c7',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  restartBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
