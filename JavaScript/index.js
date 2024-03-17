/**
  * Firebase Cloud Messaging (FCM) អាចត្រូវបានប្រើដើម្បីផ្ញើសារទៅកាន់អតិថិជននៅលើ iOS, Android និង Web ។
  *
  * គំរូនេះប្រើ FCM ដើម្បីផ្ញើសារពីរប្រភេទទៅអតិថិជនដែលបានជាវ 'ព័ត៌មាន'
  * ប្រធានបទ។  សារមួយប្រភេទគឺសារជូនដំណឹងសាមញ្ញ (បង្ហាញសារ)។  មួយទៀតគឺ
  * សារជូនដំណឹង (បង្ហាញការជូនដំណឹង) ជាមួយនឹងការប្ដូរតាមបំណងជាក់លាក់នៃវេទិកា។  ឧទាហរណ៍,
  * ផ្លាកសញ្ញាត្រូវបានបន្ថែមទៅសារដែលត្រូវបានផ្ញើទៅកាន់ឧបករណ៍ iOS ។
  */
const https = require('https');
const { google } = require('googleapis');

const PROJECT_ID = '<YOUR-PROJECT-ID>';
const HOST = 'fcm.googleapis.com';
const PATH = '/v1/projects/' + PROJECT_ID + '/messages:send';
const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE];
/**
  * ទទួលបានសញ្ញាសម្ងាត់ចូលប្រើត្រឹមត្រូវ។
  */
 // [START ទៅយក_access_token]
function getAccessToken() {
  return new Promise(function(resolve, reject) {
    const key = require('../placeholders/service-account.json');
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    );
    jwtClient.authorize(function(err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}
/**
  * ផ្ញើសំណើ HTTP ទៅ FCM ជាមួយនឹងសារដែលបានផ្តល់ឱ្យ។
  *
  * @param {object} fcmMessage នឹងបង្កើតជាតួនៃសំណើ។
  */
function sendFcmMessage(fcmMessage) {
  getAccessToken().then(function(accessToken) {
    const options = {
      hostname: HOST,
      path: PATH,
      method: 'POST',
      // [START use_access_token]
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
      // [END use_access_token]
    };

    const request = https.request(options, function(resp) {
      resp.setEncoding('utf8');
      resp.on('data', function(data) {
        console.log('Message sent to Firebase for delivery, response:');
        console.log(data);
      });
    });

    request.on('error', function(err) {
      console.log('Unable to send message to Firebase');
      console.log(err);
    });

    request.write(JSON.stringify(fcmMessage));
    request.end();
  });
}

/**
 * Construct a JSON object that will be used to customize
 * the messages sent to iOS and Android devices.
 */
function buildOverrideMessage() {
  const fcmMessage = buildCommonMessage();
  const apnsOverride = {
    'payload': {
      'aps': {
        'badge': 1
      }
    },
    'headers': {
      'apns-priority': '10'
    }
  };

  const androidOverride = {
    'notification': {
      'click_action': 'android.intent.action.MAIN'
    }
  };

  fcmMessage['message']['android'] = androidOverride;
  fcmMessage['message']['apns'] = apnsOverride;

  return fcmMessage;
}
/**
  * បង្កើតវត្ថុ JSON ដែលនឹងត្រូវបានប្រើដើម្បីកំណត់
  * ផ្នែកទូទៅនៃសារជូនដំណឹងដែលនឹងត្រូវបានផ្ញើ
  * ចំពោះកម្មវិធីណាមួយដែលបានជាវប្រធានបទព័ត៌មាន។
  */
function buildCommonMessage() {
  return {
    'message': {
      'topic': 'news',
      'notification': {
        'title': 'FCM Notification',
        'body': 'Notification from FCM'
      }
    }
  };
}

const message = process.argv[2];
if (message && message == 'common-message') {
  const commonMessage = buildCommonMessage();
  console.log('FCM request body for message using common notification object:');
  console.log(JSON.stringify(commonMessage, null, 2));
  sendFcmMessage(buildCommonMessage());
} else if (message && message == 'override-message') {
  const overrideMessage = buildOverrideMessage();
  console.log('FCM request body for override message:');
  console.log(JSON.stringify(overrideMessage, null, 2));
  sendFcmMessage(buildOverrideMessage());
} else {
  console.log('Invalid command. Please use one of the following:\n'
      + 'node index.js common-message\n'
      + 'node index.js override-message');
  }
