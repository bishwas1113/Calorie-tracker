// Google Apps Script for Japandi Calorie Tracker
// Deploy this script as a Web App:
// 1. Open Google Sheets.
// 2. Click Extensions > Apps Script.
// 3. Paste this code.
// 4. Click 'Deploy' > 'New deployment'.
// 5. Select type: 'Web app'.
// 6. Execute as: 'Me' (your email).
// 7. Who has access: 'Anyone'.
// 8. Deploy, authorize permissions, and copy the Web App URL.

const SHEET_PROFILE = "UserProfile";
const SHEET_LOG = "DailyLog";
const SHEET_DATABASE = "FoodDatabase";

// Comprehensive database of common raw ingredients and cooked dishes
// Nutritional info compiled from USDA (FDC) and common nutritional guidelines
// Basic foods normalized to per 100g/ml. Custom pieces normalized per 1 piece.
// Micronutrients tracked: vitA (mcg), iron (mg), vitD (mcg), calcium (mg), potassium (mg), magnesium (mg), vitB12 (mcg), folate (mcg)
const FOOD_DATABASE_SEED = [
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
    "unit": "pcs"
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
    "unit": "pcs"
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
    "unit": "pcs"
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
    "unit": "pcs"
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
    "unit": "pcs"
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
]

// Initialize and set up sheets
function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. User Profile Sheet
  let profileSheet = ss.getSheetByName(SHEET_PROFILE);
  if (!profileSheet) {
    profileSheet = ss.insertSheet(SHEET_PROFILE);
    profileSheet.appendRow(["Sex", "Weight (kg)", "Height (cm)", "Age", "Activity Level"]);
    profileSheet.appendRow(["Female", "60", "165", "30", "1.375"]); // Default profile row
    profileSheet.getRange(1, 1, 1, 5).setFontWeight("bold");
  }

  // 2. Daily Log Sheet
  let logSheet = ss.getSheetByName(SHEET_LOG);
  if (!logSheet) {
    logSheet = ss.insertSheet(SHEET_LOG);
    logSheet.appendRow([
      "Date", "Meal Type", "Food Name", "Amount", "Unit", "Calories", 
      "Protein (g)", "Carbs (g)", "Fat (g)", 
      "Vitamin A (mcg)", "Iron (mg)", "Vitamin D (mcg)", "Calcium (mg)", 
      "Potassium (mg)", "Magnesium (mg)", "Vitamin B12 (mcg)", "Folate (mcg)",
      "Timestamp"
    ]);
    logSheet.getRange(1, 1, 1, 18).setFontWeight("bold");
  }

  // 3. Food Database Sheet
  let dbSheet = ss.getSheetByName(SHEET_DATABASE);
  if (!dbSheet) {
    dbSheet = ss.insertSheet(SHEET_DATABASE);
    dbSheet.appendRow([
      "Food Name", "Category", "Calories (per 100g/ml or pcs)", "Protein (g)", "Carbs (g)", "Fat (g)", 
      "Vitamin A (mcg)", "Iron (mg)", "Vitamin D (mcg)", "Calcium (mg)", 
      "Potassium (mg)", "Magnesium (mg)", "Vitamin B12 (mcg)", "Folate (mcg)",
      "Default Serving Size", "Serving Unit"
    ]);
    dbSheet.getRange(1, 1, 1, 16).setFontWeight("bold");
    
    // Seed database
    const rows = FOOD_DATABASE_SEED.map(f => [
      f.name,
      f.category,
      f.calories,
      f.protein,
      f.carbs,
      f.fat,
      f.vitA,
      f.iron,
      f.vitD,
      f.calcium,
      f.potassium,
      f.magnesium,
      f.vitB12,
      f.folate,
      f.defaultServing,
      f.unit
    ]);
    dbSheet.getRange(2, 1, rows.length, 16).setValues(rows);
  }
}

