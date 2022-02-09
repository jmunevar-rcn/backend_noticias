const express = require('express');
const router = express.Router();

const pool = require('../database');

/*********** PETICIONES GET DESDE URL PARA PINTADO ****************/

router.get('/add', (req, res) => {
    res.render('links/add');     
})
router.get('/add-user', (req, res) => {
    res.render('links/add-user');
})
router.post('/add', (req, res) => {
    res.send('Resivido');     
})

router.get('/add-seccion', (req, res) => {
    res.render('links/add-seccion');
})

router.get('/add-notas', async (req, res) => {
    const links = await pool.query('SELECT * FROM secciones ');
    const user = await pool.query('SELECT * FROM users');
    var items = {};
    var items1 = {};
    var sel = links.map(function(item, key) {
        items = '<option value="'+item.id_secc+'">'+item.titulo_secc+'</option>';
        return items;
    });
    var sel1 = user.map(function(item, key){
        items1 = '<option value="'+item.id_usr+'">'+item.fullname+'</option>';
        return items1;
    });
    const selectores = {
        sel,
        sel1
    }
        
    res.render('links/add-notas', {link: selectores});    
})

/******************** PETICIONES POST POR ACCOINES ************/

router.post('/add-user', async(req, res) => {
    const { username, password, fullname } = req.body;
    const newUser = {
        username,
        password,
        fullname
    };
    //console.log(newSeccion);
    await pool.query('INSERT INTO users set ?', [newUser]);
    res.send('Recibido');  
})

router.post('/add-seccion', async(req, res) => {
    const { titulo_secc } = req.body;
    const newSeccion = {
        titulo_secc	
    };
    console.log(newSeccion);
    await pool.query('INSERT INTO secciones set ?', [newSeccion]);
    res.send('Recibido');  
})



router.post('/add-notas', async(req, res) => {
    const { titulo, imagen, body, users_id, titulo_seccion, sumary } = req.body;
    const newNota = {
        titulo, imagen, body, users_id, titulo_seccion, sumary
    };
    await pool.query('INSERT INTO contenidos set ?', [newNota]);
    res.render("links/add-notas");
})

/***************** PETICIONES GET PARA RESPUESTA API ****************/

router.get('/seccion/:seccion', async (req, res) => {
    const { seccion } = req.params;
    const idSeccion = await pool.query('SELECT id_secc FROM secciones WHERE titulo_secc =  ?', [seccion] );
    const dataSeccion = await pool.query('SELECT * FROM contenidos WHERE titulo_seccion =  ?', idSeccion[0].id_secc );
    
    console.log(dataSeccion);
    
    res.send(dataSeccion);   
})

router.get('/detalle/:id', async (req, res) => {
    const { id } = req.params;
    const dataDetalle = await pool.query('SELECT * FROM contenidos WHERE id_cont = ?', [id]);
    console.log(id);
    res.send(dataDetalle);
})

router.get('/home', async (req, res) => {
    const { id } = req.params;
    const dataHome = await pool.query('SELECT * FROM contenidos',);
    //console.log(iconsoled);
    res.send(dataHome);
})


module.exports = router;