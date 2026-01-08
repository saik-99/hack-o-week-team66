import { FAQ_DATABASE } from '../constants';

/**
 * A simple rule-based matcher that checks if the user input contains
 * any of the keywords defined in the FAQ database.
 * 
 * @param query The user's input text
 * @returns The matching answer string or null if no match found
 */
export const findRuleBasedAnswer = (query: string): string | null => {
  const normalizedQuery = query.toLowerCase().trim();

  // 1. Exact or fuzzy keyword matching
  // We sort rules by specificity (optional, but good if we had tiered rules)
  // For this basic version, we just find the first rule with a matching keyword.
  
  const matchedRule = FAQ_DATABASE.find(rule => {
    return rule.keywords.some(keyword => normalizedQuery.includes(keyword.toLowerCase()));
  });

  if (matchedRule) {
    return matchedRule.answer;
  }

  // 2. Simple greetings hardcoded for better UX
  if (['hi', 'hello', 'hey', 'greetings'].some(w => normalizedQuery === w || normalizedQuery.startsWith(w + ' '))) {
    return "Hello! Welcome to TechFlow Academy. How can I help you today?";
  }

  if (['bye', 'goodbye', 'thanks', 'thank you'].some(w => normalizedQuery.includes(w))) {
    return "You're welcome! Have a great day ahead.";
  }

  return null;
};
