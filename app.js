// Komorebi Calorie Tracker - Frontend Application Logic

// Local Storage Keys
const KEYS = {
  SCRIPT_URL: 'komorebi_script_url',
  GEMINI_KEY: 'komorebi_gemini_api_key',
  PROFILE: 'komorebi_profile',
  LOGS: 'komorebi_local_logs',
  FOOD_DB: 'komorebi_local_db',
  FAVORITES: 'komorebi_favorites',
  WATER: 'komorebi_water'
};

// Seed database fallback (macros & micros)
const LOCAL_FOOD_DATABASE_SEED = [
  {
    "name": "Chicken Breast (Raw)",
    "category": "Proteins",
    "calories": 120,
    "protein": 22.5,
    "carbs": 0.0,
    "fat": 2.6,
    "vitA": 6,
    "iron": 0.7,
    "vitD": 0.1,
    "calcium": 11,
    "potassium": 340,
    "magnesium": 29,
    "vitB12": 0.3,
    "folate": 4,
    "defaultServing": 150,
    "unit": "g"
  },
  {
    "name": "Chicken Thigh (Raw)",
    "category": "Proteins",
    "calories": 177,
    "protein": 18.3,
    "carbs": 0.0,
    "fat": 11.2,
    "vitA": 24,
    "iron": 0.9,
    "vitD": 0.1,
    "calcium": 10,
    "potassium": 260,
    "magnesium": 22,
    "vitB12": 0.5,
    "folate": 5,
    "defaultServing": 150,
    "unit": "g"
  },
  {
    "name": "Ground Beef (80% Lean, Raw)",
    "category": "Proteins",
    "calories": 254,
    "protein": 17.2,
    "carbs": 0.0,
    "fat": 20.1,
    "vitA": 0,
    "iron": 2.1,
    "vitD": 0.1,
    "calcium": 18,
    "potassium": 270,
    "magnesium": 19,
    "vitB12": 2.5,
    "folate": 8,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Beef Sirloin (Raw)",
    "category": "Proteins",
    "calories": 207,
    "protein": 21.4,
    "carbs": 0.0,
    "fat": 13.0,
    "vitA": 0,
    "iron": 2.6,
    "vitD": 0.1,
    "calcium": 15,
    "potassium": 318,
    "magnesium": 22,
    "vitB12": 3.1,
    "folate": 6,
    "defaultServing": 150,
    "unit": "g"
  },
  {
    "name": "Pork Tenderloin (Raw)",
    "category": "Proteins",
    "calories": 143,
    "protein": 21.0,
    "carbs": 0.0,
    "fat": 5.9,
    "vitA": 2,
    "iron": 1.3,
    "vitD": 0.3,
    "calcium": 6,
    "potassium": 423,
    "magnesium": 28,
    "vitB12": 0.7,
    "folate": 3,
    "defaultServing": 150,
    "unit": "g"
  },
  {
    "name": "Salmon (Atlantic, Raw)",
    "category": "Proteins",
    "calories": 208,
    "protein": 20.1,
    "carbs": 0.0,
    "fat": 13.4,
    "vitA": 12,
    "iron": 0.8,
    "vitD": 11.1,
    "calcium": 12,
    "potassium": 363,
    "magnesium": 29,
    "vitB12": 3.2,
    "folate": 25,
    "defaultServing": 150,
    "unit": "g"
  },
  {
    "name": "Tuna (Yellowfin, Raw)",
    "category": "Proteins",
    "calories": 109,
    "protein": 24.4,
    "carbs": 0.0,
    "fat": 1.0,
    "vitA": 20,
    "iron": 1.0,
    "vitD": 1.7,
    "calcium": 17,
    "potassium": 441,
    "magnesium": 50,
    "vitB12": 2.1,
    "folate": 2,
    "defaultServing": 150,
    "unit": "g"
  },
  {
    "name": "Shrimp (Raw)",
    "category": "Proteins",
    "calories": 99,
    "protein": 20.1,
    "carbs": 0.7,
    "fat": 1.4,
    "vitA": 0,
    "iron": 2.4,
    "vitD": 0.4,
    "calcium": 64,
    "potassium": 259,
    "magnesium": 22,
    "vitB12": 1.1,
    "folate": 3,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Egg (Whole, Large)",
    "category": "Proteins",
    "calories": 72,
    "protein": 6.3,
    "carbs": 0.4,
    "fat": 5.0,
    "vitA": 80,
    "iron": 0.9,
    "vitD": 1.1,
    "calcium": 28,
    "potassium": 69,
    "magnesium": 6,
    "vitB12": 0.5,
    "folate": 24,
    "defaultServing": 1,
    "unit": "pcs",
    "weightPerPiece": 50
  },
  {
    "name": "Tofu (Firm, Raw)",
    "category": "Proteins",
    "calories": 76,
    "protein": 8.1,
    "carbs": 1.9,
    "fat": 4.2,
    "vitA": 0,
    "iron": 1.6,
    "vitD": 0.0,
    "calcium": 201,
    "potassium": 121,
    "magnesium": 30,
    "vitB12": 0.0,
    "folate": 15,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "White Rice (Cooked)",
    "category": "Grains",
    "calories": 130,
    "protein": 2.7,
    "carbs": 28.2,
    "fat": 0.3,
    "vitA": 0,
    "iron": 0.2,
    "vitD": 0.0,
    "calcium": 10,
    "potassium": 35,
    "magnesium": 12,
    "vitB12": 0.0,
    "folate": 3,
    "defaultServing": 150,
    "unit": "g"
  },
  {
    "name": "Brown Rice (Cooked)",
    "category": "Grains",
    "calories": 112,
    "protein": 2.6,
    "carbs": 23.5,
    "fat": 0.9,
    "vitA": 0,
    "iron": 0.5,
    "vitD": 0.0,
    "calcium": 10,
    "potassium": 79,
    "magnesium": 44,
    "vitB12": 0.0,
    "folate": 4,
    "defaultServing": 150,
    "unit": "g"
  },
  {
    "name": "Quinoa (Cooked)",
    "category": "Grains",
    "calories": 120,
    "protein": 4.4,
    "carbs": 21.3,
    "fat": 1.9,
    "vitA": 1,
    "iron": 1.5,
    "vitD": 0.0,
    "calcium": 17,
    "potassium": 172,
    "magnesium": 64,
    "vitB12": 0.0,
    "folate": 42,
    "defaultServing": 150,
    "unit": "g"
  },
  {
    "name": "Oats (Rolled, Dry)",
    "category": "Grains",
    "calories": 389,
    "protein": 16.9,
    "carbs": 66.3,
    "fat": 6.9,
    "vitA": 0,
    "iron": 4.7,
    "vitD": 0.0,
    "calcium": 54,
    "potassium": 429,
    "magnesium": 177,
    "vitB12": 0.0,
    "folate": 56,
    "defaultServing": 80,
    "unit": "g"
  },
  {
    "name": "Whole Wheat Bread (Slice)",
    "category": "Grains",
    "calories": 69,
    "protein": 3.6,
    "carbs": 12.0,
    "fat": 1.1,
    "vitA": 0,
    "iron": 0.9,
    "vitD": 0.0,
    "calcium": 73,
    "potassium": 81,
    "magnesium": 23,
    "vitB12": 0.0,
    "folate": 14,
    "defaultServing": 1,
    "unit": "pcs"
  },
  {
    "name": "White Bread (Slice)",
    "category": "Grains",
    "calories": 79,
    "protein": 2.7,
    "carbs": 15.1,
    "fat": 1.0,
    "vitA": 0,
    "iron": 0.9,
    "vitD": 0.0,
    "calcium": 38,
    "potassium": 37,
    "magnesium": 7,
    "vitB12": 0.0,
    "folate": 28,
    "defaultServing": 1,
    "unit": "pcs"
  },
  {
    "name": "Pasta (Dry, Spaghetti)",
    "category": "Grains",
    "calories": 371,
    "protein": 13.0,
    "carbs": 74.7,
    "fat": 1.5,
    "vitA": 0,
    "iron": 3.0,
    "vitD": 0.0,
    "calcium": 21,
    "potassium": 215,
    "magnesium": 53,
    "vitB12": 0.0,
    "folate": 18,
    "defaultServing": 80,
    "unit": "g"
  },
  {
    "name": "Chickpeas (Cooked)",
    "category": "Legumes",
    "calories": 164,
    "protein": 8.9,
    "carbs": 27.4,
    "fat": 2.6,
    "vitA": 1,
    "iron": 2.9,
    "vitD": 0.0,
    "calcium": 49,
    "potassium": 291,
    "magnesium": 48,
    "vitB12": 0.0,
    "folate": 172,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Black Beans (Cooked)",
    "category": "Legumes",
    "calories": 132,
    "protein": 8.9,
    "carbs": 23.7,
    "fat": 0.5,
    "vitA": 1,
    "iron": 2.1,
    "vitD": 0.0,
    "calcium": 27,
    "potassium": 355,
    "magnesium": 70,
    "vitB12": 0.0,
    "folate": 149,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Red Lentils (Cooked)",
    "category": "Legumes",
    "calories": 116,
    "protein": 9.0,
    "carbs": 20.1,
    "fat": 0.4,
    "vitA": 1,
    "iron": 3.3,
    "vitD": 0.0,
    "calcium": 19,
    "potassium": 369,
    "magnesium": 36,
    "vitB12": 0.0,
    "folate": 181,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Edamame (Cooked)",
    "category": "Legumes",
    "calories": 121,
    "protein": 11.9,
    "carbs": 8.9,
    "fat": 5.2,
    "vitA": 9,
    "iron": 2.3,
    "vitD": 0.0,
    "calcium": 63,
    "potassium": 436,
    "magnesium": 64,
    "vitB12": 0.0,
    "folate": 303,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Whole Milk",
    "category": "Dairy",
    "calories": 61,
    "protein": 3.2,
    "carbs": 4.8,
    "fat": 3.3,
    "vitA": 46,
    "iron": 0.0,
    "vitD": 1.2,
    "calcium": 113,
    "potassium": 150,
    "magnesium": 10,
    "vitB12": 0.4,
    "folate": 5,
    "defaultServing": 240,
    "unit": "ml"
  },
  {
    "name": "Greek Yogurt (Plain, Full-Fat)",
    "category": "Dairy",
    "calories": 97,
    "protein": 9.0,
    "carbs": 3.6,
    "fat": 5.0,
    "vitA": 27,
    "iron": 0.1,
    "vitD": 0.0,
    "calcium": 110,
    "potassium": 141,
    "magnesium": 11,
    "vitB12": 0.8,
    "folate": 7,
    "defaultServing": 150,
    "unit": "g"
  },
  {
    "name": "Cheddar Cheese",
    "category": "Dairy",
    "calories": 403,
    "protein": 25.0,
    "carbs": 1.3,
    "fat": 33.1,
    "vitA": 265,
    "iron": 0.7,
    "vitD": 0.6,
    "calcium": 710,
    "potassium": 98,
    "magnesium": 28,
    "vitB12": 1.1,
    "folate": 18,
    "defaultServing": 30,
    "unit": "g"
  },
  {
    "name": "Mozzarella Cheese",
    "category": "Dairy",
    "calories": 280,
    "protein": 19.9,
    "carbs": 2.2,
    "fat": 21.6,
    "vitA": 173,
    "iron": 0.2,
    "vitD": 0.4,
    "calcium": 505,
    "potassium": 76,
    "magnesium": 20,
    "vitB12": 0.7,
    "folate": 7,
    "defaultServing": 30,
    "unit": "g"
  },
  {
    "name": "Butter (Unsalted)",
    "category": "Oils & Fats",
    "calories": 717,
    "protein": 0.9,
    "carbs": 0.1,
    "fat": 81.1,
    "vitA": 684,
    "iron": 0.0,
    "vitD": 1.5,
    "calcium": 24,
    "potassium": 24,
    "magnesium": 2,
    "vitB12": 0.2,
    "folate": 3,
    "defaultServing": 14,
    "unit": "g"
  },
  {
    "name": "Olive Oil (Extra Virgin)",
    "category": "Oils & Fats",
    "calories": 884,
    "protein": 0.0,
    "carbs": 0.0,
    "fat": 100.0,
    "vitA": 0,
    "iron": 0.6,
    "vitD": 0.0,
    "calcium": 1,
    "potassium": 1,
    "magnesium": 0,
    "vitB12": 0.0,
    "folate": 0,
    "defaultServing": 15,
    "unit": "ml"
  },
  {
    "name": "Coconut Oil",
    "category": "Oils & Fats",
    "calories": 862,
    "protein": 0.0,
    "carbs": 0.0,
    "fat": 100.0,
    "vitA": 0,
    "iron": 0.0,
    "vitD": 0.0,
    "calcium": 0,
    "potassium": 0,
    "magnesium": 0,
    "vitB12": 0.0,
    "folate": 0,
    "defaultServing": 15,
    "unit": "ml"
  },
  {
    "name": "Broccoli (Raw)",
    "category": "Vegetables",
    "calories": 34,
    "protein": 2.8,
    "carbs": 6.6,
    "fat": 0.4,
    "vitA": 31,
    "iron": 0.7,
    "vitD": 0.0,
    "calcium": 47,
    "potassium": 316,
    "magnesium": 21,
    "vitB12": 0.0,
    "folate": 63,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Spinach (Raw)",
    "category": "Vegetables",
    "calories": 23,
    "protein": 2.9,
    "carbs": 3.6,
    "fat": 0.4,
    "vitA": 469,
    "iron": 2.7,
    "vitD": 0.0,
    "calcium": 99,
    "potassium": 558,
    "magnesium": 79,
    "vitB12": 0.0,
    "folate": 194,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Kale (Raw)",
    "category": "Vegetables",
    "calories": 49,
    "protein": 4.3,
    "carbs": 8.8,
    "fat": 0.9,
    "vitA": 500,
    "iron": 1.5,
    "vitD": 0.0,
    "calcium": 150,
    "potassium": 491,
    "magnesium": 47,
    "vitB12": 0.0,
    "folate": 141,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Sweet Potato (Raw)",
    "category": "Vegetables",
    "calories": 86,
    "protein": 1.6,
    "carbs": 20.1,
    "fat": 0.1,
    "vitA": 961,
    "iron": 0.6,
    "vitD": 0.0,
    "calcium": 30,
    "potassium": 337,
    "magnesium": 25,
    "vitB12": 0.0,
    "folate": 11,
    "defaultServing": 130,
    "unit": "g"
  },
  {
    "name": "Carrot (Raw)",
    "category": "Vegetables",
    "calories": 41,
    "protein": 0.9,
    "carbs": 9.6,
    "fat": 0.2,
    "vitA": 835,
    "iron": 0.3,
    "vitD": 0.0,
    "calcium": 33,
    "potassium": 320,
    "magnesium": 12,
    "vitB12": 0.0,
    "folate": 19,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Tomato (Raw)",
    "category": "Vegetables",
    "calories": 18,
    "protein": 0.9,
    "carbs": 3.9,
    "fat": 0.2,
    "vitA": 42,
    "iron": 0.3,
    "vitD": 0.0,
    "calcium": 10,
    "potassium": 237,
    "magnesium": 11,
    "vitB12": 0.0,
    "folate": 15,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Bell Pepper (Red, Raw)",
    "category": "Vegetables",
    "calories": 31,
    "protein": 1.0,
    "carbs": 6.0,
    "fat": 0.3,
    "vitA": 157,
    "iron": 0.4,
    "vitD": 0.0,
    "calcium": 7,
    "potassium": 211,
    "magnesium": 12,
    "vitB12": 0.0,
    "folate": 46,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Onion (Raw)",
    "category": "Vegetables",
    "calories": 40,
    "protein": 1.1,
    "carbs": 9.3,
    "fat": 0.1,
    "vitA": 2,
    "iron": 0.2,
    "vitD": 0.0,
    "calcium": 23,
    "potassium": 146,
    "magnesium": 10,
    "vitB12": 0.0,
    "folate": 19,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Garlic (Raw)",
    "category": "Vegetables",
    "calories": 149,
    "protein": 6.4,
    "carbs": 33.1,
    "fat": 0.5,
    "vitA": 0,
    "iron": 1.7,
    "vitD": 0.0,
    "calcium": 181,
    "potassium": 401,
    "magnesium": 25,
    "vitB12": 0.0,
    "folate": 3,
    "defaultServing": 10,
    "unit": "g"
  },
  {
    "name": "Mushroom (Button, Raw)",
    "category": "Vegetables",
    "calories": 22,
    "protein": 3.1,
    "carbs": 3.3,
    "fat": 0.3,
    "vitA": 0,
    "iron": 0.5,
    "vitD": 0.2,
    "calcium": 3,
    "potassium": 318,
    "magnesium": 9,
    "vitB12": 0.0,
    "folate": 17,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Cucumber (Raw)",
    "category": "Vegetables",
    "calories": 15,
    "protein": 0.7,
    "carbs": 3.6,
    "fat": 0.1,
    "vitA": 5,
    "iron": 0.3,
    "vitD": 0.0,
    "calcium": 16,
    "potassium": 147,
    "magnesium": 13,
    "vitB12": 0.0,
    "folate": 7,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Zucchini (Raw)",
    "category": "Vegetables",
    "calories": 17,
    "protein": 1.2,
    "carbs": 3.1,
    "fat": 0.3,
    "vitA": 10,
    "iron": 0.4,
    "vitD": 0.0,
    "calcium": 16,
    "potassium": 261,
    "magnesium": 18,
    "vitB12": 0.0,
    "folate": 24,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Apple (Medium)",
    "category": "Fruits",
    "calories": 95,
    "protein": 0.5,
    "carbs": 25.1,
    "fat": 0.3,
    "vitA": 5,
    "iron": 0.2,
    "vitD": 0.0,
    "calcium": 11,
    "potassium": 195,
    "magnesium": 9,
    "vitB12": 0.0,
    "folate": 5,
    "defaultServing": 1,
    "unit": "pcs",
    "weightPerPiece": 182
  },
  {
    "name": "Banana (Medium)",
    "category": "Fruits",
    "calories": 105,
    "protein": 1.3,
    "carbs": 27.0,
    "fat": 0.4,
    "vitA": 4,
    "iron": 0.3,
    "vitD": 0.0,
    "calcium": 6,
    "potassium": 422,
    "magnesium": 32,
    "vitB12": 0.0,
    "folate": 24,
    "defaultServing": 1,
    "unit": "pcs",
    "weightPerPiece": 118
  },
  {
    "name": "Avocado (Half)",
    "category": "Fruits",
    "calories": 120,
    "protein": 1.5,
    "carbs": 6.4,
    "fat": 11.0,
    "vitA": 7,
    "iron": 0.4,
    "vitD": 0.0,
    "calcium": 12,
    "potassium": 487,
    "magnesium": 29,
    "vitB12": 0.0,
    "folate": 81,
    "defaultServing": 0.5,
    "unit": "pcs",
    "weightPerPiece": 150
  },
  {
    "name": "Orange (Medium)",
    "category": "Fruits",
    "calories": 62,
    "protein": 1.2,
    "carbs": 15.4,
    "fat": 0.2,
    "vitA": 14,
    "iron": 0.1,
    "vitD": 0.0,
    "calcium": 52,
    "potassium": 237,
    "magnesium": 13,
    "vitB12": 0.0,
    "folate": 39,
    "defaultServing": 1,
    "unit": "pcs",
    "weightPerPiece": 130
  },
  {
    "name": "Blueberries",
    "category": "Fruits",
    "calories": 57,
    "protein": 0.7,
    "carbs": 14.5,
    "fat": 0.3,
    "vitA": 3,
    "iron": 0.3,
    "vitD": 0.0,
    "calcium": 6,
    "potassium": 77,
    "magnesium": 6,
    "vitB12": 0.0,
    "folate": 6,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Strawberries",
    "category": "Fruits",
    "calories": 32,
    "protein": 0.7,
    "carbs": 7.7,
    "fat": 0.3,
    "vitA": 1,
    "iron": 0.4,
    "vitD": 0.0,
    "calcium": 16,
    "potassium": 153,
    "magnesium": 13,
    "vitB12": 0.0,
    "folate": 24,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Mango",
    "category": "Fruits",
    "calories": 60,
    "protein": 0.8,
    "carbs": 15.0,
    "fat": 0.4,
    "vitA": 54,
    "iron": 0.2,
    "vitD": 0.0,
    "calcium": 11,
    "potassium": 168,
    "magnesium": 10,
    "vitB12": 0.0,
    "folate": 43,
    "defaultServing": 200,
    "unit": "g"
  },
  {
    "name": "Almonds",
    "category": "Nuts & Seeds",
    "calories": 579,
    "protein": 21.2,
    "carbs": 21.6,
    "fat": 49.9,
    "vitA": 0,
    "iron": 3.7,
    "vitD": 0.0,
    "calcium": 264,
    "potassium": 733,
    "magnesium": 270,
    "vitB12": 0.0,
    "folate": 44,
    "defaultServing": 30,
    "unit": "g"
  },
  {
    "name": "Walnuts",
    "category": "Nuts & Seeds",
    "calories": 654,
    "protein": 15.2,
    "carbs": 13.7,
    "fat": 65.2,
    "vitA": 1,
    "iron": 2.9,
    "vitD": 0.0,
    "calcium": 98,
    "potassium": 441,
    "magnesium": 158,
    "vitB12": 0.0,
    "folate": 98,
    "defaultServing": 30,
    "unit": "g"
  },
  {
    "name": "Chia Seeds",
    "category": "Nuts & Seeds",
    "calories": 486,
    "protein": 16.5,
    "carbs": 42.1,
    "fat": 30.7,
    "vitA": 0,
    "iron": 7.7,
    "vitD": 0.0,
    "calcium": 631,
    "potassium": 407,
    "magnesium": 335,
    "vitB12": 0.0,
    "folate": 49,
    "defaultServing": 30,
    "unit": "g"
  },
  {
    "name": "Peanut Butter (Natural)",
    "category": "Nuts & Seeds",
    "calories": 598,
    "protein": 22.2,
    "carbs": 21.6,
    "fat": 51.4,
    "vitA": 0,
    "iron": 1.7,
    "vitD": 0.0,
    "calcium": 49,
    "potassium": 558,
    "magnesium": 168,
    "vitB12": 0.0,
    "folate": 87,
    "defaultServing": 32,
    "unit": "g"
  },
  {
    "name": "Flaxseeds",
    "category": "Nuts & Seeds",
    "calories": 534,
    "protein": 18.3,
    "carbs": 28.9,
    "fat": 42.2,
    "vitA": 0,
    "iron": 5.7,
    "vitD": 0.0,
    "calcium": 255,
    "potassium": 813,
    "magnesium": 392,
    "vitB12": 0.0,
    "folate": 87,
    "defaultServing": 15,
    "unit": "g"
  },
  {
    "name": "Chicken Tikka Masala",
    "category": "Cooked Dish",
    "calories": 155,
    "protein": 14.0,
    "carbs": 8.5,
    "fat": 7.5,
    "vitA": 120,
    "iron": 1.8,
    "vitD": 0.1,
    "calcium": 45,
    "potassium": 390,
    "magnesium": 35,
    "vitB12": 0.4,
    "folate": 22,
    "defaultServing": 300,
    "unit": "g"
  },
  {
    "name": "Paneer Butter Masala",
    "category": "Cooked Dish",
    "calories": 190,
    "protein": 8.5,
    "carbs": 9.0,
    "fat": 13.5,
    "vitA": 145,
    "iron": 0.9,
    "vitD": 0.2,
    "calcium": 230,
    "potassium": 210,
    "magnesium": 28,
    "vitB12": 0.5,
    "folate": 18,
    "defaultServing": 250,
    "unit": "g"
  },
  {
    "name": "Spaghetti Bolognese",
    "category": "Cooked Dish",
    "calories": 163,
    "protein": 9.5,
    "carbs": 18.5,
    "fat": 5.5,
    "vitA": 50,
    "iron": 1.9,
    "vitD": 0.0,
    "calcium": 35,
    "potassium": 310,
    "magnesium": 28,
    "vitB12": 1.1,
    "folate": 20,
    "defaultServing": 350,
    "unit": "g"
  },
  {
    "name": "Caesar Salad (with Dressing)",
    "category": "Cooked Dish",
    "calories": 135,
    "protein": 5.5,
    "carbs": 8.0,
    "fat": 9.5,
    "vitA": 130,
    "iron": 1.1,
    "vitD": 0.1,
    "calcium": 100,
    "potassium": 220,
    "magnesium": 20,
    "vitB12": 0.2,
    "folate": 55,
    "defaultServing": 200,
    "unit": "g"
  },
  {
    "name": "Beef Tacos (2 Corn Tortillas)",
    "category": "Cooked Dish",
    "calories": 210,
    "protein": 12.0,
    "carbs": 20.0,
    "fat": 9.0,
    "vitA": 55,
    "iron": 2.2,
    "vitD": 0.0,
    "calcium": 80,
    "potassium": 290,
    "magnesium": 30,
    "vitB12": 1.4,
    "folate": 18,
    "defaultServing": 180,
    "unit": "g"
  },
  {
    "name": "Pad Thai (Chicken)",
    "category": "Cooked Dish",
    "calories": 181,
    "protein": 10.0,
    "carbs": 25.0,
    "fat": 5.5,
    "vitA": 70,
    "iron": 1.3,
    "vitD": 0.0,
    "calcium": 40,
    "potassium": 240,
    "magnesium": 25,
    "vitB12": 0.3,
    "folate": 20,
    "defaultServing": 300,
    "unit": "g"
  },
  {
    "name": "Margherita Pizza (Slice)",
    "category": "Cooked Dish",
    "calories": 266,
    "protein": 11.0,
    "carbs": 33.0,
    "fat": 10.0,
    "vitA": 115,
    "iron": 2.1,
    "vitD": 0.1,
    "calcium": 188,
    "potassium": 210,
    "magnesium": 24,
    "vitB12": 0.5,
    "folate": 25,
    "defaultServing": 1,
    "unit": "pcs"
  },
  {
    "name": "Miso Soup",
    "category": "Cooked Dish",
    "calories": 40,
    "protein": 3.0,
    "carbs": 5.5,
    "fat": 1.0,
    "vitA": 5,
    "iron": 0.9,
    "vitD": 0.0,
    "calcium": 30,
    "potassium": 175,
    "magnesium": 14,
    "vitB12": 0.0,
    "folate": 12,
    "defaultServing": 240,
    "unit": "ml"
  },
  {
    "name": "Beef Stir Fry with Vegetables",
    "category": "Cooked Dish",
    "calories": 148,
    "protein": 12.5,
    "carbs": 9.0,
    "fat": 7.0,
    "vitA": 210,
    "iron": 2.0,
    "vitD": 0.1,
    "calcium": 38,
    "potassium": 360,
    "magnesium": 32,
    "vitB12": 1.8,
    "folate": 28,
    "defaultServing": 250,
    "unit": "g"
  },
  {
    "name": "Dal Makhani",
    "category": "Cooked Dish",
    "calories": 138,
    "protein": 7.0,
    "carbs": 18.0,
    "fat": 4.5,
    "vitA": 55,
    "iron": 3.2,
    "vitD": 0.0,
    "calcium": 60,
    "potassium": 395,
    "magnesium": 55,
    "vitB12": 0.1,
    "folate": 95,
    "defaultServing": 250,
    "unit": "g"
  },
  {
    "name": "Sushi Roll (California Roll, 8 pcs)",
    "category": "Cooked Dish",
    "calories": 255,
    "protein": 9.0,
    "carbs": 38.0,
    "fat": 7.0,
    "vitA": 20,
    "iron": 1.2,
    "vitD": 0.4,
    "calcium": 55,
    "potassium": 220,
    "magnesium": 30,
    "vitB12": 1.8,
    "folate": 15,
    "defaultServing": 150,
    "unit": "g"
  },
  {
    "name": "Tom Yum Soup",
    "category": "Cooked Dish",
    "calories": 50,
    "protein": 5.5,
    "carbs": 5.0,
    "fat": 1.5,
    "vitA": 35,
    "iron": 1.0,
    "vitD": 0.1,
    "calcium": 30,
    "potassium": 195,
    "magnesium": 18,
    "vitB12": 0.8,
    "folate": 12,
    "defaultServing": 300,
    "unit": "ml"
  },
  {
    "name": "Hummus",
    "category": "Cooked Dish",
    "calories": 177,
    "protein": 7.9,
    "carbs": 14.3,
    "fat": 10.2,
    "vitA": 0,
    "iron": 2.4,
    "vitD": 0.0,
    "calcium": 49,
    "potassium": 228,
    "magnesium": 51,
    "vitB12": 0.0,
    "folate": 78,
    "defaultServing": 60,
    "unit": "g"
  },
  {
    "name": "Shakshuka (2 Eggs)",
    "category": "Cooked Dish",
    "calories": 158,
    "protein": 9.5,
    "carbs": 12.0,
    "fat": 8.5,
    "vitA": 170,
    "iron": 2.4,
    "vitD": 1.2,
    "calcium": 72,
    "potassium": 390,
    "magnesium": 28,
    "vitB12": 0.7,
    "folate": 45,
    "defaultServing": 280,
    "unit": "g"
  },
  {
    "name": "Biryani (Chicken)",
    "category": "Cooked Dish",
    "calories": 183,
    "protein": 9.5,
    "carbs": 22.0,
    "fat": 6.0,
    "vitA": 45,
    "iron": 1.5,
    "vitD": 0.0,
    "calcium": 25,
    "potassium": 220,
    "magnesium": 28,
    "vitB12": 0.3,
    "folate": 10,
    "defaultServing": 300,
    "unit": "g"
  },
  {
    "name": "French Onion Soup",
    "category": "Cooked Dish",
    "calories": 100,
    "protein": 5.5,
    "carbs": 11.0,
    "fat": 4.0,
    "vitA": 12,
    "iron": 0.8,
    "vitD": 0.0,
    "calcium": 110,
    "potassium": 165,
    "magnesium": 12,
    "vitB12": 0.2,
    "folate": 14,
    "defaultServing": 300,
    "unit": "ml"
  },
  {
    "name": "Falafel (3 Pieces)",
    "category": "Cooked Dish",
    "calories": 333,
    "protein": 13.3,
    "carbs": 31.8,
    "fat": 17.8,
    "vitA": 5,
    "iron": 3.4,
    "vitD": 0.0,
    "calcium": 49,
    "potassium": 585,
    "magnesium": 71,
    "vitB12": 0.0,
    "folate": 172,
    "defaultServing": 90,
    "unit": "g"
  },
  {
    "name": "Grilled Salmon with Lemon",
    "category": "Cooked Dish",
    "calories": 206,
    "protein": 28.0,
    "carbs": 1.0,
    "fat": 10.5,
    "vitA": 15,
    "iron": 0.9,
    "vitD": 13.0,
    "calcium": 14,
    "potassium": 440,
    "magnesium": 32,
    "vitB12": 4.0,
    "folate": 26,
    "defaultServing": 150,
    "unit": "g"
  },
  {
    "name": "Vegetable Fried Rice",
    "category": "Cooked Dish",
    "calories": 163,
    "protein": 4.0,
    "carbs": 26.0,
    "fat": 5.0,
    "vitA": 80,
    "iron": 1.0,
    "vitD": 0.0,
    "calcium": 20,
    "potassium": 185,
    "magnesium": 22,
    "vitB12": 0.0,
    "folate": 15,
    "defaultServing": 250,
    "unit": "g"
  },
  {
    "name": "Beef Burger (Standard)",
    "category": "Cooked Dish",
    "calories": 295,
    "protein": 17.0,
    "carbs": 24.0,
    "fat": 14.0,
    "vitA": 30,
    "iron": 3.1,
    "vitD": 0.1,
    "calcium": 75,
    "potassium": 310,
    "magnesium": 28,
    "vitB12": 2.5,
    "folate": 30,
    "defaultServing": 200,
    "unit": "g"
  },
  {
    "name": "Lentil Soup",
    "category": "Cooked Dish",
    "calories": 95,
    "protein": 6.5,
    "carbs": 15.5,
    "fat": 1.5,
    "vitA": 60,
    "iron": 2.8,
    "vitD": 0.0,
    "calcium": 30,
    "potassium": 310,
    "magnesium": 34,
    "vitB12": 0.0,
    "folate": 120,
    "defaultServing": 300,
    "unit": "ml"
  },
  {
    "name": "Naan Bread",
    "category": "Grains",
    "calories": 317,
    "protein": 9.0,
    "carbs": 55.0,
    "fat": 7.5,
    "vitA": 0,
    "iron": 2.2,
    "vitD": 0.0,
    "calcium": 60,
    "potassium": 145,
    "magnesium": 24,
    "vitB12": 0.0,
    "folate": 18,
    "defaultServing": 1,
    "unit": "pcs"
  },
  {
    "name": "Corn Tortilla",
    "category": "Grains",
    "calories": 58,
    "protein": 1.5,
    "carbs": 12.3,
    "fat": 0.6,
    "vitA": 0,
    "iron": 0.5,
    "vitD": 0.0,
    "calcium": 46,
    "potassium": 56,
    "magnesium": 17,
    "vitB12": 0.0,
    "folate": 3,
    "defaultServing": 1,
    "unit": "pcs"
  },
  {
    "name": "Basmati Rice (Cooked)",
    "category": "Grains",
    "calories": 121,
    "protein": 3.5,
    "carbs": 25.2,
    "fat": 0.4,
    "vitA": 0,
    "iron": 0.3,
    "vitD": 0.0,
    "calcium": 10,
    "potassium": 55,
    "magnesium": 13,
    "vitB12": 0.0,
    "folate": 3,
    "defaultServing": 150,
    "unit": "g"
  },
  {
    "name": "Cottage Cheese (Low-Fat)",
    "category": "Dairy",
    "calories": 72,
    "protein": 12.4,
    "carbs": 2.7,
    "fat": 1.0,
    "vitA": 25,
    "iron": 0.1,
    "vitD": 0.0,
    "calcium": 86,
    "potassium": 104,
    "magnesium": 9,
    "vitB12": 0.4,
    "folate": 7,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Whey Protein Powder",
    "category": "Proteins",
    "calories": 400,
    "protein": 80.0,
    "carbs": 8.0,
    "fat": 6.5,
    "vitA": 0,
    "iron": 0.5,
    "vitD": 0.0,
    "calcium": 500,
    "potassium": 490,
    "magnesium": 50,
    "vitB12": 1.2,
    "folate": 10,
    "defaultServing": 30,
    "unit": "g"
  },
  {
    "name": "Sardines (Canned in Water)",
    "category": "Proteins",
    "calories": 208,
    "protein": 24.6,
    "carbs": 0.0,
    "fat": 11.5,
    "vitA": 27,
    "iron": 2.9,
    "vitD": 4.8,
    "calcium": 382,
    "potassium": 397,
    "magnesium": 39,
    "vitB12": 8.9,
    "folate": 10,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Lamb Chops (Raw)",
    "category": "Proteins",
    "calories": 235,
    "protein": 18.3,
    "carbs": 0.0,
    "fat": 17.8,
    "vitA": 0,
    "iron": 1.8,
    "vitD": 0.0,
    "calcium": 17,
    "potassium": 309,
    "magnesium": 24,
    "vitB12": 2.4,
    "folate": 18,
    "defaultServing": 150,
    "unit": "g"
  },
  {
    "name": "Asparagus (Raw)",
    "category": "Vegetables",
    "calories": 20,
    "protein": 2.2,
    "carbs": 3.9,
    "fat": 0.1,
    "vitA": 38,
    "iron": 2.1,
    "vitD": 0.0,
    "calcium": 24,
    "potassium": 202,
    "magnesium": 14,
    "vitB12": 0.0,
    "folate": 52,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Brussels Sprouts (Raw)",
    "category": "Vegetables",
    "calories": 43,
    "protein": 3.4,
    "carbs": 9.0,
    "fat": 0.3,
    "vitA": 38,
    "iron": 1.4,
    "vitD": 0.0,
    "calcium": 42,
    "potassium": 389,
    "magnesium": 23,
    "vitB12": 0.0,
    "folate": 61,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Beet (Raw)",
    "category": "Vegetables",
    "calories": 43,
    "protein": 1.6,
    "carbs": 9.6,
    "fat": 0.2,
    "vitA": 2,
    "iron": 0.8,
    "vitD": 0.0,
    "calcium": 16,
    "potassium": 325,
    "magnesium": 23,
    "vitB12": 0.0,
    "folate": 109,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Coconut Milk (Canned)",
    "category": "Dairy",
    "calories": 197,
    "protein": 2.0,
    "carbs": 2.8,
    "fat": 21.3,
    "vitA": 0,
    "iron": 3.3,
    "vitD": 0.0,
    "calcium": 18,
    "potassium": 263,
    "magnesium": 37,
    "vitB12": 0.0,
    "folate": 14,
    "defaultServing": 100,
    "unit": "ml"
  },
  {
    "name": "Dark Chocolate (70% Cocoa)",
    "category": "Snacks",
    "calories": 598,
    "protein": 7.8,
    "carbs": 45.8,
    "fat": 42.6,
    "vitA": 0,
    "iron": 11.9,
    "vitD": 0.0,
    "calcium": 73,
    "potassium": 715,
    "magnesium": 228,
    "vitB12": 0.0,
    "folate": 11,
    "defaultServing": 30,
    "unit": "g"
  },
  {
    "name": "Orange Juice (Fresh)",
    "category": "Fruits",
    "calories": 45,
    "protein": 0.7,
    "carbs": 10.4,
    "fat": 0.2,
    "vitA": 10,
    "iron": 0.2,
    "vitD": 0.0,
    "calcium": 11,
    "potassium": 200,
    "magnesium": 11,
    "vitB12": 0.0,
    "folate": 30,
    "defaultServing": 240,
    "unit": "ml"
  },
  {
    "name": "Pineapple",
    "category": "Fruits",
    "calories": 50,
    "protein": 0.5,
    "carbs": 13.1,
    "fat": 0.1,
    "vitA": 3,
    "iron": 0.3,
    "vitD": 0.0,
    "calcium": 13,
    "potassium": 109,
    "magnesium": 12,
    "vitB12": 0.0,
    "folate": 18,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Soy Milk (Unsweetened)",
    "category": "Dairy",
    "calories": 33,
    "protein": 3.3,
    "carbs": 1.6,
    "fat": 1.8,
    "vitA": 50,
    "iron": 0.6,
    "vitD": 1.0,
    "calcium": 120,
    "potassium": 118,
    "magnesium": 19,
    "vitB12": 1.2,
    "folate": 6,
    "defaultServing": 240,
    "unit": "ml"
  },
  {
    "name": "Sunflower Seeds",
    "category": "Nuts & Seeds",
    "calories": 584,
    "protein": 20.8,
    "carbs": 20.0,
    "fat": 51.5,
    "vitA": 3,
    "iron": 5.3,
    "vitD": 0.0,
    "calcium": 78,
    "potassium": 645,
    "magnesium": 325,
    "vitB12": 0.0,
    "folate": 227,
    "defaultServing": 30,
    "unit": "g"
  },
  {
    "name": "Pumpkin (Raw)",
    "category": "Vegetables",
    "calories": 26,
    "protein": 1.0,
    "carbs": 6.5,
    "fat": 0.1,
    "vitA": 426,
    "iron": 0.8,
    "vitD": 0.0,
    "calcium": 21,
    "potassium": 340,
    "magnesium": 12,
    "vitB12": 0.0,
    "folate": 16,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Cauliflower (Raw)",
    "category": "Vegetables",
    "calories": 25,
    "protein": 1.9,
    "carbs": 5.0,
    "fat": 0.3,
    "vitA": 0,
    "iron": 0.4,
    "vitD": 0.0,
    "calcium": 22,
    "potassium": 299,
    "magnesium": 15,
    "vitB12": 0.0,
    "folate": 57,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Eggplant (Raw)",
    "category": "Vegetables",
    "calories": 25,
    "protein": 1.0,
    "carbs": 5.9,
    "fat": 0.2,
    "vitA": 1,
    "iron": 0.2,
    "vitD": 0.0,
    "calcium": 9,
    "potassium": 229,
    "magnesium": 14,
    "vitB12": 0.0,
    "folate": 22,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Beef Bone Broth",
    "category": "Proteins",
    "calories": 30,
    "protein": 6.0,
    "carbs": 0.5,
    "fat": 0.5,
    "vitA": 0,
    "iron": 0.5,
    "vitD": 0.0,
    "calcium": 15,
    "potassium": 150,
    "magnesium": 8,
    "vitB12": 0.2,
    "folate": 2,
    "defaultServing": 240,
    "unit": "ml"
  },
  {
    "name": "Kimchi",
    "category": "Cooked Dish",
    "calories": 15,
    "protein": 1.1,
    "carbs": 2.4,
    "fat": 0.5,
    "vitA": 26,
    "iron": 0.5,
    "vitD": 0.0,
    "calcium": 33,
    "potassium": 151,
    "magnesium": 10,
    "vitB12": 0.0,
    "folate": 27,
    "defaultServing": 100,
    "unit": "g"
  },
  {
    "name": "Ramen (Chicken Broth, Cooked)",
    "category": "Cooked Dish",
    "calories": 140,
    "protein": 7.5,
    "carbs": 19.0,
    "fat": 3.5,
    "vitA": 25,
    "iron": 1.5,
    "vitD": 0.1,
    "calcium": 30,
    "potassium": 250,
    "magnesium": 20,
    "vitB12": 0.4,
    "folate": 15,
    "defaultServing": 400,
    "unit": "ml"
  },
  {
    "name": "Guacamole",
    "category": "Cooked Dish",
    "calories": 157,
    "protein": 2.0,
    "carbs": 8.5,
    "fat": 14.0,
    "vitA": 10,
    "iron": 0.5,
    "vitD": 0.0,
    "calcium": 15,
    "potassium": 490,
    "magnesium": 30,
    "vitB12": 0.0,
    "folate": 82,
    "defaultServing": 60,
    "unit": "g"
  },
  {
    "name": "Pho (Beef Broth with Noodles)",
    "category": "Cooked Dish",
    "calories": 101,
    "protein": 8.0,
    "carbs": 14.0,
    "fat": 1.5,
    "vitA": 10,
    "iron": 1.4,
    "vitD": 0.0,
    "calcium": 25,
    "potassium": 200,
    "magnesium": 18,
    "vitB12": 1.0,
    "folate": 10,
    "defaultServing": 400,
    "unit": "ml"
  },
  {
    "name": "Tortilla Chips",
    "category": "Snacks",
    "calories": 489,
    "protein": 6.7,
    "carbs": 65.0,
    "fat": 23.3,
    "vitA": 0,
    "iron": 1.8,
    "vitD": 0.0,
    "calcium": 120,
    "potassium": 241,
    "magnesium": 53,
    "vitB12": 0.0,
    "folate": 11,
    "defaultServing": 30,
    "unit": "g"
  },
  {
    "name": "Croissant",
    "category": "Grains",
    "calories": 406,
    "protein": 8.2,
    "carbs": 45.8,
    "fat": 21.0,
    "vitA": 123,
    "iron": 2.4,
    "vitD": 0.3,
    "calcium": 30,
    "potassium": 118,
    "magnesium": 15,
    "vitB12": 0.2,
    "folate": 22,
    "defaultServing": 1,
    "unit": "pcs"
  },
  {
    "name": "Lamb Kebab",
    "category": "Cooked Dish",
    "calories": 218,
    "protein": 19.0,
    "carbs": 3.5,
    "fat": 14.0,
    "vitA": 0,
    "iron": 2.1,
    "vitD": 0.0,
    "calcium": 22,
    "potassium": 340,
    "magnesium": 28,
    "vitB12": 2.8,
    "folate": 15,
    "defaultServing": 150,
    "unit": "g"
  },
  {
    "name": "Saag Paneer",
    "category": "Cooked Dish",
    "calories": 168,
    "protein": 9.0,
    "carbs": 8.0,
    "fat": 11.5,
    "vitA": 530,
    "iron": 2.8,
    "vitD": 0.1,
    "calcium": 260,
    "potassium": 310,
    "magnesium": 50,
    "vitB12": 0.4,
    "folate": 110,
    "defaultServing": 250,
    "unit": "g"
  },
  {
    "name": "Baklava",
    "category": "Snacks",
    "calories": 428,
    "protein": 6.0,
    "carbs": 50.0,
    "fat": 24.5,
    "vitA": 15,
    "iron": 1.8,
    "vitD": 0.0,
    "calcium": 57,
    "potassium": 180,
    "magnesium": 42,
    "vitB12": 0.1,
    "folate": 20,
    "defaultServing": 60,
    "unit": "g"
  }
];

