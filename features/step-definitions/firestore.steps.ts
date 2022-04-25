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
}
