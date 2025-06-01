/* eslint-disable @typescript-eslint/no-unused-vars */
import { OptionType, QuestionType, ResultCategory, SurveyConfig, SurveySection } from '../types';

import { OptionType, QuestionType, ResultCategory, SurveyConfig, SurveySection } from '../types';

export const surveyData: SurveyConfig = {
  title: "Discover your Solution",
  description: "Discover the perfect ERP features for your business needs.",
  sections: [
    {
      id: "section-organization-structure",
      title: "Organization Structure",
      description: "Tell us about your company's structure and user base.",
      questions: [
        {
          id: "q1",
          text: "How many employees are in your organization?",
          type: "single",
          required: true,
          options: [
            { id: "q1-o1", text: "1–10", value: "1-10" },
            { id: "q1-o2", text: "11–50", value: "11-50" },
            { id: "q1-o3", text: "51–250", value: "51-250" },
            { id: "q1-o4", text: "251–1000", value: "251-1000" },
            { id: "q1-o5", text: "1000+", value: "1000+" }
          ]
        },
        {
          id: "q2",
          text: "How many ERP users will access the system concurrently?",
          type: "single",
          required: true,
          options: [
            { id: "q2-o1", text: "1–10 users", value: "1-10" },
            { id: "q2-o2", text: "11–50 users", value: "11-50" },
            { id: "q2-o3", text: "51–250 users", value: "51-250" },
            { id: "q2-o4", text: "251–1000 users", value: "251-1000" },
            { id: "q2-o5", text: "1000+ users", value: "1000+" }
          ]
        },
        {
          id: "q3",
          text: "Does your organization have multiple branches or locations?",
          type: "single",
          required: true,
          options: [
            { id: "q3-o1", text: "Yes", value: "yes" },
            { id: "q3-o2", text: "No", value: "no" }
          ],
          subQuestions: [
            {
              id: "q3-sub1",
              text: "How many branches or locations do you operate?",
              type: "single",
              required: true,
              options: [
                { id: "q3-sub1-o1", text: "2–5 branches", value: "2-5" },
                { id: "q3-sub1-o2", text: "6–20 branches", value: "6-20" },
                { id: "q3-sub1-o3", text: "21+ branches", value: "21+" }
              ]
            }
          ]
        },
        {
          id: "q4",
          text: "How is your organization structured?",
          type: "multiple",
          required: true,
          options: [
            { id: "q4-o1", text: "Divisions by product/service", value: "by-product" },
            { id: "q4-o2", text: "Departments by function (e.g. HR, Finance)", value: "by-function" },
            { id: "q4-o3", text: "Regions or geographies", value: "by-region" },
            { id: "q4-o4", text: "Matrix or hybrid structure", value: "hybrid" }
          ]
        }
      ]
    },
    {
      id: "section-industry-type",
      title: "Industry Information",
      description: "Help us understand your business domain.",
      questions: [
        {
          id: "q5",
          text: "Which industry does your company primarily belong to?",
          type: "single",
          required: true,
          options: [
            { id: "q5-o1", text: "Manufacturing", value: "manufacturing" },
            { id: "q5-o2", text: "Retail / eCommerce", value: "retail" },
            { id: "q5-o3", text: "Services", value: "services" },
            { id: "q5-o4", text: "Construction", value: "construction" },
            { id: "q5-o5", text: "Non-Profit / NGO", value: "non-profit" },
            { id: "q5-o6", text: "Education", value: "education" },
            { id: "q5-o7", text: "Healthcare", value: "healthcare" },
            { id: "q5-o8", text: "Other", value: "other" }
          ]
        },
        {
          id: "q6",
          text: "Do you require industry-specific compliance or certifications?",
          type: "single",
          required: true,
          options: [
            { id: "q6-o1", text: "Yes", value: "yes" },
            { id: "q6-o2", text: "No", value: "no" }
          ],
          subQuestions: [
            {
              id: "q6-sub1",
              text: "Which compliance standards must be met?",
              type: "multiple",
              required: true,
              options: [
                { id: "q6-sub1-o1", text: "ISO", value: "iso" },
                { id: "q6-sub1-o2", text: "HIPAA", value: "hipaa" },
                { id: "q6-sub1-o3", text: "GDPR", value: "gdpr" },
                { id: "q6-sub1-o4", text: "SOX", value: "sox" },
                { id: "q6-sub1-o5", text: "Other", value: "other" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "section-functional-modules",
      title: "Modules & Features",
      description: "Select the functional areas you need.",
      questions: [
        {
          id: "q7",
          text: "Which core ERP modules do you need?",
          type: "multiple",
          required: true,
          options: [
            { id: "q7-o1", text: "Finance & Accounting", value: "finance" },
            { id: "q7-o2", text: "Inventory Management", value: "inventory" },
            { id: "q7-o3", text: "Sales & CRM", value: "sales" },
            { id: "q7-o4", text: "Purchase Management", value: "purchase" },
            { id: "q7-o5", text: "HR & Payroll", value: "hr" },
            { id: "q7-o6", text: "Manufacturing / Production", value: "manufacturing" },
            { id: "q7-o7", text: "Project Management", value: "projects" },
            { id: "q7-o8", text: "Service Management", value: "service" }
          ]
        },
        {
          id: "q8",
          text: "What features do you need within Finance & Accounting?",
          type: "multiple",
          required: false,
          options: [
            { id: "q8-o1", text: "General Ledger", value: "gl" },
            { id: "q8-o2", text: "Accounts Payable", value: "ap" },
            { id: "q8-o3", text: "Accounts Receivable", value: "ar" },
            { id: "q8-o4", text: "Bank Reconciliation", value: "bank" },
            { id: "q8-o5", text: "Multi-currency support", value: "multi-currency" },
            { id: "q8-o6", text: "Tax & VAT Management", value: "tax" }
          ]
        },
        {
          id: "q9",
          text: "Do you need custom workflows or automation?",
          type: "single",
          required: true,
          options: [
            { id: "q9-o1", text: "Yes, fully customizable workflows", value: "custom" },
            { id: "q9-o2", text: "Basic process templates are enough", value: "basic" },
            { id: "q9-o3", text: "No workflow automation needed", value: "none" }
          ]
        }
      ]
    }
  ]
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