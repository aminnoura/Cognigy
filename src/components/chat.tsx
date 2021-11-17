import React, { ReactElement, FC, useState } from "react";
import { TextField, Button, Container, makeStyles } from "@material-ui/core";
import {client} from "../util/client";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../store/actions/MessageList";
import { StatusType } from "../util/types";
import { RootState } from "../store/reducers";

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

type propTypes = {
    status: string
}

const Chat: FC<propTypes> = ({status}): ReactElement => {
	const dispatch = useDispatch();
	const [userText, setUserText]= useState<string>('');
	const messageList = useSelector((selector: RootState) => selector.messageList);
	const classes = useStyles();
	const submit = () => {
		dispatch(addMessage({sender: 'user', text: userText }));
		client.sendMessage(userText);
		setUserText('');
	}
	const keyPress = (e) => {
		if(e.keyCode == 13){
			submit();
		 }
	}
	
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
			<TextField
				id="standard-basic"
				label="Your Message"
				variant="standard"
				value={userText}
				onChange={(e) => setUserText(e.target.value)}
				onKeyDown={keyPress}
			/>
			{status === StatusType.CONNECTED && <Button variant="contained" onClick={submit}>Submit</Button>}
		</Container>
	);
};

export default Chat;