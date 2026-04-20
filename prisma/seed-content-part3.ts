// seed-content-part3.ts
// Additional curriculum-aligned MCQ questions for CSEC Geography, CAPE Pure Mathematics Unit 1, and CAPE Caribbean Studies

const EASY: 'EASY' = 'EASY'
const MEDIUM: 'MEDIUM' = 'MEDIUM'
const HARD: 'HARD' = 'HARD'

function mcq(
  content: string,
  options: { label: string; value: string; isCorrect: boolean }[],
  explanation: string,
  difficulty: 'EASY' | 'MEDIUM' | 'HARD',
  topicName: string,
  source?: string
) {
  return { content, options, explanation, difficulty, topicName, source }
}

// ============================================================
// CSEC GEOGRAPHY - 30 Additional Questions
// ============================================================

export const EXTRA_QUESTIONS_GEOG = [
  // --- Map Reading (5 questions) ---
  mcq(
    'On a topographic map, contour lines that are very close together indicate which of the following?',
    [
      { label: 'A', value: 'A flat or gently sloping area', isCorrect: false },
      { label: 'B', value: 'A steep slope', isCorrect: true },
      { label: 'C', value: 'A river valley', isCorrect: false },
      { label: 'D', value: 'A plateau', isCorrect: false },
    ],
    'Contour lines spaced closely together show a steep gradient, while widely spaced lines indicate a gentle slope. The closer the lines, the steeper the terrain.',
    EASY,
    'Map Reading'
  ),
  mcq(
    'A spot height of 347 m on a map means that:',
    [
      { label: 'A', value: 'The entire area shown is at 347 m above sea level', isCorrect: false },
      { label: 'B', value: 'The exact point marked is at 347 m above sea level', isCorrect: true },
      { label: 'C', value: 'The highest point in the grid square is 347 m', isCorrect: false },
      { label: 'D', value: 'The lowest point in the grid square is 347 m', isCorrect: false },
    ],
    'A spot height is a precise point on a map where the exact elevation has been surveyed and recorded, indicated by a dot with the height value beside it.',
    EASY,
    'Map Reading'
  ),
  mcq(
    'To calculate the gradient between two points on a map, which formula is used?',
    [
      { label: 'A', value: 'Gradient = horizontal distance ÷ vertical difference', isCorrect: false },
      { label: 'B', value: 'Gradient = vertical difference ÷ horizontal distance', isCorrect: true },
      { label: 'C', value: 'Gradient = vertical difference × horizontal distance', isCorrect: false },
      { label: 'D', value: 'Gradient = horizontal distance − vertical difference', isCorrect: false },
    ],
    'Gradient (or slope) is calculated as the ratio of the vertical interval (difference in height) to the horizontal equivalent (ground distance), often expressed as 1:n. This requires converting map distance to ground distance using the scale first.',
    HARD,
    'Map Reading'
  ),
  mcq(
    'In a 6-figure grid reference 456324, the point described is located:',
    [
      { label: 'A', value: 'At the exact centre of grid square 4532', isCorrect: false },
      { label: 'B', value: 'In the bottom-left corner of grid square 4532', isCorrect: false },
      { label: 'C', value: 'At a more precise location within grid square 4532', isCorrect: true },
      { label: 'D', value: 'At the junction of eastings 45 and northings 32', isCorrect: false },
    ],
    'A 6-figure grid reference subdivides a 4-figure grid square into tenths. The first three digits (456) specify the easting and the last three (324) specify the northing, giving a precision of 1/100th of a grid square.',
    HARD,
    'Map Reading'
  ),
  mcq(
    'On a 1:50 000 topographic map, a measured distance of 8 cm between two settlements represents an actual ground distance of:',
    [
      { label: 'A', value: '0.4 km', isCorrect: false },
      { label: 'B', value: '4 km', isCorrect: true },
      { label: 'C', value: '8 km', isCorrect: false },
      { label: 'D', value: '40 km', isCorrect: false },
    ],
    'At a scale of 1:50 000, 1 cm on the map represents 50 000 cm (0.5 km) on the ground. Therefore, 8 cm × 0.5 km = 4 km actual distance.',
    MEDIUM,
    'Map Reading'
  ),

  // --- Climate & Weather (5 questions) ---
  mcq(
    'Which weather instrument is used to measure atmospheric pressure?',
    [
      { label: 'A', value: 'Thermometer', isCorrect: false },
      { label: 'B', value: 'Anemometer', isCorrect: false },
      { label: 'C', value: 'Barometer', isCorrect: true },
      { label: 'D', value: 'Rain gauge', isCorrect: false },
    ],
    'A barometer measures atmospheric pressure. A rising barometer indicates improving weather (high pressure), while a falling barometer suggests approaching storms (low pressure).',
    EASY,
    'Climate & Weather'
  ),
  mcq(
    'An anemometer is an instrument used to measure:',
    [
      { label: 'A', value: 'Rainfall', isCorrect: false },
      { label: 'B', value: 'Wind speed', isCorrect: true },
      { label: 'C', value: 'Temperature', isCorrect: false },
      { label: 'D', value: 'Humidity', isCorrect: false },
    ],
    'An anemometer measures wind speed. It typically consists of rotating cups that spin faster as wind speed increases, with the rotation converted into a speed reading.',
    EASY,
    'Climate & Weather'
  ),
  mcq(
    'Biological weathering is best described as:',
    [
      { label: 'A', value: 'The breakdown of rock by changes in temperature', isCorrect: false },
      { label: 'B', value: 'The breakdown of rock by chemical reactions', isCorrect: false },
      { label: 'C', value: 'The breakdown of rock by plant roots and animal activity', isCorrect: true },
      { label: 'D', value: 'The breakdown of rock by moving water and ice', isCorrect: false },
    ],
    'Biological weathering occurs when living organisms such as plant roots grow into cracks in rocks, widening them, or burrowing animals and microorganisms contribute to rock disintegration.',
    MEDIUM,
    'Climate & Weather'
  ),
  mcq(
    'Soil creep is a type of mass movement that is characterised by:',
    [
      { label: 'A', value: 'The rapid downhill movement of rock and soil after heavy rain', isCorrect: false },
      { label: 'B', value: 'The very slow, imperceptible downhill movement of soil', isCorrect: true },
      { label: 'C', value: 'The rotational slipping of a block of land along a curved surface', isCorrect: false },
      { label: 'D', value: 'The free-falling of rocks from a cliff face', isCorrect: false },
    ],
    'Soil creep is the slowest form of mass movement, often barely noticeable, caused by repeated wetting and drying, freezing and thawing, or gravity acting on soil on a slope. Fence posts and trees may tilt downslope as evidence.',
    MEDIUM,
    'Climate & Weather'
  ),
  mcq(
    'Which type of weathering is most dominant in tropical Caribbean climates?',
    [
      { label: 'A', value: 'Frost shattering', isCorrect: false },
      { label: 'B', value: 'Chemical weathering', isCorrect: true },
      { label: 'C', value: 'Exfoliation due to temperature changes', isCorrect: false },
      { label: 'D', value: 'Freeze-thaw weathering', isCorrect: false },
    ],
    'Chemical weathering, particularly through hydrolysis and carbonation, dominates in the warm, humid tropical Caribbean climate because high temperatures and abundant rainfall accelerate chemical reactions that break down rock.',
    HARD,
    'Climate & Weather'
  ),

  // --- Plate Tectonics (5 questions) ---
  mcq(
    'At a divergent plate boundary, two tectonic plates:',
    [
      { label: 'A', value: 'Move towards each other', isCorrect: false },
      { label: 'B', value: 'Move apart from each other', isCorrect: true },
      { label: 'C', value: 'Slide horizontally past each other', isCorrect: false },
      { label: 'D', value: 'Remain stationary relative to one another', isCorrect: false },
    ],
    'At divergent boundaries, plates move apart and magma rises from the mantle to fill the gap, forming new crust. This process occurs at mid-ocean ridges such as the Mid-Atlantic Ridge.',
    EASY,
    'Plate Tectonics'
  ),
  mcq(
    'The Caribbean Plate is primarily bordered by which type of plate boundary to its east?',
    [
      { label: 'A', value: 'A divergent boundary at the Mid-Atlantic Ridge', isCorrect: false },
      { label: 'B', value: 'A transform boundary with the South American Plate', isCorrect: false },
      { label: 'C', value: 'A subduction zone where the North American Plate dives beneath it', isCorrect: true },
      { label: 'D', value: 'A continental collision zone', isCorrect: false },
    ],
    'Along the eastern edge of the Caribbean, the North American Plate subducts beneath the Caribbean Plate, forming the Lesser Antilles volcanic island arc. This subduction zone is responsible for volcanic and seismic activity in the region.',
    HARD,
    'Plate Tectonics'
  ),
  mcq(
    'The Richter scale is used to measure:',
    [
      { label: 'A', value: 'The intensity of a volcanic eruption', isCorrect: false },
      { label: 'B', value: 'The magnitude of an earthquake', isCorrect: true },
      { label: 'C', value: 'The speed of tectonic plate movement', isCorrect: false },
      { label: 'D', value: 'The depth of an ocean trench', isCorrect: false },
    ],
    'The Richter scale measures the magnitude (energy released) of an earthquake. Each whole number increase represents a tenfold increase in amplitude and approximately 31.6 times more energy released.',
    EASY,
    'Plate Tectonics'
  ),
  mcq(
    'Which volcanic hazard is most likely to affect Caribbean islands such as Montserrat?',
    [
      { label: 'A', value: 'Lahars', isCorrect: false },
      { label: 'B', value: 'Pyroclastic flows', isCorrect: true },
      { label: 'C', value: 'Lava plateau formation', isCorrect: false },
      { label: 'D', value: 'Geysers', isCorrect: false },
    ],
    'Pyroclastic flows are extremely hot, fast-moving mixtures of gas, ash, and rock fragments. The Soufrière Hills volcano on Montserrat produced devastating pyroclastic flows during its eruption from 1995 onwards, destroying the capital Plymouth.',
    MEDIUM,
    'Plate Tectonics'
  ),
  mcq(
    'At a transform plate boundary, the primary geological hazard is:',
    [
      { label: 'A', value: 'Volcanic eruptions', isCorrect: false },
      { label: 'B', value: 'Earthquakes', isCorrect: true },
      { label: 'C', value: 'Tsunami generation', isCorrect: false },
      { label: 'D', value: 'Mountain building', isCorrect: false },
    ],
    'At transform boundaries, plates slide horizontally past each other. Friction causes stress to build up until it is suddenly released as an earthquake. The San Andreas Fault in California is a well-known example.',
    MEDIUM,
    'Plate Tectonics'
  ),

  // --- Population Geography (5 questions) ---
  mcq(
    'A population pyramid with a wide base and narrow top indicates:',
    [
      { label: 'A', value: 'An ageing population with low birth rates', isCorrect: false },
      { label: 'B', value: 'A high birth rate and high death rate population', isCorrect: true },
      { label: 'C', value: 'A stable population with low growth', isCorrect: false },
      { label: 'D', value: 'A population with more elderly than young people', isCorrect: false },
    ],
    'A wide base on a population pyramid shows a large proportion of young people due to high birth rates, while the narrow top reflects high death rates and shorter life expectancy. This is typical of developing countries.',
    EASY,
    'Population Geography'
  ),
  mcq(
    'Natural increase in a population is calculated as:',
    [
      { label: 'A', value: 'Birth rate − death rate + net migration', isCorrect: false },
      { label: 'B', value: 'Birth rate − death rate', isCorrect: true },
      { label: 'C', value: 'Birth rate + death rate', isCorrect: false },
      { label: 'D', value: 'Total population ÷ land area', isCorrect: false },
    ],
    'Natural increase is the difference between the crude birth rate and crude death rate, expressed per 1 000 population per year. It does not include migration, which affects total population change.',
    MEDIUM,
    'Population Geography'
  ),
  mcq(
    'Which of the following is a push factor for migration from rural to urban areas in the Caribbean?',
    [
      { label: 'A', value: 'Availability of jobs in the city', isCorrect: false },
      { label: 'B', value: 'Better healthcare facilities in urban centres', isCorrect: false },
      { label: 'C', value: 'Lack of educational opportunities in rural areas', isCorrect: true },
      { label: 'D', value: 'Higher wages in urban industries', isCorrect: false },
    ],
    'Push factors are conditions that drive people away from their original location. Lack of educational opportunities, poor healthcare, unemployment, and limited services in rural areas are common push factors for rural-urban migration.',
    MEDIUM,
    'Population Geography'
  ),
  mcq(
    'The Demographic Transition Model (DTM) suggests that in Stage 2:',
    [
      { label: 'A', value: 'Both birth and death rates are high and stable', isCorrect: false },
      { label: 'B', value: 'Death rates fall rapidly while birth rates remain high', isCorrect: true },
      { label: 'C', value: 'Birth rates fall to match declining death rates', isCorrect: false },
      { label: 'D', value: 'Both birth and death rates are low', isCorrect: false },
    ],
    'In Stage 2 of the DTM, improvements in healthcare, sanitation, and food supply cause death rates to drop sharply, but birth rates remain high, resulting in rapid population growth. Many Caribbean nations experienced this in the mid-20th century.',
    HARD,
    'Population Geography'
  ),
  mcq(
    'Urbanisation in the Caribbean has led to all of the following EXCEPT:',
    [
      { label: 'A', value: 'Growth of informal settlements (squatter communities)', isCorrect: false },
      { label: 'B', value: 'Strain on urban infrastructure and services', isCorrect: false },
      { label: 'C', value: 'Increased agricultural output in urban areas', isCorrect: true },
      { label: 'D', value: 'Traffic congestion and pollution', isCorrect: false },
    ],
    'Urbanisation typically reduces agricultural activity within cities as land is converted to housing, industry, and roads. Increased agricultural output is not an effect of urbanisation; instead, it often declines in urbanised areas.',
    MEDIUM,
    'Population Geography'
  ),

  // --- Economic Activities (5 questions) ---
  mcq(
    'Plantation agriculture in the Caribbean is characterised by:',
    [
      { label: 'A', value: 'Small-scale farming for family consumption', isCorrect: false },
      { label: 'B', value: 'Large-scale monoculture for export', isCorrect: true },
      { label: 'C', value: 'Diverse crops grown on small plots', isCorrect: false },
      { label: 'D', value: 'Shifting cultivation practices', isCorrect: false },
    ],
    'Plantation agriculture involves large estates dedicated to a single cash crop (e.g., sugar cane, bananas) for export. It is capital-intensive, relies on hired or historical enslaved labour, and is a legacy of colonialism in the Caribbean.',
    EASY,
    'Economic Activities'
  ),
  mcq(
    'Which Caribbean country is most associated with bauxite mining?',
    [
      { label: 'A', value: 'Trinidad and Tobago', isCorrect: false },
      { label: 'B', value: 'Jamaica', isCorrect: true },
      { label: 'C', value: 'Barbados', isCorrect: false },
      { label: 'D', value: 'Grenada', isCorrect: false },
    ],
    'Jamaica is one of the world\'s leading producers of bauxite, the ore from which aluminium is extracted. Bauxite mining has been a major economic activity in Jamaica since the 1950s, centred in parishes such as Manchester and St. Ann.',
    MEDIUM,
    'Economic Activities'
  ),
  mcq(
    'The main energy resource exploited in Trinidad and Tobago is:',
    [
      { label: 'A', value: 'Solar energy', isCorrect: false },
      { label: 'B', value: 'Natural gas and petroleum', isCorrect: true },
      { label: 'C', value: 'Hydroelectric power', isCorrect: false },
      { label: 'D', value: 'Wind energy', isCorrect: false },
    ],
    'Trinidad and Tobago is the largest producer of oil and natural gas in the Caribbean. The petroleum and petrochemical industries are the backbone of its economy, including the Point Lisas industrial estate.',
    EASY,
    'Economic Activities'
  ),
  mcq(
    'Which of the following is a negative environmental impact of tourism in the Caribbean?',
    [
      { label: 'A', value: 'Creation of national parks and marine protected areas', isCorrect: false },
      { label: 'B', value: 'Degradation of coral reefs from boat anchors and pollution', isCorrect: true },
      { label: 'C', value: 'Increased funding for heritage conservation', isCorrect: false },
      { label: 'D', value: 'Growth of local handicraft industries', isCorrect: false },
    ],
    'Tourism can cause significant environmental damage, including coral reef degradation from physical contact, sediment runoff from construction, pollution from cruise ships, and habitat destruction for resort development.',
    MEDIUM,
    'Economic Activities'
  ),
  mcq(
    'Subsistence farming is best described as:',
    [
      { label: 'A', value: 'Farming that uses advanced technology and irrigation', isCorrect: false },
      { label: 'B', value: 'Farming that produces just enough food for the farmer\'s family with little surplus', isCorrect: true },
      { label: 'C', value: 'Large-scale livestock rearing for export', isCorrect: false },
      { label: 'D', value: 'Farming that specialises in a single cash crop', isCorrect: false },
    ],
    'Subsistence farming involves small plots of land worked by families using simple tools to grow food primarily for their own consumption. Any small surplus may be sold or traded locally. It is common in rural areas of developing Caribbean nations.',
    EASY,
    'Economic Activities'
  ),

  // --- Caribbean Environment (5 questions) ---
  mcq(
    'Which of the following is a major cause of deforestation in the Caribbean?',
    [
      { label: 'A', value: 'Expansion of agricultural land and logging', isCorrect: true },
      { label: 'B', value: 'Increase in protected forest reserves', isCorrect: false },
      { label: 'C', value: 'Reduction in population pressure', isCorrect: false },
      { label: 'D', value: 'Government reforestation programmes', isCorrect: false },
    ],
    'Deforestation in the Caribbean is primarily driven by clearing land for agriculture (both subsistence and commercial), logging for timber, and urban expansion. Countries like Haiti have experienced severe deforestation with serious environmental consequences.',
    MEDIUM,
    'Caribbean Environment'
  ),
  mcq(
    'Longshore drift refers to:',
    [
      { label: 'A', value: 'The movement of sand along a coast by wave action', isCorrect: true },
      { label: 'B', value: 'The deposition of sediment in deep ocean trenches', isCorrect: false },
      { label: 'C', value: 'The upward movement of ocean water along a coastline', isCorrect: false },
      { label: 'D', value: 'The erosion of cliffs by chemical weathering', isCorrect: false },
    ],
    'Longshore drift is the process by which sediment (sand and pebbles) is transported along a coastline. Waves approach the shore at an angle, carrying material up the beach in the swash and pulling it straight back in the backwash, causing net movement along the coast.',
    MEDIUM,
    'Caribbean Environment'
  ),
  mcq(
    'Coral reefs in the Caribbean are threatened by all of the following EXCEPT:',
    [
      { label: 'A', value: 'Ocean acidification', isCorrect: false },
      { label: 'B', value: 'Overfishing', isCorrect: false },
      { label: 'C', value: 'Low water temperatures', isCorrect: true },
      { label: 'D', value: 'Sediment runoff from construction', isCorrect: false },
    ],
    'Coral reefs are typically threatened by warm water temperatures (which cause coral bleaching), not low temperatures. Ocean acidification, overfishing, and sediment pollution are all major threats to Caribbean coral reef ecosystems.',
    HARD,
    'Caribbean Environment'
  ),
  mcq(
    'Sustainable development in the Caribbean requires balancing:',
    [
      { label: 'A', value: 'Economic growth, environmental protection, and social equity', isCorrect: true },
      { label: 'B', value: 'Industrial expansion, urban sprawl, and population growth', isCorrect: false },
      { label: 'C', value: 'Tourism revenue, mining profits, and deforestation', isCorrect: false },
      { label: 'D', value: 'Export earnings, foreign debt, and import substitution', isCorrect: false },
    ],
    'Sustainable development meets the needs of the present without compromising the ability of future generations to meet their own needs. It requires balancing economic development, environmental conservation, and social well-being.',
    MEDIUM,
    'Caribbean Environment'
  ),
  mcq(
    'Which river landform is created when a river flows from hard rock to soft rock, forming a step or waterfall?',
    [
      { label: 'A', value: 'An oxbow lake', isCorrect: false },
      { label: 'B', value: 'A meander', isCorrect: false },
      { label: 'C', value: 'A waterfall', isCorrect: true },
      { label: 'D', value: 'A levee', isCorrect: false },
    ],
    'Waterfalls form where a band of hard rock lies over softer rock. The river erodes the softer rock more quickly, creating a step. Over time, the waterfall retreats upstream as erosion undercuts the hard rock ledge, causing it to collapse.',
    MEDIUM,
    'Caribbean Environment'
  ),
]

