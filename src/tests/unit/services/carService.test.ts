import { expect } from 'chai';
import mongoose from 'mongoose';
import Sinon from 'sinon';
import CarService from '../../../services/CarService';

describe('Tests Car Service', () => {

  const carMock = {
    _id: '5e9f9c9f9c9f9c9f9c9f9c9',
    model: 'Fiat',
    year: 2020,
    color: 'Preto',
    status: true,
    buyValue: 100000,
    seatsQty: 5,
    doorsQty: 4,
  }

  describe('Tests Create Service', () => {

    describe('When is created successfully', () => {
      const carService = new CarService();
      before(() => {
        Sinon.stub(mongoose.Model, 'create').resolves(carMock)
      })

      after(() => {
        Sinon.restore()
      });;

      it('Return the created item', async () => {
        const item = await carService.create(carMock)
        expect(item).to.be.equal(carMock)
      });
    })

    describe('When is not created successfully', () => {
      const carService = new CarService();
      before(() => {
        Sinon.stub(mongoose.Model, 'create').resolves(null)
      })

      after(() => {
        Sinon.restore()
      });;

      it('Return the created item', async () => {

        const item = await carService.create(carMock)
        expect(item).to.be.equal(null)
      });
    })
  })

  describe('Tests Read Service', () => {

    describe('When database is not empty', () => {
      const carService = new CarService();
      before(() => {
        Sinon.stub(mongoose.Model, 'find').resolves([carMock])
      })

      after(() => {
        Sinon.restore()
      })

      it('Return an array containing all items', async () => {
        const items = await carService.read()
        expect(items).to.include(carMock);
      });
    })

    describe('When database is empty', () => {
      const carService = new CarService();
      before(() => {
        Sinon.stub(mongoose.Model, 'find').resolves([])
      })

      after(() => {
        Sinon.restore()
      })

      it('Return an empty array', async () => {
        const items = await carService.read()
        expect(items).to.be.an('array');
        expect(items).to.be.empty;
      });
    })
  })

  describe('Tests ReadOne Service', () => {

    describe('When an item is found', () => {
      const carService = new CarService();
      before(() => {
        Sinon.stub(mongoose.Model, 'findOne').resolves(carMock)
      })

      after(() => {
        Sinon.restore()
      })

      it('Return found item', async () => {
        const item = await carService.readOne(carMock._id)
        expect(item).to.be.equal(carMock);
      });
    })

    describe('When an item is not found', () => {
      const carService = new CarService();
      before(() => {
        Sinon.stub(mongoose.Model, 'findOne').resolves(null)
      })

      after(() => {
        Sinon.restore()
      })

      it('Return null', async () => {
        const item = await carService.readOne(carMock._id)
        expect(item).to.be.equal(null);
      });
    })
  })

  describe('Tests Update Service', () => {

    describe('When an item is updated successfully', () => {
      const carService = new CarService();
      before(() => {
        Sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves(carMock)
      })

      after(() => {
        Sinon.restore()
      })

      it('Return updated item', async () => {
        const item = await carService.update(carMock._id, carMock)
        expect(item).to.be.equal(carMock);
      });
    })

    describe('When an item is not updated successfully', () => {
      const carService = new CarService();
      before(() => {
        Sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves(null)
      })

      after(() => {
        Sinon.restore()
      })

      it('Return null', async () => {
        const item = await carService.update(carMock._id, carMock)
        expect(item).to.be.equal(null);
      });
    })
  })

  describe('Tests Delete Service', () => {

    describe('When an item is deleted successfully', () => {
      const carService = new CarService();
      before(() => {
        Sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(carMock)
      })

      after(() => {
        Sinon.restore()
      })

      it('Return deleted item', async () => {
        const item = await carService.delete(carMock._id)
        expect(item).to.be.equal(carMock);
      });
    })

    describe('When an item is not deleted successfully', () => {
      const carService = new CarService();
      before(() => {
        Sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(null)
      })

      after(() => {
        Sinon.restore()
      })

      it('Return null', async () => {
        const item = await carService.delete(carMock._id)
        expect(item).to.be.equal(null);
      });
    })
  })
})