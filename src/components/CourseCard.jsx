

const CourseCard = ({ course, isFavorite, toggleFavorite }) => {
  return (
    <div className="course-card">
      <div className="course-image">
        <img
          src={course.imageUrl || 'https://via.placeholder.com/320x180?text=Geen+Afbeelding'}
          alt={course.title}
        />
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
          <a href={course.videoUrl} target="_blank" rel="noopener noreferrer">
            <button className="course-button">Bekijk Video</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
