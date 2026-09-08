================================================================================
REDA ELNAGGAR - PORTFOLIO PROJECTS DIRECTORY
================================================================================

This directory is designated for storing future project screenshot images.

HOW TO ADD FUTURE PROJECTS:
1. Place your project screenshots into this folder:
   e.g.,
   projects/
   ├── task-api.jpg
   ├── library-system.jpg
   └── inventory-service.jpg

2. Open "script.js" and add your project data to the "projects" array:

   const projects = [
     {
       title: "Task Management REST API",
       description: "A secure ASP.NET Core Web API with clean architecture and SQL Server persistence.",
       technologies: ["C#", "ASP.NET Core", "SQL Server", "RESTful APIs"],
       image: "projects/task-api.jpg",
       github: "https://github.com/redaelnaggar/task-api",
       liveDemo: "" // Leave empty if no live demo exists
     }
   ];

3. Refresh your portfolio in the browser:
   - The card will render dynamically.
   - The "GitHub" and "Live Demo" buttons will automatically display only when valid URLs are provided.
   - Clicking the project image opens a full-screen high-definition lightbox.
================================================================================
