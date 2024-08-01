#!/bin/bash

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

# Add all files to the repository
git add -A

# Commit the changes
git commit -m 'Deploy to GitHub Pages'

# Push the repository to GitHub
git push -f git@github.com:hamiltonnBC/portfolio-project.git master:gh-pages

# Navigate back to the project root
cd ..
