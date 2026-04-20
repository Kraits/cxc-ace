// ============================================================
// CXC Additional Seed Questions – Part 1
// 40 CSEC Mathematics · 30 CSEC English A · 30 CSEC Biology
// ============================================================

function mcq(
  content: string,
  options: { label: string; value: string; isCorrect: boolean }[],
  explanation: string,
  difficulty: 'EASY' | 'MEDIUM' | 'HARD',
  topicName: string,
  source?: string
) {
  return {
    type: 'MCQ' as const,
    difficulty,
    content,
    options: JSON.stringify(options),
    correctAnswer: options.find(o => o.isCorrect)!.value,
    explanation,
    topicName,
    source: source ?? null,
  }
}

const EASY: 'EASY' = 'EASY'
const MEDIUM: 'MEDIUM' = 'MEDIUM'
const HARD: 'HARD' = 'HARD'

// ============================================================
// CSEC MATHEMATICS — 40 Additional MCQ Questions
// Topics: Number Theory & Computation, Algebra, Relations & Functions,
//         Geometry & Trigonometry, Statistics & Probability, Sets & Logic
// ============================================================

export const EXTRA_QUESTIONS_MATH: ReturnType<typeof mcq>[] = [
  // ---- Consumer Arithmetic (6 questions) ----
  mcq(
    'A car is bought for $18,000. A deposit of 20% is paid and the remainder is paid in 24 equal monthly instalments. How much is each monthly instalment?',
    [
      { label: 'A', value: '$600', isCorrect: true },
      { label: 'B', value: '$750', isCorrect: false },
      { label: 'C', value: '$900', isCorrect: false },
      { label: 'D', value: '$540', isCorrect: false },
    ],
    'Deposit = 20% × $18,000 = $3,600. Remainder = $18,000 − $3,600 = $14,400. Monthly instalment = $14,400 / 24 = $600.',
    MEDIUM,
    'Number Theory & Computation',
    'CXC 2019 Paper 1 Q3',
  ),
  mcq(
    '$2,500 is invested at 4% per annum compound interest. What is the total amount after 3 years, to the nearest dollar?',
    [
      { label: 'A', value: '$2,800', isCorrect: false },
      { label: 'B', value: '$2,812', isCorrect: true },
      { label: 'C', value: '$2,860', isCorrect: false },
      { label: 'D', value: '$3,000', isCorrect: false },
    ],
    'Amount = P(1 + r)^t = 2,500(1.04)³ = 2,500 × 1.124864 = $2,812 (nearest dollar).',
    MEDIUM,
    'Number Theory & Computation',
  ),
  mcq(
    'An article marked at $560 is sold at a discount of 12½%. Calculate the discount amount.',
    [
      { label: 'A', value: '$70', isCorrect: true },
      { label: 'B', value: '$65', isCorrect: false },
      { label: 'C', value: '$490', isCorrect: false },
      { label: 'D', value: '$72', isCorrect: false },
    ],
    'Discount = 12½% × $560 = 0.125 × 560 = $70.',
    EASY,
    'Number Theory & Computation',
  ),
  mcq(
    'Mrs. Chang borrowed $15,000 at 6% simple interest per annum. She repaid $17,700 in total. How many years was the loan for?',
    [
      { label: 'A', value: '2 years', isCorrect: false },
      { label: 'B', value: '3 years', isCorrect: true },
      { label: 'C', value: '4 years', isCorrect: false },
      { label: 'D', value: '2.5 years', isCorrect: false },
    ],
    'Interest = $17,700 − $15,000 = $2,700. Time = Interest / (P × R) = 2,700 / (15,000 × 0.06) = 2,700 / 900 = 3 years.',
    MEDIUM,
    'Number Theory & Computation',
    'CXC 2018 Paper 1 Q18',
  ),
  mcq(
    'A television is priced at J$42,000. The store offers hire purchase terms: a 15% deposit plus 18 monthly payments of J$2,300. How much more does hire purchase cost than cash?',
    [
      { label: 'A', value: 'J$4,500', isCorrect: false },
      { label: 'B', value: 'J$5,700', isCorrect: true },
      { label: 'C', value: 'J$6,300', isCorrect: false },
      { label: 'D', value: 'J$4,200', isCorrect: false },
    ],
    'Deposit = 15% × J$42,000 = J$6,300. Total HP = J$6,300 + (18 × J$2,300) = J$6,300 + J$41,400 = J$47,700. Extra = J$47,700 − J$42,000 = J$5,700.',
    HARD,
    'Number Theory & Computation',
  ),

  // ---- Simultaneous Equations (3 questions) ----
  mcq(
    'Solve the simultaneous equations: 2x + y = 9 and x − y = 2.',
    [
      { label: 'A', value: 'x = 7/2, y = 3/2', isCorrect: false },
      { label: 'B', value: 'x = 4, y = 1', isCorrect: false },
      { label: 'C', value: 'x = 11/3, y = 5/3', isCorrect: true },
      { label: 'D', value: 'x = 3, y = 3', isCorrect: false },
    ],
    'Adding the equations: 3x = 11 → x = 11/3. Substituting: 11/3 − y = 2 → y = 11/3 − 6/3 = 5/3.',
    MEDIUM,
    'Algebra',
    'CXC 2019 Paper 1 Q7',
  ),
  mcq(
    'Solve: 3x + 2y = 16 and x + y = 5.',
    [
      { label: 'A', value: 'x = 6, y = −1', isCorrect: true },
      { label: 'B', value: 'x = 4, y = 1', isCorrect: false },
      { label: 'C', value: 'x = 5, y = 0', isCorrect: false },
      { label: 'D', value: 'x = 2, y = 3', isCorrect: false },
    ],
    'From eq 2: y = 5 − x. Substitute into eq 1: 3x + 2(5 − x) = 16 → 3x + 10 − 2x = 16 → x = 6, y = −1.',
    MEDIUM,
    'Algebra',
  ),
  mcq(
    'The sum of two numbers is 25 and their difference is 7. Find the smaller number.',
    [
      { label: 'A', value: '16', isCorrect: false },
      { label: 'B', value: '9', isCorrect: true },
      { label: 'C', value: '18', isCorrect: false },
      { label: 'D', value: '12', isCorrect: false },
    ],
    'Let numbers be x and y: x + y = 25, x − y = 7. Adding: 2x = 32 → x = 16, y = 9. The smaller number is 9.',
    EASY,
    'Algebra',
  ),

  // ---- Factorization (4 questions) ----
  mcq(
    'Factorise completely: x² − 9.',
    [
      { label: 'A', value: '(x − 3)(x − 3)', isCorrect: false },
      { label: 'B', value: '(x + 3)(x − 3)', isCorrect: true },
      { label: 'C', value: '(x + 9)(x − 1)', isCorrect: false },
      { label: 'D', value: 'x(x − 9)', isCorrect: false },
    ],
    'x² − 9 is a difference of two squares: a² − b² = (a + b)(a − b), so x² − 9 = (x + 3)(x − 3).',
    EASY,
    'Algebra',
  ),
  mcq(
    'Factorise completely: 2x² + 8x.',
    [
      { label: 'A', value: '2x(x + 4)', isCorrect: true },
      { label: 'B', value: '2(x² + 8x)', isCorrect: false },
      { label: 'C', value: 'x(2x + 8)', isCorrect: false },
      { label: 'D', value: '2x(x + 2)(x + 2)', isCorrect: false },
    ],
    'The HCF of 2x² and 8x is 2x. Factor out 2x: 2x² + 8x = 2x(x + 4).',
    EASY,
    'Algebra',
  ),
  mcq(
    'Factorise: 6x² − 5x − 6.',
    [
      { label: 'A', value: '(3x + 2)(2x − 3)', isCorrect: true },
      { label: 'B', value: '(6x + 3)(x − 2)', isCorrect: false },
      { label: 'C', value: '(3x − 2)(2x + 3)', isCorrect: false },
      { label: 'D', value: '(6x − 1)(x + 6)', isCorrect: false },
    ],
    'Find factors of 6 × (−6) = −36 that add to −5: −9 and +4. Split the middle: 6x² − 9x + 4x − 6 = 3x(2x − 3) + 2(2x − 3) = (3x + 2)(2x − 3).',
    HARD,
    'Algebra',
  ),
  mcq(
    'Factorise by grouping: ax + ay + bx + by.',
    [
      { label: 'A', value: '(a + b)(x + y)', isCorrect: true },
      { label: 'B', value: '(a − b)(x − y)', isCorrect: false },
      { label: 'C', value: '(a + y)(b + x)', isCorrect: false },
      { label: 'D', value: 'a(x + y) + b(x + y)', isCorrect: false },
    ],
    'Group terms: a(x + y) + b(x + y) = (a + b)(x + y).',
    MEDIUM,
    'Algebra',
  ),

  // ---- Quadratic Formula (2 questions) ----
  mcq(
    'Using the quadratic formula, solve: 2x² − 5x − 3 = 0.',
    [
      { label: 'A', value: 'x = 3 or x = −½', isCorrect: true },
      { label: 'B', value: 'x = −3 or x = ½', isCorrect: false },
      { label: 'C', value: 'x = 1 or x = −3', isCorrect: false },
      { label: 'D', value: 'x = 5 or x = −1', isCorrect: false },
    ],
    'x = (5 ± √(25 + 24)) / 4 = (5 ± √49) / 4 = (5 ± 7) / 4. So x = 3 or x = −½.',
    MEDIUM,
    'Algebra',
    'CXC 2020 Paper 1 Q12',
  ),
  mcq(
    'The quadratic equation x² − 6x + 2 = 0 has roots that are:',
    [
      { label: 'A', value: 'real and equal', isCorrect: false },
      { label: 'B', value: 'real and unequal', isCorrect: true },
      { label: 'C', value: 'not real (imaginary)', isCorrect: false },
      { label: 'D', value: 'rational', isCorrect: false },
    ],
    'Discriminant = b² − 4ac = 36 − 8 = 28 > 0, so the roots are real and unequal. Since 28 is not a perfect square, they are irrational.',
    MEDIUM,
    'Algebra',
  ),

  // ---- Linear Inequalities (3 questions) ----
  mcq(
    'Solve the inequality: −2x + 5 > 11.',
    [
      { label: 'A', value: 'x < −3', isCorrect: true },
      { label: 'B', value: 'x > −3', isCorrect: false },
      { label: 'C', value: 'x > 3', isCorrect: false },
      { label: 'D', value: 'x < 3', isCorrect: false },
    ],
    '−2x + 5 > 11 → −2x > 6. Dividing by a negative number reverses the inequality: x < −3.',
    MEDIUM,
    'Algebra',
  ),
  mcq(
    'Solve: 3(2x − 1) ≤ 4x + 7.',
    [
      { label: 'A', value: 'x ≤ 5', isCorrect: true },
      { label: 'B', value: 'x ≥ 5', isCorrect: false },
      { label: 'C', value: 'x ≤ 2', isCorrect: false },
      { label: 'D', value: 'x ≥ 10', isCorrect: false },
    ],
    '6x − 3 ≤ 4x + 7 → 6x − 4x ≤ 7 + 3 → 2x ≤ 10 → x ≤ 5.',
    EASY,
    'Algebra',
  ),

  // ---- Vectors (3 questions) ----
  mcq(
    'Given vectors a = (3, 4), find the magnitude of a.',
    [
      { label: 'A', value: '5', isCorrect: true },
      { label: 'B', value: '7', isCorrect: false },
      { label: 'C', value: '1', isCorrect: false },
      { label: 'D', value: '25', isCorrect: false },
    ],
    '|a| = √(3² + 4²) = √(9 + 16) = √25 = 5.',
    EASY,
    'Geometry & Trigonometry',
  ),
  mcq(
    'If vector p = (2, 3) and vector q = (1, −4), find p + q.',
    [
      { label: 'A', value: '(3, −1)', isCorrect: true },
      { label: 'B', value: '(1, 7)', isCorrect: false },
      { label: 'C', value: '(3, 7)', isCorrect: false },
      { label: 'D', value: '(−3, 1)', isCorrect: false },
    ],
    'p + q = (2 + 1, 3 + (−4)) = (3, −1).',
    EASY,
    'Geometry & Trigonometry',
  ),
  mcq(
    'Vector a has magnitude 8 and direction 060°. Vector b has magnitude 6 and direction 150°. Find the magnitude of a + b.',
    [
      { label: 'A', value: '10', isCorrect: true },
      { label: 'B', value: '14', isCorrect: false },
      { label: 'C', value: '7.2', isCorrect: false },
      { label: 'D', value: '12', isCorrect: false },
    ],
    'Resolve a: (8cos60°, 8sin60°) = (4, 6.93). Resolve b: (6cos150°, 6sin150°) = (−5.20, 3). Sum = (−1.2, 9.93). Magnitude = √(1.44 + 98.60) ≈ 10.',
    HARD,
    'Geometry & Trigonometry',
    'CXC 2019 Paper 1 Q22',
  ),

  // ---- Matrices (3 questions) ----
  mcq(
    'Find the determinant of the matrix [[3, 5], [2, 4]].',
    [
      { label: 'A', value: '2', isCorrect: true },
      { label: 'B', value: '22', isCorrect: false },
      { label: 'C', value: '−2', isCorrect: false },
      { label: 'D', value: '17', isCorrect: false },
    ],
    'Determinant = (3 × 4) − (5 × 2) = 12 − 10 = 2.',
    EASY,
    'Algebra',
  ),
  mcq(
    'If A = [[1, 2], [3, 4]] and B = [[5], [6]], find the product AB.',
    [
      { label: 'A', value: '[[17], [39]]', isCorrect: true },
      { label: 'B', value: '[[5, 10], [15, 24]]', isCorrect: false },
      { label: 'C', value: '[[11], [10]]', isCorrect: false },
      { label: 'D', value: '[[23], [34]]', isCorrect: false },
    ],
    'AB = [[(1×5)+(2×6)], [(3×5)+(4×6)]] = [[5+12], [15+24]] = [[17], [39]].',
    MEDIUM,
    'Algebra',
  ),

  // ---- Circle Theorems (3 questions) ----
  mcq(
    'In a circle, angle AOB = 130° at the centre. What is angle ACB at the circumference subtended by the same arc AB?',
    [
      { label: 'A', value: '65°', isCorrect: true },
      { label: 'B', value: '130°', isCorrect: false },
      { label: 'C', value: '50°', isCorrect: false },
      { label: 'D', value: '230°', isCorrect: false },
    ],
    'The angle at the centre is twice the angle at the circumference standing on the same arc. So angle ACB = 130° / 2 = 65°.',
    MEDIUM,
    'Geometry & Trigonometry',
    'CXC 2018 Paper 1 Q25',
  ),
  mcq(
    'A chord AB of a circle is 10 cm long and is 12 cm from the centre O. Find the radius of the circle.',
    [
      { label: 'A', value: '15 cm', isCorrect: false },
      { label: 'B', value: '13 cm', isCorrect: true },
      { label: 'C', value: '11 cm', isCorrect: false },
      { label: 'D', value: '14 cm', isCorrect: false },
    ],
    'The perpendicular from the centre bisects the chord. Half-chord = 5 cm. Using Pythagoras: r² = 5² + 12² = 25 + 144 = 169, so r = 13 cm.',
    MEDIUM,
    'Geometry & Trigonometry',
  ),
  mcq(
    'PA and PB are tangents to a circle with centre O. If angle APB = 56°, what is angle AOB?',
    [
      { label: 'A', value: '124°', isCorrect: true },
      { label: 'B', value: '56°', isCorrect: false },
      { label: 'C', value: '112°', isCorrect: false },
      { label: 'D', value: '68°', isCorrect: false },
    ],
    'The tangent is perpendicular to the radius at the point of contact, so angle OAP = angle OBP = 90°. In quadrilateral OAPB: angle AOB = 360° − 90° − 90° − 56° = 124°.',
    HARD,
    'Geometry & Trigonometry',
  ),

  // ---- Trigonometric Ratios (3 questions) ----
  mcq(
    'In triangle ABC, angle C = 90°, BC = 5 cm and AC = 12 cm. Find sin A.',
    [
      { label: 'A', value: '12/13', isCorrect: false },
      { label: 'B', value: '5/13', isCorrect: true },
      { label: 'C', value: '5/12', isCorrect: false },
      { label: 'D', value: '12/5', isCorrect: false },
    ],
    'AB = √(5² + 12²) = 13 cm. sin A = opposite/hypotenuse. The side opposite angle A is BC = 5 cm, and the hypotenuse is AB = 13 cm. Therefore sin A = 5/13.',
    MEDIUM,
    'Geometry & Trigonometry',
  ),
  mcq(
    'Find the value of sin 120°.',
    [
      { label: 'A', value: '√3/2', isCorrect: true },
      { label: 'B', value: '1/2', isCorrect: false },
      { label: 'C', value: '−√3/2', isCorrect: false },
      { label: 'D', value: '−1/2', isCorrect: false },
    ],
    '120° is in the second quadrant where sine is positive. sin 120° = sin(180° − 60°) = sin 60° = √3/2.',
    MEDIUM,
    'Geometry & Trigonometry',
  ),

  // ---- Loci and Construction (1 question) ----
  mcq(
    'The locus of points that are a fixed distance from a given straight line is:',
    [
      { label: 'A', value: 'A circle', isCorrect: false },
      { label: 'B', value: 'A pair of parallel lines', isCorrect: true },
      { label: 'C', value: 'A single parallel line', isCorrect: false },
      { label: 'D', value: 'A perpendicular line', isCorrect: false },
    ],
    'Points equidistant from a straight line form two parallel lines, one on each side of the given line, at the specified distance.',
    MEDIUM,
    'Geometry & Trigonometry',
  ),

  // ---- Cumulative Frequency and Ogives (2 questions) ----
  mcq(
    'The table shows cumulative frequencies: Mass(kg) ≤40(5), ≤50(15), ≤60(30), ≤70(42), ≤80(50). What is the estimated median mass?',
    [
      { label: 'A', value: 'Between 50 and 60 kg', isCorrect: true },
      { label: 'B', value: '60 kg', isCorrect: false },
      { label: 'C', value: 'Between 40 and 50 kg', isCorrect: false },
      { label: 'D', value: '70 kg', isCorrect: false },
    ],
    'Total frequency = 50. Median position = 50/2 = 25th value. The cumulative frequency reaches 25 in the 50–60 class (cumulative goes from 15 to 30).',
    MEDIUM,
    'Statistics & Probability',
  ),
  mcq(
    'From the ogive, the lower quartile (Q₁) is found by reading the cumulative frequency value at:',
    [
      { label: 'A', value: '¼ of the total frequency', isCorrect: true },
      { label: 'B', value: '½ of the total frequency', isCorrect: false },
      { label: 'C', value: '¾ of the total frequency', isCorrect: false },
      { label: 'D', value: 'The total frequency', isCorrect: false },
    ],
    'Q₁ corresponds to 25% (one quarter) of the total cumulative frequency on the ogive.',
    EASY,
    'Statistics & Probability',
  ),

  // ---- Probability — Tree Diagrams, Independent & Conditional (3 questions) ----
  mcq(
    'A bag contains 3 red, 4 blue, and 5 green marbles. One marble is drawn at random. What is the probability it is NOT blue?',
    [
      { label: 'A', value: '2/3', isCorrect: true },
      { label: 'B', value: '4/12', isCorrect: false },
      { label: 'C', value: '1/3', isCorrect: false },
      { label: 'D', value: '7/12', isCorrect: false },
    ],
    'Total marbles = 12. P(not blue) = 1 − P(blue) = 1 − 4/12 = 1 − 1/3 = 2/3.',
    EASY,
    'Statistics & Probability',
  ),
  mcq(
    'A fair die is rolled and a fair coin is tossed. What is the probability of getting a 6 and a head?',
    [
      { label: 'A', value: '7/12', isCorrect: false },
      { label: 'B', value: '1/4', isCorrect: false },
      { label: 'C', value: '1/12', isCorrect: true },
      { label: 'D', value: '1/2', isCorrect: false },
    ],
    'These are independent events. P(6) = 1/6, P(head) = 1/2. P(6 and head) = 1/6 × 1/2 = 1/12.',
    MEDIUM,
    'Statistics & Probability',
  ),
  mcq(
    'Two events A and B are such that P(A) = 0.4, P(B) = 0.5, and P(A|B) = 0.3. Find P(A ∩ B).',
    [
      { label: 'A', value: '0.12', isCorrect: false },
      { label: 'B', value: '0.15', isCorrect: true },
      { label: 'C', value: '0.20', isCorrect: false },
      { label: 'D', value: '0.35', isCorrect: false },
    ],
    'P(A|B) = P(A ∩ B) / P(B). So P(A ∩ B) = P(A|B) × P(B) = 0.3 × 0.5 = 0.15.',
    HARD,
    'Statistics & Probability',
    'CXC 2020 Paper 1 Q30',
  ),

  // ---- Venn Diagrams with 3 Sets (2 questions) ----
  mcq(
    'In a survey of 50 students: 25 study Maths, 20 study Physics, 15 study Chemistry, 5 study all three, 10 study Maths and Physics, 8 study Physics and Chemistry, 7 study Maths and Chemistry. How many study none of these subjects?',
    [
      { label: 'A', value: '12', isCorrect: false },
      { label: 'B', value: '10', isCorrect: true },
      { label: 'C', value: '8', isCorrect: false },
      { label: 'D', value: '15', isCorrect: false },
    ],
    'Using inclusion-exclusion: |M∪P∪C| = 25+20+15−10−8−7+5 = 40. Students studying at least one subject = 40. None = 50−40 = 10.',
    HARD,
    'Sets & Logic',
  ),
  mcq(
    'Given that n(ξ) = 100, n(A) = 40, n(B) = 35, n(C) = 30, n(A∩B) = 15, n(B∩C) = 10, n(A∩C) = 12, and n(A∩B∩C) = 5, find n(A ∪ B ∪ C).',
    [
      { label: 'A', value: '73', isCorrect: true },
      { label: 'B', value: '83', isCorrect: false },
      { label: 'C', value: '63', isCorrect: false },
      { label: 'D', value: '90', isCorrect: false },
    ],
    'Using inclusion-exclusion: |A∪B∪C| = |A|+|B|+|C|−|A∩B|−|B∩C|−|A∩C|+|A∩B∩C| = 40+35+30−15−10−12+5 = 73.',
    HARD,
    'Sets & Logic',
  ),

  // ---- Functions — Domain, Range, Composite, Inverse (2 questions) ----
  mcq(
    'Given f(x) = 3x − 5 and g(x) = x² + 2, find gf(1).',
    [
      { label: 'A', value: '6', isCorrect: true },
      { label: 'B', value: '4', isCorrect: false },
      { label: 'C', value: '11', isCorrect: false },
      { label: 'D', value: '−2', isCorrect: false },
    ],
    'f(1) = 3(1) − 5 = −2. Then gf(1) = g(−2) = (−2)² + 2 = 4 + 2 = 6.',
    MEDIUM,
    'Relations & Functions',
  ),
  mcq(
    'The function f is defined by f(x) = 2/(x + 1). Find f⁻¹(x).',
    [
      { label: 'A', value: '(2 − x) / x', isCorrect: true },
      { label: 'B', value: '(x + 1) / 2', isCorrect: false },
      { label: 'C', value: '2/x − 1', isCorrect: false },
      { label: 'D', value: '(2 + x) / x', isCorrect: false },
    ],
    'Let y = 2/(x+1). Swap: x = 2/(y+1). Solve: x(y+1) = 2 → xy + x = 2 → xy = 2 − x → y = (2 − x)/x.',
    HARD,
    'Relations & Functions',
  ),

  // ---- Transformation Geometry (3 questions) ----
  mcq(
    'The point P(3, 4) is translated by the vector (−2, 5). What are the coordinates of the image P\'?',
    [
      { label: 'A', value: '(1, 9)', isCorrect: true },
      { label: 'B', value: '(5, −1)', isCorrect: false },
      { label: 'C', value: '(6, 9)', isCorrect: false },
      { label: 'D', value: '(1, −1)', isCorrect: false },
    ],
    'P\' = (3 + (−2), 4 + 5) = (1, 9).',
    EASY,
    'Geometry & Trigonometry',
  ),
  mcq(
    'Triangle ABC with vertices A(1, 2), B(3, 6), C(5, 2) is reflected in the y-axis. What are the coordinates of the image of B?',
    [
      { label: 'A', value: '(−3, 6)', isCorrect: true },
      { label: 'B', value: '(3, −6)', isCorrect: false },
      { label: 'C', value: '(−3, −6)', isCorrect: false },
      { label: 'D', value: '(−6, 3)', isCorrect: false },
    ],
    'Reflection in the y-axis changes the sign of the x-coordinate: B(3, 6) → B\'(−3, 6).',
    EASY,
    'Geometry & Trigonometry',
  ),
  mcq(
    'Triangle PQR is enlarged by a scale factor of 2 about the origin. If P has coordinates (3, 1), what are the coordinates of its image P\'?',
    [
      { label: 'A', value: '(6, 2)', isCorrect: true },
      { label: 'B', value: '(5, 3)', isCorrect: false },
      { label: 'C', value: '(1.5, 0.5)', isCorrect: false },
      { label: 'D', value: '(9, 3)', isCorrect: false },
    ],
    'Enlargement by scale factor 2 about the origin multiplies both coordinates by 2: (2×3, 2×1) = (6, 2).',
    EASY,
    'Geometry & Trigonometry',
  ),

  // ---- Data Collection & Sampling (2 questions) ----
  mcq(
    'Which sampling method involves dividing the population into subgroups (strata) and then randomly sampling from each subgroup?',
    [
      { label: 'A', value: 'Stratified sampling', isCorrect: true },
      { label: 'B', value: 'Simple random sampling', isCorrect: false },
      { label: 'C', value: 'Convenience sampling', isCorrect: false },
      { label: 'D', value: 'Systematic sampling', isCorrect: false },
    ],
    'Stratified sampling divides the population into strata based on shared characteristics, then randomly samples from each stratum.',
    MEDIUM,
    'Statistics & Probability',
  ),
]

