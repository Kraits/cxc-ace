/**
 * Seed script to add CSEC History, CSEC Geography, CAPE Pure Mathematics,
 * and CAPE Caribbean Studies quiz questions and study notes to the Turso database.
 *
 * This adds 20 MCQ questions per subject plus comprehensive study notes
 * for each topic. It only INSERTS – it will not duplicate existing records.
 *
 * Run with:  npx tsx prisma/seed-humanities-cape.ts
 */
import { createClient } from '@libsql/client'
import { PrismaClient, Difficulty } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

// ─── Turso Credentials ────────────────────────────────────────────
const TURSO_URL = 'libsql://cxc-ace-endd21.aws-us-east-1.turso.io'
const TURSO_TOKEN =
  'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzY2NTEyNzUsImlkIjoiMDE5ZGE4OWYtOGQwMS03ZWRmLWFhMzYtN2YzNGNiYTQ3OTljIiwicmlkIjoiYWVhZmRlMzEtYTA1Ny00ZTYwLWEzNDEtYjRlZTg4NTI1ODFlIn0.Z-MpprbPNGoXX41qlwJd9YtaD2sXqYVt151LmLJfx9LCf4e9fx7wYgHf7hf2YZ8JZAWWnoOTRVYh0UTMdAdtDQ'

const EASY: Difficulty = 'EASY'
const MEDIUM: Difficulty = 'MEDIUM'
const HARD: Difficulty = 'HARD'

// ─── Helpers ──────────────────────────────────────────────────────
function mcq(
  content: string,
  options: { label: string; value: string; isCorrect: boolean }[],
  explanation: string,
  difficulty: Difficulty,
  topicName: string,
) {
  return {
    content,
    options: JSON.stringify(options),
    correctAnswer: options.find((o) => o.isCorrect)!.value,
    explanation,
    difficulty,
    topicName,
  }
}

// ══════════════════════════════════════════════════════════════════
//  CSEC HISTORY – 20 MCQ Questions
// ══════════════════════════════════════════════════════════════════
const HISTORY_QUESTIONS: ReturnType<typeof mcq>[] = [
  // ── The Indigenous Peoples (4 questions) ──
  mcq(
    'Which group of indigenous people were the earliest inhabitants of the Caribbean?',
    [
      { label: 'A', value: 'Tainos', isCorrect: false },
      { label: 'B', value: 'Kalinago (Caribs)', isCorrect: false },
      { label: 'C', value: 'Ciboney (Guanahatabey)', isCorrect: true },
      { label: 'D', value: 'Mayans', isCorrect: false },
    ],
    'The Ciboney (also called Guanahatabey) were the earliest known inhabitants of the Caribbean, arriving from Central America around 3000 BCE. They were followed by the Tainos and then the Kalinago.',
    MEDIUM,
    'The Indigenous Peoples',
  ),
  mcq(
    'The Tainos were part of which larger linguistic and cultural group?',
    [
      { label: 'A', value: 'Cariban', isCorrect: false },
      { label: 'B', value: 'Arawakan', isCorrect: true },
      { label: 'C', value: 'Mayan', isCorrect: false },
      { label: 'D', value: 'Aztecan', isCorrect: false },
    ],
    'The Tainos belonged to the Arawakan linguistic group. They migrated from the Orinoco River region of South America through the Lesser Antilles to the Greater Antilles.',
    MEDIUM,
    'The Indigenous Peoples',
  ),
  mcq(
    'What was the main purpose of the Taino "zemis"?',
    [
      { label: 'A', value: 'Weapons for hunting', isCorrect: false },
      { label: 'B', value: 'Religious icons representing spirits and ancestors', isCorrect: true },
      { label: 'C', value: 'Currency for trade', isCorrect: false },
      { label: 'D', value: 'Fishing tools', isCorrect: false },
    ],
    'Zemis were carved representations of spirits, ancestors, and deities used in Taino religious ceremonies. The Tainos believed zemis controlled natural forces and influenced daily life.',
    EASY,
    'The Indigenous Peoples',
  ),
  mcq(
    'Which of the following best describes the political structure of the Taino people?',
    [
      { label: 'A', value: 'A single empire ruled by one cacique', isCorrect: false },
      { label: 'B', value: 'Independent villages each led by a cacique', isCorrect: true },
      { label: 'C', value: 'A democratic assembly of all adults', isCorrect: false },
      { label: 'D', value: 'A military dictatorship', isCorrect: false },
    ],
    'The Tainos lived in independent villages called yucayeques, each governed by its own cacique (chief). There was no single unified political structure across all Taino settlements.',
    HARD,
    'The Indigenous Peoples',
  ),

  // ── European Settlement (4 questions) ──
  mcq(
    'Who was the European explorer credited with "discovering" the Caribbean in 1492?',
    [
      { label: 'A', value: 'Vasco da Gama', isCorrect: false },
      { label: 'B', value: 'Christopher Columbus', isCorrect: true },
      { label: 'C', value: 'Amerigo Vespucci', isCorrect: false },
      { label: 'D', value: 'Ferdinand Magellan', isCorrect: false },
    ],
    'Christopher Columbus, sailing under the Spanish flag, arrived in the Bahamas on October 12, 1492. This marked the beginning of sustained European contact with the Caribbean.',
    EASY,
    'European Settlement',
  ),
  mcq(
    'The Treaty of Tordesillas (1494) divided the newly discovered lands between which two countries?',
    [
      { label: 'A', value: 'England and France', isCorrect: false },
      { label: 'B', value: 'Spain and Portugal', isCorrect: true },
      { label: 'C', value: 'Spain and England', isCorrect: false },
      { label: 'D', value: 'Portugal and the Netherlands', isCorrect: false },
    ],
    'The Treaty of Tordesillas, brokered by the Pope in 1494, drew a line of demarcation granting Spain rights to lands west of the line and Portugal rights to lands east of it.',
    MEDIUM,
    'European Settlement',
  ),
  mcq(
    'Which European nation was the first to establish sugar plantations in the Caribbean using African slave labour?',
    [
      { label: 'A', value: 'England', isCorrect: false },
      { label: 'B', value: 'France', isCorrect: false },
      { label: 'C', value: 'The Netherlands', isCorrect: false },
      { label: 'D', value: 'Spain (via Hispaniola)', isCorrect: true },
    ],
    'Although the British and French later dominated Caribbean sugar production, the Spanish were the first Europeans to establish plantations in the Caribbean on the island of Hispaniola, initially using Amerindian labour before transitioning to African slaves.',
    HARD,
    'European Settlement',
  ),
  mcq(
    'What was the main motivation for European colonisation of the Caribbean?',
    [
      { label: 'A', value: 'Spreading Christianity only', isCorrect: false },
      { label: 'B', value: 'Economic wealth through the extraction of resources', isCorrect: true },
      { label: 'C', value: 'Scientific exploration', isCorrect: false },
      { label: 'D', value: 'Establishing democratic governments', isCorrect: false },
    ],
    'While religion and exploration played roles, the primary motivation was economic gain — acquiring gold, silver, and later agricultural products like sugar through the exploitation of land and labour.',
    MEDIUM,
    'European Settlement',
  ),

  // ── Slavery & Resistance (4 questions) ──
  mcq(
    'Which of the following was NOT a form of resistance used by enslaved Africans in the Caribbean?',
    [
      { label: 'A', value: 'Day-to-day sabotage of equipment', isCorrect: false },
      { label: 'B', value: 'Armed rebellion', isCorrect: false },
      { label: 'C', value: 'Running away to form maroon communities', isCorrect: false },
      { label: 'D', value: 'Voting in colonial elections', isCorrect: true },
    ],
    'Enslaved Africans had no political rights and could not vote. They resisted through armed rebellion (e.g., the 1760 Berbice Rebellion), marronage (forming Maroon communities), cultural preservation, work slowdowns, and sabotage.',
    EASY,
    'Slavery & Resistance',
  ),
  mcq(
    'The 1763 Berbice Rebellion in present-day Guyana was led by which enslaved person?',
    [
      { label: 'A', value: 'Cuffy', isCorrect: true },
      { label: 'B', value: 'Nanny of the Maroons', isCorrect: false },
      { label: 'C', value: 'Sam Sharpe', isCorrect: false },
      { label: 'D', value: 'Toussaint L\'Ouverture', isCorrect: false },
    ],
    'Cuffy, an enslaved house slave, led the 1763 Berbice Rebellion in Dutch Guiana (now Guyana). The rebellion lasted nearly a year and was one of the largest slave uprisings in the Caribbean.',
    MEDIUM,
    'Slavery & Resistance',
  ),
  mcq(
    'What was the purpose of the Slave Codes enacted in the Caribbean colonies?',
    [
      { label: 'A', value: 'To protect the rights of enslaved people', isCorrect: false },
      { label: 'B', value: 'To regulate and control the enslaved population', isCorrect: true },
      { label: 'C', value: 'To provide education for enslaved children', isCorrect: false },
      { label: 'D', value: 'To grant enslaved people the right to own property', isCorrect: false },
    ],
    'Slave Codes were laws passed by colonial assemblies to formalise the institution of slavery, restrict the movements and rights of enslaved people, and prevent rebellion. They codified brutal punishments for disobedience.',
    MEDIUM,
    'Slavery & Resistance',
  ),
  mcq(
    'Which Maroon leader is celebrated as a National Heroine of Jamaica for her role in resisting British colonisation?',
    [
      { label: 'A', value: 'Queen Nanny', isCorrect: true },
      { label: 'B', value: 'Bussa', isCorrect: false },
      { label: 'C', value: 'Kofi', isCorrect: false },
      { label: 'D', value: 'Dutty Boukman', isCorrect: false },
    ],
    'Queen Nanny was a leader of the Jamaican Maroons in the 18th century. She is credited with organising Maroon resistance against the British and is one of Jamaica\'s seven National Heroes.',
    EASY,
    'Slavery & Resistance',
  ),

  // ── Emancipation (4 questions) ──
  mcq(
    'In what year did the Slavery Abolition Act come into effect, officially ending slavery in most British colonies?',
    [
      { label: 'A', value: '1807', isCorrect: false },
      { label: 'B', value: '1834', isCorrect: true },
      { label: 'C', value: '1838', isCorrect: false },
      { label: 'D', value: '1865', isCorrect: false },
    ],
    'The Slavery Abolition Act of 1833 took effect on 1 August 1834. However, there was a four-year "apprenticeship" period before full freedom was granted on 1 August 1838.',
    MEDIUM,
    'Emancipation',
  ),
  mcq(
    'What was the "apprenticeship system" that followed emancipation in 1834?',
    [
      { label: 'A', value: 'A voluntary training programme for skilled trades', isCorrect: false },
      { label: 'B', value: 'A system that required formerly enslaved people to work for their former masters for low wages', isCorrect: true },
      { label: 'C', value: 'A programme to repatriate freed slaves to Africa', isCorrect: false },
      { label: 'D', value: 'An education system for formerly enslaved children', isCorrect: false },
    ],
    'The apprenticeship system (1834-1838) forced formerly enslaved people to continue working on plantations for their former masters for 45 hours per week in exchange for housing and minimal wages. It was widely opposed and abolished in 1838.',
    HARD,
    'Emancipation',
  ),
  mcq(
    'Which British campaigner is most associated with the abolition of the slave trade through Parliament?',
    [
      { label: 'A', value: 'William Wilberforce', isCorrect: true },
      { label: 'B', value: 'Horatio Nelson', isCorrect: false },
      { label: 'C', value: 'Winston Churchill', isCorrect: false },
      { label: 'D', value: 'Oliver Cromwell', isCorrect: false },
    ],
    'William Wilberforce was a British MP who led the parliamentary campaign against the slave trade. The Slave Trade Act of 1807 abolished the transatlantic slave trade, though slavery itself continued until 1834.',
    EASY,
    'Emancipation',
  ),
  mcq(
    'What was the significance of the 1831 Baptist War (Christmas Rebellion) in Jamaica?',
    [
      { label: 'A', value: 'It resulted in immediate emancipation of all slaves', isCorrect: false },
      { label: 'B', value: 'It accelerated the British Parliament\'s decision to abolish slavery', isCorrect: true },
      { label: 'C', value: 'It was led by the colonial government against planters', isCorrect: false },
      { label: 'D', value: 'It had no impact on the abolition movement', isCorrect: false },
    ],
    'The Baptist War, led by Samuel Sharpe, was a large-scale slave rebellion involving over 60,000 enslaved people. Though brutally suppressed, it convinced the British government that slavery was unsustainable and sped up the abolition process.',
    HARD,
    'Emancipation',
  ),

  // ── Independence Movements (4 questions) ──
  mcq(
    'Which Caribbean territory was the FIRST to gain independence from Britain in 1962?',
    [
      { label: 'A', value: 'Trinidad and Tobago', isCorrect: false },
      { label: 'B', value: 'Jamaica', isCorrect: true },
      { label: 'C', value: 'Barbados', isCorrect: false },
      { label: 'D', value: 'Guyana', isCorrect: false },
    ],
    'Jamaica gained independence from Britain on 6 August 1962, closely followed by Trinidad and Tobago on 31 August 1962. Jamaica\'s independence is celebrated annually on 6 August.',
    MEDIUM,
    'Independence Movements',
  ),
  mcq(
    'What was the primary purpose of the West Indies Federation (1958-1962)?',
    [
      { label: 'A', value: 'To create a single military force for the Caribbean', isCorrect: false },
      { label: 'B', value: 'To unite British Caribbean colonies into a single independent nation', isCorrect: true },
      { label: 'C', value: 'To establish a free trade agreement with the United States', isCorrect: false },
      { label: 'D', value: 'To promote tourism across the region', isCorrect: false },
    ],
    'The West Indies Federation was an attempt to unite ten British Caribbean colonies into a single independent state. It collapsed in 1962 due to internal disagreements, particularly between Jamaica and Trinidad and Tobago.',
    MEDIUM,
    'Independence Movements',
  ),
  mcq(
    'Who was a key leader of the labour movement in Jamaica and a strong advocate for independence?',
    [
      { label: 'A', value: 'Eric Williams', isCorrect: false },
      { label: 'B', value: 'Norman Manley', isCorrect: true },
      { label: 'C', value: 'Grantley Adams', isCorrect: false },
      { label: 'D', value: 'Cheddi Jagan', isCorrect: false },
    ],
    'Norman Manley founded the People\'s National Party (PNP) in 1938 and led the movement for Jamaican independence through labour activism and constitutional reform. His cousin Alexander Bustamante led the Jamaica Labour Party.',
    HARD,
    'Independence Movements',
  ),
  mcq(
    'The Morant Bay Rebellion of 1865 in Jamaica was led by:',
    [
      { label: 'A', value: 'Paul Bogle and George William Gordon', isCorrect: true },
      { label: 'B', value: 'Sam Sharpe', isCorrect: false },
      { label: 'C', value: 'Cuffy', isCorrect: false },
      { label: 'D', value: 'Marcus Garvey', isCorrect: false },
    ],
    'The Morant Bay Rebellion was led by Paul Bogle, a Baptist deacon, and supported by George William Gordon, a mixed-race politician. The brutal suppression by Governor Eyre led to hundreds of deaths and eventual constitutional reforms.',
    MEDIUM,
    'Independence Movements',
  ),
]

