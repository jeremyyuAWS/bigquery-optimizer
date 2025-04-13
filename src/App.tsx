import { useState } from 'react';
import { 
  LineChart, 
  Sliders, 
  AlertTriangle, 
  BookOpen, 
  DollarSign, 
  Zap, 
  Shield, 
  PieChart, 
  BarChart3,
  Clock,
  Brain,
  CheckCircle2,
  TrendingUp,
  Code,
  Calendar,
  FileText,
  HardDrive,
  RefreshCw,
  FileCog,
  Bell,
  Database,
  ArrowUpDown,
  ChevronDown,
  PanelLeft,
  Layers,
  BarChart2,
  Search,
  UserCheck,
  Lock,
  FileWarning,
  AlertOctagon,
  Eye,
  EyeOff,
  Users,
  Server,
  HardDriveDownload,
  ClipboardList,
  ExternalLink,
  BarChart as BarChartIcon,
  Database as DatabaseIcon,
  Settings,
  Save
} from 'lucide-react';
import { format, addMonths } from 'date-fns';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  Cell,
  PieChart as RechartsPieChart,
  Pie,
  Legend,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { basicLight } from '@uiw/codemirror-theme-basic';

// Sample data for charts
const costTrendData = [
  { name: 'Jan', actual: 4000, predicted: 4500 },
  { name: 'Feb', actual: 3800, predicted: 4000 },
  { name: 'Mar', actual: 5000, predicted: 4700 },
  { name: 'Apr', actual: 4500, predicted: 4800 },
  { name: 'May', actual: 4200, predicted: 4300 },
  { name: 'Jun', actual: 5500, predicted: 5000 },
];

const queryPerformanceData = [
  { name: 'Query 1', before: 120, after: 45 },
  { name: 'Query 2', before: 90, after: 38 },
  { name: 'Query 3', before: 180, after: 60 },
  { name: 'Query 4', before: 80, after: 35 },
  { name: 'Query 5', before: 150, after: 50 },
];

const roiDistributionData = [
  { name: 'High ROI', value: 45, color: '#22c55e' },
  { name: 'Medium ROI', value: 30, color: '#eab308' },
  { name: 'Low ROI', value: 25, color: '#ef4444' },
];

const queryPatternData = [
  { name: 'Jan', optimized: 25, unoptimized: 85 },
  { name: 'Feb', optimized: 35, unoptimized: 75 },
  { name: 'Mar', optimized: 45, unoptimized: 65 },
  { name: 'Apr', optimized: 60, unoptimized: 50 },
  { name: 'May', optimized: 75, unoptimized: 35 },
  { name: 'Jun', optimized: 85, unoptimized: 25 },
];

// Predictive cost data for future months
const predictiveCostData = [
  { name: 'Jul', predicted: 5800, optimized: 3900, storage: 1200, compute: 4600 },
  { name: 'Aug', predicted: 6200, optimized: 4100, storage: 1300, compute: 4900 },
  { name: 'Sep', predicted: 6500, optimized: 4300, storage: 1400, compute: 5100 },
  { name: 'Oct', predicted: 7100, optimized: 4600, storage: 1500, compute: 5600 },
  { name: 'Nov', predicted: 7800, optimized: 5000, storage: 1600, compute: 6200 },
  { name: 'Dec', predicted: 8500, optimized: 5400, storage: 1700, compute: 6800 },
];

// Historical optimization savings
const optimizationHistoryData = [
  { month: 'Jan', savings: 12000, queries: 450 },
  { month: 'Feb', savings: 15000, queries: 520 },
  { month: 'Mar', savings: 18000, queries: 580 },
  { month: 'Apr', savings: 22000, queries: 640 },
  { month: 'May', savings: 25000, queries: 710 },
  { month: 'Jun', savings: 28000, queries: 790 },
];

// Cost optimization data
const costOptimizationData = [
  { name: 'Jan', onDemand: 42000, flatRate: 35000 },
  { name: 'Feb', onDemand: 44000, flatRate: 35000 },
  { name: 'Mar', onDemand: 48000, flatRate: 35000 },
  { name: 'Apr', onDemand: 45000, flatRate: 35000 },
  { name: 'May', onDemand: 50000, flatRate: 35000 },
  { name: 'Jun', onDemand: 55000, flatRate: 35000 },
];

