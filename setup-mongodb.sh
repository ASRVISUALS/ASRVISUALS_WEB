#!/bin/bash

echo "🚀 ASR Visuals - MongoDB Setup Script"
echo "======================================"
echo ""

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew is not installed."
    echo "Please install Homebrew first: https://brew.sh"
    exit 1
fi

echo "✅ Homebrew found"
echo ""

# Check if MongoDB is already installed
if brew list mongodb-community &> /dev/null; then
    echo "✅ MongoDB is already installed"
else
    echo "📦 Installing MongoDB..."
    brew tap mongodb/brew
    brew install mongodb-community
    
    if [ $? -eq 0 ]; then
        echo "✅ MongoDB installed successfully"
    else
        echo "❌ Failed to install MongoDB"
        exit 1
    fi
fi

echo ""

# Check if MongoDB is running
if brew services list | grep mongodb-community | grep started > /dev/null; then
    echo "✅ MongoDB is already running"
else
    echo "🚀 Starting MongoDB..."
    brew services start mongodb-community
    
    if [ $? -eq 0 ]; then
        echo "✅ MongoDB started successfully"
        sleep 3
    else
        echo "❌ Failed to start MongoDB"
        exit 1
    fi
fi

echo ""
echo "======================================"
echo "✅ MongoDB Setup Complete!"
echo ""
echo "MongoDB is now running at: mongodb://localhost:27017"
echo ""
echo "Next steps:"
echo "1. Your backend server will now connect to MongoDB"
echo "2. Create an owner account:"
echo ""
echo "   curl -X POST http://localhost:5000/api/auth/bootstrap-owner \\"
echo "     -H \"Content-Type: application/json\" \\"
echo "     -d '{"
echo "       \"setupKey\": \"asr_owner_setup_2026_secure\","
echo "       \"name\": \"Admin Owner\","
echo "       \"email\": \"admin@asrvisuals.com\","
echo "       \"password\": \"secure_password_123\""
echo "     }'"
echo ""
echo "3. Visit http://localhost:3000 to see your website!"
echo "======================================"
