import { PrismaClient, Difficulty } from '@prisma/client'

const db = new PrismaClient()

// Helper to create a question with options
function mcq(
  content: string,
  options: { label: string; value: string; isCorrect: boolean }[],
  explanation: string,
  difficulty: Difficulty,
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
    source: source || null,
  }
}

const EASY: Difficulty = 'EASY'
const MEDIUM: Difficulty = 'MEDIUM'
const HARD: Difficulty = 'HARD'

const SUBJECTS = [
  { name: 'Mathematics', code: 'CSEC-MATH', description: 'CSEC Mathematics', color: '#6366f1', icon: '📐', topics: ['Number Theory & Computation', 'Algebra', 'Relations & Functions', 'Geometry & Trigonometry', 'Statistics & Probability', 'Sets & Logic'] },
  { name: 'English A', code: 'CSEC-ENG', description: 'CSEC English A', color: '#ec4899', icon: '📖', topics: ['Grammar & Mechanics', 'Comprehension', 'Summary Writing', 'Essay Writing', 'Persuasive Writing'] },
  { name: 'Biology', code: 'CSEC-BIO', description: 'CSEC Biology', color: '#22c55e', icon: '🧬', topics: ['Cell Biology', 'Ecology', 'Human Physiology', 'Genetics & Heredity', 'Plant Biology', 'Evolution'] },
  { name: 'Chemistry', code: 'CSEC-CHEM', description: 'CSEC Chemistry', color: '#f59e0b', icon: '⚗️', topics: ['Atomic Structure', 'Chemical Bonding', 'Stoichiometry', 'Organic Chemistry', 'Acids, Bases & Salts', 'Industrial Chemistry'] },
  { name: 'Physics', code: 'CSEC-PHYS', description: 'CSEC Physics', color: '#3b82f6', icon: '⚡', topics: ['Mechanics', 'Waves & Optics', 'Thermal Physics', 'Electricity & Magnetism', 'Nuclear Physics'] },
  { name: 'History', code: 'CSEC-HIST', description: 'CSEC History', color: '#a855f7', icon: '📜', topics: ['The Indigenous Peoples', 'European Settlement', 'Slavery & Resistance', 'Emancipation', 'Independence Movements'] },
  { name: 'Geography', code: 'CSEC-GEOG', description: 'CSEC Geography', color: '#14b8a6', icon: '🌍', topics: ['Map Reading', 'Climate & Weather', 'Plate Tectonics', 'Population Geography', 'Economic Activities', 'Caribbean Environment'] },
  { name: 'Pure Mathematics', code: 'CAPE-PURE1', description: 'CAPE Pure Mathematics Unit 1', color: '#ef4444', icon: '∑', topics: ['Functions & Relations', 'Trigonometry & Circular Measure', 'Calculus (Limits)', 'Calculus (Differentiation)', 'Calculus (Integration)', 'Sequences & Series'] },
  { name: 'Caribbean Studies', code: 'CAPE-CS', description: 'CAPE Caribbean Studies', color: '#f97316', icon: '🏝️', topics: ['Caribbean Identity', 'Culture & Society', 'Economic Development', 'Political Development', 'Globalization', 'Regional Integration'] },
]

