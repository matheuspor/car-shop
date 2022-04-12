import express, { Router } from 'express';
import connectToDatabase from './connection';
import CarRoutes from './routes/CarRoutes';

class App {
  public app: express.Application;

  protected CarRoutes: Router;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.CarRoutes = new CarRoutes().router;
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
    this.app.use(this.CarRoutes);
  }

  public getApp() {
    return this.app;
  }
}

export default App;