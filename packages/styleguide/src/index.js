import React from 'react';
import ReactDOM from 'react-dom';
import { Catalog, pageLoader } from 'catalog';
import { Button } from '@uleen/components';

ReactDOM.render(
  <Catalog
    title='Catalog'
    pages={[
      {
        imports: { Button },
        path: '/',
        title: 'Introduction',
        content: pageLoader('intro.md'),
      },
    ]}
  />,
  document.getElementById('root')
);
