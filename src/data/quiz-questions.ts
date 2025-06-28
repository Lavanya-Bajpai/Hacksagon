export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

// Fundamental Rights Quiz Questions
export const fundamentalRightsQuestions: QuizQuestion[] = [
  {
    id: 'fr1',
    text: 'Which article of the Indian Constitution guarantees the Right to Equality?',
    options: ['Article 14', 'Article 15', 'Article 16', 'Article 17'],
    correctIndex: 0,
    explanation: 'Article 14 guarantees the Right to Equality before law and equal protection of laws.'
  },
  {
    id: 'fr2',
    text: 'The Right to Freedom of Speech and Expression is guaranteed under which article?',
    options: ['Article 19(1)(a)', 'Article 19(1)(b)', 'Article 19(1)(c)', 'Article 19(1)(d)'],
    correctIndex: 0,
    explanation: 'Article 19(1)(a) guarantees the Right to Freedom of Speech and Expression.'
  },
  {
    id: 'fr3',
    text: 'Which fundamental right is also known as the "Right to Constitutional Remedies"?',
    options: ['Article 32', 'Article 33', 'Article 34', 'Article 35'],
    correctIndex: 0,
    explanation: 'Article 32 is known as the "Right to Constitutional Remedies" and is considered the heart and soul of the Constitution.'
  },
  {
    id: 'fr4',
    text: 'The Right to Education is guaranteed under which article?',
    options: ['Article 21A', 'Article 21B', 'Article 21C', 'Article 21D'],
    correctIndex: 0,
    explanation: 'Article 21A guarantees the Right to Education as a fundamental right.'
  },
  {
    id: 'fr5',
    text: 'Which fundamental right protects against discrimination on grounds of religion, race, caste, sex, or place of birth?',
    options: ['Article 14', 'Article 15', 'Article 16', 'Article 17'],
    correctIndex: 1,
    explanation: 'Article 15 prohibits discrimination on grounds of religion, race, caste, sex, or place of birth.'
  },
  {
    id: 'fr6',
    text: 'Which article guarantees the Right to Life and Personal Liberty?',
    options: ['Article 20', 'Article 21', 'Article 22', 'Article 23'],
    correctIndex: 1,
    explanation: 'Article 21 guarantees the Right to Life and Personal Liberty.'
  },
  {
    id: 'fr7',
    text: 'Which article abolishes untouchability?',
    options: ['Article 16', 'Article 17', 'Article 18', 'Article 19'],
    correctIndex: 1,
    explanation: 'Article 17 abolishes untouchability and forbids its practice in any form.'
  },
  {
    id: 'fr8',
    text: 'Which article guarantees freedom of religion?',
    options: ['Article 24', 'Article 25', 'Article 26', 'Article 27'],
    correctIndex: 1,
    explanation: 'Article 25 guarantees freedom of conscience and free profession, practice, and propagation of religion.'
  },
  {
    id: 'fr9',
    text: 'Which article provides protection against arrest and detention?',
    options: ['Article 20', 'Article 21', 'Article 22', 'Article 23'],
    correctIndex: 2,
    explanation: 'Article 22 provides protection against arrest and detention in certain cases.'
  },
  {
    id: 'fr10',
    text: 'Which article prohibits forced labor?',
    options: ['Article 22', 'Article 23', 'Article 24', 'Article 25'],
    correctIndex: 1,
    explanation: 'Article 23 prohibits traffic in human beings and forced labor.'
  }
];

// Fundamental Duties Quiz Questions
export const fundamentalDutiesQuestions: QuizQuestion[] = [
  {
    id: 'fd1',
    text: 'How many fundamental duties are mentioned in the Indian Constitution?',
    options: ['9', '10', '11', '12'],
    correctIndex: 2,
    explanation: 'There are 11 fundamental duties mentioned in Article 51A of the Indian Constitution.'
  },
  {
    id: 'fd2',
    text: 'Which amendment added fundamental duties to the Indian Constitution?',
    options: ['42nd Amendment', '44th Amendment', '46th Amendment', '50th Amendment'],
    correctIndex: 0,
    explanation: 'The 42nd Constitutional Amendment Act, 1976 added fundamental duties to the Constitution.'
  },
  {
    id: 'fd3',
    text: 'Which fundamental duty requires citizens to abide by the Constitution and respect its ideals?',
    options: ['First duty', 'Second duty', 'Third duty', 'Fourth duty'],
    correctIndex: 0,
    explanation: 'The first fundamental duty requires citizens to abide by the Constitution and respect its ideals.'
  },
  {
    id: 'fd4',
    text: 'Which fundamental duty relates to protecting the sovereignty, unity, and integrity of India?',
    options: ['Duty to defend the country', 'Duty to promote harmony', 'Duty to develop scientific temper', 'Duty to protect environment'],
    correctIndex: 0,
    explanation: 'The fundamental duty to defend the country and render national service when called upon relates to protecting sovereignty, unity, and integrity.'
  },
  {
    id: 'fd5',
    text: 'Which fundamental duty promotes harmony and the spirit of common brotherhood?',
    options: ['Duty to promote harmony', 'Duty to value and preserve heritage', 'Duty to protect environment', 'Duty to develop scientific temper'],
    correctIndex: 0,
    explanation: 'The fundamental duty to promote harmony and the spirit of common brotherhood among all people.'
  },
  {
    id: 'fd6',
    text: 'Which fundamental duty relates to protecting and improving the natural environment?',
    options: ['Duty to protect environment', 'Duty to develop scientific temper', 'Duty to value heritage', 'Duty to strive for excellence'],
    correctIndex: 0,
    explanation: 'The fundamental duty to protect and improve the natural environment including forests, lakes, rivers, and wildlife.'
  },
  {
    id: 'fd7',
    text: 'Which fundamental duty requires citizens to develop scientific temper, humanism, and spirit of inquiry?',
    options: ['Duty to develop scientific temper', 'Duty to protect environment', 'Duty to value heritage', 'Duty to strive for excellence'],
    correctIndex: 0,
    explanation: 'The fundamental duty to develop scientific temper, humanism, and the spirit of inquiry and reform.'
  },
  {
    id: 'fd8',
    text: 'Which fundamental duty relates to safeguarding public property?',
    options: ['Duty to safeguard public property', 'Duty to strive for excellence', 'Duty to provide education to children', 'Duty to protect environment'],
    correctIndex: 0,
    explanation: 'The fundamental duty to safeguard public property and to abjure violence.'
  },
  {
    id: 'fd9',
    text: 'Which fundamental duty requires citizens to strive towards excellence in all spheres?',
    options: ['Duty to strive for excellence', 'Duty to provide education', 'Duty to protect environment', 'Duty to value heritage'],
    correctIndex: 0,
    explanation: 'The fundamental duty to strive towards excellence in all spheres of individual and collective activity.'
  },
  {
    id: 'fd10',
    text: 'Which fundamental duty requires parents to provide opportunities for education to their children?',
    options: ['Duty to provide education to children', 'Duty to strive for excellence', 'Duty to protect environment', 'Duty to value heritage'],
    correctIndex: 0,
    explanation: 'The fundamental duty of parents to provide opportunities for education to their children between 6-14 years.'
  }
];

