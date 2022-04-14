import { expect } from "chai"
import mongoose from 'mongoose'
import Sinon from "sinon"
import CarModel from "../../../models/Car"
import MotorcycleModel from "../../../models/Motorcycle"

describe('Tests Motorcycle Model', () => {

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

  describe('Testing Create Model', () => {
    const motorcycleModel = new MotorcycleModel();
    before(() => {
      Sinon.stub(mongoose.Model, 'create').resolves(motorcycleMock)
    })

    after(() => {
      Sinon.restore()
    })

    it('Return the created model', async () => {
      const model = await motorcycleModel.create(motorcycleMock)
      expect(model).to.be.equal(motorcycleMock)
    })
  })

  describe('Testing Read Model', () => {

    describe('When database is not empty', () => {
      const motorcycleModel = new MotorcycleModel();

      before(() => {
        Sinon.stub(mongoose.Model, 'find').resolves([motorcycleMock])
      })

      after(() => {
        Sinon.restore()
      })

      it('Return an array containing all items', async () => {
        const model = await motorcycleModel.read()
        expect(model).to.include(motorcycleMock);
      })
    })

    describe('When database is empty', () => {
      const motorcycleModel = new MotorcycleModel();

      before(() => {
        Sinon.stub(mongoose.Model, 'find').resolves([])
      })

      after(() => {
        Sinon.restore()
      })

      it('Return an empty array', async () => {
        const model = await motorcycleModel.read()
        expect(model).to.be.an('array');
        expect(model).to.be.empty;
      })
    })
  });

  describe('Testing ReadOne Model', () => {

    describe('When an item is found', () => {
      const motorcycleModel = new MotorcycleModel();
      before(() => {
        Sinon.stub(mongoose.Model, 'findOne').resolves(motorcycleMock)
      })

      after(() => {
        Sinon.restore()
      })

      it('Return an array containing the found model', async () => {
        const model = await motorcycleModel.readOne('123')
        expect(model).to.be.equal(motorcycleMock);
      })
    })

    describe('When an item is not found', () => {
      const motorcycleModel = new MotorcycleModel();
      before(() => {
        Sinon.stub(mongoose.Model, 'findOne').resolves(null)
      })

      after(() => {
        Sinon.restore()
      })

      it('Return null', async () => {
        const model = await motorcycleModel.readOne('123')
        expect(model).to.be.null;
      })
    })

  });

  describe('Testing Update Model', () => {

    describe('When an item is found', () => {
      const motorcycleModel = new MotorcycleModel();
      before(() => {
        Sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves('Item updated')
      })

      after(() => {
        Sinon.restore()
      })

      it('Return the updated model', async () => {
        const model = await motorcycleModel.update('123', motorcycleMock)
        expect(model).to.be.equal('Item updated');
      })
    })

    describe('When an item is not found', () => {
      const motorcycleModel = new MotorcycleModel();

      before(() => {
        Sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves(null)
      })

      after(() => {
        Sinon.restore()
      })

      it('Return null', async () => {
        const model = await motorcycleModel.update('123', motorcycleMock)
        expect(model).to.be.null;
      })
    })
  });

  describe('Testing Delete Model', () => {
    describe('When an item is found', () => {
      const motorcycleModel = new MotorcycleModel();

      before(() => {
        Sinon.stub(mongoose.Model, 'findOneAndDelete').resolves('Item deleted')
      })

      after(() => {
        Sinon.restore()
      })

      it('Return an array containing the found model', async () => {
        const model = await motorcycleModel.delete('123')
        expect(model).to.be.equal('Item deleted');
      })
    })

    describe('When an item is not found', () => {
      const motorcycleModel = new MotorcycleModel();

      before(() => {
        Sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(null)
      })

      after(() => {
        Sinon.restore()
      })

      it('Return null', async () => {
        const model = await motorcycleModel.delete('123')
        expect(model).to.be.null;
      })
    })

  });
})