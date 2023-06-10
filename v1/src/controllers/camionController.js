const { v4: uuidv4 } = require('uuid');
const db = require('../database/db');

let dbCamion = db.collection('camion');

const getAllCamiones = async (req,res) => {
    try{
        const listadoCamiones = [];
        
        const dataDb = await dbCamion
                                .get()
                                .then((querySnapshot) => {
                                    if(!querySnapshot.empty){
                                        querySnapshot.forEach((documento) => {
                                            listadoCamiones.push(documento.data());
                                        });
                                        res.status(200).json({
                                            response : true,
                                            messaje : `listado encontrado`,
                                            result : listadoCamiones,
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

const getCamionByUuid = async (req,res) => {
    try{
        const uuidCamion = req.params.uuid;
            
            const dataDb = 
                await dbCamion
                        .doc(uuidCamion)
                        .get()
                        .then((camion) => {
                            if(camion.exists){
                                res.status(200).json({
                                    response : true,
                                    messaje : `camion encontrado`,
                                    result : camion.data(),
                                    code : 200
                                });
                            }else{
                                res.status(404).json({
                                    response : false,
                                    messaje : `camion no encontrado`,
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

const createCamion = async (req,res) => {
    try
    {
        const newCamion ={ uuid,modelo,placa,marca,urlFoto,fechaCompra,fechaCreacion,fechaModificacion} = req.body;
        newCamion.uuid = uuidv4();

        await dbCamion
            .doc(newCamion.uuid)
            .set(newCamion)
            .then(() => {
                res.json({
                    response : true,
                    messaje : `Camion con placa ${newCamion.placa} ha sido insertado correctamente`,
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

const updateCamion = async (req,res) => {
    try
    {
        const camionToUpdate = dbCamion.doc(req.body.uuid);
        const Camion ={ uuid,placa,marca,fechaCompra,fechaRegistro} = req.body;

        await camionToUpdate
            .set(Camion)
            .then(() => {
                res.json({
                    response : true,
                    messaje : `Camion con placa ${Camion.placa} ha sido actualizado correctamente`,
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

const deleteCamion = async (req,res) => {
    try{
        const uuidCamion = req.params.uuid;
        const camionToDelete = dbCamion.doc(uuidCamion);

        await camionToDelete
            .delete()
            .then(() => {
                res.json({
                    response : true,
                    messaje : `Camion eliminado correctamente`,
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
    getAllCamiones ,
    getCamionByUuid,
    createCamion,
    updateCamion,
    deleteCamion
};