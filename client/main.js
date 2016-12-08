import { Template } from 'meteor/templating';
import {Stdout} from '/common/collections';
import {ReactiveVar} from 'meteor/reactive-var';
import './main.html';
import {_} from 'meteor/underscore';

Template.body.events({
  'click button'(event, instance) {
    let urls = $('.url-inputs').val();
    let arr = urls.split(' ');
    let uniq = _.uniq(arr);
    if(arr.length > 0){
      // Meteor.call('callPython', uniq);

      Meteor.call('useHTTP', uniq);
    }
  },
});

Template.body.helpers({
  results:()=>{
    let res = Stdout.find({}).fetch();
    return _.sortBy(res, (o)=> { return -o.timestamp });
    
  },
  formatConfidence:(conf)=>{
    return (conf * 100).toFixed(2);
  },
  topConfidence:()=>{
    let res = Stdout.find({}).fetch();
    let top = _.sortBy(res, (o)=> { return -o.confidence });
    return _.first(top);

  },
  leastConfidence:()=>{
    let res = Stdout.find({}).fetch();
    let top = _.sortBy(res, (o)=> { return o.confidence });
    return _.first(top);

  },
  famousPeople:()=>{
    let r = Stdout.find({description:{$regex: 'bill murray', $options: "i"}}).fetch();
    console.log(r);
    return r;
  }
});

Template.body.onRendered(()=>{
});

Template.body.onCreated(()=>{
  Meteor.subscribe('stdout');
});