// Question bank data - comprehensive for each subject
const QUESTIONS: Record<string, ReturnType<typeof mcq>[]> = {
  'CSEC-MATH': [
    mcq('What is the value of 3² + 4²?', [{label:'A',value:'25',isCorrect:true},{label:'B',value:'12',isCorrect:false},{label:'C',value:'7',isCorrect:false},{label:'D',value:'49',isCorrect:false}], 'Using the order of operations: 3² = 9, 4² = 16, and 9 + 16 = 25.', EASY, 'Number Theory & Computation'),
    mcq('Which of the following is a prime number?', [{label:'A',value:'15',isCorrect:false},{label:'B',value:'21',isCorrect:false},{label:'C',value:'29',isCorrect:true},{label:'D',value:'33',isCorrect:false}], '29 is prime because it is only divisible by 1 and 29. 15=3×5, 21=3×7, 33=3×11.', EASY, 'Number Theory & Computation'),
    mcq('What is the LCM of 12 and 18?', [{label:'A',value:'36',isCorrect:true},{label:'B',value:'24',isCorrect:false},{label:'C',value:'72',isCorrect:false},{label:'D',value:'6',isCorrect:false}], '12=2²×3, 18=2×3², LCM=2²×3²=36.', MEDIUM, 'Number Theory & Computation'),
    mcq('Simplify: 2(3x - 4) - (x + 5)', [{label:'A',value:'5x - 13',isCorrect:true},{label:'B',value:'5x - 3',isCorrect:false},{label:'C',value:'6x - 13',isCorrect:false},{label:'D',value:'7x - 9',isCorrect:false}], 'Expand: 6x - 8 - x - 5 = 5x - 13.', MEDIUM, 'Algebra'),
    mcq('If 3x + 7 = 22, what is x?', [{label:'A',value:'3',isCorrect:false},{label:'B',value:'5',isCorrect:true},{label:'C',value:'7',isCorrect:false},{label:'D',value:'4',isCorrect:false}], '3x + 7 = 22 → 3x = 15 → x = 5.', EASY, 'Algebra'),
    mcq('Solve: x² - 5x + 6 = 0', [{label:'A',value:'x = 2 and x = 3',isCorrect:true},{label:'B',value:'x = -2 and x = -3',isCorrect:false},{label:'C',value:'x = 1 and x = 6',isCorrect:false},{label:'D',value:'x = -1 and x = -6',isCorrect:false}], 'Factor: (x-2)(x-3)=0, so x=2 or x=3.', MEDIUM, 'Algebra'),
    mcq('What is the gradient of the line passing through points (2, 3) and (6, 11)?', [{label:'A',value:'2',isCorrect:true},{label:'B',value:'3',isCorrect:false},{label:'C',value:'4',isCorrect:false},{label:'D',value:'8',isCorrect:false}], 'Gradient = (11-3)/(6-2) = 8/4 = 2.', MEDIUM, 'Relations & Functions'),
    mcq('In a right-angled triangle, if one acute angle is 30°, what is the other?', [{label:'A',value:'45°',isCorrect:false},{label:'B',value:'90°',isCorrect:false},{label:'C',value:'60°',isCorrect:true},{label:'D',value:'30°',isCorrect:false}], 'Angles in a triangle sum to 180°. 180° - 90° - 30° = 60°.', EASY, 'Geometry & Trigonometry'),
    mcq('What is the area of a circle with radius 7 cm? (Use π = 22/7)', [{label:'A',value:'44 cm²',isCorrect:false},{label:'B',value:'154 cm²',isCorrect:true},{label:'C',value:'308 cm²',isCorrect:false},{label:'D',value:'77 cm²',isCorrect:false}], 'A = πr² = (22/7) × 7² = 22 × 7 = 154 cm².', EASY, 'Geometry & Trigonometry'),
    mcq('What is sin(30°)?', [{label:'A',value:'1',isCorrect:false},{label:'B',value:'0.5',isCorrect:true},{label:'C',value:'√3/2',isCorrect:false},{label:'D',value:'√2/2',isCorrect:false}], 'sin(30°) = 1/2 = 0.5.', EASY, 'Geometry & Trigonometry'),
    mcq('The mean of 5 numbers is 12. What is their sum?', [{label:'A',value:'17',isCorrect:false},{label:'B',value:'7',isCorrect:false},{label:'C',value:'60',isCorrect:true},{label:'D',value:'12',isCorrect:false}], 'Mean = Sum/n, so Sum = Mean × n = 12 × 5 = 60.', EASY, 'Statistics & Probability'),
    mcq('A die is rolled. What is the probability of getting an even number?', [{label:'A',value:'1/6',isCorrect:false},{label:'B',value:'1/2',isCorrect:true},{label:'C',value:'1/3',isCorrect:false},{label:'D',value:'2/3',isCorrect:false}], 'Even numbers on a die: 2, 4, 6. P = 3/6 = 1/2.', EASY, 'Statistics & Probability'),
    mcq('If A = {1,2,3,4,5} and B = {3,4,5,6,7}, what is A ∩ B?', [{label:'A',value:'{1,2,3,4,5,6,7}',isCorrect:false},{label:'B',value:'{3,4,5}',isCorrect:true},{label:'C',value:'{1,2,6,7}',isCorrect:false},{label:'D',value:'{3}',isCorrect:false}], 'A ∩ B (intersection) is the set of elements common to both: {3,4,5}.', MEDIUM, 'Sets & Logic'),
    mcq('Simplify: (x³)² ÷ x⁴', [{label:'A',value:'x²',isCorrect:true},{label:'B',value:'x',isCorrect:false},{label:'C',value:'x³',isCorrect:false},{label:'D',value:'x⁵',isCorrect:false}], 'Using laws of indices: x^(3×2) ÷ x⁴ = x⁶⁻⁴ = x².', MEDIUM, 'Algebra'),
    mcq('What is the value of √144?', [{label:'A',value:'12',isCorrect:true},{label:'B',value:'14',isCorrect:false},{label:'C',value:'10',isCorrect:false},{label:'D',value:'11',isCorrect:false}], '√144 = 12, because 12 × 12 = 144.', EASY, 'Number Theory & Computation'),
    mcq('A triangle has sides 3, 4, and 5. Is it a right triangle?', [{label:'A',value:'Yes',isCorrect:true},{label:'B',value:'No',isCorrect:false},{label:'C',value:'Cannot determine',isCorrect:false},{label:'D',value:'Only if all angles are equal',isCorrect:false}], '3² + 4² = 9 + 16 = 25 = 5². Since Pythagoras holds, it is a right triangle.', MEDIUM, 'Geometry & Trigonometry'),
    mcq('What is 15% of 240?', [{label:'A',value:'24',isCorrect:false},{label:'B',value:'36',isCorrect:true},{label:'C',value:'48',isCorrect:false},{label:'D',value:'30',isCorrect:false}], '15% × 240 = 0.15 × 240 = 36.', EASY, 'Number Theory & Computation'),
    mcq('The mode of the data set {3, 5, 5, 7, 8, 5, 9} is:', [{label:'A',value:'7',isCorrect:false},{label:'B',value:'3',isCorrect:false},{label:'C',value:'5',isCorrect:true},{label:'D',value:'8',isCorrect:false}], 'Mode is the most frequent value. 5 appears 3 times, more than any other number.', EASY, 'Statistics & Probability'),
    mcq('Factorize: x² - 9', [{label:'A',value:'(x+3)(x-3)',isCorrect:true},{label:'B',value:'(x+9)(x-1)',isCorrect:false},{label:'C',value:'(x-3)²',isCorrect:false},{label:'D',value:'(x+3)²',isCorrect:false}], 'This is a difference of two squares: x² - 3² = (x+3)(x-3).', MEDIUM, 'Algebra'),
    mcq('If f(x) = 2x - 1, what is f(4)?', [{label:'A',value:'7',isCorrect:true},{label:'B',value:'5',isCorrect:false},{label:'C',value:'9',isCorrect:false},{label:'D',value:'6',isCorrect:false}], 'f(4) = 2(4) - 1 = 8 - 1 = 7.', EASY, 'Relations & Functions'),
    mcq('Two cards are drawn from a standard deck. What is the probability both are aces?', [{label:'A',value:'1/169',isCorrect:false},{label:'B',value:'4/52 × 3/51 = 1/221',isCorrect:true},{label:'C',value:'1/52',isCorrect:false},{label:'D',value:'4/52 × 4/52 = 1/169',isCorrect:false}], 'P(first ace) = 4/52. Without replacement: P(second ace) = 3/51. P = 4/52 × 3/51 = 12/2652 = 1/221.', HARD, 'Statistics & Probability'),
  ],
  'CSEC-ENG': [
    mcq('Which of the following is a proper noun?', [{label:'A',value:'river',isCorrect:false},{label:'B',value:'Jamaica',isCorrect:true},{label:'C',value:'beautiful',isCorrect:false},{label:'D',value:'quickly',isCorrect:false}], 'A proper noun names a specific place, person, or thing and is capitalized. Jamaica is a proper noun.', EASY, 'Grammar & Mechanics'),
    mcq('Identify the subject in: "The dog barked loudly."', [{label:'A',value:'barked',isCorrect:false},{label:'B',value:'dog',isCorrect:true},{label:'C',value:'loudly',isCorrect:false},{label:'D',value:'The',isCorrect:false}], 'The subject is who or what performs the action. "The dog" is the complete subject; the simple subject is "dog".', EASY, 'Grammar & Mechanics'),
    mcq('Which sentence is in the passive voice?', [{label:'A',value:'She wrote the letter.',isCorrect:false},{label:'B',value:'The letter was written by her.',isCorrect:true},{label:'C',value:'He runs fast.',isCorrect:false},{label:'D',value:'They played football.',isCorrect:false}], 'Passive voice: the subject receives the action. "The letter was written by her" has the letter as subject receiving the writing action.', MEDIUM, 'Grammar & Mechanics'),
    mcq('What is the past participle of "go"?', [{label:'A',value:'went',isCorrect:false},{label:'B',value:'gone',isCorrect:true},{label:'C',value:'going',isCorrect:false},{label:'D',value:'goes',isCorrect:false}], 'The past participle of "go" is "gone". "Went" is the simple past form.', MEDIUM, 'Grammar & Mechanics'),
    mcq('Which word is a synonym for "happy"?', [{label:'A',value:'sorrowful',isCorrect:false},{label:'B',value:'joyful',isCorrect:true},{label:'C',value:'angry',isCorrect:false},{label:'D',value:'tired',isCorrect:false}], 'Synonyms are words with similar meanings. Joyful means the same as happy.', EASY, 'Grammar & Mechanics'),
    mcq('In the sentence "Although it rained, we went to the beach", what type of clause is "Although it rained"?', [{label:'A',value:'Independent clause',isCorrect:false},{label:'B',value:'Dependent clause',isCorrect:true},{label:'C',value:'Relative clause',isCorrect:false},{label:'D',value:'Noun clause',isCorrect:false}], '"Although it rained" is a dependent (subordinate) clause because it cannot stand alone and begins with a subordinating conjunction.', MEDIUM, 'Grammar & Mechanics'),
    mcq('Which of the following is an example of a metaphor?', [{label:'A',value:'She runs like the wind.',isCorrect:false},{label:'B',value:'The world is a stage.',isCorrect:true},{label:'C',value:'He is as brave as a lion.',isCorrect:false},{label:'D',value:'The water was cold as ice.',isCorrect:false}], 'A metaphor directly states one thing IS another. "The world is a stage" is a metaphor. The others are similes using "like" or "as".', MEDIUM, 'Comprehension'),
    mcq('A summary should:', [{label:'A',value:'Include your personal opinions',isCorrect:false},{label:'B',value:'Be longer than the original text',isCorrect:false},{label:'C',value:'Capture the main ideas concisely',isCorrect:true},{label:'D',value:'Copy exact sentences from the text',isCorrect:false}], 'A summary should condense the main ideas of a text without adding personal opinions or copying verbatim.', EASY, 'Summary Writing'),
    mcq('In a persuasive essay, which technique involves appealing to emotions?', [{label:'A',value:'Ethos',isCorrect:false},{label:'B',value:'Pathos',isCorrect:true},{label:'C',value:'Logos',isCorrect:false},{label:'D',value:'Kairos',isCorrect:false}], 'Pathos is the appeal to emotion. Ethos appeals to credibility, Logos to logic.', MEDIUM, 'Persuasive Writing'),
    mcq('What is the correct punctuation for the following: "I cant believe its already December"', [{label:'A',value:'I can\'t believe it\'s already December.',isCorrect:true},{label:'B',value:'I cant believe its already December.',isCorrect:false},{label:'C',value:'I can\'t believe its already December.',isCorrect:false},{label:'D',value:'I cant believe it\'s already December.',isCorrect:false}], 'Both contractions need apostrophes: "can\'t" (can not) and "it\'s" (it is).', EASY, 'Grammar & Mechanics'),
    mcq('Which literary device is used in: "The wind whispered through the trees"?', [{label:'A',value:'Simile',isCorrect:false},{label:'B',value:'Metaphor',isCorrect:false},{label:'C',value:'Personification',isCorrect:true},{label:'D',value:'Alliteration',isCorrect:false}], 'Personification gives human qualities (whispering) to non-human things (wind).', MEDIUM, 'Comprehension'),
    mcq('The prefix "un-" in "unhappy" means:', [{label:'A',value:'very',isCorrect:false},{label:'B',value:'not',isCorrect:true},{label:'C',value:'again',isCorrect:false},{label:'D',value:'before',isCorrect:false}], '"Un-" is a prefix meaning "not". So "unhappy" means "not happy".', EASY, 'Grammar & Mechanics'),
    mcq('Which sentence demonstrates correct subject-verb agreement?', [{label:'A',value:'The dogs runs in the park.',isCorrect:false},{label:'B',value:'The dog run in the park.',isCorrect:false},{label:'C',value:'The dogs run in the park.',isCorrect:true},{label:'D',value:'The dog runs in the parks.',isCorrect:false}], 'Plural subject "dogs" requires the plural verb "run".', EASY, 'Grammar & Mechanics'),
    mcq('What is the purpose of a thesis statement in an essay?', [{label:'A',value:'To provide a conclusion',isCorrect:false},{label:'B',value:'To state the main argument or position',isCorrect:true},{label:'C',value:'To list all the supporting points',isCorrect:false},{label:'D',value:'To introduce the author',isCorrect:false}], 'A thesis statement clearly states the main argument or position that the essay will support.', MEDIUM, 'Essay Writing'),
    mcq('Which of these sentences uses correct comma usage?', [{label:'A',value:'She bought apples, bananas, and oranges.',isCorrect:true},{label:'B',value:'She bought apples bananas and oranges.',isCorrect:false},{label:'C',value:'She bought, apples, bananas and oranges.',isCorrect:false},{label:'D',value:'She bought apples, bananas and oranges.',isCorrect:false}], 'In a list, use commas to separate items, including before "and" (Oxford comma).', MEDIUM, 'Grammar & Mechanics'),
  ],
  'CSEC-BIO': [
    mcq('What is the basic unit of life?', [{label:'A',value:'Atom',isCorrect:false},{label:'B',value:'Cell',isCorrect:true},{label:'C',value:'Organ',isCorrect:false},{label:'D',value:'Tissue',isCorrect:false}], 'The cell is the basic structural and functional unit of all living organisms.', EASY, 'Cell Biology'),
    mcq('Which organelle is known as the "powerhouse of the cell"?', [{label:'A',value:'Nucleus',isCorrect:false},{label:'B',value:'Ribosome',isCorrect:false},{label:'C',value:'Mitochondria',isCorrect:true},{label:'D',value:'Golgi body',isCorrect:false}], 'Mitochondria produce ATP through cellular respiration, earning the name "powerhouse of the cell".', EASY, 'Cell Biology'),
    mcq('What process do plants use to make their own food?', [{label:'A',value:'Respiration',isCorrect:false},{label:'B',value:'Photosynthesis',isCorrect:true},{label:'C',value:'Fermentation',isCorrect:false},{label:'D',value:'Digestion',isCorrect:false}], 'Photosynthesis converts light energy, CO₂, and water into glucose and oxygen.', EASY, 'Plant Biology'),
    mcq('What is the chemical equation for photosynthesis?', [{label:'A',value:'C₆H₁₂O₆ + O₂ → CO₂ + H₂O',isCorrect:false},{label:'B',value:'6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',isCorrect:true},{label:'C',value:'CO₂ + H₂O → C₂H₅OH + O₂',isCorrect:false},{label:'D',value:'2CO₂ + 2H₂O → C₆H₁₂O₆ + 2O₂',isCorrect:false}], '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ is the balanced equation for photosynthesis.', MEDIUM, 'Plant Biology'),
    mcq('DNA stands for:', [{label:'A',value:'Deoxyribonucleic Acid',isCorrect:true},{label:'B',value:'Dinitrogen Acid',isCorrect:false},{label:'C',value:'Deoxyribose Acid',isCorrect:false},{label:'D',value:'Dinucleotide Acid',isCorrect:false}], 'DNA = Deoxyribonucleic Acid, the molecule that carries genetic instructions.', EASY, 'Genetics & Heredity'),
    mcq('In humans, how many chromosomes are in a normal body cell?', [{label:'A',value:'23',isCorrect:false},{label:'B',value:'44',isCorrect:false},{label:'C',value:'46',isCorrect:true},{label:'D',value:'48',isCorrect:false}], 'Human body cells (somatic cells) have 46 chromosomes (23 pairs). Gametes have 23.', MEDIUM, 'Genetics & Heredity'),
    mcq('Which blood type is considered the universal donor?', [{label:'A',value:'A',isCorrect:false},{label:'B',value:'B',isCorrect:false},{label:'C',value:'AB',isCorrect:false},{label:'D',value:'O',isCorrect:true}], 'Blood type O is the universal donor because it has neither A nor B antigens on red blood cells.', MEDIUM, 'Human Physiology'),
    mcq('What is the function of red blood cells?', [{label:'A',value:'To fight infection',isCorrect:false},{label:'B',value:'To carry oxygen',isCorrect:true},{label:'C',value:'To help blood clot',isCorrect:false},{label:'D',value:'To produce antibodies',isCorrect:false}], 'Red blood cells contain haemoglobin which binds to oxygen and transports it throughout the body.', EASY, 'Human Physiology'),
    mcq('Which of the following is an example of a food chain?', [{label:'A',value:'Grass → Grasshopper → Frog → Snake',isCorrect:true},{label:'B',value:'Grass + Tree + Flower',isCorrect:false},{label:'C',value:'Frog → Grasshopper → Grass → Snake',isCorrect:false},{label:'D',value:'Snake + Frog + Grasshopper',isCorrect:false}], 'A food chain shows energy flow: producers → primary consumers → secondary consumers → tertiary consumers.', EASY, 'Ecology'),
    mcq('What term describes the maximum population size an environment can support?', [{label:'A',value:'Biotic potential',isCorrect:false},{label:'B',value:'Carrying capacity',isCorrect:true},{label:'C',value:'Population density',isCorrect:false},{label:'D',value:'Limiting factor',isCorrect:false}], 'Carrying capacity (K) is the maximum number of individuals an environment can sustainably support.', MEDIUM, 'Ecology'),
    mcq('Which part of the brain controls breathing and heart rate?', [{label:'A',value:'Cerebrum',isCorrect:false},{label:'B',value:'Cerebellum',isCorrect:false},{label:'C',value:'Medulla oblongata',isCorrect:true},{label:'D',value:'Hypothalamus',isCorrect:false}], 'The medulla oblongata in the brainstem controls involuntary functions like breathing, heart rate, and blood pressure.', MEDIUM, 'Human Physiology'),
    mcq('What is natural selection?', [{label:'A',value:'Random changes in DNA',isCorrect:false},{label:'B',value:'Survival and reproduction of organisms best adapted to their environment',isCorrect:true},{label:'C',value:'Choice of mates by organisms',isCorrect:false},{label:'D',value:'Movement of organisms to new habitats',isCorrect:false}], 'Natural selection is Darwin\'s mechanism where organisms with favorable traits are more likely to survive and reproduce.', MEDIUM, 'Evolution'),
    mcq('In a Punnett square, what does heterozygous mean?', [{label:'A',value:'Two identical alleles (e.g., BB)',isCorrect:false},{label:'B',value:'Two different alleles (e.g., Bb)',isCorrect:true},{label:'C',value:'No dominant allele present',isCorrect:false},{label:'D',value:'Only recessive alleles present',isCorrect:false}], 'Heterozygous means having two different alleles for a gene (e.g., Bb). Homozygous means having two identical alleles.', MEDIUM, 'Genetics & Heredity'),
    mcq('What is the role of enzymes in biological reactions?', [{label:'A',value:'They are consumed in the reaction',isCorrect:false},{label:'B',value:'They speed up reactions without being consumed',isCorrect:true},{label:'C',value:'They slow down reactions',isCorrect:false},{label:'D',value:'They change the products of a reaction',isCorrect:false}], 'Enzymes are biological catalysts that speed up reactions by lowering activation energy. They are not consumed.', MEDIUM, 'Cell Biology'),
    mcq('Which type of organism makes its own food?', [{label:'A',value:'Consumer',isCorrect:false},{label:'B',value:'Decomposer',isCorrect:false},{label:'C',value:'Producer (Autotroph)',isCorrect:true},{label:'D',value:'Parasite',isCorrect:false}], 'Producers (autotrophs) like plants make their own food through photosynthesis. Consumers rely on others.', EASY, 'Ecology'),
  ],
  'CSEC-CHEM': [
    mcq('What is the atomic number of carbon?', [{label:'A',value:'4',isCorrect:false},{label:'B',value:'6',isCorrect:true},{label:'C',value:'8',isCorrect:false},{label:'D',value:'12',isCorrect:false}], 'Carbon has 6 protons in its nucleus, so its atomic number is 6.', EASY, 'Atomic Structure'),
    mcq('What are the three subatomic particles in an atom?', [{label:'A',value:'Proton, neutron, electron',isCorrect:true},{label:'B',value:'Proton, neutron, ion',isCorrect:false},{label:'C',value:'Electron, ion, isotope',isCorrect:false},{label:'D',value:'Molecule, compound, element',isCorrect:false}], 'Atoms consist of protons (positive), neutrons (neutral), and electrons (negative).', EASY, 'Atomic Structure'),
    mcq('What type of bond involves the sharing of electrons?', [{label:'A',value:'Ionic bond',isCorrect:false},{label:'B',value:'Covalent bond',isCorrect:true},{label:'C',value:'Metallic bond',isCorrect:false},{label:'D',value:'Hydrogen bond',isCorrect:false}], 'Covalent bonds involve sharing electron pairs between atoms.', EASY, 'Chemical Bonding'),
    mcq('What is the pH of a neutral solution?', [{label:'A',value:'0',isCorrect:false},{label:'B',value:'7',isCorrect:true},{label:'C',value:'14',isCorrect:false},{label:'D',value:'1',isCorrect:false}], 'A pH of 7 is neutral. Below 7 is acidic, above 7 is alkaline.', EASY, 'Acids, Bases & Salts'),
    mcq('What is the chemical formula for water?', [{label:'A',value:'HO₂',isCorrect:false},{label:'B',value:'H₂O',isCorrect:true},{label:'C',value:'H₂O₂',isCorrect:false},{label:'D',value:'OH',isCorrect:false}], 'Water = H₂O, two hydrogen atoms bonded to one oxygen atom.', EASY, 'Atomic Structure'),
    mcq('What happens in an exothermic reaction?', [{label:'A',value:'Heat is absorbed',isCorrect:false},{label:'B',value:'Heat is released',isCorrect:true},{label:'C',value:'No heat change occurs',isCorrect:false},{label:'D',value:'Light is absorbed',isCorrect:false}], 'Exothermic reactions release energy (usually as heat) to the surroundings. Endothermic reactions absorb energy.', MEDIUM, 'Chemical Bonding'),
    mcq('What is the molar mass of water (H₂O)? (H=1, O=16)', [{label:'A',value:'16',isCorrect:false},{label:'B',value:'17',isCorrect:false},{label:'C',value:'18',isCorrect:true},{label:'D',value:'20',isCorrect:false}], 'Molar mass = 2(1) + 16 = 18 g/mol.', MEDIUM, 'Stoichiometry'),
    mcq('What is an isotope?', [{label:'A',value:'Atoms of different elements with same mass',isCorrect:false},{label:'B',value:'Atoms of the same element with different numbers of neutrons',isCorrect:true},{label:'C',value:'Atoms that have lost electrons',isCorrect:false},{label:'D',value:'Molecules with the same formula',isCorrect:false}], 'Isotopes are atoms of the same element (same proton number) but different numbers of neutrons.', MEDIUM, 'Atomic Structure'),
    mcq('What type of reaction is: 2Na + Cl₂ → 2NaCl?', [{label:'A',value:'Decomposition',isCorrect:false},{label:'B',value:'Synthesis/Combination',isCorrect:true},{label:'C',value:'Single replacement',isCorrect:false},{label:'D',value:'Double replacement',isCorrect:false}], 'Two elements combine to form one compound — this is a synthesis (combination) reaction.', MEDIUM, 'Chemical Bonding'),
    mcq('What is the general formula for alkanes?', [{label:'A',value:'CₙH₂ₙ',isCorrect:false},{label:'B',value:'CₙH₂ₙ₊₂',isCorrect:true},{label:'C',value:'CₙH₂ₙ₋₂',isCorrect:false},{label:'D',value:'CₙHₙ',isCorrect:false}], 'Alkanes have single bonds only: general formula CₙH₂ₙ₊₂. Methane = CH₄, Ethane = C₂H₆.', MEDIUM, 'Organic Chemistry'),
    mcq('Which gas is produced when an acid reacts with a metal?', [{label:'A',value:'Oxygen',isCorrect:false},{label:'B',value:'Carbon dioxide',isCorrect:false},{label:'C',value:'Hydrogen',isCorrect:true},{label:'D',value:'Nitrogen',isCorrect:false}], 'Acid + Metal → Salt + Hydrogen gas. E.g., Zn + 2HCl → ZnCl₂ + H₂.', MEDIUM, 'Acids, Bases & Salts'),
    mcq('What is Avogadro\'s number?', [{label:'A',value:'6.022 × 10²³',isCorrect:true},{label:'B',value:'3.14 × 10²³',isCorrect:false},{label:'C',value:'6.022 × 10²⁰',isCorrect:false},{label:'D',value:'1.602 × 10¹⁹',isCorrect:false}], 'Avogadro\'s number (6.022 × 10²³) is the number of particles in one mole of a substance.', MEDIUM, 'Stoichiometry'),
    mcq('What type of bonding is present in sodium chloride (NaCl)?', [{label:'A',value:'Covalent',isCorrect:false},{label:'B',value:'Ionic',isCorrect:true},{label:'C',value:'Metallic',isCorrect:false},{label:'D',value:'Hydrogen',isCorrect:false}], 'NaCl forms ionic bonds where sodium transfers an electron to chlorine, creating Na⁺ and Cl⁻ ions.', MEDIUM, 'Chemical Bonding'),
    mcq('What is the first member of the alkene series?', [{label:'A',value:'Methane',isCorrect:false},{label:'B',value:'Ethene',isCorrect:true},{label:'C',value:'Propene',isCorrect:false},{label:'D',value:'Butene',isCorrect:false}], 'The simplest alkene is ethene (C₂H₄). Methane is an alkane, not an alkene.', MEDIUM, 'Organic Chemistry'),
    mcq('In the Haber process, what gases are combined to make ammonia?', [{label:'A',value:'Nitrogen and oxygen',isCorrect:false},{label:'B',value:'Nitrogen and hydrogen',isCorrect:true},{label:'C',value:'Oxygen and hydrogen',isCorrect:false},{label:'D',value:'Carbon and nitrogen',isCorrect:false}], 'N₂ + 3H₂ → 2NH₃. The Haber process combines nitrogen and hydrogen to produce ammonia.', HARD, 'Industrial Chemistry'),
  ],
  'CSEC-PHYS': [
    mcq('What is the SI unit of force?', [{label:'A',value:'Joule',isCorrect:false},{label:'B',value:'Newton',isCorrect:true},{label:'C',value:'Watt',isCorrect:false},{label:'D',value:'Pascal',isCorrect:false}], 'Force is measured in Newtons (N). F = ma.', EASY, 'Mechanics'),
    mcq('What is the acceleration due to gravity on Earth?', [{label:'A',value:'8.9 m/s²',isCorrect:false},{label:'B',value:'10.8 m/s²',isCorrect:false},{label:'C',value:'9.8 m/s²',isCorrect:true},{label:'D',value:'11.2 m/s²',isCorrect:false}], 'Standard value: g ≈ 9.8 m/s² (often approximated as 10 m/s² in calculations).', EASY, 'Mechanics'),
    mcq('A car travels 100 km in 2 hours. What is its average speed?', [{label:'A',value:'25 km/h',isCorrect:false},{label:'B',value:'50 km/h',isCorrect:true},{label:'C',value:'100 km/h',isCorrect:false},{label:'D',value:'200 km/h',isCorrect:false}], 'Speed = Distance/Time = 100/2 = 50 km/h.', EASY, 'Mechanics'),
    mcq('What is Newton\'s Second Law of Motion?', [{label:'A',value:'Every action has an equal and opposite reaction',isCorrect:false},{label:'B',value:'F = ma',isCorrect:true},{label:'C',value:'An object at rest stays at rest',isCorrect:false},{label:'D',value:'Energy cannot be created or destroyed',isCorrect:false}], 'Newton\'s Second Law: Force = mass × acceleration (F = ma).', EASY, 'Mechanics'),
    mcq('What is the SI unit of electrical resistance?', [{label:'A',value:'Volt',isCorrect:false},{label:'B',value:'Ampere',isCorrect:false},{label:'C',value:'Ohm',isCorrect:true},{label:'D',value:'Watt',isCorrect:false}], 'Resistance is measured in Ohms (Ω). Ohm\'s Law: V = IR.', EASY, 'Electricity & Magnetism'),
    mcq('What is the formula for kinetic energy?', [{label:'A',value:'KE = mgh',isCorrect:false},{label:'B',value:'KE = ½mv²',isCorrect:true},{label:'C',value:'KE = Fd',isCorrect:false},{label:'D',value:'KE = mc²',isCorrect:false}], 'Kinetic Energy = ½mv² where m is mass and v is velocity.', MEDIUM, 'Mechanics'),
    mcq('Which type of wave requires a medium to travel?', [{label:'A',value:'Light wave',isCorrect:false},{label:'B',value:'Radio wave',isCorrect:false},{label:'C',value:'Sound wave',isCorrect:true},{label:'D',value:'X-ray',isCorrect:false}], 'Sound waves are mechanical/longitudinal waves that need a medium (solid, liquid, or gas). Electromagnetic waves do not.', MEDIUM, 'Waves & Optics'),
    mcq('What is the speed of light in a vacuum (approximately)?', [{label:'A',value:'3 × 10⁶ m/s',isCorrect:false},{label:'B',value:'3 × 10⁸ m/s',isCorrect:true},{label:'C',value:'3 × 10¹⁰ m/s',isCorrect:false},{label:'D',value:'3 × 10⁴ m/s',isCorrect:false}], 'Speed of light in vacuum: c ≈ 3 × 10⁸ m/s (or 300,000 km/s).', MEDIUM, 'Waves & Optics'),
    mcq('What is Ohm\'s Law?', [{label:'A',value:'V = IR',isCorrect:true},{label:'B',value:'P = IV',isCorrect:false},{label:'C',value:'E = mc²',isCorrect:false},{label:'D',value:'F = ma',isCorrect:false}], 'Ohm\'s Law: V = IR, where V is voltage, I is current, and R is resistance.', EASY, 'Electricity & Magnetism'),
    mcq('What happens to the resistance of a conductor when temperature increases?', [{label:'A',value:'It decreases',isCorrect:false},{label:'B',value:'It increases',isCorrect:true},{label:'C',value:'It stays the same',isCorrect:false},{label:'D',value:'It becomes zero',isCorrect:false}], 'In conductors, increasing temperature increases atomic vibrations, which increases resistance.', MEDIUM, 'Electricity & Magnetism'),
    mcq('The law of conservation of energy states:', [{label:'A',value:'Energy can be created but not destroyed',isCorrect:false},{label:'B',value:'Energy cannot be created or destroyed, only transformed',isCorrect:true},{label:'C',value:'Energy is always increasing',isCorrect:false},{label:'D',value:'Energy is always decreasing',isCorrect:false}], 'The first law of thermodynamics: energy cannot be created or destroyed, only converted from one form to another.', EASY, 'Mechanics'),
    mcq('A lens that is thicker at the center than at the edges is called:', [{label:'A',value:'Concave lens',isCorrect:false},{label:'B',value:'Convex lens',isCorrect:true},{label:'C',value:'Plane lens',isCorrect:false},{label:'D',value:'Diverging lens',isCorrect:false}], 'A convex (converging) lens is thicker in the center and converges light rays.', MEDIUM, 'Waves & Optics'),
    mcq('What is the unit of electrical power?', [{label:'A',value:'Volt',isCorrect:false},{label:'B',value:'Ampere',isCorrect:false},{label:'C',value:'Watt',isCorrect:true},{label:'D',value:'Ohm',isCorrect:false}], 'Power = Energy/Time. Electrical power is measured in Watts (W). P = IV.', EASY, 'Electricity & Magnetism'),
    mcq('What is specific heat capacity?', [{label:'A',value:'The total heat in an object',isCorrect:false},{label:'B',value:'Energy needed to raise 1 kg of a substance by 1°C',isCorrect:true},{label:'C',value:'The boiling point of water',isCorrect:false},{label:'D',value:'Energy needed to melt a substance',isCorrect:false}], 'Specific heat capacity = energy required to raise the temperature of 1 kg of a substance by 1°C.', MEDIUM, 'Thermal Physics'),
  ],
  'CSEC-HIST': [
    mcq('Who were the first inhabitants of the Caribbean?', [{label:'A',value:'Europeans',isCorrect:false},{label:'B',value:'Africans',isCorrect:false},{label:'C',value:'The Indigenous Peoples (Tainos, Kalinago, Maya)',isCorrect:true},{label:'D',value:'Asians',isCorrect:false}], 'The Tainos (Arawaks), Kalinago (Caribs), and Maya were the first known inhabitants of the Caribbean.', EASY, 'The Indigenous Peoples'),
    mcq('Which European explorer is credited with "discovering" the Caribbean in 1492?', [{label:'A',value:'Vasco da Gama',isCorrect:false},{label:'B',value:'Christopher Columbus',isCorrect:true},{label:'C',value:'Ferdinand Magellan',isCorrect:false},{label:'D',value:'Amerigo Vespucci',isCorrect:false}], 'Christopher Columbus arrived in the Bahamas on October 12, 1492, beginning European contact with the Caribbean.', EASY, 'European Settlement'),
    mcq('What was the main purpose of the Encomienda system?', [{label:'A',value:'To provide education',isCorrect:false},{label:'B',value:'To force Indigenous people to work for Spanish colonizers',isCorrect:true},{label:'C',value:'To promote trade',isCorrect:false},{label:'D',value:'To protect Indigenous peoples',isCorrect:false}], 'The Encomienda system granted Spanish settlers the right to extract labor from Indigenous peoples in exchange for "protection" and Christianization.', MEDIUM, 'European Settlement'),
    mcq('What was the Triangular Trade?', [{label:'A',value:'Trade within the Caribbean islands',isCorrect:false},{label:'B',value:'Trade route connecting Europe, Africa, and the Americas involving slaves, goods, and raw materials',isCorrect:true},{label:'C',value:'Trade of agricultural products only',isCorrect:false},{label:'D',value:'Trade between Asia and the Caribbean',isCorrect:false}], 'The Triangular Trade involved shipping manufactured goods from Europe to Africa, enslaved people from Africa to the Americas, and raw materials from the Americas to Europe.', MEDIUM, 'Slavery & Resistance'),
    mcq('Which country was the first Caribbean colony to gain independence from Britain?', [{label:'A',value:'Jamaica',isCorrect:false},{label:'B',value:'Trinidad & Tobago',isCorrect:false},{label:'C',value:'Barbados',isCorrect:false},{label:'D',value:'None of the above',isCorrect:true}], 'Jamaica and Trinidad & Tobago both gained independence in 1962. Jamaica was first (August 6, 1962). Barbados gained independence in 1966.', HARD, 'Independence Movements'),
    mcq('Who led the Haitian Revolution?', [{label:'A',value:'Marcus Garvey',isCorrect:false},{label:'B',value:'Toussaint Louverture',isCorrect:true},{label:'C',value:'Simon Bolivar',isCorrect:false},{label:'D',value:'Cudjoe',isCorrect:false}], 'Toussaint Louverture led the Haitian Revolution (1791-1804), resulting in the first successful slave revolt and independent Black republic.', MEDIUM, 'Slavery & Resistance'),
    mcq('What was the main crop grown on Caribbean sugar plantations?', [{label:'A',value:'Coffee',isCorrect:false},{label:'B',value:'Sugar cane',isCorrect:true},{label:'C',value:'Cotton',isCorrect:false},{label:'D',value:'Tobacco',isCorrect:false}], 'Sugar cane was the dominant cash crop, driving the plantation economy and the demand for enslaved labor.', EASY, 'Slavery & Resistance'),
    mcq('The abolition of the slave trade in the British Empire occurred in:', [{label:'A',value:'1807',isCorrect:true},{label:'B',value:'1833',isCorrect:false},{label:'C',value:'1838',isCorrect:false},{label:'D',value:'1865',isCorrect:false}], 'The Slave Trade Act of 1807 abolished the transatlantic slave trade. Slavery itself was abolished in 1833 (effective 1834, full emancipation 1838).', MEDIUM, 'Emancipation'),
    mcq('What was "Merikin" in Trinidadian history?', [{label:'A',value:'A type of music',isCorrect:false},{label:'B',value:'Former African-American enslaved people who settled in Trinidad after the War of 1812',isCorrect:true},{label:'C',value:'A Caribbean dish',isCorrect:false},{label:'D',value:'A political party',isCorrect:false}], 'The Merikins were freed African-Americans who fought for the British in the War of 1812 and were settled in Trinidad in 1815-1816.', HARD, 'Emancipation'),
    mcq('What was the significance of the Morant Bay Rebellion (1865)?', [{label:'A',value:'It led to immediate independence for Jamaica',isCorrect:false},{label:'B',value:'It highlighted the poor conditions of freed people and led to constitutional reform',isCorrect:true},{label:'C',value:'It was a successful slave revolt',isCorrect:false},{label:'D',value:'It established trade unions',isCorrect:false}], 'Led by Paul Bogle, the Morant Bay Rebellion protested injustice against freed people. It resulted in Governor Eyre\'s brutal response and led to reforms in colonial governance.', MEDIUM, 'Emancipation'),
    mcq('CARICOM stands for:', [{label:'A',value:'Caribbean Community',isCorrect:true},{label:'B',value:'Caribbean Common Market',isCorrect:false},{label:'C',value:'Caribbean Cooperation Organization',isCorrect:false},{label:'D',value:'Caribbean Union of States',isCorrect:false}], 'CARICOM (Caribbean Community) was established in 1973 to promote economic integration and cooperation among Caribbean nations.', EASY, 'Independence Movements'),
    mcq('Who was the first Prime Minister of independent Jamaica?', [{label:'A',value:'Norman Manley',isCorrect:false},{label:'B',value:'Alexander Bustamante',isCorrect:true},{label:'C',value:'Michael Manley',isCorrect:false},{label:'D',value:'Edward Seaga',isCorrect:false}], 'Sir Alexander Bustamante became Jamaica\'s first Prime Minister upon independence on August 6, 1962.', MEDIUM, 'Independence Movements'),
  ],
  'CSEC-GEOG': [
    mcq('What is the name of the line of latitude at 0°?', [{label:'A',value:'Tropic of Cancer',isCorrect:false},{label:'B',value:'Equator',isCorrect:true},{label:'C',value:'Tropic of Capricorn',isCorrect:false},{label:'D',value:'Prime Meridian',isCorrect:false}], 'The Equator is at 0° latitude, dividing the Earth into Northern and Southern hemispheres.', EASY, 'Map Reading'),
    mcq('What type of rock is formed from cooled lava?', [{label:'A',value:'Sedimentary',isCorrect:false},{label:'B',value:'Metamorphic',isCorrect:false},{label:'C',value:'Igneous',isCorrect:true},{label:'D',value:'Fossiliferous',isCorrect:false}], 'Igneous rocks form from the cooling and solidification of magma or lava. Examples: basalt, granite.', EASY, 'Plate Tectonics'),
    mcq('What is the scale 1:50,000 on a map?', [{label:'A',value:'1 cm on the map = 50,000 cm (500 m) on the ground',isCorrect:true},{label:'B',value:'1 cm on the map = 50 cm on the ground',isCorrect:false},{label:'C',value:'1 cm on the map = 5,000 cm on the ground',isCorrect:false},{label:'D',value:'1 cm on the map = 50,000 km on the ground',isCorrect:false}], '1:50,000 means 1 unit on the map equals 50,000 of the same units on the ground. So 1 cm = 50,000 cm = 500 m.', MEDIUM, 'Map Reading'),
    mcq('What type of climate does most of the Caribbean have?', [{label:'A',value:'Desert climate',isCorrect:false},{label:'B',value:'Tropical maritime climate',isCorrect:true},{label:'C',value:'Temperate climate',isCorrect:false},{label:'D',value:'Polar climate',isCorrect:false}], 'Most Caribbean islands have a tropical maritime climate with warm temperatures, high humidity, and distinct wet/dry seasons.', EASY, 'Climate & Weather'),
    mcq('What causes earthquakes in the Caribbean?', [{label:'A',value:'Volcanic eruptions only',isCorrect:false},{label:'B',value:'Movement of tectonic plates along fault lines',isCorrect:true},{label:'C',value:'Heavy rainfall',isCorrect:false},{label:'D',value:'Ocean currents',isCorrect:false}], 'The Caribbean sits on plate boundaries (Caribbean Plate, North American Plate, South American Plate). Their movement causes earthquakes.', MEDIUM, 'Plate Tectonics'),
    mcq('What is contour spacing on a topographic map that is close together indicates?', [{label:'A',value:'Flat land',isCorrect:false},{label:'B',value:'Steep slope',isCorrect:true},{label:'C',value:'River',isCorrect:false},{label:'D',value:'Depression',isCorrect:false}], 'Closely spaced contour lines indicate a steep slope. Widely spaced lines indicate a gentle slope.', MEDIUM, 'Map Reading'),
    mcq('What is the most important economic activity in many Caribbean countries?', [{label:'A',value:'Manufacturing',isCorrect:false},{label:'B',value:'Tourism',isCorrect:true},{label:'C',value:'Mining',isCorrect:false},{label:'D',value:'Fishing',isCorrect:false}], 'Tourism is the leading economic sector in most Caribbean nations, contributing significantly to GDP and employment.', EASY, 'Economic Activities'),
    mcq('Which layer of the Earth is liquid?', [{label:'A',value:'Crust',isCorrect:false},{label:'B',value:'Mantle',isCorrect:false},{label:'C',value:'Outer core',isCorrect:true},{label:'D',value:'Inner core',isCorrect:false}], 'The outer core is liquid (mostly iron and nickel). The inner core is solid despite higher temperatures.', MEDIUM, 'Plate Tectonics'),
    mcq('What is population density?', [{label:'A',value:'Total number of people in a country',isCorrect:false},{label:'B',value:'Number of people per unit area',isCorrect:true},{label:'C',value:'Birth rate minus death rate',isCorrect:false},{label:'D',value:'Number of people moving to a country',isCorrect:false}], 'Population density = total population ÷ total land area (usually people per km²).', EASY, 'Population Geography'),
    mcq('What is the Caribbean Plate?', [{label:'A',value:'A type of food',isCorrect:false},{label:'B',value:'A minor tectonic plate underlying the Caribbean region',isCorrect:true},{label:'C',value:'A continental shelf',isCorrect:false},{label:'D',value:'A type of map',isCorrect:false}], 'The Caribbean Plate is a tectonic plate beneath Central America and the Caribbean Sea, interacting with neighboring plates.', MEDIUM, 'Plate Tectonics'),
    mcq('What is deforestation?', [{label:'A',value:'Planting new forests',isCorrect:false},{label:'B',value:'Clearing of forests for other land uses',isCorrect:true},{label:'C',value:'Managing forest resources',isCorrect:false},{label:'D',value:'Protecting forests from fire',isCorrect:false}], 'Deforestation is the large-scale removal of forest cover, often for agriculture, logging, or urban development.', EASY, 'Caribbean Environment'),
    mcq('Which ocean surrounds the Caribbean islands?', [{label:'A',value:'Pacific Ocean',isCorrect:false},{label:'B',value:'Indian Ocean',isCorrect:false},{label:'C',value:'Atlantic Ocean / Caribbean Sea',isCorrect:true},{label:'D',value:'Arctic Ocean',isCorrect:false}], 'The Caribbean islands are surrounded by the Atlantic Ocean to the east and the Caribbean Sea to the west.', EASY, 'Caribbean Environment'),
  ],
  'CAPE-PURE1': [
    mcq('What is the domain of f(x) = 1/(x-2)?', [{label:'A',value:'All real numbers',isCorrect:false},{label:'B',value:'x ≠ 2',isCorrect:true},{label:'C',value:'x > 2',isCorrect:false},{label:'D',value:'x < 2',isCorrect:false}], 'The function is undefined when x - 2 = 0, so x ≠ 2. Domain is all real numbers except 2.', EASY, 'Functions & Relations'),
    mcq('What is the derivative of f(x) = x³?', [{label:'A',value:'3x',isCorrect:false},{label:'B',value:'3x²',isCorrect:true},{label:'C',value:'x²',isCorrect:false},{label:'D',value:'3x⁴',isCorrect:false}], 'Using the power rule: d/dx(xⁿ) = nxⁿ⁻¹, so d/dx(x³) = 3x².', MEDIUM, 'Calculus (Differentiation)'),
    mcq('What is ∫2x dx?', [{label:'A',value:'x² + C',isCorrect:true},{label:'B',value:'2x² + C',isCorrect:false},{label:'C',value:'x + C',isCorrect:false},{label:'D',value:'2 + C',isCorrect:false}], '∫2x dx = 2 × (x²/2) + C = x² + C.', MEDIUM, 'Calculus (Integration)'),
    mcq('Evaluate: lim(x→0) sin(x)/x', [{label:'A',value:'0',isCorrect:false},{label:'B',value:'1',isCorrect:true},{label:'C',value:'∞',isCorrect:false},{label:'D',value:'undefined',isCorrect:false}], 'This is a standard limit. lim(x→0) sin(x)/x = 1.', MEDIUM, 'Calculus (Limits)'),
    mcq('What is the period of y = 3sin(2x)?', [{label:'A',value:'π',isCorrect:true},{label:'B',value:'2π',isCorrect:false},{label:'C',value:'π/2',isCorrect:false},{label:'D',value:'3π',isCorrect:false}], 'Period = 2π/|b| = 2π/2 = π for y = a·sin(bx).', MEDIUM, 'Trigonometry & Circular Measure'),
    mcq('What is the sum of the infinite geometric series: 1 + 1/2 + 1/4 + 1/8 + ... ?', [{label:'A',value:'1',isCorrect:false},{label:'B',value:'3/2',isCorrect:false},{label:'C',value:'2',isCorrect:true},{label:'D',value:'∞',isCorrect:false}], 'S∞ = a/(1-r) = 1/(1-1/2) = 1/(1/2) = 2.', MEDIUM, 'Sequences & Series'),
    mcq('What is d/dx(ln x)?', [{label:'A',value:'1/x',isCorrect:true},{label:'B',value:'ln x',isCorrect:false},{label:'C',value:'x',isCorrect:false},{label:'D',value:'e^x',isCorrect:false}], 'The derivative of ln(x) is 1/x.', MEDIUM, 'Calculus (Differentiation)'),
    mcq('If f(x) = 2x² - 3x + 1, what is f\'(2)?', [{label:'A',value:'5',isCorrect:true},{label:'B',value:'8',isCorrect:false},{label:'C',value:'7',isCorrect:false},{label:'D',value:'3',isCorrect:false}], 'f\'(x) = 4x - 3. f\'(2) = 8 - 3 = 5.', MEDIUM, 'Calculus (Differentiation)'),
    mcq('What is the inverse function of f(x) = 2x + 3?', [{label:'A',value:'f⁻¹(x) = (x-3)/2',isCorrect:true},{label:'B',value:'f⁻¹(x) = 2x - 3',isCorrect:false},{label:'C',value:'f⁻¹(x) = (x+3)/2',isCorrect:false},{label:'D',value:'f⁻¹(x) = x/2 + 3',isCorrect:false}], 'y = 2x + 3 → x = (y-3)/2 → f⁻¹(x) = (x-3)/2.', MEDIUM, 'Functions & Relations'),
    mcq('What is the derivative of eˣ?', [{label:'A',value:'xeˣ⁻¹',isCorrect:false},{label:'B',value:'eˣ',isCorrect:true},{label:'C',value:'eˣ⁺¹',isCorrect:false},{label:'D',value:'1/x',isCorrect:false}], 'The exponential function eˣ is its own derivative: d/dx(eˣ) = eˣ.', EASY, 'Calculus (Differentiation)'),
    mcq('What is cos²θ + sin²θ equal to?', [{label:'A',value:'0',isCorrect:false},{label:'B',value:'1',isCorrect:true},{label:'C',value:'2',isCorrect:false},{label:'D',value:'tan θ',isCorrect:false}], 'cos²θ + sin²θ = 1 is the fundamental Pythagorean identity.', EASY, 'Trigonometry & Circular Measure'),
    mcq('What is the integral of 1/x?', [{label:'A',value:'x² + C',isCorrect:false},{label:'B',value:'ln|x| + C',isCorrect:true},{label:'C',value:'1/x² + C',isCorrect:false},{label:'D',value:'eˣ + C',isCorrect:false}], '∫(1/x) dx = ln|x| + C.', MEDIUM, 'Calculus (Integration)'),
    mcq('If a sequence has a common ratio of 3 and the first term is 2, what is the 4th term?', [{label:'A',value:'24',isCorrect:false},{label:'B',value:'54',isCorrect:true},{label:'C',value:'18',isCorrect:false},{label:'D',value:'162',isCorrect:false}], 'GP: a₄ = ar³ = 2(3³) = 2(27) = 54.', MEDIUM, 'Sequences & Series'),
    mcq('What is lim(x→∞) (3x² + x)/(x² - 1)?', [{label:'A',value:'3',isCorrect:true},{label:'B',value:'∞',isCorrect:false},{label:'C',value:'0',isCorrect:false},{label:'D',value:'1',isCorrect:false}], 'Divide numerator and denominator by x²: (3 + 1/x)/(1 - 1/x²) → 3/1 = 3.', HARD, 'Calculus (Limits)'),
  ],
  'CAPE-CS': [
    mcq('What does CARICOM stand for?', [{label:'A',value:'Caribbean Community',isCorrect:true},{label:'B',value:'Caribbean Commonwealth',isCorrect:false},{label:'C',value:'Caribbean Cooperation Republic',isCorrect:false},{label:'D',value:'Caribbean Coalition',isCorrect:false}], 'CARICOM = Caribbean Community, established by the Treaty of Chaguaramas in 1973.', EASY, 'Regional Integration'),
    mcq('Which treaty established CARICOM?', [{label:'A',value:'Treaty of Paris',isCorrect:false},{label:'B',value:'Treaty of Chaguaramas',isCorrect:true},{label:'C',value:'Treaty of Versailles',isCorrect:false},{label:'D',value:'Treaty of Rome',isCorrect:false}], 'The Treaty of Chaguaramas was signed in 1973, establishing the Caribbean Community (CARICOM).', MEDIUM, 'Regional Integration'),
    mcq('What is cultural hybridization?', [{label:'A',value:'Complete replacement of one culture by another',isCorrect:false},{label:'B',value:'The blending of different cultural elements to create new forms',isCorrect:true},{label:'C',value:'Preserving only traditional culture',isCorrect:false},{label:'D',value:'Rejecting all foreign influences',isCorrect:false}], 'Cultural hybridization refers to the mixing and blending of cultural elements from different societies to create new, syncretic forms.', MEDIUM, 'Culture & Society'),
    mcq('What is the definition of the Caribbean according to the CARICOM perspective?', [{label:'A',value:'Only island nations',isCorrect:false},{label:'B',value:'All countries washed by the Caribbean Sea plus mainland states with Caribbean coastlines',isCorrect:true},{label:'C',value:'Only English-speaking islands',isCorrect:false},{label:'D',value:'All tropical countries in the Americas',isCorrect:false}], 'CARICOM defines the Caribbean broadly, including island and mainland territories with historical, cultural, and economic ties to the region.', MEDIUM, 'Caribbean Identity'),
    mcq('Which of the following is a push factor for migration in the Caribbean?', [{label:'A',value:'Better job opportunities abroad',isCorrect:false},{label:'B',value:'High unemployment and limited opportunities at home',isCorrect:true},{label:'C',value:'Family reunification',isCorrect:false},{label:'D',value:'Educational scholarships',isCorrect:false}], 'Push factors drive people away from their home country (unemployment, poverty). Pull factors attract them to destination countries.', MEDIUM, 'Economic Development'),
    mcq('What was the impact of the sugar revolution on Caribbean society?', [{label:'A',value:'It led to the diversification of the economy',isCorrect:false},{label:'B',value:'It transformed the economy from tobacco to sugar and increased demand for enslaved labor',isCorrect:true},{label:'C',value:'It reduced the need for labor',isCorrect:false},{label:'D',value:'It had little impact',isCorrect:false}], 'The sugar revolution (mid-17th century) shifted Caribbean economies to sugar monoculture, dramatically increasing the demand for enslaved African labor.', MEDIUM, 'History of Caribbean Society'),
    mcq('What is globalization?', [{label:'A',value:'Isolation of national economies',isCorrect:false},{label:'B',value:'The increasing interconnection of countries through trade, technology, and culture',isCorrect:true},{label:'C',value:'The breakup of large countries',isCorrect:false},{label:'D',value:'Local self-sufficiency',isCorrect:false}], 'Globalization refers to the process of increased interconnectedness and interdependence of world economies, cultures, and populations.', EASY, 'Globalization'),
    mcq('What is the CSME?', [{label:'A',value:'Caribbean Single Market and Economy',isCorrect:true},{label:'B',value:'Caribbean Social Movement for Equality',isCorrect:false},{label:'C',value:'Caribbean States Monetary Exchange',isCorrect:false},{label:'D',value:'Caribbean System of Marine Ecology',isCorrect:false}], 'CSME = Caribbean Single Market and Economy, designed to allow free movement of goods, services, capital, and skilled labor within CARICOM.', MEDIUM, 'Regional Integration'),
    mcq('Which of the following best describes "creolization"?', [{label:'A',value:'The adoption of European culture entirely',isCorrect:false},{label:'B',value:'The process of cultural mixing that produces new Caribbean identities',isCorrect:true},{label:'C',value:'The preservation of African traditions unchanged',isCorrect:false},{label:'D',value:'The rejection of all colonial influences',isCorrect:false}], 'Creolization is the blending of African, European, Indigenous, and Asian cultural elements to create distinct Caribbean cultures and identities.', MEDIUM, 'Caribbean Identity'),
    mcq('What is the main challenge of economic dependence in the Caribbean?', [{label:'A',value:'Too much industrial diversity',isCorrect:false},{label:'B',value:'Heavy reliance on a few export commodities and foreign investment',isCorrect:true},{label:'C',value:'Excessive technological innovation',isCorrect:false},{label:'D',value:'Too many trade agreements',isCorrect:false}], 'Caribbean economies often depend heavily on tourism, a few agricultural exports, and foreign direct investment, making them vulnerable to external shocks.', HARD, 'Economic Development'),
    mcq('The concept of "plantation economy" was developed by:', [{label:'A',value:'V.S. Naipaul',isCorrect:false},{label:'B',value:'Lloyd Best and Kari Levitt',isCorrect:true},{label:'C',value:'Bob Marley',isCorrect:false},{label:'D',value:'Eric Williams',isCorrect:false}], 'Lloyd Best and Kari Levitt developed the plantation economy model to describe the structural economic patterns inherited from colonialism.', HARD, 'Economic Development'),
    mcq('What is brain drain in the Caribbean context?', [{label:'A',value:'Increase in educated workforce',isCorrect:false},{label:'B',value:'Emigration of skilled and educated professionals to developed countries',isCorrect:true},{label:'C',value:'Investment in education',isCorrect:false},{label:'D',value:'Student exchange programs',isCorrect:false}], 'Brain drain refers to the emigration of highly trained or qualified people from a country, depleting the local talent pool.', MEDIUM, 'Economic Development'),
  ],
}

