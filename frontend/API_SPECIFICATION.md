# API Specification

## Base URL
`import.meta.env.VITE_API_BASE_URL`

## Endpoints

### Dashboard
- `GET /dashboard/stats` - Get aggregate statistics for the dashboard.
  - Response: `{ revenue: number, activeCustomers: number, totalOrders: number, openTickets: number, revenueChange: number, customersChange: number, ordersChange: number, ticketsChange: number }`

### Customers
- `GET /customers` - List all customers.
  - Response: `Customer[]`
- `GET /customers/:id` - Get customer details by ID.
  - Response: `Customer`
- `GET /customers/:id/orders` - Get orders for a specific customer.
  - Response: `Order[]`

### Support
- `GET /tickets` - List all support tickets.
  - Response: `Ticket[]`
- `GET /tickets/:id` - Get ticket details by ID.
  - Response: `Ticket`

### Automations
- `GET /automations/flows` - List all automation flows.
  - Response: `AutomationFlow[]`
- `GET /automations/runs` - List all automation execution logs.
  - Response: `FlowRun[]`

### Knowledge Base
- `GET /kb/items` - List all knowledge base items.
  - Response: `KBItem[]`
- `POST /kb/upload` - Upload a new knowledge base document.
  - Request: `FormData` with `file`
  - Response: `KBItem`
- `DELETE /kb/items/:id` - Delete a knowledge base item.
  - Response: `{ success: true }`

## Data Models

### Customer
```typescript
{
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
```

### Order
```typescript
{
  id: string;
  customerId: string;
  shopifyOrderId?: string;
  items: string[];
  total: number;
  date: string;
  status: 'delivered' | 'processing' | 'shipped' | 'cancelled';
}
```

### Ticket
```typescript
{
  id: string;
  customerId: string;
  subject: string;
  status: 'open' | 'pending' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  lastMessage: string;
  createdAt: string;
}
```

### AutomationFlow
```typescript
{
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused';
  dailyTriggers: number;
  successRate: number;
  lastRun: string;
}
```

### FlowRun
```typescript
{
  id: string;
  flowId: string;
  flowName: string;
  status: 'success' | 'failed' | 'running';
  timestamp: string;
  details: string;
}
```

### KBItem
```typescript
{
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedDate: string;
}
```