// Citizenship Quiz Questions
export const citizenshipQuestions: QuizQuestion[] = [
  {
    id: 'cit1',
    text: 'Which part of the Indian Constitution deals with Citizenship?',
    options: ['Part I', 'Part II', 'Part III', 'Part IV'],
    correctIndex: 1,
    explanation: 'Part II of the Indian Constitution (Articles 5-11) deals with Citizenship.'
  },
  {
    id: 'cit2',
    text: 'Which article defines who is a citizen of India at the commencement of the Constitution?',
    options: ['Article 5', 'Article 6', 'Article 7', 'Article 8'],
    correctIndex: 0,
    explanation: 'Article 5 defines who is a citizen of India at the commencement of the Constitution.'
  },
  {
    id: 'cit3',
    text: 'Which article deals with the rights of citizenship of certain persons who have migrated to India from Pakistan?',
    options: ['Article 5', 'Article 6', 'Article 7', 'Article 8'],
    correctIndex: 1,
    explanation: 'Article 6 deals with the rights of citizenship of certain persons who have migrated to India from Pakistan.'
  },
  {
    id: 'cit4',
    text: 'Which article deals with the rights of citizenship of certain migrants to Pakistan?',
    options: ['Article 6', 'Article 7', 'Article 8', 'Article 9'],
    correctIndex: 1,
    explanation: 'Article 7 deals with the rights of citizenship of certain migrants to Pakistan.'
  },
  {
    id: 'cit5',
    text: 'Which article deals with the rights of citizenship of certain persons of Indian origin residing outside India?',
    options: ['Article 7', 'Article 8', 'Article 9', 'Article 10'],
    correctIndex: 1,
    explanation: 'Article 8 deals with the rights of citizenship of certain persons of Indian origin residing outside India.'
  },
  {
    id: 'cit6',
    text: 'Which article provides for the continuance of the rights of citizenship?',
    options: ['Article 8', 'Article 9', 'Article 10', 'Article 11'],
    correctIndex: 2,
    explanation: 'Article 10 provides for the continuance of the rights of citizenship.'
  },
  {
    id: 'cit7',
    text: 'Which article empowers Parliament to regulate the right of citizenship by law?',
    options: ['Article 9', 'Article 10', 'Article 11', 'Article 12'],
    correctIndex: 2,
    explanation: 'Article 11 empowers Parliament to regulate the right of citizenship by law.'
  },
  {
    id: 'cit8',
    text: 'Which act currently governs Indian citizenship?',
    options: ['Citizenship Act, 1955', 'Citizenship Act, 1986', 'Citizenship Act, 2003', 'Citizenship Act, 2019'],
    correctIndex: 0,
    explanation: 'The Citizenship Act, 1955 currently governs Indian citizenship.'
  },
  {
    id: 'cit9',
    text: 'How many ways can a person acquire Indian citizenship?',
    options: ['3', '4', '5', '6'],
    correctIndex: 2,
    explanation: 'There are 5 ways to acquire Indian citizenship: by birth, descent, registration, naturalization, and incorporation of territory.'
  },
  {
    id: 'cit10',
    text: 'Which amendment introduced the concept of Overseas Citizen of India (OCI)?',
    options: ['Citizenship Amendment Act, 2003', 'Citizenship Amendment Act, 2005', 'Citizenship Amendment Act, 2015', 'Citizenship Amendment Act, 2019'],
    correctIndex: 0,
    explanation: 'The Citizenship Amendment Act, 2003 introduced the concept of Overseas Citizen of India (OCI).'
  }
]; 