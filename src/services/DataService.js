export const AddUtilitiesApp =  (utilitiesName,duePeriod,paymentMethod,reminder,date) => {
    db.ref('/apps').child(utilitiesName).set({
        utilitiesName: utilitiesName,
        duePeriod: duePeriod,
        paymentMethod: paymentMethod,
        reminder: reminder,
        date: date,
    }, () => Actions.AddUtilities());
}

export const updateUtilitiesApp =  (utilitiesName,duePeriod,paymentMethod,reminder,date) => {
    db.ref('/apps').child(utilitiesName).update({
        utilitiesName: utilitiesName,
        duePeriod: duePeriod,
        paymentMethod: paymentMethod,
        reminder: reminder,
        date: date
    }, () => Actions.AddUtilities());
}

export const removeSubscriptionApp =  (utilitiesName) => {
    db.ref('/apps').child(utilitiesName).remove();
    Actions.AddUtilities();
}