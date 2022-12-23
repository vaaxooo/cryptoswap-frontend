import moment from 'moment'
import 'moment/locale/ru';

export default function formatDate(value) {
    let interval = Math.floor((Date.now() - new Date(value)) / 86400)
    if (interval < 2760) {
        return moment(value).fromNow()
    } else {
        return moment(value).format('LL')
    }
}