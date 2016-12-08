import {Meteor} from 'meteor/meteor';
const child_process = require('child_process');
import {_} from 'meteor/underscore';
const exec = child_process.exec;
import {Promise} from 'meteor/promise';
import {Stdout} from '/common/collections';

Meteor.startup(() => {
});

Meteor.publish('stdout', function () {
  return Stdout.find();
});

Meteor.methods({

  cleanDB: () => {
   Stdout.remove({});
  },
  useHTTP:(urls)=>{
    _.each(urls, (u) => {
      if (!u || u.length < 0) {
        return false;
      } else {
        Meteor.call('makeHTTPCall', u)
      }
    });
  },
  makeHTTPCall: (url) => {
    console.log(url);
   let res = HTTP.call('POST', 'https://api.projectoxford.ai/vision/v1.0/describe', {
     content: 'application/json',
     headers: {
       'Ocp-Apim-Subscription-Key': Meteor.settings.vision.key
     },
     params: {
       maxCandidates: '1',
     },
     data:{
       Url: url
     }
   });
   let d = res.data;
    Stdout.insert({
      timestamp: new Date(),
      tags:d.description.tags,
      description: d.description.captions[0].text,
      confidence: d.description.captions[0].confidence,
      image: url
    });
  }

});

