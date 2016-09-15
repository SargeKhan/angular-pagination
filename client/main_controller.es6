/* jshint esversion: 6 */

class MainController{
  constructor($scope){
    console.log("Hello Darkness");
    $scope.totalValues = 100;
    $scope.valuesPerPage = 10;
    $scope.mainPageChange = (pageNum)=>{
      console.log("In main controller", pageNum);
      return 1;
    };

  }
}



MainController.$inject = ['$scope'];
export default MainController;
