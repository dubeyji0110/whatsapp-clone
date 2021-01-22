import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import db from "../firebase";
import { Link } from "react-router-dom";
import { AddCircleOutline } from "@material-ui/icons";

function SidebarChat({ addNewChat, id, name }) {
	const [seed, setSeed] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (id) {
			db.collection("rooms")
				.doc(id)
				.collection("messages")
				.orderBy("timestamp", "desc")
				.onSnapshot((snapshot) =>
					setMessages(snapshot.docs.map((doc) => doc.data()))
				);
		}
	}, [id]);

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, []);

	const createChat = () => {
		const roomName = prompt("Please enter name for chat");
		if (roomName) {
			db.collection("rooms").add({
				name: roomName,
			});
		}
	};

	return !addNewChat ? (
		<Link to={`/rooms/${id}`}>
			<div className='sidebarChat'>
				<Avatar
					src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
				/>
				<div className='sidebarChat__info'>
					<h2>{name.slice(0, 15)}</h2>
					<p>{messages[0]?.message.slice(0, 20)}...</p>
				</div>
			</div>
		</Link>
	) : (
		<div className='sidebarChat' onClick={createChat}>
			<AddCircleOutline />
			<h2>Create New Room</h2>
		</div>
	);
}

export default SidebarChat;
