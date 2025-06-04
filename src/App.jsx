import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import { courses } from './data/coursesData.js';
import './styles/App.css';
import './styles/CourseCard.css';

function App() {
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Dark mode uit localStorage bij het laden van de app
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('darkMode');
    return storedMode ? JSON.parse(storedMode) : false; // standaard: false
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // ✅ Wanneer darkMode verandert, update localStorage én body class
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchData = () => {
      try {
        setCourseData(courses);
        setIsLoading(false);
      } catch (err) {
        setError('Er is een fout opgetreden bij het laden van de cursussen.');
        setIsLoading(false);
      }
    };

    setTimeout(fetchData, 1000); // Simuleert API-call
  }, []);

  return (
    <main className={`app`}>
      <header className='app-header'>
        <div className='logo-container'>
          <h1 className='brand-logo'>CodeCampus</h1>
          <p className='brand-tagline'>Ontdek, Leer, Excelleer</p>
        </div>
        <button className='dark-mode-toggle' onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      {isLoading ? (
        <section className='loading'>Cursussen worden geladen...</section>
      ) : error ? (
        <section className='error'>{error}</section>
      ) : courseData.length === 0 ? (
        <section className='empty'>Geen cursussen beschikbaar.</section>
      ) : (
        <Dashboard courseData={courseData} />
      )}
    </main>
  );
}

export default App;