// App State
const state = {
  selectedDate: getFormattedDate(new Date()),
  activeTab: 'dashboard',
  mealFilter: 'all',
  profile: {
    sex: 'Female',
    weight: 60,
    height: 165,
    age: 30,
    activity: 1.375
  },
  foodDatabase: [],
  logs: [],
  scriptUrl: '',
  geminiApiKey: '',
  selectedFoodForLogging: null,
  isManualNutrientEdit: false,
  calendarYear: new Date().getFullYear(),
  calendarMonth: new Date().getMonth(),
  favorites: [], // lowercase food names, stored locally on this device
  water: {}, // { 'YYYY-MM-DD': cupsConsumed }, stored locally on this device
  waterTarget: 8 // cups/day (~2L)
};

// Mifflin-St Jeor + RDA nutrient targets based on profile state
let dailyTargets = {
  calories: 2000,
  protein: 100,
  carbs: 250,
  fat: 67,
  vitA: 700,
  iron: 18,
  vitD: 15,
  calcium: 1000,
  potassium: 2600,
  magnesium: 310,
  vitB12: 2.4,
  folate: 400
};

/* ==========================================================================
   Initialization
   ========================================================================== */

document.addEventListener('DOMContentLoaded', async () => {
  setupEventHandlers();
  loadLocalState();
  updateTargets();
  updateDateDisplay();

  showLoader("Initializing Database...");
  await initDatabase();
  await syncProfile();
  await syncLogs();
  hideLoader();

  switchTab('dashboard');
  renderDashboard();
  renderCalendar();
});

