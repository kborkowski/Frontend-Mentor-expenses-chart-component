import { useState, useEffect } from 'react'
import './ExpensesChart.css'

interface ExpenseData {
  day: string
  amount: number
  isCurrentDay: boolean
}

function ExpensesChart() {
  const [expensesData, setExpensesData] = useState<ExpenseData[]>([
    { day: 'mon', amount: 17.45, isCurrentDay: false },
    { day: 'tue', amount: 34.91, isCurrentDay: false },
    { day: 'wed', amount: 52.36, isCurrentDay: true },
    { day: 'thu', amount: 31.07, isCurrentDay: false },
    { day: 'fri', amount: 23.39, isCurrentDay: false },
    { day: 'sat', amount: 43.28, isCurrentDay: false },
    { day: 'sun', amount: 25.48, isCurrentDay: false },
  ])

  const [balance] = useState(921.48)
  const [monthTotal] = useState(478.33)
  const [monthChange] = useState(2.4)

  useEffect(() => {
    // TODO: Load data from Power Apps / SharePoint when available
    // For now, using default data
    console.log('ExpensesChart loaded')
  }, [])

  const maxAmount = Math.max(...expensesData.map((d) => d.amount))

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
        <img src="/logo.svg" alt="" />
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
                {...(item.isCurrentDay && { 'data-current-day': '' })}
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
              <data value={monthChange}>+{monthChange.toFixed(1)}%</data>
            </strong>
            <span>from last month</span>
          </p>
        </div>
      </div>
    </article>
  )
}

export default ExpensesChart
