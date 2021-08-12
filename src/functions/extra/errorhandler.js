export default function errorHandler (message, statuscode, success, errorfunc) {
    return {errormessage: message, statuscode, success, errorfunc}
}