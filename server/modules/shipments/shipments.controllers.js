import { generateTracking } from '../../utils/generatTrackCode.js';
import { status } from '../../utils/statusShipments.js';
import shipmentsDal from './shipments.dal.js';
import crypto from 'crypto';

class ShipmentControllers {
  createShipment = async (req, res) => {
    try {
      const {
        origin_address,
        destination_address,
        phone_number,
        weight,
        location,
        notes,
      } = req.body;

      const { user_id } = req;

      const shipmentData = {
        origin_address,
        destination_address,
        phone_number,
        weight,
        status: status.CREATED,
        trackingCode: generateTracking(),
        UUID: crypto.randomUUID(),
        location,
        notes,
        user_id,
      };

      await shipmentsDal.createShipment(shipmentData);

      res.status(200).json({
        message: 'Envío creado correctamente',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error de server',
        dataError: error,
      });
    }
  };

  createShipmetEvent = async (req, res) => {
    try {
      const { user_id } = req;
      const { location, notes } = req.body;

      let values = [location, notes, user_id];
      console.log(values);
    } catch (error) {
      res.status(500).json({
        message: 'Error de server',
        dataError: error,
      });
    }
  };

  getShipments = async (req, res) => {
    try {
        const shipments = await shipmentsDal.getShipments();

        res.status(200).json({
            shipments,
            message:"Datos obtenidos"
        })

    } catch (error) {
        res.status(500).json({
            message: 'Error de server',
            dataError: error,
          });
    }
  }
}

export default new ShipmentControllers();
