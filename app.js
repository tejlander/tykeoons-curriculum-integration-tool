// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const HALF_TERMS = [
  { id: "A1", label: "Autumn 1" },
  { id: "A2", label: "Autumn 2" },
  { id: "S1", label: "Spring 1" },
  { id: "S2", label: "Spring 2" },
  { id: "U1", label: "Summer 1" },
  { id: "U2", label: "Summer 2" }
];

const YEARS = [
  { id: "R",  label: "Reception" },
  { id: "Y1", label: "Year 1" },
  { id: "Y2", label: "Year 2" },
  { id: "Y3", label: "Year 3" },
  { id: "Y4", label: "Year 4" },
  { id: "Y5", label: "Year 5" },
  { id: "Y6", label: "Year 6" }
];

const YEAR_ORDER = YEARS.map(y => y.id);

// Phase-start years where lesson sequence is treated as a hard constraint
const SEQUENCE_LOCKED_YEARS = new Set(["R", "Y3", "Y5"]);

// Recap type by year: R and Y1 use Shared Reading Recap (not written comprehension)
const SHARED_READING_YEARS = new Set(["R", "Y1"]);

const BALANCED_SPREAD = [
  { halfTerm: "A2", week: 4 },
  { halfTerm: "S1", week: 4 },
  { halfTerm: "S2", week: 4 },
  { halfTerm: "U1", week: 4 },
  { halfTerm: "U1", week: 6 },
  { halfTerm: "U2", week: 4 }
];

const SCHOOL_TYPE_YEARS = {
  primary: ["R", "Y1", "Y2", "Y3", "Y4", "Y5", "Y6"],
  infant:  ["R", "Y1", "Y2"],
  junior:  ["Y3", "Y4", "Y5", "Y6"],
  custom:  null
};

const CUSTOM_MATHS_TOPICS = [
  ["early-number",  "Early number, counting and recognising coins"],
  ["coin-value",    "Coin value, making amounts and checking change"],
  ["records",       "Recording money, spending and saving"],
  ["value",         "Value for money, comparison and unit cost"],
  ["decimals",      "Decimals, money notation and calculations"],
  ["percentages",   "Percentages, interest and compound growth"]
];

const CUSTOM_PSHE_TOPICS = [
  ["needs-wants",  "Needs, wants and financial choices"],
  ["safe-money",   "Keeping money safe and asking trusted adults"],
  ["helping",      "Helping others, charity or community responsibility"],
  ["influence",    "Advertising, persuasion and critical consumer choices"],
  ["online-risk",  "Online safety, scams, gaming or digital spending"],
  ["earning",      "Earning, work, saving and future goals"]
];

// ─── WIDGETS ──────────────────────────────────────────────────────────────────

const WIDGETS = {
  "maths-add":           { subject: "Maths",   file: "widget-maths-add-subtract.png",     label: "Maths: Addition/Subtraction" },
  "maths-multiply":      { subject: "Maths",   file: "widget-maths-multiply-divide.png",  label: "Maths: Multiply/Divide" },
  "maths-decimals":      { subject: "Maths",   file: "widget-maths-decimals.png",          label: "Maths: Decimals" },
  "maths-percentages":   { subject: "Maths",   file: "widget-maths-percentages.png",       label: "Maths: Percentages" },
  "maths-calculator":    { subject: "Maths",   file: "widget-maths-calculator-use.png",    label: "Maths: Calculator use" },
  "pshe-wider":          { subject: "PSHE",    file: "widget-pshe-wider-world.png",        label: "PSHE: Living in Wider World" },
  "pshe-relationships":  { subject: "PSHE",    file: "widget-pshe-relationships.png",      label: "PSHE: Relationships" },
  "computing-esafety":   { subject: "Computing", file: "widget-computing-e-safety.png",   label: "Computing: E-safety" },
  "english-persuasive":  { subject: "English", file: "widget-english-persuasive-writing.png", label: "English: Persuasive writing" },
  "reading-comprehension": { subject: "Reading", file: "widget-reading-comprehension.png", label: "Reading comprehension" },
  "shared-reading":      { subject: "Reading", file: "widget-reading-comprehension.png",   label: "Shared Reading Recap" }
};

const LESSON_WIDGETS = {
  R1:     ["maths-add", "pshe-wider"],
  R2:     ["maths-add", "pshe-wider"],
  R3:     ["pshe-wider"],
  R4:     ["pshe-wider"],
  "Y1-1": ["maths-add", "pshe-wider"],
  "Y1-2": ["maths-add", "pshe-wider"],
  "Y1-3": ["pshe-wider"],
  "Y1-4": ["pshe-wider"],
  "Y2-1": ["pshe-wider"],
  "Y2-2": ["maths-add", "pshe-wider"],
  "Y2-3": ["maths-add", "pshe-wider"],
  "Y2-4": ["pshe-wider"],
  "Y3-1": ["maths-add", "pshe-wider"],
  "Y3-2": ["maths-add", "pshe-wider"],
  "Y3-3": ["pshe-wider", "pshe-relationships"],
  "Y3-4": ["maths-add", "pshe-wider"],
  "Y3-5": ["pshe-wider"],
  "Y3-6": ["pshe-wider", "pshe-relationships"],
  "Y4-7": ["pshe-wider"],
  "Y4-8": ["pshe-wider"],
  "Y4-9": ["pshe-wider"],
  "Y4-10": ["pshe-wider", "computing-esafety"],
  "Y4-11": ["pshe-wider"],
  "Y4-12": ["pshe-wider", "maths-multiply", "maths-add"],
  "Y5-1": ["maths-add"],
  "Y5-2": ["maths-multiply"],
  "Y5-3": ["pshe-relationships", "computing-esafety"],
  "Y5-4": ["pshe-relationships", "english-persuasive"],
  "Y5-5": ["pshe-wider", "computing-esafety"],
  "Y5-6": ["maths-multiply", "maths-decimals", "maths-calculator"],
  "Y6-7": ["maths-percentages", "pshe-relationships", "pshe-wider"],
  "Y6-8": ["maths-percentages", "pshe-relationships", "pshe-wider"],
  "Y6-9": ["pshe-relationships", "computing-esafety"],
  "Y6-10": ["pshe-wider", "maths-add"],
  "Y6-11": ["maths-multiply", "maths-decimals", "maths-calculator"],
  "Y6-12": ["maths-decimals", "maths-percentages", "pshe-wider"]
};

// ─── LESSONS ──────────────────────────────────────────────────────────────────

