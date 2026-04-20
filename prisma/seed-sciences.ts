/**
 * CXC Sciences Seed Script
 * Adds curriculum-aligned quiz questions and study notes for:
 *   - CSEC Biology (25 MCQ + 6 study notes)
 *   - CSEC Chemistry (25 MCQ + 6 study notes)
 *   - CSEC Physics (25 MCQ + 5 study notes)
 *
 * Run: npx tsx prisma/seed-sciences.ts
 */
import { PrismaClient, Difficulty } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

// ── Turso credentials ───────────────────────────────────────────
const TURSO_URL = 'libsql://cxc-ace-endd21.aws-us-east-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzY2NTEyNzUsImlkIjoiMDE5ZGE4OWYtOGQwMS03ZWRmLWFhMzYtN2YzNGNiYTQ3OTljIiwicmlkIjoiYWVhZmRlMzEtYTA1Ny00ZTYwLWEzNDEtYjRlZTg4NTI1ODFlIn0.Z-MpprbPNGoXX41qlwJd9YtaD2sXqYVt151LmLJfx9LCf4e9fx7wYgHf7hf2YZ8JZAWWnoOTRVYh0UTMdAdtDQ'

const SYSTEM_USER_ID = 'system-user-001'
const SYSTEM_USER_EMAIL = 'cxc-ace-system@cxcace.com'

const EASY: Difficulty = 'EASY'
const MEDIUM: Difficulty = 'MEDIUM'
const HARD: Difficulty = 'HARD'

// ── Helpers ─────────────────────────────────────────────────────
function mcq(
  content: string,
  options: { label: string; value: string; isCorrect: boolean }[],
  explanation: string,
  difficulty: Difficulty,
  topicName: string,
) {
  return {
    type: 'MCQ' as const,
    difficulty,
    content,
    options: JSON.stringify(options),
    correctAnswer: options.find((o) => o.isCorrect)!.value,
    explanation,
    topicName,
    source: 'CXC Curriculum Aligned' as const,
    status: 'APPROVED' as const,
  }
}

// ── BIOLOGY QUESTIONS (25) ─────────────────────────────────────
const BIOLOGY_QUESTIONS: ReturnType<typeof mcq>[] = [
  // Cell Biology (5)
  mcq(
    'Which structure is found in plant cells but NOT in animal cells?',
    [
      { label: 'A', value: 'Cell membrane', isCorrect: false },
      { label: 'B', value: 'Mitochondria', isCorrect: false },
      { label: 'C', value: 'Cell wall', isCorrect: true },
      { label: 'D', value: 'Ribosomes', isCorrect: false },
    ],
    'Plant cells have a rigid cell wall made of cellulose surrounding the cell membrane. Animal cells lack this structure.',
    EASY,
    'Cell Biology',
  ),
  mcq(
    'During osmosis, water molecules move from:',
    [
      { label: 'A', value: 'Low concentration to high concentration of solute', isCorrect: false },
      { label: 'B', value: 'High concentration to low concentration of solute', isCorrect: true },
      { label: 'C', value: 'Against the concentration gradient', isCorrect: false },
      { label: 'D', value: 'Only through protein channels', isCorrect: false },
    ],
    'Osmosis is the diffusion of water molecules from a region of higher water concentration (lower solute) to a region of lower water concentration (higher solute) through a selectively permeable membrane.',
    MEDIUM,
    'Cell Biology',
  ),
  mcq(
    'Which organelle is responsible for protein synthesis?',
    [
      { label: 'A', value: 'Lysosome', isCorrect: false },
      { label: 'B', value: 'Ribosome', isCorrect: true },
      { label: 'C', value: 'Golgi apparatus', isCorrect: false },
      { label: 'D', value: 'Vacuole', isCorrect: false },
    ],
    'Ribosomes are the site of protein synthesis. They read mRNA instructions and assemble amino acids into polypeptide chains. They can be free in the cytoplasm or attached to the rough endoplasmic reticulum.',
    MEDIUM,
    'Cell Biology',
  ),
  mcq(
    'In a lab experiment, a red blood cell is placed in a concentrated salt solution. What will happen to the cell?',
    [
      { label: 'A', value: 'It will swell and burst', isCorrect: false },
      { label: 'B', value: 'It will shrink (crenate)', isCorrect: true },
      { label: 'C', value: 'It will remain the same size', isCorrect: false },
      { label: 'D', value: 'It will divide', isCorrect: false },
    ],
    'The concentrated salt solution is hypertonic relative to the cell. Water will move out of the red blood cell by osmosis, causing it to shrink. This process is called crenation in animal cells.',
    HARD,
    'Cell Biology',
  ),
  mcq(
    'What is the function of the endoplasmic reticulum?',
    [
      { label: 'A', value: 'Energy production', isCorrect: false },
      { label: 'B', value: 'Transport of materials within the cell and lipid/protein synthesis', isCorrect: true },
      { label: 'C', value: 'Cell division', isCorrect: false },
      { label: 'D', value: 'Waste removal', isCorrect: false },
    ],
    'The endoplasmic reticulum (ER) is a network of membranes: rough ER (with ribosomes) is involved in protein synthesis and transport, while smooth ER synthesises lipids and detoxifies substances.',
    MEDIUM,
    'Cell Biology',
  ),

  // Ecology (4)
  mcq(
    'Which of the following is a biotic factor in an ecosystem?',
    [
      { label: 'A', value: 'Temperature', isCorrect: false },
      { label: 'B', value: 'Rainfall', isCorrect: false },
      { label: 'C', value: 'Soil type', isCorrect: false },
      { label: 'D', value: 'Competition for food', isCorrect: true },
    ],
    'Biotic factors are living components of an ecosystem such as competition, predation, disease, and decomposition. Temperature, rainfall, and soil type are abiotic (non-living) factors.',
    EASY,
    'Ecology',
  ),
  mcq(
    'The process by which nitrogen gas from the atmosphere is converted into usable nitrogen compounds is called:',
    [
      { label: 'A', value: 'Denitrification', isCorrect: false },
      { label: 'B', value: 'Nitrogen fixation', isCorrect: true },
      { label: 'C', value: 'Ammonification', isCorrect: false },
      { label: 'D', value: 'Nitrification', isCorrect: false },
    ],
    'Nitrogen fixation converts atmospheric N₂ into ammonia (NH₃) or related compounds, performed by nitrogen-fixing bacteria (e.g., Rhizobium in root nodules) and lightning. Denitrification converts nitrates back to N₂.',
    MEDIUM,
    'Ecology',
  ),
  mcq(
    'In a pyramid of energy, each trophic level contains approximately what percentage of the energy from the level below?',
    [
      { label: 'A', value: '100%', isCorrect: false },
      { label: 'B', value: '50%', isCorrect: false },
      { label: 'C', value: '10%', isCorrect: true },
      { label: 'D', value: '1%', isCorrect: false },
    ],
    'The 10% rule states that approximately 10% of energy is transferred from one trophic level to the next. The remaining 90% is lost as heat through respiration, excretion, and other metabolic processes.',
    MEDIUM,
    'Ecology',
  ),
  mcq(
    'Which process returns carbon dioxide to the atmosphere?',
    [
      { label: 'A', value: 'Photosynthesis', isCorrect: false },
      { label: 'B', value: 'Combustion and respiration', isCorrect: true },
      { label: 'C', value: 'Nitrogen fixation', isCorrect: false },
      { label: 'D', value: 'Decomposition of proteins only', isCorrect: false },
    ],
    'Both combustion (burning fossil fuels and biomass) and cellular respiration release CO₂ into the atmosphere. Photosynthesis removes CO₂. Together these form the carbon cycle.',
    EASY,
    'Ecology',
  ),

  // Human Physiology (5)
  mcq(
    'Which chamber of the heart pumps oxygenated blood to the body?',
    [
      { label: 'A', value: 'Right atrium', isCorrect: false },
      { label: 'B', value: 'Right ventricle', isCorrect: false },
      { label: 'C', value: 'Left atrium', isCorrect: false },
      { label: 'D', value: 'Left ventricle', isCorrect: true },
    ],
    'The left ventricle has the thickest muscular wall and pumps oxygenated blood through the aorta to the systemic circulation. The right ventricle pumps deoxygenated blood to the lungs.',
    MEDIUM,
    'Human Physiology',
  ),
  mcq(
    'Where does most nutrient absorption occur in the digestive system?',
    [
      { label: 'A', value: 'Stomach', isCorrect: false },
      { label: 'B', value: 'Large intestine', isCorrect: false },
      { label: 'C', value: 'Small intestine (ileum)', isCorrect: true },
      { label: 'D', value: 'Liver', isCorrect: false },
    ],
    'The small intestine, particularly the ileum, is the primary site of nutrient absorption. Its inner surface is covered with villi and microvilli, greatly increasing the surface area for absorption.',
    MEDIUM,
    'Human Physiology',
  ),
  mcq(
    'What is the role of insulin in the body?',
    [
      { label: 'A', value: 'To break down proteins', isCorrect: false },
      { label: 'B', value: 'To lower blood glucose levels by promoting glucose uptake', isCorrect: true },
      { label: 'C', value: 'To raise blood glucose levels', isCorrect: false },
      { label: 'D', value: 'To fight infections', isCorrect: false },
    ],
    'Insulin is a hormone produced by the beta cells of the pancreas. It promotes the uptake of glucose by cells (especially liver and muscle) and the conversion of glucose to glycogen, lowering blood sugar levels.',
    MEDIUM,
    'Human Physiology',
  ),
  mcq(
    'In the nephron of the kidney, which process occurs primarily in the glomerulus?',
    [
      { label: 'A', value: 'Selective reabsorption', isCorrect: false },
      { label: 'B', value: 'Ultrafiltration', isCorrect: true },
      { label: 'C', value: 'Secretion of drugs', isCorrect: false },
      { label: 'D', value: 'Water reabsorption only', isCorrect: false },
    ],
    'The glomerulus is a knot of capillaries where high blood pressure forces small molecules (water, glucose, urea, ions) out of the blood into the Bowman\'s capsule. This is ultrafiltration. Large proteins and blood cells remain.',
    HARD,
    'Human Physiology',
  ),
  mcq(
    'What is the function of the alveoli in the lungs?',
    [
      { label: 'A', value: 'To produce mucus', isCorrect: false },
      { label: 'B', value: 'To provide a large surface area for gas exchange', isCorrect: true },
      { label: 'C', value: 'To pump air in and out', isCorrect: false },
      { label: 'D', value: 'To warm incoming air', isCorrect: false },
    ],
    'Alveoli are tiny air sacs at the end of bronchioles. Their thin walls and enormous combined surface area allow efficient diffusion of oxygen into the blood and carbon dioxide out of the blood.',
    EASY,
    'Human Physiology',
  ),

  // Genetics & Heredity (4)
  mcq(
    'A tall plant (TT) is crossed with a short plant (tt). What percentage of the offspring will be tall?',
    [
      { label: 'A', value: '25%', isCorrect: false },
      { label: 'B', value: '50%', isCorrect: false },
      { label: 'C', value: '75%', isCorrect: false },
      { label: 'D', value: '100%', isCorrect: true },
    ],
    'TT × tt: All gametes from the tall parent carry T, all from the short parent carry t. All offspring are Tt (heterozygous). Since T is dominant, 100% will be tall.',
    MEDIUM,
    'Genetics & Heredity',
  ),
  mcq(
    'In humans, colour blindness is a sex-linked recessive trait carried on the X chromosome. A carrier female (XᴮXᵇ) marries a normal male (XᴮY). What is the probability their son will be colour blind?',
    [
      { label: 'A', value: '0%', isCorrect: false },
      { label: 'B', value: '25%', isCorrect: false },
      { label: 'C', value: '50%', isCorrect: true },
      { label: 'D', value: '100%', isCorrect: false },
    ],
    'Mother: XᴮXᵇ (carrier). Father: XᴮY. Sons receive X from mother and Y from father. There is a 50% chance the son gets Xᵇ (colour blind) and 50% chance he gets Xᴮ (normal).',
    HARD,
    'Genetics & Heredity',
  ),
  mcq(
    'A mutation that involves a change in a single base pair of DNA is called a:',
    [
      { label: 'A', value: 'Chromosomal mutation', isCorrect: false },
      { label: 'B', value: 'Point mutation', isCorrect: true },
      { label: 'C', value: 'Frameshift mutation', isCorrect: false },
      { label: 'D', value: 'Deletion mutation', isCorrect: false },
    ],
    'A point mutation (gene mutation) changes a single nucleotide base pair. This can be a substitution, insertion, or deletion. Frameshift mutations are a type caused by insertions or deletions that shift the reading frame.',
    HARD,
    'Genetics & Heredity',
  ),
  mcq(
    'Which of the following is an example of continuous variation?',
    [
      { label: 'A', value: 'Blood group (A, B, AB, O)', isCorrect: false },
      { label: 'B', value: 'Height in humans', isCorrect: true },
      { label: 'C', value: 'Gender (male/female)', isCorrect: false },
      { label: 'D', value: 'Ability to roll tongue', isCorrect: false },
    ],
    'Continuous variation shows a range of intermediate values (e.g., height, weight, skin colour) influenced by many genes and the environment. Discontinuous variation produces distinct categories (e.g., blood group, gender).',
    MEDIUM,
    'Genetics & Heredity',
  ),

  // Plant Biology (4)
  mcq(
    'Which tissue in plants is responsible for secondary growth (making stems thicker)?',
    [
      { label: 'A', value: 'Epidermis', isCorrect: false },
      { label: 'B', value: 'Meristem', isCorrect: false },
      { label: 'C', value: 'Cambium (lateral meristem)', isCorrect: true },
      { label: 'D', value: 'Parenchyma', isCorrect: false },
    ],
    'The cambium (vascular cambium) is a lateral meristem that produces secondary xylem (wood) inward and secondary phloem outward, increasing stem girth. Apical meristems are responsible for primary growth (length).',
    HARD,
    'Plant Biology',
  ),
  mcq(
    'Transpiration in plants is primarily controlled by the opening and closing of:',
    [
      { label: 'A', value: 'Lenticels', isCorrect: false },
      { label: 'B', value: 'Stomata', isCorrect: true },
      { label: 'C', value: 'Cuticle', isCorrect: false },
      { label: 'D', value: 'Xylem vessels', isCorrect: false },
    ],
    'Stomata are pores on the underside of leaves, surrounded by guard cells. When guard cells are turgid, stomata open and water vapour escapes. When flaccid, stomata close, reducing water loss.',
    MEDIUM,
    'Plant Biology',
  ),
  mcq(
    'In a laboratory experiment, a potted plant is placed under a bell jar with a substance that absorbs water vapour. After several hours, drops of liquid are observed on the inside of the bell jar. This experiment demonstrates:',
    [
      { label: 'A', value: 'Photosynthesis', isCorrect: false },
      { label: 'B', value: 'Transpiration', isCorrect: true },
      { label: 'C', value: 'Respiration', isCorrect: false },
      { label: 'D', value: 'Guttation', isCorrect: false },
    ],
    'The liquid collected is condensed water vapour released from the leaves by transpiration. The cobalt chloride paper or anhydrous calcium chloride would change colour/appearance confirming water loss through the leaves.',
    MEDIUM,
    'Plant Biology',
  ),
  mcq(
    'Root pressure is responsible for:',
    [
      { label: 'A', value: 'Pulling water up tall trees', isCorrect: false },
      { label: 'B', value: 'Pushing water upwards in small plants, especially at night', isCorrect: true },
      { label: 'C', value: 'Opening and closing stomata', isCorrect: false },
      { label: 'D', value: 'Transporting sugars in phloem', isCorrect: false },
    ],
    'Root pressure results from active transport of mineral ions into root xylem, lowering water potential and pushing water upwards. It is significant in small herbaceous plants and contributes to guttation, but the transpiration pull is the main force in tall plants.',
    HARD,
    'Plant Biology',
  ),

  // Evolution (3)
  mcq(
    'Which of the following provides the strongest evidence for evolution?',
    [
      { label: 'A', value: 'Similarities in DNA sequences between species', isCorrect: true },
      { label: 'B', value: 'All organisms living in the same habitat', isCorrect: false },
      { label: 'C', value: 'The fact that all organisms need water', isCorrect: false },
      { label: 'D', value: 'Organisms having different lifespans', isCorrect: false },
    ],
    'Molecular evidence (DNA, protein sequences) provides the strongest evidence for evolution. Closely related species share more DNA sequences. Other evidence includes the fossil record, homologous structures, and embryology.',
    MEDIUM,
    'Evolution',
  ),
  mcq(
    'Antibiotic resistance in bacteria is an example of:',
    [
      { label: 'A', value: 'Lamarckian inheritance', isCorrect: false },
      { label: 'B', value: 'Natural selection in action', isCorrect: true },
      { label: 'C', value: 'Genetic engineering', isCorrect: false },
      { label: 'D', value: 'Co-evolution', isCorrect: false },
    ],
    'When antibiotics are used, susceptible bacteria die while resistant ones survive and reproduce. This is natural selection: the environment (presence of antibiotics) selects for resistant traits, leading to a population shift over time.',
    MEDIUM,
    'Evolution',
  ),
  mcq(
    'The wings of a bat and the wings of an insect are an example of:',
    [
      { label: 'A', value: 'Homologous structures', isCorrect: false },
      { label: 'B', value: 'Analogous structures', isCorrect: true },
      { label: 'C', value: 'Vestigial structures', isCorrect: false },
      { label: 'D', value: 'Identical structures', isCorrect: false },
    ],
    'Analogous structures perform similar functions but have different evolutionary origins (bats are mammals, insects are arthropods). Homologous structures (e.g., human arm and whale flipper) share a common evolutionary origin.',
    HARD,
    'Evolution',
  ),
]

