
// Confuguracion del servidor FHIR
var server = 'https://fhir.udec.cl/baseR4';
var fhir = fhir({
    baseUrl: server
})
// Tabla de Resultados
var table;
$(document).ready( function () {
  table = $('#myTable').DataTable();
  loadData();
});

// Esqueleto de paciente de ejemplo
var patient_base = {
  "resourceType": "Patient",
  "identifier": [
    {
      "use": "usual",
      "type": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
            "code": "MR"
          }
        ]
      },
      "system": "urn:oid:1.2.36.146.595.217.0.1",
      "value": "26280379-1",
      "period": {
        "start": "2001-05-06"
      },
      "assigner": {
        "display": "Acme Healthcare"
      }
    }
  ],
  "active": true,
  "name": [
    {
      "use": "official",
      "family": "",
      "given": [
      ],
      "text": ""
    }
  ],
  "telecom": [
    {
      "use": "home"
    },
    {
      "system": "phone",
      "value": "56978773819",
      "use": "work",
      "rank": 1
    }
  ],
  "gender": "male",
  "birthDate": "1974-12-25",
  "_birthDate": {
    "extension": [
      {
        "url": "http://hl7.org/fhir/StructureDefinition/patient-birthTime",
        "valueDateTime": "1974-12-25T14:35:45-05:00"
      }
    ]
  },
  "address": [
    {
      "use": "home",
      "type": "both",
      "text": "534 Erewhon St PeasantVille, Rainbow, Vic  3999",
      "line": [
        "534 Erewhon St"
      ],
      "city": "PleasantVille",
      "district": "Rainbow",
      "state": "Vic",
      "postalCode": "3999",
      "period": {
        "start": "1974-12-25"
      }
    }
  ]
}

//Función cuando se presione Cread
$( "#target" ).submit(function( event ) {
  event.preventDefault();
  patient_base.name[0].given[0]=$( "#patient-first" ).val();
  patient_base.name[0].family=$( "#patient-last" ).val();
  patient_base.name[0].text=$( "#patient-first" ).val() + " " + $( "#patient-last" ).val();
  var entry = {
    category: [],
    resource: patient_base
  }
  create(entry);
});

//Funcion para crear un paciente utilizando la libreria FHIR.js
//https://github.com/FHIR/fhir.js
function create(entry){
    fhir.create(entry)
    .then((res) => {
      //Implemente su función aqui
      console.log(res)



      // INICIO Código de ejemplo
      var url = server + "/Patient/" + res.data.id;
      $("#id").text(res.data.id)
      $("#name").text(res.data.name[0].text)
      $("#url").text(url)
      $("#url").attr('href', url)
      $("#result").show();
      // FIN Código de ejemplo
    })
    // INICIO Código de ejemplo
    loadData();
    // FIN Código de ejemplo
}
//Funcion para eliminar un paciente utilizando la libreria FHIR.js
//https://github.com/FHIR/fhir.js
function remove(_id){
  fhir.delete({type: "Patient",id: _id})
    .then((res) => {
      //Implemente su función aqui
      console.log(res)
      // INICIO Código de ejemplo
      loadData()
      // FIN Código de ejemplo

    })
    .catch(function(res){
        //Error responses
        if (res.status){
            console.log('Error', res.status);
        }

        //Errors
        if (res.message){
            console.log('Error', res.message);
        }
    });
}
//Funcion para caragr los pacientes utilizando la libreria FHIR.js
//https://github.com/FHIR/fhir.js
//la variable "_count" es para indicar la cantidad de reusltados que se requieren 
function loadData(){
  table.clear().draw();
  fhir.search({type: 'Patient', query: {_count: 100}})
    .then(function(bundle){
      //Implemente su función aqui
      console.log(bundle)
      


      // INICIO Código de ejemplo
      for (var i = 0; i <bundle.data.entry.length; i++) {
        table.row.add([
          bundle.data.entry[i].resource.id,
          bundle.data.entry[i].resource.text.div,
          "<a href='"+bundle.data.entry[i].fullUrl+"'>"+bundle.data.entry[i].fullUrl+"</a>",
          "<button onclick='remove(`"+bundle.data.entry[i].resource.id +"`)'>Eliminar</button>",
        ]).draw( false );
      }
      // FIN Código de ejemplo
  });
}