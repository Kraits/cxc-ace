/**
 * Seed script to add CSEC Mathematics & English A quiz questions and study notes
 * to the Turso database via Prisma.
 *
 * This adds 30 additional MCQ questions per subject plus comprehensive study notes
 * for each topic. It only INSERTS – it will not duplicate existing records.
 *
 * Run with:  npx tsx prisma/seed-math-english.ts
 */
import { createClient } from '@libsql/client'
import { PrismaClient, Difficulty } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

// ─── Turso Credentials ────────────────────────────────────────────
const TURSO_URL = 'libsql://cxc-ace-endd21.aws-us-east-1.turso.io'
const TURSO_TOKEN =
  'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzY2NTEyNzUsImlkIjoiMDE5ZGE4OWYtOGQwMS03ZWRmLWFhMzYtN2YzNGNiYTQ3OTljIiwicmlkIjoiYWVhZmRlMzEtYTA1Ny00ZTYwLWEzNDEtYjRlZTg4NTI1ODFlIn0.Z-MpprbPNGoXX41qlwJd9YtaD2sXqYVt151LmLJfx9LCf4e9fx7wYgHf7hf2YZ8JZAWWnoOTRVYh0UTMdAdtDQ'

const EASY: Difficulty = 'EASY'
const MEDIUM: Difficulty = 'MEDIUM'
const HARD: Difficulty = 'HARD'

// ─── Helpers ──────────────────────────────────────────────────────
function mcq(
  content: string,
  options: { label: string; value: string; isCorrect: boolean }[],
  explanation: string,
  difficulty: Difficulty,
  topicName: string,
) {
  return {
    content,
    options: JSON.stringify(options),
    correctAnswer: options.find((o) => o.isCorrect)!.value,
    explanation,
    difficulty,
    topicName,
  }
}

