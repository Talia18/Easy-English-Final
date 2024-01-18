const CardForAll = ({ img, name, description, stars }) => {
  return (
    <div
      className="card mb-3 d-flex justify-content-center cardRecommendation"
      style={{ maxWidth: "500px", boxShadow: "13px 13px 10px 0 #00000080" }}
    >
      <div className="row g-0">
        <div className="col-md-4 d-flex flex-wrap align-content-center">
          <img
            src={img}
            className="img-fluid rounded-circle"
            alt={name}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">Rating: {stars}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardForAll;