// ══════════════════════════════════════════════════════════════════
//  CSEC GEOGRAPHY – 20 MCQ Questions
// ══════════════════════════════════════════════════════════════════
const GEOGRAPHY_QUESTIONS: ReturnType<typeof mcq>[] = [
  // ── Map Reading (3 questions) ──
  mcq(
    'On a topographic map, contour lines that are closely spaced together indicate:',
    [
      { label: 'A', value: 'Flat land', isCorrect: false },
      { label: 'B', value: 'Steep slopes', isCorrect: true },
      { label: 'C', value: 'A river valley', isCorrect: false },
      { label: 'D', value: 'A plateau', isCorrect: false },
    ],
    'Closely spaced contour lines indicate steep terrain because the elevation changes rapidly over a short horizontal distance. Widely spaced lines indicate gentle slopes or flat terrain.',
    EASY,
    'Map Reading',
  ),
  mcq(
    'If the scale of a map is 1:50,000, this means that:',
    [
      { label: 'A', value: '1 cm on the map represents 50,000 cm (500 m) on the ground', isCorrect: true },
      { label: 'B', value: '1 cm on the map represents 50 cm on the ground', isCorrect: false },
      { label: 'C', value: '50 cm on the map equals 1 cm on the ground', isCorrect: false },
      { label: 'D', value: 'The map covers 50,000 square kilometres', isCorrect: false },
    ],
    'A ratio scale of 1:50,000 means one unit on the map equals 50,000 of the same units on the ground. So 1 cm on the map = 50,000 cm = 500 m = 0.5 km on the ground.',
    EASY,
    'Map Reading',
  ),
  mcq(
    'On a topographic map, the colour brown is typically used to represent:',
    [
      { label: 'A', value: 'Water features', isCorrect: false },
      { label: 'B', value: 'Vegetation and forests', isCorrect: false },
      { label: 'C', value: 'Land contours and elevation', isCorrect: true },
      { label: 'D', value: 'Built-up areas and settlements', isCorrect: false },
    ],
    'Standard topographic map colours include: brown for contours and land features, blue for water, green for vegetation, black for cultural features (roads, buildings), and red for major roads.',
    MEDIUM,
    'Map Reading',
  ),

  // ── Climate & Weather (4 questions) ──
  mcq(
    'The Caribbean experiences a tropical maritime climate. Which of the following is NOT a characteristic of this climate?',
    [
      { label: 'A', value: 'High temperatures throughout the year', isCorrect: false },
      { label: 'B', value: 'Distinct wet and dry seasons', isCorrect: false },
      { label: 'C', value: 'Heavy snowfall in winter months', isCorrect: true },
      { label: 'D', value: 'High humidity', isCorrect: false },
    ],
    'The Caribbean has a tropical maritime climate with warm temperatures year-round, high humidity, and wet/dry seasons. Snowfall does not occur in the Caribbean due to consistently warm temperatures near the equator.',
    EASY,
    'Climate & Weather',
  ),
  mcq(
    'What is the name of the warm ocean current that influences Caribbean climate?',
    [
      { label: 'A', value: 'Humboldt Current', isCorrect: false },
      { label: 'B', value: 'Gulf Stream and Caribbean Current', isCorrect: true },
      { label: 'C', value: 'Benguela Current', isCorrect: false },
      { label: 'D', value: 'Labrador Current', isCorrect: false },
    ],
    'The Caribbean Current (an extension of the North Equatorial Current) and the Gulf Stream bring warm water from the equatorial region through the Caribbean, moderating temperatures and contributing to the tropical climate.',
    MEDIUM,
    'Climate & Weather',
  ),
  mcq(
    'The Intertropical Convergence Zone (ITCZ) affects the Caribbean by:',
    [
      { label: 'A', value: 'Causing cold temperatures in winter', isCorrect: false },
      { label: 'B', value: 'Bringing heavy rainfall as it migrates north and south seasonally', isCorrect: true },
      { label: 'C', value: 'Preventing hurricanes from forming', isCorrect: false },
      { label: 'D', value: 'Creating desert conditions', isCorrect: false },
    ],
    'The ITCZ is a belt of low pressure near the equator where trade winds converge. Its seasonal migration brings the wet season to the Caribbean when it moves northward and the dry season when it moves southward.',
    HARD,
    'Climate & Weather',
  ),
  mcq(
    'Which instrument is used to measure rainfall?',
    [
      { label: 'A', value: 'Barometer', isCorrect: false },
      { label: 'B', value: 'Thermometer', isCorrect: false },
      { label: 'C', value: 'Rain gauge', isCorrect: true },
      { label: 'D', value: 'Anemometer', isCorrect: false },
    ],
    'A rain gauge measures the amount of liquid precipitation over a set period. A barometer measures atmospheric pressure, a thermometer measures temperature, and an anemometer measures wind speed.',
    EASY,
    'Climate & Weather',
  ),

  // ── Plate Tectonics (3 questions) ──
  mcq(
    'The Caribbean Plate is primarily being affected by which tectonic process?',
    [
      { label: 'A', value: 'Divergence only', isCorrect: false },
      { label: 'B', value: 'Subduction of the North American and South American Plates beneath the Caribbean Plate', isCorrect: true },
      { label: 'C', value: 'No tectonic activity', isCorrect: false },
      { label: 'D', value: 'Transform motion only', isCorrect: false },
    ],
    'The Caribbean Plate is bounded by subduction zones where the North American and South American plates are being forced beneath it. This is why the Eastern Caribbean (the Lesser Antilles) has active volcanoes.',
    MEDIUM,
    'Plate Tectonics',
  ),
  mcq(
    'The volcanic islands of the Lesser Antilles, such as Montserrat and St. Vincent, were formed by:',
    [
      { label: 'A', value: 'Erosion of limestone', isCorrect: false },
      { label: 'B', value: 'Coral reef growth', isCorrect: false },
      { label: 'C', value: 'Subduction zone volcanism along a plate boundary', isCorrect: true },
      { label: 'D', value: 'Meteorite impacts', isCorrect: false },
    ],
    'The volcanic Lesser Antilles (the inner arc) were formed by magma rising to the surface as the Atlantic Plate subducts beneath the Caribbean Plate. The outer arc is composed of older, non-volcanic islands.',
    MEDIUM,
    'Plate Tectonics',
  ),
  mcq(
    'What natural hazard is most closely associated with the tectonic activity in the Caribbean?',
    [
      { label: 'A', value: 'Tornadoes', isCorrect: false },
      { label: 'B', value: 'Earthquakes and volcanic eruptions', isCorrect: true },
      { label: 'C', value: 'Droughts', isCorrect: false },
      { label: 'D', value: 'Flooding only', isCorrect: false },
    ],
    'The Caribbean sits on active plate boundaries, making it prone to earthquakes and volcanic eruptions. The 2010 Haiti earthquake (magnitude 7.0) and the ongoing Soufrière Hills eruption in Montserrat are examples.',
    EASY,
    'Plate Tectonics',
  ),

  // ── Population Geography (4 questions) ──
  mcq(
    'What is the population density formula?',
    [
      { label: 'A', value: 'Total population × Total land area', isCorrect: false },
      { label: 'B', value: 'Total population ÷ Total land area', isCorrect: true },
      { label: 'C', value: 'Total land area ÷ Total population', isCorrect: false },
      { label: 'D', value: 'Birth rate − Death rate', isCorrect: false },
    ],
    'Population density is calculated as: Population Density = Total Population / Total Land Area. It is usually expressed as persons per square kilometre (persons/km²).',
    EASY,
    'Population Geography',
  ),
  mcq(
    'Which Caribbean country has the highest population density?',
    [
      { label: 'A', value: 'Jamaica', isCorrect: false },
      { label: 'B', value: 'Barbados', isCorrect: true },
      { label: 'C', value: 'Trinidad and Tobago', isCorrect: false },
      { label: 'D', value: 'Guyana', isCorrect: false },
    ],
    'Barbados has one of the highest population densities in the world, with approximately 660 persons per km². This is due to its small land area (430 km²) combined with a relatively large population.',
    MEDIUM,
    'Population Geography',
  ),
  mcq(
    'Rural-to-urban migration in the Caribbean is primarily caused by:',
    [
      { label: 'A', value: 'Better climate in urban areas', isCorrect: false },
      { label: 'B', value: 'More job opportunities, education, and healthcare in cities', isCorrect: true },
      { label: 'C', value: 'Government policies forcing people to move', isCorrect: false },
      { label: 'D', value: 'Agricultural expansion in urban centres', isCorrect: false },
    ],
    'People migrate from rural to urban areas primarily for "push" factors (lack of jobs, poor facilities in rural areas) and "pull" factors (employment, education, healthcare, entertainment in cities).',
    MEDIUM,
    'Population Geography',
  ),
  mcq(
    'A population pyramid with a wide base and narrow top indicates:',
    [
      { label: 'A', value: 'An ageing population with low birth rates', isCorrect: false },
      { label: 'B', value: 'A young population with high birth rates', isCorrect: true },
      { label: 'C', value: 'Zero population growth', isCorrect: false },
      { label: 'D', value: 'More males than females in all age groups', isCorrect: false },
    ],
    'A wide base on a population pyramid means there are many young people (high birth rate), and a narrow top means fewer elderly people (lower life expectancy). This is typical of developing countries.',
    HARD,
    'Population Geography',
  ),

  // ── Economic Activities (3 questions) ──
  mcq(
    'Which economic activity is the largest contributor to GDP in most Caribbean countries?',
    [
      { label: 'A', value: 'Agriculture', isCorrect: false },
      { label: 'B', value: 'Tourism', isCorrect: true },
      { label: 'C', value: 'Manufacturing', isCorrect: false },
      { label: 'D', value: 'Mining', isCorrect: false },
    ],
    'Tourism is the dominant economic activity in most Caribbean nations, contributing significantly to GDP, employment, and foreign exchange earnings. Countries like Barbados, Jamaica, and The Bahamas are heavily tourism-dependent.',
    EASY,
    'Economic Activities',
  ),
  mcq(
    'What is monoculture in the context of Caribbean agriculture?',
    [
      { label: 'A', value: 'Growing multiple crops on a single farm', isCorrect: false },
      { label: 'B', value: 'Dependence on a single cash crop for economic survival', isCorrect: true },
      { label: 'C', value: 'Using modern farming technology exclusively', isCorrect: false },
      { label: 'D', value: 'Organic farming methods', isCorrect: false },
    ],
    'Monoculture refers to dependence on a single crop (e.g., sugar cane in Jamaica and Barbados, bananas in the Windward Islands). This makes economies vulnerable to price fluctuations and natural disasters.',
    MEDIUM,
    'Economic Activities',
  ),
  mcq(
    'The bauxite industry is most important to which Caribbean country?',
    [
      { label: 'A', value: 'Barbados', isCorrect: false },
      { label: 'B', value: 'Jamaica', isCorrect: true },
      { label: 'C', value: 'Trinidad and Tobago', isCorrect: false },
      { label: 'D', value: 'Haiti', isCorrect: false },
    ],
    'Jamaica is one of the world\'s largest producers of bauxite, the ore from which aluminium is extracted. Jamaica\'s bauxite industry has been a major foreign exchange earner since the 1950s.',
    MEDIUM,
    'Economic Activities',
  ),

  // ── Caribbean Environment (3 questions) ──
  mcq(
    'Coral reefs in the Caribbean are threatened by all of the following EXCEPT:',
    [
      { label: 'A', value: 'Ocean acidification', isCorrect: false },
      { label: 'B', value: 'Sustainable fishing practices', isCorrect: true },
      { label: 'C', value: 'Rising sea temperatures causing bleaching', isCorrect: false },
      { label: 'D', value: 'Coastal development and pollution', isCorrect: false },
    ],
    'Coral reefs face threats from ocean acidification, coral bleaching (caused by rising temperatures), pollution, and destructive fishing. Sustainable fishing practices are actually beneficial and help protect reefs.',
    MEDIUM,
    'Caribbean Environment',
  ),
  mcq(
    'Deforestation in the Caribbean contributes to which environmental problem?',
    [
      { label: 'A', value: 'Decreased soil erosion', isCorrect: false },
      { label: 'B', value: 'Increased risk of flooding and soil erosion', isCorrect: true },
      { label: 'C', value: 'Lower carbon dioxide levels', isCorrect: false },
      { label: 'D', value: 'Increase in biodiversity', isCorrect: false },
    ],
    'Removing trees (deforestation) exposes soil to erosion by wind and rain, reduces water absorption, increases surface runoff and flooding, and destroys habitats leading to biodiversity loss.',
    EASY,
    'Caribbean Environment',
  ),
  mcq(
    'Which international agreement aims to reduce global greenhouse gas emissions?',
    [
      { label: 'A', value: 'The Kyoto Protocol and Paris Agreement', isCorrect: true },
      { label: 'B', value: 'The NAFTA Agreement', isCorrect: false },
      { label: 'C', value: 'The Treaty of Chaguaramas', isCorrect: false },
      { label: 'D', value: 'The Lomé Convention', isCorrect: false },
    ],
    'The Kyoto Protocol (1997) and the Paris Agreement (2015) are international treaties designed to combat climate change by reducing greenhouse gas emissions. Small island states like Caribbean nations are particularly vulnerable to climate change.',
    HARD,
    'Caribbean Environment',
  ),
]

