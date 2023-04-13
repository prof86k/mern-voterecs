import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import theme from '../helpers/theme';

// const useStyles = useTheme(theme => ({
const useStyles = {
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(3)}px`,
        color: theme.palette.openTitle
    },
    media: {
        minHeight: 400
    }
}
// }))

const Home = () => {
    return (
        <Card md={useStyles.card}>
            <Typography variant="h6" md={useStyles.title}>
                Home Page
            </Typography>
            <CardContent>
                This is the content of the card
            </CardContent>
        </Card>
    );
}

export default Home;