const ACHIEVEMENTS = [
  { name: 'First Steps', description: 'Complete your first quiz', icon: '🎯', category: 'study', criteria: '{"type":"quizzes_completed","value":1}', points: 10 },
  { name: 'Quiz Master', description: 'Complete 10 quizzes', icon: '🏆', category: 'study', criteria: '{"type":"quizzes_completed","value":10}', points: 50 },
  { name: 'Perfect Score', description: 'Get 100% on a quiz', icon: '💯', category: 'score', criteria: '{"type":"perfect_quiz","value":1}', points: 25 },
  { name: 'Streak Starter', description: 'Maintain a 3-day study streak', icon: '🔥', category: 'streak', criteria: '{"type":"streak","value":3}', points: 20 },
  { name: 'On Fire', description: 'Maintain a 7-day study streak', icon: '🔥', category: 'streak', criteria: '{"type":"streak","value":7}', points: 50 },
  { name: 'Unstoppable', description: 'Maintain a 30-day study streak', icon: '⚡', category: 'streak', criteria: '{"type":"streak","value":30}', points: 200 },
  { name: 'Bookworm', description: 'Study for 5 hours total', icon: '📚', category: 'study', criteria: '{"type":"study_hours","value":5}', points: 30 },
  { name: 'Scholar', description: 'Study for 25 hours total', icon: '🎓', category: 'study', criteria: '{"type":"study_hours","value":25}', points: 100 },
  { name: 'Flashcard Fan', description: 'Create 5 flashcard decks', icon: '🃏', category: 'study', criteria: '{"type":"decks_created","value":5}', points: 20 },
  { name: 'Note Taker', description: 'Create 10 notes', icon: '📝', category: 'study', criteria: '{"type":"notes_created","value":10}', points: 20 },
  { name: 'Generous', description: 'Share 3 notes', icon: '🤝', category: 'social', criteria: '{"type":"notes_shared","value":3}', points: 30 },
  { name: 'Top 10', description: 'Reach top 10 on the leaderboard', icon: '👑', category: 'social', criteria: '{"type":"leaderboard_rank","value":10}', points: 100 },
  { name: 'All Subjects', description: 'Study all 9 subjects', icon: '🌟', category: 'study', criteria: '{"type":"subjects_studied","value":9}', points: 75 },
  { name: 'Early Bird', description: 'Start a study session before 7 AM', icon: '🌅', category: 'study', criteria: '{"type":"early_study","value":1}', points: 15 },
  { name: 'Night Owl', description: 'Study past 10 PM', icon: '🦉', category: 'study', criteria: '{"type":"late_study","value":1}', points: 15 },
  { name: 'Centurion', description: 'Answer 100 questions total', icon: '💯', category: 'score', criteria: '{"type":"questions_answered","value":100}', points: 75 },
  { name: 'Wealthy', description: 'Accumulate 500 coins', icon: '💰', category: 'general', criteria: '{"type":"coins","value":500}', points: 50 },
  { name: 'Dedicated', description: 'Answer 500 questions total', icon: '🏅', category: 'score', criteria: '{"type":"questions_answered","value":500}', points: 200 },
]

