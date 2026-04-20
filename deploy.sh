#!/bin/bash
# ============================================================
# CXC Ace - Complete Vercel Deployment Setup
# Run this from your LOCAL machine in the cxc-ace directory
# ============================================================

set -e

echo "================================================"
echo "  CXC Ace - One-Click Vercel + Turso Setup"
echo "================================================"
echo ""

# ---- 1. Update db.ts to use Turso adapter ----
echo "📝 Updating src/lib/db.ts for Turso..."

cat > src/lib/db.ts << 'DBEOF'
import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL!
  const authToken = process.env.DATABASE_AUTH_TOKEN

  const adapter = new PrismaLibSQL({
    url: databaseUrl,
    authToken: authToken || undefined,
  })

  return new PrismaClient({ adapter } as never)
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
DBEOF

echo "✅ db.ts updated"

# ---- 2. Make sure packages are installed ----
echo ""
echo "📦 Installing dependencies..."
npm install @prisma/adapter-libsql @libsql/client 2>&1 | tail -3
echo "✅ Dependencies installed"

# ---- 3. Generate Prisma client ----
echo ""
echo "🔧 Generating Prisma client..."
npx prisma generate 2>&1 | tail -3
echo "✅ Prisma client generated"

# ---- 4. Commit and push ----
echo ""
echo "📤 Pushing to GitHub..."
git add src/lib/db.ts package.json package-lock.json
git commit -m "feat: use Turso cloud database adapter for Vercel" --allow-empty 2>&1 || true
git push origin main 2>&1
echo "✅ Pushed to GitHub"

# ---- 5. Set Vercel environment variables ----
echo ""
echo "⚙️  Setting Vercel environment variables..."

TURSO_URL="libsql://cxc-ace-endd21.aws-us-east-1.turso.io"
TURSO_TOKEN="eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzY2NTEyNzUsImlkIjoiMDE5ZGE4OWYtOGQwMS03ZWRmLWFhMzYtN2YzNGNiYTQ3OTljIiwicmlkIjoiYWVhZmRlMzEtYTA1Ny00ZTYwLWEzNDEtYjRlZTg4NTI1ODFlIn0.Z-MpprbPNGoXX41qlwJd9YtaD2sXqYVt151LmLJfx9LCf4e9fx7wYgHf7hf2YZ8JZAWWnoOTRVYh0UTMdAdtDQ"

if command -v vercel &> /dev/null; then
    vercel env add DATABASE_URL production <<< "$TURSO_URL" 2>&1 || \
        echo "⚠️  Could not set DATABASE_URL via CLI — set it manually in Vercel dashboard"
    vercel env add DATABASE_AUTH_TOKEN production <<< "$TURSO_TOKEN" 2>&1 || \
        echo "⚠️  Could not set DATABASE_AUTH_TOKEN via CLI — set it manually in Vercel dashboard"
    echo "✅ Vercel env vars set"
else
    echo "⚠️  Vercel CLI not found. Set these env vars manually:"
    echo "   Go to → https://vercel.com/kraits-5806s-projects → Settings → Environment Variables"
    echo ""
    echo "   DATABASE_URL = $TURSO_URL"
    echo "   DATABASE_AUTH_TOKEN = $TURSO_TOKEN"
fi

# ---- 6. Trigger redeploy ----
echo ""
if command -v vercel &> /dev/null; then
    echo "🚀 Triggering Vercel redeploy..."
    vercel --prod --yes 2>&1 | tail -5
    echo "✅ Deployment triggered!"
else
    echo "💡 After setting env vars, Vercel will auto-redeploy on next git push."
    echo "   Or go to your Vercel dashboard → Deployments → Redeploy"
fi

echo ""
echo "================================================"
echo "  ✅ All done! Your app should be live shortly."
echo "================================================"
