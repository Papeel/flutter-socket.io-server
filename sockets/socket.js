const { io } = require('../index');
const Band = require('../models/Band');
const Bands = require('../models/Bands');

const bands = new Bands();
console.log('Init server');

bands.addBand( new Band('Queen') );
bands.addBand( new Band('Bon Jovi') );
bands.addBand( new Band('Héroes del silencio') );
bands.addBand( new Band('ACDC') );


//Mensajes de SOckets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());
    client.on('disconnect', () => { console.log('cliente desconectado') });
    

    client.on('vote-band', (payload)=>{
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
    client.on('add-band', (payload)=>{
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });
    client.on('delete-band', (payload)=>{
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
    
});