const LESSONS = [
  // Phase 1 – EYFS (Reception)
  lesson("R1",    "R",  1, "What does money look like?",       "Maths", ["early-number","coin-value"],           "Recognising coins and notes, noticing that money has different forms and values.", false),
  lesson("R2",    "R",  2, "How much do I have?",               "Maths", ["early-number","coin-value"],           "Counting small collections of coins and connecting numerals to value.", false),
  lesson("R3",    "R",  3, "How should we use money?",          "PSHE",  ["needs-wants"],                          "Making simple spending choices and beginning to talk about fair exchange.", false),
  lesson("R4",    "R",  4, "Why should we keep money safe?",    "PSHE",  ["safe-money"],                           "Looking after coins and choosing safer places to keep money.", false),
  // Phase 1 – KS1 Year 1
  lesson("Y1-1",  "Y1", 1, "What are my coins worth?",          "Maths", ["coin-value","early-number"],           "Recognising and ordering coins up to £1, then using them to make simple amounts.", false),
  lesson("Y1-2",  "Y1", 2, "How do I check my change?",         "Maths", ["coin-value","change"],                 "Paying for small-priced items and checking simple change from 10p, 20p, 50p and £1.", false),
  lesson("Y1-3",  "Y1", 3, "Do I need it or want it?",          "PSHE",  ["needs-wants"],                          "Sorting needs and wants and making choices when we cannot have everything.", false),
  lesson("Y1-4",  "Y1", 4, "Why are banks the safest place?",   "PSHE",  ["safe-money"],                           "Comparing places to keep money and explaining why banks are safer than loose cash.", false),
  // Phase 1 – KS1 Year 2
  lesson("Y2-1",  "Y2", 1, "Where does money come from?",       "PSHE",  ["earning"],                              "Exploring earning, being given money, finding money and winning money.", false),
  lesson("Y2-2",  "Y2", 2, "How do people pay for things?",     "Maths", ["payments","coin-value"],               "Comparing cash, cards and phones as ways to pay for goods and services.", false),
  lesson("Y2-3",  "Y2", 3, "What happens if we don't keep track?", "Maths", ["records","change"],                 "Using simple records to track spending and avoid running out of money.", false),
  lesson("Y2-4",  "Y2", 4, "What happens when we save?",        "PSHE",  ["saving","needs-wants"],                "Saving over time, planning for a goal and recognising different spending choices.", false),
  // Phase 2 – Lower KS2 Year 3
  lesson("Y3-1",  "Y3", 1, "What is money?",                    "Maths", ["payments","coin-value","early-number"], "Linking money with value and comparing physical cash with electronic money.", true),
  lesson("Y3-2",  "Y3", 2, "What do I want and what do I need?","PSHE",  ["needs-wants"],                          "Prioritising needs and wants and recognising that value depends on situation.", true),
  lesson("Y3-3",  "Y3", 3, "What makes me want to buy things?", "PSHE",  ["influence"],                            "Spotting influences on spending and pausing before making a financial choice.", true),
  lesson("Y3-4",  "Y3", 4, "How do I keep track of my money?",  "Maths", ["records"],                              "Recording money in and out so a balance can be tracked accurately.", true),
  lesson("Y3-5",  "Y3", 5, "How do I keep my money safe?",      "PSHE",  ["safe-money"],                           "Using accounts, trusted adults and sensible routines to reduce money risk.", true),
  lesson("Y3-6",  "Y3", 6, "How could I buy something big?",    "PSHE",  ["saving","borrowing"],                   "Planning towards a larger purchase and comparing saving with borrowing.", true),
  // Phase 2 – Lower KS2 Year 4
  lesson("Y4-7",  "Y4", 1, "How could my money help others?",   "PSHE",  ["helping"],                              "Using money to help others through giving, charity and community-minded choices.", true),
  lesson("Y4-8",  "Y4", 2, "What are banks for?",               "PSHE",  ["safe-money","borrowing"],               "Understanding deposits, loans and the basic role of banks.", true),
  lesson("Y4-9",  "Y4", 3, "Why does saving matter?",           "PSHE",  ["saving"],                               "Building the habit of saving and seeing why spending less than we earn matters.", true),
  lesson("Y4-10", "Y4", 4, "How can games and apps take your money?", "Computing", ["online-risk","influence"],    "Recognising digital spending traps, freemium design and in-app purchases.", true),
  lesson("Y4-11", "Y4", 5, "Why don't all jobs pay the same?",  "PSHE",  ["earning"],                              "Exploring pay, training, skills and the reasons jobs may be rewarded differently.", true),
  lesson("Y4-12", "Y4", 6, "Can you keep all your pay?",        "Maths", ["earning","records"],                   "Reading a payslip-style context and distinguishing gross pay from deductions.", true),
  // Phase 3 – Upper KS2 Year 5
  lesson("Y5-1",  "Y5", 1, "What's a budget and why do I need one?", "Maths", ["budgeting","records"],            "Creating a plan for income, spending and saving so money does not run out.", false),
  lesson("Y5-2",  "Y5", 2, "How do I get the most from each pound?", "Maths", ["value","decimals"],              "Comparing value for money and making like-for-like spending decisions.", false),
  lesson("Y5-3",  "Y5", 3, "How can I outsmart money tricksters?",   "Computing", ["online-risk"],               "Identifying scams, phishing and suspicious requests for money or information.", false),
  lesson("Y5-4",  "Y5", 4, "What could persuade me to spend?",       "English",   ["influence"],                 "Evaluating advertising, peer pressure and emotional triggers to spend.", false),
  lesson("Y5-5",  "Y5", 5, "What gambles are there in games?",        "Computing", ["online-risk","influence"],   "Understanding loot boxes, chance-based rewards and gambling-like mechanics.", false),
  lesson("Y5-6",  "Y5", 6, "How does money work abroad?",             "Maths",     ["decimals","currency"],       "Using currency and exchange-rate contexts to compare money in different countries.", false),
  // Phase 3 – Upper KS2 Year 6
  lesson("Y6-7",  "Y6", 1, "What's the price of debt?",          "Maths", ["borrowing","percentages"],           "Calculating the cost of borrowing and seeing why repayments exceed the original loan.", false),
  lesson("Y6-8",  "Y6", 2, "When is borrowing worth it?",        "PSHE",  ["borrowing","needs-wants"],           "Weighing up when borrowing is responsible and when it creates avoidable risk.", false),
  lesson("Y6-9",  "Y6", 3, "'Easy money' — what's the catch?",   "Computing", ["online-risk"],                   "Recognising money muling and other risky shortcuts promoted online.", false),
  lesson("Y6-10", "Y6", 4, "What does wealth really mean?",      "PSHE",  ["wealth","needs-wants"],             "Looking beyond income to assets, debt, wellbeing and subjective value.", false),
  lesson("Y6-11", "Y6", 5, "How can money earn more money?",     "Maths", ["saving","percentages"],             "Introducing interest, return and the idea that money can grow over time.", false),
  lesson("Y6-12", "Y6", 6, "How does investing work?",           "Maths", ["percentages","wealth"],             "Applying percentage growth and compounding to long-term investing contexts.", false)
];

// ─── SCHEMES ──────────────────────────────────────────────────────────────────