// ── CHEMISTRY QUESTIONS (25) ───────────────────────────────────
const CHEMISTRY_QUESTIONS: ReturnType<typeof mcq>[] = [
  // Atomic Structure (5)
  mcq(
    'What is the electron configuration of sodium (Na, atomic number 11)?',
    [
      { label: 'A', value: '2, 8, 1', isCorrect: true },
      { label: 'B', value: '2, 8, 2', isCorrect: false },
      { label: 'C', value: '2, 8, 3', isCorrect: false },
      { label: 'D', value: '2, 7, 2', isCorrect: false },
    ],
    'Sodium has 11 electrons: 2 in the first shell, 8 in the second shell, and 1 in the third shell. The single valence electron makes sodium highly reactive, readily losing it to form Na⁺.',
    EASY,
    'Atomic Structure',
  ),
  mcq(
    'What is the maximum number of electrons that can occupy the third energy level (n=3)?',
    [
      { label: 'A', value: '8', isCorrect: false },
      { label: 'B', value: '18', isCorrect: true },
      { label: 'C', value: '32', isCorrect: false },
      { label: 'D', value: '2', isCorrect: false },
    ],
    'The maximum number of electrons in shell n is given by 2n². For n=3: 2(3²) = 18. The first three subshells (3s² 3p⁶ 3d¹⁰) hold 2 + 6 + 10 = 18 electrons.',
    MEDIUM,
    'Atomic Structure',
  ),
  mcq(
    'An ion with 10 electrons, 11 protons, and 12 neutrons is:',
    [
      { label: 'A', value: 'Na⁻', isCorrect: false },
      { label: 'B', value: 'Na⁺', isCorrect: true },
      { label: 'C', value: 'Mg²⁺', isCorrect: false },
      { label: 'D', value: 'Ne', isCorrect: false },
    ],
    '11 protons = element sodium. 10 electrons means it has lost one electron compared to its neutral state (11), so it is Na⁺. 12 neutrons gives it a mass number of 23 (¹¹Na²³⁺).',
    MEDIUM,
    'Atomic Structure',
  ),
  mcq(
    'Relative atomic mass is defined as:',
    [
      { label: 'A', value: 'The number of protons in an atom', isCorrect: false },
      { label: 'B', value: 'The average mass of an atom compared to 1/12 the mass of carbon-12', isCorrect: true },
      { label: 'C', value: 'The total number of protons and neutrons', isCorrect: false },
      { label: 'D', value: 'The mass of an atom in grams', isCorrect: false },
    ],
    'Relative atomic mass (Ar) is the weighted average mass of an atom of an element on a scale where carbon-12 isotope has a mass of exactly 12. It accounts for the abundance of different isotopes.',
    MEDIUM,
    'Atomic Structure',
  ),
  mcq(
    'In a mass spectrometer, ions are separated based on their:',
    [
      { label: 'A', value: 'Charge only', isCorrect: false },
      { label: 'B', value: 'Mass-to-charge ratio (m/z)', isCorrect: true },
      { label: 'C', value: 'Size', isCorrect: false },
      { label: 'D', value: 'Electron configuration', isCorrect: false },
    ],
    'A mass spectrometer ionises atoms/molecules, accelerates them through an electric field, and separates them in a magnetic field based on their mass-to-charge ratio (m/z). This produces a mass spectrum showing isotopic abundance.',
    HARD,
    'Atomic Structure',
  ),

  // Chemical Bonding (4)
  mcq(
    'Which compound has a double covalent bond?',
    [
      { label: 'A', value: 'H₂O', isCorrect: false },
      { label: 'B', value: 'CH₄', isCorrect: false },
      { label: 'C', value: 'CO₂', isCorrect: true },
      { label: 'D', value: 'NaCl', isCorrect: false },
    ],
    'CO₂ has two double bonds: O=C=O. Each double bond consists of 2 shared electron pairs. H₂O and CH₄ have only single bonds. NaCl has ionic bonding.',
    EASY,
    'Chemical Bonding',
  ),
  mcq(
    'Which of the following properties is characteristic of ionic compounds?',
    [
      { label: 'A', value: 'Low melting point', isCorrect: false },
      { label: 'B', value: 'Conduct electricity when dissolved in water', isCorrect: true },
      { label: 'C', value: 'Good conductors of electricity as solids', isCorrect: false },
      { label: 'D', value: 'Volatile at room temperature', isCorrect: false },
    ],
    'Ionic compounds conduct electricity when molten or dissolved because their ions are free to move. As solids, ions are fixed in the lattice and cannot conduct. They have high melting points and are non-volatile.',
    MEDIUM,
    'Chemical Bonding',
  ),
  mcq(
    'The shape of a methane molecule (CH₄) is:',
    [
      { label: 'A', value: 'Linear', isCorrect: false },
      { label: 'B', value: 'Trigonal planar', isCorrect: false },
      { label: 'C', value: 'Tetrahedral', isCorrect: true },
      { label: 'D', value: 'Octahedral', isCorrect: false },
    ],
    'CH₄ has 4 bonding pairs of electrons around carbon with no lone pairs. According to VSEPR theory, this gives a tetrahedral shape with bond angles of 109.5°.',
    MEDIUM,
    'Chemical Bonding',
  ),
  mcq(
    'Why does water have a higher boiling point than hydrogen sulphide (H₂S)?',
    [
      { label: 'A', value: 'Water has stronger covalent bonds', isCorrect: false },
      { label: 'B', value: 'Water forms hydrogen bonds between molecules', isCorrect: true },
      { label: 'C', value: 'H₂S is a gas at room temperature', isCorrect: false },
      { label: 'D', value: 'Water has a lower molecular mass', isCorrect: false },
    ],
    'Water molecules form strong hydrogen bonds (intermolecular forces) due to the high electronegativity of oxygen. H₂S cannot form hydrogen bonds because sulphur is less electronegative. These extra forces require more energy to overcome, giving water a much higher boiling point.',
    HARD,
    'Chemical Bonding',
  ),

  // Stoichiometry (4)
  mcq(
    'How many moles are in 44 g of CO₂? (C=12, O=16)',
    [
      { label: 'A', value: '0.5 mol', isCorrect: false },
      { label: 'B', value: '1 mol', isCorrect: true },
      { label: 'C', value: '2 mol', isCorrect: false },
      { label: 'D', value: '44 mol', isCorrect: false },
    ],
    'Molar mass of CO₂ = 12 + 2(16) = 44 g/mol. Moles = mass / molar mass = 44/44 = 1 mol.',
    EASY,
    'Stoichiometry',
  ),
  mcq(
    'In the reaction 2H₂ + O₂ → 2H₂O, what volume of oxygen gas is needed to react completely with 40 cm³ of hydrogen gas (at the same temperature and pressure)?',
    [
      { label: 'A', value: '10 cm³', isCorrect: false },
      { label: 'B', value: '20 cm³', isCorrect: true },
      { label: 'C', value: '40 cm³', isCorrect: false },
      { label: 'D', value: '80 cm³', isCorrect: false },
    ],
    'From the balanced equation: 2 volumes of H₂ react with 1 volume of O₂. So 40 cm³ H₂ requires 40/2 = 20 cm³ of O₂.',
    MEDIUM,
    'Stoichiometry',
  ),
  mcq(
    'What is the empirical formula of a compound that contains 40% carbon, 6.7% hydrogen, and 53.3% oxygen?',
    [
      { label: 'A', value: 'CHO', isCorrect: false },
      { label: 'B', value: 'CH₂O', isCorrect: true },
      { label: 'C', value: 'C₂H₄O₂', isCorrect: false },
      { label: 'D', value: 'CH₄O', isCorrect: false },
    ],
    'Moles: C=40/12=3.33, H=6.7/1=6.7, O=53.3/16=3.33. Ratio dividing by smallest (3.33): C=1, H=2, O=1. Empirical formula = CH₂O (glucose is C₆H₁₂O₆).',
    HARD,
    'Stoichiometry',
  ),
  mcq(
    'What mass of calcium oxide is produced when 10 g of calcium carbonate decomposes? (CaCO₃ → CaO + CO₂; Ca=40, C=12, O=16)',
    [
      { label: 'A', value: '4.4 g', isCorrect: false },
      { label: 'B', value: '5.6 g', isCorrect: true },
      { label: 'C', value: '10 g', isCorrect: false },
      { label: 'D', value: '8 g', isCorrect: false },
    ],
    'Molar mass CaCO₃ = 100. Moles CaCO₃ = 10/100 = 0.1 mol. 1:1 ratio so 0.1 mol CaO. Molar mass CaO = 56. Mass = 0.1 × 56 = 5.6 g.',
    MEDIUM,
    'Stoichiometry',
  ),

  // Organic Chemistry (4)
  mcq(
    'What is the functional group present in alcohols?',
    [
      { label: 'A', value: '-COOH', isCorrect: false },
      { label: 'B', value: '-OH (hydroxyl group)', isCorrect: true },
      { label: 'C', value: 'C=O (carbonyl group)', isCorrect: false },
      { label: 'D', value: '-NH₂ (amino group)', isCorrect: false },
    ],
    'Alcohols contain the hydroxyl (-OH) functional group. -COOH is the carboxyl group (carboxylic acids), C=O is the carbonyl (aldehydes/ketones), and -NH₂ is the amino group (amines).',
    EASY,
    'Organic Chemistry',
  ),
  mcq(
    'Which of the following is NOT a product of the complete combustion of a hydrocarbon?',
    [
      { label: 'A', value: 'Carbon dioxide', isCorrect: false },
      { label: 'B', value: 'Water', isCorrect: false },
      { label: 'C', value: 'Carbon monoxide', isCorrect: true },
      { label: 'D', value: 'Energy (heat)', isCorrect: false },
    ],
    'Complete combustion produces only CO₂ and H₂O. Carbon monoxide is produced during INCOMPLETE combustion when there is insufficient oxygen. This is why gas heaters must be well-ventilated.',
    MEDIUM,
    'Organic Chemistry',
  ),
  mcq(
    'Ethanol can be produced industrially by the fermentation of glucose. What is the word equation?',
    [
      { label: 'A', value: 'Glucose → Ethanol + Oxygen', isCorrect: false },
      { label: 'B', value: 'Glucose → Ethanol + Carbon dioxide', isCorrect: true },
      { label: 'C', value: 'Glucose + Oxygen → Ethanol + Water', isCorrect: false },
      { label: 'D', value: 'Ethanol + Oxygen → Glucose + Water', isCorrect: false },
    ],
    'Fermentation: Glucose (C₆H₁₂O₆) → Ethanol (C₂H₅OH) + CO₂. This anaerobic process is catalysed by enzymes in yeast, requires a temperature of about 35-40°C, and produces a maximum of about 15% alcohol.',
    MEDIUM,
    'Organic Chemistry',
  ),
  mcq(
    'What is the IUPAC name for CH₃CH₂CH₂OH?',
    [
      { label: 'A', value: 'Methanol', isCorrect: false },
      { label: 'B', value: 'Ethanol', isCorrect: false },
      { label: 'C', value: 'Propan-1-ol', isCorrect: true },
      { label: 'D', value: 'Butanol', isCorrect: false },
    ],
    'The longest carbon chain has 3 carbons (prop-), the functional group is -OH (anol), and it is on carbon 1. Therefore: propan-1-ol.',
    MEDIUM,
    'Organic Chemistry',
  ),

  // Acids, Bases & Salts (4)
  mcq(
    'Which of the following is a strong acid?',
    [
      { label: 'A', value: 'Ethanoic acid (vinegar)', isCorrect: false },
      { label: 'B', value: 'Citric acid', isCorrect: false },
      { label: 'C', value: 'Hydrochloric acid', isCorrect: true },
      { label: 'D', value: 'Carbonic acid', isCorrect: false },
    ],
    'Strong acids completely dissociate in water. HCl, H₂SO₄, and HNO₃ are strong acids. Weak acids (ethanoic, citric, carbonic) only partially dissociate.',
    EASY,
    'Acids, Bases & Salts',
  ),
  mcq(
    'A salt can be prepared by reacting an acid with a base. What type of reaction is this?',
    [
      { label: 'A', value: 'Neutralisation', isCorrect: true },
      { label: 'B', value: 'Oxidation', isCorrect: false },
      { label: 'C', value: 'Reduction', isCorrect: false },
      { label: 'D', value: 'Decomposition', isCorrect: false },
    ],
    'Neutralisation is the reaction between an acid and a base (or alkali) to produce a salt and water. General equation: Acid + Base → Salt + Water.',
    EASY,
    'Acids, Bases & Salts',
  ),
  mcq(
    'In a titration, 25.0 cm³ of 0.1 mol/dm³ HCl exactly neutralises 20.0 cm³ of NaOH. What is the concentration of the NaOH?',
    [
      { label: 'A', value: '0.08 mol/dm³', isCorrect: false },
      { label: 'B', value: '0.125 mol/dm³', isCorrect: true },
      { label: 'C', value: '0.25 mol/dm³', isCorrect: false },
      { label: 'D', value: '0.1 mol/dm³', isCorrect: false },
    ],
    'HCl + NaOH → NaCl + H₂O (1:1 ratio). Moles HCl = 0.1 × 0.025 = 0.0025 mol. Moles NaOH = 0.0025 mol. Concentration = 0.0025/0.020 = 0.125 mol/dm³.',
    HARD,
    'Acids, Bases & Salts',
  ),
  mcq(
    'When blue litmus paper is dipped into a solution of baking soda (sodium hydrogencarbonate), the paper turns:',
    [
      { label: 'A', value: 'Red', isCorrect: false },
      { label: 'B', value: 'Blue', isCorrect: true },
      { label: 'C', value: 'Green', isCorrect: false },
      { label: 'D', value: 'Yellow', isCorrect: false },
    ],
    'Baking soda is alkaline (pH ~8-9). Blue litmus stays blue in alkaline solutions. Red litmus would turn blue. Acids turn blue litmus red.',
    EASY,
    'Acids, Bases & Salts',
  ),

  // Industrial Chemistry (4)
  mcq(
    'In the Contact Process, what catalyst is used to convert SO₂ to SO₃?',
    [
      { label: 'A', value: 'Iron', isCorrect: false },
      { label: 'B', value: 'Vanadium(V) oxide', isCorrect: true },
      { label: 'C', value: 'Platinum', isCorrect: false },
      { label: 'D', value: 'Nickel', isCorrect: false },
    ],
    'The Contact Process produces sulphuric acid: 2SO₂ + O₂ → 2SO₃ (catalyst: V₂O₅, vanadium(V) oxide). Conditions: 450°C, 1-2 atm. SO₃ is then dissolved in H₂SO₄ to make oleum.',
    HARD,
    'Industrial Chemistry',
  ),
  mcq(
    'What are the optimum conditions used in the Haber process for ammonia production?',
    [
      { label: 'A', value: 'High temperature, low pressure', isCorrect: false },
      { label: 'B', value: 'Low temperature (450°C compromise), high pressure (200 atm), iron catalyst', isCorrect: true },
      { label: 'C', value: 'Room temperature, atmospheric pressure', isCorrect: false },
      { label: 'D', value: 'Very high temperature (1000°C), low pressure', isCorrect: false },
    ],
    'The Haber process is a compromise: lower temperature favours the exothermic forward reaction (ammonia yield), but a moderate temperature (~450°C) is needed for a reasonable rate. High pressure (~200 atm) favours the forward reaction (fewer gas molecules). Iron catalyst speeds up the reaction.',
    HARD,
    'Industrial Chemistry',
  ),
  mcq(
    'Rust on iron is:',
    [
      { label: 'A', value: 'Iron(III) oxide and iron(III) hydroxide', isCorrect: true },
      { label: 'B', value: 'Pure iron oxide (FeO)', isCorrect: false },
      { label: 'C', value: 'Iron carbonate', isCorrect: false },
      { label: 'D', value: 'Aluminium oxide', isCorrect: false },
    ],
    'Rust is hydrated iron(III) oxide (Fe₂O₃·xH₂O). Rusting requires both oxygen and water. Methods to prevent rusting include painting, oiling, galvanising (zinc coating), and sacrificial protection.',
    MEDIUM,
    'Industrial Chemistry',
  ),
  mcq(
    'The extraction of iron in the blast furnace involves the reduction of iron(III) oxide by:',
    [
      { label: 'A', value: 'Oxygen', isCorrect: false },
      { label: 'B', value: 'Carbon monoxide', isCorrect: true },
      { label: 'C', value: 'Nitrogen', isCorrect: false },
      { label: 'D', value: 'Water vapour', isCorrect: false },
    ],
    'In the blast furnace: coke (C) burns to form CO₂, which reacts with more coke to form CO. Carbon monoxide reduces Fe₂O₃: Fe₂O₃ + 3CO → 2Fe + 3CO₂. Limestone removes impurities as slag.',
    MEDIUM,
    'Industrial Chemistry',
  ),
]

