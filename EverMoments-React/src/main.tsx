// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import { Provider } from 'react-redux';
// import { store } from './store/store';
// import 'antd/dist/reset.css';
// import './index.css';

// // בדיקה אם האלמנט root קיים
// const rootElement = document.getElementById('root');
// if (!rootElement) {
//   throw new Error("לא נמצא אלמנט עם id='root'. וודא שה-HTML שלך תקין.");
// }

// const root = ReactDOM.createRoot(rootElement);

// root.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);



