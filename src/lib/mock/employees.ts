import { Employee, SurveyQuestion, SurveyResponse, Pledge } from '@/types';

// Mock survey questions
export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 'q1',
    text: 'How transparent is your company about its financial performance?',
    type: 'scale',
    required: true,
    category: 'transparency'
  },
  {
    id: 'q2',
    text: 'Does your company openly share information about decision-making processes?',
    type: 'multiple-choice',
    options: ['Always', 'Often', 'Sometimes', 'Rarely', 'Never'],
    required: true,
    category: 'transparency'
  },
  {
    id: 'q3',
    text: 'How would you rate your company\'s commitment to ethical business practices?',
    type: 'scale',
    required: true,
    category: 'ethics'
  },
  {
    id: 'q4',
    text: 'Does your company encourage open communication and feedback?',
    type: 'multiple-choice',
    options: ['Strongly agree', 'Agree', 'Neutral', 'Disagree', 'Strongly disagree'],
    required: true,
    category: 'culture'
  },
  {
    id: 'q5',
    text: 'How accessible are senior leaders for direct communication?',
    type: 'scale',
    required: true,
    category: 'leadership'
  },
  {
    id: 'q6',
    text: 'What specific improvements would you like to see in your company\'s transparency?',
    type: 'text',
    required: false,
    category: 'transparency'
  }
];

// Mock employee data
export const mockEmployees: Employee[] = [
  {
    id: 'emp1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    companyId: '1',
    department: 'Engineering',
    position: 'Senior Developer',
    truthPoints: 150,
    hasPledged: true,
    pledgeDate: new Date('2024-01-15'),
    surveyResponses: [
      {
        questionId: 'q1',
        answer: 8,
        timestamp: new Date('2024-01-15')
      },
      {
        questionId: 'q2',
        answer: 'Often',
        timestamp: new Date('2024-01-15')
      },
      {
        questionId: 'q3',
        answer: 9,
        timestamp: new Date('2024-01-15')
      },
      {
        questionId: 'q4',
        answer: 'Agree',
        timestamp: new Date('2024-01-15')
      },
      {
        questionId: 'q5',
        answer: 7,
        timestamp: new Date('2024-01-15')
      }
    ]
  },
  {
    id: 'emp2',
    name: 'Mike Chen',
    email: 'mike.chen@techcorp.com',
    companyId: '1',
    department: 'Product',
    position: 'Product Manager',
    truthPoints: 120,
    hasPledged: true,
    pledgeDate: new Date('2024-01-20'),
    surveyResponses: [
      {
        questionId: 'q1',
        answer: 7,
        timestamp: new Date('2024-01-20')
      },
      {
        questionId: 'q2',
        answer: 'Sometimes',
        timestamp: new Date('2024-01-20')
      },
      {
        questionId: 'q3',
        answer: 8,
        timestamp: new Date('2024-01-20')
      },
      {
        questionId: 'q4',
        answer: 'Strongly agree',
        timestamp: new Date('2024-01-20')
      },
      {
        questionId: 'q5',
        answer: 6,
        timestamp: new Date('2024-01-20')
      }
    ]
  },
  {
    id: 'emp3',
    name: 'Lisa Rodriguez',
    email: 'lisa.rodriguez@financefirst.com',
    companyId: '3',
    department: 'Compliance',
    position: 'Compliance Officer',
    truthPoints: 200,
    hasPledged: true,
    pledgeDate: new Date('2024-01-10'),
    surveyResponses: [
      {
        questionId: 'q1',
        answer: 9,
        timestamp: new Date('2024-01-10')
      },
      {
        questionId: 'q2',
        answer: 'Always',
        timestamp: new Date('2024-01-10')
      },
      {
        questionId: 'q3',
        answer: 10,
        timestamp: new Date('2024-01-10')
      },
      {
        questionId: 'q4',
        answer: 'Strongly agree',
        timestamp: new Date('2024-01-10')
      },
      {
        questionId: 'q5',
        answer: 9,
        timestamp: new Date('2024-01-10')
      }
    ]
  }
];

// Mock functions for employee operations
export const getEmployeeById = (id: string): Employee | undefined => {
  return mockEmployees.find(employee => employee.id === id);
};

export const getEmployeesByCompany = (companyId: string): Employee[] => {
  return mockEmployees.filter(employee => employee.companyId === companyId);
};

export const submitSurveyResponse = (employeeId: string, responses: SurveyResponse[]): Employee | null => {
  const employee = mockEmployees.find(emp => emp.id === employeeId);
  if (employee) {
    employee.surveyResponses = responses;
    // Award TruthPoints based on survey completion
    employee.truthPoints += 50;
    return employee;
  }
  return null;
};

export const submitPledge = (employeeId: string, message?: string): Pledge | null => {
  const employee = mockEmployees.find(emp => emp.id === employeeId);
  if (employee) {
    employee.hasPledged = true;
    employee.pledgeDate = new Date();
    // Award TruthPoints for pledging
    employee.truthPoints += 100;
    
    const pledge: Pledge = {
      id: `pledge_${Date.now()}`,
      employeeId,
      companyId: employee.companyId,
      timestamp: new Date(),
      isPublic: true,
      message
    };
    
    return pledge;
  }
  return null;
};

export const getEmployeeStats = () => {
  const totalEmployees = mockEmployees.length;
  const pledgedEmployees = mockEmployees.filter(emp => emp.hasPledged).length;
  const totalTruthPoints = mockEmployees.reduce((sum, emp) => sum + emp.truthPoints, 0);
  
  return {
    totalEmployees,
    pledgedEmployees,
    totalTruthPoints,
    averageTruthPoints: totalTruthPoints / totalEmployees
  };
};
