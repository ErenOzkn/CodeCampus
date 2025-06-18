import { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import CourseList from './CourseList';
import PopularCourses from './PopularCourses';
import Statistics from './Statistics';

const Dashboard = ({ courseData }) => {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('activeTab') || 'all';
  });

  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem('searchTerm') || '';
  });

  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem('selectedCategory') || '';
  });

  const [sortOption, setSortOption] = useState(() => {
    return localStorage.getItem('sortOption') || '';
  });

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    localStorage.setItem('sortOption', sortOption);
  }, [sortOption]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (courseId) => {
    setFavorites((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const filteredCourses = () => {
    if (!courseData || !Array.isArray(courseData)) return [];

    let filtered = [];

    switch (activeTab) {
      case 'all':
        filtered = courseData;
        break;
      case 'beginner':
        filtered = courseData.filter((course) => course.level === 'Beginner');
        break;
      case 'gevorderd':
        filtered = courseData.filter((course) => course.level === 'Gevorderd');
        break;
      case 'populair':
        filtered = [...courseData].sort((a, b) => b.views - a.views);
        break;
      case 'favorieten':
        filtered = courseData.filter((course) => favorites.includes(course.id));
        break;
      default:
        filtered = courseData;
    }

    filtered = filtered.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory) {
      filtered = filtered.filter((course) =>
        course.categories.includes(selectedCategory)
      );
    }

    if (sortOption === 'duration') {
      filtered = filtered.sort((a, b) =>
        parseInt(b.duration) - parseInt(a.duration)
      );
    } else if (sortOption === 'rating') {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  };

  return (
    <section className="dashboard">
      <header className="dashboard-header">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="🔍 Zoek cursussen op titel of beschrijving..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>

        <nav className="tab-buttons">
          <button className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>Alle Cursussen</button>
          <button className={activeTab === 'beginner' ? 'active' : ''} onClick={() => setActiveTab('beginner')}>Voor Beginners</button>
          <button className={activeTab === 'gevorderd' ? 'active' : ''} onClick={() => setActiveTab('gevorderd')}>Gevorderd</button>
          <button className={activeTab === 'populair' ? 'active' : ''} onClick={() => setActiveTab('populair')}>Meest Bekeken</button>
          <button className={activeTab === 'favorieten' ? 'active' : ''} onClick={() => setActiveTab('favorieten')}>Favorieten</button>
        </nav>

        <div className="inline-filter-dropdowns">
          <div className="filter-section">
            <label htmlFor="category-filter">Categorie:</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Alle categorieën</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JavaScript</option>
              <option value="react">React</option>
              <option value="node">Node.js</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>

          <div className="filter-section">
            <label htmlFor="sort-filter">Sorteren op:</label>
            <select
              id="sort-filter"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Standaard</option>
              <option value="duration">Duur (langste eerst)</option>
              <option value="rating">Hoogste rating</option>
            </select>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <section className="main-content">
          <h2>
            {({
              all: 'Alle Cursussen',
              beginner: 'Cursussen voor Beginners',
              gevorderd: 'Gevorderde Cursussen',
              populair: 'Meest Bekeken Cursussen',
              favorieten: 'Je Favorieten',
            }[activeTab])}
          </h2>
          <CourseList
            courses={filteredCourses()}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </section>

        <aside className="sidebar">
          <PopularCourses courses={courseData} />
          <Statistics courses={courseData} />
        </aside>
      </div>
    </section>
  );
};

export default Dashboard;
