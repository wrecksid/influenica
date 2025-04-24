import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createServer } from 'http';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import bodyParser from 'body-parser';
import cors from 'cors';
import typeDefs from './graphql/schema/index.js';
import resolvers from './graphql/resolvers/index.js';
import { connect } from 'mongoose';
import service from './models/service.js';
import { verify } from 'jsonwebtoken';
import { graphqlUploadExpress } from 'graphql-upload';
import cookieParser from 'cookie-parser'; 
// const Razorpay = require("razorpay");
import Razorpay from "razorpay"

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

const corsOption = {
  origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'], 
};

app.use(cors(corsOption));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

// mongodb+srv://prashantkumar010704:DF1BVkeFJKihToqO@cluster0.sz4kf9w.mongodb.net/

const db=connect(`mongodb+srv://
${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PW}
@cluster0.sz4kf9w.mongodb.net/${process.env.MONGO_ATLAS_DB}?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.log(err);
  });

const corsOptions = {
  origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
  credentials: true,
};

await server.start();

app.use(
  '/graphql',
  cookieParser(),
  cors(corsOptions),
  graphqlUploadExpress({
    maxFileSize: 2000000, // 1 MB
    maxFiles: 20,
  }),
  bodyParser.json(),
  expressMiddleware(server, {
    context: ({ req }) => {
      const token = req.cookies.token; // Get the token value from the 'token' cookie

      if (!token) {
        req.isAuth = false;
        console.log('No token');
        return {
          isAuth: false,
        }
      }

      let decodedToken;
      try {
        decodedToken = verify(token, process.env.JWT_KEY);
      } catch (err) {
        req.isAuth = false;
        console.log('Invalid token');
        return {
          isAuth: false,
        }
      }

      if (!decodedToken) {
        req.isAuth = false;
        console.log('Invalid token');
        return {
          isAuth: false,
        }
      }

      console.log('Valid token');

      return {
        isAuth: true,
        userId: decodedToken.userId,
      }
    } // Retrieve token from req.cookies
  }),
);

app.delete("/service/:id", async (req, res) => {
  const id = req.params.id;
  // const query = { _id: new ObjectId(id) };
  // const result = await services.deleteOne(query);
  const result = await service.findByIdAndDelete(id);
  res.send(result);
});


app.put('/service-edit/:id', async (req, res) => {

  const id = req.params.id;
  
  // console.log(req.body);
  const youtubelink = req.body.service_youtubelink;
  const xlink = req.body.service_xlink;
  const instalink = req.body.service_instalink;
  const about = req.body.service_about;
  const title = req.body.service_title;
  const description = req.body.service_description;
  const price = req.body.service_price;

  try {
    const updatedService = await service.findByIdAndUpdate(id, { title, about, description, youtubelink,xlink,instalink, price}, { new: true });
    res.send(updatedService);
  } catch (error) {
    res.status(500).send({ error: 'Error updating service' });
  }
});

// app.post("/orderpaymentrazor", async (req, res) => {
//   try {
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_SECRET,
//     });

//     const options = req.body;
//     const order = await razorpay.orders.create(options);

//     if (!order) {
//       return res.status(500).send("Error");
//     }

//     res.json(order);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error");
//   }
// });

// app.post("/order/validate", async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;

//   const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
//   //order_id + "|" + razorpay_payment_id
//   sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//   const digest = sha.digest("hex");
//   if (digest !== razorpay_signature) {
//     return res.status(400).json({ msg: "Transaction is not legit!" });
//   }

//   res.json({
//     msg: "success",
//     orderId: razorpay_order_id,
//     paymentId: razorpay_payment_id,
//   });
// });


const PORT = 4000;

httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});