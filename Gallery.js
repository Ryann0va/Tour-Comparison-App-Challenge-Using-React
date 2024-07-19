//U99350821
import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://course-api.com/react-tours-project');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTours(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchTours();
  }, []);

  const removeTour = (id) => {
    setTours(tours.filter(tour => tour.id !== id));
  };

  const toggleReadMore = (id) => {
    setTours(tours.map(tour => 
      tour.id === id ? { ...tour, showMore: !tour.showMore } : tour
    ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {tours.map(tour => (
        <div key={tour.id} className="tour">
          <h2>{tour.name}</h2>
          <p>
            {tour.showMore ? tour.info : `${tour.info.substring(0, 200)}...`}
            <button onClick={() => toggleReadMore(tour.id)}>
              {tour.showMore ? 'Show Less' : 'Read More'}
            </button>
          </p>
          <button onClick={() => removeTour(tour.id)}>Not Interested</button>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