// Load settings and fallbacks from LocalStorage
function loadLocalState() {
  const url = localStorage.getItem(KEYS.SCRIPT_URL);
  if (url) {
    state.scriptUrl = url;
    document.getElementById('apps-script-url').value = url;
    updateSyncIndicator(true);
  } else {
    updateSyncIndicator(false);
  }

  const geminiKey = localStorage.getItem(KEYS.GEMINI_KEY);
  if (geminiKey) {
    state.geminiApiKey = geminiKey;
    document.getElementById('gemini-api-key').value = geminiKey;
  }

  const savedProfile = localStorage.getItem(KEYS.PROFILE);
  if (savedProfile) {
    state.profile = JSON.parse(savedProfile);
    populateProfileForm();
  }

  const savedLogs = localStorage.getItem(KEYS.LOGS);
  if (savedLogs) {
    state.logs = JSON.parse(savedLogs);
  }

  const savedFavorites = localStorage.getItem(KEYS.FAVORITES);
  if (savedFavorites) {
    state.favorites = JSON.parse(savedFavorites);
  }

  const savedWater = localStorage.getItem(KEYS.WATER);
  if (savedWater) {
    state.water = JSON.parse(savedWater);
  }

  const savedDb = localStorage.getItem(KEYS.FOOD_DB);
  if (savedDb) {
    state.foodDatabase = JSON.parse(savedDb);
    // Smart merge: update any existing seed items that have changed (e.g. Mango calories fixed)
    // and add any missing seed items. Preserves custom (non-seed) user items.
    const seedNames = new Set(LOCAL_FOOD_DATABASE_SEED.map(f => f.name.toLowerCase()));
    const existingNames = new Set(state.foodDatabase.map(f => f.name.toLowerCase()));
    // Update changed seed items in place
    state.foodDatabase = state.foodDatabase.map(f => {
      if (seedNames.has(f.name.toLowerCase())) {
        const seedVersion = LOCAL_FOOD_DATABASE_SEED.find(s => s.name.toLowerCase() === f.name.toLowerCase());
        return seedVersion ? { ...seedVersion } : f;
      }
      return f; // Keep custom items unchanged
    });
    // Add any new seed items not yet in local DB
    LOCAL_FOOD_DATABASE_SEED.forEach(seedFood => {
      if (!existingNames.has(seedFood.name.toLowerCase())) {
        state.foodDatabase.push(seedFood);
      }
    });
    localStorage.setItem(KEYS.FOOD_DB, JSON.stringify(state.foodDatabase));
  } else {
    state.foodDatabase = LOCAL_FOOD_DATABASE_SEED;
    localStorage.setItem(KEYS.FOOD_DB, JSON.stringify(state.foodDatabase));
  }
}