// ══════════════════════════════════════════════════════════════════
//  CAPE PURE MATHEMATICS – 20 MCQ Questions
// ══════════════════════════════════════════════════════════════════
const CAPE_MATH_QUESTIONS: ReturnType<typeof mcq>[] = [
  // ── Functions & Relations (4 questions) ──
  mcq(
    'If f(x) = 2x + 3 and g(x) = x², what is the composite function fg(1)?',
    [
      { label: 'A', value: '5', isCorrect: true },
      { label: 'B', value: '7', isCorrect: false },
      { label: 'C', value: '1', isCorrect: false },
      { label: 'D', value: '9', isCorrect: false },
    ],
    'First find g(1) = 1² = 1. Then f(g(1)) = f(1) = 2(1) + 3 = 5.',
    EASY,
    'Functions & Relations',
  ),
  mcq(
    'If f(x) = (2x + 1)/(x − 3), what is the domain of f(x)?',
    [
      { label: 'A', value: 'All real numbers', isCorrect: false },
      { label: 'B', value: 'All real numbers except x = 3', isCorrect: true },
      { label: 'C', value: 'x ≥ 3', isCorrect: false },
      { label: 'D', value: 'x ≤ 3', isCorrect: false },
    ],
    'The function is undefined when the denominator equals zero. Setting x − 3 = 0 gives x = 3. Therefore, the domain is all real numbers except x = 3.',
    MEDIUM,
    'Functions & Relations',
  ),
  mcq(
    'Which of the following relations is NOT a function?',
    [
      { label: 'A', value: 'y = x³', isCorrect: false },
      { label: 'B', value: 'y = √(x − 1)', isCorrect: false },
      { label: 'C', value: 'x² + y² = 25', isCorrect: true },
      { label: 'D', value: 'y = 2x + 1', isCorrect: false },
    ],
    'x² + y² = 25 is the equation of a circle. For some x-values (e.g., x = 0), there are two y-values (y = 5 and y = −5), so it is not a function.',
    MEDIUM,
    'Functions & Relations',
  ),
  mcq(
    'If f(x) = x² − 4x + 3, the range of f(x) is:',
    [
      { label: 'A', value: 'f(x) ≥ −1', isCorrect: true },
      { label: 'B', value: 'f(x) ≥ 0', isCorrect: false },
      { label: 'C', value: 'All real numbers', isCorrect: false },
      { label: 'D', value: 'f(x) ≥ 3', isCorrect: false },
    ],
    'f(x) = (x − 2)² − 1. Since (x − 2)² ≥ 0, the minimum value of f(x) is −1. Therefore, the range is f(x) ≥ −1.',
    HARD,
    'Functions & Relations',
  ),

  // ── Trigonometry & Circular Measure (3 questions) ──
  mcq(
    'Convert 150° to radians.',
    [
      { label: 'A', value: '5π/6', isCorrect: true },
      { label: 'B', value: '2π/3', isCorrect: false },
      { label: 'C', value: '3π/4', isCorrect: false },
      { label: 'D', value: '7π/6', isCorrect: false },
    ],
    'To convert degrees to radians: 150° × π/180 = 150π/180 = 5π/6.',
    EASY,
    'Trigonometry & Circular Measure',
  ),
  mcq(
    'What is the value of sin(π/3)?',
    [
      { label: 'A', value: '1/2', isCorrect: false },
      { label: 'B', value: '√2/2', isCorrect: false },
      { label: 'C', value: '√3/2', isCorrect: true },
      { label: 'D', value: '1', isCorrect: false },
    ],
    'sin(π/3) = sin(60°) = √3/2. Memorise the exact values for π/6, π/4, π/3, and π/2.',
    EASY,
    'Trigonometry & Circular Measure',
  ),
  mcq(
    'In triangle ABC, side a = 8 cm, side b = 6 cm, and angle C = 60°. Find side c using the cosine rule.',
    [
      { label: 'A', value: '√52 cm', isCorrect: true },
      { label: 'B', value: '14 cm', isCorrect: false },
      { label: 'C', value: '10 cm', isCorrect: false },
      { label: 'D', value: '√76 cm', isCorrect: false },
    ],
    'c² = a² + b² − 2ab cos(C) = 64 + 36 − 2(8)(6)(1/2) = 100 − 48 = 52. So c = √52 = 2√13 cm.',
    HARD,
    'Trigonometry & Circular Measure',
  ),

  // ── Calculus (Limits) (3 questions) ──
  mcq(
    'What is the value of lim(x→2) (x² − 4)/(x − 2)?',
    [
      { label: 'A', value: '0', isCorrect: false },
      { label: 'B', value: '4', isCorrect: true },
      { label: 'C', value: '2', isCorrect: false },
      { label: 'D', value: 'Undefined', isCorrect: false },
    ],
    'Factorise: (x² − 4)/(x − 2) = (x + 2)(x − 2)/(x − 2) = x + 2 for x ≠ 2. So lim(x→2) (x + 2) = 4.',
    MEDIUM,
    'Calculus (Limits)',
  ),
  mcq(
    'Evaluate lim(x→0) sin(x)/x.',
    [
      { label: 'A', value: '0', isCorrect: false },
      { label: 'B', value: '∞', isCorrect: false },
      { label: 'C', value: '1', isCorrect: true },
      { label: 'D', value: 'Undefined', isCorrect: false },
    ],
    'This is a standard limit result. lim(x→0) sin(x)/x = 1. It can be verified using L\'Hôpital\'s rule or the squeeze theorem.',
    MEDIUM,
    'Calculus (Limits)',
  ),
  mcq(
    'lim(x→∞) (3x² + 2x)/(5x² − 1) = ?',
    [
      { label: 'A', value: '0', isCorrect: false },
      { label: 'B', value: '3/5', isCorrect: true },
      { label: 'C', value: '∞', isCorrect: false },
      { label: 'D', value: '1', isCorrect: false },
    ],
    'Divide numerator and denominator by x²: (3 + 2/x)/(5 − 1/x²). As x→∞, 2/x→0 and 1/x²→0. Limit = 3/5.',
    HARD,
    'Calculus (Limits)',
  ),

  // ── Calculus (Differentiation) (4 questions) ──
  mcq(
    'If f(x) = 3x⁴ − 2x³ + 5x − 7, what is f\'(x)?',
    [
      { label: 'A', value: '12x³ − 6x² + 5', isCorrect: true },
      { label: 'B', value: '3x³ − 2x² + 5', isCorrect: false },
      { label: 'C', value: '12x⁴ − 6x³ + 5', isCorrect: false },
      { label: 'D', value: '12x³ − 6x² + 5x', isCorrect: false },
    ],
    'Apply the power rule: d/dx (axⁿ) = anxⁿ⁻¹. f\'(x) = 12x³ − 6x² + 5.',
    EASY,
    'Calculus (Differentiation)',
  ),
  mcq(
    'If y = (2x + 1)⁵, what is dy/dx using the chain rule?',
    [
      { label: 'A', value: '5(2x + 1)⁴', isCorrect: false },
      { label: 'B', value: '10(2x + 1)⁴', isCorrect: true },
      { label: 'C', value: '5(2x + 1)⁴ + 2', isCorrect: false },
      { label: 'D', value: '(2x + 1)⁴', isCorrect: false },
    ],
    'Let u = 2x + 1, then y = u⁵. dy/dx = dy/du × du/dx = 5u⁴ × 2 = 10(2x + 1)⁴.',
    MEDIUM,
    'Calculus (Differentiation)',
  ),
  mcq(
    'Find the stationary points of f(x) = x³ − 3x + 2.',
    [
      { label: 'A', value: 'x = 1 (maximum) and x = −1 (minimum)', isCorrect: true },
      { label: 'B', value: 'x = 1 (minimum) and x = −1 (maximum)', isCorrect: false },
      { label: 'C', value: 'x = 0 only', isCorrect: false },
      { label: 'D', value: 'No stationary points', isCorrect: false },
    ],
    'f\'(x) = 3x² − 3 = 0 → x² = 1 → x = ±1. f\'\'(x) = 6x. f\'\'(1) = 6 > 0 (minimum), f\'\'(−1) = −6 < 0 (maximum).',
    HARD,
    'Calculus (Differentiation)',
  ),
  mcq(
    'The derivative of ln(x² + 1) is:',
    [
      { label: 'A', value: '1/(x² + 1)', isCorrect: false },
      { label: 'B', value: '2x/(x² + 1)', isCorrect: true },
      { label: 'C', value: '2/(x² + 1)', isCorrect: false },
      { label: 'D', value: '2x ln(x² + 1)', isCorrect: false },
    ],
    'Using the chain rule: d/dx ln(u) = u\'/u where u = x² + 1. So d/dx = 2x/(x² + 1).',
    MEDIUM,
    'Calculus (Differentiation)',
  ),

  // ── Calculus (Integration) (3 questions) ──
  mcq(
    'Evaluate ∫ (4x³ + 2x) dx.',
    [
      { label: 'A', value: 'x⁴ + x² + C', isCorrect: true },
      { label: 'B', value: '4x⁴ + 2x² + C', isCorrect: false },
      { label: 'C', value: '12x² + 2 + C', isCorrect: false },
      { label: 'D', value: '(4/3)x⁴ + x² + C', isCorrect: false },
    ],
    'Reverse power rule: ∫ xⁿ dx = xⁿ⁺¹/(n+1). ∫4x³ dx = x⁴, ∫2x dx = x². Answer: x⁴ + x² + C.',
    EASY,
    'Calculus (Integration)',
  ),
  mcq(
    'Find the area under the curve y = x² between x = 0 and x = 2.',
    [
      { label: 'A', value: '4', isCorrect: false },
      { label: 'B', value: '8/3', isCorrect: true },
      { label: 'C', value: '2', isCorrect: false },
      { label: 'D', value: '6', isCorrect: false },
    ],
    'Area = ∫₀² x² dx = [x³/3]₀² = 8/3 − 0 = 8/3 square units.',
    MEDIUM,
    'Calculus (Integration)',
  ),
  mcq(
    'Evaluate ∫₀^(π/2) cos(x) dx.',
    [
      { label: 'A', value: '0', isCorrect: false },
      { label: 'B', value: '−1', isCorrect: false },
      { label: 'C', value: '1', isCorrect: true },
      { label: 'D', value: 'π/2', isCorrect: false },
    ],
    '∫cos(x) dx = sin(x). Evaluating from 0 to π/2: sin(π/2) − sin(0) = 1 − 0 = 1.',
    MEDIUM,
    'Calculus (Integration)',
  ),

  // ── Sequences & Series (3 questions) ──
  mcq(
    'The first three terms of a geometric progression are 2, 6, 18. What is the common ratio?',
    [
      { label: 'A', value: '2', isCorrect: false },
      { label: 'B', value: '3', isCorrect: true },
      { label: 'C', value: '4', isCorrect: false },
      { label: 'D', value: '8', isCorrect: false },
    ],
    'In a GP, r = T₂/T₁ = 6/2 = 3. Verify: T₃ = T₂ × r = 6 × 3 = 18 ✓',
    EASY,
    'Sequences & Series',
  ),
  mcq(
    'Find the sum of the first 10 terms of the arithmetic series 3 + 7 + 11 + ...',
    [
      { label: 'A', value: '210', isCorrect: true },
      { label: 'B', value: '200', isCorrect: false },
      { label: 'C', value: '220', isCorrect: false },
      { label: 'D', value: '230', isCorrect: false },
    ],
    'a = 3, d = 4. S₁₀ = 10/2 × (2(3) + (10−1)(4)) = 5 × (6 + 36) = 5 × 42 = 210.',
    MEDIUM,
    'Sequences & Series',
  ),
  mcq(
    'The sum to infinity of the geometric series 1 + 1/2 + 1/4 + ... is:',
    [
      { label: 'A', value: '1.5', isCorrect: false },
      { label: 'B', value: '1.75', isCorrect: false },
      { label: 'C', value: '2', isCorrect: true },
      { label: 'D', value: '3', isCorrect: false },
    ],
    'a = 1, r = 1/2. Since |r| < 1, S∞ = a/(1 − r) = 1/(1 − 1/2) = 1/(1/2) = 2.',
    MEDIUM,
    'Sequences & Series',
  ),
]

