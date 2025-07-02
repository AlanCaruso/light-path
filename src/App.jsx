import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

const dailyNotes = [
  "Encuentra paz en lo simple.",
  "Hoy, tu luz brilla más de lo que imaginas.",
  "Cada paso es un nuevo comienzo.",
];

const reflections = [
  "Alguien una vez inspiró mi camino, y aunque ya no caminamos juntos, su luz aún guía mi fuego.",
  "A veces, las cosas no salen como esperábamos, pero cada día es una oportunidad para brillar.",
];

function App() {
  const [theme, setTheme] = useState("light");
  const [currentNote, setCurrentNote] = useState(dailyNotes[0]);
  const [userThought, setUserThought] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [currentSection, setCurrentSection] = useState("home");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const refreshNote = () => {
    const randomIndex = Math.floor(Math.random() * dailyNotes.length);
    setCurrentNote(dailyNotes[randomIndex]);
  };

  const saveThought = () => {
    if (userThought.trim()) {
      setFavorites([...favorites, userThought]);
      setUserThought("");
      toast("¡Guardado en favoritos!");
    }
  };

  const saveFavorite = (note) => {
    if (!favorites.includes(note)) {
      setFavorites([...favorites, note]);
      toast("¡Guardado en favoritos!");
    }
  };

  const toast = (message) => {
    const toastEl = document.createElement("div");
    toastEl.textContent = message;
    toastEl.className = "toast";
    document.body.appendChild(toastEl);
    setTimeout(() => {
      toastEl.classList.add("show");
      setTimeout(() => {
        toastEl.classList.remove("show");
        setTimeout(() => document.body.removeChild(toastEl), 300);
      }, 2000);
    }, 100);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="header-title">Luz en el Camino</h1>
      </header>

      <nav className="nav">
        <button
          onClick={() => setCurrentSection("home")}
          className={`nav-button ${
            currentSection === "home" ? "nav-button-active" : ""
          }`}
        >
          🏠 Inicio
        </button>
        <button
          onClick={() => setCurrentSection("create")}
          className={`nav-button ${
            currentSection === "create" ? "nav-button-active" : ""
          }`}
        >
          ➕ Crear
        </button>
        <button
          onClick={() => setCurrentSection("favorites")}
          className={`nav-button ${
            currentSection === "favorites" ? "nav-button-active" : ""
          }`}
        >
          ❤️ Favoritos
        </button>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="theme-button"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </nav>

      <main className="main">
        {currentSection === "home" && (
          <div className="flex flex-col gap-4">
            <section className="section">
              <h2 className="section-title">Nota diaria</h2>
              <motion.p
                key={currentNote}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="note-text"
              >
                {currentNote}
              </motion.p>
              <div className="button-group">
                <button onClick={refreshNote}>➕ Nueva nota</button>
                <button onClick={() => saveFavorite(currentNote)}>
                  🔖 Guardar
                </button>
              </div>
            </section>

            <section className="section">
              <h2 className="section-title">Reflexiones</h2>
              {reflections.map((reflection, index) => (
                <div key={index} className="reflection-container">
                  <p className="note-text">{reflection}</p>
                  <button onClick={() => saveFavorite(reflection)}>
                    🔖 Guardar
                  </button>
                </div>
              ))}
            </section>
          </div>
        )}

        {currentSection === "create" && (
          <section className="section">
            <h2 className="section-title">Crea tu momento</h2>
            <textarea
              value={userThought}
              onChange={(e) => setUserThought(e.target.value)}
              className="textarea"
              placeholder="Escribe tus pensamientos..."
            />
            <button onClick={saveThought}>💾 Guardar</button>
          </section>
        )}

        {currentSection === "favorites" && (
          <section className="section">
            <h2 className="section-title">Favoritos</h2>
            {favorites.length ? (
              favorites.map((fav, index) => (
                <p key={index} className="note-text mb-2">
                  {fav}
                </p>
              ))
            ) : (
              <p className="note-text">No hay favoritos aún.</p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
