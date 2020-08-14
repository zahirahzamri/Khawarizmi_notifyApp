import { db } from '../config/db';
import { Actions } from 'react-native-router-flux';

export const addSubscription =  (name, date) => {
    db.ref('/user').set({
        subscriptionName: name,
        dateNotify: date
    }, () => Actions.ViewScreen());
}

export const updateuser =  (name, date) => {
    db.ref('/user').update({
        subscriptionName: name,
        dateNotify: date
    }, () => Actions.ViewScreen());
}

export const deleteSubscription =  (name) => {
    db.ref('/user').subscriptionName(name).remove();
    Actions.ViewScreen();
}

export const deletedateNotify =  (date) => {
    db.ref('/user').dateNotify(date).remove();
    Actions.ViewScreen();
}