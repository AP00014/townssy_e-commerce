/**
 * Personalization Utility
 * Manages user preferences and tailored content recommendations
 */

// Fisher-Yates shuffle algorithm for randomizing arrays
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get personalized selections based on user preferences
export const getPersonalizedSelections = (allSelections, count = 4) => {
  // Check if we have user preferences stored
  const userPreferences = getUserPreferences();

  if (userPreferences && userPreferences.length > 0) {
    // Sort selections based on user preferences
    const scored = allSelections.map((selection) => ({
      ...selection,
      score: calculatePreferenceScore(selection, userPreferences),
    }));

    // Sort by score (highest first)
    const sorted = scored.sort((a, b) => b.score - a.score);
    
    // Take top 8 items (more than needed for variety)
    const topItems = sorted.slice(0, Math.min(8, allSelections.length));
    
    // Shuffle the top items and take the count needed
    const shuffled = shuffleArray(topItems);
    return shuffled
      .slice(0, count)
      .map(({ score, ...selection }) => selection);
  }

  // If no preferences, return random selections (always shuffled)
  return shuffleArray(allSelections).slice(0, count);
};

// Calculate preference score for a selection based on user history
const calculatePreferenceScore = (selection, preferences) => {
  let score = 0;

  // Check if category matches user's browsing history
  if (preferences.categories?.includes(selection.category)) {
    score += 10;
  }

  // Check if slug matches viewed items
  if (preferences.viewedSlugs?.includes(selection.slug)) {
    score += 5;
  }

  // Check recent interactions (higher weight)
  if (preferences.recentCategories?.includes(selection.category)) {
    score += 15;
  }

  // Add significant randomness to ensure variation on each refresh
  // This makes it so even preferred items won't always appear
  score += Math.random() * 20; // Increased from 3 to 20 for more variation

  return score;
};

// Get user preferences from localStorage
export const getUserPreferences = () => {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem("userPreferences");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Error reading user preferences:", error);
    return null;
  }
};

// Save user preferences to localStorage
export const saveUserPreferences = (preferences) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
  } catch (error) {
    console.error("Error saving user preferences:", error);
  }
};

// Track user interaction (view, click, etc.)
export const trackInteraction = (type, data) => {
  const preferences = getUserPreferences() || {
    categories: [],
    viewedSlugs: [],
    recentCategories: [],
    interactions: [],
  };

  const timestamp = Date.now();

  switch (type) {
    case "view_category":
      // Add to categories if not already present
      if (!preferences.categories.includes(data.category)) {
        preferences.categories.push(data.category);
      }

      // Add to recent categories (keep last 5)
      preferences.recentCategories = [
        data.category,
        ...preferences.recentCategories.filter((c) => c !== data.category),
      ].slice(0, 5);

      // Track slug
      if (data.slug && !preferences.viewedSlugs.includes(data.slug)) {
        preferences.viewedSlugs.push(data.slug);
      }
      break;

    case "view_product":
      // Track product views
      if (data.category && !preferences.categories.includes(data.category)) {
        preferences.categories.push(data.category);
      }
      break;

    case "click_selection":
      // Track when user clicks a tailored selection
      preferences.interactions.push({
        type: "click_selection",
        slug: data.slug,
        category: data.category,
        timestamp,
      });

      // Keep only last 50 interactions
      preferences.interactions = preferences.interactions.slice(-50);
      break;

    default:
      break;
  }

  saveUserPreferences(preferences);
};

// Clear user preferences (for testing or user request)
export const clearUserPreferences = () => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem("userPreferences");
  } catch (error) {
    console.error("Error clearing user preferences:", error);
  }
};

// Get preference insights (for debugging/analytics)
export const getPreferenceInsights = () => {
  const preferences = getUserPreferences();

  if (!preferences) {
    return {
      hasPreferences: false,
      totalCategories: 0,
      totalViewed: 0,
      totalInteractions: 0,
    };
  }

  return {
    hasPreferences: true,
    totalCategories: preferences.categories?.length || 0,
    totalViewed: preferences.viewedSlugs?.length || 0,
    totalInteractions: preferences.interactions?.length || 0,
    recentCategories: preferences.recentCategories || [],
    topCategories: getTopCategories(preferences),
  };
};

// Get top categories based on interactions
const getTopCategories = (preferences) => {
  if (!preferences.interactions) return [];

  const categoryCounts = {};

  preferences.interactions.forEach((interaction) => {
    if (interaction.category) {
      categoryCounts[interaction.category] =
        (categoryCounts[interaction.category] || 0) + 1;
    }
  });

  return Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([category, count]) => ({ category, count }));
};

// Initialize preferences on first visit
export const initializePreferences = () => {
  const existing = getUserPreferences();

  if (!existing) {
    saveUserPreferences({
      categories: [],
      viewedSlugs: [],
      recentCategories: [],
      interactions: [],
      createdAt: Date.now(),
    });
  }
};
