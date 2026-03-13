export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  shopifyId?: string;
  ltv: number;
  avgOrderValue: number;
  totalOrders: number;
}

export interface Order {
  id: string;
  customerId: string;
  shopifyOrderId?: string;
  items: string[];
  total: number;
  date: string;
  status: 'delivered' | 'processing' | 'shipped' | 'cancelled';
}

export interface Ticket {
  id: string;
  customerId: string;
  subject: string;
  status: 'open' | 'pending' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  lastMessage: string;
  createdAt: string;
}

export interface AutomationFlow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused';
  dailyTriggers: number;
  successRate: number;
  lastRun: string;
}

export interface FlowRun {
  id: string;
  flowId: string;
  flowName: string;
  status: 'success' | 'failed' | 'running';
  timestamp: string;
  details: string;
}

export interface KBItem {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedDate: string;
}

export const customers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    joinDate: '2023-10-15',
    shopifyId: 'sh_9823471',
    ltv: 1250.50,
    avgOrderValue: 125.05,
    totalOrders: 10,
  },
  {
    id: 'cust-2',
    name: 'Michael Chen',
    email: 'm.chen@example.com',
    phone: '+1 (555) 987-6543',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    joinDate: '2023-11-20',
    ltv: 450.00,
    avgOrderValue: 90.00,
    totalOrders: 5,
  },
  {
    id: 'cust-3',
    name: 'Elena Rodriguez',
    email: 'elena.r@example.com',
    phone: '+1 (555) 456-7890',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    joinDate: '2024-01-05',
    shopifyId: 'sh_1122334',
    ltv: 2100.75,
    avgOrderValue: 175.06,
    totalOrders: 12,
  },
];

export const orders: Order[] = [
  {
    id: 'ord-101',
    customerId: 'cust-1',
    shopifyOrderId: '#1001',
    items: ['Premium Coffee Beans', 'Gooseneck Kettle'],
    total: 145.00,
    date: '2024-03-10',
    status: 'delivered',
  },
  {
    id: 'ord-102',
    customerId: 'cust-2',
    items: ['Ceramic Mug Set'],
    total: 45.00,
    date: '2024-03-11',
    status: 'processing',
  },
  {
    id: 'ord-103',
    customerId: 'cust-3',
    shopifyOrderId: '#1002',
    items: ['Espresso Machine', 'Milk Frother'],
    total: 599.99,
    date: '2024-03-12',
    status: 'shipped',
  },
];

export const tickets: Ticket[] = [
  {
    id: 'tkt-001',
    customerId: 'cust-1',
    subject: 'Delayed Shipping Inquiry',
    status: 'open',
    priority: 'high',
    lastMessage: "Hi, my order hasn't arrived yet. Can you check the status?",
    createdAt: '2024-03-12 10:30',
  },
  {
    id: 'tkt-002',
    customerId: 'cust-2',
    subject: 'Refund Request',
    status: 'pending',
    priority: 'medium',
    lastMessage: 'The mug I received has a crack. I would like a refund.',
    createdAt: '2024-03-11 15:45',
  },
  {
    id: 'tkt-003',
    customerId: 'cust-3',
    subject: 'Bulk Order Discount',
    status: 'closed',
    priority: 'low',
    lastMessage: 'Thank you for the discount code!',
    createdAt: '2024-03-05 09:20',
  },
];

export const automationFlows: AutomationFlow[] = [
  {
    id: 'flow-1',
    name: 'Abandoned Cart Email',
    description: 'Sends a follow-up email after 2 hours of abandonment.',
    status: 'active',
    dailyTriggers: 145,
    successRate: 12.5,
    lastRun: '2 mins ago',
  },
  {
    id: 'flow-2',
    name: 'Post-Purchase Follow-up',
    description: 'Ask for a review 7 days after delivery.',
    status: 'active',
    dailyTriggers: 89,
    successRate: 18.2,
    lastRun: '15 mins ago',
  },
  {
    id: 'flow-3',
    name: 'VIP Loyalty Tagging',
    description: 'Tag customers as VIP when LTV > $1000.',
    status: 'paused',
    dailyTriggers: 12,
    successRate: 100,
    lastRun: '1 day ago',
  },
];

export const flowRuns: FlowRun[] = [
  {
    id: 'run-1001',
    flowId: 'flow-1',
    flowName: 'Abandoned Cart Email',
    status: 'success',
    timestamp: '2024-03-13 10:15:30',
    details: 'Email sent to user@example.com',
  },
  {
    id: 'run-1002',
    flowId: 'flow-2',
    flowName: 'Post-Purchase Follow-up',
    status: 'failed',
    timestamp: '2024-03-13 10:10:05',
    details: 'SMTP Server Connection Refused',
  },
  {
    id: 'run-1003',
    flowId: 'flow-1',
    flowName: 'Abandoned Cart Email',
    status: 'running',
    timestamp: '2024-03-13 10:17:45',
    details: 'Evaluating trigger conditions',
  },
];

export const kbItems: KBItem[] = [
  {
    id: 'kb-1',
    name: 'Shipping_Policy_2024.pdf',
    type: 'PDF',
    size: '1.2 MB',
    uploadedDate: '2024-01-10',
  },
  {
    id: 'kb-2',
    name: 'Refund_Guidelines.docx',
    type: 'DOCX',
    size: '450 KB',
    uploadedDate: '2024-02-15',
  },
  {
    id: 'kb-3',
    name: 'Product_Catalog_V2.csv',
    type: 'CSV',
    size: '3.5 MB',
    uploadedDate: '2024-03-01',
  },
];