// Storage cost data
const storageCostData = [
  { name: 'Jan', active: 8500, longTerm: 1200 },
  { name: 'Feb', active: 9200, longTerm: 1500 },
  { name: 'Mar', active: 10100, longTerm: 1800 },
  { name: 'Apr', active: 11000, longTerm: 2200 },
  { name: 'May', active: 12400, longTerm: 2800 },
  { name: 'Jun', active: 13800, longTerm: 3500 },
];

// Table-level cost data
const tableStorageData = [
  { 
    name: 'analytics.events', 
    size: 2400, 
    rows: 450000000, 
    monthlyGrowth: 180,
    lastAccessed: 'Today',
    monthlyCost: 1200,
    optimizationPotential: 45
  },
  { 
    name: 'marketing.campaigns', 
    size: 860, 
    rows: 12000000, 
    monthlyGrowth: 58,
    lastAccessed: '2 days ago',
    monthlyCost: 430,
    optimizationPotential: 22
  },
  { 
    name: 'users.profiles', 
    size: 1850, 
    rows: 85000000, 
    monthlyGrowth: 120,
    lastAccessed: 'Today',
    monthlyCost: 925,
    optimizationPotential: 65
  },
  { 
    name: 'sales.transactions', 
    size: 4200, 
    rows: 780000000, 
    monthlyGrowth: 320,
    lastAccessed: 'Today',
    monthlyCost: 2100,
    optimizationPotential: 78
  },
  { 
    name: 'product.features', 
    size: 350, 
    rows: 2500000, 
    monthlyGrowth: 25,
    lastAccessed: '1 week ago',
    monthlyCost: 175,
    optimizationPotential: 12
  },
];

// Slots data
const slotUsageData = [
  { time: '12AM', usage: 12, capacity: 100 },
  { time: '2AM', usage: 8, capacity: 100 },
  { time: '4AM', usage: 5, capacity: 100 },
  { time: '6AM', usage: 10, capacity: 100 },
  { time: '8AM', usage: 45, capacity: 100 },
  { time: '10AM', usage: 78, capacity: 100 },
  { time: '12PM', usage: 85, capacity: 100 },
  { time: '2PM', usage: 90, capacity: 100 },
  { time: '4PM', usage: 95, capacity: 100 },
  { time: '6PM', usage: 65, capacity: 100 },
  { time: '8PM', usage: 40, capacity: 100 },
  { time: '10PM', usage: 22, capacity: 100 },
];

// Cost optimization recommendations
const costOptimizationRecommendations = [
  {
    id: 1,
    title: "Switch to Capacity-based Pricing Model",
    description: "Based on your current and projected workload, moving to a capacity-based pricing model could reduce costs by up to 35%.",
    savings: "$18,500/month",
    effort: "Medium",
    impact: "High",
    category: "Pricing Model"
  },
  {
    id: 2,
    title: "Implement Table Partitioning",
    description: "Partitioning large tables by date would significantly reduce query costs by limiting scanned data.",
    savings: "$12,800/month",
    effort: "Low",
    impact: "High", 
    category: "Storage Optimization"
  },
  {
    id: 3,
    title: "Archive Cold Data",
    description: "Move infrequently accessed data older than 90 days to long-term storage to reduce active storage costs.",
    savings: "$5,400/month",
    effort: "Low",
    impact: "Medium",
    category: "Storage Optimization"
  },
  {
    id: 4,
    title: "Consolidate Redundant Queries",
    description: "Multiple teams are running similar queries. Implement shared results to eliminate redundant processing.",
    savings: "$9,600/month",
    effort: "Medium",
    impact: "Medium",
    category: "Query Optimization"
  },
  {
    id: 5,
    title: "Optimize Slot Allocation",
    description: "Current slot utilization is uneven throughout the day. Implementing auto-scaling can optimize resource usage.",
    savings: "$7,200/month", 
    effort: "High",
    impact: "Medium",
    category: "Resource Management"
  }
];