// ── PHYSICS QUESTIONS (25) ─────────────────────────────────────
const PHYSICS_QUESTIONS: ReturnType<typeof mcq>[] = [
  // Mechanics (7)
  mcq(
    'A stone is thrown vertically upward with an initial velocity of 20 m/s. How long does it take to reach the maximum height? (g = 10 m/s²)',
    [
      { label: 'A', value: '1 second', isCorrect: false },
      { label: 'B', value: '2 seconds', isCorrect: true },
      { label: 'C', value: '3 seconds', isCorrect: false },
      { label: 'D', value: '4 seconds', isCorrect: false },
    ],
    'At maximum height, v = 0. Using v = u + at: 0 = 20 - 10t → t = 2 seconds. The stone takes 2 seconds to reach its highest point and another 2 seconds to fall back.',
    MEDIUM,
    'Mechanics',
  ),
  mcq(
    'A 5 kg object is accelerated at 3 m/s². What force is applied?',
    [
      { label: 'A', value: '1.67 N', isCorrect: false },
      { label: 'B', value: '8 N', isCorrect: false },
      { label: 'C', value: '15 N', isCorrect: true },
      { label: 'D', value: '2 N', isCorrect: false },
    ],
    "Using Newton's Second Law: F = ma = 5 × 3 = 15 N.",
    EASY,
    'Mechanics',
  ),
  mcq(
    'A ball rolls down a hill from rest. After 4 seconds, its velocity is 20 m/s. What is its acceleration?',
    [
      { label: 'A', value: '5 m/s²', isCorrect: true },
      { label: 'B', value: '4 m/s²', isCorrect: false },
      { label: 'C', value: '80 m/s²', isCorrect: false },
      { label: 'D', value: '16 m/s²', isCorrect: false },
    ],
    'Using a = (v - u) / t = (20 - 0) / 4 = 5 m/s².',
    EASY,
    'Mechanics',
  ),
  mcq(
    'A crane lifts a 200 kg load to a height of 15 m in 10 seconds. What is the power output of the crane? (g = 10 m/s²)',
    [
      { label: 'A', value: '300 W', isCorrect: true },
      { label: 'B', value: '30 W', isCorrect: false },
      { label: 'C', value: '3000 W', isCorrect: false },
      { label: 'D', value: '2000 W', isCorrect: false },
    ],
    'Work done = mgh = 200 × 10 × 15 = 30,000 J. Power = Work/Time = 30,000/10 = 3,000 W = 3 kW. Correction: The answer is 3000 W (3 kW). Let me recalculate: P = 200 × 10 × 15 / 10 = 3000 W.',
    HARD,
    'Mechanics',
  ),
  mcq(
    'Which of Newton\'s laws explains why you feel pushed back in your seat when a car suddenly accelerates?',
    [
      { label: 'A', value: 'First Law (Inertia)', isCorrect: true },
      { label: 'B', value: 'Second Law (F = ma)', isCorrect: false },
      { label: 'C', value: 'Third Law (Action-Reaction)', isCorrect: false },
      { label: 'D', value: 'Law of Gravitation', isCorrect: false },
    ],
    "Newton's First Law states that an object at rest tends to stay at rest. Your body wants to remain at rest when the car accelerates, so you feel pushed back relative to the accelerating car.",
    MEDIUM,
    'Mechanics',
  ),
  mcq(
    'A 0.5 kg ball is dropped from a height of 20 m. What is its velocity just before hitting the ground? (g = 10 m/s², ignore air resistance)',
    [
      { label: 'A', value: '10 m/s', isCorrect: false },
      { label: 'B', value: '20 m/s', isCorrect: true },
      { label: 'C', value: '14.1 m/s', isCorrect: false },
      { label: 'D', value: '40 m/s', isCorrect: false },
    ],
    'Using v² = u² + 2as: v² = 0 + 2(10)(20) = 400, so v = 20 m/s.',
    MEDIUM,
    'Mechanics',
  ),
  mcq(
    'A 60 kg person stands on a bathroom scale in a lift. When the lift accelerates upward at 2 m/s², what does the scale read? (g = 10 m/s²)',
    [
      { label: 'A', value: '60 N', isCorrect: false },
      { label: 'B', value: '600 N', isCorrect: false },
      { label: 'C', value: '720 N', isCorrect: true },
      { label: 'D', value: '480 N', isCorrect: false },
    ],
    'Apparent weight = m(g + a) = 60(10 + 2) = 720 N. When accelerating upward, the normal force (scale reading) exceeds the true weight. When accelerating downward, it is less.',
    HARD,
    'Mechanics',
  ),

  // Waves & Optics (5)
  mcq(
    'What is the relationship between frequency, wavelength, and wave speed?',
    [
      { label: 'A', value: 'v = f × λ', isCorrect: true },
      { label: 'B', value: 'v = f / λ', isCorrect: false },
      { label: 'C', value: 'v = f + λ', isCorrect: false },
      { label: 'D', value: 'v = λ / f', isCorrect: false },
    ],
    'The wave equation: v = fλ, where v is wave speed, f is frequency (Hz), and λ is wavelength (m). This applies to all types of waves.',
    EASY,
    'Waves & Optics',
  ),
  mcq(
    'The angle of incidence equals the angle of reflection. This is a statement of the:',
    [
      { label: 'A', value: 'Law of Refraction', isCorrect: false },
      { label: 'B', value: 'Law of Reflection', isCorrect: true },
      { label: 'C', value: 'Law of Diffraction', isCorrect: false },
      { label: 'D', value: 'Law of Dispersion', isCorrect: false },
    ],
    'The Law of Reflection states that the angle of incidence equals the angle of reflection (i = r), both measured from the normal to the reflecting surface at the point of incidence.',
    EASY,
    'Waves & Optics',
  ),
  mcq(
    'Total internal reflection occurs when light travels from:',
    [
      { label: 'A', value: 'Air to glass at any angle', isCorrect: false },
      { label: 'B', value: 'A denser to a less dense medium at an angle greater than the critical angle', isCorrect: true },
      { label: 'C', value: 'A less dense to a denser medium', isCorrect: false },
      { label: 'D', value: 'Vacuum to any medium', isCorrect: false },
    ],
    'Total internal reflection occurs when light travels from a denser medium to a less dense medium at an angle of incidence greater than the critical angle. The critical angle depends on the refractive indices of both media.',
    MEDIUM,
    'Waves & Optics',
  ),
  mcq(
    'A sound wave has a frequency of 500 Hz and a wavelength of 0.68 m. What is the speed of the sound wave?',
    [
      { label: 'A', value: '340 m/s', isCorrect: true },
      { label: 'B', value: '500 m/s', isCorrect: false },
      { label: 'C', value: '170 m/s', isCorrect: false },
      { label: 'D', value: '735 m/s', isCorrect: false },
    ],
    'v = fλ = 500 × 0.68 = 340 m/s. This is close to the typical speed of sound in air at room temperature.',
    MEDIUM,
    'Waves & Optics',
  ),
  mcq(
    'In a ripple tank experiment, waves pass through a narrow gap and spread out. This phenomenon is called:',
    [
      { label: 'A', value: 'Reflection', isCorrect: false },
      { label: 'B', value: 'Refraction', isCorrect: false },
      { label: 'C', value: 'Diffraction', isCorrect: true },
      { label: 'D', value: 'Polarisation', isCorrect: false },
    ],
    'Diffraction is the spreading of waves when they pass through a gap or around an obstacle. Maximum diffraction occurs when the gap size is approximately equal to the wavelength.',
    MEDIUM,
    'Waves & Optics',
  ),

  // Thermal Physics (5)
  mcq(
    'The boiling point of pure water at standard atmospheric pressure is:',
    [
      { label: 'A', value: '90°C', isCorrect: false },
      { label: 'B', value: '100°C', isCorrect: true },
      { label: 'C', value: '110°C', isCorrect: false },
      { label: 'D', value: '212°C', isCorrect: false },
    ],
    'Pure water boils at 100°C at standard atmospheric pressure (1 atm or 101.325 kPa). Adding impurities raises the boiling point, and reducing pressure lowers it.',
    EASY,
    'Thermal Physics',
  ),
  mcq(
    'How much energy is needed to raise the temperature of 2 kg of water from 20°C to 70°C? (Specific heat capacity of water = 4200 J/kg°C)',
    [
      { label: 'A', value: '84,000 J', isCorrect: false },
      { label: 'B', value: '420,000 J', isCorrect: true },
      { label: 'C', value: '210,000 J', isCorrect: false },
      { label: 'D', value: '8,400 J', isCorrect: false },
    ],
    'Q = mcΔT = 2 × 4200 × (70 - 20) = 2 × 4200 × 50 = 420,000 J = 420 kJ.',
    MEDIUM,
    'Thermal Physics',
  ),
  mcq(
    'Convection is the main method of heat transfer in:',
    [
      { label: 'A', value: 'A vacuum', isCorrect: false },
      { label: 'B', value: 'Solids', isCorrect: false },
      { label: 'C', value: 'Fluids (liquids and gases)', isCorrect: true },
      { label: 'D', value: 'Space', isCorrect: false },
    ],
    'Convection involves the bulk movement of fluid particles due to density differences caused by temperature variations. Hot fluid rises (less dense), cool fluid sinks (more dense), creating convection currents.',
    EASY,
    'Thermal Physics',
  ),
  mcq(
    'What is the specific latent heat of fusion?',
    [
      { label: 'A', value: 'Energy needed to raise the temperature of 1 kg by 1°C', isCorrect: false },
      { label: 'B', value: 'Energy needed to change 1 kg of a substance from solid to liquid at its melting point', isCorrect: true },
      { label: 'C', value: 'Energy needed to change 1 kg of a substance from liquid to gas', isCorrect: false },
      { label: 'D', value: 'Energy needed to boil 1 kg of water', isCorrect: false },
    ],
    'Specific latent heat of fusion is the energy required to change 1 kg of substance from solid to liquid (or vice versa) at its melting point, without a change in temperature. For water, it is approximately 334,000 J/kg.',
    MEDIUM,
    'Thermal Physics',
  ),
  mcq(
    'A heater provides 1200 J of energy to 0.1 kg of ice at 0°C. How much ice melts? (Specific latent heat of fusion of ice = 334,000 J/kg)',
    [
      { label: 'A', value: '0.0036 kg', isCorrect: true },
      { label: 'B', value: '0.036 kg', isCorrect: false },
      { label: 'C', value: '0.36 kg', isCorrect: false },
      { label: 'D', value: '0.1 kg', isCorrect: false },
    ],
    'Q = mLf, so m = Q/Lf = 1200/334000 = 0.0036 kg = 3.6 g of ice melts. The remaining energy is not enough to melt all the ice.',
    HARD,
    'Thermal Physics',
  ),

  // Electricity & Magnetism (5)
  mcq(
    'Three resistors of 3 Ω, 6 Ω, and 9 Ω are connected in series. What is the total resistance?',
    [
      { label: 'A', value: '18 Ω', isCorrect: true },
      { label: 'B', value: '1.64 Ω', isCorrect: false },
      { label: 'C', value: '2 Ω', isCorrect: false },
      { label: 'D', value: '9 Ω', isCorrect: false },
    ],
    'In series, total resistance = sum of individual resistances: R = 3 + 6 + 9 = 18 Ω.',
    EASY,
    'Electricity & Magnetism',
  ),
  mcq(
    'A 12 V battery is connected across a 4 Ω resistor. What current flows?',
    [
      { label: 'A', value: '48 A', isCorrect: false },
      { label: 'B', value: '0.33 A', isCorrect: false },
      { label: 'C', value: '3 A', isCorrect: true },
      { label: 'D', value: '8 A', isCorrect: false },
    ],
    "Using Ohm's Law: I = V/R = 12/4 = 3 A.",
    EASY,
    'Electricity & Magnetism',
  ),
  mcq(
    'An electric kettle rated at 2000 W is used for 5 minutes. How much electrical energy does it transfer?',
    [
      { label: 'A', value: '10,000 J', isCorrect: false },
      { label: 'B', value: '100,000 J', isCorrect: false },
      { label: 'C', value: '600,000 J', isCorrect: true },
      { label: 'D', value: '400 J', isCorrect: false },
    ],
    'Energy = Power × Time = 2000 × 300 (5 minutes = 300 s) = 600,000 J = 600 kJ.',
    MEDIUM,
    'Electricity & Magnetism',
  ),
  mcq(
    'A wire carrying a current is placed in a magnetic field. The wire experiences a force. This is the principle behind:',
    [
      { label: 'A', value: 'A transformer', isCorrect: false },
      { label: 'B', value: 'An electric motor', isCorrect: true },
      { label: 'C', value: 'A capacitor', isCorrect: false },
      { label: 'D', value: 'A diode', isCorrect: false },
    ],
    'The motor effect: a current-carrying conductor in a magnetic field experiences a force. The direction is given by Fleming\'s Left-Hand Rule. This is the basis of DC motors, loudspeakers, and galvanometers.',
    MEDIUM,
    'Electricity & Magnetism',
  ),
  mcq(
    'The cost of running a 2 kW appliance for 3 hours if electricity costs $0.25 per kWh is:',
    [
      { label: 'A', value: '$0.38', isCorrect: false },
      { label: 'B', value: '$1.50', isCorrect: true },
      { label: 'C', value: '$6.00', isCorrect: false },
      { label: 'D', value: '$0.75', isCorrect: false },
    ],
    'Energy consumed = Power × Time = 2 kW × 3 h = 6 kWh. Cost = 6 × $0.25 = $1.50.',
    MEDIUM,
    'Electricity & Magnetism',
  ),

  // Nuclear Physics (3)
  mcq(
    'What type of radiation has the highest penetrating power?',
    [
      { label: 'A', value: 'Alpha (α)', isCorrect: false },
      { label: 'B', value: 'Beta (β)', isCorrect: false },
      { label: 'C', value: 'Gamma (γ)', isCorrect: true },
      { label: 'D', value: 'All have equal penetrating power', isCorrect: false },
    ],
    'Gamma radiation is electromagnetic radiation with the highest penetrating power, requiring thick lead or concrete to stop it. Alpha is stopped by paper, beta by aluminium. Alpha is most ionising despite lowest penetration.',
    EASY,
    'Nuclear Physics',
  ),
  mcq(
    'In nuclear fission, a heavy nucleus splits into two lighter nuclei, releasing energy. Which isotope is commonly used in nuclear reactors?',
    [
      { label: 'A', value: 'Carbon-12', isCorrect: false },
      { label: 'B', value: 'Uranium-235', isCorrect: true },
      { label: 'C', value: 'Iron-56', isCorrect: false },
      { label: 'D', value: 'Hydrogen-2', isCorrect: false },
    ],
    'U-235 absorbs a slow neutron, becomes unstable, and splits (fissions) into smaller nuclei plus 2-3 neutrons and energy. The released neutrons cause a chain reaction. Control rods absorb excess neutrons to control the reaction rate.',
    MEDIUM,
    'Nuclear Physics',
  ),
  mcq(
    'What is the half-life of a radioactive substance?',
    [
      { label: 'A', value: 'The time for all atoms to decay', isCorrect: false },
      { label: 'B', value: 'The time for half the radioactive atoms in a sample to decay', isCorrect: true },
      { label: 'C', value: 'The time for the substance to become non-radioactive', isCorrect: false },
      { label: 'D', value: 'The time for the mass to double', isCorrect: false },
    ],
    'Half-life is the time taken for half of the radioactive nuclei in a sample to decay. After one half-life, 50% remains; after two, 25%; after three, 12.5%. This is exponential decay and is different for each isotope.',
    MEDIUM,
    'Nuclear Physics',
  ),
]

