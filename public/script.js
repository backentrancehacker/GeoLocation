const output =(inp, elem) => {
	let pre = document.createElement('pre');
	pre.className="code"
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

/* IP Info API */
fetch('/ip', {method: 'POST'})
.then(res => res.json())
.then(json => {
	let syntax = syntaxHighlight(JSON.stringify(json, null, 4))
	output(syntax, document.getElementById('ip-info-server'));
})

async function jsonIp(){
	let json = await fetch('https://jsonip.com/').then(res => res.json())
	fetch(`https://ipinfo.io/${json.ip}/json?token=0467ce20890c84`)
	.then(res => res.json())
	.then(json => {
		let syntax = syntaxHighlight(JSON.stringify(json, null, 4))
		output(syntax, document.getElementById('ip-info-client'));
	})
}
jsonIp()

/* Who Is API */
fetch('https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/', {
    method: 'GET',
    headers: { 
		'Content-Type': 'application/json',
		'x-rapidapi-host':'ip-geolocation-ipwhois-io.p.rapidapi.com',
		'x-rapidapi-key': 'srclZqaa9imshAk9Xzz55u27oltLp1SqdiFjsnmva9PTpf2j3f'
	}
})
.then(res => res.json())
.then(json => {
	let syntax = syntaxHighlight(JSON.stringify(json, null, 4))
	output(syntax, document.getElementById('who-is'));
});

/* GeoLocation API */
function initialize() {
	const success = (position) => {
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

	const error = () => {
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

let collaspsible = document.getElementsByClassName('collapsible')
for(let i = 0; i < collaspsible.length; i ++){
	let elem = collaspsible[i];
	let content = document.getElementsByClassName('content')[i];
	content.style.height = '0px'
	elem.addEventListener('click', () => {

		if(content.style.height == '0px'){
			let height = content.querySelector('pre').scrollHeight;

			Object.assign(content.style, {
				backgroundColor: 'whitesmoke',
				border: '2px solid gainsboro',
				height: `${height}px`,
				marginTop: '1em'
			})
			content.onclick = () => {
				let text = content.querySelector('pre').querySelector('code').textContent

				copy(text)

				new Alert('Copied Code!','good')
			}
		}
		else{
			Object.assign(content.style, {
				backgroundColor: 'white',
				border: '2px solid transparent',
				height: '0px',
				margin: '0'
			})
		}
	})
}
function copy(text){
	let input = document.createElement('input');
	input.value = text;
	document.body.appendChild(input)
	input.select();
	input.setSelectionRange(0, 99999); 
	document.execCommand("copy");
	input.remove()
}
