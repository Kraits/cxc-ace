/**
 * CXC Ace – CSEC Part 1 Seed File
 * Adds 8 new CSEC subjects with 15 MCQ questions each (120 total)
 *
 * Subjects: English B, Social Studies, IT, POB, POA, Economics, Spanish, French
 *
 * Usage: DATABASE_URL=<turso_url> DATABASE_AUTH_TOKEN=<token> npx tsx prisma/seed-new-csec-part1.ts
 */
import { PrismaClient, Difficulty } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

const adapter = new PrismaLibSQL({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN || undefined,
})

const db = new PrismaClient({ adapter } as never)

// ── Helpers ──────────────────────────────────────────────────

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

// ── 8 New CSEC Subjects ──────────────────────────────────────

const SUBJECTS = [
  { name: 'English B (Literature)', code: 'CSEC-ENGB', description: 'CSEC English B (Literature)', color: '#8b5cf6', icon: '📚', topics: ['Poetry', 'Drama', 'Prose Fiction', 'Literary Devices', 'Shakespeare'] },
  { name: 'Social Studies', code: 'CSEC-SOSTUD', description: 'CSEC Social Studies', color: '#0ea5e9', icon: '🏛️', topics: ['Individual & Society', 'Family', 'Education', 'Religion', 'Government & Politics', 'Caribbean Social Issues'] },
  { name: 'Information Technology', code: 'CSEC-IT', description: 'CSEC Information Technology', color: '#06b6d4', icon: '💻', topics: ['Hardware', 'Software', 'Networks & Communications', 'Programming', 'Database Management', 'Social & Ethical Issues'] },
  { name: 'Principles of Business', code: 'CSEC-POB', description: 'CSEC Principles of Business', color: '#84cc16', icon: '💼', topics: ['The Business Environment', 'Establishing a Business', 'Business Finance', 'Marketing', 'Production', 'Human Resource Management'] },
  { name: 'Principles of Accounts', code: 'CSEC-POA', description: 'CSEC Principles of Accounts', color: '#a3a3a3', icon: '📊', topics: ['The Accounting Equation', 'Books of Original Entry', 'Ledger Accounts', 'Financial Statements', 'Partnership Accounts', 'Control Systems'] },
  { name: 'Economics', code: 'CSEC-ECO', description: 'CSEC Economics', color: '#eab308', icon: '📈', topics: ['The Nature of Economics', 'Demand & Supply', 'Market Structures', 'National Income', 'Money & Banking', 'International Trade'] },
  { name: 'Spanish', code: 'CSEC-SPAN', description: 'CSEC Spanish', color: '#dc2626', icon: '🇪🇸', topics: ['Vocabulary & Expressions', 'Grammar & Conjugation', 'Reading Comprehension', 'Listening Comprehension', 'Caribbean Context', 'Written Expression'] },
  { name: 'French', code: 'CSEC-FR', description: 'CSEC French', color: '#2563eb', icon: '🇫🇷', topics: ['Vocabulary & Expressions', 'Grammar & Conjugation', 'Reading Comprehension', 'Listening Comprehension', 'Caribbean Context', 'Written Expression'] },
]

// ── Questions ────────────────────────────────────────────────

