import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Chat.css";

function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
    }, []);
    
    const sendMessage = e => {
        e.preventDefault();
        setInput('');
    };

	return (
		<div className='chat'>
			<div className='chat__header'>
				<Avatar
					src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
				/>
				<div className='chat__headerInfo'>
					<h3>Room name</h3>
					<p>Last seen...</p>
				</div>
				<div className='chat__headerRight'>
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>
			<div className='chat__body'>
				<p className={`chat__message ${true && "chat__reciever"}`}>
					<span className='chat__name'>Devansh Dubey</span>
					Heyy Guys!
					<span className='chat__timestamp'>3:52pm</span>
				</p>
			</div>
			<div className='chat__footer'>
				<IconButton>
					<InsertEmoticon />
				</IconButton>
				<form action=''>
					<input value={input} onChange={e => setInput(e.target.value)} type='text' placeholder='Type a message' />
					<button onClick={sendMessage} type='submit'>Send a Message</button>
				</form>
				<IconButton>
					<Mic />
				</IconButton>
			</div>
		</div>
	);
}

export default Chat;
