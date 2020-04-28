const output =(inp, elem) => {
	let pre = document.createElement('pre');
	pre.innerHTML=`<code>${inp}</code>`
    elem.appendChild(pre);
}

const syntaxHighlight = (json) => {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,  (match) => {
        let cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) cls = 'key';
			
            else  cls = 'string';
        } 
		else if (/true|false/.test(match)) cls = 'boolean';
        else if (/null/.test(match))  cls = 'null';

        return `<span class="${cls}">${match}</span>`;
    });
}
/* Who Is API */
fetch('https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/', {
    method: 'GET',
    headers: { 
		'Content-Type': 'application/json',
		'x-rapidapi-host':'ip-geolocation-ipwhois-io.p.rapidapi.com',
		'x-rapidapi-key': 'srclZqaa9imshAk9Xzz55u27oltLp1SqdiFjsnmva9PTpf2j3f'
	}
})
.then((res) => res.json())
.then((json) => {
	let syntax = syntaxHighlight(JSON.stringify(json, null, 4))
	output(syntax, document.getElementById('who-is'));
});

/* GeoLocation API */
function initialize() {
	function success(position) {
		const latitude  = position.coords.latitude;
		const longitude = position.coords.longitude;
		let json = {
			latitude: `${latitude} °`,
			longitude: `${longitude} °`,
			link: `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
		}
		let syntax = syntaxHighlight(JSON.stringify(json, null, 4))
		output(syntax, document.getElementById('geo-location'));
	}

	function error() {
		let json = {
			error: 'Could not locate user.'
		}
		let syntax = syntaxHighlight(JSON.stringify(json, null, 4))
		output(syntax, document.getElementById('geo-location'));
	}

	if (!navigator.geolocation) {
		let json = {
			error: 'Could not locate user.'
		}
		let syntax = syntaxHighlight(JSON.stringify(json, null, 4))
		output(syntax, document.getElementById('geo-location'));
	} 
	else {
		navigator.geolocation.getCurrentPosition(success, error);
	}
}
initialize();