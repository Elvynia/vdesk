export class Bubble {
	content: string;
	color: string;
	size: number;
	position: THREE.Vector3;

	constructor(content: string, color: string, size?: number, position?: THREE.Vector3) {
		this.content = content;
		this.color = color;
		this.size = size || 1;
		this.position = position || new THREE.Vector3();
	}
}