// Populate forms with loaded profile details
function populateProfileForm() {
  if (state.profile.sex === 'Male') {
    document.getElementById('profile-sex-male').checked = true;
  } else {
    document.getElementById('profile-sex-female').checked = true;
  }
  document.getElementById('profile-age').value = state.profile.age;
  document.getElementById('profile-weight').value = state.profile.weight;
  document.getElementById('profile-height').value = state.profile.height;
  document.getElementById('profile-activity').value = state.profile.activity;
}

// Update daily nutrient targets using Mifflin-St Jeor & RDA guidelines
function updateTargets() {
  const { sex, weight, height, age, activity } = state.profile;
  let bmr = 0;
  
  if (sex === 'Male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const calories = Math.round(bmr * Number(activity));
  
  const protein = Math.round((calories * 0.20) / 4);
  const carbs = Math.round((calories * 0.50) / 4);
  const fat = Math.round((calories * 0.30) / 9);

  let vitA = 700;
  let iron = 18;
  let vitD = 15;
  let calcium = 1000;
  let potassium = 2600;
  let magnesium = 310;
  let vitB12 = 2.4;
  let folate = 400;

  if (sex === 'Male') {
    vitA = 900;
    iron = 8;
    potassium = 3400;
    magnesium = age < 31 ? 400 : 420;
    if (age > 70) calcium = 1200;
  } else {
    vitA = 700;
    iron = age > 50 ? 8 : 18;
    potassium = 2600;
    magnesium = age < 31 ? 310 : 320;
    if (age > 50) calcium = 1200;
  }

  dailyTargets = { calories, protein, carbs, fat, vitA, iron, vitD, calcium, potassium, magnesium, vitB12, folate };

  document.getElementById('target-calories').textContent = `/ ${calories} kcal`;
  document.getElementById('target-protein').textContent = protein;
  document.getElementById('target-carbs').textContent = carbs;
  document.getElementById('target-fat').textContent = fat;

  document.getElementById('target-vitA').textContent = vitA;
  document.getElementById('target-iron').textContent = iron;
  document.getElementById('target-vitD').textContent = vitD;
  document.getElementById('target-calcium').textContent = calcium;
  document.getElementById('target-potassium').textContent = potassium;
  document.getElementById('target-magnesium').textContent = magnesium;
  document.getElementById('target-vitB12').textContent = vitB12;
  document.getElementById('target-folate').textContent = folate;

  document.getElementById('calc-calories-preview').textContent = calories;
  document.getElementById('calc-protein-preview').textContent = `${protein}g`;
  document.getElementById('calc-carbs-preview').textContent = `${carbs}g`;
  document.getElementById('calc-fat-preview').textContent = `${fat}g`;
}

/* ==========================================================================
   Google Sheets & API Communication
   ========================================================================== */

// Initialize food list
async function initDatabase() {
  if (!state.scriptUrl) {
    if (state.foodDatabase.length === 0) {
      state.foodDatabase = LOCAL_FOOD_DATABASE_SEED;
      localStorage.setItem(KEYS.FOOD_DB, JSON.stringify(state.foodDatabase));
    }
    return;
  }

  try {
    const response = await fetch(`${state.scriptUrl}?action=get_food_database`);
    const result = await response.json();
    if (result.success && result.data && result.data.length > 0) {
      state.foodDatabase = result.data;
      localStorage.setItem(KEYS.FOOD_DB, JSON.stringify(state.foodDatabase));
    }
  } catch (err) {
    console.error("Error fetching sheet database, fallback to local:", err);
  }
}

// Fetch user profile from Sheets
async function syncProfile() {
  if (!state.scriptUrl) return;

  try {
    const response = await fetch(`${state.scriptUrl}?action=get_profile`);
    const result = await response.json();
    if (result.success && result.data) {
      state.profile = {
        sex: result.data.sex,
        weight: Number(result.data.weight),
        height: Number(result.data.height),
        age: Number(result.data.age),
        activity: Number(result.data.activity || 1.375)
      };
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(state.profile));
      populateProfileForm();
      updateTargets();
    }
  } catch (err) {
    console.error("Error syncing profile:", err);
  }
}

// Fetch all logs from Sheets
async function syncLogs() {
  if (!state.scriptUrl) return;

  try {
    const response = await fetch(`${state.scriptUrl}?action=get_logs`);
    const result = await response.json();
    if (result.success && result.data) {
      state.logs = result.data;
      localStorage.setItem(KEYS.LOGS, JSON.stringify(state.logs));
    }
  } catch (err) {
    console.error("Error syncing logs:", err);
  }
}

// Post request to save profile to Google Sheets
async function saveProfileToSheet(profileData) {
  if (!state.scriptUrl) return true;

  try {
    const response = await fetch(state.scriptUrl, {
      method: 'POST',
      body: JSON.stringify({
        action: 'save_profile',
        data: profileData
      })
    });
    const result = await response.json();
    return result.success;
  } catch (err) {
    console.error("Error saving profile to sheet:", err);
    return false;
  }
}

// Post request to add log entry to Google Sheets
async function addLogToSheet(logItem) {
  if (!state.scriptUrl) return true;

  try {
    const response = await fetch(state.scriptUrl, {
      method: 'POST',
      body: JSON.stringify({
        action: 'add_log',
        data: logItem
      })
    });
    const result = await response.json();
    return result.success;
  } catch (err) {
    console.error("Error adding log to sheet:", err);
    return false;
  }
}

// Post request to delete log entry from Google Sheets
async function deleteLogFromSheet(logItem) {
  if (!state.scriptUrl) return true;

  try {
    const response = await fetch(state.scriptUrl, {
      method: 'POST',
      body: JSON.stringify({
        action: 'delete_log',
        data: {
          date: logItem.date,
          mealType: logItem.mealType,
          foodName: logItem.foodName,
          timestamp: logItem.timestamp
        }
      })
    });
    const result = await response.json();
    return result.success;
  } catch (err) {
    console.error("Error deleting log from sheet:", err);
    return false;
  }
}