const SCHEMES = {
  maths: {
    "white-rose": {
      name: "White Rose Maths",
      topics: {
        R:  topic("A2", 4, "Match, sort, compare, subitising and early number", ["early-number"]),
        Y1: topic("S2", 5, "Place value within 50, then measurement contexts including money readiness", ["coin-value","early-number"]),
        Y2: topic("A2", 5, "Money: pounds, pence, making amounts, comparing and finding change", ["coin-value","change","payments","records"]),
        Y3: topic("S1", 5, "Addition/subtraction and money-style contexts before multiplication and division", ["records","payments","saving"]),
        Y4: topic("S2", 5, "Decimals and money notation after fractions/decimals fluency", ["decimals","records","earning"]),
        Y5: topic("S1", 5, "Multiplication/division, fractions and decimals for value comparison", ["budgeting","value","decimals","currency"]),
        Y6: topic("S2", 5, "Fractions, decimals and percentages applied to financial contexts", ["percentages","borrowing","wealth","saving"])
      }
    },
    ncetm: {
      name: "NCETM primary mastery / curriculum prioritisation",
      topics: {
        R:  topic("A2", 5, "Counting, composition and comparison of small quantities", ["early-number"]),
        Y1: topic("U1", 4, "Unitising and coin recognition after numbers 0–20", ["coin-value","early-number"]),
        Y2: topic("S1", 5, "Addition and subtraction of two-digit numbers and multiplication structures", ["change","records","saving"]),
        Y3: topic("S1", 5, "Securing additive structures and column methods before money applications", ["records","payments"]),
        Y4: topic("S2", 5, "Decimal fractions and measures before money notation and comparison", ["decimals","earning"]),
        Y5: topic("S1", 5, "Multiplicative reasoning, decimals and comparison contexts", ["budgeting","value","decimals","currency"]),
        Y6: topic("S1", 5, "Ratio, fractions, decimals and percentages for financial reasoning", ["percentages","borrowing","wealth","saving"])
      }
    },
    "power-maths": {
      name: "Power Maths",
      topics: {
        R:  topic("A2", 5, "Early number, comparison and practical counting contexts", ["early-number"]),
        Y1: topic("S2", 5, "Addition, subtraction, place value and money-ready fluency", ["coin-value","change"]),
        Y2: topic("A2", 5, "Money, addition/subtraction and checking change", ["coin-value","change","records"]),
        Y3: topic("S1", 5, "Addition and subtraction with money contexts", ["records","payments"]),
        Y4: topic("S2", 5, "Decimals and measures applied to pounds and pence", ["decimals","earning"]),
        Y5: topic("S1", 5, "Multiplication, division, fractions and decimals for value comparison", ["budgeting","value","decimals"]),
        Y6: topic("S2", 5, "Percentages, ratio and multi-step financial problems", ["percentages","borrowing","wealth"])
      }
    },
    "maths-no-problem": {
      name: "Maths No Problem!",
      topics: {
        R:  topic("A2", 4, "Numbers, comparing quantities and early problem solving", ["early-number"]),
        Y1: topic("S2", 5, "Numbers to 100, addition/subtraction and money applications", ["coin-value","change"]),
        Y2: topic("A2", 5, "Money, multiplication/division readiness and bar-model contexts", ["coin-value","change","records"]),
        Y3: topic("S1", 5, "Addition/subtraction and bar-model problem solving", ["records","payments"]),
        Y4: topic("S2", 5, "Decimals and measures before money notation", ["decimals","earning"]),
        Y5: topic("S1", 5, "Fractions, decimals and comparison problem solving", ["budgeting","value","decimals"]),
        Y6: topic("S1", 5, "Percentages, ratio and financial reasoning", ["percentages","borrowing","wealth"])
      }
    },
    "mathematics-mastery": {
      name: "Mathematics Mastery / Ark Curriculum Plus",
      topics: {
        R:  topic("A2", 5, "Mathematical thinking, counting and composition", ["early-number"]),
        Y1: topic("U1", 4, "Unitising, coin recognition and additive reasoning", ["coin-value","early-number"]),
        Y2: topic("S1", 5, "Additive reasoning and two-digit calculations", ["change","records"]),
        Y3: topic("S1", 5, "Additive structures, calculation and money applications", ["records","payments"]),
        Y4: topic("S2", 5, "Decimal fractions, measures and money notation", ["decimals","earning"]),
        Y5: topic("S1", 5, "Multiplicative reasoning, decimals and value comparison", ["budgeting","value","decimals"]),
        Y6: topic("S1", 5, "Ratio, percentage and proportional financial reasoning", ["percentages","borrowing","wealth"])
      }
    },
    hamilton: {
      name: "Hamilton Trust / Hamilton Brookes Maths",
      topics: {
        R:  topic("A2", 5, "Counting, comparing and practical number work", ["early-number"]),
        Y1: topic("S2", 5, "Addition/subtraction, place value and practical money contexts", ["coin-value","change"]),
        Y2: topic("A2", 5, "Money, addition/subtraction and problem solving", ["coin-value","change","records"]),
        Y3: topic("S1", 5, "Number facts, written calculation and money problems", ["records","payments"]),
        Y4: topic("S2", 5, "Decimals and measures used in money contexts", ["decimals","earning"]),
        Y5: topic("S1", 5, "Decimals, fractions and value-for-money problem solving", ["budgeting","value","decimals"]),
        Y6: topic("S2", 5, "Percentages, ratio and applied financial problems", ["percentages","borrowing","wealth"])
      }
    },
    "twinkl-planit": {
      name: "Twinkl PlanIt Maths",
      topics: {
        R:  topic("A2", 5, "Early number and comparing quantities", ["early-number"]),
        Y1: topic("S2", 5, "Place value, addition/subtraction and money preparation", ["coin-value","change"]),
        Y2: topic("A2", 5, "Money: recognising coins, making amounts and finding change", ["coin-value","change","records"]),
        Y3: topic("S1", 5, "Addition/subtraction and money problem contexts", ["records","payments"]),
        Y4: topic("S2", 5, "Decimals, measures and pounds/pence notation", ["decimals","earning"]),
        Y5: topic("S1", 5, "Decimals, fractions and comparison for value", ["budgeting","value","decimals"]),
        Y6: topic("S2", 5, "Percentages and multi-step financial reasoning", ["percentages","borrowing","wealth"])
      }
    },
    "busy-ant": {
      name: "Collins Busy Ant Maths",
      topics: {
        R:  topic("A2", 5, "Early number, sorting and comparing", ["early-number"]),
        Y1: topic("S2", 5, "Counting, calculating and introductory money contexts", ["coin-value","change"]),
        Y2: topic("A2", 5, "Money and calculation within applied problem solving", ["coin-value","change","records"]),
        Y3: topic("S1", 5, "Addition/subtraction and practical money problems", ["records","payments"]),
        Y4: topic("S2", 5, "Decimals, measures and money notation", ["decimals","earning"]),
        Y5: topic("S1", 5, "Decimals, fractions and value comparison", ["budgeting","value","decimals"]),
        Y6: topic("S2", 5, "Percentages and financial problem solving", ["percentages","borrowing","wealth"])
      }
    },
    abacus: {
      name: "Abacus",
      topics: {
        R:  topic("A2", 5, "Counting, comparing and early practical number", ["early-number"]),
        Y1: topic("S2", 5, "Place value, addition/subtraction and money contexts", ["coin-value","change"]),
        Y2: topic("A2", 5, "Money and addition/subtraction in problem solving", ["coin-value","change","records"]),
        Y3: topic("S1", 5, "Written addition/subtraction and money-style contexts", ["records","payments"]),
        Y4: topic("S2", 5, "Decimals and measures in pounds and pence", ["decimals","earning"]),
        Y5: topic("S1", 5, "Fractions, decimals and comparison", ["budgeting","value","decimals"]),
        Y6: topic("S2", 5, "Percentages, ratio and multi-step money problems", ["percentages","borrowing","wealth"])
      }
    },
    doodlemaths: {
      name: "DoodleMaths",
      topics: {
        R:  topic("A2", 5, "Adaptive early number and comparison practice", ["early-number"]),
        Y1: topic("S2", 5, "Adaptive number and addition/subtraction practice", ["coin-value","change"]),
        Y2: topic("A2", 5, "Money, calculation and adaptive fluency practice", ["coin-value","change","records"]),
        Y3: topic("S1", 5, "Adaptive addition/subtraction and money applications", ["records","payments"]),
        Y4: topic("S2", 5, "Decimals and measures practice", ["decimals","earning"]),
        Y5: topic("S1", 5, "Fractions, decimals and problem solving", ["budgeting","value","decimals"]),
        Y6: topic("S2", 5, "Percentages, ratio and applied reasoning", ["percentages","borrowing","wealth"])
      }
    }
  },
  pshe: {
    scarf: {
      name: "SCARF",
      topics: {
        R:  topic("S2", 4, "Rights and Respect: looking after things, including money", ["safe-money","needs-wants"]),
        Y1: topic("S2", 4, "Rights and Respect: taking care of myself, my money and my environment", ["needs-wants","safe-money"]),
        Y2: topic("S2", 4, "Rights and Respect: looking after money, saving and spending", ["saving","needs-wants","records"]),
        Y3: topic("S2", 4, "Rights and Respect: managing money, helping and critical thinking", ["safe-money","records","helping","influence"]),
        Y4: topic("S2", 4, "Rights and Respect: helping others, media influence and spending decisions", ["helping","influence","safe-money"]),
        Y5: topic("S2", 4, "Rights and Respect: lending, borrowing, spending and media manipulation", ["borrowing","influence","online-risk"]),
        Y6: topic("S2", 4, "Rights and Respect: earning and saving money, media bias and democracy", ["earning","saving","wealth"])
      }
    },
    jigsaw: {
      name: "Jigsaw PSHE",
      topics: {
        R:  topic("A1", 5, "Being Me in My World: choices, responsibility and kindness", ["needs-wants"]),
        Y1: topic("A1", 5, "Being Me in My World: choices and consequences", ["needs-wants","safe-money"]),
        Y2: topic("S1", 5, "Dreams and Goals: perseverance, saving for goals and choices", ["saving","earning"]),
        Y3: topic("A1", 5, "Being Me in My World: self-worth, choices and consequences", ["needs-wants","records"]),
        Y4: topic("S1", 5, "Dreams and Goals: hopes, ambitions, resilience and helping others", ["helping","saving","earning"]),
        Y5: topic("A2", 5, "Celebrating Difference / Healthy Me: influence, online behaviour and self-esteem", ["influence","online-risk"]),
        Y6: topic("A1", 5, "Being Me in My World: wants, needs, rights and global choices", ["needs-wants","wealth","earning"])
      }
    },
    "pol-ed": {
      name: "Pol-Ed",
      topics: {
        R:  topic("S2", 4, "EYFS Relationships, Keeping Safe and Understanding the Law: friendship, safe choices, rules and the police", ["safe-money","needs-wants"]),
        Y1: topic("S2", 4, "Year 1 Relationships, Keeping Safe, Understanding the Law and Wellbeing: trusted adults, speaking up, rules, police and feelings", ["safe-money","needs-wants"]),
        Y2: topic("S2", 4, "Year 2 Relationships, Keeping Safe, Understanding the Law and Wellbeing: family, online safety, age-related rules, money and jobs", ["safe-money","earning","needs-wants","online-risk"]),
        Y3: topic("S2", 4, "Year 3 Relationships, Keeping Safe and Understanding the Law: risk, sharing worries, emergency services, rights and responsible citizenship", ["safe-money","records","helping","influence"]),
        Y4: topic("S2", 4, "Year 4 Relationships, Keeping Safe and Understanding the Law: influence, equality, personal safety, protected characteristics and local responsibility", ["safe-money","helping","influence"]),
        Y5: topic("S2", 4, "Year 5 Relationships, Keeping Safe, Understanding the Law and Wellbeing: peer pressure, media influence, grooming, phones, online purchases and gambling", ["online-risk","influence","value","safe-money"]),
        Y6: topic("S2", 4, "Year 6 Relationships, Keeping Safe, Understanding the Law and Wellbeing: discrimination, crime, legal risk, marriage, mental health and transition", ["online-risk","influence","safe-money","needs-wants","wealth"])
      }
    },
    "pshe-association": {
      name: "PSHE Association Programme of Study / Curriculum Models",
      topics: {
        R:  topic("S2", 4, "Living in the Wider World: simple choices and looking after belongings", ["needs-wants","safe-money"]),
        Y1: topic("S2", 4, "Economic wellbeing: money, choices and keeping things safe", ["needs-wants","safe-money"]),
        Y2: topic("S2", 4, "Economic wellbeing: saving, spending and managing money", ["saving","records"]),
        Y3: topic("S2", 4, "Living in the Wider World: money, choices, risk and responsibility", ["records","safe-money","influence"]),
        Y4: topic("S2", 4, "Living in the Wider World: spending decisions and helping others", ["helping","influence","saving"]),
        Y5: topic("S2", 4, "Economic wellbeing: value, influence, borrowing and online risk", ["value","borrowing","online-risk","influence"]),
        Y6: topic("S2", 4, "Economic wellbeing: earning, saving, debt and future decisions", ["earning","saving","borrowing","wealth"])
      }
    },
    kapow: {
      name: "Kapow RSE & PSHE",
      topics: {
        R:  topic("S2", 4, "Economic wellbeing: simple money choices and looking after things", ["needs-wants","safe-money"]),
        Y1: topic("S2", 4, "Economic wellbeing: needs, wants and keeping money safe", ["needs-wants","safe-money"]),
        Y2: topic("S2", 4, "Economic wellbeing: saving, spending and choices", ["saving","records"]),
        Y3: topic("S2", 4, "Economic wellbeing: budgeting, records and influences", ["records","influence","safe-money"]),
        Y4: topic("S2", 4, "Economic wellbeing: spending decisions and charitable choices", ["helping","influence","saving"]),
        Y5: topic("S2", 4, "Economic wellbeing: borrowing, digital risk and value for money", ["borrowing","online-risk","value"]),
        Y6: topic("S2", 4, "Economic wellbeing: earning, saving and financial choices", ["earning","saving","wealth"])
      }
    },
    twinkl: {
      name: "Twinkl Life / Twinkl PSHE",
      topics: {
        R:  topic("S2", 4, "Living in the Wider World: money, belongings and choices", ["needs-wants","safe-money"]),
        Y1: topic("S2", 4, "Money Matters: needs, wants and keeping money safe", ["needs-wants","safe-money"]),
        Y2: topic("S2", 4, "Money Matters: saving, spending and choices", ["saving","records"]),
        Y3: topic("S2", 4, "Money Matters: managing money and making choices", ["records","influence"]),
        Y4: topic("S2", 4, "Money Matters: spending choices and helping others", ["helping","influence"]),
        Y5: topic("S2", 4, "Money Matters: borrowing, risk and critical consumer choices", ["borrowing","online-risk","value"]),
        Y6: topic("S2", 4, "Money Matters: earning, saving and financial futures", ["earning","saving","wealth"])
      }
    },
    "one-decision": {
      name: "1decision",
      topics: {
        R:  topic("S2", 4, "Keeping/Staying Safe and Being Responsible: looking after things", ["safe-money"]),
        Y1: topic("S2", 4, "Being Responsible: money, choices and consequences", ["needs-wants","safe-money"]),
        Y2: topic("S2", 4, "Being Responsible: saving, spending and keeping track", ["saving","records"]),
        Y3: topic("S2", 4, "Being Responsible: managing money and risks", ["records","safe-money"]),
        Y4: topic("S2", 4, "Relationships / Being Responsible: helping others and influence", ["helping","influence"]),
        Y5: topic("S2", 4, "Computer Safety / Being Responsible: scams, pressure and borrowing choices", ["online-risk","borrowing","influence"]),
        Y6: topic("S2", 4, "Being Responsible: earning, saving and future choices", ["earning","saving","wealth"])
      }
    },
    discovery: {
      name: "Discovery Education Health and Relationships",
      topics: {
        R:  topic("S2", 4, "Caring and Responsibility: looking after belongings and simple choices", ["safe-money","needs-wants"]),
        Y1: topic("S2", 4, "Caring and Responsibility: taking care of money and things", ["safe-money"]),
        Y2: topic("S2", 4, "Caring and Responsibility: choices, saving and spending", ["saving","needs-wants"]),
        Y3: topic("S2", 4, "Caring and Responsibility: money, decision making and helping", ["records","helping"]),
        Y4: topic("S2", 4, "Caring and Responsibility: helping others and spending choices", ["helping","influence"]),
        Y5: topic("S2", 4, "Healthy Bodies, Healthy Minds / Responsibility: digital and financial risk", ["online-risk","influence","borrowing"]),
        Y6: topic("S2", 4, "Caring and Responsibility: earning, saving and social responsibility", ["earning","saving","wealth"])
      }
    },
    "3d-pshe": {
      name: "3D PSHE / Dimensions",
      topics: {
        R:  topic("S2", 4, "Living in the Wider World: simple responsibility and looking after money", ["safe-money"]),
        Y1: topic("S2", 4, "Living in the Wider World: needs, wants and responsibility", ["needs-wants","safe-money"]),
        Y2: topic("S2", 4, "Living in the Wider World: saving, spending and keeping track", ["saving","records"]),
        Y3: topic("S2", 4, "Living in the Wider World: managing money and making decisions", ["records","influence"]),
        Y4: topic("S2", 4, "Living in the Wider World: helping others and spending decisions", ["helping","influence"]),
        Y5: topic("S2", 4, "Living in the Wider World: borrowing, digital risk and consumer choices", ["borrowing","online-risk","value"]),
        Y6: topic("S2", 4, "Living in the Wider World: earning, saving and financial responsibility", ["earning","saving","wealth"])
      }
    },
    votesforschools: {
      name: "VotesforSchools",
      topics: {
        R:  topic("S2", 4, "Weekly topical PSHE: simple choices and fairness", ["needs-wants"]),
        Y1: topic("S2", 4, "Weekly topical PSHE: choices, fairness and responsibility", ["needs-wants","safe-money"]),
        Y2: topic("S2", 4, "Weekly topical PSHE: saving, spending and fair choices", ["saving","needs-wants"]),
        Y3: topic("S2", 4, "Weekly topical PSHE: money choices, responsibility and critical thinking", ["records","influence"]),
        Y4: topic("S2", 4, "Weekly topical PSHE: helping others, fairness and spending choices", ["helping","influence"]),
        Y5: topic("S2", 4, "Weekly topical PSHE: persuasion, digital risk and consumer choices", ["influence","online-risk","value"]),
        Y6: topic("S2", 4, "Weekly topical PSHE: earning, inequality and financial choices", ["earning","wealth","helping"])
      }
    },
    "no-outsiders": {
      name: "No Outsiders",
      topics: {
        R:  topic("S2", 4, "Inclusion and kindness: fair choices and looking after things", ["needs-wants","helping"]),
        Y1: topic("S2", 4, "Inclusion and kindness: needs, wants and different choices", ["needs-wants","helping"]),
        Y2: topic("S2", 4, "Inclusion and kindness: fair sharing, saving and spending", ["saving","needs-wants"]),
        Y3: topic("S2", 4, "Inclusion and respect: money choices and helping others", ["helping","records"]),
        Y4: topic("S2", 4, "Inclusion and respect: helping others and different priorities", ["helping","influence"]),
        Y5: topic("S2", 4, "Inclusion and respect: influence, fairness and online behaviour", ["influence","online-risk"]),
        Y6: topic("S2", 4, "Inclusion and respect: wealth, fairness and social responsibility", ["wealth","helping","earning"])
      }
    },
    lifewise: {
      name: "LifeWise",
      topics: {
        R:  topic("S2", 4, "LifeWise life skills: looking after belongings and simple money choices", ["safe-money","needs-wants"]),
        Y1: topic("S2", 4, "LifeWise life skills: needs, wants and money safety", ["needs-wants","safe-money"]),
        Y2: topic("S2", 4, "LifeWise life skills: saving, spending and choices", ["saving","records"]),
        Y3: topic("S2", 4, "LifeWise life skills: managing money and responsibility", ["records","safe-money"]),
        Y4: topic("S2", 4, "LifeWise life skills: helping others and spending choices", ["helping","influence"]),
        Y5: topic("S2", 4, "LifeWise life skills: digital money safety and value choices", ["online-risk","value","influence"]),
        Y6: topic("S2", 4, "LifeWise life skills: earning, saving and future planning", ["earning","saving","wealth"])
      }
    }
  }
};

