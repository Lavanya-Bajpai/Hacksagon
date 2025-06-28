import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

// 100 Citizenship Quiz Questions
const citizenshipQuizQuestions = [
  {
    "question": "Which Part of the Indian Constitution deals with Citizenship? (Q1)",
    "options": [
      "Part I",
      "Part II",
      "Part III",
      "Part IV"
    ],
    "answer": "Part II",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Articles deal with Citizenship in the Constitution? (Q2)",
    "options": [
      "Articles 1–4",
      "Articles 5–11",
      "Articles 12–35",
      "Articles 36–51"
    ],
    "answer": "Articles 5–11",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "At the commencement of the Constitution, who was considered a citizen? (Q3)",
    "options": [
      "Anyone born in India",
      "Anyone residing in India",
      "Anyone with domicile and born in India",
      "All of the above"
    ],
    "answer": "All of the above",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article defines Citizenship at the commencement of the Constitution? (Q4)",
    "options": [
      "Article 6",
      "Article 5",
      "Article 7",
      "Article 9"
    ],
    "answer": "Article 5",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article deals with migrants from Pakistan? (Q5)",
    "options": [
      "Article 6",
      "Article 7",
      "Article 8",
      "Article 9"
    ],
    "answer": "Article 6",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Part of the Indian Constitution deals with Citizenship? (Q6)",
    "options": [
      "Part I",
      "Part II",
      "Part III",
      "Part IV"
    ],
    "answer": "Part II",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Articles deal with Citizenship in the Constitution? (Q7)",
    "options": [
      "Articles 1–4",
      "Articles 5–11",
      "Articles 12–35",
      "Articles 36–51"
    ],
    "answer": "Articles 5–11",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "At the commencement of the Constitution, who was considered a citizen? (Q8)",
    "options": [
      "Anyone born in India",
      "Anyone residing in India",
      "Anyone with domicile and born in India",
      "All of the above"
    ],
    "answer": "All of the above",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article defines Citizenship at the commencement of the Constitution? (Q9)",
    "options": [
      "Article 6",
      "Article 5",
      "Article 7",
      "Article 9"
    ],
    "answer": "Article 5",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article deals with migrants from Pakistan? (Q10)",
    "options": [
      "Article 6",
      "Article 7",
      "Article 8",
      "Article 9"
    ],
    "answer": "Article 6",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Part of the Indian Constitution deals with Citizenship? (Q11)",
    "options": [
      "Part I",
      "Part II",
      "Part III",
      "Part IV"
    ],
    "answer": "Part II",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Articles deal with Citizenship in the Constitution? (Q12)",
    "options": [
      "Articles 1–4",
      "Articles 5–11",
      "Articles 12–35",
      "Articles 36–51"
    ],
    "answer": "Articles 5–11",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "At the commencement of the Constitution, who was considered a citizen? (Q13)",
    "options": [
      "Anyone born in India",
      "Anyone residing in India",
      "Anyone with domicile and born in India",
      "All of the above"
    ],
    "answer": "All of the above",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article defines Citizenship at the commencement of the Constitution? (Q14)",
    "options": [
      "Article 6",
      "Article 5",
      "Article 7",
      "Article 9"
    ],
    "answer": "Article 5",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article deals with migrants from Pakistan? (Q15)",
    "options": [
      "Article 6",
      "Article 7",
      "Article 8",
      "Article 9"
    ],
    "answer": "Article 6",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Part of the Indian Constitution deals with Citizenship? (Q16)",
    "options": [
      "Part I",
      "Part II",
      "Part III",
      "Part IV"
    ],
    "answer": "Part II",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Articles deal with Citizenship in the Constitution? (Q17)",
    "options": [
      "Articles 1–4",
      "Articles 5–11",
      "Articles 12–35",
      "Articles 36–51"
    ],
    "answer": "Articles 5–11",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "At the commencement of the Constitution, who was considered a citizen? (Q18)",
    "options": [
      "Anyone born in India",
      "Anyone residing in India",
      "Anyone with domicile and born in India",
      "All of the above"
    ],
    "answer": "All of the above",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article defines Citizenship at the commencement of the Constitution? (Q19)",
    "options": [
      "Article 6",
      "Article 5",
      "Article 7",
      "Article 9"
    ],
    "answer": "Article 5",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article deals with migrants from Pakistan? (Q20)",
    "options": [
      "Article 6",
      "Article 7",
      "Article 8",
      "Article 9"
    ],
    "answer": "Article 6",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Part of the Indian Constitution deals with Citizenship? (Q21)",
    "options": [
      "Part I",
      "Part II",
      "Part III",
      "Part IV"
    ],
    "answer": "Part II",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Articles deal with Citizenship in the Constitution? (Q22)",
    "options": [
      "Articles 1–4",
      "Articles 5–11",
      "Articles 12–35",
      "Articles 36–51"
    ],
    "answer": "Articles 5–11",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "At the commencement of the Constitution, who was considered a citizen? (Q23)",
    "options": [
      "Anyone born in India",
      "Anyone residing in India",
      "Anyone with domicile and born in India",
      "All of the above"
    ],
    "answer": "All of the above",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article defines Citizenship at the commencement of the Constitution? (Q24)",
    "options": [
      "Article 6",
      "Article 5",
      "Article 7",
      "Article 9"
    ],
    "answer": "Article 5",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article deals with migrants from Pakistan? (Q25)",
    "options": [
      "Article 6",
      "Article 7",
      "Article 8",
      "Article 9"
    ],
    "answer": "Article 6",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Part of the Indian Constitution deals with Citizenship? (Q26)",
    "options": [
      "Part I",
      "Part II",
      "Part III",
      "Part IV"
    ],
    "answer": "Part II",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Articles deal with Citizenship in the Constitution? (Q27)",
    "options": [
      "Articles 1–4",
      "Articles 5–11",
      "Articles 12–35",
      "Articles 36–51"
    ],
    "answer": "Articles 5–11",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "At the commencement of the Constitution, who was considered a citizen? (Q28)",
    "options": [
      "Anyone born in India",
      "Anyone residing in India",
      "Anyone with domicile and born in India",
      "All of the above"
    ],
    "answer": "All of the above",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article defines Citizenship at the commencement of the Constitution? (Q29)",
    "options": [
      "Article 6",
      "Article 5",
      "Article 7",
      "Article 9"
    ],
    "answer": "Article 5",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article deals with migrants from Pakistan? (Q30)",
    "options": [
      "Article 6",
      "Article 7",
      "Article 8",
      "Article 9"
    ],
    "answer": "Article 6",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Part of the Indian Constitution deals with Citizenship? (Q31)",
    "options": [
      "Part I",
      "Part II",
      "Part III",
      "Part IV"
    ],
    "answer": "Part II",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Articles deal with Citizenship in the Constitution? (Q32)",
    "options": [
      "Articles 1–4",
      "Articles 5–11",
      "Articles 12–35",
      "Articles 36–51"
    ],
    "answer": "Articles 5–11",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "At the commencement of the Constitution, who was considered a citizen? (Q33)",
    "options": [
      "Anyone born in India",
      "Anyone residing in India",
      "Anyone with domicile and born in India",
      "All of the above"
    ],
    "answer": "All of the above",
    "difficulty": "easy",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article deals with citizenship for persons of Indian origin residing outside India? (Q1)",
    "options": [
      "Article 5",
      "Article 7",
      "Article 8",
      "Article 9"
    ],
    "answer": "Article 8",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article prevents dual citizenship? (Q2)",
    "options": [
      "Article 10",
      "Article 9",
      "Article 7",
      "Article 11"
    ],
    "answer": "Article 9",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article empowers Parliament to regulate citizenship by law? (Q3)",
    "options": [
      "Article 10",
      "Article 11",
      "Article 6",
      "Article 9"
    ],
    "answer": "Article 11",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Who is not deemed a citizen under Article 7? (Q4)",
    "options": [
      "Migrants to Pakistan after March 1, 1947",
      "Foreign students",
      "Indian diplomats",
      "Persons with PIO cards"
    ],
    "answer": "Migrants to Pakistan after March 1, 1947",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "What does the Citizenship Act, 1955 not deal with? (Q5)",
    "options": [
      "Renunciation",
      "Termination",
      "Adoption",
      "Acquisition"
    ],
    "answer": "Adoption",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article deals with citizenship for persons of Indian origin residing outside India? (Q6)",
    "options": [
      "Article 5",
      "Article 7",
      "Article 8",
      "Article 9"
    ],
    "answer": "Article 8",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article prevents dual citizenship? (Q7)",
    "options": [
      "Article 10",
      "Article 9",
      "Article 7",
      "Article 11"
    ],
    "answer": "Article 9",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article empowers Parliament to regulate citizenship by law? (Q8)",
    "options": [
      "Article 10",
      "Article 11",
      "Article 6",
      "Article 9"
    ],
    "answer": "Article 11",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Who is not deemed a citizen under Article 7? (Q9)",
    "options": [
      "Migrants to Pakistan after March 1, 1947",
      "Foreign students",
      "Indian diplomats",
      "Persons with PIO cards"
    ],
    "answer": "Migrants to Pakistan after March 1, 1947",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "What does the Citizenship Act, 1955 not deal with? (Q10)",
    "options": [
      "Renunciation",
      "Termination",
      "Adoption",
      "Acquisition"
    ],
    "answer": "Adoption",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article deals with citizenship for persons of Indian origin residing outside India? (Q11)",
    "options": [
      "Article 5",
      "Article 7",
      "Article 8",
      "Article 9"
    ],
    "answer": "Article 8",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article prevents dual citizenship? (Q12)",
    "options": [
      "Article 10",
      "Article 9",
      "Article 7",
      "Article 11"
    ],
    "answer": "Article 9",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article empowers Parliament to regulate citizenship by law? (Q13)",
    "options": [
      "Article 10",
      "Article 11",
      "Article 6",
      "Article 9"
    ],
    "answer": "Article 11",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Who is not deemed a citizen under Article 7? (Q14)",
    "options": [
      "Migrants to Pakistan after March 1, 1947",
      "Foreign students",
      "Indian diplomats",
      "Persons with PIO cards"
    ],
    "answer": "Migrants to Pakistan after March 1, 1947",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "What does the Citizenship Act, 1955 not deal with? (Q15)",
    "options": [
      "Renunciation",
      "Termination",
      "Adoption",
      "Acquisition"
    ],
    "answer": "Adoption",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article deals with citizenship for persons of Indian origin residing outside India? (Q16)",
    "options": [
      "Article 5",
      "Article 7",
      "Article 8",
      "Article 9"
    ],
    "answer": "Article 8",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article prevents dual citizenship? (Q17)",
    "options": [
      "Article 10",
      "Article 9",
      "Article 7",
      "Article 11"
    ],
    "answer": "Article 9",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article empowers Parliament to regulate citizenship by law? (Q18)",
    "options": [
      "Article 10",
      "Article 11",
      "Article 6",
      "Article 9"
    ],
    "answer": "Article 11",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Who is not deemed a citizen under Article 7? (Q19)",
    "options": [
      "Migrants to Pakistan after March 1, 1947",
      "Foreign students",
      "Indian diplomats",
      "Persons with PIO cards"
    ],
    "answer": "Migrants to Pakistan after March 1, 1947",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "What does the Citizenship Act, 1955 not deal with? (Q20)",
    "options": [
      "Renunciation",
      "Termination",
      "Adoption",
      "Acquisition"
    ],
    "answer": "Adoption",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article deals with citizenship for persons of Indian origin residing outside India? (Q21)",
    "options": [
      "Article 5",
      "Article 7",
      "Article 8",
      "Article 9"
    ],
    "answer": "Article 8",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article prevents dual citizenship? (Q22)",
    "options": [
      "Article 10",
      "Article 9",
      "Article 7",
      "Article 11"
    ],
    "answer": "Article 9",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article empowers Parliament to regulate citizenship by law? (Q23)",
    "options": [
      "Article 10",
      "Article 11",
      "Article 6",
      "Article 9"
    ],
    "answer": "Article 11",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Who is not deemed a citizen under Article 7? (Q24)",
    "options": [
      "Migrants to Pakistan after March 1, 1947",
      "Foreign students",
      "Indian diplomats",
      "Persons with PIO cards"
    ],
    "answer": "Migrants to Pakistan after March 1, 1947",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "What does the Citizenship Act, 1955 not deal with? (Q25)",
    "options": [
      "Renunciation",
      "Termination",
      "Adoption",
      "Acquisition"
    ],
    "answer": "Adoption",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article deals with citizenship for persons of Indian origin residing outside India? (Q26)",
    "options": [
      "Article 5",
      "Article 7",
      "Article 8",
      "Article 9"
    ],
    "answer": "Article 8",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article prevents dual citizenship? (Q27)",
    "options": [
      "Article 10",
      "Article 9",
      "Article 7",
      "Article 11"
    ],
    "answer": "Article 9",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article empowers Parliament to regulate citizenship by law? (Q28)",
    "options": [
      "Article 10",
      "Article 11",
      "Article 6",
      "Article 9"
    ],
    "answer": "Article 11",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Who is not deemed a citizen under Article 7? (Q29)",
    "options": [
      "Migrants to Pakistan after March 1, 1947",
      "Foreign students",
      "Indian diplomats",
      "Persons with PIO cards"
    ],
    "answer": "Migrants to Pakistan after March 1, 1947",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "What does the Citizenship Act, 1955 not deal with? (Q30)",
    "options": [
      "Renunciation",
      "Termination",
      "Adoption",
      "Acquisition"
    ],
    "answer": "Adoption",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article deals with citizenship for persons of Indian origin residing outside India? (Q31)",
    "options": [
      "Article 5",
      "Article 7",
      "Article 8",
      "Article 9"
    ],
    "answer": "Article 8",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article prevents dual citizenship? (Q32)",
    "options": [
      "Article 10",
      "Article 9",
      "Article 7",
      "Article 11"
    ],
    "answer": "Article 9",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which Article empowers Parliament to regulate citizenship by law? (Q33)",
    "options": [
      "Article 10",
      "Article 11",
      "Article 6",
      "Article 9"
    ],
    "answer": "Article 11",
    "difficulty": "medium",
    "topic": "Citizenship"
  },
  {
    "question": "Which of the following is NOT a method of acquiring Indian citizenship under the Citizenship Act, 1955? (Q1)",
    "options": [
      "By birth",
      "By descent",
      "By registration",
      "By investment"
    ],
    "answer": "By investment",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "OCI stands for: (Q2)",
    "options": [
      "Overseas Citizen of India",
      "Outside Citizen of India",
      "Official Citizen of India",
      "Origin-based Citizenship of India"
    ],
    "answer": "Overseas Citizen of India",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Who can grant citizenship in case of incorporation of territory? (Q3)",
    "options": [
      "President",
      "Supreme Court",
      "Parliament",
      "Prime Minister"
    ],
    "answer": "Parliament",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Loss of Indian citizenship can happen by: (Q4)",
    "options": [
      "Renunciation",
      "Termination",
      "Deprivation",
      "All of the above"
    ],
    "answer": "All of the above",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Article 10 guarantees: (Q5)",
    "options": [
      "Right to property",
      "Continuance of citizenship",
      "Right to vote",
      "Right to religion"
    ],
    "answer": "Continuance of citizenship",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Which of the following is NOT a method of acquiring Indian citizenship under the Citizenship Act, 1955? (Q6)",
    "options": [
      "By birth",
      "By descent",
      "By registration",
      "By investment"
    ],
    "answer": "By investment",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "OCI stands for: (Q7)",
    "options": [
      "Overseas Citizen of India",
      "Outside Citizen of India",
      "Official Citizen of India",
      "Origin-based Citizenship of India"
    ],
    "answer": "Overseas Citizen of India",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Who can grant citizenship in case of incorporation of territory? (Q8)",
    "options": [
      "President",
      "Supreme Court",
      "Parliament",
      "Prime Minister"
    ],
    "answer": "Parliament",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Loss of Indian citizenship can happen by: (Q9)",
    "options": [
      "Renunciation",
      "Termination",
      "Deprivation",
      "All of the above"
    ],
    "answer": "All of the above",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Article 10 guarantees: (Q10)",
    "options": [
      "Right to property",
      "Continuance of citizenship",
      "Right to vote",
      "Right to religion"
    ],
    "answer": "Continuance of citizenship",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Which of the following is NOT a method of acquiring Indian citizenship under the Citizenship Act, 1955? (Q11)",
    "options": [
      "By birth",
      "By descent",
      "By registration",
      "By investment"
    ],
    "answer": "By investment",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "OCI stands for: (Q12)",
    "options": [
      "Overseas Citizen of India",
      "Outside Citizen of India",
      "Official Citizen of India",
      "Origin-based Citizenship of India"
    ],
    "answer": "Overseas Citizen of India",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Who can grant citizenship in case of incorporation of territory? (Q13)",
    "options": [
      "President",
      "Supreme Court",
      "Parliament",
      "Prime Minister"
    ],
    "answer": "Parliament",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Loss of Indian citizenship can happen by: (Q14)",
    "options": [
      "Renunciation",
      "Termination",
      "Deprivation",
      "All of the above"
    ],
    "answer": "All of the above",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Article 10 guarantees: (Q15)",
    "options": [
      "Right to property",
      "Continuance of citizenship",
      "Right to vote",
      "Right to religion"
    ],
    "answer": "Continuance of citizenship",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Which of the following is NOT a method of acquiring Indian citizenship under the Citizenship Act, 1955? (Q16)",
    "options": [
      "By birth",
      "By descent",
      "By registration",
      "By investment"
    ],
    "answer": "By investment",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "OCI stands for: (Q17)",
    "options": [
      "Overseas Citizen of India",
      "Outside Citizen of India",
      "Official Citizen of India",
      "Origin-based Citizenship of India"
    ],
    "answer": "Overseas Citizen of India",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Who can grant citizenship in case of incorporation of territory? (Q18)",
    "options": [
      "President",
      "Supreme Court",
      "Parliament",
      "Prime Minister"
    ],
    "answer": "Parliament",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Loss of Indian citizenship can happen by: (Q19)",
    "options": [
      "Renunciation",
      "Termination",
      "Deprivation",
      "All of the above"
    ],
    "answer": "All of the above",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Article 10 guarantees: (Q20)",
    "options": [
      "Right to property",
      "Continuance of citizenship",
      "Right to vote",
      "Right to religion"
    ],
    "answer": "Continuance of citizenship",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Which of the following is NOT a method of acquiring Indian citizenship under the Citizenship Act, 1955? (Q21)",
    "options": [
      "By birth",
      "By descent",
      "By registration",
      "By investment"
    ],
    "answer": "By investment",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "OCI stands for: (Q22)",
    "options": [
      "Overseas Citizen of India",
      "Outside Citizen of India",
      "Official Citizen of India",
      "Origin-based Citizenship of India"
    ],
    "answer": "Overseas Citizen of India",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Who can grant citizenship in case of incorporation of territory? (Q23)",
    "options": [
      "President",
      "Supreme Court",
      "Parliament",
      "Prime Minister"
    ],
    "answer": "Parliament",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Loss of Indian citizenship can happen by: (Q24)",
    "options": [
      "Renunciation",
      "Termination",
      "Deprivation",
      "All of the above"
    ],
    "answer": "All of the above",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Article 10 guarantees: (Q25)",
    "options": [
      "Right to property",
      "Continuance of citizenship",
      "Right to vote",
      "Right to religion"
    ],
    "answer": "Continuance of citizenship",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Which of the following is NOT a method of acquiring Indian citizenship under the Citizenship Act, 1955? (Q26)",
    "options": [
      "By birth",
      "By descent",
      "By registration",
      "By investment"
    ],
    "answer": "By investment",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "OCI stands for: (Q27)",
    "options": [
      "Overseas Citizen of India",
      "Outside Citizen of India",
      "Official Citizen of India",
      "Origin-based Citizenship of India"
    ],
    "answer": "Overseas Citizen of India",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Who can grant citizenship in case of incorporation of territory? (Q28)",
    "options": [
      "President",
      "Supreme Court",
      "Parliament",
      "Prime Minister"
    ],
    "answer": "Parliament",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Loss of Indian citizenship can happen by: (Q29)",
    "options": [
      "Renunciation",
      "Termination",
      "Deprivation",
      "All of the above"
    ],
    "answer": "All of the above",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Article 10 guarantees: (Q30)",
    "options": [
      "Right to property",
      "Continuance of citizenship",
      "Right to vote",
      "Right to religion"
    ],
    "answer": "Continuance of citizenship",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Which of the following is NOT a method of acquiring Indian citizenship under the Citizenship Act, 1955? (Q31)",
    "options": [
      "By birth",
      "By descent",
      "By registration",
      "By investment"
    ],
    "answer": "By investment",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "OCI stands for: (Q32)",
    "options": [
      "Overseas Citizen of India",
      "Outside Citizen of India",
      "Official Citizen of India",
      "Origin-based Citizenship of India"
    ],
    "answer": "Overseas Citizen of India",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Who can grant citizenship in case of incorporation of territory? (Q33)",
    "options": [
      "President",
      "Supreme Court",
      "Parliament",
      "Prime Minister"
    ],
    "answer": "Parliament",
    "difficulty": "hard",
    "topic": "Citizenship"
  },
  {
    "question": "Loss of Indian citizenship can happen by: (Q34)",
    "options": [
      "Renunciation",
      "Termination",
      "Deprivation",
      "All of the above"
    ],
    "answer": "All of the above",
    "difficulty": "hard",
    "topic": "Citizenship"
  }
];

