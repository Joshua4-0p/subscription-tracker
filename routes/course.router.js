import { Router } from "express";
import { json } from "express";
import Joi from "joi";

const courseRouter = Router();
courseRouter.use(json())

const courses = [
  { id: 1, name: "Math" },
  { id: 2, name: "Biology" },
  { id: 3, name: "Chemistry" },
  { id: 4, name: "Physics" },
];

courseRouter.get('/', (req, res) => {
    res.send(courses)
})
courseRouter.get("/:id", (req, res) => {
  /*the parseInt is to return or consider the output of the req.params.id as an integer
    find() is a method use on arrays in js to search the array and find the arrayelement 
    matching what was entered in the brackets 
    */
  const course = courses.find((item) => item.id === parseInt(req.params.id));//item represents each element of the array when being looped through
  if (!course)
    res.status(404).send("No course was found on this specified ID");
    
    res.send(course);
    
});

courseRouter.post('/', (req, res) => {
    const newCourse = {
      //this specifies that the user will enter a parameter which will be considered as the name in the body and stored as variable name
      id: courses.length + 1,
      name: req.body.name, //to use this we'll need to import the express middleware that permits use to input variable as JSON format
    };
    //input validation using Joi

    const schema = Joi.object({//defining the schema of the object to be validated in object format
        name: Joi.string().alphanum().min(3).max(30).required()
    })
    /*when the result is console.log you'll realise that the validation has 2 parameters
    the error and the value 
    */
    const { error, value } = schema.validate(req.body)//this validate the req.body against the schema defined
    console.log(error, value)
    if (error) {
        /*the response message of Joi as seen in postman give an error that is not
        understandable by the user so we need to filter out the important message from the 
        details array of object 
        */
        return res.status(400).send(error.details[0].message)//400-bad request
    }

    courses.push(newCourse)//put the new course to the array courses
    res.send(newCourse)//to display the user the course he just pushed
})

courseRouter.put('/:id', (req, res) => {
    //step1: Check if the specified course available
    let course = courses.find((item) => item.id === parseInt(req.params.id))
    if (!course) {
        return res.status(404).send("Course not found")
    }

    //step2: perform the changes and validate the changes are correct
    //mtd1
    course.name = req.body.name
    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(30)
    })
    const { error, value } = schema.validate(req.body)
    console.log(error, value)
    if (error) {
        return res.status(400).send(error)
    }

    //if the validation is correct we now update the course
    return res.send(course)
})

courseRouter.delete('/:id', (req, res) => {
    //step1: find if the course is available
    const course = courses.find((item) => item.id === parseInt(req.params.id));
    if (!course) {
      return res.status(404).send("Course not found");
    }

  //find if the course is in the array based on the name and delete it
  courses.splice(courses.indexOf(course), 1);//indexOf(course) is used to get the index of the course you want to delete 
  //return available courses
  res.send(courses)
    
})

export default courseRouter

