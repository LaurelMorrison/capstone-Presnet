import * as moment from 'moment';

export const dateFixer = (event) => {
    const date = new Date(event.date);
    let eventDate = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear()
    return eventDate
};
export const altDateFixer = (event) => {
    const date = new Date(event.date);
    let eventDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    return eventDate
};
export const momentDateFixer = (event) => {
    const date = new Date(event.date);
    const eventDate = moment(date).format("YYYY-MM-DD")
    return eventDate
};