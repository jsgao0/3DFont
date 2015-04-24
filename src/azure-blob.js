(function() {

	"use strict";

	var azure = require('azure-storage');
	var nconf = require('nconf');
	nconf.env()
	     .file({ file: 'config.json'});

	function AzureBlob() { 

		this.accountName = nconf.get("STORAGE_NAME");
		this.accountKey = nconf.get("STORAGE_KEY");
		// accountName equals containerName or storage account name.
		// accountKey equals primary access key.

		var retryOperations = new azure.ExponentialRetryPolicyFilter();
		this.blobService = azure.createBlobService(this.accountName, this.accountKey)
								.withFilter(retryOperations);

	}

	AzureBlob.prototype = {

		_logResult: function(error, result, response) {
			if(!error) {
				console.log('Response: ' + response)
				console.log('Result: ' + result)
			} else {
				console.log(error);
			}
		},

		createContainer: function(containerName, containerAccessLevel, callback) {
			// containerName is a String.
			// containerAccessLevel is a String. It is 'blob', 'container', and 'private'. The default is 'private'.

			this.blobService.createContainerIfNotExists(containerName, {publicAccessLevel: containerAccessLevel || ''}, callback || function(){})
		},

		setContainerAcl: function(containerName, containerAccessLevel) {
			this.blobService.setContainerAcl(containerName, null, containerAccessLevel, this._logResult)
		},

		createFileBlock: function(container, blob, file, options, callback) {
			try {
				this.blobService.createBlockBlobFromLocalFile(container, blob, file, options, callback)
			} catch (error) {
				console.log(error);
			}
		},

		createStreamBlock: function(container, blob, stream, streamLength, options, callback) {
			try {
				this.blobService.createBlockBlobFromStream(container, blob, stream, streamLength, options || {}, callback)
			} catch (error) {
				console.log(error);
			} finally {
				console.log('Creating stream block has done.');
			}
		},

		createTextBlock: function(container, blob, text, options, callback) {
			try {
				this.blobService.createBlockBlobFromText(container, blob, text, options || {} || function(){}, callback || function(){})
			} catch (error) {
				console.log(error);
			} finally {
				// console.log('Creating text block has done.')
			}
		},

		createFilePageBlob: function(container, pageBlob, file, options, callback) {
			try {
				this.blobService.createPageBlobFromLocalFile(container, pageBlob, file, options || {}, callback);
			} catch (error) {
				console.log(error);
			} finally {
				// console.log('Creating file page blob has done.')
			}
		},

		getFileBlob: function(container, blob, fileName, callback) {
			try {
				this.blobService.getBlobToFile(container, blob, fileName, options || {}, callback);
			} catch (error) {
				console.log(error);
			} finally {
				
			}
		}

	}

	module.exports = AzureBlob;

})();