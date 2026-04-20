import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import bcrypt from 'bcryptjs'

const adapter = new PrismaLibSQL({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN || undefined,
})

const db = new PrismaClient({ adapter } as never)

// ── Study guide definitions: [subjectName, topicName, title, content] ──

interface GuideDef {
  subjectName: string
  topicName: string
  title: string
  content: string
}

const STUDY_GUIDES: GuideDef[] = [
  // ═══════════════════════════════════════════════════════════
  //  MATHEMATICS
  // ═══════════════════════════════════════════════════════════
  {
    subjectName: 'Mathematics',
    topicName: 'Number Theory & Computation',
    title: 'Study Guide: Mathematics - Number Theory & Computation',
    content: `# Number Theory & Computation

## Key Concepts and Definitions

- **Whole Numbers** are the set {0, 1, 2, 3, ...} used for counting and ordering
- **Integers** include all whole numbers and their negatives: {..., -3, -2, -1, 0, 1, 2, 3, ...}
- **Prime Numbers** are integers greater than 1 that have exactly two factors: 1 and themselves (e.g., 2, 3, 5, 7, 11, 13, 17, 19, 23, 29)
- **Composite Numbers** are integers greater than 1 that have more than two factors
- **Rational Numbers** can be expressed as a fraction p/q where p and q are integers and q is not zero
- **Irrational Numbers** cannot be expressed as simple fractions; their decimal expansions are non-terminating and non-repeating (e.g., pi, sqrt(2))
- **Factors** of a number are integers that divide it exactly without leaving a remainder
- **Multiples** of a number are the products of that number and any integer
- **HCF (Highest Common Factor)** / **GCD (Greatest Common Divisor)** is the largest number that divides two or more numbers exactly
- **LCM (Lowest Common Multiple)** is the smallest number that is a multiple of two or more numbers
- **Place Value** determines the value of a digit based on its position in a number
- **Standard Form (Scientific Notation)** expresses numbers as A x 10^n where 1 <= A < 10

## Important Rules and Formulas

- To find HCF: express each number as a product of prime factors, then multiply the common factors with the lowest powers
- To find LCM: express each number as a product of prime factors, then multiply all factors with the highest powers
- For any integers a and b: HCF(a,b) x LCM(a,b) = a x b
- Divisibility rules: by 2 (last digit even), by 3 (sum of digits divisible by 3), by 5 (last digit 0 or 5), by 9 (sum of digits divisible by 9), by 10 (last digit 0)
- BODMAS/PEMDAS order of operations: Brackets/Parentheses, Orders/Exponents, Division, Multiplication, Addition, Subtraction

## CXC Exam Tips

- Always show working for HCF and LCM problems — examiners award method marks
- Memorise prime numbers up to at least 50 for quick identification
- When converting between fractions, decimals, and percentages, practice regularly as these appear in multiple questions
- Be careful with negative numbers in BODMAS — the order matters
- Standard form questions often combine with significant figures, so know your rounding rules`,
  },
  {
    subjectName: 'Mathematics',
    topicName: 'Algebra',
    title: 'Study Guide: Mathematics - Algebra',
    content: `# Algebra

## Key Concepts and Definitions

- **Variables** are symbols (usually letters like x, y) used to represent unknown quantities
- **Algebraic Expressions** combine variables, numbers, and operations (e.g., 3x + 5, 2a^2 - b)
- **Equations** are statements that two algebraic expressions are equal (e.g., 2x + 3 = 11)
- **Inequalities** use symbols like <, >, <=, >= to show that one expression is less than or greater than another
- **Like Terms** have the same variable raised to the same power (e.g., 3x and 5x are like terms; 3x and 3x^2 are not)
- **Coefficients** are the numerical parts of terms with variables (in 4xy, the coefficient is 4)
- **Formula** is a mathematical rule expressed in symbols (e.g., A = pi*r^2)
- **Factorisation** is the reverse of expansion; writing an expression as a product of factors
- **Quadratic Equation** has the general form ax^2 + bx + c = 0 where a is not zero
- **Simultaneous Equations** are two or more equations with two or more unknowns that must be solved together

## Important Rules and Formulas

- **Expanding brackets**: a(b + c) = ab + ac (distributive law)
- **Difference of two squares**: a^2 - b^2 = (a + b)(a - b)
- **Perfect square trinomials**: a^2 + 2ab + b^2 = (a + b)^2 and a^2 - 2ab + b^2 = (a - b)^2
- **Quadratic formula**: x = (-b +/- sqrt(b^2 - 4ac)) / 2a
- **Laws of indices**: a^m x a^n = a^(m+n), a^m / a^n = a^(m-n), (a^m)^n = a^(mn), a^0 = 1
- **Solving simultaneous equations**: use substitution method or elimination method
- **Transposition** (rearranging formulas): perform the same operation on both sides to isolate the desired variable

## CXC Exam Tips

- Always check your solutions by substituting back into the original equation
- For factorisation, look for a common factor first, then try other methods
- In quadratic equations, if b^2 - 4ac > 0 there are two real solutions; if = 0 one solution; if < 0 no real solutions
- When solving word problems, define your variables clearly and show your working
- Practise changing the subject of a formula as this is frequently tested`,
  },
  {
    subjectName: 'Mathematics',
    topicName: 'Relations & Functions',
    title: 'Study Guide: Mathematics - Relations & Functions',
    content: `# Relations & Functions

## Key Concepts and Definitions

- **A Relation** is any set of ordered pairs; it connects inputs (domain) to outputs (range)
- **A Function** is a special relation where each input has exactly one output (passes the vertical line test)
- **Domain** is the set of all possible input values (x-values)
- **Range** is the set of all possible output values (y-values)
- **Linear Function** graphs as a straight line: y = mx + c, where m is the gradient and c is the y-intercept
- **Quadratic Function** graphs as a parabola: y = ax^2 + bx + c
- **Gradient (Slope)** measures the steepness of a line: m = (y2 - y1) / (x2 - x1)
- **Y-intercept** is the point where the line crosses the y-axis (where x = 0)
- **X-intercept** is the point where the line crosses the x-axis (where y = 0)
- **Composite Function** f(g(x)) means apply g first, then apply f to the result
- **Inverse Function** f^(-1)(x) reverses the effect of f(x); f(f^(-1)(x)) = x

## Important Rules and Formulas

- Gradient formula: m = rise / run = (y2 - y1) / (x2 - x1)
- Equation of a line given gradient and y-intercept: y = mx + c
- Equation of a line given a point and gradient: y - y1 = m(x - x1)
- Parallel lines have equal gradients: m1 = m2
- Perpendicular lines have gradients that are negative reciprocals: m1 * m2 = -1
- Distance between two points: d = sqrt((x2-x1)^2 + (y2-y1)^2)
- Midpoint formula: M = ((x1+x2)/2, (y1+y2)/2)
- To find the inverse function: replace f(x) with y, swap x and y, then solve for y

## CXC Exam Tips

- When determining if a relation is a function, use the vertical line test on a graph or check if any x-value repeats with different y-values
- For distance and midpoint questions, label your points clearly to avoid calculation errors
- In graphing questions, always label axes and show at least three points for a line
- Composite function questions often appear — remember to work from the inside out
- Practice finding domain restrictions (values of x that make denominators zero or square roots negative)`,
  },
  {
    subjectName: 'Mathematics',
    topicName: 'Geometry & Trigonometry',
    title: 'Study Guide: Mathematics - Geometry & Trigonometry',
    content: `# Geometry & Trigonometry

## Key Concepts and Definitions

- **Point** is a location in space with no size; represented by a dot and a capital letter
- **Line** is a straight path extending infinitely in both directions
- **Angle** is formed by two rays meeting at a common endpoint called the vertex
- **Types of angles**: acute (0-90), right (90), obtuse (90-180), straight (180), reflex (180-360)
- **Triangle** is a polygon with three sides and three angles summing to 180 degrees
- **Pythagorean Theorem** states that in a right triangle, a^2 + b^2 = c^2 where c is the hypotenuse
- **Circle** is the set of all points equidistant from a fixed point called the centre
- **Trigonometric Ratios** (SOH CAH TOA): sin = Opposite/Hypotenuse, cos = Adjacent/Hypotenuse, tan = Opposite/Adjacent
- **Similar Triangles** have the same shape but different sizes; corresponding angles are equal, sides are proportional
- **Congruent Triangles** are identical in shape and size (SSS, SAS, ASA, AAS, RHS conditions)
- **Polygon** is a closed shape with three or more straight sides

## Important Rules and Formulas

- **Area formulas**: Rectangle = l x w, Triangle = 1/2 x b x h, Circle = pi x r^2, Parallelogram = b x h, Trapezium = 1/2(a+b) x h
- **Perimeter formulas**: Rectangle = 2(l+w), Triangle = a+b+c, Circle (circumference) = 2 x pi x r
- **Volume formulas**: Cuboid = l x w x h, Cylinder = pi x r^2 x h, Cone = 1/3 x pi x r^2 x h, Sphere = 4/3 x pi x r^3
- **Pythagorean theorem**: a^2 + b^2 = c^2 (right triangles only)
- **Angle sum of polygon**: (n-2) x 180 degrees where n is the number of sides
- **Bearings**: always measured clockwise from North, written as three-figure angles (e.g., 045 degrees)
- **Sine Rule**: a/sin(A) = b/sin(B) = c/sin(C)
- **Cosine Rule**: a^2 = b^2 + c^2 - 2bc x cos(A)

## CXC Exam Tips

- Draw diagrams for all geometry and trigonometry problems — this helps visualise the situation
- For bearings questions, always draw a North line and measure clockwise
- In circle theorems, mark equal angles and equal lengths on your diagram
- Memorise SOH CAH TOA and the exact values for sin, cos, and tan of 30, 45, and 60 degrees
- Always check if your answer is reasonable — an angle in a triangle should not exceed 180 degrees`,
  },
  {
    subjectName: 'Mathematics',
    topicName: 'Statistics & Probability',
    title: 'Study Guide: Mathematics - Statistics & Probability',
    content: `# Statistics & Probability

## Key Concepts and Definitions

- **Statistics** is the collection, organisation, analysis, and interpretation of data
- **Data** can be qualitative (descriptive) or quantitative (numerical); discrete or continuous
- **Mean** is the sum of all values divided by the number of values (average)
- **Median** is the middle value when data is arranged in order
- **Mode** is the most frequently occurring value in a data set
- **Range** is the difference between the highest and lowest values
- **Histogram** is a bar chart for continuous data where the area of each bar represents frequency
- **Cumulative Frequency** is the running total of frequencies up to each class boundary
- **Probability** measures the likelihood of an event occurring on a scale from 0 (impossible) to 1 (certain)
- **Sample Space** is the set of all possible outcomes of an experiment
- **Mutually Exclusive Events** cannot occur at the same time
- **Independent Events** do not affect each other's probability

## Important Rules and Formulas

- **Mean** = Sum of values / Number of values = Efx / Ef
- **Median** = middle value; for grouped data, use interpolation: L + ((n/2 - cf)/f) x c
- **Interquartile Range (IQR)** = Upper Quartile (Q3) - Lower Quartile (Q1)
- **Standard Deviation** measures spread of data around the mean
- **Probability of event A**: P(A) = Number of favourable outcomes / Total number of outcomes
- **Complement rule**: P(not A) = 1 - P(A)
- **Addition rule**: P(A or B) = P(A) + P(B) - P(A and B)
- **Multiplication rule (independent)**: P(A and B) = P(A) x P(B)
- **Tree diagrams** are used to show all possible outcomes and their probabilities

## CXC Exam Tips

- Always show your frequency table and calculations for mean, median, and mode
- When drawing histograms, remember the y-axis is frequency density, not frequency
- For cumulative frequency curves (ogives), plot at the upper class boundary
- In probability, check that all probabilities sum to 1
- Tree diagrams are essential for multi-stage experiments — draw them carefully and check branches sum correctly`,
  },
  {
    subjectName: 'Mathematics',
    topicName: 'Sets & Logic',
    title: 'Study Guide: Mathematics - Sets & Logic',
    content: `# Sets & Logic

## Key Concepts and Definitions

- **Set** is a well-defined collection of distinct objects called elements or members
- **Elements** are the individual items within a set, listed inside curly braces { }
- **Empty Set (Null Set)** is a set with no elements, denoted by { } or the symbol (empty set)
- **Universal Set (U)** contains all elements under consideration for a particular discussion
- **Subset** A is a set where every element is also in set B, written A is a subset of B
- **Union (A union B)** contains all elements in A, B, or both
- **Intersection (A intersect B)** contains only elements common to both A and B
- **Complement (A')** contains all elements in the universal set that are NOT in A
- **Venn Diagram** is a visual representation of sets using overlapping circles
- **Proposition** is a statement that is either true or false
- **Logical Connectives**: AND (conjunction), OR (disjunction), NOT (negation), IF...THEN (implication)
- **Truth Table** lists all possible truth values of propositions and their combinations

## Important Rules and Formulas

- Number of elements in A union B: n(A union B) = n(A) + n(B) - n(A intersect B)
- For three sets: n(A union B union C) = n(A) + n(B) + n(C) - n(A intersect B) - n(A intersect C) - n(B intersect C) + n(A intersect B intersect C)
- Complement rule: n(A') = n(U) - n(A)
- De Morgan's Laws: (A intersect B)' = A' union B' and (A union B)' = A' intersect B'
- A is a subset of A union B and A intersect B is a subset of A
- Conditional probability using sets: P(A|B) = n(A intersect B) / n(B)

## CXC Exam Tips

- Always draw Venn diagrams when solving set problems — they make the relationships clear
- Label each region of the Venn diagram with the number of elements, working from the inside out
- For logic questions, construct truth tables systematically, listing all possible combinations
- Remember that the universal set is everything inside the rectangle of the Venn diagram
- Practice shading regions for union, intersection, and complement — this is commonly tested`,
  },

  // ═══════════════════════════════════════════════════════════
  //  ENGLISH A
  // ═══════════════════════════════════════════════════════════
  {
    subjectName: 'English A',
    topicName: 'Grammar & Mechanics',
    title: 'Study Guide: English A - Grammar & Mechanics',
    content: `# Grammar & Mechanics

## Key Concepts and Definitions

- **Nouns** name people, places, things, or ideas; they can be common (desk) or proper (Jamaica), concrete (book) or abstract (freedom)
- **Pronouns** replace nouns to avoid repetition: personal (he, she, it), possessive (mine, yours), relative (who, which, that), demonstrative (this, that)
- **Verbs** express actions (run, write) or states of being (is, seem); they have tenses: past, present, future
- **Adjectives** modify (describe) nouns: beautiful, tall, three, the (articles a, an, the are also adjectives)
- **Adverbs** modify verbs, adjectives, or other adverbs: quickly, very, well (often end in -ly but not always)
- **Prepositions** show relationships of time, place, or direction: in, on, at, under, between
- **Conjunctions** connect words, phrases, or clauses: coordinating (and, but, or), subordinating (although, because, if)
- **Interjections** express emotion: Wow! Oh! Alas!
- **Subject-Verb Agreement**: a singular subject takes a singular verb; a plural subject takes a plural verb
- **Active Voice**: the subject performs the action (The cat caught the mouse)
- **Passive Voice**: the subject receives the action (The mouse was caught by the cat)
- **Clauses**: independent (can stand alone as a sentence) and dependent/subordinate (cannot stand alone)

## Important Rules

- Every sentence must have a subject and a verb and express a complete thought
- Use apostrophes for contractions (can't, it's) and possession (Maria's book, the dogs' collars)
- Commas separate items in a list, join independent clauses with a conjunction, and set off introductory elements
- Semi-colons join closely related independent clauses without a conjunction
- Colons introduce lists, explanations, or quotations
- Tenses must be consistent throughout a passage — do not shift from past to present without reason
- Parallel structure: items in a list or comparison must follow the same grammatical form

## CXC Exam Tips

- In the multiple-choice section, read the entire sentence before choosing an answer
- Look for subject-verb agreement errors — they are among the most common mistakes
- For punctuation questions, read the sentence aloud to hear where pauses (commas) naturally occur
- Know the difference between commonly confused words: their/there/they're, its/it's, your/you're, affect/effect
- Practise identifying sentence fragments and run-on sentences`,
  },
  {
    subjectName: 'English A',
    topicName: 'Comprehension',
    title: 'Study Guide: English A - Comprehension',
    content: `# Comprehension

## Key Concepts and Definitions

- **Literal Comprehension** involves understanding information directly stated in the text — what the passage explicitly says
- **Inferential Comprehension** requires reading between the lines — drawing conclusions based on clues in the text
- **Critical Comprehension** involves evaluating the text — judging the author's purpose, tone, bias, and effectiveness
- **Vocabulary in Context** means determining the meaning of a word from how it is used in the passage
- **Main Idea** is the central point or message the author wants to convey
- **Supporting Details** are facts, examples, and explanations that develop the main idea
- **Author's Purpose** may be to inform, persuade, entertain, or describe
- **Tone** is the author's attitude toward the subject (formal, informal, critical, sympathetic, humorous)
- **Mood** is the atmosphere or feeling the text creates for the reader
- **Literary Devices** include metaphor, simile, personification, alliteration, onomatopoeia, hyperbole, and irony
- **Figurative Language** uses words in non-literal ways to create imagery and impact
- **Context Clues** are surrounding words and sentences that help determine the meaning of unfamiliar words

## Important Techniques

- Read the passage at least twice: first for overall understanding, then for specific details
- Before reading the questions, skim the passage for structure — headings, topic sentences, and concluding sentences
- Underline or note key phrases as you read
- For vocabulary questions, try replacing the word with each option to see which fits best
- When inferring, base your answer solely on evidence from the text, not on personal knowledge
- For literary device questions, identify the device first, then explain its effect on meaning or tone

## CXC Exam Tips

- Always support your answers with evidence from the passage — quote or paraphrase specific lines
- Manage your time: the comprehension section is worth significant marks, so do not rush
- For summary questions within comprehension, use your own words rather than copying the text
- Pay attention to the writer's use of language — examiners frequently ask about the effect of specific word choices
- Practise with a variety of text types: narrative, descriptive, expository, and argumentative passages`,
  },
  {
    subjectName: 'English A',
    topicName: 'Summary Writing',
    title: 'Study Guide: English A - Summary Writing',
    content: `# Summary Writing

## Key Concepts and Definitions

- **Summary** is a brief, accurate, and objective restatement of the main ideas in a text using your own words
- **Conciseness** means expressing ideas in as few words as possible without losing meaning
- **Objectivity** means presenting the author's ideas without inserting your personal opinions
- **Paraphrasing** is rewording the original text while preserving the original meaning
- **Main Points** are the key ideas the author communicates; secondary details, examples, and repetitions should be omitted
- **Continuous Writing (Paragraph Form)** is one format for CXC summaries where you write in connected prose
- **Note Form (Point Form)** is the other acceptable format using bullet points or numbered lists
- **Word Limit** is typically 120-150 words for CXC Paper 2 summary questions — staying within this is critical
- **Originality** means using your own vocabulary and sentence structures rather than copying phrases from the passage

## Important Rules and Steps

1. Read the passage carefully at least twice to understand the overall meaning
2. Identify the main points by highlighting or underlining topic sentences and key ideas
3. Eliminate repetitions, examples, descriptive details, and minor points
4. Write your summary using your own words and sentence structures
5. Keep it concise — every sentence should carry a main point
6. Check that your summary is accurate and does not misrepresent the original text
7. Count your words and adjust to stay within the required limit

## CXC Exam Tips

- Never copy sentences directly from the passage — this is penalised heavily
- Start your summary with a clear topic sentence that states the overall main idea
- Use transition words (furthermore, however, in addition) to connect your points smoothly
- If writing in continuous form, use linking devices between sentences
- If writing in note form, use numbered points and keep each point brief
- Practise writing summaries under timed conditions to develop speed and accuracy
- Always re-read your summary to check for grammatical errors and clarity`,
  },
  {
    subjectName: 'English A',
    topicName: 'Essay Writing',
    title: 'Study Guide: English A - Essay Writing',
    content: `# Essay Writing

## Key Concepts and Definitions

- **Thesis Statement** is a clear, specific sentence that states the main argument or purpose of the essay, usually in the introduction
- **Introduction** grabs the reader's attention, provides background context, and states the thesis
- **Body Paragraphs** each develop one main idea with topic sentences, supporting evidence, and explanations
- **Conclusion** restates the thesis in new words, summarises key points, and provides a final thought or call to action
- **Topic Sentence** is the first sentence of a body paragraph that states its main idea
- **Supporting Evidence** includes facts, statistics, examples, quotations, and personal experience
- **Transitions** are words and phrases that connect ideas smoothly between sentences and paragraphs
- **Cohesion** means all parts of the essay work together logically toward the thesis
- **Coherence** means ideas flow clearly and are easy for the reader to follow
- **Expository Essay** explains or informs about a topic without expressing personal opinion
- **Argumentative Essay** presents a claim and supports it with evidence and reasoning

## Essay Structure

- **Introduction (1 paragraph)**: Hook the reader, provide context, state your thesis
- **Body (2-4 paragraphs)**: Each paragraph has a topic sentence, supporting details, and a concluding sentence
- **Conclusion (1 paragraph)**: Restate thesis, summarise main points, end with impact
- Aim for 400-500 words in the CXC examination

## CXC Exam Tips

- Plan your essay before writing — spend 5 minutes creating a brief outline
- Choose essay topics you know well and can discuss with specific examples
- Vary your sentence structures: use simple, compound, and complex sentences
- Use precise vocabulary rather than vague or repetitive words
- Proofread for spelling, grammar, and punctuation errors in the final minutes
- Practise writing complete essays within 40-45 minutes to build exam stamina`,
  },
  {
    subjectName: 'English A',
    topicName: 'Persuasive Writing',
    title: 'Study Guide: English A - Persuasive Writing',
    content: `# Persuasive Writing

## Key Concepts and Definitions

- **Persuasion** is the art of convincing an audience to accept your viewpoint or take a specific action
- **Rhetorical Appeals**: **Ethos** (credibility and trustworthiness), **Pathos** (emotional appeal), **Logos** (logical reasoning and evidence)
- **Claim** is your main argument or position on an issue
- **Counterargument** is an opposing viewpoint that you acknowledge and respond to
- **Rebuttal** is your response to a counterargument, showing why your position is stronger
- **Call to Action** is a statement urging the reader to take a specific step or change their behaviour
- **Tone** in persuasive writing should be confident, reasonable, and respectful — avoid being aggressive or condescending
- **Propaganda Techniques** to recognise and use carefully: bandwagon, testimonial, emotional words, repetition, and loaded language

## Persuasive Techniques

- Use strong, confident language: "It is clear that..." rather than "I think maybe..."
- Present facts, statistics, and expert opinions as evidence
- Address counterarguments fairly and then refute them
- Use rhetorical questions to engage the reader: "How can we ignore this crisis?"
- Repeat key points for emphasis but vary the wording
- Appeal to shared values and common concerns
- End with a powerful conclusion and a clear call to action

## CXC Exam Tips

- Always address the specific topic given — do not write a pre-prepared essay on a different theme
- State your position clearly in the introduction
- Develop at least three strong arguments, each in its own paragraph
- Acknowledge the opposing view and explain why your position is more compelling
- Use a formal but passionate tone — persuasive writing needs conviction
- Avoid informal language, slang, and abbreviations
- Practise planning persuasive essays quickly — the first 5 minutes of planning saves time overall`,
  },

  // ═══════════════════════════════════════════════════════════
  //  BIOLOGY
  // ═══════════════════════════════════════════════════════════
  {
    subjectName: 'Biology',
    topicName: 'Cell Biology',
    title: 'Study Guide: Biology - Cell Biology',
    content: `# Cell Biology

## Key Concepts and Definitions

- **Cell** is the basic structural and functional unit of all living organisms
- **Cell Theory** states that all living things are made of cells, cells are the basic units of life, and all cells come from pre-existing cells
- **Cell Membrane** is a selectively permeable phospholipid bilayer that controls what enters and exits the cell
- **Nucleus** contains genetic material (DNA) and controls cell activities
- **Mitochondria** are the "powerhouses of the cell" — they produce ATP through cellular respiration
- **Ribosomes** are the sites of protein synthesis; found free in cytoplasm or on the rough endoplasmic reticulum
- **Endoplasmic Reticulum (ER)**: Rough ER (with ribosomes) processes proteins; Smooth ER synthesises lipids
- **Golgi Apparatus** modifies, packages, and sorts proteins for transport within or outside the cell
- **Chloroplasts** contain chlorophyll and are the site of photosynthesis in plant cells
- **Cell Wall** is a rigid outer layer made of cellulose in plant cells that provides structural support
- **Vacuole** is a storage compartment; large central vacuole in plant cells maintains turgor pressure
- **Lysosomes** contain digestive enzymes that break down waste materials and cellular debris

## Important Differences: Plant vs Animal Cells

- Plant cells have cell walls, chloroplasts, and large central vacuoles; animal cells do not
- Animal cells have centrioles involved in cell division; most plant cells do not
- Plant cells are generally rectangular due to the rigid cell wall; animal cells are irregular in shape
- Plant cells store starch; animal cells store glycogen

## Important Processes

- **Diffusion**: movement of molecules from high to low concentration (passive, no energy required)
- **Osmosis**: movement of water molecules across a selectively permeable membrane from dilute to concentrated solution
- **Active Transport**: movement of molecules against the concentration gradient, requiring energy (ATP)
- **Mitosis**: cell division producing two identical daughter cells for growth and repair (PMAT: Prophase, Metaphase, Anaphase, Telophase)

## CXC Exam Tips

- When drawing cells, always label clearly and make structures proportional
- Know the functions of each organelle — this is heavily tested
- For osmosis experiments, be able to interpret results and explain water movement
- Practise calculating magnification using the formula: Magnification = Image size / Actual size`,
  },
  {
    subjectName: 'Biology',
    topicName: 'Ecology',
    title: 'Study Guide: Biology - Ecology',
    content: `# Ecology

## Key Concepts and Definitions

- **Ecology** is the study of interactions between living organisms and their environment
- **Ecosystem** is a community of living organisms interacting with each other and their physical environment
- **Habitat** is the natural home or environment of an organism
- **Niche** is the role and position a species has in its environment, including its interactions with other organisms
- **Biotic Factors** are living components of an ecosystem: plants, animals, bacteria, fungi
- **Abiotic Factors** are non-living components: temperature, light, water, soil, pH, wind
- **Producer (Autotroph)** makes its own food through photosynthesis (e.g., green plants, algae)
- **Consumer (Heterotroph)** obtains energy by eating other organisms
- **Decomposer** breaks down dead organic matter and recycles nutrients (e.g., bacteria, fungi)
- **Food Chain** shows the flow of energy from producers through consumers in a single pathway
- **Food Web** is a network of interconnected food chains showing multiple feeding relationships
- **Trophic Level** is the position an organism occupies in a food chain: producer, primary consumer, secondary consumer, etc.
- **Carrying Capacity** is the maximum population size an environment can sustain indefinitely

## Key Ecological Principles

- **Energy Flow**: energy enters ecosystems through photosynthesis, flows through trophic levels, and is lost as heat at each level (only about 10% is transferred)
- **Carbon Cycle**: CO2 is absorbed by plants in photosynthesis, released by respiration, combustion, and decomposition
- **Nitrogen Cycle**: nitrogen is fixed from the atmosphere by bacteria, absorbed by plants, passed through food chains, and returned by decomposition
- **Water Cycle**: driven by evaporation, condensation, precipitation, and collection
- **Symbiosis**: close relationships between organisms — mutualism (both benefit), commensalism (one benefits, other unaffected), parasitism (one benefits, other harmed)

## CXC Exam Tips

- When constructing food chains, always start with a producer and use arrows to show energy flow direction
- For pyramid of numbers questions, remember that the base is always the largest (producers)
- Be able to explain the effects of removing one organism from a food web
- Know practical ecology techniques: quadrat sampling, pitfall traps, sweep netting
- Understand how human activities (deforestation, pollution, overfishing) affect ecosystems`,
  },
  {
    subjectName: 'Biology',
    topicName: 'Human Physiology',
    title: 'Study Guide: Biology - Human Physiology',
    content: `# Human Physiology

## Key Concepts and Definitions

- **Digestion** is the breakdown of food into small, soluble molecules that can be absorbed into the blood
- **Mechanical Digestion** physically breaks down food (chewing, churning in stomach)
- **Chemical Digestion** uses enzymes to break down large molecules into smaller ones
- **Enzymes** are biological catalysts that speed up chemical reactions; they are specific to their substrate
- **Respiration** is the chemical release of energy from glucose: C6H12O6 + 6O2 produces 6CO2 + 6H2O + ATP
- **Circulatory System** transports oxygen, nutrients, hormones, and waste products around the body
- **Heart** is a muscular pump with four chambers: two atria (receiving) and two ventricles (pumping)
- **Blood** consists of red blood cells (oxygen transport), white blood cells (immunity), platelets (clotting), and plasma (liquid medium)
- **Nervous System** coordinates body responses; consists of the brain, spinal cord, and nerves
- **Neurone** is a nerve cell that transmits electrical impulses; components include dendrites, cell body, and axon
- **Hormones** are chemical messengers secreted by endocrine glands directly into the bloodstream
- **Homeostasis** is the maintenance of a constant internal environment (temperature, blood glucose, water balance)
- **Kidney** filters blood, removes urea (excretion), and regulates water and ion balance (osmoregulation)

## Important Processes and Pathways

- **Digestive system pathway**: Mouth to Oesophagus to Stomach to Small Intestine to Large Intestine
- Enzymes: amylase (carbohydrates to sugars), protease (proteins to amino acids), lipase (lipids to fatty acids and glycerol)
- **Double circulation**: pulmonary circulation (heart to lungs and back) and systemic circulation (heart to body and back)
- **Reflex Arc**: stimulus, receptor, sensory neurone, relay neurone, motor neurone, effector, response
- **Insulin and Glucagon** regulate blood glucose levels in a negative feedback loop

## CXC Exam Tips

- Know the specific enzymes, where they are produced, and what they break down
- Be able to label the heart, digestive system, and nephron (kidney unit) accurately
- For experiments, understand controls, variables, and how to interpret results
- Homeostasis questions often require you to explain negative feedback mechanisms clearly
- Practise describing the pathway of blood through the heart and body`,
  },
  {
    subjectName: 'Biology',
    topicName: 'Genetics & Heredity',
    title: 'Study Guide: Biology - Genetics & Heredity',
    content: `# Genetics & Heredity

## Key Concepts and Definitions

- **DNA (Deoxyribonucleic Acid)** is the molecule that carries genetic instructions; it has a double helix structure
- **Gene** is a segment of DNA that codes for a specific protein or trait
- **Allele** is an alternative form of a gene (e.g., brown eyes allele vs blue eyes allele)
- **Chromosome** is a thread-like structure of DNA found in the nucleus; humans have 46 chromosomes (23 pairs)
- **Genotype** is the genetic makeup of an organism (e.g., Bb, BB, bb)
- **Phenotype** is the observable physical characteristics determined by the genotype (e.g., brown eyes)
- **Homozygous** means having two identical alleles for a gene (BB or bb)
- **Heterozygous** means having two different alleles for a gene (Bb)
- **Dominant Allele** masks the effect of the recessive allele; represented by a capital letter (B)
- **Recessive Allele** is only expressed when both alleles are recessive; represented by a lowercase letter (b)
- **Punnett Square** is a grid used to predict the possible genotypes and phenotypes of offspring
- **Monohybrid Cross** involves one pair of contrasting traits
- **Sex-Linked Inheritance** involves genes located on the X chromosome (e.g., colour blindness, haemophilia)
- **Mutation** is a change in the DNA sequence that can be harmful, beneficial, or neutral

## Important Rules

- Mendel's First Law (Segregation): alleles separate during gamete formation, so each gamete carries one allele for each gene
- Mendel's Second Law (Independent Assortment): alleles of different genes assort independently during gamete formation
- In a monohybrid cross between two heterozygous parents (Bb x Bb), the expected ratio is 3:1 for phenotype (dominant:recessive) and 1:2:1 for genotype
- Males are XY and females are XX; sex-linked traits are more common in males because they only have one X chromosome
- Genetic variation arises from mutation, meiosis (crossing over, independent assortment), and random fertilisation

## CXC Exam Tips

- Always show your Punnett square and clearly state the genotypes and phenotypes of parents and offspring
- When solving genetic problems, define your symbols before starting (e.g., B = brown eyes, b = blue eyes)
- Remember that probability ratios are expected results, not guaranteed outcomes
- For sex-linked inheritance, clearly show the X and Y chromosomes in your crosses
- Know examples of genetic disorders: sickle cell anaemia, cystic fibrosis, Down syndrome, colour blindness`,
  },
  {
    subjectName: 'Biology',
    topicName: 'Plant Biology',
    title: 'Study Guide: Biology - Plant Biology',
    content: `# Plant Biology

## Key Concepts and Definitions

- **Photosynthesis** is the process by which green plants convert light energy into chemical energy (glucose)
- **Photosynthesis Equation**: 6CO2 + 6H2O + light energy produces C6H12O6 + 6O2
- **Chlorophyll** is the green pigment in chloroplasts that absorbs light energy, mainly red and blue wavelengths
- **Transpiration** is the loss of water vapour from the leaves of plants through stomata
- **Stomata** are tiny pores on the underside of leaves that allow gas exchange (CO2 in, O2 out)
- **Guard Cells** control the opening and closing of stomata
- **Xylem** transports water and dissolved minerals from roots to leaves (one-directional)
- **Phloem** transports sugars (products of photosynthesis) from leaves to all parts of the plant (two-directional)
- **Translocation** is the movement of sugars through the phloem from source (leaves) to sink (roots, fruits)
- **Tropism** is a growth response to a stimulus: phototropism (light), geotropism/gravitropism (gravity), hydrotropism (water)
- **Plant Hormones (Auxins)** promote cell elongation and control tropisms
- **Mineral Ions** essential for plants: nitrogen (for proteins), magnesium (for chlorophyll), potassium (for flowers/fruit), phosphorus (for roots/DNA)

## Key Processes

- **Limiting Factors of Photosynthesis**: light intensity, CO2 concentration, temperature — the one in shortest supply limits the rate
- **Water Uptake**: root hair cells increase surface area; water enters by osmosis; moves through root cortex and into xylem
- **Transpiration Stream**: water moves from roots through xylem to leaves, evaporates from leaf cells, and exits through stomata
- **Factors affecting transpiration rate**: temperature, humidity, wind speed, light intensity
- **Flowering** is controlled by day length (photoperiodism) and plant hormones

## CXC Exam Tips

- Know the word equation and balanced chemical equation for photosynthesis
- Be able to explain the effect of limiting factors on the rate of photosynthesis using graphs
- Practise labelling the cross-section of a leaf and identifying xylem and phloem in stem diagrams
- For transpiration experiments (potometer), know how to measure the rate and what variables affect it
- Understand the differences between xylem and phloem — structure and function`,
  },
  {
    subjectName: 'Biology',
    topicName: 'Evolution',
    title: 'Study Guide: Biology - Evolution',
    content: `# Evolution

## Key Concepts and Definitions

- **Evolution** is the gradual change in inherited characteristics of a population over many generations
- **Natural Selection** (Darwin's theory) is the process where organisms with favourable traits are more likely to survive, reproduce, and pass on their genes
- **Adaptation** is a characteristic that improves an organism's chances of survival and reproduction in its environment
- **Fitness** in biological terms refers to an organism's ability to survive and produce fertile offspring
- **Speciation** is the formation of a new species from an existing one, often due to geographic isolation
- **Fossil Record** provides evidence of evolution by showing how organisms have changed over time
- **Homologous Structures** are similar structures in different species that share a common ancestor (e.g., human arm, whale flipper, bat wing)
- **Analogous Structures** serve similar functions but have different evolutionary origins (e.g., insect wing and bird wing)
- **Vestigial Organs** are remnants of structures that were functional in ancestors but are reduced or unused in descendants (e.g., human appendix, whale pelvis)
- **Selective Breeding (Artificial Selection)** is when humans choose organisms with desired traits to breed, producing varieties of crops and animals

## Evidence for Evolution

- Fossil record showing gradual changes in organisms over millions of years
- Comparative anatomy: homologous structures suggest common ancestry
- Comparative embryology: early embryos of different vertebrates are remarkably similar
- DNA evidence: closely related species share more of their DNA sequence
- Geographic distribution of species (biogeography): species on isolated islands resemble those on the nearest mainland
- Antibiotic resistance in bacteria: evolution occurring in real time

## CXC Exam Tips

- Be able to explain natural selection step by step: variation exists, some traits are advantageous, those organisms survive and reproduce more, the favourable trait becomes more common
- Know the difference between Darwin's and Lamarck's theories — examiners may ask you to compare them
- Use specific examples: peppered moths, antibiotic resistance, Galapagos finches
- Understand that evolution occurs at the population level, not in individuals
- Be able to interpret data showing changes in populations over time`,
  },

  // ═══════════════════════════════════════════════════════════
  //  CHEMISTRY
  // ═══════════════════════════════════════════════════════════
  {
    subjectName: 'Chemistry',
    topicName: 'Atomic Structure',
    title: 'Study Guide: Chemistry - Atomic Structure',
    content: `# Atomic Structure

## Key Concepts and Definitions

- **Atom** is the smallest unit of an element that retains the chemical properties of that element
- **Proton** is a positively charged particle found in the nucleus; its number defines the element
- **Neutron** is a neutral (uncharged) particle found in the nucleus
- **Electron** is a negatively charged particle that orbits the nucleus in electron shells (energy levels)
- **Atomic Number (Z)** equals the number of protons in the nucleus; it identifies the element
- **Mass Number (A)** equals the total number of protons plus neutrons: A = Z + N
- **Isotope** is an atom of the same element (same Z) with a different number of neutrons (different A)
- **Relative Atomic Mass (Ar)** is the weighted average mass of an atom relative to 1/12th the mass of a carbon-12 atom
- **Electron Configuration** describes how electrons are arranged in shells: first shell holds 2, second holds 8, third holds 18
- **Valence Electrons** are the electrons in the outermost shell; they determine chemical behaviour
- **Ion** is a charged particle formed when an atom gains or loses electrons (cation = positive, anion = negative)
- **Molecule** is two or more atoms bonded together; can be of the same element (O2) or different elements (H2O)

## Important Rules

- Number of protons = Number of electrons (in a neutral atom)
- Number of neutrons = Mass number - Atomic number
- The Periodic Table is arranged by increasing atomic number
- Elements in the same group (column) have the same number of valence electrons and similar chemical properties
- Elements in the same period (row) have the same number of electron shells
- Noble gases (Group 0/18) have full outer shells and are unreactive
- Metals tend to lose electrons (form positive ions); non-metals tend to gain electrons (form negative ions)

## CXC Exam Tips

- Practise writing electron configurations for the first 20 elements
- Know the first 20 elements by name, symbol, and atomic number
- When drawing atomic diagrams, show the nucleus and correct number of electrons in each shell
- For isotope questions, be clear about what changes (neutrons) and what stays the same (protons)
- Understand that ions are formed by electron transfer, not proton transfer`,
  },
  {
    subjectName: 'Chemistry',
    topicName: 'Chemical Bonding',
    title: 'Study Guide: Chemistry - Chemical Bonding',
    content: `# Chemical Bonding

## Key Concepts and Definitions

- **Chemical Bond** is a force of attraction that holds atoms together in compounds
- **Ionic Bonding** involves the transfer of electrons from a metal to a non-metal, forming positive and negative ions that are held together by electrostatic attraction
- **Covalent Bonding** involves the sharing of electron pairs between non-metal atoms
- **Metallic Bonding** occurs in metals where positive metal ions are held together in a "sea" of delocalised electrons
- **Electrovalent/Ionic Compound** has high melting and boiling points, conducts electricity when molten or dissolved, and forms a crystal lattice
- **Simple Covalent Molecule** has low melting and boiling points, does not conduct electricity, and consists of discrete molecules
- **Giant Covalent Structure** (e.g., diamond, graphite, silicon dioxide) has very high melting points due to strong covalent bonds throughout
- **Polarity**: in a polar covalent bond, electrons are shared unequally; the more electronegative atom attracts electrons more
- **Intermolecular Forces** are weaker forces between molecules (van der Waals, hydrogen bonds) — they determine physical properties like melting point
- **Dative/Coordinate Bond** is a covalent bond where both electrons come from the same atom
- **Electronegativity** is the ability of an atom to attract shared electrons in a covalent bond

## Important Properties

- **Ionic compounds**: high melting/boiling points, soluble in water, conduct electricity when molten/aqueous, form crystal lattices
- **Simple covalent molecules**: low melting/boiling points, insoluble in water, do not conduct electricity, have weak intermolecular forces
- **Giant covalent structures**: very high melting/boiling points, insoluble, diamond does not conduct but graphite does
- **Metals**: high melting/boiling points, good conductors of heat and electricity, malleable and ductile

## CXC Exam Tips

- Be able to draw dot-and-cross diagrams for ionic and covalent compounds
- Know the properties that distinguish ionic from covalent compounds — conductivity tests are key
- For ionic bonding questions, clearly show electron transfer using arrows
- Understand that giant covalent structures have very different properties from simple covalent molecules
- Remember that metallic bonding explains properties like conductivity, malleability, and high melting points`,
  },
  {
    subjectName: 'Chemistry',
    topicName: 'Stoichiometry',
    title: 'Study Guide: Chemistry - Stoichiometry',
    content: `# Stoichiometry

## Key Concepts and Definitions

- **Mole** is the SI unit for amount of substance; one mole contains 6.022 x 10^23 particles (Avogadro's Number)
- **Molar Mass** is the mass of one mole of a substance in grams; numerically equal to the relative molecular mass
- **Relative Molecular Mass (Mr)** is the sum of the relative atomic masses of all atoms in a molecule
- **Empirical Formula** gives the simplest whole-number ratio of atoms in a compound
- **Molecular Formula** gives the actual number of atoms of each element in a molecule
- **Stoichiometry** is the calculation of quantities in chemical reactions using balanced equations
- **Limiting Reactant** is the reactant that is completely consumed and determines the amount of product formed
- **Excess Reactant** is the reactant that is not completely used up
- **Percentage Yield** = (actual yield / theoretical yield) x 100%
- **Percentage Composition** = (mass of element in compound / molar mass of compound) x 100%
- **Concentration** = moles of solute / volume of solution (in dm^3 or mol/dm^3)
- **Molar Volume** of a gas at room temperature and pressure (r.t.p.) is approximately 24 dm^3/mol

## Important Formulas

- Moles = Mass / Molar Mass (n = m / M)
- Moles = Concentration x Volume (n = C x V)
- Mass = Moles x Molar Mass (m = n x M)
- Concentration = Moles / Volume (C = n / V)
- Avogadro's Number: 6.022 x 10^23 particles per mole
- To find empirical formula from percentages: convert percentages to moles, divide by smallest, round to nearest whole number

## CXC Exam Tips

- Always balance chemical equations before doing any stoichiometric calculations
- Show all working clearly — method marks are awarded even if the final answer is wrong
- Pay attention to units: convert cm^3 to dm^3 by dividing by 1000, and cm^3 to litres by dividing by 1000
- For gas volume calculations at r.t.p., use the molar volume of 24 dm^3/mol
- Check if your answer is reasonable — a yield over 100% is not possible
- Practise converting between empirical and molecular formulas`,
  },
  {
    subjectName: 'Chemistry',
    topicName: 'Organic Chemistry',
    title: 'Study Guide: Chemistry - Organic Chemistry',
    content: `# Organic Chemistry

## Key Concepts and Definitions

- **Organic Chemistry** is the study of carbon-containing compounds (except carbonates, oxides, and carbides)
- **Hydrocarbon** is a compound containing only carbon and hydrogen atoms
- **Homologous Series** is a family of organic compounds with the same general formula, similar chemical properties, and successive members differing by CH2
- **Alkane** is a saturated hydrocarbon with single bonds only; general formula CnH2n+2
- **Alkene** is an unsaturated hydrocarbon with at least one carbon-carbon double bond; general formula CnH2n
- **Alkyne** is a hydrocarbon with at least one carbon-carbon triple bond; general formula CnH2n-2
- **Functional Group** is an atom or group of atoms that determines the chemical properties of a compound (e.g., -OH alcohol, -COOH carboxylic acid)
- **Isomerism** occurs when compounds have the same molecular formula but different structural arrangements
- **Alcohol** contains the -OH functional group (e.g., methanol CH3OH, ethanol C2H5OH)
- **Carboxylic Acid** contains the -COOH functional group (e.g., ethanoic acid CH3COOH)
- **Ester** is formed by the reaction of an alcohol with a carboxylic acid; has a sweet fruity smell
- **Polymer** is a large molecule made by joining many small repeating units (monomers) together

## Key Reactions

- **Combustion**: hydrocarbon + oxygen produces carbon dioxide + water (complete) or carbon monoxide + water (incomplete)
- **Addition Reaction**: adding hydrogen, water, or halogens across a double bond (alkenes only)
- **Substitution Reaction**: replacing a hydrogen atom (alkanes react with halogens in UV light)
- **Fermentation**: glucose produces ethanol + carbon dioxide (catalysed by enzymes in yeast)
- **Esterification**: alcohol + carboxylic acid produces ester + water (acid catalyst)
- **Polymerisation**: many small monomer molecules join to form a polymer (e.g., ethene to polyethene)

## CXC Exam Tips

- Memorise the general formulas and first four members of each homologous series
- Know the functional groups and their tests: alcohols (litmus stays red), alkenes (bromine water decolourises), carboxylic acids (litmus turns red)
- Be able to draw structural and displayed formulae for organic compounds
- Understand the difference between complete and incomplete combustion
- For polymer questions, identify the monomer from the polymer structure and vice versa`,
  },
  {
    subjectName: 'Chemistry',
    topicName: 'Acids, Bases & Salts',
    title: 'Study Guide: Chemistry - Acids, Bases & Salts',
    content: `# Acids, Bases & Salts

## Key Concepts and Definitions

- **Acid** is a substance that produces hydrogen ions (H+) when dissolved in water; pH less than 7
- **Base** is a substance that neutralises an acid; many produce hydroxide ions (OH-) in water
- **Alkali** is a soluble base; pH greater than 7
- **pH Scale** measures acidity or alkalinity from 0 (most acidic) to 14 (most alkaline); 7 is neutral
- **Strong Acid** completely ionises in water (e.g., HCl, H2SO4, HNO3)
- **Weak Acid** only partially ionises in water (e.g., ethanoic acid, citric acid)
- **Neutralisation** is the reaction between an acid and a base producing a salt and water: Acid + Base produces Salt + Water
- **Salt** is an ionic compound formed when the hydrogen of an acid is replaced by a metal or ammonium ion
- **Precipitation Reaction** produces an insoluble solid (precipitate) when two solutions are mixed
- **Indicator** is a substance that changes colour depending on pH (litmus, universal indicator, phenolphthalein)
- **Amphoteric** substances can act as both acids and bases (e.g., aluminium oxide, zinc oxide)

## Important Reactions

- Acid + Metal produces Salt + Hydrogen gas
- Acid + Base (metal oxide/hydroxide) produces Salt + Water
- Acid + Carbonate produces Salt + Water + Carbon dioxide
- Titration: a technique to determine the concentration of an unknown solution using a standard solution
- Salt preparation methods: acid + metal, acid + base, acid + carbonate, titration, precipitation

## Common Salts and Their Uses

- Sodium chloride (NaCl): table salt, food preservation
- Calcium carbonate (CaCO3): limestone, antacid
- Copper(II) sulphate (CuSO4): fungicide, electroplating
- Ammonium nitrate (NH4NO3): fertiliser

## CXC Exam Tips

- Know the tests for gases: hydrogen (squeaky pop), carbon dioxide (turns limewater milky), oxygen (relights glowing splint)
- For titration calculations, always show your working and use the mole ratio from the balanced equation
- Practise writing word and balanced symbol equations for acid reactions
- Remember that all nitrates, sodium, potassium, and ammonium salts are soluble
- Know the colours of common metal hydroxide precipitates in sodium hydroxide solution`,
  },
  {
    subjectName: 'Chemistry',
    topicName: 'Industrial Chemistry',
    title: 'Study Guide: Chemistry - Industrial Chemistry',
    content: `# Industrial Chemistry

## Key Concepts and Definitions

- **Haber Process** manufactures ammonia (NH3) from nitrogen and hydrogen gases
- **Contact Process** manufactures sulphuric acid (H2SO4) from sulphur
- **Electrolysis** uses electrical energy to drive non-spontaneous chemical reactions
- **Rusting** is the corrosion of iron in the presence of water and oxygen, forming hydrated iron(III) oxide
- **Alloy** is a mixture of a metal with other elements to improve properties (e.g., steel = iron + carbon)
- **Biogas** is a fuel gas produced by the anaerobic decomposition of organic matter, mainly methane
- **Heavy Industry** involves the large-scale production of chemicals such as ammonia, sulphuric acid, and metals

## Key Industrial Processes

- **Haber Process**: N2 + 3H2 produces 2NH3; conditions: iron catalyst, 450 degrees Celsius, 200 atmospheres
- **Contact Process**: S + O2 produces SO2; 2SO2 + O2 produces 2SO3 (V2O5 catalyst, 450 degrees Celsius); SO3 + H2O produces H2SO4
- **Extraction of Iron** in blast furnace: iron ore (haematite) reduced by carbon monoxide at high temperatures
- **Extraction of Aluminium** by electrolysis of molten aluminium oxide (bauxite); cathode and anode reactions

## Environmental Considerations

- Industrial processes can cause air pollution (SO2, NOx, CO2), water pollution, and soil contamination
- Catalytic converters reduce vehicle exhaust emissions
- Scrubbers remove SO2 from industrial waste gases
- Recycling reduces the need for raw material extraction
- Biogas production reduces waste and provides renewable energy

## CXC Exam Tips

- Know the raw materials, conditions, catalysts, and equations for the Haber and Contact processes
- For electrolysis questions, identify the products at each electrode and write half-equations
- Understand the factors that affect the rate of the Haber process and why those conditions are chosen (compromise between rate and yield)
- Be able to explain methods of rust prevention: painting, oiling, galvanising, sacrificial protection
- Remember economic and environmental factors when discussing industrial chemistry`,
  },

  // ═══════════════════════════════════════════════════════════
  //  PHYSICS
  // ═══════════════════════════════════════════════════════════
  {
    subjectName: 'Physics',
    topicName: 'Mechanics',
    title: 'Study Guide: Physics - Mechanics',
    content: `# Mechanics

## Key Concepts and Definitions

- **Speed** is the rate of change of distance: Speed = Distance / Time (scalar quantity, no direction)
- **Velocity** is speed in a given direction (vector quantity, has magnitude and direction)
- **Acceleration** is the rate of change of velocity: a = (v - u) / t
- **Displacement** is the distance moved in a particular direction from a starting point
- **Force** is a push or pull that can change the state of motion or shape of an object; measured in Newtons (N)
- **Mass** is the amount of matter in an object, measured in kilograms (kg); it is constant
- **Weight** is the gravitational force on an object: W = mg; measured in Newtons
- **Friction** opposes motion between surfaces in contact; useful for walking but causes energy loss
- **Momentum** = mass x velocity; it is conserved in collisions
- **Work** is done when a force moves an object: Work = Force x Distance (measured in Joules)
- **Power** is the rate of doing work: Power = Work / Time (measured in Watts)
- **Energy** is the capacity to do work; measured in Joules

## Newton's Laws of Motion

- **First Law**: An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by an unbalanced force (Law of Inertia)
- **Second Law**: Force = mass x acceleration (F = ma); the acceleration of an object is directly proportional to the net force and inversely proportional to its mass
- **Third Law**: For every action, there is an equal and opposite reaction

## Important Formulas

- Equations of motion: v = u + at, s = ut + 1/2at^2, v^2 = u^2 + 2as, s = (u+v)/2 x t
- Kinetic Energy = 1/2 x m x v^2
- Gravitational Potential Energy = m x g x h
- Law of Conservation of Energy: total energy remains constant (energy cannot be created or destroyed)

## CXC Exam Tips

- Draw free-body diagrams for force questions — they help identify all forces acting on an object
- Always include units in your answers and check they are consistent
- For projectile motion, treat horizontal and vertical components separately
- In energy questions, remember that total energy at the top equals total energy at the bottom (conservation)
- Practise solving problems with the equations of motion — know when to use each one`,
  },
  {
    subjectName: 'Physics',
    topicName: 'Waves & Optics',
    title: 'Study Guide: Physics - Waves & Optics',
    content: `# Waves & Optics

## Key Concepts and Definitions

- **Wave** is a disturbance that transfers energy from one place to another without transferring matter
- **Transverse Wave** has oscillations perpendicular to the direction of energy transfer (e.g., light, water waves)
- **Longitudinal Wave** has oscillations parallel to the direction of energy transfer (e.g., sound waves)
- **Wavelength** is the distance between two consecutive identical points on a wave (e.g., crest to crest)
- **Frequency** is the number of waves passing a point per second; measured in Hertz (Hz)
- **Amplitude** is the maximum displacement from the rest position; it determines the energy and loudness/brightness
- **Period** is the time for one complete wave cycle: T = 1/f
- **Wave Speed** = frequency x wavelength (v = f x lambda)
- **Electromagnetic Spectrum** (in order of increasing frequency/wavelength decreasing): radio, microwave, infrared, visible, ultraviolet, X-ray, gamma ray
- **Reflection** is the bouncing of a wave off a surface; angle of incidence = angle of reflection
- **Refraction** is the bending of a wave as it passes from one medium to another due to a change in speed
- **Diffraction** is the spreading of a wave as it passes through a gap or around an obstacle
- **Convex Lens** is thicker at the centre and converges light rays; used as a magnifying glass

## Important Formulas

- Wave equation: v = f x lambda
- Law of Reflection: angle of incidence (i) = angle of reflection (r)
- Refractive index: n = sin(i) / sin(r) = speed of light in vacuum / speed of light in medium
- Lens equation: 1/f = 1/u + 1/v (f = focal length, u = object distance, v = image distance)
- Magnification = image height / object height = v / u

## CXC Exam Tips

- Draw ray diagrams accurately using a ruler and pencil for optics questions
- For refraction, remember that light bends towards the normal when entering a denser medium
- Know the uses and dangers of each part of the electromagnetic spectrum
- In sound questions, remember sound cannot travel in a vacuum and needs a medium
- Practise calculating image positions and magnifications using the lens equation`,
  },
  {
    subjectName: 'Physics',
    topicName: 'Thermal Physics',
    title: 'Study Guide: Physics - Thermal Physics',
    content: `# Thermal Physics

## Key Concepts and Definitions

- **Temperature** measures the average kinetic energy of particles in a substance; measured in degrees Celsius or Kelvin
- **Heat** is thermal energy transferred from a hotter object to a cooler one; measured in Joules
- **Specific Heat Capacity (c)** is the energy needed to raise the temperature of 1 kg of a substance by 1 degree Celsius
- **Specific Latent Heat** is the energy needed to change the state of 1 kg of a substance without changing its temperature
- **Latent Heat of Fusion** is the energy needed to melt a solid at its melting point
- **Latent Heat of Vaporisation** is the energy needed to boil a liquid at its boiling point
- **Conduction** is the transfer of heat through a substance without the substance itself moving (mainly in solids)
- **Convection** is the transfer of heat through fluids (liquids and gases) by the movement of the fluid itself
- **Radiation** is the transfer of heat by electromagnetic waves; does not require a medium
- **Conductor** allows heat to flow through easily (e.g., metals)
- **Insulator** resists heat flow (e.g., wood, plastic, air)

## Important Formulas

- Energy for temperature change: E = m x c x delta-T
- Energy for change of state: E = m x L (where L is the specific latent heat)
- Conversion: T(Kelvin) = T(Celsius) + 273
- Boyle's Law (for gases at constant temperature): P1 x V1 = P2 x V2

## Key Ideas

- During a change of state (melting, boiling), temperature remains constant even though heat is still being supplied
- Metals are good conductors because they have free electrons that transfer kinetic energy
- Black, dull surfaces are better absorbers and emitters of radiation than white, shiny surfaces
- Evaporation causes cooling because the most energetic molecules escape from the liquid surface
- Pressure, volume, and temperature of gases are related by the gas laws

## CXC Exam Tips

- Be able to describe methods of heat transfer in real-world situations (e.g., how a vacuum flask works)
- For specific heat capacity experiments, know how to calculate energy and identify sources of error
- Draw cooling curves and explain the flat sections where change of state occurs
- Remember that during boiling, energy is being used to overcome intermolecular forces, not to increase temperature
- Practise converting between degrees Celsius and Kelvin`,
  },
  {
    subjectName: 'Physics',
    topicName: 'Electricity & Magnetism',
    title: 'Study Guide: Physics - Electricity & Magnetism',
    content: `# Electricity & Magnetism

## Key Concepts and Definitions

- **Current (I)** is the flow of electric charge; measured in Amperes (A) using an ammeter in series
- **Voltage (V)** is the potential difference that drives current; measured in Volts using a voltmeter in parallel
- **Resistance (R)** opposes the flow of current; measured in Ohms
- **Ohm's Law**: V = I x R (voltage equals current times resistance)
- **Series Circuit** has components connected one after another: current is the same throughout, voltage is shared
- **Parallel Circuit** has components connected across the same two points: voltage is the same across each branch, current is shared
- **Electrical Power**: P = V x I = I^2 x R = V^2 / R (measured in Watts)
- **Electrical Energy**: E = V x I x t = P x t (measured in Joules or kilowatt-hours, kWh)
- **Magnetic Field** is the region around a magnet where a magnetic force can be detected
- **Electromagnet** is a temporary magnet made by passing current through a coil of wire around a soft iron core
- **Fleming's Left-Hand Rule** (motor effect): thumb = force, first finger = field, second finger = current
- **Transformer** changes the voltage of an alternating current: Vp/Vs = Np/Ns (primary/secondary voltage and turns)

## Important Formulas

- Ohm's Law: V = I x R
- Power: P = V x I
- Energy: E = V x I x t
- Series resistance: Rtotal = R1 + R2 + R3
- Parallel resistance: 1/Rtotal = 1/R1 + 1/R2 + 1/R3
- Cost of electricity: Cost = Power(kW) x Time(hours) x Rate

## CXC Exam Tips

- For circuit diagrams, use standard symbols and draw wires as straight lines with right angles
- Know the colour codes: live = brown, neutral = blue, earth = green/yellow
- In series circuits, if one component fails, all components stop working
- In parallel circuits, each branch operates independently
- For transformer calculations, remember that a step-up transformer increases voltage but decreases current
- Practise calculating the cost of running electrical appliances using the kWh unit`,
  },
  {
    subjectName: 'Physics',
    topicName: 'Nuclear Physics',
    title: 'Study Guide: Physics - Nuclear Physics',
    content: `# Nuclear Physics

## Key Concepts and Definitions

- **Nucleus** is the dense central part of an atom containing protons and neutrons
- **Radioactivity** is the spontaneous emission of radiation from unstable nuclei
- **Alpha Particle** is a helium nucleus (2 protons + 2 neutrons); highly ionising, low penetration (stopped by paper)
- **Beta Particle** is a fast-moving electron emitted from the nucleus when a neutron changes to a proton; moderately ionising, stopped by aluminium
- **Gamma Ray** is high-energy electromagnetic radiation; weakly ionising, high penetration (stopped by thick lead or concrete)
- **Half-Life** is the time taken for half of the radioactive nuclei in a sample to decay
- **Nuclear Fission** is the splitting of a large, unstable nucleus into smaller nuclei, releasing a large amount of energy
- **Nuclear Fusion** is the joining of small nuclei to form a larger nucleus, releasing even more energy than fission
- **Chain Reaction** occurs when neutrons released in fission cause further fission reactions
- **Isotope** has the same number of protons but different numbers of neutrons
- **Background Radiation** is radiation present in the environment from natural sources (radon gas, cosmic rays, rocks) and artificial sources (medical X-rays, nuclear fallout)
- **Mass Defect** is the difference between the mass of a nucleus and the sum of its individual nucleons; the "missing" mass is converted to binding energy

## Important Formulas

- After n half-lives, remaining fraction = (1/2)^n
- Activity = number of decays per second (measured in Becquerels, Bq)
- E = mc^2: the energy equivalent of mass (Einstein's equation)

## Safety and Applications

- Radiation safety: time (minimise exposure), distance (stay far from source), shielding (use appropriate barriers)
- Medical uses: radiotherapy for cancer treatment, tracers for diagnosis, sterilisation of equipment
- Industrial uses: thickness gauging, radiography (checking for flaws in materials), power generation in nuclear power stations
- Environmental monitoring of radiation levels is essential around nuclear facilities

## CXC Exam Tips

- Know the properties of alpha, beta, and gamma radiation — penetration, ionisation, and what stops each type
- Be able to balance nuclear equations: mass number and atomic number must be conserved
- For half-life calculations, use a table to track the remaining amount after each half-life
- Understand the difference between nuclear fission (splitting) and fusion (joining) and where each occurs
- Be able to describe the advantages and disadvantages of nuclear power`,
  },

  // ═══════════════════════════════════════════════════════════
  //  HISTORY
  // ═══════════════════════════════════════════════════════════
  {
    subjectName: 'History',
    topicName: 'The Indigenous Peoples',
    title: 'Study Guide: History - The Indigenous Peoples',
    content: `# The Indigenous Peoples of the Caribbean

## Key Concepts and Definitions

- **Tainos (Arawaks)** were one of the first indigenous groups in the Caribbean, settling in the Greater Antilles (Cuba, Jamaica, Hispaniola, Puerto Rico)
- **Kalinago (Caribs)** were later arrivals who settled in the Lesser Antilles; they were more warlike than the Tainos
- **Maya** were a Mesoamerican civilisation whose influence extended into the Caribbean region; known for advanced mathematics, astronomy, and architecture
- **Ciboney (Guanahatabey)** were the earliest known inhabitants of the Caribbean, primarily in Cuba and western Hispaniola
- **Migrations** to the Caribbean occurred in waves from South America (via the Orinoco River delta) and Central America
- **Slash and Burn Agriculture** was the Taino farming method: clear land, burn vegetation, plant crops, move when soil was depleted
- **Conuco** was the Taino system of raised mound farming that improved drainage and soil fertility
- **Cacique** was the chief or leader of a Taino community; held both political and religious authority
- **Zemi** were spiritual beings/gods worshipped by the Tainos; they carved zemi figures from wood, stone, and bone
- **Cohoba** was a religious ceremony involving the inhalation of hallucinogenic powder to communicate with the spirits
- **Petroglyphs** were rock carvings made by indigenous peoples, found throughout the Caribbean
- **Batey** was a ball court used by Tainos for both sport and religious ceremonies

## Social and Cultural Life

- Tainos lived in villages called yucayeques, organised around a central plaza
- Houses were thatched rectangular structures (bohios) for common people and round structures (caney) for the cacique
- Kalinago society was more egalitarian; men and women had distinct roles
- Kalinago men were warriors and fishermen; women were responsible for farming, cooking, and child-rearing
- Both Tainos and Kalinago were skilled in pottery, weaving, basket making, and wood carving
- The Tainos believed in an afterlife called Coaybay; they buried their dead with possessions

## Impact of European Contact

- Indigenous populations were devastated by European diseases (smallpox, influenza, measles) to which they had no immunity
- The Encomienda system forced indigenous people into labour for Spanish settlers
- Many indigenous people died from overwork, malnutrition, and abuse under colonial rule
- By the mid-16th century, the Taino population had been almost completely decimated
- Some Kalinago survived longer in the more remote Lesser Antilles islands

## CXC Exam Tips

- Be able to compare and contrast Taino and Kalinago social, political, and economic organisation
- Know the reasons for European success in colonising the indigenous peoples (technology, disease, organisation)
- Use specific evidence and examples in your essays — dates, names, and events matter
- Understand both the achievements of indigenous civilisations and the reasons for their decline
- Practise source-based questions using primary accounts and archaeological evidence`,
  },
  {
    subjectName: 'History',
    topicName: 'European Settlement',
    title: 'Study Guide: History - European Settlement',
    content: `# European Settlement in the Caribbean

## Key Concepts and Definitions

- **Christopher Columbus** arrived in the Caribbean in 1492, landing in the Bahamas and claiming the islands for Spain
- **Spanish Colonisation** was the first European settlement wave; Spain controlled most of the Caribbean for over a century
- **Treaty of Tordesillas (1494)** divided the non-European world between Spain and Portugal
- **Encomienda System** granted Spanish settlers the right to extract labour from indigenous people in exchange for "protection" and Christianisation
- **Repartimiento** was a later, modified labour system that was nominally less brutal but still exploitative
- **British, French, and Dutch Settlement** began in the 17th century as these nations challenged Spanish dominance
- **Plantation System** was established to grow cash crops (sugar, tobacco, cotton) for export to Europe
- **Mercantilism** was the economic policy where colonies existed to enrich the mother country through trade
- **Indentureship** was a system where poor Europeans signed contracts to work for a set number of years in exchange for passage to the Caribbean
- **Buccaneers and Pirates** operated from Caribbean bases like Tortuga and Port Royal, initially tolerated by European powers

## Key Events and Dates

- 1492: Columbus arrives in the Bahamas
- 1493-1502: Columbus makes three more voyages, establishing Spanish settlements
- 1494: Treaty of Tordesillas
- 1496: First Spanish settlement established at Isabella, Hispaniola
- 1600s: British, French, and Dutch begin settling Caribbean islands
- 1627: First British settlement in Barbados
- 1655: British capture Jamaica from Spain
- 1697: Treaty of Ryswick — Spain cedes western Hispaniola (Haiti) to France

## Economic and Social Impact

- The shift from tobacco to sugar transformed Caribbean economies and demographics
- Sugar plantations required massive labour forces, leading to the growth of the transatlantic slave trade
- European settlement displaced and destroyed indigenous civilisations
- Colonial rivalries led to frequent wars between European powers over Caribbean territories
- The plantation system created rigid social hierarchies based on race and class

## CXC Exam Tips

- Know the chronological order of European settlement events
- Be able to explain why different European nations wanted Caribbean colonies
- Understand the economic motivations behind settlement — wealth, trade, and resources
- Compare the approaches of different colonial powers (Spanish, British, French, Dutch)
- Use specific dates, names, and events to support your arguments in essays`,
  },
  {
    subjectName: 'History',
    topicName: 'Slavery & Resistance',
    title: 'Study Guide: History - Slavery & Resistance',
    content: `# Slavery & Resistance in the Caribbean

## Key Concepts and Definitions

- **Chattel Slavery** treated enslaved Africans as property that could be bought, sold, and inherited
- **Triangular Trade** connected Europe, Africa, and the Americas: manufactured goods to Africa, enslaved people to the Americas, raw materials to Europe
- **Middle Passage** was the horrific transatlantic voyage endured by enslaved Africans; conditions were brutal with high mortality rates
- **Plantation Slavery** was a system of agricultural production using enslaved labour to grow cash crops for export
- **Seasoning** was the process of "breaking in" newly arrived enslaved Africans to plantation discipline
- **Slave Codes** were laws that restricted the rights and movements of enslaved people and institutionalised racial hierarchy
- **Manumission** was the legal act of freeing an enslaved person, sometimes by the enslaver's will or by self-purchase
- **Maroon** refers to communities of escaped enslaved people who established independent settlements, often in remote mountainous areas
- **Haitian Revolution (1791-1804)** was the first and only successful slave revolt, resulting in the independent republic of Haiti
- **Amelioration** was a policy adopted by the British to improve conditions for enslaved people before emancipation

## Forms of Resistance

- **Day-to-day resistance**: working slowly, feigning illness, breaking tools, stealing food
- **Cultural resistance**: maintaining African traditions, music, religion, and language
- **Religious resistance**: obeah, vodou, and myalism as spiritual practices that preserved African identity and sometimes inspired rebellion
- **Running away**: escaping to form Maroon communities or to find freedom
- **Rebellion**: organised armed uprisings against plantation owners (e.g., Tacky's Revolt in Jamaica 1760, Fedon's Rebellion in Grenada 1795)

## Key Figures

- **Toussaint Louverture**: leader of the Haitian Revolution
- **Cudjoe**: leader of the Jamaican Maroons who negotiated a treaty with the British in 1739
- **Nanny of the Maroons**: legendary Jamaican Maroon leader and folk hero
- **Sam Sharpe**: leader of the 1831 Baptist War rebellion in Jamaica

## CXC Exam Tips

- Be able to discuss both active and passive forms of resistance with specific examples
- Understand the economic, social, and political causes and effects of slave rebellions
- Know the key provisions of the Slave Codes and how they controlled enslaved people
- Compare the Haitian Revolution with other Caribbean rebellions
- Use primary source evidence to support your arguments about the slave experience`,
  },
  {
    subjectName: 'History',
    topicName: 'Emancipation',
    title: 'Study Guide: History - Emancipation',
    content: `# Emancipation and its Aftermath

## Key Concepts and Definitions

- **Emancipation** is the freeing of enslaved people from bondage; in the British Caribbean, it was enacted in 1833 (effective 1834)
- **Abolition Movement** was the campaign to end the slave trade and slavery, led by activists in Britain, the Caribbean, and abroad
- **Slave Trade Act (1807)** abolished the transatlantic slave trade in the British Empire
- **Slavery Abolition Act (1833)** abolished slavery throughout most of the British Empire; took effect on 1 August 1834
- **Apprenticeship System (1834-1838)** was a transitional period where "freed" people were required to work for their former enslavers for a set number of hours without pay
- **Full Freedom (1838)** came when the apprenticeship system was prematurely ended on 1 August 1838
- **Compensation** was paid to enslavers for the loss of their "property"; enslaved people received nothing
- **Freed Villages** were communities established by freed people who pooled resources to buy land (e.g., Sligoville in Jamaica)
- **Indentureship** replaced slavery as a labour source; workers from India, China, and Portugal signed contracts to work on Caribbean plantations
- **Morant Bay Rebellion (1865)** led by Paul Bogle protested the poor conditions of freed people and resulted in constitutional reform

## Key Events and Dates

- 1807: Slave Trade Act abolishes the transatlantic slave trade in the British Empire
- 1815-1816: Merikins (freed African-Americans) settle in Trinidad
- 1823: Demerara Rebellion in British Guiana
- 1831-1832: Baptist War (Christmas Rebellion) in Jamaica, led by Sam Sharpe
- 1833: Slavery Abolition Act passed by British Parliament
- 1834: Emancipation proclaimed; apprenticeship begins
- 1838: Full emancipation — apprenticeship ends
- 1865: Morant Bay Rebellion in Jamaica

## Impact of Emancipation

- Formerly enslaved people faced economic hardship: no land, no capital, and limited employment opportunities
- Many turned to subsistence farming, domestic work, or migrated to towns
- The plantation economy declined as freed people refused to work under plantation conditions
- Indentured labourers were brought in to replace enslaved labour on plantations
- Education and religious institutions became important for upward mobility

## CXC Exam Tips

- Understand the difference between the abolition of the slave trade (1807) and the abolition of slavery (1833/1838)
- Know the reasons for emancipation: economic (sugar decline), political (reform movement), humanitarian (abolitionists), and resistance (rebellions)
- Be able to assess the success or failure of the apprenticeship system
- Compare the experiences of freed people across different Caribbean territories
- Discuss the significance of the Morant Bay Rebellion in the push for greater rights`,
  },
  {
    subjectName: 'History',
    topicName: 'Independence Movements',
    title: 'Study Guide: History - Independence Movements',
    content: `# Independence Movements in the Caribbean

## Key Concepts and Definitions

- **Independence** is the political freedom of a colony from colonial rule, establishing self-governance
- **Self-Government** was an intermediate stage where colonies gained limited control over internal affairs while remaining tied to the mother country
- **Federation of the West Indies (1958-1962)** was an attempt to unite British Caribbean colonies into a single independent nation; it failed due to disagreements
- **Constitutional Reform** involved gradual changes from colonial governance to democratic self-rule
- **Trade Union Movement** played a crucial role in political development by organising workers and advocating for rights
- **Universal Adult Suffrage** gave all adults the right to vote, regardless of property ownership or literacy
- **Political Parties** emerged to represent the interests of different social groups and advocate for independence
- **CARICOM (Caribbean Community)** was established in 1973 to promote economic integration and cooperation
- **OECS (Organisation of Eastern Caribbean States)** was formed in 1981 for economic union among smaller islands
- **Non-Aligned Movement** positioned Caribbean nations between the Cold War superpowers during the independence era

## Key Events and Dates

- 1944: Jamaica grants universal adult suffrage
- 1958: Federation of the West Indies established
- 1962: Jamaica and Trinidad and Tobago gain independence (August and August 31 respectively)
- 1966: Barbados and Guyana gain independence
- 1967: Antigua, St. Kitts-Nevis, and others gain associated statehood
- 1973: CARICOM established
- 1974: Grenada gains independence
- 1979: Grenada Revolution
- 1981: Bahamas and Belize gain independence
- 1983: US invasion of Grenada (Operation Urgent Fury)

## Key Figures

- **Norman Manley**: founder of the PNP (Jamaica), advocated for self-government and social reform
- **Alexander Bustamante**: founder of the JLP (Jamaica), first Prime Minister of independent Jamaica
- **Eric Williams**: first Prime Minister of Trinidad and Tobago, historian, and advocate for independence
- **Errol Barrow**: "Father of Independence" in Barbados, first Prime Minister
- **Cheddi Jagan and Forbes Burnham**: key leaders in Guyana's independence movement

## CXC Exam Tips

- Know the independence dates of major Caribbean territories
- Understand the factors that led to independence: political, economic, social, and international pressures
- Be able to discuss why the West Indies Federation failed
- Compare the paths to independence in different territories
- Understand the ongoing challenges faced by newly independent Caribbean nations`,
  },

  // ═══════════════════════════════════════════════════════════
  //  GEOGRAPHY
  // ═══════════════════════════════════════════════════════════
  {
    subjectName: 'Geography',
    topicName: 'Map Reading',
    title: 'Study Guide: Geography - Map Reading',
    content: `# Map Reading and Interpretation

## Key Concepts and Definitions

- **Map Scale** is the ratio between distance on the map and actual distance on the ground (e.g., 1:50,000 means 1 cm = 50,000 cm = 500 m)
- **Contour Lines** are lines on a map connecting points of equal height above sea level
- **Contour Interval** is the vertical distance between consecutive contour lines
- **Relief** refers to the shape and height of the land surface shown on a map
- **Grid Reference** is a system of numbered lines on a map used to locate features; 4-figure (e.g., 4523) and 6-figure (e.g., 453234) references
- **Bearing** is the direction from one point to another, measured clockwise from North in degrees
- **Gradient** is the steepness of a slope, calculated as: vertical increase / horizontal distance
- **Drainage Pattern** describes how rivers and streams are arranged on a map (dendritic, trellis, radial, centripetal, annular)
- **Settlement Pattern** describes how houses and buildings are arranged (dispersed, nucleated, linear)
- **Land Use** refers to how land is used: agriculture, forestry, settlement, industry, recreation
- **Map Symbols** are standardised signs and colours used to represent features on a map (blue for water, green for vegetation, brown for relief)
- **Eastings** are the vertical grid lines running north-south; **Northings** are horizontal grid lines running east-west

## Important Calculations

- **Distance**: convert map distance using the scale (measure in cm, convert to km or m)
- **Gradient**: gradient = difference in height / horizontal distance (expressed as 1:n or a ratio)
- **Area**: count squares on the grid, multiply by the area each square represents
- **Bearing**: measure clockwise from north using a protractor; record as a three-figure bearing (e.g., 045 degrees)

## CXC Exam Tips

- Always check the scale before calculating distances or areas
- Use the contour lines to describe relief: closely spaced = steep slope, widely spaced = gentle slope, V-shapes pointing uphill = valley
- When describing a map extract, follow a systematic approach: relief, drainage, vegetation, settlement, communications, land use
- Practise giving 6-figure grid references accurately — third and sixth digits are estimated
- For cross-sections, draw accurately using the graph paper provided and show the height scale clearly`,
  },
  {
    subjectName: 'Geography',
    topicName: 'Climate & Weather',
    title: 'Study Guide: Geography - Climate & Weather',
    content: `# Climate & Weather

## Key Concepts and Definitions

- **Weather** is the day-to-day condition of the atmosphere at a particular place and time (temperature, rainfall, wind, humidity, cloud cover)
- **Climate** is the average weather conditions of a place over a long period (usually 30 years or more)
- **Temperature** is the degree of hotness or coldness of the air, measured in degrees Celsius
- **Precipitation** is any form of water falling from the atmosphere: rain, snow, sleet, hail
- **Humidity** is the amount of water vapour in the air
- **Air Pressure** is the force exerted by the weight of the atmosphere; high pressure = fine weather, low pressure = cloudy/rainy
- **Wind** is the movement of air from high pressure to low pressure areas
- **Trade Winds** are persistent winds blowing from the subtropical high-pressure belts towards the equator
- **Tropical Maritime Climate** is the climate of most Caribbean islands: warm temperatures year-round, high humidity, wet and dry seasons
- **Hurricane (Tropical Cyclone)** is a powerful rotating storm with sustained winds of 119 km/h or more, forming over warm tropical waters
- **El Nino** and **La Nina** are periodic changes in Pacific Ocean temperatures that affect Caribbean weather patterns
- **Microclimate** is a local climate that differs from the general regional climate

## Caribbean Climate Features

- Average temperatures range from 24 to 30 degrees Celsius throughout the year
- Wet season: June to December (coincides with hurricane season)
- Dry season: January to May
- Annual rainfall varies: windward sides of islands receive more rain than leeward sides
- Hurricanes are most likely between June and November, peaking in September

## Factors Affecting Climate

- Latitude (distance from equator)
- Altitude (temperature decreases with height, approximately 6.5 degrees Celsius per 1000m)
- Distance from the sea (maritime influence moderates temperatures)
- Ocean currents (warm currents raise temperatures, cold currents lower them)
- Prevailing winds (affect temperature and rainfall)
- Aspect (direction a slope faces affects temperature and rainfall)

## CXC Exam Tips

- Be able to read and interpret climate graphs (temperature and rainfall)
- Know how to describe the climate of a Caribbean location using data
- Understand the causes and effects of hurricanes, including preparation and response
- Practise comparing the climate of different locations using climate data
- Use specific terminology: maritime, tropical, prevailing, precipitation, humidity`,
  },
  {
    subjectName: 'Geography',
    topicName: 'Plate Tectonics',
    title: 'Study Guide: Geography - Plate Tectonics',
    content: `# Plate Tectonics

## Key Concepts and Definitions

- **Plate Tectonics Theory** states that the Earth's lithosphere is divided into large plates that move on the semi-fluid asthenosphere
- **Lithosphere** is the rigid outer layer of the Earth, consisting of the crust and uppermost mantle
- **Asthenosphere** is the semi-fluid layer below the lithosphere on which the plates move
- **Tectonic Plates** are large sections of the lithosphere that move, collide, and separate
- **Divergent Boundary** (constructive plate margin) occurs where plates move apart, creating new crust (e.g., Mid-Atlantic Ridge)
- **Convergent Boundary** (destructive plate margin) occurs where plates collide; denser plate is subducted beneath the lighter one
- **Transform Boundary** (conservative plate margin) occurs where plates slide past each other horizontally (e.g., Enriquillo-Plantain Garden Fault in the Caribbean)
- **Subduction Zone** is where one plate is forced beneath another into the mantle
- **Volcano** is an opening in the Earth's crust through which magma, gases, and ash erupt
- **Earthquake** is a sudden release of energy in the Earth's crust, producing seismic waves
- **Tsunami** is a large ocean wave generated by underwater earthquakes or volcanic eruptions
- **Hotspot** is a fixed point in the mantle where magma rises to the surface, creating volcanic islands (e.g., Hawaii)
- **Focus** is the point within the Earth where an earthquake originates; **Epicentre** is the point on the surface directly above

## Caribbean Plate Tectonics

- The Caribbean Plate is bounded by the North American Plate, South American Plate, and Cocos Plate
- The Eastern Caribbean is volcanic (part of the Lesser Antilles volcanic arc) due to the North American Plate being subducted beneath the Caribbean Plate
- Active volcanoes include Soufriere Hills (Montserrat), La Soufriere (St. Vincent), and Kick-'em-Jenny (underwater near Grenada)
- The Caribbean is seismically active; major earthquakes have affected Jamaica, Haiti, and Trinidad

## CXC Exam Tips

- Be able to label a diagram of plate boundaries (divergent, convergent, transform)
- Know the distribution of earthquakes and volcanoes in the Caribbean and explain why they occur there
- Understand the difference between the focus and epicentre of an earthquake
- Describe the effects of earthquakes and volcanic eruptions on Caribbean countries
- Discuss strategies for managing tectonic hazards in the Caribbean (monitoring, building codes, evacuation plans)`,
  },
  {
    subjectName: 'Geography',
    topicName: 'Population Geography',
    title: 'Study Guide: Geography - Population Geography',
    content: `# Population Geography

## Key Concepts and Definitions

- **Population Distribution** describes where people live across a region or country (evenly or unevenly spread)
- **Population Density** is the number of people per unit area (usually per square kilometre): Density = Total Population / Total Area
- **Birth Rate** is the number of live births per 1,000 people per year
- **Death Rate** is the number of deaths per 1,000 people per year
- **Natural Increase** = Birth Rate minus Death Rate (expressed as a percentage)
- **Population Growth Rate** = (Birth Rate - Death Rate) / 10 (as a percentage)
- **Fertility Rate** is the average number of children born to a woman during her lifetime
- **Life Expectancy** is the average number of years a person is expected to live
- **Demographic Transition Model (DTM)** describes how population changes as a country develops economically, through five stages
- **Migration** is the movement of people from one place to another; can be internal (within a country) or international (between countries)
- **Push Factors** are conditions that drive people to leave an area (unemployment, poverty, crime, natural disasters)
- **Pull Factors** are conditions that attract people to an area (job opportunities, better services, safety)
- **Brain Drain** is the emigration of highly educated or skilled people from a country
- **Population Pyramid** (age-sex pyramid) is a graph showing the age and sex structure of a population

## Population Issues in the Caribbean

- Many Caribbean countries have an ageing population due to declining birth rates and emigration
- Brain drain is a significant issue, with skilled professionals migrating to North America and Europe
- Urbanisation is causing overcrowding in capital cities and the decline of rural communities
- High population density in small island states puts pressure on limited resources
- Some territories experience seasonal population changes due to tourism

## CXC Exam Tips

- Be able to construct and interpret population pyramids for Caribbean countries
- Know the factors that affect birth rates, death rates, and migration
- Use specific statistics and data when discussing population issues
- Understand the social and economic impacts of migration on both sending and receiving countries
- Practise calculating population density and growth rates from given data`,
  },
  {
    subjectName: 'Geography',
    topicName: 'Economic Activities',
    title: 'Study Guide: Geography - Economic Activities',
    content: `# Economic Activities

## Key Concepts and Definitions

- **Primary Activities** involve extracting or producing raw materials directly from the earth: agriculture, fishing, forestry, mining
- **Secondary Activities** involve manufacturing and processing raw materials into finished or semi-finished goods
- **Tertiary Activities** involve providing services: tourism, education, health, banking, transport, retail
- **Quaternary Activities** involve knowledge-based work: ICT, research, information services
- **Commercial Agriculture** is large-scale farming for sale and profit (e.g., sugar cane, bananas)
- **Subsistence Agriculture** is small-scale farming to feed the farmer's family with little surplus for sale
- **Tourism** is the largest economic sector in most Caribbean countries, contributing significantly to GDP and employment
- **Offshore Banking** provides financial services to non-residents, taking advantage of favourable tax and regulatory environments
- **Free Trade Zone (Export Processing Zone)** is a designated area where goods can be imported, manufactured, and re-exported without customs duties
- **Sustainable Development** meets present needs without compromising the ability of future generations to meet their own needs

## Key Caribbean Economic Activities

- **Agriculture**: sugar cane, bananas, citrus, cocoa, nutmeg, and marijuana (illegal but significant)
- **Tourism**: beach resorts, cruise ship tourism, ecotourism, cultural tourism, and heritage tourism
- **Mining**: bauxite/aluminium in Jamaica and Guyana, oil and natural gas in Trinidad and Tobago
- **Manufacturing**: food processing, beverages, cement, textiles, electronics assembly
- **Financial Services**: offshore banking in Barbados, the Bahamas, and the Cayman Islands

## Economic Challenges

- Over-dependence on tourism makes economies vulnerable to external shocks (natural disasters, global recessions, pandemics)
- Declining agricultural sector due to competition, loss of preferential trade agreements, and climate change
- High levels of debt in many Caribbean countries
- Limited natural resources and small domestic markets
- Vulnerability to climate change: rising sea levels, more intense hurricanes, coral bleaching

## CXC Exam Tips

- Be able to describe and explain the factors influencing the location of economic activities
- Know specific examples of economic activities in named Caribbean countries
- Understand the concept of sustainability and how it applies to Caribbean economic development
- Practise evaluating the advantages and disadvantages of different economic activities
- Use case studies and specific data to support your answers`,
  },
  {
    subjectName: 'Geography',
    topicName: 'Caribbean Environment',
    title: 'Study Guide: Geography - Caribbean Environment',
    content: `# Caribbean Environment

## Key Concepts and Definitions

- **Ecosystem** is a community of living organisms interacting with their physical environment
- **Biodiversity** is the variety of plant and animal species in a given area; the Caribbean is one of the world's biodiversity hotspots
- **Coral Reef** is an underwater ecosystem made of calcium carbonate structures built by coral polyps; provides habitat for thousands of marine species
- **Mangrove Wetland** is a coastal ecosystem with salt-tolerant trees that protect coastlines, filter water, and serve as fish nurseries
- **Deforestation** is the large-scale removal of trees, leading to soil erosion, loss of biodiversity, and climate change
- **Soil Erosion** is the removal of topsoil by water or wind; accelerated by deforestation and poor farming practices
- **Pollution** is the contamination of air, water, or soil by harmful substances
- **Climate Change** is the long-term alteration of temperature and typical weather patterns; the Caribbean is highly vulnerable
- **Sustainable Development** is development that meets present needs without compromising future generations
- **Conservation** is the protection and management of natural resources and the environment
- **Environmental Impact Assessment (EIA)** is a study of the potential environmental effects of a proposed development project

## Environmental Issues in the Caribbean

- **Coral reef degradation**: caused by warming seas, pollution, and overfishing; threatens tourism and fisheries
- **Hurricane damage**: increasingly severe storms destroy infrastructure, agriculture, and natural habitats
- **Plastic pollution**: single-use plastics contaminate beaches, oceans, and marine life
- **Beach erosion**: rising sea levels and poorly planned coastal development threaten beaches
- **Invasive species**: introduced plants and animals outcompete native species (e.g., lionfish, green iguana)
- **Freshwater scarcity**: small islands have limited freshwater resources, worsened by drought and contamination

## Conservation and Management Strategies

- Marine protected areas (MPAs) to conserve coral reefs and marine life
- Reforestation programmes to restore degraded forests and watersheds
- Waste management and recycling initiatives
- Climate adaptation strategies: building codes, sea walls, early warning systems
- Environmental education and awareness programmes
- Regional cooperation through organisations like the Caribbean Environmental Programme (CEP)

## CXC Exam Tips

- Use named examples of environmental issues from specific Caribbean countries
- Be able to describe the causes, effects, and solutions for at least two environmental issues
- Understand the concept of sustainable development and give Caribbean examples
- Practise fieldwork-based questions on rivers, coasts, or ecosystems
- Discuss how both human and natural factors contribute to environmental problems`,
  },

  // ═══════════════════════════════════════════════════════════
  //  PURE MATHEMATICS (CAPE Unit 1)
  // ═══════════════════════════════════════════════════════════
  {
    subjectName: 'Pure Mathematics',
    topicName: 'Functions & Relations',
    title: 'Study Guide: Pure Mathematics - Functions & Relations',
    content: `# Functions & Relations

## Key Concepts and Definitions

- **A Relation** is a set of ordered pairs; it can be represented as a mapping, a set of coordinates, a graph, or an equation
- **A Function** is a relation where each element of the domain maps to exactly one element of the range
- **Domain** is the set of all possible input values (x-values) for which the function is defined
- **Range** is the set of all possible output values (y-values or f(x) values)
- **One-to-One Function**: each element in the range corresponds to exactly one element in the domain (passes horizontal line test)
- **Onto (Surjective) Function**: every element in the codomain is mapped to by at least one element in the domain
- **Composite Function**: f(g(x)) means apply g first, then f to the result
- **Inverse Function** f^(-1)(x) reverses the effect of f(x); exists only for one-to-one functions
- **Identity Function**: f(x) = x; maps every input to itself
- **Modulus Function**: f(x) = |x| always gives a non-negative output
- **Rational Function**: a function expressed as a ratio of two polynomials, e.g., f(x) = (x+1)/(x-2)

## Important Properties

- f(g(x)) is not necessarily equal to g(f(x)) — composition is NOT commutative
- f(f^(-1)(x)) = x and f^(-1)(f(x)) = x
- To find the inverse: replace f(x) with y, swap x and y, solve for y, then replace y with f^(-1)(x)
- For f(g(x)), the domain is restricted to values of x where g(x) is in the domain of f
- The graph of f^(-1)(x) is the reflection of f(x) in the line y = x

## Key Techniques

- To find domain restrictions: identify values that make denominators zero or expressions under square roots negative
- To find the range: solve f(x) = y for x and find restrictions on y, or analyse the graph
- For composite functions, work from the inside out
- When solving equations involving modulus, consider both positive and negative cases: |x| = a means x = a or x = -a

## CXC CAPE Exam Tips

- Always state the domain and range when defining functions
- Show all steps when finding composite functions and inverse functions
- Graph functions accurately — label axes, intercepts, and key points
- For modulus function questions, sketch the graph and identify the critical point
- Practise a variety of questions mixing different types of functions`,
  },
  {
    subjectName: 'Pure Mathematics',
    topicName: 'Trigonometry & Circular Measure',
    title: 'Study Guide: Pure Mathematics - Trigonometry & Circular Measure',
    content: `# Trigonometry & Circular Measure

## Key Concepts and Definitions

- **Radian** is a unit of angular measurement; one radian is the angle subtended at the centre of a circle by an arc equal in length to the radius
- **Arc Length**: s = r x theta (where theta is in radians)
- **Sector Area**: A = 1/2 x r^2 x theta (where theta is in radians)
- **Segment Area**: A = 1/2 x r^2 x (theta - sin(theta))
- **Unit Circle**: a circle with radius 1 centred at the origin; used to define trigonometric functions
- **Sine, Cosine, Tangent**: defined as coordinates on the unit circle for any angle
- **Reciprocal Functions**: cosec(x) = 1/sin(x), sec(x) = 1/cos(x), cot(x) = 1/tan(x)
- **Pythagorean Identities**: sin^2(x) + cos^2(x) = 1, 1 + tan^2(x) = sec^2(x), 1 + cot^2(x) = cosec^2(x)
- **Compound Angle Formulas**: sin(A+B) = sinAcosB + cosAsinB, cos(A+B) = cosAcosB - sinAsinB
- **Double Angle Formulas**: sin(2A) = 2sinAcosA, cos(2A) = cos^2(A) - sin^2(A) = 2cos^2(A) - 1 = 1 - 2sin^2(A)
- **Conversion**: 180 degrees = pi radians, so to convert degrees to radians multiply by pi/180

## Key Identities and Formulas

- sin(A-B) = sinAcosB - cosAsinB
- cos(A-B) = cosAcosB + sinAsinB
- tan(A+B) = (tanA + tanB) / (1 - tanAtanB)
- tan(A-B) = (tanA - tanB) / (1 + tanAtanB)
- cos(2A) = 2cos^2(A) - 1 = 1 - 2sin^2(A)
- tan(2A) = 2tanA / (1 - tan^2(A))

## Solving Trigonometric Equations

- Use identities to express the equation in terms of a single trigonometric function
- Factorise and solve for the trigonometric function
- Find all solutions in the given interval — remember periodicity (sin and cos have period 2pi, tan has period pi)
- For general solutions: if sin(x) = a, then x = arcsin(a) + 2npi or (pi - arcsin(a)) + 2npi

## CXC CAPE Exam Tips

- Always work in radians unless the question specifies degrees
- Memorise the exact values for sin, cos, and tan of 0, pi/6, pi/4, pi/3, pi/2, and their multiples
- When proving identities, work on one side at a time and show each step clearly
- For circular measure problems, draw a diagram and label the radius, arc, and angle
- Practise solving trigonometric equations finding all solutions within a given range`,
  },
  {
    subjectName: 'Pure Mathematics',
    topicName: 'Calculus (Limits)',
    title: 'Study Guide: Pure Mathematics - Calculus (Limits)',
    content: `# Calculus: Limits and Continuity

## Key Concepts and Definitions

- **Limit** describes the value that a function approaches as the input (x) approaches a certain value
- **Notation**: limit as x approaches a of f(x) = L, written as lim(x to a) f(x) = L
- **One-Sided Limits**: left-hand limit (x approaches from below) and right-hand limit (x approaches from above)
- **Limit exists** only when both one-sided limits exist and are equal
- **Infinite Limit**: when f(x) grows without bound as x approaches a value; written as lim = infinity or -infinity
- **Limit at Infinity**: describes the behaviour of f(x) as x becomes very large or very negative
- **Continuity**: a function is continuous at x = a if f(a) exists, lim(x to a) f(x) exists, and lim(x to a) f(x) = f(a)
- **Discontinuity** occurs where a function is not continuous; types include removable (point), jump, and infinite discontinuity
- **Squeeze Theorem**: if g(x) is less than or equal to f(x) is less than or equal to h(x) near a, and both g and h approach L, then f also approaches L
- **Intermediate Value Theorem**: if f is continuous on [a,b], then f takes on every value between f(a) and f(b)

## Limit Laws

- lim (f(x) + g(x)) = lim f(x) + lim g(x)
- lim (f(x) x g(x)) = lim f(x) x lim g(x)
- lim (cf(x)) = c x lim f(x) where c is a constant
- lim (f(x)/g(x)) = lim f(x) / lim g(x), provided lim g(x) is not zero
- lim (f(x))^n = (lim f(x))^n

## Important Limits to Memorise

- lim (x to 0) sin(x)/x = 1
- lim (x to 0) (1 - cos(x))/x = 0
- lim (x to infinity) (1 + 1/x)^x = e
- lim (x to 0) (e^x - 1)/x = 1
- lim (x to infinity) 1/x = 0

## CXC CAPE Exam Tips

- When evaluating limits algebraically, try direct substitution first
- If direct substitution gives 0/0, try factoring, rationalising, or using L'Hopital's Rule
- For limits at infinity, divide numerator and denominator by the highest power of x
- Always check that a limit exists from both sides before concluding
- Graphing the function can help visualise the limit and identify discontinuities`,
  },
  {
    subjectName: 'Pure Mathematics',
    topicName: 'Calculus (Differentiation)',
    title: 'Study Guide: Pure Mathematics - Calculus (Differentiation)',
    content: `# Calculus: Differentiation

## Key Concepts and Definitions

- **Derivative** measures the rate of change of a function; geometrically, it is the gradient of the tangent to the curve at a point
- **Notation**: f'(x), dy/dx, d/dx(f(x)) all represent the derivative of f with respect to x
- **First Principles**: f'(x) = lim(h to 0) [f(x+h) - f(x)] / h
- **Differentiation** is the process of finding the derivative of a function
- **Stationary Point** is where f'(x) = 0; can be a maximum, minimum, or point of inflection
- **Second Derivative** f''(x) measures the rate of change of the first derivative; determines concavity

## Differentiation Rules

- **Power Rule**: d/dx(x^n) = nx^(n-1)
- **Constant Multiple Rule**: d/dx(cf(x)) = c x f'(x)
- **Sum/Difference Rule**: d/dx(f(x) +/- g(x)) = f'(x) +/- g'(x)
- **Product Rule**: d/dx(f(x)g(x)) = f(x)g'(x) + f'(x)g(x)
- **Quotient Rule**: d/dx(f(x)/g(x)) = (g(x)f'(x) - f(x)g'(x)) / (g(x))^2
- **Chain Rule**: d/dx(f(g(x))) = f'(g(x)) x g'(x)

## Derivatives of Standard Functions

- d/dx(x^n) = nx^(n-1)
- d/dx(e^x) = e^x
- d/dx(a^x) = a^x x ln(a)
- d/dx(ln(x)) = 1/x
- d/dx(sin(x)) = cos(x)
- d/dx(cos(x)) = -sin(x)
- d/dx(tan(x)) = sec^2(x)

## Applications

- **Finding equations of tangents and normals** to curves
- **Finding stationary points** (maxima, minima) and determining their nature using the second derivative test
- **Connected rates of change**: related rates problems using the chain rule
- **Kinematics**: displacement, velocity (first derivative), and acceleration (second derivative)

## CXC CAPE Exam Tips

- Know when to use each rule — product rule for products, quotient rule for fractions, chain rule for composite functions
- For stationary points: find f'(x) = 0, solve for x, then use f''(x) to determine nature (f'' > 0 is minimum, f'' < 0 is maximum)
- Show all working clearly in applications — method marks are crucial
- Practise connected rates of change problems — identify which quantities are changing and how they are related
- For tangents and normals, remember: perpendicular lines have gradients that are negative reciprocals`,
  },
  {
    subjectName: 'Pure Mathematics',
    topicName: 'Calculus (Integration)',
    title: 'Study Guide: Pure Mathematics - Calculus (Integration)',
    content: `# Calculus: Integration

## Key Concepts and Definitions

- **Integration** is the reverse of differentiation; it finds the original function from its derivative
- **Indefinite Integral**: the integral of f(x) dx gives a family of functions differing by a constant C
- **Definite Integral**: the integral between two limits a and b gives a numerical value representing the area under the curve
- **Fundamental Theorem of Calculus**: if F is an antiderivative of f, then the definite integral from a to b of f(x) dx = F(b) - F(a)
- **Area Under a Curve**: the definite integral of f(x) dx from a to b gives the signed area between the curve and the x-axis
- **Area Between Curves**: integral from a to b of (f(x) - g(x)) dx where f(x) is above g(x)

## Standard Integrals

- Integral of x^n dx = x^(n+1)/(n+1) + C (where n is not -1)
- Integral of 1/x dx = ln|x| + C
- Integral of e^x dx = e^x + C
- Integral of sin(x) dx = -cos(x) + C
- Integral of cos(x) dx = sin(x) + C
- Integral of sec^2(x) dx = tan(x) + C

## Integration Techniques

- **Reverse Chain Rule**: integral of f'(x)(f(x))^n dx = (f(x))^(n+1)/(n+1) + C
- **Substitution**: substitute u = g(x), then integral of f(g(x))g'(x) dx becomes integral of f(u) du
- **Integration by Parts**: integral of u dv = uv - integral of v du (use LIATE to choose u: Logarithmic, Inverse trig, Algebraic, Trig, Exponential)

## Applications

- Finding areas under curves and between curves
- Finding volumes of revolution: V = pi x integral from a to b of (f(x))^2 dx
- Solving differential equations
- Kinematics: finding displacement from velocity, velocity from acceleration

## CXC CAPE Exam Tips

- Always include the constant of integration (+ C) for indefinite integrals
- For definite integrals, substitute the limits correctly and be careful with signs
- When finding the area between a curve and the x-axis, identify where the curve crosses the x-axis and integrate in separate parts if needed
- For integration by parts, choose u and dv carefully using the LIATE rule
- Practise a wide variety of integration problems — recognition of the appropriate technique comes with practice`,
  },
  {
    subjectName: 'Pure Mathematics',
    topicName: 'Sequences & Series',
    title: 'Study Guide: Pure Mathematics - Sequences & Series',
    content: `# Sequences & Series

## Key Concepts and Definitions

- **Sequence** is an ordered list of numbers following a specific pattern or rule
- **Series** is the sum of the terms of a sequence
- **Arithmetic Sequence** has a common difference (d) between consecutive terms
- **Arithmetic Series** is the sum of an arithmetic sequence
- **Geometric Sequence** has a common ratio (r) between consecutive terms
- **Geometric Series** is the sum of a geometric sequence
- **Convergent Series** has a finite sum as the number of terms approaches infinity
- **Divergent Series** does not have a finite sum
- **Binomial Expansion** expands expressions of the form (a + b)^n using binomial coefficients
- **Factorial**: n! = n x (n-1) x (n-2) x ... x 2 x 1; and 0! = 1
- **Sigma Notation**: the Greek letter sigma (the sum symbol) represents summation

## Arithmetic Sequence Formulas

- nth term: a_n = a_1 + (n-1)d
- Sum of first n terms: S_n = n/2 x (2a_1 + (n-1)d) = n/2 x (a_1 + a_n)
- Common difference: d = a_{n+1} - a_n

## Geometric Sequence Formulas

- nth term: a_n = a_1 x r^(n-1)
- Sum of first n terms: S_n = a_1(r^n - 1) / (r - 1) for r is not 1
- Sum to infinity: S_infinity = a_1 / (1 - r) for |r| < 1
- Common ratio: r = a_{n+1} / a_n

## Binomial Expansion

- (a + b)^n = C(n,0)a^n + C(n,1)a^(n-1)b + C(n,2)a^(n-2)b^2 + ... + C(n,n)b^n
- C(n,r) = n! / (r!(n-r)!) (binomial coefficient, "n choose r")
- Pascal's Triangle provides the binomial coefficients
- The expansion can be used for both positive integer and negative/fractional n (infinite series when |x| < 1)

## CXC CAPE Exam Tips

- For arithmetic sequences, identify the first term (a_1) and the common difference (d) before applying formulas
- For geometric sequences, identify the first term (a_1) and the common ratio (r)
- A geometric series converges only if |r| < 1 — always check this before using the sum to infinity formula
- For binomial expansion, find the general term when asked for a specific term
- Practise problems combining sequences with logarithms or algebraic manipulation`,
  },

  // ═══════════════════════════════════════════════════════════
  //  CARIBBEAN STUDIES (CAPE)
  // ═══════════════════════════════════════════════════════════
  {
    subjectName: 'Caribbean Studies',
    topicName: 'Caribbean Identity',
    title: 'Study Guide: Caribbean Studies - Caribbean Identity',
    content: `# Caribbean Identity

## Key Concepts and Definitions

- **Caribbean Identity** refers to the shared sense of belonging, culture, and characteristics that define the people of the Caribbean region
- **Hybridity/Creolisation** is the blending of African, European, Indigenous, Asian, and Middle Eastern cultural elements to create uniquely Caribbean forms of expression
- **Multiculturalism** is the coexistence of diverse cultural groups within Caribbean societies, each contributing to the overall identity
- **Plural Society** is a society composed of distinct cultural groups that live side by side but maintain separate cultural identities (M.G. Smith's concept)
- **Cultural Imperialism** is the dominance of foreign (especially North American and European) culture over local Caribbean culture
- **Diaspora** refers to Caribbean people and their descendants living outside the Caribbean
- **Pan-Caribbeanism** is the idea of a unified Caribbean identity transcending individual national identities
- **Social Stratification** is the hierarchical arrangement of social classes based on wealth, power, and status, often with historical roots in colonial race-based hierarchies
- **Ethnicity** refers to shared cultural characteristics such as language, ancestry, traditions, and history
- **Race** is a social construct used to categorise people based on physical characteristics; historically used to justify inequality in the Caribbean
- **Social Mobility** is the ability of individuals or groups to move up or down the social hierarchy

## Factors Shaping Caribbean Identity

- Historical experiences: colonisation, slavery, indentureship, and resistance
- Cultural mixing: African, European, Indigenous, Indian, Chinese, and Middle Eastern influences
- Language: English, French, Spanish, Dutch, Creole languages (patois, dialect)
- Geography: island nature of most territories shapes isolation and connection
- Common challenges: small size, vulnerability to natural disasters, economic dependence
- Creative expression: music, literature, art, sport as markers of Caribbean identity

## Debates About Caribbean Identity

- Is there a single Caribbean identity or multiple identities?
- The tension between local/national identity and regional identity
- The influence of globalisation and cultural imperialism on Caribbean identity
- The role of education in shaping identity
- Identity and the Caribbean diaspora

## CXC CAPE Exam Tips

- Use specific examples from different Caribbean territories to illustrate your points
- Be able to discuss both the forces of unity and the forces of division in Caribbean identity
- Reference key scholars and concepts (e.g., creolisation, plural society)
- In essay questions, take a clear position and support it with evidence
- Draw on current events and cultural examples to show depth of understanding`,
  },
  {
    subjectName: 'Caribbean Studies',
    topicName: 'Culture & Society',
    title: 'Study Guide: Caribbean Studies - Culture & Society',
    content: `# Culture & Society in the Caribbean

## Key Concepts and Definitions

- **Culture** is the way of life of a people, including their beliefs, values, customs, language, art, and social institutions
- **Norms** are unwritten rules of behaviour that guide social interaction
- **Values** are shared beliefs about what is good, right, and desirable
- **Socialisation** is the process by which individuals learn and internalise the norms, values, and behaviours of their society
- **Primary Socialisation** occurs within the family during early childhood
- **Secondary Socialisation** occurs through schools, peers, media, religion, and other social institutions
- **Social Institutions** are organised patterns of beliefs and behaviour centred on basic social needs: family, education, religion, government, economy
- **Popular Culture** includes music, dance, fashion, sports, and media that are widely enjoyed
- **Folk Culture** includes traditional practices, oral traditions, storytelling, and crafts passed down through generations
- **Religion** plays a central role in Caribbean society, with diverse traditions including Christianity, Hinduism, Islam, Rastafari, Obeah, and Vodou
- **Family Structure** in the Caribbean includes nuclear, extended, single-parent, and visiting unions

## Caribbean Cultural Expressions

- **Music**: reggae, calypso, soca, dancehall, chutney, steelpan, parang — each reflecting historical and cultural influences
- **Festivals**: Carnival (Trinidad, Barbados, Jamaica), Crop Over, Emancipation celebrations, Diwali, Eid, Hosay
- **Cuisine**: a fusion of African, European, Indian, Indigenous, and Chinese culinary traditions
- **Literature**: works by Derek Walcott, V.S. Naipaul, Jean Rhys, Kamau Brathwaite, and many contemporary writers
- **Sport**: cricket, athletics, football — significant unifying forces across the Caribbean

## Social Issues in the Caribbean

- Crime and violence, particularly among youth
- Drug trafficking and substance abuse
- Gender inequality and domestic violence
- Poverty and inequality
- Brain drain and migration
- Teenage pregnancy and health challenges

## CXC CAPE Exam Tips

- Use Module 1 concepts alongside real-world examples from Caribbean society
- Be able to distinguish between norms and values and give Caribbean examples
- Discuss the role of socialisation agents (family, school, media, religion) in Caribbean context
- Address how cultural diversity is both a strength and a challenge for Caribbean societies
- Incorporate theoretical perspectives (functionalist, Marxist, conflict) where appropriate`,
  },
  {
    subjectName: 'Caribbean Studies',
    topicName: 'Economic Development',
    title: 'Study Guide: Caribbean Studies - Economic Development',
    content: `# Economic Development in the Caribbean

## Key Concepts and Definitions

- **Economic Development** is the process by which a country improves the economic, political, and social well-being of its people
- **Economic Growth** is an increase in a country's output of goods and services (GDP); necessary but not sufficient for development
- **Gross Domestic Product (GDP)** is the total value of goods and services produced within a country in a year
- **Gross National Income (GNI)** includes GDP plus income earned by citizens abroad, minus income earned by foreigners domestically
- **Human Development Index (HDI)** is a composite measure of life expectancy, education, and per capita income
- **Sustainable Development** meets present needs without compromising future generations (Brundtland definition)
- **Preferential Trade Agreements** gave Caribbean exports special access to European markets (e.g., Sugar Protocol, Lome Convention)
- **Structural Adjustment Programme (SAP)** is an economic policy imposed by international financial institutions requiring privatisation, reduced government spending, and trade liberalisation
- **Single Economy** is the dependence on one or a few economic activities (e.g., sugar, tourism, bauxite)
- **Foreign Direct Investment (FDI)** is investment by foreign companies in Caribbean businesses and infrastructure

## Caribbean Economic Challenges

- Small size and limited domestic markets restrict economic diversification
- Dependence on a narrow range of exports makes economies vulnerable to external shocks
- High debt-to-GDP ratios limit government spending on social services and infrastructure
- Loss of preferential trade agreements with Europe due to WTO rulings
- Vulnerability to natural disasters (hurricanes) that damage infrastructure and agriculture
- High unemployment, particularly among youth
- Emigration of skilled workers (brain drain) reduces human capital

## Development Strategies

- Economic diversification into ICT, financial services, and creative industries
- Regional integration through CARICOM and the CSME (Caribbean Single Market and Economy)
- Tourism development: ecotourism, cultural tourism, medical tourism
- Education and training to develop human capital
- Promoting entrepreneurship and small business development
- Leveraging diaspora connections for investment and knowledge transfer

## CXC CAPE Exam Tips

- Distinguish between economic growth and economic development
- Use specific statistics and data to support your arguments
- Discuss both historical and contemporary economic challenges
- Evaluate the effectiveness of development strategies with evidence
- Connect economic issues to social, political, and environmental themes`,
  },
  {
    subjectName: 'Caribbean Studies',
    topicName: 'Political Development',
    title: 'Study Guide: Caribbean Studies - Political Development',
    content: `# Political Development in the Caribbean

## Key Concepts and Definitions

- **Sovereignty** is the full authority of a state to govern itself without external interference
- **Democracy** is a system of government where power is held by the people through free and fair elections
- **Constitutional Monarchy** is the system in many Caribbean countries where the British monarch is the head of state, represented locally by a Governor-General
- **Republic** is a state where the head of state is an elected or appointed president (e.g., Trinidad and Tobago, Guyana, Dominica)
- **Independence** is the political freedom of a former colony to govern itself
- **Self-Government** was an intermediate stage between colonial rule and full independence
- **Westminster System** is the parliamentary system adopted from Britain, featuring a Prime Minister and Cabinet drawn from the legislature
- **First-Past-the-Post** is the electoral system used in most Caribbean countries where the candidate with the most votes in a constituency wins
- **Political Party** is an organisation that seeks to gain political power through elections
- **Trade Union** is an organisation that represents workers' interests and has historically played a major role in Caribbean politics
- **Coup d'etat** is the forceful overthrow of a government; occurred in Grenada (1979) and Suriname (1980)
- **Electoral Commission** is an independent body responsible for conducting free and fair elections

## Key Political Developments

- **Universal Adult Suffrage**: granting all adults the right to vote (Jamaica 1944, other territories followed)
- **Constitutional Reform**: gradual transfer of power from colonial governors to elected local governments
- **Federation of the West Indies (1958-1962)**: failed attempt at political unity
- **Independence movements**: each territory achieving political independence from Britain between 1962 and 1983
- **Cuban Revolution (1959)**: transformed Caribbean politics and created Cold War tensions
- **Grenada Revolution (1979-1983)**: people's revolutionary government overthrown by US-led invasion

## Contemporary Political Challenges

- Political corruption and lack of transparency
- Weak opposition and dominance by two main parties in many territories
- Low voter turnout and political apathy, especially among youth
- Crime and its impact on governance and public trust
- The role of external powers (USA, China, Venezuela) in Caribbean politics
- Constitutional reform debates (republic vs monarchy, electoral reform)

## CXC CAPE Exam Tips

- Know the constitutional arrangements of at least three Caribbean territories
- Be able to compare different political systems in the Caribbean
- Discuss the role of trade unions in the political development of the Caribbean
- Evaluate the successes and failures of the West Indies Federation
- Use specific examples and case studies to support your arguments`,
  },
  {
    subjectName: 'Caribbean Studies',
    topicName: 'Globalization',
    title: 'Study Guide: Caribbean Studies - Globalization',
    content: `# Globalization and the Caribbean

## Key Concepts and Definitions

- **Globalization** is the process of increased interconnectedness and interdependence of world economies, societies, and cultures
- **Economic Globalization** involves the integration of national economies through trade, foreign investment, capital flows, and migration
- **Cultural Globalization** involves the spread and mixing of cultural practices, values, and ideas across the world
- **Political Globalization** involves the growing influence of international organisations (UN, WTO, IMF, World Bank) on national policies
- **Technological Globalization** involves the rapid spread of information and communication technologies
- **Neoliberalism** is the economic ideology favouring free markets, privatisation, deregulation, and reduced government spending
- **Transnational Corporation (TNC)** is a company that operates in multiple countries, often larger than the economies of Caribbean nations
- **World Trade Organization (WTO)** promotes free trade by reducing tariffs and trade barriers
- **International Monetary Fund (IMF)** and **World Bank** provide loans and financial advice to developing countries, often with conditions (structural adjustment)
- **Intellectual Property Rights (IPR)** protect the ownership of creative works and inventions, impacting Caribbean access to knowledge and technology

## Impact of Globalization on the Caribbean

### Positive Effects
- Access to global markets for Caribbean exports
- Technology transfer and improved communications
- Greater cultural exchange and global recognition of Caribbean culture
- Increased foreign investment and tourism
- Diaspora connections and remittances
- Access to international education and scholarship opportunities

### Negative Effects
- Loss of preferential trade agreements, making Caribbean exports less competitive
- Cultural imperialism: dominance of American media, values, and products
- De-industrialisation as manufacturing moves to countries with cheaper labour
- Brain drain: skilled Caribbean professionals emigrating to developed countries
- Economic vulnerability to global financial crises and commodity price fluctuations
- Environmental degradation from tourism development and global shipping

## Caribbean Responses to Globalization

- Regional integration through CARICOM to increase bargaining power
- Promoting cultural industries (music, film, fashion) as global exports
- Developing niche markets: organic agriculture, ecotourism, offshore banking
- Strengthening diaspora engagement
- Advocating for fair trade and special treatment for small economies at the WTO

## CXC CAPE Exam Tips

- Always present both positive and negative effects of globalisation
- Use specific Caribbean examples to illustrate each point
- Discuss how Caribbean countries can maximise the benefits and minimise the harms of globalisation
- Connect globalisation to other Module 3 themes: development, regional integration, political sovereignty
- Reference current events and trends (digital economy, climate change, COVID-19)`,
  },
  {
    subjectName: 'Caribbean Studies',
    topicName: 'Regional Integration',
    title: 'Study Guide: Caribbean Studies - Regional Integration',
    content: `# Regional Integration in the Caribbean

## Key Concepts and Definitions

- **Regional Integration** is the process by which neighbouring countries agree to cooperate and work together for mutual benefit
- **CARICOM (Caribbean Community)** was established by the Treaty of Chaguaramas in 1973 to promote economic integration and cooperation
- **CARICOM Single Market and Economy (CSME)** aims to create a single economic space allowing free movement of goods, services, capital, and skilled labour
- **CARIFTA (Caribbean Free Trade Association)** was the predecessor to CARICOM (1965-1973), establishing free trade among English-speaking Caribbean countries
- **OECS (Organisation of Eastern Caribbean States)** is a sub-regional grouping for economic union among smaller islands
- **Free Movement of Persons** is a key provision of the CSME allowing CARICOM nationals to work in any member state without work permits
- **Common External Tariff (CET)** is a uniform tariff applied by CARICOM members to goods imported from outside the region
- **Regional Institutions**: Caribbean Court of Justice (CCJ), Caribbean Development Bank (CDB), University of the West Indies (UWI), Caribbean Examinations Council (CXC)
- **Functional Cooperation** refers to collaboration in areas like health, education, agriculture, and disaster management
- **Political Union** would involve a single government for the Caribbean; proposed but never achieved

## Milestones in Caribbean Integration

- 1958: West Indies Federation (political union attempt; collapsed in 1962)
- 1965: CARIFTA established
- 1973: Treaty of Chaguaramas establishes CARICOM
- 1989: Grand Anse Declaration outlining the CSME
- 2001: Revised Treaty of Chaguaramas establishing the CSME
- 2005: Caribbean Court of Justice inaugurated
- 2006: CSME provisions begin to take effect

## Benefits of Regional Integration

- Larger combined market increases bargaining power with international trading partners
- Economies of scale in production and trade
- Reduced duplication of services and institutions
- Free movement of skilled labour addresses labour shortages
- Greater political influence on the international stage
- Shared resources for disaster management and public health
- Cultural exchange strengthens regional identity

## Challenges to Regional Integration

- Limited economic complementarity: many countries produce similar goods
- National sovereignty concerns: reluctance to cede authority to regional bodies
- Size disparities: larger economies (Trinidad, Jamaica) dominate smaller ones
- Unequal distribution of benefits from integration
- Language barriers: English, French, Spanish, Dutch-speaking territories
- External influence: economic ties to the USA, EU, and China sometimes conflict with regional interests
- Slow implementation of CSME provisions

## CXC CAPE Exam Tips

- Know the difference between CARICOM, CSME, CARIFTA, and OECS
- Be able to discuss both the achievements and failures of regional integration
- Use specific examples of successful functional cooperation (e.g., CXC exams, UWI, disaster response)
- Evaluate why the West Indies Federation failed and what lessons this offers for current integration efforts
- Discuss how external factors (globalisation, trade agreements) both support and challenge regional integration`,
  },
]

