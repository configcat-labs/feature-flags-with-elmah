export default function setUpLogger () {
	const elmahLogger = new Elmahio({
	  apiKey: 'YOUR-API-KEY',
	  logId: 'YOUR-LOG-ID',
	  application: 'ZPlatform',
	  filter: function (message) {
	    	return message.severity === 'Error' && errorFilterEnabled;
	    }
		});

		const user = {
			email: 'zayyad@zmscorp.com'
		};

		elmahLogger.on('message', function (message) {
			if(!message.user) {
				message.user = user.email;
			}
		});
	try {
		const configcatClient = configcat.getClient(
			'YOUR-SDK-KEY',
			configcat.PollingMode.AutoPoll,
			{
    		pollIntervalSeconds: 4
  		});

		var errorFilterEnabled = false; // default value
	
		async function setFlagValue() {
			errorFilterEnabled = await configcatClient.getValueAsync("enable_error_filtering", false, user
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