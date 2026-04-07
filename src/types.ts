export type CognitiveSkill = 'Attention' | 'Memory' | 'Executive Function' | 'Processing Speed' | 'Emotional Regulation';

export interface SkillScore {
  skill: CognitiveSkill;
  score: number; // 0-100
  description: string;
}

export interface UserProfile {
  name: string;
  scores: SkillScore[];
  lastAssessment: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export const INITIAL_SCORES: SkillScore[] = [
  { skill: 'Attention', score: 50, description: 'Ability to focus on specific tasks for extended periods.' },
  { skill: 'Memory', score: 50, description: 'Short-term and working memory capacity.' },
  { skill: 'Executive Function', score: 50, description: 'Planning, organization, and problem-solving skills.' },
  { skill: 'Processing Speed', score: 50, description: 'The time it takes to understand and react to information.' },
  { skill: 'Emotional Regulation', score: 50, description: 'Managing emotional responses to stressors.' },
];
