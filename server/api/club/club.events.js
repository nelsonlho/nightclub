/**
 * Club model events
 */

'use strict';

import {EventEmitter} from 'events';
import Club from './club.model';
var ClubEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ClubEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Club.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ClubEvents.emit(event + ':' + doc._id, doc);
    ClubEvents.emit(event, doc);
  }
}

export default ClubEvents;
