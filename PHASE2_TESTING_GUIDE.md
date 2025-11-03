# PHASE 2 FOUNDATION TESTING GUIDE

**Goal**: Validate Phase 2 database schema, budget system, and cost tracking before building additional features.

**Estimated Time**: 30-45 minutes

---

## 📋 PRE-TESTING CHECKLIST

Before you begin, ensure:
- [ ] Phase 1 is working (you can upload and extract proposals)
- [ ] You have access to your Supabase dashboard
- [ ] You have an Anthropic API key with credits
- [ ] Development server can run (`npm run dev`)

---

## STEP 1: DATABASE SETUP (10 minutes)

### **1.1 Run Phase 2 Schema**

1. Open your Supabase dashboard
2. Go to **SQL Editor**
3. Click **"New query"**
4. Copy the ENTIRE contents of `supabase-phase2-schema.sql`
5. Paste into SQL Editor
6. Click **"Run"**

**Expected Result**: ✅ Success message

**If you see errors**:
- Check if tables already exist (drop them first if testing multiple times)
- Verify Phase 1 schema is complete

### **1.2 Verify Tables Created**

In Supabase dashboard, go to **Table Editor** and verify these 6 new tables exist:
- [ ] `api_usage`
- [ ] `user_budget`
- [ ] `research_jobs`
- [ ] `cost_benchmarks`
- [ ] `user_ratings`
- [ ] `chat_messages`

### **1.3 Verify line_items Updates**

1. Go to Table Editor → `line_items`
2. Check for these NEW columns:
   - [ ] `research_job_id`
   - [ ] `flag_color`
   - [ ] `variance_percent`
   - [ ] `market_avg`
   - [ ] `last_researched_at`

### **1.4 Verify RLS Policies**

Run this query in SQL Editor to check policies:

```sql
SELECT tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('api_usage', 'user_budget', 'research_jobs', 'user_ratings', 'chat_messages')
ORDER BY tablename, policyname;
```

**Expected Result**: Should see INSERT, SELECT, UPDATE policies for each table

---

## STEP 2: ENVIRONMENT SETUP (2 minutes)

### **2.1 Verify Environment Variables**

Check your `.env.local` file has:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

**Note**: `BRAVE_API_KEY` is optional for this test (Phase 2 research features not implemented yet)

### **2.2 Start Development Server**

```bash
npm run dev
```

**Expected Result**: Server starts on http://localhost:3000

---

## STEP 3: TEST BUDGET SYSTEM (15 minutes)

### **3.1 Check User Budget Creation**

1. Log in to your DevWise account
2. Open Supabase dashboard → Table Editor → `user_budget`
3. **Initially**: Table should be EMPTY (budget created on first extraction)

### **3.2 Test First Extraction (Budget Auto-Creation)**

1. In DevWise, navigate to an existing project (or create a new one)
2. Click **"Upload Proposal"**
3. Enter contractor name: "Test Contractor"
4. Upload a small PDF (1-2 pages is fine for testing)
5. Click **"Upload & Extract"**
6. Wait for extraction to complete (~30-60 seconds)

**Expected Results**:
- ✅ Extraction completes successfully
- ✅ Line items are created

### **3.3 Verify Budget Record Created**

In Supabase → `user_budget` table:

**Check these fields**:
- [ ] `user_id` matches your user ID
- [ ] `daily_limit` = 20.00
- [ ] `daily_spent` > 0 (should be ~$0.30-0.70)
- [ ] `monthly_limit` = 100.00
- [ ] `monthly_spent` > 0 (same as daily_spent)
- [ ] `last_reset_date` = today's date
- [ ] `last_reset_month` = current month (e.g., "2025-11")

**Example**:
```
user_id: abc-123-def
daily_limit: 20.00
daily_spent: 0.52
monthly_spent: 0.52
last_reset_date: 2025-11-03
last_reset_month: 2025-11
```

### **3.4 Verify API Usage Logged**

In Supabase → `api_usage` table:

**Check for a new record**:
- [ ] `user_id` matches your user ID
- [ ] `operation_type` = 'extraction'
- [ ] `api_provider` = 'anthropic'
- [ ] `tokens_used` > 0
- [ ] `estimated_cost` > 0 (should match budget increment)
- [ ] `proposal_id` is set
- [ ] `request_data` contains file info
- [ ] `created_at` timestamp is recent

### **3.5 Test Budget Increment (Second Extraction)**

1. Upload and extract ANOTHER proposal
2. Wait for completion

**Verify in `user_budget`**:
- [ ] `daily_spent` has INCREASED (e.g., $0.52 → $1.04)
- [ ] `monthly_spent` has INCREASED by same amount
- [ ] `last_reset_date` is still today

**Verify in `api_usage`**:
- [ ] TWO records now exist
- [ ] Both have your user_id
- [ ] Both are operation_type 'extraction'

---

## STEP 4: TEST BUDGET LIMITS (10 minutes)

### **4.1 Test Daily Limit Enforcement**

**Manually Set Budget to Near Limit**:

Run this in Supabase SQL Editor:

```sql
UPDATE user_budget
SET daily_spent = 19.50
WHERE user_id = 'YOUR_USER_ID_HERE';
```

**Replace `YOUR_USER_ID_HERE`** with your actual user ID from the user_budget table.

**Then Try to Extract**:
1. Upload another proposal
2. Click "Upload & Extract"

**Expected Result**:
- ❌ Error message: "Daily budget limit ($20.00) would be exceeded. Current: $19.50"
- HTTP 402 status code

### **4.2 Test Monthly Limit**

**Set to Near Monthly Limit**:

```sql
UPDATE user_budget
SET
  daily_spent = 0,
  monthly_spent = 99.50
WHERE user_id = 'YOUR_USER_ID_HERE';
```

**Then Try to Extract**:

**Expected Result**:
- ❌ Error message: "Monthly budget limit ($100.00) would be exceeded..."

### **4.3 Reset Budget for Continued Testing**

```sql
UPDATE user_budget
SET
  daily_spent = 0,
  monthly_spent = 0
WHERE user_id = 'YOUR_USER_ID_HERE';
```

---

## STEP 5: TEST DAILY RESET LOGIC (5 minutes)

### **5.1 Simulate Next Day**

**Manually Change Last Reset Date**:

```sql
UPDATE user_budget
SET
  last_reset_date = CURRENT_DATE - INTERVAL '1 day',
  daily_spent = 5.00  -- Simulate previous day's spending
WHERE user_id = 'YOUR_USER_ID_HERE';
```

### **5.2 Trigger Reset**

1. Upload and extract another proposal
2. Wait for completion

### **5.3 Verify Reset Occurred**

In `user_budget` table:
- [ ] `last_reset_date` updated to TODAY
- [ ] `daily_spent` reset to just current extraction (~$0.50)
- [ ] `monthly_spent` still includes historical spending (5.00 + 0.50 = 5.50)

---

## STEP 6: TEST MONTHLY RESET LOGIC (5 minutes)

### **6.1 Simulate Next Month**

```sql
UPDATE user_budget
SET
  last_reset_month = TO_CHAR(CURRENT_DATE - INTERVAL '1 month', 'YYYY-MM'),
  monthly_spent = 25.00  -- Simulate previous month's spending
WHERE user_id = 'YOUR_USER_ID_HERE';
```

### **6.2 Trigger Reset**

1. Upload and extract another proposal

### **6.3 Verify Monthly Reset**

In `user_budget` table:
- [ ] `last_reset_month` updated to current month (e.g., "2025-11")
- [ ] `monthly_spent` reset to just current extraction (~$0.50)
- [ ] Previous month's $25.00 is gone (reset worked!)

---

## STEP 7: VERIFY RATE LIMITING (5 minutes)

### **7.1 Test Extraction Rate Limit**

**Current Limit**: 5 extractions per hour

1. Upload and extract 5 proposals in quick succession
2. Try to extract a 6th proposal