// Helper to construct JSON response (handling CORS redirecting)
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// Handles HTTP GET Requests
function doGet(e) {
  setupSheets();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const action = e.parameter.action;

  try {
    if (action === "get_profile") {
      const sheet = ss.getSheetByName(SHEET_PROFILE);
      const data = sheet.getRange(2, 1, 1, 5).getValues()[0];
      return jsonResponse({
        success: true,
        data: {
          sex: data[0],
          weight: Number(data[1]),
          height: Number(data[2]),
          age: Number(data[3]),
          activity: Number(data[4] || 1.375)
        }
      });
    }

    if (action === "get_food_database") {
      const sheet = ss.getSheetByName(SHEET_DATABASE);
      const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 16).getValues();
      const foods = rows.map(r => ({
        name: r[0],
        category: r[1],
        calories: Number(r[2]),
        protein: Number(r[3]),
        carbs: Number(r[4]),
        fat: Number(r[5]),
        vitA: Number(r[6]),
        iron: Number(r[7]),
        vitD: Number(r[8]),
        calcium: Number(r[9]),
        potassium: Number(r[10]),
        magnesium: Number(r[11]),
        vitB12: Number(r[12]),
        folate: Number(r[13]),
        defaultServing: Number(r[14]),
        unit: r[15]
      }));
      return jsonResponse({ success: true, data: foods });
    }

    if (action === "get_logs") {
      const sheet = ss.getSheetByName(SHEET_LOG);
      const lastRow = sheet.getLastRow();
      if (lastRow <= 1) {
        return jsonResponse({ success: true, data: [] });
      }

      const rows = sheet.getRange(2, 1, lastRow - 1, 18).getValues();
      const logs = rows.map(r => ({
        date: r[0], // Date string
        mealType: r[1],
        foodName: r[2],
        amount: Number(r[3]),
        unit: r[4],
        calories: Number(r[5]),
        protein: Number(r[6]),
        carbs: Number(r[7]),
        fat: Number(r[8]),
        vitA: Number(r[9]),
        iron: Number(r[10]),
        vitD: Number(r[11]),
        calcium: Number(r[12]),
        potassium: Number(r[13]),
        magnesium: Number(r[14]),
        vitB12: Number(r[15]),
        folate: Number(r[16]),
        timestamp: r[17]
      }));

      // Filter by date if requested
      const filterDate = e.parameter.date; // e.g. "YYYY-MM-DD"
      if (filterDate) {
        const filtered = logs.filter(log => {
          let logDateStr = "";
          if (log.date instanceof Date) {
            logDateStr = log.date.toISOString().split("T")[0];
          } else {
            logDateStr = String(log.date).split("T")[0];
          }
          return logDateStr === filterDate;
        });
        return jsonResponse({ success: true, data: filtered });
      }

      return jsonResponse({ success: true, data: logs });
    }

    return jsonResponse({ success: false, error: "Invalid GET action: " + action });
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

// Handles HTTP POST Requests
function doPost(e) {
  setupSheets();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    let postData;
    if (e.postData && e.postData.contents) {
      postData = JSON.parse(e.postData.contents);
    } else {
      // Fallback for form parameters
      postData = {
        action: e.parameter.action,
        data: JSON.parse(e.parameter.data || "{}")
      };
    }

    const action = postData.action;
    const data = postData.data;

    if (action === "save_profile") {
      const sheet = ss.getSheetByName(SHEET_PROFILE);
      sheet.getRange(2, 1, 1, 5).setValues([[
        data.sex,
        Number(data.weight),
        Number(data.height),
        Number(data.age),
        Number(data.activity)
      ]]);
      return jsonResponse({ success: true, message: "Profile saved successfully." });
    }

    if (action === "add_log") {
      const sheet = ss.getSheetByName(SHEET_LOG);
      const timestamp = new Date().toISOString();
      sheet.appendRow([
        data.date, // YYYY-MM-DD
        data.mealType,
        data.foodName,
        Number(data.amount),
        data.unit,
        Number(data.calories),
        Number(data.protein),
        Number(data.carbs),
        Number(data.fat),
        Number(data.vitA || 0),
        Number(data.iron || 0),
        Number(data.vitD || 0),
        Number(data.calcium || 0),
        Number(data.potassium || 0),
        Number(data.magnesium || 0),
        Number(data.vitB12 || 0),
        Number(data.folate || 0),
        timestamp
      ]);
      return jsonResponse({ success: true, message: "Food logged successfully." });
    }

    if (action === "add_food") {
      const sheet = ss.getSheetByName(SHEET_DATABASE);
      const lastRow = sheet.getLastRow();
      let exists = false;
      if (lastRow > 1) {
        const rows = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
        exists = rows.some(r => String(r[0]).toLowerCase() === String(data.name).toLowerCase());
      }
      if (!exists) {
        sheet.appendRow([
          data.name,
          data.category || "Custom",
          Number(data.calories || 0),
          Number(data.protein || 0),
          Number(data.carbs || 0),
          Number(data.fat || 0),
          Number(data.vitA || 0),
          Number(data.iron || 0),
          Number(data.vitD || 0),
          Number(data.calcium || 0),
          Number(data.potassium || 0),
          Number(data.magnesium || 0),
          Number(data.vitB12 || 0),
          Number(data.folate || 0),
          Number(data.defaultServing || 100),
          data.unit || "g"
        ]);
        return jsonResponse({ success: true, message: "Food added to database sheet successfully." });
      }
      return jsonResponse({ success: true, message: "Food already exists in database sheet." });
    }

    if (action === "delete_log") {
      // Allows deleting a log by matching food name, meal type, date, and timestamp
      const sheet = ss.getSheetByName(SHEET_LOG);
      const lastRow = sheet.getLastRow();
      if (lastRow <= 1) return jsonResponse({ success: false, error: "No logs found" });

      const rows = sheet.getRange(2, 1, lastRow - 1, 18).getValues();
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        let rowDate = row[0] instanceof Date ? row[0].toISOString().split("T")[0] : String(row[0]).split("T")[0];
        if (
          rowDate === data.date &&
          row[1] === data.mealType &&
          row[2] === data.foodName &&
          row[17] === data.timestamp
        ) {
          sheet.deleteRow(i + 2); // 1-indexed, and header is row 1
          return jsonResponse({ success: true, message: "Log deleted successfully." });
        }
      }
      return jsonResponse({ success: false, error: "Log entry not found." });
    }

    if (action === "sync_food_database") {
      // Smart sync: update seed items to latest values, preserve custom items
      const sheet = ss.getSheetByName(SHEET_DATABASE);
      const lastRow = sheet.getLastRow();
      
      // Build map of seed items by name (lowercase) for quick lookup
      const seedByName = {};
      FOOD_DATABASE_SEED.forEach(f => { seedByName[f.name.toLowerCase()] = f; });
      
      // Read existing rows
      const existingRows = lastRow > 1
        ? sheet.getRange(2, 1, lastRow - 1, 16).getValues()
        : [];
      
      const seedNames = new Set(FOOD_DATABASE_SEED.map(f => f.name.toLowerCase()));
      const existingNames = new Set(existingRows.map(r => String(r[0]).toLowerCase()));
      
      // Update existing seed rows in-place
      for (let i = 0; i < existingRows.length; i++) {
        const rowName = String(existingRows[i][0]).toLowerCase();
        if (seedByName[rowName]) {
          const f = seedByName[rowName];
          sheet.getRange(i + 2, 1, 1, 16).setValues([[
            f.name, f.category, f.calories, f.protein, f.carbs, f.fat,
            f.vitA, f.iron, f.vitD, f.calcium, f.potassium, f.magnesium,
            f.vitB12, f.folate, f.defaultServing, f.unit
          ]]);
        }
      }
      
      // Append any new seed items not yet in the sheet
      FOOD_DATABASE_SEED.forEach(f => {
        if (!existingNames.has(f.name.toLowerCase())) {
          sheet.appendRow([
            f.name, f.category, f.calories, f.protein, f.carbs, f.fat,
            f.vitA, f.iron, f.vitD, f.calcium, f.potassium, f.magnesium,
            f.vitB12, f.folate, f.defaultServing, f.unit
          ]);
        }
      });
      
      // Return updated database
      const updatedLastRow = sheet.getLastRow();
      if (updatedLastRow <= 1) return jsonResponse({ success: true, data: [] });
      const updatedRows = sheet.getRange(2, 1, updatedLastRow - 1, 16).getValues();
      const foods = updatedRows.map(r => ({
        name: r[0], category: r[1],
        calories: Number(r[2]), protein: Number(r[3]), carbs: Number(r[4]), fat: Number(r[5]),
        vitA: Number(r[6]), iron: Number(r[7]), vitD: Number(r[8]), calcium: Number(r[9]),
        potassium: Number(r[10]), magnesium: Number(r[11]), vitB12: Number(r[12]), folate: Number(r[13]),
        defaultServing: Number(r[14]), unit: r[15]
      }));
      return jsonResponse({ success: true, data: foods });
    }

    return jsonResponse({ success: false, error: "Invalid POST action: " + action });
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}
