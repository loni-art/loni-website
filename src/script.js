//array.from is needed to turn the NodeList into an Array to map from
let map_elements = (elementArray,fn)=>Array.from(elementArray).map(fn);

let make_clickable = (id)=>{
	let section = document.getElementById(id);
	let gallery = section.getElementsByTagName('div')[0];
	let images = gallery.children;
	let frozenImages = new Array(0)
	map_elements(images,(image,index,images)=>(frozenImages[index]=image.cloneNode()));
	gallery.innerHTML = ' '; //i dont delete the nodes in the map because it causes too much reflow
	let galleryCopy = gallery.cloneNode();
	frozenImages.map((image)=>{
		let link = document.createElement('a');
		link.setAttribute('href',image.src);
		if(!(image.getAttribute('length2')===null)){
			link.setAttribute('length2',' ');
		}
		if(!(image.getAttribute('length3')===null)){
			link.setAttribute('length3',' ');
		}
		link.appendChild(image);
		galleryCopy.appendChild(link)
	})
	section.replaceChild(galleryCopy,gallery);
}
make_clickable('digital');
make_clickable('pixel');