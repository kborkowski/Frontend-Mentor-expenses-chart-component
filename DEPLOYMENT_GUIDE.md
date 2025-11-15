# Power Apps Code-First Deployment Guide

## ✅ Setup Complete!

Your expenses chart is now configured as a Power Apps Code-First component with SharePoint integration.

## 📁 Project Structure

```
Frontend-Mentor-expenses-chart-component/
├── index.html          # Main HTML structure
├── style.css           # All styling
├── app.js              # Power Apps integration logic (NEW)
├── manifest.json       # App configuration (NEW)
├── data.json           # Local test data
├── images/             # Assets
└── package.json        # Dependencies
```

## 🧪 Local Testing

### Test the app locally:
```bash
npm start
```

This will:
- Start a local server on http://localhost:8080
- Open the app in your browser
- Use local `data.json` for testing

The app automatically detects if it's running in Power Apps or locally.

## 📤 Deploying to Power Apps

### Method 1: Import as Custom Page (Recommended)

1. **Package your files:**
   ```bash
   # Create a zip of your app files
   zip -r ExpensesChart.zip index.html style.css app.js manifest.json images/ data.json
   ```

2. **In Power Apps Studio:**
   - Open https://make.powerapps.com
   - Create new Canvas app (or open existing)
   - Click "Settings" → "Upcoming features" → Enable "Custom pages"
   - Click "+" → "Custom page" → "Upload"
   - Upload `ExpensesChart.zip`

3. **Connect to SharePoint:**
   - In Power Apps Studio, add SharePoint data source
   - Connect to your `ExpensesData` list
   - The app will automatically use this data

### Method 2: Embed in Power Apps using IFrame

1. **Host your files:**
   - Upload files to SharePoint document library, or
   - Host on Azure Static Web Apps, or
   - Use GitHub Pages

2. **In Power Apps:**
   - Add an IFrame control
   - Set IFrame URL to your hosted app
   - Configure size and properties

### Method 3: Power Apps Component Framework (PCF)

If you need tighter integration, you can convert this to a full PCF component (what we started before).

## 🔗 Connecting to SharePoint

### SharePoint List Setup

Create a SharePoint list named **`ExpensesData`** with:

| Column Name | Type | Required |
|-------------|------|----------|
| Title | Single line of text | Yes |
| Amount | Number (2 decimals) | Yes |
| IsCurrentDay | Yes/No | No |

### Sample Data

```
Title | Amount | IsCurrentDay
------|--------|-------------
mon   | 17.45  | No
tue   | 34.91  | No
wed   | 52.36  | Yes
thu   | 31.07  | No
fri   | 23.39  | No
sat   | 43.28  | No
sun   | 25.48  | No
```

### Power Apps Formula

In Power Apps, you can connect the data using:

```powerFx
// Get SharePoint data
ClearCollect(
    ExpensesCollection,
    'ExpensesData'
);

// Pass to component (if using IFrame with postMessage)
Set(
    ChartData,
    ForAll(
        ExpensesCollection,
        {
            day: Title,
            amount: Amount,
            isCurrentDay: IsCurrentDay
        }
    )
);
```

## 🔄 Data Flow

```
SharePoint List
    ↓
Power Apps Connector
    ↓
Canvas App (Power Fx)
    ↓
Your Code Component (app.js)
    ↓
HTML/CSS Rendering
```

## 🎨 Customization

### Update Properties

Edit `manifest.json` to add more configurable properties:

```json
"properties": {
  "primaryColor": {
    "type": "string",
    "displayName": "Primary Color",
    "default": "hsl(10, 79%, 65%)"
  }
}
```

### Update Styles

Modify `style.css` to change colors, fonts, or layout. All CSS custom properties are in the `:root` selector.

### Update Logic

Modify `app.js` to change how data is processed or displayed.

## 🚀 Next Steps

1. **Test Locally:**
   ```bash
   npm start
   ```

2. **Create SharePoint List** with the structure above

3. **Package for Power Apps:**
   ```bash
   zip -r ExpensesChart.zip index.html style.css app.js manifest.json images/
   ```

4. **Deploy to Power Apps** using one of the methods above

5. **Connect to your SharePoint list** in Power Apps Studio

6. **Publish your app!**

## 📝 Git Workflow

Commit your changes frequently:

```bash
# Add all new files
git add .

# Commit with descriptive message
git commit -m "feat: Add Power Apps integration for Code-First component"

# Push to your GitHub
git push origin main
```

## 🆘 Troubleshooting

### App not loading data in Power Apps?
- Check SharePoint connector is added
- Verify list name matches (`ExpensesData`)
- Check column names match exactly

### Styling looks different in Power Apps?
- Power Apps may inject additional CSS
- Use more specific selectors
- Test in Power Apps preview mode

### Console errors?
- Open browser DevTools (F12)
- Check Console tab for errors
- Verify all file paths are correct

## 📚 Resources

- [Power Apps Canvas Apps Documentation](https://learn.microsoft.com/power-apps/maker/canvas-apps/)
- [SharePoint Connector Reference](https://learn.microsoft.com/connectors/sharepointonline/)
- [Custom Pages in Power Apps](https://learn.microsoft.com/power-apps/maker/model-driven-apps/page-powerpages-integration)

---

**Your app is ready to deploy! 🎉**
