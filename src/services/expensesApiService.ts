/**
 * Expenses API Service
 * 
 * This service handles communication with the Power Automate Custom API
 * connector for fetching weekly expenses data.
 */

export interface ExpenseDataRaw {
  day: string;
  amount: number;
}

export interface ExpenseData extends ExpenseDataRaw {
  /** Indicates if this day has the maximum (highest) spending amount */
  isMaxAmount: boolean;
}

export interface ExpensesApiResponse {
  data: ExpenseDataRaw[];
  balance: number;
  monthTotal: number;
  monthChange: number;
}

/**
 * Mock data for local development
 * This will be replaced with real API calls when deployed to Power Apps
 */
const MOCK_RESPONSE: ExpensesApiResponse = {
  data: [
    { day: 'mon', amount: 17.45 },
    { day: 'tue', amount: 34.91 },
    { day: 'wed', amount: 52.36 },
    { day: 'thu', amount: 31.07 },
    { day: 'fri', amount: 23.39 },
    { day: 'sat', amount: 43.28 },
    { day: 'sun', amount: 25.48 },
  ],
  balance: 921.48,
  monthTotal: 478.33,
  monthChange: 2.4,
};

/**
 * Fetch weekly expenses data from Power Automate flow
 * 
 * When running locally, returns mock data.
 * When deployed to Power Apps, this will call the Custom Connector.
 * 
 * To integrate with Power Apps Custom Connector:
 * 1. Import the Power Apps SDK connector
 * 2. Replace the mock implementation below
 * 
 * Example with Custom Connector:
 * ```typescript
 * import { useConnector } from '@microsoft/power-apps';
 * 
 * const expensesConnector = useConnector('ExpensesDataConnector');
 * const response = await expensesConnector.GetWeeklyExpenses();
 * ```
 */
export const fetchWeeklyExpenses = async (): Promise<ExpensesApiResponse> => {
  const flowUrl = import.meta.env.VITE_FLOW_URL || '';
  
  // Try to call Power Automate flow if URL is configured
  if (flowUrl) {
    try {
      const response = await fetch(flowUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Power Automate flow error:', error);
    }
  }
  
  // Fallback to mock data
  return MOCK_RESPONSE;
};

/**
 * Transform raw API data to include highlighting for highest spend only
 */
export const transformExpensesData = (
  rawData: ExpenseDataRaw[]
): { expensesData: ExpenseData[]; maxAmount: number } => {
  // Find the maximum spending amount in a single pass
  const maxAmount = Math.max(...rawData.map(item => item.amount));
  
  const expensesData = rawData.map(item => ({
    ...item,
    // Mark the day with the highest spending amount for visual highlighting
    isMaxAmount: item.amount === maxAmount,
  }));
  
  return { expensesData, maxAmount };
};

/**
 * Main function to get expenses data with highest spend highlighting
 */
export const getWeeklyExpenses = async () => {
  const response = await fetchWeeklyExpenses();
  const { expensesData, maxAmount } = transformExpensesData(response.data);
  
  return {
    expensesData,
    maxAmount,
    balance: response.balance,
    monthTotal: response.monthTotal,
    monthChange: response.monthChange,
  };
};
