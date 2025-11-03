# PHASE 2 PROMPT FOR CLAUDE CODE

**⚠️ ONLY use this prompt AFTER Phase 1 is complete and tested**

**Usage**: Navigate to your project directory and run Claude Code with:

```bash
claude-code "claude-code "Phase 1 is complete and tested. Now build Phase 2 according to the build guide.

PHASE 2 OVERVIEW:
Add AI-powered cost intelligence with budget controls and smart caching.

WHAT TO BUILD (Phase 2):
1. FIRST: Retrofit cost tracking to the extraction route (this was skipped in Phase 1)
2. Add new tables: api_usage, user_budget, cost_benchmarks, research_jobs, user_ratings
3. Brave Search integration for market research
4. Cost research engine with red/yellow/green flags
5. AI hover chatbot for contextual questions
6. Budget controls ($20/day, $100/month limits per user)
7. Smart caching system (80-90% cost reduction)
8. User ratings system to improve accuracy
9. Budget dashboard UI

CRITICAL REQUIREMENTS:
- ALL API calls (Anthropic + Brave) must be tracked in api_usage table
- Check budget limits BEFORE making expensive API calls
- Cache lookups must check: description + region + year
- Operations >$5 require user confirmation
- Daily spending resets at midnight
- CONTEXT-AWARE ANALYSIS: Use project site characteristics (topography, soil, access, etc.) 
  when building search queries and providing cost analysis to Claude. See buildSearchQuery() 
  function in build guide for implementation details.

SUCCESS CRITERIA:
✅ Budget dashboard shows spending
✅ Extraction route now tracks costs
✅ Research flags items as red/yellow/green
✅ Cache working (re-research same item = $0)
✅ Chatbot provides contextual answers
✅ Budget limits enforced

Follow the Phase 2 section of the build guide carefully. Pay special attention to:
- Database schema updates (Phase 2)
- Cost tracking implementation
- Caching logic
- Budget control flow

Read the complete build guide at devwise_complete_build_guide.md for detailed implementation steps.

Estimated cost for Phase 2 testing: ~$15"

---

## KEY SECTIONS IN BUILD GUIDE TO REFERENCE

When implementing Phase 2, make sure to read these sections in the complete build guide:

1. **Database Updates - Phase 2** (lines 1842-2107)
   - New tables: api_usage, user_budget, research_jobs, cost_benchmarks, user_ratings, chat_messages
   - Updates to line_items table

2. **Phase 2 Step 1: Retrofit Cost Tracking** (lines 2109-2370)
   - CRITICAL FIRST STEP: Update extraction route to track costs
   - Budget check functions
   - Cost calculation helpers

3. **Brave Search Integration** (lines 2372-2407)
   - Brave API setup
   - Cost calculation

4. **Cost Research Engine** (lines 2409-2751)
   - Main research API route
   - Search query building (with site context)
   - Cache checking
   - Analysis validation

5. **AI Hover Chatbot** (lines 3056-3175)
   - Chat API route with conversation history

6. **User Ratings System** (lines 3177-3245)
   - Rating API route
   - Benchmark updates

7. **Phase 2 UI Updates** (lines 3247-3352)
   - Line items table with flags
   - Research buttons
   - Chat interface

---

## IMPLEMENTATION NOTES FOR CLAUDE CODE

1. **Build Guide Location**: Ensure `devwise_complete_build_guide.md` is in your project root directory

2. **Environment Setup**: Configure all required API keys in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ANTHROPIC_API_KEY=your_anthropic_key
   BRAVE_API_KEY=your_brave_search_key
   ```

3. **Database Setup**: Run Phase 2 SQL commands in your Supabase SQL editor before starting

4. **Testing**: Claude Code will use `npm run dev` to test implementation after each step

5. **Working Directory**: Make sure Claude Code is run from your project root directory

---

## TESTING CHECKLIST FOR PHASE 2

After implementation, verify:

- [ ] Budget dashboard displays current spending
- [ ] Extraction route now tracks and logs API costs
- [ ] Research generates red/yellow/green flags correctly
- [ ] Cache works (second research of same item costs $0)
- [ ] Chatbot provides contextual answers about line items
- [ ] Daily spending limit ($20) is enforced
- [ ] Monthly spending limit ($100) is enforced
- [ ] Operations >$5 require user confirmation
- [ ] All API calls logged in api_usage table
- [ ] Site characteristics used in search queries (topography, access, etc.)

---

## ESTIMATED COSTS

Phase 2 testing: ~$15
- Retrofitting extraction route: ~$2
- Research testing (20 items): ~$6-8
- Chatbot testing: ~$2-3
- Cache validation: ~$0 (after initial research)

---

## TROUBLESHOOTING

**Common Phase 2 issues:**

1. **Budget exceeded errors**: Check user_budget table, verify daily reset logic
2. **Research returns no results**: Verify Brave API key, check search query format
3. **Cache not working**: Review normalization logic, check cost_benchmarks inserts
4. **RLS errors**: Ensure all new tables have proper RLS policies enabled

**Working with Claude Code:**

- If Claude Code asks for clarification, provide project context from the build guide
- Review changes incrementally using `git diff` before committing
- Test each major feature (extraction tracking, research, chat) separately
- Claude Code will create commits automatically - review them before pushing

**Getting Help:**

If Claude Code encounters issues:
1. Review the specific section in the build guide it's working on
2. Check that Phase 1 is fully functional before proceeding
3. Verify all environment variables are set correctly
4. Ensure database tables from Phase 2 schema are created
