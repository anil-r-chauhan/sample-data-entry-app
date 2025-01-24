# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

## How to Start the App

To start the application, follow these steps:

1. **Clone the Repository**  
   Clone this repository to your local machine using the following command:  
   git clone <repository-url>

2. **Navigate to the Project Directory**  
   Change into the project directory:  
   cd <project-directory>

3. **Install Dependencies**  
   Install all the required dependencies:  
   npm install

4. **Start the Development Server**  
   Start the app in development mode:  
   npm run dev

5. **Access the Application**  
   Open your browser and go to [http://localhost:5173](http://localhost:5173) (default Vite port).

## Routes

The application uses `react-router-dom` for routing. Here's an overview of the available routes:

| Path               | Component           | Description                                  |
|--------------------|---------------------|---------------------------------------------|
| `/`                | `UsersDataTable`    | Displays the users data table.              |
| `/users`           | `UsersDataTable`    | Displays the users data table.              |
| `/userdetails/:id` | `UserDetailsPage`   | Displays the details of a single user.      |