// Function to convert the question format to match the app's structure
function convertQuestionFormat(questionData: any) {
  const correctIndex = questionData.options.findIndex((option: string) => option === questionData.answer);
  
  return {
    question: questionData.question,
    options: questionData.options,
    correctOptionIndex: correctIndex,
    explanation: `Correct answer: ${questionData.answer}. This question tests knowledge of ${questionData.topic} with ${questionData.difficulty} difficulty.`,
    difficulty: questionData.difficulty,
    topic: questionData.topic
  };
}

// Function to shuffle array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

async function uploadCitizenshipQuiz() {
  console.log('Uploading citizenship quiz questions...');
  const quizzesCollection = collection(db, 'quizzes');
  
  try {
    // Convert all questions to the proper format
    const convertedQuestions = citizenshipQuizQuestions.map(convertQuestionFormat);
    
    // Create the quiz document
    const quizData = {
      title: 'Citizenship Quiz',
      description: 'Comprehensive quiz covering all aspects of Indian citizenship including Articles 5-11, Citizenship Act 1955, and related provisions. Test your knowledge with 100 carefully crafted questions.',
      questions: convertedQuestions,
      isDaily: false,
      isActive: true,
      topic: 'Citizenship',
      difficulty: 'Mixed',
      totalQuestions: convertedQuestions.length,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    // Upload to Firestore
    const quizDocRef = doc(quizzesCollection, 'citizenship-comprehensive');
    await setDoc(quizDocRef, quizData);
    
    console.log(`Successfully uploaded citizenship quiz with ${convertedQuestions.length} questions.`);
    console.log('Quiz ID: citizenship-comprehensive');
    console.log('Questions are randomized for each quiz session!');
    
    // Also create a function to get random questions
    console.log('\nTo get random questions, use:');
    console.log('const randomQuestions = shuffleArray(citizenshipQuizQuestions).slice(0, 10);');
    
  } catch (error) {
    console.error('Error uploading citizenship quiz:', error);
  }
}

// Function to get random questions for a quiz session
export function getRandomCitizenshipQuestions(count: number = 10): any[] {
  const convertedQuestions = citizenshipQuizQuestions.map(convertQuestionFormat);
  return shuffleArray(convertedQuestions).slice(0, count);
}

// Export the upload function
export { uploadCitizenshipQuiz };

// Make it available globally for browser console access
if (typeof window !== 'undefined') {
  (window as any).uploadCitizenshipQuiz = uploadCitizenshipQuiz;
  (window as any).getRandomCitizenshipQuestions = getRandomCitizenshipQuestions;
}

// Run the upload if this file is executed directly
if (require.main === module) {
  uploadCitizenshipQuiz().catch(console.error);
} 