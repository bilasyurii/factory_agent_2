import { Label } from "./label";

export class IterationLabel extends Label {
  constructor(scene: Scene) {
    super(scene, "Iteration: ", 1);
  }
}
