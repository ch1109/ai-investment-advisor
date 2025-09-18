// 投资目标类型
export interface InvestmentGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAge: number;
  targetAge: number;
  riskLevel: 'conservative' | 'moderate' | 'aggressive';
}

// 投资规划结果
export interface PlanningResult {
  successRate: number;
  monthlyInvestment: number;
  riskLevelKey: string;
  riskLevel?: string;
  assetAllocation: AssetAllocation[];
  projectionData: ProjectionData[];
  productRecommendations?: ProductRecommendations;
}

// 产品推荐
export interface ProductRecommendation {
  name: string;
  reason: string;
  expectedReturn: string;
}

export interface ProductRecommendations {
  equityFunds: ProductRecommendation[];
  bondFunds: ProductRecommendation[];
  moneyMarket: ProductRecommendation[];
  alternative: ProductRecommendation[];
}

// 资产配置
export interface AssetAllocation {
  labelKey: string;
  label?: string;
  percentage: number;
  color: string;
}

// 投资预测数据
export interface ProjectionData {
  year: number;
  optimistic: number;
  neutral: number;
  pessimistic: number;
}

// 投资组合数据
export interface Portfolio {
  totalAssets: number;
  todayPnL: number;
  todayPnLPercentage: number;
  riskScore: number;
  holdings: Holding[];
  assetDistribution: AssetAllocation[];
}

// 持仓信息
export interface Holding {
  symbol: string;
  nameKey: string;
  name?: string;
  quantity: number;
  currentPrice: number;
  totalValue: number;
  pnl: number;
  pnlPercentage: number;
  type: 'stock' | 'fund' | 'bond' | 'crypto';
}

// 市场情绪数据
export interface MarketSentiment {
  index: number;
  level: 'fear' | 'neutral' | 'greed';
  descriptionKey: string;
  description?: string;
}

// 新闻事件
export interface NewsEvent {
  id: string;
  titleKey: string;
  summaryKey: string;
  aiInsightKey: string;
  categoryKey: string;
  impact: 'high' | 'medium' | 'low';
  date: string;
}

// 产品诊断结果
export interface ProductDiagnosis {
  productNameKey: string;
  productName?: string;
  overallScore: number;
  summaryKey: string;
  summary?: string;
  performance: PerformanceMetrics;
  risk: RiskMetrics;
  cost: CostMetrics;
  recommendations: ProductDiagnosisRecommendation[];
}

// 性能指标
export interface PerformanceMetrics {
  annualReturn: number;
  volatility: number;
  sharpeRatio: number;
  maxDrawdown: number;
}

// 风险指标
export interface RiskMetrics {
  riskLevel: number;
  beta: number;
  var: number;
}

// 成本指标
export interface CostMetrics {
  managementFee: number;
  performanceFee: number;
  totalExpenseRatio: number;
}

// 产品诊断推荐
export interface ProductDiagnosisRecommendation {
  nameKey: string;
  name?: string;
  score: number;
  advantagesKeys: string[];
  advantages?: string[];
  comparisonMetrics: {
    performance: number;
    risk: number;
    cost: number;
    liquidity: number;
  };
}
