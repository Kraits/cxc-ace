/**
 * Non-interactive script to set up Turso database:
 * 1. Create all tables using raw SQL
 * 2. Seed with subjects, topics, questions, achievements, and shop items
 */
import { createClient } from '@libsql/client'
import { PrismaClient, Difficulty } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import * as fs from 'fs'
import * as path from 'path'

const TURSO_URL = 'libsql://cxc-ace-endd21.aws-us-east-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzY2NTEyNzUsImlkIjoiMDE5ZGE4OWYtOGQwMS03ZWRmLWFhMzYtN2YzNGNiYTQ3OTljIiwicmlkIjoiYWVhZmRlMzEtYTA1Ny00ZTYwLWEzNDEtYjRlZTg4NTI1ODFlIn0.Z-MpprbPNGoXX41qlwJd9YtaD2sXqYVt151LmLJfx9LCf4e9fx7wYgHf7hf2YZ8JZAWWnoOTRVYh0UTMdAdtDQ'

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
    mcq('Two cards are drawn from a standard deck. What is the probability both are aces?', [{label:'A',value:'1/169',isCorrect:false},{label:'B',value:'1/221',isCorrect:true},{label:'C',value:'1/52',isCorrect:false},{label:'D',value:'1/169',isCorrect:false}], 'P(first ace) = 4/52. Without replacement: P(second ace) = 3/51. P = 4/52 × 3/51 = 1/221.', HARD, 'Statistics & Probability'),
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
    mcq('What is the correct punctuation for the following: "I cant believe its already December"', [{label:'A',value:"I can't believe it's already December.",isCorrect:true},{label:'B',value:'I cant believe its already December.',isCorrect:false},{label:'C',value:"I can't believe its already December.",isCorrect:false},{label:'D',value:"I cant believe it's already December.",isCorrect:false}], 'Both contractions need apostrophes: "can\'t" (can not) and "it\'s" (it is).', EASY, 'Grammar & Mechanics'),
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
    mcq("What is Avogadro's number?", [{label:'A',value:'6.022 × 10²³',isCorrect:true},{label:'B',value:'3.14 × 10²³',isCorrect:false},{label:'C',value:'6.022 × 10²⁰',isCorrect:false},{label:'D',value:'1.602 × 10¹⁹',isCorrect:false}], "Avogadro's number (6.022 × 10²³) is the number of particles in one mole of a substance.", MEDIUM, 'Stoichiometry'),
    mcq('What type of bonding is present in sodium chloride (NaCl)?', [{label:'A',value:'Covalent',isCorrect:false},{label:'B',value:'Ionic',isCorrect:true},{label:'C',value:'Metallic',isCorrect:false},{label:'D',value:'Hydrogen',isCorrect:false}], 'NaCl forms ionic bonds where sodium transfers an electron to chlorine, creating Na⁺ and Cl⁻ ions.', MEDIUM, 'Chemical Bonding'),
    mcq('What is the first member of the alkene series?', [{label:'A',value:'Methane',isCorrect:false},{label:'B',value:'Ethene',isCorrect:true},{label:'C',value:'Propene',isCorrect:false},{label:'D',value:'Butene',isCorrect:false}], 'The simplest alkene is ethene (C₂H₄). Methane is an alkane, not an alkene.', MEDIUM, 'Organic Chemistry'),
    mcq('In the Haber process, what gases are combined to make ammonia?', [{label:'A',value:'Nitrogen and oxygen',isCorrect:false},{label:'B',value:'Nitrogen and hydrogen',isCorrect:true},{label:'C',value:'Oxygen and hydrogen',isCorrect:false},{label:'D',value:'Carbon and nitrogen',isCorrect:false}], 'N₂ + 3H₂ → 2NH₃. The Haber process combines nitrogen and hydrogen to produce ammonia.', HARD, 'Industrial Chemistry'),
  ],
  'CSEC-PHYS': [
    mcq('What is the SI unit of force?', [{label:'A',value:'Joule',isCorrect:false},{label:'B',value:'Newton',isCorrect:true},{label:'C',value:'Watt',isCorrect:false},{label:'D',value:'Pascal',isCorrect:false}], 'Force is measured in Newtons (N). F = ma.', EASY, 'Mechanics'),
    mcq('What is the acceleration due to gravity on Earth?', [{label:'A',value:'8.9 m/s²',isCorrect:false},{label:'B',value:'10.8 m/s²',isCorrect:false},{label:'C',value:'9.8 m/s²',isCorrect:true},{label:'D',value:'11.2 m/s²',isCorrect:false}], 'Standard value: g ≈ 9.8 m/s² (often approximated as 10 m/s² in calculations).', EASY, 'Mechanics'),
    mcq('A car travels 100 km in 2 hours. What is its average speed?', [{label:'A',value:'25 km/h',isCorrect:false},{label:'B',value:'50 km/h',isCorrect:true},{label:'C',value:'100 km/h',isCorrect:false},{label:'D',value:'200 km/h',isCorrect:false}], 'Speed = Distance/Time = 100/2 = 50 km/h.', EASY, 'Mechanics'),
    mcq("What is Newton's Second Law of Motion?", [{label:'A',value:'Every action has an equal and opposite reaction',isCorrect:false},{label:'B',value:'F = ma',isCorrect:true},{label:'C',value:'An object at rest stays at rest',isCorrect:false},{label:'D',value:'Energy cannot be created or destroyed',isCorrect:false}], "Newton's Second Law: Force = mass × acceleration (F = ma).", EASY, 'Mechanics'),
    mcq('What is the SI unit of electrical resistance?', [{label:'A',value:'Volt',isCorrect:false},{label:'B',value:'Ampere',isCorrect:false},{label:'C',value:'Ohm',isCorrect:true},{label:'D',value:'Watt',isCorrect:false}], "Resistance is measured in Ohms (Ω). Ohm's Law: V = IR.", EASY, 'Electricity & Magnetism'),
    mcq('What is the formula for kinetic energy?', [{label:'A',value:'KE = mgh',isCorrect:false},{label:'B',value:'KE = ½mv²',isCorrect:true},{label:'C',value:'KE = Fd',isCorrect:false},{label:'D',value:'KE = mc²',isCorrect:false}], 'Kinetic Energy = ½mv² where m is mass and v is velocity.', MEDIUM, 'Mechanics'),
    mcq('Which type of wave requires a medium to travel?', [{label:'A',value:'Light wave',isCorrect:false},{label:'B',value:'Radio wave',isCorrect:false},{label:'C',value:'Sound wave',isCorrect:true},{label:'D',value:'X-ray',isCorrect:false}], 'Sound waves are mechanical/longitudinal waves that need a medium (solid, liquid, or gas). Electromagnetic waves do not.', MEDIUM, 'Waves & Optics'),
    mcq('What is the speed of light in a vacuum (approximately)?', [{label:'A',value:'3 × 10⁶ m/s',isCorrect:false},{label:'B',value:'3 × 10⁸ m/s',isCorrect:true},{label:'C',value:'3 × 10¹⁰ m/s',isCorrect:false},{label:'D',value:'3 × 10⁴ m/s',isCorrect:false}], 'Speed of light in vacuum: c ≈ 3 × 10⁸ m/s (or 300,000 km/s).', MEDIUM, 'Waves & Optics'),
    mcq("What is Ohm's Law?", [{label:'A',value:'V = IR',isCorrect:true},{label:'B',value:'P = IV',isCorrect:false},{label:'C',value:'E = mc²',isCorrect:false},{label:'D',value:'F = ma',isCorrect:false}], "Ohm's Law: V = IR, where V is voltage, I is current, and R is resistance.", EASY, 'Electricity & Magnetism'),
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
    mcq('What was the significance of the Morant Bay Rebellion (1865)?', [{label:'A',value:'It led to immediate independence for Jamaica',isCorrect:false},{label:'B',value:'It highlighted the poor conditions of freed people and led to constitutional reform',isCorrect:true},{label:'C',value:'It was a successful slave revolt',isCorrect:false},{label:'D',value:'It established trade unions',isCorrect:false}], 'Led by Paul Bogle, the Morant Bay Rebellion protested injustice against freed people. It resulted in Governor Eyre\'s brutal response and led to reforms in colonial governance.', MEDIUM, 'Emancipation'),
    mcq('CARICOM stands for:', [{label:'A',value:'Caribbean Community',isCorrect:true},{label:'B',value:'Caribbean Common Market',isCorrect:false},{label:'C',value:'Caribbean Cooperation Organization',isCorrect:false},{label:'D',value:'Caribbean Union of States',isCorrect:false}], 'CARICOM (Caribbean Community) was established in 1973 to promote economic integration and cooperation among Caribbean nations.', EASY, 'Independence Movements'),
    mcq('Who was the first Prime Minister of independent Jamaica?', [{label:'A',value:'Norman Manley',isCorrect:false},{label:'B',value:'Alexander Bustamante',isCorrect:true},{label:'C',value:'Michael Manley',isCorrect:false},{label:'D',value:'Edward Seaga',isCorrect:false}], 'Sir Alexander Bustamante became Jamaica\'s first Prime Minister upon independence on August 6, 1962.', MEDIUM, 'Independence Movements'),
  ],
  'CSEC-GEOG': [
    mcq('What is the name of the line of latitude at 0°?', [{label:'A',value:'Tropic of Cancer',isCorrect:false},{label:'B',value:'Equator',isCorrect:true},{label:'C',value:'Tropic of Capricorn',isCorrect:false},{label:'D',value:'Prime Meridian',isCorrect:false}], 'The Equator is at 0° latitude, dividing the Earth into Northern and Southern hemispheres.', EASY, 'Map Reading'),
    mcq('What type of rock is formed from cooled lava?', [{label:'A',value:'Sedimentary',isCorrect:false},{label:'B',value:'Metamorphic',isCorrect:false},{label:'C',value:'Igneous',isCorrect:true},{label:'D',value:'Fossiliferous',isCorrect:false}], 'Igneous rocks form from the cooling and solidification of magma or lava. Examples: basalt, granite.', EASY, 'Plate Tectonics'),
    mcq('What is the scale 1:50,000 on a map?', [{label:'A',value:'1 cm on the map = 50,000 cm (500 m) on the ground',isCorrect:true},{label:'B',value:'1 cm on the map = 50 cm on the ground',isCorrect:false},{label:'C',value:'1 cm on the map = 5,000 cm on the ground',isCorrect:false},{label:'D',value:'1 cm on the map = 50,000 km on the ground',isCorrect:false}], '1:50,000 means 1 unit on the map equals 50,000 of the same units on the ground. So 1 cm = 50,000 cm = 500 m.', MEDIUM, 'Map Reading'),
    mcq('What type of climate does most of the Caribbean have?', [{label:'A',value:'Desert climate',isCorrect:false},{label:'B',value:'Tropical maritime climate',isCorrect:true},{label:'C',value:'Temperate climate',isCorrect:false},{label:'D',value:'Polar climate',isCorrect:false}], 'Most Caribbean islands have a tropical maritime climate with warm temperatures, high humidity, and distinct wet/dry seasons.', EASY, 'Climate & Weather'),
    mcq('What causes earthquakes in the Caribbean?', [{label:'A',value:'Volcanic activity only',isCorrect:false},{label:'B',value:'The movement of tectonic plates along fault lines',isCorrect:true},{label:'C',value:'Heavy rainfall',isCorrect:false},{label:'D',value:'Ocean currents',isCorrect:false}], 'Most Caribbean earthquakes are caused by the movement of the Caribbean Plate against the North American Plate.', MEDIUM, 'Plate Tectonics'),
    mcq('What is the difference between weather and climate?', [{label:'A',value:'There is no difference',isCorrect:false},{label:'B',value:'Weather is short-term conditions; climate is long-term average',isCorrect:true},{label:'C',value:'Climate is daily; weather is yearly',isCorrect:false},{label:'D',value:'Weather only occurs in the tropics',isCorrect:false}], 'Weather refers to short-term atmospheric conditions (days/weeks), while climate describes the long-term average of weather patterns over 30+ years.', EASY, 'Climate & Weather'),
    mcq('Which layer of the Earth is broken into tectonic plates?', [{label:'A',value:'Inner core',isCorrect:false},{label:'B',value:'Outer core',isCorrect:false},{label:'C',value:'Mantle',isCorrect:false},{label:'D',value:'Lithosphere',isCorrect:true}], 'The lithosphere (the rigid outer layer comprising the crust and upper mantle) is broken into tectonic plates.', MEDIUM, 'Plate Tectonics'),
    mcq('What is population density?', [{label:'A',value:'Total number of people in a country',isCorrect:false},{label:'B',value:'Number of people per unit area',isCorrect:true},{label:'C',value:'Birth rate minus death rate',isCorrect:false},{label:'D',value:'Number of births per year',isCorrect:false}], 'Population density = Total population / Total land area. It measures how crowded an area is.', EASY, 'Population Geography'),
    mcq('What is a primary economic activity?', [{label:'A',value:'Manufacturing cars',isCorrect:false},{label:'B',value:'Farming and fishing',isCorrect:true},{label:'C',value:'Banking and finance',isCorrect:false},{label:'D',value:'Teaching and healthcare',isCorrect:false}], 'Primary activities involve extracting or producing raw materials directly from the earth, such as farming, fishing, and mining.', EASY, 'Economic Activities'),
    mcq('What are coral reefs?', [{label:'A',value:'Rock formations from volcanic activity',isCorrect:false},{label:'B',value:'Underwater ecosystems made from coral polyps',isCorrect:true},{label:'C',value:'Sand bars near the shore',isCorrect:false},{label:'D',value:'Deep ocean trenches',isCorrect:false}], 'Coral reefs are underwater ecosystems built by colonies of tiny animals called coral polyps. They are vital for Caribbean marine biodiversity.', MEDIUM, 'Caribbean Environment'),
  ],
  'CAPE-PURE1': [
    mcq('What is the domain of f(x) = √(x - 3)?', [{label:'A',value:'x ≥ 3',isCorrect:true},{label:'B',value:'x > 3',isCorrect:false},{label:'C',value:'All real numbers',isCorrect:false},{label:'D',value:'x ≤ 3',isCorrect:false}], 'The expression under the square root must be non-negative: x - 3 ≥ 0, so x ≥ 3.', EASY, 'Functions & Relations'),
    mcq('If f(x) = 2x + 1 and g(x) = x², what is f(g(2))?', [{label:'A',value:'9',isCorrect:true},{label:'B',value:'25',isCorrect:false},{label:'C',value:'5',isCorrect:false},{label:'D',value:'7',isCorrect:false}], 'g(2) = 4, then f(4) = 2(4) + 1 = 9.', MEDIUM, 'Functions & Relations'),
    mcq('What is the period of y = sin(2x)?', [{label:'A',value:'2π',isCorrect:false},{label:'B',value:'π',isCorrect:true},{label:'C',value:'π/2',isCorrect:false},{label:'D',value:'4π',isCorrect:false}], 'The period of sin(bx) is 2π/b. Here b = 2, so period = 2π/2 = π.', MEDIUM, 'Trigonometry & Circular Measure'),
    mcq('What is the value of lim(x→0) sin(x)/x?', [{label:'A',value:'0',isCorrect:false},{label:'B',value:'1',isCorrect:true},{label:'C',value:'Undefined',isCorrect:false},{label:'D',value:'∞',isCorrect:false}], 'This is a standard limit: lim(x→0) sin(x)/x = 1.', MEDIUM, 'Calculus (Limits)'),
    mcq('What is the derivative of x³?', [{label:'A',value:'x²',isCorrect:false},{label:'B',value:'3x',isCorrect:false},{label:'C',value:'3x²',isCorrect:true},{label:'D',value:'3x³',isCorrect:false}], 'Using the power rule: d/dx(x^n) = nx^(n-1), so d/dx(x³) = 3x².', EASY, 'Calculus (Differentiation)'),
    mcq('What is the integral of 2x dx?', [{label:'A',value:'x² + C',isCorrect:true},{label:'B',value:'2x² + C',isCorrect:false},{label:'C',value:'x + C',isCorrect:false},{label:'D',value:'2 + C',isCorrect:false}], '∫2x dx = 2 · x²/2 + C = x² + C.', EASY, 'Calculus (Integration)'),
    mcq('What is the sum of the arithmetic series 2 + 5 + 8 + ... + 29?', [{label:'A',value:'155',isCorrect:true},{label:'B',value:'145',isCorrect:false},{label:'C',value:'160',isCorrect:false},{label:'D',value:'150',isCorrect:false}], 'a=2, d=3, n=(29-2)/3+1=10. S = n/2(a+l) = 10/2(2+29) = 5×31 = 155.', MEDIUM, 'Sequences & Series'),
    mcq('Find dy/dx if y = e^(3x).', [{label:'A',value:'3e^(3x)',isCorrect:true},{label:'B',value:'e^(3x)',isCorrect:false},{label:'C',value:'3x·e^(3x)',isCorrect:false},{label:'D',value:'e^(3x)/3',isCorrect:false}], 'd/dx(e^(kx)) = k·e^(kx). So dy/dx = 3e^(3x).', MEDIUM, 'Calculus (Differentiation)'),
    mcq('What is the 10th term of the geometric sequence 3, 6, 12, ...?', [{label:'A',value:'1536',isCorrect:true},{label:'B',value:'768',isCorrect:false},{label:'C',value:'3072',isCorrect:false},{label:'D',value:'1024',isCorrect:false}], 'a=3, r=2, ar^(n-1) = 3×2⁹ = 3×512 = 1536.', MEDIUM, 'Sequences & Series'),
    mcq('What is cos(2θ) in terms of cos(θ)?', [{label:'A',value:'2cos²(θ) - 1',isCorrect:true},{label:'B',value:'1 - 2cos²(θ)',isCorrect:false},{label:'C',value:'2cos(θ) - 1',isCorrect:false},{label:'D',value:'cos²(θ) - 1',isCorrect:false}], 'The double angle formula: cos(2θ) = 2cos²(θ) - 1 = 1 - 2sin²(θ) = cos²(θ) - sin²(θ).', HARD, 'Trigonometry & Circular Measure'),
    mcq('Evaluate: lim(x→2) (x² - 4)/(x - 2)', [{label:'A',value:'4',isCorrect:true},{label:'B',value:'2',isCorrect:false},{label:'C',value:'0',isCorrect:false},{label:'D',value:'Undefined',isCorrect:false}], 'Factor: (x²-4)/(x-2) = (x-2)(x+2)/(x-2) = x+2. lim = 2+2 = 4.', MEDIUM, 'Calculus (Limits)'),
    mcq('What is the derivative of ln(x)?', [{label:'A',value:'1/x',isCorrect:true},{label:'B',value:'ln(x)/x',isCorrect:false},{label:'C',value:'x',isCorrect:false},{label:'D',value:'1/ln(x)',isCorrect:false}], 'd/dx(ln(x)) = 1/x. This is a standard derivative.', EASY, 'Calculus (Differentiation)'),
  ],
  'CAPE-CS': [
    mcq('What is creolization?', [{label:'A',value:'The process of becoming European',isCorrect:false},{label:'B',value:'The blending of cultural elements from different groups to create new hybrid cultures',isCorrect:true},{label:'C',value:'The preservation of African traditions only',isCorrect:false},{label:'D',value:'The adoption of American culture',isCorrect:false}], 'Creolization is the process where elements of different cultures (African, European, Indigenous, Asian) blend to create new Caribbean cultural forms in language, music, food, and religion.', MEDIUM, 'Culture & Society'),
    mcq('Which treaty established the Caribbean Community (CARICOM)?', [{label:'A',value:'Treaty of Chaguaramas',isCorrect:true},{label:'B',value:'Treaty of Paris',isCorrect:false},{label:'C',value:'Treaty of Rome',isCorrect:false},{label:'D',value:'Treaty of Versailles',isCorrect:false}], 'The Treaty of Chaguaramas, signed in 1973 in Trinidad & Tobago, established CARICOM to promote economic integration and cooperation.', MEDIUM, 'Regional Integration'),
    mcq('What is the main export of many Caribbean economies?', [{label:'A',value:'Manufactured electronics',isCorrect:false},{label:'B',value:'Tourism services and primary commodities (bauxite, sugar, bananas)',isCorrect:true},{label:'C',value:'Automobiles',isCorrect:false},{label:'D',value:'Steel',isCorrect:false}], 'Most Caribbean economies rely heavily on tourism and primary commodity exports (bauxite, sugar, bananas, oil), making them vulnerable to price fluctuations.', EASY, 'Economic Development'),
    mcq('What was the West Indies Federation?', [{label:'A',value:'A successful political union of Caribbean islands',isCorrect:false},{label:'B',value:'A short-lived political union (1958-1962) attempting to unite British Caribbean colonies',isCorrect:true},{label:'C',value:'A cricket organization',isCorrect:false},{label:'D',value:'A trade agreement',isCorrect:false}], 'The West Indies Federation (1958-1962) was an attempt to create a political union of British Caribbean colonies. It failed due to internal disagreements and nationalism.', MEDIUM, 'Political Development'),
    mcq('How has globalization affected the Caribbean?', [{label:'A',value:'It has had no impact',isCorrect:false},{label:'B',value:'It has brought both opportunities (trade, technology) and challenges (cultural homogenization, competition)',isCorrect:true},{label:'C',value:'It has only benefited the region',isCorrect:false},{label:'D',value:'It has only harmed the region',isCorrect:false}], 'Globalization has brought Caribbean countries access to global markets and technology, but also cultural imperialism, brain drain, and increased competition from larger economies.', MEDIUM, 'Globalization'),
    mcq('What is the CSME?', [{label:'A',value:'Caribbean Single Market and Economy',isCorrect:true},{label:'B',value:'Caribbean States Military Alliance',isCorrect:false},{label:'C',value:'Caribbean Students Movement for Education',isCorrect:false},{label:'D',value:'Caribbean Science and Math Exam',isCorrect:false}], 'The CSME (Caribbean Single Market and Economy) aims to create a single economic space allowing free movement of goods, services, capital, and skilled labor.', MEDIUM, 'Regional Integration'),
    mcq('Which factor most contributed to the diversity of Caribbean culture?', [{label:'A',value:'Geographic isolation',isCorrect:false},{label:'B',value:'The history of colonization, slavery, and migration',isCorrect:true},{label:'C',value:'Modern technology',isCorrect:false},{label:'D',value:'Religious uniformity',isCorrect:false}], 'The Caribbean\'s cultural diversity stems from centuries of colonization by multiple European powers, the forced migration of Africans through slavery, and the arrival of indentured workers from India, China, and Portugal.', EASY, 'Caribbean Identity'),
    mcq('What is "brain drain" in the Caribbean context?', [{label:'A',value:'Loss of intellectual capacity due to poor education',isCorrect:false},{label:'B',value:'Emigration of highly skilled and educated professionals to developed countries',isCorrect:true},{label:'C',value:'Brain damage from tropical diseases',isCorrect:false},{label:'D',value:'Lack of educational institutions',isCorrect:false}], 'Brain drain refers to the emigration of trained professionals (doctors, nurses, teachers, engineers) from Caribbean nations to countries like the US, UK, and Canada for better opportunities.', MEDIUM, 'Economic Development'),
    mcq('What role did Rastafari play in Caribbean identity?', [{label:'A',value:'It was purely a religious movement with no social impact',isCorrect:false},{label:'B',value:'It promoted Black consciousness, resistance to oppression, and cultural pride',isCorrect:true},{label:'C',value:'It supported colonial rule',isCorrect:false},{label:'D',value:'It was primarily an economic movement',isCorrect:false}], 'Rastafari emerged in Jamaica in the 1930s as a religious and social movement promoting Black pride, resistance to "Babylon" (oppressive systems), Pan-Africanism, and the divinity of Haile Selassie I.', MEDIUM, 'Caribbean Identity'),
  ],
}

