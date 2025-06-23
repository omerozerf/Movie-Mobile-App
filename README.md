# Movie Mobile App 🎬📱

A sleek and modern mobile app for discovering and searching movies with real-time trending insights.

## 🚀 Features

- 🎞️ **Movie Discovery:** Browse the latest movies using the TMDB API.
- 🔍 **Search Functionality:** Search movies by name with responsive query handling.
- 📊 **Trending Algorithm:** Tracks and ranks search terms based on frequency.
- 🧠 **Appwrite Integration:** Persists search metrics using Appwrite's database services.
- ⚛️ **Built with React Native:** Native performance and cross-platform compatibility.
- 🌙 **Styled with Tailwind (nativewind):** Fast, modern, utility-first UI styling.

## 🛠️ Technologies

- React Native (bare, not Expo managed)
- TypeScript
- Appwrite (Database + Document API)
- TMDB API
- nativewind (Tailwind CSS for React Native)
- Expo Router

## 📂 Project Structure

```
/app
  /(tabs)
    _layout.tsx
    index.tsx       # Home screen
    search.tsx      # Search screen
/assets
/components
/constants
/services
```

## ⚙️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/movie-mobile-app.git
   cd movie-mobile-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:** Create a `.env` file in the root directory with the following:
   ```
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   EXPO_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id
   ```

4. **Run the project:**
   ```bash
   npx expo start
   ```

## 📸 Screenshots

> (Will be uploaded soon...)

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
