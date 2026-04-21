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

// ── 6 CAPE Subjects (Batch 2) ─────────────────────────────────

const SUBJECTS = [
  { name: 'CAPE Chemistry', code: 'CAPE-CHEM', description: 'CAPE Chemistry', color: '#d97706', icon: '⚗️', topics: ['Physical Chemistry', 'Inorganic Chemistry', 'Organic Chemistry', 'Analytical Chemistry', 'Environmental Chemistry'] },
  { name: 'CAPE Physics', code: 'CAPE-PHYS', description: 'CAPE Physics', color: '#2563eb', icon: '🔬', topics: ['Mechanics', 'Oscillations & Waves', 'Electricity & Magnetism', 'Thermal Physics', 'Modern Physics'] },
  { name: 'Accounting', code: 'CAPE-ACCT', description: 'CAPE Accounting', color: '#ca8a04', icon: '📑', topics: ['Financial Accounting', 'Cost & Management Accounting', 'Accounting Information Systems', 'Auditing & Controls', 'Corporate Reporting'] },
  { name: 'CAPE Information Technology', code: 'CAPE-IT', description: 'CAPE Information Technology', color: '#0891b2', icon: '🖥️', topics: ['Computer Architecture', 'Programming', 'Database Management', 'Networks & Telecommunications', 'Information Systems'] },
  { name: 'Computer Science', code: 'CAPE-COMPSCI', description: 'CAPE Computer Science', color: '#4f46e5', icon: '💻', topics: ['Algorithms & Data Structures', 'Programming Languages', 'Operating Systems', 'Software Engineering', 'Artificial Intelligence'] },
  { name: 'CAPE Economics', code: 'CAPE-ECON', description: 'CAPE Economics', color: '#0f766e', icon: '📉', topics: ['Microeconomic Theory', 'Macroeconomic Theory', 'International Economics', 'Development Economics', 'Caribbean Economic Issues'] },
]

// ── Questions ─────────────────────────────────────────────────

