import React from 'react';
import Loader from 'react-loader-spinner';

function Loading() {
  return (
    <div style={{ position: 'absolute', top: '50vh', left: '50%' }}>
      <Loader type='TailSpin' color='#00BFFF' height={80} width={80} />
    </div>
  );
}

export default Loading;
