module.exports = function(request, response, next) {
	var start = +new Date(); //plus sign converts date object to milliseconds
	var stream =  process.stdout; //standard out is a writeable stream which we will be writing the log to
	var url = request.url;
	var method = request.method;
	response.on('finish', function() {
		var duration = +new Date() - start;
		var message =  method + 'to' + url + '\ntook' + duration + 'ms \n\n';
		stream.write(message); //prints the log message
	} );


	next();
} 