const QUESTIONS: Record<string, ReturnType<typeof mcq>[]> = {

  // ═══════════════════════════════════════════════════════════
  //  CAPE CHEMISTRY (10 questions)
  // ═══════════════════════════════════════════════════════════
  'CAPE-CHEM': [
    // ── Physical Chemistry ──
    mcq('What is the enthalpy change when 1 mole of a substance is formed from its elements in their standard states?', [
      { label: 'A', value: 'Standard enthalpy of combustion', isCorrect: false },
      { label: 'B', value: 'Standard enthalpy of formation', isCorrect: true },
      { label: 'C', value: 'Standard enthalpy of neutralisation', isCorrect: false },
      { label: 'D', value: 'Bond enthalpy', isCorrect: false },
    ], 'The standard enthalpy of formation (ΔHf°) is the enthalpy change when 1 mole of a compound is formed from its constituent elements in their standard states under standard conditions.', EASY, 'Physical Chemistry'),

    mcq('According to Le Chatelier\'s principle, if the pressure is increased on the equilibrium N₂ + 3H₂ ⇌ 2NH₃, what happens?', [
      { label: 'A', value: 'The equilibrium shifts to the left', isCorrect: false },
      { label: 'B', value: 'The equilibrium shifts to the right (towards fewer gas moles)', isCorrect: true },
      { label: 'C', value: 'The equilibrium is unaffected', isCorrect: false },
      { label: 'D', value: 'The reaction stops completely', isCorrect: false },
    ], 'Increasing pressure favours the side with fewer moles of gas. Since 4 moles of reactant gas produce 2 moles of product gas, the equilibrium shifts to the right, producing more NH₃.', MEDIUM, 'Physical Chemistry'),

    // ── Inorganic Chemistry ──
    mcq('What is the oxidation state of chromium in the dichromate ion, Cr₂O₇²⁻?', [
      { label: 'A', value: '+6', isCorrect: true },
      { label: 'B', value: '+3', isCorrect: false },
      { label: 'C', value: '+7', isCorrect: false },
      { label: 'D', value: '+2', isCorrect: false },
    ], 'Let x be the oxidation state of Cr: 2x + 7(-2) = -2. Therefore 2x - 14 = -2, so 2x = +12, giving x = +6.', MEDIUM, 'Inorganic Chemistry'),

    mcq('Which transition metal ion is responsible for the red colour of haemoglobin?', [
      { label: 'A', value: 'Cu²⁺', isCorrect: false },
      { label: 'B', value: 'Fe²⁺', isCorrect: true },
      { label: 'C', value: 'Co²⁺', isCorrect: false },
      { label: 'D', value: 'Zn²⁺', isCorrect: false },
    ], 'The iron(II) ion (Fe²⁺) at the centre of the haem group in haemoglobin binds reversibly to oxygen, giving blood its characteristic red colour when oxygenated.', EASY, 'Inorganic Chemistry'),

    // ── Organic Chemistry ──
    mcq('What type of organic reaction involves the addition of hydrogen across a double bond?', [
      { label: 'A', value: 'Substitution', isCorrect: false },
      { label: 'B', value: 'Elimination', isCorrect: false },
      { label: 'C', value: 'Hydrogenation', isCorrect: true },
      { label: 'D', value: 'Condensation', isCorrect: false },
    ], 'Hydrogenation is an addition reaction where hydrogen (H₂) is added across a carbon-carbon double or triple bond, typically using a metal catalyst (e.g., Ni, Pd, Pt).', EASY, 'Organic Chemistry'),

    mcq('What is the product when ethanol is oxidised with acidified potassium dichromate(VI)?', [
      { label: 'A', value: 'Ethanoic acid', isCorrect: true },
      { label: 'B', value: 'Ethanal only', isCorrect: false },
      { label: 'C', value: 'Ethene', isCorrect: false },
      { label: 'D', value: 'Ethane', isCorrect: false },
    ], 'Under strong oxidation with acidified K₂Cr₂O₇ (excess), ethanol (primary alcohol) is oxidised first to ethanal (aldehyde) and then further to ethanoic acid (carboxylic acid).', MEDIUM, 'Organic Chemistry'),

    mcq('Which reagent is used to distinguish between an aldehyde and a ketone?', [
      { label: 'A', value: 'Tollens\' reagent', isCorrect: true },
      { label: 'B', value: 'Dilute HCl', isCorrect: false },
      { label: 'C', value: 'Bromine water', isCorrect: false },
      { label: 'D', value: 'Sodium hydroxide', isCorrect: false },
    ], 'Tollens\' reagent (ammoniacal silver nitrate) produces a silver mirror with aldehydes (which are reducing agents) but gives no reaction with ketones.', MEDIUM, 'Organic Chemistry'),

    // ── Analytical Chemistry ──
    mcq('In thin-layer chromatography (TLC), what does the Rf value represent?', [
      { label: 'A', value: 'The number of components in a mixture', isCorrect: false },
      { label: 'B', value: 'The ratio of the distance travelled by the solute to the distance travelled by the solvent front', isCorrect: true },
      { label: 'C', value: 'The thickness of the stationary phase', isCorrect: false },
      { label: 'D', value: 'The temperature at which the substance evaporates', isCorrect: false },
    ], 'Rf (Retention factor) = distance travelled by solute / distance travelled by solvent front. It is a characteristic property that helps identify compounds under specific conditions.', MEDIUM, 'Analytical Chemistry'),

    // ── Environmental Chemistry ──
    mcq('What is the primary greenhouse gas emitted from the combustion of fossil fuels?', [
      { label: 'A', value: 'Methane', isCorrect: false },
      { label: 'B', value: 'Carbon dioxide (CO₂)', isCorrect: true },
      { label: 'C', value: 'Nitrous oxide', isCorrect: false },
      { label: 'D', value: 'Ozone', isCorrect: false },
    ], 'Carbon dioxide is the main greenhouse gas produced from burning fossil fuels. It traps infrared radiation in the atmosphere, contributing to the enhanced greenhouse effect and global warming.', EASY, 'Environmental Chemistry'),

    mcq('The process by which nitrogen oxides and sulfur dioxide react with water in the atmosphere to form acidic rain is called:', [
      { label: 'A', value: 'Eutrophication', isCorrect: false },
      { label: 'B', value: 'Acid deposition', isCorrect: true },
      { label: 'C', value: 'Photochemical smog formation', isCorrect: false },
      { label: 'D', value: 'Bioaccumulation', isCorrect: false },
    ], 'Acid deposition occurs when NOₓ and SO₂ from industrial emissions react with atmospheric water, oxygen, and other chemicals to form dilute solutions of nitric and sulfuric acids that fall as acid rain.', HARD, 'Environmental Chemistry'),
  ],

  // ═══════════════════════════════════════════════════════════
  //  CAPE PHYSICS (10 questions)
  // ═══════════════════════════════════════════════════════════
  'CAPE-PHYS': [
    // ── Mechanics ──
    mcq('A projectile is launched at an angle of 30° to the horizontal with an initial velocity of 20 m/s. What is the maximum height reached?', [
      { label: 'A', value: '5.1 m', isCorrect: true },
      { label: 'B', value: '10.2 m', isCorrect: false },
      { label: 'C', value: '20.0 m', isCorrect: false },
      { label: 'D', value: '2.55 m', isCorrect: false },
    ], 'Maximum height = (v² sin²θ)/(2g) = (400 × 0.25)/(2 × 9.81) = 100/19.62 ≈ 5.1 m.', HARD, 'Mechanics'),

    mcq('Newton\'s second law of motion states that:', [
      { label: 'A', value: 'An object at rest stays at rest unless acted upon by a force', isCorrect: false },
      { label: 'B', value: 'Force equals mass times acceleration (F = ma)', isCorrect: true },
      { label: 'C', value: 'For every action there is an equal and opposite reaction', isCorrect: false },
      { label: 'D', value: 'Momentum is always conserved', isCorrect: false },
    ], 'Newton\'s second law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass: F = ma.', EASY, 'Mechanics'),

    mcq('A car of mass 1200 kg accelerates from rest to 25 m/s in 10 seconds. What is the average net force acting on it?', [
      { label: 'A', value: '3000 N', isCorrect: true },
      { label: 'B', value: '300 N', isCorrect: false },
      { label: 'C', value: '30 000 N', isCorrect: false },
      { label: 'D', value: '1200 N', isCorrect: false },
    ], 'Using F = ma: a = (v - u)/t = (25 - 0)/10 = 2.5 m/s². F = 1200 × 2.5 = 3000 N.', MEDIUM, 'Mechanics'),

    // ── Oscillations & Waves ──
    mcq('The period of a simple pendulum of length 1.0 m on Earth (g = 9.81 m/s²) is approximately:', [
      { label: 'A', value: '1.0 s', isCorrect: false },
      { label: 'B', value: '3.14 s', isCorrect: false },
      { label: 'C', value: '2.01 s', isCorrect: true },
      { label: 'D', value: '0.5 s', isCorrect: false },
    ], 'T = 2π√(L/g) = 2π√(1.0/9.81) = 2π(0.319) ≈ 2.01 s.', MEDIUM, 'Oscillations & Waves'),

    mcq('What is the relationship between the speed, frequency, and wavelength of a wave?', [
      { label: 'A', value: 'v = f/λ', isCorrect: false },
      { label: 'B', value: 'v = f × λ', isCorrect: true },
      { label: 'C', value: 'v = f + λ', isCorrect: false },
      { label: 'D', value: 'v = λ/f', isCorrect: false },
    ], 'The wave equation is v = fλ, where v is the wave speed, f is the frequency, and λ is the wavelength. This fundamental relationship applies to all types of waves.', EASY, 'Oscillations & Waves'),

    // ── Electricity & Magnetism ──
    mcq('Three resistors of 4 Ω, 6 Ω, and 12 Ω are connected in parallel. What is the equivalent resistance?', [
      { label: 'A', value: '2.0 Ω', isCorrect: true },
      { label: 'B', value: '22 Ω', isCorrect: false },
      { label: 'C', value: '0.5 Ω', isCorrect: false },
      { label: 'D', value: '11 Ω', isCorrect: false },
    ], 'For parallel resistors: 1/R = 1/4 + 1/6 + 1/12 = 3/12 + 2/12 + 1/12 = 6/12 = 1/2. Therefore R = 2.0 Ω.', MEDIUM, 'Electricity & Magnetism'),

    mcq('According to Faraday\'s law of electromagnetic induction, the induced EMF in a coil is proportional to:', [
      { label: 'A', value: 'The magnetic flux through the coil', isCorrect: false },
      { label: 'B', value: 'The rate of change of magnetic flux through the coil', isCorrect: true },
      { label: 'C', value: 'The resistance of the coil', isCorrect: false },
      { label: 'D', value: 'The area of the coil', isCorrect: false },
    ], 'Faraday\'s law states that the magnitude of the induced EMF is directly proportional to the rate of change of magnetic flux linkage: EMF = -N(dΦ/dt).', HARD, 'Electricity & Magnetism'),

    // ── Thermal Physics ──
    mcq('The specific heat capacity of water is 4200 J/(kg·K). How much energy is needed to raise the temperature of 2 kg of water by 15°C?', [
      { label: 'A', value: '126 000 J', isCorrect: true },
      { label: 'B', value: '63 000 J', isCorrect: false },
      { label: 'C', value: '280 J', isCorrect: false },
      { label: 'D', value: '6 300 J', isCorrect: false },
    ], 'Q = mcΔT = 2 × 4200 × 15 = 126 000 J = 126 kJ.', EASY, 'Thermal Physics'),

    mcq('In an ideal gas, the internal energy is:', [
      { label: 'A', value: 'Proportional to the temperature only', isCorrect: true },
      { label: 'B', value: 'Proportional to both temperature and volume', isCorrect: false },
      { label: 'C', value: 'Independent of temperature', isCorrect: false },
      { label: 'D', value: 'Proportional to the pressure only', isCorrect: false },
    ], 'For an ideal gas, the internal energy depends only on the kinetic energy of the molecules, which is proportional to the absolute temperature (U = 3/2 nRT for a monatomic ideal gas).', HARD, 'Thermal Physics'),

    // ── Modern Physics ──
    mcq('What is the energy of a photon with a wavelength of 500 nm? (Planck\'s constant h = 6.63 × 10⁻³⁴ J·s, c = 3 × 10⁸ m/s)', [
      { label: 'A', value: '3.98 × 10⁻¹⁹ J', isCorrect: true },
      { label: 'B', value: '1.99 × 10⁻²⁵ J', isCorrect: false },
      { label: 'C', value: '6.63 × 10⁻²⁸ J', isCorrect: false },
      { label: 'D', value: '9.95 × 10⁻²⁰ J', isCorrect: false },
    ], 'E = hc/λ = (6.63 × 10⁻³⁴ × 3 × 10⁸)/(500 × 10⁻⁹) = 1.989 × 10⁻²⁵/5 × 10⁻⁷ = 3.98 × 10⁻¹⁹ J.', HARD, 'Modern Physics'),
  ],

  // ═══════════════════════════════════════════════════════════
  //  ACCOUNTING (10 questions)
  // ═══════════════════════════════════════════════════════════
  'CAPE-ACCT': [
    // ── Financial Accounting ──
    mcq('What is the accounting equation?', [
      { label: 'A', value: 'Assets = Liabilities + Equity', isCorrect: true },
      { label: 'B', value: 'Assets = Liabilities - Equity', isCorrect: false },
      { label: 'C', value: 'Revenue - Expenses = Profit', isCorrect: false },
      { label: 'D', value: 'Assets + Liabilities = Equity', isCorrect: false },
    ], 'The fundamental accounting equation states that a company\'s total assets must always equal the sum of its liabilities and owners\' equity. This forms the basis of double-entry bookkeeping.', EASY, 'Financial Accounting'),

    mcq('A company purchased equipment for $50,000 with a useful life of 5 years and no residual value. Using the straight-line method, what is the annual depreciation expense?', [
      { label: 'A', value: '$10,000', isCorrect: true },
      { label: 'B', value: '$25,000', isCorrect: false },
      { label: 'C', value: '$5,000', isCorrect: false },
      { label: 'D', value: '$12,500', isCorrect: false },
    ], 'Straight-line depreciation = (Cost - Residual Value) / Useful Life = ($50,000 - $0) / 5 = $10,000 per year.', EASY, 'Financial Accounting'),

    mcq('Under the accrual basis of accounting, revenue is recognised when:', [
      { label: 'A', value: 'Cash is received from the customer', isCorrect: false },
      { label: 'B', value: 'The earning process is substantially complete and the amount is measurable', isCorrect: true },
      { label: 'C', value: 'The invoice is sent to the customer', isCorrect: false },
      { label: 'D', value: 'The goods are manufactured', isCorrect: false },
    ], 'Under accrual accounting, revenue is recognised when it is earned (performance obligation satisfied) and the amount can be reliably measured, regardless of when cash changes hands.', MEDIUM, 'Financial Accounting'),

    // ── Cost & Management Accounting ──
    mcq('Which of the following is a period cost rather than a product cost?', [
      { label: 'A', value: 'Direct materials', isCorrect: false },
      { label: 'B', value: 'Factory rent', isCorrect: false },
      { label: 'C', value: 'Advertising expense', isCorrect: true },
      { label: 'D', value: 'Direct labour', isCorrect: false },
    ], 'Period costs (e.g., advertising, office salaries) are expensed in the period incurred. Product costs (direct materials, direct labour, manufacturing overhead) are attached to inventory until sold.', MEDIUM, 'Cost & Management Accounting'),

    mcq('A company produces 10,000 units with total fixed costs of $80,000 and variable costs of $5 per unit. If the selling price is $15 per unit, what is the break-even point in units?', [
      { label: 'A', value: '8,000 units', isCorrect: true },
      { label: 'B', value: '5,333 units', isCorrect: false },
      { label: 'C', value: '4,000 units', isCorrect: false },
      { label: 'D', value: '10,000 units', isCorrect: false },
    ], 'Break-even point = Fixed Costs / (Selling Price - Variable Cost per Unit) = $80,000 / ($15 - $5) = $80,000 / $10 = 8,000 units.', HARD, 'Cost & Management Accounting'),

    // ── Accounting Information Systems ──
    mcq('Which of the following is an advantage of a computerised accounting system over a manual one?', [
      { label: 'A', value: 'Lower initial setup cost', isCorrect: false },
      { label: 'B', value: 'Faster processing and automatic generation of reports', isCorrect: true },
      { label: 'C', value: 'No risk of data corruption', isCorrect: false },
      { label: 'D', value: 'Elimination of the need for audits', isCorrect: false },
    ], 'Computerised accounting systems offer faster processing speed, automatic calculations, and instant report generation. However, they still carry risks of data corruption and require audits.', EASY, 'Accounting Information Systems'),

    mcq('In a database-driven accounting system, what is the purpose of internal controls?', [
      { label: 'A', value: 'To maximise profits', isCorrect: false },
      { label: 'B', value: 'To safeguard assets, ensure reliability of financial records, and promote operational efficiency', isCorrect: true },
      { label: 'C', value: 'To eliminate the need for management oversight', isCorrect: false },
      { label: 'D', value: 'To reduce the number of employees needed', isCorrect: false },
    ], 'Internal controls in accounting systems are policies and procedures designed to protect assets, ensure the accuracy and integrity of financial data, detect fraud, and ensure compliance with regulations.', MEDIUM, 'Accounting Information Systems'),

    // ── Auditing & Controls ──
    mcq('What is the primary objective of an external audit?', [
      { label: 'A', value: 'To prepare the financial statements', isCorrect: false },
      { label: 'B', value: 'To express an opinion on whether the financial statements are presented fairly in accordance with applicable standards', isCorrect: true },
      { label: 'C', value: 'To detect all instances of fraud', isCorrect: false },
      { label: 'D', value: 'To manage the company\'s daily operations', isCorrect: false },
    ], 'The primary objective of an external audit is to provide reasonable assurance that the financial statements are free from material misstatement and are presented fairly according to the applicable financial reporting framework.', MEDIUM, 'Auditing & Controls'),

    // ── Corporate Reporting ──
    mcq('Under IFRS, which of the following statements about intangible assets is correct?', [
      { label: 'A', value: 'All intangible assets must be amortised over 20 years', isCorrect: false },
      { label: 'B', value: 'An intangible asset can only be recognised if its cost can be measured reliably and future economic benefits are probable', isCorrect: true },
      { label: 'C', value: 'Internally generated goodwill is recognised as an asset', isCorrect: false },
      { label: 'D', value: 'Research costs are capitalised as intangible assets', isCorrect: false },
    ], 'Under IFRS, an intangible asset must meet the definition and recognition criteria: it must be identifiable, the entity must have control over it, future economic benefits must be probable, and cost must be measurable reliably.', HARD, 'Corporate Reporting'),

    mcq('Which financial statement shows the changes in a company\'s equity during a period?', [
      { label: 'A', value: 'Statement of Comprehensive Income', isCorrect: false },
      { label: 'B', value: 'Statement of Changes in Equity', isCorrect: true },
      { label: 'C', value: 'Statement of Cash Flows', isCorrect: false },
      { label: 'D', value: 'Statement of Financial Position', isCorrect: false },
    ], 'The Statement of Changes in Equity shows all changes in equity during a period, including profit or loss, other comprehensive income, share issuances, dividends, and transfers between reserves.', EASY, 'Corporate Reporting'),
  ],

  // ═══════════════════════════════════════════════════════════
  //  INFORMATION TECHNOLOGY (10 questions)
  // ═══════════════════════════════════════════════════════════
  'CAPE-IT': [
    // ── Computer Architecture ──
    mcq('What is the primary function of the ALU (Arithmetic Logic Unit) in a CPU?', [
      { label: 'A', value: 'To store data temporarily', isCorrect: false },
      { label: 'B', value: 'To perform arithmetic and logical operations', isCorrect: true },
      { label: 'C', value: 'To manage input and output devices', isCorrect: false },
      { label: 'D', value: 'To fetch instructions from memory', isCorrect: false },
    ], 'The ALU is the component of the CPU that carries out all arithmetic calculations (addition, subtraction, etc.) and logical operations (AND, OR, NOT, comparisons).', EASY, 'Computer Architecture'),

    mcq('Which type of memory is volatile and loses its contents when power is turned off?', [
      { label: 'A', value: 'ROM', isCorrect: false },
      { label: 'B', value: 'RAM', isCorrect: true },
      { label: 'C', value: 'Flash memory', isCorrect: false },
      { label: 'D', value: 'Hard disk drive', isCorrect: false },
    ], 'RAM (Random Access Memory) is volatile memory — it requires continuous power to maintain stored data and loses all contents when power is removed. ROM and flash memory are non-volatile.', EASY, 'Computer Architecture'),

    // ── Programming ──
    mcq('Which of the following is a characteristic of a compiled programming language?', [
      { label: 'A', value: 'Source code is translated into machine code before execution', isCorrect: true },
      { label: 'B', value: 'Source code is interpreted line by line at runtime', isCorrect: false },
      { label: 'C', value: 'It cannot produce standalone executable files', isCorrect: false },
      { label: 'D', value: 'It always runs slower than interpreted languages', isCorrect: false },
    ], 'Compiled languages (e.g., C, C++) are translated into machine code by a compiler before execution, resulting in faster runtime performance compared to interpreted languages.', MEDIUM, 'Programming'),

    mcq('What is the purpose of a function (or subroutine) in programming?', [
      { label: 'A', value: 'To declare global variables', isCorrect: false },
      { label: 'B', value: 'To encapsulate a block of reusable code that performs a specific task', isCorrect: true },
      { label: 'C', value: 'To terminate the program', isCorrect: false },
      { label: 'D', value: 'To store data permanently', isCorrect: false },
    ], 'A function is a self-contained block of code that performs a specific task. It promotes code reusability, modularity, and easier debugging by allowing the same code to be called multiple times.', EASY, 'Programming'),

    // ── Database Management ──
    mcq('In a relational database, what does the primary key ensure?', [
      { label: 'A', value: 'Each record can have duplicate values', isCorrect: false },
      { label: 'B', value: 'Each record is uniquely identified within the table', isCorrect: true },
      { label: 'C', value: 'Foreign keys are automatically created', isCorrect: false },
      { label: 'D', value: 'Data can be stored without a schema', isCorrect: false },
    ], 'A primary key is a column (or combination of columns) that uniquely identifies each row in a table. It must contain unique values and cannot contain NULL values.', EASY, 'Database Management'),

    mcq('Which SQL command is used to remove all records from a table while keeping the table structure?', [
      { label: 'A', value: 'DELETE TABLE', isCorrect: false },
      { label: 'B', value: 'DROP TABLE', isCorrect: false },
      { label: 'C', value: 'TRUNCATE TABLE', isCorrect: true },
      { label: 'D', value: 'REMOVE TABLE', isCorrect: false },
    ], 'TRUNCATE TABLE removes all rows from a table without logging individual row deletions. Unlike DROP TABLE, it preserves the table structure and schema. It is faster than DELETE for removing all data.', MEDIUM, 'Database Management'),

    mcq('What is database normalisation primarily used to achieve?', [
      { label: 'A', value: 'Faster query execution', isCorrect: false },
      { label: 'B', value: 'Reduction of data redundancy and improvement of data integrity', isCorrect: true },
      { label: 'C', value: 'Increased storage requirements', isCorrect: false },
      { label: 'D', value: 'Elimination of all foreign keys', isCorrect: false },
    ], 'Normalisation is the process of organising database tables to minimise data redundancy and dependency. It involves dividing tables into smaller, well-structured tables and defining relationships between them.', MEDIUM, 'Database Management'),

    // ── Networks & Telecommunications ──
    mcq('In the OSI model, which layer is responsible for routing packets between different networks?', [
      { label: 'A', value: 'Data Link Layer (Layer 2)', isCorrect: false },
      { label: 'B', value: 'Transport Layer (Layer 4)', isCorrect: false },
      { label: 'C', value: 'Network Layer (Layer 3)', isCorrect: true },
      { label: 'D', value: 'Application Layer (Layer 7)', isCorrect: false },
    ], 'The Network Layer (Layer 3) is responsible for logical addressing (IP addresses) and routing — determining the best path for data packets to travel from source to destination across multiple networks.', MEDIUM, 'Networks & Telecommunications'),

    mcq('What does the acronym TCP/IP stand for?', [
      { label: 'A', value: 'Transfer Control Protocol/Internet Protocol', isCorrect: false },
      { label: 'B', value: 'Transmission Control Protocol/Internet Protocol', isCorrect: true },
      { label: 'C', value: 'Technical Communication Protocol/Internal Processing', isCorrect: false },
      { label: 'D', value: 'Transport Communication Protocol/Integrated Platform', isCorrect: false },
    ], 'TCP/IP (Transmission Control Protocol/Internet Protocol) is the foundational suite of communication protocols used for interconnecting network devices on the internet and private networks.', EASY, 'Networks & Telecommunications'),

    // ── Information Systems ──
    mcq('What is the difference between a Decision Support System (DSS) and a Transaction Processing System (TPS)?', [
      { label: 'A', value: 'A DSS processes daily transactions; a TPS supports strategic decision-making', isCorrect: false },
      { label: 'B', value: 'A TPS records and processes routine transactions; a DSS analyses data to support semi-structured decision-making', isCorrect: true },
      { label: 'C', value: 'They are the same type of system', isCorrect: false },
      { label: 'D', value: 'A DSS only works with external data; a TPS only works with internal data', isCorrect: false },
    ], 'A TPS (Transaction Processing System) handles day-to-day operational transactions (e.g., sales, payroll). A DSS (Decision Support System) uses analytical models and data from multiple sources to help managers make semi-structured and unstructured decisions.', HARD, 'Information Systems'),
  ],

  // ═══════════════════════════════════════════════════════════
  //  COMPUTER SCIENCE (10 questions)
  // ═══════════════════════════════════════════════════════════
  'CAPE-COMPSCI': [
    // ── Algorithms & Data Structures ──
    mcq('What is the time complexity of binary search on a sorted array of n elements?', [
      { label: 'A', value: 'O(n)', isCorrect: false },
      { label: 'B', value: 'O(log n)', isCorrect: true },
      { label: 'C', value: 'O(n²)', isCorrect: false },
      { label: 'D', value: 'O(1)', isCorrect: false },
    ], 'Binary search halves the search space with each comparison, giving a time complexity of O(log₂n). For example, searching a sorted array of 1,048,576 elements takes at most 20 comparisons.', MEDIUM, 'Algorithms & Data Structures'),

    mcq('Which data structure operates on the principle of Last In, First Out (LIFO)?', [
      { label: 'A', value: 'Queue', isCorrect: false },
      { label: 'B', value: 'Stack', isCorrect: true },
      { label: 'C', value: 'Linked List', isCorrect: false },
      { label: 'D', value: 'Array', isCorrect: false },
    ], 'A stack follows the LIFO principle — the last element pushed onto the stack is the first one to be popped off. Operations include push (add to top) and pop (remove from top).', EASY, 'Algorithms & Data Structures'),

    mcq('What is the worst-case time complexity of Quick Sort?', [
      { label: 'A', value: 'O(n log n)', isCorrect: false },
      { label: 'B', value: 'O(n²)', isCorrect: true },
      { label: 'C', value: 'O(n)', isCorrect: false },
      { label: 'D', value: 'O(log n)', isCorrect: false },
    ], 'Quick Sort has a worst-case time complexity of O(n²) when the pivot selection consistently results in the most unbalanced partition (e.g., already sorted array with first element as pivot). Average case is O(n log n).', HARD, 'Algorithms & Data Structures'),

    // ── Programming Languages ──
    mcq('Which of the following is an example of an object-oriented programming (OOP) concept?', [
      { label: 'A', value: 'Encapsulation', isCorrect: true },
      { label: 'B', value: 'Unconditional branching', isCorrect: false },
      { label: 'C', value: 'Memory address manipulation', isCorrect: false },
      { label: 'D', value: 'Register allocation', isCorrect: false },
    ], 'Encapsulation is a fundamental OOP concept that bundles data (attributes) and methods (behaviours) into a single unit (class) and restricts direct access to some components, promoting data hiding and abstraction.', EASY, 'Programming Languages'),

    mcq('What is polymorphism in object-oriented programming?', [
      { label: 'A', value: 'The ability of different classes to respond to the same method call in different ways', isCorrect: true },
      { label: 'B', value: 'The process of converting data types', isCorrect: false },
      { label: 'C', value: 'A way to hide data within a class', isCorrect: false },
      { label: 'D', value: 'The use of global variables', isCorrect: false },
    ], 'Polymorphism (meaning "many forms") allows objects of different classes to be treated through a common interface. Method overriding (runtime) and method overloading (compile-time) are examples of polymorphism.', MEDIUM, 'Programming Languages'),

    // ── Operating Systems ──
    mcq('What is the primary purpose of an operating system\'s scheduler?', [
      { label: 'A', value: 'To manage the file system', isCorrect: false },
      { label: 'B', value: 'To allocate CPU time among processes and determine the order of execution', isCorrect: true },
      { label: 'C', value: 'To compile source code', isCorrect: false },
      { label: 'D', value: 'To manage network connections', isCorrect: false },
    ], 'The CPU scheduler is responsible for selecting which process from the ready queue should be allocated the CPU next. Common algorithms include First-Come First-Served, Round Robin, and Priority Scheduling.', MEDIUM, 'Operating Systems'),

    mcq('What is deadlock in an operating system?', [
      { label: 'A', value: 'A situation where a process terminates unexpectedly', isCorrect: false },
      { label: 'B', value: 'A situation where two or more processes are unable to proceed because each is waiting for the other to release a resource', isCorrect: true },
      { label: 'C', value: 'A virus that attacks the kernel', isCorrect: false },
      { label: 'D', value: 'A memory allocation error', isCorrect: false },
    ], 'Deadlock occurs when four conditions hold simultaneously: mutual exclusion, hold and wait, no preemption, and circular wait. It results in processes being permanently blocked from execution.', HARD, 'Operating Systems'),

    // ── Software Engineering ──
    mcq('What is the Software Development Life Cycle (SDLC)?', [
      { label: 'A', value: 'The physical lifespan of a computer', isCorrect: false },
      { label: 'B', value: 'A structured framework that describes the stages involved in developing software from conception to retirement', isCorrect: true },
      { label: 'C', value: 'A programming language', isCorrect: false },
      { label: 'D', value: 'A hardware component', isCorrect: false },
    ], 'The SDLC provides a systematic approach to software development through phases such as planning, analysis, design, implementation, testing, deployment, and maintenance.', EASY, 'Software Engineering'),

    mcq('In software testing, what is the difference between verification and validation?', [
      { label: 'A', value: 'Verification checks if the software is built correctly; validation checks if the right software is being built', isCorrect: true },
      { label: 'B', value: 'They are the same thing', isCorrect: false },
      { label: 'C', value: 'Verification is done by users; validation is done by developers', isCorrect: false },
      { label: 'D', value: 'Verification is only done after deployment', isCorrect: false },
    ], 'Verification ensures the software meets specified technical requirements (reviewing code, design documents). Validation ensures the software meets the actual needs of the user and business (acceptance testing).', HARD, 'Software Engineering'),

    // ── Artificial Intelligence ──
    mcq('Which AI technique involves creating rules and logical deductions to solve problems?', [
      { label: 'A', value: 'Machine Learning', isCorrect: false },
      { label: 'B', value: 'Expert Systems / Rule-Based Systems', isCorrect: true },
      { label: 'C', value: 'Neural Networks', isCorrect: false },
      { label: 'D', value: 'Genetic Algorithms', isCorrect: false },
    ], 'Expert systems use a knowledge base of rules (IF-THEN statements) and an inference engine to deduce conclusions. They were one of the earliest forms of AI and are used in diagnosis, decision support, and classification.', MEDIUM, 'Artificial Intelligence'),
  ],

  // ═══════════════════════════════════════════════════════════
  //  CAPE ECONOMICS (10 questions)
  // ═══════════════════════════════════════════════════════════
  'CAPE-ECON': [
    // ── Microeconomic Theory ──
    mcq('If the price elasticity of demand for a good is -2.5, a 10% increase in price will lead to:', [
      { label: 'A', value: 'A 25% decrease in quantity demanded', isCorrect: true },
      { label: 'B', value: 'A 4% decrease in quantity demanded', isCorrect: false },
      { label: 'C', value: 'A 10% decrease in quantity demanded', isCorrect: false },
      { label: 'D', value: 'A 2.5% increase in quantity demanded', isCorrect: false },
    ], 'Price elasticity of demand = % change in quantity demanded / % change in price. Therefore, % change in Qd = -2.5 × 10% = -25%. Quantity demanded falls by 25%.', MEDIUM, 'Microeconomic Theory'),

    mcq('What is the condition for profit maximisation for a firm in perfect competition?', [
      { label: 'A', value: 'Marginal Revenue = Average Cost', isCorrect: false },
      { label: 'B', value: 'Marginal Cost = Marginal Revenue', isCorrect: true },
      { label: 'C', value: 'Price = Average Variable Cost', isCorrect: false },
      { label: 'D', value: 'Total Revenue = Total Cost', isCorrect: false },
    ], 'A firm maximises profit by producing the quantity where Marginal Cost (MC) equals Marginal Revenue (MR). At this point, producing one more unit would cost more than the revenue it generates.', EASY, 'Microeconomic Theory'),

    mcq('Which of the following best describes a negative externality?', [
      { label: 'A', value: 'A benefit enjoyed by third parties not involved in a transaction', isCorrect: false },
      { label: 'B', value: 'A cost imposed on third parties not involved in a transaction', isCorrect: true },
      { label: 'C', value: 'A subsidy provided by the government', isCorrect: false },
      { label: 'D', value: 'A reduction in production costs for a firm', isCorrect: false },
    ], 'A negative externality (e.g., pollution from a factory) is a cost borne by society or third parties who are not part of the economic transaction. It results in overproduction relative to the socially optimal level.', MEDIUM, 'Microeconomic Theory'),

    // ── Macroeconomic Theory ──
    mcq('What is the formula for calculating GDP using the expenditure approach?', [
      { label: 'A', value: 'GDP = C + I + G + (X - M)', isCorrect: true },
      { label: 'B', value: 'GDP = C + S + T', isCorrect: false },
      { label: 'C', value: 'GDP = W + R + I + P', isCorrect: false },
      { label: 'D', value: 'GDP = C + G only', isCorrect: false },
    ], 'GDP (Expenditure approach) = Consumption (C) + Investment (I) + Government Spending (G) + Net Exports (X - M). This measures total spending on final goods and services within a country.', EASY, 'Macroeconomic Theory'),

    mcq('What is the Phillips Curve relationship?', [
      { label: 'A', value: 'An inverse relationship between unemployment and inflation', isCorrect: true },
      { label: 'B', value: 'A direct relationship between GDP and population growth', isCorrect: false },
      { label: 'C', value: 'A relationship between interest rates and exchange rates', isCorrect: false },
      { label: 'D', value: 'A direct relationship between savings and investment', isCorrect: false },
    ], 'The Phillips Curve suggests an inverse relationship between the rate of unemployment and the rate of inflation: lower unemployment is associated with higher inflation, and vice versa, at least in the short run.', HARD, 'Macroeconomic Theory'),

    mcq('Expansionary monetary policy by a central bank would typically involve:', [
      { label: 'A', value: 'Increasing interest rates and selling government bonds', isCorrect: false },
      { label: 'B', value: 'Decreasing interest rates and buying government bonds', isCorrect: true },
      { label: 'C', value: 'Increasing taxes', isCorrect: false },
      { label: 'D', value: 'Reducing government spending', isCorrect: false },
    ], 'Expansionary monetary policy aims to stimulate economic activity by lowering interest rates (making borrowing cheaper) and purchasing government bonds (increasing the money supply). This encourages investment and consumption.', MEDIUM, 'Macroeconomic Theory'),

    // ── International Economics ──
    mcq('What is comparative advantage?', [
      { label: 'A', value: 'When a country can produce a good using fewer resources than another country', isCorrect: false },
      { label: 'B', value: 'When a country can produce a good at a lower opportunity cost than another country', isCorrect: true },
      { label: 'C', value: 'When a country has more natural resources than another country', isCorrect: false },
      { label: 'D', value: 'When a country produces all goods more efficiently than another country', isCorrect: false },
    ], 'Comparative advantage refers to a country\'s ability to produce a good at a lower opportunity cost than another country. Even if one country is more efficient at producing everything, both can still benefit from trade based on comparative advantage.', MEDIUM, 'International Economics'),

    mcq('A depreciation of a country\'s currency will most likely lead to:', [
      { label: 'A', value: 'Cheaper imports and more expensive exports', isCorrect: false },
      { label: 'B', value: 'More expensive imports and cheaper exports', isCorrect: true },
      { label: 'C', value: 'No change in the balance of trade', isCorrect: false },
      { label: 'D', value: 'An increase in foreign exchange reserves', isCorrect: false },
    ], 'When a currency depreciates, exports become cheaper for foreign buyers (boosting export demand) and imports become more expensive for domestic consumers (reducing import demand). This may improve the trade balance.', HARD, 'International Economics'),

    // ── Development Economics ──
    mcq('The Human Development Index (HDI) is a composite measure that includes:', [
      { label: 'A', value: 'Life expectancy, education, and per capita income', isCorrect: true },
      { label: 'B', value: 'GDP only', isCorrect: false },
      { label: 'C', value: 'Military strength and natural resources', isCorrect: false },
      { label: 'D', value: 'Population size and area', isCorrect: false },
    ], 'The HDI combines three dimensions: a long and healthy life (life expectancy at birth), access to knowledge (mean years of schooling and expected years of schooling), and a decent standard of living (GNI per capita).', EASY, 'Development Economics'),

    // ── Caribbean Economic Issues ──
    mcq('Which of the following is a significant economic challenge for many Caribbean countries?', [
      { label: 'A', value: 'Over-industrialisation leading to large trade surpluses', isCorrect: false },
      { label: 'B', value: 'High dependence on imports, vulnerability to external shocks, and limited economic diversification', isCorrect: true },
      { label: 'C', value: 'Excessive savings and insufficient consumer spending', isCorrect: false },
      { label: 'D', value: 'A surplus of skilled labour driving down wages', isCorrect: false },
    ], 'Caribbean economies face challenges including reliance on a narrow range of exports (tourism, agriculture, bauxite), high import dependency for food and energy, vulnerability to natural disasters, and susceptibility to global economic fluctuations.', HARD, 'Caribbean Economic Issues'),
  ],
}

