const https = require('https');

module.exports = {
  'Test': function (browser) {
    browser
      .url('https://www.baidu.com')
      .waitForElementPresent('body', 1000)
      .assert.title('百度一下，你就知道')
      .end();
  },

  tearDown: function (callback) {
    const data = JSON.stringify({
      "public": "public",
      "passed": true,
      "tags": []
    });

    let SESSION_ID = '';
    let USERNAME = '';
    let ACCESS_KEY = '';
    try {
      const capabilities = this.client.capabilities;
      const options = this.client.options;
      data.build = options.build;
      USERNAME = options.username;
      ACCESS_KEY = options.accessKey;
      SESSION_ID = capabilities["webdriver.remote.sessionid"];
    } catch (err) {
      console.error(new Error('Can not get the sessionId'));
      return;
    }

    const requestPath = '/rest/v1/' + USERNAME + '/jobs/' + SESSION_ID;
    try {
      console.log('Updaing saucelabs', requestPath);
      const req = https.request({
        hostname: 'saucelabs.com',
        path: requestPath,
        method: 'PUT',
        auth: USERNAME + ':' + ACCESS_KEY,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      }, function (res) {
        res.setEncoding('utf8');
        console.log('Response: ', res.statusCode, JSON.stringify(res.headers));
        res.on('data', function (chunk) {
          console.log('BODY: ' + chunk);
        });
        res.on('end', function () {
          console.info('Finished updating saucelabs.');
          callback();
        });
      });

      req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
      });
      req.write(data);
      req.end();
    } catch (err) {
      console.log('Error', err);
      callback();
    }

  }
};