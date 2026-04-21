/**
 * CXC Ace – Flashcard Seed Script
 *
 * Creates 27 flashcard decks across all 9 CXC/CAPE subjects with 8–12 cards each.
 * Each deck is linked to a subject and topic, and assigned to the first user found.
 * Decks are skipped if a deck with the same title already exists (idempotent).
 *
 * Run: npx tsx prisma/seed-flashcards.ts
 */
import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

// ── Database setup ─────────────────────────────────────────────
const adapter = new PrismaLibSQL({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN || undefined,
})
const db = new PrismaClient({ adapter } as never)

// ── Types ───────────────────────────────────────────────────────
interface FlashcardData {
  front: string
  back: string
  order: number
}

interface DeckData {
  title: string
  description: string
  subjectName: string
  cards: FlashcardData[]
}

// ══════════════════════════════════════════════════════════════════
//  DECK DEFINITIONS – 27 decks across 9 subjects
// ══════════════════════════════════════════════════════════════════

const DECKS: DeckData[] = [
  // ─── MATHEMATICS (3 decks) ────────────────────────────────────
  {
    title: 'Mathematics: Number Theory & Computation',
    description: 'Essential number theory concepts including number types, prime factorisation, and percentages',
    subjectName: 'Mathematics',
    cards: [
      { front: 'What is the difference between prime numbers and composite numbers?', back: 'A prime number has exactly two factors: 1 and itself (e.g., 2, 3, 5, 7, 11). A composite number has more than two factors (e.g., 4, 6, 8, 9, 10). The number 1 is neither prime nor composite.', order: 0 },
      { front: 'How do you find the HCF (Highest Common Factor) of 24 and 36?', back: 'Use prime factorisation: 24 = 2³ × 3, 36 = 2² × 3². Multiply the common factors with the lowest powers: HCF = 2² × 3 = 12.', order: 1 },
      { front: 'How do you find the LCM of 12 and 18?', back: 'Prime factorise: 12 = 2² × 3, 18 = 2 × 3². Multiply all factors with the highest powers: LCM = 2² × 3² = 36.', order: 2 },
      { front: 'Express 0.375 as a fraction in its lowest terms.', back: '0.375 = 375/1000. Divide numerator and denominator by 125: 375 ÷ 125 = 3, 1000 ÷ 125 = 8. So 0.375 = 3/8.', order: 3 },
      { front: 'What is the rule for multiplying numbers with the same base?', back: 'When multiplying powers with the same base, add the exponents: aᵐ × aⁿ = aᵐ⁺ⁿ. Example: x³ × x⁴ = x⁷.', order: 4 },
      { front: 'A number increases by 20% then decreases by 20%. What is the net change?', back: 'Let the number be 100. After +20% → 120. After −20% of 120 → 120 − 24 = 96. Net change = 4% decrease. Successive percentage changes do NOT cancel out.', order: 5 },
      { front: 'What is the difference between rational and irrational numbers?', back: 'Rational numbers can be expressed as a fraction p/q where q ≠ 0 (e.g., 3/4, 0.5, 0.333...). Irrational numbers cannot be written as fractions (e.g., √2, π, e). Together they form the set of real numbers.', order: 6 },
      { front: 'Simplify: (x³)² ÷ x⁴', back: 'Apply the power rule then the division rule: (x³)² = x⁶, then x⁶ ÷ x⁴ = x⁶⁻⁴ = x².', order: 7 },
      { front: 'What is standard form (scientific notation)?', back: 'Standard form expresses a number as a × 10ⁿ where 1 ≤ a < 10 and n is an integer. Example: 45,000 = 4.5 × 10⁴; 0.0032 = 3.2 × 10⁻³.', order: 8 },
      { front: 'Calculate: √144 + √25', back: '√144 = 12 and √25 = 5. So √144 + √25 = 12 + 5 = 17. Remember: √(a + b) ≠ √a + √b in general.', order: 9 },
    ],
  },
  {
    title: 'Mathematics: Algebra Essentials',
    description: 'Core algebra topics including factorisation, equations, and quadratic formulas',
    subjectName: 'Mathematics',
    cards: [
      { front: 'How do you factorise x² − 9?', back: 'This is the difference of two squares: x² − 3² = (x + 3)(x − 3). The pattern is a² − b² = (a + b)(a − b).', order: 0 },
      { front: 'Solve: x² − 5x + 6 = 0', back: 'Factorise: (x − 2)(x − 3) = 0. So x = 2 or x = 3. Always check by substitution: 4 − 10 + 6 = 0 ✓', order: 1 },
      { front: 'What is the quadratic formula?', back: 'For ax² + bx + c = 0: x = (−b ± √(b² − 4ac)) / 2a. Use this when factorisation is difficult. The discriminant b² − 4ac tells you the nature of the roots.', order: 2 },
      { front: 'Expand and simplify: (2x + 3)(x − 1)', back: 'Use FOIL: First = 2x², Outer = −2x, Inner = 3x, Last = −3. Combine: 2x² + x − 3.', order: 3 },
      { front: 'Solve: 3x + 7 = 22', back: 'Subtract 7 from both sides: 3x = 15. Divide both sides by 3: x = 5. Always perform the same operation on both sides.', order: 4 },
      { front: 'What is the difference between an equation and an inequality?', back: 'An equation uses = and has specific solutions (e.g., x = 5). An inequality uses <, >, ≤, ≥ and has a range of solutions (e.g., x > 3 means x can be 4, 5, 6, ...). When multiplying/dividing an inequality by a negative number, reverse the sign.', order: 5 },
      { front: 'Solve the simultaneous equations: x + y = 10 and x − y = 4', back: 'Add both equations: 2x = 14, so x = 7. Substitute into x + y = 10: 7 + y = 10, so y = 3. Solution: (7, 3).', order: 6 },
      { front: 'Make "a" the subject of: v = u + at', back: 'v = u + at → v − u = at → a = (v − u) / t. Isolate the target variable by performing inverse operations.', order: 7 },
      { front: 'Simplify: 2(3x − 4) − (x + 5)', back: 'Expand brackets: 6x − 8 − x − 5. Collect like terms: 5x − 13. Be careful with the negative sign before (x + 5) − it distributes to both terms.', order: 8 },
      { front: 'What is the nth term of an arithmetic sequence with first term 3 and common difference 5?', back: 'The formula is aₙ = a + (n − 1)d. Here: aₙ = 3 + (n − 1)(5) = 3 + 5n − 5 = 5n − 2. To check: 1st term = 3, 2nd = 8, 3rd = 13.', order: 9 },
    ],
  },
  {
    title: 'Mathematics: Geometry & Trigonometry',
    description: 'Key geometry and trigonometry formulas and concepts for CSEC',
    subjectName: 'Mathematics',
    cards: [
      { front: 'What is Pythagoras\' Theorem?', back: 'In a right-angled triangle: a² + b² = c², where c is the hypotenuse (longest side, opposite the right angle). Example: if a = 3 and b = 4, then c = √(9 + 16) = √25 = 5.', order: 0 },
      { front: 'What are the three basic trigonometric ratios?', back: 'SOH CAH TOA: sin θ = Opposite/Hypotenuse, cos θ = Adjacent/Hypotenuse, tan θ = Opposite/Adjacent. These apply to right-angled triangles.', order: 1 },
      { front: 'What is sin(30°), cos(60°), and tan(45°)?', back: 'sin(30°) = 1/2 = 0.5, cos(60°) = 1/2 = 0.5, tan(45°) = 1. Memorise the standard values for 0°, 30°, 45°, 60°, and 90°.', order: 2 },
      { front: 'What is the area of a circle with radius 7 cm? (Use π = 22/7)', back: 'A = πr² = (22/7) × 7² = 22 × 7 = 154 cm². The circumference would be C = 2πr = 2 × (22/7) × 7 = 44 cm.', order: 3 },
      { front: 'What is the sum of interior angles of a polygon with n sides?', back: 'Sum = (n − 2) × 180°. For a hexagon (n=6): (6−2) × 180° = 720°. Each interior angle of a regular polygon = (n−2) × 180° / n.', order: 4 },
      { front: 'State the properties of a parallelogram.', back: 'Opposite sides are equal and parallel. Opposite angles are equal. Consecutive angles are supplementary (add to 180°). Diagonals bisect each other. It is NOT necessarily a rectangle or rhombus.', order: 5 },
      { front: 'What is the volume of a cylinder?', back: 'V = πr²h, where r = radius of base and h = height. Surface area = 2πr² + 2πrh (two circular ends + curved surface).', order: 6 },
      { front: 'In a triangle, angles sum to 180°. If two angles are 45° and 70°, what is the third?', back: 'Third angle = 180° − 45° − 70° = 65°. This is the Angle Sum Property and applies to ALL triangles.', order: 7 },
      { front: 'What is the bearing of a point located directly east of another?', back: 'A bearing is measured clockwise from north. East is at 90° bearing. North = 000°, South = 180°, West = 270°.', order: 8 },
      { front: 'The exterior angle of a regular polygon is 30°. How many sides does it have?', back: 'Sum of all exterior angles = 360°. Number of sides = 360° ÷ 30° = 12. It is a regular dodecagon. Each interior angle = 180° − 30° = 150°.', order: 9 },
    ],
  },

  // ─── ENGLISH A (3 decks) ──────────────────────────────────────
  {
    title: 'English A: Grammar & Mechanics',
    description: 'Essential grammar rules, parts of speech, and sentence structure',
    subjectName: 'English A',
    cards: [
      { front: 'What is the difference between a proper noun and a common noun?', back: 'A proper noun names a specific person, place, or thing and is capitalised (e.g., Jamaica, Marcus Garvey, Monday). A common noun is general and not capitalised (e.g., country, leader, day).', order: 0 },
      { front: 'Identify the subject and verb in: "The students carefully completed their assignments."', back: 'Subject: "students" (who performs the action). Verb: "completed" (the action). "Carefully" is an adverb modifying the verb. "Their" is a possessive adjective.', order: 1 },
      { front: 'What is the difference between active and passive voice?', back: 'Active voice: the subject performs the action ("She wrote the letter"). Passive voice: the subject receives the action ("The letter was written by her"). Active voice is generally preferred for clarity and directness.', order: 2 },
      { front: 'What is a dangling modifier?', back: 'A dangling modifier is a phrase that doesn\'t logically modify any word in the sentence. Example: "Walking to school, the rain began to fall." (The rain wasn\'t walking!) Fix: "While I was walking to school, the rain began to fall."', order: 3 },
      { front: 'What is the difference between "its" and "it\'s"?', back: '"Its" is a possessive pronoun meaning "belonging to it" (e.g., "The dog wagged its tail"). "It\'s" is a contraction of "it is" or "it has" (e.g., "It\'s raining" = "It is raining").', order: 4 },
      { front: 'What is subject-verb agreement?', back: 'The subject and verb must match in number. Singular subjects take singular verbs ("The dog runs"). Plural subjects take plural verbs ("The dogs run"). Compound subjects with "and" are usually plural.', order: 5 },
      { front: 'What is the difference between a compound and a complex sentence?', back: 'Compound: two independent clauses joined by a coordinating conjunction (and, but, or) — "I studied hard, but I failed the test." Complex: one independent clause + one dependent clause — "Although I studied hard, I failed the test."', order: 6 },
      { front: 'What is the past participle of common irregular verbs: go, eat, write, see?', back: 'go → gone (past: went), eat → eaten (past: ate), write → written (past: wrote), see → seen (past: saw). Past participles are used with "have/has/had" for perfect tenses.', order: 7 },
      { front: 'What is a semicolon and when is it used?', back: 'A semicolon (;) joins two closely related independent clauses without a coordinating conjunction. Example: "I love Caribbean food; my favourite is jerk chicken." It can also separate items in a complex list.', order: 8 },
      { front: 'What is the difference between "who" and "whom"?', back: '"Who" is a subject pronoun (like he, she, they) — "Who wrote this?" "Whom" is an object pronoun (like him, her, them) — "To whom did you give it?" If you can replace it with "him/her," use "whom."', order: 9 },
    ],
  },
  {
    title: 'English A: Comprehension & Summary Skills',
    description: 'Reading comprehension strategies, literary devices, and summary writing techniques',
    subjectName: 'English A',
    cards: [
      { front: 'What is the difference between simile and metaphor?', back: 'A simile compares two things using "like" or "as" — "She runs like the wind." A metaphor states that one thing IS another — "The world is a stage." Both create vivid imagery but metaphors are more direct.', order: 0 },
      { front: 'What is personification?', back: 'Personification gives human qualities to non-human things. Example: "The wind whispered through the trees" or "The flowers danced in the breeze." It makes writing more vivid and engaging.', order: 1 },
      { front: 'What does it mean to "infer" when answering a comprehension question?', back: 'To infer means to use clues from the passage plus your own reasoning to reach a conclusion that is not directly stated. It is a "reading between the lines" skill. You must support inferences with evidence from the text.', order: 2 },
      { front: 'What is foreshadowing?', back: 'Foreshadowing is a literary technique where the author gives clues or hints about events that will happen later in the story. It builds anticipation and tension. Example: dark clouds gathering before a storm.', order: 3 },
      { front: 'What are the key steps for writing a CSEC summary (approximately 120 words)?', back: '1) Read the passage twice carefully. 2) Identify the main ideas and key supporting points. 3) Write in your own words (paraphrase). 4) Keep it objective — no personal opinions. 5) Stay within the word limit (about 120 words).', order: 4 },
      { front: 'What is the purpose of a thesis statement in an essay?', back: 'A thesis statement clearly states the main argument or position the essay will support. It typically appears at the end of the introduction and guides the entire essay. A strong thesis is specific, arguable, and concise.', order: 5 },
      { front: 'What is the difference between the tone and mood of a passage?', back: 'Tone is the author\'s attitude toward the subject (e.g., formal, sarcastic, sympathetic). Mood is the feeling the reader gets from the text (e.g., tense, joyful, eerie). The author creates tone; the reader experiences mood.', order: 6 },
      { front: 'What is alliteration and give an example?', back: 'Alliteration is the repetition of the same consonant sound at the beginning of nearby words. Example: "The wild winds whipped the waves." It creates rhythm, mood, and makes phrases memorable.', order: 7 },
      { front: 'How do you identify the main idea of a passage?', back: 'Look for: 1) The topic sentence (often the first or last sentence of a paragraph). 2) Repeated words or concepts. 3) What the entire passage is about, not just one detail. Ask yourself: "What is the author\'s most important point?"', order: 8 },
      { front: 'What is a "hedging word" and why do authors use them?', back: 'Hedging words (suggest, may, might, perhaps, generally) soften claims and show uncertainty. They indicate the statement is based on evidence but not absolute. Example: "Studies suggest that sea levels may rise." They signal academic caution.', order: 9 },
    ],
  },
  {
    title: 'English A: Essay & Persuasive Writing',
    description: 'Essay structure, persuasive techniques, and rhetorical appeals',
    subjectName: 'English A',
    cards: [
      { front: 'What are the three main types of essays in CSEC English A?', back: '1) Narrative — tells a story (personal experience). 2) Descriptive — paints a picture with words (person, place, event). 3) Discursive/Argumentative — discusses a topic and presents an argument. Choose based on the prompt.', order: 0 },
      { front: 'What are the three rhetorical appeals in persuasive writing?', back: 'Ethos (credibility/character) — using expert opinions and trustworthy sources. Pathos (emotion) — appealing to feelings, empathy, fear, hope. Logos (logic) — using facts, statistics, and logical reasoning.', order: 1 },
      { front: 'What is a counterargument and why should you include one?', back: 'A counterargument is an opposing viewpoint that you acknowledge and then respond to. Including it shows you have considered multiple perspectives, strengthens your credibility (ethos), and weakens the opponent\'s position before the reader sides with them.', order: 2 },
      { front: 'What is the structure of a five-paragraph essay?', back: 'Paragraph 1: Introduction (hook, background, thesis). Paragraphs 2-4: Body (each with topic sentence, evidence, explanation, linking back to thesis). Paragraph 5: Conclusion (restate thesis, summarise key points, closing thought).', order: 3 },
      { front: 'What is a "call to action" in a persuasive essay?', back: 'A call to action directly urges the reader to take a specific step. Example: "Students, I urge you to sign the petition and demand recycling bins in every classroom." It gives the reader a concrete way to respond to your argument.', order: 4 },
      { front: 'Name four useful transitional words for different purposes.', back: 'To add: Furthermore, Moreover. To contrast: However, Nevertheless. To show cause/effect: Therefore, Consequently. To give examples: For instance, Specifically. Transitions create flow and coherence in your writing.', order: 5 },
      { front: 'What makes a strong thesis statement?', back: 'A strong thesis is: 1) Clear and specific (not vague). 2) Arguable (not a fact everyone agrees with). 3) Supported by evidence in the essay. 4) One sentence. Weak: "Social media is interesting." Strong: "Social media should be regulated because it spreads misinformation and harms mental health."', order: 6 },
      { front: 'What is the difference between an argumentative and a persuasive essay?', back: 'Argumentative: uses logic, evidence, and reasoning to prove a point. It acknowledges counterarguments. Persuasive: uses emotion and personal opinion to convince the reader. Both take a clear position but use different approaches.', order: 7 },
      { front: 'What should the introduction of an essay accomplish?', back: '1) Hook the reader\'s attention (question, quote, striking fact). 2) Provide relevant background/context. 3) Clearly state the thesis. It should be engaging but concise — typically 4-6 sentences.', order: 8 },
      { front: 'What is the purpose of a topic sentence in a body paragraph?', back: 'A topic sentence states the main point of that paragraph and connects to the thesis. It tells the reader what the paragraph is about. All other sentences in the paragraph should support, explain, or prove the topic sentence.', order: 9 },
    ],
  },

  // ─── BIOLOGY (3 decks) ────────────────────────────────────────
  {
    title: 'Biology: Cell Biology Basics',
    description: 'Cell structure, organelles, and cellular processes',
    subjectName: 'Biology',
    cards: [
      { front: 'What are the three parts of the cell theory?', back: '1) All living things are made of cells. 2) The cell is the basic unit of structure and function in living things. 3) All cells come from pre-existing cells (biogenesis).', order: 0 },
      { front: 'What is the difference between plant and animal cells?', back: 'Plant cells have: cell wall (cellulose), large central vacuole, chloroplasts (for photosynthesis). Animal cells have: centrioles (for cell division). Both have: cell membrane, nucleus, mitochondria, ribosomes, cytoplasm.', order: 1 },
      { front: 'What is the function of mitochondria?', back: 'Mitochondria are the "powerhouses of the cell." They carry out aerobic respiration, converting glucose and oxygen into ATP (energy), carbon dioxide, and water. The reaction occurs on the inner folded membrane (cristae) to maximise surface area.', order: 2 },
      { front: 'What is osmosis?', back: 'Osmosis is the diffusion of water molecules from a region of higher water concentration (lower solute concentration) to a region of lower water concentration (higher solute concentration) through a selectively permeable membrane.', order: 3 },
      { front: 'What is the function of the cell membrane?', back: 'The cell membrane is a selectively permeable phospholipid bilayer that controls what enters and exits the cell. It protects the cell, provides structure, and allows communication. Protein channels help transport specific molecules.', order: 4 },
      { front: 'What is the role of ribosomes?', back: 'Ribosomes are the site of protein synthesis. They read mRNA instructions and assemble amino acids into polypeptide chains (proteins). They can be free-floating in the cytoplasm or attached to the rough endoplasmic reticulum.', order: 5 },
      { front: 'What are enzymes and how do they work?', back: 'Enzymes are biological catalysts (usually proteins) that speed up chemical reactions without being consumed. They work by the "lock and key" model: the substrate (key) fits into the active site (lock) of the enzyme. They lower activation energy.', order: 6 },
      { front: 'What is the difference between diffusion and active transport?', back: 'Diffusion: passive movement of particles from high to low concentration — requires no energy. Active transport: movement against the concentration gradient — requires energy (ATP) and carrier proteins in the membrane.', order: 7 },
      { front: 'What happens to a red blood cell in a concentrated salt solution?', back: 'The concentrated salt solution is hypertonic. Water moves OUT of the cell by osmosis, causing the cell to shrink. In animal cells this is called crenation. In plant cells it is called plasmolysis.', order: 8 },
      { front: 'What is photosynthesis and where does it occur?', back: 'Photosynthesis converts light energy, CO₂, and H₂O into glucose and O₂. It occurs in chloroplasts (in the leaves of plants). Equation: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light energy + chlorophyll).', order: 9 },
    ],
  },
  {
    title: 'Biology: Ecology & Environment',
    description: 'Ecosystems, food chains, nutrient cycles, and environmental science',
    subjectName: 'Biology',
    cards: [
      { front: 'What is the difference between a food chain and a food web?', back: 'A food chain shows a single linear pathway of energy flow (e.g., grass → grasshopper → frog → snake). A food web shows multiple interconnected food chains in an ecosystem, representing the complex feeding relationships.', order: 0 },
      { front: 'What is the 10% rule in ecology?', back: 'Approximately 10% of energy is transferred from one trophic level to the next. The remaining 90% is lost as heat through respiration, excretion, and other metabolic processes. This is why food chains rarely exceed 4-5 levels.', order: 1 },
      { front: 'What is carrying capacity?', back: 'Carrying capacity (K) is the maximum population size that an environment can sustainably support over time. It is limited by factors like food, water, space, and predators. When a population exceeds K, it typically declines.', order: 2 },
      { front: 'What is the carbon cycle?', back: 'The carbon cycle is the movement of carbon between the atmosphere, organisms, and the Earth. Key processes: photosynthesis (removes CO₂), respiration and combustion (release CO₂), decomposition, and fossilisation. Human activities (burning fossil fuels) have disrupted this cycle.', order: 3 },
      { front: 'What is the nitrogen cycle and why is it important?', back: 'The nitrogen cycle converts nitrogen gas (N₂) in the atmosphere into usable forms for living things. Key processes: nitrogen fixation (by bacteria/lightning → NH₃), nitrification (NH₃ → NO₃⁻), absorption by plants, and denitrification (NO₃⁻ → N₂). Nitrogen is essential for proteins and DNA.', order: 4 },
      { front: 'What is the difference between biotic and abiotic factors?', back: 'Biotic factors are living components (plants, animals, bacteria, competition, predation, parasitism). Abiotic factors are non-living components (temperature, rainfall, sunlight, soil type, pH, humidity). Both interact to shape ecosystems.', order: 5 },
      { front: 'What is biological magnification (biomagnification)?', back: 'Biomagnification is the process where toxins (e.g., pesticides, mercury) become more concentrated at each trophic level. Top predators (like eagles and humans) accumulate the highest concentrations because they eat many organisms from lower levels.', order: 6 },
      { front: 'What is the difference between primary and secondary succession?', back: 'Primary succession occurs on bare, lifeless substrate (e.g., after a volcanic eruption) — starts with pioneer species like lichens. Secondary succession occurs where an existing ecosystem has been disturbed (e.g., after a forest fire) — soil remains, so recovery is faster.', order: 7 },
      { front: 'What is eutrophication?', back: 'Eutrophication is the excessive enrichment of water bodies with nutrients (nitrates and phosphates), usually from agricultural runoff or sewage. This causes algal blooms, which block light and deplete oxygen when they die, killing aquatic life.', order: 8 },
      { front: 'Define the terms: producer, primary consumer, secondary consumer, and decomposer.', back: 'Producer (autotroph): makes own food via photosynthesis (e.g., plants). Primary consumer (herbivore): eats producers (e.g., caterpillar). Secondary consumer (carnivore): eats primary consumers (e.g., bird). Decomposer: breaks down dead matter and recycles nutrients (e.g., fungi, bacteria).', order: 9 },
    ],
  },
  {
    title: 'Biology: Human Physiology',
    description: 'Human body systems including circulatory, respiratory, digestive, and nervous systems',
    subjectName: 'Biology',
    cards: [
      { front: 'What is the path of blood through the heart?', back: 'Deoxygenated blood: body → vena cava → right atrium → right ventricle → pulmonary artery → lungs. Oxygenated blood: lungs → pulmonary vein → left atrium → left ventricle → aorta → body. The left ventricle has the thickest wall.', order: 0 },
      { front: 'What is the function of red blood cells?', back: 'Red blood cells (erythrocytes) contain haemoglobin, which binds to oxygen in the lungs and transports it to body tissues. They also carry some CO₂ back to the lungs. They have no nucleus (more space for haemoglobin) and a biconcave disc shape (maximises surface area).', order: 1 },
      { front: 'Where does most nutrient absorption occur and why?', back: 'Most absorption occurs in the small intestine (ileum). The inner wall has villi and microvilli that greatly increase the surface area. A rich blood supply carries nutrients away, maintaining the concentration gradient for efficient absorption.', order: 2 },
      { front: 'What is the role of insulin and what happens if the body does not produce enough?', back: 'Insulin (produced by beta cells in the pancreas) lowers blood glucose by promoting glucose uptake into cells and conversion to glycogen. Without enough insulin, blood glucose rises dangerously high — this is Type 1 Diabetes. Symptoms: excessive thirst, frequent urination, fatigue.', order: 3 },
      { front: 'How do the kidneys filter blood?', back: 'In each nephron: 1) Ultrafiltration in the glomerulus — high blood pressure forces small molecules (water, glucose, urea, ions) into Bowman\'s capsule. 2) Selective reabsorption in the tubules — useful substances (all glucose, needed water and ions) are reabsorbed back into the blood. 3) Urine (excess water, urea, excess salts) passes to the bladder.', order: 4 },
      { front: 'What is the function of the alveoli in gas exchange?', back: 'Alveoli are tiny air sacs in the lungs with thin walls, large surface area, and rich blood supply. Oxygen diffuses from the alveolar air into the blood; CO₂ diffuses from the blood into the alveoli. The thin walls (one cell thick) allow rapid diffusion.', order: 5 },
      { front: 'What are the main parts of the nervous system?', back: 'Central Nervous System (CNS): brain and spinal cord — processes information. Peripheral Nervous System (PNS): nerves connecting CNS to the body — carries signals. Sensory neurons carry signals TO the CNS; motor neurons carry signals FROM the CNS to muscles/glands.', order: 6 },
      { front: 'What is a reflex arc?', back: 'A reflex arc is an automatic, rapid response to a stimulus that does not involve conscious thought. Pathway: stimulus → receptor → sensory neuron → relay neuron (in spinal cord) → motor neuron → effector (muscle/gland) → response. Example: touching a hot object and pulling your hand away instantly.', order: 7 },
      { front: 'What is the difference between arteries, veins, and capillaries?', back: 'Arteries: carry blood AWAY from the heart, thick muscular walls, narrow lumen, high pressure. Veins: carry blood TO the heart, thin walls, wide lumen, low pressure, have valves to prevent backflow. Capillaries: tiny vessels where exchange occurs, walls one cell thick.', order: 8 },
      { front: 'What is the function of the liver?', back: 'The liver has many functions: 1) Produces bile (emulsifies fats). 2) Detoxifies harmful substances (alcohol, drugs). 3) Stores glycogen, iron, vitamins A, D, B₁₂. 4) Breaks down old red blood cells. 5) Produces plasma proteins. 6) Regulates blood glucose levels.', order: 9 },
    ],
  },

  // ─── CHEMISTRY (3 decks) ──────────────────────────────────────
  {
    title: 'Chemistry: Atomic Structure & Bonding',
    description: 'Atomic models, electron configuration, periodic table, and chemical bonding',
    subjectName: 'Chemistry',
    cards: [
      { front: 'What are the three subatomic particles and their properties?', back: 'Protons: positive charge (+1), found in nucleus, determine element identity (atomic number). Neutrons: no charge (0), found in nucleus, determine isotope. Electrons: negative charge (−1), orbit the nucleus in shells, determine chemical behaviour.', order: 0 },
      { front: 'What is the electron configuration of sodium (Na, atomic number 11)?', back: '2, 8, 1. Sodium has 11 electrons: 2 in the first shell, 8 in the second, and 1 in the third. The single valence electron makes sodium highly reactive — it readily loses it to form Na⁺ (ionic bonding).', order: 1 },
      { front: 'What is an isotope?', back: 'Isotopes are atoms of the same element (same number of protons) but different numbers of neutrons. Example: carbon-12 (6p, 6n) and carbon-14 (6p, 8n). They have the same chemical properties but different atomic masses.', order: 2 },
      { front: 'What is the difference between ionic and covalent bonding?', back: 'Ionic: transfer of electrons from a metal to a non-metal, creating oppositely charged ions attracted to each other (e.g., NaCl). Covalent: sharing of electron pairs between non-metals (e.g., H₂O, CO₂). Ionic compounds have high melting points; covalent compounds have lower melting points.', order: 3 },
      { front: 'What is electronegativity and how does it affect bonding?', back: 'Electronegativity is the ability of an atom to attract electrons in a bond. Large difference (>1.7) → ionic bond. Small difference → covalent bond. When electrons are shared unequally, the bond is polar covalent (e.g., H₂O, where O is more electronegative).', order: 4 },
      { front: 'What is the maximum number of electrons in each shell?', back: 'The formula is 2n² where n is the shell number. Shell 1 (K): max 2 electrons. Shell 2 (L): max 8 electrons. Shell 3 (M): max 18 electrons. Shell 4 (N): max 32 electrons. The outermost shell can hold a maximum of 8 electrons (octet rule).', order: 5 },
      { front: 'What are the properties of ionic compounds?', back: 'High melting and boiling points. Conduct electricity when molten or dissolved (ions are free to move) but NOT when solid. Hard and brittle. Form crystalline lattices. Usually soluble in water. Examples: NaCl, MgO, CaCl₂.', order: 6 },
      { front: 'What is a molecule and what is the difference between a molecule and a compound?', back: 'A molecule is two or more atoms bonded together. A compound is a substance made of two or more DIFFERENT elements bonded together. All compounds are molecules, but not all molecules are compounds (e.g., O₂ is a molecule but not a compound; H₂O is both).', order: 7 },
      { front: 'What is Avogadro\'s number and what does it represent?', back: 'Avogadro\'s number = 6.022 × 10²³. It is the number of particles (atoms, molecules, ions) in one mole of any substance. One mole of carbon-12 atoms has a mass of exactly 12 grams and contains 6.022 × 10²³ atoms.', order: 8 },
      { front: 'What is the difference between an element, compound, and mixture?', back: 'Element: substance made of only one type of atom (e.g., Fe, O₂). Compound: two or more elements chemically bonded in a fixed ratio (e.g., H₂O, NaCl). Mixture: two or more substances physically combined, not chemically bonded (e.g., salt water, air).', order: 9 },
    ],
  },
  {
    title: 'Chemistry: Organic Chemistry',
    description: 'Hydrocarbons, functional groups, and organic reactions',
    subjectName: 'Chemistry',
    cards: [
      { front: 'What is the general formula for alkanes, alkenes, and alkynes?', back: 'Alkanes (single bonds): CₙH₂ₙ₊₂ (e.g., CH₄, C₂H₆). Alkenes (one double bond): CₙH₂ₙ (e.g., C₂H₄). Alkynes (one triple bond): CₙH₂ₙ₋₂ (e.g., C₂H₂). The homologous series differ by CH₂ each time.', order: 0 },
      { front: 'What are the four main organic functional groups?', back: '1) Alcohol: −OH (hydroxyl). 2) Carboxylic acid: −COOH (carboxyl). 3) Aldehyde: −CHO (carbonyl at end). 4) Ketone: −CO− (carbonyl in the middle). The functional group determines the chemical properties of the compound.', order: 1 },
      { front: 'What is the difference between complete and incomplete combustion?', back: 'Complete combustion (plenty of oxygen): hydrocarbon + O₂ → CO₂ + H₂O + energy. Incomplete combustion (limited oxygen): hydrocarbon + O₂ → CO + H₂O + energy (or just C + H₂O). Carbon monoxide (CO) is a poisonous, colourless, odourless gas.', order: 2 },
      { front: 'What is the IUPAC naming system for organic compounds?', back: 'IUPAC names are based on: 1) Longest carbon chain (root name: meth=1, eth=2, prop=3, but=4, pent=5). 2) Functional group (suffix: -ane, -ene, -ol, -oic acid). 3) Position of functional group (number). Example: CH₃CH₂CH₂OH = propan-1-ol.', order: 3 },
      { front: 'What is fermentation and what are its products?', back: 'Fermentation is the anaerobic (without oxygen) breakdown of glucose by yeast enzymes. Equation: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂. Products: ethanol (alcohol) and carbon dioxide. It requires: temperature 35-40°C, yeast, and sugar solution.', order: 4 },
      { front: 'What are isomers?', back: 'Isomers are compounds with the same molecular formula but different structural arrangements. They have different physical and chemical properties. Example: C₄H₁₀ has two isomers: butane (straight chain) and 2-methylpropane (branched chain).', order: 5 },
      { front: 'What is a polymer?', back: 'A polymer is a large molecule made by joining many small repeating units called monomers. Examples: polyethene (from ethene monomers), PVC (from vinyl chloride monomers), nylon. Polymerisation can be addition (alkenes) or condensation (releasing water).', order: 6 },
      { front: 'What happens when ethanol is oxidised?', back: 'Ethanol is oxidised by acidified potassium dichromate(VI): Ethanol (primary alcohol) → Ethanal (aldehyde) → Ethanoic acid (carboxylic acid). Ethanoic acid is the active ingredient in vinegar. The colour change is orange to green (Cr(VI) reduced to Cr(III)).', order: 7 },
      { front: 'What is cracking in organic chemistry?', back: 'Cracking is the breaking down of large hydrocarbon molecules into smaller, more useful ones. Thermal cracking uses high temperature and pressure. Catalytic cracking uses a catalyst at lower temperature. It produces smaller alkanes (for petrol) and alkenes (for plastics).', order: 8 },
      { front: 'What are the environmental impacts of burning fossil fuels?', back: 'Burning fossil fuels releases: CO₂ (greenhouse gas → global warming), CO (toxic from incomplete combustion), SO₂ (causes acid rain → damages buildings, plants, aquatic life), NOₓ (causes photochemical smog, acid rain), and particulates (respiratory problems).', order: 9 },
    ],
  },
  {
    title: 'Chemistry: Acids, Bases & Reactions',
    description: 'Acid-base chemistry, titrations, salt preparation, and industrial processes',
    subjectName: 'Chemistry',
    cards: [
      { front: 'What is the pH scale?', back: 'The pH scale measures acidity/alkalinity from 0 to 14. pH 7 = neutral (pure water). pH < 7 = acidic (lower = stronger). pH > 7 = alkaline/basic (higher = stronger). Each whole number change = 10× change in H⁺ concentration. Universal indicator shows a range of colours.', order: 0 },
      { front: 'What is the difference between strong and weak acids?', back: 'Strong acids completely dissociate in water (e.g., HCl, H₂SO₄, HNO₃). Weak acids only partially dissociate (e.g., CH₃COOH, citric acid, carbonic acid). Strength is NOT the same as concentration — a dilute strong acid is still a strong acid.', order: 1 },
      { front: 'What is a neutralisation reaction?', back: 'Neutralisation: acid + base → salt + water. Example: HCl + NaOH → NaCl + H₂O. The H⁺ ions from the acid combine with the OH⁻ ions from the base to form H₂O. The remaining ions form the salt.', order: 2 },
      { front: 'What are the methods of salt preparation?', back: '1) Acid + metal → salt + H₂ (e.g., Zn + H₂SO₄ → ZnSO₄ + H₂). 2) Acid + base → salt + water (neutralisation). 3) Acid + carbonate → salt + water + CO₂ (e.g., CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂). 4) Precipitation (mixing two solutions).', order: 3 },
      { front: 'What is a titration and how is it performed?', back: 'Titration determines the concentration of an unknown solution. Method: 1) Add known volume of solution to flask. 2) Add indicator (e.g., phenolphthalein). 3) Slowly add solution of known concentration from burette until the endpoint (colour change). 4) Record volume used and calculate.', order: 4 },
      { front: 'What gas is produced when an acid reacts with a metal? How would you test for it?', back: 'Hydrogen gas (H₂) is produced: Acid + Metal → Salt + H₂. Test: Hold a burning splint at the mouth of the test tube — the hydrogen burns with a "pop" sound. Only metals ABOVE hydrogen in the reactivity series react with dilute acids.', order: 5 },
      { front: 'What happens during the Haber process?', back: 'The Haber process makes ammonia: N₂ + 3H₂ ⇌ 2NH₃. Conditions: iron catalyst, 450°C (compromise temperature), 200 atm (high pressure favours forward reaction). Uses: fertilisers, cleaning products, explosives. It is a reversible reaction.', order: 6 },
      { front: 'What are the products when an acid reacts with a carbonate?', back: 'Acid + Carbonate → Salt + Water + Carbon Dioxide. Example: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. Test for CO₂: bubble it through limewater (calcium hydroxide solution) — it turns milky/cloudy.', order: 7 },
      { front: 'What is the Contact Process?', back: 'The Contact Process produces sulphuric acid (H₂SO₄): 1) S + O₂ → SO₂. 2) 2SO₂ + O₂ → 2SO₃ (catalyst: V₂O₅, 450°C). 3) SO₃ + H₂SO₄ → H₂S₂O₇ (oleum). 4) H₂S₂O₇ + H₂O → 2H₂SO₄. Uses: fertilisers, detergents, batteries.', order: 8 },
      { front: 'How do you test for the presence of water?', back: 'Anhydrous copper(II) sulphate: white powder turns BLUE when water is added (CuSO₄ → CuSO₄·5H₂O). Cobalt chloride paper: blue turns PINK in the presence of water. These are reversible — heating drives the water off.', order: 9 },
    ],
  },

  // ─── PHYSICS (3 decks) ────────────────────────────────────────
  {
    title: 'Physics: Mechanics',
    description: 'Laws of motion, forces, energy, and projectile motion',
    subjectName: 'Physics',
    cards: [
      { front: 'State Newton\'s Three Laws of Motion.', back: '1st (Inertia): An object at rest stays at rest; an object in motion stays in motion unless acted on by an unbalanced force. 2nd: F = ma (Force = mass × acceleration). 3rd (Action-Reaction): For every action, there is an equal and opposite reaction.', order: 0 },
      { front: 'What are the SI units for these physical quantities: force, energy, power, pressure?', back: 'Force: Newton (N). Energy: Joule (J). Power: Watt (W). Pressure: Pascal (Pa). Remember: 1 N = 1 kg·m/s², 1 J = 1 N·m, 1 W = 1 J/s, 1 Pa = 1 N/m².', order: 1 },
      { front: 'What is the difference between mass and weight?', back: 'Mass is the amount of matter in an object, measured in kg — it does NOT change with location. Weight is the force of gravity on an object (W = mg), measured in Newtons — it DOES change with gravity. On the Moon (g ≈ 1.6 m/s²), your mass is the same but your weight is about 1/6 of Earth weight.', order: 2 },
      { front: 'What is the formula for kinetic energy and gravitational potential energy?', back: 'Kinetic Energy: KE = ½mv² (m = mass, v = velocity). Gravitational Potential Energy: PE = mgh (m = mass, g = gravitational acceleration, h = height). Total mechanical energy = KE + PE (conserved in ideal systems).', order: 3 },
      { front: 'A stone is thrown vertically upward at 20 m/s. How long until it reaches maximum height? (g = 10 m/s²)', back: 'At maximum height, v = 0. Using v = u + at: 0 = 20 − 10t, so t = 2 seconds. Maximum height = u²/(2g) = 400/20 = 20 m. Total time in air = 4 seconds (symmetrical path).', order: 4 },
      { front: 'What is the law of conservation of energy?', back: 'Energy cannot be created or destroyed — only transformed from one form to another. Total energy in a closed system remains constant. Example: a falling object converts PE to KE. In real systems, some energy is always "lost" as heat due to friction.', order: 5 },
      { front: 'What is the difference between speed and velocity?', back: 'Speed is a scalar quantity — it has magnitude only (e.g., 50 km/h). Velocity is a vector quantity — it has both magnitude AND direction (e.g., 50 km/h north). Speed = distance/time. Velocity = displacement/time. Average speed is always ≥ average velocity.', order: 6 },
      { front: 'What is the acceleration due to gravity?', back: 'On Earth, g ≈ 9.8 m/s² (often rounded to 10 m/s² in calculations). It is the acceleration of any freely falling object near Earth\'s surface, regardless of mass (in the absence of air resistance). On the Moon, g ≈ 1.6 m/s².', order: 7 },
      { front: 'What is momentum and how is it conserved?', back: 'Momentum (p) = mass × velocity (kg·m/s). It is a vector quantity. The law of conservation of momentum: in a closed system with no external forces, total momentum before a collision = total momentum after. This applies to explosions, collisions, and recoil.', order: 8 },
      { front: 'What is the difference between scalar and vector quantities?', back: 'Scalars have magnitude only (e.g., mass, temperature, speed, time, energy). Vectors have both magnitude AND direction (e.g., force, velocity, displacement, acceleration, weight). You can add/subtract vectors but not scalars in the same way.', order: 9 },
    ],
  },
  {
    title: 'Physics: Waves & Optics',
    description: 'Wave properties, light, sound, and electromagnetic spectrum',
    subjectName: 'Physics',
    cards: [
      { front: 'What is the wave equation?', back: 'v = f × λ, where v = wave speed (m/s), f = frequency (Hz), λ = wavelength (m). This applies to ALL waves. Example: a sound wave with f = 500 Hz and λ = 0.68 m has speed v = 500 × 0.68 = 340 m/s.', order: 0 },
      { front: 'What is the difference between transverse and longitudinal waves?', back: 'Transverse: particles vibrate perpendicular to the direction of wave travel (e.g., light, water waves, all EM waves). Longitudinal: particles vibrate parallel to the direction of wave travel (e.g., sound waves, compression waves). Longitudinal waves have compressions and rarefactions.', order: 1 },
      { front: 'What is the electromagnetic spectrum in order of increasing wavelength?', back: 'Gamma rays → X-rays → Ultraviolet → Visible light → Infrared → Microwaves → Radio waves. All travel at 3 × 10⁸ m/s in a vacuum. As wavelength increases, frequency and energy decrease.', order: 2 },
      { front: 'State the Law of Reflection.', back: 'The angle of incidence (i) equals the angle of reflection (r). Both angles are measured from the normal (a line perpendicular to the reflecting surface at the point of incidence). The incident ray, reflected ray, and normal all lie in the same plane.', order: 3 },
      { front: 'What is total internal reflection and when does it occur?', back: 'Total internal reflection occurs when light travels from a denser to a less dense medium at an angle greater than the critical angle. All light is reflected back — none is refracted. Applications: optical fibres (telecommunications, endoscopy), periscopes.', order: 4 },
      { front: 'What is the difference between reflection, refraction, and diffraction?', back: 'Reflection: waves bounce off a surface (angle of incidence = angle of reflection). Refraction: waves change direction when entering a different medium (due to speed change). Diffraction: waves spread out when passing through a gap or around an obstacle.', order: 5 },
      { front: 'How does the speed of sound compare in solids, liquids, and gases?', back: 'Sound travels fastest in solids, then liquids, then slowest in gases. In solids, particles are closer together so vibrations pass more quickly. Speed of sound in air ≈ 340 m/s, in water ≈ 1500 m/s, in steel ≈ 5000 m/s.', order: 6 },
      { front: 'What is the difference between a convex and concave lens?', back: 'Convex (converging) lens: thicker in the centre, converges light rays to a focal point. Used for magnifying glasses, correcting long-sightedness. Concave (diverging) lens: thinner in the centre, diverges light rays. Used for correcting short-sightedness.', order: 7 },
      { front: 'What is the relationship between wave speed, frequency, and the medium?', back: 'Wave speed depends on the medium (density, elasticity). When a wave enters a different medium: its speed and wavelength change, but its frequency stays the SAME. If speed decreases, wavelength decreases proportionally (v = fλ, f is constant).', order: 8 },
      { front: 'What is the critical angle?', back: 'The critical angle is the minimum angle of incidence (in a denser medium) for which total internal reflection occurs. It depends on the refractive indices: sin(c) = n₂/n₁ (where n₁ > n₂). Diamond has a small critical angle (24°), which is why it sparkles — light bounces around inside.', order: 9 },
    ],
  },
  {
    title: 'Physics: Electricity & Thermal Physics',
    description: 'Electrical circuits, Ohm\'s law, heat transfer, and thermal properties',
    subjectName: 'Physics',
    cards: [
      { front: 'State Ohm\'s Law and its formula.', back: 'Ohm\'s Law: The current through a conductor is directly proportional to the voltage across it, provided temperature remains constant. V = IR, where V = voltage (volts), I = current (amperes), R = resistance (ohms, Ω). Rearrangements: I = V/R, R = V/I.', order: 0 },
      { front: 'What is the difference between series and parallel circuits?', back: 'Series: one path for current — if one component fails, all fail. Current is the same through all components. Voltages add up. R_total = R₁ + R₂ + R₃. Parallel: multiple paths — if one fails, others still work. Voltage is the same across all branches. 1/R_total = 1/R₁ + 1/R₂ + 1/R₃.', order: 1 },
      { front: 'What is electrical power and how is it calculated?', back: 'Electrical power (P) is the rate of energy transfer, measured in Watts (W). Formulas: P = IV (power = current × voltage), P = I²R (from Ohm\'s law), P = V²/R. Energy = Power × Time (E = Pt), measured in Joules or kWh (for billing).', order: 2 },
      { front: 'What is specific heat capacity?', back: 'Specific heat capacity (c) is the energy needed to raise the temperature of 1 kg of a substance by 1°C. Formula: Q = mcΔT (energy = mass × specific heat capacity × temperature change). Water has a high specific heat capacity (4200 J/kg°C) — it heats up and cools down slowly, which moderates climate.', order: 3 },
      { front: 'What are the three methods of heat transfer?', back: 'Conduction: transfer through a solid by vibrating particles (metals are good conductors due to free electrons). Convection: transfer through fluids (liquids/gases) by circulating currents — hot fluid rises, cold sinks. Radiation: transfer by electromagnetic waves (no medium needed — how the Sun\'s heat reaches us).', order: 4 },
      { front: 'What is the difference between AC and DC current?', back: 'Direct Current (DC): flows in one direction only. Used in batteries, electronics. Alternating Current (AC): reverses direction periodically (e.g., mains electricity at 50 Hz in the Caribbean). AC is used for power transmission because voltage can be easily stepped up/down with transformers.', order: 5 },
      { front: 'What is specific latent heat?', back: 'Specific latent heat is the energy needed to change the state of 1 kg of a substance without changing its temperature. Specific latent heat of fusion: solid to liquid. Specific latent heat of vaporisation: liquid to gas. Formula: Q = mL (energy = mass × specific latent heat). During a change of state, temperature remains constant.', order: 6 },
      { front: 'What is a transformer and how does it work?', back: 'A transformer changes AC voltage levels. It works by electromagnetic induction: alternating current in the primary coil creates a changing magnetic field in the iron core, which induces a voltage in the secondary coil. Step-up: more turns in secondary (voltage increases). Step-down: fewer turns in secondary (voltage decreases).', order: 7 },
      { front: 'What happens to resistance when temperature increases in a conductor vs. a semiconductor?', back: 'In a conductor (metal): resistance INCREASES with temperature because atoms vibrate more, obstructing electron flow. In a semiconductor (e.g., thermistor): resistance DECREASES with temperature because more electrons are freed to carry current. This opposite behaviour is important in electronic circuits.', order: 8 },
      { front: 'What is the difference between conduction in metals and non-metals?', back: 'In metals: conduction is efficient because of FREE ELECTRONS that transfer kinetic energy rapidly through the lattice. In non-metals: conduction is slow, relying only on particle vibrations (phonons) passing energy to neighbours. This is why metals are good conductors and non-metals are insulators.', order: 9 },
    ],
  },

  // ─── HISTORY (3 decks) ────────────────────────────────────────
  {
    title: 'History: Indigenous Peoples & European Settlement',
    description: 'The Tainos, Kalinago, European arrival, and colonial systems',
    subjectName: 'History',
    cards: [
      { front: 'Who were the first inhabitants of the Caribbean?', back: 'The Indigenous Peoples: 1) The Ciboney/Guanihatabey (earliest, Cuba, western Hispaniola). 2) The Tainos (Arawaks — migrated from South America, largest group, agricultural). 3) The Kalinago (Caribs — later arrivals, more warlike, dominant in the Lesser Antilles). The Maya also lived in parts of Central America.', order: 0 },
      { front: 'Describe the social and political organisation of the Tainos.', back: 'Tainos were organised into cacicazgos (chiefdoms) led by a cacique (chief). The cacique was both political leader and religious figure. Society had noble families (nitaínos) and common people. They practised subsistence farming (conuco system) and lived in circular bohios.', order: 1 },
      { front: 'What was the Encomienda system?', back: 'The Encomienda system was established by the Spanish to exploit Indigenous labour. Spanish settlers were "entrusted" with groups of Tainos, who were forced to work in mines and on plantations in exchange for "protection" and Christianisation. It was essentially forced labour and led to massive population decline through disease, overwork, and brutality.', order: 2 },
      { front: 'Why did the Indigenous population decline so rapidly after European contact?', back: '1) New diseases (smallpox, measles, influenza) — no immunity. 2) Harsh forced labour under the Encomienda system. 3) Violence and warfare. 4) Malnutrition and starvation. 5) Suicide and infanticide. The Taino population fell from potentially 1-8 million to a few thousand within decades.', order: 3 },
      { front: 'What were the main differences between the Tainos and Kalinago?', back: 'Tainos: peaceful, agricultural, larger villages, traded with each other, believed in benevolent gods (cemíes), practised ball games. Kalinago: more aggressive, warlike, smaller settlements, skilled canoe builders, ate prisoners, patrilineal. Europeans called them "Caribs" (from which "Caribbean" comes).', order: 4 },
      { front: 'What was the significance of Columbus\'s arrival in 1492?', back: 'Columbus arrived in the Bahamas on October 12, 1492, beginning sustained European contact with the Caribbean. It led to: Spanish colonisation, the destruction of Indigenous civilisations, the introduction of African slavery, the Columbian Exchange (transfer of plants, animals, diseases), and the beginning of European imperialism in the Americas.', order: 5 },
      { front: 'What was the Columbian Exchange?', back: 'The Columbian Exchange was the widespread transfer of plants, animals, culture, human populations, technology, and ideas between the Americas and the Old World (Europe, Africa, Asia) after 1492. From Americas: maize, potatoes, tomatoes, tobacco. To Americas: wheat, sugar, horses, cattle, smallpox.', order: 6 },
      { front: 'Why did the Spanish import enslaved Africans to the Caribbean?', back: 'The Indigenous population was rapidly declining due to disease and harsh labour. Bartolomé de las Casas argued for the importation of Africans (initially as a "more resilient" labour alternative, though he later regretted this). The first enslaved Africans arrived in the Caribbean in the early 1500s, beginning the transatlantic slave trade.', order: 7 },
      { front: 'What were the main European rivals in the Caribbean?', back: 'Spain was the first coloniser. Then came: Britain, France, Netherlands, Denmark, and others. The 17th century saw intense rivalry over Caribbean territories. Britain and France emerged dominant. Islands changed hands frequently through wars and treaties (e.g., Treaty of Paris 1763).', order: 8 },
      { front: 'What was the plantation system?', back: 'The plantation system was a large-scale agricultural enterprise producing cash crops (sugar, tobacco, cotton) for export to Europe. It relied on enslaved African labour. It shaped Caribbean society, creating a rigid racial hierarchy with white planters at the top, mixed-race people in the middle, and enslaved Africans at the bottom.', order: 9 },
    ],
  },
  {
    title: 'History: Slavery & Emancipation',
    description: 'The transatlantic slave trade, resistance, and the road to emancipation',
    subjectName: 'History',
    cards: [
      { front: 'What was the Triangular Trade?', back: 'A three-legged trade route: 1) Europe → Africa: manufactured goods, guns, alcohol (exchanged for enslaved people). 2) Africa → Americas: enslaved Africans transported in the Middle Passage. 3) Americas → Europe: raw materials (sugar, rum, cotton, tobacco). This cycle enriched Europe while devastating Africa.', order: 0 },
      { front: 'What was the Middle Passage?', back: 'The Middle Passage was the forced voyage of enslaved Africans across the Atlantic Ocean to the Americas. It was horrific: overcrowded ships, disease, malnutrition, brutal treatment, high mortality (10-20% died during the crossing), and the complete stripping of identity, dignity, and freedom. The journey took 6-12 weeks.', order: 1 },
      { front: 'Name three forms of slave resistance in the Caribbean.', back: '1) Day-to-day resistance: working slowly, breaking tools, feigning illness, poisoning food. 2) Cultural resistance: preserving African languages, religions, music, and storytelling (e.g., Anansi stories). 3) Armed rebellion: Haiti (1791-1804), Tacky\'s Revolt (Jamaica, 1760), Fedon\'s Rebellion (Grenada, 1795-96).', order: 2 },
      { front: 'What was the Haitian Revolution and why was it significant?', back: 'The Haitian Revolution (1791-1804) was the only successful large-scale slave revolt in history. Led by Toussaint Louverture and later Jean-Jacques Dessalines, enslaved Africans overthrew French colonial rule. Haiti became the first independent Black republic and the first post-colonial independent nation in Latin America.', order: 3 },
      { front: 'What were the key events in the abolition of slavery in the British Caribbean?', back: '1807: Slave Trade Act abolished the transatlantic slave trade (not slavery itself). 1833: Slavery Abolition Act passed by British Parliament. 1834: Slavery officially abolished. 1834-1838: "Apprenticeship" period (forced labour continued). 1838: Full emancipation — all enslaved people freed.', order: 4 },
      { front: 'What was the Apprenticeship system?', back: 'Apprenticeship (1834-1838) replaced slavery but required formerly enslaved people to continue working on plantations for their former masters for 4-6 years. Non-praedial (field) workers: 6 years. Praedial (domestic/trades) workers: 4 years. It was widely seen as "slavery by another name" and was abandoned early in 1838.', order: 5 },
      { front: 'Who were the Maroons?', back: 'Maroons were communities of escaped enslaved Africans who established free settlements in remote, mountainous areas. Jamaican Maroon leaders: Cudjoe (Leeward Maroons) and Queen Nanny (Windward Maroons). They used guerrilla warfare and signed treaties with the British in 1739-40, gaining autonomy and land.', order: 6 },
      { front: 'What was the Morant Bay Rebellion (1865)?', back: 'Led by Paul Bogle and George William Gordon in Jamaica, it protested the harsh conditions facing freed people 27 years after emancipation. The brutal suppression by Governor Eyre (over 400 executed) caused outrage in Britain and led to constitutional reforms, eventually replacing the old assembly system with Crown Colony government.', order: 7 },
      { front: 'How did formerly enslaved people rebuild their lives after emancipation?', back: '1) Established free villages (buying land cooperatively, e.g., in Jamaica). 2) Formed independent churches (Native Baptists). 3) Developed informal economies (small-scale farming, fishing, trading). 4) Pursued education. 5) Maintained cultural traditions. Life was extremely difficult — many continued working on plantations for low wages.', order: 8 },
      { front: 'What role did religion play in slave resistance and emancipation?', back: 'Religion was a double-edged sword: European missionaries sometimes justified slavery but also provided literacy and a sense of dignity. African-derived religions (Vodou, Myal, Kumina) preserved cultural identity and were used to organise resistance. Black Baptist preachers like Sam Sharpe (1831 Baptist War) were key leaders.', order: 9 },
    ],
  },
  {
    title: 'History: Independence Movements',
    description: 'The path to independence, political leaders, and regional cooperation',
    subjectName: 'History',
    cards: [
      { front: 'When did the major Caribbean territories gain independence from Britain?', back: 'Jamaica and Trinidad & Tobago: 1962. Barbados: 1966. Guyana: 1966. Bahamas: 1973. Grenada: 1974. Dominica: 1978. St. Lucia, St. Vincent: 1979. Antigua & Barbuda: 1981. Belize: 1981. St. Kitts & Nevis: 1983. Haiti was first (1804). Cuba (1902 from Spain).', order: 0 },
      { front: 'Who were the key political leaders in the Caribbean independence movement?', back: 'Jamaica: Alexander Bustamante (JLP, first PM) and Norman Manley (PNP). Trinidad: Eric Williams (PPT, first PM). Barbados: Errol Barrow (DLP, first PM). Guyana: Cheddi Jagan and Forbes Burnham. These leaders campaigned for self-government, universal suffrage, and trade union rights.', order: 1 },
      { front: 'What was the West Indies Federation and why did it fail?', back: 'The West Indies Federation (1958-1962) was a political union of 10 British Caribbean territories aimed at achieving independence as a single nation. It failed because of: disagreements about governance, Jamaica\'s referendum (1961) voting to leave, competition between larger and smaller islands, and lack of strong popular support. Trinidad also withdrew.', order: 2 },
      { front: 'What was the role of trade unions in the independence movement?', back: 'Trade unions were crucial in the fight for workers\' rights and political empowerment. They organised strikes, protests, and political parties. Key figures: Alexander Bustamante (BITU/JLP), Norman Manley (NWU/PNP), Eric Williams. Labour rebellions in the 1930s (across the region) directly led to political reform and the path to independence.', order: 3 },
      { front: 'What is CARICOM and what are its main objectives?', back: 'CARICOM (Caribbean Community) was established by the Treaty of Chaguaramas in 1973. Members: 15 Caribbean nations + associates. Objectives: economic integration (CARICOM Single Market), coordination of foreign policy, cooperation in education, health, and culture. Successor to CARIFTA.', order: 4 },
      { front: 'What was the significance of the labour rebellions of the 1930s?', back: 'The 1930s labour rebellions (Jamaica 1938, Trinidad 1937, Barbados 1937) were widespread protests by workers against poor wages, high unemployment, and colonial exploitation. They led to the Moyne Commission (investigated conditions), the creation of trade unions, the rise of political parties, and the beginning of constitutional reform leading to independence.', order: 5 },
      { front: 'What is the difference between independent states and dependent territories in the Caribbean?', back: 'Independent states: fully sovereign, control their own foreign affairs, defence, and laws (e.g., Jamaica, Trinidad, Barbados). Dependent territories: still under the sovereignty of another country — British Overseas Territories (e.g., Montserrat, Cayman Islands, BVI), French departments (Martinique, Guadeloupe), Dutch territories (Aruba, Curaçao), US territories (Puerto Rico, USVI).', order: 6 },
      { front: 'What was the Cuban Revolution and its impact on the Caribbean?', back: 'Fidel Castro led the Cuban Revolution (1953-1959), overthrowing the Batista regime and establishing a communist government. Impact: inspired revolutionary movements across the Caribbean and Latin America, led to US embargo of Cuba, influenced Cold War politics in the region, and polarised Caribbean nations between US and Cuban alignment.', order: 7 },
      { front: 'What is the OECS?', back: 'The Organisation of Eastern Caribbean States (OECS) was established in 1981. It promotes economic union and cooperation among its member states: Antigua & Barbuda, Dominica, Grenada, St. Kitts & Nevis, St. Lucia, St. Vincent & the Grenadines, Montserrat, Anguilla, Martinique. Members share a common currency (EC dollar) and judiciary.', order: 8 },
      { front: 'What constitutional changes led to independence in the British Caribbean?', back: 'The process was gradual: Crown Colony government → limited representative government (adult suffrage in 1940s) → full internal self-government → independence. Key milestones: granting of universal adult suffrage (1944-1951), ministerial government, and constitutional conferences in London that negotiated the terms of independence.', order: 9 },
    ],
  },

  // ─── GEOGRAPHY (3 decks) ───────────────────────────────────────
  {
    title: 'Geography: Map Skills & Plate Tectonics',
    description: 'Map reading, coordinates, scale, and geological processes',
    subjectName: 'Geography',
    cards: [
      { front: 'What are latitude and longitude?', back: 'Latitude: distance north or south of the Equator (0°-90°), measured in degrees N or S. Key lines: Equator (0°), Tropics of Cancer (23.5°N) and Capricorn (23.5°S), Arctic/Antarctic Circles (66.5°). Longitude: distance east or west of the Prime Meridian (0°, Greenwich), measured 0°-180° E or W.', order: 0 },
      { front: 'How do you read a map scale of 1:50,000?', back: '1:50,000 means 1 unit on the map = 50,000 of the same units on the ground. So 1 cm on the map = 50,000 cm = 500 m = 0.5 km on the ground. Large scale (e.g., 1:10,000) shows more detail, small area. Small scale (e.g., 1:1,000,000) shows less detail, larger area.', order: 1 },
      { front: 'What are contour lines and what do they tell us?', back: 'Contour lines connect points of equal height above sea level on a map. Closer lines = steeper slope. Farther apart = gentler slope. Concentric circles = hill or mountain. Lines with tick marks (hachures) = depression. The contour interval is the vertical distance between consecutive lines (e.g., 10 m or 20 m).', order: 2 },
      { front: 'What is plate tectonics?', back: 'Plate tectonics theory states that the Earth\'s lithosphere is divided into rigid plates that float on the semi-fluid asthenosphere and move slowly. Movement is driven by convection currents in the mantle. Interactions at plate boundaries cause earthquakes, volcanoes, and mountain formation.', order: 3 },
      { front: 'What happens at the three types of plate boundaries?', back: 'Divergent (constructive): plates move apart — magma rises, creating new crust (e.g., Mid-Atlantic Ridge). Convergent (destructive): plates collide — one subducts under the other, causing volcanoes and trenches (e.g., Caribbean Plate subducting under North American Plate). Transform (conservative): plates slide past each other — earthquakes (e.g., Enriquillo-Plantain Garden fault).', order: 4 },
      { front: 'How does plate tectonics affect the Caribbean?', back: 'The Caribbean Plate sits between the North American and South American plates. The North American Plate subducts beneath the Caribbean Plate at the eastern boundary, creating the volcanic island arc of the Lesser Antilles (e.g., Mt. Pelée, Soufrière Hills). This causes earthquakes and volcanic eruptions throughout the region.', order: 5 },
      { front: 'What is the difference between weathering and erosion?', back: 'Weathering: the breakdown of rocks IN SITU (in place) by physical (freeze-thaw), chemical (acid rain, oxidation), or biological (tree roots) processes. Erosion: the TRANSPORT of weathered material by agents like water, wind, ice, and gravity. Weathering produces sediment; erosion moves it.', order: 6 },
      { front: 'What are the three main types of rocks?', back: 'Igneous: formed from cooled magma/lava (e.g., basalt, granite). Sedimentary: formed from compacted sediments or organic material (e.g., limestone, sandstone, shale). Metamorphic: formed from existing rocks changed by heat and pressure (e.g., marble from limestone, slate from shale).', order: 7 },
      { front: 'What is a four-figure grid reference and how is it written?', back: 'A four-figure grid reference locates a point on a map to the nearest kilometre square. Read the EASTINGS (vertical lines) first, then NORTHINGS (horizontal lines). Example: grid reference 4523 means: go along easting 45, then up northing 23. Always read "along the corridor, then up the stairs."', order: 8 },
      { front: 'What are the main types of volcanic eruptions?', back: 'Effusive (quiet): runny, low-silica lava flows freely — shield volcanoes (e.g., Hawaiian volcanoes). Explosive (violent): thick, high-silica lava traps gases — composite/stratovolcanoes with pyroclastic flows, ash clouds (e.g., Mt. Pelée 1902, Soufrière Hills, Montserrat). Caribbean volcanoes are typically explosive.', order: 9 },
    ],
  },
  {
    title: 'Geography: Climate & Weather',
    description: 'Caribbean climate systems, weather phenomena, and climate change',
    subjectName: 'Geography',
    cards: [
      { front: 'What type of climate does the Caribbean have?', back: 'Tropical maritime climate: warm temperatures year-round (25-30°C), high humidity, and distinct wet (June-December) and dry (January-May) seasons. Trade winds (from the northeast) provide cooling breezes. Rainfall varies by location — windward coasts and mountains receive more rain.', order: 0 },
      { front: 'What causes the wet and dry seasons in the Caribbean?', back: 'The wet season (June-December) coincides with the migration of the Intertropical Convergence Zone (ITCZ) northward, bringing heavy rainfall and tropical storms. The dry season (January-May) occurs when the ITCZ moves south, the North Atlantic high-pressure system dominates, and trade winds bring stable, drier conditions.', order: 1 },
      { front: 'What are hurricanes and how do they form?', back: 'Hurricanes are powerful tropical cyclones with sustained winds ≥119 km/h. They form over warm ocean water (≥26.5°C) when moist air rises, creating low pressure. The Coriolis effect causes rotation. Structure: eye (calm centre), eyewall (strongest winds), rainbands. Caribbean hurricane season: June-November, peaking August-September.', order: 2 },
      { front: 'What is El Niño and how does it affect the Caribbean?', back: 'El Niño is the warming of Pacific Ocean surface temperatures that alters global weather patterns. Caribbean effects: drier and warmer conditions, reduced rainfall, increased risk of drought, fewer hurricanes. La Niña (cooling) has opposite effects: wetter conditions, increased hurricane activity.', order: 3 },
      { front: 'What factors affect the temperature of a location?', back: '1) Latitude: nearer the equator = hotter. 2) Altitude: higher = cooler (temperature drops ~6.5°C per 1000m). 3) Distance from the sea: maritime areas have more moderate temperatures. 4) Ocean currents: warm currents warm nearby land. 5) Cloud cover: clouds reduce daytime temperatures and nighttime cooling.', order: 4 },
      { front: 'What is the difference between weather and climate?', back: 'Weather: short-term atmospheric conditions at a specific time and place (temperature, rain, wind today). Climate: long-term average of weather patterns over 30+ years for a region. Example: "Today it rained" is weather. "Jamaica has a tropical climate" describes climate.', order: 5 },
      { front: 'What are the effects of climate change on the Caribbean?', back: '1) Rising sea levels threatening coastal communities and infrastructure. 2) More intense hurricanes and extreme weather events. 3) Coral bleaching from warmer ocean temperatures. 4) Changes in rainfall patterns (more droughts and floods). 5) Impact on agriculture (sugar, bananas). 6) Economic damage to tourism.', order: 6 },
      { front: 'What is the rain shadow effect?', back: 'When moist air is forced to rise over a mountain range, it cools and drops rain on the windward side. The leeward (downwind) side receives much less rain as the air descends, warms, and holds moisture. In Jamaica, the Blue Mountains create a rain shadow, making the south coast drier.', order: 7 },
      { front: 'What instruments are used to measure weather?', back: 'Thermometer: temperature. Barometer: atmospheric pressure. Rain gauge: rainfall. Anemometer: wind speed. Wind vane: wind direction. Hygrometer: humidity. Stevenson screen: houses instruments in a standardised shelter (white, louvered, at 1.25m height).', order: 8 },
      { front: 'What are the trade winds and why are they important to the Caribbean?', back: 'Trade winds are consistent winds blowing from the northeast in the Northern Hemisphere tropics (between 0° and 30° latitude). They are caused by the Coriolis effect deflecting air moving toward the equator. They bring cooling breezes, influence rainfall distribution, and were historically used for sailing across the Atlantic.', order: 9 },
    ],
  },
  {
    title: 'Geography: Population & Economic Activities',
    description: 'Population dynamics, economic sectors, and Caribbean development',
    subjectName: 'Geography',
    cards: [
      { front: 'What factors affect population distribution in the Caribbean?', back: 'Physical factors: flat coastal plains are densely populated; mountainous interiors are sparsely populated. Climate: moderate areas preferred. Soil quality: fertile volcanic soils support agriculture. Water supply: reliable water sources. Economic factors: job opportunities in cities and tourist areas. Historical factors: plantation locations.', order: 0 },
      { front: 'What are the three sectors of economic activity?', back: 'Primary: extraction of raw materials (agriculture, fishing, mining, forestry). Secondary: manufacturing and processing (food processing, refining, textiles). Tertiary: services (tourism, banking, education, retail, government). Caribbean economies are dominated by services, especially tourism.', order: 1 },
      { front: 'What is the demographic transition model?', back: 'A model showing how population changes as a country develops. Stage 1 (pre-industrial): high birth rate, high death rate. Stage 2 (developing): high birth rate, falling death rate. Stage 3 (industrialising): falling birth rate, low death rate. Stage 4 (post-industrial): low birth rate, low death rate. Most Caribbean nations are in Stage 3-4.', order: 2 },
      { front: 'Why is tourism important to Caribbean economies?', back: 'Tourism is the largest source of foreign exchange for most Caribbean nations. Benefits: creates jobs (hotels, restaurants, transport), brings in foreign currency, stimulates infrastructure development, supports local businesses. Challenges: economic dependence, environmental damage, low wages, seasonal employment, leakage of profits to foreign-owned companies.', order: 3 },
      { front: 'What are the main agricultural products of the Caribbean?', back: 'Traditional export crops: sugar cane, bananas, citrus, cocoa, coffee, coconut. Food crops for domestic consumption: rice, yams, cassava, sweet potatoes, vegetables. The Caribbean was historically dependent on monoculture (single crop economies) — now diversifying into other sectors.', order: 4 },
      { front: 'What is population density and how does it vary across the Caribbean?', back: 'Population density = total population / land area (persons per km²). High density: Barbados (~680/km²), Haiti (~414/km²), Jamaica (~270/km²). Low density: Belize (~15/km²), Guyana (~4/km², though coastal areas are more dense). Urbanisation has led to high densities in capital cities.', order: 5 },
      { front: 'What are the main causes of deforestation in the Caribbean?', back: '1) Agriculture expansion (clearing land for farming). 2) Logging and timber extraction. 3) Urbanisation and infrastructure development. 4) Mining (bauxite in Jamaica, Guyana). 5) Charcoal production. 6) Tourism development. Consequences: soil erosion, loss of biodiversity, disrupted water cycles, increased flooding.', order: 6 },
      { front: 'What is the Caribbean Single Market and Economy (CSME)?', back: 'The CSME is an initiative of CARICOM to create a single economic space allowing free movement of goods, services, capital, and skilled labour among member states. Goals: boost regional trade, improve competitiveness, attract investment, and achieve sustainable development. It is still being fully implemented.', order: 7 },
      { front: 'What are the main environmental challenges facing the Caribbean?', back: '1) Climate change (sea level rise, stronger hurricanes). 2) Coral reef degradation from pollution, overfishing, and warming. 3) Deforestation and soil erosion. 4) Plastic pollution and waste management. 5) Over-exploitation of fisheries. 6) Vulnerability to oil spills. 7) Limited freshwater resources. Small island developing states (SIDS) are especially vulnerable.', order: 8 },
      { front: 'What is the informal economy and why is it significant in the Caribbean?', back: 'The informal economy consists of economic activities that are not regulated, taxed, or monitored by the government. Examples: street vending, informal taxi services, unregistered small businesses. It is significant because: provides employment for many who lack formal jobs, contributes to GDP (often underestimated), offers affordable goods and services, and is a safety net during economic downturns.', order: 9 },
    ],
  },

  // ─── PURE MATHEMATICS (3 decks) ───────────────────────────────
  {
    title: 'Pure Mathematics: Functions & Trigonometry',
    description: 'Functions, composite functions, and advanced trigonometry for CAPE',
    subjectName: 'Pure Mathematics',
    cards: [
      { front: 'What is a function and what is the difference between a function and a relation?', back: 'A function maps each element of the domain to exactly ONE element of the range. Notation: f: x → f(x). A relation can map one input to multiple outputs. To check if a relation is a function: use the vertical line test on its graph — a vertical line should intersect the graph at most once.', order: 0 },
      { front: 'What is a composite function?', back: 'A composite function applies one function after another: fg(x) means f(g(x)) — first apply g, then apply f to the result. Example: if f(x) = 2x + 1 and g(x) = x², then fg(3) = f(g(3)) = f(9) = 19. Note: fg(x) is generally NOT equal to gf(x).', order: 1 },
      { front: 'What is the inverse function and how do you find it?', back: 'The inverse function f⁻¹(x) reverses the effect of f(x). To find it: 1) Write y = f(x). 2) Swap x and y. 3) Solve for y. 4) Replace y with f⁻¹(x). The graph of f⁻¹ is the reflection of f in the line y = x. A function has an inverse only if it is one-to-one (passes horizontal line test).', order: 2 },
      { front: 'State the six trigonometric identities that you should memorise.', back: '1) sin²θ + cos²θ = 1. 2) 1 + tan²θ = sec²θ. 3) 1 + cot²θ = cosec²θ. 4) sin(A+B) = sinAcosB + cosAsinB. 5) cos(A+B) = cosAcosB − sinAsinB. 6) tan(A+B) = (tanA+tanB)/(1−tanAtanB). These are fundamental for simplifying and solving trigonometric equations.', order: 3 },
      { front: 'Convert 150° to radians.', back: 'To convert degrees to radians: multiply by π/180. So 150° × π/180 = 5π/6 radians. To convert radians to degrees: multiply by 180/π. Common values: 30° = π/6, 45° = π/4, 60° = π/3, 90° = π/2, 180° = π.', order: 4 },
      { front: 'What is the domain and range of f(x) = √(x − 2)?', back: 'Domain: the values x can take. For √(x−2) to be real, x − 2 ≥ 0, so x ≥ 2. Domain = {x : x ≥ 2} or [2, ∞). Range: the values f(x) can take. Since the square root function outputs non-negative values, range = {f(x) : f(x) ≥ 0} or [0, ∞).', order: 5 },
      { front: 'What are the even and odd function properties?', back: 'Even function: f(−x) = f(x) — symmetric about the y-axis (e.g., x², cos x). Odd function: f(−x) = −f(x) — symmetric about the origin (e.g., x³, sin x). Some functions are neither (e.g., x² + x). The product of two even functions is even; the product of two odd functions is even; the product of an even and odd function is odd.', order: 6 },
      { front: 'How do you solve the equation sin(2x) = 1/2 for 0 ≤ x ≤ 2π?', back: 'Let θ = 2x, so sin θ = 1/2. General solution: θ = π/6 + 2nπ or θ = 5π/6 + 2nπ. So 2x = π/6 + 2nπ → x = π/12 + nπ, and 2x = 5π/6 + 2nπ → x = 5π/12 + nπ. For 0 ≤ x ≤ 2π: x = π/12, 5π/12, 13π/12, 17π/12.', order: 7 },
      { front: 'What is the modulus (absolute value) function?', back: 'The modulus function |x| returns the non-negative value of x: |x| = x if x ≥ 0, |x| = −x if x < 0. It represents the distance of x from zero on the number line. The graph is V-shaped with its vertex at the origin. Properties: |ab| = |a||b|, |a + b| ≤ |a| + |b| (triangle inequality).', order: 8 },
      { front: 'What are the key features of the sine and cosine curves?', back: 'Sine: passes through origin, maximum at π/2, period = 2π, amplitude = 1. Cosine: starts at 1 (maximum at 0), crosses zero at π/2, period = 2π, amplitude = 1. General form: y = A sin(Bx + C) + D where A = amplitude, 2π/B = period, C = phase shift, D = vertical shift.', order: 9 },
    ],
  },
  {
    title: 'Pure Mathematics: Calculus Essentials',
    description: 'Limits, differentiation, and integration for CAPE Unit 1',
    subjectName: 'Pure Mathematics',
    cards: [
      { front: 'What is a limit?', back: 'The limit of f(x) as x approaches a is the value f(x) gets arbitrarily close to (but may not necessarily equal) as x gets close to a. Notation: lim(x→a) f(x) = L. Example: lim(x→2) (x² − 4)/(x − 2) = lim(x→2) (x+2) = 4. Even though the function is undefined at x = 2, the limit exists.', order: 0 },
      { front: 'What is the derivative of a function and what does it represent?', back: 'The derivative f\'(x) gives the instantaneous rate of change of f(x) at point x. Geometrically, it is the gradient (slope) of the tangent to the curve at that point. Definition: f\'(x) = lim(h→0) [f(x+h) − f(x)] / h. If f\'(x) > 0 the function is increasing; if < 0 it is decreasing.', order: 1 },
      { front: 'What are the basic differentiation rules?', back: 'Power rule: d/dx(xⁿ) = nxⁿ⁻¹. Constant rule: d/dx(c) = 0. Constant multiple: d/dx(cf(x)) = cf\'(x). Sum rule: d/dx(f+g) = f\'+g\'. Product rule: d/dx(uv) = u\'v + uv\'. Quotient rule: d/dx(u/v) = (u\'v − uv\')/v². Chain rule: d/dx(f(g(x))) = f\'(g(x))·g\'(x).', order: 2 },
      { front: 'Differentiate: f(x) = 3x⁴ − 5x² + 7x − 2', back: 'Apply the power rule term by term: f\'(x) = 3(4x³) − 5(2x) + 7(1) − 0 = 12x³ − 10x + 7. Remember: the derivative of a constant (−2) is 0, and 7x = 7x¹ so its derivative is 7.', order: 3 },
      { front: 'What is integration and how does it relate to differentiation?', back: 'Integration is the reverse of differentiation (anti-differentiation). If F\'(x) = f(x), then ∫f(x)dx = F(x) + C. Geometrically, ∫(a to b) f(x)dx gives the area under the curve y = f(x) between x = a and x = b. The constant C is the constant of integration.', order: 4 },
      { front: 'What are the basic integration rules?', back: 'Power rule: ∫xⁿdx = xⁿ⁺¹/(n+1) + C (n ≠ −1). ∫x⁻¹dx = ln|x| + C. Constant multiple: ∫k·f(x)dx = k·∫f(x)dx. Sum rule: ∫(f+g)dx = ∫f dx + ∫g dx. ∫eˣdx = eˣ + C. ∫sin x dx = −cos x + C. ∫cos x dx = sin x + C.', order: 5 },
      { front: 'Find ∫(4x³ + 6x − 3)dx', back: 'Integrate term by term: ∫4x³dx = 4·x⁴/4 = x⁴. ∫6x dx = 6·x²/2 = 3x². ∫(−3)dx = −3x. Result: x⁴ + 3x² − 3x + C. Always include the constant of integration C for indefinite integrals.', order: 6 },
      { front: 'What are stationary points and how do you classify them?', back: 'Stationary points occur where f\'(x) = 0. To classify: find f\'\'(x). If f\'\'(x₀) > 0: local minimum (concave up). If f\'\'(x₀) < 0: local maximum (concave down). If f\'\'(x₀) = 0: test is inconclusive — use the first derivative test or examine the sign of f\'(x) on either side.', order: 7 },
      { front: 'What is the chain rule for differentiation?', back: 'If y = f(u) and u = g(x), then dy/dx = (dy/du)(du/dg) = f\'(g(x))·g\'(x). Example: differentiate y = (2x + 1)⁵. Let u = 2x + 1, so y = u⁵. dy/du = 5u⁴, du/dx = 2. dy/dx = 5(2x+1)⁴ · 2 = 10(2x+1)⁴.', order: 8 },
      { front: 'What is definite integration and how do you evaluate it?', back: 'Definite integration: ∫(a to b) f(x)dx = [F(x)](a to b) = F(b) − F(a). It gives the signed area under the curve. Example: ∫(1 to 3) 2x dx = [x²](1 to 3) = 3² − 1² = 9 − 1 = 8. The Fundamental Theorem of Calculus connects differentiation and integration.', order: 9 },
    ],
  },
  {
    title: 'Pure Mathematics: Sequences, Series & Proof',
    description: 'Arithmetic/geometric sequences, sigma notation, and mathematical proof',
    subjectName: 'Pure Mathematics',
    cards: [
      { front: 'What is an arithmetic sequence and what are its key formulas?', back: 'A sequence where each term differs from the previous by a constant (common difference d). nth term: aₙ = a + (n−1)d. Sum of first n terms: Sₙ = n/2 [2a + (n−1)d] = n/2(a + l), where a = first term, l = last term. Example: 3, 7, 11, 15... (a=3, d=4).', order: 0 },
      { front: 'What is a geometric sequence and what are its key formulas?', back: 'A sequence where each term is found by multiplying the previous by a constant (common ratio r). nth term: aₙ = arⁿ⁻¹. Sum of first n terms: Sₙ = a(1−rⁿ)/(1−r) for r ≠ 1. Sum to infinity: S∞ = a/(1−r) if |r| < 1 (converges). If |r| ≥ 1, no sum to infinity exists.', order: 1 },
      { front: 'What is sigma (Σ) notation?', back: 'Σ means "sum of." Σ(r=1 to n) arʳ⁻¹ means sum the terms ar⁰ + ar¹ + ar² + ... + arⁿ⁻¹. The value below Σ is the starting index; the value above is the ending index. Example: Σ(k=1 to 4) k² = 1 + 4 + 9 + 16 = 30.', order: 2 },
      { front: 'When does a geometric series converge (have a sum to infinity)?', back: 'A geometric series converges when |r| < 1 (the common ratio has an absolute value less than 1). In this case, terms get progressively smaller and approach zero. The sum to infinity is S∞ = a/(1−r). If |r| ≥ 1, the series diverges (no finite sum to infinity).', order: 3 },
      { front: 'What are the three methods of mathematical proof?', back: '1) Direct proof: assume P is true, logically deduce Q. 2) Proof by contradiction: assume the statement is FALSE and show this leads to a contradiction. 3) Proof by induction: prove true for base case (n=1), assume true for n=k, then prove for n=k+1. For divisibility: show expression = integer × divisor.', order: 4 },
      { front: 'Prove by induction that Σ(k=1 to n) k = n(n+1)/2.', back: 'Base case (n=1): LHS = 1, RHS = 1(2)/2 = 1. ✓ Assume true for n=k: Σk = k(k+1)/2. For n=k+1: Σ(k=1 to k+1) i = k(k+1)/2 + (k+1) = (k+1)(k+2)/2. ✓ Proven for n=k+1. Therefore true for all positive integers n by induction.', order: 5 },
      { front: 'What is proof by contradiction?', back: 'To prove a statement P is true: 1) Assume P is false (assume the opposite). 2) Use logical deduction to reach a contradiction (something impossible or absurd). 3) Conclude that the original assumption must be wrong, so P is true. Classic example: prove √2 is irrational.', order: 6 },
      { front: 'What is the binomial expansion of (a + b)ⁿ?', back: '(a + b)ⁿ = Σ(k=0 to n) ⁿCₖ · aⁿ⁻ᵏ · bᵏ, where ⁿCₖ = n! / (k!(n−k)!). The coefficients ⁿC₀, ⁿC₁, ⁿC₂, ... are the binomial coefficients and can be found in Pascal\'s Triangle. Example: (x+1)³ = x³ + 3x² + 3x + 1.', order: 7 },
      { front: 'What is the relationship between arithmetic mean, geometric mean, and harmonic mean?', back: 'For positive numbers a and b: Arithmetic Mean (AM) = (a+b)/2. Geometric Mean (GM) = √(ab). Harmonic Mean (HM) = 2ab/(a+b). The inequality AM ≥ GM ≥ HM always holds for positive numbers, with equality when a = b.', order: 8 },
      { front: 'What is the factorial function?', back: 'n! = n × (n−1) × (n−2) × ... × 2 × 1. Special cases: 0! = 1, 1! = 1. Examples: 3! = 6, 5! = 120, 10! = 3,628,800. Used in permutations (nPr = n!/(n−r)!), combinations (nCr = n!/(r!(n−r)!)), and the binomial theorem.', order: 9 },
    ],
  },

  // ─── CARIBBEAN STUDIES (3 decks) ───────────────────────────────
  {
    title: 'Caribbean Studies: Identity & Culture',
    description: 'Caribbean identity, cultural diversity, social institutions, and heritage',
    subjectName: 'Caribbean Studies',
    cards: [
      { front: 'What is the Caribbean identity and why is it described as "hybrid"?', back: 'Caribbean identity is a blend (creolisation) of African, European, Indigenous, Asian, and Middle Eastern cultural influences. It is hybrid because no single culture dominates — instead, elements have mixed over centuries to create unique Caribbean forms in language, music, religion, food, and art.', order: 0 },
      { front: 'What is creolisation?', back: 'Creolisation is the process of cultural mixing that occurs when different cultural groups interact over time, creating new, distinct cultural forms. In the Caribbean, it produced: Creole languages (Jamaican Patois, Haitian Creole), religions (Vodou, Santería, Shouter Baptist), music (reggae, calypso, salsa), and cuisine (jerk chicken, roti, callaloo).', order: 1 },
      { front: 'What are the main cultural influences in the Caribbean?', back: '1) African: music, dance, religion, oral traditions, family structures. 2) European: language, education, legal systems, religion (Christianity), architecture. 3) Indigenous (Taino/Kalinago): place names, agriculture (cassava), hammocks, canoes. 4) Asian (Indian, Chinese): food, festivals (Diwali, Phagwa), religion (Hinduism, Islam). 5) Middle Eastern: trade, cuisine.', order: 2 },
      { front: 'What are the main social institutions in the Caribbean?', back: 'Family, education, religion, and government are the primary social institutions. Caribbean family types include: nuclear, single-parent (especially female-headed), extended, and visiting unions. These reflect both historical and socio-economic factors.', order: 3 },
      { front: 'What is the significance of Carnival in Caribbean culture?', back: 'Carnival originated as a pre-Lenten celebration adopted from European colonisers. In the Caribbean, enslaved Africans transformed it into a celebration of freedom and cultural expression. It features: calypso/soca music, elaborate costumes, steelpan, masquerade bands, and street parades. Major carnivals: Trinidad & Tobago, Jamaica (Bacchanal), Barbados (Crop Over).', order: 4 },
      { front: 'What are Caribbean Creole languages?', back: 'Creole languages developed during slavery as a means of communication between enslaved Africans who spoke different languages and European masters. They have a European-based vocabulary with African-influenced grammar and syntax. Examples: Jamaican Patois (English-based), Haitian Creole (French-based), Papiamento (Dutch/Spanish-based).', order: 5 },
      { front: 'What role did the Rastafari movement play in Caribbean culture?', back: 'Rastafari emerged in Jamaica in the 1930s, influenced by Marcus Garvey\'s teachings and the coronation of Haile Selassie I of Ethiopia. It promotes: Black pride and empowerment, rejection of "Babylon" (oppressive Western system), ital (natural) food, reggae music as a vehicle for social commentary. Bob Marley spread Rastafari globally.', order: 6 },
      { front: 'What is the concept of "plural society" in the Caribbean?', back: 'The plural society model (M.G. Smith) describes Caribbean societies as consisting of distinct cultural segments that live side by side but interact minimally. Each group maintains its own culture, institutions, and values. Critics argue this model is oversimplified — the Caribbean is actually characterised by significant cultural mixing (creolisation).', order: 7 },
      { front: 'How has migration shaped Caribbean society?', back: 'Migration has profoundly shaped the Caribbean: 1) Historical: forced migration of Africans (slavery), indentured labourers from India, China, Portugal. 2) Modern: brain drain (skilled professionals emigrating to UK, US, Canada), diaspora communities maintaining cultural ties, remittances as a major source of income. 3) Return migration brings back new ideas and investment.', order: 8 },
      { front: 'What are the major religions in the Caribbean and their origins?', back: 'Christianity: brought by European colonisers (Catholic, Anglican, Baptist, Methodist, Seventh-Day Adventist). African-derived religions: Vodou (Haiti), Santería (Cuba), Shango/Orisha (Trinidad), Kumina (Jamaica). Hinduism and Islam: brought by Indian indentured labourers. Rastafari: indigenous Caribbean movement. The Caribbean is religiously diverse.', order: 9 },
    ],
  },
  {
    title: 'Caribbean Studies: Economic & Political Development',
    description: 'Economic systems, political structures, and development challenges',
    subjectName: 'Caribbean Studies',
    cards: [
      { front: 'What are the main economic challenges facing Caribbean nations?', back: '1) Small size and vulnerability to external shocks. 2) Dependence on a narrow range of exports (tourism, bauxite, sugar). 3) High debt-to-GDP ratios. 4) Unemployment and underemployment. 5) Vulnerability to natural disasters. 6) Brain drain (emigration of skilled workers). 7) Limited natural resources. 8) High import dependence (food, fuel).', order: 0 },
      { front: 'What is the legacy of the plantation economy in the Caribbean?', back: 'The plantation economy created: monoculture dependence (single crop economies), export-oriented production (not food self-sufficiency), foreign ownership of resources, unequal land distribution, dependence on cheap labour, and vulnerability to global commodity price fluctuations. Many Caribbean economies still struggle to diversify beyond this legacy.', order: 1 },
      { front: 'What is "dependency theory" and how does it apply to the Caribbean?', back: 'Dependency theory (Andre Gunder Frank) argues that developing countries (the periphery) are structurally dependent on developed countries (the core), which extract resources and wealth. Caribbean application: former colonies remain economically dependent on former colonisers through trade relationships, debt, foreign ownership, and unequal exchange. The region exports raw materials cheaply and imports manufactured goods expensively.', order: 2 },
      { front: 'What are the main political systems in the Caribbean?', back: 'Most Caribbean nations are parliamentary democracies based on the Westminster (British) model. Features: a Prime Minister as head of government, a ceremonial President or Governor-General as head of state, a bicameral legislature (Senate and House of Representatives), and regular elections. Exceptions: Cuba (socialist republic), Haiti (semi-presidential republic).', order: 3 },
      { front: 'What is the role of the Caribbean Court of Justice (CCJ)?', back: 'The CCJ was established in 2001 and headquartered in Trinidad & Tobago. It serves two functions: 1) Original jurisdiction: interpreting the CARICOM Treaty (for the CSME). 2) Appellate jurisdiction: replaces the UK Privy Council as the final court of appeal for civil and criminal cases (adopted by some but not all Caribbean nations).', order: 4 },
      { front: 'What is structural adjustment and how has it affected Caribbean economies?', back: 'Structural adjustment programmes (SAPs) are economic policies imposed by the IMF/World Bank as conditions for loans. They require: reducing government spending, privatising state enterprises, removing trade barriers, devaluing currency. In the Caribbean, SAPs led to: reduced social services, higher unemployment, increased cost of living, but also some economic reforms and efficiency improvements.', order: 5 },
      { front: 'What is the significance of the bauxite/alumina industry to the Caribbean?', back: 'Jamaica is one of the world\'s largest producers of bauxite (aluminium ore). The industry: provides significant export earnings and government revenue, creates employment, but also causes environmental damage (deforestation, water pollution, land degradation). It is vulnerable to global aluminium price fluctuations and has faced periodic decline.', order: 6 },
      { front: 'What are the main causes of poverty in the Caribbean?', back: '1) High unemployment and underemployment. 2) Low wages, especially in informal sector. 3) Inadequate education and skills training. 4) Large family sizes (especially single-parent households). 5) Geographic isolation (rural communities). 6) Chronic illness (HIV/AIDS, NCDs). 7) Natural disasters destroying livelihoods. 8) Historical inequality from slavery and colonialism.', order: 7 },
      { front: 'What is the importance of remittances to Caribbean economies?', back: 'Remittances (money sent home by Caribbean diaspora) are a vital source of foreign exchange for many Caribbean nations. They often exceed foreign direct investment and official development aid. Benefits: support families, fund education and healthcare, stimulate local businesses. Jamaica and Haiti receive billions in annual remittances.', order: 8 },
      { front: 'What is sustainable development and why is it important for the Caribbean?', back: 'Sustainable development meets present needs without compromising future generations\' ability to meet theirs (Brundtland Commission, 1987). It balances economic growth, environmental protection, and social equity. For Caribbean SIDS: critical because of vulnerability to climate change, limited resources, and the need to develop economically while preserving natural heritage.', order: 9 },
    ],
  },
  {
    title: 'Caribbean Studies: Globalization & Regional Integration',
    description: 'Globalization impacts, regional cooperation, and future challenges',
    subjectName: 'Caribbean Studies',
    cards: [
      { front: 'What is globalisation and what are its positive and negative effects on the Caribbean?', back: 'Globalisation is the increasing interconnection of countries through trade, technology, media, and culture. Positives: access to global markets, technology transfer, cultural exchange, investment. Negatives: loss of local culture (cultural imperialism), competition from larger economies, brain drain, vulnerability to global economic shocks, exploitation by multinational corporations.', order: 0 },
      { front: 'What is the role of CARICOM in regional integration?', back: 'CARICOM (est. 1973, Treaty of Chaguaramas) aims to: promote economic integration through the CSME, coordinate foreign policy among member states, foster cooperation in health, education, and security, and advance the interests of Small Island Developing States (SIDS) internationally. It has 15 full members and 5 associates.', order: 1 },
      { front: 'What are the main arguments for and against Caribbean political integration?', back: 'For: greater bargaining power internationally, larger combined market, reduced duplication of services, shared resources for education and security, stronger regional identity. Against: loss of national sovereignty, competition between larger and smaller states, differing economic priorities, historical rivalries, governance challenges of a large, diverse union.', order: 2 },
      { front: 'What is the CSME and what are its four pillars?', back: 'The Caribbean Single Market and Economy (CSME) aims for regional economic integration. Four pillars: 1) Free movement of goods (remove tariffs). 2) Free movement of services. 3) Free movement of capital. 4) Free movement of skilled persons (CARICOM nationals can work in any member state without work permits in approved categories).', order: 3 },
      { front: 'How has globalisation affected Caribbean culture?', back: 'Cultural imperialism: dominant cultures (especially American) spread through media, fast food, music, and fashion, potentially eroding local traditions. However, Caribbean culture has also gone GLOBAL: reggae, calypso, dancehall, soca, Jamaican cuisine, and Caribbean literature are consumed worldwide. Caribbean diaspora communities maintain and spread cultural practices abroad.', order: 4 },
      { front: 'What is the concept of "Caribbean diaspora"?', back: 'The Caribbean diaspora refers to people of Caribbean origin living outside the Caribbean, primarily in the UK, USA, Canada, and neighbouring Latin American countries. They maintain strong ties through: sending remittances, investing in home countries, participating in politics, preserving cultural traditions, and contributing to "brain circulation" (returning skills and expertise).', order: 5 },
      { front: 'What are Small Island Developing States (SIDS) and why does this classification matter?', back: 'SIDS are a group of small island nations that share similar sustainable development challenges: small populations, limited resources, remoteness, vulnerability to natural disasters, and dependence on international trade. The Caribbean has many SIDS. This classification gives them special consideration in international agreements (e.g., UN climate negotiations, trade preferences).', order: 6 },
      { front: 'What is the impact of technology on Caribbean development?', back: 'Positive: improved communication, access to global information, e-commerce, online education, telemedicine, financial technology. Challenges: digital divide (unequal access), cybersecurity risks, job displacement by automation, dependence on foreign technology companies, need for greater STEM education. The Caribbean must invest in digital infrastructure to remain competitive.', order: 7 },
      { front: 'What is the significance of sport in Caribbean identity and development?', back: 'Sport is central to Caribbean identity and a source of international recognition. Achievements in: athletics (Usain Bolt, Shelly-Ann Fraser-Pryce), cricket (West Indies team), football, swimming. Sport promotes national pride, youth development, tourism (major events), diplomacy, and health. However, many athletes migrate to represent other countries ("athletic brain drain").', order: 8 },
      { front: 'What are the key future challenges for the Caribbean region?', back: '1) Climate change adaptation and mitigation. 2) Economic diversification and reducing debt. 3) Managing the COVID-19 economic fallout. 4) Strengthening regional integration (CSME). 5) Addressing crime and security. 6) Education reform and digital transformation. 7) Sustainable tourism development. 8) Reducing inequality and poverty. 9) Food security and import substitution.', order: 9 },
    ],
  },
]