// Post request to add newly discovered custom food to database sheet
async function addFoodToSheetDatabase(foodItem) {
  if (!state.scriptUrl) return true;

  try {
    const response = await fetch(state.scriptUrl, {
      method: 'POST',
      body: JSON.stringify({
        action: 'add_food',
        data: foodItem
      })
    });
    const result = await response.json();
    return result.success;
  } catch (err) {
    console.error("Error adding food to sheet database:", err);
    return false;
  }
}

// Update UI Sync Indicator
function updateSyncIndicator(isConnected) {
  const indicator = document.getElementById('sync-status-indicator');
  const txt = document.getElementById('sync-connection-status');
  const desc = document.getElementById('sync-connection-desc');
  
  if (isConnected) {
    indicator.className = 'status-indicator synced';
    txt.className = 'val-status status-connected';
    txt.textContent = 'Connected (Google Sheets)';
    desc.textContent = 'Logs and settings are safely synced with your live Google Spreadsheet.';
  } else {
    indicator.className = 'status-indicator local';
    txt.className = 'val-status status-local';
    txt.textContent = 'Disconnected (Local storage)';
    desc.textContent = 'Your entries are currently stored securely in your browser\'s local cache.';
  }
}

/* ==========================================================================
   UI Rendering Functions
   ========================================================================== */

// Switch visible Tab Content
function switchTab(tabId) {
  state.activeTab = tabId;
  
  document.querySelectorAll('.nav-tab').forEach(tab => {
    if (tab.dataset.tab === tabId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  document.querySelectorAll('.tab-content').forEach(content => {
    if (content.id === `tab-${tabId}`) {
      content.classList.add('active-content');
    } else {
      content.classList.remove('active-content');
    }
  });

  if (tabId === 'history') {
    renderCalendar();
  }
}

// Calculate and render all dashboard metrics
function renderDashboard() {
  const selectedDayLogs = state.logs.filter(log => {
    let logDateStr = (log.date instanceof Date) ? log.date.toISOString().split('T')[0] : String(log.date).split('T')[0];
    return logDateStr === state.selectedDate;
  });

  let displayLogs = selectedDayLogs;
  if (state.mealFilter !== 'all') {
    displayLogs = selectedDayLogs.filter(log => log.mealType === state.mealFilter);
  }

  let consumedCal = 0;
  let consumedProtein = 0;
  let consumedCarbs = 0;
  let consumedFat = 0;
  
  let consumedVitA = 0;
  let consumedIron = 0;
  let consumedVitD = 0;
  let consumedCalcium = 0;
  let consumedPotassium = 0;
  let consumedMagnesium = 0;
  let consumedVitB12 = 0;
  let consumedFolate = 0;

  selectedDayLogs.forEach(log => {
    consumedCal += log.calories || 0;
    consumedProtein += log.protein || 0;
    consumedCarbs += log.carbs || 0;
    consumedFat += log.fat || 0;
    consumedVitA += log.vitA || 0;
    consumedIron += log.iron || 0;
    consumedVitD += log.vitD || 0;
    consumedCalcium += log.calcium || 0;
    consumedPotassium += log.potassium || 0;
    consumedMagnesium += log.magnesium || 0;
    consumedVitB12 += log.vitB12 || 0;
    consumedFolate += log.folate || 0;
  });

  consumedCal = Math.round(consumedCal);
  consumedProtein = Math.round(consumedProtein * 10) / 10;
  consumedCarbs = Math.round(consumedCarbs * 10) / 10;
  consumedFat = Math.round(consumedFat * 10) / 10;

  consumedVitA = Math.round(consumedVitA);
  consumedIron = Math.round(consumedIron * 10) / 10;
  consumedVitD = Math.round(consumedVitD * 10) / 10;
  consumedCalcium = Math.round(consumedCalcium);
  consumedPotassium = Math.round(consumedPotassium);
  consumedMagnesium = Math.round(consumedMagnesium);
  consumedVitB12 = Math.round(consumedVitB12 * 10) / 10;
  consumedFolate = Math.round(consumedFolate);

  const currentCalSpan = document.getElementById('current-calories');
  const remainingCalSpan = document.getElementById('remaining-calories');
  const calorieCircle = document.getElementById('calorie-progress-circle');
  const calorieStatusBadge = document.getElementById('calorie-status');

  currentCalSpan.textContent = consumedCal;
  const remaining = dailyTargets.calories - consumedCal;
  remainingCalSpan.textContent = remaining > 0 ? remaining : 0;

  const ringCircumference = 440;
  const progressRatio = Math.min(1, consumedCal / dailyTargets.calories);
  const offset = ringCircumference - (progressRatio * ringCircumference);
  calorieCircle.style.strokeDashoffset = offset;

  if (consumedCal > dailyTargets.calories + 100) {
    calorieStatusBadge.textContent = 'Calorie Surplus';
    calorieStatusBadge.className = 'value status-badge over';
  } else {
    calorieStatusBadge.textContent = 'Optimal Balance';
    calorieStatusBadge.className = 'value status-badge';
  }

  updateProgressBar('protein', consumedProtein, dailyTargets.protein);
  updateProgressBar('carbs', consumedCarbs, dailyTargets.carbs);
  updateProgressBar('fat', consumedFat, dailyTargets.fat);

  updateProgressBar('vitA', consumedVitA, dailyTargets.vitA);
  updateProgressBar('iron', consumedIron, dailyTargets.iron);
  updateProgressBar('vitD', consumedVitD, dailyTargets.vitD);
  updateProgressBar('calcium', consumedCalcium, dailyTargets.calcium);
  updateProgressBar('potassium', consumedPotassium, dailyTargets.potassium);
  updateProgressBar('magnesium', consumedMagnesium, dailyTargets.magnesium);
  updateProgressBar('vitB12', consumedVitB12, dailyTargets.vitB12);
  updateProgressBar('folate', consumedFolate, dailyTargets.folate);

  renderFoodLogList(displayLogs);
  renderTrendChart();
  renderWaterTracker();
}

// Sum calories logged on a given date string ('YYYY-MM-DD')
function getCaloriesForDate(dateStr) {
  return state.logs.reduce((sum, log) => {
    const logDateStr = (log.date instanceof Date) ? log.date.toISOString().split('T')[0] : String(log.date).split('T')[0];
    return logDateStr === dateStr ? sum + (log.calories || 0) : sum;
  }, 0);
}

// Render a 7-day bar chart of calories consumed, ending on the currently selected date
function renderTrendChart() {
  const container = document.getElementById('trend-chart-container');
  if (!container) return;

  const baseDate = new Date(state.selectedDate + 'T00:00:00');
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() - i);
    days.push(d);
  }

  const totals = days.map(d => Math.round(getCaloriesForDate(getFormattedDate(d))));
  const maxVal = Math.max(dailyTargets.calories, ...totals, 1);
  const targetPct = Math.min(100, (dailyTargets.calories / maxVal) * 100);
  container.style.setProperty('--target-line-pct', `${targetPct}%`);

  container.innerHTML = '';
  days.forEach((d, idx) => {
    const dateStr = getFormattedDate(d);
    const val = totals[idx];
    const heightPct = Math.min(100, (val / maxVal) * 100);
    const isSelected = dateStr === state.selectedDate;
    const isOver = val > dailyTargets.calories;

    const col = document.createElement('button');
    col.type = 'button';
    col.className = 'trend-bar-col' + (isSelected ? ' active' : '');
    col.title = `${val} kcal – ${d.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}`;
    col.innerHTML = `
      <span class="trend-bar-value">${val}</span>
      <div class="trend-bar-track">
        <div class="trend-bar-fill${isOver ? ' over' : ''}" style="height: ${heightPct}%"></div>
      </div>
      <span class="trend-bar-label">${d.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 2)}</span>
    `;
    col.addEventListener('click', () => {
      state.selectedDate = dateStr;
      updateDateDisplay();
      renderDashboard();
    });
    container.appendChild(col);
  });
}

// Get/set cups of water logged for a given date string
function getWaterForDate(dateStr) {
  return state.water[dateStr] || 0;
}

function setWaterForDate(dateStr, value) {
  const clamped = Math.max(0, value);
  if (clamped === 0) {
    delete state.water[dateStr];
  } else {
    state.water[dateStr] = clamped;
  }
  localStorage.setItem(KEYS.WATER, JSON.stringify(state.water));
}

// Render tappable cup row for the currently selected day's hydration
function renderWaterTracker() {
  const container = document.getElementById('water-glasses-container');
  const countDisplay = document.getElementById('water-count-display');
  if (!container) return;

  const target = state.waterTarget;
  const current = getWaterForDate(state.selectedDate);

  container.innerHTML = '';
  const cupCount = Math.max(target, current);
  for (let i = 1; i <= cupCount; i++) {
    const cup = document.createElement('button');
    cup.type = 'button';
    cup.className = 'water-cup' + (i <= current ? ' filled' : '');
    cup.setAttribute('aria-label', `Set hydration to ${i} cups`);
    cup.innerHTML = `<svg width="18" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h14l-1.5 16.5a2 2 0 0 1-2 1.99H8.5a2 2 0 0 1-2-1.99L5 3z"></path></svg>`;
    cup.addEventListener('click', () => {
      const currentVal = getWaterForDate(state.selectedDate);
      const newVal = (currentVal === i) ? i - 1 : i;
      setWaterForDate(state.selectedDate, newVal);
      renderWaterTracker();
    });
    container.appendChild(cup);
  }

  if (countDisplay) countDisplay.textContent = `${current} / ${target} cups`;
}

// Helper to update linear progress bar
function updateProgressBar(elementId, current, target) {
  const currentSpan = document.getElementById(`current-${elementId}`);
  const fillBar = document.getElementById(`${elementId}-fill-bar`);
  
  if (currentSpan) currentSpan.textContent = current;

  if (fillBar) {
    let fillPercent = 0;
    if (target > 0) {
      fillPercent = (current / target) * 80;
    }
    fillPercent = Math.min(100, Math.max(0, fillPercent));
    fillBar.style.width = `${fillPercent}%`;
  }
}

// Render the list of food entries
function renderFoodLogList(displayLogs) {
  const container = document.getElementById('log-list-container');
  const emptyState = document.getElementById('log-empty-state');

  if (displayLogs.length === 0) {
    container.classList.add('hidden');
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  container.classList.remove('hidden');
  container.innerHTML = '';

  displayLogs.forEach(log => {
    const item = document.createElement('div');
    item.className = 'log-item';
    
    const tsAttr = log.timestamp ? log.timestamp : '';

    item.innerHTML = `
      <div class="log-item-details">
        <div class="log-item-title-row">
          <span class="log-item-title">${escapeHtml(log.foodName)}</span>
          <span class="log-item-meal-tag">${escapeHtml(log.mealType)}</span>
        </div>
        <span class="log-item-sub">${log.amount} ${log.unit}</span>
      </div>

      <div class="log-item-nutrition">
        <div class="log-item-macros-breakdown">
          <span><span class="dot p"></span> P: ${Math.round(log.protein * 10) / 10}g</span>
          <span><span class="dot c"></span> C: ${Math.round(log.carbs * 10) / 10}g</span>
          <span><span class="dot f"></span> F: ${Math.round(log.fat * 10) / 10}g</span>
        </div>
        <div class="log-item-cals">${Math.round(log.calories)} <span class="unit-helper" style="font-size:0.6rem">kcal</span></div>
        <button class="delete-btn" aria-label="Delete entry" data-name="${escapeHtml(log.foodName)}" data-meal="${escapeHtml(log.mealType)}" data-date="${escapeHtml(log.date)}" data-ts="${tsAttr}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </button>
      </div>
    `;

    item.querySelector('.delete-btn').addEventListener('click', async (e) => {
      const btn = e.currentTarget;
      const logItem = {
        foodName: btn.dataset.name,
        mealType: btn.dataset.meal,
        date: btn.dataset.date,
        timestamp: btn.dataset.ts
      };
      
      showLoader("Deleting entry...");
      const success = await deleteLogFromSheet(logItem);
      
      if (success) {
        state.logs = state.logs.filter(l => !(
          l.foodName === logItem.foodName &&
          l.mealType === logItem.mealType &&
          String(l.date).split('T')[0] === logItem.date &&
          (l.timestamp === logItem.timestamp || (!l.timestamp && !logItem.timestamp))
        ));
        localStorage.setItem(KEYS.LOGS, JSON.stringify(state.logs));
        renderDashboard();
        renderCalendar();
      } else {
        alert("Failed to delete log entry from Google Sheets.");
      }
      hideLoader();
    });

    container.appendChild(item);
  });
}

// Generate Custom Calendar Layout
function renderCalendar() {
  const container = document.getElementById('calendar-days-container');
  const title = document.getElementById('calendar-month-year');
  
  const year = state.calendarYear;
  const month = state.calendarMonth;

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  title.textContent = `${monthNames[month]} ${year}`;
  container.innerHTML = '';

  const firstDay = new Date(year, month, 1);
  let startDayOfWeek = firstDay.getDay();
  startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1; // Mon-indexed

  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < startDayOfWeek; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-day-cell empty-day';
    container.appendChild(emptyCell);
  }

  const todayStr = getFormattedDate(new Date());
  
  for (let day = 1; day <= totalDays; day++) {
    const cellDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayCell = document.createElement('div');
    dayCell.className = 'calendar-day-cell';
    dayCell.textContent = day;
    
    if (cellDateStr === state.selectedDate) dayCell.classList.add('selected-day');
    if (cellDateStr === todayStr) dayCell.classList.add('current-day');

    const hasLogs = state.logs.some(log => {
      let logDateStr = (log.date instanceof Date) ? log.date.toISOString().split('T')[0] : String(log.date).split('T')[0];
      return logDateStr === cellDateStr;
    });

    if (hasLogs) {
      const dot = document.createElement('span');
      dot.className = 'logged-dot';
      dayCell.appendChild(dot);
    }

    dayCell.addEventListener('click', () => {
      state.selectedDate = cellDateStr;
      document.querySelectorAll('.calendar-day-cell').forEach(c => c.classList.remove('selected-day'));
      dayCell.classList.add('selected-day');
      renderCalendarDayPreview(cellDateStr);
    });

    container.appendChild(dayCell);
  }

  renderCalendarDayPreview(state.selectedDate);
}

// Render dynamic preview metrics on history calendar view
function renderCalendarDayPreview(dateStr) {
  const cardTitle = document.getElementById('preview-date-title');
  const metricsGrid = document.getElementById('preview-metrics-grid');
  const previewMicrosContainer = document.getElementById('preview-micros-grid-container');
  const viewFullDayBtn = document.getElementById('go-to-selected-day-btn');

  const previewCal = document.getElementById('preview-cal');
  const previewProtein = document.getElementById('preview-protein');
  const previewCarbs = document.getElementById('preview-carbs');
  const previewFat = document.getElementById('preview-fat');

  const previewVitA = document.getElementById('preview-vitA');
  const previewIron = document.getElementById('preview-iron');
  const previewVitD = document.getElementById('preview-vitD');
  const previewCalcium = document.getElementById('preview-calcium');
  const previewPotassium = document.getElementById('preview-potassium');
  const previewMagnesium = document.getElementById('preview-magnesium');
  const previewVitB12 = document.getElementById('preview-vitB12');
  const previewFolate = document.getElementById('preview-folate');

  const readableDate = new Date(dateStr + "T00:00:00").toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  
  cardTitle.textContent = readableDate;

  const previewDayLogs = state.logs.filter(log => {
    let logDateStr = (log.date instanceof Date) ? log.date.toISOString().split('T')[0] : String(log.date).split('T')[0];
    return logDateStr === dateStr;
  });

  if (previewDayLogs.length === 0) {
    metricsGrid.classList.add('hidden');
    previewMicrosContainer.classList.add('hidden');
    viewFullDayBtn.classList.add('hidden');
    return;
  }

  let cal = 0, p = 0, c = 0, f = 0;
  let vitA = 0, iron = 0, vitD = 0, calcium = 0, potassium = 0, magnesium = 0, vitB12 = 0, folate = 0;

  previewDayLogs.forEach(log => {
    cal += log.calories || 0;
    p += log.protein || 0;
    c += log.carbs || 0;
    f += log.fat || 0;
    vitA += log.vitA || 0;
    iron += log.iron || 0;
    vitD += log.vitD || 0;
    calcium += log.calcium || 0;
    potassium += log.potassium || 0;
    magnesium += log.magnesium || 0;
    vitB12 += log.vitB12 || 0;
    folate += log.folate || 0;
  });

  previewCal.textContent = `${Math.round(cal)} kcal`;
  previewProtein.textContent = `${Math.round(p * 10) / 10}g`;
  previewCarbs.textContent = `${Math.round(c * 10) / 10}g`;
  previewFat.textContent = `${Math.round(f * 10) / 10}g`;

  previewVitA.textContent = `${Math.round(vitA)} mcg`;
  previewIron.textContent = `${Math.round(iron * 10) / 10} mg`;
  previewVitD.textContent = `${Math.round(vitD * 10) / 10} mcg`;
  previewCalcium.textContent = `${Math.round(calcium)} mg`;
  previewPotassium.textContent = `${Math.round(potassium)} mg`;
  previewMagnesium.textContent = `${Math.round(magnesium)} mg`;
  previewVitB12.textContent = `${Math.round(vitB12 * 10) / 10} mcg`;
  previewFolate.textContent = `${Math.round(folate)} mcg`;

  metricsGrid.classList.remove('hidden');
  previewMicrosContainer.classList.remove('hidden');
  viewFullDayBtn.classList.remove('hidden');
}

/* ==========================================================================
   Food Add Search Autocomplete & Preview Logic
   ========================================================================== */

function handleAutocompleteSearch(query) {
  const listContainer = document.getElementById('autocomplete-results');
  const aiSearchRow = document.getElementById('search-ai-action-row');
  const aiTermPreview = document.getElementById('ai-search-term-preview');

  if (!query) {
    listContainer.classList.add('hidden');
    aiSearchRow.classList.add('hidden');
    return;
  }

  const matches = state.foodDatabase.filter(food => 
    food.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  // Update text preview inside Ask AI button row
  if (query.trim().length > 1) {
    aiSearchRow.classList.remove('hidden');
    aiTermPreview.textContent = query;
  } else {
    aiSearchRow.classList.add('hidden');
  }

  if (matches.length === 0) {
    listContainer.innerHTML = `<div class="autocomplete-item"><span class="item-name">No match found. Use custom manual override or ask AI...</span></div>`;
    listContainer.classList.remove('hidden');
    state.selectedFoodForLogging = null;
    return;
  }

  listContainer.innerHTML = '';
  matches.forEach(food => {
    const item = document.createElement('div');
    item.className = 'autocomplete-item';
    item.innerHTML = `
      <span class="item-name">${escapeHtml(food.name)}</span>
      <span class="item-cals">${food.calories} kcal / ${food.defaultServing}${food.unit}</span>
    `;

    item.addEventListener('click', () => {
      selectFoodForLogging(food);
      listContainer.classList.add('hidden');
      aiSearchRow.classList.add('hidden');
    });

    listContainer.appendChild(item);
  });
  listContainer.classList.remove('hidden');
}

// Helper to safely set dropdown selected option, adding it dynamically if missing
function setSelectUnit(unit) {
  const select = document.getElementById('amount-unit-label');
  const normalizedUnit = (unit || 'g').toLowerCase();
  
  let optionExists = false;
  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].value === normalizedUnit) {
      optionExists = true;
      break;
    }
  }
  
  if (!optionExists) {
    const newOpt = document.createElement('option');
    newOpt.value = normalizedUnit;
    newOpt.textContent = normalizedUnit;
    select.appendChild(newOpt);
  }
  
  select.value = normalizedUnit;
}