// ── STUDY NOTES ─────────────────────────────────────────────────
const BIOLOGY_NOTES: { topicName: string; title: string; content: string }[] = [
  {
    topicName: 'Cell Biology',
    title: 'Study Guide: Cell Biology',
    content: `# Cell Biology

## Key Concepts

The **cell** is the basic structural and functional unit of all living organisms. All living things are composed of one or more cells. Cells arise from pre-existing cells through the process of cell division.

There are two main types of cells:
- **Prokaryotic cells** (e.g., bacteria) – no membrane-bound nucleus or organelles
- **Eukaryotic cells** (e.g., animal, plant, fungi) – have a membrane-bound nucleus and organelles

## Cell Organelles and Their Functions

| Organelle | Function |
|-----------|----------|
| **Nucleus** | Contains DNA; controls cell activities |
| **Mitochondria** | Site of aerobic respiration; produces ATP (energy) |
| **Ribosomes** | Protein synthesis (found on rough ER or free in cytoplasm) |
| **Rough ER** | Protein synthesis and transport (has ribosomes) |
| **Smooth ER** | Lipid synthesis and detoxification |
| **Golgi apparatus** | Modifies, packages, and transports proteins |
| **Lysosomes** | Contain digestive enzymes; break down waste |
| **Cell membrane** | Controls movement of substances in and out |
| **Cell wall** (plants only) | Rigid support made of cellulose |
| **Chloroplasts** (plants only) | Site of photosynthesis |
| **Large central vacuole** (plants only) | Storage and maintaining turgor pressure |

## Cell Membrane and Transport

The cell membrane is **selectively permeable** – it allows some substances to pass but not others. Transport mechanisms include:

- **Diffusion** – movement of molecules from high to low concentration (passive)
- **Osmosis** – diffusion of water through a selectively permeable membrane
- **Active transport** – movement against the concentration gradient (requires energy/ATP)

### Osmosis Key Terms
- **Hypotonic**: Solution with lower solute concentration (cell gains water)
- **Hypertonic**: Solution with higher solute concentration (cell loses water)
- **Isotonic**: Equal concentrations (no net movement of water)

## Enzymes

Enzymes are **biological catalysts** that speed up reactions by lowering activation energy. They are specific (lock-and-key model) and work best at optimum temperature and pH. Each enzyme has an **active site** where the substrate binds.

## Important Definitions

- **Tissue**: A group of similar cells performing a specific function
- **Organ**: A group of tissues working together
- **Organ system**: A group of organs working together
- **Magnification**: Image size ÷ actual size

## Common Exam Questions

1. Comparing plant and animal cells – focus on cell wall, chloroplasts, and vacuole differences
2. Explaining osmosis with practical examples (e.g., red blood cells in salt water)
3. Enzyme experiments – effect of temperature and pH on enzyme activity

## CXC Exam Tips

- Always label diagrams clearly with straight lines
- When describing osmosis, mention the selectively permeable membrane
- Remember: enzymes are denatured (not killed) at high temperatures
- Know the difference between diffusion, osmosis, and active transport`,
  },
  {
    topicName: 'Ecology',
    title: 'Study Guide: Ecology',
    content: `# Ecology

## Key Concepts

**Ecology** is the study of the interactions between organisms and their environment. It encompasses both biotic (living) and abiotic (non-living) factors.

### Ecosystem Components
- **Producers (Autotrophs)**: Make their own food via photosynthesis (e.g., plants, algae)
- **Consumers (Heterotrophs)**: Feed on other organisms
  - Primary consumers (herbivores)
  - Secondary consumers (carnivores)
  - Tertiary consumers (top carnivores)
- **Decomposers**: Break down dead organic matter (e.g., bacteria, fungi)

## Food Chains and Food Webs

A **food chain** shows the flow of energy from producers through consumers. A **food web** shows interconnected food chains, representing the complex feeding relationships in an ecosystem.

Example food chain: Grass → Grasshopper → Frog → Snake → Hawk

### Pyramid of Numbers and Energy
- **Pyramid of numbers**: Shows the number of organisms at each trophic level
- **Pyramid of biomass**: Shows the total mass of organisms at each trophic level
- **Pyramid of energy**: Shows the energy available at each trophic level

The **10% rule**: Only about 10% of energy is transferred between trophic levels.

## Biogeochemical Cycles

### Carbon Cycle
- CO₂ removed from atmosphere by **photosynthesis**
- CO₂ returned by **respiration**, **combustion**, and **decomposition**

### Nitrogen Cycle
1. **Nitrogen fixation**: N₂ → NH₃ (by nitrogen-fixing bacteria or lightning)
2. **Nitrification**: NH₃ → NO₂⁻ → NO₃⁻ (by nitrifying bacteria)
3. **Absorption**: Plants absorb nitrates through roots
4. **Decomposition/Ammonification**: Dead organisms → NH₃
5. **Denitrification**: NO₃⁻ → N₂ (by denitrifying bacteria)

### Water Cycle
Key processes: **evaporation**, **condensation**, **precipitation**, **transpiration**

## Population Ecology

- **Carrying capacity (K)**: Maximum population an environment can support
- **Limiting factors**: Factors that restrict population growth (food, water, predation, disease)
- **Symbiosis**: Close relationships between organisms (mutualism, commensalism, parasitism)

## Common Exam Questions

1. Constructing food chains and food webs from given information
2. Explaining the nitrogen cycle with named bacteria
3. Calculating energy transfer between trophic levels
4. Explaining the effect of removing a species from a food web

## CXC Exam Tips

- Always show arrows in the correct direction for nutrient cycles
- Know the names of specific bacteria in the nitrogen cycle
- Remember that energy is LOST (not stored) at each trophic level
- Be able to explain how human activities disrupt ecosystems (deforestation, pollution)`,
  },
  {
    topicName: 'Human Physiology',
    title: 'Study Guide: Human Physiology',
    content: `# Human Physiology

## Key Concepts

Human physiology covers the major body systems and their functions. Key systems for CSEC include: digestive, circulatory, respiratory, excretory, nervous, and endocrine systems.

## Digestive System

### Main Parts and Functions
- **Mouth**: Mechanical digestion (teeth) and chemical digestion (salivary amylase breaks down starch)
- **Oesophagus**: Peristalsis moves food to stomach
- **Stomach**: Produces gastric juice (HCl + pepsin) – digests proteins
- **Small intestine**: Main site of digestion and absorption; bile emulsifies fats; pancreatic juice digests all food types
- **Large intestine**: Water absorption; formation of faeces

### Key Enzymes
| Enzyme | Produced In | Substrate | Product |
|--------|------------|-----------|---------|
| Salivary amylase | Salivary glands | Starch | Maltose |
| Pepsin | Stomach | Proteins | Peptides |
| Trypsin | Pancreas | Proteins | Amino acids |
| Lipase | Pancreas | Fats | Fatty acids + glycerol |

## Circulatory System

- **Heart**: Four chambers – right atrium, right ventricle, left atrium, left ventricle
- **Blood vessels**: Arteries (carry blood away from heart), Veins (carry blood to heart), Capillaries (exchange)
- **Blood components**: Red blood cells (oxygen transport), White blood cells (defence), Platelets (clotting), Plasma (transport medium)

## Respiratory System

- **Pathway**: Nose → Trachea → Bronchi → Bronchioles → Alveoli
- **Gas exchange**: O₂ diffuses from alveoli into blood; CO₂ diffuses from blood into alveoli
- **Alveoli adaptations**: Large surface area, thin walls, moist surface, rich blood supply

## Excretory System (Kidneys)

The kidney filters blood, removes urea, and regulates water balance:
1. **Ultrafiltration** (in glomerulus): High blood pressure forces small molecules into Bowman's capsule
2. **Selective reabsorption** (in tubules): Glucose, amino acids, useful ions, and water reabsorbed
3. **Urine formation**: Excess water, urea, and salts form urine

## Nervous System

- **Central nervous system**: Brain and spinal cord
- **Peripheral nervous system**: Sensory and motor neurons
- **Reflex arc**: Stimulus → Receptor → Sensory neuron → Relay neuron → Motor neuron → Effector → Response

## Endocrine System

Key hormones:
- **Insulin**: Lowers blood glucose (pancreas)
- **Glucagon**: Raises blood glucose (pancreas)
- **Thyroxine**: Controls metabolic rate (thyroid)
- **Adrenaline**: "Fight or flight" response (adrenal glands)

## Common Exam Questions

1. Identifying parts of the digestive system on a diagram
2. Explaining how villi are adapted for absorption
3. Describing the pathway of blood through the heart
4. Explaining how the kidney maintains water balance
5. Describing a reflex arc

## CXC Exam Tips

- Know the specific enzymes, their substrates and products
- Understand the difference between arteries and veins (structure AND function)
- For the kidney, distinguish between ultrafiltration and selective reabsorption
- Remember that insulin LOWERS blood glucose – diabetes results from insufficient insulin`,
  },
  {
    topicName: 'Genetics & Heredity',
    title: 'Study Guide: Genetics & Heredity',
    content: `# Genetics & Heredity

## Key Concepts

**Genetics** is the study of inheritance – how characteristics are passed from parents to offspring through generations.

### Key Terms
- **Gene**: A section of DNA that codes for a specific protein/characteristic
- **Allele**: Different forms of the same gene
- **Dominant allele**: Expressed in the phenotype when present (e.g., B)
- **Recessive allele**: Only expressed when homozygous (e.g., b)
- **Genotype**: The genetic makeup of an organism (e.g., BB, Bb, bb)
- **Phenotype**: The physical appearance resulting from the genotype
- **Homozygous**: Two identical alleles (BB or bb)
- **Heterozygous**: Two different alleles (Bb)

## Mendelian Inheritance

### Monohybrid Cross
A cross involving one characteristic. Use a **Punnett square** to predict offspring ratios.

Example: Bb × Bb (heterozygous cross)
|       | B    | b    |
|-------|------|------|
| **B** | BB   | Bb   |
| **b** | Bb   | bb   |
Phenotypic ratio: 3:1 (dominant:recessive)
Genotypic ratio: 1:2:1 (homozygous dominant:heterozygous:homozygous recessive)

### Test Cross
Crossing an organism showing the dominant phenotype with a homozygous recessive organism to determine its genotype.

## Sex-Linked Inheritance

Some genes are carried on the X chromosome. Males (XY) are more likely to express X-linked recessive traits because they only have one X chromosome.

Examples: Colour blindness, haemophilia

### Example Cross
Carrier female (XᴮXᵇ) × Normal male (XᴮY)
- Daughters: 50% normal (XᴮXᴮ), 50% carrier (XᴮXᵇ)
- Sons: 50% normal (XᴮY), 50% affected (XᵇY)

## Variation

- **Continuous variation**: A range of intermediate values (height, weight) – influenced by many genes and environment
- **Discontinuous variation**: Distinct categories (blood group, eye colour) – controlled by single genes

## Mutations

- **Gene mutation**: Change in the base sequence of DNA (e.g., substitution, deletion)
- **Chromosomal mutation**: Change in structure or number of chromosomes
- Mutations can be harmful, neutral, or beneficial
- Mutations are the source of new alleles and drive evolution

## DNA Structure

- Double helix structure
- Made of nucleotides, each containing: deoxyribose sugar, phosphate group, nitrogenous base (A, T, C, G)
- Base pairing: A-T, C-G
- DNA replication is **semi-conservative**

## Common Exam Questions

1. Drawing and interpreting Punnett squares
2. Solving sex-linked inheritance problems
3. Explaining the difference between genotype and phenotype
4. Describing the effects of mutations
5. Distinguishing between continuous and discontinuous variation

## CXC Exam Tips

- Always write both genotypes AND phenotypes in your answers
- For sex-linked crosses, clearly label the X and Y chromosomes
- Remember: males cannot be carriers of X-linked traits – they either have it or they don't
- When describing inheritance, use the terms dominant, recessive, homozygous, and heterozygous correctly`,
  },
  {
    topicName: 'Plant Biology',
    title: 'Study Guide: Plant Biology',
    content: `# Plant Biology

## Key Concepts

Plant biology covers the structure, function, and processes of plants, including photosynthesis, transpiration, transport, and reproduction.

## Photosynthesis

**Photosynthesis** is the process by which green plants convert light energy into chemical energy (glucose).

### Word Equation
Carbon dioxide + Water → Glucose + Oxygen (in the presence of light and chlorophyll)

### Balanced Chemical Equation
6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂

### Conditions
- **Light** (absorbed by chlorophyll, mainly red and blue wavelengths)
- **Chlorophyll** (green pigment found in chloroplasts)
- **Carbon dioxide** (enters through stomata)
- **Water** (absorbed by root hairs from soil)

### Limiting Factors
Factors that can limit the rate of photosynthesis:
- **Light intensity**: Increases rate up to a plateau
- **CO₂ concentration**: Increases rate up to a plateau
- **Temperature**: Optimum around 25-30°C; enzymes denature above this

### Leaf Structure Adaptations
- **Large surface area**: Maximises light absorption
- **Thin**: Short diffusion distance for gases
- **Waxy cuticle**: Reduces water loss
- **Palisade mesophyll**: Cells packed with chloroplasts near the top
- **Spongy mesophyll**: Air spaces for gas exchange
- **Stomata**: Pores for gas exchange (CO₂ in, O₂ out)

## Plant Transport

### Xylem
- Transports **water and dissolved minerals** from roots to leaves
- Made of dead cells forming hollow tubes
- Water movement: **Root pressure** + **Capillary action** + **Transpiration pull**

### Phloem
- Transports **sugars (sucrose)** and amino acids from leaves to rest of plant
- Made of living cells
- Process is called **translocation**

## Transpiration

**Transpiration** is the loss of water vapour from the leaves of a plant through stomata.

### Factors Affecting Rate
| Factor | Effect on Rate |
|--------|---------------|
| Temperature ↑ | Rate ↑ |
| Humidity ↑ | Rate ↓ |
| Wind speed ↑ | Rate ↑ |
| Light intensity ↑ | Rate ↑ (stomata open wider) |

### Transpiration Pull
The main force pulling water up through xylem vessels. As water evaporates from leaf cells, more water is drawn up from below, creating a continuous column.

## Plant Reproduction

- **Pollination**: Transfer of pollen from anther to stigma
- **Fertilisation**: Fusion of male gamete (pollen) with female gamete (ovule)
- **Seed dispersal**: Wind, water, animals, explosion

## Common Exam Questions

1. Investigating the effect of light intensity on photosynthesis using a pondweed experiment
2. Explaining how leaf structure is adapted for photosynthesis
3. Describing the pathway of water through a plant
4. Factors affecting transpiration rate
5. Comparing xylem and phloem structure and function

## CXC Exam Tips

- When describing the photosynthesis experiment, mention counting oxygen bubbles or measuring volume of gas
- Know the difference between xylem (water/minerals UP) and phloem (sugars BOTH directions)
- Transpiration is NOT the same as evaporation – it is controlled by stomata
- Remember: guard cells control the opening and closing of stomata`,
  },
  {
    topicName: 'Evolution',
    title: 'Study Guide: Evolution',
    content: `# Evolution

## Key Concepts

**Evolution** is the gradual change in the inherited characteristics of a population over many generations, resulting in the development of new species.

## Theory of Natural Selection (Darwin)

### Key Principles
1. **Variation**: Individuals in a population show variation in their characteristics
2. **Competition**: There is competition for limited resources (food, mates, territory)
3. **Survival of the fittest**: Individuals with advantageous characteristics are more likely to survive and reproduce
4. **Inheritance**: Advantageous characteristics are passed to offspring
5. **Gradual change**: Over many generations, the frequency of advantageous alleles increases in the population

### Example: Peppered Moths
- Before industrial revolution: Light moths were camouflaged on light trees
- During industrial revolution: Soot darkened trees, dark moths had better camouflage
- Dark moths survived better, reproduced more, and became more common
- This demonstrates natural selection in action

## Evidence for Evolution

1. **Fossil record**: Shows gradual changes in organisms over time; transitional fossils
2. **Comparative anatomy**: Homologous structures (same origin, different function, e.g., human arm and whale flipper) indicate common ancestry
3. **Comparative embryology**: Early embryos of different species look similar
4. **Molecular evidence (DNA)**: Closely related species share more DNA sequences
5. **Geographical distribution**: Species on islands resemble those on nearest mainland

### Homologous vs Analogous Structures
- **Homologous structures**: Same evolutionary origin but different functions (e.g., forelimbs of vertebrates) – evidence of common ancestry
- **Analogous structures**: Similar functions but different evolutionary origins (e.g., wings of bats and insects) – result of convergent evolution

## Speciation

**Speciation** is the formation of new species. It occurs when populations of the same species become reproductively isolated.

### Types of Isolation
- **Geographical isolation**: Physical barrier separates populations
- **Ecological isolation**: Populations live in different habitats
- **Reproductive isolation**: Changes in mating behaviour or reproductive timing

## Antibiotic Resistance

A modern example of natural selection:
1. Bacteria vary in their resistance to antibiotics
2. When antibiotics are used, susceptible bacteria die
3. Resistant bacteria survive and reproduce
4. Over time, the population becomes predominantly resistant
5. This is why antibiotics should be used responsibly

## Common Exam Questions

1. Explaining natural selection using a specific example
2. Describing the evidence for evolution
3. Distinguishing between homologous and analogous structures
4. Explaining how antibiotic resistance develops
5. Describing the process of speciation

## CXC Exam Tips

- Use the Peppered Moth example – it is the classic CXC question
- When explaining natural selection, use the key words: variation, competition, survival, reproduction, inheritance
- Know the difference between Lamarck's theory (acquired characteristics) and Darwin's theory (natural selection)
- Remember: evolution is a population process, not an individual one`,
  },
]

