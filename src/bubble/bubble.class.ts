export class Bubble {
	content: string;
	color: string;
	position: THREE.Vector3;
	size: number;
	parent: Bubble;

	constructor(content: string, color: string, position?: THREE.Vector3, size?: number) {
		this.content = content;
		this.color = color;
		this.position = position || new THREE.Vector3();
		this.size = size || 1;
	}
}