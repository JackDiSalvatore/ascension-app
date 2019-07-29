//import {message} from "antd";
import toastr from 'toastr';
toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  positionClass: "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

const DEFAULT_NOTIFICATION_DURATION = 1;

export const parseEOS    = eosString => parseFloat(eosString.split(" ")[0]);
export const toEOSString = value => `${parseFloat(value).toFixed(4)} EOS`;

export const notifyError   = (value = 'Error !', duration = DEFAULT_NOTIFICATION_DURATION) => {
  //console.log(value, duration)
  toastr.error(value)
}

export const notifyInfo    = (value, duration = DEFAULT_NOTIFICATION_DURATION) => {
  //console.log(value, duration)
  toastr.info(value)
}

export const notifySuccess = (value = 'Success !', duration = DEFAULT_NOTIFICATION_DURATION) => {
  //console.log(value, duration)
  toastr.success(value)
}

export const notifyWarning = (value = 'Warning !', duration = DEFAULT_NOTIFICATION_DURATION) => {
  //console.log(value, duration)
  toastr.warning(value)
}
