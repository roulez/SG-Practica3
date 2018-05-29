
/// The Ground class
/**
 * @author Alexandra-Diana Dumitru 
 * @author José Manuel Pérez Carrasco
 */

class Ground extends THREE.Object3D {

  /*******************************************************************************************************************************************************************/
  //Constructor del suelo

  constructor (aWidth, aDeep, aMaterial) {
    super();
    
    this.width = aWidth;
    this.deep = aDeep;
    this.material = aMaterial;
    
    this.ground = null;
    
    this.ground = new THREE.Mesh ( new THREE.BoxGeometry (this.width, 0.2, this.deep, 1, 1, 1), this.material);
    this.ground.applyMatrix (new THREE.Matrix4().makeTranslation (0,-0.1,0));
    this.ground.receiveShadow = true;
    this.ground.autoUpdateMatrix = false;
    this.add (this.ground);
    
  }
}