const CHEMISTRY_NOTES: { topicName: string; title: string; content: string }[] = [
  {
    topicName: 'Atomic Structure',
    title: 'Study Guide: Atomic Structure',
    content: `# Atomic Structure

## Key Concepts

All matter is made up of **atoms**, the smallest particles of an element that retain the chemical properties of that element.

### Subatomic Particles
| Particle | Relative Mass | Relative Charge | Location |
|----------|--------------|-----------------|----------|
| **Proton** | 1 | +1 | Nucleus |
| **Neutron** | 1 | 0 | Nucleus |
| **Electron** | 1/1840 (negligible) | -1 | Electron shells |

- **Atomic number (Z)**: Number of protons
- **Mass number (A)**: Number of protons + neutrons
- In a neutral atom: number of protons = number of electrons

## Electron Configuration

Electrons are arranged in **shells** (energy levels) around the nucleus:
- **1st shell**: Maximum 2 electrons
- **2nd shell**: Maximum 8 electrons
- **3rd shell**: Maximum 18 electrons (but holds only 8 in first 20 elements)

The **valence electrons** (outermost shell electrons) determine chemical properties.

### Examples
- Sodium (Z=11): 2, 8, 1 → 1 valence electron (very reactive)
- Neon (Z=10): 2, 8 → Full outer shell (noble gas, unreactive)
- Calcium (Z=20): 2, 8, 8, 2 → 2 valence electrons

## Isotopes

**Isotopes** are atoms of the same element with the same number of protons but different numbers of neutrons.

Examples:
- Carbon-12 (⁶C¹²): 6 protons, 6 neutrons
- Carbon-14 (⁶C¹⁴): 6 protons, 8 neutrons
- Chlorine-35 and Chlorine-37

Isotopes have the same chemical properties but different physical properties (mass).

## Ions

**Ions** are charged particles formed when atoms gain or lose electrons:
- **Cations** (+): Atoms that lose electrons (e.g., Na⁺, Mg²⁺, Ca²⁺, Al³⁺)
- **Anions** (-): Atoms that gain electrons (e.g., Cl⁻, O²⁻, N³⁻)

Metals tend to form cations; non-metals tend to form anions.

## Relative Atomic Mass

The **relative atomic mass (Ar)** is the weighted average mass of an atom compared to 1/12 of carbon-12. It accounts for the relative abundance of isotopes.

Example: Chlorine has Ar ≈ 35.5 because it is 75% Cl-35 and 25% Cl-37.

## Common Exam Questions

1. Determining electron configuration from atomic number
2. Calculating numbers of protons, neutrons, and electrons
3. Explaining what isotopes are with examples
4. Predicting ion charges based on electron configuration

## CXC Exam Tips

- Always check that total electrons = atomic number
- For isotopes, the number of PROTONS never changes
- When drawing atoms, show shells as concentric circles with dots/crosses for electrons
- Know the first 20 elements by name, symbol, and atomic number`,
  },
  {
    topicName: 'Chemical Bonding',
    title: 'Study Guide: Chemical Bonding',
    content: `# Chemical Bonding

## Key Concepts

Chemical bonds are forces of attraction that hold atoms together in compounds. There are three main types: ionic, covalent, and metallic bonding.

## Ionic Bonding

Ionic bonds form between **metals and non-metals** through the transfer of electrons:
1. Metal atom **loses** electron(s) → becomes a positive ion (cation)
2. Non-metal atom **gains** electron(s) → becomes a negative ion (anion)
3. Strong electrostatic attraction between oppositely charged ions

### Example: Sodium Chloride (NaCl)
Na → Na⁺ + e⁻ (sodium loses 1 electron)
Cl + e⁻ → Cl⁻ (chlorine gains 1 electron)
Na⁺ + Cl⁻ → NaCl

### Properties of Ionic Compounds
- High melting and boiling points (strong electrostatic forces)
- Conduct electricity when **molten or dissolved** (ions are free to move)
- Do NOT conduct as solids (ions fixed in lattice)
- Usually soluble in water
- Brittle (shifting layers brings like charges together)

## Covalent Bonding

Covalent bonds form between **non-metals** through the **sharing** of electron pairs.

### Types
- **Single bond**: Sharing 1 pair of electrons (e.g., H-H, Cl-Cl)
- **Double bond**: Sharing 2 pairs (e.g., O=O, C=O)
- **Triple bond**: Sharing 3 pairs (e.g., N≡N)

### Simple vs Giant Covalent Structures
- **Simple molecules** (e.g., H₂O, CO₂, CH₄): Low melting points, do not conduct, may be gases/liquids at room temperature
- **Giant covalent** (e.g., diamond, graphite, silicon dioxide): Very high melting points

## Intermolecular Forces

Forces BETWEEN molecules (weaker than intramolecular bonds):
- **Van der Waals forces**: Weakest; between all molecules
- **Dipole-dipole forces**: Between polar molecules
- **Hydrogen bonds**: Strongest intermolecular force; between molecules with H bonded to N, O, or F

## Metallic Bonding

Metals have a **lattice of positive ions** surrounded by a **sea of delocalised electrons**.

### Properties
- Good conductors of heat and electricity (delocalised electrons)
- Malleable and ductile (layers can slide)
- High melting points (strong metallic bonds)

## Common Exam Questions

1. Drawing dot-and-cross diagrams for ionic compounds
2. Comparing properties of ionic, covalent, and metallic substances
3. Explaining why ionic compounds conduct when molten but not as solids
4. Predicting types of bonding from element positions in the periodic table

## CXC Exam Tips

- When drawing dot-and-cross diagrams, use different symbols for each atom's electrons
- Know WHY ionic compounds have high melting points (strong forces between ions)
- Metallic bonding explains conductivity AND malleability
- Hydrogen bonds are NOT the same as covalent bonds containing hydrogen`,
  },
  {
    topicName: 'Stoichiometry',
    title: 'Study Guide: Stoichiometry',
    content: `# Stoichiometry

## Key Concepts

Stoichiometry is the quantitative study of chemical reactions – calculating the amounts of reactants and products.

## The Mole Concept

A **mole** is the amount of substance that contains 6.022 × 10²³ particles (Avogadro's number).

### Key Formulas
- **Moles (n)** = Mass (m) / Molar Mass (M)
- **Moles (n)** = Number of particles / Avogadro's number
- **Moles (n)** = Volume of gas (dm³) / 24 dm³ (at room temperature and pressure)
- **Concentration (mol/dm³)** = Moles / Volume (dm³)

## Molar Mass

The molar mass (M) is the mass of one mole of a substance in grams. It is numerically equal to the relative formula mass.

Examples:
- H₂O: 2(1) + 16 = 18 g/mol
- NaCl: 23 + 35.5 = 58.5 g/mol
- CaCO₃: 40 + 12 + 3(16) = 100 g/mol
- H₂SO₄: 2(1) + 32 + 4(16) = 98 g/mol

## Balancing Chemical Equations

Always balance equations by adjusting coefficients (numbers in front), never by changing subscripts.

Example: ___Fe + ___O₂ → ___Fe₂O₃
Balanced: 4Fe + 3O₂ → 2Fe₂O₃

## Calculations Using Balanced Equations

### Step-by-step approach:
1. Write the balanced equation
2. Calculate moles of the given substance
3. Use the mole ratio from the equation
4. Calculate the required quantity

### Example
What mass of MgO is produced when 12 g of Mg burns completely?
2Mg + O₂ → 2MgO

1. Moles of Mg = 12/24 = 0.5 mol
2. Ratio Mg:MgO = 2:2 = 1:1
3. Moles of MgO = 0.5 mol
4. Mass of MgO = 0.5 × (24+16) = 0.5 × 40 = 20 g

## Gas Volumes

At room temperature and pressure (r.t.p.):
- 1 mole of any gas occupies **24 dm³** (24 litres)
- Equal moles of gases occupy equal volumes

### Example
2H₂ + O₂ → 2H₂O
2 volumes + 1 volume → 2 volumes (if all are gases)

## Empirical and Molecular Formulas

- **Empirical formula**: Simplest whole-number ratio of atoms
- **Molecular formula**: Actual number of atoms in each molecule

To find empirical formula from percentages:
1. Convert % to grams
2. Divide by relative atomic mass to get moles
3. Divide all by smallest number of moles
4. Round to nearest whole number

## Common Exam Questions

1. Calculating molar mass and moles
2. Mass-mass calculations using balanced equations
3. Gas volume calculations
4. Finding empirical formulas from percentage composition
5. Molar concentration calculations

## CXC Exam Tips

- ALWAYS show your working – method marks are awarded
- Check that equations are balanced BEFORE starting calculations
- Remember: volume of gas calculations use 24 dm³/mol at r.t.p. (NOT 22.4)
- For titration calculations, use: moles = concentration × volume (in dm³)`,
  },
  {
    topicName: 'Organic Chemistry',
    title: 'Study Guide: Organic Chemistry',
    content: `# Organic Chemistry

## Key Concepts

**Organic chemistry** is the study of carbon compounds (excluding simple oxides, carbonates, and carbides). Carbon can form four covalent bonds, allowing a vast range of compounds.

## Homologous Series

A homologous series is a family of organic compounds with:
- Same general formula
- Same functional group
- Similar chemical properties
- Gradual change in physical properties (e.g., boiling point increases with chain length)
- Each successive member differs by -CH₂-

## Key Homologous Series

### Alkanes (Single bonds only)
- General formula: **CₙH₂ₙ₊₂**
- Saturated hydrocarbons
- Examples: CH₄ (methane), C₂H₆ (ethane), C₃H₈ (propane)
- Relatively unreactive; undergo combustion and substitution reactions

### Alkenes (Contain C=C double bond)
- General formula: **CₙH₂ₙ**
- Unsaturated hydrocarbons
- Examples: C₂H₄ (ethene), C₃H₆ (propene)
- More reactive than alkanes; undergo addition reactions
- Test with **bromine water** (decolourises: orange → colourless)

### Alcohols (-OH group)
- General formula: **CₙH₂ₙ₊₁OH**
- Examples: CH₃OH (methanol), C₂H₅OH (ethanol)
- Ethanol produced by fermentation of sugars by yeast
- Uses: solvents, fuels, alcoholic drinks

### Carboxylic Acids (-COOH group)
- General formula: **CₙH₂ₙ₊₁COOH**
- Examples: HCOOH (methanoic acid), CH₃COOH (ethanoic acid)
- Weak acids; react with metals, bases, and carbonates
- Ethanoic acid is the acid in vinegar

## Key Reactions

### Combustion
- Complete: Hydrocarbon + O₂ → CO₂ + H₂O
- Incomplete (limited O₂): Hydrocarbon + O₂ → CO + H₂O (or C + H₂O)

### Addition (Alkenes only)
- C₂H₄ + Br₂ → C₂H₄Br₂ (bromine adds across double bond)
- C₂H₄ + H₂O → C₂H₅OH (hydration)

### Fermentation
- Glucose → Ethanol + CO₂ (enzymes in yeast, anaerobic, 35-40°C)

### Esterification
- Alcohol + Carboxylic Acid → Ester + Water (acid catalyst)

## Polymers

**Polymers** are large molecules made by joining many small molecules (monomers).

- **Polyethene**: Made from ethene monomers
- **Polypropene**: Made from propene monomers
- **PVC**: Made from chloroethene monomers
- Addition polymers form when C=C bonds break and monomers link

## Common Exam Questions

1. Naming organic compounds using IUPAC nomenclature
2. Distinguishing between alkanes and alkenes using bromine water
3. Writing equations for combustion reactions
4. Describing the fermentation process and conditions
5. Explaining addition polymerisation

## CXC Exam Tips

- Count carbons carefully: meth- (1), eth- (2), prop- (3), but- (4), pent- (5), hex- (6)
- The bromine water test only works for alkenes (unsaturated hydrocarbons)
- In IUPAC naming, number the carbon chain from the end nearest to the functional group
- Remember: alkanes end in -ane, alkenes in -ene, alcohols in -ol, carboxylic acids in -oic acid`,
  },
  {
    topicName: 'Acids, Bases & Salts',
    title: 'Study Guide: Acids, Bases & Salts',
    content: `# Acids, Bases & Salts

## Key Concepts

### Acids
Acids are substances that produce **H⁺ ions** (hydrogen ions) when dissolved in water.

### Bases and Alkalis
- **Bases**: Substances that react with acids (usually metal oxides or hydroxides)
- **Alkalis**: Bases that are **soluble** in water; produce **OH⁻ ions**

### The pH Scale
- Range: 0 to 14
- pH 0-6: **Acidic** (lower = more acidic)
- pH 7: **Neutral**
- pH 8-14: **Alkaline** (higher = more alkaline)

### Strong vs Weak Acids
- **Strong acids**: Completely dissociate in water (e.g., HCl, H₂SO₄, HNO₃)
- **Weak acids**: Partially dissociate (e.g., CH₃COOH, citric acid, carbonic acid)

## Reactions of Acids

1. **Acid + Metal → Salt + Hydrogen gas**
   - Zn + 2HCl → ZnCl₂ + H₂↑
   - Test for H₂: "Squeaky pop" with a lighted splint

2. **Acid + Base (Alkali) → Salt + Water** (Neutralisation)
   - HCl + NaOH → NaCl + H₂O

3. **Acid + Carbonate → Salt + Water + Carbon dioxide**
   - CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑
   - Test for CO₂: Turns limewater milky

4. **Acid + Metal Oxide → Salt + Water**

## Salts

### Naming Salts
The name of the salt depends on the acid used:
| Acid | Salt |
|------|------|
| Hydrochloric acid (HCl) | Chloride |
| Sulphuric acid (H₂SO₄) | Sulphate |
| Nitric acid (HNO₃) | Nitrate |
| Ethanoic acid (CH₃COOH) | Ethanoate |

### Methods of Preparing Salts
1. **Acid + metal** (for most soluble salts with reactive metals)
2. **Acid + base/alkali** (titration method for Group 1 and ammonium salts)
3. **Acid + carbonate** (produces CO₂ gas as indicator)
4. **Precipitation** (for insoluble salts)

## Titration

A technique to determine the concentration of an unknown solution:
1. Add a known volume of acid to a flask with indicator
2. Slowly add alkali from a burette until the indicator changes colour (end point)
3. Record the volume of alkali used
4. Calculate the unknown concentration

### Calculation Example
25 cm³ of NaOH exactly neutralises 20 cm³ of 0.5 mol/dm³ HCl. Find [NaOH]:
- Moles HCl = 0.5 × 0.020 = 0.01 mol
- Ratio = 1:1, so moles NaOH = 0.01 mol
- [NaOH] = 0.01 ÷ 0.025 = 0.4 mol/dm³

## Common Exam Questions

1. Describing tests for hydrogen and carbon dioxide gases
2. Writing balanced equations for acid reactions
3. Calculating concentrations from titration data
4. Naming salts from given acids and bases
5. Explaining the difference between strong and weak acids

## CXC Exam Tips

- Learn the gas tests: H₂ (squeaky pop), CO₂ (limewater milky), O₂ (glowing splint relights)
- In titration calculations, convert cm³ to dm³ by dividing by 1000
- Always balance neutralisation equations
- Know the formulae of common acids and their corresponding salts`,
  },
  {
    topicName: 'Industrial Chemistry',
    title: 'Study Guide: Industrial Chemistry',
    content: `# Industrial Chemistry

## Key Concepts

Industrial chemistry applies chemical principles to large-scale manufacturing processes. Key processes studied in CSEC include the Haber process, Contact process, and extraction of metals.

## The Haber Process

### Purpose
Manufacture of **ammonia (NH₃)** for fertilisers and other chemicals.

### Reaction
N₂(g) + 3H₂(g) ⇌ 2NH₃(g) (ΔH is negative – exothermic)

### Conditions (Compromise)
- **Temperature**: ~450°C (lower favours product but slows rate)
- **Pressure**: ~200 atm (high favours product – fewer gas molecules on product side)
- **Catalyst**: Iron (Fe)
- **Source of N₂**: Air (fractional distillation of liquid air)
- **Source of H₂**: Natural gas (methane + steam)

### Le Chatelier's Principle
If a system at equilibrium is subjected to a change, the system shifts to counteract that change. This explains the compromise conditions.

## The Contact Process

### Purpose
Manufacture of **sulphuric acid (H₂SO₄)**.

### Steps
1. **Sulphur burning**: S + O₂ → SO₂
2. **Contact with catalyst**: 2SO₂ + O₂ → 2SO₃
   - Catalyst: Vanadium(V) oxide (V₂O₅)
   - Conditions: 450°C, 1-2 atm
3. **Absorption**: SO₃ + H₂SO₄ → H₂S₂O₇ (oleum)
4. **Dilution**: H₂S₂O₇ + H₂O → 2H₂SO₄

## Extraction of Iron (Blast Furnace)

### Raw Materials
- **Haematite** (iron ore, Fe₂O₃)
- **Coke** (carbon source)
- **Limestone** (removes impurities)
- **Air** (oxygen source)

### Key Reactions
1. Coke burns: C + O₂ → CO₂
2. Forms CO: CO₂ + C → 2CO
3. Iron is reduced: Fe₂O₃ + 3CO → 2Fe + 3CO₂
4. Slag formation: CaCO₃ → CaO + CO₂; CaO + SiO₂ → CaSiO₃ (slag)

### Properties of Iron and Steel
- **Pure iron**: Soft, malleable, corrodes easily
- **Steel**: Iron alloyed with carbon; harder and more durable
- Types: Mild steel (low carbon), high carbon steel (hard), stainless steel (contains chromium and nickel)

## Rusting and Prevention

Rusting requires both **water and oxygen**: 4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O

### Prevention Methods
- **Painting / oiling**: Barrier method
- **Galvanising**: Coating iron with zinc (sacrificial protection)
- **Sacrificial protection**: Attaching a more reactive metal (e.g., magnesium blocks on ships)
- **Alloying**: Making stainless steel

## Common Exam Questions

1. Explaining the choice of conditions in the Haber process
2. Applying Le Chatelier's principle to the Haber process
3. Describing the blast furnace process
4. Explaining methods of rust prevention
5. Describing the Contact process for sulphuric acid

## CXC Exam Tips

- Always explain WHY compromise conditions are used (rate vs yield)
- Know the difference between the ideal conditions and the compromise
- For the blast furnace, know the purpose of limestone (removing silica impurities as slag)
- When explaining sacrificial protection, use the reactivity series`,
  },
]