async function main() {
  console.log('🌱 Seeding study guides into the database...\n')

  // 1. Create system user (or find existing)
  const SYSTEM_EMAIL = 'system@cxcace.com'
  const passwordHash = await bcrypt.hash('system123', 10)

  const systemUser = await db.user.upsert({
    where: { email: SYSTEM_EMAIL },
    update: {},
    create: {
      email: SYSTEM_EMAIL,
      passwordHash,
      name: 'CXC Ace Study Guides',
      role: 'TEACHER',
      bio: 'System account that provides study guide content for all CXC and CAPE subjects.',
    },
  })
  console.log(`✅ System user: ${systemUser.email} (id: ${systemUser.id})\n`)

  // 2. Look up all subjects
  const subjects = await db.subject.findMany()
  const subjectMap = new Map(subjects.map(s => [s.name, s]))
  console.log(`📚 Found ${subjects.length} subjects in the database\n`)

  // 3. Create study guides
  let created = 0
  let skipped = 0
  const errors: string[] = []

  for (const guide of STUDY_GUIDES) {
    const subject = subjectMap.get(guide.subjectName)
    if (!subject) {
      errors.push(`Subject not found: ${guide.subjectName} (skipping "${guide.title}")`)
      skipped++
      continue
    }

    try {
      const result = await db.note.upsert({
        where: {
          id: `sg-${subject.code}-${guide.topicName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`,
        },
        update: {
          title: guide.title,
          content: guide.content,
          isShared: true,
          isPinned: true,
        },
        create: {
          id: `sg-${subject.code}-${guide.topicName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`,
          title: guide.title,
          content: guide.content,
          subjectId: subject.id,
          userId: systemUser.id,
          isShared: true,
          isPinned: true,
          color: subject.color,
        },
      })
      created++
      console.log(`  ✓ ${guide.title}`)
    } catch (e: any) {
      errors.push(`Error creating "${guide.title}": ${e.message}`)
      skipped++
    }
  }

  console.log(`\n${'─'.repeat(50)}`)
  console.log(`✅ Study guides seeded successfully!`)
  console.log(`   Created/Updated: ${created}`)
  if (skipped > 0) console.log(`   Skipped: ${skipped}`)
  if (errors.length > 0) {
    console.log(`\n⚠️  Errors:`)
    errors.forEach(e => console.log(`   - ${e}`))
  }
  console.log(`${'─'.repeat(50)}`)

  // 4. Verification query
  const totalShared = await db.note.count({
    where: { isShared: true },
  })
  console.log(`\n📊 Total shared notes in database: ${totalShared}`)

  const guideCount = await db.note.count({
    where: { isShared: true, isPinned: true, userId: systemUser.id },
  })
  console.log(`📊 Study guides from system user: ${guideCount}`)

  await db.$disconnect()
}

main().catch((e) => {
  console.error('❌ Seed failed:', e)
  process.exit(1)
})