const ACHIEVEMENTS = [
  { name: 'First Steps', description: 'Complete your first quiz', icon: '🎯', category: 'study', criteria: '{"type":"quizzes_completed","value":1}', points: 10 },
  { name: 'Quick Learner', description: 'Complete 10 quizzes', icon: '📚', category: 'study', criteria: '{"type":"quizzes_completed","value":10}', points: 50 },
  { name: 'Scholar', description: 'Complete 50 quizzes', icon: '🎓', category: 'study', criteria: '{"type":"quizzes_completed","value":50}', points: 200 },
  { name: 'Perfect Score', description: 'Get 100% on a quiz', icon: '💯', category: 'score', criteria: '{"type":"perfect_quiz","value":1}', points: 25 },
  { name: 'Subject Master', description: 'Achieve 90% accuracy in any subject', icon: '👑', category: 'score', criteria: '{"type":"subject_accuracy","value":90}', points: 100 },
  { name: 'Streak Starter', description: 'Maintain a 3-day study streak', icon: '🔥', category: 'streak', criteria: '{"type":"streak","value":3}', points: 15 },
  { name: 'On Fire', description: 'Maintain a 7-day study streak', icon: '🔥', category: 'streak', criteria: '{"type":"streak","value":7}', points: 50 },
  { name: 'Unstoppable', description: 'Maintain a 30-day study streak', icon: '🔥', category: 'streak', criteria: '{"type":"streak","value":30}', points: 200 },
  { name: 'Flashcard Fan', description: 'Create your first flashcard deck', icon: '🃏', category: 'study', criteria: '{"type":"flashcard_decks_created","value":1}', points: 10 },
  { name: 'Note Taker', description: 'Write your first note', icon: '📝', category: 'study', criteria: '{"type":"notes_created","value":1}', points: 10 },
  { name: 'Social Butterfly', description: 'Share a flashcard deck or note', icon: '🦋', category: 'social', criteria: '{"type":"items_shared","value":1}', points: 15 },
  { name: 'Generous Soul', description: 'Submit a question for review', icon: '🤝', category: 'social', criteria: '{"type":"questions_submitted","value":1}', points: 20 },
  { name: 'Dedicated Student', description: 'Study for 1 hour total', icon: '⏱️', category: 'study', criteria: '{"type":"total_study_time_minutes","value":60}', points: 30 },
  { name: 'Night Owl', description: 'Study after 10 PM', icon: '🦉', category: 'general', criteria: '{"type":"study_time","after":"22:00"}', points: 10 },
  { name: 'Early Bird', description: 'Study before 7 AM', icon: '🐦', category: 'general', criteria: '{"type":"study_time","before":"07:00"}', points: 10 },
  { name: 'Multi-Subject', description: 'Study 3 different subjects', icon: '📊', category: 'study', criteria: '{"type":"subjects_studied","value":3}', points: 30 },
  { name: 'Bookmark Hero', description: 'Bookmark 10 questions', icon: '🔖', category: 'study', criteria: '{"type":"bookmarks_created","value":10}', points: 15 },
  { name: 'Coin Collector', description: 'Earn 500 coins', icon: '🪙', category: 'general', criteria: '{"type":"coins_earned","value":500}', points: 50 },
]

