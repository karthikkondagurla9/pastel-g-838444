# API Specification (Internal Service Layer)

## CRM Service

### Get Customers
- **Function**: `crmService.getCustomers()`
- **Return Type**: `Promise<Customer[]>`

### Get Customer By ID
- **Function**: `crmService.getCustomerById(id: string)`
- **Return Type**: `Promise<Customer | undefined>`

### Get Dashboard Stats
- **Function**: `crmService.getDashboardStats()`
- **Returns**: Aggregate metrics for revenue, customers, orders, and tickets.

## Support Service

### Get Tickets
- **Function**: `supportService.getTickets()`
- **Return Type**: `Promise<Ticket[]>`

### Get Ticket By ID
- **Function**: `supportService.getTicketById(id: string)`
- **Return Type**: `Promise<Ticket | undefined>`
- **Agent Triggers**: `ticket_selection_change`

## Automation Service

### Get Flows
- **Function**: `automationService.getFlows()`
- **Return Type**: `Promise<AutomationFlow[]>`

### Get Flow Runs
- **Function**: `automationService.getFlowRuns()`
- **Return Type**: `Promise<FlowRun[]>`

## Knowledge Base Service

### Get KB Items
- **Function**: `kbService.getKBItems()`
- **Return Type**: `Promise<KBItem[]>`

## Agent Integration

### Agent ID: `1e495335-9b1f-4d3f-ad52-2cf06d06f8bb`

| Event | Type | Trigger |
|-------|------|---------|
| `ticket_selection_change` | Sync | When a ticket is opened in the support inbox. |
| `knowledge_base_query` | Sync | When a user searches in the Copilot panel. |
| `automation_failure_alert` | Sync | When a flow execution fails. |