// ─── DATA CONSTRUCTORS ────────────────────────────────────────────────────────

function lesson(id, year, order, title, preferredSubject, concepts, focus, comprehensionAvailable) {
  return { id, year, order, title, preferredSubject, concepts, focus, comprehensionAvailable };
}

function topic(halfTerm, week, title, concepts) {
  return { halfTerm, week, title, concepts };
}

// ─── APP STATE ────────────────────────────────────────────────────────────────

function makeDefaultCustom() {
  return {
    maths: Object.fromEntries(CUSTOM_MATHS_TOPICS.map(([id], i) => [id, HALF_TERMS[Math.min(i, 5)].id])),
    pshe:  Object.fromEntries(CUSTOM_PSHE_TOPICS.map(([id], i)  => [id, HALF_TERMS[Math.min(i, 5)].id]))
  };
}

const state = {
  activeOption: "A",
  options: [],
  hasGenerated: false,
  custom: makeDefaultCustom()
};

// ─── DOM REFS ─────────────────────────────────────────────────────────────────

const form            = document.querySelector("#plannerForm");
const schoolTypeEl    = document.querySelector("#schoolType");
const yearGroupChecks = document.querySelector("#yearGroupChecks");
const customMaths     = document.querySelector("#customMaths");
const customPshe      = document.querySelector("#customPshe");
const summaryCards    = document.querySelector("#summaryCards");
const optionTabs      = document.querySelector("#optionTabs");
const optionOutput    = document.querySelector("#optionOutput");
const reportTitle     = document.querySelector("#reportTitle");
const printBtn        = document.querySelector("#printBtn");
const progressOverlay = document.querySelector("#progressOverlay");
const progressFill    = document.querySelector("#progressBarFill");
const emptyState      = document.querySelector("#emptyState");
const planOutput      = document.querySelector("#planOutput");
const validationMsg   = document.querySelector("#validationMsg");

