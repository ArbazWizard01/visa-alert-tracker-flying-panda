const Alert = require("../models/Alert");

exports.getAlerts = async (req, res, next) => {
  try {
    const { country, status } = req.query;

    const filter = {};

    if (country) filter.country = country;
    if (status) filter.status = status;

    const alerts = await Alert.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: alerts.length,
      data: alerts
    });
  } catch (error) {
    next(error);
  }
};

exports.createAlert = async (req, res, next) => {
  try {
    const { country, city, visaType, status } = req.body;

    if (!country || !city || !visaType) {
      res.status(400);
      throw new Error("Country, City and Visa Type are required");
    }

    const alert = await Alert.create({
      country,
      city,
      visaType,
      status
    });

    res.status(201).json({
      success: true,
      message: "Alert created successfully",
      data: alert
    });
  } catch (error) {
    next(error);
  }
};

exports.updateAlert = async (req, res, next) => {
  try {
    const {id} = req.params;
    const { status, city, visaType } = req.body;

    const updatedAlert = await Alert.findByIdAndUpdate(
      id,
      {
        status,
        city,
        visaType
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedAlert) {
      res.status(404);
      throw new Error("Alert not found");
    }

    res.status(200).json({
      success: true,
      message: "Alert updated successfully",
      data: updatedAlert
    });
  } catch (error) {
    next(error);
  }
};


exports.deleteAlert = async (req, res, next) => {
  try {
    const {id} = req.params;
    const deletedAlert = await Alert.findByIdAndDelete(id);

    if (!deletedAlert) {
      res.status(404);
      throw new Error("Alert not found");
    }

    res.status(200).json({
      success: true,
      message: "Alert deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};
