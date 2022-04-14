import express, { Router } from 'express';
import connectToDatabase from './connection';
import CarRoutes from './routes/CarRoutes';
import MotorcycleRoutes from './routes/MotorcycleRoutes';

class App {
  public app: express.Application;

  protected CarRoutes: Router;

  protected MotorcycleRoutes: Router;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.CarRoutes = new CarRoutes().router;
    this.MotorcycleRoutes = new MotorcycleRoutes().router;
    this.addRouter();
  }

  public startServer(PORT: string | number = 3001): void {
    connectToDatabase();
    this.app.listen(
      PORT,
      () => console.log(`Server running here 👉 http://localhost:${PORT}`),
    );
  }

  public addRouter() {
    this.app.use('/cars', this.CarRoutes);
    this.app.use('/motorcycles', this.MotorcycleRoutes);
  }

  public getApp() {
    return this.app;
  }
}

export default App;