// ─── INIT ─────────────────────────────────────────────────────────────────────

init();

function init() {
  populateSchemeSelect("mathsScheme", SCHEMES.maths, "white-rose", "custom-maths");
  populateSchemeSelect("psheScheme",  SCHEMES.pshe,  "scarf",       "custom-pshe");
  renderYearChecks();
  renderCustomPanel(customMaths, CUSTOM_MATHS_TOPICS, "maths");
  renderCustomPanel(customPshe,  CUSTOM_PSHE_TOPICS,  "pshe");

  form.addEventListener("submit", handleSubmit);
  schoolTypeEl.addEventListener("change", handleSchoolTypeChange);
  document.querySelector("#mathsScheme").addEventListener("change", toggleCustomPanels);
  document.querySelector("#psheScheme").addEventListener("change",  toggleCustomPanels);
  printBtn.addEventListener("click", () => window.print());

  toggleCustomPanels();

  // Blank start: plan output hidden until user generates
  emptyState.hidden = false;
  planOutput.hidden = true;
  printBtn.hidden   = true;
}

// ─── SCHOOL TYPE ──────────────────────────────────────────────────────────────

function handleSchoolTypeChange() {
  const type  = schoolTypeEl.value;
  const years = SCHOOL_TYPE_YEARS[type];
  if (!years) return; // "custom" — leave checkboxes alone

  yearGroupChecks.querySelectorAll("input[type=checkbox]").forEach(cb => {
    cb.checked = years.includes(cb.value);
  });
}

