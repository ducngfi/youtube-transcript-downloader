# YouTube Transcript Downloader

This project is a web application that allows users to download transcripts from YouTube videos in various formats. It consists of a Next.js frontend and a Flask backend API.

## Features

- Input a YouTube video URL
- Fetch the video transcript
- Choose output format (JSON, Plain Text, or SRT)
- Download the transcript in the selected format

## Tech Stack

- Frontend:
  - Next.js
  - React
  - Tailwind CSS
- Backend:
  - Flask
  - youtube_transcript_api

## Getting Started

### Prerequisites

- Node.js (v12 or later)
- npm or yarn
- Python 3.7 or later
- pip

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/ducngfi/youtube-transcript-downloader.git
   cd youtube-transcript-downloader
   ```

2. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```
   cd ../backend
   pip install -r requirements.txt
   ```

4. Run the frontend development server:
   ```
   cd ../frontend
   npm run dev
   ```

5. Run the backend server:
   ```
   cd ../backend
   python app.py
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `frontend/`: Contains the Next.js frontend application
- `backend/`: Contains the Flask backend API
- `doc/`: Contains documentation files

## API Endpoints

- `GET /api/transcript`: Fetches the transcript for a given YouTube video URL
  - Query parameters:
    - `video_url`: The YouTube video URL
    - `format`: The desired output format (json, txt, or srt)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.