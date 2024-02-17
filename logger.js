const logger = new Elmahio({
  apiKey: 'YOUR-API-KEY',
  logId: 'YOUR-LOG-ID',
  application: 'My Application',
  filter: function (message) {
    	return message.severity === 'Error' && errorFilterEnabled
    }
	})

	function getMockUser () {
		const user = {
			identifier: '12345',
			email: 'zayyad@zmscorp.com'
		};
		return user;
	}

	logger.on('message', function (message) {
			if(!message.user) {
				message.user = getMockUser().email
			}
	});

	const configcatClient = configcat.getClient('YOUR-SDK-KEY');
	var errorFilterEnabled;

	async function setFlagValue() {
		errorFilterEnabled = await configcatClient.getValueAsync("enable_error_filtering", false, getMockUser()
		);
	}
	setFlagValue()

	configcatClient.on('configChanged', function () {
		setFlagValue()
	})

export default logger;