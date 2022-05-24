Feature: Delete User
  In order to delete user
  As an user
  I need to be able to delete User

  Background:
  Given I have the following data on collection "users"
  """
    [
      {
        "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
        "name": "Name"
      }
    ]
    """


  Scenario: delete one user
    Given I make a request to graphql
    """
    mutation{
      userDelete(id:"daf673b7-b1ba-415e-ac5e-04848e5e2e5f"){
        status
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "userDelete": {
            "status": "ok"
         }
      }
    }
    """
    Then response should have a status 200
    And I validate empty data on collection "users"


  Scenario: delete user not exist
    Given I make a request to graphql
    """
    mutation{
      userDelete(id:"daf673b7-b1ba-415e-ac5e-04848e5e2e6f"){
        status
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "userDelete": {
            "status": "ok"
         }
      }
    }
    """
    Then response should have a status 200
