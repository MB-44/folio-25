import { Object3DNode } from "@react-three/fiber";
import * as THREE from "three";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: Object3DNode<THREE.Object3D, typeof THREE.Object3D>;
    }
  }
}