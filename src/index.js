import React from 'react';
import ReactDOM from 'react-dom';
import { RegisterForm } from './components';
import './index.css';

const App = () => {
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