// Idle resource data
const idleResourceData = [
  {
    name: "analytics.historical_events",
    type: "Table",
    lastAccessed: "185 days ago",
    size: "8.4 TB",
    monthlyCost: "$840",
    recommendation: "Archive to long-term storage",
    savings: "$630/month"
  },
  {
    name: "Daily Sales Report",
    type: "Scheduled Query",
    lastAccessed: "Active (Daily)",
    size: "Processes 2.8 TB/run",
    monthlyCost: "$525",
    recommendation: "Optimize query to reduce data scanned",
    savings: "$420/month"
  },
  {
    name: "marketing.campaign_2023",
    type: "Table",
    lastAccessed: "241 days ago",
    size: "1.2 TB",
    monthlyCost: "$120",
    recommendation: "Archive or delete",
    savings: "$120/month"
  },
  {
    name: "product.legacy_metrics",
    type: "View",
    lastAccessed: "152 days ago",
    size: "N/A (View)",
    monthlyCost: "$0",
    recommendation: "Remove if obsolete",
    savings: "Operational simplification"
  },
];

// Pricing comparison
const pricingComparisonData = [
  {
    category: "Query Costs",
    onDemand: {
      description: "$6.25 per TB",
      monthlyCost: "$32,500",
      bestFor: "Unpredictable, low-volume workloads",
      considerations: "Costs scale linearly with data processed"
    },
    flatRate: {
      description: "100 slots at $20/slot/hour",
      monthlyCost: "$48,000",
      bestFor: "Predictable, high-volume workloads",
      considerations: "Fixed cost regardless of usage, becomes more cost-effective above certain volume"
    }
  },
  {
    category: "Storage Costs",
    onDemand: {
      description: "Active: $0.02/GB/month, Long-term: $0.01/GB/month",
      monthlyCost: "$14,500",
      bestFor: "All storage needs",
      considerations: "Implement lifecycle policies to move cold data to long-term storage"
    },
    flatRate: {
      description: "Same as on-demand",
      monthlyCost: "$14,500", 
      bestFor: "All storage needs",
      considerations: "Storage costs remain separate from compute costs"
    }
  },
  {
    category: "Total Costs",
    onDemand: {
      description: "Pay only for what you use",
      monthlyCost: "$47,000",
      bestFor: "Organizations with <50% slot utilization",
      considerations: "Unpredictable monthly costs"
    },
    flatRate: {
      description: "Predictable monthly bill",
      monthlyCost: "$62,500",
      bestFor: "Organizations with >70% slot utilization",
      considerations: "Higher cost for predictability and performance"
    }
  }
];

// Sample analyzed query data
const analyzedQueriesData = [
  {
    id: 1,
    name: "Daily User Activity",
    originalQuery: `SELECT * FROM user_events 
WHERE event_date > '2025-01-01'`,
    optimizedQuery: `SELECT user_id, event_type, event_timestamp 
FROM user_events
WHERE event_date BETWEEN '2025-01-01' AND '2025-06-30'
AND user_id IS NOT NULL`,
    savings: 68,
    bytesProcessed: { original: "2.4 TB", optimized: "780 GB" },
    estimatedCost: { original: "$15.00", optimized: "$4.80" },
    executionTime: { original: "45s", optimized: "18s" },
    issues: [
      { type: "SELECT *", severity: "high", description: "Using SELECT * processes all columns unnecessarily" },
      { type: "Missing upper bound", severity: "medium", description: "Date range lacks an upper bound" },
      { type: "No NULL filtering", severity: "low", description: "No filtering for NULL user_ids" },
    ]
  },
  {
    id: 2,
    name: "Product Analytics Dashboard",
    originalQuery: `SELECT product_id, SUM(quantity) as total_sold
FROM orders
WHERE order_date >= '2025-01-01'
GROUP BY product_id`,
    optimizedQuery: `SELECT product_id, SUM(quantity) as total_sold
FROM orders
WHERE order_date BETWEEN '2025-01-01' AND CURRENT_DATE()
AND status = 'completed'
GROUP BY product_id`,
    savings: 42,
    bytesProcessed: { original: "1.8 TB", optimized: "1.05 TB" },
    estimatedCost: { original: "$11.25", optimized: "$6.50" },
    executionTime: { original: "38s", optimized: "24s" },
    issues: [
      { type: "Missing filter", severity: "medium", description: "No filter on order status" },
      { type: "Missing upper bound", severity: "medium", description: "Date range lacks an upper bound" },
    ]
  },
  {
    id: 3,
    name: "Marketing Campaign Analysis",
    originalQuery: `SELECT 
  campaign_id,
  (SELECT COUNT(*) FROM clicks c WHERE c.campaign_id = campaigns.campaign_id) as total_clicks,
  (SELECT SUM(amount) FROM conversions cv WHERE cv.campaign_id = campaigns.campaign_id) as total_revenue
FROM campaigns`,
    optimizedQuery: `SELECT
  c.campaign_id,
  COUNT(cl.click_id) as total_clicks,
  SUM(COALESCE(cv.amount, 0)) as total_revenue
FROM campaigns c
LEFT JOIN clicks cl ON c.campaign_id = cl.campaign_id
LEFT JOIN conversions cv ON c.campaign_id = cv.campaign_id
GROUP BY c.campaign_id`,
    savings: 85,
    bytesProcessed: { original: "4.2 TB", optimized: "620 GB" },
    estimatedCost: { original: "$26.25", optimized: "$3.90" },
    executionTime: { original: "95s", optimized: "22s" },
    issues: [
      { type: "Correlated subqueries", severity: "high", description: "Using inefficient correlated subqueries instead of JOINs" },
      { type: "No date filter", severity: "medium", description: "Missing date range filtering" },
      { type: "No COALESCE", severity: "low", description: "Not handling NULL values properly" },
    ]
  }
];

