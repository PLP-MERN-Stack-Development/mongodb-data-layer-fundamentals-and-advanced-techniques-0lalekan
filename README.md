
# How to Run and Install Dependencies

This guide explains how to set up your environment, install all required dependencies, and run the MongoDB scripts for this assignment.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

1. **Node.js** (v18 or higher)
    - Download and install from: https://nodejs.org/
    - To verify installation, run:
       ```powershell
       node -v
       npm -v
       ```
2. **MongoDB Community Edition**
    - Download and install from: https://www.mongodb.com/try/download/community
    - Follow the official installation guide for your OS.
    - After installation, start the MongoDB server:
       ```powershell
       net start MongoDB
       ```
    - Or, if using `mongod` directly:
       ```powershell
       mongod
       ```
3. **MongoDB Shell (mongosh)**
    - Usually included with MongoDB Community Edition.
    - To verify, run:
       ```powershell
       mongosh
       ```

## Project Setup

1. **Clone the Repository**
    - If you have a GitHub repository, clone it:
       ```powershell
       git clone <your-repo-url>
       cd <your-repo-folder>
       ```

2. **Initialize Node.js Project**
    - If not already initialized, create a `package.json`:
       ```powershell
       npm init -y
       ```

3. **Install Dependencies**
    - Install the MongoDB Node.js driver:
       ```powershell
       npm install mongodb
       ```
    - (Optional) If you want to use environment variables, install dotenv:
       ```powershell
       npm install dotenv
       ```

## Populating the Database

Before running queries, you need to insert sample data:

1. Run the data population script:
    ```powershell
    node insert_books.js
    ```
    - This will create and populate the `books` collection in your MongoDB database.

## Running the Queries

1. Execute the queries script:
    ```powershell
    node queries.js
    ```
    - This will run all the MongoDB queries and print results to your terminal.

## Troubleshooting

- If you get connection errors, ensure MongoDB is running and the URI in `queries.js` matches your setup.
- For Windows, you may need to add MongoDB binaries to your PATH.
- If you install dependencies globally, use `npm list -g` to verify.

## Useful Commands

- To check installed packages:
   ```powershell
   npm list
   ```
- To update npm:
   ```powershell
   npm install -g npm
   ```
- To remove `node_modules` and reinstall:
   ```powershell
   rm -r node_modules
   npm install
   ```

---

You are now ready to run and experiment with MongoDB scripts for this assignment!