// ============================================================
// CSEC ENGLISH A — 30 Additional MCQ Questions
// Topics: Grammar & Mechanics, Comprehension, Summary Writing,
//         Essay Writing, Persuasive Writing
// ============================================================

export const EXTRA_QUESTIONS_ENG: ReturnType<typeof mcq>[] = [
  // ---- Active / Passive Voice (3 questions) ----
  mcq(
    'Change to passive voice: "The hurricane destroyed many homes in Grenada."',
    [
      { label: 'A', value: 'Many homes in Grenada were destroyed by the hurricane.', isCorrect: true },
      { label: 'B', value: 'Many homes in Grenada is destroyed by the hurricane.', isCorrect: false },
      { label: 'C', value: 'The hurricane was destroying many homes.', isCorrect: false },
      { label: 'D', value: 'Grenada destroyed many homes.', isCorrect: false },
    ],
    'In passive voice, the object becomes the subject. "Many homes in Grenada" moves to subject position, and the verb becomes "were destroyed" (past tense of "be" + past participle).',
    MEDIUM,
    'Grammar & Mechanics',
  ),
  mcq(
    'Change to active voice: "The new library was opened by the Prime Minister."',
    [
      { label: 'A', value: 'The Prime Minister opens the new library.', isCorrect: false },
      { label: 'B', value: 'The Prime Minister opened the new library.', isCorrect: true },
      { label: 'C', value: 'The new library is opened.', isCorrect: false },
      { label: 'D', value: 'The new library opening by the Prime Minister.', isCorrect: false },
    ],
    'The agent "the Prime Minister" becomes the subject. The passive "was opened" becomes the active past tense "opened."',
    HARD,
    'Grammar & Mechanics',
  ),

  // ---- Direct / Indirect Speech (2 questions) ----
  mcq(
    'Change to indirect speech: "I am studying for my CXC exams," said Maria.',
    [
      { label: 'A', value: 'Maria said that she is studying for her CXC exams.', isCorrect: false },
      { label: 'B', value: 'Maria said that she was studying for her CXC exams.', isCorrect: true },
      { label: 'C', value: 'Maria says that she was studying for her CXC exams.', isCorrect: false },
      { label: 'D', value: 'Maria said that I was studying for my CXC exams.', isCorrect: false },
    ],
    'In indirect speech, the present continuous "am studying" changes to past continuous "was studying," and "I" changes to "she," "my" changes to "her."',
    MEDIUM,
    'Grammar & Mechanics',
  ),
  mcq(
    'Change to direct speech: The teacher told the students that they needed to submit their assignments the following day.',
    [
      { label: 'A', value: 'The teacher said, "You need to submit your assignments tomorrow."', isCorrect: true },
      { label: 'B', value: 'The teacher said, "They needed to submit their assignments the next day."', isCorrect: false },
      { label: 'C', value: 'The teacher told, "You need to submit your assignments the following day."', isCorrect: false },
      { label: 'D', value: 'The teacher says, "You need to submit your assignments yesterday."', isCorrect: false },
    ],
    'In direct speech, "they" becomes "you," "their" becomes "your," and "the following day" becomes "tomorrow." The reporting verb becomes "said."',
    HARD,
    'Grammar & Mechanics',
  ),

  // ---- Tense Consistency (2 questions) ----
  mcq(
    'Which sentence maintains consistent tense throughout?',
    [
      { label: 'A', value: 'She walked to the store and buys some bread.', isCorrect: false },
      { label: 'B', value: 'She walked to the store and bought some bread.', isCorrect: true },
      { label: 'C', value: 'She walks to the store and bought some bread.', isCorrect: false },
      { label: 'D', value: 'She walked to the store and will buy some bread.', isCorrect: false },
    ],
    'Both verbs "walked" and "bought" are in the simple past tense, maintaining consistency.',
    EASY,
    'Grammar & Mechanics',
  ),
  mcq(
    'Identify the sentence with a tense error:',
    [
      { label: 'A', value: 'The students have completed their assignments and submitted them on time.', isCorrect: false },
      { label: 'B', value: 'After she finishes her homework, she went to the park.', isCorrect: true },
      { label: 'C', value: 'They were playing cricket when it started to rain.', isCorrect: false },
      { label: 'D', value: 'The chef prepared the meal and served it to the guests.', isCorrect: false },
    ],
    '"After she finishes" (present) conflicts with "she went" (past). Both should be past tense: "After she finished her homework, she went to the park."',
    MEDIUM,
    'Grammar & Mechanics',
  ),

  // ---- Pronoun-Antecedent Agreement (2 questions) ----
  mcq(
    'Choose the correct sentence:',
    [
      { label: 'A', value: 'Each of the students must bring their own calculator.', isCorrect: false },
      { label: 'B', value: 'Each of the students must bring his or her own calculator.', isCorrect: true },
      { label: 'C', value: 'Each of the students must bring our own calculator.', isCorrect: false },
      { label: 'D', value: 'Each of the students must bring its own calculator.', isCorrect: false },
    ],
    '"Each" is a singular indefinite pronoun, so the pronoun referring back to it must also be singular: "his or her."',
    MEDIUM,
    'Grammar & Mechanics',
  ),
  mcq(
    'Identify the pronoun-antecedent agreement error: "The committee members expressed their disagreement with the proposal."',
    [
      { label: 'A', value: 'There is no error; the sentence is correct.', isCorrect: true },
      { label: 'B', value: '"Their" should be "its" because "committee" is singular.', isCorrect: false },
      { label: 'C', value: '"Members" should be "member."', isCorrect: false },
      { label: 'D', value: '"Disagreement" should be "disagreements."', isCorrect: false },
    ],
    'The antecedent is "committee members" (plural), so "their" is correct. "Committee" as a collective noun can take a plural pronoun when referring to individual members.',
    HARD,
    'Grammar & Mechanics',
  ),

  // ---- Colons, Semicolons, Apostrophes (3 questions) ----
  mcq(
    'Which sentence correctly uses a colon?',
    [
      { label: 'A', value: 'The following students: won the competition.', isCorrect: false },
      { label: 'B', value: 'There are three types of rocks: igneous, sedimentary, and metamorphic.', isCorrect: true },
      { label: 'C', value: 'I need: bread, milk, and eggs.', isCorrect: false },
      { label: 'D', value: 'She said: that she would come.', isCorrect: false },
    ],
    'A colon is correctly used to introduce a list after a complete independent clause. "There are three types of rocks" is a complete clause.',
    MEDIUM,
    'Grammar & Mechanics',
  ),
  mcq(
    'Which sentence correctly uses a semicolon?',
    [
      { label: 'A', value: 'I love Jamaica; because of its culture.', isCorrect: false },
      { label: 'B', value: 'The rain stopped; and the sun came out.', isCorrect: false },
      { label: 'C', value: 'Some students prefer multiple choice; others prefer essay questions.', isCorrect: true },
      { label: 'D', value: 'She was tired; however she continued.', isCorrect: false },
    ],
    'A semicolon connects two closely related independent clauses without a conjunction. Both clauses on either side must be complete sentences.',
    MEDIUM,
    'Grammar & Mechanics',
  ),

  // ---- Persuasive Techniques (3 questions) ----
  mcq(
    'A speaker says, "As a doctor with twenty years of experience, I can tell you that this vaccine is safe." Which persuasive technique is being used?',
    [
      { label: 'A', value: 'Pathos', isCorrect: false },
      { label: 'B', value: 'Ethos', isCorrect: true },
      { label: 'C', value: 'Logos', isCorrect: false },
      { label: 'D', value: 'Bandwagon', isCorrect: false },
    ],
    'Ethos is an appeal to credibility and authority. The speaker establishes their expertise as a doctor to persuade the audience.',
    MEDIUM,
    'Persuasive Writing',
  ),
  mcq(
    '"How can we sit back and watch our coral reefs die? How can we ignore the pollution destroying our beaches?" What technique is used here?',
    [
      { label: 'A', value: 'Rhetorical questions', isCorrect: true },
      { label: 'B', value: 'Statistics', isCorrect: false },
      { label: 'C', value: 'Alliteration', isCorrect: false },
      { label: 'D', value: 'Hyperbole', isCorrect: false },
    ],
    'Rhetorical questions are questions asked to make a point rather than to elicit an answer. They engage the reader and provoke thought.',
    EASY,
    'Persuasive Writing',
  ),

  // ---- Paragraph Structure (2 questions) ----
  mcq(
    'What is the function of a topic sentence in a paragraph?',
    [
      { label: 'A', value: 'To provide supporting evidence', isCorrect: false },
      { label: 'B', value: 'To state the main idea of the paragraph', isCorrect: true },
      { label: 'C', value: 'To transition to the next paragraph', isCorrect: false },
      { label: 'D', value: 'To summarize the entire essay', isCorrect: false },
    ],
    'The topic sentence introduces the main idea or point that the rest of the paragraph will develop and support with details.',
    EASY,
    'Essay Writing',
  ),
  mcq(
    'Read the paragraph: "Solar energy is the most promising renewable energy source for the Caribbean. Firstly, the region receives abundant sunshine year-round. Secondly, solar panels require minimal maintenance once installed. Finally, the cost of solar technology has decreased significantly in recent years." What type of paragraph organization is used?',
    [
      { label: 'A', value: 'Chronological order', isCorrect: false },
      { label: 'B', value: 'Spatial order', isCorrect: false },
      { label: 'C', value: 'Order of importance / enumeration', isCorrect: true },
      { label: 'D', value: 'Cause and effect', isCorrect: false },
    ],
    'The paragraph uses enumeration with transition words "Firstly," "Secondly," and "Finally" to list supporting points in a structured order.',
    MEDIUM,
    'Essay Writing',
  ),

  // ---- Narrative Techniques (2 questions) ----
  mcq(
    'In a story told from the first-person point of view, the narrator:',
    [
      { label: 'A', value: 'Knows the thoughts and feelings of all characters', isCorrect: false },
      { label: 'B', value: 'Is a character in the story and uses "I"', isCorrect: true },
      { label: 'C', value: 'Is completely detached and objective', isCorrect: false },
      { label: 'D', value: 'Addresses the reader directly as "you"', isCorrect: false },
    ],
    'First-person narration uses "I" and the narrator is a participant in the story, sharing only what they personally observe and experience.',
    EASY,
    'Comprehension',
  ),
  mcq(
    'In the short story "Shabine" by Samuel Selvon, the conflict between the narrator and society is an example of:',
    [
      { label: 'A', value: 'Internal conflict', isCorrect: false },
      { label: 'B', value: 'Man vs. society', isCorrect: true },
      { label: 'C', value: 'Man vs. nature', isCorrect: false },
      { label: 'D', value: 'Man vs. technology', isCorrect: false },
    ],
    'Man vs. society conflict arises when a character struggles against societal norms, prejudices, or institutions, as seen in "Shabine."',
    MEDIUM,
    'Comprehension',
  ),

  // ---- Context Clues (2 questions) ----
  mcq(
    '"The aroma of the baking bread was so enticing that everyone in the neighbourhood followed the scent to the bakery." The word "enticing" most likely means:',
    [
      { label: 'A', value: 'Repulsive', isCorrect: false },
      { label: 'B', value: 'Irresistibly attractive', isCorrect: true },
      { label: 'C', value: 'Boring', isCorrect: false },
      { label: 'D', value: 'Faint', isCorrect: false },
    ],
    'The context clue is that "everyone followed the scent," suggesting the aroma was appealing. "Enticing" means tempting or irresistibly attractive.',
    EASY,
    'Comprehension',
  ),
  mcq(
    '"Despite the torrential rain, the dedicated farmers continued working in the fields." The word "torrential" most likely means:',
    [
      { label: 'A', value: 'Light and gentle', isCorrect: false },
      { label: 'B', value: 'Very heavy and forceful', isCorrect: true },
      { label: 'C', value: 'Warm and humid', isCorrect: false },
      { label: 'D', value: 'Brief and sudden', isCorrect: false },
    ],
    'The context suggests extreme rain that would normally stop work, but the farmers persisted. "Torrential" describes rain that is extremely heavy and violent.',
    MEDIUM,
    'Comprehension',
  ),

  // ---- Fact vs Opinion (2 questions) ----
  mcq(
    'Which of the following is a FACT?',
    [
      { label: 'A', value: 'Cricket is the most exciting sport in the Caribbean.', isCorrect: false },
      { label: 'B', value: 'Barbados has a population of approximately 287,000 people.', isCorrect: true },
      { label: 'C', value: 'Students should wear uniforms to school.', isCorrect: false },
      { label: 'D', value: 'The best time to visit Jamaica is in December.', isCorrect: false },
    ],
    'A fact can be verified with evidence. Population figures can be confirmed through census data, making this a verifiable statement.',
    EASY,
    'Comprehension',
  ),
  mcq(
    'Which statement expresses an OPINION rather than a fact?',
    [
      { label: 'A', value: 'Port of Spain is the capital of Trinidad and Tobago.', isCorrect: false },
      { label: 'B', value: 'The Caribbean Sea is located east of Central America.', isCorrect: false },
      { label: 'C', value: 'Bob Marley\'s music is the greatest contribution to world culture.', isCorrect: true },
      { label: 'D', value: 'Hurricane season in the Atlantic runs from June to November.', isCorrect: false },
    ],
    '"Greatest" is a subjective judgment that cannot be objectively verified. It represents a personal opinion, not a provable fact.',
    EASY,
    'Comprehension',
  ),

  // ---- Tone and Mood (2 questions) ----
  mcq(
    'Read: "The dark clouds gathered ominously overhead, and the wind howled through the empty streets like a wounded animal." The tone of this passage is:',
    [
      { label: 'A', value: 'Joyful and cheerful', isCorrect: false },
      { label: 'B', value: 'Foreboding and ominous', isCorrect: true },
      { label: 'C', value: 'Humorous and light-hearted', isCorrect: false },
      { label: 'D', value: 'Formal and academic', isCorrect: false },
    ],
    'Words like "dark," "ominously," "howled," and "wounded animal" create a sense of dread and foreboding about what is to come.',
    MEDIUM,
    'Comprehension',
  ),
  mcq(
    'The mood of a passage is best described as:',
    [
      { label: 'A', value: 'The writer\'s attitude toward the subject', isCorrect: false },
      { label: 'B', value: 'The emotional atmosphere created for the reader', isCorrect: true },
      { label: 'C', value: 'The main argument of the passage', isCorrect: false },
      { label: 'D', value: 'The author\'s purpose for writing', isCorrect: false },
    ],
    'Mood refers to the emotional atmosphere or feeling that the text creates in the reader, while tone refers to the author\'s attitude.',
    HARD,
    'Comprehension',
  ),

  // ---- Figurative Language (3 questions) ----
  mcq(
    '"I\'ve told you a million times to clean your room!" This is an example of:',
    [
      { label: 'A', value: 'Simile', isCorrect: false },
      { label: 'B', value: 'Metaphor', isCorrect: false },
      { label: 'C', value: 'Hyperbole', isCorrect: true },
      { label: 'D', value: 'Personification', isCorrect: false },
    ],
    'Hyperbole is deliberate exaggeration used for emphasis or effect. No one has literally said something a million times.',
    EASY,
    'Comprehension',
  ),
  mcq(
    '"The fire station burned down last night." This is an example of:',
    [
      { label: 'A', value: 'Hyperbole', isCorrect: false },
      { label: 'B', value: 'Irony', isCorrect: true },
      { label: 'C', value: 'Onomatopoeia', isCorrect: false },
      { label: 'D', value: 'Alliteration', isCorrect: false },
    ],
    'Irony occurs when the outcome is the opposite of what is expected. A fire station—the very place meant to fight fires—burning down is deeply ironic.',
    MEDIUM,
    'Comprehension',
  ),

  // ---- Summary Writing Techniques (2 questions) ----
  mcq(
    'When writing a summary, which of the following should you do?',
    [
      { label: 'A', value: 'Include your personal opinions', isCorrect: false },
      { label: 'B', value: 'Copy long passages directly from the original', isCorrect: false },
      { label: 'C', value: 'Express the main ideas in your own words concisely', isCorrect: true },
      { label: 'D', value: 'Add new information to support the main points', isCorrect: false },
    ],
    'A good summary captures the main ideas of the original text in a concise form using your own words, without adding personal opinions or new information.',
    EASY,
    'Summary Writing',
  ),
  mcq(
    'A summary of a 500-word passage should be approximately:',
    [
      { label: 'A', value: '500 words', isCorrect: false },
      { label: 'B', value: '400 words', isCorrect: false },
      { label: 'C', value: 'About one-third of the original length', isCorrect: true },
      { label: 'D', value: '10 words', isCorrect: false },
    ],
    'CXC guidelines suggest a summary should be roughly one-third of the original passage length, capturing key ideas while significantly reducing the word count.',
    MEDIUM,
    'Summary Writing',
  ),

  // ---- Essay Types (2 questions) ----
  mcq(
    'Which type of essay presents a balanced discussion of both sides of an issue before reaching a conclusion?',
    [
      { label: 'A', value: 'Narrative essay', isCorrect: false },
      { label: 'B', value: 'Descriptive essay', isCorrect: false },
      { label: 'C', value: 'Argumentative essay', isCorrect: true },
      { label: 'D', value: 'Expository essay', isCorrect: false },
    ],
    'An argumentative essay discusses multiple perspectives on a topic, presents evidence for each side, and then reaches a well-reasoned conclusion.',
    MEDIUM,
    'Essay Writing',
  ),
  mcq(
    'Which essay type tells a story and typically includes characters, a setting, and a plot?',
    [
      { label: 'A', value: 'Narrative essay', isCorrect: true },
      { label: 'B', value: 'Expository essay', isCorrect: false },
      { label: 'C', value: 'Persuasive essay', isCorrect: false },
      { label: 'D', value: 'Analytical essay', isCorrect: false },
    ],
    'A narrative essay tells a story with elements of fiction such as characters, setting, plot, and often a central theme or moral.',
    EASY,
    'Essay Writing',
  ),

  // ---- HARD questions (2 more) ----
  mcq(
    '"The whistle of the kettle and the crash of the thunder competed for attention." The literary device onomatopoeia is demonstrated by:',
    [
      { label: 'A', value: '"whistle" and "crash"', isCorrect: true },
      { label: 'B', value: '"competed for attention"', isCorrect: false },
      { label: 'C', value: '"kettle" and "thunder"', isCorrect: false },
      { label: 'D', value: 'the entire sentence', isCorrect: false },
    ],
    'Onomatopoeia refers to words that imitate the sounds they describe. "Whistle" imitates the sound of steam and "crash" imitates a loud impact.',
    HARD,
    'Comprehension',
  ),
  mcq(
    'Which sentence uses symbolism?',
    [
      { label: 'A', value: 'The rose wilted in the cold winter air.', isCorrect: false },
      { label: 'B', value: 'The dove, released from the cage, soared into the open sky as the nation celebrated peace.', isCorrect: true },
      { label: 'C', value: 'She ran as fast as a cheetah across the field.', isCorrect: false },
      { label: 'D', value: 'The rain poured heavily on the tin roof.', isCorrect: false },
    ],
    'Symbolism uses an object, person, or action to represent a larger idea. The dove symbolizes peace, and the cage being opened represents freedom.',
    HARD,
    'Comprehension',
  ),
]

