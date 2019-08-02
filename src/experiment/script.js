//array.from is needed to turn the NodeList into an Array to map from
let map_elements = (elementArray,fn)=>Array.from(elementArray).map(fn);

let create_toggle = (id)=>{
	let section = document.getElementById(id);
	let gallery = section.getElementsByTagName('div')[0];
	let images = gallery.children;
	let frozenImages = new Array(0)
	map_elements(images,(image,index,images)=>(frozenImages[index]=image.cloneNode(true)));
	gallery.innerHTML = ' '; //i dont delete the nodes in the map because it causes too much reflow
	let galleryCopy = gallery.cloneNode();
	frozenImages.map((image,i)=>{
		image.setAttribute('index',i)

		input = document.createElement('input');
		input.setAttribute('type','checkbox');
		input.setAttribute('checked',false);
		galleryCopy.appendChild(input);
		let label = document.createElement('label');
		label.appendChild(image);
		galleryCopy.appendChild(label)
	})
	section.replaceChild(galleryCopy,gallery);
}
let setup_toggle = (id)=>{
	let section = document.getElementById(id);
	let labels = section.getElementsByTagName('label');
	//the last child of the section should be always the gallery div
	let gallery = section.getElementsByClassName('gallery')[0];
	gallery.addEventListener('click',function(event){	
		let index = event.target.getAttribute('index');
		//a little math to get the associated <input> element, both index and children are 0 indexed, and the inputs come first,
		//so we have just to skip the label element
		let checkbox = this.children[2*index];
		//the attributes are strings, so i have to do this to toggle AAAAAAAAAAAAAAA
		let isChecked = (checkbox.getAttribute('checked')==='false')?false:true;
		checkbox.setAttribute('checked',!isChecked) 
	});
}
create_toggle('digital');
create_toggle('pixel');
create_toggle('music');
window.setTimeout(()=>{
	images=document.getElementsByTagName('label');
	map_elements(images,(image)=>image.setAttribute('loaded',true))
},1);
setup_toggle('digital');
setup_toggle('pixel');
setup_toggle('music');
