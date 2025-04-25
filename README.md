# CS-465-Full-Stack-Development
CS-465 Full Stack Development with MEAN


## Architecture
The front-end web development was used with HTML formatting. Building each page used a template, written in HTML and using Express to deliver content to the webpage. 
The HTML basically formats the information that will delivered by NodeJS, using express as the framework to deliver static interactive content. Node is coded with JavaScript,
and acts as the controller between the model, database, and the view (HTML). Java script builds paths (url endpoints), and hands them off to the application to direct the flow of information
between pages and click listeners. The data is sent to and received from these paths (such as api/trips, which is delivered the trips collection to be formatted and presented in the view). It
can also be retrieved from these paths and passed to other parts of the program (such as /trips/tripCode, which returns a specific trip).

Meanwhile, the single-page application (SPA) that was built for the administrative purpose used a bootstrap for formatting the HTML. This allows a pleasant way of viewing the
features of control over the webpage (such as CRUD operations to trips). Angular was used to deliver a dynamic webpage, which consistently ran, awaiting to receive and deliver information.
It used a component-based, modular structure written in TypeScript, and relied on services, routers, and two-way databinding techniques to deliver content dynamically (upon click).

A NoSQL database was used because they offer a very flexible schema for data, which can be easily scaled without much (if any) restructuring. Furthermore, data-type variation is allowed in
NoSQL, meaning the data stored doesn't have to be structured (or can be loosely structured). Using a non-relational database is handy when data types are changing, different, or unknown.

## Functionality
While JavaScript delivers the data from the back-end to the front-end, JSON is what formats the data and allows it to be uniformally processed or parsed. JSON is essentially how data
objects are stored. It generally is build with key value pairs, but can also hold lists, sub keys and sub values, and can be built with different types of data (such as arrays or boolean values).
JavaScript delivers these JSON "objects" and formats them appropriately to the design of the web application. JSON is perfect for storing data because it is relatively easy to query as well.

Refactoring code is an important step for reusability and scalability. A specific instance in the fullstack developement was building the view of trips. It was initially built with each
individual trip formatting their data types (such as location, stay, price per person, description, ect.). So coding each destination had to be done for _each_ trip. With only 3 trips, that is surely fine. But when the trips grow in number, or change often (even simple details, let alone whole trips coming and going), the demand for attention grows incredibly. Instead, HandleBars was used to format each trip and then use a _for each_ loop within HTML. This can allow one line of code to process each member of the object and iterate each object (for example, this.name for each object). The benefits here are that information can be stored, removed, or recycled (rather than deleted or rebuilt).
Another interesting scenario occured with wrapping methods. For example, building an updateTrips method, and then wrapping it with a getUser method to ensure that the user was checked for privelege before accessing the update method. Instead of checkingin the method, a callback function was created to recall the method once the user was validated.
