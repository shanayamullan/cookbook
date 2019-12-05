var fs = require('fs');

function restoreOriginalData() {
    fs.writeFileSync('dishes.json', fs.readFileSync('dishes_original.json'));
}

function loadData() {
    return JSON.parse(fs.readFileSync('dishes.json'));
}

function saveData(data) {
	var obj = {
		dishes: data
	};

	fs.writeFileSync('dishes.json', JSON.stringify(obj));
}

module.exports = {
    restoreOriginalData: restoreOriginalData,
    loadData: loadData,
    saveData: saveData,
}