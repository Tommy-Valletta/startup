# startup
Startup program repository created for CS260 - Web Programming BYU Fall 2023
# GateKeeper
### Elevator Pitch

GateKeeper revolutionizes the way we interact with our environments by bridging the gap between outdated technology that lacks automation capabilities and expensive new technology that comes with a premium price tag for these features.  This web app empowers you to effortlessly control a versatile robot that flips switches and presses buttons, making automation accessible and affordable for everyone. Whether you're looking to modernize your home, streamline your routines, or secure your space, GateKeeper is a cost-effective solution that brings automation and remote control to the forefront, ensuring convenience and efficiency while addressing the limitations of old and expensive technology.

### Design
![Register Page](https://github.com/Tommy-Valletta/startup/blob/main/RegisterPage.jpg)
![Login Page](https://github.com/Tommy-Valletta/startup/blob/main/LoginPage.jpg)
![Main Page](https://github.com/Tommy-Valletta/startup/blob/main/MainPage.jpg)

### Key Features
- Secure Login over HTTPS
- Register with existing customer's gate code acts as authorization to control gate
- Linked Login/Register Pages
- Streamlined Control Page
- Gate Status displayed in realtime
- Access logs available (only to admins)
- Ability for admin to grant/revoke access

### Technologies
- **HTML** - Used for the structure of the three HTML pages.
- **CSS** - Styling and design
- **JavaScript** - Login, Register, and Operational functionality
- **Service** - Backend for:
  - Login
  - Sending Open Command
  - Retrieving gate Status
 
- **DB** - Stores Users along with their access codes
- **Login** - Register and login users. Credentials are stored, can't operate gate unless authorized by an auth token AND current access code
- **WebSocket** - When the gate is opened, a timestamped log is available to admins
- **React** - Application will be refactored with React