// ══════════════════════════════════════════════════════════════════
//  CAPE CARIBBEAN STUDIES – 20 MCQ Questions
// ══════════════════════════════════════════════════════════════════
const CAPE_CS_QUESTIONS: ReturnType<typeof mcq>[] = [
  // ── Caribbean Identity (4 questions) ──
  mcq(
    'Which of the following best describes "Creolisation" in the Caribbean context?',
    [
      { label: 'A', value: 'The process of adopting European customs exclusively', isCorrect: false },
      { label: 'B', value: 'The blending of African, European, Amerindian, Asian, and other cultural elements to create new hybrid forms', isCorrect: true },
      { label: 'C', value: 'The preservation of pure African traditions', isCorrect: false },
      { label: 'D', value: 'The process of decolonisation', isCorrect: false },
    ],
    'Creolisation is the process through which different cultural groups in the Caribbean — African, European, East Indian, Chinese, Amerindian, and Middle Eastern — interacted and produced new cultural forms in language, religion, music, food, and social practices.',
    MEDIUM,
    'Caribbean Identity',
  ),
  mcq(
    'Which theorist argued that Caribbean identity is shaped by the experience of colonisation and the plantation system?',
    [
      { label: 'A', value: 'Edward Kamau Brathwaite', isCorrect: true },
      { label: 'B', value: 'Karl Marx', isCorrect: false },
      { label: 'C', value: 'Adam Smith', isCorrect: false },
      { label: 'D', value: 'Sigmund Freud', isCorrect: false },
    ],
    'Edward Kamau Brathwaite, a Barbadian poet and historian, developed the concept of "creolisation" and argued that Caribbean identity was fundamentally shaped by the plantation system, slavery, and cultural interaction.',
    HARD,
    'Caribbean Identity',
  ),
  mcq(
    'The term "diaspora" in the Caribbean context refers to:',
    [
      { label: 'A', value: 'The indigenous peoples of the Caribbean', isCorrect: false },
      { label: 'B', value: 'The dispersal and scattering of people from their original homeland', isCorrect: true },
      { label: 'C', value: 'The tourist population', isCorrect: false },
      { label: 'D', value: 'Political leaders of the region', isCorrect: false },
    ],
    'The Caribbean diaspora refers to the dispersal of people from their ancestral homelands — particularly the forced migration of Africans through the slave trade and the voluntary migration of indentured labourers from India, China, and Portugal.',
    MEDIUM,
    'Caribbean Identity',
  ),
  mcq(
    'Which of the following is an example of cultural hybridity in the Caribbean?',
    [
      { label: 'A', value: 'English tea drinking only', isCorrect: false },
      { label: 'B', value: 'Reggae music, which combines African rhythms with Western instruments and themes', isCorrect: true },
      { label: 'C', value: 'Only European classical music', isCorrect: false },
      { label: 'D', value: 'Unmodified African religious practices', isCorrect: false },
    ],
    'Reggae music is a prime example of cultural hybridity, combining African musical traditions (rhythms, call-and-response), Western instruments (guitar, bass), and themes reflecting Caribbean social and political experience.',
    EASY,
    'Caribbean Identity',
  ),

  // ── Culture & Society (4 questions) ──
  mcq(
    'What is the significance of Carnival in Caribbean culture?',
    [
      { label: 'A', value: 'It is a purely religious ceremony', isCorrect: false },
      { label: 'B', value: 'It serves as a form of cultural expression, social commentary, and resistance rooted in both African and European traditions', isCorrect: true },
      { label: 'C', value: 'It is a modern tourism invention with no historical roots', isCorrect: false },
      { label: 'D', value: 'It celebrates only European heritage', isCorrect: false },
    ],
    'Carnival has roots in both pre-Lenten European festivals and African emancipation celebrations. Enslaved people used Carnival to mock their masters and preserve African traditions. Today it remains a powerful expression of Caribbean identity and social commentary.',
    MEDIUM,
    'Culture & Society',
  ),
  mcq(
    'Which religion in the Caribbean is a syncretic blend of African beliefs and Catholicism?',
    [
      { label: 'A', value: 'Vodun (Voodoo)', isCorrect: true },
      { label: 'B', value: 'Anglicanism', isCorrect: false },
      { label: 'C', value: 'Islam', isCorrect: false },
      { label: 'D', value: 'Buddhism', isCorrect: false },
    ],
    'Vodun (practised in Haiti) is a syncretic religion that blends West African spiritual beliefs with Roman Catholic elements. Enslaved Africans masked their traditional practices behind Catholic saints to preserve their faith.',
    MEDIUM,
    'Culture & Society',
  ),
  mcq(
    'The Caribbean dish "roti" is an example of which cultural influence?',
    [
      { label: 'A', value: 'Chinese', isCorrect: false },
      { label: 'B', value: 'East Indian', isCorrect: true },
      { label: 'C', value: 'European', isCorrect: false },
      { label: 'D', value: 'Indigenous Taino', isCorrect: false },
    ],
    'Roti is a flatbread of East Indian origin brought to the Caribbean by indentured labourers from India (1838-1917). East Indian culinary traditions have profoundly influenced Caribbean cuisine, especially in Trinidad and Guyana.',
    EASY,
    'Culture & Society',
  ),
  mcq(
    'Rastafari movement in Jamaica originated as:',
    [
      { label: 'A', value: 'A formal political party', isCorrect: false },
      { label: 'B', value: 'A religious and social movement promoting Black consciousness, Pan-Africanism, and resistance to colonial oppression', isCorrect: true },
      { label: 'C', value: 'A European cultural import', isCorrect: false },
      { label: 'D', value: 'A government-sponsored programme', isCorrect: false },
    ],
    'The Rastafari movement emerged in Jamaica in the 1930s, inspired by the coronation of Haile Selassie I of Ethiopia and the teachings of Marcus Garvey. It promotes Black pride, Pan-Africanism, natural living (ital food, dreadlocks), and resistance to "Babylon" (oppressive colonial systems).',
    HARD,
    'Culture & Society',
  ),

  // ── Economic Development (3 questions) ──
  mcq(
    'Which of the following best describes "dependency theory" in the context of Caribbean development?',
    [
      { label: 'A', value: 'Caribbean nations are fully independent in economic decision-making', isCorrect: false },
      { label: 'B', value: 'Caribbean economies remain dependent on former colonial powers through unequal trade relationships and foreign ownership', isCorrect: true },
      { label: 'C', value: 'Caribbean nations should isolate themselves from global trade', isCorrect: false },
      { label: 'D', value: 'Economic development is impossible in the Caribbean', isCorrect: false },
    ],
    'Dependency theory argues that Caribbean economies were structured to serve colonial interests, exporting raw materials and importing manufactured goods. This pattern of dependency continues through multinational corporations, unequal trade terms, and foreign debt.',
    MEDIUM,
    'Economic Development',
  ),
  mcq(
    'What is the primary challenge of having a monocultural economy in the Caribbean?',
    [
      { label: 'A', value: 'Too much economic diversification', isCorrect: false },
      { label: 'B', value: 'Vulnerability to price fluctuations, natural disasters, and changing global demand for a single product', isCorrect: true },
      { label: 'C', value: 'Excessive employment opportunities', isCorrect: false },
      { label: 'D', value: 'High levels of exports', isCorrect: false },
    ],
    'Monocultural economies (reliant on a single crop or industry like sugar or tourism) are vulnerable to hurricanes, disease, price changes in global markets, and shifting consumer preferences. Diversification is widely recommended as a solution.',
    MEDIUM,
    'Economic Development',
  ),
  mcq(
    'The Caribbean Community (CARICOM) Single Market and Economy (CSME) aims to:',
    [
      { label: 'A', value: 'Create a single political government for all Caribbean nations', isCorrect: false },
      { label: 'B', value: 'Facilitate the free movement of goods, services, capital, and skilled labour among member states', isCorrect: true },
      { label: 'C', value: 'Restrict trade between Caribbean nations', isCorrect: false },
      { label: 'D', value: 'Join the European Union', isCorrect: false },
    ],
    'The CSME aims to create an economic union allowing for free movement of goods, services, capital, and skilled labour, while supporting economic development and competitive positioning in the global economy.',
    HARD,
    'Economic Development',
  ),

  // ── Political Development (3 questions) ──
  mcq(
    'What is "neo-colonialism"?',
    [
      { label: 'A', value: 'Direct political control by a colonial power', isCorrect: false },
      { label: 'B', value: 'The continued economic and cultural influence of former colonial powers over independent nations', isCorrect: true },
      { label: 'C', value: 'A form of democratic governance', isCorrect: false },
      { label: 'D', value: 'The process of gaining independence', isCorrect: false },
    ],
    'Neo-colonialism refers to the ongoing influence of former colonial powers through economic control (multinational corporations, debt), cultural dominance (language, media), and political interference, even after formal independence has been achieved.',
    MEDIUM,
    'Political Development',
  ),
  mcq(
    'The "Wind of Change" speech in 1960 by British Prime Minister Harold Macmillan signalled:',
    [
      { label: 'A', value: 'Britain\'s commitment to maintain its empire', isCorrect: false },
      { label: 'B', value: 'Britain\'s acceptance that decolonisation in Africa and the Caribbean was inevitable', isCorrect: true },
      { label: 'C', value: 'A military alliance with the Soviet Union', isCorrect: false },
      { label: 'D', value: 'A new trade agreement with the United States', isCorrect: false },
    ],
    'Macmillan\'s 1960 speech acknowledged that the British Empire was dissolving and that independence movements across Africa and the Caribbean would succeed. This paved the way for the wave of Caribbean independence in the 1960s and 1970s.',
    MEDIUM,
    'Political Development',
  ),
  mcq(
    'Constitutional reform in the Caribbean after independence has primarily involved:',
    [
      { label: 'A', value: 'Reverting to colonial governance', isCorrect: false },
      { label: 'B', value: 'Replacing the British monarch with republican systems and adapting governance to local needs', isCorrect: true },
      { label: 'C', value: 'Joining the Commonwealth as colonies', isCorrect: false },
      { label: 'D', value: 'Establishing monarchies', isCorrect: false },
    ],
    'Many Caribbean nations have moved from constitutional monarchies (with the British monarch as head of state) to republics (e.g., Trinidad and Tobago in 1976, Guyana in 1970). Barbados became a republic in 2021.',
    HARD,
    'Political Development',
  ),

  // ── Globalization (3 questions) ──
  mcq(
    'Which of the following is a NEGATIVE effect of globalisation on Caribbean countries?',
    [
      { label: 'A', value: 'Increased access to international markets', isCorrect: false },
      { label: 'B', value: 'Loss of local cultural identity due to the dominance of foreign media and products', isCorrect: true },
      { label: 'C', value: 'Greater technology transfer', isCorrect: false },
      { label: 'D', value: 'Improved educational opportunities', isCorrect: false },
    ],
    'While globalisation brings benefits like technology and market access, it also threatens Caribbean cultural identity through "cultural imperialism" — the dominance of American and European media, fast food chains, music, and consumer products.',
    MEDIUM,
    'Globalization',
  ),
  mcq(
    'What is meant by the term "brain drain" in the Caribbean?',
    [
      { label: 'A', value: 'The loss of natural resources due to mining', isCorrect: false },
      { label: 'B', value: 'The emigration of highly educated and skilled professionals to developed countries', isCorrect: true },
      { label: 'C', value: 'A decline in student enrolment at universities', isCorrect: false },
      { label: 'D', value: 'A reduction in educational funding', isCorrect: false },
    ],
    'Brain drain refers to the emigration of trained professionals (doctors, nurses, teachers, engineers) from Caribbean countries to the USA, Canada, and the UK, where salaries and living conditions are better. This depletes the region\'s human capital.',
    EASY,
    'Globalization',
  ),
  mcq(
    'The WTO (World Trade Organisation) ruling against the EU\'s banana regime was significant for Caribbean economies because:',
    [
      { label: 'A', value: 'It increased banana prices', isCorrect: false },
      { label: 'B', value: 'It ended preferential trade access for Caribbean bananas to European markets, threatening the livelihood of Windward Islands farmers', isCorrect: true },
      { label: 'C', value: 'It introduced a new banana variety', isCorrect: false },
      { label: 'D', value: 'It had no impact on Caribbean economies', isCorrect: false },
    ],
    'The WTO ruling forced the EU to end preferential quotas for ACP (African, Caribbean, and Pacific) bananas. Caribbean banana producers, particularly in the Windward Islands, could not compete with cheaper "dollar bananas" from Latin American plantations.',
    HARD,
    'Globalization',
  ),

  // ── Regional Integration (3 questions) ──
  mcq(
    'The Treaty of Chaguaramas (1973) established which regional organisation?',
    [
      { label: 'A', value: 'The Organisation of American States (OAS)', isCorrect: false },
      { label: 'B', value: 'The Caribbean Community (CARICOM)', isCorrect: true },
      { label: 'C', value: 'The European Union (EU)', isCorrect: false },
      { label: 'D', value: 'The United Nations (UN)', isCorrect: false },
    ],
    'The Treaty of Chaguaramas, signed in 1973 in Trinidad and Tobago, established CARICOM to promote economic integration and cooperation among Caribbean states. It replaced the Caribbean Free Trade Association (CARIFTA).',
    MEDIUM,
    'Regional Integration',
  ),
  mcq(
    'Which of the following is a benefit of regional integration in the Caribbean?',
    [
      { label: 'A', value: 'Loss of national sovereignty', isCorrect: false },
      { label: 'B', value: 'Increased bargaining power in international trade negotiations', isCorrect: true },
      { label: 'C', value: 'Decreased cultural exchange', isCorrect: false },
      { label: 'D', value: 'Higher trade barriers between member states', isCorrect: false },
    ],
    'Regional integration allows Caribbean nations to negotiate as a bloc in international forums (WTO, EU, etc.), giving them more influence than they would have individually. It also promotes trade, labour mobility, and collective security.',
    EASY,
    'Regional Integration',
  ),
  mcq(
    'Which Caribbean institution is responsible for coordinating disaster response in the region?',
    [
      { label: 'A', value: 'CARICOM Secretariat', isCorrect: false },
      { label: 'B', value: 'The Caribbean Disaster Emergency Management Agency (CDEMA)', isCorrect: true },
      { label: 'C', value: 'The University of the West Indies (UWI)', isCorrect: false },
      { label: 'D', value: 'The Pan American Health Organisation (PAHO)', isCorrect: false },
    ],
    'CDEMA (formerly CDERA) coordinates disaster preparedness, response, and recovery across participating Caribbean states. It plays a crucial role in hurricane and earthquake response.',
    MEDIUM,
    'Regional Integration',
  ),
]

