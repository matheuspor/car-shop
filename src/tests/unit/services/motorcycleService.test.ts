import { expect } from 'chai';
import mongoose from 'mongoose';
import Sinon from 'sinon';
import MotorcycleService from '../../../services/MotorcycleService';

describe('Tests Motorcycle Service', () => {

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

  describe('Tests Create Service', () => {

    describe('When is created successfully', () => {
      const motorcycleService = new MotorcycleService();

      before(() => {
        Sinon.stub(mongoose.Model, 'create').resolves(motorcycleMock)
      })

      after(() => {
        Sinon.restore()
      });;

      it('Return the created item', async () => {
        const item = await motorcycleService.create(motorcycleMock)
        expect(item).to.be.equal(motorcycleMock)
      });
    })

    describe('When is not created successfully', () => {
      const motorcycleService = new MotorcycleService();

      before(() => {
        Sinon.stub(mongoose.Model, 'create').resolves(null)
      })

      after(() => {
        Sinon.restore()
      });;

      it('Return the created item', async () => {

        const item = await motorcycleService.create(motorcycleMock)
        expect(item).to.be.equal(null)
      });
    })
  })

  describe('Tests Read Service', () => {

    describe('When database is not empty', () => {
      const motorcycleService = new MotorcycleService();

      before(() => {
        Sinon.stub(mongoose.Model, 'find').resolves([motorcycleMock])
      })

      after(() => {
        Sinon.restore()
      })

      it('Return an array containing all items', async () => {
        const items = await motorcycleService.read()
        expect(items).to.include(motorcycleMock);
      });
    })

    describe('When database is empty', () => {
      const motorcycleService = new MotorcycleService();

      before(() => {
        Sinon.stub(mongoose.Model, 'find').resolves([])
      })

      after(() => {
        Sinon.restore()
      })

      it('Return an empty array', async () => {
        const items = await motorcycleService.read()
        expect(items).to.be.an('array');
        expect(items).to.be.empty;
      });
    })
  })

  describe('Tests ReadOne Service', () => {

    describe('When an item is found', () => {
      const motorcycleService = new MotorcycleService();

      before(() => {
        Sinon.stub(mongoose.Model, 'findOne').resolves(motorcycleMock)
      })

      after(() => {
        Sinon.restore()
      })

      it('Return found item', async () => {
        const item = await motorcycleService.readOne(motorcycleMock._id)
        expect(item).to.be.equal(motorcycleMock);
      });
    })

    describe('When an item is not found', () => {
      const motorcycleService = new MotorcycleService();

      before(() => {
        Sinon.stub(mongoose.Model, 'findOne').resolves(null)
      })

      after(() => {
        Sinon.restore()
      })

      it('Return null', async () => {
        const item = await motorcycleService.readOne(motorcycleMock._id)
        expect(item).to.be.equal(null);
      });
    })
  })

  describe('Tests Update Service', () => {

    describe('When an item is updated successfully', () => {
      const motorcycleService = new MotorcycleService();

      before(() => {
        Sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves(motorcycleMock)
      })

      after(() => {
        Sinon.restore()
      })

      it('Return updated item', async () => {
        const item = await motorcycleService.update(motorcycleMock._id, motorcycleMock)
        expect(item).to.be.equal(motorcycleMock);
      });
    })

    describe('When an item is not updated successfully', () => {
      const motorcycleService = new MotorcycleService();

      before(() => {
        Sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves(null)
      })

      after(() => {
        Sinon.restore()
      })

      it('Return null', async () => {
        const item = await motorcycleService.update(motorcycleMock._id, motorcycleMock)
        expect(item).to.be.equal(null);
      });
    })
  })

  describe('Tests Delete Service', () => {

    describe('When an item is deleted successfully', () => {
      const motorcycleService = new MotorcycleService();

      before(() => {
        Sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(motorcycleMock)
      })

      after(() => {
        Sinon.restore()
      })

      it('Return deleted item', async () => {
        const item = await motorcycleService.delete(motorcycleMock._id)
        expect(item).to.be.equal(motorcycleMock);
      });
    })

    describe('When an item is not deleted successfully', () => {
      const motorcycleService = new MotorcycleService();

      before(() => {
        Sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(null)
      })

      after(() => {
        Sinon.restore()
      })

      it('Return null', async () => {
        const item = await motorcycleService.delete(motorcycleMock._id)
        expect(item).to.be.equal(null);
      });
    })
  })
})