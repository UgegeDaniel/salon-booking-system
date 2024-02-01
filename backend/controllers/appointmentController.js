import { Router } from "express";
import {
  createNewAppointmentService,
  deleteSingleAppointment,
  getAllAppointmentsForClientService,
  getAllAppointmentsService,
  getSingleAppointmentService,
  setAppointmentAsCompletedService,
  updateAppointmentService,
} from "../services/appointmentService.js";
import verifyAuthToken from "../middlewares/authmiddleware.js";
import {
  allowAdminAccessOnly,
  allowAdminAndClientAccess,
} from "../middlewares/accessControlMiddleware.js";

const router = Router();

// Create Appointment
// Admin and Client Access
router.post(
  "/create-appointment",
  verifyAuthToken,
  allowAdminAndClientAccess,
  async (req, res) => {
    try {
      const { productId, appointment_date, comment } = req.body;
      const clientId = req.user.userId;
      // Validate input
      if (!productId || !appointment_date) {
        return res.status(400).json({
          success: false,
          message: "Please provide a service and appointment date.",
        });
      }
      const newAppointment = createNewAppointmentService(
        clientId,
        productId,
        appointment_date,
        comment
      );
      res.status(201).json({
        success: true,
        appointment: newAppointment,
        message: "Appointment created successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Read All Appointments for a User
// Admin and Client Access
router.get(
  "/appointments",
  verifyAuthToken,
  allowAdminAndClientAccess,
  async (req, res) => {
    try {
      const clientId = req.user.userId;
      const appointments = await getAllAppointmentsForClientService(clientId);
      console.log({ appointments });
      res
        .status(200)
        .json({
          success: true,
          appointments,
          message: "Appointments fetched successfully.",
        });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Read All Appointments
// Admin
router.get(
  "/all-appointments",
  verifyAuthToken,
  allowAdminAccessOnly,
  async (req, res) => {
    try {
      const appointments = await getAllAppointmentsService();
      res.status(200).json({ appointments });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Read Single Appointment by ID
// Admin and Client Access
router.get(
  "/appointments/:appointmentId",
  verifyAuthToken,
  allowAdminAndClientAccess,
  async (req, res) => {
    const { appointmentId } = req.params;
    try {
      const appointment = await getSingleAppointmentService(appointmentId);
      if (!appointment) {
        return res
          .status(404)
          .json({ success: false, message: "Appointment not found." });
      }
      res.status(200).json({ success: true, appointment });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

// Update Appointment by ID
// Admin and Client Access
router.put(
  "/update-appointment/:appointmentId",
  verifyAuthToken,
  allowAdminAndClientAccess,
  async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const { productId, appointmentDate, comment } = req.body;
      const clientId = req.user.userId;
      if (!productId || !appointmentDate) {
        return res.status(400).json({
          success: false,
          message: "Please provide a service and appointment date.",
        });
      }
      const appointment = await getSingleAppointmentService(appointmentId);
      if (!appointment) {
        return res
          .status(404)
          .json({ success: false, message: "Appointment not found." });
      }
      const updatedAppointment = await updateAppointmentService(
        appointmentId,
        productId,
        clientId,
        appointmentDate,
        comment
      );
      res.status(200).json({
        success: true,

        appointment: updatedAppointment,
        message: "Appointment updated successfully.",
      });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

// Update Appointment by ID
// Admin Access
router.put(
  "/completed-appointment/:appointmentId",
  verifyAuthToken,
  allowAdminAccessOnly,
  async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const appointment = await getSingleAppointmentService(appointmentId);
      if (!appointment) {
        return res
          .status(404)
          .json({ success: false, message: "Appointment not found." });
      }
      const updatedAppointment = await setAppointmentAsCompletedService(
        appointmentId
      );
      res.status(200).json({
        success: true,

        appointment: updatedAppointment,
        message: "Appointment updated successfully.",
      });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

// Delete Appointment by ID
// Admin and Client Access
router.delete(
  "/delete-appointment/:appointmentId",
  verifyAuthToken,
  allowAdminAndClientAccess,
  async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const appointment = await getSingleAppointmentService(appointmentId);
      if (!appointment) {
        return res
          .status(404)
          .json({ success: false, message: "Appointment not found." });
      }
      const deletedAppointment = await deleteSingleAppointment(appointmentId);
      res.status(200).json({
        success: true,

        appointment: deletedAppointment,
        message: "Appointment deleted successfully.",
      });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

export default router;
