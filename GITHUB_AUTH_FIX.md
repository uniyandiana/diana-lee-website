# Fix GitHub Authentication Issue

## Problem
Git is trying to use credentials for "foreignteer" account, but you need to push to "uniyandiana" account.

## Solution 1: Personal Access Token (PAT) - RECOMMENDED

### Step 1: Create a Personal Access Token
1. Go to GitHub.com and log in as **uniyandiana**
2. Click your profile picture (top right) → **Settings**
3. Scroll down and click **Developer settings** (bottom left)
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token** → **Generate new token (classic)**
6. Settings for the token:
   - Note: "Diana Website Deployment"
   - Expiration: 90 days (or custom)
   - Select scopes: Check **repo** (this checks all sub-items automatically)
7. Click **Generate token** at the bottom
8. **COPY THE TOKEN IMMEDIATELY** - you won't see it again!
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 2: Clear Old Credentials
```bash
# Remove the old remote
cd "/Users/diana/Documents/Diana - Personal Website"
git remote remove origin
```

### Step 3: Add Remote with Token
```bash
# Replace YOUR_TOKEN with the token you just copied
git remote add origin https://YOUR_TOKEN@github.com/uniyandiana/diana-lee-website.git

# Example:
# git remote add origin https://ghp_abc123xyz789@github.com/uniyandiana/diana-lee-website.git
```

### Step 4: Push to GitHub
```bash
git push -u origin main
```

---

## Solution 2: Clear Keychain Credentials (Alternative)

If you prefer not to use a token in the URL:

### Step 1: Remove cached credentials
1. Open **Keychain Access** app (search in Spotlight)
2. Search for "github"
3. Find any entries for "github.com"
4. Right-click each → **Delete**
5. Confirm deletion

### Step 2: Push again (it will ask for credentials)
```bash
cd "/Users/diana/Documents/Diana - Personal Website"
git push -u origin main
```

When prompted:
- Username: `uniyandiana`
- Password: Use a **Personal Access Token** (NOT your GitHub password)
  - Create token following Step 1 above
  - Paste the token as password

---

## Solution 3: Use SSH (Most Secure - Advanced)

### Step 1: Generate SSH key
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter to accept default location
# Enter a passphrase (or leave empty)
```

### Step 2: Add SSH key to GitHub
```bash
# Copy your public key
cat ~/.ssh/id_ed25519.pub
# Copy the output (starts with ssh-ed25519)
```

1. Go to GitHub.com → Settings → SSH and GPG keys
2. Click **New SSH key**
3. Title: "Diana's MacBook"
4. Paste the key
5. Click **Add SSH key**

### Step 3: Update remote to use SSH
```bash
cd "/Users/diana/Documents/Diana - Personal Website"
git remote remove origin
git remote add origin git@github.com:uniyandiana/diana-lee-website.git
git push -u origin main
```

---

## Verification

After successfully pushing, you should see:
```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
...
To https://github.com/uniyandiana/diana-lee-website.git
 * [new branch]      main -> main
```

Then your code is on GitHub and ready for Vercel deployment!

---

## Next Steps After Successful Push

1. ✅ Verify code is on GitHub: https://github.com/uniyandiana/diana-lee-website
2. Continue with Vercel deployment (see DEPLOYMENT.md Step 3)