const QUESTIONS: Record<string, ReturnType<typeof mcq>[]> = {

  // ─── English B (Literature): 15 questions ───────────────────
  'CSEC-ENGB': [
    // Poetry (3)
    mcq('What is the rhyme scheme of a Shakespearean sonnet?', [
      { label: 'A', value: 'ABBA CDDC EFGEFE', isCorrect: false },
      { label: 'B', value: 'ABAB CDCD EFEF GG', isCorrect: true },
      { label: 'C', value: 'AABB CCDD EEFF GG', isCorrect: false },
      { label: 'D', value: 'ABCB DEFE GHIJ KK', isCorrect: false },
    ], 'A Shakespearean (English) sonnet has the rhyme scheme ABAB CDCD EFEF GG, consisting of three quatrains and a closing couplet.', MEDIUM, 'Poetry'),
    mcq('What is a simile?', [
      { label: 'A', value: 'A comparison using "like" or "as"', isCorrect: true },
      { label: 'B', value: 'A direct comparison stating one thing IS another', isCorrect: false },
      { label: 'C', value: 'An extreme exaggeration for effect', isCorrect: false },
      { label: 'D', value: 'Giving human qualities to non-human things', isCorrect: false },
    ], 'A simile is a figure of speech that compares two unlike things using the words "like" or "as", e.g., "Her eyes sparkled like diamonds."', EASY, 'Literary Devices'),
    mcq('In the poem "Once Upon a Time" by Gabriel Okara, what does the speaker long to recover?', [
      { label: 'A', value: 'His lost wealth and status', isCorrect: false },
      { label: 'B', value: 'The sincerity and warmth of his childhood self', isCorrect: true },
      { label: 'C', value: 'His ability to write poetry', isCorrect: false },
      { label: 'D', value: 'His relationship with his father', isCorrect: false },
    ], 'In "Once Upon a Time," the speaker mourns the loss of his genuine, authentic childhood nature and wishes his son to teach him how to laugh and smile sincerely again.', MEDIUM, 'Poetry'),

    // Drama (3)
    mcq('In a Shakespearean play, what is a soliloquy?', [
      { label: 'A', value: 'A dialogue between two characters on stage', isCorrect: false },
      { label: 'B', value: 'A speech by a character alone on stage, revealing inner thoughts', isCorrect: true },
      { label: 'C', value: 'A group of actors speaking in unison', isCorrect: false },
      { label: 'D', value: 'A song performed between acts', isCorrect: false },
    ], 'A soliloquy is a dramatic device where a character speaks alone on stage, revealing their innermost thoughts, feelings, and motivations to the audience.', EASY, 'Drama'),
    mcq('What is dramatic irony?', [
      { label: 'A', value: 'When a character says the opposite of what they mean', isCorrect: false },
      { label: 'B', value: 'When the audience knows something that the characters on stage do not', isCorrect: true },
      { label: 'C', value: 'When the ending of a play is unexpectedly happy', isCorrect: false },
      { label: 'D', value: 'When two characters exchange witty remarks', isCorrect: false },
    ], 'Dramatic irony occurs when the audience is aware of important information that the characters are not, creating tension, suspense, or humour.', MEDIUM, 'Drama'),
    mcq('In "The Tempest" by Shakespeare, who is the rightful Duke of Milan?', [
      { label: 'A', value: 'Caliban', isCorrect: false },
      { label: 'B', value: 'Ariel', isCorrect: false },
      { label: 'C', value: 'Prospero', isCorrect: true },
      { label: 'D', value: 'Ferdinand', isCorrect: false },
    ], 'Prospero is the rightful Duke of Milan, who was overthrown by his brother Antonio and stranded on an island with his daughter Miranda.', MEDIUM, 'Shakespeare'),

    // Prose Fiction (3)
    mcq('Which narrative perspective uses "I" or "we" as the narrator?', [
      { label: 'A', value: 'Third-person omniscient', isCorrect: false },
      { label: 'B', value: 'Second-person', isCorrect: false },
      { label: 'C', value: 'First-person', isCorrect: true },
      { label: 'D', value: 'Third-person limited', isCorrect: false },
    ], 'First-person narration uses "I" or "we" and presents events from the narrator\'s personal perspective, limiting the reader\'s knowledge to what the narrator knows.', EASY, 'Prose Fiction'),
    mcq('What is the climax of a story?', [
      { label: 'A', value: 'The introduction of the main characters', isCorrect: false },
      { label: 'B', value: 'The turning point or moment of greatest tension in the plot', isCorrect: true },
      { label: 'C', value: 'The resolution of the conflict', isCorrect: false },
      { label: 'D', value: 'The background information about the setting', isCorrect: false },
    ], 'The climax is the point of highest tension or the decisive turning point in a narrative, after which the conflict begins to move towards resolution.', MEDIUM, 'Prose Fiction'),
    mcq('In "To Kill a Mockingbird" by Harper Lee, what does the mockingbird symbolize?', [
      { label: 'A', value: 'Courage in the face of danger', isCorrect: false },
      { label: 'B', value: 'Innocence and goodness that should not be destroyed', isCorrect: true },
      { label: 'C', value: 'The harsh reality of racial injustice', isCorrect: false },
      { label: 'D', value: 'The importance of education', isCorrect: false },
    ], 'The mockingbird symbolizes innocent beings (like Tom Robinson and Boo Radley) who do no harm but are destroyed by society\'s prejudice and cruelty.', HARD, 'Prose Fiction'),

    // Literary Devices (3)
    mcq('Which literary device is used in: "The wind whispered through the trees"?', [
      { label: 'A', value: 'Simile', isCorrect: false },
      { label: 'B', value: 'Metaphor', isCorrect: false },
      { label: 'C', value: 'Personification', isCorrect: true },
      { label: 'D', value: 'Alliteration', isCorrect: false },
    ], 'Personification gives human qualities (whispering) to non-human entities (the wind), making the description more vivid and relatable.', EASY, 'Literary Devices'),
    mcq('What is a metaphor?', [
      { label: 'A', value: 'An extreme exaggeration for emphasis', isCorrect: false },
      { label: 'B', value: 'A comparison between two unlike things without using "like" or "as"', isCorrect: true },
      { label: 'C', value: 'The repetition of initial consonant sounds', isCorrect: false },
      { label: 'D', value: 'A reference to a well-known person, place, or event', isCorrect: false },
    ], 'A metaphor makes a direct comparison by stating one thing IS another (e.g., "Time is money"), without using "like" or "as" as in a simile.', EASY, 'Literary Devices'),
    mcq('What is the function of a foil character in literature?', [
      { label: 'A', value: 'To provide comic relief in a serious work', isCorrect: false },
      { label: 'B', value: 'To contrast with another character to highlight their qualities', isCorrect: true },
      { label: 'C', value: 'To deliver the opening prologue of a play', isCorrect: false },
      { label: 'D', value: 'To serve as the main antagonist', isCorrect: false },
    ], 'A foil character is deliberately contrasted with another character (often the protagonist) to highlight particular qualities or traits, such as Banquo to Macbeth.', MEDIUM, 'Literary Devices'),

    // Shakespeare (3)
    mcq('In "Macbeth," what motivates Macbeth to murder King Duncan?', [
      { label: 'A', value: 'King Duncan\'s tyranny over Scotland', isCorrect: false },
      { label: 'B', value: 'The witches\' prophecies and Lady Macbeth\'s persuasion', isCorrect: true },
      { label: 'C', value: 'A desire to avenge his father\'s death', isCorrect: false },
      { label: 'D', value: 'Malcolm\'s threat to overthrow the kingdom', isCorrect: false },
    ], 'Macbeth is driven by the witches\' prophecy that he will become king and by Lady Macbeth\'s relentless ambition and manipulation.', MEDIUM, 'Shakespeare'),
    mcq('What is iambic pentameter?', [
      { label: 'A', value: 'A line of poetry with ten syllables in five iambs (unstressed-stressed pattern)', isCorrect: true },
      { label: 'B', value: 'A poem with five stanzas of equal length', isCorrect: false },
      { label: 'C', value: 'A line with ten stressed syllables in a row', isCorrect: false },
      { label: 'D', value: 'A poem written in free verse with no metre', isCorrect: false },
    ], 'Iambic pentameter has five iambic feet per line (da-DUM da-DUM da-DUM da-DUM da-DUM), totalling ten syllables with alternating unstressed and stressed beats.', MEDIUM, 'Shakespeare'),
    mcq('In "Romeo and Juliet," the prologue reveals the lovers\' fate. What dramatic technique does this use?', [
      { label: 'A', value: 'Foreshadowing through dramatic irony', isCorrect: true },
      { label: 'B', value: 'Comic relief', isCorrect: false },
      { label: 'C', value: 'Deus ex machina', isCorrect: false },
      { label: 'D', value: 'Flashback narration', isCorrect: false },
    ], 'The prologue foreshadows the tragic ending, creating dramatic irony — the audience knows the lovers will die, heightening the emotional impact of each scene.', HARD, 'Shakespeare'),
  ],

  // ─── Social Studies: 15 questions ──────────────────────────
  'CSEC-SOSTUD': [
    // Individual & Society (3)
    mcq('What is socialization?', [
      { label: 'A', value: 'The process of learning the norms, values, and behaviours of society', isCorrect: true },
      { label: 'B', value: 'The process of applying for a job', isCorrect: false },
      { label: 'C', value: 'The study of ancient civilizations', isCorrect: false },
      { label: 'D', value: 'The act of socializing at parties and events', isCorrect: false },
    ], 'Socialization is the lifelong process through which individuals learn and internalize the culture, norms, values, and behaviours appropriate to their society.', EASY, 'Individual & Society'),
    mcq('What is a norm?', [
      { label: 'A', value: 'A law passed by parliament', isCorrect: false },
      { label: 'B', value: 'An unwritten rule of behaviour that guides social conduct', isCorrect: true },
      { label: 'C', value: 'A scientific principle', isCorrect: false },
      { label: 'D', value: 'A type of government system', isCorrect: false },
    ], 'Norms are informal, unwritten rules that guide behaviour in society. Folkways are everyday customs; mores are stronger moral rules with greater social consequences when violated.', MEDIUM, 'Individual & Society'),
    mcq('What is social stratification?', [
      { label: 'A', value: 'The study of soil layers in geography', isCorrect: false },
      { label: 'B', value: 'The division of society into hierarchical layers based on wealth, power, and status', isCorrect: true },
      { label: 'C', value: 'A method of agricultural planting', isCorrect: false },
      { label: 'D', value: 'The organization of government departments', isCorrect: false },
    ], 'Social stratification refers to the hierarchical arrangement of individuals into social classes based on factors like wealth, income, education, race, and power.', MEDIUM, 'Individual & Society'),

    // Family (2)
    mcq('Which type of family consists of parents, children, and other relatives such as grandparents living together?', [
      { label: 'A', value: 'Nuclear family', isCorrect: false },
      { label: 'B', value: 'Extended family', isCorrect: true },
      { label: 'C', value: 'Single-parent family', isCorrect: false },
      { label: 'D', value: 'Reconstituted family', isCorrect: false },
    ], 'An extended family includes the nuclear family plus other relatives like grandparents, aunts, and uncles, often living together or in close proximity, common in Caribbean society.', EASY, 'Family'),
    mcq('What is the primary function of the family as a social institution?', [
      { label: 'A', value: 'To generate income for the government', isCorrect: false },
      { label: 'B', value: 'To socialize children and provide emotional and physical support', isCorrect: true },
      { label: 'C', value: 'To organize religious ceremonies', isCorrect: false },
      { label: 'D', value: 'To regulate international trade', isCorrect: false },
    ], 'The family is the primary agent of socialization, responsible for nurturing, educating, and providing emotional and economic support to its members.', EASY, 'Family'),

    // Education (2)
    mcq('What is the main function of the Caribbean Examinations Council (CXC)?', [
      { label: 'A', value: 'To run universities across the Caribbean', isCorrect: false },
      { label: 'B', value: 'To conduct examinations and certify students across the Caribbean', isCorrect: true },
      { label: 'C', value: 'To manage national government budgets', isCorrect: false },
      { label: 'D', value: 'To organize regional sporting events', isCorrect: false },
    ], 'CXC was established in 1972 to provide regional secondary school leaving examinations and certifications, replacing the previous British-based examination system.', EASY, 'Education'),
    mcq('Which sociological term describes the hidden lessons about values and attitudes that students learn in school beyond the formal curriculum?', [
      { label: 'A', value: 'Hidden curriculum', isCorrect: true },
      { label: 'B', value: 'Core curriculum', isCorrect: false },
      { label: 'C', value: 'Elective curriculum', isCorrect: false },
      { label: 'D', value: 'National curriculum', isCorrect: false },
    ], 'The hidden curriculum refers to the unwritten, informal lessons that students absorb in school, such as punctuality, obedience to authority, competition, and social norms.', HARD, 'Education'),

    // Religion (2)
    mcq('What is cultural assimilation?', [
      { label: 'A', value: 'When two cultures remain completely separate from each other', isCorrect: false },
      { label: 'B', value: 'When a minority group adopts the cultural traits of the dominant group', isCorrect: true },
      { label: 'C', value: 'When cultures merge to create an entirely new culture', isCorrect: false },
      { label: 'D', value: 'When a culture rejects all outside influences', isCorrect: false },
    ], 'Cultural assimilation occurs when a minority or immigrant group gradually adopts the language, customs, values, and behaviours of the dominant or host culture.', MEDIUM, 'Religion'),
    mcq('Which of the following is a function of religion in society?', [
      { label: 'A', value: 'To promote scientific research', isCorrect: false },
      { label: 'B', value: 'To provide social cohesion, moral guidance, and emotional support', isCorrect: true },
      { label: 'C', value: 'To regulate economic markets', isCorrect: false },
      { label: 'D', value: 'To manage international trade agreements', isCorrect: false },
    ], 'Religion functions as a social institution that promotes social cohesion, provides moral frameworks, offers emotional comfort during crises, and reinforces shared values.', MEDIUM, 'Religion'),

    // Government & Politics (3)
    mcq('Which Caribbean political system is characterized by a Prime Minister and a Cabinet?', [
      { label: 'A', value: 'Presidential system', isCorrect: false },
      { label: 'B', value: 'Westminster parliamentary system', isCorrect: true },
      { label: 'C', value: 'Military dictatorship', isCorrect: false },
      { label: 'D', value: 'Absolute monarchy', isCorrect: false },
    ], 'Most Caribbean nations inherited the Westminster parliamentary system from Britain, featuring a Prime Minister as head of government and a ceremonial President or Governor-General.', EASY, 'Government & Politics'),
    mcq('What is the purpose of a constitution?', [
      { label: 'A', value: 'To describe the physical geography of a country', isCorrect: false },
      { label: 'B', value: 'To establish the fundamental laws, principles, and structure of government', isCorrect: true },
      { label: 'C', value: 'To list all citizens by name', isCorrect: false },
      { label: 'D', value: 'To regulate international shipping routes', isCorrect: false },
    ], 'A constitution is the supreme law of a country that establishes the framework of government, defines the separation of powers, and protects citizens\' fundamental rights.', EASY, 'Government & Politics'),
    mcq('What does CARICOM stand for?', [
      { label: 'A', value: 'Caribbean Commonwealth', isCorrect: false },
      { label: 'B', value: 'Caribbean Community', isCorrect: true },
      { label: 'C', value: 'Caribbean Cooperation Region', isCorrect: false },
      { label: 'D', value: 'Caribbean Catholic Organization', isCorrect: false },
    ], 'CARICOM (Caribbean Community), established by the Treaty of Chaguaramas in 1973, promotes economic integration and cooperation among Caribbean member states.', EASY, 'Government & Politics'),

    // Caribbean Social Issues (3)
    mcq('In the Caribbean, what is a major challenge related to economic development?', [
      { label: 'A', value: 'An abundance of natural resources', isCorrect: false },
      { label: 'B', value: 'Overpopulation in all territories', isCorrect: false },
      { label: 'C', value: 'High dependency on imported goods and vulnerability to external shocks', isCorrect: true },
      { label: 'D', value: 'Excessive industrial output', isCorrect: false },
    ], 'Caribbean economies face challenges including high import dependency, vulnerability to natural disasters, limited economic diversification, and susceptibility to global economic shocks.', HARD, 'Caribbean Social Issues'),
    mcq('What is the term for the migration of skilled and educated persons from the Caribbean to developed countries?', [
      { label: 'A', value: 'Internal migration', isCorrect: false },
      { label: 'B', value: 'Brain drain', isCorrect: true },
      { label: 'C', value: 'Rural-to-urban migration', isCorrect: false },
      { label: 'D', value: 'Seasonal migration', isCorrect: false },
    ], 'Brain drain refers to the emigration of highly trained or qualified people (doctors, nurses, teachers) from the Caribbean to countries like the US, UK, and Canada, depleting the local workforce.', MEDIUM, 'Caribbean Social Issues'),
    mcq('What is GDP?', [
      { label: 'A', value: 'General Development Plan', isCorrect: false },
      { label: 'B', value: 'Gross Domestic Product — the total value of goods and services produced in a country', isCorrect: true },
      { label: 'C', value: 'Global Development Partnership', isCorrect: false },
      { label: 'D', value: 'Government Development Program', isCorrect: false },
    ], 'GDP measures the total monetary value of all finished goods and services produced within a country\'s borders in a specific time period, indicating economic health.', EASY, 'Caribbean Social Issues'),
  ],

  // ─── Information Technology: 15 questions ──────────────────
  'CSEC-IT': [
    // Hardware (3)
    mcq('What is the main function of the CPU (Central Processing Unit)?', [
      { label: 'A', value: 'To store data permanently', isCorrect: false },
      { label: 'B', value: 'To process instructions and perform calculations', isCorrect: true },
      { label: 'C', value: 'To display output on a monitor', isCorrect: false },
      { label: 'D', value: 'To connect to the internet', isCorrect: false },
    ], 'The CPU is the "brain" of the computer that executes instructions, performs arithmetic and logical operations, and coordinates all other hardware components.', EASY, 'Hardware'),
    mcq('Which type of memory is volatile and loses its contents when the power is turned off?', [
      { label: 'A', value: 'ROM', isCorrect: false },
      { label: 'B', value: 'Hard disk', isCorrect: false },
      { label: 'C', value: 'RAM', isCorrect: true },
      { label: 'D', value: 'USB flash drive', isCorrect: false },
    ], 'RAM (Random Access Memory) is volatile — it stores data temporarily while the computer is running and loses all data when power is switched off. ROM is non-volatile.', EASY, 'Hardware'),
    mcq('What is the purpose of an input device?', [
      { label: 'A', value: 'To display processed information to the user', isCorrect: false },
      { label: 'B', value: 'To send data and instructions INTO the computer for processing', isCorrect: true },
      { label: 'C', value: 'To store data permanently', isCorrect: false },
      { label: 'D', value: 'To speed up processing tasks', isCorrect: false },
    ], 'Input devices (keyboard, mouse, scanner, microphone) allow users to enter data and instructions into the computer system for processing.', EASY, 'Hardware'),

    // Software (2)
    mcq('What is the difference between system software and application software?', [
      { label: 'A', value: 'System software manages hardware; application software performs user tasks', isCorrect: true },
      { label: 'B', value: 'There is no difference between them', isCorrect: false },
      { label: 'C', value: 'Application software is faster than system software', isCorrect: false },
      { label: 'D', value: 'System software is only used in offices', isCorrect: false },
    ], 'System software (OS, utilities) manages computer hardware and provides a platform. Application software (word processors, browsers) performs specific tasks for the user.', MEDIUM, 'Software'),
    mcq('Which of the following is an example of application software?', [
      { label: 'A', value: 'Windows 10', isCorrect: false },
      { label: 'B', value: 'Linux', isCorrect: false },
      { label: 'C', value: 'Microsoft Word', isCorrect: true },
      { label: 'D', value: 'Device driver', isCorrect: false },
    ], 'Microsoft Word is application software used for word processing. Windows 10, Linux, and device drivers are system software that manage the computer.', EASY, 'Software'),

    // Networks & Communications (3)
    mcq('What does the acronym LAN stand for?', [
      { label: 'A', value: 'Large Area Network', isCorrect: false },
      { label: 'B', value: 'Local Area Network', isCorrect: true },
      { label: 'C', value: 'Long Access Network', isCorrect: false },
      { label: 'D', value: 'Linked Area Node', isCorrect: false },
    ], 'LAN stands for Local Area Network, which connects computers within a limited area such as a home, school, or office building, typically using Ethernet or Wi-Fi.', EASY, 'Networks & Communications'),
    mcq('What is an IP address?', [
      { label: 'A', value: 'A physical mailing address of a computer', isCorrect: false },
      { label: 'B', value: 'A unique numerical label that identifies a device on a network', isCorrect: true },
      { label: 'C', value: 'A type of software license key', isCorrect: false },
      { label: 'D', value: 'An email address format', isCorrect: false },
    ], 'An IP (Internet Protocol) address is a unique numerical identifier (e.g., 192.168.1.1) assigned to each device on a network, enabling data routing and communication.', MEDIUM, 'Networks & Communications'),
    mcq('What is a firewall?', [
      { label: 'A', value: 'A physical wall protecting computer hardware', isCorrect: false },
      { label: 'B', value: 'A security system that monitors and controls network traffic based on rules', isCorrect: true },
      { label: 'C', value: 'A type of computer virus', isCorrect: false },
      { label: 'D', value: 'A backup system for data recovery', isCorrect: false },
    ], 'A firewall is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules, blocking unauthorized access.', MEDIUM, 'Networks & Communications'),

    // Programming (2)
    mcq('What is an algorithm?', [
      { label: 'A', value: 'A type of programming language', isCorrect: false },
      { label: 'B', value: 'A step-by-step procedure for solving a problem', isCorrect: true },
      { label: 'C', value: 'A hardware component', isCorrect: false },
      { label: 'D', value: 'A type of computer virus', isCorrect: false },
    ], 'An algorithm is a finite, well-defined sequence of steps or rules that provides a solution to a specific problem. Algorithms are the foundation of all computer programs.', EASY, 'Programming'),
    mcq('In programming, what is a variable?', [
      { label: 'A', value: 'A fixed value that never changes during execution', isCorrect: false },
      { label: 'B', value: 'A named storage location that can hold a value which may change during program execution', isCorrect: true },
      { label: 'C', value: 'A type of loop structure', isCorrect: false },
      { label: 'D', value: 'A mathematical operator', isCorrect: false },
    ], 'A variable is a named memory location used to store data values. It has a name (identifier), a data type, and a value that can change during program execution.', MEDIUM, 'Programming'),

    // Database Management (2)
    mcq('In a database, what is a primary key?', [
      { label: 'A', value: 'The first field in a table', isCorrect: false },
      { label: 'B', value: 'A field that uniquely identifies each record in a table', isCorrect: true },
      { label: 'C', value: 'The most important data in a table', isCorrect: false },
      { label: 'D', value: 'A password to access the database', isCorrect: false },
    ], 'A primary key is a field (or combination of fields) that uniquely identifies each record in a database table. No two records can share the same primary key value.', EASY, 'Database Management'),
    mcq('What is the difference between a query and a report in a database?', [
      { label: 'A', value: 'A query extracts specific data; a report presents formatted output', isCorrect: true },
      { label: 'B', value: 'There is no difference', isCorrect: false },
      { label: 'C', value: 'A report extracts data; a query formats output', isCorrect: false },
      { label: 'D', value: 'A query is only used in spreadsheets', isCorrect: false },
    ], 'A query is a request to extract specific data from a database based on criteria. A report presents the extracted data in a formatted, organized manner suitable for printing or viewing.', MEDIUM, 'Database Management'),

    // Social & Ethical Issues (3)
    mcq('What is computer fraud?', [
      { label: 'A', value: 'Using a computer to intentionally deceive for personal or financial gain', isCorrect: true },
      { label: 'B', value: 'Accidentally deleting important files', isCorrect: false },
      { label: 'C', value: 'Hardware malfunction due to age', isCorrect: false },
      { label: 'D', value: 'Sharing software with a friend', isCorrect: false },
    ], 'Computer fraud involves using computers or information technology to deceive individuals or organizations for unauthorized financial or personal gain.', MEDIUM, 'Social & Ethical Issues'),
    mcq('What does the term "digital divide" refer to?', [
      { label: 'A', value: 'The gap between those with access to technology and those without', isCorrect: true },
      { label: 'B', value: 'A mathematical operation in computing', isCorrect: false },
      { label: 'C', value: 'A type of computer virus', isCorrect: false },
      { label: 'D', value: 'The difference between hardware and software', isCorrect: false },
    ], 'The digital divide refers to the inequality between groups in terms of access to computers, the internet, and digital literacy skills, often linked to socioeconomic factors.', MEDIUM, 'Social & Ethical Issues'),
    mcq('Which of the following is an example of software piracy?', [
      { label: 'A', value: 'Writing your own program from scratch', isCorrect: false },
      { label: 'B', value: 'Using open-source software', isCorrect: false },
      { label: 'C', value: 'Installing software without a valid license or making unauthorized copies', isCorrect: true },
      { label: 'D', value: 'Downloading free software from official websites', isCorrect: false },
    ], 'Software piracy is the illegal copying, distribution, or use of software without a proper license, which violates copyright law and deprives developers of revenue.', EASY, 'Social & Ethical Issues'),
  ],

  // ─── Principles of Business: 15 questions ───────────────────
  'CSEC-POB': [
    // The Business Environment (3)
    mcq('What is the main objective of a business?', [
      { label: 'A', value: 'To employ as many people as possible', isCorrect: false },
      { label: 'B', value: 'To maximize profit while satisfying customer needs', isCorrect: true },
      { label: 'C', value: 'To produce goods regardless of demand', isCorrect: false },
      { label: 'D', value: 'To avoid paying taxes', isCorrect: false },
    ], 'The primary objective of a business is to earn profit by providing goods and services that satisfy consumer needs and wants, while also being socially responsible.', EASY, 'The Business Environment'),
    mcq('What is the difference between wants and needs?', [
      { label: 'A', value: 'Needs are essential for survival; wants are desires that are not essential', isCorrect: true },
      { label: 'B', value: 'There is no difference between them', isCorrect: false },
      { label: 'C', value: 'Wants are essential; needs are luxuries', isCorrect: false },
      { label: 'D', value: 'Needs only apply to businesses, not individuals', isCorrect: false },
    ], 'Needs are basic requirements for survival (food, shelter, clothing), while wants are non-essential desires that improve quality of life (designer clothes, entertainment).', EASY, 'The Business Environment'),
    mcq('What factors of production are land, labour, capital, and entrepreneurship?', [
      { label: 'A', value: 'The stages of product development', isCorrect: false },
      { label: 'B', value: 'The resources used to produce goods and services', isCorrect: true },
      { label: 'C', value: 'Types of business ownership', isCorrect: false },
      { label: 'D', value: 'Marketing strategies', isCorrect: false },
    ], 'The four factors of production are: Land (natural resources), Labour (human effort), Capital (man-made tools/machinery), and Entrepreneurship (the organizer and risk-taker).', MEDIUM, 'The Business Environment'),

    // Establishing a Business (2)
    mcq('Which form of business ownership is easiest to start and has the owner\'s personal assets at risk?', [
      { label: 'A', value: 'Public limited company', isCorrect: false },
      { label: 'B', value: 'Private limited company', isCorrect: false },
      { label: 'C', value: 'Sole proprietorship', isCorrect: true },
      { label: 'D', value: 'Cooperative', isCorrect: false },
    ], 'A sole proprietorship is the simplest and easiest to establish, owned by one person with unlimited liability, meaning personal assets can be used to settle business debts.', EASY, 'Establishing a Business'),
    mcq('What is a franchise?', [
      { label: 'A', value: 'A type of government loan', isCorrect: false },
      { label: 'B', value: 'A business arrangement where one party pays to use another\'s business model and brand', isCorrect: true },
      { label: 'C', value: 'A free business given by the government', isCorrect: false },
      { label: 'D', value: 'A partnership between two equal companies', isCorrect: false },
    ], 'A franchise allows an individual (franchisee) to operate a business using the branding, products, and proven business model of an established company (franchisor) for a fee.', MEDIUM, 'Establishing a Business'),

    // Business Finance (3)
    mcq('Which of the following is an internal source of finance for a business?', [
      { label: 'A', value: 'Bank loan', isCorrect: false },
      { label: 'B', value: 'Retained profits', isCorrect: true },
      { label: 'C', value: 'Government grants', isCorrect: false },
      { label: 'D', value: 'Issuing new shares to the public', isCorrect: false },
    ], 'Retained profits are profits kept in the business rather than distributed as dividends. They are generated internally and do not require external approval or incur interest.', MEDIUM, 'Business Finance'),
    mcq('What is the break-even point?', [
      { label: 'A', value: 'The point where a business makes maximum profit', isCorrect: false },
      { label: 'B', value: 'The point where total revenue equals total costs (no profit, no loss)', isCorrect: true },
      { label: 'C', value: 'The point where the business must close down', isCorrect: false },
      { label: 'D', value: 'The point where fixed costs are eliminated', isCorrect: false },
    ], 'At the break-even point, a business covers all its costs (fixed and variable) with its revenue but makes neither a profit nor a loss. It is critical for business planning.', HARD, 'Business Finance'),
    mcq('What is working capital?', [
      { label: 'A', value: 'The total value of all fixed assets', isCorrect: false },
      { label: 'B', value: 'Current assets minus current liabilities', isCorrect: true },
      { label: 'C', value: 'The total revenue of the business', isCorrect: false },
      { label: 'D', value: 'Long-term investments', isCorrect: false },
    ], 'Working capital = Current Assets − Current Liabilities. It measures a company\'s short-term financial health and its ability to cover day-to-day operational expenses.', MEDIUM, 'Business Finance'),

    // Marketing (2)
    mcq('What is the marketing mix (4Ps)?', [
      { label: 'A', value: 'Product, Price, Place, Promotion', isCorrect: true },
      { label: 'B', value: 'People, Process, Plan, Profit', isCorrect: false },
      { label: 'C', value: 'Production, Price, Packaging, Performance', isCorrect: false },
      { label: 'D', value: 'Planning, Pricing, Positioning, Publishing', isCorrect: false },
    ], 'The marketing mix consists of the 4Ps: Product (what to sell), Price (how much to charge), Place (where to distribute), and Promotion (how to advertise and sell).', EASY, 'Marketing'),
    mcq('What is market research?', [
      { label: 'A', value: 'Researching how to open a stock market', isCorrect: false },
      { label: 'B', value: 'The systematic collection and analysis of data about consumers and markets', isCorrect: true },
      { label: 'C', value: 'Research conducted only by government agencies', isCorrect: false },
      { label: 'D', value: 'The study of agricultural markets only', isCorrect: false },
    ], 'Market research involves gathering, recording, and analysing data about customers, competitors, and the market to make informed business decisions about products and strategies.', MEDIUM, 'Marketing'),

    // Production (3)
    mcq('What is the difference between primary, secondary, and tertiary sectors?', [
      { label: 'A', value: 'Primary extracts raw materials, secondary manufactures, tertiary provides services', isCorrect: true },
      { label: 'B', value: 'They all perform the same function', isCorrect: false },
      { label: 'C', value: 'Primary provides services, secondary extracts, tertiary sells', isCorrect: false },
      { label: 'D', value: 'Primary is the largest sector; tertiary is the smallest', isCorrect: false },
    ], 'Primary sector extracts raw materials (farming, mining, fishing), secondary manufactures goods (factories), and tertiary provides services (banking, retail, education).', MEDIUM, 'Production'),
    mcq('What is division of labour in production?', [
      { label: 'A', value: 'Dividing workers into unions', isCorrect: false },
      { label: 'B', value: 'Breaking down the production process into specialized tasks performed by different workers', isCorrect: true },
      { label: 'C', value: 'Separating management from workers', isCorrect: false },
      { label: 'D', value: 'Distributing profits among employees', isCorrect: false },
    ], 'Division of labour involves splitting a production process into separate tasks, each performed by a specialist worker, which increases efficiency and output per worker.', MEDIUM, 'Production'),
    mcq('What is a Public-Private Partnership (PPP)?', [
      { label: 'A', value: 'A merger between two competing companies', isCorrect: false },
      { label: 'B', value: 'A collaboration between government and private sector to deliver public services or infrastructure', isCorrect: true },
      { label: 'C', value: 'A type of joint stock company', isCorrect: false },
      { label: 'D', value: 'A government-owned enterprise', isCorrect: false },
    ], 'A PPP is an arrangement where the government and private companies collaborate to fund, build, and operate public infrastructure and services like roads, hospitals, and schools.', HARD, 'Production'),

    // Human Resource Management (2)
    mcq('What is the main purpose of a job description?', [
      { label: 'A', value: 'To state the salary only', isCorrect: false },
      { label: 'B', value: 'To outline the duties, responsibilities, and requirements of a job', isCorrect: true },
      { label: 'C', value: 'To list all employees in the company', isCorrect: false },
      { label: 'D', value: 'To describe the company\'s history', isCorrect: false },
    ], 'A job description clearly defines the title, duties, responsibilities, qualifications, and reporting relationships of a position, used in recruitment and performance evaluation.', MEDIUM, 'Human Resource Management'),
    mcq('What is the difference between recruitment and selection?', [
      { label: 'A', value: 'Recruitment attracts applicants; selection chooses the best candidate', isCorrect: true },
      { label: 'B', value: 'They are the same process', isCorrect: false },
      { label: 'C', value: 'Selection happens before recruitment', isCorrect: false },
      { label: 'D', value: 'Recruitment is only for management positions', isCorrect: false },
    ], 'Recruitment is the process of attracting and gathering a pool of applicants. Selection is the process of evaluating candidates and choosing the most suitable one for the job.', EASY, 'Human Resource Management'),
  ],

  // ─── Principles of Accounts: 15 questions ───────────────────
  'CSEC-POA': [
    // The Accounting Equation (3)
    mcq('What is the basic accounting equation?', [
      { label: 'A', value: 'Assets = Liabilities + Capital', isCorrect: true },
      { label: 'B', value: 'Assets = Liabilities - Capital', isCorrect: false },
      { label: 'C', value: 'Assets + Liabilities = Capital', isCorrect: false },
      { label: 'D', value: 'Revenue = Expenses + Profit', isCorrect: false },
    ], 'The fundamental accounting equation is Assets = Liabilities + Capital (Owner\'s Equity). It must always balance and is the foundation of double-entry bookkeeping.', EASY, 'The Accounting Equation'),
    mcq('If assets increase by $5,000 and liabilities decrease by $2,000, what is the effect on capital?', [
      { label: 'A', value: 'Capital increases by $7,000', isCorrect: true },
      { label: 'B', value: 'Capital decreases by $3,000', isCorrect: false },
      { label: 'C', value: 'Capital increases by $3,000', isCorrect: false },
      { label: 'D', value: 'Capital decreases by $7,000', isCorrect: false },
    ], 'From A = L + C: if A increases by 5,000 and L decreases by 2,000, then C must increase by 7,000 to keep the equation balanced (5,000 + 2,000).', HARD, 'The Accounting Equation'),
    mcq('A business purchases equipment for $3,000 on credit. How does this affect the accounting equation?', [
      { label: 'A', value: 'Assets increase, Liabilities increase (both by $3,000)', isCorrect: true },
      { label: 'B', value: 'Assets increase, Capital decreases', isCorrect: false },
      { label: 'C', value: 'Liabilities increase, Assets decrease', isCorrect: false },
      { label: 'D', value: 'No change — equipment is not yet paid for', isCorrect: false },
    ], 'Buying on credit increases Assets (equipment) by $3,000 and increases Liabilities (creditor/payable) by $3,000. The equation stays balanced.', MEDIUM, 'The Accounting Equation'),

    // Books of Original Entry (2)
    mcq('Which book of original entry is used to record all credit sales?', [
      { label: 'A', value: 'Cash book', isCorrect: false },
      { label: 'B', value: 'Sales journal', isCorrect: true },
      { label: 'C', value: 'Purchases journal', isCorrect: false },
      { label: 'D', value: 'General journal', isCorrect: false },
    ], 'The sales journal (sales day book) records all credit sales transactions. Cash sales are recorded in the cash book, not the sales journal.', EASY, 'Books of Original Entry'),
    mcq('What is the difference between trade discount and cash discount?', [
      { label: 'A', value: 'Trade discount reduces list price; cash discount is for prompt payment', isCorrect: true },
      { label: 'B', value: 'There is no difference between them', isCorrect: false },
      { label: 'C', value: 'Cash discount reduces list price; trade discount is for prompt payment', isCorrect: false },
      { label: 'D', value: 'Trade discount only applies to services', isCorrect: false },
    ], 'A trade discount reduces the catalogue/list price before recording the sale. A cash discount is offered for early payment and recorded as discount allowed/received.', MEDIUM, 'Books of Original Entry'),

    // Ledger Accounts (2)
    mcq('What is a debit in accounting?', [
      { label: 'A', value: 'Always an increase in any account', isCorrect: false },
      { label: 'B', value: 'An entry on the left side of an account', isCorrect: true },
      { label: 'C', value: 'Always a decrease in any account', isCorrect: false },
      { label: 'D', value: 'Only used for expense accounts', isCorrect: false },
    ], 'A debit is an entry on the left side of a T-account. It increases assets and expenses but decreases liabilities, capital, and revenue. Its effect depends on the account type.', MEDIUM, 'Ledger Accounts'),
    mcq('What does "balance brought down" (b/d) mean?', [
      { label: 'A', value: 'The balance carried forward from the previous period as the opening balance', isCorrect: true },
      { label: 'B', value: 'The balance at the end of the financial year', isCorrect: false },
      { label: 'C', value: 'The total of all transactions in the period', isCorrect: false },
      { label: 'D', value: 'The amount of profit or loss made', isCorrect: false },
    ], 'Balance brought down (b/d) is the opening balance for the new period, brought forward from the closing balance (c/d) of the previous period to continue the account.', MEDIUM, 'Ledger Accounts'),

    // Financial Statements (3)
    mcq('In which financial statement would you find the figure for gross profit?', [
      { label: 'A', value: 'Balance sheet', isCorrect: false },
      { label: 'B', value: 'Trading account', isCorrect: true },
      { label: 'C', value: 'Cash flow statement', isCorrect: false },
      { label: 'D', value: 'Notes to the accounts', isCorrect: false },
    ], 'Gross profit (Sales Revenue minus Cost of Goods Sold) appears in the Trading account, which is the first section of the Income Statement.', EASY, 'Financial Statements'),
    mcq('What is net profit?', [
      { label: 'A', value: 'Total sales minus cost of goods sold only', isCorrect: false },
      { label: 'B', value: 'Gross profit minus all operating expenses', isCorrect: true },
      { label: 'C', value: 'Total revenue plus all expenses', isCorrect: false },
      { label: 'D', value: 'Gross profit plus expenses', isCorrect: false },
    ], 'Net Profit = Gross Profit − Total Expenses. It represents the actual profit of the business after all operating expenses (rent, wages, utilities) have been deducted.', EASY, 'Financial Statements'),
    mcq('What is depreciation?', [
      { label: 'A', value: 'An increase in the value of an asset over time', isCorrect: false },
      { label: 'B', value: 'The allocation of the cost of a fixed asset over its useful life', isCorrect: true },
      { label: 'C', value: 'A type of business expense for employee wages', isCorrect: false },
      { label: 'D', value: 'The selling price of a fixed asset', isCorrect: false },
    ], 'Depreciation is the systematic allocation of a fixed asset\'s cost over its estimated useful life, representing wear, tear, and obsolescence (e.g., using the straight-line method).', MEDIUM, 'Financial Statements'),

    // Partnership Accounts (2)
    mcq('In a partnership, how are profits typically distributed?', [
      { label: 'A', value: 'Equally among all partners regardless of agreement', isCorrect: false },
      { label: 'B', value: 'According to the partnership agreement or deed', isCorrect: true },
      { label: 'C', value: 'Only to the senior partner', isCorrect: false },
      { label: 'D', value: 'Based on the number of hours worked only', isCorrect: false },
    ], 'Profits are distributed according to the partnership deed/agreement, which may specify ratios based on capital contributed, effort, or an agreed formula.', MEDIUM, 'Partnership Accounts'),
    mcq('What is the purpose of an appropriation account in a partnership?', [
      { label: 'A', value: 'To record the sale of partnership assets', isCorrect: false },
      { label: 'B', value: 'To show how net profit is distributed among partners', isCorrect: true },
      { label: 'C', value: 'To calculate gross profit', isCorrect: false },
      { label: 'D', value: 'To record daily cash transactions', isCorrect: false },
    ], 'The appropriation account shows how the net profit is allocated: partners\' salaries, interest on capital, interest on drawings, and the remaining profit shared in the agreed ratio.', HARD, 'Partnership Accounts'),

    // Control Systems (3)
    mcq('What is a control account?', [
      { label: 'A', value: 'An account used to authorize bank payments', isCorrect: false },
      { label: 'B', value: 'A summary account that checks the accuracy of a subsidiary ledger', isCorrect: true },
      { label: 'C', value: 'A type of bank account', isCorrect: false },
      { label: 'D', value: 'An account for inventory control only', isCorrect: false },
    ], 'A control account (e.g., debtors/creditors control account) summarizes the total of individual accounts in a subsidiary ledger, serving as a check on accuracy.', HARD, 'Control Systems'),
    mcq('What is a bank reconciliation statement?', [
      { label: 'A', value: 'A statement sent by the bank to the customer', isCorrect: false },
      { label: 'B', value: 'A document that explains differences between the cash book and bank statement balances', isCorrect: true },
      { label: 'C', value: 'A record of all credit sales', isCorrect: false },
      { label: 'D', value: 'A statement of all fixed assets', isCorrect: false },
    ], 'A bank reconciliation statement reconciles (matches) the balance in the cash book with the balance on the bank statement by identifying items like unpresented cheques and bank charges.', MEDIUM, 'Control Systems'),
    mcq('What is the purpose of a trial balance?', [
      { label: 'A', value: 'To calculate the net profit of a business', isCorrect: false },
      { label: 'B', value: 'To verify that total debits equal total credits in the ledger', isCorrect: true },
      { label: 'C', value: 'To record daily business transactions', isCorrect: false },
      { label: 'D', value: 'To prepare the balance sheet directly', isCorrect: false },
    ], 'A trial balance lists all ledger account balances to check arithmetic accuracy by verifying that total debits equal total credits. Note: it does NOT detect all types of errors.', EASY, 'Control Systems'),
  ],

  // ─── Economics: 15 questions ────────────────────────────────
  'CSEC-ECO': [
    // The Nature of Economics (3)
    mcq('What is scarcity in economics?', [
      { label: 'A', value: 'When goods are available in unlimited quantities', isCorrect: false },
      { label: 'B', value: 'The fundamental economic problem of limited resources to satisfy unlimited wants', isCorrect: true },
      { label: 'C', value: 'A temporary shortage of workers', isCorrect: false },
      { label: 'D', value: 'When prices are too high', isCorrect: false },
    ], 'Scarcity means resources (land, labour, capital, entrepreneurship) are finite while human wants are infinite, forcing society to make choices about how to allocate resources.', EASY, 'The Nature of Economics'),
    mcq('What is opportunity cost?', [
      { label: 'A', value: 'The total cost of producing all goods', isCorrect: false },
      { label: 'B', value: 'The value of the next best alternative forgone when making a choice', isCorrect: true },
      { label: 'C', value: 'The cost of borrowing money from a bank', isCorrect: false },
      { label: 'D', value: 'The price charged for imported goods', isCorrect: false },
    ], 'Opportunity cost is what you give up when you choose one option over another. If you choose to study, the opportunity cost might be the wages you could have earned working.', MEDIUM, 'The Nature of Economics'),
    mcq('What does the production possibility curve (PPC) illustrate?', [
      { label: 'A', value: 'The price of goods in a market', isCorrect: false },
      { label: 'B', value: 'The maximum combinations of two goods an economy can produce with given resources', isCorrect: true },
      { label: 'C', value: 'The population growth rate of a country', isCorrect: false },
      { label: 'D', value: 'The inflation rate over time', isCorrect: false },
    ], 'The PPC shows the maximum output combinations of two goods an economy can produce when all resources are fully and efficiently employed. Points inside the curve indicate inefficiency.', MEDIUM, 'The Nature of Economics'),

    // Demand & Supply (3)
    mcq('What is the law of demand?', [
      { label: 'A', value: 'As price increases, quantity demanded increases', isCorrect: false },
      { label: 'B', value: 'As price decreases, quantity demanded increases (ceteris paribus)', isCorrect: true },
      { label: 'C', value: 'Demand always equals supply in a market', isCorrect: false },
      { label: 'D', value: 'Price has no effect on the quantity demanded', isCorrect: false },
    ], 'The law of demand states that, ceteris paribus (all other factors being equal), as the price of a good falls, the quantity demanded rises, and vice versa.', EASY, 'Demand & Supply'),
    mcq('What is the equilibrium price?', [
      { label: 'A', value: 'The highest price a seller can charge', isCorrect: false },
      { label: 'B', value: 'The price at which quantity demanded equals quantity supplied', isCorrect: true },
      { label: 'C', value: 'The lowest possible price for a good', isCorrect: false },
      { label: 'D', value: 'The price fixed by the government', isCorrect: false },
    ], 'Equilibrium price is where the demand and supply curves intersect — the price at which buyers wish to purchase exactly the same quantity that sellers wish to sell.', MEDIUM, 'Demand & Supply'),
    mcq('What is likely to cause a shift in the demand curve to the right?', [
      { label: 'A', value: 'An increase in the price of the good itself', isCorrect: false },
      { label: 'B', value: 'An increase in consumer income (for a normal good)', isCorrect: true },
      { label: 'C', value: 'A decrease in population', isCorrect: false },
      { label: 'D', value: 'An increase in the price of substitute goods', isCorrect: false },
    ], 'For a normal good, an increase in consumer income means people can afford to buy more at every price, shifting the entire demand curve to the right (increase in demand).', MEDIUM, 'Demand & Supply'),

    // Market Structures (2)
    mcq('Which market structure has many buyers and sellers, homogeneous products, and free entry/exit?', [
      { label: 'A', value: 'Monopoly', isCorrect: false },
      { label: 'B', value: 'Oligopoly', isCorrect: false },
      { label: 'C', value: 'Perfect competition', isCorrect: true },
      { label: 'D', value: 'Monopolistic competition', isCorrect: false },
    ], 'Perfect competition features many buyers and sellers, identical (homogeneous) products, perfect information, and no barriers to entry or exit. Agricultural markets are a close example.', MEDIUM, 'Market Structures'),
    mcq('What is a monopoly?', [
      { label: 'A', value: 'A market with many small firms competing', isCorrect: false },
      { label: 'B', value: 'A market dominated by a single seller of a product with no close substitutes', isCorrect: true },
      { label: 'C', value: 'A market with only two firms', isCorrect: false },
      { label: 'D', value: 'A government-regulated market with price ceilings', isCorrect: false },
    ], 'A monopoly exists when a single firm is the sole producer of a good or service with no close substitutes, giving it significant control over price. Examples include public utilities.', EASY, 'Market Structures'),

    // National Income (2)
    mcq('What is GDP?', [
      { label: 'A', value: 'General Development Plan', isCorrect: false },
      { label: 'B', value: 'Gross Domestic Product — total value of all final goods and services produced within a country in a year', isCorrect: true },
      { label: 'C', value: 'Global Domestic Partnership', isCorrect: false },
      { label: 'D', value: 'Government Development Program', isCorrect: false },
    ], 'GDP is the total market value of all final goods and services produced within a country\'s borders during a specific period (usually one year).', EASY, 'National Income'),
    mcq('Which of the following is NOT included in the calculation of GDP?', [
      { label: 'A', value: 'Consumer spending on goods and services', isCorrect: false },
      { label: 'B', value: 'Government expenditure on public services', isCorrect: false },
      { label: 'C', value: 'Transfer payments such as pensions and unemployment benefits', isCorrect: true },
      { label: 'D', value: 'Investment by businesses in capital goods', isCorrect: false },
    ], 'Transfer payments (pensions, welfare, unemployment benefits) are NOT included in GDP because they do not represent payment for current production of goods and services.', HARD, 'National Income'),

    // Money & Banking (2)
    mcq('What is inflation?', [
      { label: 'A', value: 'A general increase in the price level of goods and services over time', isCorrect: true },
      { label: 'B', value: 'An increase in the money supply only', isCorrect: false },
      { label: 'C', value: 'A decrease in the unemployment rate', isCorrect: false },
      { label: 'D', value: 'A decrease in the general price level', isCorrect: false },
    ], 'Inflation is the sustained increase in the general price level, measured by the Consumer Price Index (CPI), which reduces the purchasing power of money over time.', EASY, 'Money & Banking'),
    mcq('What is the function of the Central Bank in a Caribbean economy?', [
      { label: 'A', value: 'To operate commercial banks', isCorrect: false },
      { label: 'B', value: 'To issue currency, regulate commercial banks, and implement monetary policy', isCorrect: true },
      { label: 'C', value: 'To print unlimited amounts of money', isCorrect: false },
      { label: 'D', value: 'To lend directly to individual consumers', isCorrect: false },
    ], 'The Central Bank (e.g., Eastern Caribbean Central Bank, Bank of Jamaica) issues currency, acts as banker to the government, regulates commercial banks, and controls monetary policy.', MEDIUM, 'Money & Banking'),

    // International Trade (3)
    mcq('What is a trade surplus?', [
      { label: 'A', value: 'When a country imports more than it exports', isCorrect: false },
      { label: 'B', value: 'When a country exports more than it imports', isCorrect: true },
      { label: 'C', value: 'When imports and exports are exactly equal', isCorrect: false },
      { label: 'D', value: 'When a country has no international trade', isCorrect: false },
    ], 'A trade surplus occurs when the value of a country\'s exports exceeds the value of its imports. The opposite is a trade deficit, which most Caribbean countries experience.', EASY, 'International Trade'),
    mcq('What is a tariff?', [
      { label: 'A', value: 'A tax imposed on imported goods', isCorrect: true },
      { label: 'B', value: 'A subsidy given to domestic producers', isCorrect: false },
      { label: 'C', value: 'A type of free trade agreement', isCorrect: false },
      { label: 'D', value: 'A limit on the quantity of goods exported', isCorrect: false },
    ], 'A tariff is a tax or duty imposed by a government on imported goods, making them more expensive and less competitive compared to domestically produced goods.', MEDIUM, 'International Trade'),
    mcq('What is the main advantage of international trade for Caribbean countries?', [
      { label: 'A', value: 'It eliminates the need for local production', isCorrect: false },
      { label: 'B', value: 'It allows access to goods not produced domestically and expands export markets', isCorrect: true },
      { label: 'C', value: 'It guarantees economic equality with developed nations', isCorrect: false },
      { label: 'D', value: 'It removes the need for government regulation', isCorrect: false },
    ], 'International trade enables Caribbean countries to import goods they cannot produce efficiently (comparative advantage) and earn foreign exchange by exporting their specialized products.', MEDIUM, 'International Trade'),
  ],

  // ─── Spanish: 15 questions ──────────────────────────────────
  'CSEC-SPAN': [
    // Vocabulary & Expressions (3)
    mcq('What does "Me gusta" mean in English?', [
      { label: 'A', value: 'I have', isCorrect: false },
      { label: 'B', value: 'I like (it pleases me)', isCorrect: true },
      { label: 'C', value: 'I go', isCorrect: false },
      { label: 'D', value: 'I want', isCorrect: false },
    ], '"Me gusta" literally translates to "it pleases me" and is used to express liking. "Me gustan" is used with plural nouns.', EASY, 'Vocabulary & Expressions'),
    mcq('How do you say "good morning" in Spanish?', [
      { label: 'A', value: 'Buenas tardes', isCorrect: false },
      { label: 'B', value: 'Buenas noches', isCorrect: false },
      { label: 'C', value: 'Buenos días', isCorrect: true },
      { label: 'D', value: 'Buena suerte', isCorrect: false },
    ], '"Buenos días" means "good morning." "Buenas tardes" means "good afternoon," and "buenas noches" means "good evening/good night."', EASY, 'Vocabulary & Expressions'),
    mcq('What is the Spanish word for "family"?', [
      { label: 'A', value: 'Familia', isCorrect: true },
      { label: 'B', value: 'Escuela', isCorrect: false },
      { label: 'C', value: 'Comunidad', isCorrect: false },
      { label: 'D', value: 'Casa', isCorrect: false },
    ], '"Familia" means "family." Note that "escuela" means school, "comunidad" means community, and "casa" means house/home.', EASY, 'Vocabulary & Expressions'),

    // Grammar & Conjugation (3)
    mcq('What are the three verb endings for regular -ar, -er, and -ir verbs in the infinitive?', [
      { label: 'A', value: '-ar, -er, -ir', isCorrect: true },
      { label: 'B', value: '-ar, -or, -ur', isCorrect: false },
      { label: 'C', value: '-ar, -el, -il', isCorrect: false },
      { label: 'D', value: '-ar, -en, -in', isCorrect: false },
    ], 'Spanish verbs are classified into three groups based on their infinitive endings: -ar (hablar), -er (comer), and -ir (vivir). Each group follows different conjugation patterns.', EASY, 'Grammar & Conjugation'),
    mcq('How do you conjugate the verb "hablar" (to speak) in the yo (I) form of the present tense?', [
      { label: 'A', value: 'Hablo', isCorrect: true },
      { label: 'B', value: 'Hablas', isCorrect: false },
      { label: 'C', value: 'Habla', isCorrect: false },
      { label: 'D', value: 'Hablamos', isCorrect: false },
    ], 'For -ar verbs, the yo form drops the -ar and adds -o: yo hablo (I speak). Tú hablas, él/ella habla, nosotros hablamos, etc.', EASY, 'Grammar & Conjugation'),
    mcq('What is the difference between "ser" and "estar", both meaning "to be" in Spanish?', [
      { label: 'A', value: 'They are completely interchangeable in all contexts', isCorrect: false },
      { label: 'B', value: '"Ser" is for permanent characteristics; "estar" is for temporary states and locations', isCorrect: true },
      { label: 'C', value: '"Ser" is only used in the past tense', isCorrect: false },
      { label: 'D', value: '"Estar" is only used in formal writing', isCorrect: false },
    ], '"Ser" is used for permanent/lasting characteristics (Soy estudiante = I am a student). "Estar" is used for temporary states and locations (Estoy cansado = I am tired).', MEDIUM, 'Grammar & Conjugation'),

    // Reading Comprehension (2)
    mcq('When reading a Spanish passage, what context clue helps you identify the main idea?', [
      { label: 'A', value: 'Only the first word of each paragraph', isCorrect: false },
      { label: 'B', value: 'The topic sentence, repeated themes, and overall message of the passage', isCorrect: true },
      { label: 'C', value: 'The longest paragraph only', isCorrect: false },
      { label: 'D', value: 'Words you do not understand', isCorrect: false },
    ], 'The main idea of a passage is identified through the topic sentence (often the first sentence), repeated themes, and the overall message the author conveys.', MEDIUM, 'Reading Comprehension'),
    mcq('In a Spanish text, the word "además" is a transitional word that means:', [
      { label: 'A', value: 'However', isCorrect: false },
      { label: 'B', value: 'Furthermore / In addition', isCorrect: true },
      { label: 'C', value: 'Therefore', isCorrect: false },
      { label: 'D', value: 'Meanwhile', isCorrect: false },
    ], '"Además" means "furthermore" or "in addition" and is used to add more information to a previous point. Similar connectors include "también" (also) and "además de" (besides).', MEDIUM, 'Reading Comprehension'),

    // Listening Comprehension (2)
    mcq('When listening to a Spanish audio passage, what strategy helps you identify the speaker\'s attitude or opinion?', [
      { label: 'A', value: 'Focus only on individual words you recognize', isCorrect: false },
      { label: 'B', value: 'Listen for tone of voice, adjectives, and opinion expressions like "creo que" or "pienso que"', isCorrect: true },
      { label: 'C', value: 'Skip the passage entirely and guess', isCorrect: false },
      { label: 'D', value: 'Only listen for numbers and dates', isCorrect: false },
    ], 'To identify the speaker\'s opinion, listen for expressions like "creo que" (I think), "pienso que" (I believe), adjectives revealing emotion, and the speaker\'s tone of voice.', MEDIUM, 'Listening Comprehension'),
    mcq('In a Spanish listening exercise, if you hear "No me gusta la comida picante," what does the person mean?', [
      { label: 'A', value: 'I love spicy food', isCorrect: false },
      { label: 'B', value: 'I do not like spicy food', isCorrect: true },
      { label: 'C', value: 'I want spicy food', isCorrect: false },
      { label: 'D', value: 'I make spicy food', isCorrect: false },
    ], '"No me gusta" is the negative form of "me gusta" (I like). "La comida picante" means "spicy food." So the sentence means "I do not like spicy food."', EASY, 'Listening Comprehension'),

    // Caribbean Context (2)
    mcq('Why is learning Spanish relevant for Caribbean students?', [
      { label: 'A', value: 'It has no practical relevance', isCorrect: false },
      { label: 'B', value: 'Because of proximity to Spanish-speaking Caribbean neighbours like the Dominican Republic, Cuba, and Puerto Rico', isCorrect: true },
      { label: 'C', value: 'Only because it is a CXC requirement', isCorrect: false },
      { label: 'D', value: 'Because all Caribbean countries speak Spanish', isCorrect: false },
    ], 'Spanish is highly relevant in the Caribbean due to geographical proximity to Spanish-speaking nations (Dominican Republic, Cuba, Puerto Rico), trade relations, tourism, and cultural exchange.', MEDIUM, 'Caribbean Context'),
    mcq('Which of the following Caribbean islands is a Spanish-speaking nation?', [
      { label: 'A', value: 'Jamaica', isCorrect: false },
      { label: 'B', value: 'Trinidad and Tobago', isCorrect: false },
      { label: 'C', value: 'Cuba', isCorrect: true },
      { label: 'D', value: 'Barbados', isCorrect: false },
    ], 'Cuba is a Spanish-speaking Caribbean nation. Jamaica, Trinidad and Tobago, and Barbados are English-speaking. The Dominican Republic is also Spanish-speaking.', EASY, 'Caribbean Context'),

    // Written Expression (3)
    mcq('In a Spanish formal letter, what is the appropriate closing greeting?', [
      { label: 'A', value: 'Hasta luego', isCorrect: false },
      { label: 'B', value: 'Atentamente (Yours sincerely)', isCorrect: true },
      { label: 'C', value: 'Adiós', isCorrect: false },
      { label: 'D', value: 'Nos vemos', isCorrect: false },
    ], '"Atentamente" is the formal closing for a Spanish letter (equivalent to "Yours sincerely"). Informal closings include "Un saludo" or "Hasta pronto."', MEDIUM, 'Written Expression'),
    mcq('When writing an essay in Spanish, what is the correct way to express a contrasting idea?', [
      { label: 'A', value: 'Usar "porque" (because)', isCorrect: false },
      { label: 'B', value: 'Usar "sin embargo" or "no obstante" (however / nevertheless)', isCorrect: true },
      { label: 'C', value: 'Usar "también" (also)', isCorrect: false },
      { label: 'D', value: 'Usar "entonces" (then)', isCorrect: false },
    ], '"Sin embargo" and "no obstante" mean "however" or "nevertheless" and are used to introduce contrasting ideas. "Porque" means "because" and introduces a reason.', MEDIUM, 'Written Expression'),
    mcq('What tense should you use to describe a past event in a Spanish essay?', [
      { label: 'A', value: 'Future tense', isCorrect: false },
      { label: 'B', value: 'Present tense', isCorrect: false },
      { label: 'C', value: 'Preterite (pretérito) or imperfect tense', isCorrect: true },
      { label: 'D', value: 'Conditional tense', isCorrect: false },
    ], 'For past events, use the preterite (pretérito indefinido) for completed actions or the imperfect for ongoing/habitual past actions. Choosing between them is a key CSEC skill.', HARD, 'Written Expression'),
  ],

  // ─── French: 15 questions ───────────────────────────────────
  'CSEC-FR': [
    // Vocabulary & Expressions (3)
    mcq('What does "Comment vous appelez-vous?" mean in English?', [
      { label: 'A', value: 'How old are you?', isCorrect: false },
      { label: 'B', value: 'What is your name?', isCorrect: true },
      { label: 'C', value: 'Where do you live?', isCorrect: false },
      { label: 'D', value: 'What do you do?', isCorrect: false },
    ], '"Comment vous appelez-vous?" literally means "How do you call yourself?" and is the formal way to ask someone\'s name in French.', EASY, 'Vocabulary & Expressions'),
    mcq('What season does "l\'été" refer to in French?', [
      { label: 'A', value: 'Spring', isCorrect: false },
      { label: 'B', value: 'Summer', isCorrect: true },
      { label: 'C', value: 'Autumn', isCorrect: false },
      { label: 'D', value: 'Winter', isCorrect: false },
    ], '"L\'été" means summer. The four seasons are: le printemps (spring), l\'été (summer), l\'automne (autumn), and l\'hiver (winter).', EASY, 'Vocabulary & Expressions'),
    mcq('How do you say "the school" in French?', [
      { label: 'A', value: 'Le lycée', isCorrect: false },
      { label: 'B', value: 'L\'école', isCorrect: true },
      { label: 'C', value: 'La maison', isCorrect: false },
      { label: 'D', value: 'Le bureau', isCorrect: false },
    ], '"L\'école" means "the school." "Le lycée" specifically refers to high school. "La maison" means house, and "le bureau" means office or desk.', EASY, 'Vocabulary & Expressions'),

    // Grammar & Conjugation (3)
    mcq('What are the three main groups of regular verbs in French?', [
      { label: 'A', value: '-er, -ir, -re', isCorrect: true },
      { label: 'B', value: '-ar, -er, -ir', isCorrect: false },
      { label: 'C', value: '-er, -en, -ir', isCorrect: false },
      { label: 'D', value: '-er, -ir, -or', isCorrect: false },
    ], 'French verbs are classified into three regular groups: -er verbs (parler), -ir verbs (finir), and -re verbs (vendre), each with different conjugation patterns.', EASY, 'Grammar & Conjugation'),
    mcq('How do you conjugate the verb "être" (to be) in the je (I) form of the present tense?', [
      { label: 'A', value: 'Je suis', isCorrect: true },
      { label: 'B', value: 'Je es', isCorrect: false },
      { label: 'C', value: 'Je et', isCorrect: false },
      { label: 'D', value: 'Je être', isCorrect: false },
    ], 'Être is an irregular verb. Its conjugation includes: je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont.', EASY, 'Grammar & Conjugation'),
    mcq('What is the difference between the passé composé and the imparfait in French?', [
      { label: 'A', value: 'They are exactly the same tense', isCorrect: false },
      { label: 'B', value: 'Passé composé is for completed actions; imparfait is for ongoing or habitual past actions', isCorrect: true },
      { label: 'C', value: 'Passé composé is only used in formal writing', isCorrect: false },
      { label: 'D', value: 'Imparfait is used only for future events', isCorrect: false },
    ], 'The passé composé describes specific, completed past actions (e.g., "J\'ai mangé" = I ate). The imparfait describes ongoing states, habits, or background in the past ("Je mangeais" = I was eating).', HARD, 'Grammar & Conjugation'),

    // Reading Comprehension (2)
    mcq('When reading a French passage, the word "par contre" is used to express:', [
      { label: 'A', value: 'Agreement or addition', isCorrect: false },
      { label: 'B', value: 'Contrast or opposition (on the other hand / however)', isCorrect: true },
      { label: 'C', value: 'A conclusion', isCorrect: false },
      { label: 'D', value: 'A question', isCorrect: false },
    ], '"Par contre" means "on the other hand" or "however" and signals a contrasting idea. Other contrast connectors include "mais" (but) and "cependant" (nevertheless).', MEDIUM, 'Reading Comprehension'),
    mcq('In a French reading text, what does the phrase "il est important de" introduce?', [
      { label: 'A', value: 'A question', isCorrect: false },
      { label: 'B', value: 'A statement of importance or necessity', isCorrect: true },
      { label: 'C', value: 'A description of a place', isCorrect: false },
      { label: 'D', value: 'A comparison between two things', isCorrect: false },
    ], '"Il est important de" means "it is important to/that" and introduces a statement of importance. It is followed by an infinitive: "Il est important de protéger l\'environnement."', MEDIUM, 'Reading Comprehension'),

    // Listening Comprehension (2)
    mcq('In a French listening exercise, if you hear "Je voudrais un café, s\'il vous plaît," what is the person doing?', [
      { label: 'A', value: 'Offering coffee to someone', isCorrect: false },
      { label: 'B', value: 'Politely ordering/requesting a coffee', isCorrect: true },
      { label: 'C', value: 'Saying they dislike coffee', isCorrect: false },
      { label: 'D', value: 'Describing how coffee is made', isCorrect: false },
    ], '"Je voudrais" (I would like) is the polite conditional form used for ordering or requesting. "S\'il vous plaît" means "please."', EASY, 'Listening Comprehension'),
    mcq('When listening to French dialogue, what does "Qu\'est-ce que tu fais?" mean?', [
      { label: 'A', value: 'What are you doing?', isCorrect: true },
      { label: 'B', value: 'Where are you going?', isCorrect: false },
      { label: 'C', value: 'What do you want?', isCorrect: false },
      { label: 'D', value: 'Who are you?', isCorrect: false },
    ], '"Qu\'est-ce que tu fais?" means "What are you doing?" The formal version is "Qu\'est-ce que vous faites?" A shorter informal form is "Tu fais quoi?"', EASY, 'Listening Comprehension'),

    // Caribbean Context (2)
    mcq('Why is French relevant to Caribbean students taking CSEC?', [
      { label: 'A', value: 'All Caribbean countries speak French', isCorrect: false },
      { label: 'B', value: 'Because of French-speaking Caribbean neighbours like Haiti, Martinique, and Guadeloupe', isCorrect: true },
      { label: 'C', value: 'Only because it is on the CSEC syllabus', isCorrect: false },
      { label: 'D', value: 'There is no relevance at all', isCorrect: false },
    ], 'French is relevant due to geographical and cultural proximity to French-speaking Caribbean territories: Haiti (independent), Martinique and Guadeloupe (French overseas departments).', MEDIUM, 'Caribbean Context'),
    mcq('Which Caribbean territory is officially French-speaking?', [
      { label: 'A', value: 'Jamaica', isCorrect: false },
      { label: 'B', value: 'Haiti', isCorrect: true },
      { label: 'C', value: 'Trinidad and Tobago', isCorrect: false },
      { label: 'D', value: 'Barbados', isCorrect: false },
    ], 'Haiti is a French-speaking Caribbean nation. Martinique, Guadeloupe, Saint Martin, and Saint Barthélemy are French overseas territories where French is also spoken.', EASY, 'Caribbean Context'),

    // Written Expression (3)
    mcq('In a formal French letter, how do you begin the greeting?', [
      { label: 'A', value: 'Salut', isCorrect: false },
      { label: 'B', value: 'Cher Monsieur / Chère Madame', isCorrect: true },
      { label: 'C', value: 'Coucou', isCorrect: false },
      { label: 'D', value: 'Bonjour à tous', isCorrect: false },
    ], '"Cher Monsieur" (Dear Sir) or "Chère Madame" (Dear Madam) are formal greetings. "Salut" and "Coucou" are informal and should NOT be used in formal letters.', MEDIUM, 'Written Expression'),
    mcq('Which connector would you use in a French essay to add information to a previous point?', [
      { label: 'A', value: 'Mais (but)', isCorrect: false },
      { label: 'B', value: 'De plus (furthermore / moreover)', isCorrect: true },
      { label: 'C', value: 'Donc (therefore)', isCorrect: false },
      { label: 'D', value: 'Pourtant (however)', isCorrect: false },
    ], '"De plus" means "furthermore" or "moreover" and is used to add supporting information. "En outre" is another formal alternative. "Mais" introduces a contrast.', MEDIUM, 'Written Expression'),
    mcq('When describing daily routine in French, which tense is most appropriate?', [
      { label: 'A', value: 'Passé composé', isCorrect: false },
      { label: 'B', value: 'Futur simple', isCorrect: false },
      { label: 'C', value: 'Présent (present tense)', isCorrect: true },
      { label: 'D', value: 'Conditionnel', isCorrect: false },
    ], 'The present tense is used to describe daily routines and habitual actions (e.g., "Je me lève à six heures" = I get up at six o\'clock).', EASY, 'Written Expression'),
  ],
}