// Get the weight of one piece for a given food
function getWeightPerPiece(food) {
  if (!food) return 150;
  if (food.weightPerPiece) return food.weightPerPiece;
  if (food.unit === 'g' || food.unit === 'ml') {
    return food.defaultServing || 100;
  }
  return 100; // Fallback
}

// Calculate the nutrient multiplier based on food database unit and selected logging unit
function getMultiplier(food, amount, selectedUnit) {
  if (!food) return 1;
  const dbUnit = food.unit || 'g';
  const selUnit = selectedUnit || dbUnit;

  if (dbUnit === selUnit) {
    return selUnit === 'pcs' ? amount : amount / 100;
  }

  // Units are different
  if ((dbUnit === 'g' || dbUnit === 'ml') && selUnit === 'pcs') {
    // 1 piece = user-defined weight per piece (or default Serving)
    const weightInput = document.getElementById('custom-piece-weight-input');
    const gramsPerPiece = (weightInput && !weightInput.parentElement.classList.contains('hidden')) 
      ? (Number(weightInput.value) || food.defaultServing || 100)
      : (food.defaultServing || 100);
    return (amount * gramsPerPiece) / 100;
  }
  
  if (dbUnit === 'pcs' && (selUnit === 'g' || selUnit === 'ml')) {
    // db is pcs, logging in grams.
    const weightInput = document.getElementById('custom-piece-weight-input');
    const gramsPerPiece = (weightInput && !weightInput.parentElement.classList.contains('hidden'))
      ? (Number(weightInput.value) || food.weightPerPiece || 100)
      : (food.weightPerPiece || 100);
    return amount / gramsPerPiece;
  }

  return amount / 100;
}

function selectFoodForLogging(food) {
  state.selectedFoodForLogging = food;
  
  const searchInput = document.getElementById('food-search-input');
  const amountInput = document.getElementById('food-amount-input');
  const categoryInput = document.getElementById('food-category-input');
  const customWeightGroup = document.getElementById('custom-piece-weight-group');
  const customWeightInput = document.getElementById('custom-piece-weight-input');

  searchInput.value = food.name;
  amountInput.value = food.defaultServing;
  if (categoryInput) {
    categoryInput.value = food.category || 'Custom';
  }
  
  setSelectUnit(food.unit);

  if (food.unit === 'pcs') {
    customWeightGroup.classList.remove('hidden');
    customWeightInput.value = getWeightPerPiece(food);
  } else {
    customWeightGroup.classList.add('hidden');
  }

  setManualNutrientEditMode(false);
  updateNutritionLogPreview();
  updateFavoriteButtonState(food.name);
}

// Reflect whether the given food name is currently favorited on the star toggle button
function updateFavoriteButtonState(foodName) {
  const btn = document.getElementById('toggle-favorite-btn');
  if (!btn) return;
  const isFav = !!foodName && state.favorites.includes(foodName.toLowerCase());
  btn.classList.toggle('active', isFav);
  btn.title = isFav ? 'Remove from favorites' : 'Add to favorites';
}

// Build the Recent & Favorites quick-add chip rows shown in the Add Food modal
function renderQuickAddChips() {
  const favContainer = document.getElementById('favorites-chips-container');
  const recentContainer = document.getElementById('recent-chips-container');
  const favGroup = document.getElementById('quick-add-favorites-group');
  const recentGroup = document.getElementById('quick-add-recent-group');
  const section = document.getElementById('quick-add-section');
  if (!favContainer || !recentContainer) return;

  const dbByName = new Map(state.foodDatabase.map(f => [f.name.toLowerCase(), f]));

  const favFoods = state.favorites.map(name => dbByName.get(name)).filter(Boolean);
  favContainer.innerHTML = '';
  favFoods.forEach(food => favContainer.appendChild(buildQuickAddChip(food)));
  favGroup.classList.toggle('hidden', favFoods.length === 0);

  const seen = new Set();
  const recentFoods = [];
  [...state.logs]
    .sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0))
    .forEach(log => {
      const key = log.foodName.toLowerCase();
      if (seen.has(key) || state.favorites.includes(key)) return;
      const food = dbByName.get(key);
      if (!food) return;
      seen.add(key);
      recentFoods.push(food);
    });
  const recentTop = recentFoods.slice(0, 6);
  recentContainer.innerHTML = '';
  recentTop.forEach(food => recentContainer.appendChild(buildQuickAddChip(food)));
  recentGroup.classList.toggle('hidden', recentTop.length === 0);

  section.classList.toggle('hidden', favFoods.length === 0 && recentTop.length === 0);
}

function buildQuickAddChip(food) {
  const chip = document.createElement('button');
  chip.type = 'button';
  chip.className = 'quick-add-chip';
  chip.textContent = food.name;
  chip.addEventListener('click', () => {
    selectFoodForLogging(food);
    document.getElementById('autocomplete-results').classList.add('hidden');
    document.getElementById('search-ai-action-row').classList.add('hidden');
  });
  return chip;
}

// Set up UI states for manual overrides vs read-only display labels
function setManualNutrientEditMode(isEdit) {
  state.isManualNutrientEdit = isEdit;
  
  const toggleBtn = document.getElementById('edit-nutrients-toggle-btn');
  toggleBtn.textContent = isEdit ? "Lock & Calculate" : "Edit Manually";

  // List of items to toggle display/input visibility
  const nutrientIds = ['cal', 'protein', 'carbs', 'fat', 'vitA', 'iron', 'vitD', 'calcium', 'potassium', 'magnesium', 'vitB12', 'folate'];
  
  nutrientIds.forEach(id => {
    const display = document.getElementById(`preview-food-${id}-display`);
    const input = document.getElementById(`preview-food-${id}-input`);
    
    if (isEdit) {
      if (display) display.classList.add('hidden');
      if (input) input.classList.remove('hidden');
    } else {
      if (display) display.classList.remove('hidden');
      if (input) input.classList.add('hidden');
    }
  });

  if (!isEdit) {
    // Lock values: sync input numbers back into preview state
    if (state.selectedFoodForLogging) {
      // Calculate what values should be per 100g/ml or pcs based on quantity entered
      const amount = Number(document.getElementById('food-amount-input').value) || 100;
      const selectedUnit = document.getElementById('amount-unit-label').value;
      let divider = getMultiplier(state.selectedFoodForLogging, amount, selectedUnit);
      if (divider <= 0) divider = 1;

      state.selectedFoodForLogging.calories = Number(document.getElementById('preview-food-cal-input').value) / divider;
      state.selectedFoodForLogging.protein = Number(document.getElementById('preview-food-protein-input').value) / divider;
      state.selectedFoodForLogging.carbs = Number(document.getElementById('preview-food-carbs-input').value) / divider;
      state.selectedFoodForLogging.fat = Number(document.getElementById('preview-food-fat-input').value) / divider;
      state.selectedFoodForLogging.vitA = Number(document.getElementById('preview-food-vitA-input').value) / divider;
      state.selectedFoodForLogging.iron = Number(document.getElementById('preview-food-iron-input').value) / divider;
      state.selectedFoodForLogging.vitD = Number(document.getElementById('preview-food-vitD-input').value) / divider;
      state.selectedFoodForLogging.calcium = Number(document.getElementById('preview-food-calcium-input').value) / divider;
      state.selectedFoodForLogging.potassium = Number(document.getElementById('preview-food-potassium-input').value) / divider;
      state.selectedFoodForLogging.magnesium = Number(document.getElementById('preview-food-magnesium-input').value) / divider;
      state.selectedFoodForLogging.vitB12 = Number(document.getElementById('preview-food-vitB12-input').value) / divider;
      state.selectedFoodForLogging.folate = Number(document.getElementById('preview-food-folate-input').value) / divider;
    }
    updateNutritionLogPreview();
  } else {
    // Unlock values: copy current display numbers into the text input value fields
    const amount = Number(document.getElementById('food-amount-input').value) || 100;
    const selectedUnit = document.getElementById('amount-unit-label').value;
    
    // We parse values directly from selectedFoodForLogging multiplier to prevent rounding drift
    let multiplier = getMultiplier(state.selectedFoodForLogging, amount, selectedUnit);
    if (!state.selectedFoodForLogging) {
      // If logging raw manual without selecting food first, create dummy
      state.selectedFoodForLogging = {
        name: document.getElementById('food-search-input').value || "Custom Item",
        category: document.getElementById('food-category-input').value || "Custom",
        calories: 0, protein: 0, carbs: 0, fat: 0,
        vitA: 0, iron: 0, vitD: 0, calcium: 0, potassium: 0, magnesium: 0, vitB12: 0, folate: 0,
        defaultServing: amount,
        unit: selectedUnit
      };
      multiplier = getMultiplier(state.selectedFoodForLogging, amount, selectedUnit);
    }

    const f = state.selectedFoodForLogging;
    document.getElementById('preview-food-cal-input').value = Math.round(f.calories * multiplier);
    document.getElementById('preview-food-protein-input').value = Math.round(f.protein * multiplier * 10) / 10;
    document.getElementById('preview-food-carbs-input').value = Math.round(f.carbs * multiplier * 10) / 10;
    document.getElementById('preview-food-fat-input').value = Math.round(f.fat * multiplier * 10) / 10;
    
    document.getElementById('preview-food-vitA-input').value = Math.round(f.vitA * multiplier);
    document.getElementById('preview-food-iron-input').value = Math.round(f.iron * multiplier * 10) / 10;
    document.getElementById('preview-food-vitD-input').value = Math.round(f.vitD * multiplier * 10) / 10;
    document.getElementById('preview-food-calcium-input').value = Math.round(f.calcium * multiplier);
    document.getElementById('preview-food-potassium-input').value = Math.round(f.potassium * multiplier);
    document.getElementById('preview-food-magnesium-input').value = Math.round(f.magnesium * multiplier);
    document.getElementById('preview-food-vitB12-input').value = Math.round(f.vitB12 * multiplier * 10) / 10;
    document.getElementById('preview-food-folate-input').value = Math.round(f.folate * multiplier);
  }
}

