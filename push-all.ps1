param(
    [string]$RepoName = "BF6COMPAPP",
    [string]$Owner = "samsondebug"
)
$ErrorActionPreference = "Stop"

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Error "GitHub CLI (gh) not found. Install it, then run: gh auth login"
}

if (-not (Test-Path ".gitignore")) {
    @"
node_modules
dist
dist-electron
dist-app
build
coverage
*.log
*.zip
.DS_Store
.env
exports
"@ | Set-Content -NoNewline .gitignore
}

if (-not (Test-Path ".npmrc")) {
    @"
fund=false
audit=false
ignore-scripts=true
"@ | Set-Content -NoNewline .npmrc
}

if (-not (Test-Path "README.md")) {
    @"
# BF6COMPAPP

Clean Electron + React + Tailwind + TypeScript starter.
"@ | Set-Content -NoNewline README.md
}

if (-not (Test-Path ".git")) { git init -b main | Out-Null }
git add .
try { git diff --cached --quiet } catch { git commit -m "chore: initial commit (BF6COMPAPP starter)" }

$originExists = $true
try { git remote get-url origin | Out-Null } catch { $originExists = $false }

if (-not $originExists) {
    gh repo create "$Owner/$RepoName" --public --source=. --remote=origin --push
} else {
    git remote set-url origin "https://github.com/$Owner/$RepoName.git"
    git push -u origin main
}
Write-Host "✅ Done! https://github.com/$Owner/$RepoName"
