import { expect } from "chai"
import mongoose from 'mongoose'
import Sinon from "sinon"
import CarModel from "../../../models/Car"

describe('Tests Car Model', () => {

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

  describe('Testing Create Model', () => {
    const carModel = new CarModel();
    before(() => {
      Sinon.stub(mongoose.Model, 'create').resolves(carMock)
    })

    after(() => {
      Sinon.restore()
    })

    it('Return the created model', async () => {
      const model = await carModel.create(carMock)
      expect(model).to.be.equal(carMock)
    })
  })

  describe('Testing Read Model', () => {

    describe('When database is not empty', () => {
      const carModel = new CarModel();

      before(() => {
        Sinon.stub(mongoose.Model, 'find').resolves([carMock])
      })

      after(() => {
        Sinon.restore()
      })

      it('Return an array containing all items', async () => {
        const model = await carModel.read()
        expect(model).to.include(carMock);
      })
    })

    describe('When database is empty', () => {
      const carModel = new CarModel();

      before(() => {
        Sinon.stub(mongoose.Model, 'find').resolves([])
      })

      after(() => {
        Sinon.restore()
      })

      it('Return an empty array', async () => {
        const model = await carModel.read()
        expect(model).to.be.an('array');
        expect(model).to.be.empty;
      })
    })
  });

  describe('Testing ReadOne Model', () => {

    describe('When an item is found', () => {
      const carModel = new CarModel();
      before(() => {
        Sinon.stub(mongoose.Model, 'findOne').resolves(carMock)
      })

      after(() => {
        Sinon.restore()
      })

      it('Return an array containing the found model', async () => {
        const model = await carModel.readOne('123')
        expect(model).to.be.equal(carMock);
      })
    })

    describe('When an item is not found', () => {
      const carModel = new CarModel();
      before(() => {
        Sinon.stub(mongoose.Model, 'findOne').resolves(null)
      })

      after(() => {
        Sinon.restore()
      })

      it('Return null', async () => {
        const model = await carModel.readOne('123')
        expect(model).to.be.null;
      })
    })

  });

  describe('Testing Update Model', () => {

    describe('When an item is found', () => {

      const carModel = new CarModel();
      before(() => {
        Sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves('Item updated')
      })

      after(() => {
        Sinon.restore()
      })

      it('Return the updated model', async () => {
        const model = await carModel.update('123', carMock)
        expect(model).to.be.equal('Item updated');
      })
    })

    describe('When an item is not found', () => {
      const carModel = new CarModel();
      before(() => {
        Sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves(null)
      })

      after(() => {
        Sinon.restore()
      })

      it('Return null', async () => {
        const model = await carModel.update('123', carMock)
        expect(model).to.be.null;
      })
    })
  });

  describe('Testing Delete Model', () => {
    describe('When an item is found', () => {

      const carModel = new CarModel();
      before(() => {
        Sinon.stub(mongoose.Model, 'findOneAndDelete').resolves('Item deleted')
      })

      after(() => {
        Sinon.restore()
      })

      it('Return an array containing the found model', async () => {
        const model = await carModel.delete('123')
        expect(model).to.be.equal('Item deleted');
      })
    })

    describe('When an item is not found', () => {
      const carModel = new CarModel();
      before(() => {
        Sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(null)
      })

      after(() => {
        Sinon.restore()
      })

      it('Return null', async () => {
        const model = await carModel.delete('123')
        expect(model).to.be.null;
      })
    })

  });
})