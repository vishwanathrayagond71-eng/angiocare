import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Sprout, Activity, BookOpen, History, BarChart2, Settings, Bell, LogOut,
  User, Flame, Upload, Camera, X, Check, Copy, AlertTriangle, Info, Calendar,
  Plus, RefreshCw, ChevronDown, MessageSquare, Search, Sun, Moon, Map,
  UserCheck, Share2, ArrowLeft, ArrowRight, Send, Loader2, Award, HelpCircle
} from 'lucide-react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar
} from 'recharts';

// --- PLANT LIST ---
const PLANTS_LIST = [
  "Rose", "Mango", "Tomato", "Wheat", "Rice", "Potato", "Cotton", "Corn/Maize", "Sugarcane",
  "Banana", "Apple", "Grape", "Orange", "Lemon", "Coconut", "Tea", "Coffee", "Rubber Tree",
  "Tulsi", "Neem", "Oak", "Pine", "Eucalyptus", "Bamboo", "Hibiscus", "Sunflower", "Soybean",
  "Groundnut", "Onion", "Garlic", "Chili", "Brinjal", "Cabbage", "Cauliflower", "Spinach",
  "Papaya", "Guava", "Pomegranate", "Watermelon", "Cucumber", "Bitter Gourd", "Pumpkin",
  "Jackfruit", "Mulberry", "Jasmine", "Chrysanthemum", "Cactus", "Aloe Vera", "Fern",
  "Bougainvillea", "Teak", "Sandalwood", "Mahogany", "Peach", "Pear", "Plum", "Cherry",
  "Strawberry", "Blueberry", "Pineapple", "Chestnut", "Elm", "Maple", "Sycamore", "Ash",
  "Hemlock", "Beech"
];

// --- DISEASES LIST (BASE DATABASE) ---
const ENCYCLOPEDIA_DATABASE = [
  // Fungal (28)
  { id: "FNG-001", name: "Powdery Mildew", scientific_name: "Podosphaera pannosa", category: "Fungal", severity: "Mild" },
  { id: "FNG-002", name: "Black Spot", scientific_name: "Diplocarpon rosae", category: "Fungal", severity: "Moderate" },
  { id: "FNG-003", name: "Early Blight", scientific_name: "Alternaria solani", category: "Fungal", severity: "Moderate" },
  { id: "FNG-004", name: "Late Blight", scientific_name: "Phytophthora infestans", category: "Fungal", severity: "Critical" },
  { id: "FNG-005", name: "Rust", scientific_name: "Puccinia graminis", category: "Fungal", severity: "Severe" },
  { id: "FNG-006", name: "Anthracnose", scientific_name: "Colletotrichum gloeosporioides", category: "Fungal", severity: "Severe" },
  { id: "FNG-007", name: "Root Rot", scientific_name: "Pythium ultimum", category: "Fungal", severity: "Critical" },
  { id: "FNG-008", name: "Downy Mildew", scientific_name: "Plasmopara viticola", category: "Fungal", severity: "Severe" },
  { id: "FNG-009", name: "Fusarium Wilt", scientific_name: "Fusarium oxysporum", category: "Fungal", severity: "Critical" },
  { id: "FNG-010", name: "Cercospora Leaf Spot", scientific_name: "Cercospora spp.", category: "Fungal", severity: "Moderate" },
  { id: "FNG-011", name: "Peach Leaf Curl", scientific_name: "Taphrina deformans", category: "Fungal", severity: "Severe" },
  { id: "FNG-012", name: "Apple Scab", scientific_name: "Venturia inaequalis", category: "Fungal", severity: "Moderate" },
  { id: "FNG-013", name: "Gray Mold", scientific_name: "Botrytis cinerea", category: "Fungal", severity: "Severe" },
  { id: "FNG-014", name: "Sooty Mold", scientific_name: "Capnodium spp.", category: "Fungal", severity: "Mild" },
  { id: "FNG-015", name: "Oak Wilt", scientific_name: "Bretziella fagacearum", category: "Fungal", severity: "Critical" },
  { id: "FNG-016", name: "Chestnut Blight", scientific_name: "Cryphonectria parasitica", category: "Fungal", severity: "Critical" },
  { id: "FNG-017", name: "Dutch Elm Disease", scientific_name: "Ophiostoma novo-ulmi", category: "Fungal", severity: "Critical" },
  { id: "FNG-018", name: "Coffee Berry Disease", scientific_name: "Colletotrichum kahawae", category: "Fungal", severity: "Severe" },
  { id: "FNG-019", name: "Citrus Melanose", scientific_name: "Diaporthe citri", category: "Fungal", severity: "Moderate" },
  { id: "FNG-020", name: "Mango Malformation", scientific_name: "Fusarium mangiferae", category: "Fungal", severity: "Severe" },
  { id: "FNG-021", name: "Pine Needle Cast", scientific_name: "Lophodermium seditiosum", category: "Fungal", severity: "Moderate" },
  { id: "FNG-022", name: "Sudden Oak Death", scientific_name: "Phytophthora ramorum", category: "Fungal", severity: "Critical" },
  { id: "FNG-023", name: "Tar Spot of Maple", scientific_name: "Rhytisma acerinum", category: "Fungal", severity: "Mild" },
  { id: "FNG-024", name: "Cedar-Apple Rust", scientific_name: "Gymnosporangium juniperi-virginianae", category: "Fungal", severity: "Severe" },
  { id: "FNG-025", name: "White Pine Blister Rust", scientific_name: "Cronartium ribicola", category: "Fungal", severity: "Severe" },
  { id: "FNG-026", name: "Anthracnose of Sycamore", scientific_name: "Apiognomonia veneta", category: "Fungal", severity: "Moderate" },
  { id: "FNG-027", name: "Black Knot of Plum", scientific_name: "Apiosporina morbosa", category: "Fungal", severity: "Severe" },
  { id: "FNG-028", name: "Phomopsis Blight", scientific_name: "Phomopsis juniperovora", category: "Fungal", severity: "Moderate" },
  
  // Bacterial (12)
  { id: "BCT-001", name: "Bacterial Blight", scientific_name: "Pseudomonas syringae", category: "Bacterial", severity: "Severe" },
  { id: "BCT-002", name: "Crown Gall", scientific_name: "Agrobacterium tumefaciens", category: "Bacterial", severity: "Moderate" },
  { id: "BCT-003", name: "Fire Blight", scientific_name: "Erwinia amylovora", category: "Bacterial", severity: "Critical" },
  { id: "BCT-004", name: "Bacterial Canker", scientific_name: "Clavibacter michiganensis", category: "Bacterial", severity: "Critical" },
  { id: "BCT-005", name: "Bacterial Wilt", scientific_name: "Ralstonia solanacearum", category: "Bacterial", severity: "Critical" },
  { id: "BCT-006", name: "Citrus Canker", scientific_name: "Xanthomonas axonopodis", category: "Bacterial", severity: "Severe" },
  { id: "BCT-007", name: "Olive Knot", scientific_name: "Pseudomonas savastanoi", category: "Bacterial", severity: "Moderate" },
  { id: "BCT-008", name: "Pierce's Disease", scientific_name: "Xylella fastidiosa", category: "Bacterial", severity: "Critical" },
  { id: "BCT-009", name: "Pear Decline", scientific_name: "Candidatus Phytoplasma pyri", category: "Bacterial", severity: "Severe" },
  { id: "BCT-010", name: "Coconut Lethal Yellowing", scientific_name: "Candidatus Phytoplasma palmae", category: "Bacterial", severity: "Critical" },
  { id: "BCT-011", name: "Bacterial Wetwood / Slime Flux", scientific_name: "Enterobacter cloacae", category: "Bacterial", severity: "Mild" },
  { id: "BCT-012", name: "Ash Yellows", scientific_name: "Candidatus Phytoplasma fraxini", category: "Bacterial", severity: "Severe" },

  // Viral (11)
  { id: "VRL-001", name: "Mosaic Virus", scientific_name: "Tobacco mosaic virus", category: "Viral", severity: "Severe" },
  { id: "VRL-002", name: "Yellow Leaf Curl", scientific_name: "Tomato yellow leaf curl virus", category: "Viral", severity: "Critical" },
  { id: "VRL-003", name: "Ringspot Virus", scientific_name: "Papaya ringspot virus", category: "Viral", severity: "Severe" },
  { id: "VRL-004", name: "Bunchy Top", scientific_name: "Banana bunchy top virus", category: "Viral", severity: "Critical" },
  { id: "VRL-005", name: "Citrus Tristeza", scientific_name: "Citrus tristeza virus", category: "Viral", severity: "Critical" },
  { id: "VRL-006", name: "Plum Pox", scientific_name: "Plum pox virus", category: "Viral", severity: "Critical" },
  { id: "VRL-007", name: "Rose Rosette Disease", scientific_name: "Rose rosette virus", category: "Viral", severity: "Critical" },
  { id: "VRL-008", name: "Cacao Swollen Shoot", scientific_name: "Cacao swollen shoot virus", category: "Viral", severity: "Critical" },
  { id: "VRL-009", name: "Plum Line Pattern", scientific_name: "Plum line pattern virus", category: "Viral", severity: "Moderate" },
  { id: "VRL-010", name: "Citrus Psorosis", scientific_name: "Citrus psorosis ophiovirus", category: "Viral", severity: "Severe" },
  { id: "VRL-011", name: "Cherry Leaf Roll", scientific_name: "Cherry leaf roll virus", category: "Viral", severity: "Severe" },

  // Nematodal (4)
  { id: "NMT-001", name: "Root-knot Nematode", scientific_name: "Meloidogyne incognita", category: "Nematodal", severity: "Severe" },
  { id: "NMT-002", name: "Cyst Nematode", scientific_name: "Heterodera schachtii", category: "Nematodal", severity: "Severe" },
  { id: "NMT-003", name: "Pine Wilt Disease", scientific_name: "Bursaphelenchus xylophilus", category: "Nematodal", severity: "Critical" },
  { id: "NMT-004", name: "Red Ring Disease of Coconut", scientific_name: "Bursaphelenchus cocophilus", category: "Nematodal", severity: "Critical" },

  // Nutritional / Abiotic (6)
  { id: "NTR-001", name: "Nitrogen Deficiency", scientific_name: "Abiotic (N-deficiency)", category: "Nutritional Deficiency", severity: "Mild" },
  { id: "NTR-002", name: "Iron Chlorosis", scientific_name: "Abiotic (Fe-deficiency)", category: "Nutritional Deficiency", severity: "Moderate" },
  { id: "NTR-003", name: "Phosphorus Deficiency", scientific_name: "Abiotic (P-deficiency)", category: "Nutritional Deficiency", severity: "Moderate" },
  { id: "NTR-004", name: "Magnesium Deficiency", scientific_name: "Abiotic (Mg-deficiency)", category: "Nutritional Deficiency", severity: "Mild" },
  { id: "NTR-005", name: "Potassium Deficiency", scientific_name: "Abiotic (K-deficiency)", category: "Nutritional Deficiency", severity: "Moderate" },
  { id: "NTR-006", name: "Calcium Deficiency / Blossom End Rot", scientific_name: "Abiotic (Ca-deficiency)", category: "Nutritional Deficiency", severity: "Moderate" },

  // Pests (16)
  { id: "PST-001", name: "Aphid Infestation", scientific_name: "Aphis gossypii", category: "Pest", severity: "Moderate" },
  { id: "PST-002", name: "Whitefly Infestation", scientific_name: "Bemisia tabaci", category: "Pest", severity: "Moderate" },
  { id: "PST-003", name: "Mealybug Infestation", scientific_name: "Pseudococcus longispinus", category: "Pest", severity: "Severe" },
  { id: "PST-004", name: "Spider Mite Infestation", scientific_name: "Tetranychus urticae", category: "Pest", severity: "Severe" },
  { id: "PST-005", name: "Thrips Infestation", scientific_name: "Frankliniella occidentalis", category: "Pest", severity: "Moderate" },
  { id: "PST-006", name: "Scale Insect Infestation", scientific_name: "Coccoidea spp.", category: "Pest", severity: "Moderate" },
  { id: "PST-007", name: "Leaf Miner damage", scientific_name: "Liriomyza spp.", category: "Pest", severity: "Mild" },
  { id: "PST-008", name: "Japanese Beetle damage", scientific_name: "Popillia japonica", category: "Pest", severity: "Severe" },
  { id: "PST-009", name: "Emerald Ash Borer damage", scientific_name: "Agrilus planipennis", category: "Pest", severity: "Critical" },
  { id: "PST-010", name: "Gypsy Moth defoliation", scientific_name: "Lymantria dispar", category: "Pest", severity: "Severe" },
  { id: "PST-011", name: "Citrus Psyllid infestation", scientific_name: "Diaphorina citri", category: "Pest", severity: "Severe" },
  { id: "PST-012", name: "Bark Beetle infestation", scientific_name: "Dendroctonus spp.", category: "Pest", severity: "Critical" },
  { id: "PST-013", name: "Red Palm Weevil damage", scientific_name: "Rhynchophorus ferrugineus", category: "Pest", severity: "Critical" },
  { id: "PST-014", name: "Spruce Budworm defoliation", scientific_name: "Choristoneura fumiferana", category: "Pest", severity: "Severe" },
  { id: "PST-015", name: "Hemlock Woolly Adelgid infestation", scientific_name: "Adelges tsugae", category: "Pest", severity: "Critical" },
  { id: "PST-016", name: "Oak Lace Bug damage", scientific_name: "Corythucha arcuata", category: "Pest", severity: "Moderate" }
];

