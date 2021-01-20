import React from 'react';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import './App.css';

function App() {
	return (
		<div className="app">
			<div className="green"></div>
			<div className="app__body">
				<Sidebar />
				<Chat />
			</div>
		</div>
	);
}

export default App;
