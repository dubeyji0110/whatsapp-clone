import {
	AttachFile,
	Delete,
	InsertEmoticon,
	Mic,
	MoreVert,
	SearchOutlined,
} from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import { useStateValue } from "../StateProvider";
import db from "../firebase";
import "./Chat.css";

function Chat() {
	const [seed, setSeed] = useState("");
	const [input, setInput] = useState("");
	const [roomName, setRoomName] = useState("");
	const [messages, setMessages] = useState([]);
	const [{ user }, dispatch] = useStateValue();
	const { roomId } = useParams();
	const dummy = useRef();

	useEffect(() => {
		if (roomId) {
			db.collection("rooms")
				.doc(roomId)
				.get()
				.then((doc) => {
					if (doc.exists) {
						db.collection("rooms")
							.doc(roomId)
							.onSnapshot((snapshot) => {
								setRoomName(snapshot.data().name);
							});
						db.collection("rooms")
							.doc(roomId)
							.collection("messages")
							.orderBy("timestamp", "asc")
							.onSnapshot((snapshot) =>
								setMessages(
									snapshot.docs.map((doc) => ({
										id: doc.id,
										...doc.data(),
									}))
								)
							);
					}
				});
		}
	}, [roomId]);

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, [roomId]);

	const sendMessage = (e) => {
		e.preventDefault();

		db.collection("rooms").doc(roomId).collection("messages").add({
			message: input,
			name: user.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		setInput("");
		dummy.current.scrollIntoView({ behavior: "smooth" });
	};

	const deleteMsg = (id) => {
		db.collection("rooms")
			.doc(roomId)
			.collection("messages")
			.doc(id)
			.delete()
			.then(() => {
				alert("Message Deleted!");
			})
			.catch((err) => {
				alert(err.message);
			});
	};

	return (
		<div className='chat'>
			<div className='chat__header'>
				<Avatar
					src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
				/>
				<div className='chat__headerInfo'>
					<h3>{roomName ? roomName : "Room Deleted"}</h3>
					<p>
						last seen{" "}
						{messages.length
							? new Date(
									messages[
										messages.length - 1
									]?.timestamp?.toDate()
							  ).toUTCString()
							: "never"}
					</p>
				</div>
				<div className='chat__headerRight'>
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>
			<div className='chat__body'>
				{messages.map((message) => (
					<p
						className={`chat__message ${
							message.name === user.displayName
								? "chat__reciever"
								: ""
						}`}>
						<span className='chat__name'>{message.name}</span>
						<span
							title='Delete chat'
							className='delete'
							onClick={() => deleteMsg(message.id)}>
							{message.name === user.displayName ? (
								<Delete />
							) : (
								""
							)}
						</span>
						{message.message}
						<span className='chat__timestamp'>
							{new Date(
								message.timestamp?.toDate()
							).toUTCString()}
						</span>
					</p>
				))}
				<span ref={dummy}></span>
			</div>
			<div className='chat__footer'>
				<IconButton>
					<InsertEmoticon />
				</IconButton>
				<IconButton>
					<AttachFile />
				</IconButton>
				<form action=''>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						type='text'
						placeholder='Type a message'
					/>
					<button
						disabled={!input}
						onClick={sendMessage}
						type='submit'>
						Send a Message
					</button>
				</form>
				<IconButton>
					<Mic />
				</IconButton>
			</div>
		</div>
	);
}

export default Chat;
