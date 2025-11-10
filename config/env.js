import {config} from 'dotenv'

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` }); //NODE_ENV found in node modules(that's if it exist) .local refers to the env.development.local file

/*IF you have just one env this is how you're to specify the route to your env
config({path:'env'});

export const {PORT} = process.env //meaning it is coming from the 

*/

/* the goal for use putting the env in the `` there's is not just one env file 
there will two that is the development env and the production env and the default
is the development
- THis ease the switch between the production and development env without overriding each other
*/

export const { PORT, NODE_ENV, MONGO_URI } = process.env; //process.env just means the env value is tied to the port variable


