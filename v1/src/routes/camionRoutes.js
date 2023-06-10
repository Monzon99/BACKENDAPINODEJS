const {Router} = require('express');
const router = Router();
const _ = require('underscore');
const controller = require('../controllers/camionController');


//METHOD GET
/**
 * @openapi
 * /api/camion:
 *   get:
 *     tags:
 *       - camiones
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a camion
 */
/**
 * @openapi
*   /api/camion/{uuid}:
*     get:
*       tags:
*         - camiones
*       parameters:
*         - in: path
*           name: uuid
*           required: true
*           schema:
*               type: string
*               format: uuid
*           description: El uuid del camión a obtener.
*/

router.get('/',controller.getAllCamiones);  //SE OBTIENEN TODOS LOS CAMIONES EN LA DB
router.get('/:uuid',controller.getCamionByUuid);    //SE OBTIENE SOLO UN CAMION EN ESPECIFICO

//METHOD POST
/**
 * @openapi
*   /api/camion:
*     post:
*       tags:
*         - camiones
*/

router.post('/',controller.createCamion);   //SE GUARDA UN NUEVO CAMION

//METHOD PUT
/**
 * @openapi
*   /api/camion:
*     put:
*       tags:
*         - camiones
*/
router.put('/',controller.updateCamion);    //SE ACTUALIZA UN CAMION EN ESPECIFICO

//METHOD DELETE
/**
 * @openapi
*   /api/camion:
*     delete:
*       tags:
*         - camiones
*/
router.delete('/:uuid',controller.deleteCamion);    //SE ELIMINA UN CAMION EN ESPECIFICO

module.exports = router;