const SHOP_ITEMS = [
  { name: 'Streak Freeze', description: 'Protect your streak for one day of inactivity', price: 50, type: 'streak_freeze', metadata: '{"duration_days":1}', imageUrl: null, stock: null },
  { name: 'Hint Pack (5)', description: 'Get 5 hints to use during quizzes', price: 75, type: 'hint_pack', metadata: '{"hints":5}', imageUrl: null, stock: null },
  { name: 'Double XP Boost', description: 'Earn double XP for your next study session', price: 100, type: 'boost', metadata: '{"multiplier":2,"duration_minutes":60}', imageUrl: null, stock: null },
  { name: 'Avatar: Scholar', description: 'Unlock the Scholar avatar frame', price: 200, type: 'avatar', metadata: '{"avatar_id":"scholar"}', imageUrl: null, stock: null },
  { name: 'Avatar: Explorer', description: 'Unlock the Explorer avatar frame', price: 200, type: 'avatar', metadata: '{"avatar_id":"explorer"}', imageUrl: null, stock: null },
  { name: 'Theme: Ocean Blue', description: 'Apply a calming ocean blue theme to your profile', price: 150, type: 'theme', metadata: '{"theme_id":"ocean_blue"}', imageUrl: null, stock: null },
  { name: 'Theme: Sunset Gold', description: 'Apply a warm sunset gold theme to your profile', price: 150, type: 'theme', metadata: '{"theme_id":"sunset_gold"}', imageUrl: null, stock: null },
  { name: 'Badge: Top Contributor', description: 'Show a Top Contributor badge on your profile', price: 300, type: 'badge', metadata: '{"badge_id":"top_contributor"}', imageUrl: null, stock: null },
  { name: 'Streak Shield', description: 'Protect your streak for 7 days of inactivity', price: 250, type: 'streak_freeze', metadata: '{"duration_days":7}', imageUrl: null, stock: null },
  { name: 'Triple XP Boost', description: 'Earn triple XP for your next study session', price: 200, type: 'boost', metadata: '{"multiplier":3,"duration_minutes":30}', imageUrl: null, stock: null },
]

