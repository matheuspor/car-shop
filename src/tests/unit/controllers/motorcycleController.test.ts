import { expect } from 'chai';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Sinon = require('sinon');
import MotorcycleController from '../../../controllers/Motorcycle';

describe('Tests Motorcycle Controller', () => {
  const motorcycleMock = {
    _id: '5e9f9c9f9c9f9c9f9c9f9c9',
    model: 'Yamaha',
    year: 2020,
    color: 'Preto',
    status: true,
    buyValue: 10000,
    category: "Street" as "Street",
    engineCapacity: 200,
  }

  describe('Tests Create', () => {

    describe('When is created successfully', () => {
      const motorcycleController = new MotorcycleController();

      const req = { body: motorcycleMock } as Request;
      const res = {} as Response;

      beforeEach(() => {
        Sinon.stub(mongoose.Model, 'create').resolves(motorcycleMock)
        res.status = Sinon.stub().returns(res)
        res.json = Sinon.stub().returns(null);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it('Return status 201 with created item', async () => {
        await motorcycleController.create(req, res);
        expect((res.status as any).calledWith(201)).to.be.true;
        expect((res.json as any).calledWith(motorcycleMock)).to.be.true;
      });
    })

    describe('When is not created successfully', () => {
      const motorcycleController = new MotorcycleController();

      const req = {} as Request;
      const res = {} as Response;

      beforeEach(() => {
        Sinon.stub(mongoose.Model, 'create').resolves(null);
        res.status = Sinon.stub().returns(res)
        res.json = Sinon.stub().returns(null);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it('Return status 500 with error message', async () => {
        await motorcycleController.create(req, res);
        expect((res.status as any).calledWith(500)).to.be.true;
        expect((res.json as any).calledWith({ error: 'Internal Server Error' })).to.be.true;
      });

    })
  })

  describe('Tests Read', () => {

    describe('When database is not empty', () => {
      const motorcycleController = new MotorcycleController();

      const req = {} as Request;
      const res = {} as Response;

      beforeEach(() => {
        Sinon.stub(mongoose.Model, 'find').resolves([motorcycleMock]);
        res.status = Sinon.stub().returns(res)
        res.json = Sinon.stub().returns(null);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it('Return status 200 with all items', async () => {
        await motorcycleController.read(req, res);
        expect((res.status as any).calledWith(200)).to.be.true
        expect((res.json as any).calledWith([motorcycleMock])).to.be.true;
      });
    })

    describe('When database is empty', () => {

      const motorcycleController = new MotorcycleController();

      const req = {} as Request;
      const res = {} as Response;

      beforeEach(() => {
        Sinon.stub(mongoose.Model, 'find').resolves([]);
        res.status = Sinon.stub().returns(res)
        res.json = Sinon.stub().returns(null);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it('Return status 200 with empty array', async () => {
        await motorcycleController.read(req, res);
        expect((res.status as any).calledWith(200)).to.be.true;
        expect((res.json as any).calledWith([])).to.be.true;
      });
    })

    describe('When an error occurs', () => {
      const motorcycleController = new MotorcycleController();

      const req = {} as Request;
      const res = {} as Response;

      beforeEach(() => {
        Sinon.stub(mongoose.Model, 'find').rejects();
        res.status = Sinon.stub().returns(res)
        res.json = Sinon.stub().returns(null);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it('Return status 500 with error message', async () => {
        await motorcycleController.read(req, res);
        expect((res.status as any).calledWith(500)).to.be.true;
        expect((res.json as any).calledWith({ error: 'Internal Server Error' })).to.be.true;
      });
    })
  })

  describe('Tests readOne', () => {

    describe('When is read successfully', () => {
      const motorcycleController = new MotorcycleController();

      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: '5e9f9c9f9c9f9c9f9c9f9c9' };

      beforeEach(() => {
        Sinon.stub(mongoose.Model, 'findOne').resolves(motorcycleMock);
        res.status = Sinon.stub().returns(res)
        res.json = Sinon.stub().returns(null);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it('Return status 200 with item', async () => {
        await motorcycleController.readOne(req, res);
        expect((res.status as any).calledWith(200)).to.be.true;
        expect((res.json as any).calledWith(motorcycleMock)).to.be.true;
      });
    })

    describe('When is not read successfully', () => {
      const motorcycleController = new MotorcycleController();

      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: '5e9f9c9f9c9f9c9f9c9f9c9' };

      beforeEach(() => {
        Sinon.stub(mongoose.Model, 'findOne').resolves(null);
        res.status = Sinon.stub().returns(res)
        res.json = Sinon.stub().returns(null);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it('Return status 404 with error message', async () => {
        await motorcycleController.readOne(req, res);
        expect((res.status as any).calledWith(404)).to.be.true;
        expect((res.json as any).calledWith({ error: 'Object not found' })).to.be.true;
      });
    });

    describe('When an error occurs', () => {
      const motorcycleController = new MotorcycleController();

      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: '5e9f9c9f9c9f9c9f9c9f9c9' };

      beforeEach(() => {
        Sinon.stub(mongoose.Model, 'findOne').rejects();
        res.status = Sinon.stub().returns(res)
        res.json = Sinon.stub().returns(null);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it('Return status 500 with error message', async () => {
        await motorcycleController.readOne(req, res);
        expect((res.status as any).calledWith(500)).to.be.true;
        expect((res.json as any).calledWith({ error: 'Internal Server Error' })).to.be.true;
      });
    })
  })

  describe('Tests update', () => {

    describe('When is updated successfully', () => {
      const motorcycleController = new MotorcycleController();

      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: '5e9f9c9f9c9f9c9f9c9f9c9' };
      req.body = {
        brand: 'Fiat',
        model: 'Uno',
        year: '2020',
        color: 'Black',
        price: '100',
        km: '100',
        sold: false
      };

      beforeEach(() => {
        Sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves(motorcycleMock);
        res.status = Sinon.stub().returns(res)
        res.json = Sinon.stub().returns(null);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it('Return status 200 with item', async () => {
        await motorcycleController.update(req, res);
        expect((res.status as any).calledWith(200)).to.be.true;
        expect((res.json as any).calledWith(motorcycleMock)).to.be.true;
      });
    })


    describe('When item is not found', () => {
      const motorcycleController = new MotorcycleController();

      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: '5e9f9c9f9c9f9c9f9c9f9c9' };
      req.body = {
        brand: 'Fiat',
        model: 'Uno',
        year: '2020',
        color: 'Black',
        price: '100',
        km: '100',
        sold: false
      };

      beforeEach(() => {
        Sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves(null);
        res.status = Sinon.stub().returns(res)
        res.json = Sinon.stub().returns(null);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it('Return status 404 with error message', async () => {
        await motorcycleController.update(req, res);
        expect((res.status as any).calledWith(404)).to.be.true;
        expect((res.json as any).calledWith({ error: 'Object not found' })).to.be.true;
      });
    })

    describe('When an error occurs', () => {
      const motorcycleController = new MotorcycleController();

      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: '5e9f9c9f9c9f9c9f9c9f9c9' };
      req.body = {
        brand: 'Fiat',
        model: 'Uno',
        year: '2020',
        color: 'Black',
        price: '100',
        km: '100',
        sold: false
      };

      beforeEach(() => {
        Sinon.stub(mongoose.Model, 'findOneAndUpdate').rejects();
        res.status = Sinon.stub().returns(res)
        res.json = Sinon.stub().returns(null);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it('Return status 500 with error message', async () => {
        await motorcycleController.update(req, res);
        expect((res.status as any).calledWith(500)).to.be.true;
        expect((res.json as any).calledWith({ error: 'Internal Server Error' })).to.be.true;
      });
    })
  })
  describe('Tests delete', () => {

    describe('When is deleted successfully', () => {
      const motorcycleController = new MotorcycleController();

      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: '5e9f9c9f9c9f9c9f9c9f9c9' };

      beforeEach(() => {
        Sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(motorcycleMock);
        res.status = Sinon.stub().returns(res)
        res.json = Sinon.stub().returns(null);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it('Return status 204 with item', async () => {
        await motorcycleController.delete(req, res);
        expect((res.status as any).calledWith(204)).to.be.true;
        expect((res.json as any).calledWith(motorcycleMock)).to.be.true;
      });
    })

    describe('When item is not found', () => {
      const motorcycleController = new MotorcycleController();

      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: '5e9f9c9f9c9f9c9f9c9f9c9' };

      beforeEach(() => {
        Sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(null);
        res.status = Sinon.stub().returns(res)
        res.json = Sinon.stub().returns(null);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it('Return status 404 with error message', async () => {
        await motorcycleController.delete(req, res);
        expect((res.status as any).calledWith(404)).to.be.true;
        expect((res.json as any).calledWith({ error: 'Object not found' })).to.be.true;
      });
    })

    describe('When an error occurs', () => {
      const motorcycleController = new MotorcycleController();

      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: '5e9f9c9f9c9f9c9f9c9f9c9' };

      beforeEach(() => {
        Sinon.stub(mongoose.Model, 'findOneAndDelete').rejects();
        res.status = Sinon.stub().returns(res)
        res.json = Sinon.stub().returns(null);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it('Return status 500 with error message', async () => {
        await motorcycleController.delete(req, res);

        expect((res.status as any).calledWith(500)).to.be.true;
        expect((res.json as any).calledWith({ error: 'Internal Server Error' })).to.be.true;
      });
    })
  })
});