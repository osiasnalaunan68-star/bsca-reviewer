import { useState, useEffect, useRef } from "react";

// ============================================================
// QUESTION BANK
// ============================================================
const initialQuestions = {
  english: [
    {
      id: "e1", category: "english",
      question: "Analogy: IMPORTER : BUYER :: EXPORTER : _________",
      choices: ["Broker", "Seller", "Manufacturer", "Consumer"],
      answer: 1,
      explanation: "Ang importer ay bumibili mula sa ibang bansa, habang ang exporter ay nagbebenta sa ibang bansa."
    },
    {
      id: "e2", category: "english",
      question: 'The Bureau of Customs vowed to "crack down on" technical smuggling. What does "crack down on" mean?',
      choices: ["To support or fund", "To take severe measures against", "To break into pieces", "To study carefully"],
      answer: 1,
      explanation: '"Crack down on" ay nangangahulugang magsagawa ng mahigpit na hakbang laban sa isang bagay.'
    },
    {
      id: "e3", category: "english",
      question: "Sentence Correction: Neither the Customs Broker nor the port collectors _______ present during the emergency meeting yesterday.",
      choices: ["is", "are", "was", "were"],
      answer: 3,
      explanation: "Sa 'Neither...nor', sumusunod ang pandiwa sa pinakamalapit na subject. Ang 'port collectors' ay plural, kaya 'were' (past tense dahil 'yesterday')."
    },
    {
      id: "e4", category: "english",
      question: "Which word is the closest in meaning to 'CONTRABAND'?",
      choices: ["Licensed goods", "Smuggled goods", "Taxable items", "Exported products"],
      answer: 1,
      explanation: "Ang 'contraband' ay tumutukoy sa mga kalakal na ipinagbabawal o idinadala nang lihim na labag sa batas."
    },
    {
      id: "e5", category: "english",
      question: "Choose the sentence with correct subject-verb agreement: A shipment of luxury bags _______ confiscated last week.",
      choices: ["were", "have been", "was", "are"],
      answer: 2,
      explanation: "Ang paksa ay 'a shipment' (singular), kaya 'was' ang tamang pandiwa sa past tense."
    },
    {
      id: "e6", category: "english",
      question: "Analogy: TARIFF : TAX :: EMBARGO : _________",
      choices: ["Allowance", "Prohibition", "Discount", "Subsidy"],
      answer: 1,
      explanation: "Ang tariff ay isang uri ng buwis; ang embargo ay isang uri ng pagbabawal (prohibition) sa kalakalan."
    },
    {
      id: "e7", category: "english",
      question: "Fill in the blank: The customs officer _______ inspecting the cargo when the alarm went off.",
      choices: ["is", "was", "were", "has"],
      answer: 1,
      explanation: "Ginagamit ang 'was + gerund' para sa past continuous tense — isang aksyon na nagaganap sa nakaraan."
    },
    {
      id: "e8", category: "english",
      question: "What does the idiom 'red tape' mean in the context of customs processing?",
      choices: ["A red-colored security tape", "Excessive bureaucratic rules and procedures", "A type of customs seal", "An express lane for goods"],
      answer: 1,
      explanation: "'Red tape' ay tumutukoy sa labis na burokratikong proseso o regulasyon na nagpapabagal ng gawain."
    },
  ],
  math: [
    {
      id: "m1", category: "math",
      question: "A shipment has an aggregate value of ₱500,000. If the customs duty is 5%, how much is the Customs Duty alone?",
      choices: ["₱25,000", "₱60,000", "₱85,000", "₱50,000"],
      answer: 0,
      explanation: "500,000 × 0.05 = ₱25,000"
    },
    {
      id: "m2", category: "math",
      question: "The ratio of inspected to uninspected containers is 2:5. If there are 350 total containers, how many were inspected?",
      choices: ["100", "140", "250", "70"],
      answer: 0,
      explanation: "Total parts = 7. One part = 350 ÷ 7 = 50. Inspected = 2 × 50 = 100."
    },
    {
      id: "m3", category: "math",
      question: "A broker charges ₱3,000 fixed fee plus ₱500 per container. If the total bill is ₱7,500, how many containers were processed?",
      choices: ["7", "8", "9", "10"],
      answer: 2,
      explanation: "3,000 + 500x = 7,500 → 500x = 4,500 → x = 9"
    },
    {
      id: "m4", category: "math",
      question: "A shipment worth ₱800,000 is subject to 10% customs duty and 12% VAT (on dutiable value + duty). What is the total VAT?",
      choices: ["₱96,000", "₱105,600", "₱80,000", "₱112,000"],
      answer: 1,
      explanation: "Duty = 800,000 × 0.10 = ₱80,000. Dutiable value + Duty = ₱880,000. VAT = 880,000 × 0.12 = ₱105,600."
    },
    {
      id: "m5", category: "math",
      question: "A cargo ship travels 240 km in 4 hours. What is its average speed in km/h?",
      choices: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
      answer: 1,
      explanation: "Speed = Distance ÷ Time = 240 ÷ 4 = 60 km/h"
    },
    {
      id: "m6", category: "math",
      question: "If a broker processes 15 containers in the morning and 25 in the afternoon, what percentage of the total was processed in the morning?",
      choices: ["30%", "35%", "37.5%", "40%"],
      answer: 2,
      explanation: "Total = 40. Morning = 15. Percentage = (15 ÷ 40) × 100 = 37.5%"
    },
    {
      id: "m7", category: "math",
      question: "A customs officer earns ₱24,000/month. If he receives a 15% bonus, what is his total pay that month?",
      choices: ["₱27,000", "₱27,600", "₱28,000", "₱26,400"],
      answer: 1,
      explanation: "Bonus = 24,000 × 0.15 = ₱3,600. Total = 24,000 + 3,600 = ₱27,600"
    },
    {
      id: "m8", category: "math",
      question: "The dutiable value of goods under CIF terms: Cost = ₱200,000, Insurance = ₱5,000, Freight = ₱15,000. What is the CIF value?",
      choices: ["₱200,000", "₱215,000", "₱220,000", "₱205,000"],
      answer: 2,
      explanation: "CIF = Cost + Insurance + Freight = 200,000 + 5,000 + 15,000 = ₱220,000"
    },
  ],
  science: [
    {
      id: "s1", category: "science",
      question: "Which greenhouse gas is most commonly associated with commercial shipping and land transport emissions?",
      choices: ["Methane", "Carbon Dioxide (CO₂)", "Nitrous Oxide", "Ozone"],
      answer: 1,
      explanation: "Ang CO₂ ang pangunahing greenhouse gas mula sa pagsusunog ng fossil fuels sa transportasyon."
    },
    {
      id: "s2", category: "science",
      question: "What is the official currency of the European Union (EU) used by most of its member states?",
      choices: ["Pound Sterling", "Euro", "Swiss Franc", "Deutsche Mark"],
      answer: 1,
      explanation: "Ang Euro (€) ang opisyal na pera ng karamihan sa mga miyembro ng EU simula 1999."
    },
    {
      id: "s3", category: "science",
      question: "What does WTO stand for in international trade?",
      choices: ["World Tax Organization", "World Trade Organization", "Worldwide Transport Office", "Western Trade Order"],
      answer: 1,
      explanation: "Ang WTO (World Trade Organization) ay nag-rereregula ng pandaigdigang kalakalan sa pagitan ng mga bansa."
    },
    {
      id: "s4", category: "science",
      question: "Which type of fish is Aklan province especially famous for producing?",
      choices: ["Tuna", "Bangus (Milkfish)", "Tilapia", "Pompano"],
      answer: 1,
      explanation: "Ang Aklan at karatig-probinsya ay kilala sa bangus farming, partikular sa mga fish pond sa baybayin."
    },
    {
      id: "s5", category: "science",
      question: "What does 'GDP' stand for in economics?",
      choices: ["General Duty Price", "Gross Domestic Product", "Government Development Plan", "Global Distribution Policy"],
      answer: 1,
      explanation: "Ang GDP (Gross Domestic Product) ay ang kabuuang halaga ng lahat ng produkto at serbisyong ginawa sa isang bansa sa loob ng isang taon."
    },
    {
      id: "s6", category: "science",
      question: "Which international organization issues certificates for organic or sustainably sourced seafood?",
      choices: ["BFAR", "FAO", "MSC (Marine Stewardship Council)", "DENR"],
      answer: 2,
      explanation: "Ang MSC ay nagbibigay ng sertipikasyon para sa sustainable fisheries sa buong mundo."
    },
  ],
  customs: [
    {
      id: "c1", category: "customs",
      question: "What is the primary law regulating Customs Brokers in the Philippines?",
      choices: ["RA 10863 (CMTA)", "RA 9280 (Customs Brokers Act of 2004)", "RA 9184 (Government Procurement Act)", "RA 8792 (E-Commerce Act)"],
      answer: 1,
      explanation: "Ang RA 9280 ang batas na nagtatakda ng mga kinakailangan at etikal na pamantayan para sa mga lisensyadong Customs Broker sa Pilipinas."
    },
    {
      id: "c2", category: "customs",
      question: "What is a Customs Bonded Warehouse (CBW)?",
      choices: ["A seaport terminal", "A secure area where goods can be stored/manufactured without paying duties until released", "A free trade zone mall", "Bureau of Customs Head Office"],
      answer: 1,
      explanation: "Ang CBW ay isang espesyal na bodega kung saan maaaring mag-imbak ng kalakal nang hindi muna nagbabayad ng customs duty hanggang sa lumabas ito."
    },
    {
      id: "c3", category: "customs",
      question: "In customs valuation under CIF terms, what does 'Dutiable Value' consist of?",
      choices: ["Cost + Insurance + Freight", "Cost + Brokerage Fee + Storage", "Domestic Price + Tax + Profit", "Export Price - Discount"],
      answer: 0,
      explanation: "Sa CIF (Cost, Insurance, Freight) terms, ang dutiable value ay ang kabuuan ng tatlong bahagi: cost ng produkto, insurance, at freight."
    },
    {
      id: "c4", category: "customs",
      question: "What does CMTA stand for?",
      choices: ["Customs Modernization and Tariff Act", "Customs Management and Trade Authority", "Commercial Maritime and Trade Agreement", "Central Mandate of Trade Administration"],
      answer: 0,
      explanation: "Ang CMTA (RA 10863) ang pangunahing batas na nag-amodernisa ng sistema ng customs at taripa sa Pilipinas."
    },
    {
      id: "c5", category: "customs",
      question: "What is 'technical smuggling' in Philippine customs law?",
      choices: ["Smuggling using technical gadgets", "Undervaluing, misdeclaring, or misclassifying goods to reduce duties", "Smuggling through technical sea routes", "Using fake customs IDs"],
      answer: 1,
      explanation: "Ang technical smuggling ay ang pagsisinungaling sa halaga, dami, o uri ng kalakal para maiwasan ang tamang bayad ng buwis — legal na kasinungalingan na itinuturing na krimen."
    },
    {
      id: "c6", category: "customs",
      question: "Which government agency oversees the Bureau of Customs (BOC)?",
      choices: ["Department of Trade and Industry (DTI)", "Department of Finance (DOF)", "Office of the President", "Bangko Sentral ng Pilipinas (BSP)"],
      answer: 1,
      explanation: "Ang Bureau of Customs ay nasa ilalim ng Department of Finance (DOF) ng Pilipinas."
    },
    {
      id: "c7", category: "customs",
      question: "What is the purpose of a 'Letter of Credit' (LC) in international trade?",
      choices: ["A personal loan document", "A bank guarantee that ensures payment to exporters", "A customs clearance permit", "An import license"],
      answer: 1,
      explanation: "Ang Letter of Credit ay isang garantiya mula sa bangko ng buyer na matatanggap ng seller ang bayad kapag natupad ang mga kondisyon ng kontrata."
    },
    {
      id: "c8", category: "customs",
      question: "What does 'FOB' mean in international shipping terms?",
      choices: ["Free On Board", "Freight On Bond", "Fixed Order Basis", "Forward Operation Budget"],
      answer: 0,
      explanation: "Ang FOB (Free On Board) ay nangangahulugang ang presyo ng kalakal ay kasama na ang lahat ng gastos hanggang sa makasakay na ito sa sasakyan (barko) sa pinagmumulan."
    },
  ],
  logic: [
    {
      id: "l1", category: "logic",
      question: "Syllogism: All contrabands are illegal. Some imported luxury cars are contrabands. Therefore...",
      choices: ["All imported luxury cars are illegal.", "Some imported luxury cars are illegal.", "No luxury car is legal.", "None of the above."],
      answer: 1,
      explanation: "Sa syllogism, ang konklusyon ay sumasaklaw lamang sa 'some' kung ang isa sa mga pahayag ay gumagamit ng 'some'."
    },
    {
      id: "l2", category: "logic",
      question: "Pattern: 2, 5, 10, 17, 26, ___",
      choices: ["35", "37", "38", "40"],
      answer: 1,
      explanation: "Differences: +3, +5, +7, +9, +11. Susunod: 26 + 11 = 37."
    },
    {
      id: "l3", category: "logic",
      question: "If all customs brokers are licensed professionals, and Maria is a customs broker, what can we conclude?",
      choices: ["Maria is not a professional.", "Maria is a licensed professional.", "All licensed professionals are customs brokers.", "Maria may or may not be licensed."],
      answer: 1,
      explanation: "Direktang syllogism: Maria ay customs broker → lahat ng customs broker ay licensed professional → Maria ay licensed professional."
    },
    {
      id: "l4", category: "logic",
      question: "Abstract: APPLE : ORCHARD :: FISH : _______",
      choices: ["Ocean", "Market", "Aquarium", "Net"],
      answer: 0,
      explanation: "Ang apple ay pinalaki sa orchard; ang isda ay pinalaki sa karagatan (ocean). Ito ay analohiya ng bagay at pinanggalingan nito."
    },
    {
      id: "l5", category: "logic",
      question: "Number Series: 1, 4, 9, 16, 25, ___",
      choices: ["30", "36", "49", "34"],
      answer: 1,
      explanation: "Ito ay mga perfect squares: 1², 2², 3², 4², 5², 6² = 36."
    },
    {
      id: "l6", category: "logic",
      question: "If EXPORT is coded as FYQPSU, what is the code for IMPORT?",
      choices: ["JNQPSU", "JNQPRT", "HNQPSU", "JNPPSU"],
      answer: 0,
      explanation: "Bawat letra ay inilipat ng isang posisyon sa alpabeto (I→J, M→N, P→Q, O→P, R→S, T→U). IMPORT = JNQPSU."
    },
  ],
  interview: [
    {
      id: "i1", category: "interview",
      question: "Customs is often viewed as a corrupt bureau. Why do you want to enter this field?",
      answer: "Alam ko ang mga negatibong pananaw sa Customs, at iyon mismo ang dahilan kung bakit nais kong maging bahagi ng bagong henerasyon ng Customs Broker. Sa ilalim ng RA 10863 (CMTA), ang mga operasyon ay nagiging mas digital at malinaw (transparent). Nais kong gamitin ang propesyong ito nang may ganap na integridad — tinitiyak na ang gobyerno ay nakakolekta ng tamang kita upang mapondo ang ating pambansang pag-unlad.",
      keywords: ["integridad", "RA 10863", "CMTA", "transparent", "bagong henerasyon"]
    },
    {
      id: "i2", category: "interview",
      question: "How will you handle it if an importer offers you money to change the goods classification to lower the tax?",
      answer: "Titigasan ko ang aking pagtanggi. Bilang isang hinaharap na lisensyadong propesyonal na pinamahalaan ng RA 9280, ang aking lisensya at integridad ay hindi mabibili. Ang maling deklarasyon at teknikal na smuggling ay nakakasama sa ating lokal na ekonomiya at nagkokompromiso sa seguridad. Susundin ko ang tamang paraan ng pagpapahalaga (valuation) ayon sa batas, anuman ang kahihinatnan.",
      keywords: ["RA 9280", "integridad", "maling deklarasyon", "seguridad", "valuation"]
    },
    {
      id: "i3", category: "interview",
      question: "Why did you choose ASU New Washington for BSCA?",
      answer: "Ang ASU New Washington ay nagbibigay ng kapaligiran na pinagsama ang akademikong kahusayan at praktikal na aplikasyon. Ang mayamang kasaysayan nito sa paglikha ng mga kalidad na propesyonal at ang malakas na pagpapahalaga sa komunidad ay ginagawa itong perpektong institusyon para sa akin — isa na huhubog sa akin bilang isang competent at responsableng Customs Broker.",
      keywords: ["akademikong kahusayan", "kasaysayan", "komunidad", "propesyonal"]
    },
    {
      id: "i4", category: "interview",
      question: "What do you know about the Bureau of Customs?",
      answer: "Ang Bureau of Customs (BOC) ay isang ahensya ng pamahalaan sa ilalim ng Department of Finance na responsable sa pagkolekta ng mga buwis at singil sa mga imported na kalakal, pagprotekta ng bansa mula sa mga iligal na kalakal, at pagpapadali ng lehitimong kalakalan. Pinapamahalaan ito ng Customs Modernization and Tariff Act o RA 10863.",
      keywords: ["BOC", "Department of Finance", "RA 10863", "imported", "buwis"]
    },
    {
      id: "i5", category: "interview",
      question: "What is your greatest strength that will help you as a Customs Broker?",
      answer: "Ang aking pinakamalakas na katangian ay ang integridad at atensiyon sa detalye. Sa isang propesyon na nagtatrabaho sa mataas na halaga ng kalakal at mahahalagang dokumento, ang kahusayan sa pag-aanalisa at mataas na etikal na pamantayan ay mahalaga. Naniniwala rin ako sa patuloy na pag-aaral upang manatiling updated sa mga pagbabago ng batas at regulasyon.",
      keywords: ["integridad", "atensiyon sa detalye", "etikal", "patuloy na pag-aaral", "regulasyon"]
    },
    {
      id: "i6", category: "interview",
      question: "Where do you see yourself 10 years from now in the Customs industry?",
      answer: "Sa loob ng sampung taon, nais kong maging isang fully-licensed Customs Broker na may sariling praktis, at posibleng maging consultant sa mga kumpanyang sangkot sa internasyonal na kalakalan. Nais ko ring makapag-ambag sa mga patakaran at reporma sa Bureau of Customs upang mapabilis at mapahusay ang sistema ng importasyon at exportasyon sa bansa.",
      keywords: ["licensed", "consultant", "internasyonal na kalakalan", "reporma", "importasyon"]
    },
  ]
};