// ============================================================
// CSEC BIOLOGY — 30 Additional MCQ Questions
// Topics: Cell Biology, Ecology, Human Physiology, Genetics & Heredity,
//         Plant Biology, Evolution
// ============================================================

export const EXTRA_QUESTIONS_BIO: ReturnType<typeof mcq>[] = [
  // ---- Cell Organelles (4 questions) ----
  mcq(
    'Which organelle is responsible for modifying, sorting, and packaging proteins for transport?',
    [
      { label: 'A', value: 'Rough endoplasmic reticulum', isCorrect: false },
      { label: 'B', value: 'Golgi apparatus', isCorrect: true },
      { label: 'C', value: 'Lysosome', isCorrect: false },
      { label: 'D', value: 'Mitochondrion', isCorrect: false },
    ],
    'The Golgi apparatus receives proteins from the rough ER, modifies them, sorts them, and packages them into vesicles for transport to their destinations.',
    MEDIUM,
    'Cell Biology',
  ),
  mcq(
    'Which organelle contains digestive enzymes that break down waste materials and cellular debris?',
    [
      { label: 'A', value: 'Ribosome', isCorrect: false },
      { label: 'B', value: 'Vacuole', isCorrect: false },
      { label: 'C', value: 'Lysosome', isCorrect: true },
      { label: 'D', value: 'Centriole', isCorrect: false },
    ],
    'Lysosomes are membrane-bound organelles containing hydrolytic enzymes that digest worn-out organelles, engulfed pathogens, and cellular waste.',
    MEDIUM,
    'Cell Biology',
  ),
  mcq(
    'In plant cells, the large central vacuole primarily functions to:',
    [
      { label: 'A', value: 'Synthesize proteins', isCorrect: false },
      { label: 'B', value: 'Store water, nutrients, and maintain turgor pressure', isCorrect: true },
      { label: 'C', value: 'Produce energy (ATP)', isCorrect: false },
      { label: 'D', value: 'Control cell division', isCorrect: false },
    ],
    'The central vacuole in plant cells stores water and dissolved substances, and its turgor pressure helps maintain the plant cell\'s rigidity and shape.',
    EASY,
    'Cell Biology',
  ),

  // ---- Cell Membrane Structure (3 questions) ----
  mcq(
    'The fluid mosaic model describes the cell membrane as composed of:',
    [
      { label: 'A', value: 'A rigid protein layer', isCorrect: false },
      { label: 'B', value: 'A phospholipid bilayer with embedded proteins', isCorrect: true },
      { label: 'C', value: 'A single layer of carbohydrates', isCorrect: false },
      { label: 'D', value: 'A cellulose network', isCorrect: false },
    ],
    'The fluid mosaic model proposes that the cell membrane is a fluid phospholipid bilayer with various proteins floating within it like a mosaic.',
    HARD,
    'Cell Biology',
  ),
  mcq(
    'Osmosis is the movement of water molecules from:',
    [
      { label: 'A', value: 'A dilute solution to a concentrated solution through a partially permeable membrane', isCorrect: true },
      { label: 'B', value: 'A concentrated solution to a dilute solution', isCorrect: false },
      { label: 'C', value: 'High pressure to low pressure', isCorrect: false },
      { label: 'D', value: 'A region of high solute concentration to low solute concentration', isCorrect: false },
    ],
    'Osmosis is the net movement of water molecules across a selectively permeable membrane from a region of higher water concentration (dilute solution) to a region of lower water concentration (concentrated solution).',
    MEDIUM,
    'Cell Biology',
  ),
  mcq(
    'Active transport differs from diffusion because active transport:',
    [
      { label: 'A', value: 'Does not require energy', isCorrect: false },
      { label: 'B', value: 'Moves substances from low to high concentration using ATP', isCorrect: true },
      { label: 'C', value: 'Only occurs in plant cells', isCorrect: false },
      { label: 'D', value: 'Moves only water molecules', isCorrect: false },
    ],
    'Active transport moves substances against their concentration gradient (from low to high concentration) and requires energy in the form of ATP.',
    MEDIUM,
    'Cell Biology',
  ),

  // ---- Mitosis and Meiosis (2 questions) ----
  mcq(
    'Which of the following occurs during mitosis but NOT during meiosis?',
    [
      { label: 'A', value: 'DNA replication', isCorrect: false },
      { label: 'B', value: 'Production of genetically identical daughter cells', isCorrect: true },
      { label: 'C', value: 'Formation of spindle fibres', isCorrect: false },
      { label: 'D', value: 'Condensation of chromosomes', isCorrect: false },
    ],
    'Mitosis produces two genetically identical daughter cells (clones), while meiosis produces four genetically different cells through crossing over and independent assortment.',
    MEDIUM,
    'Cell Biology',
  ),
  mcq(
    'The main purpose of meiosis is to:',
    [
      { label: 'A', value: 'Produce identical somatic cells for growth', isCorrect: false },
      { label: 'B', value: 'Produce gametes with half the normal chromosome number', isCorrect: true },
      { label: 'C', value: 'Replace damaged body cells', isCorrect: false },
      { label: 'D', value: 'Create identical copies of the parent cell', isCorrect: false },
    ],
    'Meiosis reduces the chromosome number by half (diploid to haploid) to produce gametes (sperm and egg cells) for sexual reproduction.',
    EASY,
    'Cell Biology',
  ),

  // ---- Photosynthesis (3 questions) ----
  mcq(
    'Which part of photosynthesis occurs in the thylakoid membranes and requires light?',
    [
      { label: 'A', value: 'The Calvin cycle (light-independent reactions)', isCorrect: false },
      { label: 'B', value: 'The light-dependent reactions', isCorrect: true },
      { label: 'C', value: 'Glycolysis', isCorrect: false },
      { label: 'D', value: 'The Krebs cycle', isCorrect: false },
    ],
    'The light-dependent reactions take place in the thylakoid membranes, where chlorophyll absorbs light energy to split water and produce ATP and NADPH.',
    MEDIUM,
    'Plant Biology',
  ),
  mcq(
    'During the light-independent reactions (Calvin cycle), carbon dioxide is fixed into organic molecules using:',
    [
      { label: 'A', value: 'ATP and NADPH from the light-dependent reactions', isCorrect: true },
      { label: 'B', value: 'Oxygen and glucose', isCorrect: false },
      { label: 'C', value: 'Water and sunlight', isCorrect: false },
      { label: 'D', value: 'Only ATP', isCorrect: false },
    ],
    'The Calvin cycle uses ATP and NADPH (produced in the light-dependent reactions) to convert CO₂ into glucose (G3P) through carbon fixation.',
    HARD,
    'Plant Biology',
    'CXC 2019 Paper 1 Q15',
  ),

  // ---- Respiration (2 questions) ----
  mcq(
    'In which part of the cell does aerobic respiration primarily occur?',
    [
      { label: 'A', value: 'Nucleus', isCorrect: false },
      { label: 'B', value: 'Ribosome', isCorrect: false },
      { label: 'C', value: 'Mitochondrion', isCorrect: true },
      { label: 'D', value: 'Chloroplast', isCorrect: false },
    ],
    'Aerobic respiration takes place mainly in the mitochondria, where glucose is broken down in the presence of oxygen to produce ATP, CO₂, and water.',
    EASY,
    'Cell Biology',
  ),
  mcq(
    'During anaerobic respiration in yeast cells, glucose is broken down to produce:',
    [
      { label: 'A', value: 'Lactic acid and ATP', isCorrect: false },
      { label: 'B', value: 'Ethanol, carbon dioxide, and ATP', isCorrect: true },
      { label: 'C', value: 'Oxygen and glucose', isCorrect: false },
      { label: 'D', value: 'Water and carbon dioxide only', isCorrect: false },
    ],
    'Yeast undergoes fermentation (anaerobic respiration), converting glucose into ethanol and carbon dioxide with a small yield of ATP. This process is used in brewing and baking.',
    HARD,
    'Cell Biology',
  ),

  // ---- Nervous System (2 questions) ----
  mcq(
    'The gap between two neurons where chemical signals (neurotransmitters) pass is called the:',
    [
      { label: 'A', value: 'Axon', isCorrect: false },
      { label: 'B', value: 'Synapse', isCorrect: true },
      { label: 'C', value: 'Dendrite', isCorrect: false },
      { label: 'D', value: 'Myelin sheath', isCorrect: false },
    ],
    'A synapse is the tiny gap between two neurons. Neurotransmitters are released from the presynaptic neuron, cross the synapse, and bind to receptors on the postsynaptic neuron.',
    MEDIUM,
    'Human Physiology',
  ),
  mcq(
    'A reflex arc does NOT involve the:',
    [
      { label: 'A', value: 'Receptor', isCorrect: false },
      { label: 'B', value: 'Sensory neuron', isCorrect: false },
      { label: 'C', value: 'Brain', isCorrect: true },
      { label: 'D', value: 'Effector', isCorrect: false },
    ],
    'A reflex arc is a rapid, involuntary response that bypasses the brain. It involves a receptor → sensory neuron → relay neuron (in spinal cord) → motor neuron → effector.',
    MEDIUM,
    'Human Physiology',
  ),

  // ---- Endocrine System (2 questions) ----
  mcq(
    'Which gland is known as the "master gland" and controls other endocrine glands?',
    [
      { label: 'A', value: 'Thyroid gland', isCorrect: false },
      { label: 'B', value: 'Adrenal gland', isCorrect: false },
      { label: 'C', value: 'Pituitary gland', isCorrect: true },
      { label: 'D', value: 'Pancreas', isCorrect: false },
    ],
    'The pituitary gland, located at the base of the brain, produces hormones that regulate the activity of other endocrine glands such as the thyroid, adrenal glands, and gonads.',
    EASY,
    'Human Physiology',
  ),
  mcq(
    'Insulin is produced by the pancreas and functions to:',
    [
      { label: 'A', value: 'Increase blood glucose levels', isCorrect: false },
      { label: 'B', value: 'Decrease blood glucose levels by promoting glucose uptake by cells', isCorrect: true },
      { label: 'C', value: 'Stimulate the thyroid gland', isCorrect: false },
      { label: 'D', value: 'Increase heart rate', isCorrect: false },
    ],
    'Insulin lowers blood glucose levels by stimulating cells (especially liver and muscle cells) to take up glucose from the blood and convert it to glycogen for storage.',
    MEDIUM,
    'Human Physiology',
  ),

  // ---- Excretory System (2 questions) ----
  mcq(
    'The functional unit of the kidney is the:',
    [
      { label: 'A', value: 'Neuron', isCorrect: false },
      { label: 'B', value: 'Nephron', isCorrect: true },
      { label: 'C', value: 'Alveolus', isCorrect: false },
      { label: 'D', value: 'Villus', isCorrect: false },
    ],
    'The nephron is the microscopic functional unit of the kidney, responsible for filtering blood, reabsorbing useful substances, and producing urine.',
    EASY,
    'Human Physiology',
  ),
  mcq(
    'During dialysis, which process is artificially performed to remove waste products from the blood of a patient with kidney failure?',
    [
      { label: 'A', value: 'Photosynthesis', isCorrect: false },
      { label: 'B', value: 'Ultrafiltration and diffusion across a semi-permeable membrane', isCorrect: true },
      { label: 'C', value: 'Active transport only', isCorrect: false },
      { label: 'D', value: 'Osmosis of proteins', isCorrect: false },
    ],
    'Dialysis uses a semi-permeable membrane to filter waste products like urea from the blood by diffusion, while maintaining the correct balance of salts and water.',
    HARD,
    'Human Physiology',
  ),

  // ---- Digestive System (2 questions) ----
  mcq(
    'Which enzyme breaks down proteins into amino acids in the small intestine?',
    [
      { label: 'A', value: 'Amylase', isCorrect: false },
      { label: 'B', value: 'Lipase', isCorrect: false },
      { label: 'C', value: 'Protease (trypsin)', isCorrect: true },
      { label: 'D', value: 'Pepsin', isCorrect: false },
    ],
    'Protease enzymes such as trypsin (produced in the pancreas and released into the small intestine) break down proteins into smaller peptides and amino acids.',
    MEDIUM,
    'Human Physiology',
  ),
  mcq(
    'The small intestine is adapted for absorption because it has:',
    [
      { label: 'A', value: 'A thick muscular wall', isCorrect: false },
      { label: 'B', value: 'Villi and microvilli that increase the surface area', isCorrect: true },
      { label: 'C', value: 'A small surface area to slow digestion', isCorrect: false },
      { label: 'D', value: 'No blood supply', isCorrect: false },
    ],
    'Villi and microvilli are finger-like projections lining the small intestine that massively increase the surface area for efficient absorption of nutrients into the bloodstream.',
    MEDIUM,
    'Human Physiology',
  ),

  // ---- Reproductive System (2 questions) ----
  mcq(
    'Fertilization in humans normally occurs in the:',
    [
      { label: 'A', value: 'Uterus', isCorrect: false },
      { label: 'B', value: 'Ovary', isCorrect: false },
      { label: 'C', value: 'Fallopian tube (oviduct)', isCorrect: true },
      { label: 'D', value: 'Vagina', isCorrect: false },
    ],
    'Fertilization typically occurs in the upper portion of the fallopian tube (oviduct), where the sperm meets and fuses with the egg.',
    MEDIUM,
    'Human Physiology',
  ),
  mcq(
    'The placenta functions to:',
    [
      { label: 'A', value: 'Store nutrients for the mother', isCorrect: false },
      { label: 'B', value: 'Allow exchange of nutrients, oxygen, and waste between mother and fetus', isCorrect: true },
      { label: 'C', value: 'Produce sperm cells', isCorrect: false },
      { label: 'D', value: 'Digest food for the fetus', isCorrect: false },
    ],
    'The placenta is an organ that develops during pregnancy, allowing the transfer of oxygen and nutrients from the mother\'s blood to the fetus and removal of fetal waste products.',
    EASY,
    'Human Physiology',
  ),

  // ---- Ecological Relationships (2 questions) ----
  mcq(
    'A relationship between two organisms where both benefit is called:',
    [
      { label: 'A', value: 'Parasitism', isCorrect: false },
      { label: 'B', value: 'Commensalism', isCorrect: false },
      { label: 'C', value: 'Mutualism', isCorrect: true },
      { label: 'D', value: 'Predation', isCorrect: false },
    ],
    'Mutualism is a symbiotic relationship where both organisms benefit, such as bees and flowers (bees get nectar, flowers get pollinated).',
    EASY,
    'Ecology',
  ),
  mcq(
    'A tapeworm living in the intestine of a human is an example of:',
    [
      { label: 'A', value: 'Mutualism', isCorrect: false },
      { label: 'B', value: 'Parasitism', isCorrect: true },
      { label: 'C', value: 'Commensalism', isCorrect: false },
      { label: 'D', value: 'Competition', isCorrect: false },
    ],
    'Parasitism is a relationship where one organism (parasite) benefits at the expense of the other (host). The tapeworm absorbs nutrients from the human host.',
    EASY,
    'Ecology',
  ),

  // ---- Biogeochemical Cycles (2 questions) ----
  mcq(
    'Which process in the nitrogen cycle converts atmospheric nitrogen gas (N₂) into a form usable by plants?',
    [
      { label: 'A', value: 'Photosynthesis', isCorrect: false },
      { label: 'B', value: 'Nitrogen fixation', isCorrect: true },
      { label: 'C', value: 'Respiration', isCorrect: false },
      { label: 'D', value: 'Transpiration', isCorrect: false },
    ],
    'Nitrogen fixation converts atmospheric N₂ into ammonia or nitrates that plants can absorb. This is carried out by nitrogen-fixing bacteria in the soil or in root nodules of legumes.',
    HARD,
    'Ecology',
  ),
  mcq(
    'In the carbon cycle, which process releases carbon dioxide back into the atmosphere?',
    [
      { label: 'A', value: 'Photosynthesis', isCorrect: false },
      { label: 'B', value: 'Combustion and respiration', isCorrect: true },
      { label: 'C', value: 'Nitrogen fixation', isCorrect: false },
      { label: 'D', value: 'Condensation', isCorrect: false },
    ],
    'Burning fossil fuels (combustion) and cellular respiration both release CO₂ into the atmosphere, returning carbon that was stored in organic molecules.',
    MEDIUM,
    'Ecology',
  ),

  // ---- Biomes and Ecosystems (1 question) ----
  mcq(
    'A tropical rainforest biome is characterized by:',
    [
      { label: 'A', value: 'Low rainfall and cold temperatures year-round', isCorrect: false },
      { label: 'B', value: 'High biodiversity, high rainfall, and warm temperatures year-round', isCorrect: true },
      { label: 'C', value: 'Moderate temperatures and low rainfall', isCorrect: false },
      { label: 'D', value: 'Very low biodiversity and sandy soil', isCorrect: false },
    ],
    'Tropical rainforests, found near the equator including parts of the Caribbean, have high rainfall (>2000mm/year), consistent warm temperatures, and the highest biodiversity of any terrestrial biome.',
    EASY,
    'Ecology',
  ),

  // ---- Natural Selection Evidence (1 question) ----
  mcq(
    'Which of the following provides evidence for evolution by natural selection?',
    [
      { label: 'A', value: 'Homologous structures in different species', isCorrect: true },
      { label: 'B', value: 'Identical DNA in all organisms', isCorrect: false },
      { label: 'C', value: 'No variation within species', isCorrect: false },
      { label: 'D', value: 'Lack of fossils', isCorrect: false },
    ],
    'Homologous structures (e.g., the pentadactyl limb in humans, whales, and bats) suggest a common ancestor, providing strong evidence for evolution through divergent evolution.',
    MEDIUM,
    'Evolution',
  ),

  // ---- Genetic Crosses (2 questions) ----
  mcq(
    'In a monohybrid cross between two heterozygous tall pea plants (Tt × Tt), what is the expected phenotypic ratio of the offspring?',
    [
      { label: 'A', value: '1:1', isCorrect: false },
      { label: 'B', value: '3 tall : 1 short', isCorrect: true },
      { label: 'C', value: 'All tall', isCorrect: false },
      { label: 'D', value: '2 tall : 2 short', isCorrect: false },
    ],
    'A Tt × Tt cross gives genotypes TT, Tt, Tt, tt (ratio 1:2:1). Since T is dominant over t, the phenotypic ratio is 3 tall (TT, Tt, Tt) : 1 short (tt).',
    MEDIUM,
    'Genetics & Heredity',
  ),
  mcq(
    'Colour blindness is an X-linked recessive trait. A carrier female (XᴮXᵇ) marries a normal male (XᴮY). What is the probability that their son will be colour blind?',
    [
      { label: 'A', value: '0%', isCorrect: false },
      { label: 'B', value: '25%', isCorrect: false },
      { label: 'C', value: '50%', isCorrect: true },
      { label: 'D', value: '100%', isCorrect: false },
    ],
    'The mother can pass Xᴮ or Xᵇ to her son. The father passes Y to his son. A son receiving XᵇY will be colour blind. P(son is colour blind) = 1/2 = 50%.',
    HARD,
    'Genetics & Heredity',
    'CXC 2020 Paper 1 Q28',
  ),
]
