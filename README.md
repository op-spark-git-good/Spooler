# Spooler
**By Git Good**

## What Does Spooler Do?

Spooler aims to streamline organizing materials and plans for sewing projects. Spooler allows users to keep a list of all of their materials and projects that they can access from anywhere. It also allows users to connect with their fellow sewists, where they can share updates and such about their projects.

## Getting Started
### Dev Setup
> After cloning Spooler, ensure you have the following environment set up:
- **Node version**: 20
- **NPM** is installed
- **MongoDB** is installed (if you're in a windows environment, ensure that it is running as well)
### To Start Application
> Complete the following steps **in order** after pulling the repo to launch the app
1. Create a `.env` file in the root directory
2. Obtain a `GOOGLE_CLIENT_ID` and a `GOOGLE_CLIENT_SECRET` through the Google API. Add these as variables in the `.env` file
3. Add `MONGODB_URI = mongodb://localhost:27017/Spooler` to the `.env` file
4. Obtain an API key from Barcode Spider and add it as `BARCODE_TOKEN`
>The free Barcode Spider account only has 10 calls per day per user
5. Obtain credentials from Cloudinary, and add them as `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`
6. Export all variables from the `.env` file
7. Run the following in the terminal in root directory
- `npm install`
  > Ensure that all modules were installed successfully (warnings are ok)
- `npm run build`
- `npm start`
  > This should provide a link to the webpage and confirm that you have connected to the database
- `npm run seed`
> Now Spooler should be running, congratulations!



## Tech Stack
### Frontend
- **[React 19](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)** – UI framework
- **[React Router](https://reactrouter.com/home)** – Client-side routing
- **[React Hook Form](https://www.react-hook-form.com/api/)** – Form handling
- **[Material UI](https://mui.com/material-ui/getting-started/)** (@mui/material, @mui/icons-material, @emotion/react, @emotion/styled) – Styling and UI components
### Backend
- **[Express.js](https://expressjs.com/)** – Server framework
- **[Mongoose](https://mongoosejs.com/docs/)** – MongoDB ORM
- **[Passport](https://www.passportjs.org/docs/)** (Google OAuth 2.0) – Authentication
- **[Express Session]()** – Session management
- **[Cors](https://www.npmjs.com/package/cors)** – Cross-origin request handling
- **[Dotenv](https://www.npmjs.com/package/dotenv)** – Environment variable management
- **[Cloudinary](https://cloudinary.com/documentation) + [Multer](https://www.npmjs.com/package/multer)** – File/image uploads
- **[Barcode Spider](https://devapi.barcodespider.com/documentation)** – Search by keyword
### Database
- **[MongoDB](https://www.mongodb.com/docs/)** – NoSQL database
- **[Mongoose](https://mongoosejs.com/docs/)** – ODM for MongoDB
### Utilities & Dev Tools:
- **[Axios](https://axios-http.com/docs/intro)** – API requests
- **[Dayjs](https://day.js.org/docs/en/installation/installation)** – Date/time handling
- **[Lodash](https://lodash.com/docs/)** – Utility functions
- **[Webpack](https://webpack.js.org/concepts/)** – Bundling
- **[Babel](https://babeljs.io/docs/)** – JavaScript compiler (React/ES6+)
- **[ESLint](https://eslint.org/docs/latest/)** (Airbnb rules) – Linting
- **[Nodemon](https://www.npmjs.com/package/nodemon)** – Development server auto-reload
- **[Rimraf](https://www.npmjs.com/package/rimraf)** – File deletion utility
### APIs & External Services
- **[Google Passport](https://www.passportjs.org/concepts/authentication/google/)** – Image recognition
- **[Cloudinary](https://cloudinary.com/documentation)** – Cloud-based media storage
- **[Barcode Spider](https://devapi.barcodespider.com/documentation)** – Search by keyword

## Client Side
- **Nav Bar** - Users traverse the site using the Nav Bar, easing movement from one page to another.
- **Home** - A page that redirects Users to sign in using their Google accounts. If a User attempts to access any other portion of the site without first signing in, they should be redirected to here
- **Stashes** - Users are able to see all of their supplies in one convenient location. They are able to update these stashes to reflect changes in their real life stashes. Users will be able to avoid accidentally buy thing they already have thanks to these handy lists!
- **Patterns** - When Users add a new Pattern to their stash, they must fill out the whole form and upload an image of the Pattern.
- **Fabrics** - Users can see their entered fabrics in an overview or singleton view, and can update information about these fabrics as changes occur. Great for keeping a tidy closet
- **Notions** - When Users add thread to their stash, they make a search and get a list of results of the brand/color they searched. They then can choose and entry from the list and add additional details before finally adding it to their stash.
- **Projects** - Users may create Projects, which will keep track of tasks and materials required for their sewing projects. As they work on the Project, they can update the tasks and materials to reflect their progress.
- **Community** - Users can create Posts about their projects and see and interact with other Users. They also can like other Users' Posts, as well as edit or delete their own Posts. When a User add to their stashes, a description of the addition will be added to their feed.

## Server Side

### Models
#### **Fabrics** 
>The fabrics feature is geared towards simplicity for the user displaying prominent buttons to easily switch between an overview of all your fabrics, or just one at a time for special attention. The information held by the database as fabrics is concerned is:
1. The name of the fabric
2. A URL to its image
3. A detailed(or brief) description of the fabric
4. A number representing how many yards of fabric you have
5. The main colors in the fabric
6. The weave/type that composes the fabric
7. The brand(this one is optional)
8. Where you acquired the fabric(also optional)
9. Care instructions
10. Any additional notes you might have about the experience of using that fabric, etc..
>The view-change feature is meant to simulate zooming in to a particular fabric in your vast closet of things. As such, the editing options are only available when in singular mode. No worries there, though, since a simple click on any picture or title will take you straight to their singular view. Not to mention a short list that holds the names of all your fabrics with the same convenience as the clickable titles in the scroll-down menu.
#### **Notions**
> The notions model is designed with thread in mind. It holds these significant aspects:
 - **upc** The barcode upc for use with the barcode API.
 - **title** The name of the notion.
 - **color** The color (the current incarnation of this model presumes thread is the notion entered).
 - **image** An image of the notion.
 - **brand** self-explanatory.
 - **colorNum** the number in the thread's color description found on the spool.
 - **quantity** the amount in your possession.
 - **length**
quantity, and length are meant to be measured in yards.

#### **Patterns**
>The Pattern model represents a sewing pattern in the Spooler application. It stores essential details about sewing patterns, including fabric type, required notions, size, difficulty level, and designer information. This allows users to organize their pattern collection efficiently.
 - **name** (String, required, default: "unknown") – The name of the pattern.
- **ownerId** (ObjectId, references Users) – The user who owns the pattern.
 - **description** (String, optional) – A brief description of the pattern.
 - **patternImage** (String, optional) – URL for an image of the pattern.
 - **fabricType** (String, required, default: "unknown") – The type of fabric required ("woven", "stretched", or "unknown").
 - **notions** (Array of Strings, optional) – List of required notions (e.g., buttons, zippers, elastic).
 - **size** (String, optional) – Size information for the pattern.
 - **difficultyLevel** (String, default: "beginner") – Difficulty level ("beginner", "intermediate", "advanced").
 - **designer** (String, required, default: "unknown") – The designer of the pattern.
 - **brand** (String, required, default: "unknown") – The brand associated with the pattern.
 - **format** (String, optional) – Specifies if the pattern is in "paper" or "pdf" format.
>This model enables users to create, view, update, and delete sewing patterns, helping them manage their collection in a structured way.

#### **Posts** 
 - **ownerId** user who created the post
 - **title** title of the post
 - **author** author's name
 - **content** content of the post
 - **image** optional post image
 - **likes** array of users that liked the post
 - **createdAt** when the post was created

#### **Projects** 
>The Projects model is intended to be a highly interconnected model, making references to all the other models
 - **owner** property should reference an id from the User that created it. Defaults to null
 - **name** a name for the project. Required 
 - **description** a description of the project, defaults to
 - **Categories** (tasks, patterns, notions, fabrics) all are arrays, and most of them can optionally refer to a corresponding document in another model
#### **Users** 
>The User model represents users in the Spooler application. It stores authentication details and profile information, allowing users to log in, manage their account, and interact with stored sewing materials, patterns, and projects.
- **username** (String, optional) – The display name of the user.
- **googleId** (String, optional) – Unique identifier for users who authenticate via Google OAuth.
- **email** (String, optional) – User's email address.
- **password** (String, optional) – Hashed password for authentication (if not using Google OAuth).
- **profilePicture** (String, optional) – URL for the user's profile picture.
- **createdAt** (Date, default: Date.now()) – Timestamp indicating when the account was created.
>This model supports both traditional email/password authentication and Google OAuth, providing flexibility in user sign-up and login.

# **Known Bugs**
- **Login** Cannot log in due to uri mismatch in deployed product (remedy: should be fine if you set up your own google account for authorization)
**Authorization** endpoints are not currently protected. There's a commented-out piece of code at the bottom of the server index that will re-instate protections, but those protections are not extended to traversal via the nav bar. Making that change will cause an unauthorized screen to show if the user goes to a page via the navbar, then code is changed, then the page is refreshed.
- **projects** is currently non-functional
- **fabrics** form doesn't dirty (doesn't read as if there is info inside of it) when populated in edit mode

# Contributors
- [@KatherineHebbler](https://github.com/khebbler)
- [@StefanPoole](https://github.com/steviepee)
- [@DanielleGoldberg](https://github.com/mydogditto)
- [@KhamalChaney](https://github.com/khamal22)
- [@JosephFurman](https://github.com/joespaf)