import { 
  InvestmentGoal, 
  PlanningResult, 
  Portfolio, 
  MarketSentiment, 
  NewsEvent, 
  ProductDiagnosis 
} from '@/types';

// 投资目标数据
export const investmentGoals: InvestmentGoal[] = [
  {
    id: 'retirement',
    name: '退休规划',
    targetAmount: 2000000,
    currentAge: 30,
    targetAge: 60,
    riskLevel: 'moderate'
  },
  {
    id: 'house',
    name: '购房计划',
    targetAmount: 1000000,
    currentAge: 28,
    targetAge: 35,
    riskLevel: 'conservative'
  },
  {
    id: 'education',
    name: '教育金储备',
    targetAmount: 500000,
    currentAge: 32,
    targetAge: 50,
    riskLevel: 'moderate'
  }
];

// 投资规划结果
export const planningResult: PlanningResult = {
  successRate: 85,
  monthlyInvestment: 3500,
  riskLevelKey: 'balanced',
  riskLevel: '稳健型',
  assetAllocation: [
    {labelKey: 'equityFunds', label: '股票基金', percentage: 40, color: '#3B82F6'},
    {labelKey: 'bondFunds', label: '债券基金', percentage: 30, color: '#10B981'},
    {labelKey: 'moneyMarket', label: '货币基金', percentage: 20, color: '#F59E0B'},
    {labelKey: 'alternative', label: '另类投资', percentage: 10, color: '#8B5CF6'}
  ],
  projectionData: [
    { year: 2024, optimistic: 50000, neutral: 42000, pessimistic: 35000 },
    { year: 2029, optimistic: 280000, neutral: 240000, pessimistic: 200000 },
    { year: 2034, optimistic: 650000, neutral: 580000, pessimistic: 480000 },
    { year: 2039, optimistic: 1200000, neutral: 1050000, pessimistic: 850000 },
    { year: 2044, optimistic: 1950000, neutral: 1680000, pessimistic: 1350000 },
    { year: 2049, optimistic: 2800000, neutral: 2400000, pessimistic: 1900000 },
    { year: 2054, optimistic: 3800000, neutral: 3200000, pessimistic: 2500000 }
  ]
};

// 投资组合数据
export const portfolioData: Portfolio = {
  totalAssets: 1250000,
  todayPnL: 15600,
  todayPnLPercentage: 1.26,
  riskScore: 7.2,
  holdings: [
    {
      symbol: 'AAPL',
      nameKey: 'apple',
      name: '苹果公司',
      quantity: 100,
      currentPrice: 175.50,
      totalValue: 17550,
      pnl: 850,
      pnlPercentage: 5.09,
      type: 'stock'
    },
    {
      symbol: '000001',
      nameKey: 'chinaGrowthFund',
      name: '华夏成长混合',
      quantity: 50000,
      currentPrice: 2.45,
      totalValue: 122500,
      pnl: -2300,
      pnlPercentage: -1.84,
      type: 'fund'
    },
    {
      symbol: 'TSLA',
      nameKey: 'tesla',
      name: '特斯拉',
      quantity: 50,
      currentPrice: 245.80,
      totalValue: 12290,
      pnl: 1290,
      pnlPercentage: 11.72,
      type: 'stock'
    }
  ],
  assetDistribution: [
    {labelKey: 'stocks', label: '股票', percentage: 45, color: '#EF4444'},
    {labelKey: 'funds', label: '基金', percentage: 35, color: '#3B82F6'},
    {labelKey: 'bonds', label: '债券', percentage: 15, color: '#10B981'},
    {labelKey: 'cash', label: '现金', percentage: 5, color: '#F59E0B'}
  ]
};

// 市场情绪数据
export const marketSentiment: MarketSentiment = {
  index: 75,
  level: 'greed',
  descriptionKey: 'elevatedRisk',
  description: '当前市场情绪偏高，短期回调风险增加。'
};

