// Power Apps Code-First Component - Expenses Chart
// This file handles integration with Power Apps and SharePoint data

class ExpensesChartApp {
    constructor() {
        this.data = [];
        this.balance = 921.48;
        this.monthTotal = 478.33;
        this.monthChange = 2.4;
    }

    /**
     * Initialize the app with Power Apps context
     * This method is called when the component loads in Power Apps
     */
    async init() {
        console.log('Initializing Expenses Chart App...');
        
        // Check if running in Power Apps environment
        if (typeof Microsoft !== 'undefined' && Microsoft.PowerApps) {
            await this.loadDataFromPowerApps();
        } else {
            // Development mode - use local data
            console.log('Running in development mode with local data');
            this.loadLocalData();
        }
        
        this.render();
    }

    /**
     * Load data from SharePoint via Power Apps connector
     */
    async loadDataFromPowerApps() {
        try {
            // Power Apps connector syntax for SharePoint
            // This will be configured in Power Apps Studio
            const response = await Microsoft.PowerApps.getItems({
                dataSource: 'ExpensesData', // Your SharePoint list name
                select: ['Title', 'Amount', 'IsCurrentDay']
            });

            this.data = response.map(item => ({
                day: item.Title.toLowerCase(),
                amount: parseFloat(item.Amount),
                isCurrentDay: item.IsCurrentDay
            }));

            console.log('Loaded data from SharePoint:', this.data);
        } catch (error) {
            console.error('Error loading data from Power Apps:', error);
            // Fallback to local data
            this.loadLocalData();
        }
    }

    /**
     * Load local data for development/testing
     */
    loadLocalData() {
        fetch('./data.json')
            .then(response => response.json())
            .then(data => {
                this.data = data.map(item => ({
                    ...item,
                    isCurrentDay: item.day === 'wed' // Default to Wednesday
                }));
                this.render();
            })
            .catch(error => {
                console.error('Error loading local data:', error);
                // Use hardcoded fallback data
                this.data = [
                    { day: "mon", amount: 17.45, isCurrentDay: false },
                    { day: "tue", amount: 34.91, isCurrentDay: false },
                    { day: "wed", amount: 52.36, isCurrentDay: true },
                    { day: "thu", amount: 31.07, isCurrentDay: false },
                    { day: "fri", amount: 23.39, isCurrentDay: false },
                    { day: "sat", amount: 43.28, isCurrentDay: false },
                    { day: "sun", amount: 25.48, isCurrentDay: false }
                ];
                this.render();
            });
    }

    /**
     * Render the chart with current data
     */
    render() {
        if (this.data.length === 0) {
            console.warn('No data to render');
            return;
        }

        // Update balance
        const balanceElement = document.querySelector('.expenses__balance data');
        if (balanceElement) {
            balanceElement.textContent = `$${this.balance.toFixed(2)}`;
        }

        // Update month total
        const monthTotalElement = document.querySelector('.expenses__month-total data');
        if (monthTotalElement) {
            monthTotalElement.textContent = `$${this.monthTotal.toFixed(2)}`;
        }

        // Update month change
        const monthChangeElement = document.querySelector('.expenses__month-prev strong data');
        if (monthChangeElement) {
            monthChangeElement.textContent = `+${this.monthChange.toFixed(1)}%`;
        }

        // Update meters (chart bars)
        this.updateMeters();
    }

    /**
     * Update the meter bars with data
     */
    updateMeters() {
        const maxAmount = Math.max(...this.data.map(d => d.amount));
        
        this.data.forEach((item, index) => {
            const meterDiv = document.querySelectorAll('.meter')[index];
            if (!meterDiv) return;

            // Update meter value and max
            const meter = meterDiv.querySelector('meter');
            if (meter) {
                meter.setAttribute('value', item.amount.toString());
                meter.setAttribute('max', maxAmount.toString());
                meter.textContent = `$${item.amount.toFixed(2)}`;
            }

            // Update CSS custom properties for styling
            meterDiv.style.setProperty('--value', item.amount.toString());
            meterDiv.style.setProperty('--max', maxAmount.toString());

            // Update label
            const label = meterDiv.querySelector('label');
            if (label) {
                const dayName = item.day.charAt(0).toUpperCase() + item.day.slice(1);
                label.innerHTML = `${dayName} <span>$${item.amount.toFixed(2)}</span>`;
            }

            // Mark current day
            if (item.isCurrentDay) {
                meterDiv.setAttribute('data-current-day', '');
            } else {
                meterDiv.removeAttribute('data-current-day');
            }
        });
    }

    /**
     * Refresh data from Power Apps (called when data source updates)
     */
    async refresh() {
        console.log('Refreshing data...');
        await this.init();
    }

    /**
     * Update a specific property (called from Power Apps)
     */
    updateProperty(propertyName, value) {
        switch(propertyName) {
            case 'balance':
                this.balance = value;
                break;
            case 'monthTotal':
                this.monthTotal = value;
                break;
            case 'monthChange':
                this.monthChange = value;
                break;
        }
        this.render();
    }
}

// Initialize the app when DOM is ready
let expensesApp;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        expensesApp = new ExpensesChartApp();
        expensesApp.init();
    });
} else {
    expensesApp = new ExpensesChartApp();
    expensesApp.init();
}

// Expose for Power Apps integration
if (typeof window !== 'undefined') {
    window.ExpensesChartApp = expensesApp;
}
