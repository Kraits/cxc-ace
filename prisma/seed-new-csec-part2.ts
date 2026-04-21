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

// ── 8 New CSEC Subjects (Part 2) ────────────────────────────

const SUBJECTS = [
  {
    name: 'Agricultural Science',
    code: 'CSEC-AGRI',
    description: 'CSEC Agricultural Science — Soil Science, Crop Production, Animal Husbandry, and Farm Management',
    color: '#16a34a',
    icon: '🌱',
    topics: ['Soil Science', 'Crop Production', 'Animal Husbandry', 'Agricultural Technology', 'Farm Management', 'Environmental Conservation'],
  },
  {
    name: 'Food & Nutrition',
    code: 'CSEC-FN',
    description: 'CSEC Food & Nutrition — Nutrition, Meal Planning, Food Preparation, Preservation, and Consumer Education',
    color: '#f472b6',
    icon: '🍳',
    topics: ['Nutrition & Health', 'Meal Planning', 'Food Preparation', 'Food Preservation', 'Kitchen Safety & Hygiene', 'Consumer Education'],
  },
  {
    name: 'Physical Education & Sport',
    code: 'CSEC-PES',
    description: 'CSEC Physical Education & Sport — Anatomy, Fitness, Sports Psychology, and Caribbean Sports',
    color: '#059669',
    icon: '⚽',
    topics: ['Anatomy & Physiology', 'Fitness & Training', 'Sports Psychology', 'Health & Wellness', 'Caribbean Sports', 'Coaching & Officiating'],
  },
  {
    name: 'Technical Drawing',
    code: 'CSEC-TD',
    description: 'CSEC Technical Drawing — Geometric Constructions, Projections, Isometric Drawing, and Building Drawing',
    color: '#525252',
    icon: '📏',
    topics: ['Geometric Constructions', 'Orthographic Projection', 'Isometric Drawing', 'Sectional Views', 'Building Drawing', 'Developments'],
  },
  {
    name: 'Office Administration',
    code: 'CSEC-OA',
    description: 'CSEC Office Administration — Office Environment, Communication, Records, HR, and Technology',
    color: '#7c3aed',
    icon: '🏢',
    topics: ['The Office Environment', 'Communication', 'Records Management', 'Human Resources', 'Meetings & Conferences', 'Technology in the Office'],
  },
  {
    name: 'Electronic Document Preparation & Management (EDPM)',
    code: 'CSEC-EDPM',
    description: 'CSEC EDPM — Word Processing, Spreadsheets, Database Management, Presentations, and Internet Skills',
    color: '#0284c7',
    icon: '⌨️',
    topics: ['Word Processing', 'Spreadsheets', 'Database Management', 'Presentations', 'Internet & Email', 'Document Management'],
  },
  {
    name: 'Music',
    code: 'CSEC-MUSIC',
    description: 'CSEC Music — Music Theory, Appreciation, Performance, Composition, Caribbean Music, and Technology',
    color: '#d946ef',
    icon: '🎵',
    topics: ['Music Theory', 'Music Appreciation', 'Performance', 'Composition & Arrangement', 'Caribbean Music', 'Music Technology'],
  },
  {
    name: 'Visual Arts',
    code: 'CSEC-VA',
    description: 'CSEC Visual Arts — Drawing, Painting, Printmaking, Sculpture, Textile Arts, and Art Appreciation',
    color: '#f59e0b',
    icon: '🎨',
    topics: ['Drawing', 'Painting', 'Printmaking', 'Sculpture & Ceramics', 'Textile & Fibre Arts', 'Art Appreciation & History'],
  },
]

// ── Questions ────────────────────────────────────────────────