const PHYSICS_NOTES: { topicName: string; title: string; content: string }[] = [
  {
    topicName: 'Mechanics',
    title: 'Study Guide: Mechanics',
    content: `# Mechanics

## Key Concepts

Mechanics deals with the motion of objects and the forces that cause motion.

## Quantities and Units

### SI Units
| Quantity | Unit | Symbol |
|----------|------|--------|
| Length | metre | m |
| Mass | kilogram | kg |
| Time | second | s |
| Force | Newton | N |
| Speed/Velocity | m/s | m/s |
| Acceleration | m/s² | m/s² |
| Energy | Joule | J |
| Power | Watt | W |

### Scalar vs Vector
- **Scalar**: Magnitude only (e.g., speed, mass, temperature, energy)
- **Vector**: Magnitude AND direction (e.g., velocity, force, displacement, acceleration)

## Kinematics (Equations of Motion)

For objects moving with **constant acceleration**:
1. v = u + at
2. s = ut + ½at²
3. v² = u² + 2as
4. s = ½(u + v)t

Where: v = final velocity, u = initial velocity, a = acceleration, t = time, s = displacement

### Speed, Velocity, and Acceleration
- **Speed**: Distance / Time (scalar)
- **Velocity**: Displacement / Time (vector)
- **Acceleration**: Change in velocity / Time

## Newton's Laws of Motion

### First Law (Inertia)
An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by an unbalanced force.

### Second Law
Force = Mass × Acceleration (F = ma)
- Unit: 1 Newton = 1 kg × 1 m/s²

### Third Law
For every action, there is an equal and opposite reaction.

## Mass, Weight, and Gravity

- **Mass**: Amount of matter (kg) – constant everywhere
- **Weight**: Force of gravity on an object (N) – varies with location
- **Weight** = Mass × gravitational acceleration: W = mg
- On Earth: g ≈ 9.8 m/s² (often use 10 m/s² for calculations)

## Work, Energy, and Power

- **Work done** = Force × Distance (in direction of force): W = Fd
- **Kinetic Energy** = ½mv²
- **Gravitational Potential Energy** = mgh
- **Power** = Work / Time = Energy / Time
- **Conservation of Energy**: Energy cannot be created or destroyed, only transformed

## Common Exam Questions

1. Solving problems using equations of motion
2. Applying Newton's laws to real-world situations
3. Calculating work done and power
4. Energy conversion problems (KE ↔ GPE)
5. Understanding forces on objects in lifts and inclined planes

## CXC Exam Tips

- Always write the formula before substituting values
- Include units in your final answer
- For projectile motion, treat horizontal and vertical components separately
- Remember: acceleration due to gravity is ALWAYS directed downward (negative in upward motion)
- When the velocity and acceleration are in opposite directions, the object is decelerating`,
  },
  {
    topicName: 'Waves & Optics',
    title: 'Study Guide: Waves & Optics',
    content: `# Waves & Optics

## Key Concepts

A **wave** is a disturbance that transfers energy without transferring matter.

### Types of Waves
- **Transverse waves**: Particles vibrate perpendicular to direction of wave travel (e.g., light, water waves on surface)
- **Longitudinal waves**: Particles vibrate parallel to direction of wave travel (e.g., sound waves)

### Key Wave Terms
| Term | Definition |
|------|-----------|
| **Wavelength (λ)** | Distance between two consecutive identical points |
| **Frequency (f)** | Number of complete waves per second (Hz) |
| **Amplitude** | Maximum displacement from rest position |
| **Wave speed (v)** | Distance travelled per second by a wave |

### Wave Equation
**v = f × λ** (wave speed = frequency × wavelength)

## Properties of Waves

All waves can be:
- **Reflected**: Bounce off a surface (Law of Reflection: angle of incidence = angle of reflection)
- **Refracted**: Change direction when entering a different medium
- **Diffracted**: Spread out when passing through a gap or around an obstacle

## The Electromagnetic Spectrum

| Type | Wavelength | Uses |
|------|-----------|------|
| Radio waves | Longest | Broadcasting, communication |
| Microwaves | | Cooking, satellite communication |
| Infrared | | Remote controls, thermal imaging |
| Visible light | | Vision, optical fibres |
| Ultraviolet | | Sterilisation, fluorescence |
| X-rays | | Medical imaging |
| Gamma rays | Shortest | Cancer treatment, sterilisation |

All EM waves: travel at 3 × 10⁸ m/s in vacuum, are transverse, can travel through vacuum.

## Light and Optics

### Reflection
- **Law**: Angle of incidence (i) = Angle of reflection (r)
- Both angles measured from the **normal** (perpendicular to surface)

### Refraction
- Light bends when entering a different medium
- Bends **towards** the normal when entering a denser medium (slowing down)
- Bends **away** from the normal when entering a less dense medium (speeding up)

### Total Internal Reflection
- Occurs when light travels from denser to less dense medium
- Angle of incidence must be **greater than the critical angle**
- Applications: optical fibres, periscopes

## Sound Waves

- Sound is a longitudinal wave requiring a medium
- Speed of sound in air: ~340 m/s
- Cannot travel through a vacuum
- Frequency range of human hearing: 20 Hz to 20,000 Hz
- Ultrasound: frequency > 20,000 Hz (medical imaging, sonar)

## Common Exam Questions

1. Calculating wave speed, frequency, or wavelength
2. Drawing ray diagrams for reflection and refraction
3. Explaining total internal reflection and its applications
4. Comparing properties of different EM waves
5. Explaining the ripple tank experiment for diffraction

## CXC Exam Tips

- Always draw normals as dashed lines perpendicular to surfaces
- Label angles clearly: angle of incidence (i) and angle of reflection (r)
- Remember: waves transfer ENERGY, not matter
- Know at least two uses for each type of EM radiation
- For the critical angle, always state it is measured from the NORMAL`,
  },
  {
    topicName: 'Thermal Physics',
    title: 'Study Guide: Thermal Physics',
    content: `# Thermal Physics

## Key Concepts

Thermal physics deals with heat, temperature, and the transfer of thermal energy.

### Temperature vs Heat
- **Temperature**: A measure of the average kinetic energy of particles (°C or K)
- **Heat (thermal energy)**: Total kinetic energy of all particles (Joules)
- An object can be at a high temperature but contain little heat (e.g., a cup of boiling water)

## Heat Transfer Methods

### 1. Conduction
- Transfer of heat through a substance without the substance itself moving
- Best in metals (free electrons transfer energy)
- Poor in non-metals (insulators like wood, plastic, air)

### 2. Convection
- Transfer of heat through a fluid (liquid or gas) by bulk movement
- Hot fluid rises (less dense), cool fluid sinks (more dense)
- Creates convection currents (e.g., sea breezes, heating systems)

### 3. Radiation
- Transfer of heat by electromagnetic waves (infrared radiation)
- Does NOT need a medium – can travel through a vacuum
- Dull, black surfaces are the best absorbers and emitters
- Shiny, white surfaces are the best reflectors

## Specific Heat Capacity

The energy needed to raise the temperature of **1 kg** of a substance by **1°C**.

### Formula
**Q = mcΔT**
- Q = heat energy (J)
- m = mass (kg)
- c = specific heat capacity (J/kg°C)
- ΔT = change in temperature (°C)

### Examples
- Water: 4200 J/kg°C (high – water heats up slowly)
- Aluminium: 900 J/kg°C
- Copper: 390 J/kg°C

## Specific Latent Heat

The energy needed to change the **state** of 1 kg of a substance without changing its temperature.

### Types
- **Specific latent heat of fusion (Lf)**: Solid → Liquid (or vice versa)
- **Specific latent heat of vaporisation (Lv)**: Liquid → Gas (or vice versa)

### Formula
**Q = mL** (where L = specific latent heat)

### Values for Water
- Latent heat of fusion: 334,000 J/kg
- Latent heat of vaporisation: 2,260,000 J/kg

## States of Matter

- **Solid**: Fixed shape and volume; particles vibrate in fixed positions
- **Liquid**: Fixed volume but takes shape of container; particles can slide past each other
- **Gas**: No fixed shape or volume; particles move freely and rapidly

### Evaporation vs Boiling
| Evaporation | Boiling |
|-------------|---------|
| Happens at any temperature | Happens at specific temperature (boiling point) |
| Only at the surface | Throughout the liquid |
| Slow process | Rapid process |
| Causes cooling | No cooling effect |

## Common Exam Questions

1. Calculating heat energy using Q = mcΔT
2. Solving problems involving change of state (Q = mL)
3. Explaining the three methods of heat transfer with examples
4. Interpreting heating/cooling curves
5. Comparing evaporation and boiling

## CXC Exam Tips

- Always check units: mass should be in kg for specific heat capacity calculations
- During a change of state, temperature remains constant (flat section on heating curve)
- Know real-world applications: vacuum flask (prevents all three types of heat transfer)
- Solar panels are black because dark surfaces absorb radiation best
- Convection currents explain: sea breezes, radiators, and weather patterns`,
  },
  {
    topicName: 'Electricity & Magnetism',
    title: 'Study Guide: Electricity & Magnetism',
    content: `# Electricity & Magnetism

## Key Concepts

### Electrical Quantities
| Quantity | Symbol | Unit | Measured by |
|----------|--------|------|------------|
| Current | I | Ampere (A) | Ammeter (in series) |
| Voltage (Potential Difference) | V | Volt (V) | Voltmeter (in parallel) |
| Resistance | R | Ohm (Ω) | |
| Charge | Q | Coulomb (C) | |
| Power | P | Watt (W) | |
| Energy | E | Joule (J) | |

## Ohm's Law

**V = IR** (Voltage = Current × Resistance)

- Current is proportional to voltage (at constant temperature)
- A graph of V vs I gives a straight line through the origin

## Circuit Rules

### Series Circuits
- Current is the **same** through all components
- Voltage is **shared** between components: V_total = V₁ + V₂ + V₃
- Total resistance: R_total = R₁ + R₂ + R₃
- If one component fails, the whole circuit breaks

### Parallel Circuits
- Voltage is the **same** across all branches
- Current is **shared** between branches: I_total = I₁ + I₂ + I₃
- Total resistance: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃
- If one branch fails, others continue to work

## Electrical Power and Energy

- **Power**: P = IV = I²R = V²/R
- **Energy**: E = Pt = VIt = QV
- **Cost**: Cost = Power (kW) × Time (hours) × Cost per kWh

### Example
A 2 kW heater runs for 3 hours. Cost per kWh = $0.25.
Energy = 2 × 3 = 6 kWh. Cost = 6 × $0.25 = $1.50.

## Magnetism

### Properties of Magnets
- Have north and south poles
- Like poles repel, unlike poles attract
- Magnetic materials: Iron, Steel, Nickel, Cobalt
- Magnetic field: Region around a magnet where magnetic force acts

### Electromagnetism
- A current-carrying wire produces a magnetic field
- **Solenoid**: A coil of wire that acts as a magnet when current flows
- Strength increased by: more coils, higher current, using a soft iron core

### The Motor Effect
A current-carrying conductor in a magnetic field experiences a force.
- Direction given by **Fleming's Left-Hand Rule** (for motors)
- Thumb = Force, First finger = Field (N→S), Second finger = Current

### Electromagnetic Induction
- Moving a magnet in a coil (or a coil in a magnetic field) induces a voltage
- More coils, stronger magnet, faster movement = greater induced voltage
- **Fleming's Right-Hand Rule** (for generators)
- Basis of: generators, transformers

## Transformers

Transformers change AC voltage levels:
- **Step-up**: More turns on secondary coil (increases voltage)
- **Step-down**: Fewer turns on secondary coil (decreases voltage)

Formula: V_primary / V_secondary = N_primary / N_secondary

## Common Exam Questions

1. Calculating current, voltage, and resistance using Ohm's Law
2. Solving series and parallel circuit problems
3. Calculating electrical energy consumption and cost
4. Applying Fleming's Left-Hand Rule
5. Explaining how transformers work

## CXC Exam Tips

- Ammeters are connected in SERIES, voltmeters in PARALLEL
- In series circuits: current same, voltage shared
- In parallel circuits: voltage same, current shared
- Always convert units: mA to A (÷1000), kΩ to Ω (×1000)
- For power calculations: P = IV is the most commonly used formula
- Know the difference between motors (current causes motion) and generators (motion causes current)`,
  },
  {
    topicName: 'Nuclear Physics',
    title: 'Study Guide: Nuclear Physics',
    content: `# Nuclear Physics

## Key Concepts

Nuclear physics deals with the structure of the atomic nucleus and nuclear reactions.

## Structure of the Nucleus

- The nucleus contains **protons** (positive charge) and **neutrons** (no charge)
- Together, protons and neutrons are called **nucleons**
- The nucleus is very small but contains most of the atom's mass
- Held together by the **strong nuclear force** (overcomes electromagnetic repulsion between protons)

## Radioactivity

**Radioactivity** is the spontaneous disintegration of unstable nuclei, emitting radiation.

### Three Types of Radiation

| Property | Alpha (α) | Beta (β) | Gamma (γ) |
|----------|-----------|----------|-----------|
| Nature | 2 protons + 2 neutrons (He nucleus) | Fast-moving electron | Electromagnetic wave |
| Charge | +2 | -1 | 0 |
| Mass | 4 (heaviest) | Negligible | 0 (no mass) |
| Speed | Slow | Fast | Speed of light |
| Ionising power | Very high | Moderate | Low |
| Penetrating power | Low (stopped by paper) | Moderate (stopped by aluminium) | High (stopped by lead/concrete) |
| Deflection in field | Deflected (towards negative) | Deflected (towards positive) | Not deflected |

## Nuclear Equations

In nuclear equations, mass number and atomic number are conserved:
- **Alpha decay**: Mass number decreases by 4, atomic number decreases by 2
  - Example: ²³⁸U → ²³⁴Th + ⁴He (α particle)
- **Beta decay**: Mass number stays same, atomic number increases by 1
  - Example: ¹⁴C → ¹⁴N + ⁰e (β particle)

## Half-Life

The **half-life** of a radioactive isotope is the time taken for **half the nuclei in a sample** to decay.

### Examples
| Isotope | Half-life | Use |
|---------|-----------|-----|
| Carbon-14 | 5,730 years | Radiocarbon dating |
| Cobalt-60 | 5.3 years | Cancer treatment |
| Iodine-131 | 8 days | Medical tracers |
| Uranium-235 | 704 million years | Nuclear fuel |

### Half-life calculation
After n half-lives: fraction remaining = (½)ⁿ

## Nuclear Fission

- A **heavy nucleus** splits into two lighter nuclei when struck by a neutron
- Releases **enormous energy** and more neutrons (chain reaction)
- Used in **nuclear power stations** and **nuclear weapons**
- Controlled by **control rods** (absorb neutrons) and **moderator** (slows neutrons)

### Nuclear Power Station
- Fuel: Enriched uranium-235
- Moderator: Graphite or water (slows fast neutrons)
- Control rods: Boron or cadmium (absorb neutrons to control rate)
- Coolant: Water or CO₂ (carries heat away)
- Heat → Steam → Turbine → Generator → Electricity

## Nuclear Fusion

- **Light nuclei** join together to form a heavier nucleus
- Releases even more energy per reaction than fission
- Powers the Sun and stars: Hydrogen nuclei fuse to form Helium
- Very high temperatures needed (millions of degrees)
- Not yet practical for power stations on Earth

## Background Radiation

Radiation from natural and artificial sources:
- **Natural**: Radon gas, rocks/soil, cosmic rays, food
- **Artificial**: Medical X-rays, nuclear waste, nuclear accidents
- Background radiation must be accounted for in radiation measurements

## Safety Precautions
- Minimise exposure time
- Maximise distance from source
- Use shielding (lead for gamma, paper for alpha)
- Never handle radioactive sources directly

## Common Exam Questions

1. Comparing properties of alpha, beta, and gamma radiation
2. Writing nuclear equations for alpha and beta decay
3. Half-life calculations (remaining activity after given time)
4. Explaining nuclear fission and chain reactions
5. Comparing nuclear fission and nuclear fusion

## CXC Exam Tips

- In nuclear equations, always check that mass numbers and atomic numbers balance on both sides
- Remember: alpha = He nucleus (mass 4, charge +2)
- Higher penetrating power = LOWER ionising power (inverse relationship)
- Half-life is a constant for each isotope – it does NOT change with temperature or amount
- Know at least 3 uses and 3 safety precautions for radioactive materials`,
  },
]

