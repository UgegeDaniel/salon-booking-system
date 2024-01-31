### Base URL: `http://localhost:3001`

### User Controller:
1. **Create User (Sign Up)**:
   - Endpoint: `/user/sign-up`
   - Method: POST

2. **Log in User**:
   - Endpoint: `/user/log-in`
   - Method: POST

3. **Read All Clients** (Admin Access):
   - Endpoint: `/user/clients`
   - Method: GET

4. **Update User by ID** (Admin and Client Access):
   - Endpoint: `/user/update-user`
   - Method: PUT

5. **Delete User by ID** (Admin Access):
   - Endpoint: `/user/delete-user/:userId`
   - Method: DELETE

### Product Controller:
1. **Create Product** (Admin Access):
   - Endpoint: `/product/create-product`
   - Method: POST

2. **Read All Products** (Admin and Client Access):
   - Endpoint: `/product/products`
   - Method: GET

3. **Read Single Product by ID** (Admin and Client Access):
   - Endpoint: `/product/products/:productId`
   - Method: GET

4. **Update Product by ID** (Admin Access):
   - Endpoint: `/product/update-product/:productId`
   - Method: PUT

5. **Delete Product by ID** (Admin Access):
   - Endpoint: `/product/delete-product/:productId`
   - Method: DELETE

### Appointment Controller:
1. **Create Appointment** (Admin and Client Access):
   - Endpoint: `/appointment/create-appointment`
   - Method: POST

2. **Read All Appointments for a User** (Admin and Client Access):
   - Endpoint: `/appointment/appointments`
   - Method: GET

3. **Read All Appointments** (Admin Access):
   - Endpoint: `/appointment/all-appointments`
   - Method: GET

4. **Read Single Appointment by ID** (Admin and Client Access):
   - Endpoint: `/appointment/appointments/:appointmentId`
   - Method: GET

5. **Update Appointment by ID** (Admin and Client Access):
   - Endpoint: `/appointment/update-appointment/:appointmentId`
   - Method: PUT

6. **Update Appointment as Completed by ID** (Admin Access):
   - Endpoint: `/appointment/completed-appointment/:appointmentId`
   - Method: PUT

7. **Delete Appointment by ID** (Admin and Client Access):
   - Endpoint: `/appointment/delete-appointment/:appointmentId`
   - Method: DELETE