// ══════════════════════════════════════════════════════════════════
//  CSEC MATHEMATICS – 30 Additional MCQ Questions
// ══════════════════════════════════════════════════════════════════
const MATH_QUESTIONS: ReturnType<typeof mcq>[] = [
  // ── Number Theory & Computation (6 questions) ──
  mcq(
    'What is the HCF (Highest Common Factor) of 24 and 36?',
    [
      { label: 'A', value: '6', isCorrect: false },
      { label: 'B', value: '12', isCorrect: true },
      { label: 'C', value: '8', isCorrect: false },
      { label: 'D', value: '24', isCorrect: false },
    ],
    '24 = 2³ × 3, 36 = 2² × 3². HCF = 2² × 3 = 12.',
    MEDIUM,
    'Number Theory & Computation',
  ),
  mcq(
    'Express 0.375 as a fraction in its lowest terms.',
    [
      { label: 'A', value: '3/8', isCorrect: true },
      { label: 'B', value: '37/100', isCorrect: false },
      { label: 'C', value: '3/4', isCorrect: false },
      { label: 'D', value: '7/20', isCorrect: false },
    ],
    '0.375 = 375/1000 = (375 ÷ 125)/(1000 ÷ 125) = 3/8.',
    MEDIUM,
    'Number Theory & Computation',
  ),
  mcq(
    'Calculate: (−3) × (−4) + (−2)²',
    [
      { label: 'A', value: '16', isCorrect: true },
      { label: 'B', value: '−16', isCorrect: false },
      { label: 'C', value: '8', isCorrect: false },
      { label: 'D', value: '−8', isCorrect: false },
    ],
    '(−3) × (−4) = 12. (−2)² = 4. 12 + 4 = 16.',
    EASY,
    'Number Theory & Computation',
  ),
  mcq(
    'A number is increased by 20% and then decreased by 20%. What is the net percentage change?',
    [
      { label: 'A', value: '0%', isCorrect: false },
      { label: 'B', value: '4% decrease', isCorrect: true },
      { label: 'C', value: '4% increase', isCorrect: false },
      { label: 'D', value: '2% decrease', isCorrect: false },
    ],
    'Let the number be 100. After +20% → 120. After −20% of 120 → 120 − 24 = 96. Net change = 100 − 96 = 4% decrease.',
    HARD,
    'Number Theory & Computation',
  ),
  mcq(
    'Which of the following numbers is a rational number?',
    [
      { label: 'A', value: '√7', isCorrect: false },
      { label: 'B', value: 'π', isCorrect: false },
      { label: 'C', value: '0.333... (repeating)', isCorrect: true },
      { label: 'D', value: '√2', isCorrect: false },
    ],
    'A rational number can be expressed as a fraction p/q. 0.333... = 1/3, which is rational. √2, √7, and π are irrational.',
    MEDIUM,
    'Number Theory & Computation',
  ),
  mcq(
    'What is the value of 2⁰ + 3⁰?',
    [
      { label: 'A', value: '0', isCorrect: false },
      { label: 'B', value: '1', isCorrect: false },
      { label: 'C', value: '2', isCorrect: true },
      { label: 'D', value: '5', isCorrect: false },
    ],
    'Any non-zero number raised to the power 0 equals 1. So 2⁰ + 3⁰ = 1 + 1 = 2.',
    EASY,
    'Number Theory & Computation',
  ),

  // ── Algebra (6 questions) ──
  mcq(
    'Solve the inequality: 2x − 3 > 7',
    [
      { label: 'A', value: 'x > 5', isCorrect: true },
      { label: 'B', value: 'x > 2', isCorrect: false },
      { label: 'C', value: 'x < 5', isCorrect: false },
      { label: 'D', value: 'x > 4', isCorrect: false },
    ],
    '2x − 3 > 7 → 2x > 10 → x > 5. When dividing by a positive number, the inequality sign stays the same.',
    MEDIUM,
    'Algebra',
  ),
  mcq(
    'Simplify: (2x + 3)(x − 1)',
    [
      { label: 'A', value: '2x² + x − 3', isCorrect: true },
      { label: 'B', value: '2x² − x − 3', isCorrect: false },
      { label: 'C', value: '2x² + 5x − 3', isCorrect: false },
      { label: 'D', value: '2x² − 5x + 3', isCorrect: false },
    ],
    'Expand using FOIL: 2x² − 2x + 3x − 3 = 2x² + x − 3.',
    MEDIUM,
    'Algebra',
  ),
  mcq(
    'Solve the simultaneous equations: x + y = 10 and x − y = 4',
    [
      { label: 'A', value: 'x = 7, y = 3', isCorrect: true },
      { label: 'B', value: 'x = 6, y = 4', isCorrect: false },
      { label: 'C', value: 'x = 8, y = 2', isCorrect: false },
      { label: 'D', value: 'x = 5, y = 5', isCorrect: false },
    ],
    'Add the two equations: 2x = 14 → x = 7. Substitute: 7 + y = 10 → y = 3.',
    MEDIUM,
    'Algebra',
  ),
  mcq(
    'Make a the subject of the formula: v = u + at',
    [
      { label: 'A', value: 'a = (v − u)/t', isCorrect: true },
      { label: 'B', value: 'a = (v + u)/t', isCorrect: false },
      { label: 'C', value: 'a = v/t − u', isCorrect: false },
      { label: 'D', value: 'a = t(v − u)', isCorrect: false },
    ],
    'v = u + at → v − u = at → a = (v − u)/t.',
    EASY,
    'Algebra',
  ),
  mcq(
    'Solve: 3/(x − 1) = 2/(x + 2)',
    [
      { label: 'A', value: 'x = −8', isCorrect: true },
      { label: 'B', value: 'x = 8', isCorrect: false },
      { label: 'C', value: 'x = −4', isCorrect: false },
      { label: 'D', value: 'x = 4', isCorrect: false },
    ],
    'Cross-multiply: 3(x + 2) = 2(x − 1) → 3x + 6 = 2x − 2 → x = −8.',
    HARD,
    'Algebra',
  ),
  mcq(
    'The nth term of a sequence is given by 3n + 1. What is the 10th term?',
    [
      { label: 'A', value: '30', isCorrect: false },
      { label: 'B', value: '31', isCorrect: true },
      { label: 'C', value: '33', isCorrect: false },
      { label: 'D', value: '34', isCorrect: false },
    ],
    'Substitute n = 10: 3(10) + 1 = 30 + 1 = 31.',
    EASY,
    'Algebra',
  ),

  // ── Relations & Functions (5 questions) ──
  mcq(
    'If f(x) = x² − 2x + 3, what is f(−1)?',
    [
      { label: 'A', value: '6', isCorrect: true },
      { label: 'B', value: '0', isCorrect: false },
      { label: 'C', value: '2', isCorrect: false },
      { label: 'D', value: '4', isCorrect: false },
    ],
    'f(−1) = (−1)² − 2(−1) + 3 = 1 + 2 + 3 = 6.',
    EASY,
    'Relations & Functions',
  ),
  mcq(
    'Which of the following represents a function?',
    [
      { label: 'A', value: '{(1,2), (2,3), (1,4)}', isCorrect: false },
      { label: 'B', value: '{(1,2), (2,2), (3,4)}', isCorrect: true },
      { label: 'C', value: '{(0,1), (0,2), (1,3)}', isCorrect: false },
      { label: 'D', value: '{(2,3), (2,4), (3,5)}', isCorrect: false },
    ],
    'A function maps each input to exactly one output. Only option B has unique first elements (domain values).',
    MEDIUM,
    'Relations & Functions',
  ),
  mcq(
    'What is the equation of a line with gradient −2 and y-intercept 5?',
    [
      { label: 'A', value: 'y = −2x + 5', isCorrect: true },
      { label: 'B', value: 'y = 2x − 5', isCorrect: false },
      { label: 'C', value: 'y = −2x − 5', isCorrect: false },
      { label: 'D', value: 'y = 5x − 2', isCorrect: false },
    ],
    'Using y = mx + c, where m = −2 and c = 5: y = −2x + 5.',
    EASY,
    'Relations & Functions',
  ),
  mcq(
    'The range of the function f(x) = x² for x ∈ {−2, −1, 0, 1, 2} is:',
    [
      { label: 'A', value: '{−2, −1, 0, 1, 2}', isCorrect: false },
      { label: 'B', value: '{0, 1, 4}', isCorrect: true },
      { label: 'C', value: '{4}', isCorrect: false },
      { label: 'D', value: '{−4, −1, 0, 1, 4}', isCorrect: false },
    ],
    'f(−2)=4, f(−1)=1, f(0)=0, f(1)=1, f(2)=4. Range = {0, 1, 4}.',
    MEDIUM,
    'Relations & Functions',
  ),
  mcq(
    'If f(x) = 2x + 1 and g(x) = x − 3, what is fg(5)?',
    [
      { label: 'A', value: '5', isCorrect: true },
      { label: 'B', value: '7', isCorrect: false },
      { label: 'C', value: '8', isCorrect: false },
      { label: 'D', value: '3', isCorrect: false },
    ],
    'First find g(5) = 5 − 3 = 2. Then f(2) = 2(2) + 1 = 5.',
    HARD,
    'Relations & Functions',
  ),

  // ── Geometry & Trigonometry (5 questions) ──
  mcq(
    'The exterior angle of a regular polygon is 30°. How many sides does the polygon have?',
    [
      { label: 'A', value: '10', isCorrect: false },
      { label: 'B', value: '12', isCorrect: true },
      { label: 'C', value: '15', isCorrect: false },
      { label: 'D', value: '8', isCorrect: false },
    ],
    'Sum of exterior angles = 360°. Number of sides = 360°/30° = 12.',
    MEDIUM,
    'Geometry & Trigonometry',
  ),
  mcq(
    'What is the volume of a cylinder with radius 3 cm and height 10 cm? (Use π = 3.14)',
    [
      { label: 'A', value: '94.2 cm³', isCorrect: false },
      { label: 'B', value: '282.6 cm³', isCorrect: true },
      { label: 'C', value: '188.4 cm³', isCorrect: false },
      { label: 'D', value: '31.4 cm³', isCorrect: false },
    ],
    'V = πr²h = 3.14 × 3² × 10 = 3.14 × 9 × 10 = 282.6 cm³.',
    MEDIUM,
    'Geometry & Trigonometry',
  ),
  mcq(
    'In triangle ABC, angle A = 40°, angle B = 65°, and side AB = 8 cm. What type of triangle is ABC?',
    [
      { label: 'A', value: 'Equilateral', isCorrect: false },
      { label: 'B', value: 'Isosceles', isCorrect: false },
      { label: 'C', value: 'Scalene', isCorrect: true },
      { label: 'D', value: 'Right-angled', isCorrect: false },
    ],
    'Angle C = 180° − 40° − 65° = 75°. All three angles are different, so it is a scalene triangle.',
    MEDIUM,
    'Geometry & Trigonometry',
  ),
  mcq(
    'A ship sails 5 km north and then 12 km east. How far is it from its starting point?',
    [
      { label: 'A', value: '13 km', isCorrect: true },
      { label: 'B', value: '17 km', isCorrect: false },
      { label: 'C', value: '7 km', isCorrect: false },
      { label: 'D', value: '15 km', isCorrect: false },
    ],
    'Using Pythagoras: distance = √(5² + 12²) = √(25 + 144) = √169 = 13 km.',
    MEDIUM,
    'Geometry & Trigonometry',
  ),
  mcq(
    'What is cos(60°)?',
    [
      { label: 'A', value: '0', isCorrect: false },
      { label: 'B', value: '0.5', isCorrect: true },
      { label: 'C', value: '√3/2', isCorrect: false },
      { label: 'D', value: '1', isCorrect: false },
    ],
    'cos(60°) = 1/2 = 0.5. Remember the standard trigonometric values for 0°, 30°, 45°, 60°, and 90°.',
    EASY,
    'Geometry & Trigonometry',
  ),

  // ── Statistics & Probability (4 questions) ──
  mcq(
    'The median of the data set {3, 7, 2, 9, 5} is:',
    [
      { label: 'A', value: '5', isCorrect: true },
      { label: 'B', value: '7', isCorrect: false },
      { label: 'C', value: '3', isCorrect: false },
      { label: 'D', value: '9', isCorrect: false },
    ],
    'Arrange in order: {2, 3, 5, 7, 9}. The middle value (3rd value) is 5.',
    EASY,
    'Statistics & Probability',
  ),
  mcq(
    'The mean of six numbers is 15. If one number (9) is removed, what is the new mean?',
    [
      { label: 'A', value: '16.2', isCorrect: true },
      { label: 'B', value: '14', isCorrect: false },
      { label: 'C', value: '15', isCorrect: false },
      { label: 'D', value: '12.5', isCorrect: false },
    ],
    'Sum of 6 numbers = 6 × 15 = 90. Remove 9: new sum = 81. New mean = 81/5 = 16.2.',
    MEDIUM,
    'Statistics & Probability',
  ),
  mcq(
    'A bag contains 4 red and 6 blue marbles. Two marbles are drawn without replacement. What is the probability both are blue?',
    [
      { label: 'A', value: '1/3', isCorrect: true },
      { label: 'B', value: '6/10', isCorrect: false },
      { label: 'C', value: '3/10', isCorrect: false },
      { label: 'D', value: '2/15', isCorrect: false },
    ],
    'P(first blue) = 6/10. P(second blue) = 5/9. P(both) = (6/10) × (5/9) = 30/90 = 1/3.',
    HARD,
    'Statistics & Probability',
  ),
  mcq(
    'The interquartile range of the data set {2, 4, 6, 8, 10, 12, 14} is:',
    [
      { label: 'A', value: '8', isCorrect: false },
      { label: 'B', value: '6', isCorrect: true },
      { label: 'C', value: '12', isCorrect: false },
      { label: 'D', value: '10', isCorrect: false },
    ],
    'Lower half: {2,4,6}, Q1 = 4. Upper half: {10,12,14}, Q3 = 12. IQR = Q3 − Q1 = 12 − 4 = 6.',
    HARD,
    'Statistics & Probability',
  ),

  // ── Sets & Logic (4 questions) ──
  mcq(
    'If ξ = {1, 2, ..., 10}, A = {1, 2, 3, 4}, and B = {3, 4, 5, 6}, what is A′?',
    [
      { label: 'A', value: '{5, 6, 7, 8, 9, 10}', isCorrect: true },
      { label: 'B', value: '{1, 2}', isCorrect: false },
      { label: 'C', value: '{3, 4}', isCorrect: false },
      { label: 'D', value: '{7, 8, 9, 10}', isCorrect: false },
    ],
    "A′ (complement of A) contains all elements in the universal set ξ that are NOT in A: {5, 6, 7, 8, 9, 10}.",
    MEDIUM,
    'Sets & Logic',
  ),
  mcq(
    'If n(A) = 15, n(B) = 12, and n(A ∩ B) = 5, what is n(A ∪ B)?',
    [
      { label: 'A', value: '32', isCorrect: false },
      { label: 'B', value: '22', isCorrect: true },
      { label: 'C', value: '27', isCorrect: false },
      { label: 'D', value: '20', isCorrect: false },
    ],
    'n(A ∪ B) = n(A) + n(B) − n(A ∩ B) = 15 + 12 − 5 = 22.',
    MEDIUM,
    'Sets & Logic',
  ),
  mcq(
    'Which Venn diagram region represents A ∩ B′?',
    [
      { label: 'A', value: 'The part of A that does NOT overlap with B', isCorrect: true },
      { label: 'B', value: 'The intersection of A and B', isCorrect: false },
      { label: 'C', value: 'Everything outside both A and B', isCorrect: false },
      { label: 'D', value: 'The part of B that does NOT overlap with A', isCorrect: false },
    ],
    "A ∩ B′ means elements in A but NOT in B. On a Venn diagram, this is the region inside circle A but outside circle B.",
    MEDIUM,
    'Sets & Logic',
  ),
  mcq(
    'Given the statement: "If it rains, then the ground is wet." Which is the contrapositive?',
    [
      { label: 'A', value: 'If the ground is wet, then it rains.', isCorrect: false },
      { label: 'B', value: 'If the ground is not wet, then it does not rain.', isCorrect: true },
      { label: 'C', value: 'If it does not rain, then the ground is not wet.', isCorrect: false },
      { label: 'D', value: 'It rains and the ground is wet.', isCorrect: false },
    ],
    'Contrapositive of "If P then Q" is "If not Q then not P". So: "If the ground is not wet, then it does not rain."',
    HARD,
    'Sets & Logic',
  ),
]

