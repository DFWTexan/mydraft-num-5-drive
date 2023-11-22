import React from 'react';

const PlaceholderComponent = ({ width, height, color }) => {
  const style = {
    width: width || '100%',
    height: height || '100px',
    backgroundColor: color || '#f0f0f0',
    // You can add more styling properties as needed
  };

  return (
    <div style={style}>
      {/* You can customize the content of your placeholder here */}
      Loading...
    </div>
  );
};

export default PlaceholderComponent;
