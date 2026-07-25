# \## Practical 3: API Integration and Data Rendering in React

# 

# \### API Used

# \- \*\*GitHub REST API\*\* — `https://api.github.com/users/<username>/repos`

# \- No authentication required (public endpoint), so no API key setup is needed.

# 

# \### Features Implemented

# \- Fetches repository data from the GitHub API on component mount using `useEffect`

# \- Displays a loading spinner (`Spinner` component) while the request is in progress

# \- Displays an error message (`ErrorMessage` component) if the API call fails

# \- Renders each repository's name and URL once data loads successfully

# 

# \### Setup Steps

# 1\. Clone the repository:

# ```bash

# &#x20;  git clone https://github.com/Jahnvi007/portfolio-D25IT122.git

# &#x20;  cd portfolio-D25IT122

# ```

# 2\. Install dependencies:

# ```bash

# &#x20;  npm install

# ```

# 3\. Run the development server:

# ```bash

# &#x20;  npm run dev

# ```

# 4\. Open the app in your browser (Vite will show the local URL, typically `http://localhost:5173`)

# 5\. Navigate to the \*\*Projects\*\* page to see the GitHub repositories load dynamically.

