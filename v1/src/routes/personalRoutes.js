const {Router} = require('express');
const router = Router();
const _ = require('underscore');
const controller = require('../controllers/personalController');

/**
 * @openapi
 * /api/personal:
 *   get:
 *     tags:
 *       - personal
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

//METHOD GET
router.get('/',controller.getAllPersonal);  //SE OBTIENEN TODO EL PERSONAL DE LA DB
router.get('/:uuid',controller.getPersonalByUuid);    //SE OBTIENE SOLO UN PERSONAL EN ESPECIFICO

//METHOD POST
router.post('/',controller.createPersonal);   //SE GUARDA UN NUEVO PERSONAL

//METHOD PUT
router.put('/',controller.updatePersonal);    //SE ACTUALIZA UN PERSONAL EN ESPECIFICO

//METHOD DELETE
router.delete('/:uuid',controller.deletePersonal);    //SE ELIMINA UN PERSONAL EN ESPECIFICO

module.exports = router;