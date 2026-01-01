# Setup Messages Feature

## Error: Tables Not Found

If you're seeing this error:
```
Could not find the table 'public.conversations' in the schema cache
```

This means the messages tables haven't been created in your Supabase database yet.

## Solution: Run the SQL Script

1. **Open Supabase Dashboard**
   - Go to your Supabase project dashboard
   - Navigate to **SQL Editor** (in the left sidebar)

2. **Run the SQL Script**
   - Open the file `create_messages_schema.sql` in this project
   - Copy the entire contents
   - Paste it into the Supabase SQL Editor
   - Click **Run** (or press Ctrl+Enter)

3. **Verify Tables Were Created**
   - After running, you should see verification queries at the bottom showing:
     - `conversations` table exists
     - `messages` table exists
     - Indexes were created
     - Triggers were created

4. **Refresh Your App**
   - Go back to your messages page
   - The error should be gone and the page should work

## What the Script Creates

- **conversations** table - Stores conversation threads between users
- **messages** table - Stores individual messages within conversations
- **Indexes** - For fast queries
- **Triggers** - To automatically update conversation timestamps
- **RLS Policies** - For security (users can only see their own conversations)

## Troubleshooting

If you still see errors after running the script:

1. **Check for Errors in SQL Editor**
   - Look for any red error messages
   - Common issues: Foreign key constraints if `profiles` table doesn't exist

2. **Verify Tables Exist**
   - In Supabase Dashboard, go to **Table Editor**
   - You should see `conversations` and `messages` tables

3. **Check RLS Policies**
   - Go to **Authentication** > **Policies**
   - Verify policies were created for both tables

4. **Clear Browser Cache**
   - Sometimes the API cache needs to refresh
   - Hard refresh your browser (Ctrl+Shift+R)

## Need Help?

If you continue to have issues, check:
- Your Supabase project is active
- You have the correct database permissions
- The `profiles` table exists (required for foreign keys)