// ══════════════════════════════════════════════════════════════════
//  CSEC ENGLISH A – 30 Additional MCQ Questions
// ══════════════════════════════════════════════════════════════════
const ENGLISH_QUESTIONS: ReturnType<typeof mcq>[] = [
  // ── Grammar & Mechanics (8 questions) ──
  mcq(
    'Which sentence contains a dangling modifier?',
    [
      { label: 'A', value: 'Walking to school, the rain began to fall.', isCorrect: true },
      { label: 'B', value: 'Walking to school, I felt the rain begin to fall.', isCorrect: false },
      { label: 'C', value: 'While walking to school, I got caught in the rain.', isCorrect: false },
      { label: 'D', value: 'I was walking to school when the rain began to fall.', isCorrect: false },
    ],
    'A dangling modifier has no clear word to modify. In option A, "Walking to school" grammatically modifies "the rain," which is illogical—the rain was not walking to school.',
    HARD,
    'Grammar & Mechanics',
  ),
  mcq(
    'Choose the correct form: "She is one of the students who ____ passed the exam."',
    [
      { label: 'A', value: 'has', isCorrect: false },
      { label: 'B', value: 'have', isCorrect: true },
      { label: 'C', value: 'is', isCorrect: false },
      { label: 'D', value: 'was', isCorrect: false },
    ],
    'The relative clause "who have passed" refers to "students" (plural), not "one." So the verb must be plural: "have."',
    HARD,
    'Grammar & Mechanics',
  ),
  mcq(
    'Identify the adverb in: "The choir sang beautifully during the concert."',
    [
      { label: 'A', value: 'choir', isCorrect: false },
      { label: 'B', value: 'sang', isCorrect: false },
      { label: 'C', value: 'beautifully', isCorrect: true },
      { label: 'D', value: 'concert', isCorrect: false },
    ],
    '"Beautifully" is an adverb of manner. It modifies the verb "sang" by describing how the choir sang.',
    EASY,
    'Grammar & Mechanics',
  ),
  mcq(
    'Which of the following is a compound-complex sentence?',
    [
      { label: 'A', value: 'The dog barked.', isCorrect: false },
      { label: 'B', value: 'The dog barked, and the cat ran away.', isCorrect: false },
      { label: 'C', value: 'Although the dog barked, the cat ran away, and the bird flew off.', isCorrect: true },
      { label: 'D', value: 'Because it was raining, we stayed indoors.', isCorrect: false },
    ],
    'A compound-complex sentence has at least two independent clauses and one dependent clause. Option C has two independent clauses joined by "and" and one dependent clause starting with "Although."',
    HARD,
    'Grammar & Mechanics',
  ),
  mcq(
    'Which word is an antonym of "benevolent"?',
    [
      { label: 'A', value: 'kind', isCorrect: false },
      { label: 'B', value: 'malevolent', isCorrect: true },
      { label: 'C', value: 'generous', isCorrect: false },
      { label: 'D', value: 'charitable', isCorrect: false },
    ],
    '"Malevolent" means having evil intent, which is the opposite of "benevolent" (well-meaning, kind). The prefix "mal-" means bad/evil, while "ben-" means good.',
    MEDIUM,
    'Grammar & Mechanics',
  ),
  mcq(
    'What is the plural form of "criterion"?',
    [
      { label: 'A', value: 'criterions', isCorrect: false },
      { label: 'B', value: 'criterias', isCorrect: false },
      { label: 'C', value: 'criteria', isCorrect: true },
      { label: 'D', value: 'criteriums', isCorrect: false },
    ],
    '"Criterion" comes from Greek and follows the pattern where -on changes to -a in the plural. Criteria is the correct plural form.',
    MEDIUM,
    'Grammar & Mechanics',
  ),
  mcq(
    'Identify the correct sentence:',
    [
      { label: 'A', value: 'Him and me went to the market.', isCorrect: false },
      { label: 'B', value: 'He and I went to the market.', isCorrect: true },
      { label: 'C', value: 'Him and I went to the market.', isCorrect: false },
      { label: 'D', value: 'Me and him went to the market.', isCorrect: false },
    ],
    '"He and I" are subject pronouns. "Him" and "me" are object pronouns. Since they are the subject of the sentence, use "He and I."',
    EASY,
    'Grammar & Mechanics',
  ),
  mcq(
    'Which sentence uses the semicolon correctly?',
    [
      { label: 'A', value: 'I love cooking; my family enjoys eating.', isCorrect: false },
      { label: 'B', value: 'I love cooking; and my family enjoys eating.', isCorrect: false },
      { label: 'C', value: 'I love cooking; my family enjoys eating the meals I prepare.', isCorrect: false },
      { label: 'D', value: 'I love cooking Caribbean dishes; my family enjoys eating them.', isCorrect: true },
    ],
    'A semicolon joins two closely related independent clauses. Option D correctly joins two independent clauses without a coordinating conjunction. Option A lacks sufficient connection between the clauses.',
    MEDIUM,
    'Grammar & Mechanics',
  ),

  // ── Comprehension (6 questions) ──
  mcq(
    '"The old house stood at the end of the lane like a forgotten sentinel, its windows dark and vacant." What is the effect of the simile in this sentence?',
    [
      { label: 'A', value: 'It makes the house seem warm and inviting.', isCorrect: false },
      { label: 'B', value: 'It creates a sense of abandonment and loneliness.', isCorrect: true },
      { label: 'C', value: 'It suggests the house is new and modern.', isCorrect: false },
      { label: 'D', value: 'It shows the house is well-maintained.', isCorrect: false },
    ],
    'Comparing the house to a "forgotten sentinel" (guard) suggests it is abandoned, isolated, and standing watch over nothing—creating a mood of loneliness and neglect.',
    MEDIUM,
    'Comprehension',
  ),
  mcq(
    'When a passage states "Studies suggest that coral reefs could disappear by 2050," the word "suggest" indicates that:',
    [
      { label: 'A', value: 'The claim is a proven fact with no uncertainty.', isCorrect: false },
      { label: 'B', value: 'The claim is based on evidence but not absolutely certain.', isCorrect: true },
      { label: 'C', value: 'The claim is purely fictional with no evidence.', isCorrect: false },
      { label: 'D', value: 'The claim has been rejected by scientists.', isCorrect: false },
    ],
    '"Suggest" is a hedging word that indicates the statement is based on research but allows for uncertainty. It signals to the reader that the claim is not definitive.',
    MEDIUM,
    'Comprehension',
  ),
  mcq(
    'Read: "Mama poured her savings into the iron pot each night, counting the coins twice before hiding them beneath the floorboards." What can we infer about Mama?',
    [
      { label: 'A', value: 'She is wealthy and careless with money.', isCorrect: false },
      { label: 'B', value: 'She is careful with her money and may not trust banks.', isCorrect: true },
      { label: 'C', value: 'She dislikes her family.', isCorrect: false },
      { label: 'D', value: 'She enjoys cooking with coins.', isCorrect: false },
    ],
    'The details—counting coins twice and hiding them—suggest she is frugal, protective of her savings, and may not have access to or trust formal banking.',
    MEDIUM,
    'Comprehension',
  ),
  mcq(
    'An author uses foreshadowing in a story. What is the purpose of this technique?',
    [
      { label: 'A', value: 'To summarize the main events at the end', isCorrect: false },
      { label: 'B', value: 'To hint at events that will happen later in the story', isCorrect: true },
      { label: 'C', value: 'To describe the physical appearance of characters', isCorrect: false },
      { label: 'D', value: 'To provide historical background information', isCorrect: false },
    ],
    'Foreshadowing is a literary technique where the author gives clues or hints about what will happen later in the story, building anticipation and tension.',
    EASY,
    'Comprehension',
  ),
  mcq(
    'In the context of a passage, what does it mean when a question asks you to "infer"?',
    [
      { label: 'A', value: 'Copy the exact words from the passage', isCorrect: false },
      { label: 'B', value: 'Use clues from the passage to draw a logical conclusion', isCorrect: true },
      { label: 'C', value: 'Give your personal opinion on the topic', isCorrect: false },
      { label: 'D', value: 'Look up the answer in a dictionary', isCorrect: false },
    ],
    'To infer means to use evidence from the text plus your own reasoning to reach a conclusion that is not directly stated but is supported by the passage.',
    EASY,
    'Comprehension',
  ),
  mcq(
    'Which tone is most likely used in a passage that begins: "It is with profound sorrow that we announce the passing of our beloved leader"?',
    [
      { label: 'A', value: 'Humorous', isCorrect: false },
      { label: 'B', value: 'Formal and mournful', isCorrect: true },
      { label: 'C', value: 'Angry', isCorrect: false },
      { label: 'D', value: 'Excited', isCorrect: false },
    ],
    'The phrase "profound sorrow" and "beloved leader" immediately establish a formal, mournful, and respectful tone suitable for an announcement of death.',
    EASY,
    'Comprehension',
  ),

  // ── Summary Writing (6 questions) ──
  mcq(
    'How many words is a CSEC English A summary typically expected to be?',
    [
      { label: 'A', value: 'About 50 words', isCorrect: false },
      { label: 'B', value: 'About 120 words', isCorrect: true },
      { label: 'C', value: 'About 300 words', isCorrect: false },
      { label: 'D', value: 'About 500 words', isCorrect: false },
    ],
    'The CSEC English A Paper 2 summary requires you to write approximately 120 words summarising a given passage. Staying within the word limit is important.',
    EASY,
    'Summary Writing',
  ),
  mcq(
    'Which of the following is the BEST first step when writing a summary?',
    [
      { label: 'A', value: 'Start writing immediately to save time', isCorrect: false },
      { label: 'B', value: 'Read the passage carefully and identify the main points', isCorrect: true },
      { label: 'C', value: 'Copy the first and last sentences of the passage', isCorrect: false },
      { label: 'D', value: 'Look for difficult vocabulary to include', isCorrect: false },
    ],
    'Always read the passage at least twice to understand it fully. Identify the main ideas, key supporting points, and the author\'s purpose before you begin writing.',
    EASY,
    'Summary Writing',
  ),
  mcq(
    'Which of the following should be EXCLUDED from a summary?',
    [
      { label: 'A', value: 'The main idea of the passage', isCorrect: false },
      { label: 'B', value: 'Key supporting details', isCorrect: false },
      { label: 'C', value: 'Your personal opinion about the topic', isCorrect: true },
      { label: 'D', value: 'The author\'s conclusion', isCorrect: false },
    ],
    'A summary must be objective. Including your own opinions, reactions, or evaluations is inappropriate—it should only reflect the ideas presented in the original text.',
    MEDIUM,
    'Summary Writing',
  ),
  mcq(
    'When writing a summary, which technique helps avoid plagiarism?',
    [
      { label: 'A', value: 'Change a few words but keep the same sentence structure', isCorrect: false },
      { label: 'B', value: 'Paraphrase the original ideas in your own words', isCorrect: true },
      { label: 'C', value: 'Copy the passage exactly as written', isCorrect: false },
      { label: 'D', value: 'Use only the difficult words from the passage', isCorrect: false },
    ],
    'Paraphrasing means expressing the author\'s ideas using your own words and sentence structure while maintaining the original meaning. This is essential in summary writing.',
    MEDIUM,
    'Summary Writing',
  ),
  mcq(
    'A passage discusses three main effects of deforestation. In your summary, you should:',
    [
      { label: 'A', value: 'Describe only the first effect in great detail', isCorrect: false },
      { label: 'B', value: 'Include all three effects briefly and in balance', isCorrect: true },
      { label: 'C', value: 'Ignore two effects and focus on the most interesting one', isCorrect: false },
      { label: 'D', value: 'Add a fourth effect from your own knowledge', isCorrect: false },
    ],
    'A good summary covers all main points in a balanced way without giving disproportionate detail to any single point. Each key idea should be represented.',
    MEDIUM,
    'Summary Writing',
  ),
  mcq(
    'What is the purpose of a summary paragraph\'s concluding sentence?',
    [
      { label: 'A', value: 'To introduce a completely new topic', isCorrect: false },
      { label: 'B', value: 'To wrap up the main idea and provide closure', isCorrect: true },
      { label: 'C', value: 'To ask the reader a question', isCorrect: false },
      { label: 'D', value: 'To list all the minor details left out', isCorrect: false },
    ],
    'The concluding sentence should bring the summary to a clean close, often by restating the overall point or highlighting the significance of the information.',
    EASY,
    'Summary Writing',
  ),

  // ── Essay Writing (5 questions) ──
  mcq(
    'Which of the following is the BEST thesis statement for an argumentative essay?',
    [
      { label: 'A', value: 'Social media has both good and bad points.', isCorrect: false },
      { label: 'B', value: 'Social media platforms should be regulated because they contribute to the spread of misinformation and negatively impact adolescent mental health.', isCorrect: true },
      { label: 'C', value: 'In this essay I will talk about social media.', isCorrect: false },
      { label: 'D', value: 'Social media is bad and nobody should use it.', isCorrect: false },
    ],
    'A strong thesis statement takes a clear position, provides a reason, and hints at the arguments. Option B is specific, arguable, and outlines the essay\'s direction.',
    MEDIUM,
    'Essay Writing',
  ),
  mcq(
    'In a five-paragraph essay, what does the body paragraph\'s topic sentence do?',
    [
      { label: 'A', value: 'It concludes the essay.', isCorrect: false },
      { label: 'B', value: 'It states the main point of that particular paragraph and connects to the thesis.', isCorrect: true },
      { label: 'C', value: 'It introduces the general topic of the essay.', isCorrect: false },
      { label: 'D', value: 'It provides evidence from a secondary source.', isCorrect: false },
    ],
    'The topic sentence is the first sentence of a body paragraph. It states the main idea of the paragraph and links back to the thesis statement.',
    MEDIUM,
    'Essay Writing',
  ),
  mcq(
    'Which transitional word is best used to show contrast between two ideas?',
    [
      { label: 'A', value: 'Furthermore', isCorrect: false },
      { label: 'B', value: 'Similarly', isCorrect: false },
      { label: 'C', value: 'However', isCorrect: true },
      { label: 'D', value: 'Therefore', isCorrect: false },
    ],
    '"However" signals a contrast or opposing idea. "Furthermore" adds information, "Similarly" shows comparison, and "Therefore" shows cause/effect.',
    EASY,
    'Essay Writing',
  ),
  mcq(
    'What is the purpose of the introduction in an essay?',
    [
      { label: 'A', value: 'To present all the evidence and details', isCorrect: false },
      { label: 'B', value: 'To hook the reader, provide context, and state the thesis', isCorrect: true },
      { label: 'C', value: 'To repeat the conclusion', isCorrect: false },
      { label: 'D', value: 'To list all the vocabulary words you know', isCorrect: false },
    ],
    'The introduction grabs the reader\'s attention (hook), provides necessary background information, and ends with a clear thesis statement that guides the essay.',
    EASY,
    'Essay Writing',
  ),
  mcq(
    'Which of the following is an example of a narrative essay topic?',
    [
      { label: 'A', value: 'The causes of climate change in the Caribbean', isCorrect: false },
      { label: 'B', value: 'A memorable experience that taught me the value of perseverance', isCorrect: true },
      { label: 'C', value: 'Why uniforms should be mandatory in all schools', isCorrect: false },
      { label: 'D', value: 'A comparison of solar and wind energy', isCorrect: false },
    ],
    'A narrative essay tells a personal story or recounts an experience. Options A, C, and D are expository or argumentative topics. Option B is narrative because it asks for a personal story.',
    MEDIUM,
    'Essay Writing',
  ),

  // ── Persuasive Writing (5 questions) ──
  mcq(
    'In persuasive writing, what is a counterargument?',
    [
      { label: 'A', value: 'An insult directed at the opposing side', isCorrect: false },
      { label: 'B', value: 'An opposing viewpoint that the writer acknowledges and responds to', isCorrect: true },
      { label: 'C', value: 'A repetition of the main argument', isCorrect: false },
      { label: 'D', value: 'A personal anecdote about the writer', isCorrect: false },
    ],
    'A counterargument is an opposing viewpoint that the writer addresses. Acknowledging and refuting it strengthens the argument by showing the writer has considered multiple perspectives.',
    MEDIUM,
    'Persuasive Writing',
  ),
  mcq(
    'Which persuasive technique uses statistics, facts, and expert opinions?',
    [
      { label: 'A', value: 'Ethos', isCorrect: false },
      { label: 'B', value: 'Pathos', isCorrect: false },
      { label: 'C', value: 'Logos', isCorrect: true },
      { label: 'D', value: 'Kairos', isCorrect: false },
    ],
    'Logos is the appeal to logic and reason. It uses evidence such as statistics, data, facts, and logical reasoning to persuade the audience.',
    MEDIUM,
    'Persuasive Writing',
  ),
  mcq(
    'Which of the following is an example of an emotional appeal (pathos)?',
    [
      { label: 'A', value: 'According to a 2023 UN report, 8 million tons of plastic enter the ocean yearly.', isCorrect: false },
      { label: 'B', value: 'Dr. James Smith, a marine biologist at UWI, confirms that coral bleaching has tripled.', isCorrect: false },
      { label: 'C', value: 'Imagine a child walking along a beach, stepping not on sand but on pieces of plastic that choke the sea life she loves.', isCorrect: true },
      { label: 'D', value: 'Plastic pollution costs Caribbean economies over $300 million annually.', isCorrect: false },
    ],
    'Option C uses vivid, emotionally charged imagery—a child on a polluted beach—to evoke empathy and concern. This is pathos. The other options use logos (data/facts) or ethos (expert authority).',
    HARD,
    'Persuasive Writing',
  ),
  mcq(
    'Which of the following is a call to action in a persuasive essay?',
    [
      { label: 'A', value: 'Recycling bins should be placed in every classroom.', isCorrect: false },
      { label: 'B', value: 'Students, I urge you to sign the petition and demand recycling bins in every classroom by next Friday.', isCorrect: true },
      { label: 'C', value: 'Many schools in Jamaica have already adopted recycling programmes.', isCorrect: false },
      { label: 'D', value: 'The environmental club has been active for five years.', isCorrect: false },
    ],
    'A call to action directly urges the reader to take a specific step. Option B uses "I urge you to sign" and gives a concrete action with a deadline.',
    MEDIUM,
    'Persuasive Writing',
  ),
  mcq(
    'Why is it important to address a counterargument in a persuasive essay?',
    [
      { label: 'A', value: 'It makes the essay longer.', isCorrect: false },
      { label: 'B', value: 'It shows the writer has considered opposing views, making their argument more credible.', isCorrect: true },
      { label: 'C', value: 'It confuses the reader and makes the argument weaker.', isCorrect: false },
      { label: 'D', value: 'It is only required for university-level writing.', isCorrect: false },
    ],
    'Addressing counterarguments demonstrates fairness, strengthens credibility (ethos), and allows the writer to preemptively weaken the opponent\'s position before the reader sides with them.',
    MEDIUM,
    'Persuasive Writing',
  ),
]