**Expected Result**:
- First 5: ✅ Success
- 6th attempt: ❌ HTTP 429 "Too many extraction requests. Please try again later."
- Response includes `X-RateLimit-*` headers

### **7.2 Check Rate Limit Headers**

In browser DevTools → Network tab, check extraction request headers:
- [ ] `X-RateLimit-Limit: 5`
- [ ] `X-RateLimit-Remaining: 0`
- [ ] `X-RateLimit-Reset: [timestamp]`

---

## ✅ SUCCESS CRITERIA

All tests should show:

### **Database**
- ✅ All 6 Phase 2 tables created
- ✅ line_items table has 5 new columns
- ✅ All RLS policies active

### **Budget System**
- ✅ Budget auto-created on first extraction
- ✅ Spending increments correctly
- ✅ Daily limit enforced ($20)
- ✅ Monthly limit enforced ($100)
- ✅ Daily reset works (midnight)
- ✅ Monthly reset works (new month)

### **API Tracking**
- ✅ All extractions logged in api_usage
- ✅ Correct cost calculation
- ✅ Token usage recorded

### **Rate Limiting**
- ✅ 5 extractions/hour enforced
- ✅ Proper HTTP 429 responses

---

## 🐛 TROUBLESHOOTING

### **Issue: "Table already exists" error**

**Solution**: Drop existing Phase 2 tables first:

```sql
DROP TABLE IF EXISTS chat_messages CASCADE;
DROP TABLE IF EXISTS user_ratings CASCADE;
DROP TABLE IF EXISTS cost_benchmarks CASCADE;
DROP TABLE IF EXISTS research_jobs CASCADE;
DROP TABLE IF EXISTS api_usage CASCADE;
DROP TABLE IF EXISTS user_budget CASCADE;

-- Then re-run the schema
```

### **Issue: Budget not created**

**Check**:
1. RLS policies exist on user_budget
2. Your user is authenticated
3. Check browser console for errors

**Manual creation**:
```sql
INSERT INTO user_budget (user_id, daily_limit, monthly_limit, last_reset_date, last_reset_month)
VALUES ('YOUR_USER_ID', 20.00, 100.00, CURRENT_DATE, TO_CHAR(CURRENT_DATE, 'YYYY-MM'));
```

### **Issue: "Failed to insert API usage"**

**Check**: RLS policy for INSERT exists on api_usage table

**Fix**: Run this in SQL Editor:
```sql
CREATE POLICY "Users can insert their API usage"
  ON api_usage FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### **Issue: Extraction times out**

**Check**:
1. Anthropic API key is valid
2. File size < 10MB
3. Check browser console for errors

**Note**: Timeout is 2 minutes for large PDFs

### **Issue: Rate limiting not working**

**Note**: Rate limiting is in-memory. Restarting the dev server resets limits.

---

## 📊 EXPECTED COSTS

**For this testing session**:
- 5-10 test extractions ≈ $2.50 - $5.00
- All within $20 daily limit

**Budget tracking ensures you won't exceed limits!**

---

## NEXT STEPS AFTER TESTING

Once all tests pass:

**Option 1**: Continue building Phase 2 features
- Caching system (reduces costs by 80-90%)
- Brave Search integration
- Cost research engine
- AI Chatbot

**Option 2**: Deploy Phase 1 + Phase 2 Foundation
- Functional extraction with cost tracking
- Budget protection
- Ready for production use

**Option 3**: Review and plan
- Discuss findings
- Prioritize remaining features

---

## 📝 TEST RESULTS CHECKLIST

Mark each as you complete:

- [ ] Database schema created
- [ ] Budget auto-created on first extraction
- [ ] Spending increments correctly
- [ ] Daily limit enforced
- [ ] Monthly limit enforced
- [ ] Daily reset works
- [ ] Monthly reset works
- [ ] API usage logged
- [ ] Rate limiting works
- [ ] No errors in browser console
- [ ] No errors in terminal

**If all checked**: ✅ Phase 2 Foundation is solid and ready!