const QUESTIONS: Record<string, ReturnType<typeof mcq>[]> = {
  // ═══════════════════════════════════════════════════════════════
  // 1. AGRICULTURAL SCIENCE (CSEC-AGRI) — 15 Questions
  // ═══════════════════════════════════════════════════════════════
  'CSEC-AGRI': [
    // Soil Science
    mcq(
      'Which of the following is the best definition of soil texture?',
      [
        { label: 'A', value: 'The colour of the soil', isCorrect: false },
        { label: 'B', value: 'The proportion of sand, silt, and clay particles in the soil', isCorrect: true },
        { label: 'C', value: 'The amount of organic matter in the soil', isCorrect: false },
        { label: 'D', value: 'The depth of the topsoil layer', isCorrect: false },
      ],
      'Soil texture refers to the relative proportions of sand, silt, and clay particles, which determines the soil\'s physical properties such as water retention, drainage, and workability.',
      EASY,
      'Soil Science'
    ),
    mcq(
      'Which soil type has the greatest water-holding capacity?',
      [
        { label: 'A', value: 'Sandy soil', isCorrect: false },
        { label: 'B', value: 'Loam soil', isCorrect: false },
        { label: 'C', value: 'Clay soil', isCorrect: true },
        { label: 'D', value: 'Gravelly soil', isCorrect: false },
      ],
      'Clay soil has the smallest particle size, creating tiny pores that hold water tightly. This gives clay the highest water-holding capacity among the major soil types, though it drains poorly.',
      MEDIUM,
      'Soil Science'
    ),
    // Crop Production
    mcq(
      'Which method of vegetative propagation involves attaching a stem of one plant to the rootstock of another?',
      [
        { label: 'A', value: 'Layering', isCorrect: false },
        { label: 'B', value: 'Budding', isCorrect: false },
        { label: 'C', value: 'Grafting', isCorrect: true },
        { label: 'D', value: 'Cutting', isCorrect: false },
      ],
      'Grafting is a vegetative propagation method where a scion (upper stem portion) is joined to a rootstock (root system), combining desirable characteristics of both plants. It is commonly used in fruit trees such as mango and citrus.',
      MEDIUM,
      'Crop Production'
    ),
    mcq(
      'What is the recommended spacing practice in crop production?',
      [
        { label: 'A', value: 'Planting seeds as close together as possible', isCorrect: false },
        { label: 'B', value: 'Placing plants at the correct distance to allow adequate light, air, and nutrient access', isCorrect: true },
        { label: 'C', value: 'Spacing plants only based on the seed size', isCorrect: false },
        { label: 'D', value: 'Using the same spacing for all crops regardless of type', isCorrect: false },
      ],
      'Proper plant spacing ensures each plant receives sufficient sunlight, air circulation, water, and nutrients for optimal growth. Incorrect spacing can lead to competition, poor yields, and increased pest and disease problems.',
      EASY,
      'Crop Production'
    ),
    mcq(
      'Which of the following is a CXC-recommended method for controlling pests in an integrated pest management (IPM) programme?',
      [
        { label: 'A', value: 'Applying the maximum dose of chemical pesticide at all times', isCorrect: false },
        { label: 'B', value: 'Using biological control agents such as ladybirds to manage aphid populations', isCorrect: true },
        { label: 'C', value: 'Removing all plants from the field', isCorrect: false },
        { label: 'D', value: 'Ignoring minor pest infestations entirely', isCorrect: false },
      ],
      'Integrated Pest Management (IPM) combines biological, cultural, and chemical methods. Biological control uses natural enemies (e.g., ladybirds eat aphids) to reduce pest populations, minimising chemical pesticide use and environmental damage.',
      HARD,
      'Crop Production'
    ),
    // Animal Husbandry
    mcq(
      'What is the process of castration in male animals primarily used for in livestock production?',
      [
        { label: 'A', value: 'To increase the rate of reproduction', isCorrect: false },
        { label: 'B', value: 'To improve meat quality and make the animal easier to manage', isCorrect: true },
        { label: 'C', value: 'To increase the animal\'s milk production', isCorrect: false },
        { label: 'D', value: 'To reduce the animal\'s feed intake', isCorrect: false },
      ],
      'Castration removes the testes, reducing testosterone-driven aggressive behaviour and improving meat tenderness. Castrated animals (steers, wethers) are easier to handle and typically produce better-quality meat.',
      MEDIUM,
      'Animal Husbandry'
    ),
    mcq(
      'Which poultry system allows birds to move freely between a housing area and an outdoor range?',
      [
        { label: 'A', value: 'Battery cage system', isCorrect: false },
        { label: 'B', value: 'Deep litter system', isCorrect: false },
        { label: 'C', value: 'Free-range system', isCorrect: true },
        { label: 'D', value: 'Slat system', isCorrect: false },
      ],
      'In a free-range system, poultry have access to both indoor housing and an outdoor range area where they can forage naturally. This system promotes animal welfare and is increasingly demanded by consumers.',
      EASY,
      'Animal Husbandry'
    ),
    mcq(
      'In cattle farming, what is the difference between "drenching" and "dipping"?',
      [
        { label: 'A', value: 'Drenching involves administering liquid medicine orally; dipping involves immersing animals in a chemical solution for external parasites', isCorrect: true },
        { label: 'B', value: 'Drenching is for external parasites; dipping is for internal parasites', isCorrect: false },
        { label: 'C', value: 'Both terms refer to the same procedure', isCorrect: false },
        { label: 'D', value: 'Drenching is only used for poultry; dipping only for cattle', isCorrect: false },
      ],
      'Drenching administers an anthelmintic (dewormer) as a liquid directly into the animal\'s mouth to treat internal parasites. Dipping immerses the animal in a pesticide bath to control external parasites such as ticks, lice, and mites.',
      HARD,
      'Animal Husbandry'
    ),
    // Agricultural Technology
    mcq(
      'Which of the following implements is used for primary tillage?',
      [
        { label: 'A', value: 'Mouldboard plough', isCorrect: true },
        { label: 'B', value: 'Harrow', isCorrect: false },
        { label: 'C', value: 'Seed drill', isCorrect: false },
        { label: 'D', value: 'Mower', isCorrect: false },
      ],
      'The mouldboard plough is a primary tillage implement that cuts, lifts, and inverts the soil, burying crop residues and weeds. It breaks up compacted soil to prepare a seedbed for planting.',
      EASY,
      'Agricultural Technology'
    ),
    mcq(
      'What is the main advantage of drip irrigation over sprinkler irrigation in the Caribbean?',
      [
        { label: 'A', value: 'It covers the largest area at once', isCorrect: false },
        { label: 'B', value: 'It delivers water directly to plant roots, reducing evaporation and water wastage', isCorrect: true },
        { label: 'C', value: 'It requires no maintenance', isCorrect: false },
        { label: 'D', value: 'It works without any water pressure', isCorrect: false },
      ],
      'Drip irrigation delivers water slowly through emitters directly to the root zone, reducing evaporation losses, runoff, and water use by up to 50%. This is especially beneficial in water-scarce Caribbean environments.',
      MEDIUM,
      'Agricultural Technology'
    ),
    mcq(
      'A farmer applies 200 kg of 10-20-10 fertiliser to a 2-hectare field. How much nitrogen (N) is applied per hectare?',
      [
        { label: 'A', value: '10 kg', isCorrect: false },
        { label: 'B', value: '20 kg', isCorrect: false },
        { label: 'C', value: '100 kg', isCorrect: false },
        { label: 'D', value: '10 kg per hectare', isCorrect: true },
      ],
      '10-20-10 means 10% N, 20% P₂O₅, 10% K₂O. Total N = 200 × 10% = 20 kg. Per hectare = 20 ÷ 2 = 10 kg N/ha. The answer is 10 kg of nitrogen per hectare.',
      HARD,
      'Agricultural Technology'
    ),
    // Farm Management
    mcq(
      'What is gross margin in farm management?',
      [
        { label: 'A', value: 'Total revenue minus total costs including fixed costs', isCorrect: false },
        { label: 'B', value: 'Total revenue from an enterprise minus its variable costs', isCorrect: true },
        { label: 'C', value: 'The total cost of all inputs used in production', isCorrect: false },
        { label: 'D', value: 'The profit remaining after paying all loans', isCorrect: false },
      ],
      'Gross margin = Total Revenue − Variable Costs. It measures the contribution of an enterprise towards paying fixed costs and generating profit. It helps farmers compare the profitability of different crop or livestock enterprises.',
      MEDIUM,
      'Farm Management'
    ),
    mcq(
      'Which of the following is a fixed cost on a farm?',
      [
        { label: 'A', value: 'Fertiliser', isCorrect: false },
        { label: 'B', value: 'Animal feed', isCorrect: false },
        { label: 'C', value: 'Land rent', isCorrect: true },
        { label: 'D', value: 'Seeds', isCorrect: false },
      ],
      'Fixed costs do not change with the level of production. Land rent, insurance, loan interest, and depreciation on machinery are fixed costs because they must be paid regardless of how much is produced.',
      EASY,
      'Farm Management'
    ),
    mcq(
      'A farmer produces 5,000 kg of tomatoes. The variable cost per kg is $3 and the selling price per kg is $7. Fixed costs are $8,000. What is the net profit?',
      [
        { label: 'A', value: '$20,000', isCorrect: false },
        { label: 'B', value: '$12,000', isCorrect: true },
        { label: 'C', value: '$35,000', isCorrect: false },
        { label: 'D', value: '$15,000', isCorrect: false },
      ],
      'Total Revenue = 5,000 × $7 = $35,000. Variable Costs = 5,000 × $3 = $15,000. Gross Margin = $35,000 − $15,000 = $20,000. Net Profit = $20,000 − $8,000 (fixed) = $12,000.',
      HARD,
      'Farm Management'
    ),
    // Environmental Conservation
    mcq(
      'What is agroforestry?',
      [
        { label: 'A', value: 'Growing only trees for timber', isCorrect: false },
        { label: 'B', value: 'Integrating trees with crops and/or livestock on the same piece of land', isCorrect: true },
        { label: 'C', value: 'Clearing forests for agriculture', isCorrect: false },
        { label: 'D', value: 'Using chemical pesticides in forests', isCorrect: false },
      ],
      'Agroforestry combines trees with agricultural crops and/or livestock on the same land. Benefits include soil conservation, biodiversity, shade for crops like coffee and cocoa, diversified income, and carbon sequestration.',
      MEDIUM,
      'Environmental Conservation'
    ),
  ],

  // ═══════════════════════════════════════════════════════════════
  // 2. FOOD & NUTRITION (CSEC-FN) — 15 Questions
  // ═══════════════════════════════════════════════════════════════
  'CSEC-FN': [
    // Nutrition & Health
    mcq(
      'Which nutrient is the body\'s primary source of energy?',
      [
        { label: 'A', value: 'Proteins', isCorrect: false },
        { label: 'B', value: 'Carbohydrates', isCorrect: true },
        { label: 'C', value: 'Vitamins', isCorrect: false },
        { label: 'D', value: 'Minerals', isCorrect: false },
      ],
      'Carbohydrates are the body\'s main energy source. They are broken down into glucose, which fuels brain function, physical activity, and cellular processes. One gram of carbohydrate provides 4 kilocalories of energy.',
      EASY,
      'Nutrition & Health'
    ),
    mcq(
      'Which vitamin deficiency causes scurvy?',
      [
        { label: 'A', value: 'Vitamin A', isCorrect: false },
        { label: 'B', value: 'Vitamin C', isCorrect: true },
        { label: 'C', value: 'Vitamin D', isCorrect: false },
        { label: 'D', value: 'Vitamin K', isCorrect: false },
      ],
      'Vitamin C (ascorbic acid) deficiency causes scurvy, characterised by bleeding gums, weakened connective tissue, poor wound healing, and fatigue. Citrus fruits, peppers, and leafy greens are excellent sources.',
      MEDIUM,
      'Nutrition & Health'
    ),
    mcq(
      'Iron deficiency anaemia is most common in which group in the Caribbean?',
      [
        { label: 'A', value: 'Adult men over 50', isCorrect: false },
        { label: 'B', value: 'Women of childbearing age and young children', isCorrect: true },
        { label: 'C', value: 'Elderly women over 70', isCorrect: false },
        { label: 'D', value: 'Teenage boys', isCorrect: false },
      ],
      'Women of childbearing age lose iron through menstruation, and young children have rapid growth needs, making both groups highly susceptible to iron-deficiency anaemia. Dietary sources include liver, red meat, dark leafy greens, and legumes.',
      HARD,
      'Nutrition & Health'
    ),
    // Meal Planning
    mcq(
      'What is the main purpose of a meal plan?',
      [
        { label: 'A', value: 'To eliminate all fats from the diet', isCorrect: false },
        { label: 'B', value: 'To ensure balanced, nutritious meals that meet dietary needs within a budget', isCorrect: true },
        { label: 'C', value: 'To prepare the same meal every day', isCorrect: false },
        { label: 'D', value: 'To use only expensive imported foods', isCorrect: false },
      ],
      'A well-designed meal plan ensures meals are nutritionally balanced, use available local foods, suit the family\'s budget, accommodate special dietary needs, and reduce food waste through efficient shopping and preparation.',
      EASY,
      'Meal Planning'
    ),
    mcq(
      'When planning meals for a person with diabetes, which of the following should be limited?',
      [
        { label: 'A', value: 'Leafy green vegetables', isCorrect: false },
        { label: 'B', value: 'High-fibre whole grains', isCorrect: false },
        { label: 'C', value: 'Refined sugars and simple carbohydrates', isCorrect: true },
        { label: 'D', value: 'Lean proteins', isCorrect: false },
      ],
      'People with diabetes should limit refined sugars and simple carbohydrates (white bread, sweet drinks, sweets) because they cause rapid blood glucose spikes. Complex carbohydrates and high-fibre foods are preferred as they release glucose more slowly.',
      MEDIUM,
      'Meal Planning'
    ),
    // Food Preparation
    mcq(
      'What is the purpose of marinating meat before cooking?',
      [
        { label: 'A', value: 'To increase the cooking time', isCorrect: false },
        { label: 'B', value: 'To tenderise and add flavour to the meat', isCorrect: true },
        { label: 'C', value: 'To reduce the nutritional value', isCorrect: false },
        { label: 'D', value: 'To preserve the meat for long-term storage', isCorrect: false },
      ],
      'Marinades typically contain an acid (vinegar, citrus juice) that helps break down tough protein fibres, tenderising the meat, along with herbs, spices, and oils that penetrate and enhance flavour.',
      EASY,
      'Food Preparation'
    ),
    mcq(
      'Which cooking method is most suitable for preserving the nutrients in green leafy vegetables?',
      [
        { label: 'A', value: 'Deep frying', isCorrect: false },
        { label: 'B', value: 'Boiling for 30 minutes', isCorrect: false },
        { label: 'C', value: 'Steaming', isCorrect: true },
        { label: 'D', value: 'Grilling at high temperature', isCorrect: false },
      ],
      'Steaming cooks vegetables quickly using steam heat without submerging them in water, minimising the leaching of water-soluble vitamins (B and C) into the cooking liquid. It preserves colour, texture, and nutrients.',
      MEDIUM,
      'Food Preparation'
    ),
    mcq(
      'What is the maillard reaction in cooking?',
      [
        { label: 'A', value: 'The breakdown of proteins into amino acids during digestion', isCorrect: false },
        { label: 'B', value: 'A chemical reaction between amino acids and reducing sugars that produces browning and complex flavours', isCorrect: true },
        { label: 'C', value: 'The process of fermentation in bread making', isCorrect: false },
        { label: 'D', value: 'The emulsification of oil and vinegar', isCorrect: false },
      ],
      'The Maillard reaction occurs when amino acids and reducing sugars are heated (typically above 140°C), creating hundreds of flavour compounds and the desirable brown colour on seared meats, toasted bread, and baked goods.',
      HARD,
      'Food Preparation'
    ),
    // Food Preservation
    mcq(
      'Which food preservation method uses high heat to destroy microorganisms and then seals food in airtight containers?',
      [
        { label: 'A', value: 'Freezing', isCorrect: false },
        { label: 'B', value: 'Canning', isCorrect: true },
        { label: 'C', value: 'Salting', isCorrect: false },
        { label: 'D', value: 'Drying', isCorrect: false },
      ],
      'Canning involves heating food to a temperature that destroys spoilage microorganisms and enzymes, then sealing it in sterile airtight containers. This method preserves food for extended periods without refrigeration.',
      EASY,
      'Food Preservation'
    ),
    mcq(
      'How does dehydration (drying) preserve food?',
      [
        { label: 'A', value: 'By adding chemicals that kill bacteria', isCorrect: false },
        { label: 'B', value: 'By removing moisture, which prevents the growth of microorganisms that need water to survive', isCorrect: true },
        { label: 'C', value: 'By increasing the food\'s temperature permanently', isCorrect: false },
        { label: 'D', value: 'By adding sugar to the food', isCorrect: false },
      ],
      'Dehydration removes 80-95% of the water content from food. Most bacteria, yeasts, and moulds require water to grow. Without moisture, microbial activity is inhibited, significantly extending the shelf life of the food.',
      MEDIUM,
      'Food Preservation'
    ),
    mcq(
      'What is pasteurisation?',
      [
        { label: 'A', value: 'Heating food to extremely high temperatures for several hours', isCorrect: false },
        { label: 'B', value: 'A mild heat treatment that destroys pathogenic microorganisms while preserving food quality', isCorrect: true },
        { label: 'C', value: 'Freezing food to very low temperatures', isCorrect: false },
        { label: 'D', value: 'Adding preservatives to canned foods', isCorrect: false },
      ],
      'Pasteurisation uses moderate heat (typically 63-72°C for a specific time) to kill harmful pathogens such as Salmonella and Listeria in milk, juice, and other liquids while retaining flavour and nutritional quality. It is NOT sterilisation.',
      HARD,
      'Food Preservation'
    ),
    // Kitchen Safety & Hygiene
    mcq(
      'What is cross-contamination in food safety?',
      [
        { label: 'A', value: 'When food is overcooked', isCorrect: false },
        { label: 'B', value: 'When harmful bacteria are transferred from one food (usually raw) to another', isCorrect: true },
        { label: 'C', value: 'When food is stored at the wrong temperature', isCorrect: false },
        { label: 'D', value: 'When food expires past its use-by date', isCorrect: false },
      ],
      'Cross-contamination occurs when bacteria from raw foods (especially meat, poultry, and seafood) are transferred to ready-to-eat foods via hands, utensils, cutting boards, or surfaces. Using separate boards and washing hands prevents this.',
      EASY,
      'Kitchen Safety & Hygiene'
    ),
    mcq(
      'What is the danger zone temperature range for bacterial growth in food?',
      [
        { label: 'A', value: '0°C to 4°C', isCorrect: false },
        { label: 'B', value: '4°C to 60°C (40°F to 140°F)', isCorrect: true },
        { label: 'C', value: '60°C to 100°C', isCorrect: false },
        { label: 'D', value: '−18°C to 0°C', isCorrect: false },
      ],
      'The danger zone (4°C–60°C / 40°F–140°F) is the temperature range where bacteria multiply most rapidly. Food should not be left in this range for more than 2 hours. Keep cold food below 4°C and hot food above 60°C.',
      MEDIUM,
      'Kitchen Safety & Hygiene'
    ),
    mcq(
      'Which type of fire extinguisher should be used on a grease fire in the kitchen?',
      [
        { label: 'A', value: 'Water-based extinguisher', isCorrect: false },
        { label: 'B', value: 'Class F (wet chemical) fire extinguisher', isCorrect: true },
        { label: 'C', value: 'CO₂ extinguisher', isCorrect: false },
        { label: 'D', value: 'Foam extinguisher', isCorrect: false },
      ],
      'A Class F (wet chemical) fire extinguisher is specifically designed for cooking oil and fat fires. Water must NEVER be used on a grease fire as it causes the hot oil to splatter and spread the fire. The wet chemical agent forms a soap-like film that cools and smothers the flames.',
      HARD,
      'Kitchen Safety & Hygiene'
    ),
    // Consumer Education
    mcq(
      'What information is required on a food label by law in most Caribbean countries?',
      [
        { label: 'A', value: 'The name and address of the manufacturer, ingredients list, net weight, and expiry date', isCorrect: true },
        { label: 'B', value: 'Only the brand name and price', isCorrect: false },
        { label: 'C', value: 'The name of the cashier who sold the product', isCorrect: false },
        { label: 'D', value: 'A recipe for preparing the food', isCorrect: false },
      ],
      'Food labelling regulations in Caribbean countries typically require: product name, ingredient list (in descending order of weight), net weight/volume, manufacturer details, country of origin, storage instructions, and expiry/use-by date.',
      MEDIUM,
      'Consumer Education'
    ),
  ],

  // ═══════════════════════════════════════════════════════════════
  // 3. PHYSICAL EDUCATION & SPORT (CSEC-PES) — 15 Questions
  // ═══════════════════════════════════════════════════════════════
  'CSEC-PES': [
    // Anatomy & Physiology
    mcq(
      'Which type of muscle tissue is found in the walls of the heart?',
      [
        { label: 'A', value: 'Skeletal muscle', isCorrect: false },
        { label: 'B', value: 'Smooth muscle', isCorrect: false },
        { label: 'C', value: 'Cardiac muscle', isCorrect: true },
        { label: 'D', value: 'Voluntary muscle', isCorrect: false },
      ],
      'Cardiac muscle is found only in the heart. It is involuntary, striated, and contracts rhythmically without fatigue to pump blood throughout the body. It differs from skeletal (voluntary) and smooth (involuntary) muscle.',
      EASY,
      'Anatomy & Physiology'
    ),
    mcq(
      'What is the function of red blood cells (erythrocytes)?',
      [
        { label: 'A', value: 'To fight infection', isCorrect: false },
        { label: 'B', value: 'To carry oxygen from the lungs to body tissues and carbon dioxide back to the lungs', isCorrect: true },
        { label: 'C', value: 'To help blood clot', isCorrect: false },
        { label: 'D', value: 'To transport nutrients only', isCorrect: false },
      ],
      'Red blood cells contain haemoglobin, which binds to oxygen in the lungs and releases it to tissues. They also carry some CO₂ back to the lungs. White blood cells fight infection; platelets help with clotting.',
      MEDIUM,
      'Anatomy & Physiology'
    ),
    // Fitness & Training
    mcq(
      'What does the FITT principle stand for in designing a fitness programme?',
      [
        { label: 'A', value: 'Frequency, Intensity, Time, Type', isCorrect: true },
        { label: 'B', value: 'Flexibility, Interval, Training, Temperature', isCorrect: false },
        { label: 'C', value: 'Force, Impact, Timing, Technique', isCorrect: false },
        { label: 'D', value: 'Fitness, Injury, Treatment, Therapy', isCorrect: false },
      ],
      'The FITT principle guides exercise prescription: Frequency (how often), Intensity (how hard), Time (how long), and Type (what kind of exercise). Adjusting these variables helps individuals achieve specific fitness goals.',
      EASY,
      'Fitness & Training'
    ),
    mcq(
      'What is progressive overload in training?',
      [
        { label: 'A', value: 'Gradually decreasing the intensity of exercise over time', isCorrect: false },
        { label: 'B', value: 'Gradually increasing the demands on the body to continually improve fitness', isCorrect: true },
        { label: 'C', value: 'Doing the same workout every day', isCorrect: false },
        { label: 'D', value: 'Training at maximum intensity from the first session', isCorrect: false },
      ],
      'Progressive overload is a key training principle where the athlete gradually increases the stress placed on the body (e.g., heavier weights, more repetitions, longer duration) to force physiological adaptations and avoid plateaus.',
      MEDIUM,
      'Fitness & Training'
    ),
    mcq(
      'An athlete\'s resting heart rate is 50 beats per minute. During a VO₂max test, their heart rate reaches 190 bpm. Calculate their heart rate reserve (HRR).',
      [
        { label: 'A', value: '120 bpm', isCorrect: false },
        { label: 'B', value: '140 bpm', isCorrect: true },
        { label: 'C', value: '190 bpm', isCorrect: false },
        { label: 'D', value: '50 bpm', isCorrect: false },
      ],
      'Heart Rate Reserve (HRR) = Maximum Heart Rate − Resting Heart Rate. HRR = 190 − 50 = 140 bpm. HRR is used with the Karvonen formula to calculate target training zones: Target HR = (HRR × %Intensity) + RHR.',
      HARD,
      'Fitness & Training'
    ),
    // Sports Psychology
    mcq(
      'What is intrinsic motivation in sports?',
      [
        { label: 'A', value: 'Motivation that comes from external rewards like trophies and money', isCorrect: false },
        { label: 'B', value: 'Motivation that comes from within — the personal enjoyment and satisfaction of participation', isCorrect: true },
        { label: 'C', value: 'Motivation from fear of losing', isCorrect: false },
        { label: 'D', value: 'Motivation from parental pressure', isCorrect: false },
      ],
      'Intrinsic motivation drives an athlete to participate for the inherent pleasure, satisfaction, and personal challenge of the sport itself, rather than for external rewards. Intrinsic motivation is generally associated with greater persistence and enjoyment.',
      EASY,
      'Sports Psychology'
    ),
    mcq(
      'What is "arousal" in sports psychology?',
      [
        { label: 'A', value: 'The feeling of being angry during competition', isCorrect: false },
        { label: 'B', value: 'The level of mental and physical activation or readiness of an athlete', isCorrect: true },
        { label: 'C', value: 'The amount of sleep an athlete gets before a game', isCorrect: false },
        { label: 'D', value: 'The score at halftime', isCorrect: false },
      ],
      'Arousal refers to the athlete\'s state of mental and physical readiness, ranging from deep sleep (very low) to extreme excitement (very high). The Inverted-U Hypothesis suggests performance is optimal at moderate arousal levels.',
      MEDIUM,
      'Sports Psychology'
    ),
    mcq(
      'According to the Yerkes-Dodson Law, how does arousal level affect performance?',
      [
        { label: 'A', value: 'Higher arousal always improves performance', isCorrect: false },
        { label: 'B', value: 'Performance is optimal at moderate arousal; too low or too high arousal impairs performance', isCorrect: true },
        { label: 'C', value: 'Lower arousal always produces the best results', isCorrect: false },
        { label: 'D', value: 'Arousal has no effect on athletic performance', isCorrect: false },
      ],
      'The Yerkes-Dodson Law (Inverted-U Hypothesis) states that performance increases with arousal up to an optimal point, then declines. For complex/fine skills (golf putting), lower arousal is best; for simple/gross skills (weightlifting), higher arousal helps.',
      HARD,
      'Sports Psychology'
    ),
    // Health & Wellness
    mcq(
      'What is a sprain?',
      [
        { label: 'A', value: 'A break or crack in a bone', isCorrect: false },
        { label: 'B', value: 'A stretching or tearing of a ligament at a joint', isCorrect: true },
        { label: 'C', value: 'A complete separation of a muscle from the bone', isCorrect: false },
        { label: 'D', value: 'A bruise on the skin surface', isCorrect: false },
      ],
      'A sprain is an injury to a ligament (tissue connecting bones at a joint), caused by overstretching or tearing. Common in ankles and knees. The RICE method (Rest, Ice, Compression, Elevation) is the initial treatment.',
      EASY,
      'Health & Wellness'
    ),
    mcq(
      'Which of the following is a symptom of heat stroke?',
      [
        { label: 'A', value: 'Mild shivering and goosebumps', isCorrect: false },
        { label: 'B', value: 'High body temperature (above 40°C), confusion, and loss of consciousness', isCorrect: true },
        { label: 'C', value: 'Slight increase in thirst', isCorrect: false },
        { label: 'D', value: 'Mild muscle cramps only', isCorrect: false },
      ],
      'Heat stroke is a life-threatening emergency with core body temperature above 40°C, hot dry skin, confusion, rapid pulse, and possible loss of consciousness. Immediate cooling and medical attention are essential.',
      MEDIUM,
      'Health & Wellness'
    ),
    mcq(
      'Explain the difference between physical fitness and health-related fitness.',
      [
        { label: 'A', value: 'They are the same thing with different names', isCorrect: false },
        { label: 'B', value: 'Health-related fitness includes cardiorespiratory endurance, muscular strength, endurance, flexibility, and body composition; physical fitness is broader and includes skill-related components', isCorrect: true },
        { label: 'C', value: 'Physical fitness only applies to athletes; health-related fitness only applies to doctors', isCorrect: false },
        { label: 'D', value: 'Health-related fitness is about diet; physical fitness is about exercise', isCorrect: false },
      ],
      'Health-related fitness has five components: cardiorespiratory endurance, muscular strength, muscular endurance, flexibility, and body composition. Skill-related (physical) fitness adds: agility, balance, coordination, power, reaction time, and speed.',
      HARD,
      'Health & Wellness'
    ),
    // Caribbean Sports
    mcq(
      'Which Caribbean country has traditionally dominated sprint events at the Olympic Games?',
      [
        { label: 'A', value: 'Trinidad and Tobago', isCorrect: false },
        { label: 'B', value: 'Jamaica', isCorrect: true },
        { label: 'C', value: 'Barbados', isCorrect: false },
        { label: 'D', value: 'Guyana', isCorrect: false },
      ],
      'Jamaica has produced legendary sprinters including Usain Bolt, Shelly-Ann Fraser-Pryce, and Asafa Powell. The country\'s sprint programme, anchored by the Champs high school competition, is globally renowned for developing world-class talent.',
      EASY,
      'Caribbean Sports'
    ),
    mcq(
      'What is cricket\'s premier regional tournament in the Caribbean?',
      [
        { label: 'A', value: 'The Caribbean Premier League (CPL)', isCorrect: false },
        { label: 'B', value: 'The West Indies domestic first-class competition (currently the West Indies Championship)', isCorrect: true },
        { label: 'C', value: 'The Caribbean Cup', isCorrect: false },
        { label: 'D', value: 'The CARICOM Games', isCorrect: false },
      ],
      'The West Indies Championship is the first-class cricket competition among regional teams representing Caribbean territories. The West Indies cricket team, drawn from these territories, won the ICC Cricket World Cup in 1975 and 1979.',
      MEDIUM,
      'Caribbean Sports'
    ),
    mcq(
      'Netball in the Caribbean is governed regionally by which organisation?',
      [
        { label: 'A', value: 'CAF', isCorrect: false },
        { label: 'B', value: 'CONCACAF', isCorrect: false },
        { label: 'C', value: 'Americas Federation of Netball Associations (AFNA)', isCorrect: true },
        { label: 'D', value: 'WIAC', isCorrect: false },
      ],
      'Netball is highly popular in Caribbean countries like Jamaica, Trinidad & Tobago, and Barbados. Jamaica\'s Sunshine Girls are consistently ranked among the world\'s top teams. The AFNA governs netball across the Americas region.',
      MEDIUM,
      'Caribbean Sports'
    ),
    // Coaching & Officiating
    mcq(
      'What is the primary role of a sports coach?',
      [
        { label: 'A', value: 'To play in the matches when needed', isCorrect: false },
        { label: 'B', value: 'To prepare athletes physically, mentally, and tactically while ensuring their safety and development', isCorrect: true },
        { label: 'C', value: 'To only organise the schedule', isCorrect: false },
        { label: 'D', value: 'To manage the team\'s finances', isCorrect: false },
      ],
      'A coach develops athletes\' skills, fitness, tactics, and mental approach while ensuring welfare, fair play, and personal development. Effective coaching combines technical knowledge with communication, leadership, and motivational skills.',
      EASY,
      'Coaching & Officiating'
    ),
  ],

  // ═══════════════════════════════════════════════════════════════
  // 4. TECHNICAL DRAWING (CSEC-TD) — 15 Questions
  // ═══════════════════════════════════════════════════════════════
  'CSEC-TD': [
    // Geometric Constructions
    mcq(
      'Which instrument is used to draw a circle or arc in technical drawing?',
      [
        { label: 'A', value: 'Set square', isCorrect: false },
        { label: 'B', value: 'Compass', isCorrect: true },
        { label: 'C', value: 'T-square', isCorrect: false },
        { label: 'D', value: 'Divider', isCorrect: false },
      ],
      'A compass is used to draw circles and arcs of specific radii. The compass point is placed at the centre, and the pencil lead traces the circumference. Dividers are similar but have two metal points for transferring measurements.',
      EASY,
      'Geometric Constructions'
    ),
    mcq(
      'How do you construct a regular hexagon inscribed in a given circle?',
      [
        { label: 'A', value: 'Divide the circle into 8 equal parts using a protractor', isCorrect: false },
        { label: 'B', value: 'Set the compass radius to the circle\'s radius and step off 6 arcs around the circumference', isCorrect: true },
        { label: 'C', value: 'Draw a square inside the circle', isCorrect: false },
        { label: 'D', value: 'Use a 45° set square 6 times', isCorrect: false },
      ],
      'To inscribe a regular hexagon in a circle, set the compass to the same radius as the circle. Starting at any point on the circumference, mark off successive arcs — the radius equals the side length of the hexagon, producing 6 equally spaced vertices.',
      MEDIUM,
      'Geometric Constructions'
    ),
    // Orthographic Projection
    mcq(
      'In first-angle orthographic projection, which view is placed directly above the front view?',
      [
        { label: 'A', value: 'Right side view', isCorrect: false },
        { label: 'B', value: 'Plan (top view)', isCorrect: false },
        { label: 'C', value: 'The view from below (bottom view) is placed above', isCorrect: false },
        { label: 'D', value: 'The view from above (top view) is placed BELOW the front view in first-angle projection', isCorrect: true },
      ],
      'In first-angle projection, the object is placed between the observer and the projection plane. The view from above (plan) is projected below the front view, and the view from below is projected above. This is the standard used in Europe and many Caribbean countries.',
      MEDIUM,
      'Orthographic Projection'
    ),
    mcq(
      'What is the purpose of hidden lines in an orthographic drawing?',
      [
        { label: 'A', value: 'To show the outline of the object', isCorrect: false },
        { label: 'B', value: 'To represent edges and surfaces that cannot be seen from the viewing direction', isCorrect: true },
        { label: 'C', value: 'To indicate dimensions and measurements', isCorrect: false },
        { label: 'D', value: 'To show the cutting plane for sectional views', isCorrect: false },
      ],
      'Hidden lines (dashed lines) represent edges and surfaces that cannot be seen directly from the viewing direction but exist on the object. They follow the standard convention of short dashes evenly spaced.',
      EASY,
      'Orthographic Projection'
    ),
    mcq(
      'What type of line is used to indicate the axis of symmetry in a technical drawing?',
      [
        { label: 'A', value: 'Continuous thick line', isCorrect: false },
        { label: 'B', value: 'Dashed line', isCorrect: false },
        { label: 'C', value: 'Chain line (long dash-short dash-long dash)', isCorrect: true },
        { label: 'D', value: 'Wavy line', isCorrect: false },
      ],
      'Centre lines (chain lines) are used to indicate axes of symmetry, centre points of circles, and paths of motion. They consist of a long dash, a short dash, and another long dash, drawn thinly.',
      MEDIUM,
      'Orthographic Projection'
    ),
    // Isometric Drawing
    mcq(
      'In isometric drawing, what angles are the three isometric axes drawn at?',
      [
        { label: 'A', value: '0°, 90°, and 180°', isCorrect: false },
        { label: 'B', value: '30°, 90°, and 150° from the horizontal', isCorrect: true },
        { label: 'C', value: '45°, 45°, and 90°', isCorrect: false },
        { label: 'D', value: '60°, 120°, and 180°', isCorrect: false },
      ],
      'In isometric drawing, the three axes are drawn at 30° to the left, 90° vertical, and 30° to the right of the horizontal. All measurements along these axes are drawn to true scale, giving a 3D representation without perspective distortion.',
      EASY,
      'Isometric Drawing'
    ),
    mcq(
      'What is the main advantage of isometric drawing over perspective drawing for technical purposes?',
      [
        { label: 'A', value: 'It looks more realistic', isCorrect: false },
        { label: 'B', value: 'Measurements along the isometric axes are to true scale, making it useful for engineering', isCorrect: true },
        { label: 'C', value: 'It uses fewer lines', isCorrect: false },
        { label: 'D', value: 'It does not require any instruments', isCorrect: false },
      ],
      'Unlike perspective drawing where objects appear smaller with distance, isometric projection preserves true-scale measurements along the three principal axes. This allows engineers and technicians to take direct measurements from the drawing.',
      MEDIUM,
      'Isometric Drawing'
    ),
    mcq(
      'How are circles drawn in isometric projection?',
      [
        { label: 'A', value: 'As perfect circles', isCorrect: false },
        { label: 'B', value: 'As ellipses using an isometric template or four-arc construction', isCorrect: true },
        { label: 'C', value: 'As squares', isCorrect: false },
        { label: 'D', value: 'As triangles', isCorrect: false },
      ],
      'Circles appear as ellipses in isometric views. An isometric circle template (ellipses at 35°16\') or the four-centre (approximate) method can be used. The four-arc method constructs the ellipse using four circular arcs.',
      HARD,
      'Isometric Drawing'
    ),
    // Sectional Views
    mcq(
      'What is the purpose of a sectional view?',
      [
        { label: 'A', value: 'To show the exterior appearance of the object', isCorrect: false },
        { label: 'B', value: 'To show the internal features of an object by imagining a cutting plane passing through it', isCorrect: true },
        { label: 'C', value: 'To reduce the size of the drawing', isCorrect: false },
        { label: 'D', value: 'To show the material colour of the object', isCorrect: false },
      ],
      'A sectional view reveals internal details by conceptually cutting the object along a plane and showing the cut surface and visible interior features. Hatching is applied to the cut surfaces to indicate solid material.',
      EASY,
      'Sectional Views'
    ),
    mcq(
      'At what angle are section lines (hatching lines) normally drawn in a sectional view?',
      [
        { label: 'A', value: '90°', isCorrect: false },
        { label: 'B', value: '45° (or 30°/60° if 45° conflicts with outlines)', isCorrect: true },
        { label: 'C', value: '0° (horizontal)', isCorrect: false },
        { label: 'D', value: '22.5°', isCorrect: false },
      ],
      'Section lines (hatching) are typically drawn at 45° to the outline, evenly spaced at 3-5mm apart. If 45° would run parallel to prominent outlines, an alternate angle (30° or 60°) is used to avoid confusion.',
      MEDIUM,
      'Sectional Views'
    ),
    // Building Drawing
    mcq(
      'What is the purpose of a site plan in building drawing?',
      [
        { label: 'A', value: 'To show the internal layout of rooms', isCorrect: false },
        { label: 'B', value: 'To show the location of the building on the plot, including boundaries, access roads, and external features', isCorrect: true },
        { label: 'C', value: 'To show the electrical wiring layout', isCorrect: false },
        { label: 'D', value: 'To show the plumbing layout only', isCorrect: false },
      ],
      'A site plan shows the building\'s position on the land, property boundaries, orientation (north arrow), access roads, drainage, trees, and neighbouring structures. It provides context for the building within its plot.',
      EASY,
      'Building Drawing'
    ),
    mcq(
      'What does a section line symbol on a floor plan indicate?',
      [
        { label: 'A', value: 'Where a wall should be demolished', isCorrect: false },
        { label: 'B', value: 'The location and direction of a cutting plane for a sectional elevation', isCorrect: true },
        { label: 'C', value: 'The location of electrical outlets', isCorrect: false },
        { label: 'D', value: 'The path of plumbing pipes', isCorrect: false },
      ],
      'A section line on a floor plan indicates where an imaginary cutting plane passes through the building to produce a sectional (cross-section) view. Arrows show the direction of viewing, and letters (A-A, B-B) identify the section.',
      MEDIUM,
      'Building Drawing'
    ),
    // Developments
    mcq(
      'What is a "development" in technical drawing?',
      [
        { label: 'A', value: 'A 3D drawing of an object', isCorrect: false },
        { label: 'B', value: 'The flat pattern of a 3D object when all its surfaces are laid out on a single plane', isCorrect: true },
        { label: 'C', value: 'A type of section view', isCorrect: false },
        { label: 'D', value: 'A building plan', isCorrect: false },
      ],
      'A development shows the true shape of all faces of a 3D object laid flat on a plane. It is used in sheet metal work, packaging, and fabrication to create flat patterns that can be cut and folded into the 3D shape.',
      EASY,
      'Developments'
    ),
    mcq(
      'Which geometric solid has a development consisting of a rectangle and two identical circles?',
      [
        { label: 'A', value: 'Square pyramid', isCorrect: false },
        { label: 'B', value: 'Cylinder', isCorrect: true },
        { label: 'C', value: 'Cone', isCorrect: false },
        { label: 'D', value: 'Cube', isCorrect: false },
      ],
      'A cylinder\'s development consists of a rectangle (the curved surface unrolled, with width equal to the circumference and height equal to the cylinder\'s height) plus two circles (the top and bottom faces).',
      MEDIUM,
      'Developments'
    ),
    mcq(
      'When developing a truncated cone, what is the curved surface shape?',
      [
        { label: 'A', value: 'A full circle sector', isCorrect: false },
        { label: 'B', value: 'A portion of an annular ring (ring sector) between two concentric arcs', isCorrect: true },
        { label: 'C', value: 'A rectangle', isCorrect: false },
        { label: 'D', value: 'A triangle', isCorrect: false },
      ],
      'A truncated cone (frustum) has a development of a ring sector — the area between two concentric arcs. The inner arc radius corresponds to the top circle\'s slant height, and the outer arc corresponds to the base circle\'s slant height. This is an advanced CXC topic.',
      HARD,
      'Developments'
    ),
  ],

  // ═══════════════════════════════════════════════════════════════
  // 5. OFFICE ADMINISTRATION (CSEC-OA) — 15 Questions
  // ═══════════════════════════════════════════════════
  'CSEC-OA': [
    // The Office Environment
    mcq(
      'What is the primary function of a receptionist in an office?',
      [
        { label: 'A', value: 'To manage the company finances', isCorrect: false },
        { label: 'B', value: 'To serve as the first point of contact for visitors and callers, managing the front desk', isCorrect: true },
        { label: 'C', value: 'To write computer programs', isCorrect: false },
        { label: 'D', value: 'To recruit new employees', isCorrect: false },
      ],
      'A receptionist is often the first person visitors and callers encounter. They greet visitors, answer and direct telephone calls, handle enquiries, schedule appointments, and manage the reception area, creating a professional first impression.',
      EASY,
      'The Office Environment'
    ),
    mcq(
      'Which type of office layout arranges workstations in a large open area without dividing walls?',
      [
        { label: 'A', value: 'Enclosed (private) office layout', isCorrect: false },
        { label: 'B', value: 'Open-plan office layout', isCorrect: true },
        { label: 'C', value: 'Cellular office layout', isCorrect: false },
        { label: 'D', value: 'Virtual office layout', isCorrect: false },
      ],
      'An open-plan office has no internal walls between workstations, promoting communication, collaboration, and efficient space use. However, it can be noisy and lack privacy compared to enclosed layouts.',
      MEDIUM,
      'The Office Environment'
    ),
    // Communication
    mcq(
      'Which of the following is an example of formal communication in an office?',
      [
        { label: 'A', value: 'A memo from the manager to all staff', isCorrect: true },
        { label: 'B', value: 'Casual conversation at the water cooler', isCorrect: false },
        { label: 'C', value: 'A text message to a colleague about lunch', isCorrect: false },
        { label: 'D', value: 'Gossip about a co-worker', isCorrect: false },
      ],
      'Formal communication follows official channels and established formats — memos, business letters, reports, official emails. It is documented, professional, and follows organisational protocols. Informal communication is casual and unofficial.',
      EASY,
      'Communication'
    ),
    mcq(
      'What is the purpose of a business letter?',
      [
        { label: 'A', value: 'To communicate personal messages', isCorrect: false },
        { label: 'B', value: 'To formally communicate with external parties on business matters, creating a permanent record', isCorrect: true },
        { label: 'C', value: 'To replace verbal communication entirely', isCorrect: false },
        { label: 'D', value: 'To advertise products exclusively', isCorrect: false },
      ],
      'Business letters serve as formal, documented communication between organisations or between an organisation and individuals. They establish legal records, convey professional messages, and follow standard formats (fully-blocked style is common in CSEC).',
      MEDIUM,
      'Communication'
    ),
    // Records Management
    mcq(
      'What is the alphabetical filing system?',
      [
        { label: 'A', value: 'Files are arranged by date', isCorrect: false },
        { label: 'B', value: 'Files are arranged in order from A to Z based on name or subject', isCorrect: true },
        { label: 'C', value: 'Files are arranged by file number', isCorrect: false },
        { label: 'D', value: 'Files are arranged by colour', isCorrect: false },
      ],
      'Alphabetical filing arranges records in A-Z order by name (surname first for individuals), subject, or geographic location. It is simple and widely used but can become cumbersome with very large collections.',
      EASY,
      'Records Management'
    ),
    mcq(
      'Which filing system uses numbers assigned to each record?',
      [
        { label: 'A', value: 'Alphabetical filing', isCorrect: false },
        { label: 'B', value: 'Numeric filing', isCorrect: true },
        { label: 'C', value: 'Geographic filing', isCorrect: false },
        { label: 'D', value: 'Subject filing', isCorrect: false },
      ],
      'In numeric filing, each record is assigned a unique number and filed in numerical sequence. Methods include consecutive (serial), terminal-digit, and middle-digit systems. Numeric filing offers greater confidentiality and expansion capability than alphabetical.',
      MEDIUM,
      'Records Management'
    ),
    // Human Resources
    mcq(
      'What is a job description?',
      [
        { label: 'A', value: 'A description of the company\'s history', isCorrect: false },
        { label: 'B', value: 'A document that outlines the duties, responsibilities, and requirements of a specific job', isCorrect: true },
        { label: 'C', value: 'A contract of employment', isCorrect: false },
        { label: 'D', value: 'A performance appraisal form', isCorrect: false },
      ],
      'A job description details the job title, duties and responsibilities, reporting relationships, working conditions, and qualifications required. It differs from a job specification, which focuses on the qualities needed in the person filling the role.',
      EASY,
      'Human Resources'
    ),
    mcq(
      'What is the purpose of an induction programme for new employees?',
      [
        { label: 'A', value: 'To test the employee\'s skills', isCorrect: false },
        { label: 'B', value: 'To orient and integrate new employees into the organisation, covering policies, procedures, and workplace culture', isCorrect: true },
        { label: 'C', value: 'To negotiate the employee\'s salary', isCorrect: false },
        { label: 'D', value: 'To terminate the employee if they are not suitable', isCorrect: false },
      ],
      'An induction (orientation) programme introduces new employees to the organisation\'s mission, policies, facilities, colleagues, and safety procedures. It helps new staff settle in, understand expectations, and become productive quickly.',
      MEDIUM,
      'Human Resources'
    ),
    mcq(
      'What is the difference between recruitment and selection?',
      [
        { label: 'A', value: 'They are the same process', isCorrect: false },
        { label: 'B', value: 'Recruitment attracts and gathers a pool of applicants; selection chooses the best candidate from that pool', isCorrect: true },
        { label: 'C', value: 'Selection happens before recruitment', isCorrect: false },
        { label: 'D', value: 'Recruitment is only for management positions', isCorrect: false },
      ],
      'Recruitment is the process of attracting potential candidates (advertising, headhunting). Selection is the process of evaluating applicants (interviews, tests) and choosing the most suitable person. Recruitment casts a wide net; selection narrows it down.',
      HARD,
      'Human Resources'
    ),
    // Meetings & Conferences
    mcq(
      'What is an agenda?',
      [
        { label: 'A', value: 'The minutes of a previous meeting', isCorrect: false },
        { label: 'B', value: 'A list of items to be discussed at a meeting, usually in order of priority', isCorrect: true },
        { label: 'C', value: 'A list of all meeting attendees', isCorrect: false },
        { label: 'D', value: 'The budget for the meeting', isCorrect: false },
      ],
      'An agenda is prepared before a meeting and lists topics to be covered, the order of business, time allocations, and sometimes the responsible person for each item. It is circulated in advance so participants can prepare.',
      EASY,
      'Meetings & Conferences'
    ),
    mcq(
      'Who is responsible for taking minutes at a formal meeting?',
      [
        { label: 'A', value: 'The chairperson', isCorrect: false },
        { label: 'B', value: 'The secretary or minute-taker', isCorrect: true },
        { label: 'C', value: 'The treasurer', isCorrect: false },
        { label: 'D', value: 'The first person to arrive', isCorrect: false },
      ],
      'The secretary (or designated minute-taker) records the proceedings of a meeting in minutes. Minutes document decisions made, actions assigned, and key discussions. They serve as the official record and are approved at the next meeting.',
      EASY,
      'Meetings & Conferences'
    ),
    mcq(
      'What is the purpose of a motion at a formal meeting?',
      [
        { label: 'A', value: 'To request a break in the meeting', isCorrect: false },
        { label: 'B', value: 'A formal proposal that, if seconded and voted upon, becomes a decision of the meeting', isCorrect: true },
        { label: 'C', value: 'To introduce the chairperson', isCorrect: false },
        { label: 'D', value: 'To end the meeting immediately', isCorrect: false },
      ],
      'A motion is a formal proposal put forward by a member ("I move that..."). It must be seconded by another member before discussion and voting. If a majority votes in favour, the motion becomes a resolution (decision). This follows parliamentary procedure.',
      HARD,
      'Meetings & Conferences'
    ),
    // Technology in the Office
    mcq(
      'Which office technology device is primarily used to make copies of paper documents?',
      [
        { label: 'A', value: 'Scanner', isCorrect: false },
        { label: 'B', value: 'Photocopier', isCorrect: true },
        { label: 'C', value: 'Printer', isCorrect: false },
        { label: 'D', value: 'Projector', isCorrect: false },
      ],
      'A photocopier produces direct paper copies of documents using a xerographic process. A scanner creates digital images; a printer produces output from a computer. A multifunction device (MFD) combines printing, copying, scanning, and faxing.',
      EASY,
      'Technology in the Office'
    ),
    mcq(
      'What is a LAN in an office technology context?',
      [
        { label: 'A', value: 'A type of telephone system', isCorrect: false },
        { label: 'B', value: 'Local Area Network — connecting computers and devices within a single office or building', isCorrect: true },
        { label: 'C', value: 'A filing system', isCorrect: false },
        { label: 'D', value: 'A type of printer cable', isCorrect: false },
      ],
      'A LAN connects computers, printers, and other devices within a limited area (office, building) enabling resource sharing (files, printers, internet). It improves communication, data access, and collaboration among office staff.',
      MEDIUM,
      'Technology in the Office'
    ),
    mcq(
      'What is cloud computing and how does it benefit an office?',
      [
        { label: 'A', value: 'Computing using weather data', isCorrect: false },
        { label: 'B', value: 'Storing and accessing data and programmes over the internet instead of on local hard drives', isCorrect: true },
        { label: 'C', value: 'Using only desktop computers', isCorrect: false },
        { label: 'D', value: 'A type of computer virus', isCorrect: false },
      ],
      'Cloud computing allows offices to store data (Google Drive, Dropbox), use software (Microsoft 365), and access services via the internet. Benefits include remote access, collaboration, reduced IT infrastructure costs, automatic backups, and scalability.',
      HARD,
      'Technology in the Office'
    ),
  ],

  // ═══════════════════════════════════════════════════════════════
  // 6. EDPM (CSEC-EDPM) — 15 Questions
  // ═══════════════════════════════════════════════════════════════
  'CSEC-EDPM': [
    // Word Processing
    mcq(
      'What is the purpose of the "Justify" alignment option in a word processor?',
      [
        { label: 'A', value: 'To centre text on the page', isCorrect: false },
        { label: 'B', value: 'To align text evenly along both the left and right margins', isCorrect: true },
        { label: 'C', value: 'To make all text bold', isCorrect: false },
        { label: 'D', value: 'To remove all formatting from text', isCorrect: false },
      ],
      'Justify alignment stretches text so that each line (except the last) is equal in width, aligning with both left and right margins. It creates a clean, formal appearance commonly used in newspapers, reports, and business documents.',
      EASY,
      'Word Processing'
    ),
    mcq(
      'In Microsoft Word, what is a "style"?',
      [
        { label: 'A', value: 'The font colour only', isCorrect: false },
        { label: 'B', value: 'A predefined set of formatting attributes (font, size, spacing, alignment) that can be applied consistently', isCorrect: true },
        { label: 'C', value: 'A type of clip art', isCorrect: false },
        { label: 'D', value: 'A way to change the page orientation', isCorrect: false },
      ],
      'Styles (e.g., Heading 1, Normal, Quote) bundle multiple formatting settings into one reusable format. Using styles ensures document consistency, enables automatic Table of Contents generation, and simplifies formatting changes.',
      MEDIUM,
      'Word Processing'
    ),
    // Spreadsheets
    mcq(
      'In a spreadsheet, what does the function =SUM(A1:A10) do?',
      [
        { label: 'A', value: 'Counts the number of cells from A1 to A10', isCorrect: false },
        { label: 'B', value: 'Adds up all the values in cells A1 through A10', isCorrect: true },
        { label: 'C', value: 'Finds the average of cells A1 to A10', isCorrect: false },
        { label: 'D', value: 'Multiplies the values in cells A1 to A10', isCorrect: false },
      ],
      'The SUM function adds all numeric values in the specified range. =SUM(A1:A10) totals the values from cell A1 through A10. Other common functions include AVERAGE(), COUNT(), MAX(), and MIN().',
      EASY,
      'Spreadsheets'
    ),
    mcq(
      'What is a relative cell reference in a spreadsheet?',
      [
        { label: 'A', value: 'A cell reference that always points to the same cell regardless of where it is copied', isCorrect: false },
        { label: 'B', value: 'A cell reference that adjusts automatically when the formula is copied to another cell', isCorrect: true },
        { label: 'C', value: 'A reference to a cell on a different worksheet', isCorrect: false },
        { label: 'D', value: 'A cell that has no value', isCorrect: false },
      ],
      'A relative reference (e.g., A1) changes when copied: if =A1+B1 in C1 is copied to C2, it becomes =A2+B2. An absolute reference ($A$1) remains fixed. Mixed references ($A1 or A$1) fix only the column or row.',
      MEDIUM,
      'Spreadsheets'
    ),
    mcq(
      'What is a VLOOKUP function used for in a spreadsheet?',
      [
        { label: 'A', value: 'To vertically sort data in a column', isCorrect: false },
        { label: 'B', value: 'To search for a value in the first column of a table and return a corresponding value from another column', isCorrect: true },
        { label: 'C', value: 'To count the number of blank cells', isCorrect: false },
        { label: 'D', value: 'To create a chart from data', isCorrect: false },
      ],
      'VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup]) searches for a value in the first column of a range and returns a value from a specified column in the same row. It is essential for searching and retrieving data from large tables.',
      HARD,
      'Spreadsheets'
    ),
    // Database Management
    mcq(
      'What is a database record?',
      [
        { label: 'A', value: 'A single piece of data like a name', isCorrect: false },
        { label: 'B', value: 'A complete set of related data about one item or person, consisting of multiple fields', isCorrect: true },
        { label: 'C', value: 'The name of a database table', isCorrect: false },
        { label: 'D', value: 'A software program', isCorrect: false },
      ],
      'A record is a row in a database table containing all data about one entity. For example, an employee record contains fields: Employee ID, Name, Address, Department, Salary. A field is a single column within that record.',
      EASY,
      'Database Management'
    ),
    mcq(
      'What is a primary key in a database?',
      [
        { label: 'A', value: 'The first column in every table', isCorrect: false },
        { label: 'B', value: 'A field that uniquely identifies each record in a table', isCorrect: true },
        { label: 'C', value: 'A password to access the database', isCorrect: false },
        { label: 'D', value: 'The most important field in a table', isCorrect: false },
      ],
      'A primary key is a field (or combination of fields) whose values are unique for every record. Examples: Student ID number, ISBN, National ID. It prevents duplicate records and enables efficient data retrieval and relationships between tables.',
      MEDIUM,
      'Database Management'
    ),
    mcq(
      'What is the difference between a query and a report in database management?',
      [
        { label: 'A', value: 'A query displays raw data; a report formats the data for professional presentation', isCorrect: true },
        { label: 'B', value: 'They are the same thing', isCorrect: false },
        { label: 'C', value: 'A report is for data entry; a query is for printing', isCorrect: false },
        { label: 'D', value: 'A query creates tables; a report deletes data', isCorrect: false },
      ],
      'A query extracts specific data from tables based on criteria (e.g., "all employees in Sales earning over $50,000"). A report presents query results in a formatted, professional layout suitable for printing, with headers, grouping, totals, and branding.',
      HARD,
      'Database Management'
    ),
    // Presentations
    mcq(
      'What is a slide transition in presentation software?',
      [
        { label: 'A', value: 'Moving from one slide to the next with a visual effect', isCorrect: true },
        { label: 'B', value: 'Changing the background colour of a slide', isCorrect: false },
        { label: 'C', value: 'Adding text animation to a single slide', isCorrect: false },
        { label: 'D', value: 'Deleting a slide from the presentation', isCorrect: false },
      ],
      'Slide transitions are visual effects applied when moving between slides (e.g., fade, wipe, dissolve). They add polish to presentations but should be used sparingly — excessive transitions distract the audience from the content.',
      EASY,
      'Presentations'
    ),
    mcq(
      'What is the "6×6 rule" in presentation design?',
      [
        { label: 'A', value: 'Use 6 different fonts and 6 different colours per slide', isCorrect: false },
        { label: 'B', value: 'No more than 6 bullet points per slide, with no more than 6 words per line', isCorrect: true },
        { label: 'C', value: 'Make each slide 6 inches by 6 inches', isCorrect: false },
        { label: 'D', value: 'Present for exactly 6 minutes with 6 slides', isCorrect: false },
      ],
      'The 6×6 rule is a design guideline suggesting a maximum of 6 bullet points per slide with approximately 6 words per line. This keeps slides clean, readable, and prevents information overload, helping the audience focus on the presenter\'s message.',
      MEDIUM,
      'Presentations'
    ),
    // Internet & Email
    mcq(
      'What does the acronym "URL" stand for?',
      [
        { label: 'A', value: 'Universal Reference Link', isCorrect: false },
        { label: 'B', value: 'Uniform Resource Locator', isCorrect: true },
        { label: 'C', value: 'United Resource Location', isCorrect: false },
        { label: 'D', value: 'Unified Remote Link', isCorrect: false },
      ],
      'A URL (Uniform Resource Locator) is the web address used to locate resources on the internet, e.g., https://www.cxc.org. It consists of the protocol (https://), domain name (www.cxc.org), and optional path to specific content.',
      EASY,
      'Internet & Email'
    ),
    mcq(
      'What is "phishing" in the context of internet security?',
      [
        { label: 'A', value: 'A legitimate marketing email from a company', isCorrect: false },
        { label: 'B', value: 'A fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity in electronic communication', isCorrect: true },
        { label: 'C', value: 'A type of computer hardware', isCorrect: false },
        { label: 'D', value: 'A method of backing up data', isCorrect: false },
      ],
      'Phishing uses deceptive emails, websites, or messages that appear to come from reputable sources (banks, government agencies) to trick victims into revealing passwords, credit card numbers, or other sensitive information.',
      MEDIUM,
      'Internet & Email'
    ),
    mcq(
      'What is the difference between CC and BCC when sending an email?',
      [
        { label: 'A', value: 'CC is for carbon copies visible to all recipients; BCC is for blind carbon copies where recipients are hidden from others', isCorrect: true },
        { label: 'B', value: 'CC sends the email to the main recipient; BCC deletes the email', isCorrect: false },
        { label: 'C', value: 'CC and BCC are identical', isCorrect: false },
        { label: 'D', value: 'CC is for attachments; BCC is for text', isCorrect: false },
      ],
      'CC (Carbon Copy) recipients are visible to everyone on the email. BCC (Blind Carbon Copy) recipients receive the email but their addresses are hidden from all other recipients. BCC is used for mass mailings to protect recipient privacy.',
      HARD,
      'Internet & Email'
    ),
    // Document Management
    mcq(
      'What is version control in document management?',
      [
        { label: 'A', value: 'Keeping only the latest version of a document', isCorrect: false },
        { label: 'B', value: 'Tracking and managing changes to documents over time, maintaining a history of revisions', isCorrect: true },
        { label: 'C', value: 'Controlling who can read a document', isCorrect: false },
        { label: 'D', value: 'Converting documents to PDF format', isCorrect: false },
      ],
      'Version control tracks changes to documents, maintaining numbered versions (v1.0, v2.0, etc.) and allowing users to revert to previous versions. It prevents confusion from multiple drafts and ensures accountability for edits.',
      MEDIUM,
      'Document Management'
    ),
    mcq(
      'What is the purpose of file naming conventions in an office?',
      [
        { label: 'A', value: 'To make files harder to find', isCorrect: false },
        { label: 'B', value: 'To ensure files are named consistently for easy identification, searching, and organisation', isCorrect: true },
        { label: 'C', value: 'To reduce the number of files on a computer', isCorrect: false },
        { label: 'D', value: 'To encrypt files for security', isCorrect: false },
      ],
      'File naming conventions (e.g., YYYY-MM-DD_DocumentName_v1) ensure files are easily identifiable, sortable, and searchable. Consistent naming prevents confusion, supports collaboration, and enables efficient document retrieval.',
      EASY,
      'Document Management'
    ),
  ],

  // ═══════════════════════════════════════════════════════════════
  // 7. MUSIC (CSEC-MUSIC) — 15 Questions
  // ═══════════════════════════════════════════════════════════════
  'CSEC-MUSIC': [
    // Music Theory
    mcq(
      'How many semitones are there in one octave?',
      [
        { label: 'A', value: '7', isCorrect: false },
        { label: 'B', value: '12', isCorrect: true },
        { label: 'C', value: '8', isCorrect: false },
        { label: 'D', value: '10', isCorrect: false },
      ],
      'An octave spans 12 semitones (half steps). For example, from C to the next C: C-C#-D-D#-E-F-F#-G-G#-A-A#-B-C. There are 8 diatonic notes (letter names) but 12 chromatic semitones in a full octave.',
      EASY,
      'Music Theory'
    ),
    mcq(
      'What is a triad?',
      [
        { label: 'A', value: 'A single note played loudly', isCorrect: false },
        { label: 'B', value: 'A three-note chord consisting of a root, third, and fifth', isCorrect: true },
        { label: 'C', value: 'A type of musical scale', isCorrect: false },
        { label: 'D', value: 'A rhythmic pattern in 3/4 time', isCorrect: false },
      ],
      'A triad is a three-note chord built by stacking alternating intervals of a third. The four main types are: Major (root-major third-perfect fifth), Minor (root-minor third-perfect fifth), Diminished (root-minor third-diminished fifth), and Augmented.',
      MEDIUM,
      'Music Theory'
    ),
    mcq(
      'What is the key signature of D major?',
      [
        { label: 'A', value: 'No sharps or flats', isCorrect: false },
        { label: 'B', value: 'Two sharps (F# and C#)', isCorrect: true },
        { label: 'C', value: 'Two flats (Bb and Eb)', isCorrect: false },
        { label: 'D', value: 'Three sharps (F#, C#, G#)', isCorrect: false },
      ],
      'The key of D major has two sharps: F# and C#. This can be determined using the Circle of Fifths or by building the D major scale (D-E-F#-G-A-B-C#-D), which requires F# and C# to maintain the whole-whole-half-whole-whole-whole-half pattern.',
      HARD,
      'Music Theory'
    ),
    // Music Appreciation
    mcq(
      'Which musical period is characterised by ornate, elaborate compositions and the development of the orchestra?',
      [
        { label: 'A', value: 'Medieval period', isCorrect: false },
        { label: 'B', value: 'Baroque period (approximately 1600-1750)', isCorrect: true },
        { label: 'C', value: 'Romantic period', isCorrect: false },
        { label: 'D', value: 'Modern period', isCorrect: false },
      ],
      'The Baroque period (1600-1750) featured ornate decoration, counterpoint, basso continuo, and the birth of opera, oratorio, and the concerto. Key composers include Bach, Handel, and Vivaldi. The orchestra began to take shape during this era.',
      MEDIUM,
      'Music Appreciation'
    ),
    mcq(
      'What is "call and response" in music?',
      [
        { label: 'A', value: 'When two musicians play the same melody simultaneously', isCorrect: false },
        { label: 'B', value: 'A musical phrase from one voice or instrument is answered by another', isCorrect: true },
        { label: 'C', value: 'A type of musical notation', isCorrect: false },
        { label: 'D', value: 'A technique for tuning instruments', isCorrect: false },
      ],
      'Call and response is a musical form where a leader\'s phrase (call) is answered by a group or another musician (response). It is fundamental to African music, African-American spirituals, gospel, reggae, and many Caribbean musical traditions.',
      EASY,
      'Music Appreciation'
    ),
    // Performance
    mcq(
      'What is "sight-reading" in music?',
      [
        { label: 'A', value: 'Performing a piece from memory', isCorrect: false },
        { label: 'B', value: 'Performing a piece of music at first sight without prior rehearsal', isCorrect: true },
        { label: 'C', value: 'Reading music reviews', isCorrect: false },
        { label: 'D', value: 'Writing music notation', isCorrect: false },
      ],
      'Sight-reading is the ability to perform a previously unseen piece of music fluently and accurately on first attempt. It requires strong note-reading skills, rhythmic understanding, and musical intuition. It is a key CSEC Music practical skill.',
      EASY,
      'Performance'
    ),
    mcq(
      'What is the difference between staccato and legato articulation?',
      [
        { label: 'A', value: 'Staccato notes are short and detached; legato notes are smooth and connected', isCorrect: true },
        { label: 'B', value: 'Staccato is loud; legato is soft', isCorrect: false },
        { label: 'C', value: 'Staccato is fast; legato is slow', isCorrect: false },
        { label: 'D', value: 'There is no difference', isCorrect: false },
      ],
      'Staccato (marked with dots above/below notes) means each note is shortened and detached from the next. Legato (marked with a slur) means notes are played smoothly and connected, with no gap between them. Both are fundamental expressive techniques.',
      MEDIUM,
      'Performance'
    ),
    mcq(
      'What is a cadence in music?',
      [
        { label: 'A', value: 'A type of drum beat', isCorrect: false },
        { label: 'B', value: 'A chord progression that ends a musical phrase, section, or piece', isCorrect: true },
        { label: 'C', value: 'The speed of a piece of music', isCorrect: false },
        { label: 'D', value: 'A type of musical scale', isCorrect: false },
      ],
      'A cadence is a progression of chords that creates a sense of resolution. Common types: Perfect (V-I, strong resolution), Plagal (IV-I, "Amen" cadence), Imperfect (I-V, ending on V for continuation), and Deceptive (V-vi, unexpected resolution).',
      HARD,
      'Performance'
    ),
    // Composition & Arrangement
    mcq(
      'What is a motif in music composition?',
      [
        { label: 'A', value: 'A complete song', isCorrect: false },
        { label: 'B', value: 'A short, recurring musical idea or fragment that is developed throughout a composition', isCorrect: true },
        { label: 'C', value: 'A type of musical instrument', isCorrect: false },
        { label: 'D', value: 'The title of a piece', isCorrect: false },
      ],
      'A motif is the smallest identifiable musical idea — a brief melodic, rhythmic, or harmonic fragment that serves as a building block for a composition. Beethoven\'s Fifth Symphony opens with one of the most famous motifs in music: short-short-short-long.',
      EASY,
      'Composition & Arrangement'
    ),
    mcq(
      'What does transposition mean in music?',
      [
        { label: 'A', value: 'Changing the tempo of a piece', isCorrect: false },
        { label: 'B', value: 'Changing a piece of music from one key to another while preserving the intervals', isCorrect: true },
        { label: 'C', value: 'Playing a piece backwards', isCorrect: false },
        { label: 'D', value: 'Converting a melody to chords', isCorrect: false },
      ],
      'Transposition shifts an entire piece up or down in pitch while maintaining the same interval relationships between notes. It is used to accommodate different vocal ranges, instruments, or to change the key for musical purposes.',
      MEDIUM,
      'Composition & Arrangement'
    ),
    mcq(
      'What is modulation in music composition?',
      [
        { label: 'A', value: 'Changing the time signature mid-piece', isCorrect: false },
        { label: 'B', value: 'Changing from one key to another within a composition', isCorrect: true },
        { label: 'C', value: 'Switching instruments during a performance', isCorrect: false },
        { label: 'D', value: 'Changing the volume gradually', isCorrect: false },
      ],
      'Modulation is the process of changing from one key to another within a piece. Common methods include pivot chord modulation (a chord common to both keys serves as the bridge), phrase modulation (direct shift at a phrase boundary), and chromatic modulation.',
      HARD,
      'Composition & Arrangement'
    ),
    // Caribbean Music
    mcq(
      'Which Caribbean music genre originated in Jamaica and is characterised by a strong offbeat rhythm (skank) and socially conscious lyrics?',
      [
        { label: 'A', value: 'Calypso', isCorrect: false },
        { label: 'B', value: 'Reggae', isCorrect: true },
        { label: 'C', value: 'Salsa', isCorrect: false },
        { label: 'D', value: 'Soca', isCorrect: false },
      ],
      'Reggae originated in Jamaica in the late 1960s, evolving from ska and rocksteady. It features offbeat rhythms (the "skank"), deep bass lines, and lyrics often addressing social justice, spirituality (Rastafari), and everyday life. Bob Marley is its most famous exponent.',
      EASY,
      'Caribbean Music'
    ),
    mcq(
      'What is the difference between calypso and soca?',
      [
        { label: 'A', value: 'They are the same genre', isCorrect: false },
        { label: 'B', value: 'Calypso is a slower, lyric-focused Trinidadian genre; soca is a faster, dance-oriented evolution of calypso with greater emphasis on rhythm', isCorrect: true },
        { label: 'C', value: 'Calypso comes from Jamaica; soca from Barbados', isCorrect: false },
        { label: 'D', value: 'Soca is older than calypso', isCorrect: false },
      ],
      'Calypso originated in Trinidad & Tobago as a storytelling and social commentary genre. Soca (soul + calypso), created by Lord Shorty in the 1970s, is faster and more dance-oriented. Soca is the dominant Carnival music across the Caribbean today.',
      MEDIUM,
      'Caribbean Music'
    ),
    // Music Technology
    mcq(
      'What is MIDI in music technology?',
      [
        { label: 'A', value: 'A type of audio file format for recording sound', isCorrect: false },
        { label: 'B', value: 'Musical Instrument Digital Interface — a protocol for communicating musical performance data between devices', isCorrect: true },
        { label: 'C', value: 'A brand of microphone', isCorrect: false },
        { label: 'D', value: 'A type of speaker', isCorrect: false },
      ],
      'MIDI (Musical Instrument Digital Interface) is a technical standard that allows electronic instruments, computers, and other devices to communicate. It transmits performance data (note on/off, velocity, pitch) but NOT actual audio — it triggers sounds on receiving devices.',
      MEDIUM,
      'Music Technology'
    ),
    mcq(
      'What is the function of a mixing console (mixer) in a recording studio?',
      [
        { label: 'A', value: 'To play only pre-recorded CDs', isCorrect: false },
        { label: 'B', value: 'To combine, adjust, and balance multiple audio signals for recording or live performance', isCorrect: true },
        { label: 'C', value: 'To tune musical instruments', isCorrect: false },
        { label: 'D', value: 'To store digital music files', isCorrect: false },
      ],
      'A mixing console allows engineers to control the volume, EQ (tone), panning, and effects of multiple audio channels simultaneously. Each channel has controls for gain, EQ, auxiliary sends, and faders for level adjustment during mixing.',
      EASY,
      'Music Technology'
    ),
  ],

  // ═══════════════════════════════════════════════════════════════
  // 8. VISUAL ARTS (CSEC-VA) — 15 Questions
  // ═══════════════════════════════════════════════════════════════
  'CSEC-VA': [
    // Drawing
    mcq(
      'What is contour drawing?',
      [
        { label: 'A', value: 'Colouring within the lines', isCorrect: false },
        { label: 'B', value: 'Drawing the outline and visible edges of a subject by carefully observing and following its contours', isCorrect: true },
        { label: 'C', value: 'Drawing using only straight lines', isCorrect: false },
        { label: 'D', value: 'Tracing a photograph', isCorrect: false },
      ],
      'Contour drawing focuses on drawing the outer edge (contour) and inner edges of a form by carefully moving the pencil along the perceived outline. Blind contour drawing (without looking at the paper) trains hand-eye coordination and observation skills.',
      EASY,
      'Drawing'
    ),
    mcq(
      'What is chiaroscuro in drawing?',
      [
        { label: 'A', value: 'A type of paper texture', isCorrect: false },
        { label: 'B', value: 'The use of strong contrasts between light and dark to create the illusion of three-dimensional form', isCorrect: true },
        { label: 'C', value: 'A drawing technique using only lines', isCorrect: false },
        { label: 'D', value: 'A method of framing artwork', isCorrect: false },
      ],
      'Chiaroscuro (Italian for "light-dark") uses dramatic contrasts of light and shadow to model three-dimensional forms on a flat surface. Leonardo da Vinci and Caravaggio were masters of this technique, which creates depth, volume, and dramatic atmosphere.',
      MEDIUM,
      'Drawing'
    ),
    // Painting
    mcq(
      'Which of the following is a primary colour in painting?',
      [
        { label: 'A', value: 'Green', isCorrect: false },
        { label: 'B', value: 'Orange', isCorrect: false },
        { label: 'C', value: 'Red', isCorrect: true },
        { label: 'D', value: 'Purple', isCorrect: false },
      ],
      'The primary colours in the traditional (RBY) colour wheel are Red, Yellow, and Blue. These cannot be created by mixing other colours. When combined, they produce secondary colours: Orange (R+Y), Green (Y+B), and Purple/Violet (R+B).',
      EASY,
      'Painting'
    ),
    mcq(
      'What is an underpainting?',
      [
        { label: 'A', value: 'A painting done beneath another painting on the same canvas', isCorrect: false },
        { label: 'B', value: 'An initial layer of paint applied to establish values, composition, and colour relationships before detailed work', isCorrect: true },
        { label: 'C', value: 'The frame behind a painting', isCorrect: false },
        { label: 'D', value: 'A type of varnish', isCorrect: false },
      ],
      'An underpainting is the first layer of paint on a canvas, typically a monochrome (single colour) study that establishes the tonal values and composition. It serves as a foundation for subsequent layers, helping artists plan light and dark areas.',
      MEDIUM,
      'Painting'
    ),
    // Printmaking
    mcq(
      'What is a relief print?',
      [
        { label: 'A', value: 'A print made by carving away the non-image areas and inking the raised surface', isCorrect: true },
        { label: 'B', value: 'A print made by pressing paper onto a flat surface', isCorrect: false },
        { label: 'C', value: 'A photograph printed on canvas', isCorrect: false },
        { label: 'D', value: 'A painting that has been photographed', isCorrect: false },
      ],
      'In relief printing, the artist carves away the areas not meant to receive ink, leaving the image raised. Ink is applied to the raised surface, paper is pressed onto it, and the image transfers. Woodcut and linocut are common relief techniques.',
      EASY,
      'Printmaking'
    ),
    mcq(
      'What is an intaglio printmaking technique?',
      [
        { label: 'A', value: 'Ink is applied to the raised surface of a block', isCorrect: false },
        { label: 'B', value: 'The image is incised (cut) into a plate, ink is pushed into the grooves, and the surface is wiped clean before printing', isCorrect: true },
        { label: 'C', value: 'A photograph is used to create the print', isCorrect: false },
        { label: 'D', value: 'Only one print can be made from the plate', isCorrect: false },
      ],
      'Intaglio (Italian for "cut in") techniques include etching, engraving, and drypoint. The image is cut into a metal plate, ink is forced into the incised lines, the surface is wiped clean, and paper is pressed into the grooves under high pressure to transfer the ink.',
      HARD,
      'Printmaking'
    ),
    mcq(
      'What is screen printing (serigraphy)?',
      [
        { label: 'A', value: 'Printing with a regular inkjet printer', isCorrect: false },
        { label: 'B', value: 'A technique where ink is forced through a stencil-masked mesh screen onto paper or fabric', isCorrect: true },
        { label: 'C', value: 'Making prints from photographs', isCorrect: false },
        { label: 'D', value: 'Carving images into wood blocks', isCorrect: false },
      ],
      'Screen printing uses a mesh screen stretched over a frame. Parts of the screen are blocked with a stencil, and ink is pushed through the open areas with a squeegee. Each colour requires a separate screen. It is widely used for posters, T-shirts, and fabric printing.',
      MEDIUM,
      'Printmaking'
    ),
    // Sculpture & Ceramics
    mcq(
      'What is the coil method in ceramics?',
      [
        { label: 'A', value: 'Rolling clay flat and cutting shapes', isCorrect: false },
        { label: 'B', value: 'Building forms by rolling clay into long ropes (coils) and stacking them', isCorrect: true },
        { label: 'C', value: 'Spinning clay on a wheel', isCorrect: false },
        { label: 'D', value: 'Pouring liquid clay into a mould', isCorrect: false },
      ],
      'The coil method is one of the oldest pottery techniques. Clay is rolled into long, snake-like coils that are placed on top of each other and joined by scoring and slipping. Coils are smoothed to create walls for pots, bowls, and sculptural forms.',
      EASY,
      'Sculpture & Ceramics'
    ),
    mcq(
      'What is the difference between bisque firing and glaze firing in ceramics?',
      [
        { label: 'A', value: 'They are the same process', isCorrect: false },
        { label: 'B', value: 'Bisque firing hardens unfired (green) clay; glaze firing melts a glassy coating onto the bisque-fired piece', isCorrect: true },
        { label: 'C', value: 'Bisque firing adds colour; glaze firing removes colour', isCorrect: false },
        { label: 'D', value: 'Glaze firing is done before bisque firing', isCorrect: false },
      ],
      'Bisque firing (first firing, 900-1000°C) hardens dried clay (greenware) into a porous ceramic. Glaze firing (second firing, 1000-1300°C) melts the applied glaze into a glassy, waterproof surface. Both firings are essential in ceramic production.',
      MEDIUM,
      'Sculpture & Ceramics'
    ),
    mcq(
      'What is "armature" in sculpture?',
      [
        { label: 'A', value: 'The base or pedestal of a sculpture', isCorrect: false },
        { label: 'B', value: 'An internal framework or skeleton that supports the sculptural material during modelling', isCorrect: true },
        { label: 'C', value: 'The final coat of paint on a sculpture', isCorrect: false },
        { label: 'D', value: 'A type of clay', isCorrect: false },
      ],
      'An armature is a structural frame (usually wire, wood, or metal) built inside a sculpture to support the weight of modelling materials like clay, plaster, or wax. It prevents large or complex forms from collapsing during creation and drying.',
      HARD,
      'Sculpture & Ceramics'
    ),
    // Textile & Fibre Arts
    mcq(
      'What is batik?',
      [
        { label: 'A', value: 'A type of weaving pattern', isCorrect: false },
        { label: 'B', value: 'A wax-resist dyeing technique applied to cloth', isCorrect: true },
        { label: 'C', value: 'A type of embroidery stitch', isCorrect: false },
        { label: 'D', value: 'A method of knitting', isCorrect: false },
      ],
      'Batik is a textile art originating from Indonesia in which hot wax is applied to fabric in patterns, then the fabric is dyed. The wax resists the dye, creating the design. Multiple wax-dye cycles create complex, multi-coloured patterns.',
      EASY,
      'Textile & Fibre Arts'
    ),
    mcq(
      'What is the difference between warp and weft in weaving?',
      [
        { label: 'A', value: 'Warp and weft are the same threads', isCorrect: false },
        { label: 'B', value: 'Warp threads run vertically (lengthwise); weft threads are woven horizontally across the warp', isCorrect: true },
        { label: 'C', value: 'Warp threads are always coloured; weft threads are always white', isCorrect: false },
        { label: 'D', value: 'Weft threads run vertically; warp threads run horizontally', isCorrect: false },
      ],
      'In weaving, the warp is the set of lengthwise threads held under tension on the loom. The weft is the thread drawn horizontally through the warp, over and under, to create fabric. The interlacing pattern determines the weave structure (plain, twill, satin).',
      MEDIUM,
      'Textile & Fibre Arts'
    ),
    // Art Appreciation & History
    mcq(
      'Which Caribbean artist is famous for the painting "The Purple Mango" and is associated with the Jamaican art movement?',
      [
        { label: 'A', value: 'Frida Kahlo', isCorrect: false },
        { label: 'B', value: 'Edna Manley', isCorrect: true },
        { label: 'C', value: 'Pablo Picasso', isCorrect: false },
        { label: 'D', value: 'Vincent van Gogh', isCorrect: false },
      ],
      'Edna Manley (1900-1987) is a renowned Jamaican artist and sculptor who significantly influenced Caribbean art. She was instrumental in establishing the Jamaica School of Art (now the Edna Manley College of the Visual and Performing Arts) and championed Jamaican cultural identity through her work.',
      MEDIUM,
      'Art Appreciation & History'
    ),
    mcq(
      'What is the purpose of an art critique?',
      [
        { label: 'A', value: 'To only say negative things about an artwork', isCorrect: false },
        { label: 'B', value: 'To describe, analyse, interpret, and evaluate a work of art using a structured process', isCorrect: true },
        { label: 'C', value: 'To copy another artist\'s work', isCorrect: false },
        { label: 'D', value: 'To determine the monetary value of an artwork', isCorrect: false },
      ],
      'An art critique follows four stages: Description (what do you see?), Analysis (how is the work organised using elements and principles?), Interpretation (what is the meaning or message?), and Evaluation (is the work successful based on criteria?). This is a key CSEC Visual Arts skill.',
      HARD,
      'Art Appreciation & History'
    ),
    mcq(
      'Which of the following is one of the elements of art?',
      [
        { label: 'A', value: 'Rhythm', isCorrect: false },
        { label: 'B', value: 'Balance', isCorrect: false },
        { label: 'C', value: 'Texture', isCorrect: true },
        { label: 'D', value: 'Proportion', isCorrect: false },
      ],
      'The seven elements of art are: Line, Shape, Form, Space, Value, Colour, and Texture. Rhythm, Balance, Proportion, Emphasis, Variety, Unity, and Pattern are principles of design — they describe HOW the elements are used, not the elements themselves.',
      EASY,
      'Art Appreciation & History'
    ),
  ],
}

// ── Main ──────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Seeding 8 new CSEC subjects (Part 2) into the database...\n')

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
