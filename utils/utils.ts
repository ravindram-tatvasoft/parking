import moment from 'moment'

const msToTime = (milli: number) => {
  return moment(milli).format("HH:mm:ss")
}

const getDifferenceDateString = (startTime: string, endTime: string): string => {
  var startDate = moment(startTime);
  var endDate = moment(endTime);

  var totalSec = endDate.diff(startDate, 'seconds');
  const time = moment().startOf('day')
        .seconds(totalSec)
        .format('HH@mm').split("@");
    if(parseInt(time[0]) > 0){
      return `${time[0]} hours ${time[1]} minutes`
    } else{
      return `${time[1]} minutes`
    }
}

const validateCarNo = (carNo: string): boolean => {
  var pattern = /[A-Z][A-Z] [0-9][0-9] [A-Z][A-Z] [0-9][0-9][0-9][0-9]$/i;
  var re = new RegExp(pattern);
  return re.test(carNo)
}

const getDifferenceDate = (startTime: string, endTime: string): any => {
  var startDate = moment(startTime);
  var endDate = moment(endTime);

  const h = endDate.diff(startDate, 'hours')
  const m = endDate.diff(startDate, 'minutes')
  return { hour: h, minute: m }
}

export {
  msToTime,
  getDifferenceDate,
  getDifferenceDateString,
  validateCarNo
}