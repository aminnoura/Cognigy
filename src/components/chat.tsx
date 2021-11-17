import React, { ReactElement, FC, useState } from "react";
import {
    TextField, Button, Container,
    makeStyles, List, ListItem,
    ListItemAvatar, Avatar, ListItemText
} from "@material-ui/core";
import {client} from "../util/client";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../store/actions/MessageList";
import { StatusType } from "../util/types";
import { RootState } from "../store/reducers";

const BotImage = require('../assests/images/bot.png');
const UserImage = require('../assests/images/user.png');

const useStyles = makeStyles({
	mainContainer: {
		height: '100vh',
		width: '50vw',
		backgroundColor: '#fff',
        margin: '0 0 0 0',
        padding: '20px', 
        borderRadius: 6,
        minWidth: '300px',
        display: 'flex',
        flexDirection: 'column'
	},
	messageListContainer: {
		height: '80%',
        width: '100%',
        borderRadius: 6,
		backgroundColor: 'transparent',
        padding: '0 0 0 0',
        margin: '0 0 0 0',
        border: '2px solid #777'
	},
    textField: {
        width: '40%',
        minWidth: '300px',
        alignSelf: 'flex-end',
        margin: '20px 0'
    },
    submitButton: {
        alignSelf: 'flex-end',
        width: '40%',
        minWidth: '300px',
    },
    listContainer: {
        width: '100%',
        height: '100%',
        padding: '0 0 0 0',
        margin: '0 0 0 0',
        borderRadius: 6,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        listStyleType: 'none'
    },
    list: {
        padding: '20px',
        borderRadius: '18px',
        marginTop: '8px',
        backgroundColor: '#eee',
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'row'
    },
    left: {
        alignSelf: 'flex-start',
        marginLeft: '12px'
    },
    right: {
        alignSelf: 'flex-end',
        marginRight: '12px',
        flexDirection: 'row-reverse',
        backgroundColor: '#ddd',
    },
    image: {
        width: '120px',
        height: '120px',
        float: 'left',
        marginTop: '8px',
        borderRadius: '8px'
    },
    messageBox: {
        display: 'flex',
        flexDirection: 'column'
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
				<List className={classes.listContainer}>
					{
						messageList.map((message, i) => (
							<ListItem key={i} className={`${classes.list} ${message.sender === 'bot'? classes.left:classes.right}`}>
                                <ListItemAvatar>
                                    <>
                                        <Avatar src={message.sender === 'bot' ? BotImage : UserImage}></Avatar>
                                        <ListItemText
                                            primary={`${message.sender === 'bot' ? "bot" : "user"}`}
                                        />
                                    </>
                                </ListItemAvatar>
                                <Container className={classes.messageBox}>
                                    {message.text}
                                    {message.data?.imgSrc? <img className={classes.image} src={message.data.imgSrc} alt={message.text} /> : null}
                                </Container>
							</ListItem>
						))
					}
				</List>
			</Container>
			<TextField
				label="Your Message"
				variant="standard"
				value={userText}
				onChange={(e) => setUserText(e.target.value)}
				onKeyDown={keyPress}
                className={classes.textField}
			/>
			{status === StatusType.CONNECTED && <Button color="primary" className={classes.submitButton} variant="contained" onClick={submit}>Submit</Button>}
		</Container>
	);
};

export default Chat;