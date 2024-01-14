import dbOperations from "../models/dbOperations.js";

export const createNewAppointmentService = async (
  clientId,
  productId,
  appointmentDate,
  comment
) => {
  // Insert the new appointment into the database
  return await dbOperations.insert("appointments", {
    client_id: clientId,
    product_id: productId,
    appointment_date: appointmentDate,
    comment,
  });
};

export const getAllAppointmentsForClientService = async (clientId) => {
  return await dbOperations.getAppointmentDetails(clientId);
};

export const getAllAppointmentsService = async () => {
  return await dbOperations.getAll("appointments");
};

export const getSingleAppointmentService = async (id) => {
  return await dbOperations.findBy("appointments", { id });
};

export const updateAppointmentService = async (
  appointmentId,
  productId,
  clientId,
  appointmentDate,
  comment
) => {
  return await dbOperations.updateById("appointments", appointmentId, {
    client_id: clientId,
    product_id: productId,
    appointment_date: appointmentDate,
    comment,
  });
};

export const setAppointmentAsCompletedService = async (appointmentId) => {
  return await dbOperations.updateById("appointments", appointmentId, {
    status: "done",
  });
};

export const deleteSingleAppointment = async (appointmentId) => {
  return await dbOperations.deleteById("appointments", appointmentId);
};