// ─── YEAR CHECKBOXES ──────────────────────────────────────────────────────────

function renderYearChecks() {
  yearGroupChecks.innerHTML = YEARS.map(year => `
    <label class="check-pill">
      <input type="checkbox" name="yearGroup" value="${year.id}" checked>
      ${year.label.replace("Year ", "Y").replace("Reception", "Rec")}
    </label>
  `).join("");

  // When a checkbox changes manually, switch school type to "custom"
  yearGroupChecks.querySelectorAll("input").forEach(cb => {
    cb.addEventListener("change", () => { schoolTypeEl.value = "custom"; });
  });
}

// ─── SCHEME SELECTS ───────────────────────────────────────────────────────────

function populateSchemeSelect(selectId, schemes, defaultValue, customValue) {
  const select       = document.querySelector(`#${selectId}`);
  const customOption = select.querySelector(`option[value="${customValue}"]`);
  select.innerHTML   = Object.entries(schemes)
    .map(([value, scheme]) => `<option value="${value}">${scheme.name}</option>`)
    .join("");
  select.appendChild(customOption);
  select.value = defaultValue;
}

function renderCustomPanel(container, topics, type) {
  container.innerHTML =
    `<div class="custom-title">When do you teach these ${type === "maths" ? "maths" : "PSHE"} topics?</div>` +
    topics.map(([id, label]) => `
      <div class="custom-row">
        <label for="${type}-${id}">${label}</label>
        <select id="${type}-${id}" data-custom="${type}" data-topic="${id}">
          ${HALF_TERMS.map(ht => `<option value="${ht.id}">${ht.label}</option>`).join("")}
        </select>
      </div>
    `).join("");

  container.querySelectorAll("select").forEach(select => {
    select.value = state.custom[select.dataset.custom][select.dataset.topic];
    select.addEventListener("change", () => {
      state.custom[select.dataset.custom][select.dataset.topic] = select.value;
    });
  });
}

function toggleCustomPanels() {
  customMaths.hidden = document.querySelector("#mathsScheme").value !== "custom-maths";
  customPshe.hidden  = document.querySelector("#psheScheme").value  !== "custom-pshe";
}

// ─── SUBMIT & PROGRESS ────────────────────────────────────────────────────────

function handleSubmit(event) {
  event.preventDefault();

  const settings = readSettings();

  if (!settings.schoolName) {
    validationMsg.textContent = "Please enter your school name before generating a plan.";
    validationMsg.hidden = false;
    document.querySelector("#schoolName").focus();
    return;
  }

  if (settings.selectedYears.length === 0) {
    validationMsg.textContent = "Please select at least one year group to generate a plan.";
    validationMsg.hidden = false;
    return;
  }
  validationMsg.hidden = true;

  // Compute options synchronously (fast)
  const lessons = expandLessonsForSettings(settings);
  const optionA = buildOption("A", "Best Curriculum Fit",
    "Prioritises the strongest conceptual fit between each MoneySmarts lesson and your chosen curriculum schemes.",
    lessons, settings);
  const optionB = buildOption("B", "Balanced Year Plan",
    "Preserves the curriculum match while spreading lessons more evenly across the year, so delivery feels lighter for class teachers.",
    lessons, settings);

  state.options      = [optionA, optionB];
  state.activeOption = "A";

  // Show progress overlay, then reveal results after ~2.5s
  showProgress();

  setTimeout(() => {
    hideProgress(() => {
      state.hasGenerated = true;
      emptyState.hidden  = true;
      planOutput.hidden  = false;
      printBtn.hidden    = false;
      render(settings);
    });
  }, 2500);
}

function showProgress() {
  // Clear the results area first so the overlay isn't competing with existing
  // content on regeneration — works reliably for both first and subsequent runs.
  emptyState.hidden  = true;
  planOutput.hidden  = true;
  progressOverlay.hidden = false;
  progressFill.style.transition = "none";
  progressFill.style.width = "0%";
  // Double rAF ensures the transition reset has painted before we start animating
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      progressFill.style.transition = "width 2.1s cubic-bezier(0.3, 0, 0.2, 1)";
      progressFill.style.width = "88%";
    });
  });
}

