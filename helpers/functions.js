import moment from "moment";

//our default date is in miliseconds
export const formatDate = (date) => {
  return date ? moment.unix(date / 1000).format("DD/MM/YYYY") : "Active";
};

export const calcDays = (startDate, endDate) => {
  let now = moment().unix();

  if (endDate) {
    now = endDate / 1000;
  }

  return moment.unix(now).diff(moment.unix(startDate / 1000), "days");
};


//function for days passed
export const fromNow = date => moment.unix(date / 1000).fromNow();

//shortify the text and put 3 dots at the end
export const shortify = (String, maxLength = 100) => {

  if (!String) return "";

  if (String.length <= maxLength) return String;

  return String.substr(0, maxLength) + "...";
}