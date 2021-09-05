mutation {
  userPersist(id: "c96a8ea2-aba7-45a5-a93b-c2f666aa09c8", name: "guille") {
    ... on Status {
      status
    }
    ... on User {
      id
      name
    }
  }
  productPersist(
    id: "c96a8ea2-aba7-45a5-a93b-c2f666aa09c9"
    name: "ProductA"
    code: "c96a8ea2-aba7-45a5-a93b-c2f666aa09c8"
    description: "tiene gripe"
    createAt: "2018-05-06"
    price: 12
    category: "books"
    showEntity: true
  ) {
    ... on Status {
      status
    }
    ... on Product {
      id
      name
    }
  }
  companyPersist(
    id: "a91063e7-9a87-429a-8400-49cf1af19bd3"
    name: "companyA"
    address: { street: "gadd", number: 1511 }
    showEntity: true
  ) {
    ... on Status {
      status
    }
    ... on Company {
      id
      name
      address {
        street
        number
      }
    }
  }
}



///////////////////////////////////////////////////


mutation {
  userDelete(id: "c96a8ea2-aba7-45a5-a93b-c2f666aa09c8") {
    status
  }
  productDelete(id: "c96a8ea2-aba7-45a5-a93b-c2f666aa09c9") {
    status
  }
  companyDelete(id: "a91063e7-9a87-429a-8400-49cf1af19bd3") {
    status
  }
}


////////////////////////////////////////////////////



query {
  userList {
    id
    name
  }
  productList {
    id
    name
  }
  companyList {
    id
    name
  }
}



/////////////////////////////////////////////////////////


query {
  user(id: "c96a8ea2-aba7-45a5-a93b-c2f666aa09c8") {
    id
    name
  }
  product(id: "c96a8ea2-aba7-45a5-a93b-c2f666aa09c9") {
    id
    name
  }
  company(id: "a91063e7-9a87-429a-8400-49cf1af19bd3") {
    id
    name
  }
}
