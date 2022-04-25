Feature: Persist Company
  In order to create company
  As an user
  I need to be able to persist Company

  Scenario: Create Company
    Given I have the following payload
    """
    mutation{
      companyPersist(
        id: "daf673b7-b1ba-415e-ac5e-04848e5e2e5f"
        name: "Company A"
        address: {
          street: "Av. Lima"
          number: 385
        }
      ){
        ...on Status{
          status
        }
        ...on Company{
          id
          name
          address{
            street
            number
          }
        }
      }
    }
    """
    When I make a request to graphql
    And I validate the response is
    """
    {
      "data": {
        "companyPersist": {
            "status": "ok"
         }
       }
    }
    """
    Then response should have a status 200
    And I validate the following data exists on collection "companies"
    """
    [
      {
        "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
        "name": "Company A",
        "address": {
          "street": "Av. Lima",
          "number": 385
        }
      }
    ]
    """

  Scenario: Create Company show entity
    Given I have the following payload
    """
    mutation{
      companyPersist(
        id: "daf673b7-b1ba-415e-ac5e-04848e5e2e5f"
        name: "Company A"
        address: {
          street: "Av. Lima"
          number: 385
        }
        showEntity: true
      ){
        ...on Status{
          status
        }
        ...on Company{
          id
          name
          address{
            street
            number
          }
        }
      }
    }
    """
    When I make a request to graphql
    And I validate the response is
    """
    {
      "data": {
        "companyPersist": {
           "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
           "name": "Company A",
           "address": {
              "street": "Av. Lima",
              "number": 385
           }
         }
       }
    }
    """
    Then response should have a status 200
    And I validate the following data exists on collection "companies"
    """
    [
      {
        "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
        "name": "Company A",
        "address": {
          "street": "Av. Lima",
          "number": 385
        }
      }
    ]
    """

  Scenario: Update Company
    Given I have the following data on collection "companies"
    """
    [
      {
        "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
        "name": "Company A",
        "address": {
          "street": "Av. Lima",
          "number": 385
        }
      }
    ]
    """
    And I have the following payload
    """
    mutation{
      companyPersist(
        id: "daf673b7-b1ba-415e-ac5e-04848e5e2e5f"
        name: "Company B"
        address: {
          street: "Av. Lima peru"
          number: 388
        }
      ){
        ...on Status{
          status
        }
        ...on Company{
          id
          name
          address{
            street
            number
          }
        }
      }
    }
    """
    When I make a request to graphql
    And I validate the response is
    """
    {
      "data": {
        "companyPersist": {
            "status": "ok"
         }
       }
    }
    """
    Then response should have a status 200
    And I validate the following data exists on collection "companies"
    """
    [
      {
        "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
        "name": "Company B",
        "address": {
          "street": "Av. Lima peru",
          "number": 388
        }
      }
    ]
    """