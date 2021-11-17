import React, { ReactElement, FC, useEffect, useState } from "react";
import { TextField, Button, Container, makeStyles } from "@material-ui/core";
import {client} from "./util/client";

const useStyles = makeStyles({
	mainContainer: {
		height: '90vh',
		width: '90vw',
		backgroundColor: '#e0e0e0'
	},
	messageListContainer: {
		height: '60vh',
		backgroundColor: '#c0c0c0'
	}
})

const APP: FC = (): ReactElement => {
	const [userText, setUserText]= useState('');
	const [status, setStatus] = useState('init');
	const [messageList, setMessageList] = useState([]);
	const classes = useStyles();
	const submit = () => {
		setMessageList([...messageList, {sender: 'user', text: userText }]);
		client.sendMessage(userText);
		setUserText('');
	}
	
	useEffect(() => {
		client.on("output", output => {
			console.log(output);
			setMessageList(prev => {
				return [...prev, {sender: 'bot', text: output.text, data: output.data }]
			});
		})
		client.connect().then(res => {
			setStatus('connected');
			return true;
		}).catch(e => {
			console.log('something went wrong -> ', e);
			setStatus('error');
			return false;
		})
		return () => {
			client.disconnect();
		};
	}, []);
	return (
		<Container className={classes.mainContainer}>
			<Container className={classes.messageListContainer}>
				<ul>
					{
						messageList.map((message, i) => (
							<li key={i}>
								{message.text}
								{message.data?.imgSrc? <img src={message.data.imgSrc} alt={message.text} /> : null}
							</li>
						))
					}
				</ul>
			</Container>
			<TextField id="standard-basic" label="Your Message" variant="standard" value={userText} onChange={(e) => setUserText(e.target.value)}/>
			{status === 'connected' && <Button variant="contained" onClick={submit}>Submit</Button>}
		</Container>
	);
};

export default APP;