// ============================================================
// CAPE PURE MATHEMATICS UNIT 1 - 30 Additional Questions
// ============================================================

export const EXTRA_QUESTIONS_PURE = [
  // --- Functions & Relations (5 questions) ---
  mcq(
    'If f(x) = 2x + 3 and g(x) = x − 1, then f ∘ g(x) is:',
    [
      { label: 'A', value: '2x + 1', isCorrect: true },
      { label: 'B', value: '2x + 2', isCorrect: false },
      { label: 'C', value: '2x + 5', isCorrect: false },
      { label: 'D', value: '2x − 1', isCorrect: false },
    ],
    'f ∘ g(x) means f(g(x)) = f(x − 1) = 2(x − 1) + 3 = 2x − 2 + 3 = 2x + 1. The composite function substitutes g(x) into f.',
    EASY,
    'Functions & Relations'
  ),
  mcq(
    'If f(x) = 3x − 5, then the inverse function f⁻¹(x) is:',
    [
      { label: 'A', value: '(x + 5) / 3', isCorrect: true },
      { label: 'B', value: '(x − 5) / 3', isCorrect: false },
      { label: 'C', value: '3x + 5', isCorrect: false },
      { label: 'D', value: '(x − 3) / 5', isCorrect: false },
    ],
    'To find f⁻¹(x), set y = 3x − 5, swap x and y to get x = 3y − 5, then solve: x + 5 = 3y, so y = (x + 5)/3. Therefore f⁻¹(x) = (x + 5)/3.',
    EASY,
    'Functions & Relations'
  ),
  mcq(
    'The domain of f(x) = √(x − 4) is:',
    [
      { label: 'A', value: 'x ≥ 0', isCorrect: false },
      { label: 'B', value: 'x > 4', isCorrect: false },
      { label: 'C', value: 'x ≥ 4', isCorrect: true },
      { label: 'D', value: 'All real numbers', isCorrect: false },
    ],
    'For √(x − 4) to be real, the expression under the square root must be non-negative: x − 4 ≥ 0, giving x ≥ 4. The domain is [4, ∞).',
    EASY,
    'Functions & Relations'
  ),
  mcq(
    'The graph of y = |2x − 6| has its vertex at:',
    [
      { label: 'A', value: '(0, 6)', isCorrect: false },
      { label: 'B', value: '(3, 0)', isCorrect: true },
      { label: 'C', value: '(6, 0)', isCorrect: false },
      { label: 'D', value: '(0, −6)', isCorrect: false },
    ],
    'For y = |2x − 6|, the vertex occurs where the expression inside the modulus is zero: 2x − 6 = 0, so x = 3. The minimum value of the function is 0, giving the vertex at (3, 0).',
    MEDIUM,
    'Functions & Relations'
  ),
  mcq(
    'If f: ℝ → ℝ where f(x) = x², then f is NOT one-one because:',
    [
      { label: 'A', value: 'f(x) is always positive', isCorrect: false },
      { label: 'B', value: 'f(1) = f(−1) = 1, so two inputs give the same output', isCorrect: true },
      { label: 'C', value: 'f(x) has no real roots', isCorrect: false },
      { label: 'D', value: 'The range of f is not all real numbers', isCorrect: false },
    ],
    'A function is one-one (injective) if different inputs always give different outputs. Since f(1) = f(−1) = 1, f is not injective on ℝ. To make it injective, we must restrict the domain to either [0, ∞) or (−∞, 0].',
    MEDIUM,
    'Functions & Relations'
  ),

  // --- Trigonometry & Circular Measure (5 questions) ---
  mcq(
    'The exact value of sin(π/6) is:',
    [
      { label: 'A', value: '1/2', isCorrect: true },
      { label: 'B', value: '√2/2', isCorrect: false },
      { label: 'C', value: '√3/2', isCorrect: false },
      { label: 'D', value: '1', isCorrect: false },
    ],
    'sin(π/6) = sin(30°) = 1/2. This is a standard trigonometric value from the first quadrant of the unit circle.',
    EASY,
    'Trigonometry & Circular Measure'
  ),
  mcq(
    'An arc of length 14 cm subtends an angle of 2 radians at the centre of a circle. The radius of the circle is:',
    [
      { label: 'A', value: '7 cm', isCorrect: true },
      { label: 'B', value: '14 cm', isCorrect: false },
      { label: 'C', value: '28 cm', isCorrect: false },
      { label: 'D', value: '3.5 cm', isCorrect: false },
    ],
    'Using the formula s = rθ where s is arc length and θ is in radians: 14 = r × 2, so r = 7 cm.',
    EASY,
    'Trigonometry & Circular Measure'
  ),
  mcq(
    'Using the identity sin²θ + cos²θ = 1, if sin θ = 3/5 and θ is acute, then cos θ equals:',
    [
      { label: 'A', value: '3/5', isCorrect: false },
      { label: 'B', value: '4/5', isCorrect: true },
      { label: 'C', value: '5/4', isCorrect: false },
      { label: 'D', value: '2/5', isCorrect: false },
    ],
    'Since sin²θ + cos²θ = 1, we have (3/5)² + cos²θ = 1, so cos²θ = 1 − 9/25 = 16/25, giving cos θ = 4/5 (positive since θ is acute).',
    MEDIUM,
    'Trigonometry & Circular Measure'
  ),
  mcq(
    'The period of the function y = 3sin(2x) is:',
    [
      { label: 'A', value: 'π', isCorrect: true },
      { label: 'B', value: '2π', isCorrect: false },
      { label: 'C', value: 'π/2', isCorrect: false },
      { label: 'D', value: '4π', isCorrect: false },
    ],
    'For y = a·sin(bx), the period is 2π/b. Here, b = 2, so the period is 2π/2 = π. The amplitude is |a| = 3.',
    MEDIUM,
    'Trigonometry & Circular Measure'
  ),
  mcq(
    'If sin 2θ = cos θ for 0 ≤ θ ≤ 2π, which of the following is a valid solution?',
    [
      { label: 'A', value: 'θ = π/6', isCorrect: true },
      { label: 'B', value: 'θ = π/3', isCorrect: false },
      { label: 'C', value: 'θ = π/4', isCorrect: false },
      { label: 'D', value: 'θ = π/2', isCorrect: false },
    ],
    'Using the identity sin 2θ = 2sin θ cos θ, we get 2sin θ cos θ = cos θ, so cos θ(2sin θ − 1) = 0. Hence cos θ = 0 or sin θ = 1/2. From sin θ = 1/2, θ = π/6 is a valid solution.',
    HARD,
    'Trigonometry & Circular Measure'
  ),

  // --- Calculus (Limits) (4 questions) ---
  mcq(
    'The value of lim(x→2) (x² − 4)/(x − 2) is:',
    [
      { label: 'A', value: '0', isCorrect: false },
      { label: 'B', value: '2', isCorrect: false },
      { label: 'C', value: '4', isCorrect: true },
      { label: 'D', value: 'Undefined', isCorrect: false },
    ],
    'Direct substitution gives 0/0 (indeterminate). Factorising: (x² − 4)/(x − 2) = (x − 2)(x + 2)/(x − 2) = x + 2 for x ≠ 2. Taking the limit as x → 2 gives 4.',
    MEDIUM,
    'Calculus (Limits)'
  ),
  mcq(
    'lim(x→∞) (3x² + 2x)/(5x² − 7) is equal to:',
    [
      { label: 'A', value: '0', isCorrect: false },
      { label: 'B', value: '3/5', isCorrect: true },
      { label: 'C', value: '∞', isCorrect: false },
      { label: 'D', value: '2/7', isCorrect: false },
    ],
    'For limits at infinity with polynomials, divide all terms by the highest power of x: (3 + 2/x)/(5 − 7/x²). As x → ∞, terms with x in the denominator approach 0, giving 3/5.',
    MEDIUM,
    'Calculus (Limits)'
  ),
  mcq(
    'The function f(x) = (x² − 1)/(x − 1) has a discontinuity at x = 1. What type of discontinuity is this?',
    [
      { label: 'A', value: 'An infinite discontinuity', isCorrect: false },
      { label: 'B', value: 'A jump discontinuity', isCorrect: false },
      { label: 'C', value: 'A removable discontinuity', isCorrect: true },
      { label: 'D', value: 'No discontinuity exists', isCorrect: false },
    ],
    'The function simplifies to f(x) = x + 1 for x ≠ 1. The limit as x → 1 is 2, so the discontinuity can be removed by defining f(1) = 2. This is a removable (point) discontinuity, also called a hole.',
    HARD,
    'Calculus (Limits)'
  ),
  mcq(
    'The left-hand limit of f(x) = |x|/x as x → 0⁻ is:',
    [
      { label: 'A', value: '1', isCorrect: false },
      { label: 'B', value: '−1', isCorrect: true },
      { label: 'C', value: '0', isCorrect: false },
      { label: 'D', value: 'Undefined', isCorrect: false },
    ],
    'For x < 0, |x| = −x, so |x|/x = −x/x = −1. Therefore lim(x→0⁻) |x|/x = −1. Since the right-hand limit is +1, the two-sided limit does not exist.',
    MEDIUM,
    'Calculus (Limits)'
  ),

  // --- Calculus (Differentiation) (6 questions) ---
  mcq(
    'Using the product rule, d/dx[x²·eˣ] is:',
    [
      { label: 'A', value: '2x·eˣ', isCorrect: false },
      { label: 'B', value: 'x²·eˣ + 2x·eˣ', isCorrect: true },
      { label: 'C', value: 'x²·eˣ − 2x·eˣ', isCorrect: false },
      { label: 'D', value: '2x·eˣ⁺¹', isCorrect: false },
    ],
    'Applying the product rule (uv)\' = u\'v + uv\': u = x², u\' = 2x; v = eˣ, v\' = eˣ. So d/dx[x²·eˣ] = 2x·eˣ + x²·eˣ = eˣ(x² + 2x).',
    MEDIUM,
    'Calculus (Differentiation)'
  ),
  mcq(
    'Using the chain rule, d/dx[sin(3x²)] is:',
    [
      { label: 'A', value: 'cos(3x²)', isCorrect: false },
      { label: 'B', value: '6x·cos(3x²)', isCorrect: true },
      { label: 'C', value: '3x²·cos(3x²)', isCorrect: false },
      { label: 'D', value: '−6x·cos(3x²)', isCorrect: false },
    ],
    'By the chain rule: d/dx[sin(u)] = cos(u)·du/dx where u = 3x². du/dx = 6x, so d/dx[sin(3x²)] = cos(3x²)·6x = 6x·cos(3x²).',
    MEDIUM,
    'Calculus (Differentiation)'
  ),
  mcq(
    'A curve has equation y = x³ − 6x² + 9x. The stationary points occur at:',
    [
      { label: 'A', value: 'x = 0 and x = 2', isCorrect: false },
      { label: 'B', value: 'x = 1 and x = 3', isCorrect: true },
      { label: 'C', value: 'x = 0 and x = 3', isCorrect: false },
      { label: 'D', value: 'x = 1 and x = 2', isCorrect: false },
    ],
    'Setting dy/dx = 3x² − 12x + 9 = 0 gives 3(x² − 4x + 3) = 3(x − 1)(x − 3) = 0, so stationary points at x = 1 and x = 3.',
    HARD,
    'Calculus (Differentiation)'
  ),
  mcq(
    'The second derivative test classifies x = 1 as which type of stationary point for y = x³ − 6x² + 9x?',
    [
      { label: 'A', value: 'Maximum', isCorrect: true },
      { label: 'B', value: 'Minimum', isCorrect: false },
      { label: 'C', value: 'Point of inflection', isCorrect: false },
      { label: 'D', value: 'Saddle point', isCorrect: false },
    ],
    'd²y/dx² = 6x − 12. At x = 1: d²y/dx² = 6(1) − 12 = −6 < 0. Since d²y/dx² < 0, the second derivative test confirms that x = 1 is a local maximum point.',
    MEDIUM,
    'Calculus (Differentiation)'
  ),
  mcq(
    'Using the quotient rule, d/dx[(x + 1)/(x − 1)] is:',
    [
      { label: 'A', value: '(x − 1 − (x + 1))/(x − 1)² = −2/(x − 1)²', isCorrect: true },
      { label: 'B', value: '2/(x − 1)²', isCorrect: false },
      { label: 'C', value: '(x + 1)·1 − (x − 1)·1)/(x − 1)²', isCorrect: false },
      { label: 'D', value: '1/(x − 1)²', isCorrect: false },
    ],
    'By the quotient rule (u/v)\' = (u\'v − uv\')/v²: u = x+1, u\' = 1; v = x−1, v\' = 1. Result: (1·(x−1) − (x+1)·1)/(x−1)² = (x−1−x−1)/(x−1)² = −2/(x−1)².',
    MEDIUM,
    'Calculus (Differentiation)'
  ),
  mcq(
    'If the radius of a sphere is increasing at 2 cm/s, the rate of increase of its volume when the radius is 5 cm is:',
    [
      { label: 'A', value: '100π cm³/s', isCorrect: false },
      { label: 'B', value: '200π cm³/s', isCorrect: true },
      { label: 'C', value: '500π cm³/s', isCorrect: false },
      { label: 'D', value: '50π cm³/s', isCorrect: false },
    ],
    'V = (4/3)πr³, so dV/dt = 4πr²·dr/dt. Given dr/dt = 2 and r = 5: dV/dt = 4π(25)(2) = 200π cm³/s.',
    HARD,
    'Calculus (Differentiation)'
  ),

  // --- Calculus (Integration) (5 questions) ---
  mcq(
    'The indefinite integral ∫(6x² + 4x − 3) dx is:',
    [
      { label: 'A', value: '2x³ + 2x² − 3x + C', isCorrect: true },
      { label: 'B', value: '6x³ + 4x² − 3x + C', isCorrect: false },
      { label: 'C', value: '3x² + 4x − 3 + C', isCorrect: false },
      { label: 'D', value: '2x³ + 2x² − 3 + C', isCorrect: false },
    ],
    'Integrating term by term: ∫6x² dx = 6(x³/3) = 2x³, ∫4x dx = 4(x²/2) = 2x², ∫(−3) dx = −3x. Combined: 2x³ + 2x² − 3x + C.',
    EASY,
    'Calculus (Integration)'
  ),
  mcq(
    'Using the substitution u = x² + 1, evaluate ∫ 2x(x² + 1)⁴ dx:',
    [
      { label: 'A', value: '(x² + 1)⁵/5 + C', isCorrect: true },
      { label: 'B', value: '(x² + 1)⁵/10 + C', isCorrect: false },
      { label: 'C', value: '2(x² + 1)⁵/5 + C', isCorrect: false },
      { label: 'D', value: '(x² + 1)⁶/6 + C', isCorrect: false },
    ],
    'Let u = x² + 1, then du = 2x dx. The integral becomes ∫ u⁴ du = u⁵/5 + C = (x² + 1)⁵/5 + C.',
    MEDIUM,
    'Calculus (Integration)'
  ),
  mcq(
    'The area enclosed between the curve y = x², the x-axis, and the lines x = 0 and x = 3 is:',
    [
      { label: 'A', value: '6 square units', isCorrect: false },
      { label: 'B', value: '9 square units', isCorrect: true },
      { label: 'C', value: '3 square units', isCorrect: false },
      { label: 'D', value: '27 square units', isCorrect: false },
    ],
    'Area = ∫₀³ x² dx = [x³/3]₀³ = 27/3 − 0 = 9 square units.',
    EASY,
    'Calculus (Integration)'
  ),

  // --- Sequences & Series (3 questions) ---
  mcq(
    'The sum of the first 10 terms of the arithmetic sequence 3, 7, 11, 15, ... is:',
    [
      { label: 'A', value: '215', isCorrect: false },
      { label: 'B', value: '210', isCorrect: true },
      { label: 'C', value: '220', isCorrect: false },
      { label: 'D', value: '200', isCorrect: false },
    ],
    'Here a = 3, d = 4, n = 10. Using S₁₀ = (n/2)(2a + (n−1)d) = (10/2)(2(3) + (9)(4)) = 5(6 + 36) = 5(42) = 210.',
    MEDIUM,
    'Sequences & Series'
  ),
  mcq(
    'The sum to infinity of the geometric series 8 + 4 + 2 + 1 + ... is:',
    [
      { label: 'A', value: '14', isCorrect: false },
      { label: 'B', value: '15', isCorrect: false },
      { label: 'C', value: '16', isCorrect: true },
      { label: 'D', value: '18', isCorrect: false },
    ],
    'Here a = 8 and r = 1/2. Since |r| < 1, S∞ = a/(1 − r) = 8/(1 − 1/2) = 8/(1/2) = 16.',
    MEDIUM,
    'Sequences & Series'
  ),
  mcq(
    'In the binomial expansion of (1 + x)⁶, the coefficient of x³ is:',
    [
      { label: 'A', value: '10', isCorrect: false },
      { label: 'B', value: '15', isCorrect: false },
      { label: 'C', value: '20', isCorrect: true },
      { label: 'D', value: '6', isCorrect: false },
    ],
    'The coefficient of x³ in (1 + x)⁶ is ⁶C₃ = 6!/(3!·3!) = (6×5×4)/(3×2×1) = 20.',
    MEDIUM,
    'Sequences & Series'
  ),

  // --- Additional Hard questions to reach 8 HARD total ---
  mcq(
    'If f(x) = x³ − 3x + 2, the set of values of x for which the function is strictly increasing is:',
    [
      { label: 'A', value: 'x > 1 or x < −1', isCorrect: true },
      { label: 'B', value: '−1 < x < 1', isCorrect: false },
      { label: 'C', value: 'x > 0', isCorrect: false },
      { label: 'D', value: 'All real numbers', isCorrect: false },
    ],
    'f\'(x) = 3x² − 3 = 3(x² − 1) = 3(x − 1)(x + 1). The function is increasing where f\'(x) > 0, i.e., x > 1 or x < −1, since the parabola 3x² − 3 opens upward with roots at x = ±1.',
    HARD,
    'Calculus (Differentiation)'
  ),
  mcq(
    'Using mathematical induction, which statement represents the base case when proving 1 + 2 + 3 + ... + n = n(n+1)/2 for all n ∈ ℕ?',
    [
      { label: 'A', value: 'Assume it is true for n = k, so 1 + 2 + ... + k = k(k+1)/2', isCorrect: false },
      { label: 'B', value: 'Show it is true for n = 1: LHS = 1, RHS = 1(2)/2 = 1 ✓', isCorrect: true },
      { label: 'C', value: 'Prove it for n = k + 1', isCorrect: false },
      { label: 'D', value: 'Set n → ∞ and check convergence', isCorrect: false },
    ],
    'The base case verifies the statement for the smallest value, typically n = 1. LHS = 1, RHS = 1(1+1)/2 = 1. Since LHS = RHS, the base case holds.',
    HARD,
    'Sequences & Series'
  ),
  mcq(
    'A point of inflection on the curve y = x⁴ − 4x³ occurs at:',
    [
      { label: 'A', value: 'x = 0', isCorrect: true },
      { label: 'B', value: 'x = 2', isCorrect: false },
      { label: 'C', value: 'x = 3', isCorrect: false },
      { label: 'D', value: 'x = 1', isCorrect: false },
    ],
    'd²y/dx² = 12x² − 24x. Setting d²y/dx² = 0: 12x(x − 2) = 0, so x = 0 or x = 2. At x = 0, d²y/dx² changes from 0 to negative and back to 0, confirming a point of inflection. At x = 2, d³y/dx³ = 24x − 24 = 24 ≠ 0 at x = 2, so both are inflection points, but x = 0 is the first.',
    HARD,
    'Calculus (Differentiation)'
  ),
  mcq(
    'If ∑(r=1 to n) r² = n(n+1)(2n+1)/6, then ∑(r=1 to 10) r² is:',
    [
      { label: 'A', value: '385', isCorrect: true },
      { label: 'B', value: '100', isCorrect: false },
      { label: 'C', value: '285', isCorrect: false },
      { label: 'D', value: '550', isCorrect: false },
    ],
    'Substituting n = 10: S = 10(11)(21)/6 = (10 × 11 × 21)/6 = 2310/6 = 385.',
    HARD,
    'Sequences & Series'
  ),
]

