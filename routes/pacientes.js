var express = require('express');
var router = express.Router();
const { conexion } = require('../database/conexion.js')

//Listando todas las pacientes
router.get('/', function(req, res, next) {
  conexion.query('SELECT * FROM pacientes', (error, pacientes) => {
    if(error){
      res.status(500).send('Ocurrio un error' + error)
    } else {
      res.status(200).render('pacientes.hbs', {pacientes, opcion: 'disabled', activo: true})
    }
  })
});

//Insertar pacientes

router.get('/agregar', (req, res) => {
  res.status(200).sendFile('registro-pacientes.html', {root: 'public'})
})

router.post('/guardar-pacientes', (req, res) => {
  const id = req.body.id
  const nombre = req.body.nombre
  const edad = req.body.edad
  const telefono = req.body.telefono
  const especialidad = req.body.especialidad
  conexion.query(`INSERT INTO pacientes (id, nombre, edad, telefono, especialidad) VALUES (${id}, '${nombre}', ${edad}, ${telefono}, '${especialidad}')`, (error, resultado) => {
    if (error) {
      res.status(500).send('Ocurrio un error en la consulta'+ error)
    } else {
      res.status(200).redirect('/pacientes')
    }
  })
})


//Eliminando pacientes

router.get('/eliminar/:id', (req, res) => {
  const id = req.params.id
  conexion.query(`DELETE FROM pacientes WHERE id=${id}`, (error, resultado) => {
    if(error){
      res.status(500).send('Ocurrio un error en la consulta ' + error)
    } else {
      res.status(200).redirect('/pacientes')
    }
  })
})

//Actualizar pacientes

router.get('/activar', function(req, res, next) {
  conexion.query('SELECT * FROM pacientes', (error, pacientes) => {
    if(error){
      res.status(500).send('Ocurrio un error' + error)
    } else {
      res.status(200).render('pacientes.hbs', {pacientes, opcion: ''})
    }
  })
});

router.post('/actualizar/:id', (req, res) => {
  const id = req.params.id
  const nombre = req.body.nombre
  const edad = req.body.edad
  const telefono = req.body.telefono
  const especialidad = req.body.especialidad
  conexion.query(`UPDATE pacientes SET nombre='${nombre}', edad=${edad}, telefono=${telefono}, especialidad='${especialidad}'WHERE id=${id}`, (error, resultado) => {
    if (error) {
      res.status(500).send('Ocurrio un error en la ejecución ' + error)
    } else {
      res.status(200).redirect('/pacientes')
    }
  })
})

module.exports = router;