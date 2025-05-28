# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

// App Structure
chat-app/

backend/---> Industry level strucutre
│── src/
│ ├── config/ # Database and environment configurations
│ │ ├── db.js # Database connection
│ │ ├── env.js # Environment variables
│ │
│ ├── controllers/ # Handles business logic for routes
│ │ ├── authController.js
│ │ ├── chatController.js
│ │ ├── groupController.js
│ │
│ ├── middlewares/ # Custom middleware functions
│ │ ├── authMiddleware.js
│ │ ├── errorMiddleware.js
│ │
│ ├── models/ # Database models (MongoDB or SQL)
│ │ ├── User.js
│ │ ├── Chat.js
│ │ ├── Message.js
│ │ ├── Group.js
│ │
│ ├── routes/ # Express routes
│ │ ├── authRoutes.js
│ │ ├── chatRoutes.js
│ │ ├── groupRoutes.js
│ │
│ ├── services/ # Business logic and helper functions
│ │ ├── authService.js
│ │ ├── chatService.js
│ │ ├── groupService.js
│ │
│ ├── utils/ # Utility functions
│ │ ├── jwt.js # JWT token functions
│ │ ├── response.js # Standardized API response format
│ │
│ ├── app.js # Main Express app configuration
│ ├── server.js # Server entry point (includes Socket.IO)
│── .env # Environment variables
│── package.json # Dependencies and scripts

│── frontend/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page-level components
│ │ ├── hooks/ # Custom React hooks
│ │ ├── contexts/ # Context API for state management
│ │ ├── services/ # API calls (Axios/Fetch)
│ │ ├── styles/ # Tailwind CSS styles
│ │ ├── App.js # Main component
│ │ ├── main.jsx # Entry point
│ ├── public/
│ ├── .env # Environment variables
│ ├── vite.config.js # Vite configuration
│── .gitignore
│── package.json
│── README.md

// Things too add

1. text Inside svg
2. tick functionality
3. user name overflow then it will be ... in the chatlist section also with the new message// done
4. last message to be shown all the time // Done
5. Date /time when last messge was sent should be there in chatlist
6. Chatlist width should be fixed and will expand after md of slighlty more an take 1/4 of thw width on mobile devices make it work too
7. Open profile name should be ... when size is less than its width //done
8. Selected profile color needs to be changed to 303030 from 474747// done
9. Large messages taking right side width also limit it to some extent so that it does not occupirs right side length //done
11. Horizotal sloder arrives when a particular text chat is too long //done
12. On Zooming Zomm like whatsapp that one words and theri component gets zommed not all the thig
13. Self message Issue. correct it// done
14. group name not showing// done
15. onclick create close all modal open the new group.// done
16. On unselect all the users event hen the next options appears //Done
17. select current group id //done
18. Fix min width of chatlist //done
19. ongoing back from create option show just prevois one modal not the newchat modal
20. 

// tomorrow Backend in the morning

1. Why user in verification of token of user inside token
2. What to do with the response of the after storing the message in the databse in socket section //Done
3. Real time typing update
4. Update particular chat id with the new message by the particular person in the chat list section. No need to add message at the cht window just update it in the backend and emit to frontend in the chat list.//Done
5.
