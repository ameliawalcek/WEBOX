import React from 'react';
import Loader from 'react-loader-spinner';

function Loading() {
  return (
    <div style={{ marginLeft: '40vw' }}>
      <Loader type='TailSpin' color='#00BFFF' height={250} width={250} />
    </div>
  );
}

export default Loading;