// --- DYNAMIC PATHOLOGY DATA GENERATOR ---
function getExtendedDiseaseReport(base, plantName) {
  const name = base.name;
  const code = base.id;
  const category = base.category;
  const scientific = base.scientific_name;
  const severity = base.severity;

  let symptoms = [];
  let cause = "";
  let description = "";
  let immediate_actions = [];
  let chemical_treatments = [];
  let organic_alternatives = [];
  let preventive_measures = [];
  let if_untreated = "";
  let recovery_timeline = "14 to 21 days";
  let expert_tip = "";
  let similar_diseases = [];
  let affected_parts = ["Leaves"];

  // Category based filler
  if (category === "Fungal") {
    symptoms = ["Powdery white patches", "Yellowing of leaf margins", "Necrotic brown lesions on upper surfaces", "Premature defoliation"];
    cause = "Fungal spores spreading through wind, high humidity, and direct foliage contact.";
    description = `An aggressive fungal disease affecting ${plantName || "the host plant"}. Typically thrives in moist conditions with inadequate airflow, leaving active mycelia feeding on leaf tissues.`;
    immediate_actions = ["Prune affected leaves immediately and destroy them.", "Avoid overhead irrigation to reduce foliage humidity.", "Isolate the infected rows or plants."];
    chemical_treatments = [
      {
        chemical_name: "Copper Hydroxide Spray",
        active_ingredient: "Copper Hydroxide (53.8%)",
        dosage: "2g per Liter of water",
        application_method: "Foliar mist spray using a pressure nozzle",
        frequency: "Once every 10 days until symptoms clear",
        safety_precautions: "Wear protective goggles, respiratory mask, and gloves during application.",
        approximate_cost: "$18.50 per 500g bottle"
      },
      {
        chemical_name: "Mancozeb Fungicide",
        active_ingredient: "Mancozeb (75% WP)",
        dosage: "2.5g per Liter",
        application_method: "Uniform canopy spray",
        frequency: "Every 14 days",
        safety_precautions: "Do not harvest within 7 days of treatment. Keep away from water bodies.",
        approximate_cost: "$12.00 per 1kg"
      }
    ];
    organic_alternatives = [
      {
        remedy: "Cold-Pressed Neem Oil Emulsion",
        preparation: "Mix 5ml Neem Oil, 2ml organic liquid soap in 1L warm water",
        application: "Spray thoroughly onto leaves at dusk to avoid sun scorch"
      },
      {
        remedy: "Potassium Bicarbonate spray",
        preparation: "Dissolve 3g of potassium bicarbonate in 1L water",
        application: "Spray on spots to neutralize pH and break fungal cell walls"
      }
    ];
    preventive_measures = [
      "Prune plants annually to promote internal canopy ventilation.",
      "Apply thick organic mulch to stop fungal spores splashing up from soil.",
      "Ensure proper planting distances to keep airflow active."
    ];
    if_untreated = "Will trigger total leaf loss, stunt growth, restrict photosynthesis, and lead to poor crop yields or death.";
    expert_tip = "Always clean your pruning shears with 70% isopropyl alcohol between plants to stop fungal spore spread.";
    similar_diseases = ["Anthracnose", "Downy Mildew", "Early Blight"];
    affected_parts = ["Leaves", "Stems", "Fruit buds"];
    recovery_timeline = "14 to 28 days with active fungicides";
  } 
  else if (category === "Bacterial") {
    symptoms = ["Water-soaked dark lesions", "Bacterial ooze oozing from stems in warm weather", "Angular leaf spots bordered by leaf veins", "Sudden wilting"];
    cause = "Bacterial cells invading plant vascular structures via stomata or open pruning wounds.";
    description = `A systemic bacterial infection causing vascular clogging. It prevents sap flow and damages leaf structures. Extremely contagious.`;
    immediate_actions = ["Uproot highly infected crops immediately.", "Sterilize tools with disinfectant after every cut.", "Stop overhead watering instantly."];
    chemical_treatments = [
      {
        chemical_name: "Streptomycin Sulfate",
        active_ingredient: "Streptomycin (9%), Oxytetracycline (1%)",
        dosage: "1g per 2 Liters of water",
        application_method: "Targeted foliar wash",
        frequency: "Every 7 days, maximum 3 applications",
        safety_precautions: "Classified antibiotic. Wear gloves. Do not apply near harvest period.",
        approximate_cost: "$35.00 per pack"
      }
    ];
    organic_alternatives = [
      {
        remedy: "Copper soap liquid spray",
        preparation: "Dilute 10ml liquid copper soap in 1L water",
        application: "Mist leaves at sunrise to protect surfaces from entry"
      }
    ];
    preventive_measures = [
      "Plant disease-certified pathogen-free seeds.",
      "Avoid handling crops or harvesting when leaves are wet.",
      "Drip irrigate to keep foliage dry."
    ];
    if_untreated = "Vascular system collapse, complete wilting, plant rot, and rapid soil contamination affecting future crops.";
    expert_tip = "Avoid pruning in wet weather; water droplets help bacteria travel into fresh pruning cuts.";
    similar_diseases = ["Bacterial Wilt", "Fire Blight", "Bacterial Canker"];
    affected_parts = ["Stems", "Vascular bundles", "Fruit", "Leaves"];
    recovery_timeline = "21 to 35 days (often requires removal)";
  } 
  else if (category === "Viral") {
    symptoms = ["Mosaic mottling of light and dark green on leaves", "Stunted crinkled leaf growth", "Shoe-string leaf deformity", "Ring spots on fruits"];
    cause = "Viral replication inside plant cells, primarily vector-transmitted by sucking pests like aphids.";
    description = `A viral cellular takeover that interrupts chloroplast formation, leading to leaf mosaic patterns and major yield reductions. No direct chemical cure exists.`;
    immediate_actions = ["Immediately remove and burn infected plants.", "Control the pest vector population (aphids/whiteflies) in the vicinity.", "Wash hands with soap before touching healthy plants."];
    chemical_treatments = [
      {
        chemical_name: "Imidacloprid (Vector Control)",
        active_ingredient: "Imidacloprid 17.8% SL",
        dosage: "0.5ml per Liter of water",
        application_method: "Foliar spray to suppress vectors",
        frequency: "Once every 15 days",
        safety_precautions: "Highly toxic to bees. Spray in early morning or late evening.",
        approximate_cost: "$15.00 per bottle"
      }
    ];
    organic_alternatives = [
      {
        remedy: "Yellow Sticky Insect Traps",
        preparation: "Hang traps near canopy levels",
        application: "Attracts and catches insect vector pests naturally"
      },
      {
        remedy: "Insecticidal Soap Spray",
        preparation: "Dilute 20ml soap in 1L water",
        application: "Apply on insect nesting spots under leaves"
      }
    ];
    preventive_measures = [
      "Use insect netting shields over young plants.",
      "Eliminate weed hosts nearby that act as virus reservoirs.",
      "Grow virus-resistant cultivars."
    ];
    if_untreated = "Total crop stunting, leaf deformation, failure to yield fruit, and farm-wide pest vector transmission.";
    expert_tip = "Since viruses cannot be cured chemically, focus 100% on preventing and eliminating insect carriers.";
    similar_diseases = ["Yellow Leaf Curl", "Mosaic Virus", "Ringspot Virus"];
    affected_parts = ["Whole Plant", "New Shoots", "Leaves", "Fruit"];
    recovery_timeline = "Incurable (Focus on containment)";
  } 
  else if (category === "Nematodal") {
    symptoms = ["Swollen root knots (galls)", "Wilting during midday heat despite wet soil", "Stunted yellowing growth", "Sparse root system"];
    cause = "Microscopic roundworms feeding inside root tissue, blocking water absorption.";
    description = `Root parasitic nematodes invading plant root hairs. They feed on plant nutrients and trigger defensive gall formations that throttle the plant.`;
    immediate_actions = ["Solarize soil in summer using transparent plastic.", "Uproot heavily affected crops.", "Apply organic matter/compost to soil."];
    chemical_treatments = [
      {
        chemical_name: "Fluensulfone Nematicide",
        active_ingredient: "Fluensulfone (2% GR)",
        dosage: "20g per square meter",
        application_method: "Incorporate into soil around roots",
        frequency: "Single application pre-planting or early season",
        safety_precautions: "Do not allow contact with skin. Toxic to aquatic organisms.",
        approximate_cost: "$45.00 per pack"
      }
    ];
    organic_alternatives = [
      {
        remedy: "Marigold Companion Planting",
        preparation: "Plant French Marigolds dense around crops",
        application: "Roots release alpha-terthienyl, which is highly toxic to nematodes"
      },
      {
        remedy: "Neem Cake soil additive",
        preparation: "Mix 100g neem cake powder per plant base",
        application: "Incorporate into soil top layer"
      }
    ];
    preventive_measures = [
      "Rotate crops with non-hosts like cereal grass.",
      "Incorporate compost to foster beneficial soil microbes.",
      "Solarize nurseries before sowing seed."
    ];
    if_untreated = "Slow starvation of the crop, complete root destruction, nutritional deficiencies, and permanent soil infestation.";
    expert_tip = "Incorporate lots of compost; beneficial soil fungi feed on nematodes, keeping populations balanced.";
    similar_diseases = ["Root Rot", "Nitrogen Deficiency", "Fusarium Wilt"];
    affected_parts = ["Roots", "Underground Tubers"];
    recovery_timeline = "30 to 60 days (Soil treatment scale)";
  } 
  else if (category === "Nutritional Deficiency") {
    symptoms = ["Interveinal chlorosis (yellow leaves, green veins)", "Purple tinting on underside of old foliage", "Slow development", "Necrotic leaf tips"];
    cause = "Lack of accessible mineral nutrients in soil, or incorrect soil pH blocking intake.";
    description = `An abiotic nutritional disorder. The plant lacks key elements needed to build chlorophyll molecules and energy blocks.`;
    immediate_actions = ["Test soil pH using a test kit.", "Apply a foliar nutrient spray for rapid absorption.", "Adjust water pH before feeding."];
    chemical_treatments = [
      {
        chemical_name: "Chelated Micronutrient Spray",
        active_ingredient: "Chelated Iron/EDTA Compound",
        dosage: "1g per Liter of water",
        application_method: "Direct leaf spray for instant intake",
        frequency: "Twice, 7 days apart",
        safety_precautions: "Keep in a cool dry place. Avoid eyes.",
        approximate_cost: "$14.00 per bottle"
      },
      {
        chemical_name: "Water-soluble NPK Fertilizer",
        active_ingredient: "NPK 19-19-19 balanced mix",
        dosage: "5g per Liter",
        application_method: "Soil drenching around rootzone",
        frequency: "Once every 15 days",
        safety_precautions: "Do not over-fertilize to avoid root burn.",
        approximate_cost: "$8.50 per kg"
      }
    ];
    organic_alternatives = [
      {
        remedy: "Compost Tea Foliar spray",
        preparation: "Steep 1L compost in 5L aerated water for 24h",
        application: "Spray leaves and drench roots for trace minerals"
      },
      {
        remedy: "Epsom Salt (for Magnesium)",
        preparation: "10g Epsom salt in 1L warm water",
        application: "Drench soil around chlorotic leaves"
      }
    ];
    preventive_measures = [
      "Maintain soil pH in the ideal 6.0–6.8 range.",
      "Cover soil with rich worm compost twice per season.",
      "Avoid waterlogging which drowns root respiration."
    ];
    if_untreated = "Severe stunted growth, lack of flowering, leaf drop, and weak stems easily broken by wind or pests.";
    expert_tip = "Chlorosis is often caused by cold, wet soil or bad pH locking up minerals rather than a true lack of soil nutrients.";
    similar_diseases = ["Iron Chlorosis", "Nitrogen Deficiency", "Magnesium Deficiency"];
    affected_parts = ["Leaves", "New Shoots", "Stalks"];
    recovery_timeline = "7 to 14 days (Rapid visual response)";
  } 
  else {
    // Pests
    symptoms = ["Speckled tiny yellow spots on leaves", "Sticky honeydew residue on leaf tops", "Fine webbing on leaf undersides", "Deformed crinkled new leaves"];
    cause = "Sucking or chewing insects feeding on nutrient sap and plant tissue.";
    description = `Active pest infestation. The insects punch holes in the plant cells, sucking out chlorophyll and structural sugars, which invites mold.`;
    immediate_actions = ["Blast pests off with a strong stream of hose water.", "Spray immediate insecticidal soap.", "Prune heavily infested flower or leaf buds."];
    chemical_treatments = [
      {
        chemical_name: "Abamectin Miticide",
        active_ingredient: "Abamectin 1.8% EC",
        dosage: "0.5ml per Liter",
        application_method: "Foliar mist targeting leaf undersides",
        frequency: "Once, repeat in 7 days if pests persist",
        safety_precautions: "Wear protective mask. Do not harvest for 14 days.",
        approximate_cost: "$22.00 per bottle"
      }
    ];
    organic_alternatives = [
      {
        remedy: "Horticultural Soap & Neem spray",
        preparation: "15ml soap and 5ml neem oil in 1L water",
        application: "Thoroughly spray undersides of leaves"
      },
      {
        remedy: "Introduce predatory insects",
        preparation: "Purchase and release ladybugs or lacewings",
        application: "Releasing at evening directly onto crops"
      }
    ];
    preventive_measures = [
      "Remove debris and weeds around plants where pests nest.",
      "Inspect leaf undersides weekly.",
      "Interplant companion crops like garlic and marigolds."
    ];
    if_untreated = "Deformed leaves, soot mold growth on sugary honeydew, virus transmission, and eventual crop collapse.";
    expert_tip = "Target the underside of leaves; 90% of sucking insects hide and lay eggs there.";
    similar_diseases = ["Spider Mite Infestation", "Aphid Infestation", "Whitefly Infestation"];
    affected_parts = ["Foliage", "Under leaves", "Soft stems", "Buds"];
    recovery_timeline = "7 to 10 days of targeted control";
  }

  // --- DISEASE SPECIFIC OVERRIDES ---
  if (code === "FNG-001") {
    symptoms = ["White talcum-like powdery spots on leaves and buds", "Leaves twist, buckle, and dry out", "Stunted new shoot growth"];
    description = `A powdery mildew fungal disease caused by Podosphaera pannosa affecting ${plantName}. It forms a dry powdery coating of mycelia, draining nutrients from leaves.`;
    expert_tip = "Avoid overhead watering. Dry foliage restricts powdery mildew spore activation.";
  } else if (code === "FNG-002") {
    symptoms = ["Circular black spots with yellow halos", "Premature defoliation starting from base", "Dark lesions on canes"];
    description = `A black spot fungal infection caused by Diplocarpon rosae affecting ${plantName}. Highly active in warm, wet weather.`;
    expert_tip = "Clean and destroy all fallen leaves around the base to prevent the fungus overwintering in the soil.";
  } else if (code === "FNG-003") {
    symptoms = ["Dark brown spots with concentric ring target patterns", "Lower leaves turn yellow and die", "Sunken stem spots"];
    description = `An early blight fungal infection caused by Alternaria solani affecting ${plantName}. Restricts leaf area and yield.`;
    expert_tip = "Keep leaves pruned up to 12 inches off the ground to prevent soil-splashed spores.";
  } else if (code === "FNG-004") {
    symptoms = ["Large greasy water-soaked dark leaf lesions", "White fuzzy mold on leaf undersides", "Rotting dark stems"];
    description = `A highly destructive late blight disease caused by Phytophthora infestans affecting ${plantName}. Spreads rapidly in cool, humid weather.`;
    expert_tip = "Act immediately. Late blight is extremely contagious and can wipe out fields in days.";
  } else if (code === "VRL-002") {
    symptoms = ["Upward curling of leaf margins", "Severe leaf yellowing", "Stunted terminal growth", "Failure to set fruit"];
    description = `Tomato yellow leaf curl virus affecting ${plantName}, transmitted by whitefly vectors. Results in massive crop losses.`;
    expert_tip = "Focus entirely on keeping whitefly vector populations under control using sticky traps and insect netting.";
  } else if (code === "NTR-006") {
    symptoms = ["Sunken black leathery spots at blossom end of fruit", "Leaf tip burn on young shoots", "Stunted root growth"];
    description = `Calcium deficiency (Blossom End Rot) affecting ${plantName}. Caused by erratic watering restricting calcium uptake.`;
    expert_tip = "Keep soil moisture consistent. Uneven watering restricts calcium movement from roots to fruit.";
  } else if (code === "FNG-015") {
    symptoms = ["Leaf bronzing starting at the leaf margins and moving inward", "Rapid tree defoliation in mid-summer", "Brown streaks in outer sapwood of cut branches"];
    description = `Oak Wilt is an aggressive, lethal fungal vascular disease caused by Bretziella fagacearum. It cuts off water transport in oak trees.`;
    expert_tip = "Never prune oak trees from April to July when sap-feeding beetle vectors are actively searching for wounds.";
    immediate_actions = ["Trench around infected oaks (at least 4 feet deep) to sever root grafts with healthy neighbors.", "Immediately remove and burn or bury infected oak wood."];
    preventive_measures = ["Paint all pruning wounds immediately with tree wound dressing if cuts are made during the growing season.", "Promote tree vigor through proper mulching and watering."];
  } else if (code === "FNG-016") {
    symptoms = ["Sunken yellow-orange cankers on stems or branches", "Wilting of leaves beyond the canker zone", "Fallen leaves remaining attached to dead twigs"];
    description = `Chestnut Blight is caused by the fungus Cryphonectria parasitica. It enters through wounds, forms cankers, and girdles the branches of Chestnut trees.`;
    expert_tip = "Inspect chestnut tree crotches and branch junctions regularly for early signs of orange-hued fungal pustules.";
    immediate_actions = ["Prune out cankered limbs at least 1 foot below the infection zone, sterilizing tools between cuts."];
    preventive_measures = ["Plant blight-resistant hybrid or Chinese chestnuts instead of susceptible American chestnuts.", "Avoid bark abrasions."];
  } else if (code === "FNG-017") {
    symptoms = ["Foliage wilting and yellowing in one branch ('flagging')", "Brown discoloration of the outer sapwood ring", "Sudden dieback of the elm canopy"];
    description = `Dutch Elm Disease is a highly destructive fungal disease caused by Ophiostoma novo-ulmi. It is vectored by bark beetles and clogs water transport.`;
    expert_tip = "Promptly prune and debark dead elm trees to eliminate breeding sites for the elm bark beetles.";
  } else if (code === "BCT-008") {
    symptoms = ["Leaf scorching where margins turn brown and dry", "Petioles remain attached to the stem after leaf blade drops", "Irregular woody cane maturation ('green islands')"];
    description = `Pierce's Disease is a lethal bacterial disease caused by Xylella fastidiosa. It multiplies within the xylem vessels of Grape vines and trees, blocking water flow.`;
    expert_tip = "Control sharpshooter insect vectors (like glassy-winged sharpshooters) with sticky traps and systematic insecticidal treatments.";
  } else if (code === "BCT-010") {
    symptoms = ["Premature dropping of coconuts of all sizes", "Blackening of flower stalks (inflorescence)", "Progressive yellowing of fronds starting from base and moving upward"];
    description = `Coconut Lethal Yellowing is a phytoplasma-caused disease. It is transmitted by planthopper vectors, turning coconut palm fronds yellow and killing them.`;
    expert_tip = "Trunk injections of oxytetracycline HCl can suppress symptoms if applied in the early stages.";
  } else if (code === "VRL-007") {
    symptoms = ["Elongated shoots with excessive, flexible red growth", "Witches' broom (tight clusters of shoots)", "Massive increase in soft prickles/thorns on stems"];
    description = `Rose Rosette Disease is caused by the Rose rosette virus, transmitted by microscopic eriophyid mites. It causes extreme deformities and death in rose bushes.`;
    expert_tip = "Bag and uproot the entire infected rose bush immediately. Mites will blow to other roses if left standing.";
  } else if (code === "NMT-003") {
    symptoms = ["Rapid needle browning of pine trees", "Complete stoppage of oleoresin flow when cut", "Tree death within a single growing season"];
    description = `Pine Wilt Disease is a deadly tree wilt caused by the Pine wood nematode (Bursaphelenchus xylophilus), carried by pine sawyer beetles.`;
    expert_tip = "Ensure pines are not drought-stressed, as stressed pines release volatile scents that attract beetle vectors.";
  } else if (code === "PST-009") {
    symptoms = ["D-shaped exit holes (1/8 inch) on ash tree bark", "Sinuous, serpentine galleries packed with sawdust under bark", "Thinning canopy and heavy water-sprouting at the base"];
    description = `Emerald Ash Borer damage is caused by the larvae of the metallic green beetle Agrilus planipennis, which girdle ash trees by eating phloem.`;
    expert_tip = "Systemic imidacloprid or emamectin benzoate injected directly into the trunk is highly effective if canopy loss is under 30%.";
  } else if (code === "PST-013") {
    symptoms = ["Oozing brown jelly-like liquid from palm trunks", "Chewed plant fibers at tunnel entrances", "Collapse of the central palm crown"];
    description = `Red Palm Weevil damage is caused by the large snout beetle Rhynchophorus ferrugineus, whose larvae bore deep into the trunks of palms.`;
    expert_tip = "Avoid cutting palm fronds during the weevil's active flight season as fresh cuts release attracting pheromones.";
  }

  // Generate randomized confidence and risk level based on the severity
  const confidence = Math.floor(Math.random() * 15) + 82; // 82-96%
  const spread_risk = severity === "Critical" ? "Very High" : severity === "Severe" ? "High" : severity === "Moderate" ? "Medium" : "Low";

  return {
    disease_name: name,
    disease_code: code,
    category,
    confidence,
    severity,
    affected_parts,
    symptoms_observed: symptoms,
    cause,
    disease_description: description,
    spread_risk,
    if_untreated,
    treatment_plan: {
      immediate_actions,
      chemical_treatments,
      organic_alternatives,
      preventive_measures
    },
    recovery_timeline,
    follow_up_care: ["Inspect new leaves weekly for reappearance.", "Maintain soil moisture but keep leaf surfaces dry.", "Re-apply protective organic spray after heavy rainfall."],
    seasonal_risk: base.seasonal_risk || "Summer / Warm Monsoons",
    similar_diseases,
    expert_tip
  };
}

