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


