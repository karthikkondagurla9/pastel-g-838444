import { customers, orders, tickets, automationFlows, flowRuns, kbItems, Customer, Order, Ticket, AutomationFlow, FlowRun, KBItem } from '../data/mockData';
import { emitter } from '../agentSdk';
import { AGENT_CONFIGS } from '../agentSdk/agents';
import api from '../lib/api';

const agentId = AGENT_CONFIGS[0].id;
const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const crmService = {
  getCustomers: async (): Promise<Customer[]> => {
    if (useMockData) return customers;
    const response = await api.get('/crm/customers');
    return response.data;
  },
  getCustomerById: async (id: string): Promise<Customer | undefined> => {
    if (useMockData) return customers.find(c => c.id === id);
    const response = await api.get(`/crm/customers/${id}`);
    return response.data;
  },
  getCustomerOrders: async (customerId: string): Promise<Order[]> => {
    if (useMockData) return orders.filter(o => o.customerId === customerId);
    const response = await api.get(`/crm/customers/${customerId}/orders`);
    return response.data;
  },
  getDashboardStats: async () => {
    if (useMockData) {
      return {
        revenue: 45280.50,
        activeCustomers: customers.length,
        totalOrders: orders.length,
        openTickets: tickets.filter(t => t.status === 'open').length,
        revenueChange: 12.5,
        customersChange: 8.2,
        ordersChange: -2.4,
        ticketsChange: 5.1,
      };
    }
    const response = await api.get('/crm/dashboard/stats');
    return response.data;
  }
};

export const supportService = {
  getTickets: async (): Promise<Ticket[]> => {
    if (useMockData) return tickets;
    const response = await api.get('/support');
    return response.data;
  },
  getTicketById: async (id: string): Promise<Ticket | undefined> => {
    let ticket: Ticket | undefined;
    if (useMockData) {
      ticket = tickets.find(t => t.id === id);
    } else {
      const response = await api.get(`/support/${id}`);
      ticket = response.data;
    }

    if (ticket) {
      // Trigger agent event when ticket is selected
      const customer = customers.find(c => c.id === ticket.customerId);
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
    if (useMockData) return automationFlows;
    const response = await api.get('/automation/flows');
    return response.data;
  },
  getFlowRuns: async (): Promise<FlowRun[]> => {
    if (useMockData) return flowRuns;
    const response = await api.get('/automation/runs');
    return response.data;
  },
  handleFailure: async (runId: string) => {
    const run = flowRuns.find(r => r.id === runId);
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
    if (useMockData) return kbItems;
    const response = await api.get('/kb');
    return response.data;
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
