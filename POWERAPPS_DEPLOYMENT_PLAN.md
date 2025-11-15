# Power Apps Code Component Deployment Plan

## Project Goal
Convert the Frontend Mentor Expenses Chart Component into a Power Apps Code Component (PCF) that pulls data dynamically from a SharePoint list.

## Prerequisites

### 1. Software Requirements
- [x] Node.js (v22.21.1) - Installed ✓
- [x] npm (v9.8.1) - Installed ✓
- [x] Git - Installed ✓
- [x] GitHub CLI (v2.83.0) - Installed ✓
- [ ] Power Apps CLI (pac) - **To be installed**

### 2. Power Platform Requirements
- [ ] Microsoft 365 account with Power Apps access
- [ ] Power Apps Developer environment (or permission to create one)
- [ ] SharePoint site with list access
- [ ] Power Apps per-app or per-user license

### 3. SharePoint List Setup
You'll need to create a SharePoint list with the following structure:

**List Name:** `ExpensesData` (or your preferred name)

**Columns:**
- `Day` (Single line of text) - e.g., "mon", "tue", "wed"
- `Amount` (Number with 2 decimal places) - e.g., 17.45
- `CurrentDay` (Yes/No) - To mark the current day

**Sample Data:**
```
Day    | Amount | CurrentDay
-------|--------|------------
mon    | 17.45  | No
tue    | 34.91  | No
wed    | 52.36  | Yes
thu    | 31.07  | No
fri    | 23.39  | No
sat    | 43.28  | No
sun    | 25.48  | No
```

## Implementation Steps

### Phase 1: Environment Setup (Steps 1-2)
1. ✅ Verify Git repository is configured for `dave-cross/Frontend-Mentor-expenses-chart-component`
2. Install Power Apps CLI (pac) globally via npm
3. Verify pac installation and authentication

### Phase 2: PCF Project Initialization (Step 3)
4. Create a new PCF project using `pac pcf init`
   - Component Type: Field (Custom control)
   - Namespace: ExpensesChart
   - Component Name: ExpensesChartComponent
5. Install project dependencies with `npm install`

### Phase 3: Component Configuration (Step 4)
6. Configure `ControlManifest.Input.xml` with:
   - Data input property (bound to SharePoint list)
   - Visual properties (colors, dimensions)
   - Resources (CSS, images)

### Phase 4: Component Development (Steps 5-6)
7. Migrate HTML structure to TypeScript `init()` and `updateView()` methods
8. Port CSS styles to component's CSS file
9. Implement SharePoint data binding:
   - Parse DataSet from Power Apps context
   - Map SharePoint columns to component data
   - Handle real-time updates

### Phase 5: Build & Test (Step 7)
10. Build the component: `npm run build`
11. Test locally: `npm start watch`
12. Debug and refine component behavior

### Phase 6: Packaging (Step 8)
13. Create solution project for component packaging
14. Build solution package (.zip file)
15. Prepare deployment artifacts

### Phase 7: Git Commits (Step 9)
Throughout development, commit frequently:
- After each major milestone
- When features are working
- Before major refactoring

### Phase 8: Deployment to Power Apps
16. Import solution to Power Apps environment
17. Create a Canvas or Model-driven app
18. Add the code component to the app
19. Connect to SharePoint list
20. Test end-to-end functionality

## Key Technical Considerations

### Power Apps Component Framework (PCF)
- Uses TypeScript + React (optional) + HTML/CSS
- Components are packaged as solutions (.zip)
- Must declare all external resources in manifest
- Limited to 1MB resource size

### SharePoint Integration Options
1. **Direct DataSet Binding** (Recommended)
   - Component receives data as DataSet from Power Apps
   - Power Apps handles SharePoint connection via connector
   - No authentication needed in component code

2. **SharePoint REST API** (Advanced)
   - Requires authentication token management
   - More complex but more flexible
   - Not recommended for this use case

### Component Architecture
```
ExpensesChartComponent/
├── ExpensesChartComponent/
│   ├── ControlManifest.Input.xml    # Component definition
│   ├── index.ts                      # Main component logic
│   ├── css/
│   │   └── ExpensesChartComponent.css  # Migrated styles
│   └── assets/
│       └── logo.svg                  # Logo image
├── package.json
└── tsconfig.json
```

## Expected Changes from Current Implementation

1. **HTML Changes:**
   - Convert to TypeScript DOM manipulation
   - Create elements dynamically in `init()`
   - Update elements in `updateView()`

2. **CSS Changes:**
   - Keep most styles intact
   - May need adjustments for Power Apps container
   - CSS custom properties should work fine

3. **Data Flow:**
   ```
   SharePoint List → Power Apps Connector → Component DataSet → Render Chart
   ```

4. **New Files to Create:**
   - `index.ts` - Main component logic
   - `ControlManifest.Input.xml` - Component manifest
   - Solution files for packaging

## Useful Resources
- [Power Apps Component Framework Documentation](https://learn.microsoft.com/power-apps/developer/component-framework/)
- [Create your first code component](https://learn.microsoft.com/power-apps/developer/component-framework/implementing-controls-using-typescript)
- [DataSet component walkthrough](https://learn.microsoft.com/power-apps/developer/component-framework/tutorial-create-canvas-dataset-component)
- [SharePoint connector in Power Apps](https://learn.microsoft.com/connectors/sharepointonline/)

## Next Steps
Run the setup commands to install Power Apps CLI and initialize the project structure.
