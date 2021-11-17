import React, { ReactElement, FC, useEffect, useState } from "react";
import {client} from "./util/client";
import { useDispatch } from "react-redux";
import { addMessage } from "./store/actions/MessageList";
import Chat from "./components/chat";
import { StatusType } from "./util/types";

const APP: FC<{}> = (): ReactElement => {
	const dispatch = useDispatch();
	const [status, setStatus] = useState<StatusType>(StatusType.INIT);
	
	useEffect(() => {
		client.on("output", output => {
			dispatch(addMessage({sender: 'bot', text: output.text, data: output.data}));
		})
		client.connect().then(() => {
			setStatus(StatusType.CONNECTED);
			return true;
		}).catch(e => {
			console.log('something went wrong -> ', e);
			setStatus(StatusType.ERROR);
			return false;
		})
		return () => {
			client.disconnect();
		};
	}, []);

	return (
		<Chat status={status} />
	);
};

export default APP;