const SHOP_ITEMS = [
  { name: 'Streak Freeze', description: 'Protect your streak for 1 day of inactivity', price: 50, type: 'streak_freeze', metadata: '{"duration":1}' },
  { name: 'Double XP (1 Hour)', description: 'Earn double XP for the next hour', price: 100, type: 'boost', metadata: '{"duration":3600,"multiplier":2}' },
  { name: 'Hint Pack (5)', description: 'Get 5 hints to use during quizzes', price: 75, type: 'hint_pack', metadata: '{"count":5}' },
  { name: 'Avatar: Scholar', description: 'Unlock the Scholar avatar frame', price: 200, type: 'avatar', metadata: '{"avatar":"scholar"}' },
  { name: 'Avatar: Champion', description: 'Unlock the Champion avatar frame', price: 300, type: 'avatar', metadata: '{"avatar":"champion"}' },
  { name: 'Avatar: Legend', description: 'Unlock the Legend avatar frame', price: 500, type: 'avatar', metadata: '{"avatar":"legend"}' },
  { name: 'Theme: Ocean Blue', description: 'Unlock the Ocean Blue color theme', price: 150, type: 'theme', metadata: '{"theme":"ocean"}' },
  { name: 'Theme: Sunset Gold', description: 'Unlock the Sunset Gold color theme', price: 150, type: 'theme', metadata: '{"theme":"sunset"}' },
  { name: 'Theme: Forest Green', description: 'Unlock the Forest Green color theme', price: 150, type: 'theme', metadata: '{"theme":"forest"}' },
  { name: 'Badge: Top Student', description: 'A special badge to show your dedication', price: 250, type: 'badge', metadata: '{"badge":"top_student"}' },
]

