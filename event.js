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
    const result = await rosaryEvent.deleteMany()
    //make active group list
    const groupList = await rosaryGroup.find({ active: true }).sort({ order: 1 })
    var count = 0
    for(let date = moment("2021-01-01 09:15:00"); date.year() != 2022; date.add(1,'d')) {
        if (date.day() === 1) {
            var startDate = date.format('YYYY-MM-DD')
            var stopDate = date.add(6, 'd').format('YYYY-MM-DD')
            // console.log(startDate + " " + stopDate)
            var rosaryDuty = new rosaryEvent({
                startDate: startDate,
                stopDate: stopDate,
                rosaryGroup: groupList[count%groupList.length]
            })
            ++count
            rosaryDuty.save()  
        }
    }
}


exports.firstSundays = firstSundays
exports.populateEvents = populateEvents