// ── Main seed function ───────────────────────────────────────

export async function main() {
  console.log('Seeding CAPE subjects (batch 2)...')

  for (const subject of SUBJECTS) {
    console.log(`  Processing ${subject.name} (${subject.code})...`)

    const createdSubject = await db.subject.upsert({
      where: { code: subject.code },
      update: {},
      create: {
        name: subject.name,
        code: subject.code,
        description: subject.description,
        color: subject.color,
        icon: subject.icon,
      },
    })

    // Create topics
    const topicMap = new Map<string, string>()
    for (let i = 0; i < subject.topics.length; i++) {
      const topicName = subject.topics[i]
      const topic = await db.topic.upsert({
        where: { name_subjectId: { name: topicName, subjectId: createdSubject.id } },
        update: {},
        create: {
          name: topicName,
          subjectId: createdSubject.id,
          order: i,
        },
      })
      topicMap.set(topicName, topic.id)
    }

    // Create questions (skip if already have enough)
    const questions = QUESTIONS[subject.code] || []
    const existingCount = await db.question.count({ where: { subjectId: createdSubject.id } })
    if (existingCount >= questions.length) {
      console.log(`    ⏭ Skipping ${subject.name} — ${existingCount} questions already exist`)
      continue
    }
    let count = 0
    for (const q of questions) {
      const topicId = topicMap.get(q.topicName)
      if (!topicId) {
        console.warn(`    ⚠ Topic "${q.topicName}" not found for subject ${subject.code}`)
        continue
      }
      // Check for duplicate content
      const exists = await db.question.findFirst({ where: { subjectId: createdSubject.id, content: q.content } })
      if (exists) continue
      const { topicName: _tn, ...questionData } = q
      await db.question.create({
        data: {
          ...questionData,
          subjectId: createdSubject.id,
          topicId,
          status: 'APPROVED',
        },
      })
      count++
    }
    console.log(`    ✅ Created ${count} questions across ${subject.topics.length} topics`)
  }

  console.log('✅ CAPE batch 2 seeding complete!')
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1) })
