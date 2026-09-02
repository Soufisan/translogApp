import executeQuery from '../../config/db.js';

class ShipmentDal {
  createShipment = async (shipmentData) => {
    try {
      const {
        origin_address,
        destination_address,
        phone_number,
        weight,
        status,
        trackingCode,
        UUID,
        location,
        notes,
        user_id,
      } = shipmentData;

      let values = [
        origin_address,
        destination_address,
        phone_number,
        weight,
        status,
        trackingCode,
        UUID,
      ];

      let values2 = [location, notes, user_id, status, UUID];

      let sql = `
                INSERT INTO shipment (
                origin_address,
                destination_address,
                phone_number,
                weight,
                type_status,
                tracking_code,
                shipment_id
                ) VALUES (?,?,?,?,?,?,?)
            `;
      await executeQuery(sql, values);
      let sql2 = `
                INSERT INTO shipment_event (
                location, 
                notes, 
                user_id, 
                type_status, 
                shipment_id
                ) VALUES (?,?,?,?,?)
            `;

      await executeQuery(sql2, values2);
    } catch (error) {
      throw error;
    }
  };

  getShipments = async () => {
    try {
        let sql = `
            SELECT *
            FROM shipment
        `
        const result = await executeQuery(sql)
        console.log(result)

        return result;

    } catch (error) {
        throw error
    }
  }
}

export default new ShipmentDal();
