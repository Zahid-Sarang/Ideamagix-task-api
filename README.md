# Ideamagix-task-api

## Technologies Used

- TypeScript
- Node.js
- Express.js
- MongoDB
- Express Validators
- JWT Tokens
- Bcrypt
- winston
## app.ts (Express App Configuration):

- Sets up Express app with middleware (cookie-parser, cors).
- Defines routes for authentication (/api/auth), courses (/api/courses), and lectures (/api/lectures).
- Handles static file serving for uploads.
- Implements error handling middleware to log errors and send a standardized JSON response.

## authRouter.ts (Authentication Routes):

- Defines routes for user authentication, including registration, login, self-information retrieval, token refresh, and fetching user lists.
- Uses middleware for validation, authentication, and role-based access control.
- Utilizes services for user-related operations, token management, and logging.
  
## AuthController.ts (Authentication Controller):

- Implements methods for user registration, login, fetching user information, token refresh, and getting a list of users.
- Uses services for user-related operations, token management, and logging.
- Generates and sets HTTP-only cookies for tokens during registration and login.
  
## UserService.ts (User Service):

- Provides methods for creating a user, finding a user by email, finding a user by ID, and getting a list of users.
- Hashes user passwords before storing them.

## Create a Course

Create a new course in the system.

- **URL:** `/api/courses/`
- **Method:** `POST`
- **Authentication:** Required
- **Authorization:** Requires admin access

### Request

- **Headers:**
  - `Authorization`: Bearer token obtained during authentication.

- **Body:**
  - `name` (string): The name of the course.
  - `level` (string): The level or category of the course.
  - `description` (string): A brief description of the course.
  - `file` (multipart/form-data): The file representing the course content.

### Response

- **Status Code:** 201 (Created)
- **Body:**
  ```json
  {
    "name": "Php",
	"level": "high",
	"description": "it's a high level course",
	"image": "http://localhost:8005/src/uploads/1699972836198-539067249.png",
	"lectures": [],
	"_id": "655386e42862376e4f8e87aa",
	"createdAt": "2023-11-14T14:40:36.208Z",
	"updatedAt": "2023-11-14T14:40:36.208Z",
	"__v": 0,
	"id": "655386e42862376e4f8e87aa"
  }
  ```
## Error Responses
 - Status Code: 400 (Bad Request)
    - Body: { "error": "All fields are required!" }
    - Description: Indicates that one or more required fields are missing.

- Status Code: 401 (Unauthorized)
   - Body: { "error": "Unauthorized" }
   - Description: Indicates that the request is missing a valid authentication token.
     
- Status Code: 403 (Forbidden)
   - Body: { "error": "Forbidden" }
   - Description: Indicates that the authenticated user does not have sufficient privileges to perform this action.
     
- Status Code: 500 (Internal Server Error)
   - Body: { "error": "Internal Server Error" }
   - Description: Indicates an unexpected server error during course creation.
## Get Courses
#### Retrieve a list of all courses in the system.

- URL: /api/courses/
- Method: GET
- Authentication: Required
- Authorization: Requires admin access

## Response
- Status Code: 200 (OK)
- Body:
  ```json
  [
  {
    "name": "Introduction to Programming",
    "level": "Beginner",
    "description": "An introductory course on programming",
    "filePath": "/uploads/course-files/intro-to-programming.pdf",
    "createdAt": "2023-01-01T12:00:00.000Z",
    "updatedAt": "2023-01-01T12:00:00.000Z"
  },
  // Additional courses
  ]
   ```
  
