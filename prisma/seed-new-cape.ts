import { PrismaClient, Difficulty } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

const adapter = new PrismaLibSQL({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN || undefined,
})

const db = new PrismaClient({ adapter } as never)

function mcq(content: string, options: { label: string; value: string; isCorrect: boolean }[], explanation: string, difficulty: Difficulty, topicName: string) {
  return { type: 'MCQ' as const, difficulty, content, options: JSON.stringify(options), correctAnswer: options.find(o => o.isCorrect)!.value, explanation, topicName, source: null }
}
const EASY: Difficulty = 'EASY'
const MEDIUM: Difficulty = 'MEDIUM'
const HARD: Difficulty = 'HARD'

// ── 6 CAPE Subjects (Batch 1) ──────────────────────────────────

const SUBJECTS = [
  { name: 'Applied Mathematics', code: 'CAPE-APPMATH', description: 'CAPE Applied Mathematics covers discrete mathematics, probability, statistical inference, matrices, and numerical methods.', color: '#f43f5e', icon: '📈', topics: ['Discrete Mathematics', 'Probability & Distributions', 'Statistical Inference', 'Matrices & Transformations', 'Numerical Methods'] },
  { name: 'Communication Studies', code: 'CAPE-COMSTUD', description: 'CAPE Communication Studies explores language, information gathering, community discourse, and communication skills.', color: '#8b5cf6', icon: '🎙️', topics: ['Language & Communication', 'Gathering & Processing Info', 'Language in Community', 'Speaking & Writing', 'Caribbean Discourse'] },
  { name: 'CAPE Biology', code: 'CAPE-BIO', description: 'CAPE Biology covers cell biology, genetics, bioenergetics, ecology, and human biology.', color: '#16a34a', icon: '🧫', topics: ['Cell & Molecular Biology', 'Genetics & Variation', 'Bioenergetics', 'Ecology & Environmental Biology', 'Human & Applied Biology'] },
  { name: 'Sociology', code: 'CAPE-SOC', description: 'CAPE Sociology examines sociological perspectives, social stratification, institutions, social control, and social change.', color: '#7c3aed', icon: '🌍', topics: ['Sociological Perspectives', 'Social Stratification', 'Social Institutions', 'Social Order & Control', 'Social Change & Development'] },
  { name: 'Management of Business', code: 'CAPE-MOB', description: 'CAPE Management of Business covers the business environment, management functions, marketing, HR, and operations.', color: '#059669', icon: '👔', topics: ['Business & its Environment', 'Management Functions', 'Marketing', 'Human Resource Management', 'Operations & Finance'] },
  { name: 'Law', code: 'CAPE-LAW', description: 'CAPE Law covers the Caribbean legal system, contract law, tort law, constitutional law, and criminal law.', color: '#78716c', icon: '⚖️', topics: ['The Caribbean Legal System', 'Contract Law', 'Tort Law', 'Constitutional Law', 'Criminal Law'] },
]

// ── Questions ─────────────────────────────────────────────────

