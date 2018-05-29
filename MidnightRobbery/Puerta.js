
/// The Robot class
/**
 * @author Alexandra-Diana Dumitru 
 * @author José Manuel Pérez Carrasco
 */



class Puerta extends THREE.Object3D {
  
  constructor (parameters) {
    super();
    this.puerta = null;
    this.puertaGirada = null;
    this.geometry = null;

    this.anguloPuerta = 0;

    var loaderMarco = new THREE.TextureLoader();
    var texturaMarco = loaderMarco.load("imgs/puerta2.jpg");
    this.materialMarco = new THREE.MeshPhongMaterial({map: texturaMarco});

    var loaderPuerta = new THREE.TextureLoader();
    var texturaPuerta = loaderPuerta.load("imgs/puerta.jpg");
    this.materialPuerta = new THREE.MeshPhongMaterial({map: texturaPuerta});
    

    this.puerta = this.createPuerta(0,0,0,0);
    this.add(this.puerta);
  }

 
  /************************************************************************************************************************************************/
  /************************************************************************************************************************************************/
  //ARQUITECTURA


  //PUERTA
  createMarcoPuerta(){
    var aux1 = new THREE.BoxGeometry(18, 30, 4);
    var aux2 = new THREE.BoxGeometry(14, 28, 4);

    aux1.applyMatrix(new THREE.Matrix4().makeTranslation(0,30/2,0));
    aux2.applyMatrix(new THREE.Matrix4().makeTranslation(0,28/2,0));

    var aux1BSP = new ThreeBSP(aux1);
    var aux2BSP = new ThreeBSP(aux2);

    var result = aux1BSP.subtract(aux2BSP);
  
    var marco = new THREE.Mesh(result.toGeometry(), this.materialMarco);
    marco.geometry.computeVertexNormals();
    marco.geometry.computeFaceNormals();
    marco.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(20/2-2,0,0));

    return marco;
  }

  createBasePuerta(){
    this.geometry = new THREE.BoxGeometry(16,28,2)
    var puerta = new THREE.Mesh(this.geometry, this.materialMarco);
    puerta.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(16/2,28/2,0));

    var pomoFuera = new THREE.Mesh();
    var pomoDentro = new THREE.Mesh();
        
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
            object.scale.x = 0.035;
            object.scale.z = 0.035;
            object.scale.y = 0.035;
            object.rotation.y = 180*Math.PI/180;
            object.position.y = 10;
            object.position.x = 13;
            object.position.z = 2;
            pomoFuera.add(object);
        });    

        var ObjLoader2 = new THREE.OBJLoader(); 

        ObjLoader2.setPath('recursos/');
        ObjLoader2.load('handler.obj', function (object) {
            object.traverse(function (child) {
                if(child instanceof THREE.Mesh)
                    child.material.map = texture;
            });
            object.scale.x = 0.035;
            object.scale.z = 0.035;
            object.scale.y = 0.035;
            object.position.y = 10;
            object.position.x = 13;
            object.position.z = -2;
            pomoDentro.add(object);
        });

    var pomos =  new THREE.Mesh(); 
    pomos.add(pomoFuera);
    pomos.add(pomoDentro);
    pomos.castShadow = true;
    pomos.autoUpdateMatrix = false;
  
    puerta.add(pomos);
    return puerta;
  }

  createPuertaGirada(angulo){
    this.puertaGirada = new THREE.Mesh();
    this.puertaGirada.rotation.y = angulo*Math.PI/180;

    this.puertaGirada.add(this.createBasePuerta());
    return this.puertaGirada;
  }

  createPuerta(angulo, x, y, z){
    this.puerta = new THREE.Mesh();
    this.puerta.position.set(x,y,z);
    
    this.puerta.add(this.createMarcoPuerta());
    this.puerta.add(this.createPuertaGirada(angulo));
    
    this.puerta.castShadow = true;
    this.puerta.autoUpdateMatrix = false;
    return this.puerta;

  }
  setAngle(alfa){
    this.anguloPuerta = alfa * Math.PI/180;
    this.puertaGirada.rotation.y = this.anguloPuerta;
  }
}

// class variables
Casa.WORLD = 0;
Casa.LOCAL = 1;
