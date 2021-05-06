const fs = require('fs');
const { Router } = require('express');
const router = Router();

const json_contactos= fs.readFileSync('src/contactos.json', 'utf-8')
const contactos = JSON.parse(json_contactos);

router.get('/' ,(req,res) => {
    res.render('index.ejs', {contactos})
  });

  router.post('/', (req, res) => {
    
    const { nombre, apellido, correo, mensaje } = req.body;
  
    if (!nombre || !apellido || !correo|| !mensaje) {
      res.status(400).send("Entries must have a title and body");
      return;
    }
  
    let newContacto = {
      nombre,
      apellido,
      correo,
      mensaje
    };

   contactos.push(newContacto);

   const json_contactos = JSON.stringify(contactos);
   fs.writeFileSync('src/contactos.json', json_contactos, 'utf-8');

   res.redirect('/');
});

module.exports = router;