function hideProgress(callback) {
  progressFill.style.transition = "width 0.15s ease-out";
  progressFill.style.width = "100%";
  setTimeout(() => {
    progressOverlay.hidden = true;
    if (callback) callback();
  }, 200);
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────

function readSettings() {
  const data = new FormData(form);
  return {
    schoolName:         (data.get("schoolName") || "").trim(),
    mathsScheme:        data.get("mathsScheme"),
    psheScheme:         data.get("psheScheme"),
    selectedYears:      data.getAll("yearGroup"),
    attainment:         data.get("attainment"),
    allowOtherSubjects: Boolean(data.get("allowOtherSubjects"))
  };
}

// ─── LESSON EXPANSION — ±1 YEAR RULE ─────────────────────────────────────────
//
// A lesson from year Y can be displaced to an adjacent selected year (±1 step
// in the year-group sequence). If no selected year is within one step, the
// lesson is dropped entirely. This prevents, e.g., Reception-level content
// appearing in a Junior school that starts at Y3.

function expandLessonsForSettings(settings) {
  const selected = new Set(settings.selectedYears);
  const output   = [];

  for (const item of LESSONS) {
    if (selected.has(item.year)) {
      output.push({ ...item });
      continue;
    }

    const nativeIdx = YEAR_ORDER.indexOf(item.year);
    let bestYear = null;
    let bestDist = Infinity;

    for (const y of settings.selectedYears) {
      const dist = YEAR_ORDER.indexOf(y) - nativeIdx;
      if (Math.abs(dist) <= 1 && Math.abs(dist) < Math.abs(bestDist)) {
        bestYear = y;
        bestDist = dist;
      }
    }

    if (bestYear !== null) {
      const direction = bestDist > 0 ? "forward into" : "back into";
      output.push({
        ...item,
        year: bestYear,
        shiftNote: `Originally a ${yearLabel(item.year)} lesson, moved ${direction} ${yearLabel(bestYear)} — the nearest selected year group.`
      });
    }
    // No selected year within ±1: lesson is dropped.
  }

  return output;
}

// ─── OPTION BUILDER ───────────────────────────────────────────────────────────

function buildOption(id, title, description, lessons, settings) {
  const events              = [];
  const occupied            = new Set();
  const previousLessonSlots = new Map();

  lessons.forEach((item, index) => {
    const previousSlot       = previousLessonSlots.get(item.year);
    const rawPlacement       = placeLesson(item, settings, id, index);
    const placement          = reserveSlot(
      enforceLessonSequence(rawPlacement, item, previousSlot),
      occupied, "lesson"
    );
    const comprehension      = reserveSlot(placeComprehension(item, placement), occupied, "comprehension");

    previousLessonSlots.set(item.year, placement);
    events.push(
      { type: "lesson",        lesson: item, ...placement },
      { type: "comprehension", lesson: item, ...comprehension }
    );
  });

  return { id, title, description, events };
}

function reserveSlot(placement, occupied, type) {
  let slot    = { ...placement };
  let guard   = 0;
  const channel = type === "comprehension" ? "Reading" : slot.subject;

  while (occupied.has(slotKey(slot, channel)) && guard < 12) {
    slot  = { ...slot, ...addTeachingWeeks(slot.halfTerm, slot.week, 1) };
    guard += 1;
  }
  occupied.add(slotKey(slot, channel));
  return slot;
}

function slotKey(slot, channel) {
  return `${slot.year}|${channel}|${slot.halfTerm}|${slot.week}`;
}

// ─── LESSON PLACEMENT ─────────────────────────────────────────────────────────

function placeLesson(item, settings, optionId, index) {
  const subject      = chooseSubject(item, settings);
  const sourceTopic  = findBestTopic(item, subject, settings);
  const strongLink   = hasConceptOverlap(item, sourceTopic);
  let halfTerm       = sourceTopic.halfTerm;
  let week           = sourceTopic.week;
  const timingNotes  = [];

  if (optionId === "B") {
    const spread     = spreadSlot(item, index);
    const topicIdx   = halfTermIndex(halfTerm);
    if (Math.abs(topicIdx - halfTermIndex(spread.halfTerm)) <= 2 || halfTerm === "A1") {
      halfTerm = spread.halfTerm;
      week     = Math.max(3, spread.week);
      timingNotes.push("Lesson is spread later in the year so the programme does not front-load into the autumn term.");
    } else {
      week = Math.max(2, Math.min(6, week - 1));
    }
  } else if (halfTerm === "A1" && !strongLink) {
    halfTerm = "S1";
    week     = Math.max(3, week - 1);
    timingNotes.push("Moved out of Autumn 1 as the curriculum link is broad rather than exact.");
  }

  if (settings.attainment === "below" && subject === "Maths") week += 1;
  if (settings.attainment === "above" && subject === "Maths") week -= 1;

  const slot      = normaliseSlot(halfTerm, week);
  const rationale = buildRationale(item, subject, sourceTopic, settings, timingNotes);

  return {
    year: item.year,
    subject,
    halfTerm: slot.halfTerm,
    week:     slot.week,
    topic:    sourceTopic.title,
    rationale
  };
}

function enforceLessonSequence(placement, item, previousSlot) {
  if (!previousSlot || slotIndex(placement) > slotIndex(previousSlot)) return placement;

  const nextSlot  = addTeachingWeeks(previousSlot.halfTerm, previousSlot.week, 1);
  const lockNote  = SEQUENCE_LOCKED_YEARS.has(item.year)
    ? " This year group begins a MoneySmarts phase, so lesson sequence is a hard constraint."
    : " Sequence preserved so pupils meet the ideas in the intended order.";

  return {
    ...placement,
    halfTerm: nextSlot.halfTerm,
    week:     nextSlot.week,
    rationale: `${placement.rationale}${lockNote}`
  };
}

function chooseSubject(item, settings) {
  if (settings.allowOtherSubjects && item.preferredSubject === "Computing") return "Computing";
  if (settings.allowOtherSubjects && item.preferredSubject === "English")   return "English";
  if (item.preferredSubject === "Computing") return item.concepts.includes("online-risk") ? "PSHE" : "Maths";
  if (item.preferredSubject === "English")   return "PSHE";
  return item.preferredSubject;
}

function findBestTopic(item, subject, settings) {
  if (subject === "Maths")     return findSchemeTopic(item, settings.mathsScheme, "maths");
  if (subject === "PSHE")      return findSchemeTopic(item, settings.psheScheme,  "pshe");
  if (subject === "English")   return topic("S2", 5, "English persuasive writing: recognising persuasive techniques in money contexts", ["influence"]);
  return topic("S2", 5, "Computing / online safety: digital choices, apps, games and data", ["online-risk"]);
}

function findSchemeTopic(item, schemeId, type) {
  if (schemeId.startsWith("custom")) {
    const customType = type === "maths" ? "maths" : "pshe";
    const concept    = item.concepts.find(c => state.custom[customType][c]) || item.concepts[0];
    const halfTerm   = state.custom[customType][concept] || "S2";
    return topic(halfTerm, type === "maths" ? 5 : 4, `Custom timing: ${conceptLabel(concept)}`, [concept]);
  }
  const scheme    = SCHEMES[type][schemeId];
  return scheme?.topics[item.year] || topic("S2", type === "maths" ? 5 : 4, "General curriculum fit", item.concepts);
}

function spreadSlot(item, index) {
  const groupOrder = Math.max(0, item.order - 1);
  return BALANCED_SPREAD[groupOrder % BALANCED_SPREAD.length];
}

// ─── COMPREHENSION PLACEMENT ─────────────────────────────────────────────────

function getRecapLabel(year) {
  return SHARED_READING_YEARS.has(year) ? "Shared Reading Recap" : "Comprehension recap";
}

function getRecapType(year) {
  return SHARED_READING_YEARS.has(year) ? "shared-reading" : "comprehension";
}

function placeComprehension(item, placement) {
  const slot      = addTeachingWeeks(placement.halfTerm, placement.week, 2);
  const recapYear = placement.year;
  const recapType = getRecapType(recapYear);

  let rationale;
  if (SHARED_READING_YEARS.has(recapYear)) {
    rationale = `Read aloud the matching MoneySmarts shared text together as a class, around two teaching weeks after "${item.title}", to reactivate key vocabulary before it fades.`;
  } else if (item.comprehensionAvailable) {
    rationale = `Use the matching MoneySmarts reading comprehension around two teaching weeks after "${item.title}" to reactivate key vocabulary and ideas before forgetting sets in.`;
  } else {
    rationale = `Reserve this slot for the matching comprehension text once produced — keeping the two-week recap rhythm consistent across the programme.`;
  }

  return {
    year:      recapYear,
    subject:   "Reading",
    halfTerm:  slot.halfTerm,
    week:      slot.week,
    topic:     getRecapLabel(recapYear),
    recapType,
    rationale
  };
}

// ─── RATIONALE BUILDER ────────────────────────────────────────────────────────

function buildRationale(item, subject, sourceTopic, settings, timingNotes = []) {
  const timingPhrase = subject === "Maths"
    ? "towards the end of the topic block, once pupils have enough fluency to apply the concept in a money context"
    : subject === "English"
      ? "where pupils can apply persuasive-writing skills to a real financial context"
      : "within the closest values, safety or choices strand, where the discussion has most curriculum resonance";

  let schemeNote = "";
  if (subject === "Maths" || subject === "PSHE") {
    const schemeName = schemeDisplay(
      subject === "Maths" ? settings.mathsScheme : settings.psheScheme,
      subject === "Maths" ? "maths" : "pshe"
    );
    schemeNote = ` In ${schemeName}, this aligns with "${sourceTopic.title}", so it is placed ${timingPhrase}.`;
  } else {
    schemeNote = ` It is placed ${timingPhrase}.`;
  }

  const shift  = item.shiftNote  ? ` ${item.shiftNote}`            : "";
  const timing = timingNotes.length ? ` ${timingNotes.join(" ")}` : "";

  return `${item.focus}${schemeNote}${shift}${timing}`;
}

function schemeDisplay(id, type) {
  if (id === "custom-maths") return "your custom maths timings";
  if (id === "custom-pshe")  return "your custom PSHE timings";
  return SCHEMES[type][id]?.name || "the selected scheme";
}

// ─── SLOT UTILITIES ───────────────────────────────────────────────────────────

function normaliseSlot(halfTerm, week) {
  let index    = halfTermIndex(halfTerm);
  let nextWeek = week;
  while (nextWeek > 6) { nextWeek -= 6; index += 1; }
  while (nextWeek < 1) { nextWeek += 6; index -= 1; }
  if (index < 0)                 return { halfTerm: HALF_TERMS[0].id, week: 1 };
  if (index >= HALF_TERMS.length) return { halfTerm: HALF_TERMS[HALF_TERMS.length - 1].id, week: 6 };
  return { halfTerm: HALF_TERMS[index].id, week: nextWeek };
}

function addTeachingWeeks(halfTerm, week, amount) {
  return normaliseSlot(halfTerm, week + amount);
}

function slotIndex(slot) {
  return halfTermIndex(slot.halfTerm) * 6 + slot.week;
}

function halfTermIndex(id) {
  return HALF_TERMS.findIndex(ht => ht.id === id);
}

function hasConceptOverlap(item, sourceTopic) {
  return item.concepts.some(c => sourceTopic.concepts.includes(c));
}

function conceptLabel(concept) {
  return concept.replace(/-/g, " ");
}

// ─── RENDER ───────────────────────────────────────────────────────────────────

function render(settings) {
  reportTitle.textContent = settings.schoolName
    ? `${settings.schoolName}: MoneySmarts placement plan`
    : "Tykeoons MoneySmarts placement plan";
  renderSummary(settings);
  renderTabs();
  renderOption(state.options.find(o => o.id === state.activeOption) || state.options[0]);
}

function renderSummary(settings) {
  const active      = state.options.find(o => o.id === state.activeOption) || state.options[0];
  const lessonCount = active.events.filter(e => e.type === "lesson").length;
  const compCount   = active.events.filter(e => e.type === "comprehension").length;

  summaryCards.innerHTML = [
    [String(lessonCount), "MoneySmarts lessons placed"],
    [String(compCount),   "comprehension recap slots"],
    [schemeDisplay(settings.mathsScheme, "maths"), "maths source"],
    [schemeDisplay(settings.psheScheme,  "pshe"),  "PSHE source"]
  ].map(([value, label]) =>
    `<div class="summary-card"><strong>${value}</strong><span>${label}</span></div>`
  ).join("");
}

function renderTabs() {
  optionTabs.innerHTML = state.options.map(option => `
    <button type="button"
      class="tab ${option.id === state.activeOption ? "active" : ""}"
      data-option="${option.id}">
      Option ${option.id}: ${option.title}
      ${option.id === "A" ? '<span class="recommended-badge">Recommended</span>' : ""}
    </button>
  `).join("");

  optionTabs.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      state.activeOption = btn.dataset.option;
      render(readSettings());
    });
  });
}

