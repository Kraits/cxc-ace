// seed-content-part2.ts
// Additional CXC curriculum-aligned questions for Chemistry, Physics, and History
// No imports — pure data module

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
// CSEC CHEMISTRY — 35 additional questions
// ============================================================

export const EXTRA_QUESTIONS_CHEM = [
  // ---- Atomic Structure: 8 questions ----
  mcq(
    'What is the electron configuration of potassium (K, atomic number 19)?',
    [
      { label: 'A', value: '2, 8, 8, 1', isCorrect: true },
      { label: 'B', value: '2, 8, 9', isCorrect: false },
      { label: 'C', value: '2, 7, 8, 2', isCorrect: false },
      { label: 'D', value: '2, 8, 1', isCorrect: false },
    ],
    'Potassium has 19 electrons arranged as 2 in the first shell, 8 in the second, 8 in the third, and 1 in the fourth (valence) shell.',
    EASY,
    'Atomic Structure',
  ),

  mcq(
    'What is the maximum number of electrons that can occupy the second energy level (n=2)?',
    [
      { label: 'A', value: '2', isCorrect: false },
      { label: 'B', value: '6', isCorrect: false },
      { label: 'C', value: '8', isCorrect: true },
      { label: 'D', value: '18', isCorrect: false },
    ],
    'The maximum number of electrons in a shell is given by 2n². For n=2: 2(2)² = 8 electrons.',
    EASY,
    'Atomic Structure',
  ),
  mcq(
    'Which of the following elements has the highest first ionization energy?',
    [
      { label: 'A', value: 'Sodium (Na)', isCorrect: false },
      { label: 'B', value: 'Magnesium (Mg)', isCorrect: false },
      { label: 'C', value: 'Aluminium (Al)', isCorrect: false },
      { label: 'D', value: 'Neon (Ne)', isCorrect: true },
    ],
    'Ionization energy increases across a period and noble gases have the highest values because they have stable full outer shells. Neon has a complete octet (2,8).',
    MEDIUM,
    'Atomic Structure',
  ),
  mcq(
    'As you move down Group 2 of the periodic table, what happens to the atomic radius?',
    [
      { label: 'A', value: 'It decreases', isCorrect: false },
      { label: 'B', value: 'It remains the same', isCorrect: false },
      { label: 'C', value: 'It increases', isCorrect: true },
      { label: 'D', value: 'It first increases then decreases', isCorrect: false },
    ],
    'Moving down a group, each successive element has an additional electron shell, making the atom larger. The atomic radius increases from Be to Mg to Ca to Sr.',
    MEDIUM,
    'Atomic Structure',
  ),
  mcq(
    'Which trend correctly describes electronegativity across Period 3 (Na to Ar)?',
    [
      { label: 'A', value: 'Decreases from left to right', isCorrect: false },
      { label: 'B', value: 'Increases from left to right', isCorrect: true },
      { label: 'C', value: 'Remains constant', isCorrect: false },
      { label: 'D', value: 'Increases then decreases', isCorrect: false },
    ],
    'Electronegativity increases across a period because the increasing nuclear charge pulls electrons more strongly. Sodium has the lowest and chlorine the highest electronegativity in Period 3 (excluding argon).',
    MEDIUM,
    'Atomic Structure',
  ),
  mcq(
    'An element has atomic number 15. How many unpaired electrons does it have in its ground state?',
    [
      { label: 'A', value: '1', isCorrect: false },
      { label: 'B', value: '2', isCorrect: false },
      { label: 'C', value: '3', isCorrect: true },
      { label: 'D', value: '5', isCorrect: false },
    ],
    'Phosphorus (atomic number 15) has the electron configuration 1s² 2s² 2p⁶ 3s² 3p³. The three 3p electrons occupy three separate orbitals with parallel spins, giving 3 unpaired electrons.',
    HARD,
    'Atomic Structure',
  ),
  mcq(
    'Which subshell is being filled as you move across Period 4 from scandium (Sc) to zinc (Zn)?',
    [
      { label: 'A', value: '4s', isCorrect: false },
      { label: 'B', value: '4p', isCorrect: false },
      { label: 'C', value: '3d', isCorrect: true },
      { label: 'D', value: '4d', isCorrect: false },
    ],
    'The transition metals from Sc (Z=21) to Zn (Z=30) fill the 3d subshell. The 4s subshell is filled before the 3d but after calcium, the 3d orbitals begin filling.',
    HARD,
    'Atomic Structure',
  ),

  // ---- Chemical Bonding: 6 questions ----
  mcq(
    'Which type of bond involves the sharing of electron pairs between atoms?',
    [
      { label: 'A', value: 'Ionic bond', isCorrect: false },
      { label: 'B', value: 'Covalent bond', isCorrect: true },
      { label: 'C', value: 'Metallic bond', isCorrect: false },
      { label: 'D', value: 'Hydrogen bond', isCorrect: false },
    ],
    'Covalent bonds form when non-metal atoms share pairs of electrons to achieve a stable electron configuration, like the bond in H₂ or H₂O.',
    EASY,
    'Chemical Bonding',
  ),
  mcq(
    'Which of the following compounds has ionic bonding?',
    [
      { label: 'A', value: 'H₂O', isCorrect: false },
      { label: 'B', value: 'CO₂', isCorrect: false },
      { label: 'C', value: 'NaCl', isCorrect: true },
      { label: 'D', value: 'CH₄', isCorrect: false },
    ],
    'NaCl is formed when sodium (a metal) transfers an electron to chlorine (a non-metal), creating Na⁺ and Cl⁻ ions held together by electrostatic attraction (ionic bonding).',
    EASY,
    'Chemical Bonding',
  ),
  mcq(
    'What is the Lewis dot structure of the chloride ion (Cl⁻)?',
    [
      { label: 'A', value: 'Cl with 7 dots around it', isCorrect: false },
      { label: 'B', value: 'Cl with 8 dots around it and a negative charge', isCorrect: true },
      { label: 'C', value: 'Cl with 6 dots around it', isCorrect: false },
      { label: 'D', value: 'Cl with 10 dots around it and a negative charge', isCorrect: false },
    ],
    'The chloride ion has gained one electron, giving it a total of 18 electrons. Its Lewis structure shows 8 valence electrons (octet) around the Cl symbol with a minus sign.',
    MEDIUM,
    'Chemical Bonding',
  ),
  mcq(
    'Which of the following is a property of metallic bonding?',
    [
      { label: 'A', value: 'Good electrical conductivity in the solid state', isCorrect: true },
      { label: 'B', value: 'Low melting point', isCorrect: false },
      { label: 'C', value: 'Brittle when solid', isCorrect: false },
      { label: 'D', value: 'Does not conduct electricity when solid', isCorrect: false },
    ],
    'Metals conduct electricity because the delocalized (free) electrons in the metallic bond can move throughout the lattice, carrying charge. Ionic compounds only conduct when molten or dissolved.',
    MEDIUM,
    'Chemical Bonding',
  ),
  mcq(
    'Why does diamond have a very high melting point?',
    [
      { label: 'A', value: 'It has weak intermolecular forces', isCorrect: false },
      { label: 'B', value: 'Each carbon atom is covalently bonded to four others in a giant covalent lattice', isCorrect: true },
      { label: 'C', value: 'It contains ionic bonds', isCorrect: false },
      { label: 'D', value: 'It has metallic bonding', isCorrect: false },
    ],
    'In diamond, each carbon atom forms four strong covalent bonds in a tetrahedral arrangement, creating a rigid three-dimensional giant covalent structure with a very high melting point.',
    MEDIUM,
    'Chemical Bonding',
  ),
  mcq(
    'Draw the Lewis dot structure for carbon dioxide (CO₂). How many double bonds does it contain?',
    [
      { label: 'A', value: 'One double bond and two single bonds', isCorrect: false },
      { label: 'B', value: 'Two double bonds', isCorrect: true },
      { label: 'C', value: 'One triple bond and one single bond', isCorrect: false },
      { label: 'D', value: 'Three single bonds', isCorrect: false },
    ],
    'CO₂ has the structure O=C=O. Carbon shares two pairs of electrons with each oxygen atom, forming two double bonds. This gives carbon an octet and each oxygen an octet.',
    MEDIUM,
    'Chemical Bonding',
  ),

  // ---- Stoichiometry: 7 questions ----
  mcq(
    'What is the molar mass of calcium carbonate, CaCO₃? (Ca=40, C=12, O=16)',
    [
      { label: 'A', value: '68 g/mol', isCorrect: false },
      { label: 'B', value: '100 g/mol', isCorrect: true },
      { label: 'C', value: '84 g/mol', isCorrect: false },
      { label: 'D', value: '116 g/mol', isCorrect: false },
    ],
    'Molar mass of CaCO₃ = 40 + 12 + (3 × 16) = 40 + 12 + 48 = 100 g/mol.',
    EASY,
    'Stoichiometry',
  ),
  mcq(
    'What is the volume occupied by 2 moles of gas at STP?',
    [
      { label: 'A', value: '11.2 dm³', isCorrect: false },
      { label: 'B', value: '44.8 dm³', isCorrect: true },
      { label: 'C', value: '22.4 dm³', isCorrect: false },
      { label: 'D', value: '67.2 dm³', isCorrect: false },
    ],
    'At STP, 1 mole of any gas occupies 22.4 dm³. Therefore, 2 moles occupy 2 × 22.4 = 44.8 dm³.',
    EASY,
    'Stoichiometry',
  ),
  mcq(
    'Balance the following equation: C₃H₈ + O₂ → CO₂ + H₂O',
    [
      { label: 'A', value: 'C₃H₈ + 3O₂ → 3CO₂ + 4H₂O', isCorrect: false },
      { label: 'B', value: 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O', isCorrect: true },
      { label: 'C', value: 'C₃H₈ + 4O₂ → 3CO₂ + 2H₂O', isCorrect: false },
      { label: 'D', value: 'C₃H₈ + 7O₂ → 3CO₂ + 8H₂O', isCorrect: false },
    ],
    'The balanced equation is C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. Counting atoms: left side has 3C, 8H, 10O; right side has 3C, 8H, 10O. Both sides are equal.',
    MEDIUM,
    'Stoichiometry',
  ),
  mcq(
    'What mass of sodium hydroxide (NaOH) is needed to make 250 cm³ of a 0.5 mol/dm³ solution? (Na=23, O=16, H=1)',
    [
      { label: 'A', value: '5 g', isCorrect: true },
      { label: 'B', value: '10 g', isCorrect: false },
      { label: 'C', value: '20 g', isCorrect: false },
      { label: 'D', value: '2.5 g', isCorrect: false },
    ],
    'Moles needed = concentration × volume = 0.5 × 0.250 = 0.125 mol. Mass = moles × molar mass = 0.125 × 40 = 5 g.',
    MEDIUM,
    'Stoichiometry',
  ),
  mcq(
    '25.0 cm³ of 0.1 mol/dm³ HCl is neutralised by 20.0 cm³ of NaOH solution. What is the concentration of the NaOH?',
    [
      { label: 'A', value: '0.125 mol/dm³', isCorrect: true },
      { label: 'B', value: '0.080 mol/dm³', isCorrect: false },
      { label: 'C', value: '0.100 mol/dm³', isCorrect: false },
      { label: 'D', value: '0.200 mol/dm³', isCorrect: false },
    ],
    'Using the titration formula: C₁V₁ = C₂V₂ (for 1:1 ratio). 0.1 × 25 = C₂ × 20. C₂ = 2.5/20 = 0.125 mol/dm³.',
    HARD,
    'Stoichiometry',
  ),

  mcq(
    'In the reaction: 2Na + 2H₂O → 2NaOH + H₂, what mass of hydrogen gas is produced when 4.6 g of sodium reacts completely? (Na=23, H=1)',
    [
      { label: 'A', value: '0.4 g', isCorrect: false },
      { label: 'B', value: '0.2 g', isCorrect: true },
      { label: 'C', value: '2.0 g', isCorrect: false },
      { label: 'D', value: '0.1 g', isCorrect: false },
    ],
    'Moles of Na = 4.6/23 = 0.2 mol. From the equation, 2 mol Na produces 1 mol H₂, so 0.2 mol Na produces 0.1 mol H₂. Mass of H₂ = 0.1 × 2 = 0.2 g.',
    HARD,
    'Stoichiometry',
  ),

  // ---- Organic Chemistry: 6 questions ----
  mcq(
    'What is the general formula of alcohols?',
    [
      { label: 'A', value: 'CₙH₂ₙ₊₂', isCorrect: false },
      { label: 'B', value: 'CₙH₂ₙ₊₁OH', isCorrect: true },
      { label: 'C', value: 'CₙH₂ₙO', isCorrect: false },
      { label: 'D', value: 'CₙH₂ₙ₊₁COOH', isCorrect: false },
    ],
    'The general formula of alcohols is CₙH₂ₙ₊₁OH (or CₙH₂ₙ₊₂O). The functional group is the hydroxyl group (-OH). Examples include methanol (CH₃OH) and ethanol (C₂H₅OH).',
    EASY,
    'Organic Chemistry',
  ),
  mcq(
    'Which functional group is present in carboxylic acids?',
    [
      { label: 'A', value: '-OH', isCorrect: false },
      { label: 'B', value: '-COOH', isCorrect: true },
      { label: 'C', value: '-CHO', isCorrect: false },
      { label: 'D', value: '-NH₂', isCorrect: false },
    ],
    'Carboxylic acids contain the carboxyl group (-COOH). Examples include ethanoic acid (CH₃COOH, vinegar) and methanoic acid (HCOOH).',
    EASY,
    'Organic Chemistry',
  ),
  mcq(
    'What type of reaction produces an ester?',
    [
      { label: 'A', value: 'Combustion', isCorrect: false },
      { label: 'B', value: 'Esterification', isCorrect: true },
      { label: 'C', value: 'Neutralisation', isCorrect: false },
      { label: 'D', value: 'Oxidation', isCorrect: false },
    ],
    'Esterification is the reaction between a carboxylic acid and an alcohol, catalysed by a concentrated acid like H₂SO₄, to produce an ester and water.',
    MEDIUM,
    'Organic Chemistry',
  ),
  mcq(
    'Polyethylene (polythene) is an example of which type of polymer?',
    [
      { label: 'A', value: 'Condensation polymer', isCorrect: false },
      { label: 'B', value: 'Addition polymer', isCorrect: true },
      { label: 'C', value: 'Natural polymer', isCorrect: false },
      { label: 'D', value: 'Biodegradable polymer', isCorrect: false },
    ],
    'Polyethylene is formed by the addition polymerisation of ethene monomers. No small molecule is eliminated in the process, which characterises addition polymers.',
    MEDIUM,
    'Organic Chemistry',
  ),
  mcq(
    'Which compound is the product when ethanol is oxidised with acidified potassium dichromate(VI)?',
    [
      { label: 'A', value: 'Ethanal (an aldehyde)', isCorrect: false },
      { label: 'B', value: 'Ethanoic acid (a carboxylic acid)', isCorrect: true },
      { label: 'C', value: 'Ethene', isCorrect: false },
      { label: 'D', value: 'Ethane', isCorrect: false },
    ],
    'Strong oxidation of a primary alcohol (ethanol) with acidified K₂Cr₂O₇ first produces ethanal (an aldehyde) and then further oxidises it to ethanoic acid (a carboxylic acid).',
    MEDIUM,
    'Organic Chemistry',
  ),
  mcq(
    'Nylon is formed by a condensation reaction between a dicarboxylic acid and a diamine. What small molecule is released during this process?',
    [
      { label: 'A', value: 'Carbon dioxide', isCorrect: false },
      { label: 'B', value: 'Water', isCorrect: true },
      { label: 'C', value: 'Oxygen', isCorrect: false },
      { label: 'D', value: 'Hydrogen gas', isCorrect: false },
    ],
    'In condensation polymerisation, monomers join together with the elimination of a small molecule such as water. Nylon is formed from hexanedioic acid and 1,6-diaminohexane with water eliminated.',
    HARD,
    'Organic Chemistry',
  ),

  // ---- Acids Bases & Salts: 4 questions ----
  mcq(
    'What is the pH of a 0.001 mol/dm³ solution of hydrochloric acid?',
    [
      { label: 'A', value: '1', isCorrect: false },
      { label: 'B', value: '2', isCorrect: false },
      { label: 'C', value: '3', isCorrect: true },
      { label: 'D', value: '4', isCorrect: false },
    ],
    'HCl is a strong acid that fully dissociates, so [H⁺] = 0.001 = 10⁻³ mol/dm³. pH = -log₁₀[H⁺] = -log₁₀(10⁻³) = 3.',
    MEDIUM,
    'Acids Bases & Salts',
  ),
  mcq(
    'Which indicator turns red in acid and blue in alkali?',
    [
      { label: 'A', value: 'Methyl orange', isCorrect: false },
      { label: 'B', value: 'Universal indicator', isCorrect: false },
      { label: 'C', value: 'Litmus', isCorrect: true },
      { label: 'D', value: 'Phenolphthalein', isCorrect: false },
    ],
    'Litmus paper turns red under acidic conditions and blue under alkaline conditions. Methyl orange turns red in acid and yellow in alkali.',
    EASY,
    'Acids Bases & Salts',
  ),
  mcq(
    'Which of the following is a weak acid?',
    [
      { label: 'A', value: 'Hydrochloric acid (HCl)', isCorrect: false },
      { label: 'B', value: 'Sulphuric acid (H₂SO₄)', isCorrect: false },
      { label: 'C', value: 'Ethanoic acid (CH₃COOH)', isCorrect: true },
      { label: 'D', value: 'Nitric acid (HNO₃)', isCorrect: false },
    ],
    'Ethanoic acid (vinegar) is a weak acid because it only partially dissociates in water. HCl, H₂SO₄, and HNO₃ are all strong acids that fully dissociate.',
    MEDIUM,
    'Acids Bases & Salts',
  ),
  mcq(
    'Which method is used to prepare an insoluble salt such as lead(II) iodide?',
    [
      { label: 'A', value: 'Acid + metal', isCorrect: false },
      { label: 'B', value: 'Acid + base', isCorrect: false },
      { label: 'C', value: 'Precipitation (mixing solutions of two soluble salts)', isCorrect: true },
      { label: 'D', value: 'Direct combination of elements', isCorrect: false },
    ],
    'Insoluble salts are prepared by precipitation: mixing two soluble salts whose ions combine to form an insoluble product. PbI₂ is formed by mixing lead(II) nitrate and potassium iodide solutions.',
    HARD,
    'Acids Bases & Salts',
  ),

  // ---- Industrial Chemistry & Environmental Chemistry: 4 questions ----
  mcq(
    'In the Haber process, what conditions are used to maximise the yield of ammonia?',
    [
      { label: 'A', value: 'High temperature and low pressure', isCorrect: false },
      { label: 'B', value: 'Low temperature and high pressure', isCorrect: true },
      { label: 'C', value: 'Low temperature and low pressure', isCorrect: false },
      { label: 'D', value: 'High temperature and high pressure', isCorrect: false },
    ],
    'The Haber process (N₂ + 3H₂ ⇌ 2NH₃) is exothermic and produces fewer moles of gas. Low temperature and high pressure favour the forward reaction, though a compromise temperature (~450°C) is used industrially for a reasonable rate.',
    MEDIUM,
    'Industrial Chemistry',
  ),
  mcq(
    'In the Contact process, what catalyst is used?',
    [
      { label: 'A', value: 'Iron', isCorrect: false },
      { label: 'B', value: 'Vanadium(V) oxide', isCorrect: true },
      { label: 'C', value: 'Platinum', isCorrect: false },
      { label: 'D', value: 'Nickel', isCorrect: false },
    ],
    'The Contact process converts sulphur dioxide to sulphur trioxide using vanadium(V) oxide (V₂O₅) as a catalyst. The iron catalyst is used in the Haber process.',
    MEDIUM,
    'Industrial Chemistry',
  ),
  mcq(
    'Which of the following is a greenhouse gas?',
    [
      { label: 'A', value: 'Nitrogen (N₂)', isCorrect: false },
      { label: 'B', value: 'Oxygen (O₂)', isCorrect: false },
      { label: 'C', value: 'Carbon dioxide (CO₂)', isCorrect: true },
      { label: 'D', value: 'Argon (Ar)', isCorrect: false },
    ],
    'Carbon dioxide, methane, water vapour, and CFCs are greenhouse gases. They absorb infrared radiation re-emitted from the Earth\'s surface, contributing to global warming.',
    EASY,
    'Industrial Chemistry',
  ),
  mcq(
    'In the Solvay process, which substance is produced along with sodium carbonate?',
    [
      { label: 'A', value: 'Sodium hydroxide', isCorrect: false },
      { label: 'B', value: 'Calcium chloride', isCorrect: true },
      { label: 'C', value: 'Sodium chloride', isCorrect: false },
      { label: 'D', value: 'Ammonium sulphate', isCorrect: false },
    ],
    'The Solvay process produces sodium carbonate (Na₂CO₃) and calcium chloride (CaCl₂) as a by-product. Ammonia and carbon dioxide react with sodium chloride in the process.',
    HARD,
    'Industrial Chemistry',
  ),

  // ---- Electrolysis (additional coverage): 2 questions ----
  mcq(
    'During the electrolysis of molten lead(II) bromide, what is formed at the anode?',
    [
      { label: 'A', value: 'Lead metal', isCorrect: false },
      { label: 'B', value: 'Bromine gas', isCorrect: true },
      { label: 'C', value: 'Hydrogen gas', isCorrect: false },
      { label: 'D', value: 'Oxygen gas', isCorrect: false },
    ],
    'At the anode (positive electrode), negative bromide ions (Br⁻) lose electrons (oxidation) to form bromine gas (Br₂). Lead metal forms at the cathode.',
    MEDIUM,
    'Acids Bases & Salts',
  ),

  // ---- Environmental Chemistry (additional): 1 question ----
  mcq(
    'Which of the following contributes to ozone layer depletion?',
    [
      { label: 'A', value: 'Carbon dioxide from burning fossil fuels', isCorrect: false },
      { label: 'B', value: 'Chlorofluorocarbons (CFCs)', isCorrect: true },
      { label: 'C', value: 'Methane from agriculture', isCorrect: false },
      { label: 'D', value: 'Nitrogen gas from the atmosphere', isCorrect: false },
    ],
    'CFCs release chlorine atoms in the stratosphere which catalytically destroy ozone molecules. This is why CFCs were phased out under the Montreal Protocol.',
    EASY,
    'Industrial Chemistry',
  ),
]

// ============================================================
// CSEC PHYSICS — 35 additional questions
// ============================================================

export const EXTRA_QUESTIONS_PHYS = [
  // ---- Mechanics: 14 questions ----
  mcq(
    'A ball is thrown horizontally from a cliff at 10 m/s. How far does it travel horizontally in 3 seconds? (Ignore air resistance.)',
    [
      { label: 'A', value: '30 m', isCorrect: true },
      { label: 'B', value: '45 m', isCorrect: false },
      { label: 'C', value: '90 m', isCorrect: false },
      { label: 'D', value: '15 m', isCorrect: false },
    ],
    'Horizontal velocity remains constant in projectile motion (no air resistance). Distance = velocity × time = 10 × 3 = 30 m.',
    EASY,
    'Mechanics',
  ),
  mcq(
    'An object is projected horizontally at 15 m/s from a height of 45 m. How long does it take to hit the ground? (g = 10 m/s²)',
    [
      { label: 'A', value: '2.0 s', isCorrect: false },
      { label: 'B', value: '3.0 s', isCorrect: true },
      { label: 'C', value: '4.5 s', isCorrect: false },
      { label: 'D', value: '1.5 s', isCorrect: false },
    ],
    'For vertical motion: s = ut + ½gt². Since u(vertical) = 0: 45 = 0 + ½(10)t² → t² = 9 → t = 3 s.',
    MEDIUM,
    'Mechanics',
  ),
  mcq(
    'A car of mass 1000 kg travels around a circular bend of radius 50 m at 10 m/s. What is the centripetal force required?',
    [
      { label: 'A', value: '200 N', isCorrect: false },
      { label: 'B', value: '2000 N', isCorrect: true },
      { label: 'C', value: '500 N', isCorrect: false },
      { label: 'D', value: '100 N', isCorrect: false },
    ],
    'Centripetal force F = mv²/r = 1000 × 10²/50 = 1000 × 100/50 = 2000 N.',
    HARD,
    'Mechanics',
  ),
  mcq(
    'A 5 kg object moving at 4 m/s collides with a stationary 5 kg object and they stick together. What is their combined velocity after the collision?',
    [
      { label: 'A', value: '4 m/s', isCorrect: false },
      { label: 'B', value: '2 m/s', isCorrect: true },
      { label: 'C', value: '8 m/s', isCorrect: false },
      { label: 'D', value: '1 m/s', isCorrect: false },
    ],
    'By conservation of momentum: m₁u₁ + m₂u₂ = (m₁ + m₂)v. (5 × 4) + (5 × 0) = (5 + 5)v → 20 = 10v → v = 2 m/s.',
    MEDIUM,
    'Mechanics',
  ),
  mcq(
    'A force of 50 N acts on an object to move it 4 m in the direction of the force. How much work is done?',
    [
      { label: 'A', value: '200 J', isCorrect: true },
      { label: 'B', value: '12.5 J', isCorrect: false },
      { label: 'C', value: '100 J', isCorrect: false },
      { label: 'D', value: '54 J', isCorrect: false },
    ],
    'Work done = Force × distance = 50 × 4 = 200 J (joules).',
    EASY,
    'Mechanics',
  ),
  mcq(
    'A spring has a spring constant of 200 N/m. How much energy is stored when it is compressed by 0.1 m?',
    [
      { label: 'A', value: '1 J', isCorrect: true },
      { label: 'B', value: '20 J', isCorrect: false },
      { label: 'C', value: '2 J', isCorrect: false },
      { label: 'D', value: '0.5 J', isCorrect: false },
    ],
    'Elastic potential energy = ½kx² = ½ × 200 × (0.1)² = ½ × 200 × 0.01 = 1 J.',
    MEDIUM,
    'Mechanics',
  ),
  mcq(
    'A hydraulic press has a small piston of area 0.01 m² and a large piston of area 0.5 m². If a force of 200 N is applied to the small piston, what force is exerted by the large piston?',
    [
      { label: 'A', value: '4 N', isCorrect: false },
      { label: 'B', value: '1,000 N', isCorrect: false },
      { label: 'C', value: '10,000 N', isCorrect: true },
      { label: 'D', value: '2,000 N', isCorrect: false },
    ],
    'By Pascal\'s principle: F₁/A₁ = F₂/A₂. So F₂ = F₁ × A₂/A₁ = 200 × 0.5/0.01 = 200 × 50 = 10,000 N.',
    HARD,
    'Mechanics',
  ),
  mcq(
    'A metal block of mass 2 kg is fully submerged in water. The water level rises by 250 cm³. What is the upthrust (buoyant force) acting on the block? (Density of water = 1000 kg/m³, g = 10 N/kg)',
    [
      { label: 'A', value: '2.0 N', isCorrect: false },
      { label: 'B', value: '20 N', isCorrect: false },
      { label: 'C', value: '2.5 N', isCorrect: true },
      { label: 'D', value: '25 N', isCorrect: false },
    ],
    'By Archimedes\' principle, upthrust = weight of fluid displaced = ρVg = 1000 × 250 × 10⁻⁶ × 10 = 1000 × 0.00025 × 10 = 2.5 N.',
    MEDIUM,
    'Mechanics',
  ),
  mcq(
    'A stone is thrown vertically upwards at 20 m/s. How high does it go before coming momentarily to rest? (g = 10 m/s²)',
    [
      { label: 'A', value: '40 m', isCorrect: false },
      { label: 'B', value: '10 m', isCorrect: false },
      { label: 'C', value: '20 m', isCorrect: true },
      { label: 'D', value: '5 m', isCorrect: false },
    ],
    'Using v² = u² + 2as: 0 = 20² + 2(-10)s → 0 = 400 - 20s → s = 20 m.',
    MEDIUM,
    'Mechanics',
  ),
  mcq(
    'What is the kinetic energy of a 0.5 kg ball moving at 8 m/s?',
    [
      { label: 'A', value: '4 J', isCorrect: false },
      { label: 'B', value: '16 J', isCorrect: true },
      { label: 'C', value: '32 J', isCorrect: false },
      { label: 'D', value: '2 J', isCorrect: false },
    ],
    'Kinetic energy = ½mv² = ½ × 0.5 × 8² = ½ × 0.5 × 64 = 16 J.',
    EASY,
    'Mechanics',
  ),


  mcq(
    'A 60 kg person stands on a floor. If the area of each foot in contact with the floor is 0.015 m², what pressure does the person exert? (g = 10 N/kg)',
    [
      { label: 'A', value: '20,000 Pa', isCorrect: true },
      { label: 'B', value: '900 Pa', isCorrect: false },
      { label: 'C', value: '40,000 Pa', isCorrect: false },
      { label: 'D', value: '4,500 Pa', isCorrect: false },
    ],
    'Pressure = Force/Area. Weight = 60 × 10 = 600 N. Total area = 2 × 0.015 = 0.03 m². Pressure = 600/0.03 = 20,000 Pa.',
    HARD,
    'Mechanics',
  ),


  // ---- Waves & Optics: 9 questions ----
  mcq(
    'Which type of electromagnetic radiation has the longest wavelength?',
    [
      { label: 'A', value: 'Gamma rays', isCorrect: false },
      { label: 'B', value: 'Ultraviolet', isCorrect: false },
      { label: 'C', value: 'Radio waves', isCorrect: true },
      { label: 'D', value: 'X-rays', isCorrect: false },
    ],
    'The electromagnetic spectrum in order of increasing wavelength is: gamma rays, X-rays, UV, visible light, infrared, microwaves, radio waves. Radio waves have the longest wavelengths.',
    EASY,
    'Waves & Optics',
  ),
  mcq(
    'A light ray travels from glass (refractive index 1.5) into air. What is the critical angle?',
    [
      { label: 'A', value: '41.8°', isCorrect: true },
      { label: 'B', value: '48.6°', isCorrect: false },
      { label: 'C', value: '30.0°', isCorrect: false },
      { label: 'D', value: '60.0°', isCorrect: false },
    ],
    'Critical angle: sin c = 1/n = 1/1.5 = 0.6667. c = sin⁻¹(0.6667) ≈ 41.8°.',
    MEDIUM,
    'Waves & Optics',
  ),
  mcq(
    'A sound wave has a frequency of 680 Hz and a wavelength of 0.5 m. What is the speed of sound in this medium?',
    [
      { label: 'A', value: '340 m/s', isCorrect: true },
      { label: 'B', value: '1,360 m/s', isCorrect: false },
      { label: 'C', value: '170 m/s', isCorrect: false },
      { label: 'D', value: '680 m/s', isCorrect: false },
    ],
    'Speed = frequency × wavelength = 680 × 0.5 = 340 m/s.',
    EASY,
    'Waves & Optics',
  ),
  mcq(
    'The angle of incidence is 30° and the angle of refraction is 19.5° when light passes from air into glass. What is the refractive index of the glass?',
    [
      { label: 'A', value: '1.5', isCorrect: true },
      { label: 'B', value: '0.65', isCorrect: false },
      { label: 'C', value: '1.33', isCorrect: false },
      { label: 'D', value: '1.66', isCorrect: false },
    ],
    'By Snell\'s law: n = sin(i)/sin(r) = sin(30°)/sin(19.5°) = 0.500/0.334 ≈ 1.50.',
    MEDIUM,
    'Waves & Optics',
  ),

  mcq(
    'Which of the following correctly describes the Doppler effect?',
    [
      { label: 'A', value: 'The change in frequency of a wave due to the motion of the source or observer', isCorrect: true },
      { label: 'B', value: 'The bending of light as it passes from one medium to another', isCorrect: false },
      { label: 'C', value: 'The bouncing of sound waves off a surface', isCorrect: false },
      { label: 'D', value: 'The splitting of white light into its component colours', isCorrect: false },
    ],
    'The Doppler effect is the change in observed frequency (or wavelength) of a wave when there is relative motion between the source and the observer. This is why a siren sounds higher as it approaches.',
    EASY,
    'Waves & Optics',
  ),
  mcq(
    'An object is placed 8 cm from a concave mirror with a focal length of 6 cm. What is the nature of the image formed?',
    [
      { label: 'A', value: 'Virtual, upright, and magnified', isCorrect: false },
      { label: 'B', value: 'Real, inverted, and magnified', isCorrect: true },
      { label: 'C', value: 'Real, inverted, and diminished', isCorrect: false },
      { label: 'D', value: 'Virtual, upright, and diminished', isCorrect: false },
    ],
    'Using the mirror equation: 1/v = 1/f - 1/u = 1/6 - 1/8 = 1/24, so v = 24 cm. Magnification m = -v/u = -24/8 = -3. The negative sign indicates the image is inverted, and |m| = 3 means it is magnified. The image is real (v > 0), inverted, and magnified.',
    HARD,
    'Waves & Optics',
  ),
  mcq(
    'What is the wavelength of a radio wave with frequency 3 × 10⁶ Hz? (Speed of light = 3 × 10⁸ m/s)',
    [
      { label: 'A', value: '100 m', isCorrect: true },
      { label: 'B', value: '10 m', isCorrect: false },
      { label: 'C', value: '1 m', isCorrect: false },
      { label: 'D', value: '1,000 m', isCorrect: false },
    ],
    'Wavelength = speed/frequency = (3 × 10⁸)/(3 × 10⁶) = 100 m.',
    MEDIUM,
    'Waves & Optics',
  ),
  mcq(
    'Which phenomenon is responsible for the ability of optical fibres to transmit light over long distances?',
    [
      { label: 'A', value: 'Diffraction', isCorrect: false },
      { label: 'B', value: 'Total internal reflection', isCorrect: true },
      { label: 'C', value: 'Dispersion', isCorrect: false },
      { label: 'D', value: 'Interference', isCorrect: false },
    ],
    'Optical fibres work by total internal reflection. Light travels through the fibre core (higher refractive index) and reflects completely at the boundary with the cladding (lower refractive index).',
    MEDIUM,
    'Waves & Optics',
  ),

  // ---- Thermal Physics: 6 questions ----
  mcq(
    'What is the specific heat capacity of a substance if 2100 J of energy raises the temperature of 0.5 kg of the substance by 6°C?',
    [
      { label: 'A', value: '350 J/(kg°C)', isCorrect: false },
      { label: 'B', value: '700 J/(kg°C)', isCorrect: true },
      { label: 'C', value: '175 J/(kg°C)', isCorrect: false },
      { label: 'D', value: '4200 J/(kg°C)', isCorrect: false },
    ],
    'Using E = mcΔT: c = E/(mΔT) = 2100/(0.5 × 6) = 2100/3 = 700 J/(kg°C).',
    MEDIUM,
    'Thermal Physics',
  ),
  mcq(
    'How much energy is needed to melt 2 kg of ice at 0°C? (Specific latent heat of fusion of ice = 334,000 J/kg)',
    [
      { label: 'A', value: '167,000 J', isCorrect: false },
      { label: 'B', value: '334,000 J', isCorrect: false },
      { label: 'C', value: '668,000 J', isCorrect: true },
      { label: 'D', value: '1,006,000 J', isCorrect: false },
    ],
    'Energy = mass × specific latent heat = 2 × 334,000 = 668,000 J = 668 kJ.',
    EASY,
    'Thermal Physics',
  ),
  mcq(
    'A gas at 100 kPa occupies a volume of 2.0 m³. If the pressure is increased to 400 kPa at constant temperature, what is the new volume?',
    [
      { label: 'A', value: '8.0 m³', isCorrect: false },
      { label: 'B', value: '1.0 m³', isCorrect: false },
      { label: 'C', value: '0.5 m³', isCorrect: true },
      { label: 'D', value: '4.0 m³', isCorrect: false },
    ],
    'By Boyle\'s law: P₁V₁ = P₂V₂. 100 × 2 = 400 × V₂. V₂ = 200/400 = 0.5 m³.',
    EASY,
    'Thermal Physics',
  ),
  mcq(
    'Heat transfer through a fluid by the movement of the fluid itself is called:',
    [
      { label: 'A', value: 'Conduction', isCorrect: false },
      { label: 'B', value: 'Convection', isCorrect: true },
      { label: 'C', value: 'Radiation', isCorrect: false },
      { label: 'D', value: 'Insulation', isCorrect: false },
    ],
    'Convection is the transfer of heat through fluids (liquids and gases) by the circulation of currents. Hot fluid rises, cool fluid sinks, creating a convection current.',
    EASY,
    'Thermal Physics',
  ),
  mcq(
    'A gas occupies 300 cm³ at 27°C. At what temperature will it occupy 450 cm³ if the pressure remains constant?',
    [
      { label: 'A', value: '180°C', isCorrect: false },
      { label: 'B', value: '450°C', isCorrect: false },
      { label: 'C', value: '177°C', isCorrect: true },
      { label: 'D', value: '40.5°C', isCorrect: false },
    ],
    'By Charles\'s law: V₁/T₁ = V₂/T₂. 300/300 = 450/T₂. T₂ = (450 × 300)/300 = 450 K = 177°C.',
    MEDIUM,
    'Thermal Physics',
  ),
  mcq(
    'The specific latent heat of vaporisation of water is 2,260,000 J/kg. How much energy is required to convert 0.3 kg of water at 100°C to steam at 100°C?',
    [
      { label: 'A', value: '678,000 J', isCorrect: true },
      { label: 'B', value: '2,260,000 J', isCorrect: false },
      { label: 'C', value: '226,000 J', isCorrect: false },
      { label: 'D', value: '753,333 J', isCorrect: false },
    ],
    'Energy = m × L = 0.3 × 2,260,000 = 678,000 J = 678 kJ. This energy does not change the temperature; it breaks the intermolecular bonds to change state from liquid to gas.',
    MEDIUM,
    'Thermal Physics',
  ),

  // ---- Electricity & Magnetism: 6 questions ----
  mcq(
    'Three resistors of 4 Ω, 6 Ω, and 12 Ω are connected in parallel. What is the total resistance?',
    [
      { label: 'A', value: '22 Ω', isCorrect: false },
      { label: 'B', value: '2 Ω', isCorrect: true },
      { label: 'C', value: '0.5 Ω', isCorrect: false },
      { label: 'D', value: '5.5 Ω', isCorrect: false },
    ],
    'For parallel resistors: 1/R = 1/4 + 1/6 + 1/12 = 3/12 + 2/12 + 1/12 = 6/12 = 1/2. Therefore R = 2 Ω.',
    MEDIUM,
    'Electricity & Magnetism',
  ),
  mcq(
    'A transformer has 200 turns on the primary coil and 50 turns on the secondary coil. If the input voltage is 240 V, what is the output voltage?',
    [
      { label: 'A', value: '960 V', isCorrect: false },
      { label: 'B', value: '120 V', isCorrect: false },
      { label: 'C', value: '60 V', isCorrect: true },
      { label: 'D', value: '30 V', isCorrect: false },
    ],
    'Transformer equation: Vₛ/Vₚ = Nₛ/Nₚ. Vₛ = Vₚ × Nₛ/Nₚ = 240 × 50/200 = 240 × 0.25 = 60 V. This is a step-down transformer.',
    MEDIUM,
    'Electricity & Magnetism',
  ),
  mcq(
    'What is the current flowing through a 10 Ω resistor when a 5 V battery is connected across it?',
    [
      { label: 'A', value: '0.5 A', isCorrect: true },
      { label: 'B', value: '2 A', isCorrect: false },
      { label: 'C', value: '50 A', isCorrect: false },
      { label: 'D', value: '15 A', isCorrect: false },
    ],
    'By Ohm\'s law: V = IR, so I = V/R = 5/10 = 0.5 A.',
    EASY,
    'Electricity & Magnetism',
  ),
  mcq(
    'A wire is moved through a magnetic field. Which of the following affects the size of the induced e.m.f.?',
    [
      { label: 'A', value: 'The colour of the wire', isCorrect: false },
      { label: 'B', value: 'The speed of the wire through the field', isCorrect: true },
      { label: 'C', value: 'The temperature of the wire', isCorrect: false },
      { label: 'D', value: 'The length of the wire outside the field', isCorrect: false },
    ],
    'According to Faraday\'s law, the induced e.m.f. is proportional to the rate at which magnetic flux lines are cut, which depends on the speed of movement, strength of the field, and length of wire in the field.',
    MEDIUM,
    'Electricity & Magnetism',
  ),
  mcq(
    'Two resistors of 6 Ω and 12 Ω are connected in series with a 12 V battery. What is the voltage across the 6 Ω resistor?',
    [
      { label: 'A', value: '4 V', isCorrect: true },
      { label: 'B', value: '8 V', isCorrect: false },
      { label: 'C', value: '6 V', isCorrect: false },
      { label: 'D', value: '12 V', isCorrect: false },
    ],
    'Total resistance = 6 + 12 = 18 Ω. Current = V/R = 12/18 = 0.667 A. Voltage across 6 Ω = I × R = 0.667 × 6 = 4 V.',
    MEDIUM,
    'Electricity & Magnetism',
  ),
  mcq(
    'An a.c. generator produces an e.m.f. with a peak value of 340 V. What is the r.m.s. value of this e.m.f.?',
    [
      { label: 'A', value: '170 V', isCorrect: false },
      { label: 'B', value: '240 V', isCorrect: true },
      { label: 'C', value: '340 V', isCorrect: false },
      { label: 'D', value: '480 V', isCorrect: false },
    ],
    'The r.m.s. (root mean square) voltage = peak voltage / √2 = 340 / 1.414 ≈ 240 V. This is the standard mains voltage in many countries.',
    HARD,
    'Electricity & Magnetism',
  ),

  // ---- Nuclear Physics: 3 questions ----
  mcq(
    'What is the nature of beta (β) radiation?',
    [
      { label: 'A', value: 'Helium nuclei', isCorrect: false },
      { label: 'B', value: 'High-speed electrons', isCorrect: true },
      { label: 'C', value: 'Electromagnetic waves', isCorrect: false },
      { label: 'D', value: 'Protons', isCorrect: false },
    ],
    'Beta radiation consists of fast-moving electrons emitted from the nucleus when a neutron converts to a proton. Alpha particles are helium nuclei and gamma rays are electromagnetic waves.',
    EASY,
    'Nuclear Physics',
  ),
  mcq(
    'A radioactive substance has a half-life of 8 hours. If the initial activity is 400 counts per minute, what will the activity be after 24 hours?',
    [
      { label: 'A', value: '200 counts/min', isCorrect: false },
      { label: 'B', value: '50 counts/min', isCorrect: true },
      { label: 'C', value: '100 counts/min', isCorrect: false },
      { label: 'D', value: '25 counts/min', isCorrect: false },
    ],
    'Number of half-lives in 24 hours = 24/8 = 3. Activity after 3 half-lives = 400 × (½)³ = 400/8 = 50 counts/min.',
    MEDIUM,
    'Nuclear Physics',
  ),
  mcq(
    'In a nuclear fission reaction, a uranium-235 nucleus absorbs a neutron and splits into barium-141 and krypton-92. How many neutrons are released?',
    [
      { label: 'A', value: '1', isCorrect: false },
      { label: 'B', value: '2', isCorrect: false },
      { label: 'C', value: '3', isCorrect: true },
      { label: 'D', value: '4', isCorrect: false },
    ],
    'Conservation of nucleons: 235 + 1 = 236. Products: 141 + 92 + (3 neutrons) = 236. The three released neutrons sustain the chain reaction.',
    HARD,
    'Nuclear Physics',
  ),


  mcq(
    'A convex lens has a focal length of 15 cm. An object is placed 30 cm from the lens. What is the magnification?',
    [
      { label: 'A', value: '0.5', isCorrect: false },
      { label: 'B', value: '1.0', isCorrect: true },
      { label: 'C', value: '2.0', isCorrect: false },
      { label: 'D', value: '3.0', isCorrect: false },
    ],
    'Using 1/f = 1/v + 1/u: 1/15 = 1/v + 1/(-30) → 1/v = 1/15 + 1/30 = 3/30 = 1/10 → v = 30 cm. Magnification = v/u = 30/30 = 1.0. The image is the same size as the object.',
    HARD,
    'Waves & Optics',
  ),
]

// ============================================================
// CSEC HISTORY — 25 additional questions
// ============================================================

export const EXTRA_QUESTIONS_HIST = [
  // ---- The Indigenous Peoples: 4 questions ----
  mcq(
    'The Tainos and Kalinagos were part of which broader group of peoples?',
    [
      { label: 'A', value: 'The Aztecs', isCorrect: false },
      { label: 'B', value: 'The Amerindians', isCorrect: true },
      { label: 'C', value: 'The Incas', isCorrect: false },
      { label: 'D', value: 'The Mayas', isCorrect: false },
    ],
    'The Tainos and Kalinagos were both Amerindian peoples. The Tainos were Arawakan-speaking and the Kalinagos were Carib-speaking. They migrated from South America to the Caribbean islands.',
    EASY,
    'The Indigenous Peoples',
  ),
  mcq(
    'What was the main religious practice of the Taino people?',
    [
      { label: 'A', value: 'Worship of a single supreme god only', isCorrect: false },
      { label: 'B', value: 'Zemism — worship of spirits called zemis', isCorrect: true },
      { label: 'C', value: 'Buddhism', isCorrect: false },
      { label: 'D', value: 'They had no religious beliefs', isCorrect: false },
    ],
    'The Tainos practised zemism, believing in spirits called zemis that represented forces of nature and ancestors. They made carved representations of zemis from wood, bone, and stone.',
    MEDIUM,
    'The Indigenous Peoples',
  ),
  mcq(
    'Which of the following best describes the social structure of the Kalinago people?',
    [
      { label: 'A', value: 'They had a strict caste system with nobles and commoners', isCorrect: false },
      { label: 'B', value: 'Their society was organised around the ubutu (extended family)', isCorrect: true },
      { label: 'C', value: 'They had no social structure and lived as individuals', isCorrect: false },
      { label: 'D', value: 'They were ruled by hereditary kings with absolute power', isCorrect: false },
    ],
    'The Kalinago society was less hierarchical than the Tainos. It was organised around the ubutu (extended family group), and their leaders (ouboutou) were chosen for their wisdom and bravery rather than through heredity.',
    MEDIUM,
    'The Indigenous Peoples',
  ),
  mcq(
    'What was the primary reason for the decline of the Kalinago population in the Lesser Antilles after European contact?',
    [
      { label: 'A', value: 'They migrated back to South America', isCorrect: false },
      { label: 'B', value: 'Disease, warfare, and forced relocation', isCorrect: true },
      { label: 'C', value: 'Natural disasters such as volcanic eruptions', isCorrect: false },
      { label: 'D', value: 'Intermarriage with the Tainos', isCorrect: false },
    ],
    'The Kalinago population declined due to European-introduced diseases (smallpox, measles), military conflict with European colonisers, and forced relocation. Many were killed in the 1674 Kalinago Genocide in Dominica.',
    HARD,
    'The Indigenous Peoples',
  ),

  // ---- European Settlement: 5 questions ----
  mcq(
    'In which year did Christopher Columbus first land in the Bahamas?',
    [
      { label: 'A', value: '1492', isCorrect: true },
      { label: 'B', value: '1498', isCorrect: false },
      { label: 'C', value: '1502', isCorrect: false },
      { label: 'D', value: '1488', isCorrect: false },
    ],
    'Columbus made his first voyage across the Atlantic in 1492, landing on the island of Guanahani (which he named San Salvador) in the Bahamas on 12 October 1492.',
    EASY,
    'European Settlement',
  ),
  mcq(
    'Which European nation was the first to establish a permanent settlement in the Caribbean?',
    [
      { label: 'A', value: 'England', isCorrect: false },
      { label: 'B', value: 'France', isCorrect: false },
      { label: 'C', value: 'Spain', isCorrect: true },
      { label: 'D', value: 'The Netherlands', isCorrect: false },
    ],
    'Spain established the first permanent European settlement in the Caribbean at Santo Domingo on Hispaniola in 1496, after Columbus\'s second voyage.',
    EASY,
    'European Settlement',
  ),
  mcq(
    'What was the Columbian Exchange?',
    [
      { label: 'A', value: 'A trade agreement between Spain and Portugal', isCorrect: false },
      { label: 'B', value: 'The widespread transfer of plants, animals, culture, and diseases between the Americas and the Old World', isCorrect: true },
      { label: 'C', value: 'A currency system used in the Caribbean', isCorrect: false },
      { label: 'D', value: 'The exchange of enslaved Africans between European nations', isCorrect: false },
    ],
    'The Columbian Exchange was the massive transfer of plants (sugar cane, tobacco to the Americas; potatoes, maize to Europe), animals, diseases, and cultural practices between the Eastern and Western Hemispheres after 1492.',
    MEDIUM,
    'European Settlement',
  ),
  mcq(
    'Which European nations were the main rivals in the Caribbean during the 17th and 18th centuries?',
    [
      { label: 'A', value: 'Spain and Portugal', isCorrect: false },
      { label: 'B', value: 'Britain and France', isCorrect: true },
      { label: 'C', value: 'Germany and Italy', isCorrect: false },
      { label: 'D', value: 'Russia and Turkey', isCorrect: false },
    ],
    'Britain and France were the principal rivals in the Caribbean, fighting numerous wars for control of sugar-producing islands. The Treaty of Paris (1763) was particularly significant in reshaping Caribbean territories.',
    MEDIUM,
    'European Settlement',
  ),
  mcq(
    'What was the significance of the Sugar Revolution in the Caribbean?',
    [
      { label: 'A', value: 'It led to the introduction of free wage labour', isCorrect: false },
      { label: 'B', value: 'It transformed Caribbean economies from tobacco and cotton to sugar monoculture and massively increased the demand for enslaved labour', isCorrect: true },
      { label: 'C', value: 'It reduced the importance of the Caribbean in European trade', isCorrect: false },
      { label: 'D', value: 'It led to the diversification of Caribbean agriculture', isCorrect: false },
    ],
    'The Sugar Revolution (mid-1600s onwards) transformed Caribbean economies as planters switched from diversified crops to sugar monoculture. This required large-scale land clearance, capital investment, and above all, massive importation of enslaved African labour.',
    HARD,
    'European Settlement',
  ),

  // ---- Slavery & Resistance: 10 questions ----
  mcq(
    'What was the Middle Passage?',
    [
      { label: 'A', value: 'The journey of indentured labourers from India to the Caribbean', isCorrect: false },
      { label: 'B', value: 'The second stage of the triangular trade route carrying enslaved Africans from West Africa to the Americas', isCorrect: true },
      { label: 'C', value: 'The route taken by freed slaves returning to Africa', isCorrect: false },
      { label: 'D', value: 'The overland journey from African interior to coastal forts', isCorrect: false },
    ],
    'The Middle Passage was the brutal sea journey (approximately 6-10 weeks) in which enslaved Africans were transported across the Atlantic Ocean in overcrowded, unsanitary ships to the Americas as part of the triangular trade.',
    EASY,
    'Slavery & Resistance',
  ),
  mcq(
    'Which group established a famous Maroon community in the mountainous interior of Jamaica?',
    [
      { label: 'A', value: 'The Cudjoe Maroons', isCorrect: true },
      { label: 'B', value: 'The Garifuna', isCorrect: false },
      { label: 'C', value: 'The Rastafari', isCorrect: false },
      { label: 'D', value: 'The Arawaks', isCorrect: false },
    ],
    'The Jamaican Maroons, led by Cudjoe, established autonomous communities in the Cockpit Country of Jamaica. They were so skilled in guerrilla warfare that the British were forced to sign treaties with them in 1739-1740.',
    MEDIUM,
    'Slavery & Resistance',
  ),
  mcq(
    'In which year did the Berbice Slave Rebellion take place?',
    [
      { label: 'A', value: '1763', isCorrect: true },
      { label: 'B', value: '1816', isCorrect: false },
      { label: 'C', value: '1823', isCorrect: false },
      { label: 'D', value: '1831', isCorrect: false },
    ],
    'The Berbice Slave Rebellion of 1763 occurred in Dutch Guiana (now Guyana) and lasted for nearly a year. It was led by Cuffy and was one of the largest slave revolts in the Caribbean.',
    EASY,
    'Slavery & Resistance',
  ),

  mcq(
    'What was the most significant slave rebellion in Barbados, led by Bussa in 1816?',
    [
      { label: 'A', value: 'It was a peaceful protest that achieved gradual reform', isCorrect: false },
      { label: 'B', value: 'It was a large-scale armed rebellion that spread across the island, though it was suppressed within days', isCorrect: true },
      { label: 'C', value: 'It resulted in immediate abolition of slavery in Barbados', isCorrect: false },
      { label: 'D', value: 'It was the only slave rebellion in Barbados', isCorrect: false },
    ],
    'Bussa\'s Rebellion in April 1816 involved thousands of enslaved people and spread across southern Barbados. Though brutally suppressed, it demonstrated the instability of slavery and intensified the abolitionist movement in Britain.',
    MEDIUM,
    'Slavery & Resistance',
  ),
  mcq(
    'What was the Baptist War (1831-1832) in Jamaica?',
    [
      { label: 'A', value: 'A conflict between different Christian denominations', isCorrect: false },
      { label: 'B', value: 'A major slave rebellion led by Samuel Sharpe that accelerated the abolition of slavery', isCorrect: true },
      { label: 'C', value: 'A war between Jamaica and Britain over independence', isCorrect: false },
      { label: 'D', value: 'A religious revival movement with no political aims', isCorrect: false },
    ],
    'The Baptist War was a massive slave uprising in Jamaica beginning in December 1831, initially planned as a peaceful general strike by Samuel Sharpe (a Baptist deacon). It became a violent rebellion involving up to 60,000 enslaved people and directly contributed to the Slavery Abolition Act of 1833.',
    MEDIUM,
    'Slavery & Resistance',
  ),
  mcq(
    'Which of the following was an economic argument used against the continuation of slavery?',
    [
      { label: 'A', value: 'Slavery was highly profitable and should continue indefinitely', isCorrect: false },
      { label: 'B', value: 'The sugar economy was declining in profitability and free labour would be more efficient', isCorrect: true },
      { label: 'C', value: 'Slavery was morally wrong but economically beneficial', isCorrect: false },
      { label: 'D', value: 'Enslaved people preferred working under slavery', isCorrect: false },
    ],
    'Some economists and politicians argued that the Caribbean sugar industry was becoming less profitable than before, and that free (wage) labour would be more productive and motivated than slave labour. The industrial revolution also shifted economic priorities away from plantation agriculture.',
    HARD,
    'Slavery & Resistance',
  ),
  mcq(
    'How did the Demerara Rebellion of 1823 in British Guiana influence the abolitionist movement?',
    [
      { label: 'A', value: 'It had no impact on abolition', isCorrect: false },
      { label: 'B', value: 'The brutal suppression of the rebellion, including the execution of Rev. John Smith, outraged public opinion in Britain and strengthened the abolitionist cause', isCorrect: true },
      { label: 'C', value: 'It immediately led to the abolition of slavery', isCorrect: false },
      { label: 'D', value: 'It caused the British government to increase military presence in the colonies only', isCorrect: false },
    ],
    'The Demerara Rebellion involved over 10,000 enslaved people. Its violent suppression and the death of Rev. John Smith (who was wrongly blamed for inciting it) caused public outrage in Britain, giving momentum to the anti-slavery campaign.',
    HARD,
    'Slavery & Resistance',
  ),



  // ---- Emancipation: 4 questions ----
  mcq(
    'When did the Slavery Abolition Act come into effect in the British Caribbean?',
    [
      { label: 'A', value: '1807', isCorrect: false },
      { label: 'B', value: '1833', isCorrect: false },
      { label: 'C', value: '1 August 1834', isCorrect: true },
      { label: 'D', value: '1838', isCorrect: false },
    ],
    'The Slavery Abolition Act was passed in 1833 and came into effect on 1 August 1834. However, former slaves were required to serve an apprenticeship period that was prematurely ended in 1838.',
    EASY,
    'Emancipation',
  ),
  mcq(
    'What was the apprenticeship system?',
    [
      { label: 'A', value: 'A voluntary training programme for free workers', isCorrect: false },
      { label: 'B', value: 'A system that required freed slaves to continue working for their former masters for a period of 4-6 years in exchange for housing and provisions', isCorrect: true },
      { label: 'C', value: 'An educational programme for formerly enslaved children', isCorrect: false },
      { label: 'D', value: 'A system of land distribution to former slaves', isCorrect: false },
    ],
    'The apprenticeship system (1834-1838) required former enslaved people to work 40.5 hours per week for their former masters without pay, receiving only food, clothing, and housing. It was essentially slavery by another name and was abandoned early due to widespread resistance.',
    HARD,
    'Emancipation',
  ),
  mcq(
    'Which group of immigrants was brought to the Caribbean under the indentureship system to replace enslaved labour after emancipation?',
    [
      { label: 'A', value: 'Only Europeans', isCorrect: false },
      { label: 'B', value: 'East Indians, Chinese, and Portuguese from Madeira', isCorrect: true },
      { label: 'C', value: 'Only Africans from other parts of the continent', isCorrect: false },
      { label: 'D', value: 'South Americans from Brazil', isCorrect: false },
    ],
    'After emancipation, planters imported indentured labourers from India (the largest group, particularly to Trinidad and Guyana), China, and Madeira (Portugal) to work on sugar plantations.',
    EASY,
    'Emancipation',
  ),
  mcq(
    'The Morant Bay Rebellion of 1865 in Jamaica was primarily a protest against:',
    [
      { label: 'A', value: 'High taxes, injustice in the courts, and landlessness of the black peasantry', isCorrect: true },
      { label: 'B', value: 'The continuation of slavery', isCorrect: false },
      { label: 'C', value: 'Foreign invasion of Jamaica', isCorrect: false },
      { label: 'D', value: 'Religious persecution', isCorrect: false },
    ],
    'Led by Paul Bogle and George William Gordon, the Morant Bay Rebellion was a response to widespread poverty, unjust taxation, unfair treatment by colonial officials, and the failure of the post-emancipation period to deliver meaningful economic opportunity to the black majority.',
    MEDIUM,
    'Emancipation',
  ),

  // ---- Independence Movements: 6 questions ----
  mcq(
    'What was the Federation of the West Indies?',
    [
      { label: 'A', value: 'A federation of Caribbean colonies under Spanish rule', isCorrect: false },
      { label: 'B', value: 'A short-lived political union of ten British Caribbean territories that existed from 1958 to 1962', isCorrect: true },
      { label: 'C', value: 'A trade agreement between Caribbean nations', isCorrect: false },
      { label: 'D', value: 'A cultural organisation promoting Caribbean arts', isCorrect: false },
    ],
    'The West Indies Federation was established in 1958 as a step towards independence for the British Caribbean. It collapsed in 1962 when Jamaica voted to withdraw, followed by Trinidad and Tobago. Its failure led to individual island independence.',
    MEDIUM,
    'Independence Movements',
  ),
  mcq(
    'Which Caribbean territory was the first to gain independence from Britain?',
    [
      { label: 'A', value: 'Jamaica', isCorrect: true },
      { label: 'B', value: 'Trinidad and Tobago', isCorrect: false },
      { label: 'C', value: 'British Guiana', isCorrect: false },
      { label: 'D', value: 'Barbados', isCorrect: false },
    ],
    'Jamaica gained independence from Britain on 6 August 1962, becoming the first British Caribbean colony to do so. Trinidad and Tobago followed on 31 August 1962.',
    MEDIUM,
    'Independence Movements',
  ),
  mcq(
    'What was the role of the trade union movement in Caribbean independence?',
    [
      { label: 'A', value: 'Trade unions played no role in politics', isCorrect: false },
      { label: 'B', value: 'Trade unions provided a platform for working-class political organisation and leaders like Bustamante and Manley became key figures in the independence movement', isCorrect: true },
      { label: 'C', value: 'Trade unions opposed independence', isCorrect: false },
      { label: 'D', value: 'Trade unions only focused on wages, not political change', isCorrect: false },
    ],
    'Trade unions such as the BITU (Bustamante Industrial Trades Union) and the TUC (led by Norman Manley) became vehicles for political mobilisation. Leaders emerged from the labour movement and formed political parties that led their countries to independence.',
    MEDIUM,
    'Independence Movements',
  ),
  mcq(
    'What system of government replaced the Crown Colony system as Caribbean nations moved towards independence?',
    [
      { label: 'A', value: 'Absolute monarchy', isCorrect: false },
      { label: 'B', value: 'Representative democracy with full adult suffrage and self-government', isCorrect: true },
      { label: 'C', value: 'Military dictatorship', isCorrect: false },
      { label: 'D', value: 'Colonial rule by another European power', isCorrect: false },
    ],
    'As Caribbean nations progressed towards independence, the Crown Colony system (where the British governor held most power) was gradually replaced with representative government, cabinet government, and ultimately full self-rule.',
    MEDIUM,
    'Independence Movements',
  ),
  mcq(
    'When did Jamaica and Trinidad and Tobago gain independence from Britain?',
    [
      { label: 'A', value: '1958', isCorrect: false },
      { label: 'B', value: '1962', isCorrect: true },
      { label: 'C', value: '1966', isCorrect: false },
      { label: 'D', value: '1970', isCorrect: false },
    ],
    'Both Jamaica (6 August 1962) and Trinidad and Tobago (31 August 1962) gained independence in 1962, following the collapse of the West Indies Federation earlier that year.',
    EASY,
    'Independence Movements',
  ),
]
