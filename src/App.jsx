import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Sprout, Activity, BookOpen, History, BarChart2, Settings, Bell, LogOut,
  User, Flame, Upload, Camera, X, Check, Copy, AlertTriangle, Info, Calendar,
  Plus, RefreshCw, ChevronDown, MessageSquare, Search, Sun, Moon, Map,
  UserCheck, Share2, ArrowLeft, ArrowRight, Send, Loader2, Award, HelpCircle, MapPin
} from 'lucide-react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar
} from 'recharts';

// --- PLANT LIST ---
const PLANTS_LIST = [
  "Jowar (Sorghum)",
  "Maize",
  "Bajra (Pearl Millet)",
  "Wheat",
  "Cotton",
  "Sugarcane",
  "Red Gram (Tur)",
  "Bengal Gram (Chickpea)",
  "Green Gram (Moong)",
  "Black Gram (Urad)",
  "Groundnut",
  "Sunflower",
  "Sesame",
  "Chilli",
  "Onion"
];

// --- DISEASES LIST (BASE DATABASE) ---
const ENCYCLOPEDIA_DATABASE = [
  // Jowar (Sorghum) (10)
  { id: "JOW-001", name: "Grain Mold", scientific_name: "Fusarium thapsinum", category: "Fungal", severity: "Severe" },
  { id: "JOW-002", name: "Anthracnose", scientific_name: "Colletotrichum sublineola", category: "Fungal", severity: "Moderate" },
  { id: "JOW-003", name: "Downy Mildew", scientific_name: "Peronosclerospora sorghi", category: "Fungal", severity: "Severe" },
  { id: "JOW-004", name: "Rust", scientific_name: "Puccinia purpurea", category: "Fungal", severity: "Mild" },
  { id: "JOW-005", name: "Smut", scientific_name: "Sporisorium reilianum", category: "Fungal", severity: "Moderate" },
  { id: "JOW-006", name: "Ergot", scientific_name: "Claviceps sorghi", category: "Fungal", severity: "Severe" },
  { id: "JOW-007", name: "Charcoal Rot", scientific_name: "Macrophomina phaseolina", category: "Fungal", severity: "Critical" },
  { id: "JOW-008", name: "Leaf Blight", scientific_name: "Exserohilum turcicum", category: "Fungal", severity: "Moderate" },
  { id: "JOW-009", name: "Zonate Leaf Spot", scientific_name: "Gloeocercospora sorghi", category: "Fungal", severity: "Mild" },
  { id: "JOW-010", name: "Sooty Stripe", scientific_name: "Ramulispora sorghi", category: "Fungal", severity: "Mild" },

  // Maize (10)
  { id: "MAZ-001", name: "Turcicum Leaf Blight", scientific_name: "Exserohilum turcicum", category: "Fungal", severity: "Severe" },
  { id: "MAZ-002", name: "Maydis Leaf Blight", scientific_name: "Bipolaris maydis", category: "Fungal", severity: "Moderate" },
  { id: "MAZ-003", name: "Common Rust", scientific_name: "Puccinia sorghi", category: "Fungal", severity: "Mild" },
  { id: "MAZ-004", name: "Downy Mildew", scientific_name: "Peronosclerospora maydis", category: "Fungal", severity: "Severe" },
  { id: "MAZ-005", name: "Banded Leaf and Sheath Blight", scientific_name: "Rhizoctonia solani", category: "Fungal", severity: "Severe" },
  { id: "MAZ-006", name: "Charcoal Rot", scientific_name: "Macrophomina phaseolina", category: "Fungal", severity: "Critical" },
  { id: "MAZ-007", name: "Stalk Rot", scientific_name: "Fusarium verticillioides", category: "Fungal", severity: "Critical" },
  { id: "MAZ-008", name: "Ear Rot", scientific_name: "Aspergillus flavus", category: "Fungal", severity: "Severe" },
  { id: "MAZ-009", name: "Common Smut", scientific_name: "Ustilago maydis", category: "Fungal", severity: "Moderate" },
  { id: "MAZ-010", name: "Maize Streak Virus", scientific_name: "Maize streak virus", category: "Viral", severity: "Critical" },

  // Bajra (Pearl Millet) (10)
  { id: "BAJ-001", name: "Downy Mildew (Green Ear)", scientific_name: "Sclerospora graminicola", category: "Fungal", severity: "Critical" },
  { id: "BAJ-002", name: "Ergot", scientific_name: "Claviceps fusiformis", category: "Fungal", severity: "Severe" },
  { id: "BAJ-003", name: "Smut", scientific_name: "Moesziomyces penicillariae", category: "Fungal", severity: "Moderate" },
  { id: "BAJ-004", name: "Rust", scientific_name: "Puccinia substriata", category: "Fungal", severity: "Mild" },
  { id: "BAJ-005", name: "Blast", scientific_name: "Pyricularia grisea", category: "Fungal", severity: "Severe" },
  { id: "BAJ-006", name: "Leaf Spot", scientific_name: "Curvularia penniseti", category: "Fungal", severity: "Mild" },
  { id: "BAJ-007", name: "Leaf Blight", scientific_name: "Drechslera dematioidea", category: "Fungal", severity: "Moderate" },
  { id: "BAJ-008", name: "Grain Mold", scientific_name: "Curvularia lunata", category: "Fungal", severity: "Moderate" },
  { id: "BAJ-009", name: "Zonate Leaf Spot", scientific_name: "Dactuliophora elongata", category: "Fungal", severity: "Mild" },
  { id: "BAJ-010", name: "Sooty Stripe", scientific_name: "Ramulispora spp.", category: "Fungal", severity: "Mild" },

  // Wheat (10)
  { id: "WHT-001", name: "Stem Rust", scientific_name: "Puccinia graminis f. sp. tritici", category: "Fungal", severity: "Critical" },
  { id: "WHT-002", name: "Leaf Rust", scientific_name: "Puccinia triticina", category: "Fungal", severity: "Severe" },
  { id: "WHT-003", name: "Stripe Rust", scientific_name: "Puccinia striiformis", category: "Fungal", severity: "Critical" },
  { id: "WHT-004", name: "Loose Smut", scientific_name: "Ustilago nuda var. tritici", category: "Fungal", severity: "Severe" },
  { id: "WHT-005", name: "Karnal Bunt", scientific_name: "Tilletia indica", category: "Fungal", severity: "Severe" },
  { id: "WHT-006", name: "Powdery Mildew", scientific_name: "Blumeria graminis f. sp. tritici", category: "Fungal", severity: "Moderate" },
  { id: "WHT-007", name: "Flag Smut", scientific_name: "Urocystis agropyri", category: "Fungal", severity: "Moderate" },
  { id: "WHT-008", name: "Spot Blotch", scientific_name: "Bipolaris sorokiniana", category: "Fungal", severity: "Severe" },
  { id: "WHT-009", name: "Fusarium Head Blight", scientific_name: "Fusarium graminearum", category: "Fungal", severity: "Critical" },
  { id: "WHT-010", name: "Root Rot", scientific_name: "Bipolaris spp.", category: "Fungal", severity: "Moderate" },

  // Cotton (10)
  { id: "COT-001", name: "Bacterial Blight", scientific_name: "Xanthomonas citri pv. malvacearum", category: "Bacterial", severity: "Severe" },
  { id: "COT-002", name: "Fusarium Wilt", scientific_name: "Fusarium oxysporum f. sp. vasinfectum", category: "Fungal", severity: "Critical" },
  { id: "COT-003", name: "Verticillium Wilt", scientific_name: "Verticillium dahliae", category: "Fungal", severity: "Critical" },
  { id: "COT-004", name: "Alternaria Leaf Spot", scientific_name: "Alternaria macrospora", category: "Fungal", severity: "Moderate" },
  { id: "COT-005", name: "Anthracnose", scientific_name: "Colletotrichum gossypii", category: "Fungal", severity: "Moderate" },
  { id: "COT-006", name: "Grey Mildew", scientific_name: "Ramularia areola", category: "Fungal", severity: "Mild" },
  { id: "COT-007", name: "Boll Rot", scientific_name: "Phytophthora nicotianae", category: "Fungal", severity: "Severe" },
  { id: "COT-008", name: "Root Rot", scientific_name: "Rhizoctonia bataticola", category: "Fungal", severity: "Critical" },
  { id: "COT-009", name: "Leaf Curl Virus", scientific_name: "Cotton leaf curl virus", category: "Viral", severity: "Critical" },
  { id: "COT-010", name: "Tobacco Streak Virus", scientific_name: "Tobacco streak virus", category: "Viral", severity: "Severe" },

  // Sugarcane (10)
  { id: "SUG-001", name: "Red Rot", scientific_name: "Colletotrichum falcatum", category: "Fungal", severity: "Critical" },
  { id: "SUG-002", name: "Smut", scientific_name: "Sporisorium scitamineum", category: "Fungal", severity: "Severe" },
  { id: "SUG-003", name: "Wilt", scientific_name: "Fusarium sacchari", category: "Fungal", severity: "Critical" },
  { id: "SUG-004", name: "Pokkah Boeng", scientific_name: "Fusarium moniliforme", category: "Fungal", severity: "Moderate" },
  { id: "SUG-005", name: "Grassy Shoot Disease", scientific_name: "Candidatus Phytoplasma sacchari", category: "Bacterial", severity: "Severe" },
  { id: "SUG-006", name: "Ratoon Stunting Disease", scientific_name: "Leifsonia xyli subsp. xyli", category: "Bacterial", severity: "Moderate" },
  { id: "SUG-007", name: "Mosaic Disease", scientific_name: "Sugarcane mosaic virus", category: "Viral", severity: "Severe" },
  { id: "SUG-008", name: "Eye Spot", scientific_name: "Bipolaris sacchari", category: "Fungal", severity: "Mild" },
  { id: "SUG-009", name: "Rust", scientific_name: "Puccinia melanocephala", category: "Fungal", severity: "Moderate" },
  { id: "SUG-010", name: "Pineapple Disease", scientific_name: "Ceratocystis paradoxa", category: "Fungal", severity: "Severe" },

  // Red Gram (Tur) (10)
  { id: "RED-001", name: "Fusarium Wilt", scientific_name: "Fusarium udum", category: "Fungal", severity: "Critical" },
  { id: "RED-002", name: "Sterility Mosaic Disease", scientific_name: "Pigeonpea sterility mosaic virus", category: "Viral", severity: "Critical" },
  { id: "RED-003", name: "Phytophthora Blight", scientific_name: "Phytophthora cajani", category: "Fungal", severity: "Critical" },
  { id: "RED-004", name: "Dry Root Rot", scientific_name: "Macrophomina phaseolina", category: "Fungal", severity: "Severe" },
  { id: "RED-005", name: "Alternaria Blight", scientific_name: "Alternaria alternata", category: "Fungal", severity: "Moderate" },
  { id: "RED-006", name: "Cercospora Leaf Spot", scientific_name: "Cercospora indica", category: "Fungal", severity: "Mild" },
  { id: "RED-007", name: "Powdery Mildew", scientific_name: "Oidiopsis taurica", category: "Fungal", severity: "Moderate" },
  { id: "RED-008", name: "Anthracnose", scientific_name: "Colletotrichum cajani", category: "Fungal", severity: "Moderate" },
  { id: "RED-009", name: "Rust", scientific_name: "Uromyces cajani", category: "Fungal", severity: "Mild" },
  { id: "RED-010", name: "Bacterial Leaf Spot", scientific_name: "Xanthomonas cajani", category: "Bacterial", severity: "Moderate" },

  // Bengal Gram (Chickpea) (10)
  { id: "BEN-001", name: "Fusarium Wilt", scientific_name: "Fusarium oxysporum f. sp. ciceris", category: "Fungal", severity: "Critical" },
  { id: "BEN-002", name: "Ascochyta Blight", scientific_name: "Ascochyta rabiei", category: "Fungal", severity: "Critical" },
  { id: "BEN-003", name: "Dry Root Rot", scientific_name: "Rhizoctonia bataticola", category: "Fungal", severity: "Severe" },
  { id: "BEN-004", name: "Collar Rot", scientific_name: "Sclerotium rolfsii", category: "Fungal", severity: "Severe" },
  { id: "BEN-005", name: "Botrytis Grey Mold", scientific_name: "Botrytis cinerea", category: "Fungal", severity: "Severe" },
  { id: "BEN-006", name: "Rust", scientific_name: "Uromyces ciceris-arietini", category: "Fungal", severity: "Mild" },
  { id: "BEN-007", name: "Powdery Mildew", scientific_name: "Oidiopsis taurica", category: "Fungal", severity: "Moderate" },
  { id: "BEN-008", name: "Alternaria Blight", scientific_name: "Alternaria alternata", category: "Fungal", severity: "Moderate" },
  { id: "BEN-009", name: "Mosaic Disease", scientific_name: "Alfalfa mosaic virus", category: "Viral", severity: "Moderate" },
  { id: "BEN-010", name: "Black Root Rot", scientific_name: "Fusarium solani", category: "Fungal", severity: "Severe" },

  // Green Gram (Moong) (10)
  { id: "GRN-001", name: "Yellow Mosaic Virus", scientific_name: "Mungbean yellow mosaic virus", category: "Viral", severity: "Critical" },
  { id: "GRN-002", name: "Cercospora Leaf Spot", scientific_name: "Cercospora canescens", category: "Fungal", severity: "Moderate" },
  { id: "GRN-003", name: "Powdery Mildew", scientific_name: "Erysiphe polygoni", category: "Fungal", severity: "Moderate" },
  { id: "GRN-004", name: "Anthracnose", scientific_name: "Colletotrichum lindemuthianum", category: "Fungal", severity: "Moderate" },
  { id: "GRN-005", name: "Dry Root Rot", scientific_name: "Macrophomina phaseolina", category: "Fungal", severity: "Severe" },
  { id: "GRN-006", name: "Web Blight", scientific_name: "Rhizoctonia solani", category: "Fungal", severity: "Severe" },
  { id: "GRN-007", name: "Leaf Crinkle Disease", scientific_name: "Mungbean leaf crinkle virus", category: "Viral", severity: "Moderate" },
  { id: "GRN-008", name: "Charcoal Rot", scientific_name: "Macrophomina phaseolina", category: "Fungal", severity: "Severe" },
  { id: "GRN-009", name: "Bacterial Leaf Spot", scientific_name: "Xanthomonas phaseoli", category: "Bacterial", severity: "Moderate" },
  { id: "GRN-010", name: "Alternaria Leaf Spot", scientific_name: "Alternaria alternata", category: "Fungal", severity: "Mild" },

  // Black Gram (Urad) (10)
  { id: "BLK-001", name: "Yellow Mosaic Virus", scientific_name: "Mungbean yellow mosaic virus", category: "Viral", severity: "Critical" },
  { id: "BLK-002", name: "Powdery Mildew", scientific_name: "Erysiphe polygoni", category: "Fungal", severity: "Moderate" },
  { id: "BLK-003", name: "Cercospora Leaf Spot", scientific_name: "Cercospora canescens", category: "Fungal", severity: "Moderate" },
  { id: "BLK-004", name: "Anthracnose", scientific_name: "Colletotrichum lindemuthianum", category: "Fungal", severity: "Moderate" },
  { id: "BLK-005", name: "Leaf Crinkle Disease", scientific_name: "Uradbean leaf crinkle virus", category: "Viral", severity: "Severe" },
  { id: "BLK-006", name: "Dry Root Rot", scientific_name: "Macrophomina phaseolina", category: "Fungal", severity: "Severe" },
  { id: "BLK-007", name: "Charcoal Rot", scientific_name: "Macrophomina phaseolina", category: "Fungal", severity: "Severe" },
  { id: "BLK-008", name: "Web Blight", scientific_name: "Rhizoctonia solani", category: "Fungal", severity: "Severe" },
  { id: "BLK-009", name: "Bacterial Leaf Spot", scientific_name: "Xanthomonas phaseoli", category: "Bacterial", severity: "Moderate" },
  { id: "BLK-010", name: "Rust", scientific_name: "Uromyces phaseoli", category: "Fungal", severity: "Mild" },

  // Groundnut (10)
  { id: "GND-001", name: "Tikka Leaf Spot (Early)", scientific_name: "Cercospora arachidicola", category: "Fungal", severity: "Severe" },
  { id: "GND-002", name: "Tikka Leaf Spot (Late)", scientific_name: "Phaeoisariopsis personata", category: "Fungal", severity: "Severe" },
  { id: "GND-003", name: "Rust", scientific_name: "Puccinia arachidis", category: "Fungal", severity: "Moderate" },
  { id: "GND-004", name: "Collar Rot", scientific_name: "Aspergillus niger", category: "Fungal", severity: "Severe" },
  { id: "GND-005", name: "Stem Rot", scientific_name: "Sclerotium rolfsii", category: "Fungal", severity: "Critical" },
  { id: "GND-006", name: "Bud Necrosis Disease", scientific_name: "Groundnut bud necrosis virus", category: "Viral", severity: "Critical" },
  { id: "GND-007", name: "Peanut Stem Necrosis Disease", scientific_name: "Tobacco streak virus", category: "Viral", severity: "Severe" },
  { id: "GND-008", name: "Peanut Mosaic Virus", scientific_name: "Peanut mosaic virus", category: "Viral", severity: "Moderate" },
  { id: "GND-009", name: "Aspergillus Crown Rot", scientific_name: "Aspergillus pulverulentus", category: "Fungal", severity: "Moderate" },
  { id: "GND-010", name: "Charcoal Rot", scientific_name: "Macrophomina phaseolina", category: "Fungal", severity: "Severe" },

  // Sunflower (10)
  { id: "SUN-001", name: "Alternaria Blight", scientific_name: "Alternaria helianthi", category: "Fungal", severity: "Severe" },
  { id: "SUN-002", name: "Downy Mildew", scientific_name: "Plasmopara halstedii", category: "Fungal", severity: "Severe" },
  { id: "SUN-003", name: "Rust", scientific_name: "Puccinia helianthi", category: "Fungal", severity: "Moderate" },
  { id: "SUN-004", name: "Powdery Mildew", scientific_name: "Erysiphe cichoracearum", category: "Fungal", severity: "Moderate" },
  { id: "SUN-005", name: "Charcoal Rot", scientific_name: "Macrophomina phaseolina", category: "Fungal", severity: "Critical" },
  { id: "SUN-006", name: "Head Rot", scientific_name: "Rhizopus arrhizus", category: "Fungal", severity: "Severe" },
  { id: "SUN-007", name: "Stem Rot", scientific_name: "Sclerotinia sclerotiorum", category: "Fungal", severity: "Critical" },
  { id: "SUN-008", name: "Leaf Spot", scientific_name: "Septoria helianthi", category: "Fungal", severity: "Mild" },
  { id: "SUN-009", name: "Necrosis Disease", scientific_name: "Tobacco streak virus", category: "Viral", severity: "Severe" },
  { id: "SUN-010", name: "Verticillium Wilt", scientific_name: "Verticillium dahliae", category: "Fungal", severity: "Critical" },

  // Sesame (10)
  { id: "SES-001", name: "Phyllody", scientific_name: "Candidatus Phytoplasma", category: "Bacterial", severity: "Critical" },
  { id: "SES-002", name: "Alternaria Leaf Spot", scientific_name: "Alternaria sesami", category: "Fungal", severity: "Moderate" },
  { id: "SES-003", name: "Powdery Mildew", scientific_name: "Erysiphe cichoracearum", category: "Fungal", severity: "Moderate" },
  { id: "SES-004", name: "Cercospora Leaf Spot", scientific_name: "Cercospora sesami", category: "Fungal", severity: "Mild" },
  { id: "SES-005", name: "Bacterial Blight", scientific_name: "Xanthomonas campestris pv. sesami", category: "Bacterial", severity: "Severe" },
  { id: "SES-006", name: "Root Rot", scientific_name: "Macrophomina phaseolina", category: "Fungal", severity: "Severe" },
  { id: "SES-007", name: "Stem Rot", scientific_name: "Phytophthora parasitica var. sesami", category: "Fungal", severity: "Critical" },
  { id: "SES-008", name: "Charcoal Rot", scientific_name: "Macrophomina phaseolina", category: "Fungal", severity: "Severe" },
  { id: "SES-009", name: "Wilt", scientific_name: "Fusarium oxysporum f. sp. sesami", category: "Fungal", severity: "Critical" },
  { id: "SES-010", name: "Leaf Curl Disease", scientific_name: "Sesame leaf curl virus", category: "Viral", severity: "Severe" },

  // Chilli (10)
  { id: "CHL-001", name: "Anthracnose (Fruit Rot)", scientific_name: "Colletotrichum capsici", category: "Fungal", severity: "Severe" },
  { id: "CHL-002", name: "Powdery Mildew", scientific_name: "Leveillula taurica", category: "Fungal", severity: "Moderate" },
  { id: "CHL-003", name: "Damping Off", scientific_name: "Pythium aphanidermatum", category: "Fungal", severity: "Severe" },
  { id: "CHL-004", name: "Fusarium Wilt", scientific_name: "Fusarium oxysporum", category: "Fungal", severity: "Critical" },
  { id: "CHL-005", name: "Bacterial Wilt", scientific_name: "Ralstonia solanacearum", category: "Bacterial", severity: "Critical" },
  { id: "CHL-006", name: "Cercospora Leaf Spot", scientific_name: "Cercospora capsici", category: "Fungal", severity: "Mild" },
  { id: "CHL-007", name: "Leaf Curl Virus", scientific_name: "Chilli leaf curl virus", category: "Viral", severity: "Critical" },
  { id: "CHL-008", name: "Mosaic Virus", scientific_name: "Cucumber mosaic virus", category: "Viral", severity: "Severe" },
  { id: "CHL-009", name: "Dieback", scientific_name: "Colletotrichum capsici", category: "Fungal", severity: "Severe" },
  { id: "CHL-010", name: "Phytophthora Blight", scientific_name: "Phytophthora capsici", category: "Fungal", severity: "Critical" },

  // Onion (10)
  { id: "ONN-001", name: "Purple Blotch", scientific_name: "Alternaria porri", category: "Fungal", severity: "Severe" },
  { id: "ONN-002", name: "Stemphylium Blight", scientific_name: "Stemphylium vesicarium", category: "Fungal", severity: "Moderate" },
  { id: "ONN-003", name: "Downy Mildew", scientific_name: "Peronospora destructor", category: "Fungal", severity: "Severe" },
  { id: "ONN-004", name: "Basal Rot", scientific_name: "Fusarium oxysporum f. sp. cepae", category: "Fungal", severity: "Critical" },
  { id: "ONN-005", name: "Neck Rot", scientific_name: "Botrytis allii", category: "Fungal", severity: "Severe" },
  { id: "ONN-006", name: "Smut", scientific_name: "Urocystis cepulae", category: "Fungal", severity: "Moderate" },
  { id: "ONN-007", name: "White Rot", scientific_name: "Sclerotium cepivorum", category: "Fungal", severity: "Critical" },
  { id: "ONN-008", name: "Pink Root Rot", scientific_name: "Phoma terrestris", category: "Fungal", severity: "Moderate" },
  { id: "ONN-009", name: "Onion Blast", scientific_name: "Botrytis squamosa", category: "Fungal", severity: "Moderate" },
  { id: "ONN-010", name: "Bacterial Soft Rot", scientific_name: "Pectobacterium carotovorum", category: "Bacterial", severity: "Critical" }
];

// --- COMMON SYMPTOMS FOR USER SELECTION ---
const COMMON_SYMPTOMS = [
  { id: "sym-1", text: "White powdery patches on leaves", diseaseCode: "WHT-006" },
  { id: "sym-2", text: "Circular spots with yellow halos", diseaseCode: "GND-001" },
  { id: "sym-3", text: "Brown spots with concentric rings", diseaseCode: "ONN-001" },
  { id: "sym-4", text: "Greasy, water-soaked dark lesions", diseaseCode: "COT-001" },
  { id: "sym-5", text: "Leaves curling and yellowing", diseaseCode: "CHL-007" },
  { id: "sym-6", text: "Sunken dark spots on pods/fruit", diseaseCode: "CHL-001" },
  { id: "sym-7", text: "Orange-brown rust pustules on leaves", diseaseCode: "WHT-001" },
  { id: "sym-8", text: "Loose black powder on grain heads", diseaseCode: "WHT-004" },
  { id: "sym-9", text: "Sudden wilting or drying of plant", diseaseCode: "COT-002" },
  { id: "sym-10", text: "Water-soaked red tissue in stems", diseaseCode: "SUG-001" }
];

// --- DYNAMIC DISEASE IMAGES GENERATOR ---
// --- DYNAMIC DISEASE IMAGES GENERATOR ---
const CROP_IMAGES = {
  JOW: [
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1570569695181-40bca161e2b7?auto=format&fit=crop&w=600&q=80"
  ],
  MAZ: [
    "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1551893086-c0d5c3dc4bf9?auto=format&fit=crop&w=600&q=80"
  ],
  BAJ: [
    "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80"
  ],
  WHT: [
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1507598641400-ec3536ba81bc?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1587334206586-4f707f1bd062?auto=format&fit=crop&w=600&q=80"
  ],
  COT: [
    "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1563201378-3665689a9f24?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=600&q=80"
  ],
  SUG: [
    "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1590779037690-e592f69460a3?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1533038590840-1cde6e6e4055?auto=format&fit=crop&w=600&q=80"
  ],
  RED: [
    "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80"
  ],
  BEN: [
    "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1584489370845-e6a9ee83fe10?auto=format&fit=crop&w=600&q=80"
  ],
  GRN: [
    "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1533038590840-1cde6e6e4055?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1563201378-3665689a9f24?auto=format&fit=crop&w=600&q=80"
  ],
  BLK: [
    "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1507598641400-ec3536ba81bc?auto=format&fit=crop&w=600&q=80"
  ],
  GND: [
    "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1584489370845-e6a9ee83fe10?auto=format&fit=crop&w=600&q=80"
  ],
  SUN: [
    "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1507598641400-ec3536ba81bc?auto=format&fit=crop&w=600&q=80"
  ],
  SES: [
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1590779037690-e592f69460a3?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=600&q=80"
  ],
  CHL: [
    "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1563201378-3665689a9f24?auto=format&fit=crop&w=600&q=80"
  ],
  ONN: [
    "https://images.unsplash.com/photo-1508747703725-719ae25db3e4?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1587334206586-4f707f1bd062?auto=format&fit=crop&w=600&q=80"
  ]
};

