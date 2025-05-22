import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import { courses } from './data/coursesData.js';
import './styles/App.css';

function App() {
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Update body class when darkMode changes
  useEffect(() => {
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

    setTimeout(fetchData, 1000);
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
