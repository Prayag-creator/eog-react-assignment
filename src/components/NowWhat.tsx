import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from './CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
  card: {
    margin: '5% 25%',
  },
});

export default () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title="Ready with assignment, Things to keep in mind before running" />
      <CardContent>
        <List>
          <ListItem>
            <Avatar>1</Avatar>
            <ListItemText primary="Graphql + Ploty used" />
          </ListItem>
          <ListItem>
            <Avatar>2</Avatar>
            <ListItemText primary="Used Node JS >= 12.X" />
          </ListItem>
          <ListItem>
            <Avatar>3</Avatar>
            <ListItemText primary="React Router with basic TypeScript Used" />
          </ListItem>
          <ListItem>
            <Avatar>4</Avatar>
            <ListItemText primary="Chart Used to display data" />
          </ListItem>
          <ListItem>
            <Avatar>5</Avatar>
            <Link
              style={{ backgroundColor: 'red', color: '#ffffff' }}
              to="/dashboard"
            >
              {' '}
              "Click Here to View App"
            </Link>
          </ListItem>
        </List>

        <Typography variant="body1">
          Remember to refer to our{' '}
          <a href="https://react.eogresources.com/assessing">
            How We Assess Submissions
          </a>{' '}
          guidelines, as well as the{' '}
          <a href="https://react.eogresources.com/api">
            GraphQL API Documentation
          </a>
          .
        </Typography>
      </CardContent>
    </Card>
  );
};