const getDiseaseImages = (diseaseId) => {
  const idStr = String(diseaseId || "").toUpperCase();
  let cropCode = "WHT";
  const prefixes = ["JOW", "MAZ", "BAJ", "WHT", "COT", "SUG", "RED", "BEN", "GRN", "BLK", "GND", "SUN", "SES", "CHL", "ONN"];
  for (const prefix of prefixes) {
    if (idStr.includes(prefix)) {
      cropCode = prefix;
      break;
    }
  }

  const pool = CROP_IMAGES[cropCode] || [
    "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1533038590840-1cde6e6e4055?auto=format&fit=crop&w=600&q=80"
  ];
  return pool;
};

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
        approximate_cost: "₹1,500 per 500g bottle"
      },
      {
        chemical_name: "Mancozeb Fungicide",
        active_ingredient: "Mancozeb (75% WP)",
        dosage: "2.5g per Liter",
        application_method: "Uniform canopy spray",
        frequency: "Every 14 days",
        safety_precautions: "Do not harvest within 7 days of treatment. Keep away from water bodies.",
        approximate_cost: "₹1,000 per 1kg"
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
        approximate_cost: "₹2,800 per pack"
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
        approximate_cost: "₹1,200 per bottle"
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
        approximate_cost: "₹3,600 per pack"
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
        approximate_cost: "₹1,100 per bottle"
      },
      {
        chemical_name: "Water-soluble NPK Fertilizer",
        active_ingredient: "NPK 19-19-19 balanced mix",
        dosage: "5g per Liter",
        application_method: "Soil drenching around rootzone",
        frequency: "Once every 15 days",
        safety_precautions: "Do not over-fertilize to avoid root burn.",
        approximate_cost: "₹700 per kg"
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
        approximate_cost: "₹1,800 per bottle"
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
    scientific_name: scientific,
    category,
    confidence,
    severity,
    affected_parts,
    symptoms_observed: symptoms,
    cause,
    disease_description: description,
    spread_risk,
    if_untreated,
    images: base.images || getDiseaseImages(code),
    is_custom: base.is_custom || false,
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

// --- REGIONAL SOIL & CROP MAPPING DATABASE ---
const SOIL_REGION_DATABASE = {
  "Maharashtra": {
    soilType: "Deep Black Clayey Soil (Regur)",
    properties: "High clay content, excellent moisture retention, rich in iron, calcium, lime, and potash. Low in nitrogen and phosphorus.",
    typicalCrops: ["Cotton", "Sugarcane", "Jowar (Sorghum)", "Bengal Gram (Chickpea)", "Groundnut", "Sesame", "Chilli"],
    suitability: {
      "Kharif (Monsoon)": [
        { crop: "Cotton", score: 95, reason: "Black soil retains moisture perfectly for cotton taproots during rainfall breaks." },
        { crop: "Jowar (Sorghum)", score: 90, reason: "Highly drought resistant, thrives in clayey moisture-holding soil." },
        { crop: "Groundnut", score: 85, reason: "Excellent in well-drained sandy-loam black soils." },
        { crop: "Sesame", score: 80, reason: "Requires moderate warmth and loamy clay beds." }
      ],
      "Rabi (Winter)": [
        { crop: "Bengal Gram (Chickpea)", score: 95, reason: "Residual moisture in clayey black soil supports winter chickpea growth without heavy irrigation." },
        { crop: "Wheat", score: 85, reason: "Good winter crop if supplementary irrigation is provided." }
      ],
      "Zaid (Summer)": [
        { crop: "Green Gram (Moong)", score: 75, reason: "Short duration crop that replenishes nitrogen before the Kharif season." }
      ]
    }
  },
  "Punjab": {
    soilType: "Fertile Alluvial Clay-Loam Soil",
    properties: "Rich in humus, phosphoric acid, and potash. Highly porous and fertile structure with balanced sand-silt-clay ratios.",
    typicalCrops: ["Wheat", "Maize", "Sugarcane", "Green Gram (Moong)", "Onion", "Bengal Gram (Chickpea)", "Black Gram (Urad)"],
    suitability: {
      "Kharif (Monsoon)": [
        { crop: "Maize", score: 92, reason: "Alluvial soil provides outstanding aeration and root penetration for high-yield maize." },
        { crop: "Sugarcane", score: 90, reason: "Thrives with heavy watering in highly organic alluvial soils." },
        { crop: "Cotton", score: 80, reason: "Suitable in well-drained loamy alluvial tracts." }
      ],
      "Rabi (Winter)": [
        { crop: "Wheat", score: 98, reason: "The premier alluvial wheat-growing region of India. Balanced clay-silt retains fertilizer efficiently." },
        { crop: "Onion", score: 88, reason: "Grows large bulb structures in loamy loose soils." },
        { crop: "Bengal Gram (Chickpea)", score: 85, reason: "Suitable for nitrogen fixation in agricultural crop rotations." }
      ],
      "Zaid (Summer)": [
        { crop: "Green Gram (Moong)", score: 80, reason: "Thrives in summer sun, quick 60-day crop return." }
      ]
    }
  },
  "Rajasthan": {
    soilType: "Sandy Arid/Desert Soil",
    properties: "Highly porous and permeable, low moisture retention, low organic matter, saline-alkaline pH. Requires drip/sparse watering.",
    typicalCrops: ["Bajra (Pearl Millet)", "Sesame", "Groundnut", "Chilli", "Jowar (Sorghum)"],
    suitability: {
      "Kharif (Monsoon)": [
        { crop: "Bajra (Pearl Millet)", score: 98, reason: "Extremely drought-tolerant. Porous sandy soil prevents waterlogging which millets hate." },
        { crop: "Sesame", score: 90, reason: "Thrives in sandy loams with minimal water and high solar intensity." },
        { crop: "Jowar (Sorghum)", score: 85, reason: "Deep roots search for water in deep sandy profiles." }
      ],
      "Rabi (Winter)": [
        { crop: "Sunflower", score: 75, reason: "Can be grown with micro-irrigation systems." },
        { crop: "Bengal Gram (Chickpea)", score: 70, reason: "Low-water winter crop suitable for semi-arid zones." }
      ],
      "Zaid (Summer)": [
        { crop: "Sesame", score: 65, reason: "Only viable under controlled drip systems." }
      ]
    }
  },
  "Gujarat": {
    soilType: "Sandy Loam & Black Cotton Soil",
    properties: "Mix of alluvial sandy loams in the north and rich black clayey soils in Saurashtra. High potash and carbonate levels.",
    typicalCrops: ["Cotton", "Groundnut", "Sesame", "Bajra (Pearl Millet)", "Jowar (Sorghum)", "Onion", "Chilli"],
    suitability: {
      "Kharif (Monsoon)": [
        { crop: "Cotton", score: 96, reason: "Renowned region for cotton. Saurashtra black soil retains monsoon rain for optimal growth." },
        { crop: "Groundnut", score: 94, reason: "North Gujarat sandy loams are perfect for pod development and easy harvesting." },
        { crop: "Bajra (Pearl Millet)", score: 88, reason: "Thrives in dry, well-aerated coastal sandy loams." }
      ],
      "Rabi (Winter)": [
        { crop: "Onion", score: 90, reason: "High yield in well-drained sandy-clay soils of Saurashtra." },
        { crop: "Wheat", score: 80, reason: "Grows well under light irrigation in black-clay tracts." }
      ],
      "Zaid (Summer)": [
        { crop: "Sesame", score: 75, reason: "Thrives in summer heat with moderate coastal humidity." }
      ]
    }
  },
  "Andhra Pradesh": {
    soilType: "Red Sandy-Loam & Coastal Alluvial Soil",
    properties: "Well-aerated red soil rich in iron and potash but low in nitrogen and humus. Light loamy structure suitable for root growth.",
    typicalCrops: ["Chilli", "Groundnut", "Cotton", "Sugarcane", "Red Gram (Tur)", "Sesame", "Maize"],
    suitability: {
      "Kharif (Monsoon)": [
        { crop: "Chilli", score: 95, reason: "Guntur region red soils are famous for producing high-quality hot chillies. Requires dry spells." },
        { crop: "Groundnut", score: 90, reason: "Red sandy loam provides easy root penetration and pod swelling." },
        { crop: "Red Gram (Tur)", score: 88, reason: "Hardy legume that thrives in low-nitrogen red soils." }
      ],
      "Rabi (Winter)": [
        { crop: "Maize", score: 88, reason: "Grows well in river valley alluvial soils during dry winter months." },
        { crop: "Bengal Gram (Chickpea)", score: 80, reason: "Good winter cover crop in mixed soils." }
      ],
      "Zaid (Summer)": [
        { crop: "Black Gram (Urad)", score: 75, reason: "Short summer crop after rice harvests." }
      ]
    }
  },
  "Uttar Pradesh": {
    soilType: "Deep Alluvial Silt Soil",
    properties: "Extremely deep fertile layers deposited by Gangetic river systems. Rich in lime and organic potash. Dense agricultural profile.",
    typicalCrops: ["Sugarcane", "Wheat", "Maize", "Bengal Gram (Chickpea)", "Red Gram (Tur)", "Green Gram (Moong)", "Onion"],
    suitability: {
      "Kharif (Monsoon)": [
        { crop: "Sugarcane", score: 96, reason: "Premier Sugarcane belt. The deep alluvial clay holds the massive water quantity required." },
        { crop: "Maize", score: 90, reason: "High vegetative growth in nutrient-dense alluvial planes." },
        { crop: "Red Gram (Tur)", score: 85, reason: "Sown in early monsoon, grows slowly into a tall woody legume." }
      ],
      "Rabi (Winter)": [
        { crop: "Wheat", score: 97, reason: "Massive production yields. Winter dew and Gangetic silt promote dense grains." },
        { crop: "Onion", score: 90, reason: "Highly fertile alluvial beds support massive bulb sizing." },
        { crop: "Bengal Gram (Chickpea)", score: 88, reason: "Sown in dry sandy alluvial fields." }
      ],
      "Zaid (Summer)": [
        { crop: "Green Gram (Moong)", score: 85, reason: "Very common summer crop in rotation with wheat." }
      ]
    }
  },
  "Karnataka": {
    soilType: "Red Clay-Loam & Black Cotton Soil Mix",
    properties: "Slightly acidic to neutral red soils in the south, deep black clays in the north. Moderately rich in phosphorus and potassium.",
    typicalCrops: ["Jowar (Sorghum)", "Maize", "Cotton", "Sugarcane", "Groundnut", "Sunflower", "Chilli", "Red Gram (Tur)"],
    suitability: {
      "Kharif (Monsoon)": [
        { crop: "Maize", score: 92, reason: "Red loams of southern Karnataka support excellent maize yields." },
        { crop: "Jowar (Sorghum)", score: 90, reason: "North Karnataka black soils are ideal for Kharif sorghum." },
        { crop: "Sunflower", score: 88, reason: "Thrives in red clayey loams with moderate rainfall." }
      ],
      "Rabi (Winter)": [
        { crop: "Bengal Gram (Chickpea)", score: 90, reason: "Thrives in Northern Karnataka black soils during dry winters." },
        { crop: "Chilli", score: 85, reason: "Byadagi chilli grows uniquely in red soils under cool dry winters." }
      ],
      "Zaid (Summer)": [
        { crop: "Groundnut", score: 75, reason: "Grown with canal irrigation." }
      ]
    }
  },
  "West Bengal": {
    soilType: "Heavy Alluvial Clay & Laterite Acidic Soil",
    properties: "Heavy deltaic alluvial clays in the south/east, acidic laterites in the west. Heavy moisture and organic carbon contents.",
    typicalCrops: ["Maize", "Sugarcane", "Onion", "Green Gram (Moong)", "Black Gram (Urad)", "Wheat"],
    suitability: {
      "Kharif (Monsoon)": [
        { crop: "Sugarcane", score: 88, reason: "Grows well in deltaic alluvial margins." },
        { crop: "Maize", score: 85, reason: "Thrives in well-drained silty loams." }
      ],
      "Rabi (Winter)": [
        { crop: "Onion", score: 92, reason: "Outstanding performance in alluvial silts of river beds." },
        { crop: "Wheat", score: 80, reason: "Grown under light irrigation in northern alluvial planes." }
      ],
      "Zaid (Summer)": [
        { crop: "Black Gram (Urad)", score: 82, reason: "Very popular pulse grown in moist post-harvest paddy fields." },
        { crop: "Green Gram (Moong)", score: 80, reason: "Grows quickly in warm summer silt." }
      ]
    }
  }
};

// --- DAILY AGRIO TIPS ---
const TIPS_OF_THE_DAY = [
  "Deep watering once a week is far better than light daily watering. It encourages roots to grow deep, making plants drought-resilient.",
  "Drip irrigation keeps leaves dry, preventing 80% of fungal and bacterial spores from germinating.",
  "Ensure you sanitize your pruning shears with a 10% bleach solution or 70% alcohol between trimming different plants.",
  "French Marigolds release chemical compounds through their roots that repel destructive root-knot nematodes.",
  "Iron chlorosis is often a sign of waterlogged soil or high pH rather than an actual iron shortage in the soil.",
  "Ladybugs and Lacewings are natural predators of aphids. Avoid spraying chemicals when they are actively feeding on pests."
];

// --- DAILY AGRIO TIPS IN KANNADA ---
const TIPS_OF_THE_DAY_KN = [
  "ವಾರಕ್ಕೊಮ್ಮೆ ಆಳವಾಗಿ ನೀರುಣಿಸುವುದು ಪ್ರತಿದಿನ ಹಗುರವಾಗಿ ನೀರುಣಿಸುವುದಕ್ಕಿಂತ ಉತ್ತಮವಾಗಿದೆ. ಇದು ಬೇರುಗಳು ಆಳವಾಗಿ ಬೆಳೆಯಲು ಉತ್ತೇಜಿಸುತ್ತದೆ, ಇದರಿಂದಾಗಿ ಸಸ್ಯಗಳು ಬರ ನಿರೋಧಕವಾಗುತ್ತವೆ.",
  "ಹನಿ ನೀರಾವರಿ ವಿಧಾನವು ಎಲೆಗಳನ್ನು ಒಣಗಿಸಿಡುತ್ತದೆ, ಇದರಿಂದಾಗಿ ಶೇಕಡಾ 80 ರಷ್ಟು ಶಿಲೀಂಧ್ರ ಮತ್ತು ಬ್ಯಾಕ್ಟೀರಿಯಾದ ಕಣಗಳು ಮೊಳಕೆಯೊಡೆಯುವುದನ್ನು ತಡೆಯುತ್ತದೆ.",
  "ವಿವಿಧ ಸಸ್ಯಗಳನ್ನು ಕತ್ತರಿಸುವ ನಡುವೆ ನಿಮ್ಮ ಕತ್ತರಿಗಳನ್ನು 10% ಬ್ಲೀಚ್ ದ್ರಾವಣ ಅಥವಾ 70% ಆಲ್ಕೋಹಾಲ್‌ನಿಂದ ಸ್ವಚ್ಛಗೊಳಿಸಲು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
  "ಚೆಂಡು ಹೂವಿನ ಗಿಡಗಳು ತಮ್ಮ ಬೇರುಗಳ ಮೂಲಕ ರಾಸಾಯನಿಕ ಸಂಯುಕ್ತಗಳನ್ನು ಬಿಡುಗಡೆ ಮಾಡುತ್ತವೆ, ಇವು ವಿನಾಶಕಾರಿ ಬೇರು-ಗಂಟು ನೆಮಟೋಡ್‌ಗಳನ್ನು ವಿಕರ್ಷಿಸುತ್ತವೆ.",
  "ಕಬ್ಬಿಣದ ಕೊರತೆಯಿಂದ ಎಲೆ ಹಳದಿಯಾಗುವುದು (ಕ್ಲೋರೋಸಿಸ್) ಸಾಮಾನ್ಯವಾಗಿ ಮಣ್ಣಿನಲ್ಲಿ ಕಬ್ಬಿಣದ ಕೊರತೆಗಿಂತ ಜೌಗು ಮಣ್ಣು ಅಥವಾ ಹೆಚ್ಚಿನ ಪಿಹೆಚ್ (pH) ಮಟ್ಟದ ಸಂಕೇತವಾಗಿದೆ.",
  "ಲೇಡಿಬಗ್ಸ್ ಮತ್ತು ಲೇಸ್‌ವಿಂಗ್ಸ್ ಜೇಡ ನುಸಿಗಳು ಹಾಗೂ ಗಿಡಹೇನುಗಳ ನೈಸರ್ಗಿಕ ಶತ್ರುಗಳು. ಅವು ಸಕ್ರಿಯವಾಗಿ ಕೀಟಗಳನ್ನು ತಿನ್ನುವಾಗ ರಾಸಾಯನಿಕಗಳನ್ನು ಸಿಂಪಡಿಸಬೇಡಿ."
];

// --- LOCALIZATION MAPS & HELPERS ---
const CROP_TRANSLATIONS = {
  "Jowar (Sorghum)": "ಜೋಳ (Jowar)",
  "Maize": "ಮೆಕ್ಕೆಜೋಳ (Maize)",
  "Bajra (Pearl Millet)": "ಸಜ್ಜೆ (Bajra)",
  "Wheat": "ಗೋಧಿ (Wheat)",
  "Cotton": "ಹತ್ತಿ (Cotton)",
  "Sugarcane": "ಕಬ್ಬು (Sugarcane)",
  "Red Gram (Tur)": "ತೊಗರಿ (Red Gram)",
  "Bengal Gram (Chickpea)": "ಕಡಲೆ (Bengal Gram)",
  "Green Gram (Moong)": "ಹೆಸರು (Green Gram)",
  "Black Gram (Urad)": "ಉದ್ದು (Black Gram)",
  "Groundnut": "ಶೇಂಗಾ (Groundnut)",
  "Sunflower": "ಸೂರ್ಯಕಾಂತಿ (Sunflower)",
  "Sesame": "ಎಳ್ಳು (Sesame)",
  "Chilli": "ಮೆಣಸಿನಕಾಯಿ (Chilli)",
  "Onion": "ಈರುಳ್ಳಿ (Onion)"
};

const DISEASE_TRANSLATIONS = {
  "Grain Mold": "ಧಾನ್ಯದ ಬೂಷ್ಟು",
  "Anthracnose": "ಅಂಥ್ರಾಕ್ನೋಸ್ (ಕಪ್ಪು ಚುಕ್ಕೆ ರೋಗ)",
  "Downy Mildew": "ಬೂದು ರೋಗ",
  "Rust": "ತುಕ್ಕು ರೋಗ",
  "Smut": "ಮಸಿ ರೋಗ",
  "Ergot": "ಜಿಗುಟು ರೋಗ (ಅರ್ಗಾಟ್)",
  "Charcoal Rot": "ಕರಿದಿಣ್ಣೆ ಕೊಳೆ ರೋಗ",
  "Leaf Blight": "ಎಲೆ ಕರಕು ರೋಗ",
  "Zonate Leaf Spot": "ವಲಯ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ",
  "Sooty Stripe": "ಮಸಿ ಪಟ್ಟಿ ರೋಗ",
  "Turcicum Leaf Blight": "ಟರ್ಸಿಕಮ್ ಎಲೆ ಕರಕು ರೋಗ",
  "Maydis Leaf Blight": "ಮೇಡಿಸ್ ಎಲೆ ಕರಕು ರೋಗ",
  "Common Rust": "ಸಾಮಾನ್ಯ ತುಕ್ಕು ರೋಗ",
  "Banded Leaf and Sheath Blight": "ಎಲೆ ಮತ್ತು ಪೊರೆ ಕರಕು ರೋಗ",
  "Stalk Rot": "ಕಾಂಡ ಕೊಳೆ ರೋಗ",
  "Ear Rot": "ತೆನೆ ಕೊಳೆ ರೋಗ",
  "Common Smut": "ಸಾಮಾನ್ಯ ಮಸಿ ರೋಗ",
  "Maize Streak Virus": "ಮೆಕ್ಕೆಜೋಳದ ಗೆರೆ ವೈರಸ್",
  "Downy Mildew (Green Ear)": "ಬೂದು ರೋಗ (ಹಸಿರು ತೆನೆ)",
  "Blast": "ಅಗ್ಗಿ ರೋಗ",
  "Leaf Spot": "ಎಲೆ ಚುಕ್ಕೆ ರೋಗ",
  "Stem Rust": "ಕಾಂಡದ ತುಕ್ಕು ರೋಗ",
  "Leaf Rust": "ಎಲೆಯ ತುಕ್ಕು ರೋಗ",
  "Stripe Rust": "ಪಟ್ಟೆಯ ತುಕ್ಕು ರೋಗ",
  "Loose Smut": "ಬಿಡಿ ಮಸಿ ರೋಗ",
  "Karnal Bunt": "ಕರ್ನಾಲ್ ಬಂಟ್ ರೋಗ",
  "Powdery Mildew": "ಬೂದಿ ರೋಗ",
  "Flag Smut": "ಧ್ವಜ ಮಸಿ ರೋಗ",
  "Spot Blotch": "ಸ್ಪಾಟ್ ಬ್ಲಾಚ್ ರೋಗ",
  "Fusarium Head Blight": "ಫ್ಯುಸೇರಿಯಮ್ ಹೆಡ್ ಬ್ಲೈಟ್",
  "Root Rot": "ಬೇರು ಕೊಳೆ ರೋಗ",
  "Bacterial Blight": "ಬ್ಯಾಕ್ಟೀರಿಯಾ ಕರಕು ರೋಗ",
  "Fusarium Wilt": "ಫ್ಯುಸೇರಿಯಮ್ ಒಣಗು ರೋಗ",
  "Verticillium Wilt": "ವರ್ಟಿಸಿಲಿಯಮ್ ಒಣಗು ರೋಗ",
  "Alternaria Leaf Spot": "ಆಲ್ಟರ್ನೇರಿಯಾ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ",
  "Grey Mildew": "ಬೂದು ರೋಗ",
  "Boll Rot": "ಕಾಯಿ ಕೊಳೆ ರೋಗ",
  "Leaf Curl Virus": "ಎಲೆ ಮುದುಡು ವೈರಸ್",
  "Tobacco Streak Virus": "ಹೊಗೆಸೊಪ್ಪು ಗೆರೆ ವೈರಸ್",
  "Red Rot": "ಕೆಂಪು ಕೊಳೆ ರೋಗ",
  "Wilt": "ಒಣಗು ರೋಗ",
  "Pokkah Boeng": "ಪೊಕ್ಕಾ ಬೋಯಿಂಗ್ ರೋಗ",
  "Grassy Shoot Disease": "ಹುಲ್ಲಿನ ಚಿಗುರು ರೋಗ",
  "Ratoon Stunting Disease": "ಕೂಳೆ ಕುಂಠಿತ ಬೆಳವಣಿಗೆ ರೋಗ",
  "Mosaic Disease": "ಮೊಸಾಯಿಕ್ ರೋಗ",
  "Eye Spot": "ಕಣ್ಣಿನ ಚುಕ್ಕೆ ರೋಗ",
  "Pineapple Disease": "ಅನಾನಸ್ ರೋಗ",
  "Sterility Mosaic Disease": "ಬಂಜೆತನ ಮೊಸಾಯಿಕ್ ರೋಗ",
  "Phytophthora Blight": "ಫೈಟಾಪ್ಥೋರಾ ಕರಕು ರೋಗ",
  "Dry Root Rot": "ಒಣ ಬೇರು ಕೊಳೆ ರೋಗ",
  "Alternaria Blight": "ಆಲ್ಟರ್ನೇರಿಯಾ ಕರಕು ರೋಗ",
  "Cercospora Leaf Spot": "ಸೆರ್ಕೋಸ್ಪೋರಾ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ",
  "Bacterial Leaf Spot": "ಬ್ಯಾಕ್ಟೀರಿಯಾ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ",
  "Ascochyta Blight": "ಆಸ್ಕೋಚೈಟಾ ಕರಕು ರೋಗ",
  "Collar Rot": "ಕೊರಳು ಕೊಳೆ ರೋಗ",
  "Botrytis Grey Mold": "ಬೊಟ್ರಿಟಿಸ್ ಬೂದು ಬೂಷ್ಟು",
  "Black Root Rot": "ಕಪ್ಪು ಬೇರು ಕೊಳೆ ರೋಗ",
  "Yellow Mosaic Virus": "ಹಳದಿ ಮೊಸಾಯಿಕ್ ವೈರಸ್",
  "Web Blight": "ವೆಬ್ ಬ್ಲೈಟ್ ರೋಗ",
  "Leaf Crinkle Disease": "ಎಲೆ ಸುಕ್ಕು ರೋಗ",
  "Tikka Leaf Spot (Early)": "ಟಿಕ್ಕಾ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ (ಮುಂಚಿನ)",
  "Tikka Leaf Spot (Late)": "ಟಿಕ್ಕಾ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ (ನಂತರದ)",
  "Stem Rot": "ಕಾಂಡ ಕೊಳೆ ರೋಗ",
  "Bud Necrosis Disease": "ಮೊಗ್ಗು ಕೊಳೆ ರೋಗ",
  "Peanut Stem Necrosis Disease": "ನೆಲಗಡಲೆ ಕಾಂಡ ಕೊಳೆ ರೋಗ",
  "Peanut Mosaic Virus": "ನೆಲಗಡಲೆ ಮೊಸಾಯಿಕ್ ವೈರಸ್",
  "Aspergillus Crown Rot": "ಆಸ್ಪರ್ಜಿಲಸ್ ಕ್ರೌನ್ ಕೊಳೆ ರೋಗ",
  "Head Rot": "ಹೂವಿನ ತೆನೆ ಕೊಳೆ ರೋಗ",
  "Necrosis Disease": "ನೆಕ್ರೋಸಿಸ್ ರೋಗ",
  "Phyllody": "ಎಲೆ ತರಹದ ಹೂವು ರೋಗ (ಫಿಲೋಡಿ)",
  "Anthracnose (Fruit Rot)": "ಅಂಥ್ರಾಕ್ನೋಸ್ (ಹಣ್ಣು ಕೊಳೆ ರೋಗ)",
  "Damping Off": "ಸಸಿ ಮಡಿ ಕೊಳೆ ರೋಗ",
  "Bacterial Wilt": "ಬ್ಯಾಕ್ಟೀರಿಯಾ ಒಣಗು ರೋಗ",
  "Dieback": "ಕೊನೆ ಒಣಗು ರೋಗ (ಡೈಬ್ಯಾಕ್)",
  "Purple Blotch": "ನೇರಳೆ ಚುಕ್ಕೆ ರೋಗ",
  "Stemphylium Blight": "ಸ್ಟೆಂಫಿಲಿಯಮ್ ಕರಕು ರೋಗ",
  "Basal Rot": "ಬುಡ ಕೊಳೆ ರೋಗ",
  "Neck Rot": "ಕುತ್ತಿಗೆ ಕೊಳೆ ರೋಗ",
  "White Rot": "ಬಿಳಿ ಕೊಳೆ ರೋಗ",
  "Pink Root Rot": "ಗುಲಾಬಿ ಬೇರು ಕೊಳೆ ರೋಗ",
  "Onion Blast": "ಈರುಳ್ಳಿ ಬ್ಲಾಸ್ಟ್ ರೋಗ",
  "Bacterial Soft Rot": "ಬ್ಯಾಕ್ಟೀರಿಯಾ ಮೃದು ಕೊಳೆ ರೋಗ",
  "Phytophthora capsici": "ಫೈಟಾಪ್ಥೋರಾ ಕ್ಯಾಪ್ಸಿಸಿ",
  "Early Blight": "ಮುಂಚಿನ ಕರಕು ರೋಗ",
  "Late Blight": "ನಂತರದ ಕರಕು ರೋಗ",
  "Bacterial Canker": "ಬ್ಯಾಕ್ಟೀರಿಯಾ ಕ್ಯಾಂಕರ್",
  "Fire Blight": "ಅಗ್ನಿ ಕರಕು ರೋಗ",
  "Yellow Leaf Curl": "ಹಳದಿ ಎಲೆ ಮುದುಡು",
  "Ringspot Virus": "ಉಂಗುರ ಚುಕ್ಕೆ ವೈರಸ್",
  "Root-Knot Nematode": "ಬೇರು ಗಂಟು ನೆಮಟೋಡ್",
  "Iron Chlorosis": "ಕಬ್ಬಿಣದ ಕೊರತೆಯ ಹಳದಿ ರೋಗ",
  "Nitrogen Deficiency": "ಸಾರಜನಕದ ಕೊರತೆ",
  "Magnesium Deficiency": "ಮೆಗ್ನೀಸಿಯಮ್ ಕೊರತೆ",
  "Calcium Deficiency (Blossom End Rot)": "ಕ್ಯಾಲ್ಸಿಯಂ ಕೊರತೆ (ಬ್ಲಾಸಮ್ ಎಂಡ್ ಕೊಳೆ ರೋಗ)",
  "Spider Mite Infestation": "ಜೇಡ ನುಸಿ ಬಾಧೆ",
  "Aphid Infestation": "ಗಿಡಹೇನು ಬಾಧೆ",
  "Whitefly Infestation": "ಬಿಳಿ ನೊಣ ಬಾಧೆ",
  "Abiotic Stress": "ಅಜೈವಿಕ ಒತ್ತಡ"
};

// --- SYMPTOM TRANSLATIONS IN KANNADA ---
const SYMPTOM_TRANSLATIONS = {
  "White powdery patches on leaves": "ಎಲೆಗಳ ಮೇಲೆ ಬಿಳಿ ಬೂದಿ ತರಹದ ಕಲೆಗಳು",
  "Circular spots with yellow halos": "ಹಳದಿ ವಲಯ ಹೊಂದಿರುವ ವೃತ್ತಾಕಾರದ ಕಲೆಗಳು",
  "Brown spots with concentric rings": "ಕೇಂದ್ರೀಕೃತ ವಲಯಗಳನ್ನು ಹೊಂದಿರುವ ಕಂದು ಕಲೆಗಳು",
  "Greasy, water-soaked dark lesions": "ಜಿಡ್ಡಿನ, ನೀರಿನಿಂದ ಒದ್ದೆಯಾದ ಕಪ್ಪು ಕಲೆಗಳು",
  "Leaves curling and yellowing": "ಎಲೆಗಳು ಮುದುಡುವುದು ಮತ್ತು ಹಳದಿಯಾಗುವುದು",
  "Sunken dark spots on pods/fruit": "ಕಾಯಿ/ಹಣ್ಣುಗಳ ಮೇಲೆ ಹೂತ ಕಪ್ಪು ಕಲೆಗಳು",
  "Orange-brown rust pustules on leaves": "ಎಲೆಗಳ ಮೇಲೆ ಕಿತ್ತಳೆ-ಕಂದು ತುಕ್ಕು ಗುಳ್ಳೆಗಳು",
  "Loose black powder on grain heads": "ಧಾನ್ಯದ ಕದಿರುಗಳಲ್ಲಿ ಸಡಿಲವಾದ ಕಪ್ಪು ಪುಡಿ",
  "Sudden wilting or drying of plant": "ಗಿಡಗಳು ಧಿಡೀರ್ ಒಣಗುವುದು ಅಥವಾ ಬಾಡುವುದು",
  "Water-soaked red tissue in stems": "ಕಾಂಡಗಳಲ್ಲಿ ನೀರಿನಿಂದ ಒದ್ದೆಯಾದ ಕೆಂಪು ಅಂಗಾಂಶ"
};

const STATE_TRANSLATIONS = {
  "Maharashtra": "ಮಹಾರಾಷ್ಟ್ರ",
  "Karnataka": "ಕರ್ನಾಟಕ",
  "Punjab": "ಪಂಜಾಬ್",
  "Rajasthan": "ರಾಜಸ್ಥಾನ",
  "Gujarat": "ಗುಜರಾತ್",
  "Andhra Pradesh": "ಆಂಧ್ರಪ್ರದೇಶ",
  "Uttar Pradesh": "ಉತ್ತರ ಪ್ರದೇಶ",
  "West Bengal": "ಪಶ್ಚಿಮ ಬಂಗಾಳ"
};

const SOIL_TRANSLATIONS = {
  "Deep Black Clayey Soil (Regur)": "ಆಳವಾದ ಕಪ್ಪು ಜೇಡಿಮಣ್ಣು (ರೆಗುರ್ ಮಣ್ಣು)",
  "Red Sandy-Loam Soil": "ಕೆಂಪು ಮರಳು-ಲೋಮ್ ಮಣ್ಣು",
  "Alluvial Fertile Silt": "ನದಿಮುಖಜ ಫಲವತ್ತಾದ ಕಲಿಲ ಮಣ್ಣು (ಅಲ್ಲುವಿಯಲ್ ಮಣ್ಣು)",
  "Arid Sandy Desert Soil": "ಶುಷ್ಕ ಮರಳು ಮರುಭೂಮಿ ಮಣ್ಣು",
  "Sandy Clay Loam (Goradu)": "ಮರಳು ಜೇಡಿ ಲೋಮ್ (ಗೊರಾಡು ಮಣ್ಣು)",
  "Red Clayey & Laterite Soil": "ಕೆಂಪು ಜೇಡಿಮಣ್ಣು ಮತ್ತು ಲ್ಯಾಟರೈಟ್ ಮಣ್ಣು",
  "Deep Alluvial Loam": "ಆಳವಾದ ಫಲವತ್ತಾದ ಹೂಳು ಮಣ್ಣು",
  "Heavy Clayey & Alluvial Silt": "ಭಾರವಾದ ಜೇಡಿಮಣ್ಣು ಮತ್ತು ಫಲವತ್ತಾದ ಹೂಳು ಮಣ್ಣು"
};

const PROPERTIES_TRANSLATIONS = {
  "High clay content, excellent moisture retention, rich in iron, calcium, lime, and potash. Low in nitrogen and phosphorus.": "ಹೆಚ್ಚಿನ ಜೇಡಿ ಅಂಶ, ಅತ್ಯುತ್ತಮ ತೇವಾಂಶ ಧಾರಣ ಶಕ್ತಿ, ಕಬ್ಬಿಣ, ಕ್ಯಾಲ್ಸಿಯಂ, ಸುಣ್ಣ ಮತ್ತು ಪೊಟ್ಯಾಶ್‌ನಿಂದ ಸಮೃದ್ಧವಾಗಿದೆ. ಸಾರಜನಕ ಮತ್ತು ರಂಜಕದಲ್ಲಿ ಕಡಿಮೆ ಇದೆ.",
  "Well-drained, acidic to neutral pH, rich in iron and aluminum oxides, moderate organic matter, high aeration.": "ಉತ್ತಮ ನೀರು ಬಸಿಯುವಿಕೆ, ಆಮ್ಲೀಯದಿಂದ ತಟಸ್ಥ pH, ಕಬ್ಬಿಣ ಮತ್ತು ಅಲ್ಯೂಮಿನಿಯಂ ಆಕ್ಸೈಡ್‌ಗಳಿಂದ ಸಮೃದ್ಧವಾಗಿದೆ, ಮಧ್ಯಮ ಸಾವಯವ ಪದಾರ್ಥ, ಹೆಚ್ಚಿನ ಗಾಳಿಯಾಡುವಿಕೆ.",
  "Extremely fertile, deep sandy-silt loam, neutral pH, high nutrient availability, rich in organic matter.": "ಅತ್ಯಂತ ಫಲವತ್ತಾದ, ಆಳವಾದ ಮರಳು-ಹೂಳು ಲೋಮ್, ತಟಸ್ಥ pH, ಹೆಚ್ಚಿನ ಪೋಷಕಾಂಶಗಳ ಲಭ್ಯತೆ, ಸಾವಯವ ಪದಾರ್ಥಗಳಿಂದ ಸಮೃದ್ಧವಾಗಿದೆ.",
  "Coarse textured, highly porous, very low organic matter, highly alkaline pH, low water retention capability.": "ಒರಟು ವಿನ್ಯಾಸ, ಹೆಚ್ಚು ರಂಧ್ರಯುಕ್ತ, ಕಡಿಮೆ ಸಾವಯವ ಪದಾರ್ಥಗಳು, ಹೆಚ್ಚು ಕ್ಷಾರೀಯ pH, ಕಡಿಮೆ ನೀರು ಹಿಡಿದಿಟ್ಟುಕೊಳ್ಳುವ ಸಾಮರ್ಥ್ಯ.",
  "Well-drained sandy loam, rich in organic matter, high potash content, neutral to slightly alkaline pH.": "ಉತ್ತಮ ನೀರು ಬಸಿಯುವ ಮರಳು ಲೋಮ್, ಸಾವಯವ ಪದಾರ್ಥಗಳಿಂದ ಸಮೃದ್ಧವಾಗಿದೆ, ಹೆಚ್ಚಿನ ಪೊಟ್ಯಾಶ್ ಅಂಶ, ತಟಸ್ಥದಿಂದ ಸ್ವಲ್ಪ ಕ್ಷಾರೀಯ pH.",
  "Slightly acidic, moderate nitrogen, low phosphorus, good drainage, medium moisture retention.": "ಸ್ವಲ್ಪ ಆಮ್ಲೀಯ, ಮಧ್ಯಮ ಸಾರಜನಕ, ಕಡಿಮೆ ರಂಜಕ, ಉತ್ತಮ ಒಳಚರಂಡಿ, ಮಧ್ಯಮ ತೇವಾಂಶ ಧಾರಣ ಶಕ್ತಿ.",
  "Highly fertile, rich in potash and lime, moderate phosphorus, well-aerated with good drainage.": "ಅತ್ಯಂತ ಫಲವತ್ತಾದ, ಪೊಟ್ಯಾಶ್ ಮತ್ತು ಸುಣ್ಣದಿಂದ ಸಮೃದ್ಧವಾಗಿದೆ, ಮಧ್ಯಮ ರಂಜಕ, ಉತ್ತಮ ಒಳಚರಂಡಿಯೊಂದಿಗೆ ಗಾಳಿಯಾಡುವಿಕೆ.",
  "High organic content, slightly acidic to neutral, excellent water logging capability suitable for paddy.": "ಹೆಚ್ಚಿನ ಸಾವಯವ ಅಂಶ, ಸ್ವಲ್ಪ ಆಮ್ಲೀಯದಿಂದ ತಟಸ್ಥ pH, ಭತ್ತದ ಬೆಳೆಗೆ ಸೂಕ್ತವಾದ ಅತ್ಯುತ್ತಮ ನೀರು ನಿಲ್ಲುವ ಸಾಮರ್ಥ್ಯ."
};

const REASON_TRANSLATIONS = {
  "Black soil retains moisture perfectly for cotton taproots during rainfall breaks.": "ಮಳೆ ಬಿಡುವಿನ ಅವಧಿಯಲ್ಲಿ ಹತ್ತಿ ಗಿಡದ ಬೇರುಗಳಿಗೆ ಕಪ್ಪು ಮಣ್ಣು ತೇವಾಂಶವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಕಾಯ್ದಿರಿಸುತ್ತದೆ.",
  "Highly drought resistant, thrives in clayey moisture-holding soil.": "ಅತಿ ಬರ ನಿರೋಧಕವಾಗಿದ್ದು, ತೇವಾಂಶವನ್ನು ಹಿಡಿದಿಟ್ಟುಕೊಳ್ಳುವ ಜೇಡಿಮಣ್ಣಿನಲ್ಲಿ ಚೆನ್ನಾಗಿ ಬೆಳೆಯುತ್ತದೆ.",
  "Excellent in well-drained sandy-loam black soils.": "ಉತ್ತಮ ನೀರು ಬಸಿಯುವ ಮರಳು-ಲೋಮ್ ಕಪ್ಪು ಮಣ್ಣಿನಲ್ಲಿ ಅತ್ಯುತ್ತಮವಾಗಿ ಬೆಳೆಯುತ್ತದೆ.",
  "Requires moderate warmth and loamy clay beds.": "ಮಧ್ಯಮ ಉಷ್ಣತೆ ಮತ್ತು ಲೋಮಿ ಜೇಡಿಮಣ್ಣಿನ ಬೆಡ್ ಅವಶ್ಯಕತೆ ಇದೆ.",
  "Residual moisture in clayey black soil supports winter chickpea growth without heavy irrigation.": "ಕಪ್ಪು ಜೇಡಿಮಣ್ಣಿನಲ್ಲಿ ಉಳಿದಿರುವ ತೇವಾಂಶವು ಹೆಚ್ಚಿನ ನೀರಾವರಿ ಇಲ್ಲದೆಯೇ ಚಳಿಗಾಲದ ಕಡಲೆ ಬೆಳವಣಿಗೆಯನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ.",
  "Good winter crop if supplementary irrigation is provided.": "ಪೂರಕ ನೀರಾವರಿ ಒದಗಿಸಿದರೆ ಉತ್ತಮ ಚಳಿಗಾಲದ ಬೆಳೆಯಾಗಿದೆ.",
  "Short duration crop that replenishes nitrogen before the Kharif season.": "ಖಾರಿಫ್ ಹಂಗಾಮಿಗಿಂತ ಮೊದಲು ಸಾರಜನಕವನ್ನು ಮಣ್ಣಿಗೆ ಮರುಪೂರಣ ಮಾಡುವ ಅಲ್ಪಾವಧಿ ಬೆಳೆಯಾಗಿದೆ.",
  "Thrives in red loams with light irrigation; drought-hardy.": "ಲಘು ನೀರಾವರಿಯೊಂದಿಗೆ ಕೆಂಪು ಲೋಮ್ ಮಣ್ಣಿನಲ್ಲಿ ಚೆನ್ನಾಗಿ ಬೆಳೆಯುತ್ತದೆ; ಬರ ನಿರೋಧಕವಾಗಿದೆ.",
  "Ideal for high temperature and light sandy loam beds.": "ಹೆಚ್ಚಿನ ತಾಪಮಾನ ಮತ್ತು ಲಘು ಮರಳು ಮಿಶ್ರಿತ ಲೋಮ್ ಮಣ್ಣಿಗೆ ಸೂಕ್ತವಾಗಿದೆ.",
  "Deep taproots tap into lower soil layers; rich in nutrients.": "ಆಳವಾದ ಬೇರುಗಳು ಮಣ್ಣಿನ ಕೆಳಗಿನ ಪದರಗಳಿಂದ ಪೋಷಕಾಂಶಗಳನ್ನು ಹೀರುತ್ತವೆ.",
  "Grown under intensive organic input during warm summers.": "ಬೆಚ್ಚಗಿನ ಬೇಸಿಗೆಯಲ್ಲಿ ತೀವ್ರ ಸಾವಯವ ಗೊಬ್ಬರಗಳ ಬಳಕೆಯೊಂದಿಗೆ ಬೆಳೆಯಲಾಗುತ್ತದೆ.",
  "Prefers cool winter nights and neutral sandy loam fields.": "ತಂಪಾದ ಚಳಿಗಾಲದ ರಾತ್ರಿಗಳು ಮತ್ತು ತಟಸ್ಥ ಮರಳು ಲೋಮ್ ಜಮೀನುಗಳನ್ನು ಬಯಸುತ್ತದೆ.",
  "Performs best in fertile, well-aerated sandy clay.": "ಫಲವತ್ತಾದ, ಉತ್ತಮ ಗಾಳಿಯಾಡುವ ಮರಳು ಜೇಡಿಮಣ್ಣಿನಲ್ಲಿ ಉತ್ತಮವಾಗಿ ಬೆಳೆಯುತ್ತದೆ.",
  "Short summer legume that improves soil fertility via root nodules.": "ಬೇರು ಗಂಟುಗಳ ಮೂಲಕ ಮಣ್ಣಿನ ಫಲವತ್ತತೆಯನ್ನು ಸುಧಾರಿಸುವ ಅಲ್ಪಾವಧಿ ಬೇಸಿಗೆ ದ್ವಿದಳ ಧಾನ್ಯ.",
  "Grows best under high rainfall or heavy flood irrigation; loves deep silt.": "ಭಾರೀ ಮಳೆ ಅಥವಾ ಪ್ರವಾಹ ನೀರಾವರಿಯಲ್ಲಿ ಚೆನ್ನಾಗಿ ಬೆಳೆಯುತ್ತದೆ; ಆಳವಾದ ಹೂಳು ಮಣ್ಣು ಅತ್ಯಂತ ಸೂಕ್ತ.",
  "Thrives in hot, humid summers with sandy-silt beds.": "ಮರಳು-ಹೂಳು ಮಿಶ್ರಿತ ಮಣ್ಣಿನಲ್ಲಿ ಬಿಸಿ ಮತ್ತು ಆರ್ದ್ರ ಬೇಸಿಗೆಯಲ್ಲಿ ಚೆನ್ನಾಗಿ ಬೆಳೆಯುತ್ತದೆ.",
  "Grown in winter with high nitrogen fertilizers; loves alluvial moisture.": "ಹೆಚ್ಚಿನ ಸಾರಜನಕ ಗೊಬ್ಬರಗಳೊಂದಿಗೆ ಚಳಿಗಾಲದಲ್ಲಿ ಬೆಳೆಯಲಾಗುತ್ತದೆ; ಹೂಳು ಮಣ್ಣಿನ ತೇವಾಂಶ ಸೂಕ್ತ.",
  "Thrives in dry, warm environments with light texture.": "ಲಘು ವಿನ್ಯಾಸದ ಒಣ, ಬೆಚ್ಚಗಿನ ವಾತಾವರಣದಲ್ಲಿ ಚೆನ್ನಾಗಿ ಬೆಳೆಯುತ್ತದೆ.",
  "Needs high heat index and sandy clay bed.": "ಹೆಚ್ಚಿನ ತಾಪಮಾನ ಮತ್ತು ಮರಳು ಜೇಡಿಮಣ್ಣಿನ ಅವಶ್ಯಕತೆ ಇದೆ.",
  "Excellent rotation crop; nitrogen fixer.": "ಅತ್ಯುತ್ತಮ ಸರದಿ ಬೆಳೆ; ಸಾರಜನಕವನ್ನು ಸ್ಥಿರೀಕರಿಸುತ್ತದೆ.",
  "Fast growing, drought-resistant winter crop.": "ವೇಗವಾಗಿ ಬೆಳೆಯುವ, ಬರ ನಿರೋಧಕ ಚಳಿಗಾಲದ ಬೆಳೆ.",
  "High salinity tolerance; ideal for dry loams.": "ಹೆಚ್ಚಿನ ಲವಣಾಂಶ ಸಹಿಷ್ಣುತೆ; ಒಣ ಲೋಮ್ ಮಣ್ಣಿಗೆ ಸೂಕ್ತವಾಗಿದೆ.",
  "Requires moderate drainage and organic nitrogen dressings.": "ಮಧ್ಯಮ ನೀರು ಬಸಿಯುವಿಕೆ ಮತ್ತು ಸಾವಯವ ಸಾರಜನಕದ ಅಗತ್ಯವಿದೆ.",
  "Excellent winter crop; high sugar yields in sandy clay.": "ಅತ್ಯುತ್ತಮ ಚಳಿಗಾಲದ ಬೆಳೆ; ಮರಳು ಜೇಡಿಮಣ್ಣಿನಲ್ಲಿ ಹೆಚ್ಚಿನ ಸಕ್ಕರೆ ಇಳುವರಿ ನೀಡುತ್ತದೆ.",
  "Deep root zone needs neutral pH.": "ಬೇರುಗಳ ಆಳವಾದ ಬೆಳವಣಿಗೆಗೆ ತಟಸ್ಥ pH ನ ಅಗತ್ಯವಿದೆ.",
  "Thrives in alluvial delta flats; high water need.": "ಫಲವತ್ತಾದ ನದಿ ಬಯಲು ಪ್ರದೇಶಗಳಲ್ಲಿ ಚೆನ್ನಾಗಿ ಬೆಳೆಯುತ್ತದೆ; ಹೆಚ್ಚಿನ ನೀರಿನ ಅಗತ್ಯವಿದೆ.",
  "Deep clay soil provides excellent water storage for sugarcane roots.": "ಕಪ್ಪು ಜೇಡಿಮಣ್ಣು ಕಬ್ಬಿನ ಬೇರುಗಳಿಗೆ ಅತ್ಯುತ್ತಮ ನೀರಿನ ಸಂಗ್ರಹಣೆಯನ್ನು ಒದಗಿಸುತ್ತದೆ.",
  "Grows well in deltaic alluvial margins.": "ನದಿಮುಖಜ ಫಲವತ್ತಾದ ಮಣ್ಣಿನ ಅಂಚುಗಳಲ್ಲಿ ಚೆನ್ನಾಗಿ ಬೆಳೆಯುತ್ತದೆ.",
  "Thrives in well-drained silty loams.": "ಉತ್ತಮ ನೀರು ಬಸಿಯುವ ಹೂಳು ಮಿಶ್ರಿತ ಲೋಮ್ ಮಣ್ಣಿನಲ್ಲಿ ಚೆನ್ನಾಗಿ ಬೆಳೆಯುತ್ತದೆ.",
  "Outstanding performance in alluvial silts of river beds.": "ನದಿ ಪಾತ್ರದ ಹೂಳು ಮಿಶ್ರಿತ ಫಲವತ್ತಾದ ಮಣ್ಣಿನಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಇಳುವರಿ ನೀಡುತ್ತದೆ.",
  "Grown under light irrigation in northern alluvial planes.": "ಉತ್ತರ ಭಾರತದ ಫಲವತ್ತಾದ ಬಯಲು ಪ್ರದೇಶಗಳಲ್ಲಿ ಲಘು ನೀರಾವರಿಯೊಂದಿಗೆ ಬೆಳೆಯಲಾಗುತ್ತದೆ.",
  "Very popular pulse grown in moist post-harvest paddy fields.": "ಭತ್ತದ ಕೊಯ್ಲಿನ ನಂತರ ಒದ್ದೆಯಾದ ಗದ್ದೆಗಳಲ್ಲಿ ಬೆಳೆಯುವ ಅತ್ಯಂತ ಜನಪ್ರಿಯ ದ್ವಿದಳ ಧಾನ್ಯ.",
  "Grows quickly in warm summer silt.": "ಬೆಚ್ಚಗಿನ ಬೇಸಿಗೆಯ ಹೂಳು ಮಣ್ಣಿನಲ್ಲಿ ವೇಗವಾಗಿ ಬೆಳೆಯುತ್ತದೆ."
};

const SEASON_TRANSLATIONS = {
  "Kharif (Monsoon)": "ಖಾರಿಫ್ (ಮುಂಗಾರು)",
  "Rabi (Winter)": "ರಬಿ (ಹಿಂಗಾರು)",
  "Zaid (Summer)": "ಜೈದ್ (ಬೇಸಿಗೆ)"
};

const UI_TRANSLATIONS = {
  en: {
    dashboard_panel: "Dashboard Panel",
    scan_panel: "Diagnostic Scan Panel",
    encyclopedia_panel: "Encyclopedia Panel",
    history_panel: "Scan History Panel",
    analytics_panel: "Analytics Panel",
    fields_panel: "My Fields Panel",
    settings_panel: "Settings Panel",
    "crop-advisor_panel": "Crop Advisor Panel",
    
    sidebar_dashboard: "Dashboard",
    sidebar_scan: "Diagnostic Scan",
    sidebar_encyclopedia: "Encyclopedia",
    sidebar_history: "Scan History",
    sidebar_analytics: "Analytics",
    sidebar_fields: "My Fields",
    sidebar_crop_advisor: "Crop Advisor",
    sidebar_settings: "Settings",
    sidebar_collapse: "<< Collapse",
    sidebar_expand: ">>",
    
    good_morning: "Good morning",
    good_afternoon: "Good afternoon",
    good_evening: "Good evening",
    welcome_sub: "The agricultural lab is online. Ready to evaluate crops, weeds, or diagnostic samples.",
    total_scans: "Total Scans",
    diseases_solved: "Diseases Solved",
    fields_tracked: "Fields Tracked",
    
    diagnostic_engine: "Diagnostic Engine",
    diagnostic_desc: "Run immediate analysis on infected plant leaves, crop stems, or roots. Upload images or run live macro capture.",
    init_new_scan: "Initialize New Scan",
    
    tip_day: "Tip of the Day",
    dr_angio_title: "Dr. Angio, Plant Pathologist",
    
    seasonal_weather_risk: "Seasonal Weather Risk",
    current_season: "Current Season:",
    temp_c: "TEMP (°C)",
    humid_pct: "HUMIDITY (%)",
    evaluate_risk: "Evaluate Risk",
    infection_risk: "Infection Risk:",
    high_risk_crops: "High risk crops:",
    
    recent_diagnoses: "Recent Lab Diagnoses",
    no_recent_scans: "No recent crop scans detected. Complete a scan to populate history.",
    plant_label: "Plant:",
    confidence_label: "Confidence:",
    report_btn: "Report",
    
    my_fields_status: "My Fields Status",
    manage_fields_btn: "Manage Fields",
    
    status_healthy: "Healthy",
    status_at_risk: "At Risk",
    status_sick: "Sick",
    scans_count: "scans",
    
    specimen_rejected: "Specimen Rejected",
    reinit_scan: "Re-initialize Specimen Scan",
    init_plant_diagnosis: "Initialize Plant Diagnosis",
    demo_mode_active: "Demo Mode Active:",
    demo_mode_desc: "Running diagnostics with mock engine. For real-world leaf scans and high-precision visual analysis, configure your",
    demo_mode_link: "Anthropic Claude API Key in Settings",
    select_host_species: "SELECT HOST PLANT SPECIES",
    unknown_plant: "Unknown Plant",
    simulate_invalid_specimen: "Simulate Invalid Specimen",
    unknown_placeholder: "Species will be identified by AI pathology",
    known_placeholder: "Start typing plant name (e.g. Wheat, Sugarcane, Jowar)",
    symptoms_checklist_label: "OBSERVED PLANT SYMPTOMS (OPTIONAL - FOR ACCURATE PATHOLOGY MATCHING)",
    front_camera_title: "🔍 Front Camera",
    front_camera_desc: "Macro spot / lesion details",
    rear_camera_title: "🌿 Rear Camera",
    rear_camera_desc: "Environment canopy perspective",
    drag_drop_title: "Drag and Drop specimen files",
    drag_drop_desc: "Accepts JPG, PNG, WEBP (Max 10MB each, up to 3 specs)",
    browse_files: "Browse Files",
    uploaded_label: "Uploaded",
    no_files_uploaded: "No files uploaded yet",
    start_analysis: "Start Pathology Analysis",
    analyzing_specimen: "Analyzing Specimen...",
    
    diagnostic_report_title: "Crop Pathology Diagnosis Report",
    disease_identity: "DISEASE IDENTITY",
    scientific_name: "SCIENTIFIC NAME",
    category_label: "PATHOGEN CATEGORY",
    confidence_rating: "CONFIDENCE RATING",
    severity_level: "SEVERITY LEVEL",
    spread_risk_label: "SPREAD RISK",
    affected_organs: "AFFECTED ORGANS",
    observed_symptoms: "OBSERVED SYMPTOMS",
    pathogen_cause: "PATHOGENIC CAUSE",
    disease_description: "DISEASE DESCRIPTION",
    if_untreated_label: "IF LEFT UNTREATED",
    recovery_timeline_label: "RECOVERY TIMELINE",
    expert_pathology_tip: "EXPERT PATHOLOGY TIP",
    follow_up_instructions: "FOLLOW-UP CARE INSTRUCTIONS",
    similar_pathologies: "SIMILAR PATHOLOGIES",
    
    treatment_plan: "TREATMENT PLAN",
    immediate_actions: "IMMEDIATE BIOLOGICAL ACTIONS",
    chemical_treatments: "RECOMMENDED CHEMICAL TREATMENTS",
    organic_alternatives: "ORGANIC & BIOLOGICAL ALTERNATIVES",
    preventive_measures: "PREVENTIVE MEASURES & HYGIENE",
    chemical_name: "Chemical Name",
    active_ingredient: "Active Ingredient",
    dosage: "Dosage",
    application_method: "Application Method",
    frequency: "Frequency",
    safety_precautions: "Safety Precautions",
    approximate_cost: "Approximate Cost",
    remedy_label: "Remedy",
    preparation: "Preparation",
    application: "Application",
    
    save_to_field: "SAVE TO FIELD LOG",
    select_field: "Select Field...",
    save_report_btn: "Save Report to History",
    saved_badge: "Saved ✅",
    discard_report: "Discard & Reset",
    
    catalog_title: "🌾 Crop Disease Encyclopedia",
    catalog_desc: "Search and study all 150 crop-specific diseases, their prevention measures, and local treatments.",
    search_placeholder: "Search diseases by name, plant, or scientific name...",
    all_crops: "All Crops",
    all_categories: "All Categories",
    disease_details: "Disease Details",
    close_details: "Close Details",
    
    lab_history_title: "📋 Lab Diagnostic History Log",
    lab_history_desc: "Access and review previously saved agricultural scans, crop reports, and fields logging.",
    search_history_placeholder: "Search history by crop or disease...",
    clear_history_btn: "Clear Entire History",
    no_history: "No reports found in history.",
    
    fields_title: "🗺️ My Farm Fields Layout",
    fields_desc: "Track health states, crop types, and acreage logs for your individual field blocks.",
    add_field_btn: "Add New Field",
    field_name_placeholder: "Field Name (e.g. North Ridge, River Valley)",
    acreage_label: "Acreage (Acres)",
    soil_type_label: "Soil Type (e.g. Clay, Sandy, Loam)",
    select_crop: "Select Crop...",
    select_season: "Select Season...",
    cancel_btn: "Cancel",
    confirm_add_field: "Create Field Block",
    field_history_log: "FIELD SCAN HISTORY",
    delete_field: "Delete Field",
    no_fields: "No fields created yet. Create a field block above to track status.",
    
    geo_advisor_title: "🌾 Geo-Agricultural Crop & Soil Advisor",
    geo_advisor_desc: "Leverage live location tracking to identify local soil profiles, typical regional crops, and optimal planting suitability scores.",
    auto_detect_location: "Auto-Detect Location",
    locating_farm: "Locating Farm...",
    simulate_region: "SIMULATE REGION",
    gps_latitude: "GPS LATITUDE",
    gps_longitude: "GPS LONGITUDE",
    accuracy_status: "ACCURACY STATUS",
    satellite_resolved: "Satellite Resolved ✅",
    live_farm_grid: "📍 Live Local Farm Grid",
    local_soil_profile: "Local Soil Profile:",
    soil_type_classification: "SOIL TYPE CLASSIFICATION",
    soil_properties: "PHYSICAL & CHEMICAL PROPERTIES",
    primary_crops_grown: "Primary Crops Grown in",
    crops_grown_desc: "These agricultural crops represent the current dominant agricultural footprint in this geographic soil zone:",
    seasonal_suitability: "Seasonal Planting Suitability",
    suitability_desc: "Detailed suitability compatibility ratings calculated dynamically based on regional soil chemistry and seasonal heat index profiles.",
    planting_cycle: "Planting Cycle",
    
    settings_title: "⚙️ Lab Settings & Configuration",
    settings_desc: "Manage user profiles, theme properties, diagnostic engine endpoints, and local backup records.",
    profile_settings: "Farmer Profile Settings",
    name_label: "Full Name",
    email_label: "Email Address",
    role_label: "Farmer/Botanist Role",
    location_label: "Farm Location/Region",
    theme_preferences: "Theme & Styling Preferences",
    dark_mode: "Dark Theme",
    light_mode: "Light Theme",
    diagnostic_engine_config: "Diagnostic AI Engine Config",
    api_mode_label: "AI Diagnostic Analysis Mode",
    api_key_label: "Anthropic Claude API Key",
    api_key_desc: "Enables production visual leaf scan analysis with Anthropic's Claude 3.5 Sonnet.",
    proxy_url_label: "Proxy Server URL (Optional)",
    treatment_preferences: "Report Treatment Preferences",
    notif_preferences: "Notification Preferences",
    danger_zone: "Danger Zone & Data Resets",
    delete_account_btn: "Permanently Delete Account",
    confirm_delete_account: "Yes, delete my entire account and history",
    
    doctor_title: "Dr. Angio (Plant Pathologist)",
    chat_placeholder: "Ask Dr. Angio about crop diseases, remedies...",
    send_btn: "Send",
    clear_chat: "Reset Lab Conversation",
    welcome_chat: "Hello! I am Dr. Angio, your virtual agricultural pathologist. Ask me about your crops, soils, or diseases.",
    
    saved_success: "Report saved to history successfully!",
    field_saved: "Report logged to field successfully!",
    field_added: "New field block created successfully!",
    field_deleted: "Field block deleted.",
    location_success: "Location resolved successfully!",
    location_failed: "Location detection failed."
  },
  kn: {
    dashboard_panel: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪ್ಯಾನಲ್",
    scan_panel: "ರೋಗನಿರ್ಣಯ ಸ್ಕ್ಯಾನ್ ಪ್ಯಾನಲ್",
    encyclopedia_panel: "ಬೆಳೆ ವಿಶ್ವಕೋಶ ಪ್ಯಾನಲ್",
    history_panel: "ಸ್ಕ್ಯಾನ್ ಇತಿಹಾಸ ಪ್ಯಾನಲ್",
    analytics_panel: "ವಿಶ್ಲೇಷಣೆ ಪ್ಯಾನಲ್",
    fields_panel: "ನನ್ನ ಜಮೀನುಗಳು ಪ್ಯಾನಲ್",
    settings_panel: "ಸೆಟ್ಟಿಂಗ್ಸ್ ಪ್ಯಾನಲ್",
    "crop-advisor_panel": "ಬೆಳೆ ಸಲಹೆಗಾರ ಪ್ಯಾನಲ್",
    
    sidebar_dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    sidebar_scan: "ರೋಗನಿರ್ಣಯ ಸ್ಕ್ಯಾನ್",
    sidebar_encyclopedia: "ಬೆಳೆ ವಿಶ್ವಕೋಶ",
    sidebar_history: "ಸ್ಕ್ಯಾನ್ ಇತಿಹಾಸ",
    sidebar_analytics: "ವಿಶ್ಲೇಷಣೆ",
    sidebar_fields: "ನನ್ನ ಜಮೀನುಗಳು",
    sidebar_crop_advisor: "ಬೆಳೆ ಸಲಹೆಗಾರ",
    sidebar_settings: "ಸೆಟ್ಟಿಂಗ್ಸ್",
    sidebar_collapse: "<< ಕುಗ್ಗಿಸು",
    sidebar_expand: ">>",
    
    good_morning: "ಶುಭೋದಯ",
    good_afternoon: "ಶುಭ ಮಧ್ಯಾಹ್ನ",
    good_evening: "ಶುಭ ಸಂಜೆ",
    welcome_sub: "ಕೃಷಿ ಪ್ರಯೋಗಾಲಯವು ಸಕ್ರಿಯವಾಗಿದೆ. ಬೆಳೆಗಳು, ಕಳೆಗಳು ಅಥವಾ ರೋಗನಿರ್ಣಯದ ಮಾದರಿಗಳನ್ನು ಪರೀಕ್ಷಿಸಲು ಸಿದ್ಧವಾಗಿದೆ.",
    total_scans: "ಒಟ್ಟು ಸ್ಕ್ಯಾನ್‌ಗಳು",
    diseases_solved: "ಪರಿಹರಿಸಲಾದ ರೋಗಗಳು",
    fields_tracked: "ಟ್ರ್ಯಾಕ್ ಮಾಡಿದ ಜಮೀನುಗಳು",
    
    diagnostic_engine: "ರೋಗನಿರ್ಣಯ ಇಂಜಿನ್",
    diagnostic_desc: "ಸೋಂಕಿತ ಸಸ್ಯದ ಎಲೆಗಳು, ಕಾಂಡಗಳು ಅಥವಾ ಬೇರುಗಳ ತಕ್ಷಣದ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಚಲಾಯಿಸಿ. ಚಿತ್ರಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಲೈವ್ ಕ್ಯಾಪ್ಚರ್ ಮಾಡಿ.",
    init_new_scan: "ಹೊಸ ಸ್ಕ್ಯಾನ್ ಪ್ರಾರಂಭಿಸಿ",
    
    tip_day: "ದಿನದ ಸಲಹೆ",
    dr_angio_title: "ಡಾ. ಆಂಜಿಯೋ, ಸಸ್ಯ ರೋಗಶಾಸ್ತ್ರಜ್ಞರು",
    
    seasonal_weather_risk: "ಹವಾಮಾನ ಆಧಾರಿತ ರೋಗದ ಅಪಾಯ",
    current_season: "ಪ್ರಸ್ತುತ ಋತು:",
    temp_c: "ತಾಪಮಾನ (°C)",
    humid_pct: "ಆರ್ದ್ರತೆ (%)",
    evaluate_risk: "ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ ಮಾಡಿ",
    infection_risk: "ಸೋಂಕಿನ ಅಪಾಯ:",
    high_risk_crops: "ಹೆಚ್ಚಿನ ಅಪಾಯವಿರುವ ಬೆಳೆಗಳು:",
    
    recent_diagnoses: "ಇತ್ತೀಚಿನ ಪ್ರಯೋಗಾಲಯ ರೋಗನಿರ್ಣಯಗಳು",
    no_recent_scans: "ಯಾವುದೇ ಇತ್ತೀಚಿನ ಬೆಳೆ ಸ್ಕ್ಯಾನ್‌ಗಳು ಪತ್ತೆಯಾಗಿಲ್ಲ. ಇತಿಹಾಸವನ್ನು ಭರ್ತಿ ಮಾಡಲು ಸ್ಕ್ಯಾನ್ ಪೂರ್ಣಗೊಳಿಸಿ.",
    plant_label: "ಸಸ್ಯ:",
    confidence_label: "ನಿಖರತೆ:",
    report_btn: "ವರದಿ",
    
    my_fields_status: "ನನ್ನ ಜಮೀನುಗಳ ಸ್ಥಿತಿ",
    manage_fields_btn: "ಜಮೀನುಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    
    status_healthy: "ಆರೋಗ್ಯಕರ",
    status_at_risk: "ಅಪಾಯದಲ್ಲಿದೆ",
    status_sick: "ರೋಗಗ್ರಸ್ತ",
    scans_count: "ಸ್ಕ್ಯಾನ್‌ಗಳು",
    
    specimen_rejected: "ಮಾದರಿಯನ್ನು ತಿರಸ್ಕರಿಸಲಾಗಿದೆ",
    reinit_scan: "ಮಾದರಿ ಸ್ಕ್ಯಾನ್ ಮರು-ಪ್ರಾರಂಭಿಸಿ",
    init_plant_diagnosis: "ಸಸ್ಯದ ರೋಗನಿರ್ಣಯ ಪ್ರಾರಂಭಿಸಿ",
    demo_mode_active: "ಡೆಮೊ ಮೋಡ್ ಸಕ್ರಿಯವಾಗಿದೆ:",
    demo_mode_desc: "ಮಾಕ್ ಇಂಜಿನ್‌ನೊಂದಿಗೆ ರೋಗನಿರ್ಣಯವನ್ನು ಚಾಲನೆ ಮಾಡಲಾಗುತ್ತಿದೆ. ನೈಜ ಎಲೆ ಸ್ಕ್ಯಾನ್ ಮತ್ತು ದೃಶ್ಯ ವಿಶ್ಲೇಷಣೆಗಾಗಿ,",
    demo_mode_link: "ಸೆಟ್ಟಿಂಗ್ಸ್‌ನಲ್ಲಿ ಆಂಥ್ರೊಪಿಕ್ ಕ್ಲೋಡ್ ಎಪಿಐ ಕೀಲಿಯನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿ",
    select_host_species: "ಯಜಮಾನ ಸಸ್ಯದ ತಳಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    unknown_plant: "ಅಜ್ಞಾತ ಸಸ್ಯ (ಗೊತ್ತಿಲ್ಲದ ಗಿಡ)",
    simulate_invalid_specimen: "ಅಮಾನ್ಯ ಮಾದರಿಯನ್ನು ಸಿಮ್ಯುಲೇಟ್ ಮಾಡಿ",
    unknown_placeholder: "ಸಸ್ಯದ ತಳಿಯನ್ನು ಎಐ ರೋಗಶಾಸ್ತ್ರದ ಮೂಲಕ ಗುರುತಿಸಲಾಗುವುದು",
    known_placeholder: "ಸಸ್ಯದ ಹೆಸರನ್ನು ಟೈಪ್ ಮಾಡಲು ಪ್ರಾರಂಭಿಸಿ (ಉದಾಹರಣೆಗೆ ಜೋಳ, ಕಬ್ಬು, ಗೋಧಿ)",
    symptoms_checklist_label: "ವೀಕ್ಷಿಸಿದ ಸಸ್ಯದ ರೋಗಲಕ್ಷಣಗಳು (ಐಚ್ಛಿಕ - ನಿಖರವಾದ ರೋಗನಿರ್ಣಯಕ್ಕಾಗಿ)",
    front_camera_title: "🔍 ಮುಂಭಾಗದ ಕ್ಯಾಮೆರಾ",
    front_camera_desc: "ಮ್ಯಾಕ್ರೋ ಸ್ಪಾಟ್ / ಕಲೆಯ ವಿವರಗಳು",
    rear_camera_title: "🌿 ಹಿಂಭಾಗದ ಕ್ಯಾಮೆರಾ",
    rear_camera_desc: "ಪರಿಸರ ಹಸಿರು ಒಟ್ಟಾರೆ ದೃಷ್ಟಿಕೋನ",
    drag_drop_title: "ಮಾದರಿ ಚಿತ್ರಗಳನ್ನು ಇಲ್ಲಿ ಎಳೆಯಿರಿ ಮತ್ತು ಬಿಡಿ",
    drag_drop_desc: "JPG, PNG, WEBP ಫೈಲ್‌ಗಳನ್ನು ಸ್ವೀಕರಿಸಲಾಗುತ್ತದೆ (ಪ್ರತಿಯೊಂದೂ ಗರಿಷ್ಠ 10MB, 3 ಫೈಲ್‌ಗಳವರೆಗೆ)",
    browse_files: "ಫೈಲ್‌ಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ",
    uploaded_label: "ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ",
    no_files_uploaded: "ಇನ್ನೂ ಯಾವುದೇ ಫೈಲ್‌ಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗಿಲ್ಲ",
    start_analysis: "ರೋಗಶಾಸ್ತ್ರ ವಿಶ್ಲೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ",
    analyzing_specimen: "ಮಾದರಿಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    
    diagnostic_report_title: "ಬೆಳೆ ರೋಗಶಾಸ್ತ್ರ ರೋಗನಿರ್ಣಯ ವರದಿ",
    disease_identity: "ರೋಗದ ಹೆಸರು",
    scientific_name: "ವೈಜ್ಞಾನಿಕ ಹೆಸರು",
    category_label: "ರೋಗಕಾರಕದ ವರ್ಗ",
    confidence_rating: "ನಿಖರತೆಯ ರೇಟಿಂಗ್",
    severity_level: "ಗಂಭೀರತೆಯ ಮಟ್ಟ",
    spread_risk_label: "ಹರಡುವ ಅಪಾಯ",
    affected_organs: "ಬಾಧಿತ ಭಾಗಗಳು",
    observed_symptoms: "ವೀಕ್ಷಿಸಿದ ರೋಗಲಕ್ಷಣಗಳು",
    pathogen_cause: "ರೋಗಕಾರಕ ಕಾರಣ",
    disease_description: "ರೋಗದ ವಿವರಣೆ",
    if_untreated_label: "ಚಿಕಿತ್ಸೆ ನೀಡದೆ ಬಿಟ್ಟರೆ",
    recovery_timeline_label: "ಚೇತರಿಕೆಯ ಸಮಯ",
    expert_pathology_tip: "ತಜ್ಞರ ಸಲಹೆ",
    follow_up_instructions: "ಮುಂದಿನ ಕಾಳಜಿಯ ಸೂಚನೆಗಳು",
    similar_pathologies: "ಇದೇ ರೀತಿಯ ರೋಗಗಳು",
    
    treatment_plan: "ಚಿಕಿತ್ಸಾ ಯೋಜನೆ",
    immediate_actions: "ತಕ್ಷಣದ ಜೈವಿಕ ಕ್ರಮಗಳು",
    chemical_treatments: "ಶಿಫಾರಸು ಮಾಡಿದ ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆಗಳು",
    organic_alternatives: "ಸಾವಯವ ಮತ್ತು ಜೈವಿಕ ಪರ್ಯಾಯಗಳು",
    preventive_measures: "ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳು ಮತ್ತು ನೈರ್ಮಲ್ಯ",
    chemical_name: "ರಾಸಾಯನಿಕದ ಹೆಸರು",
    active_ingredient: "ಸಕ್ರಿಯ ಪದಾರ್ಥ",
    dosage: "ಪ್ರಮಾಣ (ಡೋಸೇಜ್)",
    application_method: "ಬಳಸುವ ವಿಧಾನ",
    frequency: "ಬಳಕೆಯ ಆವರ್ತನ",
    safety_precautions: "ಸುರಕ್ಷತಾ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳು",
    approximate_cost: "ಅಂದಾಜು ವೆಚ್ಚ",
    remedy_label: "ಪರಿಹಾರ",
    preparation: "ತಯಾರಿಕೆ",
    application: "ಬಳಕೆ",
    
    save_to_field: "ಜಮೀನಿನ ದಿನಚರಿಗೆ ಉಳಿಸಿ",
    select_field: "ಜಮೀನನ್ನು ಆಯ್ಕೆಮಾಡಿ...",
    save_report_btn: "ವರದಿಯನ್ನು ಇತಿಹಾಸಕ್ಕೆ ಉಳಿಸಿ",
    saved_badge: "ಉಳಿಸಲಾಗಿದೆ ✅",
    discard_report: "ತಿರಸ್ಕರಿಸಿ ಮತ್ತು ಮರುಹೊಂದಿಸಿ",
    
    catalog_title: "🌾 ಬೆಳೆ ರೋಗಗಳ ವಿಶ್ವಕೋಶ",
    catalog_desc: "ಎಲ್ಲಾ 150 ಬೆಳೆ-ನಿರ್ದಿಷ್ಟ ರೋಗಗಳು, ಅವುಗಳ ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಚಿಕಿತ್ಸೆಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಅಧ್ಯಯನ ಮಾಡಿ.",
    search_placeholder: "ರೋಗದ ಹೆಸರು, ಸಸ್ಯ ಅಥವಾ ವೈಜ್ಞಾನಿಕ ಹೆಸರಿನ ಮೂಲಕ ಹುಡುಕಿ...",
    all_crops: "ಎಲ್ಲಾ ಬೆಳೆಗಳು",
    all_categories: "ಎಲ್ಲಾ ವರ್ಗಗಳು",
    disease_details: "ರೋಗದ ವಿವರಗಳು",
    close_details: "ವಿವರ ಮುಚ್ಚಿ",
    
    lab_history_title: "📋 ಲ್ಯಾಬ್ ರೋಗನಿರ್ಣಯ ಇತಿಹಾಸ ದಿನಚರಿ",
    lab_history_desc: "ಹಿಂದೆ ಉಳಿಸಿದ ಬೆಳೆ ಸ್ಕ್ಯಾನ್‌ಗಳು, ವರದಿಗಳು ಮತ್ತು ಜಮೀನಿನ ದಾಖಲೆಗಳನ್ನು ಪ್ರವೇಶಿಸಿ ಮತ್ತು ಪರಿಶೀಲಿಸಿ.",
    search_history_placeholder: "ಬೆಳೆ ಅಥವಾ ರೋಗದ ಹೆಸರಿನ ಮೂಲಕ ಹುಡುಕಿ...",
    clear_history_btn: "ಇಡೀ ಇತಿಹಾಸವನ್ನು ಅಳಿಸಿಹಾಕಿ",
    no_history: "ಇತಿಹಾಸದಲ್ಲಿ ಯಾವುದೇ ವರದಿಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
    
    fields_title: "🗺️ ನನ್ನ ಕೃಷಿ ಜಮೀನುಗಳ ವಿನ್ಯಾಸ",
    fields_desc: "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಜಮೀನು ಬ್ಲಾಕ್‌ಗಳ ಆರೋಗ್ಯ ಸ್ಥಿತಿ, ಬೆಳೆ ಪ್ರಕಾರಗಳು ಮತ್ತು ಎಕರೆ ದಾಖಲೆಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
    add_field_btn: "ಹೊಸ ಜಮೀನು ಸೇರಿಸಿ",
    field_name_placeholder: "ಜಮೀನಿನ ಹೆಸರು (ಉದಾಹರಣೆಗೆ ಉತ್ತರ ಭಾಗ, ನದಿ ತೀರ)",
    acreage_label: "ವಿಸ್ತೀರ್ಣ (ಎಕರೆಗಳು)",
    soil_type_label: "ಮಣ್ಣಿನ ಪ್ರಕಾರ (ಉದಾಹರಣೆಗೆ ಜೇಡಿಮಣ್ಣು, ಮರಳು, ಲೋಮ್)",
    select_crop: "ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ...",
    select_season: "ಹಂಗಾಮನ್ನು ಆಯ್ಕೆಮಾಡಿ...",
    cancel_btn: "ರದ್ದುಮಾಡಿ",
    confirm_add_field: "ಜಮೀನು ಬ್ಲಾಕ್ ರಚಿಸಿ",
    field_history_log: "ಜಮೀನಿನ ಸ್ಕ್ಯಾನ್ ಇತಿಹಾಸ",
    delete_field: "ಜಮೀನನ್ನು ಅಳಿಸಿ",
    no_fields: "ಇನ್ನೂ ಯಾವುದೇ ಜಮೀನುಗಳನ್ನು ರಚಿಸಲಾಗಿಲ್ಲ. ಸ್ಥಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಮೇಲೆ ಜಮೀನು ಬ್ಲಾಕ್ ರಚಿಸಿ.",
    
    geo_advisor_title: "🌾 ಭೌಗೋಳಿಕ-ಕೃಷಿ ಬೆಳೆ ಮತ್ತು ಮಣ್ಣಿನ ಸಲಹೆಗಾರ",
    geo_advisor_desc: "ಸ್ಥಳೀಯ ಮಣ್ಣಿನ ಪ್ರೊಫೈಲ್‌ಗಳು, ವಿಶಿಷ್ಟ ಪ್ರಾದೇಶಿಕ ಬೆಳೆಗಳು ಮತ್ತು ಉತ್ತಮ ನೆಡುವಿಕೆ ಸೂಕ್ತತೆಯ ಸ್ಕೋರ್‌ಗಳನ್ನು ಗುರುತಿಸಲು ಲೈವ್ ಸ್ಥಳ ಟ್ರ್ಯಾಕಿಂಗ್ ಬಳಸಿ.",
    auto_detect_location: "ಸ್ವಯಂಚಾಲಿತ ಸ್ಥಳ ಪತ್ತೆ",
    locating_farm: "ಜಮೀನಿನ ಸ್ಥಳ ಪತ್ತೆ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    simulate_region: "ಪ್ರದೇಶವನ್ನು ಸಿಮ್ಯುಲೇಟ್ ಮಾಡಿ",
    gps_latitude: "ಜಿಪಿಎಸ್ ಅಕ್ಷಾಂಶ (LAT)",
    gps_longitude: "ಜಿಪಿಎಸ್ ರೇಖಾಂಶ (LNG)",
    accuracy_status: "ನಿಖರತೆಯ ಸ್ಥಿತಿ",
    satellite_resolved: "ಉಪಗ್ರಹ ನಿರ್ಧರಿಸಿದೆ ✅",
    live_farm_grid: "📍 ಲೈವ್ ಸ್ಥಳೀಯ ಜಮೀನು ಗ್ರಿಡ್",
    local_soil_profile: "ಸ್ಥಳೀಯ ಮಣ್ಣಿನ ವಿವರ:",
    soil_type_classification: "ಮಣ್ಣಿನ ಪ್ರಕಾರದ ವರ್ಗೀಕರಣ",
    soil_properties: "ಭೌತಿಕ ಮತ್ತು ರಾಸಾಯನಿಕ ಗುಣಲಕ್ಷಣಗಳು",
    primary_crops_grown: "ಪ್ರಾಥಮಿಕ ಬೆಳೆಗಳನ್ನು ಬೆಳೆಯಲಾಗುತ್ತದೆ:",
    crops_grown_desc: "ಈ ಬೆಳೆಗಳು ಈ ಭೌಗೋಳಿಕ ಮಣ್ಣಿನ ವಲಯದಲ್ಲಿ ಪ್ರಸ್ತುತ ಪ್ರಮುಖ ಬೆಳೆಗಳಾಗಿವೆ:",
    seasonal_suitability: "ಹಂಗಾಮು ಆಧಾರಿತ ನೆಡುವಿಕೆ ಸೂಕ್ತತೆ",
    suitability_desc: "ಸ್ಥಳೀಯ ಮಣ್ಣಿನ ರಸಾಯನಶಾಸ್ತ್ರ ಮತ್ತು ಹಂಗಾಮು ತಾಪಮಾನ ಸೂಚ್ಯಂಕಗಳ ಆಧಾರದ ಮೇಲೆ ಸೂಕ್ತತೆಯ ರೇಟಿಂಗ್‌ಗಳನ್ನು ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತದೆ.",
    planting_cycle: "ನೆಡುವಿಕೆ ಚಕ್ರ",
    
    settings_title: "⚙️ ಲ್ಯಾಬ್ ಸೆಟ್ಟಿಂಗ್ಸ್ ಮತ್ತು ಕಾನ್ಫಿಗರೇಶನ್",
    settings_desc: "ಬಳಕೆದಾರರ ಪ್ರೊಫೈಲ್‌ಗಳು, ಥೀಮ್ ಗುಣಲಕ್ಷಣಗಳು, ರೋಗನಿರ್ಣಯ ಎಐ ಎಂಜಿನ್‌ಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಬ್ಯಾಕಪ್ ದಾಖಲೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ.",
    profile_settings: "ರೈತರ ಪ್ರೊಫೈಲ್ ಸೆಟ್ಟಿಂಗ್ಸ್",
    name_label: "ಪೂರ್ಣ ಹೆಸರು",
    email_label: "ಇಮೇಲ್ ವಿಳಾಸ",
    role_label: "ರೈತ/ಸಸ್ಯವಿಜ್ಞಾನಿ ಪಾತ್ರ",
    location_label: "ಜಮೀನಿನ ಸ್ಥಳ/ಪ್ರದೇಶ",
    theme_preferences: "ಥೀಮ್ ಮತ್ತು ಶೈಲಿಯ ಆದ್ಯತೆಗಳು",
    dark_mode: "ಕಪ್ಪು ಥೀಮ್",
    light_mode: "ಬಿಳಿ ಥೀಮ್",
    diagnostic_engine_config: "ರೋಗನಿರ್ಣಯ ಎಐ ಎಂಜಿನ್ ಕಾನ್ಫಿಗರೇಶನ್",
    api_mode_label: "ಎಐ ರೋಗನಿರ್ಣಯ ವಿಶ್ಲೇಷಣೆ ಮೋಡ್",
    api_key_label: "ಆಂಥ್ರೊಪಿಕ್ ಕ್ಲೋಡ್ ಎಪಿಐ ಕೀ",
    api_key_desc: "ಆಂಥ್ರೊಪಿಕ್ ಕ್ಲೋಡ್ 3.5 ಸಾನೆಟ್‌ನೊಂದಿಗೆ ನೈಜ ದೃಶ್ಯ ಎಲೆ ಸ್ಕ್ಯಾನ್ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಸಕ್ರಿಯಗೊಳಿಸುತ್ತದೆ.",
    proxy_url_label: "ಪ್ರಾಕ್ಸಿ ಸರ್ವರ್ ಯುಆರ್‌ಎಲ್ (ಐಚ್ಛಿಕ)",
    treatment_preferences: "ವರದಿ ಚಿಕಿತ್ಸಾ ಆದ್ಯತೆಗಳು",
    notif_preferences: "ಅಧಿಸೂಚನೆ ಆದ್ಯತೆಗಳು",
    danger_zone: "ಅಪಾಯದ ವಲಯ ಮತ್ತು ಡೇಟಾ ಮರುಹೊಂದಿಕೆ",
    delete_account_btn: "ಖಾತೆಯನ್ನು ಕಾಯಂ ಆಗಿ ಅಳಿಸಿ",
    confirm_delete_account: "ಹೌದು, ನನ್ನ ಇಡೀ ಖಾತೆ ಮತ್ತು ಇತಿಹಾಸವನ್ನು ಅಳಿಸಿಹಾಕಿ",
    
    doctor_title: "ಡಾ. ಆಂಜಿಯೋ (ಸಸ್ಯ ರೋಗಶಾಸ್ತ್ರಜ್ಞ)",
    chat_placeholder: "ಬೆಳೆ ರೋಗಗಳು, ಪರಿಹಾರಗಳ ಬಗ್ಗೆ ಡಾ. ಆಂಜಿಯೋ ಅವರೊಂದಿಗೆ ಚರ್ಚಿಸಿ...",
    send_btn: "ಕಳುಹಿಸಿ",
    clear_chat: "ಚಾಟ್ ಹಿಸ್ಟರಿ ರಿಸೆಟ್ ಮಾಡಿ",
    welcome_chat: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ವರ್ಚುವಲ್ ಕೃಷಿ ರೋಗಶಾಸ್ತ್ರಜ್ಞ ಡಾ. ಆಂಜಿಯೋ. ನಿಮ್ಮ ಬೆಳೆಗಳು, ಮಣ್ಣುಗಳು ಅಥವಾ ರೋಗಗಳ ಬಗ್ಗೆ ಕೇಳಿ.",
    
    saved_success: "ವರದಿಯನ್ನು ಇತಿಹಾಸಕ್ಕೆ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!",
    field_saved: "ವರದಿಯನ್ನು ಜಮೀನಿನ ದಿನಚರಿಗೆ ಯಶಸ್ವಿಯಾಗಿ ಲಾಗ್ ಮಾಡಲಾಗಿದೆ!",
    field_added: "ಹೊಸ ಜಮೀನು ಬ್ಲಾಕ್ ಅನ್ನು ಯಶಸ್ವಿಯಾಗಿ ರಚಿಸಲಾಗಿದೆ!",
    field_deleted: "ಜಮೀನು ಬ್ಲಾಕ್ ಅನ್ನು ಅಳಿಸಲಾಗಿದೆ.",
    location_success: "ಸ್ಥಳವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪತ್ತೆಹಚ್ಚಲಾಗಿದೆ!",
    location_failed: "ಸ್ಥಳ ಪತ್ತೆಹಚ್ಚುವಿಕೆ ವಿಫಲವಾಗಿದೆ."
  }
};

const translateSoilInfo = (info, lang) => {
  if (lang !== 'kn') return info;
  
  const typicalCrops = info.typicalCrops.map(crop => CROP_TRANSLATIONS[crop] || crop);
  const suitability = {};
  
  Object.entries(info.suitability).forEach(([season, list]) => {
    const translatedSeason = SEASON_TRANSLATIONS[season] || season;
    suitability[translatedSeason] = list.map(item => ({
      crop: CROP_TRANSLATIONS[item.crop] || item.crop,
      score: item.score,
      reason: REASON_TRANSLATIONS[item.reason] || item.reason
    }));
  });
  
  return {
    soilType: SOIL_TRANSLATIONS[info.soilType] || info.soilType,
    properties: PROPERTIES_TRANSLATIONS[info.properties] || info.properties,
    typicalCrops,
    suitability
  };
};

function translateReport(report, lang) {
  if (lang !== 'kn') return report;
  
  const translated = { ...report };
  translated.disease_name = DISEASE_TRANSLATIONS[report.disease_name] || report.disease_name;
  translated.category = report.category === "Fungal" ? "ಶಿಲೀಂಧ್ರ" :
                        report.category === "Bacterial" ? "ಬ್ಯಾಕ್ಟೀರಿಯಾ" :
                        report.category === "Viral" ? "ವೈರಸ್" :
                        report.category === "Nematodal" ? "ನೆಮಟೋಡ್" :
                        report.category === "Nutritional Deficiency" ? "ಪೋಷಕಾಂಶಗಳ ಕೊರತೆ" : "ಕೀಟಗಳು";
  translated.severity = report.severity === "Critical" ? "ಅತಿ ಗಂಭೀರ" :
                        report.severity === "Severe" ? "ಗಂಭೀರ" :
                        report.severity === "Moderate" ? "ಮಧ್ಯಮ" : "ಸೌಮ್ಯ";
  translated.spread_risk = report.spread_risk === "Very High" ? "ಅತಿ ಹೆಚ್ಚು" :
                           report.spread_risk === "High" ? "ಹೆಚ್ಚು" :
                           report.spread_risk === "Medium" ? "ಮಧ್ಯಮ" : "ಕಡಿಮೆ";
  
  if (report.is_custom) {
    return translated;
  }
  
  if (report.category === "Fungal") {
    translated.symptoms_observed = ["ಎಲೆಗಳ ಮೇಲೆ ಬಿಳಿ ಬೂದಿ ತರಹದ ಕಲೆಗಳು", "ಎಲೆಯ ಅಂಚುಗಳು ಹಳದಿಯಾಗುವುದು", "ಮೇಲ್ಭಾಗದಲ್ಲಿ ಒಣಗಿದ ಕಂದು ಕಲೆಗಳು", "ಅಕಾಲಿಕ ಎಲೆ ಉದುರುವಿಕೆ"];
    translated.cause = "ಗಾಳಿ, ಹೆಚ್ಚಿನ ತೇವಾಂಶ ಮತ್ತು ನೇರ ಎಲೆಗಳ ಸಂಪರ್ಕದ ಮೂಲಕ ಹರಡುವ ಶಿಲೀಂಧ್ರ ಬೀಜಕಗಳು.";
    translated.disease_description = `${translated.disease_name || "ಶಿಲೀಂಧ್ರ ರೋಗ"} ಇದು ಸಸ್ಯಕ್ಕೆ ಹಾನಿ ಮಾಡುವ ತೀವ್ರವಾದ ಶಿಲೀಂಧ್ರ ಸೋಂಕು. ಸಾಮಾನ್ಯವಾಗಿ ಗಾಳಿಯ ಕೊರತೆ ಮತ್ತು ತೇವಾಂಶದ ವಾತಾವರಣದಲ್ಲಿ ಇದು ವೇಗವಾಗಿ ಹರಡುತ್ತದೆ.`;
    translated.if_untreated = "ಎಲೆಗಳು ಸಂಪೂರ್ಣ ಉದುರಿಹೋಗುತ್ತವೆ, ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ ಕುಂಠಿತವಾಗುತ್ತದೆ ಮತ್ತು ಬೆಳೆ ಇಳುವರಿ ಗಣನೀಯವಾಗಿ ಕಡಿಮೆಯಾಗುತ್ತದೆ.";
    translated.recovery_timeline = "ಸಕ್ರಿಯ ಶಿಲೀಂಧ್ರನಾಶಕಗಳೊಂದಿಗೆ 14 ರಿಂದ 28 ದಿನಗಳು";
    translated.expert_tip = "ಶಿಲೀಂಧ್ರ ಬೀಜಕಗಳು ಹರಡುವುದನ್ನು ತಡೆಯಲು ಗಿಡಗಳನ್ನು ಕತ್ತರಿಸುವ ಕತ್ತರಿಗಳನ್ನು 70% ಐಸೊಪ್ರೊಪೈಲ್ ಆಲ್ಕೋಹಾಲ್‌ನಿಂದ ಸ್ವಚ್ಛಗೊಳಿಸಿ.";
    translated.treatment_plan = {
      immediate_actions: ["ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತಕ್ಷಣ ಕತ್ತರಿಸಿ ನಾಶಪಡಿಸಿ.", "ತೇವಾಂಶವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಎಲೆಗಳ ಮೇಲೆ ನೀರು ಸಿಂಪಡಿಸುವುದನ್ನು ತಪ್ಪಿಸಿ.", "ಸೋಂಕಿತ ಗಿಡಗಳನ್ನು ಪ್ರತ್ಯೇಕಿಸಿ."],
      chemical_treatments: [
        {
          chemical_name: "ತಾಮ್ರದ ಹೈಡ್ರಾಕ್ಸೈಡ್ ಸಿಂಪಡಣೆ",
          active_ingredient: "ತಾಮ್ರದ ಹೈಡ್ರಾಕ್ಸೈಡ್ (53.8%)",
          dosage: "1 ಲೀಟರ್ ನೀರಿಗೆ 2 ಗ್ರಾಂ",
          application_method: "ಪ್ರೆಶರ್ ನಾಜಲ್ ಬಳಸಿ ಎಲೆಗಳಿಗೆ ಸಿಂಪಡಿಸುವುದು",
          frequency: "ರೋಗಲಕ್ಷಣಗಳು ವಾಸಿಯಾಗುವವರೆಗೆ ಪ್ರತಿ 10 ದಿನಗಳಿಗೊಮ್ಮೆ",
          safety_precautions: "ಸಿಂಪಡಿಸುವಾಗ ರಕ್ಷಣಾತ್ಮಕ ಕನ್ನಡಕ, ಮಾಸ್ಕ್ ಮತ್ತು ಕೈಗವಸುಗಳನ್ನು ಧರಿಸಿ.",
          approximate_cost: "500 ಗ್ರಾಂಗೆ ₹1,500"
        },
        {
          chemical_name: "ಮ್ಯಾಂಕೋಜೆಬ್ ಶಿಲೀಂಧ್ರನಾಶಕ",
          active_ingredient: "ಮ್ಯಾಂಕೋಜೆಬ್ (75% WP)",
          dosage: "1 ಲೀಟರ್ ನೀರಿಗೆ 2.5 ಗ್ರಾಂ",
          application_method: "ಗಿಡದ ಮೇಲ್ಭಾಗಕ್ಕೆ ಏಕರೂಪವಾಗಿ ಸಿಂಪಡಿಸಿ",
          frequency: "ಪ್ರತಿ 14 ದಿನಗಳಿಗೊಮ್ಮೆ",
          safety_precautions: "ಸಿಂಪಡಿಸಿದ ನಂತರ 7 ದಿನಗಳವರೆಗೆ ಬೆಳೆ ಕಟಾವು ಮಾಡಬೇಡಿ. ಜಲಮೂಲಗಳಿಂದ ದೂರವಿಡಿ.",
          approximate_cost: "1 ಕೆಜಿಗೆ ₹1,000"
        }
      ],
      organic_alternatives: [
        {
          remedy: "ಬೇವು ಎಣ್ಣೆ ದ್ರಾವಣ",
          preparation: "5ಮಿಲಿ ಬೇವು ಎಣ್ಣೆ ಮತ್ತು 2ಮಿಲಿ ಸಾವಯವ ದ್ರವ ಸೋಪನ್ನು 1 ಲೀಟರ್ ಉಗುರುಬೆಚ್ಚಗಿನ ನೀರಿನಲ್ಲಿ ಮಿಶ್ರಣ ಮಾಡಿ",
          application: "ಸೂರ್ಯನ ಶಾಖದಿಂದ ಎಲೆಗಳು ಸುಡದಂತೆ ತಡೆಯಲು ಸಂಜೆ ವೇಳೆ ಎಲೆಗಳ ಮೇಲೆ ಸಂಪೂರ್ಣವಾಗಿ ಸಿಂಪಡಿಸಿ"
        },
        {
          remedy: "ಪೊಟ್ಯಾಸಿಯಮ್ ಬೈಕಾರ್ಬನೇಟ್ ಸಿಂಪಡಣೆ",
          preparation: "3 ಗ್ರಾಂ ಪೊಟ್ಯಾಸಿಯಮ್ ಬೈಕಾರ್ಬನೇಟ್ ಅನ್ನು 1 ಲೀಟರ್ ನೀರಿನಲ್ಲಿ ಕರಗಿಸಿ",
          application: "ಶಿಲೀಂಧ್ರ ಜೀವಕೋಶದ ಗೋಡೆಗಳನ್ನು ಒಡೆಯಲು ಕಲೆಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ"
        }
      ],
      preventive_measures: ["ಗಾಳಿಯಾಡಲು ಅನುಕೂಲವಾಗುವಂತೆ ನಿಯಮಿತವಾಗಿ ಕತ್ತರಿಸು ಪ್ರಕ್ರಿಯೆ ಮಾಡಿ.", "ಮಣ್ಣಿನಿಂದ ಶಿಲೀಂಧ್ರಗಳು ಹರಡದಂತೆ ತಡೆಯಲು ಒಣ ಎಲೆಗಳ ಹೊದಿಕೆ (ಮಲ್ಚಿಂಗ್) ಬಳಸಿ.", "ಗಿಡಗಳ ನಡುವೆ ಸೂಕ್ತ ಅಂತರ ಕಾಯ್ದುಕೊಳ್ಳಿ."]
    };
  } else if (report.category === "Bacterial") {
    translated.symptoms_observed = ["ನೀರು ಕುಡಿದಂತಿರುವ ಕಪ್ಪು ಕಲೆಗಳು", "ಬೆಚ್ಚಗಿನ ಹವಾಮಾನದಲ್ಲಿ ಕಾಂಡದಿಂದ ಬ್ಯಾಕ್ಟೀರಿಯಾದ ಸ್ರವಿಸುವಿಕೆ", "ನರಗಳಿಂದ ಸೀಮಿತವಾದ ಕೋನೀಯ ಎಲೆ ಕಲೆಗಳು", "ಧಿಡೀರ್ ಒಣಗುವುದು"];
    translated.cause = "ಬ್ಯಾಕ್ಟೀರಿಯಾ ಜೀವಕೋಶಗಳು ಸಸ್ಯದ ಗಾಯಗಳು ಅಥವಾ ಪತ್ರರಂಧ್ರಗಳ ಮೂಲಕ ನಾಳೀಯ ರಚನೆಗಳನ್ನು ಪ್ರವೇಶಿಸುವುದು.";
    translated.disease_description = `ಇದು ಸಸ್ಯದ ರಸ ಹರಿವನ್ನು ತಡೆಯುವ ಮತ್ತು ಎಲೆಗಳನ್ನು ಹಾನಿಗೊಳಿಸುವ ತೀವ್ರವಾದ ಬ್ಯಾಕ್ಟೀರಿಯಾ ಸೋಂಕು. ಇದು ಅತ್ಯಂತ ಸಾಂಕ್ರಾಮಿಕವಾಗಿದೆ.`;
    translated.if_untreated = "ನಾಳೀಯ ವ್ಯವಸ್ಥೆಯ ಕುಸಿತ, ಸಂಪೂರ್ಣ ಒಣಗುವಿಕೆ ಮತ್ತು ಭವಿಷ್ಯದ ಬೆಳೆಗಳ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ಮಣ್ಣಿನ ಮಾಲಿನ್ಯ.";
    translated.recovery_timeline = "21 ರಿಂದ 35 ದಿನಗಳು (ಸಾಮಾನ್ಯವಾಗಿ ಸೋಂಕಿತ ಗಿಡವನ್ನು ತೆಗೆದುಹಾಕಬೇಕಾಗುತ್ತದೆ)";
    translated.expert_tip = "ಒದ್ದೆಯಾದ ಹವಾಮಾನದಲ್ಲಿ ಗಿಡಗಳನ್ನು ಕತ್ತರಿಸಬೇಡಿ; ನೀರಿನ ಹನಿಗಳು ಬ್ಯಾಕ್ಟೀರಿಯಾ ಹರಡಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ.";
    translated.treatment_plan = {
      immediate_actions: ["ಹೆಚ್ಚು ಸೋಂಕಿತ ಬೆಳೆಗಳನ್ನು ತಕ್ಷಣವೇ ಕಿತ್ತುಹಾಕಿ ನಾಶಪಡಿಸಿ.", "ಪ್ರತಿ ಕಡಿತದ ನಂತರ ಉಪಕರಣಗಳನ್ನು ಸೋಂಕುರಹಿತಗೊಳಿಸಿ.", "ಎಲೆಗಳ ಮೇಲೆ ನೀರು ಹಾಯಿಸುವುದನ್ನು ತಕ್ಷಣ ನಿಲ್ಲಿಸಿ."],
      chemical_treatments: [
        {
          chemical_name: "ಸ್ಟ್ರೆಪ್ಟೊಮೈಸಿನ್ ಸಲ್ಫೇಟ್",
          active_ingredient: "ಸ್ಟ್ರೆಪ್ಟೊಮೈಸಿನ್ (9%), ಆಕ್ಸಿಟೆಟ್ರಾಸೈಕ್ಲಿನ್ (1%)",
          dosage: "2 ಲೀಟರ್ ನೀರಿಗೆ 1 ಗ್ರಾಂ",
          application_method: "ಎಲೆಗಳ ಮೇಲೆ ಸಿಂಪಡಣೆ",
          frequency: "ಪ್ರತಿ 7 ದಿನಗಳಿಗೊಮ್ಮೆ, ಗರಿಷ್ಠ 3 ಬಾರಿ",
          safety_precautions: "ಇದು ಪ್ರತಿಜೀವಕವಾಗಿದೆ. ಕೈಗವಸು ಧರಿಸಿ. ಕೊಯ್ಲು ಅವಧಿಗೆ ಹತ್ತಿರವಿರುವಾಗ ಬಳಸಬೇಡಿ.",
          approximate_cost: "ಒಂದು ಪ್ಯಾಕ್‌ಗೆ ₹2,800"
        }
      ],
      organic_alternatives: [
        {
          remedy: "ದ್ರವ ತಾಮ್ರದ ಸೋಪ್ ಸಿಂಪಡಣೆ",
          preparation: "1 ಲೀಟರ್ ನೀರಿನಲ್ಲಿ 10ಮಿಲಿ ದ್ರವ ತಾಮ್ರದ ಸೋಪ್ ಮಿಶ್ರಣ ಮಾಡಿ",
          application: "ಬ್ಯಾಕ್ಟೀರಿಯಾ ಪ್ರವೇಶಿಸದಂತೆ ತಡೆಯಲು ಸೂರ್ಯೋದಯದ ಸಮಯದಲ್ಲಿ ಎಲೆಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ"
        }
      ],
      preventive_measures: ["ರೋಗಮುಕ್ತ ಪ್ರಮಾಣೀಕೃತ ಬೀಜಗಳನ್ನು ಮಾತ್ರ ಬಿತ್ತನೆ ಮಾಡಿ.", "ಎಲೆಗಳು ಒದ್ದೆಯಾಗಿರುವಾಗ ಬೆಳೆಗಳನ್ನು ಮುಟ್ಟಬೇಡಿ ಅಥವಾ ಕೊಯ್ಲು ಮಾಡಬೇಡಿ.", "ಎಲೆಗಳನ್ನು ಒಣಗಿಸಲು ಹನಿ ನೀರಾವರಿ ಬಳಸಿ."]
    };
  } else if (report.category === "Viral") {
    translated.symptoms_observed = ["ಎಲೆಗಳ ಮೇಲೆ ಹಳದಿ ಮತ್ತು ಹಸಿರು ಬಣ್ಣದ ಮೊಸಾಯಿಕ್ ವಿನ್ಯಾಸಗಳು", "ಕುಂಠಿತಗೊಂಡ ಮತ್ತು ಮುದುಡಿದ ಎಲೆಗಳ ಬೆಳವಣಿಗೆ", "ಎಲೆಗಳು ವಿರೂಪಗೊಳ್ಳುವುದು", "ಹಣ್ಣುಗಳ ಮೇಲೆ ಉಂಗುರದಾಕಾರದ ಕಲೆಗಳು"];
    translated.cause = "ಸಸ್ಯದ ಜೀವಕೋಶಗಳ ಒಳಗೆ ವೈರಸ್ ಪುನರಾವರ್ತನೆಯಾಗುವುದು, ಮುಖ್ಯವಾಗಿ ಗಿಡಹೇನುಗಳಂತಹ ಹೀರುವ ಕೀಟಗಳಿಂದ ಹರಡುತ್ತದೆ.";
    translated.disease_description = `ಇದು ಸಸ್ಯದ ಜೀವಕೋಶಗಳನ್ನು ಆಕ್ರಮಿಸಿಕೊಂಡು ಎಲೆಗಳ ಮೊಸಾಯಿಕ್ ವಿನ್ಯಾಸಕ್ಕೆ ಕಾರಣವಾಗುವ ವೈರಲ್ ಸೋಂಕು. ಇದಕ್ಕೆ ಯಾವುದೇ ನೇರ ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆ ಇಲ್ಲ.`;
    translated.if_untreated = "ಸಂಪೂರ್ಣ ಬೆಳವಣಿಗೆ ಕುಂಠಿತಗೊಳ್ಳುವುದು, ಎಲೆಗಳು ವಿರೂಪಗೊಳ್ಳುವುದು ಮತ್ತು ಕೀಟಗಳ ಮೂಲಕ ಇಡೀ ತೋಟಕ್ಕೆ ಹರಡುವುದು.";
    translated.recovery_timeline = "ಗುಣಪಡಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ (ಹರಡದಂತೆ ತಡೆಗಟ್ಟುವುದರ ಮೇಲೆ ಗಮನ ಹರಿಸಿ)";
    translated.expert_tip = "ವೈರಸ್ ಅನ್ನು ರಾಸಾಯನಿಕವಾಗಿ ಗುಣಪಡಿಸಲು ಸಾಧ್ಯವಿಲ್ಲದ ಕಾರಣ, ಕೀಟ ವಾಹಕಗಳನ್ನು ನಿಯಂತ್ರಿಸುವುದರ ಮೇಲೆ 100% ಗಮನ ಹರಿಸಿ.";
    translated.treatment_plan = {
      immediate_actions: ["ಸೋಂಕಿತ ಗಿಡಗಳನ್ನು ತಕ್ಷಣವೇ ಕಿತ್ತು ಸುಟ್ಟುಹಾಕಿ.", "ಸುತ್ತಮುತ್ತಲಿನ ಹೀರುವ ಕೀಟಗಳ (ಗಿಡಹೇನು/ಬಿಳಿ ನೊಣ) ಸಂಖ್ಯೆಯನ್ನು ನಿಯಂತ್ರಿಸಿ.", "ಆರೋಗ್ಯಕರ ಗಿಡಗಳನ್ನು ಮುಟ್ಟುವ ಮುನ್ನ ಕೈಗಳನ್ನು ಸೋಪಿನಿಂದ ತೊಳೆಯಿರಿ."],
      chemical_treatments: [
        {
          chemical_name: "ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್ (ಕೀಟ ನಿಯಂತ್ರಣ)",
          active_ingredient: "ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್ 17.8% SL",
          dosage: "1 ಲೀಟರ್ ನೀರಿಗೆ 0.5ಮಿಲಿ",
          application_method: "ಕೀಟಗಳನ್ನು ನಿಯಂತ್ರಿಸಲು ಎಲೆಗಳಿಗೆ ಸಿಂಪಡಿಸಿ",
          frequency: "15 ದಿನಗಳಿಗೊಮ್ಮೆ",
          safety_precautions: "ಜೇನುನೊಣಗಳಿಗೆ ಅತ್ಯಂತ ವಿಷಕಾರಿ. ಮುಂಜಾನೆ ಅಥವಾ ಸಂಜೆ ವೇಳೆ ಸಿಂಪಡಿಸಿ.",
          approximate_cost: "ಒಂದು ಬಾಟಲಿಗೆ ₹1,200"
        }
      ],
      organic_alternatives: [
        {
          remedy: "ಹಳದಿ ಜಿಗುಟು ಬಲೆಗಳು",
          preparation: "ಗಿಡಗಳ ಎತ್ತರಕ್ಕೆ ತಕ್ಕಂತೆ ಹಳದಿ ಜಿಗುಟು ಕಾರ್ಡ್‌ಗಳನ್ನು ನೇತುಹಾಕಿ",
          application: "ಹೀರುವ ಕೀಟಗಳನ್ನು ನೈಸರ್ಗಿಕವಾಗಿ ಆಕರ್ಷಿಸಿ ಹಿಡಿಯುತ್ತದೆ"
        },
        {
          remedy: "ಕೀಟನಾಶಕ ಸೋಪ್ ದ್ರಾವಣ",
          preparation: "1 ಲೀಟರ್ ನೀರಿನಲ್ಲಿ 20ಮಿಲಿ ಸೋಪ್ ಮಿಶ್ರಣ ಮಾಡಿ",
          application: "ಎಲೆಗಳ ಕೆಳಭಾಗದಲ್ಲಿರುವ ಕೀಟಗಳ ಗೂಡುಗಳಿಗೆ ಸಿಂಪಡಿಸಿ"
        }
      ],
      preventive_measures: ["ಎಳೆಯ ಸಸ್ಯಗಳ ಮೇಲೆ ಕೀಟ ನಿರೋಧಕ ಜಾಲರಿಗಳನ್ನು ಬಳಸಿ.", "ವೈರಸ್ ಹೊಂದಿರುವ ಕಳೆಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ತೆಗೆದುಹಾಕಿ.", "ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಸಿ."]
    };
  } else if (report.category === "Nematodal") {
    translated.symptoms_observed = ["ಬೇರುಗಳಲ್ಲಿ ಗಂಟುಗಳು ಕಂಡುಬರುವುದು", "ತೇವಾಂಶವಿದ್ದರೂ ಬಿಸಿಲಿನಲ್ಲಿ ಗಿಡಗಳು ಒಣಗುವುದು", "ಕುಂಠಿತ ಬೆಳವಣಿಗೆ ಮತ್ತು ಹಳದಿ ಎಲೆಗಳು", "ದುರ್ಬಲ ಬೇರು ವ್ಯವಸ್ಥೆ"];
    translated.cause = "ಸೂಕ್ಷ್ಮದರ್ಶಕ ರೌಂಡ್‌ವರ್ಮ್‌ಗಳು ಬೇರುಗಳ ಒಳಗೆ ಆಹಾರ ಸೇವಿಸಿ ನೀರು ಹೀರದಂತೆ ತಡೆಯುವುದು.";
    translated.disease_description = `ಬೇರುಗಳನ್ನು ಆಕ್ರಮಿಸುವ ನೆಮಟೋಡ್ ಕೀಟಗಳು ಸಸ್ಯದ ಪೋಷಕಾಂಶಗಳನ್ನು ಹೀರಲಿಕ್ಕೆ ಶುರುಮಾಡುತ್ತವೆ ಮತ್ತು ಬೇರುಗಳಲ್ಲಿ ಗಂಟುಗಳನ್ನು ಉಂಟುಮಾಡುತ್ತವೆ.`;
    translated.if_untreated = "ಬೆಳೆಯ ನಿಧಾನಗತಿಯ ಸಾವು, ಬೇರುಗಳ ಸಂಪೂರ್ಣ ನಾಶ ಮತ್ತು ಮಣ್ಣಿನಲ್ಲಿ ಕೀಟಗಳ ಕಾಯಂ ಸೋಂಕು.";
    translated.recovery_timeline = "30 ರಿಂದ 60 ದಿನಗಳು (ಮಣ್ಣಿನ ಚಿಕಿತ್ಸೆ)";
    translated.expert_tip = "ಸಾಕಷ್ಟು ಸಾವಯವ ಗೊಬ್ಬರವನ್ನು ಬಳಸಿ; ಮಣ್ಣಿನಲ್ಲಿರುವ ಪ್ರಯೋಜನಕಾರಿ ಶಿಲೀಂಧ್ರಗಳು ನೆಮಟೋಡ್‌ಗಳನ್ನು ನಿಯಂತ್ರಣದಲ್ಲಿಡುತ್ತವೆ.";
    translated.treatment_plan = {
      immediate_actions: ["ಬೇಸಿಗೆಯಲ್ಲಿ ಮಣ್ಣನ್ನು ಪ್ಲಾಸ್ಟಿಕ್ ಹೊದಿಕೆಯಿಂದ ಮುಚ್ಚಿ ಸೂರ್ಯನ ತಾಪಕ್ಕೆ ಕಾಯಿಸಿ (ಸೋಲರೈಸೇಶನ್).", "ಸೋಂಕಿತ ಗಿಡಗಳನ್ನು ಕಿತ್ತುಹಾಕಿ.", "ಮಣ್ಣಿಗೆ ಸಾವಯವ ಗೊಬ್ಬರ ಸೇರಿಸಿ."],
      chemical_treatments: [
        {
          chemical_name: "ಫ್ಲೂಯೆನ್ಸಲ್ಫೋನ್ ನೆಮಟಿಸೈಡ್",
          active_ingredient: "ಫ್ಲೂಯೆನ್ಸಲ್ಫೋನ್ (2% GR)",
          dosage: "ಪ್ರತಿ ಚದರ ಮೀಟರ್‌ಗೆ 20 ಗ್ರಾಂ",
          application_method: "ಬೇರುಗಳ ಸುತ್ತಲಿನ ಮಣ್ಣಿನಲ್ಲಿ ಮಿಶ್ರಣ ಮಾಡಿ",
          frequency: "ಬಿತ್ತನೆಗೆ ಮುಂಚಿತವಾಗಿ ಅಥವಾ ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ಒಂದು ಬಾರಿ",
          safety_precautions: "ಚರ್ಮದ ಸಂಪರ್ಕವನ್ನು ತಪ್ಪಿಸಿ. ಜಲಚರಗಳಿಗೆ ಹಾನಿಕಾರಕ.",
          approximate_cost: "ಪ್ಯಾಕ್‌ಗೆ ₹3,600"
        }
      ],
      organic_alternatives: [
        {
          remedy: "ಚೆಂಡು ಹೂವಿನ ಸಹ-ಬೆಳೆ",
          preparation: "ಬೆಳೆಗಳ ಸುತ್ತಲೂ ಚೆಂಡು ಹೂವಿನ ಗಿಡಗಳನ್ನು ದಟ್ಟವಾಗಿ ಬೆಳೆಸಿ",
          application: "ಇದರ ಬೇರುಗಳು ನೆಮಟೋಡ್‌ಗಳಿಗೆ ವಿಷಕಾರಿಯಾದ ಆಲ್ಫಾ-ಟರ್ಥಿನೈಲ್ ಅನ್ನು ಬಿಡುಗಡೆ ಮಾಡುತ್ತವೆ"
        },
        {
          remedy: "ಬೇವು ಹಿಂಡಿ ಬಳಕೆ",
          preparation: "ಪ್ರತಿ ಗಿಡದ ಬುಡಕ್ಕೆ 100 ಗ್ರಾಂ ಬೇವಿನ ಹಿಂಡಿ ಪುಡಿ ಸೇರಿಸಿ",
          application: "ಮೇಲ್ಮಣ್ಣಿನಲ್ಲಿ ಚೆನ್ನಾಗಿ ಮಿಶ್ರಣ ಮಾಡಿ ನೀರುಣಿಸಿ"
        }
      ],
      preventive_measures: ["ಏಕದಳ ಧಾನ್ಯಗಳೊಂದಿಗೆ ಬೆಳೆ ಸರದಿಯನ್ನು ಅನುಸರಿಸಿ.", "ಮಣ್ಣಿನ ಸೂಕ್ಷ್ಮಜೀವಿಗಳನ್ನು ಹೆಚ್ಚಿಸಲು ಹಟ್ಟಿ ಗೊಬ್ಬರ ಬಳಸಿ.", "ಸಸಿಮಡಿಗಳನ್ನು ಮುಂಚಿತವಾಗಿ ಬಿಸಿಲಿನಲ್ಲಿ ಒಣಗಿಸಿ."]
    };
  } else if (report.category === "Nutritional Deficiency") {
    translated.symptoms_observed = ["ನರಗಳ ಮಧ್ಯೆ ಹಳದಿಯಾಗುವುದು (ಹಸಿರು ನರಗಳು, ಹಳದಿ ಎಲೆ)", "ಎಲೆಗಳ ಕೆಳಭಾಗದಲ್ಲಿ ನೇರಳೆ ಬಣ್ಣ ಕಂಡುಬರುವುದು", "ನಿಧಾನ ಬೆಳವಣಿಗೆ", "ಎಲೆಗಳ ತುದಿ ಒಣಗುವುದು"];
    translated.cause = "ಮಣ್ಣಿನಲ್ಲಿ ಅಗತ್ಯ ಖನಿಜಗಳ ಕೊರತೆ ಅಥವಾ ಮಣ್ಣಿನ ಪಿಹೆಚ್ (pH) ಮಟ್ಟ ತಪ್ಪಾಗಿರುವುದರಿಂದ ಪೋಷಕಾಂಶ ಹೀರಿಕೊಳ್ಳಲು ಅಡ್ಡಿ.";
    translated.disease_description = `ಇದು ಪೋಷಕಾಂಶಗಳ ಕೊರತೆಯ ಅಸ್ವಸ್ಥತೆಯಾಗಿದೆ. ಸಸ್ಯಕ್ಕೆ ಕ್ಲೋರೊಫಿಲ್ ಮತ್ತು ಶಕ್ತಿಯನ್ನು ತಯಾರಿಸಲು ಅಗತ್ಯ ಅಂಶಗಳು ಲಭ್ಯವಿಲ್ಲ.`;
    translated.if_untreated = "ಕುಂಠಿತ ಬೆಳವಣಿಗೆ, ಹೂವು ಬಿಡದಿರುವುದು, ಎಲೆಗಳು ಉದುರುವುದು ಮತ್ತು ದುರ್ಬಲ ಕಾಂಡಗಳು ಗಾಳಿಗೆ ಮುರಿದುಬೀಳುವುದು.";
    translated.recovery_timeline = "7 ರಿಂದ 14 ದಿನಗಳು (ವೇಗದ ದೃಶ್ಯ ಪ್ರತಿಕ್ರಿಯೆ)";
    translated.expert_tip = "ಎಲೆ ಹಳದಿಯಾಗುವುದು ಹೆಚ್ಚಾಗಿ ಮಣ್ಣಿನ ಅತಿ ತೇವಾಂಶ ಅಥವಾ ಅಸಮರ್ಪಕ pH ನಿಂದ ಉಂಟಾಗುತ್ತದೆ, ಇದು ಪೋಷಕಾಂಶಗಳನ್ನು ಲಾಕ್ ಮಾಡುತ್ತದೆ.";
    translated.treatment_plan = {
      immediate_actions: ["ಮಣ್ಣಿನ pH ಪರೀಕ್ಷಿಸಿ.", "ತ್ವರಿತ ಹೀರಿಕೊಳ್ಳುವಿಕೆಗಾಗಿ ಎಲೆಗಳ ಮೇಲೆ ಪೋಷಕಾಂಶಗಳ ಸಿಂಪಡಣೆ ಮಾಡಿ.", "ನೀರುಣಿಸುವ ನೀರಿನ pH ಸರಿಪಡಿಸಿ."],
      chemical_treatments: [
        {
          chemical_name: "ಕಿಲೇಟೆಡ್ ಸೂಕ್ಷ್ಮ ಪೋಷಕಾಂಶ ಸಿಂಪಡಣೆ",
          active_ingredient: "ಕಿಲೇಟೆಡ್ ಕಬ್ಬಿಣ/EDTA ಸಂಯುಕ್ತ",
          dosage: "1 ಲೀಟರ್ ನೀರಿಗೆ 1 ಗ್ರಾಂ",
          application_method: "ತ್ವರಿತ ಪೋಷಣೆಗಾಗಿ ನೇರವಾಗಿ ಎಲೆಗಳಿಗೆ ಸಿಂಪಡಿಸಿ",
          frequency: "7 ದಿನಗಳ ಅಂತರದಲ್ಲಿ ಎರಡು ಬಾರಿ",
          safety_precautions: "ತಂಪಾದ ಒಣ ಜಾಗದಲ್ಲಿ ಸಂಗ್ರಹಿಸಿ. ಕಣ್ಣುಗಳ ಸಂಪರ್ಕ ತಪ್ಪಿಸಿ.",
          approximate_cost: "ಬಾಟಲಿಗೆ ₹1,100"
        },
        {
          chemical_name: "NPK ರಸಗೊಬ್ಬರ",
          active_ingredient: "NPK 19-19-19 ಸಮತೋಲಿತ ಮಿಶ್ರಣ",
          dosage: "1 ಲೀಟರ್ ನೀರಿಗೆ 5 ಗ್ರಾಂ",
          application_method: "ಬೇರುಗಳ ಸುತ್ತಲೂ ಮಣ್ಣನ್ನು ನೆನೆಸಿ",
          frequency: "15 ದಿನಗಳಿಗೊಮ್ಮೆ",
          safety_precautions: "ಬೇರುಗಳು ಸುಡುವುದನ್ನು ತಡೆಯಲು ಅತಿಯಾದ ರಸಗೊಬ್ಬರ ಬಳಸಬೇಡಿ.",
          approximate_cost: "1 ಕೆಜಿಗೆ ₹700"
        }
      ],
      organic_alternatives: [
        {
          remedy: "ಕಾಂಪೋಸ್ಟ್ ಟೀ ಸಿಂಪಡಣೆ",
          preparation: "1 ಲೀಟರ್ ಕಾಂಪೋಸ್ಟ್ ಅನ್ನು 5 ಲೀಟರ್ ನೀರಿನಲ್ಲಿ 24 ಗಂಟೆಗಳ ಕಾಲ ನೆನೆಸಿಡಿ",
          application: "ಸೂಕ್ಷ್ಮ ಪೋಷಕಾಂಶಗಳಿಗಾಗಿ ಎಲೆಗಳಿಗೆ ಸಿಂಪಡಿಸಿ ಮತ್ತು ಬೇರುಗಳಿಗೆ ಸುರಿಯಿರಿ"
        },
        {
          remedy: "ಎಪ್ಸಮ್ ಸಾಲ್ಟ್ (ಮೆಗ್ನೀಸಿಯಮ್‌ಗಾಗಿ)",
          preparation: "1 ಲೀಟರ್ ಬಿಸಿ ನೀರಿನಲ್ಲಿ 10 ಗ್ರಾಂ ಎಪ್ಸಮ್ ಸಾಲ್ಟ್ ಕರಗಿಸಿ",
          application: "ಹಳದಿ ಎಲೆಗಳನ್ನು ಹೊಂದಿರುವ ಗಿಡದ ಬೇರುಗಳಿಗೆ ಸುರಿಯಿರಿ"
        }
      ],
      preventive_measures: ["ಮಣ್ಣಿನ pH ಅನ್ನು ಆದರ್ಶ 6.0–6.8 ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಇರಿಸಿ.", "ಪ್ರತಿ ಹಂಗಾಮಿನಲ್ಲಿ ಎರಡು ಬಾರಿ ಸಮೃದ್ಧವಾದ ಎರೆಗೊಬ್ಬರವನ್ನು ಮಣ್ಣಿಗೆ ಸೇರಿಸಿ.", "ಬೇರುಗಳು ಉಸಿರಾಡಲು ಅತಿಯಾದ ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ."]
    };
  } else {
    translated.symptoms_observed = ["ಎಲೆಗಳ ಮೇಲೆ ಸಣ್ಣ ಹಳದಿ ಚುಕ್ಕೆಗಳು", "ಎಲೆಯ ಮೇಲ್ಭಾಗದಲ್ಲಿ ಜಿಗುಟಾದ ಜೇನುತುಪ್ಪದಂತಹ ದ್ರವ", "ಎಲೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ತೆಳುವಾದ ಜಾಲಗಳು", "ವಿರೂಪಗೊಂಡ ಎಲೆಗಳು"];
    translated.cause = "ಹೀರುವ ಅಥವಾ ಕಡಿಯುವ ಕೀಟಗಳು ಸಸ್ಯದ ರಸ ಮತ್ತು ಅಂಗಾಂಶಗಳನ್ನು ತಿನ್ನುವುದು.";
    translated.disease_description = `ಇದು ಕೀಟಗಳ ದಾಳಿಯಾಗಿದೆ. ಕೀಟಗಳು ಜೀವಕೋಶಗಳಿಂದ ಕ್ಲೋರೊಫಿಲ್ ಮತ್ತು ಸಕ್ಕರೆಯನ್ನು ಹೀರುತ್ತವೆ, ಇದು ಬೂಷ್ಟು ರೋಗವನ್ನು ಆಹ್ವಾನಿಸುತ್ತದೆ.`;
    translated.if_untreated = "ಎಲೆಗಳು ವಿರೂಪಗೊಳ್ಳುವುದು, ಜಿಗುಟಾದ ದ್ರವದ ಮೇಲೆ ಕಪ್ಪು ಬೂಷ್ಟು ಬೆಳೆಯುವುದು ಮತ್ತು ಬೆಳೆ ಸಂಪೂರ್ಣ ನಾಶವಾಗುವುದು.";
    translated.recovery_timeline = "7 ರಿಂದ 10 ದಿನಗಳ ನಿಯಮಿತ ನಿಯಂತ್ರಣ";
    translated.expert_tip = "ಎಲೆಗಳ ಕೆಳಭಾಗವನ್ನು ಗುರಿಯಾಗಿಸಿ; 90% ಹೀರುವ ಕೀಟಗಳು ಅಲ್ಲಿ ಅಡಗಿಕೊಳ್ಳುತ್ತವೆ ಮತ್ತು ಮೊಟ್ಟೆಗಳನ್ನು ಇಡುತ್ತವೆ.";
    translated.treatment_plan = {
      immediate_actions: ["ಕೀಟಗಳನ್ನು ಪ್ರಬಲ ನೀರಿನ ಜಿಟಿಜಿತಿಯಿಂದ ತೊಳೆದುಹಾಕಿ.", "ತಕ್ಷಣವೇ ಕೀಟನಾಶಕ ಸೋಪ್ ಸಿಂಪಡಿಸಿ.", "ಹೆಚ್ಚು ಬಾಧಿತವಾದ ಹೂವು ಅಥವಾ ಎಲೆ ಮೊಗ್ಗುಗಳನ್ನು ಕತ್ತರಿಸಿ."],
      chemical_treatments: [
        {
          chemical_name: "ಅಬಾಮೆಕ್ಟಿನ್ ಮೈಟಿಸೈಡ್",
          active_ingredient: "ಅಬಾಮೆಕ್ಟಿನ್ 1.8% EC",
          dosage: "1 ಲೀಟರ್ ನೀರಿಗೆ 0.5ಮಿಲಿ",
          application_method: "ಎಲೆಗಳ ಕೆಳಭಾಗವನ್ನು ಗುರಿಯಾಗಿಸಿ ಸಿಂಪಡಿಸಿ",
          frequency: "ಒಂದು ಬಾರಿ, ಕೀಟಗಳು ಮುಂದುವರಿದರೆ 7 ದಿನಗಳ ನಂತರ ಪುನರಾವರ್ತಿಸಿ",
          safety_precautions: "ರಕ್ಷಣಾತ್ಮಕ ಮಾಸ್ಕ್ ಧರಿಸಿ. ಸಿಂಪಡಿಸಿದ ನಂತರ 14 ದಿನಗಳವರೆಗೆ ಕೊಯ್ಲು ಮಾಡಬೇಡಿ.",
          approximate_cost: "ಬಾಟಲಿಗೆ ₹1,800"
        }
      ],
      organic_alternatives: [
        {
          remedy: "ಬೇವಿನ ಎಣ್ಣೆ ಮತ್ತು ಸೋಪ್ ಸಿಂಪಡಣೆ",
          preparation: "1 ಲೀಟರ್ ನೀರಿನಲ್ಲಿ 15ಮಿಲಿ ದ್ರವ ಸೋಪ್ ಮತ್ತು 5ಮಿಲಿ ಬೇವಿನ ಎಣ್ಣೆ ಮಿಶ್ರಣ ಮಾಡಿ",
          application: "ಎಲೆಗಳ ಕೆಳಭಾಗಕ್ಕೆ ಸಂಪೂರ್ಣವಾಗಿ ಸಿಂಪಡಿಸಿ"
        },
        {
          remedy: "ಪರಭಕ್ಷಕ ಕೀಟಗಳ ಬಳಕೆ",
          preparation: "ಲೇಡಿಬಗ್ಸ್ ಅಥವಾ ಲೇಸ್‌ವಿಂಗ್ಸ್‌ನಂತಹ ಮಿತ್ರ ಕೀಟಗಳನ್ನು ತೋಟಕ್ಕೆ ಬಿಡಿ",
          application: "ಸಂಜೆಯ ಸಮಯದಲ್ಲಿ ಬೆಳೆಗಳ ಮೇಲೆ ನೇರವಾಗಿ ಬಿಡುಗಡೆ ಮಾಡಿ"
        }
      ],
      preventive_measures: ["ಕೀಟಗಳು ವಾಸಿಸುವ ಸುತ್ತಮುತ್ತಲಿನ ಕಸ ಮತ್ತು ಕಳೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ.", "ವಾರಕ್ಕೊಮ್ಮೆ ಎಲೆಗಳ ಕೆಳಭಾಗವನ್ನು ಪರೀಕ್ಷಿಸಿ.", "ಬೆಳ್ಳುಳ್ಳಿ ಮತ್ತು ಚೆಂಡು ಹೂವನ್ನು ಸಹ-ಬೆಳೆಯಾಗಿ ಬೆಳೆಸಿ."]
    };
  }

  if (report.disease_code === "JOW-001") {
    translated.disease_description = "ಜೋಳದ ಗಿಡಗಳಿಗೆ ತಗಲುವ ಧಾನ್ಯದ ಬೂಷ್ಟು ರೋಗ. ಇದು ಬಿತ್ತನೆ ಸಮಯದಲ್ಲಿ ಧಾನ್ಯಗಳ ಗುಣಮಟ್ಟವನ್ನು ಕೆಡಿಸುತ್ತದೆ.";
  }
  
  translated.seasonal_risk = report.seasonal_risk === "Summer / Warm Monsoons" ? "ಬೇಸಿಗೆ / ಬೆಚ್ಚಗಿನ ಮುಂಗಾರು" : "ಚಳಿಗಾಲ";
  translated.follow_up_care = ["ವಾರಕ್ಕೊಮ್ಮೆ ಹೊಸ ಎಲೆಗಳ ಮೇಲೆ ರೋಗ ಮರುಕಳಿಸುವುದನ್ನು ಪರಿಶೀಲಿಸಿ.", "ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಿ ಆದರೆ ಎಲೆಗಳು ಒಣಗಿರಲಿ.", "ಭಾರೀ ಮಳೆಯ ನಂತರ ರಕ್ಷಣಾತ್ಮಕ ಸಾವಯವ ಸಿಂಪಡಣೆಯನ್ನು ಮರು-ಅನ್ವಯಿಸಿ."];
  translated.similar_diseases = report.similar_diseases.map(d => DISEASE_TRANSLATIONS[d] || d);

  return translated;
}

// --- APP COMPONENT ---
export default function App() {
  // --- STATE LIST ---
  const [isSplashing, setIsSplashing] = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    let list = [];
    try {
      const saved = localStorage.getItem('ac_registered_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) list = parsed;
      }
    } catch (e) {
      console.error("Init registered users failed", e);
    }
    if (!list.some(u => u && u.email && u.email.toLowerCase() === 'admin123@gmail.com')) {
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
      try {
        localStorage.setItem('ac_registered_users', JSON.stringify(list));
      } catch (e) {
        console.error(e);
      }
    }
    return list;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ac_current_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.email) return parsed;
      }
    } catch (e) {
      console.error("Init current user failed", e);
    }
    return null;
  });

  // Pages: 'dashboard' | 'scan' | 'encyclopedia' | 'history' | 'analytics' | 'fields' | 'settings'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('ac_lang');
      if (saved) return saved;
    } catch (e) {
      console.error("Init language failed", e);
    }
    return 'en';
  });

  const [customDiseases, setCustomDiseases] = useState(() => {
    try {
      const saved = localStorage.getItem('ac_custom_diseases');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Init custom diseases failed", e);
    }
    return [];
  });

  const t = (key) => {
    return UI_TRANSLATIONS[language]?.[key] || UI_TRANSLATIONS['en']?.[key] || key;
  };

  const tc = (cropName) => {
    if (language !== 'kn') return cropName;
    return CROP_TRANSLATIONS[cropName] || cropName;
  };

  const td = (diseaseName) => {
    if (language !== 'kn') return diseaseName;
    const custom = customDiseases.find(d => d.name === diseaseName);
    if (custom && custom.name_kn) return custom.name_kn;
    return DISEASE_TRANSLATIONS[diseaseName] || diseaseName;
  };

  const tcat = (cat) => {
    if (language !== 'kn') return cat;
    return cat === "All" ? "ಎಲ್ಲಾ" :
           cat === "Fungal" ? "ಶಿಲೀಂಧ್ರ" :
           cat === "Bacterial" ? "ಬ್ಯಾಕ್ಟೀರಿಯಾ" :
           cat === "Viral" ? "ವೈರಸ್" :
           cat === "Nematodal" ? "ನೆಮಟೋಡ್" :
           cat === "Nutritional Deficiency" ? "ಪೋಷಕಾಂಶಗಳ ಕೊರತೆ" :
           cat === "Pest" ? "ಕೀಟಗಳು" : cat;
  };

  const tsev = (severity) => {
    if (language !== 'kn') return severity;
    return severity === "Critical" ? "ಅತಿ ಗಂಭೀರ" :
           severity === "Severe" ? "ಗಂಭೀರ" :
           severity === "Moderate" ? "ಮಧ್ಯಮ" : "ಸೌಮ್ಯ";
  };
  
  // Profile editing state
  const [profileName, setProfileName] = useState(currentUser?.name || '');
  const [profileRole, setProfileRole] = useState(currentUser?.role || 'Farmer');
  const [profileLocation, setProfileLocation] = useState(currentUser?.location || '');

  useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.name || '');
      setProfileRole(currentUser.role || 'Farmer');
      setProfileLocation(currentUser.location || '');
    }
  }, [currentUser]);

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
    try {
      const saved = localStorage.getItem('ac_notif_prefs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {
      console.error("Init notif prefs failed", e);
    }
    return { scanComplete: true, seasonalAlert: true, reminders: true, dailyTip: true };
  });

  // Global Toasts state
  const [toasts, setToasts] = useState([]);

  // Sidebar states
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('ac_notifications');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Init notifications failed", e);
    }
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
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [scanError, setScanError] = useState(null);
  
  // Crop Advisor states
  const [advisorState, setAdvisorState] = useState('Maharashtra');
  const [isLocating, setIsLocating] = useState(false);
  const [advisorLocation, setAdvisorLocation] = useState(null); // { lat, lng }
  
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
    try {
      const saved = localStorage.getItem('ac_scan_history');
      if (saved) {
        const history = JSON.parse(saved);
        if (Array.isArray(history)) {
          return history.map(s => {
            if (!s || !s.plant_name || !s.report || !s.report.disease_name) return null;
            
            // Ensure treatment_plan exists and is robust
            const treatment_plan = s.report.treatment_plan || {};
            const sanitized_plan = {
              immediate_actions: Array.isArray(treatment_plan.immediate_actions) ? treatment_plan.immediate_actions : [],
              chemical_treatments: Array.isArray(treatment_plan.chemical_treatments) ? treatment_plan.chemical_treatments : [],
              organic_alternatives: Array.isArray(treatment_plan.organic_alternatives) ? treatment_plan.organic_alternatives : [],
              preventive_measures: Array.isArray(treatment_plan.preventive_measures) ? treatment_plan.preventive_measures : []
            };

            // Ensure other report properties exist
            const report = {
              ...s.report,
              disease_code: s.report.disease_code || s.report.id || "JOW-001",
              scientific_name: s.report.scientific_name || s.report.scientific || "Species",
              severity: s.report.severity || "Moderate",
              category: s.report.category || "Fungal",
              confidence: typeof s.report.confidence === 'number' ? s.report.confidence : 85,
              affected_parts: Array.isArray(s.report.affected_parts) ? s.report.affected_parts : ["Leaves"],
              symptoms_observed: Array.isArray(s.report.symptoms_observed) ? s.report.symptoms_observed : [],
              cause: s.report.cause || "Pathogenic infection",
              disease_description: s.report.disease_description || "Plant disease infection",
              spread_risk: s.report.spread_risk || "Medium",
              if_untreated: s.report.if_untreated || "Loss of crop yield",
              recovery_timeline: s.report.recovery_timeline || "14-21 days",
              expert_tip: s.report.expert_tip || "",
              similar_diseases: Array.isArray(s.report.similar_diseases) ? s.report.similar_diseases : [],
              treatment_plan: sanitized_plan
            };

            return {
              ...s,
              report,
              healthScore: typeof s.healthScore === 'number' ? s.healthScore : 80,
              field_id: s.field_id || ""
            };
          }).filter(Boolean);
        }
      }
    } catch (e) {
      console.error("Init scan history sanitization failed", e);
    }
    return [];
  });
  const [historySearch, setHistorySearch] = useState('');
  const [historyTimeFilter, setHistoryTimeFilter] = useState('all'); // 'all' | 'week' | 'month'
  const [historyPlantFilter, setHistoryPlantFilter] = useState('all');

  // Encyclopedia states
  const [encSearch, setEncSearch] = useState('');
  const [encCategory, setEncCategory] = useState('All');
  const [selectedEncyclopediaDisease, setSelectedEncyclopediaDisease] = useState(null);

  const combinedDiseases = useMemo(() => {
    return [...ENCYCLOPEDIA_DATABASE, ...customDiseases];
  }, [customDiseases]);

  // Botanist Add Crop Disease Form State
  const [showAddDiseaseModal, setShowAddDiseaseModal] = useState(false);
  const [newDiseaseName, setNewDiseaseName] = useState('');
  const [newDiseaseNameKn, setNewDiseaseNameKn] = useState('');
  const [newDiseaseScientific, setNewDiseaseScientific] = useState('');
  const [newDiseaseCrop, setNewDiseaseCrop] = useState('Jowar (Sorghum)');
  const [newDiseaseCategory, setNewDiseaseCategory] = useState('Fungal');
  const [newDiseaseSeverity, setNewDiseaseSeverity] = useState('Moderate');
  const [newDiseaseDesc, setNewDiseaseDesc] = useState('');
  const [newDiseaseDescKn, setNewDiseaseDescKn] = useState('');
  const [newDiseaseCause, setNewDiseaseCause] = useState('');
  const [newDiseaseCauseKn, setNewDiseaseCauseKn] = useState('');
  const [newDiseaseAction, setNewDiseaseAction] = useState('');
  const [newDiseaseActionKn, setNewDiseaseActionKn] = useState('');
  const [newDiseaseChemicalName, setNewDiseaseChemicalName] = useState('');
  const [newDiseaseChemicalIngredient, setNewDiseaseChemicalIngredient] = useState('');
  const [newDiseaseChemicalCost, setNewDiseaseChemicalCost] = useState('');
  const [newDiseaseOrganicRemedy, setNewDiseaseOrganicRemedy] = useState('');
  const [newDiseaseOrganicPrep, setNewDiseaseOrganicPrep] = useState('');
  const [newDiseaseOrganicCost, setNewDiseaseOrganicCost] = useState('');
  const [newDiseaseImages, setNewDiseaseImages] = useState([]);

  // Fields (My Fields) state
  const [fields, setFields] = useState(() => {
    try {
      const saved = localStorage.getItem('ac_fields');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Init fields failed", e);
    }
    return [
      { id: 'f-1', name: "Jowar Field A", plantType: "Jowar (Sorghum)", status: "Healthy", scansCount: 0 },
      { id: 'f-2', name: "Wheat Plot 1", plantType: "Wheat", status: "Healthy", scansCount: 0 }
    ];
  });
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldPlant, setNewFieldPlant] = useState('Jowar (Sorghum)');

  // Reminders state
  const [reminders, setReminders] = useState(() => {
    try {
      const saved = localStorage.getItem('ac_reminders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Init reminders failed", e);
    }
    return [];
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
    try {
      const saved = localStorage.getItem('ac_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Init chat messages failed", e);
    }
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
    return Object.keys(counts).map(key => ({
      name: language === 'kn'
        ? (key === "Fungal" ? "ಶಿಲೀಂಧ್ರ" : key === "Bacterial" ? "ಬ್ಯಾಕ್ಟೀರಿಯಾ" : key === "Viral" ? "ವೈರಸ್" : key === "Nematodal" ? "ನೆಮಟೋಡ್" : key === "Nutritional Deficiency" ? "ಪೋಷಕಾಂಶಗಳ ಕೊರತೆ" : key === "Pest" ? "ಕೀಟಗಳು" : "ಅಜೈವಿಕ")
        : key,
      value: counts[key]
    })).filter(d => d.value > 0);
  }, [scanHistory, language]);

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
    return Object.keys(counts).map(key => ({ plant: tc(key), Count: counts[key] })).sort((a, b) => b.Count - a.Count).slice(0, 5);
  }, [scanHistory, language]);

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
          const sanitizedHistory = history.map(s => {
            if (!s || !s.plant_name || !s.report || !s.report.disease_name) return null;
            
            // Ensure treatment_plan exists and is robust
            const treatment_plan = s.report.treatment_plan || {};
            const sanitized_plan = {
              immediate_actions: Array.isArray(treatment_plan.immediate_actions) ? treatment_plan.immediate_actions : [],
              chemical_treatments: Array.isArray(treatment_plan.chemical_treatments) ? treatment_plan.chemical_treatments : [],
              organic_alternatives: Array.isArray(treatment_plan.organic_alternatives) ? treatment_plan.organic_alternatives : [],
              preventive_measures: Array.isArray(treatment_plan.preventive_measures) ? treatment_plan.preventive_measures : []
            };

            // Ensure other report properties exist
            const report = {
              ...s.report,
              disease_code: s.report.disease_code || s.report.id || "JOW-001",
              scientific_name: s.report.scientific_name || s.report.scientific || "Species",
              severity: s.report.severity || "Moderate",
              category: s.report.category || "Fungal",
              confidence: typeof s.report.confidence === 'number' ? s.report.confidence : 85,
              affected_parts: Array.isArray(s.report.affected_parts) ? s.report.affected_parts : ["Leaves"],
              symptoms_observed: Array.isArray(s.report.symptoms_observed) ? s.report.symptoms_observed : [],
              cause: s.report.cause || "Pathogenic infection",
              disease_description: s.report.disease_description || "Plant disease infection",
              spread_risk: s.report.spread_risk || "Medium",
              if_untreated: s.report.if_untreated || "Loss of crop yield",
              recovery_timeline: s.report.recovery_timeline || "14-21 days",
              expert_tip: s.report.expert_tip || "",
              similar_diseases: Array.isArray(s.report.similar_diseases) ? s.report.similar_diseases : [],
              treatment_plan: sanitized_plan
            };

            return {
              ...s,
              report,
              healthScore: typeof s.healthScore === 'number' ? s.healthScore : 80
            };
          }).filter(Boolean);

          if (sanitizedHistory.length !== history.length || JSON.stringify(sanitizedHistory) !== saved) {
            setScanHistory(sanitizedHistory);
            localStorage.setItem('ac_scan_history', JSON.stringify(sanitizedHistory));
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
    localStorage.setItem('ac_lang', language);
  }, [language]);

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

  // --- LOCATION ADVISOR FETCHERS ---
  const fetchIPLocationFallback = async () => {
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (res.ok) {
        const ipData = await res.json();
        const region = ipData.region || ipData.region_name || "";
        const matchedState = Object.keys(SOIL_REGION_DATABASE).find(s => 
          region.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(region.toLowerCase())
        );
        if (matchedState) {
          setAdvisorState(matchedState);
          if (ipData.latitude && ipData.longitude) {
            setAdvisorLocation({ lat: ipData.latitude, lng: ipData.longitude });
          }
          triggerToast(`Location resolved to ${matchedState} (via IP)!`, "success");
          return;
        }
      }
    } catch (e) {
      console.error("IP fallback failed:", e);
    }
    triggerToast("Auto-location failed. Please select your region manually.", "info");
  };

  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      triggerToast("Geolocation is not supported by your browser.", "error");
      return;
    }
    setIsLocating(true);
    triggerToast("Retrieving GPS coordinates...", "info");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setAdvisorLocation({ lat: latitude, lng: longitude });
        
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          if (response.ok) {
            const data = await response.json();
            const address = data.address || {};
            const state = address.state || address.region || "";
            const matchedState = Object.keys(SOIL_REGION_DATABASE).find(s => 
              state.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(state.toLowerCase())
            );
            if (matchedState) {
              setAdvisorState(matchedState);
              triggerToast(`Location resolved to ${matchedState}!`, "success");
            } else {
              await fetchIPLocationFallback();
            }
          } else {
            await fetchIPLocationFallback();
          }
        } catch (err) {
          await fetchIPLocationFallback();
        } finally {
          setIsLocating(false);
        }
      },
      async (error) => {
        console.error("Geolocation error:", error);
        triggerToast("GPS access denied. Trying IP-based location...", "warning");
        await fetchIPLocationFallback();
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  };

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(authEmail)) {
      errors.email = "Please enter a valid email address.";
    }

    const passwordRegex = /^.{4,}$/;
    if (!passwordRegex.test(authPassword)) {
      errors.password = "Password must be at least 4 characters.";
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
      let finalReport = null;      if (apiMode === 'live' && apiKey) {
        // Prepare images base64 payload
        const allBase64Images = [];
        if (frontCameraImage) allBase64Images.push(frontCameraImage);
        if (rearCameraImage) allBase64Images.push(rearCameraImage);
        uploadedFiles.forEach(img => allBase64Images.push(img));
        
        const symptomContext = selectedSymptoms.length > 0 ? ` The user also observed these symptoms on the leaf/stem: ${selectedSymptoms.join(', ')}.` : '';
        const systemPrompt = `You are Angio-Care's expert plant pathologist AI with 30 years of experience in diagnosing diseases of plants, trees, and shrubs worldwide.
First, check if the image is completely unrelated to botany, agriculture, or plants (e.g. a photo of a human face, a vehicle, a room, or document text). Only if it is completely unrelated, return a JSON object with this structure: { "error": "invalid_specimen", "message": "The uploaded image is not recognized as a plant specimen. Please upload a clear photo of a leaf, branch, stem, or plant part." }.
If the image shows a leaf, spot, branch, bark, root, fruit, flower, tree trunk, crop canopy, or close-up plant texture (even if blurry, zoomed in, or partially damaged), treat it as a VALID specimen and proceed to diagnose.

The user says the host plant species is: ${nameToUse}.${symptomContext}

Diagnose the disease and respond ONLY with a single JSON object. Do NOT wrap the JSON in markdown code blocks, and do NOT include any conversational text before or after the JSON.
The JSON must have this exact structure:
{
  "disease_name": "Name of the disease",
  "disease_code": "Code like FNG-001 or VRL-002",
  "category": "Fungal" | "Bacterial" | "Viral" | "Nematodal" | "Abiotic" | "Pest" | "Nutritional Deficiency",
  "confidence": 0-100 integer,
  "severity": "Mild" | "Moderate" | "Severe" | "Critical",
  "affected_parts": ["leaves", "stems"],
  "symptoms_observed": ["spotting", "yellowing"],
  "cause": "Underlying pathogen or factor description",
  "disease_description": "Detailed explanation of the pathology and symptoms",
  "spread_risk": "Low" | "Medium" | "High" | "Very High",
  "if_untreated": "Description of what happens if ignored",
  "treatment_plan": {
    "immediate_actions": ["Prune affected branches", "Isolate crop"],
    "chemical_treatments": [
      {
        "chemical_name": "Product Name",
        "active_ingredient": "Chemical compound name",
        "dosage": "e.g. 2ml per Liter",
        "application_method": "Foliar spray",
        "frequency": "Once every 10 days",
        "safety_precautions": "Wear mask/gloves",
        "approximate_cost": "Cost estimate"
      }
    ],
    "organic_alternatives": [
      {
        "remedy": "Neem Oil Solution",
        "preparation": "Mix 5ml neem oil with water",
        "application": "Spray early morning"
      }
    ],
    "preventive_measures": ["Crop rotation", "Drip irrigation"]
  },
  "recovery_timeline": "e.g. 2-3 weeks",
  "follow_up_care": ["Monitor new growth", "Avoid overhead watering"],
  "seasonal_risk": "Spring and high humidity",
  "similar_diseases": ["Powdery Mildew", "Septoria Leaf Spot"],
  "expert_tip": "Pathologist advice tip"
}`;

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
                  ...allBase64Images.map(img => {
                    const mimeMatch = img.match(/^data:(image\/[a-zA-Z+.-]+);base64,/);
                    let mediaType = mimeMatch ? mimeMatch[1] : "image/jpeg";
                    // Normalize standard mime-types that Anthropic supports
                    if (mediaType === "image/jpg") mediaType = "image/jpeg";
                    if (!["image/jpeg", "image/png", "image/gif", "image/webp"].includes(mediaType)) {
                      mediaType = "image/jpeg"; // default fallback
                    }
                    return {
                      type: "image",
                      source: {
                        type: "base64",
                        media_type: mediaType,
                        data: img.split(',')[1]
                      }
                    };
                  }),
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
        let contentText = data.content[0].text.trim();
        
        let parsedReport = null;
        try {
          parsedReport = JSON.parse(contentText);
        } catch (e) {
          // Fallback to regex block extraction in case Claude outputs Markdown text around the JSON block
          const jsonRegex = /\{[\s\S]*\}/;
          const match = contentText.match(jsonRegex);
          if (match) {
            try {
              parsedReport = JSON.parse(match[0]);
            } catch (e2) {
              console.error("Failed to parse regex-extracted JSON block:", e2);
            }
          }
        }

        if (!parsedReport) {
          throw new Error("Could not parse a valid JSON diagnostic report from the AI response.");
        }

        finalReport = parsedReport;
        
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

        // Resolve Crop prefix based on input plant name
        let prefix = "JOW";
        if (lowerPlant.includes("jowar") || lowerPlant.includes("sorghum")) prefix = "JOW";
        else if (lowerPlant.includes("maize") || lowerPlant.includes("corn")) prefix = "MAZ";
        else if (lowerPlant.includes("bajra") || lowerPlant.includes("millet")) prefix = "BAJ";
        else if (lowerPlant.includes("wheat")) prefix = "WHT";
        else if (lowerPlant.includes("cotton")) prefix = "COT";
        else if (lowerPlant.includes("sugarcane")) prefix = "SUG";
        else if (lowerPlant.includes("red gram") || lowerPlant.includes("tur")) prefix = "RED";
        else if (lowerPlant.includes("bengal gram") || lowerPlant.includes("chickpea")) prefix = "BEN";
        else if (lowerPlant.includes("green gram") || lowerPlant.includes("moong")) prefix = "GRN";
        else if (lowerPlant.includes("black gram") || lowerPlant.includes("urad")) prefix = "BLK";
        else if (lowerPlant.includes("groundnut") || lowerPlant.includes("peanut")) prefix = "GND";
        else if (lowerPlant.includes("sunflower")) prefix = "SUN";
        else if (lowerPlant.includes("sesame")) prefix = "SES";
        else if (lowerPlant.includes("chilli") || lowerPlant.includes("chili")) prefix = "CHL";
        else if (lowerPlant.includes("onion")) prefix = "ONN";
        else {
          // Fallback: pick a random crop prefix
          const prefixes = ["JOW", "MAZ", "BAJ", "WHT", "COT", "SUG", "RED", "BEN", "GRN", "BLK", "GND", "SUN", "SES", "CHL", "ONN"];
          prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        }

        // 1. Check if the user selected any symptoms
        const activeSymptomObj = COMMON_SYMPTOMS.find(s => selectedSymptoms.includes(s.text));
        
        if (activeSymptomObj) {
          const baseDisease = combinedDiseases.find(d => d.id === activeSymptomObj.diseaseCode);
          if (baseDisease) {
            const cropDiseases = combinedDiseases.filter(d => d.id.startsWith(prefix));
            const matchedInCrop = cropDiseases.find(d => d.name.toLowerCase().includes(baseDisease.name.toLowerCase().split(' ')[0]));
            if (matchedInCrop) {
              diseaseId = matchedInCrop.id;
            } else {
              diseaseId = baseDisease.id;
            }
          } else {
            diseaseId = activeSymptomObj.diseaseCode;
          }
        } else {
          // 2. Search for disease name or scientific name keyword in plant name input text
          let matchedDisease = null;
          for (const disease of combinedDiseases) {
            if (lowerPlant.includes(disease.name.toLowerCase()) || 
                (disease.scientific_name && lowerPlant.includes(disease.scientific_name.toLowerCase()))) {
              matchedDisease = disease;
              break;
            }
          }
          
          if (matchedDisease) {
            diseaseId = matchedDisease.id;
          } else {
            // 3. Pick a random disease from the resolved crop prefix
            const availableDiseases = combinedDiseases.filter(d => d.id.startsWith(prefix));
            const randomDisease = availableDiseases[Math.floor(Math.random() * availableDiseases.length)];
            diseaseId = randomDisease ? randomDisease.id : "JOW-001";
          }
        }

        const selectedBase = combinedDiseases.find(d => d.id === diseaseId);
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
    setSelectedSymptoms([]);
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
        const chatSystemPrompt = `You are Dr. Angio, a friendly expert plant doctor on the Angio-Care platform. You have deep knowledge of plant diseases, treatments, chemical and organic remedies, agricultural best practices, soil health, and seasonal care. You help farmers, gardeners, and botanists diagnose and treat their plants. Be warm, professional, and practical. Give specific chemical names, dosages, and application methods when asked. Always prioritize plant safety and human health. If urgency is detected, recommend professional agronomist consultation.
Note: The user's active platform language is set to ${language === 'kn' ? 'Kannada (ಕನ್ನಡ)' : 'English'}. If the active platform language is Kannada, or if the user communicates in Kannada, you MUST respond in fluent and grammatically correct Kannada (ಕನ್ನಡ) script, explaining concepts in ways local Indian farmers would understand.`;

        // Format history for Claude, skipping any leading assistant messages to satisfy Anthropic constraints
        const activeMessages = chatMessages.filter((m, idx) => {
          if (m.sender !== 'user' && chatMessages.slice(0, idx).every(prev => prev.sender !== 'user')) {
            return false;
          }
          return true;
        });
        const anthropicMessages = activeMessages.map(m => ({
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
        
        if (language === 'kn') {
          if (cleanMsg.includes("chemical") || cleanMsg.includes("ರಾಸಾಯನಿಕ") || cleanMsg.includes("dosage") || cleanMsg.includes("ಪ್ರಮಾಣ")) {
            doctorResponse = "ರಾಸಾಯನಿಕ ನಿಯಂತ್ರಣಕ್ಕಾಗಿ, ತಾಮ್ರದ ಶಿಲೀಂಧ್ರನಾಶಕ ಅಥವಾ ಮ್ಯಾಂಕೋಜೆಬ್ ಸಿಂಪಡಣೆಗಳನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ. ಮುಂಜಾನೆ ಸಿಂಪಡಿಸಿ ಮತ್ತು ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸುವಾಗ ರಕ್ಷಣಾತ್ಮಕ ಕನ್ನಡಕ ಹಾಗೂ ಮಾಸ್ಕ್ ಧರಿಸಿ.";
          } else if (cleanMsg.includes("contagious") || cleanMsg.includes("ಹರಡ") || cleanMsg.includes("spread")) {
            doctorResponse = "ಹೌದು, ಸಸ್ಯ ರೋಗಗಳು ಗಾಳಿ, ನೀರಿನ ಹನಿಗಳು ಮತ್ತು ಬಳಸಿದ ಕೃಷಿ ಉಪಕರಣಗಳ ಮೂಲಕ ವೇಗವಾಗಿ ಹರಡುತ್ತವೆ. ಸೋಂಕಿತ ಭಾಗಗಳನ್ನು ತಕ್ಷಣ ಕತ್ತರಿಸಿ ತೋಟದಿಂದ ದೂರ ಹಾಕಿ.";
          } else if (cleanMsg.includes("organic") || cleanMsg.includes("ಸಾವಯವ") || cleanMsg.includes("natural") || cleanMsg.includes("ನೈಸರ್ಗಿಕ")) {
            doctorResponse = "ಸಾವಯವ ಪರಿಹಾರಕ್ಕಾಗಿ, 1 ಲೀಟರ್ ನೀರಿನಲ್ಲಿ 5ಮಿಲಿ ಬೇವಿನ ಎಣ್ಣೆ ಮತ್ತು 2ಮಿಲಿ ದ್ರವ ಸೋಪು ಬೆರೆಸಿ ಸಂಜೆ ವೇಳೆ ಸಿಂಪಡಿಸಿ. ಇದು ಸಸ್ಯಕ್ಕೆ ರೋಗನಿರೋಧಕ ಶಕ್ತಿ ನೀಡುತ್ತದೆ.";
          } else if (cleanMsg.includes("prevent") || cleanMsg.includes("ತಡೆಗಟ್ಟ")) {
            doctorResponse = "ರೋಗ ತಡೆಗಟ್ಟಲು ಸಸ್ಯಗಳ ನಡುವೆ ಗಾಳಿಯಾಡುವಂತೆ ಸೂಕ್ತ ಅಂತರವಿರಲಿ, ಬುಡಕ್ಕೆ ಮಾತ್ರ ನೀರುಣಿಸಿ (ಎಲೆಗಳ ಮೇಲಲ್ಲ) ಮತ್ತು ಪ್ರತಿ ವರ್ಷ ಬೆಳೆ ಸರದಿಯನ್ನು ಅನುಸರಿಸಿ.";
          } else {
            doctorResponse = "ಇದು ಪ್ರಮುಖ ಕೃಷಿ ಪ್ರಶ್ನೆಯಾಗಿದೆ. ನಿಮ್ಮ ಸಸ್ಯದ ಎಲೆಗಳ ಚಿತ್ರವನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ವರದಿ ಪಡೆಯಿರಿ. ಮಣ್ಣು ಚೆನ್ನಾಗಿ ಒಣಗಲು ಬಿಡಿ, ಉತ್ತಮ ಒಳಚರಂಡಿ ವ್ಯವಸ್ಥೆ ಮಾಡಿ ಮತ್ತು ಸಾವಯವ ಗೊಬ್ಬರ ಬಳಸಿ.";
          }
        } else {
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
      }

      setChatMessages(prev => [...prev, { sender: 'doctor', text: doctorResponse, time: new Date().toLocaleTimeString() }]);
    } catch (err) {
      const errMsg = language === 'kn'
        ? "ನನ್ನ ಸರ್ವರ್ ಸಂಪರ್ಕದಲ್ಲಿ ತೊಂದರೆಯಾಗಿದೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಆಂಥ್ರೊಪಿಕ್ ಕ್ಲೋಡ್ ಎಪಿಐ ಕೀಲಿಯನ್ನು ಸೆಟ್ಟಿಂಗ್ಸ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ ಅಥವಾ ನಂತರ ಪ್ರಯತ್ನಿಸಿ."
        : "I'm having trouble connecting to my brain right now. Please verify your Anthropic API key in Settings, or try again.";
      setChatMessages(prev => [...prev, { sender: 'doctor', text: errMsg, time: new Date().toLocaleTimeString() }]);
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
  
  // --- BOTANIST DISEASE REGISTRATION ACTIONS ---
  const handleNewDiseaseImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const promises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises).then(base64s => {
      setNewDiseaseImages(prev => [...prev, ...base64s].slice(0, 3)); // Limit to 3 images
      triggerToast(language === 'kn' ? 'ಚಿತ್ರಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ!' : "Images uploaded successfully!", "success");
    }).catch(err => {
      console.error("Image upload failed", err);
      triggerToast(language === 'kn' ? 'ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ವಿಫಲವಾಗಿದೆ.' : "Image upload failed.", "error");
    });
  };

  const handleAddNewDisease = (e) => {
    e.preventDefault();
    if (!newDiseaseName.trim()) {
      triggerToast(language === 'kn' ? 'ರೋಗದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ!' : "Please enter the disease name!", "error");
      return;
    }

    // Auto-generate code prefix based on crop
    let prefix = "JOW";
    const cropLower = newDiseaseCrop.toLowerCase();
    if (cropLower.includes("maize")) prefix = "MAZ";
    else if (cropLower.includes("bajra")) prefix = "BAJ";
    else if (cropLower.includes("wheat")) prefix = "WHT";
    else if (cropLower.includes("cotton")) prefix = "COT";
    else if (cropLower.includes("sugarcane")) prefix = "SUG";
    else if (cropLower.includes("red gram") || cropLower.includes("tur")) prefix = "RED";
    else if (cropLower.includes("bengal gram") || cropLower.includes("chickpea")) prefix = "BEN";
    else if (cropLower.includes("green gram") || cropLower.includes("moong")) prefix = "GRN";
    else if (cropLower.includes("black gram") || cropLower.includes("urad")) prefix = "BLK";
    else if (cropLower.includes("groundnut") || cropLower.includes("peanut")) prefix = "GND";
    else if (cropLower.includes("sunflower")) prefix = "SUN";
    else if (cropLower.includes("sesame")) prefix = "SES";
    else if (cropLower.includes("chilli") || cropLower.includes("chili")) prefix = "CHL";
    else if (cropLower.includes("onion")) prefix = "ONN";

    const customId = `CUSTOM-${prefix}-${Date.now()}`;

    const newDisease = {
      id: customId,
      name: newDiseaseName,
      name_kn: newDiseaseNameKn || newDiseaseName,
      scientific_name: newDiseaseScientific || "Unspecified scientific name",
      category: newDiseaseCategory,
      severity: newDiseaseSeverity,
      is_custom: true,
      images: newDiseaseImages.length > 0 ? newDiseaseImages : getDiseaseImages(customId),
      cause: newDiseaseCause || "Pathological strain development",
      cause_kn: newDiseaseCauseKn || newDiseaseCause || "ರೋಗಕಾರಕ ಜೈವಿಕ ಪರಿಣಾಮ",
      disease_description: newDiseaseDesc || "Crop disease specimen recorded by lab agronomist.",
      disease_description_kn: newDiseaseDescKn || newDiseaseDesc || "ಕೃಷಿ ತಜ್ಞರಿಂದ ದಾಖಲಿಸಲ್ಪಟ್ಟ ಬೆಳೆ ರೋಗ ಮಾಹಿತಿ.",
      treatment_plan: {
        immediate_actions: [newDiseaseAction || "Isolate crop fields."],
        immediate_actions_kn: [newDiseaseActionKn || newDiseaseAction || "ಸೋಂಕಿತ ಬೆಳೆಯನ್ನು ಪ್ರತ್ಯೇಕಿಸಿ."],
        chemical_treatments: newDiseaseChemicalName ? [{
          chemical_name: newDiseaseChemicalName,
          active_ingredient: newDiseaseChemicalIngredient || "Unspecified",
          approximate_cost: "₹" + (newDiseaseChemicalCost || "1,200"),
          dosage: "Standard concentration",
          application_method: "Foliar mist spray",
          frequency: "Weekly intervals",
          safety_precautions: "Use breathing mask during spray."
        }] : [],
        organic_alternatives: newDiseaseOrganicRemedy ? [{
          remedy: newDiseaseOrganicRemedy,
          preparation: newDiseaseOrganicPrep || "Mix with water",
          approximate_cost: "₹" + (newDiseaseOrganicCost || "500"),
          application: "Spray on leaves during sunset."
        }] : [],
        preventive_measures: ["Keep farm hygiene.", "Perform crop rotation."]
      }
    };

    const updatedList = [...customDiseases, newDisease];
    setCustomDiseases(updatedList);
    try {
      localStorage.setItem('ac_custom_diseases', JSON.stringify(updatedList));
    } catch (err) {
      console.error("Save custom disease to localstorage failed", err);
    }

    triggerToast(language === 'kn' ? 'ಹೊಸ ಬೆಳೆ ರೋಗ ಯಶಸ್ವಿಯಾಗಿ ನೋಂದಾಯಿಸಲಾಗಿದೆ!' : "New crop disease successfully registered!", "success");
    
    // Clear form state
    setNewDiseaseName('');
    setNewDiseaseNameKn('');
    setNewDiseaseScientific('');
    setNewDiseaseCrop('Jowar (Sorghum)');
    setNewDiseaseCategory('Fungal');
    setNewDiseaseSeverity('Moderate');
    setNewDiseaseDesc('');
    setNewDiseaseDescKn('');
    setNewDiseaseCause('');
    setNewDiseaseCauseKn('');
    setNewDiseaseAction('');
    setNewDiseaseActionKn('');
    setNewDiseaseChemicalName('');
    setNewDiseaseChemicalIngredient('');
    setNewDiseaseChemicalCost('');
    setNewDiseaseOrganicRemedy('');
    setNewDiseaseOrganicPrep('');
    setNewDiseaseOrganicCost('');
    setNewDiseaseImages([]);
    setShowAddDiseaseModal(false);
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
              {!sidebarCollapsed && <span>{t('sidebar_dashboard')}</span>}
            </button>

            <button
              id="tour-scan"
              onClick={() => {
                setActiveTab('scan');
                setActiveReport(null);
                setScanError(null);
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.75rem', border: 'none', background: 'none', cursor: 'pointer',
                borderRadius: '8px', color: activeTab === 'scan' ? 'var(--accent-color)' : 'var(--text-muted)',
                backgroundColor: activeTab === 'scan' ? 'rgba(82,232,150,0.05)' : 'transparent',
                fontWeight: activeTab === 'scan' ? '600' : '400',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start'
              }}
            >
              <Camera size={20} />
              {!sidebarCollapsed && <span>{t('sidebar_scan')}</span>}
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
              {!sidebarCollapsed && <span>{t('sidebar_encyclopedia')}</span>}
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
              {!sidebarCollapsed && <span>{t('sidebar_history')}</span>}
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
              {!sidebarCollapsed && <span>{t('sidebar_analytics')}</span>}
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
              {!sidebarCollapsed && <span>{t('sidebar_fields')}</span>}
            </button>

            <button
              onClick={() => setActiveTab('crop-advisor')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.75rem', border: 'none', background: 'none', cursor: 'pointer',
                borderRadius: '8px', color: activeTab === 'crop-advisor' ? 'var(--accent-color)' : 'var(--text-muted)',
                backgroundColor: activeTab === 'crop-advisor' ? 'rgba(82,232,150,0.05)' : 'transparent',
                fontWeight: activeTab === 'crop-advisor' ? '600' : '400',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start'
              }}
            >
              <MapPin size={20} />
              {!sidebarCollapsed && <span>{t('sidebar_crop_advisor')}</span>}
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
              {!sidebarCollapsed && <span>{t('sidebar_settings')}</span>}
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
            {sidebarCollapsed ? t('sidebar_expand') : t('sidebar_collapse')}
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
              {t(activeTab + '_panel')}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Language Selector Toggle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-color)',
              padding: '2px',
              borderRadius: '20px',
              gap: '2px'
            }}>
              <button
                onClick={() => setLanguage('en')}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.8rem',
                  borderRadius: '18px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: language === 'en' ? 'var(--accent-color)' : 'transparent',
                  color: language === 'en' ? '#000' : 'var(--text-muted)',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-display)'
                }}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('kn')}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.8rem',
                  borderRadius: '18px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: language === 'kn' ? 'var(--accent-color)' : 'transparent',
                  color: language === 'kn' ? '#000' : 'var(--text-muted)',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-display)'
                }}
              >
                ಕನ್ನಡ
              </button>
            </div>

            {/* Streak Gamification Card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', backgroundColor: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', padding: '0.35rem 0.75rem', borderRadius: '20px' }}>
              <Flame size={16} color="var(--warning-color)" fill="var(--warning-color)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--warning-color)', fontFamily: 'var(--font-mono)' }}>{currentUser.streakDays} {language === 'kn' ? 'ದಿನಗಳ ಸತತ ಬಳಕೆ' : 'Day Streak'}</span>
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
                  <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>{language === 'kn' ? 'ಶುಭೋದಯ' : 'Good morning'}, {currentUser.name} 🌿</h2>
                  <p style={{ color: 'var(--text-muted)' }}>{t('welcome_sub')}</p>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-color)', fontFamily: 'var(--font-mono)' }}>{scanHistory.length}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{t('total_scans')}</p>
                  </div>
                  <div style={{ borderLeft: '1px solid var(--border-color)' }}></div>
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.8rem', color: 'var(--warning-color)', fontFamily: 'var(--font-mono)' }}>{totalDiseasesDetectedCount}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{t('diseases_solved')}</p>
                  </div>
                  <div style={{ borderLeft: '1px solid var(--border-color)' }}></div>
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-color)', fontFamily: 'var(--font-mono)' }}>{fields.length}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{t('fields_tracked')}</p>
                  </div>
                </div>
              </div>

              {/* Quick Scan CTA & Daily Tip & Weather */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                
                {/* Scan CTA Card */}
                <div className="card-glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '4px solid var(--accent-color)' }}>
                  <div>
                    <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{t('diagnostic_engine')}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                      {t('diagnostic_desc')}
                    </p>
                  </div>
                  <button onClick={() => {
                    setActiveTab('scan');
                    setActiveReport(null);
                    setScanError(null);
                  }} className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                    {t('init_new_scan')} <ArrowRight size={16} />
                  </button>
                </div>

                {/* Daily Tip Card */}
                <div className="card-glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyBlock: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Award color="var(--warning-color)" size={24} />
                    <h3 style={{ fontSize: '1.4rem' }}>{t('tip_day')}</h3>
                  </div>
                  <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    "{language === 'kn' ? TIPS_OF_THE_DAY_KN[tipIndex] : TIPS_OF_THE_DAY[tipIndex]}"
                  </p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-color)', marginTop: '1rem', fontFamily: 'var(--font-mono)' }}>
                    {language === 'kn' ? '- ಡಾ. ಆಂಜಿಯೋ, ಸಸ್ಯ ರೋಗಶಾಸ್ತ್ರಜ್ಞರು' : '- Dr. Angio, Plant Pathologist'}
                  </span>
                </div>

                {/* Weather Disease Risk Card */}
                <div className="card-glass" style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{t('seasonal_weather_risk')}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    {t('current_season')} <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>{language === 'kn' ? 'ಬೇಸಿಗೆ/ಮುಂಗಾರು' : 'Summer/Monsoons'}</span>
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{t('temp_c')}</label>
                      <input
                        type="number"
                        value={weatherTemp}
                        onChange={(e) => setWeatherTemp(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', textAlign: 'center' }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{t('humid_pct')}</label>
                      <input
                        type="number"
                        value={weatherHumid}
                        onChange={(e) => setWeatherHumid(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', textAlign: 'center' }}
                      />
                    </div>
                  </div>
                  <button onClick={evaluateWeatherRisk} className="btn-secondary" style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}>
                    {t('evaluate_risk')}
                  </button>

                  {weatherRiskResult && (
                    <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.85rem' }}>{t('infection_risk')}</span>
                        <span style={{
                          fontWeight: 'bold', fontSize: '0.85rem',
                          color: weatherRiskResult.status === 'High Risk' ? 'var(--danger-color)' : weatherRiskResult.status === 'Moderate' ? 'var(--warning-color)' : 'var(--accent-color)'
                        }}>{language === 'kn' ? (weatherRiskResult.status === 'High Risk' ? 'ಹೆಚ್ಚಿನ ಅಪಾಯ' : weatherRiskResult.status === 'Moderate' ? 'ಮಧ್ಯಮ ಅಪಾಯ' : 'ಕಡಿಮೆ ಅಪಾಯ') : weatherRiskResult.status} ({weatherRiskResult.score}%)</span>
                      </div>
                      <div style={{ height: '6px', borderRadius: '3px', backgroundColor: 'var(--border-color)', overflow: 'hidden', marginBottom: '0.5rem' }}>
                        <div style={{
                          height: '100%', width: `${weatherRiskResult.score}%`,
                          backgroundColor: weatherRiskResult.status === 'High Risk' ? 'var(--danger-color)' : weatherRiskResult.status === 'Moderate' ? 'var(--warning-color)' : 'var(--accent-color)'
                        }}></div>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('high_risk_crops')} {weatherRiskResult.diseases.map(d => td(d)).join(', ')}</p>
                    </div>
                  )}
                </div>

              </div>

              {/* Recent History Preview & Field Tracker preview */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', flexWrap: 'wrap' }}>
                
                {/* Recent Scan History */}
                <div className="card-glass" style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t('recent_diagnoses')}</h3>
                  {scanHistory.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      <Info size={32} style={{ marginBottom: '0.5rem' }} />
                      <p>{t('no_recent_scans')}</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {scanHistory.slice(0, 3).map(s => (
                        <div key={s.id} style={{ display: 'flex', gap: '1rem', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-light)', alignItems: 'center' }}>
                          <img src={s.image} alt={s.plant_name} style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover' }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <h4 style={{ fontSize: '1rem' }}>{td(s.report.disease_name)}</h4>
                              <span style={{
                                fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 'bold',
                                backgroundColor: s.report.severity === 'Critical' ? 'rgba(224,82,82,0.1)' : s.report.severity === 'Severe' ? 'rgba(245,166,35,0.1)' : 'rgba(82,232,150,0.1)',
                                color: s.report.severity === 'Critical' ? 'var(--danger-color)' : s.report.severity === 'Severe' ? 'var(--warning-color)' : 'var(--accent-color)'
                              }}>{tsev(s.report.severity)}</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('plant_label')} {tc(s.plant_name)} | {t('confidence_label')} {s.report.confidence}%</p>
                          </div>
                          <button onClick={() => { setActiveReport(s); setActiveTab('scan'); }} className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
                            {t('report_btn')}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fields Summary */}
                <div className="card-glass" style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t('my_fields_status')}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {fields.map(f => (
                      <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <div>
                          <h4 style={{ fontSize: '0.9rem' }}>{f.name}</h4>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tc(f.plantType)} | {f.scansCount} {t('scans_count')}</span>
                        </div>
                        <span style={{
                          fontSize: '0.75rem', fontWeight: 'bold', padding: '0.2rem 0.5rem', borderRadius: '4px',
                          color: f.status === 'Healthy' ? 'var(--accent-color)' : f.status === 'At Risk' ? 'var(--warning-color)' : 'var(--danger-color)',
                          backgroundColor: f.status === 'Healthy' ? 'rgba(82,232,150,0.06)' : 'rgba(224,82,82,0.06)'
                        }}>{t('status_' + f.status.toLowerCase().replace(' ', '_'))}</span>
                      </div>
                    ))}
                    <button onClick={() => setActiveTab('fields')} className="btn-secondary" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}>
                      {t('manage_fields_btn')}
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* 2. DIAGNOSTIC SCAN VIEW */}
          {activeTab === 'scan' && (() => {
            const localizedReport = activeReport ? translateReport(activeReport.report, language) : null;
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Specimen Validation Error Card */}
                {scanError && (
                  <div className="card-glass" style={{ padding: '2.5rem 2rem', maxWidth: '600px', margin: '0 auto', width: '100%', border: '2px solid var(--danger-color)', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '0.75rem', borderRadius: '50%', backgroundColor: 'rgba(224,82,82,0.06)', marginBottom: '1.25rem' }}>
                      <AlertTriangle size={36} color="var(--danger-color)" />
                    </div>
                    <h2 style={{ fontSize: '1.6rem', color: 'var(--danger-color)', marginBottom: '0.75rem' }}>{t('specimen_rejected')}</h2>
                    <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                      {scanError.includes("Invalid specimen detected") && language === 'kn' ? "ಅಮಾನ್ಯ ಮಾದರಿ ಪತ್ತೆಯಾಗಿದೆ. ದಯವಿಟ್ಟು ನಿಜವಾದ ಸಸ್ಯದ ಎಲೆ, ಕಾಂಡ ಅಥವಾ ಬೇರಿನ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ." : scanError}
                    </p>
                    <button onClick={handleResetScan} className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                      {t('reinit_scan')}
                    </button>
                  </div>
                )}

                {/* Scan Setup Panel */}
                {!activeReport && !isScanning && !scanError && (
                  <div className="card-glass" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>{t('init_plant_diagnosis')}</h2>

                    {apiMode === 'mock' && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(217, 119, 6, 0.12)',
                        border: '1px solid rgba(217, 119, 6, 0.3)',
                        marginBottom: '1.5rem',
                        color: '#fbbf24',
                        fontSize: '0.85rem',
                        lineHeight: '1.5'
                      }}>
                        <AlertTriangle size={20} style={{ flexShrink: 0, color: '#f59e0b' }} />
                        <div style={{ flexGrow: 1 }}>
                          <strong>{t('demo_mode_active')}</strong> {t('demo_mode_desc')} <span style={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold', color: '#f59e0b' }} onClick={() => setActiveTab('settings')}>{t('demo_mode_link')}</span>.
                        </div>
                      </div>
                    )}

                    {/* Plant Autocomplete */}
                    <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{t('select_host_species')}</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={isUnknown}
                              onChange={(e) => {
                                setIsUnknown(e.target.checked);
                                if (e.target.checked) setPlantName('');
                              }}
                            /> {t('unknown_plant')}
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', cursor: 'pointer', color: 'var(--danger-color)' }}>
                            <input
                              type="checkbox"
                              checked={simulateInvalidSpecimen}
                              onChange={(e) => setSimulateInvalidSpecimen(e.target.checked)}
                            /> {language === 'kn' ? 'ಅಮಾನ್ಯ ಮಾದರಿಯನ್ನು ಸಿಮ್ಯುಲೇಟ್ ಮಾಡಿ' : 'Simulate Invalid Specimen'}
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
                          placeholder={isUnknown ? t('unknown_placeholder') : t('known_placeholder')}
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
                                style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--surface-light)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              >
                                {tc(p)}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Visual Symptoms Checklist */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
                        {t('symptoms_checklist_label')}
                      </label>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '0.75rem',
                        padding: '1rem',
                        borderRadius: '8px',
                        backgroundColor: 'var(--surface-light)',
                        border: '1px solid var(--border-color)',
                        maxHeight: '220px',
                        overflowY: 'auto'
                      }}>
                        {COMMON_SYMPTOMS.map((sym) => {
                          const isChecked = selectedSymptoms.includes(sym.text);
                          return (
                            <label
                              key={sym.id}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.5rem',
                                fontSize: '0.85rem',
                                color: isChecked ? 'var(--accent-color)' : 'var(--text-primary)',
                                cursor: 'pointer',
                                padding: '0.5rem',
                                borderRadius: '6px',
                                transition: 'all 0.2s ease',
                                backgroundColor: isChecked ? 'rgba(46, 117, 89, 0.15)' : 'transparent',
                                border: isChecked ? '1px solid rgba(46, 117, 89, 0.3)' : '1px solid transparent'
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                style={{ marginTop: '0.15rem', accentColor: 'var(--accent-color)' }}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedSymptoms([...selectedSymptoms, sym.text]);
                                  } else {
                                    setSelectedSymptoms(selectedSymptoms.filter(item => item !== sym.text));
                                  }
                                }}
                              />
                              <span>{language === 'kn' ? (SYMPTOM_TRANSLATIONS[sym.text] || sym.text) : sym.text}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Dual Camera capturing */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                      
                      <div className="card-glass" style={{ padding: '1rem', textAlign: 'center', cursor: 'pointer' }} onClick={() => startCamera('front')}>
                        <Camera size={24} color="var(--accent-color)" style={{ marginBottom: '0.5rem' }} />
                        <h4 style={{ fontSize: '0.95rem' }}>{t('front_camera_title')}</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('front_camera_desc')}</p>
                        {frontCameraImage && (
                          <img src={frontCameraImage} alt="front" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '6px', marginTop: '0.5rem' }} />
                        )}
                      </div>

                      <div className="card-glass" style={{ padding: '1rem', textAlign: 'center', cursor: 'pointer' }} onClick={() => startCamera('rear')}>
                        <Camera size={24} color="var(--accent-color)" style={{ marginBottom: '0.5rem' }} />
                        <h4 style={{ fontSize: '0.95rem' }}>{t('rear_camera_title')}</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('rear_camera_desc')}</p>
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
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{t('drag_drop_title')}</h3>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{t('drag_drop_desc')}</p>
                      <label className="btn-secondary" style={{ cursor: 'pointer', padding: '0.5rem 1rem' }}>
                        {t('browse_files')}
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
                      {t('start_analysis')} <Sprout size={16} />
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
                      {language === 'kn' ? 'ರೋಗಶಾಸ್ತ್ರೀಯ ಆಣ್ವಿಕ ಸ್ಕ್ಯಾನ್ ಚಾಲನೆಯಲ್ಲಿದೆ...' : 'Running Pathological Molecular Scan...'}
                    </h3>
                    <div style={{ width: '200px', height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', margin: '0 auto', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${scanProgress}%`, backgroundColor: 'var(--accent-color)', transition: 'width 0.3s' }}></div>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                      {language === 'kn' ? 'ಲಕ್ಷ್ಯ ಪಿಕ್ಸೆಲ್‌ಗಳ ಅನುಕ್ರಮಣಿಕೆ...' : 'Sequencing target pixels...'} {scanProgress}%
                    </p>
                  </div>
                )}

                {/* Complete Report Details */}
                {activeReport && localizedReport && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button onClick={handleResetScan} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                        <ArrowLeft size={16} /> {language === 'kn' ? 'ಹೊಸ ಸ್ಕ್ಯಾನ್' : 'New Scan'}
                      </button>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => {
                            const text = `Angio-Care Crop Report\nPlant: ${activeReport.plant_name}\nDisease: ${localizedReport.disease_name} (${localizedReport.disease_code})\nSeverity: ${localizedReport.severity}\nConfidence: ${localizedReport.confidence}%\nTreatment: ${localizedReport.treatment_plan.immediate_actions.join(', ')}`;
                            navigator.clipboard.writeText(text);
                            triggerToast(language === 'kn' ? 'ವರದಿ ವಿವರಗಳನ್ನು ನಕಲಿಸಲಾಗಿದೆ!' : "Report summary copied to clipboard!", "success");
                          }}
                          className="btn-secondary" style={{ padding: '0.5rem' }}
                        >
                          <Share2 size={16} /> {language === 'kn' ? 'ವರದಿ ಹಂಚಿಕೊಳ್ಳಿ' : 'Share Report'}
                        </button>
                        <button onClick={() => setShowAgronomistModal(true)} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
                          <UserCheck size={16} /> {language === 'kn' ? 'ಕೃಷಿ ವಿಜ್ಞಾನಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ' : 'Connect Agronomist'}
                        </button>
                      </div>
                    </div>

                    {/* Main Report Card layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                      
                      {/* Left Column Specimen & Stats */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="card-glass" style={{ padding: '1.5rem' }}>
                          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{language === 'kn' ? 'ಮಾದರಿಯ ಚಿತ್ರ' : 'Specimen Visual'}</h3>
                          <img src={activeReport.image} alt="specimen" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1rem' }} />
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{language === 'kn' ? 'ವಿಶ್ಲೇಷಿಸಿದ ದಿನಾಂಕ:' : 'Date Analyzed:'}</span>
                            <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{activeReport.date} {activeReport.time}</span>
                          </div>
                        </div>

                        {/* Plant Health Score */}
                        <div className="card-glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
                          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{language === 'kn' ? 'ಸಸ್ಯದ ಆರೋಗ್ಯ ಸ್ಕೋರ್' : 'Plant Health Score'}</h3>
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
                            {activeReport.healthScore > 70 ? (language === 'kn' ? "ಕಡಿಮೆ ಸೋಂಕಿನೊಂದಿಗೆ ಆರೋಗ್ಯಕರ ಸ್ಥಿತಿ." : "Healthy status with minor tissue infection.") : activeReport.healthScore > 40 ? (language === 'kn' ? "ಮಧ್ಯಮ ರೋಗದ ಒತ್ತಡ. ಚಿಕಿತ್ಸೆ ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ." : "Moderate disease stress. Treatment recommended.") : (language === 'kn' ? "ತೀವ್ರ ರೋಗದ ಅಪಾಯ. ತಕ್ಷಣವೇ ಕ್ರಮ ಕೈಗೊಳ್ಳಿ." : "Severe pathological threat. Act immediately.")}
                          </p>
                        </div>

                        {/* Field tagging & schedule reminders */}
                        <div className="card-glass" style={{ padding: '1.5rem' }}>
                          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{language === 'kn' ? 'ಮಾದರಿಯನ್ನು ಟ್ಯಾಗ್ ಮಾಡಿ ಮತ್ತು ರಿಮೈಂಡರ್ ಹೊಂದಿಸಿ' : 'Tag Specimen & Schedule Followup'}</h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{language === 'kn' ? 'ಜಮೀನಿಗೆ ಟ್ಯಾಗ್ ಮಾಡಿ' : 'TAG TO FIELD LOCATION'}</label>
                              <select
                                value={activeReport.field_id}
                                onChange={(e) => assignScanToField(activeReport.id, e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)' }}
                              >
                                <option value="">{language === 'kn' ? 'ಜಮೀನನ್ನು ಆಯ್ಕೆಮಾಡಿ' : 'Select Field'}</option>
                                {fields.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                              </select>
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{language === 'kn' ? 'ಮುಂದಿನ ಪರಿಶೀಲನೆಗೆ ರಿಮೈಂಡರ್ ಹೊಂದಿಸಿ' : 'SCHEDULE FOLLOW-UP REMINDER'}</label>
                              <input
                                type="date"
                                value={newReminderDate}
                                onChange={(e) => setNewReminderDate(e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', marginBottom: '0.5rem' }}
                              />
                              <input
                                type="text"
                                placeholder={language === 'kn' ? 'ಉದಾಹರಣೆಗೆ: ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ' : 'e.g. Apply copper sulfate spray'}
                                value={newReminderNote}
                                onChange={(e) => setNewReminderNote(e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', marginBottom: '0.5rem' }}
                              />
                              <button onClick={handleAddReminder} className="btn-secondary" style={{ width: '100%', padding: '0.5rem' }}>
                                <Calendar size={14} /> {language === 'kn' ? 'ರಿಮೈಂಡರ್ ನಿಗದಿಪಡಿಸಿ' : 'Schedule Reminder'}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Before / After Specimen comparison */}
                        <div className="card-glass" style={{ padding: '1.5rem' }}>
                          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{language === 'kn' ? 'ಚಿಕಿತ್ಸೆಯ ಮೊದಲು ಮತ್ತು ನಂತರದ ಹೋಲಿಕೆ' : 'Before & After Treatment Comparison'}</h3>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                            <div style={{ border: '1px dashed var(--border-color)', borderRadius: '6px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                              {beforeImage ? (
                                <img src={beforeImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="before" />
                              ) : (
                                <label style={{ cursor: 'pointer', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                  {language === 'kn' ? 'ಮೊದಲಿನ ಚಿತ್ರ' : 'Before Photo'}
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
                                  {language === 'kn' ? 'ನಂತರದ ಚಿತ್ರ' : 'After Photo'}
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
                            {isComparing ? (language === 'kn' ? 'ಹೋಲಿಕೆ ವಿಶ್ಲೇಷಣೆ ಚಾಲನೆಯಲ್ಲಿದೆ...' : "Running comparative scans...") : (language === 'kn' ? 'ಮಾದರಿ ಫಲಿತಾಂಶ ಹೋಲಿಸಿ' : "Compare specimen results")}
                          </button>
                          {comparisonResult && (
                            <div style={{ padding: '0.75rem', backgroundColor: 'var(--surface-light)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                              <p style={{ fontSize: '0.85rem', color: 'var(--accent-color)', fontWeight: 'bold', marginBottom: '0.25rem' }}>{language === 'kn' ? 'ಸುಧಾರಣೆಯ ದರ:' : 'Improvement Rate:'} {comparisonResult.improvementPercentage}%</p>
                              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{comparisonResult.notes}</p>
                            </div>
                          )}
                        </div>

                      </div>

                      {/* Right Column Full Pathology Report Details */}
                      <div className="card-glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                          <div>
                            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>{localizedReport.disease_name}</h2>
                            <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '0.5rem' }}>{localizedReport.scientific_name}</p>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-light)' }}>
                              {localizedReport.disease_code}
                            </span>
                            <span style={{
                              fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 'bold',
                              backgroundColor: activeReport.report.severity === 'Critical' ? 'rgba(224,82,82,0.1)' : activeReport.report.severity === 'Severe' ? 'rgba(245,166,35,0.1)' : 'rgba(82,232,150,0.1)',
                              color: activeReport.report.severity === 'Critical' ? 'var(--danger-color)' : activeReport.report.severity === 'Severe' ? 'var(--warning-color)' : 'var(--accent-color)'
                            }}>{localizedReport.severity}</span>
                          </div>
                        </div>

                        {/* Chips row */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '20px', backgroundColor: 'var(--primary-color)', color: '#fff' }}>
                            {language === 'kn' ? 'ವರ್ಗ:' : 'Category:'} {localizedReport.category}
                          </span>
                          {localizedReport.affected_parts.map(p => (
                            <span key={p} style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '20px', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                              {language === 'kn' ? 'ಭಾಗ:' : 'Part:'} {p === 'Leaves' && language === 'kn' ? 'ಎಲೆಗಳು' : p === 'Stems' && language === 'kn' ? 'ಕಾಂಡಗಳು' : p === 'Roots' && language === 'kn' ? 'ಬೇರುಗಳು' : p}
                            </span>
                          ))}
                        </div>

                        <div>
                          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>{language === 'kn' ? 'ರೋಗದ ವಿವರಣೆ' : 'PATHOLOGY DESCRIPTION'}</h4>
                          <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{localizedReport.disease_description}</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>{language === 'kn' ? 'ಮುಖ್ಯ ಕಾರಣ' : 'PRIMARY CAUSE'}</h4>
                            <p style={{ fontSize: '0.9rem' }}>{localizedReport.cause}</p>
                          </div>
                          <div>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>{language === 'kn' ? 'ಹರಡುವ ಅಪಾಯ' : 'SPREAD RISK'}</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                              <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{
                                  height: '100%',
                                  width: activeReport.report.spread_risk === 'Very High' ? '100%' : activeReport.report.spread_risk === 'High' ? '75%' : activeReport.report.spread_risk === 'Medium' ? '50%' : '25%',
                                  backgroundColor: activeReport.report.spread_risk === 'Very High' || activeReport.report.spread_risk === 'High' ? 'var(--danger-color)' : 'var(--accent-color)'
                                }}></div>
                              </div>
                              <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{localizedReport.spread_risk}</span>
                            </div>
                          </div>
                        </div>

                        {/* If Untreated red warning block */}
                        <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid rgba(224,82,82,0.3)', backgroundColor: 'rgba(224,82,82,0.03)', display: 'flex', gap: '0.75rem' }}>
                          <AlertTriangle size={20} color="var(--danger-color)" style={{ flexShrink: 0 }} />
                          <div>
                            <h4 style={{ fontSize: '0.85rem', color: 'var(--danger-color)', fontWeight: 'bold', marginBottom: '0.25rem' }}>{language === 'kn' ? 'ಚಿಕಿತ್ಸೆ ನೀಡದಿದ್ದರೆ ಉಂಟಾಗುವ ಅಪಾಯ' : 'IF UNTREATED PATHOLOGICAL RISK'}</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{localizedReport.if_untreated}</p>
                          </div>
                        </div>

                        {/* Treatment Plan Accordion options */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <h4 style={{ fontSize: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>{language === 'kn' ? 'ಚಿಕಿತ್ಸಾ ನಿಯಮಗಳು (ಪ್ರೋಟೋಕಾಲ್ಗಳು)' : 'Clinical Treatment Protocols'}</h4>

                          {/* Immediate Actions */}
                          <div>
                            <h5 style={{ fontSize: '0.9rem', color: 'var(--accent-color)', marginBottom: '0.5rem' }}>{language === 'kn' ? 'ತಕ್ಷಣದ ಸರಿಪಡಿಸುವ ಕ್ರಮಗಳು' : 'Immediate Corrective Actions'}</h5>
                            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              {localizedReport.treatment_plan.immediate_actions.map((act, i) => <li key={i}>{act}</li>)}
                            </ul>
                          </div>

                          {/* Chemical Treatments (Cards) */}
                          {localizedReport.treatment_plan.chemical_treatments.length > 0 && (
                            <div>
                              <h5 style={{ fontSize: '0.9rem', color: 'var(--warning-color)', marginBottom: '0.5rem' }}>{language === 'kn' ? 'ಶಿಫಾರಸು ಮಾಡಿದ ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆಗಳು' : 'Chemical Treatments (High Urgency)'}</h5>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {localizedReport.treatment_plan.chemical_treatments.map((chem, i) => (
                                  <div key={i} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-light)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                      <span style={{ fontSize: '0.85rem', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>{chem.chemical_name}</span>
                                      <span style={{ fontSize: '0.75rem', color: 'var(--warning-color)', fontFamily: 'var(--font-mono)' }}>{chem.approximate_cost}</span>
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{language === 'kn' ? 'ಸಕ್ರಿಯ ಪದಾರ್ಥ' : 'Active'}: {chem.active_ingredient} | {language === 'kn' ? 'ಪ್ರಮಾಣ (ಡೋಸೇಜ್)' : 'Dosage'}: {chem.dosage}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{language === 'kn' ? 'ಬಳಸುವ ವಿಧಾನ' : 'Method'}: {chem.application_method} | {language === 'kn' ? 'ಬಳಕೆಯ ಆವರ್ತನ' : 'Frequency'}: {chem.frequency}</p>
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
                          {localizedReport.treatment_plan.organic_alternatives.length > 0 && (
                            <div>
                              <h5 style={{ fontSize: '0.9rem', color: 'var(--accent-color)', marginBottom: '0.5rem' }}>{language === 'kn' ? 'ಸಾವಯವ ಮತ್ತು ಜೈವಿಕ ಪರ್ಯಾಯಗಳು' : 'Organic Alternatives (Eco-Friendly)'}</h5>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {localizedReport.treatment_plan.organic_alternatives.map((org, i) => (
                                  <div key={i} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(82,232,150,0.2)', backgroundColor: 'rgba(82,232,150,0.02)' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>{org.remedy}</span>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{language === 'kn' ? 'ತಯಾರಿಕೆ' : 'Preparation'}: {org.preparation}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{language === 'kn' ? 'ಬಳಕೆ' : 'Application'}: {org.application}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Preventive Measures */}
                          <div>
                            <h5 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{language === 'kn' ? 'ದೀರ್ಘಕಾಲದ ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳು' : 'Long-Term Prevention'}</h5>
                            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              {localizedReport.treatment_plan.preventive_measures.map((prev, i) => <li key={i}>{prev}</li>)}
                            </ul>
                          </div>

                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                          <div>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{language === 'kn' ? 'ಚೇತರಿಕೆಯ ಸಮಯ' : 'RECOVERY TIMELINE'}</h4>
                            <p style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>{localizedReport.recovery_timeline}</p>
                          </div>
                          <div>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{language === 'kn' ? 'ಹಂಗಾಮು ಅಪಾಯ' : 'SEASONAL INCIDENCE'}</h4>
                            <p style={{ fontSize: '0.9rem' }}>{localizedReport.seasonal_risk}</p>
                          </div>
                        </div>

                        {/* Expert Tip */}
                        <div style={{ borderLeft: '3px solid var(--accent-color)', paddingLeft: '0.75rem', fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          <strong>{language === 'kn' ? 'ತಜ್ಞರ ಸಲಹೆ:' : 'Pathologist Tip:'}</strong> "{localizedReport.expert_tip}"
                        </div>

                        {/* Similar diseases */}
                        <div>
                          <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{language === 'kn' ? 'ಇದೇ ರೀತಿಯ ಕಾಯಿಲೆಗಳು' : 'SIMILAR COMPLICATIONS'}</h4>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {localizedReport.similar_diseases.map(d => (
                              <button
                                key={d}
                                onClick={() => {
                                  const matched = combinedDiseases.find(item => item.name.toLowerCase().includes(d.toLowerCase()));
                                  if (matched) {
                                    setSelectedEncyclopediaDisease(translateReport(getExtendedDiseaseReport(matched, activeReport.plant_name), language));
                                  } else {
                                    triggerToast(language === 'kn' ? 'ಕಾಯಿಲೆಯ ವಿವರಗಳು ಕೇವಲ ವಿಶ್ವಕೋಶದಲ್ಲಿ ಲಭ್ಯವಿದೆ.' : "Complication detail is only available in the full Encyclopedia.", "info");
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
            );
          })()}

          {/* 3. ENCYCLOPEDIA VIEW */}
          {activeTab === 'encyclopedia' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <p style={{ color: 'var(--text-muted)' }}>{t('catalog_desc')}</p>
                {currentUser && (currentUser.role === 'Botanist' || currentUser.role === 'Researcher') ? (
                  <button
                    onClick={() => setShowAddDiseaseModal(true)}
                    className="btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', borderRadius: '8px' }}
                  >
                    <Plus size={16} />
                    {language === 'kn' ? 'ಹೊಸ ರೋಗ ದಾಖಲಿಸಿ' : 'Register New Disease'}
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '8px', backgroundColor: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.2)' }}>
                    <Info size={16} color="var(--warning-color)" />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {language === 'kn' 
                        ? 'ಹೊಸ ರೋಗಗಳನ್ನು ದಾಖಲಿಸಲು ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ಸಸ್ಯವಿಜ್ಞಾನಿ ಅಥವಾ ಸಂಶೋಧಕ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ.' 
                        : 'Switch to Botanist / Researcher role in Settings to register new crop diseases.'}
                    </span>
                  </div>
                )}
              </div>

              {/* Search and Categories bar */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
                  <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    value={encSearch}
                    onChange={(e) => setEncSearch(e.target.value)}
                    placeholder={t('search_placeholder')}
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
                      {tcat(cat)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Encyclopedia Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {combinedDiseases.filter(d => {
                  const matchSearch = d.name.toLowerCase().includes(encSearch.toLowerCase()) ||
                                      d.scientific_name.toLowerCase().includes(encSearch.toLowerCase()) ||
                                      d.id.toLowerCase().includes(encSearch.toLowerCase());
                  const matchCat = encCategory === 'All' || d.category === encCategory;
                  return matchSearch && matchCat;
                }).map(d => {
                  const diseaseImgs = d.images || getDiseaseImages(d.id);
                  const previewImg = diseaseImgs && diseaseImgs.length > 0 ? diseaseImgs[0] : '';
                  return (
                    <div
                      key={d.id}
                      className="card-glass"
                      onClick={() => setSelectedEncyclopediaDisease(translateReport(getExtendedDiseaseReport(d, "Host Plant"), language))}
                      style={{ 
                        cursor: 'pointer', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        overflow: 'hidden',
                        borderRadius: '12px',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%', height: '140px', overflow: 'hidden', borderBottom: '1px solid var(--border-color)' }}>
                        <img
                          src={previewImg}
                          alt={d.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <span style={{
                          position: 'absolute', top: '0.75rem', right: '0.75rem',
                          fontSize: '0.7rem', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 'bold',
                          backgroundColor: d.severity === 'Critical' ? 'rgba(224,82,82,0.9)' : d.severity === 'Severe' ? 'rgba(245,166,35,0.9)' : 'rgba(82,232,150,0.9)',
                          color: '#0A1A0F'
                        }}>{tsev(d.severity)}</span>
                      </div>

                      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{d.id}</span>
                          </div>
                          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', lineHeight: '1.3' }}>{td(d.name)}</h3>
                          <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.8rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{d.scientific_name}</p>
                        </div>
                        <span style={{ alignSelf: 'flex-start', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--surface-light)', color: 'var(--accent-color)', border: '1px solid var(--border-color)' }}>
                          {tcat(d.category)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* 4. SCAN HISTORY VIEW */}
          {activeTab === 'history' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <p style={{ color: 'var(--text-muted)' }}>{t('lab_history_desc')}</p>

              {/* History Search and Filters */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                  <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    placeholder={t('search_history_placeholder')}
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select
                    value={historyTimeFilter}
                    onChange={(e) => setHistoryTimeFilter(e.target.value)}
                    style={{ padding: '0.6rem', borderRadius: '8px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                  >
                    <option value="all">{language === 'kn' ? 'ಎಲ್ಲಾ ದಿನಾಂಕಗಳು' : 'All Dates'}</option>
                    <option value="week">{language === 'kn' ? 'ಈ ವಾರ' : 'This Week'}</option>
                    <option value="month">{language === 'kn' ? 'ಈ ತಿಂಗಳು' : 'This Month'}</option>
                  </select>

                  <select
                    value={historyPlantFilter}
                    onChange={(e) => setHistoryPlantFilter(e.target.value)}
                    style={{ padding: '0.6rem', borderRadius: '8px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                  >
                    <option value="all">{language === 'kn' ? 'ಎಲ್ಲಾ ಸಸ್ಯಗಳು' : 'All Plants'}</option>
                    {Array.from(new Set(scanHistory.filter(s => s && s.plant_name).map(s => s.plant_name))).map(p => (
                      <option key={p} value={p}>{tc(p)}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* History timeline feed */}
              {scanHistory.length === 0 ? (
                <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <Info size={48} style={{ marginBottom: '1rem' }} />
                  <h3>{t('no_history')}</h3>
                  <button onClick={() => setActiveTab('scan')} className="btn-primary" style={{ marginTop: '1rem' }}>{language === 'kn' ? 'ಮೊದಲ ಸ್ಕ್ಯಾನ್ ಪ್ರಾರಂಭಿಸಿ' : 'Run First Scan'}</button>
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
                            <h3 style={{ fontSize: '1.4rem' }}>{td(s.report.disease_name)}</h3>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{language === 'kn' ? 'ಮಾದರಿ' : 'Specimen'}: {tc(s.plant_name)} ({s.report.disease_code})</span>
                          </div>
                          <span style={{
                            fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 'bold',
                            backgroundColor: s.report.severity === 'Critical' ? 'rgba(224,82,82,0.1)' : s.report.severity === 'Severe' ? 'rgba(245,166,35,0.1)' : 'rgba(82,232,150,0.1)',
                            color: s.report.severity === 'Critical' ? 'var(--danger-color)' : s.report.severity === 'Severe' ? 'var(--warning-color)' : 'var(--accent-color)'
                          }}>{tsev(s.report.severity)}</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                          {language === 'kn' ? 'ರೋಗನಿರ್ಣಯ ನಿಖರತೆ' : 'Diagnostic Confidence'}: <strong>{s.report.confidence}%</strong> | {language === 'kn' ? 'ಆರೋಗ್ಯ ಸ್ಕೋರ್' : 'Health Score'}: <strong>{Math.round(s.healthScore)}%</strong>
                        </p>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{language === 'kn' ? 'ದಿನಾಂಕ' : 'Date'}: {s.date} {s.time}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', smWidth: 'auto' }}>
                        <button onClick={() => { setActiveReport(s); setActiveTab('scan'); }} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                          {language === 'kn' ? 'ವರದಿ ನೋಡಿ' : 'View Report'}
                        </button>
                        <button
                          onClick={() => {
                            setScanHistory(prev => prev.filter(item => item.id !== s.id));
                            triggerToast(language === 'kn' ? "ಸ್ಕ್ಯಾನ್ ಇತಿಹಾಸದಿಂದ ತೆಗೆದುಹಾಕಲಾಗಿದೆ." : "Scan removed from history.", "info");
                          }}
                          className="btn-secondary" style={{ padding: '0.5rem', fontSize: '0.8rem', color: 'var(--danger-color)', borderColor: 'rgba(224,82,82,0.2)' }}
                        >
                          {language === 'kn' ? 'ಸ್ಕ್ಯಾನ್ ಅಳಿಸಿ' : 'Delete Scan'}
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
              <p style={{ color: 'var(--text-muted)' }}>
                {language === 'kn'
                  ? 'ಕೃಷಿ ವಿಶ್ಲೇಷಣೆಗಳು, ಸೋಂಕಿನ ಪ್ರಮಾಣಗಳು, ಸಸ್ಯಗಳ ವಿಧಗಳು ಮತ್ತು ರೋಗನಿರ್ಣಯದ ಇತಿಹಾಸವನ್ನು ಪರಿಶೀಲಿಸಿ.'
                  : 'Review agricultural analytics, infection rates, plant types, and diagnostic timelines.'}
              </p>

              {/* Highlight Dashboard cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                <div className="card-glass" style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>{language === 'kn' ? 'ಸಾಮಾನ್ಯ ಸೋಂಕು' : 'COMMON INFECTION'}</h4>
                  <h3 style={{ fontSize: '1.6rem', color: 'var(--warning-color)' }}>
                    {mostCommonDiseaseDetected === "None Detected" ? (language === 'kn' ? "ಯಾವುದೂ ಪತ್ತೆಯಾಗಿಲ್ಲ" : "None Detected") : td(mostCommonDiseaseDetected)}
                  </h3>
                </div>
                <div className="card-glass" style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>{language === 'kn' ? 'ಅತಿ ಗಂಭೀರ ಮಾದರಿ ಅಪಾಯಗಳು' : 'CRITICAL SPECIMEN RISKS'}</h4>
                  <h3 style={{ fontSize: '1.6rem', color: 'var(--danger-color)' }}>
                    {scanHistory.filter(s => s.report.severity === 'Critical').length} {language === 'kn' ? 'ಮಾದರಿಗಳು' : 'Samples'}
                  </h3>
                </div>
                <div className="card-glass" style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>{language === 'kn' ? 'ಸರಾಸರಿ ನಿಖರತೆಯ ದರ' : 'MEDIAN CONFIDENCE RATE'}</h4>
                  <h3 style={{ fontSize: '1.6rem', color: 'var(--accent-color)' }}>
                    {scanHistory.length > 0 ? `${Math.round(scanHistory.reduce((acc, s) => acc + s.report.confidence, 0) / scanHistory.length)}%` : "N/A"}
                  </h3>
                </div>
              </div>

              {/* Chart grids */}
              {scanHistory.length === 0 ? (
                <div className="card-glass" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <Info size={48} style={{ marginBottom: '1rem', margin: '0 auto' }} />
                  <h3>{language === 'kn' ? 'ಯಾವುದೇ ವಿಶ್ಲೇಷಣಾತ್ಮಕ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ.' : 'No analytical data available.'}</h3>
                  <p>{language === 'kn' ? 'ಗ್ರಾಫಿಕಲ್ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಪಡೆಯಲು ಬೆಳೆ ಸ್ಕ್ಯಾನ್ ಪೂರ್ಣಗೊಳಿಸಿ.' : 'Complete crop scans to populate graphical analytics.'}</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                  
                  {/* Category Breakdown (Pie) */}
                  <div className="card-glass" style={{ padding: '2rem', minHeight: '340px' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{language === 'kn' ? 'ಸೋಂಕಿನ ವರ್ಗದ ವಿತರಣೆ' : 'Infection Category Distribution'}</h3>
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
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{language === 'kn' ? 'ಲ್ಯಾಬ್ ಚಟುವಟಿಕೆಯ ಟೈಮ್‌ಲೈನ್' : 'Lab Activity Timeline'}</h3>
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
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{language === 'kn' ? 'ಹೆಚ್ಚು ಸ್ಕ್ಯಾನ್ ಮಾಡಲಾದ ಬೆಳೆ ತಳಿಗಳು' : 'Top Scanned Crop Species'}</h3>
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
              <p style={{ color: 'var(--text-muted)' }}>{t('fields_desc')}</p>

              {/* Add Field Form */}
              <form onSubmit={handleAddField} className="card-glass" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap', maxWidth: '600px' }}>
                <div style={{ flex: 2, minWidth: '180px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{language === 'kn' ? 'ಜಮೀನಿನ ಹೆಸರು' : 'FIELD NAME'}</label>
                  <input
                    type="text"
                    required
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                    placeholder={language === 'kn' ? 'ಉದಾಹರಣೆಗೆ: ದಕ್ಷಿಣ ತೋಟ' : 'e.g. South Orchard'}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: '120px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{language === 'kn' ? 'ಸಸ್ಯದ ಪ್ರಕಾರ' : 'PLANT TYPE'}</label>
                  <select
                    value={newFieldPlant}
                    onChange={(e) => setNewFieldPlant(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)' }}
                  >
                    {PLANTS_LIST.slice(0, 15).map(p => <option key={p} value={p}>{tc(p)}</option>)}
                  </select>
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
                  <Plus size={16} /> {language === 'kn' ? 'ಜಮೀನು ಸೇರಿಸಿ' : 'Add Field'}
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
                        }}>{f.status === 'Healthy' ? (language === 'kn' ? 'ಆರೋಗ್ಯಕರ' : 'Healthy') : f.status === 'At Risk' ? (language === 'kn' ? 'ಅಪಾಯದಲ್ಲಿದೆ' : 'At Risk') : (language === 'kn' ? 'ರೋಗಗ್ರಸ್ತ' : 'Sick')}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{language === 'kn' ? 'ಬೆಳೆಸಿದ ಸಸ್ಯ:' : 'Plant cultivation:'} <strong>{tc(f.plantType)}</strong></p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{language === 'kn' ? 'ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ಮಾದರಿಗಳು:' : 'Scanned Specimens:'} <strong>{fieldScans.length}</strong></p>
                      <button
                        onClick={() => {
                          setFields(prev => prev.filter(item => item.id !== f.id));
                          triggerToast(language === 'kn' ? "ಜಮೀನನ್ನು ತೆಗೆದುಹಾಕಲಾಗಿದೆ." : "Field removed.", "info");
                        }}
                        className="btn-secondary" style={{ width: '100%', padding: '0.4rem', color: 'var(--danger-color)', borderColor: 'rgba(224,82,82,0.2)', fontSize: '0.8rem' }}
                      >
                        {language === 'kn' ? 'ಜಮೀನಿನ ದಾಖಲೆ ಅಳಿಸಿ' : 'Delete Field Record'}
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
              
              {/* Profile Settings Card */}
              <div className="card-glass" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={18} color="var(--accent-color)" />
                  {t('profile_settings')}
                </h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!profileName.trim() || !profileLocation.trim()) {
                    triggerToast(language === 'kn' ? 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ' : 'Please fill in all fields', 'error');
                    return;
                  }
                  const updatedUser = {
                    ...currentUser,
                    name: profileName,
                    role: profileRole,
                    location: profileLocation
                  };
                  setCurrentUser(updatedUser);
                  localStorage.setItem('ac_current_user', JSON.stringify(updatedUser));
                  
                  const updatedUsersList = registeredUsers.map(u => 
                    u.email.toLowerCase() === currentUser.email.toLowerCase() 
                      ? { ...u, name: profileName, role: profileRole, location: profileLocation } 
                      : u
                  );
                  setRegisteredUsers(updatedUsersList);
                  localStorage.setItem('ac_registered_users', JSON.stringify(updatedUsersList));
                  
                  triggerToast(language === 'kn' ? 'ಪ್ರೊಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ' : 'Profile updated successfully!', 'success');
                }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                      {t('name_label')}
                    </label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                      {t('email_label')} (Read-Only)
                    </label>
                    <input
                      type="text"
                      disabled
                      value={currentUser?.email || ''}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', opacity: 0.6, cursor: 'not-allowed', color: 'var(--text-muted)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                      {t('role_label')}
                    </label>
                    <select
                      value={profileRole}
                      onChange={(e) => setProfileRole(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                    >
                      <option value="Farmer">{language === 'kn' ? 'ರೈತ' : 'Farmer'}</option>
                      <option value="Botanist">{language === 'kn' ? 'ಸಸ್ಯವಿಜ್ಞಾನಿ (Botanist)' : 'Botanist'}</option>
                      <option value="Gardener">{language === 'kn' ? 'ತೋಟಗಾರ' : 'Gardener'}</option>
                      <option value="Researcher">{language === 'kn' ? 'ಸಂಶೋಧಕ (Researcher)' : 'Researcher'}</option>
                      <option value="Agricultural Officer">{language === 'kn' ? 'ಕೃಷಿ ಅಧಿಕಾರಿ' : 'Agricultural Officer'}</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                      {t('location_label')}
                    </label>
                    <input
                      type="text"
                      value={profileLocation}
                      onChange={(e) => setProfileLocation(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', padding: '0.6rem 1.25rem', borderRadius: '8px' }}>
                    {language === 'kn' ? 'ಪ್ರೊಫೈಲ್ ಉಳಿಸಿ' : 'Save Profile'}
                  </button>
                </form>
              </div>

              {/* Theme Settings */}
              <div className="card-glass" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{t('theme_preferences')}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{language === 'kn' ? 'ಥೀಮ್ ಬಿಳಿ / ಕಪ್ಪು ಮೋಡ್' : 'Theme Light / Dark Mode'}</span>
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
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{t('treatment_preferences')}</h3>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{language === 'kn' ? 'ಆದ್ಯತೆಯ ಚಿಕಿತ್ಸಾ ವಿಧಾನ' : 'PREFERRED TREATMENT SOURCE'}</label>
                <select
                  value={treatmentPreference}
                  onChange={(e) => {
                    setTreatmentPreference(e.target.value);
                    localStorage.setItem('ac_treatment_pref', e.target.value);
                    const prefText = e.target.value === 'Both' ? (language === 'kn' ? 'ಎರಡೂ' : 'Both') : e.target.value === 'Organic' ? (language === 'kn' ? 'ಸಾವಯವ' : 'Organic') : (language === 'kn' ? 'ರಾಸಾಯನಿಕ' : 'Chemical');
                    triggerToast(language === 'kn' ? `ಆದ್ಯತೆಯನ್ನು ${prefText} ಗೆ ಹೊಂದಿಸಲಾಗಿದೆ` : `Preference set to ${e.target.value}`, "success");
                  }}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)' }}
                >
                  <option value="Chemical">{language === 'kn' ? 'ರಾಸಾಯನಿಕ' : 'Chemical'}</option>
                  <option value="Organic">{language === 'kn' ? 'ಸಾವಯವ' : 'Organic'}</option>
                  <option value="Both">{language === 'kn' ? 'ಎರಡೂ' : 'Both'}</option>
                </select>
              </div>

              {/* Anthropic Claude API Configuration */}
              <div className="card-glass" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem' }}>{t('diagnostic_engine_config')}</h3>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <button
                      type="button"
                      onClick={() => {
                        const newMode = apiMode === 'mock' ? 'live' : 'mock';
                        setApiMode(newMode);
                        localStorage.setItem('ac_api_mode', newMode);
                        triggerToast(language === 'kn' ? `ಎಪಿಐ ಇಂಜಿನ್ ಅನ್ನು ${newMode === 'live' ? 'ಲೈವ್' : 'ಮಾಕ್'} ಮೋಡ್‌ಗೆ ಹೊಂದಿಸಲಾಗಿದೆ` : `API Engine set to ${newMode.toUpperCase()} Mode`, "info");
                      }}
                      style={{
                        padding: '0.25rem 0.75rem', borderRadius: '20px', border: '1px solid var(--border-color)', fontSize: '0.75rem', cursor: 'pointer',
                        backgroundColor: apiMode === 'live' ? 'var(--accent-color)' : 'var(--surface-light)',
                        color: apiMode === 'live' ? '#0A1A0F' : 'var(--text-muted)'
                      }}
                    >
                      {apiMode === 'live' ? (language === 'kn' ? "ಲೈವ್ API ಸಕ್ರಿಯ" : "LIVE API ACTIVE") : (language === 'kn' ? "ಮಾಕ್ ಎಂಜಿನ್ ಸಕ್ರಿಯ" : "MOCK ENGINE ACTIVE")}
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.4' }}>
                  {t('api_key_desc')}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>{t('api_key_label')}</label>
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
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>{t('proxy_url_label')}</label>
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
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{language === 'kn' ? 'ಡೇಟಾ ಬ್ಯಾಕಪ್ ಮತ್ತು ರಫ್ತು' : 'Data Backup & Export'}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{language === 'kn' ? 'ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಇತಿಹಾಸ, ನಮೂದಿಸಿದ ಜಮೀನುಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಡೇಟಾಬೇಸ್ ಅನ್ನು JSON ರೂಪದಲ್ಲಿ ರಫ್ತು ಮಾಡಿ.' : 'Export your complete history, registered fields, and local database as a JSON record.'}</p>
                <button onClick={handleExportAllData} className="btn-secondary" style={{ width: '100%' }}>
                  {language === 'kn' ? 'JSON ಪ್ರೊಫೈಲ್ ಬ್ಯಾಕಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ' : 'Download JSON Profile Backup'}
                </button>
              </div>

              {/* Danger Zone */}
              <div className="card-glass" style={{ padding: '1.5rem', border: '1px solid rgba(224,82,82,0.3)', backgroundColor: 'rgba(224,82,82,0.01)' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--danger-color)', marginBottom: '0.5rem' }}>{t('danger_zone')}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{language === 'kn' ? 'ಈ ಖಾತೆ ಮತ್ತು ಉಳಿಸಲಾದ ಎಲ್ಲಾ ರೋಗನಿರ್ಣಯ ದಾಖಲೆಗಳನ್ನು ಶಾಶ್ವತವಾಗಿ ಅಳಿಸಿಹಾಕಿ.' : 'Permanently erase this account and all saved diagnostic records.'}</p>
                <button onClick={() => setShowDeleteAccountConfirm(true)} className="btn-secondary" style={{ width: '100%', color: 'var(--danger-color)', borderColor: 'rgba(224,82,82,0.3)' }}>
                  {t('delete_account_btn')}
                </button>
              </div>

            </div>
          )}

          {/* 8. CROP ADVISOR VIEW */}
          {activeTab === 'crop-advisor' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Header Title card */}
              <div className="card-glass" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{t('geo_advisor_title')}</h2>
                  <p style={{ color: 'var(--text-muted)' }}>{t('geo_advisor_desc')}</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <button
                    onClick={handleFetchLocation}
                    disabled={isLocating}
                    className="btn-primary"
                    style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    {isLocating ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        {t('locating_farm')}
                      </>
                    ) : (
                      <>
                        <MapPin size={18} />
                        {t('auto_detect_location')}
                      </>
                    )}
                  </button>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{language === 'kn' ? 'ಪ್ರದೇಶವನ್ನು ಸಿಮ್ಯುಲೇಟ್ ಮಾಡಿ' : 'SIMULATE REGION'}</label>
                    <select
                       value={advisorState}
                       onChange={(e) => {
                         setAdvisorState(e.target.value);
                         setAdvisorLocation(null);
                         triggerToast(`Simulating location: ${e.target.value}`, "info");
                       }}
                       style={{ padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                     >
                       {Object.keys(SOIL_REGION_DATABASE).map(state => (
                         <option key={state} value={state}>{STATE_TRANSLATIONS[state] || state}</option>
                       ))}
                     </select>
                  </div>
                </div>
              </div>

              {/* Coordinates display if available */}
              {advisorLocation && (
                <div className="card-glass" style={{ padding: '1rem 1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', borderLeft: '4px solid var(--accent-color)', backgroundColor: 'rgba(82,232,150,0.02)' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{language === 'kn' ? 'ಜಿಪಿಎಸ್ ಅಕ್ಷಾಂಶ (LAT)' : 'GPS LATITUDE'}</span>
                    <p style={{ fontSize: '1.1rem', fontWeight: 'bold', fontFamily: 'var(--font-mono)', color: 'var(--accent-color)' }}>{advisorLocation.lat.toFixed(6)}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{language === 'kn' ? 'ಜಿಪಿಎಸ್ ರೇಖಾಂಶ (LNG)' : 'GPS LONGITUDE'}</span>
                    <p style={{ fontSize: '1.1rem', fontWeight: 'bold', fontFamily: 'var(--font-mono)', color: 'var(--accent-color)' }}>{advisorLocation.lng.toFixed(6)}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{language === 'kn' ? 'ನಿಖರತೆಯ ಸ್ಥಿತಿ' : 'ACCURACY STATUS'}</span>
                    <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{language === 'kn' ? 'ಉಪಗ್ರಹ ನಿರ್ಧರಿಸಿದೆ ✅' : 'Satellite Resolved ✅'}</p>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                    <span className="badge" style={{ backgroundColor: 'rgba(82,232,150,0.15)', color: 'var(--accent-color)', padding: '0.4rem 0.8rem', borderRadius: '20px' }}>
                      {language === 'kn' ? '📍 ಲೈವ್ ಸ್ಥಳೀಯ ಜಮೀನು ಗ್ರಿಡ್' : '📍 Live Local Farm Grid'}
                    </span>
                  </div>
                </div>
              )}

              {/* Dynamic Soil & Crops section */}
              {(() => {
                const rawInfo = SOIL_REGION_DATABASE[advisorState] || SOIL_REGION_DATABASE["Maharashtra"];
                const info = translateSoilInfo(rawInfo, language);
                return (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                    
                    {/* Left Column: Soil & Local Crops */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      
                      {/* Soil Profile Card */}
                      <div className="card-glass" style={{ padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)' }}>
                          <span>🪨</span> {language === 'kn' ? 'ಸ್ಥಳೀಯ ಮಣ್ಣಿನ ವಿವರ:' : 'Local Soil Profile:'} {STATE_TRANSLATIONS[advisorState] || advisorState}
                        </h3>
                        
                        <div style={{ marginBottom: '1.5rem' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{language === 'kn' ? 'ಮಣ್ಣಿನ ಪ್ರಕಾರದ ವರ್ಗೀಕರಣ' : 'SOIL TYPE CLASSIFICATION'}</span>
                          <p style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '0.25rem 0 0.5rem 0' }}>{info.soilType}</p>
                          <div style={{ height: '3px', backgroundColor: 'var(--border-color)', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ width: '70%', height: '100%', backgroundColor: 'var(--accent-color)' }}></div>
                          </div>
                        </div>

                        <div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{language === 'kn' ? 'ಭೌತಿಕ ಮತ್ತು ರಾಸಾಯನಿಕ ಗುಣಲಕ್ಷಣಗಳು' : 'PHYSICAL & CHEMICAL PROPERTIES'}</span>
                          <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: '1.6', marginTop: '0.25rem' }}>{info.properties}</p>
                        </div>
                      </div>

                      {/* Typical Regional Crops Card */}
                      <div className="card-glass" style={{ padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>🚜</span> {language === 'kn' ? 'ಪ್ರಾಥಮಿಕ ಬೆಳೆಗಳನ್ನು ಬೆಳೆಯಲಾಗುತ್ತದೆ:' : 'Primary Crops Grown in'} {STATE_TRANSLATIONS[advisorState] || advisorState}
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{t('crops_grown_desc')}</p>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                          {info.typicalCrops.map(crop => (
                            <div
                              key={crop}
                              style={{
                                padding: '0.6rem 1.2rem',
                                borderRadius: '30px',
                                backgroundColor: 'var(--surface-light)',
                                border: '1px solid var(--border-color)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--accent-color)';
                                e.currentTarget.style.backgroundColor = 'rgba(82,232,150,0.03)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border-color)';
                                e.currentTarget.style.backgroundColor = 'var(--surface-light)';
                              }}
                              onClick={() => {
                                setPlantName(crop.split(' ')[0]);
                                setActiveReport(null);
                                setScanError(null);
                                setActiveTab('scan');
                                triggerToast(`Selected ${crop} for diagnostic analysis.`, "info");
                              }}
                            >
                              <span style={{ fontSize: '1rem' }}>🌾</span>
                              <strong>{crop}</strong>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Right Column: Seasonal Suitability Advisor */}
                    <div className="card-glass" style={{ padding: '2rem' }}>
                      <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)' }}>
                        <span>📊</span> {language === 'kn' ? 'ಹಂಗಾಮು ಆಧಾರಿತ ನೆಡುವಿಕೆ ಸೂಕ್ತತೆ' : 'Seasonal Planting Suitability'}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>{t('suitability_desc')}</p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {Object.entries(info.suitability).map(([season, list]) => (
                          <div key={season} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', borderLeft: '3px solid var(--accent-color)', paddingLeft: '0.5rem' }}>
                              {season} {language === 'kn' ? 'ನೆಡುವಿಕೆ ಚಕ್ರ' : 'Planting Cycle'}
                            </h4>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                              {list.map(item => {
                                const scoreColor = item.score >= 90 ? 'var(--accent-color)' : item.score >= 80 ? 'var(--warning-color)' : '#f59e0b';
                                return (
                                  <div key={item.crop} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', backgroundColor: 'rgba(255,255,255,0.01)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.02)' }}>
                                    
                                    {/* Score gauge */}
                                    <div style={{
                                      width: '45px', height: '45px', borderRadius: '50%', border: `3px solid ${scoreColor}`,
                                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                      fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: '0.85rem', color: scoreColor
                                    }}>
                                      {item.score}%
                                    </div>

                                    {/* Crop suitability text */}
                                    <div>
                                      <h5 style={{ fontSize: '0.95rem', fontWeight: 'bold', margin: '0 0 0.25rem 0' }}>{item.crop}</h5>
                                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>{item.reason}</p>
                                    </div>

                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                );
              })()}

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
                <h2 style={{ fontSize: '1.8rem' }}>{td(selectedEncyclopediaDisease.disease_name)}</h2>
                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.95rem' }}>{selectedEncyclopediaDisease.scientific_name}</p>
              </div>
              <button onClick={() => setSelectedEncyclopediaDisease(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={24} /></button>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>{language === 'kn' ? 'ರೋಗಶಾಸ್ತ್ರೀಯ ಅವಲೋಕನ' : 'PATHOLOGICAL OVERVIEW'}</h4>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{selectedEncyclopediaDisease.disease_description}</p>
            </div>

            {/* Disease Visuals Gallery */}
            {selectedEncyclopediaDisease.images && selectedEncyclopediaDisease.images.length > 0 && (
              <div>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
                  {language === 'kn' ? 'ರೋಗದ ಮಾದರಿ ಚಿತ್ರಗಳು' : 'DISEASE VISUAL SPECIMENS'}
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  {selectedEncyclopediaDisease.images.map((imgUrl, idx) => (
                    <div key={idx} style={{ position: 'relative', width: '100%', paddingBottom: '70%', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-light)' }}>
                      <img
                        src={imgUrl}
                        alt={`Specimen visual ${idx + 1}`}
                        style={{
                          position: 'absolute',
                          top: 0, left: 0,
                          width: '100%', height: '100%',
                          objectFit: 'cover',
                          cursor: 'pointer',
                          transition: 'transform 0.3s ease'
                        }}
                        onClick={() => window.open(imgUrl, '_blank')}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{language === 'kn' ? 'ರೋಗಕಾರಕ ಕಾರಣ' : 'CAUSE'}</h4>
                <p style={{ fontSize: '0.85rem' }}>{selectedEncyclopediaDisease.cause}</p>
              </div>
              <div>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{language === 'kn' ? 'ಗಂಭೀರತೆಯ ಮಟ್ಟ' : 'SEVERITY LEVEL'}</h4>
                <span style={{
                  fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 'bold', display: 'inline-block', marginTop: '0.25rem',
                  backgroundColor: selectedEncyclopediaDisease.severity === 'Critical' ? 'rgba(224,82,82,0.1)' : selectedEncyclopediaDisease.severity === 'Severe' ? 'rgba(245,166,35,0.1)' : 'rgba(82,232,150,0.1)',
                  color: selectedEncyclopediaDisease.severity === 'Critical' ? 'var(--danger-color)' : selectedEncyclopediaDisease.severity === 'Severe' ? 'var(--warning-color)' : 'var(--accent-color)'
                }}>{tsev(selectedEncyclopediaDisease.severity)}</span>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>{language === 'kn' ? 'ಚಿಕಿತ್ಸಾ ನಿಯಮಗಳು (ಪ್ರೋಟೋಕಾಲ್ಗಳು)' : 'TREATMENT PROTOCOLS'}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-light)' }}>
                  <strong style={{ fontSize: '0.8rem', color: 'var(--accent-color)' }}>{language === 'kn' ? 'ತಕ್ಷಣದ ಕ್ರಮಗಳು:' : 'Immediate actions:'}</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>{selectedEncyclopediaDisease.treatment_plan.immediate_actions.join(', ')}</p>
                </div>
                <div style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-light)' }}>
                  <strong style={{ fontSize: '0.8rem', color: 'var(--warning-color)' }}>{language === 'kn' ? 'ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆಗಳು:' : 'Chemical treatments:'}</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                    {selectedEncyclopediaDisease.treatment_plan.chemical_treatments.map(c => `${c.chemical_name} (${c.active_ingredient})`).join(', ') || (language === 'kn' ? "ಯಾವುದೇ ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆ ಶಿಫಾರಸು ಮಾಡಲಾಗಿಲ್ಲ." : "No immediate chemicals recommended.")}
                  </p>
                </div>
                <div style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-light)' }}>
                  <strong style={{ fontSize: '0.8rem', color: 'var(--accent-color)' }}>{language === 'kn' ? 'ಸಾವಯವ ಪರ್ಯಾಯಗಳು:' : 'Organic alternative:'}</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                    {selectedEncyclopediaDisease.treatment_plan.organic_alternatives.map(o => o.remedy).join(', ')}
                  </p>
                </div>
              </div>
            </div>

            <button onClick={() => setSelectedEncyclopediaDisease(null)} className="btn-secondary" style={{ width: '100%' }}>
              {language === 'kn' ? 'ವಿವರ ಮುಚ್ಚಿ' : 'Close Encyclopedia Detail'}
            </button>
          </div>
        </div>
      )}

      {/* Botanist Register New Crop Disease Modal */}
      {showAddDiseaseModal && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 2000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
        }}>
          <div className="card-glass" style={{ maxWidth: '780px', width: '100%', padding: '2rem', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', color: 'var(--accent-color)' }}>
                  {language === 'kn' ? 'ಹೊಸ ರೋಗ ದಾಖಲಿಸಿ' : 'Register New Crop Disease'}
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {language === 'kn' ? 'ವೈಜ್ಞಾನಿಕ ವಿವರಗಳು, ರೋಗಲಕ್ಷಣಗಳು ಮತ್ತು ಚಿಕಿತ್ಸಾ ಕ್ರಮಗಳನ್ನು ನಮೂದಿಸಿ.' : 'Add scientific database entry with localized treatments and specimens.'}
                </p>
              </div>
              <button onClick={() => setShowAddDiseaseModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={24} /></button>
            </div>

            <form onSubmit={handleAddNewDisease} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Row 1: Basic Info */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>DISEASE NAME (ENGLISH) *</label>
                  <input
                    type="text"
                    required
                    value={newDiseaseName}
                    onChange={(e) => setNewDiseaseName(e.target.value)}
                    placeholder="e.g. Leaf Blight"
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>DISEASE NAME (KANNADA)</label>
                  <input
                    type="text"
                    value={newDiseaseNameKn}
                    onChange={(e) => setNewDiseaseNameKn(e.target.value)}
                    placeholder="ಉದಾಹರಣೆಗೆ: ಎಲೆ ಕರಕು ರೋಗ"
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>SCIENTIFIC NAME</label>
                  <input
                    type="text"
                    value={newDiseaseScientific}
                    onChange={(e) => setNewDiseaseScientific(e.target.value)}
                    placeholder="e.g. Bipolaris oryzae"
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Row 2: Crop selection & Category */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>HOST PLANT SPECIES *</label>
                  <select
                    value={newDiseaseCrop}
                    onChange={(e) => setNewDiseaseCrop(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                  >
                    {PLANTS_LIST.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>PATHOGEN CATEGORY</label>
                  <select
                    value={newDiseaseCategory}
                    onChange={(e) => setNewDiseaseCategory(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                  >
                    <option value="Fungal">Fungal</option>
                    <option value="Bacterial">Bacterial</option>
                    <option value="Viral">Viral</option>
                    <option value="Nematodal">Nematodal</option>
                    <option value="Pest">Pest</option>
                    <option value="Nutritional Deficiency">Nutritional Deficiency</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>SEVERITY LEVEL</label>
                  <select
                    value={newDiseaseSeverity}
                    onChange={(e) => setNewDiseaseSeverity(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                  >
                    <option value="Mild">Mild</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Severe">Severe</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Descriptions */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>PATHOLOGICAL OVERVIEW (ENGLISH)</label>
                  <textarea
                    rows={2}
                    value={newDiseaseDesc}
                    onChange={(e) => setNewDiseaseDesc(e.target.value)}
                    placeholder="Enter description..."
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none', resize: 'vertical' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>PATHOLOGICAL OVERVIEW (KANNADA)</label>
                  <textarea
                    rows={2}
                    value={newDiseaseDescKn}
                    onChange={(e) => setNewDiseaseDescKn(e.target.value)}
                    placeholder="ಕನ್ನಡದಲ್ಲಿ ವಿವರಣೆ..."
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none', resize: 'vertical' }}
                  />
                </div>
              </div>

              {/* Row 4: Pathogen Cause */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>PATHOGEN CAUSE / TRIGGER (ENGLISH)</label>
                  <input
                    type="text"
                    value={newDiseaseCause}
                    onChange={(e) => setNewDiseaseCause(e.target.value)}
                    placeholder="e.g. Excess rainfall, warm temperature..."
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>PATHOGEN CAUSE / TRIGGER (KANNADA)</label>
                  <input
                    type="text"
                    value={newDiseaseCauseKn}
                    onChange={(e) => setNewDiseaseCauseKn(e.target.value)}
                    placeholder="ಉದಾಹರಣೆಗೆ: ಹೆಚ್ಚಿನ ತೇವಾಂಶ ಮತ್ತು ಬಿಸಿ ವಾತಾವರಣ..."
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Row 5: Immediate actions */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>IMMEDIATE ACTION PROTOCOL (ENGLISH)</label>
                  <input
                    type="text"
                    value={newDiseaseAction}
                    onChange={(e) => setNewDiseaseAction(e.target.value)}
                    placeholder="e.g. Cut and burn infected foliage."
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>IMMEDIATE ACTION PROTOCOL (KANNADA)</label>
                  <input
                    type="text"
                    value={newDiseaseActionKn}
                    onChange={(e) => setNewDiseaseActionKn(e.target.value)}
                    placeholder="ಉದಾಹರಣೆಗೆ: ಒಣಗಿದ ರೆಂಬೆಗಳನ್ನು ಕತ್ತರಿಸಿ ನಾಶಮಾಡಿ."
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Row 6: Chemical treatments */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>CHEMICAL REMEDY NAME</label>
                  <input
                    type="text"
                    value={newDiseaseChemicalName}
                    onChange={(e) => setNewDiseaseChemicalName(e.target.value)}
                    placeholder="e.g. Copper Hydroxide spray"
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>ACTIVE INGREDIENT</label>
                  <input
                    type="text"
                    value={newDiseaseChemicalIngredient}
                    onChange={(e) => setNewDiseaseChemicalIngredient(e.target.value)}
                    placeholder="e.g. Copper Hydroxide (53.8%)"
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>CHEMICAL COST (₹)</label>
                  <input
                    type="number"
                    value={newDiseaseChemicalCost}
                    onChange={(e) => setNewDiseaseChemicalCost(e.target.value)}
                    placeholder="e.g. 1500"
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Row 7: Organic alternatives */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>ORGANIC REMEDY REMEDIAL TEXT</label>
                  <input
                    type="text"
                    value={newDiseaseOrganicRemedy}
                    onChange={(e) => setNewDiseaseOrganicRemedy(e.target.value)}
                    placeholder="e.g. Neem Oil application"
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>PREPARATION PROTOCOL</label>
                  <input
                    type="text"
                    value={newDiseaseOrganicPrep}
                    onChange={(e) => setNewDiseaseOrganicPrep(e.target.value)}
                    placeholder="e.g. Mix 5ml neem oil with soapy water"
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>ORGANIC COST (₹)</label>
                  <input
                    type="number"
                    value={newDiseaseOrganicCost}
                    onChange={(e) => setNewDiseaseOrganicCost(e.target.value)}
                    placeholder="e.g. 600"
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Row 8: Uploader */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>UPLOADER DISEASE IMAGES (MAX 3) *</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleNewDiseaseImageUpload}
                    style={{ display: 'none' }}
                    id="botanist-file-upload"
                  />
                  <label htmlFor="botanist-file-upload" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', borderRadius: '8px', cursor: 'pointer' }}>
                    <Upload size={14} />
                    {language === 'kn' ? 'ಚಿತ್ರಗಳನ್ನು ಆರಿಸಿ' : 'Browse Visuals'}
                  </label>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {newDiseaseImages.length} / 3 {language === 'kn' ? 'ಚಿತ್ರಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ' : 'images uploaded'}
                  </span>
                </div>
                
                {/* Thumbnails */}
                {newDiseaseImages.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                    {newDiseaseImages.map((b64, idx) => (
                      <div key={idx} style={{ position: 'relative', width: '80px', height: '60px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                        <img src={b64} alt={`Thumb ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button
                          type="button"
                          onClick={() => setNewDiseaseImages(prev => prev.filter((_, i) => i !== idx))}
                          style={{
                            position: 'absolute', top: '2px', right: '2px',
                            backgroundColor: 'rgba(0,0,0,0.7)', border: 'none', borderRadius: '50%',
                            color: '#fff', width: '18px', height: '18px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem'
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form Buttons */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowAddDiseaseModal(false)} className="btn-secondary" style={{ flex: 1 }}>
                  {language === 'kn' ? 'ರದ್ದುಮಾಡಿ' : 'Cancel'}
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                  {language === 'kn' ? 'ದಾಖಲೆಯನ್ನು ಉಳಿಸಿ' : 'Save Disease Entry'}
                </button>
              </div>

            </form>
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