// ══════════════════════════════════════════════════════════════════
//  STUDY NOTES – CSEC History
// ══════════════════════════════════════════════════════════════════
const HISTORY_NOTES: { topicName: string; title: string; content: string }[] = [
  {
    topicName: 'The Indigenous Peoples',
    title: 'Study Guide: The Indigenous Peoples of the Caribbean',
    content: `# The Indigenous Peoples of the Caribbean

## Key Concepts

### Who Were the Indigenous Peoples?
Three main groups inhabited the Caribbean before European arrival:
- **Ciboney (Guanahatabey)**: Earliest settlers (c. 3000 BCE), hunter-gatherers from Central America. Found mainly in western Cuba.
- **Tainos (Arawaks)**: Arrived c. 300 BCE from the Orinoco region. The most numerous group, inhabiting the Greater Antilles (Cuba, Jamaica, Hispaniola, Puerto Rico) and the Bahamas.
- **Kalinago (Caribs)**: Arrived c. 1000 CE. Fiercer and more warlike, they displaced the Tainos from the Lesser Antilles.

### Taino Society
- **Political structure**: Villages (yucayeques) led by a cacique
- **Economy**: Fishing, hunting, and agriculture (conuco farming method)
- **Religion**: Polytheistic — worshipped zemis (spirit representations)
- **Housing**: Bohíos (ordinary family houses) and caneyes (circular houses of the cacique)
- **Recreation**: Ball game called batey, ceremonial dancing

### Impact of European Contact
- Introduced diseases (smallpox, influenza) devastated indigenous populations
- Enslavement under the encomienda system
- Forced labour in mines and plantations
- Loss of culture, language, and autonomy
- By the mid-16th century, most indigenous populations had been decimated

## Key Terms
- **Encomienda**: A system where Spanish settlers were granted groups of indigenous people in exchange for Christianising them
- **Mita**: Forced labour system used by the Spanish
- **Resistencia**: The Taino and Kalinago both resisted European colonisation, though ultimately unsuccessfully

## Exam Tips
- Understand the distinctions between the three indigenous groups
- Be able to describe Taino social, political, and economic life
- Explain the causes and effects of indigenous population decline
- Compare how the Tainos and Kalinago responded to European arrival`,
  },
  {
    topicName: 'European Settlement',
    title: 'Study Guide: European Settlement of the Caribbean',
    content: `# European Settlement of the Caribbean

## Key Concepts

### Spanish Colonisation (1492 onwards)
- Christopher Columbus arrived in the Bahamas (1492), Hispaniola, Cuba, and Jamaica
- The Spanish established the encomienda system and exploited indigenous labour
- Gold extraction and sugar cultivation were primary economic activities
- Hispaniola (Santo Domingo) became the first Spanish settlement

### Rival European Powers
- **English**: Settled Barbados (1627), Jamaica (1655), and other islands
- **French**: Colonised Martinique, Guadeloupe, and western Hispaniola (Saint-Domingue)
- **Dutch**: Established trading colonies (Curaçao, St. Maarten) and were early sugar producers
- Each power introduced plantation agriculture using enslaved African labour

### The Sugar Revolution
- Transition from tobacco and cotton to sugar as the dominant crop (mid-17th century)
- Required large land holdings, massive capital investment, and enslaved labour
- Transformed the Caribbean into "plantation societies" — economies structured around a single export crop
- Created enormous wealth for European planters but devastating conditions for enslaved people

### Mercantilism
- Caribbean colonies existed to enrich the mother country
- Colonies could only trade with their mother country (Navigation Acts)
- Raw materials exported to Europe; manufactured goods imported in return

## Key Terms
- **Plantation economy**: Economic system based on large-scale monocultural production using coerced labour
- **Mercantilism**: Economic policy where colonies exist solely to benefit the mother country

## Exam Tips
- Understand the motivations for European colonisation
- Be able to explain the impact of the sugar revolution
- Compare the approaches of different European powers
- Link European settlement to the rise of the transatlantic slave trade`,
  },
  {
    topicName: 'Slavery & Resistance',
    title: 'Study Guide: Slavery & Resistance',
    content: `# Slavery & Resistance in the Caribbean

## Key Concepts

### The Transatlantic Slave Trade
- Approximately 12-15 million Africans were forcibly transported to the Americas
- The "Middle Passage" was brutal — disease, malnutrition, and abuse caused massive deaths
- Africans were captured from various regions (West Africa, Central Africa) and brought to work on plantations
- The Triangular Trade linked Europe, Africa, and the Caribbean

### Life Under Slavery
- **Work**: Long hours (12-18 per day) in sugar cane fields, with brutal punishments
- **Living conditions**: Crude housing, inadequate food, no legal rights
- **Slave Codes**: Laws that formalised the control of enslaved people and prescribed harsh punishments
- **Family**: Families were frequently separated through sale; cultural practices were suppressed

### Forms of Resistance
1. **Day-to-day resistance**: Work slowdowns, feigning illness, breaking tools
2. **Marronage**: Running away to form Maroon communities (e.g., Jamaican Maroons led by Queen Nanny)
3. **Armed rebellion**: The 1763 Berbice Rebellion (Cuffy), 1816 Barbados Rebellion (Bussa), 1823 Demerara Rebellion
4. **Cultural resistance**: Preserving African religions, music, language, and oral traditions
5. **Intellectual resistance**: Literacy, education, and religious gatherings

## Key Figures
- **Cuffy**: Leader of the 1763 Berbice Rebellion
- **Queen Nanny**: Jamaican Maroon leader, National Heroine
- **Sam Sharpe**: Leader of the 1831 Baptist War in Jamaica
- **Bussa**: Leader of the 1816 Barbados Rebellion

## Exam Tips
- Discuss both active and passive forms of resistance
- Explain the significance of Maroon communities
- Understand the link between resistance and the abolition movement
- Be prepared to evaluate the effectiveness of different forms of resistance`,
  },
  {
    topicName: 'Emancipation',
    title: 'Study Guide: Emancipation',
    content: `# Emancipation in the Caribbean

## Key Concepts

### The Abolition Movement
- **Abolitionists**: William Wilberforce, Thomas Clarkson, and the Anti-Slavery Society campaigned in Britain
- **Enslaved resistance**: Rebellions (e.g., the 1791 Haitian Revolution, the 1831 Baptist War) demonstrated slavery was unsustainable
- **Economic factors**: Sugar plantation profitability was declining; free trade advocates argued slavery was inefficient
- **Humanitarian arguments**: Growing moral opposition to slavery, influenced by Christian and Enlightenment ideas

### Key Legislation
- **1807 Slave Trade Act**: Abolished the transatlantic slave trade (but NOT slavery itself)
- **1833 Slavery Abolition Act**: Abolished slavery in most British colonies; took effect 1 August 1834
- **Apprenticeship (1834-1838):** A transition system requiring formerly enslaved people to work 45 hours/week for their former masters

### Apprenticeship System
- Formerly enslaved people had to continue working on plantations
- Non-field workers were "apprenticed" for 4 years; field workers for 6 years
- Widely resisted; protests and demonstrations led to its early abolition in 1838
- **Full freedom** came on 1 August 1838, celebrated as Emancipation Day

### After Emancipation
- Many freed people left plantations to establish their own communities and smallholdings
- Planters imported indentured labourers from India, China, and Portugal
- The rise of free villages and independent black communities
- Continued economic challenges and racial discrimination

## Exam Tips
- Distinguish between abolition of the slave trade (1807) and abolition of slavery (1834)
- Explain the significance of the apprenticeship system
- Understand the economic and social changes after 1838
- Link emancipation to later political and labour movements`,
  },
  {
    topicName: 'Independence Movements',
    title: 'Study Guide: Independence Movements',
    content: `# Independence Movements in the Caribbean

## Key Concepts

### Path to Independence
1. **Labour movements (1930s)**: Workers protested poor wages and conditions; led to the formation of trade unions and political parties
2. **Constitutional reform**: Gradual increase in self-government (ministerial system, internal self-rule)
3. **Federation attempt**: The West Indies Federation (1958-1962) tried to unite British colonies but failed
4. **Individual independence**: Jamaica (1962), Trinidad and Tobago (1962), Barbados (1966), and others

### The West Indies Federation (1958-1962)
- Aimed to create a single independent nation from 10 British Caribbean colonies
- Led by Grantley Adams; capital at Chaguaramas, Trinidad
- Failed due to: disagreement over taxation, fears of dominance by larger islands, lack of popular support
- Jamaica voted to withdraw in 1961, leading to the federation's collapse

### Key Leaders and Parties
- **Jamaica**: Norman Manley (PNP), Alexander Bustamante (JLP)
- **Trinidad & Tobago**: Eric Williams (PNM), who led the country to independence
- **Barbados**: Errol Barrow (DLP), who led Barbados to independence in 1966
- **Guyana**: Cheddi Jagan (PPP), Forbes Burnham (PNC)

### Post-Independence Challenges
- Economic dependency on former colonial powers
- Brain drain (emigration of skilled professionals)
- Neocolonial influences through trade, media, and multinational corporations
- Efforts at regional integration through CARICOM

## Exam Tips
- Understand why the West Indies Federation failed
- Compare the independence timelines of different Caribbean nations
- Analyse the challenges of post-independence development
- Link independence movements to earlier labour and resistance movements`,
  },
]