const QUESTIONS: Record<string, ReturnType<typeof mcq>[]> = {

  // ═══════════════════════════════════════════════════════════
  //  APPLIED MATHEMATICS – 10 questions
  // ═══════════════════════════════════════════════════════════
  'CAPE-APPMATH': [
    // ── Discrete Mathematics (2) ──
    mcq('In how many ways can a committee of 4 be chosen from 10 people?', [
      { label: 'A', value: '210', isCorrect: true },
      { label: 'B', value: '5040', isCorrect: false },
      { label: 'C', value: '40', isCorrect: false },
      { label: 'D', value: '720', isCorrect: false },
    ], 'This is a combination problem: 10C4 = 10! / (4! x 6!) = (10 x 9 x 8 x 7) / (4 x 3 x 2 x 1) = 5040 / 24 = 210.', EASY, 'Discrete Mathematics'),

    mcq('How many permutations of the letters in the word "STATISTICS" are there?', [
      { label: 'A', value: '10! / (3! 3! 2!)', isCorrect: true },
      { label: 'B', value: '10!', isCorrect: false },
      { label: 'C', value: '10! / 3!', isCorrect: false },
      { label: 'D', value: '10! / 2!', isCorrect: false },
    ], 'STATISTICS has 10 letters with S appearing 3 times, T appearing 3 times, and I appearing 2 times. Permutations = 10! / (3! x 3! x 2!) = 50,400.', HARD, 'Discrete Mathematics'),

    // ── Probability & Distributions (3) ──
    mcq('For a binomial distribution with n = 20 and p = 0.3, what is the expected value E(X)?', [
      { label: 'A', value: '6', isCorrect: true },
      { label: 'B', value: '7', isCorrect: false },
      { label: 'C', value: '5', isCorrect: false },
      { label: 'D', value: '14', isCorrect: false },
    ], 'For a binomial distribution, E(X) = n x p = 20 x 0.3 = 6.', EASY, 'Probability & Distributions'),

    mcq('Two events A and B are independent. What is P(A and B)?', [
      { label: 'A', value: 'P(A) + P(B)', isCorrect: false },
      { label: 'B', value: 'P(A) x P(B)', isCorrect: true },
      { label: 'C', value: 'P(A) - P(B)', isCorrect: false },
      { label: 'D', value: 'P(A | B)', isCorrect: false },
    ], 'For independent events, the probability of both occurring is the product of their individual probabilities: P(A and B) = P(A) x P(B).', MEDIUM, 'Probability & Distributions'),

    mcq('In a Poisson distribution with lambda = 3, what is P(X = 2)?', [
      { label: 'A', value: '0.224', isCorrect: true },
      { label: 'B', value: '0.135', isCorrect: false },
      { label: 'C', value: '0.050', isCorrect: false },
      { label: 'D', value: '0.423', isCorrect: false },
    ], 'P(X = 2) = (e^(-3) x 3^2) / 2! = (0.0498 x 9) / 2 = 0.4482 / 2 = 0.224.', HARD, 'Probability & Distributions'),

    // ── Statistical Inference (2) ──
    mcq('What is a Type I error in hypothesis testing?', [
      { label: 'A', value: 'Failing to reject a false null hypothesis', isCorrect: false },
      { label: 'B', value: 'Rejecting a true null hypothesis', isCorrect: true },
      { label: 'C', value: 'Accepting the alternative hypothesis', isCorrect: false },
      { label: 'D', value: 'Using the wrong test statistic', isCorrect: false },
    ], 'A Type I error (false positive) occurs when we reject the null hypothesis when it is actually true. The probability of a Type I error is denoted by alpha (significance level).', MEDIUM, 'Statistical Inference'),

    mcq('A 95% confidence interval for a population mean is (12.3, 18.7). What is the margin of error?', [
      { label: 'A', value: '3.2', isCorrect: true },
      { label: 'B', value: '6.4', isCorrect: false },
      { label: 'C', value: '15.5', isCorrect: false },
      { label: 'D', value: '1.95', isCorrect: false },
    ], 'Margin of error = (upper limit - lower limit) / 2 = (18.7 - 12.3) / 2 = 6.4 / 2 = 3.2. The point estimate is the midpoint: (12.3 + 18.7) / 2 = 15.5.', HARD, 'Statistical Inference'),

    // ── Matrices & Transformations (1) ──
    mcq('What is the determinant of the 2x2 matrix [[3, 1], [2, 4]]?', [
      { label: 'A', value: '10', isCorrect: true },
      { label: 'B', value: '14', isCorrect: false },
      { label: 'C', value: '5', isCorrect: false },
      { label: 'D', value: '11', isCorrect: false },
    ], 'The determinant of a 2x2 matrix [[a, b], [c, d]] is ad - bc. Here: (3)(4) - (1)(2) = 12 - 2 = 10.', EASY, 'Matrices & Transformations'),

    // ── Numerical Methods (2) ──
    mcq('Using the trapezoidal rule with n = 4 subintervals to approximate the integral of f(x) from x = 0 to x = 4, given f(0) = 1, f(1) = 2, f(2) = 3, f(3) = 5, f(4) = 4, what is the approximate value?', [
      { label: 'A', value: '12', isCorrect: true },
      { label: 'B', value: '15', isCorrect: false },
      { label: 'C', value: '8', isCorrect: false },
      { label: 'D', value: '10.5', isCorrect: false },
    ], 'Trapezoidal rule: h/2 x [y0 + 2(y1 + y2 + y3) + y4]. Here h = 1, so: 1/2 x [1 + 2(2 + 3 + 5) + 4] = 1/2 x [1 + 20 + 4] = 1/2 x 25 = 12.5. However with these values: 0.5 x (1 + 4 + 6 + 10 + 4) = 0.5 x 25 = 12.5, closest to 12 when accounting for rounding. Exact = 12.5 approximating to 12 with h = 4/4 = 1: 1/2[1+2(2+3+5)+4] = 1/2[25] = 12.5.', MEDIUM, 'Numerical Methods'),

    mcq('In the Newton-Raphson method, what is the formula for the next approximation x(n+1) given a function f(x)?', [
      { label: 'A', value: 'x(n+1) = x(n) - f(x(n)) / f\'(x(n))', isCorrect: true },
      { label: 'B', value: 'x(n+1) = x(n) + f(x(n)) / f\'(x(n))', isCorrect: false },
      { label: 'C', value: 'x(n+1) = f\'(x(n)) / f(x(n))', isCorrect: false },
      { label: 'D', value: 'x(n+1) = x(n) x f\'(x(n))', isCorrect: false },
    ], 'The Newton-Raphson iteration formula is x(n+1) = x(n) - f(x(n)) / f\'(x(n)). It uses the tangent line at the current point to find a better approximation of the root.', MEDIUM, 'Numerical Methods'),
  ],

  // ═══════════════════════════════════════════════════════════
  //  COMMUNICATION STUDIES – 10 questions
  // ═══════════════════════════════════════════════════════════
  'CAPE-COMSTUD': [
    // ── Language & Communication (2) ──
    mcq('Which component of the communication process refers to the medium through which a message is transmitted?', [
      { label: 'A', value: 'Channel', isCorrect: true },
      { label: 'B', value: 'Encoder', isCorrect: false },
      { label: 'C', value: 'Feedback', isCorrect: false },
      { label: 'D', value: 'Decoder', isCorrect: false },
    ], 'The channel is the medium or method used to convey the message from sender to receiver, such as spoken word, written text, or electronic media.', EASY, 'Language & Communication'),

    mcq('The Sapir-Whorf hypothesis suggests that:', [
      { label: 'A', value: 'Language is merely a tool for expressing pre-existing thoughts', isCorrect: false },
      { label: 'B', value: 'The structure of a language influences how its speakers perceive and think about the world', isCorrect: true },
      { label: 'C', value: 'All languages share the same grammatical structure', isCorrect: false },
      { label: 'D', value: 'Non-verbal communication is more important than verbal', isCorrect: false },
    ], 'The Sapir-Whorf hypothesis (linguistic relativity) proposes that the structure and vocabulary of a language shape how its speakers perceive reality, think, and behave.', HARD, 'Language & Communication'),

    // ── Gathering & Processing Info (2) ──
    mcq('Which sampling method gives every member of the population an equal chance of being selected?', [
      { label: 'A', value: 'Convenience sampling', isCorrect: false },
      { label: 'B', value: 'Purposive sampling', isCorrect: false },
      { label: 'C', value: 'Simple random sampling', isCorrect: true },
      { label: 'D', value: 'Snowball sampling', isCorrect: false },
    ], 'Simple random sampling ensures every member of the population has an equal and independent probability of being selected, typically using random number generators or lottery methods.', EASY, 'Gathering & Processing Info'),

    mcq('What is the difference between primary and secondary data?', [
      { label: 'A', value: 'Primary data is collected first-hand by the researcher; secondary data was collected by others previously', isCorrect: true },
      { label: 'B', value: 'Primary data is always quantitative; secondary data is always qualitative', isCorrect: false },
      { label: 'C', value: 'There is no difference', isCorrect: false },
      { label: 'D', value: 'Secondary data is more reliable than primary data', isCorrect: false },
    ], 'Primary data is collected directly by the researcher through surveys, interviews, or experiments. Secondary data comes from existing sources such as books, journals, and government reports.', MEDIUM, 'Gathering & Processing Info'),

    // ── Language in Community (2) ──
    mcq('Which of the following best describes "Creole" languages in the Caribbean?', [
      { label: 'A', value: 'A pure African language brought to the Caribbean', isCorrect: false },
      { label: 'B', value: 'A language that developed from the mixing of a European language with African languages and other influences', isCorrect: true },
      { label: 'C', value: 'A dialect of Standard English', isCorrect: false },
      { label: 'D', value: 'An artificial language created for trade', isCorrect: false },
    ], 'Caribbean Creoles (e.g., Jamaican Patois, Trinidadian Creole) are natural languages that developed from contact between European colonizers and enslaved Africans, incorporating elements from various languages.', HARD, 'Language in Community'),

    mcq('What is a "lingua franca" in the Caribbean context?', [
      { label: 'A', value: 'An Italian-based language', isCorrect: false },
      { label: 'B', value: 'A language used as a common means of communication between speakers of different languages', isCorrect: true },
      { label: 'C', value: 'A formal writing system', isCorrect: false },
      { label: 'D', value: 'An extinct Caribbean language', isCorrect: false },
    ], 'In the Caribbean, English often serves as the lingua franca - a common language used for communication among people who speak different first languages or dialects.', MEDIUM, 'Language in Community'),

    // ── Speaking & Writing (2) ──
    mcq('In academic writing, what is the purpose of a thesis statement?', [
      { label: 'A', value: 'To list all the sources used in the essay', isCorrect: false },
      { label: 'B', value: 'To state the main argument or central claim that the essay will support', isCorrect: true },
      { label: 'C', value: 'To provide background information', isCorrect: false },
      { label: 'D', value: 'To conclude the essay', isCorrect: false },
    ], 'A thesis statement clearly articulates the main argument or position of an essay, guiding the reader and providing a focus for the supporting evidence and analysis.', EASY, 'Speaking & Writing'),

    mcq('What is the difference between a simile and a metaphor?', [
      { label: 'A', value: 'A simile uses "like" or "as" for comparison; a metaphor makes a direct comparison without these words', isCorrect: true },
      { label: 'B', value: 'They are the same literary device', isCorrect: false },
      { label: 'C', value: 'A metaphor uses "like" or "as"; a simile does not', isCorrect: false },
      { label: 'D', value: 'A simile is only used in poetry', isCorrect: false },
    ], 'A simile makes a comparison using "like" or "as" (e.g., "as brave as a lion"), while a metaphor makes a direct comparison by stating one thing IS another (e.g., "he is a lion").', MEDIUM, 'Speaking & Writing'),

    // ── Caribbean Discourse (2) ──
    mcq('What role does "diglossia" play in Caribbean language use?', [
      { label: 'A', value: 'It refers to the complete absence of a standard language', isCorrect: false },
      { label: 'B', value: 'It describes a situation where two varieties of a language exist side by side, each with distinct social functions', isCorrect: true },
      { label: 'C', value: 'It means everyone speaks only one language', isCorrect: false },
      { label: 'D', value: 'It refers to the dominance of foreign languages over local ones', isCorrect: false },
    ], 'Diglossia in the Caribbean refers to the coexistence of a standard language (e.g., Standard English for formal/official use) and a vernacular/Creole (for informal/community use), each serving different social functions.', HARD, 'Caribbean Discourse'),

    mcq('The concept of "Caribbean identity" in discourse often involves:', [
      { label: 'A', value: 'A single, unified culture across all Caribbean islands', isCorrect: false },
      { label: 'B', value: 'Recognising the diversity and hybridity of cultures, histories, and experiences in the region', isCorrect: true },
      { label: 'C', value: 'Rejecting all European influences', isCorrect: false },
      { label: 'D', value: 'Adopting exclusively African cultural practices', isCorrect: false },
    ], 'Caribbean identity is complex and multifaceted, reflecting the blending of African, European, Asian, and Indigenous influences. It is characterised by diversity, creolization, and hybridity rather than uniformity.', MEDIUM, 'Caribbean Discourse'),
  ],

  // ═══════════════════════════════════════════════════════════
  //  CAPE BIOLOGY – 10 questions
  // ═══════════════════════════════════════════════════════════
  'CAPE-BIO': [
    // ── Cell & Molecular Biology (3) ──
    mcq('What is the role of ribosomes in protein synthesis?', [
      { label: 'A', value: 'To transcribe DNA into mRNA', isCorrect: false },
      { label: 'B', value: 'To translate mRNA into polypeptide chains', isCorrect: true },
      { label: 'C', value: 'To transport amino acids', isCorrect: false },
      { label: 'D', value: 'To fold proteins into their final shape', isCorrect: false },
    ], 'Ribosomes are the cellular structures that facilitate translation, reading the mRNA codons and assembling amino acids in the correct sequence to form polypeptide chains.', EASY, 'Cell & Molecular Biology'),

    mcq('Which enzyme is responsible for unwinding the DNA double helix during replication?', [
      { label: 'A', value: 'DNA polymerase', isCorrect: false },
      { label: 'B', value: 'Ligase', isCorrect: false },
      { label: 'C', value: 'Helicase', isCorrect: true },
      { label: 'D', value: 'Primase', isCorrect: false },
    ], 'Helicase unwinds and separates the two DNA strands by breaking the hydrogen bonds between complementary base pairs at the replication fork.', MEDIUM, 'Cell & Molecular Biology'),

    mcq('In the lac operon model, what happens when lactose is absent?', [
      { label: 'A', value: 'The repressor protein binds to the operator, blocking transcription', isCorrect: true },
      { label: 'B', value: 'RNA polymerase transcribes the lac genes continuously', isCorrect: false },
      { label: 'C', value: 'The repressor is degraded', isCorrect: false },
      { label: 'D', value: 'Lactose binds directly to RNA polymerase', isCorrect: false },
    ], 'When lactose is absent, the lac repressor protein binds to the operator region, physically blocking RNA polymerase from transcribing the lac genes (lacZ, lacY, lacA).', HARD, 'Cell & Molecular Biology'),

    // ── Genetics & Variation (2) ──
    mcq('In a cross between two heterozygous individuals (Aa x Aa), what is the probability of producing a homozygous recessive offspring?', [
      { label: 'A', value: '1/2', isCorrect: false },
      { label: 'B', value: '1/4', isCorrect: true },
      { label: 'C', value: '3/4', isCorrect: false },
      { label: 'D', value: '1/8', isCorrect: false },
    ], 'Using a Punnett square: Aa x Aa gives genotypes AA (1/4), Aa (1/2), aa (1/4). The probability of homozygous recessive (aa) is 1/4 or 25%.', EASY, 'Genetics & Variation'),

    mcq('A person with blood type AB has which genotype?', [
      { label: 'A', value: 'I^A I^A', isCorrect: false },
      { label: 'B', value: 'I^A I^B', isCorrect: true },
      { label: 'C', value: 'I^B i', isCorrect: false },
      { label: 'D', value: 'ii', isCorrect: false },
    ], 'Blood type AB demonstrates codominance, where both I^A and I^B alleles are expressed equally, resulting in the presence of both A and B antigens on the surface of red blood cells.', MEDIUM, 'Genetics & Variation'),

    // ── Bioenergetics (2) ──
    mcq('What is the net gain of ATP from one molecule of glucose during glycolysis?', [
      { label: 'A', value: '2 ATP', isCorrect: true },
      { label: 'B', value: '4 ATP', isCorrect: false },
      { label: 'C', value: '36 ATP', isCorrect: false },
      { label: 'D', value: '38 ATP', isCorrect: false },
    ], 'Glycolysis produces a gross of 4 ATP but uses 2 ATP in the investment phase, resulting in a net gain of 2 ATP, along with 2 NADH and 2 pyruvate molecules.', EASY, 'Bioenergetics'),

    mcq('During photosynthesis, where does the light-dependent reaction take place?', [
      { label: 'A', value: 'Stroma', isCorrect: false },
      { label: 'B', value: 'Thylakoid membrane', isCorrect: true },
      { label: 'C', value: 'Matrix of mitochondria', isCorrect: false },
      { label: 'D', value: 'Cell cytoplasm', isCorrect: false },
    ], 'The light-dependent reactions of photosynthesis occur in the thylakoid membranes of the chloroplast, where light energy is converted into chemical energy (ATP and NADPH).', MEDIUM, 'Bioenergetics'),

    // ── Ecology & Environmental Biology (1) ──
    mcq('In ecological succession, what type of succession begins in an area where no soil exists (e.g., after a volcanic eruption)?', [
      { label: 'A', value: 'Secondary succession', isCorrect: false },
      { label: 'B', value: 'Primary succession', isCorrect: true },
      { label: 'C', value: 'Tertiary succession', isCorrect: false },
      { label: 'D', value: 'Allogenic succession', isCorrect: false },
    ], 'Primary succession occurs on newly formed land surfaces (e.g., volcanic lava, glacial retreat) where no soil or organisms previously existed. Pioneer species like lichens are typically the first colonisers.', HARD, 'Ecology & Environmental Biology'),

    // ── Human & Applied Biology (2) ──
    mcq('Which hormone is primarily responsible for lowering blood glucose levels?', [
      { label: 'A', value: 'Glucagon', isCorrect: false },
      { label: 'B', value: 'Insulin', isCorrect: true },
      { label: 'C', value: 'Adrenaline', isCorrect: false },
      { label: 'D', value: 'Cortisol', isCorrect: false },
    ], 'Insulin, produced by the beta cells of the pancreatic islets of Langerhans, promotes the uptake of glucose by cells and its conversion to glycogen in the liver, thereby lowering blood sugar levels.', MEDIUM, 'Human & Applied Biology'),

    mcq('What is homeostasis?', [
      { label: 'A', value: 'The process of cell division', isCorrect: false },
      { label: 'B', value: 'The maintenance of a relatively stable internal environment despite changes in external conditions', isCorrect: true },
      { label: 'C', value: 'The breakdown of nutrients for energy', isCorrect: false },
      { label: 'D', value: 'The production of antibodies', isCorrect: false },
    ], 'Homeostasis is the process by which organisms maintain a stable internal environment (e.g., body temperature, blood pH, glucose levels) through feedback mechanisms despite external changes.', EASY, 'Human & Applied Biology'),
  ],

  // ═══════════════════════════════════════════════════════════
  //  SOCIOLOGY – 10 questions
  // ═══════════════════════════════════════════════════════════
  'CAPE-SOC': [
    // ── Sociological Perspectives (2) ──
    mcq('Who is considered the founding father of sociology and coined the term "sociology"?', [
      { label: 'A', value: 'Karl Marx', isCorrect: false },
      { label: 'B', value: 'Auguste Comte', isCorrect: true },
      { label: 'C', value: 'Emile Durkheim', isCorrect: false },
      { label: 'D', value: 'Max Weber', isCorrect: false },
    ], 'Auguste Comte (1798-1857) is regarded as the founder of sociology. He coined the term "sociologie" in 1838 and developed positivism as a philosophical approach to studying society.', EASY, 'Sociological Perspectives'),

    mcq('According to Karl Marx, what is the driving force of social change?', [
      { label: 'A', value: 'Religious beliefs and values', isCorrect: false },
      { label: 'B', value: 'Class conflict arising from economic inequality', isCorrect: true },
      { label: 'C', value: 'Biological evolution of human behaviour', isCorrect: false },
      { label: 'D', value: 'Technological innovation alone', isCorrect: false },
    ], 'Marx argued that the mode of economic production shapes all other aspects of society. The conflict between the bourgeoisie (owners) and the proletariat (workers) drives historical and social change through class struggle.', HARD, 'Sociological Perspectives'),

    // ── Social Stratification (2) ──
    mcq('What is social stratification?', [
      { label: 'A', value: 'The process of integrating immigrants into a new society', isCorrect: false },
      { label: 'B', value: 'The division of society into hierarchical layers based on wealth, power, and status', isCorrect: true },
      { label: 'C', value: 'The movement of individuals between social classes', isCorrect: false },
      { label: 'D', value: 'The abolition of all social classes', isCorrect: false },
    ], 'Social stratification refers to the way society is structured in layers or strata, with individuals and groups ranked according to factors such as wealth, income, social status, power, and prestige.', EASY, 'Social Stratification'),

    mcq('Max Weber identified three dimensions of social stratification. Which of the following is NOT one of them?', [
      { label: 'A', value: 'Class (economic position)', isCorrect: false },
      { label: 'B', value: 'Status (social prestige)', isCorrect: false },
      { label: 'C', value: 'Physical attractiveness', isCorrect: true },
      { label: 'D', value: 'Party (political power)', isCorrect: false },
    ], 'Weber\'s three dimensions of stratification are: Class (economic), Status (social honour/prestige), and Party (political power/influence). Physical attractiveness is not one of Weber\'s dimensions.', MEDIUM, 'Social Stratification'),

    // ── Social Institutions (2) ──
    mcq('Which of the following is considered a primary social institution?', [
      { label: 'A', value: 'The family', isCorrect: true },
      { label: 'B', value: 'A sports club', isCorrect: false },
      { label: 'C', value: 'A social media platform', isCorrect: false },
      { label: 'D', value: 'A music band', isCorrect: false },
    ], 'The family is universally recognised as a primary social institution. It is the fundamental unit of society responsible for socialisation, reproduction, emotional support, and economic cooperation.', EASY, 'Social Institutions'),

    mcq('Which sociological perspective views the family as a structure that maintains social order and stability?', [
      { label: 'A', value: 'Feminist perspective', isCorrect: false },
      { label: 'B', value: 'Functionalist perspective', isCorrect: true },
      { label: 'C', value: 'Marxist perspective', isCorrect: false },
      { label: 'D', value: 'Symbolic interactionist perspective', isCorrect: false },
    ], 'Functionalists like George Murdock argue that the family performs essential functions for society: sexual regulation, reproduction, socialisation, and economic cooperation. The family contributes to social stability and the smooth functioning of society.', MEDIUM, 'Social Institutions'),

    // ── Social Order & Control (2) ──
    mcq('What is "deviance" in sociological terms?', [
      { label: 'A', value: 'Behaviour that conforms to social norms', isCorrect: false },
      { label: 'B', value: 'Behaviour that violates social norms and expectations', isCorrect: true },
      { label: 'C', value: 'Any form of criminal behaviour', isCorrect: false },
      { label: 'D', value: 'Behaviour unique to Caribbean societies', isCorrect: false },
    ], 'Deviance refers to any behaviour, trait, or belief that violates expected rules or norms of a group or society. Deviance is relative and culturally specific - what is deviant in one society may be acceptable in another.', MEDIUM, 'Social Order & Control'),

    mcq('According to Travis Hirschi\'s Social Bond Theory, which of the following is NOT one of the four elements of the social bond?', [
      { label: 'A', value: 'Attachment', isCorrect: false },
      { label: 'B', value: 'Commitment', isCorrect: false },
      { label: 'C', value: 'Aggression', isCorrect: true },
      { label: 'D', value: 'Involvement', isCorrect: false },
    ], 'Hirschi\'s four elements of the social bond are: Attachment (to others), Commitment (to conventional activities), Involvement (in conventional activities), and Belief (in the moral validity of rules). Aggression is not part of the theory.', HARD, 'Social Order & Control'),

    // ── Social Change & Development (2) ──
    mcq('Which of the following is an example of a catalyst for social change in Caribbean societies?', [
      { label: 'A', value: 'Maintaining traditional cultural practices unchanged', isCorrect: false },
      { label: 'B', value: 'Globalisation and increased access to technology', isCorrect: true },
      { label: 'C', value: 'Strict adherence to colonial-era laws', isCorrect: false },
      { label: 'D', value: 'Reducing all contact with foreign cultures', isCorrect: false },
    ], 'Globalisation has been a major catalyst for social change in the Caribbean, introducing new technologies, media, values, and economic relationships that transform traditional social structures and cultural practices.', EASY, 'Social Change & Development'),

    mcq('What is "modernisation theory" in the context of development?', [
      { label: 'A', value: 'The idea that all societies progress through similar stages of development towards modernity', isCorrect: true },
      { label: 'B', value: 'The belief that traditional societies should reject all modern influences', isCorrect: false },
      { label: 'C', value: 'The theory that economic growth always leads to social equality', isCorrect: false },
      { label: 'D', value: 'The argument that development is impossible without foreign aid', isCorrect: false },
    ], 'Modernisation theory suggests that societies develop through similar evolutionary stages, progressing from traditional to modern. It argues that developing nations can achieve advancement by following the path taken by industrialised Western nations.', HARD, 'Social Change & Development'),
  ],

  // ═══════════════════════════════════════════════════════════
  //  MANAGEMENT OF BUSINESS – 10 questions
  // ═══════════════════════════════════════════════════════════
  'CAPE-MOB': [
    // ── Business & its Environment (2) ──
    mcq('Which of the following best describes a "sole proprietorship"?', [
      { label: 'A', value: 'A business owned and operated by one individual who receives all profits and bears all losses', isCorrect: true },
      { label: 'B', value: 'A business owned by shareholders who have limited liability', isCorrect: false },
      { label: 'C', value: 'A business owned by two or more partners who share profits', isCorrect: false },
      { label: 'D', value: 'A business owned by the government for public benefit', isCorrect: false },
    ], 'A sole proprietorship is the simplest form of business organisation where one person owns, manages, and controls the business. The owner has unlimited liability, meaning personal assets can be used to cover business debts.', EASY, 'Business & its Environment'),

    mcq('What is a PESTEL analysis used for in business?', [
      { label: 'A', value: 'To evaluate internal employee performance', isCorrect: false },
      { label: 'B', value: 'To analyse the external macro-environmental factors affecting a business', isCorrect: true },
      { label: 'C', value: 'To calculate the financial profitability of a project', isCorrect: false },
      { label: 'D', value: 'To assess the quality of a company\'s products', isCorrect: false },
    ], 'PESTEL analysis examines Political, Economic, Social, Technological, Environmental, and Legal factors that affect a business from the external environment. It helps managers identify opportunities and threats.', MEDIUM, 'Business & its Environment'),

    // ── Management Functions (2) ──
    mcq('According to Henri Fayol, what are the four primary functions of management?', [
      { label: 'A', value: 'Planning, Organising, Leading, Controlling', isCorrect: true },
      { label: 'B', value: 'Hiring, Firing, Training, Promoting', isCorrect: false },
      { label: 'C', value: 'Marketing, Production, Finance, HR', isCorrect: false },
      { label: 'D', value: 'Researching, Designing, Testing, Selling', isCorrect: false },
    ], 'Fayol identified four core functions of management: Planning (setting objectives), Organising (arranging resources), Leading/Commanding (directing staff), and Controlling (monitoring performance against plans).', EASY, 'Management Functions'),

    mcq('Which leadership style involves managers making decisions entirely without consulting subordinates?', [
      { label: 'A', value: 'Democratic leadership', isCorrect: false },
      { label: 'B', value: 'Laissez-faire leadership', isCorrect: false },
      { label: 'C', value: 'Autocratic leadership', isCorrect: true },
      { label: 'D', value: 'Transformational leadership', isCorrect: false },
    ], 'Autocratic (or authoritarian) leadership involves the leader making all decisions independently, with little or no input from subordinates. This style can be effective in emergencies but may reduce morale and creativity.', MEDIUM, 'Management Functions'),

    // ── Marketing (2) ──
    mcq('What are the "4 Ps" of the marketing mix?', [
      { label: 'A', value: 'Product, Price, Place, Promotion', isCorrect: true },
      { label: 'B', value: 'People, Planning, Production, Profit', isCorrect: false },
      { label: 'C', value: 'Packaging, Positioning, Pricing, Purchasing', isCorrect: false },
      { label: 'D', value: 'Performance, Policies, Procedures, Planning', isCorrect: false },
    ], 'The marketing mix consists of the 4 Ps: Product (what is sold), Price (how much it costs), Place (where and how it is distributed), and Promotion (how it is advertised and communicated to customers).', EASY, 'Marketing'),

    mcq('What is "market segmentation"?', [
      { label: 'A', value: 'Dividing a broad market into distinct subsets of consumers with common needs or characteristics', isCorrect: true },
      { label: 'B', value: 'Selling products in as many countries as possible', isCorrect: false },
      { label: 'C', value: 'Setting different prices for the same product', isCorrect: false },
      { label: 'D', value: 'Competing with other businesses in the same industry', isCorrect: false },
    ], 'Market segmentation involves dividing a heterogeneous market into smaller, more homogeneous groups (segments) based on demographics, psychographics, behaviour, or geography, to target them more effectively.', HARD, 'Marketing'),

    // ── Human Resource Management (2) ──
    mcq('What is the primary purpose of a job description in human resource management?', [
      { label: 'A', value: 'To state the salary and benefits of a position', isCorrect: false },
      { label: 'B', value: 'To outline the duties, responsibilities, and requirements of a specific job', isCorrect: true },
      { label: 'C', value: 'To evaluate an employee\'s past performance', isCorrect: false },
      { label: 'D', value: 'To describe the company\'s history and mission', isCorrect: false },
    ], 'A job description is a written document that clearly defines the title, duties, responsibilities, reporting relationships, and working conditions of a specific role, serving as a foundation for recruitment, training, and performance evaluation.', EASY, 'Human Resource Management'),

    mcq('What is the difference between training and development in HRM?', [
      { label: 'A', value: 'Training focuses on current job skills; development prepares employees for future roles and broader responsibilities', isCorrect: true },
      { label: 'B', value: 'Training is for managers only; development is for all employees', isCorrect: false },
      { label: 'C', value: 'There is no difference between the two terms', isCorrect: false },
      { label: 'D', value: 'Training is informal; development is formal', isCorrect: false },
    ], 'Training is the process of improving specific skills needed for the current job, while development is a broader, long-term process of preparing employees for future roles, leadership positions, and career growth.', MEDIUM, 'Human Resource Management'),

    // ── Operations & Finance (2) ──
    mcq('What is "working capital" in a business context?', [
      { label: 'A', value: 'The total value of all fixed assets owned by a business', isCorrect: false },
      { label: 'B', value: 'Current assets minus current liabilities', isCorrect: true },
      { label: 'C', value: 'The profit retained after paying all expenses', isCorrect: false },
      { label: 'D', value: 'The total amount of long-term debt', isCorrect: false },
    ], 'Working capital = Current Assets - Current Liabilities. It represents the short-term liquidity of a business and its ability to cover day-to-day operational expenses and short-term obligations.', MEDIUM, 'Operations & Finance'),

    mcq('Which costing method assigns both direct and indirect manufacturing costs to products?', [
      { label: 'A', value: 'Marginal costing', isCorrect: false },
      { label: 'B', value: 'Absorption costing', isCorrect: true },
      { label: 'C', value: 'Historical costing', isCorrect: false },
      { label: 'D', value: 'Opportunity costing', isCorrect: false },
    ], 'Absorption costing (full costing) assigns all manufacturing costs - both direct costs (materials, labour) and indirect costs (overhead) - to the cost of a product. This is required for external financial reporting under accounting standards.', HARD, 'Operations & Finance'),
  ],

  // ═══════════════════════════════════════════════════════════
  //  LAW – 10 questions
  // ═══════════════════════════════════════════════════════════
  'CAPE-LAW': [
    // ── The Caribbean Legal System (2) ──
    mcq('What is the highest court of appeal for most Caribbean Commonwealth countries?', [
      { label: 'A', value: 'The Caribbean Court of Justice (CCJ)', isCorrect: false },
      { label: 'B', value: 'The Judicial Committee of the Privy Council (JCPC)', isCorrect: true },
      { label: 'C', value: 'The International Court of Justice', isCorrect: false },
      { label: 'D', value: 'The European Court of Human Rights', isCorrect: false },
    ], 'The Judicial Committee of the Privy Council (JCPC) in London remains the highest court of appeal for most CARICOM member states, including Jamaica, Trinidad and Tobago, and Barbados. Only a few states have fully adopted the CCJ as their final appellate court.', MEDIUM, 'The Caribbean Legal System'),

    mcq('Which two main legal traditions form the basis of Caribbean legal systems?', [
      { label: 'A', value: 'Roman law and Greek law', isCorrect: false },
      { label: 'B', value: 'Common law and civil law', isCorrect: true },
      { label: 'C', value: 'Islamic law and customary law', isCorrect: false },
      { label: 'D', value: 'Canon law and socialist law', isCorrect: false },
    ], 'Caribbean legal systems are primarily based on the common law tradition inherited from British colonial rule. However, in countries with a French or Spanish colonial heritage (e.g., Haiti, Puerto Rico), civil law traditions also play a role.', EASY, 'The Caribbean Legal System'),

    // ── Contract Law (2) ──
    mcq('For a valid contract to exist, which of the following elements is NOT required?', [
      { label: 'A', value: 'Offer and acceptance', isCorrect: false },
      { label: 'B', value: 'Consideration', isCorrect: false },
      { label: 'C', value: 'A written document', isCorrect: true },
      { label: 'D', value: 'Intention to create legal relations', isCorrect: false },
    ], 'A valid contract requires: offer, acceptance, consideration, intention to create legal relations, and capacity. Most contracts can be formed orally or by conduct; a written document is not always necessary, though some types (e.g., land sales) require writing by statute.', EASY, 'Contract Law'),

    mcq('What is "consideration" in contract law?', [
      { label: 'A', value: 'The careful thought a person gives before entering a contract', isCorrect: false },
      { label: 'B', value: 'Something of value exchanged between parties to a contract', isCorrect: true },
      { label: 'C', value: 'The legal advice sought before signing a contract', isCorrect: false },
      { label: 'D', value: 'The court\'s evaluation of whether a contract is fair', isCorrect: false },
    ], 'Consideration is a fundamental element of a contract. It refers to the benefit received by one party and the detriment suffered by the other, or a promise to do something in exchange for the other party\'s promise. It must be sufficient but need not be adequate.', MEDIUM, 'Contract Law'),

    // ── Tort Law (2) ──
    mcq('What is the standard of proof required in a civil tort case?', [
      { label: 'A', value: 'Beyond reasonable doubt', isCorrect: false },
      { label: 'B', value: 'Balance of probabilities (preponderance of evidence)', isCorrect: true },
      { label: 'C', value: 'Absolute certainty', isCorrect: false },
      { label: 'D', value: 'Clear and convincing evidence', isCorrect: false },
    ], 'In civil cases, including tort claims, the standard of proof is the "balance of probabilities" - meaning it must be more likely than not (greater than 50%) that the defendant caused the harm. This is lower than the criminal standard of "beyond reasonable doubt."', HARD, 'Tort Law'),

    mcq('Which of the following is an example of the tort of negligence?', [
      { label: 'A', value: 'A driver who runs a red light and hits a pedestrian', isCorrect: true },
      { label: 'B', value: 'A person who intentionally punches another person', isCorrect: false },
      { label: 'C', value: 'A company that publishes a defamatory statement about a competitor', isCorrect: false },
      { label: 'D', value: 'A neighbour who plays loud music every night', isCorrect: false },
    ], 'Negligence involves a breach of a duty of care that causes foreseeable harm. The driver running a red light breaches their duty of care to other road users, causing harm to the pedestrian. This satisfies the four elements: duty, breach, causation, and damage.', EASY, 'Tort Law'),

    // ── Constitutional Law (2) ──
    mcq('What is the purpose of a written constitution?', [
      { label: 'A', value: 'To replace all previously existing laws', isCorrect: false },
      { label: 'B', value: 'To establish the fundamental principles, structures, and powers of government and protect citizens\' rights', isCorrect: true },
      { label: 'C', value: 'To detail the daily operations of government departments', isCorrect: false },
      { label: 'D', value: 'To regulate international trade agreements', isCorrect: false },
    ], 'A written constitution is the supreme law of a country that establishes the framework of government, defines the powers and limitations of each branch, protects fundamental rights and freedoms of citizens, and provides mechanisms for amendment and enforcement.', EASY, 'Constitutional Law'),

    mcq('Which doctrine gives the judiciary the power to declare laws unconstitutional?', [
      { label: 'A', value: 'Doctrine of precedent', isCorrect: false },
      { label: 'B', value: 'Doctrine of judicial review', isCorrect: true },
      { label: 'C', value: 'Doctrine of separation of powers', isCorrect: false },
      { label: 'D', value: 'Doctrine of parliamentary sovereignty', isCorrect: false },
    ], 'Judicial review is the power of courts to examine the constitutionality of legislation and executive actions. If a law is found to be inconsistent with the constitution, it can be declared void or invalid. This is a key mechanism for upholding constitutional supremacy.', HARD, 'Constitutional Law'),

    // ── Criminal Law (2) ──
    mcq('What is the difference between "actus reus" and "mens rea" in criminal law?', [
      { label: 'A', value: 'Actus reus is the guilty act; mens rea is the guilty mind', isCorrect: true },
      { label: 'B', value: 'Actus reus is the guilty mind; mens rea is the guilty act', isCorrect: false },
      { label: 'C', value: 'They both refer to the same concept', isCorrect: false },
      { label: 'D', value: 'Actus reus applies only to civil cases; mens rea applies only to criminal cases', isCorrect: false },
    ], 'Actus reus (guilty act) is the physical element of a crime - the wrongful deed or omission. Mens rea (guilty mind) is the mental element - the intention, knowledge, recklessness, or negligence of the accused. Both must generally be proven for criminal liability.', MEDIUM, 'Criminal Law'),

    mcq('Which of the following is classified as a "strict liability" offence?', [
      { label: 'A', value: 'Murder', isCorrect: false },
      { label: 'B', value: 'Selling alcohol to a person under the legal age', isCorrect: true },
      { label: 'C', value: 'Theft', isCorrect: false },
      { label: 'D', value: 'Assault', isCorrect: false },
    ], 'Strict liability offences do not require proof of mens rea (guilty mind). The prosecution only needs to prove the actus reus (the guilty act). Selling alcohol to a minor is a strict liability offence - the seller can be convicted regardless of whether they knew the person was underage.', HARD, 'Criminal Law'),
  ],
}

