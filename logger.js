export default function setUpLogger () {
	const elmahLogger = new Elmahio({
	  apiKey: 'YOUR-API-KEY',
	  logId: 'YOUR-LOG-ID',
	  application: 'My Application',
	  filter: function (message) {
	    	return message.severity === 'Error' && errorFilterEnabled;
	    }
		});

		const user = {
			identifier: '12345',
			email: 'zayyad@zmscorp.com'
		};

		elmahLogger.on('message', function (message) {
			if(!message.user) {
				message.user = user.email;
			}
		});
	try {
		const configcatClient = configcat.getClient('YOUR-SDK-KEY');


		var errorFilterEnabled = false; // default value
	
		async function setFlagValue() {
			errorFilterEnabled = await configcatClient.getValueAsync("enable_error_filtering", false, getMockUser()
			);
		}
		setFlagValue();
	
		configcatClient.on('configChanged', function () {
			setFlagValue();
		})
	} catch(error) {
		console.error(error);
	}

	return elmahLogger;
}