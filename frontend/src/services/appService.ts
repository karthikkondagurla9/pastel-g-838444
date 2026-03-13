import { customers, orders, tickets, automationFlows, flowRuns, kbItems, Customer, Order, Ticket, AutomationFlow, FlowRun, KBItem } from '../data/mockData';
import { emitter } from '../agentSdk';
import { AGENT_CONFIGS } from '../agentSdk/agents';

const agentId = AGENT_CONFIGS[0].id;

export const crmService = {
  getCustomers: async (): Promise<Customer[]> => {
    return customers;
  },
  getCustomerById: async (id: string): Promise<Customer | undefined> => {
    return customers.find(c => c.id === id);
  },
  getCustomerOrders: async (customerId: string): Promise<Order[]> => {
    return orders.filter(o => o.customerId === customerId);
  },
  getDashboardStats: async () => {
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
};

export const supportService = {
  getTickets: async (): Promise<Ticket[]> => {
    return tickets;
  },
  getTicketById: async (id: string): Promise<Ticket | undefined> => {
    const ticket = tickets.find(t => t.id === id);
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
    return automationFlows;
  },
  getFlowRuns: async (): Promise<FlowRun[]> => {
    return flowRuns;
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
    return kbItems;
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
