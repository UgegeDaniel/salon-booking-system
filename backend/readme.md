

| Route                             | Access Type     | Description                                             |
|-----------------------------------|-----------------|---------------------------------------------------------|

User
| POST /sign-up                     | General         | Create User (Sign Up)                                   |
| POST /log-in                      | General         | Log in User (Sign In)                                   |
| GET /clients                      | Admin           | Read All Clients                                        |
| PUT /update-user                  | Admin and Client| Update User by ID                                       |
| DELETE /delete-user/:userId       | Admin           | Delete User by ID                                       |

Appointments
| POST /create-appointment              | Admin and Client| Create Appointment                                      |
| GET /appointments                     | Admin and Client| Read All Appointments for a User                         |
| GET /all-appointments                 | Admin           | Read All Appointments                                   |
| GET /appointments/:appointmentId      | Admin and Client| Read Single Appointment by ID                            |
| PUT /update-appointment/:appointmentId| Admin and Client| Update Appointment by ID                                |
| PUT /completed-appointment/:appointmentId | Admin        | Update Appointment by ID (Set as Completed)              |
| DELETE /delete-appointment/:appointmentId | Admin and Client | Delete Appointment by ID                           |

Product
| POST /create-product                  | Admin           | Create Product                                          |
| GET /products                         | Admin and Client| Read All Products                                       |
| GET /products/:productId              | Admin and Client| Read Single Product by ID                                |
| PUT /update-product/:productId        | Admin           | Update Product by ID                                    |
| DELETE /delete-product/:productId     | Admin           | Delete Product by ID                                    |