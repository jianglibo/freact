import * as enzyme from 'enzyme';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the correct text when no enthusiasm level is given', () => {
  const app = enzyme.shallow(<App />);
  expect(app.find(".App-intro").text()).toContain('src/App.tsx');
});