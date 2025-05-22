import CourseCard from './CourseCard';

const CourseList = ({ courses }) => {
  if (!courses || courses.length === 0) {
    return <p className='empty-list'>Geen cursussen gevonden.</p>;
  }

  return (
    <section className='course-list'>
      {courses.map((courseCard) => (
        <CourseCard key={courseCard.id} course={courseCard} />
      ))}
    </section>
  );
};

export default CourseList;
