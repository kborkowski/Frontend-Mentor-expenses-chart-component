import { useState, useEffect } from 'react'
import './ExpensesChart.css'
import { getWeeklyExpenses, ExpenseData } from './services/expensesApiService'

interface ExpensesState {
  expensesData: ExpenseData[];
  maxAmount: number;
  balance: number;
  monthTotal: number;
  monthChange: number;
}

function ExpensesChart() {
  const [data, setData] = useState<ExpensesState>({
    expensesData: [],
    maxAmount: 0,
    balance: 0,
    monthTotal: 0,
    monthChange: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadExpensesData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const result = await getWeeklyExpenses()
        setData({
          expensesData: result.expensesData,
          maxAmount: result.maxAmount,
          balance: result.balance,
          monthTotal: result.monthTotal,
          monthChange: result.monthChange
        })
      } catch (err) {
        console.error('Error loading expenses data:', err)
        setError('Failed to load expenses data')
      } finally {
        setIsLoading(false)
      }
    }

    loadExpensesData()
  }, [])

  const { expensesData, maxAmount, balance, monthTotal, monthChange } = data

  // Loading state
  if (isLoading) {
    return (
      <article className="expenses flow">
        <div className="expenses__main flow">
          <div className="loading-message">Loading expenses data...</div>
        </div>
      </article>
    )
  }

  // Error state
  if (error) {
    return (
      <article className="expenses flow">
        <div className="expenses__main flow">
          <div className="error-message">
            {error}
            <button 
              onClick={() => window.location.reload()}
              className="retry-button"
            >
              Retry
            </button>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="expenses flow">
      {/* Balance Section */}
      <div className="expenses__balance repel">
        <div className="flow">
          <h2>My balance</h2>
          <p>
            <data value={balance}>${balance.toFixed(2)}</data>
          </p>
        </div>
        <img src="./logo.svg" alt="" />
      </div>

      {/* Main Content */}
      <div className="expenses__main flow">
        {/* Spending Chart */}
        <div className="expenses__week flow">
          <h2>Spending - Last 7 days</h2>
          <div className="meters">
            {expensesData.map((item) => (
              <div
                key={item.day}
                className="meter"
                style={
                  {
                    '--value': item.amount,
                    '--max': maxAmount,
                  } as React.CSSProperties
                }
                {...(item.isMaxAmount && { 'data-max-amount': '' })}
              >
                <meter
                  data-vertical=""
                  id={item.day}
                  max={maxAmount}
                  value={item.amount}
                >
                  ${item.amount.toFixed(2)}
                </meter>
                <label htmlFor={item.day}>
                  {item.day.charAt(0).toUpperCase() + item.day.slice(1)}{' '}
                  <span>${item.amount.toFixed(2)}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <hr />

        {/* Month Summary */}
        <div className="expenses__month repel">
          <h2 data-fullwidth="">Total this month</h2>
          <p className="expenses__month-total">
            <data value={monthTotal}>${monthTotal.toFixed(2)}</data>
          </p>
          <p className="expenses__month-prev">
            <strong>
              <data value={monthChange}>{monthChange >= 0 ? '+' : ''}{monthChange.toFixed(1)}%</data>
            </strong>
            <span>from last month</span>
          </p>
        </div>
      </div>
    </article>
  )
}

export default ExpensesChart