// Sample integrations data
const integrationOptions = [
  {
    id: "bigquery",
    name: "Google BigQuery",
    icon: "/src/public/images/bigquery-svgrepo-com.svg",
    status: "Connected",
    projects: ["analytics-prod", "marketing-data", "finance-reports"],
    lastSync: "2 hours ago"
  },
  {
    id: "snowflake",
    name: "Snowflake",
    icon: "https://www.svgrepo.com/show/331567/snowflake.svg",
    status: "Available",
    projects: [],
    lastSync: null
  },
  {
    id: "redshift",
    name: "Amazon Redshift",
    icon: "https://www.svgrepo.com/show/376356/aws-redshift.svg",
    status: "Available",
    projects: [],
    lastSync: null
  },
  {
    id: "azure",
    name: "Azure Synapse",
    icon: "https://www.svgrepo.com/show/448271/azure-synapse-analytics.svg",
    status: "Available",
    projects: [],
    lastSync: null
  }
];

// Sample scheduled optimizations
const scheduledOptimizations = [
  {
    id: 1,
    name: "Daily Performance Report",
    schedule: "Daily at 6:00 AM",
    lastRun: "Today, 6:00 AM",
    status: "Success",
    actions: ["Generate Report", "Send Email", "Update Dashboard"]
  },
  {
    id: 2,
    name: "Weekly Optimization Scan",
    schedule: "Every Monday at 12:00 AM",
    lastRun: "Jun 24, 2025, 12:00 AM",
    status: "Success",
    actions: ["Scan Queries", "Suggest Optimizations", "Update Metrics"]
  },
  {
    id: 3,
    name: "Monthly Cost Forecast",
    schedule: "1st of every month, 1:00 AM",
    lastRun: "Jun 1, 2025, 1:00 AM",
    status: "Success",
    actions: ["Generate Forecast", "Update Budget Alerts", "Send Report"]
  },
  {
    id: 4,
    name: "Auto-optimize Marketing Queries",
    schedule: "Every Wed, Fri at 8:00 PM",
    lastRun: "Jun 26, 2025, 8:00 PM",
    status: "Partial Success",
    actions: ["Identify Issues", "Apply Optimizations", "Generate Report"]
  }
];

// Budget alerts
const budgetAlerts = [
  {
    id: 1,
    name: "Monthly Budget Limit",
    threshold: "$50,000",
    current: "$42,800",
    percentage: 85.6,
    status: "Warning"
  },
  {
    id: 2,
    name: "Marketing Department Cap",
    threshold: "$15,000",
    current: "$9,200",
    percentage: 61.3,
    status: "Healthy"
  },
  {
    id: 3,
    name: "Query Cost Per Execution",
    threshold: "$25",
    current: "$18",
    percentage: 72,
    status: "Healthy"
  },
  {
    id: 4,
    name: "Daily Spend Limit",
    threshold: "$2,000",
    current: "$1,950",
    percentage: 97.5,
    status: "Critical"
  }
];

// ROI analysis data
const businessImpactData = [
  { name: 'Website Traffic', roi: 75, improvement: '+42%', cost: '$8,400', value: '$14,500' },
  { name: 'Product Analytics', roi: 92, improvement: '+65%', cost: '$10,200', value: '$19,600' },
  { name: 'Marketing Campaigns', roi: 68, improvement: '+38%', cost: '$7,500', value: '$12,600' },
  { name: 'Sales Pipeline', roi: 82, improvement: '+57%', cost: '$9,300', value: '$16,900' },
  { name: 'Customer Support', roi: 64, improvement: '+32%', cost: '$6,800', value: '$11,200' },
];

