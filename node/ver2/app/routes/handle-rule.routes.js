module.exports = function(app){
	var rule = require('../controllers/rule-create.controller');
	var rule_list = require('../controllers/rule-list.controller');

	// if time
	app.post('/createIfTime',rule.If_Create_Time);
	// if tag
	app.post('/createIfTag',rule.If_Create_Tag);
	// if out
	app.post('/createIfOut',rule.If_Create_Out);
	// if day
	app.post('/createIfDay',rule.If_Create_Day);
	// if date
	app.post('/createIfDate',rule.If_Create_Date);
	// then Line
	app.post('/createThenLine',rule.Then_Create_Line);
	// then Control
	app.post('/createThenControl',rule.Then_Create_Control);
	// if status
	app.post('/createIfStatus',rule.If_Create_Status);
	// list rule
	app.post('/listRule',rule_list.Rule_list);
	// remove rule
	app.post('/ruleremove',rule.remove);
}