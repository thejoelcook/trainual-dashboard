import { MockResponse, ChatMessage } from './types';

// Sample questions for autocomplete
export const sampleQuestions = [
  'How do I set training order of content?',
  'How do I create a training path?',
  'How do I add users to my account?',
  'How do I invite new people?',
  'How do I assign content to users?',
  'What are permissions?',
  'What are permission roles?',
  'How do I view training reports?',
  'How do I check user progress?',
];

const mockResponses: MockResponse[] = [
  {
    keywords: ['training', 'path', 'create', 'order'],
    answer: 'To set the training order of content, navigate to Content > Training paths in the sidebar. Click "Create" to build a new path, then drag and drop content modules to arrange them in the sequence learners should follow. You can set prerequisites and completion targets for each step.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoTitle: 'Creating and Organizing Training Paths'
  },
  {
    keywords: ['user', 'add', 'invite', 'account', 'people'],
    answer: 'To add users to your account, go to Account > Manage Users in the sidebar. Click "Invite user" and enter their email address. You can assign roles (Admin, Manager, or Learner) based on permission levels. They\'ll receive an email invitation to join.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoTitle: 'Adding and Managing Users'
  },
  {
    keywords: ['assign', 'content', 'training'],
    answer: 'To assign content to users, select the training material from your Content library, click "Assign", then choose individuals, groups, or the entire company. Set due dates and enable notifications to track completion.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoTitle: 'Assigning Content to Your Team'
  },
  {
    keywords: ['permission', 'role', 'access'],
    answer: 'Trainual has three main permission levels: Admins can manage all aspects including people, content, and billing; Managers can assign training and view reports; Learners can only access assigned content and complete training.',
  },
  {
    keywords: ['report', 'progress', 'analytics'],
    answer: 'Access reports by going to Reports in the sidebar. You can view completion rates, time spent, quiz scores, and individual progress. Filter by user, group, or content type to analyze training effectiveness.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoTitle: 'Understanding Training Reports'
  }
];

const defaultResponse: MockResponse = {
  keywords: [],
  answer: "I'm here to help you learn Trainual! Try asking about creating training paths, adding users, assigning content, or managing permissions. You can also explore using the sidebar navigation to discover features.",
};

export function getResponseForQuestion(question: string): ChatMessage {
  const lowerQuestion = question.toLowerCase();

  // Find best matching response
  const response = mockResponses.find(r =>
    r.keywords.some(keyword => lowerQuestion.includes(keyword))
  ) || defaultResponse;

  return {
    question,
    answer: response.answer,
    videoUrl: response.videoUrl,
    videoTitle: response.videoTitle,
    timestamp: Date.now()
  };
}
