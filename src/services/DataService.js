import { db } from '../config/db';
import { Actions } from 'react-native-router-flux';

export const AddSubscriptionApp =  (subsAppName,amount,renewalPeriod,paymentMethod,reminder) => {
    db.ref('/apps').child(subsAppName).set({
        subsAppName: subsAppName,
        amount: amount,
        renewalPeriod: renewalPeriod,
        paymentMethod: paymentMethod,
        reminder: reminder,
        date: new Date().toString(),
    }, () => Actions.ListScreen());
}

export const updateSubscriptionApp =  (subsAppName,amount,renewalPeriod,paymentMethod,reminder) => {
    db.ref('/apps').child(subsAppName).update({
        subsAppName: subsAppName,
        amount: amount,
        renewalPeriod: renewalPeriod,
        paymentMethod: paymentMethod,
        reminder: reminder,
        date: new Date().toString()
    }, () => Actions.ListScreen());
}

export const AddUtilitiesApp =  (utilitiesName,duePeriod,paymentMethod,reminder,date) => {
    db.ref('/apps').child(utilitiesName).set({
        utilitiesName: utilitiesName,
        duePeriod: duePeriod,
        paymentMethod: paymentMethod,
        reminder: reminder,
        date: new Date().toString(),
    }, () => Actions.ListScreen());
}

export const updateUtilities =  (utilitiesName,duePeriod,paymentMethod,reminder,date) => {
    db.ref('/apps').child(utilitiesName).update({
        utilitiesName: utilitiesName,
        duePeriod: duePeriod,
        paymentMethod: paymentMethod,
        reminder: reminder,
        date: date
    }, () => Actions.AddUtilities());
}

export const removeUtilities =  (utilitiesName) => {
    db.ref('/apps').child(utilitiesName).remove();
    Actions.AddUtilities();
}

export const removeSubscriptionApp =  (subsAppName) => {
    db.ref('/apps').child(subsAppName).remove();
    Actions.ListScreen();
}
