# Aplicación JS de ejemplo

* Esta Aplicación es solo de referencia
* La libreria utilizada es https://github.com/FHIR/fhir.js

## Archivo main.js

*Configuración

``` js
var server = 'base del servidor';
var fhir = fhir({
    baseUrl: server
})
```

* Búsqueda

``` js
  fhir.search({type: 'Patient', query: {_count: 100}})
    .then(function(bundle){
      //Implemente su función aqui
      console.log(bundle)
      }
      // FIN Código de ejemplo
  });
```

* Creación

``` js
	  var entry = {
	    category: [],
	    resource: {
		    resourceType: 'Patient',
		    //...
		  }
	  }
    fhir.create(entry)
    .then((res) => {
      //Implemente su función aqui
      console.log(res)
    })
```

* Eliminar


``` js
	var _id='id del paciente'
  fhir.delete({type: "Patient",id: _id})
    .then((res) => {
      //Implemente su función aqui
      console.log(res)
    })
    .catch(function(res){
    });
```
