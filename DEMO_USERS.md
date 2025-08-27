# Demo Users for Authentication Testing

This file lists all the demo users available for testing the authentication system.

## Admin Users
- **Email:** admin@university.edu  
  **Password:** admin123  
  **Role:** Admin  
  **Name:** System Administrator  
  **Department:** IT Services

- **Email:** admin.tech@university.edu  
  **Password:** admin123  
  **Role:** Admin  
  **Name:** Technical Administrator  
  **Department:** IT Services

- **Email:** admin.academic@university.edu  
  **Password:** admin123  
  **Role:** Admin  
  **Name:** Academic Administrator  
  **Department:** Academic Affairs

## Professor Users
- **Email:** prof.smith@university.edu  
  **Password:** prof123  
  **Role:** Professor  
  **Name:** Dr. John Smith  
  **Department:** Computer Science

- **Email:** prof.johnson@university.edu  
  **Password:** prof123  
  **Role:** Professor  
  **Name:** Dr. Sarah Johnson  
  **Department:** Mathematics

- **Email:** prof.wilson@university.edu  
  **Password:** prof123  
  **Role:** Professor  
  **Name:** Dr. Robert Wilson  
  **Department:** Physics

- **Email:** prof.davis@university.edu  
  **Password:** prof123  
  **Role:** Professor  
  **Name:** Dr. Emily Davis  
  **Department:** Chemistry

- **Email:** prof.brown@university.edu  
  **Password:** prof123  
  **Role:** Professor  
  **Name:** Dr. Michael Brown  
  **Department:** Biology

## Student Users (50+ users)
All student users have the password: **password123**

- **Email:** student001@university.edu  
  **Name:** Jane Doe  
  **Department:** Computer Science

- **Email:** student002@university.edu  
  **Name:** John Smith  
  **Department:** Mathematics

- **Email:** student003@university.edu  
  **Name:** Emily Johnson  
  **Department:** Physics

- **Email:** student004@university.edu  
  **Name:** Michael Wilson  
  **Department:** Chemistry

- **Email:** student005@university.edu  
  **Name:** Sarah Davis  
  **Department:** Biology

... and 45 more students (student006@university.edu through student050@university.edu)

## Departments Available
- Computer Science
- Mathematics  
- Physics
- Chemistry
- Biology
- Engineering
- Business
- Psychology
- English
- History
- Art
- Music
- Political Science
- Economics
- Sociology

## Testing Notes
- All users are created with proper BCrypt password hashing
- Student IDs are hashed for FERPA compliance
- Authentication tokens are generated using JWT
- The system supports role-based access control
- New users can be created through the signup form