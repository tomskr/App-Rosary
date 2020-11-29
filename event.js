const moment = require('moment');
const rosaryEvent = require('./models/rosaryEvent');
moment().format(); 

    months = ['STY','LUT','MAR','KWI','MAJ','CZE','LIP','SIE','WRZ','PAZ','LIS','GRU']
    const firstSundays =() =>{
        var head = []
        var date = moment("2021-01-01")
         while(date.year()!=2022){
            if(date.day()===0&&date.date()<8){
            head.push(date.date() + "." + months[(date.month())])
            }
            date.add(1,'d')
        }
        return head
    }

        const populateEvents = () => {
            
        }


exports.firstSundays = firstSundays