// ══════════════════════════════════════════════════════════════════
//  STUDY NOTES – CSEC Geography
// ══════════════════════════════════════════════════════════════════
const GEOGRAPHY_NOTES: { topicName: string; title: string; content: string }[] = [
  {
    topicName: 'Map Reading',
    title: 'Study Guide: Map Reading',
    content: `# Map Reading

## Key Concepts

### Types of Maps
- **Topographic maps**: Show physical and human features, using contours to represent elevation
- **Climate maps**: Show temperature, rainfall, and wind patterns
- **Population maps**: Show population distribution and density

### Map Scale
- **Ratio scale**: 1:50,000 (1 cm = 50,000 cm = 0.5 km)
- **Statement scale**: "One centimetre represents half a kilometre"
- **Linear scale**: A drawn bar showing distances
- To convert: 1:50,000 → 1 cm = 0.5 km; 1:25,000 → 1 cm = 0.25 km (larger scale, more detail)

### Contour Lines
- Lines connecting points of equal elevation
- **Closely spaced** = steep slope
- **Widely spaced** = gentle slope
- **Evenly spaced** = uniform slope
- **V-shapes pointing uphill** = valleys/rivers
- **V-shapes pointing downhill** = spurs/ridges
- Contour interval: The vertical distance between consecutive contour lines

### Map Symbols and Colours
- **Brown**: Contours, land features
- **Blue**: Water (rivers, lakes, sea)
- **Green**: Vegetation, forests
- **Black**: Cultural features (buildings, roads, boundaries)
- **Red**: Major roads
- **Purple**: Revised features

### Grid References
- **4-figure**: Square reference (e.g., 4523)
- **6-figure**: Point reference within a square (e.g., 452236)
- Always read eastings first (x-axis), then northings (y-axis)

## Exam Tips
- Practise converting between ratio, statement, and linear scales
- Be able to calculate gradient from contours
- Always check the contour interval before answering elevation questions
- Know common map symbols for CSEC`,
  },
  {
    topicName: 'Climate & Weather',
    title: 'Study Guide: Climate & Weather',
    content: `# Climate & Weather in the Caribbean

## Key Concepts

### The Tropical Maritime Climate
- **Temperature**: Consistently warm (26-32°C year-round) due to proximity to the equator
- **Rainfall**: Wet season (June-November) and dry season (December-May)
- **Humidity**: High (70-90%) throughout the year
- **Trade winds**: Northeast trade winds bring moisture and moderate temperatures

### Atmospheric Factors
- **ITCZ (Intertropical Convergence Zone)**: Moves north during the wet season, bringing heavy rainfall
- **Sea breezes**: Onshore winds during the day, offshore at night
- **Hurricanes**: Season runs June-November; caused by warm ocean temperatures and low pressure systems

### Climate Graphs
- Show monthly temperature and rainfall for a location
- Temperature line is relatively flat (tropical climate)
- Rainfall bars show seasonal peaks during the wet season
- Be able to describe and interpret climate graphs

### Microclimates
- **Windward coasts**: Receive more rainfall from moisture-laden trade winds
- **Leeward coasts**: Drier due to rain shadow effect of mountains
- **Higher elevations**: Cooler temperatures and more rainfall (orographic effect)
- **Urban heat islands**: Cities are warmer than surrounding rural areas

### Climate Change Impacts
- Rising sea levels threaten low-lying coastal areas
- Increased hurricane intensity
- Coral bleaching from warmer ocean temperatures
- Changes in rainfall patterns affecting agriculture

## Exam Tips
- Be able to describe the characteristics of the tropical maritime climate
- Explain the role of the ITCZ in seasonal rainfall patterns
- Understand how ocean currents influence Caribbean climate
- Discuss the impact of climate change on Caribbean environments`,
  },
  {
    topicName: 'Plate Tectonics',
    title: 'Study Guide: Plate Tectonics',
    content: `# Plate Tectonics and the Caribbean

## Key Concepts

### The Caribbean Plate
- The Caribbean is located on the Caribbean Plate, a small tectonic plate
- Bounded by: the North American Plate (north), the South American Plate (south), the Cocos Plate (west), and the Nazca Plate (southwest)
- The Caribbean Plate moves eastward relative to the North and South American Plates

### Plate Boundaries
- **Subduction zones**: The North American and South American Plates are being forced beneath the Caribbean Plate
- **Volcanic arc**: The Lesser Antilles (inner arc) formed from subduction zone volcanism
- **Transform boundaries**: The Cayman Trench (between Jamaica and Cuba) is a transform fault boundary

### Volcanism
- Active volcanoes in: Montserrat (Soufrière Hills), St. Vincent (La Soufrière), St. Lucia, Dominica, Grenada
- Montserrat's Soufrière Hills eruption (1995-present) devastated the southern half of the island
- Volcanic hazards: lava flows, pyroclastic flows, ash fall, mudflows (lahars)

### Earthquakes
- Caused by plate movement along boundaries
- The 2010 Haiti earthquake (magnitude 7.0) killed over 200,000 people
- Jamaica experiences regular minor earthquakes due to its location near the Cayman Trench

### Tsunamis
- Can be triggered by underwater earthquakes and volcanic eruptions
- The Caribbean is at risk, though tsunamis are less frequent than in the Pacific

## Exam Tips
- Be able to explain how the Lesser Antilles were formed
- Describe the relationship between plate boundaries and natural hazards
- Discuss the social and economic impacts of volcanic eruptions and earthquakes
- Use specific Caribbean examples (Haiti 2010, Montserrat 1995)`,
  },
  {
    topicName: 'Population Geography',
    title: 'Study Guide: Population Geography',
    content: `# Population Geography

## Key Concepts

### Population Distribution and Density
- **Population distribution**: How people are spread across an area (uneven in the Caribbean)
- **Population density**: Persons per km² = Total Population / Total Land Area
- Caribbean population is concentrated in coastal areas, capital cities, and fertile valleys
- Jamaica: ~270/km²; Barbados: ~660/km²; Guyana: ~4/km²

### Population Structure
- **Population pyramids**: Graphs showing age-sex distribution
- Wide base = high birth rate (young population) — typical of developing nations
- Narrow base = low birth rate (ageing population) — typical of developed nations
- The Caribbean is transitioning from a young to a more intermediate structure

### Population Change
- **Birth rate**: Number of live births per 1,000 population per year
- **Death rate**: Number of deaths per 1,000 population per year
- **Natural increase** = Birth rate − Death rate
- Caribbean birth rates have declined due to education, family planning, and urbanisation
- Migration affects population size significantly

### Migration
- **Push factors**: Unemployment, poor living conditions, natural disasters, crime
- **Pull factors**: Better jobs, education, healthcare, family reunification
- **Internal migration**: Rural to urban (urbanisation)
- **External migration**: Brain drain to USA, Canada, UK; return migration
- **Consequences**: Brain drain, remittances (money sent home), ageing populations

### Demographic Transition Model
- Stage 1: High birth rate, high death rate
- Stage 2: High birth rate, falling death rate (rapid growth)
- Stage 3: Falling birth rate, low death rate (slowing growth)
- Stage 4: Low birth rate, low death rate (stable or declining)
- Caribbean is between Stages 3 and 4

## Exam Tips
- Be able to interpret and draw population pyramids
- Discuss the causes and consequences of migration
- Understand the demographic transition model as it applies to the Caribbean
- Use specific statistics and examples from Caribbean countries`,
  },
  {
    topicName: 'Economic Activities',
    title: 'Study Guide: Economic Activities',
    content: `# Economic Activities in the Caribbean

## Key Concepts

### Primary Sector (Agriculture and Mining)
- **Agriculture**: Sugar cane, bananas, citrus, coffee, cocoa, rice
- **Monoculture**: Dependence on a single crop (e.g., sugar in Barbados, bananas in the Windward Islands)
- **Problems**: Vulnerability to hurricanes, price fluctuations, competition, labour shortages
- **Mining**: Bauxite/aluminium (Jamaica), oil and natural gas (Trinidad & Tobago)

### Secondary Sector (Manufacturing)
- Light manufacturing: food processing, beverages, textiles, chemicals
- Petrochemical industry in Trinidad (Point Lisas)
- Limited manufacturing base compared to developed nations
- Challenges: Small domestic market, high energy costs, foreign competition

### Tertiary Sector (Services)
- **Tourism**: The dominant economic sector — beaches, culture, ecotourism, cruises
- **Financial services**: Offshore banking in Barbados, Bahamas, Cayman Islands
- **Other services**: Education, healthcare, ICT

### Tourism as the Leading Industry
- Contributes 25-60% of GDP in many Caribbean countries
- Generates foreign exchange and employment
- Types: mass tourism, eco-tourism, heritage/cultural tourism, cruise tourism
- Negative impacts: environmental degradation, cultural commodification, leakage of revenue to foreign-owned hotels

### Sustainable Development
- Moving away from monoculture dependency
- Diversification of the economy
- Emphasis on renewable energy, organic agriculture, and digital economies
- Balancing economic growth with environmental protection

## Exam Tips
- Understand the contribution of each sector to Caribbean economies
- Be able to discuss the advantages and disadvantages of tourism
- Explain why monoculture is problematic
- Use specific examples from at least two Caribbean countries`,
  },
  {
    topicName: 'Caribbean Environment',
    title: 'Study Guide: Caribbean Environment',
    content: `# The Caribbean Environment

## Key Concepts

### Natural Hazards
- **Hurricanes**: Season (June-November); cause wind damage, flooding, storm surges
- **Volcanic eruptions**: Montserrat (1995-present); ash fall, pyroclastic flows
- **Earthquakes**: Haiti (2010); caused by tectonic plate movement
- **Flooding**: Especially in low-lying coastal areas; worsened by deforestation
- **Droughts**: Affect agriculture, particularly during El Niño years

### Environmental Issues
- **Deforestation**: Causes soil erosion, loss of biodiversity, increased flooding
- **Coral reef degradation**: Caused by pollution, overfishing, rising sea temperatures (bleaching)
- **Coastal pollution: Oil spills, plastic waste, sewage, agricultural runoff
- **Overfishing**: Depletes fish stocks, threatens food security and livelihoods
- **Invasive species**: Threaten native biodiversity (e.g., lionfish in Caribbean waters)

### Climate Change
- **Rising sea levels**: Threaten low-lying islands, coastal infrastructure, and freshwater supplies
- **Warming oceans**: Cause coral bleaching and intensify hurricanes
- **Changes in rainfall**: More intense droughts and floods
- **Small Island Developing States (SIDS)**: Caribbean nations are particularly vulnerable

### Conservation and Sustainability
- Marine protected areas and national parks
- Sustainable fishing practices
- Reforestation programmes
- Renewable energy (solar, wind, geothermal)
- International agreements: Paris Agreement, Convention on Biological Diversity

## Exam Tips
- Discuss the relationship between human activities and environmental problems
- Understand the concept of sustainability and apply it to Caribbean contexts
- Be able to evaluate strategies for managing environmental issues
- Use specific examples of environmental disasters and responses`,
  },
]

