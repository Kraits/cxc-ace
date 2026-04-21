/**
 * CXC Ace – CSEC Seed Part 1
 * Adds 8 CSEC subjects with 15 MCQ questions each (120 total)
 *
 * Subjects: English B, Social Studies, IT, POB, POA, Economics, Spanish, French
 *
 * Usage: DATABASE_URL=<turso_url> DATABASE_AUTH_TOKEN=<token> npx tsx prisma/seed-new-csec-1.ts
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

// ── Subject Definitions ─────────────────────────────────────

const SUBJECTS = [
  { name: 'English B (Literature)', code: 'CSEC-ENGB', description: 'CSEC English B (Literature)', color: '#e11d48', icon: '📚', topics: ['Poetry', 'Drama', 'Prose Fiction', 'Literary Devices', 'Critical Analysis'] },
  { name: 'Social Studies', code: 'CSEC-SOSTUD', description: 'CSEC Social Studies', color: '#8b5cf6', icon: '👥', topics: ['Social Institutions', 'Culture & Socialization', 'Social Control', 'Social Change', 'Caribbean Social Issues'] },
  { name: 'Information Technology', code: 'CSEC-IT', description: 'CSEC Information Technology', color: '#06b6d4', icon: '💻', topics: ['Computer Hardware', 'Software & OS', 'Networks & Internet', 'Programming', 'Data Management'] },
  { name: 'Principles of Business', code: 'CSEC-POB', description: 'CSEC Principles of Business', color: '#84cc16', icon: '💼', topics: ['The Business Environment', 'Business Ownership', 'Production', 'Marketing', 'Finance & Accounting'] },
  { name: 'Principles of Accounts', code: 'CSEC-POA', description: 'CSEC Principles of Accounts', color: '#f97316', icon: '📊', topics: ['The Accounting Equation', 'Books of Original Entry', 'Ledgers & Trial Balance', 'Financial Statements', 'Partnership Accounts'] },
  { name: 'Economics', code: 'CSEC-ECON', description: 'CSEC Economics', color: '#64748b', icon: '💰', topics: ['Basic Economic Concepts', 'Demand & Supply', 'Market Structures', 'Production & Costs', 'Caribbean Economy'] },
  { name: 'Spanish', code: 'CSEC-SPAN', description: 'CSEC Spanish', color: '#dc2626', icon: '🇪🇸', topics: ['Grammar & Vocabulary', 'Reading Comprehension', 'Oral Communication', 'Writing Skills', 'Hispanic Culture'] },
  { name: 'French', code: 'CSEC-FREN', description: 'CSEC French', color: '#2563eb', icon: '🇫🇷', topics: ['Grammar & Vocabulary', 'Reading Comprehension', 'Oral Communication', 'Writing Skills', 'French Culture'] },
]

// ── Questions ────────────────────────────────────────────────

const QUESTIONS: Record<string, ReturnType<typeof mcq>[]> = {

  // ─── English B (Literature): 15 questions ───────────────────
  'CSEC-ENGB': [
    // Poetry — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is a stanza in a poem?', [
      { label: 'A', value: 'A single line of poetry', isCorrect: false },
      { label: 'B', value: 'A group of lines forming a unit within a poem', isCorrect: true },
      { label: 'C', value: 'The rhyme at the end of a line', isCorrect: false },
      { label: 'D', value: 'The emotional tone of the poem', isCorrect: false },
    ], 'A stanza is a grouped set of lines within a poem, usually separated by a blank line. Stanzas function like paragraphs in prose, organizing ideas.', EASY, 'Poetry'),
    mcq('What is the rhyme scheme of a Shakespearean sonnet?', [
      { label: 'A', value: 'ABBA CDDC EFEF GG', isCorrect: false },
      { label: 'B', value: 'ABAB CDCD EFEF GG', isCorrect: true },
      { label: 'C', value: 'AABB CCDD EEFF GG', isCorrect: false },
      { label: 'D', value: 'ABCB DEFE GHIJ KK', isCorrect: false },
    ], 'A Shakespearean (English) sonnet follows the rhyme scheme ABAB CDCD EFEF GG, consisting of three quatrains and a closing rhyming couplet.', MEDIUM, 'Poetry'),
    mcq('In the poem "Once Upon a Time" by Gabriel Okara, what does the speaker mean by "laugh with their teeth"?', [
      { label: 'A', value: 'People show genuine happiness when they smile', isCorrect: false },
      { label: 'B', value: 'People hide their true feelings behind fake, insincere smiles', isCorrect: true },
      { label: 'C', value: 'People are always hungry and eat while talking', isCorrect: false },
      { label: 'D', value: 'People have dental problems that make them laugh oddly', isCorrect: false },
    ], 'The phrase "laugh with their teeth" is a metaphor for fake, superficial laughter. Okara contrasts this with the sincere laughter of childhood, "laughing with their eyes."', HARD, 'Poetry'),

    // Drama — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is a soliloquy in a play?', [
      { label: 'A', value: 'A conversation between two characters', isCorrect: false },
      { label: 'B', value: 'A speech by a character alone on stage revealing inner thoughts', isCorrect: true },
      { label: 'C', value: 'A group of actors speaking together', isCorrect: false },
      { label: 'D', value: 'A song performed between acts', isCorrect: false },
    ], 'A soliloquy is a dramatic device where a character speaks aloud while alone on stage, revealing their innermost thoughts and feelings to the audience.', EASY, 'Drama'),
    mcq('What is dramatic irony?', [
      { label: 'A', value: 'When a character says the opposite of what they mean', isCorrect: false },
      { label: 'B', value: 'When the ending of a play is unexpectedly happy', isCorrect: false },
      { label: 'C', value: 'When the audience knows something that the characters on stage do not', isCorrect: true },
      { label: 'D', value: 'When two characters exchange witty insults', isCorrect: false },
    ], 'Dramatic irony occurs when the audience has knowledge that characters lack, creating tension or humour. For example, in "Romeo and Juliet," the audience knows Juliet is alive while Romeo believes she is dead.', MEDIUM, 'Drama'),
    mcq('In "The Tempest" by Shakespeare, how does Prospero use his magic throughout the play and what does his decision to renounce it symbolize?', [
      { label: 'A', value: 'He uses magic for revenge and keeps it forever', isCorrect: false },
      { label: 'B', value: 'He uses magic to control the island and renouncing it symbolizes forgiveness and return to the human world', isCorrect: true },
      { label: 'C', value: 'He never actually uses magic; Ariel does everything', isCorrect: false },
      { label: 'D', value: 'He uses magic only to build shelter for Miranda', isCorrect: false },
    ], 'Prospero uses magic to orchestrate events on the island, but his decision to break his staff and drown his book symbolizes his forgiveness of his enemies and his return to humanity and the political world.', HARD, 'Drama'),

    // Prose Fiction — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is the setting of a story?', [
      { label: 'A', value: 'The moral lesson the author wants to teach', isCorrect: false },
      { label: 'B', value: 'The time and place where the events of the story occur', isCorrect: true },
      { label: 'C', value: 'The name of the main character', isCorrect: false },
      { label: 'D', value: 'The conflict between the protagonist and antagonist', isCorrect: false },
    ], 'The setting refers to the time period, geographical location, and social environment in which the story takes place. It shapes the mood and influences events.', EASY, 'Prose Fiction'),
    mcq('What is the difference between first-person and third-person narration?', [
      { label: 'A', value: 'First-person uses "I"; third-person uses "he/she/they" as an external narrator', isCorrect: true },
      { label: 'B', value: 'There is no real difference between them', isCorrect: false },
      { label: 'C', value: 'Third-person narration is always more reliable than first-person', isCorrect: false },
      { label: 'D', value: 'First-person only appears in novels, never in short stories', isCorrect: false },
    ], 'First-person narration uses "I" and limits the perspective to what the narrator knows and experiences. Third-person narration uses "he/she/they" and may be limited or omniscient.', MEDIUM, 'Prose Fiction'),
    mcq('In "To Kill a Mockingbird" by Harper Lee, how does the motif of the mockingbird function thematically in relation to both Tom Robinson and Boo Radley?', [
      { label: 'A', value: 'It represents the courage of Atticus as a lawyer', isCorrect: false },
      { label: 'B', value: 'It symbolizes innocent beings who are destroyed or harmed by social prejudice despite doing no wrong', isCorrect: true },
      { label: 'C', value: 'It represents the racial divide in Maycomb County', isCorrect: false },
      { label: 'D', value: 'It symbolizes the children\'s loss of innocence as they grow up', isCorrect: false },
    ], 'The mockingbird symbolizes innocence destroyed by society. Tom Robinson, convicted despite clear evidence of innocence, and Boo Radley, vilified by rumours, both embody this symbol, reinforcing the theme of social injustice.', HARD, 'Prose Fiction'),

    // Literary Devices — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('Which literary device is used in: "The wind whispered through the trees"?', [
      { label: 'A', value: 'Simile', isCorrect: false },
      { label: 'B', value: 'Metaphor', isCorrect: false },
      { label: 'C', value: 'Personification', isCorrect: true },
      { label: 'D', value: 'Alliteration', isCorrect: false },
    ], 'Personification gives human qualities (whispering) to a non-human entity (the wind), making descriptions more vivid and relatable.', EASY, 'Literary Devices'),
    mcq('What is the difference between a simile and a metaphor?', [
      { label: 'A', value: 'A simile uses "like" or "as"; a metaphor makes a direct comparison without them', isCorrect: true },
      { label: 'B', value: 'They are exactly the same device with different names', isCorrect: false },
      { label: 'C', value: 'A metaphor uses "like" or "as"; a simile does not', isCorrect: false },
      { label: 'D', value: 'A simile is only used in poetry; a metaphor only in prose', isCorrect: false },
    ], 'Both compare unlike things, but a simile uses "like" or "as" (e.g., "brave as a lion"), while a metaphor states one thing IS another (e.g., "Time is a thief").', MEDIUM, 'Literary Devices'),
    mcq('What is the effect of using an unreliable narrator in a novel?', [
      { label: 'A', value: 'It makes the story shorter and easier to follow', isCorrect: false },
      { label: 'B', value: 'It forces the reader to question the truth of the narration and engage in critical interpretation', isCorrect: true },
      { label: 'C', value: 'It guarantees that the story will have a happy ending', isCorrect: false },
      { label: 'D', value: 'It removes all conflict from the narrative', isCorrect: false },
    ], 'An unreliable narrator\'s credibility is compromised, forcing readers to actively interpret events, identify bias, and determine what is actually true — deepening engagement and critical analysis.', HARD, 'Literary Devices'),

    // Critical Analysis — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is the theme of a literary work?', [
      { label: 'A', value: 'The central topic or underlying message the author explores', isCorrect: true },
      { label: 'B', value: 'The physical setting where the story takes place', isCorrect: false },
      { label: 'C', value: 'The number of chapters in the book', isCorrect: false },
      { label: 'D', value: 'The author\'s biography', isCorrect: false },
    ], 'A theme is the central idea, message, or underlying meaning that a writer explores in a work. Common themes include love, power, identity, and social justice.', EASY, 'Critical Analysis'),
    mcq('When analysing a poem, why is it important to consider the historical context in which it was written?', [
      { label: 'A', value: 'It is only important if the poem mentions historical events by name', isCorrect: false },
      { label: 'B', value: 'Historical context is never relevant to literary analysis', isCorrect: false },
      { label: 'C', value: 'It helps the reader understand the social, political, and cultural influences that shaped the poet\'s ideas and language', isCorrect: true },
      { label: 'D', value: 'It only matters for poems written before 1900', isCorrect: false },
    ], 'Historical context reveals the social conditions, political events, and cultural movements that influenced the poet, leading to a deeper and more accurate interpretation of the work.', MEDIUM, 'Critical Analysis'),
    mcq('How does a feminist critical approach to literature challenge traditional readings of a text?', [
      { label: 'A', value: 'It focuses exclusively on the grammatical structure of sentences', isCorrect: false },
      { label: 'B', value: 'It examines how gender roles, power dynamics, and patriarchal structures shape characters, relationships, and meaning', isCorrect: true },
      { label: 'C', value: 'It only analyses works written by female authors', isCorrect: false },
      { label: 'D', value: 'It rejects all traditional literary devices', isCorrect: false },
    ], 'Feminist criticism examines how texts reinforce or challenge gender norms, expose power imbalances, and represent (or marginalize) female experiences, offering alternative perspectives on familiar works.', HARD, 'Critical Analysis'),
  ],

  // ─── Social Studies: 15 questions ──────────────────────────
  'CSEC-SOSTUD': [
    // Social Institutions — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('Which of the following is an example of a social institution?', [
      { label: 'A', value: 'A fast food restaurant', isCorrect: false },
      { label: 'B', value: 'The education system', isCorrect: true },
      { label: 'C', value: 'A professional sports team', isCorrect: false },
      { label: 'D', value: 'A shopping mall', isCorrect: false },
    ], 'Social institutions are organized systems and structures that fulfill essential societal functions. The education system is a key institution alongside family, religion, government, and the economy.', EASY, 'Social Institutions'),
    mcq('What is the primary function of the family as a social institution?', [
      { label: 'A', value: 'To generate profits for the national economy', isCorrect: false },
      { label: 'B', value: 'To regulate international trade agreements', isCorrect: false },
      { label: 'C', value: 'To socialize children and provide emotional and economic support to members', isCorrect: true },
      { label: 'D', value: 'To organize political campaigns and elections', isCorrect: false },
    ], 'The family is the primary agent of socialization, providing nurturing, emotional support, economic cooperation, and transmitting cultural values and norms to the next generation.', MEDIUM, 'Social Institutions'),
    mcq('How do social institutions maintain social order and stability in Caribbean societies?', [
      { label: 'A', value: 'By preventing any form of social change', isCorrect: false },
      { label: 'B', value: 'By establishing shared norms, values, and roles that guide behaviour and reduce conflict', isCorrect: true },
      { label: 'C', value: 'By eliminating all individual freedoms', isCorrect: false },
      { label: 'D', value: 'By separating people into completely independent groups', isCorrect: false },
    ], 'Social institutions provide structure through established roles, norms, and values. They create predictability and cooperation, though they can also perpetuate inequality when they resist necessary reform.', HARD, 'Social Institutions'),

    // Culture & Socialization — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is socialization?', [
      { label: 'A', value: 'The process of learning the norms, values, and behaviours of one\'s society', isCorrect: true },
      { label: 'B', value: 'The process of applying for a passport', isCorrect: false },
      { label: 'C', value: 'The study of ancient civilizations', isCorrect: false },
      { label: 'D', value: 'The act of attending social events and parties', isCorrect: false },
    ], 'Socialization is the lifelong process through which individuals learn and internalize the culture, norms, values, and behaviours expected of them by their society.', EASY, 'Culture & Socialization'),
    mcq('What is cultural assimilation?', [
      { label: 'A', value: 'When two cultures remain completely separate from each other', isCorrect: false },
      { label: 'B', value: 'When a minority group adopts the cultural traits of the dominant society', isCorrect: true },
      { label: 'C', value: 'When cultures merge to form an entirely new and different culture', isCorrect: false },
      { label: 'D', value: 'When a culture rejects all outside influences entirely', isCorrect: false },
    ], 'Cultural assimilation occurs when a minority or immigrant group gradually adopts the language, customs, values, and behaviours of the dominant or host culture, sometimes losing aspects of their original culture.', MEDIUM, 'Culture & Socialization'),
    mcq('In the Caribbean context, how does cultural pluralism differ from the "melting pot" theory?', [
      { label: 'A', value: 'Cultural pluralism means only one culture survives; the melting pot means all survive', isCorrect: false },
      { label: 'B', value: 'Cultural pluralism allows different cultures to coexist while maintaining distinct identities, unlike the melting pot which implies blending into one', isCorrect: true },
      { label: 'C', value: 'There is no difference between the two concepts', isCorrect: false },
      { label: 'D', value: 'The melting pot theory was only developed in the Caribbean', isCorrect: false },
    ], 'Caribbean societies are culturally pluralistic — African, Indian, European, Chinese, and Indigenous cultures coexist and contribute to society while maintaining distinct traditions, unlike the melting pot model of complete blending.', HARD, 'Culture & Socialization'),

    // Social Control — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is the difference between formal and informal social control?', [
      { label: 'A', value: 'Formal control uses laws and institutions; informal control uses norms and social pressure', isCorrect: true },
      { label: 'B', value: 'They are exactly the same thing', isCorrect: false },
      { label: 'C', value: 'Informal control is enforced by the police; formal control by friends', isCorrect: false },
      { label: 'D', value: 'Only formal control exists in modern societies', isCorrect: false },
    ], 'Formal social control involves established institutions (police, courts) enforcing written laws. Informal social control operates through family, peers, and community norms applying social pressure.', EASY, 'Social Control'),
    mcq('What is a sanction in the context of social control?', [
      { label: 'A', value: 'A type of financial investment', isCorrect: false },
      { label: 'B', value: 'A reward or punishment used to enforce social norms', isCorrect: true },
      { label: 'C', value: 'An official government document', isCorrect: false },
      { label: 'D', value: 'A permit to start a business', isCorrect: false },
    ], 'Sanctions are consequences for behaviour that either enforce conformity (positive sanctions like praise) or discourage norm violation (negative sanctions like fines, imprisonment, or social disapproval).', MEDIUM, 'Social Control'),
    mcq('How does deviance contribute to social change in society?', [
      { label: 'A', value: 'Deviance always destroys societies and has no positive effects', isCorrect: false },
      { label: 'B', value: 'Deviance challenges existing norms and can lead to the re-evaluation and reform of social rules', isCorrect: true },
      { label: 'C', value: 'Deviance only occurs in societies without laws', isCorrect: false },
      { label: 'D', value: 'Deviance is always criminal behaviour', isCorrect: false },
    ], 'While deviance can be harmful, it also drives social progress by challenging unjust norms (e.g., civil rights activists breaking segregation laws). Functionalists see some deviance as necessary for social evolution.', HARD, 'Social Control'),

    // Social Change — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('Which of the following is an agent of social change?', [
      { label: 'A', value: 'Technology', isCorrect: true },
      { label: 'B', value: 'A perfectly unchanging tradition', isCorrect: false },
      { label: 'C', value: 'A rule that has never been broken', isCorrect: false },
      { label: 'D', value: 'Isolation from other societies', isCorrect: false },
    ], 'Technology is a major agent of social change because it transforms how people communicate, work, and live, driving shifts in social structures, relationships, and cultural practices.', EASY, 'Social Change'),
    mcq('What is the difference between evolution and revolution as forms of social change?', [
      { label: 'A', value: 'Evolution is gradual change; revolution is rapid, fundamental change', isCorrect: true },
      { label: 'B', value: 'Revolution is slow; evolution is fast', isCorrect: false },
      { label: 'C', value: 'Both terms mean exactly the same thing', isCorrect: false },
      { label: 'D', value: 'Evolution only applies to biological changes', isCorrect: false },
    ], 'Evolutionary change occurs gradually over time (e.g., women\'s rights expanding over decades). Revolutionary change is sudden and fundamental, often involving overthrow of existing systems (e.g., the Haitian Revolution).', MEDIUM, 'Social Change'),
    mcq('How has globalization affected social change in the Caribbean?', [
      { label: 'A', value: 'Globalization has had no noticeable impact on Caribbean societies', isCorrect: false },
      { label: 'B', value: 'Globalization has only brought positive changes with no drawbacks', isCorrect: false },
      { label: 'C', value: 'Globalization has transformed economies, cultures, and identities while creating both opportunities and challenges', isCorrect: true },
      { label: 'D', value: 'Globalization has caused the Caribbean to become completely isolated', isCorrect: false },
    ], 'Globalization has brought economic integration, media access, and migration opportunities to the Caribbean, but also cultural homogenization, economic dependency, and the erosion of local traditions — a complex dual impact.', HARD, 'Social Change'),

    // Caribbean Social Issues — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is the term for the emigration of highly skilled and educated persons from the Caribbean?', [
      { label: 'A', value: 'Internal migration', isCorrect: false },
      { label: 'B', value: 'Brain drain', isCorrect: true },
      { label: 'C', value: 'Rural-to-urban migration', isCorrect: false },
      { label: 'D', value: 'Seasonal migration', isCorrect: false },
    ], 'Brain drain refers to the emigration of trained professionals (doctors, nurses, teachers, engineers) from Caribbean nations to developed countries, depleting the local workforce and expertise.', EASY, 'Caribbean Social Issues'),
    mcq('What does CARICOM stand for and what is its main purpose?', [
      { label: 'A', value: 'Caribbean Commonwealth — it manages sporting events', isCorrect: false },
      { label: 'B', value: 'Caribbean Community — it promotes economic integration and cooperation among member states', isCorrect: true },
      { label: 'C', value: 'Caribbean Catholic Organization — it manages religious schools', isCorrect: false },
      { label: 'D', value: 'Caribbean Cooperation Region — it handles military alliances', isCorrect: false },
    ], 'CARICOM (Caribbean Community), established by the Treaty of Chaguaramas in 1973, promotes economic integration, foreign policy coordination, and functional cooperation among Caribbean nations.', MEDIUM, 'Caribbean Social Issues'),
    mcq('Analyse the impact of tourism on Caribbean social structures and culture. Which statement best describes this relationship?', [
      { label: 'A', value: 'Tourism has only positive effects with no negative consequences', isCorrect: false },
      { label: 'B', value: 'Tourism creates employment but can also lead to cultural commodification, environmental degradation, and economic dependency', isCorrect: true },
      { label: 'C', value: 'Tourism has no significant effect on Caribbean culture', isCorrect: false },
      { label: 'D', value: 'Tourism only benefits foreign investors and never helps locals', isCorrect: false },
    ], 'Tourism is a double-edged sword for the Caribbean. While generating employment and foreign exchange, it can commodify culture, increase cost of living, cause environmental damage, and create dependency on volatile foreign markets.', HARD, 'Caribbean Social Issues'),
  ],

  // ─── Information Technology: 15 questions ──────────────────
  'CSEC-IT': [
    // Computer Hardware — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is the main function of the CPU (Central Processing Unit)?', [
      { label: 'A', value: 'To store data permanently', isCorrect: false },
      { label: 'B', value: 'To display output on a monitor', isCorrect: false },
      { label: 'C', value: 'To process instructions and perform calculations', isCorrect: true },
      { label: 'D', value: 'To connect the computer to the internet', isCorrect: false },
    ], 'The CPU is the "brain" of the computer that executes instructions, performs arithmetic and logical operations, and coordinates all other hardware components.', EASY, 'Computer Hardware'),
    mcq('Which type of memory is volatile and loses its contents when power is turned off?', [
      { label: 'A', value: 'ROM (Read Only Memory)', isCorrect: false },
      { label: 'B', value: 'Hard disk drive', isCorrect: false },
      { label: 'C', value: 'RAM (Random Access Memory)', isCorrect: true },
      { label: 'D', value: 'Solid state drive', isCorrect: false },
    ], 'RAM is volatile memory — it stores data temporarily while the computer is running and loses all data when power is switched off. ROM and storage drives are non-volatile.', MEDIUM, 'Computer Hardware'),
    mcq('What is the purpose of cache memory in a computer system and how does it improve performance?', [
      { label: 'A', value: 'Cache memory stores the operating system permanently', isCorrect: false },
      { label: 'B', value: 'Cache memory is a small, fast memory that stores frequently accessed data to reduce CPU waiting time', isCorrect: true },
      { label: 'C', value: 'Cache memory replaces the hard drive entirely', isCorrect: false },
      { label: 'D', value: 'Cache memory is only used in mobile phones', isCorrect: false },
    ], 'Cache memory sits between the CPU and RAM, holding frequently used data and instructions. Because it is faster than RAM, it reduces the time the CPU spends waiting for data, significantly improving performance.', HARD, 'Computer Hardware'),

    // Software & OS — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('Which of the following is an example of application software?', [
      { label: 'A', value: 'Microsoft Windows', isCorrect: false },
      { label: 'B', value: 'Microsoft Word', isCorrect: true },
      { label: 'C', value: 'Linux', isCorrect: false },
      { label: 'D', value: 'A device driver', isCorrect: false },
    ], 'Microsoft Word is application software used for word processing. Windows, Linux, and device drivers are system software that manage the computer hardware.', EASY, 'Software & OS'),
    mcq('What is the difference between system software and application software?', [
      { label: 'A', value: 'System software manages hardware and provides a platform; application software performs specific user tasks', isCorrect: true },
      { label: 'B', value: 'There is no meaningful difference between them', isCorrect: false },
      { label: 'C', value: 'Application software manages hardware; system software performs user tasks', isCorrect: false },
      { label: 'D', value: 'System software is only used in gaming', isCorrect: false },
    ], 'System software (operating systems, utilities) manages hardware resources and provides a platform for other software. Application software (word processors, browsers) performs specific tasks for the user.', MEDIUM, 'Software & OS'),
    mcq('What is the role of a device driver in an operating system?', [
      { label: 'A', value: 'It physically drives the computer from one location to another', isCorrect: false },
      { label: 'B', value: 'It is a program that allows the operating system to communicate with hardware devices', isCorrect: true },
      { label: 'C', value: 'It is a type of antivirus software', isCorrect: false },
      { label: 'D', value: 'It is a backup utility for data recovery', isCorrect: false },
    ], 'A device driver is specialized software that acts as a translator between the operating system and a hardware device (printer, graphics card, sound card), enabling them to work together properly.', HARD, 'Software & OS'),

    // Networks & Internet — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What does LAN stand for?', [
      { label: 'A', value: 'Large Area Network', isCorrect: false },
      { label: 'B', value: 'Local Area Network', isCorrect: true },
      { label: 'C', value: 'Long Access Network', isCorrect: false },
      { label: 'D', value: 'Linked Area Node', isCorrect: false },
    ], 'LAN stands for Local Area Network, connecting computers within a limited area such as a home, school, or office building, typically using Ethernet or Wi-Fi.', EASY, 'Networks & Internet'),
    mcq('What is an IP address?', [
      { label: 'A', value: 'A physical mailing address for a computer company', isCorrect: false },
      { label: 'B', value: 'A unique numerical label that identifies a device on a network', isCorrect: true },
      { label: 'C', value: 'A type of software license key', isCorrect: false },
      { label: 'D', value: 'An email address format', isCorrect: false },
    ], 'An IP (Internet Protocol) address is a unique numerical identifier (e.g., 192.168.1.1) assigned to each device on a network, enabling data routing and communication between devices.', MEDIUM, 'Networks & Internet'),
    mcq('What is the difference between TCP and UDP protocols in data transmission?', [
      { label: 'A', value: 'TCP guarantees delivery with error checking; UDP is faster but does not guarantee delivery', isCorrect: true },
      { label: 'B', value: 'UDP is more reliable than TCP in all situations', isCorrect: false },
      { label: 'C', value: 'TCP and UDP are the same protocol with different names', isCorrect: false },
      { label: 'D', value: 'UDP is only used for wired networks; TCP only for wireless', isCorrect: false },
    ], 'TCP (Transmission Control Protocol) is connection-oriented, ensuring reliable, ordered delivery with error checking. UDP (User Datagram Protocol) is connectionless and faster, used for streaming and gaming where speed matters more than perfect reliability.', HARD, 'Networks & Internet'),

    // Programming — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is an algorithm?', [
      { label: 'A', value: 'A type of programming language', isCorrect: false },
      { label: 'B', value: 'A step-by-step procedure for solving a problem', isCorrect: true },
      { label: 'C', value: 'A hardware component inside the computer', isCorrect: false },
      { label: 'D', value: 'A type of computer virus', isCorrect: false },
    ], 'An algorithm is a finite, well-defined sequence of steps or rules that provides a solution to a specific problem. Algorithms are the logical foundation of all computer programs.', EASY, 'Programming'),
    mcq('In programming, what is a variable?', [
      { label: 'A', value: 'A fixed value that never changes during program execution', isCorrect: false },
      { label: 'B', value: 'A type of loop structure', isCorrect: false },
      { label: 'C', value: 'A named storage location that holds a value which may change during execution', isCorrect: true },
      { label: 'D', value: 'A mathematical operator like addition or subtraction', isCorrect: false },
    ], 'A variable is a named memory location used to store data values. It has a name (identifier), a data type (e.g., integer, string), and a value that can change during program execution.', MEDIUM, 'Programming'),
    mcq('What is the difference between a WHILE loop and a FOR loop in programming?', [
      { label: 'A', value: 'A FOR loop repeats a fixed number of times; a WHILE loop repeats as long as a condition is true', isCorrect: true },
      { label: 'B', value: 'They are exactly the same with no differences', isCorrect: false },
      { label: 'C', value: 'A WHILE loop is always faster than a FOR loop', isCorrect: false },
      { label: 'D', value: 'A FOR loop can only be used in Python, not in other languages', isCorrect: false },
    ], 'A FOR loop is used when the number of iterations is known in advance (count-controlled). A WHILE loop is used when the number of iterations depends on a condition being met (condition-controlled).', HARD, 'Programming'),

    // Data Management — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('In a database, what is a primary key?', [
      { label: 'A', value: 'The first field listed in a table', isCorrect: false },
      { label: 'B', value: 'The most important piece of data in any table', isCorrect: false },
      { label: 'C', value: 'A field that uniquely identifies each record in a table', isCorrect: true },
      { label: 'D', value: 'A password used to log into the database', isCorrect: false },
    ], 'A primary key is a field (or combination of fields) that uniquely identifies each record in a database table. No two records can have the same primary key value, ensuring data integrity.', EASY, 'Data Management'),
    mcq('What is the difference between a query and a report in a database?', [
      { label: 'A', value: 'A query extracts specific data; a report presents extracted data in a formatted layout', isCorrect: true },
      { label: 'B', value: 'There is no difference between them', isCorrect: false },
      { label: 'C', value: 'A report extracts data; a query formats it', isCorrect: false },
      { label: 'D', value: 'A query can only be used in spreadsheets, not databases', isCorrect: false },
    ], 'A query requests specific data from a database based on search criteria. A report presents that data in a formatted, organized manner suitable for printing, analysis, or presentation.', MEDIUM, 'Data Management'),
    mcq('What is data normalization in database design and why is it important?', [
      { label: 'A', value: 'Normalization means deleting all duplicate records from a database', isCorrect: false },
      { label: 'B', value: 'Normalization is the process of organizing data to reduce redundancy and improve data integrity', isCorrect: true },
      { label: 'C', value: 'Normalization means converting all data to uppercase', isCorrect: false },
      { label: 'D', value: 'Normalization is only necessary for very large databases', isCorrect: false },
    ], 'Data normalization organizes fields and tables to minimize redundancy and dependency. It involves dividing large tables into smaller ones and linking them, reducing data anomalies and ensuring consistency during updates.', HARD, 'Data Management'),
  ],

  // ─── Principles of Business: 15 questions ───────────────────
  'CSEC-POB': [
    // The Business Environment — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is the difference between needs and wants in business?', [
      { label: 'A', value: 'Needs are essential for survival; wants are non-essential desires', isCorrect: true },
      { label: 'B', value: 'There is no difference between needs and wants', isCorrect: false },
      { label: 'C', value: 'Wants are essential; needs are luxuries', isCorrect: false },
      { label: 'D', value: 'Needs only apply to businesses; wants only apply to consumers', isCorrect: false },
    ], 'Needs are basic requirements for survival (food, shelter, clothing). Wants are non-essential desires that improve quality of life (designer clothes, entertainment, luxury goods).', EASY, 'The Business Environment'),
    mcq('What are the four factors of production?', [
      { label: 'A', value: 'Marketing, finance, production, human resources', isCorrect: false },
      { label: 'B', value: 'Land, labour, capital, entrepreneurship', isCorrect: true },
      { label: 'C', value: 'Supply, demand, price, profit', isCorrect: false },
      { label: 'D', value: 'Import, export, tax, subsidy', isCorrect: false },
    ], 'The four factors of production are: Land (natural resources), Labour (human effort), Capital (man-made tools and machinery), and Entrepreneurship (the organizer who combines the other factors and takes risks).', MEDIUM, 'The Business Environment'),
    mcq('How does the economic environment affect business operations in the Caribbean?', [
      { label: 'A', value: 'The economic environment has no real effect on businesses', isCorrect: false },
      { label: 'B', value: 'Economic factors like inflation, exchange rates, and interest rates influence costs, pricing, and consumer spending power', isCorrect: true },
      { label: 'C', value: 'Only the political environment matters, not the economic one', isCorrect: false },
      { label: 'D', value: 'The economic environment only affects manufacturing businesses', isCorrect: false },
    ], 'Economic factors such as inflation, interest rates, exchange rates, unemployment levels, and GDP growth directly affect production costs, consumer purchasing power, borrowing costs, and overall business profitability in Caribbean nations.', HARD, 'The Business Environment'),

    // Business Ownership — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('Which form of business is easiest to start but exposes the owner to unlimited liability?', [
      { label: 'A', value: 'Public limited company', isCorrect: false },
      { label: 'B', value: 'Private limited company', isCorrect: false },
      { label: 'C', value: 'Sole proprietorship', isCorrect: true },
      { label: 'D', value: 'Cooperative', isCorrect: false },
    ], 'A sole proprietorship is the simplest form of business to establish, owned by one person. However, the owner has unlimited liability, meaning personal assets can be seized to pay business debts.', EASY, 'Business Ownership'),
    mcq('What is a franchise?', [
      { label: 'A', value: 'A type of government grant for new businesses', isCorrect: false },
      { label: 'B', value: 'A business arrangement where one party pays fees to operate using another\'s brand and business model', isCorrect: true },
      { label: 'C', value: 'A free business given by the government to citizens', isCorrect: false },
      { label: 'D', value: 'An equal partnership between two companies', isCorrect: false },
    ], 'A franchise allows an individual (franchisee) to operate a business using the branding, products, and proven business model of an established company (franchisor) in exchange for fees and royalties.', MEDIUM, 'Business Ownership'),
    mcq('Compare the advantages and disadvantages of a private limited company versus a public limited company in the Caribbean context.', [
      { label: 'A', value: 'A private limited company can sell shares to the public but has more restrictions', isCorrect: false },
      { label: 'B', value: 'A private limited company keeps ownership restricted but cannot raise capital from the public; a public limited company can sell shares publicly but faces stricter regulations', isCorrect: true },
      { label: 'C', value: 'Both types of companies operate identically with no differences', isCorrect: false },
      { label: 'D', value: 'Public limited companies cannot operate in the Caribbean', isCorrect: false },
    ], 'A private limited company (Ltd) restricts share ownership, offering privacy and control but limiting capital. A public limited company (PLC) can raise large capital by selling shares on the stock exchange but faces strict regulations and public scrutiny.', HARD, 'Business Ownership'),

    // Production — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is the difference between primary, secondary, and tertiary production?', [
      { label: 'A', value: 'Primary extracts raw materials, secondary manufactures goods, tertiary provides services', isCorrect: true },
      { label: 'B', value: 'They all refer to the same type of production', isCorrect: false },
      { label: 'C', value: 'Primary provides services, secondary extracts materials, tertiary sells goods', isCorrect: false },
      { label: 'D', value: 'Only primary production exists in modern economies', isCorrect: false },
    ], 'Primary production extracts raw materials (farming, mining, fishing). Secondary production manufactures goods from raw materials (factories, construction). Tertiary production provides services (banking, retail, education).', EASY, 'Production'),
    mcq('What is division of labour?', [
      { label: 'A', value: 'Dividing workers into labour unions', isCorrect: false },
      { label: 'B', value: 'Breaking down the production process into specialized tasks performed by different workers', isCorrect: true },
      { label: 'C', value: 'Separating management from the general workforce', isCorrect: false },
      { label: 'D', value: 'Distributing company profits among all employees equally', isCorrect: false },
    ], 'Division of labour splits a production process into separate, specialized tasks, each performed by a different worker. This increases efficiency, speed, and output per worker, as each person becomes skilled at their specific task.', MEDIUM, 'Production'),
    mcq('What is a Public-Private Partnership (PPP) and why is it significant for Caribbean development?', [
      { label: 'A', value: 'A PPP is a merger between two competing private companies', isCorrect: false },
      { label: 'B', value: 'A PPP is a collaboration between government and private sector to fund and operate public infrastructure projects', isCorrect: true },
      { label: 'C', value: 'A PPP is a type of government-owned enterprise', isCorrect: false },
      { label: 'D', value: 'A PPP only exists in European countries', isCorrect: false },
    ], 'PPPs allow Caribbean governments to leverage private sector investment and expertise for infrastructure (roads, ports, hospitals) that the government alone could not afford, sharing risks and resources for national development.', HARD, 'Production'),

    // Marketing — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What are the 4Ps of the marketing mix?', [
      { label: 'A', value: 'Product, Price, Place, Promotion', isCorrect: true },
      { label: 'B', value: 'People, Process, Plan, Profit', isCorrect: false },
      { label: 'C', value: 'Production, Price, Packaging, Performance', isCorrect: false },
      { label: 'D', value: 'Planning, Pricing, Positioning, Publishing', isCorrect: false },
    ], 'The marketing mix consists of the 4Ps: Product (what is being sold), Price (how much is charged), Place (where and how it is distributed), and Promotion (how it is advertised and communicated to consumers).', EASY, 'Marketing'),
    mcq('What is market research?', [
      { label: 'A', value: 'Researching how to start a stock market', isCorrect: false },
      { label: 'B', value: 'The systematic collection and analysis of data about consumers and market conditions', isCorrect: true },
      { label: 'C', value: 'Research conducted only by government agencies', isCorrect: false },
      { label: 'D', value: 'The study of agricultural markets exclusively', isCorrect: false },
    ], 'Market research involves gathering, recording, and analysing data about customers, competitors, and market trends to help businesses make informed decisions about products, pricing, and strategies.', MEDIUM, 'Marketing'),
    mcq('How does a business determine the right pricing strategy for a new product in a competitive Caribbean market?', [
      { label: 'A', value: 'Price is always set at the highest possible level regardless of competition', isCorrect: false },
      { label: 'B', value: 'A business must consider production costs, competitor pricing, consumer demand, and perceived value to select an appropriate strategy', isCorrect: true },
      { label: 'C', value: 'The lowest possible price is always the best strategy', isCorrect: false },
      { label: 'D', value: 'Pricing strategies are irrelevant to business success', isCorrect: false },
    ], 'Effective pricing requires balancing production costs against what consumers are willing to pay, while considering competitor prices and market positioning. Strategies include penetration pricing, skimming, competitive pricing, and value-based pricing.', HARD, 'Marketing'),

    // Finance & Accounting — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is the break-even point of a business?', [
      { label: 'A', value: 'The point where the business makes maximum profit', isCorrect: false },
      { label: 'B', value: 'The point where total revenue equals total costs', isCorrect: true },
      { label: 'C', value: 'The point where the business must close down permanently', isCorrect: false },
      { label: 'D', value: 'The point where all fixed costs are eliminated', isCorrect: false },
    ], 'At the break-even point, total revenue equals total costs (both fixed and variable), so the business makes neither a profit nor a loss. It is a critical measure for business planning.', EASY, 'Finance & Accounting'),
    mcq('Which of the following is an internal source of finance for a business?', [
      { label: 'A', value: 'Bank loan', isCorrect: false },
      { label: 'B', value: 'Retained profits', isCorrect: true },
      { label: 'C', value: 'Government grants', isCorrect: false },
      { label: 'D', value: 'Issuing new shares to the public', isCorrect: false },
    ], 'Retained profits are earnings kept in the business rather than distributed to shareholders as dividends. They are an internal source, generating no interest costs and requiring no external approval.', MEDIUM, 'Finance & Accounting'),
    mcq('Explain how the concept of working capital affects the daily operations of a Caribbean small business.', [
      { label: 'A', value: 'Working capital has no effect on daily operations', isCorrect: false },
      { label: 'B', value: 'Working capital (current assets minus current liabilities) determines a business\'s ability to pay short-term obligations and fund daily operations', isCorrect: true },
      { label: 'C', value: 'Working capital only matters for large corporations', isCorrect: false },
      { label: 'D', value: 'Negative working capital is always a sign of a healthy business', isCorrect: false },
    ], 'Adequate working capital ensures a Caribbean small business can pay suppliers, meet payroll, purchase inventory, and cover unexpected expenses. Insufficient working capital leads to cash flow problems and potential business failure, even if profitable long-term.', HARD, 'Finance & Accounting'),
  ],

  // ─── Principles of Accounts: 15 questions ──────────────────
  'CSEC-POA': [
    // The Accounting Equation — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is the basic accounting equation?', [
      { label: 'A', value: 'Sales - Expenses = Profit', isCorrect: false },
      { label: 'B', value: 'Assets = Liabilities + Owner\'s Equity', isCorrect: true },
      { label: 'C', value: 'Revenue = Cost + Tax', isCorrect: false },
      { label: 'D', value: 'Cash + Bank = Total Assets', isCorrect: false },
    ], 'The fundamental accounting equation is Assets = Liabilities + Owner\'s Equity. It shows that everything the business owns (assets) is financed either by borrowing (liabilities) or by the owner (equity).', EASY, 'The Accounting Equation'),
    mcq('If a business purchases a delivery van for $20,000 using a bank loan, how does this transaction affect the accounting equation?', [
      { label: 'A', value: 'Assets increase by $20,000 and liabilities increase by $20,000; the equation stays balanced', isCorrect: true },
      { label: 'B', value: 'Only assets increase; nothing else changes', isCorrect: false },
      { label: 'C', value: 'Only liabilities increase; assets stay the same', isCorrect: false },
      { label: 'D', value: 'The accounting equation becomes unbalanced', isCorrect: false },
    ], 'The van increases assets by $20,000 and the bank loan increases liabilities by $20,000. Both sides of the equation increase equally, so it remains balanced: Assets (+$20K) = Liabilities (+$20K) + Equity.', MEDIUM, 'The Accounting Equation'),
    mcq('A business owner withdraws $5,000 cash from the business for personal use. What is the effect on the accounting equation?', [
      { label: 'A', value: 'Assets decrease by $5,000 and owner\'s equity decreases by $5,000; the equation stays balanced', isCorrect: true },
      { label: 'B', value: 'Only assets decrease; equity stays the same', isCorrect: false },
      { label: 'C', value: 'Only equity decreases; assets stay the same', isCorrect: false },
      { label: 'D', value: 'Both assets and liabilities decrease by $5,000', isCorrect: false },
    ], 'A drawing (withdrawal) reduces cash (an asset) by $5,000 and reduces owner\'s equity by $5,000 (it is a reduction of the owner\'s claim on the business). The equation remains balanced because both sides decrease equally.', HARD, 'The Accounting Equation'),

    // Books of Original Entry — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is the purpose of the General Journal in accounting?', [
      { label: 'A', value: 'To store permanent records of all accounts', isCorrect: false },
      { label: 'B', value: 'To record all business transactions in chronological order before posting to ledgers', isCorrect: true },
      { label: 'C', value: 'To prepare the final financial statements', isCorrect: false },
      { label: 'D', value: 'To calculate the total profit of the business', isCorrect: false },
    ], 'The General Journal is a book of original entry where all transactions are first recorded in chronological order with debit and credit entries, before being posted to the respective ledger accounts.', EASY, 'Books of Original Entry'),
    mcq('What is the difference between the Sales Journal and the Purchases Journal?', [
      { label: 'A', value: 'There is no difference; they are the same document', isCorrect: false },
      { label: 'B', value: 'The Sales Journal records credit sales; the Purchases Journal records credit purchases', isCorrect: true },
      { label: 'C', value: 'The Sales Journal records cash sales; the Purchases Journal records cash purchases', isCorrect: false },
      { label: 'D', value: 'Both journals record all transactions, not just credit ones', isCorrect: false },
    ], 'The Sales Journal records all credit sales of goods (not cash sales). The Purchases Journal records all credit purchases of goods (not cash purchases). Cash transactions are recorded in the Cash Book.', MEDIUM, 'Books of Original Entry'),
    mcq('A business returns damaged goods worth $500 to a supplier. In which book of original entry is this transaction first recorded?', [
      { label: 'A', value: 'Sales Returns Journal', isCorrect: false },
      { label: 'B', value: 'Purchases Returns Journal (Returns Outwards Journal)', isCorrect: true },
      { label: 'C', value: 'General Journal', isCorrect: false },
      { label: 'D', value: 'Cash Book', isCorrect: false },
    ], 'When a business returns goods to a supplier, it is recorded in the Purchases Returns Journal (also called the Returns Outwards Journal). This is a separate subsidiary book that tracks all returns of goods bought on credit.', HARD, 'Books of Original Entry'),

    // Ledgers & Trial Balance — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is the purpose of a Trial Balance?', [
      { label: 'A', value: 'To prepare the final income statement', isCorrect: false },
      { label: 'B', value: 'To check that total debits equal total credits in the ledger accounts', isCorrect: true },
      { label: 'C', value: 'To record new business transactions', isCorrect: false },
      { label: 'D', value: 'To calculate the depreciation of assets', isCorrect: false },
    ], 'A Trial Balance lists all ledger account balances at a specific date to verify that total debits equal total credits, helping to detect arithmetic errors before preparing financial statements.', EASY, 'Ledgers & Trial Balance'),
    mcq('What does it mean if the Trial Balance does NOT balance?', [
      { label: 'A', value: 'The business is definitely operating at a loss', isCorrect: false },
      { label: 'B', value: 'There is likely an arithmetic or posting error that must be found and corrected', isCorrect: true },
      { label: 'C', value: 'The business has no transactions to record', isCorrect: false },
      { label: 'D', value: 'The Trial Balance is no longer needed', isCorrect: false },
    ], 'If total debits do not equal total credits, there is an error somewhere. Common causes include: transposition errors, omission of entries, posting to the wrong side of an account, or incorrect amounts.', MEDIUM, 'Ledgers & Trial Balance'),
    mcq('If the Trial Balance balances, does this guarantee that all ledger accounts are error-free? Explain.', [
      { label: 'A', value: 'Yes, a balanced Trial Balance means there are absolutely no errors', isCorrect: false },
      { label: 'B', value: 'No, a balanced Trial Balance only proves arithmetic accuracy but does not detect errors like omissions, compensating errors, or entries in the wrong account', isCorrect: true },
      { label: 'C', value: 'A Trial Balance is not useful for any purpose', isCorrect: false },
      { label: 'D', value: 'A Trial Balance only detects fraud, not errors', isCorrect: false },
    ], 'A balanced Trial Balance only confirms that total debits equal total credits. It does NOT detect: errors of omission (transaction not recorded), errors of commission (wrong account but correct amount), compensating errors, or complete reversal of entries.', HARD, 'Ledgers & Trial Balance'),

    // Financial Statements — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is the purpose of an Income Statement?', [
      { label: 'A', value: 'To show the assets, liabilities, and equity of a business', isCorrect: false },
      { label: 'B', value: 'To show the revenue and expenses of a business over a period and calculate profit or loss', isCorrect: true },
      { label: 'C', value: 'To list all the employees of the business', isCorrect: false },
      { label: 'D', value: 'To record the daily cash transactions', isCorrect: false },
    ], 'The Income Statement (Trading and Profit & Loss Account) shows all revenue earned and expenses incurred over a specific period, ultimately calculating the net profit or net loss of the business.', EASY, 'Financial Statements'),
    mcq('What is the difference between gross profit and net profit?', [
      { label: 'A', value: 'Gross profit is revenue minus cost of goods sold; net profit is gross profit minus all other expenses', isCorrect: true },
      { label: 'B', value: 'They are the same thing with different names', isCorrect: false },
      { label: 'C', value: 'Net profit is always larger than gross profit', isCorrect: false },
      { label: 'D', value: 'Gross profit includes tax; net profit does not', isCorrect: false },
    ], 'Gross Profit = Revenue - Cost of Goods Sold. It shows the profitability of core trading activities. Net Profit = Gross Profit - Operating Expenses (rent, wages, utilities). It shows the true profitability after all costs.', MEDIUM, 'Financial Statements'),
    mcq('How do you calculate the cost of goods sold for a trading business using the opening stock, purchases, and closing stock figures?', [
      { label: 'A', value: 'Cost of Goods Sold = Opening Stock + Purchases - Closing Stock', isCorrect: true },
      { label: 'B', value: 'Cost of Goods Sold = Opening Stock - Purchases + Closing Stock', isCorrect: false },
      { label: 'C', value: 'Cost of Goods Sold = Closing Stock + Purchases - Opening Stock', isCorrect: false },
      { label: 'D', value: 'Cost of Goods Sold = Opening Stock + Closing Stock + Purchases', isCorrect: false },
    ], 'COGS = Opening Stock + Purchases - Closing Stock. Opening stock is what was available at the start, purchases add to inventory during the period, and closing stock is what remains unsold at the end.', HARD, 'Financial Statements'),

    // Partnership Accounts — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is a partnership in business?', [
      { label: 'A', value: 'A business owned by a single individual', isCorrect: false },
      { label: 'B', value: 'A business owned and operated by two or more people who share profits and losses', isCorrect: true },
      { label: 'C', value: 'A large company with shares traded on the stock exchange', isCorrect: false },
      { label: 'D', value: 'A government-owned enterprise', isCorrect: false },
    ], 'A partnership is a form of business where two to twenty individuals agree to pool their resources, share responsibilities, and distribute profits and losses according to a partnership agreement.', EASY, 'Partnership Accounts'),
    mcq('What is the purpose of an appropriation account in a partnership?', [
      { label: 'A', value: 'To record the daily sales and purchases of the partnership', isCorrect: false },
      { label: 'B', value: 'To show how the net profit is distributed among partners after accounting for interest, salaries, and reserves', isCorrect: true },
      { label: 'C', value: 'To calculate the depreciation of partnership assets', isCorrect: false },
      { label: 'D', value: 'To record the personal expenses of each partner', isCorrect: false },
    ], 'The Appropriation Account shows the distribution of net profit: first deducting interest on partners\' capital, partners\' salaries, and reserves, then dividing the remaining profit according to the profit-sharing ratio.', MEDIUM, 'Partnership Accounts'),
    mcq('Partner A contributes $50,000 capital and Partner B contributes $30,000. The partnership agreement states interest on capital is 5% per year. How much interest does each partner earn?', [
      { label: 'A', value: 'Partner A earns $1,500 and Partner B earns $2,500', isCorrect: false },
      { label: 'B', value: 'Partner A earns $2,500 and Partner B earns $1,500', isCorrect: true },
      { label: 'C', value: 'Both partners earn the same interest of $2,000', isCorrect: false },
      { label: 'D', value: 'Interest cannot be calculated without knowing the total profit', isCorrect: false },
    ], 'Partner A: $50,000 × 5% = $2,500. Partner B: $30,000 × 5% = $1,500. Interest on capital is calculated on each partner\'s individual capital contribution at the agreed rate, regardless of the profit-sharing ratio.', HARD, 'Partnership Accounts'),
  ],

  // ─── Economics: 15 questions ───────────────────────────────
  'CSEC-ECON': [
    // Basic Economic Concepts — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is scarcity in economics?', [
      { label: 'A', value: 'When goods are available in unlimited quantities', isCorrect: false },
      { label: 'B', value: 'When human wants are unlimited but resources to satisfy them are limited', isCorrect: true },
      { label: 'C', value: 'When businesses produce too many goods', isCorrect: false },
      { label: 'D', value: 'When prices are too low', isCorrect: false },
    ], 'Scarcity is the fundamental economic problem: human wants are infinite, but the resources (land, labour, capital, entrepreneurship) available to satisfy those wants are limited, forcing choices.', EASY, 'Basic Economic Concepts'),
    mcq('What is opportunity cost?', [
      { label: 'A', value: 'The total cost of producing a good', isCorrect: false },
      { label: 'B', value: 'The value of the next best alternative forgone when making a choice', isCorrect: true },
      { label: 'C', value: 'The amount of money saved by not spending', isCorrect: false },
      { label: 'D', value: 'The price of a good in a foreign market', isCorrect: false },
    ], 'Opportunity cost is what you give up when you choose one option over another. If you spend $100 on a concert, the opportunity cost is the next best use of that $100, such as buying textbooks.', MEDIUM, 'Basic Economic Concepts'),
    mcq('How does the Production Possibility Frontier (PPF) illustrate the concept of opportunity cost?', [
      { label: 'A', value: 'The PPF shows that resources are unlimited and no trade-offs exist', isCorrect: false },
      { label: 'B', value: 'The PPF is not related to opportunity cost at all', isCorrect: false },
      { label: 'C', value: 'Moving along the PPF from one point to another shows that producing more of one good requires sacrificing some of another', isCorrect: true },
      { label: 'D', value: 'The PPF only shows the maximum price of goods', isCorrect: false },
    ], 'The PPF curve shows all possible combinations of two goods an economy can produce. Moving along the curve to produce more of Good A means moving away from maximum production of Good B, visually representing opportunity cost.', HARD, 'Basic Economic Concepts'),

    // Demand & Supply — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is the law of demand?', [
      { label: 'A', value: 'As price increases, quantity demanded decreases, and vice versa', isCorrect: true },
      { label: 'B', value: 'As price increases, quantity demanded also increases', isCorrect: false },
      { label: 'C', value: 'Price has no effect on the quantity demanded', isCorrect: false },
      { label: 'D', value: 'Demand is always the same regardless of price', isCorrect: false },
    ], 'The law of demand states an inverse relationship between price and quantity demanded: when the price of a good rises, consumers buy less; when the price falls, consumers buy more, ceteris paribus.', EASY, 'Demand & Supply'),
    mcq('What causes a shift in the demand curve (as opposed to a movement along it)?', [
      { label: 'A', value: 'A change in the price of the good itself', isCorrect: false },
      { label: 'B', value: 'Changes in non-price factors such as income, tastes, population, or price of related goods', isCorrect: true },
      { label: 'C', value: 'A change in the quantity supplied', isCorrect: false },
      { label: 'D', value: 'Only government intervention can shift demand', isCorrect: false },
    ], 'A shift in the demand curve is caused by changes in factors OTHER than the good\'s own price: consumer income, preferences, population size, prices of substitutes and complements, and expectations about future prices.', MEDIUM, 'Demand & Supply'),
    mcq('What is price elasticity of demand and how does it affect total revenue?', [
      { label: 'A', value: 'It measures how supply changes with price; it has no effect on revenue', isCorrect: false },
      { label: 'B', value: 'It measures the responsiveness of quantity demanded to price changes; elastic demand means price cuts increase total revenue', isCorrect: true },
      { label: 'C', value: 'It measures only the cost of production', isCorrect: false },
      { label: 'D', value: 'Price elasticity only applies to luxury goods', isCorrect: false },
    ], 'Price elasticity of demand measures how much quantity demanded responds to a price change. If demand is elastic (PED > 1), lowering price increases total revenue. If inelastic (PED < 1), raising price increases total revenue.', HARD, 'Demand & Supply'),

    // Market Structures — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('In which market structure are there many buyers and sellers, and no single firm can influence the market price?', [
      { label: 'A', value: 'Monopoly', isCorrect: false },
      { label: 'B', value: 'Oligopoly', isCorrect: false },
      { label: 'C', value: 'Perfect competition', isCorrect: true },
      { label: 'D', value: 'Monopolistic competition', isCorrect: false },
    ], 'In perfect competition, there are many buyers and sellers, identical (homogeneous) products, perfect information, and no barriers to entry or exit. No single firm can influence the market price.', EASY, 'Market Structures'),
    mcq('What is a monopoly?', [
      { label: 'A', value: 'A market with many small firms competing fiercely', isCorrect: false },
      { label: 'B', value: 'A market structure where a single firm controls the entire supply of a product with no close substitutes', isCorrect: true },
      { label: 'C', value: 'A market where two firms dominate', isCorrect: false },
      { label: 'D', value: 'A government price control system', isCorrect: false },
    ], 'A monopoly exists when one firm is the sole producer of a good or service with no close substitutes. The monopolist has significant control over price and faces no competition, often due to high barriers to entry.', MEDIUM, 'Market Structures'),
    mcq('Compare the characteristics of an oligopoly with those of monopolistic competition. Which statement is correct?', [
      { label: 'A', value: 'Both have a single seller with complete market control', isCorrect: false },
      { label: 'B', value: 'An oligopoly has a few large firms dominating the market with interdependent decisions; monopolistic competition has many firms with differentiated products', isCorrect: true },
      { label: 'C', value: 'Monopolistic competition has fewer firms than an oligopoly', isCorrect: false },
      { label: 'D', value: 'Neither market structure exists in real economies', isCorrect: false },
    ], 'An oligopoly (e.g., Caribbean telecom sector) has a few large firms whose decisions affect each other, often leading to strategic behaviour. Monopolistic competition has many firms offering differentiated products (e.g., restaurants), with easy entry and exit.', HARD, 'Market Structures'),

    // Production & Costs — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is the difference between fixed costs and variable costs?', [
      { label: 'A', value: 'Fixed costs change with output; variable costs stay the same', isCorrect: false },
      { label: 'B', value: 'Fixed costs remain constant regardless of output; variable costs change with the level of production', isCorrect: true },
      { label: 'C', value: 'There is no difference; all costs are the same', isCorrect: false },
      { label: 'D', value: 'Fixed costs only exist in service industries', isCorrect: false },
    ], 'Fixed costs (rent, insurance, salaries) do not change with the level of output. Variable costs (raw materials, hourly wages, utilities) increase or decrease directly with production volume.', EASY, 'Production & Costs'),
    mcq('What is the law of diminishing returns?', [
      { label: 'A', value: 'Adding more inputs always increases output proportionally', isCorrect: false },
      { label: 'B', value: 'As more of a variable input is added to a fixed input, the additional output from each extra unit of input will eventually decrease', isCorrect: true },
      { label: 'C', value: 'Returns always diminish from the very first unit of input', isCorrect: false },
      { label: 'D', value: 'Total output always decreases as more inputs are added', isCorrect: false },
    ], 'The law of diminishing returns states that when additional units of a variable factor (e.g., labour) are added to a fixed factor (e.g., land), the marginal product of the variable factor will eventually decline.', MEDIUM, 'Production & Costs'),
    mcq('How does economies of scale affect the long-run average cost of production for a firm?', [
      { label: 'A', value: 'Economies of scale increase the long-run average cost', isCorrect: false },
      { label: 'B', value: 'Economies of scale have no effect on average cost', isCorrect: false },
      { label: 'C', value: 'Economies of scale reduce the long-run average cost as the firm increases its scale of production', isCorrect: true },
      { label: 'D', value: 'Economies of scale only apply to small businesses', isCorrect: false },
    ], 'Economies of scale occur when increasing production lowers the per-unit cost because fixed costs are spread over more units, bulk purchasing reduces input costs, and specialized labour increases efficiency. This creates a cost advantage for larger firms.', HARD, 'Production & Costs'),

    // Caribbean Economy — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is the main economic challenge facing many Caribbean countries due to their size?', [
      { label: 'A', value: 'They have too many natural resources to manage', isCorrect: false },
      { label: 'B', value: 'Small market size and limited resource base constrain economic growth', isCorrect: true },
      { label: 'C', value: 'They have too large a population', isCorrect: false },
      { label: 'D', value: 'They have no access to international trade', isCorrect: false },
    ], 'Small island developing states (SIDS) in the Caribbean face constraints from limited land area, small domestic markets, narrow resource bases, vulnerability to natural disasters, and dependence on a few export commodities.', EASY, 'Caribbean Economy'),
    mcq('Why are many Caribbean economies described as "monocultural"?', [
      { label: 'A', value: 'Because they have a diverse range of industries', isCorrect: false },
      { label: 'B', value: 'Because they rely heavily on a single industry or product, such as tourism or sugar', isCorrect: true },
      { label: 'C', value: 'Because they have no cultural traditions', isCorrect: false },
      { label: 'D', value: 'Because they only export manufactured goods', isCorrect: false },
    ], 'Many Caribbean economies are monocultural because they depend heavily on one main industry — historically sugar or bananas, now increasingly tourism. This makes them vulnerable to price fluctuations, natural disasters, and changing global demand.', MEDIUM, 'Caribbean Economy'),
    mcq('Evaluate the impact of the Caribbean Single Market and Economy (CSME) on regional economic development.', [
      { label: 'A', value: 'The CSME has had no measurable effect on Caribbean economies', isCorrect: false },
      { label: 'B', value: 'The CSME aims to facilitate free movement of goods, services, capital, and labour, but faces implementation challenges', isCorrect: true },
      { label: 'C', value: 'The CSME has completely eliminated all trade barriers in the Caribbean', isCorrect: false },
      { label: 'D', value: 'The CSME only benefits Jamaica and Trinidad', isCorrect: false },
    ], 'The CSME seeks to create a single economic space for CARICOM members, allowing free movement of skilled labour, capital, goods, and services. While it promises greater efficiency and competitiveness, challenges include differing economic sizes, implementation delays, and protectionist policies.', HARD, 'Caribbean Economy'),
  ],

  // ─── Spanish: 15 questions ─────────────────────────────────
  'CSEC-SPAN': [
    // Grammar & Vocabulary — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is the Spanish word for "house"?', [
      { label: 'A', value: 'Hola', isCorrect: false },
      { label: 'B', value: 'Casa', isCorrect: true },
      { label: 'C', value: 'Coche', isCorrect: false },
      { label: 'D', value: 'Calle', isCorrect: false },
    ], '"Casa" means "house" in Spanish. "Hola" means "hello," "coche" means "car," and "calle" means "street."', EASY, 'Grammar & Vocabulary'),
    mcq('Which Spanish verb conjugation correctly matches "I speak" in the present tense?', [
      { label: 'A', value: 'Yo hablas', isCorrect: false },
      { label: 'B', value: 'Yo hablo', isCorrect: true },
      { label: 'C', value: 'Yo habla', isCorrect: false },
      { label: 'D', value: 'Yo habláis', isCorrect: false },
    ], 'The verb "hablar" (to speak) in the present tense: yo hablo, tú hablas, él/ella habla, nosotros hablamos, vosotros habláis, ellos hablan. "Yo hablo" means "I speak."', MEDIUM, 'Grammar & Vocabulary'),
    mcq('What is the difference between the preterite and imperfect tenses in Spanish?', [
      { label: 'A', value: 'They are interchangeable and mean the same thing', isCorrect: false },
      { label: 'B', value: 'The preterite describes completed actions; the imperfect describes ongoing or habitual past actions', isCorrect: true },
      { label: 'C', value: 'The preterite is only used in formal writing', isCorrect: false },
      { label: 'D', value: 'The imperfect tense does not exist in Spanish', isCorrect: false },
    ], 'The preterite (pretérito) is used for completed past actions with a clear beginning and end (e.g., "Comí" = I ate). The imperfect (imperfecto) describes ongoing, habitual, or background past actions (e.g., "Comía" = I was eating / I used to eat).', HARD, 'Grammar & Vocabulary'),

    // Reading Comprehension — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('If a Spanish passage says "El niño está contento porque hoy es su cumpleaños," what does it mean?', [
      { label: 'A', value: 'The boy is sad because today is his birthday', isCorrect: false },
      { label: 'B', value: 'The boy is happy because today is his birthday', isCorrect: true },
      { label: 'C', value: 'The boy is tired because he had a party', isCorrect: false },
      { label: 'D', value: 'The boy is hungry because it is his birthday', isCorrect: false },
    ], '"Contento" means happy/pleased, "porque" means because, "hoy" means today, and "cumpleaños" means birthday. The sentence means: "The boy is happy because today is his birthday."', EASY, 'Reading Comprehension'),
    mcq('In a Spanish reading passage, what does "No obstante" signal in the text?', [
      { label: 'A', value: 'It signals a conclusion or summary', isCorrect: false },
      { label: 'B', value: 'It signals a contrast or contradiction with what was said before', isCorrect: true },
      { label: 'C', value: 'It signals a cause-and-effect relationship', isCorrect: false },
      { label: 'D', value: 'It signals a question is about to be asked', isCorrect: false },
    ], '"No obstante" means "nevertheless" or "however." It is a linking word that introduces a contrast or exception to what was previously stated, similar to "sin embargo" or "a pesar de eso."', MEDIUM, 'Reading Comprehension'),
    mcq('When reading a Spanish literary text, how do you identify the narrator\'s perspective?', [
      { label: 'A', value: 'By counting the number of pages in the text', isCorrect: false },
      { label: 'B', value: 'By looking for pronouns used (yo = first person, él/ella = third person) and narrative voice indicators', isCorrect: true },
      { label: 'C', value: 'By identifying only the dialogue passages', isCorrect: false },
      { label: 'D', value: 'Narrator perspective is always third person in Spanish literature', isCorrect: false },
    ], 'Identifying the narrator\'s perspective requires analysing pronouns (yo/nosotros for first person, tú/vosotros for second person, él/ella/usted/ellos for third person), verb forms, and the level of knowledge the narrator demonstrates about events and characters.', HARD, 'Reading Comprehension'),

    // Oral Communication — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('How do you greet someone formally in Spanish?', [
      { label: 'A', value: '¿Qué tal?', isCorrect: false },
      { label: 'B', value: 'Buenos días, ¿cómo está usted?', isCorrect: true },
      { label: 'C', value: '¡Hola, tío!', isCorrect: false },
      { label: 'D', value: '¿Qué pasa?', isCorrect: false },
    ], '"Buenos días, ¿cómo está usted?" is a formal greeting (using "usted"). "¿Qué tal?" and "¿Qué pasa?" are informal. "¡Hola, tío!" is very informal/colloquial and would be inappropriate in formal settings.', EASY, 'Oral Communication'),
    mcq('What is the difference between asking "¿De dónde eres?" and "¿De dónde es usted?"?', [
      { label: 'A', value: 'There is no difference; both are identical', isCorrect: false },
      { label: 'B', value: 'The first uses the informal "tú" form; the second uses the formal "usted" form', isCorrect: true },
      { label: 'C', value: 'The first asks about age; the second asks about origin', isCorrect: false },
      { label: 'D', value: 'Only one of them is correct Spanish', isCorrect: false },
    ], 'Both mean "Where are you from?" but "¿De dónde eres?" uses the informal "tú" form (for friends, peers), while "¿De dónde es usted?" uses the formal "usted" form (for elders, authority figures, strangers).', MEDIUM, 'Oral Communication'),
    mcq('In a Spanish conversation, how do you express agreement or disagreement politely?', [
      { label: 'A', value: 'Always say "Sí" or "No" without any additional words', isCorrect: false },
      { label: 'B', value: 'Use phrases like "Estoy de acuerdo" (I agree) or "No estoy de acuerdo, pero..." (I disagree, but...) with appropriate politeness markers', isCorrect: true },
      { label: 'C', value: 'It is impolite to express disagreement in Spanish culture', isCorrect: false },
      { label: 'D', value: 'Only nod or shake your head; verbal response is not expected', isCorrect: false },
    ], 'Polite agreement: "Estoy de acuerdo" (I agree), "Tienes razón" (You are right). Polite disagreement: "No estoy de acuerdo" (I disagree), "Entiendo tu punto, pero..." (I understand your point, but...). Using "pero" softens disagreement.', HARD, 'Oral Communication'),

    // Writing Skills — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is the correct way to write a date in Spanish?', [
      { label: 'A', value: 'January 5, 2024', isCorrect: false },
      { label: 'B', value: '5 de enero de 2024', isCorrect: true },
      { label: 'C', value: '2024 January 5', isCorrect: false },
      { label: 'D', value: 'Enero 5, 2024', isCorrect: false },
    ], 'In Spanish, dates are written as: day + "de" + month + "de" + year. Example: "5 de enero de 2024" (5th of January 2024). Days and months are written in lowercase.', EASY, 'Writing Skills'),
    mcq('When writing a formal letter in Spanish, how should you open and close it?', [
      { label: 'A', value: 'Open with "¡Hola!" and close with "¡Adiós!"', isCorrect: false },
      { label: 'B', value: 'Open with "Estimado/a Sr./Sra." and close with "Atentamente" or "Le saluda atentamente"', isCorrect: true },
      { label: 'C', value: 'Open with "Querido" and close with "Besos"', isCorrect: false },
      { label: 'D', value: 'Spanish formal letters do not have opening or closing greetings', isCorrect: false },
    ], 'A formal Spanish letter begins with "Estimado/a" (Dear) followed by the title and surname. It closes with "Atentamente" (Yours sincerely) or "Le saluda atentamente" (Yours faithfully). Informal letters use "Querido/a" and "Un abrazo."', MEDIUM, 'Writing Skills'),
    mcq('What are the key elements that should be included in a well-structured Spanish essay (composición)?', [
      { label: 'A', value: 'Only a title and a list of vocabulary words', isCorrect: false },
      { label: 'B', value: 'An introduction, body paragraphs with main ideas and examples, and a conclusion, using appropriate connectors and register', isCorrect: true },
      { label: 'C', value: 'A single long paragraph with no structure', isCorrect: false },
      { label: 'D', value: 'Only the conclusion is necessary', isCorrect: false },
    ], 'A good Spanish composition needs: an introduction stating the topic and thesis, body paragraphs with clear topic sentences supported by examples, logical connectors (además, sin embargo, por lo tanto), and a conclusion summarizing key points.', HARD, 'Writing Skills'),

    // Hispanic Culture — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is "Día de los Muertos" (Day of the Dead)?', [
      { label: 'A', value: 'A sad holiday when people stay indoors', isCorrect: false },
      { label: 'B', value: 'A Mexican celebration honouring deceased loved ones with altars, food, and festivities', isCorrect: true },
      { label: 'C', value: 'A day when all shops and businesses are closed', isCorrect: false },
      { label: 'D', value: 'A religious ceremony only held in churches', isCorrect: false },
    ], 'Día de los Muertos (November 1-2) is a Mexican tradition where families create altars (ofrendas) with photos, favourite foods, marigolds, and candles to honour and remember deceased loved ones, celebrating their lives rather than mourning.', EASY, 'Hispanic Culture'),
    mcq('What is the significance of "La Tomatina" festival in Spain?', [
      { label: 'A', value: 'It is a religious pilgrimage to Santiago de Compostela', isCorrect: false },
      { label: 'B', value: 'It is a running of the bulls event in Pamplona', isCorrect: false },
      { label: 'C', value: 'It is a festival in Buñol where participants throw tomatoes at each other for fun', isCorrect: true },
      { label: 'D', value: 'It is a flamenco dancing competition', isCorrect: false },
    ], 'La Tomatina, held annually in Buñol, Spain, on the last Wednesday of August, is the world\'s largest tomato fight. Thousands of participants throw overripe tomatoes at each other for entertainment, attracting tourists worldwide.', MEDIUM, 'Hispanic Culture'),
    mcq('How has Spanish colonial influence shaped the culture and language of the Caribbean?', [
      { label: 'A', value: 'Spanish colonialism had no lasting impact on the Caribbean', isCorrect: false },
      { label: 'B', value: 'Spanish colonial influence introduced the Spanish language, Catholicism, architectural styles, and cultural traditions that persist in countries like Cuba, the Dominican Republic, and Puerto Rico', isCorrect: true },
      { label: 'C', value: 'All Caribbean countries speak Spanish as their only language', isCorrect: false },
      { label: 'D', value: 'Spanish influence was completely replaced by British culture', isCorrect: false },
    ], 'Spanish colonialism (1492-1898) left a lasting legacy in the Spanish-speaking Caribbean — Cuba, Dominican Republic, and Puerto Rico. The Spanish language, Roman Catholicism, Spanish colonial architecture, and cultural traditions like music and cuisine remain central to these societies.', HARD, 'Hispanic Culture'),
  ],

  // ─── French: 15 questions ──────────────────────────────────
  'CSEC-FREN': [
    // Grammar & Vocabulary — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is the French word for "bread"?', [
      { label: 'A', value: 'Fromage', isCorrect: false },
      { label: 'B', value: 'Pain', isCorrect: true },
      { label: 'C', value: 'Beurre', isCorrect: false },
      { label: 'D', value: 'Pomme', isCorrect: false },
    ], '"Pain" means bread in French. "Fromage" means cheese, "beurre" means butter, and "pomme" means apple. A common French breakfast is "du pain et du beurre" (bread and butter).', EASY, 'Grammar & Vocabulary'),
    mcq('Which is the correct conjugation of "être" (to be) for "je" (I) in the present tense?', [
      { label: 'A', value: 'Je suis', isCorrect: true },
      { label: 'B', value: 'Je es', isCorrect: false },
      { label: 'C', value: 'Je êtes', isCorrect: false },
      { label: 'D', value: 'Je sont', isCorrect: false },
    ], 'The present tense of "être": je suis (I am), tu es (you are), il/elle est (he/she is), nous sommes (we are), vous êtes (you are, formal/plural), ils/elles sont (they are).', MEDIUM, 'Grammar & Vocabulary'),
    mcq('What is the difference between the passé composé and the imparfait in French?', [
      { label: 'A', value: 'They are identical and interchangeable', isCorrect: false },
      { label: 'B', value: 'The passé composé describes completed past actions; the imparfait describes ongoing or habitual past states and actions', isCorrect: true },
      { label: 'C', value: 'The passé composé is only used in formal writing', isCorrect: false },
      { label: 'D', value: 'The imparfait is used for future events', isCorrect: false },
    ], 'The passé composé (j\'ai mangé) is for completed, specific past actions. The imparfait (je mangeais) is for descriptions, habitual actions, and background states in the past. Narration often uses both together.', HARD, 'Grammar & Vocabulary'),

    // Reading Comprehension — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('If a French text says "Il fait beau aujourd\'hui," what does it mean?', [
      { label: 'A', value: 'It is raining today', isCorrect: false },
      { label: 'B', value: 'The weather is nice today', isCorrect: true },
      { label: 'C', value: 'It is very cold today', isCorrect: false },
      { label: 'D', value: 'Today is a public holiday', isCorrect: false },
    ], '"Il fait beau" is a common French expression meaning "the weather is nice/fine." Other weather expressions: "Il fait froid" (it is cold), "Il pleut" (it is raining), "Il fait chaud" (it is hot).', EASY, 'Reading Comprehension'),
    mcq('In a French reading passage, what does the phrase "en revanche" indicate?', [
      { label: 'A', value: 'A conclusion or summary of the passage', isCorrect: false },
      { label: 'B', value: 'A contrast or opposition to a previously stated idea', isCorrect: true },
      { label: 'C', value: 'A cause-and-effect relationship', isCorrect: false },
      { label: 'D', value: 'An addition of more information', isCorrect: false },
    ], '"En revanche" means "on the other hand" or "however." It is a logical connector used to introduce a contrasting idea, similar to "par contre" or "cependant" in French.', MEDIUM, 'Reading Comprehension'),
    mcq('When reading a French literary text, what strategies help identify the main theme?', [
      { label: 'A', value: 'Count the number of characters in the text', isCorrect: false },
      { label: 'B', value: 'Analyse repeated motifs, symbols, character development, and the author\'s use of language and imagery', isCorrect: true },
      { label: 'C', value: 'Only read the first and last paragraphs', isCorrect: false },
      { label: 'D', value: 'Look for the longest word in the text', isCorrect: false },
    ], 'Identifying themes requires close reading: note recurring images and symbols, track how characters change, analyse the tone and mood, and consider the historical and social context in which the text was written.', HARD, 'Reading Comprehension'),

    // Oral Communication — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('How do you say "Good evening" in French?', [
      { label: 'A', value: 'Bonjour', isCorrect: false },
      { label: 'B', value: 'Bonsoir', isCorrect: true },
      { label: 'C', value: 'Salut', isCorrect: false },
      { label: 'D', value: 'Merci', isCorrect: false },
    ], '"Bonsoir" means "Good evening." "Bonjour" is used for "Good morning/Good afternoon" (during the day). "Salut" is an informal "Hi/Bye." "Merci" means "Thank you."', EASY, 'Oral Communication'),
    mcq('What is the difference between "tu" and "vous" when addressing someone in French?', [
      { label: 'A', value: 'Both mean exactly the same thing and are interchangeable', isCorrect: false },
      { label: 'B', value: '"Tu" is informal/familiar; "vous" is formal or used for plural address', isCorrect: true },
      { label: 'C', value: '"Vous" is only used in writing, never in speech', isCorrect: false },
      { label: 'D', value: '"Tu" is only used by children', isCorrect: false },
    ], '"Tu" is used with friends, family, peers, and children (informal singular). "Vous" is used with strangers, elders, authority figures (formal singular), or when addressing multiple people (plural).', MEDIUM, 'Oral Communication'),
    mcq('In a French oral presentation, how do you effectively structure your response to a given topic?', [
      { label: 'A', value: 'Speak continuously without any pauses or organization', isCorrect: false },
      { label: 'B', value: 'Introduce the topic, present arguments with examples, use connecting phrases, and conclude with a personal opinion', isCorrect: true },
      { label: 'C', value: 'Only answer with single words or short phrases', isCorrect: false },
      { label: 'D', value: 'Memorise a pre-written speech word for word', isCorrect: false },
    ], 'An effective French oral response includes: an introduction ("Je vais parler de..."), structured arguments with linking words ("Premièrement... De plus... Enfin..."), examples to support points, and a conclusion ("En conclusion, je pense que...").', HARD, 'Oral Communication'),

    // Writing Skills — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is the correct word order for a basic French sentence?', [
      { label: 'A', value: 'Verb + Subject + Object', isCorrect: false },
      { label: 'B', value: 'Subject + Verb + Object', isCorrect: true },
      { label: 'C', value: 'Object + Subject + Verb', isCorrect: false },
      { label: 'D', value: 'Verb + Object + Subject', isCorrect: false },
    ], 'The standard French sentence follows Subject + Verb + Object (SVO) order, just like English. Example: "Je mange une pomme" (I eat an apple). Questions often invert to Verb + Subject.', EASY, 'Writing Skills'),
    mcq('When writing a formal letter in French, how should you close it?', [
      { label: 'A', value: 'With "Amicalement" or "Bisous"', isCorrect: false },
      { label: 'B', value: 'With "Je vous prie d\'agréer, Monsieur/Madame, l\'expression de mes salutations distinguées"', isCorrect: true },
      { label: 'C', value: 'With "À bientôt"', isCorrect: false },
      { label: 'D', value: 'French formal letters do not need a closing', isCorrect: false },
    ], 'A formal French letter closes with: "Je vous prie d\'agréer, [title], l\'expression de mes salutations distinguées" (I beg you to accept the expression of my distinguished regards). Informal closings: "Amicalement" (Friendly), "Grosses bises" (Love).', MEDIUM, 'Writing Skills'),
    mcq('What common mistakes should you avoid when writing an essay in French for the CSEC exam?', [
      { label: 'A', value: 'Using any French vocabulary at all', isCorrect: false },
      { label: 'B', value: 'Forgetting gender agreements, incorrect verb conjugations, literal translation from English, and mixing up "c\'est" and "il est"', isCorrect: true },
      { label: 'C', value: 'Writing more than the minimum word count', isCorrect: false },
      { label: 'D', value: 'Including your personal opinion in the essay', isCorrect: false },
    ], 'Common French writing errors include: wrong gender agreements (le/la/les), incorrect verb tenses, Anglicisms (translating English phrases literally), and confusing "c\'est" (it is) with "il est" (he is/it is) usage rules.', HARD, 'Writing Skills'),

    // French Culture — 3 questions (1 EASY, 1 MEDIUM, 1 HARD)
    mcq('What is Bastille Day and when is it celebrated?', [
      { label: 'A', value: 'A religious holiday celebrated on December 25th', isCorrect: false },
      { label: 'B', value: 'France\'s national holiday on July 14th, commemorating the storming of the Bastille in 1789', isCorrect: true },
      { label: 'C', value: 'A harvest festival celebrated in October', isCorrect: false },
      { label: 'D', value: 'A music festival held every June', isCorrect: false },
    ], 'Bastille Day (La Fête nationale) on July 14th commemorates the storming of the Bastille prison in 1789, a key event of the French Revolution. It is celebrated with military parades, fireworks, and festivities across France.', EASY, 'French Culture'),
    mcq('What is the significance of French cuisine in world culture?', [
      { label: 'A', value: 'French food is only eaten in France', isCorrect: false },
      { label: 'B', value: 'French cuisine is recognized by UNESCO as an intangible cultural heritage and has influenced global culinary traditions', isCorrect: true },
      { label: 'C', value: 'French people only eat fast food', isCorrect: false },
      { label: 'D', value: 'French cuisine has no influence outside of Europe', isCorrect: false },
    ], 'French cuisine was added to UNESCO\'s Representative List of the Intangible Cultural Heritage of Humanity in 2010. French culinary principles (mother sauces, mirepoix, techniques) have profoundly influenced global cooking and gastronomy.', MEDIUM, 'French Culture'),
    mcq('How has French colonial history influenced the culture of francophone Caribbean territories such as Martinique, Guadeloupe, and Haiti?', [
      { label: 'A', value: 'French colonialism had no impact on Caribbean culture', isCorrect: false },
      { label: 'B', value: 'French colonialism imposed the French language, legal systems, religion, and cultural practices, which blended with African and Indigenous traditions to create unique Creole cultures', isCorrect: true },
      { label: 'C', value: 'These territories do not speak French', isCorrect: false },
      { label: 'D', value: 'French influence was completely replaced by Spanish culture', isCorrect: false },
    ], 'French colonial rule introduced the French language, Catholicism, the Napoleonic Code, and European cultural practices to Martinique, Guadeloupe, and Haiti. The blending of French, African, and Indigenous traditions created unique Creole languages, cuisines, music (zouk, kompa), and cultural identities that persist today.', HARD, 'French Culture'),
  ],
}

// ── Main Seed Function ──────────────────────────────────────

export async function main() {
  console.log('🌱 Seeding CSEC subjects (Part 1)...')

  const subjectDetails: { name: string; code: string; icon: string; topicCount: number; questionCount: number }[] = []

  for (const subj of SUBJECTS) {
    console.log(`\n── ${subj.icon} ${subj.name} (${subj.code}) ──`)

    // Upsert subject by code
    const subject = await db.subject.upsert({
      where: { code: subj.code },
      update: {
        name: subj.name,
        description: subj.description,
        color: subj.color,
        icon: subj.icon,
      },
      create: {
        name: subj.name,
        code: subj.code,
        description: subj.description,
        color: subj.color,
        icon: subj.icon,
      },
    })

    let createdTopicCount = 0

    // Create topics if they don't exist
    for (const topicName of subj.topics) {
      const existingTopic = await db.topic.findFirst({
        where: { subjectId: subject.id, name: topicName },
      })

      if (!existingTopic) {
        await db.topic.create({
          data: { subjectId: subject.id, name: topicName },
        })
        createdTopicCount++
      }
    }

    subjectDetails.push({ name: subj.name, code: subj.code, icon: subj.icon, topicCount: createdTopicCount, questionCount: 0 })

    // Create questions
    const questions = QUESTIONS[subj.code]
    if (!questions) {
      console.log(`  ⚠ No questions found for ${subj.code}`)
      continue
    }

    let qCount = 0
    for (const q of questions) {
      // Find or create the topic
      const topic = await db.topic.findFirst({
        where: { subjectId: subject.id, name: q.topicName },
      })

      if (!topic) {
        console.warn(`  ⚠ Topic "${q.topicName}" not found for ${subj.code}`)
        continue
      }

      await db.question.create({
        data: {
          subjectId: subject.id,
          topicId: topic.id,
          type: q.type,
          difficulty: q.difficulty,
          content: q.content,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          source: q.source,
        },
      })
      qCount++
    }

    subjectDetails[subjectDetails.length - 1].questionCount = qCount
    console.log(`  ✅ ${qCount} questions seeded across ${subj.topics.length} topics`)
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📊 Seed Summary:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  let totalQuestions = 0
  for (const s of subjectDetails) {
    console.log(`  ${s.icon} ${s.name} (${s.code}): ${s.topicCount} new topics, ${s.questionCount} questions`)
    totalQuestions += s.questionCount
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`  📦 Total: ${totalQuestions} questions across ${SUBJECTS.length} subjects`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}

main()
  .then(async () => {
    await db.$disconnect()
    process.exit(0)
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