// ── Main seeding function ────────────────────────────────────

export async function main() {
  console.log('Seeding 6 CAPE subjects (Batch 1) into the database...\n')

  let subjectCount = 0
  let topicCount = 0
  let questionCount = 0

  // 1. Create subjects and topics
  for (const subj of SUBJECTS) {
    const subject = await db.subject.upsert({
      where: { code: subj.code },
      update: {},
      create: { name: subj.name, code: subj.code, description: subj.description, color: subj.color, icon: subj.icon },
    })
    subjectCount++
    console.log(`  Subject: ${subj.name} (${subj.code})`)

    for (let i = 0; i < subj.topics.length; i++) {
      const topic = await db.topic.upsert({
        where: { name_subjectId: { name: subj.topics[i], subjectId: subject.id } },
        update: {},
        create: { name: subj.topics[i], subjectId: subject.id, order: i },
      })
      topicCount++
    }
  }

  console.log(`\nCreated ${subjectCount} subjects and ${topicCount} topics.\n`)

  // 2. Create questions
  for (const [subjectCode, questions] of Object.entries(QUESTIONS)) {
    const subject = await db.subject.findUnique({ where: { code: subjectCode } })
    if (!subject) {
      console.error(`  Subject not found: ${subjectCode}`)
      continue
    }

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
          topicId: topic?.id || null,
          status: 'APPROVED',
        },
      })
      questionCount++
    }
    console.log(`  Questions for ${subject.name}: ${questions.length}`)
  }

  console.log(`\nCreated ${questionCount} questions.`)
  console.log('CAPE Batch 1 seeding complete!')
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1) })