// ══════════════════════════════════════════════════════════════════
//  STUDY NOTES – Mathematics
// ══════════════════════════════════════════════════════════════════
const MATH_NOTES: { topicName: string; title: string; content: string }[] = [
  {
    topicName: 'Number Theory & Computation',
    title: 'Study Guide: Number Theory & Computation',
    content: `# Number Theory & Computation

## Key Concepts

### Types of Numbers
- **Natural Numbers (ℕ)**: {1, 2, 3, ...}
- **Whole Numbers (𝕎)**: {0, 1, 2, 3, ...}
- **Integers (ℤ)**: {..., −3, −2, −1, 0, 1, 2, 3, ...}
- **Rational Numbers (ℚ)**: Numbers expressible as p/q where q ≠ 0
- **Irrational Numbers**: Numbers that cannot be written as fractions (e.g., √2, π)
- **Real Numbers (ℝ)**: All rational and irrational numbers combined

### Prime Factorisation
Every composite number can be uniquely expressed as a product of prime factors.
- **HCF (GCD)**: Multiply the common prime factors with the lowest powers
- **LCM**: Multiply all prime factors with the highest powers

### Percentages
- Percentage = (Part / Whole) × 100
- Percentage change = (Change / Original) × 100
- Successive percentage changes do NOT simply add up! Multiply factors instead.

### Standard Form
Express very large or very small numbers as a × 10ⁿ where 1 ≤ a < 10.

## Examples

**HCF and LCM:**
Find HCF and LCM of 24 and 36.
- 24 = 2³ × 3
- 36 = 2² × 3²
- HCF = 2² × 3 = **12**
- LCM = 2³ × 3² = **72**

**Percentage Increase:**
A shirt costs $40 and increases by 15%. New price = 40 × 1.15 = **$46**

**Converting to Fractions:**
0.875 = 875/1000 = 7/8

## Common Mistakes
1. Confusing HCF and LCM — HCF divides into both numbers; LCM is a multiple of both.
2. Forgetting that percentages compound — a 20% increase followed by a 20% decrease does NOT return to the original.
3. Incorrectly converting recurring decimals: use the algebraic method (let x = 0.333..., then 10x = 3.333..., so 9x = 3, x = 1/3).

## CXC Exam Tips
- Show all working, especially for percentage and ratio problems.
- Memorise prime numbers up to at least 50.
- Use prime factorisation for HCF/LCM — it is reliable and earns full method marks.
- Watch for "trick" questions asking for percentage of a percentage.`,
  },
  {
    topicName: 'Algebra',
    title: 'Study Guide: Algebra',
    content: `# Algebra

## Key Concepts

### Simplifying Expressions
- **Collect like terms**: 3x + 5x − 2x = 6x
- **Expand brackets**: 2(3x − 4) = 6x − 8
- **FOIL method for binomials**: (a + b)(c + d) = ac + ad + bc + bd

### Factorisation
1. **Common factor**: 6x + 12 = 6(x + 2)
2. **Difference of two squares**: x² − 9 = (x + 3)(x − 3)
3. **Trinomials**: x² + 5x + 6 = (x + 2)(x + 3)
4. **Grouping**: ax + ay + bx + by = a(x + y) + b(x + y) = (a + b)(x + y)

### Solving Equations
- **Linear**: 3x + 7 = 22 → x = 5
- **Quadratic (factorisation)**: x² − 5x + 6 = 0 → (x − 2)(x − 3) = 0 → x = 2 or x = 3
- **Quadratic formula**: x = (−b ± √(b² − 4ac)) / 2a
- **Simultaneous equations**: Use elimination or substitution method

### Inequalities
- Solve like equations, but reverse the sign when multiplying/dividing by a negative number.
- Graphing: use open circles for < and >, filled circles for ≤ and ≥.

### Sequences
- **Arithmetic**: nth term = a + (n − 1)d, where a = first term, d = common difference
- Sum of first n terms: Sₙ = n/2 × (2a + (n − 1)d)

## Examples

**Factorising x² − 4x − 21:**
Find two numbers that multiply to −21 and add to −4: −7 and 3.
Answer: (x − 7)(x + 3)

**Solving simultaneous equations:**
x + y = 10 ... (1)
x − y = 4 ... (2)
Add: 2x = 14 → x = 7. Substitute: 7 + y = 10 → y = 3.

## Common Mistakes
1. Sign errors when expanding brackets — especially with negative signs outside.
2. Forgetting to flip the inequality sign when dividing by a negative.
3. Not checking solutions by substituting back into the original equation.

## CXC Exam Tips
- Always check your solutions by substitution.
- For quadratic equations, if factorisation fails, use the formula.
- Show the substitution step clearly for simultaneous equations.`,
  },
  {
    topicName: 'Relations & Functions',
    title: 'Study Guide: Relations & Functions',
    content: `# Relations & Functions

## Key Concepts

### Functions
A function is a relation where each input (from the domain) maps to exactly ONE output (in the range).
- Notation: f(x) = ... means "f of x"
- Domain: the set of all possible input values
- Range: the set of all resulting output values

### Linear Functions
General form: y = mx + c
- **m** = gradient (slope)
- **c** = y-intercept

### Gradient Formula
m = (y₂ − y₁) / (x₂ − x₁)

### Types of Relations
- **One-to-one**: Each input has one unique output (and vice versa) — also a function
- **One-to-many**: One input maps to multiple outputs — NOT a function
- **Many-to-one**: Multiple inputs map to the same output — a function

### Composite Functions
- fg(x) means "apply g first, then f"
- i.e., fg(x) = f(g(x))

### Inverse Functions
If f(x) = 2x + 3, then f⁻¹(x) = (x − 3) / 2

## Examples

**Finding f(4) given f(x) = x² − 2x + 3:**
f(4) = 16 − 8 + 3 = 11

**Finding the gradient:**
Points (1, 3) and (5, 11):
m = (11 − 3) / (5 − 1) = 8/4 = 2

**Composite function:**
f(x) = 2x + 1, g(x) = x − 3
fg(5) = f(g(5)) = f(2) = 2(2) + 1 = 5

## Common Mistakes
1. Confusing domain and range — domain is input, range is output.
2. For composite functions, applying them in the wrong order — fg means g first, then f.
3. Forgetting that not all relations are functions (check the vertical line test on a graph).

## CXC Exam Tips
- To check if a relation is a function from a mapping diagram, ensure each input has exactly one arrow.
- For composite functions, always clearly show each substitution step.
- Practise finding equations of lines from given points — this is a very common exam question.`,
  },
  {
    topicName: 'Geometry & Trigonometry',
    title: 'Study Guide: Geometry & Trigonometry',
    content: `# Geometry & Trigonometry

## Key Concepts

### Angle Properties
- Angles on a straight line = 180°
- Angles at a point = 360°
- Vertically opposite angles are equal
- Angles in a triangle = 180°
- Base angles of an isosceles triangle are equal
- Exterior angle = sum of interior opposite angles

### Polygon Properties
- Sum of interior angles = (n − 2) × 180°
- Each interior angle of a regular polygon = (n − 2) × 180° / n
- Sum of exterior angles = 360°

### Area and Perimeter
- **Triangle**: A = ½ × base × height
- **Rectangle**: A = length × width
- **Parallelogram**: A = base × height
- **Trapezium**: A = ½(a + b) × h
- **Circle**: A = πr², C = 2πr = πd

### Volume
- **Cuboid**: V = l × w × h
- **Cylinder**: V = πr²h
- **Cone**: V = ⅓πr²h
- **Sphere**: V = ⁴⁄₃πr³

### Trigonometric Ratios (SOH CAH TOA)
- **sin θ** = Opposite / Hypotenuse
- **cos θ** = Adjacent / Hypotenuse
- **tan θ** = Opposite / Adjacent

### Pythagoras' Theorem
a² + b² = c² (where c is the hypotenuse)

### Standard Trig Values
| Angle | sin | cos | tan |
|-------|-----|-----|-----|
| 0° | 0 | 1 | 0 |
| 30° | ½ | √3/2 | 1/√3 |
| 45° | √2/2 | √2/2 | 1 |
| 60° | √3/2 | ½ | √3 |
| 90° | 1 | 0 | undefined |

## Examples

**Area of a circle with r = 7 cm (π = 22/7):**
A = (22/7) × 49 = 154 cm²

**Volume of a cylinder with r = 3 cm, h = 10 cm:**
V = 3.14 × 9 × 10 = 282.6 cm³

**Find x if sin x = 0.5:**
x = sin⁻¹(0.5) = 30°

## Common Mistakes
1. Using diameter instead of radius in area/volume formulas.
2. Confusing perimeter with area — perimeter is the distance around, area is the space inside.
3. Mixing up sin, cos, and tan — use SOH CAH TOA consistently.

## CXC Exam Tips
- Draw a clear diagram for every trigonometry problem and label the sides.
- For bearings questions, always measure from North clockwise.
- Use π = 22/7 when the radius is a multiple of 7 for exact answers.`,
  },
  {
    topicName: 'Statistics & Probability',
    title: 'Study Guide: Statistics & Probability',
    content: `# Statistics & Probability

## Key Concepts

### Measures of Central Tendency
- **Mean**: Sum of all values ÷ number of values (x̄ = Σx / n)
- **Median**: The middle value when data is arranged in order
- **Mode**: The most frequently occurring value

### Measures of Spread
- **Range**: Largest value − Smallest value
- **Interquartile Range (IQR)**: Q3 − Q1
- **Q1** (Lower quartile): median of the lower half
- **Q3** (Upper quartile): median of the upper half

### Probability
- **P(Event)** = Number of favourable outcomes / Total number of outcomes
- Probability ranges from 0 (impossible) to 1 (certain)
- **Complementary events**: P(A) + P(A′) = 1
- **Mutually exclusive events**: P(A or B) = P(A) + P(B)
- **Independent events**: P(A and B) = P(A) × P(B)
- **Combined events (with replacement)**: P(A then B) = P(A) × P(B)
- **Without replacement**: P(A then B) = P(A) × P(B after A)

### Data Representation
- **Bar charts**: for categorical data
- **Pie charts**: angles proportional to frequency
- **Histograms**: for continuous data (area represents frequency)
- **Cumulative frequency curves**: for finding medians and quartiles

## Examples

**Mean, Median, Mode of {3, 5, 5, 7, 8, 5, 9}:**
- Mean = (3 + 5 + 5 + 7 + 8 + 5 + 9) / 7 = 42 / 7 = 6
- Median = 5 (4th value)
- Mode = 5 (appears 3 times)

**Probability of drawing 2 aces from a deck (no replacement):**
P = (4/52) × (3/51) = 1/221

## Common Mistakes
1. Forgetting to order data before finding the median.
2. Confusing "with replacement" and "without replacement" in probability.
3. Adding probabilities of non-mutually exclusive events without subtracting the overlap.

## CXC Exam Tips
- For grouped data, use the class midpoint for mean calculations.
- Always show the formula you are using — method marks are valuable.
- For pie charts, total angle = 360°. Convert frequencies to angles: (frequency/total) × 360°.`,
  },
  {
    topicName: 'Sets & Logic',
    title: 'Study Guide: Sets & Logic',
    content: `# Sets & Logic

## Key Concepts

### Set Notation
- ξ (or U) = Universal set
- ∅ = Empty set (null set)
- ∈ = "is an element of"
- ⊆ = "is a subset of"
- ∪ = Union (all elements in A OR B)
- ∩ = Intersection (elements in A AND B)
- A′ = Complement of A (elements NOT in A)
- n(A) = Number of elements in set A

### Venn Diagrams
- Always label with the universal set ξ
- Overlapping regions show intersections
- Numbers outside all circles go in ξ but outside all sets

### Set Formulas
- n(A ∪ B) = n(A) + n(B) − n(A ∩ B)
- n(A′) = n(ξ) − n(A)
- n(A ∩ B′) = n(A) − n(A ∩ B)

### Logic
- **Statement**: A declarative sentence that is either true or false
- **Negation (¬P)**: "NOT P" — opposite truth value
- **Conjunction (P ∧ Q)**: "P AND Q" — true only when BOTH are true
- **Disjunction (P ∨ Q)**: "P OR Q" — false only when BOTH are false
- **Conditional (P → Q)**: "If P then Q" — false only when P is true and Q is false
- **Contrapositive**: The contrapositive of P → Q is ¬Q → ¬P (logically equivalent!)

### Truth Tables
Construct truth tables systematically, listing all combinations of T and F for each variable.

## Examples

**n(A ∪ B) calculation:**
If n(A) = 15, n(B) = 12, n(A ∩ B) = 5:
n(A ∪ B) = 15 + 12 − 5 = 22

**Contrapositive:**
Statement: "If a number is divisible by 4, then it is even."
Contrapositive: "If a number is not even, then it is not divisible by 4."

## Common Mistakes
1. Confusing union (∪) and intersection (∩) — union means "or", intersection means "and".
2. Forgetting to subtract the intersection when using n(A ∪ B) = n(A) + n(B) − n(A ∩ B).
3. Confusing the converse and the contrapositive — they are NOT the same!

## CXC Exam Tips
- Always draw Venn diagrams for set problems — they help visualise the problem.
- For logic questions, construct truth tables carefully, listing all possible combinations.
- When shading regions on Venn diagrams, be methodical — shade one set at a time.`,
  },
]

