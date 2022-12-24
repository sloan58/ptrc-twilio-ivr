const sgMail = require('@sendgrid/mail');


exports.handler = function(context, event, callback) {
  console.log(`Sending to ${event.precinct}@ptgop.com`)
  sgMail.setApiKey(context.SENDGRID_API_SECRET);
          const msg = {
            to: 'marty@karmatek.io',
            from: context.FROM_EMAIL_ADDRESS,
            text: `New Voicemail from: ${event.From}\n\n Message Transcription: ${event.TranscriptionText}\n\n Recording URL is: ${event.RecordingUrl}`,
            html: `<p><strong>New Voicemail from:</strong> ${event.From}</p>
               <strong>Message Transcription:</strong><br>${event.TranscriptionText}<p><a href=${event.RecordingUrl}>
               Click here to Listen to the Recording</a></p>`,
            subject: `New Voicemail from: ${event.From}`,
          };
          sgMail.send(msg)
          .then(response => {
              console.log("Neat.")
              callback();
          })
          .catch(err => {
              console.log("Not neat.")
              callback(err);
          });
};