// Calculate preview nutrients dynamically (called on quantity changes or manual input changes)
function updateNutritionLogPreview() {
  const amount = Number(document.getElementById('food-amount-input').value) || 0;
  
  const previewCalText = document.getElementById('preview-food-cal-display');
  const previewProteinText = document.getElementById('preview-food-protein-display');
  const previewCarbsText = document.getElementById('preview-food-carbs-display');
  const previewFatText = document.getElementById('preview-food-fat-display');

  const previewCalBar = document.getElementById('preview-bar-cal');
  const previewProteinBar = document.getElementById('preview-bar-protein');
  const previewCarbsBar = document.getElementById('preview-bar-carbs');
  const previewFatBar = document.getElementById('preview-bar-fat');

  let cal = 0, p = 0, c = 0, f = 0;
  let vitA = 0, iron = 0, vitD = 0, calcium = 0, potassium = 0, magnesium = 0, vitB12 = 0, folate = 0;

  if (state.isManualNutrientEdit) {
    // Read from inputs
    cal = Number(document.getElementById('preview-food-cal-input').value) || 0;
    p = Number(document.getElementById('preview-food-protein-input').value) || 0;
    c = Number(document.getElementById('preview-food-carbs-input').value) || 0;
    f = Number(document.getElementById('preview-food-fat-input').value) || 0;
    
    vitA = Number(document.getElementById('preview-food-vitA-input').value) || 0;
    iron = Number(document.getElementById('preview-food-iron-input').value) || 0;
    vitD = Number(document.getElementById('preview-food-vitD-input').value) || 0;
    calcium = Number(document.getElementById('preview-food-calcium-input').value) || 0;
    potassium = Number(document.getElementById('preview-food-potassium-input').value) || 0;
    magnesium = Number(document.getElementById('preview-food-magnesium-input').value) || 0;
    vitB12 = Number(document.getElementById('preview-food-vitB12-input').value) || 0;
    folate = Number(document.getElementById('preview-food-folate-input').value) || 0;
  } else if (state.selectedFoodForLogging) {
    const food = state.selectedFoodForLogging;
    const selectedUnit = document.getElementById('amount-unit-label').value;
    const multiplier = getMultiplier(food, amount, selectedUnit);

    cal = food.calories * multiplier;
    p = food.protein * multiplier;
    c = food.carbs * multiplier;
    f = food.fat * multiplier;
    vitA = (food.vitA || 0) * multiplier;
    iron = (food.iron || 0) * multiplier;
    vitD = (food.vitD || 0) * multiplier;
    calcium = (food.calcium || 0) * multiplier;
    potassium = (food.potassium || 0) * multiplier;
    magnesium = (food.magnesium || 0) * multiplier;
    vitB12 = (food.vitB12 || 0) * multiplier;
    folate = (food.folate || 0) * multiplier;
  }

  cal = Math.round(cal);
  p = Math.round(p * 10) / 10;
  c = Math.round(c * 10) / 10;
  f = Math.round(f * 10) / 10;
  
  vitA = Math.round(vitA);
  iron = Math.round(iron * 10) / 10;
  vitD = Math.round(vitD * 10) / 10;
  calcium = Math.round(calcium);
  potassium = Math.round(potassium);
  magnesium = Math.round(magnesium);
  vitB12 = Math.round(vitB12 * 10) / 10;
  folate = Math.round(folate);

  previewCalText.textContent = `${cal} kcal`;
  previewProteinText.textContent = `${p} g`;
  previewCarbsText.textContent = `${c} g`;
  previewFatText.textContent = `${f} g`;

  document.getElementById('preview-food-vitA-display').textContent = `${vitA} mcg`;
  document.getElementById('preview-food-iron-display').textContent = `${iron} mg`;
  document.getElementById('preview-food-vitD-display').textContent = `${vitD} mcg`;
  document.getElementById('preview-food-calcium-display').textContent = `${calcium} mg`;
  document.getElementById('preview-food-potassium-display').textContent = `${potassium} mg`;
  document.getElementById('preview-food-magnesium-display').textContent = `${magnesium} mg`;
  document.getElementById('preview-food-vitB12-display').textContent = `${vitB12} mcg`;
  document.getElementById('preview-food-folate-display').textContent = `${folate} mcg`;

  const calPercent = Math.min(100, (cal / dailyTargets.calories) * 100);
  const pPercent = Math.min(100, (p / dailyTargets.protein) * 100);
  const cPercent = Math.min(100, (c / dailyTargets.carbs) * 100);
  const fPercent = Math.min(100, (f / dailyTargets.fat) * 100);

  previewCalBar.style.width = `${calPercent}%`;
  previewProteinBar.style.width = `${pPercent}%`;
  previewCarbsBar.style.width = `${cPercent}%`;
  previewFatBar.style.width = `${fPercent}%`;

  // Update fruit category & custom piece weight UI helpers
  const categoryVal = document.getElementById('food-category-input').value;
  const selectedUnit = document.getElementById('amount-unit-label').value;
  
  const helperNote = document.getElementById('fruit-helper-note');
  const weightInputGroup = document.getElementById('custom-piece-weight-group');
  
  if (selectedUnit === 'pcs') {
    if (weightInputGroup) weightInputGroup.classList.remove('hidden');
    
    if (categoryVal === 'Fruits') {
      if (helperNote) {
        helperNote.classList.remove('hidden');
        const weightInput = document.getElementById('custom-piece-weight-input');
        const pieceWeight = Number(weightInput.value) || 150;
        const determinedWeight = Math.round(amount * pieceWeight);
        
        document.getElementById('fruit-determined-weight').textContent = `${determinedWeight}g`;
        document.getElementById('fruit-avg-weight').textContent = `${pieceWeight}g`;
      }
    } else {
      if (helperNote) helperNote.classList.add('hidden');
    }
  } else {
    if (weightInputGroup) weightInputGroup.classList.add('hidden');
    if (helperNote) helperNote.classList.add('hidden');
  }
}

// Fetch nutrient estimations using the Gemini AI endpoint directly
async function fetchGeminiEstimate(query) {
  if (!state.geminiApiKey) {
    alert("Please enter a Gemini API Key in the Sync Settings drawer to enable AI nutrition estimation.");
    document.getElementById('sync-drawer-overlay').classList.add('open');
    return;
  }

  showLoader(`AI is estimating "${query}"...`);

  const systemInstruction = `You are a clinical nutritionist. Given a food description, analyze it and estimate its nutritional values. Output ONLY a valid JSON object matching this exact structure, no markdown wrappers, no other text:
{
  "name": "Clean name of food (capitalized, e.g. Golden Kiwi)",
  "category": "Custom",
  "calories": 0,          // kcal (normalized: per 100g for 'g', per 100ml for 'ml', or per 1 piece for 'pcs')
  "protein": 0.0,         // grams (per 100g/ml or per 1 piece)
  "carbs": 0.0,           // grams (per 100g/ml or per 1 piece)
  "fat": 0.0,             // grams (per 100g/ml or per 1 piece)
  "vitA": 0,              // mcg RAE (per 100g/ml or per 1 piece)
  "iron": 0.0,            // mg (per 100g/ml or per 1 piece)
  "vitD": 0.0,            // mcg (per 100g/ml or per 1 piece)
  "calcium": 0,           // mg (per 100g/ml or per 1 piece)
  "potassium": 0,         // mg (per 100g/ml or per 1 piece)
  "magnesium": 0,         // mg (per 100g/ml or per 1 piece)
  "vitB12": 0.0,          // mcg (per 100g/ml or per 1 piece)
  "folate": 0,            // mcg (per 100g/ml or per 1 piece)
  "defaultServing": 100,  // typical serving size number (e.g. 100 for grams, 1 for pcs)
  "unit": "g"             // unit string, must be exactly "g", "ml", or "pcs"
}`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${state.geminiApiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: systemInstruction },
            { text: `Analyze this food entry: "${query}"` }
          ]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API response error HTTP ${response.status}`);
    }

    const json = await response.json();
    let text = json.candidates[0].content.parts[0].text.trim();
    
    // Robustly strip markdown code blocks if present
    if (text.includes("```")) {
      text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
    }

    const estimatedFood = JSON.parse(text);
    
    if (!estimatedFood.name || typeof estimatedFood.calories !== 'number') {
      throw new Error("Parsed object is missing required fields.");
    }

    state.selectedFoodForLogging = estimatedFood;
    
    document.getElementById('food-search-input').value = estimatedFood.name;
    document.getElementById('food-amount-input').value = estimatedFood.defaultServing;
    document.getElementById('amount-unit-label').textContent = estimatedFood.unit;
    
    setManualNutrientEditMode(false);
    updateNutritionLogPreview();
    
    document.getElementById('search-ai-action-row').classList.add('hidden');
    
  } catch (err) {
    console.error("Gemini estimation error:", err);
    alert(`AI failed to estimate. You can input the values manually by clicking the 'Edit Manually' button.\nError: ${err.message}`);
  } finally {
    hideLoader();
  }
}

/* ==========================================================================
   UI Event Handlers & Drawers
   ========================================================================== */

