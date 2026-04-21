/**
 * CXC Ace – CSEC Seed Part 2 (New)
 * Adds 8 CSEC subjects with 5 topics and 15 MCQ questions each (120 total)
 *
 * Subjects: Agricultural Science, Food & Nutrition, Physical Education & Sport,
 *           Technical Drawing, Office Administration, EDPM, Music, Visual Arts
 *
 * Usage: DATABASE_URL=<turso_url> DATABASE_AUTH_TOKEN=<token> npx tsx prisma/seed-new-csec-2.ts
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

// ── 8 CSEC Subjects ─────────────────────────────────────────

const SUBJECTS = [
  { name: 'Agricultural Science', code: 'CSEC-AGRI', description: 'CSEC Agricultural Science — Crop Production, Animal Husbandry, Soil Science, Pest Management, and Agricultural Economics', color: '#65a30d', icon: '🌾', topics: ['Crop Production', 'Animal Husbandry', 'Soil Science', 'Pest Management', 'Agricultural Economics'] },
  { name: 'Food & Nutrition', code: 'CSEC-FN', description: 'CSEC Food & Nutrition — Nutrition & Health, Food Preparation, Meal Planning, Food Preservation, and Kitchen Safety & Hygiene', color: '#ea580c', icon: '🍳', topics: ['Nutrition & Health', 'Food Preparation', 'Meal Planning', 'Food Preservation', 'Kitchen Safety & Hygiene'] },
  { name: 'Physical Education & Sport', code: 'CSEC-PES', description: 'CSEC Physical Education & Sport — Anatomy & Physiology, Fitness & Training, Sports Skills, Sports Psychology, and Health & Wellness', color: '#7c3aed', icon: '⚽', topics: ['Anatomy & Physiology', 'Fitness & Training', 'Sports Skills', 'Sports Psychology', 'Health & Wellness'] },
  { name: 'Technical Drawing', code: 'CSEC-TD', description: 'CSEC Technical Drawing — Geometric Constructions, Orthographic Projection, Isometric Drawing, Sectional Views, and Building Drawing', color: '#475569', icon: '📐', topics: ['Geometric Constructions', 'Orthographic Projection', 'Isometric Drawing', 'Sectional Views', 'Building Drawing'] },
  { name: 'Office Administration', code: 'CSEC-OA', description: 'CSEC Office Administration — Office Environment, Communication, Records Management, Meetings & Conferences, and Office Equipment', color: '#0891b2', icon: '🏢', topics: ['Office Environment', 'Communication', 'Records Management', 'Meetings & Conferences', 'Office Equipment'] },
  { name: 'Electronic Document Preparation & Management (EDPM)', code: 'CSEC-EDPM', description: 'CSEC EDPM — Document Preparation, Word Processing, Spreadsheets, Database Management, and Presentation Software', color: '#0d9488', icon: '🖥️', topics: ['Document Preparation', 'Word Processing', 'Spreadsheets', 'Database Management', 'Presentation Software'] },
  { name: 'Music', code: 'CSEC-MUSIC', description: 'CSEC Music — Music Theory, Music Appreciation, Performance, Composition & Arrangement, and Caribbean Music', color: '#db2777', icon: '🎵', topics: ['Music Theory', 'Music Appreciation', 'Performance', 'Composition & Arrangement', 'Caribbean Music'] },
  { name: 'Visual Arts', code: 'CSEC-VA', description: 'CSEC Visual Arts — Drawing, Painting, Sculpture & Ceramics, Printmaking, and Art History & Appreciation', color: '#c026d3', icon: '🎨', topics: ['Drawing', 'Painting', 'Sculpture & Ceramics', 'Printmaking', 'Art History & Appreciation'] },
]

// ── Questions ────────────────────────────────────────────────

const QUESTIONS: Record<string, ReturnType<typeof mcq>[]> = {
  // ═══════════════════════════════════════════════════════════════
  // 1. AGRICULTURAL SCIENCE (CSEC-AGRI) — 15 Questions
  // ═══════════════════════════════════════════════════════════════
  'CSEC-AGRI': [
    // Crop Production (3)
    mcq('What is vegetative propagation?', [
      { label: 'A', value: 'Growing plants from seeds only', isCorrect: false },
      { label: 'B', value: 'Producing new plants from non-reproductive parts such as stems, roots, or leaves', isCorrect: true },
      { label: 'C', value: 'Using chemical fertilisers to stimulate growth', isCorrect: false },
      { label: 'D', value: 'Allowing plants to reproduce naturally without any human intervention', isCorrect: false },
    ], 'Vegetative propagation is a form of asexual reproduction where new plants grow from vegetative parts like stems, roots, or leaves. Examples include cuttings, layering, grafting, and budding. Offspring are genetically identical to the parent plant.', EASY, 'Crop Production'),
    mcq('Which of the following is an example of a leguminous crop that fixes nitrogen in the soil?', [
      { label: 'A', value: 'Maize', isCorrect: false },
      { label: 'B', value: 'Rice', isCorrect: false },
      { label: 'C', value: 'Cowpea', isCorrect: true },
      { label: 'D', value: 'Sugarcane', isCorrect: false },
    ], 'Leguminous crops such as cowpeas, beans, and peas form symbiotic relationships with Rhizobium bacteria in their root nodules, converting atmospheric nitrogen into nitrates that enrich the soil and benefit subsequent crops.', MEDIUM, 'Crop Production'),
    mcq('A farmer applies a 15-30-15 NPK fertiliser at a rate of 200 kg per hectare. How many kilograms of phosphorus (P₂O₅) are applied per hectare?', [
      { label: 'A', value: '15 kg', isCorrect: false },
      { label: 'B', value: '30 kg', isCorrect: false },
      { label: 'C', value: '60 kg', isCorrect: true },
      { label: 'D', value: '90 kg', isCorrect: false },
    ], 'The fertiliser grade 15-30-15 means 15% N, 30% P₂O₅, and 15% K₂O. Phosphorus applied = 200 kg × 0.30 = 60 kg of P₂O₅ per hectare. Understanding fertiliser grades is essential for calculating correct application rates.', HARD, 'Crop Production'),

    // Animal Husbandry (3)
    mcq('What is the term for the controlled mating of animals to improve desirable traits in offspring?', [
      { label: 'A', value: 'Castration', isCorrect: false },
      { label: 'B', value: 'Weaning', isCorrect: false },
      { label: 'C', value: 'Selective breeding', isCorrect: true },
      { label: 'D', value: 'Dehorning', isCorrect: false },
    ], 'Selective breeding involves choosing parent animals with desirable characteristics (e.g., high milk yield, disease resistance) to mate, so that these traits are passed on to and improved in the next generation.', EASY, 'Animal Husbandry'),
    mcq('Which of the following poultry management systems is most commonly used for large-scale commercial egg production in the Caribbean?', [
      { label: 'A', value: 'Free-range system', isCorrect: false },
      { label: 'B', value: 'Battery cage system', isCorrect: true },
      { label: 'C', value: 'Backyard scavenging system', isCorrect: false },
      { label: 'D', value: 'Deep litter system', isCorrect: false },
    ], 'The battery cage system houses hens in stacked wire cages inside a controlled environment. It allows for high-density egg production, easy egg collection, and efficient feed conversion, though it raises animal welfare concerns.', MEDIUM, 'Animal Husbandry'),
    mcq('Calculate the feed conversion ratio (FCR) if a broiler chicken consumes 3.6 kg of feed to reach a live weight of 1.8 kg.', [
      { label: 'A', value: '0.5', isCorrect: false },
      { label: 'B', value: '1.8', isCorrect: false },
      { label: 'C', value: '2.0', isCorrect: true },
      { label: 'D', value: '5.4', isCorrect: false },
    ], 'FCR = Total Feed Consumed ÷ Live Weight Gained = 3.6 ÷ 1.8 = 2.0. A lower FCR indicates more efficient feed use. For broilers, an FCR of 1.5–2.0 is considered good commercial performance.', HARD, 'Animal Husbandry'),

    // Soil Science (3)
    mcq('Which soil horizon is considered the most fertile for agriculture?', [
      { label: 'A', value: 'O horizon (organic layer)', isCorrect: false },
      { label: 'B', value: 'A horizon (topsoil)', isCorrect: true },
      { label: 'C', value: 'B horizon (subsoil)', isCorrect: false },
      { label: 'D', value: 'C horizon (parent material)', isCorrect: false },
    ], 'The A horizon (topsoil) is the uppermost mineral layer, rich in organic matter and humus, making it the most fertile. It contains the highest concentration of nutrients, microorganisms, and plant roots essential for crop growth.', EASY, 'Soil Science'),
    mcq('What is soil pH and why is it important in agriculture?', [
      { label: 'A', value: 'Soil pH measures temperature; it affects seed germination rates', isCorrect: false },
      { label: 'B', value: 'Soil pH measures acidity or alkalinity; it affects nutrient availability and microbial activity', isCorrect: true },
      { label: 'C', value: 'Soil pH measures water content; it determines irrigation scheduling', isCorrect: false },
      { label: 'D', value: 'Soil pH measures nitrogen levels; it indicates fertiliser requirements', isCorrect: false },
    ], 'Soil pH (0–14 scale) measures acidity or alkalinity. Most crops prefer a slightly acidic pH of 6.0–7.0. Extreme pH levels lock nutrients in forms plants cannot absorb and reduce beneficial soil organism activity.', MEDIUM, 'Soil Science'),
    mcq('A soil test reveals the following exchangeable cations per 100g of soil: Ca²⁺ = 4.0 meq, Mg²⁺ = 2.0 meq, K⁺ = 0.4 meq, Na⁺ = 0.1 meq, H⁺ = 3.5 meq. Calculate the base saturation percentage.', [
      { label: 'A', value: '35%', isCorrect: false },
      { label: 'B', value: '45%', isCorrect: false },
      { label: 'C', value: '64.6%', isCorrect: true },
      { label: 'D', value: '78.5%', isCorrect: false },
    ], 'Total CEC = 4.0 + 2.0 + 0.4 + 0.1 + 3.5 = 10.0 meq. Base cations = Ca + Mg + K + Na = 6.5 meq. Base Saturation = (6.5 ÷ 10.0) × 100 = 64.6%. Values above 50% generally indicate adequate fertility.', HARD, 'Soil Science'),

    // Pest Management (3)
    mcq('What is an example of a biological control method for managing pest populations?', [
      { label: 'A', value: 'Spraying chemical insecticides on crops', isCorrect: false },
      { label: 'B', value: 'Introducing ladybird beetles to control aphid populations', isCorrect: true },
      { label: 'C', value: 'Removing all weeds by hand', isCorrect: false },
      { label: 'D', value: 'Using scarecrows in the field', isCorrect: false },
    ], 'Biological control uses natural enemies — predators, parasites, or pathogens — to manage pest populations. Ladybird beetles are natural predators of aphids and can significantly reduce aphid numbers without chemical pesticides.', EASY, 'Pest Management'),
    mcq('What is the main difference between a pesticide and a herbicide?', [
      { label: 'A', value: 'There is no difference; the terms are interchangeable', isCorrect: false },
      { label: 'B', value: 'A pesticide controls pests in general; a herbicide specifically targets and kills weeds', isCorrect: true },
      { label: 'C', value: 'A herbicide controls insects; a pesticide controls fungi', isCorrect: false },
      { label: 'D', value: 'A pesticide is organic; a herbicide is synthetic', isCorrect: false },
    ], 'A pesticide is a broad term for any substance used to control pests, including insects (insecticides), fungi (fungicides), and weeds (herbicides). A herbicide specifically targets unwanted plants (weeds) that compete with crops for resources.', MEDIUM, 'Pest Management'),
    mcq('In an Integrated Pest Management (IPM) programme, what does the concept of "economic threshold level" (ETL) refer to?', [
      { label: 'A', value: 'The maximum amount of pesticide that can be legally applied per acre', isCorrect: false },
      { label: 'B', value: 'The pest population density at which control measures should be applied to prevent economic loss', isCorrect: true },
      { label: 'C', value: 'The minimum profit a farmer must earn from a crop', isCorrect: false },
      { label: 'D', value: 'The temperature at which pests become inactive', isCorrect: false },
    ], 'The Economic Threshold Level (ETL) is the pest population level at which the cost of crop damage exceeds the cost of implementing control measures. IPM monitors pest populations and only intervenes when the ETL is reached, reducing unnecessary pesticide use.', HARD, 'Pest Management'),

    // Agricultural Economics (3)
    mcq('What is meant by the term "subsistence farming"?', [
      { label: 'A', value: 'Farming that produces crops solely for sale in international markets', isCorrect: false },
      { label: 'B', value: 'Farming where the produce is primarily used to feed the farmer and family, with little surplus for sale', isCorrect: true },
      { label: 'C', value: 'Large-scale commercial farming using heavy machinery', isCorrect: false },
      { label: 'D', value: 'Farming that uses only organic methods', isCorrect: false },
    ], 'Subsistence farming involves growing food and raising livestock mainly to meet the needs of the farmer\'s family. Very little or no surplus is produced for sale. It is common in rural Caribbean communities and developing nations.', EASY, 'Agricultural Economics'),
    mcq('What does the term "value-added" mean in agricultural marketing?', [
      { label: 'A', value: 'Adding more chemical fertiliser to increase yields', isCorrect: false },
      { label: 'B', value: 'Processing or transforming a raw agricultural product into a more marketable form to increase its selling price', isCorrect: true },
      { label: 'C', value: 'Increasing the quantity of water used in irrigation', isCorrect: false },
      { label: 'D', value: 'Expanding the area of land under cultivation', isCorrect: false },
    ], 'Value-added agriculture involves processing raw products into finished or semi-finished goods (e.g., turning raw sugar cane into packaged sugar, or fruits into jam). This increases shelf life, marketability, and the farmer\'s share of the final price.', MEDIUM, 'Agricultural Economics'),
    mcq('A Caribbean farmer sells 2,000 kg of sweet potatoes at $4.50 per kg. Total variable costs are $5,400 and fixed costs are $1,800. What is the farmer\'s net profit?', [
      { label: 'A', value: '$2,700', isCorrect: false },
      { label: 'B', value: '$1,800', isCorrect: true },
      { label: 'C', value: '$3,600', isCorrect: false },
      { label: 'D', value: '$5,400', isCorrect: false },
    ], 'Total Revenue = 2,000 × $4.50 = $9,000. Total Costs = Variable ($5,400) + Fixed ($1,800) = $7,200. Net Profit = $9,000 − $7,200 = $1,800. Profitability analysis helps farmers determine whether production is financially viable.', HARD, 'Agricultural Economics'),
  ],

  // ═══════════════════════════════════════════════════════════════
  // 2. FOOD & NUTRITION (CSEC-FN) — 15 Questions
  // ═══════════════════════════════════════════════════════════════
  'CSEC-FN': [
    // Nutrition & Health (3)
    mcq('Which of the following is a macronutrient?', [
      { label: 'A', value: 'Vitamin C', isCorrect: false },
      { label: 'B', value: 'Iron', isCorrect: false },
      { label: 'C', value: 'Protein', isCorrect: true },
      { label: 'D', value: 'Calcium', isCorrect: false },
    ], 'Macronutrients are nutrients required in large amounts: carbohydrates, proteins, and fats. Micronutrients (vitamins and minerals) are needed in smaller quantities. Protein is essential for building and repairing tissues.', EASY, 'Nutrition & Health'),
    mcq('What is the function of calcium in the human body?', [
      { label: 'A', value: 'To produce red blood cells', isCorrect: false },
      { label: 'B', value: 'To build and maintain strong bones and teeth, and assist with muscle contraction and nerve function', isCorrect: true },
      { label: 'C', value: 'To regulate blood sugar levels', isCorrect: false },
      { label: 'D', value: 'To prevent scurvy', isCorrect: false },
    ], 'Calcium is the most abundant mineral in the body. About 99% is stored in bones and teeth. It is also critical for muscle contraction, blood clotting, nerve signalling, and enzyme activation. Rich sources include dairy products, dark leafy greens, and canned fish with bones.', MEDIUM, 'Nutrition & Health'),
    mcq('A teenager requires approximately 2,200 kcal per day. If breakfast provides 550 kcal, lunch provides 660 kcal, and dinner provides 770 kcal, how many calories remain for snacks to meet the daily requirement?', [
      { label: 'A', value: '100 kcal', isCorrect: false },
      { label: 'B', value: '120 kcal', isCorrect: false },
      { label: 'C', value: '220 kcal', isCorrect: true },
      { label: 'D', value: '330 kcal', isCorrect: false },
    ], 'Total from meals = 550 + 660 + 770 = 1,980 kcal. Remaining for snacks = 2,200 − 1,980 = 220 kcal. This demonstrates calorie distribution across meals and the role of snacks in meeting daily energy needs.', HARD, 'Nutrition & Health'),

    // Food Preparation (3)
    mcq('Which of the following is a dry cooking method?', [
      { label: 'A', value: 'Boiling', isCorrect: false },
      { label: 'B', value: 'Steaming', isCorrect: false },
      { label: 'C', value: 'Roasting', isCorrect: true },
      { label: 'D', value: 'Poaching', isCorrect: false },
    ], 'Dry cooking methods use hot air or fat without adding water. Examples include roasting, baking, grilling, and frying. Moist cooking methods (boiling, steaming, poaching) use water, stock, or steam as the heat transfer medium.', EASY, 'Food Preparation'),
    mcq('What is the purpose of coating food in breadcrumbs before frying?', [
      { label: 'A', value: 'To increase the vitamin content of the food', isCorrect: false },
      { label: 'B', value: 'To create a crispy outer texture and protect the food from absorbing too much oil', isCorrect: true },
      { label: 'C', value: 'To reduce the cooking time by half', isCorrect: false },
      { label: 'D', value: 'To make the food easier to digest', isCorrect: false },
    ], 'Breading (coating in flour, egg wash, and breadcrumbs) creates a protective barrier that crisps during frying, preventing the food inside from becoming greasy. It also adds texture and helps retain moisture in the food.', MEDIUM, 'Food Preparation'),
    mcq('When preparing a white sauce (béchamel), what happens if the roux is cooked for too long at a high temperature before adding the milk?', [
      { label: 'A', value: 'The sauce will be thinner and lighter in colour', isCorrect: false },
      { label: 'B', value: 'The flour will brown and the sauce will develop a darker colour and a nutty flavour', isCorrect: true },
      { label: 'C', value: 'The butter will separate and the sauce will curdle', isCorrect: false },
      { label: 'D', value: 'Nothing will change; cooking time has no effect on roux', isCorrect: false },
    ], 'A roux is a mixture of equal parts fat and flour. Cooking it longer at higher heat causes the flour to brown through caramelisation, progressing from white to blonde to brown roux. Each stage produces a different flavour intensity and thickening power.', HARD, 'Food Preparation'),

    // Meal Planning (3)
    mcq('What is the Caribbean Food Group that includes rice, bread, and yams?', [
      { label: 'A', value: 'Foods from Animals', isCorrect: false },
      { label: 'B', value: 'Staple Foods (Energy-Giving Foods)', isCorrect: true },
      { label: 'C', value: 'Fruits and Vegetables', isCorrect: false },
      { label: 'D', value: 'Fats and Oils', isCorrect: false },
    ], 'Staple foods (carbohydrates) form the foundation of the Caribbean diet and provide the body\'s main energy source. Examples include rice, bread, yams, cassava, sweet potatoes, dasheen, and green bananas. They should comprise the largest portion of daily intake.', EASY, 'Meal Planning'),
    mcq('Why is it important to include a variety of colours on the plate when planning meals?', [
      { label: 'A', value: 'Colourful food always tastes better', isCorrect: false },
      { label: 'B', value: 'Different coloured foods provide different vitamins, minerals, and phytonutrients for balanced nutrition', isCorrect: true },
      { label: 'C', value: 'It makes the meal more expensive and therefore more nutritious', isCorrect: false },
      { label: 'D', value: 'It is only important for presentation at formal dinners', isCorrect: false },
    ], 'Eating a rainbow of coloured fruits and vegetables ensures a wide range of nutrients. Red foods (tomatoes) provide lycopene; orange foods (carrots) supply beta-carotene; green vegetables (spinach) offer iron and folate; purple foods (eggplant) contain anthocyanins.', MEDIUM, 'Meal Planning'),
    mcq('A family of four has a weekly food budget of $400 (EC). Using the 50-30-20 guideline for meal planning (50% staples, 30% proteins, 20% fruits/vegetables), how much should be allocated to protein sources per week?', [
      { label: 'A', value: '$80', isCorrect: false },
      { label: 'B', value: '$100', isCorrect: false },
      { label: 'C', value: '$120', isCorrect: true },
      { label: 'D', value: '$200', isCorrect: false },
    ], 'Protein allocation = $400 × 0.30 = $120 per week. This budgeting approach helps families plan balanced meals within their financial means. Staples receive $200, fruits and vegetables receive $80.', HARD, 'Meal Planning'),

    // Food Preservation (3)
    mcq('Which of the following is an example of a chemical method of food preservation?', [
      { label: 'A', value: 'Freezing', isCorrect: false },
      { label: 'B', value: 'Pickling in vinegar', isCorrect: true },
      { label: 'C', value: 'Canning', isCorrect: false },
      { label: 'D', value: 'Refrigeration', isCorrect: false },
    ], 'Pickling uses vinegar (acetic acid) to create an acidic environment that inhibits the growth of spoilage bacteria. Other chemical preservation methods include salting, curing with nitrates, smoking, and using sugar (as in jams and preserves).', EASY, 'Food Preservation'),
    mcq('How does freezing preserve food?', [
      { label: 'A', value: 'It destroys all microorganisms completely', isCorrect: false },
      { label: 'B', value: 'It stops or significantly slows down microbial growth and enzymatic activity by lowering the temperature', isCorrect: true },
      { label: 'C', value: 'It removes all moisture from the food', isCorrect: false },
      { label: 'D', value: 'It cooks the food at the same time', isCorrect: false },
    ], 'Freezing preserves food by lowering the temperature to below 0°C, which drastically slows or halts the growth of bacteria, yeasts, and moulds. Enzyme activity is also reduced but not completely stopped, which is why blanching vegetables before freezing is recommended.', MEDIUM, 'Food Preservation'),
    mcq('What is the principle behind using sugar as a preservative in jam-making?', [
      { label: 'A', value: 'Sugar adds flavour only and has no preservative effect', isCorrect: false },
      { label: 'B', value: 'Sugar lowers the water activity (aw), creating a hypertonic environment that dehydrates microorganisms and prevents their growth', isCorrect: true },
      { label: 'C', value: 'Sugar raises the pH to alkaline levels that kill bacteria', isCorrect: false },
      { label: 'D', value: 'Sugar reacts with pectin to form an antibiotic compound', isCorrect: false },
    ], 'At high concentrations (typically 65%+ sugar), the available water in the product is reduced to a level where microorganisms cannot multiply. This process of reducing water activity (aw) through osmotic pressure is the key preservation principle in jams, jellies, and syrups.', HARD, 'Food Preservation'),

    // Kitchen Safety & Hygiene (3)
    mcq('Which type of fire extinguisher should NEVER be used on an electrical fire?', [
      { label: 'A', value: 'CO₂ extinguisher', isCorrect: false },
      { label: 'B', value: 'Dry powder extinguisher', isCorrect: false },
      { label: 'C', value: 'Water-based extinguisher', isCorrect: true },
      { label: 'D', value: 'Foam extinguisher', isCorrect: false },
    ], 'Water conducts electricity and can cause electrocution when used on electrical fires. CO₂ or dry powder extinguishers should be used instead. Always disconnect the power supply first if it is safe to do so.', EASY, 'Kitchen Safety & Hygiene'),
    mcq('What is the recommended minimum internal cooking temperature for poultry to ensure it is safe to eat?', [
      { label: 'A', value: '63°C (145°F)', isCorrect: false },
      { label: 'B', value: '71°C (160°F)', isCorrect: false },
      { label: 'C', value: '74°C (165°F)', isCorrect: true },
      { label: 'D', value: '100°C (212°F)', isCorrect: false },
    ], 'Poultry must reach an internal temperature of at least 74°C (165°F) to ensure harmful bacteria such as Salmonella and Campylobacter are destroyed. A food thermometer should be inserted into the thickest part of the meat to verify the temperature.', MEDIUM, 'Kitchen Safety & Hygiene'),
    mcq('In a commercial kitchen, what is the correct procedure for thawing frozen meat safely?', [
      { label: 'A', value: 'Leave it on the kitchen counter at room temperature overnight', isCorrect: false },
      { label: 'B', value: 'Thaw it in the refrigerator, under cold running water, or in the microwave as part of the cooking process', isCorrect: true },
      { label: 'C', value: 'Thaw it by placing it in direct sunlight for several hours', isCorrect: false },
      { label: 'D', value: 'Thaw it by placing it in a warm oven at 50°C', isCorrect: false },
    ], 'The three safe thawing methods are: (1) in the refrigerator (slowest but safest), (2) under cold running water (faster, water must be 4°C or below), and (3) in the microwave (only if cooking immediately after). Thawing at room temperature allows bacterial multiplication in the outer layers while the centre remains frozen.', HARD, 'Kitchen Safety & Hygiene'),
  ],

  // ═══════════════════════════════════════════════════════════════
  // 3. PHYSICAL EDUCATION & SPORT (CSEC-PES) — 15 Questions
  // ═══════════════════════════════════════════════════════════════
  'CSEC-PES': [
    // Anatomy & Physiology (3)
    mcq('How many bones are in the adult human body?', [
      { label: 'A', value: '196', isCorrect: false },
      { label: 'B', value: '206', isCorrect: true },
      { label: 'C', value: '216', isCorrect: false },
      { label: 'D', value: '306', isCorrect: false },
    ], 'The adult human skeleton consists of 206 bones. Infants are born with approximately 270 bones, but many fuse together as the body develops. The skeletal system provides structure, protects organs, enables movement, and stores minerals.', EASY, 'Anatomy & Physiology'),
    mcq('What is the function of the synovial fluid in a joint?', [
      { label: 'A', value: 'To provide blood supply to the joint', isCorrect: false },
      { label: 'B', value: 'To lubricate the joint and reduce friction between the articulating bones during movement', isCorrect: true },
      { label: 'C', value: 'To connect muscles to bones', isCorrect: false },
      { label: 'D', value: 'To produce red blood cells', isCorrect: false },
    ], 'Synovial fluid is a thick, egg-white-like liquid secreted by the synovial membrane inside synovial joints (e.g., knee, shoulder). It lubricates the joint, nourishes the articular cartilage, and acts as a shock absorber during physical activity.', MEDIUM, 'Anatomy & Physiology'),
    mcq('During strenuous exercise, which energy system dominates during the first 10 seconds of maximal effort (e.g., a 100m sprint)?', [
      { label: 'A', value: 'Aerobic system (oxidative phosphorylation)', isCorrect: false },
      { label: 'B', value: 'Anaerobic glycolytic system (lactic acid system)', isCorrect: false },
      { label: 'C', value: 'ATP-PCr system (phosphagen or alactic system)', isCorrect: true },
      { label: 'D', value: 'The digestive system', isCorrect: false },
    ], 'The ATP-PCr (adenosine triphosphate-phosphocreatine) system provides immediate energy for short, explosive efforts (0–10 seconds) without oxygen or lactate production. It uses stored ATP and PCr in the muscles, ideal for sprinting, jumping, and weightlifting.', HARD, 'Anatomy & Physiology'),

    // Fitness & Training (3)
    mcq('Which of the following is a component of health-related physical fitness?', [
      { label: 'A', value: 'Agility', isCorrect: false },
      { label: 'B', value: 'Cardiorespiratory endurance', isCorrect: true },
      { label: 'C', value: 'Reaction time', isCorrect: false },
      { label: 'D', value: 'Coordination', isCorrect: false },
    ], 'Health-related fitness has five components: cardiorespiratory endurance, muscular strength, muscular endurance, flexibility, and body composition. Agility, reaction time, coordination, balance, power, and speed are skill-related components.', EASY, 'Fitness & Training'),
    mcq('What is the difference between muscular strength and muscular endurance?', [
      { label: 'A', value: 'They are the same thing', isCorrect: false },
      { label: 'B', value: 'Strength is the ability of a muscle to exert maximum force once; endurance is the ability to sustain repeated contractions over time', isCorrect: true },
      { label: 'C', value: 'Strength refers to flexibility; endurance refers to speed', isCorrect: false },
      { label: 'D', value: 'Strength is only important for weightlifters; endurance only for runners', isCorrect: false },
    ], 'Muscular strength is the maximum force a muscle or muscle group can produce in a single effort (measured by 1RM — one-rep maximum). Muscular endurance is the ability to perform repeated muscle contractions against resistance for an extended period without fatigue.', MEDIUM, 'Fitness & Training'),
    mcq('An athlete with a resting heart rate of 60 bpm wants to train at 75% intensity using the Karvonen formula. If their maximum heart rate is 200 bpm, what is their target heart rate?', [
      { label: 'A', value: '135 bpm', isCorrect: false },
      { label: 'B', value: '150 bpm', isCorrect: false },
      { label: 'C', value: '165 bpm', isCorrect: true },
      { label: 'D', value: '180 bpm', isCorrect: false },
    ], 'Karvonen formula: Target HR = ((HRmax − HRrest) × %Intensity) + HRrest. HRR = 200 − 60 = 140. Target = (140 × 0.75) + 60 = 105 + 60 = 165 bpm. The Karvonen method is more accurate than the percentage-of-max method because it accounts for resting heart rate.', HARD, 'Fitness & Training'),

    // Sports Skills (3)
    mcq('In track and field, what does the term "stride length" refer to?', [
      { label: 'A', value: 'The number of steps taken per minute', isCorrect: false },
      { label: 'B', value: 'The distance covered in a single running step from one footfall to the next', isCorrect: true },
      { label: 'C', value: 'The length of the running track', isCorrect: false },
      { label: 'D', value: 'The height of the runner\'s knee lift', isCorrect: false },
    ], 'Stride length is the distance between successive ground contacts of the same foot. Running speed = stride length × stride frequency (cadence). Athletes can improve speed by increasing stride length, stride frequency, or both through appropriate training.', EASY, 'Sports Skills'),
    mcq('In basketball, what is a "travelling" violation?', [
      { label: 'A', value: 'When a player scores a three-point shot', isCorrect: false },
      { label: 'B', value: 'When a player moves their feet without dribbling the ball', isCorrect: true },
      { label: 'C', value: 'When a player passes the ball to a teammate', isCorrect: false },
      { label: 'D', value: 'When a player defends the basket successfully', isCorrect: false },
    ], 'Travelling (or walking) occurs when a player holding the ball takes more than two steps without dribbling. The penalty is a turnover, and possession is awarded to the opposing team. Pivot moves are allowed as long as one foot remains planted.', MEDIUM, 'Sports Skills'),
    mcq('In cricket, what is the "follow-on" rule?', [
      { label: 'A', value: 'When the batting team decides to bat again immediately', isCorrect: false },
      { label: 'B', value: 'When the team batting first has a lead of at least 200 runs (in a 5-day match) and can ask the opposing team to bat their second innings immediately', isCorrect: true },
      { label: 'C', value: 'When a bowler delivers two consecutive no-balls', isCorrect: false },
      { label: 'D', value: 'When the fielding team catches the ball without it bouncing', isCorrect: false },
    ], 'The follow-on rule in first-class cricket allows the team batting first to enforce the follow-on if their lead is at least 200 runs (5-day match) or 150 runs (3-4 day match). This forces the opposition to bat their second innings immediately, saving time and increasing chances of victory.', HARD, 'Sports Skills'),

    // Sports Psychology (3)
    mcq('What is "self-efficacy" in sports psychology?', [
      { label: 'A', value: 'An athlete\'s belief in their own ability to succeed in a specific task or situation', isCorrect: true },
      { label: 'B', value: 'The ability to work well in a team', isCorrect: false },
      { label: 'C', value: 'The physical strength of an athlete', isCorrect: false },
      { label: 'D', value: 'The speed of an athlete\'s reaction time', isCorrect: false },
    ], 'Self-efficacy, a concept developed by Albert Bandura, refers to an individual\'s belief in their capability to execute behaviours necessary to produce specific performance outcomes. High self-efficacy is strongly linked to improved performance, greater effort, and persistence.', EASY, 'Sports Psychology'),
    mcq('What is the difference between state anxiety and trait anxiety in sports?', [
      { label: 'A', value: 'State anxiety is permanent; trait anxiety is temporary', isCorrect: false },
      { label: 'B', value: 'State anxiety is a temporary, situational emotional response; trait anxiety is a personality disposition to perceive situations as threatening', isCorrect: true },
      { label: 'C', value: 'They are identical concepts with different names', isCorrect: false },
      { label: 'D', value: 'Trait anxiety only affects coaches, not athletes', isCorrect: false },
    ], 'State anxiety is the momentary feeling of apprehension before or during competition (e.g., pre-match nerves). Trait anxiety is a stable personality characteristic — individuals with high trait anxiety tend to perceive more situations as threatening across different contexts.', MEDIUM, 'Sports Psychology'),
    mcq('An athlete consistently performs well in practice but poorly in competition. Which psychological strategy would be MOST appropriate to address this?', [
      { label: 'A', value: 'Increase physical training volume', isCorrect: false },
      { label: 'B', value: 'Implement mental imagery (visualisation) and pre-performance routines to build confidence and manage competition anxiety', isCorrect: true },
      { label: 'C', value: 'Change to a completely different sport', isCorrect: false },
      { label: 'D', value: 'Reduce the number of competitions entered', isCorrect: false },
    ], 'The practice-competition gap is often caused by anxiety, pressure, or lack of mental preparation. Mental imagery helps athletes rehearse successful performances mentally, while pre-performance routines create consistent, focused states before competition. Both are evidence-based sport psychology techniques.', HARD, 'Sports Psychology'),

    // Health & Wellness (3)
    mcq('Which of the following is a benefit of regular physical activity?', [
      { label: 'A', value: 'Increased risk of heart disease', isCorrect: false },
      { label: 'B', value: 'Improved cardiovascular health, stronger muscles, and better mental well-being', isCorrect: true },
      { label: 'C', value: 'Weaker immune system', isCorrect: false },
      { label: 'D', value: 'Reduced bone density', isCorrect: false },
    ], 'Regular physical activity strengthens the heart, improves circulation, builds muscle and bone density, helps maintain a healthy weight, reduces stress and anxiety, improves sleep quality, and lowers the risk of chronic diseases such as diabetes and hypertension.', EASY, 'Health & Wellness'),
    mcq('What is the RICE method used for in sports injury management?', [
      { label: 'A', value: 'A nutrition plan for athletes', isCorrect: false },
      { label: 'B', value: 'A first aid protocol: Rest, Ice, Compression, Elevation for acute soft tissue injuries', isCorrect: true },
      { label: 'C', value: 'A warm-up routine before exercise', isCorrect: false },
      { label: 'D', value: 'A method for calculating body mass index', isCorrect: false },
    ], 'RICE is the standard first-aid protocol for acute soft tissue injuries such as sprains and strains. Rest prevents further damage, Ice reduces swelling and pain, Compression limits swelling with a bandage, and Elevation reduces blood flow to the injured area.', MEDIUM, 'Health & Wellness'),
    mcq('What is body mass index (BMI) and what are its limitations as a health indicator?', [
      { label: 'A', value: 'BMI measures body fat percentage accurately and has no limitations', isCorrect: false },
      { label: 'B', value: 'BMI is a ratio of weight to height squared; it does not distinguish between muscle mass, bone density, and fat mass', isCorrect: true },
      { label: 'C', value: 'BMI only measures height and is not related to health', isCorrect: false },
      { label: 'D', value: 'BMI is only used for children under 12', isCorrect: false },
    ], 'BMI = weight (kg) ÷ height (m)². While useful for population-level screening, BMI has limitations: it cannot distinguish between fat and lean muscle mass (athletes may be classified as overweight), does not account for fat distribution, or differences across ethnicities and age groups.', HARD, 'Health & Wellness'),
  ],

  // ═══════════════════════════════════════════════════════════════
  // 4. TECHNICAL DRAWING (CSEC-TD) — 15 Questions
  // ═══════════════════════════════════════════════════════════════
  'CSEC-TD': [
    // Geometric Constructions (3)
    mcq('Which drawing instrument is used to draw horizontal lines on a drawing board?', [
      { label: 'A', value: 'Compass', isCorrect: false },
      { label: 'B', value: 'T-square', isCorrect: true },
      { label: 'C', value: 'Protractor', isCorrect: false },
      { label: 'D', value: 'French curves', isCorrect: false },
    ], 'The T-square has a long blade and a head that slides along the left edge of the drawing board. When the head is pressed against the board edge, the blade provides a reliable guide for drawing accurate horizontal lines.', EASY, 'Geometric Constructions'),
    mcq('How do you bisect a given line segment using only a compass and straightedge?', [
      { label: 'A', value: 'Measure the line with a ruler and mark the midpoint', isCorrect: false },
      { label: 'B', value: 'Draw arcs from both endpoints with the same radius greater than half the line, then connect the intersection points', isCorrect: true },
      { label: 'C', value: 'Fold the paper in half', isCorrect: false },
      { label: 'D', value: 'Draw a diagonal line across it', isCorrect: false },
    ], 'To bisect a line segment AB: place the compass at A and draw an arc above and below the line, then repeat from B with the same radius. Connect the two arc intersection points with a straight line — this perpendicular bisector cuts AB at its exact midpoint.', MEDIUM, 'Geometric Constructions'),
    mcq('How do you construct a tangent line to a circle from an external point P?', [
      { label: 'A', value: 'Draw a line from P to the nearest point on the circle', isCorrect: false },
      { label: 'B', value: 'Draw a line from P to any random point on the circumference', isCorrect: false },
      { label: 'C', value: 'Construct the midpoint of OP, draw a circle centred on it with radius half OP, then connect P to the intersection points with the original circle', isCorrect: true },
      { label: 'D', value: 'Use a protractor to measure 90° from the radius', isCorrect: false },
    ], 'To construct tangents from external point P to a circle with centre O: find the midpoint M of OP. Draw a circle centred at M with radius MO. Where this circle intersects the original circle gives the tangent points T₁ and T₂. PT₁ and PT₂ are the required tangents.', HARD, 'Geometric Constructions'),

    // Orthographic Projection (3)
    mcq('How many principal views are typically shown in an orthographic projection?', [
      { label: 'A', value: 'Two', isCorrect: false },
      { label: 'B', value: 'Three', isCorrect: true },
      { label: 'C', value: 'Four', isCorrect: false },
      { label: 'D', value: 'Six', isCorrect: false },
    ], 'Orthographic projection typically shows three principal views: the front view (elevation), the top view (plan), and the end/side view. Together, these views provide complete dimensional and shape information about the object.', EASY, 'Orthographic Projection'),
    mcq('In third-angle orthographic projection, where is the top view placed relative to the front view?', [
      { label: 'A', value: 'Below the front view', isCorrect: false },
      { label: 'B', value: 'Above the front view', isCorrect: true },
      { label: 'C', value: 'To the left of the front view', isCorrect: false },
      { label: 'D', value: 'To the right of the front view', isCorrect: false },
    ], 'In third-angle projection, the top view is placed above the front view. The third-angle symbol is a cone with its apex pointing towards the front view. In first-angle projection (used in Europe), the top view is placed below the front view.', MEDIUM, 'Orthographic Projection'),
    mcq('A hidden detail in an orthographic projection is represented by which type of line?', [
      { label: 'A', value: 'Continuous thick line', isCorrect: false },
      { label: 'B', value: 'Dashed (short dashes) line', isCorrect: true },
      { label: 'C', value: 'Chain (dot-dash) line', isCorrect: false },
      { label: 'D', value: 'Continuous thin line', isCorrect: false },
    ], 'Hidden edges and details are shown using short dashes. Visible outlines use continuous thick lines, centre lines use chain lines (long dash-short dash), and projection lines use continuous thin lines. Each line type has a specific meaning according to international drawing standards.', HARD, 'Orthographic Projection'),

    // Isometric Drawing (3)
    mcq('What angle do the isometric axes make with each other in an isometric drawing?', [
      { label: 'A', value: '60° between each pair of axes', isCorrect: false },
      { label: 'B', value: '120° between each pair of axes', isCorrect: true },
      { label: 'C', value: '90° between each pair of axes', isCorrect: false },
      { label: 'D', value: '45° between each pair of axes', isCorrect: false },
    ], 'In isometric drawing, three axes meet at a single point, each separated by 120°. The vertical axis is drawn straight up, and the two horizontal axes are drawn at 30° to the horizontal on either side. This creates the characteristic isometric grid.', EASY, 'Isometric Drawing'),
    mcq('In isometric drawing, lines parallel to the isometric axes are drawn to what type of scale?', [
      { label: 'A', value: 'Half scale', isCorrect: false },
      { label: 'B', value: 'Full scale (true measurements along isometric axes)', isCorrect: true },
      { label: 'C', value: 'Double scale', isCorrect: false },
      { label: 'D', value: 'No scale is used in isometric drawing', isCorrect: false },
    ], 'In isometric drawing, all measurements along the isometric axes are drawn to true scale. This is a key advantage — the full dimensions can be transferred directly from the orthographic views. However, lines NOT parallel to the isometric axes are NOT drawn to scale.', MEDIUM, 'Isometric Drawing'),
    mcq('How do you draw a circle in isometric projection?', [
      { label: 'A', value: 'Draw a perfect circle using a compass', isCorrect: false },
      { label: 'B', value: 'Draw an ellipse (isometric circle) using four-centre approximation or ellipse templates', isCorrect: true },
      { label: 'C', value: 'Draw a square and call it a circle', isCorrect: false },
      { label: 'D', value: 'Circles cannot be drawn in isometric projection', isCorrect: false },
    ], 'Circles appear as ellipses in isometric views. The four-centre method constructs an approximate ellipse by drawing arcs from four centres derived from the isometric square enclosing the circle. Alternatively, isometric ellipse templates are available for standard sizes.', HARD, 'Isometric Drawing'),

    // Sectional Views (3)
    mcq('What is the purpose of a sectional view in technical drawing?', [
      { label: 'A', value: 'To show the exterior appearance of an object', isCorrect: false },
      { label: 'B', value: 'To reveal the internal features and construction of an object by imagining it cut along a cutting plane', isCorrect: true },
      { label: 'C', value: 'To make the drawing look more attractive', isCorrect: false },
      { label: 'D', value: 'To show the object from multiple angles simultaneously', isCorrect: false },
    ], 'A sectional view shows internal features that would be hidden in a normal orthographic view. The cutting plane is imagined to slice through the object, and the cut surface is indicated with section lines (hatching). This is essential for showing hollow interiors, thicknesses, and internal details.', EASY, 'Sectional Views'),
    mcq('What is the symbol for section lines (hatching) on a cut surface in a sectional view?', [
      { label: 'A', value: 'Solid filled area', isCorrect: false },
      { label: 'B', value: 'Evenly spaced thin parallel lines drawn at 45° to the outline', isCorrect: true },
      { label: 'C', value: 'Cross-shaped pattern', isCorrect: false },
      { label: 'D', value: 'Dotted pattern', isCorrect: false },
    ], 'Section lines (hatching) are thin, evenly spaced parallel lines typically drawn at 45° to the principal outlines. They indicate the solid material that has been "cut through" by the imaginary cutting plane. Spacing is usually between 2mm and 5mm apart.', MEDIUM, 'Sectional Views'),
    mcq('What is a half-section and when is it used?', [
      { label: 'A', value: 'A section that shows only half of a symmetrical object, displaying both the exterior on one side and the interior on the other', isCorrect: true },
      { label: 'B', value: 'A section cut through the middle of the drawing paper', isCorrect: false },
      { label: 'C', value: 'A section that is half the normal size', isCorrect: false },
      { label: 'D', value: 'A section showing two different cutting planes', isCorrect: false },
    ], 'A half-section is used for symmetrical objects where one quarter is removed. The centre line acts as the dividing line between the external view (left half) and the sectional view (right half). This combines external and internal detail in a single view, saving space and improving clarity.', HARD, 'Sectional Views'),

    // Building Drawing (3)
    mcq('What does a floor plan show?', [
      { label: 'A', value: 'The exterior elevation of a building', isCorrect: false },
      { label: 'B', value: 'A horizontal cross-section viewed from above showing the layout of rooms, doors, and windows at a specific level', isCorrect: true },
      { label: 'C', value: 'The structural foundation of the building', isCorrect: false },
      { label: 'D', value: 'The electrical wiring diagram', isCorrect: false },
    ], 'A floor plan is a horizontal section cut through the building at approximately 1 metre above floor level, viewed from above. It shows the arrangement of rooms, dimensions, door and window positions, stairs, and fixtures. It is the most important drawing in a set of building plans.', EASY, 'Building Drawing'),
    mcq('What is the standard scale commonly used for residential floor plans in the Caribbean?', [
      { label: 'A', value: '1:1', isCorrect: false },
      { label: 'B', value: '1:50 or 1:100', isCorrect: true },
      { label: 'C', value: '1:500', isCorrect: false },
      { label: 'D', value: '1:1000', isCorrect: false },
    ], 'Residential floor plans in the Caribbean are typically drawn at 1:50 or 1:100 scale. At 1:50, 1mm on the drawing represents 50mm in reality. Site plans use smaller scales (1:200 or 1:500), while detail drawings use larger scales (1:5 or 1:10).', MEDIUM, 'Building Drawing'),
    mcq('On a building drawing, what symbol is used to indicate the location of a window on a floor plan?', [
      { label: 'A', value: 'A solid filled rectangle', isCorrect: false },
      { label: 'B', value: 'Three parallel lines within the wall thickness representing the glass pane and frame', isCorrect: true },
      { label: 'C', value: 'A circle with an X inside it', isCorrect: false },
      { label: 'D', value: 'A single diagonal line across the wall', isCorrect: false },
    ], 'Windows on floor plans are represented by three parallel lines within the wall thickness. The centre line represents the glass pane, and the outer lines represent the window frame. The opening swing or sliding direction may also be indicated. Doors are shown as an arc indicating the swing direction.', HARD, 'Building Drawing'),
  ],

  // ═══════════════════════════════════════════════════════════════
  // 5. OFFICE ADMINISTRATION (CSEC-OA) — 15 Questions
  // ═══════════════════════════════════════════════════════════════
  'CSEC-OA': [
    // Office Environment (3)
    mcq('What is an open-plan office layout?', [
      { label: 'A', value: 'An office with no walls, doors, or windows', isCorrect: false },
      { label: 'B', value: 'An office where employees share a large workspace without internal walls or partitions between desks', isCorrect: true },
      { label: 'C', value: 'An office located outdoors', isCorrect: false },
      { label: 'D', value: 'An office that is only open during specific hours', isCorrect: false },
    ], 'An open-plan office eliminates internal walls and partitions, creating a shared workspace. Advantages include better communication, easier supervision, and lower construction costs. Disadvantages include noise, lack of privacy, and increased distractions.', EASY, 'Office Environment'),
    mcq('What is the purpose of an organisational chart in an office?', [
      { label: 'A', value: 'To display the office floor plan', isCorrect: false },
      { label: 'B', value: 'To show the structure of the organisation, including lines of authority, reporting relationships, and departmental hierarchy', isCorrect: true },
      { label: 'C', value: 'To list the salaries of all employees', isCorrect: false },
      { label: 'D', value: 'To schedule employee work shifts', isCorrect: false },
    ], 'An organisational chart visually represents the chain of command, span of control, and reporting relationships within an organisation. It uses boxes for positions and lines to show authority. Tall structures have narrow spans of control; flat structures have wider spans.', MEDIUM, 'Office Environment'),
    mcq('What is the difference between line authority and staff authority in an organisation?', [
      { label: 'A', value: 'Line authority gives direct command over subordinates; staff authority provides advisory and support services to line managers', isCorrect: true },
      { label: 'B', value: 'Line authority applies to part-time staff; staff authority applies to full-time employees', isCorrect: false },
      { label: 'C', value: 'They are the same concept with different names', isCorrect: false },
      { label: 'D', value: 'Line authority only exists in government offices', isCorrect: false },
    ], 'Line authority flows directly down the chain of command (e.g., manager → supervisor → clerk) and involves the right to give orders. Staff authority is advisory (e.g., HR, legal, IT) — staff personnel advise and support line managers but do not have direct command over their subordinates.', HARD, 'Office Environment'),

    // Communication (3)
    mcq('Which of the following is an example of internal communication in an office?', [
      { label: 'A', value: 'A letter sent to a customer', isCorrect: false },
      { label: 'B', value: 'A memo sent between departments within the same organisation', isCorrect: true },
      { label: 'C', value: 'A press release sent to a newspaper', isCorrect: false },
      { label: 'D', value: 'An advertisement placed in a magazine', isCorrect: false },
    ], 'Internal communication occurs between individuals and departments within the same organisation. Examples include memos, emails, staff meetings, notice boards, and intranet posts. External communication is with parties outside the organisation (customers, suppliers, government agencies).', EASY, 'Communication'),
    mcq('What is the most appropriate communication channel for sending a formal, permanent record of a business decision to a supplier?', [
      { label: 'A', value: 'Telephone call', isCorrect: false },
      { label: 'B', value: 'Social media message', isCorrect: false },
      { label: 'C', value: 'Formal business letter', isCorrect: true },
      { label: 'D', value: 'Verbal conversation in the hallway', isCorrect: false },
    ], 'A formal business letter provides a permanent written record, is legally admissible, conveys professionalism, and can be referenced later. It is the appropriate channel for official correspondence such as contracts, complaints, orders, and formal agreements with external parties.', MEDIUM, 'Communication'),
    mcq('What is "grapevine communication" in an organisation?', [
      { label: 'A', value: 'Official communication sent through the organisational hierarchy', isCorrect: false },
      { label: 'B', value: 'The informal, unofficial network of communication that spreads information through personal relationships and social interactions', isCorrect: true },
      { label: 'C', value: 'Communication conducted exclusively through email', isCorrect: false },
      { label: 'D', value: 'Communication that occurs only during lunch breaks', isCorrect: false },
    ], 'The grapevine is the informal communication network that operates alongside official channels. It spreads information (and rumours) quickly through personal conversations, social interactions, and relationships. While not officially sanctioned, it is inevitable and can be managed but not eliminated.', HARD, 'Communication'),

    // Records Management (3)
    mcq('What is the difference between a filing system and a records management system?', [
      { label: 'A', value: 'There is no difference', isCorrect: false },
      { label: 'B', value: 'Filing is the physical storage of documents; records management covers the entire lifecycle from creation to disposal', isCorrect: true },
      { label: 'C', value: 'Records management is only used in government offices', isCorrect: false },
      { label: 'D', value: 'Filing is done on computers; records management uses paper', isCorrect: false },
    ], 'Records management encompasses the complete lifecycle of a record: creation, classification, storage, retrieval, protection, retention, and disposal. Filing is one component — the systematic arrangement and storage of documents so they can be retrieved quickly when needed.', EASY, 'Records Management'),
    mcq('What is the alphabetical filing system most suitable for?', [
      { label: 'A', value: 'Filing by date', isCorrect: false },
      { label: 'B', value: 'Filing by geographic region', isCorrect: false },
      { label: 'C', value: 'Filing by name (e.g., customer names, employee names)', isCorrect: true },
      { label: 'D', value: 'Filing by numerical code only', isCorrect: false },
    ], 'The alphabetical filing system arranges records in order from A to Z by name (surname first for individuals, name of organisation for companies). It is simple, easy to understand, and widely used. However, it can become cumbersome with very large collections where names may be similar.', MEDIUM, 'Records Management'),
    mcq('What is a retention schedule in records management?', [
      { label: 'A', value: 'A schedule of employee working hours', isCorrect: false },
      { label: 'B', value: 'A document specifying how long different types of records must be kept before they can be legally destroyed or archived', isCorrect: true },
      { label: 'C', value: 'A list of all equipment in the office', isCorrect: false },
      { label: 'D', value: 'A timetable for staff training sessions', isCorrect: false },
    ], 'A retention schedule defines the minimum period that different categories of records must be retained based on legal, regulatory, and operational requirements. For example, financial records may need to be kept for 7 years, while general correspondence may be destroyed after 2 years. After the retention period, records are securely destroyed or archived.', HARD, 'Records Management'),

    // Meetings & Conferences (3)
    mcq('What is an agenda in the context of a meeting?', [
      { label: 'A', value: 'The minutes of the previous meeting', isCorrect: false },
      { label: 'B', value: 'A list of items to be discussed and the order in which they will be addressed during the meeting', isCorrect: true },
      { label: 'C', value: 'A list of all attendees', isCorrect: false },
      { label: 'D', value: 'The budget for the meeting', isCorrect: false },
    ], 'An agenda is a structured list of topics and activities to be covered during a meeting, typically distributed to participants in advance. It usually includes: apologies for absence, minutes of the previous meeting, matters arising, main business items, any other business (AOB), and date of next meeting.', EASY, 'Meetings & Conferences'),
    mcq('What is the role of the secretary during a formal meeting?', [
      { label: 'A', value: 'To chair the meeting and make all decisions', isCorrect: false },
      { label: 'B', value: 'To prepare the agenda beforehand, take minutes during the meeting, and distribute the minutes afterwards', isCorrect: true },
      { label: 'C', value: 'To provide refreshments only', isCorrect: false },
      { label: 'D', value: 'To represent the company in external negotiations', isCorrect: false },
    ], 'The secretary plays a vital administrative role: preparing and circulating the agenda, ensuring notice of the meeting is given, recording attendance, taking accurate minutes during the meeting, and distributing the confirmed minutes to all attendees after the meeting.', MEDIUM, 'Meetings & Conferences'),
    mcq('What is a "motion" in the context of a formal meeting?', [
      { label: 'A', value: 'A physical movement made by the chairperson', isCorrect: false },
      { label: 'B', value: 'A formal proposal put forward for discussion and voting by the meeting members', isCorrect: true },
      { label: 'C', value: 'A suggestion made during informal conversation', isCorrect: false },
      { label: 'D', value: 'A written complaint submitted after the meeting', isCorrect: false },
    ], 'A motion is a formal proposal that, if passed, becomes a resolution (decision) of the meeting. The procedure is: a member proposes the motion ("I move that..."), another member seconds it, discussion follows, then a vote is taken. The chairperson announces the result.', HARD, 'Meetings & Conferences'),

    // Office Equipment (3)
    mcq('Which office equipment is used to make copies of paper documents?', [
      { label: 'A', value: 'Scanner', isCorrect: false },
      { label: 'B', value: 'Photocopier', isCorrect: true },
      { label: 'C', value: 'Projector', isCorrect: false },
      { label: 'D', value: 'Shredder', isCorrect: false },
    ], 'A photocopier produces paper copies of existing documents using a xerographic process. Unlike a scanner (which creates a digital image), a photocopier outputs a physical duplicate on paper. Modern multifunction devices combine printing, scanning, copying, and faxing capabilities.', EASY, 'Office Equipment'),
    mcq('What is the purpose of a paper shredder in an office?', [
      { label: 'A', value: 'To create decorative paper crafts', isCorrect: false },
      { label: 'B', value: 'To destroy confidential documents by cutting them into small pieces to prevent unauthorised access to sensitive information', isCorrect: true },
      { label: 'C', value: 'To recycle waste paper for reuse', isCorrect: false },
      { label: 'D', value: 'To reduce the size of documents for filing', isCorrect: false },
    ], 'A paper shredder cuts documents into strips or cross-cut pieces, rendering them unreadable and preventing identity theft, corporate espionage, or unauthorised disclosure. Confidential documents such as financial records, contracts, and personal data should always be shredded before disposal.', MEDIUM, 'Office Equipment'),
    mcq('What is a PABX system in an office context?', [
      { label: 'A', value: 'A type of internet connection', isCorrect: false },
      { label: 'B', value: 'A Private Automatic Branch Exchange — an internal telephone switching system that manages incoming and outgoing calls within an organisation', isCorrect: true },
      { label: 'C', value: 'A security alarm system', isCorrect: false },
      { label: 'D', value: 'A postal sorting machine', isCorrect: false },
    ], 'A PABX (Private Automatic Branch Exchange) is a telephone system within an organisation that allows internal calls between extensions without going through the public telephone network, and manages external calls through a limited number of external lines. Features include call transfer, voicemail, and call forwarding.', HARD, 'Office Equipment'),
  ],

  // ═══════════════════════════════════════════════════════════════
  // 6. EDPM (CSEC-EDPM) — 15 Questions
  // ═══════════════════════════════════════════════════════════════
  'CSEC-EDPM': [
    // Document Preparation (3)
    mcq('What does the acronym "EDPM" stand for?', [
      { label: 'A', value: 'Electronic Data Processing Machine', isCorrect: false },
      { label: 'B', value: 'Electronic Document Preparation and Management', isCorrect: true },
      { label: 'C', value: 'Educational Digital Project Method', isCorrect: false },
      { label: 'D', value: 'Efficient Document Printing Module', isCorrect: false },
    ], 'EDPM stands for Electronic Document Preparation and Management. This CSEC subject focuses on using computer applications to create, edit, format, manage, and share electronic documents efficiently in a modern office environment.', EASY, 'Document Preparation'),
    mcq('Which of the following is considered good practice when naming files for a project?', [
      { label: 'A', value: 'Using generic names like "Document1" or "Untitled"', isCorrect: false },
      { label: 'B', value: 'Using descriptive names with dates and version numbers, e.g., "Report_v2_2024-01-15"', isCorrect: true },
      { label: 'C', value: 'Using very long sentences as file names', isCorrect: false },
      { label: 'D', value: 'Using special characters like /, \\, *, ? in the file name', isCorrect: false },
    ], 'Good file naming conventions use descriptive names, dates (YYYY-MM-DD format), and version numbers to identify files easily. Special characters (/, \\, :, *, ?, <, >, |) should be avoided as they may cause errors in different operating systems.', MEDIUM, 'Document Preparation'),
    mcq('What file format is best for preserving the formatting and layout of a document when sharing it across different devices and operating systems?', [
      { label: 'A', value: '.TXT (Plain Text)', isCorrect: false },
      { label: 'B', value: '.PDF (Portable Document Format)', isCorrect: true },
      { label: 'C', value: '.CSV (Comma Separated Values)', isCorrect: false },
      { label: 'D', value: '.RTF (Rich Text Format)', isCorrect: false },
    ], 'PDF (Portable Document Format) preserves the exact layout, fonts, images, and formatting of a document regardless of the device, operating system, or software used to view it. It is the standard format for distributing final documents that should not be edited.', HARD, 'Document Preparation'),

    // Word Processing (3)
    mcq('Which keyboard shortcut is used to copy selected text in most word processing applications?', [
      { label: 'A', value: 'Ctrl + X', isCorrect: false },
      { label: 'B', value: 'Ctrl + C', isCorrect: true },
      { label: 'C', value: 'Ctrl + V', isCorrect: false },
      { label: 'D', value: 'Ctrl + Z', isCorrect: false },
    ], 'Ctrl + C copies selected text to the clipboard. Ctrl + X cuts (copies and removes), Ctrl + V pastes from the clipboard, and Ctrl + Z undoes the last action. These shortcuts work across most applications and operating systems (using Cmd on Mac).', EASY, 'Word Processing'),
    mcq('What is the difference between a soft page break and a hard page break?', [
      { label: 'A', value: 'They are the same thing', isCorrect: false },
      { label: 'B', value: 'A soft page break is inserted automatically by the software; a hard page break is manually inserted by the user', isCorrect: true },
      { label: 'C', value: 'A soft break can only be used in tables; a hard break only in paragraphs', isCorrect: false },
      { label: 'D', value: 'A hard break is automatic; a soft break is manual', isCorrect: false },
    ], 'A soft page break is automatically generated by the word processor when text fills the current page. A hard page break (Ctrl + Enter) is manually inserted by the user to force a new page at a specific point, regardless of how much text is on the current page.', MEDIUM, 'Word Processing'),
    mcq('What is the purpose of using styles in a word processing document?', [
      { label: 'A', value: 'To change the background colour of the page', isCorrect: false },
      { label: 'B', value: 'To apply consistent formatting (font, size, colour, spacing) to headings, body text, and other elements throughout the document', isCorrect: true },
      { label: 'C', value: 'To insert images into the document', isCorrect: false },
      { label: 'D', value: 'To check the spelling of the document', isCorrect: false },
    ], 'Styles are pre-defined sets of formatting attributes (font, font size, colour, alignment, spacing) that can be applied consistently across a document. Using styles ensures uniform formatting, makes it easy to change the appearance of all headings or body text at once, and enables automatic Table of Contents generation.', HARD, 'Word Processing'),

    // Spreadsheets (3)
    mcq('In a spreadsheet, what does a cell reference like "C5" refer to?', [
      { label: 'A', value: 'Column C, Row 5', isCorrect: true },
      { label: 'B', value: 'Column 5, Row C', isCorrect: false },
      { label: 'C', value: 'Cell number C times 5', isCorrect: false },
      { label: 'D', value: 'The fifth cell in the spreadsheet', isCorrect: false },
    ], 'In spreadsheet notation, the column letter comes first, followed by the row number. "C5" refers to the cell at the intersection of Column C and Row 5. Cells are the fundamental units of a spreadsheet where data, formulas, and functions are entered.', EASY, 'Spreadsheets'),
    mcq('What function would you use to calculate the average of a range of cells from B2 to B10 in a spreadsheet?', [
      { label: 'A', value: '=SUM(B2:B10)', isCorrect: false },
      { label: 'B', value: '=AVERAGE(B2:B10)', isCorrect: true },
      { label: 'C', value: '=COUNT(B2:B10)', isCorrect: false },
      { label: 'D', value: '=MAX(B2:B10)', isCorrect: false },
    ], 'The AVERAGE function calculates the arithmetic mean of a range of cells. =AVERAGE(B2:B10) adds all values from B2 to B10 and divides by the number of values. SUM adds them, COUNT counts numeric entries, and MAX returns the highest value.', MEDIUM, 'Spreadsheets'),
    mcq('In a spreadsheet formula, what is the result of =IF(C5>=70,"Pass","Fail") if the value in cell C5 is 65?', [
      { label: 'A', value: 'Pass', isCorrect: false },
      { label: 'B', value: 'Fail', isCorrect: true },
      { label: 'C', value: '65', isCorrect: false },
      { label: 'D', value: '#ERROR', isCorrect: false },
    ], 'The IF function evaluates a condition: IF(condition, value_if_true, value_if_false). Since C5=65 and 65 is NOT ≥ 70, the condition is false, so the function returns "Fail". If C5 were 70 or above, it would return "Pass".', HARD, 'Spreadsheets'),

    // Database Management (3)
    mcq('In a database, what is a "record"?', [
      { label: 'A', value: 'A single piece of data, such as a name or phone number', isCorrect: false },
      { label: 'B', value: 'A complete set of related data about a single item, person, or entity', isCorrect: true },
      { label: 'C', value: 'The entire database file', isCorrect: false },
      { label: 'D', value: 'The software used to create the database', isCorrect: false },
    ], 'A record (or row) is a complete set of related fields about one entity. For example, in a student database, one record contains all data for a single student: student ID, name, date of birth, address, and class. A table consists of many such records.', EASY, 'Database Management'),
    mcq('What is the difference between sorting and filtering in a database?', [
      { label: 'A', value: 'They perform the same function', isCorrect: false },
      { label: 'B', value: 'Sorting arranges records in a specific order; filtering displays only records that meet specific criteria', isCorrect: true },
      { label: 'C', value: 'Sorting removes unwanted records; filtering rearranges them', isCorrect: false },
      { label: 'D', value: 'Filtering can only be done on numbers; sorting only on text', isCorrect: false },
    ], 'Sorting rearranges all records in a specified order (alphabetical, numerical, ascending, descending) without removing any. Filtering hides records that do not meet specified criteria, showing only the matching records. Both can be combined for more powerful data analysis.', MEDIUM, 'Database Management'),
    mcq('What is a relational database?', [
      { label: 'A', value: 'A database that stores data in a single flat table', isCorrect: false },
      { label: 'B', value: 'A database that organises data into multiple linked tables using common fields (keys) to establish relationships between them', isCorrect: true },
      { label: 'C', value: 'A database that only stores text files', isCorrect: false },
      { label: 'D', value: 'A database that requires an internet connection to function', isCorrect: false },
    ], 'A relational database organises data into two or more tables linked by common fields. For example, a Customers table and an Orders table can be linked by a CustomerID field. Primary keys uniquely identify records in one table, and foreign keys create links to related tables. This eliminates data redundancy and ensures data integrity.', HARD, 'Database Management'),

    // Presentation Software (3)
    mcq('Which software application is used to create electronic slide presentations?', [
      { label: 'A', value: 'Microsoft Word', isCorrect: false },
      { label: 'B', value: 'Microsoft Excel', isCorrect: false },
      { label: 'C', value: 'Microsoft PowerPoint', isCorrect: true },
      { label: 'D', value: 'Microsoft Access', isCorrect: false },
    ], 'Microsoft PowerPoint is the most widely used presentation software. It allows users to create slides containing text, images, charts, animations, transitions, and multimedia elements for delivering information to an audience in a structured visual format.', EASY, 'Presentation Software'),
    mcq('What is the "Slide Master" feature in presentation software used for?', [
      { label: 'A', value: 'To delete all slides at once', isCorrect: false },
      { label: 'B', value: 'To create a consistent design template that controls the layout, fonts, colours, and positioning of elements across all slides', isCorrect: true },
      { label: 'C', value: 'To add sound effects to individual slides', isCorrect: false },
      { label: 'D', value: 'To print all slides in handout format', isCorrect: false },
    ], 'The Slide Master allows users to design a template that applies consistent formatting to all slides in a presentation. Changes to the Slide Master (background, font style, colour scheme, logo placement, footer) automatically update all slides based on that master, ensuring visual consistency.', MEDIUM, 'Presentation Software'),
    mcq('What is the "6 × 6 rule" in creating effective presentations?', [
      { label: 'A', value: 'Use 6 colours and 6 fonts per slide', isCorrect: false },
      { label: 'B', value: 'No more than 6 words per line and no more than 6 lines per slide to keep text concise and readable', isCorrect: true },
      { label: 'C', value: 'Present for exactly 6 minutes with 6 slides', isCorrect: false },
      { label: 'D', value: 'Use 6 images and 6 bullet points per slide', isCorrect: false },
    ], 'The 6×6 rule is a guideline for creating clean, readable slides: limit each line to approximately 6 words and limit each slide to approximately 6 lines of text. This prevents information overload, keeps the audience focused, and ensures the presentation supports (rather than replaces) the speaker.', HARD, 'Presentation Software'),
  ],

  // ═══════════════════════════════════════════════════════════════
  // 7. MUSIC (CSEC-MUSIC) — 15 Questions
  // ═══════════════════════════════════════════════════════════════
  'CSEC-MUSIC': [
    // Music Theory (3)
    mcq('How many semitones are in one octave?', [
      { label: 'A', value: '7', isCorrect: false },
      { label: 'B', value: '10', isCorrect: false },
      { label: 'C', value: '12', isCorrect: true },
      { label: 'D', value: '14', isCorrect: false },
    ], 'An octave spans 12 semitones (half steps). For example, from C to the next C: C-C#-D-D#-E-F-F#-G-G#-A-A#-B-C. Each adjacent pair of notes (e.g., C to C#, E to F) is one semitone. Whole tones consist of two semitones.', EASY, 'Music Theory'),
    mcq('What is a major triad?', [
      { label: 'A', value: 'A three-note chord consisting of the root, a minor third, and a perfect fifth', isCorrect: false },
      { label: 'B', value: 'A three-note chord consisting of the root, a major third, and a perfect fifth', isCorrect: true },
      { label: 'C', value: 'A two-note chord consisting of a root and a fifth', isCorrect: false },
      { label: 'D', value: 'A four-note chord with an added seventh', isCorrect: false },
    ], 'A major triad is built by stacking a major third (4 semitones) and a minor third (3 semitones) above the root note. For example, C major = C + E + G. The interval from root to fifth is a perfect fifth (7 semitones). It has a bright, happy sound.', MEDIUM, 'Music Theory'),
    mcq('What is the relative minor of C major and how is it determined?', [
      { label: 'A', value: 'C minor — it shares the same root note', isCorrect: false },
      { label: 'B', value: 'A minor — it is built on the 6th degree (submediant) of the C major scale and shares the same key signature (no sharps or flats)', isCorrect: true },
      { label: 'C', value: 'D minor — it shares the same key signature', isCorrect: false },
      { label: 'D', value: 'E minor — it is the dominant of C major', isCorrect: false },
    ], 'The relative minor of any major key is found on the 6th degree (submediant) of its scale. C major and A minor share the same key signature (no sharps or flats). The natural minor scale of A uses the same notes as C major but starts on A: A-B-C-D-E-F-G-A.', HARD, 'Music Theory'),

    // Music Appreciation (3)
    mcq('Which musical period is characterised by the use of harpsichord, contrapuntal texture, and composers such as Bach and Handel?', [
      { label: 'A', value: 'Classical period', isCorrect: false },
      { label: 'B', value: 'Baroque period', isCorrect: true },
      { label: 'C', value: 'Romantic period', isCorrect: false },
      { label: 'D', value: 'Modern period', isCorrect: false },
    ], 'The Baroque period (approximately 1600–1750) is characterised by ornate, elaborate music with contrapuntal texture (multiple independent melodies), use of the harpsichord and organ, basso continuo, and composers like J.S. Bach, Handel, and Vivaldi.', EASY, 'Music Appreciation'),
    mcq('What is the meaning of "tempo" in music?', [
      { label: 'A', value: 'The volume (loudness or softness) of the music', isCorrect: false },
      { label: 'B', value: 'The speed at which a piece of music is played', isCorrect: true },
      { label: 'C', value: 'The key signature of the piece', isCorrect: false },
      { label: 'D', value: 'The number of musicians performing', isCorrect: false },
    ], 'Tempo refers to the speed of the beat in music, measured in beats per minute (BPM). Common tempo markings include: Largo (very slow, 40–60 BPM), Andante (walking pace, 76–108 BPM), Allegro (fast, 120–156 BPM), and Presto (very fast, 156–176 BPM).', MEDIUM, 'Music Appreciation'),
    mcq('What is polyphony in music?', [
      { label: 'A', value: 'Music with a single melody line without accompaniment', isCorrect: false },
      { label: 'B', value: 'Music with two or more independent melodic lines sounding simultaneously', isCorrect: true },
      { label: 'C', value: 'Music played by only one instrument', isCorrect: false },
      { label: 'D', value: 'Music that has no rhythm', isCorrect: false },
    ], 'Polyphony (polyphonic texture) involves multiple independent melodies occurring at the same time, each with its own rhythm and contour. Common in Baroque music (fugues), choral music, and West African drumming. It contrasts with monophony (single melody) and homophony (melody with accompaniment).', HARD, 'Music Appreciation'),

    // Performance (3)
    mcq('Which of the following is an example of a woodwind instrument?', [
      { label: 'A', value: 'Trumpet', isCorrect: false },
      { label: 'B', value: 'Flute', isCorrect: true },
      { label: 'C', value: 'Violin', isCorrect: false },
      { label: 'D', value: 'Tambourine', isCorrect: false },
    ], 'The flute is a woodwind instrument (originally made of wood, now commonly metal) that produces sound when air is blown across the mouthpiece. Other woodwinds include clarinet, oboe, bassoon, and saxophone. Trumpet is brass; violin is string; tambourine is percussion.', EASY, 'Performance'),
    mcq('What is "intonation" in musical performance?', [
      { label: 'A', value: 'The speed at which a piece is performed', isCorrect: false },
      { label: 'B', value: 'The accuracy of pitch — whether notes are played or sung in tune', isCorrect: true },
      { label: 'C', value: 'The volume level of the performance', isCorrect: false },
      { label: 'D', value: 'The type of instrument being played', isCorrect: false },
    ], 'Intonation refers to how accurately a musician produces the correct pitch. Playing or singing "sharp" (too high) or "flat" (too low) is poor intonation. Good intonation is essential for ensemble performance, as even slightly out-of-tune notes create dissonance.', MEDIUM, 'Performance'),
    mcq('In a steelpan (steel drum) ensemble, what is the role of the "ping-pong" or tenor pan?', [
      { label: 'A', value: 'It provides the bass line', isCorrect: false },
      { label: 'B', value: 'It plays the main melody', isCorrect: true },
      { label: 'C', value: 'It keeps the rhythm', isCorrect: false },
      { label: 'D', value: 'It is not part of the steelpan family', isCorrect: false },
    ], 'The tenor pan (also called ping-pong or soprano pan) has the highest pitch in the steelpan family and typically carries the melody. The double tenor plays harmony and counter-melody, the guitar pan plays chords, and the bass pans provide the bass line.', HARD, 'Performance'),

    // Composition & Arrangement (3)
    mcq('What is a "motive" (or motif) in music composition?', [
      { label: 'A', value: 'A complete song or melody', isCorrect: false },
      { label: 'B', value: 'A short, distinctive musical idea or fragment that is repeated and developed throughout a composition', isCorrect: true },
      { label: 'C', value: 'The title of a piece of music', isCorrect: false },
      { label: 'D', value: 'The lyrics of a song', isCorrect: false },
    ], 'A motive is the smallest identifiable musical idea — often just 2 to 6 notes — that serves as a building block for a composition. Famous examples include the four-note opening of Beethoven\'s Fifth Symphony. Motives are developed through repetition, sequence, inversion, retrograde, and fragmentation.', EASY, 'Composition & Arrangement'),
    mcq('What does "transposition" mean in music?', [
      { label: 'A', value: 'Changing the tempo of a piece', isCorrect: false },
      { label: 'B', value: 'Rewriting or performing a piece of music in a different key while maintaining the same intervallic relationships', isCorrect: true },
      { label: 'C', value: 'Changing the instrument playing the piece', isCorrect: false },
      { label: 'D', value: 'Adding harmony to a melody', isCorrect: false },
    ], 'Transposition shifts every note of a composition by the same interval, changing the key without altering the melodic and harmonic structure. For example, transposing a C major melody up a major third would place it in E major. This is useful for accommodating different vocal ranges or instruments.', MEDIUM, 'Composition & Arrangement'),
    mcq('In four-part harmony (SATB), which voice typically carries the melody?', [
      { label: 'A', value: 'Alto', isCorrect: false },
      { label: 'B', value: 'Tenor', isCorrect: false },
      { label: 'C', value: 'Soprano', isCorrect: true },
      { label: 'D', value: 'Bass', isCorrect: false },
    ], 'In traditional four-part SATB (Soprano, Alto, Tenor, Bass) harmony, the soprano voice carries the main melody. The alto, tenor, and bass provide harmonic support. The bass voice determines the root of the chord. The soprano is the highest voice and is most prominent to the listener.', HARD, 'Composition & Arrangement'),

    // Caribbean Music (3)
    mcq('Which Caribbean music genre originated in Trinidad and Tobago and involves percussion instruments made from oil drums?', [
      { label: 'A', value: 'Reggae', isCorrect: false },
      { label: 'B', value: 'Calypso', isCorrect: false },
      { label: 'C', value: 'Steelpan music', isCorrect: true },
      { label: 'D', value: 'Merengue', isCorrect: false },
    ], 'The steelpan (steel drum) was invented in Trinidad and Tobago in the 1930s–1940s. It is the only new acoustic instrument invented in the 20th century and is now the national instrument of Trinidad and Tobago. Steelpan music spans classical, calypso, soca, and jazz genres.', EASY, 'Caribbean Music'),
    mcq('Who is internationally recognised as the "King of Reggae"?', [
      { label: 'A', value: 'Jimmy Cliff', isCorrect: false },
      { label: 'B', value: 'Bob Marley', isCorrect: true },
      { label: 'C', value: 'Peter Tosh', isCorrect: false },
      { label: 'D', value: 'Burning Spear', isCorrect: false },
    ], 'Bob Marley (1945–1981) is the most internationally renowned reggae artist. Born in Jamaica, his music blended reggae with rock and soul, spreading messages of love, peace, social justice, and Rastafari worldwide. Key albums include "Exodus" and "Legend."', MEDIUM, 'Caribbean Music'),
    mcq('What is "soca" music and how does it differ from calypso?', [
      { label: 'A', value: 'Soca is a slow, acoustic genre; calypso is electronic and fast', isCorrect: false },
      { label: 'B', value: 'Soca is a faster, more upbeat offshoot of calypso that incorporates electronic instruments and Indian rhythms, designed for Carnival dancing', isCorrect: true },
      { label: 'C', value: 'Soca and calypso are the same genre', isCorrect: false },
      { label: 'D', value: 'Soca originated in Jamaica; calypso originated in Africa', isCorrect: false },
    ], 'Soca (soul calypso) was developed in Trinidad and Tobago in the 1970s by Lord Shorty, who combined calypso with Indian chutney music and faster tempos. Soca has a driving, danceable beat (typically 115–135 BPM) designed for Carnival. Calypso is slower, more lyrically focused, and traditionally features social commentary.', HARD, 'Caribbean Music'),
  ],

  // ═══════════════════════════════════════════════════════════════
  // 8. VISUAL ARTS (CSEC-VA) — 15 Questions
  // ═══════════════════════════════════════════════════════════════
  'CSEC-VA': [
    // Drawing (3)
    mcq('Which drawing technique uses parallel lines to create the illusion of shading and three-dimensional form?', [
      { label: 'A', value: 'Blending', isCorrect: false },
      { label: 'B', value: 'Hatching', isCorrect: true },
      { label: 'C', value: 'Stippling', isCorrect: false },
      { label: 'D', value: 'Washing', isCorrect: false },
    ], 'Hatching involves drawing closely spaced parallel lines to create tonal values. Closer lines create darker areas; wider spacing creates lighter areas. Cross-hatching adds lines in different directions for even darker values. It is commonly used in pen and ink drawings.', EASY, 'Drawing'),
    mcq('What is a "proportion" in drawing?', [
      { label: 'A', value: 'The colour scheme used in a drawing', isCorrect: false },
      { label: 'B', value: 'The comparative relationship between the sizes of different parts of a subject', isCorrect: true },
      { label: 'C', value: 'The type of paper used', isCorrect: false },
      { label: 'D', value: 'The angle at which the drawing is viewed', isCorrect: false },
    ], 'Proportion refers to the relative sizes of different parts within a subject or drawing. Accurate proportion is essential for realistic drawing — for example, the human body is typically about 7.5 heads tall, and the eyes sit approximately halfway down the head.', MEDIUM, 'Drawing'),
    mcq('What is the purpose of a "viewfinder" in drawing?', [
      { label: 'A', value: 'To magnify small details on the subject', isCorrect: false },
      { label: 'B', value: 'To frame and isolate a specific section of a scene, helping the artist focus on composition and proportions', isCorrect: true },
      { label: 'C', value: 'To erase mistakes cleanly', isCorrect: false },
      { label: 'D', value: 'To sharpen pencils to the correct point', isCorrect: false },
    ], 'A viewfinder is a simple tool (often a card with a rectangular cut-out) that the artist holds up to frame a portion of the scene. It helps select a composition, establish the picture plane, and judge proportions before beginning the drawing. It acts like a camera viewfinder.', HARD, 'Drawing'),

    // Painting (3)
    mcq('Which of the three primary colours of pigment (subtractive colour mixing) are correct?', [
      { label: 'A', value: 'Red, Yellow, Blue', isCorrect: true },
      { label: 'B', value: 'Red, Green, Blue', isCorrect: false },
      { label: 'C', value: 'Cyan, Magenta, Yellow', isCorrect: false },
      { label: 'D', value: 'Orange, Green, Purple', isCorrect: false },
    ], 'The traditional primary colours in painting (subtractive colour mixing) are red, yellow, and blue. These cannot be created by mixing other colours, but they can be mixed to produce secondary colours: orange (red + yellow), green (yellow + blue), and purple (red + blue).', EASY, 'Painting'),
    mcq('What is the difference between watercolour and acrylic paint?', [
      { label: 'A', value: 'They are exactly the same type of paint', isCorrect: false },
      { label: 'B', value: 'Watercolour is transparent and water-soluble; acrylic is water-based but dries to a permanent, opaque, water-resistant finish', isCorrect: true },
      { label: 'C', value: 'Acrylic can only be used on canvas; watercolour only on paper', isCorrect: false },
      { label: 'D', value: 'Watercolour dries faster than acrylic', isCorrect: false },
    ], 'Watercolour uses pigment suspended in a water-soluble vehicle, producing transparent washes where the white of the paper shows through. Acrylic paint uses a polymer emulsion that dries to a tough, flexible, water-resistant film. Acrylic can be applied opaquely or in thin glazes and can be used on various surfaces.', MEDIUM, 'Painting'),
    mcq('What is "impasto" in painting technique?', [
      { label: 'A', value: 'A technique of applying very thin, watery paint washes', isCorrect: false },
      { label: 'B', value: 'A technique where paint is laid on thickly so that brush or palette knife strokes are visible, creating a textured, three-dimensional surface', isCorrect: true },
      { label: 'C', value: 'A method of removing paint from the canvas', isCorrect: false },
      { label: 'D', value: 'A technique for mixing only two colours', isCorrect: false },
    ], 'Impasto involves applying paint in thick, bold strokes or blobs so that the texture of the paint itself becomes a prominent feature of the artwork. Rembrandt and Vincent van Gogh are famous for their use of impasto. It is best achieved with oil or acrylic paint applied with a palette knife or stiff brush.', HARD, 'Painting'),

    // Sculpture & Ceramics (3)
    mcq('What is a "relief sculpture"?', [
      { label: 'A', value: 'A freestanding sculpture that can be viewed from all sides', isCorrect: false },
      { label: 'B', value: 'A sculpture that is carved or moulded to project from a flat background surface', isCorrect: true },
      { label: 'C', value: 'A small-scale model of a larger sculpture', isCorrect: false },
      { label: 'D', value: 'A sculpture made entirely from recycled materials', isCorrect: false },
    ], 'A relief sculpture projects from a flat background plane. In bas-relief (low relief), the projection is slight. In haut-relief (high relief), the figures project significantly. Reliefs are commonly seen on coins, buildings, monuments, and memorial plaques.', EASY, 'Sculpture & Ceramics'),
    mcq('What is "kiln firing" in ceramics?', [
      { label: 'A', value: 'A method of decorating pottery with paint', isCorrect: false },
      { label: 'B', value: 'The process of heating clay or ceramic objects in a kiln at high temperatures to permanently harden them', isCorrect: true },
      { label: 'C', value: 'A technique for shaping clay by hand', isCorrect: false },
      { label: 'D', value: 'A method of transporting finished pottery', isCorrect: false },
    ], 'Kiln firing heats clay objects to temperatures between 800°C and 1,300°C, causing physical and chemical changes: water evaporates, organic matter burns away, and the clay particles fuse (vitrify) to create a hard, permanent, water-resistant material. Glaze firing adds a glassy coating.', MEDIUM, 'Sculpture & Ceramics'),
    mcq('What is the "coil method" in hand-building pottery?', [
      { label: 'A', value: 'A technique where clay is rolled on a wheel to form shapes', isCorrect: false },
      { label: 'B', value: 'A technique where long rolls (coils) of clay are stacked and joined together to build the walls of a pot or vessel', isCorrect: true },
      { label: 'C', value: 'A technique using liquid clay (slip) poured into a mould', isCorrect: false },
      { label: 'D', value: 'A technique of pressing clay into flat sheets', isCorrect: false },
    ], 'The coil method is one of the oldest pottery-making techniques. Clay is rolled into long, even coils (ropes), then each coil is placed on top of the previous one and smoothed together (scored and slipped) to build walls. This method allows great control over form and height and is ideal for creating rounded vessels without a wheel.', HARD, 'Sculpture & Ceramics'),

    // Printmaking (3)
    mcq('What is a "linocut" in printmaking?', [
      { label: 'A', value: 'A print made from a stone surface', isCorrect: false },
      { label: 'B', value: 'A relief print made by carving an image into a linoleum surface, inking the raised areas, and pressing onto paper', isCorrect: true },
      { label: 'C', value: 'A print made using a photographic process', isCorrect: false },
      { label: 'D', value: 'A type of digital printing', isCorrect: false },
    ], 'Linocut is a relief printmaking technique where the artist carves away the non-image areas from a sheet of linoleum. Ink is rolled onto the remaining raised surface, and paper is pressed against it (by hand or press) to transfer the image. It produces bold, graphic prints with high contrast.', EASY, 'Printmaking'),
    mcq('What is the difference between an etching and an engraving?', [
      { label: 'A', value: 'They are the same technique', isCorrect: false },
      { label: 'B', value: 'Etching uses acid to bite lines into a metal plate through a protective coating; engraving cuts lines directly into the metal with a burin tool', isCorrect: true },
      { label: 'C', value: 'Engraving uses acid; etching uses a burin', isCorrect: false },
      { label: 'D', value: 'Etching can only be done on wood; engraving only on metal', isCorrect: false },
    ], 'In etching, a metal plate is coated with an acid-resistant ground, the design is scratched through the ground, and acid bites the exposed lines. In engraving, lines are cut directly into the metal with a V-shaped tool (burin). Etching produces softer, freer lines; engraving produces cleaner, more precise lines.', MEDIUM, 'Printmaking'),
    mcq('What is a "monoprint" in printmaking?', [
      { label: 'A', value: 'A print that can be reproduced exactly the same way multiple times', isCorrect: false },
      { label: 'B', value: 'A unique, one-of-a-kind print made by painting or inking on a surface and transferring it to paper — producing only a single impression', isCorrect: true },
      { label: 'C', value: 'A print made with only one colour', isCorrect: false },
      { label: 'D', value: 'A print made from a photograph', isCorrect: false },
    ], 'A monoprint produces exactly one unique image. Unlike other printmaking methods that produce editions (multiple identical prints), monoprinting involves applying ink or paint to a plate (glass, metal, or acrylic), manipulating it, and pressing paper onto it to create a single transfer. No two monoprints are exactly alike.', HARD, 'Printmaking'),

    // Art History & Appreciation (3)
    mcq('Which Caribbean artist from Jamaica is internationally famous for her expressive paintings and is considered one of the region\'s most important modern artists?', [
      { label: 'A', value: 'Edna Manley', isCorrect: true },
      { label: 'B', value: 'Frida Kahlo', isCorrect: false },
      { label: 'C', value: 'Georgia O\'Keeffe', isCorrect: false },
      { label: 'D', value: 'Claude Monet', isCorrect: false },
    ], 'Edna Manley (1900–1987) was a Jamaican artist and sculptor whose work explored Jamaican identity, culture, and the nationalist movement. She was also an art educator and co-founder of the Jamaica School of Art (now the Edna Manley College of the Visual and Performing Arts).', EASY, 'Art History & Appreciation'),
    mcq('What artistic movement is Claude Monet associated with?', [
      { label: 'A', value: 'Cubism', isCorrect: false },
      { label: 'B', value: 'Impressionism', isCorrect: true },
      { label: 'C', value: 'Surrealism', isCorrect: false },
      { label: 'D', value: 'Pop Art', isCorrect: false },
    ], 'Claude Monet (1840–1926) is a founder of French Impressionism. The movement emphasised capturing the fleeting effects of light, colour, and atmosphere, often painting outdoors (en plein air). Monet\'s "Impression, Sunrise" (1872) gave the movement its name.', MEDIUM, 'Art History & Appreciation'),
    mcq('What is the significance of the "Taino" art and petroglyphs in Caribbean visual arts history?', [
      { label: 'A', value: 'Taino art is entirely modern and has no historical significance', isCorrect: false },
      { label: 'B', value: 'Taino art represents the earliest visual artistic expression in the Caribbean, providing insight into the indigenous people\'s beliefs, rituals, and daily life', isCorrect: true },
      { label: 'C', value: 'Taino art was brought to the Caribbean by European colonisers', isCorrect: false },
      { label: 'D', value: 'Taino petroglyphs were created by African slaves', isCorrect: false },
    ], 'The Taino people were the indigenous inhabitants of the Caribbean at the time of European contact. Their artistic legacy includes carved stone petroglyphs, ceremonial artefacts (zemis), pottery, and jewellery. These artworks provide invaluable insights into Taino religious beliefs, social structure, and connection to the natural world, and continue to inspire Caribbean artists today.', HARD, 'Art History & Appreciation'),
  ],
}

// ── Main ──────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Seeding 8 CSEC subjects into the database...\n')

  let subjectCount = 0
  let topicCount = 0
  let questionCount = 0

  // 1. Create subjects and topics
  for (const subj of SUBJECTS) {
    const subject = await db.subject.upsert({
      where: { code: subj.code },
      update: { name: subj.name, description: subj.description, color: subj.color, icon: subj.icon },
      create: { name: subj.name, code: subj.code, description: subj.description, color: subj.color, icon: subj.icon },
    })
    subjectCount++
    console.log(`  ✓ Subject: ${subj.name} (${subj.code})`)

    for (let i = 0; i < subj.topics.length; i++) {
      const topic = await db.topic.upsert({
        where: { name_subjectId: { name: subj.topics[i], subjectId: subject.id } },
        update: { order: i },
        create: { name: subj.topics[i], subjectId: subject.id, order: i },
      })
      topicCount++
    }
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
    console.log(`  ✓ Questions for ${subject.name}: ${questions.length}`)
  }

  // 3. Summary
  console.log(`\n${'═'.repeat(50)}`)
  console.log(`  ✅ SEED COMPLETE`)
  console.log(`  📚 Subjects:  ${subjectCount}`)
  console.log(`  📋 Topics:    ${topicCount}`)
  console.log(`  ❓ Questions: ${questionCount}`)
  console.log(`${'═'.repeat(50)}\n`)

  return {
    subjects: subjectCount,
    topics: topicCount,
    questions: questionCount,
  }
}

main()
  .then((summary) => {
    console.log('Done.', summary)
    process.exit(0)
  })
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
