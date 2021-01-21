import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import React from "react";
import { useStateValue } from "./StateProvider";
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";
import Login from "./Components/Login";
import "./App.css";

function App() {

	const [{ user }, dispatch] = useStateValue();

	return (
		<div className='app'>
			<div className='app__body'>
				{!user ? (
					<Login />
				) : (
					<Router>
						<Sidebar />
						<Switch>
							<Route path='/rooms/:roomId'>
								<Chat />
							</Route>
							<Route path='/'>
								<div className='fill'>
									<img
										src='https://web.whatsapp.com/img/intro-connection-light_c98cc75f2aa905314d74375a975d2cf2.jpg'
										alt=''
										/>
										<h1>Select a Room to Start Chat</h1>
								</div>
							</Route>
						</Switch>
					</Router>
				)}
			</div>
			<div className='green'></div>
		</div>
	);
}

export default App;