// ══════════════════════════════════════════════════════════════════
//  MAIN SEED FUNCTION
// ══════════════════════════════════════════════════════════════════

async function main() {
  console.log('🔄 CXC Ace Flashcard Seed Script')
  console.log('================================\n')

  // ── 1. Find the first user ─────────────────────────────────────
  const firstUser = await db.user.findFirst({ orderBy: { createdAt: 'asc' } })
  if (!firstUser) {
    console.error('❌ No users found in the database. Please seed users first.')
    process.exit(1)
  }
  console.log(`✅ Found user: ${firstUser.name} (${firstUser.id})\n`)

  // ── 2. Pre-load all subjects into a map ───────────────────────
  const allSubjects = await db.subject.findMany()
  const subjectMap = new Map(allSubjects.map((s) => [s.name, s]))

  // ── 3. Pre-load all topics into a map ─────────────────────────
  const allTopics = await db.topic.findMany({ include: { subject: true } })
  const topicMap = new Map(allTopics.map((t) => [t.name, t]))

  // ── 4. Create each deck ───────────────────────────────────────
  let createdCount = 0
  let skippedCount = 0
  let totalCards = 0
  let skippedCards = 0

  for (const deckData of DECKS) {
    // Look up the subject
    const subject = subjectMap.get(deckData.subjectName)
    if (!subject) {
      console.warn(`⚠️  Subject not found: "${deckData.subjectName}" — skipping deck "${deckData.title}"`)
      skippedCount++
      skippedCards += deckData.cards.length
      continue
    }

    // Check if deck already exists (idempotent)
    const existingDeck = await db.flashcardDeck.findFirst({
      where: { title: deckData.title },
    })

    if (existingDeck) {
      console.log(`⏭️  Deck already exists: "${deckData.title}" — skipping (${deckData.cards.length} cards)`)
      skippedCount++
      skippedCards += deckData.cards.length
      continue
    }

    // Create the deck with its cards
    try {
      const deck = await db.flashcardDeck.create({
        data: {
          title: deckData.title,
          description: deckData.description,
          userId: firstUser.id,
          subjectId: subject.id,
          isPublic: true,
          cardCount: deckData.cards.length,
          cards: {
            create: deckData.cards.map((card) => ({
              front: card.front,
              back: card.back,
              order: card.order,
            })),
          },
        },
        include: { cards: true },
      })

      createdCount++
      totalCards += deck.cards.length
      console.log(`✅ Created deck: "${deck.title}" — ${deck.cards.length} cards (subject: ${subject.name})`)
    } catch (error) {
      console.error(`❌ Error creating deck "${deckData.title}":`, error)
    }
  }

  // ── Summary ───────────────────────────────────────────────────
  console.log('\n================================')
  console.log('📊 Seed Summary:')
  console.log(`   Decks created: ${createdCount}`)
  console.log(`   Decks skipped (already exist): ${skippedCount}`)
  console.log(`   Cards created: ${totalCards}`)
  console.log(`   Cards skipped: ${skippedCards}`)
  console.log(`   Total decks defined: ${DECKS.length}`)
  console.log('================================')
}

main()
  .catch((e) => {
    console.error('Seed script failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
