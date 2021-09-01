var inflect = require('i')(true)


console.log( inflect.titleize('messages to store') )
console.log( 'messages to store'.titleize )


var str = inflect.pluralize('person'); // === 'people'
console.log('str: ', str);
var str = inflect.pluralize('octopus'); // === 'octopi'
console.log('str: ', str);
var str = inflect.pluralize('Hat'); // === 'Hats'
console.log('str: ', str);
var str = inflect.pluralize('fish'); // === 'Hats'
console.log('str: ', str);



var str = inflect.singularize('people'); // === 'person'
console.log('str: ', str);
var str = inflect.singularize('octopi'); // === 'octopus'
console.log('str: ', str);
var str = inflect.singularize('Hats'); // === 'Hat'
console.log('str: ', str);
var str = inflect.singularize('papers'); // === 'Hat'
console.log('str: ', str);




// 从'_'变为驼峰命名
var str = inflect.camelize('message_properties'); // === 'MessageProperties'
console.log('str: ', str);
var str = inflect.camelize('message_properties', false); // === 'messageProperties'
console.log('str: ', str);

var str = inflect.camelize('messageproperties'); // === 'MessageProperties'
console.log('str: ', str);
var str = inflect.camelize('message-properties', false); // === 'messageProperties'
console.log('str: ', str);



var str = inflect.underscore('MessageProperties'); // === 'message_properties'
console.log('str: ', str);
var str = inflect.underscore('messageProperties'); // === 'message_properties'
console.log('str: ', str);
var str = inflect.underscore('MessageKKKKroperties'); // === 'message_properties'
console.log('str: ', str);
var str = inflect.underscore('messagePropekkkKrties'); // === 'message_properties'
console.log('str: ', str);



var str = inflect.humanize('message_id'); // === 'Message'
console.log('str: ', str);
var str = inflect.humanize('message_ID'); // === 'Message'
console.log('str: ', str);



var str = inflect.dasherize('message_properties'); // === 'message-properties'
console.log('str: ', str);
var str = inflect.dasherize('Message Properties'); // === 'Message Properties'
console.log('str: ', str);
var str = inflect.dasherize('mess&aGe_prop_e-r ties'); // === 'message-properties'
console.log('str: ', str);
var str = inflect.dasherize('Message Properties'); // === 'Message Properties'
console.log('str: ', str);



var str = inflect.titleize('message_prop_er t ies'); // === 'Message Properties'
console.log('str: ', str);
var str = inflect.titleize('message properties to keep'); // === 'Message Properties to Keep'
console.log('str: ', str);



var str = inflect.demodulize('Message.Bus.Properties'); // === 'Properties'
console.log('str: ', str);
var str = inflect.demodulize('Message.Bus.Properties.lll.k'); // === 'Properties'
console.log('str: ', str);


var str = inflect.tableize('MessageBu-sPro=perty'); // === 'message_bus_properties'
console.log('str: ', str);


inflect.inflections.uncountable('finshes')
var str = inflect.pluralize('finshes'); // === 'finshes'
console.log('str: ', str);
var str = inflect.singularize('finshes'); // === 'finshes'
console.log('str: ', str);