const { v4: uuidv4 } = require('uuid');
const db = require('../database/db');

let dbPersonal = db.collection('personal');

const getAllPersonal = async (req,res) => {
    try{
        const listadoPersoanl = [];
        
        const dataDb = await dbPersonal
                                .get()
                                .then((querySnapshot) => {
                                    if(!querySnapshot.empty){
                                        querySnapshot.forEach((documento) => {
                                            listadoPersoanl.push(documento.data());
                                        });
                                        res.status(200).json({
                                            response : true,
                                            messaje : `listado encontrado`,
                                            result : listadoPersoanl,
                                            code : 200
                                        });
                                    }else{
                                        res.status(404).json({
                                            response : false,
                                            messaje : `listado no encontrado`,
                                            result : null,
                                            code : 404
                                        });
                                    }
                                })
                                .catch((error) => {
                                    res.status(404).json({
                                        response : false,
                                        messaje : `${error}`,
                                        result : null,
                                        code : 404
                                    });
                                });
    }catch(error){
        res.status(500).json({
            response : false,
            messaje : `${error}`,
            result : null,
            code : 500
        });
    }
};

const getPersonalByUuid = async (req,res) => {
    try{
        const uuidPersonal = req.params.uuid;
            
            const dataDb = 
                await dbPersonal
                        .doc(uuidPersonal)
                        .get()
                        .then((personal) => {
                            if(personal.exists){
                                res.status(200).json({
                                    response : true,
                                    messaje : `personal encontrado`,
                                    result : personal.data(),
                                    code : 200
                                });
                            }else{
                                res.status(404).json({
                                    response : false,
                                    messaje : `personal no encontrado`,
                                    result : null,
                                    code : 404
                                });
                            }
                        })
    }catch(error){
        res.status(500).json({
            response : false,
            messaje : `${error}`,
            result : null,
            code : 500
        });
    }
}

const createPersonal = async (req,res) => {
    try
    {
        const newPersonal ={ uuid,
                            primerNombre,
                            segundoNombre,
                            primerApellido,
                            segundoApellido,
                            dpi,
                            edad,
                            genero,
                            fotoDpi,
                            foto,
                            uuidSueldo,
                            fechaContratacion,
                            fechadespidoRenuncia,
                            fechaCreacion,
                            fechaModificacion} = req.body;

        newPersonal.uuid = uuidv4();

        await dbPersonal
            .doc(newPersonal.uuid)
            .set(newPersonal)
            .then(() => {
                res.json({
                    response : true,
                    messaje : `Personal con DPI: ${newPersonal.dpi} ha sido insertado correctamente`,
                    result : null,
                    code : 200
                })
            })
            .catch((error) => {
                res.json({
                    response : false,
                    messaje : `${error}`,
                    result : null,
                    code : 500
                })
            })
    }catch(error){
        res.status(500).json({
            response : false,
            messaje : `${error}`,
            result : null,
            code : 500
        });
    }
}

const updatePersonal = async (req,res) => {
    try
    {
        const personalToUpdate = dbPersonal.doc(req.body.uuid);
        const Personal ={ uuid,
                            primerNombre,
                            segundoNombre,
                            primerApellido,
                            segundoApellido,
                            dpi,
                            edad,
                            genero,
                            fotoDpi,
                            foto,
                            uuidSueldo,
                            fechaContratacion,
                            fechadespidoRenuncia,
                            fechaCreacion,
                            fechaModificacion} = req.body;

        await personalToUpdate
            .set(Personal)
            .then(() => {
                res.json({
                    response : true,
                    messaje : `Personal con DPI: ${Personal.dpi} ha sido actualizado correctamente`,
                    code : 200
                })
            })
            .catch((error) => {
                res.json({
                    response : false,
                    messaje : `${error}`,
                    code : 500
                })
            })
    }catch(error){
        res.status(500).json({
            response : false,
            messaje : `${error}`,
            result : null,
            code : 500
        });
    }
}

const deletePersonal = async (req,res) => {
    try{
        const uuidPersonal = req.params.uuid;
        const personalToDelete = dbPersonal.doc(uuidPersonal);

        await personalToDelete
            .delete()
            .then(() => {
                res.json({
                    response : true,
                    messaje : `Personal eliminado correctamente`,
                    code : 200
                })
            })
            .catch((error) => {
                res.json({
                    response : false,
                    messaje : `${error}`,
                    code : 500
                })
            })
    }catch(error){
        res.json({
            response : false,
            messaje : `${error}`,
            code : 500
        })
    }
}

module.exports = {
    getAllPersonal ,
    getPersonalByUuid,
    createPersonal,
    updatePersonal,
    deletePersonal
};