import { OptionType, QuestionType, ResultCategory, SurveyConfig, SurveySection } from '../types';

export const surveyData: SurveyConfig = {
  title: "Discover your Solution",
  description: "Discover the perfect ERP features for your business needs.",
  sections: [
    {
      id: "section-customer-scale",
      title: "Customer & Transaction Volume",
      description: "Help us understand your customer handling capacity needs",
      questions: [
        {
          id: "q3",
          text: "What is your monthly transaction volume?",
          type: "single",
          required: true,
          options: [
            { id: "q3-o1", text: "Low (< 1,000 transactions)", value: "low" },
            { id: "q3-o2", text: "Medium (1,000-10,000 transactions)", value: "medium" },
            { id: "q3-o3", text: "High (10,001-100,000 transactions)", value: "high" },
            { id: "q3-o4", text: "Very High (100,000+ transactions)", value: "very-high" },
          ],
          subQuestions: [
            {
              id: "q3-sub1",
              text: "What types of transactions do you handle?",
              type: "multiple",
              required: true,
              options: [
                { id: "q3-sub1-o1", text: "Sales Orders", value: "sales" },
                { id: "q3-sub1-o2", text: "Purchase Orders", value: "purchase" },
                { id: "q3-sub1-o3", text: "Inventory Movements", value: "inventory" },
                { id: "q3-sub1-o4", text: "Financial Transactions", value: "financial" },
                { id: "q3-sub1-o5", text: "Service Requests", value: "service" },
              ],
                        subQuestions: [
            {
              id: "q3-sub1-sub1",
              text: "Do you need Sales order approval process?",
              type: "single",
              required: true,
              options: [
                { id: "q3-sub1-sub1-o1", text: "Yes", value: "yes" },
                { id: "q3-sub1-sub1-o2", text: "No", value: "no" },
                { id: "q3-sub1-sub1-o2", text: "Maybe", value: "maybe" },

              ],
              
            },
          ],
            },
          ],
        },
        {
          id: "q4",
          text: "What is your customer database size?",
          type: "single",
          required: true,
          options: [
            { id: "q4-o1", text: "Small (< 1,000 customers)", value: "small-db" },
            { id: "q4-o2", text: "Medium (1,000-10,000 customers)", value: "medium-db" },
            { id: "q4-o3", text: "Large (10,001-100,000 customers)", value: "large-db" },
            { id: "q4-o4", text: "Enterprise (100,000+ customers)", value: "enterprise-db" },
          ],
        },
      ],
    },
    {
      id: "section-business-scale",
      title: "Business Scale & Growth",
      description: "Let's understand your business scale and growth plans",
      questions: [
        {
          id: "q1",
          text: "What is your current company size?",
          type: "single",
          required: true,
          options: [
            { id: "q1-o1", text: "Startup (1-10 employees)", value: "startup" },
            { id: "q1-o2", text: "Small (11-50 employees)", value: "small" },
            { id: "q1-o3", text: "Medium (51-250 employees)", value: "medium" },
            { id: "q1-o4", text: "Large (251-1000 employees)", value: "large" },
            { id: "q1-o5", text: "Enterprise (1000+ employees)", value: "enterprise" },
          ],
          subQuestions: [
            {
              id: "q1-sub1",
              text: "What is your expected employee growth rate in the next 2 years?",
              type: "single",
              required: true,
              options: [
                { id: "q1-sub1-o1", text: "Stable (0-10% growth)", value: "stable" },
                { id: "q1-sub1-o2", text: "Moderate (11-30% growth)", value: "moderate" },
                { id: "q1-sub1-o3", text: "Rapid (31-100% growth)", value: "rapid" },
                { id: "q1-sub1-o4", text: "Hyper-growth (100%+ growth)", value: "hyper" },
              ],
            },
          ],
        },
        {
          id: "q2",
          text: "How many concurrent system users do you expect?",
          type: "single",
          required: true,
          options: [
            { id: "q2-o1", text: "Small team (1-20 users)", value: "small-team" },
            { id: "q2-o2", text: "Medium team (21-100 users)", value: "medium-team" },
            { id: "q2-o3", text: "Large team (101-500 users)", value: "large-team" },
            { id: "q2-o4", text: "Enterprise (500+ users)", value: "enterprise-team" },
          ],
          subQuestions: [
            {
              id: "q2-sub1",
              text: "What type of user access do you need?",
              type: "multiple",
              required: true,
              options: [
                { id: "q2-sub1-o1", text: "Role-based access control", value: "rbac" },
                { id: "q2-sub1-o2", text: "Department-level permissions", value: "department" },
                { id: "q2-sub1-o3", text: "Custom access policies", value: "custom" },
                { id: "q2-sub1-o4", text: "Multi-tenant capabilities", value: "multi-tenant" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "section-operations",
      title: "Operational Requirements",
      description: "Tell us about your specific operational needs",
      questions: [
        {
          id: "q5",
          text: "Which core business functions need automation?",
          type: "multiple",
          required: true,
          options: [
            { id: "q5-o1", text: "Finance & Accounting", value: "finance" },
            { id: "q5-o2", text: "Sales & CRM", value: "sales-crm" },
            { id: "q5-o3", text: "Inventory Management", value: "inventory" },
            { id: "q5-o4", text: "Human Resources", value: "hr" },
            { id: "q5-o5", text: "Manufacturing", value: "manufacturing" },
            { id: "q5-o6", text: "Project Management", value: "project" },
          ],
          subQuestions: [
            {
              id: "q5-sub1",
              text: "What level of process automation do you require?",
              type: "single",
              required: true,
              options: [
                { id: "q5-sub1-o1", text: "Basic (Manual with some automation)", value: "basic" },
                { id: "q5-sub1-o2", text: "Standard (Automated core processes)", value: "standard" },
                { id: "q5-sub1-o3", text: "Advanced (AI-driven automation)", value: "advanced" },
              ],
            },
          ],
        },
        {
          id: "q6",
          text: "What are your data analysis requirements?",
          type: "multiple",
          required: true,
          options: [
            { id: "q6-o1", text: "Real-time dashboards", value: "dashboards" },
            { id: "q6-o2", text: "Custom report builder", value: "custom-reports" },
            { id: "q6-o3", text: "Predictive analytics", value: "predictive" },
            { id: "q6-o4", text: "Business intelligence", value: "bi" },
            { id: "q6-o5", text: "Data warehousing", value: "warehouse" },
          ],
        }
      ],
    }
  ],
};

export const resultCategories: ResultCategory[] = [
  {
    id: "enterprise-suite",
    title: "Enterprise ERP Suite",
    description: "Full-scale enterprise solution with advanced capabilities",
    conditions: [
      { questionId: "q1", values: ["enterprise", "large"] },
      { questionId: "q2", values: ["enterprise-team", "large-team"] },
      { questionId: "q3", values: ["high", "very-high"] },
    ],
    recommendation: "Our Enterprise ERP Suite offers unlimited user capacity, advanced automation, and enterprise-grade security. Includes AI-powered analytics, custom workflows, and dedicated support."
  },
  {
    id: "growth-scale",
    title: "Growth & Scale Platform",
    description: "Scalable solution for rapidly growing businesses",
    conditions: [
      { questionId: "q1-sub1", values: ["rapid", "hyper"] },
      { questionId: "q2-sub1", values: ["rbac", "multi-tenant"] },
    ],
    recommendation: "The Growth & Scale Platform provides flexible licensing, scalable infrastructure, and modular features that grow with your business."
  },
  {
    id: "high-volume-commerce",
    title: "High-Volume Commerce Solution",
    description: "Optimized for businesses with high transaction volumes",
    conditions: [
      { questionId: "q3", values: ["high", "very-high"] },
      { questionId: "q3-sub1", values: ["sales", "inventory"] },
    ],
    recommendation: "Built for high-throughput operations with real-time processing, advanced inventory management, and automated order fulfillment."
  },
  {
    id: "advanced-analytics",
    title: "Advanced Analytics & BI Platform",
    description: "Data-driven solution with comprehensive analytics",
    conditions: [
      { questionId: "q6", values: ["predictive", "bi", "warehouse"] },
      { questionId: "q5-sub1", values: ["advanced"] },
    ],
    recommendation: "Features AI-powered analytics, predictive forecasting, and comprehensive business intelligence tools for data-driven decision making."
  },
  {
    id: "smb-professional",
    title: "SMB Professional Suite",
    description: "Professional solution for small and medium businesses",
    conditions: [
      { questionId: "q1", values: ["small", "medium"] },
      { questionId: "q4", values: ["small-db", "medium-db"] },
    ],
    recommendation: "Right-sized solution with essential features, easy setup, and room to grow. Includes core business functions with optional advanced features."
  },
  {
    id: "startup-essentials",
    title: "Startup Essentials Package",
    description: "Streamlined solution for startups and small teams",
    conditions: [
      { questionId: "q1", values: ["startup"] },
      { questionId: "q2", values: ["small-team"] },
    ],
    recommendation: "Cost-effective starter package with core features, simple setup, and easy upgrade path as your business grows."
  }
];