# Prophet Security Investigations Dashboard

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Starting the Backend Server](#starting-the-backend-server)
  - [Starting the Frontend Application](#starting-the-frontend-application)
- [Testing](#testing)
- [Design Decisions](#design-decisions)
- [Challenges & Solutions](#challenges--solutions)
- [Trade-offs](#trade-offs)
- [Proposed Enhancements](#proposed-enhancements)
- [Future Improvements](#future-improvements)
- [License](#license)
- [Contact](#contact)

---

## Introduction

Welcome to the **Prophet Security Investigations Dashboard**! This single-page web application (SPA) was developed as part of the Prophet Engineering recruiting process to showcase ongoing security investigations. The dashboard provides a dynamic, user-friendly interface for viewing, sorting, and filtering security incidents, demonstrating proficiency in React, TypeScript, and Tailwind CSS.

## Features

### 1. **Dynamic Display**
- **User-Friendly Interface:** Intuitive layout for easy navigation and understanding of ongoing security investigations.
- **Detailed Information:** Displays key fields such as Title, Source, Severity, Determination, Alert Fired Timestamp, Last Updated Timestamp, Analyst Assigned, and Reviewable Status.

### 2. **Sorting and Filtering**
- **Single-Select Filters:** Each filter category (Source, Severity, Determination) allows selecting one option at a time. For example, you can select "AWS" for Source, "Low" for Severity, and "Reviewable" for Determination.
- **Multiple Filter Categories:** Apply multiple filters across different categories simultaneously to refine the investigations list.
- **Date Range Filtering:** Specify start and end dates to view investigations within a particular timeframe.
- **Sorting:** Sort investigations by various parameters like Title, Severity, Alert Fired Date, etc., in ascending or descending order.
- **Selected Filters Display:** Easily manage and remove applied filters.

### 3. **Pagination**
- **Efficient Data Handling:** Fetch and display data in paginated form to ensure performance with large datasets.
- **Customizable Page Size:** Users can select the number of investigations displayed per page.

### 4. **Responsive Design**
- **Tailwind CSS:** Utilizes Tailwind CSS for a responsive and aesthetically pleasing design.
- **Light/Dark Mode:** Supports both light and dark themes with dynamic styling adjustments.
- **Rounded UI Elements:** Enhanced visual appeal with rounded corners on headers, rows, and side panels.

### 5. **Side Panel for Details**
- **Detailed View:** Click on any investigation row to view comprehensive details in a side panel.
- **Smooth Transitions:** Seamless opening and closing of the side panel with animated transitions.

---

## Tech Stack

- **Language:** TypeScript
- **Framework:** React
- **Styling:** Tailwind CSS
- **State Management:** React Hooks (`useState`, `useEffect`, `useMemo`)
- **API Integration:** Axios for HTTP requests
- **Backend:** Node.js with Express
- **Testing:** Jest and React Testing Library

---

## Installation

### Prerequisites
- **Node.js:** Ensure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **npm:** Node.js comes with npm. Verify installation by running `npm -v` in your terminal.

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/prophet-takehome.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd prophet-takehome
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```
   This command installs both frontend and backend dependencies as they are managed within the same package.json.

## Running the Application

### Starting the Backend Server
Ensure You Are in the Project Root Directory:
```bash
cd prophet-takehome
```

Start the Backend Server:
```bash
node server.js
```
- The server will start on http://localhost:3001.
- API Endpoint: http://localhost:3001/investigations
- Note: The server automatically adds new investigations every ~10 seconds to simulate ongoing security events.

### Starting the Frontend Application
Ensure You Are in the Project Root Directory:
```bash
cd prophet-takehome
```

Start the React Development Server:
```bash
npm start
```
- The application will open in your default browser at http://localhost:3000.
- If it doesn't open automatically, navigate to the URL manually.
- Note: Ensure the backend server is running before starting the frontend to enable API integration.

### Accessing the Application
- Dashboard: http://localhost:3000
- Backend API: http://localhost:3001/investigations

## Testing

### Running Tests
Ensure You Are in the Project Directory:
```bash
cd prophet-takehome
```

Run Tests:
```bash
npm test
```
This will launch the test runner in interactive watch mode using Jest and React Testing Library.

## Design Decisions

### 1. Client-Side Rendering (CSR)
**Rationale:** Opted for CSR using React to create a dynamic and interactive user experience. CSR is well-suited for SPAs where real-time data updates and user interactions are frequent.

### 2. State Management with React Hooks
**Rationale:** Utilized built-in React hooks (useState, useEffect, useMemo) for managing state and side effects. This approach simplifies state management without introducing external libraries like Redux.

### 3. Custom Hooks for Separation of Concerns
**Rationale:** Developed custom hooks (useAllInvestigations, useFilters, usePaginatedSortedData, useSelectedInvestigation) to encapsulate logic related to data fetching, filtering, sorting, and selection. This enhances code reusability and maintainability.

### 4. Tailwind CSS for Styling
**Rationale:** Chose Tailwind CSS for its utility-first approach, enabling rapid and consistent styling. Tailwind ensures a responsive design and simplifies the implementation of features like dark mode and rounded UI elements.

### 5. API Integration with Axios
**Rationale:** Used Axios for its simplicity and powerful features in handling HTTP requests, including support for query parameters and error handling.

## Challenges & Solutions

### 1. Single-Select Filtering with Multiple Categories
**Challenge:** Implementing single-selection filters within each category (Source, Severity, Determination) while allowing multiple filters across different categories.

**Solution:** Designed the filtering logic to handle single selections per category. Users can select one option in each filter category, and multiple categories can be filtered simultaneously (e.g., selecting "AWS" for Source, "Low" for Severity, and "Reviewable" for Determination).

### 2. Handling Large Datasets with Pagination
**Challenge:** Displaying a large number of investigations could impact performance and user experience.

**Solution:** Implemented server-side pagination to fetch data in chunks, reducing the load on the client. Combined this with client-side state management to handle sorting and filtering efficiently.

### 3. Responsive Design and Theme Management
**Challenge:** Ensuring the application is fully responsive and maintains visual consistency across light and dark modes.

**Solution:** Leveraged Tailwind CSS's responsive utilities and dark mode features. Added rounded corners and conditional styling to enhance aesthetics without compromising functionality.

### 4. API Reliability
**Challenge:** The backend server introduces a 1% chance of failure to simulate real-world scenarios, which could disrupt the frontend experience.

**Solution:** Implemented robust error handling on the frontend to gracefully inform users of any issues and prevent the application from crashing.

## Trade-offs

### 1. Client-Side vs. Server-Side Rendering
**Decision:** Chose client-side rendering for simplicity and speed in building an interactive SPA.

**Trade-off:** While CSR offers better interactivity, it may not be optimal for SEO or initial load times compared to server-side rendering.

### 2. Using Custom Hooks vs. State Management Libraries
**Decision:** Opted for custom React hooks instead of integrating a state management library like Redux.

**Trade-off:** Custom hooks simplify the codebase and reduce dependencies but may not scale as efficiently for extremely large and complex state management needs.

### 3. Testing Scope
**Decision:** Focused on testing critical functionalities due to time constraints.

**Trade-off:** Comprehensive test coverage is essential for production-grade applications, but prioritizing key features ensures essential reliability within the project's timeframe.

## Proposed Enhancements

### 1. API Enhancements
- **Multi-Value Filters:** Further optimize the /investigations endpoint to handle more complex filtering scenarios, such as range queries or partial matches.
- **Search Functionality:** Introduce keyword-based search to allow users to find investigations based on titles or descriptions.

### 2. Saved Queries
- **Description:** Implement functionality to allow users to save their filter configurations (queries) in localStorage or associate them with user accounts.
- **Benefits:** Enables users to quickly access frequently used filters, enhancing usability and efficiency by reducing repetitive filter setups.
  
### 3. Custom Scoring System
- **Description:** Introduce a custom scoring mechanism that evaluates investigations based on defined criteria or the severity/extent of the problem.
- **Benefits:** Helps prioritize investigations by automatically scoring them according to their criticality, enabling analysts to focus on the most impactful issues.
  
## Future Improvements

### 1. Enhanced Testing
- **Unit Tests:** Expand test coverage to include more components and edge cases.
- **Integration Tests:** Implement end-to-end tests using tools like Cypress to simulate real user interactions.

### 2. Internationalization (i18n)
**Implementation:** Add support for multiple languages to cater to a broader, global audience.

### 3. Advanced Filtering and Sorting
**Implementation:** Introduce additional filtering options, such as filtering by analyst name or incorporating advanced sorting criteria.
