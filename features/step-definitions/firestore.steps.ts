import { after, before, binding, then } from 'cucumber-tsflow';
import admin, { firestore } from 'firebase-admin';
import Firestore = firestore.Firestore;
import { Firebase } from '../../src/share/infrastructure/firebase';
import { InternalServerErrorException } from '@nestjs/common';
import { assert } from 'chai';
import { toJson } from './tools/string-tools';

@binding()
export class FirestoreSteps {
  db: Firestore;

  @before()
  public async beforeAllScenarios() {
    console.log('FirestoreSteps  before');
    Firebase.initDefaultApp();
    this.db = admin.firestore();
  }

  @after()
  public async afterAllScenarios() {
    console.log('FirestoreSteps  after');
  }

  @then('I validate the following data exists on collection Company')
  public async i_validate_the_following_data_exists_on_collection(data: string) {
    const dataJson = toJson(data);
    const dataDb = await this.getAllDataByCollection('companies');
    assert.deepEqual(dataDb, dataJson);
  }

  private async getAllDataByCollection(collection: string) {
    let dataDb = [];
    try {
      const snapshot = await this.db.collection(collection).get();
      if (!snapshot.empty) {
        dataDb = snapshot.docChanges().map((item) => {
          return item.doc.data();
        });
      }
    } catch (e) {
      throw new InternalServerErrorException(`Error en el servidor firestore ${e}`);
    }
    return dataDb;
  }

  private async deleteCollection(collectionPath) {
    const collectionRef = this.db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__');

    return new Promise((resolve, reject) => {
      this.deleteQueryBatch(query, resolve).catch(reject);
    });
  }

  private async deleteQueryBatch(query, resolve) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      resolve();
      return;
    }

    // Delete documents in a batch
    const batch = this.db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      this.deleteQueryBatch(query, resolve);
    });
  }
}
