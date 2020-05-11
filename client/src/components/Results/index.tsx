import React from "react";

const Results = ({ searchResults }: any): JSX.Element | null => {
  const getResultItem = (b: any) => {
    return (
      <div className="card mb-3" key={b._id}>
        <div className="card-body">
          <h5 className="card-title">{b.title}</h5>
          <p className="card-text small">{b.isbn}</p>
          <p className="card-text">{b.description}</p>
          <p className="card-text">
            {b.authors.map((author: string, idx: number) => {
              return <span key={idx}>{author}</span>;
            })}
          </p>
          <p className="card-text">
            {b.categories.map((author: string, idx: number) => {
              return (
                <span className="badge badge-dark" key={idx}>
                  {author}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    );
  };

  if (!searchResults) return null;

  if (searchResults.length == 0) {
    return <div className="alert alert-info">No books found.</div>;
  }

  return <div>{searchResults.map((r: any) => getResultItem(r))}</div>;
};

export default Results;
