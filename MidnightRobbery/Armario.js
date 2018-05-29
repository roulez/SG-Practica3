
/// The Robot class
/**
 * @author Alexandra-Diana Dumitru 
 * @author José Manuel Pérez Carrasco
 */



class Armario extends THREE.Object3D {
  
  constructor (parameters) {
    super();
    this.armario = null;
    this.puertaIzquierda= null;
    this.puertaDerecha = null;

    this.anguloPuertaIzquierda = 0;
    this.anguloPuertaDerecha = 0;

    var loaderMarco = new THREE.TextureLoader();
    var texturaMarco = loaderMarco.load("imgs/wood.jpg");
    this.materialMarco = new THREE.MeshPhongMaterial({map: texturaMarco});


    this.puerta = this.createArmario(45,45);
    this.add(this.puerta);
  }

 
  /************************************************************************************************************************************************/
  /************************************************************************************************************************************************/
  //ARQUITECTURA

  createPuertaIzquierda(){
    this.puertaIzquierda = new THREE.Mesh(new THREE.BoxGeometry(7, 18, 1), this.materialMarco);
    this.puertaIzquierda.position.x = -7/2;
    this.puertaIzquierda.position.y = 18/2;

    var pomo = new THREE.Mesh();
        
    //texture
    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
        
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/cobre.jpg", function(image) {
        texture.image = image;
        texture.needsUpdate = true;
    });
    var ObjLoader1 = new THREE.OBJLoader(); 

    ObjLoader1.setPath('recursos/');
    ObjLoader1.load('handler.obj', function (object) {
        object.traverse(function (child) {
        if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.scale.x = 0.02;
        object.scale.z = 0.02;
        object.scale.y = 0.02;
        object.rotation.y = 180*Math.PI/180;
        object.position.y = -1;
        object.position.x = -1;
        object.position.z = 1;
        pomo.add(object);
    });     

    this.puertaIzquierda.add(pomo);
    return this.puertaIzquierda;
  }

  createPuertaDerecha(){
    this.puertaDerecha = new THREE.Mesh(new THREE.BoxGeometry(7, 18, 1), this.materialMarco);
    this.puertaDerecha.position.x = 7/2;
    this.puertaDerecha.position.y = 18/2;

    var pomo = new THREE.Mesh();
        
    //texture
    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
        
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/cobre.jpg", function(image) {
        texture.image = image;
        texture.needsUpdate = true;
    });
    var ObjLoader1 = new THREE.OBJLoader(); 

    ObjLoader1.setPath('recursos/');
    ObjLoader1.load('handler.obj', function (object) {
        object.traverse(function (child) {
        if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.scale.x = 0.02;
        object.scale.z = 0.02;
        object.scale.y = 0.02;
        object.rotation.y = 180*Math.PI/180;
        object.position.y = -1;
        object.position.x = 1;
        object.position.z = 1;
        pomo.add(object);
    });     

    this.puertaDerecha.add(pomo);
    return this.puertaDerecha;
  }

  createPuertaDerechaGirada(angulo){
    this.puertaDerecha = this.createPuertaDerecha();
    this.puertaDerecha.rotation.y = -angulo*Math.PI/180;
    this.puertaDerecha.position.x = -16/2+7/2;
    this.puertaDerecha.position.z = angulo*Math.PI/180
    return this.puertaDerecha;
  }


  createPuertaIzquierdaGirada(angulo){
    this.puertaIzquierda = this.createPuertaIzquierda();
    this.puertaIzquierda.rotation.y = angulo*Math.PI/180;
    this.puertaIzquierda.position.x = 16/2-7/2;
    this.puertaIzquierda.position.z = angulo*Math.PI/180;
    return this.puertaIzquierda;
  }

  createArmarioBase(){
    var aux = new THREE.BoxGeometry(16, 20, 6);
    var aux2 = new THREE.BoxGeometry(14, 18, 4);
    aux2.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,2));

    var auxBSP = new ThreeBSP(aux);
    var aux2BSP = new ThreeBSP(aux2);
    
    var result = auxBSP.subtract(aux2BSP);

    var base = new THREE.Mesh(result.toGeometry(), this.materialMarco);
    base.geometry.computeVertexNormals();
    base.geometry.computeFaceNormals();
    base.position.y = 10;

    return base;
  }
  createArmario(anguloI, anguloD){
    this.armario = new THREE.Mesh();

    var base = this.createArmarioBase();
    var puertaI = this.createPuertaIzquierdaGirada(anguloI);
    puertaI.position.y = 20/2;
    puertaI.position.x = 4;
    puertaI.position.z = 3;
    var puertaD = this.createPuertaDerechaGirada(anguloD);
    puertaD.position.y = 20/2;
    puertaD.position.x = -4;
    puertaD.position.z = 3;

    this.armario.add(base);
    this.armario.add(puertaI);
    this.armario.add(puertaD);

    return this.armario;
  }

  setAnglePuertaI(alfa){
    this.anguloPuertaIzquierda = alfa * Math.PI/180;
    this.puertaIzquierda.rotation.y = this.anguloPuertaIzquierda;
  }
  setAnglePuertaD(alfa){
    this.anguloPuertaDerecha = alfa * Math.PI/180;
    this.puertaDerecha.rotation.y = this.anguloPuertaDerecha;
  }
}

// class variables
Casa.WORLD = 0;
Casa.LOCAL = 1;
