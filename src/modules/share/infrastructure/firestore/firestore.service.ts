import { Injectable, InternalServerErrorException } from '@nestjs/common';
import admin from 'firebase-admin';
import Firestore = admin.firestore.Firestore;
import DocumentData = admin.firestore.DocumentData;
import CollectionReference = admin.firestore.CollectionReference;
import QuerySnapshot = admin.firestore.QuerySnapshot;
import { Firebase } from '../firebase';
import { ItemDto } from './item.dto';
import { Query, WhereFilterOp } from '@google-cloud/firestore';
import { FilterItem } from '../../domain/repository';

@Injectable()
export class FirestoreService {
  db: Firestore;

  constructor() {
    Firebase.initDefaultApp();
    this.db = admin.firestore();
  }

  public async persist(
    collection: string,
    id: string,
    data: any,
  ): Promise<void> {
    try {
      await this.getCollection(collection).doc(id).set(data);
    } catch (e) {
      throw new InternalServerErrorException(`Error en el servidor ${e}`);
    }
  }

  public async delete(collection: string, id: string): Promise<void> {
    try {
      await this.getCollection(collection).doc(id).delete();
    } catch (e) {
      throw new InternalServerErrorException(`Error en el servidor ${e}`);
    }
  }

  public async findOneDocumentById(
    collection: string,
    id: string,
  ): Promise<ItemDto> {
    try {
      const storeDb = this.getCollection(collection).doc(id);
      const getDoc = await storeDb.get();
      if (!getDoc.exists) {
        return null;
      }
      return {
        id: getDoc.id,
        data: getDoc.data(),
      };
    } catch (e) {
      throw new InternalServerErrorException(
        e,
        `Error en el servidor FirestoreService findOneDocumentById`,
      );
    }
  }

  public async findFirstDocumentByFilter(
    collection: string,
    fieldPath: string,
    opStr: any,
    value: any,
  ): Promise<ItemDto> {
    const list: ItemDto[] = await this.findAllDocumentByFilter(
      collection,
      fieldPath,
      opStr,
      value,
    );
    if (!list) {
      return null;
    }
    return list[0];
  }

  public async findAllDocumentByFilter(
    collection: string,
    fieldPath: string,
    opStr: any,
    value: any,
  ): Promise<ItemDto[]> {
    try {
      const storeDb = this.getCollection(collection);
      const getDoc = await storeDb.where(fieldPath, opStr, value).get();
      return this.processGetAllData(getDoc);
    } catch (e) {
      throw new InternalServerErrorException(`Error en el servidor ${e}`);
    }
  }

  public async findAll(
    collection: string,
    filters: Array<FilterItem> = [],
  ): Promise<ItemDto[]> {
    try {
      const storeDb = this.getCollection(collection);
      const where = filters.reduce<Query>((acc, cur) => {
        const op = cur.opStr as WhereFilterOp;
        return acc.where(cur.field, op, cur.value);
      }, storeDb);
      const getDoc = await where.get();
      return this.processGetAllData(getDoc);
    } catch (e) {
      throw new InternalServerErrorException(`Error en el servidor ${e}`);
    }
  }

  public getCollection(collection: string): CollectionReference<DocumentData> {
    return this.db.collection(collection);
  }

  public processGetAllData(getDoc: QuerySnapshot<DocumentData>): ItemDto[] {
    if (getDoc.empty) {
      return [];
    }
    return getDoc.docChanges().map((item) => {
      return {
        id: item.doc.id,
        data: item.doc.data(),
      };
    });
  }
}
