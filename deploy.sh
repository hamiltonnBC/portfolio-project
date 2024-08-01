#!/bin/bash

# Ensure the main branch is up to date
git checkout main
git pull origin main

# Build the project
npm run build

# Navigate into the build output directory
cd build

# Create a .nojekyll file to bypass Jekyll processing
touch .nojekyll

# If you are deploying to a custom domain
echo 'nicholastreyhamilton.me' > CNAME

# Initialize a new Git repository
git init

# Add remote origin
git remote add origin git@github.com:hamiltonnBC/portfolio-project.git

# Create and switch to the gh-pages branch
git checkout -b gh-pages

# Add all files to the repository
git add -A

# Commit the changes
git commit -m 'Update GitHub Pages deployment'

# Push the repository to GitHub
git push -f origin gh-pages

# Navigate back to the project root
cd ..
