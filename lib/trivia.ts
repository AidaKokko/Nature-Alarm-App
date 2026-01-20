export type TriviaCategory = 'health' | 'nature' | 'emotion';
export type TriviaItem = {
  category: TriviaCategory;
  timeLabel: string;
  question: string;
  prompt: 'why' | 'what' | 'how';
  answer: string;
};

export const triviaItems: TriviaItem[] = [
  {
    category: 'health',
    timeLabel: '08:00 AM',
    question: "DON'T YOU KNOW THAT JUST EATING CARROTS WON'T IMPROVE YOUR EXISTING EYESIGHT?",
    prompt: 'why',
    answer:
      'While carrots do contain a nutrient called beta-carotene that is good for the eyes, eating them will not improve existing eyesight. Nature and exposure to natural light play vital roles in enhancing vision and reducing risks like digital eye strain and myopia progression.',
  },
  {
    category: 'nature',
    timeLabel: '12:30 PM',
    question: 'DO YOU KNOW WHAT SITTING INDOORS ALL DAY DOES TO YOUR BRAIN?',
    prompt: 'what',
    answer:
      'Spending too long indoors can increase stress and make it harder to focus. A short walk outside helps reset your mind.',
  },
  {
    category: 'emotion',
    timeLabel: '06:30 PM',
    question: 'DID YOU KNOW A 10-MINUTE WALK CAN LIFT YOUR MOOD?',
    prompt: 'how',
    answer:
      'Short walks can reduce stress hormones and boost endorphins, helping you feel calmer and more positive.',
  },
];

export function getRandomTrivia(category?: TriviaCategory): TriviaItem {
  const pool = category ? triviaItems.filter((t) => t.category === category) : triviaItems;
  const list = pool.length > 0 ? pool : triviaItems;
  const idx = Math.floor(Math.random() * list.length);
  return list[idx];
}