// Query ROI distribution data
const queryRoiData = [
  { x: 5000, y: 450, z: 22, name: 'Marketing Dashboard', category: 'Marketing' },
  { x: 12000, y: 320, z: 28, name: 'Sales Pipeline', category: 'Sales' },
  { x: 8500, y: 280, z: 30, name: 'Product Usage', category: 'Product' },
  { x: 4000, y: 180, z: 12, name: 'Customer Service', category: 'Support' },
  { x: 6000, y: 220, z: 15, name: 'User Activity', category: 'Product' },
  { x: 9500, y: 300, z: 26, name: 'Campaign Performance', category: 'Marketing' },
  { x: 11000, y: 380, z: 32, name: 'Revenue Forecast', category: 'Finance' },
  { x: 7200, y: 240, z: 18, name: 'Inventory Tracking', category: 'Operations' },
];

// Department ROI comparison
const departmentRoiData = [
  { subject: 'Query Efficiency', A: 80, B: 65, C: 90, D: 55, fullMark: 100 },
  { subject: 'Cost Reduction', A: 75, B: 70, C: 60, D: 85, fullMark: 100 },
  { subject: 'Business Value', A: 65, B: 80, C: 75, D: 60, fullMark: 100 },
  { subject: 'Data Quality', A: 70, B: 60, C: 85, D: 75, fullMark: 100 },
  { subject: 'Insight Generation', A: 85, B: 75, C: 65, D: 80, fullMark: 100 },
];

// Data protection metrics
const dataProtectionMetrics = [
  { name: 'Jan', piiDetected: 145, vulnerabilities: 32, compliantQueries: 85, nonCompliantQueries: 15 },
  { name: 'Feb', piiDetected: 128, vulnerabilities: 28, compliantQueries: 88, nonCompliantQueries: 12 },
  { name: 'Mar', piiDetected: 165, vulnerabilities: 38, compliantQueries: 82, nonCompliantQueries: 18 },
  { name: 'Apr', piiDetected: 142, vulnerabilities: 25, compliantQueries: 90, nonCompliantQueries: 10 },
  { name: 'May', piiDetected: 154, vulnerabilities: 30, compliantQueries: 87, nonCompliantQueries: 13 },
  { name: 'Jun', piiDetected: 168, vulnerabilities: 35, compliantQueries: 84, nonCompliantQueries: 16 },
];

// Compliance frameworks
const complianceFrameworks = [
  {
    id: 1,
    name: 'GDPR',
    description: 'General Data Protection Regulation',
    status: 'Compliant',
    lastAudit: 'Jun 15, 2025',
    nextAudit: 'Dec 15, 2025',
    rules: [
      { name: 'Data Minimization', status: 'Passed', description: 'Only necessary data is collected and processed' },
      { name: 'Data Retention', status: 'Passed', description: 'Data is not kept longer than necessary' },
      { name: 'Right to Access', status: 'Passed', description: 'Data subjects can access their personal data' },
      { name: 'Cross-border Transfer', status: 'Warning', description: 'Some data transfers may not be fully compliant' }
    ]
  },
  {
    id: 2,
    name: 'HIPAA',
    description: 'Health Insurance Portability and Accountability Act',
    status: 'Partial Compliance',
    lastAudit: 'May 28, 2025',
    nextAudit: 'Nov 28, 2025',
    rules: [
      { name: 'PHI Access Controls', status: 'Passed', description: 'Protected health information is properly secured' },
      { name: 'Audit Controls', status: 'Passed', description: 'All access to PHI is logged and auditable' },
      { name: 'Transmission Security', status: 'Failed', description: 'Some transmissions lack proper encryption' },
      { name: 'Business Associate Agreements', status: 'Passed', description: 'All third parties have signed BAAs' }
    ]
  },
  {
    id: 3,
    name: 'SOC 2',
    description: 'Service Organization Control 2',
    status: 'Compliant',
    lastAudit: 'Apr 10, 2025',
    nextAudit: 'Oct 10, 2025',
    rules: [
      { name: 'Security', status: 'Passed', description: 'Systems are protected against unauthorized access' },
      { name: 'Availability', status: 'Passed', description: 'Systems are available for operation as committed' },
      { name: 'Processing Integrity', status: 'Passed', description: 'Processing is complete, accurate, and authorized' },
      { name: 'Confidentiality', status: 'Passed', description: 'Information designated as confidential is protected' }
    ]
  }
];

