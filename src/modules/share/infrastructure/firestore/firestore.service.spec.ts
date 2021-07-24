import { Test, TestingModule } from '@nestjs/testing';
import { FirestoreService } from './firestore.service';

describe('Integration FirestoreService', () => {
  let service: FirestoreService;
  const resourceId = '8e4abb47-bca2-409a-a20d-b4e02adf5782';
  const collection = 'testcoll';
  const filterParam = '020b635e-ca5c-43f3-9bab-55c7039dc3c9';
  const dataPersist = {
    storage: 1,
    color: 'blue',
    param: filterParam,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirestoreService],
    }).compile();
    service = module.get<FirestoreService>(FirestoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('persist', () => {
    describe('when data is correct', () => {
      it('should persist data in a collection testcoll', async () => {
        await service.persist(collection, resourceId, dataPersist);
        expect(true).toBeDefined();
      });
    });
    describe('otherwise', () => {
      it('should exception when not send collectionName', async () => {
        await expect(
          service.persist(null, resourceId, dataPersist),
        ).rejects.toThrow('Error en el servidor');
      });
    });
  });

  describe('findOneDocumentById', () => {
    describe('when data with ID exist', () => {
      it('should return the data', async () => {
        const result = await service.findOneDocumentById(
          collection,
          resourceId,
        );
        expect(result).toBeDefined();
        expect(result.data).toEqual(dataPersist);
        expect(result.id).toEqual(resourceId);
      });
    });
    describe('otherwise', () => {
      it('should return null', async () => {
        const resourceIdNotExit = '5e8048df-a9b6-4edd-8937-bad2108be71a';
        const result = await service.findOneDocumentById(
          collection,
          resourceIdNotExit,
        );
        expect(result).toEqual(null);
      });
      it('should exception when not send collectionName', async () => {
        await expect(
          service.findOneDocumentById(null, resourceId),
        ).rejects.toThrow(
          'Value for argument "collectionPath" is not a valid resource path. Path must be a non-empty string.',
        );
      });
    });
  });

  describe('findFirstDocumentByFilter', () => {
    describe('when data with filter exist', () => {
      it('should return the one data', async () => {
        const result = await service.findFirstDocumentByFilter(
          collection,
          'param',
          '==',
          filterParam,
        );
        expect(result).toBeDefined();
        expect(result.data).toEqual(dataPersist);
        expect(result.id).toEqual(resourceId);
      });
    });
    describe('otherwise', () => {
      it('should return null', async () => {
        const filterParamNotExit = '2a013317-0d26-4e12-8e39-b5289e8a9d68';
        const result = await service.findFirstDocumentByFilter(
          collection,
          'param',
          '==',
          filterParamNotExit,
        );
        expect(result).toEqual(null);
      });
      it('should exception when not send collectionName', async () => {
        await expect(
          service.findFirstDocumentByFilter(null, 'param', '==', filterParam),
        ).rejects.toThrow(
          'Value for argument "collectionPath" is not a valid resource path. Path must be a non-empty string.',
        );
      });
    });
  });

  describe('findAllDocumentByFilter', () => {
    describe('when data with filter exist', () => {
      it('should return the one data', async () => {
        const result = await service.findAllDocumentByFilter(
          collection,
          'param',
          '==',
          filterParam,
        );
        expect(result).toBeDefined();
        expect(result[0].data).toEqual(dataPersist);
        expect(result[0].id).toEqual(resourceId);
      });
    });
    describe('otherwise', () => {
      it('should return null', async () => {
        const filterParamNotExit = '2a013317-0d26-4e12-8e39-b5289e8a9d68';
        const result = await service.findAllDocumentByFilter(
          collection,
          'param',
          '==',
          filterParamNotExit,
        );
        expect(result).toEqual(null);
      });
      it('should exception when not send collectionName', async () => {
        await expect(
          service.findAllDocumentByFilter(null, 'param', '==', filterParam),
        ).rejects.toThrow('Error en el servidor');
      });
    });
  });
});