// 新闻事件数据
export const newsEvents: NewsEvent[] = [
  {
    id: '1',
    titleKey: 'centralBankRateCut.title',
    summaryKey: 'centralBankRateCut.summary',
    aiInsightKey: 'centralBankRateCut.aiInsight',
    categoryKey: 'monetaryPolicy',
    impact: 'high',
    date: '2024-01-15'
  },
  {
    id: '2',
    titleKey: 'portfolioFundEarnings.title',
    summaryKey: 'portfolioFundEarnings.summary',
    aiInsightKey: 'portfolioFundEarnings.aiInsight',
    categoryKey: 'portfolioHoldings',
    impact: 'medium',
    date: '2024-01-14'
  }
];

// 详细新闻总结数据
type LocalizedText = {
  zh: string;
  ja: string;
};

type DetailedNewsInsightItem = {
  title: LocalizedText;
  summary: LocalizedText;
  aiAdvice: LocalizedText;
  date: LocalizedText;
};

const createLocalized = (zh: string, ja: string): LocalizedText => ({zh, ja});

export const detailedNewsInsights: Record<string, DetailedNewsInsightItem[]> = {
  macroPolicy: [
    {
      title: createLocalized(
        '日本第二季度GDP上修至年化2.2%，内需成为增长核心',
        '日本の第2四半期GDPが年率2.2%に上方修正、内需が成長を牽引'
      ),
      summary: createLocalized(
        '内阁府将第二季度GDP增速上修至年化2.2%，设备投资与个人消费展现韧性，经济动能正从出口向内需切换。',
        '内閣府は第2四半期の実質GDP成長率を年率2.2%へ上方修正。設備投資と個人消費が想定以上に堅調で、成長エンジンが輸出から内需へ移行しつつあります。'
      ),
      aiAdvice: createLocalized(
        '建议提高对零售、服务与企业数字化板块的配置权重，同时在宏观情景中纳入全球需求放缓对出口企业盈利的压力。',
        '小売・サービス・省力化投資関連セクターへの配分を高め、世界需要減速が輸出企業の利益に与える影響をシナリオに織り込みましょう。'
      ),
      date: createLocalized('2025年9月8日', '2025年9月8日')
    },
    {
      title: createLocalized(
        '美联储开启降息周期，政策分化推高汇率波动',
        'FRBが利下げサイクル入り、政策分化が為替変動を拡大'
      ),
      summary: createLocalized(
        'FOMC下调联邦基金利率25个基点，并暗示年内或再降两次，全球货币政策分化进一步扩大。',
        'FOMCは政策金利を25bp引き下げ、年内に追加利下げの可能性を示唆。主要中銀の政策スタンスは一段と分岐しています。'
      ),
      aiAdvice: createLocalized(
        '建议对冲美元/日元汇率敞口，并重新评估资产配置在政策分化情景下的风险预算。',
        'ドル／円の為替リスクをヘッジし、政策分化シナリオ下でのアセットアロケーションとリスクバジェットを再点検しましょう。'
      ),
      date: createLocalized('2025年9月17日', '2025年9月17日')
    }
  ],
  industryGeopolitics: [
    {
      title: createLocalized(
        '美中半导体摩擦升级，供应链进入不可逆重构',
        '米中の半導体摩擦が激化、サプライチェーンは不可逆な再編へ'
      ),
      summary: createLocalized(
        '美国拟对未回流产能的企业征收高关税，中国同步启动对美国半导体企业的调查，行业面临长期战略调整。',
        '米国は国内回帰しない企業の半導体に高関税を検討、中国は米半導体企業への調査を開始し、業界は長期的な戦略調整を迫られています。'
      ),
      aiAdvice: createLocalized(
        '建议增持受日本政策扶持的本土半导体设备与材料商，并建立地缘风险监测清单管理供应链敞口。',
        '日本の政策支援を受ける半导体装置・材料メーカーへの投資を検討し、地政学リスクをモニタリングする供給網管理を構築しましょう。'
      ),
      date: createLocalized('2025年9月15日', '2025年9月15日')
    },
    {
      title: createLocalized(
        '日本提供5360亿日元补贴支持美光扩产尖端存储',
        '日本政府が5,360億円の補助でマイクロンの広島工場を拡張支援'
      ),
      summary: createLocalized(
        '经产省资助美光升级广岛工厂，强化AI与自动驾驶所需存储芯片产能，巩固国内战略供应链。',
        '経産省はAI・自動運転向け先端メモリの国内生産力強化を狙い、マイクロンの設備更新と増産を支援します。'
      ),
      aiAdvice: createLocalized(
        '关注美光本土供应链企业及其它可能获得政府补贴的战略性行业，提前布局“地缘政治资本开支”主题。',
        'マイクロンの国内サプライチェーン企業や同様の政府支援が見込まれる戦略産業を早期に調査し、「地政学的CAPEX」テーマの投資機会を探りましょう。'
      ),
      date: createLocalized('2025年9月12日', '2025年9月12日')
    },
    {
      title: createLocalized(
        '日欧能源对话聚焦安全的清洁能源供应链',
        '日欧エネルギー対話が安全なクリーンエネルギー供給網構築で一致'
      ),
      summary: createLocalized(
        '日本与欧盟决定在风电、太阳能与氢能等领域深化合作，构建具韧性的跨区域清洁能源网络。',
        '日本とEUは風力・太陽光・水素での協力を強化し、特定国家への依存を減らすレジリエントな供給網を構築する方針です。'
      ),
      aiAdvice: createLocalized(
        '建议在ESG框架中纳入经济安全维度，筛选能够切入“安全绿色供应链”的企业建立长期持仓。',
        'ESG評価に経済安全保障の視点を組み込み、「安全でグリーンな供給網」に位置付けられる企業への長期投資を検討しましょう。'
      ),
      date: createLocalized('2025年9月16日', '2025年9月16日')
    }
  ],
  techRegulationSecurity: [
    {
      title: createLocalized(
        '微软修复81个漏洞，两枚零日暴露即时风险',
        'マイクロソフトが81件の脆弱性を修正、ゼロデイ2件に即応が必要'
      ),
      summary: createLocalized(
        '微软9月安全更新涵盖81个漏洞，其中9个为严重级别，零日漏洞可能已被利用。',
        '9月の月例パッチでクリティカルを含む81件の脆弱性を修正。ゼロデイは既に悪用されている可能性があります。'
      ),
      aiAdvice: createLocalized(
        '建议立即部署补丁并加强运行环境监控，同时以此案例向客户强化持续安全运营服务的重要性。',
        '速やかなパッチ適用と運用監視の強化に加え、継続的なセキュリティ運用サービスの重要性を顧客に訴求しましょう。'
      ),
      date: createLocalized('2025年9月9日', '2025年9月9日')
    },
    {
      title: createLocalized(
        'Windows 10将在2025年10月停止支持，企业面临安全迁移节点',
        'Windows 10が2025年10月でサポート終了、企業に安全な移行の期限'
      ),
      summary: createLocalized(
        '微软明确Windows 10停止支持时间，未来漏洞将不再修复，全球企业掀起系统更新浪潮。',
        'サポート終了後は新たな脆弱性が修正されず、世界的に大規模なシステム更新需要が発生しています。'
      ),
      aiAdvice: createLocalized(
        '建议设计“安全工作场所现代化”整体方案，将操作系统迁移、安全架构升级与托管服务打包输出。',
        'OS移行とゼロトラスト認証・セキュリティ設計、保守を一体化した「安全なワークプレイス現代化」サービスを提案しましょう。'
      ),
      date: createLocalized('2025年9月11日', '2025年9月11日')
    },
    {
      title: createLocalized(
        '联合国搭建全球AI治理双平台，监管框架成形',
        '国連がAIガバナンスの中核組織を設立、国際的な枠組みが始動'
      ),
      summary: createLocalized(
        '联合国成立独立科学小组与治理对话机制，为各国协调AI政策提供常设平台。',
        '国連総会は科学者パネルと政策対話メカニズムの二本柱を創設し、各国がAI政策を調整する常設プラットフォームを用意しました。'
      ),
      aiAdvice: createLocalized(
        '建议开发“AI治理即服务”产品，借助金融合规经验帮助客户应对跨国监管并转化为业务机会。',
        '金融コンプライアンスの知見を生かし、「AIガバナンス・アズ・ア・サービス」を開発して複雑化する規制対応を顧客の付加価値へ転換しましょう。'
      ),
      date: createLocalized('2025年9月3日', '2025年9月3日')
    }
  ],
  laborMarketStructure: [
    {
      title: createLocalized(
        '调查揭示日美技能差距，日本员工学习意愿不足',
        '日米で顕在化するスキルギャップ、日本では学習意欲の不足が課題'
      ),
      summary: createLocalized(
        'Indeed调研显示29.3%的日本员工缺乏学习意愿，明显高于美国的3.7%，人力资本成为潜在增长瓶颈。',
        'Indeedの調査で、日本では29.3%が「新たなスキル習得に意欲がない」と回答。人材力が成長のボトルネックになりつつあります。'
      ),
      aiAdvice: createLocalized(
        '在中长期预测中将人力资本质量列为关键约束，并建议企业将再培训视为战略投资。',
        '中長期シナリオに人材力の制約を組み込み、企業にはリスキリングへの戦略的投資を提案しましょう。'
      ),
      date: createLocalized('2025年9月18日', '2025年9月18日')
    },
    {
      title: createLocalized(
        'GMO Click证券推出零佣金，日本券商业模式加速重构',
        'GMOクリック証券が完全ゼロ手数料へ、証券ビジネスの再定義が加速'
      ),
      summary: createLocalized(
        'GMO Click宣布股票及基金交易全免佣，交易执行业务商品化趋势快速强化。',
        'GMOクリック証券は株式・投信の手数料を全面無料化。ブローカー業務のコモディティ化が急速に進んでいます。'
      ),
      aiAdvice: createLocalized(
        '强调DIR在研究、咨询与技术解决方案的战略价值，聚焦不可被商品化的高附加值服务以支撑盈利。',
        'DIRが持つリサーチ・コンサル・テクノロジーサービスなど非コモディティ領域の価値を強調し、収益源の再構築を支援しましょう。'
      ),
      date: createLocalized('2025年9月', '2025年9月')
    }
  ]
};
// 产品诊断数据
export const productDiagnosisData: ProductDiagnosis = {
  productNameKey: 'huaxiaGrowthFund',
  productName: '华夏成长混合基金',
  overallScore: 8.2,
  summaryKey: 'huaxiaGrowthFundSummary',
  summary: '该基金在成长股投资方面表现优异，风险控制能力较强，适合中长期投资。',
  performance: {
    annualReturn: 12.5,
    volatility: 18.2,
    sharpeRatio: 0.68,
    maxDrawdown: -15.3
  },
  risk: {
    riskLevel: 6.5,
    beta: 1.15,
    var: -2.8
  },
  cost: {
    managementFee: 1.5,
    performanceFee: 0,
    totalExpenseRatio: 1.65
  },
  recommendations: [
    {
      nameKey: 'yifangdaBluechipFund',
      name: '易方达蓝筹精选混合',
      score: 8.5,
      advantagesKeys: ['lowerFees', 'stablePerformance', 'betterRiskControl'],
      advantages: ['更低的费率', '更稳定的业绩', '更优秀的风控'],
      comparisonMetrics: {
        performance: 8.8,
        risk: 7.2,
        cost: 9.1,
        liquidity: 8.5
      }
    },
    {
      nameKey: 'fuguoGrowthFund',
      name: '富国天惠成长混合',
      score: 8.3,
      advantagesKeys: ['strongTrackRecord', 'experiencedManager'],
      advantages: ['历史业绩优秀', '基金经理经验丰富'],
      comparisonMetrics: {
        performance: 9.0,
        risk: 6.8,
        cost: 7.5,
        liquidity: 8.2
      }
    }
  ]
};