const CATEGORY_META = {
  english:   { label: "English",          emoji: "📝", color: "#4f8ef7" },
  math:      { label: "Mathematics",      emoji: "🔢", color: "#f97316" },
  science:   { label: "Science & GenInfo", emoji: "🔬", color: "#22c55e" },
  customs:   { label: "Customs Admin",    emoji: "🏛️", color: "#a855f7" },
  logic:     { label: "Logic & Reasoning",emoji: "🧠", color: "#ec4899" },
  interview: { label: "Interview Prep",   emoji: "🎤", color: "#14b8a6" },
};

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [questions, setQuestions] = useState(() => {
    const all = [];
    Object.values(initialQuestions).forEach(arr => arr.forEach(q => all.push(q)));
    return all;
  });
  const [screen, setScreen] = useState("home"); // home | quiz | results | interview | admin
  const [selectedCategories, setSelectedCategories] = useState(["english","math","science","customs","logic"]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [interviewIdx, setInterviewIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [editModal, setEditModal] = useState(null); // {mode:'edit'|'add', question}
  const [adminPw, setAdminPw] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [filterCat, setFilterCat] = useState("all");
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const showToast = (msg, type="success") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({msg, type});
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };

  const startQuiz = () => {
    const pool = questions.filter(q => selectedCategories.includes(q.category) && q.category !== "interview");
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(pool.length, 20));
    setQuizQuestions(shuffled);
    setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setSelected(null); setAnswered(false); setScore(0); setHistory([]);
    setScreen("quiz");
  };

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const q = quizQuestions[current];
    const correct = idx === q.answer;
    if (correct) setScore(s => s + 1);
    setHistory(h => [...h, { question: q, selected: idx, correct }]);
  };

  const handleNext = () => {
    if (current + 1 >= quizQuestions.length) { setScreen("results"); return; }
    setCurrent(c => c + 1);
    setSelected(null); setAnswered(false);
  };

  const percent = quizQuestions.length ? Math.round((score / quizQuestions.length) * 100) : 0;

  const getRating = (p) => {
    if (p >= 90) return { label: "Excellent! 🏆", color: "#22c55e" };
    if (p >= 75) return { label: "Very Good! 🌟", color: "#4f8ef7" };
    if (p >= 60) return { label: "Good 👍", color: "#f97316" };
    return { label: "Keep Practicing 💪", color: "#ec4899" };
  };

  // Admin
  const handleAdminLogin = () => {
    if (adminPw === "asu2026") { setAdminUnlocked(true); showToast("Admin mode unlocked!"); }
    else showToast("Wrong password", "error");
  };

  const handleSaveQuestion = (q) => {
    if (editModal.mode === "add") {
      setQuestions(prev => [...prev, { ...q, id: "q" + Date.now() }]);
      showToast("Question added!");
    } else {
      setQuestions(prev => prev.map(x => x.id === q.id ? q : x));
      showToast("Question updated!");
    }
    setEditModal(null);
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
    showToast("Question deleted.", "error");
  };

  const interviewQs = questions.filter(q => q.category === "interview");

