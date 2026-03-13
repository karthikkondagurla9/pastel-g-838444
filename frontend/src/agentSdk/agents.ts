import { AgentConfig } from './types';
import { z } from 'zod';

export const AGENT_CONFIGS: AgentConfig[] = [
  {
    "id": "1e495335-9b1f-4d3f-ad52-2cf06d06f8bb",
    "name": "SaaS Support Copilot & CRM Assistant",
    "description": "An intelligent assistant for SaaS support teams that provides context-aware customer insights, ticket summaries, RAG-based knowledge retrieval, and automation troubleshooting.",
    "triggerEvents": [
      {
        "name": "ticket_selection_change",
        "type": "sync",
        "description": "When an agent selects a new support ticket, the agent automatically scans the ticket content and the customer's CRM profile to generate a summary and suggested response.",
        "outputSchema": z.any()
      },
      {
        "name": "knowledge_base_query",
        "type": "sync",
        "description": "When a user types a question in the floating Copilot panel, the agent performs a RAG search across uploaded documents to provide a cited answer.",
        "outputSchema": z.any()
      },
      {
        "name": "automation_failure_alert",
        "type": "sync",
        "description": "When a flow run fails in the Automation Flow Manager, the agent analyzes the execution log to provide a plain-English explanation of the error and potential fixes.",
        "outputSchema": z.any()
      }
    ],
    "config": {
      "appId": "a0531a3e-2f04-47e3-9426-f3ce802f4688",
      "accountId": "79b6a18f-ba0d-4d97-af07-ffe3af512716",
      "widgetKey": "RTO1dmKNqD1qvziyAE7k69wTZgUa1z1ezg4oaTw3"
    }
  }
];