// ══════════════════════════════════════════════════════════════════
//  STUDY NOTES – CAPE Pure Mathematics
// ══════════════════════════════════════════════════════════════════
const CAPE_MATH_NOTES: { topicName: string; title: string; content: string }[] = [
  {
    topicName: 'Functions & Relations',
    title: 'Study Guide: Functions & Relations',
    content: `# Functions & Relations

## Key Concepts

### Definition of a Function
A function f: A → B is a rule that assigns to each element x in set A exactly one element f(x) in set B.
- **Domain**: The set of all valid inputs
- **Range**: The set of all outputs
- **Co-domain**: The set of all possible outputs

### Types of Functions
- **One-to-one (injective)**: Each output corresponds to at most one input
- **Onto (surjective)**: Every element in the co-domain is mapped to
- **Bijective**: Both one-to-one and onto

### Composite Functions
- fg(x) means f(g(x)) — apply g first, then f
- Order matters: fg(x) ≠ gf(x) in general
- Example: If f(x) = 2x + 1 and g(x) = x², then fg(3) = f(9) = 19

### Inverse Functions
- f⁻¹(x) reverses the effect of f(x)
- f(f⁻¹(x)) = x = f⁻¹(f(x))
- A function has an inverse if and only if it is bijective
- To find: swap x and y, solve for y

### Modulus Function
- |x| = x if x ≥ 0, |x| = −x if x < 0
- The graph of y = |x| has a V-shape

## Examples
**Find the inverse of f(x) = (2x + 3)/(x − 1):**
Set y = (2x + 3)/(x − 1). Swap: x = (2y + 3)/(y − 1). Solve: xy − x = 2y + 3 → xy − 2y = x + 3 → y(x − 2) = x + 3 → y = (x + 3)/(x − 2)

## Exam Tips
- Always state the domain when asked
- For composite functions, work inside-out
- Sketch graphs to verify ranges and domains
- Check that the inverse really reverses the original function`,
  },
  {
    topicName: 'Trigonometry & Circular Measure',
    title: 'Study Guide: Trigonometry & Circular Measure',
    content: `# Trigonometry & Circular Measure

## Key Concepts

### Circular Measure
- Angles can be measured in **radians** or degrees
- **Conversion**: θ (radians) = θ (degrees) × π/180
- One full revolution = 2π radians = 360°
- Common values: π/6 = 30°, π/4 = 45°, π/3 = 60°, π/2 = 90°

### Arc Length and Sector Area
- Arc length: s = rθ (where θ is in radians)
- Sector area: A = ½r²θ
- Segment area = sector area − triangle area

### Trigonometric Identities
- sin²θ + cos²θ = 1
- 1 + tan²θ = sec²θ
- 1 + cot²θ = csc²θ
- Double angle: sin(2θ) = 2sinθcosθ, cos(2θ) = cos²θ − sin²θ

### Sine and Cosine Rules
- **Sine rule**: a/sin(A) = b/sin(B) = c/sin(C)
- **Cosine rule**: c² = a² + b² − 2ab cos(C)
- Use sine rule when you have a side and its opposite angle
- Use cosine rule when you have two sides and the included angle

### Trigonometric Equations
- Solve by using identities, factoring, or the unit circle
- Remember that sin(θ) = k has solutions θ = arcsin(k) and θ = π − arcsin(k)

## Exam Tips
- Always check whether your calculator is in radians or degrees mode
- Memorise exact values for π/6, π/4, π/3
- Draw diagrams for triangle problems
- For trigonometric equations, find the general solution, not just the first one`,
  },
  {
    topicName: 'Calculus (Limits)',
    title: 'Study Guide: Calculus – Limits',
    content: `# Calculus: Limits

## Key Concepts

### What is a Limit?
The limit of f(x) as x approaches a value a is the value f(x) approaches, even if f(a) is undefined.
- Notation: lim(x→a) f(x) = L
- The limit exists if f(x) approaches the same value from both the left and the right

### Evaluating Limits
1. **Direct substitution**: If f(a) is defined, lim(x→a) f(x) = f(a)
2. **Factorisation**: If f(a) gives 0/0, factor and simplify
3. **L\'Hôpital\'s Rule**: If lim gives 0/0 or ∞/∞, differentiate numerator and denominator separately
4. **Standard limits**: lim(x→0) sin(x)/x = 1, lim(x→0) (1 − cos(x))/x = 0, lim(x→∞) (1 + 1/x)ˣ = e

### Limits at Infinity
- For polynomial/rational functions: divide by the highest power of x
- If degree of numerator < degree of denominator: limit = 0
- If degree of numerator = degree of denominator: limit = ratio of leading coefficients
- If degree of numerator > degree of denominator: limit = ±∞

### Continuity
A function is continuous at x = a if:
1. f(a) is defined
2. lim(x→a) f(x) exists
3. lim(x→a) f(x) = f(a)

## Examples
**lim(x→1) (x³ − 1)/(x − 1) = lim(x→1) (x + 1)(x² + x + 1)/(x − 1) ...** Wait, x³ − 1 = (x−1)(x² + x + 1). So lim(x→1) (x² + x + 1) = 3.

## Exam Tips
- If direct substitution gives 0/0, try factorising or L\'Hôpital\'s Rule
- For limits at infinity, always divide through by the highest power
- Remember that lim(x→a) f(x) ≠ f(a) if f is discontinuous at a`,
  },
  {
    topicName: 'Calculus (Differentiation)',
    title: 'Study Guide: Calculus – Differentiation',
    content: `# Calculus: Differentiation

## Key Concepts

### Basic Rules
- **Power rule**: d/dx (xⁿ) = nxⁿ⁻¹
- **Constant rule**: d/dx (c) = 0
- **Sum rule**: d/dx (f + g) = f\' + g\'
- **Constant multiple**: d/dx (cf) = cf\'

### Product and Quotient Rules
- **Product rule**: d/dx (uv) = u(dv/dx) + v(du/dx)
- **Quotient rule**: d/dx (u/v) = (v(du/dx) − u(dv/dx))/v²

### Chain Rule
- d/dx f(g(x)) = f\'(g(x)) × g\'(x)
- Essential for composite functions like sin(2x), e^(3x), ln(x² + 1)

### Differentiation of Special Functions
- d/dx sin(x) = cos(x), d/dx cos(x) = −sin(x), d/dx tan(x) = sec²(x)
- d/dx eˣ = eˣ, d/dx ln(x) = 1/x
- d/dx sin⁻¹(x) = 1/√(1−x²), d/dx tan⁻¹(x) = 1/(1+x²)

### Applications
- **Stationary points**: f\'(x) = 0 → f\'\'(x) > 0 (minimum), f\'\'(x) < 0 (maximum)
- **Rates of change**: Related rates problems using chain rule
- **Equation of tangent**: y − y₁ = m(x − x₁) where m = f\'(x₁)
- **Increasing/decreasing**: f\'(x) > 0 (increasing), f\'(x) < 0 (decreasing)

## Exam Tips
- Always simplify before differentiating when possible
- For stationary points, find f\'(x) = 0, then use f\'\'(x) to classify
- Show all steps clearly — method marks are important
- Be careful with negative signs and chain rule applications`,
  },
  {
    topicName: 'Calculus (Integration)',
    title: 'Study Guide: Calculus – Integration',
    content: `# Calculus: Integration

## Key Concepts

### Indefinite Integration (Anti-differentiation)
- ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C (for n ≠ −1)
- ∫ 1/x dx = ln|x| + C
- ∫ eˣ dx = eˣ + C
- ∫ sin(x) dx = −cos(x) + C, ∫ cos(x) dx = sin(x) + C
- Always include the constant of integration (+C) for indefinite integrals

### Definite Integration
- ∫ₐᵇ f(x) dx = F(b) − F(a) — gives the area under the curve
- No +C needed for definite integrals
- Area below the x-axis is negative (take absolute value for total area)

### Methods of Integration
1. **Direct reversal**: Reverse the differentiation rules
2. **Substitution**: Let u = g(x), then du = g\'(x) dx
3. **Parts**: ∫ u dv = uv − ∫ v du (choose u = ln or polynomial, dv = the rest)

### Applications
- **Area under a curve**: ∫ₐᵇ f(x) dx
- **Area between curves**: ∫ₐᵇ |f(x) − g(x)| dx
- **Volume of revolution**: V = π∫ₐᵇ y² dx (rotation about x-axis)

## Examples
**∫ (3x² + 4x + 1) dx = x³ + 2x² + x + C**

**∫₀² (x² + 1) dx = [x³/3 + x]₀² = (8/3 + 2) − 0 = 14/3**

## Exam Tips
- Always include +C for indefinite integrals
- Check your answer by differentiating it
- For definite integrals, substitute limits carefully
- For area problems, identify which function is "above" and which is "below"`,
  },
  {
    topicName: 'Sequences & Series',
    title: 'Study Guide: Sequences & Series',
    content: `# Sequences & Series

## Key Concepts

### Arithmetic Sequences
- nth term: Tₙ = a + (n − 1)d
- Sum of first n terms: Sₙ = n/2 × (2a + (n − 1)d) = n/2 × (a + l)
- Common difference: d = Tₙ₊₁ − Tₙ

### Geometric Sequences
- nth term: Tₙ = arⁿ⁻¹
- Sum of first n terms: Sₙ = a(1 − rⁿ)/(1 − r) for r ≠ 1
- Sum to infinity: S∞ = a/(1 − r) for |r| < 1
- Common ratio: r = Tₙ₊₁/Tₙ

### Series Convergence
- An arithmetic series diverges (grows without bound)
- A geometric series converges if |r| < 1 and diverges if |r| ≥ 1
- The sum to infinity only exists when |r| < 1

### Sigma Notation
- Σ (sigma) means "sum of"
- Σₙ₌₁⁵ (2n + 1) = 3 + 5 + 7 + 9 + 11 = 35
- The number below sigma = starting index; above = ending index

### Binomial Theorem
- (a + b)ⁿ = Σₖ₌₀ⁿ ⁿCₖ × aⁿ⁻ᵏ × bᵏ
- ⁿCₖ = n!/(k!(n − k)!)
- Pascal\'s triangle gives binomial coefficients

## Examples
**Sum of first 20 terms of 5, 8, 11, 14, ...**
a = 5, d = 3. S₂₀ = 20/2 × (2(5) + 19(3)) = 10 × (10 + 57) = 670

**Sum to infinity of 2 + 1 + 0.5 + 0.25 + ...**
a = 2, r = 0.5. S∞ = 2/(1 − 0.5) = 4

## Exam Tips
- Identify whether a sequence is arithmetic or geometric
- For geometric series, always check |r| < 1 before using S∞
- Be careful with negative r values in geometric series
- Practise sigma notation problems`,
  },
]

// ══════════════════════════════════════════════════════════════════
//  STUDY NOTES – CAPE Caribbean Studies
// ══════════════════════════════════════════════════════════════════
const CAPE_CS_NOTES: { topicName: string; title: string; content: string }[] = [
  {
    topicName: 'Caribbean Identity',
    title: 'Study Guide: Caribbean Identity',
    content: `# Caribbean Identity

## Key Concepts

### Defining Caribbean Identity
Caribbean identity is not a single, fixed concept but a dynamic, evolving construct shaped by the region's history of colonisation, slavery, indentureship, migration, and cultural interaction. It is characterised by hybridity, diversity, and resilience.

### Creolisation
- The process through which African, European, Asian, and Indigenous cultures blended to create new, distinct Caribbean cultural forms
- Examples: Patois/patois languages, cuisine (roti, ackee and saltfish), music (reggae, calypso, salsa), religion (Vodun, Santería, Shouter Baptist)
- Edward Kamau Brathwaite is the key theorist of creolisation in the Caribbean

### The Plantation Legacy
- The plantation system shaped every aspect of Caribbean society: class structure, race relations, economic patterns, and culture
- Eric Williams' *Capitalism and Slavery* argues that Caribbean society was deliberately constructed for maximum economic exploitation
- The "plantation society" model continues to influence modern social stratification

### Diaspora and Migration
- The forced African diaspora (slave trade), indentured labour migration (India, China, Portugal), and modern emigration to developed countries
- The Caribbean diaspora maintains strong cultural ties to the homeland
- Remittances from the diaspora are a significant source of income for Caribbean nations

### Key Theorists
- **Brathwaite**: Creolisation as the central process of Caribbean identity formation
- **Walcott**: The divided identity — "I'm divided to the vein" — torn between European and African heritage
- **Fanon**: The psychology of colonialism and the struggle for authentic identity

## Exam Tips
- Be able to define and discuss creolisation with examples
- Understand the link between history and contemporary identity
- Use specific examples of cultural hybridity
- Discuss the role of diaspora in shaping identity`,
  },
  {
    topicName: 'Culture & Society',
    title: 'Study Guide: Culture & Society',
    content: `# Culture & Society in the Caribbean

## Key Concepts

### Defining Culture
Culture encompasses the shared beliefs, values, customs, behaviours, and artifacts that characterise a society. Caribbean culture is uniquely hybrid, born from the interaction of diverse racial, ethnic, and social groups.

### Cultural Expressions
- **Music**: Reggae, calypso, soca, chutney, steelpan (Trinidad), dancehall — all blend African, European, and Asian influences
- **Religion**: Christianity, Hinduism, Islam, Rastafari, and syncretic religions (Vodun, Shango, Orisha)
- **Language**: English-based creoles, French-based creoles (Haitian Creole, Patois), Hindustani influences
- **Festivals**: Carnival (Trinidad, Jamaica, Barbados), Crop Over (Barbados), Holi/Phagwa
- **Cuisine**: A fusion — jerk chicken, roti, callaloo, rice and peas, doubles, pelau

### Social Institutions
- **Family**: Extended family networks, common-law unions, matrifocal households (influenced by slavery's disruption of family structures)
- **Education: Modelled on the British system; access varies by class and location
- **Religion**: Plays a central role in community life, education, and social support

### Social Stratification
- Caribbean societies are stratified by race, class, colour, and ethnicity
- The legacy of the plantation system created a hierarchy with Europeans at the top, mixed-race people in the middle, and Africans at the bottom
- While formal legal barriers have been removed, social inequalities persist

## Exam Tips
- Use specific examples of cultural hybridity
- Understand how historical forces (slavery, indentureship) shaped social structures
- Be able to discuss social stratification in the modern Caribbean
- Link culture to identity and resistance`,
  },
  {
    topicName: 'Economic Development',
    title: 'Study Guide: Economic Development',
    content: `# Economic Development in the Caribbean

## Key Concepts

### The Legacy of Colonialism
- Caribbean economies were designed to serve European interests, not local development
- Export of raw materials (sugar, bananas, bauxite) and import of manufactured goods
- Infrastructure (roads, ports) was built for extractive purposes
- This created a pattern of dependency that continues to affect development

### Dependency Theory
- Argues that Caribbean economies remain dependent on former colonial powers
- Multinational corporations control key industries (tourism, bauxite)
- Unequal trade terms disadvantage Caribbean exporters
- Foreign debt limits government spending on social services

### Development Challenges
- **Small market size**: Limits domestic industrial development
- **Vulnerability to natural disasters**: Hurricanes destroy infrastructure and crops
- **Unemployment and underemployment**: Particularly among youth
- **High debt burdens**: Many Caribbean countries have debt-to-GDP ratios exceeding 60%
- **Brain drain**: Loss of skilled professionals to developed countries

### Strategies for Development
- **Economic diversification**: Reducing dependence on tourism and single commodities
- **Regional integration**: CARICOM, CSME to increase collective bargaining power
- **Technology and innovation**: ICT, renewable energy, digital services
- **Sustainable development**: Balancing economic growth with environmental protection
- **Foreign direct investment**: Attracting capital while maintaining local control

## Exam Tips
- Be able to explain dependency theory and apply it to the Caribbean
- Discuss both internal and external barriers to development
- Evaluate the effectiveness of CARICOM and regional integration
- Use current data and specific country examples`,
  },
  {
    topicName: 'Political Development',
    title: 'Study Guide: Political Development',
    content: `# Political Development in the Caribbean

## Key Concepts

### Decolonisation
- The process by which Caribbean territories gained political independence from European colonial powers
- Wave of independence in the 1960s-1980s: Jamaica (1962), Trinidad & Tobago (1962), Barbados (1966), Bahamas (1973), etc.
- Some territories remain British Overseas Territories (e.g., Cayman Islands, BVI, Montserrat)

### Constitutional Development
- Progression from colonial administration → representative government → internal self-government → full independence
- Some countries retained the British monarch as head of state (constitutional monarchy)
- Others became republics (Guyana 1970, Trinidad & Tobago 1976, Barbados 2021)

### Political Systems
- **Westminster model**: Most Caribbean nations adopted the British parliamentary system
- **Features**: Cabinet government, bicameral or unicameral legislature, opposition parties
- **Challenges**: Tribal politics, party patronage, weak political institutions, corruption

### Neo-colonialism
- The continued influence of former colonial powers through economic, cultural, and political means
- Even after independence, Caribbean nations face pressure from international financial institutions (IMF, World Bank)
- Structural Adjustment Programmes imposed conditions that limited government spending on social services

### Regional Political Cooperation
- CARICOM: Promotes economic and political cooperation
- The Caribbean Court of Justice: Replaces the UK Privy Council as the final court of appeal
- Regional security initiatives to address transnational crime and drug trafficking

## Exam Tips
- Distinguish between decolonisation, constitutional reform, and neo-colonialism
- Understand why some countries chose republicanism and others retained the monarchy
- Evaluate the successes and failures of regional political cooperation
- Use specific examples of constitutional changes`,
  },
  {
    topicName: 'Globalization',
    title: 'Study Guide: Globalization',
    content: `# Globalization and the Caribbean

## Key Concepts

### Defining Globalization
Globalization refers to the increasing interconnectedness of the world through trade, communication, technology, and cultural exchange. For the Caribbean, globalisation brings both opportunities and significant challenges.

### Positive Effects
- Access to global markets for Caribbean products and services
- Technology transfer: internet, mobile phones, ICT development
- Educational opportunities through online learning and international scholarships
- Cultural exchange and the global popularity of Caribbean music, food, and sport
- Foreign investment and tourism growth

### Negative Effects
- **Cultural imperialism**: Dominance of American media, fast food, and consumer products eroding local culture
- **Brain drain**: Loss of educated professionals to developed countries
- **Economic vulnerability**: Small economies struggle to compete with multinational corporations
- **Trade liberalisation**: WTO rules eliminate preferential access (e.g., the banana dispute)
- **Environmental degradation**: Increased pollution, over-tourism, and resource exploitation

### The Banana Dispute
- The WTO ruled that the EU's preferential banana quota system violated free trade rules
- Caribbean banana farmers (especially in the Windward Islands) could not compete with cheaper Latin American bananas
- This case illustrates how globalisation and trade liberalisation can devastate small Caribbean economies

### Responses to Globalization
- CARICOM trade negotiations and regional economic blocs
- Promoting cultural industries (music, film, fashion) globally
- Developing ICT and knowledge-based economies
- Strengthening regional integration for collective bargaining power

## Exam Tips
- Always discuss both positive and negative effects
- Use specific examples (banana dispute, brain drain, cultural imperialism)
- Evaluate Caribbean responses to globalisation
- Link globalisation to concepts of dependency and neo-colonialism`,
  },
  {
    topicName: 'Regional Integration',
    title: 'Study Guide: Regional Integration',
    content: `# Regional Integration in the Caribbean

## Key Concepts

### Why Regional Integration?
- Small island states have limited individual bargaining power
- Shared history, culture, and economic challenges
- Collective action can amplify influence in international forums
- Pooling resources reduces costs and increases efficiency

### Key Regional Organisations
- **CARICOM (1973)**: The Caribbean Community — promotes economic integration, coordination of foreign policy, and functional cooperation
- **CSME**: The CARICOM Single Market and Economy — free movement of goods, services, capital, and skilled labour
- **OECS (1981)**: Organisation of Eastern Caribbean States — economic union of smaller islands
- **CDEMA**: Caribbean Disaster Emergency Management Agency
- **UWI**: University of the West Indies — serves multiple Caribbean countries

### CARICOM and the CSME
- **Objectives**: Economic integration, coordinated foreign policy, human and social development, security
- **Challenges**: Different economic sizes, sovereignty concerns, limited implementation of decisions
- **Achievements**: Caribbean Court of Justice, CARICOM Single Market, regional health and education initiatives

### Benefits of Integration
- Increased trade between member states
- Free movement of skilled professionals
- Collective bargaining in international trade negotiations
- Shared disaster management and security coordination
- Cultural exchange and strengthened regional identity

### Challenges of Integration
- Loss of national sovereignty
- Unequal benefits (larger economies may dominate)
- Implementation gaps between agreements and practice
- External pressures from global trade agreements

## Exam Tips
- Know the history: from Federation to CARIFTA to CARICOM to CSME
- Understand the difference between CARICOM and the CSME
- Evaluate the successes and limitations of regional integration
- Use specific examples of regional cooperation`,
  },
]

