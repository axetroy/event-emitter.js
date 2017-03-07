const process = require('process');
const nightwatch = require('nightwatch');

const pkg = require('./package.json');

const buildid = `build-${process.env.TRAVIS_JOB_NUMBER || `1988${pkg.name}`}`;

module.exports = {
  "src_folders": ["test/e2e"],
  "output_folder": "reports",
  "custom_commands_path": "",
  "custom_assertions_path": "",
  "page_objects_path": "",
  "globals_path": "",

  // "selenium": {
  //   "start_process": true,
  //   "server_path": "",
  //   "log_path": "",
  //   "port": 4444,
  //   "cli_args": {
  //     "webdriver.chrome.driver": "",
  //     "webdriver.gecko.driver": "",
  //     "webdriver.edge.driver": ""
  //   }
  // },

  "test_settings": {
    "default": {
      "launch_url": "https://localhost:9066",
      "username": process.env.SAUCE_USERNAME || "axetroy",
      "access_key": process.env.SAUCE_ACCESS_KEY || "368f16b0-cf4e-46a4-8a19-9b1576581bb4",
      "selenium_port": 80,
      "selenium_host": "ondemand.saucelabs.com",
      "silent": true,
      "screenshots": {
        "enabled": false,
        "path": ""
      },
      global: {
        waitForConditionTimeout: 15000
      },
      desiredCapabilities: {
        "browserName": "internet explorer",
        "chromeOptions": {
          "args": ["--no-sandbox"]
        },
        "acceptSslCerts": true,

        // build: `build-${process.env.TRAVIS_JOB_NUMBER || pkg.name + new Date().getTime()}`,
        build: buildid,
        public: 'public',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
      }
    },

    chrome48: {
      desiredCapabilities: {
        browserName: 'chrome',
        version: "48"
      }
    },

    chrome26: {
      desiredCapabilities: {
        browserName: 'chrome',
        version: "26"
      }
    },

    firefox45: {
      desiredCapabilities: {
        browserName: 'firefox',
        version: "45.0"
      }
    },

    firefox4: {
      desiredCapabilities: {
        browserName: 'firefox',
        version: "4.0"
      }
    },

    ie9: {
      desiredCapabilities: {
        browserName: 'internet explorer',
        version: '9'
      }
    },

    ie10: {
      desiredCapabilities: {
        browserName: 'internet explorer',
        version: '10'
      }
    },

    ie11: {
      desiredCapabilities: {
        browserName: 'internet explorer',
        version: '11'
      }
    },
    edge: {
      "desiredCapabilities": {
        "browserName": "MicrosoftEdge"
      }
    }
  }
};