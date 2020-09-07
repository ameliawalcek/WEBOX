import React from 'react';
import Loader from 'react-loader-spinner';

function Loading() {
  return (
    <div style={{ width: 150, margin: 'auto' }}>
      <Loader type='TailSpin' color='#00BFFF' height={150} width={150} />
    </div>
  );
}

export default Loading;