// ══════════════════════════════════════════════════════════════════
//  MAIN FUNCTION
// ══════════════════════════════════════════════════════════════════
async function main() {
  console.log('🔄 Connecting to Turso...')

  const libsql = createClient({
    url: TURSO_URL,
    authToken: TURSO_TOKEN,
  })

  const adapter = new PrismaLibSQL({
    url: TURSO_URL,
    authToken: TURSO_TOKEN,
  })

  const prisma = new PrismaClient({ adapter } as never)
  console.log('✅ Connected to Turso')

  // ── Step 1: Ensure system user exists ──────────────────────────
  console.log('\n👤 Ensuring system user exists...')
  const SYSTEM_USER_ID = 'system-user-001'
  const SYSTEM_USER_EMAIL = 'cxc-ace-system@cxcace.com'

  let systemUser = await prisma.user.findUnique({
    where: { id: SYSTEM_USER_ID },
  })

  if (!systemUser) {
    systemUser = await prisma.user.findUnique({
      where: { email: SYSTEM_USER_EMAIL },
    })
  }

  if (!systemUser) {
    console.log('  Creating system user via raw SQL...')
    const bcryptHash =
      '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Kz2K3n0p4ZfG2iFKtQJXa'
    await libsql.execute({
      sql: `INSERT OR IGNORE INTO users (id, email, passwordHash, name, role, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, 'TEACHER', datetime('now'), datetime('now'))`,
      args: [SYSTEM_USER_ID, SYSTEM_USER_EMAIL, bcryptHash, 'CXC Ace Study Guides'],
    })
    systemUser = await prisma.user.findUnique({
      where: { id: SYSTEM_USER_ID },
    })
    console.log(`  ✅ System user created: ${systemUser!.email}`)
  } else {
    console.log(`  ✅ System user found: ${systemUser.email}`)
  }

  // ── Step 2: Look up subjects ───────────────────────────────────
  console.log('\n📚 Looking up subjects...')
  const histSubject = await prisma.subject.findUnique({ where: { code: 'CSEC-HIST' } })
  const geogSubject = await prisma.subject.findUnique({ where: { code: 'CSEC-GEOG' } })
  const capeMathSubject = await prisma.subject.findUnique({ where: { code: 'CAPE-PURE1' } })
  const capeCSSubject = await prisma.subject.findUnique({ where: { code: 'CAPE-CS' } })

  if (!histSubject) { console.error('❌ Subject CSEC-HIST not found. Run setup-turso-auto.ts first.'); process.exit(1) }
  if (!geogSubject) { console.error('❌ Subject CSEC-GEOG not found. Run setup-turso-auto.ts first.'); process.exit(1) }
  if (!capeMathSubject) { console.error('❌ Subject CAPE-PURE1 not found. Run setup-turso-auto.ts first.'); process.exit(1) }
  if (!capeCSSubject) { console.error('❌ Subject CAPE-CS not found. Run setup-turso-auto.ts first.'); process.exit(1) }

  console.log(`  ✅ Found: ${histSubject.name} (${histSubject.id})`)
  console.log(`  ✅ Found: ${geogSubject.name} (${geogSubject.id})`)
  console.log(`  ✅ Found: ${capeMathSubject.name} (${capeMathSubject.id})`)
  console.log(`  ✅ Found: ${capeCSSubject.name} (${capeCSSubject.id})`)

  // ── Step 3: Look up topics ─────────────────────────────────────
  console.log('\n📑 Looking up topics...')

  async function getTopicId(subjectId: string, topicName: string): Promise<string | null> {
    const topic = await prisma.topic.findFirst({
      where: { subjectId, name: topicName },
    })
    if (!topic) {
      console.warn(`  ⚠️  Topic "${topicName}" not found for subject ${subjectId}`)
      return null
    }
    return topic.id
  }

  async function buildTopicMap(subjectId: string, questions: ReturnType<typeof mcq>[]): Promise<Map<string, string | null>> {
    const map = new Map<string, string | null>()
    for (const q of questions) {
      if (!map.has(q.topicName)) {
        map.set(q.topicName, await getTopicId(subjectId, q.topicName))
      }
    }
    return map
  }

  const histTopics = await buildTopicMap(histSubject.id, HISTORY_QUESTIONS)
  const geogTopics = await buildTopicMap(geogSubject.id, GEOGRAPHY_QUESTIONS)
  const capeMathTopics = await buildTopicMap(capeMathSubject.id, CAPE_MATH_QUESTIONS)
  const capeCSTopics = await buildTopicMap(capeCSSubject.id, CAPE_CS_QUESTIONS)

  console.log(`  ✅ Found ${[...histTopics.values()].filter(Boolean).length} History topics`)
  console.log(`  ✅ Found ${[...geogTopics.values()].filter(Boolean).length} Geography topics`)
  console.log(`  ✅ Found ${[...capeMathTopics.values()].filter(Boolean).length} CAPE Math topics`)
  console.log(`  ✅ Found ${[...capeCSTopics.values()].filter(Boolean).length} CAPE CS topics`)

  // ── Step 4: Insert Questions ───────────────────────────────────
  async function insertQuestions(
    questions: ReturnType<typeof mcq>[],
    subjectId: string,
    topicMap: Map<string, string | null>,
    label: string,
  ) {
    console.log(`\n🔢 Inserting ${label} questions...`)
    let count = 0
    for (const q of questions) {
      const topicId = topicMap.get(q.topicName) ?? null
      await prisma.question.create({
        data: {
          type: 'MCQ',
          difficulty: q.difficulty,
          content: q.content,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          subjectId,
          topicId,
          source: 'CXC Curriculum Aligned',
          status: 'APPROVED',
        },
      })
      count++
      process.stdout.write(`  \r  Inserted ${count}/${questions.length}`)
    }
    console.log(`\n  ✅ Inserted ${count} ${label} questions`)
    return count
  }

  const histCount = await insertQuestions(HISTORY_QUESTIONS, histSubject.id, histTopics, 'History')
  const geogCount = await insertQuestions(GEOGRAPHY_QUESTIONS, geogSubject.id, geogTopics, 'Geography')
  const capeMathCount = await insertQuestions(CAPE_MATH_QUESTIONS, capeMathSubject.id, capeMathTopics, 'CAPE Pure Mathematics')
  const capeCSCount = await insertQuestions(CAPE_CS_QUESTIONS, capeCSSubject.id, capeCSTopics, 'CAPE Caribbean Studies')

  // ── Step 5: Insert Study Notes ──────────────────────────────────
  async function insertNotes(
    notes: { topicName: string; title: string; content: string }[],
    subjectId: string,
    topicMap: Map<string, string | null>,
    color: string,
    label: string,
  ) {
    console.log(`\n📝 Inserting ${label} study notes...`)
    let count = 0
    for (const note of notes) {
      await prisma.note.create({
        data: {
          title: note.title,
          content: note.content,
          subjectId,
          color,
          isShared: true,
          isPinned: false,
          userId: systemUser!.id,
        },
      })
      count++
      console.log(`  ✅ Created note: ${note.title}`)
    }
    console.log(`  ✅ Inserted ${count} ${label} study notes`)
    return count
  }

  const histNoteCount = await insertNotes(HISTORY_NOTES, histSubject.id, histTopics, '#fef2f2', 'History')
  const geogNoteCount = await insertNotes(GEOGRAPHY_NOTES, geogSubject.id, geogTopics, '#f0fdf4', 'Geography')
  const capeMathNoteCount = await insertNotes(CAPE_MATH_NOTES, capeMathSubject.id, capeMathTopics, '#f0f9ff', 'CAPE Pure Math')
  const capeCSNoteCount = await insertNotes(CAPE_CS_NOTES, capeCSSubject.id, capeCSTopics, '#fdf4ff', 'CAPE Caribbean Studies')

  // ── Summary ────────────────────────────────────────────────────
  const totalQuestions = histCount + geogCount + capeMathCount + capeCSCount
  const totalNotes = histNoteCount + geogNoteCount + capeMathNoteCount + capeCSNoteCount

  console.log('\n═══════════════════════════════════════════')
  console.log('  📊 SEEDING COMPLETE')
  console.log('═══════════════════════════════════════════')
  console.log(`  CSEC History Questions:       ${histCount}`)
  console.log(`  CSEC Geography Questions:     ${geogCount}`)
  console.log(`  CAPE Pure Math Questions:      ${capeMathCount}`)
  console.log(`  CAPE Caribbean Studies Q's:    ${capeCSCount}`)
  console.log(`  History Notes:                 ${histNoteCount}`)
  console.log(`  Geography Notes:               ${geogNoteCount}`)
  console.log(`  CAPE Math Notes:                ${capeMathNoteCount}`)
  console.log(`  CAPE CS Notes:                  ${capeCSNoteCount}`)
  console.log('───────────────────────────────────────────────')
  console.log(`  Total Questions:               ${totalQuestions}`)
  console.log(`  Total Notes:                   ${totalNotes}`)
  console.log('═══════════════════════════════════════════\n')

  await prisma.$disconnect()
}

main().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