// ── Main Seeding Function ────────────────────────────────────

async function main() {
  console.log('🌱 Seeding 8 new CSEC subjects (Part 1) into the database...\n')

  let subjectCount = 0
  let topicCount = 0
  let questionCount = 0
  const subjectDetails: { name: string; code: string; icon: string; topicCount: number; questionCount: number }[] = []

  // 1. Create subjects and topics
  for (const subj of SUBJECTS) {
    const subject = await db.subject.upsert({
      where: { code: subj.code },
      update: { name: subj.name, description: subj.description, color: subj.color, icon: subj.icon },
      create: { name: subj.name, code: subj.code, description: subj.description, color: subj.color, icon: subj.icon },
    })
    subjectCount++
    console.log(`  ✓ Subject: ${subj.name} (${subj.code})`)

    let createdTopicCount = 0
    for (let i = 0; i < subj.topics.length; i++) {
      await db.topic.upsert({
        where: { name_subjectId: { name: subj.topics[i], subjectId: subject.id } },
        update: { order: i },
        create: { name: subj.topics[i], subjectId: subject.id, order: i },
      })
      topicCount++
      createdTopicCount++
    }

    subjectDetails.push({ name: subj.name, code: subj.code, icon: subj.icon, topicCount: createdTopicCount, questionCount: 0 })
  }

  console.log(`\n📊 Created ${subjectCount} subjects and ${topicCount} topics.\n`)

  // 2. Create questions
  for (const [subjectCode, questions] of Object.entries(QUESTIONS)) {
    const subject = await db.subject.findUnique({ where: { code: subjectCode } })
    if (!subject) {
      console.error(`  ✗ Subject not found: ${subjectCode}`)
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
          source: q.source,
        },
      })
      questionCount++
    }

    const detail = subjectDetails.find(s => s.code === subjectCode)
    if (detail) detail.questionCount = questions.length
    console.log(`  ✓ Questions for ${subject.name}: ${questions.length}`)
  }

  console.log(`\n📊 Created ${questionCount} questions.\n`)

  // 3. Summary
  console.log(`${'═'.repeat(60)}`)
  console.log(`✅ CSEC Part 1 Seed Complete!`)
  console.log(`${'─'.repeat(60)}`)
  console.log(`   Total Subjects:  ${subjectCount}`)
  console.log(`   Total Topics:    ${topicCount}`)
  console.log(`   Total Questions: ${questionCount}`)
  console.log(`${'─'.repeat(60)}`)
  for (const d of subjectDetails) {
    console.log(`   ${d.icon} ${d.name}: ${d.topicCount} topics, ${d.questionCount} questions`)
  }
  console.log(`${'═'.repeat(60)}`)

  await db.$disconnect()
}

main().catch((e) => {
  console.error('❌ Seed failed:', e)
  process.exit(1)
})