// --- DAILY AGRIO TIPS ---
const TIPS_OF_THE_DAY = [
  "Deep watering once a week is far better than light daily watering. It encourages roots to grow deep, making plants drought-resilient.",
  "Drip irrigation keeps leaves dry, preventing 80% of fungal and bacterial spores from germinating.",
  "Ensure you sanitize your pruning shears with a 10% bleach solution or 70% alcohol between trimming different plants.",
  "French Marigolds release chemical compounds through their roots that repel destructive root-knot nematodes.",
  "Iron chlorosis is often a sign of waterlogged soil or high pH rather than an actual iron shortage in the soil.",
  "Ladybugs and Lacewings are natural predators of aphids. Avoid spraying chemicals when they are actively feeding on pests."
];

// --- APP COMPONENT ---
export default function App() {
  // --- STATE LIST ---
  const [isSplashing, setIsSplashing] = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('ac_registered_users');
    let list = saved ? JSON.parse(saved) : [];
    if (!list.some(u => u.email.toLowerCase() === 'admin123@gmail.com')) {
      list.push({
        email: 'admin123@gmail.com',
        password: '1234',
        name: 'Dr. Angio Admin',
        role: 'Botanist',
        location: 'California Head Office',
        memberSince: 'June 2026',
        streakDays: 5,
        stats: { totalScans: 12, diseasesDetected: 4, plantsSaved: 10 }
      });
      localStorage.setItem('ac_registered_users', JSON.stringify(list));
    }
    return list;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ac_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Pages: 'dashboard' | 'scan' | 'encyclopedia' | 'history' | 'analytics' | 'fields' | 'settings'
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Auth Form State
  const [authTab, setAuthTab] = useState('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authRole, setAuthRole] = useState('Farmer');
  const [authLocation, setAuthLocation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authErrors, setAuthErrors] = useState({});

  // Settings & Configurations
  const [theme, setTheme] = useState(() => localStorage.getItem('ac_theme') || 'dark');
  const [treatmentPreference, setTreatmentPreference] = useState(() => localStorage.getItem('ac_treatment_pref') || 'Both');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('ac_api_key') || '');
  const [proxyUrl, setProxyUrl] = useState(() => localStorage.getItem('ac_proxy_url') || '');
  const [apiMode, setApiMode] = useState(() => localStorage.getItem('ac_api_mode') || 'mock');
  const [notifPrefs, setNotifPrefs] = useState(() => {
    const saved = localStorage.getItem('ac_notif_prefs');
    return saved ? JSON.parse(saved) : { scanComplete: true, seasonalAlert: true, reminders: true, dailyTip: true };
  });

  // Global Toasts state
  const [toasts, setToasts] = useState([]);

  // Sidebar states
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('ac_notifications');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'n-1', text: "Welcome to Angio-Care! Set up your API key or start with Mock Mode.", type: 'system', read: false, time: new Date().toLocaleTimeString() },
      { id: 'n-2', text: "Seasonal Alert: Late Blight risk is high in warm, humid regions this month.", type: 'risk', read: false, time: new Date().toLocaleTimeString() }
    ];
  });
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Scan states
  const [plantName, setPlantName] = useState('');
  const [isUnknown, setIsUnknown] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [frontCameraImage, setFrontCameraImage] = useState(null);
  const [rearCameraImage, setRearCameraImage] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [activeReport, setActiveReport] = useState(null);
  const [tagFieldId, setTagFieldId] = useState('');
  const [simulateInvalidSpecimen, setSimulateInvalidSpecimen] = useState(false);
  const [scanError, setScanError] = useState(null);
  
  // Before/After compare states
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonResult, setComparisonResult] = useState(null);

  // Camera Modal States
  const [cameraModalType, setCameraModalType] = useState(null); // 'front' | 'rear' | null
  const [mediaStream, setMediaStream] = useState(null);
  const videoRef = useRef(null);

  // Scan History
  const [scanHistory, setScanHistory] = useState(() => {
    const saved = localStorage.getItem('ac_scan_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [historySearch, setHistorySearch] = useState('');
  const [historyTimeFilter, setHistoryTimeFilter] = useState('all'); // 'all' | 'week' | 'month'
  const [historyPlantFilter, setHistoryPlantFilter] = useState('all');

  // Encyclopedia states
  const [encSearch, setEncSearch] = useState('');
  const [encCategory, setEncCategory] = useState('All');
  const [selectedEncyclopediaDisease, setSelectedEncyclopediaDisease] = useState(null);

  // Fields (My Fields) state
  const [fields, setFields] = useState(() => {
    const saved = localStorage.getItem('ac_fields');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'f-1', name: "North Vineyard", plantType: "Grape", status: "Healthy", scansCount: 0 },
      { id: 'f-2', name: "Potato Tunnel 2", plantType: "Potato", status: "Healthy", scansCount: 0 }
    ];
  });
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldPlant, setNewFieldPlant] = useState('Rose');

  // Reminders state
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('ac_reminders');
    return saved ? JSON.parse(saved) : [];
  });
  const [newReminderDate, setNewReminderDate] = useState('');
  const [newReminderNote, setNewReminderNote] = useState('');

  // Daily Tip state
  const [tipIndex] = useState(() => Math.floor(Math.random() * TIPS_OF_THE_DAY.length));

  // Weather Widget input
  const [weatherTemp, setWeatherTemp] = useState('28');
  const [weatherHumid, setWeatherHumid] = useState('80');
  const [weatherRiskResult, setWeatherRiskResult] = useState(null);

  // Dr. Angio Chatbot
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState(() => {
    const saved = localStorage.getItem('ac_chat_history');
    if (saved) return JSON.parse(saved);
    return [{ sender: 'doctor', text: "Hello, I am Dr. Angio. How is your garden or farm doing today? Select a question or ask me anything about plant diseases.", time: new Date().toLocaleTimeString() }];
  });
  const [chatInput, setChatInput] = useState('');
  const [isTypingChat, setIsTypingChat] = useState(false);

  // Onboarding Tour
  const [onboardingTourStep, setOnboardingTourStep] = useState(null);

  // Dialog / Form Modals
  const [showAgronomistModal, setShowAgronomistModal] = useState(false);
  const [agronomistForm, setAgronomistForm] = useState({ name: '', phone: '', date: '', summary: '' });
  const [showDeleteAccountConfirm, setShowDeleteAccountConfirm] = useState(false);

  // Offline indicator
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // --- UTILITY CALCULATIONS FOR ANALYTICS ---
  const diseaseCategoriesData = useMemo(() => {
    const counts = { Fungal: 0, Bacterial: 0, Viral: 0, Nematodal: 0, Abiotic: 0, Pest: 0, "Nutritional Deficiency": 0 };
    scanHistory.forEach(s => {
      const cat = s?.report?.category;
      if (cat && counts[cat] !== undefined) counts[cat]++;
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] })).filter(d => d.value > 0);
  }, [scanHistory]);

  const scanActivityData = useMemo(() => {
    if (scanHistory.length === 0) return [{ date: new Date().toLocaleDateString(), Scans: 0 }];
    const counts = {};
    scanHistory.slice(0, 10).reverse().forEach(s => {
      if (s?.date) {
        counts[s.date] = (counts[s.date] || 0) + 1;
      }
    });
    return Object.keys(counts).map(key => ({ date: key, Scans: counts[key] }));
  }, [scanHistory]);

  const plantTypesData = useMemo(() => {
    const counts = {};
    scanHistory.forEach(s => {
      if (s?.plant_name) {
        counts[s.plant_name] = (counts[s.plant_name] || 0) + 1;
      }
    });
    return Object.keys(counts).map(key => ({ plant: key, Count: counts[key] })).sort((a, b) => b.Count - a.Count).slice(0, 5);
  }, [scanHistory]);

  const mostCommonDiseaseDetected = useMemo(() => {
    if (scanHistory.length === 0) return "None Detected";
    const counts = {};
    scanHistory.forEach(s => {
      if (s?.report?.disease_name) {
        counts[s.report.disease_name] = (counts[s.report.disease_name] || 0) + 1;
      }
    });
    if (Object.keys(counts).length === 0) return "None Detected";
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  }, [scanHistory]);

  const totalDiseasesDetectedCount = useMemo(() => {
    return new Set(scanHistory.filter(s => s?.report?.disease_name).map(s => s.report.disease_name)).size;
  }, [scanHistory]);

  // --- SYNC EFFECTS ---
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ac_scan_history');
      if (saved) {
        const history = JSON.parse(saved);
        if (Array.isArray(history)) {
          const validHistory = history.filter(s => s && s.plant_name && s.report && s.report.disease_name);
          if (validHistory.length !== history.length) {
            setScanHistory(validHistory);
            localStorage.setItem('ac_scan_history', JSON.stringify(validHistory));
          }
        }
      }
    } catch (e) {
      console.error("Clean history failed", e);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplashing(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme === 'light' ? 'light-mode' : '';
    localStorage.setItem('ac_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('ac_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('ac_scan_history', JSON.stringify(scanHistory));
  }, [scanHistory]);

  useEffect(() => {
    localStorage.setItem('ac_chat_history', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem('ac_fields', JSON.stringify(fields));
  }, [fields]);

  useEffect(() => {
    localStorage.setItem('ac_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('ac_notif_prefs', JSON.stringify(notifPrefs));
  }, [notifPrefs]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // --- TOAST TRIGGER ---
  const triggerToast = (message, type = 'success') => {
    const id = 't-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // --- TOUR TRIGGERS ---
  const startOnboardingTour = () => {
    setOnboardingTourStep(0);
  };

  const nextTourStep = () => {
    setOnboardingTourStep(prev => prev + 1);
  };

  const endTour = () => {
    setOnboardingTourStep(null);
    triggerToast("Tour completed! Enjoy Angio-Care.", "success");
  };

  // --- AUTH OPERATIONS ---
  const handleAuth = (e) => {
    e.preventDefault();
    setAuthErrors({});
    let errors = {};

    const emailRegex = /^[a-zA-Z]+[0-9]+@gmail\.com$/;
    if (!emailRegex.test(authEmail)) {
      errors.email = "Email must be in the format (alphabets)numbers@gmail.com (e.g. admin123@gmail.com).";
    }

    const passwordRegex = /^[0-9]{4,}$/;
    if (!passwordRegex.test(authPassword)) {
      errors.password = "Password must be at least 4 digits and contain only numbers.";
    }

    if (authTab === 'register') {
      if (!authName.trim()) errors.name = "Name is required.";
      if (!authLocation.trim()) errors.location = "Location is required.";
      if (registeredUsers.some(u => u.email.toLowerCase() === authEmail.toLowerCase())) {
        errors.email = "Email is already registered.";
      }
    }

    if (Object.keys(errors).length > 0) {
      setAuthErrors(errors);
      triggerToast("Please check form errors", "error");
      return;
    }

    if (authTab === 'login') {
      const foundUser = registeredUsers.find(u => u.email.toLowerCase() === authEmail.toLowerCase());
      if (!foundUser) {
        setAuthErrors({ email: "No account registered with this email." });
        triggerToast("Authentication failed", "error");
        return;
      }
      if (foundUser.password !== authPassword) {
        setAuthErrors({ password: "Incorrect password." });
        triggerToast("Authentication failed", "error");
        return;
      }

      setCurrentUser(foundUser);
      localStorage.setItem('ac_current_user', JSON.stringify(foundUser));
      triggerToast("Logged in successfully!", "success");
      if (scanHistory.length === 0) {
        setTimeout(() => startOnboardingTour(), 1000);
      }
    } else {
      const newUser = {
        name: authName,
        email: authEmail,
        password: authPassword,
        role: authRole,
        location: authLocation,
        memberSince: "June 2026",
        photo: null,
        streakDays: 1,
        stats: { totalScans: 0, diseasesDetected: 0, plantsSaved: 0 }
      };
      const updatedList = [...registeredUsers, newUser];
      setRegisteredUsers(updatedList);
      localStorage.setItem('ac_registered_users', JSON.stringify(updatedList));

      setCurrentUser(newUser);
      localStorage.setItem('ac_current_user', JSON.stringify(newUser));
      triggerToast("Account registered successfully!", "success");
      setTimeout(() => startOnboardingTour(), 1000);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ac_current_user');
    triggerToast("Logged out.", "info");
    setShowUserMenu(false);
  };

  const handleDeleteAccount = () => {
    setCurrentUser(null);
    setScanHistory([]);
    setChatMessages([]);
    localStorage.clear();
    setShowDeleteAccountConfirm(false);
    triggerToast("Account and all associated records permanently deleted.", "error");
  };

  // --- CAMERA ACCESS FLOWS ---
  const startCamera = async (type) => {
    try {
      setCameraModalType(type);
      const constraints = {
        video: { facingMode: type === 'front' ? 'user' : 'environment' },
        audio: false
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      triggerToast("Unable to access camera: " + err.message, "error");
      setCameraModalType(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');

      if (cameraModalType === 'front') {
        setFrontCameraImage(dataUrl);
      } else {
        setRearCameraImage(dataUrl);
      }
      stopCamera();
      triggerToast("Photo captured!", "success");
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    setCameraModalType(null);
  };

  // --- DRAG-AND-DROP ZONE HANDLERS ---
  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (imageFiles.length === 0) {
      triggerToast("Please upload images only.", "error");
      return;
    }

    if (uploadedFiles.length + imageFiles.length > 3) {
      triggerToast("Maximum of 3 images can be uploaded.", "warning");
      return;
    }

    imageFiles.forEach(file => {
      if (file.size > 10 * 1024 * 1024) {
        triggerToast(`${file.name} exceeds 10MB limit.`, "error");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setUploadedFiles(prev => [...prev, reader.result]);
        triggerToast("Image uploaded successfully!", "success");
      };
      reader.readAsDataURL(file);
    });
  };

  const removeUploadedFile = (idx) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== idx));
    triggerToast("Image removed.", "info");
  };

  // --- AI ANALYSIS CONTROLLER ---
  const runPlantAnalysis = async () => {
    const nameToUse = isUnknown ? "Unknown Plant" : plantName;
    if (!nameToUse) {
      triggerToast("Please enter a plant name or check 'Unknown Plant'.", "warning");
      return;
    }

    const hasImages = frontCameraImage || rearCameraImage || uploadedFiles.length > 0;
    if (!hasImages) {
      triggerToast("Please capture a photo or upload at least one image.", "warning");
      return;
    }

    setIsScanning(true);
    setScanProgress(10);

    // Progress bar mock visual steps
    const interval = setInterval(() => {
      setScanProgress(p => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + 20;
      });
    }, 400);

    setScanError(null);

    // 1. Strict Validation check for non-plant inputs / mock rejection
    const nonPlantKeywords = ["car", "dog", "cat", "human", "person", "shoe", "house", "building", "computer", "phone", "animal", "bird", "table", "chair"];
    const containsNonPlantKeyword = nonPlantKeywords.some(kw => nameToUse.toLowerCase().includes(kw));

    if (simulateInvalidSpecimen || (containsNonPlantKeyword && !isUnknown)) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsScanning(false);
      setScanProgress(0);
      setScanError("The uploaded image does not appear to contain any recognized plant leaves, stems, crops, or tree parts. Specimen validation failed. Please provide a clear close-up image of a plant specimen.");
      triggerToast("Specimen validation failed!", "error");
      clearInterval(interval);
      return;
    }

    try {
      let finalReport = null;

      if (apiMode === 'live' && apiKey) {
        // Prepare images base64 payload
        const allBase64Images = [];
        if (frontCameraImage) allBase64Images.push(frontCameraImage);
        if (rearCameraImage) allBase64Images.push(rearCameraImage);
        uploadedFiles.forEach(img => allBase64Images.push(img));

        const systemPrompt = `You are Angio-Care's expert plant pathologist AI with 30 years of experience in diagnosing diseases of plants, trees, and shrubs worldwide. First, verify if the provided image contains a plant, leaf, tree, stem, or root specimen. If it does NOT contain a plant or agricultural specimen, you MUST respond with a valid JSON object (no markdown, no backticks) with this exact structure: { "error": "invalid_specimen", "message": "The uploaded image is not recognized as a plant specimen. Please upload a clear photo of a leaf, branch, stem, or plant part." }. Otherwise, diagnose the disease affecting the plant. The user says the plant is: ${nameToUse}. Respond ONLY with a valid JSON object (no markdown, no backticks) with this exact structure: { disease_name, disease_code (e.g. FNG-001), category (Fungal|Bacterial|Viral|Nematodal|Abiotic|Pest|Nutritional Deficiency), confidence (0-100), severity (Mild|Moderate|Severe|Critical), affected_parts (array), symptoms_observed (array), cause, disease_description, spread_risk (Low|Medium|High|Very High), if_untreated, treatment_plan: { immediate_actions (array), chemical_treatments (array of: chemical_name, active_ingredient, dosage, application_method, frequency, safety_precautions, approximate_cost), organic_alternatives (array of: remedy, preparation, application), preventive_measures (array) }, recovery_timeline, follow_up_care (array), seasonal_risk, similar_diseases (array), expert_tip }`;

        // Direct Anthropic Messages API payload
        const response = await fetch(proxyUrl || 'https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            ...(proxyUrl ? {} : { 'anthropic-danger-access-control-allow-origin': '*' })
          },
          body: JSON.stringify({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 1500,
            system: systemPrompt,
            messages: [
              {
                role: "user",
                content: [
                  ...allBase64Images.map(img => ({
                    type: "image",
                    source: {
                      type: "base64",
                      media_type: "image/jpeg",
                      data: img.split(',')[1]
                    }
                  })),
                  {
                    type: "text",
                    text: `Analyze the uploaded images of a diseased ${nameToUse}.`
                  }
                ]
              }
            ]
          })
        });

        if (!response.ok) {
          throw new Error(`Anthropic API error: ${response.statusText} (${response.status})`);
        }

        const data = await response.json();
        const contentText = data.content[0].text;
        finalReport = JSON.parse(contentText);
        
        if (finalReport.error === 'invalid_specimen' || finalReport.error) {
          throw new Error(`invalid_specimen: ${finalReport.message || "Specimen validation failed."}`);
        }

        // Add Latin name if not parsed
        if (!finalReport.scientific_name) {
          finalReport.scientific_name = "Botanical scientific species";
        }
      } else {
        // MOCK AI SYSTEM (High Quality representation)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        let diseaseId = null;
        const lowerPlant = nameToUse.toLowerCase();

        if (lowerPlant.includes("rose")) {
          const ids = ["FNG-001", "FNG-002", "FNG-005", "PST-001", "VRL-007"];
          diseaseId = ids[Math.floor(Math.random() * ids.length)];
        } else if (lowerPlant.includes("tomato")) {
          const ids = ["FNG-003", "FNG-004", "VRL-002", "NTR-006"];
          diseaseId = ids[Math.floor(Math.random() * ids.length)];
        } else if (lowerPlant.includes("potato")) {
          const ids = ["FNG-003", "FNG-004", "NMT-002", "BCT-005"];
          diseaseId = ids[Math.floor(Math.random() * ids.length)];
        } else if (lowerPlant.includes("grape")) {
          const ids = ["FNG-008", "FNG-001", "FNG-006", "BCT-008"];
          diseaseId = ids[Math.floor(Math.random() * ids.length)];
        } else if (lowerPlant.includes("apple") || lowerPlant.includes("pear")) {
          const ids = ["BCT-003", "FNG-012", "BCT-009"];
          diseaseId = ids[Math.floor(Math.random() * ids.length)];
        } else if (lowerPlant.includes("mango") || lowerPlant.includes("papaya")) {
          const ids = ["FNG-006", "VRL-003", "PST-003", "FNG-020"];
          diseaseId = ids[Math.floor(Math.random() * ids.length)];
        } else if (lowerPlant.includes("banana")) {
          const ids = ["VRL-004", "FNG-009"];
          diseaseId = ids[Math.floor(Math.random() * ids.length)];
        } else if (lowerPlant.includes("wheat") || lowerPlant.includes("rice") || lowerPlant.includes("corn") || lowerPlant.includes("maize")) {
          const ids = ["FNG-005", "BCT-001", "NTR-001", "NTR-003"];
          diseaseId = ids[Math.floor(Math.random() * ids.length)];
        } else if (lowerPlant.includes("orange") || lowerPlant.includes("lemon") || lowerPlant.includes("citrus")) {
          const ids = ["BCT-006", "VRL-005", "NTR-002", "FNG-019", "VRL-010", "PST-011"];
          diseaseId = ids[Math.floor(Math.random() * ids.length)];
        } else if (lowerPlant.includes("oak")) {
          const ids = ["FNG-015", "FNG-022", "PST-016"];
          diseaseId = ids[Math.floor(Math.random() * ids.length)];
        } else if (lowerPlant.includes("pine")) {
          const ids = ["FNG-021", "FNG-025", "NMT-003", "PST-012"];
          diseaseId = ids[Math.floor(Math.random() * ids.length)];
        } else if (lowerPlant.includes("chestnut")) {
          const ids = ["FNG-016"];
          diseaseId = ids[Math.floor(Math.random() * ids.length)];
        } else if (lowerPlant.includes("elm")) {
          const ids = ["FNG-017"];
          diseaseId = ids[Math.floor(Math.random() * ids.length)];
        } else if (lowerPlant.includes("coffee")) {
          const ids = ["FNG-018", "BCT-005"];
          diseaseId = ids[Math.floor(Math.random() * ids.length)];
        } else if (lowerPlant.includes("coconut") || lowerPlant.includes("palm")) {
          const ids = ["BCT-010", "NMT-004", "PST-013"];
          diseaseId = ids[Math.floor(Math.random() * ids.length)];
        } else if (lowerPlant.includes("ash")) {
          const ids = ["BCT-012", "PST-009"];
          diseaseId = ids[Math.floor(Math.random() * ids.length)];
        } else if (lowerPlant.includes("maple")) {
          const ids = ["FNG-023"];
          diseaseId = ids[Math.floor(Math.random() * ids.length)];
        } else if (lowerPlant.includes("olive")) {
          const ids = ["BCT-007"];
          diseaseId = ids[Math.floor(Math.random() * ids.length)];
        } else if (lowerPlant.includes("cacao")) {
          const ids = ["VRL-008"];
          diseaseId = ids[Math.floor(Math.random() * ids.length)];
        } else if (lowerPlant.includes("plum") || lowerPlant.includes("cherry")) {
          const ids = ["VRL-006", "VRL-009", "VRL-011", "FNG-027"];
          diseaseId = ids[Math.floor(Math.random() * ids.length)];
        } else {
          const randomBase = ENCYCLOPEDIA_DATABASE[Math.floor(Math.random() * ENCYCLOPEDIA_DATABASE.length)];
          diseaseId = randomBase.id;
        }

        const selectedBase = ENCYCLOPEDIA_DATABASE.find(d => d.id === diseaseId);
        finalReport = getExtendedDiseaseReport(selectedBase, nameToUse);
      }

      setScanProgress(100);
      clearInterval(interval);
      setIsScanning(false);

      // Create detailed record
      const record = {
        id: 'scan-' + Date.now(),
        plant_name: nameToUse,
        image: frontCameraImage || rearCameraImage || uploadedFiles[0],
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        report: finalReport,
        healthScore: Math.max(15, 100 - (finalReport.confidence * (finalReport.severity === 'Critical' ? 0.8 : finalReport.severity === 'Severe' ? 0.6 : 0.3))),
        field_id: ''
      };

      setScanHistory(prev => [record, ...prev]);
      setActiveReport(record);

      // Increment User Streak and stats
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          streakDays: currentUser.streakDays + 1,
          stats: {
            ...currentUser.stats,
            totalScans: currentUser.stats.totalScans + 1,
            diseasesDetected: currentUser.stats.diseasesDetected + 1
          }
        };
        setCurrentUser(updatedUser);
        localStorage.setItem('ac_current_user', JSON.stringify(updatedUser));
      }

      // Add Notification
      const newNotif = {
        id: 'n-' + Date.now(),
        text: `Analysis Completed: ${finalReport.disease_name} detected on ${nameToUse}.`,
        type: 'success',
        read: false,
        time: new Date().toLocaleTimeString()
      };
      setNotifications(prev => [newNotif, ...prev]);

      triggerToast("Scan completed successfully!", "success");

      // Auto trigger Follow-up reminders (7 days after severe/critical diagnosis)
      if (finalReport.severity === 'Severe' || finalReport.severity === 'Critical') {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 7);
        const autoReminder = {
          id: 'rem-' + Date.now(),
          date: futureDate.toISOString().split('T')[0],
          note: `Follow-up check: ${finalReport.disease_name} treatment on ${nameToUse}.`,
          completed: false
        };
        setReminders(prev => [autoReminder, ...prev]);
        
        // Add notification about the reminder
        setTimeout(() => {
          setNotifications(prev => [{
            id: 'n-rem-' + Date.now(),
            text: `Reminder Scheduled: Follow-up checkup set for ${futureDate.toLocaleDateString()}.`,
            type: 'system',
            read: false,
            time: new Date().toLocaleTimeString()
          }, ...prev]);
        }, 1500);
      }

    } catch (err) {
      clearInterval(interval);
      setIsScanning(false);
      setScanProgress(0);
      if (err.message.startsWith("invalid_specimen:")) {
        setScanError(err.message.replace("invalid_specimen:", "").trim());
        triggerToast("Specimen validation failed!", "error");
      } else {
        triggerToast("Analysis failed: " + err.message, "error");
      }
    }
  };

  const handleResetScan = () => {
    setFrontCameraImage(null);
    setRearCameraImage(null);
    setUploadedFiles([]);
    setPlantName('');
    setIsUnknown(false);
    setActiveReport(null);
    setComparisonResult(null);
    setBeforeImage(null);
    setAfterImage(null);
    setScanError(null);
    setSimulateInvalidSpecimen(false);
  };

  // --- BEFORE / AFTER COMPARATIVE ENGINE ---
  const handleBeforeAfterCompare = async () => {
    if (!beforeImage || !afterImage) {
      triggerToast("Upload both Before and After images to compare.", "warning");
      return;
    }

    setIsComparing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsComparing(false);

    const improvementPercent = Math.floor(Math.random() * 30) + 50; // 50-80%
    setComparisonResult({
      improvementPercentage: improvementPercent,
      notes: `Comparative review reveals strong cellular recovery. The necrotic tissue lesions have reduced by ${improvementPercent}%. Chlorophyll retention has improved in surrounding tissues. Keep following the organic neem protocol.`
    });

    triggerToast("Before/After analysis completed!", "success");
  };

  // --- WEATHER RISK CONTROLLER ---
  const evaluateWeatherRisk = () => {
    const t = parseFloat(weatherTemp);
    const h = parseFloat(weatherHumid);

    if (isNaN(t) || isNaN(h)) {
      triggerToast("Please enter valid temperature and humidity levels.", "warning");
      return;
    }

    let riskValue = 0;
    let list = [];

    // Fungal risk increases with humidity and warm temps
    if (h > 75 && t > 20 && t < 32) {
      riskValue = 85;
      list = ["Powdery Mildew (FNG-001)", "Early Blight (FNG-003)", "Late Blight (FNG-004)"];
    } else if (h > 60 && t > 15 && t < 35) {
      riskValue = 50;
      list = ["Bacterial Wilt (BCT-005)", "Aphid Infestation (PST-001)"];
    } else {
      riskValue = 20;
      list = ["Spider Mite Infestation (PST-004)"];
    }

    setWeatherRiskResult({
      score: riskValue,
      status: riskValue > 70 ? "High Risk" : riskValue > 40 ? "Moderate" : "Low Risk",
      diseases: list
    });
    triggerToast("Weather risk updated.", "success");
  };

  // Trigger weather auto-evaluate on load/page change
  useEffect(() => {
    evaluateWeatherRisk();
  }, []);

  // --- DR. ANGIO CHAT SYSTEM ---
  const handleSendMessage = async (textToSend) => {
    const msg = textToSend || chatInput;
    if (!msg.trim()) return;

    const userMessage = { sender: 'user', text: msg, time: new Date().toLocaleTimeString() };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTypingChat(true);

    try {
      let doctorResponse = "";

      if (apiMode === 'live' && apiKey) {
        const chatSystemPrompt = `You are Dr. Angio, a friendly expert plant doctor on the Angio-Care platform. You have deep knowledge of plant diseases, treatments, chemical and organic remedies, agricultural best practices, soil health, and seasonal care. You help farmers, gardeners, and botanists diagnose and treat their plants. Be warm, professional, and practical. Give specific chemical names, dosages, and application methods when asked. Always prioritize plant safety and human health. If urgency is detected, recommend professional agronomist consultation.`;

        // Format history for Claude
        const anthropicMessages = chatMessages.map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        }));
        anthropicMessages.push({ role: 'user', content: msg });

        const response = await fetch(proxyUrl || 'https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 600,
            system: chatSystemPrompt,
            messages: anthropicMessages
          })
        });

        if (!response.ok) {
          throw new Error("API call failed.");
        }

        const data = await response.json();
        doctorResponse = data.content[0].text;
      } else {
        // MOCK DR ANGIO RESPONSES
        await new Promise(resolve => setTimeout(resolve, 1500));
        const cleanMsg = msg.toLowerCase();
        
        if (cleanMsg.includes("chemical")) {
          doctorResponse = "For rapid chemical control of fungal diseases, copper fungicides or Mancozeb sprays are widely recommended. Always apply early in the morning, use a quality sprayer for full coverage, and wear personal protective equipment.";
        } else if (cleanMsg.includes("contagious") || cleanMsg.includes("spread")) {
          doctorResponse = "Yes, fungal and bacterial diseases spread incredibly fast through wind, irrigation splashes, or contaminated tools. I advise isolating infected plants and pruning away diseased sections immediately.";
        } else if (cleanMsg.includes("organic") || cleanMsg.includes("natural")) {
          doctorResponse = "An excellent organic remedy is a 0.5% neem oil foliar spray mixed with soap emulsifier, or a baking soda solution. These neutralize leaf pH and form a protective barrier against fungal spores.";
        } else if (cleanMsg.includes("prevent")) {
          doctorResponse = "Prevention is key! Keep plant canopies well-ventilated, prune branches to let air flow, water the base of the stems (not leaves), and rotate crop types every year.";
        } else {
          doctorResponse = "That's an important botanical query. If you've uploaded a picture, check the scan report. I highly advise keeping the foliage dry, ensuring soil drainage, and applying organic mulch. If leaves wilt suddenly, consider checking for root-knot nematodes or vascular bacterial wilt.";
        }
      }

      setChatMessages(prev => [...prev, { sender: 'doctor', text: doctorResponse, time: new Date().toLocaleTimeString() }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { sender: 'doctor', text: "I'm having trouble connecting to my brain right now. Please verify your Anthropic API key in Settings, or try again.", time: new Date().toLocaleTimeString() }]);
    } finally {
      setIsTypingChat(false);
    }
  };

  const exportChatHistory = () => {
    const transcript = chatMessages.map(m => `[${m.time}] ${m.sender === 'user' ? 'User' : 'Dr. Angio'}: ${m.text}`).join('\n');
    const blob = new Blob([transcript], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `dr_angio_chat_${Date.now()}.txt`;
    link.click();
    triggerToast("Chat exported successfully!", "success");
  };

  // --- REMINDERS ACTIONS ---
  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!newReminderDate || !newReminderNote.trim()) {
      triggerToast("Please enter a valid date and description.", "warning");
      return;
    }
    const newRem = {
      id: 'rem-' + Date.now(),
      date: newReminderDate,
      note: newReminderNote,
      completed: false
    };
    setReminders(prev => [newRem, ...prev]);
    setNewReminderDate('');
    setNewReminderNote('');
    triggerToast("Follow-up reminder set!", "success");
  };

  const toggleReminderCompleted = (id) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
    triggerToast("Reminder status updated.", "info");
  };

  const deleteReminder = (id) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    triggerToast("Reminder deleted.", "info");
  };

  // --- FIELDS ACTIONS ---
  const handleAddField = (e) => {
    e.preventDefault();
    if (!newFieldName.trim()) return;
    const newF = {
      id: 'f-' + Date.now(),
      name: newFieldName,
      plantType: newFieldPlant,
      status: "Healthy",
      scansCount: 0
    };
    setFields(prev => [...prev, newF]);
    setNewFieldName('');
    triggerToast(`Field "${newFieldName}" registered!`, "success");
  };

  const assignScanToField = (scanId, fieldId) => {
    setScanHistory(prev => prev.map(s => s.id === scanId ? { ...s, field_id: fieldId } : s));
    
    // Recalculate field health averages
    setFields(prev => prev.map(f => {
      if (f.id === fieldId) {
        const fieldScans = scanHistory.filter(s => s.field_id === fieldId || (s.id === scanId && fieldId !== ''));
        const hasCritical = fieldScans.some(s => s.report.severity === 'Critical');
        const hasSevere = fieldScans.some(s => s.report.severity === 'Severe');
        let status = "Healthy";
        if (hasCritical) status = "Critical Risk";
        else if (hasSevere) status = "At Risk";
        else if (fieldScans.length > 0) status = "Monitored";

        return { ...f, scansCount: fieldScans.length + 1, status };
      }
      return f;
    }));

    triggerToast("Tagged to Field successfully!", "success");
  };

  // --- SETTINGS EXPORT DATA ---
  const handleExportAllData = () => {
    const completeData = {
      user: currentUser,
      history: scanHistory,
      chat: chatMessages,
      fields,
      reminders,
      settings: {
        treatmentPreference,
        apiMode,
        notifPrefs
      }
    };
    const blob = new Blob([JSON.stringify(completeData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `angio_care_profile_${Date.now()}.json`;
    link.click();
    triggerToast("All user profile backup downloaded.", "success");
  };

  // --- ONBOARDING TOUR RENDER ---
  const renderOnboardingTour = () => {
    if (onboardingTourStep === null) return null;

    const tourSteps = [
      {
        title: "🌿 Plant Diagnostic Scan",
        text: "This is your scientific lab. Capture close-up Macro and Environment photos or upload images to trigger AI disease analysis.",
        selector: "#tour-scan",
        btnText: "Next Step"
      },
      {
        title: "📖 Pathological Encyclopedia",
        text: "Browse our clinical database containing 40+ common plant diseases, complete with symptoms and botanical treatments.",
        selector: "#tour-encyclopedia",
        btnText: "Next Step"
      },
      {
        title: "💬 Chat with Dr. Angio",
        text: "Have specific questions about dosages or disease containment? Click the chat bubble to talk to our resident plant AI pathologist.",
        selector: "#tour-doctor",
        btnText: "Next Step"
      },
      {
        title: "📋 Scan History Timeline",
        text: "Every diagnosis you run is securely recorded here. View expanded cards or delete past records.",
        selector: "#tour-history",
        btnText: "Next Step"
      },
      {
        title: "📊 Field Analytics",
        text: "Monitor distribution metrics, scan counts, and categorised infection rates over time.",
        selector: "#tour-analytics",
        btnText: "Finish Tour"
      }
    ];

    const currentStepData = tourSteps[onboardingTourStep];

    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <div className="card-glass" style={{ padding: '2rem', maxWidth: '400px', width: '100%', border: '2px solid var(--accent-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-color)' }}>
              LAB WALKTHROUGH ({onboardingTourStep + 1}/5)
            </span>
            <button onClick={endTour} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <X size={18} />
            </button>
          </div>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{currentStepData.title}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{currentStepData.text}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <button className="btn-secondary" onClick={endTour} style={{ flex: 1, padding: '0.5rem' }}>Skip Tour</button>
            <button className="btn-primary" onClick={onboardingTourStep === 4 ? endTour : nextTourStep} style={{ flex: 1, padding: '0.5rem' }}>
              {currentStepData.btnText}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- RENDER SPLASH SCREEN ---
  if (isSplashing) {
    return (
      <div style={{
        backgroundColor: '#0A1A0F',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.5s ease'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Sprout size={72} color="#52E896" style={{ marginBottom: '1.5rem', animation: 'pulse-soft 2s infinite' }} />
          <h1 style={{
            fontSize: '3rem',
            fontFamily: 'var(--font-display)',
            color: '#F0EAD6',
            letterSpacing: '2px',
            marginBottom: '0.5rem'
          }}>Angio-Care</h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#8FA896',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontWeight: '300'
          }}>"Diagnose. Treat. Revive."</p>
        </div>
      </div>
    );
  }

  // --- RENDER AUTH SCREEN ---
  if (!currentUser) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(17, 29, 20, 0.4) 0%, rgba(10, 26, 15, 1) 90%)'
      }}>
        {/* Toast list */}
        <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 10000, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {toasts.map(t => (
            <div key={t.id} className="toast-item card-glass" style={{
              padding: '0.75rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              borderLeft: `4px solid ${t.type === 'error' ? 'var(--danger-color)' : t.type === 'warning' ? 'var(--warning-color)' : 'var(--accent-color)'}`,
              backgroundColor: 'var(--surface-color)'
            }}>
              {t.type === 'error' ? <AlertTriangle size={16} color="var(--danger-color)" /> : <Info size={16} color="var(--accent-color)" />}
              <span style={{ fontSize: '0.875rem' }}>{t.message}</span>
            </div>
          ))}
        </div>

        <div className="card-glass" style={{ maxWidth: '440px', width: '100%', padding: '2.5rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', padding: '0.75rem', borderRadius: '50%', backgroundColor: 'rgba(82,232,150,0.06)', marginBottom: '1rem' }}>
              <Sprout size={36} color="var(--accent-color)" />
            </div>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '0.25rem' }}>Angio-Care</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>AI-Powered Plant & Tree Disease Diagnostics</p>
          </div>

          <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
            <button
              onClick={() => setAuthTab('login')}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: 'none',
                border: 'none',
                color: authTab === 'login' ? 'var(--accent-color)' : 'var(--text-muted)',
                fontWeight: authTab === 'login' ? '600' : '400',
                borderBottom: authTab === 'login' ? '2px solid var(--accent-color)' : 'none',
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthTab('register')}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: 'none',
                border: 'none',
                color: authTab === 'register' ? 'var(--accent-color)' : 'var(--text-muted)',
                fontWeight: authTab === 'register' ? '600' : '400',
                borderBottom: authTab === 'register' ? '2px solid var(--accent-color)' : 'none',
                cursor: 'pointer'
              }}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {authTab === 'register' && (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>FULL NAME</label>
                  <input
                    type="text"
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="Agronomist John"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                  {authErrors.name && <span style={{ color: 'var(--danger-color)', fontSize: '0.75rem' }}>{authErrors.name}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>ORGANIZATIONAL ROLE</label>
                  <select
                    value={authRole}
                    onChange={(e) => setAuthRole(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                  >
                    <option>Farmer</option>
                    <option>Botanist</option>
                    <option>Gardener</option>
                    <option>Researcher</option>
                    <option>Agricultural Officer</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>GEOGRAPHIC LOCATION</label>
                  <input
                    type="text"
                    required
                    value={authLocation}
                    onChange={(e) => setAuthLocation(e.target.value)}
                    placeholder="e.g. Maharashtra, India"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                  {authErrors.location && <span style={{ color: 'var(--danger-color)', fontSize: '0.75rem' }}>{authErrors.location}</span>}
                </div>
              </>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>EMAIL ADDRESS</label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="doctor@angiocare.org"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
              />
              {authErrors.email && <span style={{ color: 'var(--danger-color)', fontSize: '0.75rem' }}>{authErrors.email}</span>}
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>PASSWORD</label>
                {authTab === 'login' && (
                  <button
                    type="button"
                    onClick={() => triggerToast("Password reset link sent to your registered email!", "info")}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-color)', fontSize: '0.75rem', cursor: 'pointer' }}
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="******"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none', paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {authErrors.password && <span style={{ color: 'var(--danger-color)', fontSize: '0.75rem' }}>{authErrors.password}</span>}
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.85rem' }}>
              {authTab === 'login' ? "Access Laboratory" : "Register Credentials"}
            </button>
          </form>

          {authTab === 'login' && (
            <div style={{ marginTop: '1.5rem', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-light)', textAlign: 'center' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Predefined Credentials:
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>
                admin123@gmail.com / 1234
              </p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem', borderTop: '1px dashed var(--border-color)', paddingTop: '0.5rem' }}>
                Format rule: email (alphabets)numbers@gmail.com | password (numbers only, min 4 digits)
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }



  // --- RENDER MAIN LAYOUT ---
  return (
    <div className="app-grid">
      {/* Offline Mode Alert banner */}
      {!isOnline && (
        <div style={{
          gridColumn: '1 / -1',
          backgroundColor: 'var(--danger-color)',
          color: '#FFFFFF',
          padding: '0.5rem',
          textAlign: 'center',
          fontWeight: '600',
          fontSize: '0.85rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <AlertTriangle size={16} /> Offline Mode Active. You are viewing cached local results.
        </div>
      )}

      {/* Global Toasts list */}
      <div style={{ position: 'fixed', top: '4.5rem', right: '1.5rem', zIndex: 10000, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {toasts.map(t => (
          <div key={t.id} className="toast-item card-glass" style={{
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            borderLeft: `4px solid ${t.type === 'error' ? 'var(--danger-color)' : t.type === 'warning' ? 'var(--warning-color)' : 'var(--accent-color)'}`,
            backgroundColor: 'var(--surface-color)'
          }}>
            {t.type === 'error' ? <AlertTriangle size={16} color="var(--danger-color)" /> : <Info size={16} color="var(--accent-color)" />}
            <span style={{ fontSize: '0.875rem' }}>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Sidebar Navigation */}
      <aside style={{
        backgroundColor: 'var(--surface-color)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem 1rem',
        transform: sidebarCollapsed ? 'width 60px' : 'width 240px',
        transition: 'width var(--transition-normal)',
        position: 'relative'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
            <Sprout color="var(--accent-color)" size={32} />
            {!sidebarCollapsed && <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)' }}>Angio-Care</h2>}
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('dashboard')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.75rem', border: 'none', background: 'none', cursor: 'pointer',
                borderRadius: '8px', color: activeTab === 'dashboard' ? 'var(--accent-color)' : 'var(--text-muted)',
                backgroundColor: activeTab === 'dashboard' ? 'rgba(82,232,150,0.05)' : 'transparent',
                fontWeight: activeTab === 'dashboard' ? '600' : '400',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start'
              }}
            >
              <Activity size={20} />
              {!sidebarCollapsed && <span>Dashboard</span>}
            </button>

            <button
              id="tour-scan"
              onClick={() => setActiveTab('scan')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.75rem', border: 'none', background: 'none', cursor: 'pointer',
                borderRadius: '8px', color: activeTab === 'scan' ? 'var(--accent-color)' : 'var(--text-muted)',
                backgroundColor: activeTab === 'scan' ? 'rgba(82,232,150,0.05)' : 'transparent',
                fontWeight: activeTab === 'scan' ? '600' : '400',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start'
              }}
            >
              <Camera size={20} />
              {!sidebarCollapsed && <span>Diagnostic Scan</span>}
            </button>

            <button
              id="tour-encyclopedia"
              onClick={() => setActiveTab('encyclopedia')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.75rem', border: 'none', background: 'none', cursor: 'pointer',
                borderRadius: '8px', color: activeTab === 'encyclopedia' ? 'var(--accent-color)' : 'var(--text-muted)',
                backgroundColor: activeTab === 'encyclopedia' ? 'rgba(82,232,150,0.05)' : 'transparent',
                fontWeight: activeTab === 'encyclopedia' ? '600' : '400',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start'
              }}
            >
              <BookOpen size={20} />
              {!sidebarCollapsed && <span>Encyclopedia</span>}
            </button>

            <button
              id="tour-history"
              onClick={() => setActiveTab('history')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.75rem', border: 'none', background: 'none', cursor: 'pointer',
                borderRadius: '8px', color: activeTab === 'history' ? 'var(--accent-color)' : 'var(--text-muted)',
                backgroundColor: activeTab === 'history' ? 'rgba(82,232,150,0.05)' : 'transparent',
                fontWeight: activeTab === 'history' ? '600' : '400',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start'
              }}
            >
              <History size={20} />
              {!sidebarCollapsed && <span>Scan History</span>}
            </button>

            <button
              id="tour-analytics"
              onClick={() => setActiveTab('analytics')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.75rem', border: 'none', background: 'none', cursor: 'pointer',
                borderRadius: '8px', color: activeTab === 'analytics' ? 'var(--accent-color)' : 'var(--text-muted)',
                backgroundColor: activeTab === 'analytics' ? 'rgba(82,232,150,0.05)' : 'transparent',
                fontWeight: activeTab === 'analytics' ? '600' : '400',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start'
              }}
            >
              <BarChart2 size={20} />
              {!sidebarCollapsed && <span>Analytics</span>}
            </button>

            <button
              onClick={() => setActiveTab('fields')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.75rem', border: 'none', background: 'none', cursor: 'pointer',
                borderRadius: '8px', color: activeTab === 'fields' ? 'var(--accent-color)' : 'var(--text-muted)',
                backgroundColor: activeTab === 'fields' ? 'rgba(82,232,150,0.05)' : 'transparent',
                fontWeight: activeTab === 'fields' ? '600' : '400',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start'
              }}
            >
              <Map size={20} />
              {!sidebarCollapsed && <span>My Fields</span>}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.75rem', border: 'none', background: 'none', cursor: 'pointer',
                borderRadius: '8px', color: activeTab === 'settings' ? 'var(--accent-color)' : 'var(--text-muted)',
                backgroundColor: activeTab === 'settings' ? 'rgba(82,232,150,0.05)' : 'transparent',
                fontWeight: activeTab === 'settings' ? '600' : '400',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start'
              }}
            >
              <Settings size={20} />
              {!sidebarCollapsed && <span>Settings</span>}
            </button>
          </nav>
        </div>

        {/* Collapsible toggle & avatar summary */}
        <div>
          {!sidebarCollapsed && currentUser && (
            <div className="card-glass" style={{ padding: '0.75rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F0EAD6', fontWeight: 'bold' }}>
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: '600', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{currentUser.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{currentUser.role}</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{
              width: '100%', padding: '0.5rem', background: 'none', border: '1px solid var(--border-color)', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '6px'
            }}
          >
            {sidebarCollapsed ? ">>" : "<< Collapse"}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100vh', overflowY: 'auto' }}>
        {/* Top Navbar */}
        <header style={{
          height: '64px',
          backgroundColor: 'var(--surface-color)',
          borderBottom: '1px solid var(--border-color)',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)' }}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Panel
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Streak Gamification Card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', backgroundColor: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', padding: '0.35rem 0.75rem', borderRadius: '20px' }}>
              <Flame size={16} color="var(--warning-color)" fill="var(--warning-color)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--warning-color)', fontFamily: 'var(--font-mono)' }}>{currentUser.streakDays} Day Streak</span>
            </div>

            {/* Notification bell dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => { setShowNotifMenu(!showNotifMenu); setShowUserMenu(false); }}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', position: 'relative', padding: '0.25rem' }}
              >
                <Bell size={20} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span style={{
                    position: 'absolute', top: 0, right: 0, backgroundColor: 'var(--danger-color)', color: '#fff', fontSize: '0.65rem',
                    fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div className="card-glass" style={{
                  position: 'absolute', top: '2.5rem', right: 0, width: '300px', padding: '1rem', zIndex: 100,
                  maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '0.9rem' }}>Notifications</h4>
                    <button
                      onClick={() => {
                        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                        triggerToast("All notifications marked as read.", "info");
                      }}
                      style={{ background: 'none', border: 'none', color: 'var(--accent-color)', fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      Mark all read
                    </button>
                  </div>
                  {notifications.length === 0 ? (
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>No notifications</p>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} style={{ fontSize: '0.8rem', padding: '0.5rem', borderRadius: '6px', backgroundColor: n.read ? 'transparent' : 'rgba(82,232,150,0.03)', borderLeft: n.read ? 'none' : '3px solid var(--accent-color)' }}>
                        <p style={{ color: 'var(--text-primary)' }}>{n.text}</p>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{n.time}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Profile Menu Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifMenu(false); }}
                style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--border-color)', backgroundColor: 'var(--primary-color)', color: '#F0EAD6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 'bold' }}
              >
                {currentUser.name.charAt(0).toUpperCase()}
              </button>

              {showUserMenu && (
                <div className="card-glass" style={{
                  position: 'absolute', top: '2.5rem', right: 0, width: '220px', padding: '1rem', zIndex: 100,
                  display: 'flex', flexDirection: 'column', gap: '0.5rem'
                }}>
                  <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: '600' }}>{currentUser.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{currentUser.email}</p>
                  </div>
                  <button onClick={() => { setActiveTab('settings'); setShowUserMenu(false); }} className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start', padding: '0.5rem' }}>
                    <User size={14} /> Profile & Settings
                  </button>
                  <button onClick={handleLogout} className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start', padding: '0.5rem', color: 'var(--danger-color)', borderColor: 'rgba(224,82,82,0.2)' }}>
                    <LogOut size={14} /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Inner Page Content */}
        <div style={{ flex: 1, padding: '2rem' }}>
          
          {/* 1. DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Profile Card Header / Welcome Banner */}
              <div className="card-glass" style={{ padding: '2.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', backgroundImage: 'linear-gradient(135deg, var(--surface-color) 0%, rgba(45,106,79,0.06) 100%)' }}>
                <div>
                  <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Good morning, {currentUser.name} 🌿</h2>
                  <p style={{ color: 'var(--text-muted)' }}>The agricultural lab is online. Ready to evaluate crops, weeds, or diagnostic samples.</p>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-color)', fontFamily: 'var(--font-mono)' }}>{scanHistory.length}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Total Scans</p>
                  </div>
                  <div style={{ borderLeft: '1px solid var(--border-color)' }}></div>
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.8rem', color: 'var(--warning-color)', fontFamily: 'var(--font-mono)' }}>{totalDiseasesDetectedCount}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Diseases Solved</p>
                  </div>
                  <div style={{ borderLeft: '1px solid var(--border-color)' }}></div>
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-color)', fontFamily: 'var(--font-mono)' }}>{fields.length}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Fields Tracked</p>
                  </div>
                </div>
              </div>

              {/* Quick Scan CTA & Daily Tip & Weather */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                
                {/* Scan CTA Card */}
                <div className="card-glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '4px solid var(--accent-color)' }}>
                  <div>
                    <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Diagnostic Engine</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                      Run immediate analysis on infected plant leaves, crop stems, or roots. Upload images or run live macro capture.
                    </p>
                  </div>
                  <button onClick={() => setActiveTab('scan')} className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                    Initialize New Scan <ArrowRight size={16} />
                  </button>
                </div>

                {/* Daily Tip Card */}
                <div className="card-glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyBlock: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Award color="var(--warning-color)" size={24} />
                    <h3 style={{ fontSize: '1.4rem' }}>Tip of the Day</h3>
                  </div>
                  <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    "{TIPS_OF_THE_DAY[tipIndex]}"
                  </p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-color)', marginTop: '1rem', fontFamily: 'var(--font-mono)' }}>
                    - Dr. Angio, Plant Pathologist
                  </span>
                </div>

                {/* Weather Disease Risk Card */}
                <div className="card-glass" style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Seasonal Weather Risk</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    Current Season: <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Summer/Monsoons</span>
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>TEMP (°C)</label>
                      <input
                        type="number"
                        value={weatherTemp}
                        onChange={(e) => setWeatherTemp(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', textAlign: 'center' }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>HUMIDITY (%)</label>
                      <input
                        type="number"
                        value={weatherHumid}
                        onChange={(e) => setWeatherHumid(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', textAlign: 'center' }}
                      />
                    </div>
                  </div>
                  <button onClick={evaluateWeatherRisk} className="btn-secondary" style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}>
                    Evaluate Risk
                  </button>

                  {weatherRiskResult && (
                    <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.85rem' }}>Infection Risk:</span>
                        <span style={{
                          fontWeight: 'bold', fontSize: '0.85rem',
                          color: weatherRiskResult.status === 'High Risk' ? 'var(--danger-color)' : weatherRiskResult.status === 'Moderate' ? 'var(--warning-color)' : 'var(--accent-color)'
                        }}>{weatherRiskResult.status} ({weatherRiskResult.score}%)</span>
                      </div>
                      <div style={{ height: '6px', borderRadius: '3px', backgroundColor: 'var(--border-color)', overflow: 'hidden', marginBottom: '0.5rem' }}>
                        <div style={{
                          height: '100%', width: `${weatherRiskResult.score}%`,
                          backgroundColor: weatherRiskResult.status === 'High Risk' ? 'var(--danger-color)' : weatherRiskResult.status === 'Moderate' ? 'var(--warning-color)' : 'var(--accent-color)'
                        }}></div>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>High risk crops: {weatherRiskResult.diseases.join(', ')}</p>
                    </div>
                  )}
                </div>

              </div>

              {/* Recent History Preview & Field Tracker preview */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', flexWrap: 'wrap' }}>
                
                {/* Recent Scan History */}
                <div className="card-glass" style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Recent Lab Diagnoses</h3>
                  {scanHistory.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      <Info size={32} style={{ marginBottom: '0.5rem' }} />
                      <p>No recent crop scans detected. Complete a scan to populate history.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {scanHistory.slice(0, 3).map(s => (
                        <div key={s.id} style={{ display: 'flex', gap: '1rem', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-light)', alignItems: 'center' }}>
                          <img src={s.image} alt={s.plant_name} style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover' }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <h4 style={{ fontSize: '1rem' }}>{s.report.disease_name}</h4>
                              <span style={{
                                fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 'bold',
                                backgroundColor: s.report.severity === 'Critical' ? 'rgba(224,82,82,0.1)' : s.report.severity === 'Severe' ? 'rgba(245,166,35,0.1)' : 'rgba(82,232,150,0.1)',
                                color: s.report.severity === 'Critical' ? 'var(--danger-color)' : s.report.severity === 'Severe' ? 'var(--warning-color)' : 'var(--accent-color)'
                              }}>{s.report.severity}</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Plant: {s.plant_name} | Confidence: {s.report.confidence}%</p>
                          </div>
                          <button onClick={() => { setActiveReport(s); setActiveTab('scan'); }} className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
                            Report
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fields Summary */}
                <div className="card-glass" style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>My Fields Status</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {fields.map(f => (
                      <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <div>
                          <h4 style={{ fontSize: '0.9rem' }}>{f.name}</h4>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{f.plantType} | {f.scansCount} scans</span>
                        </div>
                        <span style={{
                          fontSize: '0.75rem', fontWeight: 'bold', padding: '0.2rem 0.5rem', borderRadius: '4px',
                          color: f.status === 'Healthy' ? 'var(--accent-color)' : f.status === 'At Risk' ? 'var(--warning-color)' : 'var(--danger-color)',
                          backgroundColor: f.status === 'Healthy' ? 'rgba(82,232,150,0.06)' : 'rgba(224,82,82,0.06)'
                        }}>{f.status}</span>
                      </div>
                    ))}
                    <button onClick={() => setActiveTab('fields')} className="btn-secondary" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}>
                      Manage Fields
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* 2. DIAGNOSTIC SCAN VIEW */}
          {activeTab === 'scan' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Specimen Validation Error Card */}
              {scanError && (
                <div className="card-glass" style={{ padding: '2.5rem 2rem', maxWidth: '600px', margin: '0 auto', width: '100%', border: '2px solid var(--danger-color)', textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', padding: '0.75rem', borderRadius: '50%', backgroundColor: 'rgba(224,82,82,0.06)', marginBottom: '1.25rem' }}>
                    <AlertTriangle size={36} color="var(--danger-color)" />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--danger-color)', marginBottom: '0.75rem' }}>Specimen Rejected</h2>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {scanError}
                  </p>
                  <button onClick={handleResetScan} className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                    Re-initialize Specimen Scan
                  </button>
                </div>
              )}

              {/* Scan Setup Panel */}
              {!activeReport && !isScanning && !scanError && (
                <div className="card-glass" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                  <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>Initialize Plant Diagnosis</h2>

                  {/* Plant Autocomplete */}
                  <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>SELECT HOST PLANT SPECIES</label>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={isUnknown}
                            onChange={(e) => {
                              setIsUnknown(e.target.checked);
                              if (e.target.checked) setPlantName('');
                            }}
                          /> Unknown Plant
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', cursor: 'pointer', color: 'var(--danger-color)' }}>
                          <input
                            type="checkbox"
                            checked={simulateInvalidSpecimen}
                            onChange={(e) => setSimulateInvalidSpecimen(e.target.checked)}
                          /> Simulate Invalid Specimen
                        </label>
                      </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        disabled={isUnknown}
                        value={plantName}
                        onChange={(e) => {
                          setPlantName(e.target.value);
                          setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder={isUnknown ? "Species will be identified by AI pathology" : "Start typing plant name (e.g. Rose, Tomato, Rice)"}
                        style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                      />
                      {showSuggestions && plantName.trim() && !isUnknown && (
                        <div className="card-glass" style={{
                          position: 'absolute', top: '100%', left: 0, right: 0, maxHeight: '200px', overflowY: 'auto', zIndex: 10,
                          backgroundColor: 'var(--surface-color)', padding: '0.5rem 0'
                        }}>
                          {PLANTS_LIST.filter(p => p.toLowerCase().includes(plantName.toLowerCase())).map(p => (
                            <div
                              key={p}
                              onClick={() => {
                                setPlantName(p);
                                setShowSuggestions(false);
                              }}
                              style={{ padding: '0.5rem 1rem', cursor: 'pointer', hover: 'background: var(--surface-light)' }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--surface-light)'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                              {p}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dual Camera capturing */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    
                    <div className="card-glass" style={{ padding: '1rem', textAlign: 'center', cursor: 'pointer' }} onClick={() => startCamera('front')}>
                      <Camera size={24} color="var(--accent-color)" style={{ marginBottom: '0.5rem' }} />
                      <h4 style={{ fontSize: '0.95rem' }}>🔍 Front Camera</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Macro spot / lesion details</p>
                      {frontCameraImage && (
                        <img src={frontCameraImage} alt="front" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '6px', marginTop: '0.5rem' }} />
                      )}
                    </div>

                    <div className="card-glass" style={{ padding: '1rem', textAlign: 'center', cursor: 'pointer' }} onClick={() => startCamera('rear')}>
                      <Camera size={24} color="var(--accent-color)" style={{ marginBottom: '0.5rem' }} />
                      <h4 style={{ fontSize: '0.95rem' }}>🌿 Rear Camera</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Environment canopy perspective</p>
                      {rearCameraImage && (
                        <img src={rearCameraImage} alt="rear" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '6px', marginTop: '0.5rem' }} />
                      )}
                    </div>

                  </div>

                  {/* Image Upload Zone */}
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                    style={{
                      border: '2px dashed var(--border-color)',
                      borderRadius: '12px',
                      padding: '2.5rem',
                      textAlign: 'center',
                      backgroundColor: 'rgba(82,232,150,0.01)',
                      marginBottom: '1.5rem',
                      transition: 'border-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                    onMouseLeave={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  >
                    <Upload size={36} color="var(--text-muted)" style={{ marginBottom: '0.75rem' }} />
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Drag and Drop specimen files</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Accepts JPG, PNG, WEBP (Max 10MB each, up to 3 specs)</p>
                    <label className="btn-secondary" style={{ cursor: 'pointer', padding: '0.5rem 1rem' }}>
                      Browse Files
                      <input type="file" multiple accept="image/*" onChange={handleFileSelect} style={{ display: 'none' }} />
                    </label>

                    {uploadedFiles.length > 0 && (
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1.5rem' }}>
                        {uploadedFiles.map((f, idx) => (
                          <div key={idx} style={{ position: 'relative', width: '80px', height: '80px' }}>
                            <img src={f} alt="uploaded specimen" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} />
                            <button
                              onClick={() => removeUploadedFile(idx)}
                              style={{
                                position: 'absolute', top: '-6px', right: '-6px', backgroundColor: 'var(--danger-color)',
                                border: 'none', borderRadius: '50%', color: '#fff', width: '18px', height: '18px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '0.65rem'
                              }}
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button onClick={runPlantAnalysis} className="btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                    Analyse Plant Specimen <Sprout size={16} />
                  </button>
                </div>
              )}

              {/* BioScan Ring Pulsing Scan state */}
              {isScanning && (
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                  <div className="scan-ring-container">
                    <div className="scan-ring-outer"></div>
                    <div className="scan-ring-inner"></div>
                    <div className="scan-pulse-circle"></div>
                    <div className="scan-line-sweep"></div>
                    <Sprout size={48} color="var(--accent-color)" />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', marginTop: '2.5rem', marginBottom: '0.5rem' }}>
                    Running Pathological Molecular Scan...
                  </h3>
                  <div style={{ width: '200px', height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', margin: '0 auto', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${scanProgress}%`, backgroundColor: 'var(--accent-color)', transition: 'width 0.3s' }}></div>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                    Sequencing target pixels... {scanProgress}%
                  </p>
                </div>
              )}

              {/* Complete Report Details */}
              {activeReport && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button onClick={handleResetScan} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                      <ArrowLeft size={16} /> New Scan
                    </button>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => {
                          const text = `Angio-Care Crop Report\nPlant: ${activeReport.plant_name}\nDisease: ${activeReport.report.disease_name} (${activeReport.report.disease_code})\nSeverity: ${activeReport.report.severity}\nConfidence: ${activeReport.report.confidence}%\nTreatment: ${activeReport.report.treatment_plan.immediate_actions.join(', ')}`;
                          navigator.clipboard.writeText(text);
                          triggerToast("Report summary copied to clipboard!", "success");
                        }}
                        className="btn-secondary" style={{ padding: '0.5rem' }}
                      >
                        <Share2 size={16} /> Share Report
                      </button>
                      <button onClick={() => setShowAgronomistModal(true)} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
                        <UserCheck size={16} /> Connect Agronomist
                      </button>
                    </div>
                  </div>

                  {/* Main Report Card layout */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                    
                    {/* Left Column Specimen & Stats */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div className="card-glass" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Specimen Visual</h3>
                        <img src={activeReport.image} alt="specimen" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1rem' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Date Analyzed:</span>
                          <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{activeReport.date} {activeReport.time}</span>
                        </div>
                      </div>

                      {/* Plant Health Score */}
                      <div className="card-glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Plant Health Score</h3>
                        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1rem' }}>
                          {/* Radial Progress Gauge */}
                          <svg width="120" height="120" viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border-color)" strokeWidth="8" />
                            <circle
                              cx="60" cy="60" r="50" fill="none"
                              stroke={activeReport.healthScore > 70 ? 'var(--accent-color)' : activeReport.healthScore > 40 ? 'var(--warning-color)' : 'var(--danger-color)'}
                              strokeWidth="8"
                              strokeDasharray={`${2 * Math.PI * 50}`}
                              strokeDashoffset={`${2 * Math.PI * 50 * (1 - activeReport.healthScore / 100)}`}
                              transform="rotate(-90 60 60)"
                              strokeLinecap="round"
                              style={{ transition: 'stroke-dashoffset 1s ease' }}
                            />
                          </svg>
                          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <span style={{ fontSize: '1.6rem', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>{Math.round(activeReport.healthScore)}</span>
                          </div>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {activeReport.healthScore > 70 ? "Healthy status with minor tissue infection." : activeReport.healthScore > 40 ? "Moderate disease stress. Treatment recommended." : "Severe pathological threat. Act immediately."}
                        </p>
                      </div>

                      {/* Field tagging & schedule reminders */}
                      <div className="card-glass" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Tag Specimen & Schedule Followup</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>TAG TO FIELD LOCATION</label>
                            <select
                              value={activeReport.field_id}
                              onChange={(e) => assignScanToField(activeReport.id, e.target.value)}
                              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)' }}
                            >
                              <option value="">Select Field</option>
                              {fields.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                            </select>
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>SCHEDULE FOLLOW-UP REMINDER</label>
                            <input
                              type="date"
                              value={newReminderDate}
                              onChange={(e) => setNewReminderDate(e.target.value)}
                              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', marginBottom: '0.5rem' }}
                            />
                            <input
                              type="text"
                              placeholder="e.g. Apply copper sulfate spray"
                              value={newReminderNote}
                              onChange={(e) => setNewReminderNote(e.target.value)}
                              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', marginBottom: '0.5rem' }}
                            />
                            <button onClick={handleAddReminder} className="btn-secondary" style={{ width: '100%', padding: '0.5rem' }}>
                              <Calendar size={14} /> Schedule Reminder
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Before / After Specimen comparison */}
                      <div className="card-glass" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Before & After Treatment Comparison</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                          <div style={{ border: '1px dashed var(--border-color)', borderRadius: '6px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                            {beforeImage ? (
                              <img src={beforeImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="before" />
                            ) : (
                              <label style={{ cursor: 'pointer', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                Before Photo
                                <input type="file" onChange={(e) => {
                                  const reader = new FileReader();
                                  reader.onload = () => setBeforeImage(reader.result);
                                  reader.readAsDataURL(e.target.files[0]);
                                }} style={{ display: 'none' }} />
                              </label>
                            )}
                          </div>
                          <div style={{ border: '1px dashed var(--border-color)', borderRadius: '6px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                            {afterImage ? (
                              <img src={afterImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="after" />
                            ) : (
                              <label style={{ cursor: 'pointer', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                After Photo
                                <input type="file" onChange={(e) => {
                                  const reader = new FileReader();
                                  reader.onload = () => setAfterImage(reader.result);
                                  reader.readAsDataURL(e.target.files[0]);
                                }} style={{ display: 'none' }} />
                              </label>
                            )}
                          </div>
                        </div>
                        <button onClick={handleBeforeAfterCompare} className="btn-secondary" style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} disabled={isComparing}>
                          {isComparing ? "Running comparative scans..." : "Compare specimen results"}
                        </button>
                        {comparisonResult && (
                          <div style={{ padding: '0.75rem', backgroundColor: 'var(--surface-light)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                            <p style={{ fontSize: '0.85rem', color: 'var(--accent-color)', fontWeight: 'bold', marginBottom: '0.25rem' }}>Improvement Rate: {comparisonResult.improvementPercentage}%</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{comparisonResult.notes}</p>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Right Column Full Pathology Report Details */}
                    <div className="card-glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        <div>
                          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>{activeReport.report.disease_name}</h2>
                          <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '0.5rem' }}>{activeReport.report.scientific_name}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-light)' }}>
                            {activeReport.report.disease_code}
                          </span>
                          <span style={{
                            fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 'bold',
                            backgroundColor: activeReport.report.severity === 'Critical' ? 'rgba(224,82,82,0.1)' : activeReport.report.severity === 'Severe' ? 'rgba(245,166,35,0.1)' : 'rgba(82,232,150,0.1)',
                            color: activeReport.report.severity === 'Critical' ? 'var(--danger-color)' : activeReport.report.severity === 'Severe' ? 'var(--warning-color)' : 'var(--accent-color)'
                          }}>{activeReport.report.severity} Severity</span>
                        </div>
                      </div>

                      {/* Chips row */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '20px', backgroundColor: 'var(--primary-color)', color: '#fff' }}>
                          Category: {activeReport.report.category}
                        </span>
                        {activeReport.report.affected_parts.map(p => (
                          <span key={p} style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '20px', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                            Part: {p}
                          </span>
                        ))}
                      </div>

                      <div>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>PATHOLOGY DESCRIPTION</h4>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{activeReport.report.disease_description}</p>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>PRIMARY CAUSE</h4>
                          <p style={{ fontSize: '0.9rem' }}>{activeReport.report.cause}</p>
                        </div>
                        <div>
                          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>SPREAD RISK</h4>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                            <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{
                                height: '100%',
                                width: activeReport.report.spread_risk === 'Very High' ? '100%' : activeReport.report.spread_risk === 'High' ? '75%' : activeReport.report.spread_risk === 'Medium' ? '50%' : '25%',
                                backgroundColor: activeReport.report.spread_risk === 'Very High' || activeReport.report.spread_risk === 'High' ? 'var(--danger-color)' : 'var(--accent-color)'
                              }}></div>
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{activeReport.report.spread_risk}</span>
                          </div>
                        </div>
                      </div>

                      {/* If Untreated red warning block */}
                      <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid rgba(224,82,82,0.3)', backgroundColor: 'rgba(224,82,82,0.03)', display: 'flex', gap: '0.75rem' }}>
                        <AlertTriangle size={20} color="var(--danger-color)" style={{ flexShrink: 0 }} />
                        <div>
                          <h4 style={{ fontSize: '0.85rem', color: 'var(--danger-color)', fontWeight: 'bold', marginBottom: '0.25rem' }}>IF UNTREATED PATHOLOGICAL RISK</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{activeReport.report.if_untreated}</p>
                        </div>
                      </div>

                      {/* Treatment Plan Accordion options */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h4 style={{ fontSize: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Clinical Treatment Protocols</h4>

                        {/* Immediate Actions */}
                        <div>
                          <h5 style={{ fontSize: '0.9rem', color: 'var(--accent-color)', marginBottom: '0.5rem' }}>Immediate Corrective Actions</h5>
                          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {activeReport.report.treatment_plan.immediate_actions.map((act, i) => <li key={i}>{act}</li>)}
                          </ul>
                        </div>

                        {/* Chemical Treatments (Cards) */}
                        {activeReport.report.treatment_plan.chemical_treatments.length > 0 && (
                          <div>
                            <h5 style={{ fontSize: '0.9rem', color: 'var(--warning-color)', marginBottom: '0.5rem' }}>Chemical Treatments (High Urgency)</h5>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                              {activeReport.report.treatment_plan.chemical_treatments.map((chem, i) => (
                                <div key={i} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-light)' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>{chem.chemical_name}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--warning-color)', fontFamily: 'var(--font-mono)' }}>{chem.approximate_cost}</span>
                                  </div>
                                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Active: {chem.active_ingredient} | Dosage: {chem.dosage}</p>
                                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Method: {chem.application_method} | Frequency: {chem.frequency}</p>
                                  <div style={{ borderTop: '1px dashed var(--border-color)', marginTop: '0.5rem', paddingTop: '0.25rem', display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                                    <Info size={12} color="var(--warning-color)" />
                                    <span style={{ fontSize: '0.7rem', color: 'var(--warning-color)' }}>{chem.safety_precautions}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Organic Alternatives */}
                        <div>
                          <h5 style={{ fontSize: '0.9rem', color: 'var(--accent-color)', marginBottom: '0.5rem' }}>Organic Alternatives (Eco-Friendly)</h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {activeReport.report.treatment_plan.organic_alternatives.map((org, i) => (
                              <div key={i} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(82,232,150,0.2)', backgroundColor: 'rgba(82,232,150,0.02)' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>{org.remedy}</span>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Preparation: {org.preparation}</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Application: {org.application}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Preventive Measures */}
                        <div>
                          <h5 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Long-Term Prevention</h5>
                          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {activeReport.report.treatment_plan.preventive_measures.map((prev, i) => <li key={i}>{prev}</li>)}
                          </ul>
                        </div>

                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                        <div>
                          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>RECOVERY TIMELINE</h4>
                          <p style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>{activeReport.report.recovery_timeline}</p>
                        </div>
                        <div>
                          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>SEASONAL INCIDENCE</h4>
                          <p style={{ fontSize: '0.9rem' }}>{activeReport.report.seasonal_risk}</p>
                        </div>
                      </div>

                      {/* Expert Tip */}
                      <div style={{ borderLeft: '3px solid var(--accent-color)', paddingLeft: '0.75rem', fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <strong>Pathologist Tip:</strong> "{activeReport.report.expert_tip}"
                      </div>

                      {/* Similar diseases */}
                      <div>
                        <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>SIMILAR COMPLICATIONS</h4>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {activeReport.report.similar_diseases.map(d => (
                            <button
                              key={d}
                              onClick={() => {
                                const matched = ENCYCLOPEDIA_DATABASE.find(item => item.name.toLowerCase().includes(d.toLowerCase()));
                                if (matched) {
                                  setSelectedEncyclopediaDisease(getExtendedDiseaseReport(matched, activeReport.plant_name));
                                } else {
                                  triggerToast("Complication detail is only available in the full Encyclopedia.", "info");
                                }
                              }}
                              style={{ background: 'none', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.25rem 0.5rem', fontSize: '0.75rem', cursor: 'pointer', color: 'var(--accent-color)' }}
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* 3. ENCYCLOPEDIA VIEW */}
          {activeTab === 'encyclopedia' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <p style={{ color: 'var(--text-muted)' }}>Search and review clinical details of 40+ common plant diseases across all classifications.</p>

              {/* Search and Categories bar */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
                  <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    value={encSearch}
                    onChange={(e) => setEncSearch(e.target.value)}
                    placeholder="Search by disease name, scientific name or code..."
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {["All", "Fungal", "Bacterial", "Viral", "Nematodal", "Pest", "Nutritional Deficiency"].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setEncCategory(cat)}
                      style={{
                        padding: '0.5rem 1rem', border: '1px solid var(--border-color)', borderRadius: '20px', cursor: 'pointer',
                        backgroundColor: encCategory === cat ? 'var(--accent-color)' : 'transparent',
                        color: encCategory === cat ? '#0A1A0F' : 'var(--text-muted)',
                        fontWeight: encCategory === cat ? '600' : '400',
                        fontSize: '0.8rem'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Encyclopedia Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {ENCYCLOPEDIA_DATABASE.filter(d => {
                  const matchSearch = d.name.toLowerCase().includes(encSearch.toLowerCase()) ||
                                      d.scientific_name.toLowerCase().includes(encSearch.toLowerCase()) ||
                                      d.id.toLowerCase().includes(encSearch.toLowerCase());
                  const matchCat = encCategory === 'All' || d.category === encCategory;
                  return matchSearch && matchCat;
                }).map(d => (
                  <div
                    key={d.id}
                    className="card-glass"
                    onClick={() => setSelectedEncyclopediaDisease(getExtendedDiseaseReport(d, "Host Plant"))}
                    style={{ padding: '1.5rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '180px' }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{d.id}</span>
                        <span style={{
                          fontSize: '0.7rem', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 'bold',
                          backgroundColor: d.severity === 'Critical' ? 'rgba(224,82,82,0.1)' : d.severity === 'Severe' ? 'rgba(245,166,35,0.1)' : 'rgba(82,232,150,0.1)',
                          color: d.severity === 'Critical' ? 'var(--danger-color)' : d.severity === 'Severe' ? 'var(--warning-color)' : 'var(--accent-color)'
                        }}>{d.severity}</span>
                      </div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{d.name}</h3>
                      <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{d.scientific_name}</p>
                    </div>
                    <span style={{ alignSelf: 'flex-start', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--surface-light)', color: 'var(--accent-color)', border: '1px solid var(--border-color)' }}>
                      {d.category}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* 4. SCAN HISTORY VIEW */}
          {activeTab === 'history' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <p style={{ color: 'var(--text-muted)' }}>Timeline and records of all specimen analyses run under this user account.</p>

              {/* History Search and Filters */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                  <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    placeholder="Search past scans by plant or disease name..."
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select
                    value={historyTimeFilter}
                    onChange={(e) => setHistoryTimeFilter(e.target.value)}
                    style={{ padding: '0.6rem', borderRadius: '8px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                  >
                    <option value="all">All Dates</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>

                  <select
                    value={historyPlantFilter}
                    onChange={(e) => setHistoryPlantFilter(e.target.value)}
                    style={{ padding: '0.6rem', borderRadius: '8px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                  >
                    <option value="all">All Plants</option>
                    {Array.from(new Set(scanHistory.filter(s => s && s.plant_name).map(s => s.plant_name))).map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* History timeline feed */}
              {scanHistory.length === 0 ? (
                <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <Info size={48} style={{ marginBottom: '1rem' }} />
                  <h3>No crop diagnostics found.</h3>
                  <button onClick={() => setActiveTab('scan')} className="btn-primary" style={{ marginTop: '1rem' }}>Run First Scan</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {scanHistory.filter(s => {
                    if (!s || !s.plant_name || !s.report) return false;
                    const matchSearch = s.plant_name.toLowerCase().includes(historySearch.toLowerCase()) || (s.report.disease_name && s.report.disease_name.toLowerCase().includes(historySearch.toLowerCase()));
                    const matchPlant = historyPlantFilter === 'all' || s.plant_name === historyPlantFilter;
                    // Mock date filter
                    const matchTime = historyTimeFilter === 'all' ? true : true; // Keep true for mock purposes
                    return matchSearch && matchPlant && matchTime;
                  }).map(s => (
                    <div key={s.id} className="card-glass" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <img src={s.image} alt={s.plant_name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                      <div style={{ flex: 1, minWidth: '240px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                          <div>
                            <h3 style={{ fontSize: '1.4rem' }}>{s.report.disease_name}</h3>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Specimen: {s.plant_name} ({s.report.disease_code})</span>
                          </div>
                          <span style={{
                            fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 'bold',
                            backgroundColor: s.report.severity === 'Critical' ? 'rgba(224,82,82,0.1)' : s.report.severity === 'Severe' ? 'rgba(245,166,35,0.1)' : 'rgba(82,232,150,0.1)',
                            color: s.report.severity === 'Critical' ? 'var(--danger-color)' : s.report.severity === 'Severe' ? 'var(--warning-color)' : 'var(--accent-color)'
                          }}>{s.report.severity}</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                          Diagnostic Confidence: <strong>{s.report.confidence}%</strong> | Health Score: <strong>{Math.round(s.healthScore)}%</strong>
                        </p>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Date: {s.date} {s.time}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', smWidth: 'auto' }}>
                        <button onClick={() => { setActiveReport(s); setActiveTab('scan'); }} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                          View Report
                        </button>
                        <button
                          onClick={() => {
                            setScanHistory(prev => prev.filter(item => item.id !== s.id));
                            triggerToast("Scan removed from history.", "info");
                          }}
                          className="btn-secondary" style={{ padding: '0.5rem', fontSize: '0.8rem', color: 'var(--danger-color)', borderColor: 'rgba(224,82,82,0.2)' }}
                        >
                          Delete Scan
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* 5. ANALYTICS VIEW */}
          {activeTab === 'analytics' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <p style={{ color: 'var(--text-muted)' }}>Review agricultural analytics, infection rates, plant types, and diagnostic timelines.</p>

              {/* Highlight Dashboard cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                <div className="card-glass" style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>COMMON INFECTION</h4>
                  <h3 style={{ fontSize: '1.6rem', color: 'var(--warning-color)' }}>{mostCommonDiseaseDetected}</h3>
                </div>
                <div className="card-glass" style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>CRITICAL specimen RISKS</h4>
                  <h3 style={{ fontSize: '1.6rem', color: 'var(--danger-color)' }}>
                    {scanHistory.filter(s => s.report.severity === 'Critical').length} Samples
                  </h3>
                </div>
                <div className="card-glass" style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>MEDIAN CONFIDENCE RATE</h4>
                  <h3 style={{ fontSize: '1.6rem', color: 'var(--accent-color)' }}>
                    {scanHistory.length > 0 ? `${Math.round(scanHistory.reduce((acc, s) => acc + s.report.confidence, 0) / scanHistory.length)}%` : "N/A"}
                  </h3>
                </div>
              </div>

              {/* Chart grids */}
              {scanHistory.length === 0 ? (
                <div className="card-glass" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <Info size={48} style={{ marginBottom: '1rem', margin: '0 auto' }} />
                  <h3>No analytical data available.</h3>
                  <p>Complete crop scans to populate graphical analytics.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                  
                  {/* Category Breakdown (Pie) */}
                  <div className="card-glass" style={{ padding: '2rem', minHeight: '340px' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Infection Category Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={diseaseCategoriesData}
                          cx="50%" cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {diseaseCategoriesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={["#2D6A4F", "#52E896", "#F5A623", "#E05252", "#1E3024"][index % 5]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Scans Timeline (Line) */}
                  <div className="card-glass" style={{ padding: '2rem', minHeight: '340px' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Lab Activity Timeline</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={scanActivityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                        <XAxis dataKey="date" stroke="var(--text-muted)" />
                        <YAxis stroke="var(--text-muted)" />
                        <Tooltip contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)' }} />
                        <Line type="monotone" dataKey="Scans" stroke="var(--accent-color)" strokeWidth={2} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Plant counts (Bar) */}
                  <div className="card-glass" style={{ padding: '2rem', minHeight: '340px', gridColumn: '1 / -1' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Top Scanned Crop Species</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={plantTypesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                        <XAxis dataKey="plant" stroke="var(--text-muted)" />
                        <YAxis stroke="var(--text-muted)" />
                        <Tooltip contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)' }} />
                        <Bar dataKey="Count" fill="var(--primary-color)" radius={[4, 4, 0, 0]}>
                          {plantTypesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--accent-color)' : 'var(--primary-color)'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* 6. MY FIELDS VIEW */}
          {activeTab === 'fields' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <p style={{ color: 'var(--text-muted)' }}>Tag scans to fields and monitor spatial crop health over your agricultural zone.</p>

              {/* Add Field Form */}
              <form onSubmit={handleAddField} className="card-glass" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap', maxWidth: '600px' }}>
                <div style={{ flex: 2, minWidth: '180px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>FIELD NAME</label>
                  <input
                    type="text"
                    required
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                    placeholder="e.g. South Orchard"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: '120px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>PLANT TYPE</label>
                  <select
                    value={newFieldPlant}
                    onChange={(e) => setNewFieldPlant(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)' }}
                  >
                    {PLANTS_LIST.slice(0, 15).map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
                  <Plus size={16} /> Add Field
                </button>
              </form>

              {/* Fields Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {fields.map(f => {
                  const fieldScans = scanHistory.filter(s => s.field_id === f.id);
                  return (
                    <div key={f.id} className="card-glass" style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1.25rem' }}>{f.name}</h3>
                        <span style={{
                          fontSize: '0.75rem', fontWeight: 'bold', padding: '0.2rem 0.5rem', borderRadius: '4px',
                          color: f.status === 'Healthy' ? 'var(--accent-color)' : f.status === 'At Risk' ? 'var(--warning-color)' : 'var(--danger-color)',
                          backgroundColor: f.status === 'Healthy' ? 'rgba(82,232,150,0.06)' : 'rgba(224,82,82,0.06)'
                        }}>{f.status}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Plant cultivation: <strong>{f.plantType}</strong></p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Scanned Specimens: <strong>{fieldScans.length}</strong></p>
                      <button
                        onClick={() => {
                          setFields(prev => prev.filter(item => item.id !== f.id));
                          triggerToast("Field removed.", "info");
                        }}
                        className="btn-secondary" style={{ width: '100%', padding: '0.4rem', color: 'var(--danger-color)', borderColor: 'rgba(224,82,82,0.2)', fontSize: '0.8rem' }}
                      >
                        Delete Field Record
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* 7. SETTINGS VIEW */}
          {activeTab === 'settings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px' }}>
              
              {/* Theme Settings */}
              <div className="card-glass" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Appearance Settings</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Theme Light / Dark Mode</span>
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="btn-secondary" style={{ padding: '0.5rem' }}
                  >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                </div>
              </div>

              {/* Treatment Type preference */}
              <div className="card-glass" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Treatment Protocols</h3>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>PREFERRED TREATMENT SOURCE</label>
                <select
                  value={treatmentPreference}
                  onChange={(e) => {
                    setTreatmentPreference(e.target.value);
                    localStorage.setItem('ac_treatment_pref', e.target.value);
                    triggerToast(`Preference set to ${e.target.value}`, "success");
                  }}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)' }}
                >
                  <option>Chemical</option>
                  <option>Organic</option>
                  <option>Both</option>
                </select>
              </div>

              {/* Anthropic Claude API Configuration */}
              <div className="card-glass" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem' }}>Claude API Integration</h3>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <button
                      type="button"
                      onClick={() => {
                        const newMode = apiMode === 'mock' ? 'live' : 'mock';
                        setApiMode(newMode);
                        localStorage.setItem('ac_api_mode', newMode);
                        triggerToast(`API Engine set to ${newMode.toUpperCase()} Mode`, "info");
                      }}
                      style={{
                        padding: '0.25rem 0.75rem', borderRadius: '20px', border: '1px solid var(--border-color)', fontSize: '0.75rem', cursor: 'pointer',
                        backgroundColor: apiMode === 'live' ? 'var(--accent-color)' : 'var(--surface-light)',
                        color: apiMode === 'live' ? '#0A1A0F' : 'var(--text-muted)'
                      }}
                    >
                      {apiMode === 'live' ? "LIVE API ACTIVE" : "MOCK ENGINE ACTIVE"}
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.4' }}>
                  By default, Angio-Care runs on a high-fidelity mock pathology model for evaluation. Enter an Anthropic API Key and Proxy URL below to request real-time diagnoses from Claude 3.5 Sonnet.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>ANTHROPIC API KEY</label>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => {
                        setApiKey(e.target.value);
                        localStorage.setItem('ac_api_key', e.target.value);
                      }}
                      placeholder="sk-ant-..."
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>CUSTOM CORS PROXY URL (OPTIONAL)</label>
                    <input
                      type="text"
                      value={proxyUrl}
                      onChange={(e) => {
                        setProxyUrl(e.target.value);
                        localStorage.setItem('ac_proxy_url', e.target.value);
                      }}
                      placeholder="https://your-cors-proxy.workers.dev"
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                    />
                  </div>
                </div>
              </div>

              {/* Data Export & Backup */}
              <div className="card-glass" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Data Backup & Export</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Export your complete history, registered fields, and local database as a JSON record.</p>
                <button onClick={handleExportAllData} className="btn-secondary" style={{ width: '100%' }}>
                  Download JSON Profile Backup
                </button>
              </div>

              {/* Danger Zone */}
              <div className="card-glass" style={{ padding: '1.5rem', border: '1px solid rgba(224,82,82,0.3)', backgroundColor: 'rgba(224,82,82,0.01)' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--danger-color)', marginBottom: '0.5rem' }}>Danger Zone</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Permanently erase this account and all saved diagnostic records.</p>
                <button onClick={() => setShowDeleteAccountConfirm(true)} className="btn-secondary" style={{ width: '100%', color: 'var(--danger-color)', borderColor: 'rgba(224,82,82,0.3)' }}>
                  Erase Account & Database
                </button>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* Camera Capture Modal */}
      {cameraModalType && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: '#000000e0', zIndex: 1000,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div style={{ maxWidth: '640px', width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Live Specimen Capture - {cameraModalType === 'front' ? 'Macro' : 'Canopy'}</h3>
              <button onClick={stopCamera} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <div style={{ position: 'relative', width: '100%', height: '400px', backgroundColor: '#111', borderRadius: '8px', overflow: 'hidden' }}>
              <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button onClick={capturePhoto} className="btn-primary" style={{ padding: '0.75rem 2rem', borderRadius: '50px' }}>
                <Camera size={20} /> Capture SPECIMEN
              </button>
              <button onClick={stopCamera} className="btn-secondary" style={{ padding: '0.75rem 2rem', borderRadius: '50px', color: '#fff' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Bubble & Chat Panel */}
      <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 1000 }}>
        <button
          id="tour-doctor"
          onClick={() => setChatOpen(!chatOpen)}
          style={{
            width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--accent-color)',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(82,232,150,0.3)', color: '#0A1A0F'
          }}
        >
          <MessageSquare size={24} />
        </button>

        {chatOpen && (
          <div className="card-glass" style={{
            position: 'absolute', bottom: '4.5rem', right: 0, width: '360px', height: '480px',
            padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            backgroundColor: 'var(--surface-color)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sprout color="var(--accent-color)" size={20} />
                <div>
                  <h4 style={{ fontSize: '0.95rem' }}>Dr. Angio</h4>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>AI Pathologist Consultant</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={exportChatHistory} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} title="Export chat"><Copy size={16} /></button>
                <button onClick={() => setChatOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={18} /></button>
              </div>
            </div>

            {/* Chat message timeline */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {chatMessages.map((m, idx) => (
                <div key={idx} style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  lineHeight: '1.4',
                  backgroundColor: m.sender === 'user' ? 'var(--primary-color)' : 'var(--surface-light)',
                  color: m.sender === 'user' ? '#fff' : 'var(--text-primary)',
                  border: m.sender === 'user' ? 'none' : '1px solid var(--border-color)'
                }}>
                  <p>{m.text}</p>
                  <span style={{ display: 'block', fontSize: '0.6rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '0.25rem' }}>{m.time}</span>
                </div>
              ))}
              {isTypingChat && (
                <div style={{ alignSelf: 'flex-start', backgroundColor: 'var(--surface-light)', padding: '0.65rem', borderRadius: '12px', fontSize: '0.85rem', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>
                  Dr. Angio is thinking...
                </div>
              )}
            </div>

            {/* Quick replies */}
            <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
              {["Organic remedies?", "Is this contagious?", "Chemical dosage?", "How to prevent?"].map(q => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  style={{
                    flexShrink: 0, padding: '0.3rem 0.6rem', border: '1px solid var(--border-color)', borderRadius: '12px',
                    fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer', backgroundColor: 'transparent'
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input field */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Ask Dr. Angio a question..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                style={{ flex: 1, padding: '0.5rem 0.75rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem' }}
              />
              <button onClick={() => handleSendMessage()} className="btn-primary" style={{ padding: '0.5rem' }}>
                <Send size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Encyclopedia/History Detail Modal */}
      {selectedEncyclopediaDisease && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 2000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
        }}>
          <div className="card-glass" style={{ maxWidth: '640px', width: '100%', padding: '2rem', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-color)' }}>{selectedEncyclopediaDisease.disease_code}</span>
                <h2 style={{ fontSize: '1.8rem' }}>{selectedEncyclopediaDisease.disease_name}</h2>
                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.95rem' }}>{selectedEncyclopediaDisease.scientific_name}</p>
              </div>
              <button onClick={() => setSelectedEncyclopediaDisease(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={24} /></button>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>PATHOLOGICAL OVERVIEW</h4>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{selectedEncyclopediaDisease.disease_description}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>CAUSE</h4>
                <p style={{ fontSize: '0.85rem' }}>{selectedEncyclopediaDisease.cause}</p>
              </div>
              <div>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>SEVERITY LEVEL</h4>
                <span style={{
                  fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 'bold', display: 'inline-block', marginTop: '0.25rem',
                  backgroundColor: selectedEncyclopediaDisease.severity === 'Critical' ? 'rgba(224,82,82,0.1)' : selectedEncyclopediaDisease.severity === 'Severe' ? 'rgba(245,166,35,0.1)' : 'rgba(82,232,150,0.1)',
                  color: selectedEncyclopediaDisease.severity === 'Critical' ? 'var(--danger-color)' : selectedEncyclopediaDisease.severity === 'Severe' ? 'var(--warning-color)' : 'var(--accent-color)'
                }}>{selectedEncyclopediaDisease.severity}</span>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>TREATMENT PROTOCOLS</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-light)' }}>
                  <strong style={{ fontSize: '0.8rem', color: 'var(--accent-color)' }}>Immediate actions:</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>{selectedEncyclopediaDisease.treatment_plan.immediate_actions.join(', ')}</p>
                </div>
                <div style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-light)' }}>
                  <strong style={{ fontSize: '0.8rem', color: 'var(--warning-color)' }}>Chemical treatments:</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                    {selectedEncyclopediaDisease.treatment_plan.chemical_treatments.map(c => `${c.chemical_name} (${c.active_ingredient})`).join(', ') || "No immediate chemicals recommended."}
                  </p>
                </div>
                <div style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-light)' }}>
                  <strong style={{ fontSize: '0.8rem', color: 'var(--accent-color)' }}>Organic alternative:</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                    {selectedEncyclopediaDisease.treatment_plan.organic_alternatives.map(o => o.remedy).join(', ')}
                  </p>
                </div>
              </div>
            </div>

            <button onClick={() => setSelectedEncyclopediaDisease(null)} className="btn-secondary" style={{ width: '100%' }}>
              Close Encyclopedia Detail
            </button>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteAccountConfirm && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 2000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
        }}>
          <div className="card-glass" style={{ maxWidth: '400px', width: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid var(--danger-color)' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--danger-color)', marginBottom: '0.5rem' }}>Delete Laboratory Record?</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                This is a permanent destructive action. It will wipe all local storage auth sessions, crop history files, tagged field metrics, and reminders.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setShowDeleteAccountConfirm(false)} className="btn-secondary" style={{ flex: 1 }}>Cancel</button>
              <button onClick={handleDeleteAccount} className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--danger-color)', color: '#fff' }}>Confirm Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Agronomist Consultation Booking Modal */}
      {showAgronomistModal && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 2000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
        }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowAgronomistModal(false);
              triggerToast("Consultation booked! An officer will call you.", "success");
            }}
            className="card-glass" style={{ maxWidth: '440px', width: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div>
              <h2 style={{ fontSize: '1.6rem' }}>Book Agronomist Consultation</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Receive a telephone callback or virtual inspection from a registered crop pathologist.</p>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>YOUR TELEPHONE</label>
              <input
                type="tel" required placeholder="+1 555-0199"
                value={agronomistForm.phone}
                onChange={(e) => setAgronomistForm({ ...agronomistForm, phone: e.target.value })}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>PREFERRED DATE</label>
              <input
                type="date" required
                value={agronomistForm.date}
                onChange={(e) => setAgronomistForm({ ...agronomistForm, date: e.target.value })}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>SYMPTOM SUMMARY / BRIEF</label>
              <textarea
                rows="3" placeholder="Describe the spread speed or details..."
                value={agronomistForm.summary}
                onChange={(e) => setAgronomistForm({ ...agronomistForm, summary: e.target.value })}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', resize: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button type="button" onClick={() => setShowAgronomistModal(false)} className="btn-secondary" style={{ flex: 1 }}>Cancel</button>
              <button type="submit" className="btn-primary" style={{ flex: 1 }}>Confirm Booking</button>
            </div>
          </form>
        </div>
      )}

      {/* Render Onboarding Tour overlay */}
      {renderOnboardingTour()}

    </div>
  );
}
