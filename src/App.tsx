import React, { ReactElement, FC } from "react";
import { TextField, Button, Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	mainContainer: {
		height: '90vh',
		width: '90vw',
		backgroundColor: '#e0e0e0'
	}
})

const APP: FC<any> = (): ReactElement => {
	const classes = useStyles();
	return (
		<Container className={classes.mainContainer}>
			<TextField id="standard-basic" label="Your Message" variant="standard" />
			<Button variant="contained">Submit</Button>
		</Container>
	);
};

export default APP;