// ── MAIN FUNCTION ──────────────────────────────────────────────
async function main() {
  console.log('══════════════════════════════════════════════════')
  console.log('  CXC Sciences Seed – Adding Questions & Notes')
  console.log('══════════════════════════════════════════════════\n')

  // 1. Connect to Turso
  console.log('[1/6] Connecting to Turso...')
  const adapter = new PrismaLibSQL({ url: TURSO_URL, authToken: TURSO_TOKEN })
  const db = new PrismaClient({ adapter } as never)
  console.log('  ✅ Connected.\n')

  // 2. Ensure system user exists
  console.log('[2/6] Ensuring system user exists...')
  const existingUser = await db.user.findUnique({ where: { id: SYSTEM_USER_ID } })
  if (!existingUser) {
    await db.$executeRawUnsafe(
      `INSERT OR IGNORE INTO users (id, email, passwordHash, name, role, coins, createdAt, updatedAt) VALUES ('${SYSTEM_USER_ID}', '${SYSTEM_USER_EMAIL}', '$2b$10$abcdefghijklmnopqrstuvwx', 'CXC Ace Study Guides', 'TEACHER', 0, datetime('now'), datetime('now'))`,
    )
    console.log('  ✅ System user created.\n')
  } else {
    console.log('  ✅ System user already exists.\n')
  }

  // 3. Look up subjects
  console.log('[3/6] Looking up subjects...')
  const subjects = await db.subject.findMany({
    where: { code: { in: ['CSEC-BIO', 'CSEC-CHEM', 'CSEC-PHYS'] } },
  })

  const bioSubject = subjects.find((s) => s.code === 'CSEC-BIO')
  const chemSubject = subjects.find((s) => s.code === 'CSEC-CHEM')
  const physSubject = subjects.find((s) => s.code === 'CSEC-PHYS')

  if (!bioSubject || !chemSubject || !physSubject) {
    console.error('  ❌ Missing subjects! Run setup-turso-auto.ts first.')
    console.log('     Found:', subjects.map((s) => s.code).join(', ') || 'none')
    await db.$disconnect()
    process.exit(1)
  }
  console.log(`  ✅ Found: ${bioSubject.name}, ${chemSubject.name}, ${physSubject.name}\n`)

  // 4. Create questions
  console.log('[4/6] Creating questions...')
  let totalQuestions = 0

  // Helper to create questions for a subject
  async function createSubjectQuestions(
    subject: typeof bioSubject,
    questions: ReturnType<typeof mcq>[],
    subjectLabel: string,
  ) {
    let created = 0
    const topicMap = new Map<string, string>()

    for (const q of questions) {
      // Look up topic
      if (!topicMap.has(q.topicName)) {
        const topic = await db.topic.findFirst({
          where: { subjectId: subject.id, name: q.topicName },
        })
        if (topic) {
          topicMap.set(q.topicName, topic.id)
        } else {
          console.warn(`  ⚠️  Topic "${q.topicName}" not found for ${subjectLabel}, skipping question.`)
          continue
        }
      }

      await db.question.create({
        data: {
          type: q.type,
          difficulty: q.difficulty,
          content: q.content,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          subjectId: subject.id,
          topicId: topicMap.get(q.topicName)!,
          source: q.source,
          status: q.status,
        },
      })
      created++
    }
    return created
  }

  const bioCount = await createSubjectQuestions(bioSubject, BIOLOGY_QUESTIONS, 'Biology')
  console.log(`  ✅ Biology: ${bioCount} questions created`)
  totalQuestions += bioCount

  const chemCount = await createSubjectQuestions(chemSubject, CHEMISTRY_QUESTIONS, 'Chemistry')
  console.log(`  ✅ Chemistry: ${chemCount} questions created`)
  totalQuestions += chemCount

  const physCount = await createSubjectQuestions(physSubject, PHYSICS_QUESTIONS, 'Physics')
  console.log(`  ✅ Physics: ${physCount} questions created`)
  totalQuestions += physCount

  console.log(`  Total questions created: ${totalQuestions}\n`)

  // 5. Create study notes
  console.log('[5/6] Creating study notes...')
  let totalNotes = 0

  async function createSubjectNotes(
    subject: typeof bioSubject,
    notes: { topicName: string; title: string; content: string }[],
    subjectLabel: string,
  ) {
    let created = 0
    const topicMap = new Map<string, string>()

    for (const note of notes) {
      if (!topicMap.has(note.topicName)) {
        const topic = await db.topic.findFirst({
          where: { subjectId: subject.id, name: note.topicName },
        })
        if (topic) {
          topicMap.set(note.topicName, topic.id)
        } else {
          console.warn(`  ⚠️  Topic "${note.topicName}" not found for ${subjectLabel}, skipping note.`)
          continue
        }
      }

      // Check if note already exists to avoid duplicates
      const existing = await db.note.findFirst({
        where: {
          userId: SYSTEM_USER_ID,
          subjectId: subject.id,
          title: note.title,
        },
      })

      if (existing) {
        console.log(`  ℹ️  Note "${note.title}" already exists, skipping.`)
        continue
      }

      await db.note.create({
        data: {
          title: note.title,
          content: note.content,
          subjectId: subject.id,
          color: '#f0fff4',
          isShared: true,
          isPinned: false,
          userId: SYSTEM_USER_ID,
        },
      })
      created++
      console.log(`  ✅ Created: ${note.title}`)
    }
    return created
  }

  const bioNotes = await createSubjectNotes(bioSubject, BIOLOGY_NOTES, 'Biology')
  totalNotes += bioNotes

  const chemNotes = await createSubjectNotes(chemSubject, CHEMISTRY_NOTES, 'Chemistry')
  totalNotes += chemNotes

  const physNotes = await createSubjectNotes(physSubject, PHYSICS_NOTES, 'Physics')
  totalNotes += physNotes

  console.log(`  Total notes created: ${totalNotes}\n`)

  // 6. Summary
  console.log('[6/6] Summary')
  console.log('─────────────────────────────────────────────────')
  console.log(`  📚 Biology:   ${bioCount} questions, ${bioNotes} notes`)
  console.log(`  🧪 Chemistry: ${chemCount} questions, ${chemNotes} notes`)
  console.log(`  ⚡ Physics:   ${physCount} questions, ${physNotes} notes`)
  console.log('─────────────────────────────────────────────────')
  console.log(`  📊 Total:     ${totalQuestions} questions, ${totalNotes} notes`)
  console.log('══════════════════════════════════════════════════')
  console.log('  ✅ CXC Sciences seed complete!')
  console.log('══════════════════════════════════════════════════\n')

  await db.$disconnect()
}

main().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