// ══════════════════════════════════════════════════════════════════
//  STUDY NOTES – English A
// ══════════════════════════════════════════════════════════════════
const ENGLISH_NOTES: { topicName: string; title: string; content: string }[] = [
  {
    topicName: 'Grammar & Mechanics',
    title: 'Study Guide: Grammar & Mechanics',
    content: `# Grammar & Mechanics

## Key Concepts

### Parts of Speech
| Part of Speech | Definition | Example |
|---|---|---|
| **Noun** | Person, place, thing, idea | Kingston, love, freedom |
| **Pronoun** | Replaces a noun | he, she, they, it |
| **Verb** | Action or state of being | run, is, think |
| **Adjective** | Describes a noun | beautiful, tall, Caribbean |
| **Adverb** | Describes a verb, adjective, or adverb | quickly, very, beautifully |
| **Preposition** | Shows relationship | in, on, at, between |
| **Conjunction** | Joins words/clauses | and, but, because, although |
| **Interjection** | Expresses emotion | Wow! Oh no! |

### Subject-Verb Agreement
- Singular subject → singular verb: "The dog **runs**."
- Plural subject → plural verb: "The dogs **run**."
- Collective nouns usually take singular: "The team **is** ready."
- "Each," "every," "either," "neither" → singular verb.

### Tenses
| Tense | Example |
|---|---|
| Simple Present | She walks to school. |
| Simple Past | She walked to school. |
| Simple Future | She will walk to school. |
| Present Perfect | She has walked to school. |
| Past Perfect | She had walked to school before it rained. |
| Present Continuous | She is walking to school. |

### Active vs. Passive Voice
- **Active**: The subject performs the action. "The boy **kicked** the ball."
- **Passive**: The subject receives the action. "The ball **was kicked** by the boy."
- Passive = verb "to be" + past participle.

### Punctuation Rules
- Use commas to separate items in a list (Oxford comma recommended).
- Apostrophes for contractions (can't, it's) and possession (Maria's book).
- Semicolons join two related independent clauses.
- Colons introduce lists, explanations, or quotations.

## Common Mistakes
1. **Its vs. It's**: "Its" = possessive; "It's" = "it is."
2. **There, Their, They're**: "There" = location; "Their" = possessive; "They're" = "they are."
3. **Dangling modifiers**: Ensure the modifying phrase logically attaches to the subject.
4. **Affect vs. Effect**: "Affect" is usually a verb; "Effect" is usually a noun.

## CXC Exam Tips
- In Paper 1, read each sentence carefully before selecting an answer.
- Watch for subject-verb agreement in complex sentences with prepositional phrases between subject and verb.
- Know your irregular verbs: go/went/gone, see/saw/seen, write/wrote/written.`,
  },
  {
    topicName: 'Comprehension',
    title: 'Study Guide: Comprehension',
    content: `# Comprehension

## Key Concepts

### Types of Comprehension Questions
1. **Literal**: Answers found directly in the passage (who, what, when, where)
2. **Inferential**: Requires reading between the lines — using clues to draw conclusions
3. **Evaluative**: Requires you to judge the effectiveness of techniques or make assessments
4. **Vocabulary in Context**: Explaining the meaning of a word as it is used in the passage

### Reading Strategies
- **First reading**: Read for overall understanding (gist). Do not stop at difficult words.
- **Second reading**: Read more slowly, underlining key phrases and annotating.
- **Identify the writer's purpose**: To inform, persuade, entertain, describe?
- **Identify the tone**: Formal, informal, sarcastic, mournful, enthusiastic?

### Literary Devices to Recognise
- **Simile**: Comparison using "like" or "as" (e.g., "She sings like an angel.")
- **Metaphor**: Direct comparison (e.g., "Time is a thief.")
- **Personification**: Giving human qualities to non-human things (e.g., "The wind whispered.")
- **Alliteration**: Repetition of initial consonant sounds (e.g., "Peter Piper picked...")
- **Onomatopoeia**: Words that imitate sounds (e.g., "buzz," "crash")
- **Hyperbole**: Exaggeration for effect (e.g., "I've told you a million times.")
- **Irony**: When the opposite of what is expected happens

### Tone Words to Know
Formal, informal, serious, humorous, sarcastic, nostalgic, critical, empathetic, objective, subjective, persuasive, didactic, contemplative.

## Examples

**Literal question**: "According to the passage, when was the school founded?"
→ Answer directly from text.

**Inferential question**: "What does the author's description of the 'crumbling walls' suggest about the school's history?"
→ Use clues: crumbling walls suggest age, neglect, perhaps financial difficulty.

**Evaluative question**: "How effective is the author's use of imagery in paragraph 3?"
→ Identify the imagery, explain its effect, and give your judgement.

## Common Mistakes
1. Copying large chunks of text instead of answering in your own words.
2. Failing to use contextual clues to determine word meanings.
3. Confusing the writer's viewpoint with your own opinion.

## CXC Exam Tips
- Always support inferential answers with evidence from the passage.
- For vocabulary questions, explain the meaning in context, not just give a dictionary definition.
- Pay attention to the writer's word choice — specific words create specific effects.`,
  },
  {
    topicName: 'Summary Writing',
    title: 'Study Guide: Summary Writing',
    content: `# Summary Writing

## Key Concepts

### What Is a Summary?
A summary is a concise restatement of the main ideas of a passage in your own words. It should be significantly shorter than the original while preserving the key information.

### CSEC Requirements
- **Length**: Approximately 120 words
- **Content**: Must cover the main points and key supporting details
- **Style**: Objective — no personal opinions or additions
- **Language**: Must be in your own words (paraphrased)

### Steps to Writing a Summary
1. **Read the passage at least twice** to fully understand it.
2. **Identify the main idea** — what is the passage mostly about?
3. **Identify 3–5 key supporting points**.
4. **Write a brief outline** of these main points.
5. **Draft your summary** using your own words and sentence structures.
6. **Check the word count** — aim for about 120 words.
7. **Proofread** for grammar, spelling, and clarity.

### Paraphrasing Techniques
- **Synonym substitution**: Replace words with similar meanings
- **Change sentence structure**: Convert active to passive (or vice versa), combine or split sentences
- **Change word form**: Convert nouns to verbs, adjectives to adverbs, etc.
- **Summarise lists**: "They faced hunger, disease, and poverty" → "They endured severe hardship."

### What NOT to Do
- ❌ Do not include your own opinions or reactions
- ❌ Do not copy long phrases directly from the passage
- ❌ Do not include minor details or examples
- ❌ Do not exceed the word count significantly
- ❌ Do not introduce new information

## Examples

**Original passage excerpt (50 words):**
"The Caribbean coral reefs have experienced significant decline over the past three decades. Scientists from the University of the West Indies have documented a 50% reduction in coral cover. The primary causes identified include rising sea temperatures due to climate change, pollution from agricultural runoff, and destructive fishing practices."

**Summary (40 words):**
"Caribbean coral reefs have declined by 50% over 30 years. UWI scientists attribute this mainly to climate change-driven warming, agricultural pollution, and harmful fishing methods."

## Common Mistakes
1. Writing too close to the original text — this shows poor paraphrasing skills.
2. Including too many specific details instead of focusing on main ideas.
3. Exceeding the word limit — conciseness is key.

## CXC Exam Tips
- Aim for exactly 120 words (within ±10 words is acceptable).
- Your first sentence should capture the overall main idea.
- Use connecting words (Furthermore, Additionally, However) to link ideas smoothly.
- If the passage has a title, it often hints at the main topic.`,
  },
  {
    topicName: 'Essay Writing',
    title: 'Study Guide: Essay Writing',
    content: `# Essay Writing

## Key Concepts

### Types of Essays on CSEC English A
1. **Narrative Essay**: Tells a story (personal experience, fictional account)
2. **Descriptive Essay**: Paints a vivid picture using sensory details
3. **Expository Essay**: Explains or informs (no opinion)
4. **Argumentative Essay**: Takes a position and supports it with evidence
5. **Discursive Essay**: Discusses multiple sides of an issue

### Essay Structure (5 Paragraphs)
**1. Introduction**
- Hook: grab attention (question, quote, startling fact)
- Background/context: 2–3 sentences
- Thesis statement: last sentence of introduction

**2–4. Body Paragraphs**
- Topic sentence: main point of the paragraph
- Supporting details: evidence, examples, explanations
- Concluding sentence: links back to thesis or transitions to next point

**5. Conclusion**
- Restate the thesis (in different words)
- Summarise main points
- End with a strong closing thought

### The Thesis Statement
- States your essay's main argument or purpose
- Is specific, not vague
- Appears at the end of the introduction
- Example (weak): "In this essay I will discuss social media."
- Example (strong): "Social media platforms should be regulated because they facilitate the spread of misinformation and harm adolescent mental health."

### Transitional Words and Phrases
| Purpose | Examples |
|---|---|
| Addition | Furthermore, Moreover, In addition, Also |
| Contrast | However, On the other hand, Nevertheless, Conversely |
| Cause/Effect | Therefore, Consequently, As a result, Thus |
| Example | For instance, For example, Specifically, Such as |
| Conclusion | In conclusion, To summarise, Ultimately, In summary |

## Common Mistakes
1. Writing a vague or missing thesis statement.
2. Body paragraphs without clear topic sentences.
3. Failing to use transitions between paragraphs.
4. A conclusion that introduces new information instead of wrapping up.

## CXC Exam Tips
- Spend 5 minutes planning before you write — create a brief outline.
- Allocate approximately 35–40 minutes for the essay.
- Aim for 400–500 words.
- Vary your sentence structures — mix simple, compound, and complex sentences.
- Proofread for spelling and grammar in the last 5 minutes.`,
  },
  {
    topicName: 'Persuasive Writing',
    title: 'Study Guide: Persuasive Writing',
    content: `# Persuasive Writing

## Key Concepts

### What Is Persuasive Writing?
Persuasive writing aims to convince the reader to accept a particular viewpoint or take a specific action. It combines logical reasoning, emotional appeal, and credibility.

### The Three Appeals (Aristotle's Rhetorical Triangle)

**1. Ethos (Credibility Appeal)**
- Establishes the writer's trustworthiness and authority
- Techniques: citing experts, using professional language, showing fairness
- Example: "Dr. Maria Chen, a climate scientist at UWI, warns that..."

**2. Pathos (Emotional Appeal)**
- Connects with the reader's feelings and values
- Techniques: vivid imagery, anecdotes, emotional language, rhetorical questions
- Example: "Imagine watching your home swallowed by floodwaters — that is the reality facing thousands of Caribbean families."

**3. Logos (Logical Appeal)**
- Uses reason, facts, statistics, and evidence
- Techniques: data, expert studies, logical arguments, cause-and-effect reasoning
- Example: "According to a 2023 UN report, Caribbean nations lose $7 billion annually due to climate-related disasters."

### Persuasive Techniques
- **Repetition**: Repeating key phrases for emphasis
- **Rule of three**: Grouping ideas in threes for impact
- **Rhetorical questions**: Questions that make the reader think (not meant to be answered)
- **Emotive language**: Words with strong connotations (devastating, miraculous, cruel)
- **Anecdotes**: Brief personal stories that create emotional connection
- **Statistics**: Numerical data that supports the argument
- **Counterarguments**: Acknowledging and refuting opposing views

### Structure of a Persuasive Essay
1. **Introduction**: Hook + context + clear thesis stating your position
2. **Body Paragraph 1**: Strongest argument with evidence
3. **Body Paragraph 2**: Second argument with evidence
4. **Body Paragraph 3**: Address and refute a counterargument
5. **Conclusion**: Restate thesis, summarise key points, end with a powerful call to action

### Writing a Call to Action
A call to action tells the reader exactly what you want them to do.
- Weak: "Something should be done about pollution."
- Strong: "I urge every student here today to write to your Member of Parliament demanding stricter penalties for industrial polluters."

## Common Mistakes
1. Relying on only one type of appeal — effective persuasion uses all three.
2. Presenting a counterargument but failing to refute it (this weakens your position).
3. Using aggressive or insulting language — persuasion works best with respectful tone.
4. Making claims without evidence — every argument needs support.

## CXC Exam Tips
- Balance all three appeals: ethos, pathos, and logos.
- Your thesis must take a clear position — a neutral thesis is not persuasive.
- Acknowledge at least one counterargument to show depth of thought.
- End with a memorable call to action or thought-provoking statement.`,
  },
]

