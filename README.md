# Whack-A-Mouse Game

## Project Overview

Welcome to the Whack-A-Mouse game project! This is a fun and interactive game where players try to "whack" mouses that pop up randomly on the screen. The game is designed to be user-friendly and is built using React.

## Team Members

- **Sipho Mabirimise**
- **Lerato Mawasha**

## Description

Our Whack-A-Mouse game offers an engaging and enjoyable experience for users of all ages. The objective of the game is to score as many points as possible by clicking on the mouses that appear randomly within a given time limit.

### Key Features

- **User-Friendly Interface**: The game has a simple and intuitive interface, making it easy for anyone to play.
- **React-Based**: The game is developed using React, ensuring a smooth and responsive user experience.
- **Dynamic Gameplay**: Mouses pop up at random positions, making the game challenging and exciting.
- **Score Tracking with Firebase**: Players' scores are tracked and stored in real-time using Firebase, allowing for persistent score storage and retrieval.
- **Multiple Difficulty Levels**: The game includes different stages and levels (Easy, Normal, and Hard) to cater to various skill levels and keep the gameplay interesting.
- **Real-Time Updates**: Scores and game states are updated in real-time, providing an immersive experience.

## Getting Started

To get started with the Whack-A-Mouse game, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (includes npm)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/whack-a-mouse.git
cd whack-a-mouse
npm install

## Firebase Setup
To enable Firebase for score tracking, follow these steps:

Create a Firebase project at Firebase Console.
Add a new web app to your Firebase project.
Copy the Firebase configuration details.
Create a .env file in the root directory of your project and add your Firebase configuration:
### REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

### Running the Game
npm start


### How to Play

- Select a difficulty level (Easy, Normal, Hard) to start the game.
- Whack the mouses that appear randomly on the screen by clicking on them.
- Try to score as many points as possible within the time limit.
- Your score will be tracked and stored in Firebase.