// PII detection data
const piiDetectionData = [
  {
    id: 1,
    query: `SELECT user_id, email, phone_number, address FROM users WHERE signup_date > '2025-01-01'`,
    detectedPII: [
      { type: 'Email', column: 'email', severity: 'High', recommendation: 'Apply masking or encryption' },
      { type: 'Phone Number', column: 'phone_number', severity: 'High', recommendation: 'Apply masking or encryption' },
      { type: 'Address', column: 'address', severity: 'Medium', recommendation: 'Consider geocoding or partial masking' }
    ],
    lastRun: 'Jun 28, 2025',
    dataset: 'marketing.users',
    user: 'john.doe@example.com'
  },
  {
    id: 2,
    query: `SELECT customer_id, credit_card_num, purchase_amount FROM transactions WHERE transaction_date > '2025-05-01'`,
    detectedPII: [
      { type: 'Credit Card Number', column: 'credit_card_num', severity: 'Critical', recommendation: 'Apply full encryption or tokenization' }
    ],
    lastRun: 'Jun 27, 2025',
    dataset: 'finance.transactions',
    user: 'mary.smith@example.com'
  },
  {
    id: 3,
    query: `SELECT patient_id, diagnosis_code, treatment_plan FROM patient_records WHERE visit_date > '2025-04-01'`,
    detectedPII: [
      { type: 'Health Information', column: 'diagnosis_code', severity: 'Critical', recommendation: 'Apply HIPAA-compliant controls' },
      { type: 'Health Information', column: 'treatment_plan', severity: 'Critical', recommendation: 'Apply HIPAA-compliant controls' }
    ],
    lastRun: 'Jun 26, 2025',
    dataset: 'healthcare.patient_records',
    user: 'dr.jones@example.com'
  }
];

// Unusual access patterns
const unusualAccessPatterns = [
  {
    id: 1,
    user: 'alice.johnson@example.com',
    dataset: 'finance.salary_data',
    accessTime: 'Jun 28, 2025, 23:45 PM',
    normalPattern: 'Rarely accesses finance data',
    riskLevel: 'High',
    action: 'Flagged for review'
  },
  {
    id: 2,
    user: 'bob.smith@example.com',
    dataset: 'hr.employee_records',
    accessTime: 'Jun 27, 2025, 02:30 AM',
    normalPattern: 'Unusual access time (outside business hours)',
    riskLevel: 'Medium',
    action: 'Monitoring'
  },
  {
    id: 3,
    user: 'data_pipeline@example.com',
    dataset: 'marketing.customer_profiles',
    accessTime: 'Jun 26, 2025, 14:22 PM',
    normalPattern: 'Service account accessing unexpected dataset',
    riskLevel: 'Medium',
    action: 'Pipeline configuration review'
  }
];

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('overview');
  const [sampleQuery, setSampleQuery] = useState(`SELECT * 
FROM analytics.user_events
WHERE event_date > '2025-01-01'`);
  
  const [selectedQueryId, setSelectedQueryId] = useState(1);
  const selectedQuery = analyzedQueriesData.find(q => q.id === selectedQueryId);
  
  const [activePricingTab, setActivePricingTab] = useState('comparison');

  const renderIdleResourcesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Idle Resources</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Accessed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommendation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Potential Savings</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {idleResourceData.map((resource, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{resource.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resource.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resource.lastAccessed}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resource.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resource.monthlyCost}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resource.recommendation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">{resource.savings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <Database className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">QueryGenius</span>
          </div>
          <nav className="mt-8">
            <div className="space-y-1">
              <button
                onClick={() => setActivePage('dashboard')}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md w-full ${
                  activePage === 'dashboard'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <LineChart className="mr-3 h-5 w-5" />
                Dashboard
              </button>
              <button
                onClick={() => setActivePage('idle-resources')}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md w-full ${
                  activePage === 'idle-resources'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <HardDrive className="mr-3 h-5 w-5" />
                Idle Resources
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activePage === 'dashboard' && (
          <div className="space-y-6">
            {/* Dashboard content */}
          </div>
        )}
        {activePage === 'idle-resources' && renderIdleResourcesTab()}
      </div>
    </div>
  );
}

export default App;