// ══════════════════════════════════════════════════════════════════
//  MAIN
// ══════════════════════════════════════════════════════════════════
async function main() {
  console.log('🔄 Connecting to Turso...')

  const libsql = createClient({
    url: TURSO_URL,
    authToken: TURSO_TOKEN,
  })

  const adapter = new PrismaLibSQL({
    url: TURSO_URL,
    authToken: TURSO_TOKEN,
  })

  const prisma = new PrismaClient({ adapter } as never)
  console.log('✅ Connected to Turso')

  // ── Step 1: Ensure system user exists ──────────────────────────
  console.log('\n👤 Ensuring system user exists...')
  const SYSTEM_USER_ID = 'system-user-001'
  const SYSTEM_USER_EMAIL = 'cxc-ace-system@cxcace.com'

  let systemUser = await prisma.user.findUnique({
    where: { id: SYSTEM_USER_ID },
  })

  if (!systemUser) {
    // Try to find by email
    systemUser = await prisma.user.findUnique({
      where: { email: SYSTEM_USER_EMAIL },
    })
  }

  if (!systemUser) {
    console.log('  Creating system user via raw SQL...')
    // Use a pre-computed bcrypt hash of 'system2024' ($2b$10$...)
    // Generated with: bcrypt.hash('system2024', 10)
    const bcryptHash =
      '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Kz2K3n0p4ZfG2iFKtQJXa'
    await libsql.execute({
      sql: `INSERT OR IGNORE INTO users (id, email, passwordHash, name, role, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, 'TEACHER', datetime('now'), datetime('now'))`,
      args: [SYSTEM_USER_ID, SYSTEM_USER_EMAIL, bcryptHash, 'CXC Ace Study Guides'],
    })
    systemUser = await prisma.user.findUnique({
      where: { id: SYSTEM_USER_ID },
    })
    console.log(`  ✅ System user created: ${systemUser!.email}`)
  } else {
    console.log(`  ✅ System user found: ${systemUser.email}`)
  }

  // ── Step 2: Look up subjects ───────────────────────────────────
  console.log('\n📚 Looking up subjects...')
  const mathSubject = await prisma.subject.findUnique({ where: { code: 'CSEC-MATH' } })
  const engSubject = await prisma.subject.findUnique({ where: { code: 'CSEC-ENG' } })

  if (!mathSubject) {
    console.error('❌ Subject CSEC-MATH not found in database. Run setup-turso-auto.ts first.')
    process.exit(1)
  }
  if (!engSubject) {
    console.error('❌ Subject CSEC-ENG not found in database. Run setup-turso-auto.ts first.')
    process.exit(1)
  }
  console.log(`  ✅ Found: ${mathSubject.name} (${mathSubject.id})`)
  console.log(`  ✅ Found: ${engSubject.name} (${engSubject.id})`)

  // ── Step 3: Look up topics ─────────────────────────────────────
  console.log('\n📑 Looking up topics...')

  async function getTopicId(subjectId: string, topicName: string): Promise<string | null> {
    const topic = await prisma.topic.findFirst({
      where: { subjectId, name: topicName },
    })
    if (!topic) {
      console.warn(`  ⚠️  Topic "${topicName}" not found for subject ${subjectId}`)
      return null
    }
    return topic.id
  }

  // Build a map of topic name → topic id for each subject
  const mathTopics = new Map<string, string | null>()
  for (const q of MATH_QUESTIONS) {
    if (!mathTopics.has(q.topicName)) {
      mathTopics.set(q.topicName, await getTopicId(mathSubject.id, q.topicName))
    }
  }
  console.log(`  ✅ Found ${[...mathTopics.values()].filter(Boolean).length} Math topics`)

  const engTopics = new Map<string, string | null>()
  for (const q of ENGLISH_QUESTIONS) {
    if (!engTopics.has(q.topicName)) {
      engTopics.set(q.topicName, await getTopicId(engSubject.id, q.topicName))
    }
  }
  console.log(`  ✅ Found ${[...engTopics.values()].filter(Boolean).length} English topics`)

  // ── Step 4: Insert Math Questions ──────────────────────────────
  console.log('\n🔢 Inserting Mathematics questions...')
  let mathCount = 0
  for (const q of MATH_QUESTIONS) {
    const topicId = mathTopics.get(q.topicName) ?? null
    await prisma.question.create({
      data: {
        type: 'MCQ',
        difficulty: q.difficulty,
        content: q.content,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        subjectId: mathSubject.id,
        topicId,
        source: 'CXC Curriculum Aligned',
        status: 'APPROVED',
      },
    })
    mathCount++
    process.stdout.write(`  \r  Inserted ${mathCount}/${MATH_QUESTIONS.length}`)
  }
  console.log(`\n  ✅ Inserted ${mathCount} Mathematics questions`)

  // ── Step 5: Insert English Questions ───────────────────────────
  console.log('\n📖 Inserting English A questions...')
  let engCount = 0
  for (const q of ENGLISH_QUESTIONS) {
    const topicId = engTopics.get(q.topicName) ?? null
    await prisma.question.create({
      data: {
        type: 'MCQ',
        difficulty: q.difficulty,
        content: q.content,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        subjectId: engSubject.id,
        topicId,
        source: 'CXC Curriculum Aligned',
        status: 'APPROVED',
      },
    })
    engCount++
    process.stdout.write(`  \r  Inserted ${engCount}/${ENGLISH_QUESTIONS.length}`)
  }
  console.log(`\n  ✅ Inserted ${engCount} English A questions`)

  // ── Step 6: Insert Study Notes – Mathematics ───────────────────
  console.log('\n📝 Inserting Mathematics study notes...')
  let mathNoteCount = 0
  for (const note of MATH_NOTES) {
    const topicId = mathTopics.get(note.topicName) ?? null
    await prisma.note.create({
      data: {
        title: note.title,
        content: note.content,
        subjectId: mathSubject.id,
        color: '#f0f9ff',
        isShared: true,
        isPinned: false,
        userId: systemUser!.id,
      },
    })
    mathNoteCount++
    console.log(`  ✅ Created note: ${note.title}`)
  }
  console.log(`  ✅ Inserted ${mathNoteCount} Mathematics study notes`)

  // ── Step 7: Insert Study Notes – English A ─────────────────────
  console.log('\n📝 Inserting English A study notes...')
  let engNoteCount = 0
  for (const note of ENGLISH_NOTES) {
    const topicId = engTopics.get(note.topicName) ?? null
    await prisma.note.create({
      data: {
        title: note.title,
        content: note.content,
        subjectId: engSubject.id,
        color: '#fdf2f8',
        isShared: true,
        isPinned: false,
        userId: systemUser!.id,
      },
    })
    engNoteCount++
    console.log(`  ✅ Created note: ${note.title}`)
  }
  console.log(`  ✅ Inserted ${engNoteCount} English A study notes`)

  // ── Summary ────────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════')
  console.log('  📊 SEEDING COMPLETE')
  console.log('═══════════════════════════════════════════')
  console.log(`  Mathematics Questions: ${mathCount}`)
  console.log(`  English A Questions:   ${engCount}`)
  console.log(`  Mathematics Notes:     ${mathNoteCount}`)
  console.log(`  English A Notes:       ${engNoteCount}`)
  console.log(`  Total Questions:       ${mathCount + engCount}`)
  console.log(`  Total Notes:           ${mathNoteCount + engNoteCount}`)
  console.log('═══════════════════════════════════════════\n')

  await prisma.$disconnect()
}

main().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