function setupEventHandlers() {
  document.getElementById('tab-dashboard-btn').addEventListener('click', () => switchTab('dashboard'));
  document.getElementById('tab-history-btn').addEventListener('click', () => switchTab('history'));

  // Accordion Toggle
  const accordionTrigger = document.getElementById('micro-accordion-trigger');
  const accordionContent = document.getElementById('micro-accordion-content');
  if (accordionTrigger && accordionContent) {
    accordionTrigger.addEventListener('click', () => {
      const isExpanded = accordionTrigger.getAttribute('aria-expanded') === 'true';
      accordionTrigger.setAttribute('aria-expanded', !isExpanded);
      accordionContent.classList.toggle('hidden');
    });
  }

  // Tooltip popup trigger for Gemini API key instructions
  const tooltipTrigger = document.getElementById('api-key-help-btn');
  const tooltipContent = document.getElementById('api-key-help-tooltip');
  if (tooltipTrigger && tooltipContent) {
    tooltipTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      tooltipContent.classList.toggle('hidden');
    });
    document.addEventListener('click', () => {
      tooltipContent.classList.add('hidden');
    });
    tooltipContent.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent closing tooltip on click inside
    });
  }

  // Profile Drawer
  const profileDrawer = document.getElementById('profile-drawer-overlay');
  document.getElementById('profile-settings-btn').addEventListener('click', () => {
    profileDrawer.classList.add('open');
  });
  document.getElementById('close-profile-btn').addEventListener('click', () => {
    profileDrawer.classList.remove('open');
  });

  // Sync Drawer
  const syncDrawer = document.getElementById('sync-drawer-overlay');
  document.getElementById('sync-settings-btn').addEventListener('click', () => {
    syncDrawer.classList.add('open');
  });
  document.getElementById('close-sync-btn').addEventListener('click', () => {
    syncDrawer.classList.remove('open');
  });

  // Add Food Modal
  const addModal = document.getElementById('add-food-modal-overlay');
  document.getElementById('open-add-food-btn').addEventListener('click', () => {
    document.getElementById('add-food-form').reset();
    setSelectUnit('g');
    state.selectedFoodForLogging = null;
    document.getElementById('search-ai-action-row').classList.add('hidden');
    document.getElementById('custom-piece-weight-group').classList.add('hidden');
    document.getElementById('fruit-helper-note').classList.add('hidden');
    setManualNutrientEditMode(false);
    updateNutritionLogPreview();
    updateFavoriteButtonState(null);
    renderQuickAddChips();
    addModal.classList.add('open');
    setTimeout(() => document.getElementById('food-search-input').focus(), 100);
  });

  // Favorite toggle (works for a selected DB food, or a manually-typed custom name)
  document.getElementById('toggle-favorite-btn').addEventListener('click', () => {
    const nameSource = state.selectedFoodForLogging
      ? state.selectedFoodForLogging.name
      : document.getElementById('food-search-input').value.trim();
    if (!nameSource) return;

    const key = nameSource.toLowerCase();
    const idx = state.favorites.indexOf(key);
    if (idx >= 0) {
      state.favorites.splice(idx, 1);
    } else {
      state.favorites.push(key);
    }
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify(state.favorites));
    updateFavoriteButtonState(nameSource);
    renderQuickAddChips();
  });

  // Hydration: add a cup beyond the default target
  document.getElementById('water-add-extra-btn').addEventListener('click', () => {
    setWaterForDate(state.selectedDate, getWaterForDate(state.selectedDate) + 1);
    renderWaterTracker();
  });
  
  const closeModal = () => {
    addModal.classList.remove('open');
    document.getElementById('autocomplete-results').classList.add('hidden');
    document.getElementById('search-ai-action-row').classList.add('hidden');
  };
  
  document.getElementById('close-add-food-btn').addEventListener('click', closeModal);
  document.getElementById('cancel-add-food-btn').addEventListener('click', closeModal);

  // Close overlays
  profileDrawer.addEventListener('click', (e) => {
    if (e.target === profileDrawer) profileDrawer.classList.remove('open');
  });
  syncDrawer.addEventListener('click', (e) => {
    if (e.target === syncDrawer) syncDrawer.classList.remove('open');
  });
  addModal.addEventListener('click', (e) => {
    if (e.target === addModal) closeModal();
  });

  // Date Shift
  document.getElementById('prev-date-btn').addEventListener('click', () => shiftSelectedDate(-1));
  document.getElementById('next-date-btn').addEventListener('click', () => shiftSelectedDate(1));

  // Meal Filters
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.mealFilter = chip.dataset.filter;
      renderDashboard();
    });
  });

  // Live profile target preview updates
  const profileInputs = ['profile-age', 'profile-weight', 'profile-height', 'profile-activity'];
  profileInputs.forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
      const femaleChecked = document.getElementById('profile-sex-female').checked;
      const tempProfile = {
        sex: femaleChecked ? 'Female' : 'Male',
        age: Number(document.getElementById('profile-age').value) || 0,
        weight: Number(document.getElementById('profile-weight').value) || 0,
        height: Number(document.getElementById('profile-height').value) || 0,
        activity: Number(document.getElementById('profile-activity').value) || 1.2
      };
      
      let bmr = 0;
      if (tempProfile.sex === 'Male') {
        bmr = 10 * tempProfile.weight + 6.25 * tempProfile.height - 5 * tempProfile.age + 5;
      } else {
        bmr = 10 * tempProfile.weight + 6.25 * tempProfile.height - 5 * tempProfile.age - 161;
      }
      const calories = Math.max(1200, Math.round(bmr * Number(tempProfile.activity)));
      const protein = Math.round((calories * 0.20) / 4);
      const carbs = Math.round((calories * 0.50) / 4);
      const fat = Math.round((calories * 0.30) / 9);

      document.getElementById('calc-calories-preview').textContent = calories;
      document.getElementById('calc-protein-preview').textContent = `${protein}g`;
      document.getElementById('calc-carbs-preview').textContent = `${carbs}g`;
      document.getElementById('calc-fat-preview').textContent = `${fat}g`;
    });
  });

  document.getElementById('profile-sex-female').addEventListener('change', () => document.getElementById('profile-age').dispatchEvent(new Event('input')));
  document.getElementById('profile-sex-male').addEventListener('change', () => document.getElementById('profile-age').dispatchEvent(new Event('input')));

  // Profile Form submit
  document.getElementById('profile-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const femaleChecked = document.getElementById('profile-sex-female').checked;
    
    state.profile = {
      sex: femaleChecked ? 'Female' : 'Male',
      age: Number(document.getElementById('profile-age').value),
      weight: Number(document.getElementById('profile-weight').value),
      height: Number(document.getElementById('profile-height').value),
      activity: document.getElementById('profile-activity').value
    };

    localStorage.setItem(KEYS.PROFILE, JSON.stringify(state.profile));
    
    showLoader("Saving profile details...");
    await saveProfileToSheet(state.profile);
    updateTargets();
    renderDashboard();
    hideLoader();

    profileDrawer.classList.remove('open');
  });

  // Sync settings form submit (now saving the Gemini API Key too)
  document.getElementById('sync-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('apps-script-url').value.trim();
    const geminiKey = document.getElementById('gemini-api-key').value.trim();
    
    state.scriptUrl = url;
    localStorage.setItem(KEYS.SCRIPT_URL, url);

    state.geminiApiKey = geminiKey;
    localStorage.setItem(KEYS.GEMINI_KEY, geminiKey);

    showLoader("Syncing Database...");
    if (url) {
      updateSyncIndicator(true);
      await initDatabase();
      await syncProfile();
      await syncLogs();
      updateSyncIndicator(true);
    } else {
      updateSyncIndicator(false);
    }
    
    updateTargets();
    renderDashboard();
    renderCalendar();
    hideLoader();
    syncDrawer.classList.remove('open');
  });

  // Autocomplete key entry
  document.getElementById('food-search-input').addEventListener('input', (e) => {
    handleAutocompleteSearch(e.target.value.trim());
  });

  // Ask AI Estimate Button Click
  document.getElementById('ask-ai-estimate-btn').addEventListener('click', () => {
    const query = document.getElementById('food-search-input').value.trim();
    if (query) {
      fetchGeminiEstimate(query);
    }
  });

  // Manual override toggle button
  document.getElementById('edit-nutrients-toggle-btn').addEventListener('click', () => {
    setManualNutrientEditMode(!state.isManualNutrientEdit);
  });

  // Recalculate preview on quantity change
  document.getElementById('food-amount-input').addEventListener('input', () => {
    updateNutritionLogPreview();
  });

  // Recalculate on unit change - show/hide piece weight group
  document.getElementById('amount-unit-label').addEventListener('change', () => {
    const selectedUnit = document.getElementById('amount-unit-label').value;
    const customWeightGroup = document.getElementById('custom-piece-weight-group');
    if (selectedUnit === 'pcs') {
      customWeightGroup.classList.remove('hidden');
      // Pre-fill piece weight from selected food or default
      const food = state.selectedFoodForLogging;
      const weightInput = document.getElementById('custom-piece-weight-input');
      if (food) weightInput.value = getWeightPerPiece(food);
    } else {
      customWeightGroup.classList.add('hidden');
      document.getElementById('fruit-helper-note').classList.add('hidden');
    }
    updateNutritionLogPreview();
  });

  // Recalculate on category change
  document.getElementById('food-category-input').addEventListener('change', () => {
    updateNutritionLogPreview();
  });

  // Recalculate on custom piece weight change
  document.getElementById('custom-piece-weight-input').addEventListener('input', () => {
    updateNutritionLogPreview();
  });

  // Force-sync database button
  document.getElementById('force-sync-db-btn').addEventListener('click', async () => {
    // Always update local storage with the latest seed
    const seedNames = new Set(LOCAL_FOOD_DATABASE_SEED.map(f => f.name.toLowerCase()));
    state.foodDatabase = state.foodDatabase.map(f => {
      if (seedNames.has(f.name.toLowerCase())) {
        const seedVersion = LOCAL_FOOD_DATABASE_SEED.find(s => s.name.toLowerCase() === f.name.toLowerCase());
        return seedVersion ? { ...seedVersion } : f;
      }
      return f;
    });
    LOCAL_FOOD_DATABASE_SEED.forEach(seedFood => {
      const exists = state.foodDatabase.some(f => f.name.toLowerCase() === seedFood.name.toLowerCase());
      if (!exists) state.foodDatabase.push(seedFood);
    });
    localStorage.setItem(KEYS.FOOD_DB, JSON.stringify(state.foodDatabase));

    if (state.scriptUrl) {
      showLoader('Syncing food database with Google Sheets...');
      try {
        const response = await fetch(state.scriptUrl, {
          method: 'POST',
          body: JSON.stringify({ action: 'sync_food_database', data: {} })
        });
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          state.foodDatabase = result.data;
          localStorage.setItem(KEYS.FOOD_DB, JSON.stringify(state.foodDatabase));
        }
        hideLoader();
        alert('✓ Food database updated successfully!');
      } catch (err) {
        hideLoader();
        console.error('Error syncing food database:', err);
        alert('Local database updated. Could not reach Google Sheets — it will sync next time you connect.');
      }
    } else {
      alert('✓ Local food database updated to latest values!');
    }
  });

  // Recalculate previews on manual edits change (updates bars in real-time)
  const manualInputIds = ['preview-food-cal-input', 'preview-food-protein-input', 'preview-food-carbs-input', 'preview-food-fat-input', 'preview-food-vitA-input', 'preview-food-iron-input', 'preview-food-vitD-input', 'preview-food-calcium-input', 'preview-food-potassium-input', 'preview-food-magnesium-input', 'preview-food-vitB12-input', 'preview-food-folate-input'];
  manualInputIds.forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
      updateNutritionLogPreview();
    });
  });

  // Add Log form submit
  document.getElementById('add-food-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const amountVal = Number(document.getElementById('food-amount-input').value);
    const mealTypeVal = document.getElementById('food-meal-type').value;

    if (state.isManualNutrientEdit) {
      // Force locking to save manual values into state.selectedFoodForLogging
      setManualNutrientEditMode(false);
    }

    const selectedUnit = document.getElementById('amount-unit-label').value;
    if (!state.selectedFoodForLogging) {
      // If user typed a custom food name and didn't select or use AI, create manual item
      const customName = document.getElementById('food-search-input').value.trim() || "Custom Item";
      const categoryVal = document.getElementById('food-category-input').value || "Custom";
      state.selectedFoodForLogging = {
        name: customName,
        category: categoryVal,
        calories: 0, protein: 0, carbs: 0, fat: 0,
        vitA: 0, iron: 0, vitD: 0, calcium: 0, potassium: 0, magnesium: 0, vitB12: 0, folate: 0,
        defaultServing: amountVal,
        unit: selectedUnit
      };
    }

    const food = state.selectedFoodForLogging;
    const multiplier = getMultiplier(food, amountVal, selectedUnit);

    // Build log payload
    const newLog = {
      date: state.selectedDate,
      mealType: mealTypeVal,
      foodName: food.name,
      amount: amountVal,
      unit: food.unit,
      calories: Math.round(food.calories * multiplier),
      protein: Math.round(food.protein * multiplier * 10) / 10,
      carbs: Math.round(food.carbs * multiplier * 10) / 10,
      fat: Math.round(food.fat * multiplier * 10) / 10,
      vitA: Math.round((food.vitA || 0) * multiplier),
      iron: Math.round((food.iron || 0) * multiplier * 10) / 10,
      vitD: Math.round((food.vitD || 0) * multiplier * 10) / 10,
      calcium: Math.round((food.calcium || 0) * multiplier),
      potassium: Math.round((food.potassium || 0) * multiplier),
      magnesium: Math.round((food.magnesium || 0) * multiplier),
      vitB12: Math.round((food.vitB12 || 0) * multiplier * 10) / 10,
      folate: Math.round((food.folate || 0) * multiplier)
    };

    showLoader("Logging consumption...");
    
    // 1. Add log to sheet
    const success = await addLogToSheet(newLog);

    if (success) {
      newLog.timestamp = new Date().toISOString();
      state.logs.push(newLog);
      localStorage.setItem(KEYS.LOGS, JSON.stringify(state.logs));
      
      // 2. Add custom food to search database (if it is a newly learned item)
      const existsInDb = state.foodDatabase.some(f => f.name.toLowerCase() === food.name.toLowerCase());
      if (!existsInDb) {
        state.foodDatabase.push(food);
        localStorage.setItem(KEYS.FOOD_DB, JSON.stringify(state.foodDatabase));
        // Push it to Google Sheets FoodDatabase tab
        await addFoodToSheetDatabase(food);
      }

      closeModal();
      renderDashboard();
      renderCalendar();
    } else {
      alert("Failed to log food entry to Google Sheets.");
    }
    hideLoader();
  });

  // Calendar month buttons
  document.getElementById('prev-month-btn').addEventListener('click', () => shiftCalendarMonth(-1));
  document.getElementById('next-month-btn').addEventListener('click', () => shiftCalendarMonth(1));

  // Calendar view full day
  document.getElementById('go-to-selected-day-btn').addEventListener('click', () => {
    switchTab('dashboard');
    updateDateDisplay();
    renderDashboard();
  });
}

function shiftSelectedDate(daysOffset) {
  const current = new Date(state.selectedDate + "T00:00:00");
  current.setDate(current.getDate() + daysOffset);
  state.selectedDate = getFormattedDate(current);

  updateDateDisplay();
  renderDashboard();

  if (state.activeTab === 'history') {
    state.calendarYear = current.getFullYear();
    state.calendarMonth = current.getMonth();
    renderCalendar();
  }
}

function shiftCalendarMonth(offset) {
  state.calendarMonth += offset;
  if (state.calendarMonth > 11) {
    state.calendarMonth = 0;
    state.calendarYear += 1;
  } else if (state.calendarMonth < 0) {
    state.calendarMonth = 11;
    state.calendarYear -= 1;
  }
  renderCalendar();
}

function updateDateDisplay() {
  const dateObj = new Date(state.selectedDate + "T00:00:00");
  const todayObj = new Date();
  
  const dateStr = getFormattedDate(dateObj);
  const todayStr = getFormattedDate(todayObj);

  const displaySpan = document.getElementById('current-date-display');
  
  if (dateStr === todayStr) {
    displaySpan.textContent = "Today";
  } else {
    displaySpan.textContent = dateObj.toLocaleDateString(undefined, {
      weekday: 'short', month: 'short', day: 'numeric'
    });
  }
}

/* ==========================================================================
   Helper Utilities
   ========================================================================== */

function getFormattedDate(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showLoader(message) {
  const loader = document.getElementById('global-loader');
  const msgText = document.getElementById('loader-message');
  msgText.textContent = message;
  loader.classList.remove('hidden');
}

function hideLoader() {
  const loader = document.getElementById('global-loader');
  loader.classList.add('hidden');
}
