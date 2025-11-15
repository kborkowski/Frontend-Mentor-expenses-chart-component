#!/bin/bash
# Package script for Power Apps deployment

echo "📦 Packaging Expenses Chart for Power Apps..."

# Create package directory
mkdir -p package

# Copy necessary files
cp index.html package/
cp style.css package/
cp app.js package/
cp manifest.json package/
cp data.json package/
cp -r images package/

# Create zip file
cd package
zip -r ../ExpensesChart.zip *
cd ..

# Cleanup
rm -rf package

echo "✅ Package created: ExpensesChart.zip"
echo ""
echo "📤 Next steps:"
echo "1. Go to https://make.powerapps.com"
echo "2. Create or open a Canvas app"
echo "3. Import this package"
echo "4. Connect to your SharePoint list"
echo ""
ls -lh ExpensesChart.zip
