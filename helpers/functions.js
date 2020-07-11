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