async function main() {
  console.log('🌱 Seeding CXC Ace database...')

  // Create subjects and topics
  for (const subj of SUBJECTS) {
    const subject = await db.subject.upsert({
      where: { code: subj.code },
      update: {},
      create: {
        name: subj.name,
        code: subj.code,
        description: subj.description,
        color: subj.color,
        icon: subj.icon,
      },
    })

    for (let i = 0; i < subj.topics.length; i++) {
      await db.topic.upsert({
        where: { name_subjectId: { name: subj.topics[i], subjectId: subject.id } },
        update: {},
        create: {
          name: subj.topics[i],
          subjectId: subject.id,
          order: i,
        },
      })
    }
  }
  console.log('✅ Subjects and topics created')

  // Create questions
  for (const [subjectCode, questions] of Object.entries(QUESTIONS)) {
    const subject = await db.subject.findUnique({ where: { code: subjectCode } })
    if (!subject) continue

    for (const q of questions) {
      const topic = await db.topic.findFirst({
        where: { name: q.topicName, subjectId: subject.id },
      })

      await db.question.create({
        data: {
          type: q.type,
          difficulty: q.difficulty,
          content: q.content,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          subjectId: subject.id,
          topicId: topic?.id ?? null,
          source: q.source,
          status: 'APPROVED',
        },
      })
    }
  }
  console.log('✅ Questions created')

  // Create achievements
  for (const a of ACHIEVEMENTS) {
    await db.achievement.upsert({
      where: { name: a.name },
      update: {},
      create: a,
    })
  }
  console.log('✅ Achievements created')

  // Create shop items
  for (const item of SHOP_ITEMS) {
    await db.shopItem.create({
      data: {
        name: item.name,
        description: item.description,
        price: item.price,
        type: item.type,
        metadata: item.metadata,
      },
    })
  }
  console.log('✅ Shop items created')

  console.log('🎉 Seeding complete!')
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
