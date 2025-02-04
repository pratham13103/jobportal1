# JobPortal1

A full-stack job portal application with a `client` (frontend) and `server` (backend).

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (latest LTS version)
- npm (comes with Node.js)

### Setup Instructions

1. **Clone the repository**  
   ```sh
   git clone https://github.com/your-username/jobportal1.git
   cd jobportal1

2. Add .env files

Create a .env file inside both client and server folders.
Define necessary environment variables as required by the project.

3. Install dependencies
Run the following commands in the project root directory:

cd client
npm install
cd ../server
npm install

4. Run the application

Open two terminals:

In the first terminal:
cd server
npm start
In the second terminal:
cd client
npm start
Access the application

The frontend (client) will typically run on http://localhost:3000
The backend (server) will typically run on http://localhost:8080 (or as defined in .env)

5. edit mysql details in server->db.js
