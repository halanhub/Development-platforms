# Development Platforms Project

This is a small article website that I built with React and Supabase for my Development Platforms assignment.

The main goal was to build a frontend where users can read articles, create an account, confirm their email, log in, and then create their own articles.

I wanted to keep the project quite simple because I am still learning React and Supabase. I focused more on understanding how everything works instead of adding a lot of extra features.

## Technologies I used

* React
* JavaScript
* Vite
* React Router
* Supabase
* HTML
* CSS
* Git
* GitHub
* ESLint

Supabase is used as the backend for the project. It handles the database and the user authentication.

## Features

The project includes:

* A page where anyone can read articles
* User registration
* Email confirmation
* Login and logout
* Navigation that changes depending on whether the user is logged in
* A form where logged-in users can create articles
* Supabase database storage
* Row Level Security
* Loading messages
* Error messages
* An empty state when there are no articles
* Responsive styling for smaller screens

## How the website works

Anyone can open the website and read the articles without having an account.

If a user wants to create an article, they first need to register.

After registration, Supabase sends a confirmation email. The user has to confirm their email before they can log in.

When a user is logged out, the navigation shows:

* Articles
* Login
* Register

When a user is logged in, it changes to:

* Articles
* Create Article
* Logout

The Create Article page is only available when the user is logged in.

## Articles

The articles are stored in a Supabase table called `articles`.

The table contains:

| Field        | Description                   |
| ------------ | ----------------------------- |
| id           | Unique ID for the article     |
| title        | The title                     |
| body         | The article text              |
| category     | The article category          |
| submitted_by | ID of the user who created it |
| created_at   | Date and time it was created  |

React gets the articles from Supabase and displays them on the Articles page.

## Authentication

For authentication I used Supabase Auth.

The registration form sends the user's email and password to Supabase.

After registration, the user receives an email where they need to confirm their account.

The login form then uses the confirmed email and password to log the user in.

I also added a session check in React so the website knows if someone is already logged in.

This is used to decide which links should be visible in the navigation.

## Row Level Security

One part of the assignment that was new to me was Row Level Security.

At first I thought that hiding the Create Article button from logged-out users was enough.

I learned that this only changes what the user can see in the frontend. It does not actually protect the database.

Because of that, I also added Row Level Security policies in Supabase.

Anyone is allowed to read articles, but only authenticated users are allowed to create them.

The `submitted_by` value also has to match the ID of the logged-in user.

I included the database setup in the `database.sql` file so the table and policies can also be seen in the repository.

## Loading and error handling

I added simple loading and error messages to make the website easier to use.

For example, the Articles page shows:

```text
Loading articles...
```

while the data is being fetched.

If something goes wrong, it shows:

```text
Could not load articles.
```

If there are no articles, it shows:

```text
No articles have been added yet.
```

The login, registration, and article form also show loading messages while waiting for Supabase.

The buttons are disabled while a request is running so the user cannot click them several times.

I kept the messages simple because I wanted the code to stay easy to understand.

## ESLint

I used ESLint to help check the code for problems.

I ran:

```bash
npm run lint
```

from the terminal during development.

This was actually useful because ESLint found problems that were not obvious just by looking at the website.

One example was in my Articles component. The website was working, but ESLint did not like how my article-loading function was being used inside `useEffect`.

I changed the structure of the code and ran the lint command again until there were no errors.

This helped me understand that a website can look like it works correctly in the browser while the code can still have problems that should be fixed.

## Responsive design

I used normal CSS for the styling.

I did not use Tailwind or another CSS framework because I wanted to keep the project basic.

The navigation changes layout on smaller screens, and the forms and article cards resize so they fit better on mobile.

I tested the site on desktop and smaller screen sizes using the browser developer tools.

## Problems I had

The biggest problem I had during the project was connecting React to Supabase.

At one point the browser showed:

```text
supabaseUrl is required
```

and the Supabase URL was showing as `undefined`.

I first thought something was wrong with Supabase itself.

After checking the project files, I found out that my environment file was in the wrong folder.

Vite was running from the React project folder, but my environment file was outside of it.

After moving `.env.local` into the correct project folder and restarting Vite, the connection worked.

That problem helped me understand environment variables much better.

I also had some problems with ESLint near the end of the project.

The code worked in the browser, but ESLint found an issue with the way I was loading articles inside `useEffect`.

I fixed the code and kept running:

```bash
npm run lint
```

until there were no errors left.

## What I learned

The main thing I learned from this project is how a React frontend can work together with a backend service like Supabase.

Before this project, I had less understanding of how authentication, sessions, databases, and frontend code all connect.

I became more comfortable using:

* `useState`
* `useEffect`
* React components
* Forms
* Conditional rendering
* React Router
* Async functions
* Supabase authentication
* Supabase database queries
* Row Level Security

I also got more comfortable using the terminal.

During the project I used commands like:

```bash
npm run dev
npm run lint
git add .
git commit
git push
```

Using Git regularly also helped me understand the idea of saving progress in smaller steps instead of only uploading the finished project at the end.

## What worked well

I think keeping the project simple was a good choice.

There were many things I could have added, but I tried to focus on what the assignment actually required.

The React code is quite basic, which also makes it easier for me to understand what each part does.

Supabase also worked well for this project because I could use the same service for authentication and the database.

Once I understood how the authentication session and Row Level Security worked, the rest of the project became much easier.

## What I would improve later

If I continued working on the project, I would probably add:

* Editing articles
* Deleting your own articles
* User profiles
* Author names
* Better categories
* Search
* Article filtering
* Password reset
* Better styled success and error messages

I could also split more parts of the application into reusable React components.

For this assignment, I decided not to add too much because I wanted to keep the project understandable and focused on the requirements.

## Running the project

Clone the repository:

```bash
git clone https://github.com/halanhub/Development-platforms.git
```

Open the project:

```bash
cd Development-platforms
```

Install the dependencies:

```bash
npm install
```

Create a `.env.local` file in the root of the project.

Add:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Then start the project:

```bash
npm run dev
```

The local website should normally open at:

```text
http://localhost:5173/
```

To check the project for lint errors, run:

```bash
npm run lint
```

## Final thoughts

This project gave me a much better understanding of how React can connect to a real backend.

The most useful parts for me were working with authentication, fixing the environment variable problem, learning how Row Level Security protects the database, and using ESLint to find problems in the code.

I also think keeping the project small helped me understand the code better instead of just adding more features.

The final application is simple, but it covers the main things I wanted to learn from the assignment and meets the required functionality.
