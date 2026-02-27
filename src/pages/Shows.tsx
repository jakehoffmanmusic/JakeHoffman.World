import '../styles/Pages.css';

const Shows = () => {
  // FUTURE UPLOADS: Add new show objects to this array.
  // Format: { id: number, date: 'MONTH DD', venue: 'Venue Name', location: 'City, ST', ticketLink: 'URL' }
  const shows = [
    /* 
    { 
      id: 1, 
      date: 'OCT 11', 
      venue: 'Demanna Center', 
      location: 'New York, NY', 
      ticketLink: 'https://imgs.search.brave.com/p1yjkTjcQlkFKjcXyWwgCjfShzzLTkczKCtae_yc0Hk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9mYXQt/bW91c2UtbGllcy1p/dHMtYmFjay1jaGVl/c2Utc3Bh/Y2UtdGV4/dC1mYXQtbW91c2Ut/bGllcy1pdHMtYmFj/ay1jaGVlc2Utc3Bh/Y2UtdGV4dC0zMzU4/NjIxMzEuanBn' 
    } 
    */
  ];

  return (
    <div className="container">
      <div className="shows-list">
        {shows.length > 0 ? (
          shows.map(show => (
            <div key={show.id} className="show-item-v2">
              <div className="show-info-left">
                <div className="show-date">{show.date}</div>
                <div className="show-venue-details">
                  <div className="show-venue">{show.venue}</div>
                  <div className="show-location">{show.location}</div>
                </div>
              </div>
              <div className="show-actions-right">
                <a href={show.ticketLink} target="_blank" rel="noopener noreferrer" className="ticket-button-black">Tickets</a>
              </div>
            </div>
          ))
        ) : (
          <div className="coming-soon" style={{textAlign: 'center', padding: '5rem 0', opacity: 0.5}}>Coming soon</div>
        )}
      </div>
    </div>
  );
};

export default Shows;
