var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        var success = function() {
            console.log("addNdefListener success");
        };
        var failure = function(reason) {
            alert("addNdefListener failed " + reason);
        }

        // The NDEF listener runs in the foreground
        nfc.addNdefListener(app.onNfc, success, failure);

        // The Mime-Type listener is required to handle NDEF messages that
        // launch the app from an intent filters in AndroidManifest.xml.
        // For messages from intents, the mime type defined here doesn't matter.
        // Note the same event handler is used for NDEF and Mime
        nfc.addMimeTypeListener('text/any', app.onNfc, success, failure);
    },
    onNfc: function(nfcEvent) {
			var tag = nfcEvent.tag,
            ndefMessage = tag.ndefMessage,
			record = ndefMessage[0];

		
		var text = ndef.textHelper.decodePayload(record.payload);
		alert("text: " + text);
    }
};

app.initialize();
