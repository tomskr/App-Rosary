const moment = require('moment');
const rosaryEvent = require('./models/rosaryEvent');
const rosaryGroup = require('./models/rosaryGroup')
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
            //find first monday
            var date = moment("2021-01-01")
            while(date.day()!=1){
                date.add(1,'d')
            }
            //create array of fosary group id
            //  const foundID = rosaryGroup.find({id:1});
            //      console.log(foundID)
            
        }


exports.firstSundays = firstSundays
exports.populateEvents = populateEvents
