import React from 'react';
import './App.css';
import Sidebar from './Sidebar';

function App() {
	return (
		<div className="app">
			<div className="green"></div>
			<div className="app__body">
				<Sidebar />
				<div className="test"></div>
			</div>
		</div>
	);
}

export default App;
