import React from 'react';
import { observer, inject } from 'mobx-react';
import Header from '../Header/Header';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CreatorPage = inject('creatorStore')(
  observer((props) => {
    const { creatorStore } = props
    const { pathname } = useLocation();

    useEffect(() => {
      creatorStore.getCreatorById(pathname.split('/')[2])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(creatorStore.creator)
    return (
      <div>
        <Header page={'creator'} />
      </div>
    );
  })
);

export default CreatorPage;
