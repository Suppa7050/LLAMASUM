import React from 'react';

const Summary = ({text}) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Summary</h1>
      <pre style={styles.text}>{text}</pre>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    // borderRadius: '0px 20px',
    height: '100%',
    // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  heading: {
    fontSize: '2em',
    color: '#333',
    borderBottom: '2px solid #333',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  text: {
    fontSize: '1.2em',
    color: '#555',
    lineHeight: '1.5',
  },
};

export default Summary;
