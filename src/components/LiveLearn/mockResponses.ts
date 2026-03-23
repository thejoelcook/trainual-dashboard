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
    keywords: ['order'],
    answer: `In Trainual, the clean way to control what comes first vs. later is to use Training Paths. It lets you curate the order someone completes assigned content and even add delays between chunks (great for onboarding).

<strong>What you can do with Training Paths</strong>
<ul><li>Set a specific order for multiple pieces of content</li><li>Force completion order within a chunk (so they can't skip ahead)</li><li>Add delays between chunks (ex: "Day 1 stuff" → "Week 2 stuff")</li></ul>`,
    videoTitle: 'Setting Training Order'
  },
  {
    keywords: ['create', 'path'],
    answer: `A Training Path lets you line up multiple pieces of content for someone, control the order, and even add delays between chunks—so onboarding doesn't feel like drinking from a firehose.

<strong>How it works (quick mental model)</strong>
<ul><li>You pick a person (the learner).</li><li>You add content in the sequence you want.</li><li>Optionally:<ul><li>Force completion order within a chunk</li><li>Add delays (ex: "assign this 7 days after they finish the first section")</li></ul></li></ul>

<strong>The usual setup steps</strong>
<ol><li>Go to the Training Paths area in Trainual.</li><li>Choose the user you're building the path for.</li><li>Add the Subjects / standalone content you want them to complete.</li><li>Organize content into chunks (ex: Week 1, Week 2).</li><li>Turn on forced order where it matters.</li><li>Add delays if you want content to unlock later.</li><li>Save—then Trainual will handle the assignment flow based on the path.</li></ol>

<strong>Notes that save headaches</strong>
<ul><li>Training Paths are great for onboarding, role training, and cross-training.</li><li>If you don't need timing or sequencing, regular assignments are simpler.</li></ul>`,
    videoUrl: 'https://www.youtube.com/embed/9ZykJ_jJPiQ?si=tch7mWZ0Mzrv7KZz',
    videoTitle: 'Creating and Organizing Training Paths'
  },
  {
    keywords: ['user', 'add', 'account'],
    answer: `You'll do this from the People area in Trainual (and since you're a Billing Admin, you should have access to user management).

<ol><li>Head to <strong>People</strong> in the left nav</li><li>Click <strong>Add people</strong> (or similar "Invite/Add users" button)</li><li>Choose how you want to add them:<ul><li>Add one person (name + email)</li><li>Bulk import (upload a list for multiple people)</li></ul></li><li>Set basics like their permission level (General, Contributor, Author, Admin, Billing Admin)</li><li>(Optional) Add them to groups (teams/roles/locations) so assignments and access can be automated</li><li>Send the invite now (or schedule it / add without inviting, if you're just setting up structure first)</li></ol>

<strong>Quick heads-up (so it behaves the way you expect)</strong>
<ul><li>If you assign content to a group, everyone in that group gets it automatically.</li><li>You can add users without inviting them yet—handy if you want to build out structure before anyone gets pinged.</li></ul>`,
    videoUrl: 'https://www.youtube.com/embed/wL51RmklM2c?si=ZbU7Ar4E1jvDezox',
    videoTitle: 'Adding Users to Your Account'
  },
  {
    keywords: ['invite', 'people', 'new'],
    answer: `To invite someone into Trainual, you'll do it from the People area (that's where users live).

<strong>The basic flow</strong>
<ol><li>Go to <strong>People</strong></li><li>Choose <strong>Add people</strong> (or Invite people)</li><li>Enter their name + work email</li><li>(Optional but recommended) Add them to the right groups (team/role/location)</li><li>Send the invite (or schedule it to send later)</li></ol>

<strong>Good-to-know</strong>
<ul><li>You can add users in bulk (handy if you're onboarding a whole crew at once).</li><li>People can be added without being invited right away if you're setting up structure first (org chart, groups, assignments, etc.).</li></ul>`,
    videoUrl: 'https://www.youtube.com/embed/wL51RmklM2c?si=ZbU7Ar4E1jvDezox',
    videoTitle: 'Inviting New People'
  },
  {
    keywords: ['assign', 'content'],
    answer: `In Trainual, assignments are what connect a person to a Subject (or standalone content) so it shows up in their training and can be tracked.

Here are the main ways teams typically do it:

<ol><li><strong>Assign to an individual user</strong><br/>Use this when one specific person needs a specific thing (like a role-specific policy or tool training).</li><li><strong>Assign to a Group</strong><br/>This is the scalable move: assign once to a team/role/department/location group and everyone in that group gets it automatically (including new people you add later).</li><li><strong>Set whether it's required + optional timing</strong><br/>Assignments can be required (must complete) or reference (nice-to-have). You can also add due dates (Trainual uses a "days after assignment" style countdown for each person).</li></ol>`,
    videoUrl: 'https://www.youtube.com/embed/rDi6CFQisOU?si=ChAXb2dPXbvgcfAv',
    videoTitle: 'Assigning Content to Users'
  },
  {
    keywords: ['permission'],
    answer: `Permissions control what a person can see and what they can do in your Trainual account—things like creating/editing content, assigning training, managing people, and viewing reports.

<strong>The permission levels (from least → most access)</strong>
<ol><li><strong>General</strong> — Can access content they're assigned (and groups they're in).</li><li><strong>Contributor</strong> — Everything in General, plus can edit existing content they're assigned to.</li><li><strong>Author</strong> — Everything in Contributor, plus can create new content and assign people.</li><li><strong>Admin</strong> — Everything in Author, plus can view reports and manage users.</li><li><strong>Billing Admin</strong> — Everything in Admin, plus can manage billing and plans.</li></ol>

<strong>Quick takeaway</strong><br/>If Trainual were a TV show: General watches, Contributor can tweak the script, Author writes episodes, Admin runs the writers' room, Billing Admin signs the checks.`,
    videoUrl: 'https://www.youtube.com/embed/JbzFIWufM1I?si=By6_5d9dQmAiXnFJ',
    videoTitle: 'Understanding Permissions'
  },
  {
    keywords: ['role'],
    answer: `In Trainual, permission roles control what someone can <em>see</em> and what they're allowed to <em>do</em>—like viewing content, editing, assigning training, or managing people.

<strong>Here are the standard permission levels:</strong>
<ol><li><strong>General</strong> — Can access content they're assigned to and the groups they're in.</li><li><strong>Contributor</strong> — Everything in General, plus can edit existing Subjects they're assigned to.</li><li><strong>Author</strong> — Everything in Contributor, plus can create new content and assign people.</li><li><strong>Admin</strong> — Everything in Author, plus can view reports and manage users.</li><li><strong>Billing Admin</strong> — Everything in Admin, plus can manage billing and plans.</li></ol>

<strong>Quick takeaway</strong>
<ul><li>If someone needs to <em>do the work</em> → General/Contributor</li><li>If someone needs to <em>build training</em> → Author</li><li>If someone needs to <em>run the system</em> → Admin</li><li>If someone needs to <em>own billing</em> → Billing Admin</li></ul>`,
    videoTitle: 'Permission Roles Explained'
  },
  {
    keywords: ['report', 'view'],
    answer: `To see training reports in Trainual, you'll head to the Reports area (this is where completion % and test scores live).

<strong>What you can report on</strong>
<ul><li>Progress/completion by person or by Subject/content</li><li>Due dates and what's overdue</li><li>Test scores (if your training includes Tests)</li></ul>

<strong>Access note</strong><br/>With your permission level (Billing Admin), you typically have access to reporting. If you don't see Reports in the app, an Admin may have reporting access scoped differently in your account settings.`,
    videoUrl: 'https://www.youtube.com/embed/N-l2-P4t4Xs?si=UZbdrmJt6mnJVkPZ',
    videoTitle: 'Viewing Training Reports'
  },
  {
    keywords: ['progress', 'check'],
    answer: `To check how someone's doing on assigned training, you'll want to head to Reports and look at completion by person (or by Subject/content).

<strong>What you can see</strong>
<ul><li>Completion % (Not Started / Started / Completed)</li><li>Due dates (and what's overdue)</li><li>Progress broken down by Subject and individual content items (like Documents, Videos, etc.)</li></ul>

<strong>Quick tips (so you don't go hunting)</strong>
<ul><li>If you want "How is <em>one person</em> doing?" → look for People/User progress style reports.</li><li>If you want "How is the team doing on <em>one Subject</em>?" → look for Subject progress reports.</li></ul>`,
    videoTitle: 'Checking User Progress'
  }
];

const defaultResponse: MockResponse = {
  keywords: [],
  answer: "I'm here to help you learn Trainual! Try asking about creating training paths, adding users, assigning content, or managing permissions. You can also explore using the sidebar navigation to discover features.",
};

export function getResponseForQuestion(question: string): ChatMessage {
  const lowerQuestion = question.toLowerCase();

  // Find best matching response by counting keyword hits
  let bestResponse = defaultResponse;
  let bestScore = 0;

  for (const r of mockResponses) {
    const score = r.keywords.filter(keyword => lowerQuestion.includes(keyword)).length;
    if (score > bestScore) {
      bestScore = score;
      bestResponse = r;
    }
  }

  const response = bestResponse;

  return {
    question,
    answer: response.answer,
    videoUrl: response.videoUrl,
    videoTitle: response.videoTitle,
    timestamp: Date.now()
  };
}
