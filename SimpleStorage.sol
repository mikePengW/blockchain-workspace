pragma solidity >0.4.22 <0.5.0;

contract SimpleStorage{
    uint myData;
    function setData(uint newData) public {
        myData = newData;
    }
    function getData() public view returns(uint){
        return myData;
    }
}