return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f1f3d 100%)", fontFamily: "'Nunito', 'Segoe UI', sans-serif", color: "#e2e8f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Space+Grotesk:wght@500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1e293b; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        .btn { cursor: pointer; border: none; outline: none; transition: all 0.18s; }
        .btn:active { transform: scale(0.97); }
        .cat-chip { padding: 8px 16px; border-radius: 999px; border: 2px solid; cursor: pointer; font-weight: 700; font-size: 13px; transition: all 0.18s; user-select: none; }
        .cat-chip:hover { transform: translateY(-1px); }
        .choice-btn { width: 100%; text-align: left; padding: 14px 20px; border-radius: 14px; border: 2px solid #334155; background: #1e293b; color: #e2e8f0; font-size: 15px; font-family: inherit; font-weight: 600; cursor: pointer; transition: all 0.18s; margin-bottom: 10px; }
        .choice-btn:hover:not(:disabled) { border-color: #4f8ef7; background: #1e3a5f; }
        .choice-btn:disabled { cursor: default; }
        .choice-correct { border-color: #22c55e !important; background: #14532d !important; color: #86efac !important; }
        .choice-wrong { border-color: #ef4444 !important; background: #450a0a !important; color: #fca5a5 !important; }
        .tab { padding: 10px 20px; border-radius: 12px; border: none; font-weight: 700; font-size: 14px; font-family: inherit; cursor: pointer; transition: all 0.18s; }
        .tab-active { background: #4f8ef7; color: white; }
        .tab-inactive { background: #1e293b; color: #94a3b8; }
        .tab-inactive:hover { background: #334155; color: #e2e8f0; }
        .input-field { width: 100%; padding: 10px 14px; border-radius: 10px; border: 2px solid #334155; background: #0f172a; color: #e2e8f0; font-family: inherit; font-size: 14px; outline: none; }
        .input-field:focus { border-color: #4f8ef7; }
        textarea.input-field { resize: vertical; min-height: 70px; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 16px; }
        .modal-box { background: #1e293b; border-radius: 20px; padding: 28px; width: 100%; max-width: 560px; max-height: 90vh; overflow-y: auto; border: 1px solid #334155; }
        .progress-bar { height: 8px; background: #334155; border-radius: 4px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 4px; transition: width 0.5s; background: linear-gradient(90deg, #4f8ef7, #a855f7); }
        .toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); padding: 12px 24px; border-radius: 12px; font-weight: 700; font-size: 14px; z-index: 999; animation: fadeInUp 0.3s ease; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @keyframes pulse { 0%,100%{transform:scale(1)}50%{transform:scale(1.03)} }
        .pulse { animation: pulse 2s infinite; }
        .card-hover { transition: transform 0.18s, box-shadow 0.18s; }
        .card-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.4); }
      `}</style>

      {/* TOAST */}
      {toast && (
        <div className="toast" style={{ background: toast.type === "error" ? "#450a0a" : "#14532d", color: toast.type === "error" ? "#fca5a5" : "#86efac", border: `1px solid ${toast.type === "error" ? "#ef4444" : "#22c55e"}` }}>
          {toast.type === "error" ? "❌ " : "✅ "}{toast.msg}
        </div>
      )}
      
      {/* ======================== HOME ======================== */}
      {screen === "home" && (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 16px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 56, marginBottom: 8 }}>🎓</div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, background: "linear-gradient(90deg, #4f8ef7, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 6 }}>
              ASU CET + BSCA Reviewer
            </h1>
            <p style={{ color: "#94a3b8", fontSize: 14 }}>Aklan State University — New Washington | College Entrance Test & Interview Prep</p>
          </div>

          {/* Mode Tabs */}
          <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap", justifyContent: "center" }}>
            <button className="btn tab tab-active">📚 Quiz Mode</button>
            <button className="btn tab tab-inactive" onClick={() => setScreen("interview")}>🎤 Interview Prep</button>
            <button className="btn tab tab-inactive" onClick={() => setScreen("admin")}>⚙️ Admin</button>
          </div>

          {/* Category Select */}
          <div style={{ background: "#1e293b", borderRadius: 20, padding: 24, marginBottom: 20, border: "1px solid #334155" }}>
            <p style={{ fontWeight: 800, marginBottom: 14, fontSize: 15 }}>📌 Pumili ng Kategorya:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {Object.entries(CATEGORY_META).filter(([k]) => k !== "interview").map(([key, meta]) => {
                const active = selectedCategories.includes(key);
                return (
                  <button
                    key={key}
                    className="cat-chip"
                    style={{ borderColor: meta.color, background: active ? meta.color + "22" : "transparent", color: active ? meta.color : "#64748b" }}
                    onClick={() => setSelectedCategories(prev => active ? prev.filter(c => c !== key) : [...prev, key])}
                  >
                    {meta.emoji} {meta.label}
                  </button>
                );
              })}
            </div>
            <p style={{ color: "#64748b", fontSize: 12, marginTop: 12 }}>
              {questions.filter(q => selectedCategories.includes(q.category) && q.category !== "interview").length} questions available
            </p>
          </div>

          {/* Stats Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Total Questions", val: questions.filter(q=>q.category!=="interview").length, icon: "📋" },
              { label: "Categories", val: 5, icon: "🗂️" },
              { label: "Interview Q's", val: interviewQs.length, icon: "🎤" },
            ].map(s => (
              <div key={s.label} style={{ background: "#0f172a", borderRadius: 14, padding: 16, textAlign: "center", border: "1px solid #334155" }}>
                <div style={{ fontSize: 28 }}>{s.icon}</div>
                <div style={{ fontWeight: 900, fontSize: 22, color: "#4f8ef7" }}>{s.val}</div>
                <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div style={{ background: "linear-gradient(135deg, #1e3a5f, #1e1b4b)", borderRadius: 16, padding: 18, marginBottom: 24, border: "1px solid #3b4fd8" }}>
            <p style={{ fontWeight: 800, color: "#a5b4fc", marginBottom: 8, fontSize: 14 }}>💡 Mga Tips para sa 99% Score:</p>
            {["Huwag matatagalan sa mahirap na tanong — laktawan at balikan.", "Mag-practice ng mental math para sa VAT at duty computations.", "Alamin ang kasalukuyang DOF Secretary at BOC Commissioner.", "Maging confident at presentable sa interview."].map((t,i) => (
              <p key={i} style={{ color: "#c7d2fe", fontSize: 13, marginBottom: 4 }}>• {t}</p>
            ))}
          </div>

          <button
            className="btn pulse"
            style={{ width: "100%", padding: "18px", borderRadius: 16, background: "linear-gradient(90deg, #4f8ef7, #a855f7)", color: "white", fontWeight: 900, fontSize: 18, fontFamily: "inherit" }}
            onClick={startQuiz}
            disabled={selectedCategories.length === 0}
          >
            🚀 Magsimula ng Quiz
          </button>
        </div>
      )}
      
      {/* ======================== QUIZ ======================== */}
      {screen === "quiz" && quizQuestions.length > 0 && (
        <div style={{ maxWidth: 660, margin: "0 auto", padding: "24px 16px" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <button className="btn" style={{ background: "#1e293b", borderRadius: 10, padding: "8px 14px", color: "#94a3b8", fontFamily: "inherit", fontWeight: 700, fontSize: 13 }} onClick={() => setScreen("home")}>← Bumalik</button>
            <span style={{ fontWeight: 800, color: "#4f8ef7", fontSize: 15 }}>{score} / {history.length} ✓</span>
          </div>

          {/* Progress */}
          <div className="progress-bar" style={{ marginBottom: 20 }}>
            <div className="progress-fill" style={{ width: `${((current + 1) / quizQuestions.length) * 100}%` }} />
          </div>
          <p style={{ textAlign: "center", color: "#64748b", fontSize: 13, marginBottom: 20, fontWeight: 700 }}>
            Tanong {current + 1} / {quizQuestions.length}
          </p>

          {/* Category badge */}
          {(() => {
            const q = quizQuestions[current];
            const meta = CATEGORY_META[q.category];
            return (
              <div style={{ marginBottom: 14, display: "flex", gap: 8 }}>
                <span style={{ padding: "4px 12px", borderRadius: 999, background: meta.color + "22", color: meta.color, fontWeight: 800, fontSize: 12 }}>
                  {meta.emoji} {meta.label}
                </span>
              </div>
            );
          })()}

          {/* Question */}
          <div style={{ background: "#1e293b", borderRadius: 20, padding: 24, marginBottom: 20, border: "1px solid #334155" }}>
            <p style={{ fontWeight: 800, fontSize: 17, lineHeight: 1.5, color: "#f1f5f9" }}>{quizQuestions[current].question}</p>
          </div>

          {/* Choices */}
          {quizQuestions[current].choices.map((c, i) => {
            const q = quizQuestions[current];
            let cls = "choice-btn";
            if (answered) {
              if (i === q.answer) cls += " choice-correct";
              else if (i === selected && i !== q.answer) cls += " choice-wrong";
            }
            return (
              <button key={i} className={cls} disabled={answered} onClick={() => handleSelect(i)}>
                <span style={{ marginRight: 10, fontWeight: 900, color: answered ? "inherit" : "#4f8ef7" }}>{String.fromCharCode(65+i)}.</span>
                {c}
              </button>
            );
          })}

          {/* Explanation */}
          {answered && (
            <div style={{ background: selected === quizQuestions[current].answer ? "#14532d" : "#450a0a", borderRadius: 14, padding: 16, marginTop: 4, marginBottom: 16, border: `1px solid ${selected === quizQuestions[current].answer ? "#22c55e" : "#ef4444"}` }}>
              <p style={{ fontWeight: 800, marginBottom: 4, color: selected === quizQuestions[current].answer ? "#86efac" : "#fca5a5" }}>
                {selected === quizQuestions[current].answer ? "✅ Tama!" : "❌ Mali"}
              </p>
              <p style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6 }}>{quizQuestions[current].explanation}</p>
            </div>
          )}

          {answered && (
            <button className="btn" style={{ width: "100%", padding: 16, borderRadius: 14, background: "linear-gradient(90deg, #4f8ef7, #a855f7)", color: "white", fontWeight: 900, fontSize: 16, fontFamily: "inherit" }} onClick={handleNext}>
              {current + 1 >= quizQuestions.length ? "Tingnan ang Resulta 🎯" : "Susunod na Tanong →"}
            </button>
          )}
        </div>
      )}
      
      
      {/* ======================== RESULTS ======================== */}
      {screen === "results" && (
        <div style={{ maxWidth: 660, margin: "0 auto", padding: "24px 16px" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 72, marginBottom: 8 }}>{percent >= 75 ? "🏆" : "💪"}</div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Quiz Tapos Na!</h2>
            <div style={{ fontSize: 52, fontWeight: 900, color: getRating(percent).color }}>{percent}%</div>
            <div style={{ fontWeight: 800, fontSize: 18, color: getRating(percent).color, marginBottom: 4 }}>{getRating(percent).label}</div>
            <p style={{ color: "#94a3b8", fontSize: 14 }}>{score} tama sa {quizQuestions.length} tanong</p>
          </div>

          {/* Per-category breakdown */}
          <div style={{ background: "#1e293b", borderRadius: 18, padding: 20, marginBottom: 20, border: "1px solid #334155" }}>
            <p style={{ fontWeight: 800, marginBottom: 14 }}>📊 Score per Kategorya:</p>
            {Object.keys(CATEGORY_META).filter(k=>k!=="interview").map(cat => {
              const catQs = history.filter(h => h.question.category === cat);
              if (!catQs.length) return null;
              const catScore = catQs.filter(h=>h.correct).length;
              const catPct = Math.round((catScore/catQs.length)*100);
              const meta = CATEGORY_META[cat];
              return (
                <div key={cat} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: meta.color }}>{meta.emoji} {meta.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 800 }}>{catScore}/{catQs.length}</span>
                  </div>
                  <div className="progress-bar">
                    <div style={{ height: "100%", borderRadius: 4, width: catPct+"%", background: meta.color, transition: "width 0.5s" }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Review wrong answers */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontWeight: 800, marginBottom: 12 }}>❌ Mga Maling Sagot:</p>
            {history.filter(h=>!h.correct).length === 0 ? (
              <p style={{ color: "#22c55e", fontWeight: 700 }}>Walang mali! Perfect! 🎉</p>
            ) : history.filter(h=>!h.correct).map((h,i) => {
              const meta = CATEGORY_META[h.question.category];
              return (
                <div key={i} style={{ background: "#0f172a", borderRadius: 14, padding: 14, marginBottom: 10, border: "1px solid #334155" }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: meta.color }}>{meta.emoji} {meta.label}</span>
                  <p style={{ fontWeight: 700, fontSize: 14, margin: "6px 0 4px", color: "#f1f5f9" }}>{h.question.question}</p>
                  <p style={{ fontSize: 12, color: "#fca5a5" }}>Iyong sagot: {h.question.choices[h.selected]}</p>
                  <p style={{ fontSize: 12, color: "#86efac" }}>Tamang sagot: {h.question.choices[h.question.answer]}</p>
                  <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{h.question.explanation}</p>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn" style={{ flex: 1, padding: 14, borderRadius: 14, background: "#1e293b", color: "#e2e8f0", fontWeight: 800, fontFamily: "inherit", fontSize: 15, border: "1px solid #334155" }} onClick={() => setScreen("home")}>🏠 Home</button>
            <button className="btn" style={{ flex: 1, padding: 14, borderRadius: 14, background: "linear-gradient(90deg,#4f8ef7,#a855f7)", color: "white", fontWeight: 800, fontFamily: "inherit", fontSize: 15 }} onClick={startQuiz}>🔄 Ulit</button>
          </div>
        </div>
      )}
      
      {/* ======================== INTERVIEW ======================== */}
      {screen === "interview" && (
        <div style={{ maxWidth: 660, margin: "0 auto", padding: "24px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <button className="btn" style={{ background: "#1e293b", borderRadius: 10, padding: "8px 14px", color: "#94a3b8", fontFamily: "inherit", fontWeight: 700, fontSize: 13 }} onClick={() => setScreen("home")}>← Bumalik</button>
            <span style={{ fontWeight: 800, color: "#14b8a6", fontSize: 15 }}>🎤 Interview Prep</span>
          </div>

          <div style={{ background: "linear-gradient(135deg,#134e4a,#0f2d2b)", borderRadius: 18, padding: 20, marginBottom: 20, border: "1px solid #14b8a6" }}>
            <p style={{ fontWeight: 800, color: "#5eead4", marginBottom: 6 }}>💡 Tandaan:</p>
            <p style={{ color: "#99f6e4", fontSize: 13, lineHeight: 1.6 }}>Ang mga salitang naka-bold sa bawat sagot ay mga keyword na dapat mong banggitin. Mag-aral ng mabuti at i-personalize ang mga sagot para maging natural.</p>
          </div>

          {/* Navigator */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {interviewQs.map((q, i) => (
              <button key={i} className="btn" style={{ padding: "8px 14px", borderRadius: 10, background: interviewIdx === i ? "#14b8a6" : "#1e293b", color: interviewIdx === i ? "white" : "#64748b", fontWeight: 800, fontFamily: "inherit", fontSize: 13, border: `1px solid ${interviewIdx === i ? "#14b8a6" : "#334155"}` }} onClick={() => { setInterviewIdx(i); setShowAnswer(false); }}>
                Q{i+1}
              </button>
            ))}
          </div>

          {interviewQs[interviewIdx] && (
            <div>
              <div style={{ background: "#1e293b", borderRadius: 18, padding: 22, marginBottom: 16, border: "1px solid #334155" }}>
                <p style={{ color: "#64748b", fontSize: 12, fontWeight: 800, marginBottom: 8 }}>TANONG {interviewIdx+1} / {interviewQs.length}</p>
                <p style={{ fontWeight: 800, fontSize: 17, color: "#f1f5f9", lineHeight: 1.5 }}>"{interviewQs[interviewIdx].question}"</p>
              </div>

              <button className="btn" style={{ width: "100%", padding: 14, borderRadius: 14, background: showAnswer ? "#0f172a" : "linear-gradient(90deg,#14b8a6,#0891b2)", color: showAnswer ? "#94a3b8" : "white", fontWeight: 800, fontSize: 15, fontFamily: "inherit", marginBottom: 14, border: showAnswer ? "1px solid #334155" : "none" }} onClick={() => setShowAnswer(s=>!s)}>
                {showAnswer ? "🙈 Itago ang Sagot" : "👁️ Ipakita ang Sagot"}
              </button>

              {showAnswer && (
                <div style={{ background: "#0f2d2b", borderRadius: 18, padding: 20, border: "1px solid #14b8a6", marginBottom: 16 }}>
                  <p style={{ color: "#5eead4", fontWeight: 800, marginBottom: 10, fontSize: 14 }}>📢 Halimbawang Sagot (Tagalog):</p>
                  <p style={{ color: "#e2e8f0", lineHeight: 1.8, fontSize: 15 }}>{interviewQs[interviewIdx].answer}</p>
                  <div style={{ marginTop: 14, borderTop: "1px solid #134e4a", paddingTop: 12 }}>
                    <p style={{ color: "#5eead4", fontWeight: 800, fontSize: 12, marginBottom: 6 }}>🔑 KEYWORDS na dapat banggitin:</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {interviewQs[interviewIdx].keywords.map((kw,i) => (
                        <span key={i} style={{ padding: "4px 10px", borderRadius: 8, background: "#134e4a", color: "#5eead4", fontSize: 12, fontWeight: 700 }}>{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn" style={{ flex: 1, padding: 14, borderRadius: 14, background: "#1e293b", color: "#94a3b8", fontWeight: 800, fontFamily: "inherit", border: "1px solid #334155" }} onClick={() => { setInterviewIdx(i => Math.max(0, i-1)); setShowAnswer(false); }} disabled={interviewIdx === 0}>← Nakaraan</button>
                <button className="btn" style={{ flex: 1, padding: 14, borderRadius: 14, background: interviewIdx < interviewQs.length-1 ? "linear-gradient(90deg,#14b8a6,#0891b2)" : "#1e293b", color: "white", fontWeight: 800, fontFamily: "inherit" }} onClick={() => { setInterviewIdx(i => Math.min(interviewQs.length-1, i+1)); setShowAnswer(false); }} disabled={interviewIdx === interviewQs.length-1}>Susunod →</button>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* ======================== ADMIN ======================== */}
      {screen === "admin" && (
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <button className="btn" style={{ background: "#1e293b", borderRadius: 10, padding: "8px 14px", color: "#94a3b8", fontFamily: "inherit", fontWeight: 700, fontSize: 13 }} onClick={() => setScreen("home")}>← Bumalik</button>
            <span style={{ fontWeight: 800, color: "#f97316", fontSize: 15 }}>⚙️ Admin Panel</span>
          </div>

          {!adminUnlocked ? (
            <div style={{ background: "#1e293b", borderRadius: 18, padding: 28, border: "1px solid #334155", maxWidth: 360, margin: "0 auto", textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔐</div>
              <p style={{ fontWeight: 800, marginBottom: 16 }}>Admin Password</p>
              <input className="input-field" type="password" placeholder="Password..." value={adminPw} onChange={e=>setAdminPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleAdminLogin()} style={{ marginBottom: 12 }} />
              <button className="btn" style={{ width: "100%", padding: 12, borderRadius: 12, background: "#f97316", color: "white", fontWeight: 800, fontFamily: "inherit" }} onClick={handleAdminLogin}>Login</button>
              <p style={{ color: "#64748b", fontSize: 11, marginTop: 10 }}>Default: asu2026</p>
            </div>
          ) : (
            <div>
              {/* Filter + Add */}
              <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
                <select className="input-field" style={{ flex: 1, minWidth: 160 }} value={filterCat} onChange={e=>setFilterCat(e.target.value)}>
                  <option value="all">Lahat ng Kategorya</option>
                  {Object.entries(CATEGORY_META).map(([k,v]) => <option key={k} value={k}>{v.emoji} {v.label}</option>)}
                </select>
                <button className="btn" style={{ padding: "10px 18px", borderRadius: 12, background: "#22c55e", color: "white", fontWeight: 800, fontFamily: "inherit", fontSize: 14 }} onClick={() => setEditModal({ mode: "add", question: { category: "english", question: "", choices: ["","","",""], answer: 0, explanation: "" } })}>
                  + Mag-add ng Tanong
                </button>
              </div>

              {/* Question list */}
              {questions.filter(q => filterCat === "all" || q.category === filterCat).map(q => {
                const meta = CATEGORY_META[q.category];
                return (
                  <div key={q.id} className="card-hover" style={{ background: "#1e293b", borderRadius: 14, padding: 16, marginBottom: 10, border: "1px solid #334155" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: meta.color }}>{meta.emoji} {meta.label}</span>
                        <p style={{ fontWeight: 700, fontSize: 14, color: "#f1f5f9", marginTop: 4, lineHeight: 1.4 }}>{q.question}</p>
                        {q.choices && <p style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Sagot: {q.choices[q.answer]}</p>}
                      </div>
                      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                        <button className="btn" style={{ padding: "6px 12px", borderRadius: 8, background: "#1e3a5f", color: "#4f8ef7", fontWeight: 700, fontFamily: "inherit", fontSize: 13 }} onClick={() => setEditModal({ mode: "edit", question: {...q, choices: q.choices || ["","","",""] } })}>✏️</button>
                        <button className="btn" style={{ padding: "6px 12px", borderRadius: 8, background: "#450a0a", color: "#ef4444", fontWeight: 700, fontFamily: "inherit", fontSize: 13 }} onClick={() => handleDeleteQuestion(q.id)}>🗑️</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================== EDIT MODAL ======================== */}
      {editModal && <EditModal q={editModal.question} mode={editModal.mode} onSave={handleSaveQuestion} onClose={() => setEditModal(null)} />}
    </div>
  );
}
// ============================================================
// EDIT MODAL
// ============================================================
function EditModal({ q, mode, onSave, onClose }) {
  const [form, setForm] = useState({ ...q });
  const isInterview = form.category === "interview";

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const updateChoice = (i, val) => setForm(f => { const c = [...f.choices]; c[i]=val; return {...f, choices:c}; });

  return (
    <div className="modal-overlay" onClick={e => e.target===e.currentTarget&&onClose()}>
      <div className="modal-box">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontWeight: 800, fontSize: 18 }}>{mode === "add" ? "➕ Mag-add ng Tanong" : "✏️ I-edit ang Tanong"}</h3>
          <button className="btn" style={{ background: "#334155", borderRadius: 8, padding: "6px 12px", color: "#94a3b8", fontFamily: "inherit", fontWeight: 700 }} onClick={onClose}>✕</button>
        </div>

        <label style={{ fontWeight: 700, fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 6 }}>Kategorya:</label>
        <select className="input-field" style={{ marginBottom: 14 }} value={form.category} onChange={e => update("category", e.target.value)}>
          {Object.entries(CATEGORY_META).map(([k,v]) => <option key={k} value={k}>{v.emoji} {v.label}</option>)}
        </select>

        <label style={{ fontWeight: 700, fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 6 }}>Tanong:</label>
        <textarea className="input-field" style={{ marginBottom: 14 }} value={form.question} onChange={e => update("question", e.target.value)} placeholder="Ilagay ang tanong dito..." />

        {!isInterview ? (
          <>
            <label style={{ fontWeight: 700, fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 8 }}>Mga Pagpipilian (i-click ang ✓ para itakda bilang tamang sagot):</label>
            {(form.choices || ["","","",""]).map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                <button className="btn" style={{ padding: "8px 12px", borderRadius: 8, background: form.answer === i ? "#14532d" : "#1e293b", color: form.answer === i ? "#86efac" : "#64748b", fontWeight: 800, fontFamily: "inherit", fontSize: 13, border: `1px solid ${form.answer===i?"#22c55e":"#334155"}`, flexShrink: 0 }} onClick={() => update("answer", i)}>
                  {String.fromCharCode(65+i)} {form.answer===i?"✓":""}
                </button>
                <input className="input-field" value={c} onChange={e=>updateChoice(i,e.target.value)} placeholder={`Choice ${String.fromCharCode(65+i)}`} />
              </div>
            ))}
            <label style={{ fontWeight: 700, fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 6, marginTop: 8 }}>Paliwanag (Explanation):</label>
            <textarea className="input-field" style={{ marginBottom: 18 }} value={form.explanation||""} onChange={e=>update("explanation",e.target.value)} placeholder="Ipaliwanag ang tamang sagot..." />
          </>
        ) : (
          <>
            <label style={{ fontWeight: 700, fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 6 }}>Sagot/Script:</label>
            <textarea className="input-field" style={{ marginBottom: 14, minHeight: 100 }} value={form.answer||""} onChange={e=>update("answer",e.target.value)} placeholder="Ilagay ang halimbawang sagot..." />
            <label style={{ fontWeight: 700, fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 6 }}>Keywords (comma-separated):</label>
            <input className="input-field" style={{ marginBottom: 18 }} value={(form.keywords||[]).join(", ")} onChange={e=>update("keywords", e.target.value.split(",").map(s=>s.trim()).filter(Boolean))} placeholder="integridad, RA 9280, ..." />
          </>
        )}

        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn" style={{ flex: 1, padding: 12, borderRadius: 12, background: "#334155", color: "#94a3b8", fontWeight: 800, fontFamily: "inherit" }} onClick={onClose}>Kanselahin</button>
          <button className="btn" style={{ flex: 1, padding: 12, borderRadius: 12, background: "linear-gradient(90deg,#4f8ef7,#a855f7)", color: "white", fontWeight: 800, fontFamily: "inherit" }} onClick={() => onSave(form)}>
            {mode === "add" ? "✅ I-add" : "💾 I-save"}
          </button>
        </div>
      </div>
    </div>
  );
}