
/// The Robot class
/**
 * @author Alexandra-Diana Dumitru 
 * @author José Manuel Pérez Carrasco
 */



class Objetos extends THREE.Object3D {
  
  constructor (parameters) {
    super();
    this.objetos = null;
    this.obj1 = null;
    this.obj2 = null;
    this.obj3 = null;
    this.obj4 = null;
    this.obj5 = null;

    var loaderMarco = new THREE.TextureLoader();
    var texturaMarco = loaderMarco.load("imgs/dorado.jpg");
    this.materialMarco = new THREE.MeshPhongMaterial({map: texturaMarco});

    this.objetos = this.createObjetos();
    this.add(this.objetos);
  }

 
  /************************************************************************************************************************************************/
  /************************************************************************************************************************************************/

  createObjetos(){
    this.objetos = new THREE.Mesh();
    this.obj1 = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), this.materialMarco);
    this.obj1.position.set(-23, 15, -30);
    this.obj2 = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), this.materialMarco);
    this.obj2.position.set(40, 15, -7);
    this.obj3 = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), this.materialMarco);
    this.obj3.position.set(25, 15, -70);
    this.obj4 = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), this.materialMarco);
    this.obj4.position.set(-95, 15, -2);
    this.obj5 = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), this.materialMarco);
    this.obj5.position.set(-7, 15, 45);

    this.objetos.add(this.obj1);
    this.objetos.add(this.obj2);
    this.objetos.add(this.obj3);
    this.objetos.add(this.obj4);
    this.objetos.add(this.obj5);
    return this.objetos;
  }
}

// class variables
Casa.WORLD = 0;
Casa.LOCAL = 1;
