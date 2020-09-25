import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { ExpBooking } from './ExpBooking';
import { ExpParticipantsList } from './ExpParticipantsList';
import { Menu } from './Menu';
import { ReviewEdit } from './ReviewEdit'
import { ReviewList } from './ReviewList'
import { ExpRateBig } from './ExpRateBig';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export function ExpDetailsTab({ user, exp, numOfGuests, onNumOfGuestsChange, toggleAddReviewShown, onHandleChange, onAddReview, review, onBookClick, isAddReviewShown }) {
    const classes = useStyles();
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <section className="exp-content">
            <div className="exp-details">
                <TabContext value={value}>
                    <AppBar position="static">
                        <TabList onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Menu" value="1" />
                            <Tab label="Reviews" value="2" />
                            <Tab label="Guest list" value="3" />
                        </TabList>
                    </AppBar>
                    <TabPanel value="1"><Menu menu={exp.menu} /></TabPanel>
                    <TabPanel value="2"><section className="exp-reviews flex column">
                        <div className="flex space-between">
                        <ExpRateBig reviews={exp.reviews} />
                        
                        <button onClick={toggleAddReviewShown}>Add review</button>
                        </div>
                        <ReviewList reviews={exp.reviews} />
                        {isAddReviewShown && <ReviewEdit onHandleChange={onHandleChange} onAddReview={onAddReview} review={review} user={user} />}
                    </section></TabPanel>
                    <TabPanel value="3"><ExpParticipantsList participants={exp.participants} /></TabPanel>
                </TabContext>
            </div>
        </section>
    );
}
