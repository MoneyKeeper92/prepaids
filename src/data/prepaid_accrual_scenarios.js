// src/data/prepaidAccrualScenarios.js
const prepaidAccrualScenarios = [
  // === WAGE ACCRUALS ===
  {
    id: "PA-WAGE-01",
    topic: "prepaidAccrual",
    subType: "wageAccrual",
    originalDate: "2024-12-31",
    periodEnd: "2024-12-31",
    difficulty: 1,
    task: "Phoenix Construction employs **12 workers**, each earning **$180 per day**. Workers are paid every Friday for a Monday-through-Friday work week. December 31 falls on a **Tuesday**. Record the year-end accrual for wages payable.",
    data: {
      employees: 12,
      dailyWage: 180,
      payPeriod: "weekly",
      payDay: "Friday",
      yearEndDay: "Tuesday",
      daysToAccrue: 2 // Monday and Tuesday
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Wages Expense", debit: 4320, credit: null },
        { account: "Wages Payable", debit: null, credit: 4320 }
      ]
    },
    explanation: `### Theory: Accrued Expenses and the Matching Principle
Accrued expenses represent costs incurred but not yet paid, requiring recognition under the matching principle. This fundamental accounting concept ensures that all expenses benefiting a period are recorded in that period, regardless of cash payment timing.

### Step-by-Step Calculation

**Step 1: Identify Accrual Period**
- Last Pay Date: Friday, December 26 (assumed)
- Work Days Since: Monday Dec 29, Tuesday Dec 30
- Days to Accrue: 2 days

**Step 2: Calculate Total Accrued Wages**
- Daily Wage Cost = 12 employees × $180 per employee = $2,160 per day
- Total Accrued Wages = $2,160 × 2 days = $4,320

### Financial Statement Effects
- **Income Statement:** Wages Expense increases by $4,320, reducing net income
- **Balance Sheet:** Current Liabilities increase by $4,320 (Wages Payable)
- **Cash Flow:** No immediate impact (will affect cash when paid)`,
    references: ["ASC 710-10"]
  },

  {
    id: "PA-WAGE-02", 
    topic: "prepaidAccrual",
    subType: "salaryAccrual",
    originalDate: "2024-08-16",
    periodEnd: "2024-08-31",
    difficulty: 2,
    task: "Mountain View University hired a professor on **August 16, 2024**, at an annual salary of **$120,000**. The university records monthly journal entries. Record the August 31 salary accrual.",
    data: {
      annualSalary: 120000,
      startDate: "2024-08-16",
      accrualDate: "2024-08-31",
      daysWorked: 16, // Aug 16-31
      totalDaysInMonth: 31
    },
    solution: {
      type: "journal", 
      entry: [
        { account: "Salary Expense", debit: 5161, credit: null },
        { account: "Salary Payable", debit: null, credit: 5161 }
      ]
    },
    explanation: `### Theory: Salary Accrual and Daily Proration
Salary accruals require precise calculation when employees start mid-period. The matching principle demands that compensation costs be allocated only to periods when services are actually provided.

### Step-by-Step Calculation

**Step 1: Determine Monthly Salary Rate**
- Annual Salary: $120,000
- Monthly Salary = $120,000 ÷ 12 months = $10,000 per month

**Step 2: Calculate Daily Service Rate**
- August has 31 calendar days
- Daily Rate = $10,000 ÷ 31 days = $322.58 per day

**Step 3: Compute Earned Salary for August**
- Days Worked: August 16-31 = 16 days
- Earned Salary = $322.58 × 16 days = $5,161 (rounded)

### Financial Statement Impact
- **Income Statement:** Salary Expense increases by $5,161
- **Balance Sheet:** Current Liabilities increase by $5,161 (Salary Payable)`,
    references: ["ASC 710-10"]
  },

  // === UNEARNED REVENUE ===
  {
    id: "PA-UNEARNED-01",
    topic: "prepaidAccrual", 
    subType: "unearnedRevenue",
    originalDate: "2024-08-01",
    periodEnd: "2024-12-31",
    difficulty: 2,
    task: "On **August 1, 2024**, Stellar Tech received **$60,000** for a **15-month** service contract. Record the December 31 adjusting entry to recognize earned revenue.",
    data: {
      totalContract: 60000,
      contractLength: 15, // months
      startDate: "2024-08-01",
      adjustmentDate: "2024-12-31",
      monthsEarned: 5 // Aug-Dec
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Unearned Revenue", debit: 20000, credit: null },
        { account: "Revenue", debit: null, credit: 20000 }
      ]
    },
    explanation: `### Theory: Revenue Recognition and Performance Obligations
Under ASC 606, revenue must be recognized as performance obligations are satisfied, not when cash is received. This creates a liability (unearned revenue) for cash received before services are performed.

### Step-by-Step Calculation

**Step 1: Determine Monthly Revenue Rate**
- Monthly Revenue = Total Contract Value ÷ Contract Term
- Monthly Revenue = $60,000 ÷ 15 months = $4,000 per month

**Step 2: Calculate Earned Revenue for 2024**
- Months of Service Performed = August through December = 5 months
- Earned Revenue = $4,000 × 5 months = $20,000

### Financial Statement Impact
- **Income Statement:** Revenue increases by $20,000 (proper period matching)
- **Balance Sheet:** Unearned Revenue decreases by $20,000, now shows $40,000 obligation`,
    references: ["ASC 606-10"]
  },

  {
    id: "PA-UNEARNED-02",
    topic: "prepaidAccrual",
    subType: "unearnedRevenue", 
    originalDate: "2024-10-01",
    periodEnd: "2024-12-31",
    difficulty: 1,
    task: "Coastal Consulting received **$24,000** on **October 1, 2024**, for a **6-month** consulting contract. Record the year-end adjustment to recognize earned revenue.",
    data: {
      totalContract: 24000,
      contractLength: 6, // months
      startDate: "2024-10-01", 
      adjustmentDate: "2024-12-31",
      monthsEarned: 3 // Oct-Dec
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Unearned Revenue", debit: 12000, credit: null },
        { account: "Revenue", debit: null, credit: 12000 }
      ]
    },
    explanation: `### Theory: Unearned Revenue and Performance Satisfaction
Unearned revenue represents a liability for services owed to customers. As performance obligations are satisfied over time, the liability is reduced and revenue is recognized.

### Step-by-Step Revenue Recognition

**Step 1: Determine Monthly Service Rate**
- Total Contract Value: $24,000
- Contract Duration: 6 months
- Monthly Revenue Rate = $24,000 ÷ 6 months = $4,000 per month

**Step 2: Calculate 2024 Earned Revenue**
- Service Months in 2024: October, November, December = 3 months
- Earned Revenue = $4,000 × 3 months = $12,000

### Financial Statement Impact
- **Income Statement:** Revenue increases by $12,000
- **Balance Sheet:** Unearned Revenue decreases by $12,000
- **Revenue Recognition:** 50% of contract value earned in 2024`,
    references: ["ASC 606-10"]
  },

  // === PREPAID EXPENSES ===
  {
    id: "PA-PREPAID-01",
    topic: "prepaidAccrual",
    subType: "prepaidExpense",
    originalDate: "2024-09-01", 
    periodEnd: "2024-12-31",
    difficulty: 2,
    task: "On **September 1, 2024**, Alpine Industries paid **$54,000** for an **18-month** equipment service contract. Record the December 31 adjusting entry.",
    data: {
      totalPaid: 54000,
      contractLength: 18, // months
      paymentDate: "2024-09-01",
      adjustmentDate: "2024-12-31", 
      monthsUsed: 4 // Sep-Dec
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Equipment Service Expense", debit: 12000, credit: null },
        { account: "Prepaid Equipment Service", debit: null, credit: 12000 }
      ]
    },
    explanation: `The matching principle requires that costs be allocated to the periods receiving benefit from those costs. Alpine initially recorded the $54,000 payment as Prepaid Equipment Service (an asset) because the service contract provides future economic benefits over 18 months. As 4 months of service are consumed (Sep-Dec), the company must recognize the expense for the periods benefited. Calculation: $54,000 × 4/18 months = $12,000. The debit to Equipment Service Expense matches the cost with the revenue-generating periods, while the credit reduces the prepaid asset to reflect the portion consumed.`,
    references: ["ASC 340-10"]
  },

  {
    id: "PA-SUPPLIES-01",
    topic: "prepaidAccrual",
    subType: "suppliesAdjustment", 
    originalDate: "2024-01-01",
    periodEnd: "2024-12-31",
    difficulty: 2,
    task: "Titan Manufacturing purchased **$18,000** of factory supplies on January 1, expensing the entire amount. At year-end, **$3,200** of supplies remain unused. Record the adjusting entry.",
    data: {
      totalPurchased: 18000,
      unusedSupplies: 3200,
      initiallyRecordedAs: "expense",
      adjustmentDate: "2024-12-31"
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Factory Supplies", debit: 3200, credit: null },
        { account: "Factory Supplies Expense", debit: null, credit: 3200 }
      ]
    },
    explanation: `### Theory: Correcting Asset vs. Expense Misclassification
This scenario addresses an error where items with future benefit (assets) were immediately expensed. The correction re-establishes the asset for the unused portion and ensures the expense matches the amount consumed during the period.

### Analysis of the Error
On January 1, Titan made the following incorrect entry:
- Factory Supplies Expense $18,000
- Cash $18,000

This violates the matching principle by expensing supplies before they are used.

### Step-by-Step Correction
**1. Calculate Supplies Consumed (Correct Expense):**
- Total Supplies Purchased: $18,000
- Supplies Remaining at Year-End: $3,200
- **Correct Factory Supplies Expense:** $18,000 - $3,200 = $14,800

**2. Determine the Adjusting Entry:**
The correcting entry must reduce the expense and recognize the remaining supplies as an asset.

### Financial Statement Impact
- **Before Correction:** Expenses are overstated by $3,200, and assets are understated by $3,200
- **After Correction:** Factory Supplies Expense is correctly stated at $14,800, and the Factory Supplies asset account correctly shows the $3,200 of supplies available for future use`,
    references: ["ASC 340-10"]
  },

  {
    id: "PA-INTEREST-01",
    topic: "prepaidAccrual",
    subType: "interestAccrual",
    originalDate: "2024-09-01",
    periodEnd: "2024-12-31",
    difficulty: 3,
    task: "On **September 1, 2024**, Vertex Corp. issued a **$800,000, 12% note payable** due in 2 years. Interest is payable annually each September 1. Record the December 31 interest accrual.",
    data: {
      principal: 800000,
      interestRate: 0.12,
      issueDate: "2024-09-01", 
      accrualDate: "2024-12-31",
      monthsAccrued: 4 // Sep-Dec
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Interest Expense", debit: 32000, credit: null },
        { account: "Interest Payable", debit: null, credit: 32000 }
      ]
    },
    explanation: `The matching principle and accrual accounting require interest expense to be recognized in the period when borrowed funds are used, regardless of when interest payments are made. Interest accrues with the passage of time, representing the cost of using borrowed capital. Vertex used the $800,000 for 4 months (Sep-Dec), incurring interest costs that benefited 2024 operations. Calculation: $800,000 × 12% × 4/12 months = $32,000. The debit to Interest Expense matches the financing cost with the period of benefit, while the credit to Interest Payable recognizes the legal obligation.`,
    references: ["ASC 835-30"]
  },

  {
    id: "PA-INTEREST-02",
    topic: "prepaidAccrual", 
    subType: "interestAccrual",
    originalDate: "2024-10-01",
    periodEnd: "2024-12-31",
    difficulty: 2,
    task: "Summit Corp. has a **$1,500,000 note payable** dated October 1, 2024, with **8% annual interest**. The first payment is due October 1, 2025. Record the year-end interest accrual.",
    data: {
      principal: 1500000,
      interestRate: 0.08,
      issueDate: "2024-10-01",
      accrualDate: "2024-12-31", 
      monthsAccrued: 3 // Oct-Dec
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Interest Expense", debit: 30000, credit: null },
        { account: "Interest Payable", debit: null, credit: 30000 }
      ]
    },
    explanation: `### Theory: Interest Accrual and Time-Based Cost Recognition
Interest expense accrues with the passage of time, representing the cost of using borrowed capital. The matching principle requires interest costs to be recognized in periods benefiting from the borrowed funds.

### Step-by-Step Interest Calculation

**Step 1: Identify Accrual Components**
- Principal Amount: $1,500,000
- Annual Interest Rate: 8%
- Accrual Period: October 1 - December 31, 2024 = 3 months

**Step 2: Calculate Quarterly Interest Expense**
- Annual Interest = $1,500,000 × 8% = $120,000 per year
- Quarterly Interest = $120,000 × (3/12 months) = $30,000

### Financial Statement Impact
- **Income Statement:** Interest Expense increases by $30,000
- **Balance Sheet:** Current Liabilities increase by $30,000 (Interest Payable)
- **Cash Flow:** No immediate impact (accrual only, payment in 2025)`,
    references: ["ASC 835-30"]
  },

  // === REVENUE ACCRUALS ===
  {
    id: "PA-REVENUE-01",
    topic: "prepaidAccrual",
    subType: "revenueAccrual",
    originalDate: "2024-12-15",
    periodEnd: "2024-12-31", 
    difficulty: 2,
    task: "Quantum Engineering completed **$45,000** of work in December 2024 but has **not yet billed the client** or recorded the revenue. Record the year-end accrual.",
    data: {
      workCompleted: 45000,
      completionDate: "2024-12-15",
      accrualDate: "2024-12-31",
      billingStatus: "not yet billed"
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Accounts Receivable", debit: 45000, credit: null },
        { account: "Revenue", debit: null, credit: 45000 }
      ]
    },
    explanation: `### Theory: Revenue Accrual and Earned Income Recognition
Revenue must be recognized when earned, regardless of billing or collection timing. The revenue recognition principle requires recording economic substance when performance obligations are satisfied.

### Step-by-Step Accrual Process

**Step 1: Confirm Performance Obligation Satisfaction**
- Work Completion: December 15, 2024
- Client Acceptance: Engineering services delivered per contract
- Measurement Certainty: $45,000 value determinable
- Collectibility Assessment: Client creditworthy, payment expected

**Step 2: Record Accrual Entry**
- Revenue Earned: $45,000 (performance obligation satisfied)
- Billing Status: Irrelevant for revenue recognition

### Financial Statement Impact
- **Income Statement:** Revenue increases by $45,000
- **Balance Sheet:** Current Assets increase by $45,000 (Accounts Receivable)
- **Performance Measurement:** December revenue reflects actual work completed`,
    references: ["ASC 606-10"]
  },

  {
    id: "PA-REVENUE-02",
    topic: "prepaidAccrual",
    subType: "revenueAccrual", 
    originalDate: "2024-12-20",
    periodEnd: "2024-12-31",
    difficulty: 1,
    task: "Metro Consulting earned **$28,000** in December 2024 for services provided but **not yet invoiced**. Record the adjusting entry to recognize this revenue.",
    data: {
      servicesEarned: 28000,
      serviceDate: "2024-12-20",
      accrualDate: "2024-12-31",
      invoiceStatus: "not invoiced"
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Accounts Receivable", debit: 28000, credit: null },
        { account: "Revenue", debit: null, credit: 28000 }
      ]
    },
    explanation: `### Theory: Accrued Revenue and Service Industry Recognition
Consulting services revenue must be recognized when services are performed, not when invoices are sent. This fundamental application of accrual accounting ensures financial statements reflect all economic activities completed during the reporting period.

### Step-by-Step Revenue Recognition

**Step 1: Assess Service Completion**
- Service Date: December 20, 2024
- Work Performed: Consulting services delivered to client
- Value Determination: $28,000 fee agreed per contract
- Client Acceptance: Services meeting contract specifications

**Step 2: Record Accrued Revenue**
- Revenue Recognition: $28,000 earned in December 2024
- Invoicing Status: Administrative process separate from earning

### Financial Statement Impact
- **Income Statement:** Revenue increases by $28,000
- **Balance Sheet:** Current Assets increase by $28,000 (A/R)
- **Period Matching:** December revenue matches December service delivery`,
    references: ["ASC 606-10"]
  },

  // === CORRECTING ENTRY SCENARIOS ===
  {
    id: "PA-CORRECT-05",
    topic: "prepaidAccrual",
    subType: "correctingEntry",
    originalDate: "2024-06-01",
    periodEnd: "2024-12-31",
    difficulty: 3,
    task: "Omega Corp. received **$72,000** on June 1, 2024, for a **24-month** consulting contract and **credited the entire amount to Consulting Revenue**. Record the December 31 correcting entry.",
    data: {
      collectionAmount: 72000,
      collectionDate: "2024-06-01",
      contractLength: 24, // months
      monthsEarned: 7, // Jun-Dec
      monthsUnearned: 17, // Jan 2025-May 2026
      initiallyRecordedAs: "revenue",
      correctionDate: "2024-12-31"
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Revenue", debit: 51000, credit: null },
        { account: "Unearned Revenue", debit: null, credit: 51000 }
      ]
    },
    explanation: `### Theory: Correcting Revenue Recognition Violations
This scenario demonstrates a classic revenue recognition error where cash receipt timing was confused with performance obligation satisfaction. The correction restores proper matching between revenue recognition and service delivery periods.

### Analysis of the Error
On June 1, Omega made the following incorrect entry:
- Cash $72,000
- Revenue $72,000

This entry overstates revenue because the service is provided over 24 months.

### Step-by-Step Correction Process
**1. Calculate Earned Revenue for 2024:**
- Monthly Revenue Rate: $72,000 / 24 months = $3,000 per month
- Service Period in 2024: June 1 to December 31 = 7 months
- **Correct 2024 Revenue:** $3,000 × 7 months = $21,000

**2. Calculate Unearned Revenue at Year-End:**
- Total Collected: $72,000
- Earned in 2024: $21,000
- **Unearned Revenue Balance:** $72,000 - $21,000 = $51,000

### Financial Statement Impact
- **Before Correction:** Revenue is overstated by $51,000, and liabilities are understated by $51,000
- **After Correction:** Revenue is correctly stated at $21,000, and the Unearned Revenue liability is correctly stated at $51,000`,
    references: ["ASC 606-10"]
  },

  {
    id: "PA-CORRECT-06",
    topic: "prepaidAccrual",
    subType: "correctingEntry",
    originalDate: "2024-03-01",
    periodEnd: "2024-12-31",
    difficulty: 4,
    task: "Titan Industries paid **$36,000** on March 1, 2024, for a **3-year insurance policy** but debited the entire amount to **Insurance Expense**. The company's accountant forgot to make any adjusting entries. Record the December 31 correcting entry.",
    data: {
      totalPaid: 36000,
      paymentDate: "2024-03-01",
      policyLength: 36, // months
      monthsUsed: 10, // Mar-Dec
      monthsRemaining: 26, // Jan 2025-Feb 2027
      initiallyRecordedAs: "expense",
      correctionDate: "2024-12-31"
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Prepaid Insurance", debit: 26000, credit: null },
        { account: "Insurance Expense", debit: null, credit: 26000 }
      ]
    },
    explanation: `### Theory: Correcting Prepaid Asset Misclassification
This scenario illustrates a fundamental error in asset vs. expense classification. The matching principle requires costs providing future benefits to be capitalized as assets and expensed over the period of benefit.

### Analysis of the Error
On March 1, Titan made the following incorrect entry:
- Insurance Expense $36,000
- Cash $36,000

This entry overstates 2024 expenses and understates assets, as the insurance policy provides coverage for 36 months.

### Step-by-Step Correction Analysis
**1. Calculate Insurance Consumed in 2024:**
- Monthly Insurance Cost: $36,000 / 36 months = $1,000 per month
- Months Used in 2024: March through December = 10 months
- **Correct 2024 Insurance Expense:** $1,000 × 10 months = $10,000

**2. Calculate Remaining Asset Value:**
- Total Paid: $36,000
- Expense in 2024: $10,000
- **Prepaid Insurance Balance:** $36,000 - $10,000 = $26,000

### Financial Statement Impact
- **Before Correction:** Expenses are overstated by $26,000, and assets are understated by $26,000
- **After Correction:** Insurance Expense is correctly stated at $10,000, and Prepaid Insurance is correctly stated at $26,000`,
    references: ["ASC 720-15"]
  },

  {
    id: "PA-CORRECT-07",
    topic: "prepaidAccrual",
    subType: "correctingEntry",
    originalDate: "2024-12-15",
    periodEnd: "2024-12-31",
    difficulty: 2,
    task: "Nova Engineering earned **$67,000** in fees during December 2024 for work completed, but the bookkeeper **made no entries** because the client hadn't been invoiced yet. Record the correcting entry for December 31.",
    data: {
      feesEarned: 67000,
      workCompletionDate: "2024-12-15",
      invoiceStatus: "not yet sent",
      recordingStatus: "no entries made",
      correctionDate: "2024-12-31"
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Accounts Receivable", debit: 67000, credit: null },
        { account: "Revenue", debit: null, credit: 67000 }
      ]
    },
    explanation: `### Theory: Correcting Omitted Revenue
This scenario demonstrates an error of omission, where revenue that has been earned is not recorded, violating the revenue recognition principle. The correction involves recording the earned revenue and the corresponding receivable.

### Analysis of the Error
No entry was made, but the economic event occurred. By failing to record the transaction, the following occurred:
- **Revenue was understated** by $67,000
- **Assets (Accounts Receivable) were understated** by $67,000
- This misrepresents the company's performance and financial position

### Step-by-Step Correction Process
**1. Confirm Revenue Recognition Criteria (ASC 606):**
- A performance obligation was satisfied in December when the work was completed
- The transaction price of $67,000 is determinable
- A receivable exists because Nova has a right to payment

**2. Record the Missing Economic Activity:**
The correcting entry simply records the transaction that should have been recorded when the revenue was earned.

### Financial Statement Impact
- **Before Correction:** Revenue and assets were both understated by $67,000
- **After Correction:** Revenue and Accounts Receivable are both increased by $67,000, providing a faithful representation of the company's financial activities in December`,
    references: ["ASC 606-10"]
  },

  {
    id: "PA-CORRECT-08",
    topic: "prepaidAccrual",
    subType: "correctingEntry",
    originalDate: "2024-01-01",
    periodEnd: "2024-12-31",
    difficulty: 3,
    task: "Apex Manufacturing purchased **$25,000** of raw materials on January 1, 2024, and recorded the entire amount as **Materials Expense**. At year-end, **$4,200** of materials remain in inventory unused. Record the correcting entry.",
    data: {
      totalPurchased: 25000,
      purchaseDate: "2024-01-01",
      unusedMaterials: 4200,
      usedMaterials: 20800,
      initiallyRecordedAs: "expense",
      correctionDate: "2024-12-31"
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Raw Materials Inventory", debit: 4200, credit: null },
        { account: "Materials Expense", debit: null, credit: 4200 }
      ]
    },
    explanation: `### Theory: Correcting Inventory Misclassification
This scenario illustrates an error where materials purchased for future use (an inventory asset) were incorrectly recorded as an immediate expense, violating the matching principle for manufacturing costs.

### Analysis of the Error
On January 1, Apex made the following incorrect entry:
- Materials Expense $25,000
- Cash $25,000

This entry overstates expenses and understates inventory assets. Materials cost should be matched with production.

### Step-by-Step Inventory Correction
**1. Calculate Materials Consumed (Correct Expense):**
- Total Materials Purchased: $25,000
- Unused Materials at Year-End (Inventory): $4,200
- **Correct Materials Expense:** $25,000 - $4,200 = $20,800

**2. Determine the Adjusting Entry:**
- The Materials Expense account is currently overstated at $25,000. The correct expense for the period is only $20,800 (the amount of materials used).
- To fix this, the expense must be reduced by $4,200 ($25,000 - $20,800).
- This $4,200 represents the value of the unused materials, which should be recorded as an asset (Raw Materials Inventory).

### Financial Statement Impact
- **Before Correction:** Expenses are overstated by $4,200, and assets (Inventory) are understated by $4,200
- **After Correction:** Materials Expense is correctly stated at $20,800, and the Raw Materials Inventory asset is correctly stated at $4,200`,
    references: ["ASC 330-10"]
  },

  {
    id: "PA-CORRECT-09",
    topic: "prepaidAccrual",
    subType: "correctingEntry",
    originalDate: "2024-09-01",
    periodEnd: "2024-12-31",
    difficulty: 4,
    task: "Horizon Corp. borrowed **$500,000** on September 1, 2024, at **9% annual interest**, with interest payable each August 31. The company has **made no interest entries**. Record the December 31 correcting entry.",
    data: {
      principal: 500000,
      interestRate: 0.09,
      borrowingDate: "2024-09-01",
      firstPaymentDue: "2025-08-31",
      monthsAccrued: 4, // Sep-Dec
      recordingStatus: "no entries made",
      correctionDate: "2024-12-31"
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Interest Expense", debit: 15000, credit: null },
        { account: "Interest Payable", debit: null, credit: 15000 }
      ]
    },
    explanation: `### Theory: Correcting Omitted Accrued Expenses
This scenario involves an error of omission, where interest expense incurred with the passage of time was not recorded. This violates the matching principle and understates liabilities.

### Analysis of the Error
No entry was made, but the company used borrowed funds for four months. This created:
- **Understated Interest Expense** of $15,000
- **Understated Liabilities (Interest Payable)** of $15,000
- This overstates the company's net income and understates its obligations

### Step-by-Step Interest Accrual Reconstruction
**1. Calculate Accrued Interest Expense:**
- Annual Interest: $500,000 Principal × 9% Rate = $45,000
- Accrual Period: September 1 to December 31 = 4 months
- **Accrued Interest Expense:** $45,000 × (4 / 12 months) = $15,000

**2. Record the Missing Accrual:**
The correcting entry records the expense and the related liability that should have been recognized at year-end.

### Financial Statement Impact
- **Before Correction:** Expenses were understated by $15,000, and liabilities were understated by $15,000
- **After Correction:** Interest Expense and Interest Payable are both increased by $15,000, providing an accurate view of the company's financing costs and obligations`,
    references: ["ASC 835-30"]
  },

  {
    id: "PA-CORRECT-10",
    topic: "prepaidAccrual",
    subType: "correctingEntry",
    originalDate: "2024-10-01",
    periodEnd: "2024-12-31",
    difficulty: 3,
    task: "Vista Corp. collected **$84,000** on October 1, 2024, for rent on its building for the period October 2024 through September 2025. The full amount was **credited to Rent Revenue**. Record the December 31 correcting entry.",
    data: {
      totalRent: 84000,
      collectionDate: "2024-10-01",
      rentPeriod: "Oct 2024 - Sep 2025",
      totalMonths: 12,
      monthsEarned: 3, // Oct-Dec 2024
      monthsUnearned: 9, // Jan-Sep 2025
      initiallyRecordedAs: "revenue",
      correctionDate: "2024-12-31"
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Revenue", debit: 63000, credit: null },
        { account: "Unearned Revenue", debit: null, credit: 63000 }
      ]
    },
    explanation: `### Theory: Correcting Improper Revenue Recognition
This scenario illustrates an improper revenue timing error, where rent collected in advance was recognized immediately as revenue. Revenue from rent must be recognized over the occupancy period, not when cash is collected.

### Analysis of the Error
On October 1, Vista made the following incorrect entry:
- Cash $84,000
- Revenue $84,000

This violates the revenue recognition principle, as the service (providing rental space) will be performed over 12 months.

### Step-by-Step Revenue Correction Process
**1. Calculate Earned Portion of Revenue:**
- Monthly Rental Rate: $84,000 / 12 months = $7,000 per month
- Occupancy Period in 2024: October 1 to December 31 = 3 months
- **Correct 2024 Revenue:** $7,000 × 3 months = $21,000

**2. Calculate Unearned Portion (Liability):**
- Total Collected: $84,000
- Earned in 2024: $21,000
- **Unearned Revenue Balance:** $84,000 - $21,000 = $63,000

### Financial Statement Impact
- **Before Correction:** Revenue is overstated by $63,000, and liabilities are understated by $63,000
- **After Correction:** Revenue is correctly stated at $21,000, and the Unearned Revenue liability is correctly stated at $63,000`,
    references: ["ASC 842-30"]
  },

  {
    id: "PA-CORRECT-11", 
    topic: "prepaidAccrual",
    subType: "correctingEntry",
    originalDate: "2024-11-01",
    periodEnd: "2024-12-31",  
    difficulty: 4,
    task: "Delta Corp.'s trial balance shows **Office Supplies Expense $18,500** and **Office Supplies $0**. Investigation reveals:\n\n*   Beginning supplies: **$2,300**\n*   Purchases during year: **$18,500**\n*   Ending supplies count: **$3,800**\n\nRecord the correcting entry.",
    data: {
      trialBalanceExpense: 18500,
      trialBalanceSupplies: 0,
      beginningSupplies: 2300,
      purchasesDuringYear: 18500,
      endingSuppliesCount: 3800,
      correctionDate: "2024-12-31"
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Office Supplies", debit: 1500, credit: null },
        { account: "Office Supplies Expense", debit: null, credit: 1500 }
      ]
    },
    explanation: `Supplies used = Beginning $2,300 + Purchases $18,500 - Ending $3,800 = $17,000. Trial balance shows $18,500 expense (overstated by $1,500). Correction reduces expense by $1,500 and establishes asset at proper $3,800 balance.`,
    references: ["ASC 340-10"]
  },

  // === CORRECTING ENTRY SCENARIOS ===
  {
    id: "PA-CORRECT-01",
    topic: "prepaidAccrual",
    subType: "correctingEntry",
    originalDate: "2024-04-01",
    periodEnd: "2024-12-31",
    difficulty: 3,
    task: "On April 1, 2024, Pinnacle Corp. paid **$18,000** for **12 months** of warehouse rent and recorded the entire amount as **rent expense**. Record the December 31 correcting entry.",
    data: {
      totalPaid: 18000,
      paymentDate: "2024-04-01",
      period: 12, // months
      monthsUsed: 9, // Apr-Dec
      monthsRemaining: 3, // Jan-Mar 2025
      initiallyRecordedAs: "expense",
      correctionDate: "2024-12-31"
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Prepaid Rent", debit: 4500, credit: null },
        { account: "Rent Expense", debit: null, credit: 4500 }
      ]
    },
    explanation: `### Theory: Correcting Expense Misclassification
This scenario addresses a common error where a payment for a future benefit (an asset) is incorrectly recorded entirely as an expense in the period of payment. The correction re-establishes the asset and properly allocates the expense according to the matching principle.

### Analysis of the Error
On April 1, Pinnacle made the following incorrect entry:
- Rent Expense $18,000
- Cash $18,000

This entry overstates Rent Expense for the period and understates assets, as the rent payment provides benefits for 12 months.

### Step-by-Step Correction
**1. Calculate the Consumed Portion (Expense):**
- Monthly Rent Cost: $18,000 / 12 months = $1,500 per month
- Months Benefited in 2024: April 1 to December 31 = 9 months
- **Correct 2024 Rent Expense:** $1,500 × 9 months = $13,500

**2. Calculate the Unused Portion (Asset):**
- Months Remaining after 2024: 3 months (Jan-Mar 2025)
- **Correct Prepaid Rent Balance:** $1,500 × 3 months = $4,500

### Financial Statement Impact
- **Before Correction:** Rent Expense is overstated by $4,500, and Assets are understated by $4,500
- **After Correction:** Rent Expense is correctly stated at $13,500, and Prepaid Rent (Current Asset) is correctly stated at $4,500`,
    references: ["ASC 720-15"]
  },

  {
    id: "PA-CORRECT-02", 
    topic: "prepaidAccrual",
    subType: "correctingEntry",
    originalDate: "2024-12-20",
    periodEnd: "2024-12-31",
    difficulty: 2,
    task: "Atlas Consulting completed **$35,000** of work in December 2024 but **recorded no journal entries**. The client will be billed in January 2025. Record the correcting entry for December 31.",
    data: {
      workCompleted: 35000,
      workDate: "2024-12-20",
      recordingStatus: "no entries made",
      billingDate: "2025-01-15",
      correctionDate: "2024-12-31"
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Accounts Receivable", debit: 35000, credit: null },
        { account: "Revenue", debit: null, credit: 35000 }
      ]
    },
    explanation: `### Theory: Correcting Omitted Revenue
This scenario involves an error of omission. Revenue was earned by performing services, but no entry was made, violating the revenue recognition principle. The correction is to record the earned revenue and the corresponding receivable.

### Analysis of the Error
By failing to record the transaction when work was completed, the financial statements are misstated:
- **Revenue is understated** by $35,000
- **Assets (Accounts Receivable) are understated** by $35,000
- This incorrectly reports the company's performance and financial position for December

### Step-by-Step Correction
**1. Confirm Revenue is Earned:**
- The work was completed in December, satisfying the performance obligation
- The amount is determinable ($35,000)
- A right to collect payment exists, even if not yet billed

**2. Record the Missing Entry:**
The correcting entry records the economic event that occurred in December.

### Financial Statement Impact
- **Before Correction:** Revenue and Assets are both understated by $35,000
- **After Correction:** Revenue and Accounts Receivable are both increased by $35,000, ensuring the income statement and balance sheet are accurate`,
    references: ["ASC 606-10"]
  },

  {
    id: "PA-CORRECT-03",
    topic: "prepaidAccrual", 
    subType: "correctingEntry",
    originalDate: "2024-12-01",
    periodEnd: "2024-12-31",
    difficulty: 3,
    task: "Digital Solutions collected **$48,000** on December 1, 2024, for a **12-month software maintenance contract** beginning December 1. The full amount was recorded as **revenue**. Record the December 31 correcting entry.",
    data: {
      collectionAmount: 48000,
      collectionDate: "2024-12-01",
      contractLength: 12, // months
      monthsEarned: 1, // December only
      monthsUnearned: 11, // Jan-Nov 2025
      initiallyRecordedAs: "revenue",
      correctionDate: "2024-12-31"
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Service Revenue", debit: 44000, credit: null },
        { account: "Unearned Service Revenue", debit: null, credit: 44000 }
      ]
    },
    explanation: `### Theory: Correcting Improper Revenue Recognition
This scenario addresses a violation of the revenue recognition principle, where cash collected for future services was improperly recorded as revenue at the time of receipt.

### Analysis of the Error
On December 1, Digital Solutions made the following incorrect entry:
- Cash $48,000
- Service Revenue $48,000

This is incorrect because revenue must be recognized as services are provided, not when cash is collected.

### Step-by-Step Correction
**1. Calculate Revenue Earned in 2024:**
- Monthly Service Rate: $48,000 / 12 months = $4,000 per month
- Months of Service in 2024: 1 (December)
- **Correct 2024 Service Revenue:** $4,000

**2. Calculate Unearned Revenue at Year-End:**
- Total Collected: $48,000
- Earned in 2024: $4,000
- **Unearned Service Revenue Liability:** $48,000 - $4,000 = $44,000

### Financial Statement Impact
- **Before Correction:** Revenue is overstated by $44,000, and liabilities are understated by $44,000
- **After Correction:** Service Revenue is correctly stated at $4,000 for 2024, and the Unearned Service Revenue liability is correctly stated at $44,000`,
    references: ["ASC 606-10"]
  },

  {
    id: "PA-CORRECT-04",
    topic: "prepaidAccrual",
    subType: "correctingEntry", 
    originalDate: "2024-11-01",
    periodEnd: "2024-12-31",
    difficulty: 4,
    task: "Meridian Manufacturing's trial balance at December 31 shows:\n\n*   **Wages Expense:** $480,000\n*   **Wages Payable:** $0\n\nEmployees earn **$8,000 per day** and are paid every Friday. December 31 is a **Tuesday**. Record the correcting entry.",
    data: {
      trialBalanceExpense: 480000,
      trialBalancePayable: 0,
      dailyWages: 8000,
      payDay: "Friday",
      yearEndDay: "Tuesday",
      daysToAccrue: 2, // Monday and Tuesday
      correctionDate: "2024-12-31"
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Wages Expense", debit: 16000, credit: null },
        { account: "Wages Payable", debit: null, credit: 16000 }
      ]
    },
    explanation: `### Theory: Correcting Omitted Accrued Wages
This scenario addresses an error of omission where wages earned by employees but not yet paid at year-end were not recorded. This violates the matching principle by understating expenses and liabilities.

### Analysis of the Error
The trial balance shows the following incorrect balances before adjustment:
- Wages Expense: $480,000
- Wages Payable: $0

The error is that the expense for the last two days of the year (Monday and Tuesday) has not been recorded. The $480,000 reflects the expense recorded through the last payday, but not for the full accounting period.

### Step-by-Step Correction
**1. Calculate the Accrued Wages:**
- Daily Wages: $8,000
- Days to Accrue: 2 (Monday, Dec 30; Tuesday, Dec 31)
- **Total Accrued Wages:** $8,000 × 2 days = $16,000

**2. Record the Missing Accrual:**
The correcting entry adds the unrecorded expense to the existing balance and creates the corresponding liability.

### Financial Statement Impact
This entry adjusts the accounts to their correct year-end balances:
- **Wages Expense:** $480,000 (start) + $16,000 (adjustment) = **$496,000** (correct total expense)
- **Wages Payable:** $0 (start) + $16,000 (adjustment) = **$16,000** (correct liability)`,
    references: ["ASC 710-10"]
  },

  // === COMPLEX MIXED SCENARIOS ===
  {
    id: "PA-MIXED-01",
    topic: "prepaidAccrual",
    subType: "mixedAdjustments",
    originalDate: "2024-07-01", 
    periodEnd: "2024-12-31",
    difficulty: 4,
    task: "Apex Corp.'s prepaid expense account has the following activity:\n\n*   **$2,000** opening balance (for a 6-month insurance policy from Jan 1)\n*   **$4,800** paid July 1 for annual insurance\n*   **$3,000** paid Dec 1 for warehouse rent for Jan-Dec 2025\n\nWhat should be reported as **prepaid expenses** at Dec 31?",
    data: {
      insurancePolicy1: {
        openingBalance: 2000,
        startDate: "2024-01-01",
        length: 6 // months
      },
      insurancePolicy2: {
        payment: 4800,
        paymentDate: "2024-07-01", 
        length: 12 // months
      },
      warehouseRent: {
        payment: 3000,
        paymentDate: "2024-12-01",
        period: "2025-01-01 to 2025-12-31"
      },
      reportingDate: "2024-12-31"
    },
    solution: {
      type: "journal",
      entry: [
        { account: "Insurance Expense", debit: 4400, credit: null },
        { account: "Prepaid Expenses", debit: null, credit: 4400 }
      ]
    },
    explanation: `### Theory: Complex Prepaid Expense Analysis and Multi-Policy Management
This scenario demonstrates advanced prepaid expense analysis involving multiple insurance policies and mixed-period rent payments. Proper classification requires analyzing each component's future benefit period and allocated cost recognition.

### Step-by-Step Multi-Component Analysis

**Step 1: Insurance Policy 1 Assessment**
- Original Coverage: January 1 - June 30, 2024 (6 months)
- Opening Balance: $2,000 (remaining value at Jan 1)
- Status at Dec 31, 2024: Fully expired
- Remaining Asset Value: $0

**Step 2: Insurance Policy 2 Analysis**
- Coverage Period: July 1, 2024 - June 30, 2025 (12 months)
- Total Premium: $4,800
- Monthly Cost: $4,800 ÷ 12 = $400 per month
- Months Used (Jul-Dec 2024): 6 months
- Months Remaining (Jan-Jun 2025): 6 months
- 2024 Expense: $400 × 6 = $2,400
- Remaining Prepaid: $400 × 6 = $2,400

**Step 3: Warehouse Rent Assessment**
- Rent Period: January 1 - December 31, 2025 (12 months)
- Payment Date: December 1, 2024
- Total Prepaid: $3,000
- Status at Dec 31, 2024: Fully prepaid (no 2024 benefit)
- Remaining Asset Value: $3,000 (all for 2025)

**Step 4: Calculate Total Correct Prepaid Balance**
- Policy 1 Remaining: $0 (expired)
- Policy 2 Remaining: $2,400 (6 months unused)
- Warehouse Rent: $3,000 (2025 benefit)
- Total Correct Prepaid: $0 + $2,400 + $3,000 = $5,400
- Current Prepaid Balance: $9,800 ($2,000 + $4,800 + $3,000)
- Required Adjustment: $9,800 - $5,400 = $4,400 expense recognition

### Financial Statement Impact
- **Income Statement:** Insurance Expense increases by $4,400
- **Balance Sheet:** Prepaid Expenses decreases from $9,800 to $5,400
- **Period Matching:** 2024 insurance costs properly allocated to 2024
- **Asset Accuracy:** Prepaid balance reflects only future economic benefits`,
    references: ["ASC 720-15"]
  },

  {
    id: "PA-MIXED-02",
    topic: "prepaidAccrual",
    subType: "mixedAdjustments",
    originalDate: "Various",
    periodEnd: "2024-12-31",
    difficulty: 4,
    task: "Galaxy Corp.'s unadjusted trial balance shows:\n\n*   **Prepaid Insurance:** $400\n*   **Insurance Expense:** $9,600\n\nAn analysis reveals that a policy was renewed on **March 1** for **$9,600** (3 years). What are the correct Dec 31 balances?",
    data: {
      trialBalances: {
        prepaidInsurance: 400,
        insuranceExpense: 9600
      },
      policyDetails: {
        renewalDate: "2024-03-01",
        totalPremium: 9600,
        length: 36 // months
      },
      reportingDate: "2024-12-31",
      monthsUsed: 10 // Mar-Dec
    },
    solution: {
      type: "journal", 
      entry: [
        { account: "Prepaid Insurance", debit: 6933, credit: null },
        { account: "Insurance Expense", debit: null, credit: 6933 }
      ]
    },
    explanation: `Correct expense: $9,600 × 10/36 months = $2,667. Correct prepaid: $9,600 × 26/36 months = $6,933. Current expense $9,600 needs decrease of $6,933 ($9,600 - $2,667). Current prepaid $400 needs increase of $6,933 to reach the required $7,333 total ($400 + $6,933).`,
    references: ["ASC 340-10"]
  }
];

export default prepaidAccrualScenarios;