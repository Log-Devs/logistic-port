declare module 'three/examples/jsm/controls/OrbitControls' {
	import { Camera, EventDispatcher, MOUSE, Object3D, Vector3 } from 'three';
	export class OrbitControls extends EventDispatcher {
		constructor(object: Camera, domElement?: HTMLElement);
		object: Camera;
		target: Vector3;
		// Add more type definitions as needed
	}
}