async function main() {
  console.log('🔄 Connecting to Turso...')

  // Step 1: Connect and create tables using raw SQL
  const libsql = createClient({
    url: TURSO_URL,
    authToken: TURSO_TOKEN,
  })

  console.log('✅ Connected to Turso')

  // Step 2: Read and execute schema.sql
  const schemaPath = path.join(__dirname, 'schema.sql')
  const schemaSql = fs.readFileSync(schemaPath, 'utf-8')

  // Split by semicolons and execute each statement
  const statements = schemaSql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'))

  console.log(`📋 Creating ${statements.length} tables/indexes...`)

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i]
    if (stmt.startsWith('PRAGMA')) continue // Skip PRAGMA for remote
    try {
      await libsql.execute(stmt)
    } catch (err: any) {
      console.log(`  ⚠️  Statement ${i + 1} warning: ${err.message?.substring(0, 80)}`)
    }
  }

  console.log('✅ Tables created successfully')

  // Step 3: Seed with Prisma
  console.log('🔄 Setting up Prisma with Turso adapter...')

  const adapter = new PrismaLibSQL({
    url: TURSO_URL,
    authToken: TURSO_TOKEN,
  })

  const prisma = new PrismaClient({ adapter } as never)

  // Step 4: Seed subjects and topics
  console.log('📚 Seeding subjects and topics...')

  const subjectMap = new Map<string, string>() // code -> id
  const topicMap = new Map<string, Map<string, string>>() // code -> (name -> id)

  for (const subject of SUBJECTS) {
    const now = new Date()
    const created = await prisma.subject.upsert({
      where: { code: subject.code },
      update: { name: subject.name, description: subject.description, color: subject.color, icon: subject.icon, updatedAt: now },
      create: {
        name: subject.name,
        code: subject.code,
        description: subject.description,
        color: subject.color,
        icon: subject.icon,
      },
    })
    subjectMap.set(subject.code, created.id)
    topicMap.set(subject.code, new Map())

    for (let t = 0; t < subject.topics.length; t++) {
      const topic = await prisma.topic.upsert({
        where: { name_subjectId: { name: subject.topics[t], subjectId: created.id } },
        update: { order: t },
        create: {
          name: subject.topics[t],
          subjectId: created.id,
          order: t,
        },
      })
      topicMap.get(subject.code)!.set(subject.topics[t], topic.id)
    }
  }

  console.log(`✅ Seeded ${SUBJECTS.length} subjects with topics`)

  // Step 5: Seed questions
  console.log('❓ Seeding questions...')
  let questionCount = 0

  for (const [subjectCode, questions] of Object.entries(QUESTIONS)) {
    const subjectId = subjectMap.get(subjectCode)!
    const topics = topicMap.get(subjectCode)!

    for (const q of questions) {
      const topicId = topics.get(q.topicName) || null
      await prisma.question.create({
        data: {
          type: q.type,
          difficulty: q.difficulty,
          content: q.content,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          subjectId,
          topicId,
          source: q.source,
          status: 'APPROVED',
        },
      })
      questionCount++
    }
  }

  console.log(`✅ Seeded ${questionCount} questions`)

  // Step 6: Seed achievements
  console.log('🏆 Seeding achievements...')

  for (const a of ACHIEVEMENTS) {
    await prisma.achievement.upsert({
      where: { name: a.name },
      update: { description: a.description, icon: a.icon, category: a.category, criteria: a.criteria, points: a.points },
      create: {
        name: a.name,
        description: a.description,
        icon: a.icon,
        category: a.category,
        criteria: a.criteria,
        points: a.points,
      },
    })
  }

  console.log(`✅ Seeded ${ACHIEVEMENTS.length} achievements`)

  // Step 7: Seed shop items
  console.log('🛒 Seeding shop items...')

  for (const item of SHOP_ITEMS) {
    await prisma.shopItem.create({
      data: {
        name: item.name,
        description: item.description,
        price: item.price,
        type: item.type,
        metadata: item.metadata,
        imageUrl: item.imageUrl,
        isActive: true,
        stock: item.stock,
      },
    })
  }

  console.log(`✅ Seeded ${SHOP_ITEMS.length} shop items`)

  // Step 8: Verify
  const subjectCount = await prisma.subject.count()
  const topicCount = await prisma.topic.count()
  const achievementCount = await prisma.achievement.count()
  const shopItemCount = await prisma.shopItem.count()

  console.log('\n📊 Database Summary:')
  console.log(`  Subjects: ${subjectCount}`)
  console.log(`  Topics: ${topicCount}`)
  console.log(`  Questions: ${questionCount}`)
  console.log(`  Achievements: ${achievementCount}`)
  console.log(`  Shop Items: ${shopItemCount}`)
  console.log('\n🎉 Turso database setup complete!')

  await prisma.$disconnect()
  await libsql.close()
}

main().catch(async (err) => {
  console.error('❌ Error:', err)
  process.exit(1)
})
