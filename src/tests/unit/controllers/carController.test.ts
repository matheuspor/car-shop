import { expect } from 'chai';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Sinon = require('sinon');
import CarController from '../../../controllers/Car';

describe('Tests CarController', () => {
  const mockCar = {
    _id: '5e9f9c9f9c9f9c9f9c9f9c9',
    model: 'Ford',
    year: 2019,
    color: 'blue',
    status: true,
    buyValue: 39000,
    doorsQty: 2,
    seatsQty: 4,
  }

  describe('Tests Create', () => {

    describe('When is created successfully', () => {
      const carController = new CarController();

      const req = { body: mockCar } as Request;
      const res = {} as Response;

      beforeEach(() => {
        Sinon.stub(mongoose.Model, 'create').resolves(mockCar)
        res.status = Sinon.stub().returns(res)
        res.json = Sinon.stub().returns(null);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it('Return status 201 with created item', async () => {
        await carController.create(req, res);
        expect((res.status as any).calledWith(201)).to.be.true;
        expect((res.json as any).calledWith(mockCar)).to.be.true;
      });
    })

    describe('When is not created successfully', () => {
      const carController = new CarController();

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
        await carController.create(req, res);
        expect((res.status as any).calledWith(500)).to.be.true;
        expect((res.json as any).calledWith({ error: 'Internal Server Error' })).to.be.true;
      });

    })
  })

  describe('Tests Read', () => {

    describe('When database is not empty', () => {
      const carController = new CarController();

      const req = {} as Request;
      const res = {} as Response;

      beforeEach(() => {
        Sinon.stub(mongoose.Model, 'find').resolves([mockCar]);
        res.status = Sinon.stub().returns(res)
        res.json = Sinon.stub().returns(null);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it('Return status 200 with all items', async () => {
        await carController.read(req, res);
        expect((res.status as any).calledWith(200)).to.be.true
        expect((res.json as any).calledWith([mockCar])).to.be.true;
      });
    })

    describe('When database is empty', () => {

      const carController = new CarController();

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
        await carController.read(req, res);
        expect((res.status as any).calledWith(200)).to.be.true;
        expect((res.json as any).calledWith([])).to.be.true;
      });
    })

    describe('When an error occurs', () => {
      const carController = new CarController();

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
        await carController.read(req, res);
        expect((res.status as any).calledWith(500)).to.be.true;
        expect((res.json as any).calledWith({ error: 'Internal Server Error' })).to.be.true;
      });
    })
  })

  describe('Tests readOne', () => {

    describe('When is read successfully', () => {
      const carController = new CarController();

      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: '5e9f9c9f9c9f9c9f9c9f9c9' };

      beforeEach(() => {
        Sinon.stub(mongoose.Model, 'findOne').resolves(mockCar);
        res.status = Sinon.stub().returns(res)
        res.json = Sinon.stub().returns(null);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it('Return status 200 with item', async () => {
        await carController.readOne(req, res);
        expect((res.status as any).calledWith(200)).to.be.true;
        expect((res.json as any).calledWith(mockCar)).to.be.true;
      });
    })

    describe('When is not read successfully', () => {
      const carController = new CarController();

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
        await carController.readOne(req, res);
        expect((res.status as any).calledWith(404)).to.be.true;
        expect((res.json as any).calledWith({ error: 'Object not found' })).to.be.true;
      });
    });

    describe('When an error occurs', () => {
      const carController = new CarController();

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
        await carController.readOne(req, res);
        expect((res.status as any).calledWith(500)).to.be.true;
        expect((res.json as any).calledWith({ error: 'Internal Server Error' })).to.be.true;
      });
    })
  })

  describe('Tests update', () => {

    describe('When is updated successfully', () => {
      const carController = new CarController();

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
        Sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves(mockCar);
        res.status = Sinon.stub().returns(res)
        res.json = Sinon.stub().returns(null);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it('Return status 200 with item', async () => {
        await carController.update(req, res);
        expect((res.status as any).calledWith(200)).to.be.true;
        expect((res.json as any).calledWith(mockCar)).to.be.true;
      });
    })


    describe('When item is not found', () => {
      const carController = new CarController();

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
        await carController.update(req, res);
        expect((res.status as any).calledWith(404)).to.be.true;
        expect((res.json as any).calledWith({ error: 'Object not found' })).to.be.true;
      });
    })

    describe('When an error occurs', () => {
      const carController = new CarController();

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
        await carController.update(req, res);
        expect((res.status as any).calledWith(500)).to.be.true;
        expect((res.json as any).calledWith({ error: 'Internal Server Error' })).to.be.true;
      });
    })
  })
  describe('Tests delete', () => {

    describe('When is deleted successfully', () => {
      const carController = new CarController();

      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: '5e9f9c9f9c9f9c9f9c9f9c9' };

      beforeEach(() => {
        Sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(mockCar);
        res.status = Sinon.stub().returns(res)
        res.json = Sinon.stub().returns(null);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it('Return status 204 with item', async () => {
        await carController.delete(req, res);
        expect((res.status as any).calledWith(204)).to.be.true;
        expect((res.json as any).calledWith(mockCar)).to.be.true;
      });
    })

    describe('When item is not found', () => {
      const carController = new CarController();

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
        await carController.delete(req, res);
        expect((res.status as any).calledWith(404)).to.be.true;
        expect((res.json as any).calledWith({ error: 'Object not found' })).to.be.true;
      });
    })

    describe('When an error occurs', () => {
      const carController = new CarController();

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
        await carController.delete(req, res);
        expect((res.status as any).calledWith(500)).to.be.true;
        expect((res.json as any).calledWith({ error: 'Internal Server Error' })).to.be.true;
      });
    })
  })
});