function renderOption(option) {
  const years = [...new Set(option.events.map(e => e.year))]
    .sort((a, b) => YEAR_ORDER.indexOf(a) - YEAR_ORDER.indexOf(b));

  optionOutput.innerHTML = `
    <section class="option-intro">
      <div>
        <h3>Option ${option.id}: ${option.title}</h3>
        <p>${option.description}</p>
      </div>
      <div class="legend">
        <span class="chip maths">Maths</span>
        <span class="chip pshe">PSHE</span>
        <span class="chip computing">Computing</span>
        <span class="chip english">English</span>
        <span class="chip reading">Reading comprehension</span>
      </div>
    </section>
    ${years.map(year => renderYear(option, year)).join("")}
  `;
}

function renderYear(option, year) {
  const events = option.events
    .filter(e => e.year === year)
    .sort((a, b) =>
      halfTermIndex(a.halfTerm) - halfTermIndex(b.halfTerm) ||
      a.week - b.week ||
      typeSort(a.type) - typeSort(b.type)
    );

  const lessonCount = events.filter(e => e.type === "lesson").length;
  const compCount   = events.filter(e => e.type === "comprehension").length;
  const rationaleId = `rationale-${option.id}-${year}`;

  return `
    <section class="year-block">
      <div class="year-heading">
        <h3>${yearLabel(year)}</h3>
        <div class="year-heading-right">
          <span>${lessonCount} lesson${lessonCount !== 1 ? "s" : ""} &middot; ${compCount} recap${compCount !== 1 ? "s" : ""}</span>
          <button type="button" class="rationale-toggle"
            aria-controls="${rationaleId}"
            aria-expanded="false"
            onclick="toggleRationale('${rationaleId}', this)">
            Show rationale
          </button>
        </div>
      </div>

      <div class="grid">
        ${HALF_TERMS.map(ht =>
          renderHalfTerm(ht, events.filter(e => e.halfTerm === ht.id))
        ).join("")}
      </div>

      <div class="rationale collapsed" id="${rationaleId}">
        <h4>${yearLabel(year)} placement rationale</h4>
        <div class="rationale-list">
          ${events
            .filter(e => e.type === "lesson")
            .map(e => `
              <div class="rationale-item">
                <b>${e.lesson.title}</b>
                <p>${e.rationale}</p>
              </div>
            `).join("")}
        </div>
      </div>
    </section>
  `;
}

function toggleRationale(id, btn) {
  const el          = document.getElementById(id);
  const isCollapsed = el.classList.contains("collapsed");
  el.classList.toggle("collapsed");
  btn.setAttribute("aria-expanded", String(isCollapsed));
  btn.textContent = isCollapsed ? "Hide rationale" : "Show rationale";
}

function renderHalfTerm(halfTerm, events) {
  return `
    <div class="half-term">
      <h4>${halfTerm.label}</h4>
      ${events.map(renderEvent).join("")}
    </div>
  `;
}

function renderEvent(event) {
  const icon       = iconForEvent(event);
  const subjectCls = subjectClass(event);
  const isShared   = event.type === "comprehension" && event.recapType === "shared-reading";
  const typeLabel  = isShared
    ? "Shared Reading Recap"
    : event.type === "comprehension"
      ? "Comprehension recap"
      : "MoneySmarts lesson";

  return `
    <article class="event ${subjectCls}-bg ${event.type === "comprehension" ? "recap-card" : ""} ${isShared ? "shared-reading-card" : ""}">
      <div class="event-badge">
        <img class="event-icon" src="assets/${icon.file}" alt="${icon.label}">
      </div>
      <strong>Wk ${event.week}: ${event.lesson.title}</strong>
      <small class="event-type-label">${typeLabel}</small>
      <small>${event.topic}</small>
    </article>
  `;
}

function iconForEvent(event) {
  if (event.type === "comprehension") {
    return event.recapType === "shared-reading"
      ? WIDGETS["shared-reading"]
      : WIDGETS["reading-comprehension"];
  }
  const widgets = LESSON_WIDGETS[event.lesson.id] || [];
  const match   = widgets.find(key => WIDGETS[key]?.subject === event.subject);
  if (match)    return WIDGETS[match];
  const fallback = widgets[0];
  return WIDGETS[fallback] || WIDGETS["pshe-wider"];
}

function subjectClass(event) {
  if (event.type === "comprehension") return "reading";
  return event.subject.toLowerCase();
}

function yearLabel(year) {
  return YEARS.find(y => y.id === year)?.label || year;
}

function typeSort(type) {
  return type === "lesson" ? 0 : 1;
}
