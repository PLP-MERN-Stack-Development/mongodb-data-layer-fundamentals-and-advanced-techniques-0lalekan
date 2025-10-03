
# How to Run and Install Dependencies

This guide explains how to set up your environment, install all required dependencies, and run the MongoDB scripts for this assignment.

## Prerequisites

1. **Initialize Node.js Project**
    - If not already initialized, create a `package.json`:
       ```powershell
       npm init -y
       ```

2. **Install Dependencies**
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
