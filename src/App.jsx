import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

// Datos de notas y reflexiones
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

  // Alternar tema claro/oscuro
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Cambiar nota diaria
  const refreshNote = () => {
    const randomIndex = Math.floor(Math.random() * dailyNotes.length);
    setCurrentNote(dailyNotes[randomIndex]);
  };

  // Guardar pensamiento del usuario
  const saveThought = () => {
    if (userThought.trim()) {
      setFavorites([...favorites, userThought]);
      setUserThought("");
      window.alert("¡Guardado en favoritos!");
    }
  };

  // Guardar nota como favorita
  const saveFavorite = (note) => {
    if (!favorites.includes(note)) {
      setFavorites([...favorites, note]);
      window.alert("¡Guardado en favoritos!");
    }
  };

  return (
    <div className="app-container">
      {/* Encabezado */}
      <header className="header">
        <h1 className="header-title">Luz en el Camino</h1>
      </header>

      {/* Barra de navegación */}
      <nav className="nav">
        <button
          onClick={() => setCurrentSection("home")}
          className={`nav-button ${
            currentSection === "home" ? "nav-button-active" : ""
          }`}
        >
          Inicio
        </button>
        <button
          onClick={() => setCurrentSection("create")}
          className={`nav-button ${
            currentSection === "create" ? "nav-button-active" : ""
          }`}
        >
          Crear
        </button>
        <button
          onClick={() => setCurrentSection("favorites")}
          className={`nav-button ${
            currentSection === "favorites" ? "nav-button-active" : ""
          }`}
        >
          Favoritos
        </button>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="theme-button"
        >
          {theme === "light" ? "Modo oscuro" : "Modo claro"}
        </button>
      </nav>
      {/* Contenido principal */}
      <main className="main">
        {currentSection === "home" && (
          <div className="flex flex-col gap-4">
            {/* Notas diarias */}
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
              <button onClick={refreshNote} className="button">
                Nueva nota
              </button>
              <button
                onClick={() => saveFavorite(currentNote)}
                className="button ml-2"
              >
                Guardar
              </button>
            </section>

            {/* Reflexiones */}
            <section className="section">
              <h2 className="section-title">Reflexiones</h2>
              {reflections.map((reflection, index) => (
                <div key={index} className="reflection-container">
                  <p className="note-text">{reflection}</p>
                  <button
                    onClick={() => saveFavorite(reflection)}
                    className="button-small"
                  >
                    Guardar
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
            <button onClick={saveThought} className="button">
              Guardar
            </button>
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
