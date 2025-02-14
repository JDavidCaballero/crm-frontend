CRM Technical Challenge - README

How to Run the Project:

    yarn install && yarn dev

For test:

    yarn jest

For coverage:

    yarn jest --coverage

Decisions

To implement the CRM functionalities, the following decisions were made based on the requirements and assumptions:

1.  Technology Stack

    React + vite: Chosen as the primary framework due to its flexibility, component-based architecture, and ability to create responsive user interfaces. This ensures the application works seamlessly on both desktop and mobile devices, and with vite to get a faster creation of the project and compatibility with libraries.

    Tailwind CSS: Used for styling because of its utility-first approach, which allows for rapid development and ensures a clean, readable design for agents validating prospects.

    MVVM Architecture: Implemented to separate concerns and improve maintainability:

        Model: Handles data logic and is located in the services folder.

        View: Represents the UI and is located in the screens folder.

        ViewModel: Manages the logic between the data and the views. In this case, useQuery acts as the bridge between the backend data and the components.

2.  User Interface Design

    Tables for Leads and Prospects: Designed to display lead and prospect information clearly. Each table includes:

        Filtering: Buttons to filter data by column values (e.g., alphabetical or numerical order).

        Search Functionality: A search bar to find leads or prospects by name or last name.

    Tabs for Navigation: Two tabs were implemented:

        Leads Tab: Displays individuals interested in the company's services.

        Prospects Tab: Shows validated leads after passing the required checks.

    Validation Modal: A modal appears when the agent clicks the "Validate" button in the leads table. This modal checks the three requirements to convert a lead into a prospect.

3.  Data Mocking

    JSON Files: Three JSON files were created to simulate backend data:

        leads.json: Contains lead information.

        judicialRecords.json: Contains judicial record data.

        nationalRegistry.json: Contains national registry data.

    Timeout Simulation: A setTimeout was used to mimic a data fetch delay before returning the JSON data.

    Data Fetching: useQuery was used to fetch and manage the data from the JSON files.

4.  Testing

    Unit and Integration Tests: Tests were implemented based on the coverage table from Jest. The testing strategy focused on:

        Starting with the largest component (HomeScreen) and moving to smaller, more specific components.

        Ensuring that parent component tests cover child components unless the child has specific logic (e.g., the leads list or confirmation modal).

Assumptions

    Agent Workflow:

        Agents will primarily use desktop computers to validate prospects, but the application is designed to be responsive for mobile devices as well.

        Agents need a clear and readable interface to efficiently validate leads.

    Data Structure:

        The data provided in the JSON files is sufficient for simulating backend responses.

        The timeout of 7 seconds for data fetching is acceptable for this use case.

    Validation Requirements:

        The three validation requirements (existence in the national registry, no judicial records, and a satisfactory score) are sufficient to convert a lead into a prospect.

Improvements

While the current implementation meets the requirements, the following improvements could enhance the project:

    File Structure:

        A more strict and modular file structure could be implemented. For example:

            Creating separate folders for each component.

            Grouping related files (e.g., services, hooks, utils) into dedicated folders.

        However, given the small scale of this project, this level of organization was not deemed necessary.

    State Management:

        Implement Libraries like MSW to make better mocks and intercept url's

        A state management library like Redux or Zustand could be introduced for better global state management, especially as the application grows.

    Error Handling:

        Implement robust error handling for data fetching and user interactions to improve the user experience.

    Testing:

        Increase test coverage by adding more edge cases and scenarios according to coverage table.

        Use tools like Cypress for end-to-end testing to ensure the entire workflow functions as expected.

    Performance Optimization:

        Optimize data fetching and rendering to reduce load times, especially for larger datasets, but this is better with a real backend integration for different load times.
