import api from '../lib/api';
import { Customer, Order, Ticket, AutomationFlow, FlowRun, KBItem, customers as mockCustomers, orders as mockOrders, tickets as mockTickets, automationFlows as mockAutomationFlows, flowRuns as mockFlowRuns, kbItems as mockKbItems } from '../data/mockData';
import { emitter } from '../agentSdk';
import { AGENT_CONFIGS } from '../agentSdk/agents';

const agentId = AGENT_CONFIGS[0].id;
const useMock = import.meta.env.VITE_USE_MOCK_DATA === "true";

export const crmService = {
  getCustomers: async (): Promise<Customer[]> => {
    if (useMock) return mockCustomers;
    const response = await api.get('/customers');
    return response.data;
  },
  getCustomerById: async (id: string): Promise<Customer | undefined> => {
    if (useMock) return mockCustomers.find(c => c.id === id);
    const response = await api.get(`/customers/${id}`);
    return response.data;
  },
  getCustomerOrders: async (customerId: string): Promise<Order[]> => {
    if (useMock) return mockOrders.filter(o => o.customerId === customerId);
    const response = await api.get(`/customers/${customerId}/orders`);
    return response.data;
  },
  getDashboardStats: async () => {
    if (useMock) {
      return {
        revenue: 45280.50,
        activeCustomers: mockCustomers.length,
        totalOrders: mockOrders.length,
        openTickets: mockTickets.filter(t => t.status === 'open').length,
        revenueChange: 12.5,
        customersChange: 8.2,
        ordersChange: -2.4,
        ticketsChange: 5.1,
      };
    }
    const response = await api.get('/dashboard/stats');
    return response.data;
  }
};

export const supportService = {
  getTickets: async (): Promise<Ticket[]> => {
    if (useMock) return mockTickets;
    const response = await api.get('/tickets');
    return response.data;
  },
  getTicketById: async (id: string): Promise<Ticket | undefined> => {
    let ticket: Ticket | undefined;
    if (useMock) {
      ticket = mockTickets.find(t => t.id === id);
    } else {
      const response = await api.get(`/tickets/${id}`);
      ticket = response.data;
    }

    if (ticket) {
      // Trigger agent event when ticket is selected
      const customer = useMock 
        ? mockCustomers.find(c => c.id === ticket?.customerId)
        : (await crmService.getCustomerById(ticket.customerId));
      
      await emitter.emit({
        agentId,
        event: 'ticket_selection_change',
        payload: {
          ticketId: ticket.id,
          subject: ticket.subject,
          lastMessage: ticket.lastMessage,
          customer: customer ? {
            name: customer.name,
            email: customer.email,
            ltv: customer.ltv,
            totalOrders: customer.totalOrders
          } : null
        },
        uid: 'user-default'
      });
    }
    return ticket;
  },
};

export const automationService = {
  getFlows: async (): Promise<AutomationFlow[]> => {
    if (useMock) return mockAutomationFlows;
    const response = await api.get('/automations/flows');
    return response.data;
  },
  getFlowRuns: async (): Promise<FlowRun[]> => {
    if (useMock) return mockFlowRuns;
    const response = await api.get('/automations/runs');
    return response.data;
  },
  handleFailure: async (runId: string) => {
    const runs = await automationService.getFlowRuns();
    const run = runs.find(r => r.id === runId);
    if (run && run.status === 'failed') {
      await emitter.emit({
        agentId,
        event: 'automation_failure_alert',
        payload: {
          runId: run.id,
          flowName: run.flowName,
          error: run.details,
          timestamp: run.timestamp
        },
        uid: 'user-default'
      });
    }
  }
};

export const kbService = {
  getKBItems: async (): Promise<KBItem[]> => {
    if (useMock) return mockKbItems;
    const response = await api.get('/kb/items');
    return response.data;
  },
  uploadKBItem: async (file: File): Promise<KBItem> => {
    if (useMock) {
      const newItem: KBItem = {
        id: `kb-${Date.now()}`,
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
        size: `${(file.size / 1024).toFixed(1)} KB`,
        uploadedDate: new Date().toISOString().split('T')[0]
      };
      mockKbItems.push(newItem);
      return newItem;
    }
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/kb/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  deleteKBItem: async (id: string): Promise<void> => {
    if (useMock) {
      const index = mockKbItems.findIndex(item => item.id === id);
      if (index !== -1) mockKbItems.splice(index, 1);
      return;
    }
    await api.delete(`/kb/items/${id}`);
  },
  queryKB: async (query: string) => {
    return await emitter.emit({
      agentId,
      event: 'knowledge_base_query',
      payload: { query },
      uid: 'user-default'
    });
  }
};