import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({ title: 'GET all subscriptions' }));

subscriptionRouter.post('/', (req, res) =>
  res.send({ title: "CREATE a subscription" })
);
subscriptionRouter.get('/:id', (req, res) =>
  res.send({ title: "GET subscription details" })
);
subscriptionRouter.get('/users/:id', (req, res) => res.send({ title: 'GET all a user subscriptions' })); //getsubcription for a particular users

subscriptionRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE a subscription parameter' })); //edit subscription

subscriptionRouter.delete('/', (req, res) => res.send({ title: 'DELETE a subscriptions' }));

subscriptionRouter.put('/users/:id', (req, res) => res.send({ title: 'CANCEL  a subscription for a particular user' }));

subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "GET the upcoming renewals subscription" })
);

export default subscriptionRouter;