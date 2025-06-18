import React, { useState, useEffect } from 'react';

const CourseCard = ({ course, isFavorite, toggleFavorite }) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isViewed, setIsViewed] = useState(false);

  useEffect(() => {
    const viewedCourses = JSON.parse(localStorage.getItem('viewedCourses')) || [];
    if (viewedCourses.includes(course.id)) {
      setIsViewed(true);
    }
  }, [course.id]);

  const markAsViewed = () => {
    const viewedCourses = JSON.parse(localStorage.getItem('viewedCourses')) || [];
    if (!viewedCourses.includes(course.id)) {
      viewedCourses.push(course.id);
      localStorage.setItem('viewedCourses', JSON.stringify(viewedCourses));
      setIsViewed(true);
    }
  };

  const openModal = () => {
    setShowInfoModal(true);
    markAsViewed();
  };

  const closeModal = () => setShowInfoModal(false);

  return (
    <>
      <div className={`course-card ${isViewed ? 'viewed' : ''}`}>
        <div className="course-image-wrapper">
          <div className="course-image">
            <img
              src={course.imageUrl || 'https://via.placeholder.com/320x180?text=Geen+Afbeelding'}
              alt={course.title}
            />
          </div>
          <button
            className={`favorite-button ${isFavorite ? 'active' : ''}`}
            onClick={() => toggleFavorite(course.id)}
            aria-label="Markeer als favoriet"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>

        <div className="course-content">
          <h3>{course.title}</h3>
          <p className="course-description">{course.description}</p>

          <div className="course-details">
            <div className="level course-badge">Niveau: {course.level}</div>
            <div className="duration course-badge">Duur: {course.duration}</div>
          </div>

          <div className="course-stats">
            <span className="members">{course.members} leden</span>
            <span className="views">{course.views} weergaven</span>
            <span className="rating">⭐ {course.rating}</span>
          </div>

          <div className="course-actions">
            <button className="course-button" onClick={openModal}>
              Bekijk Video {isViewed && '✅'}
            </button>
          </div>
        </div>
      </div>

      {showInfoModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p><strong>Niveau:</strong> {course.level}</p>
            <p><strong>Duur:</strong> {course.duration}</p>
            <p><strong>Leden:</strong> {course.members}</p>
            <p><strong>Weergaven:</strong> {course.views}</p>
            <p><strong>Beoordeling:</strong> ⭐ {course.rating}</p>

            <div className="modal-actions">
              <a
                href={course.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="watch-button">Bekijk Video</button>
              </a>
              <button className="close-button" onClick={closeModal}>Sluiten</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCard;