// ============================================================
// CAPE CARIBBEAN STUDIES - 20 Additional Questions
// ============================================================

export const EXTRA_QUESTIONS_CAPE_CS = [
  // --- Caribbean Identity (4 questions) ---
  mcq(
    'Which of the following best defines the Caribbean geographically?',
    [
      { label: 'A', value: 'All countries that were formerly British colonies', isCorrect: false },
      { label: 'B', value: 'The islands and mainland territories bordered by the Caribbean Sea', isCorrect: true },
      { label: 'C', value: 'Only the islands in the Lesser Antilles', isCorrect: false },
      { label: 'D', value: 'All Spanish-speaking countries in the Americas', isCorrect: false },
    ],
    'The geographical definition of the Caribbean includes all island states and mainland territories (such as Guyana, Suriname, and Belize) within or bordering the Caribbean Sea basin.',
    EASY,
    'Caribbean Identity'
  ),
  mcq(
    'Hybridization in Caribbean culture refers to:',
    [
      { label: 'A', value: 'The adoption of foreign customs while abandoning local traditions', isCorrect: false },
      { label: 'B', value: 'The blending of African, European, Indigenous, and Asian cultural elements', isCorrect: true },
      { label: 'C', value: 'The dominance of European cultural norms over all others', isCorrect: false },
      { label: 'D', value: 'The preservation of African culture in its original form', isCorrect: false },
    ],
    'Hybridization describes the mixing and fusion of diverse cultural traditions — African, European, Indigenous, Indian, Chinese, and Middle Eastern — to create uniquely Caribbean cultural forms in language, music, religion, and cuisine.',
    MEDIUM,
    'Caribbean Identity'
  ),
  mcq(
    'Which of the following is an example of syncretism in the Caribbean?',
    [
      { label: 'A', value: 'The celebration of American Thanksgiving', isCorrect: false },
      { label: 'B', value: 'Vodou in Haiti, which combines West African spiritual practices with Catholic saints', isCorrect: true },
      { label: 'C', value: 'The exclusive practice of Anglicanism', isCorrect: false },
      { label: 'D', value: 'The adoption of the British parliamentary system without modification', isCorrect: false },
    ],
    'Syncretism is the blending of religious or cultural beliefs from different traditions. Haitian Vodou exemplifies this by merging African spiritual systems with Roman Catholic elements, creating a distinct religious practice.',
    MEDIUM,
    'Caribbean Identity'
  ),
  mcq(
    'The debate over Creole versus Standard English in Caribbean education reflects tensions related to:',
    [
      { label: 'A', value: 'Economic development strategies only', isCorrect: false },
      { label: 'B', value: 'Cultural identity, social class, and colonial linguistic inheritance', isCorrect: true },
      { label: 'C', value: 'Tourism marketing campaigns', isCorrect: false },
      { label: 'D', value: 'International trade agreements', isCorrect: false },
    ],
    'The Creole/Standard English debate highlights deeper issues of cultural identity, class stratification, and the legacy of colonial education systems that devalued local languages. Creole (patois) is widely spoken but often excluded from formal education.',
    MEDIUM,
    'Caribbean Identity'
  ),

  // --- Culture & Society (4 questions) ---
  mcq(
    'Carnival in Trinidad and Tobago originated from which cultural traditions?',
    [
      { label: 'A', value: 'Exclusively African traditions', isCorrect: false },
      { label: 'B', value: 'A fusion of pre-Lenten European festivals and African freed slave celebrations', isCorrect: true },
      { label: 'C', value: 'Indigenous Amerindian rituals', isCorrect: false },
      { label: 'D', value: 'Asian Indian religious festivals', isCorrect: false },
    ],
    'Trinidad Carnival evolved from French Catholic planters\' pre-Lenten masquerade balls, combined with African freed slaves\' celebrations of emancipation (Canboulay). This fusion created a uniquely Caribbean cultural expression.',
    MEDIUM,
    'Culture & Society'
  ),
  mcq(
    'Caribbean cuisine as a form of cultural expression demonstrates:',
    [
      { label: 'A', value: 'That Caribbean people only eat European food', isCorrect: false },
      { label: 'B', value: 'The blending of ingredients and cooking techniques from Africa, India, Europe, and Indigenous peoples', isCorrect: true },
      { label: 'C', value: 'A complete rejection of foreign food traditions', isCorrect: false },
      { label: 'D', value: 'That Caribbean food has no international influence', isCorrect: false },
    ],
    'Caribbean cuisine — including dishes like jerk chicken, roti, pelau, callaloo, and rice and peas — reflects the region\'s multicultural heritage, with cooking methods and ingredients from Africa, India, China, Europe, and Indigenous peoples.',
    MEDIUM,
    'Culture & Society'
  ),
  mcq(
    'Cricket in the Caribbean served as a vehicle for:',
    [
      { label: 'A', value: 'Reinforcing colonial social hierarchies', isCorrect: false },
      { label: 'B', value: 'Anti-colonial resistance and regional unity through the West Indies team', isCorrect: true },
      { label: 'C', value: 'Promoting individual island nationalism over regional identity', isCorrect: false },
      { label: 'D', value: 'European cultural dominance', isCorrect: false },
    ],
    'Cricket was introduced by the British but became a powerful symbol of anti-colonial resistance and Caribbean identity. The West Indies cricket team united the region and produced legends who challenged racial barriers globally.',
    MEDIUM,
    'Culture & Society'
  ),
  mcq(
    'The colonial education system in the Caribbean was primarily designed to:',
    [
      { label: 'A', value: 'Promote critical thinking and Caribbean nationalism', isCorrect: false },
      { label: 'B', value: 'Produce a literate workforce suited for colonial administrative and economic needs', isCorrect: true },
      { label: 'C', value: 'Preserve Indigenous knowledge systems', isCorrect: false },
      { label: 'D', value: 'Educate the entire population equally', isCorrect: false },
    ],
    'Colonial education was modelled on the British system and focused on producing clerks and lower-level administrators for the colonial economy. It emphasised European history, literature, and values while marginalising Caribbean culture and knowledge.',
    MEDIUM,
    'Culture & Society'
  ),

  // --- Economic Development (4 questions) ---
  mcq(
    'The mono-crop economy legacy in the Caribbean refers to:',
    [
      { label: 'A', value: 'Economic diversification across multiple sectors', isCorrect: false },
      { label: 'B', value: 'Historical dependence on a single agricultural export crop such as sugar cane', isCorrect: true },
      { label: 'C', value: 'The development of a robust manufacturing sector', isCorrect: false },
      { label: 'D', value: 'A balanced mix of agricultural and industrial production', isCorrect: false },
    ],
    'The mono-crop economy, centred on sugar, bananas, or other single commodities, was imposed during colonialism and left Caribbean economies vulnerable to price fluctuations, natural disasters, and changing global demand.',
    EASY,
    'Economic Development'
  ),
  mcq(
    'Structural adjustment programmes imposed by the IMF on Caribbean countries typically required:',
    [
      { label: 'A', value: 'Increased government spending on social welfare', isCorrect: false },
      { label: 'B', value: 'Privatisation, reduced public spending, and trade liberalisation', isCorrect: true },
      { label: 'C', value: 'Greater restrictions on foreign investment', isCorrect: false },
      { label: 'D', value: 'Expansion of the public sector', isCorrect: false },
    ],
    'Structural adjustment programmes (SAPs) imposed conditions including privatisation of state enterprises, cuts to public spending on health and education, removal of trade barriers, and currency devaluation — often with severe social consequences.',
    HARD,
    'Economic Development'
  ),
  mcq(
    'Economic vulnerability in the Caribbean is increased by all of the following EXCEPT:',
    [
      { label: 'A', value: 'Small market size and limited resource base', isCorrect: false },
      { label: 'B', value: 'Strong industrial diversification and large domestic markets', isCorrect: true },
      { label: 'C', value: 'Susceptibility to natural disasters (hurricanes, volcanoes, earthquakes)', isCorrect: false },
      { label: 'D', value: 'Dependence on a narrow range of export products', isCorrect: false },
    ],
    'Strong industrial diversification and large domestic markets would actually reduce economic vulnerability. Caribbean nations face the opposite: small markets, limited resources, dependence on few exports, and exposure to natural disasters.',
    MEDIUM,
    'Economic Development'
  ),
  mcq(
    'Diaspora remittances contribute to Caribbean economies by:',
    [
      { label: 'A', value: 'Increasing the national debt', isCorrect: false },
      { label: 'B', value: 'Providing a significant source of foreign exchange and household income', isCorrect: true },
      { label: 'C', value: 'Reducing the need for any economic development', isCorrect: false },
      { label: 'D', value: 'Discouraging local entrepreneurship', isCorrect: false },
    ],
    'Remittances from the Caribbean diaspora (in the UK, USA, Canada) represent a major source of foreign exchange and household income for many Caribbean countries, often exceeding foreign direct investment and official development assistance.',
    MEDIUM,
    'Economic Development'
  ),

  // --- Political Development (3 questions) ---
  mcq(
    'Constitutional development in the Caribbean moved from colonial governance to independence through stages that included:',
    [
      { label: 'A', value: 'Direct transition from colonial rule to full independence', isCorrect: false },
      { label: 'B', value: 'Representative government, then responsible government, then full independence', isCorrect: true },
      { label: 'C', value: 'Military revolution followed by democratic elections', isCorrect: false },
      { label: 'D', value: 'Integration with the United States as a territory', isCorrect: false },
    ],
    'Caribbean constitutional evolution followed a pattern: Crown Colony government → representative government (elected assemblies with limited powers) → responsible government (full internal self-rule) → independence with constitutions.',
    MEDIUM,
    'Political Development'
  ),
  mcq(
    'The role of the media in Caribbean society includes all of the following EXCEPT:',
    [
      { label: 'A', value: 'Informing the public and shaping political discourse', isCorrect: false },
      { label: 'B', value: 'Serving as a watchdog against government corruption', isCorrect: false },
      { label: 'C', value: 'Dictating government policy without public consultation', isCorrect: true },
      { label: 'D', value: 'Promoting cultural expression and social awareness', isCorrect: false },
    ],
    'The media in the Caribbean plays a vital role in democracy by informing citizens, holding power accountable, and promoting culture. However, it does not dictate government policy — that remains the function of elected officials and institutions.',
    EASY,
    'Political Development'
  ),
  mcq(
    'Electoral systems in most independent Caribbean states are based on:',
    [
      { label: 'A', value: 'Proportional representation', isCorrect: false },
      { label: 'B', value: 'The first-past-the-post (winner-takes-all) system inherited from Britain', isCorrect: true },
      { label: 'C', value: 'Appointed legislatures', isCorrect: false },
      { label: 'D', value: 'Direct presidential elections', isCorrect: false },
    ],
    'Most English-speaking Caribbean countries use the first-past-the-post (FPTP) electoral system, inherited from the British Westminster model. Voters elect one representative per constituency, and the candidate with the most votes wins.',
    MEDIUM,
    'Political Development'
  ),

  // --- Globalization (3 questions) ---
  mcq(
    'Globalisation has affected Caribbean sovereignty primarily by:',
    [
      { label: 'A', value: 'Strengthening local decision-making power', isCorrect: false },
      { label: 'B', value: 'Limiting the ability of Caribbean governments to make independent economic policy decisions', isCorrect: true },
      { label: 'C', value: 'Eliminating all foreign influence', isCorrect: false },
      { label: 'D', value: 'Increasing tariffs on imports', isCorrect: false },
    ],
    'Globalisation, through institutions like the WTO, IMF, and World Bank, and through trade liberalisation agreements, has constrained Caribbean governments\' ability to set independent trade, fiscal, and industrial policies, reducing economic sovereignty.',
    HARD,
    'Globalization'
  ),
  mcq(
    'Information and Communication Technology (ICT) has contributed to Caribbean development by:',
    [
      { label: 'A', value: 'Making Caribbean countries completely self-sufficient', isCorrect: false },
      { label: 'B', value: 'Enabling new service industries such as business process outsourcing and e-commerce', isCorrect: true },
      { label: 'C', value: 'Eliminating the digital divide between Caribbean and developed nations', isCorrect: false },
      { label: 'D', value: 'Reducing the need for education and training', isCorrect: false },
    ],
    'ICT has enabled Caribbean countries to develop new economic sectors like business process outsourcing (BPO), online education, digital services, and e-commerce. Countries like Jamaica and Barbados have become regional BPO hubs.',
    MEDIUM,
    'Globalization'
  ),
  mcq(
    'The World Intellectual Property Organization (WIPO) is relevant to the Caribbean because:',
    [
      { label: 'A', value: 'It controls Caribbean national budgets', isCorrect: false },
      { label: 'B', value: 'It provides frameworks for protecting Caribbean cultural products, innovations, and traditional knowledge', isCorrect: true },
      { label: 'C', value: 'It regulates Caribbean immigration policies', isCorrect: false },
      { label: 'D', value: 'It determines Caribbean interest rates', isCorrect: false },
    ],
    'WIPO helps Caribbean nations protect intellectual property rights — patents, trademarks, copyrights — which is crucial for protecting Caribbean cultural expressions, music, art, and innovations from unauthorised exploitation by foreign entities.',
    HARD,
    'Globalization'
  ),

  // --- Regional Integration (2 questions) ---
  mcq(
    'The Caribbean Community (CARICOM) was established primarily to:',
    [
      { label: 'A', value: 'Align all Caribbean countries with European political systems', isCorrect: false },
      { label: 'B', value: 'Promote economic integration, foreign policy coordination, and functional cooperation among member states', isCorrect: true },
      { label: 'C', value: 'Create a single Caribbean military force', isCorrect: false },
      { label: 'D', value: 'Compete with the United States in global trade', isCorrect: false },
    ],
    'CARICOM, established by the Treaty of Chaguaramas in 1973, aims to promote economic integration through a common market, coordinate foreign policy, and foster cooperation in areas such as health, education, and culture among member states.',
    MEDIUM,
    'Regional Integration'
  ),
  mcq(
    'One of the greatest challenges to the future of regional integration in the Caribbean is:',
    [
      { label: 'A', value: 'Excessive economic homogeneity among member states', isCorrect: false },
      { label: 'B', value: 'Differing national interests, economic disparities, and limited political will to cede sovereignty', isCorrect: true },
      { label: 'C', value: 'The overwhelming support of all citizens for integration', isCorrect: false },
      { label: 'D', value: 'Too many shared cultural values', isCorrect: false },
    ],
    'Regional integration faces persistent challenges including the reluctance of member states to surrender sovereignty, economic disparities between larger and smaller nations, competing national interests, and insufficient implementation of treaties and agreements like the CSME.',
    HARD,
    'Regional Integration'
  ),
]
