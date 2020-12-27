const moment = require('moment');
const rosaryEvent = require('./models/rosaryEvent');
const rosaryGroup = require('./models/rosaryGroup')
moment().format();

months = ['STY', 'LUT', 'MAR', 'KWI', 'MAJ', 'CZE', 'LIP', 'SIE', 'WRZ', 'PAZ', 'LIS', 'GRU']
const firstSundays = () => {
    var head = []
    var date = moment("2021-01-01")
    while (date.year() != 2022) {
        if (date.day() === 0 && date.date() < 8) {
            head.push(date.date() + "." + months[(date.month())])
        }
        date.add(1, 'd')
    }
    return head
}

const populateEvents = async () => {
    //delete all in rosaryEvent
    if(rosaryGroup.length){
    rosaryGroup.updateMany({}, { $set: { rosaryEvents: [] }}, function(err, affected){
        console.log('affected: ', affected);
    })}

    if(rosaryEvent.length){
    rosaryEvent.deleteMany({}, function(err, result) {
        console.log('affected: ', result);
    })}

    //make active group list
    const groupList = await rosaryGroup.find({ active: true }).sort({ order: 1 })
    var count = 0
    for(let date = moment("2021-01-01 09:15:00"); date.year() != 2022; date.add(1,'d')) {
        if (date.day() === 1) {
            let startDate = date.format('YYYY-MM-DD')
            let stopDate = date.add(6, 'd').format('YYYY-MM-DD')
            let newRosaryEvent = new rosaryEvent({
                startDate: startDate,
                stopDate: stopDate,
            })
            newRosaryEvent.save()
            .catch(err => res.status(400).json(`Error: ${err}`));
            groupList[count%groupList.length].rosaryEvents.push(newRosaryEvent)
            await groupList[count%groupList.length].save()
            .catch(err => res.status(400).json(`Error: ${err}`));
            ++count 
        }
    }
}


exports.firstSundays = firstSundays
exports.populateEvents = populateEvents
